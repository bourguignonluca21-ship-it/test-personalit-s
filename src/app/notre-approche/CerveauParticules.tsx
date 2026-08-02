"use client";

import { useEffect, useRef } from "react";

/*
  LE CERVEAU EN PARTICULES — héros de « Notre approche » (référence : le
  cerveau 3D de la page technologie de Neuralink, transposé dans notre
  identité verte sur fond clair).
  Un nuage d'environ 4000 points verts dessine la surface d'un cerveau
  stylisé : deux hémisphères, sillon central, relief des circonvolutions,
  cervelet. Il tourne lentement sur lui-même, s'incline doucement vers la
  souris, et les points proches sont plus gros et plus présents que les
  points lointains (profondeur). Projection 3D maison sur un canvas 2D :
  AUCUNE dépendance à installer.
  Sobriété technique : boucle coupée quand le héros sort de l'écran,
  s'estompe au défilement, masqué sous 900 px et en prefers-reduced-motion.
*/

const VERT = "82,178,137";

/* ————— La forme, calculée UNE FOIS (déterministe) —————
   La clé de la lisibilité : les points ne sont PAS éparpillés au hasard,
   ils suivent des COURBES qui serpentent sur la surface, comme les
   circonvolutions. Chaque hémisphère est un jeu d'arcs qui partent du
   front, passent par-dessus le crâne et redescendent à l'arrière, en
   ondulant. S'y ajoutent le sillon central (l'écart entre les deux
   hémisphères), un arrière plus allongé que le front, et le cervelet en
   petits anneaux serrés. L'œil lit « cerveau » immédiatement. */
function construirePoints(): Float32Array {
  const pts: number[] = [];

  const NB_STRIES = 14; // courbes par hémisphère
  const PTS_STRIE = 64; // points par courbe

  for (const cote of [1, -1]) {
    for (let k = 0; k < NB_STRIES; k++) {
      const psiBase = ((k + 0.6) / NB_STRIES) * 1.32; // 0 (sommet) → ~76° (flanc)
      const phase = k * 2.1 + (cote > 0 ? 0 : 1.3);
      for (let j = 0; j < PTS_STRIE; j++) {
        const tau = -1.38 + (j / (PTS_STRIE - 1)) * 2.76; // avant → sommet → arrière
        /* La strie ondule : c'est elle, la circonvolution */
        const psi =
          psiBase +
          0.085 * Math.sin(tau * 4.2 + phase) +
          0.045 * Math.sin(tau * 9.1 + phase * 1.7);
        let x = Math.sin(psi);
        let y = Math.cos(psi) * Math.cos(tau);
        let z = Math.cos(psi) * Math.sin(tau);
        /* Léger grain radial pour casser la perfection */
        const grain = 1 + 0.016 * Math.sin(tau * 13 + psi * 17 + phase);
        x *= grain; y *= grain; z *= grain;
        /* Proportions : plus long que haut, front rond, arrière allongé */
        x *= 0.92;
        y *= 0.80;
        z *= z > 0 ? 1.12 : 1.34; // z>0 = front, z<0 = arrière (occipital)
        /* Le sillon central : chaque hémisphère est décalé de son côté */
        x = cote * (Math.abs(x) + 0.055);
        /* Base aplatie (le cerveau repose) */
        if (y < -0.34) y = -0.34 + (y + 0.34) * 0.5;
        pts.push(x, y, z);
      }
    }
  }

  /* Le cervelet : petits anneaux horizontaux serrés, à l'arrière-bas */
  const ANNEAUX = 7;
  for (let k = 0; k < ANNEAUX; k++) {
    const h = -0.62 + (k / (ANNEAUX - 1)) * 0.3; // hauteur de l'anneau
    const r = Math.cos(((k / (ANNEAUX - 1)) - 0.5) * 2.4) * 0.34; // renflé au milieu
    const n = 40;
    for (let j = 0; j < n; j++) {
      const a = (j / n) * Math.PI * 2;
      const ond = 1 + 0.05 * Math.sin(a * 9 + k); // striures fines du cervelet
      pts.push(Math.cos(a) * r * ond * 1.35, h, Math.sin(a) * r * ond - 0.98);
    }
  }

  return new Float32Array(pts);
}

const POINTS = construirePoints();
const NB = POINTS.length / 3;

export default function CerveauParticules() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (innerWidth <= 900) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const points = POINTS;
    const dpr = Math.min(1.5, devicePixelRatio || 1);
    let larg = 0, haut = 0;

    function dimensionner() {
      if (!canvas || !ctx) return;
      larg = canvas.clientWidth;
      haut = canvas.clientHeight;
      canvas.width = Math.round(larg * dpr);
      canvas.height = Math.round(haut * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    dimensionner();
    const ro = new ResizeObserver(dimensionner);
    ro.observe(canvas);

    /* La souris incline doucement le cerveau (cible lissée) */
    let cibleX = 0, cibleY = 0, incX = 0, incY = 0;
    const surSouris = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      cibleY = ((e.clientX - r.left) / r.width - 0.5) * 0.55;
      cibleX = ((e.clientY - r.top) / r.height - 0.5) * 0.35;
    };
    const sortieSouris = () => { cibleX = 0; cibleY = 0; };
    addEventListener("mousemove", surSouris, { passive: true });
    document.documentElement.addEventListener("mouseleave", sortieSouris);

    let visible = true;
    const io = new IntersectionObserver((es) => { visible = !!es[0]?.isIntersecting; }, { threshold: 0 });
    io.observe(canvas);

    let t = 0;
    let raf = 0;
    const boucle = () => {
      raf = requestAnimationFrame(boucle);
      if (!visible || !ctx) return;
      t += 0.0042;
      incY += (cibleY - incY) * 0.04;
      incX += (cibleX - incX) * 0.04;

      ctx.clearRect(0, 0, larg, haut);

      /* Le cerveau : centré, légèrement au-dessus du milieu (le titre respire) */
      const cx = larg / 2;
      const cy = haut * 0.38;
      const rayon = Math.min(larg * 0.30, haut * 0.34);

      const rotY = t + incY;
      const rotX = -0.38 + incX;
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);

      for (let i = 0; i < NB; i++) {
        const x0 = points[i * 3], y0 = points[i * 3 + 1], z0 = points[i * 3 + 2];
        /* rotation autour de Y (la toupie), puis inclinaison X */
        const x1 = x0 * cosY + z0 * sinY;
        const z1 = -x0 * sinY + z0 * cosY;
        const y2 = y0 * cosX - z1 * sinX;
        const z2 = y0 * sinX + z1 * cosX;
        /* perspective : les points proches sont plus grands */
        const persp = 3.1 / (3.1 + z2);
        const sx = cx + x1 * rayon * persp;
        const sy = cy - y2 * rayon * persp;
        /* profondeur : proche = présent, lointain = voile */
        const prof = Math.max(0, Math.min(1, (1.4 - z2) / 2.4));
        const alpha = 0.1 + prof * 0.72;
        const taille = 0.9 + prof * 2.0;
        ctx.fillStyle = `rgba(${VERT},${alpha})`;
        ctx.fillRect(sx, sy, taille, taille);
      }
    };
    raf = requestAnimationFrame(boucle);

    /* S'estompe quand on quitte le héros */
    let rafScroll = 0;
    const surScroll = () => {
      if (rafScroll) return;
      rafScroll = requestAnimationFrame(() => {
        rafScroll = 0;
        canvas.style.opacity = String(Math.max(0, 1 - scrollY / (innerHeight * 0.8)));
      });
    };
    addEventListener("scroll", surScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(rafScroll);
      removeEventListener("mousemove", surSouris);
      document.documentElement.removeEventListener("mouseleave", sortieSouris);
      removeEventListener("scroll", surScroll);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full max-[900px]:hidden"
    />
  );
}
