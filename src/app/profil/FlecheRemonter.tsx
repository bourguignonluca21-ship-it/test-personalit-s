"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

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
  const wrapRef = useRef<HTMLDivElement>(null);
  /* Marge du haut CALCULÉE pour que la pastille soit pile au CENTRE de
     l'espace VISIBLE entre le bloc au-dessus (« Et tes proches ») et le haut
     du footer : l'espace sous la flèche (jusqu'au footer) est mesuré, et la
     même valeur est posée au-dessus. 48 px minimum (l'ancien mt-12). */
  const [margeHaut, setMargeHaut] = useState(48);

  useLayoutEffect(() => {
    function centrer() {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const basFleche = wrap.getBoundingClientRect().bottom + window.scrollY;
      const footer = document.querySelector("footer");
      const hautFooter = footer
        ? footer.getBoundingClientRect().top + window.scrollY
        : document.documentElement.scrollHeight;
      const dessous = hautFooter - basFleche;
      // Changer la marge du haut ne change PAS « dessous » : une seule passe suffit.
      setMargeHaut(Math.max(48, Math.round(dessous)));
    }
    centrer();
    window.addEventListener("resize", centrer);
    const ro = new ResizeObserver(centrer);
    ro.observe(document.body);
    return () => {
      window.removeEventListener("resize", centrer);
      ro.disconnect();
    };
  }, []);

  useEffect(() => {
    function maj() {
      const footer = document.querySelector("footer");
      if (!footer) return;
      // +150 : la flèche se déclenche un peu AVANT que le footer entre à
      // l'écran (demande Luca, réglable).
      setVisible(footer.getBoundingClientRect().top < window.innerHeight + 150);
    }
    maj();
    /* Au rythme des frames (pas à chaque événement scroll). */
    let attente = false;
    const surScroll = () => {
      if (attente) return;
      attente = true;
      requestAnimationFrame(() => { attente = false; maj(); });
    };
    window.addEventListener("scroll", surScroll, { passive: true });
    window.addEventListener("resize", surScroll);
    return () => {
      window.removeEventListener("scroll", surScroll);
      window.removeEventListener("resize", surScroll);
    };
  }, []);

  function remonter() {
    cancelAnimationFrame(animRef.current);
    /* On coupe une éventuelle glisse du ressort et on prend la main. */
    window.dispatchEvent(new Event("arret-ressort"));
    (window as unknown as { __glissePageEnCours?: boolean }).__glissePageEnCours = true;
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
      else {
        root.style.scrollBehavior = prevBehavior;
        setTimeout(() => {
          (window as unknown as { __glissePageEnCours?: boolean }).__glissePageEnCours = false;
          window.dispatchEvent(new Event("fin-glisse-page"));
        }, 160);
      }
    };
    animRef.current = requestAnimationFrame(tick);
  }

  return (
    /* Marge du haut dynamique : la pastille est centrée entre le bloc
       au-dessus et le bas de page (voir centrer() plus haut). */
    <div
      ref={wrapRef}
      className="flex justify-center"
      style={{
        marginTop: margeHaut,
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
