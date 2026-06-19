"use client";

import { useEffect, useRef } from "react";

// Halo décoratif qui suit le curseur en douceur (effet « eau »).
// Vert sur les fonds clairs, blanc sur les fonds verts → continuité visuelle.
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const GREEN = { r: 51, g: 164, b: 116, a: 0.06 }; // sur blanc
    const WHITE = { r: 255, g: 255, b: 255, a: 0.12 }; // sur vert

    // Position cible (souris) et position rendue (suit avec inertie).
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { ...target };
    const col = { ...GREEN };
    let visible = false;
    let raf = 0;

    // Choisit la couleur selon la luminosité du fond sous le point donné.
    function pickColor(x: number, y: number) {
      let node = document.elementFromPoint(x, y) as HTMLElement | null;
      let lum = 1;
      while (node) {
        const bg = getComputedStyle(node).backgroundColor;
        const m = bg.match(/rgba?\(([^)]+)\)/);
        if (m) {
          const parts = m[1].split(",").map((v) => parseFloat(v));
          const [r, g, b, a = 1] = parts;
          if (a > 0.1) {
            lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
            break;
          }
        }
        node = node.parentElement;
      }
      return lum < 0.8 ? WHITE : GREEN;
    }

    function frame() {
      // Inertie : on rattrape la cible progressivement.
      pos.x += (target.x - pos.x) * 0.1;
      pos.y += (target.y - pos.y) * 0.1;

      const t = pickColor(pos.x, pos.y);
      col.r += (t.r - col.r) * 0.06;
      col.g += (t.g - col.g) * 0.06;
      col.b += (t.b - col.b) * 0.06;
      col.a += (t.a - col.a) * 0.06;

      const r = Math.round(col.r);
      const g = Math.round(col.g);
      const b = Math.round(col.b);
      el!.style.background = `radial-gradient(280px circle at ${pos.x}px ${pos.y}px, rgba(${r},${g},${b},${col.a.toFixed(
        3,
      )}), transparent 70%)`;
      raf = requestAnimationFrame(frame);
    }

    function onMove(e: MouseEvent) {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!visible) {
        visible = true;
        el!.style.opacity = "1";
      }
    }
    function onLeave() {
      visible = false;
      el!.style.opacity = "0";
    }

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[5] opacity-0 transition-opacity duration-700"
    />
  );
}
