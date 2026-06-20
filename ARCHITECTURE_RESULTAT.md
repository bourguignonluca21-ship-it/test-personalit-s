# Architecture — Page résultat (V1)

But : à la fin du test, afficher le bon profil (parmi 48) dans un **template** unique,
de façon **déterministe et sans erreur**. Document de cadrage pour éviter les erreurs.

> Important marque/légal : la **structure** (sections, sommaire) peut s'inspirer de
> l'agencement de 16Personalities, mais **tous les textes sont les nôtres**. On ne
> recopie aucun contenu protégé. Pas de « diagnostic », ton ludique.

---

## 1. Modèle de données

48 profils = 16 types × 3 variantes. Clé = `CODE-Vx` (ex. `INFP-V1`).

Schéma d'un profil (`src/app/data/profils.ts` → interface `Profil`) :

- `code`, `variante`, `nomType`, `nomVariante`, `accroche`
- `sections` : `introduction`, `forces`, `relations`, `amities`, `carriere`,
  `habitudes`, `conclusion` — chacune `{ apercu, premium? }`
  (aperçu gratuit + suite réservée au rapport complet).

Le **spectre** (les 4 axes en %) n'est **pas stocké** : il est **calculé** à partir
des réponses (moteur). Il dépend de l'utilisateur, pas du profil.

## 2. Accès au contenu — une seule porte

Toutes les lectures passent par **`getProfil(code, variante)`** (`data/profils.ts`).

- V1 : contenu **statique** dans le repo (placeholder aujourd'hui, vrais textes ensuite).
- Bascule Supabase plus tard = on ne change **que cette fonction**. Le template, le
  flux et l'email ne savent pas d'où vient la donnée → **aucune réécriture**.

## 3. Flux test → résultat (verrouillé)

1. Fin du test → `calculerType` (4 lettres) + `calculerVariante` (V1/V2/V3).
2. `encoderScores` → les 4 scores bruts sérialisés (`?s=51-62-40-58`).
3. Navigation vers `/resultat/{code}-{variante}?s=...` (`router.push`).
4. La page `resultat/[slug]/page.tsx` : `getProfil()` + `spectreFromScores(s)` → rend le template.

Garde-fous :
- `getProfil` **ne lève jamais d'erreur** (renvoie toujours une fiche ; placeholder/fallback).
- Spectre absent/illisible → la page s'affiche **sans** les barres (jamais cassée).
- À terme : **validation au build** (les 48 clés présentes, sections non vides) avant déploiement.

## 4. Partage / URL (plus tard)

La page est déjà partageable par construction (`/resultat/infp-v1?s=...`).
Le **bouton** « Partager » et son habillage seront ajoutés plus tard — ça ne change
ni le template ni le flux.

## 5. Partie dynamique (Supabase + n8n) — à brancher plus tard

Séparée du contenu statique :
- Capture e-mail en fin de test → table Supabase `resultats` `{ email, code, variante, date, consentement }`.
- Job programmé (n8n) → envoie la description du profil (générée depuis la **même** base de contenu).
- Comptes / paiements : Supabase également.

On branche cette couche **sans toucher** au template ni aux 48 profils.

## 6. Pipeline de remplissage des 48

Format source (md ou json) → script de validation au build (48 clés, sections remplies)
→ base utilisée par `getProfil`. Un profil manquant/incomplet **bloque le build**.

## 7. Fichiers concernés

- `src/app/data/moteur.ts` — `calculerType`, `calculerVariante`, `calculerSpectre`,
  `spectreFromScores`, `encoderScores`, `NOMS_VARIANTES`.
- `src/app/data/profils.ts` — `Profil`, `PROFIL_SECTIONS`, `getProfil()`.
- `src/app/resultat/[slug]/page.tsx` — le template.
- `src/app/components/TestPersonnalite.tsx` — `onSubmit` → navigation.

## 8. État actuel (V1)

- Template construit, branché, vérifié (rendu OK).
- Contenu = **placeholder** (textes de démonstration à remplacer).
- Reste à faire : rédiger les 48 fiches, ajouter la validation de build, le bouton
  Partager, puis la couche e-mail (Supabase + n8n).
