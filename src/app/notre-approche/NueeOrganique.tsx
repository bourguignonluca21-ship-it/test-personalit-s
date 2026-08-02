"use client";

import { useEffect, useRef } from "react";

/*
  LA NUÉE ORGANIQUE — héros de « Notre approche ».
  Des milliers de fines particules vertes dérivent en courants fluides
  (champ d'écoulement calculé par ondes superposées, façon bruit de Perlin),
  comme une nuée d'oiseaux ou de l'encre dans l'eau. La souris courbe
  doucement les courants autour d'elle. L'ensemble s'estompe quand on
  quitte le héros.
  Performance : un seul canvas transparent, traînées par effacement
  progressif, boucle coupée quand le héros n'est plus à l'écran, nombre de
  particules adapté à la taille. Masquée sous 900 px et en
  prefers-reduced-motion.
*/

const VERT = "51,164,116";

export default function NueeOrganique() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (innerWidth <= 900) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(1.5, devicePixelRatio || 1);
    let larg = 0, haut = 0;
    let particules: { x: number; y: number; a: number; v: number }[] = [];

    function dimensionner() {
      if (!canvas || !ctx) return;
      larg = canvas.clientWidth;
      haut = canvas.clientHeight;
      canvas.width = Math.round(larg * dpr);
      canvas.height = Math.round(haut * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, larg, haut);
      /* ~1 particule pour 700 px², borné : dense mais léger */
      const nb = Math.min(2400, Math.max(900, Math.round((larg * haut) / 700)));
      particules = Array.from({ length: nb }, (_, i) => ({
        x: ((i * 0.618033) % 1) * larg,
        y: ((i * 0.754877) % 1) * haut,
        a: 0.22 + ((i * 0.442249) % 1) * 0.5, // opacité propre
        v: 0.55 + ((i * 0.887766) % 1) * 0.75, // vitesse propre
      }));
    }
    dimensionner();
    const ro = new ResizeObserver(dimensionner);
    ro.observe(canvas);

    /* La souris courbe les courants autour d'elle */
    let sourisX = -9999, sourisY = -9999;
    const surSouris = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      sourisX = e.clientX - r.left;
      sourisY = e.clientY - r.top;
    };
    const sortieSouris = () => { sourisX = -9999; sourisY = -9999; };
    addEventListener("mousemove", surSouris, { passive: true });
    addEventListener("mouseleave", sortieSouris);

    /* Champ d'écoulement : ondes superposées → courants doux et continus */
    function angleChamp(x: number, y: number, t: number) {
      return (
        Math.sin(x * 0.0016 + t * 0.42) +
        Math.cos(y * 0.0014 - t * 0.31) +
        Math.sin((x + y) * 0.0009 + t * 0.2)
      ) * 1.35;
    }

    let visible = true;
    const io = new IntersectionObserver((es) => { visible = !!es[0]?.isIntersecting; }, { threshold: 0 });
    io.observe(canvas);

    let t = 0;
    let raf = 0;
    const boucle = () => {
      raf = requestAnimationFrame(boucle);
      if (!visible || !ctx) return;
      t += 0.0038;

      /* Traînées : on efface un voile du dessin précédent (canvas reste transparent) */
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,0.075)";
      ctx.fillRect(0, 0, larg, haut);
      ctx.globalCompositeOperation = "source-over";

      ctx.lineWidth = 1.1;
      ctx.lineCap = "round";
      for (const p of particules) {
        const px = p.x, py = p.y;
        let a = angleChamp(p.x, p.y, t);
        /* Influence de la souris : les courants s'écartent en douceur */
        const dx = p.x - sourisX, dy = p.y - sourisY;
        const d2 = dx * dx + dy * dy;
        if (d2 < 26000) {
          const force = 1 - d2 / 26000;
          a += Math.atan2(dy, dx) * 0.0 + force * 1.6 * Math.sign(Math.sin(a + Math.atan2(dy, dx)));
        }
        p.x += Math.cos(a) * p.v;
        p.y += Math.sin(a) * p.v;
        /* Sortie d'écran : la particule renaît de l'autre côté, sans trait */
        if (p.x < -4 || p.x > larg + 4 || p.y < -4 || p.y > haut + 4) {
          p.x = ((p.x % larg) + larg) % larg;
          p.y = ((p.y % haut) + haut) % haut;
          continue;
        }
        ctx.strokeStyle = `rgba(${VERT},${p.a})`;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      }
    };
    raf = requestAnimationFrame(boucle);

    /* L'ensemble s'estompe quand on quitte le héros */
    let rafScroll = 0;
    const surScroll = () => {
      if (rafScroll) return;
      rafScroll = requestAnimationFrame(() => {
        rafScroll = 0;
        canvas.style.opacity = String(Math.max(0, 1 - scrollY / (innerHeight * 0.85)));
      });
    };
    addEventListener("scroll", surScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(rafScroll);
      removeEventListener("mousemove", surSouris);
      removeEventListener("mouseleave", sortieSouris);
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
