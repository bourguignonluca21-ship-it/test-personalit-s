import crypto from "crypto";

// INVITATION AU PARCOURS À DEUX : un jeton signé porté par le lien d'invitation
// (`/test?invite={jeton}`). Il contient l'user_id de l'INVITEUR ; signé avec le
// secret serveur (ACCES_SIGNING_SECRET, le même que la preuve d'achat), donc
// infalsifiable : personne ne peut fabriquer un lien au nom de quelqu'un d'autre.
// Patron identique à lib/acces.ts. L'invité n'a PAS besoin de compte : le jeton
// suffit à rattacher son résultat à l'inviteur (table `liens`).

function signer(payload: string): string {
  return crypto
    .createHmac("sha256", process.env.ACCES_SIGNING_SECRET!)
    .update(`duo:${payload}`) // préfixe : un jeton duo ne vaut jamais un cookie d'achat
    .digest("base64url");
}

// Fabrique le jeton d'invitation pour un inviteur connecté.
export function encoderInvitation(inviteurId: string): string {
  const payload = Buffer.from(JSON.stringify({ u: inviteurId })).toString("base64url");
  return `${payload}.${signer(payload)}`;
}

// Relit un jeton d'invitation. Renvoie l'user_id de l'inviteur,
// ou null si le jeton est absent, mal formé, ou falsifié.
export function decoderInvitation(jeton: string | undefined | null): string | null {
  if (!jeton) return null;
  const point = jeton.lastIndexOf(".");
  if (point < 0) return null;
  const payload = jeton.slice(0, point);
  const sig = jeton.slice(point + 1);
  const attendu = signer(payload);
  // Comparaison à temps constant (anti-timing). Tailles différentes = invalide.
  if (
    sig.length !== attendu.length ||
    !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(attendu))
  ) {
    return null;
  }
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString());
    return typeof data?.u === "string" && data.u ? data.u : null;
  } catch {
    return null;
  }
}
