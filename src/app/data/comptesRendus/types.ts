export type BlocCR =
  | { genre: "texte"; titre?: string; paragraphes: string[] }
  | { genre: "tableau"; titre?: string; colonnes: string[]; lignes: string[][] }
  | { genre: "axe"; axe: "EI" | "SN" | "TF" | "JP"; libelle: string }
  | { genre: "classement" };

export interface ChapitreCR { num: number; titre: string; blocs: BlocCR[]; }
export interface CompteRendu { code: string; chapitres: ChapitreCR[]; }
