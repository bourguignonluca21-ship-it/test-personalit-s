"use client";

import { useRef, useState } from "react";

// Composant de test réutilisable (échelle 5 niveaux, barre de progression fixe).
// Bulles : même taille. Non sélectionnées = contour coloré (vert accord / rouge désaccord / gris neutre).
// Sélectionnées = remplies de la couleur, sans contour. Défile vers la question suivante au clic.

export interface QuizStep {
  step: string;
  title: string;
  description: string;
  color: string;
  bg: string;
}

export interface QuizProps {
  title: string;
  subtitle: string;
  questions: string[];
  steps?: QuizStep[];
  accent?: string;
  agreeColor?: string;
  disagreeColor?: string;
  resultLabel?: string;
  note?: string;
  onSubmit?: (answers: Record<number, number>) => void;
}

const VALUES = [5, 4, 3, 2, 1];
const SIZE = 46;
const NEUTRAL = "#9b9faa";

export default function Quiz({
  title,
  subtitle,
  questions,
  steps,
  accent = "#4298b4",
  agreeColor = "#33a474",
  disagreeColor = "#e8833a",
  resultLabel = "Voir mon résultat →",
  note = "Réponds à toutes les questions pour voir ton résultat.",
  onSubmit,
}: QuizProps) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const answered = Object.keys(answers).length;
  const progress = Math.round((answered / questions.length) * 100);

  function handleAnswer(i: number, v: number) {
    setAnswers((a) => ({ ...a, [i]: v }));
    const next = refs.current[i + 1];
    if (next) {
      setTimeout(() => next.scrollIntoView({ behavior: "smooth", block: "center" }), 150);
    }
  }

  return (
    <div className="bg-white">
      {/* Barre + compteur FIXÉS sous la navbar : suivent le scroll, même ligne */}
      <div
        className="fixed left-0 right-0 z-30 bg-white border-b border-gray-200 py-3 shadow-sm"
        style={{ top: "56px" }}
      >
        <div className="max-w-3xl mx-auto px-6 flex items-center gap-4">
          <div className="h-2 rounded-full bg-gray-100 overflow-hidden flex-1">
            <div className="h-full transition-all" style={{ width: `${progress}%`, background: accent }} />
          </div>
          <span className="text-xs font-medium text-gray-500 whitespace-nowrap">
            {answered} / {questions.length}
          </span>
        </div>
      </div>

      {/* Espace pour compenser la hauteur de la barre fixe */}
      <div aria-hidden style={{ height: "48px" }} />

      <section className="text-center pt-6 pb-6 px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{title}</h1>
        <p className="text-gray-400 text-sm">{subtitle}</p>
      </section>

      {/* Les 3 étapes (sans illustration pour l'instant) */}
      {steps && steps.length > 0 && (
        <section className="max-w-3xl mx-auto px-6 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {steps.map((s) => (
              <div key={s.step} className="rounded-xl p-5" style={{ background: s.bg }}>
                <span
                  className="inline-block text-[10px] font-bold text-white px-2.5 py-1 rounded mb-3 uppercase tracking-wider"
                  style={{ background: s.color }}
                >
                  {s.step}
                </span>
                <h3 className="font-bold text-gray-800 text-sm mb-1.5 leading-snug">{s.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="max-w-3xl mx-auto px-6 mb-8 w-full">
        {questions.map((q, i) => (
          <div
            key={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className={`py-9 scroll-mt-32 ${i > 0 ? "border-t border-gray-100" : ""}`}
          >
            {/* Question : 18px / interligne 28px */}
            <p className="text-[18px] leading-[28px] mb-7 text-gray-800 text-left" style={{ fontWeight: 450 }}>
              {q}
            </p>
            {/* Échelle pleine largeur : libellés aux bords, bulles réparties entre les deux */}
            <div className="flex items-center justify-between">
              <span className="text-[18px] whitespace-nowrap" style={{ color: agreeColor, fontWeight: 450 }}>
                D&apos;accord
              </span>
              {VALUES.map((v) => {
                const active = answers[i] === v;
                const c = v >= 4 ? agreeColor : v <= 2 ? disagreeColor : NEUTRAL;
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
              <span className="text-[18px] whitespace-nowrap" style={{ color: disagreeColor, fontWeight: 450 }}>
                Pas d&apos;accord
              </span>
            </div>
          </div>
        ))}
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-16 text-center">
        <button
          disabled={answered < questions.length}
          onClick={() => onSubmit?.(answers)}
          className="text-white font-semibold py-3 px-8 rounded-full text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
          style={{ background: accent }}
        >
          {resultLabel}
        </button>
        <p className="text-xs text-gray-400 mt-3">{note}</p>
      </section>
    </div>
  );
}
