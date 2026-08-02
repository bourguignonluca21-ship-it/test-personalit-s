"use client";

import { useEffect, useRef } from "react";
import { ROLES } from "../data/types";

/*
  Points de navigation du hub des 48 personnalités (mêmes codes que la home
  et « Notre approche ») : un point par famille, le point actif rempli,
  clic = glisse ressort. Coordination avec le ressort via « arret-ressort »
  et __glissePageEnCours (une seule animation de page à la fois).
*/

const VERT_MARQUE = "rgba(51,164,116,0.85)";
const PARTIES = [
  { id: "", label: "Haut de page", couleur: VERT_MARQUE },
  { id: "fam-contenu-analystes", label: "Les analystes", couleur: ROLES.analystes.color },
  { id: "fam-diplomates", label: "Les diplomates", couleur: ROLES.diplomates.color },
  { id: "fam-sentinelles", label: "Les sentinelles", couleur: ROLES.sentinelles.color },
  { id: "fam-explorateurs", label: "Les explorateurs", couleur: ROLES.explorateurs.color },
  { id: "hub-final", label: "Faire le test", couleur: VERT_MARQUE },
];

/* Le VERT AMBIANT : la couleur de la famille à l'écran, posée en variable sur
   la page (--vert-ambiant). Les points de droite ET le bouton « Faire le
   test » de la navbar s'y accordent, en fondu, pendant la descente. */
const STYLE = `
.points-hub{position:fixed;right:20px;top:50%;transform:translateY(-50%);z-index:60;display:flex;flex-direction:column;gap:13px;}
/* Un point = un ITEM (le point + son étiquette). L'étiquette vit HORS du
   bouton : sinon le scale(1.45) du survol l'agrandirait avec lui. */
.points-hub .point-item{position:relative;display:flex;align-items:center;justify-content:center;width:11px;height:11px;}
.points-hub button{width:11px;height:11px;border-radius:999px;padding:0;cursor:pointer;background:rgba(255,255,255,0.9);border:1.5px solid var(--vert-ambiant, rgba(51,164,116,0.55));transition:transform .3s cubic-bezier(.22,.9,.3,1),background .5s,border-color .5s;}
.points-hub .point-item:hover button{transform:scale(1.45);}
/* L'ÉTIQUETTE : sur un menu, on doit savoir où mène chaque point. */
.points-hub .etiquette{position:absolute;right:22px;top:50%;white-space:nowrap;font-size:12.5px;font-weight:600;line-height:1;background:rgba(255,255,255,0.94);border-radius:999px;padding:6px 12px;box-shadow:0 8px 24px -12px rgba(0,0,0,0.3);opacity:0;pointer-events:none;transform:translateY(-50%) translateX(8px);transition:opacity .25s ease,transform .25s cubic-bezier(.22,.9,.3,1);}
.points-hub .point-item:hover .etiquette{opacity:1;transform:translateY(-50%) translateX(0);}
@media (prefers-reduced-motion: reduce){.points-hub .etiquette{transition:opacity .01s;}}
.points-hub button.actif{background:var(--vert-ambiant, rgb(82,178,137));border-color:var(--vert-ambiant, rgb(82,178,137));transform:scale(1.4);}
nav a[href="/test"]{background:var(--vert-ambiant, rgba(51,164,116,0.85)) !important;transition:background .6s ease,transform .2s;}
@media (max-width:900px){.points-hub{display:none;}}
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
  if (el.offsetHeight > innerHeight + 40) return Math.min(docH, Math.max(0, top - 70));
  return Math.min(docH, Math.max(0, top + (el.offsetHeight - innerHeight) / 2));
}

export default function NavigationHub() {
  const racineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduit = matchMedia("(prefers-reduced-motion: reduce)").matches;

    function easeGlisse(t: number) { return t * t * t * (t * (t * 6 - 15) + 10); }
    let idAnim = 0;
    function glisser(cible: number) {
      if (reduit) { scrollTo({ top: cible, behavior: "auto" }); return; }
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

    const surClic = (e: MouseEvent) => {
      const item = (e.target as Element | null)?.closest?.("[data-cible]") as HTMLElement | null;
      if (!item) return;
      e.preventDefault();
      glisser(cibleDe(item.dataset.cible || ""));
    };
    const racine = racineRef.current;
    racine?.addEventListener("click", surClic);

    const boutons = Array.from(racine?.querySelectorAll("button") ?? []);
    let raf = 0;
    let ambianceActuelle = "";
    const majActif = () => {
      raf = 0;
      const y = scrollY;
      let actif = 0, meilleure = Infinity;
      PARTIES.forEach((s, i) => {
        const d = Math.abs(cibleDe(s.id) - y);
        if (d < meilleure) { meilleure = d; actif = i; }
      });
      boutons.forEach((b, i) => b.classList.toggle("actif", i === actif));
      /* le vert ambiant suit la famille à l'écran */
      const couleur = PARTIES[actif].couleur;
      if (couleur !== ambianceActuelle) {
        ambianceActuelle = couleur;
        document.documentElement.style.setProperty("--vert-ambiant", couleur);
      }
    };
    const surScroll = () => { if (!raf) raf = requestAnimationFrame(majActif); };
    addEventListener("scroll", surScroll, { passive: true });
    majActif();

    return () => {
      racine?.removeEventListener("click", surClic);
      removeEventListener("scroll", surScroll);
      cancelAnimationFrame(idAnim);
      cancelAnimationFrame(raf);
      document.documentElement.style.removeProperty("--vert-ambiant");
    };
  }, []);

  return (
    <div ref={racineRef} className="points-hub">
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />
      {PARTIES.map((s) => (
        <div key={s.id || "haut"} className="point-item">
          <button type="button" data-cible={s.id} aria-label={`Aller à : ${s.label}`} />
          <span className="etiquette" aria-hidden style={{ color: s.couleur }}>
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}
