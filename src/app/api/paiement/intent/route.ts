import { NextResponse } from "next/server";
import { stripe } from "../../../lib/stripe";

// Crée une intention de paiement (PaymentIntent) de 7,90 € et renvoie son client_secret
// au navigateur, qui s'en sert pour afficher le formulaire Stripe. Le montant est fixé
// ICI, côté serveur : le navigateur ne peut pas le changer.
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const profil = typeof body?.profil === "string" ? body.profil : "";

    const intent = await stripe.paymentIntents.create({
      amount: 790, // en centimes -> 7,90 €
      currency: "eur",
      automatic_payment_methods: { enabled: true },
      metadata: { produit: "rapport_complet", profil },
    });

    return NextResponse.json({ clientSecret: intent.client_secret });
  } catch {
    return NextResponse.json({ error: "intent_failed" }, { status: 500 });
  }
}
