import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { stripe } from "../../../lib/stripe";
import { createClient } from "../../../lib/supabase/server";
import { createAdminClient } from "../../../lib/supabase/admin";
import {
  COOKIE_ACCES,
  DUREE_ACCES_SECONDES,
  encoderAcces,
  decoderAcces,
} from "../../../lib/acces";

// Appelée par le navigateur JUSTE APRÈS un paiement réussi.
// 1. Vérifie le paiement directement auprès de Stripe (on ne fait pas confiance au
//    navigateur : il pourrait mentir).
// 2. Enregistre l'achat dans la table `achats` (rattaché au compte si connecté).
// 3. Pose le cookie de preuve d'achat pour débloquer le rapport (marche aussi sans compte).
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const paymentIntentId =
      typeof body?.paymentIntentId === "string" ? body.paymentIntentId : "";
    if (!paymentIntentId) {
      return NextResponse.json({ error: "missing_intent" }, { status: 400 });
    }

    // 1. Vérif côté Stripe : ce paiement existe-t-il et est-il bien réglé ?
    const intent = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (intent.status !== "succeeded") {
      return NextResponse.json({ error: "not_paid" }, { status: 402 });
    }
    const profil =
      typeof intent.metadata?.profil === "string" ? intent.metadata.profil : "";
    if (!profil) {
      return NextResponse.json({ error: "no_profil" }, { status: 400 });
    }

    // 2. Qui est connecté (le cas échéant) ?
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // 3. Enregistrer l'achat. Idempotent grâce à l'index unique sur stripe_payment_intent
    //    (pas de doublon si le webhook l'a déjà écrit).
    const admin = createAdminClient();
    await admin.from("achats").upsert(
      {
        user_id: user?.id ?? null,
        produit: "rapport_complet",
        profil,
        montant_cents: intent.amount,
        devise: intent.currency,
        statut: "paye",
        stripe_payment_intent: intent.id,
        email: user?.email ?? intent.receipt_email ?? null,
      },
      { onConflict: "stripe_payment_intent" }
    );

    // 4. Poser/compléter le cookie de preuve d'achat (httpOnly, signé).
    const jar = await cookies();
    const dejaDebloques = decoderAcces(jar.get(COOKIE_ACCES)?.value);
    jar.set(COOKIE_ACCES, encoderAcces([...dejaDebloques, profil]), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: DUREE_ACCES_SECONDES,
    });

    return NextResponse.json({ ok: true, profil });
  } catch {
    return NextResponse.json({ error: "acces_failed" }, { status: 500 });
  }
}
