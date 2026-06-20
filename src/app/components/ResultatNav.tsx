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

  useEffect(() => {
    function onScroll() {
      const offset = 150; // ligne de référence sous la navbar
      let current = sections[0]?.id ?? "";
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top - offset <= 0) current = s.id;
      }
      setActive(current);
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
      className="sticky top-[57px] md:top-24 z-30 bg-white/90 backdrop-blur border-b border-gray-100 md:bg-white md:border md:border-gray-100 md:rounded-2xl md:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.15)] md:p-2 md:w-56 md:shrink-0 md:self-start md:mt-10"
    >
      <ul className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible px-6 md:px-0">
        {sections.map((s) => {
          const on = active === s.id;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={() => setActive(s.id)}
                className="block whitespace-nowrap py-3 md:py-2.5 px-3 text-sm font-semibold transition-colors border-b-[3px] md:border-b-0 md:border-l-[3px]"
                style={on ? { color: GREEN, borderColor: GREEN } : { color: "#9ca3af", borderColor: "transparent" }}
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
