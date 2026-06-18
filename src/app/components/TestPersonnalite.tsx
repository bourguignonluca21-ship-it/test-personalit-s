"use client";

import { useState } from "react";
import Quiz from "./Quiz";
import { PHASE1_QUESTIONS } from "../data/questions";
import { calculerType } from "../data/moteur";
import { getTypeByCode } from "../data/types";

const STEPS = [
  {
    step: "Étape 1",
    title: "Réponds au test",
    description: "Sois toi-même et réponds en toute sincérité pour découvrir ton type.",
    color: "#4298b4",
    bg: "#eef7fa",
  },
  {
    step: "Étape 2",
    title: "Découvre ton profil",
    description: "Vois comment ton type influence ta vie, tes relations et ta carrière.",
    color: "#33a474",
    bg: "#eef8f3",
  },
  {
    step: "Étape 3",
    title: "Va plus loin",
    description: "Libère ton plein potentiel grâce à une analyse approfondie, propulsée par l'IA.",
    color: "#e8833a",
    bg: "#fdf1e7",
  },
];

export default function TestPersonnalite() {
  const [code, setCode] = useState<string | null>(null);
  const type = code ? getTypeByCode(code) : undefined;

  if (code) {
    return (
      <section className="max-w-xl mx-auto px-6 py-20 text-center">
        <p className="text-sm text-gray-400 mb-2">Ton résultat</p>
        <h1 className="text-5xl font-bold text-gray-800 mb-2">{code}</h1>
        {type && <p className="text-xl text-[#4298b4] font-semibold mb-3">{type.name}</p>}
        {type && <p className="text-gray-500 mb-8">{type.tagline}</p>}
        <button
          onClick={() => setCode(null)}
          className="text-sm text-[#4298b4] font-semibold hover:underline"
        >
          ↺ Refaire le test
        </button>
        <p className="text-xs text-gray-400 mt-8">
          Première version : seul le type s&apos;affiche. Le spectre, la variante et le compte rendu
          viendront aux étapes suivantes.
        </p>
      </section>
    );
  }

  return (
    <Quiz
      title="Test de personnalité gratuit"
      subtitle="60 questions · 15 par axe · échelle 1 à 5 · aucune inscription requise"
      questions={PHASE1_QUESTIONS.map((q) => q.texte)}
      steps={STEPS}
      accent="#4298b4"
      note="Réponds aux 60 questions pour découvrir ton type."
      onSubmit={(answers) => setCode(calculerType(PHASE1_QUESTIONS, answers))}
    />
  );
}
