"use client";

import { useEffect, useState } from "react";
import Quiz from "./Quiz";
import { PHASE1_QUESTIONS, getPhase2Questions } from "../data/questions";
import { calculerType, calculerVariante } from "../data/moteur";
import { getTypeByCode } from "../data/types";

const STEPS = [
  {
    step: "Étape 1",
    title: "Réponds au test",
    description: "Sois toi-même et réponds en toute sincérité pour découvrir ton type.",
    color: "#7cc9a6",
    bg: "rgba(239,249,244,0.72)",
  },
  {
    step: "Étape 2",
    title: "Découvre ton profil",
    description: "Vois comment ton type influence ta vie, tes relations et ta carrière.",
    color: "#33a474",
    bg: "rgba(221,241,232,0.72)",
  },
  {
    step: "Étape 3",
    title: "Va plus loin",
    description: "Libère ton plein potentiel grâce à une analyse approfondie, propulsée par l'IA.",
    color: "#25855f",
    bg: "rgba(201,235,218,0.72)",
  },
];

// 60 questions de phase 1 + 9 de variante = 69 (total affiché, sans rupture visible).
const TOTAL = PHASE1_QUESTIONS.length + 9;

interface Resultat {
  code: string;
  variante: string;
  nom: string;
}

export default function TestPersonnalite() {
  // Miroir des réponses du Quiz (clés = id de question) pour recalculer le type en continu.
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [resultat, setResultat] = useState<Resultat | null>(null);

  // Type provisoire dès que les 60 de phase 1 sont répondues (recalculé à chaque changement).
  const phase1Done = PHASE1_QUESTIONS.every((q) => answers[q.id] != null);
  const typeProvisoire = phase1Done ? calculerType(PHASE1_QUESTIONS, answers) : null;

  // Type réellement affiché : suit typeProvisoire, mais reste monté le temps du fondu de sortie.
  const [shownType, setShownType] = useState<string | null>(null);
  const [leaving, setLeaving] = useState(false);
  useEffect(() => {
    if (typeProvisoire) {
      setShownType(typeProvisoire);
      setLeaving(false);
    } else if (shownType) {
      setLeaving(true);
      const t = setTimeout(() => {
        setShownType(null);
        setLeaving(false);
      }, 360);
      return () => clearTimeout(t);
    }
  }, [typeProvisoire, shownType]);

  const phase2Questions = shownType ? getPhase2Questions(shownType) : [];

  // Liste affichée : phase 1, puis (une fois le type connu) les 9 questions de variante.
  const allQuestions = [
    ...PHASE1_QUESTIONS.map((q) => ({ id: q.id, texte: q.texte })),
    ...phase2Questions.map((q) => ({ id: q.id, texte: q.texte })),
  ];

  // Titre révélé juste avant les questions de variante : code + nom du type, puis « Trouve ta variante ».
  const typeInfo = shownType ? getTypeByCode(shownType) : undefined;
  const phase2Intro = shownType ? (
    <div className={`my-12 ${leaving ? "variante-leave" : "variante-enter"}`}>
      <div
        className="text-white text-center py-16 px-6 rounded-3xl"
        style={{ background: "rgba(51,164,116,0.75)" }}
      >
        <div className="flex items-baseline justify-center gap-3 flex-wrap mb-5">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{shownType}</h2>
          {typeInfo && <span className="text-xl text-white/80">{typeInfo.name}</span>}
        </div>
        <p className="text-2xl md:text-3xl font-bold tracking-tight">Trouve ta variante</p>
        <p className="text-base md:text-lg text-white/85 max-w-md mx-auto mt-4 leading-relaxed text-balance">
          Les personnalités donnent les grandes lignes ; entre elles, 3 variantes te rendent presque
          unique.
        </p>
        <p className="text-sm text-white/60 mt-3 leading-relaxed whitespace-nowrap">
          Si une réponse précédente est modifiée, les questions de la variante s&apos;adapteront.
        </p>
      </div>
    </div>
  ) : null;

  function refaire() {
    setResultat(null);
    setAnswers({});
  }

  if (resultat) {
    const type = getTypeByCode(resultat.code);
    return (
      <section className="max-w-xl mx-auto px-6 py-28 text-center">
        <p className="text-sm text-gray-400 mb-3 uppercase tracking-widest">Ton résultat</p>
        <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-gray-800 mb-3">{resultat.code}</h1>
        {type && (
          <p className="text-2xl font-semibold mb-2" style={{ color: "rgba(51,164,116,0.75)" }}>
            {type.name}
          </p>
        )}
        <p className="text-lg font-semibold text-gray-700 mb-4">
          {resultat.variante} · {resultat.nom}
        </p>
        {type && <p className="text-lg text-gray-500 mb-12 leading-relaxed max-w-md mx-auto">{type.tagline}</p>}
        <button
          onClick={refaire}
          className="text-sm text-[rgba(51,164,116,0.75)] font-semibold hover:underline"
        >
          ↺ Refaire le test
        </button>
        <p className="text-xs text-gray-400 mt-8">
          Ton compte-rendu détaillé (forces, relations, carrière…) arrivera bientôt.
        </p>
      </section>
    );
  }

  return (
    <Quiz
      title="Test de personnalité 2.0"
      badge="IA"
      subtitle="60 énoncés · 4 dimensions · échelle de Likert (1 à 5)"
      questions={allQuestions.map((q) => q.texte)}
      questionIds={allQuestions.map((q) => q.id)}
      total={TOTAL}
      phase1Count={PHASE1_QUESTIONS.length}
      phase2Intro={phase2Intro}
      steps={STEPS}
      accent="rgba(51,164,116,0.75)"
      note="Réponds à toutes les questions pour découvrir ton profil."
      onAnswersChange={setAnswers}
      onSubmit={(ans) => {
        const code = calculerType(PHASE1_QUESTIONS, ans);
        const v = calculerVariante(code, getPhase2Questions(code), ans);
        setResultat({ code, variante: v.variante, nom: v.nom });
      }}
    />
  );
}
