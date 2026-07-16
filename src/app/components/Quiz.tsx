"use client";

import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import Reveal from "./Reveal";
import MeshGradient from "./MeshGradient";

// Composant de test réutilisable (échelle 5 niveaux, barre de progression fixe).
// Habillage façon Apple (espace, typo, cartes arrondies) — couleurs et logique inchangées.

export interface QuizStep {
  step: string;
  title: string;
  description: string;
  color: string;
  bg: string;
}

export interface QuizProps {
  title: string;
  titleNode?: ReactNode; // si fourni, remplace le rendu par défaut du titre (titre animé).
  subtitle: string;
  microligne?: ReactNode; // petite ligne sous le sous-titre (ex. « Gratuit · 10 minutes · 69 questions »)
  badge?: string;
  titleAccent?: string;
  questions: string[];
  questionIds?: string[]; // clés des réponses (sinon index). Indispensable pour un set dynamique.
  total?: number; // dénominateur de la barre (sinon questions.length).
  phase1Count?: number; // si défini, insère phase2Intro juste avant la question à cet index.
  phase2Intro?: ReactNode;
  steps?: QuizStep[];
  accent?: string;
  agreeColor?: string;
  disagreeColor?: string;
  resultLabel?: string;
  note?: string;
  onSubmit?: (answers: Record<string, number>, info: { email: string; newsletter: boolean }) => void;
  onAnswersChange?: (answers: Record<string, number>) => void;
}

const VALUES = [1, 2, 3, 4, 5];
const SIZE = 46;
// Libellés d'aide pour les 3 cercles du milieu (affichés seulement sur la 1re question).
const INDIC_MILIEU = ["Plutôt pas d'accord", "Neutre / un peu des deux", "Plutôt d'accord"];

// Défilement fluide maison : le scroll-behavior natif est capricieux sur cette page (il téléporte
// ou ne bouge pas selon le navigateur), donc on anime nous-mêmes le scroll, ce qui marche partout.
// La zone utile commence sous la navbar + barre de progression (~90 px) : on
// centre dans CETTE zone, sinon la marge du bas paraît plus grande que celle
// du haut (décalage = moitié de la hauteur occupée en haut).
const DECALAGE_BARRE = 45;

function smoothCenter(el: HTMLElement | null) {
  if (!el) return;
  const root = document.documentElement;
  const start = window.scrollY;
  const target = start + el.getBoundingClientRect().top + el.offsetHeight / 2 - (window.innerHeight / 2 + DECALAGE_BARRE);
  const dist = target - start;
  if (Math.abs(dist) < 2) return;
  const dur = 480;
  const prevBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto"; // on évite que le smooth CSS interfère avec notre animation
  let t0: number | null = null;
  function step(ts: number) {
    if (t0 === null) t0 = ts;
    const p = Math.min(1, (ts - t0) / dur);
    const e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2; // easeInOutQuad
    window.scrollTo(0, start + dist * e);
    if (p < 1) requestAnimationFrame(step);
    else root.style.scrollBehavior = prevBehavior;
  }
  requestAnimationFrame(step);
}

export default function Quiz({
  title,
  titleNode,
  subtitle,
  microligne,
  badge,
  titleAccent,
  questions,
  questionIds,
  total: totalProp,
  phase1Count,
  phase2Intro,
  steps,
  accent = "rgba(66,152,180,0.75)",
  agreeColor = "rgba(51,164,116,0.75)",
  resultLabel = "Voir mon résultat",
  note = "Réponds à toutes les questions pour voir ton résultat.",
  onSubmit,
  onAnswersChange,
}: QuizProps) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [email, setEmail] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  // Affichage de l'écran « Test terminé » avec fondu d'entrée/sortie (comme le bloc variante).
  const [showEnd, setShowEnd] = useState(false);
  const [endLeaving, setEndLeaving] = useState(false);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const q1Ref = useRef<HTMLDivElement | null>(null);
  const endRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const prevLenRef = useRef(questions.length);

  // Clé de réponse : id de question si fourni, sinon position.
  const keyOf = (i: number) => questionIds?.[i] ?? String(i);
  // Réponses comptées uniquement parmi les questions actuellement affichées
  // (les réponses devenues hors-sujet après recalcul du type sont ignorées).
  const answered = questions.reduce((n, _q, i) => (answers[keyOf(i)] != null ? n + 1 : n), 0);
  const total = totalProp ?? questions.length;
  const progress = Math.round((answered / total) * 100);

  // Remonte les réponses au parent (pour recalcul du type / des questions de variante).
  useEffect(() => {
    onAnswersChange?.(answers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers]);

  // Fondu de sortie des blocs étape + flèche + barre : PILOTÉS EN DOM DIRECT
  // (aucun état React → aucun re-rendu des 69 questions pendant le scroll).
  const FLECHE_DEBUT = 110; // px de scroll où la flèche commence à disparaître
  const FLECHE_FIN = 260; // px de scroll où elle est totalement invisible
  const stepsRef = useRef<HTMLElement>(null); // section des 3 blocs étape (fondu de sortie)
  const barreRef = useRef<HTMLDivElement>(null); // barre de progression fixée


  // Mise en scène « 3 questions » : l'opacité et l'échelle de chaque question
  // suivent sa distance au centre de l'écran (pleine au centre, en retrait en
  // haut/bas). PERF : les positions sont mises en cache (aucune mesure pendant
  // le scroll), seules les questions proches de l'écran sont stylées, et le
  // GPU compose (will-change).
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let attente = false;
    let cache: { el: HTMLElement; milieu: number; h: number; premiere: boolean }[] = [];

    const mesurerCache = () => {
      cache = [];
      refs.current.forEach((el, idx) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.willChange = "opacity, transform";
        cache.push({ el, milieu: r.top + window.scrollY + r.height / 2, h: r.height, premiere: idx === 0 });
      });
    };

    const appliquer = () => {
      const vh = window.innerHeight;
      const centre = window.scrollY + vh / 2 + DECALAGE_BARRE; // même centre que smoothCenter
      for (const { el, milieu, h, premiere } of cache) {
        let d = Math.abs((milieu - centre) / vh);
        if (premiere) {
          // La 1re question est AUSSI pleine à sa position d'atterrissage
          // (calée à 78 px du haut, au clic d'une étape ou au ressort d'entrée)...
          const dAtterrissage = Math.abs((milieu - (window.scrollY + 78 + h / 2)) / vh);
          d = Math.min(d, dAtterrissage);
          // ...et EN HAUT DE PAGE (elle dépasse en bas de l'écran d'arrivée : jamais estompée).
          if (window.scrollY < 150) d = 0;
        }
        if (d > 1.6) continue; // loin de l'écran : aucune écriture
        const op = d < 0.16 ? 1 : Math.max(0.04, 1 - (d - 0.16) * 2.7);
        el.style.opacity = String(op);
        el.style.transform = `scale(${Math.max(0.93, 1 - d * 0.06)})`;
      }
    };

    const surScroll = () => {
      if (attente) return;
      attente = true;
      requestAnimationFrame(() => { appliquer(); attente = false; });
    };
    const surResize = () => { mesurerCache(); appliquer(); };

    mesurerCache();
    appliquer();
    // La mise en page peut bouger (intro de la phase 2 qui apparaît…) : on recale le cache.
    const ro = new ResizeObserver(surResize);
    ro.observe(document.body);
    window.addEventListener("scroll", surScroll, { passive: true });
    window.addEventListener("resize", surResize);
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", surScroll);
      window.removeEventListener("resize", surResize);
    };
  }, [questions.length]);
  // Indications de la 1re question : visibles quand elle entre à l'écran, masquées sinon.
  // Indications de Q1 : opacité pilotée directement par le scroll (fondu fluide à l'aller comme au
  // retour). Montées tant que Q1 n'a pas de réponse, et elles réservent leur place (aucun saut).
  const [indicOpacity, setIndicOpacity] = useState(0);
  // Délai d'apparition : les indications ne se montrent qu'1 s après l'arrivée sur la question.
  const inZone = indicOpacity > 0.05;
  const [delayPassed, setDelayPassed] = useState(false);
  useEffect(() => {
    if (!inZone) {
      setDelayPassed(false);
      return;
    }
    const t = setTimeout(() => setDelayPassed(true), 500);
    return () => clearTimeout(t);
  }, [inZone]);
  const indicLastRef = useRef(-1);
  useEffect(() => {
    let attente = false;
    function majVisuels() {
      const y = window.scrollY;
      // Fondu de sortie des blocs étape (DOM direct).
      const exitP = Math.max(0, Math.min(1, (y - 470) / 170));
      if (stepsRef.current) {
        stepsRef.current.style.opacity = String(1 - exitP);
        stepsRef.current.style.transform = `translateY(${-exitP * 36}px)`;
      }
      // Barre de progression : apparaît quand la flèche s'efface (DOM direct).
      const fo = Math.max(0, Math.min(1, 1 - (y - FLECHE_DEBUT) / (FLECHE_FIN - FLECHE_DEBUT)));
      if (barreRef.current) {
        barreRef.current.style.opacity = String(1 - fo);
        barreRef.current.style.pointerEvents = fo > 0.99 ? "none" : "auto";
      }
      // Indications de Q1 : fondu fluide des DEUX côtés selon la position du texte de Q1.
      // Quantifié au dixième pour ne pas re-rendre à chaque frame.
      const q1 = q1Ref.current;
      if (q1) {
        const t = q1.getBoundingClientRect().top / window.innerHeight;
        const opBas = (0.85 - t) / 0.3; // fondu d'arrivée (visible dès le haut de page, Q1 dépassant en bas)
        const opHaut = (t + 0.2) / 0.25; // fondu de sortie (Q1 part par le haut quand on descend)
        let op = Math.round(Math.max(0, Math.min(1, Math.min(opBas, opHaut))) * 10) / 10;
        if (window.scrollY < 150) op = 1; // en haut de page : consignes pleines, jamais estompées
        if (op !== indicLastRef.current) {
          indicLastRef.current = op;
          setIndicOpacity(op);
        }
      }
    }
    function onScroll() {
      if (attente) return;
      attente = true;
      requestAnimationFrame(() => { majVisuels(); attente = false; });
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  function handleAnswer(i: number, v: number) {
    const k = keyOf(i);
    // Re-cliquer la bulle déjà sélectionnée → on annule la réponse et on remonte d'une question.
    if (answers[k] === v) {
      setAnswers((a) => {
        const copie = { ...a };
        delete copie[k];
        return copie;
      });
      const prev = refs.current[i - 1];
      if (prev) {
        setTimeout(() => smoothCenter(prev), 150);
      }
      return;
    }
    setAnswers((a) => ({ ...a, [k]: v }));
    // Dernière question de phase 1 : on laisse l'effet amener le bloc « variante » à l'écran.
    if (phase1Count != null && i === phase1Count - 1) return;
    const next = refs.current[i + 1];
    if (next) {
      setTimeout(() => smoothCenter(next), 150);
    }
  }

  // Quand les questions de variante viennent d'apparaître → on descend sur le bloc d'intro.
  useEffect(() => {
    const prev = prevLenRef.current;
    prevLenRef.current = questions.length;
    if (phase1Count != null && prev <= phase1Count && questions.length > phase1Count) {
      setTimeout(() => introRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 220);
    }
  }, [questions.length, phase1Count]);

  // Dernière réponse atteinte → on amène l'écran « Test terminé » à l'écran.
  useEffect(() => {
    if (answered === total) {
      const id = setTimeout(
        () => endRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }),
        220,
      );
      return () => clearTimeout(id);
    }
  }, [answered, total]);

  // Carte « Test terminé » : montée au complet, démontée avec un fondu de sortie.
  useEffect(() => {
    if (answered === total) {
      setShowEnd(true);
      setEndLeaving(false);
    } else if (showEnd) {
      setEndLeaving(true);
      const t = setTimeout(() => {
        setShowEnd(false);
        setEndLeaving(false);
      }, 360);
      return () => clearTimeout(t);
    }
  }, [answered, total, showEnd]);

  return (
    <div className="bg-white">

      {/* Barre + compteur FIXÉS sous la navbar (opacité pilotée en DOM direct) */}
      <div
        ref={barreRef}
        className="fixed left-0 right-0 z-30 bg-white/90 backdrop-blur py-3"
        style={{
          top: "53px",
          opacity: 0,
          pointerEvents: "none",
        }}
      >
        <div className="max-w-3xl mx-auto px-4 md:px-0 flex items-center gap-4">
          <div className="h-2 rounded-full bg-gray-100 overflow-hidden flex-1">
            <div className="h-full transition-all" style={{ width: `${progress}%`, background: agreeColor }} />
          </div>
          <span className="text-xs font-medium text-gray-500 whitespace-nowrap">
            {answered} / {total}
          </span>
        </div>
      </div>

      {/* Titre — entrée en cascade (comme le héros de la home), bandeau resserré */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes tq-entre{from{opacity:0;transform:translateY(26px);}to{opacity:1;transform:none;}}
            .tq-e{animation:tq-entre .9s cubic-bezier(.22,.9,.3,1) both;}
            .tq-e2{animation-delay:.25s;}
            .tq-e3{animation-delay:.45s;}
            .tq-e4{animation-delay:.65s;}
            @keyframes tq-tampon{from{opacity:0;transform:scale(2.6) rotate(-6deg);}to{opacity:1;transform:scale(1) rotate(0deg);}}
            .tq-t{animation:tq-tampon .4s cubic-bezier(.2,1.35,.45,1) both;}
            @keyframes tq-fade{from{opacity:0;}to{opacity:1;}}
            .tq-f{animation:tq-fade .4s ease both;}
            @keyframes tq-respire{0%,100%{transform:scale(1);}50%{transform:scale(1.04);}}
            .tq-r{display:inline-block;animation:tq-respire 2.6s ease-in-out infinite;}
            /* fondu d'entrée + respiration sur le MÊME élément (délais séparés en inline) */
            .tq-fr{display:inline-block;animation:tq-fade .4s ease both, tq-respire 2.6s ease-in-out infinite;}
            @media (prefers-reduced-motion: reduce){.tq-e,.tq-t,.tq-f,.tq-r,.tq-fr{animation:none;}}
          `,
        }}
      />
      {/* Le fond (MeshGradient) : FIXÉ au viewport, il suit l'écran sur toute la
          page (comme la home), sans bouger ni s'effacer.
          `isolate` : garde le dégradé (z:-10) devant le fond blanc de la page
          (piège documenté : sans contexte d'empilement, il passe derrière le bg-white). */}
      <div className="relative isolate">
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[100svh]">
        <MeshGradient />
      </div>
      <section className="relative pt-10 md:pt-12 pb-20">
        {/* Aligné à gauche sur la même marge que le texte des cartes étape
            (colonne max-w-3xl + retrait de 24 px, le padding interne des cartes) */}
        <div className="max-w-3xl mx-auto px-4 md:px-0">
          <div className="pl-6 text-left">
            <div className="tq-e">
              {titleNode ?? (
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-800 mb-3 inline-flex items-center gap-2.5 flex-wrap">
                  <span>{title}</span>
                  {titleAccent && <span style={{ color: agreeColor }}>{titleAccent}</span>}
                  {badge && (
                    <span className="text-white text-lg font-bold px-3 py-1 rounded-xl" style={{ background: agreeColor }}>
                      {badge}
                    </span>
                  )}
                </h1>
              )}
            </div>
            <p className="tq-e tq-e2 text-xl md:text-2xl text-gray-500 max-w-2xl mt-4 leading-relaxed">{subtitle}</p>
            {microligne && (
              <p className="tq-e tq-e3 mt-3 text-sm text-gray-500">{microligne}</p>
            )}
          </div>
        </div>
      </section>

      {/* Les 3 étapes — cartes arrondies, fondu au scroll */}
      {steps && steps.length > 0 && (
        <section
          ref={stepsRef}
          className="relative z-10 max-w-3xl mx-auto px-4 md:px-0 mb-4 -mt-[48px]"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {steps.map((s, idx) => (
              <Reveal key={s.step} delay={idx * 90}>
                <div
                  className="relative rounded-3xl p-6 h-full border border-white/50 backdrop-blur-md overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
                  style={{ background: s.bg }}
                  onClick={() => refs.current[0]?.scrollIntoView({ behavior: "smooth", block: "start" })}
                >
                  <div className="relative z-10">
                    <span
                      className="inline-block text-[10px] font-bold text-white px-2.5 py-1 rounded-full mb-3 uppercase tracking-wider"
                      style={{ background: s.color }}
                    >
                      {s.step}
                    </span>
                    <h3 className="font-bold text-gray-800 text-base mb-1.5 leading-snug">{s.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{s.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

        </section>
      )}
      </div>

      {/* Questions — plus d'air entre chaque */}
      <section className="max-w-3xl mx-auto px-4 md:px-0 mb-10 w-full">
        {questions.map((q, i) => {
          const montrerIndic = i === 0; // montées en permanence sur Q1 (place réservée stable, pas de saut)
          const q1Repondue = answers[keyOf(0)] != null;
          const indicOp = !q1Repondue && delayPassed ? indicOpacity : 0; // nulle avant le délai d'1 s et dès que Q1 est répondue
          const noteOp = delayPassed ? indicOpacity : 0; // la note, elle, reste visible après la réponse (elle se transforme)
          return (
          <Fragment key={i}>
            {phase1Count != null && i === phase1Count && phase2Intro && (
              <div ref={introRef} id="intro-variante" className="scroll-mt-28">
                {phase2Intro}
              </div>
            )}
          <div
            ref={(el) => {
              refs.current[i] = el;
              if (i === 0) q1Ref.current = el;
            }}
            id={i === 0 ? "premiere-question" : phase1Count != null && i === phase1Count ? "premiere-question-variante" : undefined}
            className={`${i === 0 ? "pt-6 pb-11 scroll-mt-[78px]" : "py-11 scroll-mt-32"} ${i > 0 ? "border-t border-gray-100" : ""}`}
          >
            {/* Entrée en cascade de Q1 au chargement : wrapper INTERNE (le bloc
                lui-même est piloté en DOM direct par la mise en scène « 3 questions »,
                une animation dessus écraserait ses styles inline). */}
            <div className={i === 0 ? "tq-e tq-e4" : undefined}>
            {montrerIndic && (
              <div className="relative text-left mb-2" style={{ opacity: noteOp, transition: "opacity 0.45s ease" }}>
                {/* À la 1re réponse : la note se transforme À LA VITESSE de la
                    descente vers la question suivante (smoothCenter = 480 ms) */}
                <span
                  className="inline-block italic text-[15px] font-medium tq-r"
                  style={{ color: "rgba(51,164,116,0.85)", opacity: q1Repondue ? 0 : 1, transition: "opacity 0.48s ease" }}
                >
                  Clic sur la pastille pour faire ton choix
                </span>
                {/* …et « À toi de jouer ! » apparaît à sa place (typo strictement identique) */}
                <span
                  className="absolute left-0 top-0 inline-block italic text-[15px] font-medium tq-r whitespace-nowrap"
                  style={{ color: "rgba(51,164,116,0.85)", opacity: q1Repondue ? 1 : 0, transition: "opacity 0.48s ease" }}
                  aria-hidden={!q1Repondue}
                >
                  À toi de jouer !
                </span>
              </div>
            )}
            <p className="text-xl mb-8 leading-relaxed text-gray-800 text-left" style={{ fontWeight: 450 }}>
              {q}
            </p>
            <div className="relative flex items-center justify-between">
              {/* Sur Q1, « Pas d'accord » arrive avec le 1er cercle, « D'accord » avec le dernier,
                  et les deux respirent doucement (comme les indications) */}
              <span className={`text-[18px] whitespace-nowrap${i === 0 ? " tq-fr" : ""}`} style={{ color: "rgba(51,164,116,0.85)", fontWeight: i === 0 ? 500 : 450, ...(i === 0 ? { animationDelay: "0.9s, 0s" } : {}) }}>
                Pas d&apos;accord
              </span>
              {VALUES.map((v, idx) => {
                const active = answers[keyOf(i)] === v;
                const c = "rgba(51,164,116,0.85)"; // tous les cercles au vert de marque
                const indic = idx >= 1 && idx <= 3 ? INDIC_MILIEU[idx - 1] : null;
                const above = idx === 2; // « Neutre » se place au-dessus de son cercle
                const label = (
                  <span
                    className="italic whitespace-nowrap leading-tight tq-r"
                    style={{ padding: "4px 6px", color: "rgba(51,164,116,0.85)", fontSize: "15px", fontWeight: 500 }}
                  >
                    {indic}
                  </span>
                );
                const trait = <div style={{ width: "1.5px", height: 8, background: "rgba(51,164,116,0.55)" }} />;
                return (
                  <div key={v} className="relative flex-shrink-0" style={{ width: SIZE, height: SIZE }}>
                    <button
                      aria-label={`Niveau ${v}`}
                      onClick={() => handleAnswer(i, v)}
                      className={`rounded-full cursor-pointer transition-all hover:scale-105${i === 0 ? " tq-t" : ""}`}
                      style={{
                        width: SIZE,
                        height: SIZE,
                        borderWidth: active ? 0 : "2px",
                        borderStyle: "solid",
                        borderColor: c,
                        background: active ? c : "transparent",
                        // Entrée « tampon » (comme Exclusivité sur la home), un cercle
                        // après l'autre de gauche à droite, après l'arrivée du bloc Q1.
                        ...(i === 0 ? { animationDelay: `${0.9 + idx * 0.12}s` } : {}),
                      }}
                    />
                    {montrerIndic && indic && (
                      <div
                        className="pointer-events-none absolute left-1/2 -translate-x-1/2"
                        style={{ opacity: indicOp, transition: "opacity 0.45s ease", ...(above ? { bottom: "100%" } : { top: "100%" }) }}
                        aria-hidden
                      >
                        {/* Le libellé arrive EN MÊME TEMPS que son cercle (même délai
                            que le tampon) — wrapper interne : l'opacité au scroll
                            reste pilotée par le parent */}
                        <div className="tq-f flex flex-col items-center" style={{ animationDelay: `${0.9 + idx * 0.12}s` }}>
                        {above ? (
                          <>
                            {label}
                            {trait}
                          </>
                        ) : (
                          <>
                            {trait}
                            {label}
                          </>
                        )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              <span className={`text-[18px] whitespace-nowrap${i === 0 ? " tq-fr" : ""}`} style={{ color: "rgba(51,164,116,0.85)", fontWeight: i === 0 ? 500 : 450, ...(i === 0 ? { animationDelay: "1.38s, 0s" } : {}) }}>
                D&apos;accord
              </span>
            </div>
            </div>
          </div>
          </Fragment>
          );
        })}
      </section>

      {/* pb en vh : repousse le footer hors de l'écran quand la carte
          « Test terminé » est centrée (son trait du haut gâchait la vue).
          Le centrage incluant le padding, il faut que la section dépasse
          la hauteur d'écran : 60vh couvre les grands écrans. */}
      <section ref={endRef} className="max-w-md mx-auto px-6 pt-12 pb-[60vh] text-center scroll-mt-28">
        {!showEnd ? (
          <p className="text-sm text-gray-400">{note}</p>
        ) : (
          <div className={endLeaving ? "variante-leave" : "variante-enter"}>
            <div className="bg-white border border-gray-100 rounded-[26px] shadow-[0_12px_40px_-12px_rgba(0,0,0,0.12)] px-8 py-9">
              <p
                className="text-xs font-bold uppercase tracking-[1.5px] mb-2.5"
                style={{ color: "rgba(51,164,116,0.9)" }}
              >
                Test terminé
              </p>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-800 mb-2.5">
                Ton portrait est prêt.
              </h2>
              <p className="text-gray-500 mb-6 leading-relaxed">
                Laisse ton e-mail pour le recevoir et le retrouver quand tu veux. C&apos;est facultatif.
              </p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ton@email.com"
                className="w-full rounded-full py-4 text-base font-medium text-center text-gray-600 placeholder:text-[rgba(0,0,0,0.4)] outline-none mb-3"
                style={{ background: "#ebedf0" }}
              />
              {email.trim() !== "" && (
                <label className="newsletter-fade flex items-center justify-center gap-2.5 mb-4 text-sm text-gray-600 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={newsletter}
                    onChange={(e) => setNewsletter(e.target.checked)}
                    className="peer sr-only"
                  />
                  <span className="w-5 h-5 rounded-md border border-gray-600 bg-white flex items-center justify-center transition-colors peer-checked:bg-[rgba(51,164,116,0.85)] peer-checked:border-[rgba(51,164,116,0.85)]">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                  <span className="transition-opacity peer-checked:opacity-50">Recevoir la newsletter</span>
                </label>
              )}
              <button
                onClick={() => onSubmit?.(answers, { email: email.trim(), newsletter })}
                className="w-full text-white font-semibold py-4 rounded-full text-base transition hover:opacity-90"
                style={{ background: accent }}
              >
                {resultLabel}
              </button>
              <p className="text-xs text-gray-400 mt-4">
                Ton résultat s&apos;affiche directement, avec ou sans e-mail.
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
