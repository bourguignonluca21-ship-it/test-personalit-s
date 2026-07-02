"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Quiz from "./Quiz";
import ScrollHaut from "./ScrollHaut";
import TestPageTitle from "./TestPageTitle";
import { PHASE1_QUESTIONS, getPhase2Questions } from "../data/questions";
import { calculerType, calculerVariante, encoderScores } from "../data/moteur";
import { getTypeByCode } from "../data/types";

const STEPS = [
  {
    step: "Étape 1",
    title: "Réponds au test",
    description: "Sois toi-même et réponds en toute sincérité.",
    color: "rgba(51,164,116,0.85)",
    bg: "#f3fbf7",
  },
  {
    step: "Étape 2",
    title: "Découvre ton profil",
    description: "Vois comment ton type influence ta vie, tes relations et ta carrière.",
    color: "rgba(51,164,116,0.85)",
    bg: "#e7f5ee",
  },
  {
    step: "Étape 3",
    title: "Va plus loin",
    description: "Explore ton profil en profondeur et trouve les réponses qu'il te faut.",
    color: "rgba(51,164,116,0.85)",
    bg: "#d8f1e4",
  },
];

// 60 questions de phase 1 + 9 de variante = 69 (total affiché, sans rupture visible).
const TOTAL = PHASE1_QUESTIONS.length + 9;

export default function TestPersonnalite() {
  const router = useRouter();
  // Miroir des réponses du Quiz (clés = id de question) pour recalculer le type en continu.
  const [answers, setAnswers] = useState<Record<string, number>>({});

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
        className="text-white text-center py-16 px-6 rounded-3xl flex flex-col items-center gap-4"
        style={{ background: "rgba(51,164,116,0.75)" }}
      >
        <div className="flex items-baseline justify-center gap-3 flex-wrap leading-none">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-none">{shownType}</h2>
          {typeInfo && <span className="text-xl text-white/80 leading-none">{typeInfo.name}</span>}
        </div>
        <p className="text-2xl md:text-3xl font-bold tracking-tight leading-none">Trouve ta variante</p>
        <p className="text-base md:text-lg text-white/85 max-w-md mx-auto leading-[1.9] text-balance">
          Les personnalités donnent les grandes lignes ; entre elles, 3 variantes te rendent presque
          unique.
        </p>
        <p className="text-sm italic text-white leading-tight whitespace-nowrap">
          Si une réponse précédente est modifiée, les questions de la variante s&apos;adapteront.
        </p>
      </div>
    </div>
  ) : null;

  return (
    <>
      <ScrollHaut />
      <Quiz
      title="Test de personnalité"
      titleNode={<TestPageTitle />}
      subtitle="48 portraits possibles · Un seul te ressemble"
      questions={allQuestions.map((q) => q.texte)}
      questionIds={allQuestions.map((q) => q.id)}
      total={TOTAL}
      phase1Count={PHASE1_QUESTIONS.length}
      phase2Intro={phase2Intro}
      steps={STEPS}
      accent="rgba(51,164,116,0.75)"
      note="Réponds à toutes les questions pour découvrir ton profil."
      onAnswersChange={setAnswers}
      onSubmit={(ans, info) => {
        const code = calculerType(PHASE1_QUESTIONS, ans);
        const v = calculerVariante(code, getPhase2Questions(code), ans);
        const scores = encoderScores(PHASE1_QUESTIONS, ans);
        const vs = `${v.scores.V1}-${v.scores.V2}-${v.scores.V3}`;
        const slug = `${code.toLowerCase()}-${v.variante.toLowerCase()}`;
        // Envoi du mail « ton profil » + inscription newsletter (best-effort).
        // keepalive : la requête survit à la navigation vers la page résultat.
        if (info.email || info.newsletter) {
          fetch("/api/rapport", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            keepalive: true,
            body: JSON.stringify({
              email: info.email,
              newsletter: info.newsletter,
              slug,
              s: scores,
              v: vs,
              origin: window.location.origin,
            }),
          }).catch(() => {});
        }
        router.push(`/resultat/${slug}?s=${scores}&v=${vs}`);
      }}
    />
    </>
  );
}
