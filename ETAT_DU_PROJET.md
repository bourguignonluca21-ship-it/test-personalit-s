# État du projet — Test de personnalité (passation)

> Document de passation pour reprendre le projet dans une nouvelle session sans perdre le contexte.
> Le code est la source de vérité ; ce fichier capture les **décisions**, **conventions** et **pièges**.

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
- Le **floutage/brouillage est monté en prototype** (cf. §8 quater : `BlocVerrouille`, contenu verrouillé brouillé côté serveur, flag `isPaid` via `?paid=1`). Le **paiement réel** (Stripe) et les **comptes** (Supabase) ne sont PAS encore montés (cf. `VISION_FUNNEL_ANGE_DEMON.md`). Carte de fin premium affichée, prix 7,90 €.
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

## 9. Prochaines étapes
- **Concevoir la page de paiement** (structure + design), puis Phase 2/3 : **comptes Supabase**, **Stripe** (checkout + webhook + table `achats`), **gating serveur réel**.
- **Contenu** : corriger ISTJ (ré-accentuer) et finir la passe anti-répétition intra-résumé (cf. §8 ter et `AUDIT_48_PROFILS.md`).
- En attente / plus tard : bouton « Partager » fonctionnel (aujourd'hui inactif), capture e-mail réellement branchée (le `Quiz` collecte l'e-mail mais ne l'envoie nulle part), retour du bloc « À quel point ce portrait te ressemble » réellement enregistré, validation automatique au build (présence des 48 clés), passe responsive mobile.
