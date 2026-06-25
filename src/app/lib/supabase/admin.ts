import { createClient } from "@supabase/supabase-js";

// Client Supabase ADMIN (clé service_role, SERVEUR UNIQUEMENT).
// Il passe AU-DESSUS des règles RLS : à n'utiliser que dans des routes serveur de
// confiance (ex. enregistrer un achat après un paiement vérifié par Stripe).
// Ne JAMAIS l'importer dans du code "use client" / navigateur.
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}
