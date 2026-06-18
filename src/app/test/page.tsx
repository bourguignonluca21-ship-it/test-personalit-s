import type { Metadata } from "next";
import Quiz from "../components/Quiz";

export const metadata: Metadata = {
  title: "Test de personnalité gratuit",
  description: "69 questions, ~10 minutes. Découvre ton type parmi 16 et ton spectre détaillé.",
};

const QUESTIONS = [
  "Vous vous faites fréquemment de nouveaux amis.",
  "Les idées complexes et novatrices vous enthousiasment plus que les idées simples.",
  "Vous vous fiez plus à vos émotions qu'à des arguments purement factuels.",
  "Vos espaces de vie et de travail sont propres et organisés.",
  "Vous restez généralement calme, même sous une forte pression.",
  "Vous préférez avoir un plan précis plutôt qu'improviser au jour le jour.",
];

export default function TestPage() {
  return (
    <Quiz
      title="Test de personnalité gratuit"
      subtitle="69 questions · environ 10 minutes · aucune inscription requise"
      questions={QUESTIONS}
      accent="#4298b4"
    />
  );
}
