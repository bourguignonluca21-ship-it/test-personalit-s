"use client";

import { useEffect, useRef, useState } from "react";

/*
 * Petite flèche « remonter » (chevron vers le haut dans un cercle vert, même
 * style que les flèches du carrousel), affichée pile sous le bloc de partage.
 * Elle apparaît en fondu quand le footer (« FAQ »…) entre à l'écran, et
 * remonte la page en douceur au clic (rAF maison, smooth CSS global coupé
 * pendant l'animation, même technique que la descente vers le contenu).
 */

const VERT = "rgba(51,164,116,0.85)";

export default function FlecheRemonter() {
  const [visible, setVisible] = useState(false);
  const animRef = useRef(0);

  useEffect(() => {
    function maj() {
      const footer = document.querySelector("footer");
      if (!footer) return;
      // +150 : la flèche se déclenche un peu AVANT que le footer entre à
      // l'écran (demande Luca, réglable).
      setVisible(footer.getBoundingClientRect().top < window.innerHeight + 150);
    }
    maj();
    window.addEventListener("scroll", maj, { passive: true });
    window.addEventListener("resize", maj);
    return () => {
      window.removeEventListener("scroll", maj);
      window.removeEventListener("resize", maj);
    };
  }, []);

  function remonter() {
    cancelAnimationFrame(animRef.current);
    const root = document.documentElement;
    const prevBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    const depart = window.scrollY;
    const DUREE = 700;
    const t0 = performance.now();
    const tick = (t: number) => {
      const avancee = Math.min(1, (t - t0) / DUREE);
      const ease = 1 - Math.pow(1 - avancee, 3);
      window.scrollTo(0, depart * (1 - ease));
      if (avancee < 1) animRef.current = requestAnimationFrame(tick);
      else root.style.scrollBehavior = prevBehavior;
    };
    animRef.current = requestAnimationFrame(tick);
  }

  return (
    /* mt-12 = 48 px au-dessus (remontée de 32 px, demande Luca), pb-20 de la
       section en dessous. */
    <div
      className="mt-12 flex justify-center"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity .45s ease",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <button
        type="button"
        aria-label="Remonter en haut de la page"
        onClick={remonter}
        className="cursor-pointer transition-transform hover:scale-110"
        style={{
          width: 34,
          height: 34,
          borderRadius: "50%",
          background: VERT,
          border: "none",
          boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
          display: "grid",
          placeItems: "center",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 15l6-6 6 6" />
        </svg>
      </button>
    </div>
  );
}
