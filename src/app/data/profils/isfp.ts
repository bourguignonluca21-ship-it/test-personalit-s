// =============================================================================
// CONTENU DU PROFIL ISFP (« Aventurier »), 3 variantes.
// V1 Artiste Sensible · V2 Aventurier des Sens · V3 Doux Idéaliste.
// Source : rapports longs rapport_long_ISFP_V1/V2/V3.md.
// Même forme que les entrées de profils.ts (INFP / ENFP) et le profil ENFJ.
// Voix « tu », aucun tiret long, mot-clé en vert via le champ "accent".
// =============================================================================

const isfp = {
  // Texte commun aux 3 variantes (sous les barres du spectre). 2 paragraphes.
  traitsTexte: {
    ISFP: `Ton esprit est guidé par une boussole de valeurs intimes très forte : tu évalues tout à l'aune de ce qui est juste, vrai et beau pour toi, tu ressens avec intensité, et tu places l'authenticité au-dessus de tout. À cette profondeur s'ajoute un ancrage fin dans le présent et le sensible, tu perçois les textures, les ambiances, la beauté du concret que d'autres ne remarquent même pas. Là où certains vivent d'abord par les idées, toi tu vis et tu t'exprimes par les sens, le geste et la matière.

Ta grande singularité, c'est cette alliance de la sensibilité et de la douceur. Ton intensité intérieure ne s'impose pas aux autres : tu vis tes valeurs sans chercher à les imposer, avec une discrétion qui n'enlève rien à ta fermeté profonde. Plus en profondeur sommeillent deux forces que tu développes avec le temps, l'intuition de la direction des choses et la capacité de structurer ton action. Tout l'enjeu de ton chemin, c'est d'apprendre à donner corps à ta richesse intérieure au lieu de seulement la protéger.`,
  },

  // 1 phrase par variante, affichée au survol des barres.
  descriptions: {
    "ISFP-V1":
      "Les Artistes Sensibles sont les plus tournés vers la vie intérieure et l'expression. Ils donnent forme à ce qu'ils ressentent et mettent du vrai et de la beauté dans tout ce qu'ils touchent.",
    "ISFP-V2":
      "Les Aventuriers des Sens sont les plus tournés vers l'expérience directe et la beauté du concret. Ils vivent l'instant à pleins sens et savourent ce que d'autres ne remarquent même pas.",
    "ISFP-V3":
      "Les Doux Idéalistes sont les plus tournés vers la défense de leurs valeurs dans le monde. Ils agissent pour ce qui est juste avec une fermeté tranquille qui force le respect.",
  },

  // 1 phrase d'accroche (héros) par variante.
  accroches: {
    "ISFP-V1": "Tu ne suis pas les codes qu'on te donne, tu écoutes ce qui résonne en toi.",
    "ISFP-V2": "Tu ne traverses pas le monde, tu le savoures à pleins sens.",
    "ISFP-V3": "Tu ne t'indignes pas fort, tu agis doucement et tu ne lâches jamais ce qui est juste.",
  },

  // ~2 paragraphes sous le héros (« Ton portrait »).
  intros: {
    "ISFP-V1": `En tant qu'Aventurier (ISFP), variante Artiste Sensible, tu as la sensibilité et l'authenticité de ta famille d'âme, et ce qui te définit avant tout, c'est ta vie intérieure et ton besoin d'exprimer ce que tu portes. Là où l'aventurier des sens vit d'abord par l'expérience et la beauté du concret, et où le doux idéaliste tourne ses valeurs vers le monde, toi tu te définis d'abord par ton monde intérieur : tes émotions, tes valeurs, ce que tu as besoin d'exprimer.

Ce qui te porte, c'est l'expression de ce que tu ressens et la beauté que tu y mets. Tu tires une vraie satisfaction de créer, de donner forme à ce qui t'habite, de vivre selon tes valeurs sans les trahir. Être fidèle à toi-même te nourrit plus que n'importe quelle reconnaissance extérieure. Cette même richesse a son revers : ta sensibilité peut te rendre vulnérable et te faire te replier. Ton plus beau terrain de croissance sera d'apprendre à donner au monde ce que tu portes au lieu de seulement le protéger.`,

    "ISFP-V2": `En tant qu'Aventurier (ISFP), variante Aventurier des Sens, tu as la sensibilité et l'authenticité de ta famille d'âme, et ce qui te définit avant tout, c'est ton goût de l'expérience directe et de la beauté du concret. Là où l'artiste sensible vit d'abord par sa vie intérieure, et où le doux idéaliste tourne ses valeurs vers le monde, toi tu te définis d'abord par ta présence intense à l'instant : vivre, sentir, savourer.

Ce qui te porte, c'est l'expérience pleinement vécue et la beauté saisie dans l'instant. Tu as ce don rare de te sentir pleinement vivant dans le moment, de goûter les textures, les couleurs, les sensations que d'autres ne remarquent même pas. Vivre intensément le présent te nourrit plus que n'importe quel plan d'avenir. Cette même intensité a son revers : ton goût du présent peut t'empêcher de te projeter et de construire pour demain. Ton plus beau terrain de croissance sera d'apprendre à bâtir sans cesser de savourer.`,

    "ISFP-V3": `En tant qu'Aventurier (ISFP), variante Doux Idéaliste, tu as la sensibilité et l'authenticité de ta famille d'âme, et ce qui te définit avant tout, c'est la façon dont tes valeurs se tournent vers le monde. Là où l'artiste sensible vit d'abord sa vie intérieure, et où l'aventurier des sens savoure l'instant, toi tu mets ta sensibilité au service de ce qui est juste : tu défends, doucement mais fermement, ce en quoi tu crois.

Ce qui te porte, c'est la défense de ce qui est juste et la fidélité à tes idéaux. Tu as un sens aigu de la justice, et tu veux contribuer à un monde meilleur, non dans le fracas mais par tes choix, ta constance, ta présence. Cette même conviction a son revers : ton idéalisme peut se briser sur un réel qui n'est jamais à la hauteur. Ton plus beau terrain de croissance sera d'apprendre à ancrer tes idéaux dans le réel au lieu de les y briser.`,
  },

  // ~2 paragraphes sous les barres de variante (« Ta variante »).
  texteVariante: {
    "ISFP-V1": `Parmi les trois façons d'être de l'Aventurier, tu es le plus tourné vers la vie intérieure et l'expression de ce que tu portes. Tu n'es pas avant tout l'aventurier des sens en quête d'expérience, ni le doux idéaliste qui tourne ses valeurs vers le monde : ce qui te met en mouvement, c'est d'exprimer qui tu es, de rester fidèle à ton monde intérieur. Créer, mettre du sens et de la beauté dans ce que tu fais, vivre aligné avec tes valeurs te comble plus que tout.

Cette combinaison, la profondeur, la sensibilité et la douceur, dessine ta façon d'être : l'âme délicate qui met du vrai dans tout ce qu'elle touche. Tu donnes forme à ce que tu ressens, tu le rends tangible et beau. Le revers, c'est que tu peux porter une richesse intérieure immense et la garder pour toi par crainte de l'exposer : ton plus beau chemin de croissance sera d'apprendre à donner à voir ce que tu portes, sans en faire une prison.`,

    "ISFP-V2": `Parmi les trois façons d'être de l'Aventurier, tu es le plus tourné vers l'expérience directe et la beauté du concret. Tu n'es pas avant tout l'artiste sensible centré sur sa vie intérieure, ni le doux idéaliste qui tourne ses valeurs vers le monde : ce qui te met en mouvement, c'est de vivre, de sentir, de savourer l'instant. Vivre pleinement l'expérience, savourer la beauté du monde, saisir spontanément ce qui se présente te comble plus que tout.

Cette combinaison, la vivacité, la sensibilité esthétique et la spontanéité, dessine ta façon d'être : l'esthète qui vit l'instant à pleins sens. Tu ne fais pas que vivre le moment, tu y mets du cœur et du sens. Le revers, c'est que cette présence au présent peut te disperser et te faire négliger ce qui se construit lentement : ton plus beau chemin de croissance sera d'apprendre à inscrire ta beauté dans la durée.`,

    "ISFP-V3": `Parmi les trois façons d'être de l'Aventurier, tu es le plus tourné vers la défense de tes valeurs dans le monde. Tu n'es pas avant tout l'artiste sensible centré sur sa vie intérieure, ni l'aventurier des sens qui savoure l'instant : ce qui te met en mouvement, c'est de servir ce qui est juste, de contribuer à un monde meilleur. Agir pour ce qui est juste, défendre tes valeurs, contribuer doucement mais fermement à plus de justice te comble plus que tout.

Cette combinaison, la conviction, la sensibilité et la douceur, dessine ta façon d'être : le porteur de valeurs silencieux dont la fermeté tranquille force le respect. Tu défends ce en quoi tu crois par la constance, l'exemple, l'engagement discret. Le revers, c'est que cet idéalisme peut se heurter douloureusement au réel et te désillusionner : ton plus beau chemin de croissance sera d'apprendre à transformer le monde pas à pas plutôt que d'exiger qu'il soit parfait.`,
  },

  // Détail de variante : 6 forces, 6 ombres, paradoxe.
  varianteDetail: {
    "ISFP-V1": {
      forces: [
        { titre: "Une authenticité profonde", accent: "authenticité", texte: "Tu restes fidèle à ce que tu es et à tes valeurs, sans les trahir pour plaire ou pour rentrer dans le moule." },
        { titre: "Une sensibilité d'une grande finesse", accent: "sensibilité", texte: "Tu perçois des nuances, des émotions et des beautés que d'autres ne voient pas, et cette richesse nourrit ta créativité." },
        { titre: "Le don de créer et d'exprimer", accent: "créer", texte: "Tu donnes forme à ce que tu ressens et tu transformes ta vie intérieure en quelque chose de tangible et de beau." },
        { titre: "Une douceur tolérante", accent: "douceur", texte: "Tu n'imposes pas tes vues et tu acceptes les gens comme ils sont, ce qui fait de toi quelqu'un d'apaisant." },
        { titre: "Une fidélité de roc", accent: "fidélité", texte: "Sous ta douceur, tu es d'une fermeté inébranlable sur tes valeurs et sur ce qui te tient à cœur." },
        { titre: "Une vie intérieure riche", accent: "intérieure", texte: "Ta profondeur émotionnelle te donne un monde intérieur dense d'où jaillissent ta créativité et ta justesse." },
      ],
      ombres: [
        { titre: "Une hypersensibilité à la critique", accent: "hypersensibilité", texte: "Une remarque ou un jugement peuvent te toucher profondément et te faire te replier sur toi-même." },
        { titre: "Un repli devant le conflit", accent: "repli", texte: "Ta profondeur peut te faire fuir l'affrontement et taire ce qui te blesse plutôt que de l'exprimer." },
        { titre: "Du mal à te projeter", accent: "projeter", texte: "Ton ancrage dans le présent et ton goût de la liberté rendent difficiles la planification et l'action à long terme." },
        { titre: "Une tendance à te dévaloriser", accent: "dévaloriser", texte: "Ta sensibilité peut se retourner contre toi en doute et en autocritique sévère." },
        { titre: "Une richesse gardée pour toi", accent: "gardée", texte: "Tu peux porter un trésor intérieur immense et ne jamais oser le partager, par crainte de l'exposer." },
        { titre: "Une difficulté à exprimer tes besoins", accent: "exprimer", texte: "Tu peux laisser l'autre dans le flou, faute de mettre des mots sur ce que tu ressens et sur ce dont tu as besoin." },
      ],
      paradoxe: {
        tension:
          "Ta sensibilité fait toute ta richesse,\nmais elle est aussi ce qui peut te rendre vulnérable et te faire te replier.",
        lumiere:
          "Ta profondeur émotionnelle, ton authenticité et ta fidélité à tes valeurs sont des cadeaux immenses : tu ressens fort, tu crées du vrai et tu restes toi-même.",
        ombre:
          "Mais cette même sensibilité peut te conduire à te blesser au moindre jugement, à fuir le conflit, à te dévaloriser et à te replier dans ton monde plutôt que d'oser le partager.",
        bascule:
          "Le jour où tu apprends à protéger ta sensibilité sans t'en faire une prison et à oser donner ce que tu portes, ta richesse intérieure cesse d'être une vulnérabilité pour devenir ta plus grande force.",
      },
    },
    "ISFP-V2": {
      forces: [
        { titre: "Une présence pleine au présent", accent: "présent", texte: "Tu as ce don rare de te donner entièrement à l'instant, de savourer ce qui se présente et de te sentir vivant ici et maintenant." },
        { titre: "Une sensibilité à la beauté", accent: "beauté", texte: "Tu vois et tu apprécies le beau là où d'autres passent sans le remarquer, ce qui enrichit ta vie et celle des autres." },
        { titre: "Une spontanéité adaptable", accent: "spontanéité", texte: "Tu saisis ce qui se présente et tu t'adaptes au gré de l'instant, sans te laisser enfermer par les plans." },
        { titre: "Une authenticité sincère", accent: "authenticité", texte: "Sous ton goût de l'expérience, tu restes fidèle à tes valeurs et à ce que tu es, ce qui inspire confiance." },
        { titre: "Une douceur chaleureuse", accent: "douceur", texte: "Tu acceptes les gens et les choses comme ils sont, sans chercher à imposer, et l'on se sent libre auprès de toi." },
        { titre: "Un sens aigu du concret", accent: "concret", texte: "Tu perçois finement les textures et les ambiances et tu es à ton meilleur dans tout ce qui se goûte et se ressent." },
      ],
      ombres: [
        { titre: "Une impulsivité possible", accent: "impulsivité", texte: "Ton goût de l'instant peut te faire saisir ce qui se présente sans penser aux conséquences ni au reste." },
        { titre: "Du mal à te projeter", accent: "projeter", texte: "Ton ancrage dans le présent rend difficiles la planification et l'action à long terme." },
        { titre: "Une hypersensibilité à la critique", accent: "hypersensibilité", texte: "Ta richesse émotionnelle peut te faire vivre douloureusement un jugement, comme une atteinte à ce que tu es." },
        { titre: "Une fuite de ce qui pèse", accent: "fuite", texte: "Ton goût de la légèreté peut te faire éviter les sujets difficiles et les contraintes qui te pèsent." },
        { titre: "Une vie qui se disperse", accent: "disperse", texte: "À vivre mille instants intenses, tu peux passer à côté de ce qui se construit lentement et dans la durée." },
        { titre: "Un avenir négligé", accent: "avenir", texte: "Tourné vers le présent, tu peux négliger l'épargne, la projection et tout ce qui prépare demain." },
      ],
      paradoxe: {
        tension:
          "Ton goût intense du présent te fait vivre si pleinement,\nmais il peut t'empêcher de te projeter et de construire pour demain.",
        lumiere:
          "Ta présence à l'instant, ta sensibilité au beau et ta spontanéité sont des cadeaux immenses : tu vis pleinement, tu savoures, tu te sens vivant là où d'autres survivent.",
        ombre:
          "Mais poussées trop loin, ces qualités peuvent te conduire à l'impulsivité, à fuir ce qui demande de durer, à négliger l'avenir et à éviter ce qui pèse.",
        bascule:
          "Le jour où tu apprends à te projeter sans renier ton goût de l'instant et à construire pour demain sans sacrifier aujourd'hui, ta présence au présent cesse de te disperser pour devenir une force qui bâtit aussi.",
      },
    },
    "ISFP-V3": {
      forces: [
        { titre: "Des convictions profondes", accent: "convictions", texte: "Tu as un sens aigu de ce qui est juste et des valeurs auxquelles tu tiens fermement, ce qui fait de toi quelqu'un de cohérent et d'intègre." },
        { titre: "Une fermeté tranquille", accent: "fermeté", texte: "Tu défends tes valeurs par la constance et l'exemple, et tu tiens bon là où d'autres s'épuisent en bruit." },
        { titre: "Une sensibilité à la justice", accent: "justice", texte: "L'injustice te touche profondément et te pousse à agir pour rendre le monde un peu meilleur, à ta façon." },
        { titre: "Une authenticité sincère", accent: "authenticité", texte: "Tu restes fidèle à tes valeurs sans les trahir pour plaire, ce qui fait de toi quelqu'un de vrai en qui on a confiance." },
        { titre: "Une douceur tolérante", accent: "douceur", texte: "Malgré la fermeté de tes convictions, tu accueilles les gens avec douceur et ouverture, ce qui te rend respecté." },
        { titre: "Une action concrète et constante", accent: "action", texte: "Tu défends tes valeurs par des gestes concrets du quotidien, pas seulement par des idées, et avec une vraie persévérance." },
      ],
      ombres: [
        { titre: "Un idéalisme qui se heurte au réel", accent: "idéalisme", texte: "Le monde n'est pas toujours à la hauteur de tes idéaux, et ce décalage peut te décevoir ou te désillusionner." },
        { titre: "Un repli dans l'adversité", accent: "repli", texte: "Quand tes valeurs sont heurtées ou le combat semble perdu, tu peux te retirer plutôt que de persévérer." },
        { titre: "Une hypersensibilité à la critique", accent: "hypersensibilité", texte: "Un jugement, surtout sur ce qui touche à tes valeurs, peut te toucher profondément et te fragiliser." },
        { titre: "Du mal à structurer", accent: "structurer", texte: "Ton ancrage dans le présent et ta souplesse rendent difficile l'action organisée et la projection dans la durée." },
        { titre: "Une amertume possible", accent: "amertume", texte: "Exiger que le réel soit à la hauteur de tes idéaux peut te mener à la déception et à la désillusion." },
        { titre: "Un jugement parfois dur", accent: "jugement", texte: "Ton idéalisme peut te faire juger sévèrement ce qui heurte tes valeurs, chez les autres comme dans le monde." },
      ],
      paradoxe: {
        tension:
          "Ton idéalisme te pousse à défendre ce qui est juste,\nmais il peut se briser sur un réel qui n'est jamais à la hauteur.",
        lumiere:
          "Tes convictions profondes, ta sensibilité à la justice et ta fermeté tranquille sont des cadeaux immenses : tu défends ce qui compte, tu agis avec constance, tu restes fidèle à tes valeurs.",
        ombre:
          "Mais poussé trop loin, cet idéalisme peut se heurter douloureusement au réel, te décevoir, te désillusionner et te pousser à te replier quand le monde ne suit pas.",
        bascule:
          "Le jour où tu apprends à défendre tes valeurs sans exiger que le réel soit parfait et à rester engagé malgré l'adversité, ton idéalisme cesse de te briser pour devenir une force tranquille qui transforme vraiment les choses.",
      },
    },
  },

  // ~2 paragraphes (« En amour » / « En amitié »).
  relationsTexte: {
    "ISFP-V1": `En amour, tu es doux, attentionné et profondément sincère. Tu exprimes ton amour par les gestes, les attentions, le partage, plus que par les grandes déclarations. Être aimé par toi, c'est se sentir accepté tel qu'on est, accompagné avec délicatesse, aimé d'une façon authentique et sans calcul. Tu prends le temps de t'ouvrir et tu protèges ton monde intérieur, mais une fois que tu donnes ton cœur, tu aimes avec une intensité et une loyauté rares. En amitié, tu es l'ami fidèle et authentique, celui qui accueille sans juger et offre une écoute sans jugement.

Tes défis sont les revers de ta nature : ton hypersensibilité peut te faire vivre les tensions douloureusement, ta difficulté à verbaliser tes besoins peut laisser l'autre dans le flou, et ton évitement du conflit peut laisser des choses non dites s'accumuler. Ton chemin, c'est d'apprendre à exprimer ce que tu ressens et ce dont tu as besoin, à ne pas fuir les sujets difficiles, et à ne pas tout prendre comme une atteinte à ce que tu es. Quand tu y parviens, tu offres une relation d'une tendresse et d'une authenticité rares.`,

    "ISFP-V2": `En amour, tu es doux, présent et spontané. Tu exprimes ton amour par les gestes, les expériences partagées, les attentions du quotidien, plus que par les grandes déclarations. Être aimé par toi, c'est vivre des choses, savourer des moments, se sentir accepté et accompagné avec tendresse. Tu prends le temps de t'ouvrir, mais une fois que tu donnes ton cœur, tu aimes avec une intensité et une sincérité rares. En amitié, tu es le compagnon chaleureux et spontané, celui avec qui on vit de bons moments et qui apporte de la légèreté et du beau.

Tes défis sont les revers de ta nature : ton goût de la spontanéité peut te faire fuir la routine et les contraintes du quotidien, ton hypersensibilité peut te faire vivre les tensions douloureusement, et ta difficulté à te projeter peut compliquer les projets à deux. Ton chemin, c'est d'apprendre à concilier ta liberté avec l'engagement durable, à exprimer ce que tu ressens, et à affronter ce qui doit l'être. Quand tu y parviens, tu offres une relation d'une vivacité et d'une tendresse rares.`,

    "ISFP-V3": `En amour, tu es doux, sincère et fidèle à tes valeurs. Tu exprimes ton amour par les gestes, les attentions, la constance, plus que par les grandes déclarations. Être aimé par toi, c'est se sentir accepté, accompagné avec délicatesse, aimé par quelqu'un dont les valeurs sont solides et la loyauté profonde. Tu as besoin que la relation soit alignée avec ce qui compte pour toi, et une fois engagé, tu aimes avec une fidélité et une intensité rares. En amitié, tu es l'ami fidèle et intègre, celui qui défend les siens et reste loyal.

Tes défis sont les revers de ta nature : ton idéalisme peut te faire attendre beaucoup de la relation et être déçu quand le réel ne suit pas, ton hypersensibilité peut te faire vivre les tensions douloureusement, et ton évitement du conflit peut laisser des choses non dites. Ton chemin, c'est d'apprendre à aimer le réel autant que l'idéal, à exprimer ce que tu ressens, et à ne pas te replier quand ça frotte. Quand tu y parviens, tu offres une relation d'une profondeur et d'une fidélité rares.`,
  },

  // ~2 paragraphes (« Ta carrière » / « Ta façon de travailler »).
  proTexte: {
    "ISFP-V1": `Au travail, tu es à ton aise dans les métiers où l'on crée, où l'on exprime, où l'on travaille dans le respect de ses valeurs et avec de l'autonomie. Une carrière qui te convient te laisse de la liberté, du sens, et la possibilité de mettre ta sensibilité et ta créativité au travail. Tu t'éteins dans la bureaucratie rigide et les environnements impersonnels, et tu prends vie dans tout ce qui touche à la création et à l'expression : arts, artisanat, design, métiers de la nature, soin, cuisine, mode, métiers manuels et sensoriels.

Tu travailles avec sensibilité, authenticité et soin, et tu apportes cette dimension humaine et créative que les autres n'apportent pas. En revanche, la compétition féroce, le micro-management et les cadres contraignants te démotivent profondément. Ton défi principal touche à la projection et à la structure : ta créativité est rarement en cause, mais la difficulté à planifier, à concrétiser dans la durée, et l'hypersensibilité à la critique peuvent te coûter. Apprendre à structurer ton action et à recevoir les retours sans t'effondrer donne toute sa portée à ton talent.`,

    "ISFP-V2": `Au travail, tu es à ton aise dans les métiers concrets, sensoriels et créatifs, où l'on travaille avec ses mains, ses sens, dans le respect de ses valeurs et avec de la liberté. Une carrière qui te convient te laisse de l'autonomie, du concret, du beau, et la possibilité de vivre ce que tu fais. Tu t'éteins dans la bureaucratie et les environnements impersonnels, et tu prends vie dans tout ce qui touche au concret et au sensible : arts, artisanat, design, métiers de la nature, cuisine, mode, soin, métiers manuels.

Tu travailles avec sensibilité, spontanéité et goût du concret, et l'on apprécie auprès de toi cette dimension vivante et sensible, cette capacité à t'adapter à l'instant. En revanche, la contrainte rigide, la routine et les environnements froids te pèsent. Ton défi principal touche à la projection et à la structure : ton talent est rarement en cause, mais la difficulté à planifier, à concrétiser dans la durée, et l'impulsivité peuvent te coûter. Apprendre à structurer ton action et à t'inscrire dans le temps donne toute sa portée à ton talent.`,

    "ISFP-V3": `Au travail, tu es à ton aise dans les métiers qui ont du sens, où l'on peut servir ses valeurs et contribuer à quelque chose de juste, dans un cadre respectueux et avec de l'autonomie. Une carrière qui te convient te permet d'aligner ce que tu fais avec ce en quoi tu crois. Tu t'éteins dans le purement commercial et les environnements impersonnels, et tu prends vie dans tout ce qui touche au sens et au soin : métiers d'aide, causes, soin, éducation, création engagée, métiers de la nature, artisanat porteur de sens.

Tu travailles avec sincérité, sens et fidélité à tes valeurs, et l'on apprécie auprès de toi cette dimension de conviction et d'authenticité. En revanche, le cynisme, le purement commercial et ce qui heurte tes convictions te démotivent. Ton défi principal touche à la projection, à la structure et au réalisme : ton intégrité est rarement en cause, mais l'idéalisme déçu, la difficulté à structurer et l'hypersensibilité peuvent te coûter. Apprendre à ancrer tes idéaux dans le réel et à structurer ton action donne toute sa portée à ton engagement.`,
  },

  // { apercu } : 1 paragraphe d'accroche (intro de « Ton chemin de croissance »).
  mindsetTexte: {
    "ISFP-V1": {
      apercu: `Ton plus grand chantier n'est pas autour de toi, il est en toi. Tu portes une sensibilité et une authenticité rares, mais aussi des fragilités qui peuvent se retourner contre toi : l'hypersensibilité à la critique, le repli, la dévalorisation, la difficulté à donner corps à ce que tu portes. La bonne nouvelle, c'est que ces fragilités sont aussi tes plus grands leviers de croissance, à condition de savoir où appuyer.`,
    },
    "ISFP-V2": {
      apercu: `Ton plus grand chantier n'est pas de savourer l'instant, tu le fais déjà mieux que personne, c'est d'apprendre à construire pour demain sans cesser de vivre aujourd'hui. Tu portes une présence au monde et une sensibilité immenses, mais aussi une tendance à l'impulsivité, à fuir ce qui pèse et à négliger l'avenir. La bonne nouvelle, c'est que ces fragilités sont aussi tes plus grands leviers de croissance, à condition de savoir où appuyer.`,
    },
    "ISFP-V3": {
      apercu: `Ton plus grand chantier n'est pas de croire en quelque chose, tu y crois déjà profondément, c'est d'apprendre à ancrer tes idéaux dans le réel sans t'y briser. Tu portes des convictions et une sensibilité à la justice rares, mais aussi un idéalisme qui peut se désillusionner, un penchant au repli et une difficulté à structurer. La bonne nouvelle, c'est que ces fragilités sont aussi tes plus grands leviers de croissance, à condition de savoir où appuyer.`,
    },
  },

  sectionDetail: {
    // ===================== ISFP-V1 (Artiste Sensible) =====================
    "ISFP-V1-relations": {
      forces: [
        { titre: "Une présence authentique", accent: "authentique", texte: "Avec toi, pas de calcul : on se sent accepté tel qu'on est et aimé d'une façon sincère qui inspire confiance." },
        { titre: "Une écoute sans jugement", accent: "écoute", texte: "Tu accueilles les autres comme ils sont et tu offres un espace où l'on se sent libre d'être soi." },
        { titre: "Une tendresse délicate", accent: "tendresse", texte: "Tu exprimes ton amour par les gestes et les attentions, avec une douceur qui touche en profondeur." },
        { titre: "Une loyauté discrète", accent: "loyauté", texte: "Une fois que tu donnes ton cœur, tu aimes avec une intensité et une fidélité rares, sans le clamer." },
        { titre: "Une profondeur émotionnelle", accent: "profondeur", texte: "Ta réserve cache une vie émotionnelle intense qui rend ton amour d'autant plus précieux qu'il est vrai." },
        { titre: "Le goût des liens vrais", accent: "vrais", texte: "Tu préfères quelques amitiés profondes et sincères à un large cercle de surface." },
      ],
      ombres: [
        { titre: "Une hypersensibilité aux tensions", accent: "hypersensibilité", texte: "Tu peux vivre les frictions douloureusement et te replier au moindre jugement perçu." },
        { titre: "Le repli devant le conflit", accent: "repli", texte: "Tu peux te retirer plutôt qu'affronter, et taire ce qui te blesse au lieu de l'exprimer." },
        { titre: "Des besoins non verbalisés", accent: "besoins", texte: "Ta difficulté à dire ce dont tu as besoin peut laisser l'autre dans le flou." },
        { titre: "Le non-dit qui s'accumule", accent: "non-dit", texte: "Ton évitement du conflit peut laisser des choses tues s'entasser jusqu'à peser sur le lien." },
        { titre: "La critique vécue comme atteinte", accent: "critique", texte: "Une remarque peut être ressentie comme une attaque contre ce que tu es plutôt qu'un simple retour." },
        { titre: "Un monde gardé pour toi", accent: "gardé", texte: "Tu protèges tant ton monde intérieur que l'autre peut peiner à te lire et à t'atteindre vraiment." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "Les jugements durs qui heurtent ta sensibilité.",
            "Les faux-semblants et le manque de sincérité.",
            "Le contrôle et la pression qui rognent ta liberté.",
            "Les conflits agressifs qui te font te replier.",
            "Le manque de respect pour tes valeurs profondes.",
          ],
        },
        {
          ton: "positif",
          items: [
            "Une connexion sincère qui respecte ta liberté.",
            "Quelqu'un qui sait voir et accueillir ta profondeur.",
            "De la douceur et de la bienveillance au quotidien.",
            "Le respect de tes valeurs et de ton rythme intérieur.",
            "Un espace où tu peux exprimer ce que tu portes.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Les tempéraments très durs, critiques ou autoritaires.",
            "Les profils qui heurtent ta sensibilité par leur dureté.",
            "Les personnalités qui ne respectent pas ta liberté.",
          ],
          profils: [
            { code: "ESTJ", raison: "son autorité et son attachement aux règles peuvent heurter ta sensibilité et brider ta liberté." },
            { code: "ENTJ", raison: "sa franchise tranchante et son exigence peuvent te paraître dures et te faire te replier." },
            { code: "ESTP", raison: "son côté direct et terre-à-terre peut sembler insensible à ta profondeur." },
          ],
        },
        {
          ton: "positif",
          items: [
            "Les tempéraments authentiques, sensibles et respectueux de la liberté.",
            "Ceux qui savent accueillir ta profondeur sans la heurter.",
            "Les profils qui t'aident à exprimer et à faire advenir ce que tu portes.",
          ],
          profils: [
            { code: "INFP", raison: "son authenticité et son monde intérieur résonnent profondément avec ta sensibilité." },
            { code: "ISFJ", raison: "sa douceur fiable et son attention créent un cocon sûr où ta profondeur s'épanouit." },
            { code: "INFJ", raison: "sa profondeur et sa quête de sens rejoignent ta richesse intérieure dans une connexion vraie." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Tu aimes d'une tendresse vraie et profonde,\nmais ta sensibilité peut te faire te replier au lieu de partager ce que tu ressens.",
        lumiere:
          "Ta sincérité, ta douceur et ta façon d'accueillir sans juger font de toi un partenaire et un ami d'une authenticité rare.",
        ombre:
          "Mais à te replier devant le conflit, à taire tes besoins et à vivre chaque tension comme une atteinte, tu peux fragiliser les liens que tu chéris.",
        bascule:
          "Le jour où tu oses exprimer ce que tu ressens et ne fuis plus ce qui frotte, tu offres une relation d'une tendresse et d'une profondeur rares.",
      },
    },
    "ISFP-V1-carriere": {
      forces: [
        { titre: "Un moteur, le sens", accent: "sens", texte: "Quand ton travail respecte tes valeurs et te laisse libre, tu t'investis avec cœur et profondeur." },
        { titre: "Une créativité sensible", accent: "créativité", texte: "Tu mets du sens et de la beauté dans ce que tu fais et tu donnes forme à ta vie intérieure." },
        { titre: "Une attention à la qualité", accent: "qualité", texte: "Tu apportes une touche personnelle et un soin du détail que les esprits purement fonctionnels n'ont pas." },
        { titre: "Une authenticité au travail", accent: "authenticité", texte: "Tu restes fidèle à toi-même et tu apportes une dimension humaine que les autres n'apportent pas." },
        { titre: "Une perception fine", accent: "perception", texte: "Ta sensibilité te fait saisir des nuances et des ambiances qui enrichissent ce que tu produis." },
        { titre: "Le goût du concret", accent: "concret", texte: "Tu donnes corps à ce que tu ressens par le geste, la matière, l'expression tangible." },
      ],
      ombres: [
        { titre: "Du mal à te projeter", accent: "projeter", texte: "La planification et l'action à long terme ne sont pas ton terrain naturel." },
        { titre: "Une difficulté à structurer", accent: "structurer", texte: "Le suivi, l'organisation et la concrétisation dans la durée peuvent te coûter." },
        { titre: "Une hypersensibilité aux retours", accent: "hypersensibilité", texte: "Une critique peut te toucher fort et te faire douter de ta valeur." },
        { titre: "Une difficulté avec la contrainte", accent: "contrainte", texte: "Le micro-management, la rigidité et les environnements froids t'éteignent." },
        { titre: "Un rapport secondaire à l'argent", accent: "argent", texte: "Peu matérialiste, tu peux négliger la projection et l'organisation financière." },
        { titre: "La beauté restée à l'état de potentiel", accent: "potentiel", texte: "Faute de structurer, ta richesse peut rester inaboutie au lieu de prendre forme." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "La bureaucratie rigide et les procédures impersonnelles.",
            "Le micro-management qui rogne ton autonomie.",
            "La compétition féroce et les rapports de force.",
            "Les environnements froids et dénués de sens.",
            "Les contraintes qui heurtent tes valeurs.",
          ],
        },
        {
          ton: "positif",
          items: [
            "De la liberté et de l'autonomie dans ta façon de faire.",
            "Du sens et de l'alignement avec tes valeurs.",
            "La possibilité de créer et d'exprimer ta sensibilité.",
            "Un cadre respectueux et bienveillant.",
            "De la place pour la qualité et la beauté.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Les environnements bureaucratiques et impersonnels.",
            "Les cadres rigides et la pression compétitive.",
            "Le travail froid et dénué de sens.",
          ],
          profils: [
            { nom: "Administration rigide, procédures", raison: "aucune place pour ta créativité ni pour l'expression de qui tu es." },
            { nom: "Vente sous pression, compétition", raison: "les rapports de force et la dureté heurtent ta sensibilité." },
            { nom: "Postes froids et impersonnels", raison: "l'absence de sens et de chaleur t'éteint." },
          ],
        },
        {
          ton: "positif",
          items: [
            "Les arts, l'artisanat et le design.",
            "Les métiers du soin, de la nature et du sensoriel.",
            "Les métiers manuels où la beauté a sa place.",
          ],
          profils: [
            { nom: "Arts, artisanat & design", raison: "artiste, artisan, designer : donner forme à ce que tu ressens et le rendre beau." },
            { nom: "Soin, nature & sensoriel", raison: "soignant, métiers de la nature, cuisine : mettre ta sensibilité et ton soin au travail." },
            { nom: "Mode & métiers manuels", raison: "création manuelle où la qualité et l'expression personnelle comptent." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Tu donnes le meilleur quand tu peux créer et rester libre,\nmais sans un peu de structure, ta belle richesse peine à se concrétiser.",
        lumiere:
          "Porté par le sens et la sensibilité, tu apportes une créativité, une authenticité et un soin de la qualité rares.",
        ombre:
          "Mais ta difficulté à te projeter et à structurer, et ton hypersensibilité aux retours, peuvent laisser ton talent inabouti.",
        bascule:
          "Le jour où tu te donnes un cap et où tu reçois la critique sans t'effondrer, ta sensibilité créatrice se transforme en réalisations durables.",
      },
    },
    "ISFP-V1-developpement": {
      evolution: `Ta personnalité n'est pas figée : elle mûrit, et ton type suit une trajectoire de croissance assez nette. Plus jeune, tu es surtout porté par ta sensibilité et ton besoin d'authenticité : ressentir, exprimer, rester fidèle à toi, vivre selon tes valeurs. C'est précieux, mais souvent déséquilibré : tu peux être hypersensible, te replier, fuir le conflit, te dévaloriser, et peiner à donner corps à ta richesse intérieure.

Avec le temps, tu réalises que ta sensibilité est une force quand tu apprends à la protéger sans t'en faire une prison, que recevoir une critique ne menace pas qui tu es, et que te projeter te permet de faire advenir ce que tu portes. Tu apprends à t'affirmer, à exprimer, à structurer, sans rien perdre de ta profondeur. Dans ta pleine maturité, tu deviens un artiste qui ressent profondément ET fait advenir : sensible, authentique, mais aussi capable de partager et de donner forme à ce qu'il porte. Et c'est entièrement à ta portée.`,
      etapes: [
        "Tu es déjà sensible et fidèle à ce qui résonne en toi, tu ressens fort et tu cherches à exprimer ce que tu portes. L'âme tournée vers le vrai et le beau.",
        "Ta sensibilité est à son comble : tu ressens intensément, tu tiens à ton authenticité, tu vis selon tes valeurs. C'est précieux, mais souvent déséquilibré : tu peux te replier, fuir le conflit, te dévaloriser, et avoir du mal à donner corps à ta richesse.",
        "Tu comprends que ta sensibilité est une force quand elle ne te fait pas prisonnier, et que te projeter te permet de faire advenir ce que tu portes. Tu apprends à t'affirmer, à exprimer, à structurer, sans rien perdre de ta profondeur.",
        "Dans ta pleine maturité, tu es un artiste qui ressent profondément et fait advenir. Tu donnes au monde ta richesse au lieu de seulement la protéger : la version la plus accomplie de toi.",
      ],
      leviersForts: [
        { titre: "Apprends à faire advenir ce que tu portes", texte: "Te fixer un cap, structurer un minimum et passer à l'action donne corps à ta richesse intérieure au lieu de la laisser à l'état de potentiel." },
        { titre: "Protège ta sensibilité sans t'en faire une prison", texte: "Apprends à recevoir la critique sans la vivre comme une atteinte. Ta sensibilité est une force quand elle ne te rend pas prisonnier." },
        { titre: "Exprime ce que tu ressens", texte: "Mettre des mots sur ton monde intérieur et ne pas fuir les sujets difficiles allège tes relations et te fait te sentir vu." },
        { titre: "Accorde-toi la bienveillance que tu offres", texte: "Tu offres aux autres une douceur immense : offre-toi la même et cesse de te juger plus durement que tu ne jugerais quiconque." },
      ],
      questions: [
        { situation: "Quand une critique te touche", question: "Est-ce une atteinte à ce que je suis, ou juste un retour que je peux accueillir sans m'effondrer ?" },
        { situation: "Quand un conflit se présente", question: "Est-ce que je me replie, ou j'ose dire ce que je ressens vraiment ?" },
        { situation: "Quand tu te dévalorises", question: "Est-ce que je me parle avec la bienveillance que j'offrirais à un ami ?" },
        { situation: "Quand une idée te tient à cœur", question: "Quelle première étape concrète puis-je faire pour lui donner corps ?" },
        { situation: "Quand tu gardes tout pour toi", question: "Et si oser montrer ce que je porte le rendait plus fort, pas plus vulnérable ?" },
      ],
      paradoxe: {
        tension:
          "Pour vivre pleinement ta sensibilité, tu dois oser la partager et la faire advenir,\nmais tu crains qu'en l'exposant, tu la rendes plus vulnérable.",
        lumiere:
          "Ta profondeur, ton authenticité et ta finesse sont une base de croissance immense : tu as déjà tout en toi pour créer du vrai et du beau.",
        ombre:
          "Mais à te replier, à te dévaloriser et à garder ta richesse pour toi, ta sensibilité peut rester une prison plutôt qu'une force.",
        bascule:
          "Le jour où tu comprends que donner ce que tu portes ne te fragilise pas mais te révèle, ta croissance s'enclenche vraiment.",
      },
    },

    // ===================== ISFP-V2 (Aventurier des Sens) =====================
    "ISFP-V2-relations": {
      forces: [
        { titre: "Une présence qui fait vivre", accent: "vivre", texte: "Avec toi, le quotidien se savoure : tu apportes de la joie, des expériences et le goût du moment présent." },
        { titre: "Une tendresse spontanée", accent: "tendresse", texte: "Tu exprimes ton amour par les gestes et les attentions du quotidien, avec une douceur sincère." },
        { titre: "Une ouverture sans jugement", accent: "ouverture", texte: "Tu acceptes les gens comme ils sont et tu crées un espace où l'on se sent libre d'être soi." },
        { titre: "Une loyauté discrète", accent: "loyauté", texte: "Une fois que tu donnes ton cœur, tu aimes avec une intensité et une sincérité rares." },
        { titre: "Le sens du beau partagé", accent: "beau", texte: "Tu sais faire goûter à l'autre la beauté des moments et apporter de la légèreté dans le lien." },
        { titre: "Une présence émotionnelle vraie", accent: "vraie", texte: "Ta réserve cache une vie émotionnelle intense qui rend ton amour d'autant plus précieux qu'il est vrai." },
      ],
      ombres: [
        { titre: "La fuite de la routine", accent: "fuite", texte: "Ton goût de la spontanéité peut te faire fuir le quotidien et les contraintes de la relation." },
        { titre: "Une hypersensibilité aux tensions", accent: "hypersensibilité", texte: "Tu peux vivre les frictions douloureusement et te replier au moindre jugement perçu." },
        { titre: "Du mal à te projeter à deux", accent: "projeter", texte: "Ta difficulté à te projeter peut compliquer les projets communs et l'engagement durable." },
        { titre: "Une impulsivité possible", accent: "impulsivité", texte: "Ton goût de l'instant peut te faire agir sans toujours penser à l'effet sur le lien." },
        { titre: "Le lien négligé dans la durée", accent: "négligé", texte: "Ton attention au présent peut te faire oublier d'entretenir le lien sur le long terme." },
        { titre: "Des besoins peu dits", accent: "besoins", texte: "Tu peux laisser des choses non exprimées s'accumuler plutôt que d'affronter ce qui pèse." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "La routine figée et le quotidien sans souffle.",
            "Les contraintes rigides qui rognent ta liberté.",
            "Les jugements durs qui heurtent ta sensibilité.",
            "Le contrôle et la pression qui t'étouffent.",
            "Les tensions qu'on laisse pourrir sans rien dire.",
          ],
        },
        {
          ton: "positif",
          items: [
            "Des expériences et des moments à savourer ensemble.",
            "Une connexion sincère qui respecte ta liberté.",
            "Quelqu'un qui aime vivre et savourer comme toi.",
            "De la douceur, de la légèreté et de la spontanéité.",
            "Un partenaire qui t'aide à t'ancrer sans t'enfermer.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Les tempéraments très rigides ou contraignants.",
            "Les profils critiques qui heurtent ta sensibilité.",
            "Les personnalités qui rognent ton besoin de liberté.",
          ],
          profils: [
            { code: "ESTJ", raison: "son attachement aux règles et à la routine cadre mal avec ton besoin de liberté." },
            { code: "ENTJ", raison: "son exigence et sa franchise tranchante peuvent te paraître dures et contraignantes." },
            { code: "ISTJ", raison: "son goût de la routine et de la structure peut étouffer ta spontanéité." },
          ],
        },
        {
          ton: "positif",
          items: [
            "Les tempéraments authentiques et amateurs d'expérience.",
            "Ceux qui partagent ton goût du présent et respectent ta liberté.",
            "Les profils posés qui t'apportent stabilité et ancrage.",
          ],
          profils: [
            { code: "ESFP", raison: "il partage ton goût de l'instant et de l'expérience, dans une connexion vivante et joyeuse." },
            { code: "ISFP", raison: "sa sensibilité et son amour de la beauté résonnent avec ta façon de savourer le monde." },
            { code: "ISFJ", raison: "sa présence posée et fiable t'ancre et te montre la valeur de ce qui dure." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Tu fais vivre la relation par ta présence et ta spontanéité,\nmais ton goût de l'instant peut te faire fuir la routine et négliger ce qui se construit à deux.",
        lumiere:
          "Ta joie, ta tendresse et ton art de savourer font de toi un partenaire et un ami auprès de qui on se sent vivant.",
        ombre:
          "Mais à fuir le quotidien, à vivre les tensions trop fort et à peiner à te projeter, tu peux fragiliser les liens que tu chéris.",
        bascule:
          "Le jour où tu concilies ta liberté avec l'engagement durable et où tu entretiens le lien dans le temps, tu offres une relation d'une vivacité et d'une tendresse rares.",
      },
    },
    "ISFP-V2-carriere": {
      forces: [
        { titre: "Un goût du concret", accent: "concret", texte: "Tu es à ton meilleur dans le travail manuel, sensoriel et créatif, là où l'on vit ce que l'on fait." },
        { titre: "Une sensibilité au beau", accent: "beau", texte: "Tu apportes une attention à la qualité et à l'esthétique que d'autres n'ont pas." },
        { titre: "Une capacité d'adaptation", accent: "adaptation", texte: "Tu sais saisir l'instant et t'ajuster avec souplesse à ce qui se présente." },
        { titre: "Une présence vivante", accent: "vivante", texte: "Tu mets du cœur et de la présence dans ce que tu fais, une dimension humaine appréciée." },
        { titre: "Une authenticité au travail", accent: "authenticité", texte: "Tu restes fidèle à toi-même et tu travailles bien quand on te laisse vivre ce que tu fais." },
        { titre: "Un sens de l'expérience directe", accent: "expérience", texte: "Tu apprends et tu donnes le meilleur par la pratique et le contact direct avec le réel." },
      ],
      ombres: [
        { titre: "Du mal à te projeter", accent: "projeter", texte: "Ton ancrage dans le présent rend difficiles la planification et l'action à long terme." },
        { titre: "Une impulsivité possible", accent: "impulsivité", texte: "Ton goût de l'instant peut te faire agir sans penser aux conséquences." },
        { titre: "Une difficulté à structurer", accent: "structurer", texte: "Le suivi et l'organisation dans la durée ne sont pas ton terrain naturel." },
        { titre: "Une fuite de la contrainte", accent: "fuite", texte: "La routine, le micro-management et les cadres rigides te pèsent et t'éteignent." },
        { titre: "Une hypersensibilité aux retours", accent: "hypersensibilité", texte: "Une critique peut te toucher fort et te faire douter de toi." },
        { titre: "Un rapport au présent à l'argent", accent: "argent", texte: "Tu dépenses pour vivre des choses et peux négliger l'épargne et la projection." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "La bureaucratie et les procédures impersonnelles.",
            "La routine et les tâches répétitives.",
            "Le micro-management qui rogne ton autonomie.",
            "La pression compétitive et les rapports de force.",
            "Les environnements froids et dénués de concret.",
          ],
        },
        {
          ton: "positif",
          items: [
            "De la liberté et de l'autonomie dans ta façon de faire.",
            "Du concret, du sensoriel et de la création.",
            "La possibilité de vivre ce que tu fais.",
            "Un cadre respectueux de tes valeurs.",
            "De la variété et de la place pour la beauté.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Les milieux bureaucratiques et rigides.",
            "Le travail abstrait et théorique sans contact au réel.",
            "Les environnements froids et impersonnels.",
          ],
          profils: [
            { nom: "Administration rigide, procédures", raison: "la routine et la rigidité éteignent ton goût de l'instant et du concret." },
            { nom: "Théorie pure, abstraction", raison: "loin du sensoriel et de l'expérience directe où tu donnes le meilleur." },
            { nom: "Postes froids et impersonnels", raison: "l'absence de concret et de vie t'éteint." },
          ],
        },
        {
          ton: "positif",
          items: [
            "Les arts, l'artisanat et le design.",
            "Les métiers de la nature, de la cuisine et du sensoriel.",
            "La mode, le soin et les métiers manuels.",
          ],
          profils: [
            { nom: "Arts, artisanat & design", raison: "créer de ses mains et savourer la matière et la beauté du geste." },
            { nom: "Nature, cuisine & sensoriel", raison: "métiers de la nature, cuisine : vivre par l'expérience directe et les sens." },
            { nom: "Mode, soin & métiers manuels", raison: "travail concret où le goût du beau et la présence comptent." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Tu donnes le meilleur dans le concret vécu et l'instant,\nmais sans un peu de projection, ton talent peine à s'inscrire dans la durée.",
        lumiere:
          "Porté par le concret et la sensibilité, tu apportes une présence vivante, un goût du beau et une capacité d'adaptation rares.",
        ombre:
          "Mais ta difficulté à te projeter, à structurer et ton impulsivité peuvent freiner ta progression.",
        bascule:
          "Le jour où tu te fixes un cap et où tu inscris ton énergie dans le temps, ton talent vivant se transforme en réalisations durables.",
      },
    },
    "ISFP-V2-developpement": {
      evolution: `Ta personnalité n'est pas figée : elle mûrit, et ton type suit une trajectoire de croissance assez nette. Plus jeune, tu es surtout porté par ton goût de l'expérience et du présent : vivre, savourer, saisir l'instant, suivre tes envies. C'est intense, mais souvent déséquilibré : tu peux être impulsif, fuir les contraintes, peiner à te projeter, te montrer hypersensible, et passer à côté de ce qui se construit dans la durée.

Avec le temps, tu réalises qu'on peut se projeter sans renoncer à l'instant, que construire pour demain ne tue pas la joie d'aujourd'hui, et que canaliser ta spontanéité ouvre des possibilités. Tu apprends à structurer un peu, à te projeter, à inscrire ton énergie dans la durée, sans rien perdre de ta présence au monde. Dans ta pleine maturité, tu deviens un esthète qui vit pleinement ET construit : présent, sensible, spontané, mais aussi capable de donner corps à ce qu'il porte. Et c'est entièrement à ta portée.`,
      etapes: [
        "Tu savoures déjà l'instant à pleins sens, tu vis spontanément et tu cherches la beauté partout. Le monde est une expérience à goûter pleinement.",
        "Ton goût du présent est à son comble : tu vis intensément, tu suis tes envies, tu saisis l'instant. C'est intense, mais souvent déséquilibré : tu peux être impulsif, fuir les contraintes, peiner à te projeter, et passer à côté de ce qui dure.",
        "Tu comprends qu'on peut se projeter sans renoncer à l'instant et que construire ne tue pas la joie. Tu apprends à canaliser ta spontanéité, à te projeter, à inscrire ton énergie dans la durée, sans rien perdre de ta présence au monde.",
        "Dans ta pleine maturité, tu es un esthète qui vit pleinement et construit. La joie de l'instant alliée à la capacité de bâtir : la version la plus accomplie de toi.",
      ],
      leviersForts: [
        { titre: "Apprends à te projeter", texte: "Te fixer un cap et penser à demain, sans renier ton goût de l'instant, transforme ta vivacité en réalisations durables." },
        { titre: "Canalise ta spontanéité", texte: "Ton élan est une force : oriente-le et pose-toi quelques garde-fous, sans tuer ta joie. La spontanéité dirigée enrichit ta vie." },
        { titre: "Inscris ton énergie dans la durée", texte: "Apprends à construire et à entretenir dans le temps ce qui compte, tes projets comme tes liens. La durée donne du poids à ce que tu vis." },
        { titre: "Protège ta sensibilité sans t'en faire une prison", texte: "Apprends à recevoir la critique sans la vivre comme une atteinte. Ta sensibilité est une force quand elle ne te fragilise pas." },
      ],
      questions: [
        { situation: "Quand une occasion t'emballe", question: "Est-ce que je la saisis en pensant à demain, ou juste pour l'instant présent ?" },
        { situation: "Quand une contrainte te pèse", question: "Est-ce que je la fuis, ou je l'affronte à ma façon pour ne pas laisser le problème grossir ?" },
        { situation: "Quand un projet demande de durer", question: "Quelle petite structure pourrais-je me donner pour le mener au bout sans m'éteindre ?" },
        { situation: "Quand une critique te touche", question: "Est-ce une atteinte à ce que je suis, ou un retour que je peux accueillir sereinement ?" },
        { situation: "Quand tu ne penses qu'au présent", question: "Qu'est-ce que je veux que ma vie ait construit dans quelques années ?" },
      ],
      paradoxe: {
        tension:
          "Pour faire durer ce que tu vis, tu dois te projeter et structurer un peu,\nmais tu crains qu'en planifiant, tu éteignes ta joie de l'instant.",
        lumiere:
          "Ta présence au présent, ta sensibilité au beau et ta spontanéité sont une base de croissance immense : tu sais vivre pleinement comme peu de gens.",
        ombre:
          "Mais à l'impulsivité, à la fuite des contraintes et à l'absence de projection, ta belle vivacité peut se disperser sans rien laisser.",
        bascule:
          "Le jour où tu comprends que construire pour demain ne tue pas la joie d'aujourd'hui mais lui donne une assise, ta croissance s'enclenche vraiment.",
      },
    },

    // ===================== ISFP-V3 (Doux Idéaliste) =====================
    "ISFP-V3-relations": {
      forces: [
        { titre: "Une fidélité fondée sur les valeurs", accent: "fidélité", texte: "Une fois engagé, tu aimes avec une loyauté profonde, ancrée dans ce en quoi tu crois." },
        { titre: "Une sincérité solide", accent: "sincérité", texte: "Tu offres une présence vraie, fondée sur des valeurs claires, qui inspire confiance et respect." },
        { titre: "Une tendresse constante", accent: "tendresse", texte: "Tu exprimes ton amour par les gestes, les attentions et la constance, avec une douceur fiable." },
        { titre: "Un soutien qui défend", accent: "soutien", texte: "Tu défends les tiens et tu restes loyal, avec une présence douce mais ferme." },
        { titre: "Une profondeur émotionnelle", accent: "profondeur", texte: "Ta douceur cache une fermeté de valeurs qui rend ton amour d'autant plus solide qu'il est fondé." },
        { titre: "Le goût des liens de sens", accent: "sens", texte: "Tu construis tes liens sur les valeurs partagées et le respect mutuel plus que sur la quantité." },
      ],
      ombres: [
        { titre: "Des attentes idéalistes", accent: "attentes", texte: "Ton idéalisme peut te faire attendre beaucoup de la relation et être déçu quand le réel ne suit pas." },
        { titre: "Une hypersensibilité aux tensions", accent: "hypersensibilité", texte: "Tu peux vivre les frictions douloureusement et te replier au moindre jugement perçu." },
        { titre: "Le repli devant le conflit", accent: "repli", texte: "Ton évitement du conflit peut laisser des choses non dites s'accumuler dans le lien." },
        { titre: "Un jugement parfois dur", accent: "jugement", texte: "Ton idéalisme peut te faire juger sévèrement ce qui heurte tes valeurs chez l'autre." },
        { titre: "Une déception face à l'imperfection", accent: "déception", texte: "Tu peux mal accueillir les défauts de l'autre quand ils s'éloignent de ce que tu espérais." },
        { titre: "Des besoins peu exprimés", accent: "besoins", texte: "Tu peux taire ce que tu ressens et ce dont tu as besoin plutôt que d'affronter ce qui frotte." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "Le cynisme et l'indifférence aux valeurs.",
            "Les jugements durs qui heurtent ta sensibilité.",
            "Les tensions qu'on laisse pourrir sans rien dire.",
            "Le manque de respect pour ce qui compte pour toi.",
            "Le contrôle et la pression qui t'étouffent.",
          ],
        },
        {
          ton: "positif",
          items: [
            "Quelqu'un qui partage ou respecte tes valeurs.",
            "Une connexion sincère qui accueille ta profondeur.",
            "Une relation alignée avec ce qui compte pour toi.",
            "De la douceur, de la loyauté et du respect mutuel.",
            "Un partenaire qui t'aide à aimer le réel autant que l'idéal.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Les tempéraments très cyniques ou durs.",
            "Les profils indifférents aux valeurs.",
            "Les personnalités qui heurtent tes convictions.",
          ],
          profils: [
            { code: "ESTP", raison: "son côté terre-à-terre et son détachement des valeurs peuvent te paraître insensibles." },
            { code: "ENTJ", raison: "son pragmatisme tranchant peut juger ton idéalisme naïf et heurter tes convictions." },
            { code: "ESTJ", raison: "son attachement aux règles plus qu'au sens peut entrer en friction avec ta boussole morale." },
          ],
        },
        {
          ton: "positif",
          items: [
            "Les tempéraments authentiques et porteurs de valeurs.",
            "Ceux qui partagent ton sens de la justice et respectent ta profondeur.",
            "Les profils pragmatiques qui t'aident à composer avec le réel.",
          ],
          profils: [
            { code: "INFP", raison: "son authenticité et ses idéaux résonnent profondément avec ta boussole morale." },
            { code: "INFJ", raison: "sa profondeur et son sens de la justice rejoignent tes convictions dans une connexion vraie." },
            { code: "ISFJ", raison: "sa fiabilité et son ancrage t'aident à composer avec le réel et à concrétiser." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Tu aimes d'une fidélité fondée sur des valeurs solides,\nmais ton idéalisme peut te faire attendre du lien une perfection que le réel n'atteint jamais.",
        lumiere:
          "Ta sincérité, ta loyauté et ta fermeté de valeurs font de toi un partenaire et un ami d'une profondeur et d'une fidélité rares.",
        ombre:
          "Mais à attendre trop, à juger durement l'imperfection et à te replier devant le conflit, tu peux fragiliser les liens que tu chéris.",
        bascule:
          "Le jour où tu aimes le réel autant que l'idéal et où tu oses dire ce qui frotte, tu offres une relation d'une profondeur et d'une fidélité rares.",
      },
    },
    "ISFP-V3-carriere": {
      forces: [
        { titre: "Un moteur, le sens", accent: "sens", texte: "Quand tu crois en ce que tu fais, tu t'investis avec cœur, intégrité et fidélité à tes valeurs." },
        { titre: "Une intégrité solide", accent: "intégrité", texte: "Tu apportes une attention à ce qui est juste et une cohérence qui inspirent confiance." },
        { titre: "Une sensibilité à la justice", accent: "justice", texte: "Tu donnes le meilleur quand ton travail sert une cause ou des valeurs qui te touchent." },
        { titre: "Une action concrète et constante", accent: "constance", texte: "Tu défends tes valeurs par des actes du quotidien, avec une persévérance tranquille." },
        { titre: "Une authenticité au travail", accent: "authenticité", texte: "Tu restes fidèle à toi-même et tu apportes une conviction qui donne du sens à l'action commune." },
        { titre: "Une douceur qui apaise", accent: "douceur", texte: "Ta fermeté sur le fond et ta douceur dans la forme font de toi quelqu'un de respecté et d'apaisant." },
      ],
      ombres: [
        { titre: "Un idéalisme déçu", accent: "idéalisme", texte: "Tu peux rejeter des options réalistes parce qu'imparfaites, ou te décevoir quand le réel ne suit pas." },
        { titre: "Une difficulté à structurer", accent: "structurer", texte: "L'organisation et la projection dans la durée rendent ton action moins efficace qu'elle pourrait l'être." },
        { titre: "Du mal à te projeter", accent: "projeter", texte: "Ton ancrage dans le présent et ta souplesse compliquent la planification à long terme." },
        { titre: "Une hypersensibilité aux retours", accent: "hypersensibilité", texte: "Une critique, surtout sur tes valeurs, peut te toucher fort et te fragiliser." },
        { titre: "Un repli dans l'adversité", accent: "repli", texte: "Quand le combat semble perdu, tu peux te retirer plutôt que persévérer." },
        { titre: "Un rapport secondaire à l'argent", accent: "argent", texte: "Mû par le sens plus que le gain, tu peux négliger l'organisation matérielle pourtant nécessaire." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "Le purement commercial et lucratif.",
            "Le cynisme et ce qui heurte tes convictions.",
            "Les environnements froids et impersonnels.",
            "La compétition féroce et les rapports de force.",
            "Les contraintes rigides dénuées de sens.",
          ],
        },
        {
          ton: "positif",
          items: [
            "Un travail aligné avec tes valeurs et porteur de sens.",
            "La possibilité de servir une cause ou de l'humain.",
            "De la liberté et de l'autonomie dans ta façon de faire.",
            "Un cadre respectueux et bienveillant.",
            "Des valeurs partagées avec ton entourage.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Les milieux purement commerciaux et cyniques.",
            "Les environnements impersonnels et contraires à tes valeurs.",
            "La compétition agressive et les rapports de force.",
          ],
          profils: [
            { nom: "Vente sous pression, finance pure", raison: "le profit au mépris du sens et des valeurs t'éteint profondément." },
            { nom: "Environnements cyniques", raison: "l'indifférence aux valeurs heurte ta boussole morale." },
            { nom: "Postes froids et impersonnels", raison: "aucune place pour le sens et la conviction qui te portent." },
          ],
        },
        {
          ton: "positif",
          items: [
            "Les métiers d'aide et les causes.",
            "Le soin, l'éducation et la création engagée.",
            "Les métiers de la nature et l'artisanat porteur de sens.",
          ],
          profils: [
            { nom: "Aide & causes", raison: "métiers de l'aide, associatif : servir ce qui est juste et défendre ce qui te touche." },
            { nom: "Soin, éducation & création engagée", raison: "soignant, éducateur, créateur engagé : aligner ton travail avec tes valeurs." },
            { nom: "Nature & artisanat de sens", raison: "métiers de la nature, artisanat porteur de sens où tes convictions trouvent à s'exprimer." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Tu donnes le meilleur quand ton travail sert tes valeurs,\nmais ton idéalisme peut te faire rejeter le réel imparfait et ta difficulté à structurer brider ton impact.",
        lumiere:
          "Porté par le sens et la conviction, tu apportes une intégrité, une authenticité et une constance rares.",
        ombre:
          "Mais l'idéalisme déçu, la difficulté à structurer et l'hypersensibilité peuvent freiner ta progression et limiter ta portée.",
        bascule:
          "Le jour où tu ancres tes idéaux dans le réel et où tu structures ton action, ta conviction se transforme en un engagement qui change vraiment les choses.",
      },
    },
    "ISFP-V3-developpement": {
      evolution: `Ta personnalité n'est pas figée : elle mûrit, et ton type suit une trajectoire de croissance assez nette. Plus jeune, tu es surtout porté par tes convictions et ta sensibilité à la justice : défendre ce qui est juste, rester fidèle à tes valeurs, agir selon ta conscience. C'est précieux, mais souvent déséquilibré : tu peux te heurter douloureusement au réel, te décevoir, te replier quand le monde ne suit pas, te montrer hypersensible, et peiner à structurer ton engagement.

Avec le temps, tu réalises que défendre tes valeurs ne veut pas dire exiger un monde parfait, qu'on transforme le réel pas à pas, et que composer n'est pas renier. Tu apprends à ancrer tes idéaux dans le réel, à structurer ton action, à rester engagé sans te décourager, sans rien perdre de tes convictions. Dans ta pleine maturité, tu deviens un porteur de valeurs qui défend ce qui est juste ET transforme vraiment : fidèle à tes idéaux, mais aussi réaliste, structuré, persévérant. Et c'est entièrement à ta portée.`,
      etapes: [
        "Tu portes déjà un sens aigu de ce qui est juste, tu ressens l'injustice et tu veux agir pour ce qui compte. La conscience tournée vers un monde meilleur.",
        "Ta conviction est à son comble : tu défends tes valeurs, tu agis selon ta conscience, tu refuses ce qui te heurte. C'est précieux, mais souvent déséquilibré : tu peux te briser sur le réel, te replier, te montrer hypersensible, et peiner à structurer.",
        "Tu comprends que défendre tes valeurs ne veut pas dire exiger la perfection et qu'on transforme le réel pas à pas. Tu apprends à composer sans renier, à structurer ton action, à rester engagé sans te décourager.",
        "Dans ta pleine maturité, tu es un porteur de valeurs qui défend ce qui est juste et transforme vraiment. La conviction alliée à l'action efficace sur le réel : la version la plus accomplie de toi.",
      ],
      leviersForts: [
        { titre: "Ancre tes idéaux dans le réel", texte: "Apprends à transformer le monde pas à pas et à composer avec les choses telles qu'elles sont, sans renier ce en quoi tu crois. Tes valeurs ont plus de pouvoir ancrées que brisées." },
        { titre: "Structure ton engagement", texte: "Organiser ton action et te fixer des étapes démultiplie l'impact de tes convictions. La structure ne trahit pas tes idéaux, elle les sert." },
        { titre: "Reste engagé malgré l'adversité", texte: "Ne te replie pas quand le réel résiste. Persévérer, à ton rythme, donne toute sa portée à ce que tu défends." },
        { titre: "Accueille l'imperfection", texte: "Les gens et le monde ne seront jamais parfaitement à la hauteur de tes idéaux, et ce n'est pas grave. L'accepter t'évite l'amertume et te garde dans l'action." },
      ],
      questions: [
        { situation: "Quand le réel déçoit tes idéaux", question: "Est-ce que je peux agir pas à pas, plutôt que d'exiger que tout soit parfait ?" },
        { situation: "Quand un combat semble perdu", question: "Est-ce que je me replie, ou je reste engagé à mon rythme malgré l'adversité ?" },
        { situation: "Quand une critique te touche", question: "Est-ce une atteinte à mes valeurs, ou un retour que je peux accueillir sans m'effondrer ?" },
        { situation: "Quand ton action manque d'effet", question: "Quelle structure pourrais-je me donner pour démultiplier l'impact de mes convictions ?" },
        { situation: "Quand quelqu'un déçoit tes attentes", question: "Est-ce que j'accueille son imperfection, ou je le juge à l'aune d'un idéal inatteignable ?" },
      ],
      paradoxe: {
        tension:
          "Pour que tes idéaux transforment le monde, tu dois les ancrer dans le réel et structurer ton action,\nmais tu crains qu'en composant, tu trahisses ce en quoi tu crois.",
        lumiere:
          "Tes convictions, ta sensibilité à la justice et ta fermeté tranquille sont une base de croissance immense : tu portes déjà le sens de ce qui est juste.",
        ombre:
          "Mais à exiger un monde parfait, à te replier devant l'adversité et à négliger la structure, tes beaux idéaux peuvent se briser sans rien changer.",
        bascule:
          "Le jour où tu comprends que composer et structurer ne trahit pas tes idéaux mais leur donne enfin une prise sur le réel, ta croissance s'enclenche vraiment.",
      },
    },
  },
};

export default isfp;
