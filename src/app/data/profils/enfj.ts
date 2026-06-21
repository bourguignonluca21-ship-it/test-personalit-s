// =============================================================================
// CONTENU DU PROFIL ENFJ (« Protagoniste »), 3 variantes.
// V1 Guide · V2 Leader de Mission · V3 Animateur Charismatique.
// Source : rapports longs rapport_long_ENFJ_V1/V2/V3.md.
// Même forme que les entrées de profils.ts (INFP / ENFP).
// Voix « tu », aucun tiret long, mot-clé en vert via le champ "accent".
// =============================================================================

const enfj = {
  // Texte commun aux 3 variantes (sous les barres du spectre). 2 paragraphes.
  traitsTexte: {
    ENFJ: `Ton esprit est tourné vers les autres et vers le sens. Ta boussole, c'est le cœur : tu te orientes selon tes valeurs, ton empathie et ton attention au bien des gens, et l'harmonie compte énormément pour toi. À cela s'ajoute une intuition fine sur l'humain, tu pressens les émotions, les motivations, le potentiel de chacun, ce qui fait de toi un guide, un confident, un fédérateur naturel. Là où d'autres voient des individus, toi tu vois ce qu'ils pourraient devenir.

Mais ta grande singularité, c'est d'allier cette chaleur à une vraie capacité d'organisation. Tu ne te contentes pas de vouloir aider : tu structures, tu planifies, tu mènes les choses au bout. Ta bienveillance se traduit en actes concrets, pas seulement en bonnes intentions. Tout l'enjeu de ton chemin, c'est de prendre soin de toi autant que des autres : ton don d'élever les gens peut te faire t'oublier, et tu deviens pleinement toi quand tu apprends à recevoir, à te préserver et à puiser ta valeur en toi-même.`,
  },

  // 1 phrase par variante, affichée au survol des barres.
  descriptions: {
    "ENFJ-V1":
      "Les Guides sont les plus tournés vers l'accompagnement individuel. Ils voient le potentiel de chacun et savent le révéler, un par un, avec une douceur et une justesse qui font grandir.",
    "ENFJ-V2":
      "Les Leaders de Mission portent une cause et rassemblent les autres autour. Ils transforment une conviction en mouvement collectif et donnent aux gens l'envie de servir quelque chose de plus grand.",
    "ENFJ-V3":
      "Les Animateurs Charismatiques fédèrent par leur chaleur et leur énergie. Ils créent du lien et de la joie partout où ils passent, et font vivre les groupes en mettant chacun à l'aise.",
  },

  // 1 phrase d'accroche (héros) par variante.
  accroches: {
    "ENFJ-V1": "Tu ne croises pas les gens, tu les aides à devenir le meilleur d'eux-mêmes.",
    "ENFJ-V2": "Tu ne portes pas une cause seul, tu rassembles les autres pour la servir.",
    "ENFJ-V3": "Tu n'entres pas dans une pièce, tu la fais s'illuminer.",
  },

  // ~2 paragraphes sous le héros (« Ton portrait »).
  intros: {
    "ENFJ-V1": `En tant que Protagoniste (ENFJ), variante Guide, tu possèdes l'une des combinaisons humaines les plus précieuses qui soient : une intuition fine sur les gens, une chaleur naturelle, et le don de les accompagner vers le meilleur d'eux-mêmes. Là où le Leader de Mission porte une cause et l'Animateur Charismatique fédère par son énergie, toi tu te concentres sur les personnes, une par une, pour les aider à grandir. C'est ta vocation profonde, et elle fait de toi un mentor, un confident, un guide dont la présence change les trajectoires.

Ce qui te porte, c'est l'impact humain et le sens : tu as besoin que ta vie serve les autres, qu'elle aide, élève, rapproche, et tu te sens accompli quand tu vois quelqu'un grandir grâce à toi. Tu perçois ce que les gens pourraient devenir, leurs talents endormis, leurs blocages, et tu sais les accompagner avec une justesse qui les fait avancer. Cette même générosité a son revers : à force de t'occuper de tous, tu peux t'oublier. Ton plus beau terrain de croissance sera d'apprendre à prendre soin de toi autant que des autres.`,

    "ENFJ-V2": `En tant que Protagoniste (ENFJ), variante Leader de Mission, tu possèdes la chaleur et l'intuition humaine de ta famille d'âme, mais tu les mets au service d'une cause, d'une vision, d'un idéal qui te dépasse. Là où le Guide accompagne les gens un par un et l'Animateur Charismatique fédère par sa seule énergie, toi tu rassembles les autres autour de quelque chose de plus grand : une mission qui donne du sens à ton action et à celle des autres. Tu ne te contentes pas d'y croire, tu entraînes.

Ce qui te définit, c'est cette alliance de la conviction et du don de fédérer. Tu portes des valeurs et une vision fortes, tu sais les rendre désirables et créer un élan collectif vers un but qui compte. Ton charisme n'est pas tourné vers toi-même, il est au service de ce que tu défends. Cette même intensité a son revers : tu peux te sacrifier à ta cause au point de disparaître derrière elle. Ton plus beau terrain de croissance sera d'apprendre à servir ta mission sans t'y consumer.`,

    "ENFJ-V3": `En tant que Protagoniste (ENFJ), variante Animateur Charismatique, tu possèdes la chaleur et l'intuition humaine de ta famille d'âme, et tu les exprimes à travers une présence sociale rayonnante. Là où le Guide accompagne les gens un par un et le Leader de Mission porte une cause, toi tu fédères par ton énergie, ta chaleur et ta capacité à créer du lien et de la joie. Tu es de ceux qui rassemblent, qui animent, qui font vivre les groupes, et dont la simple présence rend les choses plus légères.

Ce qui te porte, c'est le lien humain et le partage : tu te sens vivant quand tu rassembles, quand tu crées de la connexion, quand tu vois les autres s'épanouir grâce à toi. Tu attires les gens non par calcul mais par ta chaleur sincère, ton attention, ta générosité. Cette même nature sociale a son revers : tu peux n'exister que dans le regard des autres et te sentir vide dès que tu es seul. Ton plus beau terrain de croissance sera d'apprendre à exister pour toi-même et à cultiver ta profondeur intérieure.`,
  },

  // ~2 paragraphes sous les barres de variante (« Ta variante »).
  texteVariante: {
    "ENFJ-V1": `Parmi les trois façons d'être du Protagoniste, tu es le plus tourné vers l'accompagnement individuel et la révélation des personnes. Tu n'es pas avant tout le Leader de Mission qui porte une cause, ni l'Animateur Charismatique qui fédère les foules : tu es celui qui accompagne les gens, un par un, pour les aider à devenir le meilleur d'eux-mêmes. Comprendre les êtres et les aider à grandir te comble plus que tout.

Cette combinaison, l'intuition fine sur l'humain et la chaleur bienveillante, fait de toi un mentor, un guide, un confident naturel, quelqu'un dont la présence aide les autres à se révéler et à s'épanouir. Une parole, un encouragement, une attention de ta part peuvent changer une trajectoire. Le revers, c'est que tu peux te perdre dans le don : ton plus beau chemin de croissance sera d'apprendre à t'élever en même temps que tu élèves les autres.`,

    "ENFJ-V2": `Parmi les trois façons d'être du Protagoniste, tu es le plus tourné vers les causes et la mobilisation collective. Tu n'es pas avant tout le Guide centré sur l'accompagnement individuel, ni l'Animateur Charismatique qui fédère par sa seule énergie : tu es celui qui porte une mission et qui rassemble les autres autour d'elle. Porter une vision, mobiliser les gens, contribuer collectivement à quelque chose de plus grand te comble plus que tout.

Cette combinaison, la conviction profonde et le don de rassembler, fait de toi un meneur de causes, capable de transformer des idéaux en mouvements et de donner aux autres l'envie de servir ce qui compte. Tu sais à la fois inspirer et organiser concrètement l'action pour aboutir. Le revers, c'est que tu peux te sacrifier entièrement à ta cause : ton plus beau chemin de croissance sera de durer assez pour la mener loin, en te préservant aussi toi-même.`,

    "ENFJ-V3": `Parmi les trois façons d'être du Protagoniste, tu es le plus tourné vers le lien social, la chaleur et l'animation des groupes. Tu n'es pas avant tout le Guide centré sur l'accompagnement individuel, ni le Leader de Mission qui porte une cause : tu es celui qui rassemble par son énergie et sa chaleur, qui crée de la joie et de la connexion, qui fait vivre les groupes. Rassembler, créer de la chaleur, voir les autres se connecter te comble plus que tout.

Cette combinaison, la chaleur rayonnante et l'intuition sociale, fait de toi un animateur naturel, un créateur de liens, quelqu'un dont la présence réchauffe et rassemble, et dont les autres ont besoin pour se sentir bien ensemble. Le revers, c'est que tu peux exister surtout dans le regard des autres et négliger ta propre profondeur : ton plus beau chemin de croissance sera de rayonner d'une lumière qui vient d'abord de l'intérieur.`,
  },

  // Détail de variante : 6 forces, 6 ombres, paradoxe.
  varianteDetail: {
    "ENFJ-V1": {
      forces: [
        { titre: "Le don de révéler", accent: "révéler", texte: "Tu vois le potentiel des gens et tu sais l'éveiller : sous ton regard, les autres osent davantage et grandissent." },
        { titre: "Une lecture fine des êtres", accent: "lecture", texte: "Tu perçois les émotions, les motivations et les besoins avec une justesse rare qui te permet de dire le mot juste." },
        { titre: "Une chaleur qui crée du lien", accent: "chaleur", texte: "Tu inspires confiance et mets les gens à l'aise : auprès de toi, on se sent compris et valorisé." },
        { titre: "Une empathie sincère", accent: "empathie", texte: "Tu ressens vraiment ce que vivent les autres, et cette authenticité donne à ton accompagnement sa profondeur." },
        { titre: "Une organisation au service de l'humain", accent: "organisation", texte: "Tu ne te contentes pas de vouloir aider, tu structures concrètement cette aide et tu vas au bout." },
        { titre: "Une présence qui élève", accent: "élève", texte: "Une parole, un encouragement, une attention de ta part peuvent suffire à changer une trajectoire." },
      ],
      ombres: [
        { titre: "L'oubli de toi", accent: "oubli", texte: "À force de t'occuper des autres et de porter leurs difficultés, tu peux te négliger jusqu'à l'épuisement." },
        { titre: "La dépendance à la reconnaissance", accent: "reconnaissance", texte: "Tu mises tout sur la relation, et le manque de gratitude ou le rejet te touchent profondément." },
        { titre: "L'ingérence bienveillante", accent: "ingérence", texte: "Ton désir d'aider peut glisser vers le besoin de résoudre les problèmes des autres à leur place." },
        { titre: "L'absorption des émotions", accent: "absorption", texte: "Ton empathie est si forte que tu peux porter la souffrance d'autrui comme la tienne, jusqu'à t'en épuiser." },
        { titre: "La difficulté à recevoir", accent: "recevoir", texte: "Tu donnes énormément et tu réclames peu, jusqu'au déséquilibre quand ce n'est pas réciproque." },
        { titre: "Le mal à t'affirmer", accent: "affirmer", texte: "Par peur de blesser ou de déplaire, tu peux taire tes besoins et hésiter à défendre tes intérêts." },
      ],
      paradoxe: {
        tension:
          "Ton don d'élever les autres est immense,\nmais il peut te faire t'oublier complètement toi-même.",
        lumiere:
          "Ta capacité à comprendre, à accompagner et à révéler les gens peut transformer des vies, faire grandir et créer de l'harmonie partout où tu passes.",
        ombre:
          "Mais poussé à l'extrême, ce don peut te conduire à t'épuiser pour les autres, à absorber leurs émotions, à dépendre de leur reconnaissance et à te sentir seul.",
        bascule:
          "Le jour où tu apprends à prendre soin de toi autant que des autres et à recevoir, ta vocation cesse d'être une source d'épuisement pour devenir une lumière durable.",
      },
    },
    "ENFJ-V2": {
      forces: [
        { titre: "Le don de fédérer", accent: "fédérer", texte: "Tu rassembles les gens autour d'une cause et leur donnes l'envie de servir quelque chose de plus grand." },
        { titre: "Un charisme de conviction", accent: "conviction", texte: "Ton charisme est au service de ce en quoi tu crois, et cette sincérité crée une adhésion profonde." },
        { titre: "Une vision qui donne le cap", accent: "vision", texte: "Tu portes une idée claire de ce qui devrait être : tu sais où tu emmènes les gens, pas seulement comment les mobiliser." },
        { titre: "Une empathie qui mobilise", accent: "empathie", texte: "Tu prends soin des gens au sein de la mission, ce qui crée une loyauté et un engagement durables." },
        { titre: "Une organisation efficace", accent: "organisation", texte: "Tu structures l'action, tu mobilises concrètement et tu transformes la vision en résultats réels." },
        { titre: "Un élan contagieux", accent: "élan", texte: "Tu donnes envie de croire, de te rejoindre et de t'engager pour ce qui compte." },
      ],
      ombres: [
        { titre: "Le sacrifice de toi", accent: "sacrifice", texte: "À force de te donner pour ta mission, tu peux disparaître derrière elle et t'épuiser jusqu'au bout." },
        { titre: "La pression sur les autres", accent: "pression", texte: "Ton intensité peut te faire trop attendre des autres et mal vivre leur tiédeur ou leur désengagement." },
        { titre: "La dépendance au succès", accent: "succès", texte: "Tu mets tant de toi dans ta cause que ses revers t'affectent comme des échecs personnels." },
        { titre: "L'évitement des conflits", accent: "évitement", texte: "Ton besoin d'harmonie peut te faire contourner les tensions internes jusqu'à ce qu'elles s'enveniment." },
        { titre: "La difficulté à recevoir", accent: "recevoir", texte: "Tu portes tout le monde et la cause, mais tu acceptes mal d'être porté à ton tour." },
        { titre: "Le manque de recul", accent: "recul", texte: "Sous le coup de la conviction, tu peux décider vite, sans toujours prendre le temps du recul." },
      ],
      paradoxe: {
        tension:
          "Ta capacité à te donner pour une cause fait ta force,\nmais elle peut te faire disparaître derrière elle.",
        lumiere:
          "Ta conviction, ton charisme et ton don de fédérer te permettent de mobiliser et de faire avancer ce qui compte vraiment.",
        ombre:
          "Mais poussées à l'extrême, ces forces peuvent te consumer : tu peux te sacrifier entièrement à ta mission et t'y perdre toi-même.",
        bascule:
          "Le jour où tu sers ta cause sans t'y sacrifier et où tu distingues ta valeur de tes résultats, ton engagement devient une force durable.",
      },
    },
    "ENFJ-V3": {
      forces: [
        { titre: "Un don pour le lien", accent: "lien", texte: "Tu rassembles les gens, tu les mets à l'aise et tu transformes des individus en communauté." },
        { titre: "Une chaleur qui fait du bien", accent: "chaleur", texte: "Tu rayonnes une chaleur sincère qui réchauffe : les gens se sentent vus et appréciés auprès de toi." },
        { titre: "Un sens fin des ambiances", accent: "ambiances", texte: "Tu perçois immédiatement l'atmosphère d'un groupe, les tensions et les besoins de chacun." },
        { titre: "Une empathie authentique", accent: "empathie", texte: "Tu ressens vraiment ce que vivent les autres, et cela donne à ta chaleur sa profondeur." },
        { titre: "Une énergie communicative", accent: "énergie", texte: "Tu insuffles de la joie et de l'enthousiasme, et ta présence rend les moments mémorables." },
        { titre: "Un sens de l'organisation", accent: "organisation", texte: "Tu sais orchestrer des moments réussis et rassembler concrètement les gens, pas seulement le vouloir." },
      ],
      ombres: [
        { titre: "L'existence dans le regard", accent: "regard", texte: "Tu peux faire dépendre ta valeur de l'appréciation et de la présence des autres, et te sentir vide seul." },
        { titre: "Une profondeur négligée", accent: "profondeur", texte: "Tellement tourné vers le social, tu peux délaisser ta vie intérieure et tes besoins profonds." },
        { titre: "La fuite du conflit", accent: "fuite", texte: "Ton besoin d'harmonie peut te faire éviter les tensions et masquer tes émotions derrière ta bonne humeur." },
        { titre: "L'oubli de soi", accent: "oubli", texte: "Ton attention aux autres peut te faire donner sans recevoir et t'épuiser à faire du bien à tous." },
        { titre: "Le besoin de plaire", accent: "plaire", texte: "Ton désir d'être apprécié peut te pousser à trop chercher à plaire et à trop donner." },
        { titre: "La difficulté à être seul", accent: "seul", texte: "Tu peux remplir chaque instant de social, jusqu'à ne jamais te retrouver avec toi-même." },
      ],
      paradoxe: {
        tension:
          "Tu fais tellement de bien aux autres,\nque tu peux t'oublier et n'exister que dans leur regard.",
        lumiere:
          "Ta chaleur, ton don de créer du lien et ta générosité sont des cadeaux immenses pour ceux qui t'entourent.",
        ombre:
          "Mais poussées à l'extrême, ces forces peuvent te faire disparaître : tu peux illuminer tout le monde et te sentir vide dès que tu es seul.",
        bascule:
          "Le jour où tu existes pour toi-même autant que dans le lien et où tu cultives ta profondeur, ta chaleur devient l'expression d'une vraie plénitude.",
      },
    },
  },

  // ~2 paragraphes (« En amour » / « En amitié »).
  relationsTexte: {
    "ENFJ-V1": `En amour comme en amitié, tu es dévoué, attentionné et profondément investi. Tu n'aimes pas à moitié : quand tu aimes, tu prends soin, tu places le bien-être de l'autre au cœur de tes préoccupations et tu l'accompagnes vers le meilleur de lui-même. Être aimé par toi, c'est se sentir vu, compris, valorisé. Tu es souvent le confident, le pilier, celui vers qui on se tourne pour une parole bienveillante, et tes proches savent qu'ils peuvent compter sur toi.

Tes défis sont les revers de ta nature. Ton dévouement peut te faire t'oublier, trop donner et attendre une reconnaissance que tu n'oses pas réclamer, puis te sentir blessé. Ton désir d'aider peut glisser vers le besoin de tout gérer ou d'améliorer l'autre. Ton chemin, c'est d'apprendre à recevoir autant que tu donnes, à exprimer tes propres besoins, à laisser l'autre prendre soin de toi, et à accepter les gens tels qu'ils sont, sans vouloir les guider.`,

    "ENFJ-V2": `En amour comme en amitié, tu cherches bien plus qu'une relation confortable : tu cherches quelqu'un qui partage tes valeurs et avec qui construire quelque chose qui a du sens. Tu es loyal, engagé, et tu mets dans tes liens le même cœur que dans tes causes. Tu rassembles, tu crées du lien, tu pousses tes proches vers le haut et vers ce qui compte. Être aimé par toi, c'est partager une vie tournée vers quelque chose de plus grand, avec quelqu'un de profondément sincère.

Tes défis sont les revers de ta nature. Ton engagement pour tes causes peut te faire négliger la relation, absorbé par ta mission, et ton intensité peut faire peser une pression sur l'autre. Ta tendance à te donner peut te faire t'oublier ou attendre une reconnaissance que tu ne réclames pas. Ton chemin, c'est d'accorder à tes liens autant de soin qu'à tes missions, de laisser les autres à leur rythme, et de recevoir autant que tu donnes.`,

    "ENFJ-V3": `En amour comme en amitié, tu es le cœur du groupe, celui qui rassemble, qui crée des moments, qui fait que tout le monde se sente inclus et bien. Tu apportes de la joie, de la tendresse, une attention constante au bien-être de l'autre. Tu te souviens des gens, tu prends des nouvelles, tu organises, tu réchauffes. Être aimé par toi, c'est se sentir chéri, vu, entouré d'une chaleur qui fait du bien au quotidien.

Tes défis sont les revers de ta nature. Ton large cercle social peut cacher un manque de liens vraiment profonds où tu te livres aussi : tu peux réchauffer tout le monde sans laisser personne te voir vraiment. Ton besoin d'être apprécié peut te rendre dépendant de l'approbation, et ta fuite du conflit empêcher de régler les vraies tensions. Ton chemin, c'est de te montrer dans ta profondeur, de cultiver quelques amitiés vraies, et d'affronter les difficultés plutôt que de les lisser.`,
  },

  // ~2 paragraphes (« Ta carrière » / « Ta façon de travailler »).
  proTexte: {
    "ENFJ-V1": `Au travail, tu es fait pour les rôles où l'on accompagne, où l'on développe, où l'on prend soin des autres. Tu donnes le meilleur de toi quand tu peux avoir un impact humain, aider les gens à grandir, dans un cadre aligné avec tes valeurs. Tu excelles dans tout ce qui touche au développement humain : l'enseignement et la formation, le coaching et le mentorat, les ressources humaines, l'accompagnement et le conseil, les métiers de l'aide et du soin. Tu allies, plus que beaucoup, la chaleur et l'organisation, ce qui te rend précieux.

Ce qui t'éteint, ce sont les environnements froids, purement transactionnels ou déshumanisés, la compétition agressive et l'absence de sens. Ton défi principal, c'est ton propre équilibre : ta compétence est rarement en cause, mais tu peux trop t'oublier, absorber le poids des autres et t'épuiser. Apprendre à poser des limites, à te préserver et à t'affirmer est ce qui rend ta belle vocation durable et reconnue.`,

    "ENFJ-V2": `Au travail, tu es fait pour les rôles où l'on porte et où l'on fédère autour d'une cause. Tu prends vie quand ton travail a du sens, qu'il te permet de mobiliser les gens autour d'un but qui compte et de contribuer à quelque chose de plus grand. Tu excelles dans le leadership d'organisations à mission, le secteur associatif et humanitaire, l'engagement social ou environnemental, l'enseignement porteur de valeurs, la direction d'équipes et la communication au service d'une cause. Tu allies la chaleur fédératrice et l'organisation, et ta conviction se traduit en résultats réels.

Ce qui t'éteint, ce sont les environnements cyniques ou vides de sens, le travail purement individuel ou lucratif. Ton défi principal, c'est ton propre équilibre : tu peux te sacrifier à ta mission, t'épuiser, faire dépendre ton moral de son succès ou trop pousser les autres. Apprendre à te préserver, à respecter le rythme des autres et à distinguer ta valeur de tes résultats rend ton engagement durable et efficace.`,

    "ENFJ-V3": `Au travail, tu es fait pour les rôles où l'on crée du lien, où l'on rassemble, où l'on fait vivre les collectifs. Tu prends vie quand tu peux interagir, animer, faire du bien aux gens, dans une carrière riche en contact humain. Tu excelles dans tout ce qui mobilise ta chaleur et ton sens du lien : l'animation et l'événementiel, l'enseignement, les relations humaines, l'accueil et l'accompagnement, la communication, l'animation d'équipes et de communautés. Tu allies la chaleur sociale et un vrai sens de l'organisation, ce qui te rend précieux pour la cohésion.

Ce qui t'éteint, c'est l'isolement et les environnements froids, techniques ou conflictuels. Ton défi principal, c'est ton équilibre et ta profondeur : tu peux faire dépendre ton moral de l'appréciation des autres, t'épuiser à plaire ou rester en surface. Apprendre à exister pour toi-même, à affronter les tensions et à cultiver ta vie intérieure te rend plus solide et plus accompli professionnellement.`,
  },

  // 1 paragraphe d'accroche (intro de « Ton chemin de croissance »).
  mindsetTexte: {
    "ENFJ-V1": {
      apercu: `Ton plus grand chantier n'est pas autour de toi, il est en toi. Tu portes un don rare pour révéler les autres, mais aussi une tendance qui peut se retourner contre toi : t'oublier à force de donner, absorber les émotions de tous, dépendre de leur reconnaissance. La bonne nouvelle, c'est que ces fragilités sont aussi tes plus grands leviers de croissance, à condition de savoir où appuyer.`,
    },
    "ENFJ-V2": {
      apercu: `Ton plus grand chantier n'est pas de trouver une cause, ton cœur en déborde, c'est d'apprendre à la porter sans t'y consumer. Tu portes en toi une flamme fédératrice rare, mais aussi une tendance à te sacrifier, à faire dépendre ton équilibre du succès de ta mission, à trop pousser les autres. La bonne nouvelle, c'est que ces fragilités sont aussi tes plus grands leviers de croissance, à condition de savoir où appuyer.`,
    },
    "ENFJ-V3": {
      apercu: `Ton plus grand chantier n'est pas de créer du lien, tu le fais naturellement, c'est d'apprendre à exister pour toi-même. Tu portes en toi une chaleur rayonnante, mais aussi une tendance à n'exister que dans le regard des autres, à négliger ta profondeur, à fuir ce qui est difficile. La bonne nouvelle, c'est que ces fragilités sont aussi tes plus grands leviers de croissance, à condition de savoir où appuyer.`,
    },
  },

  // Détail enrichi des grandes sections (relations, carriere, developpement) par variante.
  sectionDetail: {
    // ----------------------------------------------------------------- V1 -----
    "ENFJ-V1-relations": {
      forces: [
        { titre: "Un dévouement chaleureux", accent: "dévouement", texte: "Quand tu aimes, tu te donnes pleinement et tu places le bien-être de l'autre au cœur de tout." },
        { titre: "Une attention qui voit", accent: "attention", texte: "Tu anticipes les besoins de l'autre et tu le fais se sentir vu, compris et valorisé." },
        { titre: "Une écoute de confident", accent: "écoute", texte: "On se tourne vers toi pour une parole bienveillante : tu sais accueillir et apaiser." },
        { titre: "Le don d'élever l'autre", accent: "élever", texte: "Tu accompagnes tes proches vers le meilleur d'eux-mêmes et te réjouis de leurs réussites." },
        { titre: "Une loyauté totale", accent: "loyauté", texte: "Une fois engagé, tu offres une présence aimante et un soutien indéfectible." },
        { titre: "Une chaleur qui rassure", accent: "chaleur", texte: "Auprès de toi, on se sent en sécurité, accueilli et profondément accompagné." },
      ],
      ombres: [
        { titre: "L'oubli de tes besoins", accent: "oubli", texte: "À trop prendre soin de l'autre, tu peux te négliger et taire ce dont tu as besoin." },
        { titre: "L'attente de reconnaissance", accent: "reconnaissance", texte: "Tu donnes sans réclamer, puis tu te sens blessé quand la gratitude manque." },
        { titre: "Le besoin de tout gérer", accent: "gérer", texte: "Ton désir d'aider peut glisser vers l'envie d'améliorer l'autre ou de gérer sa vie." },
        { titre: "L'absorption des soucis", accent: "absorption", texte: "Tu portes les difficultés de la relation seul, comme si elles étaient les tiennes." },
        { titre: "Le déséquilibre du don", accent: "déséquilibre", texte: "Tu donnes tant que la relation peut devenir asymétrique, jusqu'au ressentiment." },
        { titre: "La difficulté à recevoir", accent: "recevoir", texte: "Tu sais soutenir, mais tu acceptes mal qu'on prenne soin de toi en retour." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "Les liens de surface, sans profondeur ni partage vrai.",
            "Les personnes qui prennent sans jamais rien donner en retour.",
            "L'ingratitude et le manque de reconnaissance.",
            "Les relations qui te coupent de tes propres besoins.",
            "La froideur émotionnelle et l'indifférence.",
          ],
        },
        {
          ton: "positif",
          items: [
            "Des liens profonds, sincères et porteurs de sens.",
            "Un partenaire qui sait aussi prendre soin de toi.",
            "De la réciprocité dans le don et l'attention.",
            "Le respect de tes besoins et de ton espace.",
            "Quelqu'un qui apprécie ta chaleur sans en abuser.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Les tempéraments très indépendants, rétifs à être accompagnés.",
            "Les profils froids ou détachés émotionnellement.",
            "Les personnes qui prennent sans donner.",
          ],
          profils: [
            { code: "ISTP", raison: "sa réserve et son besoin de distance peuvent te laisser sur ta faim affective." },
            { code: "INTP", raison: "son détachement émotionnel peut heurter ton besoin de connexion chaleureuse." },
            { code: "ESTP", raison: "son indépendance et son rythme peuvent te frustrer quand tu veux accompagner." },
          ],
        },
        {
          ton: "positif",
          items: [
            "Les esprits intuitifs et tournés vers les gens et les valeurs.",
            "Les tempéraments réfléchis qui t'évitent de trop t'oublier.",
            "Ceux qui savent prendre soin de toi en retour.",
          ],
          profils: [
            { code: "INFP", raison: "il partage ta quête de sens et ta profondeur, et apprécie ta chaleur attentive." },
            { code: "INTJ", raison: "son recul et son autonomie t'équilibrent et t'aident à ne pas trop te donner." },
            { code: "ISFP", raison: "sa douceur posée t'offre une stabilité rassurante et accueille ta tendresse." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Tu offres une présence qui élève et qui accompagne,\nmais à trop donner, tu risques de t'oublier et d'attendre en silence.",
        lumiere:
          "Ton dévouement, ton attention et ton don d'élever font de toi un proche rare, auprès de qui on se sent vu et accompagné.",
        ombre:
          "Mais à taire tes besoins, à vouloir tout gérer et à dépendre de la reconnaissance, tu fragilises l'équilibre des liens que tu chéris.",
        bascule:
          "Le jour où tu reçois autant que tu donnes et où tu oses dire tes besoins, tes relations deviennent à la fois généreuses et soutenables.",
      },
    },
    "ENFJ-V1-carriere": {
      forces: [
        { titre: "Le développement des autres", accent: "développement", texte: "Tu fais grandir les gens : enseigner, former, accompagner sont des terrains où tu excelles." },
        { titre: "Une intuition sur l'humain", accent: "intuition", texte: "Tu perçois les besoins et le potentiel de chacun, ce qui fait de toi un mentor précieux." },
        { titre: "Une chaleur fédératrice", accent: "chaleur", texte: "Tu crées du lien et une bonne ambiance qui poussent toute une équipe vers le haut." },
        { titre: "Une organisation fiable", accent: "organisation", texte: "Tu structures, tu planifies et tu mènes les choses au bout : ta bienveillance se traduit en actes." },
        { titre: "Un sens du service", accent: "service", texte: "Tu donnes le meilleur quand ton travail aide concrètement les gens à devenir meilleurs." },
        { titre: "Une fiabilité humaine", accent: "fiabilité", texte: "On peut compter sur toi : tu allies l'attention aux gens et l'efficacité dans l'exécution." },
      ],
      ombres: [
        { titre: "L'oubli de toi", accent: "oubli", texte: "Tu peux trop t'oublier, absorber le poids des autres et t'épuiser au travail." },
        { titre: "Le mal à t'affirmer", accent: "affirmer", texte: "Tu peux avoir du mal à défendre tes intérêts et à faire valoir ta contribution." },
        { titre: "La surcharge par le don", accent: "surcharge", texte: "À vouloir être là pour tout le monde, tu te remplis trop et tu ne t'arrêtes jamais." },
        { titre: "La dépendance à la reconnaissance", accent: "reconnaissance", texte: "Le manque d'appréciation peut entamer ta motivation plus que tu ne le montres." },
        { titre: "La difficulté à déléguer", accent: "déléguer", texte: "Ton sens des responsabilités peut te faire tout porter au lieu de partager la charge." },
        { titre: "Le poids émotionnel", accent: "poids", texte: "Tu absorbes les difficultés des gens que tu accompagnes, jusqu'à t'en charger toi-même." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "Les environnements froids et purement transactionnels.",
            "La compétition agressive et les ambiances cyniques.",
            "Un travail sans impact humain ni sens.",
            "Les cadres déshumanisés et impersonnels.",
            "L'absence totale de reconnaissance.",
          ],
        },
        {
          ton: "positif",
          items: [
            "Un travail qui aide concrètement les gens à grandir.",
            "Un environnement chaleureux et respectueux.",
            "La possibilité d'accompagner et de développer les talents.",
            "Un cadre aligné avec tes valeurs.",
            "Une équipe où l'humain compte vraiment.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Les postes froids, purement techniques ou transactionnels.",
            "Les environnements compétitifs et déshumanisés.",
            "Le travail isolé et sans impact sur les gens.",
          ],
          profils: [
            { nom: "Finance pure & trading", raison: "l'absence de dimension humaine et la compétition t'éteignent." },
            { nom: "Postes très impersonnels", raison: "le manque de lien et de sens te démotive profondément." },
            { nom: "Travail solitaire et technique", raison: "sans contact humain à accompagner, tu t'étioles." },
          ],
        },
        {
          ton: "positif",
          items: [
            "L'enseignement, la formation et le mentorat.",
            "Le coaching, l'accompagnement et le conseil.",
            "Les métiers de l'aide, du soin et des ressources humaines.",
          ],
          profils: [
            { nom: "Enseignement & formation", raison: "professeur, formateur : faire grandir les gens jour après jour." },
            { nom: "Coaching & accompagnement", raison: "coach, conseiller : révéler le potentiel et guider un par un." },
            { nom: "Aide, soin & RH", raison: "soignant, RH : prendre soin et développer l'humain au cœur du travail." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Ta vocation à accompagner fait de toi un professionnel précieux,\nmais à trop t'oublier, tu risques l'épuisement et l'effacement.",
        lumiere:
          "Ton intuition sur l'humain, ta chaleur et ton organisation font de toi un mentor fiable qui transforme la bienveillance en résultats.",
        ombre:
          "Mais à absorber le poids des autres, à ne jamais t'arrêter et à peiner à t'affirmer, tu t'exposes à l'épuisement.",
        bascule:
          "Le jour où tu poses des limites, où tu te préserves et où tu oses t'affirmer, ta belle vocation devient durable et pleinement reconnue.",
      },
    },
    "ENFJ-V1-developpement": {
      evolution: `Ta personnalité n'est pas figée : elle mûrit, et ton type suit une trajectoire de croissance particulièrement marquée. Plus jeune, tu es tout entier dans ta vocation et ta chaleur : comprendre, accompagner, aider, élever les autres. C'est beau et généreux, mais souvent déséquilibré : tu peux t'oublier complètement, absorber les émotions des autres, t'épuiser à donner et dépendre de leur reconnaissance.

Avec le temps, quelque chose de précieux s'ouvre en toi. Tu comprends que tu ne peux donner durablement que si tu te préserves, que prendre soin de toi n'est pas égoïste mais nécessaire, qu'accompagner suppose de respecter les choix des autres. Tu apprends à poser des limites, à recevoir, à t'affirmer, à puiser ta valeur en toi-même. Dans ta pleine maturité, tu deviens un guide chaleureux qui élève les autres sans s'oublier, qui sait donner et recevoir. C'est la version la plus belle de toi, et elle est entièrement à ta portée.`,
      etapes: [
        "Sensible aux autres très tôt, tu captes les ambiances, tu consoles, tu prends soin. Tu te sens utile et heureux quand ceux qui t'entourent vont bien.",
        "Ta vocation se révèle pleinement : tu accompagnes, tu encourages, tu élèves. C'est généreux, mais souvent déséquilibré, tu t'oublies, tu absorbes tout et tu dépends de la reconnaissance.",
        "Tu comprends que tu ne peux donner durablement que si tu te préserves. Tu apprends à poser des limites, à recevoir, à t'affirmer et à respecter les choix des autres.",
        "Dans ta pleine maturité, tu es un guide chaleureux qui élève les autres sans s'oublier. Tu sais donner et recevoir, et ta vocation se nourrit aussi elle-même : la version la plus accomplie de toi.",
      ],
      leviersForts: [
        { titre: "Apprends à prendre soin de toi", texte: "Honore tes propres besoins, accorde-toi du repos, mets-toi parfois en premier sans culpabiliser. Te préserver est ce qui te permet de donner durablement." },
        { titre: "Apprends à recevoir", texte: "Laisse les autres prendre soin de toi. Une relation saine repose sur la réciprocité, et recevoir te remplit pour continuer à donner." },
        { titre: "Détache ta valeur de la reconnaissance", texte: "Tu vaux indépendamment de ce que les autres reconnaissent. Cette autonomie intérieure te rend bien plus solide face aux déceptions." },
        { titre: "Respecte la liberté des autres", texte: "Accompagner, c'est soutenir, pas diriger. Offre ton aide sans imposer ta direction et laisse chacun faire ses propres choix." },
      ],
      questions: [
        { situation: "Quand tu prends soin de tout le monde", question: "Est-ce que je m'occupe aussi de moi, ou je me garde pour la fin ?" },
        { situation: "Quand la gratitude manque", question: "Est-ce que ma valeur dépend vraiment de leur reconnaissance ?" },
        { situation: "Quand tu veux aider un proche", question: "Est-ce que je l'accompagne, ou est-ce que je décide à sa place ?" },
        { situation: "Quand tu absorbes la peine d'un autre", question: "Est-ce sa souffrance, ou est-ce que je la porte comme si c'était la mienne ?" },
        { situation: "Quand on t'offre du soutien", question: "Est-ce que je sais recevoir, ou est-ce que je refuse par réflexe ?" },
      ],
      paradoxe: {
        tension:
          "Pour continuer à élever les autres, tu dois apprendre à te préserver,\nmais prendre soin de toi te semble parfois égoïste.",
        lumiere:
          "Ta chaleur, ton intuition sur l'humain et ton don d'accompagner sont des trésors qui transforment les vies autour de toi.",
        ombre:
          "Mais sans jamais te préserver ni recevoir, ta belle vocation peut te vider et te conduire à l'épuisement.",
        bascule:
          "Le jour où tu vois le soin de toi non comme un égoïsme mais comme la condition de ton don, tu deviens un guide accompli qui s'élève en élevant les autres.",
      },
    },
    // ----------------------------------------------------------------- V2 -----
    "ENFJ-V2-relations": {
      forces: [
        { titre: "Un engagement profond", accent: "engagement", texte: "Tu mets dans tes liens le même cœur que dans tes causes : tu t'investis vraiment et durablement." },
        { titre: "Le partage de valeurs", accent: "valeurs", texte: "Tu construis des liens fondés sur le sens et une vision de la vie partagée." },
        { titre: "Une loyauté chaleureuse", accent: "loyauté", texte: "Une fois engagé, tu soutiens, tu pousses l'autre vers le meilleur de lui-même, tu construis à deux." },
        { titre: "Un don de fédérer", accent: "fédérer", texte: "Tu rassembles tes proches, tu proposes des projets, tu donnes du sens aux liens." },
        { titre: "Une présence inspirante", accent: "inspirante", texte: "Tu fais ressortir le meilleur de ceux que tu aimes et tu leur donnes envie de grandir." },
        { titre: "Un soutien sincère", accent: "soutien", texte: "Tes proches savent qu'ils peuvent compter sur ton appui et sur ta capacité à les entraîner." },
      ],
      ombres: [
        { titre: "La relation négligée", accent: "négligée", texte: "Absorbé par tes causes, tu peux délaisser le lien et ceux qui te sont proches." },
        { titre: "La pression sur l'autre", accent: "pression", texte: "Ton intensité peut peser et te faire pousser l'autre plus qu'il ne le souhaite." },
        { titre: "L'oubli de toi", accent: "oubli", texte: "Ta tendance à te donner peut te faire t'oublier et attendre une reconnaissance que tu tais." },
        { titre: "La dispersion", accent: "dispersion", texte: "Tu peux te disperser entre tes engagements au détriment de l'entretien des liens." },
        { titre: "L'évitement des tensions", accent: "évitement", texte: "Ton besoin d'harmonie peut te faire contourner les vrais désaccords du couple." },
        { titre: "La difficulté à recevoir", accent: "recevoir", texte: "Tu portes et tu soutiens, mais tu acceptes mal d'être porté à ton tour." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "Les personnes dont les valeurs heurtent profondément les tiennes.",
            "Le cynisme et l'indifférence aux causes qui te tiennent à cœur.",
            "Les liens de surface, sans projet ni profondeur.",
            "Un partenaire qui concurrence ton engagement au lieu de le soutenir.",
            "L'absence de sens et de vision partagée.",
          ],
        },
        {
          ton: "positif",
          items: [
            "Un compagnon de route qui partage ou respecte tes valeurs.",
            "Des projets communs et une vision de la vie partagée.",
            "De la réciprocité, où l'on prend soin de toi quand tu te donnes.",
            "Le respect de ton engagement comme partie de qui tu es.",
            "De la sincérité, de la profondeur et du sens.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Les tempéraments très pragmatiques, indifférents aux causes.",
            "Les profils individualistes ou détachés émotionnellement.",
            "Les personnes au rythme heurté par ton intensité.",
          ],
          profils: [
            { code: "ISTP", raison: "son détachement et son indépendance peuvent te sembler tièdes face à ta flamme." },
            { code: "ESTP", raison: "son pragmatisme et son individualisme s'accordent mal à ta quête de sens." },
            { code: "INTP", raison: "sa réserve émotionnelle peut te laisser seul dans ton engagement passionné." },
          ],
        },
        {
          ton: "positif",
          items: [
            "Les esprits intuitifs et tournés vers les valeurs et le sens.",
            "Les tempéraments calmes qui t'ancrent et t'évitent l'épuisement.",
            "Ceux qui partagent ton désir d'un monde meilleur.",
          ],
          profils: [
            { code: "INFJ", raison: "il partage ta quête de sens et ton désir d'un monde meilleur, et t'aide à ne pas t'épuiser." },
            { code: "INFP", raison: "sa profondeur et ses valeurs rejoignent ta flamme et t'apportent de la nuance." },
            { code: "ISFJ", raison: "sa stabilité posée t'ancre et te rappelle de prendre soin de toi." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Tu mets dans tes liens le même cœur que dans tes causes,\nmais ta mission peut te faire négliger ceux que tu aimes.",
        lumiere:
          "Ton engagement, ta loyauté et ton don de fédérer font de toi un partenaire profond, qui pousse l'autre vers le meilleur.",
        ombre:
          "Mais à t'absorber dans tes causes, à faire peser ton intensité et à t'oublier, tu fragilises les liens qui comptent.",
        bascule:
          "Le jour où tu accordes à la relation autant de soin qu'à ta mission et où tu laisses l'autre à son rythme, ton amour devient porteur et durable.",
      },
    },
    "ENFJ-V2-carriere": {
      forces: [
        { titre: "Le don de mobiliser", accent: "mobiliser", texte: "Tu rassembles les gens autour d'un but et tu transformes des individus en mouvement." },
        { titre: "Une vision claire", accent: "vision", texte: "Tu portes un cap et un sens qui donnent une direction à toute une équipe." },
        { titre: "Un charisme de conviction", accent: "conviction", texte: "Ton charisme au service de tes valeurs crée une adhésion sincère et profonde." },
        { titre: "Une organisation tournée vers le but", accent: "organisation", texte: "Tu structures l'action et tu mènes la mission jusqu'à des résultats concrets." },
        { titre: "Une attention à l'humain", accent: "humain", texte: "Tu ne sacrifies pas les gens à la cause : tu mobilises en prenant soin, ce qui fidélise." },
        { titre: "Un moteur de sens", accent: "sens", texte: "Tu donnes de l'élan et de la signification à l'action collective partout où tu passes." },
      ],
      ombres: [
        { titre: "Le sacrifice de toi", accent: "sacrifice", texte: "Tu peux te donner pour ta mission jusqu'à l'épuisement et à l'oubli de ta vie personnelle." },
        { titre: "La pression sur l'équipe", accent: "pression", texte: "Ton intensité peut te faire trop pousser les autres et mal vivre leur tiédeur." },
        { titre: "La dépendance au succès", accent: "succès", texte: "Tu peux vivre les revers de ta cause comme des échecs personnels." },
        { titre: "L'évitement des conflits", accent: "évitement", texte: "Ton besoin d'harmonie peut te faire contourner les tensions internes jusqu'à l'explosion." },
        { titre: "Le manque de recul", accent: "recul", texte: "Sous le coup de la conviction, tu peux décider vite, sans toujours peser le réel." },
        { titre: "La surcharge", accent: "surcharge", texte: "Tu portes ta mission sans relâche, jusqu'au surmenage, sans t'accorder de répit." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "Les environnements cyniques ou vides de sens.",
            "Le travail purement lucratif ou individuel.",
            "Les ambiances contraires à tes convictions.",
            "L'absence d'enjeu collectif à porter.",
            "Les cadres où l'on ne peut ni mobiliser ni mener.",
          ],
        },
        {
          ton: "positif",
          items: [
            "Un travail aligné avec tes valeurs et porteur de sens.",
            "Un enjeu collectif à fédérer et à porter.",
            "La possibilité de mobiliser et de mener une équipe.",
            "Une cause qui dépasse ton intérêt personnel.",
            "Une mission qui transforme tes convictions en résultats.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Les postes purement lucratifs, sans cause ni sens.",
            "Les environnements individualistes et cyniques.",
            "Le travail isolé, sans enjeu collectif.",
          ],
          profils: [
            { nom: "Finance & vente pure", raison: "l'absence de cause et le cynisme assèchent ta flamme." },
            { nom: "Postes individualistes", raison: "sans enjeu collectif à porter, tu perds ton moteur." },
            { nom: "Travail isolé & technique", raison: "ni mobilisation ni mission ne viennent te nourrir." },
          ],
        },
        {
          ton: "positif",
          items: [
            "Le secteur associatif, humanitaire et l'engagement social.",
            "La direction d'organisations et d'équipes à mission.",
            "La communication et la formation au service d'une cause.",
          ],
          profils: [
            { nom: "Associatif & humanitaire", raison: "porter une cause et mobiliser autour d'un but qui te dépasse." },
            { nom: "Direction à mission", raison: "diriger une organisation ou une équipe autour d'une vision." },
            { nom: "Communication engagée", raison: "communicant, formateur : fédérer et donner du sens à l'action." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Ta capacité à te donner pour une cause fait ta force au travail,\nmais elle peut te faire disparaître derrière ta mission.",
        lumiere:
          "Ton don de mobiliser, ta vision et ton organisation font de toi un meneur qui transforme une cause en résultats réels.",
        ombre:
          "Mais à te sacrifier, à dépendre du succès et à trop pousser les autres, tu t'exposes à l'épuisement et à la cassure.",
        bascule:
          "Le jour où tu sers ta mission sans t'y consumer et où tu respectes le rythme des autres, ton engagement porte loin et dure.",
      },
    },
    "ENFJ-V2-developpement": {
      evolution: `Ta personnalité n'est pas figée : elle mûrit, et ton type suit une trajectoire de croissance particulièrement marquée. Plus jeune, tu es tout entier dans ta mission et ta flamme : porter une cause, mobiliser, fédérer, te donner pour ce qui compte. C'est beau et puissant, mais souvent déséquilibré : tu peux te sacrifier entièrement, faire dépendre ton équilibre du succès de ta cause et pousser trop fort ton entourage.

Avec le temps, quelque chose de précieux s'ouvre en toi. Tu comprends que tu ne peux porter une mission durablement que si tu te préserves, que ta valeur ne dépend pas du succès de ta cause, que respecter le rythme des autres renforce l'adhésion. Tu apprends à doser ton intensité, à distinguer ta valeur de tes résultats, à recevoir. Dans ta pleine maturité, tu deviens un leader de mission qui fédère sans se sacrifier, qui allie la flamme de la conviction à la sagesse de l'équilibre. Et c'est entièrement à ta portée.`,
      etapes: [
        "Très tôt, le sens de la justice et l'envie de rassembler t'animent. Tu défends les plus faibles et tu entraînes déjà les autres dans tes élans.",
        "Ta flamme est à son comble : tu portes des causes, tu mobilises, tu te donnes sans compter. C'est puissant, mais tu peux te sacrifier et lier ton équilibre au succès de ta mission.",
        "Tu comprends que tu portes une cause durablement seulement si tu te préserves. Tu apprends à doser ton intensité, à respecter le rythme des autres et à distinguer ta valeur de tes résultats.",
        "Dans ta pleine maturité, tu es un leader qui fédère sans se sacrifier. Ta flamme est devenue durable et donc plus puissante : la version la plus accomplie de toi.",
      ],
      leviersForts: [
        { titre: "Apprends à te préserver", texte: "Sers ta mission sans t'y sacrifier : protège ton énergie, accorde-toi du repos, honore tes propres besoins. Un leader qui dure porte sa cause loin." },
        { titre: "Détache ta valeur du succès", texte: "Tu vaux indépendamment des résultats de ta cause. Cette distinction te libère et te rend bien plus solide face aux revers." },
        { titre: "Respecte le rythme des autres", texte: "Mobilise sans forcer, inspire sans imposer, laisse chacun s'engager à sa mesure. L'adhésion sincère vaut mieux que l'engagement forcé." },
        { titre: "Apprends à recevoir", texte: "Tu te donnes énormément ; accepte le soutien, l'aide et l'attention. Être porté toi aussi te permet de continuer à porter les autres." },
      ],
      questions: [
        { situation: "Quand tu te donnes pour ta cause", question: "Est-ce que je me préserve aussi, ou je me sacrifie sans m'en rendre compte ?" },
        { situation: "Quand ta mission rencontre un revers", question: "Est-ce un échec de la cause, ou un échec de ma valeur personnelle ?" },
        { situation: "Quand les autres ne suivent pas ton rythme", question: "Est-ce que je respecte leur mesure, ou je pousse trop fort ?" },
        { situation: "Quand une tension monte dans le groupe", question: "Est-ce que je l'affronte, ou je l'évite par besoin d'harmonie ?" },
        { situation: "Quand on t'offre de l'aide", question: "Est-ce que j'accepte d'être porté, ou je veux tout tenir seul ?" },
      ],
      paradoxe: {
        tension:
          "Pour mener ta mission loin, tu dois apprendre à te préserver,\nmais te ménager te semble parfois trahir ta cause.",
        lumiere:
          "Ta conviction, ton charisme et ton don de fédérer sont des forces rares qui peuvent vraiment faire bouger les choses.",
        ombre:
          "Mais sans jamais te ménager ni distinguer ta valeur de tes résultats, ta flamme te consume avant d'avoir tout donné.",
        bascule:
          "Le jour où tu vois le soin de toi comme la condition de ton impact, ta flamme cesse d'être un risque et devient une lumière durable qui rassemble.",
      },
    },
    // ----------------------------------------------------------------- V3 -----
    "ENFJ-V3-relations": {
      forces: [
        { titre: "Une chaleur quotidienne", accent: "chaleur", texte: "Tu apportes de la joie et de la tendresse, et tu rends la vie de l'autre plus légère au jour le jour." },
        { titre: "Une attention présente", accent: "attention", texte: "Tu prends des nouvelles, tu te souviens, tu valorises : auprès de toi, on se sent chéri et vu." },
        { titre: "Un don de rassembler", accent: "rassembler", texte: "Tu crées des moments, tu fais que tout le monde se sente inclus et bien ensemble." },
        { titre: "Une loyauté tendre", accent: "loyauté", texte: "Une fois engagé, tu prends soin et tu crées une relation pleine de chaleur et de joie partagée." },
        { titre: "Une énergie communicative", accent: "énergie", texte: "Ta bonne humeur dynamise tes liens et fait vivre les groupes d'amis." },
        { titre: "Une empathie sincère", accent: "empathie", texte: "Tu ressens vraiment ce que vivent tes proches et tu leur offres une attention authentique." },
      ],
      ombres: [
        { titre: "La dépendance à l'approbation", accent: "approbation", texte: "Ton besoin d'être apprécié peut te rendre dépendant de l'approbation de l'autre." },
        { titre: "Le besoin de plaire", accent: "plaire", texte: "Tu peux trop chercher à plaire et trop donner, jusqu'à t'oublier toi-même." },
        { titre: "La surface", accent: "surface", texte: "Ton large cercle peut cacher un manque de liens vraiment profonds où tu te livres." },
        { titre: "Les émotions masquées", accent: "masquées", texte: "Tu peux cacher tes vraies difficultés derrière ta bonne humeur et rester en surface." },
        { titre: "La fuite du conflit", accent: "fuite", texte: "Ton besoin d'harmonie t'empêche parfois de régler les vraies tensions du couple." },
        { titre: "La difficulté à te montrer", accent: "montrer", texte: "Tu réchauffes tout le monde, mais tu laisses rarement quelqu'un te voir vraiment." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "Les relations de pure surface, sans vraie intimité.",
            "Les personnes froides ou peu démonstratives qui te font douter.",
            "Le rejet et le manque d'appréciation.",
            "Les liens où tu n'oses jamais te montrer vrai.",
            "Les tensions qu'on laisse pourrir faute d'en parler.",
          ],
        },
        {
          ton: "positif",
          items: [
            "Quelqu'un qui te voit au-delà de ton rayonnement social.",
            "De l'intimité, de la tendresse et de la profondeur.",
            "Un partenaire qui te réchauffe en retour.",
            "Des liens où tu oses te livrer et être vulnérable.",
            "Une appréciation sincère qui ne te rend pas dépendant.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Les tempéraments très réservés ou peu démonstratifs.",
            "Les profils distants qui te font douter d'être apprécié.",
            "Les personnes fermées à la chaleur et au lien.",
          ],
          profils: [
            { code: "INTP", raison: "sa réserve et son détachement peuvent te faire douter d'être apprécié." },
            { code: "ISTP", raison: "son peu de démonstrativité peut te laisser sur ta faim de chaleur." },
            { code: "INTJ", raison: "sa distance émotionnelle peut heurter ton besoin de lien chaleureux." },
          ],
        },
        {
          ton: "positif",
          items: [
            "Les esprits chaleureux et tournés vers les gens.",
            "Les tempéraments calmes et profonds qui t'ancrent.",
            "Ceux qui chérissent la personne derrière l'animateur.",
          ],
          profils: [
            { code: "INFJ", raison: "sa profondeur t'aide à aller au-delà du social vers une vraie connexion intérieure." },
            { code: "ISFP", raison: "sa douceur posée t'ancre et chérit la personne derrière ton rayonnement." },
            { code: "ENFP", raison: "sa chaleur et ses valeurs rejoignent ton goût du lien sincère et joyeux." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Tu réchauffes tout le monde et tu crées du lien partout,\nmais tu peux n'exister que dans le regard des autres.",
        lumiere:
          "Ta chaleur, ta présence et ta générosité font de toi un proche rare, auprès de qui on se sent chéri et entouré.",
        ombre:
          "Mais à dépendre de l'approbation, à rester en surface et à fuir le conflit, tu fragilises l'authenticité de tes liens.",
        bascule:
          "Le jour où tu oses te montrer vrai et profond et où tu n'attends plus tout du regard des autres, tes relations gagnent en authenticité et en solidité.",
      },
    },
    "ENFJ-V3-carriere": {
      forces: [
        { titre: "Un don pour le lien", accent: "lien", texte: "Tu crées de la connexion et de la cohésion : tu fais tenir et vivre les équipes." },
        { titre: "Une chaleur qui dynamise", accent: "chaleur", texte: "Tu crées une ambiance positive et tu mets de l'huile dans les rouages humains." },
        { titre: "Un sens des ambiances", accent: "ambiances", texte: "Tu perçois les tensions et les besoins de chacun, et tu désamorces ce qui coince." },
        { titre: "Une énergie communicative", accent: "énergie", texte: "Tu insuffles de la joie et de l'enthousiasme, et tu rends les moments mémorables." },
        { titre: "Un sens de l'organisation", accent: "organisation", texte: "Tu sais orchestrer des moments réussis et faire en sorte que les choses aboutissent." },
        { titre: "Le goût du contact", accent: "contact", texte: "Tu donnes le meilleur dans les métiers riches en interactions chaleureuses." },
      ],
      ombres: [
        { titre: "La dépendance à l'appréciation", accent: "appréciation", texte: "Tu peux faire dépendre ton moral de l'approbation des autres au travail." },
        { titre: "La fuite du conflit", accent: "fuite", texte: "Ton besoin d'harmonie peut te faire lisser les tensions au lieu de les régler." },
        { titre: "La profondeur négligée", accent: "profondeur", texte: "Tu peux rester en surface et délaisser ta propre vie intérieure et tes besoins." },
        { titre: "L'épuisement à plaire", accent: "épuisement", texte: "À vouloir faire du bien à tout le monde, tu peux donner sans recevoir et t'épuiser." },
        { titre: "La difficulté à trancher", accent: "trancher", texte: "Ton besoin de plaire peut te faire décider pour ne pas créer de tensions." },
        { titre: "L'isolement qui éteint", accent: "isolement", texte: "Le travail solitaire et les ambiances froides t'éteignent vite et te démotivent." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "L'isolement et le travail purement solitaire.",
            "Les environnements froids ou purement techniques.",
            "Les ambiances conflictuelles et tendues.",
            "Le manque total de contact humain.",
            "Les cadres où la chaleur n'a aucune place.",
          ],
        },
        {
          ton: "positif",
          items: [
            "Un travail riche en contact humain et en interactions.",
            "Un environnement chaleureux et vivant.",
            "La possibilité de créer du lien et de l'harmonie.",
            "Des moments à orchestrer et des groupes à animer.",
            "Une équipe où ta chaleur est un atout reconnu.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Le travail solitaire et sans contact humain.",
            "Les postes froids, techniques ou impersonnels.",
            "Les environnements tendus et conflictuels.",
          ],
          profils: [
            { nom: "Travail solitaire & technique", raison: "sans contact humain, tu t'éteins et tu te démotives." },
            { nom: "Postes froids & impersonnels", raison: "l'absence de chaleur et de lien te prive de ton moteur." },
            { nom: "Ambiances conflictuelles", raison: "les tensions permanentes usent ta belle énergie." },
          ],
        },
        {
          ton: "positif",
          items: [
            "L'animation, l'événementiel et la communication.",
            "L'enseignement, l'accueil et l'accompagnement.",
            "L'animation d'équipes et de communautés.",
          ],
          profils: [
            { nom: "Animation & événementiel", raison: "animateur, organisateur : créer des moments et rassembler les gens." },
            { nom: "Enseignement & accueil", raison: "professeur, hôte : faire du bien et mettre les gens à l'aise." },
            { nom: "Communautés & équipes", raison: "community manager, RH : créer du lien et de la cohésion." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Ta chaleur et ton don de créer du lien font ta valeur au travail,\nmais tu peux dépendre du regard des autres et rester en surface.",
        lumiere:
          "Ton don pour le lien, ta chaleur et ton énergie font de toi un créateur de cohésion précieux dans toute équipe.",
        ombre:
          "Mais à dépendre de l'appréciation, à fuir les tensions et à négliger ta profondeur, tu te fragilises professionnellement.",
        bascule:
          "Le jour où tu existes pour toi-même, où tu affrontes les tensions et où tu cultives ta profondeur, tu deviens plus solide et plus accompli.",
      },
    },
    "ENFJ-V3-developpement": {
      evolution: `Ta personnalité n'est pas figée : elle mûrit, et ton type suit une trajectoire de croissance particulièrement marquée. Plus jeune, tu es tout entier dans ta chaleur et ton rayonnement social : rassembler, animer, créer du lien, faire du bien aux autres. C'est lumineux et généreux, mais souvent déséquilibré : tu peux n'exister que dans le regard des autres, négliger ta profondeur et fuir ce qui est difficile.

Avec le temps, quelque chose de précieux s'ouvre en toi. Tu comprends que tu ne peux rayonner durablement que si ta lumière vient d'abord de l'intérieur, que ta valeur ne dépend pas de l'approbation des autres, que ta profondeur mérite d'être cultivée. Tu apprends à exister pour toi-même, à te montrer vrai, à affronter ce qui est difficile. Dans ta pleine maturité, tu deviens un animateur chaleureux dont le rayonnement vient d'une profondeur intérieure, qui crée du lien sans s'oublier. C'est la version la plus belle de toi, et elle est entièrement à ta portée.`,
      etapes: [
        "Sociable et chaleureux dès l'enfance, tu cherches le contact, tu fais rire, tu rassembles. Tu te sens vivant quand les autres sont là et que l'ambiance est bonne.",
        "Ton rayonnement social est à son comble : tu animes, tu fédères, tu crées du lien partout. C'est lumineux, mais tu peux n'exister que dans le regard des autres et te sentir vide seul.",
        "Tu comprends que ta lumière doit venir d'abord de l'intérieur. Tu apprends à exister pour toi-même, à cultiver ta profondeur, à te montrer vrai et à affronter ce qui est difficile.",
        "Dans ta pleine maturité, tu es un animateur dont le rayonnement vient d'une vraie plénitude. Tu crées du lien sans t'oublier et tu donnes sans dépendre : la version la plus accomplie de toi.",
      ],
      leviersForts: [
        { titre: "Apprends à exister pour toi-même", texte: "Cultive un sentiment de valeur qui ne dépend pas du regard des autres, apprends à être bien seul et à puiser ta lumière en toi." },
        { titre: "Cultive ta profondeur", texte: "Prends le temps de te connaître, de cultiver ta vie intérieure et tes passions. Quelques amitiés profondes valent plus qu'un large cercle de surface." },
        { titre: "Affronte ce qui est difficile", texte: "N'évite pas les conflits et ne masque pas tes émotions derrière ta bonne humeur. Aborder les tensions te rend plus vrai et tes liens plus authentiques." },
        { titre: "Accorde-toi de la solitude", texte: "Apprends à être seul avec toi-même sans angoisse, à ralentir, à ne pas combler chaque instant de présence aux autres. Ces moments te reconnectent à qui tu es." },
      ],
      questions: [
        { situation: "Quand tu te sens apprécié par un groupe", question: "Est-ce que ma valeur vient de moi, ou de leur regard sur moi ?" },
        { situation: "Quand tu te retrouves seul", question: "Est-ce que je sais être bien avec moi-même, ou est-ce que je me sens vide ?" },
        { situation: "Quand une émotion difficile monte", question: "Est-ce que je l'accueille, ou je la masque derrière ma bonne humeur ?" },
        { situation: "Quand une tension apparaît", question: "Est-ce que je l'affronte, ou je lisse pour préserver l'harmonie ?" },
        { situation: "Quand tu réchauffes tout le monde", question: "Est-ce que je laisse aussi quelqu'un me voir vraiment ?" },
      ],
      paradoxe: {
        tension:
          "Pour rayonner durablement, ta lumière doit venir d'abord de l'intérieur,\nmais tu as pris l'habitude d'exister dans le regard des autres.",
        lumiere:
          "Ta chaleur, ton don de créer du lien et ton énergie sont des trésors qui font du bien à tous ceux que tu croises.",
        ombre:
          "Mais sans profondeur cultivée ni autonomie intérieure, ta chaleur ne sert qu'à combler un vide et te laisse seul dès que les autres s'éloignent.",
        bascule:
          "Le jour où tu rayonnes d'une vraie plénitude et où tu existes pour toi-même, ta chaleur devient l'expression d'une richesse qui est vraiment la tienne.",
      },
    },
  },
};

export default enfj;
