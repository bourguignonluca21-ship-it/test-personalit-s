"use client";

import { useEffect, useState } from "react";
import type { SpectreAxe } from "../data/moteur";

const GREEN = "rgba(51,164,116,0.85)";

const LETTRE_LABEL: Record<string, string> = {
  E: "Extraverti",
  I: "Introverti",
  N: "Intuitif",
  S: "Observateur",
  F: "Sensible",
  T: "Rationnel",
  P: "Prospectif",
  J: "Organisé",
};

const AXE_GROUPE: Record<string, string> = {
  EI: "Esprit",
  SN: "Énergie",
  TF: "Nature",
  JP: "Tactique",
};

// Description du trait dominant (par pôle), affichée au survol.
const DESCRIPTIONS: Record<string, string> = {
  I: "Les personnes Introverties rechargent leurs batteries dans le calme. Elles privilégient quelques relations profondes plutôt que beaucoup de contacts, et les ambiances trop agitées finissent par les vider.",
  E: "Les personnes Extraverties puisent leur énergie dans l'action et le contact. Elles aiment être entourées, penser à voix haute et se nourrir de l'échange ; trop de solitude les ennuie vite.",
  N: "Les personnes Intuitives vivent dans les idées, les possibles et le sens. Elles regardent au-delà du concret, font des liens inattendus et sont attirées par l'original et le futur.",
  S: "Les personnes Observatrices se fient au concret, au tangible et à l'éprouvé. Elles observent les faits, vivent dans le présent et préfèrent le pratique aux théories.",
  F: "Les personnes Sensibles décident avec le cœur, guidées par leurs valeurs et l'émotion. L'empathie, l'harmonie et l'authenticité comptent plus pour elles que la pure logique.",
  T: "Les personnes Rationnelles décident avec la tête, en cherchant cohérence et efficacité. Elles se fient aux faits et à la logique, même quand c'est inconfortable.",
  P: "Les personnes Prospectives aiment garder leurs options ouvertes et suivre leurs élans. Souplesse, spontanéité et improvisation leur vont mieux que les plans rigides.",
  J: "Les personnes Organisées aiment la clarté, les plans et les choses décidées. Elles structurent, anticipent, et se sentent bien quand tout est cadré.",
};

export default function SpectreInteractif({ axes, isPaid = true }: { axes: SpectreAxe[]; isPaid?: boolean }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const current = axes.find((x) => x.axe === hovered) ?? null;

  // On garde le dernier contenu affiché pendant le fondu de sortie (sinon il disparaît d'un coup).
  const [shown, setShown] = useState<SpectreAxe | null>(null);
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
      <table className="w-full border-collapse mb-8">
        <tbody>
          {axes.map((a) => {
            const dominantBas = a.lettre === a.poleBas;
            const domLabel = LETTRE_LABEL[a.lettre];
            const otherLabel = LETTRE_LABEL[dominantBas ? a.poleHaut : a.poleBas];
            const dom = a.pctDominant;
            return (
              <tr
                key={a.axe}
                onMouseEnter={() => setHovered(a.axe)}
                onMouseLeave={() => setHovered(null)}
                className="border-b border-gray-100 last:border-0 transition-colors hover:bg-gray-50/70"
              >
                <td className="py-5 px-2 align-middle w-full">
                  <div className="text-center mb-1.5 whitespace-nowrap">
                    <span className="text-sm font-bold" style={{ color: GREEN }}>
                      {dom}%
                    </span>{" "}
                    <span className="text-sm font-semibold text-[rgba(0,0,0,0.75)]">{AXE_GROUPE[a.axe]}</span>
                  </div>
                  <div className="flex h-2.5 rounded-full overflow-hidden bg-gray-100">
                    <div style={{ width: `${dom}%`, background: GREEN }} />
                    <div style={{ width: `${100 - dom}%`, background: "#e9eaec" }} />
                  </div>
                  <div className="flex items-center justify-between text-sm mt-1.5">
                    <span className="font-semibold text-[rgba(0,0,0,0.75)]">{domLabel}</span>
                    <span className="text-gray-400">{otherLabel}</span>
                  </div>
                </td>
              </tr>
            );
          })}
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
              {AXE_GROUPE[shown.axe]} · <span style={{ color: GREEN }}>{shown.pctDominant}%</span>{" "}
              {LETTRE_LABEL[shown.lettre]}
            </p>
            {isPaid ? (
              <p className="text-sm text-gray-600 leading-relaxed">{DESCRIPTIONS[shown.lettre]}</p>
            ) : (
              <div className="relative">
                <p aria-hidden="true" className="text-sm text-gray-600 leading-relaxed blur-[4px] select-none">
                  {DESCRIPTIONS[shown.lettre]}
                </p>
                {/* Cadenas vert centré sur le flou */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg width="52" height="52" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="5" y="11" width="14" height="9" rx="2" fill={GREEN} />
                    <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke={GREEN} strokeWidth="2" strokeLinecap="round" />
                    <circle cx="12" cy="15.3" r="1.4" fill="white" />
                  </svg>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
