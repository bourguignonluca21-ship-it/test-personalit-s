// =============================================================================
// CONTENU DU PROFIL INFJ (« Avocat »), 3 variantes.
//   V1 : Mentor
//   V2 : Visionnaire Mystique
//   V3 : Architecte d'Idéaux
// Source : rapports longs INFJ_V1/V2/V3. Gabarit : INFP/ENFP dans profils.ts.
// Voix « tu », aucun tiret long, mot-clé en vert via le champ `accent`.
// =============================================================================

const infj = {
  // Texte commun au type, affiché sous les barres du spectre.
  traitsTexte: {
    INFJ: `Ton esprit est tourné vers l'intérieur et vers le sens : tu puises ton énergie dans la réflexion, la contemplation et une vie intérieure d'une richesse rare. Là où d'autres restent en surface, toi tu perçois ce qui se joue dessous, les motivations cachées, les émotions non dites, les directions où vont les choses. Cette intuition profonde sur l'humain, alliée à une vraie sensibilité aux autres, te donne une clairvoyance qui surprend souvent ceux qui te confient leurs pensées.

Derrière ta réserve apparente bouillonne tout un monde, fait d'idéaux, d'émotions intenses et de quêtes de sens. Ce besoin de profondeur est ta plus grande force, mais il a son revers : tu peux trop absorber la souffrance des autres, t'oublier à force de donner, et te sentir incompris dans tes aspirations. Tout l'enjeu de ton chemin, c'est d'ancrer ta profondeur dans le réel et de prendre soin de toi autant que des autres, pour que ta belle lumière intérieure dure et rayonne sans t'épuiser.`,
  },

  // 1 phrase de description par variante (survol des barres de variante).
  descriptions: {
    "INFJ-V1":
      "Les Mentors sont les plus tournés vers l'accompagnement et l'élévation des autres. Ils perçoivent le potentiel des gens et ont à cœur de les aider, un par un, à devenir le meilleur d'eux-mêmes.",
    "INFJ-V2":
      "Les Visionnaires Mystiques sont portés par une intuition d'une profondeur rare. Connectés au sens caché des choses, ils perçoivent l'invisible et inspirent les autres par leur vision.",
    "INFJ-V3":
      "Les Architectes d'Idéaux allient la vision élevée à la volonté de la réaliser. Animés par des convictions fortes, ils veulent transformer le monde et le rendre plus juste, pierre après pierre.",
  },

  // 1 phrase d'accroche (héros) par variante.
  accroches: {
    "INFJ-V1": "Tu ne te contentes pas de comprendre les gens, tu les aides à devenir le meilleur d'eux-mêmes.",
    "INFJ-V2": "Tu ne raisonnes pas le monde, tu le pressens dans sa profondeur cachée.",
    "INFJ-V3": "Tu ne rêves pas seulement d'un monde meilleur, tu te lèves pour le construire.",
  },

  // Introduction longue (~2 paragraphes), sous le héros.
  intros: {
    "INFJ-V1": `En tant qu'Avocat (INFJ), tu possèdes l'une des combinaisons les plus rares qui soient : une intuition profonde sur les êtres humains et le désir sincère de les aider à grandir. Tu ne te contentes pas de comprendre les gens, tu veux les accompagner vers le meilleur d'eux-mêmes. Cette clairvoyance sur l'humain, ces motivations cachées et ce potentiel inexploité que tu perçois, fait de toi un confident et un guide précieux, quelqu'un dont la présence aide les autres à se révéler. Parmi les trois façons d'être de ton type, tu es le plus tourné vers l'accompagnement : le Mentor.

Ce qui te porte, c'est le sens et l'idéal, alliés à une empathie sincère et puissante. Tu cherches la profondeur en toute chose, tu portes une vision de ce que les gens pourraient devenir, et tu ressens ce qu'ils vivent presque intuitivement. Cette même vocation à élever les autres peut t'entraîner à t'oublier toi-même et à absorber leur souffrance jusqu'à l'épuisement : ton plus beau terrain de croissance sera d'apprendre à t'élever en même temps que tu élèves les autres.`,

    "INFJ-V2": `En tant qu'Avocat (INFJ), tu possèdes une intuition d'une profondeur rare, une capacité à percevoir le sens caché des choses, les vérités sous-jacentes, les directions où va le monde. Là où d'autres raisonnent pas à pas, toi tu sais, d'un coup, par une intuition qui semble venir d'ailleurs. Tu portes en toi un monde intérieur foisonnant, fait de visions, de réflexions profondes et d'émotions intenses, et une connexion presque mystique à quelque chose de plus grand. Parmi les trois façons d'être de ton type, tu es le Visionnaire Mystique.

Ce qui te porte, c'est la quête de profondeur et de sens : tu n'es pas fait pour la surface, tu cherches la signification cachée, la dimension symbolique ou spirituelle des choses. Ta sensibilité capte les ambiances et les émotions que les autres ne remarquent pas, et nourrit cette inspiration qui te traverse. Cette même richesse intérieure peut te couper du réel, où ta profondeur pourrait pourtant avoir un vrai impact : ton plus beau terrain de croissance sera de faire descendre tes visions sur terre et de les rendre visibles aux autres.`,

    "INFJ-V3": `En tant qu'Avocat (INFJ), tu portes en toi une vision claire de ce que le monde, les gens et les choses pourraient et devraient être, et tu as cette volonté rare de travailler à la rendre réelle. Tu n'es pas un idéaliste de salon : sous ta réserve apparente se cache une détermination tranquille, une volonté de fer au service de tes convictions. Tu allies la profondeur de l'idéaliste à la ténacité du bâtisseur, ce qui fait de toi quelqu'un capable de vraiment changer les choses, pas seulement de les imaginer. Parmi les trois façons d'être de ton type, tu es l'Architecte d'Idéaux.

Ce qui te porte, c'est le sens profond de la mission : tu as besoin que ta vie serve quelque chose de plus grand que toi, alignée avec tes valeurs et ta boussole morale. Tu ressens profondément les injustices, et c'est cette sensibilité qui alimente ta volonté de transformer. Cette même flamme peut te consumer : à force de porter le poids du monde et de te donner pour tes causes, tu peux t'épuiser. Ton plus beau terrain de croissance sera d'apprendre à transformer le monde sans te consumer toi-même.`,
  },

  // Texte long de la variante (~2 paragraphes), sous les barres de variante.
  texteVariante: {
    "INFJ-V1": `Parmi les trois visages de l'Avocat, tu es celui qui vit le plus pour l'accompagnement et l'élévation des autres. Tu n'es pas avant tout le visionnaire mystique tourné vers les idées et l'inspiration, ni l'architecte d'idéaux qui veut transformer les systèmes : tu es celui qui aide les gens, un par un, à devenir le meilleur d'eux-mêmes. Comprendre les êtres et les accompagner vers leur potentiel te comble plus que tout.

Cette combinaison, l'intuition profonde sur l'humain et le désir sincère d'élever, fait de toi un guide, un confident, un mentor naturel, quelqu'un dont la présence aide les autres à se révéler. Le revers, c'est que tu peux te perdre dans ce don, t'oublier à force d'aider et absorber la souffrance de ceux que tu accompagnes : ton plus beau chemin de croissance sera d'apprendre à prendre soin de toi autant que des autres, pour que ta vocation devienne un don durable.`,

    "INFJ-V2": `Parmi les trois visages de l'Avocat, tu es celui qui vit le plus à travers l'intuition profonde, l'inspiration et le sens. Tu n'es pas avant tout le mentor centré sur l'accompagnement des gens, ni l'architecte d'idéaux qui veut transformer les systèmes : tu es celui qui perçoit l'invisible, qui se connecte au sens profond, qui inspire par sa vision. Percevoir le sens caché, suivre l'inspiration, explorer la profondeur des choses te comble plus que tout.

Cette combinaison, l'intuition presque visionnaire et la quête de sens, fait de toi un être d'une profondeur rare, une source d'inspiration et de sagesse, quelqu'un qui voit ce que les autres ne voient pas encore. Le revers, c'est que cette profondeur peut rester enfermée en toi, sans prise sur le réel, et te laisser un sentiment de décalage : ton plus beau chemin de croissance sera d'ancrer tes visions dans le réel et de les partager, sans rien perdre de ta clairvoyance.`,

    "INFJ-V3": `Parmi les trois visages de l'Avocat, tu es celui qui veut le plus transformer et réaliser. Tu n'es pas avant tout le mentor centré sur l'accompagnement individuel, ni le visionnaire mystique tourné vers la perception du sens : tu es celui qui veut bâtir un monde meilleur, transformer le réel, concrétiser ses idéaux. Porter une vision claire de ce qui devrait être et travailler à la rendre réelle te comble plus que tout.

Cette combinaison, la profondeur de l'idéaliste et la volonté tenace du bâtisseur, fait de toi un militant tranquille, un architecte de changements profonds, capable de mener des transformations qui ont du sens. Le revers, c'est que ce même engagement peut te consumer : à force de porter le poids du monde, tu peux t'épuiser et te durcir. Ton plus beau chemin de croissance sera d'apprendre à durer assez longtemps pour réaliser vraiment tes idéaux, en prenant soin de toi autant que de tes causes.`,
  },

  // Détail enrichi par variante : 6 forces, 6 ombres, 1 paradoxe central.
  varianteDetail: {
    "INFJ-V1": {
      forces: [
        { titre: "Une compréhension rare des gens", accent: "compréhension", texte: "Tu perçois les êtres en profondeur, leurs émotions, leurs motivations, leurs blessures, et auprès de toi on se sent compris comme rarement ailleurs." },
        { titre: "Le don de révéler le potentiel", accent: "potentiel", texte: "Tu vois ce que les gens pourraient devenir, même quand ils ne le voient pas eux-mêmes, et tu sais les aider à y accéder." },
        { titre: "Une profondeur qui donne du sens", accent: "profondeur", texte: "Tu ne te contentes jamais de la surface : tu cherches la signification en toute chose et apportes une sagesse que les esprits pressés n'ont pas." },
        { titre: "Une empathie sincère et puissante", accent: "empathie", texte: "Tu ressens ce que vivent les autres et tu te soucies vraiment d'eux, ce qui crée des liens d'une profondeur rare." },
        { titre: "Une vision qui accomplit", accent: "vision", texte: "Tu n'es pas qu'un rêveur : ton besoin de sens te pousse à concrétiser tes idéaux et à aller au bout de ce qui compte." },
        { titre: "Une présence qui transforme", accent: "présence", texte: "Les gens repartent grandis de t'avoir croisé, comme révélés à eux-mêmes, et c'est un don immense." },
      ],
      ombres: [
        { titre: "L'oubli de soi", accent: "oubli", texte: "À force de porter les autres et de les accompagner, tu peux négliger tes propres besoins jusqu'à l'épuisement." },
        { titre: "L'absorption émotionnelle", accent: "absorption", texte: "Ton empathie est si forte que tu te charges de la souffrance d'autrui, comme si elle était tienne, jusqu'à en être submergé." },
        { titre: "Un idéalisme qui fait souffrir", accent: "idéalisme", texte: "Tes idéaux si élevés se heurtent à un monde imparfait, et tu peux être dur avec toi-même et te sentir incompris." },
        { titre: "Une réserve qui isole", accent: "réserve", texte: "Tu comprends tout le monde mais tu te livres peu, et tu peux te replier en gardant tes propres émotions pour toi." },
        { titre: "Le poids porté seul", accent: "seul", texte: "Tu donnes énormément et tu réclames peu, jusqu'à tout porter seul sans jamais demander de soutien en retour." },
        { titre: "Une difficulté à t'affirmer", accent: "affirmer", texte: "Tu peux avoir du mal à poser des limites, à te protéger et à défendre tes propres besoins face à ceux des autres." },
      ],
      paradoxe: {
        tension:
          "Tu comprends et tu aides les autres mieux que personne,\nmais tu peux t'oublier complètement dans ce don.",
        lumiere:
          "Ta clairvoyance sur les êtres, ton empathie et ta vocation à élever les autres sont des dons immenses : tu peux transformer des vies, accompagner, révéler.",
        ombre:
          "Mais poussées à l'extrême, ces forces peuvent t'épuiser pour les autres, te faire absorber leur souffrance et négliger tes propres besoins, jusqu'à te sentir seul à force de toujours donner.",
        bascule:
          "Le jour où tu apprends à prendre soin de toi autant que des autres, à recevoir et pas seulement à donner, ta vocation cesse d'être une source d'épuisement pour devenir une lumière durable.",
      },
    },
    "INFJ-V2": {
      forces: [
        { titre: "Une intuition d'une profondeur rare", accent: "intuition", texte: "Tu perçois ce que les autres ne voient pas : le sens caché, les vérités sous-jacentes, les directions à venir, souvent avec justesse." },
        { titre: "Un accès au sens profond", accent: "sens", texte: "Là où d'autres restent en surface, tu plonges vers la signification et la dimension symbolique des choses, et tu donnes du sens là où l'on ne voit que des faits." },
        { titre: "Le pouvoir d'inspirer", accent: "inspirer", texte: "Ta vision et ta connexion à quelque chose de plus grand inspirent les autres, leur ouvrent des perspectives et les touchent en profondeur." },
        { titre: "Une sensibilité qui capte l'invisible", accent: "sensibilité", texte: "Tu perçois les émotions, les ambiances et les énergies que les autres ne remarquent pas, pour une compréhension presque immédiate." },
        { titre: "Une richesse intérieure inépuisable", accent: "richesse", texte: "Tu portes en toi un univers entier d'intuitions et de réflexions, une autonomie profonde et la source de ta créativité." },
        { titre: "Une sagesse contemplative", accent: "sagesse", texte: "Ta vie intérieure intense te donne une profondeur de vue rare, une perspective qui apaise et éclaire ceux qui t'écoutent." },
      ],
      ombres: [
        { titre: "La déconnexion du réel", accent: "déconnexion", texte: "À force de vivre dans tes intuitions et ton monde intérieur, tu peux perdre le contact avec le concret et le présent." },
        { titre: "Un corps négligé", accent: "corps", texte: "Absorbé par ta vie intérieure, tu peux oublier tes besoins concrets, ta santé et les détails pratiques du quotidien." },
        { titre: "Un idéalisme qui fait souffrir", accent: "idéalisme", texte: "Tes idéaux si élevés te font te sentir étranger, incompris, en décalage avec un monde forcément imparfait." },
        { titre: "Une profondeur qui isole", accent: "profondeur", texte: "Ton besoin de sens si grand peut te faire paraître énigmatique et distant, et te replier dans ta solitude." },
        { titre: "Des visions sans suite", accent: "visions", texte: "Tes plus belles compréhensions risquent de rester dans ta tête, sans jamais s'incarner ni avoir de prise sur le réel." },
        { titre: "Un retrait du monde", accent: "retrait", texte: "Ton sentiment de décalage peut te couper des autres et t'enfermer dans un monde intérieur que tu partages trop peu." },
      ],
      paradoxe: {
        tension:
          "Tu perçois des choses profondes et précieuses,\nmais cette profondeur peut te couper du monde où elle pourrait avoir un impact.",
        lumiere:
          "Ton intuition, ta connexion au sens et ta richesse intérieure sont des dons rares : tu perçois des vérités et des visions que le monde gagnerait à recevoir.",
        ombre:
          "Mais ta vie intérieure intense, ta déconnexion du concret et ta réserve peuvent faire que tout cela reste enfermé en toi, invisible, et te laisse un sentiment d'isolement.",
        bascule:
          "Le jour où tu apprends à ancrer tes visions dans le réel et à les partager, ta profondeur cesse d'être un trésor caché pour devenir une vraie source d'inspiration pour les autres.",
      },
    },
    "INFJ-V3": {
      forces: [
        { titre: "La vision et l'action réunies", accent: "action", texte: "Tu ne te contentes pas de rêver un monde meilleur, tu travailles à le réaliser : une alliance rare de l'idéalisme et de la détermination." },
        { titre: "Une détermination inébranlable", accent: "détermination", texte: "Sous ta réserve se cache une volonté de fer : quand tu crois en une cause, ta constance finit par déplacer des montagnes." },
        { titre: "Une boussole morale sûre", accent: "boussole", texte: "Tu as un sens profond et fiable de ce qui est juste, qui te rend intègre et inspire confiance dans tout ce que tu entreprends." },
        { titre: "Une profondeur qui donne du sens", accent: "profondeur", texte: "Tu vois au-delà de la surface : tes engagements ne sont jamais superficiels, ils servent quelque chose de réel et de profond." },
        { titre: "Une empathie qui engage", accent: "empathie", texte: "Tu ressens profondément les injustices, et cette sensibilité alimente une action animée par un vrai souci des gens." },
        { titre: "Un talent d'organisation", accent: "organisation", texte: "Plus que d'autres profils intuitifs, tu sais transformer un idéal en plan, et un plan en action soutenue dans le temps." },
      ],
      ombres: [
        { titre: "L'épuisement militant", accent: "épuisement", texte: "À force de te donner pour tes causes et de porter le poids du monde, tu peux te négliger jusqu'au surmenage." },
        { titre: "Une intransigeance", accent: "intransigeance", texte: "Tes convictions fortes peuvent te durcir, avec le monde qui ne change pas assez vite, avec les autres et avec toi-même." },
        { titre: "La déconnexion du concret", accent: "concret", texte: "Tourné vers la vision et l'idéal, tu peux négliger les réalités pratiques et les détails de la mise en œuvre." },
        { titre: "Le fardeau solitaire", accent: "solitaire", texte: "Ta réserve et ton sens des responsabilités te font porter tes combats seul, sans demander d'aide ni partager le poids." },
        { titre: "Une amertume possible", accent: "amertume", texte: "Face à un réel qui résiste à tes idéaux, tu peux te sentir déçu, frustré, voire amer." },
        { titre: "Des besoins négligés", accent: "besoins", texte: "Absorbé par ta mission, tu peux garder tes propres difficultés pour toi et oublier d'honorer ce dont tu as besoin." },
      ],
      paradoxe: {
        tension:
          "Ta volonté de transformer le monde est un don immense,\nmais elle peut te consumer si tu ne prends pas soin de toi.",
        lumiere:
          "Ta vision, ta détermination et tes convictions te permettent de changer réellement les choses, pas seulement de les imaginer.",
        ombre:
          "Mais poussées à l'extrême, ces forces peuvent te dévorer : tu peux t'épuiser pour tes causes, te durcir face aux résistances et te négliger jusqu'à ne plus pouvoir agir.",
        bascule:
          "Le jour où tu apprends à choisir tes combats, à t'appuyer sur les autres et à te préserver, ton engagement cesse d'être une course à l'épuisement pour devenir une force durable.",
      },
    },
  },

  // Texte de la section « Mes relations » (~2 paragraphes) par variante.
  relationsTexte: {
    "INFJ-V1": `En amour comme en amitié, tu ne cherches pas le nombre mais la profondeur : une connexion d'âme, une intimité vraie où tu peux être pleinement toi-même et te sentir vraiment compris. Quand tu aimes, c'est en profondeur, avec une loyauté totale. Ton intuition fine sur les êtres fait de toi un confident et un partenaire d'une attention rare : tu anticipes les besoins de l'autre, tu offres une présence chaleureuse, et auprès de toi on se sent vu comme par personne d'autre.

Tes défis sont les revers de ta nature. Ta tendance à t'oublier peut te faire trop donner et négliger tes propres besoins, jusqu'au déséquilibre. Ton idéalisme peut t'amener à attendre une perfection que nulle relation réelle n'atteint. Et ta réserve peut te faire comprendre l'autre sans te livrer toi-même, dans le rôle de celui qui soutient tout le monde sans jamais être soutenu. Ton chemin, c'est d'apprendre à exprimer tes besoins, à recevoir autant que tu donnes, et à te livrer vraiment.`,

    "INFJ-V2": `En amour comme en amitié, tu cherches une connexion d'âme, une rencontre profonde, presque spirituelle, où deux mondes intérieurs se rencontrent et se comprennent. Tu n'es pas fait pour le superficiel ni le passager : il te faut quelques liens vrais, où l'on partage l'essentiel au-delà des mots. Être aimé par toi, c'est être invité dans un monde intérieur d'une richesse que peu ont la chance de découvrir, et tu offres une compréhension intuitive de l'autre qui dépasse les mots.

Tes défis viennent de ta nature. Ton idéalisme peut te faire chercher une fusion parfaite que la réalité ne peut atteindre, et te décevoir. Ta déconnexion du concret peut te faire négliger le quotidien de la relation. Et ton intensité, ton monde intérieur si dense, peuvent te rendre difficile à suivre ou te faire te replier. Ton chemin, c'est d'apprendre à partager ton monde sans attendre une compréhension parfaite, à t'ancrer dans le concret du lien, et à accepter l'imperfection de l'autre.`,

    "INFJ-V3": `En amour comme en amitié, tu cherches une connexion profonde et porteuse de sens, avec quelqu'un qui partage tes valeurs ou les respecte, et avec qui tu peux avancer vers un avenir qui compte. Tu n'es pas fait pour le superficiel : quand tu aimes, c'est avec sincérité, profondeur et un engagement durable, et tu offres une présence fidèle, une compréhension fine et un partenariat solide. Tes amis savent qu'ils peuvent compter sur ta loyauté indéfectible.

Tes défis sont les revers de ta nature. Ton engagement pour tes causes peut te faire négliger la relation ou ton partenaire, absorbé que tu es par ta mission. Ton idéalisme peut t'amener à attendre beaucoup, de l'autre comme de la relation. Et ta tendance à porter seul peut te faire garder tes difficultés pour toi. Ton chemin, c'est d'accorder à tes proches autant de soin qu'à tes idéaux, d'accepter l'imperfection de l'autre, et de partager ton fardeau plutôt que de tout porter seul.`,
  },

  // Texte de la section « Professionnel » (~2 paragraphes) par variante.
  proTexte: {
    "INFJ-V1": `Au travail, tu as besoin avant tout de sens et d'un impact humain réel. Un poste qui paie bien mais qui sonne creux finira par t'éteindre : tu prends vie quand ton travail aide, accompagne, transforme. C'est pour ça que les voies de l'accompagnement humain te parlent souvent plus que les autres, le conseil et la thérapie, l'enseignement et le mentorat, les métiers de l'aide et du soin, le coaching, l'écriture qui touche, les causes à mission. Tu es à ton meilleur quand tu mets ta clairvoyance et ton empathie au service des autres.

Ta capacité à comprendre les gens en profondeur et à voir leur potentiel est un atout rare partout où il faut du lien et de l'humain. En revanche, les environnements impersonnels, compétitifs ou cyniques t'épuisent. Ton défi principal, c'est ton propre équilibre : tu peux trop t'oublier, absorber le poids des autres, et avoir du mal à t'affirmer et à défendre tes intérêts. Apprendre à poser des limites et à te protéger est ce qui rend ta belle vocation durable et reconnue.`,

    "INFJ-V2": `Au travail, tu as besoin de sens, d'autonomie et d'espace pour ta vie intérieure. Un travail vide de sens ou une pression matérielle pure finira par t'étouffer : tu prends vie quand ton travail touche à quelque chose de plus grand, qu'il inspire, qu'il a une dimension profonde. C'est pour ça que les domaines qui mobilisent ta profondeur te parlent souvent plus que les autres, l'écriture et la création inspirées, l'accompagnement, l'art, l'enseignement de ce qui a du sens, le conseil profond, les causes qui te tiennent à cœur.

Ta capacité à percevoir le sens et à apporter une vision que les esprits terre-à-terre n'ont pas est un atout rare. En revanche, le bruit, l'agitation et la pression du résultat immédiat brouillent ton intuition et t'épuisent. Ton défi principal découle de ta nature : ta déconnexion du concret peut te rendre difficile à intégrer dans le monde pratique, et tu peux peiner à concrétiser tes belles visions. Apprendre à ancrer ton inspiration dans des réalisations concrètes transforme ta profondeur en contributions reconnues.`,

    "INFJ-V3": `Au travail, tu as besoin d'un travail aligné avec tes valeurs et d'un sens de la mission. Un poste lucratif mais vide de sens, ou pire, contraire à tes valeurs, finira par t'épuiser et te dégoûter. Tu prends vie quand ton travail sert une cause, améliore le monde, a un impact réel : les organisations à mission, l'engagement social ou environnemental, l'enseignement et la transmission de valeurs, le conseil porteur de sens, tout ce qui te permet de mettre ta vision et ta détermination au service d'un changement positif.

Ton alliance rare de la profondeur et de la détermination te permet de porter des projets ambitieux et porteurs de sens : tu sais transformer un idéal en plan, et un plan en action soutenue. En revanche, les compromis moraux, le cynisme et les ambiances contraires à tes convictions te démotivent profondément. Ton défi principal, c'est ton équilibre et ton ancrage : tu peux t'épuiser pour tes causes, te durcir face aux résistances, ou buter sur les réalités concrètes. Apprendre à choisir tes combats, à composer avec le réel et à te préserver rend ton engagement durable et efficace.`,
  },

  // Section « Mindset & dév personnel » : accroche gratuite par variante.
  mindsetTexte: {
    "INFJ-V1": {
      apercu: `Ton plus grand chantier n'est pas autour de toi, il est en toi. Tu portes une vocation rare à comprendre et à élever les autres, mais aussi une tendance qui peut se retourner contre toi : l'oubli de soi, l'absorption de la souffrance d'autrui, l'idéalisme qui déçoit, la réserve qui isole. La bonne nouvelle, c'est que ces fragilités sont aussi tes plus grands leviers de croissance, à condition de savoir où appuyer.`,
    },
    "INFJ-V2": {
      apercu: `Ton plus grand chantier n'est pas de percevoir le sens, ton intuition n'en manque jamais, c'est de le faire descendre dans le réel. Tu portes en toi une profondeur rare, mais aussi une tendance à te déconnecter du concret, à négliger ton corps et le présent, à te replier dans ta solitude. La bonne nouvelle, c'est que ces fragilités sont aussi tes plus grands leviers de croissance, à condition de savoir où appuyer.`,
    },
    "INFJ-V3": {
      apercu: `Ton plus grand chantier n'est pas de trouver une cause, tes convictions en débordent, c'est d'apprendre à la porter sans t'y consumer. Tu portes en toi une vision et une détermination rares, mais aussi une tendance à t'épuiser, à te durcir, à porter le monde seul. La bonne nouvelle, c'est que ces fragilités sont aussi tes plus grands leviers de croissance, à condition de savoir où appuyer.`,
    },
  },

  // Détail enrichi des GRANDES sections (relations, carriere, developpement) par variante.
  sectionDetail: {
    // ----------------------------------------------------------------- V1
    "INFJ-V1-relations": {
      forces: [
        { titre: "Une compréhension intuitive", accent: "compréhension", texte: "Tu perçois ce que l'autre ressent au-delà des mots, et auprès de toi on se sent compris comme rarement ailleurs." },
        { titre: "Une loyauté totale", accent: "loyauté", texte: "Une fois engagé, tu t'investis entièrement, avec une fidélité et une profondeur rares." },
        { titre: "Une présence attentive", accent: "présence", texte: "Tu anticipes les besoins de l'autre et tu offres une présence chaleureuse qui sécurise et apaise." },
        { titre: "Une connexion d'âme", accent: "connexion", texte: "Tu crées des liens d'une intimité profonde, où chacun peut être pleinement soi-même." },
        { titre: "Le don de révéler l'autre", accent: "révéler", texte: "Tu vois le meilleur de tes proches et tu les aides à grandir, sans jamais chercher à les changer." },
        { titre: "Une écoute sans jugement", accent: "écoute", texte: "Ta finesse et ta bienveillance invitent les autres à se confier et à baisser la garde en confiance." },
      ],
      ombres: [
        { titre: "L'oubli de soi", accent: "oubli", texte: "Tu donnes tant que tu peux négliger tes propres besoins jusqu'au déséquilibre ou au ressentiment." },
        { titre: "L'absorption émotionnelle", accent: "absorption", texte: "Tu portes la souffrance des autres comme la tienne, jusqu'à t'en trouver épuisé ou submergé." },
        { titre: "Des attentes idéalisées", accent: "idéalisées", texte: "Ton idéalisme peut te faire attendre de l'autre et de la relation une perfection que le réel n'atteint pas." },
        { titre: "Une réserve qui retient", accent: "réserve", texte: "Tu comprends l'autre en profondeur, mais tu te livres peu et tu gardes tes émotions pour toi." },
        { titre: "Le rôle de soutien permanent", accent: "soutien", texte: "Tu peux soutenir tout le monde sans jamais être soutenu en retour, et porter le lien seul." },
        { titre: "Des besoins tus", accent: "besoins", texte: "Ta pudeur peut te faire taire ce dont tu as besoin, jusqu'à ce que le déséquilibre te pèse." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "Les relations de surface, sans profondeur ni partage vrai.",
            "Les personnes qui abusent de ton don sans jamais prendre soin de toi.",
            "Les liens où tu dois tout porter et tout comprendre seul.",
            "Le manque d'authenticité, les faux-semblants, le superficiel.",
            "Les conflits durs et l'agressivité qui heurtent ta sensibilité.",
          ],
        },
        {
          ton: "positif",
          items: [
            "Des liens profonds où tu peux te montrer tel que tu es.",
            "Quelqu'un qui sait recevoir ton don et prendre soin de toi en retour.",
            "De la profondeur, de l'authenticité et du sens partagés.",
            "De l'espace pour te ressourcer dans la solitude qui te nourrit.",
            "Une communication douce et une réciprocité vraie.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Les tempéraments très factuels, peu portés sur l'émotion et l'introspection.",
            "Les personnalités dures ou détachées qui ne respectent pas ta sensibilité.",
            "Les profils qui prennent sans jamais te rendre ton attention.",
          ],
          profils: [
            { code: "ESTP", raison: "son pragmatisme direct et terre-à-terre peut sembler insensible à ta profondeur." },
            { code: "ESTJ", raison: "son attachement aux règles plus qu'aux valeurs peut heurter ton besoin de sens." },
            { code: "ISTP", raison: "sa réserve émotionnelle peut te laisser sur ta faim dans le lien." },
          ],
        },
        {
          ton: "positif",
          items: [
            "Les esprits intuitifs et tournés vers le sens, qui partagent ta profondeur.",
            "Les tempéraments chaleureux qui t'aident à vivre tes émotions plus librement.",
            "Ceux qui savent prendre soin de toi quand tu te donnes trop.",
          ],
          profils: [
            { code: "ENFP", raison: "son enthousiasme et son authenticité t'allègent et résonnent avec ta quête de sens." },
            { code: "INTJ", raison: "il partage ta profondeur et ton intuition, et t'apporte de l'ancrage et de la structure." },
            { code: "INFP", raison: "il partage ta sensibilité et tes idéaux, pour une connexion d'âme rare." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Tu offres à l'autre une compréhension et un soutien rares,\nmais tu peux t'oublier au point de tout porter seul.",
        lumiere:
          "Ta clairvoyance, ta loyauté et ton attention font de toi un proche d'une profondeur exceptionnelle, auprès de qui on se sent vraiment vu.",
        ombre:
          "Mais à trop donner, à absorber la souffrance de l'autre et à taire tes besoins, tu t'exposes au déséquilibre, à l'épuisement et à la solitude.",
        bascule:
          "Le jour où tu reçois autant que tu donnes et où tu oses te livrer, tes liens deviennent à la fois profonds et soutenables.",
      },
    },
    "INFJ-V1-carriere": {
      forces: [
        { titre: "Un moteur, le sens", accent: "sens", texte: "Quand ton travail aide et transforme, tu te donnes sans compter et tu accomplis des choses qui comptent." },
        { titre: "Une compréhension des gens", accent: "compréhension", texte: "Ta clairvoyance sur l'humain est un atout rare dans tout métier d'accompagnement ou de relation." },
        { titre: "Une empathie au service", accent: "empathie", texte: "Tu mets ta sensibilité au service des autres et tu crées une présence qui réconforte et révèle." },
        { titre: "Une profondeur féconde", accent: "profondeur", texte: "Tu vois ce que les autres ne perçoivent pas et tu apportes une perspective rare à toute mission qui a du sens." },
        { titre: "Un dévouement sincère", accent: "dévouement", texte: "Quand une mission te touche, tu t'investis avec une qualité et une signification rares." },
        { titre: "Une vision qui accomplit", accent: "vision", texte: "Ton besoin de structure et de sens te pousse à concrétiser tes idéaux et à aller au bout." },
      ],
      ombres: [
        { titre: "Le risque d'épuisement", accent: "épuisement", texte: "Tu peux trop t'oublier et absorber le poids des autres, jusqu'à te vider de ton énergie." },
        { titre: "Une difficulté à t'affirmer", accent: "affirmer", texte: "Tu peux peiner à te vendre, à défendre tes intérêts et à faire reconnaître ta valeur." },
        { titre: "Une sensibilité aux ambiances", accent: "ambiances", texte: "Les environnements impersonnels, cyniques ou conflictuels t'affectent profondément et t'épuisent." },
        { titre: "Le mal à poser des limites", accent: "limites", texte: "Ton sens des responsabilités peut te faire en prendre trop sur tes épaules, sans frein." },
        { titre: "Un rapport secondaire à l'argent", accent: "argent", texte: "L'argent te motive peu, et tu peux avoir du mal à négocier et à valoriser ton travail." },
        { titre: "Une hésitation à décider", accent: "hésitation", texte: "Par peur de mal faire ou de blesser, tu peux hésiter longuement avant de trancher." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "Les environnements purement commerciaux ou compétitifs.",
            "Le travail vide de sens, même bien payé.",
            "Les ambiances impersonnelles, cyniques ou déshumanisées.",
            "La compétition agressive et les rapports de force.",
            "Le manque d'autonomie et de respect humain.",
          ],
        },
        {
          ton: "positif",
          items: [
            "Un travail aligné avec tes valeurs et porteur de sens.",
            "Un impact humain réel, où ton travail touche la vie des gens.",
            "De l'autonomie et un environnement humain et bienveillant.",
            "Pouvoir accompagner, aider, révéler, transformer.",
            "Le respect de ta profondeur et de ton besoin de calme.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Les milieux purement lucratifs et compétitifs.",
            "Les environnements impersonnels et déshumanisés.",
            "Les postes sans autonomie ni mission.",
          ],
          profils: [
            { nom: "Vente sous pression, finance pure", raison: "le profit au mépris du sens et de l'humain." },
            { nom: "Environnements compétitifs et cyniques", raison: "une dureté qui t'épuise et te dégoûte." },
            { nom: "Postes rigides et impersonnels", raison: "aucune place pour l'accompagnement ni la profondeur." },
          ],
        },
        {
          ton: "positif",
          items: [
            "L'accompagnement humain, le conseil et la thérapie.",
            "L'enseignement, le mentorat et le coaching.",
            "Les métiers de l'aide, du soin et des causes à mission.",
          ],
          profils: [
            { nom: "Conseil & accompagnement", raison: "psychologue, thérapeute, coach : comprendre et élever les autres." },
            { nom: "Enseignement & mentorat", raison: "enseignant, formateur, mentor : révéler le potentiel des gens." },
            { nom: "Aide & causes", raison: "travailleur social, soignant, associatif : servir et accompagner." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Tu mets ta clairvoyance et ton empathie au service des autres,\nmais tu peux t'oublier et t'épuiser dans ta vocation.",
        lumiere:
          "Porté par le sens, tu accompagnes et transformes avec une humanité rare, et tu donnes le meilleur quand ton travail touche la vie des gens.",
        ombre:
          "Mais à trop absorber le poids des autres, à peiner à t'affirmer et à poser des limites, ta belle vocation peut se retourner contre toi.",
        bascule:
          "Le jour où tu poses des limites, te protèges et défends ta valeur, ta vocation devient durable et pleinement reconnue.",
      },
    },
    "INFJ-V1-developpement": {
      evolution: `Ta personnalité n'est pas figée : elle mûrit, et ton type suit une trajectoire de croissance particulièrement marquée. Plus jeune, tu es tout entier dans ta vocation et ta sensibilité : comprendre, aider, accompagner, porter les autres et tes idéaux. C'est profond et beau, mais souvent déséquilibré : tu peux t'oublier complètement, absorber la souffrance des autres et t'épuiser à donner.

Avec le temps, quelque chose de précieux s'ouvre en toi. Tu comprends que tu ne peux donner durablement que si tu te préserves, que prendre soin de toi n'est pas égoïste mais nécessaire, et que tes idéaux gagnent à composer avec l'imperfection du réel. Tu apprends à poser des limites, à recevoir, à te livrer, à t'ancrer dans le concret. Dans ta pleine maturité, tu deviens un mentor profond qui élève les autres sans s'oublier : la version la plus accomplie de toi. Et c'est entièrement à ta portée.`,
      etapes: [
        "Tu perçois déjà ce que les autres ressentent avant qu'ils ne le disent, et tu te tournes spontanément vers ceux qui souffrent. Sensible et profond, tu cherches déjà à comprendre et à aider, le cœur tourné vers les autres.",
        "Ta vocation et ta sensibilité sont à leur comble : tu comprends, tu accompagnes, tu portes les autres et tes idéaux. C'est généreux, mais souvent déséquilibré : tu t'oublies, tu absorbes la souffrance d'autrui, et te préserver ne va pas encore de soi.",
        "Tu comprends que tu ne peux donner durablement qu'en te préservant. Tu apprends à poser des limites, à recevoir, à te livrer et à composer avec l'imperfection, sans rien perdre de ta profondeur.",
        "Dans ta pleine maturité, tu es un mentor profond qui élève les autres sans s'oublier, qui sait donner et recevoir. Ta sagesse s'incarne dans le réel et ta vocation se nourrit aussi elle-même : la version la plus accomplie de toi.",
      ],
      leviersForts: [
        { titre: "Prends soin de toi pour durer", texte: "Honore tes propres besoins, accorde-toi du repos et du ressourcement. Te préserver n'est pas trahir ta vocation, c'est ce qui te permet de la vivre durablement." },
        { titre: "Fais de ton intuition un don", texte: "Ta clairvoyance sur les êtres est une force rare. Mets-la au service de ceux que tu accompagnes, et elle transforme des vies sans jamais t'épuiser quand tu la dose." },
        { titre: "Apprends à recevoir", texte: "Tu donnes et tu comprends énormément. Laisse les autres te connaître, t'aider et te soutenir : tes relations y gagnent en réciprocité, et toi en équilibre." },
        { titre: "Ancre tes idéaux dans le réel", texte: "Incarne ta profondeur et tes valeurs dans des actions concrètes, dans le présent. C'est ce qui transforme ta belle vision intérieure en impact réel sur les gens." },
      ],
      questions: [
        { situation: "Quand tu portes la peine de quelqu'un", question: "Est-ce que cette souffrance est la mienne, ou suis-je en train de l'absorber comme la mienne ?" },
        { situation: "Quand tu te donnes pour tout le monde", question: "Est-ce que je prends autant soin de moi que des autres ?" },
        { situation: "Quand le réel déçoit tes idéaux", question: "Est-ce que j'exige du monde une perfection que rien ne peut atteindre ?" },
        { situation: "Quand tu gardes tout pour toi", question: "Qui, dans ma vie, ai-je laissé me connaître et m'aider vraiment ?" },
        { situation: "Quand tu te sens vidé", question: "De quel repos ou de quelle solitude ai-je besoin, là, maintenant ?" },
      ],
      paradoxe: {
        tension:
          "Pour grandir, tu dois apprendre à prendre soin de toi,\nmais tu crains qu'en te préservant, tu trahisses ta vocation à donner.",
        lumiere:
          "Ta clairvoyance, ton empathie et ta vocation à élever les autres sont une base de croissance immense : tu portes en toi tout pour transformer des vies.",
        ombre:
          "Mais par peur d'être égoïste, tu peux refuser de te préserver et de recevoir, et t'épuiser jusqu'à ne plus pouvoir aider personne.",
        bascule:
          "Le jour où tu comprends que te préserver ne trahit pas ton don mais le rend durable, ta croissance s'enclenche vraiment.",
      },
    },
    // ----------------------------------------------------------------- V2
    "INFJ-V2-relations": {
      forces: [
        { titre: "Une connexion d'âme", accent: "connexion", texte: "Tu cherches une intimité vraie où deux mondes intérieurs se rencontrent et se comprennent au-delà des mots." },
        { titre: "Une compréhension intuitive", accent: "compréhension", texte: "Tu captes les émotions, les ambiances et les non-dits de l'autre avec une finesse troublante." },
        { titre: "Une présence intense", accent: "présence", texte: "Tu offres une présence d'une rare profondeur, une attention qui dépasse les apparences." },
        { titre: "Une loyauté profonde", accent: "loyauté", texte: "Une fois engagé, tu offres une fidélité entière et un lien qui traverse le temps." },
        { titre: "Une richesse à partager", accent: "richesse", texte: "Être aimé par toi, c'est être invité dans un monde intérieur que peu ont la chance de découvrir." },
        { titre: "Le goût des liens vrais", accent: "vrais", texte: "Tu préfères quelques amitiés profondes, où l'on partage l'essentiel, à un large cercle de surface." },
      ],
      ombres: [
        { titre: "Une fusion idéalisée", accent: "idéalisée", texte: "Ton idéalisme peut te faire chercher une fusion parfaite que la réalité ne peut atteindre, et te décevoir." },
        { titre: "Le quotidien négligé", accent: "quotidien", texte: "Ta déconnexion du concret peut te faire oublier les aspects pratiques et quotidiens de la relation." },
        { titre: "Une intensité difficile à suivre", accent: "intensité", texte: "Ton monde intérieur si dense peut te rendre énigmatique et difficile à suivre pour l'autre." },
        { titre: "Le repli silencieux", accent: "repli", texte: "Ton besoin de solitude et ton sentiment de décalage peuvent te faire te replier sans prévenir." },
        { titre: "Des besoins tus", accent: "besoins", texte: "Ta réserve peut te faire comprendre l'autre sans jamais te livrer ni exprimer ce dont tu as besoin." },
        { titre: "Une attente de compréhension parfaite", accent: "compréhension", texte: "Tu peux attendre qu'on te rejoigne entièrement dans ta profondeur, ce que personne ne peut tout à fait." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "Le bavardage superficiel et les liens de surface.",
            "Les personnes qui trouvent ta profondeur étrange ou pesante.",
            "Le manque d'espace pour ta vie intérieure.",
            "Les relations qui ignorent le sens et l'authenticité.",
            "Les conflits durs et l'agressivité qui te heurtent.",
          ],
        },
        {
          ton: "positif",
          items: [
            "Des liens vrais où tu peux partager ton monde intérieur.",
            "Quelqu'un qui te rejoint dans ta profondeur sans la juger.",
            "De l'espace et du calme pour te ressourcer.",
            "Une quête de sens et d'authenticité partagée.",
            "Quelqu'un qui t'aide à t'ancrer dans le concret du lien.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Les tempéraments très factuels, allergiques à l'abstraction et à l'introspection.",
            "Les personnalités terre-à-terre qui trouvent ta profondeur nébuleuse.",
            "Les profils directs dont la franchise peut te blesser.",
          ],
          profils: [
            { code: "ESTP", raison: "son pragmatisme direct te paraît à mille lieues de ton monde intérieur." },
            { code: "ESTJ", raison: "son attachement au concret et aux règles cadre mal avec ta profondeur." },
            { code: "ISTJ", raison: "son côté terre-à-terre et procédurier peut sembler indifférent à ton intuition." },
          ],
        },
        {
          ton: "positif",
          items: [
            "Les esprits intuitifs et tournés vers le sens, qui partagent ta profondeur.",
            "Les tempéraments chaleureux qui t'aident à vivre tes émotions plus librement.",
            "Ceux qui t'aident à faire descendre tes visions sur terre.",
          ],
          profils: [
            { code: "INFP", raison: "il partage ta sensibilité, ton intuition et ta quête de sens profond." },
            { code: "ENFP", raison: "son enthousiasme et son authenticité t'allègent et résonnent avec ton imaginaire." },
            { code: "INTJ", raison: "il partage ta profondeur intuitive et t'apporte l'ancrage qui te manque." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Tu offres une intimité d'une profondeur exceptionnelle,\nmais ton idéalisme et ta déconnexion peuvent t'isoler dans ton monde.",
        lumiere:
          "Ta compréhension intuitive, ta loyauté et ta richesse intérieure font de toi un proche d'une profondeur rare, une connexion d'âme inoubliable.",
        ombre:
          "Mais à chercher une fusion parfaite, à négliger le quotidien et à taire tes besoins, tu t'exposes à la déception et au malentendu.",
        bascule:
          "Le jour où tu partages ton monde sans attendre une compréhension parfaite et où tu t'ancres dans le concret du lien, tu construis enfin l'intimité vraie dont tu rêves.",
      },
    },
    "INFJ-V2-carriere": {
      forces: [
        { titre: "Une intuition féconde", accent: "intuition", texte: "Tu perçois le sens et les directions que les autres ne voient pas, et tu apportes une vision rare." },
        { titre: "Un moteur, le sens", accent: "sens", texte: "Quand ton travail touche à quelque chose de plus grand, tu donnes le meilleur de toi-même." },
        { titre: "Une profondeur créative", accent: "profondeur", texte: "Quand l'inspiration te traverse, tu produis des choses d'une qualité et d'une profondeur remarquables." },
        { titre: "Le pouvoir d'inspirer", accent: "inspirer", texte: "Ta vision et ta connexion au sens peuvent élever les gens et leur ouvrir des perspectives." },
        { titre: "Une sensibilité qui perçoit", accent: "sensibilité", texte: "Tu captes les dimensions humaines et symboliques d'une situation que les esprits factuels ignorent." },
        { titre: "Une autonomie intérieure", accent: "autonomie", texte: "Ta richesse intérieure te nourrit sans stimulation extérieure et alimente ta créativité." },
      ],
      ombres: [
        { titre: "La déconnexion du concret", accent: "déconnexion", texte: "Tu peux être si tourné vers la vision que tu peines à t'intégrer dans le monde pratique du travail." },
        { titre: "Des visions non concrétisées", accent: "concrétisées", texte: "Tu peux avoir de belles intuitions qui restent dans ta tête, faute de passage à l'acte régulier." },
        { titre: "Un idéalisme qui fuit le compromis", accent: "idéalisme", texte: "Tes idéaux élevés peuvent te faire fuir les compromis pratiques nécessaires." },
        { titre: "Une sensibilité à l'agitation", accent: "agitation", texte: "Le bruit, la pression du résultat immédiat et l'agitation brouillent ton intuition et t'épuisent." },
        { titre: "Une production irrégulière", accent: "irrégulière", texte: "Tu travailles par inspiration plus que de façon mécanique et régulière, ce qui peut désarçonner." },
        { titre: "Un rapport étranger à l'argent", accent: "argent", texte: "Les questions matérielles t'intéressent peu, et tu peux les négliger ou mal les gérer." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "Le travail purement matériel, mécanique ou dénué de sens.",
            "La pression du résultat immédiat qui tue l'inspiration.",
            "Les environnements bruyants, agités et superficiels.",
            "Le micro-management et le cadre rigide.",
            "Les ambiances cyniques qui t'étouffent.",
          ],
        },
        {
          ton: "positif",
          items: [
            "Un travail porteur de sens et d'une dimension profonde.",
            "De l'autonomie et de l'espace pour ta vie intérieure.",
            "Du calme et du temps pour laisser émerger tes idées.",
            "Pouvoir créer, inspirer et explorer la profondeur des choses.",
            "Un environnement qui valorise la profondeur et la vision.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Les milieux purement matériels et mécaniques.",
            "Les environnements bruyants et sous pression constante.",
            "Les postes rigides sans espace pour réfléchir et créer.",
          ],
          profils: [
            { nom: "Production mécanique, cadences", raison: "des tâches répétitives qui brouillent ton intuition." },
            { nom: "Milieux purement commerciaux", raison: "une pression matérielle qui t'étouffe et te dégoûte." },
            { nom: "Postes très normés et bruyants", raison: "aucun espace pour la profondeur et la vision." },
          ],
        },
        {
          ton: "positif",
          items: [
            "L'écriture, la création et les arts inspirés.",
            "L'accompagnement spirituel, psychologique ou profond.",
            "L'enseignement et le conseil porteurs de sens.",
          ],
          profils: [
            { nom: "Écriture & création", raison: "écrivain, artiste, créateur : exprimer ta vision et ta profondeur." },
            { nom: "Accompagnement profond", raison: "thérapeute, accompagnant, conseil : explorer le sens avec les gens." },
            { nom: "Transmission & causes", raison: "enseignant, porteur de cause : inspirer par le sens." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Ta profondeur peut produire des choses d'une grande valeur,\nmais elle risque de rester enfermée, sans prise sur le réel.",
        lumiere:
          "Porté par l'inspiration et le sens, tu apportes une vision et une profondeur que les esprits terre-à-terre n'ont pas, et tu peux inspirer les autres.",
        ombre:
          "Mais ta déconnexion du concret et ta difficulté à concrétiser régulièrement peuvent laisser tes belles intuitions sans suite.",
        bascule:
          "Le jour où tu ancres ton inspiration dans des réalisations concrètes, ta profondeur se transforme en contributions reconnues et en impact réel.",
      },
    },
    "INFJ-V2-developpement": {
      evolution: `Ta personnalité n'est pas figée : elle mûrit, et ton type suit une trajectoire de croissance particulièrement marquée. Plus jeune, tu es tout entier dans ta vie intérieure et ton intuition : percevoir, contempler, suivre l'inspiration, explorer le sens. C'est profond et beau, mais souvent déconnecté : tu peux vivre tellement dans ta tête que tu négliges le réel, ton corps et le présent, et te replier dans ta solitude.

Avec le temps, quelque chose de précieux s'ouvre en toi. Tu comprends qu'une vision qui ne s'incarne pas reste stérile, que ta profondeur gagne à descendre sur terre, et que prendre soin du concret n'est pas trahir ton âme mais l'ancrer. Tu apprends à incarner tes intuitions, à les partager, à habiter le présent. Dans ta pleine maturité, tu deviens un visionnaire profond qui sait aussi s'ancrer et transmettre, dont la sagesse éclaire le monde réel : la version la plus accomplie de toi. Et c'est entièrement à ta portée.`,
      etapes: [
        "Tu vis déjà dans un monde intérieur foisonnant, peuplé d'intuitions, d'images et de questions profondes. Rêveur et sensible, tu pressens des choses que les autres ne perçoivent pas, fasciné par le sens caché du monde.",
        "Tu vis pleinement à travers ton intuition et ta vie intérieure : percevoir, contempler, suivre l'inspiration. C'est riche et beau, mais souvent déconnecté : tu vis dans ta tête, tu négliges le réel, et t'ancrer ne va pas encore de soi.",
        "Tu comprends qu'une vision qui ne s'incarne pas reste stérile. Tu apprends à ancrer tes intuitions, à habiter le présent et ton corps, à partager ce que tu perçois, sans rien perdre de ta profondeur.",
        "Dans ta pleine maturité, tu es un visionnaire profond qui sait aussi s'ancrer et transmettre. Ta sagesse éclaire le monde réel au lieu de rester enfermée : la version la plus accomplie de toi.",
      ],
      leviersForts: [
        { titre: "Ancre-toi dans le réel", texte: "Incarne tes intuitions dans des actions concrètes, habite le présent et ton corps. Une activité physique, des routines simples, le contact avec le concret donnent une prise à ta clairvoyance." },
        { titre: "Partage et incarne tes visions", texte: "Le monde a besoin de ta clairvoyance, mais il faut la faire descendre jusqu'à lui. Traduis ce que tu perçois en mots, en créations, en actions : c'est là que ta profondeur prend toute sa valeur." },
        { titre: "Prends soin de ton corps et du présent", texte: "Honore tes besoins concrets, ta santé, l'instant présent. Cet ancrage n'appauvrit pas ta profondeur, il lui donne une base solide et te protège de la déconnexion." },
        { titre: "Connecte-toi aux autres", texte: "Ne laisse pas ton sentiment de décalage t'isoler. Partage ton monde intérieur, cultive les liens : la connexion, même imparfaite, enrichit ta vie et te sort de la solitude." },
      ],
      questions: [
        { situation: "Quand une intuition te traverse", question: "Comment puis-je la traduire en quelque chose de concret, plutôt que de la garder pour moi ?" },
        { situation: "Quand tu vis dans ta tête depuis des jours", question: "De quoi, dans le réel et le présent, suis-je en train de m'éloigner ?" },
        { situation: "Quand le monde déçoit tes idéaux", question: "Est-ce que j'exige du réel une perfection que rien ne peut atteindre ?" },
        { situation: "Quand tu te sens en décalage", question: "Est-ce que je me replie, ou est-ce que j'ose partager ce que je perçois ?" },
        { situation: "Quand tu négliges ton corps", question: "Qu'est-ce que mon corps et le présent me demandent, là, maintenant ?" },
      ],
      paradoxe: {
        tension:
          "Pour grandir, tu dois apprendre à t'ancrer dans le réel,\nmais tu crains qu'en redescendant sur terre, tu trahisses ta profondeur.",
        lumiere:
          "Ton intuition, ta connexion au sens et ta richesse intérieure sont une base de croissance immense : tu perçois des vérités que le monde gagnerait à recevoir.",
        ombre:
          "Mais par peur d'appauvrir ta profondeur, tu peux refuser de t'ancrer et de partager, et rester un trésor caché sans prise sur le réel.",
        bascule:
          "Le jour où tu comprends que t'ancrer ne trahit pas ta profondeur mais lui donne enfin une prise sur le monde, ta croissance s'enclenche vraiment.",
      },
    },
    // ----------------------------------------------------------------- V3
    "INFJ-V3-relations": {
      forces: [
        { titre: "Une loyauté durable", accent: "loyauté", texte: "Une fois engagé, tu offres une fidélité totale, avec constance et intégrité, tournée vers le sens." },
        { titre: "Le partage de valeurs", accent: "valeurs", texte: "Tu construis des liens fondés sur des convictions communes et un avenir qui a du sens." },
        { titre: "Une présence fidèle", accent: "présence", texte: "Tu offres un partenariat solide et une compréhension fine, sur qui l'on peut vraiment compter." },
        { titre: "Une intégrité rassurante", accent: "intégrité", texte: "On sait que tu agis par conviction, jamais par calcul, et cela inspire confiance et respect." },
        { titre: "Le don d'inspirer", accent: "inspirer", texte: "Tu pousses tes proches à réfléchir et tu les engages sur des sujets qui comptent vraiment." },
        { titre: "Une profondeur sincère", accent: "profondeur", texte: "Tu offres des échanges qui vont au fond des choses, fondés sur ce qui compte réellement." },
      ],
      ombres: [
        { titre: "La relation négligée", accent: "négligée", texte: "Absorbé par tes causes et ta mission, tu peux délaisser la relation et ceux qui te sont proches." },
        { titre: "Des attentes idéalisées", accent: "idéalisées", texte: "Ton idéalisme peut te faire attendre beaucoup de l'autre et de la relation." },
        { titre: "Le fardeau porté seul", accent: "seul", texte: "Ta réserve et ton sens des responsabilités peuvent te faire garder tes difficultés pour toi." },
        { titre: "Une exigence envers les proches", accent: "exigence", texte: "Tes convictions fortes peuvent te rendre exigeant envers ceux que tu aimes." },
        { titre: "Des liens peu entretenus", accent: "entretenus", texte: "Ton engagement peut te faire négliger l'entretien de tes amitiés et de tes relations." },
        { titre: "Des besoins tus", accent: "besoins", texte: "Ta tendance à tout assumer peut te faire taire ce dont tu as besoin et ne jamais demander de soutien." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "Les personnes dont les valeurs heurtent profondément les tiennes.",
            "Le cynisme et l'indifférence aux questions de sens et de justice.",
            "Les liens de surface, sans profondeur ni convictions partagées.",
            "Les relations qui te demandent de trahir tes idéaux.",
            "Les rapports de force et l'agressivité.",
          ],
        },
        {
          ton: "positif",
          items: [
            "Des liens fondés sur des valeurs partagées et un sens commun.",
            "Quelqu'un qui partage ou respecte tes idéaux et t'accompagne.",
            "De la sincérité, de la profondeur et de l'intégrité.",
            "Quelqu'un qui prend soin de toi quand tu te donnes trop.",
            "Le respect mutuel et un avenir qui a du sens.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Les tempéraments très pragmatiques, indifférents aux questions de sens.",
            "Les profils cyniques face à tes convictions et à ton idéalisme.",
            "Les personnalités dures ou détachées émotionnellement.",
          ],
          profils: [
            { code: "ESTP", raison: "son pragmatisme détaché peut te sembler indifférent à ce qui te tient à cœur." },
            { code: "ESTJ", raison: "son attachement aux règles plus qu'aux valeurs peut te heurter." },
            { code: "ENTP", raison: "son goût du débat pour le débat peut sembler cynique face à tes convictions." },
          ],
        },
        {
          ton: "positif",
          items: [
            "Les esprits intuitifs et tournés vers les valeurs et le sens.",
            "Les tempéraments chaleureux et légers qui t'aident à ne pas tout porter gravement.",
            "Les profils concrets qui t'aident à réaliser tes idéaux dans le réel.",
          ],
          profils: [
            { code: "INFP", raison: "il partage ta profondeur, ta quête de sens et ton désir d'un monde meilleur." },
            { code: "ENFP", raison: "son enthousiasme et ses valeurs te rejoignent et t'apportent de la légèreté." },
            { code: "ENFJ", raison: "sa chaleur et son sens de l'action soutiennent ton engagement sans t'épuiser." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Tu offres une loyauté et une profondeur rares à ceux que tu aimes,\nmais ton engagement pour tes causes peut te faire négliger la relation.",
        lumiere:
          "Ta fidélité, ton intégrité et ta profondeur font de toi un proche solide et inspirant, avec qui partager une vie qui a du sens.",
        ombre:
          "Mais à t'absorber dans ta mission, à attendre beaucoup et à tout porter seul, tu peux délaisser le lien et t'épuiser.",
        bascule:
          "Le jour où tu accordes à la relation autant de soin qu'à tes idéaux et où tu partages ton fardeau, tes liens deviennent profonds et soutenables.",
      },
    },
    "INFJ-V3-carriere": {
      forces: [
        { titre: "La vision et l'action réunies", accent: "action", texte: "Tu transformes tes idéaux en réalisations concrètes : un vrai agent de changement, pas seulement un rêveur." },
        { titre: "Une détermination durable", accent: "détermination", texte: "Sous ta réserve, une volonté de fer et une constance qui te font tenir au service de ce qui compte." },
        { titre: "Un moteur, le sens", accent: "sens", texte: "Quand ton travail sert une cause et améliore le monde, tu te donnes sans compter." },
        { titre: "Une boussole morale sûre", accent: "boussole", texte: "Ton ancrage moral guide ton travail, te rend intègre et inspire confiance et respect." },
        { titre: "Un talent d'organisation", accent: "organisation", texte: "Tu sais transformer un idéal en plan, et un plan en action soutenue dans le temps." },
        { titre: "Une humanité engagée", accent: "humanité", texte: "Ton action est animée par un vrai souci des gens, jamais froide ni abstraite." },
      ],
      ombres: [
        { titre: "Le risque d'épuisement", accent: "épuisement", texte: "Tu peux te donner jusqu'à te consumer pour tes causes et porter le poids du monde." },
        { titre: "Une intransigeance", accent: "intransigeance", texte: "Tes convictions fortes peuvent te durcir face aux résistances et te rendre amer." },
        { titre: "La déconnexion du concret", accent: "concret", texte: "Ton idéalisme peut te faire négliger les contraintes pratiques et les détails de la mise en œuvre." },
        { titre: "Le rejet du compromis", accent: "compromis", texte: "Tu peux refuser des options réalistes mais imparfaites, et fuir les compromis nécessaires." },
        { titre: "Le fardeau solitaire", accent: "solitaire", texte: "Ta réserve peut te faire porter tes combats seul, sans déléguer ni demander d'aide." },
        { titre: "Un rapport méfiant à l'argent", accent: "argent", texte: "L'argent te motive peu, et tu peux t'en méfier quand il entre en conflit avec tes idéaux." },
      ],
      blocs: [
        {
          ton: "negatif",
          items: [
            "Le travail vide de sens, purement lucratif.",
            "Les compromis moraux et le cynisme ambiant.",
            "Les environnements contraires à tes valeurs.",
            "Les ambiances agressives et les rapports de force.",
            "Le manque d'autonomie et de mission.",
          ],
        },
        {
          ton: "positif",
          items: [
            "Un travail aligné avec tes valeurs et porteur de sens.",
            "Le sentiment de servir une cause plus grande que toi.",
            "De l'autonomie et la possibilité de transformer concrètement.",
            "Pouvoir bâtir, améliorer, défendre ce qui est juste.",
            "Un environnement qui respecte tes convictions.",
          ],
        },
      ],
      compatibilites: [
        {
          ton: "negatif",
          items: [
            "Les milieux purement lucratifs et cyniques.",
            "Les environnements contraires à tes valeurs.",
            "Les postes sans autonomie ni mission.",
          ],
          profils: [
            { nom: "Finance pure, vente sous pression", raison: "le profit au mépris du sens et des valeurs." },
            { nom: "Environnements cyniques", raison: "des compromis moraux qui te dégoûtent." },
            { nom: "Postes rigides et sans mission", raison: "aucune place pour transformer ni servir une cause." },
          ],
        },
        {
          ton: "positif",
          items: [
            "Les causes et les organisations à mission.",
            "L'engagement social, humanitaire ou environnemental.",
            "L'enseignement et la transmission de valeurs.",
          ],
          profils: [
            { nom: "Causes & ONG", raison: "associatif, humanitaire, environnement : transformer et servir ce qui est juste." },
            { nom: "Engagement & plaidoyer", raison: "porteur de cause, militant, plaidoyer : changer les choses avec conviction." },
            { nom: "Transmission & conseil engagé", raison: "enseignant, conseil porteur de sens : transmettre des valeurs." },
          ],
        },
      ],
      paradoxe: {
        tension:
          "Tu veux transformer le monde et tu en as la détermination,\nmais à te donner sans limite, tu risques de te consumer avant d'y parvenir.",
        lumiere:
          "Ta vision, ta détermination et ton intégrité te permettent de bâtir des choses qui comptent et de changer réellement les choses.",
        ombre:
          "Mais l'épuisement, l'intransigeance et la déconnexion du concret peuvent miner ton impact et ta flamme.",
        bascule:
          "Le jour où tu choisis tes combats, composes avec le réel et te préserves, ta belle détermination se transforme en impact réel et durable.",
      },
    },
    "INFJ-V3-developpement": {
      evolution: `Ta personnalité n'est pas figée : elle mûrit, et ton type suit une trajectoire de croissance particulièrement marquée. Plus jeune, tu es tout entier dans tes idéaux et ton engagement : transformer, militer, porter tes convictions, vouloir changer le monde. C'est beau et puissant, mais souvent déséquilibré : tu peux t'épuiser pour tes causes, te durcir face aux résistances et te négliger jusqu'au surmenage.

Avec le temps, quelque chose de précieux s'ouvre en toi. Tu comprends que tu ne peux transformer durablement que si tu te préserves, que le monde change à son rythme, et que choisir ses combats n'est pas renoncer mais durer. Tu apprends à composer avec le réel, à t'appuyer sur les autres, à prendre soin de toi. Dans ta pleine maturité, tu deviens un architecte d'idéaux qui transforme le monde sans s'y consumer : la version la plus accomplie de toi. Et c'est entièrement à ta portée.`,
      etapes: [
        "Tu ressens déjà très fort ce qui est juste et ce qui ne l'est pas, et tu portes en toi l'envie d'un monde meilleur. Sensible aux injustices, tu prends spontanément la défense de ce qui compte.",
        "Tes idéaux et ton engagement sont à leur comble : tu veux transformer, militer, porter tes convictions. C'est puissant, mais souvent déséquilibré : tu t'épuises pour tes causes, tu te durcis, et te préserver ne va pas encore de soi.",
        "Tu comprends que tu ne transformes durablement qu'en te préservant et en choisissant tes combats. Tu apprends à composer avec le réel et à t'appuyer sur les autres, sans rien perdre de tes convictions.",
        "Dans ta pleine maturité, tu transformes le monde sans t'y consumer, alliant la vision élevée à l'ancrage concret et le don de soi au soin de soi : la version la plus accomplie de toi.",
      ],
      leviersForts: [
        { titre: "Prends soin de toi pour durer", texte: "Préserve ton énergie et honore tes besoins. Te ménager n'est pas trahir ta mission, c'est ce qui te permet de la porter sur le long terme. Un militant qui dure transforme le monde." },
        { titre: "Choisis tes combats", texte: "Tu ne peux pas tout transformer ni porter toutes les causes. Concentre ton énergie sur les combats qui comptent vraiment : tu démultiplies ton impact et tu te protèges de l'épuisement." },
        { titre: "Compose avec le réel", texte: "Le monde change à son rythme, et la transformation passe par des compromis et des étapes imparfaites. Accepter cela, sans renoncer à tes idéaux, te rend plus efficace et t'évite l'amertume." },
        { titre: "Appuie-toi sur les autres", texte: "Ne porte pas tes combats seul. Partage le fardeau, construis des alliances, accepte le soutien : tes idéaux se réalisent mieux à plusieurs, et toi tu t'épuises moins." },
      ],
      questions: [
        { situation: "Quand une cause t'accable", question: "Sur quoi, ici, ai-je vraiment le pouvoir d'agir ?" },
        { situation: "Quand tu te donnes sans compter", question: "Est-ce que je prends autant soin de moi que de mes causes ?" },
        { situation: "Quand le monde ne change pas assez vite", question: "Est-ce que j'exige du réel une perfection que rien ne peut atteindre ?" },
        { situation: "Quand tu portes tout seul", question: "Qui pourrais-je laisser m'aider ou partager ce fardeau avec moi ?" },
        { situation: "Quand tu te sens vidé", question: "De quel repos ou de quel soutien ai-je besoin, là, maintenant ?" },
      ],
      paradoxe: {
        tension:
          "Pour changer le monde, tu dois t'y engager pleinement,\nmais à te donner sans limite, tu risques de t'éteindre avant d'avoir agi.",
        lumiere:
          "Ta vision, ta détermination et tes convictions sont une force rare : tu as déjà en toi tout ce qu'il faut pour rendre le monde un peu plus juste.",
        ombre:
          "Mais sans te préserver ni choisir tes combats, cette même flamme peut te consumer et réduire ton impact à néant.",
        bascule:
          "Le jour où tu apprends à porter ta flamme sans t'y brûler, ton engagement devient une force durable qui change vraiment les choses.",
      },
    },
  },
};

export default infj;
