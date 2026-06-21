# GABARIT — Remplir un profil (CODE-Vx)

> Le **squelette est figé** dans le template (`resultat/[slug]/page.tsx`) : tous les **titres de sections, de blocs, les âges (Enfance→Ancien) et les titres de compatibilité** sont définis une seule fois là-bas. On les change une fois, ils changent sur les 48 profils.
> Ici on ne remplit donc **que le contenu variable** d'un profil, dans `src/app/data/profils.ts`.
> Source du contenu : le rapport long du profil (`1_PRODUIT/test personnalités/personnalites/<TYPE>/rapport_long/rapport_long_<TYPE>_<Vx>.md`).
> Convention de style : voix « tu », pas de tirets longs (—), mot-clé en vert via le champ `accent`.

## Clés à remplir pour un profil (ex. `ENTJ-V1`)

Chaque entrée se range dans le `Record` correspondant de `profils.ts`, clé `CODE-Vx` (ou `CODE` quand c'est commun aux 3 variantes).

1. **ACCROCHES[`CODE-Vx`]** — 1 phrase d'accroche (héros). ← « L'accroche » / « Ta variante ».
2. **INTROS[`CODE-Vx`]** — ~2 paragraphes sous le héros. ← « Ton portrait ».
3. **TRAITS_TEXTE[`CODE`]** *(commun aux 3 variantes du type)* — texte sous les barres du spectre. ← « Ton spectre » / portrait.
4. **DESCRIPTIONS_VARIANTES[`CODE-V1`/`V2`/`V3`]** — 1 phrase par variante (affichée au survol des barres). ← étude section I / comptes rendus.
5. **TEXTE_VARIANTE[`CODE-Vx`]** — ~2 paragraphes sous les barres de variante. ← « Ta variante ».
6. **VARIANTE_DETAIL[`CODE-Vx`]** :
   - `forces` : 6 × `{ titre, accent, texte }`
   - `ombres` : 6 × `{ titre, accent, texte }`
   - `paradoxe` : `{ tension, lumiere, ombre, bascule }`
   ← « Tes forces » / « Tes ombres » / « Ton paradoxe central ».
7. **RELATIONS_TEXTE[`CODE-Vx`]** — ~2 paragraphes. ← « En amour » / « En amitié ».
8. **SECTION_DETAIL[`CODE-Vx-relations`]** :
   - `forces` (6), `ombres` (6) : `{ titre, accent, texte }`
   - `blocs` : 2 × `{ ton: "negatif"|"positif", items: string[] }` *(PAS de titre, injecté par le template)*
   - `compatibilites` : 2 × `{ ton, items: string[], profils: [{ code? , nom?, raison }] }` *(PAS de titre ni panelTitre)*
   - `paradoxe`
   ← relations + compatibilité.
9. **PRO_TEXTE[`CODE-Vx`]** — ~2 paragraphes. ← « Ta carrière » / « Ta façon de travailler ».
10. **SECTION_DETAIL[`CODE-Vx-carriere`]** : même structure que relations (forces, ombres, blocs, compatibilites, paradoxe). ← carrière.
11. **MINDSET_TEXTE[`CODE-Vx`]** — `{ apercu }` : 1 paragraphe d'accroche. ← intro de « Ton chemin de croissance ».
12. **SECTION_DETAIL[`CODE-Vx-developpement`]** :
    - `evolution` : 1 texte (« Comment tu évolues »)
    - `etapes` : **4 textes** (string[]) — l'ordre = Enfance, Jeunesse, Adulte, Ancien (labels injectés par le template)
    - `leviersForts` : 4 × `{ titre, texte }` (formulés 100 % positif, jamais une faiblesse)
    - `questions` : 5 × `{ situation, question }` (questions introspectives)
    - `paradoxe`
    ← « Ton chemin de croissance » / leviers.

## Rappels « ne PAS toucher » (c'est dans le template, figé)
- Titres de sections numérotées (1→5), « Tes points forts/faibles », « Tes leviers forts », « Les questions à te poser », « Comment tu évolues », « Ton paradoxe ».
- Labels d'âge : Enfance / Jeunesse / Adulte / Ancien.
- Titres des paires : « Ce qui est toxique pour toi / Ce qui te réussit » (relations), « Ce qui t'éteint / Ce qui te booste » (carrière).
- Titres de compatibilité : « Les – / Les + » (relations), « Les environnements à éviter / Les métiers faits pour toi » (carrière), et leurs panneaux au survol.

## Process
Profil par profil : on lit le rapport long du profil, on remplit les 12 points ci-dessus, on valide visuellement sur le serveur de dev, puis on passe au suivant. Le profil de référence déjà rempli = **INFP-V1 (le Poète)**.
