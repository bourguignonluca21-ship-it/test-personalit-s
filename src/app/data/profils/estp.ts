// =============================================================================
// CONTENU DU PROFIL ESTP (« Entrepreneur »), 3 variantes.
// V1 Fonceur · V2 Tacticien · V3 Charmeur.
// Source : rapports longs rapport_long_ESTP_V1/V2/V3.md.
// Même forme que les entrées de profils.ts (INFP / ENFP) et profils/enfj.ts.
// Voix « tu », aucun tiret long, mot-clé en vert via le champ "accent".
// =============================================================================

const estp = {
  // Texte commun aux 3 variantes (sous les barres du spectre). 2 paragraphes.
  traitsTexte: {
    ESTP: `Ton esprit est tourné vers l'action et vers le présent. Tu puises ton énergie dans le mouvement, le contact et le feu de l'instant, et ta perception du réel est d'une vivacité rare : tu lis une situation en un clin d'œil, tu repères ce qui se passe, et tu réagis vite. Là où d'autres réfléchissent, hésitent ou temporisent, toi tu agis. Cette présence intense au présent, alliée à une logique d'analyse rapide, fait de toi quelqu'un de redoutable quand il faut décider et oser dans l'urgence.

Mais ton audace n'est pas de l'inconscience : sous ton goût du risque, tu gardes la tête froide et tu calcules vite. Tu allies l'élan à la lucidité, l'énergie au sang-froid. Tout l'enjeu de ton chemin, c'est de relier cette force d'action à un peu de projection : ton ancrage dans l'instant peut te faire négliger l'avenir et les conséquences, et tu deviens pleinement toi quand tu apprends à savoir où tu vas sans rien perdre de ton élan.`,
  },

  // 1 phrase par variante, affichée au survol des barres.
  descriptions: {
    "ESTP-V1":
      "Les Fonceurs sont les plus tournés vers l'action immédiate et le défi. Ils saisissent l'instant et foncent là où d'autres hésitent, portés par l'audace, l'énergie physique et le goût de l'adrénaline.",
    "ESTP-V2":
      "Les Tacticiens lisent et retournent les situations à leur avantage. Pragmatiques et malins, ils repèrent l'opportunité que les autres ne voient pas, calculent leur coup et agissent juste.",
    "ESTP-V3":
      "Les Charmeurs entraînent par leur magnétisme. À l'aise avec tout le monde, ils lisent les gens, créent le contact et rallient une salle par leur seule énergie.",
  },

  // 1 phrase d'accroche (héros) par variante.
  accroches: {
    "ESTP-V1": "Tu n'attends pas le bon moment, tu le crées en y allant.",
    "ESTP-V2": "Tu ne subis pas les situations, tu les lis et tu les retournes à ton avantage.",
    "ESTP-V3": "Tu n'entres pas dans une pièce, tu la fais vibrer.",
  },

  // ~2 paragraphes sous le héros (« Ton portrait »).
  intros: {
    "ESTP-V1": `En tant qu'Entrepreneur (ESTP), variante Fonceur, tu possèdes l'énergie d'action et le sens de l'opportunité de ta famille d'âme, et ce qui te définit avant tout, c'est l'action immédiate et le goût du défi. Là où le Tacticien calcule et négocie et où le Charmeur entraîne par son énergie sociale, toi tu te définis d'abord par l'élan : sentir l'occasion, oser, foncer. Tu lis une situation en un clin d'œil, tu sens l'instant, et tu y vas avec une énergie et un sang-froid qui font la différence là où il faut agir vite.

Ce qui te porte, c'est le défi relevé et l'instant saisi. Tu tires une vraie satisfaction d'oser, de te dépasser, de te sentir pleinement vivant dans le feu de l'action. Et ton goût du risque n'est pas de l'inconscience : tu gardes la tête claire et tu calcules vite, ce qui rend ton audace redoutable. Cette même énergie a son revers : ton ancrage dans l'instant peut te rendre impulsif et te faire négliger l'avenir. Ton plus beau terrain de croissance sera d'apprendre à savoir où tu vas sans perdre ton élan.`,

    "ESTP-V2": `En tant qu'Entrepreneur (ESTP), variante Tacticien, tu possèdes l'énergie d'action et le sens de l'opportunité de ta famille d'âme, mais ce qui te définit avant tout, c'est l'intelligence pratique : lire vite, calculer, agir juste. Là où le Fonceur se définit par l'élan pur et où le Charmeur entraîne par son énergie sociale, toi tu allies l'action à une vraie finesse tactique. Tu ne fonces pas à l'aveugle : tu repères l'avantage que les autres ne voient pas, tu joues le bon coup et tu obtiens le résultat.

Ce qui te porte, c'est le coup bien joué et le résultat obtenu. Tu tires une satisfaction profonde de lire une situation mieux que les autres, de négocier, d'obtenir ce que tu veux par ton agilité. Tu n'es pas seulement énergique : tu es malin, pragmatique, redoutablement efficace. Cette même finesse a son revers : à force de jouer le coup d'après, tu peux perdre de vue le long terme et l'humain. Ton plus beau terrain de croissance sera de mettre ta tactique au service d'une vision qui dure.`,

    "ESTP-V3": `En tant qu'Entrepreneur (ESTP), variante Charmeur, tu possèdes l'énergie d'action et le sens de l'opportunité de ta famille d'âme, mais ce qui te définit avant tout, c'est ton charisme et ton aisance avec les gens. Là où le Fonceur se définit par l'élan pur et où le Tacticien calcule et négocie, toi tu mets ton énergie au service du lien et de l'influence : tu séduis, tu entraînes, tu fédères. Tu lis les autres en un clin d'œil, tu sais quoi dire, comment créer le contact, comment rallier une salle.

Ce qui te porte, c'est le contact, l'effet que tu produis, l'énergie que tu crées autour de toi. Tu tires une vraie satisfaction de séduire, d'animer, de voir les gens répondre à ton charme. Ton aisance sociale s'appuie sur ta vivacité et ta lecture rapide des gens, ce qui fait de toi quelqu'un qui entraîne avec une facilité naturelle. Cette même nature a son revers : ton charme peut te faire rester en surface et chercher l'effet plus que le vrai. Ton plus beau terrain de croissance sera d'apprendre à faire de ton charme une porte vers des liens sincères.`,
  },

  // ~2 paragraphes sous les barres de variante (« Ta variante »).
  texteVariante: {
    "ESTP-V1": `Parmi les trois façons d'être de l'Entrepreneur, tu es le plus tourné vers l'action immédiate et le défi. Tu n'es pas avant tout le Tacticien qui calcule, ni le Charmeur qui entraîne par son énergie sociale : ce qui te met en mouvement, c'est l'élan, l'audace, le goût de foncer. Oser, relever un défi, vivre l'intensité du moment te comble plus que tout.

Cette combinaison, l'audace, l'énergie physique et la réactivité, dessine ta façon d'être : l'homme d'action qui saisit l'instant et fonce là où d'autres hésitent. Tu te sens vivant dans le mouvement, et ton sang-froid dans le feu de l'action fait de toi quelqu'un sur qui on peut compter quand ça chauffe. Le revers, c'est que cet élan peut te conduire à l'impulsivité et à négliger l'avenir : ton plus beau chemin de croissance sera d'apprendre à mesurer tes élans sans les tuer.`,

    "ESTP-V2": `Parmi les trois façons d'être de l'Entrepreneur, tu es le plus tourné vers la maîtrise et l'efficacité concrète. Tu n'es pas avant tout le Fonceur porté par l'élan pur, ni le Charmeur qui entraîne par son énergie sociale : ce qui te caractérise, c'est ta façon de lire, de calculer et d'agir juste. Repérer l'avantage, négocier, agir au bon moment et obtenir le résultat te comble plus que tout.

Cette combinaison, l'action, la logique et le pragmatisme, dessine ta façon d'être : le stratège du présent qui joue toujours le bon coup. Tu vois juste et tu joues juste, ce qui fait de toi un négociateur et un improvisateur redoutable. Le revers, c'est que cette finesse peut te limiter au présent et te faire traiter les gens comme des pièces à jouer : ton plus beau chemin de croissance sera de mettre ta tactique au service d'une vision et d'intégrer l'humain dans tes calculs.`,

    "ESTP-V3": `Parmi les trois façons d'être de l'Entrepreneur, tu es le plus tourné vers les gens et l'influence. Tu n'es pas avant tout le Fonceur porté par l'élan pur, ni le Tacticien qui calcule : ce qui te met en mouvement, c'est de séduire, d'entraîner, de créer du lien et de l'énergie autour de toi. Animer, rallier, créer du contact te comble plus que tout.

Cette combinaison, l'aisance relationnelle, la vivacité et l'énergie, dessine ta façon d'être : le séducteur qui entraîne et fédère par sa seule présence. Tu es à l'aise partout, avec tout le monde, et tu sais exactement comment créer le contact. Le revers, c'est que ce charme peut te tenir à la surface des liens et te faire chercher l'effet pour lui-même : ton plus beau chemin de croissance sera d'apprendre à approfondir tes liens et à te montrer vraiment, au-delà de la séduction.`,
  },

  varianteDetail: {
    "ESTP-V1": {
      forces: [
        { titre: "Tu oses et tu fonces", accent: "oses", texte: "Là où d'autres hésitent ou réfléchissent trop, tu y vas, sans peur du défi ni de l'inconnu, ce qui te fait saisir des occasions que la prudence ferait manquer." },
        { titre: "Un sang-froid dans l'action", accent: "sang-froid", texte: "Plus la situation est intense ou urgente, plus tu es à ton aise, et l'on peut compter sur toi quand ça chauffe et que d'autres paniquent." },
        { titre: "Une lecture instantanée", accent: "lecture", texte: "Tu perçois en un clin d'œil ce qui se passe, où est l'occasion et ce qu'il faut faire, ce qui te permet d'agir juste quand chaque seconde compte." },
        { titre: "Une adaptabilité remarquable", accent: "adaptabilité", texte: "Face à l'imprévu, tu réagis et tu improvises avec une aisance rare, et tu te sors des situations les plus mouvantes." },
        { titre: "Une énergie entraînante", accent: "énergie", texte: "Ton dynamisme est communicatif : tu donnes de l'élan, tu mets en mouvement et tu rends les choses vivantes autour de toi." },
        { titre: "Un goût du défi", accent: "défi", texte: "Le risque, l'enjeu, la sensation de te dépasser te nourrissent et te poussent à oser ce que beaucoup n'osent pas." },
      ],
      ombres: [
        { titre: "Une impulsivité possible", accent: "impulsivité", texte: "C'est l'ombre de ton goût de l'action : ton élan peut te faire foncer sans peser les conséquences ou prendre des risques excessifs." },
        { titre: "Du mal à te projeter", accent: "projeter", texte: "Ton ancrage dans le présent peut te rendre difficile la planification et la projection à long terme." },
        { titre: "Un ennui qui vient vite", accent: "ennui", texte: "Ton besoin de stimulation peut te faire fuir la routine et lâcher dès que l'intensité retombe." },
        { titre: "Les conséquences négligées", accent: "conséquences", texte: "Dans la précipitation, tu peux passer sur les sentiments des autres et sur les effets de tes actes." },
        { titre: "Un rapport décomplexé à l'argent", accent: "argent", texte: "Tourné vers le présent, tu peux dépenser sur l'impulsion et négliger l'épargne à long terme." },
        { titre: "Une difficulté à durer", accent: "durer", texte: "Ce qui se construit lentement te pèse, et tu peux décrocher avant d'avoir mené les choses au bout." },
      ],
      paradoxe: {
        tension:
          "Ton énergie d'action te rend si vivant et efficace dans l'instant,\nmais elle peut t'empêcher de te projeter et de mesurer tes élans.",
        lumiere:
          "Ton audace, ton sang-froid et ta capacité à saisir l'instant sont des cadeaux immenses : tu oses, tu agis et tu te sens vivant là où d'autres survivent.",
        ombre:
          "Mais poussées trop loin, ces mêmes qualités peuvent te conduire à l'impulsivité, à négliger l'avenir, à t'ennuyer dès que ça retombe et à passer sur les conséquences.",
        bascule:
          "Le jour où tu apprends à te projeter sans renier ton goût de l'action et à mesurer tes élans sans les tuer, ton énergie cesse de te disperser pour devenir une force qui construit aussi.",
      },
    },
    "ESTP-V2": {
      forces: [
        { titre: "Tu repères l'opportunité", accent: "opportunité", texte: "Tu vois l'avantage, l'occasion, l'angle que les autres ne voient pas, et tu joues les bons coups là où d'autres restent spectateurs." },
        { titre: "Une analyse vive et juste", accent: "analyse", texte: "Tu comprends les mécanismes d'une situation en un instant, tu évalues, tu calcules, et tu vas droit à l'essentiel sans perdre de temps." },
        { titre: "Un pragmatisme efficace", accent: "pragmatisme", texte: "Tu te concentres sur ce qui marche et sur le résultat concret, et tu obtiens des résultats là où d'autres délibèrent." },
        { titre: "Un sens de la négociation", accent: "négociation", texte: "Tu lis les gens et les situations, tu ajustes ton approche et tu trouves l'angle gagnant, ce qui fait de toi un négociateur redoutable." },
        { titre: "Un sang-froid calculateur", accent: "sang-froid", texte: "Dans l'action et la pression, tu restes lucide, ce qui te permet de jouer juste quand l'enjeu est fort." },
        { titre: "Une agilité dans l'imprévu", accent: "agilité", texte: "Tu sais rebondir et exploiter chaque situation à mesure qu'elle évolue, à l'aise là où le plan figé ne sert à rien." },
      ],
      ombres: [
        { titre: "Un court-termisme tenace", accent: "court-termisme", texte: "Ta capacité à jouer le bon coup dans l'instant peut te faire négliger la vision à long terme au profit de l'avantage immédiat." },
        { titre: "Une froideur tactique", accent: "froideur", texte: "Ton efficacité logique peut te faire traiter les situations comme des coups à jouer plutôt que comme des relations." },
        { titre: "Une prise de risque excessive", accent: "risque", texte: "Ton goût de l'avantage peut te pousser à des paris de trop quand ton flair s'emballe." },
        { titre: "Un ennui qui vient vite", accent: "ennui", texte: "Ton besoin de coups à jouer peut te faire fuir la routine et lâcher dès que l'enjeu retombe." },
        { titre: "Un rapport opportuniste à l'argent", accent: "argent", texte: "Ton flair pour les bons coups est un atout, mais il peut virer au court-termisme et à la prise de risque mal calibrée." },
        { titre: "Une difficulté à durer", accent: "durer", texte: "Ce qui se construit lentement te pèse, et tu peux gagner mille coups sans suivre la partie d'ensemble." },
      ],
      paradoxe: {
        tension:
          "Ta finesse tactique te fait jouer le bon coup dans l'instant,\nmais elle peut te faire perdre de vue le long terme et l'humain.",
        lumiere:
          "Ton sens de l'opportunité, ta logique d'action et ton pragmatisme sont des cadeaux immenses : tu vois juste, tu joues juste et tu obtiens des résultats.",
        ombre:
          "Mais poussées trop loin, ces mêmes qualités peuvent te conduire à ne penser qu'au coup d'après, à traiter les gens comme des pièces et à négliger ce qui se construit lentement.",
        bascule:
          "Le jour où tu mets ta tactique au service d'une vision et où tu intègres l'humain dans tes calculs, ton intelligence pratique cesse de te limiter au présent pour devenir une force qui construit dans le temps.",
      },
    },
    "ESTP-V3": {
      forces: [
        { titre: "Un vrai charisme", accent: "charisme", texte: "Tu attires, tu séduis, tu marques les gens par ta présence et ton énergie, et tu crées de l'élan partout où tu passes." },
        { titre: "Une lecture des gens", accent: "lecture", texte: "Tu perçois vite les ambiances, les humeurs, ce qui touche chacun, ce qui te permet de créer le contact et de trouver le bon mot." },
        { titre: "Un don pour fédérer", accent: "fédérer", texte: "Tu sais rallier, motiver, mettre de l'énergie dans un groupe, et les choses se mettent en mouvement autour de toi." },
        { titre: "Une aisance partout", accent: "aisance", texte: "Avec tout le monde, dans toutes les situations sociales, tu trouves ta place et tu crées le lien." },
        { titre: "Une vivacité adaptable", accent: "vivacité", texte: "Tu réagis vite, tu improvises, tu ajustes ton approche à chaque situation, et tu séduis dans n'importe quel contexte." },
        { titre: "Une énergie communicative", accent: "énergie", texte: "Ton dynamisme entraîne et donne envie : ta présence rend les choses vivantes et excitantes." },
      ],
      ombres: [
        { titre: "La recherche de l'effet", accent: "effet", texte: "C'est l'ombre de ton charisme : ton goût de plaire peut te faire chercher l'effet pour lui-même ou user de ton charme pour obtenir plutôt que pour relier." },
        { titre: "Le risque de surface", accent: "surface", texte: "Ton aisance sociale peut te faire multiplier les contacts sans toujours aller en profondeur." },
        { titre: "Une impulsivité possible", accent: "impulsivité", texte: "Ton goût de l'instant et de la stimulation peut te faire foncer sans peser." },
        { titre: "La fuite de l'intime", accent: "fuite", texte: "Ton aisance dans le jeu social peut masquer une difficulté avec les émotions plus profondes." },
        { titre: "Un rapport à l'image", accent: "image", texte: "Tourné vers le contact et le paraître, tu peux dépenser pour ce qui te met en valeur et négliger la projection." },
        { titre: "Une difficulté à te projeter", accent: "projeter", texte: "Tourné vers le présent et l'effet immédiat, tu peux négliger ce qui se construit dans la durée." },
      ],
      paradoxe: {
        tension:
          "Ton charme te rend si magnétique et entraînant,\nmais il peut te faire rester à la surface des liens et chercher l'effet plus que le vrai.",
        lumiere:
          "Ton aisance sociale, ton magnétisme et ta capacité à entraîner sont des cadeaux immenses : tu séduis, tu rallies et tu crées de l'énergie partout.",
        ombre:
          "Mais poussées trop loin, ces mêmes qualités peuvent te conduire à rechercher l'effet pour lui-même, à multiplier les contacts sans profondeur et à user de ton charme pour obtenir.",
        bascule:
          "Le jour où tu mets ton charme au service de liens sincères et où tu cherches le vrai autant que l'effet, ton magnétisme cesse d'être un jeu de surface pour devenir une force qui crée des liens authentiques.",
      },
    },
  },

  relationsTexte: {
    "ESTP-V1": `En amour comme en amitié, tu es énergique, spontané et vivant. Tu apportes de l'aventure, de l'intensité et du fun, et tu montres ton intérêt par l'action et les expériences partagées plus que par les grandes déclarations. Être aimé par toi, c'est ne pas s'ennuyer, vivre des choses, partager une vraie complicité dans l'action. En amitié, tu es le compagnon d'action, celui qui propose et qui entraîne, là dans les coups durs et toujours prêt à mettre de la vie dans le groupe. Sous ton apparente légèreté, tu es capable d'un attachement réel et d'une loyauté sincère une fois engagé.

Tes défis sont les revers de ta nature : ton besoin de stimulation peut te faire fuir la routine et t'ennuyer, ton impulsivité te faire négliger les conséquences, et ta difficulté avec les conversations émotionnelles laisser l'autre sur sa faim. Ton chemin, c'est d'apprendre à t'engager dans la durée, à tenir compte de l'autre et de ses émotions, et à ne pas fuir ce qui touche au cœur. Quand tu y parviens, tu offres une relation d'une vivacité et d'une authenticité rares.`,

    "ESTP-V2": `En amour comme en amitié, tu es vif, pragmatique et présent. Tu apportes de l'énergie, de l'aventure et une vraie attention à ce qui fait plaisir à l'autre quand tu t'y mets, et tu montres ton intérêt par l'action plus que par les mots. Être aimé par toi, c'est partager une complicité vivante, ne pas s'ennuyer, avoir à ses côtés quelqu'un de débrouillard et de solide. En amitié, tu es le débrouillard fidèle, celui qui trouve toujours un moyen, qui propose des plans et rend service efficacement. Sous ton pragmatisme, tu es capable d'un attachement réel et d'une loyauté sincère une fois engagé.

Tes défis sont les revers de ta nature : ton côté tactique peut te faire aborder la relation comme un terrain à gérer plutôt qu'à ressentir, ta difficulté avec les émotions laisser l'autre sur sa faim, et ton besoin de stimulation te faire fuir la routine. Ton chemin, c'est d'apprendre à ressentir et à exprimer, à ne pas tout traiter comme un coup à jouer, à t'engager dans la durée. Quand tu y parviens, tu offres une relation d'une vivacité et d'une solidité rares.`,

    "ESTP-V3": `En amour comme en amitié, tu es charmeur, vivant et attentionné. Tu sais séduire, créer de la complicité, apporter de l'énergie et du plaisir, et tu montres ton intérêt par la présence et les expériences partagées. Être aimé par toi, c'est se sentir choisi par quelqu'un de magnétique, vivre une relation pleine d'énergie et de charme. En amitié, tu es le boute-en-train, celui qui crée l'ambiance, qui connaît tout le monde et met de la vie dans le groupe. Sous ton charme, tu es capable d'un attachement réel et d'une loyauté sincère une fois engagé pour de vrai.

Tes défis sont les revers de ta nature : ton goût de séduire peut te faire chercher l'effet ou multiplier les conquêtes plutôt que d'approfondir, ton aisance sociale masquer une difficulté avec l'intimité, et ton besoin de stimulation te faire fuir la routine. Ton chemin, c'est d'apprendre à approfondir un lien, à aller vers le vrai au-delà du charme, à t'engager sincèrement. Quand tu y parviens, tu offres une relation d'une vivacité et d'une chaleur rares.`,
  },

  proTexte: {
    "ESTP-V1": `Au travail, tu es à ton aise dans les métiers d'action, de réactivité et de concret, où l'on vit des situations intenses plutôt que de remplir des dossiers. Une carrière qui t'épanouit te laisse de l'autonomie, du mouvement, de l'enjeu et des défis réels. Tu t'éteins dans la routine et la théorie abstraite, et tu te révèles quand tu peux agir, réagir, oser : commerce, vente, entrepreneuriat, métiers d'urgence, sport, sécurité, partout où il faut agir vite, saisir l'occasion et garder son sang-froid.

Ta réactivité et ton audace sont rarement en cause ; ce qui peut te coûter, c'est l'impulsivité, la difficulté à te projeter à long terme et l'ennui qui te fait décrocher quand l'intensité retombe. Apprendre à te fixer un cap et à tenir au-delà du premier élan donne toute sa portée à ton énergie. Tu décides vite et sans te laisser paralyser, ce qui est précieux dans l'urgence ; le point de vigilance, c'est de mieux mesurer les conséquences à long terme et l'impact humain de tes choix.`,

    "ESTP-V2": `Au travail, tu es à ton aise dans les métiers où l'on lit vite, où l'on négocie, où l'on saisit les opportunités, dans le concret et l'enjeu. Une carrière qui t'épanouit te laisse de l'autonomie, des coups à jouer et des situations à gérer. Tu t'éteins dans la routine et la théorie abstraite, et tu te révèles quand tu peux analyser, négocier, agir efficacement : commerce, vente, négociation, entrepreneuriat, finance, métiers à enjeu et à décision rapide, partout où il faut lire vite et jouer juste.

Ton efficacité tactique est rarement en cause ; ce qui peut te coûter, c'est le court-termisme, la froideur tactique et l'ennui quand l'enjeu retombe. Apprendre à mettre ta tactique au service d'une vision et à intégrer la dimension humaine donne toute sa portée à ton intelligence pratique. Tu évalues vite et tu joues le bon coup, ce qui est précieux ; le point de vigilance, c'est d'intégrer le long terme et les conséquences sur les gens à ton excellent sens du coup à jouer.`,

    "ESTP-V3": `Au travail, tu es à ton aise dans les métiers de contact, d'influence et de relation, où ton charme et ton aisance font la différence. Une carrière qui t'épanouit te met au contact des gens et te permet de convaincre, d'entraîner, d'animer, dans l'enjeu et le mouvement. Tu t'éteins dans l'isolement et la routine, et tu te révèles quand tu peux séduire, rallier, créer du lien : vente, commerce, négociation, communication, relations publiques, animation, entrepreneuriat, partout où le charisme et l'aisance sociale comptent.

Ton charisme et ton aisance sont rarement en cause ; ce qui peut te coûter, c'est de rester en surface, de chercher l'effet, et la difficulté à te projeter à long terme. Apprendre à bâtir des relations sincères et durables et à viser loin donne toute sa portée à ton magnétisme. Ta lecture des gens et ton sens du contact sont un atout rare ; le point de vigilance, c'est de décider sur le fond autant que sur l'effet et de penser au-delà de l'instant.`,
  },

  mindsetTexte: {
    "ESTP-V1": {
      apercu: `Ton plus grand chantier n'est pas de trouver l'énergie, elle déborde, c'est d'apprendre à savoir où tu vas. Tu portes en toi une audace et un sang-froid rares, mais aussi une tendance à foncer sans peser, à t'ennuyer dès que ça retombe, à négliger l'avenir et les conséquences. La bonne nouvelle, c'est que ces fragilités sont aussi tes plus grands leviers de croissance, à condition de savoir où appuyer.`,
    },
    "ESTP-V2": {
      apercu: `Ton plus grand chantier n'est pas de gagner le coup d'après, tu excelles à ça, c'est d'apprendre à voir où mène la partie. Tu portes en toi une finesse tactique et un pragmatisme rares, mais aussi une tendance au court-termisme, à la froideur calculatrice, à l'ennui dès que l'enjeu retombe. La bonne nouvelle, c'est que ces fragilités sont aussi tes plus grands leviers de croissance, à condition de savoir où appuyer.`,
    },
    "ESTP-V3": {
      apercu: `Ton plus grand chantier n'est pas de séduire, tu le fais avec une facilité naturelle, c'est d'apprendre à faire de ton charme une porte vers le vrai. Tu portes en toi un magnétisme et une aisance rares, mais aussi une tendance à rester en surface, à chercher l'effet, à fuir l'intimité émotionnelle. La bonne nouvelle, c'est que ces fragilités sont aussi tes plus grands leviers de croissance, à condition de savoir où appuyer.`,
    },
  },

  sectionDetail: {
    // ----------------------------------------------------------------- V1 -----
    "ESTP-V1-relations": {
      forces: [
        { titre: "Une présence qui fait vibrer", accent: "vibrer", texte: "Avec toi, le quotidien devient une aventure : tu apportes de l'énergie, de l'intensité et du fun à la relation." },
        { titre: "Une complicité dans l'action", accent: "complicité", texte: "Tu montres ton intérêt par les expériences partagées et la présence, et l'on ne s'ennuie jamais à tes côtés." },
        { titre: "Un compagnon d'action", accent: "action", texte: "Tu es celui qui propose, qui entraîne, avec qui on vit des choses et qui met de la vie dans le groupe." },
        { titre: "Une fiabilité dans les coups durs", accent: "fiabilité", texte: "Quand ça chauffe, tu es là, tu rends service concrètement et tu gardes ton sang-froid." },
        { titre: "Une loyauté sincère", accent: "loyauté", texte: "Sous ton apparente légèreté, tu es capable d'un attachement réel une fois vraiment engagé." },
        { titre: "Un respect de la liberté", accent: "liberté", texte: "Tu laisses de l'air à l'autre et tu apprécies une relation qui ne t'enferme pas dans la routine." },
      ],
      ombres: [
        { titre: "La fuite de la routine", accent: "routine", texte: "Ton besoin de stimulation peut te faire t'ennuyer et fuir dès que la relation s'installe dans le calme." },
        { titre: "Une impulsivité possible", accent: "impulsivité", texte: "Ton élan peut te faire agir sans peser les conséquences pour l'autre." },
        { titre: "Les conversations émotionnelles", accent: "émotionnelles", texte: "Ta difficulté avec ce qui touche au cœur peut laisser l'autre sur sa faim." },
        { titre: "Les conséquences négligées", accent: "conséquences", texte: "Dans la précipitation, tu peux passer sur les sentiments et les besoins de tes proches." },
        { titre: "Le lien négligé", accent: "négligé", texte: "Quand l'aventure est ailleurs, tu peux délaisser ceux qui te sont proches." },
        { titre: "Une difficulté à durer", accent: "durer", texte: "L'engagement dans la durée te pèse, et tu peux lâcher quand l'intensité retombe." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "La routine figée, sans aventure ni mouvement.",
            "Le contrôle et la jalousie qui rognent ta liberté.",
            "Les relations qui t'enferment et t'étouffent.",
            "Les conversations sans fin sur les émotions.",
            "Les reproches qui brident ton besoin d'action.",
          ],
        },
        {
          ton: "positif",
          items: [
            "Des expériences et des aventures à vivre ensemble.",
            "Un partenaire qui partage ton énergie ou sait l'apprécier.",
            "De la liberté et du mouvement.",
            "Une complicité vivante, sans routine.",
            "Quelqu'un qui t'ancre un peu sans t'enfermer.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Les tempéraments très attachés à la routine et à la sécurité.",
            "Les profils très demandeurs émotionnellement.",
            "Les personnalités contrôlantes qui rognent ta liberté.",
          ],
          profils: [
            { code: "ISFJ", raison: "son attachement à la routine et à la sécurité peut se heurter à ton besoin d'action." },
            { code: "INFP", raison: "sa grande demande émotionnelle peut te sembler lourde et te laisser démuni." },
            { code: "ISTJ", raison: "son besoin de planification et de règles cadre mal avec ta spontanéité." },
          ],
        },
        {
          ton: "positif",
          items: [
            "Les tempéraments énergiques et amateurs d'action.",
            "Les profils plus posés qui t'aident à te projeter.",
            "Les plus sensibles qui t'aident à intégrer l'humain.",
          ],
          profils: [
            { code: "ESFP", raison: "il partage ton goût de l'action et de l'instant, sans pression ni ennui." },
            { code: "ISTP", raison: "sa débrouillardise et son calme rejoignent ton sang-froid et ton goût du concret." },
            { code: "ISFJ", raison: "sa stabilité et son attention t'ancrent un peu dans la durée et l'humain." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Tu apportes de l'aventure et de l'intensité dans tes liens,\nmais à fuir la routine et ce qui touche au cœur, tu peux laisser l'autre sur sa faim.",
        lumiere:
          "Ton énergie, ta spontanéité et ta présence dans l'action font de toi un partenaire et un ami auprès de qui on ne s'ennuie jamais.",
        ombre:
          "Mais à fuir le calme, à négliger les émotions et à passer sur les conséquences, tu peux fragiliser les liens qui comptent le plus.",
        bascule:
          "Le jour où tu t'engages dans la durée et où tu oses ce qui touche au cœur, ta vivacité trouve enfin où s'enraciner.",
      },
    },
    "ESTP-V1-carriere": {
      forces: [
        { titre: "Une audace qui ose", accent: "audace", texte: "Tu y vas quand d'autres hésitent, et tu saisis des occasions que la prudence excessive ferait manquer." },
        { titre: "Un sang-froid sous pression", accent: "sang-froid", texte: "Plus l'urgence est forte, plus tu es à ton aise, et l'on compte sur toi quand il faut garder la tête froide." },
        { titre: "Une réactivité précieuse", accent: "réactivité", texte: "Tu lis vite les situations et tu agis juste quand chaque seconde compte." },
        { titre: "Une adaptabilité dans l'imprévu", accent: "adaptabilité", texte: "Tu réagis et tu improvises avec aisance, redoutable là où la planification ne sert à rien." },
        { titre: "Une énergie motrice", accent: "énergie", texte: "Ton dynamisme met les choses en mouvement et rend le travail vivant autour de toi." },
        { titre: "Une décision rapide", accent: "décision", texte: "Tu décides vite et sur le moment, sans te laisser paralyser, ce qui est précieux dans l'action." },
      ],
      ombres: [
        { titre: "Une impulsivité possible", accent: "impulsivité", texte: "Foncer sans peser peut te coûter cher quand l'élan prend le pas sur le calcul." },
        { titre: "Du mal à te projeter", accent: "projeter", texte: "La planification et la vision à long terme ne sont pas ton terrain naturel." },
        { titre: "Un ennui qui décroche", accent: "ennui", texte: "Tu peux lâcher dès que l'intensité retombe et fuir la routine et la théorie." },
        { titre: "La constance difficile", accent: "constance", texte: "Tenir au-delà du premier élan et finir ce que tu commences te coûte." },
        { titre: "Les environnements lents", accent: "lents", texte: "La bureaucratie et les procédures lourdes t'épuisent et te démotivent vite." },
        { titre: "Un rapport décomplexé à l'argent", accent: "argent", texte: "Tu peux dépenser sur l'impulsion et négliger l'épargne et la projection." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "La routine et les tâches répétitives.",
            "La bureaucratie et les procédures lourdes.",
            "La théorie abstraite sans application.",
            "Les réunions interminables et le manque d'enjeu.",
            "Le cadre rigide qui bride ta réactivité.",
          ],
        },
        {
          ton: "positif",
          items: [
            "De l'autonomie et de la liberté d'action.",
            "Du mouvement, de l'enjeu et des défis réels.",
            "Des situations intenses à gérer dans l'urgence.",
            "De la variété et du concret.",
            "Pouvoir agir, réagir et oser.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Les postes routiniers et procéduriers.",
            "Les environnements lents et bureaucratiques.",
            "Le travail théorique et abstrait.",
          ],
          profils: [
            { nom: "Saisie, contrôle, procédures", raison: "la routine et la lenteur éteignent ton énergie d'action." },
            { nom: "Postes très bureaucratiques", raison: "la lourdeur administrative t'épuise et te démotive." },
            { nom: "Travail théorique et abstrait", raison: "ni action ni concret pour te révéler." },
          ],
        },
        {
          ton: "positif",
          items: [
            "Le commerce, la vente et l'entrepreneuriat.",
            "Les métiers d'urgence, de sécurité et de terrain.",
            "Le sport et tout ce qui demande réactivité.",
          ],
          profils: [
            { nom: "Vente & entrepreneuriat", raison: "saisir l'occasion, agir vite, oser dans le concret." },
            { nom: "Urgence & sécurité", raison: "garder son sang-froid et réagir juste quand ça chauffe." },
            { nom: "Sport & métiers de terrain", raison: "vivre l'intensité et le défi physique au présent." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Ta réactivité et ton audace te rendent redoutable dans l'urgence,\nmais l'impulsivité et le manque de projection peuvent te faire décrocher.",
        lumiere:
          "Audacieux, vif et plein de sang-froid, tu es celui qui agit et qui se sort des situations quand d'autres hésitent.",
        ombre:
          "Mais ton impulsivité, ta difficulté à te projeter et l'ennui qui te gagne peuvent laisser ton énergie sans suite.",
        bascule:
          "Le jour où tu te fixes un cap et où tu tiens au-delà du premier élan, ton énergie d'action se transforme en accomplissements durables.",
      },
    },
    "ESTP-V1-developpement": {
      evolution: `Ta personnalité n'est pas figée : elle mûrit, et ton type suit une trajectoire de croissance assez nette. Plus jeune, tu es surtout porté par ton énergie d'action : oser, foncer, saisir l'instant, relever des défis. C'est intense, mais souvent déséquilibré : tu peux être impulsif, court-termiste, t'ennuyer vite et passer sur les conséquences et les sentiments des autres. Tu excelles dans l'action, mais l'avenir et l'humain te restent étrangers.

Avec le temps, quelque chose s'ouvre. Tu réalises que se projeter ouvre des possibilités que l'action seule ne permet pas, que tenir compte des autres rend ton énergie mieux acceptée, et que mesurer ses élans n'est pas les tuer. Tu apprends à anticiper, à t'engager dans la durée, à intégrer la dimension humaine, sans rien perdre de ton audace. Dans ta pleine maturité, tu deviens un fonceur qui agit vite ET juste : audacieux et vivant, mais aussi capable de se projeter, de durer et de tenir compte des conséquences. Et c'est entièrement à ta portée.`,
      etapes: [
        "Plein d'énergie dès l'enfance, tu bouges, tu touches à tout, tu cherches le mouvement et le défi. Le monde est un terrain de jeu où l'on apprend en agissant, pas en attendant.",
        "Ton énergie d'action est à son comble : tu oses, tu fonces, tu saisis l'instant, tu vis pour l'intensité. C'est intense, mais souvent déséquilibré : tu peux être impulsif, t'ennuyer vite et passer sur les conséquences. Une période où ton audace se révèle et cherche encore sa juste mesure.",
        "Tu comprends que foncer ne suffit pas et que se projeter ouvre des possibilités que l'action seule ne donne pas. Tu apprends à anticiper, à mesurer tes élans et à tenir compte des autres, sans rien perdre de ton audace.",
        "Dans ta pleine maturité, tu es un fonceur qui agit vite et juste. Tu as gardé ton énergie et ton sang-froid, mais tu sais désormais où tu vas et tu construis dans la durée : la version la plus accomplie de toi.",
      ],
      leviersForts: [
        { titre: "Apprends à te projeter", texte: "C'est ton plus grand levier : te fixer un cap et penser à demain, sans renier ton goût de l'action, transforme ton énergie en accomplissements durables." },
        { titre: "Mesure tes élans", texte: "Marque un temps avant de foncer et pèse les risques, sans tuer ta réactivité. L'audace dirigée est bien plus puissante que l'impulsivité." },
        { titre: "Tiens compte des autres", texte: "Intègre les conséquences humaines de tes actes et intéresse-toi à ce que ressentent les gens : cela rend ton énergie mieux acceptée et tes relations plus solides." },
        { titre: "Engage-toi dans la durée", texte: "Apprends à tenir au-delà du premier élan et à finir ce que tu commences. L'engagement transforme ta vitalité en construction." },
      ],
      questions: [
        { situation: "Quand une occasion te pousse à foncer", question: "Est-ce que je mesure aussi ce que cela peut coûter, ou je fonce à l'aveugle ?" },
        { situation: "Quand l'intensité retombe", question: "Est-ce que je lâche par ennui, ou est-ce vraiment le moment d'arrêter ?" },
        { situation: "Quand tu agis dans la précipitation", question: "Est-ce que je tiens compte de l'effet de mes actes sur les autres ?" },
        { situation: "Quand un projet demande de la constance", question: "Est-ce que je tiens jusqu'au bout, ou je décroche dès que ça devient routinier ?" },
        { situation: "Quand tout va vite autour de toi", question: "Est-ce que je sais où je vais, ou je me contente de réagir ?" },
      ],
      paradoxe: {
        tension:
          "Pour aller loin, tu dois apprendre à te projeter et à durer,\nmais tu crains qu'en te posant, tu éteignes ton goût de l'action.",
        lumiere:
          "Ton audace, ton sang-froid et ton énergie sont une force rare : tu as déjà tout ce qu'il faut pour oser et te sortir des situations.",
        ombre:
          "Mais sans cap ni constance, ton énergie se disperse et tes plus beaux élans restent sans suite.",
        bascule:
          "Le jour où tu vois la projection non comme un frein mais comme ce qui donne une direction à ton élan, tu ne fais plus que foncer : tu vas loin.",
      },
    },
    // ----------------------------------------------------------------- V2 -----
    "ESTP-V2-relations": {
      forces: [
        { titre: "Une présence vivante", accent: "vivante", texte: "Tu apportes de l'énergie et de l'aventure, et l'on ne s'ennuie pas à tes côtés." },
        { titre: "Une attention efficace", accent: "attention", texte: "Quand tu t'y mets, tu portes une vraie attention à ce qui fait plaisir à l'autre, par les actes plus que par les mots." },
        { titre: "Un débrouillard fidèle", accent: "débrouillard", texte: "Tu trouves toujours un moyen, tu proposes des plans et tu rends service concrètement." },
        { titre: "Une présence solide", accent: "solide", texte: "Dans les coups durs, tu es là, tu trouves des solutions et tu rassures par ta débrouillardise." },
        { titre: "Une loyauté sincère", accent: "loyauté", texte: "Sous ton pragmatisme, tu es capable d'un attachement réel une fois vraiment engagé." },
        { titre: "Un respect de la liberté", accent: "liberté", texte: "Tu apprécies une complicité qui ne t'enferme pas et tu laisses de l'air à l'autre." },
      ],
      ombres: [
        { titre: "La relation gérée", accent: "gérée", texte: "Ton côté tactique peut te faire aborder le lien comme un terrain à gérer plutôt qu'à ressentir." },
        { titre: "Les émotions difficiles", accent: "émotions", texte: "Ta difficulté avec le ressenti peut laisser l'autre sur sa faim affective." },
        { titre: "La fuite de la routine", accent: "routine", texte: "Ton besoin de stimulation peut te faire t'ennuyer et fuir quand le calme s'installe." },
        { titre: "Le calcul de trop", accent: "calcul", texte: "À tout traiter comme un coup à jouer, tu peux manquer la spontanéité du cœur." },
        { titre: "Le lien négligé", accent: "négligé", texte: "Dans les temps calmes, ton besoin de stimulation peut te faire négliger le lien." },
        { titre: "Une difficulté à durer", accent: "durer", texte: "L'engagement dans la durée te pèse quand l'enjeu du début retombe." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "La routine figée, sans enjeu ni mouvement.",
            "Le contrôle et la jalousie qui rognent ta liberté.",
            "Les relations qui t'enferment et te bridant.",
            "Les longues conversations purement émotionnelles.",
            "Les reproches qui brident ton besoin d'agir.",
          ],
        },
        {
          ton: "positif",
          items: [
            "Une complicité vivante, sans routine.",
            "Un partenaire qui te suit dans l'action ou sait l'apprécier.",
            "De la liberté et du mouvement.",
            "Des expériences à vivre et des défis à relever ensemble.",
            "Quelqu'un qui t'invite à ressentir sans te brider.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Les tempéraments très émotionnels et demandeurs.",
            "Les profils très attachés à la routine.",
            "Les personnalités contrôlantes qui rognent ta liberté.",
          ],
          profils: [
            { code: "INFP", raison: "sa grande demande émotionnelle peut se heurter à ton pragmatisme." },
            { code: "ISFJ", raison: "son attachement à la routine et à la sécurité cadre mal avec ton besoin de stimulation." },
            { code: "INFJ", raison: "son intensité émotionnelle peut trouver ton approche tactique trop froide." },
          ],
        },
        {
          ton: "positif",
          items: [
            "Les tempéraments vifs, pragmatiques et autonomes.",
            "Les profils plus posés qui t'aident à te projeter.",
            "Les plus sensibles qui t'aident à intégrer l'humain.",
          ],
          profils: [
            { code: "ESTP", raison: "il partage ton goût de l'action et de l'efficacité, sans pression." },
            { code: "ISTP", raison: "sa débrouillardise et son calme rejoignent ton pragmatisme et ton sang-froid." },
            { code: "ESFJ", raison: "sa chaleur et son attention t'aident à intégrer la dimension humaine que ta tactique néglige." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Tu apportes de l'énergie et de la débrouillardise dans tes liens,\nmais à tout aborder comme un terrain à gérer, tu peux passer à côté du ressenti.",
        lumiere:
          "Ta vivacité, ta solidité et ta capacité à trouver des solutions font de toi un partenaire et un ami sur qui on peut compter.",
        ombre:
          "Mais à traiter la relation comme un coup à jouer, à fuir la routine et à taire les émotions, tu peux laisser l'autre sur sa faim.",
        bascule:
          "Le jour où tu apprends à ressentir et à exprimer autant qu'à calculer, ta vivacité s'enrichit d'une vraie profondeur.",
      },
    },
    "ESTP-V2-carriere": {
      forces: [
        { titre: "Un sens de l'opportunité", accent: "opportunité", texte: "Tu repères l'avantage et l'angle que les autres ne voient pas, et tu joues les bons coups." },
        { titre: "Une analyse rapide", accent: "analyse", texte: "Tu comprends les mécanismes en un instant, tu évalues et tu vas droit à l'essentiel." },
        { titre: "Un pragmatisme efficace", accent: "pragmatisme", texte: "Tu te concentres sur ce qui marche et tu obtiens des résultats là où d'autres délibèrent." },
        { titre: "Un don pour négocier", accent: "négocier", texte: "Tu lis les situations, tu ajustes ton approche et tu trouves l'angle gagnant." },
        { titre: "Un sang-froid calculateur", accent: "sang-froid", texte: "Sous la pression, tu restes lucide et tu joues juste quand l'enjeu est fort." },
        { titre: "Une agilité dans l'imprévu", accent: "agilité", texte: "Tu sais rebondir et exploiter chaque situation à mesure qu'elle évolue." },
      ],
      ombres: [
        { titre: "Un court-termisme tenace", accent: "court-termisme", texte: "Ton sens du coup d'après peut te faire négliger la stratégie d'ensemble." },
        { titre: "Une froideur tactique", accent: "froideur", texte: "Ton efficacité peut te faire passer sur la dimension humaine du travail." },
        { titre: "Une prise de risque excessive", accent: "risque", texte: "Ton goût de l'avantage peut te pousser à des paris de trop." },
        { titre: "Un ennui qui décroche", accent: "ennui", texte: "Tu peux lâcher dès que l'enjeu retombe et fuir la routine et la théorie." },
        { titre: "Les environnements lents", accent: "lents", texte: "La bureaucratie et les procédures lourdes t'épuisent et te démotivent." },
        { titre: "Un rapport opportuniste à l'argent", accent: "argent", texte: "Ton flair est un atout, mais il peut virer au court-termisme et au pari mal calibré." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "La routine et les tâches répétitives.",
            "La bureaucratie et les procédures lourdes.",
            "Le micro-management qui bride ton autonomie.",
            "La théorie sans application concrète.",
            "L'absence d'enjeu et de coups à jouer.",
          ],
        },
        {
          ton: "positif",
          items: [
            "De l'autonomie et de la liberté d'action.",
            "Des coups à jouer et des situations à gérer.",
            "De l'enjeu, de la variété et du concret.",
            "Des défis à résoudre par l'agilité.",
            "Pouvoir analyser, négocier et obtenir des résultats.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Les postes routiniers et procéduriers.",
            "Les environnements lents et bureaucratiques.",
            "Le travail théorique et impersonnel.",
          ],
          profils: [
            { nom: "Saisie, contrôle, procédures", raison: "la routine et la lenteur éteignent ton sens du coup à jouer." },
            { nom: "Postes très bureaucratiques", raison: "la lourdeur administrative t'épuise et te démotive." },
            { nom: "Travail théorique et abstrait", raison: "ni enjeu ni concret pour te révéler." },
          ],
        },
        {
          ton: "positif",
          items: [
            "Le commerce, la vente et la négociation.",
            "L'entrepreneuriat et la finance.",
            "Les métiers à enjeu et à décision rapide.",
          ],
          profils: [
            { nom: "Vente & négociation", raison: "lire vite, jouer juste et obtenir le résultat." },
            { nom: "Entrepreneuriat & finance", raison: "saisir l'opportunité et faire de bons coups dans l'enjeu." },
            { nom: "Métiers à décision rapide", raison: "évaluer vite et agir efficacement sous pression." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Ton efficacité tactique te fait gagner chaque coup,\nmais le court-termisme et la froideur peuvent te faire perdre la partie d'ensemble.",
        lumiere:
          "Vif, pragmatique et redoutablement efficace, tu trouves l'angle que les autres ratent et tu obtiens des résultats.",
        ombre:
          "Mais à ne penser qu'au coup d'après et à négliger l'humain, tu peux passer à côté de la stratégie de fond et des liens.",
        bascule:
          "Le jour où tu mets ta tactique au service d'une vision et où tu intègres l'humain, tu ne gagnes plus seulement des coups : tu remportes la partie.",
      },
    },
    "ESTP-V2-developpement": {
      evolution: `Ta personnalité n'est pas figée : elle mûrit, et ton type suit une trajectoire de croissance assez nette. Plus jeune, tu es surtout porté par ton sens tactique et ton goût de l'action : lire, calculer, jouer le bon coup, saisir l'opportunité. C'est efficace, mais souvent déséquilibré : tu peux être court-termiste, froidement tactique, prendre des risques, t'ennuyer vite et négliger l'humain et le long terme. Tu gagnes les coups, mais la stratégie d'ensemble et les liens te restent étrangers.

Avec le temps, quelque chose s'ouvre. Tu réalises que jouer pour durer vaut mieux que gagner chaque coup, que tenir compte des gens rend ton efficacité mieux acceptée, et que se projeter démultiplie ta tactique. Tu apprends à viser loin, à intégrer l'humain, à mettre ton agilité au service d'une vision, sans rien perdre de ta finesse. Dans ta pleine maturité, tu deviens un tacticien qui joue juste ET voit loin : vif et pragmatique, mais aussi stratège dans la durée et attentif aux gens. Et c'est entièrement à ta portée.`,
      etapes: [
        "Malin et observateur dès l'enfance, tu lis vite les situations, tu repères ce qui se passe et tu trouves comment t'en sortir. Le monde est un jeu où il y a toujours un bon coup à jouer.",
        "Ton sens tactique est à son comble : tu lis, tu calcules, tu saisis l'opportunité, tu joues le bon coup. C'est efficace, mais souvent déséquilibré : tu peux être court-termiste, prendre des risques et négliger l'humain. Une période où ta vivacité se révèle et cherche encore sa portée.",
        "Tu comprends que jouer pour durer vaut mieux que gagner chaque coup. Tu apprends à viser loin, à intégrer les gens et à mettre ton agilité au service d'une vision, sans rien perdre de ta finesse.",
        "Dans ta pleine maturité, tu es un tacticien qui joue juste et voit loin. Tu as gardé ton efficacité, mais tu sais désormais où mène la partie et tu prends soin des gens : la version la plus accomplie de toi.",
      ],
      leviersForts: [
        { titre: "Mets ta tactique au service d'une vision", texte: "C'est ton plus grand levier : apprends à viser loin et à penser la partie d'ensemble, pas seulement le coup d'après. Ta finesse devient redoutable quand elle sert une stratégie." },
        { titre: "Intègre l'humain dans tes calculs", texte: "Tiens compte des sentiments et des conséquences sur les gens : cela ne t'affaiblit pas, cela rend ton efficacité durable et mieux acceptée." },
        { titre: "Mesure tes prises de risque", texte: "Ton flair est une force ; calibre tes paris pour qu'ils restent payants plutôt que coûteux." },
        { titre: "Apprends à durer", texte: "Tiens au-delà de l'enjeu du moment et finis ce que tu commences : l'engagement transforme tes coups en accomplissements." },
      ],
      questions: [
        { situation: "Quand tu joues le coup d'après", question: "Est-ce que je vois aussi où mène la partie d'ensemble ?" },
        { situation: "Quand tu gères une situation", question: "Est-ce que je traite l'autre comme une personne, ou comme une pièce à jouer ?" },
        { situation: "Quand un pari t'attire", question: "Est-ce un risque calculé, ou un coup de trop ?" },
        { situation: "Quand l'enjeu retombe", question: "Est-ce que je tiens jusqu'au bout, ou je décroche par ennui ?" },
        { situation: "Quand une situation se présente", question: "Est-ce un coup à jouer, ou quelque chose à simplement ressentir ?" },
      ],
      paradoxe: {
        tension:
          "Pour remporter la partie, tu dois viser loin et intégrer les gens,\nmais tu crains qu'en ralentissant, tu perdes ton efficacité du présent.",
        lumiere:
          "Ton sens de l'opportunité, ton pragmatisme et ton agilité sont une force rare : tu as déjà tout ce qu'il faut pour voir juste et jouer juste.",
        ombre:
          "Mais sans vision ni attention à l'humain, ta finesse te limite au présent et passe à côté de ce qui se construit dans le temps.",
        bascule:
          "Le jour où tu vois la vision de fond non comme un frein mais comme ce qui démultiplie ta tactique, ton intelligence pratique construit loin.",
      },
    },
    // ----------------------------------------------------------------- V3 -----
    "ESTP-V3-relations": {
      forces: [
        { titre: "Une présence qui séduit", accent: "séduit", texte: "Tu sais créer de la complicité, apporter de l'énergie et du plaisir, et l'on se sent choisi à tes côtés." },
        { titre: "Une lecture des gens", accent: "lecture", texte: "Tu perçois vite les humeurs et ce qui touche l'autre, et tu sais exactement comment créer le contact." },
        { titre: "Une chaleur entraînante", accent: "chaleur", texte: "Le boute-en-train du groupe, tu crées l'ambiance, tu rassembles et tu mets de la vie partout." },
        { titre: "Une aisance partout", accent: "aisance", texte: "Avec tout le monde et dans toutes les situations, tu trouves ta place et tu crées le lien." },
        { titre: "Une loyauté sincère", accent: "loyauté", texte: "Sous ton charme, tu es capable d'un attachement réel une fois engagé pour de vrai." },
        { titre: "Une attention présente", accent: "attention", texte: "Quand tu t'y mets, tu offres une présence chaleureuse qui fait du bien à l'autre." },
      ],
      ombres: [
        { titre: "La recherche de l'effet", accent: "effet", texte: "Ton goût de séduire peut te faire chercher l'effet ou multiplier les conquêtes plutôt qu'approfondir." },
        { titre: "Le risque de surface", accent: "surface", texte: "Ton aisance peut te faire multiplier les contacts sans toujours aller en profondeur." },
        { titre: "La fuite de l'intimité", accent: "intimité", texte: "Ton aisance sociale peut masquer une difficulté avec les émotions plus intimes." },
        { titre: "Une impulsivité possible", accent: "impulsivité", texte: "Ton goût de l'instant et de la stimulation peut te faire foncer sans peser." },
        { titre: "La fuite de la routine", accent: "routine", texte: "Ton besoin de stimulation peut te faire t'ennuyer et fuir quand le quotidien s'installe." },
        { titre: "Le lien peu approfondi", accent: "approfondi", texte: "Ton large cercle peut cacher un manque de liens où tu te livres vraiment." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "La routine figée, sans énergie ni contact.",
            "Les liens froids ou distants.",
            "Le contrôle et la jalousie qui rognent ta liberté.",
            "Les personnes méfiantes du charme et fermées au contact.",
            "Les reproches qui brident ton besoin de séduire et d'animer.",
          ],
        },
        {
          ton: "positif",
          items: [
            "Une relation vivante, complice et pleine d'énergie.",
            "Un partenaire qui répond à ton énergie et sait te suivre.",
            "Du contact, du mouvement et de la stimulation.",
            "Quelques liens vrais où tu peux te montrer au-delà du charme.",
            "Quelqu'un qui t'ouvre à des liens sincères.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Les tempéraments très réservés et méfiants du charme.",
            "Les profils très demandeurs d'intimité émotionnelle.",
            "Les personnalités contrôlantes qui rognent ta liberté.",
          ],
          profils: [
            { code: "ISTJ", raison: "sa réserve et sa méfiance du charme peuvent se heurter à ton aisance sociale." },
            { code: "INFJ", raison: "sa grande demande d'intimité émotionnelle peut trouver ton charme trop de surface." },
            { code: "INTP", raison: "son détachement peut rendre ton besoin de séduire et d'animer envahissant à ses yeux." },
          ],
        },
        {
          ton: "positif",
          items: [
            "Les tempéraments vivants, sociables et énergiques.",
            "Les profils plus profonds qui t'aident à aller vers le vrai.",
            "Les plus tournés vers l'avenir qui t'aident à te projeter.",
          ],
          profils: [
            { code: "ESFP", raison: "il répond à ton charme et partage ton goût du contact et de l'énergie." },
            { code: "ENFJ", raison: "sa chaleur rejoint la tienne et t'invite à aller vers des liens plus profonds." },
            { code: "ISFJ", raison: "sa profondeur tranquille t'ancre et t'ouvre à des connexions sincères." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Ton charme te rend magnétique et entraînant dans tes liens,\nmais à rester à la surface, tu peux séduire le monde et te sentir seul dans le vrai.",
        lumiere:
          "Ton magnétisme, ta lecture des gens et ta chaleur font de toi un partenaire et un ami auprès de qui on se sent vivant et choisi.",
        ombre:
          "Mais à chercher l'effet, à multiplier les contacts sans profondeur et à fuir l'intimité, tu peux passer à côté des liens vrais que tu mérites.",
        bascule:
          "Le jour où tu approfondis au lieu de seulement séduire et où tu te montres vraiment, ton charme devient une porte vers des liens authentiques.",
      },
    },
    "ESTP-V3-carriere": {
      forces: [
        { titre: "Un vrai charisme", accent: "charisme", texte: "Tu attires, tu convaincs, tu marques les gens par ta présence, et tu donnes envie de te suivre." },
        { titre: "Une aisance relationnelle", accent: "aisance", texte: "Tu crées le lien avec tout le monde, un atout dans un monde où tout passe par le contact." },
        { titre: "Un don pour entraîner", accent: "entraîner", texte: "Tu sais rallier, motiver et embarquer les gens, et mettre de l'énergie dans une équipe." },
        { titre: "Une lecture rapide des gens", accent: "lecture", texte: "Tu perçois ce qui touche, ce qui rallie, ce qui passe bien, ce qui est précieux dans tout métier relationnel." },
        { titre: "Une vivacité adaptable", accent: "vivacité", texte: "Tu réagis vite, tu improvises et tu ajustes ton approche à chaque public et chaque situation." },
        { titre: "Une énergie communicative", accent: "énergie", texte: "Ton dynamisme rend les choses excitantes et donne aux autres l'envie de s'engager." },
      ],
      ombres: [
        { titre: "Le risque de surface", accent: "surface", texte: "Tu peux rester en surface et chercher l'effet plutôt que de bâtir des relations durables." },
        { titre: "La recherche de l'effet", accent: "effet", texte: "Le souci de plaire peut parfois primer sur le fond de tes décisions." },
        { titre: "Du mal à te projeter", accent: "projeter", texte: "La planification et la vision à long terme ne sont pas ton terrain naturel." },
        { titre: "Un ennui qui décroche", accent: "ennui", texte: "Tu peux lâcher dans l'isolement, la routine ou l'abstraction qui te démotivent." },
        { titre: "Une impulsivité possible", accent: "impulsivité", texte: "Ton goût de l'instant peut te faire agir et décider sans toujours peser." },
        { titre: "Un rapport généreux à l'argent", accent: "argent", texte: "Tu peux dépenser pour le contact, le plaisir et l'image, au détriment de la projection." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "L'isolement et le travail solitaire.",
            "La routine et les tâches répétitives.",
            "Le travail purement abstrait et théorique.",
            "Les environnements froids et impersonnels.",
            "Le cadre rigide sans place pour le contact.",
          ],
        },
        {
          ton: "positif",
          items: [
            "Du contact humain et de l'interaction.",
            "Des occasions de convaincre, d'entraîner et d'animer.",
            "De l'enjeu, du mouvement et de la liberté.",
            "Des occasions de briller et de créer du lien.",
            "Pouvoir séduire, rallier et mettre de l'énergie.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Le travail isolé et sans contact humain.",
            "Les postes routiniers et procéduriers.",
            "Le travail théorique et impersonnel.",
          ],
          profils: [
            { nom: "Travail solitaire et répétitif", raison: "ni contact ni public pour faire jouer ton charme." },
            { nom: "Postes très procéduraux", raison: "la routine et la rigidité éteignent ton aisance sociale." },
            { nom: "Travail théorique et abstrait", raison: "ni relation ni mouvement pour te révéler." },
          ],
        },
        {
          ton: "positif",
          items: [
            "La vente, le commerce et la négociation.",
            "La communication et les relations publiques.",
            "L'animation et l'entrepreneuriat de contact.",
          ],
          profils: [
            { nom: "Vente & négociation", raison: "convaincre et rallier par le charme et l'aisance." },
            { nom: "Communication & relations publiques", raison: "créer du lien et de l'influence auprès des gens." },
            { nom: "Animation & entrepreneuriat", raison: "entraîner, animer et mettre de l'énergie dans un projet." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Ton charisme fait de toi un meneur naturel par le charme,\nmais à rester en surface, tu peux séduire sans bâtir de relations durables.",
        lumiere:
          "Magnétique, vif et plein d'aisance, tu convaincs, tu entraînes et tu crées du lien partout où tu passes.",
        ombre:
          "Mais à chercher l'effet et à négliger la projection, tu peux laisser ton talent sans portée durable.",
        bascule:
          "Le jour où tu bâtis des relations sincères et où tu vises loin, ton magnétisme se transforme en réussites qui durent.",
      },
    },
    "ESTP-V3-developpement": {
      evolution: `Ta personnalité n'est pas figée : elle mûrit, et ton type suit une trajectoire de croissance assez nette. Plus jeune, tu es surtout porté par ton charme et ton goût du contact : séduire, entraîner, plaire, animer. C'est magnétique, mais souvent déséquilibré : tu peux chercher l'effet pour lui-même, rester en surface, multiplier les contacts sans profondeur, être impulsif et fuir l'intimité émotionnelle. Tu séduis tout le monde, mais le vrai et le durable te restent étrangers.

Avec le temps, quelque chose s'ouvre. Tu réalises que le charme n'a de valeur que s'il ouvre sur du vrai, qu'approfondir vaut mieux que multiplier, et que se montrer sincèrement crée des liens que la séduction seule ne donne pas. Tu apprends à aller en profondeur, à mettre ton charme au service de connexions sincères, à te projeter, sans rien perdre de ton magnétisme. Dans ta pleine maturité, tu deviens un charmeur dont l'aisance ouvre sur du vrai : magnétique et entraînant, mais aussi capable de liens profonds et sincères. Et c'est entièrement à ta portée.`,
      etapes: [
        "Sociable et magnétique dès l'enfance, tu crées le contact, tu fais rire, tu rallies les autres autour de toi. Tu te sens vivant entouré, au centre de l'attention.",
        "Ton charme est à son comble : tu séduis, tu entraînes, tu animes, tu plais partout. C'est magnétique, mais souvent déséquilibré : tu peux chercher l'effet, rester en surface et fuir l'intimité. Une période où ton charisme se révèle et te tient parfois à la surface des liens.",
        "Tu comprends que le charme n'a de valeur que s'il ouvre sur du vrai. Tu apprends à approfondir, à mettre ton magnétisme au service de liens sincères et à te montrer vraiment, sans rien perdre de ton aisance.",
        "Dans ta pleine maturité, tu es un charmeur dont l'aisance ouvre sur du vrai. Tu as gardé ton magnétisme, mais tu sais désormais créer des liens profonds et sincères : la version la plus accomplie de toi.",
      ],
      leviersForts: [
        { titre: "Mets ton charme au service du vrai", texte: "C'est ton plus grand levier : utilise ton magnétisme pour créer des liens sincères, pas seulement pour plaire ou obtenir. Ton charme devient alors une force qui relie vraiment." },
        { titre: "Approfondis tes liens", texte: "Au-delà de ton grand cercle, cultive quelques relations profondes où tu te montres vraiment. C'est là que se trouve ce que le charme seul ne donne pas." },
        { titre: "Montre-toi vraiment", texte: "Ose aller au-delà du jeu social, vers l'intimité émotionnelle. Te livrer sincèrement crée des connexions que la séduction ne permet pas." },
        { titre: "Apprends à te projeter", texte: "Te fixer un cap au-delà de l'instant, sans renier ton aisance, transforme ton énergie en accomplissements durables." },
      ],
      questions: [
        { situation: "Quand tu cherches à plaire", question: "Est-ce que je relie vraiment, ou je cherche l'effet pour lui-même ?" },
        { situation: "Quand tu multiplies les contacts", question: "Est-ce que je cultive aussi quelques liens vraiment profonds ?" },
        { situation: "Quand une émotion intime monte", question: "Est-ce que je me montre vraiment, ou je masque derrière le charme ?" },
        { situation: "Quand ton goût de l'instant te pousse", question: "Est-ce que je pèse, ou je fonce sans réfléchir ?" },
        { situation: "Quand tu séduis tout le monde", question: "Avec qui puis-je me laisser vraiment connaître ?" },
      ],
      paradoxe: {
        tension:
          "Pour toucher vraiment les gens, ton charme doit ouvrir sur du vrai,\nmais tu as pris l'habitude de séduire et de rester en surface.",
        lumiere:
          "Ton magnétisme, ta lecture des gens et ton énergie sont une force rare : tu as déjà tout ce qu'il faut pour créer du lien partout.",
        ombre:
          "Mais sans profondeur ni sincérité, ton charme reste un jeu de surface qui te laisse seul dans le vrai.",
        bascule:
          "Le jour où ton charme devient une porte vers de vraies connexions et où tu te laisses vraiment connaître, tu ne fais plus que plaire : tu touches les gens.",
      },
    },
  },
};

export default estp;
