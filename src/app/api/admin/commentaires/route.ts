import { NextResponse } from "next/server";
import { utilisateurAdmin } from "../../../lib/admin";
import { createAdminClient } from "../../../lib/supabase/admin";

// =============================================================================
// LA CONSOLE DE MODÉRATION — lecture de la file, et décisions.
//
// GET  /api/admin/commentaires?etat=a_revoir  → la file
// POST /api/admin/commentaires                → { id, action: "publier"|"refuser" }
//
// ⚠️ Le droit est revérifié À CHAQUE APPEL. Sans ça, quelqu'un qui devine
// l'adresse de la route publierait ce qu'il veut sans jamais voir la page.
// =============================================================================

/** La détresse d'abord : quelqu'un qui va mal ne doit pas dormir dans la file. */
const URGENCE: Record<string, number> = {
  DETRESSE: 0,
  "AUTORITES:sexual/minors": 0,
  DOUTE: 1,
  DENIGREMENT: 2,
  CRITIQUE: 3,
  HORS_SUJET: 4,
  CONTROLE_INDISPONIBLE: 5,
};

export async function GET(requete: Request) {
  if (!(await utilisateurAdmin())) {
    return NextResponse.json({ erreur: "introuvable" }, { status: 404 });
  }

  const etat = new URL(requete.url).searchParams.get("etat") ?? "a_revoir";
  const admin = createAdminClient();

  /* Les SIGNALEMENTS sont une autre liste : le commentaire signalé est le plus
     souvent resté EN LIGNE, il n'est donc dans aucune file d'état. */
  if (etat === "signales") {
    const { data, error } = await admin
      .from("commentaires_signalements")
      .select(
        "id,motif,detail,verdict,analyse,cree_le,traite,commentaires(id,fil,auteur_pseudo,texte,etat,motif_etat,parent_id,cree_le)"
      )
      .eq("traite", false)
      .order("cree_le", { ascending: false })
      .limit(200);

    if (error) return NextResponse.json({ erreur: error.message }, { status: 500 });
    return NextResponse.json({ signalements: data ?? [] });
  }

  const { data, error } = await admin
    .from("commentaires")
    .select("id,fil,auteur_pseudo,texte,etat,motif_etat,parent_id,cree_le")
    .eq("etat", etat)
    .order("cree_le", { ascending: false })
    .limit(200);

  if (error) return NextResponse.json({ erreur: error.message }, { status: 500 });

  const rang = (m: string | null) => URGENCE[m ?? ""] ?? 9;
  const tries = (data ?? []).sort((a, b) => rang(a.motif_etat) - rang(b.motif_etat));

  return NextResponse.json({ commentaires: tries });
}

export async function POST(requete: Request) {
  if (!(await utilisateurAdmin())) {
    return NextResponse.json({ erreur: "introuvable" }, { status: 404 });
  }

  const { id, action } = (await requete.json()) as { id?: string; action?: string };
  if (!id || !["publier", "refuser", "classer"].includes(action ?? "")) {
    return NextResponse.json({ erreur: "requête incomplète" }, { status: 400 });
  }

  const admin = createAdminClient();

  // « Classer » ferme un signalement sans rien changer au commentaire.
  if (action === "classer") {
    const { error } = await admin
      .from("commentaires_signalements")
      .update({ traite: true })
      .eq("id", id);
    if (error) return NextResponse.json({ erreur: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  }
  const { error } = await admin
    .from("commentaires")
    .update({
      etat: action === "publier" ? "publie" : "bloque",
      motif_etat: action === "publier" ? null : "REFUSE_A_LA_MAIN",
    })
    .eq("id", id);

  if (error) return NextResponse.json({ erreur: error.message }, { status: 500 });

  // Trancher sur un commentaire ferme aussi ses signalements en attente.
  await admin
    .from("commentaires_signalements")
    .update({ traite: true })
    .eq("commentaire_id", id)
    .eq("traite", false);

  return NextResponse.json({ ok: true });
}
