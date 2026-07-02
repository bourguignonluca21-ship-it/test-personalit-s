import { NextResponse } from "next/server";
import { getTypeByCode } from "../../data/types";
import { NOMS_VARIANTES } from "../../data/moteur";
import { createAdminClient } from "../../lib/supabase/admin";
import { htmlRapportPartage, sujetRapportPartage } from "../../lib/emails/rapportPartage";

// Après le test : envoie à l'utilisateur un mail léger avec le lien vers son profil
// partageable (/p), et — s'il a coché la case — enregistre son adresse pour la newsletter.
// Best-effort : on n'échoue jamais durement, le résultat s'affiche de toute façon.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const newsletter = body.newsletter === true;
    const slug = typeof body.slug === "string" ? body.slug : "";
    const s = typeof body.s === "string" ? body.s : "";
    const v = typeof body.v === "string" ? body.v : "";
    const origin = typeof body.origin === "string" ? body.origin.replace(/\/$/, "") : "";

    const emailValide = EMAIL_RE.test(email);
    if (!emailValide && !newsletter) return NextResponse.json({ ok: true, skipped: true });

    // Code + variante à partir du slug (ex. "infp-v1" → INFP / V1).
    const [codeRaw, varRaw] = slug.split("-");
    const code = (codeRaw ?? "").toUpperCase();
    const variante = (varRaw ?? "").toUpperCase();
    const nomType = getTypeByCode(code)?.name ?? code;
    const nomVariante = NOMS_VARIANTES[code]?.[variante] ?? variante;
    const url = `${origin}/p/${slug}${s ? `?s=${encodeURIComponent(s)}` : ""}${v ? `&v=${encodeURIComponent(v)}` : ""}`;

    // 1) Envoi du mail « ton profil » (si une adresse valide est fournie).
    if (emailValide && process.env.RESEND_API_KEY) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // ⚠️ Resend en mode test : n'envoie qu'à l'adresse du compte tant qu'un domaine
            // n'est pas vérifié. Remplacer par une adresse à ton domaine à la mise en ligne.
            from: "Ton profil <onboarding@resend.dev>",
            to: [email],
            subject: sujetRapportPartage(code, nomVariante),
            html: htmlRapportPartage({ nomType, code, nomVariante, url }),
          }),
        });
      } catch {
        // on avale : l'utilisateur voit quand même son résultat
      }
    }

    // 2) Inscription newsletter (si la case est cochée) : on stocke l'adresse.
    if (newsletter && emailValide) {
      try {
        const admin = createAdminClient();
        await admin
          .from("newsletter")
          .upsert({ email, source: "test" }, { onConflict: "email", ignoreDuplicates: true });
      } catch {
        // on avale
      }
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true, error: "server_error" });
  }
}
