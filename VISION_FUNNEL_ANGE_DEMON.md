# VISION PRODUIT & MONÉTISATION — Funnel « Ange & Démon »

> Document de réflexion stratégique pour ne pas repartir de zéro.
> Capturé lors d'une session de travail (juin 2026). C'est une **vision validée en réflexion**, pas encore implémentée.
> À lire avec `ETAT_DU_PROJET.md` (état technique du site) et `1_PRODUIT/.../SYSTEME_SCORING.md` (moteur de calcul).

## 1. L'idée en une phrase
Transformer le test de personnalité en un **écosystème à 3 paliers de paiement** articulé autour d'une histoire : ta lumière (test « sain »), ton ombre (test « dark »), et comment réconcilier les deux (parcours « Ange & Démon »).

## 2. Le positionnement (vs 16Personalities)
- 16P a basculé son business sur le **professionnel / entreprise** (pack carrière 29 $, mentors IA carrière, CV, évaluations d'équipe B2B). Terrain où on ne peut pas les battre frontalement (15 ans d'avance, SEO).
- Notre terrain = l'inverse, et notre contenu y est déjà : **l'intime, l'émotionnel, la connaissance de soi**. Pas « réussir ta carrière » mais « comprendre qui tu es vraiment ».
- 3 axes différenciants : self-discovery / bien-être, relations & compatibilité amoureuse, et surtout **curiosité / divertissement** (le test dark).
- Différenciateur transversal déjà en place : les **variantes (2-en-1, 48 profils)**, plus fin que les 16 types de 16P.

## 3. Le funnel à 3 paliers (l'escalier de valeur)
Logique de « cliffhanger » : chaque résultat ouvre une question que seul l'achat suivant referme. Les gens avancent d'eux-mêmes.

1. **Test de personnalité « sain » (classique)** — gratuit à passer, résumé gratuit, **rapport complet payant (~6 €)**. Le résultat est **stocké sur le compte** de l'utilisateur.
2. **Test « Dark personnalité »** (encart proposé à côté) — même modèle : teaser gratuit + **rapport complet payant**. S'ajoute au même compte.
3. **Parcours « Ange & Démon »** — nécessite les **deux résultats** : comparaison clair/sombre + **guide / formation (~15 €)** pour « chasser ses démons en s'appuyant sur ce qu'il y a de bon en soi ».

Prix indicatifs en réflexion : 6 € + 6 € + 15 €. Prévoir un **pack groupé** (« tout débloquer », ex. ~19-20 € au lieu de ~27 €) pour réduire la fatigue de paiement, tout en gardant les 3 paiements séparés pour ceux qui avancent pas à pas.

## 4. Conséquence technique majeure : le COMPTE devient le cœur du système
Aujourd'hui la page connexion est un placeholder. Avec ce modèle, **tout repose sur le compte (Supabase)** :
- stocker le résultat du test sain ;
- y ajouter le résultat du test dark ;
- le parcours Ange & Démon a **besoin des deux** pour exister + débloquer les accès payés.
→ Le compte passe de « plus tard » à **infrastructure obligatoire**. C'est le vrai morceau technique à prévoir pour cette vision.
Bonus que le compte permet : e-mails de réengagement, suivi de progression dans la formation, cross-sell.

## 5. Le parcours « Ange & Démon » (le joyau)
- C'est le produit le plus différenciant et le plus cher : à soigner en priorité, c'est ce qu'on ne peut pas copier ailleurs.
- Concept : on part du **démon précis** (résultat dark) et des **anges précis** (forces du profil sain) ; pour chaque démon, un **levier tiré des propres forces** de la personne. Modules courts + exercices concrets, parcours guidé.
- Accroche narrative : « voici ta lumière, voici ton ombre, voilà comment l'une apprivoise l'autre ».

### Conception SCALABLE (clé)
- Ne **pas** réécrire une formation par personne. Construire une **bibliothèque modulaire** de « démons » et de « leviers », assemblée automatiquement selon le résultat — **même logique que `profils.ts`** (briques + assemblage).
- Garder un nombre raisonnable d'archétypes de démons (~8-12) plutôt qu'un sur-mesure total par combinaison, sinon la charge de contenu explose.

## 6. Acquisition
- 16P mise sur le SEO (pages de type) + partage du résultat.
- Notre avantage propre : les **comptes TikTok / Instagram** déjà en place (Quote Content Engine). Vidéos « type de personnalité / côté sombre » → trafic gratuit vers le test. Le test dark est un aimant à curiosité, très partageable.

## 7. Garde-fous légaux (rappel)
- Toujours **développement perso ludique**, jamais « soigner / diagnostiquer ». « Apprivoiser ton ombre », pas « guérir ».
- RGPD + AI Act, jamais « diagnostic », pas de « MBTI » en marque, pas « scientifiquement validé ».

## 8. Statut & prochaines étapes liées à cette vision
- [ ] Construire les **comptes utilisateurs** (Supabase) — prérequis de tout le funnel.
- [ ] Définir le **système de floutage / paywall** (le « gratuit vs payant ») — chantier déjà identifié comme « gros morceau, plus tard ».
- [ ] Finir le **test Dark personnalité** (aujourd'hui placeholder).
- [ ] Concevoir la **bibliothèque modulaire Ange & Démon** (archétypes de démons + leviers).
- [ ] Trancher la **grille tarifaire** + l'option pack groupé.
