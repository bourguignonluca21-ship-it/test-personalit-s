// =============================================================================
// LES CONTRÔLES AVANT PUBLICATION.
//
// ⚠️ SERVEUR UNIQUEMENT. Ne jamais importer ce fichier dans un composant
// « use client » : le contrôle serait alors exécuté par le navigateur du
// visiteur, donc contournable en dix secondes avec les outils de développement.
//
// Deux couches, dans cet ordre :
//   1. les garde-fous mécaniques, gratuits et instantanés (mots interdits,
//      liens, e-mails, longueur) ;
//   2. le classificateur d'OpenAI (`omni-moderation-latest`), gratuit lui aussi,
//      qui rend un score par catégorie.
//
// Trois issues possibles :
//   • « publie »   → le message paraît tout de suite ;
//   • « a_revoir » → il n'est PAS publié, il attend une décision humaine ;
//   • « bloque »   → il est refusé, et l'auteur en est informé (le DSA impose
//                    de dire à quelqu'un pourquoi son message est modéré).
// =============================================================================

export type EtatCommentaire = "publie" | "a_revoir" | "bloque";
export type Verdict = { etat: EtatCommentaire; motif: string | null };

// -----------------------------------------------------------------------------
// 1. LES GARDE-FOUS MÉCANIQUES
// -----------------------------------------------------------------------------

/* Liste de départ, volontairement courte : elle attrape les insultes frontales
   et le spam, rien de plus. ⚠️ Une liste de mots se contourne (lettres
   remplacées par des chiffres) et se trompe (elle coupe des mots innocents qui
   en contiennent un autre) : c'est un filet grossier, pas une modération. Le
   vrai tri vient de la couche 2.
   Pour l'étoffer : la liste publique LDNOOBW a un fichier français. */
const MOTS_INTERDITS = [
  "connard",
  "connasse",
  "encule",
  "enfoire",
  "salope",
  "pute",
  "batard",
  "ferme ta gueule",
  "ta gueule",
  "creve",
];

/* Le classificateur ne voit PAS le spam : « Gagnez de l'argent facilement,
   contactez-moi vite » ressort à 0. C'est donc ici qu'il se traite. */
const MARQUEURS_SPAM = [
  "gagnez de l argent",
  "argent facile",
  "revenus passifs",
  "travaillez depuis chez vous",
  "contactez moi vite",
  "whatsapp moi",
  "telegram moi",
  "crypto monnaie garantie",
  "investissement garanti",
  "code promo",
];

const LIEN = /(https?:\/\/|www\.[a-z0-9-]+\.)/i;
const EMAIL = /[\w.+-]+@[\w-]+\.[a-z]{2,}/i;
const MINI = 2;
const MAXI = 1500;

/** Minuscules, sans accents, sans ponctuation, lettres répétées ramenées à deux :
 *  « SAAAALOPE !!! » et « salope » deviennent la même chaîne. */
function normaliser(texte: string): string {
  return texte
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/(.)\1{2,}/g, "$1$1")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function gardeFous(texte: string): Verdict | null {
  const brut = texte.trim();
  if (brut.length < MINI) return { etat: "bloque", motif: "Message trop court." };
  if (brut.length > MAXI)
    return { etat: "bloque", motif: `Message trop long (${MAXI} caractères maximum).` };
  if (LIEN.test(brut))
    return { etat: "bloque", motif: "Les liens ne sont pas autorisés dans les commentaires." };
  if (EMAIL.test(brut))
    return { etat: "bloque", motif: "Les adresses e-mail ne sont pas autorisées." };

  const propre = normaliser(brut);
  const touche = MOTS_INTERDITS.find((m) => propre.includes(normaliser(m)));
  if (touche) return { etat: "bloque", motif: "Le message contient une insulte." };

  const spam = MARQUEURS_SPAM.find((m) => propre.includes(normaliser(m)));
  if (spam) return { etat: "bloque", motif: "Ce message ressemble à de la publicité." };

  return null; // rien à redire : on passe à la couche suivante
}

/* LES EXPRESSIONS FIGÉES DU FRANÇAIS.
   Le classificateur est entraîné sur l'anglais : « ce chapitre m'a tué de rire »
   ressort en violence à 0,20, et « je suis mort de rire » en automutilation à
   0,097. On neutralise donc ces tournures AVANT de lire les scores.
   ⚠️ Uniquement celles qui contiennent explicitement « de rire ». On ne touche
   pas à « envie de mourir » : c'est aussi, et souvent, une vraie détresse. */
const EXPRESSIONS = /\b(mort|morte|tue|tuee|creve|crever|mourir|pleurer)\s+de\s+rire\b|\bmdr\b|\bptdr\b/;

export function estUneExpression(texte: string): boolean {
  return EXPRESSIONS.test(normaliser(texte));
}

// -----------------------------------------------------------------------------
// 2. LE CLASSIFICATEUR
// -----------------------------------------------------------------------------

/* Deux seuils. Au-dessus du haut, on refuse ; entre les deux, on met de côté.
   Ils sont volontairement dans ce fichier, en clair, pour être réglés après
   les essais sur des phrases françaises. */
const SEUIL_BLOQUE = 0.5;
const SEUIL_REVOIR = 0.15;

/* ⚠️ SEUIL SÉPARÉ, ET BEAUCOUP PLUS BAS, POUR LA DÉTRESSE.
   Mesuré sur des phrases françaises le 04/08/2026 : « je n'en peux plus, je ne
   vois plus l'intérêt de continuer » sort à 0,096, « j'ai envie que tout
   s'arrête » à 0,125, « je vais vraiment mal en ce moment » à 0,096. Avec le
   seuil commun de 0,15, ces trois messages étaient PUBLIÉS sans que personne ne
   les voie, sur des pages qui parlent de stress.
   À 0,06 ils partent tous en file. Le prix : quelques messages anodins y
   atterriront aussi. Sur ce site, rater une personne qui va mal est plus grave
   que faire attendre une blague. */
const SEUIL_DETRESSE = 0.06;

/* Les catégories qui font refuser un message. */
const GRAVES = [
  "hate",
  "hate/threatening",
  "harassment",
  "harassment/threatening",
  "sexual",
  "violence",
  "violence/graphic",
  "illicit",
  "illicit/violent",
];

type ReponseModeration = {
  flagged: boolean;
  categories: Record<string, boolean>;
  category_scores: Record<string, number>;
};

async function appelerOpenAI(texte: string): Promise<ReponseModeration> {
  const r = await fetch("https://api.openai.com/v1/moderations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({ model: "omni-moderation-latest", input: texte }),
  });
  if (!r.ok) throw new Error(`modération OpenAI : ${r.status}`);
  const json = await r.json();
  return json.results[0] as ReponseModeration;
}

export function lireVerdict(res: ReponseModeration, texte = ""): Verdict {
  const s = res.category_scores;
  const score = (c: string) => s[c] ?? 0;
  const expression = estUneExpression(texte);

  // Contenu sexuel impliquant des mineurs : refus immédiat, sans seuil, et
  // remontée obligatoire. Ça ne se supprime pas en silence.
  if (score("sexual/minors") > 0.05 || res.categories["sexual/minors"]) {
    return { etat: "bloque", motif: "AUTORITES:sexual/minors" };
  }

  // Donner des méthodes d'automutilation à d'autres : refusé.
  if (score("self-harm/instructions") > SEUIL_BLOQUE) {
    return { etat: "bloque", motif: "Le message donne des moyens de se faire du mal." };
  }

  /* ⚠️ QUELQU'UN QUI VA MAL N'EST PAS QUELQU'UN QUI FAUTE.
     L'expression d'une détresse ou d'une intention ne se BLOQUE jamais : la
     bloquer reviendrait à faire taire une personne au moment où elle parle.
     Elle est mise de côté pour être vue vite, par un humain. */
  if (
    !expression &&
    (score("self-harm") > SEUIL_DETRESSE || score("self-harm/intent") > SEUIL_DETRESSE)
  ) {
    return { etat: "a_revoir", motif: "DETRESSE" };
  }

  // Une expression figée ne déclenche ni détresse ni violence.
  if (expression) return { etat: "publie", motif: null };

  const pire = GRAVES.reduce((m, c) => Math.max(m, score(c)), 0);
  if (pire > SEUIL_BLOQUE) {
    return { etat: "bloque", motif: "Le message enfreint les règles de l'espace commentaires." };
  }
  if (pire > SEUIL_REVOIR) {
    return { etat: "a_revoir", motif: "DOUTE" };
  }

  return { etat: "publie", motif: null };
}

// -----------------------------------------------------------------------------
// 3. LE TON — désaccord ou dénigrement ?
//
// Le classificateur ne sait pas faire cette différence : « c'est n'importe quoi
// ce test » ressort à 0,03, autant dire rien. Cette couche-ci s'en charge, avec
// un modèle de langage.
//
// ⚠️ CHOIX DE LUCA, 04/08/2026 : TOUTE CRITIQUE PASSE PAR LUI.
//   Un jugement négatif sur le site, le test, le contenu ou l'auteur n'est pas
//   publié tout seul, même poli, même argumenté. Il attend sa validation.
//   Seul ce qui n'attaque rien paraît directement.
//
// ⚠️ ET CETTE COUCHE NE BLOQUE JAMAIS. Sur une opinion, une machine se trompe
//   trop souvent pour avoir le dernier mot : elle met de côté, un humain tranche.
// Si l'appel échoue, on PUBLIE : le ton n'est pas un enjeu de sécurité, et une
// panne ne doit pas bloquer les commentaires.
// -----------------------------------------------------------------------------

const MODELE_TON = "gpt-5-mini";

const CONSIGNE_TON = `Tu tries les commentaires d'un site français sur la personnalité.
Réponds UNIQUEMENT par un JSON : {"categorie":"...","raison":"..."}

categorie vaut :
- "ok" : le message ne porte AUCUN jugement négatif sur le site, le test, le
  contenu ou son auteur. Témoignage, ressenti personnel, question, accord,
  nuance sur soi. « Je me suis bien reconnu » est "ok". « Je ne me reconnais pas
  du tout dans cette description » est "ok" : la personne parle d'elle, elle
  n'attaque pas le site.
- "critique" : le message porte un jugement négatif sur le site, le test, le
  contenu ou l'auteur, MÊME poli, MÊME argumenté, même partiellement.
  « Ce test n'a aucune valeur scientifique » est "critique".
  « L'auteur devrait revoir sa copie » est "critique".
  « La partie sur le conflit est ratée » est "critique".
- "denigrement" : moquerie, insulte déguisée, provocation gratuite, trolling.
  « lol quelle arnaque » est "denigrement".
- "hors_sujet" : publicité, message sans rapport avec la page, OU message qui
  s'adresse à une autre personne du fil pour la draguer ou commenter son
  physique. « T'es bonne toi » est "hors_sujet".

Un désaccord sur le CONTENU d'une description qui reste sur le ressenti de la
personne est "ok". Dès que le message dit que le site, le test ou l'auteur est
mauvais, faux ou peu sérieux, c'est "critique".`;

export async function examinerLeTon(texte: string): Promise<Verdict> {
  try {
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODELE_TON,
        messages: [
          { role: "system", content: CONSIGNE_TON },
          { role: "user", content: texte },
        ],
        response_format: { type: "json_object" },
      }),
    });
    if (!r.ok) return { etat: "publie", motif: null };
    const json = await r.json();
    const brut = json.choices?.[0]?.message?.content ?? "{}";
    const { categorie } = JSON.parse(brut) as { categorie?: string };

    if (categorie === "critique") return { etat: "a_revoir", motif: "CRITIQUE" };
    if (categorie === "denigrement") return { etat: "a_revoir", motif: "DENIGREMENT" };
    if (categorie === "hors_sujet") return { etat: "a_revoir", motif: "HORS_SUJET" };
    return { etat: "publie", motif: null };
  } catch {
    // Panne, quota, réponse illisible : on publie. Le ton n'est pas la sécurité.
    return { etat: "publie", motif: null };
  }
}

// -----------------------------------------------------------------------------
// 4. LE SECOND EXAMEN, APRÈS UN SIGNALEMENT.
//
// Repasser le même texte dans le classificateur redonnerait les mêmes scores :
// ça n'apprendrait rien. Ce second examen est donc DIFFÉRENT :
//   • le motif du signalement est joint à l'analyse ;
//   • le commentaire est lu AVEC SON CONTEXTE — la page, et le message auquel
//     il répond. C'est là que se cache le harcèlement ciblé : une phrase
//     anodine seule peut être une attaque en réponse à quelqu'un ;
//   • les seuils sont abaissés : un signalement est un signal, on regarde de
//     plus près.
//
// Trois issues :
//   "confirme" → le message est retiré. Un examen qui confirme vaut plus qu'un
//                principe : laisser en ligne une haine confirmée n'est pas
//                défendable.
//   "doute"    → le message RESTE EN LIGNE et apparaît dans la console.
//   "infonde"  → rien ne bouge, le signalement est noté comme infondé.
// -----------------------------------------------------------------------------

export type ExamenSignalement = {
  verdict: "confirme" | "doute" | "infonde";
  analyse: string;
};

const CONSIGNE_SIGNALEMENT = `Tu examines un commentaire SIGNALÉ sur un site
français consacré à la personnalité. On te donne la page, le message auquel il
répond s'il y en a un, le commentaire signalé, et le motif invoqué.

Réponds UNIQUEMENT par un JSON : {"verdict":"...","analyse":"..."}

verdict vaut :
- "confirme" : le commentaire est SANS AMBIGUÏTÉ de la haine, du harcèlement
  ciblé, une menace, du contenu sexuel non sollicité, ou pousse quelqu'un à se
  faire du mal. Réserve ce verdict aux cas nets.
- "doute" : c'est déplaisant, agressif ou limite, mais ça se discute.
- "infonde" : le signalement ne tient pas. Un désaccord, une critique, une
  maladresse, un avis tranché ne sont pas des infractions.

Regarde le CONTEXTE : une phrase anodine seule peut être une attaque quand elle
répond à quelqu'un. À l'inverse, un mot dur dans un débat d'idées n'est pas du
harcèlement.

"analyse" : une phrase, en français, qui dit pourquoi. Elle sera lue par le
responsable du site.

Dans le doute entre "confirme" et "doute", réponds "doute" : c'est un humain qui
tranchera.`;

export async function examinerSignalement(entree: {
  texte: string;
  motif: string;
  detail?: string | null;
  page: string;
  parent?: string | null;
}): Promise<ExamenSignalement> {
  const contexte = [
    `Page : ${entree.page}`,
    entree.parent ? `Message auquel il répond : « ${entree.parent} »` : null,
    `Commentaire signalé : « ${entree.texte} »`,
    `Motif invoqué : ${entree.motif}`,
    entree.detail ? `Précision : ${entree.detail}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODELE_TON,
        messages: [
          { role: "system", content: CONSIGNE_SIGNALEMENT },
          { role: "user", content: contexte },
        ],
        response_format: { type: "json_object" },
      }),
    });
    if (!r.ok) throw new Error(String(r.status));
    const json = await r.json();
    const { verdict, analyse } = JSON.parse(
      json.choices?.[0]?.message?.content ?? "{}"
    ) as Partial<ExamenSignalement>;

    if (verdict === "confirme" || verdict === "infonde" || verdict === "doute") {
      return { verdict, analyse: analyse ?? "" };
    }
    return { verdict: "doute", analyse: analyse ?? "Réponse inattendue de l'examen." };
  } catch {
    /* En panne, on ne retire RIEN tout seul : le signalement remonte tel quel,
       et c'est un humain qui regarde. */
    return { verdict: "doute", analyse: "Second examen indisponible." };
  }
}

// -----------------------------------------------------------------------------
// L'ENCHAÎNEMENT COMPLET
// -----------------------------------------------------------------------------

export async function examiner(texte: string): Promise<Verdict> {
  // 1. Les garde-fous mécaniques : gratuits, instantanés, sans appel réseau.
  const mecanique = gardeFous(texte);
  if (mecanique) return mecanique;

  // 2. Le classificateur de préjudice. En panne, on ne publie PAS à l'aveugle.
  let verdict: Verdict;
  try {
    verdict = lireVerdict(await appelerOpenAI(texte), texte);
  } catch {
    return { etat: "a_revoir", motif: "CONTROLE_INDISPONIBLE" };
  }
  if (verdict.etat !== "publie") return verdict;

  // 3. Le ton, seulement pour ce qui allait être publié.
  return examinerLeTon(texte);
}
