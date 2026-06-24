"use client";

import { useEffect, useRef, useState } from "react";

const GREEN = "rgba(51,164,116,0.85)";

// Table des matières du profil, dans l'ordre du scroll. `anchor` = data-prog du repère
// invisible posé devant le bloc correspondant dans la page (révélation pile au bon endroit).
// `lead` = ligne d'ouverture de section. `locked` : false = gratuit (coche), true = payant (cadenas).
type Entry = { label: string; locked: boolean; anchor: string; lead?: boolean };
const ENTRIES: Entry[] = [
  { label: "Tes traits de personnalité", locked: false, lead: true, anchor: "spectrum" },
  { label: "La description de tes 4 axes", locked: true, anchor: "apercu-traits" },

  { label: "Tes variantes", locked: false, lead: true, anchor: "var-bars" },
  { label: "La description de tes variantes", locked: true, anchor: "var-text" },
  { label: "Tes points forts / faibles", locked: false, anchor: "var-points" },
  { label: "Ton paradoxe central", locked: true, anchor: "var-paradoxe" },

  { label: "Tes relations", locked: false, lead: true, anchor: "apercu-relations" },
  { label: "Tes points forts / faibles", locked: false, anchor: "relations-points" },
  { label: "Ce qui est toxique pour toi", locked: true, anchor: "relations-blocs" },
  { label: "Ce qui te réussit", locked: true, anchor: "relations-blocs" },
  { label: "Les profils les moins compatibles", locked: true, anchor: "relations-compat" },
  { label: "Les profils les plus compatibles", locked: true, anchor: "relations-compat" },
  { label: "Ton paradoxe amoureux", locked: true, anchor: "relations-paradoxe" },

  { label: "Ta vie professionnelle", locked: false, lead: true, anchor: "apercu-carriere" },
  { label: "Tes points forts / faibles", locked: false, anchor: "carriere-points" },
  { label: "Ce qui t'éteint", locked: true, anchor: "carriere-blocs" },
  { label: "Ce qui te booste", locked: true, anchor: "carriere-blocs" },
  { label: "Les environnements à éviter", locked: true, anchor: "carriere-compat" },
  { label: "Les métiers faits pour toi", locked: true, anchor: "carriere-compat" },
  { label: "Ton paradoxe professionnel", locked: true, anchor: "carriere-paradoxe" },

  { label: "Ton mindset et ton développement", locked: false, lead: true, anchor: "apercu-developpement" },
  { label: "Comment tu évolues", locked: true, anchor: "developpement-evolution" },
  { label: "Ton évolution à chaque âge", locked: true, anchor: "developpement-ages" },
  { label: "Tes leviers forts", locked: true, anchor: "developpement-leviers" },
  { label: "Les questions à te poser", locked: true, anchor: "developpement-questions" },
  { label: "Ton paradoxe", locked: true, anchor: "developpement-paradoxe" },
];

function CheckIcon() {
  return (
    <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: GREEN }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 13l4 4L19 7" />
      </svg>
    </span>
  );
}

function LockIcon() {
  return (
    <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "rgba(51,164,116,0.12)" }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="5" y="11" width="14" height="9" rx="2" fill={GREEN} />
        <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke={GREEN} strokeWidth="2" />
      </svg>
    </span>
  );
}

// Panneau de progression (droite, desktop xl) : chaque ligne apparaît exactement quand son bloc
// atteint l'écran (repères data-prog dans la page). Coche = gratuit, cadenas = payant.
export default function ProgressionMenu({ isPaid = false }: { isPaid?: boolean }) {
  const [revealed, setRevealed] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const [thumb, setThumb] = useState({ top: 0, height: 0, show: false });

  // Curseur de scroll custom (le natif n'anime pas sa largeur) : on calcule sa taille/position.
  function updateThumb() {
    const el = cardRef.current;
    if (!el) return;
    const vh = el.clientHeight;
    const sh = el.scrollHeight;
    if (sh <= vh + 1) {
      setThumb((t) => (t.show ? { ...t, show: false } : t));
      return;
    }
    const pad = 8;
    const track = vh - pad * 2;
    const h = Math.max(28, track * (vh / sh));
    const maxScroll = sh - vh;
    const top = pad + (maxScroll ? (el.scrollTop / maxScroll) * (track - h) : 0);
    setThumb({ top, height: h, show: true });
  }

  // Le panneau a une hauteur max : on le fait défiler pour garder la dernière ligne révélée visible.
  // On rescrolle après l'animation de dépliage (la hauteur finale n'est pas atteinte tout de suite).
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
    updateThumb();
    const t = setTimeout(() => {
      el.scrollTop = el.scrollHeight;
      updateThumb();
    }, 560);
    return () => clearTimeout(t);
  }, [revealed]);

  // Mise à jour du curseur au montage et au redimensionnement.
  useEffect(() => {
    updateThumb();
    window.addEventListener("resize", updateThumb);
    return () => window.removeEventListener("resize", updateThumb);
  }, []);

  useEffect(() => {
    function onScroll() {
      const offset = window.innerHeight * 0.8;
      let count = 0;
      ENTRIES.forEach((e, i) => {
        const el = document.querySelector(`[data-prog="${e.anchor}"]`);
        if (el && el.getBoundingClientRect().top - offset <= 0) count = i + 1;
      });
      // Apparaît au même seuil que le menu de gauche (scroll > 80), avec au moins la 1re ligne.
      const visible = window.scrollY > 80;
      setRevealed(visible ? Math.max(1, count) : 0);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const t = setTimeout(onScroll, 300);
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <nav
      aria-label="Ton résumé"
      className="sticky top-24 mt-10 w-56 transition-opacity duration-500"
      style={{ opacity: revealed > 0 ? 1 : 0 }}
    >
      <style>{".pm-scroll{scrollbar-width:none}.pm-scroll::-webkit-scrollbar{display:none}.pm-thumb{width:4px;background:rgba(51,164,116,0.85);transition:width .25s ease,background .25s ease}.pm-wrap:hover .pm-thumb{width:7px;background:rgba(51,164,116,1)}"}</style>
      <div className="pm-wrap relative">
      <div
        ref={cardRef}
        onScroll={updateThumb}
        className="pm-scroll rounded-2xl border border-gray-100 bg-white shadow-[0_8px_30px_-12px_rgba(0,0,0,0.15)] p-4 max-h-[calc(100vh-7rem)] overflow-y-auto scroll-smooth"
      >
        <p className="text-xs font-bold tracking-wide text-[rgba(0,0,0,0.55)] mb-3">Ton résumé</p>
        <ul>
          {ENTRIES.map((e, i) => {
            const open = i < revealed;
            const verrouille = e.locked && !isPaid;
            return (
              <li
                key={`${e.label}-${i}`}
                className="grid transition-all duration-500"
                style={{
                  gridTemplateRows: open ? "1fr" : "0fr",
                  opacity: open ? 1 : 0,
                  transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
                }}
              >
                <div className="overflow-hidden min-h-0">
                  <div className={`flex items-start gap-2.5 pb-2.5 ${e.lead && i > 0 ? "pt-4" : ""}`}>
                    {verrouille ? <LockIcon /> : <CheckIcon />}
                    <span
                      className={
                        e.lead
                          ? "text-sm leading-snug font-semibold text-[rgba(0,0,0,0.55)]"
                          : verrouille
                            ? "text-sm leading-snug text-gray-400"
                            : "text-sm leading-snug font-medium text-[rgba(0,0,0,0.6)]"
                      }
                    >
                      {e.label}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      {thumb.show && (
        <div
          className="pm-thumb absolute right-1.5 rounded-full"
          style={{ top: thumb.top, height: thumb.height, pointerEvents: "none" }}
        />
      )}
      </div>
    </nav>
  );
}
