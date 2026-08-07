"use client";

import { useEffect } from "react";

/*
 * Les deux colonnes de gouttière (sommaire à gauche, aparté à droite) doivent
 * s'immobiliser CENTRÉES dans l'écran, pas collées sous la navbar.
 *
 * En CSS seul c'est impossible : `top` ne connaît pas la hauteur de l'élément
 * qu'il colle. On la mesure donc ici et on la publie en variable sur .pt ;
 * la feuille de style fait ensuite `top: max(sous-la-navbar, 50svh - h/2)`.
 * Le `max` sert de garde-fou : sur un écran court, une colonne plus haute que
 * la moitié de la vue resterait accrochée sous la navbar plutôt que de voir
 * son début sortir par le haut.
 */
const CIBLES: [string, string][] = [
  [".som-dedans", "--som-h"],
  [".ap-dedans", "--ap-h"],
];

export default function ColonnesCentrees() {
  useEffect(() => {
    const racine = document.querySelector<HTMLElement>(".pt");
    if (!racine) return;

    const majUne = (sel: string, variable: string) => {
      const el = racine.querySelector<HTMLElement>(sel);
      if (el) racine.style.setProperty(variable, `${el.offsetHeight}px`);
    };
    const maj = () => CIBLES.forEach(([sel, v]) => majUne(sel, v));

    maj();

    // La couleur de la famille est publiée sur la racine du document : la
    // navbar, qui est en dehors de la page, peut ainsi s'y accorder. On la
    // retire en quittant, sinon elle teindrait les pages suivantes.
    const accent = getComputedStyle(racine).getPropertyValue("--accent").trim();
    if (accent) document.documentElement.style.setProperty("--accent-page", accent);

    const ro = new ResizeObserver(maj);
    CIBLES.forEach(([sel]) => {
      const el = racine.querySelector(sel);
      if (el) ro.observe(el);
    });
    window.addEventListener("resize", maj);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", maj);
      document.documentElement.style.removeProperty("--accent-page");
    };
  }, []);

  return null;
}
