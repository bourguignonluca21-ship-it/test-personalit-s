// =============================================================================
// CONTENU DU PROFIL ESTJ (3 variantes : V1 Dirigeant, V2 Garant de l'Ordre,
// V3 Leader Loyal). Source : rapports longs ESTJ V1/V2/V3.
// Même forme que le gabarit INFP de profils.ts. Voix « tu », pas de tirets longs.
// =============================================================================

const estj = {
  // --- Section « Traits » (commune aux 3 variantes du type) ---------------
  traitsTexte: {
    ESTJ: `Ton esprit est tourné vers l'action et le concret : tu puises ton énergie dans le contact avec le monde extérieur, et tu te fies aux faits, à l'expérience et à ce qui a déjà fait ses preuves plus qu'aux théories. Tu t'orientes selon la logique et l'efficacité, tu tranches en fonction de ce qui est juste et fonctionnel, et tu aimes que les choses soient planifiées et menées à terme. Le flou t'agace vite : tu structures, tu organises, tu boucles. Cette clarté et cette assurance font de toi quelqu'un sur qui un groupe peut s'appuyer pour avancer.

Mais cette même force a un revers : ton attachement à l'ordre et au contrôle peut virer à la rigidité, et ta logique te faire passer trop vite sur l'humain et les émotions. Tu peux vouloir tout tenir, mal déléguer, et te montrer brusque sans le vouloir. Tout l'enjeu de ton chemin, c'est d'apprendre à diriger en écoutant et à organiser en faisant confiance : le jour où ton autorité s'accompagne d'attention aux autres, elle cesse de peser pour devenir entraînante.`,
  },

  // --- Descriptions des variantes (survol des barres) ---------------------
  descriptions: {
    "ESTJ-V1":
      "Les Dirigeants sont les plus tournés vers la prise de commandes et l'action. Ils décident, organisent et font avancer : voir les choses se concrétiser leur donne leur élan.",
    "ESTJ-V2":
      "Les Garants de l'Ordre sont les plus attachés à la règle et au devoir. Ils font tenir les structures, font respecter les standards et veillent à ce que tout soit fait correctement.",
    "ESTJ-V3":
      "Les Leaders Loyaux mettent leur autorité au service des leurs. Ils prennent les commandes pour protéger et faire avancer ceux dont ils se sentent responsables.",
  },

  // --- Accroches (héros) --------------------------------------------------
  accroches: {
    "ESTJ-V1": "Tu n'attends pas qu'on te dise quoi faire, tu prends les choses en main.",
    "ESTJ-V2": "Tu ne profites pas des structures, tu veilles à ce qu'elles tiennent.",
    "ESTJ-V3": "Tu ne diriges pas pour toi, tu diriges pour les tiens.",
  },

  // --- Introductions longues (sous le héros) ------------------------------
  intros: {
    "ESTJ-V1": `En tant que Directeur (ESTJ), tu as cette clarté et cette assurance qui te permettent de prendre les commandes et de mener les choses à terme. Quand une situation s'enlise, quand personne ne tranche, quand le flou s'installe, tu poses un cadre et tu mets les choses en mouvement. Tu vois ce qui doit être fait, tu hiérarchises, tu décides, et tu fais en sorte que ça avance. Parmi les trois façons d'être de ton type, tu es le plus tourné vers la prise de commandes et l'action, le Dirigeant.

Ce qui te porte, c'est l'efficacité et le résultat concret : tu tires une vraie satisfaction de ce qui aboutit, un projet mené à terme, une organisation qui tourne, un engagement honoré. Et tu allies l'assurance à la fiabilité, car ton autorité ne tient pas qu'à ta présence mais à des actes, des résultats, une parole tenue. Cette même force peut te conduire à imposer plutôt qu'à proposer, à tout vouloir contrôler, à passer sur l'humain au nom du résultat : ton plus beau terrain de croissance sera d'apprendre à diriger en écoutant et à organiser en déléguant.`,

    "ESTJ-V2": `En tant que Directeur (ESTJ), tu mets ta clarté et ton assurance au service du cadre : faire tenir les structures, faire respecter les règles, veiller à ce que tout soit fait comme il faut. Tu es de ceux qui font respecter les règles, qui maintiennent l'ordre, qui s'assurent que les choses sont faites correctement et que les engagements sont honorés. Quand tout le monde coupe les coins, tu rappelles ce qui doit être fait. Parmi les trois façons d'être de ton type, tu es le plus attaché à l'ordre et au devoir, le Garant de l'Ordre.

Ce qui te porte, c'est l'intégrité et le travail bien fait : tu tires une vraie satisfaction de ce qui est en règle, juste, honoré, et tu n'aimes pas voir la droiture bafouée. Tu allies la fermeté à la fiabilité, car ton attachement à l'ordre s'incarne dans une parole tenue et un sérieux constant. Cette même force peut te faire te raidir sur les règles, juger durement et appliquer le cadre sans voir la personne : ton plus beau terrain de croissance sera d'apprendre à maintenir l'ordre avec souplesse et à voir l'humain au-delà de la règle.`,

    "ESTJ-V3": `En tant que Directeur (ESTJ), tu as l'autorité, l'assurance et le sens de l'organisation de ta famille d'âme, mais ce qui te met vraiment en mouvement, c'est de protéger et de faire avancer ceux qui comptent : ta famille, ton équipe, ton groupe. Tu prends les choses en main pour qu'ils soient en sécurité, soutenus, menés à bon port. Parmi les trois façons d'être de ton type, tu es le plus tourné vers la direction au service des tiens, le Leader Loyal.

Ce qui te porte, c'est la loyauté et le sens du devoir envers les tiens : tu tires une vraie satisfaction de voir ceux dont tu as la charge avancer, réussir, être à l'abri. Tu allies la fermeté à la fidélité, car ton autorité s'appuie sur un engagement réel envers les gens, une présence fiable, une parole tenue. Cette même force peut te conduire à décider à leur place, à tout porter seul, à passer sur ce qu'ils ressentent : ton plus beau terrain de croissance sera d'apprendre à protéger en laissant choisir et à mener en écoutant.`,
  },

  // --- Texte long de la variante (sous les barres des variantes) ----------
  texteVariante: {
    "ESTJ-V1": `Parmi les trois visages du Directeur, tu es le plus tourné vers la prise de commandes et l'action. Tu n'es pas avant tout le Garant de l'Ordre attaché aux règles, ni le Leader Loyal dont l'autorité s'enracine dans le service des siens : ce qui te met en mouvement, c'est de décider et de faire avancer.

Ce qui te caractérise, c'est cet appétit pour l'initiative et l'aboutissement. Prendre les commandes, organiser, trancher, voir les choses se concrétiser, voilà ce qui te donne de l'élan. C'est la combinaison de l'assurance, du sens du concret et du goût du résultat qui dessine ta façon d'être : celui qui prend la situation en main, donne un cap et le tient. Ton plus beau chemin de croissance sera d'apprendre à mener avec les autres, et plus seulement devant.`,

    "ESTJ-V2": `Parmi les trois visages du Directeur, tu es le plus tourné vers le maintien de l'ordre, de la règle et du devoir. Tu n'es pas avant tout le Dirigeant qui prend les commandes pour l'action, ni le Leader Loyal dont l'autorité s'enracine dans le service des siens : ce qui te met en mouvement, c'est que tout soit fait correctement et qu'on puisse s'y fier.

Ce qui te caractérise, c'est cet attachement à l'ordre et au devoir bien accompli. Faire respecter le cadre, maintenir la structure, veiller à ce que les choses soient faites comme il se doit, voilà ce qui te donne ton assise. C'est la combinaison de la fermeté, du sens du concret et de la droiture qui dessine ta façon d'être : celui qui fait tenir les choses et sur qui le cadre repose. Ton plus beau chemin de croissance sera d'apprendre à tenir le cadre avec souplesse, au service des gens plutôt qu'au-dessus d'eux.`,

    "ESTJ-V3": `Parmi les trois visages du Directeur, tu es le plus tourné vers la direction au service des tiens. Tu n'es pas avant tout le Dirigeant qui se définit par l'action et le résultat, ni le Garant de l'Ordre qui veille d'abord au cadre : ce qui te met en mouvement, c'est de mener pour protéger et faire avancer ceux qui comptent.

Ce qui te caractérise, c'est cette autorité loyale. Prendre les commandes pour le bien du groupe, te sentir responsable des tiens, les défendre et les guider, voilà ce qui te donne ton élan. C'est la combinaison de la fermeté, du sens du concret et de la fidélité qui dessine ta façon d'être : celui qui mène devant, mais pour les autres. Ton plus beau chemin de croissance sera d'apprendre à mener les tiens vers leur propre force, et pas seulement vers la tienne.`,
  },

  // --- Détail enrichi d'une variante : forces[6], ombres[6], paradoxe -----
  varianteDetail: {
    "ESTJ-V1": {
      forces: [
        { titre: "Tu prends les commandes", accent: "commandes", texte: "Là où d'autres hésitent ou attendent, tu poses un cadre et tu donnes une direction, et les choses se mettent à avancer." },
        { titre: "Tu vas au résultat", accent: "résultat", texte: "Tu sais hiérarchiser, écarter ce qui ne sert pas et tenir le cap jusqu'à l'aboutissement concret." },
        { titre: "Une fiabilité solide", accent: "fiabilité", texte: "Quand tu dis que tu fais, tu fais, et ta parole tenue fait de toi un point d'appui sur lequel on peut compter." },
        { titre: "Tu mets de l'ordre", accent: "ordre", texte: "Tu structures, tu planifies, tu poses des systèmes qui tiennent, et tu apportes de la clarté dans le désordre." },
        { titre: "Le courage de trancher", accent: "trancher", texte: "Tu n'as pas peur de décider, même quand c'est inconfortable ou impopulaire, et d'en assumer les conséquences." },
        { titre: "Une assurance entraînante", accent: "assurance", texte: "Ta présence et ta clarté donnent un cap : avec toi, au moins, on sait où l'on va." },
      ],
      ombres: [
        { titre: "Tu peux te raidir", accent: "raidir", texte: "Ton attachement à la bonne façon de faire peut virer à l'inflexibilité et te fermer à des méthodes différentes." },
        { titre: "Passer trop vite sur l'humain", accent: "humain", texte: "Ton efficacité et ta logique peuvent te faire négliger le ressenti des gens et te donner un abord brusque." },
        { titre: "Vouloir trop contrôler", accent: "contrôler", texte: "Ton instinct de prendre les commandes peut t'amener à diriger ce qui ne te regarde pas et à mal déléguer." },
        { titre: "La méfiance du changement", accent: "changement", texte: "Ton attachement à ce qui a fait ses preuves peut te rendre réticent au neuf, même quand il serait meilleur." },
        { titre: "Une impatience qui pèse", accent: "impatience", texte: "Tu supportes mal l'inefficacité et les rythmes plus lents, ce qui peut crisper ceux qui t'entourent." },
        { titre: "La certitude trop rapide", accent: "certitude", texte: "Ton assurance peut te faire trancher avant d'avoir écouté et camper sur ta position." },
      ],
      paradoxe: {
        tension:
          "Ta force à diriger et à organiser débloque les situations,\nmais poussée trop loin, elle peut t'empêcher d'écouter et de faire confiance.",
        lumiere:
          "Ton assurance, ton efficacité et ton instinct de prendre les commandes donnent un cap et font avancer les choses quand personne ne tranche.",
        ombre:
          "Mais à imposer plutôt qu'à proposer, à tout vouloir contrôler et à passer sur l'humain, tu peux mener tout le monde sans que personne n'ose plus te contredire.",
        bascule:
          "Le jour où tu apprends à diriger en écoutant, à organiser en déléguant et à décider en tenant compte des gens, ton autorité cesse de peser pour devenir entraînante.",
      },
    },
    "ESTJ-V2": {
      forces: [
        { titre: "Tu fais ce qui est juste", accent: "juste", texte: "Même quand c'est difficile, même quand personne ne regarde, tu tiens tes principes et tu ne triches pas." },
        { titre: "Un sens du devoir solide", accent: "devoir", texte: "Quand on te confie une responsabilité, tu la portes jusqu'au bout et tu ne lâches pas le poste." },
        { titre: "Tu mets de l'ordre", accent: "ordre", texte: "Tu apportes clarté, méthode et conformité là où règne le flou, et tu maintiens les standards." },
        { titre: "Une fiabilité sans faille", accent: "fiabilité", texte: "Quand tu dis que tu fais, c'est fait, et bien fait : ce qui passe entre tes mains est en sécurité." },
        { titre: "Tu défends ce qui est juste", accent: "défends", texte: "Tu n'as pas peur de rappeler les règles et de t'opposer à ce qui n'est pas correct, même quand c'est impopulaire." },
        { titre: "Une droiture rassurante", accent: "droiture", texte: "On sait avec toi à quoi s'en tenir, et cette intégrité inspire un respect qui ne se décrète pas." },
      ],
      ombres: [
        { titre: "Tu peux te raidir", accent: "raidir", texte: "Ton attachement aux règles peut virer à l'inflexibilité, même quand la situation appellerait de la souplesse." },
        { titre: "Juger trop vite", accent: "juger", texte: "Ta droiture peut te faire condamner sévèrement ce qui s'écarte de la règle, sans voir les raisons ou les circonstances." },
        { titre: "La règle avant l'humain", accent: "humain", texte: "Ton respect du cadre peut te faire privilégier la conformité sur le besoin réel des gens." },
        { titre: "La méfiance du changement", accent: "changement", texte: "Ton attachement à l'établi peut te rendre réticent au neuf, même quand les règles mériteraient d'évoluer." },
        { titre: "Un côté moralisateur", accent: "moralisateur", texte: "Ta franchise sur ce qui est correct peut devenir critique ou donneuse de leçons sans que tu le veuilles." },
        { titre: "Une rigidité face à l'imprévu", accent: "imprévu", texte: "Quand la réalité dévie du cadre, tu peux te crisper et devenir dur avec ceux qui s'organisent autrement." },
      ],
      paradoxe: {
        tension:
          "Ton attachement à l'ordre et à la règle fait tenir les choses,\nmais poussé trop loin, il peut t'empêcher de voir l'humain et d'accueillir le changement.",
        lumiere:
          "Ta droiture, ton sens du devoir et ton attachement à l'ordre font tenir les choses et défendent ce qui est juste.",
        ombre:
          "Mais à te raidir sur les règles, à juger durement et à appliquer le cadre sans voir la personne, tu peux finir par ne plus rien laisser respirer.",
        bascule:
          "Le jour où tu apprends à maintenir l'ordre avec souplesse et à faire respecter les règles sans oublier l'humain, ta rigueur cesse d'enfermer pour devenir un appui solide et bienveillant.",
      },
    },
    "ESTJ-V3": {
      forces: [
        { titre: "Tu mènes pour les tiens", accent: "tiens", texte: "Ton autorité n'est pas tournée vers toi mais vers ceux dont tu te sens responsable, pour qu'ils avancent et soient à l'abri." },
        { titre: "Une loyauté en actes", accent: "loyauté", texte: "Tu ne soutiens pas qu'en paroles : tu organises, tu règles, tu protèges concrètement quand un proche a besoin." },
        { titre: "Une fiabilité solide", accent: "fiabilité", texte: "Quand tu dis que tu fais, tu fais, et tu honores tes engagements envers les gens sans faillir." },
        { titre: "Tu décides pour le groupe", accent: "décides", texte: "Tu portes la responsabilité des choix difficiles que d'autres préfèrent éviter, et ce courage rassure ceux qui te suivent." },
        { titre: "Tu protèges en organisant", accent: "protèges", texte: "Tu mets de l'ordre, tu anticipes, tu poses des cadres qui mettent les tiens en sécurité." },
        { titre: "Une fermeté qui guide", accent: "fermeté", texte: "Ta présence et ton cap donnent aux tiens le sentiment d'être menés et tenus." },
      ],
      ombres: [
        { titre: "Trop directif avec les tiens", accent: "directif", texte: "À force de vouloir leur bien, tu peux décider à leur place et leur imposer ta façon de faire." },
        { titre: "Passer sur les émotions", accent: "émotions", texte: "Ton efficacité peut te faire régler le problème sans voir le ressenti de la personne." },
        { titre: "Vouloir tout porter", accent: "porter", texte: "Ton sens de la responsabilité peut te pousser à tout prendre sur tes épaules et à mal déléguer." },
        { titre: "Tu peux te raidir", accent: "raidir", texte: "Ton attachement à ce qui marche peut te rendre réticent au neuf, même quand une autre voie servirait mieux." },
        { titre: "Une fermeté qui pèse", accent: "pèse", texte: "Ton autorité, même bienveillante, peut étouffer ceux que tu mènes au lieu de les soutenir." },
        { titre: "Le contrôle par amour", accent: "contrôle", texte: "Ton désir de les mettre à l'abri peut t'amener à tout maîtriser pour eux, jusqu'à ne plus leur laisser de place." },
      ],
      paradoxe: {
        tension:
          "Ta façon de protéger les tiens en les dirigeant les met à l'abri,\nmais poussée trop loin, elle peut les empêcher de respirer et de choisir.",
        lumiere:
          "Ta fermeté, ta loyauté et ton sens de la responsabilité mettent les tiens à l'abri et les font avancer.",
        ombre:
          "Mais à décider à leur place, à tout porter seul et à passer sur ce qu'ils ressentent, tu peux mener ceux que tu aimes au point de ne plus leur laisser d'air.",
        bascule:
          "Le jour où tu apprends à protéger en laissant choisir, à mener en écoutant et à veiller sans tout porter, ta loyauté cesse d'enfermer pour devenir un appui qui libère.",
      },
    },
  },

  // --- Texte de la section « Mes relations » (sous le héros de section) ----
  relationsTexte: {
    "ESTJ-V1": `En amour comme en amitié, tu es fiable et engagé. Quand tu t'engages, c'est sérieusement et dans la durée, avec un vrai sens des responsabilités, et tu montres souvent ton attachement par des actes plus que par des mots : tu assures, tu construis, tu prends en charge le quotidien et l'avenir. Être aimé par toi, c'est se sentir en sécurité et savoir que tu seras là. Tu es l'ami fiable, celui sur qui on peut compter, qui propose, qui organise, qui fait que les choses se passent.

Tes défis sont les revers de ta nature. Ton sens du contrôle peut te pousser à vouloir tout organiser, jusque dans la relation, ta logique te rendre maladroit avec les émotions, et tes certitudes virer à l'imposition de ta façon de voir. La clé pour toi : écouter le ressenti, exprimer le tien, laisser de l'espace, et ne pas tout vouloir diriger. Quand tu y arrives, tu offres une relation et une amitié d'une solidité rare.`,

    "ESTJ-V2": `En amour comme en amitié, tu es fiable et engagé. Quand tu t'engages, c'est sérieusement et dans la durée, et tu montres souvent ton attachement par la constance et la fidélité plus que par les grandes déclarations : tu assures, tu tiens, tu es là. Être aimé par toi, c'est se sentir en sécurité et certain de ta loyauté. Tu es l'ami droit, celui qui tient parole, sur qui on peut compter sans réserve, et avec qui on sait toujours à quoi s'en tenir.

Tes défis sont les revers de ta nature. Ton attachement aux principes peut te rendre rigide ou critique dans la relation, ta droiture moralisatrice, et ta franchise parfois trop tranchante. La clé pour toi : assouplir, écouter le ressenti, comprendre avant de juger, et laisser de la place à la spontanéité. Quand tu y arrives, tu offres une relation et une amitié d'une fidélité rare.`,

    "ESTJ-V3": `En amour comme en amitié, tu es fiable, engagé et protecteur. Quand tu t'engages, c'est sérieusement et dans la durée, avec un vrai sens des responsabilités envers l'autre, et tu montres ton amour par des actes : tu assures, tu protèges, tu construis, tu prends soin du concret et de l'avenir. Être aimé par toi, c'est se sentir en sécurité, soutenu, et certain que tu seras là quoi qu'il arrive. Tu es l'ami loyal qui veille sur les siens, qui défend le groupe et répond présent dans les moments qui comptent.

Tes défis sont les revers de ta nature. Ton instinct de protéger peut te faire décider pour l'autre et le materner malgré toi, ta logique te rendre maladroit avec les émotions, et ta fermeté virer à l'imposition. La clé pour toi : laisser l'autre choisir, écouter son ressenti, exprimer le tien, et veiller sans étouffer. Quand tu y arrives, tu offres une relation d'une solidité et d'une fidélité rares.`,
  },

  // --- Texte de la section « Professionnel » ------------------------------
  proTexte: {
    "ESTJ-V1": `Au travail, tu es à ton aise dans les rôles où l'on organise, où l'on dirige, où l'on porte la responsabilité de faire aboutir. Tu donnes le meilleur de toi quand tu peux mettre de l'ordre, mener une équipe et obtenir des effets visibles. C'est pour ça que tout ce qui touche au management, à l'organisation et à l'exécution te parle souvent : gestion d'équipe et de projet, direction d'opérations, administration, logistique, finance, droit, partout où la rigueur, la structure et la fiabilité comptent.

Tu travailles avec méthode et sens du résultat : tu transformes une intention en plan d'action et tu le mènes au bout, ce qui fait de toi un moteur dans un collectif. En revanche, les environnements flous, chaotiques ou sans cap t'usent vite. Ton défi principal touche à ton rapport au contrôle et à l'humain : ta compétence est rarement en cause, mais à trop vouloir tout tenir, à mal déléguer et à te montrer trop directif, tu peux te mettre en tension avec les autres. Apprendre à déléguer, à écouter et à assouplir fait passer ton leadership d'efficace à vraiment rassembleur.`,

    "ESTJ-V2": `Au travail, tu es à ton aise dans les rôles où l'on veille au cadre, où l'on fait respecter les standards, où l'on garantit que les choses sont faites correctement. Tu te révèles quand tu peux structurer, faire respecter les standards et garantir que tout soit fait dans les règles. C'est pour ça que tout ce qui touche à l'ordre, à la conformité et à la responsabilité te parle souvent : administration, gestion, droit, finance, audit, qualité, sécurité, fonctions de contrôle et de supervision, partout où la rigueur et le respect des standards comptent.

Tu travailles avec rigueur, méthode et sens du devoir : tu fais les choses dans l'ordre, complètement, conformément aux standards, sans bâcler. En revanche, les environnements laxistes, chaotiques ou sans cadre t'usent vite. Ton défi principal touche à ta souplesse et à ton rapport à l'humain : ta fiabilité est rarement en cause, mais à être trop rigide, trop critique et trop attaché à la règle au détriment du contexte et des gens, tu peux te mettre en tension. Apprendre à assouplir, à comprendre avant de juger et à mettre l'humain dans la balance fait passer ta rigueur d'efficace à vraiment sage.`,

    "ESTJ-V3": `Au travail, tu es à ton aise dans les rôles où l'on dirige une équipe, où l'on porte la responsabilité d'un groupe, où mener rime avec protéger. Tu te révèles quand tu peux mener une équipe et la faire avancer ensemble. C'est pour ça que tout ce qui touche à l'encadrement et à la responsabilité d'équipe te parle souvent : management de proximité, direction d'équipe ou d'opérations, fonctions où l'on est garant à la fois des résultats et des personnes. Tu portes bien la responsabilité des autres.

Tu travailles avec méthode, sens du résultat et sens des gens : tu apportes structure, fiabilité et un vrai souci de mener le groupe à bon port. En revanche, les environnements purement individualistes, chacun-pour-soi ou sans cap te conviennent moins. Ton défi principal touche à ta façon de mener les gens : ta compétence est rarement en cause, mais à être trop directif, à décider à la place de ton équipe, à mal déléguer et à passer sur le ressenti, tu peux te mettre en tension. Apprendre à déléguer, à écouter et à laisser de l'autonomie fait passer ton leadership de protecteur à vraiment rassembleur.`,
  },

  // --- Section « Mindset & dév personnel » : aperçu gratuit ---------------
  mindsetTexte: {
    "ESTJ-V1": {
      apercu: `Ton plus grand chantier n'est pas autour de toi, il est en toi. Tu portes une vraie force d'action, mais aussi une tendance qui peut se retourner contre toi : le besoin de tout contrôler, la rigidité, l'oubli de l'humain au nom du résultat. La bonne nouvelle, c'est que ces points de vigilance sont aussi tes plus grands leviers de croissance, à condition de savoir où appuyer.`,
    },
    "ESTJ-V2": {
      apercu: `Ton plus grand chantier n'est pas de faire tenir les choses, tu le fais déjà, c'est d'apprendre à le faire avec souplesse et sans oublier l'humain. Tu portes une droiture rare, mais aussi une tendance à te raidir, à juger vite et à faire passer la règle avant la personne. La bonne nouvelle, c'est que ces points de vigilance sont aussi tes plus grands leviers de croissance, à condition de savoir où appuyer.`,
    },
    "ESTJ-V3": {
      apercu: `Ton plus grand chantier n'est pas de veiller sur les tiens, tu le fais déjà, c'est d'apprendre à les protéger sans les empêcher de respirer. Tu portes une loyauté agissante rare, mais aussi une tendance à décider pour eux, à tout porter seul et à passer sur leurs émotions. La bonne nouvelle, c'est que ces points de vigilance sont aussi tes plus grands leviers de croissance, à condition de savoir où appuyer.`,
    },
  },

  // --- Détail enrichi des grandes sections (relations / carriere / dev) ---
  sectionDetail: {
    // ====================== V1 DIRIGEANT =================================
    "ESTJ-V1-relations": {
      forces: [
        { titre: "Une fiabilité totale", accent: "fiabilité", texte: "Quand tu t'engages, c'est sérieusement et dans la durée : on sait que tu seras là." },
        { titre: "Un amour qui se prouve", accent: "prouve", texte: "Tu montres ton attachement par des actes : tu assures, tu construis, tu prends en charge le quotidien." },
        { titre: "Une présence sécurisante", accent: "sécurisante", texte: "Auprès de toi, l'autre se sent en sécurité et soutenu, certain de pouvoir s'appuyer sur toi." },
        { titre: "Une loyauté solide", accent: "loyauté", texte: "Une fois ta loyauté donnée, elle est sans faille, et ta parole tenue fonde la confiance." },
        { titre: "L'ami sur qui compter", accent: "compter", texte: "C'est souvent toi qui proposes, qui organises, qui fais que les choses se passent." },
        { titre: "Des liens qui durent", accent: "durent", texte: "Ton cercle n'est pas large, mais tes amitiés sont solides et tiennent dans le temps." },
      ],
      ombres: [
        { titre: "Le contrôle dans le couple", accent: "contrôle", texte: "Ton sens de l'organisation peut te pousser à vouloir tout gérer, jusque dans la relation." },
        { titre: "La maladresse émotionnelle", accent: "maladresse", texte: "Ta logique peut te rendre gauche avec les émotions, les tiennes comme celles de l'autre." },
        { titre: "L'imposition de ta vision", accent: "imposition", texte: "Tes certitudes peuvent te faire imposer ta façon de voir plutôt que la proposer." },
        { titre: "Une franchise brusque", accent: "franchise", texte: "Ton abord direct peut heurter sans que tu en aies l'intention." },
        { titre: "Le mal à lâcher", accent: "lâcher", texte: "Tu supportes parfois mal de céder le contrôle ou de laisser l'autre faire à sa manière." },
        { titre: "L'écoute reléguée", accent: "écoute", texte: "À aller au but, tu peux passer trop vite sur ce que l'autre ressent vraiment." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "Le flou permanent, sans clarté ni engagement.",
            "Les rapports où l'on remet sans cesse ta fiabilité en cause.",
            "Le manque de respect de la parole donnée.",
            "Une relation où l'on cherche à tout te dicter.",
            "Le désordre et l'imprévu vécus comme des règles de vie.",
          ],
        },
        {
          ton: "positif",
          items: [
            "Une relation stable, claire et durable.",
            "Quelqu'un qui partage tes valeurs et sur qui compter.",
            "Une confiance réciproque et une parole tenue de part et d'autre.",
            "Quelqu'un qui sait te tenir tête avec justesse.",
            "De la place pour l'écoute et l'expression du ressenti.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Les tempéraments très indépendants, rétifs à toute structure.",
            "Les profils allergiques à l'autorité et au cadre.",
            "Les personnalités qui vivent mal ton côté directif.",
          ],
          profils: [
            { code: "ENFP", raison: "son besoin de liberté et sa spontanéité s'accommodent mal de ton côté directif." },
            { code: "INFP", raison: "sa sensibilité peut être heurtée par ta franchise et ton sens du contrôle." },
            { code: "ISFP", raison: "son rejet des cadres et de la pression entre en friction avec ton besoin d'organiser." },
          ],
        },
        {
          ton: "positif",
          items: [
            "Les tempéraments fiables, concrets et structurés comme toi.",
            "Les profils chaleureux qui adoucissent ta logique.",
            "Les esprits qui apprécient ta solidité et t'invitent à écouter.",
          ],
          profils: [
            { code: "ISTJ", raison: "il partage ton goût de l'engagement, du concret et du travail bien fait." },
            { code: "ISFJ", raison: "sa chaleur et son attention aux autres équilibrent ta logique en douceur." },
            { code: "ESFJ", raison: "son sens du lien et du concret rejoint ta fiabilité et adoucit ton abord." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Tu offres une relation stable et solide,\nmais à tout vouloir organiser et diriger, tu peux étouffer ce qui te lie à l'autre.",
        lumiere:
          "Ta fiabilité, ton engagement et ta façon d'assurer le concret font de toi un partenaire et un ami sur qui on peut vraiment se reposer.",
        ombre:
          "Mais à vouloir tout contrôler, à passer sur les émotions et à imposer ta vision, tu peux fragiliser les liens qui te tiennent le plus à cœur.",
        bascule:
          "Le jour où tu écoutes le ressenti, exprimes le tien et laisses de l'espace, ta solidité devient un appui où l'autre se sent libre autant qu'en sécurité.",
      },
    },
    "ESTJ-V1-carriere": {
      forces: [
        { titre: "Un sens de l'organisation", accent: "organisation", texte: "Tu structures, tu planifies, tu mènes les choses à terme dans les temps : on compte sur toi pour que tout tourne." },
        { titre: "Une capacité d'exécution", accent: "exécution", texte: "Tu transformes une intention en plan d'action et tu le mènes au bout, là où d'autres s'arrêtent aux idées." },
        { titre: "Un leadership clair", accent: "leadership", texte: "Tu donnes un cap, tu hiérarchises, tu fais avancer une équipe vers le résultat." },
        { titre: "Une fiabilité reconnue", accent: "fiabilité", texte: "Tu honores tes engagements avec sérieux : ce qu'on te confie est mené à bien." },
        { titre: "Le courage de décider", accent: "décider", texte: "Tu tranches assez vite, sur des bases logiques, et tu assumes tes choix." },
        { titre: "Un rapport solide à l'argent", accent: "argent", texte: "Tu gères avec méthode, tu planifies et tu penses à long terme, au service de la stabilité." },
      ],
      ombres: [
        { titre: "Le besoin de tout tenir", accent: "tenir", texte: "Tu peux vouloir tout contrôler et mal déléguer, parce que tu penses faire mieux ou plus vite." },
        { titre: "Un excès de directivité", accent: "directivité", texte: "Ton autorité peut devenir trop imposante pour ceux qui fonctionnent autrement." },
        { titre: "La rigidité de méthode", accent: "rigidité", texte: "Ton attachement à la bonne façon de faire peut te fermer à des approches différentes." },
        { titre: "L'impatience envers les autres", accent: "impatience", texte: "Tu supportes mal l'inefficacité et les rythmes plus lents que le tien." },
        { titre: "La dureté sur l'humain", accent: "dureté", texte: "Ta logique et ton efficacité peuvent te faire heurter le ressenti des gens." },
        { titre: "La décision trop rapide", accent: "rapide", texte: "Ta rapidité peut te faire conclure avant d'avoir écouté ou laissé mûrir un choix." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "Les environnements flous, sans cap ni direction.",
            "Le désordre et l'inefficacité installés en mode de fonctionnement.",
            "Le flou des rôles et l'absence de responsabilités claires.",
            "Les résultats jamais mesurés ni reconnus.",
            "Les gens qui ne font pas ce qu'ils ont dit.",
          ],
        },
        {
          ton: "positif",
          items: [
            "Des responsabilités concrètes et un cadre clair.",
            "La possibilité de structurer, décider et organiser.",
            "Des objectifs clairs et des rôles définis.",
            "Des résultats visibles et mesurables.",
            "Une équipe à mener et à faire avancer.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Les environnements chaotiques et sans direction.",
            "Les postes flous, sans responsabilités ni cadre.",
            "Le travail sans résultat mesurable ni cap.",
          ],
          profils: [
            { nom: "Postes flous et sans cap", raison: "l'absence de cadre et de responsabilités claires t'use vite." },
            { nom: "Environnements chaotiques", raison: "le désordre permanent rend ton sens de l'organisation impuissant." },
            { nom: "Rôles sans résultat mesurable", raison: "rien à structurer ni à mener à terme pour te nourrir." },
          ],
        },
        {
          ton: "positif",
          items: [
            "Le management, la gestion d'équipe et de projet.",
            "La direction d'opérations et l'administration.",
            "La logistique, la finance et le droit.",
          ],
          profils: [
            { nom: "Management & gestion de projet", raison: "organiser, décider et mener une équipe au résultat." },
            { nom: "Direction d'opérations", raison: "structurer le concret et faire tourner une organisation." },
            { nom: "Administration, finance, droit", raison: "rigueur, structure et fiabilité au cœur du métier." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Ta compétence et ta fiabilité font avancer les choses,\nmais à trop vouloir tout tenir, tu peux te mettre en tension avec ton équipe.",
        lumiere:
          "Ton sens de l'organisation, ta capacité d'exécution et ton courage de décider font de toi un vrai moteur dans un collectif.",
        ombre:
          "Mais à mal déléguer, à te montrer trop directif ou rigide et à passer sur l'humain, ton efficacité peut se retourner contre le groupe.",
        bascule:
          "Le jour où tu délègues, écoutes et assouplis, ton leadership passe d'efficace à vraiment rassembleur, et ton équipe te suit de bon cœur.",
      },
    },
    "ESTJ-V1-developpement": {
      evolution: `Ta personnalité n'est pas figée : elle mûrit, et ton type suit une trajectoire de croissance assez nette. Plus jeune, tu es surtout porté par ton instinct de diriger et d'organiser : prendre les commandes, structurer, trancher, faire aboutir. C'est efficace, mais souvent déséquilibré : tu peux être trop directif, trop rigide, vouloir tout contrôler, et passer à côté de l'humain et des émotions. Tu fais avancer, mais parfois en force.

Avec le temps et l'expérience, quelque chose s'ouvre. Tu réalises qu'une autorité qui écoute est plus solide, que déléguer démultiplie, que tenir compte des gens ne dilue pas l'efficacité mais la sert. Tu apprends à faire confiance, à assouplir, à rassembler plutôt qu'à imposer. Dans ta pleine maturité, tu deviens un dirigeant clair et efficace qui sait aussi écouter, déléguer et fédérer, et décider avec courage sans écraser : la force de mener alliée à l'intelligence de l'écoute. Et c'est entièrement à ta portée.`,
      etapes: [
        "Déjà, tu aimes que les choses soient en ordre et tu prends spontanément les choses en main quand un jeu ou un groupe part dans tous les sens. Tu organises, tu décides, tu mènes, avec une énergie tournée vers l'action.",
        "Ton instinct de diriger est à son comble : tu prends les commandes, tu structures, tu tranches. C'est efficace, mais souvent en force : tu peux être trop directif, vouloir tout contrôler, et passer à côté de l'humain. Une période intense, où ton sens de l'action cherche encore sa juste mesure.",
        "Tu réalises qu'une autorité qui écoute est plus solide, que déléguer démultiplie. Tu apprends à faire confiance, à assouplir, à tenir compte des gens, sans rien perdre de ton efficacité.",
        "Dans ta pleine maturité, tu es un dirigeant clair qui sait aussi écouter, déléguer et fédérer, et décider avec courage sans écraser : la version la plus accomplie de toi.",
      ],
      leviersForts: [
        { titre: "Délègue et fais confiance", texte: "C'est ton plus grand levier. Laisse les autres prendre leur part et accepte qu'ils fassent autrement : déléguer, ce n'est pas perdre le contrôle, c'est démultiplier ta force." },
        { titre: "Écoute les émotions", texte: "Les tiennes et celles des autres. Avant de trancher, prends le temps de comprendre ce que les gens vivent : intégrer l'humain rend tes décisions plus justes et mieux acceptées." },
        { titre: "Assouplis ton rapport aux règles", texte: "Distingue ce qui doit être tenu fermement de ce qui peut s'adapter. Toutes les situations n'appellent pas la même rigueur, et cette souplesse rend ta structure plus juste." },
        { titre: "Soigne la forme", texte: "Ta franchise est une force, mais elle passe mieux enveloppée. Reconnaître les efforts et valoriser les gens fait qu'on te suit de bon cœur." },
      ],
      questions: [
        { situation: "Quand tu t'apprêtes à tout reprendre en main", question: "Est-ce que je délègue vraiment, ou est-ce que je reprends parce que je crois faire mieux ?" },
        { situation: "Quand une méthode différente t'agace", question: "Est-ce que cette façon de faire est moins bonne, ou juste différente de la mienne ?" },
        { situation: "Quand tu tranches vite", question: "Ai-je écouté ce que les autres avaient à dire avant de décider ?" },
        { situation: "Quand quelqu'un est plus lent que toi", question: "Est-ce que je l'aide à avancer, ou est-ce que je l'écrase de mon impatience ?" },
        { situation: "Quand personne n'ose te contredire", question: "Ai-je créé un espace où l'on peut me dire non, ou seulement m'obéir ?" },
      ],
      paradoxe: {
        tension:
          "Pour devenir un meilleur leader, tu dois apprendre à lâcher du contrôle,\nmais tu crains qu'en lâchant, les choses cessent d'avancer.",
        lumiere:
          "Ton assurance, ton efficacité et ton courage de décider sont une force rare : tu as déjà tout ce qu'il faut pour mener et faire aboutir.",
        ombre:
          "Mais à tout vouloir tenir et à mener sans écouter, tu peux finir seul à décider, et porter une charge que personne ne t'aide plus à alléger.",
        bascule:
          "Le jour où tu vois que déléguer et écouter ne diluent pas ton autorité mais la rendent durable, ton leadership cesse de peser pour entraîner.",
      },
    },

    // ==================== V2 GARANT DE L'ORDRE ===========================
    "ESTJ-V2-relations": {
      forces: [
        { titre: "Une fiabilité totale", accent: "fiabilité", texte: "Quand tu t'engages, c'est sérieusement et dans la durée : ta loyauté donnée est solide." },
        { titre: "Une constance fidèle", accent: "constance", texte: "Tu montres ton attachement par la constance et la fidélité plus que par les grandes déclarations." },
        { titre: "Une présence sécurisante", accent: "sécurisante", texte: "Être aimé par toi, c'est se sentir en sécurité et certain de ta loyauté." },
        { titre: "Une parole tenue", accent: "parole", texte: "On sait avec toi à quoi s'en tenir : tu prends l'engagement très au sérieux et tu le tiens." },
        { titre: "L'ami droit", accent: "droit", texte: "Celui qui tient parole, qui est là quand il faut, sur qui on peut compter sans réserve." },
        { titre: "Des amitiés durables", accent: "durables", texte: "Ton cercle n'est pas large, mais tes amitiés sont solides, souvent anciennes, et durent." },
      ],
      ombres: [
        { titre: "La rigidité dans le lien", accent: "rigidité", texte: "Ton attachement aux principes peut te rendre rigide ou critique dans la relation." },
        { titre: "Le côté moralisateur", accent: "moralisateur", texte: "Ta droiture peut te faire juger ou faire la leçon à ceux que tu aimes." },
        { titre: "La maladresse émotionnelle", accent: "maladresse", texte: "Ta logique peut te rendre gauche avec les émotions, les tiennes comme celles de l'autre." },
        { titre: "Le « comme il faut » imposé", accent: "imposé", texte: "Ton sens de la bonne façon de faire peut te pousser à imposer ta vision dans la relation." },
        { titre: "Une franchise tranchante", accent: "franchise", texte: "Ta sincérité directe peut blesser quand la forme manque de douceur." },
        { titre: "Le manque de spontanéité", accent: "spontanéité", texte: "Ton besoin que tout soit en ordre peut laisser peu de place à l'imprévu et à la légèreté." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "Le laisser-aller et le non-respect de la parole donnée.",
            "Les rapports faits de faux-semblants ou de tromperie.",
            "Une relation où l'on bafoue tes valeurs.",
            "L'irresponsabilité installée en mode de vie.",
            "Les liens où l'on cherche à te faire transiger sur tes principes.",
          ],
        },
        {
          ton: "positif",
          items: [
            "Une relation stable, claire et fondée sur des valeurs partagées.",
            "Une confiance réciproque et une parole tenue de part et d'autre.",
            "Quelqu'un qui partage ton sens de l'engagement.",
            "De la place pour la compréhension au-delà du jugement.",
            "Un peu de spontanéité qui allège ton sérieux.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Les tempéraments très indépendants, rétifs aux règles.",
            "Les profils allergiques à toute structure.",
            "Les personnalités qui vivent ta fermeté comme de la rigidité.",
          ],
          profils: [
            { code: "ENFP", raison: "son rejet des cadres et son besoin de liberté se heurtent à ton sens de l'ordre." },
            { code: "INFP", raison: "sa sensibilité peut être heurtée par ta droiture et tes jugements." },
            { code: "ESTP", raison: "son goût du risque et de l'instant cadre mal avec ton attachement aux règles." },
          ],
        },
        {
          ton: "positif",
          items: [
            "Les tempéraments fiables, droits et structurés comme toi.",
            "Les profils chaleureux qui adoucissent ta rigueur.",
            "Les esprits souples qui t'invitent à assouplir tes cadres.",
          ],
          profils: [
            { code: "ISTJ", raison: "il partage ton sens du devoir, de la parole tenue et du travail bien fait." },
            { code: "ISFJ", raison: "sa chaleur et son attention aux autres adoucissent ta rigueur en douceur." },
            { code: "ESFJ", raison: "son sens du lien et du concret rejoint ta fiabilité et te ramène à l'humain." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Tu offres une relation d'une fidélité rare,\nmais à juger et à imposer ta façon de voir, tu peux durcir ce qui te lie à l'autre.",
        lumiere:
          "Ta fiabilité, ta constance et ta parole tenue font de toi un partenaire et un ami sur qui on peut compter sans réserve.",
        ombre:
          "Mais à te rigidifier sur les principes, à juger durement et à imposer ton « comme il faut », tu peux refroidir les liens qui comptent.",
        bascule:
          "Le jour où tu assouplis, écoutes le ressenti et comprends avant de juger, ta droiture devient un appui chaleureux plutôt qu'un cadre qui pèse.",
      },
    },
    "ESTJ-V2-carriere": {
      forces: [
        { titre: "Une rigueur exemplaire", accent: "rigueur", texte: "Tu fais les choses dans l'ordre, complètement, conformément aux standards, sans bâcler." },
        { titre: "Un sens du devoir", accent: "devoir", texte: "Quand on te confie une responsabilité, tu la portes jusqu'au bout et tu ne lâches pas." },
        { titre: "Une fiabilité sans faille", accent: "fiabilité", texte: "Ce qui passe entre tes mains est en sécurité : tu honores ta parole sans exception." },
        { titre: "Le maintien des standards", accent: "standards", texte: "Tu apportes clarté, méthode et conformité, et tu veilles à ce que tout soit fait correctement." },
        { titre: "Le courage de rappeler le cadre", accent: "cadre", texte: "Tu n'as pas peur de dire ce qui ne va pas et de t'opposer à ce qui n'est pas correct." },
        { titre: "Un rapport prudent à l'argent", accent: "argent", texte: "Tu gères avec rigueur, tu tiens tes comptes et tu honores tes obligations scrupuleusement." },
      ],
      ombres: [
        { titre: "La rigidité de la règle", accent: "rigidité", texte: "Ton attachement aux règles peut virer à l'inflexibilité, même quand la situation appelle de la souplesse." },
        { titre: "Le jugement critique", accent: "jugement", texte: "Ta droiture peut te faire condamner vite et durement ce qui s'écarte du cadre." },
        { titre: "La règle avant le contexte", accent: "contexte", texte: "Tu peux appliquer le cadre sans assez tenir compte des circonstances ni des gens." },
        { titre: "La méfiance du changement", accent: "changement", texte: "Ton attachement à l'établi peut te faire refuser le neuf, même quand il serait utile." },
        { titre: "Un côté donneur de leçons", accent: "leçons", texte: "Ta franchise sur ce qui est correct peut peser sur ceux qui travaillent autrement." },
        { titre: "L'intolérance à l'imprévu", accent: "imprévu", texte: "Quand la réalité dévie, tu peux te crisper et devenir dur avec ceux qui s'organisent autrement." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "Les environnements laxistes, sans règles respectées.",
            "Le travail bâclé et le laisser-aller installés.",
            "L'irresponsabilité et le non-respect des engagements.",
            "Le chaos et l'absence de standards.",
            "Les milieux où la parole donnée ne vaut rien.",
          ],
        },
        {
          ton: "positif",
          items: [
            "Un travail qui valorise la rigueur et le sens du devoir.",
            "Des procédures claires et des standards définis.",
            "Des responsabilités claires et un cadre établi.",
            "Des règles respectées et des engagements tenus.",
            "La possibilité de garantir que tout soit fait correctement.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Les environnements chaotiques et sans cadre.",
            "Les postes laxistes, sans standards ni règles.",
            "Les milieux où l'irresponsabilité est la norme.",
          ],
          profils: [
            { nom: "Environnements sans cadre", raison: "l'absence de règles et de standards rend ta rigueur impuissante." },
            { nom: "Postes laxistes et flous", raison: "le laisser-aller permanent t'use et te démotive." },
            { nom: "Milieux instables et brouillons", raison: "rien de fiable à faire tenir ni à garantir." },
          ],
        },
        {
          ton: "positif",
          items: [
            "L'administration, la gestion et le droit.",
            "La finance, l'audit et la qualité.",
            "La sécurité et les fonctions de contrôle et de supervision.",
          ],
          profils: [
            { nom: "Administration, gestion, droit", raison: "faire respecter le cadre et garantir la conformité." },
            { nom: "Finance, audit, qualité", raison: "rigueur, vérification et maintien des standards." },
            { nom: "Sécurité & fonctions de contrôle", raison: "veiller à ce que tout soit fait dans les règles." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Ta rigueur et ta fiabilité font tenir les choses,\nmais à appliquer la règle sans voir le contexte, tu peux te mettre en tension avec les gens.",
        lumiere:
          "Ta rigueur, ton sens du devoir et le maintien des standards font de toi un appui précieux sur lequel une structure peut vraiment reposer.",
        ombre:
          "Mais à être trop rigide, trop critique et trop attaché à la règle au détriment du contexte, tu peux étouffer ce qui voudrait s'adapter.",
        bascule:
          "Le jour où tu assouplis, comprends avant de juger et mets l'humain dans la balance, ta rigueur passe d'efficace à vraiment sage.",
      },
    },
    "ESTJ-V2-developpement": {
      evolution: `Ta personnalité n'est pas figée : elle mûrit, et ton type suit une trajectoire de croissance assez nette. Plus jeune, tu es surtout porté par ton sens de l'ordre et du devoir : faire respecter les règles, maintenir le cadre, juger ce qui est conforme et ce qui ne l'est pas. C'est admirable de droiture, mais souvent déséquilibré : tu peux être trop rigide, trop critique, juger durement, appliquer la règle sans voir la personne, et refuser tout changement. Tu fais tenir les choses, mais parfois en étouffant ce qui voudrait évoluer.

Avec le temps et l'expérience, quelque chose s'ouvre. Tu réalises que les meilleures règles servent les gens, que comprendre vaut mieux que juger, que le cadre doit parfois s'assouplir pour rester juste. Tu apprends à nuancer, à voir l'humain, à accueillir le changement utile, à tenir le cadre sans t'y enfermer. Dans ta pleine maturité, tu deviens un garant droit et fiable qui sait aussi comprendre, nuancer et assouplir : la solidité du cadre alliée à l'intelligence de l'humain. Et c'est entièrement à ta portée.`,
      etapes: [
        "Déjà, tu as un sens aigu de ce qui est juste et de ce qui ne l'est pas, et tu veilles à ce que les règles soient respectées autour de toi. Tu aimes l'ordre, tu tiens parole, et tu n'aimes pas voir tricher.",
        "Ton sens du devoir est à son comble : tu fais respecter les règles, tu maintiens le cadre, tu juges ce qui est conforme. C'est admirable de droiture, mais souvent en force : tu peux être trop rigide, juger durement, refuser le changement. Une période intense, où ton sens de l'ordre cherche encore sa juste mesure.",
        "Tu réalises que les meilleures règles servent les gens et que comprendre vaut mieux que juger. Tu apprends à nuancer, à voir l'humain, à accueillir le changement utile, sans rien perdre de ta droiture.",
        "Dans ta pleine maturité, tu es un garant droit et fiable qui sait aussi comprendre, nuancer et assouplir, et faire respecter ce qui est juste sans perdre les personnes de vue : la version la plus accomplie de toi.",
      ],
      leviersForts: [
        { titre: "Assouplis le cadre", texte: "C'est ton plus grand levier. Distingue ce qui doit tenir absolument de ce qui peut s'adapter aux circonstances : assouplir, ce n'est pas trahir l'ordre, c'est le rendre juste et adapté au réel." },
        { titre: "Comprends avant de juger", texte: "Avant de condamner un écart, prends le temps d'en saisir les raisons et le contexte : comprendre ne dilue pas ta droiture, il la rend plus juste." },
        { titre: "Mets l'humain dans la balance", texte: "Quand la règle et le besoin d'une personne s'opposent, pèse les deux : voir la personne au-delà du cadre rend ton sens du devoir profondément sage." },
        { titre: "Ouvre-toi au changement", texte: "Accueille la remise en question des règles et les approches nouvelles avec un peu plus de curiosité : t'ouvrir au neuf, sans perdre ton sens du concret, enrichit ta vie." },
      ],
      questions: [
        { situation: "Quand une règle est enfreinte", question: "Ai-je cherché à comprendre les raisons avant de condamner ?" },
        { situation: "Quand le cadre et le besoin d'une personne s'opposent", question: "La règle sert-elle encore les gens, ou est-elle devenue une fin en soi ?" },
        { situation: "Quand on te propose un changement", question: "Est-ce que je refuse parce que c'est mauvais, ou juste parce que c'est nouveau ?" },
        { situation: "Quand tu t'apprêtes à juger quelqu'un", question: "Suis-je en train de juger, ou de chercher à comprendre la situation ?" },
        { situation: "Quand tu fais valoir ce qui est correct", question: "Est-ce que je dis les choses avec une forme qui peut être entendue ?" },
      ],
      paradoxe: {
        tension:
          "Pour grandir, tu dois apprendre à assouplir le cadre,\nmais tu crains qu'en assouplissant, tout finisse par se déliter.",
        lumiere:
          "Ta droiture, ton sens du devoir et ta fiabilité sont une force rare : tu as déjà tout ce qu'il faut pour faire tenir ce qui compte.",
        ombre:
          "Mais à te raidir sur les règles et à juger sans comprendre, tu peux finir par défendre un ordre qui n'aide plus personne.",
        bascule:
          "Le jour où tu vois que l'ordre le plus solide est celui qui sert vraiment les gens, ta rigueur cesse d'enfermer pour devenir un appui sage et bienveillant.",
      },
    },

    // ====================== V3 LEADER LOYAL ==============================
    "ESTJ-V3-relations": {
      forces: [
        { titre: "Une fiabilité protectrice", accent: "fiabilité", texte: "Quand tu t'engages, c'est sérieusement et dans la durée : l'autre se sait soutenu quoi qu'il arrive." },
        { titre: "Un amour qui se prouve", accent: "prouve", texte: "Tu montres ton amour par des actes : tu assures, tu protèges, tu construis, tu prends soin du concret." },
        { titre: "Une présence sécurisante", accent: "sécurisante", texte: "Être aimé par toi, c'est se sentir en sécurité, soutenu et certain que tu seras là." },
        { titre: "Une loyauté totale", accent: "loyauté", texte: "Une fois ta loyauté donnée, elle est totale : tu offres un soutien concret et une fiabilité sans faille." },
        { titre: "L'ami qui veille", accent: "veille", texte: "Tu défends tes amis, tu fédères, tu réponds présent dans les moments qui comptent." },
        { titre: "Un appui pour le groupe", accent: "appui", texte: "Avec toi, on sait qu'on n'est pas seul : tu prends le rôle de celui qui organise et protège." },
      ],
      ombres: [
        { titre: "Décider pour l'autre", accent: "décider", texte: "Ton instinct de protéger peut te faire choisir à la place de l'autre et le materner malgré toi." },
        { titre: "Passer sur les émotions", accent: "émotions", texte: "Ton efficacité peut te faire régler le problème sans entendre le ressenti de la personne." },
        { titre: "La fermeté qui impose", accent: "impose", texte: "Ta fermeté peut virer à l'imposition de ta façon de voir dans la relation." },
        { titre: "Le trop-plein de contrôle", accent: "contrôle", texte: "Vouloir tout maîtriser pour l'autre peut finir par l'empêcher de respirer." },
        { titre: "Une franchise brusque", accent: "franchise", texte: "Ton abord direct peut heurter quand la forme manque de douceur." },
        { titre: "Le rôle de chef permanent", accent: "chef", texte: "Ton instinct de mener peut te faire décider pour le groupe ou imposer ta façon de faire." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "Les rapports où l'on remet ta fiabilité en cause.",
            "La trahison de la loyauté et de la parole donnée.",
            "Le chacun-pour-soi sans solidarité.",
            "Une relation où l'on refuse tout cadre et tout engagement.",
            "Le sentiment de ne pas pouvoir protéger ceux que tu aimes.",
          ],
        },
        {
          ton: "positif",
          items: [
            "Une relation stable et durable, fondée sur l'engagement.",
            "Quelqu'un qui apprécie ta loyauté sans s'y sentir enfermé.",
            "Une confiance réciproque où l'on veille l'un sur l'autre.",
            "De la place pour l'écoute et le choix de l'autre.",
            "Quelqu'un qui sait, en retour, veiller sur toi.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Les tempéraments très indépendants, rétifs à toute prise en charge.",
            "Les profils qui vivent ta fermeté comme envahissante.",
            "Les personnalités qui refusent tout cadre et tout engagement.",
          ],
          profils: [
            { code: "ENFP", raison: "son besoin de liberté s'accommode mal de ton instinct de mener et de protéger." },
            { code: "INTP", raison: "son indépendance et sa distance émotionnelle se heurtent à ta façon de veiller." },
            { code: "ISTP", raison: "son rejet de la prise en charge peut percevoir ta fermeté comme envahissante." },
          ],
        },
        {
          ton: "positif",
          items: [
            "Les tempéraments fiables et loyaux, attachés aux proches.",
            "Les profils chaleureux qui adoucissent ta fermeté.",
            "Les esprits qui te rendent la pareille et veillent aussi sur toi.",
          ],
          profils: [
            { code: "ISFJ", raison: "son dévouement aux proches et sa chaleur rejoignent ta loyauté en douceur." },
            { code: "ESFJ", raison: "son sens du lien et de l'attention aux autres équilibre ta fermeté." },
            { code: "ISTJ", raison: "il partage ton sens de l'engagement, du concret et de la responsabilité." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Tu protèges les tiens avec une loyauté rare,\nmais à décider pour eux et à tout porter, tu peux les empêcher de respirer.",
        lumiere:
          "Ta fiabilité, ta loyauté agissante et ta façon de protéger en organisant font de toi un appui solide pour ceux que tu aimes.",
        ombre:
          "Mais à décider à leur place, à passer sur leurs émotions et à imposer ta fermeté, tu peux mener ceux que tu chéris jusqu'à ne plus leur laisser de place.",
        bascule:
          "Le jour où tu protèges en laissant choisir, écoutes le ressenti et veilles sans étouffer, ta loyauté devient un appui qui libère plutôt qu'il ne pèse.",
      },
    },
    "ESTJ-V3-carriere": {
      forces: [
        { titre: "Un leadership d'équipe", accent: "leadership", texte: "Tu mènes une équipe et tu la fais avancer ensemble, en pensant au groupe autant qu'à l'objectif." },
        { titre: "Le sens des gens", accent: "gens", texte: "Tu portes bien la responsabilité des autres : tu es garant des résultats et des personnes à la fois." },
        { titre: "Une capacité d'organisation", accent: "organisation", texte: "Tu structures, tu planifies, tu coordonnes les tiens et tu mènes les choses à terme dans les temps." },
        { titre: "Une fiabilité reconnue", accent: "fiabilité", texte: "Tu honores tes engagements avec sérieux : on compte sur toi pour tenir la barre." },
        { titre: "Le courage de décider", accent: "décider", texte: "Tu tranches les choix difficiles au nom du bien du groupe, et ce courage décharge ceux qui te suivent." },
        { titre: "Un rapport responsable à l'argent", accent: "argent", texte: "Tu gères avec méthode et tu penses à protéger et à assurer l'avenir de ceux dont tu as la charge." },
      ],
      ombres: [
        { titre: "Décider pour l'équipe", accent: "décider", texte: "Tu peux trancher à la place de ton équipe au lieu de l'associer aux choix qui la concernent." },
        { titre: "Le besoin de tout porter", accent: "porter", texte: "Ton sens de la responsabilité peut te pousser à tout prendre sur tes épaules et à mal déléguer." },
        { titre: "Un excès de directivité", accent: "directivité", texte: "Ton autorité peut devenir trop imposante pour ceux qui fonctionnent autrement." },
        { titre: "Passer sur le ressenti", accent: "ressenti", texte: "Ton efficacité peut te faire négliger les émotions des personnes que tu mènes." },
        { titre: "La rigidité de méthode", accent: "rigidité", texte: "Ton attachement à ce qui marche peut te fermer aux autres façons de faire de ton équipe." },
        { titre: "L'autonomie peu laissée", accent: "autonomie", texte: "Vouloir tout organiser pour les autres peut les priver de la place pour grandir." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "Les environnements purement individualistes, chacun pour soi.",
            "Le flou des rôles et l'absence de cap.",
            "Le manque de responsabilités et de cadre clair.",
            "Le travail sans collectif à mener ni à protéger.",
            "Les milieux où l'on ne tient pas ses engagements.",
          ],
        },
        {
          ton: "positif",
          items: [
            "Des responsabilités humaines concrètes et un cadre clair.",
            "Une équipe à mener et à faire avancer ensemble.",
            "Le sentiment d'œuvrer pour un collectif qui compte.",
            "Des objectifs clairs et des rôles définis.",
            "Un groupe soudé dont on est garant.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Les environnements purement individualistes.",
            "Les postes flous, sans collectif ni responsabilité d'équipe.",
            "Les milieux sans cap ni engagement tenu.",
          ],
          profils: [
            { nom: "Travail purement individuel", raison: "ni équipe à mener ni groupe à protéger pour te nourrir." },
            { nom: "Postes flous et sans cap", raison: "l'absence de cadre et de responsabilité d'équipe t'use vite." },
            { nom: "Milieux du chacun-pour-soi", raison: "rien de collectif à fédérer ni à faire avancer ensemble." },
          ],
        },
        {
          ton: "positif",
          items: [
            "Le management de proximité.",
            "La direction d'équipe ou d'opérations.",
            "Les fonctions garantes des résultats et des personnes.",
          ],
          profils: [
            { nom: "Management de proximité", raison: "mener une équipe au quotidien et veiller sur elle." },
            { nom: "Direction d'équipe ou d'opérations", raison: "porter la responsabilité d'un groupe et d'un cap." },
            { nom: "Encadrement des résultats et des gens", raison: "être garant à la fois de l'objectif et des personnes." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Ta façon de mener protège et fait avancer ton équipe,\nmais à décider pour elle et à tout porter, tu peux la priver d'air et d'autonomie.",
        lumiere:
          "Ton leadership d'équipe, ton sens des gens et ton courage de décider font de toi quelqu'un qui mène et protège à la fois.",
        ombre:
          "Mais à être trop directif, à décider à la place des autres et à passer sur leur ressenti, tu peux peser sur ceux que tu veux soutenir.",
        bascule:
          "Le jour où tu délègues, écoutes et laisses de l'autonomie, ton leadership passe de protecteur à vraiment rassembleur.",
      },
    },
    "ESTJ-V3-developpement": {
      evolution: `Ta personnalité n'est pas figée : elle mûrit, et ton type suit une trajectoire de croissance assez nette. Plus jeune, tu es surtout porté par ton instinct de mener et de protéger : prendre les commandes pour les tiens, décider, organiser, veiller. C'est généreux, mais souvent déséquilibré : tu peux être trop directif, décider à la place des autres, tout porter seul, et passer sur les émotions. Tu protèges, mais parfois en étouffant.

Avec le temps et l'expérience, quelque chose s'ouvre. Tu réalises que protéger n'est pas décider à la place, que les tiens deviennent plus forts quand tu leur laisses de l'espace, qu'écouter leur ressenti vaut autant que régler leurs problèmes. Tu apprends à mener en associant, à veiller sans tout porter, à faire confiance. Dans ta pleine maturité, tu deviens un leader ferme et fiable qui sait aussi écouter, déléguer et laisser choisir, et qui mène les siens en les rendant plus forts plutôt qu'en les portant : la force de mener alliée au respect de ceux que tu mènes. Et c'est entièrement à ta portée.`,
      etapes: [
        "Déjà, tu veilles sur les tiens et tu prends spontanément leur défense quand il faut. Tu organises pour le groupe, tu mènes les jeux, tu réponds présent : ton sens des autres est là dès le départ.",
        "Ton instinct de mener et de protéger est à son comble : tu prends les commandes pour les tiens, tu décides, tu organises, tu veilles. C'est généreux, mais souvent en force : tu peux décider à leur place, tout porter, passer sur les émotions. Une période intense, où ta loyauté agissante cherche encore sa juste mesure.",
        "Tu réalises que protéger n'est pas décider à la place et que les tiens deviennent plus forts quand tu leur laisses de l'espace. Tu apprends à mener en associant, à veiller sans tout porter, à faire confiance.",
        "Dans ta pleine maturité, tu es un leader ferme et fiable qui sait aussi écouter, déléguer et laisser choisir, et qui mène les siens en les rendant plus forts : la version la plus accomplie de toi.",
      ],
      leviersForts: [
        { titre: "Laisse choisir les tiens", texte: "C'est ton plus grand levier. Laisse-les prendre leurs décisions, même imparfaites à tes yeux : les laisser choisir, ce n'est pas les abandonner, c'est les rendre plus forts et plus libres." },
        { titre: "Délègue et partage la charge", texte: "Tu n'es pas obligé de tout porter pour bien veiller : faire confiance allège ton fardeau et donne aux autres l'occasion de grandir." },
        { titre: "Écoute les émotions", texte: "Avant de régler un problème, prends le temps d'entendre ce que vit la personne : le ressenti compte autant que la solution, et l'écoute approfondit ta loyauté." },
        { titre: "Dose ta fermeté", texte: "Distingue les moments où il faut mener fermement de ceux où il vaut mieux laisser de l'air : cette souplesse fait qu'on te suit de bon cœur." },
      ],
      questions: [
        { situation: "Quand tu veux le bien d'un proche", question: "Est-ce que je décide pour lui, ou est-ce que je le laisse choisir ?" },
        { situation: "Quand tu portes tout sur tes épaules", question: "Qu'est-ce que je pourrais confier pour alléger ma charge et faire grandir les autres ?" },
        { situation: "Quand quelqu'un te confie un problème", question: "Ai-je écouté ce qu'il ressent, ou seulement cherché à régler la situation ?" },
        { situation: "Quand tu mènes ton groupe", question: "Est-ce que ma fermeté soutient les tiens, ou est-ce qu'elle les étouffe ?" },
        { situation: "Quand un proche fait autrement que toi", question: "Est-ce une vraie erreur, ou juste une façon de faire différente de la mienne ?" },
      ],
      paradoxe: {
        tension:
          "Pour bien mener les tiens, tu dois apprendre à leur laisser de la place,\nmais tu crains qu'en lâchant, tu cesses de bien les protéger.",
        lumiere:
          "Ta fermeté, ta loyauté et ton sens de la responsabilité sont une force rare : tu as déjà tout ce qu'il faut pour mener et protéger ceux qui comptent.",
        ombre:
          "Mais à décider pour eux et à tout porter seul, tu peux mener ceux que tu aimes au point de ne plus leur laisser respirer.",
        bascule:
          "Le jour où tu vois que laisser choisir et déléguer ne t'éloigne pas des tiens mais les rend plus forts, ta loyauté cesse de peser pour devenir un appui qui élève.",
      },
    },
  },
};

export default estj;
