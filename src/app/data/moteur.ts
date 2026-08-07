// Moteur de calcul — port de moteur_calcul.py (100% déterministe).
// Phase 1 : 60 réponses → type (4 lettres). Puis 20 réponses → cinquième axe (R/M/C).
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
// Conservé : encore utilisé par api/rapport et data/variantes.
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


// ————— AXE 5 : réactivité émotionnelle —————
// 20 items, score brut 20 à 100, pourcentage = ((score - 20) / 80) * 100.
// Seuils validés : 35 % et 65 %, la borne appartient au niveau supérieur.
// N'intervient PAS dans le calcul du type : les 4 axes sont inchangés.

import type { Axe5Question } from "./questions";

export interface Axe5Result {
  scoreBrut: number;   // 20 à 100
  pct: number;         // 0 à 100
  lettre: "R" | "M" | "C";
  nom: string;
}

export const AXE5_NOMS: Record<string, string> = { R: "Réactif", M: "Mesuré", C: "Calme" };

export function calculerAxe5(
  questions: Axe5Question[],
  reponses: Record<string, number>,
): Axe5Result {
  let scoreBrut = 0;
  questions.forEach((q) => {
    const valeur = reponses[q.id];
    if (valeur == null) return;
    scoreBrut += q.sens === "direct" ? valeur : 6 - valeur;
  });

  const pct = ((scoreBrut - 20) / 80) * 100;
  const lettre: "R" | "M" | "C" = pct >= 65 ? "R" : pct < 35 ? "C" : "M";

  return { scoreBrut, pct: Math.round(pct * 10) / 10, lettre, nom: AXE5_NOMS[lettre] };
}
