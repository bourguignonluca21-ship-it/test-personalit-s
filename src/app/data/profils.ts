// =============================================================================
// BASE DE CONTENU DES PROFILS (48 = 16 types × 3 variantes).
// Pour la V1 : contenu PLACEHOLDER générique (textes originaux à remplacer
// profil par profil). Tout passe par getProfil() → le jour où on bascule vers
// Supabase, on ne change QUE cette fonction.
// =============================================================================

import { getTypeByCode } from "./types";
import { NOMS_VARIANTES } from "./moteur";

export interface ProfilSection {
  apercu: string; // texte visible gratuitement
  premium?: string; // suite réservée au rapport complet (optionnel)
}

export interface Profil {
  code: string; // "INFP"
  variante: string; // "V1" | "V2" | "V3"
  nomType: string; // "Médiateur"
  nomVariante: string; // "Poète"
  accroche: string;
  introduction: string; // court paragraphe d'introduction (sous le héros)
  sections: {
    traits: ProfilSection; // 1 — Traits de personnalité (sous les barres)
    carriere: ProfilSection; // 2 — Parcours professionnel
    developpement: ProfilSection; // 3 — Développement personnel
    relations: ProfilSection; // 4 — Vos relations
  };
}

// Les grandes sections numérotées (agencement de la page résultat, façon 16P).
export const PROFIL_SECTIONS = [
  { id: "traits", num: 1, label: "Traits de personnalité" },
  { id: "variantes", num: 2, label: "Les variantes" },
  { id: "relations", num: 3, label: "Mes relations" },
  { id: "carriere", num: 4, label: "Professionnel" },
  { id: "developpement", num: 5, label: "Mindset & dév personnel" },
] as const;

// Accroches réelles par profil (clé CODE-Vx). On les remplit au fur et à mesure ;
// à défaut, on retombe sur la tagline générique du type.
const ACCROCHES: Record<string, string> = {
  "INFP-V1": "Tu ne traverses pas la vie, tu la ressens intensément.",
};

// Introduction longue par profil (≈ 2 paragraphes), tirée du rapport long.
const INTROS: Record<string, string> = {
  "INFP-V1": `En tant que Médiateur (INFP), tu possèdes une sensibilité d'une rare profondeur et un monde intérieur foisonnant, peuplé de rêves, d'émotions, d'images et de beauté. Là où d'autres perçoivent le monde de façon plate et fonctionnelle, toi tu le ressens dans toutes ses nuances et ses résonances émotionnelles, ce qui fait de toi une âme d'artiste, que tu crées concrètement ou non. Ce qui te définit avant tout, c'est ton authenticité : tu as un besoin viscéral d'être fidèle à toi-même, à tes valeurs et à ce que tu ressens vraiment, et tu ne peux ni faire semblant ni trahir ce qui compte pour toi sans en souffrir.

Ce qui te porte, c'est l'idéal et la beauté : tu gardes en toi la vision d'un monde plus beau, plus juste, plus tendre, et tu as ce don rare de créer du sens et de l'émotion là où d'autres ne voient rien. Ta profondeur émotionnelle te permet de ressentir intensément et de comprendre les autres presque intuitivement ; c'est la source de ta créativité comme de ton empathie. Parmi les trois façons d'être de ton type, tu es le plus tourné vers le ressenti et la beauté, le Poète. Cette même richesse intérieure peut parfois t'entraîner dans la rêverie et rendre plus difficile le côté concret du quotidien : ton plus beau terrain de croissance sera d'incarner tes rêves et tes valeurs dans le réel.`,
};

// Texte de la section « Traits » par TYPE (clé CODE) — commun aux 3 variantes,
// affiché sous les barres. On remplit au fur et à mesure.
const TRAITS_TEXTE: Record<string, string> = {
  INFP: `Ton esprit est tourné vers l'intérieur : tu passes une grande partie de ton temps à explorer ce que tu ressens, ce en quoi tu crois et ce qui donne du sens à ta vie. Cette attention à ton monde intérieur est une vraie force, elle nourrit ta lucidité et ta créativité, mais elle a aussi un revers : quand ce regard se retourne contre toi, il devient facile de trop te juger. Tu encaisses aussi mal la critique, et il t'arrive de te sentir incompris ou à fleur de peau là où d'autres passeraient sans y penser.

Pourtant, c'est justement cette profondeur qui fait ta valeur. Ta fidélité à tes idéaux et ta capacité à voir le meilleur chez les autres font de toi une présence rare, de celles qui rendent leur entourage un peu meilleur. Tout l'enjeu de ton chemin, c'est de relier ta riche vie intérieure aux exigences du quotidien : ancrer tes rêves dans le concret, et continuer d'apporter autour de toi un peu plus de beauté, de douceur et d'authenticité.`,
};

// Section « Mindset & dév personnel » (clé CODE-Vx) : accroche gratuite + suite premium.
const MINDSET_TEXTE: Record<string, ProfilSection> = {
  "INFP-V1": {
    apercu: `Ton plus grand chantier n'est pas autour de toi, il est en toi. Tu portes une richesse intérieure immense, mais aussi une exigence qui peut se retourner contre toi : l'autocritique qui ronge, la rêverie qui éloigne du concret, la peur de te trahir. La bonne nouvelle, c'est que ces fragilités sont aussi tes plus grands leviers de croissance, à condition de savoir où appuyer.`,
  },
};

// Détail enrichi d'une GRANDE section (relations, carriere, developpement),
// façon 16P : encart « traits influents » (teaser verrouillé) + forces/ombres
// (gratuit) + encarts premium (super-pouvoirs, risques…). Clé CODE-Vx-section.
export interface SectionDetail {
  traitsInfluents?: { nom: string; texte: string }[]; // teaser verrouillé (pas de score)
  forces?: { titre: string; texte: string; accent?: string }[];
  ombres?: { titre: string; texte: string; accent?: string }[];
  blocs?: { titre: string; ton: "positif" | "negatif"; items: string[] }[]; // paires de blocs
  compatibilites?: {
    titre: string;
    ton: "positif" | "negatif";
    items: string[];
    profils: { code?: string; nom?: string; raison: string }[];
    panelTitre?: string;
  }[];
  premiums?: { titre: string; sousTitre: string }[]; // encarts verrouillés
  paradoxe?: { tension: string; lumiere: string; ombre: string; bascule: string };
  evolution?: string; // « Comment tu évolues »
  etapes?: { label: string; texte: string }[]; // frise des âges (enfance → ancien)
  pieges?: { titre: string; texte: string; accent?: string }[]; // « Tes pièges à éviter »
  leviers?: { titre: string; texte: string; accent?: string }[]; // « Tes leviers de développement »
  motRoute?: string; // « Un mot pour la route » (clôture)
}

const SECTION_DETAIL: Record<string, SectionDetail> = {
  "INFP-V1-relations": {
    forces: [
      { titre: "Une écoute du cœur", texte: "Ton empathie invite les autres à se confier ; auprès de toi, on se sent vraiment entendu." },
      { titre: "Des liens profonds", texte: "Tu crées des relations vraies, fondées sur la confiance et la vulnérabilité partagée." },
      { titre: "Une loyauté tendre", texte: "Une fois engagé, tu offres une fidélité profonde et une attention délicate à l'autre." },
      { titre: "Une présence qui sécurise", texte: "Tu sais créer des espaces sûrs où chacun peut être soi, sans masque ni jugement." },
      { titre: "Une finesse émotionnelle", texte: "Tu perçois ce que les autres ressentent au-delà des mots et des apparences." },
      { titre: "Le respect des singularités", texte: "Tu chéris l'autre dans sa différence, sans jamais chercher à le changer." },
    ],
    ombres: [
      { titre: "La fuite du conflit", texte: "Pour préserver l'harmonie, tu peux taire ce qui ne te va pas, jusqu'à t'oublier toi-même." },
      { titre: "L'idéalisation des relations", texte: "Tu attends parfois trop d'une relation, ce qui t'expose à la déception et à l'éloignement." },
      { titre: "Des besoins négligés", texte: "Tu négliges ou tu exprimes mal tes propres besoins émotionnels." },
      { titre: "Une distance soudaine", texte: "Le trop-plein d'émotion peut te faire prendre tes distances sans prévenir." },
      { titre: "Une grande vulnérabilité", texte: "Une critique ou un malentendu peut te toucher bien plus longtemps que prévu." },
      { titre: "Le rôle de confident", texte: "Ta pudeur peut te faire garder tes peines pour toi, dans le rôle de celui qui écoute sans se livrer." },
    ],
    blocs: [
      {
        titre: "Ce qui est toxique pour toi",
        ton: "negatif",
        items: [
          "Les relations de surface, sans sincérité ni profondeur.",
          "Les personnes qui jugent ta sensibilité ou la trouvent « excessive ».",
          "Les conflits permanents, l'agressivité, la dureté.",
          "Les faux-semblants, la manipulation, le mensonge.",
          "Devoir porter un masque pour être accepté.",
        ],
      },
      {
        titre: "Ce qui te réussit",
        ton: "positif",
        items: [
          "Des liens profonds où tu peux être pleinement toi-même.",
          "Des personnes qui chérissent ta sensibilité au lieu de la juger.",
          "De l'espace pour te ressourcer seul, sans culpabiliser.",
          "Une communication douce, honnête et sans agressivité.",
          "Des valeurs et une quête de sens partagées.",
        ],
      },
    ],
    compatibilites: [
      {
        titre: "Les –",
        ton: "negatif",
        items: [
          "Les profils très rationnels ou directs, dont la franchise peut te blesser.",
          "Les tempéraments froids, peu à l'aise avec l'émotion.",
          "Les personnalités dominatrices qui ne respectent pas ta sensibilité.",
        ],
        profils: [
          { code: "ESTJ", raison: "sa rigueur et sa franchise directe peuvent heurter ta sensibilité." },
          { code: "ENTJ", raison: "son autorité et son pragmatisme froid peuvent t'écraser." },
          { code: "ESTP", raison: "son côté terre-à-terre et impulsif te paraît parfois insensible." },
        ],
      },
      {
        titre: "Les +",
        ton: "positif",
        items: [
          "Les profils intuitifs et sensibles, qui partagent ta quête d'authenticité.",
          "Les tempéraments chaleureux qui t'aident à exprimer tes émotions.",
          "Les esprits ancrés dans le concret qui t'aident à passer à l'action.",
        ],
        profils: [
          { code: "ENFJ", raison: "sa chaleur et son écoute te font sentir compris, et te tirent en douceur vers l'action." },
          { code: "INFJ", raison: "il partage ta profondeur, ton intuition et ta quête de sens." },
          { code: "ENFP", raison: "son enthousiasme et son authenticité résonnent avec ton monde intérieur." },
        ],
      },
    ],
    paradoxe: {
      tension:
        "Tu rêves de liens d'une profondeur rare,\nmais ce qui pourrait t'en rapprocher peut aussi t'en éloigner.",
      lumiere:
        "Ta capacité à aimer, comprendre et accueillir l'autre est immense : tu offres une présence rare, qui fait profondément du bien.",
      ombre:
        "Mais à idéaliser l'autre, à taire tes besoins et à fuir le conflit, tu risques la déception, le silence et la distance.",
      bascule:
        "Le jour où tu acceptes l'imperfection des liens et oses dire ce que tu ressens, tu construis enfin les relations vraies et durables dont tu rêves.",
    },
  },
  "INFP-V1-carriere": {
    forces: [
      { titre: "Une créativité qui inspire", accent: "créativité", texte: "Tu apportes une sensibilité et une originalité que les esprits purement fonctionnels n'ont pas." },
      { titre: "Un moteur : le sens", accent: "sens", texte: "Quand ta mission résonne avec tes valeurs, tu donnes le meilleur de toi-même." },
      { titre: "Une vraie empathie", accent: "empathie", texte: "Tu comprends les gens en profondeur, un atout dans tout métier humain ou relationnel." },
      { titre: "Une grande authenticité", accent: "authenticité", texte: "Tu es intègre et fidèle à tes valeurs, ce qui inspire confiance et respect." },
      { titre: "Une intuition féconde", accent: "intuition", texte: "Tu vois des possibilités et des solutions là où d'autres ne voient que le problème." },
      { titre: "Un engagement sincère", accent: "engagement", texte: "Quand une cause te touche, tu t'investis avec une profondeur rare." },
    ],
    ombres: [
      { titre: "Du mal à structurer", accent: "structurer", texte: "Les plannings, l'organisation et la discipline ne sont pas ton terrain naturel." },
      { titre: "Des idées non concrétisées", accent: "concrétisées", texte: "Tu peux avoir de belles idées qui restent à l'état de rêve, faute de passage à l'acte." },
      { titre: "Une difficulté à te vendre", accent: "vendre", texte: "Tu peux peiner à défendre ta valeur, tes intérêts et la qualité de ton travail." },
      { titre: "Une sensibilité à la pression", accent: "pression", texte: "La compétition, les conflits et les délais serrés brouillent ta créativité." },
      { titre: "Une indécision tenace", accent: "indécision", texte: "Par peur de mal choisir ou de fermer des portes, tu repousses tes décisions." },
      { titre: "Un rapport flou à l'argent", accent: "argent", texte: "L'argent te motive peu, et tu peux négliger tes intérêts financiers." },
    ],
    blocs: [
      {
        titre: "Ce qui t'éteint",
        ton: "negatif",
        items: [
          "La compétition agressive et les conflits permanents.",
          "Le travail vide de sens, purement matériel.",
          "Les contraintes rigides et la micro-gestion.",
          "Les environnements impersonnels ou méprisants.",
          "La pression et les délais qui brident ta créativité.",
        ],
      },
      {
        titre: "Ce qui te booste",
        ton: "positif",
        items: [
          "Un travail aligné avec tes valeurs et porteur de sens.",
          "De l'autonomie et la liberté de suivre ton inspiration.",
          "Un environnement humain, calme et bienveillant.",
          "Pouvoir créer, aider ou défendre une cause.",
          "Le respect de qui tu es.",
        ],
      },
    ],
    compatibilites: [
      {
        titre: "Les environnements à éviter",
        ton: "negatif",
        panelTitre: "Là où tu risques de t'éteindre",
        items: [
          "Les milieux purement matériels ou compétitifs.",
          "Les environnements agressifs ou impersonnels.",
          "Le travail répétitif, rigide et vide de sens.",
        ],
        profils: [
          { nom: "Vente agressive, trading", raison: "la compétition et les chiffres au détriment du sens." },
          { nom: "Postes très hiérarchiques", raison: "la pression et l'autorité qui brident ton autonomie." },
          { nom: "Tâches répétitives", raison: "des process rigides qui éteignent ta créativité." },
        ],
      },
      {
        titre: "Les métiers faits pour toi",
        ton: "positif",
        panelTitre: "Des pistes qui te ressemblent",
        items: [
          "Les domaines créatifs et artistiques.",
          "Les métiers de l'aide, du soin et du conseil.",
          "Tout ce qui a du sens et défend une cause.",
        ],
        profils: [
          { nom: "Création & écriture", raison: "romancier, scénariste, artiste, designer : exprimer ta sensibilité." },
          { nom: "Aide & soin", raison: "psychologue, art-thérapeute, travailleur social : accompagner les autres." },
          { nom: "Transmission", raison: "enseignant, formateur, coach : partager ce qui te passionne." },
          { nom: "Engagement", raison: "ONG, associations, causes : servir quelque chose de juste." },
        ],
      },
    ],
    paradoxe: {
      tension:
        "Ta créativité peut produire des choses magnifiques,\nmais sans un peu de cadre, elle risque de ne jamais voir le jour.",
      lumiere:
        "Porté par le sens et l'inspiration, tu crées avec une profondeur et une humanité rares, et tu donnes le meilleur quand ton cœur est pleinement engagé.",
      ombre:
        "Mais ta difficulté à structurer, à concrétiser et à t'affirmer peut laisser tes plus belles idées à l'état de rêve.",
      bascule:
        "Le jour où tu te donnes juste assez de cadre pour finir ce que tu commences et défendre ta valeur, ton potentiel se transforme en réalisations reconnues.",
    },
  },
  "INFP-V1-developpement": {
    evolution: `Ta personnalité n'est pas figée : elle mûrit, et ton type suit une trajectoire de croissance particulièrement marquée. Jeune, tu vis tout entier dans ta sensibilité et ton monde intérieur — c'est riche, mais souvent déséquilibré : tu peux être submergé par tes émotions, te réfugier dans le rêve, et peiner à t'affirmer.

Avec le temps, tu comprends qu'une richesse intérieure qui ne s'incarne pas reste stérile. Tu apprends à concrétiser, à te protéger, à t'affirmer, sans rien perdre de ta sensibilité. Dans ta pleine maturité, tu deviens une âme sensible et créative qui sait aussi habiter le réel : ta beauté intérieure rayonne enfin dans le monde au lieu de rester cachée. Et c'est entièrement à ta portée.`,
    etapes: [
      { label: "Enfance", texte: "Tu vis déjà dans un monde intérieur foisonnant, peuplé de rêves et d'images. Tu ressens tout très fort, tendre et rêveur, parfois à fleur de peau et facilement blessé." },
      { label: "Jeunesse", texte: "Tu es tout entier dans ta sensibilité et tes idéaux. C'est riche, mais déséquilibré : tu peux être submergé par tes émotions, te réfugier dans le rêve et peiner à t'affirmer." },
      { label: "Adulte", texte: "Tu comprends qu'une richesse qui ne s'incarne pas reste stérile. Tu apprends à concrétiser, à te protéger et à t'affirmer, sans rien perdre de ta profondeur." },
      { label: "Ancien", texte: "Dans ta pleine maturité, tu es une âme sensible et créative qui sait aussi habiter le réel. Ta beauté intérieure rayonne enfin dans le monde : la version la plus accomplie de toi." },
    ],
    pieges: [
      { titre: "Le refuge dans le rêve", accent: "rêve", texte: "À force de vivre dans l'idéal, tu peux fuir le réel et ne jamais concrétiser : tes rêves restent alors des rêves, et ton potentiel sommeille." },
      { titre: "Le débordement émotionnel", accent: "débordement", texte: "Ta sensibilité peut te submerger, te faire tout vivre trop intensément et te blesser facilement, au point de devenir un fardeau." },
      { titre: "L'idéalisme déçu", accent: "idéalisme", texte: "Tes attentes si élevées te laissent souvent déçu par un monde, des gens et un toi-même forcément imparfaits, et durcissent ton regard sur toi." },
      { titre: "La non-affirmation", accent: "affirmation", texte: "Ton besoin d'harmonie peut te faire taire tes besoins, éviter les conflits et t'effacer, jusqu'à te perdre et accumuler un mal-être." },
    ],
    leviers: [
      { titre: "Concrétiser tes rêves", accent: "Concrétiser", texte: "Donne forme à ce que tu portes en toi : transforme une idée en création, une aspiration en projet, un rêve en première étape concrète." },
      { titre: "Te protéger émotionnellement", accent: "protéger", texte: "Apprends à accueillir tes émotions sans te laisser submerger, à prendre du recul face aux tensions, à ne pas tout absorber." },
      { titre: "Oser t'affirmer", accent: "affirmer", texte: "Exprime tes besoins, pose tes limites, défends ce qui compte pour toi, même quand cela crée un peu de friction." },
      { titre: "Accepter l'imperfection", accent: "imperfection", texte: "Lâcher l'exigence d'idéal absolu, sans renoncer à tes valeurs, te libère de la déception et t'apporte une vraie sérénité." },
      { titre: "T'ancrer dans le réel", accent: "ancrer", texte: "Cultive un rapport au concret et à l'action : des étapes simples, du tangible, qui donnent une prise à ta richesse intérieure." },
    ],
    motRoute: `Tu es un Poète, une de ces âmes rares qui ressentent le monde avec une intensité que peu connaissent. Ta sensibilité est un don, ton authenticité une force, ta créativité une richesse. Ne laisse jamais personne te convaincre que ta sensibilité est une faiblesse : c'est ta beauté et ta force, et le monde en a besoin. Il te reste une seule grande conquête : faire sortir ta richesse intérieure pour qu'elle rayonne dans le monde. Tu portes un monde de beauté en toi, offre-le au monde.`,
  },
};

// Renvoie le détail d'une grande section (null si pas encore rédigé).
export function getSectionDetail(code: string, variante: string, section: string): SectionDetail | null {
  const c = (code || "").toUpperCase();
  const v = (variante || "V1").toUpperCase();
  return SECTION_DETAIL[`${c}-${v}-${section}`] ?? null;
}

// Texte de la section « Professionnel » (clé CODE-Vx), adapté à la variante.
const PRO_TEXTE: Record<string, string> = {
  "INFP-V1": `Au travail, tu as besoin d'une chose avant toutes les autres : du sens. Un poste qui paie bien mais qui sonne creux finira toujours par t'éteindre. Tu donnes le meilleur de toi quand tu peux créer, aider, et rester fidèle à ce en quoi tu crois. C'est pour ça que les voies où l'on touche à l'humain et à l'imaginaire, l'accompagnement, l'enseignement, l'écriture, les métiers créatifs, te parlent souvent plus que les autres. Trouver ta place peut prendre du temps, par essais et par détours, parce qu'il te faut concilier tes idéaux avec les réalités du monde du travail.

Ta capacité à penser autrement et à comprendre les gens en profondeur est un atout rare, précieux partout où il faut inventer des solutions ou tisser du lien. En revanche, les cadres très rigides et les tâches répétitives risquent vite de t'étouffer : tu as besoin d'air, de souplesse, d'autonomie. Tout l'enjeu, c'est de trouver un métier qui épouse tes valeurs et te laisse cette liberté, pour avoir un vrai impact sans jamais te trahir.`,
};

// Texte de la section « Mes relations » (clé CODE-Vx), adapté à la variante.
const RELATIONS_TEXTE: Record<string, string> = {
  "INFP-V1": `En amour comme en amitié, tu ne cherches pas le nombre mais la profondeur. Ce qu'il te faut, ce sont des liens vrais, où tu peux te montrer tel que tu es et sentir l'autre en retour. Ton empathie et ta façon de percevoir presque intuitivement ce que les gens ressentent font de toi un ami et un partenaire d'une rare attention : auprès de toi, on se sent compris, accueilli, en sécurité. Tu crées sans effort ces espaces où l'autre peut enfin baisser la garde.

Mais ton idéalisme a son revers. Tu places la barre haut, et tu peux être blessé ou déçu quand les autres ne sont pas à la hauteur de l'image que tu te faisais d'eux, ou de la relation. Ton chemin, c'est d'apprendre à dire tes besoins clairement, à poser des limites saines, et à accepter les autres (comme toi-même) avec leurs imperfections, sans y voir une trahison. Et même quand un lien compte énormément pour toi, n'oublie pas que tu as besoin de moments seuls pour te ressourcer et te retrouver.`,
};

// Détail enrichi d'une variante : points forts, ombres (faibles) et paradoxe central.
export interface VarianteDetail {
  forces: { titre: string; texte: string; accent?: string }[];
  ombres: { titre: string; texte: string; accent?: string }[];
  paradoxe: {
    tension: string; // la phrase-choc qui nomme le paradoxe
    lumiere: string; // la face lumineuse (ta force)
    ombre: string; // la face d'ombre (le risque)
    bascule: string; // ce qui transforme la tension en force
  };
}

const VARIANTE_DETAIL: Record<string, VarianteDetail> = {
  "INFP-V1": {
    forces: [
      {
        titre: "Une sensibilité rare",
        accent: "sensibilité",
        texte: "Tu perçois des nuances, des beautés et des émotions que la plupart des gens ne captent même pas.",
      },
      {
        titre: "Une authenticité qui inspire",
        accent: "authenticité",
        texte: "Tu ne joues aucun rôle. Dans un monde de faux-semblants, cette vérité crée une confiance rare autour de toi.",
      },
      {
        titre: "Une créativité foisonnante",
        accent: "créativité",
        texte: "Ton monde intérieur déborde d'images et d'idées que tu transformes en beauté, en mots, en sens.",
      },
      {
        titre: "Une empathie profonde",
        accent: "empathie",
        texte: "Tu comprends les émotions des autres avec une finesse qui fait de toi un confident précieux.",
      },
      {
        titre: "Une fidélité à tes valeurs",
        accent: "fidélité",
        texte: "Ta boussole morale est forte : tu agis en accord avec ton cœur, et ça donne du poids à toute ta vie.",
      },
      {
        titre: "Une vision poétique",
        accent: "vision",
        texte: "Tu trouves du sens et de la beauté là où d'autres ne voient rien, et tu sais le faire ressentir.",
      },
    ],
    ombres: [
      {
        titre: "Une sensibilité qui submerge",
        accent: "sensibilité",
        texte: "Tu ressens si fort que les conflits, les critiques ou la douleur du monde peuvent vite te déborder.",
      },
      {
        titre: "Une rêverie envahissante",
        accent: "rêverie",
        texte: "À vivre dans l'idéal, tu peux remettre l'action à plus tard et rêver ta vie plutôt que la vivre.",
      },
      {
        titre: "Un idéalisme qui déçoit",
        accent: "idéalisme",
        texte: "Tes attentes très hautes se heurtent au réel imparfait, et tu peux t'en vouloir durement.",
      },
      {
        titre: "Un effacement de soi",
        accent: "effacement",
        texte: "Ton besoin d'harmonie te pousse à taire tes besoins et à éviter le conflit, quitte à te négliger.",
      },
      {
        titre: "Un quotidien qui résiste",
        accent: "quotidien",
        texte: "Le concret et l'organisation te coûtent : passer du rêve à l'acte n'a rien d'automatique pour toi.",
      },
      {
        titre: "Une autocritique sévère",
        accent: "autocritique",
        texte: "Tu te juges durement et retiens tes failles bien plus que tes réussites.",
      },
    ],
    paradoxe: {
      tension:
        "Ta richesse intérieure est immense, mais elle risque\nde rester un monde secret qui ne s'incarne jamais dans le réel.",
      lumiere:
        "Ta sensibilité, ta créativité, ta profondeur et tes idéaux sont des trésors. Tu portes en toi de la beauté, de l'émotion et des rêves qui pourraient enrichir le monde.",
      ombre:
        "Mais à force de vivre dans ton monde intérieur, de rêver plus que d'agir et d'avoir du mal à concrétiser, tout cela peut rester enfermé en toi, invisible, sans prise sur le réel.",
      bascule:
        "Le jour où tu apprends à incarner cette richesse dans le réel, ton monde intérieur cesse d'être un refuge secret pour devenir une source de beauté et de sens pour les autres.",
    },
  },
};

// Renvoie le détail enrichi d'une variante (null si pas encore rédigé).
export function getVarianteDetail(code: string, variante: string): VarianteDetail | null {
  const c = (code || "").toUpperCase();
  const v = (variante || "V1").toUpperCase();
  return VARIANTE_DETAIL[`${c}-${v}`] ?? null;
}

// Texte long d'une variante (clé CODE-Vx), affiché sous les barres des variantes.
const TEXTE_VARIANTE: Record<string, string> = {
  "INFP-V1": `Parmi les trois visages du Médiateur, tu es celui qui vit le plus à travers le ressenti et la beauté. Le monde n'est jamais pour toi une simple succession de faits : c'est une expérience qui te traverse, faite d'émotions, d'images et de résonances que la plupart des gens ne perçoivent même pas. Cette sensibilité fait de toi une âme d'artiste, que tu crées concrètement ou non, et elle te relie aux autres avec une profondeur rare.

Ce qui te guide avant tout, c'est l'authenticité : tu ne peux pas faire semblant, ni trahir ce que tu ressens, sans en souffrir. Tu portes en toi l'image d'un monde plus beau, plus doux, plus vrai, et tu cherches à en faire vivre un peu partout où tu passes. Le revers, c'est que cette richesse intérieure peut t'emporter dans la rêverie et rendre le concret plus difficile. Ton plus beau terrain de croissance sera d'oser donner corps à tes rêves dans le réel, sans rien perdre de ta sensibilité.`,
};

// Renvoie le texte long d'une variante (vide si pas encore rédigé).
export function getTexteVariante(code: string, variante: string): string {
  const c = (code || "").toUpperCase();
  const v = (variante || "V1").toUpperCase();
  return TEXTE_VARIANTE[`${c}-${v}`] ?? "";
}

// Descriptions des variantes (clé CODE-Vx), affichées au survol de chaque barre.
// On remplit au fur et à mesure ; à défaut on retombe sur un texte générique.
const DESCRIPTIONS_VARIANTES: Record<string, string> = {
  "INFP-V1":
    "Les Poètes sont les plus tournés vers le ressenti et la beauté. Ils vivent le monde comme une expérience émotionnelle et esthétique, et cherchent avant tout à rester fidèles à ce qu'ils ressentent.",
  "INFP-V2":
    "Les Rêveurs Créatifs sont portés par l'imagination et les possibles. Leur esprit foisonne d'idées, d'histoires et de projets ; ils transforment leur monde intérieur en création.",
  "INFP-V3":
    "Les Idéalistes Engagés mettent leurs valeurs en action. Animés par une cause et un idéal de justice, ils cherchent à incarner concrètement ce en quoi ils croient.",
};

// Renvoie la description d'une variante (texte générique si pas encore rédigée).
export function getDescriptionVariante(code: string, variante: string, nomVariante: string): string {
  const c = (code || "").toUpperCase();
  const v = (variante || "V1").toUpperCase();
  return (
    DESCRIPTIONS_VARIANTES[`${c}-${v}`] ??
    `Les ${nomVariante} forment l'une des trois façons d'être de ce type. (Description à rédiger.)`
  );
}

// Contenu placeholder ORIGINAL (à remplacer). Marqué clairement « démonstration ».
function placeholderSections(nomType: string, nomVariante: string): Profil["sections"] {
  const ph = (apercu: string): ProfilSection => ({
    apercu,
    premium: "La suite de cette section est réservée au rapport complet — texte à rédiger.",
  });
  return {
    traits: ph(
      `Voici ce que tes traits dominants disent de toi, en tant que ${nomType} « ${nomVariante} » : ta façon de penser, de ressentir et d'agir au quotidien. (Texte de démonstration à remplacer.)`,
    ),
    carriere: ph(
      "Les environnements, rôles et métiers où ce profil s'épanouit, et sa manière de travailler. (Démonstration.)",
    ),
    developpement: ph(
      "Tes forces, tes points de vigilance et des pistes concrètes pour grandir. (Démonstration.)",
    ),
    relations: ph(
      "Ta façon d'aimer, de te lier en couple, en amitié et avec tes proches. (Démonstration.)",
    ),
  };
}

// Récupère le profil correspondant à un type + variante.
// Garde-fou : ne lève jamais d'erreur — renvoie toujours une fiche (placeholder
// tant que le contenu réel n'est pas saisi, ou fallback si le type est inconnu).
export function getProfil(code: string, variante: string): Profil {
  const c = (code || "").toUpperCase();
  const v = (variante || "V1").toUpperCase();
  const type = getTypeByCode(c);
  const nomType = type?.name ?? c;
  const nomVariante = NOMS_VARIANTES[c]?.[v] ?? v;

  // Sections : placeholder par défaut, avec le vrai texte « Traits » si on l'a (par type).
  const sections = placeholderSections(nomType, nomVariante);
  if (TRAITS_TEXTE[c]) {
    sections.traits = { apercu: TRAITS_TEXTE[c] };
  }
  if (RELATIONS_TEXTE[`${c}-${v}`]) {
    sections.relations = { apercu: RELATIONS_TEXTE[`${c}-${v}`] };
  }
  if (PRO_TEXTE[`${c}-${v}`]) {
    sections.carriere = { apercu: PRO_TEXTE[`${c}-${v}`] };
  }
  if (MINDSET_TEXTE[`${c}-${v}`]) {
    sections.developpement = MINDSET_TEXTE[`${c}-${v}`];
  }

  // ⬇️ Plus tard : si une fiche réelle existe pour `${c}-${v}`, on la renvoie ici.
  return {
    code: c,
    variante: v,
    nomType,
    nomVariante,
    accroche: ACCROCHES[`${c}-${v}`] ?? type?.tagline ?? "",
    introduction:
      INTROS[`${c}-${v}`] ??
      `Tu es un profil ${nomType}, dans sa variante « ${nomVariante} ». Voici un aperçu de qui tu es — à compléter avec tes propres mots. (Texte de démonstration.)`,
    sections,
  };
}
