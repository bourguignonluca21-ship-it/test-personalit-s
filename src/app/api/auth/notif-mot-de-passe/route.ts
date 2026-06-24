import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { htmlMotDePasseChange, SUJET_MOT_DE_PASSE_CHANGE } from "../../../lib/emails/motDePasseChange";

// Envoie un email de sécurité « ton mot de passe a été changé ».
// L'adresse n'est PAS prise dans le navigateur (pas spoofable) : on vérifie le jeton
// d'accès Supabase côté serveur et on en déduit l'email réel du compte connecté.
export async function POST(request: Request) {
  try {
    const auth = request.headers.get("authorization") ?? "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
    if (!token) return NextResponse.json({ error: "no_token" }, { status: 401 });

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data, error } = await supabase.auth.getUser(token);
    const email = data?.user?.email;
    if (error || !email) return NextResponse.json({ error: "invalid_user" }, { status: 401 });

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Test de personnalité <onboarding@resend.dev>",
        to: [email],
        subject: SUJET_MOT_DE_PASSE_CHANGE,
        html: htmlMotDePasseChange(),
      }),
    });
    if (!res.ok) return NextResponse.json({ error: "send_failed" }, { status: 502 });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
