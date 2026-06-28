"use client";

import { useEffect, useRef, useState } from "react";

// Emblème carré dont le côté = la hauteur du bloc texte voisin (type + variante).
// On mesure la hauteur (donnée par self-stretch dans le flex) et on fixe la largeur égale,
// car `aspect-square` sur un item flex se dimensionne à tort sur la largeur du texte.
export default function EmblemeCarre({ code }: { code: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState<number | undefined>(undefined);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setW(el.offsetHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="shrink-0 self-stretch flex items-center justify-center rounded-2xl text-base font-semibold tracking-wide text-white"
      style={{ width: w, background: "rgba(255,255,255,0.16)", border: "1.5px solid rgba(255,255,255,0.5)" }}
    >
      {code}
    </div>
  );
}
