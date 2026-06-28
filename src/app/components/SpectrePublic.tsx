"use client";

import { useEffect, useRef, useState } from "react";
import type { SpectreAxe } from "../data/moteur";

const GREEN = "rgba(51,164,116,0.85)";

const AXE_GROUPE: Record<string, string> = { EI: "Esprit", SN: "Énergie", TF: "Nature", JP: "Tactique" };
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

// Mini-portrait du pôle DOMINANT, décliné par intensité (léger / modéré / fort).
// Voix neutre, énoncé général « Les personnes [pôle]… » (page de profil partagée).
// Le panneau choisit le texte selon le pôle dominant de l'axe (a.lettre) et son
// intensité (a.intensite). 8 pôles × 3 intensités → couvre les 48 fiches de partage.
const POLE_PORTRAIT: Record<string, Record<SpectreAxe["intensite"], string>> = {
  // ESPRIT
  I: {
    léger:
      "Les personnes introverties ont besoin de calme pour se retrouver, mais le monde ne les épuise pas pour autant. Une soirée entre amis les recharge presque autant qu'un moment seules, du moment qu'elles peuvent souffler ensuite.",
    modéré:
      "Les personnes introverties rechargent leurs batteries dans le calme, pas dans la foule. Elles préfèrent une vraie conversation à dix bavardages, et après une journée dense, ont besoin de se retrouver seules pour se reposer vraiment.",
    fort: "Pour les personnes introverties, le silence est un carburant. Les grands groupes les vident vite, et c'est seules, au calme, que leurs idées viennent et que tout se remet en place.",
  },
  E: {
    léger:
      "Les personnes extraverties aiment être entourées sans en avoir un besoin vital. Elles vont volontiers vers les autres, puis savent s'éclipser pour récupérer un peu de calme quand la batterie baisse.",
    modéré:
      "Les personnes extraverties prennent leur énergie dans le contact et l'action. Elles pensent souvent à voix haute, se sentent vivantes quand ça bouge autour, et une journée trop solitaire finit par leur peser.",
    fort: "Les personnes extraverties carburent à la présence des autres. Le monde est leur terrain de jeu, l'échange les booste, et rester seules trop longtemps leur pèse vite.",
  },
  // ÉNERGIE
  N: {
    léger:
      "Les personnes intuitives gardent un œil sur le concret, mais leur esprit file vite vers les idées et les possibles. Elles aiment imaginer ce qui pourrait être, sans perdre tout à fait le sens pratique.",
    modéré:
      "Les personnes intuitives vivent surtout dans les idées et le sens. Elles font des liens que d'autres ne voient pas, s'attachent au pourquoi plus qu'au comment, et préfèrent l'original au déjà-vu.",
    fort: "Les personnes intuitives vivent la tête dans les possibles. Les idées et ce qui n'existe pas encore les passionnent bien plus que les détails du quotidien, qu'elles ont tendance à survoler.",
  },
  S: {
    léger:
      "Les personnes observatrices gardent les pieds sur terre, mais savent lever la tête vers une idée quand elle est solide. Elles préfèrent ce qui marche à ce qui pourrait marcher.",
    modéré:
      "Les personnes observatrices se fient au concret, au tangible, à l'éprouvé. Elles vivent dans le présent, font confiance à l'expérience plus qu'aux théories, et préfèrent les faits aux suppositions.",
    fort: "Les personnes observatrices sont ancrées dans le réel. Ce qui compte, c'est ce qui se voit, se touche et a déjà fait ses preuves. Les grandes théories abstraites les intéressent peu.",
  },
  // NATURE
  F: {
    léger:
      "Les personnes sensibles décident avec le cœur, sans perdre la tête. L'émotion et les valeurs pèsent dans leurs choix, mais elles savent aussi écouter la logique quand il le faut.",
    modéré:
      "Les personnes sensibles tranchent avec le cœur, guidées par leurs valeurs et ce qu'elles ressentent. L'empathie et l'harmonie comptent beaucoup pour elles, parfois plus que d'avoir raison.",
    fort: "Pour les personnes sensibles, le cœur passe d'abord, toujours. Leurs émotions et leurs valeurs guident chaque décision, l'harmonie leur est vitale, et une logique froide qui blesse ne les convaincra jamais.",
  },
  T: {
    léger:
      "Les personnes rationnelles raisonnent avec la tête, sans ignorer l'humain. Elles cherchent la cohérence, mais savent tenir compte des sentiments quand ça compte.",
    modéré:
      "Les personnes rationnelles décident avec la tête, en cherchant cohérence et efficacité. Elles se fient aux faits et à la logique, et préfèrent une vérité utile à une parole qui fait juste plaisir.",
    fort: "Pour les personnes rationnelles, la logique passe avant tout. Les faits, la cohérence et l'efficacité priment, même quand ça dérange, et les arguments purement émotionnels les laissent de marbre.",
  },
  // TACTIQUE
  P: {
    léger:
      "Les personnes prospectives aiment garder leurs options ouvertes, tout en posant quelques repères. Elles improvisent volontiers, mais savent s'organiser quand l'enjeu le demande.",
    modéré:
      "Les personnes prospectives préfèrent garder leurs options ouvertes et suivre leurs élans. La souplesse et la spontanéité leur vont mieux que les plans rigides, et l'imprévu ne leur fait pas peur.",
    fort: "Les personnes prospectives sont allergiques aux plans figés. Elles décident au dernier moment, suivent l'inspiration du jour, et c'est dans la liberté et l'imprévu qu'elles donnent le meilleur.",
  },
  J: {
    léger:
      "Les personnes organisées aiment quand les choses sont cadrées, sans s'interdire un écart. Elles planifient volontiers, mais peuvent lâcher le plan si la situation le demande.",
    modéré:
      "Les personnes organisées aiment la clarté, les plans et les choses décidées. Elles structurent, anticipent, et se sentent bien quand tout est en ordre plutôt que laissé au hasard.",
    fort: "Les personnes organisées ont besoin que tout soit carré. Les plans, les listes et les décisions prises d'avance les rassurent, l'imprévu les agace, et c'est dans l'ordre et l'anticipation qu'elles se sentent à leur place.",
  },
};

// Texte du mini-portrait pour un axe donné (pôle dominant + intensité).
function portraitAxe(a: SpectreAxe): string {
  return POLE_PORTRAIT[a.lettre]?.[a.intensite] ?? "";
}

// Position de chaque panneau dans la marge, calé sur une MOITIÉ de la carte :
// 0 = haut-gauche, 1 = bas-gauche, 2 = haut-droite, 3 = bas-droite.
const PANEL_POS = [
  "right-full top-0 mr-7",
  "left-full top-0 ml-7",
  "right-full bottom-0 mr-7",
  "left-full bottom-0 ml-7",
];

export default function SpectrePublic({ spectre }: { spectre: SpectreAxe[] }) {
  const [vis, setVis] = useState({ top: false, bot: false });
  const [open, setOpen] = useState<string | null>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Apparition au scroll (comme à l'origine) : paire du HAUT dès ~1 cm de descente, paire du
  // BAS dès ~3 cm. Disparition : dès que la section « Ses variantes » atteint le 1/3 haut du
  // viewport, les panneaux ressortent en fondu. Réversible dans les deux sens.
  useEffect(() => {
    function onScroll() {
      const vh = window.innerHeight;
      const vTop = document.getElementById("ses-variantes")?.getBoundingClientRect().top ?? Infinity;
      // Disparition quand « Ses variantes » arrive à 2/5 du bas (soit 3/5 depuis le haut).
      const avantVariantes = vTop > vh * (3 / 5);
      setVis({
        top: window.scrollY > 38 && avantVariantes,
        bot: window.scrollY > 113 && avantVariantes,
      });
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const id = setTimeout(onScroll, 300);
    return () => {
      clearTimeout(id);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="relative mt-10 px-1 md:px-2 py-6">
      <h2 className="text-lg font-bold mb-6 text-[rgba(0,0,0,0.75)]">
        <span className="mr-1" style={{ color: GREEN }}>1.</span>Ses traits de personnalité
      </h2>

      <div className="space-y-5">
        {spectre.map((a, idx) => {
          const dominantBas = a.lettre === a.poleBas;
          const domLabel = LETTRE_LABEL[a.lettre];
          const otherLabel = LETTRE_LABEL[dominantBas ? a.poleHaut : a.poleBas];
          const dom = a.pctDominant;
          return (
            <div
              key={a.axe}
              data-axe={a.axe}
              ref={(el) => {
                rowRefs.current[idx] = el;
              }}
            >
              <div className="flex items-center justify-center gap-1.5 mb-1.5 whitespace-nowrap">
                <span className="text-sm font-bold" style={{ color: GREEN }}>
                  {dom}%
                </span>
                <span className="text-sm font-semibold text-[rgba(0,0,0,0.75)]">{AXE_GROUPE[a.axe]}</span>
                <button
                  type="button"
                  onClick={() => setOpen(open === a.axe ? null : a.axe)}
                  aria-label={`Comprendre la dimension ${AXE_GROUPE[a.axe]}`}
                  className="ml-0.5 w-5 h-5 inline-flex items-center justify-center rounded-full text-xs font-bold bg-[rgba(51,164,116,0.09)] xl:hidden"
                  style={{ color: GREEN }}
                >
                  ?
                </button>
              </div>
              <div className="flex h-2.5 rounded-full overflow-hidden bg-gray-100">
                <div style={{ width: `${dom}%`, background: GREEN }} />
                <div style={{ width: `${100 - dom}%`, background: "#e9eaec" }} />
              </div>
              <div className="flex items-center justify-between text-sm mt-1.5">
                <span className="text-gray-400">{domLabel}</span>
                <span className="text-gray-400">{otherLabel}</span>
              </div>

              {/* Repli mobile / tablette (pas de marge pour un panneau) : accordéon au clic. */}
              {open === a.axe && (
                <div className="xl:hidden mt-3 rounded-2xl p-4" style={{ background: "rgba(51,164,116,0.06)" }}>
                  <p className="text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: GREEN }}>
                    {AXE_GROUPE[a.axe]} · {LETTRE_LABEL[a.lettre]} {Math.round(a.pctDominant)}%
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">{portraitAxe(a)}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Panneaux dans les marges (desktop large) : chacun fait la moitié de la hauteur de la carte
          et se révèle en douceur au scroll, puis reste affiché. */}
      {spectre.map((a, i) => {
        const actif = i < 2 ? vis.top : vis.bot;
        return (
          <div
            key={a.axe}
            aria-hidden={!actif}
            className={`hidden xl:block absolute ${PANEL_POS[i]} w-60 h-[calc(50%-7px)] transition-all duration-1000 ease-out ${
              actif ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
            }`}
          >
            <div className="h-full rounded-2xl bg-white border border-gray-100 shadow-[0_14px_45px_-14px_rgba(0,0,0,0.22)] p-5 flex flex-col justify-center">
              <p className="text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: GREEN }}>
                {AXE_GROUPE[a.axe]} · {LETTRE_LABEL[a.lettre]} {Math.round(a.pctDominant)}%
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">{portraitAxe(a)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
