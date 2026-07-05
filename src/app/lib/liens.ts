import { createAdminClient } from "./supabase/admin";

/*
 * PARCOURS À DEUX — table `liens` : le rattachement inviteur ↔ invité.
 * Quand l'INVITÉ (venu par un lien signé /test?invite=…) arrive sur sa page
 * résultat, on enregistre son résultat SUR LE COMPTE DE L'INVITEUR :
 * c'est ce qui remplit l'espace « Partenaire » du profil de l'inviteur.
 * - UPSERT sur (inviteur_user_id, type) : un seul ou une seule partenaire à
 *   la fois, une nouvelle invitation complétée remplace l'ancienne (16P).
 * - Écriture via service_role (aucune policy d'insert publique).
 * - Ne doit JAMAIS faire échouer la page → try/catch, échec silencieux.
 * Renvoie true s'il y a du NOUVEAU (première fois ou résultat différent) :
 * c'est ce qui déclenche le mail à l'inviteur, une simple re-visite de la
 * page par l'invité ne renvoie pas de mail.
 */
export async function enregistrerLien(args: {
  inviteurId: string;
  slug: string;
  scoresS: string;
  scoresV: string;
  inviteUserId?: string | null; // si l'invité est connecté
  invitePrenom?: string | null; // son prénom (metadata), sinon null
  test?: string;
}): Promise<boolean> {
  try {
    const admin = createAdminClient();
    // Re-visite du même résultat = rien de nouveau (pas de mail).
    const { data: existant } = await admin
      .from("liens")
      .select("slug, scores_s, scores_v")
      .eq("inviteur_user_id", args.inviteurId)
      .eq("type", "partenaire")
      .maybeSingle();
    if (
      existant &&
      existant.slug === args.slug &&
      existant.scores_s === args.scoresS &&
      existant.scores_v === args.scoresV
    ) {
      return false;
    }
    await admin.from("liens").upsert(
      {
        inviteur_user_id: args.inviteurId,
        type: "partenaire",
        statut: "complete",
        invite_user_id: args.inviteUserId ?? null,
        invite_prenom: args.invitePrenom ?? null,
        test: args.test ?? "personnalite",
        slug: args.slug,
        scores_s: args.scoresS,
        scores_v: args.scoresV,
        vu_le: null, // du nouveau → la pastille « Nouveau » se rallume
      },
      { onConflict: "inviteur_user_id,type" }
    );
    return true;
  } catch {
    // Échec silencieux : ne casse jamais la page résultat de l'invité.
    return false;
  }
}

/* Le prénom ET l'email de l'inviteur : le prénom pour le message affiché à
   l'invité, l'email pour le mail « son portrait est prêt ». */
export async function infosInviteur(
  userId: string
): Promise<{ prenom: string | null; email: string | null }> {
  try {
    const admin = createAdminClient();
    const { data } = await admin.auth.admin.getUserById(userId);
    const prenom = data?.user?.user_metadata?.prenom as string | undefined;
    return { prenom: prenom || null, email: data?.user?.email ?? null };
  } catch {
    return { prenom: null, email: null };
  }
}

/* Compat : l'ancien accès « prénom seul » (utilisé par la page résultat). */
export async function prenomUtilisateur(userId: string): Promise<string | null> {
  return (await infosInviteur(userId)).prenom;
}
