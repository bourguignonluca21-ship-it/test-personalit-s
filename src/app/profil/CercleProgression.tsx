"use client";

import { useEffect, useRef, useState } from "react";

/*
 * Cercle de progression : anneau vert qui se remplit + % au centre.
 * Incite à compléter son profil (effet « profil complété à X % »).
 * DANS SON PROPRE FICHIER (et pas dans ProfilOnglets.tsx) pour casser
 * l'import circulaire ProfilOnglets → FenetreParcours → ProfilOnglets,
 * qui plantait la compilation. ProfilOnglets le RÉ-EXPORTE pour ne pas
 * casser les imports existants (page.tsx, CarteCercleSurvol).
 */

const VERT = "rgba(51,164,116,0.85)";
const INK = "rgba(0,0,0,0.75)";

export function CercleProgression({ pct, taille = 48 }: { pct: number; taille?: number }) {
  const R = 20;
  const C = 2 * Math.PI * R; // circonférence

  // Animation de chargement : l'anneau ET le nombre montent de 0 jusqu'au
  // % réel (900 ms, décélération douce), via rAF. Rejouée au survol.
  const [affiche, setAffiche] = useState(0);
  const [survol, setSurvol] = useState(false);
  const rafRef = useRef(0);
  function lancerAnimation() {
    cancelAnimationFrame(rafRef.current);
    const debut = performance.now();
    const DUREE = 900;
    const tick = (t: number) => {
      const avancee = Math.min(1, (t - debut) / DUREE);
      const ease = 1 - Math.pow(1 - avancee, 3); // ease-out cubic
      setAffiche(pct * ease);
      if (avancee < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }
  useEffect(() => {
    lancerAnimation();
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pct]);

  return (
    <svg
      width={taille}
      height={taille}
      viewBox="0 0 48 48"
      aria-label={`Complété à ${pct} %`}
      onMouseEnter={() => {
        setSurvol(true);
        lancerAnimation(); // la progression se recharge comme à l'arrivée
      }}
      onMouseLeave={() => setSurvol(false)}
      style={{
        transform: survol ? "scale(1.18)" : "scale(1)",
        transition: "transform .6s ease",
      }}
    >
      <circle cx="24" cy="24" r={R} fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="4" />
      <circle
        cx="24"
        cy="24"
        r={R}
        fill="none"
        stroke={VERT}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={C}
        strokeDashoffset={C * (1 - affiche / 100)}
        transform="rotate(-90 24 24)"
      />
      <text
        x="24"
        y="25"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="11"
        fontWeight="700"
        fill={INK}
      >
        {Math.round(affiche)}%
      </text>
    </svg>
  );
}
