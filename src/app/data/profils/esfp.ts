// =============================================================================
// CONTENU DU PROFIL ESFP (« Amuseur »), 3 variantes.
// V1 Animateur · V2 Cœur Généreux · V3 Esthète Vivant.
// Source : rapports longs rapport_long_ESFP_V1/V2/V3.md.
// Même forme que les entrées de profils.ts (INFP / ENFP) et que enfj.ts.
// Voix « tu », aucun tiret long, mot-clé en vert via le champ "accent".
// =============================================================================

const esfp = {
  // Texte commun aux 3 variantes (sous les barres du spectre). 2 paragraphes.
  traitsTexte: {
    ESFP: `Ton esprit est tourné vers le présent, le concret et les gens. Ta fonction reine, c'est ta perception intense de l'expérience immédiate : ce goût des sensations, de l'instant, de l'ambiance, cette énergie qui te pousse à vivre et à faire vivre le moment. Tu es intensément ancré dans le présent et le monde sensible, tu vis par les sens, l'expérience, le partage, et tu perçois finement les ambiances pour les rendre vivantes. Tu n'attends pas que la vie soit belle, tu la rends belle, ici et maintenant.

Juste derrière vient ta boussole de valeurs chaleureuses : ce cœur qui aime les gens, qui tient à la sincérité, qui donne de la profondeur à ta joie. Elle empêche ton énergie d'être superficielle, tu vas vers les autres par amour du lien, pas pour l'effet. Plus en profondeur sommeillent deux forces que tu développes avec le temps, ta capacité d'organisation et ton intuition sur le long terme. Tout l'enjeu de ton chemin, c'est d'apprendre à te projeter et à structurer un peu, pour donner à ta belle énergie une direction qui dure.`,
  },

  // 1 phrase par variante, affichée au survol des barres.
  descriptions: {
    "ESFP-V1":
      "Les Animateurs sont les plus tournés vers l'ambiance et l'énergie de groupe. Ils font vivre l'instant, mettent de la joie partout où ils passent et transforment un moment ordinaire en souvenir.",
    "ESFP-V2":
      "Les Cœurs Généreux sont les plus tournés vers le soin et la fidélité aux gens. Sous leur joie bat un cœur immense, des valeurs profondes et une générosité qui se voit dans les actes.",
    "ESFP-V3":
      "Les Esthètes Vivants sont les plus sensibles au beau et à l'art de vivre. Ils ont l'œil pour le style, savent sublimer le présent et transforment l'ordinaire en quelque chose de précieux.",
  },

  // 1 phrase d'accroche (héros) par variante.
  accroches: {
    "ESFP-V1": "Tu n'attends pas que la fête commence, tu es la fête.",
    "ESFP-V2": "Tu ne fais pas que mettre de l'ambiance, ta joie est faite d'amour pour les gens.",
    "ESFP-V3": "Tu ne traverses pas les lieux, tu fais de chaque instant quelque chose de beau.",
  },

  // ~2 paragraphes sous le héros (« Ton portrait »).
  intros: {
    "ESFP-V1": `En tant qu'Amuseur (ESFP), variante Animateur, tu possèdes la joie de vivre et la chaleur de ta famille d'âme, et ce qui te définit avant tout, c'est l'énergie, l'ambiance et le goût de l'expérience partagée. Là où le Cœur Généreux se définit d'abord par la profondeur de ses valeurs et l'Esthète Vivant par sa sensibilité au beau, toi tu te définis d'abord par cette capacité à faire vivre l'instant et à entraîner les autres dans ta joie. Dès que tu entres quelque part, l'énergie change.

Ce qui te porte, c'est la joie partagée et l'instant pleinement vécu. Tu aimes les gens, les moments partagés, l'ambiance que tu sais créer, et tu tires une vraie satisfaction de voir les autres heureux autour de toi. Ton goût de l'ambiance n'est pas qu'en surface, il s'appuie sur une vraie générosité et une attention sincère. Cette même énergie a son revers, elle peut te rendre impulsif et te faire négliger l'avenir. Ton plus beau terrain de croissance sera d'apprendre à te projeter sans rien perdre de ta joie.`,

    "ESFP-V2": `En tant qu'Amuseur (ESFP), variante Cœur Généreux, tu possèdes la joie de vivre et la chaleur de ta famille d'âme, mais ce qui te définit avant tout, c'est la profondeur de tes valeurs et la sincérité de ton attachement aux gens. Là où l'Animateur se définit d'abord par l'ambiance et l'énergie de groupe et l'Esthète Vivant par sa sensibilité au beau, toi tu te définis d'abord par ton cœur, ta générosité, ta fidélité. Sous ta chaleur, il y a un cœur immense et des convictions sincères.

Ce qui te porte, c'est l'amour des gens et la fidélité à ce qui compte. Tu donnes sans compter, tu remarques celui qui ne va pas, tu es l'ami sur qui on peut vraiment compter, et le lien sincère te nourrit autant que la joie de l'instant. Ta joie n'est pas qu'une ambiance, c'est de la générosité en mouvement. Cette même générosité a son revers, tu peux te blesser au moindre heurt de tes valeurs et t'oublier à force de donner. Ton plus beau terrain de croissance sera d'apprendre à donner sans t'oublier.`,

    "ESFP-V3": `En tant qu'Amuseur (ESFP), variante Esthète Vivant, tu possèdes la joie de vivre et la chaleur de ta famille d'âme, mais ce qui te définit avant tout, c'est ta sensibilité au beau et ton art de vivre. Là où l'Animateur se définit par l'ambiance et l'énergie de groupe et le Cœur Généreux par la profondeur de ses valeurs, toi tu te définis d'abord par ton goût du beau, le style, l'esthétique, l'art de sublimer le présent. Tu as l'œil pour le beau et le sens de l'art de vivre.

Ce qui te porte, c'est la beauté saisie et l'instant sublimé. Tu ne te contentes pas de vivre le moment, tu le rends beau, tu soignes l'esthétique, tu profites pleinement de ce qui est agréable et raffiné. Ton énergie ne va pas qu'à la fête, elle va au raffinement et à l'art de profiter avec goût. Cette même sensibilité a son revers, ton attrait pour l'agréable peut te faire fuir ce qui pèse et négliger l'avenir. Ton plus beau terrain de croissance sera d'apprendre à inscrire la beauté dans la durée.`,
  },

  // ~2 paragraphes sous les barres de variante (« Ta variante »).
  texteVariante: {
    "ESFP-V1": `Parmi les trois façons d'être de l'Amuseur, tu es le plus tourné vers l'ambiance, l'expérience et l'énergie de groupe. Tu n'es pas avant tout le Cœur Généreux centré sur ses valeurs, ni l'Esthète Vivant tourné vers le beau, ce qui te met en mouvement, c'est de faire vivre l'instant, d'animer, d'entraîner les autres dans ta joie. Mettre de l'ambiance, créer de bons moments, faire vivre le présent te comble plus que tout.

Cette combinaison, l'énergie, la chaleur et la spontanéité, fait de toi la lumière de la soirée, celui qui fait que l'instant devient un souvenir. Ta présence transforme une journée, un groupe, un moment ordinaire. Le revers, c'est que ton goût de l'instant peut te rendre impulsif et te faire négliger ce qui se construit dans la durée. Ton plus beau chemin de croissance sera d'apprendre à bâtir une vie à la hauteur de ta joie.`,

    "ESFP-V2": `Parmi les trois façons d'être de l'Amuseur, tu es le plus tourné vers le soin, l'authenticité et la fidélité aux gens. Tu n'es pas avant tout l'Animateur centré sur l'ambiance, ni l'Esthète Vivant tourné vers le beau, ce qui te caractérise, c'est ton cœur, ta générosité, la profondeur de tes valeurs sous la joie apparente. Aimer les gens, être là pour eux, agir selon tes valeurs, rester fidèle te comble plus que tout.

Cette combinaison, la chaleur, la sensibilité et la générosité, fait de toi l'ami fidèle au grand cœur, celui dont la joie est faite d'amour. Ta présence réchauffe parce qu'elle est sincère, et ta générosité laisse une trace durable dans le cœur des gens. Le revers, c'est que tu peux trop donner, t'oublier et te blesser au moindre heurt de tes valeurs. Ton plus beau chemin de croissance sera d'apprendre à t'inclure dans l'amour que tu donnes.`,

    "ESFP-V3": `Parmi les trois façons d'être de l'Amuseur, tu es le plus tourné vers la beauté et l'expression sensible. Tu n'es pas avant tout l'Animateur centré sur l'ambiance, ni le Cœur Généreux centré sur ses valeurs, ce qui te caractérise, c'est ton goût du beau, du style, de l'art de vivre. Voir et créer du beau, soigner le style, sublimer le présent, savourer ce qui est raffiné te comble plus que tout.

Cette combinaison, la vivacité, la sensibilité au beau et la spontanéité, fait de toi l'amoureux du beau qui sublime chaque instant. Là où d'autres voient du banal, tu vois et tu crées de la beauté, et ta présence embellit la vie. Le revers, c'est que ton attrait pour l'agréable peut te faire fuir ce qui pèse et négliger ce qui se construit lentement. Ton plus beau chemin de croissance sera d'apprendre à inscrire la beauté dans la durée.`,
  },

  // Détail de variante : 6 forces, 6 ombres, paradoxe.
  varianteDetail: {
    "ESFP-V1": {
      forces: [
        { titre: "Un don pour animer", accent: "animer", texte: "Ton énergie est communicative, tu mets de l'ambiance, tu rends les moments vivants et tu entraînes les autres dans ta joie." },
        { titre: "Le talent de créer du lien", accent: "lien", texte: "Tu vas vers les gens avec aisance, tu les mets à l'aise et tu rassembles, et autour de toi on se sent bien." },
        { titre: "Une présence à l'instant", accent: "présence", texte: "Tu as ce don rare de te donner entièrement au moment, de savourer et de te sentir vivant ici et maintenant." },
        { titre: "Une générosité chaleureuse", accent: "générosité", texte: "Tu donnes sans compter, tu te soucies vraiment des gens et ton animation réchauffe parce qu'elle est sincère." },
        { titre: "Une vraie spontanéité", accent: "spontanéité", texte: "Tu saisis ce qui se présente, tu rebondis, tu crées de la joie là où elle ne s'annonçait pas." },
        { titre: "Une joie communicative", accent: "joie", texte: "Tu rappelles à chacun que la vie se vit maintenant, et ta lumière transforme l'ordinaire en souvenir." },
      ],
      ombres: [
        { titre: "Une impulsivité possible", accent: "impulsivité", texte: "Ton goût de l'instant peut te faire saisir le plaisir immédiat sans penser aux conséquences." },
        { titre: "Du mal à te projeter", accent: "projeter", texte: "Ton ancrage dans le présent peut te rendre difficile la planification et la projection à long terme." },
        { titre: "La fuite de ce qui pèse", accent: "fuite", texte: "Ton besoin de joie et de légèreté peut te faire éviter la routine, les contraintes et les sujets difficiles." },
        { titre: "La dépendance à la validation", accent: "validation", texte: "Ton attention aux autres et ton goût de plaire peuvent te rendre trop sensible à leur regard." },
        { titre: "Une difficulté à durer", accent: "durer", texte: "L'élan te porte, mais tenir au-delà de l'enthousiasme du début te coûte davantage." },
        { titre: "Le risque de dispersion", accent: "dispersion", texte: "Tu peux illuminer mille instants et passer à côté de ce qui se bâtit lentement." },
      ],
      paradoxe: {
        tension:
          "Ta joie de vivre illumine l'instant,\nmais elle peut t'empêcher de te projeter et d'affronter ce qui se construit dans la durée.",
        lumiere:
          "Ton énergie, ta chaleur et ta capacité à vivre l'instant sont des cadeaux immenses, tu animes, tu réchauffes, tu rends la vie belle pour toi et pour les autres.",
        ombre:
          "Mais poussées trop loin, ces mêmes qualités peuvent te conduire à l'impulsivité, à fuir ce qui demande de durer et à négliger l'avenir.",
        bascule:
          "Le jour où tu apprends à te projeter sans renier ton goût de l'instant et à construire pour demain tout en vivant aujourd'hui, ta joie cesse de te disperser pour devenir une force qui éclaire aussi le long terme.",
      },
    },
    "ESFP-V2": {
      forces: [
        { titre: "Une générosité profonde", accent: "générosité", texte: "Tu donnes sans compter, tu te soucies vraiment des gens et ton amour se voit dans les actes." },
        { titre: "Des valeurs profondes", accent: "valeurs", texte: "Sous ta joie, il y a des convictions sincères et un sens de ce qui est juste qui donnent du poids à ta chaleur." },
        { titre: "Une chaleur qui réchauffe", accent: "chaleur", texte: "Ta présence est sincère et réconfortante, et tu offres aux gens une joie qui les touche parce qu'elle vient du cœur." },
        { titre: "Une fidélité sincère", accent: "fidélité", texte: "Une fois que tu aimes, tu es là, loyal et présent dans la durée comme dans les coups durs." },
        { titre: "Une présence vivante", accent: "présence", texte: "Tu te donnes à l'instant et tu y entraînes les autres avec chaleur, et les gens se sentent aimés auprès de toi." },
        { titre: "Une sensibilité au cœur", accent: "sensibilité", texte: "Tu ressens profondément et tu remarques celui qui ne va pas, ce qui fait de toi un soutien rare et vrai." },
      ],
      ombres: [
        { titre: "Une hypersensibilité", accent: "hypersensibilité", texte: "Quand tes valeurs sont heurtées ou qu'on te blesse, tu le ressens intensément, parfois douloureusement." },
        { titre: "L'oubli de toi", accent: "oubli", texte: "Ta générosité peut te faire trop donner et négliger tes propres besoins jusqu'à l'épuisement." },
        { titre: "Du mal à te projeter", accent: "projeter", texte: "Ton ancrage dans le présent peut te rendre difficile la planification et l'action à long terme." },
        { titre: "La fuite de ce qui pèse", accent: "fuite", texte: "Ton besoin de joie et d'harmonie peut te faire éviter les sujets difficiles et les contraintes." },
        { titre: "L'attente de réciprocité", accent: "réciprocité", texte: "Tu donnes tant que tu peux attendre en silence une reconnaissance que tu n'oses pas réclamer." },
        { titre: "La difficulté à recevoir", accent: "recevoir", texte: "Tu prends soin de tous, mais tu acceptes mal qu'on prenne soin de toi en retour." },
      ],
      paradoxe: {
        tension:
          "Ta générosité et ta profondeur de cœur font toute ta richesse,\nmais elles peuvent te faire t'oublier et te blesser pour les autres.",
        lumiere:
          "Ta chaleur, ta générosité et ta fidélité sont des cadeaux immenses, tu aimes vraiment, tu donnes, tu réchauffes.",
        ombre:
          "Mais poussées trop loin, ces mêmes qualités peuvent te conduire à trop donner, à t'oublier et à te blesser au moindre heurt de tes valeurs.",
        bascule:
          "Le jour où tu apprends à donner sans t'oublier et à prendre soin de toi autant que des autres, ta générosité cesse de te coûter pour devenir un don sain et durable.",
      },
    },
    "ESFP-V3": {
      forces: [
        { titre: "Le don de créer le beau", accent: "beau", texte: "Tu as l'œil pour ce qui est beau, le sens du style et le goût du raffinement, et tu transformes l'ordinaire en quelque chose de précieux." },
        { titre: "Une présence à l'instant", accent: "présence", texte: "Tu te donnes au moment, tu savoures, et ton goût du beau te fait profiter de la vie avec une plénitude rare." },
        { titre: "L'art de sublimer", accent: "sublimer", texte: "Là où d'autres voient du banal, tu vois et tu crées de la beauté, une ambiance soignée, un détail élégant, un moment mémorable." },
        { titre: "Un cœur sincère", accent: "cœur", texte: "Sous ton goût du beau, il y a de vraies valeurs, et cette profondeur fait que ton esthétique touche au lieu d'être une pose." },
        { titre: "Une vraie spontanéité", accent: "spontanéité", texte: "Tu saisis ce qui se présente, tu rebondis et tu crées du beau et de l'agréable dans tout contexte." },
        { titre: "Une sensibilité fine", accent: "sensibilité", texte: "Tu perçois les textures, les couleurs et les ambiances, et tu rends le présent non seulement vivant, mais beau." },
      ],
      ombres: [
        { titre: "L'attrait du plaisir immédiat", accent: "plaisir", texte: "Ton goût de l'agréable peut te faire privilégier le plaisir du moment au détriment du reste." },
        { titre: "Du mal à te projeter", accent: "projeter", texte: "Ton ancrage dans le présent peut te rendre difficile la planification et l'action à long terme." },
        { titre: "Une impulsivité possible", accent: "impulsivité", texte: "Ton goût de l'instant peut te faire saisir ce qui se présente sans penser aux conséquences." },
        { titre: "Une sensibilité à la critique", accent: "critique", texte: "Tu peux vivre douloureusement un jugement, surtout sur ce qui touche à ton goût ou à ce que tu crées." },
        { titre: "La fuite de l'effort", accent: "effort", texte: "Tu peux éviter ce qui est moins gratifiant et passer à côté de ce qui demande de la constance." },
        { titre: "Le risque de dispersion", accent: "dispersion", texte: "Tu peux faire de chaque instant quelque chose de beau et passer à côté de ce qui se construit lentement." },
      ],
      paradoxe: {
        tension:
          "Ton goût du beau et de l'instant rend ta vie si riche,\nmais il peut t'empêcher de te projeter et d'affronter ce qui est moins plaisant.",
        lumiere:
          "Ta sensibilité esthétique, ta présence à l'instant et ton art de vivre sont des cadeaux immenses, tu vois le beau, tu le crées, tu sublimes le présent.",
        ombre:
          "Mais poussées trop loin, ces mêmes qualités peuvent te conduire à chercher le plaisir immédiat, à fuir ce qui pèse et à négliger l'avenir.",
        bascule:
          "Le jour où tu apprends à te projeter sans renier ton goût de l'instant et à construire pour demain tout en savourant aujourd'hui, ton goût du beau devient une force qui embellit aussi le long terme.",
      },
    },
  },

  // ~2 paragraphes (« En amour » / « En amitié »).
  relationsTexte: {
    "ESFP-V1": `En amour, tu es chaleureux, fun et généreux. Tu apportes de la joie, de la spontanéité, de l'attention, et tu rends la relation vivante et affectueuse. Tu exprimes ton amour par les gestes, les expériences partagées, la présence chaleureuse, et être aimé par toi, c'est vivre des moments, rire et se sentir choyé. En amitié, tu es souvent le boute-en-train, celui qui propose, qui rassemble, qui met l'ambiance, avec un large cercle et une chaleur qui font que les gens t'adorent.

Tes défis sont les revers de ta nature. Ton goût de la stimulation peut te faire fuir la routine et les conversations lourdes, ton impulsivité te faire négliger les conséquences, et ta difficulté à te projeter compliquer les projets à deux. Ton chemin, c'est d'apprendre à trouver de la joie aussi dans la durée et le quotidien, à affronter ce qui doit l'être, et à être là dans les temps calmes comme dans les coups durs. Quand tu y arrives, tu offres une relation d'une chaleur et d'une vivacité rares.`,

    "ESFP-V2": `En amour, tu es chaleureux, généreux et profondément sincère. Tu aimes avec tout ton cœur, tu prends soin, tu donnes sans compter, et être aimé par toi, c'est se sentir profondément aimé, choyé, accompagné par quelqu'un de fidèle et de vrai. En amitié, tu es l'ami fidèle et généreux, celui qui est là dans la joie comme dans les coups durs, qui donne et qui soutient avec sincérité, et tes amis savent qu'avec toi, ils ont quelqu'un de vrai.

Tes défis sont les revers de ta nature. Ton hypersensibilité peut te faire vivre les tensions douloureusement, ton don de toi te faire t'oublier et attendre une reconnaissance que tu n'oses pas réclamer, et ta difficulté à te projeter compliquer les projets à deux. Ton chemin, c'est d'apprendre à donner sans t'oublier, à recevoir, à poser des limites et à ne pas tout prendre de plein fouet. Quand tu y arrives, tu offres une relation d'une chaleur et d'une fidélité rares.`,

    "ESFP-V3": `En amour, tu es chaleureux, raffiné et attentionné. Tu apportes de la beauté, du soin, des moments soignés et mémorables, tu exprimes ton amour par les gestes élégants et la création de beaux instants partagés, et être aimé par toi, c'est vivre une relation où le beau et le plaisir partagé ont leur place. En amitié, tu es celui qui apporte du beau et du plaisir partagé, qui soigne les moments, qui a le sens des belles occasions, et tes amis aiment vivre de beaux moments avec toi.

Tes défis sont les revers de ta nature. Ton goût du plaisir peut te faire fuir la routine et les aspects moins reluisants du quotidien, ta difficulté à te projeter compliquer les projets à deux, et ta sensibilité te faire vivre les heurts douloureusement. Ton chemin, c'est d'apprendre à aimer aussi le quotidien moins reluisant, à te projeter, à être là dans les temps difficiles et à ne pas tout prendre de plein fouet. Quand tu y arrives, tu offres une relation d'une beauté et d'une chaleur rares.`,
  },

  // ~2 paragraphes (« Ta carrière » / « Ta façon de travailler »).
  proTexte: {
    "ESFP-V1": `Au travail, tu es à ton aise dans les métiers de contact, d'expérience et de créativité, où ton énergie et ta chaleur font la différence. Une carrière qui te convient te met au contact des gens, te permet d'animer et de créer de bons moments, dans la variété et le mouvement. Tu t'éteins dans la routine, l'isolement et l'abstraction, et tu te révèles dans tout ce qui est vivant et social, l'événementiel, l'animation, les arts du spectacle, la vente, l'hôtellerie, le tourisme, les métiers de contact. Tu mets de la vie dans une équipe et tu crées une bonne ambiance.

Ce qui t'éteint, ce sont la routine, la bureaucratie, l'isolement et la théorie abstraite. Ton principal défi touche à la projection et à la constance, ton énergie et ton sens du contact sont rarement en cause, ce qui peut te coûter, c'est l'impulsivité, la difficulté à structurer et à te projeter, et l'ennui face à ce qui dure. Apprendre à te fixer un cap, à structurer un peu et à tenir au-delà de l'élan donne toute sa portée à ta belle énergie.`,

    "ESFP-V2": `Au travail, tu es à ton aise dans les métiers de contact et de soin, où ta chaleur et ta générosité font la différence et où tu peux aider et créer du lien. Une carrière qui te convient te met au contact des gens, te permet de prendre soin et d'apporter de la joie, dans un cadre humain. Tu t'éteins dans l'isolement, la froideur et l'abstraction, et tu te révèles dans tout ce qui touche au contact humain et au soin, les métiers d'aide, la santé, l'accueil, l'éducation, l'animation, la vente relationnelle. Tu apportes une vraie dimension humaine et tu prends soin de l'ambiance.

Ce qui t'éteint, ce sont la froideur, l'isolement et l'abstraction. Ton principal défi touche à l'équilibre et à la projection, ta chaleur et ton dévouement sont rarement en cause, ce qui peut te coûter, c'est de trop t'oublier, l'hypersensibilité et la difficulté à structurer et à te projeter. Apprendre à te préserver, à ne pas tout prendre personnellement et à te projeter garde ta générosité du côté de l'atout plutôt que de l'épuisement.`,

    "ESFP-V3": `Au travail, tu es à ton aise dans les métiers où le beau, le style et la sensibilité ont leur place, au contact des gens et dans le concret. Une carrière qui te convient te permet d'exprimer ton goût du beau et de créer de l'agréable, dans un cadre vivant et créatif. Tu t'éteins dans la routine froide et l'abstraction, et tu te révèles dans tout ce qui touche à l'esthétique et à l'art de vivre, la mode, le design, les arts, la décoration, l'hôtellerie, l'événementiel, la gastronomie, les métiers de l'image et du style. Tu apportes une attention à l'esthétique et une touche qui embellit ce que tu fais.

Ce qui t'éteint, ce sont la routine, la bureaucratie et l'austérité. Ton principal défi touche à la projection et à la constance, ton goût et ta sensibilité sont rarement en cause, ce qui peut te coûter, c'est l'attrait du plaisir immédiat, la difficulté à structurer et à te projeter, et la sensibilité à la critique. Apprendre à te fixer un cap, à structurer un peu et à affronter les aspects moins plaisants donne toute sa portée à ton talent.`,
  },

  // 1 paragraphe d'accroche (intro de « Ton chemin de croissance »).
  mindsetTexte: {
    "ESFP-V1": {
      apercu: `Ton plus grand chantier n'est pas de mettre de la vie autour de toi, ça déborde, c'est d'apprendre à construire une vie à la hauteur de ta joie. Tu portes une énergie et une chaleur rares, mais aussi une tendance qui peut se retourner contre toi, l'impulsivité, la fuite de ce qui pèse, la difficulté à te projeter, la dépendance au regard des autres. La bonne nouvelle, c'est que ces fragilités sont aussi tes plus grands leviers de croissance, à condition de savoir où appuyer.`,
    },
    "ESFP-V2": {
      apercu: `Ton plus grand chantier n'est pas d'aimer les gens, ton cœur en déborde, c'est d'apprendre à t'inclure dans l'amour que tu donnes. Tu portes en toi une générosité et une profondeur de cœur rares, mais aussi une tendance à t'oublier, à te blesser au moindre heurt de tes valeurs, à fuir ce qui pèse. La bonne nouvelle, c'est que ces fragilités sont aussi tes plus grands leviers de croissance, à condition de savoir où appuyer.`,
    },
    "ESFP-V3": {
      apercu: `Ton plus grand chantier n'est pas de voir le beau, ton œil le trouve partout, c'est d'apprendre à inscrire la beauté dans la durée. Tu portes en toi une sensibilité au beau et un art de vivre rares, mais aussi une tendance à chercher le plaisir immédiat, à fuir l'effort moins gratifiant, à mal vivre la critique. La bonne nouvelle, c'est que ces fragilités sont aussi tes plus grands leviers de croissance, à condition de savoir où appuyer.`,
    },
  },

  // Détail enrichi des grandes sections (relations, carriere, developpement) par variante.
  sectionDetail: {
    // ----------------------------------------------------------------- V1 -----
    "ESFP-V1-relations": {
      forces: [
        { titre: "Une présence qui fait vibrer", accent: "vibrer", texte: "Avec toi, le quotidien s'illumine, tu apportes de la joie, de la spontanéité et le sentiment d'une vie à savourer." },
        { titre: "Le don de rassembler", accent: "rassembler", texte: "Tu vas vers les gens avec aisance, tu les mets à l'aise et tu crées du lien et de bons moments partagés." },
        { titre: "Une chaleur généreuse", accent: "chaleur", texte: "Ta présence chaleureuse fait que les autres se sentent bien, choyés et entourés de ta lumière." },
        { titre: "Une attention sincère", accent: "attention", texte: "Sous l'ambiance, tu te soucies vraiment des gens et tu offres ta présence dans les coups durs." },
        { titre: "Une spontanéité joyeuse", accent: "spontanéité", texte: "Tu proposes, tu improvises, tu crées de la joie là où on ne l'attendait pas." },
        { titre: "Une générosité qui se voit", accent: "générosité", texte: "Tu donnes de ton temps et de ton énergie, et auprès de toi on se sent vivant et aimé." },
      ],
      ombres: [
        { titre: "La fuite de la routine", accent: "routine", texte: "Ton goût de la stimulation peut te faire fuir le quotidien et les conversations lourdes." },
        { titre: "Une impulsivité possible", accent: "impulsivité", texte: "Ton goût de l'instant peut te faire agir sans penser aux conséquences pour le lien." },
        { titre: "Du mal à te projeter", accent: "projeter", texte: "Ta difficulté à penser à demain peut compliquer les projets à deux et l'engagement durable." },
        { titre: "Le lien négligé dans le calme", accent: "négligé", texte: "Ton goût de l'instant peut te faire oublier d'entretenir le lien dans les temps calmes." },
        { titre: "La fuite de ce qui pèse", accent: "fuite", texte: "Ton besoin de légèreté peut te faire éviter les sujets difficiles et les moments lourds." },
        { titre: "La dépendance à la validation", accent: "validation", texte: "Ton goût de plaire peut te rendre trop sensible au regard et à l'approbation des autres." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "La routine figée, sans nouveauté ni joie partagée.",
            "Les liens lourds et sans légèreté ni spontanéité.",
            "Les tensions qu'on laisse pourrir sous le silence.",
            "Le contrôle et la rigidité qui rognent ta liberté.",
            "Les jugements qui te font douter de ta valeur.",
          ],
        },
        {
          ton: "positif",
          items: [
            "Des moments vivants et des expériences à partager.",
            "Un partenaire qui apprécie ta joie ou qui sait l'apprécier.",
            "De la complicité, de la tendresse et du rire.",
            "Quelqu'un qui t'aide à te projeter sans étouffer ton énergie.",
            "De la liberté et de l'espace pour être toi-même.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Les tempéraments très sérieux et attachés à la routine.",
            "Les profils rigides peu portés sur la joie et la spontanéité.",
            "Les personnalités froides ou contrôlantes qui rognent ta liberté.",
          ],
          profils: [
            { code: "ISTJ", raison: "son attachement à la routine et aux règles cadre mal avec ton besoin de spontanéité." },
            { code: "INTJ", raison: "son sérieux et son rythme posé peuvent se heurter à ton goût de l'instant." },
            { code: "INTP", raison: "son retrait et son détachement peuvent rendre ton énergie envahissante à ses yeux." },
          ],
        },
        {
          ton: "positif",
          items: [
            "Les tempéraments chaleureux et vivants qui partagent ton goût de la joie.",
            "Les profils plus posés qui t'aident à te projeter et à structurer.",
            "Ceux qui apprécient ta lumière et t'ancrent un peu dans la durée.",
          ],
          profils: [
            { code: "ENFP", raison: "son enthousiasme et sa chaleur rejoignent ton goût de l'expérience et du lien." },
            { code: "ISFJ", raison: "sa présence fiable et posée t'ancre et t'aide à penser à demain." },
            { code: "ESFJ", raison: "sa chaleur attentive et son sens des autres s'accordent à ta générosité joyeuse." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Tu rêves d'une relation vivante et joyeuse,\nmais à fuir la routine et ce qui pèse, tu risques de manquer ce qui se construit dans la durée.",
        lumiere:
          "Ta chaleur, ta joie et ton don d'animer font de toi un partenaire et un ami auprès de qui on se sent vivant et entraîné.",
        ombre:
          "Mais à agir sur l'impulsion, à fuir les moments lourds et à dépendre du regard des autres, tu peux fragiliser les liens que tu chéris.",
        bascule:
          "Le jour où tu trouves de la joie aussi dans la durée et où tu affrontes ce qui pèse sans perdre ta lumière, ta joie devient le ciment d'une relation vivante et solide.",
      },
    },
    "ESFP-V1-carriere": {
      forces: [
        { titre: "Une énergie qui dynamise", accent: "énergie", texte: "Tu mets de la vie dans une équipe et tu crées une bonne ambiance qui fait du bien à tout collectif." },
        { titre: "Un sens du contact", accent: "contact", texte: "Tu vas vers les gens avec aisance, un atout dans tous les métiers de relation et d'expérience." },
        { titre: "Un don pour l'instant", accent: "instant", texte: "Tu sais faire vivre un moment, créer de bons souvenirs et rendre une expérience mémorable." },
        { titre: "Une vraie adaptabilité", accent: "adaptabilité", texte: "Tu saisis ce qui se présente, tu rebondis et tu fais avec l'imprévu sans te crisper." },
        { titre: "Une chaleur fédératrice", accent: "chaleur", texte: "Tu apportes une dimension humaine et joyeuse autour de laquelle les gens se rassemblent." },
        { titre: "Un goût de la variété", accent: "variété", texte: "Tu donnes le meilleur dans le mouvement et le concret, où chaque journée est différente." },
      ],
      ombres: [
        { titre: "Une impulsivité possible", accent: "impulsivité", texte: "Tu peux décider et agir vite, sous le coup de l'instant, sans toujours peser les conséquences." },
        { titre: "Du mal à te projeter", accent: "projeter", texte: "La planification et la projection à long terme ne sont pas ton terrain naturel." },
        { titre: "Une difficulté à structurer", accent: "structurer", texte: "Les procédures, le suivi régulier et l'organisation dans la durée te pèsent." },
        { titre: "L'ennui face à la durée", accent: "ennui", texte: "Ce qui dure et se répète te lasse vite, et c'est là que ton énergie peut s'essouffler." },
        { titre: "La fuite de la routine", accent: "routine", texte: "La bureaucratie, l'isolement et l'abstraction te démotivent et t'éteignent." },
        { titre: "Un rapport libre à l'argent", accent: "argent", texte: "Tu dépenses pour vivre et partager dans l'instant, parfois au détriment de l'épargne et de l'avenir." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "La routine et les tâches répétitives.",
            "L'isolement et le travail solitaire.",
            "La bureaucratie et les procédures lourdes.",
            "Le travail purement abstrait et théorique.",
            "Les environnements froids et rigides.",
          ],
        },
        {
          ton: "positif",
          items: [
            "Le contact humain et le travail au milieu des gens.",
            "La variété, le mouvement et le concret.",
            "Pouvoir animer, créer de bons moments et mettre de la vie.",
            "De la liberté et de la souplesse dans ta façon de faire.",
            "Un environnement vivant et chaleureux.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Le travail isolé, routinier et répétitif.",
            "Les postes purement administratifs et procéduraux.",
            "Les environnements froids et abstraits.",
          ],
          profils: [
            { nom: "Saisie, comptabilité, procédures", raison: "la routine et la rigidité éteignent ton énergie." },
            { nom: "Travail solitaire et abstrait", raison: "sans contact ni mouvement, tu t'étioles vite." },
            { nom: "Postes très bureaucratiques", raison: "le cadre rigide et impersonnel te démotive profondément." },
          ],
        },
        {
          ton: "positif",
          items: [
            "L'événementiel, l'animation et les arts du spectacle.",
            "La vente, l'hôtellerie et le tourisme.",
            "Les métiers de contact et de l'expérience.",
          ],
          profils: [
            { nom: "Événementiel & animation", raison: "animateur, organisateur : faire vivre l'instant et créer de bons moments." },
            { nom: "Vente & hôtellerie", raison: "commercial, métiers de l'accueil : ton énergie et ton contact font la différence." },
            { nom: "Spectacle & tourisme", raison: "artiste, guide : vivre ce que tu fais et le partager avec les gens." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Tu donnes le meilleur dans le contact et l'instant,\nmais sans un peu de projection et de structure, ta belle énergie peine à durer.",
        lumiere:
          "Ton énergie, ton sens du contact et ton don pour l'instant font de toi quelqu'un qui dynamise les équipes et rend chaque expérience vivante.",
        ombre:
          "Mais ton impulsivité, ta difficulté à te projeter et ton ennui face à la durée peuvent freiner ta progression.",
        bascule:
          "Le jour où tu te fixes un cap et où tu tiens au-delà de l'élan, ta belle énergie se transforme en réussites durables.",
      },
    },
    "ESFP-V1-developpement": {
      evolution: `Ta personnalité n'est pas figée, elle mûrit, et ton type suit une trajectoire de croissance assez nette. Plus jeune, tu es surtout porté par ton énergie et ton goût de l'instant, animer, vivre, profiter, faire la fête. C'est joyeux, mais souvent déséquilibré, tu peux être impulsif, fuir la routine et les contraintes, peiner à te projeter et à finir, dépendre de la validation. Tu illumines le présent, mais l'avenir et la structure te restent étrangers.

Avec le temps et l'expérience, quelque chose s'ouvre. Tu réalises qu'on peut se projeter sans renoncer à la joie, que construire pour demain ne tue pas le plaisir d'aujourd'hui, qu'un peu de structure libère ton énergie au lieu de l'étouffer. Tu apprends à te projeter, à structurer un peu, à tenir dans la durée, sans rien perdre de ta joie de vivre. Dans ta pleine maturité, tu deviens un animateur qui illumine l'instant et qui construit, joyeux et chaleureux, mais aussi capable de donner une direction à son énergie. C'est la version la plus aboutie de toi, et elle est entièrement à ta portée.`,
      etapes: [
        "Tu attires déjà les autres par ton énergie et ta joie, tu animes, tu rassembles, tu rends l'instant vivant. Le monde est fait pour être vécu, et tu en es spontanément la lumière.",
        "Ton goût de l'instant est à son comble, tu animes, tu profites, tu fais la fête. C'est joyeux, mais souvent déséquilibré, tu peux être impulsif, fuir ce qui pèse, et te projeter ou finir ne va pas encore de soi.",
        "Tu comprends qu'on peut se projeter sans renoncer à la joie et qu'un peu de structure libère ton énergie. Tu apprends à penser à demain, à structurer un peu et à tenir dans la durée, sans rien perdre de ta joie.",
        "Dans ta pleine maturité, tu es un animateur qui illumine l'instant et qui construit. Ta joie de vivre s'allie à la capacité de bâtir, la version la plus accomplie de toi.",
      ],
      leviersForts: [
        { titre: "Apprends à te projeter", texte: "C'est ton plus grand levier. Te fixer un cap et donner une direction à ton énergie, sans renier ton goût de l'instant, transforme ta joie en réalisations durables." },
        { titre: "Structure un peu", texte: "Un minimum d'organisation ne tue pas ta spontanéité, il libère ton énergie en t'évitant que le concret négligé ne te rattrape. La structure peut servir ta joie." },
        { titre: "Affronte ce qui pèse", texte: "Ne fuis pas systématiquement la routine et les sujets difficiles. Les affronter, à ta façon joyeuse, t'évite de laisser les problèmes s'accumuler." },
        { titre: "Appuie-toi sur ta propre joie", texte: "Ta valeur et ton bonheur ne dépendent pas du regard des autres. Apprendre à rayonner pour toi autant que pour eux te rend plus libre et plus solide." },
      ],
      questions: [
        { situation: "Quand un plaisir immédiat se présente", question: "Est-ce que je peux le savourer sans oublier ce que ça me coûtera demain ?" },
        { situation: "Quand tu fuis une tâche qui pèse", question: "Et si l'affronter maintenant m'évitait qu'elle ne grossisse ?" },
        { situation: "Quand on attend de toi un plan", question: "Quel premier repère concret puis-je me donner pour avancer ?" },
        { situation: "Quand l'enthousiasme du début retombe", question: "Qu'est-ce qui peut m'aider à tenir au-delà de l'élan ?" },
        { situation: "Quand tu cherches l'approbation", question: "Est-ce que ma joie vient de moi, ou j'attends qu'on me la valide ?" },
      ],
      paradoxe: {
        tension:
          "Pour faire durer ce que tu commences, tu dois te projeter et structurer un peu,\nmais tu crains qu'en planifiant, tu éteignes ta belle spontanéité.",
        lumiere:
          "Ton énergie, ta chaleur et ta présence à l'instant sont une base de croissance immense, tu as déjà tout pour rendre la vie belle et vivante.",
        ombre:
          "Mais sans te projeter ni tenir dans la durée, ta joie se disperse et tes plus beaux élans restent sans suite.",
        bascule:
          "Le jour où tu comprends que te projeter ne trahit pas ton goût de l'instant mais lui donne une assise, ta croissance s'enclenche vraiment.",
      },
    },
    // ----------------------------------------------------------------- V2 -----
    "ESFP-V2-relations": {
      forces: [
        { titre: "Un amour généreux", accent: "généreux", texte: "Quand tu aimes, tu donnes sans compter, tu prends soin et tu places le bien-être de l'autre au cœur de tout." },
        { titre: "Une fidélité sincère", accent: "fidélité", texte: "Une fois engagé, tu es là, loyal et présent dans la durée comme dans les coups durs." },
        { titre: "Une chaleur qui réconforte", accent: "chaleur", texte: "Ta présence est sincère et réconfortante, et auprès de toi on se sent profondément aimé." },
        { titre: "Une attention qui voit", accent: "attention", texte: "Tu remarques celui qui ne va pas et tu offres ta présence par des gestes et des attentions tangibles." },
        { titre: "Une sensibilité profonde", accent: "sensibilité", texte: "Tu ressens fort et tu places le cœur au-dessus de tout, ce qui donne de la profondeur à tes liens." },
        { titre: "Une présence dans les coups durs", accent: "présence", texte: "Tes proches savent qu'avec toi, ils ont quelqu'un de vrai sur qui s'appuyer." },
      ],
      ombres: [
        { titre: "Une hypersensibilité", accent: "hypersensibilité", texte: "Tu peux vivre les tensions et les heurts de tes valeurs de plein fouet, parfois douloureusement." },
        { titre: "L'oubli de toi", accent: "oubli", texte: "Ton don de toi peut te faire trop donner et négliger tes propres besoins jusqu'au déséquilibre." },
        { titre: "L'attente de reconnaissance", accent: "reconnaissance", texte: "Tu donnes sans réclamer, puis tu te sens blessé quand la gratitude manque." },
        { titre: "Du mal à te projeter", accent: "projeter", texte: "Ta difficulté à penser à demain peut compliquer les projets à deux." },
        { titre: "La fuite de ce qui pèse", accent: "fuite", texte: "Ton besoin d'harmonie peut te faire éviter les sujets difficiles et les vrais désaccords." },
        { titre: "La difficulté à recevoir", accent: "recevoir", texte: "Tu sais prendre soin, mais tu acceptes mal qu'on prenne soin de toi en retour." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "Les personnes qui prennent sans jamais rien donner en retour.",
            "Les liens où l'on heurte profondément tes valeurs.",
            "L'ingratitude et le manque de reconnaissance.",
            "Les relations qui te coupent de tes propres besoins.",
            "La froideur, la dureté et l'indifférence.",
          ],
        },
        {
          ton: "positif",
          items: [
            "Des liens sincères, chaleureux et fidèles.",
            "Un partenaire qui apprécie ta générosité et sait prendre soin de toi.",
            "De la réciprocité dans le don et l'attention.",
            "Le respect de tes besoins et de ta sensibilité.",
            "Une connexion vraie et une tendresse partagée.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Les tempéraments très froids ou durs émotionnellement.",
            "Les profils qui prennent sans donner.",
            "Les personnalités qui jugent ta sensibilité ou en abusent.",
          ],
          profils: [
            { code: "INTJ", raison: "son détachement et sa froideur peuvent te laisser sur ta faim affective et te blesser." },
            { code: "ISTP", raison: "sa réserve émotionnelle peut te faire douter et te sembler distante." },
            { code: "ENTP", raison: "sa franchise piquante et son débat permanent peuvent heurter ta sensibilité." },
          ],
        },
        {
          ton: "positif",
          items: [
            "Les tempéraments chaleureux, sincères et fidèles.",
            "Les profils plus posés qui t'aident à te projeter et à ne pas trop t'oublier.",
            "Ceux qui apprécient ton cœur et prennent soin de toi en retour.",
          ],
          profils: [
            { code: "ISFJ", raison: "sa douceur fiable et son attention rejoignent ta générosité et prennent soin de toi en retour." },
            { code: "ESFJ", raison: "sa chaleur et son sens des autres s'accordent à ta fidélité et à ton goût du lien vrai." },
            { code: "INFP", raison: "sa profondeur de valeurs et sa sincérité résonnent avec ton cœur généreux." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Tu aimes avec une générosité rare,\nmais à donner sans te compter, tu risques de t'oublier et de te blesser pour les autres.",
        lumiere:
          "Ta chaleur, ta fidélité et ta façon de donner sans compter font de toi un proche rare, auprès de qui on se sent vraiment aimé.",
        ombre:
          "Mais à trop donner, à vivre chaque heurt de plein fouet et à attendre en silence, tu fragilises ton équilibre et les liens que tu chéris.",
        bascule:
          "Le jour où tu donnes sans t'oublier, où tu reçois autant que tu donnes et où tu protèges ta sensibilité, ta générosité devient un don sain et durable.",
      },
    },
    "ESFP-V2-carriere": {
      forces: [
        { titre: "Une chaleur humaine", accent: "chaleur", texte: "Tu apportes une vraie dimension humaine, tu prends soin de l'ambiance et des gens dans tout collectif." },
        { titre: "Un sens du soin", accent: "soin", texte: "Tu donnes le meilleur quand tu peux aider, accompagner et prendre soin des autres concrètement." },
        { titre: "Une générosité au travail", accent: "générosité", texte: "Tu donnes beaucoup de toi et tu te soucies vraiment des gens, ce qui fait du bien à toute équipe." },
        { titre: "Un contact sincère", accent: "contact", texte: "Tu vas vers les gens avec une chaleur vraie, un atout dans tous les métiers de relation et de soin." },
        { titre: "Une fidélité fiable", accent: "fidélité", texte: "Une fois engagé, on peut compter sur ta présence loyale et ton dévouement dans la durée." },
        { titre: "Un sens des valeurs", accent: "valeurs", texte: "Tu décides selon ce qui est juste et bon pour les gens, ce qui donne du sens à ton action." },
      ],
      ombres: [
        { titre: "L'oubli de toi", accent: "oubli", texte: "Tu peux trop te donner pour les autres et te négliger jusqu'à l'épuisement." },
        { titre: "Une hypersensibilité", accent: "hypersensibilité", texte: "La froideur, les heurts et les tensions du travail t'affectent profondément." },
        { titre: "Du mal à te projeter", accent: "projeter", texte: "La planification et l'action à long terme ne sont pas ton terrain naturel." },
        { titre: "Une difficulté à structurer", accent: "structurer", texte: "Le suivi régulier et l'organisation dans la durée te pèsent et te lassent." },
        { titre: "La fuite de la froideur", accent: "froideur", texte: "L'isolement, l'abstraction et les environnements impersonnels te démotivent et t'éteignent." },
        { titre: "Un rapport généreux à l'argent", accent: "argent", texte: "Tu dépenses pour faire plaisir et partager, parfois au détriment de ta propre gestion." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "Les environnements froids et impersonnels.",
            "L'isolement et le manque de contact humain.",
            "Le travail purement abstrait et théorique.",
            "Les ambiances dures et sans bienveillance.",
            "Un travail vide de sens et de lien.",
          ],
        },
        {
          ton: "positif",
          items: [
            "Le contact humain et la possibilité d'aider.",
            "Un climat chaleureux et bienveillant.",
            "Pouvoir prendre soin et créer du lien.",
            "Un travail porteur de sens et tourné vers les gens.",
            "De la reconnaissance et du respect pour ta générosité.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Les postes froids, durs et impersonnels.",
            "Le travail isolé et sans contact humain.",
            "Les environnements abstraits et sans bienveillance.",
          ],
          profils: [
            { nom: "Finance pure & postes durs", raison: "l'absence de chaleur et de dimension humaine t'éteint." },
            { nom: "Travail solitaire et abstrait", raison: "sans contact ni soin, tu t'étioles vite." },
            { nom: "Environnements impersonnels", raison: "le manque de bienveillance et de lien te démotive profondément." },
          ],
        },
        {
          ton: "positif",
          items: [
            "Les métiers de l'aide, du soin et de la santé.",
            "L'accueil, l'éducation et l'animation.",
            "La vente relationnelle et l'hôtellerie.",
          ],
          profils: [
            { nom: "Aide, soin & santé", raison: "soignant, aide à la personne : prendre soin et réchauffer concrètement." },
            { nom: "Accueil & éducation", raison: "éducateur, métiers de l'accueil : créer du lien et accompagner avec chaleur." },
            { nom: "Vente relationnelle & hôtellerie", raison: "conseiller, métiers de l'accueil : ta générosité et ton contact font la différence." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Ta chaleur et ton dévouement font de toi un professionnel précieux,\nmais à trop t'oublier, tu risques l'épuisement.",
        lumiere:
          "Ta générosité, ton sens du soin et ta chaleur humaine font de toi quelqu'un d'irremplaçable partout où il faut du cœur.",
        ombre:
          "Mais à trop donner, à tout prendre personnellement et à peiner à te projeter, tu t'exposes à l'épuisement.",
        bascule:
          "Le jour où tu te préserves, où tu ne prends pas tout de plein fouet et où tu te projettes, ta générosité devient un atout durable plutôt qu'une source d'épuisement.",
      },
    },
    "ESFP-V2-developpement": {
      evolution: `Ta personnalité n'est pas figée, elle mûrit, et ton type suit une trajectoire de croissance assez nette. Plus jeune, tu es surtout porté par ta générosité et ton goût de l'instant, aimer, donner, vivre, être là pour les gens. C'est chaleureux, mais souvent déséquilibré, tu peux t'oublier à force de donner, te blesser au moindre heurt de tes valeurs, peiner à te projeter, fuir ce qui pèse. Tu réchauffes tout le monde, mais ton équilibre repose trop sur les autres.

Avec le temps et l'expérience, quelque chose s'ouvre. Tu réalises que donner sans s'oublier rend la générosité durable, que protéger ta sensibilité ne la trahit pas, que te projeter ouvre des possibilités. Tu apprends à prendre soin de toi, à poser des limites, à te projeter et à ne pas tout prendre de plein fouet, sans rien perdre de ta chaleur. Dans ta pleine maturité, tu deviens un cœur généreux qui donne sans se vider, chaleureux et fidèle, mais aussi capable de se préserver et de protéger sa sensibilité. C'est la version la plus aboutie de toi, et elle est entièrement à ta portée.`,
      etapes: [
        "Tu es déjà sensible aux gens et généreux, tu remarques celui qui ne va pas, tu donnes, tu réchauffes. Le cœur tourné vers ceux que tu aimes.",
        "Ton cœur se révèle pleinement, tu aimes, tu donnes, tu es là pour tous. C'est chaleureux, mais souvent déséquilibré, tu t'oublies, tu te blesses au moindre heurt, et te projeter ou te préserver ne va pas encore de soi.",
        "Tu comprends que donner sans t'oublier rend ta générosité durable et que protéger ta sensibilité ne la trahit pas. Tu apprends à prendre soin de toi, à recevoir et à te projeter, sans rien perdre de ta chaleur.",
        "Dans ta pleine maturité, tu es un cœur généreux qui donne depuis un cœur plein. Ta générosité s'allie à la solidité intérieure, la version la plus accomplie de toi.",
      ],
      leviersForts: [
        { titre: "Donne sans t'oublier", texte: "C'est ton plus grand levier. Apprends à te compter, toi aussi, dans ta générosité. Prendre soin de toi te permet de donner durablement, depuis un cœur plein plutôt que vidé." },
        { titre: "Protège ta sensibilité", texte: "Apprends à ne pas tout prendre de plein fouet et à mettre un peu de distance face aux heurts, sans rien perdre de ta profondeur de cœur." },
        { titre: "Apprends à recevoir", texte: "Tu donnes énormément, laisse les autres prendre soin de toi en retour. La réciprocité te remplit et équilibre tes relations." },
        { titre: "Apprends à te projeter", texte: "Te fixer un cap et penser à demain, sans renier ton goût de l'instant, donne corps durablement à ta générosité et à tes valeurs." },
      ],
      questions: [
        { situation: "Quand tu prends soin de tout le monde", question: "Est-ce que je m'occupe aussi de moi, ou je me garde pour la fin ?" },
        { situation: "Quand un heurt te blesse", question: "Est-ce que je peux le ressentir sans le vivre comme une atteinte totale ?" },
        { situation: "Quand la gratitude manque", question: "Est-ce que ma valeur dépend vraiment de leur reconnaissance ?" },
        { situation: "Quand on t'offre du soutien", question: "Est-ce que je sais recevoir, ou je refuse par réflexe ?" },
        { situation: "Quand tu vis tout au présent", question: "Quel premier repère puis-je me donner pour penser aussi à demain ?" },
      ],
      paradoxe: {
        tension:
          "Pour aimer durablement, tu dois prendre soin de toi autant que des autres,\nmais te mettre en premier te semble parfois égoïste.",
        lumiere:
          "Ta générosité, ta fidélité et ta profondeur de cœur sont une base de croissance immense, tu as déjà tout pour aimer et réchauffer le monde.",
        ombre:
          "Mais sans te préserver ni recevoir, ta belle générosité peut te vider et te conduire à l'épuisement.",
        bascule:
          "Le jour où tu vois le soin de toi non comme un égoïsme mais comme la condition de ton don, ton cœur cesse de se vider pour devenir une source intarissable.",
      },
    },
    // ----------------------------------------------------------------- V3 -----
    "ESFP-V3-relations": {
      forces: [
        { titre: "Une présence raffinée", accent: "raffinée", texte: "Avec toi, le quotidien s'embellit, tu apportes de la beauté, du soin et des moments soignés et mémorables." },
        { titre: "Le don de soigner les moments", accent: "soigner", texte: "Tu as le sens des belles occasions et tu rends les retrouvailles agréables et élégantes." },
        { titre: "Une chaleur sincère", accent: "chaleur", texte: "Sous ton goût du beau, il y a un vrai cœur, et ta présence est tendre et attentionnée." },
        { titre: "Une attention élégante", accent: "attention", texte: "Tu exprimes ton amour par des gestes soignés et des attentions qui touchent." },
        { titre: "Une sensibilité touchante", accent: "sensibilité", texte: "Tu ressens fort et tu partages le beau avec ceux que tu aimes, ce qui rend tes liens précieux." },
        { titre: "Un art de vivre partagé", accent: "art", texte: "Tu sais rendre la vie belle à deux, et tes proches aiment savourer de beaux moments avec toi." },
      ],
      ombres: [
        { titre: "L'attrait du plaisir", accent: "plaisir", texte: "Ton goût de l'agréable peut te faire fuir la routine et les aspects moins reluisants du quotidien." },
        { titre: "Du mal à te projeter", accent: "projeter", texte: "Ta difficulté à penser à demain peut compliquer les projets à deux." },
        { titre: "Une sensibilité aux heurts", accent: "heurts", texte: "Tu peux vivre les tensions et les jugements douloureusement, surtout sur ton goût." },
        { titre: "La fuite des moments lourds", accent: "fuite", texte: "Ton goût de l'agréable peut te faire éviter les temps difficiles et les sujets qui pèsent." },
        { titre: "Une impulsivité possible", accent: "impulsivité", texte: "Ton goût de l'instant peut te faire saisir l'agréable sans penser aux conséquences pour le lien." },
        { titre: "Le risque de surface", accent: "surface", texte: "À soigner l'agréable, tu peux passer à côté de ce qui se construit dans la durée et la difficulté." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "La routine grise, sans beauté ni soin.",
            "Les liens austères et sans douceur ni raffinement.",
            "Les tensions qu'on laisse pourrir sous le silence.",
            "Le contrôle et la rigidité qui rognent ta liberté.",
            "Les jugements durs sur ton goût ou ta sensibilité.",
          ],
        },
        {
          ton: "positif",
          items: [
            "Des moments soignés et de belles expériences à partager.",
            "Un partenaire qui partage ou apprécie ton goût du beau.",
            "De la complicité, de la tendresse et du raffinement.",
            "Quelqu'un qui t'ancre un peu dans la durée sans étouffer ta lumière.",
            "De la liberté et de l'espace pour ta sensibilité.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Les tempéraments très austères et indifférents au beau.",
            "Les profils rigides peu portés sur la sensibilité.",
            "Les personnalités froides ou contrôlantes qui rognent ta liberté.",
          ],
          profils: [
            { code: "ISTJ", raison: "son austérité et son attachement à la routine cadrent mal avec ton art de vivre." },
            { code: "INTJ", raison: "son détachement et son indifférence au beau peuvent te sembler froids." },
            { code: "ESTJ", raison: "son côté terre-à-terre et son sérieux peuvent juger ton goût du raffinement futile." },
          ],
        },
        {
          ton: "positif",
          items: [
            "Les tempéraments chaleureux et sensibles au beau et à l'expérience.",
            "Les profils plus posés qui t'aident à te projeter et à structurer.",
            "Les esprits pragmatiques qui t'aident à affronter le quotidien moins reluisant.",
          ],
          profils: [
            { code: "ISFP", raison: "sa sensibilité au beau et sa douceur rejoignent ton art de vivre et ton goût du raffinement." },
            { code: "ISFJ", raison: "sa présence fiable et posée t'ancre et t'aide à inscrire le beau dans la durée." },
            { code: "ENFP", raison: "son enthousiasme et sa chaleur s'accordent à ton goût de l'expérience et du partage." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Tu rêves d'une relation belle et raffinée,\nmais à fuir le quotidien moins reluisant, tu risques de manquer ce qui se construit dans la durée.",
        lumiere:
          "Ta sensibilité, ta chaleur et ton art d'embellir font de toi un partenaire et un ami auprès de qui la vie devient belle.",
        ombre:
          "Mais à fuir les moments lourds, à vivre les heurts de plein fouet et à chercher l'agréable, tu peux passer à côté des liens profonds que tu mérites.",
        bascule:
          "Le jour où tu aimes aussi le quotidien moins reluisant et où tu ne prends pas tout de plein fouet, ta sensibilité trouve enfin où s'enraciner.",
      },
    },
    "ESFP-V3-carriere": {
      forces: [
        { titre: "Un sens du beau", accent: "beau", texte: "Tu apportes une attention à l'esthétique et au soin, une touche qui embellit ce que tu fais." },
        { titre: "Une créativité vivante", accent: "créativité", texte: "Tu donnes le meilleur dans le créatif et le concret, où tu peux créer du beau et de l'agréable." },
        { titre: "Un sens du style", accent: "style", texte: "Tu as l'œil et le goût, un atout dans tous les métiers de l'image, de la mode et du design." },
        { titre: "Une présence vivante", accent: "présence", texte: "Tu apportes une présence sensible et vivante qui fait la différence auprès des gens." },
        { titre: "Une vraie adaptabilité", accent: "adaptabilité", texte: "Tu saisis ce qui se présente, tu rebondis et tu crées du beau dans tout contexte." },
        { titre: "Un goût du concret", accent: "concret", texte: "Tu travailles bien dans le sensible et le tangible, où ton goût prend forme dans le réel." },
      ],
      ombres: [
        { titre: "L'attrait du plaisir immédiat", accent: "plaisir", texte: "Ton goût de l'agréable peut te faire privilégier ce qui plaît maintenant au détriment de l'effort." },
        { titre: "Du mal à te projeter", accent: "projeter", texte: "La planification et l'action à long terme ne sont pas ton terrain naturel." },
        { titre: "Une difficulté à structurer", accent: "structurer", texte: "Le suivi régulier et l'organisation dans la durée te pèsent et te lassent." },
        { titre: "Une sensibilité à la critique", accent: "critique", texte: "Un retour sur ton goût ou ce que tu crées peut te toucher fort et longtemps." },
        { titre: "La fuite de l'austérité", accent: "austérité", texte: "La routine, la bureaucratie et l'abstraction te démotivent et t'éteignent." },
        { titre: "Un rapport au plaisir de l'argent", accent: "argent", texte: "Tu dépenses pour le beau et l'agréable, parfois au détriment de l'épargne et de l'avenir." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "La routine et la bureaucratie.",
            "L'austérité et les environnements ternes.",
            "Le travail purement abstrait et théorique.",
            "Les procédures lourdes et rigides.",
            "Les cadres froids sans place pour le beau.",
          ],
        },
        {
          ton: "positif",
          items: [
            "Pouvoir créer du beau et soigner l'esthétique.",
            "Un cadre vivant, créatif et sensible.",
            "De la liberté et de la souplesse dans ta façon de faire.",
            "Le contact et le concret plutôt que l'abstraction.",
            "Un environnement qui valorise le goût et le style.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Le travail austère, routinier et abstrait.",
            "Les postes purement administratifs et rigides.",
            "Les environnements ternes sans place pour le beau.",
          ],
          profils: [
            { nom: "Saisie, comptabilité, procédures", raison: "la routine et l'austérité éteignent ta sensibilité." },
            { nom: "Travail abstrait et théorique", raison: "sans concret ni beau à créer, tu t'étioles." },
            { nom: "Postes très bureaucratiques", raison: "le cadre rigide et terne te démotive profondément." },
          ],
        },
        {
          ton: "positif",
          items: [
            "La mode, le design et les arts.",
            "La décoration, l'hôtellerie et la gastronomie.",
            "L'événementiel et les métiers de l'image et du style.",
          ],
          profils: [
            { nom: "Mode, design & arts", raison: "styliste, designer, artiste : exprimer ton goût du beau et ton sens du style." },
            { nom: "Décoration & gastronomie", raison: "décorateur, métiers de la table : sublimer le concret et l'art de vivre." },
            { nom: "Événementiel & image", raison: "métiers de l'image et du style : créer du beau et de l'agréable pour les gens." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Tu donnes le meilleur quand tu peux créer du beau,\nmais sans un peu de projection et de structure, ton talent peine à durer.",
        lumiere:
          "Ton goût du beau, ton sens du style et ta présence vivante font de toi quelqu'un qui embellit tout ce qu'il touche.",
        ombre:
          "Mais ton attrait pour le plaisir immédiat, ta difficulté à te projeter et ta sensibilité à la critique peuvent freiner ta progression.",
        bascule:
          "Le jour où tu te fixes un cap, où tu affrontes les aspects moins plaisants et où tu reçois la critique sans t'effondrer, ton talent se transforme en réalisations durables.",
      },
    },
    "ESFP-V3-developpement": {
      evolution: `Ta personnalité n'est pas figée, elle mûrit, et ton type suit une trajectoire de croissance assez nette. Plus jeune, tu es surtout porté par ton goût du beau et de l'instant, savourer, sublimer, profiter, créer de l'agréable. C'est riche, mais souvent déséquilibré, tu peux chercher le plaisir immédiat, fuir ce qui pèse, peiner à te projeter, te montrer sensible à la critique. Tu embellis le présent, mais l'avenir et l'effort moins gratifiant te restent étrangers.

Avec le temps et l'expérience, quelque chose s'ouvre. Tu réalises qu'on peut se projeter sans renoncer au beau, que construire pour demain ne tue pas le plaisir d'aujourd'hui, qu'affronter ce qui pèse permet de protéger ce qu'on aime. Tu apprends à te projeter, à structurer un peu, à concilier le plaisir et l'effort, sans rien perdre de ton goût du beau. Dans ta pleine maturité, tu deviens un esthète qui sublime l'instant et qui construit, sensible et raffiné, mais aussi capable de donner une direction durable à sa sensibilité. C'est la version la plus aboutie de toi, et elle est entièrement à ta portée.`,
      etapes: [
        "Tu vois et tu crées déjà le beau, tu sublimes l'instant, tu soignes les choses. Le monde est fait pour être rendu beau, et tu en as spontanément le goût.",
        "Ton goût du beau est à son comble, tu savoures, tu sublimes, tu profites. C'est riche, mais souvent déséquilibré, tu peux chercher le plaisir immédiat, fuir ce qui pèse, et te projeter ou faire l'effort ne va pas encore de soi.",
        "Tu comprends qu'on peut se projeter sans renoncer au beau et qu'affronter ce qui pèse protège ce qu'on aime. Tu apprends à te projeter, à structurer un peu et à concilier plaisir et effort, sans rien perdre de ton goût.",
        "Dans ta pleine maturité, tu es un esthète qui sublime l'instant et qui construit. Ton goût du beau s'allie à la capacité de bâtir, la version la plus accomplie de toi.",
      ],
      leviersForts: [
        { titre: "Apprends à te projeter", texte: "C'est ton plus grand levier. Te fixer un cap et donner une direction durable à ta sensibilité, sans renier ton goût de l'instant, transforme ton talent en réalisations qui durent." },
        { titre: "Concilie plaisir et effort", texte: "Le beau et l'agréable ont leur place, mais certaines choses qui comptent demandent de l'effort moins gratifiant. Apprendre à faire les deux donne du poids à ce que tu vis." },
        { titre: "Inscris la beauté dans la durée", texte: "Apprends à construire et à entretenir dans le temps ce qui est beau, tes projets, tes liens, ton cadre de vie. La durée donne du poids à ta belle sensibilité." },
        { titre: "Protège ta sensibilité", texte: "Apprends à recevoir la critique sans la vivre comme une atteinte à ton goût. Ta sensibilité est une force quand elle ne te fragilise pas." },
      ],
      questions: [
        { situation: "Quand un plaisir immédiat se présente", question: "Est-ce que je peux le savourer sans négliger ce qui compte sur la durée ?" },
        { situation: "Quand une tâche ingrate t'attend", question: "Et si la faire maintenant protégeait ce que j'aime ?" },
        { situation: "Quand on critique ton goût", question: "Est-ce un avis sur mon travail, ou est-ce que je le vis comme une atteinte à moi ?" },
        { situation: "Quand on attend de toi un plan", question: "Quel premier repère concret puis-je me donner pour avancer ?" },
        { situation: "Quand tu vis tout au présent", question: "Comment inscrire ce que je crée de beau dans la durée ?" },
      ],
      paradoxe: {
        tension:
          "Pour faire durer ce que tu crées de beau, tu dois te projeter et structurer un peu,\nmais tu crains qu'en planifiant, tu éteignes ta belle spontanéité.",
        lumiere:
          "Ta sensibilité, ton goût du beau et ta présence à l'instant sont une base de croissance immense, tu as déjà tout pour embellir la vie.",
        ombre:
          "Mais sans te projeter ni affronter l'effort moins gratifiant, ton talent se disperse et tes plus belles créations restent sans suite.",
        bascule:
          "Le jour où tu comprends que te projeter ne trahit pas ton goût de l'instant mais lui donne une assise, ta croissance s'enclenche vraiment.",
      },
    },
  },
};

export default esfp;
