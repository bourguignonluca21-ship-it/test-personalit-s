"use client";

import { useEffect, useState } from "react";
import { getTypeByCode } from "../data/types";

const GREEN = "rgba(51,164,116,0.85)";
const RED = "rgba(214,69,69,0.7)";

export interface CompatibiliteBloc {
  titre: string;
  ton: "positif" | "negatif";
  items: string[];
  // Panneau au survol : soit un type (code → nom résolu), soit un libellé libre (nom).
  profils: { code?: string; nom?: string; raison: string }[];
  panelTitre?: string; // titre du panneau (défaut : « Les profils les +/– compatible »)
}

// Blocs « Les + / Les – » : au survol, un panneau s'ouvre en bas-gauche (sous le
// menu, comme celui des barres) et révèle les profils compatibles concrets.
export default function CompatibiliteBlocs({ blocs }: { blocs: CompatibiliteBloc[] }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const current = blocs.find((b) => b.titre === hovered) ?? null;

  // On garde le dernier contenu affiché pendant le fondu de sortie.
  const [shown, setShown] = useState<CompatibiliteBloc | null>(null);
  useEffect(() => {
    if (current) setShown(current);
  }, [current]);

  // On cale le panneau sur le menu collant (mêmes gauche + largeur).
  const [box, setBox] = useState<{ left: number; width: number; top: number } | null>(null);
  useEffect(() => {
    function measure() {
      const nav = document.querySelector('nav[aria-label="Sections"]');
      if (nav) {
        const r = nav.getBoundingClientRect();
        if (r.width > 0) setBox({ left: r.left, width: r.width, top: r.bottom + 16 });
      }
    }
    measure();
    const raf = requestAnimationFrame(measure);
    const t = setTimeout(measure, 300);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure);
    };
  }, []);

  const couleurCur = shown ? (shown.ton === "positif" ? GREEN : RED) : GREEN;

  return (
    <>
      <div className="grid sm:grid-cols-2 gap-5">
        {blocs.map((b) => {
          const positif = b.ton === "positif";
          const couleur = positif ? GREEN : RED;
          const fond = positif ? "rgba(51,164,116,0.08)" : "rgba(214,69,69,0.035)";
          return (
            <div
              key={b.titre}
              onMouseEnter={() => setHovered(b.titre)}
              onMouseLeave={() => setHovered(null)}
              className="rounded-2xl border border-gray-100 p-5 transition-shadow hover:shadow-md cursor-default"
              style={{ background: fond }}
            >
              <h4
                className="inline-block text-sm font-bold mb-3 rounded-full px-4 py-1.5 text-white"
                style={{ background: couleur }}
              >
                {b.titre}
              </h4>
              <ul className="space-y-2">
                {b.items.map((it) => (
                  <li key={it} className="text-sm text-[rgba(0,0,0,0.7)] leading-relaxed flex gap-2">
                    <span style={{ color: couleur }}>{positif ? "+" : "–"}</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Panneau d'explication — bas-gauche, sous le menu (desktop) */}
      <div
        aria-hidden={!current}
        style={
          box
            ? { left: `${box.left}px`, width: `${box.width}px`, top: `${box.top}px` }
            : { left: "1.5rem", top: "8rem" }
        }
        className={`hidden md:block fixed z-40 rounded-2xl border border-gray-100 bg-white shadow-[0_12px_40px_-12px_rgba(0,0,0,0.18)] p-5 transition-all duration-200 ${
          current ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        {shown && (
          <>
            <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: couleurCur }}>
              {shown.panelTitre ??
                (shown.ton === "positif"
                  ? "Les profils les + compatible"
                  : "Les profils les – compatible")}
            </p>
            <ul className="space-y-2.5">
              {shown.profils.map((p, i) => {
                const t = p.code ? getTypeByCode(p.code) : undefined;
                const nom = p.code ? t?.name ?? p.code : p.nom;
                return (
                  <li key={p.code ?? p.nom ?? i} className="text-sm leading-snug">
                    <span className="font-semibold text-[rgba(0,0,0,0.8)]">{nom}</span>
                    {p.code && <span className="text-gray-400"> ({p.code})</span>}
                    <span className="text-gray-600"> — {p.raison}</span>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>
    </>
  );
}
