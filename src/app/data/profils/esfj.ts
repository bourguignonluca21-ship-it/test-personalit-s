// =============================================================================
// CONTENU DU PROFIL ESFJ (« Consul »), 3 variantes.
//   V1 : Hôte
//   V2 : Gardien Bienveillant
//   V3 : Dévoué Réfléchi
// Source : rapports longs ESFJ_V1/V2/V3. Gabarit : INFP/ENFP/INFJ dans profils.ts.
// Voix « tu », aucun tiret long, mot-clé en vert via le champ `accent`.
// =============================================================================

const esfj = {
  // Texte commun au type, affiché sous les barres du spectre.
  traitsTexte: {
    ESFJ: `Ton esprit est tourné vers l'extérieur et vers les gens : tu puises ton énergie dans le contact, le lien et la présence des autres, et ton attention va d'abord à ce qu'ils ressentent et à ce dont ils ont besoin. Là où d'autres laissent les relations au hasard, toi tu les tisses et tu les entretiens : tu sens le climat d'un groupe, tu remarques celui qu'on oublie, tu gardes en mémoire ce qui tient à cœur à chacun. Cette chaleur attentive, alliée à un vrai sens du concret, fait de toi quelqu'un autour de qui une communauté se forme et se sent bien.

Derrière cette générosité bat un cœur profondément dévoué, mais aussi sensible au regard des autres. Ton besoin d'harmonie et de reconnaissance est ta plus grande force, et il a son revers : tu peux trop dépendre de l'approbation, fuir les conflits et t'oublier à force de donner. Tout l'enjeu de ton chemin, c'est d'apprendre à prendre soin de toi autant que des autres et à t'appuyer sur ton propre jugement, pour que ta chaleur cesse de te coûter et devienne un don sain et durable.`,
  },

  // 1 phrase de description par variante (survol des barres de variante).
  descriptions: {
    "ESFJ-V1":
      "Les Hôtes sont les plus tournés vers le lien social et l'animation du groupe. Ils rassemblent, mettent à l'aise, veillent au climat et font que chacun se sente accueilli et inclus.",
    "ESFJ-V2":
      "Les Gardiens Bienveillants veillent à la stabilité et au soin concret du cercle. Ils maintiennent les repères, prennent soin du quotidien et offrent aux leurs un cadre sûr et chaleureux.",
    "ESFJ-V3":
      "Les Dévoués Réfléchis allient la chaleur au discernement. Ils aident avec méthode, savent poser un cadre et prennent du recul pour offrir un soutien à la fois généreux et juste.",
  },

  // 1 phrase d'accroche (héros) par variante.
  accroches: {
    "ESFJ-V1": "Tu ne te contentes pas d'aimer les gens, tu crées le lien qui les rassemble.",
    "ESFJ-V2": "Tu ne te contentes pas de prendre soin, tu fais tenir le quotidien de ceux que tu aimes.",
    "ESFJ-V3": "Tu n'aides pas seulement avec le cœur, tu aides avec le cœur et la tête.",
  },

  // Introduction longue (~2 paragraphes), sous le héros.
  intros: {
    "ESFJ-V1": `En tant que Consul (ESFJ), tu possèdes cette chaleur et cette sociabilité qui font les êtres autour desquels un groupe se forme et se sent bien. Là où d'autres attendent qu'on vienne les chercher, toi tu vas vers les gens, tu mets à l'aise, tu sens quand l'ambiance se tend et tu fais ce qu'il faut pour que chacun se sente bien. Tu remarques celui qu'on a oublié d'inclure, tu retiens ce qui compte pour les autres, tu fais en sorte que personne ne reste sur le bord. Parmi les trois visages de ton type, tu es le plus tourné vers le lien : l'Hôte.

Ce qui te porte, c'est le bonheur des gens et l'harmonie du groupe. Tu tires une vraie satisfaction de voir les autres bien ensemble, inclus, contents, et tu allies cette chaleur à un soin concret : ton attention ne reste pas au stade de l'intention, elle passe par des gestes et une présence fiable. Cette même chaleur peut se retourner contre toi : à force de veiller au bonheur de tous, tu peux dépendre de l'approbation et t'oublier toi-même. Ton plus beau terrain de croissance sera d'apprendre à t'inclure dans le soin que tu donnes.`,

    "ESFJ-V2": `En tant que Consul (ESFJ), tu as la chaleur et le dévouement de ta famille d'âme, et tu les mets au service de la stabilité et du soin concret de ton cercle. Là où d'autres consomment la stabilité sans la voir, toi tu la crées, jour après jour, pour ceux que tu aimes : tu maintiens les repères, tu entretiens les habitudes qui rassurent, tu veilles à ce que rien ne manque. Tu gardes en tête ce qui compte pour les tiens et tu agis concrètement pour leur bien-être. Parmi les trois visages de ton type, tu es le Gardien Bienveillant.

Ce qui te porte, c'est le bien-être et la sécurité des tiens. Tu tires une vraie satisfaction de voir ceux que tu aimes à l'abri, bien entourés, dans un cadre stable et chaleureux, et tu allies cette chaleur à un soin éminemment concret qui s'incarne dans les gestes du quotidien. Cette même chaleur peut se retourner contre toi : à force de tout porter, tu peux t'oublier, dépendre de la reconnaissance et te crisper sur ce qui ne doit pas bouger. Ton plus beau terrain de croissance sera d'apprendre à t'inclure dans le soin que tu donnes et à accueillir le changement sans crainte.`,

    "ESFJ-V3": `En tant que Consul (ESFJ), tu as la chaleur et le dévouement de ta famille d'âme, mais tu les tempères d'un discernement plus marqué. Là où d'autres aident d'instinct, sans réfléchir, toi tu mêles l'élan et la réflexion : tu te soucies profondément des gens, mais tu sais aussi prendre du recul, peser, discerner ce qui aide vraiment de ce qui fait juste plaisir sur le moment. Tu allies la chaleur à un jugement posé, le dévouement à la lucidité. Parmi les trois visages de ton type, tu es le Dévoué Réfléchi.

Ce qui te porte, c'est le bien-être des autres, mais un bien-être que tu veux réel et durable, pas seulement immédiat. Tu tires une vraie satisfaction d'aider de façon juste, de poser le bon cadre, de soutenir sans entretenir la dépendance. Cette double nature peut aussi te tirailler : ton élan veut se donner, ta lucidité te retient, et tu peux rester suspendu entre les deux. Ton plus beau terrain de croissance sera d'apprendre à faire travailler ensemble ce que tu ressens et ce que tu raisonnes, au lieu de les opposer.`,
  },

  // Texte long de la variante (~2 paragraphes), sous les barres de variante.
  texteVariante: {
    "ESFJ-V1": `Parmi les trois visages du Consul, tu es le plus tourné vers le lien social et l'animation du groupe. Tu n'es pas avant tout le gardien bienveillant centré sur la stabilité du cercle, ni le dévoué réfléchi qui aide avec recul : ce qui te met en mouvement, c'est de rassembler, d'accueillir, de faire vivre les relations. Réunir les gens, mettre de l'ambiance, veiller au climat, faire que chacun se sente inclus te comble plus que tout.

Cette combinaison, la chaleur, le sens du concret et le goût de l'harmonie, fait de toi celui autour de qui le groupe se forme et se sent chez lui, quelqu'un qui tisse et entretient les liens là où d'autres les laissent au hasard. Le revers, c'est que cette soif d'harmonie et de reconnaissance peut te faire t'oublier et taire ce que tu ressens : ton plus beau chemin de croissance sera d'apprendre à réunir les autres en restant toi-même, et à te garder une place à la table.`,

    "ESFJ-V2": `Parmi les trois visages du Consul, tu es le plus tourné vers la stabilité et le soin concret du cercle. Tu n'es pas avant tout l'hôte centré sur le lien social et l'animation, ni le dévoué réfléchi qui aide avec recul : ce qui te met en mouvement, c'est de maintenir les repères, de prendre soin du quotidien, de sécuriser la vie des tiens. Entretenir les traditions, veiller au confort des tiens, maintenir un cadre sûr et chaleureux te comble plus que tout.

Cette combinaison, la chaleur, le sens du concret et le goût de la stabilité, fait de toi celui sur qui le quotidien repose et grâce à qui les tiens se sentent à l'abri. Le revers, c'est que cet attachement à ce qui est stable peut te faire te crisper sur les habitudes et refuser le changement même nécessaire, à force de tout porter pour les autres : ton plus beau chemin de croissance sera d'apprendre à prendre soin sans t'oublier et à t'ouvrir au neuf sans te sentir menacé.`,

    "ESFJ-V3": `Parmi les trois visages du Consul, tu es le plus tourné vers le soin lucide et structuré. Tu n'es pas avant tout l'hôte centré sur le lien social, ni le gardien bienveillant centré sur la stabilité du quotidien : ce qui te caractérise, c'est ta façon d'aider avec discernement, en alliant le cœur et la tête. Aider avec méthode, savoir poser un cadre, prendre du recul avant de te donner, soutenir sans entretenir la dépendance, voilà ce qui dessine ta façon d'être.

Cette combinaison, la chaleur, le sens du concret et le discernement, fait de toi un dévoué dont l'aide est à la fois généreuse et juste, quelqu'un dont le conseil vaut autant que le réconfort. Le revers, c'est que cette double nature peut te tirailler : ton cœur te pousse à donner, ta tête te dit de te préserver, et tu peux rester coincé entre les deux. Ton plus beau chemin de croissance sera d'apprendre à réconcilier l'élan et le discernement plutôt qu'à les laisser se contredire.`,
  },

  // Détail enrichi par variante : 6 forces, 6 ombres, 1 paradoxe central.
  varianteDetail: {
    "ESFJ-V1": {
      forces: [
        { titre: "Un don pour créer du lien", accent: "lien", texte: "Tu sais rassembler les gens, les mettre à l'aise et faire qu'ils se sentent bien ensemble, là où d'autres laissent les relations au hasard." },
        { titre: "Une lecture fine des gens", accent: "lecture", texte: "Tu perçois vite le climat d'un groupe, l'humeur de quelqu'un, la tension qui monte, et tu agis au bon moment." },
        { titre: "Une chaleur qui réconforte", accent: "chaleur", texte: "Tu offres une présence accueillante et attentionnée auprès de laquelle les gens se sentent vus et soutenus." },
        { titre: "Une fiabilité concrète", accent: "fiabilité", texte: "Ton attention se traduit en actes : tu te souviens, tu organises, tu réponds présent, ce qui fait de toi un appui solide." },
        { titre: "Le ciment des groupes", accent: "ciment", texte: "Tu entretiens les relations et tu organises les retrouvailles, et c'est souvent grâce à toi qu'une famille ou une bande reste soudée." },
        { titre: "Un sens de l'inclusion", accent: "inclusion", texte: "Tu remarques celui qu'on oublie et tu fais en sorte que personne ne reste sur le bord, avec une attention rare." },
      ],
      ombres: [
        { titre: "La dépendance à l'approbation", accent: "dépendance", texte: "Ton besoin d'être apprécié peut te rendre très sensible à la critique et au rejet, jusqu'à te blesser pour peu." },
        { titre: "L'oubli de soi", accent: "oubli", texte: "Ton souci des autres peut te faire négliger tes propres besoins, jusqu'à l'épuisement : tu donnes beaucoup et tu réclames peu." },
        { titre: "La fuite du conflit", accent: "fuite", texte: "Ta soif d'harmonie peut te pousser à esquiver les désaccords et à taire ce qui ne va pas, au lieu de le dire." },
        { titre: "Une méfiance du changement", accent: "méfiance", texte: "Ton attachement à ce qui est stable et familier peut te rendre réticent au neuf, même quand il serait bénéfique." },
        { titre: "Un besoin de reconnaissance", accent: "reconnaissance", texte: "Tu peux espérer une gratitude que tu n'oses pas demander, et te sentir blessé quand elle ne vient pas." },
        { titre: "Une chaleur qui peut peser", accent: "peser", texte: "Ton attention constante peut sembler envahissante à ceux qui ont besoin de plus de distance." },
      ],
      paradoxe: {
        tension:
          "Ton besoin d'harmonie et d'être apprécié est ta plus grande force,\nmais il peut te faire t'oublier et taire ce que tu ressens vraiment.",
        lumiere:
          "Ta chaleur, ton attention aux autres et ton don de créer du lien sont des cadeaux immenses : tu rassembles, tu réconfortes, tu fais que les gens se sentent bien.",
        ombre:
          "Mais poussées trop loin, ces mêmes qualités peuvent te conduire à dépendre de l'approbation, à éviter tout conflit et à t'effacer derrière les besoins des autres jusqu'à ne jamais réclamer ta part.",
        bascule:
          "Le jour où tu apprends à prendre soin des autres sans t'oublier, à te fier à ton propre jugement et à dire ce que tu ressens, ta chaleur cesse de te coûter pour devenir un don sain et durable.",
      },
    },
    "ESFJ-V2": {
      forces: [
        { titre: "Un soin profondément concret", accent: "concret", texte: "Tu perçois les besoins des tiens et tu y réponds par des actes et des attentions pratiques, là où d'autres en restent aux bonnes intentions." },
        { titre: "Une stabilité rassurante", accent: "stabilité", texte: "Tu maintiens les repères, les habitudes et les traditions qui rassurent, et tu offres un socle sûr dans un monde mouvant." },
        { titre: "Une fiabilité solide", accent: "fiabilité", texte: "Quand on compte sur toi, tu es là, et ce que tu prends en charge est mené à bien, sans faille." },
        { titre: "Une attention au détail", accent: "attention", texte: "Tu gardes en mémoire les habitudes et les petites choses qui font du bien, ce qui rend ton soin précis et personnel." },
        { titre: "Une chaleur qui sécurise", accent: "chaleur", texte: "Tu offres une présence douce et rassurante, un quotidien où l'on se sent en sécurité et aimé." },
        { titre: "Un point d'ancrage pour les tiens", accent: "ancrage", texte: "Ta constance et ton dévouement font de toi celui sur qui le quotidien repose et sur qui l'on peut vraiment se reposer." },
      ],
      ombres: [
        { titre: "La résistance au changement", accent: "résistance", texte: "Ton goût du familier et de l'éprouvé peut te rendre réticent au neuf, même quand il serait bénéfique." },
        { titre: "L'oubli de soi", accent: "oubli", texte: "Ton dévouement au quotidien des autres peut te faire négliger tes propres besoins, jusqu'à l'épuisement." },
        { titre: "La dépendance à l'approbation", accent: "dépendance", texte: "Ton attention aux autres peut te rendre sensible à la critique et au sentiment de ne pas être reconnu." },
        { titre: "Un soin parfois intrusif", accent: "intrusif", texte: "Ton désir de bien faire peut te pousser à t'occuper de ce qu'on ne t'a pas demandé ou à vouloir le bien des autres à ta façon." },
        { titre: "Une crispation sur les repères", accent: "crispation", texte: "Tu peux t'accrocher rigidement aux habitudes et vivre tout bouleversement comme une menace." },
        { titre: "Une reconnaissance attendue", accent: "reconnaissance", texte: "À force de tout porter en silence, tu peux guetter une gratitude que tu n'oses pas demander." },
      ],
      paradoxe: {
        tension:
          "Ton dévouement à sécuriser le quotidien des tiens est un cadeau immense,\nmais il peut te faire t'oublier et te crisper sur ce qui ne doit pas bouger.",
        lumiere:
          "Ta chaleur, ton soin concret et ton attachement à la stabilité mettent les tiens à l'abri : tu maintiens les repères et tu offres un quotidien sûr et chaleureux.",
        ombre:
          "Mais poussées trop loin, ces mêmes qualités peuvent t'épuiser pour les autres, te faire dépendre de leur reconnaissance et te crisper sur les habitudes jusqu'à refuser le changement nécessaire.",
        bascule:
          "Le jour où tu apprends à prendre soin sans t'oublier, à accueillir le changement sans te sentir menacé et à écouter ton propre jugement, ton dévouement cesse de te coûter pour devenir un don sain et durable.",
      },
    },
    "ESFJ-V3": {
      forces: [
        { titre: "Une aide avec discernement", accent: "discernement", texte: "Tu réfléchis à ce qui aide vraiment plutôt que de céder à l'élan du moment, et tu donnes ce dont les gens ont besoin, pas seulement ce qui leur plaît." },
        { titre: "L'alliance du cœur et de la tête", accent: "alliance", texte: "Là où beaucoup penchent d'un côté, toi tu tiens la chaleur et le jugement ensemble, ce qui rend ton avis à la fois bienveillant et réfléchi." },
        { titre: "Le sens du cadre", accent: "cadre", texte: "Ton dévouement ne t'empêche pas de fixer des limites quand c'est nécessaire, pour toi comme pour les autres, et d'aider sans rendre l'autre dépendant." },
        { titre: "Une chaleur sincère", accent: "chaleur", texte: "Malgré ton recul, tu n'es jamais froid : tu te soucies vraiment des gens et tu le montres." },
        { titre: "Un jugement posé", accent: "jugement", texte: "Tu sais prendre du recul avant d'agir ou de te prononcer, ce qui t'évite bien des erreurs et fait de toi un conseiller précieux." },
        { titre: "Un soutien fiable", accent: "soutien", texte: "Ta chaleur authentique doublée de lucidité fait de toi un appui sur qui l'on peut compter, pour le réconfort comme pour le conseil." },
      ],
      ombres: [
        { titre: "Le tiraillement entre cœur et raison", accent: "tiraillement", texte: "Ton dévouement te pousse à aider, ton discernement à te retenir, et tu peux rester coincé entre les deux, hésitant." },
        { titre: "Une tendance à trop t'analyser", accent: "analyser", texte: "Ton recul peut se retourner en autocritique : tu juges tes propres élans et tu doutes de bien faire." },
        { titre: "L'oubli de soi", accent: "oubli", texte: "Même avec ton discernement, ton dévouement peut te faire trop donner et négliger tes propres besoins." },
        { titre: "La dépendance à l'approbation", accent: "dépendance", texte: "Ton attention aux autres peut te rendre sensible à la critique, malgré ton recul." },
        { titre: "Un recul pris pour de la distance", accent: "distance", texte: "Ta lucidité et ta réserve peuvent parfois être lues comme de la froideur par ceux qui te côtoient." },
        { titre: "La paralysie du choix parfait", accent: "paralysie", texte: "À chercher l'équilibre absolu entre aider et te préserver, tu peux hésiter sans fin et ne plus trancher." },
      ],
      paradoxe: {
        tension:
          "Ton cœur veut se donner sans compter,\nmais ta lucidité te retient, et tu peux rester pris entre les deux.",
        lumiere:
          "Ta chaleur, ton dévouement et ton discernement sont des cadeaux immenses : tu aides avec justesse, tu allies l'empathie au recul, tu soutiens sans te perdre.",
        ombre:
          "Mais cette double nature peut te tirailler : ton élan te pousse à donner, ta lucidité te dit de te préserver, et tu peux te retrouver coincé, à hésiter, à t'analyser au lieu d'agir.",
        bascule:
          "Quand tu parviens à faire dialoguer le cœur et la raison plutôt qu'à les dresser l'un contre l'autre, à te faire confiance et à accepter qu'aucune mesure n'est parfaite, ton tiraillement devient ta plus grande force.",
      },
    },
  },

  // Texte de la section « Mes relations » (~2 paragraphes) par variante.
  relationsTexte: {
    "ESFJ-V1": `En amour comme en amitié, tu es chaleureux, dévoué et profondément attentionné. Quand tu aimes, tu prends soin, tu places le bien-être de l'autre au cœur de tes préoccupations, tu crées de la chaleur et de la complicité au quotidien. Être aimé par toi, c'est se sentir choyé, soutenu, accompagné dans les petites choses comme dans les grandes. En amitié, tu es souvent le pilier du groupe : celui qui organise, qui garde le contact, qui se souvient des dates qui comptent et qui réunit tout le monde.

Tes défis sont les revers de ta nature. Ton besoin d'harmonie peut te faire éviter les sujets qui fâchent, jusqu'à laisser des tensions s'accumuler en silence. Ton dévouement peut te faire t'oublier et attendre une reconnaissance que tu n'oses pas réclamer. Et ton besoin d'approbation peut te rendre vulnérable au moindre signe de froideur. Ton chemin, c'est d'oser exprimer tes besoins et tes désaccords, de recevoir autant que tu donnes, et de ne pas faire dépendre ton équilibre du seul regard de l'autre. Quand tu y parviens, tu offres une relation d'une chaleur et d'une fidélité rares.`,

    "ESFJ-V2": `En amour comme en amitié, tu es dévoué, attentionné et profondément protecteur du quotidien. Quand tu aimes, tu prends soin, tu construis un cadre stable et chaleureux, tu places le confort et la sécurité de l'autre au cœur de tes préoccupations. Être aimé par toi, c'est se sentir choyé dans les petites choses, soutenu, certain d'avoir un foyer sûr. En amitié, tu es l'ami fidèle et attentionné : tu n'as pas forcément un large cercle, mais tes amitiés sont profondes, stables et anciennes.

Tes défis sont les revers de ta nature. Ton dévouement peut te faire t'oublier et espérer en silence une reconnaissance que tu n'oses pas demander. Ton attachement aux habitudes peut te rendre réticent aux changements que souhaite l'autre. Et ta crainte des frictions peut t'amener à taire ce qui te blesse. Ton chemin, c'est d'exprimer tes besoins, d'accueillir un peu de changement et de recevoir autant que tu donnes. Quand tu y parviens, tu offres une relation d'une tendresse et d'une fidélité rares.`,

    "ESFJ-V3": `En amour comme en amitié, tu es chaleureux et dévoué, mais avec un discernement qui te distingue. Quand tu aimes, tu prends soin de l'autre tout en gardant la lucidité de ce qui est sain pour vous deux : tu offres une présence attentive et réfléchie, un soutien qui n'étouffe pas. Être aimé par toi, c'est se sentir choyé sans être materné, soutenu sans être enfermé. En amitié, tu es l'ami à la fois chaleureux et de bon conseil, celui qui soutient mais qui sait aussi dire les choses avec justesse.

Tes défis sont les revers de ta nature. Ton tiraillement entre cœur et raison peut te faire hésiter, sur-analyser la relation, douter de tes propres élans. Ton dévouement peut te faire t'oublier malgré ta lucidité. Et ton recul peut parfois être pris pour de la distance. Ton chemin, c'est de te faire confiance, de laisser le cœur s'exprimer sans que la tête le censure, et d'appliquer ta bienveillance à toi-même. Quand tu y parviens, tu offres une relation d'une chaleur et d'une justesse rares.`,
  },

  // Texte de la section « Professionnel » (~2 paragraphes) par variante.
  proTexte: {
    "ESFJ-V1": `Au travail, tu es à ton aise dans les rôles où l'on prend soin, où l'on crée du lien, où l'on organise la vie collective. Une carrière qui te convient te met en contact avec les gens, te permet d'aider concrètement et de fédérer, dans un cadre humain et reconnaissant. Tu t'éteins dans les environnements froids, isolés ou purement compétitifs, et tu te révèles quand tu peux soutenir, accueillir et faire du bien : santé, éducation, accueil, ressources humaines, événementiel, métiers d'aide, vente relationnelle, organisation communautaire, partout où la chaleur humaine et la fiabilité comptent.

Tu travailles avec sérieux et attention aux autres, en pensant au bien-être de l'équipe, et on compte sur toi pour que l'ambiance tienne et que chacun se sente intégré. Ton défi principal touche à ton affirmation et à ton équilibre : ta compétence est rarement en cause, mais tu peux trop t'oublier, ne pas savoir dire non, dépendre de la reconnaissance et éviter les conflits nécessaires. Apprendre à poser des limites, à t'affirmer et à faire valoir ta valeur est ce qui rend ta belle vocation durable et justement reconnue.`,

    "ESFJ-V2": `Au travail, tu es à ton aise dans les rôles où l'on prend soin, où l'on assure la continuité, où l'on fait tourner le quotidien des gens. Une carrière qui te convient te permet d'aider concrètement, dans un cadre stable, humain et reconnaissant. Tu t'éteins dans les environnements froids, chaotiques ou purement compétitifs, et tu te révèles quand tu peux soutenir, sécuriser et prendre soin dans la durée : santé, éducation, administration, accueil, ressources humaines, métiers d'aide, fonctions de soutien, partout où la fiabilité, la chaleur et le sens du concret comptent.

Tu travailles avec sérieux, fiabilité et attention aux autres, en pensant au bien-être de l'équipe et à la continuité, et on compte sur toi pour que les choses soient faites avec soin et tiennent dans le temps. Ton défi principal touche à ton équilibre et à ta souplesse : ta compétence est rarement en cause, mais tu peux trop t'oublier, dépendre de la reconnaissance et te crisper face au changement. Apprendre à poser des limites, à t'affirmer et à accueillir le neuf est ce qui rend ta belle vocation durable et adaptée.`,

    "ESFJ-V3": `Au travail, tu es à ton aise dans les rôles où l'on aide les gens avec à la fois chaleur et discernement, où l'on doit soutenir tout en gardant la tête froide. Une carrière qui te convient te permet d'avoir un impact humain réel en mobilisant aussi ton jugement, dans un cadre stable et reconnaissant. Tu t'éteins dans les environnements froids ou purement compétitifs, et tu te révèles quand tu peux aider intelligemment : santé, accompagnement, conseil, éducation, ressources humaines, coordination, encadrement d'équipes humaines, partout où il faut à la fois de l'empathie et du discernement.

Tu travailles avec sérieux, chaleur et discernement, en pensant au bien-être de l'équipe mais aussi à l'efficacité réelle, et on peut compter sur ton soutien comme sur ton avis posé. Ton défi principal touche à ta confiance en toi et à ton équilibre : ta compétence est rarement en cause, mais tu peux trop t'analyser, hésiter entre cœur et raison, t'oublier malgré ta lucidité. Apprendre à te faire confiance, à trancher et à t'appliquer ta propre bienveillance est ce qui fait de ton équilibre un atout pleinement déployé.`,
  },

  // Section « Mindset & dév personnel » : accroche gratuite par variante.
  mindsetTexte: {
    "ESFJ-V1": {
      apercu: `Ton plus grand chantier n'est pas autour de toi, il est en toi. Tu portes une chaleur et un don du lien rares, mais aussi une tendance qui peut se retourner contre toi : la dépendance à l'approbation, l'oubli de soi, la fuite du conflit, la méfiance du changement. La bonne nouvelle, c'est que ces fragilités sont aussi tes plus grands leviers de croissance, dès lors que tu sais sur quel point agir.`,
    },
    "ESFJ-V2": {
      apercu: `Ton plus grand chantier n'est pas de prendre soin des autres, ton dévouement n'en manque jamais, c'est d'apprendre à t'y inclure. Tu portes en toi une chaleur et une fiabilité rares, mais aussi une tendance à t'oublier, à dépendre de la reconnaissance, à te crisper sur tes repères et à refuser le changement. La bonne nouvelle, c'est que ces fragilités sont aussi tes plus grands leviers de croissance, une fois que tu sais par où commencer.`,
    },
    "ESFJ-V3": {
      apercu: `Ton plus grand chantier n'est pas de bien aider, tu sais le faire avec justesse, c'est d'apprendre à faire coopérer ton cœur et ta tête. Tu portes en toi la chaleur et le discernement, mais aussi une tendance à te tirailler entre les deux, à trop t'analyser, à t'oublier malgré ta lucidité. La bonne nouvelle, c'est que ces fragilités sont aussi tes plus grands leviers de croissance, à condition de viser le bon endroit.`,
    },
  },

  // Détail enrichi des GRANDES sections (relations, carriere, developpement) par variante.
  sectionDetail: {
    // ----------------------------------------------------------------- V1
    "ESFJ-V1-relations": {
      forces: [
        { titre: "Une présence attentionnée", accent: "attentionnée", texte: "Tu places le bien-être de l'autre au cœur de tes préoccupations et tu accompagnes dans les petites choses comme dans les grandes." },
        { titre: "Une chaleur au quotidien", accent: "chaleur", texte: "Tu crées de la complicité et de la convivialité chaque jour, et auprès de toi on se sent choyé et soutenu." },
        { titre: "Une loyauté entière", accent: "loyauté", texte: "Une fois donnée, ta fidélité est totale et tendre : tu offres une présence aimante et un soin de chaque instant." },
        { titre: "Le pilier du groupe", accent: "pilier", texte: "Tu organises, tu gardes le contact, tu te souviens des dates qui comptent et tu fais que les gens continuent de se voir." },
        { titre: "Une attention aux oubliés", accent: "attention", texte: "Tu remarques celui qu'on laisse de côté et tu fais en sorte que chacun se sente inclus et bienvenu." },
        { titre: "Un sens de l'harmonie", accent: "harmonie", texte: "Tu sens les tensions, tu désamorces les gênes et tu fais que les gens se sentent bien ensemble." },
      ],
      ombres: [
        { titre: "L'évitement des sujets qui fâchent", accent: "évitement", texte: "Ton besoin d'harmonie peut te faire éviter les désaccords, jusqu'à laisser des tensions s'accumuler en silence." },
        { titre: "L'oubli de soi", accent: "oubli", texte: "Ton dévouement peut te faire trop donner et t'oublier, jusqu'au déséquilibre ou au sentiment de ne pas être payé de retour." },
        { titre: "Une reconnaissance attendue", accent: "reconnaissance", texte: "Tu peux espérer un merci que tu n'oses pas demander, et te sentir blessé quand il manque." },
        { titre: "Une vulnérabilité au rejet", accent: "vulnérabilité", texte: "Ton besoin d'approbation peut te rendre fragile au moindre signe de froideur ou de critique." },
        { titre: "Le silence sur ce qui blesse", accent: "silence", texte: "Ta peur du conflit peut te faire taire ce qui te touche au lieu de l'exprimer." },
        { titre: "Une attention envahissante", accent: "envahissante", texte: "Ton soin constant peut sembler excessif à ceux qui ont besoin de plus d'espace." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "Les relations où tu donnes tout sans jamais recevoir en retour.",
            "Les tensions qu'on laisse s'accumuler dans le silence.",
            "Les personnes froides ou distantes qui te font douter de ta valeur.",
            "Le manque de reconnaissance et de gratitude pour ce que tu donnes.",
            "Les conflits durs et l'agressivité qui heurtent ton besoin d'harmonie.",
          ],
        },
        {
          ton: "positif",
          items: [
            "Une relation tendre, stable et engagée, fondée sur la réciprocité.",
            "Quelqu'un qui apprécie ton dévouement et prend soin de toi en retour.",
            "De la complicité, de la chaleur et une harmonie partagée.",
            "Quelqu'un qui t'encourage à exprimer tes besoins et tes désaccords.",
            "De la reconnaissance sincère pour ton attention et ta fidélité.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Les tempéraments très froids ou distants qui te laissent sur ta faim affective.",
            "Les profils qui prennent sans jamais te rendre ton attention.",
            "Les personnalités qui jugent durement ta sensibilité ou ton besoin de lien.",
          ],
          profils: [
            { code: "INTP", raison: "son détachement et sa réserve émotionnelle peuvent te laisser un sentiment de froideur." },
            { code: "ISTP", raison: "sa distance et son besoin d'autonomie cadrent mal avec ton besoin de chaleur et de contact." },
            { code: "INTJ", raison: "son indépendance et sa franchise directe peuvent heurter ta sensibilité au rejet." },
          ],
        },
        {
          ton: "positif",
          items: [
            "Les tempéraments chaleureux et fidèles qui partagent ton goût du lien.",
            "Les profils affirmés qui t'aident à t'affirmer et à moins dépendre de l'approbation.",
            "Ceux qui apprécient ta chaleur et prennent soin de toi en retour.",
          ],
          profils: [
            { code: "ISFP", raison: "sa douceur et son attention sincère rejoignent ton goût du soin mutuel." },
            { code: "ESFJ", raison: "il partage ta chaleur et ton goût du lien, et vous construisez dans la convivialité." },
            { code: "ENFJ", raison: "sa chaleur et son sens des autres résonnent avec ton don de rassembler et de réconforter." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Tu veilles au bonheur de tous et tu crées le lien partout,\nmais à force de t'effacer, tu peux ne jamais réclamer ta part.",
        lumiere:
          "Ta chaleur, ta fidélité et ton don de tisser le lien font de toi un partenaire et un ami auprès de qui on se sent choyé et inclus.",
        ombre:
          "Mais à fuir le conflit, à dépendre de l'approbation et à t'oublier, tu peux laisser des tensions s'accumuler et te vider sans jamais recevoir.",
        bascule:
          "Le jour où tu oses exprimer tes besoins, où tu reçois autant que tu donnes et où tu réunis en restant toi-même, tu te gardes enfin une place à la table.",
      },
    },
    "ESFJ-V1-carriere": {
      forces: [
        { titre: "Un don pour fédérer", accent: "fédérer", texte: "Tu rassembles, tu animes, tu crées de la convivialité, et autour de toi les équipes se soudent et se sentent bien." },
        { titre: "Une vraie attention humaine", accent: "attention", texte: "Tu veilles au climat et à ce que chacun se sente intégré, ce qui fait de toi un élément précieux dans tout collectif." },
        { titre: "Une fiabilité concrète", accent: "fiabilité", texte: "Tu fais les choses bien et complètement, et on compte sur toi pour que tout soit prêt et que personne ne soit oublié." },
        { titre: "Un sens du service", accent: "service", texte: "Tu prends vie quand tu peux aider, accueillir et faire du bien aux autres dans un cadre humain." },
        { titre: "Une organisation au service du lien", accent: "organisation", texte: "Tu transformes ton attention en soin concret et organisé : tu anticipes, tu prépares, tu réponds présent." },
        { titre: "Un climat harmonieux", accent: "harmonieux", texte: "Tu apaises les tensions et tu apportes une dimension humaine qui rend l'ambiance de travail meilleure." },
      ],
      ombres: [
        { titre: "Une difficulté à dire non", accent: "non", texte: "Ton sens du devoir peut te faire accepter trop de choses et te surcharger au service des autres." },
        { titre: "L'oubli de soi", accent: "oubli", texte: "À t'occuper de tout le monde, tu peux remplir ton temps sans jamais t'accorder de répit." },
        { titre: "La dépendance à la reconnaissance", accent: "dépendance", texte: "Ton besoin d'être apprécié peut te démotiver vite quand le travail manque de gratitude." },
        { titre: "L'évitement des conflits utiles", accent: "évitement", texte: "Ta peur du conflit peut te faire éviter les désaccords nécessaires et taire ce qui ne va pas." },
        { titre: "Une affirmation difficile", accent: "affirmation", texte: "Tu peux peiner à poser des limites et à faire valoir ta valeur, au risque qu'on l'oublie." },
        { titre: "Une sensibilité à l'ambiance", accent: "sensibilité", texte: "Les environnements froids, isolés ou conflictuels en permanence t'épuisent profondément." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "Les environnements froids, isolés ou impersonnels.",
            "La compétition agressive et les rapports de force constants.",
            "Le conflit permanent qui t'affecte profondément.",
            "L'ingratitude et le manque de reconnaissance.",
            "Le manque de contact humain et de sens.",
          ],
        },
        {
          ton: "positif",
          items: [
            "Un travail qui a du sens humain et du contact.",
            "Un climat harmonieux et bienveillant.",
            "Pouvoir aider, accueillir et fédérer les gens.",
            "De la reconnaissance sincère pour ton dévouement.",
            "Un cadre clair et stable où l'on travaille en équipe.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Les milieux purement compétitifs et impersonnels.",
            "Le travail isolé et sans contact humain.",
            "Les environnements en conflit permanent.",
          ],
          profils: [
            { nom: "Finance pure, trading agressif", raison: "la compétition froide et l'absence d'humain t'éteignent." },
            { nom: "Travail solitaire et isolé", raison: "ni contact ni lien pour te nourrir au quotidien." },
            { nom: "Environnements conflictuels", raison: "le conflit permanent et l'agressivité t'épuisent profondément." },
          ],
        },
        {
          ton: "positif",
          items: [
            "Le soin, la santé et les métiers de l'aide.",
            "L'accueil, les ressources humaines et l'événementiel.",
            "L'éducation et l'organisation communautaire.",
          ],
          profils: [
            { nom: "Soin & santé", raison: "infirmier, aide-soignant : prendre soin des gens avec chaleur et fiabilité." },
            { nom: "Accueil, RH & événementiel", raison: "hôtesse, RH, organisateur : créer du lien et fédérer les gens." },
            { nom: "Éducation & communauté", raison: "enseignant, animateur, coordinateur : rassembler et accompagner au quotidien." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Tu donnes le meilleur quand tu prends soin des autres,\nmais sans savoir dire non, ton dévouement peut te mener à l'épuisement.",
        lumiere:
          "Porté par le sens humain et l'harmonie, tu apportes une chaleur, une fiabilité et un soin du climat précieux dans tout collectif.",
        ombre:
          "Mais ta difficulté à t'affirmer, ta dépendance à la reconnaissance et ton évitement des conflits peuvent te faire trop porter et oublier ta valeur.",
        bascule:
          "Le jour où tu apprends à poser des limites, à dire non et à faire valoir ce que tu mérites, ton dévouement reste du côté de l'atout plutôt que de l'épuisement.",
      },
    },
    "ESFJ-V1-developpement": {
      evolution: `Ta personnalité n'est pas figée : elle mûrit, et ton type suit une trajectoire de croissance assez nette. Jeune, tu es surtout porté par ton besoin de lien et d'harmonie : plaire, rassembler, prendre soin, être apprécié. C'est généreux, mais souvent déséquilibré : tu peux dépendre énormément de l'approbation, te conformer aux attentes, t'oublier, fuir tout conflit et te blesser au moindre rejet. Tu prends soin de tout le monde, mais ton équilibre repose trop sur le regard des autres.

Avec le temps, tu réalises que ta valeur ne dépend pas de l'approbation de chacun, que poser des limites n'abîme pas le lien, qu'un désaccord exprimé vaut mieux qu'une rancœur tue. Tu apprends à t'appuyer sur ton propre jugement, à recevoir, à t'affirmer, à t'ouvrir au changement, sans rien perdre de ta chaleur. Dans ta pleine maturité, tu deviens un hôte chaleureux qui réunit sans s'oublier, qui donne sans se vider, qui sait dire non et exprimer ce qu'il ressent : la chaleur du lien alliée à la solidité intérieure. Et c'est entièrement à ta portée.`,
      etapes: [
        "Tu sens déjà le climat des gens, tu remarques celui qu'on oublie et tu vas spontanément vers les autres pour créer du lien. Le cœur tourné vers le bonheur du groupe.",
        "Ton besoin de lien et d'harmonie est à son comble : plaire, rassembler, être apprécié. C'est généreux, mais souvent déséquilibré : tu dépends de l'approbation, tu fuis le conflit, tu t'oublies, et te blesser au moindre rejet va encore trop vite.",
        "Tu réalises que ta valeur ne dépend pas de l'approbation de chacun et que poser des limites n'abîme pas le lien. Tu apprends à t'appuyer sur ton jugement, à recevoir, à t'affirmer, sans rien perdre de ta chaleur.",
        "Dans ta pleine maturité, tu es un hôte chaleureux qui réunit sans s'oublier et qui sait dire non. Ta chaleur s'allie à la solidité intérieure : c'est toi à ton plein épanouissement.",
      ],
      leviersForts: [
        { titre: "Appuie-toi sur ton propre jugement", texte: "Apprends à reconnaître ce que toi tu penses et veux, indépendamment de l'approbation des autres. Ton avis vaut autant que le leur, et t'y fier te rend libre et solide." },
        { titre: "Apprends à recevoir", texte: "Tu donnes énormément : laisse les autres prendre soin de toi en retour. La réciprocité te remplit et te permet de continuer à donner sans te vider." },
        { titre: "Ose le désaccord", texte: "Exprimer ce que tu ressens, même quand ça crée un froid passager, vaut mieux que de tout garder. Le conflit utile, dit avec respect, rapproche plus qu'il n'éloigne." },
        { titre: "Garde-toi une place à la table", texte: "Inclus-toi dans le soin que tu donnes : honore tes besoins, accorde-toi du repos. Réunir les autres en restant toi-même rend ta chaleur durable." },
      ],
      questions: [
        { situation: "Quand tu attends une reconnaissance", question: "Est-ce que j'ose exprimer ce dont j'ai besoin, ou j'attends qu'on le devine ?" },
        { situation: "Quand une tension monte", question: "Est-ce que je dis ce qui ne va pas, ou je laisse le silence l'aggraver ?" },
        { situation: "Quand on te critique", question: "Est-ce que ma valeur dépend vraiment de ce regard, ou puis-je m'appuyer sur la mienne ?" },
        { situation: "Quand tu prends soin de tout le monde", question: "Qui prend soin de moi, et est-ce que je le laisse faire ?" },
        { situation: "Quand un changement t'inquiète", question: "Et si m'ouvrir à ce neuf enrichissait ma vie, sans rien me faire perdre de mon ancrage ?" },
      ],
      paradoxe: {
        tension:
          "Pour t'épanouir, tu dois apprendre à t'affirmer et à recevoir,\nmais tu crains qu'en pensant à toi, tu trahisses ta générosité.",
        lumiere:
          "Ta chaleur, ton don du lien et ton attention aux autres sont une base de croissance immense : tu sais déjà rassembler et réconforter comme personne.",
        ombre:
          "Mais à dépendre de l'approbation, à fuir le conflit et à t'oublier, ta belle générosité peut devenir une source d'épuisement et de déséquilibre.",
        bascule:
          "Le jour où tu comprends que t'inclure dans le soin que tu donnes ne trahit pas ta générosité mais la rend durable, ta croissance s'enclenche vraiment.",
      },
    },
    // ----------------------------------------------------------------- V2
    "ESFJ-V2-relations": {
      forces: [
        { titre: "Un soin protecteur", accent: "protecteur", texte: "Tu construis un cadre stable et chaleureux et tu places le confort et la sécurité de l'autre au cœur de tes préoccupations." },
        { titre: "Une présence aimante", accent: "présence", texte: "Tu offres un soin concret de chaque instant et une fiabilité sans faille, et auprès de toi on se sent choyé dans les petites choses." },
        { titre: "Une loyauté entière", accent: "loyauté", texte: "Une fois donnée, ta fidélité est totale et tendre, tournée vers la durée et la sécurité affective." },
        { titre: "Un foyer sûr", accent: "foyer", texte: "Tu offres un quotidien partagé et harmonieux où l'autre se sent à l'abri et certain d'avoir un point d'ancrage." },
        { titre: "Des amitiés profondes", accent: "amitiés", texte: "Tes amitiés sont stables et anciennes : tu rends service, tu entretiens le lien, tu veilles sur les tiens avec constance." },
        { titre: "Une mémoire du cœur", accent: "mémoire", texte: "Tu te souviens de ce qui touche tes proches et tu es présent quand il le faut, avec un soutien concret et chaleureux." },
      ],
      ombres: [
        { titre: "L'oubli de soi", accent: "oubli", texte: "Ton dévouement peut te faire trop donner et t'oublier, jusqu'au déséquilibre." },
        { titre: "Une reconnaissance attendue", accent: "reconnaissance", texte: "Tu peux attendre une gratitude que tu n'oses pas réclamer, et te sentir tenu pour acquis." },
        { titre: "La réticence au changement", accent: "réticence", texte: "Ton attachement aux habitudes peut te rendre rétif aux évolutions que souhaite l'autre." },
        { titre: "Le silence sur ce qui blesse", accent: "silence", texte: "Ton désir de garder l'harmonie peut t'amener à ravaler ce qui te touche plutôt qu'à le dire." },
        { titre: "Un soin parfois intrusif", accent: "intrusif", texte: "Ton désir de bien faire peut te pousser à vouloir le bien des autres à ta façon plutôt qu'à la leur." },
        { titre: "Une dépendance au regard", accent: "dépendance", texte: "Ton attention aux autres peut te rendre vulnérable au moindre signe de froideur ou de critique." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "Les relations où tu donnes tout sans jamais recevoir.",
            "Les bouleversements de tes repères et de ton quotidien.",
            "Les personnes indépendantes ou distantes qui te blessent.",
            "Le manque de reconnaissance pour tout ce que tu fais.",
            "Les conflits durs qui heurtent ton besoin d'harmonie.",
          ],
        },
        {
          ton: "positif",
          items: [
            "Une relation stable, tendre et durable, fondée sur la fidélité.",
            "Quelqu'un qui apprécie ton dévouement et prend soin de toi en retour.",
            "De la sécurité affective et un quotidien partagé et harmonieux.",
            "Quelqu'un qui t'aide à exprimer tes besoins et à t'ouvrir un peu.",
            "De la gratitude sincère pour ton soin et ta constance.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Les tempéraments très indépendants ou détachés.",
            "Les profils qui prennent sans jamais te rendre ton soin.",
            "Les personnalités froides qui ne respectent pas ton dévouement.",
          ],
          profils: [
            { code: "INTP", raison: "son besoin d'autonomie et sa réserve peuvent te laisser un sentiment d'abandon." },
            { code: "ISTP", raison: "sa distance émotionnelle cadre mal avec ton besoin de proximité et de soin mutuel." },
            { code: "ENTP", raison: "son goût du changement et son indépendance peuvent bousculer ton besoin de stabilité." },
          ],
        },
        {
          ton: "positif",
          items: [
            "Les tempéraments chaleureux et attachés à la stabilité.",
            "Les profils affirmés qui t'aident à t'affirmer et à moins t'oublier.",
            "Ceux qui apprécient ton dévouement et prennent soin de toi en retour.",
          ],
          profils: [
            { code: "ISFJ", raison: "il partage ton goût du soin mutuel et de la durée, et vous construisez sur des bases sûres." },
            { code: "ISTJ", raison: "sa fiabilité et son attachement aux repères rejoignent ton besoin de stabilité." },
            { code: "ESTJ", raison: "son sens des responsabilités et sa constance s'accordent avec ton dévouement fidèle." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Tu construis un foyer sûr et tu prends soin du quotidien des tiens,\nmais à force de tout porter, tu peux t'oublier et te crisper sur tes repères.",
        lumiere:
          "Ta chaleur, ton soin concret et ta fidélité font de toi un partenaire et un ami auprès de qui on se sent à l'abri et aimé.",
        ombre:
          "Mais à t'oublier, à attendre une reconnaissance tue et à te crisper sur les habitudes, tu peux fragiliser l'équilibre des liens que tu chéris.",
        bascule:
          "Quand tu oses dire tes besoins, t'ouvrir au changement et recevoir autant que tu donnes, ton dévouement trouve enfin son équilibre.",
      },
    },
    "ESFJ-V2-carriere": {
      forces: [
        { titre: "Un soin concret au quotidien", accent: "concret", texte: "Tu fais tourner le quotidien des gens et tu réponds à des besoins tangibles, là où d'autres en restent aux intentions." },
        { titre: "Une fiabilité régulière", accent: "fiabilité", texte: "Tu honores tes engagements avec sérieux et constance, et on compte sur toi pour que les choses tiennent dans le temps." },
        { titre: "Le sens de la continuité", accent: "continuité", texte: "Tu assures le suivi et la stabilité, et tu fais que rien ne se perd et que tout reste en ordre." },
        { titre: "Une attention au détail", accent: "détail", texte: "Tu retiens ce qui compte pour chacun et tu apportes un soin précis qui fait la différence." },
        { titre: "Une dimension humaine", accent: "humaine", texte: "Tu penses au bien-être de l'équipe et tu apportes une chaleur qui fait de toi un élément précieux." },
        { titre: "Une organisation solide", accent: "organisation", texte: "Tu anticipes, tu prépares, tu maintiens le cadre, et tu transformes ton attention en soin structuré et durable." },
      ],
      ombres: [
        { titre: "La résistance au changement", accent: "résistance", texte: "Ton attachement aux routines peut te faire te crisper quand le cadre est bousculé." },
        { titre: "Une difficulté à dire non", accent: "non", texte: "Ton sens du devoir peut te faire accepter trop de choses et te surcharger." },
        { titre: "L'oubli de soi", accent: "oubli", texte: "À t'occuper de tout, tu peux te négliger jusqu'à l'épuisement sans jamais t'accorder de répit." },
        { titre: "La dépendance à la reconnaissance", accent: "dépendance", texte: "Le manque de gratitude pour ton dévouement te démotive profondément." },
        { titre: "Une sensibilité à l'instabilité", accent: "sensibilité", texte: "Le chaos, l'instabilité et les conflits permanents t'affectent profondément." },
        { titre: "Une crispation sur l'éprouvé", accent: "crispation", texte: "Ta préférence pour ce qui a fait ses preuves peut te freiner face aux évolutions nécessaires." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "Les environnements instables, chaotiques ou impersonnels.",
            "La compétition agressive et les rapports de force.",
            "Le conflit permanent qui t'affecte profondément.",
            "L'ingratitude et le manque de reconnaissance.",
            "Les changements subis et incessants sans repères.",
          ],
        },
        {
          ton: "positif",
          items: [
            "Un travail qui a du sens humain et de la stabilité.",
            "Un cadre stable, clair et respectueux.",
            "Pouvoir aider, soutenir et prendre soin dans la durée.",
            "De la reconnaissance sincère pour ta fiabilité.",
            "Des repères et une continuité que tu peux entretenir.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Les environnements instables et chaotiques.",
            "Les milieux impersonnels et purement compétitifs.",
            "Les contextes en conflit ou en changement permanent.",
          ],
          profils: [
            { nom: "Start-up en chaos permanent", raison: "l'instabilité et l'absence de repères t'épuisent." },
            { nom: "Trading, vente sous pression", raison: "la compétition froide va contre ton besoin d'humain et de stabilité." },
            { nom: "Postes impersonnels et froids", raison: "aucune place pour le soin et le lien que tu apportes." },
          ],
        },
        {
          ton: "positif",
          items: [
            "Le soin, la santé et les fonctions de soutien.",
            "L'administration, la gestion et la coordination du quotidien.",
            "L'éducation et les métiers d'aide.",
          ],
          profils: [
            { nom: "Soin & santé", raison: "aide-soignant, infirmier : prendre soin des gens avec fiabilité et constance." },
            { nom: "Administration & soutien", raison: "gestion, secrétariat, fonctions support : assurer la continuité et l'ordre." },
            { nom: "Éducation & aide", raison: "enseignant, éducateur, accompagnant : soutenir le quotidien des gens dans la durée." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Tu donnes le meilleur quand tu fais tenir le quotidien,\nmais sans souplesse ni limites, tu peux te crisper et t'épuiser.",
        lumiere:
          "Porté par la stabilité et le sens humain, tu apportes une fiabilité, une régularité et un soin du détail précieux dans tout collectif.",
        ombre:
          "Mais ta résistance au changement, ta difficulté à dire non et ta dépendance à la reconnaissance peuvent te faire trop porter et te rigidifier.",
        bascule:
          "Quand tu apprends à te préserver, à dire non et à accueillir le neuf, ton dévouement demeure une force plutôt qu'une source d'épuisement.",
      },
    },
    "ESFJ-V2-developpement": {
      evolution: `Ta personnalité n'est pas figée : elle évolue, et ton type suit une trajectoire de maturation assez nette. Plus jeune, tu es surtout porté par ton dévouement et ton attachement à la stabilité : prendre soin, maintenir les repères, sécuriser, être apprécié. C'est généreux, mais souvent déséquilibré : tu peux t'oublier, dépendre de l'approbation, te crisper sur les habitudes, refuser le changement et te blesser au moindre rejet. Tu prends soin de tout le monde, mais ton équilibre repose trop sur le regard des autres et sur l'immuabilité de tes repères.

Avec le temps, tu réalises que ta valeur ne dépend pas de l'approbation de chacun, que le changement n'est pas une menace, que prendre soin de toi te permet de mieux prendre soin des autres. Tu apprends à t'affirmer, à recevoir, à t'ouvrir, à te fier à ton propre jugement, sans que ta chaleur en souffre. Dans ta pleine maturité, tu deviens un gardien chaleureux qui prend soin sans s'oublier, qui sait accueillir le changement, qui s'affirme et reçoit autant qu'il donne : la chaleur du soin alliée à la solidité et à la souplesse. Et c'est entièrement à ta portée.`,
      etapes: [
        "Tu prends déjà soin du quotidien des tiens, tu entretiens les repères et tu veilles à ce que rien ne manque. Le cœur tourné vers la sécurité de ceux que tu aimes.",
        "Ton dévouement et ton attachement à la stabilité sont à leur comble : prendre soin, sécuriser, être apprécié. C'est généreux, mais souvent déséquilibré : tu t'oublies, tu te crispes sur les habitudes, et t'ouvrir au changement ne va pas encore de soi.",
        "Tu réalises que ta valeur ne dépend pas de l'approbation et que le changement n'est pas une menace. Tu apprends à t'affirmer, à recevoir, à t'ouvrir, sans que ta chaleur en pâtisse.",
        "Dans ta pleine maturité, tu es un gardien chaleureux qui prend soin sans s'oublier et qui sait accueillir le neuf. Ton soin s'allie à la solidité et à la souplesse : c'est toi pleinement réalisé.",
      ],
      leviersForts: [
        { titre: "Ouvre-toi au changement", texte: "Accueille le neuf et l'imprévu avec un peu plus de souplesse, sans perdre ton précieux ancrage. T'ouvrir enrichit ta vie et te rend plus adaptable." },
        { titre: "Apprends à prendre soin de toi", texte: "Honore tes propres besoins, accorde-toi du repos, mets-toi parfois en premier sans culpabiliser. Te préserver, c'est ce qui te permet de prendre soin des autres durablement." },
        { titre: "Fie-toi à ton propre jugement", texte: "Apprends à distinguer ce que toi tu penses et veux, sans le suspendre à l'approbation des autres. Ton avis pèse autant que le leur." },
        { titre: "Laisse les tiens choisir", texte: "Prendre soin ne veut pas dire décider pour les autres. Respecter leurs choix, même différents des tiens, rend ton dévouement plus juste et plus apprécié." },
      ],
      questions: [
        { situation: "Quand un changement s'annonce", question: "Et si ce neuf enrichissait ma vie, plutôt que de menacer mes repères ?" },
        { situation: "Quand tu t'occupes de tout", question: "Qu'est-ce que je néglige chez moi pendant que je prends soin des autres ?" },
        { situation: "Quand on ne reconnaît pas ton effort", question: "Est-ce que ma valeur tient à cette gratitude, ou puis-je la trouver en moi-même ?" },
        { situation: "Quand tu veux le bien d'un proche", question: "Est-ce que je respecte son choix, même s'il diffère de ce que je ferais ?" },
        { situation: "Quand tu te sens débordé", question: "Qu'est-ce que je pourrais refuser ou déléguer pour me préserver ?" },
      ],
      paradoxe: {
        tension:
          "Pour grandir, tu dois t'inclure dans le soin et t'ouvrir au changement,\nmais tu crains qu'en lâchant un peu, tu fragilises la stabilité que tu protèges.",
        lumiere:
          "Ta chaleur, ta fiabilité et ton soin concret sont une base de croissance immense : tu sais déjà faire tenir le quotidien et sécuriser les tiens.",
        ombre:
          "Mais à t'oublier, à dépendre de la reconnaissance et à te crisper sur tes repères, ton beau dévouement peut devenir rigidité et épuisement.",
        bascule:
          "Quand tu réalises que prendre soin de toi et accueillir le changement ne menacent pas ta stabilité mais la consolident, ta croissance prend enfin son élan.",
      },
    },
    // ----------------------------------------------------------------- V3
    "ESFJ-V3-relations": {
      forces: [
        { titre: "Une présence réfléchie", accent: "réfléchie", texte: "Tu prends soin de l'autre tout en gardant la lucidité de ce qui est sain pour vous deux, et tu offres un soutien qui n'étouffe pas." },
        { titre: "Un soin sans materner", accent: "soin", texte: "Auprès de toi on se sent choyé sans être enfermé, soutenu sans être materné : un équilibre rare." },
        { titre: "Une loyauté choisie", accent: "loyauté", texte: "Une fois donnée, ta fidélité est entière, et d'autant plus solide qu'elle est choisie en conscience." },
        { titre: "Un bon conseil", accent: "conseil", texte: "Tes proches viennent te voir autant pour ton écoute que pour ton avis posé, et tu sais dire les choses avec justesse." },
        { titre: "Une écoute honnête", accent: "écoute", texte: "Tu offres une oreille attentive et un jugement honnête : avec toi, on a à la fois du réconfort et de la vérité." },
        { titre: "Un respect mutuel", accent: "respect", texte: "Tu cherches un équilibre où chacun s'épanouit, fondé sur la confiance et le respect réciproque." },
      ],
      ombres: [
        { titre: "Le tiraillement qui fait hésiter", accent: "tiraillement", texte: "Ton va-et-vient entre cœur et raison peut te faire hésiter et sur-analyser la relation." },
        { titre: "Le doute sur tes élans", accent: "doute", texte: "Tu peux douter de tes propres élans et te censurer au lieu de laisser ton cœur s'exprimer." },
        { titre: "L'oubli de soi", accent: "oubli", texte: "Ton dévouement peut te faire t'oublier malgré ta lucidité, et trop donner sans te préserver." },
        { titre: "Un recul pris pour de la distance", accent: "distance", texte: "Ton recul peut parfois être lu comme de la froideur par ceux qui attendent plus de spontanéité." },
        { titre: "La sur-analyse du lien", accent: "analyse", texte: "Tu peux retourner la relation dans tous les sens et y chercher une justesse qui te paralyse." },
        { titre: "Une dépendance au regard", accent: "dépendance", texte: "Malgré ton recul, tu peux rester sensible à la critique et au signe de froideur." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "Les relations déséquilibrées où l'on prend sans donner.",
            "Les personnes impulsives qui heurtent ton besoin d'équilibre.",
            "Les liens où ton recul est pris pour de la froideur.",
            "Le manque de respect mutuel et de profondeur.",
            "Les conflits durs qui te font sur-analyser sans fin.",
          ],
        },
        {
          ton: "positif",
          items: [
            "Une relation stable et profonde, fondée sur le respect mutuel.",
            "Quelqu'un qui apprécie à la fois ta chaleur et ta tête.",
            "Un équilibre où chacun s'épanouit et prend soin de l'autre.",
            "Quelqu'un qui t'invite à te faire confiance et à ne pas te censurer.",
            "De la complicité et des échanges à la fois tendres et vrais.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Les tempéraments très impulsifs ou imprévisibles.",
            "Les profils qui prennent sans donner et abusent de ton dévouement.",
            "Les personnalités qui prennent ton recul pour de la distance.",
          ],
          profils: [
            { code: "ESTP", raison: "son impulsivité et son côté direct peuvent heurter ton besoin d'équilibre et de réflexion." },
            { code: "ENTP", raison: "son goût du débat et de la provocation peut bousculer ta recherche d'harmonie posée." },
            { code: "ISTP", raison: "sa réserve et sa distance peuvent rencontrer ton propre recul et créer de la froideur." },
          ],
        },
        {
          ton: "positif",
          items: [
            "Les tempéraments chaleureux mais aussi posés et réfléchis.",
            "Les profils spontanés qui t'aident à lâcher ton recul et à suivre ton cœur.",
            "Ceux qui valorisent ton équilibre et t'invitent à te faire confiance.",
          ],
          profils: [
            { code: "ISFJ", raison: "sa chaleur posée et son soin réfléchi rejoignent ton goût de l'équilibre entre cœur et raison." },
            { code: "INFJ", raison: "sa profondeur et sa réflexion résonnent avec ta façon d'allier l'empathie au discernement." },
            { code: "ENFP", raison: "sa spontanéité chaleureuse t'aide à suivre ton cœur et à moins te censurer." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Tu offres un soin chaleureux et lucide à la fois,\nmais ton tiraillement peut te faire hésiter et sur-analyser le lien.",
        lumiere:
          "Ta chaleur, ta lucidité et ta façon de soutenir sans étouffer font de toi un partenaire et un ami auprès de qui on trouve réconfort et vérité.",
        ombre:
          "Mais à te tirailler, à douter de tes élans et à te censurer, ton recul peut être pris pour de la distance et te faire passer à côté de l'intimité.",
        bascule:
          "Le jour où tu te fais confiance, où tu laisses le cœur s'exprimer sans que la tête le censure et où tu t'appliques ta bienveillance, tes liens gagnent en chaleur et en justesse.",
      },
    },
    "ESFJ-V3-carriere": {
      forces: [
        { titre: "Une aide intelligente", accent: "intelligente", texte: "Tu as un impact humain réel en mobilisant aussi ton jugement, et tu réfléchis à ce qui aide vraiment." },
        { titre: "L'empathie et le discernement", accent: "discernement", texte: "Tu apportes une dimension humaine doublée d'un vrai jugement, ce qui fait de toi un appui sur qui on compte pour le soutien comme pour l'avis." },
        { titre: "Le sens du cadre", accent: "cadre", texte: "Tu sais poser des limites et structurer ton aide, ce qui te permet de soutenir sans entretenir la dépendance ni t'épuiser." },
        { titre: "Un jugement posé", accent: "jugement", texte: "Tu prends du recul avant d'agir, tu évalues, tu poses un cadre, ce qui t'évite bien des erreurs." },
        { titre: "Une chaleur fiable", accent: "chaleur", texte: "Malgré ton recul, tu te soucies vraiment des gens et tu le montres, pour un soutien à la fois humain et lucide." },
        { titre: "Une organisation réfléchie", accent: "organisation", texte: "Tu sais où placer ton énergie plutôt que de tout porter, et tu structures ton aide avec méthode et justesse." },
      ],
      ombres: [
        { titre: "Le tiraillement entre cœur et raison", accent: "tiraillement", texte: "Tu peux hésiter entre aider et te préserver, et rester coincé sans trancher." },
        { titre: "Une tendance à trop t'analyser", accent: "analyser", texte: "Ta double pesée peut te faire sur-analyser et retarder tes choix." },
        { titre: "L'oubli de soi", accent: "oubli", texte: "Même lucide, ton dévouement peut te faire trop donner et te négliger." },
        { titre: "L'autocritique", accent: "autocritique", texte: "Ton recul peut se retourner contre toi en doute permanent sur ta façon de bien faire." },
        { titre: "Un recul pris pour de la froideur", accent: "froideur", texte: "Ta réserve et ta lucidité peuvent être lues comme de la distance dans les environnements humains." },
        { titre: "Une sensibilité à l'irrationnel", accent: "sensibilité", texte: "Le conflit permanent, l'irrationalité et les ambiances froides te démotivent profondément." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "Les environnements froids et purement compétitifs.",
            "L'irrationalité et les décisions sans logique.",
            "Le conflit permanent qui te fait sur-analyser.",
            "L'absence de reconnaissance pour ton discernement.",
            "Les contextes chaotiques qui ne laissent pas réfléchir.",
          ],
        },
        {
          ton: "positif",
          items: [
            "Un travail qui a du sens humain et sollicite ton jugement.",
            "Un cadre qui valorise ton discernement.",
            "Pouvoir aider intelligemment et poser un cadre.",
            "Un climat respectueux où l'on peut réfléchir avant d'agir.",
            "De la reconnaissance pour la justesse de ton aide.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Les milieux froids et purement compétitifs.",
            "Les environnements chaotiques et irrationnels.",
            "Les contextes en conflit permanent.",
          ],
          profils: [
            { nom: "Trading, compétition pure", raison: "le froid et l'absence d'humain vont contre ton besoin de sens." },
            { nom: "Environnements chaotiques", raison: "l'irrationalité et l'urgence permanente brouillent ton discernement." },
            { nom: "Postes en conflit constant", raison: "le conflit permanent te démotive et te fait sur-analyser." },
          ],
        },
        {
          ton: "positif",
          items: [
            "L'accompagnement, le conseil et le soin.",
            "L'éducation, la coordination et l'encadrement humain.",
            "Les ressources humaines et les fonctions où empathie et jugement comptent.",
          ],
          profils: [
            { nom: "Accompagnement & conseil", raison: "conseiller, accompagnant : aider avec à la fois chaleur et discernement." },
            { nom: "Coordination & encadrement", raison: "responsable d'équipe, coordinateur : soutenir tout en gardant la tête froide." },
            { nom: "RH & éducation", raison: "RH, formateur, éducateur : allier empathie et jugement au service des gens." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Tu donnes le meilleur quand cœur et jugement s'allient,\nmais ton tiraillement et ta sur-analyse peuvent te faire hésiter sans fin.",
        lumiere:
          "Porté par le sens humain et le discernement, tu apportes une aide à la fois généreuse et juste, et un avis posé sur qui on peut compter.",
        ombre:
          "Mais ton tiraillement, ton autocritique et ton oubli de toi peuvent freiner ton équilibre et t'empêcher de trancher.",
        bascule:
          "Quand tu apprends à te faire confiance, à trancher et à t'accorder ta propre bienveillance, ton équilibre devient un atout pleinement déployé.",
      },
    },
    "ESFJ-V3-developpement": {
      evolution: `Ta personnalité n'est pas figée : elle se développe, et ton type suit une trajectoire de croissance assez nette. Jeune encore, tu es porté par ton dévouement et ton discernement naissant, mais souvent de façon déséquilibrée. Tu peux te tirailler entre ton cœur qui veut donner et ta tête qui te retient, t'analyser à l'excès, douter de tes élans, t'oublier malgré ta lucidité et dépendre encore de l'approbation. Tu as déjà la chaleur et le recul, mais ils se contredisent plus qu'ils ne coopèrent.

Avec le temps, tu réalises que le cœur et la raison ne sont pas ennemis, qu'ils peuvent travailler ensemble, qu'aucune décision n'est parfaite et que ça n'est pas grave. Tu apprends à te faire confiance, à t'appliquer ta propre bienveillance, à trancher sans tout sur-analyser, à t'ouvrir au changement. Tes deux forces cessent de se contredire pour se renforcer. Dans ta pleine maturité, tu deviens un dévoué dont l'aide est à la fois profondément chaleureuse et remarquablement juste, qui soutient sans s'épuiser, qui sait quand donner et quand se préserver : le cœur et la tête enfin alliés. Et c'est entièrement à ta portée.`,
      etapes: [
        "Tu te soucies déjà profondément des gens, mais tu sais aussi observer et peser avant de te donner. Le cœur chaleureux, déjà doublé d'un regard lucide.",
        "Ton dévouement et ton discernement sont à leur comble, mais ils se contredisent : ton cœur veut donner, ta tête te retient, tu t'analyses, tu doutes de tes élans, et trancher ne va pas encore de soi.",
        "Tu réalises que le cœur et la raison ne sont pas ennemis et qu'aucune décision n'est parfaite. Tu apprends à te faire confiance, à trancher, à t'accorder ta bienveillance, sans que ta chaleur en souffre.",
        "Dans ta pleine maturité, tu es un dévoué dont l'aide est à la fois chaleureuse et juste, qui sait quand donner et quand se préserver. Le cœur et la tête enfin alliés : c'est toi au sommet de ton épanouissement.",
      ],
      leviersForts: [
        { titre: "Fais coopérer ton cœur et ta tête", texte: "Cesse de les opposer : laisse ton empathie et ton discernement travailler ensemble. C'est de leur alliance que naît ta plus grande force." },
        { titre: "Fais-toi confiance", texte: "Tu as un excellent jugement : appuie-toi dessus sans le remettre sans cesse en question. T'accorder la confiance que tu accordes aux autres change tout." },
        { titre: "Applique-toi ta propre bienveillance", texte: "Tu prends soin des autres avec justesse : fais de même pour toi. Honore tes besoins, accorde-toi du repos, ne te juge pas plus durement que tu ne jugerais un ami." },
        { titre: "Accepte l'imperfection des décisions", texte: "Aucune mesure n'est parfaite, et chercher l'équilibre absolu te paralyse. Tranche, agis, ajuste ensuite : c'est ainsi qu'on avance." },
      ],
      questions: [
        { situation: "Quand ton cœur et ta tête se contredisent", question: "Et si je les laissais coopérer plutôt que de choisir entre les deux ?" },
        { situation: "Quand tu sur-analyses une décision", question: "Est-ce que j'attends une certitude parfaite qui n'existera jamais ?" },
        { situation: "Quand tu doutes d'un élan du cœur", question: "Est-ce que je me censure, ou puis-je faire confiance à ce que je ressens ?" },
        { situation: "Quand tu prends soin de tout le monde", question: "Est-ce que je m'applique la même bienveillance qu'aux autres ?" },
        { situation: "Quand on critique ton choix", question: "Est-ce que je m'appuie sur mon jugement, que j'ai déjà développé ?" },
      ],
      paradoxe: {
        tension:
          "Pour t'épanouir, tu dois faire de ton cœur et de ta tête des alliés,\nmais tu crains qu'en tranchant, tu trahisses l'un ou l'autre.",
        lumiere:
          "Ta chaleur et ton discernement sont une base de croissance immense : tu as déjà tout en toi pour offrir une aide à la fois généreuse et juste.",
        ombre:
          "Mais à les opposer, à te sur-analyser et à t'oublier malgré ta lucidité, ton bel équilibre peut rester une quête tiraillée.",
        bascule:
          "Le jour où tu comprends que ton cœur et ta tête ne sont pas rivaux mais alliés, et que tu te fais confiance, ton tiraillement devient ta plus belle qualité.",
      },
    },
  },
};

export default esfj;
