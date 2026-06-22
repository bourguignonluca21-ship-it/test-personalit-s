// =============================================================================
// CONTENU DU PROFIL INTP : « Logicien » (3 variantes).
// V1 Architecte Logique · V2 Explorateur d'Idées · V3 Penseur Humaniste.
// Même forme que l'exemple INFP de profils.ts. Source : rapports longs INTP.
// Voix « tu », pas de tirets longs, mot-clé en vert via le champ `accent`.
// =============================================================================

interface ForceOmbre {
  titre: string;
  accent?: string;
  texte: string;
}

interface Paradoxe {
  tension: string;
  lumiere: string;
  ombre: string;
  bascule: string;
}

interface VarianteDetail {
  forces: ForceOmbre[];
  ombres: ForceOmbre[];
  paradoxe: Paradoxe;
}

interface Bloc {
  ton: "positif" | "negatif";
  items: string[];
}

interface Compatibilite {
  ton: "positif" | "negatif";
  items: string[];
  profils: { code?: string; nom?: string; raison: string }[];
}

interface SectionRelationCarriere {
  forces: ForceOmbre[];
  ombres: ForceOmbre[];
  blocs: Bloc[];
  compatibilites: Compatibilite[];
  paradoxe: Paradoxe;
}

interface SectionDeveloppement {
  evolution: string;
  etapes: string[];
  leviersForts: { titre: string; texte: string }[];
  questions: { situation: string; question: string }[];
  paradoxe: Paradoxe;
  motRoute?: string;
}

interface ProfilINTP {
  traitsTexte: Record<string, string>;
  descriptions: Record<string, string>;
  accroches: Record<string, string>;
  intros: Record<string, string>;
  texteVariante: Record<string, string>;
  varianteDetail: Record<string, VarianteDetail>;
  relationsTexte: Record<string, string>;
  proTexte: Record<string, string>;
  mindsetTexte: Record<string, { apercu: string }>;
  sectionDetail: Record<string, SectionRelationCarriere | SectionDeveloppement>;
}

const profilINTP: ProfilINTP = {
  // ---------------------------------------------------------------------------
  // Texte « Traits » par TYPE (commun aux 3 variantes), sous les barres du spectre.
  // ---------------------------------------------------------------------------
  traitsTexte: {
    INTP: `Ton esprit est tourné vers l'intérieur et vers la logique : tu puises ton énergie dans la réflexion, l'analyse et l'exploration des idées, et c'est seul, dans le calme, que tu donnes le meilleur de toi. Tu ne te contentes pas des réponses toutes faites, tu démontes les mécanismes, tu traques les incohérences et tu reconstruis des cadres de pensée plus solides. Cette rigueur, alliée à une vraie créativité conceptuelle, fait de toi un esprit d'une fiabilité rare quand il s'agit de comprendre vraiment.

Mais cette même puissance a son revers : à force de vouloir l'analyse impeccable, tu peux ne jamais conclure, te perdre dans l'abstraction et oublier le concret comme les autres. Tu gardes ton esprit ouvert au point que trancher te coûte, et tu traites volontiers les émotions comme des problèmes à résoudre. Tout l'enjeu de ton chemin, c'est de faire sortir ta pensée de ta tête : apprendre à agir, à conclure, à te relier, pour que ta brillance prenne enfin une vraie prise sur le monde.`,
  },

  // ---------------------------------------------------------------------------
  // Descriptions des variantes (affichées au survol de chaque barre).
  // ---------------------------------------------------------------------------
  descriptions: {
    "INTP-V1":
      "Les Architectes Logiques sont les plus tournés vers la rigueur et la profondeur de l'analyse. Ils creusent jusqu'aux fondations, bâtissent des cadres de pensée cohérents et traquent la moindre incohérence.",
    "INTP-V2":
      "Les Explorateurs d'Idées sont portés par la curiosité et la nouveauté. Leur esprit bondit d'un domaine à l'autre, relie des mondes éloignés et ne manque jamais d'idées neuves.",
    "INTP-V3":
      "Les Penseurs Humanistes mettent leur puissance d'analyse au service de l'humain. Ils allient la lucidité de l'analyste à la chaleur de celui qui se soucie vraiment des gens.",
  },

  // ---------------------------------------------------------------------------
  // Accroches (héros) par variante.
  // ---------------------------------------------------------------------------
  accroches: {
    "INTP-V1": "Tu n'acceptes pas les réponses toutes faites, tu as besoin de comprendre pourquoi.",
    "INTP-V2": "Tu ne creuses pas un seul puits, tu préfères explorer toute la carte.",
    "INTP-V3": "Tu n'analyses pas seulement les systèmes, tu comprends aussi les âmes.",
  },

  // ---------------------------------------------------------------------------
  // Introductions longues (~2 paragraphes) par variante.
  // ---------------------------------------------------------------------------
  intros: {
    "INTP-V1": `En tant que Logicien (INTP), ta pensée est une cathédrale que tu construis pièce par pièce, avec une cohérence et une précision remarquables. Là où beaucoup se contentent d'une réponse satisfaisante, toi tu creuses jusqu'aux fondations, jusqu'à saisir le mécanisme exact qui fait fonctionner les choses. Ce qui te définit, c'est ta quête d'exactitude : tu ne supportes pas l'à-peu-près, tu démontes les idées jusqu'à leurs rouages, et tu repères les failles de logique que personne d'autre ne voit.

Des trois visages que peut prendre ton type, tu es l'Architecte Logique, le plus tourné vers la rigueur et la profondeur de l'analyse. Tu peux te plonger des heures dans un sujet, dans un état de concentration totale où le temps n'existe plus, et il y a chez toi une humilité intellectuelle rare : tu n'es pas attaché à avoir raison, tu es attaché à être exact. Cette même puissance peut pourtant rester enfermée dans ta tête : ta plus belle conquête sera de faire exister ta pensée dans le réel, sans rien perdre de ta rigueur.`,

    "INTP-V2": `En tant que Logicien (INTP), ton cerveau est une machine à connexions : il relie des domaines éloignés, génère sans cesse des possibilités neuves et se passionne pour tout. Là où d'autres se spécialisent et creusent un seul sillon, toi tu embrasses l'étendue, parce que tout est fascinant. Ce qui te définit, c'est ta curiosité pure et insatiable : tu vois dix approches là où d'autres n'en voient qu'une, tu fais des analogies surprenantes, tu trouves des liens que personne ne pense à rapprocher.

Des trois visages que peut prendre ton type, tu es l'Explorateur d'Idées, celui que la nouveauté appelle le plus fort. Ton esprit ne s'éteint jamais : il bouillonne, explore, imagine, connecte, et la vie avec toi n'est jamais ennuyeuse. Cette même richesse peut pourtant se disperser sans jamais rien accomplir : ta plus belle conquête sera de canaliser ton exploration pour mener tes meilleures idées jusqu'au bout, sans rien perdre de ta créativité.`,

    "INTP-V3": `En tant que Logicien (INTP), tu possèdes la rigueur et la profondeur d'un analyste, mais tu les tournes vers ce qu'il y a de plus complexe et de plus mouvant au monde : les êtres humains. Tu décortiques les comportements, les motivations et les relations avec une finesse logique doublée d'une vraie chaleur. Ce qui te définit, c'est cette alliance rare entre la tête qui analyse et le cœur qui comprend : tu n'es pas un observateur froid, tu es un analyste qui aime ce qu'il observe.

Des trois visages que peut prendre ton type, tu es le Penseur Humaniste, le plus tourné vers l'humain et la connexion. Tu vois les jeux relationnels, les non-dits, les ressorts psychologiques que les autres ne perçoivent pas, mais ta clairvoyance n'est jamais cynique : elle est au service de la compréhension et de l'aide. Cette même compréhension peut pourtant te tenir à distance de ce que tu saisis si bien : ta plus belle conquête sera de vivre les relations autant que de les analyser.`,
  },

  // ---------------------------------------------------------------------------
  // Texte long de chaque variante (sous les barres des variantes).
  // ---------------------------------------------------------------------------
  texteVariante: {
    "INTP-V1": `Parmi les trois visages du Logicien, tu es le plus tourné vers la rigueur et la profondeur de l'analyse. Tu n'es pas avant tout l'explorateur qui butine d'un sujet à l'autre, ni le penseur tourné vers l'humain : tu es celui qui veut construire un système de pensée cohérent et exact, celui pour qui la précision logique est presque une question d'honneur.

Ce qui te caractérise, c'est cette capacité à approfondir un sujet jusqu'à le maîtriser entièrement, à bâtir des cadres de pensée rigoureux, à traquer la moindre incohérence. Tu trouves une satisfaction profonde dans la cohérence interne d'une idée bien construite. Cette combinaison, la puissance d'analyse et l'exigence d'exactitude, fait de toi un esprit d'une qualité rare, capable d'éclairer des problèmes que personne d'autre ne maîtrise vraiment.`,

    "INTP-V2": `Parmi les trois visages du Logicien, tu es celui que la nouveauté appelle le plus fort. Tu n'es pas avant tout l'architecte qui approfondit un seul système, ni le penseur tourné vers l'humain : tu es celui qui veut tout explorer, qui bondit d'un sujet à l'autre, qui se nourrit de la diversité des idées. T'enfermer dans un seul domaine t'ennuie vite ; ce qui t'allume, c'est le neuf, le varié, l'inconnu.

Tu as sans cesse de nouvelles idées dans des directions multiples, et ta force est précisément cette capacité à embrasser large, à connecter des mondes éloignés, à apporter des perspectives que les spécialistes ne voient pas. Cette combinaison, la rigueur logique et la curiosité tous azimuts, fait de toi un esprit d'une fertilité rare, un inventeur de possibles qui ne sera jamais à court d'idées neuves.`,

    "INTP-V3": `Parmi les trois visages du Logicien, tu es le plus tourné vers l'humain et la connexion. Tu n'es pas avant tout l'architecte qui construit des systèmes abstraits, ni l'explorateur qui butine tous les sujets : tu es celui qui met sa puissance d'analyse au service de la compréhension des gens et des relations.

Ce qui te caractérise, c'est cet intérêt profond pour le comportement humain et ce désir de relier tes idées à ce qui touche les gens. Comprendre les autres t'intéresse autant, sinon plus, que comprendre les concepts. Cette combinaison, la rigueur de l'analyste et la chaleur de celui qui se soucie des êtres, fait de toi quelqu'un de rare : un esprit capable d'éclairer l'humain avec autant de profondeur que de cœur.`,
  },

  // ---------------------------------------------------------------------------
  // Détail enrichi de chaque variante : 6 forces, 6 ombres, paradoxe central.
  // ---------------------------------------------------------------------------
  varianteDetail: {
    "INTP-V1": {
      forces: [
        { titre: "Une rigueur implacable", accent: "rigueur", texte: "Tu repères les failles de raisonnement que personne ne voit et tu exiges que tout se tienne." },
        { titre: "Un approfondissement rare", accent: "approfondissement", texte: "Tu ne survoles pas, tu plonges : tu explores un sujet jusqu'à en maîtriser toute la logique interne." },
        { titre: "Une objectivité remarquable", accent: "objectivité", texte: "Tu cherches la vérité, pas la victoire, et tu vois clair là où d'autres sont aveuglés par leurs préférences." },
        { titre: "Une humilité intellectuelle", accent: "humilité", texte: "Tu acceptes de te tromper et de réviser face aux preuves, sans jamais défendre une position par ego." },
        { titre: "Une créativité conceptuelle", accent: "créativité", texte: "Sous ta rigueur, un esprit qui génère des hypothèses et aborde les problèmes sous des angles neufs." },
        { titre: "Une fiabilité de pensée", accent: "fiabilité", texte: "Quand tu as analysé quelque chose en profondeur, on peut s'appuyer sur ta conclusion sans crainte." },
      ],
      ombres: [
        { titre: "Un perfectionnisme paralysant", accent: "perfectionnisme", texte: "À vouloir l'analyse impeccable, tu peux ne jamais conclure, ni agir, ni livrer." },
        { titre: "La perte dans l'abstraction", accent: "abstraction", texte: "Ton amour des idées peut te couper du concret au point que rien ne se réalise jamais." },
        { titre: "Une logique qui néglige l'humain", accent: "logique", texte: "À tout traiter par l'analyse, tu peux paraître froid et rater les besoins affectifs des autres." },
        { titre: "Une ouverture qui fige", accent: "ouverture", texte: "Voir toujours un angle de plus peut te laisser éternellement dans l'exploration sans jamais trancher." },
        { titre: "Un quotidien qui résiste", accent: "quotidien", texte: "La structure, les plannings et l'organisation pratique ne te viennent pas naturellement." },
        { titre: "Des émotions tenues à distance", accent: "émotions", texte: "À force de tout disséquer, tu peux négliger tes propres émotions jusqu'à ne plus les reconnaître." },
      ],
      paradoxe: {
        tension:
          "Tu as l'un des esprits les plus rigoureux et créatifs qui soient,\nmais cette puissance risque de ne jamais rencontrer le monde réel.",
        lumiere:
          "Ta capacité d'analyse, ta profondeur et ta logique sont des dons immenses : tu pourrais produire des idées et des compréhensions d'une vraie valeur.",
        ombre:
          "Mais ton perfectionnisme, ton amour de l'abstraction et ta difficulté à conclure peuvent faire que tout cela reste dans ta tête, inachevé et inexploité.",
        bascule:
          "Le jour où tu sors de l'analyse pour agir, où tu acceptes l'imparfait et concrétises ne serait-ce qu'une partie de ce que tu conçois, ta pensée cesse d'être un trésor enfoui pour devenir une vraie force dans le monde.",
      },
    },

    "INTP-V2": {
      forces: [
        { titre: "Une créativité inépuisable", accent: "créativité", texte: "Tu ne manques jamais d'idées : là où les autres sont bloqués, toi tu vois dix pistes." },
        { titre: "Une curiosité d'ampleur", accent: "curiosité", texte: "Tu t'intéresses à tout et tu relies ce que les spécialistes cloisonnés ne relient jamais." },
        { titre: "Un don pour connecter", accent: "connecter", texte: "Tu fais des analogies surprenantes et des ponts entre des mondes éloignés, le cœur de la vraie créativité." },
        { titre: "Une ouverture d'esprit totale", accent: "ouverture", texte: "Sans dogmes ni préjugés, tu accueilles les idées neuves ou dérangeantes au lieu de les rejeter." },
        { titre: "Une adaptabilité précieuse", accent: "adaptabilité", texte: "Tu changes d'angle, tu adoptes de nouveaux cadres et tu rebondis quand les choses changent." },
        { titre: "Un esprit toujours allumé", accent: "allumé", texte: "Ton moulin à idées ne s'éteint jamais : tu ne seras jamais à court de pistes neuves." },
      ],
      ombres: [
        { titre: "La dispersion permanente", accent: "dispersion", texte: "Tu commences mille explorations et tu en finis peu, car un nouveau sujet t'appelle toujours." },
        { titre: "Un mal à approfondir", accent: "approfondir", texte: "À tout survoler, tu peux rester en surface partout sans devenir vraiment expert nulle part." },
        { titre: "Une difficulté à concrétiser", accent: "concrétiser", texte: "L'idée neuve t'excite, le suivi laborieux t'ennuie, et tes idées brillantes restent lettre morte." },
        { titre: "Une ouverture qui fuit", accent: "fuite", texte: "Garder toutes tes options ouvertes peut devenir une façon de ne jamais t'engager ni choisir." },
        { titre: "Une indécision face aux possibles", accent: "indécision", texte: "Trancher te coûte, car choisir, c'est renoncer à explorer toutes les autres voies." },
        { titre: "Des émotions tenues à distance", accent: "émotions", texte: "Ton confort avec la logique peut te faire négliger tes émotions et celles des autres." },
      ],
      paradoxe: {
        tension:
          "Tu as une fertilité d'idées exceptionnelle,\nmais cette même richesse peut t'empêcher de jamais rien accomplir.",
        lumiere:
          "Ta curiosité, ta créativité et ton ouverture sont des dons immenses : tu pourrais produire des choses originales, neuves et précieuses.",
        ombre:
          "Mais ta dispersion, ta difficulté à approfondir et à finir, et ta peur de t'engager peuvent te faire papillonner éternellement sans rien transformer en réel.",
        bascule:
          "Le jour où tu choisis, parmi tes mille idées, celles que tu mèneras vraiment jusqu'au bout, ta fertilité cesse d'être une dispersion pour devenir une vraie force créatrice.",
      },
    },

    "INTP-V3": {
      forces: [
        { titre: "Une compréhension profonde", accent: "compréhension", texte: "Tu perçois les motivations cachées et les ressorts psychologiques que les autres ne voient pas." },
        { titre: "Une analyse chaleureuse", accent: "chaleureuse", texte: "Tu dis les vérités difficiles avec tact, tu comprends sans juger et tu éclaires sans écraser." },
        { titre: "Une lucidité protectrice", accent: "lucidité", texte: "Tu vois les jeux relationnels et les non-dits, ce qui te permet de naviguer sans te faire avoir." },
        { titre: "Une ouverture à la complexité", accent: "complexité", texte: "Tu n'enfermes pas les gens dans des cases et tu accueilles leurs contradictions sans les réduire." },
        { titre: "Un désir d'aider qui guide", accent: "aider", texte: "Tu veux que ta compréhension serve, qu'elle améliore les relations et les gens autour de toi." },
        { titre: "Une intuition de l'humain", accent: "intuition", texte: "Tu ne vois pas seulement ce que les gens font, tu pressens pourquoi ils le font." },
      ],
      ombres: [
        { titre: "La suranalyse des relations", accent: "suranalyse", texte: "Tu peux décortiquer un message ou une attitude jusqu'à t'en faire un nœud, au lieu de simplement vivre le lien." },
        { titre: "Une oscillation troublante", accent: "oscillation", texte: "Tu hésites entre la distance de l'observateur et l'élan de la connexion, ce qui te rend difficile à cerner." },
        { titre: "La compréhension sans action", accent: "action", texte: "Tu peux passer un temps infini à comprendre une personne sans jamais aider, t'engager ni te livrer." },
        { titre: "Une vie émotionnelle en friche", accent: "friche", texte: "Tu comprends les émotions des autres, mais tu peux être bien moins à l'aise avec les tiennes." },
        { titre: "Le refuge dans les autres", accent: "refuge", texte: "Te concentrer sur la vie intérieure d'autrui peut devenir une façon d'éviter la tienne." },
        { titre: "Une non-affirmation", accent: "affirmation", texte: "Ta bienveillance peut te faire trop t'effacer, écouter sans jamais défendre tes propres besoins." },
      ],
      paradoxe: {
        tension:
          "Tu comprends les humains mieux que presque personne,\nmais cette compréhension peut te tenir à distance de ce que tu saisis si bien.",
        lumiere:
          "Ta capacité à analyser et à saisir les gens, leurs émotions et leurs relations est un don rare : tu pourrais créer des liens d'une profondeur exceptionnelle.",
        ombre:
          "Mais ce même don peut te faire rester spectateur de l'humain plutôt qu'acteur, analyste des émotions plutôt que vivant qui les ressent et les partage.",
        bascule:
          "Le jour où tu ne te contentes plus de comprendre les relations mais où tu t'y plonges, et où tu vis tes émotions au lieu de seulement les analyser, ta compréhension devient une vraie richesse relationnelle.",
      },
    },
  },

  // ---------------------------------------------------------------------------
  // Texte « Mes relations » (~2 paragraphes) par variante.
  // ---------------------------------------------------------------------------
  relationsTexte: {
    "INTP-V1": `En amour comme en amitié, tu fonctionnes différemment de la plupart des gens, et c'est une force quand on sait te lire. Tu n'es pas du genre aux grandes démonstrations : ton attachement est réel mais discret, et il passe souvent plus par le partage d'idées et la connexion intellectuelle que par les mots tendres. Tu privilégies radicalement la qualité à la quantité, quelques liens vrais et profonds plutôt qu'une foule de relations de surface qui t'épuisent. Quand tu choisis quelqu'un, c'est réfléchi, sincère, donc solide, et ta loyauté est durable.

Tes défis viennent de ta nature : ton confort avec la logique te rend maladroit avec l'expression des émotions, et l'autre peut te croire froid ou distant. Tu peux privilégier la vérité brute sur le tact, ou te perdre dans tes pensées au point de négliger les besoins affectifs de tes proches. Ton chemin, c'est d'apprendre à exprimer ce que tu ressens, à offrir de la chaleur autant que de la fiabilité, et à te rappeler que les émotions de l'autre ne sont pas des problèmes à résoudre mais des choses à accueillir.`,

    "INTP-V2": `En amour comme en amitié, ce qui t'attire d'abord chez quelqu'un, c'est l'esprit : la capacité à te surprendre, à te stimuler, à explorer des idées avec toi. Une conversation fascinante est pour toi une forme de séduction bien plus puissante qu'un dîner convenu. Tu cherches un partenaire et des amis qui respectent ta liberté et ton besoin d'espace mental, avec qui tu ne t'ennuies jamais. Ta loyauté est sincère, mais elle s'exprime à ta façon, par le partage d'idées et la liberté offerte autant que reçue.

Tes défis viennent de ta nature : ton confort avec la logique te rend maladroit avec les émotions, ton besoin de nouveauté peut te faire craindre l'engagement ou la routine, et ton absorption dans tes idées peut te faire négliger d'entretenir les liens. Ton chemin, c'est d'apprendre à exprimer ce que tu ressens, à voir l'engagement profond non comme une prison mais comme une exploration en soi, et à cultiver activement les amitiés qui comptent, même quand ton esprit était ailleurs.`,

    "INTP-V3": `En amour comme en amitié, tu apportes une combinaison rare : la profondeur de compréhension d'un analyste et la chaleur de quelqu'un qui se soucie vraiment. Tu offres à l'autre la sensation d'être vraiment compris, vu jusque dans ses contradictions, accepté sans jugement. Tu es souvent le confident, celui à qui l'on se confie, et tes proches comptent vraiment pour toi, souvent mieux compris par toi qu'ils ne se comprennent eux-mêmes. Tu cherches une vraie intimité psychologique, des échanges qui vont au fond des choses.

Tes défis viennent de ta nature : ta tendance à analyser peut te faire suranalyser la relation, ton oscillation entre distance et connexion peut désorienter l'autre, et tu peux donner beaucoup d'écoute sans te livrer en retour. Ton chemin, c'est de t'autoriser à ressentir et à partager, pas seulement à comprendre, de vivre la relation autant que de l'analyser, et d'oser te livrer pour que tes liens gagnent en réciprocité.`,
  },

  // ---------------------------------------------------------------------------
  // Texte « Professionnel » (~2 paragraphes) par variante.
  // ---------------------------------------------------------------------------
  proTexte: {
    "INTP-V1": `Au travail, tu es fait pour les rôles où l'on analyse, où l'on conçoit, où l'on résout des problèmes complexes. Tu t'étioles dans l'exécution répétitive et l'agitation sans réflexion ; tu prends vie quand on te confie un problème difficile et abstrait qui demande de la rigueur et de la créativité. Tu excelles partout où la logique et la profondeur font la différence, la recherche, les sciences, l'informatique, l'analyse de systèmes, la philosophie, l'ingénierie conceptuelle. Le statut t'importe peu : c'est la qualité et l'élégance de ta réflexion qui comptent.

Tu as un besoin vital d'autonomie : le micro-management et les interruptions constantes te rendent improductif. Ton défi principal découle de ta nature : ton perfectionnisme et ton analyse sans fin peuvent te faire rester dans la réflexion sans jamais livrer. Apprendre à finir, à concrétiser, à accepter le « suffisamment bon » et à communiquer tes idées de façon accessible est ce qui transforme le penseur brillant en contributeur dont la valeur est reconnue.`,

    "INTP-V2": `Au travail, tu es fait pour les rôles qui sollicitent ta créativité et ta curiosité, et qui t'offrent de la variété. Tu t'étioles dans l'exécution répétitive et le cadre rigide ; tu prends vie quand on te confie des problèmes neufs et de l'espace pour inventer. Tu excelles partout où l'innovation et la pensée transversale font la différence, la recherche et le développement, les domaines créatifs et techniques, le conseil, les métiers à la croisée de plusieurs disciplines. Tu es à ton meilleur dans des rôles polyvalents, où ta curiosité est un atout plutôt qu'un handicap.

Tu as un besoin vital de liberté : les procédures rigides et la routine t'asphyxient. Ton défi principal découle de ta nature : ta dispersion et ta difficulté à approfondir et à finir peuvent nuire à ta progression. Le monde professionnel récompense ceux qui creusent et qui livrent, pas seulement ceux qui ont des idées. Apprendre à te concentrer, à mener tes projets à terme et à t'entourer de personnes qui concrétisent transforme ton potentiel créatif en réussite reconnue.`,

    "INTP-V3": `Au travail, tu es fait pour les rôles où l'analyse rencontre l'humain. Tu t'étioles dans l'exécution froide et impersonnelle comme dans le travail relationnel sans profondeur ; tu prends vie quand tu peux comprendre les êtres, éclairer, conseiller et mettre ton intelligence au service de quelque chose d'humain. Tu excelles partout où il faut comprendre les gens en profondeur, la psychologie, le conseil et l'accompagnement, les sciences humaines, l'écriture qui explore l'âme, l'enseignement. Le purement mécanique ou commercial te laisse froid.

Tu as besoin d'autonomie et d'un environnement qui valorise la réflexion et l'humain : les ambiances déshumanisées te rendent malheureux. Ton défi principal découle de ta nature : tu peux rester dans la compréhension sans concrétiser, ou hésiter à trancher et à t'affirmer. Apprendre à passer de l'analyse à l'action, à finir et à défendre tes idées est ce qui transforme ta belle intelligence relationnelle en contributions concrètes et reconnues.`,
  },

  // ---------------------------------------------------------------------------
  // Section « Mindset & dév personnel » : aperçu (accroche gratuite) par variante.
  // ---------------------------------------------------------------------------
  mindsetTexte: {
    "INTP-V1": {
      apercu: `Ton plus grand chantier n'est pas de penser mieux, tu le fais déjà admirablement, c'est de faire sortir ta pensée de ta tête. Tu portes une rigueur et une profondeur immenses, mais aussi un perfectionnisme qui paralyse, un amour de l'abstraction qui éloigne du réel, et une difficulté à conclure et à te relier. La bonne nouvelle, c'est que ces fragilités sont précisément les leviers sur lesquels tout ton esprit peut s'appuyer pour grandir.`,
    },
    "INTP-V2": {
      apercu: `Ton plus grand chantier n'est pas de trouver des idées, tu n'en manques jamais, c'est d'en faire exister quelques-unes pleinement. Tu portes une curiosité et une créativité inépuisables, mais aussi une tendance à te disperser, à survoler sans approfondir et à fuir vers la prochaine nouveauté. La bonne nouvelle, c'est que ces fragilités sont le terrain même où ta curiosité a le plus à gagner, dès que tu sais l'orienter.`,
    },
    "INTP-V3": {
      apercu: `Ton plus grand chantier n'est pas de comprendre les autres, tu le fais mieux que presque personne, c'est d'apprendre à te relier pleinement à eux. Tu portes une lucidité et une chaleur rares, mais aussi une tendance à observer plutôt qu'à vivre, à suranalyser les liens et à négliger tes propres émotions. La bonne nouvelle, c'est que ces fragilités sont la porte d'entrée de ta plus belle évolution, pour peu que tu saches par où commencer.`,
    },
  },

  // ---------------------------------------------------------------------------
  // Détail enrichi des grandes sections (clé Vx-section).
  // ---------------------------------------------------------------------------
  sectionDetail: {
    // ===================== V1 : ARCHITECTE LOGIQUE =====================
    "INTP-V1-relations": {
      forces: [
        { titre: "Une connexion par les idées", accent: "idées", texte: "Tu te lies par la pensée partagée et les conversations de fond, plus que par les conventions." },
        { titre: "Une loyauté solide", accent: "loyauté", texte: "Une fois engagé, tu offres une présence honnête, fiable et durable, sans jeu ni séduction." },
        { titre: "Le respect de l'autonomie", accent: "autonomie", texte: "Tu valorises l'espace de chacun et tu n'étouffes jamais l'autre de ta présence." },
        { titre: "Une profondeur rare", accent: "profondeur", texte: "Tu offres une sincérité et une intensité que peu savent donner, loin du bavardage de surface." },
        { titre: "Une présence sans masque", accent: "masque", texte: "Avec toi, l'autre peut être lui-même sans avoir à jouer un rôle social." },
        { titre: "Un choix réfléchi", accent: "réfléchi", texte: "Quand tu choisis quelqu'un, c'est mûri et sincère, et cela rend tes liens d'autant plus sûrs." },
      ],
      ombres: [
        { titre: "Une expression maladroite", accent: "expression", texte: "Tu ressens, mais tu ne sais pas toujours le montrer, et l'autre peut te croire froid." },
        { titre: "La vérité avant le tact", accent: "tact", texte: "Tu peux privilégier l'exactitude brute sur la délicatesse et blesser sans le vouloir." },
        { titre: "Des proches négligés", accent: "négligés", texte: "Perdu dans tes pensées, tu peux oublier d'entretenir les liens ou paraître inaccessible." },
        { titre: "Les émotions comme problèmes", accent: "problèmes", texte: "Tu peux traiter les sentiments de l'autre comme des équations à résoudre plutôt qu'à accueillir." },
        { titre: "Une chaleur peu offerte", accent: "chaleur", texte: "Ta fiabilité est réelle, mais la tendresse exprimée ne te vient pas spontanément." },
        { titre: "Un attachement invisible", accent: "invisible", texte: "Tes proches ne devinent pas toujours à quel point tu tiens à eux, faute de signes." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "Les relations de surface, le bavardage convenu qui t'épuise.",
            "Les personnes possessives qui rognent ton besoin d'espace.",
            "Le drame émotionnel permanent et les reproches.",
            "Qu'on prenne ta réserve pour de l'indifférence.",
            "Devoir jouer un rôle social pour être accepté.",
          ],
        },
        {
          ton: "positif",
          items: [
            "Des liens où l'on peut explorer les idées sans craindre le jugement.",
            "Un partenaire qui respecte ton monde intérieur et ton besoin de solitude.",
            "De l'autonomie offerte et reçue, dans les deux sens.",
            "Une stimulation intellectuelle et des conversations de fond.",
            "Quelqu'un qui voit la profondeur sous ton apparente distance.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Les tempéraments très demandeurs émotionnellement.",
            "Les profils possessifs ou contrôlants.",
            "Les personnalités attachées aux conventions et à la routine.",
          ],
          profils: [
            { code: "ESFJ", raison: "son besoin d'expression émotionnelle constante peut te peser et te paraître envahissant." },
            { code: "ENFJ", raison: "sa quête d'intensité affective peut te demander plus de chaleur exprimée que tu n'en offres." },
            { code: "ESTJ", raison: "son attachement aux règles et à la structure entre en friction avec ton besoin de liberté." },
          ],
        },
        {
          ton: "positif",
          items: [
            "Les esprits intuitifs qui partagent ton goût des idées.",
            "Les tempéraments chaleureux qui t'apportent l'équilibre émotionnel.",
            "Ceux qui respectent ton espace sans te croire indifférent.",
          ],
          profils: [
            { code: "ENTP", raison: "il partage ton goût du débat et de l'abstraction, et stimule ta pensée sans la brider." },
            { code: "INFJ", raison: "sa profondeur et sa chaleur t'apportent l'équilibre émotionnel qui te manque." },
            { code: "INTJ", raison: "même longueur d'onde intellectuelle, avec une capacité à conclure qui te complète." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Tu offres une loyauté et une profondeur rares,\nmais ton silence sur ce que tu ressens peut faire douter ceux que tu aimes.",
        lumiere:
          "Ta fiabilité, ta sincérité et ta présence sans masque font de toi un proche solide, auprès de qui on peut vraiment être soi.",
        ombre:
          "Mais à taire tes émotions, à privilégier la vérité sur le tact et à négliger l'entretien des liens, tu peux laisser tes proches dans le doute.",
        bascule:
          "Le jour où tu oses exprimer ce que tu ressens et offrir de la chaleur autant que de la fiabilité, tes liens deviennent aussi profonds que sûrs.",
      },
    },

    "INTP-V1-carriere": {
      forces: [
        { titre: "Une analyse d'exception", accent: "analyse", texte: "Tu démontes les problèmes complexes et tu construis des solutions d'une rigueur rare." },
        { titre: "Une concentration profonde", accent: "concentration", texte: "Tu plonges dans un sujet et tu donnes le meilleur dans de longues plages de réflexion ininterrompue." },
        { titre: "Une fiabilité de conclusion", accent: "fiabilité", texte: "Quand tu as creusé un problème, on peut s'appuyer sur ton analyse sans crainte." },
        { titre: "Une créativité de solutions", accent: "créativité", texte: "Tu trouves des approches originales que les esprits conventionnels n'imaginent pas." },
        { titre: "Un moteur, la curiosité", accent: "curiosité", texte: "Pour un problème qui te passionne, tu déploies une énergie et une endurance phénoménales." },
        { titre: "Un détachement du statut", accent: "détachement", texte: "Seules la qualité et l'élégance de ta réflexion comptent, jamais le paraître ni la politique." },
      ],
      ombres: [
        { titre: "Le perfectionnisme qui bloque", accent: "perfectionnisme", texte: "À chercher l'analyse impeccable, tu peux rester dans la réflexion sans jamais livrer." },
        { titre: "L'exécution qui résiste", accent: "exécution", texte: "Passer de l'idée à la réalisation concrète te coûte et t'ennuie." },
        { titre: "Une difficulté à conclure", accent: "conclure", texte: "Tu vois toujours un angle de plus à examiner, ce qui repousse indéfiniment la décision." },
        { titre: "Une énergie intermittente", accent: "intermittente", texte: "Tu fonctionnes par poussées d'intérêt : ce qui t'ennuie, tu peines à t'y forcer." },
        { titre: "Une communication peu accessible", accent: "communication", texte: "Tu peux peiner à rendre tes idées brillantes claires et partageables pour les autres." },
        { titre: "Une organisation négligée", accent: "organisation", texte: "Plannings, échéances et structure du quotidien ne te viennent pas naturellement." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "L'exécution répétitive et le travail superficiel.",
            "Le micro-management et les interruptions constantes.",
            "Les règles arbitraires et la bureaucratie.",
            "Les environnements anti-intellectuels ou purement opérationnels.",
            "La pression de résultat immédiat sans temps de réflexion.",
          ],
        },
        {
          ton: "positif",
          items: [
            "Des problèmes complexes et abstraits à résoudre.",
            "De l'autonomie et de longues plages de concentration.",
            "La liberté de creuser en profondeur à ton rythme.",
            "Un environnement qui valorise la rigueur et l'intelligence.",
            "Le temps de réfléchir sans pression constante.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Les postes d'exécution répétitive et superficielle.",
            "Les environnements bureaucratiques et très hiérarchiques.",
            "Le travail purement opérationnel sans réflexion.",
          ],
          profils: [
            { nom: "Saisie, exécution répétitive", raison: "des tâches mécaniques qui éteignent ton besoin de comprendre." },
            { nom: "Postes très bureaucratiques", raison: "règles arbitraires et micro-management qui t'asphyxient." },
            { nom: "Opérationnel sans réflexion", raison: "ni profondeur ni problème complexe pour te nourrir." },
          ],
        },
        {
          ton: "positif",
          items: [
            "La recherche, les sciences et les mathématiques.",
            "L'informatique, la programmation et l'analyse de systèmes.",
            "La philosophie et l'ingénierie conceptuelle.",
          ],
          profils: [
            { nom: "Recherche & sciences", raison: "chercheur, scientifique, mathématicien : creuser les problèmes en profondeur." },
            { nom: "Informatique & systèmes", raison: "développeur, architecte logiciel, analyste : concevoir des solutions rigoureuses." },
            { nom: "Pensée conceptuelle", raison: "philosophe, ingénieur, stratège : construire des cadres de pensée solides." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Ta rigueur peut produire des analyses d'une vraie valeur,\nmais sans conclure ni livrer, elles risquent de ne jamais voir le jour.",
        lumiere:
          "Profond, fiable et créatif, tu éclaires des problèmes complexes que peu de gens maîtrisent vraiment.",
        ombre:
          "Mais ton perfectionnisme, ta difficulté à conclure et à exécuter peuvent laisser ta brillance enfermée dans ta tête.",
        bascule:
          "Le jour où tu acceptes le « suffisamment bon », où tu finis et concrétises, tu passes du penseur brillant au contributeur dont la valeur est reconnue.",
      },
    },

    "INTP-V1-developpement": {
      evolution: `Loin d'être gravée une fois pour toutes, ta personnalité évolue, et ton type connaît l'une des trajectoires de maturation les plus nettes. Plus jeune, tu es tout entier dans ta tête : la logique, l'analyse, les idées. C'est brillant, mais souvent déconnecté du concret et des autres, perdu dans tes pensées, mal à l'aise avec les émotions, incapable de conclure ou d'agir.

Avec le temps, tu comprends que comprendre ne suffit pas, qu'une idée qui ne se concrétise ni ne se partage ne sert à rien. Tu apprends à agir, à conclure, à accepter l'imparfait, à te connecter aux autres et à tes propres émotions, sans rien perdre de ta rigueur. Dans ta pleine maturité, tu deviens un esprit rigoureux qui sait aussi agir et se relier, dont les idées brillantes prennent forme dans le monde au lieu de rester enfermées : la version la plus puissante de toi. Et c'est entièrement à ta portée.`,
      etapes: [
        "Tu poses déjà mille questions et tu refuses les réponses toutes faites. Curieux du comment et du pourquoi, tu démontes les choses pour comprendre ce qui les fait fonctionner.",
        "Tu vis pleinement dans ta tête : la logique, les théories, l'exploration des idées. C'est brillant, mais souvent coupé du concret et des autres. T'affirmer, conclure et exprimer tes émotions ne va pas encore de soi. Une période intense, où ta puissance intellectuelle cherche encore sa prise sur le réel.",
        "Tu comprends que comprendre ne suffit pas. Tu apprends à agir, à conclure, à accepter l'imparfait et à te relier aux autres et à tes émotions, sans rien perdre de ta rigueur.",
        "Dans ta pleine maturité, tu es un esprit rigoureux qui sait aussi agir et se relier. Tes idées prennent enfin forme dans le monde au lieu de rester enfermées : c'est toi, pleinement déployé.",
      ],
      leviersForts: [
        { titre: "Apprends à conclure et à agir", texte: "C'est ton plus grand levier. Impose-toi de finir et de concrétiser, même imparfaitement : l'action donne à ta pensée une valeur réelle que l'analyse infinie ne lui donnera jamais." },
        { titre: "Ancre-toi dans le concret", texte: "Cultive un projet tangible, une activité où tu appliques tes idées. Cet ancrage équilibre ton esprit toujours dans l'abstrait et donne une prise à ta brillance." },
        { titre: "Développe ton intelligence émotionnelle", texte: "Reconnaître et exprimer ce que tu ressens ne diminue en rien ta rigueur : ça la complète d'une dimension humaine qui te rend plus accompli et tes liens plus profonds." },
        { titre: "Cultive les liens qui comptent", texte: "Fais l'effort d'aller vers les rares personnes qui comptent et de montrer ton attachement. La connexion humaine enrichit ta vie et te sort de l'isolement qui te guette." },
      ],
      questions: [
        { situation: "Quand tu peaufines sans fin une analyse", question: "Est-ce vraiment meilleur, ou est-ce que je repousse le moment de livrer ?" },
        { situation: "Quand tu repousses une décision", question: "Quelle certitude j'attends, et viendra-t-elle vraiment un jour ?" },
        { situation: "Quand un proche se confie", question: "Est-ce qu'il attend une solution, ou juste que je l'accueille ?" },
        { situation: "Quand tu te perds dans tes pensées", question: "De quelle action concrète suis-je en train de m'éloigner ?" },
        { situation: "Quand une émotion monte en toi", question: "Est-ce que je l'accueille, ou est-ce que je cherche déjà à la résoudre ?" },
      ],
      paradoxe: {
        tension:
          "Pour grandir, tu dois apprendre à agir et à te relier,\nmais tu crains qu'en sortant de l'analyse, tu perdes ta rigueur.",
        lumiere:
          "Ta logique, ta profondeur et ton humilité intellectuelle sont une base de croissance immense : tu as déjà tout en toi pour devenir une version accomplie de toi-même.",
        ombre:
          "Mais à rester dans ta tête, à ne jamais conclure ni te relier, ta puissance peut demeurer un trésor stérile sans prise sur le monde.",
        bascule:
          "Le jour où tu comprends qu'agir et te relier ne trahit pas ta rigueur mais lui donne enfin une prise sur le réel, ta croissance s'enclenche vraiment.",
      },
      motRoute: `Tu es un Architecte Logique, un de ces esprits rares dont la rigueur et la profondeur de pensée forcent le respect. Ne laisse jamais personne te convaincre que ton besoin de comprendre est de trop : c'est ta force et ta marque. Il te reste une seule grande conquête, l'aventure d'une vie : faire sortir ta pensée de ta tête pour qu'elle existe dans le monde. L'édifice est conçu, à toi de le bâtir dans le réel.`,
    },

    // ===================== V2 : EXPLORATEUR D'IDÉES =====================
    "INTP-V2-relations": {
      forces: [
        { titre: "Une séduction par l'esprit", accent: "esprit", texte: "Tu attires par ta capacité à surprendre et à stimuler : une conversation fascinante vaut tous les dîners." },
        { titre: "Une liberté offerte", accent: "liberté", texte: "Tu respectes l'espace de l'autre et tu n'enfermes jamais, dans les deux sens." },
        { titre: "Une curiosité connectrice", accent: "curiosité", texte: "Ton ouverture te lie à toutes sortes de gens intéressants, dans des univers très variés." },
        { titre: "Des échanges sans ennui", accent: "échanges", texte: "Avec toi, les conversations partent dans tous les sens et ne s'épuisent jamais." },
        { titre: "Une loyauté à ta façon", accent: "loyauté", texte: "Sincère, tu offres la complicité intellectuelle et la liberté plus que les conventions." },
        { titre: "Une présence facile à vivre", accent: "facile", texte: "Tu es souple, ouvert et peu exigeant sur la forme, ce qui rend le lien léger et vivant." },
      ],
      ombres: [
        { titre: "Une expression maladroite", accent: "expression", texte: "Tu ressens, mais tu ne sais pas toujours le montrer, et l'autre peut te croire distant." },
        { titre: "La peur de l'engagement", accent: "engagement", texte: "Ton besoin de nouveauté peut te faire craindre la routine du couple et fuir de t'engager." },
        { titre: "Des liens peu entretenus", accent: "entretenus", texte: "Absorbé par ta prochaine exploration, tu peux passer des semaines sans donner signe de vie." },
        { titre: "Des besoins affectifs négligés", accent: "affectifs", texte: "À vivre dans tes idées, tu peux oublier les besoins concrets de ton partenaire." },
        { titre: "Une difficulté à se poser", accent: "poser", texte: "Quelqu'un de trop routinier t'étouffe, et tu peux confondre stabilité et ennui." },
        { titre: "Une attention qui file", accent: "attention", texte: "Ton esprit capté par un nouveau sujet peut donner l'impression d'un désintérêt qui n'existe pas." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "La routine figée, sans nouveauté ni stimulation.",
            "Les personnes possessives qui cherchent à t'enfermer.",
            "Le bavardage convenu sans ouverture ni idées.",
            "Le contrôle qui rogne ta liberté mentale.",
            "Qu'on prenne ton absence pour du désintérêt.",
          ],
        },
        {
          ton: "positif",
          items: [
            "Des liens où l'on explore des idées sans fin.",
            "Un partenaire qui partage ta curiosité et te laisse explorer.",
            "De la liberté et de l'espace mental.",
            "De la nouveauté et une relation qui reste vivante.",
            "Quelqu'un qui te stimule sans chercher à te brider.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Les tempéraments possessifs ou très demandeurs.",
            "Les profils attachés à la routine et aux conventions.",
            "Les personnalités rigides qui supportent mal le changement.",
          ],
          profils: [
            { code: "ISFJ", raison: "son besoin de stabilité et de routine cadre mal avec ta soif de nouveauté." },
            { code: "ESTJ", raison: "son attachement aux règles et au cadre rigide étouffe ta liberté d'explorer." },
            { code: "ESFJ", raison: "sa demande de présence et d'expression émotionnelle constante peut te peser." },
          ],
        },
        {
          ton: "positif",
          items: [
            "Les esprits curieux et ouverts qui partagent ton goût des idées.",
            "Les tempéraments chaleureux qui t'apportent l'ancrage émotionnel.",
            "Ceux qui t'aident doucement à finir ce que tu commences.",
          ],
          profils: [
            { code: "ENTP", raison: "même soif d'exploration et de débat, vous ne vous ennuyez jamais ensemble." },
            { code: "ENFP", raison: "son enthousiasme et son ouverture résonnent avec ta curiosité, avec en prime la chaleur." },
            { code: "INFJ", raison: "sa profondeur et sa capacité à structurer t'ancrent et t'aident à concrétiser." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Tu rêves d'une relation vivante et stimulante,\nmais ton besoin de nouveauté peut te faire fuir la profondeur d'un lien durable.",
        lumiere:
          "Ta curiosité, ta liberté offerte et ta façon de ne jamais ennuyer font de toi un partenaire et un ami auprès de qui l'esprit ne s'éteint jamais.",
        ombre:
          "Mais à craindre l'engagement, à négliger les liens et à laisser ton attention filer, tu peux fragiliser les relations qui comptent.",
        bascule:
          "Le jour où tu découvres que l'engagement profond est une exploration en soi, et non une prison, ta curiosité trouve enfin où s'enraciner.",
      },
    },

    "INTP-V2-carriere": {
      forces: [
        { titre: "Une créativité féconde", accent: "créativité", texte: "Là où d'autres sont bloqués, toi tu vois dix pistes : tu débloques les situations par l'imagination." },
        { titre: "Une pensée transversale", accent: "transversale", texte: "Tu relies des domaines que les spécialistes cloisonnés ne relient jamais, source des vraies innovations." },
        { titre: "Une curiosité d'ampleur", accent: "curiosité", texte: "Tu accumules des savoirs variés et tu apportes des perspectives que les experts ne voient pas." },
        { titre: "Une adaptabilité réelle", accent: "adaptabilité", texte: "Tu navigues dans des contextes variés et tu rebondis avec aisance quand les choses changent." },
        { titre: "Un moteur, la curiosité", accent: "moteur", texte: "Quand un problème t'allume, tu déploies une énergie et une créativité phénoménales." },
        { titre: "Une résolution originale", accent: "originale", texte: "Tu abordes les problèmes sous des angles que personne n'aurait imaginés." },
      ],
      ombres: [
        { titre: "La dispersion", accent: "dispersion", texte: "Tu commences mille projets et tu en finis peu, car un nouveau sujet t'appelle toujours." },
        { titre: "Le survol permanent", accent: "survol", texte: "À tout effleurer, tu peux ne devenir vraiment compétent en rien." },
        { titre: "Une difficulté à finir", accent: "finir", texte: "L'idée neuve t'excite, le suivi laborieux t'ennuie, et tes projets restent inachevés." },
        { titre: "Une énergie intermittente", accent: "intermittente", texte: "Tu fonctionnes par éclairs d'intérêt : ce qui t'ennuie, tu peines à t'y forcer." },
        { titre: "La fuite dans la nouveauté", accent: "fuite", texte: "Filer vers la prochaine idée peut devenir une façon d'éviter le travail difficile de concrétiser." },
        { titre: "Une organisation négligée", accent: "organisation", texte: "La structure, les échéances et la constance ne te viennent pas naturellement." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "L'exécution répétitive et le travail mécanique.",
            "Le micro-management et les procédures rigides.",
            "La spécialisation étroite et la routine.",
            "Les environnements bureaucratiques ou figés.",
            "Tout ce qui t'enferme sur un seul sujet sans variété.",
          ],
        },
        {
          ton: "positif",
          items: [
            "De la variété et des problèmes neufs à résoudre.",
            "De la liberté et de l'espace pour inventer.",
            "Des rôles polyvalents à la croisée de disciplines.",
            "L'innovation et la résolution créative de problèmes.",
            "De l'autonomie pour explorer à ta façon.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Les postes d'exécution répétitive et spécialisée.",
            "Les environnements bureaucratiques et figés.",
            "Le travail routinier sans variété ni nouveauté.",
          ],
          profils: [
            { nom: "Exécution répétitive", raison: "des tâches mécaniques qui éteignent ta curiosité." },
            { nom: "Spécialisation étroite", raison: "un seul sujet imposé qui t'ennuie et te bride." },
            { nom: "Bureaucratie rigide", raison: "des procédures figées sans place pour inventer." },
          ],
        },
        {
          ton: "positif",
          items: [
            "La recherche, le développement et l'innovation.",
            "Les domaines créatifs et techniques.",
            "Le conseil et les métiers transversaux.",
          ],
          profils: [
            { nom: "Recherche & innovation", raison: "R&D, prospective, design : inventer et relier des idées neuves." },
            { nom: "Conseil & analyse", raison: "consultant, analyste : aborder des problèmes variés sous des angles neufs." },
            { nom: "Métiers transversaux", raison: "entrepreneuriat, projets multidisciplinaires : épouser ta curiosité tous azimuts." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Tes idées pourraient changer les choses,\nmais sans en finir aucune, elles risquent de rester de simples idées.",
        lumiere:
          "Créatif, curieux et ouvert, tu vois des possibles partout et tu apportes le souffle du neuf là où tu passes.",
        ombre:
          "Mais ta dispersion, ton survol et ta difficulté à finir peuvent laisser tes meilleures idées en chantier.",
        bascule:
          "Le jour où tu choisis quelques idées et tu te donnes juste assez de focus pour les mener au bout, ta fertilité se transforme en réalisations reconnues.",
      },
    },

    "INTP-V2-developpement": {
      evolution: `Rien n'est figé en toi : ta personnalité se transforme avec les années, et ton type suit pour cela une trajectoire de croissance singulièrement marquée. Plus jeune, tu es tout entier dans ton bouillonnement : la curiosité, les idées, l'exploration tous azimuts. C'est lumineux et créatif, mais souvent dispersé : tu commences mille choses, tu en finis peu, tu papillonnes sans jamais approfondir.

Avec le temps, tu comprends qu'avoir des idées ne suffit pas, qu'il faut en choisir quelques-unes et les mener jusqu'au bout pour qu'elles existent. Tu apprends à te concentrer, à approfondir, à finir, sans renoncer à ta curiosité, et tu te relies davantage aux autres et à tes émotions. Dans ta pleine maturité, tu deviens un esprit créatif et curieux qui sait aussi se concentrer et concrétiser, dont les idées foisonnantes débouchent sur des réalisations réelles : la version la plus puissante de toi. Et c'est entièrement à ta portée.`,
      etapes: [
        "Curieux de tout, tu touches à tout, tu te passionnes pour un sujet une semaine et un autre la suivante. Le monde entier est ton terrain de jeu intellectuel.",
        "Ton bouillonnement est à son comble : tu explores tous azimuts, plein d'idées et de connexions. C'est lumineux, mais souvent dispersé : tu commences beaucoup, tu finis peu, et approfondir ne va pas encore de soi. Une période foisonnante, où ta fertilité cherche encore son focus.",
        "Tu comprends que tes idées ne valent que menées jusqu'au bout. Tu apprends à en choisir quelques-unes, à approfondir et à finir, sans rien perdre de ta curiosité.",
        "Dans ta pleine maturité, tu es un explorateur qui sait aussi concrétiser. Tu as gardé ta créativité, mais tu sais désormais en faire quelque chose de réel : c'est toi, enfin abouti.",
      ],
      leviersForts: [
        { titre: "Apprends à te concentrer et à finir", texte: "C'est ton plus grand levier. Choisis, parmi tes mille idées, un petit nombre que tu mèneras vraiment au bout : la satisfaction d'achever te prouvera de quoi tu es capable." },
        { titre: "Ose approfondir un sujet", texte: "De temps en temps, creuse un sujet au-delà du point où l'ennui apparaît. C'est là, dans la profondeur, que ta curiosité se transforme en expertise réelle." },
        { titre: "Apprivoise un minimum de structure", texte: "Pas une organisation rigide, mais quelques outils simples et flexibles qui canalisent ton énergie. Vois la structure comme ce qui libère ta créativité au lieu de la disperser." },
        { titre: "Entoure-toi de complémentaires", texte: "Associe-toi à des personnes qui apportent la constance et le suivi. Les meilleures réussites naissent de l'alliance d'un créatif foisonnant et d'un réalisateur méthodique." },
      ],
      questions: [
        { situation: "Quand une nouvelle idée t'emballe", question: "Est-ce que je vais la mener au bout, ou juste l'ajouter à la pile de mes débuts ?" },
        { situation: "Quand l'ennui pointe sur un projet", question: "Est-ce le bon moment de m'arrêter, ou celui où la profondeur commence ?" },
        { situation: "Quand tu files vers du neuf", question: "Est-ce que j'explore, ou est-ce que je fuis le travail de finir ?" },
        { situation: "Quand tu gardes toutes tes options ouvertes", question: "Qu'est-ce que ce refus de choisir m'empêche de vraiment vivre ?" },
        { situation: "Quand un proche attend de tes nouvelles", question: "Mon silence vient-il d'un désintérêt, ou juste d'un esprit ailleurs ?" },
      ],
      paradoxe: {
        tension:
          "Pour que tes idées existent, tu dois t'imposer un peu de focus,\nmais tu crains qu'en te concentrant, tu étouffes ta curiosité.",
        lumiere:
          "Ta créativité, ton ouverture et ta soif de découverte sont une force rare : tu as déjà tout ce qu'il faut pour inventer ce que personne d'autre n'imaginerait.",
        ombre:
          "Mais sans jamais choisir ni finir, tes plus belles idées risquent de rester pour toujours à l'état de débuts épars.",
        bascule:
          "Le jour où tu vois le focus non comme une prison mais comme ce qui fait naître tes idées, ta fertilité se transforme enfin en œuvres.",
      },
      motRoute: `Tu es un Explorateur d'Idées, un de ces esprits rares dont la curiosité et la créativité ne connaissent pas de limites. Ne laisse jamais personne te convaincre que ta curiosité est de la dispersion : c'est la source de ta créativité, et elle est précieuse. Il te reste une seule grande conquête, l'aventure d'une vie : transformer ta fertilité d'idées en réalisations concrètes. La carte est immense, à toi d'explorer pour de vrai.`,
    },

    // ===================== V3 : PENSEUR HUMANISTE =====================
    "INTP-V3-relations": {
      forces: [
        { titre: "Le don d'être compris", accent: "compris", texte: "Tu offres à l'autre la sensation d'être vu jusque dans ses contradictions, accepté sans jugement." },
        { titre: "Une analyse chaleureuse", accent: "chaleureuse", texte: "Tu allies la lucidité de l'analyste à une vraie douceur, sans jamais réduire l'autre à une équation." },
        { titre: "Une attention fine", accent: "attention", texte: "Tu perçois ce que ton proche ressent souvent avant qu'il ne le dise, et tu peux y répondre." },
        { titre: "Un rôle de confident", accent: "confident", texte: "Les gens se confient à toi, car auprès de toi on se sent compris et non jugé." },
        { titre: "Une loyauté sincère", accent: "loyauté", texte: "Tes proches comptent vraiment, et tu les comprends souvent mieux qu'ils ne se comprennent." },
        { titre: "Une intimité profonde", accent: "intimité", texte: "Tu cherches la vraie connexion psychologique, loin de toute superficialité." },
      ],
      ombres: [
        { titre: "La suranalyse du lien", accent: "suranalyse", texte: "Tu peux transformer un simple malentendu en cas à décortiquer, jusqu'à t'en faire un nœud." },
        { titre: "Une oscillation déroutante", accent: "oscillation", texte: "Ton va-et-vient entre distance et connexion peut désorienter celui qui t'aime." },
        { titre: "Des émotions peu vécues", accent: "vécues", texte: "Tu comprends si bien celles des autres, mais tu peux peiner à vivre et exprimer les tiennes." },
        { titre: "Un déséquilibre du partage", accent: "partage", texte: "Tu donnes beaucoup d'écoute sans toujours te livrer autant en retour." },
        { titre: "Le refuge dans l'observation", accent: "observation", texte: "Tu peux rester un peu en retrait, dans le rôle de celui qui comprend tout mais s'expose peu." },
        { titre: "La compréhension sans acte", accent: "acte", texte: "Tu peux comprendre une situation longtemps sans jamais passer à l'action ni t'engager." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "La superficialité et les liens sans profondeur.",
            "Les ambiances tendues, conflictuelles ou déshumanisées.",
            "Qu'on abuse de ton écoute sans rien offrir en retour.",
            "Les personnes fermées à l'introspection.",
            "Devoir cacher ce que tu ressens vraiment.",
          ],
        },
        {
          ton: "positif",
          items: [
            "Une vraie intimité psychologique et des échanges de fond.",
            "Un partenaire qui cherche à te comprendre en retour.",
            "Du respect pour ton besoin d'espace mental.",
            "Quelqu'un qui t'encourage à vivre tes émotions, pas seulement à les analyser.",
            "Des liens où l'on explore aussi bien les idées que les sentiments.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Les profils très factuels, fermés à l'introspection.",
            "Les tempéraments durs ou peu intéressés par le pourquoi humain.",
            "Les personnalités qui supportent mal d'être analysées.",
          ],
          profils: [
            { code: "ESTP", raison: "son pragmatisme direct peut juger ton intérêt pour le pourquoi humain comme du temps perdu." },
            { code: "ESTJ", raison: "son attachement aux faits et aux règles laisse peu de place à la dimension psychologique." },
            { code: "ISTP", raison: "sa réserve et son détachement émotionnel peuvent te laisser sur ta faim relationnelle." },
          ],
        },
        {
          ton: "positif",
          items: [
            "Les esprits intuitifs tournés vers l'humain et le sens.",
            "Les tempéraments chaleureux qui t'aident à vivre tes émotions.",
            "Ceux qui cherchent à te comprendre autant que tu les comprends.",
          ],
          profils: [
            { code: "INFJ", raison: "il partage ton intérêt pour l'humain et le sens, et te comprend dans ta double nature." },
            { code: "ENFP", raison: "sa chaleur et son expressivité t'aident à vivre tes émotions et pas seulement à les analyser." },
            { code: "ENFJ", raison: "son attention aux gens rejoint la tienne, avec l'élan vers l'action qui te complète." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Tu comprends ceux que tu aimes mieux que personne,\nmais cette compréhension peut te tenir à distance de la connexion vivante.",
        lumiere:
          "Ta lucidité et ta chaleur font de toi un proche rare, auprès de qui on se sent vraiment compris et accepté.",
        ombre:
          "Mais à suranalyser le lien, à osciller entre distance et élan et à te livrer peu, tu peux rester spectateur de tes propres relations.",
        bascule:
          "Le jour où tu te plonges dans les liens au lieu de les analyser, et où tu oses te livrer, ta compréhension devient une vraie richesse de chaleur partagée.",
      },
    },

    "INTP-V3-carriere": {
      forces: [
        { titre: "La compréhension de l'humain", accent: "humain", texte: "Tu perçois les motivations et les dynamiques relationnelles, un atout dans tout métier de conseil." },
        { titre: "Une analyse bienveillante", accent: "bienveillante", texte: "Tu allies la rigueur de l'analyste à une chaleur qui éclaire sans écraser." },
        { titre: "Une lucidité sur les situations", accent: "lucidité", texte: "Tu vois les jeux relationnels et les non-dits, ce qui te rend précieux dans les contextes humains." },
        { titre: "Un travail nuancé", accent: "nuancé", texte: "Tu tiens compte de la complexité, notamment humaine, et tu produis un travail de qualité réfléchie." },
        { titre: "Un moteur, le sens", accent: "sens", texte: "Quand ton travail touche à l'humain et a un sens, tu donnes le meilleur de toi-même." },
        { titre: "Une décision plus humaine", accent: "décision", texte: "Tu intègres les conséquences sur les gens, pas seulement l'efficacité pure." },
      ],
      ombres: [
        { titre: "La compréhension sans concrétiser", accent: "concrétiser", texte: "Tu peux rester dans l'analyse d'une situation sans jamais passer à l'action." },
        { titre: "Une hésitation à trancher", accent: "trancher", texte: "Tu vois la complexité de chaque situation et tu hésites de peur de mal faire." },
        { titre: "La suranalyse", accent: "suranalyse", texte: "Tu peux décortiquer une situation jusqu'à l'épuisement au lieu d'agir." },
        { titre: "Une difficulté à t'affirmer", accent: "affirmer", texte: "Ta bienveillance peut te faire écouter sans jamais défendre tes idées ni tes besoins." },
        { titre: "Une sensibilité aux ambiances", accent: "ambiances", texte: "Les environnements tendus, conflictuels ou déshumanisés t'affectent profondément." },
        { titre: "Une organisation négligée", accent: "organisation", texte: "Absorbé par les gens et les idées, tu peux laisser le concret pratique dériver." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "L'exécution froide et impersonnelle.",
            "Le travail purement mécanique ou commercial.",
            "Les ambiances déshumanisées et la pression quantitative.",
            "Le micro-management et les environnements tendus.",
            "Un travail vide de sens et sans dimension humaine.",
          ],
        },
        {
          ton: "positif",
          items: [
            "Un travail qui allie analyse et compréhension des gens.",
            "Du sens et un cadre humain sain.",
            "De l'autonomie et le temps de réfléchir.",
            "Pouvoir comprendre, éclairer, conseiller et aider.",
            "Des collaborations respectueuses avec des gens que tu comprends.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Les milieux froids, mécaniques ou purement commerciaux.",
            "Les environnements déshumanisés et conflictuels.",
            "Les postes sans sens ni dimension humaine.",
          ],
          profils: [
            { nom: "Vente sous pression, finance pure", raison: "le chiffre au mépris du sens et des gens te laisse froid." },
            { nom: "Exécution impersonnelle", raison: "un travail mécanique sans contact humain ni profondeur." },
            { nom: "Environnements déshumanisés", raison: "des ambiances tendues qui t'affectent profondément." },
          ],
        },
        {
          ton: "positif",
          items: [
            "La psychologie, le conseil et l'accompagnement.",
            "Les sciences humaines et la recherche sur le comportement.",
            "L'enseignement et l'écriture qui explore l'âme.",
          ],
          profils: [
            { nom: "Psychologie & conseil", raison: "psychologue, coach, thérapeute : comprendre et éclairer les gens." },
            { nom: "Sciences humaines", raison: "chercheur, RH pensées intelligemment : analyser le comportement humain." },
            { nom: "Enseignement & écriture", raison: "enseignant, auteur : transmettre et explorer l'âme humaine." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Tu comprends l'humain avec une finesse rare,\nmais sans trancher ni agir, ta belle intelligence risque de rester sans effet.",
        lumiere:
          "Lucide, chaleureux et porté par le sens, tu éclaires les gens sur eux-mêmes avec autant de justesse que de douceur.",
        ombre:
          "Mais la suranalyse, l'hésitation à trancher et la difficulté à t'affirmer peuvent freiner la reconnaissance de ta valeur.",
        bascule:
          "Le jour où tu passes de l'analyse à l'action, où tu tranches et tu t'affirmes, ton intelligence relationnelle se transforme en contributions concrètes et reconnues.",
      },
    },

    "INTP-V3-developpement": {
      evolution: `Ta personnalité n'a rien de définitif : elle se construit au fil du temps, et ton type emprunte un chemin de maturation particulièrement net. Plus jeune, tu es souvent partagé entre ta tête et ton cœur : tu comprends les gens avec une finesse rare, mais tu restes en retrait, observateur, plus à l'aise pour analyser les émotions que pour les vivre.

Avec le temps, tu comprends que comprendre les gens ne suffit pas, qu'il faut aussi se relier à eux, se livrer, vivre les émotions et pas seulement les disséquer. Tu apprends à habiter ta propre vie intérieure, à t'exposer, à passer de l'observation à la participation, sans rien perdre de ta lucidité. Dans ta pleine maturité, tu deviens un esprit qui comprend l'humain en profondeur et qui sait aussi se relier pleinement, vivre ses émotions et agir : la version la plus riche de toi. Et c'est entièrement à ta portée.`,
      etapes: [
        "Tu observes déjà les gens avec une finesse rare et tu pressens ce qu'ils ressentent. Curieux des êtres, tu cherches à comprendre pourquoi ils font ce qu'ils font.",
        "Tu comprends les gens en profondeur, mais tu restes en retrait, observateur. Tu analyses les émotions plus que tu ne les vis, tu donnes de l'écoute sans te livrer, et tu hésites entre distance et connexion. Une période riche, où ta lucidité cherche encore à se relier pleinement.",
        "Tu comprends que comprendre ne suffit pas. Tu apprends à te livrer, à vivre tes émotions et à passer de l'observation à la participation, sans rien perdre de ta lucidité.",
        "Dans ta pleine maturité, tu comprends l'humain en profondeur et tu sais aussi te relier pleinement et vivre tes émotions. Tu es ce pont rare entre la tête et le cœur : c'est toi dans ta forme la plus entière.",
      ],
      leviersForts: [
        { titre: "Vis tes émotions, ne fais pas que les comprendre", texte: "C'est ton plus grand levier. Apprends à ressentir pleinement et à exprimer ce qui se passe en toi : ta compréhension de l'humain prend une tout autre dimension quand tu l'appliques à toi." },
        { titre: "Passe de l'observation à la participation", texte: "Engage-toi dans les relations au lieu de les analyser de loin. Vivre, agir, te relier, même imparfaitement, vaut mieux que de tout comprendre depuis le bord." },
        { titre: "Ose t'affirmer et te livrer", texte: "Tu donnes beaucoup d'écoute : apprends à prendre aussi ta place et à laisser les autres te comprendre en retour. Tes liens y gagneront en réciprocité et en profondeur." },
        { titre: "Cultive ta dimension humaine, ta vraie force", texte: "Continue de développer cette alliance de la lucidité et de la chaleur. Plus tu l'assumes, plus tu deviens ce pont rare entre l'analyse et l'humain dont le monde a besoin." },
      ],
      questions: [
        { situation: "Quand tu décortiques un message reçu", question: "Est-ce que j'analyse, ou est-ce que je m'invente un problème qui n'existe pas ?" },
        { situation: "Quand une émotion monte en toi", question: "Est-ce que je la ressens vraiment, ou est-ce que je l'observe de loin ?" },
        { situation: "Quand quelqu'un se confie longuement", question: "Est-ce que j'ose me livrer aussi, ou je reste le confident qui se cache ?" },
        { situation: "Quand tu comprends une situation sans agir", question: "Qu'est-ce que ma compréhension change vraiment si je ne fais rien ?" },
        { situation: "Quand tu t'effaces pour écouter", question: "De quel besoin à moi suis-je en train de me taire ?" },
      ],
      paradoxe: {
        tension:
          "Pour grandir, tu dois te relier autant que comprendre,\nmais tu te réfugies dans l'analyse là où il faudrait ressentir.",
        lumiere:
          "Ton alliance rare de la lucidité et de la sensibilité te fait comprendre l'humain comme peu de gens, et éclaire ce que les autres ne perçoivent pas.",
        ombre:
          "Mais à tout observer de loin sans jamais t'y plonger, tu risques de rester au bord de ta propre vie et de tes liens.",
        bascule:
          "Le jour où tu vis tes émotions au lieu de seulement les analyser, ta compréhension se fait chaleur, et tu deviens ce pont rare entre la tête et le cœur.",
      },
    },
  },
};

export default profilINTP;