import type { Metadata } from "next";
import TestPersonnalite from "../components/TestPersonnalite";

export const metadata: Metadata = {
  title: "Test de personnalité gratuit",
  description: "60 questions, ~10 minutes. Découvre ton type parmi 16.",
};

export default function TestPage() {
  return <TestPersonnalite />;
}
