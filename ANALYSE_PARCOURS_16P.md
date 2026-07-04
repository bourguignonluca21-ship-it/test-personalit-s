# Analyse du parcours utilisateur 16Personalities

> Méthode (validée avec Luca, session du 2 juillet 2026) : on suit le parcours
> réel d'un nouvel utilisateur chez 16P, écran par écran. Pour chaque écran :
> inventaire des éléments, obligations légales repérées, rôle dans le funnel,
> et VERDICT (reprendre / adapter / améliorer) pour notre site.
> Objectif : ne pas copier bêtement, prendre ce qui est efficace et faire
> mieux quand c'est possible.

---

## Écran 0 — Popup de connexion (navbar « Se connecter »)

**Chez 16P :** petite fenêtre centrée : titre « Demander un lien de connexion »,
sous-ligne, champ email (libellé au-dessus + icône enveloppe), gros bouton
pleine largeur « Envoyer le lien ». Une seule action possible, aucune
distraction. Ils envoient un LIEN par email.

**Verdict (déjà appliqué chez nous, `FenetreConnexion.tsx`) :**
- Repris : la sobriété (un seul chemin), l'icône enveloppe, l'aération.
- Amélioré : nous on envoie un CODE à 6 chiffres, pas un lien → l'utilisateur
  reste où il est, pas de changement d'onglet, marche même si le mail est lu
  sur le téléphone. + remplissage progressif du bouton en vert (feedback),
  + ligne de réassurance cadenas en bas.

---

## Écran 1 — « Configurer votre profil » (première connexion)

URL type : `/bienvenue?profile-details=1&redirect=%2Ffr%2Fprofil`
(le paramètre `redirect` dit où aller après → chez eux : `/profil`).

**Inventaire (dans l'ordre visuel) :**
1. **En-tête réduit au logo seul** : pas de navbar, pas de liens. L'utilisateur
   ne peut pas s'échapper de l'étape (sauf clic logo). Mode « tunnel ».
2. Titre H1 « Configurer votre profil », aligné à gauche.
3. Sous-ligne : « Saisissez vos informations ci-dessous pour finaliser la
   configuration de votre profil. »
4. Champ **« Nom »** (libellé au-dessus), vide, avec un placeholder gris
   « Votre nom ». (Correction Luca : PAS pré-rempli, contrairement à la
   première observation.)
5. **Case à cocher DÉCOCHÉE par défaut** : « J'ai au moins 16 ans et j'accepte
   les Conditions d'utilisation et la Politique de confidentialité. »
   (liens vers les deux documents).
6. Bouton **« Continuer → » grisé tant que la case n'est pas cochée**.
7. Pied de page minimal : « ©2011-2026 NERIS Analytics Limited ».

**Obligations légales repérées :**
- **Consentement explicite RGPD** : case NON pré-cochée (interdit de
  pré-cocher), liens vers CGU + politique de confidentialité au moment de la
  collecte. → Obligatoire pour nous aussi.
- **Âge minimal** : 16P affiche « au moins 16 ans » (âge de consentement
  numérique RGPD, max autorisé). En France la loi fixe **15 ans** ; 16 ans
  est le choix « monde entier » le plus sûr. → À trancher côté 7_LEGAL ;
  16 ans par défaut = choix le plus simple et le plus sûr.
- (Un seul champ « nom » : minimisation des données, RGPD-friendly. Pas de
  date de naissance, pas de téléphone.)
- **Pas de case newsletter ici** : ils la demandent ailleurs. Nous, la
  newsletter est déjà proposée en fin de test (route `/api/rapport`).

**Rôle dans le funnel :** verrouiller le consentement légal + donner un nom au
compte, au moment où l'utilisateur est le plus engagé (il vient de valider son
email). Friction minimale : 1 champ + 1 case + 1 bouton.

**Verdict pour nous :**
- **Reprendre** : la page dédiée épurée, le champ unique avec placeholder,
  la case consentement décochée avec les 2 liens, le bouton bloqué tant que
  la case n'est pas cochée, la redirection vers le profil après.
- **En suspens** : le mode tunnel (masquer la navbar comme 16P) — Luca
  tranchera quand on aura vu tout leur parcours.
- **Adapter** : voix « tu » (« Configure ton profil »), DA verte, notre champ
  = « Ton prénom ou pseudonyme » (métadonnée `prenom`, déjà utilisée par le
  code existant).
- **Améliorer** : bouton qui se remplit de vert progressivement (notre
  signature, cf. FenetreConnexion) au lieu d'un simple grisé ; enregistrer la
  date d'acceptation des CGU dans les métadonnées du compte (précieux en cas
  de litige, 16P le fait forcément côté serveur).
- **Dépendance** : les pages `/cgu` et `/confidentialite` n'existent pas
  encore (404) — déjà dans la liste des choses à faire avant mise en ligne.

---

## Écran 2 — « Votre profil » (`/fr/profil`, l'accueil du compte)

**Structure générale : la page profil EST la page résultat du connecté.**
Pas deux pages séparées : le compte range le résultat, et le paywall vit ici.

**Inventaire :**
1. Navbar complète de retour (fin du tunnel) + avatar personnage en haut à
   droite + cloche de notifications.
2. **Sous-navigation en onglets** : Aperçu / Partenaire / Amis / Elina (leur
   IA) / Achats / Paramètres. → « Partenaire » et « Amis » = LEURS fonctions
   de croisement entre profils (l'équivalent de notre vision « corrélations »).
3. Menu déroulant sous « Votre profil » : Repasser le test, Historique des
   résultats, Votre avatar, Paramètres, Se déconnecter.
4. H1 « Votre profil » + sous-ligne. Boutons partage / favori / « … ».
5. **Carte type** : « Type de personnalité — Médiateur (INFP-A) » +
   illustration du personnage + phrase résumé.
6. **Traits** : 5 barres (Énergie, Esprit, Caractère, Tactiques, Identité)
   avec % + libellé + petit « ? » explicatif par axe. Toggle barres/camembert.
7. **« Test passé : 19 juin 2026 » + « Afficher les précédents résultats »**
   → historique des passages, rattaché au compte.
8. Sommaire : 1. Traits / 2. Parcours professionnel / 3. Développement
   personnel / 4. Relations + CTA « Accéder au rapport complet ».
9. Sections 2/3/4, TOUTES sur le même patron :
   - texte d'introduction GRATUIT (2 paragraphes) ;
   - « Traits influents » VERROUILLÉS (4 jauges nommées, ex. Perfectionnisme,
     Résilience, Authenticité…) avec CTA « Accéder maintenant » ;
   - 6 points forts + 6 points faibles GRATUITS (titre + 1 phrase) ;
   - 2 blocs bonus VERROUILLÉS par section (ex. « Idées de carrière » (10),
     « Styles de travail » (6), « Ce qui vous dynamise/épuise » (6+6),
     « Super-pouvoirs relationnels » / « Risques dans les relations » (6+6)).
10. **Le texte verrouillé est BROUILLÉ dans le HTML** (lettres mélangées) —
    exactement notre technique `scrambleStr`. Validation de notre choix.
11. CTA final : « Découvrez ce qui vous motive vraiment », argumentaire
    (chapitres + 12 scores de traits + guide téléchargeable + mentor IA),
    **prix 9 €**, et **« Garantie de remboursement de 30 jours »**.

**Structure visuelle (relevée en parcourant la page) :**
- **Barre collante en haut au scroll** (remplace la navbar) : à gauche un
  menu déroulant de section (« 1. Traits de personnalité ⌄ » → sommaire),
  à droite partage + favori + **CTA vert permanent « 🔒 Accéder au rapport
  complet »**. Le paywall est TOUJOURS à un clic, où qu'on soit dans la page.
  (Équivalent de notre `ResultatNav`, mais avec le CTA d'achat intégré.)
- **Une grande illustration par section** (le personnage du type mis en
  scène : nature, bureau…). Ça aère et donne une identité visuelle forte.
  (Nous : pas de personnages — hors DA — mais retenir le principe de
  respiration visuelle entre sections.)
- Titres de section : pastille numérotée cerclée + titre (« ② Votre parcours
  professionnel ») — même logique que nos « N. » verts.
- **« Traits influents » verrouillés** : 4 grands cercles à anneau coloré
  avec un CADENAS gris dedans + libellé + « ? ». Le verrou est montré comme
  une jauge qu'on devine, pas comme un trou.
- **Points forts/faibles : 2 colonnes**, icône ronde (+ vert / ! orange) +
  titre gras + 1 phrase. Gratuits. (Identique à notre choix 2 colonnes.)
- **Blocs verrouillés de liste** (idées de carrière…) : items brouillés ET
  floutés en 2 colonnes, avec un **encadré CTA posé par-dessus** : cadenas
  vert en pastille sur le bord haut du cadre, titre « Accéder maintenant »,
  1 phrase, bouton vert. (Notre `BlocVerrouille` + CTA, quasi pareil.)
- Bloc final d'achat : titre accrocheur, argumentaire, **9 €**, garantie
  30 jours.

**Enseignements clés pour nous :**
- Le compte est le POINT D'ANCRAGE : résultat, historique, achats, croisements
  (Partenaire/Amis) et IA vivent au même endroit. C'est exactement la vision
  de Luca (le profil comme cœur, le test comme porte d'entrée).
- Le teasing par « nombre » (« débloquez 10 parcours », « 6 styles ») donne
  une valeur concrète au verrouillé sans rien révéler.
- Garantie 30 jours = gros levier de confiance au moment de payer (à étudier).
- Prix unique 9 € pour le rapport complet (leur pack carrière 29 $ est un
  produit séparé).
- Leur brouillage du texte verrouillé = le même que le nôtre (on est bons).

**Verdict pour nous (premières pistes, à affiner après le parcours complet) :**
- Notre future page `/profil` devrait ancrer : dernier résultat + accès au
  rapport + historique + (plus tard) croisements et parcours. On a déjà la
  page résultat riche ; la page profil peut la référencer plutôt que la
  dupliquer (à trancher).
- Reprendre l'idée du teasing chiffré sur nos blocs verrouillés.
- Étudier la garantie de remboursement (question produit/légal).

---

## Écran 3 — Les onglets du compte

Chaque onglet a une promesse d'une ligne (affichée dans le menu) — bonne
pratique : l'onglet se vend avant d'être ouvert.

**Partenaire (`/partner`) — « Analyse relationnelle ».**
État vide très soigné : icône, « Pas encore de partenaire », 1 phrase
(« Ajoutez votre partenaire pour comparer vos schémas de personnalité et
découvrir des analyses relationnelles ») + CTA « + Ajouter un partenaire ».
→ Le croisement de profils EN COUPLE est un produit à part entière chez eux.

**Amis (`/amis`).**
Liste d'amis avec « Inviter un ami », tri (nom/date), pagination. État vide :
« Vous n'avez pas encore d'amis ici. Invitez-en et comparez vos résultats ! »
→ Boucle virale intégrée AU compte : chaque utilisateur devient recruteur.
C'est l'embryon du « comparer nos profils » de notre vision.

**Elina (`/elina`) — leur mentor IA.**
Page teaser : « votre mentor IA attentive et perspicace », VERROUILLÉE :
« Débloquez votre Rapport Premium ou votre Pack carrière pour accéder à
Elina. » → L'IA conversationnelle est un BONUS d'achat, pas un produit à
acheter seul. Cohérent avec notre doc fondateur (conversation IA bornée,
incluse dans le payant).

**Achats (`/achats`).**
4 blocs : Commandes / Rapports Pro / Abonnements / Factures, chacun avec état
vide + lien vers l'offre correspondante (même vide, la page vend). + une
demande de témoignage CONTRE UN CADEAU (« Laissez un témoignage et choisissez
un cadeau en guise de remerciement »).

**Paramètres (`/parametres`).** 3 groupes :
- *Général* : mode sombre (Light/Auto/Dark), styles d'accessibilité,
  **« Renvoyer vos résultats de test » par email** → règle le problème de
  l'accès perdu (exactement notre point ouvert « client qui paie puis perd
  ses cookies », cf. ETAT_DU_PROJET §8 decies C).
- *Profil* : avatar personnalisable (**options spéciales débloquées par le
  Premium** = personnalisation comme récompense d'achat), genre (pour
  l'avatar), **« Confidentialité du profil » : profil consultable par LIEN
  CHIFFRÉ avec choix des sections visibles** → leur version de notre page
  publique `/p`, mais pilotée depuis le compte.
- *Compte* : date d'inscription, nom, email (modifiables), **« Supprimer
  votre profil »** (obligation RGPD, à prévoir chez nous).

**Verdict pour nous :**
- Le compte-hub se confirme : Aperçu (résultat) + croisements (Partenaire/
  Amis) + IA + Achats + Paramètres. C'est le squelette cible de notre
  `/profil` à long terme — on commencera petit (Aperçu + Paramètres minimaux).
- À reprendre tôt : « Renvoyer mes résultats par email » (notre point ouvert),
  la suppression de compte (RGPD), et les états vides qui vendent (chaque
  fonctionnalité vide explique sa promesse + CTA).
- À garder pour plus tard : avatar premium, tri d'amis, mode sombre.

---

## Écran 6 — « Ajouter un partenaire » (parcours complet, décortiqué avec Luca le 4 juillet 2026)

**Le parcours, écran par écran :**

1. **État vide** (`/fr/partner`, « Analyse relationnelle ») : icône, « Pas encore
   de partenaire », 1 phrase de promesse, UN seul bouton « + Ajouter un
   partenaire ». Rien d'autre. (L'état vide qui vend, confirmé.)
2. **Choix à 2 branches** : « Souhaitez-vous inviter votre partenaire ou saisir
   ses informations manuellement ? »
   - « L'inviter » — « Le plus précis. Idéal pour les relations à long terme. »
   - « Saisir ses informations » — « Moins précis, mais idéal pour une
     exploration privée et informelle. »
   → LE point clé : la comparaison marche SANS que l'autre passe le test.
   Friction zéro pour goûter au produit ; l'invitation devient un
   approfondissement, pas un préalable.
3. **Branche « L'inviter »** : un lien d'invitation généré, à copier/partager
   soi-même (pas de champ email). Format `/partner/invite/{id}?signature={hmac}`
   → **lien SIGNÉ**, infalsifiable (même principe que notre cookie d'accès).
   L'invité anonyme qui l'ouvre est redirigé vers `/fr/bienvenue` : leur
   **tunnel d'onboarding** (logo seul, pas de navbar) où il crée son compte /
   passe le test, l'invitation rattachée.
4. **Branche « Saisir »** : « Connaissez-vous déjà le type de votre
   partenaire ? »
   - **Oui** → menu déroulant des 16 types (groupés par familles) → Continuer.
   - **Non** → « Pas d'inquiétude ! Essayons de le deviner. » **Mini-quiz
     ~12 questions** : 2 descriptions au choix par question (~3 par axe),
     écrites en scènes de vie (« Après une journée éprouvante, cette personne
     a envie de voir du monde / de solitude »), barre de progression.
     → RÉVÉLATION en carte : « Votre partenaire est probablement :
     Protagoniste (ENFJ) » + personnage + 1 phrase, puis Continuer /
     Réinitialiser. (Le moment de révélation donne envie de vérifier = viral.)
5. **Question genre** (Homme / Femme / Autre) avant la génération (accords +
   avatar).
6. **L'analyse relationnelle** (générée instantanément) :
   - Bloc d'ouverture « **Ce que ce rapport ne peut pas voir** » : honnêteté
     assumée (« nous ne connaissons que l'association de vos types, pas votre
     histoire », « lisez avec un scepticisme sain »). Protection légale +
     fabrique de la confiance.
   - **Scène de vie d'accroche** (« Votre partenaire entre dans une pièce et
     la réorganise. Vous entrez et remarquez ce qui manque. ») : écriture
     incarnée, PAS encyclopédique. C'est le niveau à viser pour nos briques.
   - **6 forces du duo GRATUITES** (titre imagé + 2-3 phrases chacune) puis
     **6 frictions GRATUITES** (très concrètes : « Le "oui" que vous ne
     vouliez pas vraiment dire »).
   - **3 sections VERROUILLÉES** (« Bien interpréter l'autre » ×8, « Conseils
     pour chaque partenaire » ×6, « Grandir ensemble » ×6) : placeholders +
     CTA « Accéder maintenant ».
   - **CTA final 9 €** : le MÊME Premium que le rapport perso (un seul achat
     débloque tout, garantie 30 jours). Le rapport partenaire est un argument
     de plus du même achat, pas un produit séparé.
   - **Formulaire de feedback** complet en bas (exactitude, meilleurs
     aspects, aspects difficiles, conseil, durée de la relation) → ils
     calibrent le contenu avec de vraies données. (Jugé « très cool surtout
     pour le lancement » par Luca → à reprendre tôt.)
7. **« Réinitialiser »** (haut de page) : changer de partenaire, avec fenêtre
   de confirmation (bouton rouge) car destructif.

**Enseignements clés pour nous :**
- Le gratuit est GÉNÉREUX (12 blocs rédigés) : c'est lui qui rend le payant
  crédible. Le teasing chiffré fait le reste.
- La saisie manuelle (type connu OU mini-quiz de devinette) est la vraie
  porte d'entrée : instantanée, solo, partageable. À reprendre absolument.
- Le mini-quiz « devine son type » est un mini-produit viral en soi.
- Lien d'invitation signé + tunnel d'onboarding pour l'invité : simple et sûr.
- LEUR LIMITE (notre opportunité) : tout s'arrête à l'ANALYSE. Aucun
  parcours, aucun accompagnement dans la durée, aucun exercice. Notre
  parcours à deux commence exactement là où eux s'arrêtent.

**Verdict pour nous (premières pistes, à trancher avec Luca) :**
- Reprendre : état vide qui vend, 2 branches (inviter / saisir), mini-quiz de
  devinette avec révélation, disclaimer d'honnêteté, gratuit généreux +
  sections verrouillées, feedback de calibration dès le lancement.
- Améliorer : notre analyse débouche sur un PARCOURS à deux (modules, briques
  par écart d'axe, cf. VISION_RELATIONS_PARCOURS.md) au lieu de s'arrêter au
  constat ; nos scores d'axes CONTINUS (pas juste 16 types) rendent le duo
  plus fin que leur combinaison type×type.
- À trancher : notre équivalent du « saisir son type » (menu 48 profils ?
  mini-quiz ?), la place du paiement (le duo dans le rapport 7,90 € ou à
  part ?), et la mécanique exacte de l'invitation (lien signé, QR, les deux ?).

## Écrans suivants (à remplir au fil de l'analyse)

- Écran 4 : emails reçus (bienvenue ?) (à analyser).
- Écran 5 : tunnel de paiement depuis « Accéder au rapport complet » (à analyser).
- Écran 6 bis : la page `/fr/bienvenue` vue par l'INVITÉ du lien partenaire
  (contenu rendu côté client, à voir en navigation privée) et « Inviter un
  ami » (onglet Amis) (à analyser).
