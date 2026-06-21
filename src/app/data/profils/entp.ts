// =============================================================================
// CONTENU DU PROFIL ENTP (« Innovateur »), 3 variantes.
// V1 : Inventeur · V2 : Débatteur Analytique · V3 : Charmeur Visionnaire
// Source : rapports longs ENTP (V1/V2/V3). Même forme que l'exemple INFP de
// profils.ts. Voix « tu », aucun tiret long, mot-clé en vert via `accent`.
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
}

interface ProfilENTP {
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

const entp: ProfilENTP = {
  // ---------------------------------------------------------------------------
  // TRAITS (commun aux 3 variantes du type)
  // ---------------------------------------------------------------------------
  traitsTexte: {
    ENTP: `Ton esprit est tourné vers l'extérieur et vers les possibles : tu puises ton énergie dans l'échange, le débat et le mouvement des idées. Ton intuition file sans cesse vers ce qui pourrait être, vers les liens inattendus, vers l'inédit. Là où les autres voient un problème, tu vois dix solutions, cinq opportunités et trois idées que personne n'avait envisagées. Cette fontaine d'idées, alliée à un filtre logique qui teste tout, fait de toi à la fois un esprit créatif et un esprit critique d'exception.

Mais ton ouverture a un revers que peu soupçonnent : tu lances plus facilement que tu ne finis, tu te disperses entre mille pistes séduisantes, et le travail patient du suivi t'ennuie vite. Ce qui fait ton génie inventif peut aussi t'empêcher d'aboutir. Tout l'enjeu de ton chemin, c'est de canaliser ta créativité juste assez pour qu'elle produise des résultats réels : choisir parmi tes idées celles que tu mèneras vraiment au bout, sans rien perdre de ton inventivité ni de ta liberté.`,
  },

  // ---------------------------------------------------------------------------
  // DESCRIPTIONS DES VARIANTES (survol des barres)
  // ---------------------------------------------------------------------------
  descriptions: {
    "ENTP-V1":
      "Les Inventeurs sont les plus tournés vers la création et le lancement d'idées neuves. Leur esprit est une fontaine intarissable : ils voient des opportunités partout et adorent défricher les territoires inexplorés.",
    "ENTP-V2":
      "Les Débatteurs Analytiques sont les plus tournés vers l'analyse critique et la joute intellectuelle. Ils testent toute idée, traquent les failles et démontent les raisonnements bancals pour aller au fond des choses.",
    "ENTP-V3":
      "Les Charmeurs Visionnaires sont les plus tournés vers les gens et l'influence. Ils ne se contentent pas d'avoir des idées : ils savent les vendre, rallier les foules et transformer une vision en mouvement.",
  },

  // ---------------------------------------------------------------------------
  // ACCROCHES (héros)
  // ---------------------------------------------------------------------------
  accroches: {
    "ENTP-V1": "Tu ne vois pas un problème, tu vois dix solutions que personne n'avait imaginées.",
    "ENTP-V2": "Tu ne gobes aucune idée, tu la testes, tu la retournes, tu cherches ses failles.",
    "ENTP-V3": "Tu n'as pas seulement les idées, tu as le magnétisme pour les faire vivre.",
  },

  // ---------------------------------------------------------------------------
  // INTROS (~2 paragraphes, sous le héros)
  // ---------------------------------------------------------------------------
  intros: {
    "ENTP-V1": `En tant qu'Innovateur (ENTP), ton cerveau est une fontaine qui ne tarit jamais : il génère, il connecte, il invente, il imagine ce qui n'existe pas encore. Là où d'autres subissent les contraintes, toi tu les contournes par l'inventivité. Ce qui te définit, c'est ta créativité tournée vers l'action : tu ne te contentes pas de rêver, tu veux inventer, créer, lancer du neuf, et les opportunités te sautent aux yeux là où les autres ne voient que du déjà-vu. Parmi les trois façons d'être de ton type, tu es l'Inventeur, le pionnier qui défriche.

Ce qui te porte, c'est l'exploration et le défi de l'inédit : la routine t'éteint, le neuf te galvanise, et ton enthousiasme est contagieux. Mais cette même fertilité a son revers : tu lances mille étincelles sans toujours les mener au bout, tu te disperses, et le suivi laborieux t'ennuie. Ton plus beau terrain de croissance sera d'apprendre à canaliser ton inventivité pour faire exister pleinement quelques-unes de tes meilleures idées.`,

    "ENTP-V2": `En tant qu'Innovateur (ENTP), tu ne débats pas pour gagner, tu débats pour comprendre : toute idée mérite d'être testée, toute position a ses failles, et tu considères presque comme un devoir de les trouver. Ce qui te définit, c'est l'alliance de deux forces redoutables : la génération d'idées et le filtre logique impitoyable. Tu imagines des angles neufs, puis tu les passes au crible de la raison, ce qui fait de toi à la fois un esprit créatif et un esprit critique d'exception. Parmi les trois façons d'être de ton type, tu es le Débatteur Analytique.

Ce qui te passionne, c'est la confrontation des idées : anticiper les contre-arguments, repérer les incohérences en un éclair, démonter ce qui ne tient pas. Mais ce don a son revers : à force de tout contredire et de pointer les failles, tu peux blesser, lasser ou rester dans l'analyse sans jamais conclure ni agir. Ton plus beau terrain de croissance sera de mettre ton esprit critique au service des idées sans le retourner contre les personnes, et de passer de l'analyse à l'action.`,

    "ENTP-V3": `En tant qu'Innovateur (ENTP), tu as les idées ET le don de les rendre irrésistibles. Tu vois les possibilités comme tous les esprits inventifs, mais tu sais en plus embarquer les autres, lire ton public, trouver l'angle qui touche et transformer une idée en mouvement. Ce qui te définit, c'est cette alliance de la créativité et du magnétisme : là où d'autres gardent leurs visions dans leur tête, toi tu les transformes en enthousiasme collectif. Parmi les trois façons d'être de ton type, tu es le Charmeur Visionnaire.

Ce qui te caractérise, c'est ton aisance à fédérer, à inspirer, à donner envie de te suivre. Mais ce charme a son revers : tu peux rechercher l'effet plus que le fond, dépendre du regard des autres, te disperser dans mille projets séduisants et rester en surface. Ton plus beau terrain de croissance sera de mettre ton charisme au service de ce qui compte vraiment, et de puiser ta valeur en toi plutôt que dans l'admiration.`,
  },

  // ---------------------------------------------------------------------------
  // TEXTE_VARIANTE (~2 paragraphes, sous les barres de variante)
  // ---------------------------------------------------------------------------
  texteVariante: {
    "ENTP-V1": `Parmi les trois visages de l'Innovateur, tu es le plus tourné vers la création et le lancement d'idées neuves. Tu n'es pas avant tout le débatteur qui analyse et démonte, ni le charmeur qui rallie les foules : tu es celui qui invente, qui crée, qui défriche les territoires inexplorés. Cette fontaine d'idées et cette envie de les lancer dans le monde te caractérisent plus que tout.

Inventer et créer du neuf te passionne, et tu vois des opportunités et des possibilités partout. Cette combinaison, la créativité débordante et l'énergie pour concrétiser, fait de toi un pionnier, un lanceur de projets, quelqu'un capable de donner vie à ce que personne n'avait imaginé. Le revers, c'est que cette même fertilité peut t'empêcher de finir : ton plus beau terrain de croissance sera d'apprendre à mener au bout quelques-unes de tes mille idées.`,

    "ENTP-V2": `Parmi les trois visages de l'Innovateur, tu es le plus tourné vers l'analyse critique et la joute intellectuelle. Tu n'es pas avant tout l'inventeur qui crée et lance, ni le charmeur qui rallie les foules : tu es celui qui pense, qui débat, qui démonte les raisonnements pour aller au fond des choses. Ce goût de tester la cohérence des idées et de repérer les failles te caractérise.

Tu adores débattre et démonter les arguments, et tu repères instantanément ce qui cloche dans un raisonnement. Cette combinaison, la créativité qui génère et la logique qui teste, fait de toi un esprit critique d'exception, quelqu'un dont l'intelligence affûtée éclaire les débats et prévient les erreurs. Le revers, c'est que ce même tranchant peut blesser ou tourner à vide : ton plus beau terrain de croissance sera d'apprendre quand débattre et quand écouter, et à conclure plutôt qu'à analyser sans fin.`,

    "ENTP-V3": `Parmi les trois visages de l'Innovateur, tu es le plus tourné vers les gens et l'influence. Tu n'es pas avant tout l'inventeur centré sur la création, ni le débatteur centré sur l'analyse critique : tu es celui qui rallie, qui entraîne, qui transforme ses idées en mouvement grâce à son charisme. Cette aisance à séduire, à entraîner, à influencer par ton énergie te caractérise.

Tu aimes rallier les gens et les convaincre par ton enthousiasme, et tu es particulièrement sensible à l'effet que tu produis sur les autres. Cette combinaison, la créativité de l'inventeur et le magnétisme du meneur, fait de toi un visionnaire qui sait entraîner, capable de donner vie à ses idées en les faisant adopter. Le revers, c'est que ce charme peut tourner à vide : ton plus beau terrain de croissance sera de mettre ton magnétisme au service de la substance et de la profondeur.`,
  },

  // ---------------------------------------------------------------------------
  // VARIANTE_DETAIL : forces (6), ombres (6), paradoxe
  // ---------------------------------------------------------------------------
  varianteDetail: {
    "ENTP-V1": {
      forces: [
        { titre: "Une créativité inépuisable", accent: "créativité", texte: "Ton esprit génère sans cesse des concepts neufs : là où les autres sont bloqués, toi tu vois dix pistes." },
        { titre: "Un œil pour les opportunités", accent: "opportunités", texte: "Tu repères le potentiel et l'angle à exploiter là où les autres ne voient que du déjà-vu." },
        { titre: "Un enthousiasme qui entraîne", accent: "enthousiasme", texte: "Quand une idée t'emballe, tu rayonnes et tu embarques les autres avec toi." },
        { titre: "Une adaptabilité imbattable", accent: "adaptabilité", texte: "Tu rebondis, tu improvises et tu transformes les obstacles en occasions à saisir." },
        { titre: "Une logique qui structure", accent: "logique", texte: "Tu ne fais pas que rêver : tu testes tes idées et tu en éprouves la solidité." },
        { titre: "Une énergie de pionnier", accent: "pionnier", texte: "Tu adores la phase où tout est à inventer, où le champ des possibles est grand ouvert." },
      ],
      ombres: [
        { titre: "Du mal à finir", accent: "finir", texte: "L'idée neuve t'excite, mais le suivi laborieux t'ennuie : tu files vers le projet suivant." },
        { titre: "La dispersion", accent: "dispersion", texte: "Tant d'idées séduisantes que tu te lances dans dix directions et dilues ton énergie." },
        { titre: "La fuite de l'approfondissement", accent: "approfondissement", texte: "À chercher le neuf, tu peux rester en surface et ne jamais creuser jusqu'à la maîtrise." },
        { titre: "Le concret négligé", accent: "concret", texte: "Absorbé par tes concepts, tu peux survoler les détails pratiques et les contraintes." },
        { titre: "L'humain oublié", accent: "humain", texte: "Ton enthousiasme pour l'idée peut te faire passer à côté des besoins des gens autour de toi." },
        { titre: "Le potentiel inexploité", accent: "potentiel", texte: "Tu accumules des débuts brillants sans toujours les transformer en réalisations abouties." },
      ],
      paradoxe: {
        tension:
          "Tu as une créativité capable de grandes choses,\nmais cette même fertilité peut t'empêcher de jamais rien accomplir pleinement.",
        lumiere:
          "Ton inventivité, ton énergie et ta vision des opportunités sont des dons immenses : tu pourrais créer des choses remarquables et lancer des projets qui marquent.",
        ombre:
          "Mais ta difficulté à finir, ta dispersion et ta fuite du suivi peuvent te faire accumuler les débuts brillants sans jamais transformer tout ce potentiel en réalisations.",
        bascule:
          "Le jour où tu canalises ton inventivité pour mener tes meilleures idées jusqu'au bout, ta créativité cesse d'être un feu d'artifice sans lendemain pour devenir une vraie force créatrice.",
      },
    },
    "ENTP-V2": {
      forces: [
        { titre: "Un esprit critique implacable", accent: "critique", texte: "Tu repères les failles de raisonnement que personne ne voit et tu démontes les arguments bancals." },
        { titre: "Créativité et logique réunies", accent: "logique", texte: "Tu génères des idées neuves ET tu les testes impitoyablement : la plupart des gens n'ont que l'un des deux." },
        { titre: "Une vivacité d'esprit rare", accent: "vivacité", texte: "Tu penses vite, tu anticipes les contre-arguments et tu retournes les raisonnements avec aisance." },
        { titre: "Une indépendance d'esprit", accent: "indépendance", texte: "Tu ne gobes rien sans l'avoir testé : tu questionnes les dogmes, les modes, les autorités." },
        { titre: "Une honnêteté intellectuelle", accent: "honnêteté", texte: "Tu cherches le vrai, pas la victoire : tu sais changer d'avis face à un meilleur argument." },
        { titre: "Un résolveur de problèmes", accent: "résolveur", texte: "Tu conçois une solution originale et tu en éprouves aussitôt la solidité, redoutable face au complexe." },
      ],
      ombres: [
        { titre: "La curiosité qui blesse", accent: "blesse", texte: "Pour toi c'est un jeu d'idées, mais l'autre peut le vivre comme une remise en cause personnelle." },
        { titre: "Le débat pour le débat", accent: "débat", texte: "Ton plaisir de la joute peut te faire contredire par sport, même quand ce n'est pas utile." },
        { titre: "L'analyse sans fin", accent: "analyse", texte: "Tu peux peser et examiner indéfiniment sans jamais conclure ni passer à l'action." },
        { titre: "L'émotionnel négligé", accent: "émotionnel", texte: "À tout traiter par la logique, tu peux paraître froid et rater les besoins émotionnels des autres." },
        { titre: "Une critique facile", accent: "facile", texte: "Démonter est plus aisé que créer : tu peux t'arrêter à la faille sans rien bâtir." },
        { titre: "Du mal à conclure", accent: "conclure", texte: "Tu vois tous les contre-arguments et tu peux débattre indéfiniment contre tes propres choix." },
      ],
      paradoxe: {
        tension:
          "Ton esprit critique brillant peut éclairer le monde,\nou éloigner les gens, selon la façon dont tu l'emploies.",
        lumiere:
          "Bien employée, ta capacité à analyser et à débattre prévient les erreurs, fait avancer les idées et éclaire les débats : ton avis a du poids.",
        ombre:
          "Mais mal dosé, ce même don peut blesser, lasser, isoler : à tout contredire, tu peux gagner tous les débats et perdre les gens.",
        bascule:
          "Le jour où tu mets ton esprit critique au service des idées sans le retourner contre les personnes, ton intelligence cesse d'être une arme à double tranchant pour devenir une vraie lumière.",
      },
    },
    "ENTP-V3": {
      forces: [
        { titre: "Un charisme qui entraîne", accent: "charisme", texte: "Tu captes l'attention, tu donnes envie, tu embarques : les choses se mobilisent autour de toi." },
        { titre: "Des idées en mouvement", accent: "mouvement", texte: "Beaucoup ont des idées, toi tu sais les faire adopter et les transformer en élan collectif." },
        { titre: "Une lecture fine des gens", accent: "lecture", texte: "Tu sens ton public, tu perçois ce qui va toucher et tu adaptes ton discours à chacun." },
        { titre: "Une vraie substance", accent: "substance", texte: "Tu n'es pas qu'un beau parleur : ton magnétisme est au service d'idées et de visions réelles." },
        { titre: "Une énergie communicative", accent: "énergie", texte: "Tu insuffles de l'enthousiasme, tu rends les choses excitantes et tu dynamises les groupes." },
        { titre: "Un don de fédérer", accent: "fédérer", texte: "Tu rassembles, tu inspires et tu donnes aux autres l'envie de te suivre dans l'aventure." },
      ],
      ombres: [
        { titre: "L'effet avant le fond", accent: "effet", texte: "À force d'être sensible à l'effet produit, tu peux privilégier ce qui brille sur ce qui est vrai." },
        { titre: "La dispersion", accent: "dispersion", texte: "Tu te lances dans mille projets séduisants sans en mener aucun jusqu'au bout." },
        { titre: "La dépendance au regard", accent: "regard", texte: "Ton besoin d'approbation peut te déstabiliser dès que la validation manque." },
        { titre: "L'émotionnel survolé", accent: "émotionnel", texte: "Le charme qui rallie une salle n'est pas la présence qui nourrit un lien profond." },
        { titre: "La surface", accent: "surface", texte: "Tu peux avoir cent connaissances séduites et peu de liens vraiment intimes." },
        { titre: "Le suivi qui pèse", accent: "suivi", texte: "Le travail patient dans l'ombre t'ennuie : c'est souvent là que tes projets s'enlisent." },
      ],
      paradoxe: {
        tension:
          "Ton charisme peut servir de grandes idées,\nou se contenter de séduire pour séduire.",
        lumiere:
          "Mis au service de visions réelles et de convictions sincères, ton pouvoir de rallier peut soulever des montagnes et donner vie à des idées qui comptent.",
        ombre:
          "Mais livré à lui-même, ce même don tourne à vide : séduire pour le plaisir, courir après l'approbation, te disperser sans rien construire de durable.",
        bascule:
          "Le jour où tu mets ton charisme au service de ce qui compte vraiment et de projets que tu mènes au bout, ton magnétisme cesse d'être un feu de paille pour devenir une force de transformation.",
      },
    },
  },

  // ---------------------------------------------------------------------------
  // RELATIONS_TEXTE (~2 paragraphes)
  // ---------------------------------------------------------------------------
  relationsTexte: {
    "ENTP-V1": `En amour comme en amitié, tu es stimulant, vivant, imprévisible au bon sens du terme. Tu n'offres pas une relation routinière mais une aventure : de l'énergie, des idées, de la nouveauté, le sentiment qu'avec toi on ne s'ennuie jamais. Tu cherches quelqu'un qui te stimule intellectuellement, qui suit ton rythme et ne cherche pas à t'enfermer. Tu es l'ami avec qui on refait le monde, on a des idées folles, on part sur des tangentes improbables, et ta curiosité te connecte à toutes sortes de gens intéressants.

Tes défis sont les revers de ta nature. Ton goût de la nouveauté peut te faire craindre l'engagement ou fuir la routine inhérente à tout lien durable, et ton enthousiasme du début peut retomber quand vient le quotidien. Ta tendance à vivre dans tes idées peut te faire négliger l'entretien des liens et les besoins émotionnels de l'autre. Ton chemin, c'est de voir la profondeur et la constance non comme une prison mais comme une aventure d'un autre genre, et d'être présent émotionnellement autant qu'intellectuellement.`,

    "ENTP-V2": `En amour comme en amitié, tu es stimulant et vivant, et ce qui t'attire d'abord chez quelqu'un, c'est l'esprit : la capacité à te tenir tête, à te surprendre, à débattre sans se vexer. Une personne qui sait répondre à tes joutes t'attire bien plus qu'une présence décorative. Tu es l'ami avec qui on débat des heures et avec qui aucune idée n'est tabou, et tu offres un esprit qui stimule le tien, un interlocuteur qui ne te laisse jamais paresser intellectuellement.

Tes défis sont les revers de ta nature. Ton goût du débat peut transformer des conversations anodines en confrontations, ou faire que l'autre se sente constamment challengé, voire critiqué. Ton confort avec la logique peut te rendre maladroit avec les émotions : tu peux vouloir résoudre par l'argument ce qui demande de l'écoute. Ton chemin, c'est d'apprendre à ranger ton esprit critique dans l'intimité, à reconnaître quand l'autre veut du soutien plutôt que du débat, et à offrir de la chaleur autant que de la stimulation.`,

    "ENTP-V3": `En amour comme en amitié, tu es charmeur, vivant, magnétique. Tu sais séduire, faire rire, donner à l'autre le sentiment d'être spécial, et tu apportes une présence qui illumine : avec toi, la relation a du panache et du jeu. Tu es l'ami rayonnant, celui qui met de l'ambiance, qui connecte les gens et rend tout plus vivant. Tu cherches un partenaire qui te stimule, qui a sa propre personnalité, et qui voit au-delà de ton charme, qui te connaît vraiment et pas seulement le brillant que tu montres.

Tes défis sont les revers de ta nature. Ton besoin de plaire et ta sensibilité à l'effet produit peuvent te rendre dépendant de l'admiration, et ton charme social peut masquer une difficulté à aller dans la profondeur émotionnelle intime. Ta dispersion peut te faire fuir l'engagement ou négliger tes liens profonds au profit de la nouveauté. Ton chemin, c'est d'offrir de l'authenticité et pas seulement du charme, de puiser ta valeur ailleurs que dans l'admiration, et de cultiver quelques liens vraiment intimes où tu n'as pas à séduire.`,
  },

  // ---------------------------------------------------------------------------
  // PRO_TEXTE (~2 paragraphes)
  // ---------------------------------------------------------------------------
  proTexte: {
    "ENTP-V1": `Au travail, tu es fait pour les rôles qui sollicitent ta créativité et te donnent de la liberté et de la nouveauté. Tu t'étioles dans l'exécution répétitive et le cadre figé ; tu prends vie quand tu peux inventer, défricher, lancer des projets neufs. Tu excelles dans l'entrepreneuriat, l'innovation, les domaines créatifs, le développement de projets, le conseil ou le marketing, tout ce qui demande d'inventer et de saisir des opportunités. Tu es un excellent initiateur, un faiseur de projets, un repéreur d'opportunités, à ton meilleur dans les phases où tout est à inventer.

Tu as un besoin vital d'autonomie, de liberté et de stimulation : le micro-management, les procédures et la monotonie te rendent improductif. Ton défi principal découle de ta nature : ta difficulté à finir, à approfondir et à gérer le suivi peut nuire à tes réussites. Tu excelles à lancer, moins à mener au bout. Apprendre à concrétiser, à rester sur un projet au-delà de la phase excitante, et à t'entourer de personnes qui assurent l'exécution, est ce qui transforme ton inventivité en réussites concrètes et reconnues.`,

    "ENTP-V2": `Au travail, tu es fait pour les rôles qui sollicitent ton esprit critique et ta capacité d'analyse, et qui t'offrent du débat et des défis intellectuels. Tu t'étioles dans l'exécution routinière et les environnements qui découragent la remise en question ; tu prends vie quand tu peux questionner, analyser, résoudre des problèmes complexes. Tu excelles dans le conseil, l'analyse stratégique, le droit, la recherche, le débat d'idées ou l'entrepreneuriat, tout ce qui demande de penser et de challenger. Tu es un excellent résolveur de problèmes, un repéreur de failles, un esprit qui améliore les idées en les testant.

Tu as besoin d'autonomie, de défis intellectuels et de liberté de penser : la pensée unique et les procédures qu'on ne peut questionner te révoltent. Ton défi est double : ta tendance à débattre et critiquer peut t'aliéner des collègues, et ta difficulté à conclure et à exécuter peut te faire rester dans l'analyse sans produire. Apprendre à exercer ton esprit critique avec tact et à passer de l'analyse à l'action concrète est ce qui transforme ta brillance intellectuelle en contributions reconnues.`,

    "ENTP-V3": `Au travail, tu es fait pour les rôles où l'on convainc, où l'on rallie, où l'on porte des idées. Tu t'étioles dans l'exécution solitaire et routinière ; tu prends vie quand tu peux communiquer, fédérer, vendre des idées, entraîner. Tu excelles dans la communication, le marketing, la vente, l'entrepreneuriat, le leadership, les relations publiques ou la prise de parole, tout ce qui combine idées et influence. Tu es un excellent ambassadeur, un fédérateur, un vendeur d'idées, à ton meilleur quand tu portes une vision et rallies une équipe.

Tu as besoin d'autonomie, de contact humain et de scènes où exercer ton charisme : le micro-management, l'isolement et la routine te démotivent. Ton défi est double : ta dépendance à l'effet produit peut te faire privilégier le brillant sur le fond, et ta dispersion peut t'empêcher de concrétiser. Apprendre à mettre ton charisme au service d'une vraie substance, à mener tes projets au bout, et à ne pas faire dépendre ta motivation de l'admiration, est ce qui transforme ton magnétisme en réussite durable et respectée.`,
  },

  // ---------------------------------------------------------------------------
  // MINDSET (intro de « Ton chemin de croissance »)
  // ---------------------------------------------------------------------------
  mindsetTexte: {
    "ENTP-V1": {
      apercu: `Ton plus grand chantier n'est pas de trouver des idées, tu n'en manques jamais, c'est d'en faire exister quelques-unes pleinement. Tu portes une inventivité débordante, mais aussi une tendance à ne jamais finir, à te disperser, à fuir le suivi laborieux vers la prochaine étincelle. La bonne nouvelle, c'est que ces fragilités sont aussi tes plus grands leviers de croissance, à condition de savoir où appuyer.`,
    },
    "ENTP-V2": {
      apercu: `Ton plus grand chantier n'est pas d'aiguiser ton esprit, il est déjà tranchant, c'est d'apprendre à bien l'employer. Tu portes une intelligence critique rare, mais aussi une tendance à débattre pour débattre, à blesser sans le vouloir, et à analyser sans jamais conclure ni agir. La bonne nouvelle, c'est que ces fragilités sont aussi tes plus grands leviers de croissance, à condition de savoir où appuyer.`,
    },
    "ENTP-V3": {
      apercu: `Ton plus grand chantier n'est pas de séduire, ça te vient naturellement, c'est de mettre ton charme au service de ce qui compte vraiment. Tu portes un magnétisme rare, mais aussi une tendance à courir après l'effet, à dépendre de l'admiration, et à te disperser sans rien construire de durable. La bonne nouvelle, c'est que ces fragilités sont aussi tes plus grands leviers de croissance, à condition de savoir où appuyer.`,
    },
  },

  // ---------------------------------------------------------------------------
  // SECTION_DETAIL : relations / carriere / developpement par variante
  // ---------------------------------------------------------------------------
  sectionDetail: {
    // ===== V1 / RELATIONS =====
    "ENTP-V1-relations": {
      forces: [
        { titre: "Une présence stimulante", accent: "stimulante", texte: "Avec toi on ne s'ennuie jamais : tu apportes des idées, de l'énergie et le sentiment d'une aventure." },
        { titre: "Une curiosité qui attire", accent: "curiosité", texte: "Ta soif de découvrir te connecte facilement à toutes sortes de gens intéressants." },
        { titre: "Un enthousiasme contagieux", accent: "enthousiasme", texte: "Quand une idée t'emballe, tu embarques l'autre dans ton tourbillon de possibles." },
        { titre: "Une complicité d'exploration", accent: "complicité", texte: "Tu aimes débattre, imaginer et te lancer dans des projets à deux ou en bande." },
        { titre: "Une loyauté à ta façon", accent: "loyauté", texte: "Sincère, elle passe par le partage d'aventures et la stimulation mutuelle plus que par les conventions." },
        { titre: "Un regard neuf sur l'autre", accent: "regard", texte: "Tu vois le potentiel des gens et tu rends le quotidien plus excitant et plein de possibles." },
      ],
      ombres: [
        { titre: "La peur de l'engagement", accent: "engagement", texte: "Ton goût de la nouveauté peut te faire craindre de t'installer ou de fermer des portes." },
        { titre: "L'enthousiasme qui retombe", accent: "enthousiasme", texte: "L'élan du début peut faiblir quand vient la routine inhérente à tout lien durable." },
        { titre: "Le quotidien fui", accent: "quotidien", texte: "Tu fuis la part répétitive de la relation, là où se construit pourtant la profondeur." },
        { titre: "Les liens négligés", accent: "négligés", texte: "Ta dispersion te fait filer vers le prochain projet et oublier d'entretenir tes amitiés." },
        { titre: "L'émotionnel survolé", accent: "émotionnel", texte: "Plongé dans tes idées, tu peux rater la dimension simple et affective du lien." },
        { titre: "Une soif de stimulation", accent: "stimulation", texte: "Tu peux attendre de la relation une effervescence constante que le réel n'offre pas toujours." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "La routine et le quotidien figé, sans nouveauté.",
            "Le contrôle, la possessivité, la jalousie qui rognent ta liberté.",
            "Les relations tièdes, sans échange ni stimulation.",
            "Les personnes fermées aux idées et au changement.",
            "Un partenaire qui cherche à t'enfermer dans un cadre rigide.",
          ],
        },
        {
          ton: "positif",
          items: [
            "Un esprit vif qui te tient tête et te stimule.",
            "De la liberté, de la confiance et de l'espace.",
            "Des projets et des aventures à vivre ensemble.",
            "Une complicité dans l'exploration et le débat.",
            "Quelqu'un qui t'ancre juste assez pour que tes idées prennent vie.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Les tempéraments très attachés aux règles, aux traditions et à la routine.",
            "Les profils possessifs ou contrôlants qui rognent ta liberté.",
            "Les personnalités fermées au changement et à l'irrévérence.",
          ],
          profils: [
            { code: "ISTJ", raison: "son attachement à la routine et aux règles peut t'étouffer." },
            { code: "ISFJ", raison: "son besoin de stabilité et de constance cadre mal avec ton goût du neuf." },
            { code: "ESTJ", raison: "son côté directif et procédurier entre en friction avec ta liberté." },
          ],
        },
        {
          ton: "positif",
          items: [
            "Les esprits intuitifs et curieux qui partagent ton goût des idées.",
            "Les tempéraments structurés qui t'aident à concrétiser tes élans.",
            "Ceux qui apprécient ton inventivité tout en t'ancrant doucement.",
          ],
          profils: [
            { code: "INTJ", raison: "sa structure et sa vision ancrent tes idées et t'aident à mener au bout." },
            { code: "INFJ", raison: "sa profondeur et son sens de la suite équilibrent ton goût du lancement." },
            { code: "ENFP", raison: "même longueur d'onde, enthousiasme et curiosité partagés, sans s'enfermer." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Tu rêves d'une relation vivante et pleine d'aventures,\nmais l'engagement durable demande une constance que tu fuis.",
        lumiere:
          "Ton énergie, ta curiosité et ta façon de rendre la vie excitante font de toi un partenaire et un ami rares, auprès de qui on ne s'ennuie jamais.",
        ombre:
          "Mais à craindre la routine, à fuir le quotidien et à te disperser, tu peux laisser s'effriter les liens auxquels tu tiens le plus.",
        bascule:
          "Le jour où tu vois la profondeur d'un lien durable comme une aventure d'un autre genre, ton énergie trouve enfin où s'enraciner.",
      },
    },

    // ===== V1 / CARRIERE =====
    "ENTP-V1-carriere": {
      forces: [
        { titre: "Une créativité féconde", accent: "créativité", texte: "Tu génères sans cesse des idées neuves et tu débloques les situations par ta seule inventivité." },
        { titre: "Un flair des opportunités", accent: "flair", texte: "Tu repères ce qui peut marcher avant les autres et tu sais saisir l'occasion." },
        { titre: "Une étincelle qui lance", accent: "étincelle", texte: "Tu es un excellent initiateur : tu démarres les projets et tu mobilises autour de toi." },
        { titre: "Une vraie adaptabilité", accent: "adaptabilité", texte: "Tu improvises, tu rebondis et tu transformes les imprévus en occasions." },
        { titre: "Une résolution inventive", accent: "résolution", texte: "Tu es à ton meilleur quand il faut trouver des solutions neuves à des problèmes complexes." },
        { titre: "Une énergie de lancement", accent: "lancement", texte: "Quand un projet t'allume, tu y consacres une créativité et une énergie phénoménales." },
      ],
      ombres: [
        { titre: "Le suivi qui ennuie", accent: "suivi", texte: "Tu démarres fort, mais le travail patient et répétitif fait chuter ton énergie." },
        { titre: "La dispersion", accent: "dispersion", texte: "Tu papillonnes d'un projet à l'autre et n'en mènes que peu au bout." },
        { titre: "Du mal à finir", accent: "finir", texte: "Une fois l'idée lancée ou résolue dans ta tête, tu files vers la suivante." },
        { titre: "La routine étouffante", accent: "routine", texte: "Les environnements bureaucratiques et figés t'asphyxient et te rendent improductif." },
        { titre: "Une indécision féconde", accent: "indécision", texte: "Tu vois tant d'options que t'engager fermement sur une seule te coûte." },
        { titre: "Un rapport flou à l'argent", accent: "argent", texte: "Du flair pour les opportunités, mais une gestion en dents de scie faute de constance." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "L'exécution répétitive et le travail mécanique.",
            "Les procédures rigides et la bureaucratie.",
            "Le micro-management et la surveillance.",
            "La routine et le cadre figé sans nouveauté.",
            "Le suivi laborieux sans place pour inventer.",
          ],
        },
        {
          ton: "positif",
          items: [
            "La liberté et l'autonomie de créer à ta façon.",
            "La variété, les projets neufs et les défis créatifs.",
            "Les phases de lancement où tout est à inventer.",
            "Pouvoir saisir des opportunités et défricher.",
            "Une équipe qui assure le suivi que tu fuis.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Les postes routiniers et très procéduraux.",
            "Les environnements bureaucratiques et rigides.",
            "Le travail d'exécution répétitive et figée.",
          ],
          profils: [
            { nom: "Saisie, contrôle, procédures", raison: "la routine et la rigidité éteignent ton inventivité." },
            { nom: "Administration très hiérarchique", raison: "le manque de liberté et la lourdeur t'asphyxient." },
            { nom: "Exécution répétitive et figée", raison: "aucune place pour inventer ni saisir le neuf." },
          ],
        },
        {
          ton: "positif",
          items: [
            "L'entrepreneuriat et l'innovation.",
            "Les domaines créatifs et le développement de projets.",
            "Le conseil et le marketing.",
          ],
          profils: [
            { nom: "Entrepreneuriat & innovation", raison: "lancer, défricher, saisir les opportunités : ta nature même." },
            { nom: "Création & développement de projets", raison: "inventer et donner vie à ce que personne n'imaginait." },
            { nom: "Conseil & marketing", raison: "résoudre par l'idée neuve et flairer ce qui peut marcher." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Tu lances les projets avec une créativité rare,\nmais le long travail du suivi peut les laisser inachevés.",
        lumiere:
          "Inventif, intuitif et plein d'énergie, tu es l'étincelle qui fait naître les projets et voit les opportunités avant tout le monde.",
        ombre:
          "Mais ta dispersion, ta difficulté à finir et ta fuite du suivi peuvent laisser tes meilleures idées en chantier.",
        bascule:
          "Le jour où tu mènes au bout ce qui compte, ou que tu t'entoures de qui assure la constance, tu passes du lanceur d'idées au créateur qui accomplit.",
      },
    },

    // ===== V1 / DEVELOPPEMENT =====
    "ENTP-V1-developpement": {
      evolution: `Ta personnalité n'est pas figée : elle mûrit, et ton type suit une trajectoire de croissance particulièrement marquée. Jeune, tu es tout entier dans ton bouillonnement créatif : inventer, lancer, explorer, sauter d'une idée à l'autre. C'est lumineux et énergique, mais souvent dispersé : tu commences mille projets, tu en finis peu, et tu peines à concrétiser tout ce potentiel.

Avec le temps, quelque chose de précieux s'ouvre en toi : tu comprends qu'avoir des idées ne suffit pas, qu'il faut en mener quelques-unes jusqu'au bout pour qu'elles existent vraiment. Tu apprends à te concentrer, à finir, à approfondir, à t'entourer de ce qui te complète, sans renoncer à ta créativité. Dans ta pleine maturité, tu deviens redoutablement accompli : un créatif débordant qui sait aussi concrétiser et transformer ses idées en réalisations qui marquent. Et c'est entièrement à ta portée.`,
      etapes: [
        "Tu vois des solutions partout et tu poses mille questions. Le monde est un immense terrain de jeu plein de possibles, et ton imagination ne s'arrête jamais.",
        "Ta créativité explose : tu inventes, tu lances, tu explores tous azimuts. C'est lumineux, mais souvent dispersé : tu commences beaucoup, tu finis peu, et canaliser ton énergie ne va pas encore de soi.",
        "Tu comprends qu'avoir des idées ne suffit pas. Tu apprends à choisir, à finir ce qui compte, à t'entourer de complémentaires, et à transformer ton inventivité en réalisations, sans rien perdre de ta créativité.",
        "Dans ta pleine maturité, tu es un inventeur qui sait aussi accomplir. Tu as gardé ta fontaine d'idées, mais tu sais désormais en faire exister quelques-unes pleinement : la version la plus accomplie de toi.",
      ],
      leviersForts: [
        { titre: "Mène une idée jusqu'au bout", texte: "Choisis, parmi tes mille idées, une qui compte vraiment et achève-la : voir le résultat concret te prouvera de quoi tu es capable et te donnera une satisfaction durable." },
        { titre: "Apprivoise un peu de structure", texte: "Pas une organisation rigide, mais quelques outils simples et flexibles : vois-les comme ce qui fait exister ta créativité au lieu de la laisser se disperser." },
        { titre: "Entoure-toi de complémentaires", texte: "Tu n'as pas à devenir bon dans ce que tu n'aimes pas. Associe-toi à ceux qui apportent le suivi et l'exécution, et la vision devient réalité." },
        { titre: "Ose approfondir parfois", texte: "Choisis un domaine et reste-y au-delà du point où l'ennui apparaît : c'est là que ton inventivité se transforme en maîtrise réelle et en impact durable." },
      ],
      questions: [
        { situation: "Quand une nouvelle idée t'emballe", question: "Est-ce que je vais la mener quelque part, ou juste l'ajouter à la pile de mes débuts ?" },
        { situation: "Quand un projet devient laborieux", question: "Est-ce que je fuis vers du neuf, ou est-ce vraiment le moment de passer à autre chose ?" },
        { situation: "Quand tu te lances dans dix directions", question: "Quelles sont les deux ou trois priorités qui méritent vraiment mon énergie ?" },
        { situation: "Quand l'excitation du début retombe", question: "Est-ce que cette idée vaut la peine que je reste jusqu'à l'aboutissement ?" },
        { situation: "Quand tu vis tout dans tes idées", question: "Est-ce que je prends aussi soin des gens et du concret autour de moi ?" },
      ],
      paradoxe: {
        tension:
          "Pour faire exister ce que tu inventes, tu dois t'imposer un peu de discipline,\nmais tu crains qu'en te structurant, tu éteignes ta créativité.",
        lumiere:
          "Ton inventivité, ton énergie et ta vision des opportunités sont une force rare : tu as déjà tout ce qu'il faut pour créer des choses qui marquent.",
        ombre:
          "Mais sans jamais finir ni te concentrer, ta créativité reste un feu d'artifice sans lendemain et tes plus belles idées restent sans suite.",
        bascule:
          "Le jour où tu vois la discipline non comme une prison mais comme ce qui donne vie à ta créativité, ta fontaine d'idées rencontre enfin ta capacité à accomplir.",
      },
    },

    // ===== V2 / RELATIONS =====
    "ENTP-V2-relations": {
      forces: [
        { titre: "Une présence stimulante", accent: "stimulante", texte: "Avec toi la relation est un échange permanent, vif et jamais ennuyeux." },
        { titre: "Le goût du répondant", accent: "répondant", texte: "Tu apprécies par-dessus tout ceux qui peuvent te tenir tête et aiment la joute autant que toi." },
        { titre: "Une complicité d'esprit", accent: "complicité", texte: "Tu offres un esprit qui stimule le tien, un interlocuteur qui ne te laisse jamais paresser." },
        { titre: "Une franchise sincère", accent: "franchise", texte: "Tu dis le vrai et tu n'esquives pas les sujets : on sait à quoi s'en tenir avec toi." },
        { titre: "Un humour vif", accent: "humour", texte: "Ta vivacité et ton sens du jeu d'idées rendent les échanges drôles et inattendus." },
        { titre: "Une loyauté à ta façon", accent: "loyauté", texte: "Sincère, elle passe par la complicité intellectuelle et le respect mutuel." },
      ],
      ombres: [
        { titre: "Le débat qui blesse", accent: "blesse", texte: "Pour toi c'est un jeu, mais l'autre peut se sentir constamment challengé, voire critiqué." },
        { titre: "La contradiction réflexe", accent: "contradiction", texte: "Tu peux contredire par sport quand l'autre voulait juste être écouté." },
        { titre: "L'écoute qui manque", accent: "écoute", texte: "Tu peux rater le moment où l'autre cherche du soutien plutôt qu'un débat." },
        { titre: "L'émotionnel négligé", accent: "émotionnel", texte: "Ton confort avec la logique peut te rendre maladroit avec les sentiments." },
        { titre: "Le besoin de résoudre", accent: "résoudre", texte: "Tu peux vouloir résoudre par l'argument ce qui demande de l'écoute et de la tendresse." },
        { titre: "L'attachement peu montré", accent: "attachement", texte: "Tu offres de la stimulation, mais tu montres moins ta présence affective." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "Les personnes qui prennent tout débat pour une attaque.",
            "Les relations sans répondant ni stimulation intellectuelle.",
            "Le contrôle et la possessivité qui rognent ta liberté.",
            "L'évitement systématique de tout sujet qui fâche.",
            "Les liens où l'on te demande de penser comme tout le monde.",
          ],
        },
        {
          ton: "positif",
          items: [
            "Un esprit vif qui te tient tête sans se vexer.",
            "Des échanges où aucune idée n'est tabou.",
            "Du respect mutuel et de la liberté de penser.",
            "Quelqu'un qui ne prend pas tes débats pour des attaques.",
            "De la chaleur qui équilibre ta tête analytique.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Les tempéraments très sensibles, qui prennent les débats personnellement.",
            "Les profils très attachés aux conventions et à l'harmonie.",
            "Les personnalités qui fuient tout désaccord.",
          ],
          profils: [
            { code: "ISFJ", raison: "sa sensibilité peut mal vivre ta façon de tout questionner et de débattre." },
            { code: "ESFJ", raison: "son attachement à l'harmonie cadre mal avec ton goût du désaccord." },
            { code: "ISFP", raison: "sa réserve et son évitement du conflit peuvent te frustrer et le blesser." },
          ],
        },
        {
          ton: "positif",
          items: [
            "Les esprits intuitifs et curieux qui aiment débattre et explorer.",
            "Les tempéraments chaleureux qui t'apportent l'ancrage émotionnel.",
            "Ceux qui te tiennent tête sans se sentir agressés.",
          ],
          profils: [
            { code: "INTJ", raison: "il partage ton goût des idées et te suit dans la joute sans se vexer." },
            { code: "ENFP", raison: "sa chaleur et sa curiosité t'équilibrent et adorent débattre avec toi." },
            { code: "INFJ", raison: "sa profondeur et son écoute t'apportent l'ancrage que ta tête néglige." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Tu aimes ferrailler et challenger ceux que tu chéris,\nmais ce même tranchant peut les blesser sans que tu le veuilles.",
        lumiere:
          "Ta vivacité, ton humour et ton goût du vrai font de toi un partenaire et un ami rares, qui ne te laissent jamais paresser intellectuellement.",
        ombre:
          "Mais à contredire par réflexe et à vouloir tout résoudre par l'argument, tu peux faire fuir ceux qui ne demandaient qu'à être écoutés.",
        bascule:
          "Le jour où tu sais ranger ton épée et écouter sans débattre, ta vivacité cesse d'éloigner pour devenir une vraie complicité.",
      },
    },

    // ===== V2 / CARRIERE =====
    "ENTP-V2-carriere": {
      forces: [
        { titre: "Un esprit critique précieux", accent: "critique", texte: "Tu repères les failles d'un plan et tu anticipes ce qui peut mal tourner avant les autres." },
        { titre: "Créativité et rigueur réunies", accent: "rigueur", texte: "Tu conçois des solutions originales et tu en éprouves aussitôt la solidité." },
        { titre: "Une analyse pénétrante", accent: "analyse", texte: "Tu vois ce qui se cache derrière les apparences et tu améliores les idées en les testant." },
        { titre: "Une vivacité d'esprit", accent: "vivacité", texte: "Tu penses vite, tu anticipes les objections et tu éclaires des angles que personne n'avait vus." },
        { titre: "Une indépendance lucide", accent: "indépendance", texte: "Tu ne gobes rien sans l'avoir testé, ce qui te garde clairvoyant là où d'autres suivent le troupeau." },
        { titre: "Un résolveur de problèmes", accent: "résolveur", texte: "Tu es à ton meilleur sur les problèmes qui exigent à la fois créativité et rigueur critique." },
      ],
      ombres: [
        { titre: "La critique qui aliène", accent: "critique", texte: "Ta tendance à débattre et à pointer les failles peut t'aliéner des collègues." },
        { titre: "L'analyse sans fin", accent: "analyse", texte: "Tu peux peser et examiner indéfiniment sans jamais conclure ni produire." },
        { titre: "Du mal à exécuter", accent: "exécuter", texte: "L'exécution patiente et le suivi te pèsent, et tes projets peuvent s'enliser là." },
        { titre: "Le débat improductif", accent: "débat", texte: "Tu peux transformer un échange de travail en joute là où il fallait avancer." },
        { titre: "La routine étouffante", accent: "routine", texte: "Les environnements rigides, dogmatiques ou anti-intellectuels t'asphyxient." },
        { titre: "Un rapport détaché à l'argent", accent: "argent", texte: "L'accumulation te motive peu, et ta difficulté avec le suivi nuit à une gestion régulière." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "L'exécution routinière et les tâches répétitives.",
            "Les environnements qui découragent la remise en question.",
            "La pensée unique et les procédures qu'on ne peut questionner.",
            "Le micro-management et l'absence d'autonomie.",
            "Les ambiances dogmatiques ou anti-intellectuelles.",
          ],
        },
        {
          ton: "positif",
          items: [
            "Des problèmes complexes qui méritent ton analyse.",
            "De la liberté de penser et de questionner.",
            "Le débat d'idées et la confrontation stimulante.",
            "De l'autonomie et de vrais défis intellectuels.",
            "Une équipe qui assure le suivi que tu fuis.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Les postes d'exécution routinière et figée.",
            "Les environnements dogmatiques et anti-intellectuels.",
            "Les milieux où l'on ne peut rien questionner.",
          ],
          profils: [
            { nom: "Exécution routinière et procédurale", raison: "aucun problème à analyser, aucune liberté de penser." },
            { nom: "Environnements dogmatiques", raison: "l'interdiction de questionner te révolte et t'éteint." },
            { nom: "Postes rigides et hiérarchiques", raison: "le manque d'autonomie et de défi te démotive." },
          ],
        },
        {
          ton: "positif",
          items: [
            "Le conseil et l'analyse stratégique.",
            "Le droit, la recherche et le débat d'idées.",
            "L'entrepreneuriat et la résolution de problèmes complexes.",
          ],
          profils: [
            { nom: "Conseil & stratégie", raison: "analyser, challenger, améliorer : démonter pour mieux construire." },
            { nom: "Droit, recherche & débat", raison: "penser, argumenter, tester la solidité des raisonnements." },
            { nom: "Entrepreneuriat & problèmes complexes", raison: "allier créativité et rigueur sur de vrais défis." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Ton esprit critique améliore tout ce qu'il touche,\nmais à force de démonter, tu peux aliéner les autres et ne rien produire.",
        lumiere:
          "Ta rigueur, ta vivacité et ton indépendance d'esprit font de toi un résolveur de problèmes redoutable qui prévient les erreurs et améliore les idées.",
        ombre:
          "Mais ta critique qui blesse et ta difficulté à conclure peuvent te faire rester dans l'analyse sans jamais passer à l'action concrète.",
        bascule:
          "Le jour où tu exerces ton esprit critique avec tact et où tu passes de l'analyse à l'action, ta brillance se transforme en contributions reconnues et appréciées.",
      },
    },

    // ===== V2 / DEVELOPPEMENT =====
    "ENTP-V2-developpement": {
      evolution: `Ta personnalité n'est pas figée : elle mûrit, et ton type suit une trajectoire de croissance particulièrement marquée. Jeune, tu es tout entier dans ton esprit critique et ta joute : débattre, challenger, démonter, briller intellectuellement. C'est vif et brillant, mais souvent déséquilibré : tu peux débattre pour débattre, blesser sans le vouloir, et rester dans l'analyse sans jamais conclure ni agir.

Avec le temps, quelque chose de précieux s'ouvre en toi : tu comprends que gagner un débat ne vaut rien si tu perds les gens, et qu'analyser ne remplace pas décider et agir. Tu apprends à doser ta critique, à écouter, à conclure, à intégrer l'humain, sans rien perdre de ta vivacité. Dans ta pleine maturité, tu deviens redoutablement accompli : un esprit critique brillant qui sait aussi écouter, conclure et tenir compte des gens, dont l'intelligence éclaire sans blesser. Et c'est entièrement à ta portée.`,
      etapes: [
        "Tu questionnes déjà tout et tu ne prends rien pour acquis. Ton esprit vif repère ce qui cloche et tu adores comprendre comment les choses fonctionnent vraiment.",
        "Ton esprit critique s'affûte : tu débats, tu challenges, tu démontes, tu brilles. C'est vif, mais souvent déséquilibré : tu peux blesser sans le vouloir, contredire par réflexe et rester dans l'analyse sans conclure.",
        "Tu comprends que gagner un débat ne vaut rien si tu perds les gens. Tu apprends à doser ta critique, à écouter, à conclure et à agir, sans rien perdre de ton acuité.",
        "Dans ta pleine maturité, ton esprit critique éclaire sans blesser. Tu sais quand et comment l'employer, écouter et trancher : la version la plus accomplie et la plus sage de toi.",
      ],
      leviersForts: [
        { titre: "Écoute autant que tu débats", texte: "Souvent les gens veulent être entendus, pas contredits. Savoir quand débattre et quand simplement écouter transforme la qualité de tes relations." },
        { titre: "Challenge les idées, pas les personnes", texte: "Mets ton acuité au service des idées sans la retourner contre ceux qui les portent : c'est ce qui fait grandir au lieu de blesser." },
        { titre: "Apprends à conclure et à agir", texte: "Impose-toi de trancher et de passer à l'exécution : c'est l'action, pas la critique, qui transforme ta pensée brillante en impact réel." },
        { titre: "Mets ta critique au service du constructif", texte: "Ne te contente pas de démonter : propose, améliore, bâtis. Un esprit critique qui construit vaut infiniment plus qu'un esprit qui ne fait que détruire." },
      ],
      questions: [
        { situation: "Quand quelqu'un partage un souci", question: "Est-ce qu'il cherche un débat, ou simplement à être écouté ?" },
        { situation: "Quand tu pointes une faille", question: "Est-ce que je vise l'idée, ou la personne qui la porte ?" },
        { situation: "Quand tu analyses sans fin", question: "Qu'est-ce qui m'empêche de trancher et de passer à l'action ?" },
        { situation: "Quand tu contredis par réflexe", question: "Est-ce vraiment utile ici, ou est-ce juste le plaisir de la joute ?" },
        { situation: "Quand une discussion devient tendue", question: "Suis-je en train de chercher le vrai, ou juste à avoir raison ?" },
      ],
      paradoxe: {
        tension:
          "Ton esprit critique est ta plus grande force,\nmais mal employé, il peut t'isoler et tourner à vide.",
        lumiere:
          "Ta vivacité, ton indépendance et ton honnêteté intellectuelle sont une force rare : tu as déjà tout ce qu'il faut pour faire avancer les idées.",
        ombre:
          "Mais à débattre sans fin et à blesser sans le vouloir, ton intelligence peut t'isoler et ne jamais déboucher sur du concret.",
        bascule:
          "Le jour où ton acuité s'allie à l'écoute et à l'action, ton esprit critique cesse d'être une arme à double tranchant pour devenir une force qui éclaire et fait grandir.",
      },
    },

    // ===== V3 / RELATIONS =====
    "ENTP-V3-relations": {
      forces: [
        { titre: "Un charme qui illumine", accent: "charme", texte: "Tu sais séduire, faire rire et donner à l'autre le sentiment d'être spécial." },
        { titre: "Une présence magnétique", accent: "magnétique", texte: "Avec toi, la relation a du panache, de l'enthousiasme et du jeu." },
        { titre: "Une âme fédératrice", accent: "fédératrice", texte: "Tu connectes les gens, tu mets de l'ambiance et tu rends tout plus vivant." },
        { titre: "Une énergie partagée", accent: "énergie", texte: "Tu apportes de la fantaisie et tu insuffles de la joie partout où tu passes." },
        { titre: "Une complicité stimulante", accent: "complicité", texte: "Tu aimes ceux avec qui tu peux à la fois t'amuser, débattre et te lancer dans des projets." },
        { titre: "Une loyauté à ta façon", accent: "loyauté", texte: "Sincère, elle passe par l'énergie partagée et le plaisir d'une présence qui rencontre la tienne." },
      ],
      ombres: [
        { titre: "La dépendance à l'admiration", accent: "admiration", texte: "Ton besoin de plaire peut te rendre dépendant du regard et de la réaction de l'autre." },
        { titre: "Le charme qui masque", accent: "masque", texte: "Ton aisance sociale peut cacher une difficulté à aller dans la profondeur intime." },
        { titre: "La surface relationnelle", accent: "surface", texte: "Tu peux avoir cent connaissances séduites et peu de liens vraiment intimes." },
        { titre: "La séduction de trop", accent: "séduction", texte: "Ta sensibilité à l'effet produit peut te pousser à séduire au-delà de la relation." },
        { titre: "Les liens profonds négligés", accent: "négligés", texte: "Ta dispersion peut te faire délaisser tes amitiés profondes au profit de la nouveauté." },
        { titre: "Le besoin de briller", accent: "briller", texte: "Tu peux rester dans l'éclat extérieur et oublier de te montrer vrai et vulnérable." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "Les personnes qui se méfient de ton charme et le jugent superficiel.",
            "Les relations qui ne te laissent jamais de scène où briller.",
            "Le contrôle et la possessivité qui rognent ta liberté.",
            "Les liens de surface, sans profondeur ni partage vrai.",
            "Un partenaire qui t'enferme dans la routine.",
          ],
        },
        {
          ton: "positif",
          items: [
            "Quelqu'un qui voit au-delà de ton charme et te connaît vraiment.",
            "Un esprit qui te stimule et a sa propre personnalité.",
            "De la liberté, de la complicité et de l'aventure.",
            "Des liens où tu peux être vrai sans avoir à séduire.",
            "De la profondeur qui équilibre ton éclat social.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Les tempéraments réservés, méfiants envers le charme.",
            "Les profils attachés à l'authenticité discrète et à la routine.",
            "Les personnalités contrôlantes qui rognent ta liberté.",
          ],
          profils: [
            { code: "ISTJ", raison: "sa réserve et son attachement à la routine peuvent te sembler étouffants." },
            { code: "ISFP", raison: "sa méfiance envers le brillant peut percevoir ton charme comme superficiel." },
            { code: "INTP", raison: "sa réserve et son détachement émotionnel cadrent mal avec ton besoin de scène." },
          ],
        },
        {
          ton: "positif",
          items: [
            "Les esprits intuitifs, vifs et sociables qui partagent ton goût de l'échange.",
            "Les tempéraments authentiques qui t'apportent la profondeur émotionnelle.",
            "Ceux qui t'aident à aller au-delà du charme vers une vraie connexion.",
          ],
          profils: [
            { code: "ENFP", raison: "même énergie et même goût des idées : la complicité est immédiate." },
            { code: "INFJ", raison: "sa profondeur et sa sincérité t'aident à aller au-delà du charme." },
            { code: "INTJ", raison: "sa substance et son ancrage équilibrent ton éclat et ta dispersion." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Tu sais charmer et faire vibrer ceux qui t'entourent,\nmais le charme social n'est pas la présence qui nourrit un lien profond.",
        lumiere:
          "Ton magnétisme, ta fantaisie et ta façon de rendre la vie plus vivante font de toi un partenaire et un ami rares, auprès de qui on se sent choisi.",
        ombre:
          "Mais à dépendre de l'admiration et à rester dans le brillant, tu peux passer à côté de l'intimité vraie dont tu as besoin.",
        bascule:
          "Le jour où tu oses te montrer vrai et vulnérable, au-delà du charme, tu accèdes enfin aux liens profonds que l'éclat seul ne donne jamais.",
      },
    },

    // ===== V3 / CARRIERE =====
    "ENTP-V3-carriere": {
      forces: [
        { titre: "Un charisme qui rallie", accent: "charisme", texte: "Tu captes l'attention, tu donnes envie et tu mobilises les énergies autour de tes idées." },
        { titre: "Des idées en mouvement", accent: "mouvement", texte: "Tu transformes un concept en cause et une vision en élan collectif." },
        { titre: "Une lecture fine du public", accent: "lecture", texte: "Tu sens ce qui va toucher et tu trouves le bon angle pour convaincre chaque auditoire." },
        { titre: "Une vraie substance", accent: "substance", texte: "Ton magnétisme s'appuie sur des idées réelles : ton influence est solide, pas creuse." },
        { titre: "Une énergie communicative", accent: "énergie", texte: "Tu dynamises les groupes et les projets et tu donnes aux autres l'envie d'y croire." },
        { titre: "Un fédérateur né", accent: "fédérateur", texte: "Tu es un excellent ambassadeur et initiateur, celui qui lance et qui entraîne." },
      ],
      ombres: [
        { titre: "L'effet avant le fond", accent: "effet", texte: "Ta dépendance à l'effet produit peut te faire privilégier le brillant sur la substance." },
        { titre: "La dispersion", accent: "dispersion", texte: "Tu multiplies les projets et les sollicitations sans toujours concrétiser." },
        { titre: "Le travail de l'ombre fui", accent: "ombre", texte: "L'exécution patiente et solitaire te pèse, et tes projets risquent de s'y enliser." },
        { titre: "La motivation au regard", accent: "regard", texte: "Quand l'admiration manque, ta motivation et ton énergie peuvent retomber." },
        { titre: "L'isolement qui éteint", accent: "isolement", texte: "Les environnements purement techniques et sans dimension humaine t'éteignent." },
        { titre: "Un rapport à l'image", accent: "image", texte: "Attiré par ce qui brille, tu peux dépenser pour l'effet et négliger la gestion régulière." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "Le travail solitaire et l'exécution dans l'ombre.",
            "La routine et l'absence de contact humain.",
            "Le micro-management et la surveillance.",
            "Les environnements impersonnels et purement techniques.",
            "Le manque de scène où exercer ton charisme.",
          ],
        },
        {
          ton: "positif",
          items: [
            "Le contact humain et le travail d'équipe.",
            "Des scènes où convaincre, fédérer et porter une vision.",
            "De la liberté, de la variété et de l'autonomie.",
            "Pouvoir vendre des idées et entraîner les autres.",
            "Une équipe qui assure le suivi que tu fuis.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Le travail isolé et sans contact humain.",
            "Les postes purement techniques et impersonnels.",
            "Les environnements routiniers et surveillés.",
          ],
          profils: [
            { nom: "Travail solitaire et technique", raison: "ni public ni contact humain pour te révéler." },
            { nom: "Exécution dans l'ombre", raison: "aucune scène où exercer ton charisme et fédérer." },
            { nom: "Postes routiniers et surveillés", raison: "le manque de liberté et de contact te démotive." },
          ],
        },
        {
          ton: "positif",
          items: [
            "La communication, le marketing et la vente.",
            "Le leadership, les relations publiques et la prise de parole.",
            "L'entrepreneuriat et tout ce qui combine idées et influence.",
          ],
          profils: [
            { nom: "Communication, marketing & vente", raison: "convaincre, mobiliser et porter des idées devant les autres." },
            { nom: "Leadership & relations publiques", raison: "fédérer une équipe et rallier un public autour d'une vision." },
            { nom: "Entrepreneuriat & influence", raison: "lancer, vendre et entraîner : ton magnétisme au service du projet." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Ton charisme peut porter de grandes idées,\nmais sans substance ni suivi, il risque de ne rien construire de durable.",
        lumiere:
          "Charismatique, fédérateur et plein d'énergie, tu sais porter une vision, rallier une équipe et donner aux autres l'envie d'y croire.",
        ombre:
          "Mais ta dépendance à l'effet produit et ta dispersion peuvent te faire privilégier le brillant sur le fond et laisser tes projets inachevés.",
        bascule:
          "Le jour où tu mets ton charisme au service d'une vraie substance et où tu mènes tes projets au bout, ton magnétisme se transforme en réussite durable et respectée.",
      },
    },

    // ===== V3 / DEVELOPPEMENT =====
    "ENTP-V3-developpement": {
      evolution: `Ta personnalité n'est pas figée : elle mûrit, et ton type suit une trajectoire de croissance particulièrement marquée. Jeune, tu es tout entier dans ton charme et ton énergie : séduire, rallier, briller, entraîner. C'est rayonnant, mais souvent déséquilibré : tu peux dépendre de l'admiration, privilégier l'effet sur le fond, te disperser et rester en surface des relations comme des choses.

Avec le temps, quelque chose de précieux s'ouvre en toi : tu comprends que séduire ne suffit pas, qu'un charme sans substance lasse, et que ce qui dure se construit dans la profondeur et l'authenticité. Tu apprends à mettre ton charisme au service de ce qui compte, à concrétiser, à puiser ta valeur en toi plutôt que dans le regard des autres. Dans ta pleine maturité, tu deviens redoutablement accompli : un charmeur dont le magnétisme sert de vraies idées, qui sait à la fois rallier les foules et nouer des liens profonds. Et c'est entièrement à ta portée.`,
      etapes: [
        "Tu attires déjà naturellement les gens et tu adores être entouré. Ton énergie est contagieuse et tu sais, sans effort, mettre de l'ambiance et faire briller un groupe.",
        "Ton magnétisme se révèle : tu séduis, tu rallies, tu brilles. C'est rayonnant, mais souvent déséquilibré : tu peux dépendre de l'admiration, privilégier l'effet sur le fond et te disperser.",
        "Tu comprends que séduire ne suffit pas. Tu apprends à mettre ton charme au service du fond, à concrétiser, à aller vers de vraies connexions et à puiser ta valeur en toi.",
        "Dans ta pleine maturité, ton magnétisme sert de vraies idées et de vrais liens. Tu brilles avec authenticité et profondeur : la version la plus puissante et la plus complète de toi.",
      ],
      leviersForts: [
        { titre: "Mets ton charisme au service du fond", texte: "Ton magnétisme est immense quand il porte de vraies idées et convictions. Veille à ce que la substance soit toujours là sous l'éclat : c'est ce qui transforme le charme passager en influence durable." },
        { titre: "Détache ta valeur du regard des autres", texte: "Ta valeur existe indépendamment de ton public. Apprendre à ne pas dépendre de l'admiration te rend bien plus solide et te libère du besoin permanent de plaire." },
        { titre: "Concrétise tes idées", texte: "Ne te contente pas de lancer et de rallier : mène au bout. Choisis quelques projets et concrétise-les, quitte à t'entourer de ceux qui assurent le suivi." },
        { titre: "Cultive la profondeur et l'authenticité", texte: "Ose te montrer vrai et vulnérable au-delà du charme social. Investis quelques relations vraiment intimes où tu n'as pas à séduire, juste à être toi." },
      ],
      questions: [
        { situation: "Quand tu cherches à convaincre", question: "Est-ce que je porte une vraie conviction, ou est-ce que je séduis pour séduire ?" },
        { situation: "Quand l'admiration te manque", question: "Est-ce que ma valeur dépend vraiment du regard des autres ?" },
        { situation: "Quand tu lances un nouveau projet", question: "Est-ce que je vais le mener au bout, ou juste profiter de l'élan du départ ?" },
        { situation: "Quand tu es au centre d'un groupe", question: "Est-ce que je laisse aussi voir qui je suis vraiment, derrière le charme ?" },
        { situation: "Quand tu choisis une direction", question: "Est-ce que je décide selon mes convictions, ou selon ce qui plaira ?" },
      ],
      paradoxe: {
        tension:
          "Pour que ton charisme transforme vraiment, tu dois lui donner du fond,\nmais tu crains qu'en cherchant la profondeur, tu perdes ton éclat.",
        lumiere:
          "Ton charisme, ta créativité et ta capacité à rallier sont une force rare : tu peux donner vie à des idées et entraîner les autres vers de grandes choses.",
        ombre:
          "Mais à séduire pour séduire et à courir après l'approbation, ton magnétisme tourne à vide et ne construit rien de durable.",
        bascule:
          "Le jour où ton charme sert toujours quelque chose de vrai et où tu puises ta valeur en toi, tu cesses de séduire l'instant pour entraîner durablement vers ce qui compte.",
      },
    },
  },
};

export default entp;
