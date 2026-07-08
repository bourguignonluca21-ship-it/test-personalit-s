"use client";

import { useEffect, useRef } from "react";
import MeshGradient from "./MeshGradient";

// Déformation du fond au passage de la souris (home).
// Principe : une « lentille » fixe suit le curseur (transform GPU, retard doux).
// Elle contient une COPIE opaque du fond (blanc + MeshGradient), contre-translatée
// pour s'aligner AU PIXEL sur le vrai fond, et déformée par un filtre SVG
// feTurbulence + feDisplacementMap. Garanties de fluidité :
// - le bruit du filtre est STATIQUE (généré une fois, jamais re-généré) ;
// - le filtre ne repeint que la petite zone (overflow hidden AVANT le filtre),
//   jamais le fond entier (~340² px par frame, négligeable) ;
// - la lentille et la copie ne bougent que par transform (composité GPU) ;
// - la boucle rAF S'ENDORT ~0,9 s après le dernier mouvement de souris
//   (fondu de sortie fini) et se réveille au mouvement suivant ;
// - désactivé au tactile (pointer:fine) et en prefers-reduced-motion.
// La déformation n'est visible que là où le fond l'est (elle vit derrière le
// contenu, z -5, entre le fond fixe (-10) et le voile d'atmosphère (-1)).

const TAILLE = 340; // diamètre de la zone déformée (px)

export default function DeformationFond() {
  const lentilleRef = useRef<HTMLDivElement>(null);
  const copieRef = useRef<HTMLDivElement>(null);
  const dispRef = useRef<SVGFEDisplacementMapElement>(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!matchMedia("(pointer:fine)").matches) return;
    const lentille = lentilleRef.current;
    const copie = copieRef.current;
    const disp = dispRef.current;
    if (!lentille || !copie || !disp) return;
    const fond = document.getElementById("hero-fond-fixe");

    let cx = -1000, cy = -1000; // cible (souris)
    let x = cx, y = cy; // position lissée (retard doux)
    let op = 0; // opacité lissée
    let dansFenetre = false;
    let dernierMouvement = 0;
    let t = 0; // temps de la respiration
    let actif = false;
    let rafId = 0;

    const boucle = () => {
      const maintenant = performance.now();
      // premier mouvement : on se cale directement sur la souris (pas de long trajet)
      if (x < -900) { x = cx; y = cy; }
      x += (cx - x) * 0.14;
      y += (cy - y) * 0.14;
      t += 0.016;

      const lx = x - TAILLE / 2;
      const ly = y - TAILLE / 2;
      lentille.style.transform = `translate3d(${lx.toFixed(1)}px, ${ly.toFixed(1)}px, 0)`;
      copie.style.transform = `translate3d(${(-lx).toFixed(1)}px, ${(-ly).toFixed(1)}px, 0)`;
      // la copie réplique la hauteur du vrai fond (bornée au bloc vert final)
      const h = fond?.style.height;
      if (h && copie.style.height !== h) copie.style.height = h;

      // respiration de l'amplitude de déformation (re-filtre la petite zone seulement)
      disp.setAttribute("scale", (22 + 8 * Math.sin(t * 1.9)).toFixed(1));

      // visible pendant le mouvement, fondu de sortie ~0,9 s après le dernier geste
      const cible = dansFenetre && maintenant - dernierMouvement < 900 ? 1 : 0;
      op += (cible - op) * 0.1;
      lentille.style.opacity = op.toFixed(3);

      // plus rien à faire → la boucle s'endort (réveil au prochain mousemove)
      if (cible === 0 && op < 0.005) {
        lentille.style.opacity = "0";
        actif = false;
        return;
      }
      rafId = requestAnimationFrame(boucle);
    };

    const surSouris = (e: MouseEvent) => {
      cx = e.clientX;
      cy = e.clientY;
      dansFenetre = true;
      dernierMouvement = performance.now();
      if (!actif) {
        actif = true;
        rafId = requestAnimationFrame(boucle);
      }
    };
    const surSortie = () => {
      dansFenetre = false;
    };

    addEventListener("mousemove", surSouris, { passive: true });
    document.documentElement.addEventListener("mouseleave", surSortie);
    return () => {
      removeEventListener("mousemove", surSouris);
      document.documentElement.removeEventListener("mouseleave", surSortie);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Le filtre : bruit STATIQUE, seule l'amplitude (scale) respire */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
        <filter id="deforme-fond" x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.016" numOctaves="2" seed="7" result="bruit" />
          <feDisplacementMap ref={dispRef} in="SourceGraphic" in2="bruit" scale="22" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* La lentille : suit la souris, bords fondus au masque radial */}
      <div
        ref={lentilleRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0"
        style={{
          width: TAILLE,
          height: TAILLE,
          zIndex: -5,
          opacity: 0,
          willChange: "transform, opacity",
          WebkitMaskImage: "radial-gradient(circle, #000 0%, rgba(0,0,0,0.6) 55%, transparent 72%)",
          maskImage: "radial-gradient(circle, #000 0%, rgba(0,0,0,0.6) 55%, transparent 72%)",
        }}
      >
        {/* La zone filtrée : overflow hidden AVANT le filtre → le filtre ne
            travaille que sur 340×340, jamais sur le viewport entier */}
        <div className="h-full w-full overflow-hidden" style={{ filter: "url(#deforme-fond)" }}>
          {/* Copie opaque du fond (blanc + dégradé), contre-translatée pour
              s'aligner au pixel sur le vrai fond derrière */}
          <div
            ref={copieRef}
            className="absolute left-0 top-0 bg-white"
            style={{ width: "100vw", height: "100svh", willChange: "transform" }}
          >
            <MeshGradient />
          </div>
        </div>
      </div>
    </>
  );
}
