"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import FenetreParcours from "./FenetreParcours";
import FenetreParcoursDuo from "./FenetreParcoursDuo";
import PartageInline from "../components/PartageInline";
import FlecheRemonter from "./FlecheRemonter";
import { CercleProgression } from "./CercleProgression";

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
  { id: "relations", titre: "Mes relations", sousLigne: "Comprends ce qui se joue entre toi et les autres. Seul, ou à deux." },
  { id: "developpement", titre: "Développement", sousLigne: "Ton parcours sur mesure" },
  { id: "ia", titre: "L'IA", sousLigne: "Discute avec ton profil" },
  { id: "parametres", titre: "Paramètres", sousLigne: "Ton compte, tes choix" },
] as const;

type OngletId = (typeof ONGLETS)[number]["id"];

/* Cache (durée de vie de la page) : le parcours seul est-il entamé ?
   Rempli au premier passage sur l'onglet Relations, réutilisé ensuite.
   Un module validé dans la session met aussi ce cache à jour. */
let cacheParcoursEntame: boolean | null = null;

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
function Fleche({
  cote,
  actif,
  onClick,
  top = 92,
}: {
  cote: "g" | "d";
  actif: boolean;
  onClick: () => void;
  /* Position verticale du centre de la flèche (px ou "50%").
     Défaut 92 = milieu des blocs-onglets (184/2). */
  top?: number | string;
}) {
  const gauche = cote === "g";
  return (
    <button
      type="button"
      aria-label={gauche ? "Onglets précédents" : "Onglets suivants"}
      onClick={onClick}
      disabled={!actif}
      style={{
        position: "absolute",
        top,
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

/* ————— Partie RELATIONS : carrousel des deux parcours —————
   Une seule section immersive visible à la fois (pleine largeur), on passe
   de « Parcours seul » à « Parcours à deux » avec les flèches rondes vertes
   (même patron que le carrousel des réseaux) + 2 points indicateurs.
   Chaque section VEND le parcours : accroche éditoriale, ligne « construit
   sur ton profil », les 3 actes / 3 temps, teasing chiffré, CTA.
   (cf. VISION_RELATIONS_PARCOURS.md — règle : on vend le service, on ne
   pointe jamais les faiblesses du client.) */
function CarrouselRelations({
  profil,
  partage,
  descriptionsVariantes,
  lienInvitation,
  pctDuo = 0,
}: {
  profil?: { sousTitre: string } | null;
  partage?: { code: string; nomVariante: string; slug: string; s: string; v: string } | null;
  /* Les petites descriptions des 48 variantes (bloc d'aide de la fenêtre duo). */
  descriptionsVariantes?: Record<string, string>;
  /* Le lien d'invitation SIGNÉ au parcours à deux (construit côté serveur,
     /test?invite={jeton}) ; repli /test si absent. */
  lienInvitation?: string | null;
  /* Progression du duo (anneau « Avancez ensemble ») : somme partenaire
     trouvé (2) + parcours non payé (5) / payé (98). */
  pctDuo?: number;
}) {
  void profil; // plus affiché (ligne « Construit sur ton profil » retirée), la tuyauterie reste pour plus tard
  const railRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  /* UNE seule fenêtre de parcours, ouverte par le bouton OU par les 3 étapes
     (même progression partout). */
  const [parcoursOuvert, setParcoursOuvert] = useState(false);
  /* Au moins un module du parcours seul déjà validé sur le compte ?
     → le bouton devient « Continuer mon parcours ». Réponse mise en CACHE
     (module) : on ne re-interroge pas l'API à chaque retour sur l'onglet
     Relations (c'était une source de latence). */
  const [parcoursEntame, setParcoursEntame] = useState(cacheParcoursEntame === true);
  useEffect(() => {
    if (cacheParcoursEntame !== null) {
      setParcoursEntame(cacheParcoursEntame);
      return;
    }
    fetch("/api/parcours/progression?parcours=relations-seul")
      .then((r) => r.json())
      .then((d) => {
        cacheParcoursEntame = typeof d?.faits === "number" && d.faits > 0;
        setParcoursEntame(cacheParcoursEntame);
      })
      .catch(() => {});
  }, []);
  /* Survoler une étape fait AUSSI grossir « Commencer mon parcours »
     (comme si on le survolait). */
  const [etapeSurvolee, setEtapeSurvolee] = useState(false);
  /* Écart entre les deux sections : pendant le glissement elles ne sont
     plus collées (demande Luca). Pris en compte dans le calcul du scroll. */
  const ECART = 40;

  // L'index courant suit le scroll (flèches OU glissement manuel).
  function majIdx() {
    const el = railRef.current;
    if (!el) return;
    setIdx(Math.round(el.scrollLeft / (el.clientWidth + ECART)));
  }

  function aller(i: number) {
    const el = railRef.current;
    if (!el) return;
    el.scrollTo({ left: i * (el.clientWidth + ECART), behavior: "smooth" });
  }

  // Étape de la frise d'un parcours (acte ou temps) : même patron que les
  // titres d'acte du chemin, numéro + point collés au titre (plus de
  // pastille). `centre` : tout est centré (option gardée). `surVert` :
  // textes en blanc (cartes vertes du parcours seul).
  function Etape({
    n,
    titre,
    texte,
    centre,
    surVert,
  }: {
    n: number;
    titre: string;
    texte: string;
    centre?: boolean;
    surVert?: boolean;
  }) {
    void n; // numéro plus affiché (demande Luca), gardé dans la signature
    return (
      <div className={centre ? "flex-1 min-w-0 text-center" : "flex-1 min-w-0"}>
        <p className="text-sm font-bold" style={{ color: surVert ? "#fff" : VERT }}>
          {titre}
        </p>
        <p
          className={surVert ? "mt-2 text-sm leading-relaxed" : "mt-2 text-sm leading-relaxed text-gray-500"}
          style={surVert ? { color: "rgba(255,255,255,0.88)" } : undefined}
        >
          {texte}
        </p>
      </div>
    );
  }

  return (
    <div className="relative mt-8">
      <style>{`.rel-scroll::-webkit-scrollbar{display:none}`}</style>
      <Fleche cote="g" actif={idx > 0} onClick={() => aller(0)} top="50%" />
      <Fleche cote="d" actif={idx < 1} onClick={() => aller(1)} top="50%" />
      <div
        ref={railRef}
        onScroll={majIdx}
        className="rel-scroll flex snap-x snap-mandatory overflow-x-auto"
        style={{ scrollbarWidth: "none", gap: ECART }}
      >
        {/* ————— Parcours seul (aligné à gauche, validé) —————
            order-2 : affiché en DEUXIÈME (décision Luca : on arrive sur le
            parcours à deux en premier). */}
        {/* pb +12 px (40/52) : blocs agrandis vers le bas, demande Luca */}
        <section className="order-2 w-full flex-shrink-0 snap-center">
          <div className="relative flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-7 pb-[36px] text-left shadow-sm md:p-10 md:pb-[48px]">
            {/* Anneau de progression du parcours (50 % de la partie
                Relations lui aussi). */}
            {/* Calé sur la marge du contenu : le haut de l'anneau tombe à la
                hauteur de la ligne « Parcours … » (p-7 / md:p-10). */}
            <div className="absolute top-7 right-7 md:top-10 md:right-10">
              <CercleProgression pct={0} taille={44} />
            </div>
            <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: INK }}>
              Parcours seul
            </p>
            {/* Contenu aligné EN HAUT comme le bloc Parcours à deux
                (demande Luca, fini le centrage vertical). */}
            <h3 className="mt-3 text-2xl font-bold md:text-3xl" style={{ color: VERT }}>
              Comprends tes schémas
            </h3>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-gray-600">
              Pourquoi tes relations prennent souvent le même chemin ? Ce qui
              se répète n&apos;est pas un hasard. Ça se comprend, et ça
              s&apos;apprend. Un parcours guidé, étape par étape, pour voir
              clair dans ta façon d&apos;aimer et de t&apos;attacher.
            </p>
            {/* Les 3 actes du parcours : CLIQUABLES (ouvrent la fenêtre du
                parcours), grossissement au survol comme le bouton. */}
            <div className="mt-9 flex flex-col gap-6 sm:flex-row sm:gap-8">
              <button
                type="button"
                onClick={() => setParcoursOuvert(true)}
                onMouseEnter={() => setEtapeSurvolee(true)}
                onMouseLeave={() => setEtapeSurvolee(false)}
                className="flex flex-1 min-w-0 flex-col items-start rounded-2xl border border-gray-100 bg-white p-5 text-left shadow-sm transition-all hover:shadow-md hover:scale-105 cursor-pointer"
              >
                <Etape
                  n={1}
                  titre="Ta façon d'aimer"
                  texte="Ce que ton profil dit de ta façon d'être en relation."
                />
              </button>
              <button
                type="button"
                onClick={() => setParcoursOuvert(true)}
                onMouseEnter={() => setEtapeSurvolee(true)}
                onMouseLeave={() => setEtapeSurvolee(false)}
                className="flex flex-1 min-w-0 flex-col items-start rounded-2xl border border-gray-100 bg-white p-5 text-left shadow-sm transition-all hover:shadow-md hover:scale-105 cursor-pointer"
              >
                <Etape
                  n={2}
                  titre="Ce qui se répète"
                  texte="Ce qui se rejoue d'une relation à l'autre, et pourquoi."
                />
              </button>
              <button
                type="button"
                onClick={() => setParcoursOuvert(true)}
                onMouseEnter={() => setEtapeSurvolee(true)}
                onMouseLeave={() => setEtapeSurvolee(false)}
                className="flex flex-1 min-w-0 flex-col items-start rounded-2xl border border-gray-100 bg-white p-5 text-left shadow-sm transition-all hover:shadow-md hover:scale-105 cursor-pointer"
              >
                <Etape
                  n={3}
                  titre="Reprendre la main"
                  texte="Des leviers concrets pour avancer, à ton rythme."
                />
              </button>
            </div>
            <p className="mt-2 text-sm italic text-gray-400">
              12 modules personnalisés · exercices d&apos;introspection ·
              micro-actions concrètes
            </p>
            {/* Le bouton ouvre la FENÊTRE du parcours par-dessus la page
                (décision Luca), pas une navigation. Fenêtre PILOTÉE :
                partagée avec les 3 étapes cliquables. */}
            <div className="mt-auto pt-8">
              <button
                type="button"
                onClick={() => setParcoursOuvert(true)}
                className="inline-block rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105 cursor-pointer"
                /* transform inline : prioritaire sur la classe → le bouton
                   grossit aussi quand une ÉTAPE est survolée */
                style={{ background: VERT, transform: etapeSurvolee ? "scale(1.05)" : undefined }}
              >
                {parcoursEntame ? "Continuer mon parcours" : "Commencer mon parcours"}
              </button>
              <FenetreParcours ouvert={parcoursOuvert} onFermer={() => setParcoursOuvert(false)} />
            </div>
          </div>
        </section>

        {/* ————— Parcours à deux (aligné à gauche, validé) —————
            order-1 : affiché en PREMIER (décision Luca). */}
        <section className="order-1 w-full flex-shrink-0 snap-center">
          <div className="relative flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-7 pb-[36px] text-left shadow-sm md:p-10 md:pb-[48px]">
            {/* Anneau de progression du DUO : partenaire trouvé (2) +
                parcours non payé (5) / payé (98) = 100 quand tout est fait. */}
            {/* Calé sur la marge du contenu : le haut de l'anneau tombe à la
                hauteur de la ligne « Parcours … » (p-7 / md:p-10). */}
            <div className="absolute top-7 right-7 md:top-10 md:right-10">
              <CercleProgression pct={pctDuo} taille={44} />
            </div>
            <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: INK }}>
              Parcours à deux
            </p>
            <h3 className="mt-3 text-2xl font-bold md:text-3xl" style={{ color: VERT }}>
              Avancez ensemble
            </h3>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-gray-600">
              Un parcours construit sur vos deux profils. Pas des conseils
              tout faits : ce qui vous lie, ce qui vous heurte, et comment
              mieux vous comprendre, à partir de qui vous êtes vraiment,
              l&apos;un et l&apos;autre.
            </p>
            {/* Les DEUX encarts d'action directement dans le bloc (décision
                Luca) : inviter son ou sa partenaire (bloc réseaux) OU
                répondre pour lui/elle. Plus de bouton « Commencer à deux »,
                les encarts sont les actions. */}
            <div className="mt-8 flex flex-col gap-5 sm:flex-row">
              {/* min-w-0 : indispensable pour que le bloc réseaux DÉFILE
                  (sinon la carte s'élargit au contenu et déborde). */}
              <div className="flex-1 min-w-0 rounded-2xl border border-gray-100 bg-white p-6 text-left shadow-sm transition-shadow hover:shadow-md">
                <p className="text-base font-bold" style={{ color: VERT }}>
                  L&apos;inviter
                </p>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                  Le plus juste : ton ou ta partenaire passe le test, et votre
                  parcours se construit sur vos deux vrais profils.
                </p>
                {/* Même système de partage que le rapport, mais LIEN et
                    MESSAGE d'invitation dédiés. ⚠️ Lien placeholder /test en
                    attendant le vrai lien d'invitation signé (table liens). */}
                {partage && (
                  <div className="mt-4">
                    <PartageInline
                      code={partage.code}
                      nomVariante={partage.nomVariante}
                      lien={lienInvitation ?? "/test"}
                      message="Hey, j'aimerais qu'on fasse notre parcours à deux. Passe le test de ton côté et rejoins-moi :"
                      montrerQR={false}
                      defileAuto
                      ecartFleches={14}
                    />
                  </div>
                )}
              </div>
              {/* La carte OUVRE la fenêtre « Décrire mon ou ma partenaire »
                  (même patron que le parcours solo). flex-col items-start :
                  un <button> centre son contenu verticalement par défaut. */}
              <FenetreParcoursDuo
                descriptions={descriptionsVariantes}
                triggerClassName="flex flex-1 min-w-0 flex-col items-start rounded-2xl border border-gray-100 bg-white p-6 text-left shadow-sm transition-all hover:shadow-md hover:scale-[1.01] cursor-pointer"
              >
                <p className="text-base font-bold" style={{ color: VERT }}>
                  Répondre pour lui ou elle
                </p>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                  Plus rapide : tu décris ton ou ta partenaire, et on devine
                  son profil ensemble. Moins précis, mais immédiat.
                </p>
                {/* mt-8 : cale l'axe de la pastille sur l'axe des icônes
                    réseaux de la carte voisine (rangée d'icônes centrée à
                    ~51 px sous sa description, pastille de 40 px). */}
                <span
                  className="mt-8 inline-block rounded-full px-5 py-2.5 text-sm font-semibold text-white"
                  style={{ background: VERT }}
                >
                  Décrire mon ou ma partenaire
                </span>
              </FenetreParcoursDuo>
            </div>
          </div>
        </section>
      </div>

      {/* Les 2 points indicateurs (cliquables) */}
      <div className="mt-4 flex justify-center gap-2">
        {[0, 1].map((i) => (
          <button
            key={i}
            type="button"
            aria-label={i === 0 ? "Voir le parcours à deux" : "Voir le parcours seul"}
            onClick={() => aller(i)}
            className="h-2 w-2 rounded-full transition-colors"
            style={{ background: idx === i ? VERT : "rgba(0,0,0,0.12)" }}
          />
        ))}
      </div>
    </div>
  );
}

/* Cercle de progression : déplacé dans CercleProgression.tsx (import
   circulaire cassé). Importé PUIS ré-exporté (un simple `export ... from`
   ne rend pas le nom utilisable ici même) pour les imports existants
   (page.tsx, CarteCercleSurvol) et l'usage interne (blocs du carrousel). */
export { CercleProgression };

type InfosPartage = { code: string; nomVariante: string; slug: string; s: string; v: string };

/* Le ou la partenaire décrit(e) via le lien d'invitation (table `liens`). */
type InfosPartenaire = {
  prenom: string | null;
  nomType: string;
  sousTitre: string;
  date: string;
  href: string;
  /* true tant que l'inviteur n'a pas survolé la pastille « Nouveau ». */
  nouveau?: boolean;
  /* Petite description du profil (les 48 descriptions courtes). */
  description?: string | null;
};

/* Barème de la progression du DUO (validé par Luca) : chaque bloc a SA
   valeur : partenaire trouvé = 2 %, parcours à deux non payé = 5 %
   (98 % une fois payé). Les deux s'ADDITIONNENT dans l'anneau de la
   section « Avancez ensemble » (2 + 98 = 100 quand tout est fait), et ce
   total pèse 70 % de la progression de la partie « Mes relations »
   (calcul dans profil/page.tsx). */
const PCT_PARTENAIRE_TROUVE = 2;
const PCT_PARCOURS_DUO_NON_PAYE = 5; // passera à 98 une fois payé

/* ————— ESPACE « PARTENAIRE » (sous le carrousel Relations) —————
   VISUEL PROVISOIRE (à reprendre avec Luca) : le résultat du ou de la
   partenaire arrivé par le lien d'invitation. Pastille « Nouveau » en bas
   à droite de la carte : grossit/dégrossit sur place, s'efface au survol
   (et le serveur retient le « vu » via /api/duo/vu). */
function EspacePartenaire({
  partenaire,
  monCode,
}: {
  partenaire: InfosPartenaire;
  /* Le code du CLIENT (ex. « INFP ») : l'identité du duo sous le texte du
     volet parcours (son code + celui du ou de la partenaire). */
  monCode?: string | null;
}) {
  const codePartenaire = partenaire.sousTitre.split(" · ")[0];
  const [nouveau, setNouveau] = useState(!!partenaire.nouveau);
  const [effacement, setEffacement] = useState(false);
  function marquerVu() {
    if (effacement) return;
    setEffacement(true); // fondu de sortie…
    window.setTimeout(() => setNouveau(false), 300); // …puis démontage
    // Le serveur retient le vu (best-effort, la pastille part quoi qu'il arrive)
    fetch("/api/duo/vu", { method: "POST", keepalive: true }).catch(() => {});
  }
  return (
    <div className="mt-8">
      {/* Pulsation de la pastille : keyframes DANS le composant (pas
          globals.css, file-watch OneDrive peu fiable dessus). */}
      <style>{`@keyframes part-nouveau{0%,100%{transform:scale(1)}50%{transform:scale(1.15)}}`}</style>
      {/* 2 volets côte à côte : la carte du ou de la partenaire PLUS LARGE
          (3/5) que le volet parcours (2/5), demande Luca. Anneau de
          progression du duo en haut à droite de CHACUN des 2 blocs. */}
      <div className="mt-3 grid gap-5 sm:grid-cols-5">
      <div className="relative flex h-full flex-col items-center rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm sm:col-span-3">
        <div className="absolute right-4 top-4">
          <CercleProgression pct={PCT_PARTENAIRE_TROUVE} taille={32} />
        </div>
        {nouveau && (
          <span
            onMouseEnter={marquerVu}
            className="absolute bottom-4 right-4 rounded-full px-3 py-1 text-xs font-semibold text-white"
            style={{
              background: VERT,
              animation: "part-nouveau 1.6s ease-in-out infinite",
              opacity: effacement ? 0 : 1,
              transition: "opacity .3s ease",
            }}
          >
            Nouveau
          </span>
        )}
        {/* En-tête à HAUTEUR FIXE (96 px, comme celui du volet parcours) :
            les textes descriptifs des 2 blocs démarrent sur la même ligne. */}
        <div className="flex h-[96px] w-full flex-col items-center">
        <p className="text-xs font-semibold italic tracking-wide text-gray-400">
          Ton ou ta partenaire
        </p>
        {/* Le NOM de la personne en titre (son compte est le partenaire de
            ce compte) ; repli sur le nom du type (« Avocat ») tant que le
            ou la partenaire n'a pas de compte avec un prénom. À sa droite,
            l'emblème carré du code (patron de la carte Personnalité). */}
        <div className="mt-2 flex items-center justify-center gap-4">
          <div>
            <p className="text-2xl font-bold" style={{ color: INK }}>
              {partenaire.prenom ?? partenaire.nomType}
            </p>
            <p className="mt-1 text-sm font-semibold" style={{ color: VERT }}>
              {partenaire.sousTitre}
            </p>
          </div>
          <div
            className="flex h-[64px] w-[64px] flex-shrink-0 items-center justify-center rounded-2xl"
            style={{ background: "rgba(51,164,116,0.10)" }}
          >
            <span className="text-sm font-bold tracking-wide" style={{ color: VERT }}>
              {codePartenaire}
            </span>
          </div>
        </div>
        </div>
        {/* Petite description du profil du ou de la partenaire */}
        {partenaire.description && (
          <p className="mt-3 text-sm leading-relaxed text-gray-500">
            {partenaire.description}
          </p>
        )}
        <p className="mt-3 text-xs text-gray-400">Profil décrit le {partenaire.date}</p>
        <div className="mt-auto flex justify-center pt-5">
          <a
            href={partenaire.href}
            className="inline-block rounded-full px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-105"
            style={{ background: VERT }}
          >
            Voir son profil
          </a>
        </div>
      </div>
      {/* Second volet : « Mon parcours à deux » (le bouton n'est pas encore
          branché, comme la flèche « suite » de la fenêtre duo : l'écran
          d'après reste à construire). */}
      <div className="relative flex h-full flex-col items-center rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm sm:col-span-2">
        <div className="absolute right-4 top-4">
          <CercleProgression pct={PCT_PARCOURS_DUO_NON_PAYE} taille={32} />
        </div>
        {/* En-tête à HAUTEUR FIXE (96 px, comme celui de la carte
            partenaire) : les textes des 2 blocs démarrent sur la même
            ligne. */}
        <div className="flex h-[96px] w-full flex-col items-center">
        <p className="text-base font-bold" style={{ color: VERT }}>
          Mon parcours à deux
        </p>
        {/* L'identité du duo EN HAUT : les 2 codes côte à côte (emblèmes
            carrés vert pâle), le texte descend dessous, au niveau du texte
            de la carte partenaire. */}
        <div className="mt-4 flex items-center justify-center gap-3">
          {monCode && (
            <div
              className="flex h-[56px] w-[56px] items-center justify-center rounded-2xl"
              style={{ background: "rgba(51,164,116,0.10)" }}
            >
              <span className="text-sm font-bold tracking-wide" style={{ color: VERT }}>
                {monCode}
              </span>
            </div>
          )}
          {/* « + » vert entre les deux profils du duo */}
          {monCode && (
            <span className="text-xl font-bold leading-none" style={{ color: VERT }} aria-hidden="true">
              +
            </span>
          )}
          <div
            className="flex h-[56px] w-[56px] items-center justify-center rounded-2xl"
            style={{ background: "rgba(51,164,116,0.10)" }}
          >
            <span className="text-sm font-bold tracking-wide" style={{ color: VERT }}>
              {codePartenaire}
            </span>
          </div>
        </div>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-gray-500">
          Votre parcours est là, construit sur vos deux profils. Tu y reviens
          quand tu veux.
        </p>
        <div className="mt-auto flex justify-center pt-5">
          <button
            type="button"
            className="inline-block rounded-full px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-105 cursor-pointer"
            style={{ background: VERT }}
          >
            Notre parcours
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}

export default function ProfilOnglets({
  progression,
  profil,
  partage,
  descriptionsVariantes,
  lienInvitation,
  partenaire,
  ongletInitial,
  children,
}: {
  progression: Record<string, number>;
  /* Le profil du client (ex. « INFP · le Poète ») pour personnaliser la
     partie Relations ; null si aucun test passé. */
  profil?: { sousTitre: string } | null;
  /* Les infos de partage du profil (bloc réseaux de l'invitation du
     parcours à deux) ; null si aucun test passé. */
  partage?: InfosPartage | null;
  /* Les petites descriptions des 48 variantes (clé `CODE-Vx`), construites
     côté serveur (page.tsx) ; pour le bloc d'aide au survol du menu des 48. */
  descriptionsVariantes?: Record<string, string>;
  /* Le lien d'invitation SIGNÉ au parcours à deux (côté serveur). */
  lienInvitation?: string | null;
  /* Le ou la partenaire décrit(e) (table `liens`), pour l'espace Partenaire. */
  partenaire?: InfosPartenaire | null;
  /* La partie active mémorisée (cookie lu par le serveur) : le HTML arrive
     déjà sur la bonne partie après un refresh. */
  ongletInitial?: string;
  children: ReactNode;
}) {
  /* La partie active SURVIT au rechargement via un COOKIE lu PAR LE SERVEUR
     (prop ongletInitial) : le HTML arrive déjà sur la bonne partie, zéro
     flash. (Les tentatives client, sessionStorage + useLayoutEffect,
     flashaient : le HTML serveur est peint avant l'hydratation.) */
  const [actif, setActif] = useState<OngletId>(
    ongletInitial && ONGLETS.some((o) => o.id === ongletInitial)
      ? (ongletInitial as OngletId)
      : "profils",
  );
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
  const POINT_DISPARITION = 130; // déclenchement à 130 px du haut de l'écran (validé par Luca)
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
                  /* Cookie lisible par le SERVEUR au prochain refresh */
                  document.cookie = `profil_onglet=${o.id}; path=/profil; max-age=31536000; samesite=lax`;
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
        {/* pl-7/md:pl-10 : titre et ligne alignés sur la marge des TEXTES
            des sections (padding interne des cartes), pas sur le bord des
            blocs (demande Luca). */}
        {actif !== "profils" && actif !== "relations" && (
          <h2 className="mb-2 pl-7 text-left text-xl font-bold md:pl-10" style={{ color: INK }}>
            {ongletActif.titre}
          </h2>
        )}
        {actif === "profils" && children}
        {actif === "relations" && (
          <>
            <CarrouselRelations
              profil={profil}
              partage={partage}
              descriptionsVariantes={descriptionsVariantes}
              lienInvitation={lienInvitation}
              pctDuo={partenaire ? PCT_PARTENAIRE_TROUVE + PCT_PARCOURS_DUO_NON_PAYE : 0}
            />
            {/* Espace « Partenaire » : n'apparaît que lorsqu'un invité a
                fini le test depuis le lien d'invitation. */}
            {partenaire && <EspacePartenaire partenaire={partenaire} monCode={partage?.code} />}
            {/* Flèche « remonter » sous le carrousel, comme sur Mes profils */}
            <FlecheRemonter />
          </>
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
