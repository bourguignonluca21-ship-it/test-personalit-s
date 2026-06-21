// =============================================================================
// BASE DE CONTENU DES PROFILS (48 = 16 types × 3 variantes).
// Pour la V1 : contenu PLACEHOLDER générique (textes originaux à remplacer
// profil par profil). Tout passe par getProfil() → le jour où on bascule vers
// Supabase, on ne change QUE cette fonction.
// =============================================================================

import { getTypeByCode } from "./types";
import { NOMS_VARIANTES } from "./moteur";

// Contenu par type (un fichier par type, fusionné plus bas dans les tables).
import enfpMod from "./profils/enfp";
import infjMod from "./profils/infj";
import enfjMod from "./profils/enfj";
import intjMod from "./profils/intj";
import intpMod from "./profils/intp";
import entjMod from "./profils/entj";
import entpMod from "./profils/entp";
import istjMod from "./profils/istj";
import isfjMod from "./profils/isfj";
import estjMod from "./profils/estj";
import esfjMod from "./profils/esfj";
import istpMod from "./profils/istp";
import isfpMod from "./profils/isfp";
import estpMod from "./profils/estp";
import esfpMod from "./profils/esfp";

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
  "INFP-V2": "Tu ne vois pas le monde tel qu'il est, mais tel qu'il pourrait être.",
  "INFP-V3": "Tu ne te contentes pas de ressentir l'injustice, tu agis pour la réparer.",
  "ENFP-V1": "Tu ne vois pas le monde tel qu'il est, tu le vois tel qu'il pourrait devenir.",
};

// Introduction longue par profil (≈ 2 paragraphes), tirée du rapport long.
const INTROS: Record<string, string> = {
  "INFP-V1": `En tant que Médiateur (INFP), tu possèdes une sensibilité d'une rare profondeur et un monde intérieur foisonnant, peuplé de rêves, d'émotions, d'images et de beauté. Là où d'autres perçoivent le monde de façon plate et fonctionnelle, toi tu le ressens dans toutes ses nuances et ses résonances émotionnelles, ce qui fait de toi une âme d'artiste, que tu crées concrètement ou non. Ce qui te définit avant tout, c'est ton authenticité : tu as un besoin viscéral d'être fidèle à toi-même, à tes valeurs et à ce que tu ressens vraiment, et tu ne peux ni faire semblant ni trahir ce qui compte pour toi sans en souffrir.

Ce qui te porte, c'est l'idéal et la beauté : tu gardes en toi la vision d'un monde plus beau, plus juste, plus tendre, et tu as ce don rare de créer du sens et de l'émotion là où d'autres ne voient rien. Ta profondeur émotionnelle te permet de ressentir intensément et de comprendre les autres presque intuitivement ; c'est la source de ta créativité comme de ton empathie. Parmi les trois façons d'être de ton type, tu es le plus tourné vers le ressenti et la beauté, le Poète. Cette même richesse intérieure peut parfois t'entraîner dans la rêverie et rendre plus difficile le côté concret du quotidien : ton plus beau terrain de croissance sera d'incarner tes rêves et tes valeurs dans le réel.`,

  "INFP-V2": `En tant que Médiateur (INFP), tu possèdes une imagination débordante et un monde intérieur d'une richesse inépuisable, peuplé d'idées, d'images, d'histoires et de possibles. Là où d'autres voient le monde tel qu'il est, toi tu le vois tel qu'il pourrait être : tu inventes, tu imagines, tu crées du neuf en permanence. Cette imagination, alliée à ta sensibilité, fait de toi une âme profondément artistique et originale. Parmi les trois façons d'être de ton type, tu es le Rêveur Créatif.

Ce qui te porte, c'est l'exploration de ton imaginaire et la quête de sens : tu te nourris de tes rêves et de tes idées, et tu cherches la signification profonde des choses. Derrière une réserve apparente se cache un univers foisonnant d'émotions et d'idées qui bouillonnent. Cette même richesse peut t'entraîner à rêver plus qu'à agir : ton plus beau terrain de croissance sera de donner forme à tes créations dans le réel.`,

  "INFP-V3": `En tant que Médiateur (INFP), tu possèdes la sensibilité profonde et la richesse intérieure de ta famille d'âme, mais tu les mets au service de causes et de valeurs qui te dépassent. Là où d'autres ressentent les injustices et en souffrent en silence, toi tu transformes cette sensibilité en action : tu veux défendre, protéger, faire advenir ce qui est juste. Parmi les trois façons d'être de ton type, tu es l'Idéaliste Engagé, le militant du cœur.

Ce qui te porte, c'est le sens et la quête de justice : tu as besoin que ta vie serve quelque chose qui compte, aligné avec tes valeurs profondes. Cette flamme, nourrie par une grande profondeur émotionnelle, fait de toi quelqu'un dont l'engagement est sincère et humain. Son revers, c'est qu'à force de porter le monde, tu peux t'épuiser : ton plus beau terrain de croissance sera d'apprendre à porter ta flamme sans t'y consumer.`,

  "ENFP-V1": `En tant qu'Inspirateur (ENFP), ton esprit ne tient pas en place : il bondit d'une possibilité à l'autre, relie des idées que personne n'aurait songé à rapprocher, et trouve de l'or là où les autres ne voient que du quotidien. Ce qui te définit avant tout, c'est ton rapport au possible : là où beaucoup voient des contraintes, tu vois des chemins, et là où d'autres voient un problème, tu vois dix solutions. Parmi les trois façons d'être de ton type, tu es l'Explorateur Enthousiaste, l'aventurier au grand cœur.

Mais derrière ton énergie solaire se cache une profondeur que peu perçoivent : des valeurs solides, une vraie empathie, une exigence d'authenticité. Tu n'es pas seulement quelqu'un qui s'amuse de tout, tu cherches du sens. Cette contradiction, léger en surface et profond en dessous, fait qu'on te sous-estime parfois, avant de découvrir qui tu es vraiment. Ton plus beau terrain de croissance sera de relier ta flamme à un peu de constance, pour faire advenir ce que tu rêves.`,
};

// Texte de la section « Traits » par TYPE (clé CODE) — commun aux 3 variantes,
// affiché sous les barres. On remplit au fur et à mesure.
const TRAITS_TEXTE: Record<string, string> = {
  INFP: `Ton esprit est tourné vers l'intérieur : tu passes une grande partie de ton temps à explorer ce que tu ressens, ce en quoi tu crois et ce qui donne du sens à ta vie. Cette attention à ton monde intérieur est une vraie force, elle nourrit ta lucidité et ta créativité, mais elle a aussi un revers : quand ce regard se retourne contre toi, il devient facile de trop te juger. Tu encaisses aussi mal la critique, et il t'arrive de te sentir incompris ou à fleur de peau là où d'autres passeraient sans y penser.

Pourtant, c'est justement cette profondeur qui fait ta valeur. Ta fidélité à tes idéaux et ta capacité à voir le meilleur chez les autres font de toi une présence rare, de celles qui rendent leur entourage un peu meilleur. Tout l'enjeu de ton chemin, c'est de relier ta riche vie intérieure aux exigences du quotidien : ancrer tes rêves dans le concret, et continuer d'apporter autour de toi un peu plus de beauté, de douceur et d'authenticité.`,

  ENFP: `Ton esprit est tourné vers l'extérieur et vers les possibles : tu puises ton énergie dans l'échange et le mouvement, et ton intuition file sans cesse vers ce qui pourrait être plutôt que vers ce qui est. Tu vois des chemins là où d'autres voient des contraintes, des solutions là où ils voient des problèmes. Cette curiosité et cet enthousiasme sont ta signature, portés par une vraie chaleur humaine.

Mais derrière ton énergie solaire se cache une profondeur que peu soupçonnent : des valeurs solides, une vraie empathie, une exigence d'authenticité qui guide tes choix. Tu navigues entre le cœur et la tête, chaleureux sans être naïf, lucide sans être froid. Tout l'enjeu de ton chemin, c'est de relier cette flamme à un peu de constance : apprendre à mener au bout ce qui compte, sans rien perdre de ta spontanéité ni de ta lumière.`,
};

// Section « Mindset & dév personnel » (clé CODE-Vx) : accroche gratuite + suite premium.
const MINDSET_TEXTE: Record<string, ProfilSection> = {
  "INFP-V1": {
    apercu: `Ton plus grand chantier n'est pas autour de toi, il est en toi. Tu portes une richesse intérieure immense, mais aussi une exigence qui peut se retourner contre toi : l'autocritique qui ronge, la rêverie qui éloigne du concret, la peur de te trahir. La bonne nouvelle, c'est que ces fragilités sont aussi tes plus grands leviers de croissance, à condition de savoir où appuyer.`,
  },
  "INFP-V2": {
    apercu: `Ton plus grand chantier n'est pas de trouver des idées, tu n'en manques jamais, c'est de leur donner vie. Tu portes en toi une imagination inépuisable, mais aussi une tendance à rêver plus qu'à agir, à te disperser, à fuir le réel dans ton monde intérieur. La bonne nouvelle, c'est que ces fragilités sont aussi tes plus grands leviers de croissance, à condition de savoir où appuyer.`,
  },
  "INFP-V3": {
    apercu: `Ton plus grand chantier n'est pas de trouver une cause, ton cœur en déborde, c'est d'apprendre à la porter sans t'y consumer. Tu portes en toi une flamme rare, mais aussi une tendance à t'épuiser, à te laisser submerger par les injustices, à te négliger pour les autres. La bonne nouvelle, c'est que ces fragilités sont aussi tes plus grands leviers de croissance, à condition de savoir où appuyer.`,
  },
  "ENFP-V1": {
    apercu: `Ton plus grand chantier n'est pas de trouver l'inspiration, elle déborde, c'est d'apprendre à la mener quelque part. Tu portes en toi une flamme et une créativité immenses, mais aussi une tendance à te disperser, à fuir le difficile, à t'oublier pour les autres. La bonne nouvelle, c'est que ces fragilités sont aussi tes plus grands leviers de croissance, à condition de savoir où appuyer.`,
  },
};

// Détail enrichi d'une GRANDE section (relations, carriere, developpement),
// façon 16P : encart « traits influents » (teaser verrouillé) + forces/ombres
// (gratuit) + encarts premium (super-pouvoirs, risques…). Clé CODE-Vx-section.
export interface SectionDetail {
  traitsInfluents?: { nom: string; texte: string }[]; // teaser verrouillé (pas de score)
  forces?: { titre: string; texte: string; accent?: string }[];
  ombres?: { titre: string; texte: string; accent?: string }[];
  blocs?: { titre?: string; ton: "positif" | "negatif"; items: string[] }[]; // paires (titre injecté par le template)
  compatibilites?: {
    titre?: string;
    ton: "positif" | "negatif";
    items: string[];
    profils: { code?: string; nom?: string; raison: string }[];
    panelTitre?: string;
  }[]; // titre + panelTitre injectés par le template
  premiums?: { titre: string; sousTitre: string }[]; // encarts verrouillés
  paradoxe?: { tension: string; lumiere: string; ombre: string; bascule: string };
  evolution?: string; // « Comment tu évolues »
  etapes?: string[]; // frise des âges : 4 textes (labels Enfance→Ancien injectés par le template)
  leviersForts?: { titre: string; texte: string }[]; // « Tes leviers forts » — colonne positive
  questions?: { situation: string; question: string }[]; // Bloc C — questions à se poser
  motRoute?: string; // « Un mot pour la route » (clôture)
}

const SECTION_DETAIL: Record<string, SectionDetail> = {
  "ENFP-V1-relations": {
    forces: [
      { titre: "Une présence qui fait vibrer", accent: "vibrer", texte: "Avec toi, le quotidien s'illumine : tu transformes les moments ordinaires en souvenirs." },
      { titre: "Une écoute chaleureuse", accent: "écoute", texte: "Ta curiosité sincère pour les gens les met à l'aise et ouvre les cœurs." },
      { titre: "Le don de valoriser", accent: "valoriser", texte: "Tu fais sentir à l'autre qu'il est unique, intéressant, choisi." },
      { titre: "Un équilibre cœur-raison", accent: "équilibre", texte: "Tu ressens intensément mais sais aussi prendre du recul et désamorcer les tensions." },
      { titre: "Une loyauté généreuse", accent: "loyauté", texte: "Fidèle et présent, tu donnes ton temps et ton énergie à ceux que tu aimes." },
      { titre: "Une âme fédératrice", accent: "fédératrice", texte: "Tu es souvent le moteur du groupe, celui qui rassemble et crée les occasions." },
    ],
    ombres: [
      { titre: "La peur de la routine", accent: "routine", texte: "Ton goût du neuf peut te faire craindre l'installation et la profondeur durable." },
      { titre: "La surinterprétation", accent: "surinterprétation", texte: "Ta sensibilité au rejet peut te faire lire trop de choses dans un mot ou un silence." },
      { titre: "L'évitement du conflit", accent: "conflit", texte: "Tu peux fuir les sujets qui fâchent pour préserver l'harmonie." },
      { titre: "Le don de soi épuisant", accent: "don de soi", texte: "Tu portes les autres au point de t'épuiser et d'oublier de recevoir." },
      { titre: "Le mal à dire non", accent: "non", texte: "Ton besoin de plaire te fait trop t'engager, jusqu'à te déborder." },
      { titre: "Une attente d'intensité", accent: "intensité", texte: "Tu peux attendre de la relation une vibration constante que le quotidien ne donne pas toujours." },
    ],
    blocs: [
      {
        ton: "negatif",
        items: [
          "La routine figée, sans projet ni surprise.",
          "Les relations tièdes, sans profondeur ni partage vrai.",
          "Le contrôle et la jalousie qui rognent ta liberté.",
          "Les personnes fermées à la nouveauté et au sens.",
          "Les jugements durs qui touchent ta sensibilité.",
        ],
      },
      {
        ton: "positif",
        items: [
          "Des liens où l'on peut tout partager, rires et questions profondes.",
          "Un partenaire qui te suit dans tes élans et t'offre un ancrage.",
          "De la liberté et de la confiance.",
          "Des valeurs et une quête de sens partagées.",
          "De la nouveauté et des projets à vivre à deux.",
        ],
      },
    ],
    compatibilites: [
      {
        ton: "negatif",
        items: [
          "Les tempéraments très rigides, attachés aux règles et à la routine.",
          "Les profils froids ou peu expressifs émotionnellement.",
          "Les personnalités contrôlantes qui rognent ta liberté.",
        ],
        profils: [
          { code: "ISTJ", raison: "son attachement à la routine et aux règles peut t'étouffer." },
          { code: "ESTJ", raison: "son côté directif et rigide entre en friction avec ton besoin de liberté." },
          { code: "ISTP", raison: "sa réserve émotionnelle peut te laisser sur ta faim affective." },
        ],
      },
      {
        ton: "positif",
        items: [
          "Les esprits structurés et visionnaires qui ancrent tes rêves dans le réel.",
          "Les tempéraments chaleureux et intuitifs qui partagent ta longueur d'onde.",
          "Ceux qui apprécient ta profondeur autant que ta légèreté.",
        ],
        profils: [
          { code: "INFJ", raison: "il partage ta quête de sens et apporte la profondeur et la constance qui t'équilibrent." },
          { code: "INTJ", raison: "sa structure et sa vision ancrent tes idées et transforment tes rêves en réalisations." },
          { code: "ENFP", raison: "même longueur d'onde, enthousiasme et valeurs partagés, à condition que quelqu'un tienne le gouvernail." },
        ],
      },
    ],
    paradoxe: {
      tension:
        "Tu rêves d'une connexion intense et vivante,\nmais l'intensité que tu cherches s'use si la relation devient routine.",
      lumiere:
        "Ta chaleur, ta fantaisie et ta façon de voir l'autre comme unique font de toi un partenaire et un ami rares, auprès de qui on se sent vivant.",
      ombre:
        "Mais à craindre la routine, à fuir le conflit et à trop te donner, tu peux fragiliser les liens que tu chéris le plus.",
      bascule:
        "Le jour où tu découvres que la profondeur d'un lien durable est une aventure en soi, ta chaleur trouve enfin où s'enraciner.",
    },
  },
  "ENFP-V1-carriere": {
    forces: [
      { titre: "Une étincelle qui démarre", accent: "étincelle", texte: "Tu vois l'opportunité, tu lances les idées et tu embarques les autres." },
      { titre: "Une créativité féconde", accent: "créativité", texte: "Tu imagines ce qui n'existe pas encore et trouves des angles neufs sur les vieux problèmes." },
      { titre: "Un moteur, le sens", accent: "sens", texte: "Pour une cause qui te tient à cœur, tu abats un travail colossal." },
      { titre: "Un don pour fédérer", accent: "fédérer", texte: "Tu connectes les gens, tu inspires et tu redonnes de l'énergie à une équipe." },
      { titre: "Une vraie adaptabilité", accent: "adaptabilité", texte: "Tu navigues dans l'incertitude et saisis les occasions avec aisance." },
      { titre: "Une intuition des possibles", accent: "intuition", texte: "Tu perçois le potentiel des situations et des gens avant les autres." },
    ],
    ombres: [
      { titre: "Le suivi qui ennuie", accent: "suivi", texte: "Tu démarres fort, mais le travail patient et répétitif fait chuter ton énergie." },
      { titre: "La dispersion", accent: "dispersion", texte: "Tu peux mener mille projets de front et n'en finir que peu." },
      { titre: "Du mal à t'organiser", accent: "organiser", texte: "Plannings, échéances et méthode ne te viennent pas naturellement." },
      { titre: "Une indécision", accent: "indécision", texte: "Tu vois tant d'options que t'engager sur une seule te coûte." },
      { titre: "Une sensibilité à la critique", accent: "critique", texte: "Un retour négatif peut te toucher plus fort que tu ne le montres." },
      { titre: "Un rapport flou à l'argent", accent: "argent", texte: "Plus émotionnel que stratégique, tu gères mal le long terme." },
    ],
    blocs: [
      {
        ton: "negatif",
        items: [
          "La routine et les tâches répétitives.",
          "Le micro-management et la surveillance.",
          "Les procédures rigides et la conformité.",
          "Un travail vide de sens, même bien payé.",
          "Les environnements impersonnels et froids.",
        ],
      },
      {
        ton: "positif",
        items: [
          "La liberté et l'autonomie.",
          "La variété, les projets et les défis nouveaux.",
          "Un travail porteur de sens et de valeurs.",
          "Le contact humain et le travail d'équipe.",
          "Pouvoir créer, lancer, inspirer.",
        ],
      },
    ],
    compatibilites: [
      {
        ton: "negatif",
        items: [
          "Les postes routiniers et très procéduraux.",
          "Les environnements rigides et hiérarchiques.",
          "Le travail isolé et sans contact humain.",
        ],
        profils: [
          { nom: "Saisie, contrôle, procédures", raison: "la routine et la rigidité éteignent ta flamme." },
          { nom: "Postes très hiérarchiques", raison: "le manque de liberté et la surveillance t'asphyxient." },
          { nom: "Travail solitaire et répétitif", raison: "ni contact humain ni nouveauté pour te nourrir." },
        ],
      },
      {
        ton: "positif",
        items: [
          "La communication, le marketing, la création.",
          "L'accompagnement humain et la formation.",
          "L'entrepreneuriat et l'innovation.",
        ],
        profils: [
          { nom: "Communication & création", raison: "journaliste, créatif, communicant : lancer des idées et inspirer." },
          { nom: "Accompagnement humain", raison: "coach, formateur, RH : révéler le potentiel des gens." },
          { nom: "Entrepreneuriat & projets", raison: "lancer, fédérer, explorer : épouser ta soif de nouveau." },
        ],
      },
    ],
    paradoxe: {
      tension:
        "Tu démarres les choses avec une énergie rare,\nmais le long travail du suivi peut éteindre ta flamme avant la fin.",
      lumiere:
        "Créatif, fédérateur et porté par le sens, tu es l'étincelle qui lance les projets et donne aux autres l'envie d'y croire.",
      ombre:
        "Mais ta dispersion, ta difficulté à finir et à t'organiser peuvent laisser tes meilleures idées en chantier.",
      bascule:
        "Le jour où tu mènes au bout ce qui compte, ou que tu t'entoures de qui assure la constance, tu passes de l'étincelle au créateur qui accomplit.",
    },
  },
  "ENFP-V1-developpement": {
    evolution: `Ta personnalité n'est pas figée : elle mûrit, et ton type a une trajectoire de croissance particulièrement belle. Jeune, tu es tout entier dans ta flamme : l'enthousiasme, les idées, l'exploration tous azimuts. C'est lumineux, mais souvent dispersé : tu commences beaucoup, tu finis peu, et tu vis intensément l'instant.

Avec le temps, tu développes quelque chose de précieux : la capacité à concrétiser. Tu apprends que tes plus belles idées ne valent que si tu les mènes quelque part, et tu transformes peu à peu ta vision en réalisations, sans rien perdre de ta flamme. Plus tard encore, tu développes ton ancrage, un rapport plus apaisé au présent et à la constance. Dans ta pleine maturité, tu es un explorateur qui a appris à construire, un rêveur qui réalise, un cœur généreux qui sait aussi se protéger. Et c'est entièrement à ta portée.`,
    etapes: [
      "Curieux de tout, tu touches à tout, tu poses mille questions et tu t'enflammes pour une idée en une soirée. Le monde est un immense terrain de jeu plein de possibles.",
      "Ta flamme est à son comble : tu explores tous azimuts, plein d'idées et d'élans. C'est lumineux, mais souvent dispersé : tu commences beaucoup, tu finis peu, et canaliser ton énergie ne va pas encore de soi.",
      "Tu comprends que tes idées ne valent que menées quelque part. Tu apprends à finir ce qui compte, à t'organiser un peu, à transformer ta vision en réalisations, sans perdre ta flamme.",
      "Dans ta pleine maturité, tu es un explorateur qui sait aussi construire. Tu as gardé ta chaleur et ta créativité, mais tu sais désormais en faire quelque chose de réel et durable : la version la plus accomplie de toi.",
    ],
    leviersForts: [
      { titre: "Mène une idée jusqu'au bout", texte: "Tu ne manqueras jamais d'idées. Choisis-en une qui compte vraiment et achève-la : la satisfaction d'accomplir te prouvera de quoi tu es capable." },
      { titre: "Fais de ton enthousiasme un moteur", texte: "Ton énergie est contagieuse : dirige-la vers ce qui a du sens pour toi, et elle entraîne les autres et fait avancer les choses." },
      { titre: "Entoure-toi de complémentaires", texte: "Tu n'as pas à devenir bon dans ce que tu n'aimes pas. Associe-toi à ceux qui apportent la constance, et vous transformez la vision en réalité." },
      { titre: "Honore ta profondeur", texte: "Tu n'es pas qu'une belle énergie de surface. Donne de la place à tes valeurs et à ta quête de sens : c'est là qu'est ta vraie boussole." },
    ],
    questions: [
      { situation: "Quand une nouvelle idée t'emballe", question: "Est-ce que je vais la mener quelque part, ou juste l'ajouter à la pile de mes débuts ?" },
      { situation: "Quand une situation devient pesante", question: "Est-ce que je fuis vers du neuf, ou est-ce vraiment le moment de partir ?" },
      { situation: "Quand tu dis oui à tout", question: "Est-ce que je m'engage par envie, ou par peur de décevoir ?" },
      { situation: "Quand une critique te blesse", question: "Est-ce un vrai problème, ou un simple désaccord que j'amplifie ?" },
      { situation: "Quand tu te donnes pour tout le monde", question: "Est-ce que je garde aussi ma flamme allumée pour moi ?" },
    ],
    paradoxe: {
      tension:
        "Pour réaliser ce que tu rêves, tu dois t'imposer un peu de constance,\nmais tu crains qu'en te structurant, tu éteignes ta liberté.",
      lumiere:
        "Ton imagination, ta chaleur et ton énergie sont une force rare : tu as déjà tout ce qu'il faut pour faire advenir de grandes choses.",
      ombre:
        "Mais sans jamais finir ni t'ancrer, ta flamme se disperse et tes plus beaux élans restent sans suite.",
      bascule:
        "Le jour où tu vois la constance non comme une prison mais comme ce qui libère ta créativité, ta vision rencontre enfin ta capacité à réaliser.",
    },
  },
  "INFP-V3-relations": {
    forces: [
      { titre: "Une loyauté profonde", accent: "loyauté", texte: "Une fois engagé, tu offres une fidélité sincère et un soutien indéfectible." },
      { titre: "Le partage de valeurs", accent: "valeurs", texte: "Tu construis des liens fondés sur le sens et des convictions communes." },
      { titre: "Une empathie sincère", accent: "empathie", texte: "Tu te soucies vraiment des autres et tu ressens ce qu'ils vivent." },
      { titre: "Un soutien indéfectible", accent: "soutien", texte: "Tu défends tes proches et leurs causes avec cœur, sans te dérober." },
      { titre: "Une présence qui a du sens", accent: "sens", texte: "Avec toi, les liens touchent au vrai et à ce qui compte vraiment." },
      { titre: "Une intégrité rassurante", accent: "intégrité", texte: "On sait que tu agis par conviction, jamais par calcul, et cela inspire confiance." },
    ],
    ombres: [
      { titre: "La relation négligée", accent: "négligée", texte: "Absorbé par tes causes, tu peux délaisser le lien et ceux qui te sont proches." },
      { titre: "Le don de soi épuisant", accent: "don de soi", texte: "Tu portes les soucis des autres comme les tiens, jusqu'à t'oublier toi-même." },
      { titre: "Des attentes idéalisées", accent: "idéalisées", texte: "Ton idéalisme peut te faire attendre beaucoup de l'autre et de la relation." },
      { titre: "Une grande vulnérabilité", accent: "vulnérabilité", texte: "Tu vis les tensions intensément et une critique peut te toucher longtemps." },
      { titre: "Des besoins tus", accent: "besoins", texte: "Ta réserve peut te faire garder tes peines pour toi et taire ce dont tu as besoin." },
      { titre: "Le risque d'épuisement", accent: "épuisement", texte: "À trop porter celles et ceux que tu aimes, tu peux te vider de ton énergie." },
    ],
    blocs: [
      {
        ton: "negatif",
        items: [
          "Les personnes dont les valeurs heurtent profondément les tiennes.",
          "Le cynisme et l'indifférence aux autres.",
          "Les liens de surface, sans sens ni profondeur.",
          "Les relations qui te demandent de te trahir.",
          "Les rapports de force et l'agressivité.",
        ],
      },
      {
        ton: "positif",
        items: [
          "Des liens fondés sur des valeurs partagées.",
          "Des personnes qui soutiennent ton engagement au lieu de le concurrencer.",
          "De la sincérité, de la profondeur et du sens.",
          "Quelqu'un qui prend soin de toi quand tu te donnes trop.",
          "Le respect mutuel et la bienveillance.",
        ],
      },
    ],
    compatibilites: [
      {
        ton: "negatif",
        items: [
          "Les profils cyniques ou indifférents aux questions de justice.",
          "Les tempéraments très pragmatiques, peu sensibles aux valeurs.",
          "Les personnalités dures ou détachées émotionnellement.",
        ],
        profils: [
          { code: "ESTP", raison: "son pragmatisme détaché peut te sembler insensible à ce qui te révolte." },
          { code: "ESTJ", raison: "son attachement aux règles plus qu'aux valeurs peut te heurter." },
          { code: "ENTP", raison: "son goût du débat pour le débat peut sembler cynique face à tes convictions." },
        ],
      },
      {
        ton: "positif",
        items: [
          "Les profils intuitifs et sensibles qui partagent ta quête de sens.",
          "Les tempéraments chaleureux qui t'allègent et te ramènent à la légèreté.",
          "Les esprits organisés qui t'aident à rendre ton engagement efficace.",
        ],
        profils: [
          { code: "INFJ", raison: "il partage ta profondeur, ta quête de sens et ton désir d'un monde meilleur." },
          { code: "ENFJ", raison: "sa chaleur et son sens de l'action soutiennent ta flamme sans t'épuiser." },
          { code: "ENFP", raison: "son enthousiasme et ses valeurs te rejoignent et t'apportent de la légèreté." },
        ],
      },
    ],
    paradoxe: {
      tension:
        "Tu donnes énormément à ceux que tu aimes,\nmais à trop te donner, tu risques de t'oublier et de t'épuiser.",
      lumiere:
        "Ta loyauté, ta sincérité et ton souci des autres font de toi un proche profond et fidèle, sur qui on peut compter.",
      ombre:
        "Mais à négliger la relation pour tes causes, à porter tout le monde et à taire tes besoins, tu t'exposes à l'épuisement et à la distance.",
      bascule:
        "Le jour où tu prends soin de toi autant que des autres et où tu honores tes propres besoins, tes liens deviennent à la fois profonds et soutenables.",
    },
  },
  "INFP-V3-carriere": {
    forces: [
      { titre: "Un moteur, le sens", accent: "sens", texte: "Quand ton travail sert une cause, tu te donnes sans compter et tu accomplis des choses qui comptent." },
      { titre: "Une vraie humanité", accent: "humanité", texte: "Tu apportes une attention aux gens que les esprits purement fonctionnels n'ont pas." },
      { titre: "Des convictions solides", accent: "convictions", texte: "Ton ancrage moral guide ton travail et inspire confiance et respect." },
      { titre: "Un engagement sincère", accent: "engagement", texte: "Quand une mission te touche, tu t'investis avec une profondeur rare." },
      { titre: "Une intuition des enjeux", accent: "intuition", texte: "Tu perçois ce qui compte vraiment et ce qui pourrait être plus juste." },
      { titre: "Une détermination durable", accent: "détermination", texte: "Sous ta douceur, une ténacité qui te fait tenir au service de ce qui compte." },
    ],
    ombres: [
      { titre: "Le risque d'épuisement", accent: "épuisement", texte: "Tu peux te donner jusqu'à te consumer pour tes causes et tes missions." },
      { titre: "La submersion émotionnelle", accent: "submersion", texte: "La difficulté des situations peut te peser et t'accabler profondément." },
      { titre: "Un manque de structure", accent: "structure", texte: "Beaucoup de cœur, mais une difficulté à organiser et à rendre ton action efficace." },
      { titre: "Le rejet du compromis", accent: "compromis", texte: "Ton idéalisme peut te faire refuser des options réalistes mais imparfaites." },
      { titre: "Une sensibilité aux ambiances", accent: "ambiances", texte: "Le cynisme, les compromis moraux et les conflits te démotivent profondément." },
      { titre: "Un rapport méfiant à l'argent", accent: "argent", texte: "L'argent te motive peu, et tu peux t'en méfier quand il heurte tes idéaux." },
    ],
    blocs: [
      {
        ton: "negatif",
        items: [
          "Le travail vide de sens, purement lucratif.",
          "Les compromis moraux et le cynisme ambiant.",
          "Les environnements contraires à tes valeurs.",
          "Les ambiances agressives et les rapports de force.",
          "Le manque d'autonomie et de mission.",
        ],
      },
      {
        ton: "positif",
        items: [
          "Un travail aligné avec tes valeurs et porteur de sens.",
          "Le sentiment de servir une cause plus grande que toi.",
          "De l'autonomie et un environnement bienveillant.",
          "Pouvoir aider, défendre, transmettre.",
          "Le respect de qui tu es.",
        ],
      },
    ],
    compatibilites: [
      {
        ton: "negatif",
        items: [
          "Les milieux purement lucratifs et cyniques.",
          "Les environnements contraires à tes valeurs.",
          "Les postes sans autonomie ni mission.",
        ],
        profils: [
          { nom: "Vente sous pression, finance pure", raison: "le profit au mépris du sens et des gens." },
          { nom: "Environnements cyniques", raison: "des compromis moraux qui te dégoûtent." },
          { nom: "Postes rigides et impersonnels", raison: "aucune place pour la mission ni l'humain." },
        ],
      },
      {
        ton: "positif",
        items: [
          "Les métiers de l'aide, du soin et de l'humain.",
          "L'engagement social, humanitaire, environnemental.",
          "Tout ce qui défend une cause et a un impact.",
        ],
        profils: [
          { nom: "Aide & soin", raison: "travailleur social, soignant, éducateur : accompagner et protéger." },
          { nom: "Causes & ONG", raison: "associatif, humanitaire, environnement : servir ce qui est juste." },
          { nom: "Plaidoyer & écriture engagée", raison: "défendre des causes par les mots et l'action." },
        ],
      },
    ],
    paradoxe: {
      tension:
        "Tu veux que ton travail change les choses,\nmais à te donner sans compter, tu risques de t'épuiser avant d'y parvenir.",
      lumiere:
        "Porté par le sens et tes convictions, tu t'investis avec une sincérité et une humanité rares dans ce qui compte vraiment.",
      ombre:
        "Mais l'épuisement, la submersion et le manque de structure peuvent miner ton impact et ta flamme.",
      bascule:
        "Le jour où tu organises ton engagement, choisis tes combats et te préserves, ta belle flamme se transforme en impact réel et durable.",
    },
  },
  "INFP-V3-developpement": {
    evolution: `Ta personnalité n'est pas figée : elle mûrit, et ton type suit une trajectoire de croissance particulièrement marquée. Jeune, tu es tout entier dans ta sensibilité et ton engagement : ressentir les injustices, te révolter, vouloir réparer le monde. C'est beau et généreux, mais tu portes beaucoup, parfois trop, et ta flamme peut te consumer.

Avec le temps, tu comprends que tu ne changes durablement les choses qu'en te préservant, que le monde avance à son rythme, et que ton engagement gagne en impact quand il est organisé et choisi. Tu apprends à prendre soin de toi, à agir sans te laisser submerger, à composer avec le réel, sans rien perdre de tes convictions. Dans ta pleine maturité, tu deviens un idéaliste qui œuvre pour ce qui est juste sans s'y consumer : ta flamme devient une lumière durable. Et c'est entièrement à ta portée.`,
    etapes: [
      "Tu ressens déjà très fort ce qui est juste et ce qui ne l'est pas. Sensible à la peine des autres, tu prends spontanément la défense des plus faibles, le cœur déjà tourné vers les autres.",
      "Ta sensibilité se fait engagement : tu te révoltes contre les injustices, tu défends tes valeurs avec ferveur. C'est généreux, mais tu portes beaucoup, parfois trop, et ta flamme peut t'épuiser. Une période intense, où ton élan cherche encore sa juste mesure.",
      "Tu comprends que pour durer, il faut te préserver et choisir tes combats. Tu apprends à structurer ton action et à composer avec le réel, sans rien perdre de tes convictions.",
      "Dans ta pleine maturité, tu œuvres pour ce qui est juste sans t'y consumer. Ta flamme est devenue une lumière durable qui éclaire et transforme : la version la plus accomplie de toi.",
    ],
    leviersForts: [
      { titre: "Fais de tes valeurs une boussole", texte: "Ton sens du juste est une force rare. Laisse-le guider tes choix et tes combats, c'est ce qui donne à ta vie sa cohérence et son poids." },
      { titre: "Transforme ton empathie en action", texte: "Ta sensibilité aux autres est un moteur précieux. Dirige-la vers ce que tu peux concrètement changer, et elle devient une force qui répare au lieu d'un poids qui accable." },
      { titre: "Prends soin de toi pour durer", texte: "Te ménager n'est pas trahir ta mission, c'est ce qui te permet de la porter longtemps. Un engagement qui dure transforme plus le monde qu'une flamme qui s'éteint." },
      { titre: "Donne de la méthode à ta flamme", texte: "Priorise tes combats et organise ton action : la conviction alliée à un peu de structure a infiniment plus d'impact que la seule générosité du cœur." },
    ],
    questions: [
      { situation: "Quand une injustice t'accable", question: "Sur quoi, ici, ai-je vraiment le pouvoir d'agir ?" },
      { situation: "Quand tu te donnes sans compter", question: "Est-ce que je prends autant soin de moi que des autres ?" },
      { situation: "Quand le monde ne change pas assez vite", question: "Est-ce que j'exige du réel une perfection que rien ne peut atteindre ?" },
      { situation: "Quand quelqu'un ne partage pas tes convictions", question: "Suis-je en train de juger, ou de chercher à comprendre ?" },
      { situation: "Quand tu te sens vidé", question: "De quel repos ou de quel soutien ai-je besoin, là, maintenant ?" },
    ],
    paradoxe: {
      tension:
        "Pour changer le monde, tu dois t'y engager pleinement,\nmais à te donner sans limite, tu risques de t'éteindre avant d'avoir agi.",
      lumiere:
        "Ta flamme et tes convictions sont une force rare : tu as déjà en toi tout ce qu'il faut pour rendre le monde un peu plus juste.",
      ombre:
        "Mais sans te préserver ni choisir tes combats, cette même flamme peut te consumer et réduire ton impact à néant.",
      bascule:
        "Le jour où tu apprends à porter ta flamme sans t'y brûler, ton engagement devient une lumière qui dure et qui transforme vraiment.",
    },
  },
  "INFP-V2-relations": {
    forces: [
      { titre: "Une présence imaginative", accent: "imaginative", texte: "Tu places l'autre au centre d'un monde intérieur riche, vu avec une tendresse et une originalité rares." },
      { titre: "Une vraie authenticité", accent: "authenticité", texte: "Tu cherches des liens vrais, sans masque, où chacun peut être pleinement soi." },
      { titre: "Une écoute sensible", accent: "écoute", texte: "Ta finesse émotionnelle te fait percevoir ce que l'autre vit au-delà des mots." },
      { titre: "Des échanges qui stimulent", accent: "stimulent", texte: "Avec toi, les conversations partent dans des directions inattendues et nourrissantes." },
      { titre: "Une loyauté tendre", accent: "loyauté", texte: "Une fois engagé, tu offres une fidélité sincère et une attention délicate à l'autre." },
      { titre: "Le goût des liens singuliers", accent: "singuliers", texte: "Tu préfères quelques amitiés profondes à un large cercle de surface." },
    ],
    ombres: [
      { titre: "L'idéalisation de l'autre", accent: "idéalisation", texte: "Ton imagination peut te faire aimer une image idéale, puis te décevoir face à la personne réelle." },
      { titre: "Le quotidien négligé", accent: "quotidien", texte: "À rêver la relation, tu peux oublier le concret du lien au jour le jour." },
      { titre: "Des besoins tus", accent: "besoins", texte: "Ta difficulté à t'affirmer peut te faire taire ce dont tu as vraiment besoin." },
      { titre: "Une grande vulnérabilité", accent: "vulnérabilité", texte: "Une critique ou une tension peut te toucher fort et longtemps." },
      { titre: "Le repli dans l'imaginaire", accent: "repli", texte: "Ton besoin de solitude et de rêverie peut te faire négliger l'entretien des liens." },
      { titre: "Le risque de distance", accent: "distance", texte: "Plongé dans ton monde, tu peux sembler absent ou distant sans le vouloir." },
    ],
    blocs: [
      {
        ton: "negatif",
        items: [
          "Les relations qui veulent te faire rentrer dans un moule.",
          "Les liens de surface, sans sens ni profondeur.",
          "Les personnes qui jugent ta sensibilité ou ta créativité.",
          "Le manque d'espace et de liberté.",
          "Les conflits durs et l'agressivité.",
        ],
      },
      {
        ton: "positif",
        items: [
          "Des liens vrais où tu peux partager ton monde intérieur.",
          "Des personnes qui chérissent ta créativité et ta singularité.",
          "De l'espace et de la liberté pour te ressourcer.",
          "Une communication douce et authentique.",
          "Une quête de sens partagée.",
        ],
      },
    ],
    compatibilites: [
      {
        ton: "negatif",
        items: [
          "Les profils très rationnels ou terre-à-terre, peu sensibles à l'imaginaire.",
          "Les tempéraments rigides, attachés aux conventions.",
          "Les personnalités directes dont la franchise peut te blesser.",
        ],
        profils: [
          { code: "ESTJ", raison: "sa rigueur et son attachement aux règles peuvent étouffer ta créativité." },
          { code: "ISTJ", raison: "son côté procédurier et terre-à-terre cadre mal avec ton imaginaire." },
          { code: "ESTP", raison: "son pragmatisme direct te paraît parfois insensible à ton monde intérieur." },
        ],
      },
      {
        ton: "positif",
        items: [
          "Les profils intuitifs et créatifs qui partagent ton imaginaire.",
          "Les tempéraments chaleureux qui t'aident à exprimer tes émotions.",
          "Les esprits organisés qui t'aident à concrétiser tes idées.",
        ],
        profils: [
          { code: "ENFP", raison: "son enthousiasme et son imaginaire résonnent avec ton monde créatif." },
          { code: "INFJ", raison: "il partage ta profondeur, ton intuition et ta quête de sens." },
          { code: "ENFJ", raison: "sa chaleur t'aide à exprimer et à incarner ce que tu inventes." },
        ],
      },
    ],
    paradoxe: {
      tension:
        "Tu rêves d'un amour unique et profond,\nmais à aimer l'image que tu t'en fais, tu risques de manquer la personne réelle.",
      lumiere:
        "Ton imagination et ta tendresse font de toi quelqu'un qui aime d'une façon rare, qui place l'autre au cœur d'un monde intérieur riche.",
      ombre:
        "Mais à idéaliser, à négliger le quotidien et à taire tes besoins, tu t'exposes à la déception et au malentendu.",
      bascule:
        "Le jour où tu aimes la personne réelle, imparfaite et vivante, plus que l'image rêvée, tu construis enfin le lien vrai dont tu rêves.",
    },
  },
  "INFP-V2-carriere": {
    forces: [
      { titre: "Une créativité d'exception", accent: "créativité", texte: "Tu apportes une originalité et une inventivité que les esprits purement fonctionnels n'ont pas." },
      { titre: "Une mine d'idées", accent: "idées", texte: "Tu ne manques jamais de pistes, de concepts, de possibilités neuves." },
      { titre: "Un moteur, le sens", accent: "sens", texte: "Quand ton travail résonne avec tes valeurs, tu donnes le meilleur de toi-même." },
      { titre: "Une vision originale", accent: "originale", texte: "Tu vois ce que personne n'imagine, et tu ouvres des voies inattendues." },
      { titre: "Une sensibilité créative", accent: "sensibilité", texte: "Tu mets de l'âme et de l'émotion dans ce que tu crées, ce qui touche les gens." },
      { titre: "Une belle adaptabilité", accent: "adaptabilité", texte: "Ton esprit ouvert s'empare du neuf et rebondit avec aisance." },
    ],
    ombres: [
      { titre: "Des idées non concrétisées", accent: "concrétisées", texte: "Tu peux avoir mille idées brillantes et n'en réaliser aucune." },
      { titre: "La dispersion", accent: "dispersion", texte: "Tu papillonnes d'un projet à l'autre sans toujours mener au bout." },
      { titre: "Du mal à structurer", accent: "structurer", texte: "Les plannings, le suivi et l'exécution laborieuse ne sont pas ton terrain naturel." },
      { titre: "Une indécision face aux possibles", accent: "indécision", texte: "Tant d'options séduisantes que tu peines à trancher et à t'engager." },
      { titre: "Une sensibilité à la pression", accent: "pression", texte: "Le cadre rigide, le micro-management et les délais brident ta créativité." },
      { titre: "Un rapport flou à l'argent", accent: "argent", texte: "L'argent te motive peu, et tu peux mal valoriser ce que tu crées." },
    ],
    blocs: [
      {
        ton: "negatif",
        items: [
          "L'exécution répétitive et le travail mécanique.",
          "Le formatage et les process rigides.",
          "Le micro-management qui bride ta liberté.",
          "Les environnements impersonnels ou dénués de sens.",
          "La pression et les délais qui tuent l'inspiration.",
        ],
      },
      {
        ton: "positif",
        items: [
          "La liberté de créer et d'explorer à ta façon.",
          "Un travail porteur de sens, aligné avec tes valeurs.",
          "De l'autonomie et de l'espace.",
          "Pouvoir inventer, imaginer et donner forme à l'original.",
          "Un environnement humain et stimulant.",
        ],
      },
    ],
    compatibilites: [
      {
        ton: "negatif",
        items: [
          "Les milieux formatés et purement techniques.",
          "Les postes d'exécution répétitive.",
          "Les structures rigides et très hiérarchiques.",
        ],
        profils: [
          { nom: "Saisie, exécution répétitive", raison: "des tâches mécaniques qui éteignent ton imaginaire." },
          { nom: "Process très normés", raison: "un cadre rigide qui bride ta créativité." },
          { nom: "Environnements ultra-hiérarchiques", raison: "peu de liberté pour inventer à ta façon." },
        ],
      },
      {
        ton: "positif",
        items: [
          "Les domaines créatifs et artistiques.",
          "La création de contenus et de récits.",
          "Tout ce qui demande d'inventer et d'imaginer.",
        ],
        profils: [
          { nom: "Écriture & récit", raison: "romancier, scénariste, concepteur : inventer des mondes." },
          { nom: "Arts & design", raison: "artiste, illustrateur, designer : donner forme à ton imaginaire." },
          { nom: "Création de contenu", raison: "vidéo, jeu, univers : exprimer ton originalité." },
        ],
      },
    ],
    paradoxe: {
      tension:
        "Tes idées pourraient changer les choses,\nmais sans en finir aucune, elles risquent de rester de simples idées.",
      lumiere:
        "Porté par l'inspiration et le sens, tu inventes avec une originalité et une âme rares, et tu vois des possibles que personne ne voit.",
      ombre:
        "Mais ta dispersion et ta difficulté à structurer et à concrétiser peuvent laisser tes plus belles idées sans suite.",
      bascule:
        "Le jour où tu choisis quelques idées et tu te donnes le cadre pour les mener au bout, ton imaginaire se transforme en œuvres reconnues.",
    },
  },
  "INFP-V2-developpement": {
    evolution: `Ta personnalité n'est pas figée : elle mûrit, et ton type suit une trajectoire de croissance particulièrement marquée. Jeune, tu vis tout entier dans ton imaginaire et ta sensibilité : rêver, inventer, créer dans ta tête. C'est riche et beau, mais ton potentiel créatif peine encore à s'incarner dans le monde.

Avec le temps, tu comprends qu'imaginer ne suffit pas, qu'il faut donner forme à tes rêves pour qu'ils existent et touchent les autres. Tu apprends à concrétiser, à finir, à t'ancrer dans le réel, sans rien perdre de ta créativité. Dans ta pleine maturité, tu deviens une âme créative qui sait aussi faire naître ses œuvres : ton imagination ne reste plus dans ta tête, elle rayonne dans le monde. Et c'est entièrement à ta portée.`,
    etapes: [
      "Ton imagination est déjà sans limites : tu inventes des histoires, des mondes, des jeux. Tu vis une partie de ton temps dans ta tête, sensible et rêveur, fasciné par tout ce qui pourrait être.",
      "Tu vis pleinement dans ton imaginaire et tes idées. Tout bouillonne, parfois trop : tu rêves plus que tu n'agis, tu passes d'une idée à l'autre, et concrétiser ne va pas encore de soi. Une période foisonnante, où ta créativité cherche encore sa forme.",
      "Tu comprends que tes idées ne demandent qu'à exister. Tu apprends à en choisir quelques-unes, à les mener au bout et à t'ancrer dans le réel, sans rien perdre de ton imaginaire.",
      "Dans ta pleine maturité, tu es une âme créative qui sait aussi faire naître ses œuvres. Ton imagination donne enfin des fruits dans le monde : la version la plus accomplie de toi.",
    ],
    leviersForts: [
      { titre: "Donne vie à une de tes idées", texte: "Tu ne manqueras jamais d'idées. Choisis-en une, une seule, et mène-la jusqu'au bout : la voir exister te procurera une fierté que la simple invention ne donne pas." },
      { titre: "Fais de ta sensibilité ta matière", texte: "Ta façon de ressentir le monde est une source d'inspiration rare. Transforme tes émotions en histoires, en images, en créations, c'est là que naît le plus beau de toi." },
      { titre: "Concentre ton imaginaire", texte: "Plutôt que d'effleurer mille pistes, choisis-en quelques-unes et approfondis-les. Mener peu de créations loin vaut mieux que d'en commencer beaucoup." },
      { titre: "Garde un pied dans le réel", texte: "Cultive un rapport simple au concret et à l'action, sans renoncer à tes rêves : c'est ce qui donne une prise à ton imagination et la fait exister." },
    ],
    questions: [
      { situation: "Quand une nouvelle idée t'emballe", question: "Est-ce que je vais vraiment lui donner vie, ou juste l'ajouter à la pile de mes rêves ?" },
      { situation: "Quand tu passes d'un projet à l'autre", question: "Lequel mérite que je le finisse avant d'en commencer un nouveau ?" },
      { situation: "Quand tu te réfugies dans ton imaginaire", question: "De quoi, dans le réel, suis-je en train de m'éloigner ?" },
      { situation: "Quand tu te trouves peu productif", question: "Est-ce que j'exigerais ça d'un artiste que j'admire ?" },
      { situation: "Quand une critique te blesse", question: "Est-ce mon travail qu'on critique, ou moi tout entier ?" },
    ],
    paradoxe: {
      tension:
        "Pour que tes créations existent, tu dois t'imposer un peu de cadre,\nmais tu crains qu'en te structurant, tu étouffes ton imaginaire.",
      lumiere:
        "Ton imagination est une source inépuisable : tu as déjà en toi tout ce qu'il faut pour créer des choses que personne d'autre n'inventerait.",
      ombre:
        "Mais sans jamais choisir ni finir, tes plus belles idées risquent de rester pour toujours à l'état de rêves.",
      bascule:
        "Le jour où tu vois la structure non comme une prison mais comme ce qui fait naître tes rêves, ton imaginaire se transforme enfin en œuvres.",
    },
  },
  "INFP-V1-relations": {
    forces: [
      { titre: "Une écoute du cœur", accent: "écoute", texte: "Ton empathie invite les autres à se confier ; auprès de toi, on se sent vraiment entendu." },
      { titre: "Des liens profonds", accent: "profonds", texte: "Tu crées des relations vraies, fondées sur la confiance et la vulnérabilité partagée." },
      { titre: "Une loyauté tendre", accent: "loyauté", texte: "Une fois engagé, tu offres une fidélité profonde et une attention délicate à l'autre." },
      { titre: "Une présence qui sécurise", accent: "présence", texte: "Tu sais créer des espaces sûrs où chacun peut être soi, sans masque ni jugement." },
      { titre: "Une finesse émotionnelle", accent: "finesse", texte: "Tu perçois ce que les autres ressentent au-delà des mots et des apparences." },
      { titre: "Le respect des singularités", accent: "respect", texte: "Tu chéris l'autre dans sa différence, sans jamais chercher à le changer." },
    ],
    ombres: [
      { titre: "La fuite du conflit", accent: "fuite", texte: "Pour préserver l'harmonie, tu peux taire ce qui ne te va pas, jusqu'à t'oublier toi-même." },
      { titre: "L'idéalisation des relations", accent: "idéalisation", texte: "Tu attends parfois trop d'une relation, ce qui t'expose à la déception et à l'éloignement." },
      { titre: "Des besoins négligés", accent: "besoins", texte: "Tu négliges ou tu exprimes mal tes propres besoins émotionnels." },
      { titre: "Une distance soudaine", accent: "distance", texte: "Le trop-plein d'émotion peut te faire prendre tes distances sans prévenir." },
      { titre: "Une grande vulnérabilité", accent: "vulnérabilité", texte: "Une critique ou un malentendu peut te toucher bien plus longtemps que prévu." },
      { titre: "Le rôle de confident", accent: "confident", texte: "Ta pudeur peut te faire garder tes peines pour toi, dans le rôle de celui qui écoute sans se livrer." },
    ],
    blocs: [
      {
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
        ton: "negatif",
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
        ton: "positif",
        items: [
          "Les domaines créatifs et artistiques.",
          "Les métiers de l'aide, du soin et du conseil.",
          "Tout ce qui a du sens et défend une cause.",
        ],
        profils: [
          { nom: "Création & écriture", raison: "romancier, scénariste, artiste, designer : exprimer ta sensibilité." },
          { nom: "Aide & soin", raison: "psychologue, art-thérapeute, travailleur social : accompagner les autres." },
          { nom: "Transmission", raison: "enseignant, formateur, coach : partager ce qui te passionne." },
        ],
      },
    ],
    paradoxe: {
      tension:
        "Ta créativité peut produire des choses magnifiques,\nmais sans un peu de cadre, elle risque de ne jamais voir le jour.",
      lumiere:
        "Porté par le sens et l'inspiration, tu crées avec une profondeur et une humanité rares, et tu donnes le meilleur quand ton cœur est pleinement engagé.",
      ombre:
        "Mais si tu peines à te vendre, à supporter la pression et à défendre tes intérêts, ton talent peut rester dans l'ombre et profiter à des esprits moins inspirés que toi.",
      bascule:
        "Le jour où tu te donnes juste assez de cadre pour finir ce que tu commences et défendre ta valeur, ton potentiel se transforme en réalisations reconnues.",
    },
  },
  "INFP-V1-developpement": {
    evolution: `Ta personnalité n'est pas figée : elle mûrit, et ton type suit une trajectoire de croissance particulièrement marquée. Jeune, tu vis tout entier dans ta sensibilité et ton monde intérieur, c'est riche, mais souvent déséquilibré : tu peux être submergé par tes émotions, te réfugier dans le rêve, et peiner à t'affirmer.

Avec le temps, tu comprends qu'une richesse intérieure qui ne s'incarne pas reste stérile. Tu apprends à concrétiser, à te protéger, à t'affirmer, sans rien perdre de ta sensibilité. Dans ta pleine maturité, tu deviens une âme sensible et créative qui sait aussi habiter le réel : ta beauté intérieure rayonne enfin dans le monde au lieu de rester cachée. Et c'est entièrement à ta portée.`,
    etapes: [
      "Tu vis déjà dans un monde intérieur foisonnant, peuplé de rêves, d'images et d'émotions. Tu ressens tout avec une intensité rare, tendre et rêveur, le monde te touche plus profondément que les autres.",
      "Tu vis pleinement à travers ta sensibilité et tes idéaux. Tout est intense, parfois trop : tes émotions t'emportent, tes rêves t'appellent plus que l'action, et t'affirmer ne va pas encore de soi. Une période riche, où ta force intérieure cherche encore sa forme.",
      "Tu comprends que ta richesse intérieure ne demande qu'à s'incarner. Tu apprends à concrétiser, à te protéger sans te fermer, et à t'affirmer, sans rien perdre de ta profondeur.",
      "Dans ta pleine maturité, tu es une âme sensible et créative qui sait aussi habiter le réel. Ta beauté intérieure rayonne enfin dans le monde : la version la plus accomplie de toi.",
    ],
    leviersForts: [
      {
        titre: "Transforme tes rêves en réalité",
        texte: "Ta richesse intérieure ne demande qu'à exister dans le monde. Choisis un projet, un seul, et donne-lui une première étape concrète, tu verras ta créativité prendre forme.",
      },
      {
        titre: "Fais de ta sensibilité une création",
        texte: "Ta façon de ressentir le monde est une force rare. Quand l'émotion monte, transforme-la en écriture, en art, en mouvement, c'est de là que naît le plus beau de toi.",
      },
      {
        titre: "Fais de tes idéaux une boussole",
        texte: "Ta vision d'un monde plus beau est précieuse. Sers-t'en pour orienter tes choix et avancer, c'est ce qui donne du sens à tout ce que tu fais.",
      },
      {
        titre: "Affirme ce qui compte pour toi",
        texte: "Tes valeurs sont ton socle. Leur donner une voix, même sur de petites choses, c'est rester fidèle à toi, et c'est là que tu rayonnes le plus.",
      },
    ],
    questions: [
      { situation: "Quand une remarque te blesse", question: "Est-ce vraiment dirigé contre moi, ou est-ce ma sensibilité qui l'amplifie ?" },
      { situation: "Quand tu repousses un projet", question: "Quelle est la plus petite chose que je peux faire aujourd'hui, juste pour commencer ?" },
      { situation: "Quand tu te juges durement", question: "Est-ce que j'exigerais ça d'un ami que j'aime ?" },
      { situation: "Quand tu te tais pour éviter un conflit", question: "Qu'est-ce que je n'ose pas dire, et qu'est-ce que ça me coûte de le garder ?" },
      { situation: "Quand quelqu'un te déçoit", question: "Est-ce la personne réelle qui me déçoit, ou l'image idéale que je m'étais faite d'elle ?" },
    ],
    paradoxe: {
      tension:
        "Pour grandir, tu dois apprendre à t'ancrer dans le réel et à t'affirmer,\nmais tu crains qu'en te structurant, tu trahisses ta sensibilité.",
      lumiere:
        "Ta richesse intérieure, ta profondeur et tes idéaux sont une base de croissance immense : tu as déjà tout en toi pour devenir une version accomplie de toi-même.",
      ombre:
        "Mais par peur de te dénaturer, tu peux refuser de te structurer, d'agir et de t'affirmer, et rester éternellement en puissance plutôt qu'en acte.",
      bascule:
        "Le jour où tu comprends que t'ancrer et t'affirmer ne trahit pas ta douceur mais lui donne enfin une prise sur le monde, ta croissance s'enclenche vraiment.",
    },
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

  "INFP-V2": `Au travail, tu as besoin de deux choses avant tout : de la liberté pour créer et du sens. Un poste d'exécution répétitive ou formatée finira toujours par t'éteindre. Tu donnes le meilleur de toi quand tu peux imaginer, inventer et exprimer ton originalité dans un cadre aligné avec tes valeurs. C'est pour ça que les domaines créatifs, l'écriture, les arts, le design, la création de contenus, te parlent souvent plus que les autres.

Ta capacité à voir des possibles que personne n'imagine est un atout rare. En revanche, les cadres rigides, le micro-management et le travail mécanique brident vite ce que tu as de meilleur. Ton défi principal découle de ta nature : ta difficulté à structurer, à finir et à concrétiser peut laisser tes idées brillantes sans suite. Apprendre à donner forme à ta créativité, et t'entourer de ce qui te structure, transforme ton imaginaire foisonnant en œuvres reconnues.`,

  "INFP-V3": `Au travail, tu as besoin avant tout de sens et d'un sentiment de mission. Un poste lucratif mais vide de sens, ou pire, contraire à tes valeurs, finira par t'épuiser et te dégoûter. Tu prends vie quand ton travail sert une cause, aide les autres ou défend ce qui te tient à cœur : les métiers de l'aide et du soin, l'engagement social ou humanitaire, la défense des causes, l'enseignement ou l'écriture engagée te parlent souvent plus que les autres.

Ton implication et ton humanité sont des atouts rares partout où il faut du cœur et des convictions. En revanche, les compromis moraux, le cynisme et les ambiances agressives t'affectent profondément. Ton défi principal, c'est ton propre équilibre et l'efficacité de ton engagement : tu peux t'épuiser ou manquer de structure. Apprendre à te préserver, à organiser ton action et à choisir tes combats transforme ta belle flamme en impact durable.`,

  "ENFP-V1": `Au travail, tu n'es pas fait pour une carrière en ligne droite, et c'est une force. Les parcours prévisibles t'étouffent : tu as besoin de sens, de variété, de liberté et de contact humain. Tu t'épanouis là où l'on valorise l'initiative et la créativité, tout ce qui touche à la communication, à la création, à l'accompagnement humain, à l'innovation ou à l'entrepreneuriat. Tu es souvent l'étincelle qui démarre les choses et embarque les autres.

Ce qui te motive, ce n'est ni l'argent seul ni le statut, mais le sens et la liberté : un poste bien payé mais vide de sens finira par te dessécher. Ton défi découle de ton paradoxe, tu démarres fort mais le suivi t'ennuie. Les voies qui te conviennent renouvellent sans cesse l'intérêt, ou te permettent de t'entourer de personnes qui assurent la constance que tu fuis. Tu n'as pas à devenir un gestionnaire méticuleux : tu peux t'associer, déléguer, et choisir des chemins qui épousent ta nature.`,
};

// Texte de la section « Mes relations » (clé CODE-Vx), adapté à la variante.
const RELATIONS_TEXTE: Record<string, string> = {
  "INFP-V1": `En amour comme en amitié, tu ne cherches pas le nombre mais la profondeur. Ce qu'il te faut, ce sont des liens vrais, où tu peux te montrer tel que tu es et sentir l'autre en retour. Ton empathie et ta façon de percevoir presque intuitivement ce que les gens ressentent font de toi un ami et un partenaire d'une rare attention : auprès de toi, on se sent compris, accueilli, en sécurité. Tu crées sans effort ces espaces où l'autre peut enfin baisser la garde.

Mais ton idéalisme a son revers. Tu places la barre haut, et tu peux être blessé ou déçu quand les autres ne sont pas à la hauteur de l'image que tu te faisais d'eux, ou de la relation. Ton chemin, c'est d'apprendre à dire tes besoins clairement, à poser des limites saines, et à accepter les autres (comme toi-même) avec leurs imperfections, sans y voir une trahison. Et même quand un lien compte énormément pour toi, n'oublie pas que tu as besoin de moments seuls pour te ressourcer et te retrouver.`,

  "INFP-V2": `En amour comme en amitié, tu cherches l'authenticité et la connexion singulière, pas le nombre. Quand tu aimes, ton imagination et ton cœur s'unissent : tu places l'autre au centre d'un monde intérieur riche, tu le vois avec une tendresse et une originalité rares. Tu es l'ami original et imaginatif, celui avec qui les conversations partent dans des directions inattendues, et tu offres une présence sincère à ceux qui te comprennent vraiment.

Ton imagination a son revers : tu peux idéaliser l'autre ou la relation, puis être déçu face au réel, et ta tendance à rêver peut te faire négliger le concret du lien au quotidien. Ton chemin, c'est d'apprendre à aimer la personne réelle plutôt que l'image que tu t'en fais, à entretenir le lien jour après jour, et à exprimer tes besoins. Et n'oublie pas ton besoin d'espace et de solitude pour te ressourcer.`,

  "INFP-V3": `En amour comme en amitié, tu cherches l'authenticité et le partage de valeurs. L'alignement sur ce qui compte est essentiel pour toi : tu ne peux pas être proche de quelqu'un dont les valeurs heurteraient profondément les tiennes. Quand tu aimes, c'est avec sincérité, profondeur et fidélité, et tu offres un soutien indéfectible à ceux que tu chéris comme aux causes que tu défends.

Tes défis viennent de ta nature : absorbé par tes engagements, tu peux négliger la relation, et ta sensibilité peut te faire vivre les tensions intensément ou porter les soucis des autres jusqu'à l'épuisement. Ton chemin, c'est d'accorder à tes proches autant de soin qu'à tes combats, d'accepter l'imperfection de l'autre, et de ne pas trop t'oublier pour les autres. N'oublie pas d'honorer tes propres besoins, souvent négligés.`,

  "ENFP-V1": `En amour comme en amitié, tu aimes grand. Tu offres une présence chaleureuse, attentive, pleine de fantaisie, et tu fais sentir à l'autre qu'il est unique et vu comme personne ne l'a vu. Tu apportes de la magie dans le quotidien et tu rêves d'une connexion vraie où l'on peut tout partager, des rires aux questions existentielles. Ton équilibre entre le cœur et la raison fait de toi quelqu'un de passionné mais capable de désamorcer les tensions par la compréhension.

Tes défis sont les revers de tes qualités : ton goût de la nouveauté peut te faire craindre la routine du couple, ta sensibilité au rejet te faire surinterpréter un mot ou un silence, et ta difficulté avec le conflit frontal te faire éviter les sujets qui fâchent. Ton chemin, c'est de découvrir que la profondeur d'une relation durable est une aventure en soi, pas une prison. Et dans tes amitiés, où tu es souvent le moteur, apprends à recevoir autant que tu donnes.`,
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
  "INFP-V2": {
    forces: [
      { titre: "Une imagination inépuisable", accent: "imagination", texte: "Tu ne manques jamais d'idées, d'images ou de possibles : ton esprit invente sans cesse du neuf." },
      { titre: "Une créativité qui a une âme", accent: "créativité", texte: "Ce que tu crées est nourri d'émotion et de sens, jamais froid ni purement technique." },
      { titre: "Une sensibilité féconde", accent: "sensibilité", texte: "Tu perçois des nuances et des beautés que tu transformes en matière créative." },
      { titre: "Une authenticité singulière", accent: "authenticité", texte: "Tu crées pour exprimer ce qui est vrai pour toi, pas pour plaire ou suivre les modes." },
      { titre: "Une ouverture exploratrice", accent: "ouverture", texte: "Ton esprit grand ouvert connecte des idées éloignées et voit des possibles partout." },
      { titre: "Une vision originale", accent: "originale", texte: "Là où d'autres voient le réel figé, toi tu vois tout ce qu'il pourrait devenir." },
    ],
    ombres: [
      { titre: "Rêver plus que réaliser", accent: "Rêver", texte: "Tu peux imaginer mille créations sans jamais en concrétiser aucune." },
      { titre: "L'évasion dans l'imaginaire", accent: "évasion", texte: "Te réfugier dans ton monde intérieur peut devenir une douce fuite du réel." },
      { titre: "La dispersion", accent: "dispersion", texte: "Tant d'idées séduisantes que tu papillonnes de l'une à l'autre sans approfondir." },
      { titre: "Une sensibilité qui fragilise", accent: "sensibilité", texte: "Tu peux être facilement blessé ou débordé par tes émotions." },
      { titre: "La difficulté à finir", accent: "finir", texte: "La phase laborieuse de la réalisation t'ennuie ou t'intimide." },
      { titre: "L'indécision des possibles", accent: "indécision", texte: "Trop d'options ouvertes peuvent t'empêcher de choisir et de t'engager." },
    ],
    paradoxe: {
      tension:
        "Ton imagination est un trésor infini,\nmais elle risque de ne jamais quitter ta tête pour devenir réelle.",
      lumiere:
        "Ta créativité, ton imaginaire et ta sensibilité sont des dons immenses : tu portes en toi des mondes et des beautés qui pourraient enrichir les autres.",
      ombre:
        "Mais à rêver plus qu'à agir, à te disperser et à peiner à concrétiser, tout cela peut rester un potentiel inexploité.",
      bascule:
        "Le jour où tu donnes forme à ne serait-ce qu'une partie de ce que tu inventes, ton imagination cesse d'être un jardin secret pour devenir une source de beauté offerte au monde.",
    },
  },
  "INFP-V3": {
    forces: [
      { titre: "Sensibilité et action réunies", accent: "action", texte: "Tu ne te contentes pas de ressentir les injustices, tu agis : une alliance rare entre le cœur et l'engagement." },
      { titre: "Une boussole morale sûre", accent: "boussole", texte: "Ton sens profond de ce qui est juste guide tes actes et donne de la cohérence à ta vie." },
      { titre: "Une empathie qui engage", accent: "empathie", texte: "Ta sensibilité à la souffrance des autres nourrit un engagement profondément humain, jamais froid." },
      { titre: "Une authenticité qui inspire", accent: "authenticité", texte: "Tu agis par conviction sincère, pas par posture, et cela touche et entraîne les autres." },
      { titre: "Une détermination tranquille", accent: "détermination", texte: "Sous ta douceur, une volonté de fer au service de tes convictions, tenace et durable." },
      { titre: "Une vision d'un monde meilleur", accent: "vision", texte: "Tu vois ce qui pourrait être plus juste, et cette intuition oriente toute ta flamme." },
    ],
    ombres: [
      { titre: "Le risque de t'épuiser", accent: "épuiser", texte: "À force de te donner et de porter la souffrance du monde, tu peux te négliger jusqu'au surmenage." },
      { titre: "La submersion par les injustices", accent: "submersion", texte: "Tu ressens si fort ce qui ne va pas que cela peut t'accabler et te désespérer." },
      { titre: "Un idéalisme qui durcit", accent: "idéalisme", texte: "Face à un monde qui change lentement, tu peux devenir dur ou amer, envers les autres comme envers toi." },
      { titre: "Un manque de structure", accent: "structure", texte: "Beaucoup de cœur et de conviction, mais une difficulté à organiser et à prioriser ton action." },
      { titre: "Le don de soi excessif", accent: "don de soi", texte: "Tu peux porter les soucis des autres comme les tiens, jusqu'à t'oublier toi-même." },
      { titre: "Une sensibilité qui pèse", accent: "sensibilité", texte: "Ton intensité émotionnelle, moteur de ton engagement, peut aussi devenir un fardeau." },
    ],
    paradoxe: {
      tension:
        "Ton engagement vient du cœur et c'est sa force,\nmais ce même cœur peut te consumer.",
      lumiere:
        "Ta sensibilité, tes convictions et ta volonté d'agir pour un monde meilleur sont des dons immenses : tu peux toucher, mobiliser, changer les choses.",
      ombre:
        "Mais poussées à l'extrême, ces forces peuvent te dévorer : tu peux t'épuiser pour tes causes et te briser à vouloir réparer le monde.",
      bascule:
        "Le jour où tu prends soin de toi autant que de tes causes et où tu choisis tes combats, ta flamme cesse d'être une source d'épuisement pour devenir une lumière durable.",
    },
  },
  "ENFP-V1": {
    forces: [
      { titre: "Un enthousiasme contagieux", accent: "enthousiasme", texte: "Quand quelque chose t'allume, tu rayonnes, et ce rayonnement se transmet et réveille l'énergie d'un groupe." },
      { titre: "Un œil pour le potentiel", accent: "potentiel", texte: "Là où d'autres voient les limites, tu vois l'étincelle et ce que les gens et les situations pourraient devenir." },
      { titre: "Une créativité inépuisable", accent: "créativité", texte: "Ton esprit relie ce que personne ne relie et ne manque jamais d'idées ni d'angles neufs." },
      { titre: "Une belle adaptabilité", accent: "adaptabilité", texte: "Tu rebondis, tu t'ajustes et tu saisis les occasions au vol là où les esprits rigides se cassent." },
      { titre: "Une chaleur sincère", accent: "chaleur", texte: "Les gens se sentent plus vivants, vus et valorisés à ton contact." },
      { titre: "Une profondeur cachée", accent: "profondeur", texte: "Sous ta légèreté, des valeurs solides et une vraie quête de sens donnent du poids à ta lumière." },
    ],
    ombres: [
      { titre: "La dispersion", accent: "dispersion", texte: "Tu vois tant de choses fascinantes que tu commences mille projets et en finis peu." },
      { titre: "L'enthousiasme qui retombe", accent: "enthousiasme", texte: "Tu adores le neuf, mais le travail patient du suivi fait chuter ton énergie." },
      { titre: "Une sensibilité au rejet", accent: "rejet", texte: "Tu donnes beaucoup, et la critique te touche plus fort que tu ne le montres." },
      { titre: "Le mal à dire non", accent: "non", texte: "Ton besoin de lien te pousse à trop t'engager, jusqu'à te retrouver débordé." },
      { titre: "La fuite du difficile", accent: "fuite", texte: "Quand ça devient pesant ou routinier, tu es tenté de filer vers du plus léger." },
      { titre: "L'indécision des possibles", accent: "indécision", texte: "Tu vois tant d'options que choisir te coûte, par peur de fermer des portes." },
    ],
    paradoxe: {
      tension:
        "Tu es un rêveur qui veut réaliser,\nmais que le réel ennuie.",
      lumiere:
        "Tu as les visions, l'énergie et le don d'inspirer : tu pourrais accomplir des choses immenses et entraîner les autres avec toi.",
      ombre:
        "Mais entre l'idée géniale et sa réalisation s'étend un long tunnel de travail patient, et c'est précisément ce que ton tempérament fuit.",
      bascule:
        "Le jour où tu portes ne serait-ce qu'une seule de tes visions jusqu'au bout, tu passes du rêveur qui éparpille au créateur qui accomplit, et tu deviens imparable.",
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

  "INFP-V2": `Parmi les trois visages du Médiateur, tu es celui dont l'imaginaire déborde le plus. Tu n'es pas avant tout le Poète centré sur la sensibilité et la beauté ressentie, ni l'Idéaliste Engagé tourné vers les causes : tu es celui qui invente, qui crée, qui explore des mondes intérieurs sans fin. Inventer, imaginer, explorer les possibles te comble plus que tout.

Cette combinaison, l'imagination débordante et la sensibilité profonde, fait de toi une âme créative d'exception, un inventeur de mondes qui apporte de l'originalité, de la beauté et de l'inattendu là où il passe. Le revers, c'est que cette richesse peut rester enfermée dans ta tête : ton plus beau chemin de croissance sera d'apprendre à faire naître tes rêves dans le réel, sans rien perdre de ta créativité.`,

  "INFP-V3": `Parmi les trois visages du Médiateur, tu es celui qui transforme le plus sa sensibilité en engagement. Tu n'es pas avant tout le Poète centré sur la beauté ressentie, ni le Rêveur Créatif tourné vers l'imaginaire : tu es celui qui veut défendre ce qui est juste et contribuer à un monde meilleur. Défendre des causes, lutter contre les injustices, œuvrer pour le bien des autres te comble plus que tout.

Cette combinaison, la sensibilité profonde et l'engagement déterminé, fait de toi un militant du cœur, dont les convictions ne restent jamais lettre morte mais se traduisent en actes, avec une sincérité qui touche et inspire. Le revers, c'est que ce même cœur peut te consumer : ton plus beau chemin de croissance sera d'apprendre à agir sans te laisser submerger, et à prendre soin de toi autant que de tes causes.`,

  "ENFP-V1": `Parmi les trois visages de l'Inspirateur, tu es celui que la nouveauté appelle le plus fort. L'aventure, la découverte, l'horizon inexploré, voilà ce qui te fait vibrer plus que tout : tu es un pionnier dans l'âme. Mais chez toi, cette soif d'exploration est suivie de près par ton cœur authentique et ton don pour rassembler les gens.

Autrement dit, tu n'es pas un explorateur solitaire qui fuit en avant : tu es un explorateur qui entraîne les autres dans ses découvertes, qui met du sens et de la chaleur dans ses aventures. Cette combinaison, la soif de nouveau et la profondeur humaine presque à égalité, fait de toi quelqu'un de complet, un aventurier au grand cœur, difficile à enfermer dans une case.`,
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
  "ENFP-V1":
    "Les Explorateurs Enthousiastes sont les plus appelés par la nouveauté et l'aventure. La curiosité est leur moteur : ils veulent tout découvrir, voient des possibles partout, et entraînent les autres dans leurs élans.",
  "ENFP-V2":
    "Les Cœurs Authentiques sont guidés par des valeurs profondes et une quête de sens. Sous leur chaleur bat une vraie empathie : ils cherchent l'authentique et le juste en toute chose.",
  "ENFP-V3":
    "Les Fédérateurs créent du lien partout où ils passent. Chaleureux et attentifs, ils rassemblent les gens, animent les groupes et trouvent leur joie dans des liens vibrants et sincères.",
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

// =============================================================================
// FUSION DU CONTENU PAR TYPE
// Chaque fichier profils/<type>.ts ajoute ses clés (CODE-Vx…) aux tables ci-dessus.
// INFP (les 3) et ENFP-V1 restent définis inline ; les modules complètent le reste.
// Pour ajouter/corriger un profil : éditer le fichier du type concerné, rien d'autre.
// =============================================================================
type ProfilModule = {
  traitsTexte?: Record<string, string>;
  descriptions?: Record<string, string>;
  accroches?: Record<string, string>;
  intros?: Record<string, string>;
  texteVariante?: Record<string, string>;
  varianteDetail?: Record<string, VarianteDetail>;
  relationsTexte?: Record<string, string>;
  proTexte?: Record<string, string>;
  mindsetTexte?: Record<string, ProfilSection>;
  sectionDetail?: Record<string, SectionDetail>;
};

const MODULES_PROFILS = [
  enfpMod, infjMod, enfjMod, intjMod, intpMod, entjMod, entpMod,
  istjMod, isfjMod, estjMod, esfjMod, istpMod, isfpMod, estpMod, esfpMod,
] as unknown as ProfilModule[];

for (const mod of MODULES_PROFILS) {
  Object.assign(TRAITS_TEXTE, mod.traitsTexte ?? {});
  Object.assign(DESCRIPTIONS_VARIANTES, mod.descriptions ?? {});
  Object.assign(ACCROCHES, mod.accroches ?? {});
  Object.assign(INTROS, mod.intros ?? {});
  Object.assign(TEXTE_VARIANTE, mod.texteVariante ?? {});
  Object.assign(VARIANTE_DETAIL, mod.varianteDetail ?? {});
  Object.assign(RELATIONS_TEXTE, mod.relationsTexte ?? {});
  Object.assign(PRO_TEXTE, mod.proTexte ?? {});
  Object.assign(MINDSET_TEXTE, mod.mindsetTexte ?? {});
  Object.assign(SECTION_DETAIL, mod.sectionDetail ?? {});
}
