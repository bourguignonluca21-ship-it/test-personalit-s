import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createHash, randomUUID } from "crypto";
import { createClient } from "../../../lib/supabase/server";
import { createAdminClient } from "../../../lib/supabase/admin";

// =============================================================================
// LE « J'AIME » D'UN COMMENTAIRE.
//
// POST /api/commentaires/jaime  → { commentaireId }
//
// Un clic pose le cœur, un second le retire : c'est la même route, elle regarde
// d'abord si cette personne a déjà aimé ce message.
//
// PAS DE COMPTE REQUIS (demande de Luca). Deux façons d'être reconnu :
//   • connecté → c'est le compte qui tient le cœur, sur tous ses appareils ;
//   • pas connecté → un JETON DE VISITE, un numéro tiré au hasard posé dans le
//     navigateur. Aucune donnée personnelle dedans : il ne dit pas qui tu es, il
//     dit seulement « c'est le même navigateur que tout à l'heure », le temps
//     que le cœur reste vert après un rechargement.
//
// La base interdit de toute façon le doublon : un seul cœur par compte et par
// commentaire, un seul par jeton et par commentaire.
//
// On renvoie le TOTAL RECOMPTÉ dans la base, jamais un total calculé par le
// navigateur : deux personnes qui aiment en même temps doivent voir le vrai
// chiffre, pas chacune le sien.
// =============================================================================

/** Un an : le jeton n'a pas à être éternel, il n'a pas à être court non plus. */
const DUREE_JETON = 60 * 60 * 24 * 365;
/** Sans compte, la seule digue contre un script reste l'adresse. */
const MAX_PAR_HEURE = 30;

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
  const { commentaireId } = (await requete.json()) as { commentaireId?: string };
  if (!commentaireId) {
    return NextResponse.json({ erreur: "requête incomplète" }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Qui tient ce cœur ? Le compte s'il existe, sinon le jeton de visite.
  const boite = await cookies();
  let jeton = boite.get("visiteur")?.value ?? null;
  let jetonAPoser = false;
  if (!user && !jeton) {
    jeton = randomUUID();
    jetonAPoser = true;
  }

  const admin = createAdminClient();
  const marque = empreinte(requete);

  // On n'aime que ce qui est réellement en ligne : ni un message en attente de
  // relecture, ni un message retiré.
  const { data: commentaire } = await admin
    .from("commentaires")
    .select("id,etat")
    .eq("id", commentaireId)
    .maybeSingle();

  if (!commentaire || commentaire.etat !== "publie") {
    return NextResponse.json({ erreur: "introuvable" }, { status: 404 });
  }

  // La ligne existante, cherchée par compte OU par jeton selon le cas.
  const cible = admin
    .from("commentaires_jaimes")
    .select("commentaire_id")
    .eq("commentaire_id", commentaireId);
  const { data: deja } = user
    ? await cible.eq("user_id", user.id).maybeSingle()
    : await cible.eq("visiteur", jeton as string).maybeSingle();

  if (deja) {
    const retrait = admin
      .from("commentaires_jaimes")
      .delete()
      .eq("commentaire_id", commentaireId);
    if (user) await retrait.eq("user_id", user.id);
    else await retrait.eq("visiteur", jeton as string);
  } else {
    // Limite de fréquence : elle ne s'applique qu'à la pose, jamais au retrait.
    // Personne ne doit être empêché de reprendre son propre cœur.
    const ilYA1h = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count: recents } = await admin
      .from("commentaires_jaimes")
      .select("commentaire_id", { count: "exact", head: true })
      .eq("empreinte", marque)
      .gte("cree_le", ilYA1h);

    if ((recents ?? 0) >= MAX_PAR_HEURE) {
      return NextResponse.json({ erreur: "trop de j'aime" }, { status: 429 });
    }

    const { error } = await admin.from("commentaires_jaimes").insert({
      commentaire_id: commentaireId,
      user_id: user?.id ?? null,
      visiteur: user ? null : jeton,
      empreinte: marque,
    });
    // Doublon (deux clics partis ensemble) : la base a tranché, on ne proteste
    // pas, on recompte simplement.
    if (error && error.code !== "23505") {
      return NextResponse.json({ erreur: error.message }, { status: 500 });
    }
  }

  const { count } = await admin
    .from("commentaires_jaimes")
    .select("commentaire_id", { count: "exact", head: true })
    .eq("commentaire_id", commentaireId);

  const reponse = NextResponse.json({ aime: !deja, total: count ?? 0 });

  if (jetonAPoser && jeton) {
    reponse.cookies.set("visiteur", jeton, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: DUREE_JETON,
      secure: process.env.NODE_ENV === "production",
    });
  }

  return reponse;
}
