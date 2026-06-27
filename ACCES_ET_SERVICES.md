# Accès et services (note de référence)

> Mémo des services branchés sur le site et de leurs accès.
> RÈGLE : aucune clé secrète ici. Les vraies clés vivent dans `.env.local` (non commité).
> Mis à jour : session du 27 juin 2026 (gating serveur réel déployé sur Vercel, webhook Stripe configuré et testé en ligne, connexion Google ajoutée, refonte de la fenêtre de paiement). Le ?paid=1 factice est supprimé.

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
- Webhook (filet de sécurité) : `POST /api/paiement/webhook` enregistre l'achat même si le navigateur se ferme. **CONFIGURÉ et testé en ligne** (réponse 200) : endpoint créé dans le dashboard Stripe (Développeurs → Webhooks), URL `https://test-personalit-s.vercel.app/api/paiement/webhook`, événement `payment_intent.succeeded`. Le secret `STRIPE_WEBHOOK_SECRET` est dans `.env.local` ET dans Vercel. Pour tester en LOCAL un jour : Stripe CLI (`stripe listen --forward-to localhost:3000/api/paiement/webhook`).

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

## Google (connexion OAuth « Continuer avec Google »)

- **Projet Google Cloud** : `test-personnalite-500721` (Google Auth Platform), rattaché à bourguignonluca21@gmail.com. Console : https://console.cloud.google.com/auth/overview?project=test-personnalite-500721
- **Écran de consentement** : type **Externe**, en mode **« Test »** (donc seuls les utilisateurs de test ajoutés peuvent se connecter, c'est pour ça que ça marche pour Luca).
- **Client OAuth** (type « Application Web ») : l'`ID client` et le `Code secret` sont collés **dans Supabase** (Authentication → Providers → Google), PAS dans `.env.local`. L'URI de redirection autorisé côté Google = le callback Supabase `https://lxaxwsplkvplhcpfltfi.supabase.co/auth/v1/callback`.
- **Côté code** : le bouton appelle `supabase.auth.signInWithOAuth({ provider: "google" })` avec un `redirectTo` vers `/auth/callback`. La route `src/app/auth/callback/route.ts` échange le `code` contre une session (cookies), puis renvoie sur la page résultat avec `?oauth=1` ; un effet de `FenetrePaiement` rouvre alors la fenêtre sur le paiement.
- **Redirect URLs Supabase** (URL Configuration) : `http://localhost:3000/auth/callback` et `https://test-personalit-s.vercel.app/auth/callback` ajoutés.
- ⚠️ L'écran Google affiche l'adresse technique `…supabase.co` (« flippante »). Pour la remplacer par ton domaine, il faut le **Custom Domain Supabase** (payant, Pro + domaine possédé). Voir « À faire plus tard ».

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
- Route de retour Google OAuth (échange le code, pose la session) : `src/app/auth/callback/route.ts`
- Fenêtre de paiement (modale, contient aussi le bouton Google + l'inscription) : `src/app/components/FenetrePaiement.tsx`
- Fenêtre de partage : `src/app/components/FenetrePartage.tsx`
- Route mail de sécurité (Resend) : `src/app/api/auth/notif-mot-de-passe/route.ts`
- Visuels des mails (source partagée aperçu + envoi) : `src/app/lib/emails/motDePasseChange.ts`, `src/app/lib/emails/codeConnexion.ts`
- Page nouveau mot de passe (filet de secours) : `src/app/nouveau-mot-de-passe/page.tsx`
- Page d'aperçu des mails (**TEMPORAIRE, à supprimer avant la prod**) : `src/app/apercu-mail/page.tsx`
- Variables d'environnement : `.env.local` (à la racine de `Next_js`, NON commité) — contient `NEXT_PUBLIC_SUPABASE_*`, `SUPABASE_SERVICE_ROLE_KEY`, `ACCES_SIGNING_SECRET` (clé aléatoire pour signer le cookie de preuve), `STRIPE_*`, `NEXT_PUBLIC_STRIPE_*`, `STRIPE_WEBHOOK_SECRET`, `RESEND_API_KEY`. ✅ Toutes ces clés ont été **ajoutées dans Vercel** (Settings → Environment Variables, importées depuis `.env.local`) le 27/06. Les identifiants Google ne sont PAS ici (ils vivent dans Supabase). ⚠️ Règle pour la suite : tout NOUVEAU secret ajouté dans `.env.local` doit aussi être ajouté dans Vercel avant de pousser, sinon la version en ligne plante.

## À faire plus tard (rappel)

- ~~Session Supabase côté serveur~~ : FAIT (`lib/supabase/server.ts` + `src/proxy.ts`).
- ~~Gating serveur réel~~ : FAIT (le `?paid=1` factice est supprimé ; déblocage par cookie de preuve OU achat sur le compte).
- ~~Webhook Stripe~~ : FAIT (configuré dans le dashboard Stripe + testé en ligne, réponse 200).
- ~~Variables d'environnement dans Vercel~~ : FAIT (toutes importées depuis `.env.local` le 27/06).
- ~~Connexion Google~~ : FAIT (marche en local et prêt pour Vercel).
- **Publier l'app Google en Production** : aujourd'hui l'écran de consentement est en mode « Test », donc seuls les utilisateurs de test peuvent se connecter. Avant l'ouverture au public : Google Auth Platform → Audience → « Publier l'application ». Scopes de base (email, profil) = pas de vérification Google nécessaire.
- **Custom Domain Supabase** (payant, plan Pro + domaine possédé) : pour remplacer l'adresse `…supabase.co` « flippante » affichée sur l'écran Google par ton propre domaine.
- **Créer les pages `/cgu` et `/confidentialite`** : les liens du formulaire d'inscription pointent dessus (404 pour l'instant).
- Mise en ligne : réactiver la confirmation email Supabase, vérifier Stripe (passage live).
- Sortir le projet de OneDrive (règle les pop-up de suppression et les vues tronquées).
- Emails : remplacer le **SMTP Gmail de test** par **Resend SMTP + domaine vérifié** (côté Supabase ET Resend), **supprimer la page `/apercu-mail`**, renforcer les critères de mot de passe côté Supabase (Min length 8 + requirements).

## Repères pratiques & pièges (pour les futures sessions)

- **Comptes des services** : Supabase, Stripe, Resend et le SMTP Gmail sont tous rattachés à l'adresse **bourguignonluca21@gmail.com**. Les secrets (clés API, mot de passe d'application) vivent UNIQUEMENT dans `.env.local` et dans les réglages Supabase, jamais dans ce doc.
- **URL de test d'une page résultat** : `http://localhost:3000/resultat/infp-v1?s=51-62-40-58&v=11-7-5`. ⚠️ `&paid=1` ne débloque PLUS rien (gating réel) : pour voir la version payée il faut un vrai paiement test (carte `4242…`) ou un achat déjà fait sur ce navigateur (cookie de preuve). `&recovery=1` ouvre la fenêtre sur « nouveau mot de passe » ; `&oauth=1` simule le retour Google (rouvre la fenêtre sur le paiement).
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
- État détaillé du projet : `ETAT_DU_PROJET.md` (section 8 septies pour la dernière session).
