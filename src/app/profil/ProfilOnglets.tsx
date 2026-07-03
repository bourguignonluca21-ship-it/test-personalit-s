"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/*
 * Les onglets de la page profil (structure validée : Mes profils / Relations /
 * Développement / L'IA / Paramètres).
 * Les 5 blocs sont des BOUTONS : cliquer change le contenu affiché en dessous
 * (pas de navigation). « Mes profils » reçoit la galerie construite côté
 * serveur (prop children) ; les 4 autres affichent pour l'instant un
 * état d'attente qui vend la promesse (leçon 16P), à remplacer au fur et
 * à mesure qu'on construit chaque partie.
 */

const VERT = "rgba(51,164,116,0.85)";
const INK = "rgba(0,0,0,0.75)";

const ONGLETS = [
  { id: "profils", titre: "Mes profils", sousLigne: "Tes résultats de tests" },
  { id: "relations", titre: "Relations", sousLigne: "Compare-toi à tes proches" },
  { id: "developpement", titre: "Développement", sousLigne: "Ton parcours sur mesure" },
  { id: "ia", titre: "L'IA", sousLigne: "Discute avec ton profil" },
  { id: "parametres", titre: "Paramètres", sousLigne: "Ton compte, tes choix" },
] as const;

type OngletId = (typeof ONGLETS)[number]["id"];

/* État d'attente d'une partie pas encore construite. */
function EnConstruction({ titre, texte }: { titre: string; texte: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-gray-200 bg-white/60 p-8 text-left">
      <p className="text-2xl font-bold" style={{ color: INK }}>
        {titre}
      </p>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-gray-500">{texte}</p>
      <span className="mt-5 inline-block rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-400">
        En construction
      </span>
    </div>
  );
}

/* Flèche ronde de défilement (même patron que le carrousel des réseaux
   sociaux du résumé) : verte, s'estompe quand on est au bout. */
function Fleche({ cote, actif, onClick }: { cote: "g" | "d"; actif: boolean; onClick: () => void }) {
  const gauche = cote === "g";
  return (
    <button
      type="button"
      aria-label={gauche ? "Onglets précédents" : "Onglets suivants"}
      onClick={onClick}
      disabled={!actif}
      style={{
        position: "absolute",
        top: 92, // milieu de la HAUTEUR DES BLOCS (184/2), pas du conteneur (qui inclut les cercles)
        transform: "translateY(-50%)",
        left: gauche ? -17 : undefined,
        right: gauche ? undefined : -17,
        width: 34,
        height: 34,
        borderRadius: "50%",
        background: VERT,
        border: "none",
        boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
        display: "grid",
        placeItems: "center",
        cursor: actif ? "pointer" : "default",
        opacity: actif ? 1 : 0,
        pointerEvents: actif ? "auto" : "none",
        transition: "opacity 0.2s ease",
        zIndex: 2,
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d={gauche ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} />
      </svg>
    </button>
  );
}

/* Cercle de progression : anneau vert qui se remplit + % au centre.
   Incite à compléter son profil (effet « profil complété à X % »).
   Exporté : sert aussi au % global du héros (page.tsx). */
export function CercleProgression({ pct, taille = 48 }: { pct: number; taille?: number }) {
  const R = 20;
  const C = 2 * Math.PI * R; // circonférence

  // Animation de chargement : l'anneau ET le nombre montent de 0 jusqu'au
  // % réel (900 ms, décélération douce), via rAF. Rejouée au survol.
  const [affiche, setAffiche] = useState(0);
  const [survol, setSurvol] = useState(false);
  const rafRef = useRef(0);
  function lancerAnimation() {
    cancelAnimationFrame(rafRef.current);
    const debut = performance.now();
    const DUREE = 900;
    const tick = (t: number) => {
      const avancee = Math.min(1, (t - debut) / DUREE);
      const ease = 1 - Math.pow(1 - avancee, 3); // ease-out cubic
      setAffiche(pct * ease);
      if (avancee < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }
  useEffect(() => {
    lancerAnimation();
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pct]);

  return (
    <svg
      width={taille}
      height={taille}
      viewBox="0 0 48 48"
      aria-label={`Complété à ${pct} %`}
      onMouseEnter={() => {
        setSurvol(true);
        lancerAnimation(); // la progression se recharge comme à l'arrivée
      }}
      onMouseLeave={() => setSurvol(false)}
      style={{
        transform: survol ? "scale(1.18)" : "scale(1)",
        transition: "transform .6s ease",
      }}
    >
      <circle cx="24" cy="24" r={R} fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="4" />
      <circle
        cx="24"
        cy="24"
        r={R}
        fill="none"
        stroke={VERT}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={C}
        strokeDashoffset={C * (1 - affiche / 100)}
        transform="rotate(-90 24 24)"
      />
      <text
        x="24"
        y="25"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="11"
        fontWeight="700"
        fill={INK}
      >
        {Math.round(affiche)}%
      </text>
    </svg>
  );
}

export default function ProfilOnglets({
  progression,
  children,
}: {
  progression: Record<string, number>;
  children: ReactNode;
}) {
  const [actif, setActif] = useState<OngletId>("profils");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [peutG, setPeutG] = useState(false);
  const [peutD, setPeutD] = useState(false);

  // Met à jour l'état des flèches selon la position de scroll.
  function majFleches() {
    const el = scrollRef.current;
    if (!el) return;
    setPeutG(el.scrollLeft > 1);
    setPeutD(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  }

  useEffect(() => {
    majFleches();
    window.addEventListener("resize", majFleches);
    return () => window.removeEventListener("resize", majFleches);
  }, []);

  // Défilement d'environ une carte par clic (242,7 + 20 d'écart).
  function defiler(sens: 1 | -1) {
    scrollRef.current?.scrollBy({ left: sens * 263, behavior: "smooth" });
  }

  // Au clic sur un bloc : descendre en douceur jusqu'à sa section.
  // Défilement maison via rAF, comme smoothCenter de la page test. PIÈGE : le
  // scroll-behavior:smooth GLOBAL (globals.css) interfère avec un scrollTo par
  // frame (mouvement « en plusieurs temps ») → on le coupe pendant l'animation.
  const contenuRef = useRef<HTMLDivElement>(null);
  const animRef = useRef(0);
  function defilerVersContenu() {
    const el = contenuRef.current;
    if (!el) return;
    cancelAnimationFrame(animRef.current); // une descente déjà en cours ? on repart proprement
    const root = document.documentElement;
    const prevBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    const cible = el.getBoundingClientRect().top + window.scrollY - 80; // marge sous la navbar (90 − 10 : descend 10 px plus bas)
    const depart = window.scrollY;
    const distance = cible - depart;
    const DUREE = 650;
    const t0 = performance.now();
    const tick = (t: number) => {
      const avancee = Math.min(1, (t - t0) / DUREE);
      const ease = 1 - Math.pow(1 - avancee, 3);
      window.scrollTo(0, depart + distance * ease);
      if (avancee < 1) animRef.current = requestAnimationFrame(tick);
      else root.style.scrollBehavior = prevBehavior;
    };
    animRef.current = requestAnimationFrame(tick);
  }

  // Disparition des blocs (+ leurs cercles) : PAS liée au scroll en continu.
  // Quand « 1. Mes profils » (le haut du contenu) franchit les 70 px sous la
  // navbar (~57 px), le fondu se déclenche et se joue en entier tout seul
  // (transition CSS) ; en remontant au-dessus du seuil, ils réapparaissent.
  const POINT_DISPARITION = 57 + 170;
  const [blocsVisibles, setBlocsVisibles] = useState(true);
  // Et symétriquement : le CONTENU disparaît en douceur quand, en remontant,
  // les cercles de progression des parties (bas du carrousel) arrivent à
  // 100 px du bas de l'écran. Il réapparaît quand on redescend.
  const carrouselRef = useRef<HTMLDivElement>(null);
  const [contenuVisible, setContenuVisible] = useState(false);
  useEffect(() => {
    function majVisibilite() {
      const contenu = contenuRef.current;
      if (contenu) {
        setBlocsVisibles(contenu.getBoundingClientRect().top > POINT_DISPARITION);
      }
      const carrousel = carrouselRef.current;
      if (carrousel) {
        setContenuVisible(
          carrousel.getBoundingClientRect().bottom <= window.innerHeight - 200,
        );
      }
    }
    majVisibilite();
    window.addEventListener("scroll", majVisibilite, { passive: true });
    window.addEventListener("resize", majVisibilite);
    return () => {
      window.removeEventListener("scroll", majVisibilite);
      window.removeEventListener("resize", majVisibilite);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const numero = ONGLETS.findIndex((o) => o.id === actif) + 1;
  const ongletActif = ONGLETS[numero - 1];

  return (
    <>
      {/* Le carrousel d'onglets : 3 cartes visibles (le conteneur max-w-3xl
          fait pile 3 × 242,7 px + 2 écarts), les autres arrivent en scrollant
          ou avec les flèches — même patron que les icônes réseaux du résumé.
          Cartes = taille EXACTE des cartes « Étape » du test (242,7 × 184). */}
      <div
        ref={carrouselRef}
        className="relative"
        style={{
          opacity: blocsVisibles ? 1 : 0,
          transition: "opacity .45s ease",
          pointerEvents: blocsVisibles ? "auto" : "none",
        }}
      >
        <style>{`.po-scroll::-webkit-scrollbar{display:none}`}</style>
        <Fleche cote="g" actif={peutG} onClick={() => defiler(-1)} />
        <Fleche cote="d" actif={peutD} onClick={() => defiler(1)} />
        <div
          ref={scrollRef}
          onScroll={majFleches}
          className="po-scroll flex gap-5 overflow-x-auto"
          style={{ scrollbarWidth: "none" }}
        >
          {ONGLETS.map((o) => {
            const estActif = o.id === actif;
            return (
              <div key={o.id} className="flex flex-shrink-0 flex-col items-center">
              <button
                type="button"
                onClick={() => {
                  setActif(o.id);
                  defilerVersContenu();
                }}
                className={`rounded-3xl p-6 w-[242.7px] min-h-[184px] text-left transition-all cursor-pointer border ${
                  estActif
                    ? "shadow-md border-transparent"
                    : "bg-white border-gray-100 shadow-sm hover:shadow-md hover:scale-[1.02]"
                }`}
                /* Le vert de marque est translucide (0.85) : posé seul, il
                 laisserait transparaître le dégradé du bandeau derrière le
                 bloc. On le superpose à une base blanche → même couleur
                 rendue, mais opaque. */
              style={
                estActif
                  ? { background: `linear-gradient(${VERT}, ${VERT}), #fff` }
                  : undefined
              }
              >
                <h3
                  className={`font-bold text-base mb-1.5 leading-snug ${estActif ? "text-white" : ""}`}
                  style={estActif ? undefined : { color: VERT }}
                >
                  {o.titre}
                </h3>
                <p
                  className={`text-sm leading-relaxed ${estActif ? "text-white/80" : ""}`}
                  style={estActif ? undefined : { color: "rgba(51,164,116,0.65)" }}
                >
                  {o.sousLigne}
                </p>
              </button>
              {/* Cercle de progression : centré sur l'axe du bloc, et centré
                  verticalement entre le bas des blocs (620 px du haut de page,
                  mesuré) et le bas de l'écran visible (100vh). */}
              <div style={{ marginTop: "max(16px, calc((100vh - 668px) / 2))" }}>
                <CercleProgression pct={progression[o.id] ?? 0} />
              </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Le contenu de l'onglet actif — commence 30 px sous les cercles de
          progression ; cliquer sur un bloc fait descendre en douceur jusqu'ici.
          Il s'estompe quand on remonte (cercles à 100 px du bas de l'écran). */}
      <div
        ref={contenuRef}
        className="mt-[40px]"
        style={{
          opacity: contenuVisible ? 1 : 0,
          transition: "opacity .45s ease",
          pointerEvents: contenuVisible ? "auto" : "none",
        }}
      >
        <h2 className="mb-2 text-left text-xl font-bold" style={{ color: INK }}>
          {ongletActif.titre}
        </h2>
        {/* Ligne d'orientation sous le titre (même motif prévu pour chaque
            partie ; les textes des autres viendront avec leur construction). */}
        {actif === "profils" && (
          <p className="text-left text-sm leading-relaxed text-gray-500">
            Tes résultats de tests, conservés pour toujours. Et les prochains
            à explorer.
          </p>
        )}
        {actif === "relations" && (
          <p className="text-left text-sm leading-relaxed text-gray-500">
            Comprends ce qui se joue entre toi et les autres. Seul, ou à deux.
          </p>
        )}

        {actif === "profils" && children}
        {actif === "relations" && (
          /* Les deux services de la partie Relations (cf.
             VISION_RELATIONS_PARCOURS.md) : parcours seul et parcours à
             deux. Le client choisit, il est redirigé sur son parcours. */
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <a
              href="/relations/seul"
              className="group flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 text-left shadow-sm transition-shadow hover:shadow-md"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Parcours seul
              </p>
              <p className="mt-2 text-2xl font-bold" style={{ color: INK }}>
                Comprends tes schémas
              </p>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                Un parcours personnalisé, construit sur ton profil : comprendre
                comment tu fonctionnes en relation, ce qui se répète, et
                comment le faire évoluer, étape par étape.
              </p>
              <div className="mt-auto pt-5">
                <span
                  className="inline-block rounded-full px-4 py-2 text-sm font-semibold text-white transition-transform group-hover:scale-105"
                  style={{ background: VERT }}
                >
                  Commencer
                </span>
              </div>
            </a>
            <a
              href="/relations/duo"
              className="group flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 text-left shadow-sm transition-shadow hover:shadow-md"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Parcours à deux
              </p>
              <p className="mt-2 text-2xl font-bold" style={{ color: INK }}>
                Avancez ensemble
              </p>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                Invite ton ou ta partenaire, et suivez un parcours construit
                sur vos deux profils : ce qui vous lie, ce qui vous heurte, et
                comment mieux vous comprendre.
              </p>
              <div className="mt-auto pt-5">
                <span
                  className="inline-block rounded-full px-4 py-2 text-sm font-semibold text-white transition-transform group-hover:scale-105"
                  style={{ background: VERT }}
                >
                  Commencer à deux
                </span>
              </div>
            </a>
          </div>
        )}
        {actif === "developpement" && (
          <EnConstruction
            titre="Ton parcours sur mesure"
            texte="Un chemin de développement personnel construit sur tes résultats, pas sur des généralités. Cette partie arrive."
          />
        )}
        {actif === "ia" && (
          <EnConstruction
            titre="Discute avec ton profil"
            texte="Une IA qui connaît ton profil en profondeur et répond à tes questions sur toi. Cette partie arrive."
          />
        )}
        {actif === "parametres" && (
          <EnConstruction
            titre="Ton compte, tes choix"
            texte="Ton prénom, ton adresse email, tes préférences et tes données. Cette partie arrive."
          />
        )}
      </div>
    </>
  );
}
