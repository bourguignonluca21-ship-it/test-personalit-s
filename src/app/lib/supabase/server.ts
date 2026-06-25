import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Client Supabase côté SERVEUR (Server Components, Route Handlers).
// Il lit la session de l'utilisateur depuis les cookies de la requête, donc le
// serveur sait "qui est connecté". On utilise la clé publique "anon" : la vraie
// sécurité vient des règles RLS posées sur les tables.
//
// À utiliser dans du code serveur uniquement (jamais dans un composant "use client").
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Appelé depuis un Server Component (où on ne peut pas écrire de cookie) :
            // sans gravité, le proxy (src/proxy.ts) rafraîchit déjà la session.
          }
        },
      },
    }
  );
}
