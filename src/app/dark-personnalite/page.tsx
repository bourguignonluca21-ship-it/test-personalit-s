import type { Metadata } from "next";
import Quiz from "../components/Quiz";

export const metadata: Metadata = {
  title: "Dark personnalité",
  description:
    "Le test Dark personnalité : explore ta part d'ombre — un portrait ludique de tes traits les plus affirmés.",
};

// Questions de démonstration (thématique « part d'ombre », ludique — à remplacer).
const QUESTIONS = [
  "Vous savez vous montrer charmeur pour obtenir ce que vous voulez.",
  "On vous reproche parfois de manquer d'empathie.",
  "Vous aimez être au centre de l'attention et qu'on vous admire.",
  "Vous n'hésitez pas à orienter une situation à votre avantage.",
  "Vous gardez votre sang-froid là où d'autres culpabiliseraient.",
  "Vous estimez parfois mériter un traitement particulier.",
];

export default function DarkPersonnalitePage() {
  return (
    <>
      {/* Bandeau thématique « dark » */}
      <section className="bg-[#1f2024] text-white text-center py-12 px-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Dark personnalité</h1>
        <p className="text-white/70 max-w-2xl mx-auto text-sm">
          Explore ta part d&apos;ombre. Un portrait ludique de tes traits les plus affirmés — à
          prendre avec le sourire, jamais comme un diagnostic.
        </p>
      </section>

      <Quiz
        title="Test Dark personnalité"
        subtitle="Quelques questions · résultat ludique · aucune inscription requise"
        questions={QUESTIONS}
        accent="#6d28d9"
        agreeColor="#6d28d9"
        disagreeColor="#9ca3af"
        resultLabel="Révéler ma part d'ombre →"
      />
    </>
  );
}
