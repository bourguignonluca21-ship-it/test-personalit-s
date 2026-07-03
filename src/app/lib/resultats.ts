import { createAdminClient } from "./supabase/admin";

/*
 * Rattache un résultat de test au compte (table `resultats`, cf.
 * ANALYSE_PARCOURS_16P.md et ETAT_DU_PROJET).
 * Appelé côté SERVEUR quand un utilisateur CONNECTÉ ouvre sa page
 * /resultat/[slug] : le résultat est enregistré sur son compte.
 * - Historique conservé (une ligne par passage, comme 16P) ;
 * - MAIS pas de doublon : si la dernière ligne du même test a déjà ce
 *   slug + ces scores (simple re-visite de la page), on n'insère rien.
 * - Ne doit JAMAIS faire échouer la page → try/catch, échec silencieux.
 */
export async function enregistrerResultat(
  userId: string,
  slug: string,
  scoresS: string,
  scoresV: string,
  test: string = "personnalite"
) {
  try {
    const admin = createAdminClient();
    const { data: dernier } = await admin
      .from("resultats")
      .select("slug, scores_s, scores_v")
      .eq("user_id", userId)
      .eq("test", test)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (
      dernier &&
      dernier.slug === slug &&
      dernier.scores_s === scoresS &&
      dernier.scores_v === scoresV
    ) {
      return; // déjà enregistré (simple re-visite)
    }

    await admin.from("resultats").insert({
      user_id: userId,
      test,
      slug,
      scores_s: scoresS,
      scores_v: scoresV,
    });
  } catch {
    // Échec silencieux : l'enregistrement ne doit jamais casser la page résultat.
  }
}
