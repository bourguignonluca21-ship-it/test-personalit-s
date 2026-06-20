"use client";

import { useEffect, useState } from "react";

const GREEN = "rgba(51,164,116,0.85)";

export interface VarianteItem {
  cle: string; // "V1" | "V2" | "V3"
  nom: string; // "Poète"
  pct: number; // part relative
  dominant: boolean; // variante dominante de l'utilisateur
  description: string; // texte affiché au survol
}

// Tableau des 3 variantes — même DA que les traits (barres vertes pleines),
// + panneau d'explication qui s'ouvre au survol, calé sous le menu (desktop).
export default function VarianteInteractif({ variantes }: { variantes: VarianteItem[] }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const current = variantes.find((x) => x.cle === hovered) ?? null;

  // On garde le dernier contenu affiché pendant le fondu de sortie.
  const [shown, setShown] = useState<VarianteItem | null>(null);
  useEffect(() => {
    if (current) setShown(current);
  }, [current]);

  // On cale le panneau exactement sur le menu collant (mêmes gauche + largeur).
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

  return (
    <>
      <table className="w-full border-collapse mb-2">
        <tbody>
          {variantes.map((va) => (
            <tr
              key={va.cle}
              onMouseEnter={() => setHovered(va.cle)}
              onMouseLeave={() => setHovered(null)}
              className="border-b border-gray-100 last:border-0 transition-colors hover:bg-gray-50/70"
            >
              <td className="py-5 px-2 align-middle w-full">
                <div className="text-center mb-1.5 whitespace-nowrap">
                  <span className="text-sm font-bold" style={{ color: GREEN }}>
                    {va.pct}%
                  </span>{" "}
                  <span className="text-sm font-semibold text-[rgba(0,0,0,0.75)]">{va.nom}</span>
                  {va.dominant && (
                    <span className="text-xs font-semibold ml-2" style={{ color: GREEN }}>
                      · ta variante
                    </span>
                  )}
                </div>
                <div className="flex h-2.5 rounded-full overflow-hidden bg-gray-100">
                  <div style={{ width: `${va.pct}%`, background: GREEN }} />
                  <div style={{ width: `${100 - va.pct}%`, background: "#e9eaec" }} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
            <p className="text-xs font-bold uppercase tracking-wide mb-1.5 text-[rgba(0,0,0,0.75)]">
              <span style={{ color: GREEN }}>{shown.pct}%</span> · {shown.nom}
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">{shown.description}</p>
          </>
        )}
      </div>
    </>
  );
}
