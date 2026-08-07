import type { CompteRendu } from "./types";
import enfp from "./enfp";
import infp from "./infp";
import infj from "./infj";
import enfj from "./enfj";
import intj from "./intj";
import intp from "./intp";
import entj from "./entj";
import entp from "./entp";
import istj from "./istj";
import isfj from "./isfj";
import estj from "./estj";
import esfj from "./esfj";
import istp from "./istp";
import isfp from "./isfp";
import estp from "./estp";
import esfp from "./esfp";

const COMPTES_RENDUS: Record<string, CompteRendu> = {
  ENFP: enfp,
  INFP: infp,
  INFJ: infj,
  ENFJ: enfj,
  INTJ: intj,
  INTP: intp,
  ENTJ: entj,
  ENTP: entp,
  ISTJ: istj,
  ISFJ: isfj,
  ESTJ: estj,
  ESFJ: esfj,
  ISTP: istp,
  ISFP: isfp,
  ESTP: estp,
  ESFP: esfp,
};

export const NIVEAUX_AXE5 = ["r", "m", "c"] as const;
export type NiveauAxe5 = (typeof NIVEAUX_AXE5)[number];
export const NOMS_AXE5: Record<NiveauAxe5, string> = { r: "Réactif", m: "Mesuré", c: "Calme" };

// Un axe = 15 questions notées 1 à 5. Le score ne peut pas sortir de cet intervalle.
export const SCORE_MIN = 15;
export const SCORE_MAX = 75;
export function bornerScore(n: number): number {
  if (!Number.isFinite(n)) return 45;
  return Math.min(SCORE_MAX, Math.max(SCORE_MIN, Math.round(n)));
}

export function getCompteRendu(code: string): CompteRendu | null {
  return COMPTES_RENDUS[code.toUpperCase()] ?? null;
}
export function codesDisponibles(): string[] { return Object.keys(COMPTES_RENDUS); }
export function tousLesSlugs(): string[] {
  return codesDisponibles().flatMap((c) => NIVEAUX_AXE5.map((n) => `${c.toLowerCase()}-${n}`));
}

export * from "./types";
export * from "./modulations";
export * from "./axe5";
