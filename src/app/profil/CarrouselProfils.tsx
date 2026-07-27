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

  /* Glisse « ressort » horizontale : même courbe que le ressort vertical de
     la page (easeGlisse), au lieu du smooth natif du navigateur. Le snap CSS
     est coupé pendant la glisse (sinon il tire par à-coups), puis rétabli. */
  const animRef = useRef(0);
  const glisseActiveRef = useRef(false); // vraie pendant la glisse (la molette n'empile pas les sauts)
  function easeGlisse(t: number) { return t * t * t * (t * (t * 6 - 15) + 10); }
  function glisserVers(cible: number) {
    const el = railRef.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.scrollTo({ left: cible, behavior: "auto" });
      return;
    }
    cancelAnimationFrame(animRef.current);
    const depart = el.scrollLeft, delta = cible - depart;
    if (!delta) return;
    glisseActiveRef.current = true;
    el.style.scrollSnapType = "none";
    const D = Math.min(1200, 500 + Math.abs(delta) * 0.35);
    const t0 = performance.now();
    const pas = (t: number) => {
      const p = Math.min(1, (t - t0) / D);
      el.scrollLeft = depart + delta * easeGlisse(p);
      if (p < 1) animRef.current = requestAnimationFrame(pas);
      else { el.style.scrollSnapType = ""; setTimeout(() => { glisseActiveRef.current = false; }, 160); }
    };
    animRef.current = requestAnimationFrame(pas);
  }
  function defiler(sens: 1 | -1) {
    const el = railRef.current;
    if (!el) return;
    // Une « page » = la largeur visible (2 cartes) + l'écart de 20 px.
    const max = el.scrollWidth - el.clientWidth;
    glisserVers(Math.min(max, Math.max(0, el.scrollLeft + sens * (el.clientWidth + 20))));
  }

  /* Un geste HORIZONTAL (trackpad, ou Maj+molette) au-dessus des cartes =
     une « page » entière (2 cartes), même glisse que les flèches. Le geste
     vertical n'est pas touché : c'est la page qui descend (ressort global). */
  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    let dernierEvtT = 0; // amortissement trackpad (traîne d'inertie avalée)
    const surMolette = (e: WheelEvent) => {
      const horizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey;
      if (!horizontal) return;
      e.preventDefault();
      e.stopPropagation();
      const tEvt = performance.now();
      const ecartEvt = tEvt - dernierEvtT;
      dernierEvtT = tEvt;
      if (glisseActiveRef.current) return;
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) < 8) return;
      if (Math.abs(delta) < 50 && ecartEvt < 140) return;
      defiler(delta > 0 ? 1 : -1);
    };
    el.addEventListener("wheel", surMolette, { passive: false });
    return () => el.removeEventListener("wheel", surMolette);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    <div data-anim="up" className="relative mt-8 min-w-0">
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
