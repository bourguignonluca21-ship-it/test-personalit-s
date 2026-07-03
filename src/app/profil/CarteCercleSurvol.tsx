"use client";

import { useState, type ReactNode } from "react";
import { CercleProgression } from "./ProfilOnglets";

/*
 * Enrobe une carte de test de la galerie « Mes profils » : au survol, un
 * cercle de progression apparaît À CÔTÉ de la carte (à gauche pour la carte
 * de gauche, à droite pour celle de droite), charge sa progression (le
 * cercle rejoue son animation à chaque apparition), et disparaît quand le
 * survol cesse.
 */
export default function CarteCercleSurvol({
  pct,
  cote,
  children,
}: {
  pct: number;
  cote: "g" | "d";
  children: ReactNode;
}) {
  const [survol, setSurvol] = useState(false);
  return (
    <div
      className="relative h-full"
      onMouseEnter={() => setSurvol(true)}
      onMouseLeave={() => setSurvol(false)}
    >
      {children}
      {survol && (
        <div
          aria-hidden
          className="pointer-events-none absolute hidden lg:block"
          style={{
            top: "50%",
            [cote === "g" ? "left" : "right"]: -64,
            animation: "ccs-in .3s ease both",
          }}
        >
          <style>{`@keyframes ccs-in{from{opacity:0;transform:translateY(-50%) scale(.7)}to{opacity:1;transform:translateY(-50%) scale(1)}}`}</style>
          <CercleProgression pct={pct} />
        </div>
      )}
    </div>
  );
}
