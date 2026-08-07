import { getTypeByCode } from "./types";
import { NOMS_VARIANTES } from "./moteur";

export function getProfil(code: string, variante: string) {
  const type = getTypeByCode(code);
  const nomVariante = NOMS_VARIANTES[code]?.[variante] ?? variante;
  return {
    code: code.toUpperCase(),
    nomType: type?.name ?? code,
    nomVariante,
    slug: type?.slug ?? code.toLowerCase(),
  };
}

export function getDescriptionVariante(code: string, variante: string, nomVariante: string): string {
  const type = getTypeByCode(code);
  const nom = type?.name ?? code;
  return `${nom} dans sa variante ${nomVariante} : une manière singulière de voir le monde, de penser et d'agir.`;
}

export function getDetailVariante(code: string, variante: string, nomVariante: string): string {
  const type = getTypeByCode(code);
  const nom = type?.name ?? code;
  return `${nom} (${nomVariante}) — ta variante dominante. C'est elle qui colore ta façon de réfléchir, de ressentir et de te relier aux autres.`;
}
