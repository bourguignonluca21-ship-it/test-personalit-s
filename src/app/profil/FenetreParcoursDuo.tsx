"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { getTypeByCode, ROLES, ROLE_ORDER, typesByRole, type PersonalityType } from "../data/types";
import { NOMS_VARIANTES } from "../data/moteur";

/*
 * FENÊTRE « DÉCRIRE MON OU MA PARTENAIRE » (parcours à deux, branche
 * « répondre pour lui / elle ») : s'ouvre PAR-DESSUS la page profil, même
 * patron que la fenêtre du parcours solo (fond flouté, croix, Échap).
 * ÉCRAN V1 (inspiré du parcours 16P décortiqué, cf. ANALYSE_PARCOURS_16P.md
 * écran 6) : « Connais-tu déjà son profil ? » → Oui (choisir parmi les 48)
 * ou Non (mini-quiz de devinette). Les deux branches sont VISUELLES pour
 * l'instant, elles seront construites ensuite.
 * Le déclencheur est fourni par le parent (la carte entière est cliquable).
 * ⚠️ PIÈGE connu : rendu via createPortal(document.body), sinon le
 * backdrop-filter de la navbar fait caler le position:fixed sur elle.
 */

const VERT = "rgba(51,164,116,0.85)";
const INK = "rgba(0,0,0,0.75)";

/* ————— MINI-QUIZ « Non, devinons-le » —————
   12 questions, 3 par axe (E/I, N/S, T/F, J/P), écrites en SCÈNES DE VIE
   (modèle 16P décortiqué dans ANALYSE_PARCOURS_16P.md écran 6, questions
   100 % à nous). C'est l'UTILISATEUR qui répond À LA PLACE de son ou sa
   partenaire : friction zéro, la révélation donne envie de vérifier avec
   le vrai test. Les axes sont entrelacés pour le rythme. */
type PoleQuiz = "E" | "I" | "N" | "S" | "T" | "F" | "J" | "P";
const QUIZ_QUESTIONS: {
  q: string;
  choix: { t: string; p: PoleQuiz }[];
}[] = [
  {
    q: "Après une journée éprouvante, il ou elle a plutôt besoin de quoi ?",
    choix: [
      { t: "De calme. Être tranquille, loin de l'agitation, c'est ça qui le ou la recharge.", p: "I" },
      { t: "De monde. Voir des gens, raconter sa journée, sortir : c'est ça qui recharge.", p: "E" },
    ],
  },
  {
    q: "Dans une discussion, qu'est-ce qui l'anime le plus ?",
    choix: [
      { t: "Les idées : imaginer, refaire le monde, explorer les possibles.", p: "N" },
      { t: "Le concret : le vécu, les faits, ce qui se passe vraiment.", p: "S" },
    ],
  },
  {
    q: "Tu lui racontes un problème. Sa première réaction ?",
    choix: [
      { t: "Chercher la solution : analyser, trancher, régler le problème.", p: "T" },
      { t: "T'écouter : comprendre ce que tu ressens avant de parler solution.", p: "F" },
    ],
  },
  {
    q: "Un week-end se prépare. Plutôt comment ?",
    choix: [
      { t: "Tout est prévu à l'avance : horaires, réservations, programme.", p: "J" },
      { t: "On verra sur place : l'imprévu fait partie du plaisir.", p: "P" },
    ],
  },
  {
    q: "En soirée, tu le ou la retrouves où ?",
    choix: [
      { t: "Un peu partout : il ou elle circule, parle avec tout le monde.", p: "E" },
      { t: "Dans un coin choisi, en grande conversation avec une ou deux personnes.", p: "I" },
    ],
  },
  {
    q: "Face à un projet tout neuf, son premier réflexe ?",
    choix: [
      { t: "Regarder ce qui est réaliste : les étapes, les moyens, le faisable.", p: "S" },
      { t: "Voir grand : le potentiel, ce que ça pourrait devenir.", p: "N" },
    ],
  },
  {
    q: "Pour prendre une décision importante, il ou elle se fie à quoi ?",
    choix: [
      { t: "À l'impact sur les gens : préserver la relation compte plus que tout.", p: "F" },
      { t: "À la logique : ce qui est juste et cohérent, même si ça froisse.", p: "T" },
    ],
  },
  {
    q: "Un plan change à la dernière minute. Ça donne quoi ?",
    choix: [
      { t: "Ça glisse : il ou elle s'adapte, parfois ça l'amuse même.", p: "P" },
      { t: "Ça contrarie : il ou elle aime que les choses restent comme prévu.", p: "J" },
    ],
  },
  {
    q: "Quand quelque chose le ou la travaille…",
    choix: [
      { t: "Il ou elle rumine d'abord en silence, et en parle une fois que c'est clair.", p: "I" },
      { t: "Il ou elle en parle tout de suite : penser à voix haute, c'est sa façon d'y voir clair.", p: "E" },
    ],
  },
  {
    q: "Des années plus tard, il ou elle se souvient de quoi ?",
    choix: [
      { t: "De l'ambiance, de ce que ça évoquait, du sens du moment.", p: "N" },
      { t: "Des détails précis : les lieux, les mots exacts, ce qui s'est passé.", p: "S" },
    ],
  },
  {
    q: "En plein désaccord avec toi, il ou elle…",
    choix: [
      { t: "Débat pied à pied : les arguments d'abord, on se réconcilie après.", p: "T" },
      { t: "Cherche l'apaisement : la relation passe avant d'avoir raison.", p: "F" },
    ],
  },
  {
    q: "Son quotidien ressemble à quoi ?",
    choix: [
      { t: "Des repères : des listes, des routines, chaque chose à sa place.", p: "J" },
      { t: "Du mouvement : plusieurs choses en même temps, au feeling.", p: "P" },
    ],
  },
];

/* Une question du mini-quiz (titre + les 2 cartes de choix). Rendue en
   DOUBLE pendant la glissade : copie sortante inerte + copie entrante. */
function BlocQuestion({
  idx,
  onRepondre,
  choisi,
}: {
  idx: number;
  onRepondre: (p: PoleQuiz) => void;
  /* La réponse déjà donnée à cette question (mise en évidence quand on
     revient en arrière) ; null si pas encore répondue. */
  choisi?: PoleQuiz | null;
}) {
  const q = QUIZ_QUESTIONS[idx];
  if (!q) return null;
  return (
    <>
      <p className="mt-5 text-base font-bold" style={{ color: INK }}>
        {q.q}
      </p>
      <div className="mt-4 flex flex-col gap-3 pb-1 sm:flex-row">
        {/* Plus de carte BLANCHE : fond vert très pâle (comme le bloc
            exercice des modules), qui se renforce au survol. La réponse
            CHOISIE reste en vert soutenu. */}
        {q.choix.map((c) => (
          <button
            key={c.p}
            type="button"
            onClick={() => onRepondre(c.p)}
            className={`flex-1 min-w-0 rounded-2xl p-5 text-left text-sm leading-relaxed text-gray-600 transition-all hover:scale-[1.01] cursor-pointer ${
              choisi === c.p
                ? "bg-[rgba(51,164,116,0.18)]"
                : "bg-[rgba(51,164,116,0.06)] hover:bg-[rgba(51,164,116,0.12)]"
            }`}
          >
            {c.t}
          </button>
        ))}
      </div>
    </>
  );
}

/* Le type deviné à partir des réponses : majorité par axe (3 questions
   par axe → jamais d'égalité). */
function typeDevine(poles: PoleQuiz[]): PersonalityType | undefined {
  const n = (p: PoleQuiz) => poles.filter((x) => x === p).length;
  const code =
    (n("E") > n("I") ? "E" : "I") +
    (n("N") > n("S") ? "N" : "S") +
    (n("T") > n("F") ? "T" : "F") +
    (n("J") > n("P") ? "J" : "P");
  return getTypeByCode(code);
}

export default function FenetreParcoursDuo({
  children,
  triggerClassName,
  descriptions,
}: {
  /* Le contenu du déclencheur (la carte « Répondre pour lui ou elle »). */
  children: ReactNode;
  /* Les classes du déclencheur (la carte garde son style de carte). */
  triggerClassName?: string;
  /* Les petites descriptions des 48 variantes (clé `CODE-Vx`), construites
     côté serveur ; repli sur la tagline du type si absente. */
  descriptions?: Record<string, string>;
}) {
  const [open, setOpen] = useState(false);
  const [monte, setMonte] = useState(false); // portail seulement côté navigateur
  useEffect(() => setMonte(true), []);

  /* « Choisir son profil » : la pastille se transforme en MENU DÉROULANT des
     48 profils, groupés par famille (Analystes, Diplomates, Sentinelles,
     Explorateurs). Le choix est retenu à l'écran (le branchement du parcours
     sur ce profil viendra ensuite). */
  const [choixOuvert, setChoixOuvert] = useState(false);
  const [profilChoisi, setProfilChoisi] = useState<string | null>(null);
  /* MENU EN 2 TEMPS (décision UX Luca) : d'abord les 16 TYPES (personne ne
     connaît la variante de son ou sa partenaire), puis les 3 variantes du
     type choisi. null = on est sur la liste des types. */
  const [typeChoisi, setTypeChoisi] = useState<PersonalityType | null>(null);
  /* Le type SURVOLÉ dans la liste : avant tout choix, le panneau des
     variantes montre déjà les variantes du type survolé (aperçu). Le type
     CLIQUÉ (typeChoisi) garde la priorité. */
  const [typeSurvole, setTypeSurvole] = useState<PersonalityType | null>(null);
  /* Indice de défilement : une flèche vers le bas en bas à droite de la
     liste, qui s'efface quand on a atteint le fond. */
  const [listeEnBas, setListeEnBas] = useState(false);

  /* MINI-QUIZ « Non, devinons-le » : s'ouvre SOUS les 2 cartes.
     Les réponses vivent par QUESTION (tableau à trous) : on peut revenir
     en arrière (flèche bas gauche) et modifier une réponse, puis ravancer
     (flèche bas droite, active si la question courante est répondue). */
  const [quizActif, setQuizActif] = useState(false);
  /* Le TEXTE du quiz n'arrive qu'en FONDU une fois l'agrandissement de la
     fenêtre TERMINÉ (sinon il se fait « découvrir » par la fenêtre qui
     grandit, effet sale signalé par Luca). */
  const [quizVisible, setQuizVisible] = useState(false);
  /* MÉTHODE DU MENU appliquée au quiz : sa ZONE grandit elle-même (hauteur
     animée en px au rAF, même durée/courbe que la fenêtre) pendant que son
     texte arrive en fondu — le texte n'est plus « découvert » par la
     fenêtre qui grandit. */
  const animQuizRef = useRef<number | null>(null);
  function animerQuizH(de: number, vers: number, apres?: () => void) {
    const el = quizRef.current;
    if (!el) return;
    if (animQuizRef.current) cancelAnimationFrame(animQuizRef.current);
    const debut = performance.now();
    const DUREE = 950; // même durée que la fenêtre (synchronisés)
    const ease = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; // easeInOutCubic
    const pas = (now: number) => {
      const p = Math.min(1, (now - debut) / DUREE);
      el.style.height = `${de + (vers - de) * ease(p)}px`;
      if (p < 1) animQuizRef.current = requestAnimationFrame(pas);
      else {
        animQuizRef.current = null;
        apres?.();
      }
    };
    animQuizRef.current = requestAnimationFrame(pas);
  }
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizReponses, setQuizReponses] = useState<(PoleQuiz | null)[]>(
    Array(QUIZ_QUESTIONS.length).fill(null),
  );
  const [quizReveal, setQuizReveal] = useState(false);
  /* Fin du quiz : voile blanc + coche verte qui se dessine (patron de la
     validation de module du parcours solo), PUIS la révélation apparaît. */
  const [quizValide, setQuizValide] = useState(false);
  function revelerQuiz() {
    setQuizValide(true);
    window.setTimeout(() => {
      setQuizReveal(true);
      window.setTimeout(() => setQuizValide(false), 100); // le fondu de sortie part une fois la révélation affichée
    }, 1200);
  }
  const quizRef = useRef<HTMLDivElement | null>(null);
  const devine = quizReveal
    ? typeDevine(quizReponses.filter(Boolean) as PoleQuiz[])
    : undefined;
  function ouvrirQuiz() {
    /* Symétrique du menu : commencer à deviner FERME l'environnement
       « Choisir son profil » s'il était ouvert (un seul à la fois) — en
       GARDANT la fenêtre étendue (le quiz en a besoin). */
    if (menuMonte) fermerMenu(true);
    setQuizIdx(0);
    setQuizReponses(Array(QUIZ_QUESTIONS.length).fill(null));
    setQuizReveal(false);
    setMaxAtteint(0);
    setQuizActif(true);
    /* Le quiz est monté INVISIBLE ; son texte arrive en fondu quand
       l'agrandissement de la fenêtre est fini (tout de suite si déjà
       étendue). */
    setQuizVisible(false);
    const delta = etendreFenetre();
    /* double rAF : le quiz est peint caché (hauteur 0, opacité 0) puis la
       zone GRANDIT en même temps que la fenêtre pendant que le texte
       arrive en fondu (patron du menu). Si la fenêtre était déjà étendue
       (delta 0, ex. on vient du menu), simple fondu sur place. */
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const el = quizRef.current;
        if (el && delta > 0) {
          const cible = el.scrollHeight;
          el.style.overflow = "hidden";
          el.style.height = "0px";
          animerQuizH(0, cible, () => {
            el.style.height = ""; // retour au flux (hauteur naturelle)
            el.style.overflow = "";
          });
        }
        setQuizVisible(true);
        /* La fenêtre défile en douceur jusqu'au quiz. */
        el?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }),
    );
  }
  /* FERMETURE du quiz (re-clic sur « Commencer à deviner ») : miroir de
     l'ouverture. Le texte part en fondu, la zone se replie à 0 pendant que
     la fenêtre redescend à la hauteur du contenu, puis le quiz est démonté. */
  function fermerQuiz() {
    const el = quizRef.current;
    if (!el) return;
    setQuizVisible(false); // fondu de sortie, synchronisé avec le repli
    el.style.overflow = "hidden";
    replierFenetre();
    animerQuizH(el.offsetHeight, 0, () => {
      setQuizActif(false);
      el.style.height = "";
      el.style.overflow = "";
    });
  }
  /* Glissade entre questions, dans les DEUX sens : en avant l'ancienne sort
     par la gauche et la nouvelle entre par la droite ; en arrière c'est le
     miroir. Deux copies superposées pendant 0,45 s. */
  const [glisse, setGlisse] = useState<{ de: number; sens: 1 | -1 } | null>(null);
  /* La position la plus AVANCÉE atteinte : quand on revient en arrière, la
     barre garde ce chemin déjà parcouru en vert clair. */
  const [maxAtteint, setMaxAtteint] = useState(0);
  function allerA(idx: number, sens: 1 | -1) {
    if (glisse || idx < 0 || idx >= QUIZ_QUESTIONS.length) return;
    setGlisse({ de: quizIdx, sens });
    setQuizIdx(idx);
    setMaxAtteint((m) => Math.max(m, idx));
    window.setTimeout(() => setGlisse(null), 450);
  }
  function repondreQuiz(p: PoleQuiz) {
    if (glisse) return; // anti double-clic pendant la glissade
    const nouvelles = [...quizReponses];
    nouvelles[quizIdx] = p;
    setQuizReponses(nouvelles);
    if (nouvelles.every(Boolean)) revelerQuiz();
    else if (quizIdx < QUIZ_QUESTIONS.length - 1) allerA(quizIdx + 1, 1);
  }
  const menuRef = useRef<HTMLDivElement | null>(null); // pour remonter le scroll au changement de liste

  /* SURVOL D'UN PROFIL du menu → bloc d'aide sous « Non, devinons-le »
     (nom de la variante + tagline du type). Le contenu du dernier survol
     est GARDÉ pendant le fondu de sortie (patron des panneaux au survol). */
  const [survolActif, setSurvolActif] = useState(false);
  const [survolInfo, setSurvolInfo] = useState<{
    nom: string;
    code: string;
    v: string;
    tagline: string;
  } | null>(null);
  /* La description de la variante CHOISIE : une fois le clic fait, elle
     reste affichée (le survol d'autres lignes la remplace temporairement,
     elle revient quand le survol s'arrête). */
  const [infoChoisie, setInfoChoisie] = useState<{
    nom: string;
    code: string;
    v: string;
    tagline: string;
  } | null>(null);

  /* L'AGRANDISSEMENT DE LA CARTE : animé en PIXELS au rAF (méthode maison,
     cf. smoothCenter du test). Les transitions flex-grow ne donnent pas un
     mouvement fiable → on mesure la hauteur fermée et la hauteur cible
     (jusqu'en bas du bloc), et on anime la hauteur de la rangée entre les
     deux. Le menu n'est monté que le temps utile. */
  const [menuMonte, setMenuMonte] = useState(false);
  const rangRef = useRef<HTMLDivElement | null>(null); // la rangée des 2 cartes
  const contRef = useRef<HTMLDivElement | null>(null); // le conteneur (borne basse)
  const hFermeRef = useRef(0); // hauteur naturelle (fermée) de la rangée
  const animRef = useRef<number | null>(null);

  function animerHauteur(de: number, vers: number, apres?: () => void) {
    const el = rangRef.current;
    if (!el) return;
    if (animRef.current) cancelAnimationFrame(animRef.current);
    const debut = performance.now();
    const DUREE = 950; // allongée (750 → 950 ms) : agrandissement plus fluide, MÊME durée que la fenêtre (elles se suivent au pixel)
    const ease = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; // easeInOutCubic
    const pas = (now: number) => {
      const p = Math.min(1, (now - debut) / DUREE);
      el.style.height = `${de + (vers - de) * ease(p)}px`;
      if (p < 1) animRef.current = requestAnimationFrame(pas);
      else {
        animRef.current = null;
        apres?.();
      }
    };
    animRef.current = requestAnimationFrame(pas);
  }
  useEffect(
    () => () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      if (animFenRef.current) cancelAnimationFrame(animFenRef.current);
      if (animQuizRef.current) cancelAnimationFrame(animQuizRef.current);
    },
    [],
  );

  /* LA FENÊTRE elle-même : à l'ouverture elle fait la hauteur de son CONTENU
     (aucun des 2 environnements commencé), puis elle s'agrandit en douceur
     jusqu'à la pleine hauteur (92vh + 12) dès qu'on commence le menu OU le
     quiz, et se replie si on referme le menu sans quiz. Même méthode rAF
     que la rangée (hauteur en px, easeInOutCubic, 750 ms) : les deux
     animations partent au même instant avec la même courbe, donc la carte
     agrandie suit exactement le bas de la fenêtre. */
  const fenRef = useRef<HTMLDivElement | null>(null);
  const hFenFermeRef = useRef(0); // hauteur naturelle (fermée) de la fenêtre
  const animFenRef = useRef<number | null>(null);
  const fenEtendueRef = useRef(false);
  const hauteurPleine = () => Math.round(window.innerHeight * 0.92) + 12;
  function animerFenetre(de: number, vers: number, apres?: () => void) {
    const el = fenRef.current;
    if (!el) return;
    if (animFenRef.current) cancelAnimationFrame(animFenRef.current);
    const debut = performance.now();
    const DUREE = 950; // même durée que la rangée (obligatoire pour qu'elles se suivent)
    const ease = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; // easeInOutCubic
    const pas = (now: number) => {
      const p = Math.min(1, (now - debut) / DUREE);
      el.style.height = `${de + (vers - de) * ease(p)}px`;
      if (p < 1) animFenRef.current = requestAnimationFrame(pas);
      else {
        animFenRef.current = null;
        apres?.();
      }
    };
    animFenRef.current = requestAnimationFrame(pas);
  }
  /* Étend la fenêtre à la pleine hauteur ; renvoie le DELTA gagné (0 si
     déjà étendue) pour corriger la cible de la rangée du menu. `apres` est
     appelé à la FIN de l'extension (tout de suite si déjà étendue) : sert
     à faire arriver le contenu en fondu une fois la fenêtre posée. */
  function etendreFenetre(apres?: () => void) {
    const fen = fenRef.current;
    if (!fen) return 0;
    if (fenEtendueRef.current) {
      apres?.();
      return 0;
    }
    hFenFermeRef.current = fen.offsetHeight;
    const delta = Math.max(0, hauteurPleine() - fen.offsetHeight);
    fenEtendueRef.current = true;
    animerFenetre(fen.offsetHeight, hauteurPleine(), apres);
    return delta;
  }
  function replierFenetre() {
    const fen = fenRef.current;
    if (!fen || !fenEtendueRef.current) return;
    fenEtendueRef.current = false;
    animerFenetre(fen.offsetHeight, hFenFermeRef.current, () => {
      // Retour à la hauteur du contenu (le style en px est rendu au flux)
      if (fenRef.current) fenRef.current.style.height = "";
    });
  }

  function ouvrirMenu() {
    const rang = rangRef.current;
    const cont = contRef.current;
    if (!rang || !cont) return;
    /* Ouvrir le menu FERME le mini-quiz : un seul environnement à la fois
       (demande Luca). */
    setQuizActif(false);
    /* Hauteur fermée mémorisée UNIQUEMENT depuis l'état posé (pas en cours
       d'animation, sinon on mémorise une hauteur intermédiaire). */
    if (!menuMonte) hFermeRef.current = rang.offsetHeight;
    /* La fenêtre s'étend en même temps. Fenêtre CENTRÉE : son bas descend
       de delta/2 et son haut monte de delta/2 → la cible de la rangée
       (mesurée avant l'extension) gagne delta en tout. */
    const delta = etendreFenetre();
    const cible =
      cont.getBoundingClientRect().bottom - rang.getBoundingClientRect().top + delta;
    setMenuMonte(true);
    /* double rAF : le menu est peint caché d'abord, puis le fondu part */
    requestAnimationFrame(() => requestAnimationFrame(() => setChoixOuvert(true)));
    animerHauteur(rang.offsetHeight, cible);
  }
  function fermerMenu(garderFenetre = false) {
    const rang = rangRef.current;
    if (!rang) return;
    setChoixOuvert(false); // le fondu de sortie du menu part tout de suite
    setSurvolActif(false);
    /* La fenêtre se replie avec la rangée, SAUF si le quiz prend la suite
       (ouvrirQuiz ferme le menu mais garde la fenêtre étendue). */
    if (!garderFenetre) replierFenetre();
    animerHauteur(rang.offsetHeight, hFermeRef.current, () => {
      /* On démonte d'abord le menu ; la hauteur en px n'est rendue au flux
         normal qu'APRÈS ce démontage (effet ci-dessous). Les faire dans le
         même temps laissait une frame où le menu encore monté regonflait la
         carte → petit saut en fin de fermeture. */
      setMenuMonte(false);
      setTypeChoisi(null); // la prochaine ouverture repart sur les 16 types
      setTypeSurvole(null);
      setListeEnBas(false); // la flèche de défilement revient à l'ouverture
    });
  }
  /* Le type affiché dans le panneau des variantes : le choisi, sinon le survolé. */
  const typeAffiche = typeChoisi ?? typeSurvole;
  useEffect(() => {
    if (!menuMonte && rangRef.current) rangRef.current.style.height = "";
  }, [menuMonte]);

  // Fermeture à Échap. On ne bloque pas le scroll du fond.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  /* Ce que montre le bloc de description : le survol en cours, sinon la
     variante choisie, sinon le dernier survol (pour le fondu de sortie). */
  const infoBloc = survolActif ? survolInfo : (infoChoisie ?? survolInfo);

  const fenetre = (
    <>
      {/* BACKDROP : floute légèrement la page profil restée derrière */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 60,
          background: "rgba(255,255,255,0.45)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          opacity: open ? 1 : 0,
          visibility: open ? "visible" : "hidden",
          transition: "opacity .35s ease, visibility .35s",
        }}
      />

      {/* LA FENÊTRE : même largeur que le parcours solo. Hauteur : celle du
          CONTENU à l'ouverture (aucun choix commencé), puis animée en px au
          rAF (etendreFenetre/replierFenetre) — pas de height ici, le style
          posé à la main survit aux re-rendus (patron rangRef). */}
      <div
        ref={fenRef}
        role="dialog"
        aria-modal="true"
        style={{
          position: "fixed",
          zIndex: 70,
          left: "50%",
          top: "50%",
          width: "min(920px, 96vw)",
          background: "#fff",
          borderRadius: 24,
          boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
          overflow: "hidden",
          /* Plafond = la taille de la fenêtre du parcours (état étendu). */
          maxHeight: "calc(92vh + 12px)",
          marginTop: 6,
          display: "flex",
          flexDirection: "column",
          transform: open ? "translate(-50%,-50%) scale(1)" : "translate(-50%,-50%) scale(.92)",
          opacity: open ? 1 : 0,
          visibility: open ? "visible" : "hidden",
          transition: "transform .35s cubic-bezier(.34,1.3,.5,1), opacity .3s ease, visibility .35s",
        }}
      >
        <style>{`.fpd-noscroll{scrollbar-width:none}.fpd-noscroll::-webkit-scrollbar{display:none}@keyframes fpd-fade{from{opacity:0}to{opacity:1}}@keyframes fpd-sort-g{to{transform:translateX(-110%);opacity:0}}@keyframes fpd-entre-d{from{transform:translateX(110%);opacity:0}to{transform:translateX(0);opacity:1}}@keyframes fpd-sort-d{to{transform:translateX(110%);opacity:0}}@keyframes fpd-entre-g{from{transform:translateX(-110%);opacity:0}to{transform:translateX(0);opacity:1}}`}</style>

        {/* Fermer */}
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Fermer"
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            zIndex: 3,
            width: 32,
            height: 32,
            border: "none",
            cursor: "pointer",
            background: "rgba(0,0,0,0.05)",
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",
            color: "rgba(0,0,0,0.5)",
          }}
        >
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {/* PASSER À LA SUITE : flèche ronde verte dans la marge blanche de
            DROITE, à mi-hauteur (miroir de la flèche retour du parcours
            solo ; marge = (920 − 692) / 2 = 114 px → centre à 57 px).
            Apparaît quand la variante est VALIDÉE (le menu reste affiché).
            La suite (analyse du duo) reste à construire : visuel seul. */}
        {profilChoisi && (
          <button
            type="button"
            aria-label="Passer à la suite"
            style={{
              position: "absolute",
              right: 57,
              top: "50%",
              transform: "translate(50%,-50%)",
              zIndex: 3,
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: VERT,
              border: "none",
              boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
              animation: "fpd-fade .3s ease",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="#fff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        )}

        {/* En-tête (descendu de 34 px pour une ouverture plus aérée) */}
        {/* Même hauteur de titre que la fenêtre du parcours (30 px) */}
        <div style={{ padding: "30px 34px 0", maxWidth: 760, margin: "0 auto", width: "100%" }}>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color: VERT }}>
            Décris ton ou ta partenaire
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-500">
            Pas besoin qu&apos;il ou elle passe le test tout de suite : on
            pose son profil ensemble, et vous pourrez l&apos;affiner plus tard.
          </p>
        </div>

        {/* Contenu (défilable) — V1 : connais-tu déjà son profil ? */}
        <div
          className="fpd-noscroll"
          /* Marge basse = marge haute (30 px, demande Luca) : la fenêtre
             compacte respire pareil en haut et en bas. */
          style={{ padding: "0 34px 30px", flex: 1, minHeight: 0, overflowY: "auto" }}
        >
          <div
            ref={contRef}
            style={{
              maxWidth: 692,
              margin: "0 auto",
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <p className="mt-2 text-base font-bold" style={{ color: INK }}>
              Connais-tu déjà son type de personnalité ?
            </p>
            {/* Les 2 choix : cartes BLANCHES, même DA que « L'inviter » /
                « Répondre pour lui ou elle » (validé par Luca).
                Menu ouvert → la rangée prend TOUTE la hauteur restante :
                « Oui, je le connais » s'agrandit jusqu'en bas du bloc (la
                marge du bas = celle du haut). */}
            {/* La hauteur de cette rangée est animée en px par animerHauteur
                (aucune transition CSS ici). */}
            <div ref={rangRef} className="mt-4 flex min-h-0 flex-col gap-5 sm:flex-row">
              {/* Carte en <div> (un menu vit dedans, pas de bouton imbriqué) */}
              <div className="flex flex-1 min-w-0 flex-col items-start rounded-2xl border border-gray-100 bg-white p-6 text-left shadow-sm transition-shadow hover:shadow-md">
                <p className="text-base font-bold" style={{ color: VERT }}>
                  Oui, je le connais
                </p>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                  Choisis son profil parmi les 48, et on construit votre
                  parcours tout de suite.
                </p>
                {/* La pastille déclenche le menu ; la carte s'agrandit
                    jusqu'en bas (le menu occupe la hauteur restante). */}
                <div className="mt-5 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => (choixOuvert ? fermerMenu() : ouvrirMenu())}
                    className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105 cursor-pointer"
                    style={{ background: VERT }}
                  >
                    {profilChoisi ?? "Choisir son profil"}
                    <svg
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        transform: choixOuvert ? "rotate(180deg)" : "none",
                        transition: "transform .25s ease",
                      }}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  {/* « Reset » : n'apparaît qu'une fois une PERSONNALITÉ
                      cliquée (pas à l'ouverture du menu), remet le choix à
                      zéro sans fermer le menu. */}
                  {menuMonte && (
                    <button
                      type="button"
                      onClick={() => {
                        setTypeChoisi(null);
                        setTypeSurvole(null);
                        setProfilChoisi(null);
                        setInfoChoisie(null);
                        setSurvolActif(false);
                      }}
                      aria-hidden={!typeChoisi}
                      aria-label="Réinitialiser le choix"
                      className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full border bg-white transition-transform hover:scale-105 cursor-pointer"
                      style={{
                        borderColor: "rgba(51,164,116,0.35)",
                        opacity: typeChoisi ? 1 : 0,
                        pointerEvents: typeChoisi ? "auto" : "none",
                        transition: "opacity .3s ease",
                      }}
                    >
                      {/* Icône reset (flèche circulaire) */}
                      <svg
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        fill="none"
                        stroke={VERT}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M3 12a9 9 0 1 0 3.34-7L3 8" />
                        <path d="M3 3v5h5" />
                      </svg>
                    </button>
                  )}
                </div>
                {/* Le menu : les 48 profils par famille, défilable, il
                    remplit la hauteur restante de la carte agrandie.
                    Démonté quand fermé ; à l'ouverture il apparaît en fondu
                    À LA MÊME VITESSE (0,75 s, même courbe) que
                    l'agrandissement de la carte. */}
                {menuMonte && (
                <div
                  aria-hidden={!choixOuvert}
                  className="relative w-full flex-1 min-h-0"
                  style={{
                    marginTop: choixOuvert ? 12 : 0,
                    opacity: choixOuvert ? 1 : 0,
                    pointerEvents: choixOuvert ? "auto" : "none",
                    transition:
                      "opacity .95s cubic-bezier(.45,0,.25,1), margin-top .95s cubic-bezier(.45,0,.25,1)",
                  }}
                >
                <div
                  ref={menuRef}
                  onMouseLeave={() => setSurvolActif(false)}
                  onScroll={(e) => {
                    const el = e.currentTarget;
                    setListeEnBas(el.scrollTop + el.clientHeight >= el.scrollHeight - 4);
                  }}
                  className="fpd-noscroll h-full w-full overflow-y-auto rounded-2xl border bg-white shadow-sm"
                  /* CONTOUR VERT sur l'étape active : vert tant qu'aucun type
                     n'est choisi, puis retour au gris en douceur (le contour
                     vert passe à la carte des variantes). */
                  style={{
                    borderColor: typeChoisi ? "#f3f4f6" : VERT,
                    transition: "border-color .5s ease",
                  }}
                >
                    {/* Les 16 TYPES, groupés par famille. Le clic sur un type
                        ouvre ses variantes DANS LA COLONNE DE DROITE (idée UX
                        Luca), le menu reste sur les types. */}
                    {ROLE_ORDER.map((role) => (
                      <div key={role}>
                        <p
                          className="px-4 pt-4 pb-1 text-xs font-semibold uppercase tracking-wide"
                          style={{ color: VERT }}
                        >
                          {ROLES[role].name}
                        </p>
                        {typesByRole(role).map((t) => (
                          <button
                            key={t.code}
                            type="button"
                            onClick={() => setTypeChoisi(t)}
                            onMouseEnter={() => {
                              setTypeSurvole(t);
                              setSurvolInfo({ nom: t.name, code: t.code, v: "", tagline: t.tagline });
                              setSurvolActif(true);
                            }}
                            className="flex w-full items-center justify-between gap-3 px-4 py-2 text-left text-sm cursor-pointer transition-colors hover:bg-[rgba(51,164,116,0.08)]"
                          >
                            {/* « CODE · Nom », le code en vert (repère de scan) */}
                            <span className="font-semibold" style={{ color: INK }}>
                              <span style={{ color: VERT }}>{t.code}</span> · {t.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>
                  {/* Flèche « on peut défiler » : pastille verte en bas à
                      droite de la liste, s'efface une fois le fond atteint. */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-2 right-3"
                    style={{ opacity: listeEnBas ? 0 : 1, transition: "opacity .3s ease" }}
                  >
                    <span
                      className="grid h-7 w-7 animate-bounce place-items-center rounded-full shadow-sm"
                      /* Vert de marque translucide POSÉ SUR BLANC (piège
                         connu) : sinon le texte de la liste transparaît. */
                      style={{ background: `linear-gradient(${VERT}, ${VERT}), #fff` }}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="14"
                        height="14"
                        fill="none"
                        stroke="#fff"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </span>
                  </div>
                  </div>
                )}
              </div>
              {/* Colonne de droite : la carte « Non, devinons-le » (taille
                  naturelle) + le bloc d'aide au survol dessous. */}
              <div className="flex flex-1 min-w-0 flex-col">
                <button
                  type="button"
                  /* Re-clic quand le quiz est ouvert = le REFERMER (souhait
                     Luca) ; sinon l'ouvrir. */
                  onClick={() => (quizActif ? fermerQuiz() : ouvrirQuiz())}
                  className="flex w-full flex-shrink-0 flex-col items-start rounded-2xl border border-gray-100 bg-white p-6 text-left shadow-sm transition-all hover:shadow-md hover:scale-[1.01] cursor-pointer"
                >
                  <p className="text-base font-bold" style={{ color: VERT }}>
                    Non, devinons-le
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">
                    Quelques questions sur sa façon d&apos;être, et on devine
                    son profil ensemble.
                  </p>
                  <span
                    className="mt-5 inline-block rounded-full px-5 py-2.5 text-sm font-semibold text-white"
                    style={{ background: VERT }}
                  >
                    Commencer à deviner
                  </span>
                </button>
                {/* Panneau des VARIANTES du type choisi : s'ouvre ICI, dans
                    la colonne de droite (à la place de la description, qui
                    passe en dessous). Apparaît en fondu à chaque type. */}
                {menuMonte && typeAffiche && (
                  <div
                    key={typeAffiche.code}
                    onMouseLeave={() => setSurvolActif(false)}
                    className="mt-5 w-full flex-shrink-0 rounded-2xl border bg-white py-2 shadow-sm"
                    /* Contour vert quand le type est CHOISI (étape active). */
                    style={{
                      animation: "fpd-fade .3s ease",
                      opacity: choixOuvert ? 1 : 0,
                      borderColor: typeChoisi ? VERT : "#f3f4f6",
                      transition: "opacity .3s ease, border-color .5s ease",
                    }}
                  >
                    <p
                      className="px-4 pt-2 pb-1 text-xs font-semibold uppercase tracking-wide"
                      style={{ color: VERT }}
                    >
                      Sa variante ?
                    </p>
                    {(["V1", "V2", "V3"] as const).map((v) => {
                      const nom = NOMS_VARIANTES[typeAffiche.code]?.[v] ?? v;
                      return (
                        <button
                          key={v}
                          type="button"
                          onClick={() => {
                            /* Le menu, le panneau et la description RESTENT
                               affichés : seuls la pastille (titre) et la
                               flèche « suite » réagissent au choix. */
                            setProfilChoisi(`${typeAffiche.code} · ${nom}`);
                            /* La description de la variante choisie reste
                               affichée après le clic. */
                            setInfoChoisie({
                              nom,
                              code: typeAffiche.code,
                              v,
                              tagline:
                                descriptions?.[`${typeAffiche.code}-${v}`] ?? typeAffiche.tagline,
                            });
                          }}
                          onMouseEnter={() => {
                            setSurvolInfo({
                              nom,
                              code: typeAffiche.code,
                              v,
                              /* La description PROPRE à la variante ;
                                 tagline du type en repli. */
                              tagline: descriptions?.[`${typeAffiche.code}-${v}`] ?? typeAffiche.tagline,
                            });
                            setSurvolActif(true);
                          }}
                          className="flex w-full items-center justify-between gap-3 px-4 py-2 text-left text-sm cursor-pointer transition-colors hover:bg-[rgba(51,164,116,0.08)]"
                        >
                          <span className="font-semibold" style={{ color: INK }}>
                            {nom}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
                {/* Bloc d'aide : la description du type ou de la variante
                    survolés, SOUS le panneau des variantes. Monté avec le
                    menu ; le dernier contenu reste affiché pendant le fondu
                    de sortie. */}
                {/* min-h-0 + défilement interne : le bloc ne descend JAMAIS
                    plus bas que la carte « Oui, je le connais » (la colonne
                    partage la hauteur de la rangée), même marge en bas. */}
                {menuMonte && (
                  <div
                    aria-hidden={!(choixOuvert && (survolActif || infoChoisie))}
                    /* flex-1 : le bloc REMPLIT l'espace restant de la colonne,
                       son bord bas est donc toujours aligné avec le bas de la
                       carte « Oui, je le connais ». Conditionné à choixOuvert :
                       il S'EFFACE dès le début de la fermeture, sinon il finit
                       écrasé en petite barre verte pendant l'animation. */
                    className="fpd-noscroll mt-5 w-full flex-1 min-h-0 overflow-y-auto rounded-2xl p-5"
                    style={{
                      background: "rgba(51,164,116,0.12)",
                      opacity: choixOuvert && (survolActif || infoChoisie) ? 1 : 0,
                      transition: "opacity .3s ease",
                    }}
                  >
                    {infoBloc && (
                      <>
                        <p className="text-sm font-bold" style={{ color: INK }}>
                          {infoBloc.nom}
                          <span className="ml-2 text-xs font-semibold" style={{ color: VERT }}>
                            {infoBloc.v ? `${infoBloc.code} · ${infoBloc.v}` : infoBloc.code}
                          </span>
                        </p>
                        {/* 4 lignes MAXIMUM (line-clamp), le bloc garde sa taille */}
                        <p className="mt-1.5 text-sm leading-relaxed text-gray-600 line-clamp-4">
                          {infoBloc.tagline}
                        </p>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* ————— LE MINI-QUIZ « Non, devinons-le », SOUS les 2 cartes ————— */}
            {quizActif && (
              <div
                ref={quizRef}
                className="relative mt-5"
                /* Le texte du quiz arrive en FONDU synchronisé avec
                   l'agrandissement de la fenêtre (même durée 0,95 s, même
                   courbe que le fondu du menu). */
                style={{
                  opacity: quizVisible ? 1 : 0,
                  transition: "opacity .95s cubic-bezier(.45,0,.25,1)",
                }}
              >
                {/* FIN DU QUIZ : voile blanc + coche verte qui se dessine,
                    UNIQUEMENT sur la zone du questionnaire (patron de la
                    validation de module du parcours solo), puis la
                    révélation apparaît. */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 5,
                    background: "#fff",
                    display: "grid",
                    placeItems: "center",
                    opacity: quizValide ? 1 : 0,
                    visibility: quizValide ? "visible" : "hidden",
                    transition: "opacity .3s ease, visibility .3s",
                    pointerEvents: "none",
                  }}
                >
                  <span
                    style={{
                      width: 76,
                      height: 76,
                      borderRadius: "50%",
                      background: VERT,
                      display: "grid",
                      placeItems: "center",
                      transform: quizValide ? "scale(1)" : "scale(.5)",
                      transition: "transform .45s cubic-bezier(.34,1.5,.5,1)",
                    }}
                  >
                    <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      {/* La coche se DESSINE (trait qui avance) quand le voile apparaît */}
                      <path
                        d="M5 13l4 4L19 7"
                        style={{
                          strokeDasharray: 24,
                          strokeDashoffset: quizValide ? 0 : 24,
                          transition: "stroke-dashoffset .5s ease .2s",
                        }}
                      />
                    </svg>
                  </span>
                </div>
                {!quizReveal ? (
                  /* Pas de carte blanche autour : les questions vivent
                     directement dans la fenêtre (demande Luca). */
                  <div>
                    {/* Ligne d'honnêteté (leçon 16P : annoncer la limite
                        fabrique la confiance) au-dessus de la barre. */}
                    <p className="mb-3 text-sm leading-relaxed text-gray-500">
                      Douze questions ne valent pas le vrai test : le résultat
                      sera moins précis, mais il devrait s&apos;approcher de
                      qui il ou elle est vraiment. Vous pourrez l&apos;affiner
                      ensemble plus tard.
                    </p>
                    {/* Barre de progression : la MÊME que celle du test de
                        personnalité (barre grise h-2 + compteur à droite). */}
                    <div className="flex items-center gap-4">
                      <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                        {/* Le chemin DÉJÀ ATTEINT reste en vert clair quand
                            on revient en arrière (vert clair posé sur blanc,
                            piège du translucide). */}
                        <div
                          className="absolute inset-y-0 left-0 rounded-full"
                          style={{
                            width: `${(maxAtteint / QUIZ_QUESTIONS.length) * 100}%`,
                            background:
                              "linear-gradient(rgba(51,164,116,0.12), rgba(51,164,116,0.12)), #fff",
                            transition: "width .6s cubic-bezier(.45,0,.25,1)",
                          }}
                        />
                        {/* La barre suit la POSITION (quizIdx) : elle recule
                            quand on revient en arrière. */}
                        <div
                          className="absolute inset-y-0 left-0 rounded-full"
                          style={{
                            width: `${(quizIdx / QUIZ_QUESTIONS.length) * 100}%`,
                            background: VERT,
                            /* Remplissage bien progressif (0,6 s, même
                               courbe douce que les glissades) */
                            transition: "width .6s cubic-bezier(.45,0,.25,1)",
                          }}
                        />
                      </div>
                      <span className="whitespace-nowrap text-xs font-medium text-gray-500">
                        {quizIdx} / {QUIZ_QUESTIONS.length}
                      </span>
                    </div>
                    {/* GLISSADE entre questions : l'ancienne sort par la
                        GAUCHE (copie superposée, inerte), la nouvelle entre
                        par la DROITE. overflow-hidden = le cadre. */}
                    <div style={{ position: "relative", overflow: "hidden" }}>
                      {glisse && (
                        <div
                          key={`sortante-${glisse.de}`}
                          aria-hidden="true"
                          style={{
                            position: "absolute",
                            inset: 0,
                            pointerEvents: "none",
                            animation: `${glisse.sens === 1 ? "fpd-sort-g" : "fpd-sort-d"} .45s ease forwards`,
                          }}
                        >
                          <BlocQuestion
                            idx={glisse.de}
                            onRepondre={() => {}}
                            choisi={quizReponses[glisse.de]}
                          />
                        </div>
                      )}
                      <div
                        key={`question-${quizIdx}`}
                        style={
                          glisse
                            ? {
                                animation: `${glisse.sens === 1 ? "fpd-entre-d" : "fpd-entre-g"} .45s ease`,
                              }
                            : undefined
                        }
                      >
                        <BlocQuestion
                          idx={quizIdx}
                          onRepondre={repondreQuiz}
                          choisi={quizReponses[quizIdx]}
                        />
                      </div>
                    </div>
                    {/* Flèches de navigation : précédente en bas à GAUCHE,
                        suivante en bas à DROITE (active seulement si la
                        question courante est déjà répondue). */}
                    <div className="mt-4 flex items-center justify-between">
                      <button
                        type="button"
                        aria-label="Question précédente"
                        onClick={() => allerA(quizIdx - 1, -1)}
                        style={{
                          width: 34,
                          height: 34,
                          borderRadius: "50%",
                          background: VERT,
                          border: "none",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
                          display: "grid",
                          placeItems: "center",
                          cursor: "pointer",
                          opacity: quizIdx > 0 ? 1 : 0,
                          pointerEvents: quizIdx > 0 ? "auto" : "none",
                          transition: "opacity .2s ease",
                        }}
                      >
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M15 6l-6 6 6 6" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        aria-label="Question suivante"
                        onClick={() => {
                          if (quizIdx < QUIZ_QUESTIONS.length - 1) allerA(quizIdx + 1, 1);
                          else if (quizReponses.every(Boolean)) revelerQuiz();
                        }}
                        style={{
                          width: 34,
                          height: 34,
                          borderRadius: "50%",
                          background: VERT,
                          border: "none",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
                          display: "grid",
                          placeItems: "center",
                          cursor: "pointer",
                          opacity: quizReponses[quizIdx] ? 1 : 0,
                          pointerEvents: quizReponses[quizIdx] ? "auto" : "none",
                          transition: "opacity .2s ease",
                        }}
                      >
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 6l6 6-6 6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* LA RÉVÉLATION (le moment viral : « c'est tellement lui ! ») */
                  <div
                    className="rounded-2xl border border-gray-100 bg-white p-7 text-center shadow-sm"
                    style={{ animation: "fpd-fade .3s ease" }}
                  >
                    <p className="text-sm text-gray-500">
                      Ton ou ta partenaire est probablement :
                    </p>
                    <p className="mt-2 text-2xl font-bold" style={{ color: VERT }}>
                      {devine?.name}
                      <span className="ml-2 text-sm font-semibold">{devine?.code}</span>
                    </p>
                    {devine?.tagline && (
                      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-gray-500">
                        {devine.tagline}
                      </p>
                    )}
                    <div className="mt-6 flex items-center justify-center gap-3">
                      {/* Visuel seul : la suite (variante ? analyse du duo ?)
                          reste à brancher avec Luca. */}
                      <button
                        type="button"
                        className="rounded-full px-6 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105 cursor-pointer"
                        style={{ background: VERT }}
                      >
                        Continuer
                      </button>
                      <button
                        type="button"
                        onClick={ouvrirQuiz}
                        className="rounded-full border bg-white px-5 py-2.5 text-sm font-semibold transition-transform hover:scale-105 cursor-pointer"
                        style={{ color: VERT, borderColor: "rgba(51,164,116,0.35)" }}
                      >
                        Recommencer
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={triggerClassName}>
        {children}
      </button>
      {monte && createPortal(fenetre, document.body)}
    </>
  );
}
