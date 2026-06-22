// =============================================================================
// CONTENU DU PROFIL ISFJ (« Défenseur »), 3 variantes.
//   V1 : Protecteur
//   V2 : Gardien du Foyer
//   V3 : Soutien Réfléchi
// Source : rapports longs ISFJ_V1/V2/V3. Gabarit : INFP/ENFP dans profils.ts.
// Voix « tu », aucun tiret long, mot-clé en vert via le champ `accent`.
// =============================================================================

const isfj = {
  // Texte commun au type, affiché sous les barres du spectre.
  traitsTexte: {
    ISFJ: `Ton esprit est tourné vers l'intérieur et vers le concret : tu puises ton énergie dans le calme et l'intimité, et tu es profondément ancré dans le réel, le tangible, les détails qui comptent. Là où d'autres se perdent dans les grandes idées, toi tu remarques ce dont les gens ont besoin, souvent avant eux, et tu te souviens de ce qui touche chacun. Cette mémoire attentive, alliée à une chaleur sincère et à un vrai souci de l'harmonie, fait de toi quelqu'un auprès de qui les autres se sentent en sécurité et choyés.

Derrière ta discrétion se cache un cœur dévoué et d'une fiabilité absolue : tu veilles, tu prends soin, tu honores tes engagements sans bruit et dans la durée. Ce dévouement est ta plus grande force, mais il a son revers : à force de prendre soin des autres, tu peux t'oublier complètement, avoir du mal à dire non et te laisser prendre pour acquis. Tout l'enjeu de ton chemin, c'est d'apprendre à veiller sur toi autant que sur les autres, pour que ta belle générosité dure sans t'épuiser.`,
  },

  // 1 phrase de description par variante (survol des barres de variante).
  descriptions: {
    "ISFJ-V1":
      "Les Protecteurs sont les plus tournés vers le soin actif et la défense de ceux qui comptent. Ils veillent, anticipent les besoins et protègent leurs proches avec un instinct et un dévouement sans faille.",
    "ISFJ-V2":
      "Les Gardiens du Foyer ont le don rare de créer de la chaleur et de l'harmonie. Ils font des lieux et des liens autour d'eux des refuges où chacun se sent accueilli, apaisé et chez soi.",
    "ISFJ-V3":
      "Les Soutiens Réfléchis allient l'attention chaleureuse à une finesse d'observation rare. Ils comprennent en profondeur et offrent le bon soutien, au bon moment, de la bonne façon.",
  },

  // 1 phrase d'accroche (héros) par variante.
  accroches: {
    "ISFJ-V1": "Tu ne parles pas de prendre soin des autres, tu le fais, jour après jour, sans bruit.",
    "ISFJ-V2": "Tu ne décores pas seulement les lieux, tu les transformes en refuges où l'on se sent chez soi.",
    "ISFJ-V3": "Tu n'aides pas par impulsion, tu comprends d'abord, puis tu soutiens avec une justesse rare.",
  },

  // Introduction longue (~2 paragraphes), sous le héros.
  intros: {
    "ISFJ-V1": `En tant que Défenseur (ISFJ), tu possèdes cette chaleur, cette fiabilité et ce dévouement qui font les êtres sur lesquels les autres peuvent s'appuyer en toute sécurité. Ce qui te définit avant tout, c'est ton instinct de prendre soin et de protéger : tu perçois les besoins des autres, souvent avant eux, et tu y réponds avec une générosité discrète et concrète. Tu veilles, tu anticipes, tu protèges ceux qui comptent. Parmi les trois façons d'être de ton type, tu es le plus tourné vers le soin actif : le Protecteur.

Ce qui te porte, c'est le bien-être des autres et la fidélité. Tu trouves un sens profond dans le fait d'aider, de soutenir, de prendre soin, et tu es d'une loyauté indéfectible envers les gens et les engagements qui te tiennent à cœur. Ton dévouement n'est pas que des sentiments : il s'exprime par des actes concrets, des attentions pratiques, une présence fiable. Cette même générosité peut te conduire à t'oublier toi-même et à t'épuiser pour les autres : ton plus beau terrain de croissance sera d'apprendre à prendre soin de toi autant que de ceux que tu aimes.`,

    "ISFJ-V2": `En tant que Défenseur (ISFJ), tu possèdes la chaleur, la fiabilité et le dévouement de ta famille d'âme, et tu les exprimes en créant de l'harmonie, du confort, un sentiment de chez-soi. Ce qui te définit, c'est ce don rare de créer de la chaleur : tu sais rendre un espace accueillant, une ambiance douce, un lien réconfortant, et tu fais des lieux et des liens autour de toi des refuges où les gens se sentent bien, accueillis, en sécurité. Des trois visages que peut prendre ton type, tu es le Gardien du Foyer.

Ce qui te porte, c'est l'harmonie, le confort et le bien-être des tiens. Tu trouves un sens profond à créer un environnement chaleureux où ceux que tu aimes se sentent bien, et la paix, la douceur, le sentiment de sécurité comptent énormément pour toi. Ton don ne tient pas qu'à l'ambiance : il s'incarne dans mille attentions concrètes et une présence fiable. Cette même quête d'harmonie peut te faire fuir tout conflit jusqu'à t'effacer et t'oublier : ta plus belle marge de progrès consistera à t'inclure, toi aussi, dans le refuge que tu crées pour les autres.`,

    "ISFJ-V3": `En tant que Défenseur (ISFJ), tu possèdes la chaleur, la fiabilité et le dévouement de ta famille d'âme, mais tu les exprimes avec une finesse d'observation et de réflexion particulière. Ce qui te définit, c'est cette alliance de l'attention et de la réflexion : tu ne te contentes pas de vouloir aider, tu cherches à vraiment comprendre, à percevoir ce qui se joue, puis tu offres le soutien le plus juste, réfléchi et adapté. Parmi les trois manières d'incarner ton type, tu es le Soutien Réfléchi.

Ce qui te porte, c'est le bien-être des autres et la justesse. Tu veux offrir le bon soutien, pas n'importe quel soutien, et tu y mets une vraie exigence de discernement, alliée à une empathie sincère. Tu observes finement, tu retiens ce qui compte, et tu adaptes ton aide pour qu'elle touche juste. Cette même réflexion peut se retourner contre toi et te faire trop penser, t'inquiéter et t'effacer : ton plus bel axe de progression sera d'allier ton discernement à la sérénité et à l'affirmation de soi.`,
  },

  // ~2 paragraphes sous les barres de variante.
  texteVariante: {
    "ISFJ-V1": `Parmi les trois visages du Défenseur, tu es le plus tourné vers la protection et le soin actif de ceux qui comptent. Tu n'es pas avant tout le gardien du foyer centré sur la chaleur du nid, ni le soutien réfléchi qui épaule avec finesse : tu es celui qui veille, qui protège, qui prend soin avec un instinct et un dévouement remarquables. Veiller sur les autres, anticiper leurs besoins, les protéger et prendre soin d'eux te comble plus que tout.

Cette combinaison, la chaleur, la fiabilité et l'instinct protecteur, fait de toi un protecteur au sens noble : quelqu'un auprès de qui les autres se sentent en sécurité, choyés, veillés, et sur qui ils peuvent s'appuyer en toute confiance. Le revers de ce don, c'est qu'à force de protéger tout le monde, tu peux t'oublier complètement et ne jamais savoir dire non : ton plus beau chemin de croissance sera d'apprendre à te protéger toi aussi, car on ne veille durablement sur les autres que si l'on veille aussi sur soi.`,

    "ISFJ-V2": `De toutes les facettes du Défenseur, tu es le plus tourné vers la création d'harmonie, de chaleur et de confort. Tu n'es pas avant tout le protecteur qui veille et défend activement, ni le soutien réfléchi qui épaule avec finesse : tu es celui qui crée le nid, qui fait que les gens se sentent chez eux, bien, en paix. Rendre un lieu et un lien chaleureux, créer du confort et du bien-être, faire que les autres se sentent accueillis te comble plus que tout.

Cette combinaison, la chaleur, le sens du concret et le goût de l'harmonie, fait de toi un gardien du foyer au sens noble : quelqu'un qui crée des refuges, qui réchauffe les lieux et les liens, et auprès de qui les autres se sentent chez eux. Le revers de ce don, c'est que tu peux créer l'harmonie pour tout le monde et ne jamais l'avoir pour toi, et fuir tout ce qui dérange jusqu'à t'effacer : ta plus belle voie d'épanouissement sera d'apprendre à t'inclure toi aussi dans le refuge que tu offres.`,

    "ISFJ-V3": `Parmi les trois expressions du Défenseur, tu es le plus tourné vers le discernement et la justesse de l'aide. Tu n'es pas avant tout le protecteur qui veille avec instinct, ni le gardien du foyer qui crée la chaleur d'un nid : tu es celui qui observe, comprend et soutient avec une finesse de réflexion remarquable. Comprendre vraiment, discerner le bon soutien, aider avec justesse te comble plus que tout.

Cette combinaison, la chaleur, l'observation et le discernement, fait de toi un soutien d'une qualité rare : quelqu'un dont l'aide n'est jamais maladroite ou à côté, mais toujours juste, réfléchie et adaptée, et sur qui on peut compter pour un soutien vraiment pertinent. Le revers de ce don, c'est que ta réflexion peut glisser vers la sur-réflexion, l'inquiétude et l'effacement : ton plus bel élan de croissance sera de mettre ta belle réflexion au service de l'action sereine et de prendre ta juste place.`,
  },

  varianteDetail: {
    "ISFJ-V1": {
      forces: [
        { titre: "Tu prends soin comme personne", accent: "soin", texte: "Tu perçois les besoins des autres, souvent avant eux, et tu y réponds avec une générosité concrète et fidèle qui fait du bien." },
        { titre: "Une fiabilité absolue", accent: "fiabilité", texte: "Quand on compte sur toi, tu es là : tu tiens tes engagements, tu assures, tu n'abandonnes pas." },
        { titre: "Une loyauté indéfectible", accent: "loyauté", texte: "Envers les gens et les engagements qui comptent, tu restes, tu soutiens, tu protèges dans la durée." },
        { titre: "Une attention aux détails", accent: "détails", texte: "Tu te souviens de ce qui touche chacun et tu remarques les petites choses, ce qui rend ton soin précis et adapté." },
        { titre: "Une chaleur qui réconforte", accent: "chaleur", texte: "Tu offres une présence douce et rassurante auprès de laquelle les gens se sentent apaisés et soutenus." },
        { titre: "Un instinct de protection", accent: "protection", texte: "Tu anticipes, tu veilles, tu protèges ceux que tu aimes avec une attention et un dévouement sans faille." },
      ],
      ombres: [
        { titre: "L'oubli de soi", accent: "oubli", texte: "À force de veiller sur les autres, tu peux négliger tes propres besoins, ta santé et ton bien-être, jusqu'à l'épuisement." },
        { titre: "Du mal à dire non", accent: "non", texte: "Ton désir d'aider et ta crainte de décevoir peuvent te rendre incapable de refuser, même débordé." },
        { titre: "Tout prendre à cœur", accent: "cœur", texte: "Ta sensibilité te rend vulnérable aux critiques, aux conflits et à l'ingratitude, et tu gardes tes blessures pour toi." },
        { titre: "Une résistance au changement", accent: "changement", texte: "Ton attachement au stable et au connu peut te rendre réticent au nouveau, même quand il serait bénéfique." },
        { titre: "Le risque d'être pris pour acquis", accent: "acquis", texte: "Tu donnes énormément et tu réclames peu, si bien que ton apport finit par sembler aller de soi." },
        { titre: "Des besoins tus", accent: "besoins", texte: "Ta discrétion peut te faire taire ce que tu ressens et ce dont tu as besoin, au risque de t'effacer." },
      ],
      paradoxe: {
        tension:
          "Ton don de prendre soin des autres est un cadeau immense,\nmais il peut te faire t'oublier complètement toi-même.",
        lumiere:
          "Ta chaleur, ton dévouement et ton instinct de protection font que les gens se sentent en sécurité et choyés auprès de toi.",
        ombre:
          "Mais poussées à l'extrême, ces forces peuvent te conduire à t'épuiser pour les autres, à ne jamais savoir dire non, à te négliger et à te laisser prendre pour acquis.",
        bascule:
          "Le jour où tu apprends à veiller sur toi autant que sur les autres, à poser des limites et à recevoir, ton dévouement cesse d'être une source d'épuisement pour devenir un don durable et épanouissant.",
      },
    },
    "ISFJ-V2": {
      forces: [
        { titre: "Tu crées de la chaleur", accent: "chaleur", texte: "Tu as ce don de rendre les lieux et les liens accueillants et de créer une ambiance douce où les gens se sentent bien." },
        { titre: "Une attention constante au bien-être", accent: "bien-être", texte: "Tu te soucies du confort et du bonheur de ceux qui t'entourent, tu anticipes et tu prends soin de mille petites choses." },
        { titre: "Une fiabilité absolue", accent: "fiabilité", texte: "Tu es de ceux sur qui on s'appuie sans crainte : tu tiens, tu assures, tu entretiens fidèlement ce que tu crées." },
        { titre: "Un sens du concret", accent: "concret", texte: "Tu ne te contentes pas de bonnes intentions, tu crées du confort réel par des attentions pratiques et un soin du détail." },
        { titre: "Une loyauté profonde", accent: "loyauté", texte: "Envers les gens et les liens qui comptent, tu entretiens, tu maintiens, tu restes, dans la durée." },
        { titre: "Un don pour l'harmonie", accent: "harmonie", texte: "Tu sais apaiser, adoucir et relier, et faire de ce qui t'entoure un refuge stable et paisible." },
      ],
      ombres: [
        { titre: "L'oubli de soi", accent: "oubli", texte: "À force de créer du bien-être pour les autres, tu peux négliger le tien et t'épuiser à entretenir l'harmonie." },
        { titre: "La fuite du conflit", accent: "conflit", texte: "Ton besoin d'harmonie peut te faire éviter toute tension, taire tes désaccords et t'effacer pour préserver la paix." },
        { titre: "Du mal à dire non", accent: "non", texte: "Ton désir de bien-être pour les autres et ta crainte de décevoir peuvent te rendre incapable de refuser." },
        { titre: "Une résistance au changement", accent: "changement", texte: "Ton attachement à la stabilité peut te faire t'accrocher au familier, même quand le changement serait bénéfique." },
        { titre: "Le risque d'être pris pour acquis", accent: "acquis", texte: "À force de donner sans réclamer, tu peux te surcharger et te laisser prendre pour acquis." },
        { titre: "Des frustrations accumulées", accent: "frustrations", texte: "À taire ce qui ne te convient pas pour garder la paix, tu peux laisser s'accumuler des frustrations silencieuses." },
      ],
      paradoxe: {
        tension:
          "Ton don de créer de l'harmonie pour les autres est précieux,\nmais il peut te faire t'oublier et fuir tout ce qui dérange.",
        lumiere:
          "Ta chaleur, ton sens du confort et ton don de créer des refuges font que les gens se sentent bien, en sécurité, chez eux auprès de toi.",
        ombre:
          "Mais poussées à l'extrême, ces forces peuvent te conduire à t'épuiser pour les autres, à fuir tout conflit jusqu'à t'effacer et à te recroqueviller dans le familier.",
        bascule:
          "Le jour où tu crées de l'harmonie sans t'effacer, où tu oses exprimer tes désaccords et t'inclure dans le refuge que tu crées, ton don devient une force durable et épanouissante.",
      },
    },
    "ISFJ-V3": {
      forces: [
        { titre: "Tu soutiens avec justesse", accent: "justesse", texte: "Tu observes, tu comprends, puis tu offres le bon soutien, au bon moment, de la bonne façon, et ton aide tombe juste." },
        { titre: "Une observation fine", accent: "observation", texte: "Tu remarques ce que les autres ne voient pas, les signes discrets, les non-dits, ce qui se joue sous la surface." },
        { titre: "Une réflexion qui éclaire", accent: "réflexion", texte: "Tu prends le temps de comprendre avant d'agir, ce qui rend ton soutien mûri, pertinent et jamais maladroit." },
        { titre: "Une fiabilité absolue", accent: "fiabilité", texte: "On peut compter sur toi : tu tiens, tu assures, tu es là, dans les bons moments comme dans les difficiles." },
        { titre: "Une chaleur sincère", accent: "chaleur", texte: "Derrière ta réflexion, il y a une empathie vraie : tu n'aides pas froidement, mais avec le cœur et le discernement." },
        { titre: "Un don de discernement", accent: "discernement", texte: "Tu comprends les situations et les gens en profondeur et tu adaptes ton aide avec une précision remarquable." },
      ],
      ombres: [
        { titre: "La sur-réflexion", accent: "sur-réflexion", texte: "Ta tendance à observer et à analyser peut glisser vers l'inquiétude, la rumination et l'anticipation du pire." },
        { titre: "L'oubli de soi", accent: "oubli", texte: "Ton dévouement peut te faire négliger tes propres besoins et t'épuiser à te soucier des autres." },
        { titre: "L'effacement", accent: "effacement", texte: "Ta discrétion et ta réflexion peuvent te faire rester en retrait, taire tes besoins et tes opinions." },
        { titre: "Tout prendre à cœur", accent: "cœur", texte: "Ta sensibilité te rend vulnérable aux critiques et aux conflits, que tu peux ruminer longtemps." },
        { titre: "L'inquiétude pour les autres", accent: "inquiétude", texte: "Ton attention peut te faire porter les soucis de tous et t'angoisser pour ceux que tu aimes." },
        { titre: "L'hésitation", accent: "hésitation", texte: "Ta tendance à sur-analyser les conséquences peut te faire douter et retarder tes décisions." },
      ],
      paradoxe: {
        tension:
          "Ta réflexion fait la justesse de ton aide,\nmais elle peut te faire trop penser, t'inquiéter et t'effacer.",
        lumiere:
          "Ton observation fine, ton discernement et ta chaleur réfléchie font de toi un soutien d'une rare justesse, dont l'aide touche et aide réellement.",
        ombre:
          "Mais poussées à l'extrême, ces mêmes forces peuvent te faire ruminer, t'inquiéter sans cesse, t'épuiser de soucis et t'effacer derrière ton observation discrète.",
        bascule:
          "Le jour où tu mets ta réflexion au service de l'action sans te noyer dans l'inquiétude et où tu oses prendre ta place, ton discernement devient une force pleine et sereine.",
      },
    },
  },

  relationsTexte: {
    "ISFJ-V1": `En amour comme en amitié, tu es dévoué, attentionné et profondément protecteur. Tu n'aimes pas à moitié : quand tu aimes, tu prends soin, tu veilles, tu places le bien-être de l'autre au cœur de tes préoccupations, tu anticipes ses besoins et tu crées un cocon de sécurité et de tendresse. Être aimé par toi, c'est se sentir choyé, protégé, vu dans ses moindres besoins. Tu n'as pas forcément un large cercle, mais tes liens sont profonds et durables, et tes proches savent qu'ils peuvent compter sur ta présence fidèle.

Tes défis sont les revers de ta nature : ton dévouement peut te faire t'oublier, trop donner et te laisser prendre pour acquis sans oser réclamer, et ta sensibilité peut te faire vivre les tensions douloureusement et garder tes blessures pour toi. Ton chemin, c'est d'apprendre à recevoir autant que tu donnes, à exprimer tes besoins et tes émotions, et à poser des limites sans culpabiliser. Quand tu y parviens, tu offres une relation d'une tendresse et d'une fidélité rares.`,

    "ISFJ-V2": `En amour comme en amitié, tu es tendre, dévoué et profondément attaché au bien-être de l'autre. Tu crées un cocon de douceur et de sécurité, tu prends soin du quotidien, tu fais de la relation et de la vie commune un refuge chaleureux. Être aimé par toi, c'est se sentir chez soi, choyé, enveloppé d'une tendresse constante. Tu es l'ami chaleureux qui accueille, qui se souvient de ce qui compte, et chez qui on se sent bien : tes amitiés sont peu nombreuses mais profondes et durables.

Tes difficultés ne sont que l'envers de tes qualités : ton besoin d'harmonie peut te faire fuir les conflits nécessaires, taire tes désaccords et t'effacer pour préserver la paix, au risque d'accumuler des frustrations, et à force de te dévouer tu finis par t'oublier. Ton chemin, c'est d'apprendre à exprimer tes désaccords et tes besoins, à voir que régler les tensions renforce l'harmonie au lieu de la briser, et à recevoir autant que tu donnes. Quand tu y parviens, tu offres une relation d'une tendresse et d'une stabilité rares.`,

    "ISFJ-V3": `En amour comme en amitié, tu es attentionné, dévoué et profondément à l'écoute. Tu observes, tu comprends l'autre en profondeur, et tu offres un soutien et une attention d'une justesse rare : tu perçois ses besoins, parfois avant lui, et tu y réponds avec finesse. Être aimé par toi, c'est se sentir vraiment compris, soutenu sur-mesure par quelqu'un qui sait exactement ce dont on a besoin. Tu es souvent le confident, celui qui écoute vraiment et dont le conseil tombe juste, et tes liens sont profonds et durables.

Tes fragilités prolongent tout simplement tes forces : ta tendance à trop réfléchir peut te faire t'inquiéter et sur-analyser la relation, ton don de toi peut te faire t'oublier, et ton effacement peut te faire taire tes propres besoins au point que l'autre ne les devine pas. Ton chemin, c'est d'apprendre à ne pas trop penser, à exprimer tes besoins et tes émotions, et à recevoir autant que tu donnes. Quand tu y parviens, tu offres une relation d'une attention et d'une profondeur rares.`,
  },

  proTexte: {
    "ISFJ-V1": `Au travail, tu es fait pour les rôles où l'on prend soin, où l'on soutient, où l'on aide concrètement les autres. Une carrière qui t'épanouit, c'est une carrière qui te permet d'avoir un impact humain réel, d'aider et de protéger, dans un cadre stable et bienveillant. Tu t'étioles dans les environnements froids, agressifs ou purement compétitifs, et tu prends vie quand tu peux prendre soin et faire du bien aux gens : les métiers de la santé et du soin, l'aide à la personne, l'éducation, les ressources humaines et les fonctions de support sont ton terrain.

Tu travailles avec sérieux, fiabilité et attention aux autres : tu fais les choses bien, complètement, en pensant au bien-être de l'équipe, et tu honores tes engagements avec un sérieux exemplaire. Ton défi principal, c'est ton propre équilibre et ton affirmation : ta compétence est rarement en cause, mais tu peux trop t'oublier, ne pas savoir dire non, te laisser prendre pour acquis et ne pas oser défendre tes intérêts. Apprendre à poser des limites, à faire reconnaître ta valeur et à t'affirmer rend ta belle vocation durable et justement reconnue.`,

    "ISFJ-V2": `Au travail, tu es fait pour les rôles où l'on prend soin, où l'on crée du bien-être, où l'on entretient un environnement humain et harmonieux. Une carrière qui t'épanouit, c'est une carrière qui te permet de prendre soin des gens dans un cadre stable et bienveillant. Tu t'étioles dans les environnements froids, agressifs ou instables, et tu prends vie quand tu peux créer du confort et de l'harmonie : les métiers de la santé et du soin, l'accueil et l'hospitalité, l'éducation, les fonctions de support et l'administration au service des gens sont ton terrain.

Tu travailles avec sérieux, fiabilité et attention au bien-être collectif : tu apportes de la chaleur, une attention à l'harmonie de l'équipe et une fiabilité précieuse, et tu es souvent celui qui veille à ce que chacun se sente bien. Ton défi principal, c'est ton propre équilibre et ton affirmation : tu peux trop t'oublier, fuir les conflits, ne pas savoir dire non et ne jamais oser faire valoir ce que tu mérites. Apprendre à poser des limites, à exprimer tes désaccords et à faire reconnaître ta valeur rend ta belle vocation durable et justement reconnue.`,

    "ISFJ-V3": `Au travail, tu es fait pour les rôles où l'on aide, où l'on comprend, où l'on soutient avec finesse. Une carrière qui t'épanouit, c'est une carrière qui te permet de mettre ton discernement et ton attention au service des autres, dans un cadre stable et bienveillant. Tu t'étioles dans les environnements froids, agressifs ou superficiels, et tu prends vie quand tu peux observer, comprendre et offrir un soutien juste : l'accompagnement et le conseil, les métiers de l'aide et du soin, l'écoute, l'éducation attentive, les ressources humaines et l'analyse au service des gens sont ton terrain.

Tu travailles avec finesse, sérieux et attention aux autres : tu observes, tu comprends, tu fais les choses avec discernement, et tu es souvent celui qui perçoit ce que les autres ne voient pas. Ton défi principal, c'est ton propre équilibre et ton affirmation : tu peux trop réfléchir et t'inquiéter, t'oublier, t'effacer et ne pas oser faire reconnaître ta valeur. Apprendre à ne pas trop penser, à poser des limites et à faire valoir ton discernement est ce qui te permet de t'épanouir et d'être justement reconnu.`,
  },

  mindsetTexte: {
    "ISFJ-V1": {
      apercu: `Ton plus grand chantier n'est pas autour de toi, il est en toi. Tu portes un dévouement et une chaleur rares, mais aussi une tendance qui peut se retourner contre toi : l'oubli de soi jusqu'à l'épuisement, l'incapacité à dire non, le fait de te laisser prendre pour acquis. La bonne nouvelle, c'est que ces fragilités sont aussi tes plus grands leviers de croissance, pour peu que tu saches comment t'y prendre.`,
    },
    "ISFJ-V2": {
      apercu: `Ton plus grand chantier n'est pas de créer de l'harmonie, tu en crées pour tout le monde, c'est d'apprendre à t'y inclure toi aussi. Tu portes une chaleur et un don du confort rares, mais aussi une tendance à t'oublier, à fuir le conflit jusqu'à t'effacer et à te recroqueviller dans le familier. La bonne nouvelle, c'est que ces mêmes fragilités cachent tes plus belles marges de progrès, dès lors que tu sais sur quoi agir.`,
    },
    "ISFJ-V3": {
      apercu: `Ton plus grand chantier n'est pas de comprendre les autres, tu le fais avec une finesse rare, c'est d'apprendre à apaiser ton mental et à prendre ta place. Tu portes un discernement et une attention précieux, mais aussi une tendance à trop réfléchir, à t'inquiéter, à t'oublier et à t'effacer. La bonne nouvelle, c'est que ces fragilités renferment aussi tes plus grands leviers d'évolution, une fois que tu sais où porter ton effort.`,
    },
  },

  sectionDetail: {
    "ISFJ-V1-relations": {
      forces: [
        { titre: "Un dévouement tendre", accent: "dévouement", texte: "Quand tu aimes, tu places le bien-être de l'autre au cœur de tes préoccupations et tu prends soin sans compter." },
        { titre: "Un cocon de sécurité", accent: "sécurité", texte: "Tu crées un environnement tendre et rassurant où l'autre se sent protégé, choyé et en confiance." },
        { titre: "Une attention qui anticipe", accent: "attention", texte: "Tu perçois les besoins de tes proches, souvent avant eux, et tu y réponds par mille attentions concrètes." },
        { titre: "Une loyauté totale", accent: "loyauté", texte: "Une fois engagé, tu offres une fidélité indéfectible et une présence fiable, dans la durée." },
        { titre: "Une présence fidèle", accent: "présence", texte: "Tu es là dans les moments qui comptent, tu gardes en mémoire ce qui touche chacun, tu soutiens concrètement." },
        { titre: "Une chaleur qui apaise", accent: "chaleur", texte: "Ta douceur et ta bienveillance font que les autres se sentent apaisés et compris auprès de toi." },
      ],
      ombres: [
        { titre: "Toi, toujours en dernier", accent: "dernier", texte: "À trop donner et veiller sur l'autre, tu peux te négliger et t'épuiser sans même t'en rendre compte." },
        { titre: "Un déséquilibre qui s'installe", accent: "déséquilibre", texte: "Tu donnes énormément sans oser réclamer, si bien que la réciprocité s'efface peu à peu." },
        { titre: "Des attentes non dites", accent: "attentes", texte: "Ta discrétion peut te faire taire tes besoins et tes attentes, au risque que l'autre ne les devine pas." },
        { titre: "Une grande vulnérabilité", accent: "vulnérabilité", texte: "Ta sensibilité te fait vivre les tensions douloureusement et ruminer longtemps un mot de travers." },
        { titre: "Une crainte de décevoir", accent: "décevoir", texte: "Ta peur de blesser ou de décevoir peut te faire accepter ce qui ne te convient pas." },
        { titre: "La difficulté à recevoir", accent: "recevoir", texte: "Tu es toujours celui qui soutient, et tu peux avoir du mal à accepter qu'on prenne soin de toi en retour." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "Les personnes très indépendantes ou froides qui prennent sans donner.",
            "L'ingratitude et le sentiment d'être pris pour acquis.",
            "Les conflits durs et l'agressivité qui te blessent.",
            "Le manque de réciprocité dans le soin et l'attention.",
            "Les relations où tu n'oses jamais exprimer tes besoins.",
          ],
        },
        {
          ton: "positif",
          items: [
            "Un partenaire chaleureux et fidèle qui prend soin de toi en retour.",
            "De la sécurité affective, de la tendresse et de la stabilité.",
            "Quelqu'un qui apprécie ton dévouement sans en abuser.",
            "De la réciprocité, où l'on donne et reçoit tour à tour.",
            "Quelqu'un qui t'aide à t'affirmer et à ne pas t'oublier.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Les tempéraments très indépendants ou détachés émotionnellement.",
            "Les profils qui prennent sans donner et abusent de ton dévouement.",
            "Les personnalités directes ou agressives dont la dureté te blesse.",
          ],
          profils: [
            { code: "ENTP", raison: "son besoin d'indépendance et son goût du débat peuvent te blesser et te laisser sur ta faim d'attention." },
            { code: "ESTP", raison: "son côté direct et son rythme effréné peuvent sembler insensibles à ton besoin de stabilité et de soin." },
            { code: "ENTJ", raison: "son intensité directive et sa froideur apparente peuvent te faire taire tes besoins et te négliger." },
          ],
        },
        {
          ton: "positif",
          items: [
            "Les tempéraments chaleureux et fidèles qui partagent ton goût du soin mutuel.",
            "Les profils plus affirmés qui t'aident à t'affirmer et à ne pas t'oublier.",
            "Ceux qui apprécient ton dévouement et prennent soin de toi en retour.",
          ],
          profils: [
            { code: "ESFJ", raison: "sa chaleur et son attention rejoignent ton goût du soin mutuel et de la fidélité." },
            { code: "ESTJ", raison: "sa solidité et son sens de l'action t'apportent un ancrage rassurant et t'aident à t'affirmer." },
            { code: "INFP", raison: "sa profondeur et sa douceur résonnent avec ta sensibilité et chérissent ton dévouement." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Tu donnes énormément à ceux que tu aimes,\nmais à trop te donner, tu risques de t'oublier et de te laisser prendre pour acquis.",
        lumiere:
          "Ton attention de chaque instant, ta fidélité et ton don de protéger font de toi un proche d'une tendresse rare, auprès de qui on se sent choyé et en sécurité.",
        ombre:
          "Mais à t'oublier, à ne pas oser dire non ni exprimer tes besoins, tu peux t'épuiser et créer un déséquilibre dans les liens que tu chéris.",
        bascule:
          "Le jour où tu reçois autant que tu donnes et où tu honores tes propres besoins, ton dévouement devient une tendresse à la fois profonde et soutenable.",
      },
    },
    "ISFJ-V1-carriere": {
      forces: [
        { titre: "Un impact humain réel", accent: "impact", texte: "Tu prends soin, tu soutiens, tu aides concrètement, et ton travail fait vraiment du bien aux gens." },
        { titre: "Une fiabilité exemplaire", accent: "fiabilité", texte: "On peut compter sur toi : tu honores tes engagements et tu fais les choses bien, complètement." },
        { titre: "Un sens du détail", accent: "détail", texte: "Tu remarques ce qui compte et tu réponds aux besoins concrets avec une précision rare." },
        { titre: "Une dimension humaine", accent: "humaine", texte: "Tu apportes du soin et de l'attention aux gens que les esprits purement fonctionnels n'ont pas." },
        { titre: "Une présence rassurante", accent: "présence", texte: "Ta chaleur et ta constance font de toi un pilier discret sur lequel toute une équipe peut s'appuyer." },
        { titre: "Un dévouement constant", accent: "dévouement", texte: "Tu travailles avec sérieux et régularité, au service du bien-être de l'équipe et des gens." },
      ],
      ombres: [
        { titre: "La surcharge silencieuse", accent: "surcharge", texte: "Tu peux te surcharger en t'occupant de tout et de tout le monde, jusqu'à l'épuisement." },
        { titre: "Le oui de trop", accent: "oui", texte: "Tu acceptes trop de tâches de peur de décevoir, jusqu'à te laisser déborder." },
        { titre: "Un manque d'affirmation", accent: "affirmation", texte: "Tu peux ne pas oser défendre tes intérêts, demander une reconnaissance ou faire valoir ta valeur." },
        { titre: "Une contribution invisible", accent: "invisible", texte: "À donner sans réclamer, ta contribution peut passer inaperçue et ne pas être justement reconnue." },
        { titre: "Une sensibilité aux conflits", accent: "conflits", texte: "Les ambiances agressives, froides ou instables t'affectent profondément et te démotivent." },
        { titre: "L'attachement au connu", accent: "attachement", texte: "Ton attachement au stable peut te rendre réticent aux bouleversements, même bénéfiques." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "La compétition agressive et les rapports de force.",
            "Le manque de reconnaissance et le sentiment d'être pris pour acquis.",
            "Les environnements froids et impersonnels.",
            "L'instabilité et les bouleversements constants.",
            "Le travail vide de sens humain.",
          ],
        },
        {
          ton: "positif",
          items: [
            "Un travail qui a du sens humain et aide concrètement les gens.",
            "Un environnement stable et respectueux.",
            "De la bienveillance et de la reconnaissance.",
            "Pouvoir prendre soin, soutenir et protéger.",
            "Un cadre clair où ta fiabilité est valorisée.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Les milieux agressifs et purement compétitifs.",
            "Les environnements froids et impersonnels.",
            "Les postes instables sans cadre ni sens humain.",
          ],
          profils: [
            { nom: "Vente sous pression, compétition pure", raison: "les rapports de force et l'agressivité t'épuisent et te démotivent." },
            { nom: "Environnements froids et impersonnels", raison: "aucune place pour le soin et l'humain qui te font vibrer." },
            { nom: "Postes instables et chaotiques", raison: "l'absence de cadre et de stabilité te déstabilise profondément." },
          ],
        },
        {
          ton: "positif",
          items: [
            "Les métiers de la santé, du soin et de l'aide à la personne.",
            "L'éducation et l'accompagnement.",
            "Les ressources humaines et les fonctions de support.",
          ],
          profils: [
            { nom: "Santé & soin", raison: "soignant, aide-soignant, auxiliaire de vie : prendre soin et protéger concrètement." },
            { nom: "Éducation & accompagnement", raison: "éducateur, enseignant, accompagnant : aider les gens à grandir dans la durée." },
            { nom: "Support & ressources humaines", raison: "RH, assistant, fonctions de soutien : mettre ta fiabilité au service des gens." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Tu te donnes pleinement pour le bien-être des autres,\nmais à t'oublier et à ne pas t'affirmer, ta valeur peut rester invisible.",
        lumiere:
          "Ton dévouement, ta fiabilité et ton sens du soin font de toi un appui précieux, sur qui une équipe et des gens peuvent vraiment compter.",
        ombre:
          "Mais à te surcharger, à ne pas savoir dire non et à ne pas oser faire reconnaître ta valeur, tu t'exposes à l'épuisement et à l'injustice.",
        bascule:
          "Le jour où tu poses des limites et où tu fais valoir ta valeur, ta belle vocation devient durable et justement reconnue.",
      },
    },
    "ISFJ-V1-developpement": {
      evolution: `Ta personnalité n'est pas figée : elle mûrit, et ton type suit une trajectoire de croissance particulièrement marquée. Plus jeune, tu es tout entier dans ton dévouement et ton instinct de protection : prendre soin, veiller, aider, protéger. C'est beau et généreux, mais souvent déséquilibré : tu peux t'oublier complètement, ne jamais savoir dire non, te laisser prendre pour acquis et t'épuiser à donner. Tu prends soin de tout le monde, mais qui prend soin de toi ?

Avec le temps et l'expérience, quelque chose de précieux s'ouvre en toi. Tu comprends que tu ne peux prendre soin durablement que si tu te préserves, que poser des limites ne te rend pas moins généreux et que ta valeur mérite d'être reconnue. Tu apprends à t'affirmer, à recevoir, à exprimer tes besoins, à préserver ton énergie, sans rien perdre de ta chaleur. Dans ta pleine maturité, tu deviens un protecteur chaleureux qui veille sur les autres sans s'oublier, qui sait donner et recevoir, s'affirmer et poser des limites. Et c'est entièrement à ta portée.`,
      etapes: [
        "Tu remarques déjà ce dont les autres ont besoin et tu veilles spontanément sur ceux que tu aimes. Sensible et attentionné, tu prends soin tout naturellement, le cœur déjà tourné vers les autres.",
        "Ton dévouement est à son comble : tu es présent pour tout le monde, tu protèges, tu donnes sans compter. C'est généreux, mais souvent déséquilibré : tu t'oublies, tu as du mal à dire non, et te préserver ne va pas encore de soi.",
        "Tu comprends que tu ne peux veiller durablement sur les autres qu'en te préservant. Tu apprends à poser des limites, à recevoir et à exprimer tes besoins, sans rien perdre de ta chaleur.",
        "Dans ta pleine maturité, tu es un protecteur chaleureux qui veille sur les autres sans s'oublier. Tu sais donner et recevoir, t'affirmer et te protéger : la version la plus accomplie de toi.",
      ],
      leviersForts: [
        { titre: "Apprends à prendre soin de toi", texte: "C'est ton plus grand levier : honore tes propres besoins et accorde-toi du repos. Te préserver n'est pas trahir ton dévouement, c'est ce qui te permet de le vivre durablement." },
        { titre: "Ose poser des limites", texte: "Refuser quand tu es débordé et ne pas tout porter n'est pas de l'égoïsme, c'est de la sagesse. Cela préserve ta générosité et te fait respecter, sans rien retirer à ta bonté." },
        { titre: "Fais reconnaître ta valeur", texte: "Apprends à exprimer tes besoins, tes opinions et ce que tu apportes. Prendre ta place te rend justice et permet aux autres de te reconnaître à ta juste valeur." },
        { titre: "Apprends à recevoir", texte: "Tu donnes énormément : laisse aussi les autres prendre soin de toi. Une relation saine repose sur la réciprocité, et recevoir te permet de te remplir pour continuer à donner." },
      ],
      questions: [
        { situation: "Quand tu portes tout le monde", question: "Et moi, qui prend soin de moi en ce moment ?" },
        { situation: "Quand on te demande encore un service", question: "Est-ce que je dis oui par envie, ou par peur de décevoir ?" },
        { situation: "Quand tu te sens épuisé", question: "De quel repos ou de quel soutien ai-je besoin, là, maintenant ?" },
        { situation: "Quand une blessure te ronge", question: "Est-ce que j'ose l'exprimer, ou est-ce que je la garde encore pour moi ?" },
        { situation: "Quand un changement t'effraie", question: "Et si m'ouvrir un peu à ce qui est nouveau enrichissait ma vie ?" },
      ],
      paradoxe: {
        tension:
          "Pour veiller durablement sur ceux que tu aimes, tu dois aussi veiller sur toi,\nmais tu crains qu'en pensant à toi, tu trahisses ton dévouement.",
        lumiere:
          "Ton cœur, ta loyauté et ton dévouement sincère sont une force rare : tu as déjà en toi tout ce qu'il faut pour faire du bien à ceux qui t'entourent.",
        ombre:
          "Mais à t'oublier et à ne jamais te préserver, ton dévouement se transforme en source d'épuisement et te conduit à disparaître.",
        bascule:
          "Le jour où tu comprends que te ménager est ce qui garde ta générosité vivante, ton dévouement devient une lumière durable.",
      },
    },
    "ISFJ-V2-relations": {
      forces: [
        { titre: "Un cocon chaleureux", accent: "cocon", texte: "Tu fais de la relation et de la vie commune un refuge doux et sécurisant où l'autre se sent chez soi." },
        { titre: "Une tendresse constante", accent: "tendresse", texte: "Tu enveloppes l'autre d'une attention et d'une douceur de chaque instant qui font du bien." },
        { titre: "Un soin du quotidien", accent: "quotidien", texte: "Tu prends soin des mille petites choses de la vie commune et tu la rends douce et harmonieuse." },
        { titre: "Une loyauté totale", accent: "loyauté", texte: "Une fois engagé, tu offres une fidélité indéfectible et tu construis un foyer à deux, dans la durée." },
        { titre: "Un accueil rare", accent: "accueil", texte: "Tu reçois avec chaleur, tu te souviens de ce qui compte, et chez toi on se sent toujours bienvenu." },
        { titre: "Une présence apaisante", accent: "présence", texte: "Ta douceur crée une atmosphère de paix où tes proches se sentent bien et en sécurité." },
      ],
      ombres: [
        { titre: "La fuite du conflit", accent: "conflit", texte: "Ton besoin d'harmonie peut te faire taire tes désaccords et t'effacer pour préserver la paix." },
        { titre: "L'oubli de soi", accent: "oubli", texte: "À entretenir le bien-être de tous, tu peux négliger le tien et t'épuiser sans le dire." },
        { titre: "Des frustrations accumulées", accent: "frustrations", texte: "À tout garder pour préserver la paix, tu peux laisser s'amasser des frustrations silencieuses." },
        { titre: "Le risque d'être pris pour acquis", accent: "acquis", texte: "Tu donnes tant de chaleur sans réclamer que tu peux te laisser prendre pour acquis." },
        { titre: "Du mal à dire non", accent: "non", texte: "Ton désir de bien-être pour l'autre et ta crainte de décevoir peuvent te faire trop accepter." },
        { titre: "Une difficulté à recevoir", accent: "recevoir", texte: "Tu es toujours celui qui offre le refuge, et tu peux avoir du mal à y avoir ta propre place." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "Les personnes très conflictuelles qui bousculent ton besoin d'harmonie.",
            "L'instabilité et les bouleversements constants du cadre.",
            "Les relations où l'on prend sans jamais donner.",
            "L'ingratitude et le sentiment d'être pris pour acquis.",
            "Les liens où tu n'oses jamais exprimer tes désaccords.",
          ],
        },
        {
          ton: "positif",
          items: [
            "Un partenaire chaleureux et attaché à la stabilité.",
            "De la sécurité affective, de la paix et de la douceur.",
            "Quelqu'un qui apprécie la chaleur que tu offres sans en abuser.",
            "De la réciprocité et un soin mutuel.",
            "Quelqu'un qui veille à ce que tu aies ta place dans le refuge.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Les tempéraments très conflictuels ou instables.",
            "Les profils qui prennent sans donner et abusent de ta chaleur.",
            "Les personnalités directes dont la dureté bouscule ton besoin d'harmonie.",
          ],
          profils: [
            { code: "ENTP", raison: "son goût du débat et de la contradiction bouscule ton besoin de paix et d'harmonie." },
            { code: "ESTP", raison: "son rythme effréné et son côté direct cadrent mal avec ton besoin de douceur et de stabilité." },
            { code: "ENTJ", raison: "son intensité directive peut te faire t'effacer et taire tes désaccords." },
          ],
        },
        {
          ton: "positif",
          items: [
            "Les tempéraments chaleureux et fidèles attachés à la stabilité.",
            "Les profils plus affirmés qui t'aident à t'affirmer et à ne pas t'effacer.",
            "Ceux qui apprécient la chaleur que tu offres et prennent soin de toi en retour.",
          ],
          profils: [
            { code: "ESFJ", raison: "sa chaleur et son goût de l'harmonie rejoignent ton don du foyer et du soin mutuel." },
            { code: "ESTJ", raison: "sa solidité et sa franchise t'apportent un ancrage et t'aident à exprimer tes désaccords." },
            { code: "INFP", raison: "sa douceur et sa profondeur résonnent avec ta sensibilité et chérissent ta chaleur." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Tu crées un refuge chaleureux pour tous ceux que tu aimes,\nmais à fuir le conflit et à t'oublier, tu peux ne jamais y avoir ta place.",
        lumiere:
          "Ta tendresse, ton don du confort et ta fidélité font de toi un proche auprès de qui on se sent chez soi, en paix et en sécurité.",
        ombre:
          "Mais à taire tes désaccords et à t'effacer pour préserver la paix, tu peux accumuler des frustrations et te laisser prendre pour acquis.",
        bascule:
          "Le jour où tu oses exprimer tes désaccords et où tu t'inclus dans le refuge que tu crées, tes liens deviennent à la fois chaleureux et vrais.",
      },
    },
    "ISFJ-V2-carriere": {
      forces: [
        { titre: "Un don du bien-être", accent: "bien-être", texte: "Tu crées des environnements humains et chaleureux où chacun se sent bien et accueilli." },
        { titre: "Une fiabilité exemplaire", accent: "fiabilité", texte: "Les autres savent qu'ils peuvent se reposer sur toi : tu honores tes engagements et tu entretiens fidèlement ce que tu crées." },
        { titre: "Une attention à l'harmonie", accent: "harmonie", texte: "Tu veilles au climat de l'équipe et tu fais que chacun se sente bien et inclus." },
        { titre: "Un sens du concret", accent: "concret", texte: "Tu transformes le souci du bien-être en attentions réelles et en confort tangible." },
        { titre: "Une chaleur précieuse", accent: "chaleur", texte: "Tu apportes une dimension humaine et une douceur qui font de toi un élément rare dans tout collectif." },
        { titre: "Un soin du détail", accent: "détail", texte: "Tu remarques les petites choses qui rendent un cadre agréable et un travail bien fait." },
      ],
      ombres: [
        { titre: "L'oubli de soi", accent: "oubli", texte: "Tu peux te surcharger en entretenant le bien-être de tous, sans jamais t'accorder de répit." },
        { titre: "La fuite du conflit", accent: "conflit", texte: "Ton besoin d'harmonie peut te faire éviter les tensions et taire ce qui ne te convient pas." },
        { titre: "Un manque d'affirmation", accent: "affirmation", texte: "Tu peux ne pas oser défendre tes intérêts ni faire reconnaître ta valeur." },
        { titre: "Du mal à dire non", accent: "non", texte: "Ta crainte de décevoir peut te faire accepter trop et te laisser déborder." },
        { titre: "Une sensibilité aux ambiances", accent: "ambiances", texte: "Les conflits, l'agressivité et l'instabilité t'affectent profondément et te démotivent." },
        { titre: "Une résistance au changement", accent: "changement", texte: "Ton attachement à la stabilité peut te rendre réticent aux bouleversements, même bénéfiques." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "La compétition agressive et les rapports de force.",
            "Les ambiances froides et impersonnelles.",
            "L'instabilité et les bouleversements constants.",
            "Le manque de reconnaissance et de bienveillance.",
            "Le travail vide de sens humain.",
          ],
        },
        {
          ton: "positif",
          items: [
            "Un environnement stable, humain et bienveillant.",
            "Pouvoir créer du confort et de l'harmonie.",
            "Un climat d'équipe chaleureux et respectueux.",
            "De la reconnaissance pour ce que tu apportes.",
            "Un cadre clair où ta fiabilité est valorisée.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Les milieux agressifs et purement compétitifs.",
            "Les environnements froids et impersonnels.",
            "Les postes instables sans cadre humain.",
          ],
          profils: [
            { nom: "Compétition pure, vente sous pression", raison: "les rapports de force et l'agressivité bousculent ton besoin d'harmonie." },
            { nom: "Environnements froids et impersonnels", raison: "aucune place pour la chaleur et le bien-être qui te font vibrer." },
            { nom: "Postes instables et chaotiques", raison: "l'absence de stabilité et de cadre te déstabilise profondément." },
          ],
        },
        {
          ton: "positif",
          items: [
            "Les métiers de la santé, du soin et de l'aide à la personne.",
            "L'accueil, l'hospitalité et l'éducation.",
            "Les fonctions de support et l'administration au service des gens.",
          ],
          profils: [
            { nom: "Santé & soin", raison: "soignant, auxiliaire de vie : créer du bien-être et prendre soin des gens." },
            { nom: "Accueil & hospitalité", raison: "accueil, hôtellerie, restauration : faire que chacun se sente chez soi." },
            { nom: "Support & éducation", raison: "assistant, enseignant, fonctions de soutien : entretenir un cadre humain et harmonieux." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Tu crées du bien-être et de l'harmonie pour toute l'équipe,\nmais à fuir le conflit et à t'oublier, ta valeur peut rester invisible.",
        lumiere:
          "Ta chaleur, ta fiabilité et ton don du confort font de toi un élément précieux qui rend les environnements humains et agréables.",
        ombre:
          "Mais à te surcharger, à taire tes désaccords et à ne pas oser t'affirmer, tu t'exposes à l'épuisement et au manque de reconnaissance.",
        bascule:
          "Le jour où tu poses des limites, exprimes tes désaccords et fais valoir ta valeur, ta belle vocation devient durable et justement reconnue.",
      },
    },
    "ISFJ-V2-developpement": {
      evolution: `Ta personnalité n'a rien de figé : elle évolue, et ton type connaît une trajectoire de maturation particulièrement nette. Plus jeune, tu es tout entier dans ton don de créer de l'harmonie : réchauffer, accueillir, prendre soin, faire que les autres se sentent bien. C'est beau et généreux, mais souvent déséquilibré : tu peux t'oublier complètement, fuir tout conflit jusqu'à t'effacer, ne jamais savoir dire non et te recroqueviller dans le familier. Tu crées un foyer pour tout le monde, mais en as-tu un pour toi ?

Avec le temps et l'expérience, quelque chose de précieux s'ouvre en toi. Tu comprends que créer de l'harmonie ne veut pas dire t'effacer, que régler les tensions renforce les liens au lieu de les briser, et que ton bien-être compte autant que celui des autres. Tu apprends à t'affirmer, à exprimer tes désaccords, à prendre soin de toi, à t'ouvrir, sans rien perdre de ta chaleur. Dans ta pleine maturité, tu deviens un gardien du foyer chaleureux qui crée de l'harmonie sans s'effacer et qui s'inclut enfin dans le bien-être qu'il offre. Et c'est entièrement à ta portée.`,
      etapes: [
        "Tu aimes déjà rendre les choses douces et accueillantes, et tu prends soin du confort de ceux qui t'entourent. Sensible à l'ambiance, tu crées spontanément de la chaleur autour de toi.",
        "Ton don de créer de l'harmonie est à son comble : tu réchauffes, tu accueilles, tu prends soin de tous. C'est généreux, mais souvent déséquilibré : tu fuis les conflits, tu t'effaces, et t'inclure ne va pas encore de soi.",
        "Tu comprends que régler les tensions renforce les liens et que ton bien-être compte autant que celui des autres. Tu apprends à exprimer tes désaccords et à t'affirmer, sans rien perdre de ta chaleur.",
        "Dans ta pleine maturité, tu es un gardien du foyer chaleureux qui crée de l'harmonie sans s'effacer. Tu t'inclus dans le refuge que tu offres : la plus belle version de toi-même.",
      ],
      leviersForts: [
        { titre: "Inclus-toi dans le refuge que tu crées", texte: "C'est ton plus grand levier : honore tes propres besoins et accorde-toi du confort et du repos. La vraie harmonie te comprend toi aussi, et te préserver est ce qui te permet d'offrir ta chaleur durablement." },
        { titre: "Apprends à exprimer tes désaccords", texte: "Dire calmement ce qui ne te convient pas renforce tes liens et te libère des frustrations accumulées. Le désaccord sain n'est pas l'ennemi de la paix, il l'approfondit." },
        { titre: "Ose poser des limites", texte: "Refuser quand tu es débordé n'est pas de l'égoïsme, c'est de la sagesse. Cela préserve ta générosité et te fait respecter, sans rien retirer à ta chaleur." },
        { titre: "Affirme-toi et fais reconnaître ta valeur", texte: "Apprends à exprimer tes besoins et ce que tu apportes. Prendre ta place te rend justice et permet aux autres de te reconnaître pleinement." },
      ],
      questions: [
        { situation: "Quand tu crées un refuge pour tout le monde", question: "Est-ce que j'y ai, moi aussi, une vraie place ?" },
        { situation: "Quand une tension apparaît", question: "Est-ce que je l'exprime calmement, ou je la lisse pour préserver la paix ?" },
        { situation: "Quand on te demande encore un service", question: "Est-ce que je dis oui par envie, ou par peur de décevoir ?" },
        { situation: "Quand tu te sens épuisé", question: "De quel repos ou de quel plaisir ai-je besoin, rien que pour moi ?" },
        { situation: "Quand un changement t'effraie", question: "Et si m'ouvrir un peu à ce qui est nouveau enrichissait ma vie ?" },
      ],
      paradoxe: {
        tension:
          "Pour offrir une harmonie vraie, tu dois t'y inclure toi aussi,\nmais tu crains qu'en pensant à toi, tu brises la paix que tu chéris.",
        lumiere:
          "Ta chaleur, ton don du confort et ta fidélité sont une force rare : tu as déjà en toi tout ce qu'il faut pour faire des refuges de ce qui t'entoure.",
        ombre:
          "Mais à t'effacer et à fuir tout ce qui dérange, tu crées l'harmonie pour tout le monde et ne l'as jamais pour toi.",
        bascule:
          "Le jour où tu comprends que la vraie harmonie te comprend toi aussi, ton don cesse de t'effacer pour devenir une lumière chaleureuse et durable.",
      },
    },
    "ISFJ-V3-relations": {
      forces: [
        { titre: "Une écoute qui comprend", accent: "écoute", texte: "Tu observes et tu comprends l'autre en profondeur, au-delà des mots, et il se sent vraiment vu." },
        { titre: "Un soutien sur-mesure", accent: "soutien", texte: "Tu perçois les besoins de l'autre, parfois avant lui, et tu y réponds avec une justesse rare." },
        { titre: "Une attention fine", accent: "attention", texte: "Ta finesse te fait remarquer les non-dits et offrir le bon conseil ou le bon réconfort au bon moment." },
        { titre: "Une loyauté tendre", accent: "loyauté", texte: "Une fois engagé, tu offres une fidélité sincère et une présence attentive, dans la durée." },
        { titre: "Le rôle du confident", accent: "confident", texte: "Tu es souvent celui qui écoute vraiment et qui comprend, et dont l'aide tombe juste." },
        { titre: "Une chaleur sincère", accent: "chaleur", texte: "Derrière ta réflexion bat une empathie vraie qui rend ton soutien profondément humain." },
      ],
      ombres: [
        { titre: "La sur-réflexion", accent: "sur-réflexion", texte: "Tu peux t'inquiéter, sur-analyser la relation et anticiper des problèmes qui n'existent pas." },
        { titre: "L'oubli de soi", accent: "oubli", texte: "Ton dévouement peut te faire t'oublier et porter les soucis de l'autre comme les tiens." },
        { titre: "Des besoins tus", accent: "besoins", texte: "Ton effacement peut te faire taire tes propres besoins, au point que l'autre ne les devine pas." },
        { titre: "Une grande vulnérabilité", accent: "vulnérabilité", texte: "Ta sensibilité te fait vivre les frictions douloureusement et les ruminer longtemps." },
        { titre: "L'inquiétude pour l'autre", accent: "inquiétude", texte: "Ton attention peut te faire t'angoisser pour ceux que tu aimes jusqu'à t'épuiser." },
        { titre: "La difficulté à recevoir", accent: "recevoir", texte: "Tu offres tant de soutien que tu peux avoir du mal à en accepter en retour." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "Les personnes très directes ou insensibles qui te font ruminer.",
            "Les relations de surface, sans compréhension mutuelle.",
            "L'ingratitude et le sentiment d'être incompris.",
            "Les conflits durs qui te blessent et que tu rumines.",
            "Les liens où tu n'oses jamais exprimer tes besoins.",
          ],
        },
        {
          ton: "positif",
          items: [
            "Un partenaire attentionné, capable de profondeur et de compréhension.",
            "De la sécurité affective et une compréhension mutuelle.",
            "Quelqu'un qui apprécie ta finesse sans en abuser.",
            "De la réciprocité et un soutien partagé.",
            "Quelqu'un qui te rassure et te pousse doucement à prendre ta place.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Les tempéraments très directs ou insensibles.",
            "Les profils qui prennent sans donner et te font ruminer.",
            "Les personnalités froides ou détachées émotionnellement.",
          ],
          profils: [
            { code: "ESTP", raison: "sa franchise directe et son côté terre-à-terre peuvent te blesser et te faire ruminer." },
            { code: "ENTJ", raison: "son intensité et sa froideur apparente peuvent te faire t'effacer et taire tes besoins." },
            { code: "ENTP", raison: "son goût du débat peut bousculer ta sensibilité et ta réflexion posée." },
          ],
        },
        {
          ton: "positif",
          items: [
            "Les tempéraments attentionnés et fidèles capables de profondeur.",
            "Les profils affirmés et confiants qui t'aident à t'affirmer.",
            "Les tempéraments légers qui t'aident à lâcher prise et à alléger ton mental.",
          ],
          profils: [
            { code: "INFJ", raison: "sa profondeur et sa finesse résonnent avec ta quête de compréhension mutuelle." },
            { code: "ESFJ", raison: "sa chaleur et son attention rejoignent ton goût du soin et te rassurent." },
            { code: "ENFP", raison: "son enthousiasme et sa légèreté t'aident à lâcher prise et à ne pas trop réfléchir." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Ta finesse fait de toi un soutien d'une justesse rare,\nmais à trop réfléchir et à taire tes besoins, tu peux t'effacer du lien.",
        lumiere:
          "Ton écoute, ton discernement et ta chaleur font de toi un proche auprès de qui on se sent vraiment compris et soutenu avec justesse.",
        ombre:
          "Mais à sur-analyser, à t'inquiéter et à taire ce dont tu as besoin, tu peux t'épuiser et laisser l'autre dans l'ignorance de tes attentes.",
        bascule:
          "Le jour où tu apaises ton mental et où tu oses exprimer tes besoins, ton soutien devient à la fois juste pour l'autre et nourrissant pour toi.",
      },
    },
    "ISFJ-V3-carriere": {
      forces: [
        { titre: "Un soutien juste", accent: "juste", texte: "Tu comprends ce qui se joue et tu offres une aide adaptée et pertinente, jamais à côté." },
        { titre: "Une observation fine", accent: "observation", texte: "Tu perçois ce que les autres ne voient pas et tu comprends les situations en profondeur." },
        { titre: "Un vrai discernement", accent: "discernement", texte: "Tu réfléchis avant d'agir, ce qui rend ton travail mûri, précis et bien pensé." },
        { titre: "Une fiabilité exemplaire", accent: "fiabilité", texte: "On sait pouvoir se fier à toi : tu honores tes engagements avec un sérieux et un soin remarquables." },
        { titre: "Une dimension humaine", accent: "humaine", texte: "Tu apportes une intelligence des gens et une attention que les esprits purement fonctionnels n'ont pas." },
        { titre: "Une attention au détail", accent: "détail", texte: "Tu remarques les signes et tu prépares les choses avec une précision rare." },
      ],
      ombres: [
        { titre: "La sur-réflexion", accent: "sur-réflexion", texte: "Tu peux trop anticiper, t'inquiéter et te charger de soucis jusqu'à l'épuisement mental." },
        { titre: "L'oubli de soi", accent: "oubli", texte: "Ton dévouement peut te faire te surcharger en t'occupant des autres et négliger tes propres besoins." },
        { titre: "L'effacement", accent: "effacement", texte: "Ta discrétion peut te faire rester en retrait et ne pas faire valoir ton discernement et ta valeur." },
        { titre: "L'hésitation", accent: "hésitation", texte: "Ta tendance à sur-analyser les conséquences peut te faire douter et retarder tes décisions." },
        { titre: "Une sensibilité aux ambiances", accent: "ambiances", texte: "La précipitation, l'agressivité et le travail bâclé te démotivent et te pèsent." },
        { titre: "Un manque d'affirmation", accent: "affirmation", texte: "Tu peux hésiter à défendre tes intérêts et à mettre en avant ce que tu apportes." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "La précipitation et le travail bâclé.",
            "Les environnements agressifs et impersonnels.",
            "La superficialité et le manque de sens.",
            "Le manque de reconnaissance de ton discernement.",
            "L'instabilité et le manque de temps pour bien faire.",
          ],
        },
        {
          ton: "positif",
          items: [
            "Un travail qui a du sens humain.",
            "Un environnement stable et respectueux.",
            "Le temps de comprendre et de bien faire.",
            "Pouvoir observer, comprendre et aider en profondeur.",
            "Un cadre où ton discernement est valorisé.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Les milieux superficiels et précipités.",
            "Les environnements agressifs et impersonnels.",
            "Les postes bâclés sans temps pour bien faire.",
          ],
          profils: [
            { nom: "Cadences effrénées, travail bâclé", raison: "la précipitation t'empêche de comprendre et de bien faire." },
            { nom: "Environnements agressifs et froids", raison: "aucune place pour la finesse et le soin qui te font vibrer." },
            { nom: "Postes superficiels et impersonnels", raison: "rien à comprendre en profondeur ni d'humain à servir." },
          ],
        },
        {
          ton: "positif",
          items: [
            "L'accompagnement, le conseil et l'écoute.",
            "Les métiers de l'aide, du soin et de l'éducation attentive.",
            "Les ressources humaines et l'analyse au service des gens.",
          ],
          profils: [
            { nom: "Accompagnement & écoute", raison: "conseiller, écoutant, psychologue : comprendre en profondeur et soutenir avec justesse." },
            { nom: "Aide, soin & éducation", raison: "soignant, éducateur attentif : allier ta finesse à ton dévouement." },
            { nom: "Ressources humaines & analyse", raison: "RH, analyste au service des gens : mettre ton discernement au service de l'humain." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Ta réflexion fait la justesse de ton travail,\nmais à trop penser et à t'effacer, tu peux t'épuiser et passer inaperçu.",
        lumiere:
          "Ton discernement, ton observation fine et ton attention humaine font de toi un élément précieux qui voit ce que les autres ne voient pas.",
        ombre:
          "Mais à sur-analyser, à t'inquiéter et à ne pas oser faire valoir ta valeur, tu t'exposes à l'épuisement mental et au manque de reconnaissance.",
        bascule:
          "Le jour où tu fais confiance à ton discernement sans tout repenser et où tu prends ta place, ta belle finesse s'épanouit et est justement reconnue.",
      },
    },
    "ISFJ-V3-developpement": {
      evolution: `Ta personnalité n'est jamais figée : elle se transforme, et ton type emprunte un chemin de maturation particulièrement net. Plus jeune, tu es tout entier dans ta réflexion et ton dévouement attentif : observer, comprendre, soutenir avec justesse, te soucier des autres. C'est beau et précieux, mais souvent déséquilibré : tu peux trop réfléchir au point de t'inquiéter sans cesse, t'épuiser de soucis, t'oublier, t'effacer et taire tes besoins. Tu comprends tout le monde finement, mais tu te perds dans tes pensées et ton dévouement.

Avec le temps et l'expérience, quelque chose de précieux s'ouvre en toi. Tu comprends que trop réfléchir n'aide pas, que ton bien-être compte autant que celui des autres, que faire confiance et lâcher prise est aussi une sagesse, et que ta valeur mérite d'être affirmée. Tu apprends à apaiser ton mental, à t'affirmer, à exprimer tes besoins, à prendre soin de toi, sans rien perdre de ton discernement. Dans ta pleine maturité, tu deviens un soutien réfléchi d'une justesse exemplaire qui sait aussi lâcher prise, s'affirmer et prendre soin de lui. Et c'est entièrement à ta portée.`,
      etapes: [
        "Tu observes déjà finement et tu perçois ce dont les autres ont besoin. Sensible et attentif, tu offres spontanément le bon mot et le bon soutien, le cœur tourné vers les autres.",
        "Ta réflexion et ton dévouement sont à leur comble : tu comprends tout le monde, tu te soucies, tu soutiens sans compter. C'est précieux, mais souvent déséquilibré : tu t'inquiètes, tu t'effaces, et apaiser ton mental ne va pas encore de soi.",
        "Tu comprends que trop réfléchir n'aide pas et que ton bien-être compte autant que celui des autres. Tu apprends à lâcher prise, à t'affirmer et à exprimer tes besoins, sans rien perdre de ta finesse.",
        "Dans ta pleine maturité, tu es un soutien réfléchi d'une justesse exemplaire qui sait aussi lâcher prise et prendre sa place. Ton discernement s'accompagne de sérénité : le toi le plus pleinement réalisé.",
      ],
      leviersForts: [
        { titre: "Apprends à apaiser ton mental", texte: "C'est ton plus grand levier : ta réflexion est une force, mais trop penser t'épuise. Apprends à lâcher prise, à faire confiance et à sortir de la rumination par l'action et l'apaisement." },
        { titre: "Prends soin de toi", texte: "Honore tes propres besoins et accorde-toi du repos. Te préserver n'est pas trahir ton dévouement, c'est ce qui te permet de continuer à offrir ton soutien sans t'épuiser." },
        { titre: "Affirme-toi et exprime tes besoins", texte: "Apprends à prendre ta place et à faire valoir ton discernement. Sortir de l'effacement te rend justice et enrichit tes relations." },
        { titre: "Fais confiance à ton discernement", texte: "Tu as une belle intelligence des situations : apprends à t'y fier sans tout repenser cent fois. Décider et agir avec confiance libère ta force et t'apaise." },
      ],
      questions: [
        { situation: "Quand une inquiétude tourne en boucle", question: "Est-ce que ce souci m'aide vraiment, ou est-ce que je rumine pour rien ?" },
        { situation: "Quand tu te soucies de tout le monde", question: "Est-ce que je prends autant soin de moi que des autres ?" },
        { situation: "Quand tu restes en retrait", question: "Et si j'osais exprimer ce que je pense et ce dont j'ai besoin ?" },
        { situation: "Quand une décision t'angoisse", question: "Et si je faisais confiance à mon discernement plutôt que de tout repenser ?" },
        { situation: "Quand tu te sens vidé", question: "De quel repos ou de quel soutien ai-je besoin, là, maintenant ?" },
      ],
      paradoxe: {
        tension:
          "Ta réflexion fait la justesse de ton aide,\nmais à trop penser et à t'effacer, tu risques de t'inquiéter et de te perdre.",
        lumiere:
          "Ton observation fine, ton discernement et ta chaleur sont une force rare : tu as déjà tout en toi pour soutenir les autres avec une justesse précieuse.",
        ombre:
          "Mais à te noyer dans l'inquiétude et à taire qui tu es, ton beau discernement se transforme en anxiété et en effacement.",
        bascule:
          "Le jour où tu allies ton discernement à la sérénité et où tu oses prendre ta place, ton don devient une force pleine, sereine et reconnue.",
      },
    },
  },
};

export default isfj;
