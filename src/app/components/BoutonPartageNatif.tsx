"use client";

import { useEffect, useState } from "react";

const GREEN = "rgba(51,164,116,0.85)";

// Bouton de la page /partager (ouverte après le scan du QR, sur le téléphone).
// Au tap, il ouvre la FEUILLE DE PARTAGE NATIVE du téléphone (la vraie liste d'applis)
// avec le message + le lien vers le profil public /p. Sur ordinateur (pas de partage
// natif), il copie le message en secours.
export default function BoutonPartageNatif({
  code,
  nomVariante,
}: {
  code: string;
  nomVariante: string;
}) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    const seg = window.location.pathname.split("/").filter(Boolean);
    const slug = seg[seg.length - 1] ?? "";
    const params = new URLSearchParams(window.location.search);
    const propres = new URLSearchParams();
    const s = params.get("s");
    const v = params.get("v");
    if (s) propres.set("s", s);
    if (v) propres.set("v", v);
    const q = propres.toString();
    setUrl(`${window.location.origin}/p/${slug}${q ? `?${q}` : ""}`);
  }, []);

  const message = `Hey, j'ai fait ce test de personnalité, je suis ${code} : ${nomVariante}. Regarde mon profil :`;

  async function partager() {
    if (navigator.share) {
      try {
        await navigator.share({ text: message, url });
      } catch {
        /* annulé par l'utilisateur */
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${message} ${url}`);
      } catch {
        /* ignore */
      }
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={partager}
        className="w-full text-white font-semibold py-4 px-8 rounded-full text-lg hover:opacity-90 transition"
        style={{ background: GREEN }}
      >
        Partager mon profil
      </button>
      <p className="text-sm text-gray-400 mt-4">Choisis l&apos;application où envoyer ton profil.</p>
    </div>
  );
}
