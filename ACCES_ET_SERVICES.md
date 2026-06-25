# Accès et services (note de référence)

> Mémo des services branchés sur le site et de leurs accès.
> RÈGLE : aucune clé secrète ici. Les vraies clés vivent dans `.env.local` (non commité).
> Mis à jour : session du 25 juin 2026 (gating serveur réel : session Supabase serveur, preuve d'achat par cookie, route /api/paiement/acces, webhook Stripe, vérification d'achat dans la page résultat). Le ?paid=1 factice est supprimé.

## Supabase (comptes utilisateurs + base de données)

- Référence du projet : `lxaxwsplkvplhcpfltfi`
- URL du projet : `https://lxaxwsplkvplhcpfltfi.supabase.co`
- Liens tableau de bord :
  - Utilisateurs : https://supabase.com/dashboard/project/lxaxwsplkvplhcpfltfi/auth/users
  - Réglages email (connexion) : https://supabase.com/dashboard/project/lxaxwsplkvplhcpfltfi/auth/providers
  - Éditeur SQL : https://supabase.com/dashboard/project/lxaxwsplkvplhcpfltfi/sql/new
- Clés : `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY` (publiques) sont dans `.env.local`. La clé `service_role` (secrète, `SUPABASE_SERVICE_ROLE_KEY` dans `.env.local`) est MAINTENANT utilisée côté serveur pour enregistrer les achats (route `acces` + webhook). Elle se trouve dans le dashboard : Settings → API Keys → onglet « Legacy anon, service_role API keys » (bouton « Reveal »). NE JAMAIS la commiter ni l'exposer au navigateur.
- Session serveur : `src/app/lib/supabase/server.ts` (lit la session via cookies) + `src/proxy.ts` (ex-middleware, renommé « proxy » en Next 16 ; rafraîchit la session à chaque requête). Permet au serveur de savoir qui est connecté.
- Auth : email + mot de passe. **Confirmation par email DÉSACTIVÉE** pour les tests (à réactiver avant la mise en ligne).
- Table `public.achats` (user_id, produit, profil, montant_cents, devise, statut, stripe_payment_intent, email, created_at) avec RLS (chacun ne lit que ses achats). Ajustée le 25/06 : `user_id` rendu NULLABLE (achat sans compte), index unique sur `stripe_payment_intent` (anti-doublon), colonne `email` ajoutée. Les insertions se font via la clé `service_role` (route `acces` + webhook), `statut = "paye"`. Le `profil` stocké est le SLUG (ex. `infp-v1`).
- **Connexion par code email (OTP)** : Email OTP Length = **6**, Email OTP Expiration = **600 s** (Authentication → Providers → Email).
- **SMTP custom = Gmail (TEMPORAIRE, pour les tests)** : `smtp.gmail.com:465`, identifiants = adresse gmail + **mot de passe d'application** (16 caractères, généré sur https://myaccount.google.com/apppasswords). Obligatoire pour pouvoir personnaliser les templates d'email. À remplacer par Resend SMTP + domaine à la mise en ligne.
- **Templates email personnalisés** : « Magic Link or OTP » (code à 6 chiffres avec `{{ .Token }}`, objet `{{ .Token }} est ton code de connexion`) et « Reset Password » (renvoie vers la page résultat).
- **Redirect URLs à autoriser** (URL Configuration) : `http://localhost:3000/resultat/**` et `http://localhost:3000/nouveau-mot-de-passe` (+ équivalents Vercel plus tard).

## Stripe (paiement)

- Compte créé, **mode test** (pas encore vérifié ; vérification + statut entreprise requis pour encaisser en vrai).
- Liens tableau de bord :
  - Clés API (test) : https://dashboard.stripe.com/test/apikeys
  - Moyens de paiement : https://dashboard.stripe.com/test/settings/payment_methods
- Clés : `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (pk_test, publique) et `STRIPE_SECRET_KEY` (sk_test, secrète) sont dans `.env.local`.
- Moyens activés (test) : carte, Klarna, Bancontact, Amazon Pay, MB WAY, etc.
- Montant fixé côté serveur dans `src/app/api/paiement/intent/route.ts` : 790 centimes = 7,90 €.
- Carte de test : `4242 4242 4242 4242`, date `12/34`, CVC `123`.
- Au paiement réussi, le navigateur appelle `POST /api/paiement/acces` : la route RE-VÉRIFIE le paiement chez Stripe (`paymentIntents.retrieve`, statut `succeeded`), enregistre l'achat, et pose le cookie de preuve d'achat. C'est ce qui débloque (même sans compte). Le montant et le profil viennent des métadonnées du PaymentIntent (posées côté serveur).
- Webhook (filet de sécurité) : `POST /api/paiement/webhook` enregistre l'achat même si le navigateur se ferme. Il a besoin de `STRIPE_WEBHOOK_SECRET` dans `.env.local`. PAS ENCORE testé : en local il faut la Stripe CLI (`stripe listen --forward-to localhost:3000/api/paiement/webhook`) qui fournit ce secret. Le déblocage principal marche déjà sans le webhook.

## Preuve d'achat (gating) — comment le déblocage marche

- Deux façons d'être « payé » pour un rapport : (1) un **cookie de preuve d'achat** signé (`acces_rapport`, httpOnly), posé par la route `acces` après un paiement vérifié, qui liste les profils débloqués sur ce navigateur (cas anonyme) ; (2) un **compte connecté** qui a une ligne `achats` `statut = "paye"` pour ce profil.
- Le cookie est signé avec `ACCES_SIGNING_SECRET` (clé aléatoire dans `.env.local`) via HMAC, donc infalsifiable : on ne peut plus débloquer en bricolant l'URL (l'ancien `?paid=1` est supprimé).
- Limite assumée : l'accès anonyme vit dans CE navigateur (cookies effacés / autre appareil = accès perdu, d'où l'incitation à créer un compte). L'acheteur connecté retrouve son rapport partout.
- Logique de déblocage : dans `src/app/resultat/[slug]/page.tsx` (variable `isPaid`). Helpers du cookie : `src/app/lib/acces.ts`.

## Resend (envoi d'emails transactionnels)

- Sert aux mails **hors authentification** (ex. mail de sécurité « mot de passe changé »). Les mails d'**auth** (code de connexion, reset de mot de passe) partent par le **SMTP de Supabase** (Gmail en test), PAS par Resend.
- Clé `RESEND_API_KEY` (secrète) dans `.env.local`. **Mode test** : expéditeur `onboarding@resend.dev`, n'envoie que vers l'adresse du compte Resend.
- Appelée via l'API REST (`fetch`) depuis `src/app/api/auth/notif-mot-de-passe/route.ts`. Aucun package npm installé.
- Dashboard : https://resend.com . À la mise en ligne : vérifier un domaine et envoyer depuis une adresse à ta marque (et idéalement router aussi les mails d'auth Supabase via Resend SMTP).

## Où sont les choses (code)

- Connecteur Supabase navigateur : `src/app/lib/supabase/client.ts`
- Connecteur Supabase serveur (session via cookies) : `src/app/lib/supabase/server.ts`
- Connecteur Supabase admin (service_role, serveur uniquement) : `src/app/lib/supabase/admin.ts`
- Proxy (rafraîchit la session, ex-middleware) : `src/proxy.ts`
- Preuve d'achat (signer/vérifier le cookie) : `src/app/lib/acces.ts`
- Connecteur Stripe serveur : `src/app/lib/stripe.ts`
- Route paiement (crée le PaymentIntent, estampille user_id + slug) : `src/app/api/paiement/intent/route.ts`
- Route déblocage (vérifie le paiement, enregistre l'achat, pose le cookie) : `src/app/api/paiement/acces/route.ts`
- Webhook Stripe (filet de sécurité) : `src/app/api/paiement/webhook/route.ts`
- Fenêtre de paiement (modale) : `src/app/components/FenetrePaiement.tsx`
- Fenêtre de partage : `src/app/components/FenetrePartage.tsx`
- Route mail de sécurité (Resend) : `src/app/api/auth/notif-mot-de-passe/route.ts`
- Visuels des mails (source partagée aperçu + envoi) : `src/app/lib/emails/motDePasseChange.ts`, `src/app/lib/emails/codeConnexion.ts`
- Page nouveau mot de passe (filet de secours) : `src/app/nouveau-mot-de-passe/page.tsx`
- Page d'aperçu des mails (**TEMPORAIRE, à supprimer avant la prod**) : `src/app/apercu-mail/page.tsx`
- Variables d'environnement : `.env.local` (à la racine de `Next_js`, NON commité) — contient `NEXT_PUBLIC_SUPABASE_*`, `SUPABASE_SERVICE_ROLE_KEY` (NOUVEAU), `ACCES_SIGNING_SECRET` (NOUVEAU, clé aléatoire pour signer le cookie de preuve), `STRIPE_*`, `NEXT_PUBLIC_STRIPE_*`, `STRIPE_WEBHOOK_SECRET` (à ajouter pour le webhook), `RESEND_API_KEY`. ⚠️ Les NOUVELLES clés doivent aussi être ajoutées dans Vercel (Settings → Environment Variables) avant de pousser, sinon le paiement plante en ligne.

## À faire plus tard (rappel)

- ~~Session Supabase côté serveur~~ : FAIT (`lib/supabase/server.ts` + `src/proxy.ts`).
- ~~Gating serveur réel~~ : FAIT (le `?paid=1` factice est supprimé ; déblocage par cookie de preuve OU achat sur le compte).
- Webhook Stripe (`api/paiement/webhook`) : créé, mais PAS ENCORE testé. À faire : installer la Stripe CLI, lancer `stripe listen --forward-to localhost:3000/api/paiement/webhook`, mettre le `STRIPE_WEBHOOK_SECRET` qu'elle donne dans `.env.local`, et tester un paiement.
- Avant de pousser : ajouter `SUPABASE_SERVICE_ROLE_KEY` et `ACCES_SIGNING_SECRET` (+ plus tard `STRIPE_WEBHOOK_SECRET`) dans Vercel.
- Mise en ligne : réactiver la confirmation email Supabase, vérifier Stripe (passage live), **ajouter toutes les variables d'environnement dans Vercel** (sinon connexion + paiement ne marchent pas en ligne).
- Sortir le projet de OneDrive (règle les pop-up de suppression et les vues tronquées).
- Emails : remplacer le **SMTP Gmail de test** par **Resend SMTP + domaine vérifié** (côté Supabase ET Resend), **supprimer la page `/apercu-mail`**, renforcer les critères de mot de passe côté Supabase (Min length 8 + requirements).

## Repères pratiques & pièges (pour les futures sessions)

- **Comptes des services** : Supabase, Stripe, Resend et le SMTP Gmail sont tous rattachés à l'adresse **bourguignonluca21@gmail.com**. Les secrets (clés API, mot de passe d'application) vivent UNIQUEMENT dans `.env.local` et dans les réglages Supabase, jamais dans ce doc.
- **URL de test d'une page résultat** : `http://localhost:3000/resultat/infp-v1?s=51-62-40-58&v=11-7-5`. Ajouter `&paid=1` pour voir la version payée (défloutée), `&recovery=1` pour ouvrir la fenêtre directement sur l'écran « nouveau mot de passe ».
- **Aperçu des mails en direct** : `http://localhost:3000/apercu-mail` (page temporaire, à supprimer avant la prod).
- **Éditer un template d'email Supabase** : impossible tant qu'un **SMTP custom** n'est pas activé (message « Set up custom SMTP to edit the source »). C'est pour ça qu'on a branché le SMTP Gmail de test.
- **Template OTP** = onglet « Magic Link or OTP ». Par défaut Supabase envoie un **lien**, pas un code ; pour un code à coller il faut mettre `{{ .Token }}` dans le corps. Pour le bouton « copier le code » de Gmail : mettre `{{ .Token }}` dans **l'objet** (surtout visible sur Gmail mobile).
- **Resend en mode test** : n'envoie qu'à l'adresse du **compte Resend** (le gmail). Pour écrire à n'importe qui : vérifier un domaine.
- **`verifyOtp`** : type `email`. Longueur du code et expiration : Authentication → Providers → Email (réglés à **6** chiffres / **600 s**).
- **Pièges des boîtes mail** : pas de JavaScript (donc impossible de fabriquer un bouton « copier » maison), et les **SVG sont supprimés** par Gmail → pour la prod, icônes en **PNG hébergé**.
- **Dev server & OneDrive** : un **nouveau fichier de route/page** n'est pas détecté par un `npm run dev` déjà lancé (file-watch peu fiable sur OneDrive) → **redémarrer** le dev. Les simples modifs de fichiers existants se rechargent à chaud.
- **Liens dashboard** (projet Supabase `lxaxwsplkvplhcpfltfi`) : templates `…/auth/templates`, providers/OTP `…/auth/providers`, redirect URLs `…/auth/url-configuration`, SMTP `…/auth/smtp`. Mot de passe d'application Google : https://myaccount.google.com/apppasswords (nécessite la validation en deux étapes).

## Rappels

- Les clés secrètes ne doivent JAMAIS être collées dans un fichier commité ni partagées. Uniquement dans `.env.local`.
- Commit/push uniquement depuis Windows / Claude Code (voir `AGENTS.md`).
- État détaillé du projet : `ETAT_DU_PROJET.md` (section 8 sexies pour la dernière session).
