# Accès et services (note de référence)

> Mémo des services branchés sur le site et de leurs accès.
> RÈGLE : aucune clé secrète ici. Les vraies clés vivent dans `.env.local` (non commité).
> Mis à jour : session du 24 juin 2026 (mise en place comptes + paiement).

## Supabase (comptes utilisateurs + base de données)

- Référence du projet : `lxaxwsplkvplhcpfltfi`
- URL du projet : `https://lxaxwsplkvplhcpfltfi.supabase.co`
- Liens tableau de bord :
  - Utilisateurs : https://supabase.com/dashboard/project/lxaxwsplkvplhcpfltfi/auth/users
  - Réglages email (connexion) : https://supabase.com/dashboard/project/lxaxwsplkvplhcpfltfi/auth/providers
  - Éditeur SQL : https://supabase.com/dashboard/project/lxaxwsplkvplhcpfltfi/sql/new
- Clés : `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY` (publiques) sont dans `.env.local`. La clé `service_role` (secrète) n'est PAS encore utilisée (viendra pour le webhook).
- Auth : email + mot de passe. **Confirmation par email DÉSACTIVÉE** pour les tests (à réactiver avant la mise en ligne).
- Table créée : `public.achats` (user_id, produit, profil, montant_cents, devise, statut, stripe_payment_intent, created_at) avec RLS (chacun ne lit que ses achats). Pas encore d'insertion (viendra via le webhook Stripe).

## Stripe (paiement)

- Compte créé, **mode test** (pas encore vérifié ; vérification + statut entreprise requis pour encaisser en vrai).
- Liens tableau de bord :
  - Clés API (test) : https://dashboard.stripe.com/test/apikeys
  - Moyens de paiement : https://dashboard.stripe.com/test/settings/payment_methods
- Clés : `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (pk_test, publique) et `STRIPE_SECRET_KEY` (sk_test, secrète) sont dans `.env.local`.
- Moyens activés (test) : carte, Klarna, Bancontact, Amazon Pay, MB WAY, etc.
- Montant fixé côté serveur dans `src/app/api/paiement/intent/route.ts` : 790 centimes = 7,90 €.
- Carte de test : `4242 4242 4242 4242`, date `12/34`, CVC `123`.

## Où sont les choses (code)

- Connecteur Supabase navigateur : `src/app/lib/supabase/client.ts`
- Connecteur Stripe serveur : `src/app/lib/stripe.ts`
- Route paiement : `src/app/api/paiement/intent/route.ts`
- Fenêtre de paiement (modale) : `src/app/components/FenetrePaiement.tsx`
- Fenêtre de partage : `src/app/components/FenetrePartage.tsx`
- Variables d'environnement : `.env.local` (à la racine de `Next_js`, NON commité)

## À faire plus tard (rappel)

- Session Supabase côté serveur (`lib/supabase/server.ts` + `middleware.ts`).
- Webhook Stripe (`api/paiement/webhook`) : insérer l'achat dans `achats` à la confirmation, rattaché au compte.
- Gating serveur réel : remplacer le `?paid=1` factice par une vraie vérification d'achat.
- Mise en ligne : réactiver la confirmation email Supabase, vérifier Stripe (passage live), **ajouter toutes les variables d'environnement dans Vercel** (sinon connexion + paiement ne marchent pas en ligne).
- Sortir le projet de OneDrive (règle les pop-up de suppression et les vues tronquées).

## Rappels

- Les clés secrètes ne doivent JAMAIS être collées dans un fichier commité ni partagées. Uniquement dans `.env.local`.
- Commit/push uniquement depuis Windows / Claude Code (voir `AGENTS.md`).
- État détaillé du projet : `ETAT_DU_PROJET.md` (section 8 quinquies pour cette session).
