"use client";

import { useEffect, useRef } from "react";

/*
  NAVIGATION DE « NOTRE APPROCHE » :
  1. Les points sur le bord droit (mêmes codes que la home) : un point par
     partie, le point actif rempli, clic = glisse ressort jusqu'à la partie.
  2. Le sommaire du héros : les éléments portant [data-cible] (les chapitres)
     déclenchent la même glisse au clic (écouteur délégué).
  La glisse est LA MÊME que le ressort (courbe, durée, coordination via
  « arret-ressort » et __glissePageEnCours : jamais deux animations en même
  temps). Masqué sous 900 px, respect de prefers-reduced-motion.
*/

const PARTIES = [
  { id: "", label: "Haut de page" },
  { id: "na-histoire", label: "L'histoire" },
  { id: "na-debat", label: "Types ou traits" },
  { id: "na-methode", label: "La méthode" },
  { id: "na-ia", label: "L'IA" },
  { id: "na-limites", label: "Les limites" },
  { id: "na-principes", label: "Les principes" },
  { id: "na-final", label: "Faire le test" },
];

const STYLE = `
.points-na{position:fixed;right:20px;top:50%;transform:translateY(-50%);z-index:60;display:flex;flex-direction:column;gap:13px;}
.points-na button{width:11px;height:11px;border-radius:999px;padding:0;cursor:pointer;background:rgba(255,255,255,0.9);border:1.5px solid rgba(51,164,116,0.55);transition:transform .3s cubic-bezier(.22,.9,.3,1),background .3s,border-color .3s;}
.points-na button:hover{transform:scale(1.45);}
.points-na button.actif{background:rgb(82,178,137);border-color:rgb(82,178,137);transform:scale(1.4);}
@media (max-width:900px){.points-na{display:none;}}
`;

function topPage(el: HTMLElement): number {
  let t = 0;
  let n: HTMLElement | null = el;
  while (n) { t += n.offsetTop; n = n.offsetParent as HTMLElement | null; }
  return t;
}

function cibleDe(id: string): number {
  const docH = document.documentElement.scrollHeight - innerHeight;
  if (!id) return 0;
  const el = document.getElementById(id);
  if (!el) return 0;
  const top = topPage(el);
  /* Chapitre 1 : même atterrissage que le ressort (titre à 80-4 = 76 px) */
  if (id === "na-histoire") return Math.min(docH, Math.max(0, top + 4));
  if (el.offsetHeight > innerHeight + 40) return Math.min(docH, Math.max(0, top - 70));
  return Math.min(docH, Math.max(0, top + (el.offsetHeight - innerHeight) / 2));
}

export default function NavigationApproche() {
  const racineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduit = matchMedia("(prefers-reduced-motion: reduce)").matches;

    function easeGlisse(t: number) { return t * t * t * (t * (t * 6 - 15) + 10); }
    let idAnim = 0;
    function glisser(cible: number) {
      if (reduit) { scrollTo({ top: cible, behavior: "auto" }); return; }
      /* on coupe une éventuelle glisse du ressort et on prend la main */
      window.dispatchEvent(new Event("arret-ressort"));
      (window as unknown as { __glissePageEnCours?: boolean }).__glissePageEnCours = true;
      cancelAnimationFrame(idAnim);
      const racine = document.documentElement;
      const avant = racine.style.scrollBehavior;
      racine.style.scrollBehavior = "auto";
      const depart = scrollY, delta = cible - depart, t0 = performance.now();
      const D = Math.min(1600, 900 + Math.abs(delta) * 0.35);
      const pas = (t: number) => {
        const p = Math.min(1, (t - t0) / D);
        scrollTo(0, depart + delta * easeGlisse(p));
        if (p < 1) idAnim = requestAnimationFrame(pas);
        else {
          racine.style.scrollBehavior = avant;
          setTimeout(() => {
            (window as unknown as { __glissePageEnCours?: boolean }).__glissePageEnCours = false;
            window.dispatchEvent(new Event("fin-glisse-page"));
          }, 160);
        }
      };
      idAnim = requestAnimationFrame(pas);
    }

    /* Le sommaire du héros : écouteur délégué sur [data-cible] */
    const surClicSommaire = (e: MouseEvent) => {
      const item = (e.target as Element | null)?.closest?.("[data-cible]") as HTMLElement | null;
      if (!item) return;
      e.preventDefault();
      glisser(cibleDe(item.dataset.cible || ""));
    };
    document.addEventListener("click", surClicSommaire);

    /* Le point actif suit la position */
    const boutons = Array.from(racineRef.current?.querySelectorAll("button") ?? []);
    let raf = 0;
    const majActif = () => {
      raf = 0;
      const y = scrollY;
      let actif = 0, meilleure = Infinity;
      PARTIES.forEach((s, i) => {
        const d = Math.abs(cibleDe(s.id) - y);
        if (d < meilleure) { meilleure = d; actif = i; }
      });
      boutons.forEach((b, i) => b.classList.toggle("actif", i === actif));
    };
    const surScroll = () => { if (!raf) raf = requestAnimationFrame(majActif); };
    addEventListener("scroll", surScroll, { passive: true });
    majActif();

    return () => {
      document.removeEventListener("click", surClicSommaire);
      removeEventListener("scroll", surScroll);
      cancelAnimationFrame(idAnim);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={racineRef} className="points-na">
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />
      {PARTIES.map((s) => (
        <button key={s.id || "haut"} type="button" data-cible={s.id} aria-label={`Aller à : ${s.label}`} />
      ))}
    </div>
  );
}
