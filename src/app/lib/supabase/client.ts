import { createBrowserClient } from "@supabase/ssr";

// Client Supabase côté navigateur. Utilise les clés publiques (.env.local).
// La clé "anon" est faite pour être publique ; la sécurité réelle vient des règles
// RLS (row level security) qu'on posera sur les tables.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
