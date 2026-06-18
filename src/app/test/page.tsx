"use client";

import { useState } from "react";

// Maquette du test. À brancher plus tard sur questions_data.json + moteur_calcul.
// Conforme à SYSTEME_SCORING : échelle à 5 niveaux (1 = pas du tout d'accord → 5 = tout à fait).
const QUESTIONS = [
  "Vous vous faites fréquemment de nouveaux amis.",
  "Les idées complexes et novatrices vous enthousiasment plus que les idées simples.",
  "Vous vous fiez plus à vos émotions qu'à des arguments purement factuels.",
  "Vos espaces de vie et de travail sont propres et organisés.",
  "Vous restez généralement calme, même sous une forte pression.",
  "Vous préférez avoir un plan précis plutôt qu'improviser au jour le jour.",
];

// Les 5 niveaux (tailles décroissantes vers le centre, comme sur 16P).
const LEVELS = [
  { v: 5, size: "w-11 h-11", label: "Tout à fait d'accord" },
  { v: 4, size: "w-9 h-9", label: "" },
  { v: 3, size: "w-7 h-7", label: "Neutre" },
  { v: 2, size: "w-9 h-9", label: "" },
  { v: 1, size: "w-11 h-11", label: "Pas du tout d'accord" },
];

export default function TestPage() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const answered = Object.keys(answers).length;
  const progress = Math.round((answered / QUESTIONS.length) * 100);

  return (
    <div className="bg-white">
      {/* En-tête */}
      <section className="text-center pt-10 pb-6 px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Test de personnalité gratuit
        </h1>
        <p className="text-gray-400 text-sm">
          69 questions · environ 10 minutes · aucune inscription requise
        </p>
      </section>

      {/* Barre de progression */}
      <div className="max-w-3xl mx-auto px-6 mb-8">
        <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
          <div
            className="h-full bg-[#4298b4] transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-1.5 text-right">
          {answered} / {QUESTIONS.length} répondues
        </p>
      </div>

      {/* Questions */}
      <section className="max-w-3xl mx-auto px-6 mb-8 w-full">
        {QUESTIONS.map((q, i) => (
          <div key={i} className={`py-7 ${i > 0 ? "border-t border-gray-100" : ""}`}>
            <p className="text-[15px] mb-5 leading-relaxed text-gray-800 text-center font-medium">
              {q}
            </p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-xs font-medium text-[#33a474] w-20 text-right hidden sm:block">
                D&apos;accord
              </span>
              {LEVELS.map((lvl) => {
                const active = answers[i] === lvl.v;
                const isAgree = lvl.v >= 4;
                const accent = isAgree ? "#33a474" : lvl.v <= 2 ? "#88619a" : "#9ca3af";
                return (
                  <button
                    key={lvl.v}
                    aria-label={lvl.label || `Niveau ${lvl.v}`}
                    onClick={() => setAnswers((a) => ({ ...a, [i]: lvl.v }))}
                    className={`${lvl.size} rounded-full border-2 transition-all flex-shrink-0`}
                    style={{
                      borderColor: accent,
                      background: active ? accent : "transparent",
                    }}
                  />
                );
              })}
              <span className="text-xs font-medium text-[#88619a] w-20 text-left hidden sm:block">
                Pas d&apos;accord
              </span>
            </div>
          </div>
        ))}
      </section>

      {/* Action */}
      <section className="max-w-3xl mx-auto px-6 pb-16 text-center">
        <button
          disabled={answered < QUESTIONS.length}
          className="bg-[#4298b4] text-white font-semibold py-3 px-8 rounded-full text-sm hover:bg-[#367f9a] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Voir mon résultat →
        </button>
        <p className="text-xs text-gray-400 mt-3">
          Maquette — à connecter au moteur de calcul (questions_data.json + moteur_calcul).
        </p>
      </section>
    </div>
  );
}
