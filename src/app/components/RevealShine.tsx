"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

// Enveloppe le contenu débloqué : déclenche le balayage « miroir » quand le bloc entre
// à l'écran (IntersectionObserver, une seule fois), et le fige tant qu'on le survole.
export default function RevealShine({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [go, setGo] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setGo(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`shine-reveal${go ? " shine-go" : ""}${paused ? " shine-paused" : ""}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {children}
    </div>
  );
}
