// Moteur de calcul — port de moteur_calcul.py (100% déterministe).
// Phase 1 : 60 réponses → type (4 lettres). Phase 2 : 9 réponses → variante (V1/V2/V3).
// Les réponses sont indexées par id de question (comme le Python).

import type { Phase1Question } from "./questions";

const AXES = ["EI", "SN", "TF", "JP"] as const;
const POLE_HAUT: Record<string, string> = { EI: "E", SN: "N", TF: "F", JP: "P" };
const POLE_BAS: Record<string, string> = { EI: "I", SN: "S", TF: "T", JP: "J" };
// Tie-break (score = 45 exact) → I, N, F, J (cf. SYSTEME_SCORING.md).
const TIEBREAK: Record<string, string> = { EI: "I", SN: "N", TF: "F", JP: "J" };

// reponses : clé = id de la question, valeur = 1 à 5.
export function calculerType(
  questions: Phase1Question[],
  reponses: Record<string, number>,
): string {
  const sommes: Record<string, number> = { EI: 0, SN: 0, TF: 0, JP: 0 };

  questions.forEach((q) => {
    const valeur = reponses[q.id];
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

// Noms des 48 variantes (recopiés de moteur_calcul.py).
export const NOMS_VARIANTES: Record<string, Record<string, string>> = {
  INTJ: { V1: "Architecte-Bâtisseur", V2: "Stratège de Conviction", V3: "Visionnaire" },
  INTP: { V1: "Architecte Logique", V2: "Explorateur d'Idées", V3: "Penseur Humaniste" },
  ENTJ: { V1: "Capitaine d'Industrie", V2: "Stratège Visionnaire", V3: "Leader Inspirant" },
  ENTP: { V1: "Inventeur", V2: "Débatteur Analytique", V3: "Charmeur Visionnaire" },
  INFJ: { V1: "Mentor", V2: "Visionnaire Mystique", V3: "Architecte d'Idéaux" },
  INFP: { V1: "Poète", V2: "Rêveur Créatif", V3: "Idéaliste Engagé" },
  ENFJ: { V1: "Guide", V2: "Leader de Mission", V3: "Animateur Charismatique" },
  ENFP: { V1: "Explorateur Enthousiaste", V2: "Cœur Authentique", V3: "Fédérateur" },
  ISTJ: { V1: "Gardien", V2: "Administrateur", V3: "Loyal Discret" },
  ISFJ: { V1: "Protecteur", V2: "Gardien du Foyer", V3: "Soutien Réfléchi" },
  ESTJ: { V1: "Dirigeant", V2: "Garant de l'Ordre", V3: "Leader Loyal" },
  ESFJ: { V1: "Hôte", V2: "Gardien Bienveillant", V3: "Dévoué Réfléchi" },
  ISTP: { V1: "Artisan", V2: "Aventurier", V3: "Stratège Silencieux" },
  ISFP: { V1: "Artiste Sensible", V2: "Aventurier des Sens", V3: "Doux Idéaliste" },
  ESTP: { V1: "Fonceur", V2: "Tacticien", V3: "Charmeur" },
  ESFP: { V1: "Animateur", V2: "Cœur Généreux", V3: "Esthète Vivant" },
};

export interface SpectreAxe {
  axe: string; // "EI" | "SN" | "TF" | "JP"
  poleHaut: string; // E, N, F, P
  poleBas: string; // I, S, T, J
  lettre: string; // pôle dominant
  scoreBrut: number; // 15 à 75
  pctHaut: number; // % vers le pôle haut
  pctBas: number; // % vers le pôle bas
  pctDominant: number; // max des deux
  intensite: "léger" | "modéré" | "fort";
}

// Construit le spectre à partir des 4 scores bruts (ordre EI, SN, TF, JP).
export function spectreFromScores(scores: number[]): SpectreAxe[] {
  return AXES.map((axe, idx) => {
    const scoreBrut = scores[idx] ?? 45;
    const pctHaut = ((scoreBrut - 15) / 60) * 100;
    const pctBas = 100 - pctHaut;
    const pctDominant = Math.max(pctHaut, pctBas);
    const lettre = scoreBrut > 45 ? POLE_HAUT[axe] : scoreBrut < 45 ? POLE_BAS[axe] : TIEBREAK[axe];
    const intensite = pctDominant >= 75 ? "fort" : pctDominant >= 60 ? "modéré" : "léger";
    return {
      axe,
      poleHaut: POLE_HAUT[axe],
      poleBas: POLE_BAS[axe],
      lettre,
      scoreBrut,
      pctHaut: Math.round(pctHaut * 10) / 10,
      pctBas: Math.round(pctBas * 10) / 10,
      pctDominant: Math.round(pctDominant * 10) / 10,
      intensite,
    };
  });
}

// Spectre depuis les réponses (port de calculer_personnalite + calculer_intensites).
export function calculerSpectre(
  questions: Phase1Question[],
  reponses: Record<string, number>,
): SpectreAxe[] {
  const sommes: Record<string, number> = { EI: 0, SN: 0, TF: 0, JP: 0 };
  questions.forEach((q) => {
    const valeur = reponses[q.id];
    if (valeur == null) return;
    sommes[q.axe] += q.sens === "direct" ? valeur : 6 - valeur;
  });
  return spectreFromScores(AXES.map((a) => sommes[a]));
}

// Sérialise les 4 scores bruts pour l'URL (ex. "51-62-40-58").
export function encoderScores(questions: Phase1Question[], reponses: Record<string, number>): string {
  const sommes: Record<string, number> = { EI: 0, SN: 0, TF: 0, JP: 0 };
  questions.forEach((q) => {
    const valeur = reponses[q.id];
    if (valeur == null) return;
    sommes[q.axe] += q.sens === "direct" ? valeur : 6 - valeur;
  });
  return AXES.map((a) => sommes[a]).join("-");
}

export interface VarianteResult {
  variante: "V1" | "V2" | "V3";
  nom: string;
  scores: Record<string, number>;
}

// questionsVariante : les 9 questions du type (champs id + variante).
// reponses : clé = id de la question, valeur = 1 à 5.
export function calculerVariante(
  type: string,
  questionsVariante: { id: string; variante: string }[],
  reponses: Record<string, number>,
): VarianteResult {
  const scores: Record<string, number> = { V1: 0, V2: 0, V3: 0 };
  questionsVariante.forEach((q) => {
    const valeur = reponses[q.id];
    if (valeur == null) return;
    scores[q.variante] += valeur;
  });

  // Variante gagnante : score max, tie-break V1 > V2 > V3.
  const ordre: ("V1" | "V2" | "V3")[] = ["V1", "V2", "V3"];
  let gagnante: "V1" | "V2" | "V3" = "V1";
  ordre.forEach((v) => {
    if (scores[v] > scores[gagnante]) gagnante = v;
  });

  return {
    variante: gagnante,
    nom: NOMS_VARIANTES[type]?.[gagnante] ?? gagnante,
    scores,
  };
}
