# VISION — Partie RELATIONS du profil (comparaison + parcours solo & duo)

> Document de cadrage validé avec Luca (session du 3 juillet 2026).
> À lire avec `VISION_FUNNEL_ANGE_DEMON.md` (même logique de briques) et
> `ANALYSE_PARCOURS_16P.md` (ce que fait 16P : Partenaire / Amis).
> Statut : vision validée, PAS encore implémentée.

## 1. L'idée en une phrase

La partie Relations du profil offre deux choses : **Comparer** (ton profil
face à ceux de tes proches) et **Comprendre** (des parcours de formation
relationnels personnalisés), avec un **parcours solo** et un **parcours à
deux** — c'est le parcours à deux, construit sur LES DEUX profils, que
personne d'autre ne propose (16P s'arrête à la comparaison).

## 2. Ce qui touche les gens (les cibles éditoriales, par ordre de puissance)

1. **Les schémas qui se répètent** — « pourquoi je retombe toujours sur le
   même genre de personne / mes relations finissent toujours pareil ? ».
   Thème scientifique derrière : les styles d'attachement (anxieux, évitant,
   sécure), massivement viral (TikTok). Se marie naturellement avec nos
   profils.
2. **La dépendance et les limites** — peur de l'abandon, besoin de plaire,
   ne pas savoir dire non, s'oublier. Rejoint les points faibles déjà rédigés
   dans nos 48 profils (« Difficulté à poser des limites »…).
3. **Les disputes qui tournent en boucle** — communication de couple,
   concret, cible « couple installé ».

Ordre de production du contenu : schémas/attachement d'abord, limites
ensuite, communication après.

## 3. L'architecture de données (le système de justesse), en 4 couches

**Couche 1 — Ce qu'on sait de chacun (EXISTE).**
- Table `resultats` : scores CONTINUS par axe (pas juste un type) + variantes
  + historique par utilisateur.
- Les 48 profils rédigés contiennent déjà forces/faiblesses relationnelles
  (section « Mes relations » de chaque profil).

**Couche 2 — La bibliothèque modulaire (LE gros chantier, du contenu).**
- On ne rédige PAS un parcours par personne : on rédige des **briques**
  (modules courts : « la peur de l'abandon », « poser une limite sans
  culpabiliser », « le schéma du sauveur »…).
- Des **règles d'assemblage** : telle faiblesse du profil + tel score d'axe
  → tels modules, dans tel ordre. Même patron que `profils.ts` et que la
  conception scalable d'Ange & Démon (briques + assemblage).
- Lancement possible avec ~10 modules bien choisis, enrichissement continu.

**Couche 3 — Le duo (le point technique malin).**
- PIÈGE à éviter : du contenu par paire de profils = 48 × 48 > 2 300 combos,
  impossible à rédiger.
- SOLUTION : des briques par **écart d'axe** (« toi Introverti, l'autre
  Extraverti → module besoins d'énergie opposés »). Une poignée de cas par
  axe (~30 briques au total) couvre TOUTES les paires avec justesse.
- Côté données : une table **`liens`** (user_id_1, user_id_2, type
  partenaire/ami, statut de l'invitation) partagée par la comparaison ET le
  parcours à deux. Mécanique d'invitation à concevoir (cf. 16P « Ajouter un
  partenaire » / « Inviter un ami »).

**Couche 4 — La boucle de justesse (à collecter dès que possible).**
- Table **`parcours_progression`** : user_id, module, état, réponses aux
  exercices, auto-évaluations. Alimente la personnalisation, l'ÉVOLUTION
  (décision Luca : l'évolution qui compte = la progression sur ses points
  faibles, c'est le rôle de la partie Développement) et les cercles de
  progression du profil.
- Brancher le bloc « À quel point ce portrait te ressemble ? »
  (`PrecisionRating`, aujourd'hui visuel) pour enregistrer les votes et
  calibrer les contenus.

## 4. Décisions actées

- Parcours SOLO et parcours À DEUX, pas une simple comparaison de profils.
- La comparaison = porte d'entrée (aimant), les parcours = le produit.
- Le contenu des briques est le vrai chantier ; la technique suit
  l'architecture existante (briques + assemblage + tables Supabase).
- Structure de la partie Relations du profil : **Comparer** (partenaire,
  amis) + **Comprendre** (les parcours).

## 5. À trancher plus tard

- La frontière gratuit / payant (comparaison de base gratuite ? profondeur
  payante ? prix des parcours ?) — à articuler avec le funnel global
  (rapport 7,90 €, vision Ange & Démon).
- La mécanique d'invitation (lien, email, QR ?) et ce que voit l'invité.
- La place de l'attachement : intégré aux parcours ou mini-test dédié
  (« ton style d'attachement ») qui enrichirait le profil ?
- L'articulation avec la partie Développement (le parcours perso global) :
  Relations = parcours relationnels, Développement = parcours sur soi.
