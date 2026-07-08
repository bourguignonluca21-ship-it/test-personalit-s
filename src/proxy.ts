import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// PROXY (en Next 16, l'ancien "middleware" est renommé "proxy", même rôle).
// But : rafraîchir la session Supabase à chaque requête, pour que les pages et
// les routes serveur puissent lire l'utilisateur connecté de façon fiable.
//
// Ne rien ajouter entre createServerClient et auth.getUser() : c'est ce qui
// resynchronise les cookies de session.
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  await supabase.auth.getUser();

  // Trace « a fait le test » (même pour un visiteur non connecté) : quand il
  // ouvre une page résultat valide (/resultat/{slug}?s&v), on pose un petit
  // cookie. La page /profil s'en sert pour orienter les non connectés : test
  // fait → fenêtre de connexion (créer un compte) ; test pas fait → /test.
  const mResultat = request.nextUrl.pathname.match(/^\/resultat\/([^/]+)$/);
  if (mResultat) {
    const s = request.nextUrl.searchParams.get("s");
    const v = request.nextUrl.searchParams.get("v");
    if (s && v) {
      response.cookies.set("a_fait_test", `${mResultat[1]}|${s}|${v}`, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
      });
    }
  }

  return response;
}

export const config = {
  matcher: [
    // S'applique à tout, sauf les fichiers internes Next et les images statiques.
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
