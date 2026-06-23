"use client";

import { useState } from "react";

// Bloc « à quel point ce portrait te ressemble ? » : 5 visages cliquables, du moins
// au plus ressemblant. Inspiré de la structure 16P, contenu et voix « tu » propres au projet.
// Front-end seul pour l'instant (le vote n'est pas encore envoyé à un backend).
const FACES = [
  { label: "Pas du tout", mouth: "M7.5 16.5 Q12 11.5 16.5 16.5" },
  { label: "Un peu", mouth: "M8 15.8 Q12 13.2 16 15.8" },
  { label: "Moyennement", mouth: "M8 15 L16 15" },
  { label: "Plutôt bien", mouth: "M8 14.2 Q12 17 16 14.2" },
  { label: "Tout à fait", mouth: "M7.5 13.5 Q12 18.5 16.5 13.5" },
];

export default function PrecisionRating() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="mt-16 pt-12 border-t border-gray-100 text-center">
      <p className="text-lg text-[rgba(0,0,0,0.6)] mb-7">
        À quel point ce portrait te ressemble ?
      </p>

      <div className="flex items-center justify-center gap-3 md:gap-4">
        {FACES.map((f, i) => {
          const on = selected === i;
          return (
            <button
              key={f.label}
              type="button"
              aria-label={f.label}
              aria-pressed={on}
              onClick={() => setSelected(i)}
              className={
                "w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-200 hover:scale-110 " +
                (on
                  ? "border-[rgba(51,164,116,0.85)] text-[rgba(51,164,116,0.85)] bg-[rgba(51,164,116,0.12)]"
                  : "border-black/15 text-black/40 hover:border-[rgba(51,164,116,0.85)] hover:text-[rgba(51,164,116,0.85)] hover:bg-[rgba(51,164,116,0.08)]")
              }
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="8.6" cy="9.6" r="1.1" fill="currentColor" stroke="none" />
                <circle cx="15.4" cy="9.6" r="1.1" fill="currentColor" stroke="none" />
                <path d={f.mouth} strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          );
        })}
      </div>

      <p
        className="mt-6 text-sm font-semibold text-[rgba(51,164,116,0.85)] transition-opacity duration-300"
        style={{ opacity: selected !== null ? 1 : 0 }}
        aria-live="polite"
      >
        Merci, c&apos;est noté.
      </p>
    </div>
  );
}
