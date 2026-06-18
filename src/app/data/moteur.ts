// Moteur de calcul — port (partiel) de moteur_calcul.py.
// Pour l'instant : phase 1 uniquement → les 4 lettres du type.
// (Variante, spectre et intensités viendront aux étapes suivantes.)

import type { Phase1Question } from "./questions";

const AXES = ["EI", "SN", "TF", "JP"] as const;
const POLE_HAUT: Record<string, string> = { EI: "E", SN: "N", TF: "F", JP: "P" };
const POLE_BAS: Record<string, string> = { EI: "I", SN: "S", TF: "T", JP: "J" };
// Tie-break (score = 45 exact) → I, N, F, J (cf. SYSTEME_SCORING.md).
const TIEBREAK: Record<string, string> = { EI: "I", SN: "N", TF: "F", JP: "J" };

// reponses : clé = index de la question dans le tableau, valeur = 1 à 5.
export function calculerType(
  questions: Phase1Question[],
  reponses: Record<number, number>,
): string {
  const sommes: Record<string, number> = { EI: 0, SN: 0, TF: 0, JP: 0 };

  questions.forEach((q, i) => {
    const valeur = reponses[i];
    if (valeur == null) return;
    const points = q.sens === "direct" ? valeur : 6 - valeur;
    sommes[q.axe] += points;
  });

  return AXES.map((axe) => {
    const score = sommes[axe];
    if (score > 45) return POLE_HAUT[axe];
    if (score < 45) return POLE_BAS[axe];
    return TIEBREAK[axe];
  }).join("");
}
