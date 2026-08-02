"use client";

import { useEffect, useRef } from "react";

/*
  LA CONSTELLATION DES 48 PROFILS — héros de « Notre approche ».
  Les 48 profils (16 types × 3 variantes) répartis en TROIS COUCHES de
  profondeur : les proches sont plus grandes et plus présentes, les
  lointaines petites et estompées. Chaque tuile flotte à son propre rythme,
  et au défilement les couches glissent à des vitesses différentes
  (parallaxe) pendant que l'ensemble se dissout : l'univers s'éloigne quand
  on entre dans la matière. Transform et opacité uniquement (composité GPU),
  positions DÉTERMINISTES (mêmes au serveur et au client, pas d'aléatoire).
  Masquée sous 900 px et en prefers-reduced-motion (le fond reste sobre).
*/

const CODES = [
  "INFP", "ENFP", "INFJ", "ENFJ", "INTP", "ENTP", "INTJ", "ENTJ",
  "ISFP", "ESFP", "ISFJ", "ESFJ", "ISTP", "ESTP", "ISTJ", "ESTJ",
];

type Tuile = {
  code: string;
  variante: number;
  x: number; // % depuis la gauche
  y: number; // % depuis le haut
  taille: number; // px
  couche: 1 | 2 | 3;
  duree: number; // s (flottement)
  delai: number; // s
  rot: number; // deg
  teinte: 1 | 2 | 3; // palette (verte claire / pleine / blanche)
};

/* Positions déterministes par suite dorée : réparties harmonieusement,
   jamais deux fois au même endroit, et STABLES (pas de Math.random). */
const fract = (n: number) => n - Math.floor(n);
const TUILES: Tuile[] = [];
let i = 0;
for (const code of CODES) {
  for (let v = 1; v <= 3; v++) {
    const rx = fract(i * 0.618033 + 0.17);
    const ry = fract(i * 0.754877 + 0.31);
    const rz = fract(i * 0.442249 + 0.53);
    const couche = ((i % 3) + 1) as 1 | 2 | 3;
    /* Les couches proches (1 et 2) restent sur les BANDES latérales pour ne
       jamais gêner le titre ; la couche lointaine (3), très estompée, peut
       occuper tout le champ. */
    const x =
      couche === 3
        ? 4 + rx * 92
        : rx < 0.5
          ? 3 + rx * 2 * 24 // bande gauche : 3 → 27 %
          : 73 + (rx - 0.5) * 2 * 24; // bande droite : 73 → 97 %
    const y = 6 + ry * 82;
    const taille = couche === 1 ? 52 + rz * 14 : couche === 2 ? 40 + rz * 10 : 28 + rz * 8;
    TUILES.push({
      code,
      variante: v,
      x,
      y,
      taille,
      couche,
      duree: 6.5 + rz * 4,
      delai: fract(i * 0.9) * 5,
      rot: (rz - 0.5) * 10,
      teinte: ((i % 3) + 1) as 1 | 2 | 3,
    });
    i++;
  }
}

const STYLE = `
.constel{position:absolute;inset:0;pointer-events:none;will-change:opacity;}
.constel .couche{position:absolute;inset:0;will-change:transform;}
.constel .tuile{position:absolute;border-radius:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;font-weight:700;letter-spacing:0.03em;animation:constel-flotte var(--dur) ease-in-out var(--del) infinite;}
.constel .tuile small{font-weight:500;opacity:0.75;}
.constel .t1{background:rgba(51,164,116,0.12);color:rgb(82,178,137);}
.constel .t2{background:rgb(102,187,151);color:#fff;}
.constel .t3{background:#fff;color:rgb(82,178,137);border:1.5px solid rgba(51,164,116,0.3);}
.constel .c1{opacity:0.55;}
.constel .c2{opacity:0.38;}
.constel .c3{opacity:0.16;filter:blur(0.6px);}
@keyframes constel-flotte{0%,100%{transform:translateY(0) rotate(var(--rot));}50%{transform:translateY(-13px) rotate(var(--rot));}}
@media (max-width:900px){.constel{display:none;}}
@media (prefers-reduced-motion: reduce){.constel .tuile{animation:none;}.constel .couche{transform:none !important;}}
`;

export default function ConstellationProfils() {
  const racineRef = useRef<HTMLDivElement>(null);

  /* Parallaxe au défilement : chaque couche glisse à sa vitesse, l'ensemble
     s'estompe en quittant le héros. Transform + opacité seulement, au rythme
     des frames. */
  useEffect(() => {
    const racine = racineRef.current;
    if (!racine) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const couches = Array.from(racine.querySelectorAll<HTMLElement>(".couche"));
    const vitesses = [-0.16, -0.09, -0.04];
    let raf = 0;
    const maj = () => {
      raf = 0;
      const y = scrollY;
      racine.style.opacity = String(Math.max(0, 1 - y / (innerHeight * 0.85)));
      couches.forEach((c, idx) => {
        c.style.transform = `translateY(${y * vitesses[idx]}px)`;
      });
    };
    const surScroll = () => {
      if (!raf) raf = requestAnimationFrame(maj);
    };
    addEventListener("scroll", surScroll, { passive: true });
    maj();
    return () => {
      removeEventListener("scroll", surScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={racineRef} className="constel" aria-hidden>
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />
      {[1, 2, 3].map((couche) => (
        <div key={couche} className="couche">
          {TUILES.filter((t) => t.couche === couche).map((t) => (
            <span
              key={`${t.code}-${t.variante}`}
              className={`tuile t${t.teinte} c${t.couche}`}
              style={
                {
                  left: `${t.x}%`,
                  top: `${t.y}%`,
                  width: t.taille,
                  height: t.taille,
                  fontSize: t.taille * 0.21,
                  "--dur": `${t.duree}s`,
                  "--del": `${t.delai}s`,
                  "--rot": `${t.rot}deg`,
                } as React.CSSProperties
              }
            >
              {t.code}
              <small style={{ fontSize: t.taille * 0.16 }}>V{t.variante}</small>
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
