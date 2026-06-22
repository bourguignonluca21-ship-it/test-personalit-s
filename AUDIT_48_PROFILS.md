# AUDIT DES 48 PROFILS — juin 2026

Audit programmatique de tout le contenu affiché (16 types × 3 variantes).

## Règle de cadrage (IMPORTANT)

On ne traite QUE la **répétition à l'intérieur d'un même résumé** (une page = un type × variante, ce qu'un seul lecteur voit). Les répétitions ENTRE profils sont **acceptées** : chaque profil doit rester propre à lui-même.

Cibles de l'audit :
1. **Tics internes** à un même résumé : une tournure-signature qui revient trop souvent dans les sections d'une même page. C'est LA priorité.
2. **Tournures fautives** + conventions : voix « tu », pas de tirets longs (—), ton positif, fidélité aux rapports longs.
3. (Ignoré désormais) Les phrases-gabarit communes à plusieurs types : invisibles pour un visiteur, on n'y touche pas.

---

## 🔴 Anomalie critique — ISTJ entièrement sans accents

`src/app/data/profils/istj.ts` ne contient **aucun accent** : 4 octets non-ASCII en tout (contre ~2 700 à 3 500 pour les autres fichiers), aucun octet d'accent ni UTF-8 ni Latin-1. **Ce n'est pas un problème d'encodage** : les accents sont réellement absents du texte.

Conséquence : les 3 variantes ISTJ s'affichent en français sans accents. Exemples réels : « Le jour ou tu t'ouvres… » (12×), « assouplis tes procedures », « ta fiabilite », « spontaneite », « efficacite », « loyaute ».

ISTJ était pourtant marqué « FAIT et valide » (le build passe, car du texte sans accent reste du code valide). **Action : ré-accentuation complète des 3 variantes ISTJ.** Priorité haute.

---

## Tics internes par profil (priorité)

Phrases-signature de 4 mots répétées ≥3× **dans une même variante**, hors formules maison volontaires (« Le jour où tu… » des paradoxes, « Est-ce que je… » du bloc questions). Les pires d'abord.

| Profil | Tic principal | Autres |
|---|---|---|
| **ESFP-V3** | « ton goût du beau » ×11 | « du beau et de » ×4 |
| **ISTJ-V3** | « ce que tu portes » ×10 | « ton sens du juste » ×8 |
| **ISFP-V3** | « ce qui est juste » ×9 | « ton idéalisme peut te faire » ×5 |
| **ISFP-V2** | « goût de l'instant » ×8 | « l'instant peut te » ×4 |
| **ISTP-V2** | « ton goût de l' » ×8 | « ce que tu ressens » ×5 |
| **ISFP-V1** | « ce que tu portes » ×8 | « ce que tu ressens » ×7 |
| **ESFP-V1** | « goût de l'instant » ×7 | « à penser à demain » ×3 |
| **ISFJ-V2** | « ton besoin d'harmonie » ×6 | « pour préserver la paix » ×5 |
| **ESFJ-V3** | « ton cœur et ta tête » ×6 | « pris pour de la » ×5 |
| **ISTP-V1** | « ce que tu ressens » ×6 | « ton goût de l' » ×4 |
| **ESFP-V2** | « prendre soin de toi en retour » ×5 | « profondeur de cœur » ×4 |
| **ENFJ-V1** | « prendre soin de toi » ×6 | « de créer du lien » (V3 ×5) |
| **INFJ-V1** | « prendre soin de toi » ×5 | « à élever les autres » ×3 |
| **ENTP-V3** | « dépendre de l'admiration » ×4 | « au-delà du charme » ×4 |
| **ESFJ-V1** | « dépendre de l'approbation » ×4 | « l'oubli de soi » ×4 |
| **ISFJ-V3** | « ton discernement et ta » ×4 | « ton dévouement peut te » ×3 |

**Bilan : 42 profils sur 48** ont au moins un tic interne de 4 mots répété ≥3×.

---

## Tirets longs (—)

**Aucun dans le contenu affiché.** 6 occurrences dans `profils.ts`, toutes en commentaires de code ou texte placeholder (jamais affiché). Convention respectée.

---

## État de la passe & priorités

- **ISFJ-V1 : FAIT** (passe complète intra-résumé — titres diversifiés + textes dé-dupliqués).
- Reste : ISFJ-V2/V3, puis tous les autres résumés par ordre de gravité ci-dessus.
- **🔴 ISTJ : ré-accentuer les 3 variantes** (indépendant de la répétition, mais urgent).

### Méthode
Édits séquentiels + relecture de vérif (l'outil Read est fiable ; bash/tsc/grep peuvent voir des vues OneDrive tronquées). Valider par `npm run build` côté Windows. Jamais de sous-agents écrivant en parallèle (corrompt OneDrive). Commit/push depuis Windows.
