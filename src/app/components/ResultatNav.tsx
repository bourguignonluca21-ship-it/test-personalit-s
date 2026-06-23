"use client";

import { useEffect, useState } from "react";

const GREEN = "rgba(51,164,116,0.85)";

interface Sec {
  id: string;
  num: number;
  label: string;
}

// Sommaire collant + scroll-spy : surligne la section où l'on se trouve.
// Desktop : colonne verticale à gauche. Mobile : barre horizontale collante en haut.
export default function ResultatNav({ sections }: { sections: readonly Sec[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? "");
  // Le menu reste masqué tout en haut (sur le héros) et apparaît en fondu doux dès qu'on descend.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      const offset = 150; // ligne de référence sous la navbar
      let current = sections[0]?.id ?? "";
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top - offset <= 0) current = s.id;
      }
      setActive(current);
      setVisible(window.scrollY > 80);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sections]);

  return (
    <nav
      aria-label="Sections"
      className="sticky top-[57px] xl:top-24 z-30 bg-white/90 backdrop-blur border-b border-gray-100 xl:bg-white xl:border xl:border-gray-100 xl:rounded-2xl xl:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.15)] xl:p-2 xl:w-56 xl:mt-10 transition-all duration-500 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(6px)",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <ul className="flex xl:flex-col gap-1 overflow-x-auto xl:overflow-visible px-6 xl:px-0">
        {sections.map((s) => {
          const on = active === s.id;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={() => setActive(s.id)}
                className="block whitespace-nowrap py-3 xl:py-2.5 px-3 text-sm font-semibold transition-colors border-b-[3px] xl:border-b-0 xl:border-l-[3px]"
                style={on ? { color: GREEN, borderColor: GREEN } : { color: "rgba(0,0,0,0.55)", borderColor: "transparent" }}
              >
                {s.num}. {s.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
