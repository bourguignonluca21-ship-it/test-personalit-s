"use client";

import { useState } from "react";

// Composant de test réutilisable (échelle 5 niveaux, barre de progression).
// Utilisé par /test (personnalité) et /dark-personnalite. À brancher plus tard
// sur le moteur de calcul réel (questions_data.json + moteur_calcul).

export interface QuizProps {
  title: string;
  subtitle: string;
  questions: string[];
  accent?: string; // couleur principale (progression + bouton)
  agreeColor?: string;
  disagreeColor?: string;
  resultLabel?: string;
  note?: string;
}

// Les 5 niveaux (tailles décroissantes vers le centre).
const SIZES = ["w-11 h-11", "w-9 h-9", "w-7 h-7", "w-9 h-9", "w-11 h-11"];
const VALUES = [5, 4, 3, 2, 1];

export default function Quiz({
  title,
  subtitle,
  questions,
  accent = "#4298b4",
  agreeColor = "#33a474",
  disagreeColor = "#88619a",
  resultLabel = "Voir mon résultat →",
  note = "Maquette — à connecter au moteur de calcul (questions_data.json + moteur_calcul).",
}: QuizProps) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const answered = Object.keys(answers).length;
  const progress = Math.round((answered / questions.length) * 100);

  return (
    <div className="bg-white">
      {/* En-tête */}
      <section className="text-center pt-10 pb-6 px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{title}</h1>
        <p className="text-gray-400 text-sm">{subtitle}</p>
      </section>

      {/* Barre de progression */}
      <div className="max-w-3xl mx-auto px-6 mb-8">
        <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
          <div className="h-full transition-all" style={{ width: `${progress}%`, background: accent }} />
        </div>
        <p className="text-xs text-gray-400 mt-1.5 text-right">
          {answered} / {questions.length} répondues
        </p>
      </div>

      {/* Questions */}
      <section className="max-w-3xl mx-auto px-6 mb-8 w-full">
        {questions.map((q, i) => (
          <div key={i} className={`py-7 ${i > 0 ? "border-t border-gray-100" : ""}`}>
            <p className="text-[15px] mb-5 leading-relaxed text-gray-800 text-center font-medium">{q}</p>
            <div className="flex items-center justify-center gap-3">
              <span
                className="text-xs font-medium w-20 text-right hidden sm:block"
                style={{ color: agreeColor }}
              >
                D&apos;accord
              </span>
              {VALUES.map((v, idx) => {
                const active = answers[i] === v;
                const color = v >= 4 ? agreeColor : v <= 2 ? disagreeColor : "#9ca3af";
                return (
                  <button
                    key={v}
                    aria-label={`Niveau ${v}`}
                    onClick={() => setAnswers((a) => ({ ...a, [i]: v }))}
                    className={`${SIZES[idx]} rounded-full border-2 transition-all flex-shrink-0`}
                    style={{ borderColor: color, background: active ? color : "transparent" }}
                  />
                );
              })}
              <span
                className="text-xs font-medium w-20 text-left hidden sm:block"
                style={{ color: disagreeColor }}
              >
                Pas d&apos;accord
              </span>
            </div>
          </div>
        ))}
      </section>

      {/* Action */}
      <section className="max-w-3xl mx-auto px-6 pb-16 text-center">
        <button
          disabled={answered < questions.length}
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
