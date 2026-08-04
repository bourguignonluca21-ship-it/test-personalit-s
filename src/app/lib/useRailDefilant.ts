"use client";

import { useEffect, useRef, type RefObject } from "react";

// =============================================================================
// LE MODÈLE DE CARROUSEL DU SITE — un seul comportement, partagé.
//
// Tous les rails horizontaux du site passent par ici, pour qu'ils aient
// exactement les mêmes caractéristiques et qu'on n'ait plus à les régler un par
// un :
//   • boucle infinie (la liste est rendue TROIS fois, on démarre sur la copie du
//     milieu et on se recale silencieusement dès qu'on approche d'un bord) ;
//   • dérive continue et lente, comme le défilé de la home (0,45 px par image) ;
//   • pause au survol, au doigt, et pendant une glisse de page ;
//   • on peut ATTRAPER le rail à la souris pour le faire tourner ;
//   • l'élément le plus proche du milieu peut porter une classe (celui qui
//     grossit).
//
// ⚠️ ANTI-SACCADE, la règle qui a coûté cher : le gestionnaire de défilement ne
// lit AUCUNE mesure de mise en page. Les dimensions sont prises au montage et au
// redimensionnement, gardées ici, et le rang de l'élément central se déduit du
// seul scrollLeft. Voir la mémoire « saccades-pages-types ».
// =============================================================================

/** La liste est TOUJOURS rendue trois fois : c'est ce qui rend la boucle
 *  invisible. Le modèle en déduit lui-même la longueur d'une copie. */
export const COPIES = 3;

export type OptionsRail = {
  /** Dérive continue, en pixels par image. La home est à 0,45. */
  vitesse?: number;
  /** Classe posée sur l'élément le plus proche du milieu du rail. */
  classeCentre?: string;
  /** Coupe tout le mécanisme (rail qui ne défile pas tout seul). */
  actif?: boolean;
};

export function useRailDefilant(
  ref: RefObject<HTMLDivElement | null>,
  { vitesse = 0.45, classeCentre, actif = true }: OptionsRail = {},
) {
  // Position en FLOTTANT : le navigateur arrondit scrollLeft à l'entier, donc
  // « += 0,45 » écrit directement n'avancerait jamais.
  const pos = useRef(0);
  const pause = useRef(false);
  const mesures = useRef({ pas: 0, element: 0, visible: 0 });
  const rangCentre = useRef(-1);

  useEffect(() => {
    const el = ref.current;
    if (!el || !actif) return;

    const mesurer = () => {
      const premier = el.firstElementChild as HTMLElement | null;
      if (!premier) return;
      const ecart = parseFloat(getComputedStyle(el).columnGap) || 0;
      // offsetWidth, jamais getBoundingClientRect : l'élément du milieu porte un
      // transform qui fausserait la mesure.
      mesures.current = {
        element: premier.offsetWidth,
        pas: premier.offsetWidth + ecart,
        visible: el.clientWidth,
      };
    };

    const marquerCentre = () => {
      if (!classeCentre) return;
      const { pas, element, visible } = mesures.current;
      if (!pas) return;
      const rang = Math.round((el.scrollLeft + visible / 2 - element / 2) / pas);
      if (rang === rangCentre.current) return;
      el.children[rangCentre.current]?.classList.remove(classeCentre);
      el.children[rang]?.classList.add(classeCentre);
      rangCentre.current = rang;
    };

    // Longueur d'UNE copie de la liste, déduite du nombre d'éléments rendus.
    const longueur = () =>
      (mesures.current.pas * el.children.length) / COPIES;

    const caler = () => {
      mesurer();
      el.scrollLeft = longueur();
      pos.current = el.scrollLeft;
      rangCentre.current = -1;
      marquerCentre();
    };
    caler();

    const auDefilement = () => {
      const t = longueur();
      if (!t) return;
      if (el.scrollLeft < t * 0.5) el.scrollLeft += t;
      else if (el.scrollLeft > t * 1.5) el.scrollLeft -= t;
      marquerCentre();
    };
    el.addEventListener("scroll", auDefilement, { passive: true });

    const ro = new ResizeObserver(caler);
    ro.observe(el);

    // ---- La dérive continue -------------------------------------------------
    let idDerive = 0;
    const reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const deriver = () => {
      const glissePage = (window as unknown as { __glissePageEnCours?: boolean })
        .__glissePageEnCours;
      if (!glissePage && !pause.current && mesures.current.pas) {
        // L'utilisateur a bougé le rail lui-même : on se recale sur lui.
        if (Math.abs(el.scrollLeft - pos.current) > 2) pos.current = el.scrollLeft;
        pos.current += vitesse;
        el.scrollLeft = pos.current;
      }
      idDerive = requestAnimationFrame(deriver);
    };
    if (vitesse > 0 && !reduit) idDerive = requestAnimationFrame(deriver);

    // ---- La pause -----------------------------------------------------------
    const entrer = () => (pause.current = true);
    const sortir = () => (pause.current = false);
    el.addEventListener("mouseenter", entrer);
    el.addEventListener("mouseleave", sortir);
    el.addEventListener("touchstart", entrer, { passive: true });
    el.addEventListener("touchend", sortir, { passive: true });

    // ---- Attraper le rail à la souris --------------------------------------
    // Au doigt, le navigateur fait déjà défiler le rail : on ne traite que la
    // souris, sinon on lui prendrait la main.
    el.style.cursor = "grab";
    el.style.userSelect = "none";
    (el.style as CSSStyleDeclaration & { webkitUserSelect?: string }).webkitUserSelect = "none";
    let attrape = false;
    let x0 = 0;
    let depart = 0;
    let bouge = false;

    const attraper = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      attrape = true;
      bouge = false;
      x0 = e.clientX;
      depart = el.scrollLeft;
      pause.current = true;
      el.style.cursor = "grabbing";
      el.setPointerCapture(e.pointerId);
    };
    const tirer = (e: PointerEvent) => {
      if (!attrape) return;
      const d = e.clientX - x0;
      if (Math.abs(d) > 3) bouge = true;
      el.scrollLeft = depart - d;
      pos.current = el.scrollLeft;
    };
    const lacher = (e: PointerEvent) => {
      if (!attrape) return;
      attrape = false;
      pause.current = false;
      el.style.cursor = "grab";
      if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
      // Une vraie glisse ne doit pas ouvrir le lien qu'on tenait sous la souris.
      if (bouge) {
        const avaler = (ev: MouseEvent) => {
          ev.preventDefault();
          ev.stopPropagation();
        };
        el.addEventListener("click", avaler, { capture: true, once: true });
        setTimeout(() => el.removeEventListener("click", avaler, { capture: true }), 0);
      }
    };
    el.addEventListener("pointerdown", attraper);
    el.addEventListener("pointermove", tirer);
    el.addEventListener("pointerup", lacher);
    el.addEventListener("pointercancel", lacher);

    return () => {
      el.removeEventListener("scroll", auDefilement);
      el.removeEventListener("mouseenter", entrer);
      el.removeEventListener("mouseleave", sortir);
      el.removeEventListener("touchstart", entrer);
      el.removeEventListener("touchend", sortir);
      el.removeEventListener("pointerdown", attraper);
      el.removeEventListener("pointermove", tirer);
      el.removeEventListener("pointerup", lacher);
      el.removeEventListener("pointercancel", lacher);
      ro.disconnect();
      if (idDerive) cancelAnimationFrame(idDerive);
    };
  }, [ref, vitesse, classeCentre, actif]);
}
