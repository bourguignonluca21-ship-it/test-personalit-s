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
  onSubmit?: (answers: Record<string, number>) => void;
  onAnswersChange?: (answers: Record<string, number>) => void;
}

const VALUES = [1, 2, 3, 4, 5];
const SIZE = 46;
// Rampe monochrome verte : Pas d'accord (pâle, gauche) → D'accord (foncé, droite)
const RAMP = ["#c4e7d4", "#93d3b6", "#5cba8f", "#33a474", "#1f7d56"];

export default function Quiz({
  title,
  titleNode,
  subtitle,
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

  // Fondu de sortie quand les blocs remontent et quittent l'écran.
  const [exitP, setExitP] = useState(0);
  // Opacité de la flèche « descendre », pilotée par le scroll : pleine en haut, elle s'efface en
  // douceur sur les ~150px (≈4cm) de scroll après les blocs étape, et réapparaît en remontant.
  // Monotone, donc pas de réapparition parasite plus bas.
  const FLECHE_DEBUT = 110; // px de scroll où la flèche commence à disparaître
  const FLECHE_FIN = 260; // px de scroll où elle est totalement invisible
  const [flecheOpacity, setFlecheOpacity] = useState(1);
  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      setExitP(Math.max(0, Math.min(1, (y - 470) / 170)));
      setFlecheOpacity(Math.max(0, Math.min(1, 1 - (y - FLECHE_DEBUT) / (FLECHE_FIN - FLECHE_DEBUT))));
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
        setTimeout(() => prev.scrollIntoView({ behavior: "smooth", block: "center" }), 150);
      }
      return;
    }
    setAnswers((a) => ({ ...a, [k]: v }));
    // Dernière question de phase 1 : on laisse l'effet amener le bloc « variante » à l'écran.
    if (phase1Count != null && i === phase1Count - 1) return;
    const next = refs.current[i + 1];
    if (next) {
      setTimeout(() => next.scrollIntoView({ behavior: "smooth", block: "center" }), 150);
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

      {/* Barre + compteur FIXÉS sous la navbar */}
      <div
        className="fixed left-0 right-0 z-30 bg-white/90 backdrop-blur py-3"
        style={{ top: "53px" }}
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

      {/* Titre — même espacement que le hero de l'accueil */}
      <Reveal>
        <section className="relative overflow-hidden text-center px-6 pt-24 md:pt-28 pb-16 min-h-[450px]">
          <MeshGradient />
          {titleNode ?? (
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-800 mb-3 inline-flex items-center justify-center gap-2.5 flex-wrap">
              <span>{title}</span>
              {titleAccent && <span style={{ color: agreeColor }}>{titleAccent}</span>}
              {badge && (
                <span className="text-white text-lg font-bold px-3 py-1 rounded-xl" style={{ background: agreeColor }}>
                  {badge}
                </span>
              )}
            </h1>
          )}
          <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto mt-7 leading-relaxed">{subtitle}</p>
        </section>
      </Reveal>

      {/* Les 3 étapes — cartes arrondies, fondu au scroll */}
      {steps && steps.length > 0 && (
        <section
          className="relative z-10 max-w-3xl mx-auto px-4 md:px-0 mb-16 -mt-[68px]"
          style={{ opacity: 1 - exitP, transform: `translateY(${-exitP * 36}px)` }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {steps.map((s, idx) => (
              <Reveal key={s.step} delay={idx * 90}>
                <div
                  className={`relative rounded-3xl p-6 h-full border border-white/50 backdrop-blur-md${
                    idx === 0 ? " cursor-pointer transition-transform hover:scale-[1.02]" : ""
                  }`}
                  style={{ background: s.bg }}
                  onClick={
                    idx === 0
                      ? () => refs.current[0]?.scrollIntoView({ behavior: "smooth", block: "center" })
                      : undefined
                  }
                >
                  {idx === 0 && (
                    <div
                      className="pointer-events-none absolute bottom-1 left-1/2 -translate-x-1/2 z-20 animate-bounce"
                      style={{ opacity: flecheOpacity }}
                      aria-hidden
                    >
                      <svg
                        width="26"
                        height="26"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="rgb(51,164,116)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M8 10.5l4 4 4-4" />
                      </svg>
                    </div>
                  )}
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

      {/* Questions — plus d'air entre chaque */}
      <section className="max-w-3xl mx-auto px-4 md:px-0 mb-10 w-full">
        {questions.map((q, i) => (
          <Fragment key={i}>
            {phase1Count != null && i === phase1Count && phase2Intro && (
              <div ref={introRef} className="scroll-mt-28">
                {phase2Intro}
              </div>
            )}
          <div
            ref={(el) => {
              refs.current[i] = el;
            }}
            className={`py-11 scroll-mt-32 ${i > 0 ? "border-t border-gray-100" : ""}`}
          >
            <p className="text-xl mb-8 leading-relaxed text-gray-800 text-left" style={{ fontWeight: 450 }}>
              {q}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-[18px] whitespace-nowrap" style={{ color: "#7cc9a6", fontWeight: 450 }}>
                Pas d&apos;accord
              </span>
              {VALUES.map((v, idx) => {
                const active = answers[keyOf(i)] === v;
                const c = RAMP[idx];
                return (
                  <button
                    key={v}
                    aria-label={`Niveau ${v}`}
                    onClick={() => handleAnswer(i, v)}
                    className="rounded-full flex-shrink-0 transition-all hover:scale-105"
                    style={{
                      width: SIZE,
                      height: SIZE,
                      borderWidth: active ? 0 : "2px",
                      borderStyle: "solid",
                      borderColor: c,
                      background: active ? c : "transparent",
                    }}
                  />
                );
              })}
              <span className="text-[18px] whitespace-nowrap" style={{ color: "#1f7d56", fontWeight: 450 }}>
                D&apos;accord
              </span>
            </div>
          </div>
          </Fragment>
        ))}
      </section>

      <section ref={endRef} className="max-w-md mx-auto px-6 pt-12 pb-24 text-center scroll-mt-28">
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
                onClick={() => onSubmit?.(answers)}
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
