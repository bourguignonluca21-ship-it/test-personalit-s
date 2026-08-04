// =============================================================================
// CONTENU RÉDIGÉ DES PAGES DE TYPE — le portrait complet, découpé en pages SEO.
// Source : les études internes (<TYPE>_etude_v2.md). Règles : uniquement des
// affirmations soutenues par l'étude — pas de scènes inventées, pas de
// « type le plus rare », pas de métiers promis, pas de tableau de paires.
// Pour l'instant : INFJ (moule). Les 15 autres suivront le même schéma.
// =============================================================================

export type BlocPage =
  | { genre: "texte"; titre?: string; paragraphes: string[] }
  | {
      genre: "liste";
      titre?: string;
      intro?: string;
      items: { titre: string; texte: string; revers?: string }[];
    }
  | {
      genre: "tableau";
      titre?: string;
      intro?: string;
      colonnes: [string, string];
      lignes: [string, string][];
      sortie?: string[];
    };

export interface PageDeType {
  slug: string; // "" pour la page d'introduction (/types-de-personnalite/<code>)
  titre: string; // titre affiché (H1 / onglet)
  titreSeo: string;
  description: string; // meta description
  exergue?: string;
  blocs: BlocPage[];
}

export interface ContenuType {
  intro: PageDeType;
  pages: PageDeType[];
}

// -----------------------------------------------------------------------------
// INFJ — l'Avocat
// -----------------------------------------------------------------------------

const INFJ: ContenuType = {
  intro: {
    slug: "",
    titre: "Introduction",
    titreSeo: "INFJ (Avocat) : le portrait complet",
    description:
      "Le type INFJ : celui qui lit le mieux les autres, et qu'on lit le plus mal. Un portrait honnête, forces, paradoxes, et ce que valent vraiment les légendes.",
    exergue: "Voir les autres mieux qu'ils ne se voient. Et n'être vraiment vu par personne.",
    blocs: [
      {
        genre: "texte",
        paragraphes: [
          "INFJ, c'est l'un des seize types de personnalité : Introversion, iNtuition, Sentiment, Jugement. Sur le papier, quatre lettres parmi d'autres. Dans la vie, un des types les moins fréquents, de l'ordre de 1 à 3 % de la population selon les échantillons disponibles, et sans doute le plus entouré de légendes. On remettra les principales à leur place plus bas.",
        ],
      },
      {
        genre: "texte",
        titre: "La perception qui devient *une obligation*",
        paragraphes: [
          "Ce qui définit l'INFJ, ce n'est ni la gentillesse ni la sensibilité, contrairement à ce qu'on lit partout. C'est l'enchaînement de deux opérations qui vont rarement ensemble : percevoir chez une personne quelque chose qu'elle n'a pas dit, un état, une intention, une direction, et se sentir aussitôt tenu d'en faire quelque chose.",
          "Beaucoup de gens perçoivent sans agir. Beaucoup s'engagent sans percevoir. L'INFJ fait les deux, et ne sait pas ne pas les faire. Chez lui, voir un besoin et s'en sentir responsable sont un seul et même mouvement. C'est sa force la plus réelle, et c'est aussi de là que viennent presque toutes ses difficultés.",
        ],
      },
      {
        genre: "texte",
        titre: "Le paradoxe qui organise *tout le reste*",
        paragraphes: [
          "L'INFJ est le type qui lit le mieux les autres, et celui qu'on lit le plus mal.",
          "Cette asymétrie n'est pas un accident. Ce qu'il montre est calibré sur son interlocuteur : il ajuste son ton, ses mots, sa présence à ce que l'autre peut recevoir. Résultat, chacun repart avec l'impression d'avoir été profondément compris, et sans avoir rien appris de lui. Ses proches découvrent parfois, des années plus tard, qu'ils ne lui ont jamais posé de question. Lui en tire souvent une conclusion amère : on ne s'intéresse pas à moi. La conclusion juste serait plutôt : il n'a jamais donné de prise.",
        ],
      },
      {
        genre: "texte",
        titre: "Calme dehors, *intense dedans*",
        paragraphes: [
          "Deuxième paradoxe : classé parmi les types « Sentiment », l'INFJ n'a pas pour moteur une émotion, mais une perception. Son intuition capte, agrège, condense ; le sentiment n'est que le canal de sortie. C'est pour ça qu'il peut paraître mesuré, presque neutre, tout en portant une intensité intérieure considérable. Ce n'est pas de la retenue. C'est sa structure.",
          "D'où une expérience que beaucoup d'INFJ racontent : passer pour quelqu'un de calme, de posé, « qui encaisse bien », pendant que tout, à l'intérieur, est vécu à haute température.",
          "Et un troisième paradoxe, celui du nom : on l'appelle l'Avocat, ce qui suggère la prise de parole publique. Or ses convictions se forment en silence, et la plupart ne seront jamais plaidées.",
        ],
      },
      {
        genre: "tableau",
        titre: "Ce qu'il vit, *ce qu'on voit*",
        intro:
          "C'est le type où l'écart entre l'intérieur et l'extérieur coûte le plus cher. Le même comportement, vu des deux côtés :",
        colonnes: ["Ce qu'il vit", "Ce que les autres voient"],
        lignes: [
          ["Je m'adapte à toi par égard", "Il est d'accord avec moi"],
          ["Je ne veux pas alourdir", "Il ne me fait pas confiance"],
          ["J'ai besoin de me retirer pour me décharger", "Il me fuit, j'ai fait quelque chose"],
          ["Ça fait six mois que j'essaie de le dire", "Il m'annonce ça d'un coup"],
          ["Je ressens énormément", "Il est calme, il encaisse bien"],
        ],
        sortie: [
          "Il communique par ajustement ; son entourage lit un accord. Il se croit transparent, parce que ce qu'il ressent est intense ; il est en réalité l'un des types les plus difficiles à lire, précisément parce que ce qu'il montre sert d'abord à mettre l'autre à l'aise.",
        ],
      },
      {
        genre: "texte",
        titre: "Trois *légendes* à remettre à leur place",
        paragraphes: [
          "On présente souvent l'INFJ comme « le type le plus rare ». La rareté est plausible ; le classement, lui, ne repose sur rien de solide, les chiffres qui circulent viennent d'échantillons anciens et non représentatifs, et le rang varie selon la table qu'on retient.",
          "On le dit aussi « empathe », capable de ressentir les gens à distance. La réalité est moins magique et plus intéressante : une inférence à partir de micro-signaux, un ton, une posture, un mot évité, si rapide qu'elle est indiscernable d'une perception directe, y compris pour lui.",
          "On le croit enfin gentil. C'est confondre son attention aux autres avec de la douceur. La dureté de l'INFJ existe : elle est morale, rare, et définitive.",
        ],
      },
    ],
  },
  pages: [
    {
      slug: "forces-et-faiblesses",
      titre: "Forces et faiblesses",
      titreSeo: "INFJ (Avocat) : forces et faiblesses",
      description:
        "Les forces de l'INFJ et ce qu'elles coûtent, et ses faiblesses, qui ne forment pas une liste, mais une chaîne.",
      blocs: [
        {
          genre: "liste",
          titre: "Les forces, et ce qu'elles *coûtent*",
          intro:
            "Une force sans limite, c'est un argument de vente, pas une observation. Chaque force de l'INFJ a un revers, et c'est le même mécanisme qui produit les deux.",
          items: [
            {
              titre: "Lire les autres.",
              texte:
                "Il perçoit l'état, l'intention et souvent la direction d'une personne à partir de signaux que personne d'autre ne relève.",
              revers:
                "Il lit aussi des intentions qui n'existent pas, et peut construire une trajectoire entière à partir d'un seul indice ambigu.",
            },
            {
              titre: "Mettre des mots sur ce qui n'est pas dit.",
              texte:
                "Il formule un état que la personne concernée n'a pas encore identifié elle-même.",
              revers:
                "Il le dit parfois à quelqu'un qui n'a rien demandé, et c'est vécu comme une intrusion, pas comme un cadeau.",
            },
            {
              titre: "Tenir une conviction sans élever la voix.",
              texte:
                "Il défend une position impopulaire calmement, et ne cède pas quand l'enjeu est éthique.",
              revers:
                "Il moralise, et juge durement ceux qui acceptent un compromis qu'il refuse.",
            },
            {
              titre: "Sentir venir les tensions.",
              texte: "Il perçoit un conflit d'équipe des semaines avant qu'il éclate.",
              revers:
                "Il intervient sur des conflits qui se seraient réglés seuls, et se retrouve mêlé à des histoires qui ne le concernaient pas.",
            },
            {
              titre: "Rendre communicable l'abstrait.",
              texte:
                "Écriture, image, forme : il donne corps à des choses que d'autres ne savent pas dire, et c'est rare.",
              revers:
                "Un perfectionnisme qui rend le premier jet impossible, beaucoup de projets, peu de terminés.",
            },
            {
              titre: "Durer au service d'une cause.",
              texte: "Il tient des années, sans reconnaissance, sur un engagement choisi.",
              revers:
                "Il s'identifie à la cause au point de ne plus pouvoir l'évaluer, et vit toute critique de la cause comme une attaque personnelle.",
            },
            {
              titre: "Créer la confiance vite.",
              texte:
                "Les gens se confient à lui rapidement, y compris des inconnus, un phénomène qu'il subit autant qu'il en bénéficie.",
              revers: "Il crée une intimité qu'il ne peut pas honorer à l'échelle, puis culpabilise.",
            },
            {
              titre: "Exiger la cohérence.",
              texte:
                "Il repère l'écart entre ce qu'une personne ou une organisation dit et ce qu'elle fait, et ne l'oublie pas.",
              revers:
                "Une rigidité qui défend une conclusion bien après que les faits l'ont contredite.",
            },
            {
              titre: "Être loyal longtemps.",
              texte: "Une fois engagé, il est stable et fiable sur des durées inhabituelles.",
              revers:
                "Il reste dans des relations dont il a lu l'issue depuis longtemps, parce que partir suppose de décevoir.",
            },
            {
              titre: "Voir le système derrière le cas.",
              texte:
                "Ce n'est pas cet élève, c'est ce dispositif : il passe de la personne à la structure.",
              revers: "Il réforme mentalement des systèmes sur lesquels il n'a aucune prise.",
            },
          ],
        },
        {
          genre: "texte",
          titre: "Les faiblesses : pas une liste, *une chaîne*",
          paragraphes: [
            "Chez la plupart des types, les défauts sont des forces mal orientées. Chez l'INFJ, ils forment une chaîne, et chaque maillon pris isolément est raisonnable.",
            "Il perçoit un besoin. La perception devient une obligation. Il donne, sans qu'on ait demandé. Il ne dit pas ce que ça lui coûte, le dire annulerait le don. Le coût s'accumule, en silence. Puis il rompt, d'un coup. Et l'autre ne comprend rien, parce qu'il n'a jamais su qu'il y avait un problème.",
            "Aucun maillon n'est déraisonnable. La chaîne complète détruit des relations, régulièrement. Dans le détail, les maillons ressemblent à ça :",
          ],
        },
        {
          genre: "liste",
          items: [
            {
              titre: "Il absorbe sans filtre.",
              texte:
                "Il ne distingue pas ce qu'il ressent de ce qu'il capte, et se retrouve chargé d'états qui ne sont pas les siens.",
            },
            {
              titre: "Il évite le conflit.",
              texte:
                "Il désamorce, adoucit, reporte. Le désaccord ne disparaît pas : il se stocke, et ressort plus tard sous une forme bien plus lourde.",
            },
            {
              titre: "Il idéalise, puis il en veut.",
              texte:
                "Il construit une version haute de la personne, puis lui reproche silencieusement de ne pas y correspondre.",
            },
            {
              titre: "Il refuse l'ordinaire.",
              texte:
                "L'écart entre l'idéal et le réel le rend insatisfait du réel, et il traduit mal une grande vision en actions quotidiennes banales.",
            },
            {
              titre: "Il encaisse mal les remarques sur sa sincérité.",
              texte:
                "Une critique technique passe. Une remarque qui met en doute son intention fait des dégâts durables.",
            },
            {
              titre: "Il exige l'authenticité, et ne se livre pas.",
              texte:
                "Le point le plus contradictoire du type, et celui dont il a le moins conscience.",
            },
            {
              titre: "Sa certitude intuitive ne se discute pas.",
              texte:
                "Quand il a conclu sur quelqu'un, aucun argument ne passe : difficile de faire réviser un jugement qu'il n'a jamais explicité.",
            },
            {
              titre: "Il part sans préavis.",
              texte:
                "Le retrait arrive après une longue accumulation invisible, définitif de l'intérieur, brutal de l'extérieur.",
            },
            {
              titre: "Il ne sait pas demander.",
              texte:
                "Nommer un besoin lui paraît indélicat. Il attend qu'on devine, comme lui devine.",
            },
            {
              titre: "Il tient un registre silencieux.",
              texte:
                "Personne ne sait qu'un compte est ouvert. Le jour où il le présente, le montant est indéfendable.",
            },
            {
              titre: "Il s'épuise.",
              texte:
                "Peu d'exutoires, beaucoup de charge portée pour les autres, aucune limite posée à temps.",
            },
            {
              titre: "Il fait du sacrifice une preuve.",
              texte:
                "Se donner est vécu comme la preuve du lien, ce qui rend son aide difficile à recevoir : l'autre sent qu'il contracte une dette.",
            },
          ],
        },
        {
          genre: "texte",
          titre: "Le point qui *change tout*",
          paragraphes: [
            "On ne « corrige » pas ce type en lui demandant d'être moins empathique. Un seul maillon de la chaîne suffit à tout changer : celui où le coût n'est pas dit. Un INFJ qui apprend à dire ce que ça lui coûte, au moment où ça le coûte, casse la chaîne entière.",
          ],
        },
      ],
    },
    {
      slug: "relations-amoureuses",
      titre: "Relations amoureuses",
      titreSeo: "INFJ (Avocat) en amour : relations amoureuses",
      description:
        "Comment l'INFJ aime : être connu plutôt qu'aimé, la rencontre comme point faible, le besoin qu'il ne dira jamais, et le mécanisme de son conflit typique.",
      blocs: [
        {
          genre: "texte",
          titre: "Ce qu'il cherche",
          paragraphes: [
            "Être connu, pas seulement aimé. Pour l'INFJ, la conversation n'est pas un moyen d'accéder à l'intimité : elle est l'intimité. Et l'alignement de valeurs fonctionne comme un critère éliminatoire : un INFJ peut être très attiré par quelqu'un et renoncer, parce qu'il a perçu un désaccord de fond.",
          ],
        },
        {
          genre: "texte",
          titre: "La rencontre est son point faible, pour *une raison précise*",
          paragraphes: [
            "Il construit mentalement une version de l'autre avant de le connaître, et s'attache à cette construction. La sélectivité qui suit n'est pas de l'exigence : c'est une comparaison entre une personne réelle et une image que personne ne peut atteindre.",
            "S'ajoute une asymétrie qui n'aide pas : percevoir l'intérêt de l'autre lui est facile. Manifester le sien ne l'est pas.",
          ],
        },
        {
          genre: "texte",
          titre: "Une fois engagé",
          paragraphes: [
            "Il est d'une constance rare. Beaucoup de partenaires d'INFJ décrivent une qualité d'écoute qu'ils n'avaient jamais connue : quelqu'un qui se souvient, qui anticipe, qui comprend à demi-mot.",
          ],
        },
        {
          genre: "texte",
          titre: "Le besoin qu'il *ne dira jamais*",
          paragraphes: [
            "Qu'on le devine. Lui devine, alors il attend d'être deviné. Et il vit le fait de devoir demander comme la preuve que le lien n'est pas ce qu'il croyait. C'est une exigence impossible, jamais formulée, et c'est la cause silencieuse d'une grande partie de ses déceptions amoureuses.",
            "Ce qui le blesse le plus : s'entendre dire qu'il est trop intense ; qu'on doute de sa sincérité ; et l'indifférence, plus que le conflit.",
          ],
        },
        {
          genre: "texte",
          titre: "Le conflit typique, dans *son mécanisme*",
          paragraphes: [
            "Il perçoit un problème tôt. Il ne le dit pas, pour ne pas créer de tension. Il compense, il s'ajuste, il donne davantage. Six mois plus tard, il pose sur la table un bilan complet, avec des exemples datés et une conclusion déjà prise. Le partenaire découvre qu'un procès s'est tenu sans lui. L'INFJ, lui, a le sentiment d'avoir été patient très longtemps.",
            "Les deux ont raison de leur point de vue, et c'est exactement le problème. Ce qui casse ce mécanisme, ce n'est pas plus de patience, c'est un désaccord dit tôt, quand il est encore petit.",
          ],
        },
      ],
    },
    {
      slug: "amities",
      titre: "Amitiés",
      titreSeo: "INFJ (Avocat) en amitié",
      description:
        "Les amitiés de l'INFJ : un filtre d'authenticité appliqué très tôt, un petit cercle, une asymétrie centrale, et la vérité sur le « door slam ».",
      blocs: [
        {
          genre: "texte",
          titre: "Un filtre appliqué *très tôt*",
          paragraphes: [
            "Le critère de sélection de l'INFJ, c'est l'authenticité, et il l'applique dans les premières minutes. Il décide vite si une personne se présente telle qu'elle est. Le filtre est efficace, et il a un coût : il élimine aussi des gens simplement maladroits ou timides. La plupart du temps il juge bien ; parfois il passe à côté d'une affinité réelle sur un jugement de surface.",
          ],
        },
        {
          genre: "texte",
          titre: "Comment ses amitiés *naissent*",
          paragraphes: [
            "Presque jamais par proximité ni par répétition. Presque toujours par un moment où quelqu'un a dit une chose vraie sur lui-même, souvent une faiblesse. Là où d'autres se lient par une passion commune ou une habitude, l'INFJ se lie par une confidence. Beaucoup de ses amitiés ont une date de naissance identifiable : le jour où l'autre a été fragile devant lui.",
          ],
        },
        {
          genre: "texte",
          titre: "Ce qu'il apporte, et *qui est rare*",
          paragraphes: [
            "Une attention qui se souvient. Les prénoms des gens dont on lui a parlé une fois. Les dates qui comptent. Les sujets à ne pas aborder. Il anticipe le besoin avant la demande, et il ne juge pas la faiblesse, ce qui fait qu'on lui dit des choses qu'on ne dit nulle part ailleurs.",
          ],
        },
        {
          genre: "texte",
          titre: "Le petit cercle",
          paragraphes: [
            "Trois ou quatre personnes, gardées très longtemps. Contrairement à d'autres types au cercle réduit, il en souffre : la crainte de finir avec très peu d'amitiés véritables coexiste avec un refus de faire semblant pour élargir le cercle.",
          ],
        },
        {
          genre: "texte",
          titre: "L'asymétrie centrale",
          paragraphes: [
            "Ses amis lui confient tout. Il ne confie presque rien.",
            "Ce déséquilibre ne le gêne pas au début : la position de celui qui écoute donne de la valeur sans exposer. Puis un jour il constate qu'il connaît par cœur la vie de gens qui ne savent rien de la sienne. Et il en tire une conclusion fausse, on ne s'intéresse pas à moi, là où la conclusion juste serait : il n'a jamais donné de prise. Ses amis, quand on les interroge, disent la même chose : ils n'ont pas osé demander.",
          ],
        },
        {
          genre: "texte",
          titre: "Ce qui l'éloigne",
          paragraphes: [
            "L'inauthenticité. Les amitiés à sens unique, en sachant que c'est souvent lui qui a installé le sens. Le rôle de conseiller permanent, quand quelqu'un vient vider son sac et ne demande jamais comment il va. Et les gens qui répètent le même problème pendant des années : il supporte la souffrance, il supporte mal le refus de changer.",
          ],
        },
        {
          genre: "texte",
          titre: "Sa vraie difficulté : *il ne prévient pas qu'il part*",
          paragraphes: [
            "Quand une amitié cesse de lui convenir, il ne le dit pas. Il diminue. Il répond un peu plus tard, un peu plus court, décline deux invitations, puis trois. Dans sa tête, ces signaux constituent un avertissement loyal. Pour l'autre, il ne s'est rien passé, jusqu'au jour où il n'y a plus personne.",
            "Au passage : la légende du « door slam », cette rupture définitive qui serait la marque du type, mérite une correction. Une large enquête en ligne rapporte que les INFJ ne coupent pas les ponts plus souvent que les autres types. Le comportement existe ; rien n'en fait une exclusivité INFJ.",
            "Et il y a une chose que la légende ne documente jamais : le retour. Une part importante de ces éloignements se rouvre, un message deux ans plus tard, et la relation reprend là où elle s'était arrêtée.",
          ],
        },
      ],
    },
    {
      slug: "parentalite",
      titre: "Parentalité",
      titreSeo: "INFJ (Avocat) parent : parentalité",
      description:
        "L'INFJ parent : il élève l'enfant qu'il perçoit. Ses forces réelles, ses écueils sérieux, et ce dont ses enfants ont besoin.",
      blocs: [
        {
          genre: "texte",
          titre: "Le principe qui organise tout : *il élève l'enfant qu'il perçoit*",
          paragraphes: [
            "L'INFJ capte très tôt le tempérament de son enfant, ses fragilités, et ce qu'il croit être sa direction, et il ajuste tout dessus. C'est une force considérable, et c'est le lieu de son erreur principale : la perception peut être fausse, et elle n'est jamais discutée.",
            "Il a par ailleurs une vision explicite de ce qu'il veut transmettre : autonomie de pensée, ancrage moral, capacité à contribuer.",
          ],
        },
        {
          genre: "texte",
          titre: "Ses forces réelles",
          paragraphes: [
            "Il prend au sérieux la vie intérieure de son enfant, y compris à trois ans. Il ne minimise pas un chagrin, ne tourne pas une peur en dérision. Il tolère très bien l'enfant atypique, et défend sa différence à l'extérieur avec une fermeté qui surprend ceux qui le croyaient doux. Un enfant d'INFJ arrive souvent à l'âge adulte avec un vocabulaire émotionnel au-dessus de la moyenne.",
          ],
        },
        {
          genre: "liste",
          titre: "Ses écueils, et ils sont *sérieux*",
          items: [
            {
              titre: "La pression invisible.",
              texte:
                "Il projette ses valeurs sans mesurer la pression que cela produit, et attend parfois de l'enfant une exigence morale d'adulte. L'enfant perçoit qu'il doit devenir une certaine personne, pas seulement bien se comporter. Et cette attente ne se négocie pas, parce qu'elle n'est jamais énoncée.",
            },
            {
              titre: "Gouverner par la déception.",
              texte:
                "Poser un cadre suppose de créer du conflit, ce qu'il évite. Il gouverne donc par la déception plutôt que par la règle. Or la déception d'un parent qu'on adore est un instrument bien plus lourd qu'une punition.",
            },
            {
              titre: "La charge qui circule dans le mauvais sens.",
              texte:
                "Un enfant attentif apprend à surveiller l'humeur de son parent et à la réparer. C'est le mécanisme par lequel un parent aimant fabrique, sans le vouloir, un enfant hyper-responsable.",
            },
          ],
        },
        {
          genre: "texte",
          titre: "Ce dont ses enfants *ont besoin*",
          paragraphes: [
            "Un cadre explicite. La permission d'être ordinaire. Et la certitude, énoncée à voix haute, que l'état émotionnel de leur parent n'est pas de leur responsabilité. Cette phrase-là, dite une fois, vaut des années.",
          ],
        },
      ],
    },
    {
      slug: "carriere",
      titre: "Carrière",
      titreSeo: "INFJ (Avocat) : carrière et parcours",
      description:
        "La carrière de l'INFJ, sans métiers promis : le sens comme condition de fonctionnement, trois conditions d'affinité, l'argent et l'autorité.",
      blocs: [
        {
          genre: "texte",
          paragraphes: [
            "Une chose d'abord, parce qu'elle est vraie et que presque personne ne la dit : aucune donnée ne relie un type de personnalité à la réussite professionnelle, l'éditeur historique du MBTI le reconnaît lui-même. On ne trouvera donc ici aucun « métier fait pour vous ». Ce qu'on peut décrire honnêtement, ce sont des affinités : des environnements et des façons de travailler où ce type s'use moins et donne plus.",
          ],
        },
        {
          genre: "texte",
          titre: "Le sens n'est pas une préférence, c'est *une condition de fonctionnement*",
          paragraphes: [
            "C'est la différence la plus nette entre l'INFJ et la plupart des autres types. Un INFJ dans un travail qu'il juge vide ne s'ennuie pas : il se dégrade. La qualité baisse, la santé suit, et il en conclut qu'il n'est pas capable, alors que c'est le poste qui le vide.",
          ],
        },
        {
          genre: "texte",
          titre: "Où l'affinité est forte, *et pourquoi*",
          paragraphes: [
            "L'accompagnement et le conseil, l'enseignement, le soin, l'écriture et les métiers de la forme, la recherche en sciences humaines, le non-lucratif, les ressources humaines, le design centré sur l'usage, la liste circule partout, mais le point commun n'est pas le secteur. C'est trois conditions : un travail où l'effet sur une personne est observable, où la méthode reste libre, et où le discours de l'organisation correspond à ses pratiques.",
            "Un INFJ peut très bien s'épanouir dans un métier technique si ces trois conditions sont réunies, et se déliter dans une association si elles ne le sont pas.",
          ],
        },
        {
          genre: "texte",
          titre: "Le problème *du choix*",
          paragraphes: [
            "Trancher entre plusieurs voies également porteuses de sens lui est difficile ; les parcours hybrides sont fréquents, et un nombre notable finit à son compte, pour obtenir l'autonomie qu'il ne trouve pas ailleurs.",
          ],
        },
        {
          genre: "texte",
          titre: "Ce qui l'use",
          paragraphes: [
            "L'écart entre les valeurs affichées et les pratiques réelles, premier motif de départ chez lui. Le conflit permanent. La critique publique. Les protocoles rigides. Et surtout le travail émotionnel non comptabilisé : celui qui n'apparaît sur aucune fiche de poste, et qu'il assume par défaut.",
          ],
        },
        {
          genre: "texte",
          titre: "Le piège *propre au type*",
          paragraphes: [
            "Il choisit le métier le plus chargé de sens, donc souvent le plus exposé émotionnellement, avec les outils d'autoprotection les plus faibles. Quand il s'effondre, il n'attribue pas la cause à la structure du poste, mais à sa propre insuffisance. Deux conséquences : il tient trop longtemps, et il part en pensant avoir échoué alors qu'il a duré.",
          ],
        },
        {
          genre: "texte",
          titre: "L'argent",
          paragraphes: [
            "Un moyen, jamais un critère. L'argent sert à vivre conformément à ses valeurs et à acheter du temps, pas du statut. Conséquence pratique et coûteuse : il négocie mal, demande peu, et éprouve une gêne réelle à réclamer ce qui lui est dû, parce que parler d'argent lui semble contradictoire avec la nature de ce qu'il apporte. Il accepte souvent moins que ce qu'il vaut, puis en conçoit un ressentiment qu'il n'exprime pas. Corollaire moins visible : il prête sans réclamer, dépanne des proches et n'en parle à personne, y compris quand ça le met lui-même en difficulté.",
          ],
        },
        {
          genre: "texte",
          titre: "L'autorité",
          paragraphes: [
            "Il ne la juge ni sur le grade ni sur la compétence technique, mais sur la cohérence morale. Un supérieur brillant qui manque à sa parole perd toute légitimité à ses yeux, définitivement, et sans qu'il le dise. Inversement, il suivra quelqu'un de moins compétent que lui s'il le juge droit.",
          ],
        },
      ],
    },
    {
      slug: "habitudes-au-travail",
      titre: "Habitudes au travail",
      titreSeo: "INFJ (Avocat) au travail : habitudes et environnements",
      description:
        "L'INFJ comme subordonné, collègue et manager, les environnements qui l'éteignent ou le révèlent, et le signal d'alerte que tout manager devrait connaître.",
      blocs: [
        {
          genre: "texte",
          paragraphes: [
            "Le même INFJ ne produit pas les mêmes effets selon sa position. Trois angles, puis les environnements.",
          ],
        },
        {
          genre: "texte",
          titre: "Comme subordonné",
          paragraphes: [
            "Sa relation à son manager est le facteur numéro un de son niveau de travail, plus que le contenu du poste. Il a besoin d'être écouté, et de reconnaître chez son responsable une cohérence entre ce qu'il dit et ce qu'il fait. Il fonctionne bien à l'encouragement explicite, et se démoralise durablement sous la critique, en particulier une critique qu'il juge injuste, qui peut lui coûter des semaines. Il ne conteste pas frontalement : il exécute correctement, et se détache en silence.",
          ],
        },
        {
          genre: "texte",
          titre: "Comme collègue",
          paragraphes: [
            "Consciencieux, fiable, attaché à la qualité de ce qu'il rend. Il détecte les tensions de l'équipe avant tout le monde, et sait souvent quoi dire pour les défaire. Sa disponibilité est réelle, et régulièrement exploitée : les collègues prennent l'habitude de lui déléguer ce qui traîne, parce qu'il ne refuse pas. Quant à ses plages de retrait, elles sont presque toujours interprétées comme un signal négatif, alors qu'elles n'en sont pas un.",
          ],
        },
        {
          genre: "texte",
          titre: "Comme manager",
          paragraphes: [
            "Il refuse la hiérarchie de statut, et manage par la responsabilisation plutôt que par le contrôle. Il connaît les forces individuelles de son équipe et sait placer les gens là où ils sont bons, sa qualité managériale la plus solide. Son exigence est élevée, et il est intransigeant sur deux points : le manque de fiabilité, et le manquement éthique.",
            "Sa faiblesse de manager est coûteuse : il retarde les conversations difficiles. Un problème de personne peut durer un an, pendant lequel il compense lui-même. Quand il tranche enfin, la décision est nette et sans retour, et elle paraît brutale, parce que personne n'a vu l'année de patience qui l'a précédée.",
          ],
        },
        {
          genre: "texte",
          titre: "Les environnements",
          paragraphes: [
            "Ce qui l'éteint : les environnements transactionnels, où la seule question posée est le rendement ; la compétition interne agressive et la critique permanente ; les protocoles rigides ; l'absence d'autonomie de méthode ; les open spaces bruyants ; et par-dessus tout, l'incohérence morale affichée.",
            "Ce qui le révèle : un objectif dont l'effet humain est visible, une méthode libre, un supérieur cohérent, un rythme qui laisse des plages de retrait, et la possibilité de traiter la cause profonde plutôt que le symptôme.",
            "Le facteur le plus déterminant, rarement cité : la cohérence morale perçue de l'organisation, davantage que le secteur ou le salaire. Un INFJ reste dans un poste imparfait au sein d'une structure dont il respecte la conduite, et part d'un poste idéal dans une structure dont il a cessé de croire le discours, sans avoir dit pourquoi.",
            "La taille compte aussi. Dans les très grandes structures, le lien entre son travail et son effet sur quelqu'un devient invisible, et c'est ce lien qui le tient. Les petites lui conviennent mieux, tant que la proximité permanente ne supprime pas ses plages de retrait.",
            "Un signal d'alerte, utile aux managers : un INFJ qui devient parfaitement aimable et cesse de proposer des choses est déjà parti. La proposition spontanée est son marqueur d'investissement.",
          ],
        },
      ],
    },
    {
      slug: "sous-stress",
      titre: "Sous stress",
      titreSeo: "INFJ (Avocat) sous stress : les trois paliers",
      description:
        "L'INFJ sous stress : plus agréable d'abord, c'est le piège, puis le retrait analytique, puis la bascule. Ce qui aide, ce qui aggrave.",
      blocs: [
        {
          genre: "texte",
          paragraphes: [
            "Une précision d'honnêteté avant de commencer : ces portraits du stress par type sont mieux décrits que démontrés. Beaucoup d'INFJ s'y reconnaissent fortement, c'est d'ailleurs pour ça qu'on les écrit, mais rien ne prouve que ces réactions soient plus fréquentes chez eux que chez d'autres. À lire comme un miroir possible, pas comme une fatalité.",
          ],
        },
        {
          genre: "texte",
          titre: "Ce qui le fait *basculer*",
          paragraphes: [
            "Un conflit ouvert qu'il ne peut pas désamorcer. Le sentiment d'avoir été mal compris sur son intention, plus douloureux chez lui qu'une critique de son travail. Devoir être présent en continu, sans plage de retrait. Devoir agir contre une valeur. Devoir blesser quelqu'un.",
          ],
        },
        {
          genre: "texte",
          titre: "Stress léger : il devient *plus agréable*",
          paragraphes: [
            "C'est le signe le plus trompeur du type. Sous un stress débutant, l'INFJ ne devient pas irritable, il devient plus accommodant. Il sur-explique, s'excuse de choses dont il n'est pas responsable, prend en charge davantage. De l'extérieur, il est plus agréable que d'habitude. C'est précisément le symptôme.",
          ],
        },
        {
          genre: "texte",
          titre: "Stress installé : *le retrait analytique*",
          paragraphes: [
            "Il tourne seul. Il reconstruit la situation dans sa tête, y trouve une cohérence sombre, et s'y installe. Le canal du lien se coupe : engourdissement affectif, ironie inhabituelle, distance polie. Le ressentiment apparaît, dirigé contre ceux dont il s'occupait. C'est la phase où il prend des décisions définitives sans les annoncer.",
          ],
        },
        {
          genre: "texte",
          titre: "Débordement : *la bascule sensorielle*",
          paragraphes: [
            "Quand il craque, c'est par le corps et l'immédiat : excès inhabituels, dépenses, écrans, nourriture, ou à l'inverse une hypervigilance au moindre signal du corps. Ce qui frappe l'entourage, c'est le contraste avec quelqu'un d'ordinairement si mesuré.",
          ],
        },
        {
          genre: "texte",
          titre: "Vu de l'extérieur",
          paragraphes: [
            "La chaleur devient de la courtoisie. Les réponses restent gentilles et cessent d'être personnelles. Puis il n'est plus là, et personne ne peut dater le début.",
          ],
        },
        {
          genre: "texte",
          titre: "Ce qui aide, *ce qui aggrave*",
          paragraphes: [
            "Ce qui aide : du temps seul, sans que ce retrait soit interprété. Moins d'entrées sensorielles. Une activité physique. Et une question fermée plutôt qu'ouverte, « tu veux que je reste ou que je parte ? », parce qu'une question ouverte le renvoie à formuler ce qu'il ne sait justement pas formuler.",
            "Ce qui aggrave : insister. Lui dire qu'il est trop sensible. Le rassurer sans traiter le fond, il le perçoit comme une manœuvre.",
          ],
        },
      ],
    },
    {
      slug: "enfant",
      titre: "L'INFJ enfant",
      titreSeo: "L'enfant INFJ : le comprendre et l'accompagner",
      description:
        "L'INFJ enfant : l'enfant « facile » qui capte l'état du foyer et s'en croit responsable. Le risque de cette période, et ce dont il a besoin.",
      blocs: [
        {
          genre: "texte",
          paragraphes: [
            "Un préalable honnête : l'enfance par type est très peu documentée. Ce qui suit est la partie la plus cohérente de ce qui se rapporte régulièrement, à lire comme un portrait vraisemblable, pas comme un résultat établi.",
          ],
        },
        {
          genre: "texte",
          titre: "L'enfant « facile », et pourquoi c'est *le premier problème*",
          paragraphes: [
            "L'INFJ enfant est souvent décrit comme un enfant facile. Il pose tôt des questions sur la mort, l'injustice ou le sens, et pleure devant des choses que les autres enfants ne remarquent pas. Mais « facile » est exactement le mot qui piège la suite.",
          ],
        },
        {
          genre: "texte",
          titre: "Il capte l'état du foyer, et *s'en croit responsable*",
          paragraphes: [
            "C'est la régularité la plus constante rapportée sur l'enfance de ce type. Quand ses parents se disputent, il ne se demande pas ce qui va se passer : il se demande ce qu'il peut faire. Beaucoup d'adultes INFJ décrivent avoir joué très jeune un rôle de médiateur, ou de confident d'un parent.",
          ],
        },
        {
          genre: "texte",
          titre: "Le risque de *cette période*",
          paragraphes: [
            "Qu'il soit valorisé exclusivement pour sa gentillesse et sa maturité. Un enfant félicité d'être facile apprend que sa valeur tient à ce qu'il ne dérange pas, et construit un adulte incapable de demander. C'est le point le plus important de cette page.",
          ],
        },
        {
          genre: "texte",
          titre: "Il est seul *autrement qu'un autre introverti*",
          paragraphes: [
            "Il a besoin de solitude pour se décharger, pas pour se reposer. Après l'école, ce qu'il évacue n'est pas le bruit : c'est ce qu'il a capté des autres toute la journée.",
          ],
        },
        {
          genre: "texte",
          titre: "Ce dont cet enfant *a besoin*",
          paragraphes: [
            "Qu'on lui dise que les tensions des adultes ne le concernent pas. Qu'on l'autorise à être en colère, et à décevoir. Qu'on ne récompense pas seulement sa docilité. Et qu'on prenne ses questions difficiles au sérieux.",
            "Une chose encore, qui éclaire l'adulte : les INFJ décrivent souvent l'adolescence et le début de la vingtaine comme la période la plus dure de leur vie. L'explication la plus tenable est simple : la capacité de lecture est déjà là, quand les limites, elles, ne le sont pas encore.",
          ],
        },
      ],
    },
    {
      slug: "compatibilites",
      titre: "Compatibilités",
      titreSeo: "Compatibilités de l'INFJ (Avocat) : ce qui allège, ce qui frotte",
      description:
        "La compatibilité amoureuse de l'INFJ, sans tableau bidon : les mécanismes qui allègent la relation, les frictions prévisibles, et le cas de deux INFJ.",
      blocs: [
        {
          genre: "texte",
          titre: "Le cadre, *dit franchement*",
          paragraphes: [
            "Personne ne peut promettre qu'un couple fonctionnera sur la base de deux codes à quatre lettres, et les tableaux de compatibilité par paires qu'on trouve ailleurs n'ont aucune base. Côté vie amoureuse, il n'existe tout simplement pas d'étude sérieuse, ni dans un sens ni dans l'autre. Ce qu'on peut faire d'honnête, c'est décrire des mécanismes : ce qui, chez un partenaire, allège ou alourdit le fonctionnement propre de l'INFJ. C'est le parti pris de cette page.",
          ],
        },
        {
          genre: "liste",
          titre: "Ce qui allège la relation, *et pourquoi*",
          items: [
            {
              titre: "Un partenaire qui dit explicitement ce qu'il veut.",
              texte:
                "Cela retire à l'INFJ la charge de deviner, une charge qu'il assume par défaut et qui l'épuise sans qu'il s'en rende compte.",
            },
            {
              titre: "Un partenaire qui nomme les désaccords tôt.",
              texte:
                "Le conflit cesse d'être un événement. C'est exactement ce qui casse son mécanisme d'accumulation : le problème perçu, tu, compensé, puis présenté six mois plus tard avec une conclusion déjà prise.",
            },
            {
              titre: "Un partenaire qui pose des questions sur lui, et insiste un peu.",
              texte:
                "C'est la seule manière connue de faire parler quelqu'un qui ne demandera jamais l'attention.",
            },
          ],
        },
        {
          genre: "liste",
          titre: "Les frictions *prévisibles*",
          items: [
            {
              titre: "Avec les profils très directs et critiques.",
              texte:
                "La remarque technique atterrit sur la valeur : l'INFJ encaisse une blessure sans rapport avec l'intention émise. Il ne le dit pas, il se retire, et l'autre ne comprend pas ce qui s'est passé.",
            },
            {
              titre: "Avec les profils très ancrés dans le concret.",
              texte:
                "Il se sent seul en couple : sa vie intérieure occupe l'essentiel de son expérience, et elle n'intéresse pas l'autre, ce qu'il interprète comme un désintérêt pour lui.",
            },
          ],
        },
        {
          genre: "texte",
          titre: "Le cas de *deux INFJ*",
          paragraphes: [
            "Compréhension immédiate, très peu de malentendus de surface. Et un risque propre : personne ne dit jamais la chose désagréable. Deux personnes qui évitent le conflit par égard mutuel construisent une relation sans friction et sans vérité, qui tient longtemps, puis casse net.",
          ],
        },
        {
          genre: "texte",
          titre: "Le malentendu *structurel*",
          paragraphes: [
            "L'INFJ est souvent attiré par des personnes en difficulté, parce que la relation d'aide est le terrain où il est le plus à l'aise. Or c'est aussi celui où l'asymétrie est maximale, donc celui où il sera le moins connu. Il choisit sans le savoir la configuration qui reproduit son problème.",
          ],
        },
        {
          genre: "texte",
          titre: "Ce qui compte *davantage que le type de l'autre*",
          paragraphes: [
            "Que le partenaire ne prenne pas le retrait pour un rejet. Et qu'il sache dire « tu ne me dois rien » à quelqu'un qui a besoin de l'entendre.",
          ],
        },
      ],
    },
    {
      slug: "conclusion",
      titre: "Conclusion",
      titreSeo: "INFJ (Avocat) : conclusion, grandir sans se renier",
      description:
        "Le fil du portrait INFJ, l'inquiétude qui le caractérise, et ce que grandir veut dire pour ce type : cinq leviers concrets.",
      blocs: [
        {
          genre: "texte",
          titre: "Le fil, *pour finir*",
          paragraphes: [
            "Tout ce portrait tient sur deux mécanismes. Le premier : chez l'INFJ, percevoir un besoin et s'en sentir responsable sont un seul mouvement. Le second : ce qu'il montre est calibré sur l'autre, si bien que le type qui lit le mieux les autres est aussi celui qu'on lit le plus mal. Ses forces viennent de là. Ses difficultés aussi, et elles s'enchaînent : il donne sans qu'on demande, ne dit pas ce que ça coûte, accumule, puis rompt d'un coup.",
          ],
        },
        {
          genre: "texte",
          titre: "L'inquiétude qui *le caractérise*",
          paragraphes: [
            "S'il fallait retenir une seule angoisse propre à ce type : la peur persistante de ne pas faire un usage suffisant de sa vie. Sa réussite, il la définit par l'effet produit sur les gens, un effet qui ne se mesure pas et ne se manifeste qu'après des années. Il n'a donc jamais de preuve d'avoir réussi, et cette inquiétude est indépendante de sa réussite objective.",
          ],
        },
        {
          genre: "liste",
          titre: "Ce que *grandir* veut dire pour ce type",
          intro:
            "Pas devenir moins sensible. Pas non plus « poser ses limites », la formule est aussi répandue qu'inopérante chez lui. Grandir, pour un INFJ, c'est rendre visible ce qui se passe en lui, à mesure que ça se passe, au lieu d'un coup, à la fin. Cinq leviers concrets :",
          items: [
            {
              titre: "Séparer ce qu'il ressent de ce qu'il capte.",
              texte:
                "Devant une émotion, poser la question : est-ce que c'est la mienne ? Beaucoup découvrent tard qu'une part de ce qu'ils portaient ne leur appartenait pas.",
            },
            {
              titre: "Traiter l'intuition comme une hypothèse.",
              texte:
                "La question utile n'est pas « pourquoi ai-je raison », mais « qu'est-ce que j'observerais si j'avais tort ». C'est le seul contrepoids connu à sa certitude auto-scellante.",
            },
            {
              titre: "Dire le désaccord tôt, et petit.",
              texte:
                "Un désaccord de dix secondes exprimé le jour même remplace une rupture de six mois. C'est le maillon faible de la chaîne, celui qu'il faut casser.",
            },
            {
              titre: "Habiter le présent.",
              texte:
                "Le seul domaine où il ne peut pas progresser par la compréhension. Un INFJ qui court, ou qui travaille de ses mains, a trouvé un accès, pas un loisir.",
            },
            {
              titre: "Recevoir.",
              texte:
                "Accepter de l'aide suppose de renoncer à l'asymétrie confortable de celui qui donne. Cela transforme des relations où il donnait en relations où il existe.",
            },
          ],
        },
        {
          genre: "texte",
          titre: "Ce qui déclenche *le mouvement*",
          paragraphes: [
            "Presque toujours : un épuisement qu'il ne peut pas attribuer aux autres, ou une rupture dont il découvre qu'il en est l'auteur. Le moment charnière, c'est celui où il constate qu'il avait raison, et que son silence a quand même produit la rupture.",
            "Les pièges du parcours : transformer sa croissance en mission. Confondre poser une limite et devenir dur. Et le piège spécifique au type : occuper la place de celui qui aide, pour n'avoir jamais à être celui qu'on regarde.",
            "On reconnaît un INFJ qui a fait le chemin à un détail : il annonce qu'il s'éloigne, au lieu de disparaître.",
          ],
        },
        {
          genre: "texte",
          titre: "Une dernière chose",
          paragraphes: [
            "Ce portrait décrit un type, les grandes lignes que partagent ceux qui s'y reconnaissent. Il ne dit pas où toi, tu te situes sur chaque spectre, ni avec quelle intensité, ni laquelle des trois variantes du type te correspond. Ça, c'est ce que mesure le test.",
          ],
        },
      ],
    },
  ],
};

// -----------------------------------------------------------------------------
// ENFP — l'Inspirateur
// -----------------------------------------------------------------------------

const ENFP: ContenuType = {
  intro: {
    slug: "",
    titre: "Introduction",
    titreSeo: "ENFP (Inspirateur) : le portrait complet",
    description:
      "Le type ENFP : tout ce qu'il exprime est sincère, et tout est reçu comme un engagement. Un portrait honnête, loin du cliché du papillon.",
    exergue:
      "Tout ce qu'il exprime est entièrement sincère. Et tout ce qu'il exprime est reçu comme un engagement.",
    blocs: [
      {
        genre: "texte",
        paragraphes: [
          "ENFP, c'est l'un des seize types de personnalité : Extraversion, iNtuition, Sentiment, Perception. Un des types les plus fréquents, autour de 8 % de la population, avec probablement plus de femmes que d'hommes, et pourtant l'un des plus mal lus. Ce qu'on lui reproche le plus n'est presque jamais ce qui se passe réellement. C'est tout le sujet de ce portrait.",
        ],
      },
      {
        genre: "texte",
        titre: "L'enthousiasme comme promesse *involontaire*",
        paragraphes: [
          "Ce qui définit l'ENFP, ce n'est ni la gaieté ni la créativité, contrairement à sa réputation. C'est une capacité rare et coûteuse : rendre un possible tellement présent qu'il devient réel pour celui qui l'écoute. Une idée qu'il expose paraît faisable. Une personne qu'il regarde se sent capable. C'est le mécanisme par lequel il inspire, et c'est exactement le même par lequel il déçoit.",
          "Car voici le malentendu qui organise sa vie entière : ce qu'il exprime est entièrement sincère au moment où il l'exprime, et n'engage rien. Pour lui, l'enthousiasme est un état, il traverse, il éclaire, il passe. Pour son entourage, l'enthousiasme est un signal d'intention : on ne dit pas qu'on va faire une chose sans avoir l'intention de la faire. Les deux lectures sont légitimes, elles ne sont pas compatibles, et personne ne les formule. C'est la source de la quasi-totalité des reproches qu'il reçoit.",
        ],
      },
      {
        genre: "texte",
        titre: "On le croit influençable, il est *innégociable*",
        paragraphes: [
          "Deuxième paradoxe : le type le plus visiblement extraverti de sa famille décide selon un critère strictement privé et non discutable. Il consulte tout le monde, et ne suit personne. On le croit influençable parce qu'il est ouvert ; il est en réalité l'un des types les moins négociables sur le fond, avec cette particularité qu'il ne le signale jamais à l'avance.",
        ],
      },
      {
        genre: "texte",
        titre: "La légèreté est *une erreur de lecture*",
        paragraphes: [
          "Troisième paradoxe, le moins connu : sa réputation de légèreté est une erreur de lecture. L'ENFP porte une insatisfaction de fond, un écart permanent entre ce qui est et ce qu'il voit possible, et une agitation intérieure qui persiste sous l'optimisme affiché. L'écart entre ce qu'il montre et ce qu'il vit est probablement l'un des plus grands des seize types, et l'entourage le découvre en général très tard, souvent au pire moment.",
        ],
      },
      {
        genre: "tableau",
        titre: "Ce qu'il vit, *ce qu'on voit*",
        intro: "Le même comportement, vu des deux côtés :",
        colonnes: ["Ce qu'il vit", "Ce que les autres voient"],
        lignes: [
          ["Je suis enthousiaste maintenant", "Il a promis quelque chose"],
          ["Je m'intéresse sincèrement à toi", "Il est comme ça avec tout le monde"],
          ["J'ai besoin de nouveauté", "Il se lasse de moi"],
          ["Je n'ai pas voulu te blesser en disant non", "Il a dit oui puis il a disparu"],
          ["Je tiens énormément à cette amitié", "Il n'a pas donné de nouvelles depuis six mois"],
          ["Je vais bien, je fais plein de choses", "Il est en train de fuir quelque chose"],
        ],
        sortie: [
          "Il communique par intensité ; son entourage lit des engagements. Tout ce qu'il exprime est pris pour plus que ce que ça l'engage, et il ne peut pas baisser le volume sans avoir l'impression de mentir. Il se croit fiable, parce que sa loyauté affective ne bouge pas ; il est perçu comme imprévisible, parce que ses actes bougent. L'écart vient du même endroit : lui évalue son ressenti, les autres évaluent sa constance.",
        ],
      },
      {
        genre: "texte",
        titre: "Trois *légendes* à remettre à leur place",
        paragraphes: [
          "« C'est un papillon, il est superficiel. » Faux dans le mécanisme : l'intensité est réelle, et parfois extrême, c'est la durée qui ne suit pas. Reprocher un manque de profondeur à quelqu'un qui a un problème de continuité, c'est se tromper de diagnostic, et rendre la correction impossible.",
          "« Il ne finit jamais rien. » Inexact tel quel. Il finit ce qui est court, ce qui reste stimulant, et surtout ce dont quelqu'un d'autre dépend. L'engagement envers une personne est chez lui un moteur plus puissant que l'engagement envers un objectif.",
          "« ENFP, c'est un TDAH qui s'ignore. » Non, et cette confusion mérite un démenti clair : un profil de personnalité décrit des préférences, pas un fonctionnement neurologique, et aucune donnée ne relie un type à un diagnostic. La ressemblance de surface ne dit rien du mécanisme, et l'erreur peut détourner quelqu'un d'une vraie évaluation.",
        ],
      },
    ],
  },
  pages: [
    {
      slug: "forces-et-faiblesses",
      titre: "Forces et faiblesses",
      titreSeo: "ENFP (Inspirateur) : forces et faiblesses",
      description:
        "Les forces de l'ENFP et ce qu'elles coûtent, et ses défauts, qui ne sont pas des traits mais deux instants du même mouvement.",
      blocs: [
        {
          genre: "liste",
          titre: "Les forces, et ce qu'elles *coûtent*",
          intro:
            "Une force sans limite, c'est un argument de vente, pas une observation. Chaque force de l'ENFP a un revers, et c'est le même élan qui produit les deux.",
          items: [
            {
              titre: "Un enthousiasme contagieux.",
              texte:
                "Il ne convainc pas, il transmet un état. Une équipe démotivée redémarre en sa présence, sans qu'aucun argument n'ait été échangé.",
              revers: "Ce qu'il transmet engage les autres au-delà de ce qu'il tiendra lui-même.",
            },
            {
              titre: "Lire le potentiel des gens.",
              texte:
                "Il voit ce que quelqu'un pourrait devenir, et le lui dit avec assez de précision pour que ce soit crédible. Beaucoup de gens datent une bifurcation de leur vie d'une phrase dite par un ENFP.",
              revers:
                "Il s'attache à la version potentielle, et supporte mal la version actuelle.",
            },
            {
              titre: "Percevoir les états d'autrui.",
              texte: "Il détecte un changement d'humeur avant qu'il soit exprimé.",
              revers:
                "Il conclut sans vérifier, et agit sur son interprétation comme sur un fait.",
            },
            {
              titre: "Produire des idées.",
              texte:
                "Volume, originalité, capacité à relier des domaines sans rapport entre eux.",
              revers:
                "Aucun tri intégré : le lot contient le meilleur et le pire, présentés avec la même conviction.",
            },
            {
              titre: "S'adapter.",
              texte:
                "Un plan qui s'effondre ne le déstabilise pas : il en fabrique un autre pendant que les autres constatent les dégâts.",
              revers:
                "Il refuse parfois de s'engager uniquement pour préserver l'option de changer d'avis.",
            },
            {
              titre: "Être authentique.",
              texte:
                "Il ne joue pas de rôle, et supporte très mal ceux qui en jouent. Ce que vous voyez est ce qu'il y a.",
              revers:
                "Il confond régulièrement authenticité et absence de filtre, et dit des choses vraies à des moments où elles ne servent personne.",
            },
            {
              titre: "Mettre à l'aise.",
              texte: "Il fait parler les réservés, et il y prend un plaisir réel.",
              revers:
                "Il offre la même chaleur à tout le monde, ce qui dévalue le signal pour ses proches, qui ne savent plus ce qui leur est destiné.",
            },
            {
              titre: "Communiquer.",
              texte:
                "Il rend intéressant ce qui ne l'est pas, et parle à des publics très différents sans changer de registre.",
              revers:
                "Il emporte l'adhésion par l'énergie, y compris quand il a tort, et personne ne le contredit sur le moment.",
            },
            {
              titre: "Démarrer.",
              texte:
                "Il lance. Là où d'autres évaluent, il a déjà commencé, réuni trois personnes et trouvé un nom.",
              revers:
                "La phase deux, celle qui ne contient plus de nouveauté, n'est pas son terrain, et il le découvre à chaque fois.",
            },
            {
              titre: "Apprendre dans toutes les directions.",
              texte: "Il apprend vite, et sur des terrains très variés.",
              revers: "Niveau intermédiaire partout, maîtrise rare, et le regret qui va avec.",
            },
            {
              titre: "Alterner profondeur et légèreté.",
              texte:
                "Il passe d'une conversation grave à une plaisanterie sans que ce soit une fuite. Cette souplesse de registre est rare.",
              revers: "Elle est lue comme un manque de sérieux par ceux qui n'ont qu'un registre.",
            },
          ],
        },
        {
          genre: "texte",
          titre: "Les défauts : deux instants du *même mouvement*",
          paragraphes: [
            "Chez l'ENFP, la force et le défaut ne sont pas deux lectures du même trait : ce sont deux instants du même mouvement. Le même élan, mesuré au démarrage, s'appelle enthousiasme ; mesuré trois mois plus tard, il s'appelle abandon. Il n'y a rien à retirer entre les deux, seulement du temps. C'est ce qui rend ses défauts difficiles à corriger, et ses excuses inaudibles : il n'a pas menti, il a duré moins longtemps que sa parole.",
          ],
        },
        {
          genre: "liste",
          items: [
            {
              titre: "La promesse involontaire.",
              texte:
                "Le défaut central, dont dépendent presque tous les autres reproches. Il dit « il faut absolument qu'on monte ce projet », le pense entièrement, et n'y repense pas. Personne n'a menti ; personne n'a compris la même chose.",
            },
            {
              titre: "Le oui donné avant l'évaluation.",
              texte:
                "L'accord part avec l'élan, le calcul du coût arrive après. Il s'engage sincèrement sur ce qu'il ne pourra pas porter, puis reste dedans par gêne de se dédire.",
            },
            {
              titre: "La dispersion.",
              texte:
                "Plusieurs chantiers ouverts, aucun refermé. Le coût réel n'est pas la perte de temps : c'est la perte de crédit.",
            },
            {
              titre: "La difficulté à choisir.",
              texte:
                "Décider ferme des portes, et chaque porte fermée est ressentie comme une amputation. D'où des décisions reportées jusqu'à ce que la circonstance décide à sa place.",
            },
            {
              titre: "L'hypersensibilité à la critique.",
              texte:
                "Une remarque sur un travail est reçue comme un jugement sur la personne, parce que le travail portait ses valeurs. La réaction visible est souvent minimale ; l'effet interne, considérable et durable.",
            },
            {
              titre: "Le crédit ouvert sur un potentiel.",
              texte:
                "Il évalue quelqu'un sur ce qu'il pourrait devenir plutôt que sur ce qu'il a fait. Le même mécanisme le reprend plusieurs fois, parfois avec la même personne.",
            },
            {
              titre: "Le coût de la désapprobation.",
              texte:
                "Être mal vu lui est difficilement tenable, au point de céder du terrain sur ce à quoi il tient pour rétablir l'image. La transaction se paie en mésestime de soi.",
            },
            {
              titre: "L'agitation de fond.",
              texte:
                "Le réel reste en permanence en dessous de ce qu'il aperçoit de possible. Cet écart entretient une inquiétude que rien ne trahit, et qu'il attribue à sa situation du moment, jamais à son fonctionnement.",
            },
            {
              titre: "Le concret qui n'ouvre rien.",
              texte:
                "Papiers, échéances, comptes. Ce n'est pas de la négligence morale : ces tâches ne débouchent sur aucune possibilité nouvelle, donc rien en lui ne vient les prendre en charge.",
            },
            {
              titre: "La sur-interprétation.",
              texte:
                "Il construit un scénario complet à partir d'un message sec, et y répond, plutôt que de poser la question.",
            },
            {
              titre: "L'évitement du conflit, puis la rupture nette.",
              texte:
                "Il contourne, arrondit, tait, tant que c'est possible. Quand sa décision intérieure est prise, il coupe, et l'entourage ne voit qu'un coup de tête après des années de facilité apparente.",
            },
            {
              titre: "La passivité indirecte.",
              texte:
                "Ne disant pas non, il ralentit, oublie, s'absente. L'effet ressemble à de la mauvaise foi, et n'en est pas.",
            },
            {
              titre: "La confusion entre intensité et profondeur.",
              texte:
                "Trois heures de conversation bouleversante ne font pas un lien solide, mais elles en donnent exactement la sensation. Il en tire des conclusions que rien ne soutient encore.",
            },
          ],
        },
      ],
    },
    {
      slug: "relations-amoureuses",
      titre: "Relations amoureuses",
      titreSeo: "ENFP (Inspirateur) en amour : relations amoureuses",
      description:
        "Comment l'ENFP aime : des débuts éclatants, l'usure mal interprétée, le besoin d'être choisi à nouveau, et pourquoi sa rupture n'est jamais un coup de tête.",
      blocs: [
        {
          genre: "texte",
          titre: "Ce qu'il cherche",
          paragraphes: [
            "Être connu entièrement, et accepté après. La formule compte : ce n'est pas être accepté malgré ce qu'on découvrira, c'est être vu jusqu'au fond, puis gardé. Il cherche aussi une réciprocité d'intensité, critère plus exigeant qu'il n'y paraît, qui élimine beaucoup de partenaires par ailleurs solides.",
          ],
        },
        {
          genre: "texte",
          titre: "La rencontre est son terrain fort, et *c'est le problème*",
          paragraphes: [
            "Le début amoureux mobilise exactement ce qu'il fait de mieux : découverte, projection, intensité, absence de routine. Il tombe amoureux vite et donne beaucoup d'emblée. Sa difficulté n'est jamais l'entrée dans la relation : c'est le passage de la découverte à l'entretien.",
          ],
        },
        {
          genre: "texte",
          titre: "Le mécanisme de l'usure, et *il est précis*",
          paragraphes: [
            "Quand il n'y a plus rien de nouveau à découvrir chez l'autre, l'énergie chute. Ce fait, qui ne dit rien de la qualité de la relation, est interprété par lui comme un verdict sur la relation : si je ressens moins, c'est que ce n'était pas la bonne. C'est la principale cause de ruptures évitables chez ce type, et elle repose sur une erreur d'attribution, pas sur un manque d'amour.",
          ],
        },
        {
          genre: "texte",
          titre: "Le besoin qu'il *ne demandera pas*",
          paragraphes: [
            "Être choisi à nouveau, régulièrement, à voix haute. La stabilité tranquille, que d'autres types vivent comme la preuve suprême de l'amour, il la vit comme une extinction progressive. Et il ne le demandera pas, parce que le demander lui semblerait annuler la valeur de la réponse.",
            "Ce qui le blesse le plus : qu'on doute de la sincérité de son enthousiasme ; qu'on le traite de léger ou d'immature ; qu'on ramène une conversation de fond à un problème d'organisation ; et le retrait de l'autre, qu'il lit presque toujours comme un retrait affectif.",
          ],
        },
        {
          genre: "texte",
          titre: "Les deux conflits *typiques*",
          paragraphes: [
            "Le premier : le partenaire demande de l'espace. L'ENFP lit un abandon, augmente la présence, demande des comptes affectueux, cherche à réparer. L'autre s'éloigne davantage pour respirer. Chaque tour de boucle confirme la crainte initiale. Personne n'a tort, et sans traduction, la scène se rejoue jusqu'à l'épuisement.",
            "Le second, plus banal et plus destructeur : la logistique du quotidien. Il n'entend pas « qui s'occupe des impôts » comme une question d'intendance, mais comme une information sur ce qu'est devenue la relation. D'où des disputes disproportionnées sur des sujets minuscules, qui déconcertent l'autre, parce qu'il répond au sujet, et pas à la question posée dessous.",
          ],
        },
        {
          genre: "texte",
          titre: "La rupture ENFP",
          paragraphes: [
            "Longtemps évitée, arrondie, tue. Puis nette, argumentée, sans retour, parce que sa décision intérieure a tranché en silence des mois plus tôt. De l'extérieur, c'est un coup de tête. C'est l'inverse exact.",
          ],
        },
      ],
    },
    {
      slug: "amities",
      titre: "Amitiés",
      titreSeo: "ENFP (Inspirateur) en amitié",
      description:
        "Les amitiés de l'ENFP : une chaleur offerte à tous, une hiérarchie invisible, l'intermittence prise pour un désamour, et la dette jamais formulée.",
      blocs: [
        {
          genre: "texte",
          titre: "Il ne choisit presque pas ses amis, *il les accueille*",
          paragraphes: [
            "Le seuil d'entrée est extrêmement bas : une conversation qui accroche, une soirée, une file d'attente. Il se fait des amis partout, sans stratégie et sans effort apparent. En dix ans, cela produit un réseau d'une largeur inhabituelle, où figurent des gens que rien d'autre ne relie.",
            "Ses amitiés naissent presque toujours d'une conversation longue et inattendue, souvent tardive, souvent avec quelqu'un qu'il vient de rencontrer. Beaucoup d'amitiés d'ENFP ont une nuit de naissance identifiable. La proximité et la répétition, qui fabriquent l'essentiel des amitiés ordinaires, jouent chez lui un rôle mineur.",
          ],
        },
        {
          genre: "texte",
          titre: "Ce qu'il apporte, et qui est rare : *l'attention totale*",
          paragraphes: [
            "Quand il est là, il est entièrement là. Il pose des questions que personne ne pose, retient ce qu'on lui a dit, traite ce que vous racontez comme le sujet le plus intéressant de la journée. Il a un goût particulier pour les gens réservés, et prend un plaisir sincère à les faire s'ouvrir. Beaucoup de personnes discrètes ont eu, une fois, un ami ENFP qui les a sorties de leur silence, et s'en souviennent toute leur vie.",
            "Il donne largement, sur deux registres : ce qui se compte, de l'argent prêté sans échéance, un samedi entier à repeindre l'appartement de quelqu'un, et ce qui ne se compte pas, l'attention et l'élan qu'il met à disposition tant qu'il est là. Sans arrière-pensée au moment où il le fait.",
          ],
        },
        {
          genre: "texte",
          titre: "La hiérarchie *invisible*",
          paragraphes: [
            "Il a énormément de gens, et très peu d'amis, et l'écart n'est pas lisible de l'extérieur, parce qu'il offre à tous le même niveau de chaleur. Résultat : beaucoup de gens se croient dans son cercle intérieur et n'y sont pas, et ses vrais proches ne se sentent pas distingués. Le signal qu'il émet est excellent, et il n'est pas discriminant. Deux déceptions symétriques, dont il n'est jamais informé.",
          ],
        },
        {
          genre: "texte",
          titre: "Sa vraie difficulté : *l'intermittence*",
          paragraphes: [
            "L'attention est totale quand elle est là, et absente quand elle n'est pas là. Ce n'est pas un désamour, c'est un mode d'allocation, et il s'estime parfaitement constant dans son affection, ce qui est vrai. Mais l'écart entre les deux états est si grand que la période creuse est lue comme un retrait délibéré. Un ami qui a connu l'intensité maximale interprète six mois de silence autrement que quelqu'un à qui on n'a jamais rien promis.",
          ],
        },
        {
          genre: "texte",
          titre: "La dette *jamais formulée*",
          paragraphes: [
            "Il donne spontanément, donc sans négocier. Il suppose que la réciprocité va de soi, parce qu'elle irait de soi pour lui. Et quand elle ne vient pas, il ne peut ni la réclamer, puisqu'il n'a rien demandé, ni l'oublier. Beaucoup d'amitiés d'ENFP meurent de cette dette jamais formulée.",
            "S'y ajoute un soupçon qui l'use : de son côté à lui, l'attachement pèse-t-il plus lourd que de l'autre côté ? L'erreur de mesure est identifiable : il compare l'intensité qu'il donne à celle qu'il reçoit, alors que son niveau d'intensité est son fonctionnement de base, pas un indicateur d'attachement. Il compare deux échelles différentes, et conclut à un déficit d'amour.",
          ],
        },
        {
          genre: "texte",
          titre: "Ce qui le fait *s'éloigner*",
          paragraphes: [
            "L'ironie systématique, qui rend impossible de dire quelque chose sincèrement. Les gens qui rabaissent les autres devant lui. Les groupes où il faut tenir un rôle. Et surtout ceux qui lui reprochent son enthousiasme, ce qui touche exactement là où ça fait le plus mal, puisque c'est ce qu'il a de meilleur, et ce dont il a déjà honte.",
            "Il ne rompt presque jamais une amitié : il l'espace. Le lien meurt de dilution, sans conflit, sans explication, et il en reste une nostalgie diffuse plutôt qu'une décision. S'il croise la personne cinq ans plus tard, il sera sincèrement chaleureux. Et il ne reprendra pas contact ensuite.",
          ],
        },
      ],
    },
    {
      slug: "parentalite",
      titre: "Parentalité",
      titreSeo: "ENFP (Inspirateur) parent : parentalité",
      description:
        "L'ENFP parent : il découvre son enfant au lieu de le formater. Ses forces réelles, le cycle de la discipline, et ce dont ses enfants ont besoin.",
      blocs: [
        {
          genre: "texte",
          titre: "Le principe qui organise tout : une personne à découvrir, *pas un projet à former*",
          paragraphes: [
            "L'ENFP s'intéresse sincèrement à qui son enfant est en train de devenir. Il ne cherche pas à produire un exemplaire conforme, et il tolère très bien la différence. C'est un cadeau réel, et c'est aussi la source de ses difficultés, parce qu'un enfant a besoin d'être découvert et encadré, et que la seconde partie ne relève pas du même mouvement.",
          ],
        },
        {
          genre: "texte",
          titre: "Ses forces réelles",
          paragraphes: [
            "Il accueille les émotions sans chercher à les corriger. Ce qu'il valorise, c'est ce que l'enfant invente et ce qu'il ose dire, là où d'autres parents valoriseraient d'abord qu'il rentre dans le rang. Il rend le quotidien intéressant : un trajet devient une histoire, une contrainte devient un jeu. Il répond aux questions difficiles avec sérieux et sans dramatiser. Et il transmet, sans le formuler, l'idée qu'on a le droit d'être soi-même. C'est une base solide.",
          ],
        },
        {
          genre: "liste",
          titre: "Ses écueils",
          items: [
            {
              titre: "La discipline en cycle.",
              texte:
                "Poser une règle et la tenir lui coûte, parce qu'il l'éprouve comme une menace sur la qualité du lien. Le résultat n'est pas une éducation permissive, ce serait plus simple. C'est un cycle : peu de cadre, tolérance prolongée, accumulation, puis explosion disproportionnée, puis culpabilité, puis relâchement complet pour réparer. L'enfant n'apprend pas la règle : il apprend à prévoir l'état de son parent.",
            },
            {
              titre: "L'irrégularité de présence.",
              texte:
                "Trois semaines d'implication intense, projets, sorties, disponibilité totale, puis une période absorbée ailleurs, où il est présent physiquement et absent en attention. L'enfant apprend très tôt à ne pas compter sur les annonces. Et il l'apprend sans amertume, ce qui est plus triste que le contraire.",
            },
            {
              titre: "L'autonomie prise personnellement.",
              texte:
                "L'adolescent qui s'éloigne, qui préfère ses amis, qui ferme sa porte : tout cela est normal et attendu, et il le vit comme un verdict sur la relation qu'ils avaient. Il peut alors demander à l'enfant de le rassurer, ce qui inverse les rôles.",
            },
            {
              titre: "Le partage de ses états.",
              texte:
                "Il est transparent, donc l'enfant sait quand son parent va mal, très tôt et très précisément. Beaucoup d'enfants d'ENFP développent une vigilance affective qui les rend adultes trop vite, et prennent en charge l'humeur de la maison.",
            },
          ],
        },
        {
          genre: "texte",
          titre: "Ce dont ses enfants *ont besoin*",
          paragraphes: [
            "De la prévisibilité, pas davantage d'amour : ils en ont déjà beaucoup. Qu'il tienne une règle ennuyeuse jusqu'au bout, une seule, pour la démonstration. Qu'il distingue clairement le comportement et la personne quand il gronde, parce que sa colère rare est intense, et qu'un enfant sensible l'entendra comme un jugement global. Et qu'il ne fasse pas de son enfant son confident, même quand la conversation est belle, et que l'enfant a l'air d'aimer ça.",
          ],
        },
      ],
    },
    {
      slug: "carriere",
      titre: "Carrière",
      titreSeo: "ENFP (Inspirateur) : carrière et parcours",
      description:
        "La carrière de l'ENFP, sans métiers promis : un début éclatant, un deuxième acte difficile, le piège du travail indépendant, et son rapport à l'argent.",
      blocs: [
        {
          genre: "texte",
          paragraphes: [
            "Une chose d'abord, parce qu'elle est vraie et que presque personne ne la dit : aucune donnée ne relie un type de personnalité à la réussite professionnelle, l'éditeur historique du MBTI le reconnaît lui-même. On ne trouvera donc ici aucun « métier fait pour vous ». Ce qu'on peut décrire honnêtement, ce sont des affinités : des environnements et des façons de travailler où ce type s'use moins et donne plus.",
          ],
        },
        {
          genre: "texte",
          titre: "Le début de parcours est *sa meilleure période*",
          paragraphes: [
            "C'est l'inverse exact de plusieurs autres types. Tout est neuf, on ne lui demande pas encore de tenir sur dix ans, sa sociabilité est un atout immédiat, et sa capacité à apprendre vite compense son manque de méthode. Un ENFP de vingt-cinq ans est souvent l'élément qu'on remarque.",
            "La difficulté arrive au deuxième acte : quand la progression cesse de dépendre de l'apprentissage et commence à dépendre de la durée, rester, approfondir, tenir un dossier trois ans. Le moment où beaucoup d'ENFP changent de voie n'est presque jamais un échec : c'est un épuisement de la nouveauté. Et ils l'expliquent après coup par des raisons de fond auxquelles ils croient sincèrement.",
          ],
        },
        {
          genre: "texte",
          titre: "Où l'affinité est forte, *et pourquoi*",
          paragraphes: [
            "Tout ce dont le contenu change souvent et dont la relation humaine est le cœur plutôt que l'accessoire : formation et enseignement, accompagnement, communication, création et médias, associatif, indépendance, développement fondé sur la relation. Mais le point commun n'est pas le secteur, c'est le rapport au travail : de la variété, du contact, une marge d'improvisation, un sens auquel il souscrit personnellement, et une évaluation sur l'effet produit plutôt que sur la conformité. Un ENFP peut être excellent dans un métier technique si ces conditions sont réunies, et malheureux dans un métier créatif qui ne les réunit pas.",
          ],
        },
        {
          genre: "texte",
          titre: "Ce qui l'use, *quel que soit le métier*",
          paragraphes: [
            "La répétition sans variation. La hiérarchie rigide et le protocole. Le silence obligatoire et l'absence de contact. L'accumulation administrative. Et, le plus coûteux de tous : devoir défendre publiquement une chose à laquelle il ne croit pas. Chez un type dont le noyau est un système de valeurs privé, cette dissonance n'est pas un inconfort, c'est une usure de fond, qui finit par produire un départ que personne n'avait vu venir.",
          ],
        },
        {
          genre: "texte",
          titre: "Le paradoxe du travail *indépendant*",
          paragraphes: [
            "Il l'attire massivement, pour de bonnes raisons : liberté, variété, choix des projets. Et il l'expose précisément là où il est faible, parce que l'indépendance donne la liberté et exige la structure, dans cet ordre. Un ENFP indépendant qui ne s'est pas construit un cadre externe (associé, comptable, échéances imposées) se retrouve seul avec sa propre discipline, qui est sa ressource la plus faible.",
            "Ce qu'il sous-estime systématiquement : la valeur cumulative de la durée. Il regarde ceux qui restent quinze ans au même endroit comme des gens enfermés, et découvre tard que rester produit une compétence, un réseau et une autorité qu'aucune polyvalence ne remplace.",
          ],
        },
        {
          genre: "texte",
          titre: "L'argent",
          paragraphes: [
            "Sujet mal aimé et souvent mal tenu, non par insouciance de caractère, mais parce que la gestion financière exige exactement ce qu'il a de plus faible : la continuité et la comptabilité. L'argent sert à faire des choses et à faire plaisir, rarement à sécuriser. La dépense se fait par élan, la générosité est réelle et parfois imprudente. Conséquence : une vulnérabilité financière durable, à laquelle s'ajoute une honte qui empêche d'en parler, y compris à un proche capable d'aider. Le sujet est plus lourd chez ce type qu'on ne le raconte.",
          ],
        },
        {
          genre: "texte",
          titre: "La réussite et *l'autorité*",
          paragraphes: [
            "Sa réussite se définit relationnellement et moralement, pas par le statut : est-ce que ce que je fais compte pour quelqu'un, est-ce que je peux le regarder en face. Le titre et le grade le motivent peu, ce qui le rend difficile à retenir par la promotion seule. En revanche, il est beaucoup plus sensible à la reconnaissance verbale explicite qu'il ne l'admet : un mot dit à voix haute produit chez lui un effet qu'une augmentation ne produit pas. Cette asymétrie est peu connue de ses managers, et elle coûte cher.",
            "Face à l'autorité, il n'a pas de problème de principe. Son critère n'est pas la compétence du chef, c'est son respect des personnes : un responsable moyen mais correct est accepté sans difficulté ; un responsable brillant et humiliant est intolérable. Ce jugement se forme en quelques semaines et ne se révise presque jamais. Ce qui déclenche la rupture n'est jamais l'incompétence, c'est l'humiliation, la sienne ou celle d'un collègue.",
          ],
        },
      ],
    },
    {
      slug: "habitudes-au-travail",
      titre: "Habitudes au travail",
      titreSeo: "ENFP (Inspirateur) au travail : habitudes et environnements",
      description:
        "L'ENFP comme subordonné, collègue et manager, son rapport au temps et au désaccord, et les environnements qui l'éteignent ou le révèlent.",
      blocs: [
        {
          genre: "texte",
          paragraphes: [
            "Le même ENFP ne produit pas les mêmes effets selon sa position. Trois angles, puis les environnements.",
          ],
        },
        {
          genre: "texte",
          titre: "Comme subordonné",
          paragraphes: [
            "On lui confie volontiers un problème sans procédure : il improvise une manière de faire et l'essaie avant d'avoir la certitude qu'elle tienne. Il encaisse bien la contradiction, une objection l'intéresse plus qu'elle ne le menace, tant qu'elle porte sur le travail et non sur lui. Difficile à encadrer, mais pas pour la raison qu'on croit : ce n'est pas de la rébellion, c'est une mobilité d'attention. Le micro-management l'éteint rapidement, et, ce qui est moins souvent dit, l'absence totale de cadre l'éteint aussi. Il a besoin d'échéances externes, et il ne le demandera pas, parce qu'il croit sincèrement préférer la liberté totale. Un manager qui lui fixe des points de contrôle réguliers sans commenter sa méthode obtient de lui son meilleur niveau.",
            "Point déterminant : son investissement dépend de la relation avec son responsable plus que du contenu du poste. C'est vérifiable en quelques semaines, et cela surprend beaucoup de managers habitués à raisonner en missions.",
          ],
        },
        {
          genre: "texte",
          titre: "Comme collègue",
          paragraphes: [
            "La relation strictement professionnelle ne lui est pas accessible : quelques semaines suffisent pour qu'un collègue devienne quelqu'un dont il connaît la vie. C'est de là qu'il tire l'essentiel de son énergie de travail. Quand quelqu'un va mal dans l'équipe, il est le premier à s'en apercevoir et le premier à aller le voir, sans que personne le lui ait demandé. Et il cherche constamment l'arrangement où personne ne perd la face, même quand la situation ne le permet pas.",
            "Il est excellent en phase d'ouverture d'un sujet, quand il faut produire vingt pistes en une heure. Son point faible en collectif est le désaccord : il approuve en réunion, et exprime ses réserves après, dans le couloir, avec sincérité dans les deux cas. L'effet produit ressemble à de la duplicité, n'en est pas, mais en a le coût.",
          ],
        },
        {
          genre: "texte",
          titre: "Comme manager",
          paragraphes: [
            "Son autorité ne passe pas par l'instruction : elle passe par ce qu'il montre et par le lien qu'il entretient avec chacun. Elle faiblit donc exactement quand ce lien faiblit. Il donne beaucoup d'autonomie, il énonce où l'on va et considère que la manière d'y arriver appartient à celui qui exécute, ce qui convient très bien aux autonomes, et laisse les autres sans repères, dans une incertitude qu'ils n'osent pas toujours signaler. La sanction lui coûte énormément, il la retarde ; et retarder une sanction produit exactement l'injustice qu'il voulait éviter, ressentie par toute l'équipe.",
            "Deux angles morts spécifiques : il traite mieux ceux avec qui le courant passe, et il ne le voit pas, parce que son critère est affectif et non délibéré. Et il change de cap avec enthousiasme sans mesurer ce que le changement coûte à ceux qui exécutent, sa réorientation est gratuite pour lui, elle représente trois semaines perdues pour les autres.",
          ],
        },
        {
          genre: "texte",
          titre: "Le temps, l'écrit, *le désaccord*",
          paragraphes: [
            "Sa gestion du temps se fait par vagues : des périodes d'abattage impressionnantes suivies de creux, et une planification qui suppose systématiquement que la période d'abattage est la norme. Il sous-estime les tâches ennuyeuses et surestime sa disponibilité future.",
            "Il est excellent à l'oral, réunion, improvisation, présentation, et en difficulté sur les livrables écrits longs, qui demandent de la continuité et un ordre stable. Beaucoup d'ENFP passent pour brillants en salle et décevants dans les documents. C'est la même personne.",
            "Et quand il n'est pas d'accord avec une décision prise, il ne dit pas non. Il ralentit, il oublie, il ne relance pas, il devient difficile à joindre sur ce sujet précis. Le blocage est réel et n'est jamais formulé, ce qui le rend très coûteux à diagnostiquer.",
          ],
        },
        {
          genre: "texte",
          titre: "Les environnements",
          paragraphes: [
            "Ce qui l'éteint : l'open space silencieux où l'on n'a pas le droit de parler ; le travail à la procédure, sans marge d'interprétation ; l'évaluation à la présence plutôt qu'à l'effet ; les cultures où exprimer un affect passe pour un manque de professionnalisme ; un responsable qui rabaisse, y compris quand ce n'est pas lui qui est visé ; et l'incohérence entre les valeurs affichées et les pratiques réelles, le facteur le plus corrosif pour ce type, davantage que la charge de travail.",
            "Ce qui le révèle : un objectif clair avec une méthode libre ; des interlocuteurs variés et du mouvement dans la semaine ; un cadre temporel externe qu'il n'a pas à produire lui-même ; une équipe où l'on s'apprécie ; et une finalité à laquelle il adhère personnellement, condition sans laquelle rien d'autre ne tient.",
            "Le facteur le plus déterminant, rarement cité : la qualité relationnelle de l'équipe immédiate, davantage que le contenu du poste ou le salaire. Un ENFP dans un travail médiocre avec des gens qu'il aime reste des années, en s'en étonnant lui-même. Dans un poste passionnant avec une équipe froide, il part vite.",
            "Un signal d'alerte, utile aux managers : un ENFP qui cesse de proposer des idées est déjà parti mentalement. La proposition spontanée est son marqueur d'investissement le plus fiable. Le jour où il exécute proprement ce qu'on lui demande sans rien ajouter, la décision est prise.",
          ],
        },
      ],
    },
    {
      slug: "sous-stress",
      titre: "Sous stress",
      titreSeo: "ENFP (Inspirateur) sous stress : les trois paliers",
      description:
        "L'ENFP sous stress : il accélère d'abord, c'est le piège, puis se fissure, puis bascule dans l'inverse exact de lui-même. Ce qui aide, ce qui aggrave.",
      blocs: [
        {
          genre: "texte",
          paragraphes: [
            "Une précision d'honnêteté avant de commencer : ces portraits du stress par type sont mieux décrits que démontrés. Beaucoup d'ENFP s'y reconnaissent fortement, mais rien ne prouve que ces réactions soient plus fréquentes chez eux que chez d'autres. À lire comme un miroir possible, pas comme une fatalité.",
          ],
        },
        {
          genre: "texte",
          titre: "Ce qui le fait *basculer*",
          paragraphes: [
            "Une routine dont il ne voit pas la sortie. Un environnement où il doit se taire ou jouer un rôle. Un conflit relationnel non résolu qui traîne. Une critique portant sur sa personne et non sur son travail. L'obligation de trancher définitivement. Le sentiment d'avoir déçu quelqu'un. Et l'accumulation administrative, qui agit comme un stress de fond dont il sous-estime le poids.",
          ],
        },
        {
          genre: "texte",
          titre: "Stress léger : *il accélère*",
          paragraphes: [
            "C'est contre-intuitif, et c'est le signe le plus trompeur du type. L'ENFP stressé ne se replie pas : il lance deux projets de plus, sort davantage, parle plus vite, promet beaucoup. La fuite en avant est son premier mode de gestion, et elle est invisible, parce qu'elle ressemble à sa forme habituelle en plus fort. C'est le moment où l'entourage le trouve « en pleine forme ».",
          ],
        },
        {
          genre: "texte",
          titre: "Stress installé : *la fissure*",
          paragraphes: [
            "Susceptibilité, lecture des silences, demandes de réassurance détournées, oscillations d'humeur d'un jour à l'autre. Il commence à disparaître par intermittence sans expliquer pourquoi. Le ton peut devenir sec, comptable, avec des reproches précis et chiffrés qui ne lui ressemblent pas.",
          ],
        },
        {
          genre: "texte",
          titre: "Débordement : *l'inverse exact de lui-même*",
          paragraphes: [
            "Quand il craque, il bascule dans le contraire de son fonctionnement : fixation sur des détails matériels sans importance, revue obsessionnelle du passé, inventaire de tout ce qu'il n'a jamais terminé, pessimisme sans nuance, préoccupations corporelles, parfois attachement rigide et soudain à une routine. La formule intérieure typique est un jugement global et définitif sur sa vie entière, chez quelqu'un qui, d'ordinaire, ne juge rien définitivement. Ce qui frappe l'entourage, c'est le contraste.",
            "Vu de l'extérieur, le signal n'est pas la plainte : c'est l'extinction. Ses proches ne s'inquiètent pas d'un ENFP triste. Ils devraient s'inquiéter d'un ENFP silencieux.",
          ],
        },
        {
          genre: "texte",
          titre: "Ce qui aide, *ce qui aggrave*",
          paragraphes: [
            "Ce qui aide : le mouvement physique et le changement d'air, avant toute discussion. Une seule tâche courte menée à son terme, qui casse le sentiment d'inachèvement global. Une personne qui écoute sans proposer de solution et sans minimiser. Et un retour à ce qui compte pour lui, plutôt qu'à ce qu'il devrait faire.",
            "Ce qui aggrave, et que l'entourage fait spontanément : lui rappeler ses engagements non tenus, ce qui alimente exactement la boucle. Lui demander de choisir maintenant. Lui dire qu'il exagère. Et le laisser seul plusieurs jours en pensant respecter son besoin de calme : l'isolement prolongé est chez lui un aggravateur, pas un remède.",
          ],
        },
      ],
    },
    {
      slug: "enfant",
      titre: "L'ENFP enfant",
      titreSeo: "L'enfant ENFP : le comprendre et l'accompagner",
      description:
        "L'ENFP enfant : l'enfant « trop », les passions successives prises pour de l'instabilité, et le risque d'apprendre que sa valeur tient à sa capacité à plaire.",
      blocs: [
        {
          genre: "texte",
          paragraphes: [
            "Un préalable honnête : l'enfance par type est très peu documentée. Ce qui suit est la partie la plus cohérente de ce qui se rapporte régulièrement, à lire comme un portrait vraisemblable, pas comme un résultat établi.",
          ],
        },
        {
          genre: "texte",
          titre: "L'enfant « trop »",
          paragraphes: [
            "Trop d'énergie, trop de questions, trop de sentiments, trop de mots. Adoré des adultes par intermittence, et épuisant pour eux le reste du temps, ce qui lui apprend très tôt que son intensité a un seuil de tolérance.",
          ],
        },
        {
          genre: "texte",
          titre: "Les passions *successives*",
          paragraphes: [
            "Trois mois de dessin, puis de guitare, puis d'astronomie, chaque fois avec une conviction totale. Les parents financent le matériel et concluent qu'il est instable. Ce qu'il vit est autre chose : l'intérêt était sincère, et il s'est épuisé une fois le territoire exploré. Le reproche qu'on lui adresse à ce moment-là, « tu ne finis jamais rien », est souvent sa première blessure durable.",
          ],
        },
        {
          genre: "texte",
          titre: "Sensible à l'ambiance, *sensible à l'injustice*",
          paragraphes: [
            "Il détecte les tensions entre adultes avant qu'elles soient dites, et se sent responsable de les réparer. Un enfant ENFP dans une maison tendue devient souvent l'amuseur ou le médiateur, et personne ne remarque le coût.",
            "À l'école, le marqueur le plus fiable est celui-ci : la relation prime sur la matière. Il est excellent dans les disciplines où le professeur l'apprécie, et s'effondre là où il se sent mal vu, indépendamment de sa capacité. Beaucoup d'ENFP adultes ont un souvenir précis d'une année où tout s'est joué sur une personne.",
          ],
        },
        {
          genre: "texte",
          titre: "Le risque de *cette période*",
          paragraphes: [
            "Apprendre que sa valeur tient à sa capacité à plaire et à animer. L'enfant qui fait rire la classe pour exister construit un adulte qui ne sait pas être aimé au repos, et qui devra produire de l'énergie pour se sentir légitime dans chaque pièce où il entre.",
          ],
        },
        {
          genre: "texte",
          titre: "Ce dont cet enfant *a besoin*",
          paragraphes: [
            "Qu'on l'aide à finir une chose, une seule, sans le forcer sur les autres. Qu'on ne se moque pas de ses passions quand elles s'arrêtent. Qu'on distingue le comportement de la personne quand on le reprend. Et qu'on lui dise qu'il est aimé quand il ne fait rien de particulier.",
          ],
        },
      ],
    },
    {
      slug: "compatibilites",
      titre: "Compatibilités",
      titreSeo: "Compatibilités de l'ENFP (Inspirateur) : ce qui allège, ce qui frotte",
      description:
        "La compatibilité amoureuse de l'ENFP, sans tableau bidon : ce qui allège la relation, les frictions prévisibles, et le mythe du couple ENFP-INTJ.",
      blocs: [
        {
          genre: "texte",
          titre: "Le cadre, *dit franchement*",
          paragraphes: [
            "Personne ne peut promettre qu'un couple fonctionnera sur la base de deux codes à quatre lettres, et les tableaux de compatibilité par paires qu'on trouve ailleurs n'ont aucune base. Côté vie amoureuse, il n'existe tout simplement pas d'étude sérieuse, ni dans un sens ni dans l'autre. Au passage : « ENFP et INTJ sont faits l'un pour l'autre », qu'on lit partout, vient d'une théorie de complémentarité jamais vérifiée. Ce qu'on peut faire d'honnête, c'est décrire des mécanismes : ce qui, chez un partenaire, allège ou alourdit le fonctionnement propre de l'ENFP.",
          ],
        },
        {
          genre: "liste",
          titre: "Ce qui allège la relation, *et pourquoi*",
          items: [
            {
              titre: "Un partenaire qui a sa propre structure, et ne l'impose pas comme un reproche.",
              texte:
                "Le concret est pris en charge sans que ça devienne un procès permanent. C'est probablement le facteur le plus déterminant.",
            },
            {
              titre: "Un partenaire qui exprime verbalement son attachement.",
              texte:
                "Le besoin d'être choisi à nouveau cesse d'être une demande honteuse.",
            },
            {
              titre: "Un partenaire qui a de la profondeur à découvrir sur la durée.",
              texte:
                "Son attention se nourrit de ce qui n'est pas encore connu : une personne complexe reste stimulante longtemps.",
            },
          ],
        },
        {
          genre: "liste",
          titre: "Les frictions *prévisibles*",
          items: [
            {
              titre: "Avec les profils très organisés.",
              texte:
                "La boucle classique s'installe vite : plus l'un cadre, plus l'autre fuit le cadre, plus le premier cadre. Ce n'est pas un désaccord sur le rangement, c'est une différence de critère de sécurité.",
            },
            {
              titre: "Avec les profils très réservés.",
              texte:
                "Il sur-interprète le silence et demande de la réassurance, ce qui produit du retrait, donc plus de demande.",
            },
            {
              titre: "Avec les profils ironiques ou moqueurs.",
              texte:
                "La blessure s'accumule sans être dite, et se solde d'un coup.",
            },
          ],
        },
        {
          genre: "texte",
          titre: "Le cas de *deux ENFP*",
          paragraphes: [
            "Compréhension immédiate, intensité forte, très peu de reproches sur l'inconstance puisqu'elle est partagée. Deux risques propres : personne ne prend en charge la vie matérielle, et personne ne tient la phase deux d'un projet commun. Le couple peut être très heureux et très fragile en même temps.",
          ],
        },
        {
          genre: "texte",
          titre: "Le malentendu structurel avec *les profils très stables*",
          paragraphes: [
            "Ce sont souvent eux qui l'attirent, parce qu'ils apportent ce qu'il ne sait pas produire : de la continuité. Et ce sont eux qu'il use le plus vite, parce qu'il attend d'eux qu'ils soient stables sans être prévisibles. L'attirance et l'incompatibilité viennent exactement de la même source.",
          ],
        },
        {
          genre: "texte",
          titre: "Ce qui compte *davantage que le type de l'autre*",
          paragraphes: [
            "Trois choses, et elles ne sont pas typologiques : que le partenaire sache distinguer son élan de sa parole donnée, sans mépriser ni l'un ni l'autre. Qu'il demande directement, au lieu de laisser interpréter. Et qu'il tolère une variabilité d'énergie qui n'est pas une variabilité d'attachement.",
          ],
        },
      ],
    },
    {
      slug: "conclusion",
      titre: "Conclusion",
      titreSeo: "ENFP (Inspirateur) : conclusion, la question de la fiabilité",
      description:
        "Est-ce qu'un ENFP pense vraiment ce qu'il dit ? Le fil du portrait, la réponse honnête à la question de la fiabilité, et ce que grandir veut dire pour ce type.",
      blocs: [
        {
          genre: "texte",
          titre: "Le fil, *pour finir*",
          paragraphes: [
            "Tout ce portrait tient sur un seul mécanisme : il émet un état, l'autre reçoit un engagement. Ses forces viennent de là, personne ne rend un possible aussi présent, personne ne remet debout quelqu'un aussi vite. Ses dégâts aussi : la promesse involontaire, l'intermittence, le crédit ouvert sur ce que les gens pourraient devenir.",
          ],
        },
        {
          genre: "texte",
          titre: "La question que *tout le monde se pose sur lui*",
          paragraphes: [
            "« Est-ce qu'il pense vraiment ce qu'il dit ? » Oui. Entièrement. Au moment où il le dit. C'est la réponse complète, et ses deux moitiés comptent. Ce type ne ment presque jamais, il dure moins longtemps que sa parole. La distinction utile n'est pas sincère ou menteur, c'est constance ou intermittence : sa loyauté affective ne bouge pas, ses actes bougent. Un proche qui comprend cette distinction cesse de se sentir trahi ; un proche qui ne la comprend pas finira par douter de tout ce qu'il a vécu de vrai.",
          ],
        },
        {
          genre: "liste",
          titre: "Ce que *grandir* veut dire pour ce type",
          intro:
            "Pas devenir sérieux, discipliné ou raisonnable, ces traductions circulent partout et ratent le sujet. Grandir, pour un ENFP, c'est cesser de confondre trois couples : l'élan et l'engagement, l'intensité et le lien, l'ouverture et la liberté. Cinq leviers concrets :",
          items: [
            {
              titre: "Finir une chose.",
              texte:
                "Pas devenir organisé, mener un objet à son terme, en entier, une fois. L'effet recherché n'est pas le résultat, c'est la preuve. Un ENFP qui a fini une chose sait désormais quelque chose sur lui que dix livres ne lui apprendront pas.",
            },
            {
              titre: "Apprendre à décevoir.",
              texte:
                "Dire non tôt coûte trente secondes ; dire non tard coûte une relation. Il fait spontanément l'inverse, par gentillesse, et produit exactement le dommage qu'il voulait éviter. C'est probablement le levier au meilleur rendement.",
            },
            {
              titre: "Distinguer ce qu'il ressent de ce que l'autre ressent.",
              texte:
                "Il prête à l'autre son propre état, et agit dessus. Une seule question posée à voix haute, « qu'est-ce que tu ressens, toi ? », désamorce une part considérable de ses conflits.",
            },
            {
              titre: "Prendre la structure comme condition de la liberté.",
              texte:
                "Tant qu'il oppose cadre et liberté, il perd les deux. Trois contraintes stables, horaires, argent, engagements pris, et il récupère de la marge sur tout le reste.",
            },
            {
              titre: "Réhabiliter le passé.",
              texte:
                "Tenir une trace de ce qu'il a fait, relire, mesurer. Il sous-estime massivement son propre parcours, parce qu'il ne le consulte jamais.",
            },
          ],
        },
        {
          genre: "texte",
          titre: "Ce qui déclenche *le mouvement*",
          paragraphes: [
            "Rarement une lecture, jamais un reproche. Presque toujours le moment où il constate qu'il a été entièrement sincère, et qu'il a quand même fait du mal. Un ami qui ne rappelle plus, un enfant qui ne demande plus rien, un partenaire qui a cessé de croire ses annonces. C'est la seule donnée que son système de valeurs ne peut pas écarter : elle ne met pas en cause sa bonne foi, à laquelle il tient plus qu'à tout, mais son effet.",
            "Les pièges du parcours : transformer sa propre croissance en nouveau projet enthousiasmant : méthode, lectures, carnet neuf, abandon à la sixième semaine. Confondre développement et consommation de contenus. Et retourner sa lucidité contre lui-même, où elle devient un réquisitoire : beaucoup de souffrance, aucun changement.",
            "On reconnaît un ENFP qui a fait le chemin à quatre détails : il dit non sans se justifier trois fois. Il ne promet plus que ce qu'il fera, et il le fait. Son enthousiasme est devenu plus rare, donc il vaut quelque chose. Et il a cessé d'attendre que la motivation revienne pour agir.",
          ],
        },
        {
          genre: "texte",
          titre: "Une dernière chose",
          paragraphes: [
            "Ce portrait décrit un type, les grandes lignes que partagent ceux qui s'y reconnaissent. Il ne dit pas où toi, tu te situes sur chaque spectre, ni avec quelle intensité, ni laquelle des trois variantes du type te correspond. Ça, c'est ce que mesure le test.",
          ],
        },
      ],
    },
  ],
};

// -----------------------------------------------------------------------------
// INTP — le Logicien
// -----------------------------------------------------------------------------

const INTP: ContenuType = {
  intro: {
    slug: "",
    titre: "Introduction",
    titreSeo: "INTP (Logicien) : le portrait complet",
    description:
      "Le type INTP : souvent le seul à voir la faille, souvent le dernier à s'engager. Un portrait honnête de la précision intérieure, et de son prix.",
    exergue:
      "Souvent le seul de la pièce à avoir vu la faille. Et souvent le dernier à s'engager.",
    blocs: [
      {
        genre: "texte",
        paragraphes: [
          "INTP, c'est l'un des seize types de personnalité : Introversion, iNtuition, Pensée, Perception. Autour de 3 à 5 % de la population selon les études, et contrairement à un argument identitaire très répandu sur les forums, rien de solide n'en fait un type spécialement rare : les données récentes le placent même parmi les plus fréquents chez les hommes.",
        ],
      },
      {
        genre: "texte",
        titre: "La précision *intérieure*",
        paragraphes: [
          "Ce qui définit l'INTP, ce n'est ni l'intelligence ni la distraction, contrairement à sa réputation. C'est un rapport particulier à l'exactitude : il construit dans sa tête un modèle du monde dont chaque pièce doit s'emboîter, et refuse d'appeler « vrai » ce qui marche seulement en pratique. Beaucoup de gens veulent avoir raison. Lui veut être exact, et ça se paie très différemment.",
          "Une théorie qui fonctionne pour de mauvaises raisons lui est insupportable, alors qu'elle satisfait presque tout le monde. Avant de discuter, il a besoin de savoir ce que le mot veut dire, ce que les autres vivent comme une manœuvre dilatoire, alors que c'est sa condition de travail. Et son humilité est asymétrique, ce qui déroute : il change d'avis sans difficulté devant un meilleur argument, et ne bouge pas d'un millimètre devant une pression sociale, un vote ou une autorité. Les deux viennent de la même source.",
        ],
      },
      {
        genre: "texte",
        titre: "Le paradoxe qui organise *tout le reste*",
        paragraphes: [
          "Classé parmi les types « Pensée », l'INTP n'est pas un homme de conclusions. Sa logique est un instrument de démontage, pas de décision : elle sert à isoler l'hypothèse cachée, à établir ce qui ne tient pas, et elle produit rarement le « donc » que les autres attendent.",
          "D'où l'effet constant : il est souvent le seul de la pièce à avoir vu la faille, et souvent le dernier à s'engager. On lui reproche l'un en ayant bénéficié de l'autre.",
        ],
      },
      {
        genre: "texte",
        titre: "Le détachement est *une erreur de lecture*",
        paragraphes: [
          "Deuxième paradoxe, moins connu : sa réputation de froideur décrit mal ce qui se passe. Il ne cache pas des émotions intenses sous une surface froide, l'ambiance d'un groupe, l'effet d'une phrase sur l'autre sont des données qu'il traite avec retard et sans instrument fiable. Il n'est pas insensible à l'atmosphère : il y est même exposé sans filtre, mais il la perçoit tard et ne sait pas toujours qu'en faire. L'écart n'est pas entre le froid et le chaud. Il est entre deux vitesses.",
          "D'où deux comportements opposés chez la même personne : une indifférence apparente pendant des mois, puis une réaction disproportionnée à une tension accumulée sans avoir été nommée.",
        ],
      },
      {
        genre: "tableau",
        titre: "Ce qu'il vit, *ce qu'on voit*",
        intro: "Le même comportement, vu des deux côtés :",
        colonnes: ["Ce qu'il vit", "Ce que les autres voient"],
        lignes: [
          ["Je vérifie avant d'affirmer", "Il ne s'engage jamais"],
          ["Ta phrase m'a fait penser à autre chose", "Il s'ennuie avec moi"],
          ["Je n'ai pas encore de réponse fiable", "Il refuse de me parler"],
          ["J'objecte parce que le sujet m'intéresse", "Il est contre tout"],
          ["Le silence ne veut rien dire", "Il m'en veut"],
          ["Je t'aime, c'est établi depuis longtemps", "Il ne me le dit jamais"],
          ["Je corrige un détail, ce n'est pas contre toi", "Il me reprend en public"],
        ],
        sortie: [
          "L'asymétrie fondamentale : il communique un contenu, son entourage lit une relation. Quand il corrige une date dans une anecdote, il ajoute une information ; l'autre reçoit un jugement sur sa fiabilité. C'est probablement la clé de lecture la plus utile de tout ce portrait, car il ignore sincèrement qu'un second plan existe, et ne peut donc pas le corriger tant qu'on ne le lui a pas nommé.",
          "Un seul écart de ce tableau joue en sa faveur : il se croit inintéressant, alors que ses proches le décrivent comme drôle.",
        ],
      },
      {
        genre: "texte",
        titre: "Trois *légendes* à remettre à leur place",
        paragraphes: [
          "« Il est paresseux. » L'idée reçue la plus fréquente, et la plus fausse : le mécanisme est exactement inverse. Il ne démarre pas parce que son standard est trop élevé, pas trop bas, et le même individu peut travailler quatorze heures sans pause sur un problème qui l'engage. Ce qui se voit ressemble à de la paresse ; ce qui le produit en est le contraire.",
          "« C'est le type le plus intelligent. » Aucune donnée ne soutient ça, et les listes de physiciens et de philosophes célèbres qu'on lui attribue concernent des gens morts et jamais testés. On ne reprendra pas la légende ici.",
          "« Il n'a pas d'émotions. » Faux, et inversé sur un point précis : il est exposé au climat affectif sans instrument pour le traiter. L'apparence d'indifférence recouvre un traitement lent, pas une absence.",
        ],
      },
    ],
  },
  pages: [
    {
      slug: "forces-et-faiblesses",
      titre: "Forces et faiblesses",
      titreSeo: "INTP (Logicien) : forces et faiblesses",
      description:
        "Les forces de l'INTP et leurs limites, et ses douze faiblesses, qui sont la même liste lue dans l'autre sens.",
      blocs: [
        {
          genre: "liste",
          titre: "Les forces, et ce qu'elles *coûtent*",
          intro:
            "Une force sans limite, c'est un argument de vente, pas une observation. Chez l'INTP, la force et le défaut correspondant sont la même opération, appliquée au mauvais objet.",
          items: [
            {
              titre: "Analyser en profondeur.",
              texte:
                "Il décompose un raisonnement jusqu'à ses hypothèses implicites, et voit la faille avant tout le monde.",
              revers:
                "Il applique la même dissection à des propos qui n'étaient pas des arguments.",
            },
            {
              titre: "Une humilité intellectuelle réelle.",
              texte:
                "Il change d'avis devant une meilleure preuve sans y voir une défaite. C'est rare, et c'est vérifiable.",
              revers:
                "Cette souplesse ne s'étend pas à la pression sociale, où il devient au contraire plus dur, ce qui le fait passer pour buté auprès de qui n'a jamais essayé l'argument.",
            },
            {
              titre: "Produire des idées non évidentes.",
              texte:
                "Il rapproche des domaines qui n'ont pas de raison de se rencontrer, et en tire des solutions inattendues.",
              revers: "Ces idées arrivent sans mode d'emploi, ni personne pour les porter.",
            },
            {
              titre: "Reformuler les problèmes mal posés.",
              texte:
                "Sa question caractéristique, « pourquoi fait-on comme ça ? », fait parfois gagner des mois, en montrant que le problème sur lequel tout le monde travaillait n'était pas le bon.",
              revers:
                "Posée à trois jours d'une échéance, la même question ressemble à du sabotage.",
            },
            {
              titre: "Une curiosité qui va au fond.",
              texte:
                "Il atteint en quelques semaines, sur un sujet neuf, un niveau que d'autres mettent des années à acquérir.",
              revers: "L'intensité tombe au moment exact où le sujet devient un travail.",
            },
            {
              titre: "Une honnêteté de méthode.",
              texte:
                "Il traque le biais, y compris le sien, se méfie de ce qui lui plaît, et préfère une vérité inconfortable à une version rassurante.",
              revers:
                "Il applique ce standard aux conversations ordinaires, et corrige une approximation sans importance devant témoins.",
            },
            {
              titre: "Une concentration longue.",
              texte:
                "Des heures sur un problème qui l'engage, sans fatigue apparente ni stimulation extérieure.",
              revers:
                "Capacité conditionnelle : sur une tâche qui ne l'engage pas, elle tombe très bas, et l'écart entre les deux régimes est si grand qu'il est lu comme un problème de volonté.",
            },
            {
              titre: "Une absence de déférence.",
              texte:
                "Un titre, une ancienneté ou une majorité ne constituent pas un argument. Difficile à influencer, difficile à manipuler.",
              revers: "Il paie cher des refus symboliques qui ne lui rapportaient rien.",
            },
            {
              titre: "L'ouverture aux positions adverses.",
              texte:
                "Il défend sérieusement une thèse qu'il ne partage pas, pour voir ce qu'elle donne, et cherche activement à être contredit.",
              revers:
                "Ce jeu est invisible de l'extérieur : il passe pour cynique, ou pour croire ce qu'il vient de soutenir.",
            },
            {
              titre: "La précision de langage.",
              texte: "Il dit ce qu'il veut dire, sans emphase, et ce qu'il affirme est calibré.",
              revers:
                "Il en conclut qu'il a été clair. Un énoncé exact et un énoncé compris ne sont pas la même chose, et il n'a jamais intégré la différence.",
            },
          ],
        },
        {
          genre: "liste",
          titre: "Les faiblesses",
          intro:
            "Douze points, qui ne forment pas une liste indépendante des forces : c'est la même liste, lue dans l'autre sens.",
          items: [
            {
              titre: "La non-conclusion.",
              texte:
                "Le défaut structurant, d'où viennent la moitié des autres. Il n'arrête pas, parce que rien n'est jamais entièrement établi. Résultat : des travaux excellents à 90 % qui n'existent pour personne.",
            },
            {
              titre: "La procrastination par exigence.",
              texte:
                "Le contraire mécanique de la paresse : il ne démarre pas parce qu'il a déjà mesuré l'écart entre ce qu'il pourrait faire et ce qu'il ferait dans le temps imparti.",
            },
            {
              titre: "L'indécision devant l'abondance.",
              texte:
                "Sept options visibles valent une absence d'option. Sur les décisions sans enjeu, il délègue, ce qui est lu comme du désintérêt.",
            },
            {
              titre: "L'absence mentale.",
              texte:
                "Il décroche au milieu d'une conversation pour suivre une idée, et revient sans savoir ce qui s'est dit.",
            },
            {
              titre: "L'insensibilité involontaire.",
              texte:
                "Il traite la logique d'une situation et manque sa dimension humaine. L'intention n'est pas dure. L'effet l'est.",
            },
            {
              titre: "L'insatisfaction chronique.",
              texte:
                "Il voit ce qui pourrait être mieux, en permanence, y compris dans ce qui va très bien.",
            },
            {
              titre: "L'impatience pédagogique.",
              texte:
                "Il explique bien, une fois. Si l'interlocuteur ne suit pas, il abrège ou abandonne, et l'autre reste avec le sentiment d'avoir été jugé.",
            },
            {
              titre: "La contradiction réflexe.",
              texte:
                "L'objection lui vient avant l'accord, y compris quand il est d'accord sur le fond. Il croit contribuer ; on entend qu'il conteste.",
            },
            {
              titre: "La communication tronquée.",
              texte:
                "Il expose la conclusion sans le chemin, ou l'inverse, et suppose que la partie manquante va de soi.",
            },
            {
              titre: "La négligence du concret.",
              texte:
                "Administratif, échéances, rendez-vous. Non par mépris, mais par non-perception : ce n'est pas arbitré contre autre chose, ce n'est pas dans le champ.",
            },
            {
              titre: "Le retrait au lieu du conflit.",
              texte:
                "Devant une tension émotionnelle, il se soustrait et revient à la logique. Il croit calmer le jeu ; il retire à l'autre son interlocuteur.",
            },
            {
              titre: "L'accumulation silencieuse.",
              texte:
                "Il ne signale pas ce qui le dérange, parce qu'il n'en est pas encore certain. Il le devient d'un coup, des mois plus tard, et la sortie est disproportionnée.",
            },
          ],
        },
        {
          genre: "texte",
          titre: "Pourquoi les conseils de bon sens *échouent*",
          paragraphes: [
            "Exiger l'exactitude produit la rigueur et la non-conclusion. Voir tous les possibles produit l'invention et l'indécision. On ne peut pas retirer les seconds sans entamer les premiers, c'est ce qui rend inefficaces, sur ce type, les conseils du genre « sois plus décidé » ou « fais un effort ». Ce qui marche est ailleurs, et la conclusion de ce portrait y revient.",
          ],
        },
      ],
    },
    {
      slug: "relations-amoureuses",
      titre: "Relations amoureuses",
      titreSeo: "INTP (Logicien) en amour : relations amoureuses",
      description:
        "Comment l'INTP aime : des preuves que peu de gens savent lire, un besoin qu'il ne dira pas, et le conflit typique, la plainte transformée en audit.",
      blocs: [
        {
          genre: "texte",
          titre: "Ce qu'il cherche",
          paragraphes: [
            "Quelqu'un avec qui penser à voix haute, sans être ramené au concret toutes les quatre minutes. La compatibilité intellectuelle est sa condition d'entrée : il peut être très attiré et renoncer, parce qu'il devrait s'auto-censurer en permanence. Vient ensuite un critère sous-estimé : la tolérance à son rythme, un partenaire qui ne lise pas trois heures de silence comme un message.",
          ],
        },
        {
          genre: "texte",
          titre: "L'entrée en relation est sa *difficulté structurelle*",
          paragraphes: [
            "Mais pas par timidité : la séduction fonctionne à l'indice indirect, exactement le registre qu'il ne décode pas. Il rate des signaux évidents pour tout le monde, et en soupçonne parfois d'inexistants. S'y ajoute une aversion à l'exposition : se déclarer, c'est être évalué sans pouvoir vérifier ses hypothèses.",
          ],
        },
        {
          genre: "texte",
          titre: "L'expression de l'affection est *le point de rupture le plus fréquent*",
          paragraphes: [
            "Il aime par la disponibilité intellectuelle, par les objets qu'il fabrique ou répare, par le fait de retenir précisément ce qui a été dit six mois plus tôt. Ce sont des preuves solides, que peu de gens savent lire. Lui ne dit pas, et suppose que l'installation de la relation vaut déclaration permanente. Le partenaire qui a besoin d'entendre entre alors dans un manque qu'il ne perçoit pas : de son point de vue, rien n'a changé. Et c'est vrai.",
          ],
        },
        {
          genre: "texte",
          titre: "Le besoin qu'il *ne dira pas*",
          paragraphes: [
            "Qu'on ne lui demande pas de conclure sur son état intérieur en temps réel. « Qu'est-ce que tu ressens ? » n'a pas, chez lui, de réponse fiable sur le moment, et l'exigence de répondre vite produit soit une réponse fausse, soit un silence lu comme un refus.",
            "Ce qui le blesse le plus : s'entendre dire qu'il ne ressent rien. Et qu'on relise son besoin de solitude comme un désamour.",
          ],
        },
        {
          genre: "texte",
          titre: "Le conflit typique, dans *son mécanisme*",
          paragraphes: [
            "Le partenaire exprime une émotion forte. L'INTP, désarçonné, propose la seule chose qu'il maîtrise : une analyse. Il demande des précisions, relève une contradiction, propose une solution. Il croit s'engager dans le problème, il vient de transformer une plainte affective en audit. Débordé par la montée qui suit, il se retire, ce qui est reçu comme un abandon en pleine crise. Sans traduction, la scène se rejoue pendant des années.",
            "La traduction, la voici : son analyse est sa façon de prendre l'autre au sérieux, et son retrait n'est pas un verdict, c'est un débordement. Aucun des deux ne se voit de l'extérieur.",
          ],
        },
      ],
    },
    {
      slug: "amities",
      titre: "Amitiés",
      titreSeo: "INTP (Logicien) en amitié",
      description:
        "Les amitiés de l'INTP : un critère de conversation, une franchise qui a valeur de preuve, le jeu de la contradiction, et le décrochage qui coûte des amis.",
      blocs: [
        {
          genre: "texte",
          titre: "Le critère de sélection est *un critère de conversation*",
          paragraphes: [
            "L'INTP ne cultive pas de relations pour occuper une case sociale. Il faut qu'il se passe quelque chose dans l'échange, et ce quelque chose est précis : un désaccord intéressant, une information qu'il n'avait pas, un angle qu'il n'avait pas envisagé. D'où un cercle restreint, souvent quatre ou cinq personnes, et une indifférence sincère au nombre.",
          ],
        },
        {
          genre: "texte",
          titre: "Ce qu'il apporte, et *qui est rare*",
          paragraphes: [
            "Une attention entière quand le sujet le prend, sans regarder l'heure. Une franchise sans agenda : il ne flatte pas, donc son approbation a une valeur informative. Une disponibilité intellectuelle importante, il peut passer un week-end entier sur le problème d'un ami parce que le problème l'intéresse, ce que les autres ne reconnaissent pas toujours comme une forme d'amitié. Et une absence de jugement social : le statut, les choix de vie, les conventions ne l'intéressent pas, ce qui en fait un interlocuteur devant lequel beaucoup de gens disent des choses qu'ils ne disent nulle part ailleurs.",
          ],
        },
        {
          genre: "texte",
          titre: "Le plaisir de la contradiction, et *son coût*",
          paragraphes: [
            "Il aime prendre le contre-pied, y compris de ce qu'il pense, pour voir ce que l'idée donne quand on la pousse. C'est un jeu, et il le vit comme une marque d'estime : on ne discute sérieusement qu'avec les gens qu'on respecte. Mais il ne prévient pas que c'est un jeu. Beaucoup d'interlocuteurs concluent qu'il défend des positions choquantes, ou qu'il ne croit à rien. Il découvre parfois, des années plus tard, qu'une relation s'est refroidie sur un débat dont il gardait un excellent souvenir.",
          ],
        },
        {
          genre: "texte",
          titre: "Sa difficulté centrale : il n'entretient pas, et *il décroche*",
          paragraphes: [
            "Deux choses souvent confondues. Il n'entretient pas, comme beaucoup d'introvertis : six mois sans nouvelles ne signifient rien, l'amitié est chez lui un état, pas un flux. Mais il décroche aussi en présence, au milieu d'une conversation, quand une idée le prend. L'ami voit son regard partir et comprend qu'il ennuie. C'est faux dans la quasi-totalité des cas, il vient au contraire d'entendre quelque chose d'assez intéressant pour l'emmener ailleurs, mais aucun signal extérieur ne distingue « tu m'as fait penser à quelque chose » de « tu me lasses ». Il perd des relations sur cette ambiguïté, sans jamais savoir lesquelles.",
          ],
        },
        {
          genre: "texte",
          titre: "L'asymétrie *qu'il ne voit pas*",
          paragraphes: [
            "Il donne beaucoup quand on lui apporte un problème, et rien quand on lui apporte un chagrin. Or les amitiés se construisent plus souvent sur le second. Il investit massivement dans le registre où il est bon, et pas du tout dans celui qui fabrique le sentiment d'être proche. Les gens veulent parfois une présence, pas une solution, c'est probablement la phrase la plus utile qu'on puisse lui dire.",
          ],
        },
        {
          genre: "texte",
          titre: "Ce qui l'éloigne",
          paragraphes: [
            "Les échanges sans contenu tenus pour maintenir le lien. Les groupes où il faut être présent sans qu'il se passe rien. Les personnes qui exigent un alignement d'opinion. Et les relations à forte demande d'entretien affectif, dont il finira par éviter les appels, plutôt que d'expliquer.",
          ],
        },
      ],
    },
    {
      slug: "parentalite",
      titre: "Parentalité",
      titreSeo: "INTP (Logicien) parent : parentalité",
      description:
        "L'INTP parent : l'un des moins sensibles à la norme parentale. Ses forces réelles, ses écueils, dont le cadre manquant, et son point de travail principal.",
      blocs: [
        {
          genre: "texte",
          titre: "Le principe qui organise tout : il ne cherche pas à produire *un enfant conforme*",
          paragraphes: [
            "Probablement l'un des types les moins sensibles à la norme parentale. Il ne projette pas de trajectoire, ne s'inquiète pas d'un calendrier scolaire idéal, et accepte des choix de vie que la plupart des parents combattent. Un enfant différent trouve chez lui un espace rare.",
          ],
        },
        {
          genre: "texte",
          titre: "Ses forces réelles",
          paragraphes: [
            "Il répond aux questions, y compris aux plus difficiles, et dit quand il ne sait pas. Il pratique la pédagogie par la question retournée : comment tu t'y prendrais, toi ? Il transmet le droit de ne pas croire sans vérifier, et il se l'applique, ce qui donne des enfants autorisés à le contredire. C'est plus rare qu'on ne croit.",
          ],
        },
        {
          genre: "liste",
          titre: "Ses écueils",
          items: [
            {
              titre: "Ne pas cadrer, à force de ne pas imposer.",
              texte:
                "C'est le revers direct de sa force. Un enfant a besoin de règles stables pour se sentir libre d'explorer ; une liberté sans structure produit de l'insécurité, pas de l'autonomie.",
            },
            {
              titre: "La disponibilité intermittente.",
              texte:
                "Présent quand l'enfant l'engage sur un sujet, absent sinon. L'enfant en déduit qu'il faut être intéressant pour exister.",
            },
            {
              titre: "Le registre affectif.",
              texte:
                "Il aime intensément, le manifeste peu, et suppose que c'est établi. Un enfant a besoin d'entendre, en mots simples et répétés, ce que son parent tient pour évident.",
            },
            {
              titre: "Le désarroi devant le chaos émotionnel.",
              texte:
                "Face à un enfant de cinq ans qui hurle, il n'y a pas d'argument, et l'autre parent hérite systématiquement de ce registre.",
            },
          ],
        },
        {
          genre: "texte",
          titre: "Ce dont ses enfants *ont besoin*",
          paragraphes: [
            "Qu'il dise ce qu'il tient pour évident, en mots simples, plusieurs fois. Un cadre concret maintenu même quand l'enfant n'en voit pas la logique. Qu'une peur ne soit pas traitée comme une erreur de raisonnement. Et qu'il ne confonde jamais leur intelligence avec leur valeur.",
          ],
        },
      ],
    },
    {
      slug: "carriere",
      titre: "Carrière",
      titreSeo: "INTP (Logicien) : carrière et parcours",
      description:
        "La carrière de l'INTP, sans métiers promis : quatre conditions d'affinité, le piège de la conversion du produit, et son rapport singulier à l'argent.",
      blocs: [
        {
          genre: "texte",
          paragraphes: [
            "Une chose d'abord, parce qu'elle est vraie et que presque personne ne la dit : aucune donnée ne relie un type de personnalité à la réussite professionnelle, l'éditeur historique du MBTI le reconnaît lui-même. On ne trouvera donc ici aucun « métier fait pour vous ». Ce qu'on peut décrire honnêtement, ce sont des affinités : des environnements et des façons de travailler où ce type s'use moins et donne plus.",
          ],
        },
        {
          genre: "texte",
          titre: "Le début de parcours, et *une remarque à contre-courant*",
          paragraphes: [
            "Les tâches juniors, répétitives et de faible enjeu, l'ennuient franchement, et sa motivation tombe vite. Mais ces mêmes tâches lui apprennent ce qu'il n'acquerra nulle part ailleurs : terminer. Une tâche sans intérêt a un mérite, elle n'offre aucune possibilité d'approfondissement infini. Beaucoup d'INTP qui ont tenu deux ans dans un poste ingrat en sortent avec une compétence d'achèvement qu'un environnement uniquement stimulant ne leur aurait jamais donnée.",
          ],
        },
        {
          genre: "texte",
          titre: "Où l'affinité est forte, *et pourquoi*",
          paragraphes: [
            "Tout ce qui consiste à comprendre un système avant d'agir dessus, plutôt qu'à appliquer une procédure : recherche, disciplines formelles, ingénierie, conception logicielle, analyse, expertise, enseignement avancé, conseil indépendant. Mais le secteur compte moins que quatre paramètres : un problème réel, du temps non fragmenté, de l'autonomie sur la méthode, une évaluation sur le contenu. Un INTP peut être à sa place dans un métier manuel exigeant qui réunit ces quatre conditions, et mal dans un poste prestigieux qui ne les réunit pas.",
            "Ce qui l'use, quel que soit le métier : l'agenda fragmenté, qui interdit le seul mode de travail où il produit. Les procédures dont personne ne peut expliquer la raison. La hiérarchie fondée sur le grade. Le compte rendu continu. Les rituels de cohésion. Et il sous-estime systématiquement la visibilité, partant du principe que le travail parle de lui-même, ce qui suppose que quelqu'un le regarde.",
          ],
        },
        {
          genre: "texte",
          titre: "Le piège central du parcours, et *il lui est propre*",
          paragraphes: [
            "Ce n'est pas la promotion vers le management. C'est la conversion du produit : il est recruté pour sa capacité d'analyse, et la valeur reconnue est un livrable daté, exactement le point où son mécanisme interne travaille contre lui.",
            "Ceux qui trouvent un dispositif extérieur de clôture, un associé qui fixe les dates, un client réel, une échéance ferme, produisent énormément. Ceux qui restent seuls face à leur exigence accumulent des travaux que personne ne verra. La différence n'est pas de talent. Elle est d'architecture.",
          ],
        },
        {
          genre: "texte",
          titre: "L'argent",
          paragraphes: [
            "Faiblement moteur, et « un moyen plutôt qu'un but » est encore trop dire : c'est surtout un sujet qu'il ne traite pas. Il ne négocie pas son salaire, non par timidité, mais parce que la négociation lui paraît un exercice de rhétorique sans contenu vérifiable, où gagne celui qui joue le mieux. Indépendant, il sous-facture. Il dépense peu pour le statut, et beaucoup pour un outil ou un accès à de l'information. En revanche, une rémunération qu'il juge disproportionnée par rapport à sa contribution le heurte durablement, non pour la somme, mais parce qu'elle est fausse.",
          ],
        },
        {
          genre: "texte",
          titre: "La réussite et *l'autorité*",
          paragraphes: [
            "Sa réussite se définit selon des critères internes rarement communiqués, formulés comme un état de compréhension plutôt que comme une position. Il peut tenir pour la meilleure année de sa vie une période où son entourage le croyait en échec. Conséquence : difficile à motiver par la promotion, et il quitte parfois des situations enviables sans que quiconque comprenne, y compris lui, sur le moment.",
            "Face à l'autorité, son critère est la compétence, jamais le grade. Mais sa réaction trompe : il n'affronte pas. Il acquiesce, puis contourne, il fait autrement, sans le dire. C'est beaucoup plus difficile à repérer pour une hiérarchie qu'une contestation frontale, et c'est pourquoi il est rarement identifié comme un « problème d'attitude » alors que le désaccord est bien là.",
          ],
        },
      ],
    },
    {
      slug: "habitudes-au-travail",
      titre: "Habitudes au travail",
      titreSeo: "INTP (Logicien) au travail : habitudes et environnements",
      description:
        "L'INTP comme subordonné, collègue et manager, son rapport à l'écrit, et les environnements qui l'éteignent ou le révèlent.",
      blocs: [
        {
          genre: "texte",
          paragraphes: [
            "Le même INTP ne produit pas les mêmes effets selon sa position. Trois angles, puis les environnements.",
          ],
        },
        {
          genre: "texte",
          titre: "Comme subordonné",
          paragraphes: [
            "Il donne son meilleur sur un problème difficile et son pire sur une tâche routinière, avec un écart entre les deux régimes plus grand que chez à peu près n'importe qui. Cela le rend difficile à évaluer : le même collaborateur semble exceptionnel en mars et absent en mai, sans que rien ait changé sauf la nature du travail. Il accepte l'autorité de la compétence et ignore poliment celle du grade, ce n'est pas de l'insubordination, c'est un classement silencieux, souvent perceptible. Il ne demande presque jamais d'aide, et un blocage peut durer des semaines sans que personne le sache. Et il ne signale pas ses désaccords tant qu'il n'en est pas sûr, ce qui produit des objections en retard, une fois la décision prise.",
          ],
        },
        {
          genre: "texte",
          titre: "Comme collègue",
          paragraphes: [
            "Il voit ses collègues d'abord comme des sources : qui sait quoi, qui pense juste, qui peut lui opposer un vrai argument. Il coopère très bien avec celui qui remplit ce rôle, et distraitement avec les autres, sans dissimuler la différence. Il ne participe pas à la vie sociale de l'équipe, ce qui est lu comme du dédain alors que c'est de l'indifférence, deux choses que rien ne distingue de l'extérieur. Il est en revanche d'une honnêteté totale sur le fond : pas d'appropriation du travail d'autrui, pas de coup politique, un avis réel même quand il coûte. Sur la durée : bonne réputation chez ceux qui travaillent avec lui, médiocre chez ceux qui le croisent.",
          ],
        },
        {
          genre: "texte",
          titre: "Comme manager",
          paragraphes: [
            "Il ne cherche pas le pouvoir : il l'accepte quand c'est le prix de l'autonomie. Il délègue volontiers l'administratif pour garder la partie conceptuelle, parfois exactement à l'inverse de ce que le poste demande. Il donne beaucoup de liberté, ce que ses bons éléments apprécient et qui laisse les autres sans repères.",
            "Sa faiblesse principale est double : il exige un niveau élevé et signale l'erreur immédiatement, tout en considérant qu'un travail correct ne mérite pas de commentaire. Son équipe n'entend donc que les corrections, et en déduit qu'il n'est jamais satisfait, alors qu'il l'est souvent, en silence. Ceux qui restent longtemps avec un manager de ce type finissent par comprendre que chez lui, la critique détaillée est une forme de reconnaissance : il ne se donne pas ce mal pour n'importe qui.",
          ],
        },
        {
          genre: "texte",
          titre: "L'écrit *plutôt que l'oral*",
          paragraphes: [
            "Il est meilleur à l'écrit qu'à l'oral, pour une raison précise : à l'écrit, il peut poser les réserves et les cas particuliers, et il a horreur d'affirmer sans qualifier. À l'oral, il produit soit une réponse trop nuancée pour être utile, soit un silence pendant qu'il cherche la formulation exacte.",
          ],
        },
        {
          genre: "texte",
          titre: "Les environnements",
          paragraphes: [
            "Ce qui l'éteint : l'agenda haché, la circulation permanente autour du poste de travail, l'obligation d'être joignable en continu, les réunions de statut, les procédures dont la raison a été perdue, la mesure du travail à la présence, et les milieux où poser une question de fond passe pour une remise en cause personnelle.",
            "Ce qui le révèle : un problème réel et difficile, des blocs de plusieurs heures, l'autonomie complète sur la méthode, un interlocuteur capable de le contredire avec de vrais arguments, et une échéance extérieure ferme mais raisonnable. Ce dernier point est essentiel : il ne demande pas l'absence de contrainte, il demande qu'elle porte sur la date, et non sur le chemin.",
            "Le facteur le plus déterminant, rarement cité : la présence d'une seule personne, dans l'organisation, dont il respecte le raisonnement, pas nécessairement son supérieur. Elle suffit à le tenir dans un environnement médiocre. Et son départ déclenche souvent le sien, dans les six mois.",
            "Un signal d'alerte, utile aux managers : un INTP qui cesse de poser des questions de fond est déjà parti mentalement. Les questions sont chez lui un signe d'investissement, pas de résistance.",
          ],
        },
      ],
    },
    {
      slug: "sous-stress",
      titre: "Sous stress",
      titreSeo: "INTP (Logicien) sous stress : les trois paliers",
      description:
        "L'INTP sous stress : le contournement d'abord, puis les routines-refuges, puis une bascule émotionnelle qui ne lui ressemble pas. Ce qui aide, ce qui aggrave.",
      blocs: [
        {
          genre: "texte",
          paragraphes: [
            "Une précision d'honnêteté avant de commencer : ces portraits du stress par type sont mieux décrits que démontrés. Beaucoup d'INTP s'y reconnaissent fortement, mais rien ne prouve que ces réactions soient plus fréquentes chez eux que chez d'autres. À lire comme un miroir possible, pas comme une fatalité.",
          ],
        },
        {
          genre: "texte",
          titre: "Ce qui le fait *basculer*",
          paragraphes: [
            "Une échéance non négociable sur un travail qu'il juge inachevé. L'obligation de trancher sans avoir compris. Une tension affective prolongée et non nommée. L'exposition sociale continue, sans retrait possible. Et le sentiment d'être évalué par quelqu'un qui n'en a pas les moyens.",
          ],
        },
        {
          genre: "texte",
          titre: "Stress léger : *le contournement*",
          paragraphes: [
            "Repli mental, réponses de plus en plus tardives, travail sur autre chose que ce qui presse. Le contournement est le premier signal, bien avant l'irritation.",
          ],
        },
        {
          genre: "texte",
          titre: "Stress installé : *les routines-refuges*",
          paragraphes: [
            "Dispersion aggravée, activité mentale intense pour un rendement nul, cynisme inhabituel. Il retourne à des routines de confort qui consomment des journées, réorganiser des fichiers, refaire un système de classement, et rumine des erreurs anciennes sans rapport avec le présent.",
          ],
        },
        {
          genre: "texte",
          titre: "Débordement : *une émotion qui ne lui ressemble pas*",
          paragraphes: [
            "Quand il craque, c'est par là où on ne l'attend pas, et ce qui frappe est le contraste. Quelqu'un d'ordinairement peu affecté par le jugement d'autrui devient préoccupé de ce qu'on pense de lui, hypersensible à une remarque anodine, ou expansif dans une émotion qui ne lui ressemble pas et qui le surprend lui-même.",
            "Vu de l'extérieur : une disparition progressive, des messages sans réponse, une présence sans présence réelle, puis une sortie verbale hors de proportion.",
          ],
        },
        {
          genre: "texte",
          titre: "Ce qui aide, *ce qui aggrave*",
          paragraphes: [
            "Ce qui aide : un problème circonscrit et soluble, qui lui rend la main, ce n'est pas de l'évitement, c'est une reprise d'appui. Une contrainte extérieure douce et non négociable, qui lui épargne la décision. Du sommeil, et de la régularité matérielle.",
            "Ce qui aggrave, et que l'entourage fait spontanément : lui demander où il en est. Lui rappeler l'échéance. Exiger une émotion immédiate.",
          ],
        },
      ],
    },
    {
      slug: "enfant",
      titre: "L'INTP enfant",
      titreSeo: "L'enfant INTP : le comprendre et l'accompagner",
      description:
        "L'INTP enfant : « pourrait mieux faire », l'autorité questionnée prise pour de l'insolence, et le double risque de cette période.",
      blocs: [
        {
          genre: "texte",
          paragraphes: [
            "Un préalable honnête : l'enfance par type est très peu documentée. Ce qui suit est la partie la plus cohérente de ce qui se rapporte régulièrement, à lire comme un portrait vraisemblable, pas comme un résultat établi.",
          ],
        },
        {
          genre: "texte",
          titre: "L'enfant qui demande *sur quoi l'autorité se fonde*",
          paragraphes: [
            "Souvent décrit comme rêveur, distrait, en retard sur les consignes et en avance sur les questions. Il ne conteste pas l'autorité par provocation : il demande sur quoi elle se fonde, ce qui est reçu comme de l'insolence. Et « parce que c'est comme ça » ne produit pas de l'obéissance, mais le classement définitif de l'adulte parmi les sources non fiables.",
          ],
        },
        {
          genre: "texte",
          titre: "« Pourrait mieux faire s'il faisait des efforts »",
          paragraphes: [
            "Son rapport à l'école est structurellement inégal : excellent là où le sujet l'attrape, médiocre ailleurs, et l'écart est si visible qu'il alimente l'appréciation la plus fréquente le concernant. Le problème, c'est que le sens de l'effort lui échappe réellement : dans le domaine qui le prend, il travaille énormément sans avoir l'impression d'en fournir. La question « pourquoi tu ne fais pas d'efforts » n'a littéralement pas de sens pour lui.",
          ],
        },
        {
          genre: "texte",
          titre: "La solitude n'est pas son problème, *l'interruption l'est*",
          paragraphes: [
            "Il joue seul longuement, démonte, lit, invente des systèmes de règles. Les adultes s'inquiètent de son isolement bien plus qu'il n'en souffre. En revanche, une journée entièrement organisée par d'autres l'épuise plus qu'elle ne l'occupe.",
          ],
        },
        {
          genre: "texte",
          titre: "Le double risque de *cette période*",
          paragraphes: [
            "Le premier : que son intelligence devienne son identité entière, parce que c'est ce pour quoi on le félicite. Le second, plus spécifique : qu'il apprenne très tôt que sa manière de fonctionner est un défaut à corriger. Un enfant à qui l'on répète pendant dix ans qu'il est désorganisé et trop dans sa tête arrive à l'âge adulte avec une compétence intacte et une confiance abîmée.",
          ],
        },
        {
          genre: "texte",
          titre: "Ce dont cet enfant *a besoin*",
          paragraphes: [
            "Qu'on réponde vraiment à ses questions. Un cadre concret qu'on ne rejustifie pas à chaque fois. Et des plages non organisées.",
          ],
        },
      ],
    },
    {
      slug: "compatibilites",
      titre: "Compatibilités",
      titreSeo: "Compatibilités de l'INTP (Logicien) : ce qui allège, ce qui frotte",
      description:
        "La compatibilité amoureuse de l'INTP, sans tableau bidon : ce qui allège la relation, les frictions prévisibles, et le cas de deux INTP.",
      blocs: [
        {
          genre: "texte",
          titre: "Le cadre, *dit franchement*",
          paragraphes: [
            "Personne ne peut promettre qu'un couple fonctionnera sur la base de deux codes à quatre lettres, et les tableaux de compatibilité par paires qu'on trouve ailleurs n'ont aucune base. Côté vie amoureuse, il n'existe tout simplement pas d'étude sérieuse, ni dans un sens ni dans l'autre. Ce qu'on peut faire d'honnête, c'est décrire des mécanismes : ce qui, chez un partenaire, allège ou alourdit le fonctionnement propre de l'INTP.",
          ],
        },
        {
          genre: "liste",
          titre: "Ce qui allège la relation, *et pourquoi*",
          items: [
            {
              titre: "Un partenaire qui prend en charge le concret sans en faire un reproche moral.",
              texte:
                "Échéances, papiers et anniversaires cessent d'être un terrain de conflit, et il le vit comme un soulagement, pas comme une humiliation.",
            },
            {
              titre: "Un partenaire à l'aise dans l'abstrait.",
              texte: "La conversation qui le nourrit ne demande alors aucune traduction.",
            },
            {
              titre: "Un partenaire qui exprime ses besoins explicitement.",
              texte:
                "L'implicite est le seul canal qu'il ne reçoit pas. Ici, la clarté vaut mieux que la délicatesse, et c'est presque toujours découvert trop tard.",
            },
          ],
        },
        {
          genre: "liste",
          titre: "Les frictions *prévisibles*",
          items: [
            {
              titre: "Avec les profils très expressifs.",
              texte:
                "La boucle est mécanique : la demande d'expression produit du retrait, le retrait produit plus de demande.",
            },
            {
              titre: "Avec les profils très structurés.",
              texte:
                "Le conflit ne porte pas sur l'affection mais sur le temps : engagements oubliés, plans changés au dernier moment, désordre matériel. C'est un désaccord d'unité de mesure, pas de valeurs, et il s'use rarement seul.",
            },
          ],
        },
        {
          genre: "texte",
          titre: "Le cas de *deux INTP*",
          paragraphes: [
            "Compréhension immédiate, aucune obligation de performance sociale, un plaisir de conversation rare. Le risque propre est très concret : personne ne prend en charge le calendrier, l'administration ni la vie sociale du couple. La relation ne se casse pas sur un conflit, elle s'ensable.",
          ],
        },
        {
          genre: "texte",
          titre: "Le malentendu structurel avec *les profils très chaleureux*",
          paragraphes: [
            "Ce sont souvent eux qui l'attirent, parce qu'ils traduisent le monde social qu'il ne lit pas. Et ce sont eux qui souffrent le plus, parce qu'ils attendent en retour ce qu'il produit le moins bien. L'attirance et la difficulté viennent de la même source.",
          ],
        },
        {
          genre: "texte",
          titre: "Ce qui compte *davantage que le type de l'autre*",
          paragraphes: [
            "Que le partenaire ne lise pas le silence comme un message, chez lui, il n'en est presque jamais un. Qu'il demande explicitement, plutôt que de laisser deviner. Et qu'il apprenne à lire les preuves d'attachement dans le registre où ce type les produit : la disponibilité, la mémoire précise, l'objet réparé, pas la déclaration.",
          ],
        },
      ],
    },
    {
      slug: "conclusion",
      titre: "Conclusion",
      titreSeo: "INTP (Logicien) : conclusion, le prix de ne jamais conclure",
      description:
        "Le fil du portrait INTP, ce que veut dire son silence, et ce que grandir veut dire pour ce type : quatre leviers concrets, avec leurs pièges.",
      blocs: [
        {
          genre: "texte",
          titre: "Le fil, *pour finir*",
          paragraphes: [
            "Tout ce portrait tient sur un mécanisme et son prix. Le mécanisme : un système intérieur d'une précision rare, dont le critère est la non-contradiction. Le prix : ce système ne sort presque jamais, et cette non-sortie lui coûte d'abord à lui. Là où d'autres types sont jugés sur leurs effets, l'INTP est jugé sur son absence d'effets : des travaux excellents à 90 % que personne ne verra, des réponses exactes arrivées trop tard, une affection réelle jamais formulée.",
          ],
        },
        {
          genre: "texte",
          titre: "Pour ses proches : ce que veut dire *son silence*",
          paragraphes: [
            "Les questions qu'on se pose sur ce type viennent surtout de son entourage, et elles tournent autour de la fiabilité : pourquoi il ne répond pas, ce que veut dire son silence, s'il aime vraiment. La réponse honnête tient en trois points. Son silence ne veut presque jamais rien dire, c'est le trait le plus contre-intuitif du type. Son affection est établie de son point de vue, et il suppose que c'est visible. Et sa fiabilité est réelle sur le fond, il ne trahit pas, ne s'approprie rien, dit ce qu'il pense, et défaillante sur les formes : messages, dates, présence. Confondre les deux, c'est se tromper sur la personne.",
          ],
        },
        {
          genre: "liste",
          titre: "Ce que *grandir* veut dire pour ce type",
          intro:
            "Pas devenir plus organisé. Grandir, pour un INTP, c'est cesser de traiter comme des impuretés trois choses qui n'en sont pas : l'approximation, l'échéance, et l'émotion des autres. Quatre leviers concrets, chacun avec son piège :",
          items: [
            {
              titre: "Traiter l'achèvement comme une compétence distincte.",
              texte:
                "Comprendre n'est pas produire, et la seconde opération ne s'obtient pas en poussant la première plus loin. Finir est un problème technique, ce qu'il sait résoudre, pas un défaut de caractère, contre lequel il ne peut rien. Le piège : raffiner un système de productivité, qui devient le chantier inachevé suivant.",
            },
            {
              titre: "La version 80 %.",
              texte:
                "Un objet livré et imparfait produit du retour, et un retour est de l'information, exactement ce qu'il cherche. C'est l'argument qui marche sur ce type, parce qu'il ne lui demande pas de renoncer à l'exactitude, mais de changer la voie qui y mène. Le piège : livrer en s'excusant, avec la liste de tout ce qui manque, ce qui annule le bénéfice.",
            },
            {
              titre: "L'émotion comme donnée.",
              texte:
                "Non pas ressentir davantage, mais admettre que l'état affectif d'un interlocuteur est un fait du problème, au même titre qu'une contrainte technique. Il ne renie rien de sa méthode, il en étend le domaine. Le piège : lire quatre livres sur la question, en tirer une théorie élégante, et n'avoir toujours demandé à personne comment il allait.",
            },
            {
              titre: "Dire les choses tôt.",
              texte:
                "Signaler un désaccord quand il pèse trois grammes plutôt que trois kilos. Meilleur rapport effort-résultat de la liste, et le moins pratiqué, parce qu'il exige de parler avant d'être certain. Corollaire : choisir ses objections, corriger une imprécision sans conséquence coûte un capital dont il aura besoin ailleurs.",
            },
          ],
        },
        {
          genre: "texte",
          titre: "Ce qui déclenche *le mouvement*",
          paragraphes: [
            "Rarement une résolution. Presque toujours le constat, répété assez de fois pour ne plus être écartable, que quelqu'un de moins compétent a livré, et que c'est la version livrée qui existe. Le moment charnière est celui où il comprend qu'il avait raison, et que ça n'a servi à personne.",
            "Et le signe qu'il a mûri tient en une phrase : il a compris qu'un travail livré à 80 % existe, et qu'un travail parfait dans sa tête n'existe pas.",
          ],
        },
        {
          genre: "texte",
          titre: "Une dernière chose",
          paragraphes: [
            "Ce portrait décrit un type, les grandes lignes que partagent ceux qui s'y reconnaissent. Il ne dit pas où toi, tu te situes sur chaque spectre, ni avec quelle intensité, ni laquelle des trois variantes du type te correspond. Ça, c'est ce que mesure le test.",
          ],
        },
      ],
    },
  ],
};

// -----------------------------------------------------------------------------
// Accès
// -----------------------------------------------------------------------------

export const CONTENUS_TYPES: Record<string, ContenuType> = {
  INFJ,
  ENFP,
  INTP,
};

export function getContenuType(code: string): ContenuType | undefined {
  return CONTENUS_TYPES[code.toUpperCase()];
}

export function getPageDeType(code: string, slug: string): PageDeType | undefined {
  return getContenuType(code)?.pages.find((p) => p.slug === slug);
}

/** Codes (en minuscules) des types qui possèdent une page donnée, pour generateStaticParams. */
export function typesAvecPage(slug: string): { code: string }[] {
  return Object.keys(CONTENUS_TYPES)
    .filter((code) => CONTENUS_TYPES[code].pages.some((p) => p.slug === slug))
    .map((code) => ({ code: code.toLowerCase() }));
}
