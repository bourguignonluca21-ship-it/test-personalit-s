import crypto from "crypto";

// PREUVE D'ACHAT (cas anonyme + connecté) : un jeton signé rangé dans un cookie.
// Le serveur le pose SEULEMENT après un paiement vérifié auprès de Stripe, et le relit
// pour débloquer le rapport. Comme il est signé avec un secret serveur
// (ACCES_SIGNING_SECRET), personne ne peut le fabriquer à la main (contrairement à
// l'ancien ?paid=1). Le cookie contient la liste des profils (slugs) débloqués.

export const COOKIE_ACCES = "acces_rapport";
export const DUREE_ACCES_SECONDES = 60 * 60 * 24 * 365; // 1 an

function signer(payload: string): string {
  return crypto
    .createHmac("sha256", process.env.ACCES_SIGNING_SECRET!)
    .update(payload)
    .digest("base64url");
}

// Fabrique la valeur du cookie à partir de la liste des profils débloqués.
export function encoderAcces(slugs: string[]): string {
  const uniques = Array.from(new Set(slugs.filter(Boolean)));
  const payload = Buffer.from(JSON.stringify(uniques)).toString("base64url");
  return `${payload}.${signer(payload)}`;
}

// Relit le cookie et renvoie la liste des profils débloqués.
// Renvoie une liste vide si le cookie est absent, mal formé, ou falsifié.
export function decoderAcces(valeur: string | undefined | null): string[] {
  if (!valeur) return [];
  const point = valeur.lastIndexOf(".");
  if (point < 0) return [];
  const payload = valeur.slice(0, point);
  const sig = valeur.slice(point + 1);
  const attendu = signer(payload);
  // Comparaison à temps constant (anti-timing). Tailles différentes = invalide.
  if (
    sig.length !== attendu.length ||
    !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(attendu))
  ) {
    return [];
  }
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString());
    return Array.isArray(data) ? data.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}
