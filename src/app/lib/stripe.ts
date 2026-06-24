import Stripe from "stripe";

// Client Stripe côté serveur. Utilise la clé secrète (.env.local), jamais exposée au navigateur.
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
