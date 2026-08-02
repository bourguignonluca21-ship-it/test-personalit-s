"use client";

import { useEffect } from "react";

/*
  LE RESSORT, version réutilisable (mêmes réglages que la home) : un geste de
  molette = une glisse douce jusqu'à l'arrêt suivant (et pareil en remontant).
  Usage dans une page : <RessortDefilement arrets={[{ selecteur: "#mon-bloc" }]} />
  Le haut (0) et le bas de page sont TOUJOURS des arrêts, pas besoin de les passer.
  alignement "centre" (défaut) : l'élément est centré à l'écran, comme les actes
  de la home. alignement "haut" : son haut est calé sous la navbar (marge en px).
  Comme sur la home : souris fine + écran > 900 px seulement, respect de
  prefers-reduced-motion, et on laisse tranquilles les zones qui défilent
  elles-mêmes verticalement (fenêtres, listes internes).
  La home garde son propre ressort : ne PAS monter ce composant sur la home.
*/

type Arret = { selecteur: string; alignement?: "centre" | "haut"; marge?: number };

export default function RessortDefilement({ arrets }: { arrets: Arret[] }) {
  const cle = JSON.stringify(arrets);

  useEffect(() => {
    const reduit = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const actif = !reduit && matchMedia("(pointer:fine)").matches && innerWidth > 900;
    if (!actif) return;

    const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
    const liste: Arret[] = JSON.parse(cle);
    let points: number[] = [];
    let anim = false;

    /* Position d'un élément dans la page en MISE EN PAGE PURE (offsetTop
       cumulés) : contrairement à getBoundingClientRect, elle IGNORE les
       transformations en cours (les blocs d'apparition sont décalés de
       44 px tant qu'ils ne sont pas révélés) → cibles STABLES, identiques
       quel que soit le moment où on mesure. C'était la cause des
       atterrissages qui variaient « par moments ». */
    function topPage(el: HTMLElement): number {
      let t = 0;
      let n: HTMLElement | null = el;
      while (n) {
        t += n.offsetTop;
        n = n.offsetParent as HTMLElement | null;
      }
      return t;
    }
    function cibleDe(a: Arret): number | null {
      const el = document.querySelector<HTMLElement>(a.selecteur);
      if (!el) return null;
      const top = topPage(el);
      const docH = document.documentElement.scrollHeight - innerHeight;
      if (a.alignement === "haut") return clamp(top - (a.marge ?? 80), 0, docH);
      /* Un bloc VRAIMENT plus haut que l'écran ne se centre pas (son haut
         serait coupé sous la navbar) : il se cale en haut, à 70 px. Un bloc
         d'exactement un écran (100svh), lui, se centre normalement. */
      if (el.offsetHeight > innerHeight + 40) return clamp(top - 70, 0, docH);
      return clamp(top + (el.offsetHeight - innerHeight) / 2, 0, docH);
    }
    function mesurer() {
      const docH = document.documentElement.scrollHeight - innerHeight;
      type P = { pos: number; centre: boolean; bas?: boolean };
      const bruts: P[] = [{ pos: 0, centre: false }];
      for (const arret of liste) {
        const c = cibleDe(arret);
        if (c != null) bruts.push({ pos: c, centre: (arret.alignement ?? "centre") === "centre" });
      }
      bruts.push({ pos: docH, centre: false, bas: true });
      bruts.sort((x, y) => x.pos - y.pos);
      /* FUSION : elle ne concerne QUE le bas de page implicite. Deux vraies
         sections déclarées restent TOUJOURS deux arrêts distincts (sinon,
         en remontant depuis la dernière, on sauterait la précédente).
         Le bas de page, lui, est fusionné quand il est trop proche du
         dernier arrêt : absorbé par un arrêt CENTRÉ (la section reste posée
         au milieu de l'écran), ou il remplace un arrêt calé « haut » (une
         seule glisse qui pose bien le bas de page et la flèche remonter). */
      const seuil = Math.max(160, innerHeight * 0.45);
      const gardes: P[] = [];
      for (const p of bruts) {
        if (!gardes.length) { gardes.push(p); continue; }
        const dernier = gardes[gardes.length - 1];
        if (p.pos - dernier.pos <= 8) {
          // quasi confondus : on garde la vraie section plutôt que le bas
          if (dernier.bas && !p.bas) gardes[gardes.length - 1] = p;
          continue;
        }
        if (p.bas && p.pos - dernier.pos < seuil && dernier.pos !== 0 && !dernier.centre) {
          // arrêt calé « haut » proche du bas : le bas le remplace (une seule
          // glisse qui pose bien le bas de page et la flèche remonter)
          gardes[gardes.length - 1] = p;
        } else gardes.push(p);
        // (un arrêt CENTRÉ garde toujours le bas de page comme arrêt suivant :
        // depuis l'espace partenaire, un geste de plus = glisse jusqu'en bas)
      }
      points = gardes.map((p) => p.pos);
    }

    function easeGlisse(t: number) { return t * t * t * (t * (t * 6 - 15) + 10); }
    /* COORDINATION : une seule animation de page à la fois. Les autres
       glisses du site (descente au clic sur un bloc de menu, pastille
       « remonter ») posent le drapeau __glissePageEnCours et émettent
       « arret-ressort » pour couper net une glisse du ressort en cours :
       jamais deux animations qui se battent pour le scroll. */
    let idAnim = 0;
    function lancer(cible: number) {
      anim = true;
      (window as unknown as { __glissePageEnCours?: boolean }).__glissePageEnCours = true;
      const depart = scrollY, delta = cible - depart, t0 = performance.now();
      const D = Math.min(1600, 900 + Math.abs(delta) * 0.35);
      const pas = (t: number) => {
        if (!anim) return; // coupé par « arret-ressort »
        const p = clamp((t - t0) / D, 0, 1);
        scrollTo(0, depart + delta * easeGlisse(p));
        if (p < 1) idAnim = requestAnimationFrame(pas);
        else setTimeout(() => {
          anim = false;
          (window as unknown as { __glissePageEnCours?: boolean }).__glissePageEnCours = false;
          dispatchEvent(new Event("fin-glisse-page"));
        }, 160);
      };
      idAnim = requestAnimationFrame(pas);
    }
    const surArret = () => {
      cancelAnimationFrame(idAnim);
      anim = false;
    };
    addEventListener("arret-ressort", surArret);

    /* La molette au-dessus d'une zone qui défile VRAIMENT verticalement
       (fenêtre du parcours, liste interne…) garde son comportement normal.
       PIÈGE : un carrousel HORIZONTAL (overflow-x) reçoit un overflow-y
       calculé « auto » et déborde souvent de quelques pixels en hauteur →
       sans le seuil de 24 px, la molette au-dessus des blocs d'onglets
       faisait glisser les blocs au lieu de descendre la page. */
    function dansZoneDefilante(t: EventTarget | null): boolean {
      let el = t instanceof Element ? t : null;
      while (el && el !== document.body) {
        const s = getComputedStyle(el);
        if (/(auto|scroll)/.test(s.overflowY) && el.scrollHeight > el.clientHeight + 24) return true;
        el = el.parentElement;
      }
      return false;
    }

    const ancienComportement = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";
    const ancienAncrage = document.documentElement.style.overflowAnchor;
    document.documentElement.style.overflowAnchor = "none";
    /* TRACKPAD : l'inertie envoie une traîne de petits deltas en flux
       continu après le geste ; sans amortissement, elle redéclenche des
       glisses en chaîne (saccades). Règle : un delta « trackpad » (< 50)
       qui suit un autre événement de moins de 140 ms n'est qu'une traîne →
       avalé. Seul un geste franc après une micro-pause déclenche. Les crans
       de souris (deltas grands, espacés) ne sont pas concernés. */
    let dernierEvtT = 0;
    const surMolette = (e: WheelEvent) => {
      const w = window as unknown as { __glissePageEnCours?: boolean };
      const tEvt = performance.now();
      const ecartEvt = tEvt - dernierEvtT;
      dernierEvtT = tEvt;
      if (anim || w.__glissePageEnCours) { e.preventDefault(); return; }
      if (Math.abs(e.deltaY) < 8) return;
      if (dansZoneDefilante(e.target)) return;
      if (Math.abs(e.deltaY) < 50 && ecartEvt < 140) { e.preventDefault(); return; }
      mesurer();
      const y = scrollY, bas = e.deltaY > 0;
      let cible: number | null = null;
      if (bas) { for (const a of points) { if (a > y + 6) { cible = a; break; } } }
      else { for (let i = points.length - 1; i >= 0; i--) { if (points[i] < y - 6) { cible = points[i]; break; } } }
      if (cible == null) return;
      e.preventDefault();
      lancer(cible);
    };
    addEventListener("wheel", surMolette, { passive: false });
    addEventListener("resize", mesurer);
    mesurer();

    return () => {
      removeEventListener("wheel", surMolette);
      removeEventListener("resize", mesurer);
      removeEventListener("arret-ressort", surArret);
      cancelAnimationFrame(idAnim);
      (window as unknown as { __glissePageEnCours?: boolean }).__glissePageEnCours = false;
      document.documentElement.style.scrollBehavior = ancienComportement;
      document.documentElement.style.overflowAnchor = ancienAncrage;
    };
  }, [cle]);

  return null;
}
