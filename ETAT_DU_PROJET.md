# État du projet — Test de personnalité (passation)

> Document de passation pour reprendre le projet dans une nouvelle session sans perdre le contexte.
> Le code est la source de vérité ; ce fichier capture les **décisions**, **conventions** et **pièges**.
> **Accès aux services** (Supabase, Stripe : références, liens dashboard, où sont les clés) : voir **`ACCES_ET_SERVICES.md`** (même dossier). Les clés secrètes ne sont QUE dans `.env.local` (non commité).

## 1. Le projet
Site web de test de personnalité (startup FR), concurrent de 16Personalities, avec **notre propre contenu** (jamais le leur — uniquement la structure/agencement peut s'inspirer d'eux). Next.js 16 (App Router) + Tailwind v4. Dépôt : `3_SITE/1_infrastructure/Next_js`, branche `main`, remote GitHub `test-personalit-s`. Déploiement visé : push → Vercel.

## 2. État actuel
- La **page résultat** (`/resultat/[slug]`) est entièrement construite, stylée et **remplie pour les 48 profils**. INFP-V1 (le Poète) reste la **référence de style**.
- Le **squelette est FIGÉ** : tous les titres fixes, labels d'âge et titres de paires/compatibilité vivent une seule fois dans le template (voir §5/§9). Remplir/corriger un profil = ajouter du contenu dans `profils.ts`, jamais toucher au template.
- Remplir ou corriger un profil = suivre **`GABARIT_PROFIL.md`** (contenu clé par `CODE-Vx` dans `profils.ts` / `profils/<type>.ts`).
- Le test, le moteur de calcul, la page d'accueil et les pages de type existaient déjà.

## 3. Flux et URL
Fin du test → `/resultat/{code}-{variante}?s=…&v=…`
- `s` = les 4 scores bruts d'axe (15–75), ex. `51-62-40-58`
- `v` = les 3 scores de variante, ex. `11-7-5`
- Exemple de test : `localhost:3000/resultat/infp-v1?s=51-62-40-58&v=11-7-5`

## 4. Fichiers clés
- `src/app/data/moteur.ts` — `calculerType`, `calculerVariante`, `calculerSpectre`, `spectreFromScores`, `encoderScores`, `NOMS_VARIANTES` (48 noms).
- `src/app/data/types.ts` — 16 types, `getTypeByCode` (noms : Médiateur, Avocat…).
- `src/app/data/profils.ts` — **porte d'entrée unique du contenu** : `getProfil()`, `PROFIL_SECTIONS`, et les getters `getDescriptionVariante`, `getTexteVariante`, `getVarianteDetail`, `getSectionDetail`. Tout le contenu est clé par `CODE-Vx` (ou `CODE-Vx-section`).
- `src/app/resultat/[slug]/page.tsx` — le template. Composants : `GroupePoints`, `ParadoxeBlock`, `BlocsPaires`, `VarianteDetailBlock`, `SectionDetailBlock`, `LeviersBlock` (« Tes leviers forts »), `QuestionsBlock` (« Les questions à te poser »), `CarteFinPremium` (carte de fin).
- **Squelette figé** : en haut de `page.tsx`, les constantes `AGES` (labels Enfance→Ancien), `LABELS_BLOCS` et `LABELS_COMPAT` (titres des paires/compatibilités par section). On les change ici une fois → tous les profils suivent.
- Composants interactifs : `SpectreInteractif` (barres traits), `VarianteInteractif` (barres variantes), `CompatibiliteBlocs` (Les +/–, métiers, panneau au survol), `ResultatNav` (sommaire collant + scroll-spy).
- **`GABARIT_PROFIL.md`** — la procédure exacte pour remplir un profil (les 12 blocs de contenu + leur source dans le rapport long). À suivre pour chaque nouveau profil.
- Voir aussi `ARCHITECTURE_RESULTAT.md` (cadrage data + flux).

## 5. Structure de la page résultat (5 sections + carte de fin)
1. **Traits de personnalité** — barres du spectre + texte du type.
2. **Les variantes** — 3 barres + portrait + forts/faibles + paradoxe.
3. **Mes relations** — texte + faibles/forts + toxique/réussit + Les –/Les + (survol) + paradoxe.
4. **Professionnel** — texte + faibles/forts + éteint/booste + à éviter/métiers (survol) + paradoxe.
5. **Mindset & dév perso** — accroche + « Comment tu évolues » (+ frise Enfance→Ancien) + **« Tes leviers forts »** (cartes vertes 100 % positives, plus de « pièges/antidotes ») + **« Les questions à te poser »** (style éditorial, questions introspectives) + paradoxe.
- **Carte de fin « Accéder maintenant »** (`CarteFinPremium`, dans le template) : argumentaire premium + prix (7,90 €) + bouton + phrase teaser Ombre/Lumière. Générique, identique sur tous les profils. A remplacé l'ancien « mot pour la route » et l'ancien CTA bas.

## 6. Conventions de style / DA (à respecter absolument)
- Police système, vert de marque `rgba(51,164,116,0.85)`, texte noir à 75 % `rgba(0,0,0,0.75)`.
- Voix **« tu »** partout. **Pas de tirets longs (—)** → virgules.
- Titres de section : « N. » en vert + libellé.
- Forts/faibles : titre en **pastille verte**, items sur **2 colonnes**, **mot-clé en vert** (champ `accent`).
- Paires (booste/éteint, etc.) : pastille verte (positif) / rouge (négatif), fond pâle assorti, marqueurs +/–.
- **« Finir sur le positif »** : faibles **au-dessus** des forts ; dans chaque paire, négatif à gauche, positif à droite.
- **Panneaux au survol (les 3 identiques)** : ancrés **sous le menu** (top = bas du menu + 16 px), hauteur adaptée au contenu, fondu entrée/sortie (le contenu reste pendant la sortie).

## 7. Décisions produit
- Le **floutage/brouillage** (cf. §8 quater : `BlocVerrouille`, contenu verrouillé brouillé côté serveur). Le **paiement réel** (Stripe) et les **comptes** (Supabase) sont montés (cf. §8 quinquies/sexies). Le **vrai gating serveur est désormais FAIT** (cf. §8 septies) : le `?paid=1` factice a été **supprimé**, le déblocage se fait par cookie de preuve d'achat OU achat vérifié sur le compte. Carte de fin premium affichée, prix 7,90 €.
- **Recadrage « valoriser, pas pointer les failles »** : la section dév perso ne nomme plus de « pièges/faiblesses » ; on parle de « leviers forts » et de questions à se poser.
- La **profondeur des variantes** est le différenciateur (16P ne l'a pas) : on la détaille au maximum.
- Contenu tiré des **rapports longs de l'utilisateur** (`1_PRODUIT/test personnalités/personnalites/<TYPE>/rapport_long/…`) — c'est son contenu, on peut l'utiliser.

## 8. Pièges techniques (déjà rencontrés)
- **OneDrive** : le bac à sable Linux voit certains fichiers comme « cloud-only » (tronqués) → `tsc`/lectures auto donnent de **faux** négatifs. Vérité = le **rendu du serveur de dev Windows**, pas `tsc` côté sandbox.
- **Git** : `.git` est dans OneDrive ; le sandbox ne peut pas y écrire (permission refusée) + un `.git/index.lock` reste coincé. **Commit/push uniquement depuis le terminal Windows / Claude Code** (qui a les identifiants). Commencer par `rm -f .git/index.lock`.
- Les **tests de survol/scroll automatisés** (Chrome MCP) ne déclenchent pas le survol React de façon fiable → faux négatifs. Se fier au navigateur réel de l'utilisateur.
- Next.js 16 : `await params` / `await searchParams`.

## 8 bis. Vision produit & monétisation (à lire)
La stratégie long terme est capturée dans **`VISION_FUNNEL_ANGE_DEMON.md`** (même dossier) : funnel à 3 paliers (test sain → test dark → parcours « Ange & Démon »), comptes Supabase comme cœur du système, formation modulaire scalable, positionnement vs 16P. À lire avant de décider du paywall, des comptes ou du test dark.

## 8 ter. POINT DE REPRISE (audit + dé-duplication — juin 2026)
Les **48 profils sont remplis** : INFP×3 et ENFP-V1 inline dans `profils.ts`, les 14 autres types dans `src/app/data/profils/<type>.ts`. Build validé OK (31 pages). Le contenu n'est PAS abîmé : les « troncatures » vues au sandbox sont des **vues OneDrive tronquées** (faux négatifs) ; l'outil **Read** télécharge le vrai fichier.

**Règle de cadrage (affinée et IMPORTANTE) :** on ne corrige QUE la répétition **à l'intérieur d'un même résumé** (une page = un type × variante). Les répétitions ENTRE profils sont **acceptées** : chaque profil doit rester propre à lui-même.

**Audit complet des 48 fait → voir `AUDIT_48_PROFILS.md`** (même dossier). Constats clés :
- 🔴 **ISTJ entièrement SANS ACCENTS** (`istj.ts` : « le jour ou tu », « ta fiabilite », « procedures »…). Pas un bug d'encodage, les accents sont absents. À **ré-accentuer en entier** (les 3 variantes). PRIORITAIRE.
- **42 profils sur 48** ont des tics internes (phrases répétées dans le même résumé). Pires : ESFP-V3 « ton goût du beau » ×11, ISTJ-V3 « ce que tu portes » ×10, ISFP×3, ISTP, ISFJ-V2 (détail dans le rapport).

**Passe anti-répétition (intra-résumé) :**
- **ISFJ-V1 : FAIT** — titres des « points forts/faibles » diversifiés (un même titre ne revient plus 3× sur la page) + phrases de texte dé-dupliquées (« n'est pas de l'égoïsme » 3→1, ouvertures des 4 paradoxes variées, « prendre soin de toi » 6→3). Appliqué dans `isfj.ts`, vérifié.
- Reste : ISFJ-V2/V3, puis tous les autres résumés par ordre de gravité du rapport.

LEÇON MÉTHODE : OneDrive sert des vues tronquées au sandbox (`bash`/`tsc`/`grep` = faux négatifs) ; l'outil **Read** est fiable. Les **édits séquentiels + relecture de vérif** depuis Cowork marchent. NE JAMAIS lancer de sous-agents qui écrivent en parallèle (c'est ça qui corrompt OneDrive). Toujours valider par un `npm run build` côté Windows.

## 8 quater. POINT DE REPRISE — session 23 juin 2026 (refonte visuelle page résultat + paywall prototype)

**Page résultat finalisée visuellement** (template, donc s'applique aux 48) :
- **Héros refait** : colonne centrée `max-w-3xl mx-auto` ; **emblème carré** à droite (monogramme du code, ex. « INFP », pastille blanche translucide, centré verticalement sur le bloc texte) ; accroche tenue sur une ligne (plus de `max-w-xl`) ; bouton « Refaire le test » **retiré** (reste « Partager mon profil »).
- **Menu de gauche** (`ResultatNav`) : apparaît en **fondu au scroll** (scrollY > 80) ; sur grand écran (**xl**) il flotte à gauche de la colonne centrée (rail `absolute right-full`), sinon barre collante en haut (breakpoints passés de `md:` à `xl:`). Liens en **noir 55 %**, section active en vert.
- **Menu de progression à droite** (`ProgressionMenu.tsx`, NOUVEAU) : titre « Ton résumé » ; liste toute la table des matières (sections + blocs : points forts/faibles, paradoxes, compatibilités, métiers, etc.), **coche verte = gratuit / cadenas = payant**. Chaque ligne apparaît quand son bloc atteint le bas de l'écran (repères `data-prog` posés devant chaque bloc dans `page.tsx`), apparaît en même temps que le menu de gauche, **dépliage animé**, **curseur de scroll vert custom** (sans flèches) qui grossit en douceur au survol, le panneau **suit la dernière ligne**, et s'arrête en bas de l'encart premium.
- **Bloc de précision** (`PrecisionRating.tsx`, NOUVEAU) tout en bas : « À quel point ce portrait te ressemble ? » + 5 visages cliquables. **Visuel uniquement** (le vote n'est envoyé/stocké nulle part, à brancher plus tard).
- **Prix de la carte de fin** `CarteFinPremium` : **7,90 €** (n'est plus 6 €).

**Paywall PROTOTYPE (Phase 1, visuel + sécurité du contenu) :**
- Flag **`isPaid` via `?paid=1`** (factice, le bouton « Débloquer » y mène). Composant **`BlocVerrouille.tsx`** (NOUVEAU) : floute le contenu premium + overlay CTA « Je débloque mon rapport » (le « (6 €) » a été retiré du bouton verrou).
- **Découpage gratuit / verrouillé** : gratuit = traits, intros/aperçus, barres de variantes, **points forts/faibles** de chaque section ; verrouillé (flouté) = description des axes et des variantes (au survol), paradoxes, blocs toxique/réussit, compatibilités (Les +/–), environnements/métiers, « Comment tu évolues » + frise, leviers, questions.
- **SÉCURITÉ : le vrai texte verrouillé n'est jamais envoyé au navigateur d'un non-payeur.** Côté serveur, quand non payé, les champs verrouillés sont **brouillés** (lettres aléatoires, **même longueur/structure exacte**, espaces/ponctuation conservés ; champ `ton` positif/négatif préservé pour ne pas casser couleurs/libellés) via `scrambleStr` / `scrambleDeep` / `brouillerSection` / `brouillerVariante` dans `page.tsx`. Les points forts/faibles gratuits restent réels.
- **Panneaux au survol des blocs verrouillés** (compatibilités) : s'affichent **floutés + cadenas** (rouge sur bloc négatif, vert sur positif), rendus via **portail** (`createPortal`) pour se positionner correctement malgré le flou de l'ancêtre. `BlocVerrouille` laisse passer le survol (overlay `pointer-events-none`, seul le bouton `pointer-events-auto`).

**48 profils : CONFIRMÉS COMPLETS** (16 types × 3 variantes) — 48/48 clés `CODE-Vx` vérifiées. INFP×3 + ENFP-V1 inline dans `profils.ts` (vue tronquée par OneDrive au sandbox, mais contenu réel présent, vérifié via l'outil Read + rendu de la page).

**Nouveaux fichiers de composants :** `ProgressionMenu.tsx`, `BlocVerrouille.tsx`, `PrecisionRating.tsx` (dans `src/app/components/`).

**⚠️ Tout le travail de cette session est NON COMMITÉ. Commit/push depuis Windows.**

**Prochaine étape (validée avec l'utilisateur) :** concevoir la **page de paiement** (structure + design). Ensuite Phase 2/3 : **comptes Supabase**, **Stripe** (checkout + webhook + table `achats`), et **gating serveur réel** (ne servir le contenu premium qu'après achat vérifié ; le brouillage actuel est déjà une bonne base). Hébergement visé : Vercel (push GitHub → déploiement auto), tout côté serveur, indépendant de l'ordi de l'utilisateur.

## 8 quinquies. POINT DE REPRISE, session 24 juin 2026 (comptes Supabase + paiement Stripe réel dans la fenêtre)

**La « page de paiement » est une FENÊTRE (modale), pas une route.** Décision produit validée : le bouton « Débloquer mon rapport complet » ouvre une fenêtre qui s'agrandit par dessus la page résultat (fond légèrement flouté, scroll de fond conservé), et NON une nouvelle page. Composant : `src/app/components/FenetrePaiement.tsx` (client), branché dans `CarteFinPremium` (et seulement là pour l'instant ; les `BlocVerrouille` internes pointent encore vers `/pack-carriere-premium`, à rebrancher plus tard si voulu).

**Structure de la fenêtre :**
- Bande haut commune : emplacement « Ton logo » (placeholder, vrai logo à venir). Dégradé vert de la home (`MeshGradient`) porté par toute la fenêtre.
- Écran 1 (choix) : une grande pastille verte « Continuer vers le paiement » + deux petites « Se connecter » / « Créer un compte ». Hauteur figée (`minHeight`) pour ne pas sauter quand on bascule vers le formulaire de connexion.
- « Se connecter » / « Créer un compte » affichent un mini formulaire email + mot de passe (2 champs pilule à fin contour) dans la MÊME fenêtre, sans changer sa taille.
- Écran 2 (paiement) : flèche retour seule, pastille verte « Finalise ton accès », récap (Rapport complet, 7,90 €), total, le formulaire Stripe, « Paiement unique… ».
- La fenêtre épouse la hauteur de l'écran actif (animée, via `ResizeObserver`), plafonnée à `92vh`. L'écran paiement défile en interne avec un **curseur de scroll vert custom identique au `ProgressionMenu`** (natif masqué, thumb dessiné, grossit au survol : classes `fp-noscroll` / `fp-thumb` / `fp-thumbwrap`).
- Fermeture (croix / clic fond / Échap) ramène en douceur sur l'encart `#encart-final` (« Va au bout de toi même »).
- Bouton « Partager mon profil » (à côté de « Débloquer ») ouvre une 2e fenêtre `FenetrePartage.tsx` (icônes réseaux : Insta, Facebook, Messenger, Snapchat, WhatsApp, X, TikTok, Copier le lien). Boutons sans action pour l'instant (le vrai lien de partage viendra plus tard).

**Comptes Supabase (email + mot de passe) — EN PLACE et fonctionnels :**
- Décision : on construit **les comptes d'abord**, puis on rattachera le paiement dessus. « Continuer sans inscription » reste la porte douce (mène direct au paiement aujourd'hui).
- Projet Supabase `ref = lxaxwsplkvplhcpfltfi`. Connecteur : `src/app/lib/supabase/client.ts` (`@supabase/ssr`, `createBrowserClient`).
- `.env.local` (NON commité) contient `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (publiques).
- Les formulaires de la fenêtre appellent `supabase.auth.signUp` / `signInWithPassword`. Vérifié : créer un compte ajoute bien l'utilisateur dans Supabase → Authentication → Users.
- **Confirmation par email DÉSACTIVÉE** dans Supabase (Authentication → Providers → Email) le temps des tests : un compte créé marche tout de suite. À réactiver avant la mise en ligne.
- Table `public.achats` créée (user_id, produit, profil, montant_cents, devise, statut, stripe_payment_intent, created_at) avec **RLS** (politique : chacun ne lit que ses propres achats). Pas encore d'insert depuis le code (viendra via le webhook serveur).
- Pas encore montés : `server.ts` (client Supabase serveur via cookies) ni `middleware.ts`. Donc la session n'est pas encore lue côté serveur (nécessaire pour le gating réel).

**Paiement Stripe — RÉEL et intégré dans la fenêtre (mode test) :**
- Compte Stripe créé (non vérifié, suffisant pour le mode test ; la vérification + un statut d'entreprise seront requis pour encaisser en vrai).
- `.env.local` : `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (pk_test) et `STRIPE_SECRET_KEY` (sk_test, serveur seulement).
- `src/app/lib/stripe.ts` (client Stripe serveur). Route `src/app/api/paiement/intent/route.ts` : POST → crée un PaymentIntent de **790 centimes EUR**, `automatic_payment_methods: enabled`, renvoie le `client_secret`. **Le montant est fixé côté serveur.**
- Dans la fenêtre : `<Elements>` + `<PaymentElement layout="tabs">` (compact), `appearance` à la DA (vert, police système, arrondis). Moyens affichés = ceux activés dans le dashboard Stripe (carte, Klarna, Bancontact, Amazon Pay, MB WAY…).
- `confirmPayment({ redirect: "if_required", confirmParams.return_url })` : la carte reste en ligne, les moyens à redirection (Klarna) reviennent sur `return_url`.
- **Gating encore prototype** : au succès, on fait `router.push(unlockHref)` qui ajoute `?paid=1` et re-rend le rapport déflouté. Le vrai gating (achat vérifié) reste à faire.
- Librairies installées : `stripe`, `@stripe/stripe-js`, `@stripe/react-stripe-js`, `@supabase/supabase-js`, `@supabase/ssr`.

**Nouveaux fichiers :** `components/FenetrePaiement.tsx`, `components/FenetrePartage.tsx`, `components/ScrollHaut.tsx`, `lib/supabase/client.ts`, `lib/stripe.ts`, `api/paiement/intent/route.ts`, `.env.local`, et **`ACCES_ET_SERVICES.md`** (mémo des accès aux services, sans secrets). (`components/RevealShine.tsx` a été créé puis abandonné, à supprimer.)

**⚠️ OneDrive :** le serveur de dev et `node_modules` / `.next` ont déclenché des pop-up OneDrive « supprimer N fichiers » (N qui grimpe). On a cliqué « Conserver les fichiers » et **mis OneDrive en pause**. Vraie solution à planifier : **sortir le projet de OneDrive** (réglera aussi les vues tronquées chroniques).

**⚠️ Tout le travail de cette session est NON COMMITÉ.** Commit/push depuis Windows / Claude Code.

## 8 sexies. POINT DE REPRISE, session 24 juin 2026 (suite : mot de passe oublié, mail de sécurité, connexion par code email, refonte visuelle de la fenêtre)

Tout est dans `components/FenetrePaiement.tsx` (la modale) sauf mention contraire. **Travail commité et poussé sur `main`.**

**Mot de passe oublié, parcours complet :**
- Vue « reset » dans la fenêtre (lien « J'ai oublié mon mot de passe » sur l'écran connexion) : saisie email puis `supabase.auth.resetPasswordForEmail`. Le `redirectTo` renvoie le client sur **SA page de résultat** avec `?recovery=1` (pas une page séparée), pour ne pas lui faire perdre son test.
- Au retour, un effet détecte `?recovery=1`, rouvre la fenêtre sur la vue « nouveau » (« Crée ton nouveau mot de passe »), `supabase.auth.updateUser`, puis enchaîne sur le paiement. Le marqueur est nettoyé de l'URL.
- **Filet de secours** : page `src/app/nouveau-mot-de-passe/page.tsx` (cas où on n'a pas le contexte, ex. autre appareil). Encore sur l'ancienne règle « 6 caractères » (à aligner si voulu).
- **Supabase à configurer** : Authentication → URL Configuration → Redirect URLs : `http://localhost:3000/resultat/**` et `http://localhost:3000/nouveau-mot-de-passe` (+ équivalents Vercel à la mise en ligne).
- **Limite connue** : le reset est lié au navigateur d'origine (PKCE). Cross-appareil = filet de secours. À traiter plus tard.

**Critères de mot de passe + œil :**
- Critères « 8 caractères, une majuscule, une minuscule, un chiffre » (sans symbole), affichés en liste verte qui se coche (composant `ChecklistMdp` dans `FenetrePaiement.tsx`), sur l'inscription et le nouveau mot de passe. Le bouton reste bloqué tant que tout n'est pas validé.
- **À renforcer côté Supabase (le vrai verrou, pas encore réglé)** : Authentication → Providers → Email, Min password length 8 + Password Requirements.
- Œil afficher/masquer sur tous les champs mot de passe.

**Mail de sécurité « mot de passe changé » (Resend) :**
- Route `src/app/api/auth/notif-mot-de-passe/route.ts` : vérifie le **jeton Supabase** (Authorization: Bearer) pour déduire l'email du compte connecté (pas spoofable), puis envoie via l'**API Resend** (`fetch`, aucun package installé). Clé `RESEND_API_KEY` dans `.env.local`. Expéditeur de test `onboarding@resend.dev` (mode test Resend : n'envoie que vers l'adresse du compte Resend).
- Après un changement de mot de passe réussi : petite fenêtre de confirmation (pastille verte) puis « Continuer » vers le paiement.

**Connexion par CODE email (passwordless / OTP), en plus du mot de passe :**
- Vue « code » dans la fenêtre (lien « Recevoir un code par email à la place » sur l'écran connexion) : email puis `supabase.auth.signInWithOtp({ shouldCreateUser: true })`, puis saisie d'un **code à 6 chiffres** puis `verifyOtp({ type: "email" })`. Tout reste dans la fenêtre (pas de lien magique), donc le client revient pile où il était pour payer.
- **Supabase réglé** : Email OTP Length **6**, Email OTP Expiration **600 s**, **SMTP custom = Gmail (temporaire)** via mot de passe d'application (obligatoire pour personnaliser les templates), template « Magic Link or OTP » personnalisé avec `{{ .Token }}`, objet `{{ .Token }} est ton code de connexion` (déclenche le bouton « copier le code » de Gmail, surtout mobile).
- ⚠️ **SMTP Gmail = TEST uniquement** (expéditeur perso, quota ~500/j, risque spam). À remplacer par Resend SMTP + domaine vérifié à la mise en ligne.

**Animation de succès de connexion :** après une connexion réussie (mot de passe, inscription ou code), une coche verte apparaît en fondu par-dessus la fenêtre, puis bascule en douceur sur le paiement (`reussiteConnexion`).

**Mails transactionnels, source partagée + aperçu :**
- HTML des mails dans `src/app/lib/emails/` : `motDePasseChange.ts` (sécurité) et `codeConnexion.ts` (code). DA commune façon Apple (fond blanc, logo placeholder, vert en touches, encart vert pâle). Les SVG (bouclier) ne s'affichent pas dans les boîtes mail : versions email sans SVG.
- **Page d'aperçu TEMPORAIRE `src/app/apercu-mail/page.tsx`** pour designer les mails en direct dans le navigateur. **À SUPPRIMER avant la mise en ligne.**

**Refonte visuelle de la fenêtre :**
- Écran de choix (logo + « Continuer vers le paiement » + « Se connecter »/« Créer un compte ») : **fond transparent** (la page floutée transparaît), fond blanc qui revient en fondu dès qu'on entre dans un formulaire ou le paiement (conditionné sur `step`/`view`).
- « Se connecter »/« Créer un compte » : boutons **givrés** (blanc translucide, contour, ombre, flou de fond, texte blanc + ombre portée). Léger grossissement au survol (classe `.fp-pill`). « Continuer vers le paiement » reste vert plein.

**Fix menus :** la carte premium de fin (`CarteFinPremium`) a été **remise dans la zone des menus** (`page.tsx`) pour que les rails (gauche `ResultatNav` + droite `ProgressionMenu`) descendent jusqu'en bas de la carte, comme sur la version payée.

**Nouveaux fichiers :** `api/auth/notif-mot-de-passe/route.ts`, `lib/emails/motDePasseChange.ts`, `lib/emails/codeConnexion.ts`, `nouveau-mot-de-passe/page.tsx`, `apercu-mail/page.tsx` (temporaire). `.env.local` : ajout `RESEND_API_KEY`.

**Gating à la fin de cette session** : c'était encore le `?paid=1` factice. **FAIT depuis** (cf. §8 septies) : le vrai gating serveur est en place et le `?paid=1` a été supprimé.

## 8 septies. POINT DE REPRISE, session 27 juin 2026 (gating réel en ligne, webhook Stripe, connexion Google, refonte de la fenêtre de paiement)

**Gating serveur réel — FAIT, déployé et testé en ligne.**
- `src/app/lib/supabase/server.ts` (client serveur via cookies) + `src/proxy.ts` (l'ex-middleware, **renommé « proxy » en Next 16**) : le serveur sait qui est connecté.
- `src/app/lib/supabase/admin.ts` (clé `service_role`, serveur uniquement) pour écrire les achats.
- `src/app/lib/acces.ts` : **preuve d'achat anonyme** = cookie signé HMAC (`acces_rapport`, httpOnly) avec `ACCES_SIGNING_SECRET`, infalsifiable.
- `src/app/api/paiement/acces/route.ts` : au paiement réussi, le navigateur l'appelle ; elle re-vérifie le paiement chez Stripe, enregistre l'achat (table `achats`, `service_role`), pose le cookie. C'est ce qui débloque (même sans compte).
- `api/paiement/intent` estampille le PaymentIntent avec `user_id` (si connecté) + le **slug** du profil.
- `page.tsx` : `isPaid` = (cookie de preuve contient ce slug) OU (compte connecté avec achat `payé`). Le `?paid=1` est supprimé.
- Table `achats` ajustée (SQL) : `user_id` NULLABLE, index unique sur `stripe_payment_intent`, colonne `email`.
- **Vercel** : toutes les variables d'environnement (Supabase, Stripe, Resend, + les nouvelles `SUPABASE_SERVICE_ROLE_KEY` et `ACCES_SIGNING_SECRET`) ont été **importées dans Vercel** (elles manquaient, ce qui faisait échouer le build). Build redevenu vert, **gating testé en ligne** : `?paid=1` ne débloque plus, un vrai paiement test débloque et ça tient au rechargement.

**Webhook Stripe — FAIT et testé en ligne (200).** `src/app/api/paiement/webhook/route.ts` (filet de sécurité, enregistre l'achat même si le navigateur se ferme). Endpoint créé dans le dashboard Stripe (Développeurs → Webhooks) vers `https://test-personalit-s.vercel.app/api/paiement/webhook`, événement `payment_intent.succeeded`. `STRIPE_WEBHOOK_SECRET` dans `.env.local` ET Vercel.

**Connexion « Continuer avec Google » — FAIT (marche en test).**
- Bouton Google (logo officiel) sur l'écran de choix + dans les vues « Se connecter »/« Créer un compte », avec séparateur « ou ».
- `supabase.auth.signInWithOAuth({ provider: "google" })` + route de retour `src/app/auth/callback/route.ts` (échange le `code` contre une session, renvoie sur la page résultat avec `?oauth=1` ; un effet rouvre la fenêtre sur le paiement).
- Config : projet Google Cloud `test-personnalite-500721`, client OAuth Web, identifiants collés dans Supabase (Providers → Google), redirect URLs `/auth/callback` ajoutées dans Supabase (local + Vercel).
- ⚠️ Écran de consentement Google en mode **« Test »** (seuls les utilisateurs de test peuvent se connecter). À **publier en Production** avant l'ouverture au public. L'écran affiche l'URL technique `…supabase.co` : pour la remplacer par ton domaine il faudra le **Custom Domain Supabase** (payant). Voir détails dans `ACCES_ET_SERVICES.md`.

**Refonte visuelle de la fenêtre de paiement** (`FenetrePaiement.tsx`) :
- Fond **blanc plein** partout (fini le verre dépoli translucide / l'effet miroir).
- Boutons « Se connecter »/« Créer un compte » : **blanc à texte vert** (avant : givrés texte blanc, illisibles sur fond blanc).
- Vue **« Créer un compte » en 2 colonnes** (la fenêtre s'élargit) : à gauche le formulaire, à droite un encart **vert foncé** « Ce n'est que le début de ton parcours. » (tests réunis, croisements **bientôt**, parcours **bientôt**, « Rien à payer, tout à découvrir. »). Responsive : colonnes empilées sur mobile.
- Champ **« Ton prénom ou pseudonyme »** (requis), enregistré dans les métadonnées Supabase (avec la pref newsletter).
- **Confirmation du mot de passe** (opacité réduite tant que le mdp est vide, œil synchronisé avec le champ mdp), bloque le bouton si les deux diffèrent.
- **Case newsletter** (apparaît en fondu à la saisie de l'email, décochée par défaut = RGPD).
- Titre **« Je crée mon compte »** (vert), lignes **« Tes données restent privées. »** + **CGU** (liens `/cgu` et `/confidentialite`, pages à créer).

**Nouveaux fichiers :** `lib/supabase/server.ts`, `lib/supabase/admin.ts`, `lib/acces.ts`, `src/proxy.ts`, `api/paiement/acces/route.ts`, `api/paiement/webhook/route.ts`, `auth/callback/route.ts`. `.env.local` : ajout `SUPABASE_SERVICE_ROLE_KEY`, `ACCES_SIGNING_SECRET`, `STRIPE_WEBHOOK_SECRET`.

**État commit/push :** le gating a été commité, poussé et déployé sur Vercel. La refonte de la fenêtre + le bouton Google sont à **commiter/pousser** (pas de nouvelle clé Vercel pour Google, les identifiants sont dans Supabase).

## 8 octies. POINT DE REPRISE, session 28 juin 2026 (page de profil partageable `/p/[slug]` + affinage du paywall) — ⚠️ TOUT NON COMMITÉ

**⚠️ Toute cette session est NON COMMITÉE.** Commit/push depuis Windows / Claude Code quand validé (procédure dans `AGENTS.md`).

**A. Page résultat (`/resultat/[slug]`) — paywall plus fin + finitions.**
- **Forts/faibles : 3 gratuits + 3 floutés.** Dans les 3 sections (variantes, relations, pro), chaque liste de points forts ET de points faibles montre les `POINTS_GRATUITS = 3` premiers en clair, floute les 3 suivants (brouillés côté serveur via `brouillerPoints`, comme le reste du payant) avec un **petit cadenas vert** par item. Une fois payé, les 6 s'affichent.
- **Cadenas verts par carte** ajoutés sur les blocs rouge/vert verrouillés : les **paires** (`BlocsPaires` : toxique/réussit, éteint/booste), les **compatibilités** (`CompatibiliteBlocs` : Les +/Les −), les **4 cartes du parcours de vie** et les **4 leviers forts** (`LeviersBlock`). Pour que le cadenas soit NET (pas flouté par le parent), ces blocs ont été **sortis du grand `BlocVerrouille`** et floutés carte par carte ; le texte reste brouillé côté serveur (sécurité intacte).
- **Ombre douce au survol** (`transition-shadow hover:shadow-sm`) sur **tous les blocs de couleur** (verts ET rouges).
- **Position du CTA « Le plus intéressant sur toi commence ici. »** : `BlocVerrouille` a deux nouvelles props, **`ctaPosition` ("center"|"top"|"bottom")** et **`showCta` (bool)**. Le **paradoxe** de chaque section porte le CTA, **centré** (donc à la même place partout) ; « Comment tu évolues » porte un CTA **en haut** ; le reste verrouillé est flouté **sans** CTA. `SectionDetailBlock` a été restructuré pour ça.

**B. NOUVELLE page publique de profil partageable : `/p/[slug]`** (`src/app/p/[slug]/page.tsx`).
- Page d'atterrissage quand on ouvre un profil partagé. **noindex**, ne montre PAS le contenu payant, lit le type+variante du slug + les scores `s`/`v` de l'URL. Voix neutre (« Son spectre », « Ses variantes »), sauf l'eyebrow « Ma personnalité : » (à harmoniser, voir plus bas).
- **Héros = bloc vert** (DA de la page résultat) : « Ma personnalité : », nom du type, `CODE · variante`, **emblème carré blanc translucide** à droite (du haut de « Médiateur » au bas de « CODE · variante »), description neutre (de la variante) justifiée. L'emblème et le bord droit du paragraphe sont alignés au pixel sur le « Introverti » du spectre en dessous (vérifié dans le navigateur).
- **Emblème carré** : `components/EmblemeCarre.tsx` (client) mesure sa hauteur (donnée par `self-stretch`) et fixe la largeur égale. RAISON : `aspect-square` sur un item flex se dimensionne sur la largeur du texte « INFP », pas sur le carré (il débordait de 46 px). Piège à retenir.
- **Spectre : `components/SpectrePublic.tsx`** — les 4 axes en **barres** (même langage que la page résultat). DÉCISION : le **camembert a été rejeté** (hors DA, et il enterrait le différenciateur « spectre détaillé en % », cf. document fondateur). Au **scroll** (plus au survol), un panneau explicatif par dimension apparaît en douceur dans la marge : Esprit haut-gauche, Énergie haut-droite, Nature bas-gauche, Tactique bas-droite, chacun = **moitié de la hauteur de la carte** (28 px d'écart au centre). Paire du **haut** dès ~1 cm de scroll, paire du **bas** dès ~3 cm, réversible. Sur **mobile** : « ? » cliquable → accordéon sous la ligne.
- **Variantes** : barre segmentée (`VarianteBarre`) + légende. **CTA bas** « Et toi, qui es-tu vraiment ? » → `/test`. Fond `MeshGradient`.
- Lien de test : `http://localhost:3000/p/infp-v1?s=51-62-40-58&v=11-7-5` (fenêtre large ≥ 1280 px pour les panneaux de marge).

**C. Stratégie de partage (décidée, à construire).** Le bouton « Partager » du résumé ouvrira une fenêtre avec **des boutons réseaux** (pas des liens nus). Réalité technique tranchée :
- WhatsApp, Messenger, Facebook, X, Telegram, mail, SMS : **liens d'intention** (message pré-rempli + le lien `/p/...`).
- Instagram, TikTok, Snap : **pas de partage de lien** → on partage une **image** (story 9:16). Sur mobile, le bouton « Partager » natif (**API Web Share**, avec l'image) couvre ces apps (façon Strava) ; sur ordi : boutons à liens + « télécharger l'image ».
- → **L'image de partage est la pièce maîtresse.** Maquette de direction faite (hors projet) ; la **génération d'image par profil** (Next `ImageResponse`) reste à faire.

**Nouveaux fichiers (NON commités) :** `src/app/p/[slug]/page.tsx`, `src/app/components/SpectrePublic.tsx`, `src/app/components/EmblemeCarre.tsx`. Ajout d'un keyframe `trembler` dans `globals.css` (**devenu inutilisé** depuis le passage au scroll → candidat à suppression).

**À RETRAVAILLER (signalé par l'utilisateur), avant tout le reste du chantier partage :**
- Le **contenu des panneaux du spectre** est trop « fiche encyclopédique » (« Les personnes Introverties… »), c'est jugé morose. À réécrire en **mini-portraits courts, vivants, personnalisés** sur le pôle dominant (accroche qui claque + image concrète), éventuellement + une petite icône originale par dimension (DA épurée, pas un personnage façon 16P). Direction validée, pas écrite.
- **Harmoniser la voix** de `/p` : héros au « je » (« Ma personnalité ») vs reste au « il/elle » (« Son spectre »). Trancher.

## 8 nonies. POINT DE REPRISE, session 30 juin 2026 (partage finalisé + QR + refonte accueil / navbar / page test)

**⚠️ Tout est NON COMMITÉ sauf le 1er lot** (logos Snapchat/Reddit, carrousel une ligne, flèches, largeur navbar) commité/poussé en début de session. Le reste est à commiter depuis Windows (procédure `AGENTS.md`).

**A. Bloc de partage en bas du résumé (`PartageInline.tsx`, affiché sur résumé payé ET non payé).**
- Logos **Snapchat** (tuile jaune pleine) et **Reddit** (tracé SVG `IC.reddit` sur tuile orange) corrigés (avant trop petits). **TikTok ajouté** (tuile noire, logo blanc ; partage natif comme Insta/Snap).
- Carrousel **sur une seule ligne** défilable, icônes plus grosses, deux **flèches rondes vertes** (vert de marque, chevron blanc) qui défilent petit à petit ; scroll manuel OK. Flèches + rangée de logos **alignées au pixel sur la largeur du texte** du bloc (mesuré dans Chrome).
- **Message pré-rempli dynamique** : `Hey, j'ai fait ce test de personnalité, je suis {code} : {variante}. Regarde mon profil :` + lien `/p/{slug}?s&v`. S'adapte à chaque profil.
- `BlocPartageFin` (« Et tes proches, qui sont-ils vraiment ? ») affiché en bas du résumé payé ET **sous la carte premium** sur la version non payée.
- Les boutons **« Partager mon profil »** (héros + carte premium) n'ouvrent plus `FenetrePartage` : ils **défilent** (ancre `#partage-fin`) vers l'encart. `FenetrePartage` n'est plus appelé dans `page.tsx` (fichier conservé). → supersede le « construire la fenêtre de partage » du §9.

**B. QR code → page `/partager` (pont ordi → téléphone).**
- Icône **QR** au bout du carrousel (pastille verte). Clic → fenêtre avec un **QR généré en local** (`qrcode.react`, à installer : `npm install qrcode.react`) encodant `/partager/{slug}?s&v`.
- Nouvelle page **`src/app/partager/[slug]/page.tsx`** (minimale, `noindex`), ouverte sur le téléphone après scan : un bouton vert « Partager mon profil » (`components/BoutonPartageNatif.tsx`) qui ouvre la **feuille de partage native du téléphone** (`navigator.share`, repli copie du lien sur ordi). Le lien partagé mène toujours à `/p`. ⚠️ Le scan ne marche qu'avec un **vrai domaine** (localhost/IP locale non joignables).

**C. Vignette OG (og:image) — DESIGN VALIDÉ, pas encore codée.** Image 1200×630 : bloc vert arrondi avec la **pastille du code** (« INFP ») à gauche + le **logo blanc** à droite (même taille, logo pas encore fourni), et `{code} · {variante}` en **vert centré** sous le bloc (doit être DANS l'image, le titre de la carte d'aperçu étant stylé par l'appli qui reçoit). À coder via Next `ImageResponse` quand le domaine sera en ligne. Détail dans la mémoire de projet.

**D. Page d'accueil (`Hero.tsx`, `Stats.tsx`, `MeshGradient.tsx`, `page.tsx`).**
- Héros : un seul CTA **« Découvrir ma personnalité »** (vert, texte blanc, centré), « Explorer les types » retiré, bouton qui **grossit au survol** (`hover:scale-105`). « Toi » de l'accroche en semi-gras.
- Stats : **96% de précision · 48 profils détaillés · 10 min** (le 96% est un **placeholder** du futur taux de reconnaissance, à brancher sur le vote « À quel point ce portrait te ressemble ? »). Majuscule en tête de libellé.
- Le **dégradé du héros** (`MeshGradient`, partagé) inséré dans la **même marge** que le bloc vert du bas (`mx 10/15px`, coins arrondis). Bouton « Faire le test » du bandeau vert : grossit aussi au survol.

**E. Navbar (`Navbar.tsx`).**
- Logo remplacé par **« LOGO »** (placeholder). Les **5 liens** répartis (`justify-between`) sur la **largeur du bandeau vert** (colonne `max-w-3xl`, du « T » de « Test de personnalité » au « s » de « Articles »), logo à gauche / compte à droite aux extrémités (actif en `xl`). « Se connecter » → **« Se connecter / Crée un compte »**, même typo/couleur que les autres liens.

**F. Page du test (`Quiz.tsx`, `TestPersonnalite.tsx`).**
- **Barre de progression** : élargie et alignée pile sur les liens de la navbar (du « T » au « s », `px-4 md:px-0`), **remontée** à `top:53px` (1px de chevauchement, plus d'espace où le contenu passait), **trait du bas retiré**.
- **Blocs étape + section des questions** alignés pareil (`px-4 md:px-0`, 342→1110).
- Dégradés retirés : le **remplissage vert au scroll** des cartes étape, et le **`MeshGradient`** de la section titre (le contenu passait au travers). Les **3 cartes étape** passées en **couleur pleine opaque** (équivalent de leur translucide sur blanc). **Pastilles « Étape 1/2/3 »** toutes au **vert standard** `rgba(51,164,116,0.85)`.
- Textes : Étape 1 « Sois toi-même et réponds en toute sincérité. » ; Étape 3 « Explore ton profil en profondeur et trouve les réponses qu'il te faut. ».
- **Carte Étape 1 cliquable** → défile (smooth) jusqu'à la première question.
- **Flèche « descendre »** (chevron cerclé vert, `animate-bounce`) en bas de la carte Étape 1 : **opacité pilotée par le scroll** (pleine en haut, s'efface en douceur quand on passe les blocs étape, reste invisible plus bas, revient en remontant ; monotone → pas de réapparition). Seuils réglables `FLECHE_DEBUT` / `FLECHE_FIN` (px de scroll). PIÈGE : un `<svg>` sans `width/height` fait **300×150** par défaut (utiliser `w-full h-full` pour qu'il épouse la carte).
- **`ScrollHaut`** ajouté au test : la page revient en haut au rechargement (comme la page résultat).

**Note CSS / OneDrive :** le file-watch OneDrive ne recompile pas toujours `globals.css` (faux négatif). Pour les petites animations, préférer une approche **autonome au composant** (SMIL `<animate>` dans le SVG, ou `animate-bounce` natif Tailwind) plutôt qu'un keyframe dans `globals.css`.

## 9. Prochaines étapes

**Chantier PARTAGE & page publique (en cours, cf. §8 octies) — prioritaire :**
- **Réécrire le contenu des panneaux du spectre** (`/p`) en mini-portraits vivants (cf. §8 octies, « À retravailler »). C'est la prochaine étape concrète demandée.
- **Générer l'image de partage par profil** (story 9:16) via Next `ImageResponse`, en barres (pas camembert), DA verte. C'est elle qui débloque Insta/TikTok/Snap.
- **Construire la fenêtre de partage** (boutons réseaux : liens d'intention WhatsApp/Messenger/X/Telegram/mail + bouton « Partager » natif `navigator.share` avec l'image sur mobile + « télécharger l'image » sur ordi).
- **Brancher le bouton « Partager » du résumé** (et de `FenetrePartage.tsx`, aujourd'hui inactif) pour qu'il produise le lien `/p/{slug}?s=…&v=…` et ouvre la fenêtre.
- **Vignette OG** (`og:image`) pour que le lien `/p` soit beau quand on le poste.
- **Harmoniser la voix** de `/p` (je vs il/elle).
- Plus tard : page publique liée au **compte** (profils stockés, stats, comparaison/« site de rencontre »), cf. `VISION_FUNNEL_ANGE_DEMON.md`.

**Reste (cf. sessions précédentes) :**
- **Mot de passe oublié (parcours complet), critères de mot de passe, mail de sécurité (Resend), connexion par code email : FAITS** (cf. §8 sexies).
- **Fenêtre de paiement + comptes Supabase + Stripe + gating serveur réel + webhook + connexion Google : FAITS** (cf. §8 quinquies/sexies/septies). Reste, surtout avant l'ouverture au public :
  - **Publier l'app Google en Production** (sinon seuls les utilisateurs de test peuvent se connecter via Google ; scopes de base = pas de vérification Google).
  - **Custom Domain Supabase** (payant, plan Pro + domaine) pour masquer l'URL `…supabase.co` affichée sur l'écran de consentement Google.
  - **Créer les pages `/cgu` et `/confidentialite`** (les liens du formulaire d'inscription pointent dessus, 404 sinon).
  - **Validation du format email** dans le formulaire d'inscription (proposée, pas encore faite). La vraie validation = réactiver la confirmation email Supabase.
  - **Mise en ligne** : réactiver la confirmation email Supabase, vérifier le compte Stripe (statut entreprise) pour passer en live.
- **Sortir le projet de OneDrive** (réglera les pop-up de suppression et les vues tronquées). À faire proprement avec Claude Code (déplacer le dossier, garder le dépôt Git, recâbler le dossier connecté).
- **Emails & auth (mise en ligne)** : remplacer le **SMTP Gmail de test** par un vrai SMTP + domaine (Resend), **supprimer la page temporaire `/apercu-mail`**, renforcer les **critères de mot de passe côté Supabase** (Min length 8 + requirements), aligner la page `/nouveau-mot-de-passe` sur les mêmes critères, et traiter le **reset cross-appareil**.
- **Contenu** : corriger ISTJ (ré-accentuer) et finir la passe anti-répétition intra-résumé (cf. §8 ter et `AUDIT_48_PROFILS.md`).
- En attente / plus tard : bouton « Partager » fonctionnel (aujourd'hui inactif), capture e-mail réellement branchée (le `Quiz` collecte l'e-mail mais ne l'envoie nulle part), retour du bloc « À quel point ce portrait te ressemble » réellement enregistré, validation automatique au build (présence des 48 clés), passe responsive mobile.
