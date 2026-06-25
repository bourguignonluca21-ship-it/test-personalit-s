import { NextResponse } from "next/server";
import { stripe } from "../../../lib/stripe";
import { createClient } from "../../../lib/supabase/server";

// Crée une intention de paiement (PaymentIntent) de 7,90 € et renvoie son client_secret
// au navigateur, qui s'en sert pour afficher le formulaire Stripe. Le montant est fixé
// ICI, côté serveur : le navigateur ne peut pas le changer.
//
// On estampille aussi le paiement avec deux infos lues côté serveur (donc fiables) :
// le profil acheté (slug, ex. "infp-v1") et l'id du compte s'il est connecté. Elles
// serviront ensuite à enregistrer l'achat et à débloquer le bon rapport.
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const profil = typeof body?.profil === "string" ? body.profil : "";

    // Si la personne est connectée, on récupère son compte pour rattacher l'achat.
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const intent = await stripe.paymentIntents.create({
      amount: 790, // en centimes -> 7,90 €
      currency: "eur",
      automatic_payment_methods: { enabled: true },
      metadata: {
        produit: "rapport_complet",
        profil, // le slug (ex. "infp-v1"), identifiant stable du rapport
        user_id: user?.id ?? "", // rattache au compte si connecté, sinon vide (anonyme)
      },
      ...(user?.email ? { receipt_email: user.email } : {}),
    });

    return NextResponse.json({ clientSecret: intent.client_secret });
  } catch {
    return NextResponse.json({ error: "intent_failed" }, { status: 500 });
  }
}
