// Questions du test de personnalité — importées depuis questions_data.json.
// ⚠️ questions_data.json est une COPIE de la source canonique
// (1_PRODUIT/test personnalités/questions_data.json). À resynchroniser si la source change
// (idéalement via build_quiz_data.py qui écrirait directement ici).

import data from "./questions_data.json";

export type Axe = "EI" | "SN" | "TF" | "JP";

export interface Phase1Question {
  id: string;
  axe: string; // "EI" | "SN" | "TF" | "JP"
  sens: string; // "direct" | "inversé"
  texte: string;
}

export interface Phase2Question {
  id: string;
  type: string; // ex. "INTJ"
  variante: string; // "V1" | "V2" | "V3"
  texte: string;
}

// Les 60 questions de phase 1 (15 par axe).
export const PHASE1_QUESTIONS: Phase1Question[] = data.phase1.questions;

// Les axes et leurs pôles (pour le futur moteur de calcul).
export const PHASE1_AXES = data.phase1.axes;

// Phase 2 (variantes) — déclenchée après calcul du type.
export const PHASE2 = data.phase2 as { description: string; questions: Phase2Question[] };

// Les 9 questions de variante d'un type donné (3 par variante).
export function getPhase2Questions(type: string): Phase2Question[] {
  return PHASE2.questions.filter((q) => q.type === type);
}
