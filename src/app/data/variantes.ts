// =============================================================================
// LES 48 VARIANTES — adressage (slugs) et recherche.
// Les NOMS sont la source de vérité et vivent dans moteur.ts (NOMS_VARIANTES),
// recopiés du moteur Python. Ici, on ne fait que les rendre ADRESSABLES :
// une URL par variante, /types-de-personnalite/<type>/<variante>.
// =============================================================================

import { NOMS_VARIANTES } from "./moteur";
import { TYPES, type PersonalityType } from "./types";

export type CleVariante = "V1" | "V2" | "V3";
export const CLES_VARIANTES: CleVariante[] = ["V1", "V2", "V3"];

/* « Cœur Authentique » → « coeur-authentique », « Garant de l'Ordre » →
   « garant-de-l-ordre ». Le œ et le æ ne se décomposent PAS en NFD, on les
   traite à la main avant de retirer les accents. */
export function slugVariante(nom: string): string {
  return nom
    .toLowerCase()
    .replace(/œ/g, "oe")
    .replace(/æ/g, "ae")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export interface Variante {
  cle: CleVariante;
  nom: string;
  slug: string;
  type: PersonalityType;
  /** Chemin complet, ex. /types-de-personnalite/infp/poete */
  href: string;
}

export function variantesDuType(type: PersonalityType): Variante[] {
  const noms = NOMS_VARIANTES[type.code] ?? {};
  return CLES_VARIANTES.map((cle) => {
    const nom = noms[cle] ?? cle;
    const slug = slugVariante(nom);
    return { cle, nom, slug, type, href: `/types-de-personnalite/${type.slug}/${slug}` };
  });
}

export function getVariante(slugType: string, slugVar: string): Variante | undefined {
  const type = TYPES.find((t) => t.slug === slugType.toLowerCase());
  if (!type) return undefined;
  return variantesDuType(type).find((v) => v.slug === slugVar.toLowerCase());
}

/** Les 48, à plat (prérendu, plan de site, futures listes). */
export function toutesLesVariantes(): Variante[] {
  return TYPES.flatMap(variantesDuType);
}
