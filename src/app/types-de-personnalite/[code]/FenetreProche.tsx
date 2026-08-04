"use client";

import { useEffect, useState } from "react";
import { PARAM_PARTAGE, VALEUR_PARTAGE } from "./paramPartage";

// =============================================================================
// LA FENÊTRE DU VISITEUR À QUI ON A PARTAGÉ LA PAGE.
//
// Elle ne s'ouvre QUE si l'adresse porte le paramètre de reconnaissance posé
// par le bloc de partage (voir SectionPartage). Quelqu'un qui arrive par une
// recherche, par le menu ou par le sommaire ne la voit jamais.
//
// Le dessin n'invente rien : c'est celui des fenêtres du site (fond blanc
// flouté, carte blanche arrondie, bouton vert en pilule), repris de
// FenetrePartage et de la fenêtre QR de PartageInline.
// =============================================================================

const VERT = "rgba(51,164,116,0.85)";

export default function FenetreProche({ code }: { code: string }) {
  const [ouvert, setOuvert] = useState(false);

  // Le paramètre se lit au montage, côté navigateur. Rendu d'abord fermé :
  // l'ouverture au second temps laisse la transition d'échelle se jouer.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get(PARAM_PARTAGE) === VALEUR_PARTAGE) setOuvert(true);
  }, []);

  useEffect(() => {
    if (!ouvert) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOuvert(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [ouvert]);

  return (
    <>
      {/* Le fond flouté, comme les autres fenêtres du site. */}
      <div
        onClick={() => setOuvert(false)}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 60,
          background: "rgba(255,255,255,0.45)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          opacity: ouvert ? 1 : 0,
          visibility: ouvert ? "visible" : "hidden",
          transition: "opacity .35s ease, visibility .35s",
        }}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Un proche t'a partagé cette page"
        style={{
          position: "fixed",
          zIndex: 70,
          left: "50%",
          top: "50%",
          width: "min(420px, 92vw)",
          background: "#fff",
          borderRadius: 22,
          boxShadow: "0 30px 80px -24px rgba(0,0,0,0.40)",
          textAlign: "center",
          padding: "34px 30px 30px",
          boxSizing: "border-box",
          transformOrigin: "50% 115%",
          transform: ouvert
            ? "translate(-50%,-50%) scale(1)"
            : "translate(-50%,-50%) scale(.18)",
          opacity: ouvert ? 1 : 0,
          visibility: ouvert ? "visible" : "hidden",
          transition:
            "transform .42s cubic-bezier(.34,1.4,.5,1), opacity .3s ease, visibility .42s",
        }}
      >
        <h3
          style={{
            fontSize: 21,
            fontWeight: 700,
            letterSpacing: "-0.01em",
            color: "rgba(0,0,0,0.8)",
            margin: "0 0 10px",
          }}
        >
          Un proche t&apos;a partagé cette page
        </h3>
        <p
          style={{
            fontSize: 14.5,
            color: "rgba(0,0,0,0.55)",
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          Quelqu&apos;un a pensé à toi en t&apos;envoyant la description de la
          personnalité {code}. Prends le temps de la lire. Et si tu veux savoir
          quel type est le tien, le test t&apos;attend quand tu voudras.
        </p>
        <button
          type="button"
          onClick={() => setOuvert(false)}
          style={{
            marginTop: 24,
            background: VERT,
            color: "#fff",
            border: "none",
            borderRadius: 999,
            padding: "10px 30px",
            fontSize: 15,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Compris
        </button>
      </div>
    </>
  );
}
