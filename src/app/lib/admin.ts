import { createClient } from "./supabase/server";

// =============================================================================
// QUI A LE DROIT D'ADMINISTRER.
//
// La liste des adresses autorisées vit dans les variables d'environnement
// (ADMIN_EMAILS), jamais dans le code : elle ne part donc pas sur GitHub, et
// elle se change sans redéployer le site.
//
// ⚠️ Ce contrôle se fait TOUJOURS côté serveur, et il est refait à chaque
// action. Cacher l'adresse de la page ne protège rien : une adresse non listée
// finit toujours par se retrouver.
// =============================================================================

export async function utilisateurAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) return null;

  const autorises = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  if (!autorises.includes(user.email.toLowerCase())) return null;
  return user;
}
