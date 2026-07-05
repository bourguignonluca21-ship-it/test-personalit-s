import Link from "next/link";

/*
 * LE CHEMIN DE PROGRESSION du parcours relationnel solo (composant partagé) :
 * utilisé par la page /relations/seul ET par la fenêtre qui s'ouvre depuis
 * l'onglet Relations du profil (profil/FenetreParcours.tsx).
 * Une ligne verticale relie tous les modules ; les actes sont des jalons,
 * le module EN COURS est une grande carte mise en avant, les verrouillés
 * sont de vraies cartes qui vendent (titre + teaser + cadenas vert pâle).
 * Les TITRES et le déroulé restent un ÉCHANTILLON — les briques réelles
 * (personnalisées par profil) viendront avec le chantier contenu
 * (cf. VISION_RELATIONS_PARCOURS.md).
 */

const VERT = "rgba(51,164,116,0.85)";
const INK = "rgba(0,0,0,0.75)";

type EtatModule = "fait" | "en-cours" | "verrouille";

/* L'état d'un module est CALCULÉ à partir du nombre de modules finis :
   fini → coche, le suivant → en cours, le reste → verrouillé. */
function etatDe(n: number, faits: number): EtatModule {
  if (n <= faits) return "fait";
  if (n === faits + 1) return "en-cours";
  return "verrouille";
}

const ACTES: {
  numero: number;
  titre: string;
  sousLigne: string;
  modules: {
    n: number;
    titre: string;
    duree: string;
    accroche?: string;
    /* La ligne teaser d'un module pas encore ouvert : elle VEND le module
       (une phrase, italique sous le titre), sans rien révéler du contenu. */
    teaser?: string;
  }[];
}[] = [
  {
    numero: 1,
    titre: "Ta façon d'aimer",
    sousLigne: "Avant de comprendre ce qui se répète, il faut voir comment tu aimes.",
    modules: [
      {
        n: 1,
        titre: "Ce que tu cherches vraiment dans un lien",
        duree: "7 min",
        accroche:
          "Ce que tu cherches chez l'autre, ce qui te rassure, ce qui te manque vite : le point de départ de tout le parcours.",
      },
      {
        n: 2,
        titre: "Ce qui te fait fuir, et ce que ça protège",
        duree: "6 min",
        teaser: "Tes distances ne sont pas des défauts, elles ont une histoire.",
      },
      {
        n: 3,
        titre: "Toi, quand la relation tangue",
        duree: "8 min",
        teaser: "Tes réflexes dans la tempête, posés noir sur blanc.",
      },
    ],
  },
  {
    numero: 2,
    titre: "Ce qui se répète",
    sousLigne: "Les scénarios qui se rejouent, enfin visibles.",
    modules: [
      {
        n: 4,
        titre: "Ton style d'attachement",
        duree: "10 min",
        teaser: "Anxieux, évitant, sécure : ce que ton profil en dit.",
      },
      {
        n: 5,
        titre: "Le rôle que tu endosses sans le choisir",
        duree: "8 min",
        teaser: "Le sauveur, le fort, le discret : et toi ?",
      },
      {
        n: 6,
        titre: "Ce qui te fait réagir au quart de tour",
        duree: "7 min",
        teaser: "Tes déclencheurs, et ce qu'ils racontent.",
      },
      {
        n: 7,
        titre: "Le scénario qui se rejoue",
        duree: "9 min",
        teaser: "Le fil rouge de tes relations, enfin visible.",
      },
    ],
  },
  {
    numero: 3,
    titre: "Reprendre la main",
    sousLigne: "Un levier à la fois, dans ta vraie vie.",
    modules: [
      {
        n: 8,
        titre: "Poser une limite sans culpabiliser",
        duree: "8 min",
        teaser: "Dire non, et rester en lien.",
      },
      {
        n: 9,
        titre: "Dire ce dont tu as besoin, simplement",
        duree: "7 min",
        teaser: "Sans détour, sans t'excuser.",
      },
      {
        n: 10,
        titre: "Choisir, au lieu de reproduire",
        duree: "8 min",
        teaser: "Le moment où le schéma s'arrête.",
      },
      {
        n: 11,
        titre: "Faire tenir le changement",
        duree: "6 min",
        teaser: "Que ça dure plus loin que la bonne résolution.",
      },
      {
        n: 12,
        titre: "Le chemin parcouru",
        duree: "5 min",
        teaser: "Ce qui a bougé depuis le module 1.",
      },
    ],
  },
];

/* Pastille d'état d'un module sur le chemin. */
function IconeEtat({ etat }: { etat: EtatModule }) {
  if (etat === "fait") {
    /* Validé : COCHE de validation dans un cercle vert. */
    return (
      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full" style={{ background: VERT }}>
        <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="#fff" strokeWidth="2.5">
          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    );
  }
  if (etat === "en-cours") {
    /* En cours : cercle VIDE (plus de point au milieu, demande Luca). */
    return (
      <span
        className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white"
        style={{ border: `2px solid ${VERT}` }}
      />
    );
  }
  /* Verrouillé : cadenas VERT sur pastille vert pâle (comme la galerie
     Mes profils), plus vivant que le gris. */
  return (
    <span
      className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full"
      style={{ background: "rgba(51,164,116,0.12)" }}
    >
      <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke={VERT} strokeWidth="2.2">
        <rect x="5" y="11" width="14" height="9" rx="2" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      </svg>
    </span>
  );
}

/* Un tronçon vertical du chemin. Décision Luca : le TRAIT est invisible
   (seuls les ronds restent) ; on garde les tronçons comme espaceurs pour ne
   pas bouger la position verticale des pastilles. */
function Troncon({ vert, haut }: { vert: boolean; haut?: number }) {
  void vert; // la couleur ne sert plus (trait masqué), la logique reste branchée
  return (
    <span
      className={haut === undefined ? "w-[2px] flex-1" : "w-[2px] flex-shrink-0"}
      style={{ background: "transparent", height: haut }}
    />
  );
}

/* Progression de réalisation des modules (pour le cercle de l'en-tête de la
   fenêtre). Règle validée par Luca : seuls les modules FINIS comptent
   (un en-cours vaut 0, rien tant que ce n'est pas terminé). */
export function progressionModules(faits: number = 0): number {
  const total = ACTES.reduce((acc, a) => acc + a.modules.length, 0);
  return Math.round((Math.min(faits, total) / total) * 100);
}

/* Titre + durée d'un module (pour l'en-tête de la vue module de la fenêtre). */
export function infosModule(n: number): { titre: string; duree: string } | null {
  const m = ACTES.flatMap((a) => a.modules).find((mod) => mod.n === n);
  return m ? { titre: m.titre, duree: m.duree } : null;
}

export default function CheminParcours({
  onOuvrirModule,
  faits = 0,
}: {
  /* Fourni par la FENÊTRE du parcours : le clic sur un module ouvert
     (en cours ou fait) reste alors DANS la fenêtre (pas de navigation).
     Absent sur la page /relations/seul : les cartes restent des liens. */
  onOuvrirModule?: (n: number) => void;
  /* Nombre de modules terminés : pilote l'avancée du chemin (ligne verte,
     coches, module suivant débloqué). Visuel pour l'instant, sera branché
     sur la table parcours_progression. */
  faits?: number;
} = {}) {
  /* Le chemin, aplati : jalons d'acte + modules, avec pour chacun son état
     calculé et « atteint » (la ligne est verte jusque là, grise après). */
  type Item =
    | { type: "acte"; acte: (typeof ACTES)[number]; atteint: boolean }
    | {
        type: "module";
        m: (typeof ACTES)[number]["modules"][number];
        etat: EtatModule;
        atteint: boolean;
      };
  const items: Item[] = [];
  for (const acte of ACTES) {
    items.push({ type: "acte", acte, atteint: etatDe(acte.modules[0].n, faits) !== "verrouille" });
    for (const m of acte.modules) {
      const etat = etatDe(m.n, faits);
      items.push({ type: "module", m, etat, atteint: etat !== "verrouille" });
    }
  }

  return (
    /* marginLeft -56 : la COLONNE DU CHEMIN (36 px + 20 d'écart) sort dans
       la marge de gauche → les cartes et les titres d'acte tombent PILE sur
       l'axe du texte (titre de la fenêtre, contenu du module, bords du bloc). */
    <div style={{ marginLeft: -56 }}>
      {items.map((item, i) => {
        const premier = i === 0;
        const dernier = i === items.length - 1;
        /* Le tronçon qui ARRIVE sur un point est vert si ce point est
           atteint ; celui qui en REPART est vert si le point suivant l'est. */
        const vertHaut = item.atteint;
        const vertBas = !dernier && items[i + 1].atteint;

        return (
          <div key={i} className="flex gap-5">
            {/* La colonne du chemin : tronçon, pastille, tronçon */}
            <div className="flex w-9 flex-col items-center">
              <Troncon vert={vertHaut} haut={premier ? 0 : item.type === "acte" ? 40 : 14} />
              {/* Plus de rond numéroté pour les actes (le numéro vit dans le
                  titre), et plus AUCUNE pastille dans la colonne : les états
                  vivent DANS les cartes (fait = cercle-flèche à droite,
                  en cours et cadenas = bas droite). L'espaceur garde le
                  rythme de la colonne. */}
              {item.type === "module" && (
                <span className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
              )}
              {!dernier && <Troncon vert={vertBas} />}
            </div>

            {/* Le contenu à droite du chemin */}
            {item.type === "acte" ? (
              <div className={premier ? "pb-6" : "pt-10 pb-6"}>
                <h2 className="text-xl font-bold" style={{ color: INK }}>
                  {/* Numéro + point en VERT, collés au titre (pas d'espace) */}
                  <span style={{ color: VERT }}>{item.acte.numero}.</span>
                  {item.acte.titre}
                </h2>
                <p className="mt-1 text-sm text-gray-500">{item.acte.sousLigne}</p>
              </div>
            ) : item.etat === "en-cours" ? (
              /* LE module en cours : grande carte mise en avant. Dans la
                 fenêtre (onOuvrirModule) : bouton qui ouvre le module SUR
                 PLACE ; sur la page : lien classique. */
              <div className="flex-1 pb-6 pt-1">
                {(() => {
                  const classes =
                    "relative block w-full text-left rounded-2xl border-2 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:scale-[1.01] cursor-pointer";
                  const interieur = (
                    <>
                      <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: VERT }}>
                        Module {item.m.n} · En cours · {item.m.duree}
                      </p>
                      <p className="mt-2 text-lg font-bold" style={{ color: INK }}>
                        {item.m.titre}
                      </p>
                      {(item.m.accroche ?? item.m.teaser) && (
                        <p className="mt-2 text-sm leading-relaxed text-gray-500">
                          {item.m.accroche ?? item.m.teaser}
                        </p>
                      )}
                      <span
                        className="mt-5 inline-block rounded-full px-5 py-2.5 text-sm font-semibold text-white"
                        style={{ background: VERT }}
                      >
                        Continuer
                      </span>
                      {/* Pastille « en cours » en bas à droite de la carte
                          (demande Luca, comme le cadenas des verrouillés) */}
                      <span className="absolute bottom-4 right-4">
                        <IconeEtat etat="en-cours" />
                      </span>
                    </>
                  );
                  return onOuvrirModule ? (
                    <button
                      type="button"
                      onClick={() => onOuvrirModule(item.m.n)}
                      className={classes}
                      style={{ borderColor: VERT }}
                    >
                      {interieur}
                    </button>
                  ) : (
                    <Link href="/relations/seul/module-1" className={classes} style={{ borderColor: VERT }}>
                      {interieur}
                    </Link>
                  );
                })()}
              </div>
            ) : item.etat === "fait" ? (
              /* Module terminé : carte sobre, revisitable */
              <div className="flex-1 pb-4">
                {(() => {
                  const classes =
                    "flex w-full items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md cursor-pointer";
                  const interieur = (
                    <>
                      <span className="text-sm font-semibold" style={{ color: INK }}>
                        {item.m.n}. {item.m.titre}
                      </span>
                      {/* Cercle-flèche de validation à droite (remplace la
                          durée, demande Luca) */}
                      <IconeEtat etat="fait" />
                    </>
                  );
                  return onOuvrirModule ? (
                    <button type="button" onClick={() => onOuvrirModule(item.m.n)} className={classes}>
                      {interieur}
                    </button>
                  ) : (
                    <Link href="/relations/seul/module-1" className={classes}>
                      {interieur}
                    </Link>
                  );
                })()}
              </div>
            ) : (
              /* Module verrouillé : une VRAIE carte qui vend (titre plein
                 + ligne teaser en italique), pas une ligne morte. */
              <div className="flex-1 pb-4">
                <div className="relative rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-semibold" style={{ color: INK }}>
                      {item.m.n}. {item.m.titre}
                    </span>
                    <span className="flex-shrink-0 text-xs font-semibold" style={{ color: VERT }}>
                      {item.m.duree}
                    </span>
                  </div>
                  {item.m.teaser && (
                    /* pr-10 : réserve le coin bas droit pour le cadenas */
                    <p className="mt-1.5 pr-10 text-sm italic leading-relaxed text-gray-500">
                      {item.m.teaser}
                    </p>
                  )}
                  {/* Cadenas en bas à droite de la carte (demande Luca) */}
                  <span className="absolute bottom-4 right-4">
                    <IconeEtat etat="verrouille" />
                  </span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
