// =============================================================================
// CONTENU ENFP : variantes V2 (Cœur Authentique) et V3 (Fédérateur).
// Source : rapport_long_ENFP_V2.md et rapport_long_ENFP_V3.md.
// Gabarit imité : INFP-V1/V2 et ENFP-V1 dans profils.ts.
// Convention : voix « tu », aucun tiret long, mot-clé en vert via "accent"
// (chaque accent est un mot présent tel quel dans le titre).
// =============================================================================

export default {
  accroches: {
    "ENFP-V2": "Tu ne te contentes pas de vivre, tu cherches à être vrai en toute chose.",
    "ENFP-V3": "Tu ne te contentes pas d'avoir de l'énergie, la tienne soulève les autres.",
  },

  intros: {
    "ENFP-V2": `En tant qu'Inspirateur (ENFP), tu possèdes l'enthousiasme, la curiosité et la chaleur de ta famille d'âme, mais ce qui te porte par-dessus tout, c'est la quête d'authenticité et de connexion vraie. Là où l'explorateur court vers la nouveauté et le fédérateur rassemble les groupes, toi tu cherches la profondeur, la vérité, l'accord intime entre toi et ce que tu vis. Des trois visages que peut prendre ton type, tu incarnes le Cœur Authentique. Ce qui te définit, c'est ce besoin viscéral d'être vrai : tu ne peux ni faire semblant, ni jouer un rôle, ni vivre en désaccord avec tes valeurs sans en souffrir.

Ce qui te porte, c'est la connexion profonde et le sens. Tu n'es pas attiré par le superficiel : tu cherches des liens sincères, des conversations qui comptent, une vie alignée avec ton cœur. Sous ton enthousiasme bat une grande sensibilité, tu ressens intensément et tu vibres avec les gens et le monde. Cette même richesse peut te rendre exigeant et te faire chercher partout une authenticité parfaite : le plus beau pas que tu aies à franchir sera d'apprendre à chérir le vrai dans le réel, avec ses imperfections.`,

    "ENFP-V3": `En tant qu'Inspirateur (ENFP), tu possèdes l'enthousiasme, la curiosité et la chaleur de ta famille d'âme, et tu les mets au service du lien et du collectif. Là où l'explorateur court vers la nouveauté et le cœur authentique cherche la profondeur intime, toi tu rassembles les gens, tu crées de l'élan, tu relies les êtres entre eux. Des trois visages que peut prendre ton type, tu incarnes le Fédérateur. Ton énergie n'est pas tournée vers toi : elle entraîne et fédère, et tu as ce don rare de transformer une idée en mouvement collectif joyeux.

Ce qui te porte, c'est le lien et l'aventure partagée. Tu te sens vivant quand tu rassembles, quand tu vois un groupe se souder et avancer grâce à toi. Ton charisme est chaleureux et entraînant : les gens te suivent parce que tu donnes envie et que ta présence rend les choses excitantes. Le revers de ce don, c'est que tu peux faire dépendre ton équilibre de l'énergie du groupe et te disperser entre mille élans : le plus beau pas que tu aies à franchir sera d'apprendre à rayonner d'une force qui vient aussi de l'intérieur, et à concrétiser ce que tu lances.`,
  },

  texteVariante: {
    "ENFP-V2": `Parmi les trois visages de l'Inspirateur, tu es le plus tourné vers la profondeur, la sincérité et la connexion vraie. Tu n'es pas avant tout l'explorateur enthousiaste qui court vers la nouveauté, ni le fédérateur qui rassemble les groupes : tu es celui qui cherche le vrai, qui veut des liens authentiques et une vie alignée avec son cœur. Être vrai, vivre en accord avec tes valeurs, nouer des liens sincères comptent plus que tout pour toi.

Cette combinaison, l'enthousiasme chaleureux et la profondeur authentique, fait de toi quelqu'un dont la présence est à la fois lumineuse et vraie, qui touche les autres par sa sincérité et qui cherche, dans tout ce qu'il vit, le sens et la vérité. Le revers, c'est que cette soif d'authenticité parfaite peut te rendre éternellement insatisfait : ton plus beau chemin de croissance sera d'apprendre à cultiver le vrai dans le réel, sans exiger une perfection qui n'existe pas.`,

    "ENFP-V3": `Parmi les trois visages de l'Inspirateur, tu es le plus tourné vers le collectif, le lien et l'élan partagé. Tu n'es pas avant tout l'explorateur enthousiaste qui court vers la nouveauté pour lui-même, ni le cœur authentique qui cherche la profondeur intime : tu es celui qui rassemble, qui crée du collectif, qui embarque les autres dans l'aventure. Rassembler les gens, créer de l'élan, relier les êtres te comble plus que tout.

Cette combinaison, l'enthousiasme rayonnant et l'attention chaleureuse aux gens, fait de toi un fédérateur naturel, un créateur de liens et d'élan, quelqu'un dont l'énergie soude les groupes et les entraîne vers des aventures partagées. Le revers, c'est que tu peux ne plus te sentir vivant hors du collectif et lancer plus que finir : ton plus beau chemin de croissance sera d'apprendre à puiser ton élan en toi-même et à mener au bout ce que tu commences.`,
  },

  varianteDetail: {
    "ENFP-V2": {
      forces: [
        { titre: "Une authenticité qui inspire", accent: "authenticité", texte: "Tu es profondément vrai, fidèle à toi-même et à tes valeurs, incapable de jouer un rôle durablement." },
        { titre: "Un don pour les liens profonds", accent: "liens", texte: "Tu ne te contentes pas de la surface : tu crées des relations vraies où l'on se comprend et où l'on peut être soi." },
        { titre: "Une chaleur qui réchauffe", accent: "chaleur", texte: "Près de toi, les gens se détendent et se sentent reconnus : tu crées une connexion sincère qui fait du bien." },
        { titre: "Une sensibilité profondément humaine", accent: "sensibilité", texte: "Tu ressens intensément, tu comprends les émotions, tu vibres avec les autres avec une finesse rare." },
        { titre: "Une quête de sens qui guide", accent: "sens", texte: "Tu ne vis pas en surface : tu cherches l'alignement et la profondeur, ce qui donne une cohérence à ta vie." },
        { titre: "Une intuition du vrai", accent: "intuition", texte: "Tu sens immédiatement le sincère du joué, et tu es attiré par ce qui a de la profondeur et du sens." },
      ],
      ombres: [
        { titre: "Une sensibilité qui submerge", accent: "sensibilité", texte: "Tu ressens si fort que les conflits et les tensions dans tes liens peuvent vite te déborder et te blesser." },
        { titre: "Une exigence d'authenticité", accent: "exigence", texte: "Ton besoin de vrai peut te faire attendre une profondeur parfaite, puis te décevoir face au réel imparfait." },
        { titre: "La fuite de ce qui contraint", accent: "fuite", texte: "Tu peux fuir les engagements et les structures que tu vis comme des entraves à ta liberté." },
        { titre: "Une insatisfaction chronique", accent: "insatisfaction", texte: "À chercher partout la perfection, tu peux être déçu par tout et ne jamais te poser." },
        { titre: "Du mal à concrétiser", accent: "concrétiser", texte: "Tu peux rester dans la quête et l'aspiration sans incarner concrètement tes valeurs et tes rêves." },
        { titre: "Un débordement émotionnel", accent: "débordement", texte: "Ton intensité, moteur de ta richesse, peut aussi te submerger et te déstabiliser." },
      ],
      paradoxe: {
        tension:
          "Ta quête d'authenticité est ta plus grande richesse,\nmais elle peut te rendre éternellement insatisfait.",
        lumiere:
          "Ton besoin de vrai, ta soif de liens profonds et ta fidélité à toi-même donnent à ta vie une profondeur et une sincérité rares.",
        ombre:
          "Mais à chercher partout l'authenticité parfaite, tu peux être déçu par un monde imparfait, fuir ce qui ne te semble pas assez vrai et ne jamais t'engager pleinement.",
        bascule:
          "Le jour où tu chéris l'authentique sans exiger la perfection et où tu t'engages plutôt que de chercher mieux ailleurs, ta quête de vérité cesse de te peser pour devenir une boussole qui enrichit ta vie.",
      },
    },
    "ENFP-V3": {
      forces: [
        { titre: "Un don pour rassembler", accent: "rassembler", texte: "Tu sais donner envie, créer de l'élan, fédérer les gens autour d'un projet ou d'une aventure." },
        { titre: "Une chaleur qui crée du lien", accent: "chaleur", texte: "Tu relies les êtres, tu détends les atmosphères, tu crées de la connexion et de la joie autour de toi." },
        { titre: "Une énergie communicative", accent: "énergie", texte: "Tu insuffles de l'enthousiasme et de la vie, tu dynamises les groupes et les projets et tu les rends excitants." },
        { titre: "Une intuition des possibles", accent: "intuition", texte: "Tu perçois le potentiel des projets et des gens, et tu embarques les autres vers des possibles qu'ils n'auraient pas vus seuls." },
        { titre: "Une empathie qui soude", accent: "empathie", texte: "Tu te soucies du bien-être de chacun et tu veilles à ce que tout le monde se sente inclus, ce qui crée des liens durables." },
        { titre: "Un charisme entraînant", accent: "charisme", texte: "Les gens te suivent parce que ta présence rend les choses joyeuses et leur donne le sentiment d'embarquer dans quelque chose de grand." },
      ],
      ombres: [
        { titre: "La dépendance à l'énergie du groupe", accent: "dépendance", texte: "Tu peux faire reposer ton équilibre sur la présence des autres, et te sentir vide dès que l'élan retombe." },
        { titre: "Lancer sans finir", accent: "finir", texte: "Tu te lances dans mille projets avec passion, puis tu te lasses quand vient le travail de concrétisation." },
        { titre: "La fuite des tensions", accent: "fuite", texte: "Ton besoin d'harmonie peut te faire éviter les conflits et masquer tes propres difficultés derrière ton énergie." },
        { titre: "La dispersion dans le social", accent: "dispersion", texte: "Tu peux courir d'un groupe à l'autre, multiplier les liens en surface et négliger ta propre profondeur." },
        { titre: "Une superficialité possible", accent: "superficialité", texte: "À force de vivre dans le collectif, tu peux rester en surface, avec les autres comme avec toi-même." },
        { titre: "Un sentiment de vide", accent: "vide", texte: "Seul, sans groupe à animer, tu peux soudain te sentir perdu et douter de ta valeur." },
      ],
      paradoxe: {
        tension:
          "Ton énergie fédératrice fait ta force,\nmais elle peut te faire dépendre du groupe et négliger ce que tu lances et qui tu es.",
        lumiere:
          "Ton enthousiasme, ta chaleur et ton don de rassembler sont des cadeaux immenses qui créent du lien et de l'élan partout où tu passes.",
        ombre:
          "Mais poussées à l'extrême, ces forces peuvent te déséquilibrer : tu peux ne tenir debout que porté par le collectif, te disperser et te sentir vide dès que l'élan retombe.",
        bascule:
          "Le jour où tu puises ton énergie en toi-même autant que dans le groupe et où tu concrétises ce que tu lances, ton don de fédérer devient une vraie force créatrice de liens et de réalisations.",
      },
    },
  },

  relationsTexte: {
    "ENFP-V2": `En amour comme en amitié, tu privilégies radicalement la profondeur et l'authenticité, pas le nombre. Tu es un romantique profond et sincère : tu rêves d'une connexion d'âme, d'un amour vrai où tu peux être pleinement toi-même et te sentir profondément compris. Quand tu aimes, c'est avec intensité, sincérité et une vraie profondeur, et tu offres une présence chaleureuse, une écoute attentive et une fidélité du cœur. Quelques liens vrais te comblent infiniment plus qu'une foule de relations superficielles.

Tes défis sont les revers de ta nature : ta quête d'authenticité peut te faire idéaliser puis te décevoir face au réel, ta sensibilité peut te faire vivre les tensions très intensément, et ton besoin de liberté peut te faire craindre l'engagement ou la routine. Ton chemin, c'est d'apprendre à aimer la personne réelle avec ses imperfections, à ne pas te noyer dans tes émotions, et à voir l'engagement comme un approfondissement plutôt qu'une perte de liberté. Quand tu y parviens, tu offres un amour et une amitié d'une profondeur rare.`,

    "ENFP-V3": `En amour comme en amitié, tu es chaleureux, vivant et entraînant. En couple, tu apportes de la joie, de l'énergie, le sentiment d'une aventure à vivre à deux : tu embarques ton partenaire dans des projets et des découvertes et tu fais vivre la relation. En amitié, tu es le fédérateur, celui qui rassemble, qui propose des aventures, qui crée des souvenirs collectifs. Ton énergie et ta chaleur attirent et relient, et tu es souvent le moteur et le ciment d'un groupe.

Tes défis sont les revers de ta nature : ton besoin d'élan peut te faire fuir la routine ou les tensions, et ta dépendance à l'énergie partagée peut te déstabiliser dans les moments calmes ou difficiles. Ton large cercle peut aussi cacher un manque de liens où tu te livres vraiment. Ton chemin, c'est d'apprendre à exister sans avoir besoin d'animer en permanence, à cultiver quelques liens vraiment profonds, et à affronter les difficultés plutôt qu'à les fuir. Quand tu y parviens, tu offres une relation joyeuse, vivante et profonde.`,
  },

  proTexte: {
    "ENFP-V2": `Au travail, tu as besoin d'une chose avant toutes les autres : du sens. Une carrière qui t'épanouit, c'est une carrière alignée avec tes valeurs, qui te connecte aux gens de façon vraie, et où tu n'as pas à jouer un rôle ou à trahir qui tu es. Tu t'étioles dans les environnements purement commerciaux, superficiels ou contraires à tes valeurs, et tu prends vie dans les domaines humains et porteurs de sens : l'accompagnement, le conseil, l'aide et le soin, l'enseignement, la communication sincère, les domaines créatifs ou les causes qui te touchent.

Ton humanité, ta sincérité et ta capacité de connexion sont des atouts rares partout où il faut du cœur et du vrai. En revanche, les ambiances fausses, agressives ou dénuées de sens t'épuisent et t'éteignent. Ton défi principal découle de ta nature : ta difficulté à structurer et à concrétiser, et ta sensibilité, peuvent freiner ta progression. Apprendre à incarner tes aspirations dans des réalisations concrètes, à te donner un minimum de cadre et à te protéger émotionnellement, transforme ta belle profondeur en accomplissements.`,

    "ENFP-V3": `Au travail, tu es fait pour les rôles où l'on rassemble, où l'on enthousiasme, où l'on crée de l'élan collectif. Une carrière qui t'épanouit, c'est une carrière riche en contact humain, où ton énergie et ton don de fédérer sont des atouts. Tu t'étioles dans l'isolement et les environnements froids ou routiniers, et tu prends vie dans tout ce qui mobilise ton sens du lien : l'animation d'équipes et de communautés, l'événementiel, la communication, le marketing, les relations humaines, l'enseignement ou l'entrepreneuriat collectif.

Tu es excellent dans les phases de lancement, de mobilisation et de création d'élan : c'est là que ton énergie donne sa pleine mesure. En revanche, le suivi, la concrétisation patiente et le travail solitaire te pèsent, et c'est souvent là que tes projets risquent de s'essouffler. Ton défi principal, c'est ta difficulté à concrétiser et ta dépendance à l'énergie du groupe. Apprendre à mener au bout, à t'entourer de personnes qui assurent le suivi, et à puiser ton énergie aussi en toi-même, transforme ton don de fédérer en réussites durables.`,
  },

  mindsetTexte: {
    "ENFP-V2": {
      apercu: `Ton plus grand chantier n'est pas autour de toi, il est en toi. Tu portes une authenticité et une profondeur rares, mais aussi une exigence qui peut se retourner contre toi : l'insatisfaction chronique, la sensibilité qui submerge, la fuite de ce qui contraint ta liberté. La bonne nouvelle, c'est que ces mêmes failles, bien comprises, deviennent les points d'appui de ta plus belle transformation.`,
    },
    "ENFP-V3": {
      apercu: `Ton plus grand chantier n'est pas de créer de l'élan, il déborde, c'est d'apprendre à le faire venir aussi de l'intérieur. Tu portes en toi une énergie et une chaleur immenses, mais aussi une tendance à dépendre du groupe, à te disperser, à fuir ce qui est difficile. La bonne nouvelle, c'est que ces mêmes fragilités, une fois apprivoisées, deviennent le carburant de ta plus belle croissance.`,
    },
  },

  sectionDetail: {
    "ENFP-V2-relations": {
      forces: [
        { titre: "Une présence vraie", accent: "vraie", texte: "Avec toi, pas de masque : on sait que ce qu'on voit est sincère, et cela crée une confiance rare." },
        { titre: "Le don des liens profonds", accent: "profonds", texte: "Tu vas au fond des choses et tu crées des relations où l'on se comprend et où l'on peut être soi." },
        { titre: "Une écoute sensible", accent: "écoute", texte: "Ta finesse émotionnelle te fait percevoir ce que l'autre vit au-delà des mots." },
        { titre: "Une chaleur sincère", accent: "chaleur", texte: "Ta présence apaise les autres, les valorise et leur fait du bien." },
        { titre: "Une loyauté tendre", accent: "loyauté", texte: "Une fois engagé, tu offres une fidélité profonde et une intimité émotionnelle rare." },
        { titre: "Le goût des liens singuliers", accent: "singuliers", texte: "Tu préfères quelques amitiés vraies et profondes à un large cercle de surface." },
      ],
      ombres: [
        { titre: "L'idéalisation de l'autre", accent: "idéalisation", texte: "Ta quête du parfait peut te faire aimer une image idéale, puis te décevoir face à la personne réelle." },
        { titre: "Une grande vulnérabilité", accent: "vulnérabilité", texte: "Tu vis les tensions intensément et une critique peut te toucher fort et longtemps." },
        { titre: "La fuite de l'engagement", accent: "fuite", texte: "Ton besoin de liberté peut te faire craindre l'engagement ou la routine du lien." },
        { titre: "Des attentes exigeantes", accent: "attentes", texte: "Ton besoin de profondeur peut te faire attendre beaucoup et te décevoir face à l'imperfection des liens." },
        { titre: "La surinterprétation", accent: "surinterprétation", texte: "Ta sensibilité peut te faire lire trop de choses dans un mot, un silence ou une tension." },
        { titre: "Le repli quand un lien déçoit", accent: "repli", texte: "Quand une relation te déçoit, tu peux te disperser ou prendre tes distances plutôt que de réparer." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "Les relations de surface, sans profondeur ni partage vrai.",
            "Les faux-semblants, le paraître et le mensonge.",
            "Les personnes qui jugent ta sensibilité ou la trouvent excessive.",
            "Le contrôle et la jalousie qui rognent ta liberté.",
            "Les conflits durs et l'agressivité qui te blessent.",
          ],
        },
        {
          ton: "positif",
          items: [
            "Des liens vrais où tu peux être pleinement toi-même.",
            "Un partenaire authentique, capable de profondeur émotionnelle.",
            "De la sincérité et des conversations qui comptent.",
            "Quelqu'un qui chérit ton authenticité et te montre qu'on peut s'engager sans se perdre.",
            "Des valeurs et une quête de sens partagées.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Les tempéraments très factuels, peu portés sur l'émotion.",
            "Les profils directs dont la franchise peut te blesser.",
            "Les personnalités froides ou contrôlantes qui étouffent ta liberté.",
          ],
          profils: [
            { code: "ESTJ", raison: "son pragmatisme et son attachement aux règles peuvent te sembler froids et contraindre ta liberté." },
            { code: "ISTP", raison: "sa réserve émotionnelle peut te laisser sur ta faim affective." },
            { code: "ESTP", raison: "sa franchise directe et son côté terre-à-terre te paraissent parfois insensibles à ta profondeur." },
          ],
        },
        {
          ton: "positif",
          items: [
            "Les profils intuitifs et sensibles qui partagent ta quête d'authenticité.",
            "Les tempéraments calmes et ancrés qui t'apportent stabilité et présence rassurante.",
            "Ceux qui chérissent ta profondeur et t'aident à t'engager dans le réel.",
          ],
          profils: [
            { code: "INFJ", raison: "il partage ta profondeur et ta quête de sens, et te rejoint dans la sincérité." },
            { code: "INFP", raison: "son authenticité et son monde intérieur résonnent avec ta soif de vrai." },
            { code: "ISFJ", raison: "sa présence fiable et posée t'ancre et te prouve que l'engagement n'est pas une cage." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Tu rêves d'une connexion d'âme, vraie et profonde,\nmais à chercher l'authenticité parfaite, tu risques de manquer la personne réelle.",
        lumiere:
          "Ta sincérité, ta chaleur et ta façon de chérir l'authentique font de toi un partenaire et un ami d'une profondeur rare.",
        ombre:
          "Mais à idéaliser, à vivre les tensions trop intensément et à fuir ce qui contraint ta liberté, tu peux fragiliser les liens que tu chéris le plus.",
        bascule:
          "Le jour où tu aimes la personne réelle avec ses imperfections et où tu vois l'engagement comme un approfondissement, tu construis enfin les liens vrais dont tu rêves.",
      },
    },
    "ENFP-V2-carriere": {
      forces: [
        { titre: "Un moteur, le sens", accent: "sens", texte: "Quand ton travail résonne avec tes valeurs, tu t'investis avec enthousiasme et profondeur." },
        { titre: "Une vraie humanité", accent: "humanité", texte: "Tu apportes une attention sincère aux gens que les esprits purement fonctionnels n'ont pas." },
        { titre: "Une authenticité qui rassure", accent: "authenticité", texte: "Tu es intègre et fidèle à toi-même, ce qui inspire confiance et respect." },
        { titre: "Un don pour la connexion", accent: "connexion", texte: "Tu crées des liens vrais et tu instaures un climat de confiance, un atout dans tout métier humain." },
        { titre: "Une intuition des enjeux", accent: "intuition", texte: "Tu perçois ce qui compte vraiment et tu vois au-delà des apparences." },
        { titre: "Une créativité chaleureuse", accent: "créativité", texte: "Tu apportes de l'âme et des idées neuves dans les domaines où l'humain et le sens comptent." },
      ],
      ombres: [
        { titre: "Du mal à structurer", accent: "structurer", texte: "Les plannings, le suivi et l'exécution régulière ne sont pas ton terrain naturel." },
        { titre: "Une difficulté à concrétiser", accent: "concrétiser", texte: "Tu peux rester dans l'aspiration et la quête sans incarner concrètement tes idées." },
        { titre: "Une sensibilité aux tensions", accent: "sensibilité", texte: "Les conflits, les faux-semblants et les ambiances impersonnelles t'affectent profondément." },
        { titre: "Une difficulté avec les contraintes", accent: "contraintes", texte: "Le cadre rigide et les environnements impersonnels te pèsent et t'éteignent." },
        { titre: "Une indécision face aux options", accent: "indécision", texte: "Ta quête de l'option parfaitement alignée peut te paralyser et retarder tes choix." },
        { titre: "Un rapport secondaire à l'argent", accent: "argent", texte: "L'argent te motive peu, et tu peux négliger les questions matérielles et tes intérêts." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "Un travail vide de sens, même bien payé.",
            "Les faux-semblants et les ambiances purement commerciales.",
            "La compétition agressive et les rapports de force.",
            "Les environnements impersonnels et froids.",
            "Les contraintes rigides qui brident ton authenticité.",
          ],
        },
        {
          ton: "positif",
          items: [
            "Un travail aligné avec tes valeurs et porteur de sens.",
            "Le contact humain vrai et la connexion profonde.",
            "Un environnement bienveillant et respectueux.",
            "De l'autonomie et de l'espace pour être toi-même.",
            "Pouvoir aider, accompagner et créer du lien.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Les milieux purement commerciaux et compétitifs.",
            "Les environnements impersonnels et contraires à tes valeurs.",
            "Le travail rigide et dénué de sens.",
          ],
          profils: [
            { nom: "Vente sous pression, finance pure", raison: "le profit au mépris du sens et de l'humain t'éteint." },
            { nom: "Postes très procéduraux et impersonnels", raison: "aucune place pour l'authenticité ni le lien vrai." },
            { nom: "Environnements agressifs", raison: "les rapports de force et les faux-semblants te démotivent profondément." },
          ],
        },
        {
          ton: "positif",
          items: [
            "L'accompagnement, le conseil et les métiers de l'aide.",
            "L'enseignement et la communication sincère.",
            "Les domaines créatifs et les causes qui te touchent.",
          ],
          profils: [
            { nom: "Accompagnement & conseil", raison: "coach, conseiller, psychologue : créer du lien vrai et aider en profondeur." },
            { nom: "Aide, soin & enseignement", raison: "soignant, éducateur, enseignant : servir l'humain avec sincérité." },
            { nom: "Création & causes", raison: "métiers créatifs, associatif : exprimer ton authenticité et défendre ce qui te touche." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Tu donnes le meilleur quand ton cœur est engagé,\nmais sans un peu de structure, ta belle profondeur peine à se concrétiser.",
        lumiere:
          "Porté par le sens et l'authenticité, tu apportes une humanité, une sincérité et une capacité de connexion rares.",
        ombre:
          "Mais ta difficulté à structurer et à concrétiser, et ta sensibilité aux tensions, peuvent freiner ta progression et laisser ton potentiel inexploité.",
        bascule:
          "Le jour où tu te donnes un minimum de cadre pour incarner tes valeurs et où tu te protèges émotionnellement, ta belle profondeur se transforme en accomplissements.",
      },
    },
    "ENFP-V2-developpement": {
      evolution: `Ta personnalité n'est pas figée : elle se transforme au fil des années, et ton type connaît une évolution intérieure particulièrement profonde. Jeune, tu es tout entier dans ta quête d'authenticité et ta sensibilité : chercher le vrai, fuir le faux, vibrer intensément, aspirer à des liens profonds. C'est beau et sincère, mais souvent déséquilibré : tu peux être submergé par tes émotions, chroniquement déçu par un monde imparfait, et avoir du mal à concrétiser et à t'engager.

Avec le temps, tu comprends que l'authenticité parfaite n'existe pas, que la profondeur se cultive dans le réel avec ses imperfections, et que s'engager n'est pas trahir sa liberté mais l'approfondir. Tu apprends à accepter l'imperfection, à concrétiser, à te protéger émotionnellement, à t'ancrer, sans rien perdre de ta sincérité. Dans ta pleine maturité, tu deviens un cœur authentique qui vit ses valeurs et ses liens vrais dans le réel, dont la sincérité s'incarne au lieu de rester une quête insatisfaite. Et ce chemin est vraiment le tien à parcourir.`,
      etapes: [
        "Tu es déjà sensible au vrai et au faux, tu vibres intensément avec les gens et le monde, et tu cherches spontanément des liens sincères. Le cœur tourné vers ce qui sonne juste.",
        "Ta quête d'authenticité est à son comble : tu cherches le vrai partout, tu fuis le faux, tu aspires à des liens parfaits. C'est sincère, mais souvent déséquilibré : tes émotions t'emportent, le monde imparfait te déçoit, et t'engager ne va pas encore de soi.",
        "Tu comprends que l'authenticité parfaite n'existe pas et que la profondeur se cultive dans le réel. Tu apprends à accepter l'imperfection, à concrétiser, à te protéger, sans rien perdre de ta sincérité.",
        "Dans ta pleine maturité, tu es un cœur authentique qui vit ses valeurs et ses liens vrais dans le réel. Ta sincérité s'incarne au lieu de rester une quête : c'est toi, enfin pleinement réalisé.",
      ],
      leviersForts: [
        { titre: "Chéris l'authentique dans le réel", texte: "Ta soif de vrai est un don précieux. Apprends à savourer ce qui est déjà beau et sincère autour de toi, c'est là que ta quête de vérité devient une source de joie." },
        { titre: "Fais de ta sensibilité une richesse", texte: "Ta profondeur émotionnelle nourrit ton empathie et la qualité de tes liens. Accueille tes émotions et prends-en soin, elles sont la source de ta beauté intérieure." },
        { titre: "Ose t'engager et approfondir", texte: "Vois l'engagement comme un approfondissement : c'est en investissant un lien, un projet, une voie que tu accèdes à la richesse que la quête perpétuelle ne donne jamais." },
        { titre: "Donne corps à tes valeurs", texte: "Te doter d'un peu de structure pour incarner ce qui compte transforme ta belle profondeur en une vie réellement alignée, pas seulement rêvée." },
      ],
      questions: [
        { situation: "Quand une relation te déçoit", question: "Est-ce la personne réelle qui me déçoit, ou l'image parfaite que je m'en faisais ?" },
        { situation: "Quand une émotion te submerge", question: "Comment puis-je accueillir ce que je ressens sans me laisser noyer ?" },
        { situation: "Quand un engagement t'effraie", question: "Et si m'engager ici, c'était approfondir plutôt que perdre ma liberté ?" },
        { situation: "Quand tu restes dans l'aspiration", question: "Quelle première étape concrète puis-je faire pour incarner ce qui me tient à cœur ?" },
        { situation: "Quand rien ne te semble assez vrai", question: "Est-ce que j'exige du réel une perfection que rien ne peut atteindre ?" },
      ],
      paradoxe: {
        tension:
          "Pour vivre ton authenticité, tu dois l'incarner dans le réel et t'engager,\nmais tu crains qu'en t'ancrant et en t'engageant, tu trahisses ta liberté.",
        lumiere:
          "Ta sincérité, ta sensibilité et ta soif de vrai sont une base de croissance immense : tu as déjà tout en toi pour vivre une vie profonde et alignée.",
        ombre:
          "Mais à chercher la perfection, à te laisser submerger et à fuir ce qui contraint, ta belle profondeur peut rester une quête insatisfaite.",
        bascule:
          "Le jour où tu comprends que t'engager et concrétiser ne trahit pas ton authenticité mais lui donne enfin une prise sur le réel, ta croissance s'enclenche vraiment.",
      },
    },
    "ENFP-V3-relations": {
      forces: [
        { titre: "Une présence qui fait vibrer", accent: "vibrer", texte: "Avec toi, le quotidien s'illumine : tu apportes de la joie, de l'élan et le sentiment d'une aventure à vivre." },
        { titre: "Un don pour relier", accent: "relier", texte: "Tu apprivoises les timidités, tu crées du lien et de la complicité, tu rassembles autour de toi." },
        { titre: "Une chaleur généreuse", accent: "chaleur", texte: "Ta présence chaleureuse fait que les autres se sentent bien, inclus et partie d'une aventure commune." },
        { titre: "Une énergie entraînante", accent: "énergie", texte: "Tu embarques tes proches dans des projets et des découvertes, et tu fais vivre la relation." },
        { titre: "Une empathie attentive", accent: "empathie", texte: "Tu perçois les dynamiques du groupe et tu veilles à ce que chacun se sente bien." },
        { titre: "Une loyauté chaleureuse", accent: "loyauté", texte: "Une fois engagé, tu offres une présence généreuse, pleine d'attention et de joie." },
      ],
      ombres: [
        { titre: "La dépendance à l'énergie partagée", accent: "dépendance", texte: "Tu peux te déstabiliser quand la relation traverse des moments calmes ou que l'élan retombe." },
        { titre: "La peur de la routine", accent: "routine", texte: "Ton besoin d'élan et de nouveauté peut te faire fuir le quotidien ou craindre l'engagement profond." },
        { titre: "La fuite des tensions", accent: "fuite", texte: "Ton besoin d'harmonie peut t'empêcher de régler les vrais problèmes et de te livrer vraiment." },
        { titre: "Un large cercle peu profond", accent: "cercle", texte: "Ton grand cercle peut cacher un manque de liens vraiment profonds où tu te livres aussi." },
        { titre: "La dispersion des liens", accent: "dispersion", texte: "Ta dispersion peut te faire négliger l'entretien des amitiés les plus profondes." },
        { titre: "Le masque de l'énergie", accent: "masque", texte: "Tu peux cacher tes propres difficultés derrière ton enthousiasme et le besoin d'animer." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "La routine figée, sans projet ni élan partagé.",
            "Les liens froids ou distants, sans énergie ni chaleur.",
            "Les tensions qu'on laisse pourrir sous le silence.",
            "Le contrôle et la jalousie qui rognent ta liberté.",
            "Les jugements qui te font douter de ta valeur.",
          ],
        },
        {
          ton: "positif",
          items: [
            "Des aventures et des projets à vivre ensemble.",
            "Un partenaire qui apprécie ton énergie et te voit au-delà de ton rayonnement.",
            "Quelques liens vrais où tu peux te livrer sans animer.",
            "De la joie, de la complicité et du partage.",
            "Quelqu'un qui te connaît dans ta profondeur.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Les tempéraments très réservés ou distants.",
            "Les profils peu portés sur le collectif et le lien.",
            "Les personnalités contrôlantes qui enferment ta liberté.",
          ],
          profils: [
            { code: "ISTP", raison: "sa réserve et sa distance peuvent te faire douter et te laisser sur ta faim de lien." },
            { code: "ISTJ", raison: "son attachement à la routine et aux règles cadre mal avec ton besoin d'élan." },
            { code: "INTP", raison: "son retrait et son détachement peuvent rendre ton énergie envahissante à ses yeux." },
          ],
        },
        {
          ton: "positif",
          items: [
            "Les tempéraments chaleureux et enthousiastes qui partagent ton goût du lien.",
            "Les profils calmes et profonds qui t'aident à cultiver ton intériorité.",
            "Les esprits organisés et ancrés qui t'aident à concrétiser et à ne pas te disperser.",
          ],
          profils: [
            { code: "ENFJ", raison: "sa chaleur et son sens des autres rejoignent ton goût du lien et de l'aventure partagée." },
            { code: "INFJ", raison: "sa profondeur t'aide à exister hors du groupe et à aller vers une vraie connexion intérieure." },
            { code: "ISFJ", raison: "sa fiabilité et son ancrage t'aident à concrétiser et te montrent une présence rassurante." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Tu rêves d'une relation vivante et pleine d'élan,\nmais à faire dépendre ton équilibre de l'énergie partagée, tu fragilises le lien dès qu'elle retombe.",
        lumiere:
          "Ta chaleur, ta joie et ton don de relier font de toi un partenaire et un ami auprès de qui on se sent vivant et entraîné.",
        ombre:
          "Mais à fuir la routine et les tensions et à rester en surface, tu peux passer à côté des liens profonds que tu mérites.",
        bascule:
          "Le jour où tu existes sans avoir besoin d'animer et où tu cultives quelques liens vraiment profonds, ta chaleur trouve enfin où s'enraciner.",
      },
    },
    "ENFP-V3-carriere": {
      forces: [
        { titre: "Un don pour fédérer", accent: "fédérer", texte: "Tu connectes les gens, tu crées de l'élan collectif et tu redonnes de l'énergie à une équipe." },
        { titre: "Une énergie communicative", accent: "énergie", texte: "Tu insuffles de l'enthousiasme et de la vie, tu dynamises les projets et tu donnes envie d'y croire." },
        { titre: "Une étincelle qui démarre", accent: "étincelle", texte: "Tu excelles dans les phases de lancement et de mobilisation : tu donnes l'impulsion." },
        { titre: "Une chaleur qui crée la cohésion", accent: "cohésion", texte: "Tu désamorces les tensions et tu crées une ambiance positive qui soude les équipes." },
        { titre: "Une intuition des possibles", accent: "intuition", texte: "Tu perçois le potentiel des projets et des gens et tu proposes des aventures enthousiasmantes." },
        { titre: "Une empathie au service du groupe", accent: "empathie", texte: "Tu veilles au bien-être de chacun, ce qui crée des collectifs durables et chaleureux." },
      ],
      ombres: [
        { titre: "Une difficulté à concrétiser", accent: "concrétiser", texte: "Tu excelles à lancer et à mobiliser, beaucoup moins à mener au bout dans la durée." },
        { titre: "La dépendance à l'énergie du groupe", accent: "dépendance", texte: "Tu fais reposer ton équilibre sur le collectif et tu t'essouffles dans le travail solitaire." },
        { titre: "La dispersion", accent: "dispersion", texte: "Tu lances de nombreux projets et tu cours dans tous les sens sans toujours en finir aucun." },
        { titre: "Le suivi qui pèse", accent: "suivi", texte: "La concrétisation patiente et le travail de fond te lassent et font chuter ton énergie." },
        { titre: "Décider pour plaire", accent: "décider", texte: "Ta dépendance à l'harmonie peut te faire suivre le groupe plutôt que tes propres convictions." },
        { titre: "Un rapport libre à l'argent", accent: "argent", texte: "Tu peux être généreux et dépenser pour le collectif, parfois au détriment de ta propre gestion." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "L'isolement et le travail solitaire.",
            "La routine et les tâches répétitives.",
            "Les ambiances froides et impersonnelles.",
            "Le manque de contact humain et d'élan.",
            "Le suivi rigide sans place pour l'initiative.",
          ],
        },
        {
          ton: "positif",
          items: [
            "Le contact humain et le travail d'équipe.",
            "Un environnement vivant où l'on peut créer du lien.",
            "Pouvoir rassembler, animer et enthousiasmer.",
            "La variété, les projets et les aventures collectives.",
            "Pouvoir lancer, mobiliser et fédérer.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Le travail isolé et sans contact humain.",
            "Les postes routiniers et purement procéduraux.",
            "Les environnements froids et impersonnels.",
          ],
          profils: [
            { nom: "Travail solitaire et répétitif", raison: "ni contact humain ni élan collectif pour te nourrir." },
            { nom: "Saisie, contrôle, procédures", raison: "la routine et la rigidité éteignent ton énergie." },
            { nom: "Postes isolés et impersonnels", raison: "aucune place pour rassembler et fédérer." },
          ],
        },
        {
          ton: "positif",
          items: [
            "L'animation d'équipes et de communautés.",
            "La communication, le marketing et l'événementiel.",
            "L'enseignement et l'entrepreneuriat collectif.",
          ],
          profils: [
            { nom: "Animation & communautés", raison: "manager, animateur, chef de projet : rassembler et mobiliser les gens." },
            { nom: "Communication & événementiel", raison: "communicant, organisateur d'événements : créer de l'élan et du lien." },
            { nom: "Enseignement & entrepreneuriat", raison: "formateur, entrepreneur : enthousiasmer et embarquer dans une aventure commune." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Tu excelles à lancer et à mobiliser,\nmais le long travail du suivi et la solitude peuvent éteindre ton élan avant la fin.",
        lumiere:
          "Fédérateur, chaleureux et plein d'énergie, tu es l'étincelle qui lance les aventures collectives et donne aux autres l'envie d'y croire.",
        ombre:
          "Mais ta difficulté à concrétiser et ta dépendance à l'énergie du groupe peuvent laisser tes plus beaux projets s'essouffler.",
        bascule:
          "Le jour où tu mènes au bout ce que tu lances, où tu t'entoures de qui assure le suivi et où tu puises ton énergie aussi en toi, ton don de fédérer devient une réussite durable.",
      },
    },
    "ENFP-V3-developpement": {
      evolution: `Ta personnalité n'est pas figée : elle se déploie au fil du temps, et ton type traverse une maturation intérieure particulièrement nette. Jeune, tu es tout entier dans ton énergie et ton don de fédérer : rassembler, enthousiasmer, créer de l'élan, vivre des aventures collectives. C'est lumineux et entraînant, mais souvent déséquilibré : tu peux ne te sentir vivant qu'au milieu des autres, te disperser entre mille projets sans en finir aucun, et négliger ta propre profondeur.

Avec le temps, tu comprends que tu ne rayonnes durablement que si ton énergie vient aussi de l'intérieur, que ce que tu lances mérite d'être concrétisé, et que quelques liens profonds valent mieux que mille élans dispersés. Tu apprends à exister pour toi-même, à concrétiser, à approfondir, à affronter ce qui est difficile, sans rien perdre de ta chaleur. Dans ta pleine maturité, tu deviens un fédérateur dont l'énergie crée des liens et des réalisations durables, qui rassemble sans se disperser ni dépendre du groupe. Et ce chemin est vraiment le tien à parcourir.`,
      etapes: [
        "Tu attires déjà les autres par ton énergie et ta chaleur, tu rassembles, tu donnes envie. Le monde est une aventure à vivre ensemble, et tu en es spontanément le moteur.",
        "Ton don de fédérer est à son comble : tu rassembles, tu enthousiasmes, tu crées de l'élan partout. C'est lumineux, mais souvent déséquilibré : tu existes dans le groupe, tu te disperses, et te poser ou finir ne va pas encore de soi.",
        "Tu comprends que ton énergie doit aussi venir de l'intérieur et que ce que tu lances mérite d'être mené au bout. Tu apprends à exister pour toi-même, à concrétiser, à approfondir, sans rien perdre de ta chaleur.",
        "Dans ta pleine maturité, tu es un fédérateur dont l'énergie crée des liens et des réalisations durables. Tu rayonnes d'une force intérieure : c'est toi, enfin pleinement déployé.",
      ],
      leviersForts: [
        { titre: "Apprends à être ta propre source d'élan", texte: "Cultive une énergie et un sentiment de valeur qui ne dépendent pas du groupe. Cette autonomie intérieure te rend bien plus solide et libre." },
        { titre: "Mène tes projets jusqu'au bout", texte: "Choisis quelques projets et concrétise-les, quitte à t'entourer de qui assure le suivi. C'est l'achèvement qui transforme ton don de fédérer en réalisations dont tu peux être fier." },
        { titre: "Cultive ta profondeur", texte: "Prends le temps de te connaître et de nourrir ta vie intérieure. Quelques amitiés vraiment profondes où tu te livres valent plus qu'un large cercle de surface." },
        { titre: "Fais de ta chaleur un ciment durable", texte: "Ton énergie soude les groupes : dirige-la vers quelques liens et projets que tu approfondis, et elle crée des choses qui comptent vraiment." },
      ],
      questions: [
        { situation: "Quand tu te retrouves seul", question: "Est-ce que je sais puiser mon énergie en moi, ou j'attends que le groupe la ramène ?" },
        { situation: "Quand un nouveau projet t'emballe", question: "Est-ce que je vais le mener au bout, ou juste l'ajouter à la pile de mes élans ?" },
        { situation: "Quand une tension apparaît", question: "Est-ce que je l'affronte vraiment, ou je la lisse derrière mon enthousiasme ?" },
        { situation: "Quand tu animes en permanence", question: "Avec qui puis-je simplement être moi, sans avoir besoin d'animer ?" },
        { situation: "Quand l'élan collectif retombe", question: "Qu'est-ce qui, en moi, me ressource indépendamment du groupe ?" },
      ],
      paradoxe: {
        tension:
          "Pour faire durer ce que tu lances, tu dois t'ancrer et puiser ton élan en toi,\nmais tu crains qu'en ralentissant, tu éteignes ton énergie rayonnante.",
        lumiere:
          "Ton enthousiasme, ta chaleur et ton don de rassembler sont une force rare : tu as déjà tout ce qu'il faut pour créer des liens et de l'élan partout.",
        ombre:
          "Mais sans exister pour toi-même ni concrétiser, ton énergie se disperse et tes plus beaux élans restent sans suite.",
        bascule:
          "Le jour où ton élan jaillit aussi de l'intérieur et où tu concrétises au lieu de te disperser, ton don de fédérer devient une force durable qui crée des choses qui comptent.",
      },
    },
  },
};
