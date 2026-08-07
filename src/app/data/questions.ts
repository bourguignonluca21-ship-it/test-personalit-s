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


// Les 60 questions de phase 1 (15 par axe).
export const PHASE1_QUESTIONS: Phase1Question[] = data.phase1.questions;

// Les axes et leurs pôles (pour le futur moteur de calcul).
export const PHASE1_AXES = data.phase1.axes;


// ————— AXE 5 : réactivité émotionnelle —————
// 20 items des Big Five Aspect Scales (IPIP, domaine public).
// Remplace la phase 2 (variantes) dans le parcours du test.
export interface Axe5Question {
  id: string;
  sens: string;          // "direct" | "inversé"
  sous_echelle: string;  // "V" volatilité | "W" retrait
  texte: string;
}

export const AXE5 = data.axe5 as {
  description: string;
  lettres: Record<string, string>;
  seuils_pourcentage: number[];
  questions: Axe5Question[];
};

export const AXE5_QUESTIONS: Axe5Question[] = AXE5.questions;
