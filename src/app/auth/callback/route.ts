import { NextResponse } from "next/server";
import { createClient } from "../../lib/supabase/server";

// Retour de la connexion Google (OAuth). Supabase renvoie le navigateur ICI avec un ?code.
// On échange ce code contre une vraie session (posée dans les cookies), puis on renvoie le
// client là où il était avant (paramètre ?next), généralement sa page de résultat.
export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next") || "/";

  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  // next est un chemin relatif de NOTRE site (ex. /resultat/...). On le résout sur notre origine.
  return NextResponse.redirect(new URL(next, url.origin));
}
