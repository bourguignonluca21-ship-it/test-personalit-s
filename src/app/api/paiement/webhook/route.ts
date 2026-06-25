import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "../../../lib/stripe";
import { createAdminClient } from "../../../lib/supabase/admin";

// WEBHOOK Stripe (filet de sécurité). Stripe nous prévient, serveur à serveur, quand un
// paiement aboutit. Utile si le navigateur s'est fermé avant de confirmer, ou pour les
// moyens à redirection. Ici PAS de navigateur, donc on ne pose pas de cookie : on se
// contente d'enregistrer l'achat dans `achats`.
//
// Il faut le secret de signature STRIPE_WEBHOOK_SECRET (donné par la Stripe CLI en local,
// ou par le dashboard en prod). Tant qu'il n'est pas réglé, la route répond proprement
// sans rien faire.
export async function POST(request: Request) {
  const sig = request.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!sig || !secret) {
    return NextResponse.json({ error: "no_signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    // Corps BRUT obligatoire pour vérifier la signature (ne pas parser en JSON avant).
    const raw = await request.text();
    event = stripe.webhooks.constructEvent(raw, sig, secret);
  } catch {
    return NextResponse.json({ error: "bad_signature" }, { status: 400 });
  }

  if (event.type === "payment_intent.succeeded") {
    const intent = event.data.object as Stripe.PaymentIntent;
    const profil =
      typeof intent.metadata?.profil === "string" ? intent.metadata.profil : "";
    const userId = intent.metadata?.user_id || null;
    if (profil) {
      const admin = createAdminClient();
      await admin.from("achats").upsert(
        {
          user_id: userId,
          produit: "rapport_complet",
          profil,
          montant_cents: intent.amount,
          devise: intent.currency,
          statut: "paye",
          stripe_payment_intent: intent.id,
          email: intent.receipt_email ?? null,
        },
        { onConflict: "stripe_payment_intent" }
      );
    }
  }

  return NextResponse.json({ received: true });
}
