import { NextResponse } from "next/server";
import { createAdminClient } from "../../../lib/supabase/admin";
import { examinerSignalement } from "../../../lib/moderation";
import { createHash } from "crypto";

// =============================================================================
// LE SIGNALEMENT D'UN COMMENTAIRE.
//
// POST /api/commentaires/signalement  → { commentaireId, motif, detail }
//
// PAS DE COMPTE REQUIS : le DSA demande que toute personne puisse notifier un
// contenu. On limite donc les abus par empreinte d'adresse, pas par compte.
//
// Ce que fait ce signalement, décidé avec Luca :
//   • le commentaire RESTE EN LIGNE — un signalement ne fait pas voter la foule ;
//   • il déclenche un SECOND EXAMEN, plus sévère et AVEC LE CONTEXTE ;
//   • si cet examen confirme sans ambiguïté, alors seulement le message est
//     retiré et mis dans la file. Sinon il reste, et remonte dans la console.
// =============================================================================

const MOTIFS = ["haine", "sexuel", "danger", "spam", "autre"];
/** Cinq signalements par heure et par empreinte : de quoi signaler un fil
 *  entier de bonne foi, pas de quoi harceler quelqu'un. */
const MAX_PAR_HEURE = 5;

/** Une empreinte, pas une identité : l'adresse n'est jamais stockée en clair. */
function empreinte(requete: Request): string {
  const ip =
    requete.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    requete.headers.get("x-real-ip") ??
    "inconnue";
  const agent = requete.headers.get("user-agent") ?? "";
  return createHash("sha256").update(`${ip}|${agent}`).digest("hex").slice(0, 32);
}

export async function POST(requete: Request) {
  const { commentaireId, motif, detail } = (await requete.json()) as {
    commentaireId?: string;
    motif?: string;
    detail?: string;
  };

  if (!commentaireId || !motif || !MOTIFS.includes(motif)) {
    return NextResponse.json({ erreur: "requête incomplète" }, { status: 400 });
  }

  const admin = createAdminClient();
  const marque = empreinte(requete);

  // 1. Limite d'abus.
  const ilYA1h = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { count: recents } = await admin
    .from("commentaires_signalements")
    .select("id", { count: "exact", head: true })
    .eq("empreinte", marque)
    .gte("cree_le", ilYA1h);

  if ((recents ?? 0) >= MAX_PAR_HEURE) {
    return NextResponse.json({ erreur: "trop de signalements" }, { status: 429 });
  }

  // 2. Le commentaire visé, et son contexte.
  const { data: commentaire } = await admin
    .from("commentaires")
    .select("id,texte,fil,parent_id,etat")
    .eq("id", commentaireId)
    .maybeSingle();

  if (!commentaire) {
    return NextResponse.json({ erreur: "introuvable" }, { status: 404 });
  }

  let parent: string | null = null;
  if (commentaire.parent_id) {
    const { data: p } = await admin
      .from("commentaires")
      .select("texte")
      .eq("id", commentaire.parent_id)
      .maybeSingle();
    parent = p?.texte ?? null;
  }

  // 3. Le signalement est enregistré AVANT l'examen : même si l'examen échoue,
  //    la trace existe et remonte dans la console.
  const { data: ligne } = await admin
    .from("commentaires_signalements")
    .insert({
      commentaire_id: commentaire.id,
      motif,
      detail: detail?.slice(0, 300) ?? null,
      empreinte: marque,
    })
    .select("id")
    .single();

  // 4. Le second examen, avec le contexte.
  const examen = await examinerSignalement({
    texte: commentaire.texte,
    motif,
    detail,
    page: commentaire.fil,
    parent,
  });

  if (ligne) {
    await admin
      .from("commentaires_signalements")
      .update({ verdict: examen.verdict, analyse: examen.analyse })
      .eq("id", ligne.id);
  }

  // 5. Le message n'est retiré QUE si l'examen confirme sans ambiguïté.
  if (examen.verdict === "confirme" && commentaire.etat === "publie") {
    await admin
      .from("commentaires")
      .update({ etat: "a_revoir", motif_etat: `SIGNALE_${motif.toUpperCase()}` })
      .eq("id", commentaire.id);
  }

  // On ne renvoie PAS le verdict : celui qui signale n'a pas à savoir si son
  // signalement a « marché ». Sinon on lui apprend à contourner l'examen.
  return NextResponse.json({ ok: true });
}
