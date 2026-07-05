"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";

/*
 * CARROUSEL de la galerie « Mes profils » : 2 cartes de test VISIBLES,
 * les suivantes au défilement (flèches rondes vertes, patron PartageInline /
 * CarrouselRelations). Les cartes restent rendues CÔTÉ SERVEUR (children),
 * seul l'emballage défilant est client.
 * ⚠️ Leçons connues : ResizeObserver pour recalculer les flèches (sinon
 * invisibles quand le conteneur change), min-w-0 géré par le parent.
 */
const VERT = "rgba(51,164,116,0.85)";

export default function CarrouselProfils({ children }: { children: ReactNode }) {
  const railRef = useRef<HTMLDivElement | null>(null);
  const [peutG, setPeutG] = useState(false);
  const [peutD, setPeutD] = useState(false);

  function majFleches() {
    const el = railRef.current;
    if (!el) return;
    setPeutG(el.scrollLeft > 1);
    setPeutD(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  }
  useEffect(() => {
    majFleches();
    const el = railRef.current;
    if (!el) return;
    const ro = new ResizeObserver(majFleches);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  function defiler(sens: 1 | -1) {
    const el = railRef.current;
    if (!el) return;
    // Une « page » = la largeur visible (2 cartes) + l'écart de 20 px.
    el.scrollBy({ left: sens * (el.clientWidth + 20), behavior: "smooth" });
  }

  function Fleche({ sens }: { sens: 1 | -1 }) {
    const visible = sens === 1 ? peutD : peutG;
    return (
      <button
        type="button"
        aria-label={sens === 1 ? "Cartes suivantes" : "Cartes précédentes"}
        onClick={() => defiler(sens)}
        className="absolute top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full transition-opacity cursor-pointer"
        style={{
          [sens === 1 ? "right" : "left"]: -14,
          background: VERT,
          boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
        }}
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d={sens === 1 ? "M9 6l6 6-6 6" : "M15 6l-6 6 6 6"} />
        </svg>
      </button>
    );
  }

  return (
    <div className="relative mt-8 min-w-0">
      <style>{`.cprof-noscroll{scrollbar-width:none}.cprof-noscroll::-webkit-scrollbar{display:none}`}</style>
      <Fleche sens={-1} />
      <Fleche sens={1} />
      <div
        ref={railRef}
        onScroll={majFleches}
        className="cprof-noscroll flex snap-x snap-mandatory gap-5 overflow-x-auto"
      >
        {Children.map(children, (enfant) => (
          <div className="w-full flex-none snap-start sm:w-[calc(50%-10px)]">{enfant}</div>
        ))}
      </div>
    </div>
  );
}
