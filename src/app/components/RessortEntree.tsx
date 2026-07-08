"use client";

/*
  RessortEntree — l'effet « retenue » de la home, appliqué à une ZONE de page :
  entre `depuis` (ou le haut de page si absent) et `cible`, la molette ne défile
  pas librement : elle propulse en glisse douce vers la cible (centrée à
  l'écran) en descendant, et revient sur `depuis` (ou le haut) en remontant.
  En dehors de la zone, le scroll est totalement libre.
  Souris uniquement (le tactile garde son défilement naturel).
*/

import { useEffect } from "react";

export default function RessortEntree({
  cible,
  depuis,
  haut,
}: {
  cible: string;
  depuis?: string;
  /** Si fourni : la cible se cale à `haut` px du haut de l'écran (sinon : centrée). */
  haut?: number;
}) {
  useEffect(() => {
    const reduit = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const actif = !reduit && matchMedia("(pointer:fine)").matches && innerWidth > 900;
    if (!actif) return;

    const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
    const easeGlisse = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
    let anim = false;

    function centre(selecteur: string, calageHaut?: number) {
      const el = document.querySelector<HTMLElement>(selecteur);
      if (!el) return null;
      const top = el.getBoundingClientRect().top + scrollY;
      const docH = document.documentElement.scrollHeight - innerHeight;
      const vise = calageHaut != null ? top - calageHaut : top + (el.offsetHeight - innerHeight) / 2;
      return clamp(vise, 0, docH);
    }

    function glisser(vers: number) {
      anim = true;
      const avant = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "auto"; // le rAF pilote, pas le natif
      const depart = scrollY, delta = vers - depart, t0 = performance.now();
      const D = Math.min(1600, 900 + Math.abs(delta) * 0.35);
      const pas = (t: number) => {
        const p = clamp((t - t0) / D, 0, 1);
        scrollTo(0, depart + delta * easeGlisse(p));
        if (p < 1) requestAnimationFrame(pas);
        else setTimeout(() => {
          anim = false;
          document.documentElement.style.scrollBehavior = avant;
        }, 380); /* verrou post-atterrissage : avale l'inertie de la molette */
      };
      requestAnimationFrame(pas);
    }

    const surMolette = (e: WheelEvent) => {
      if (anim) { e.preventDefault(); return; }
      if (Math.abs(e.deltaY) < 8) return;
      const cBas = centre(cible, haut);
      if (cBas == null) return;
      const cHaut = depuis ? centre(depuis) : 0;
      if (cHaut == null) return;
      const y = scrollY;
      // Hors zone : scroll libre.
      if (y >= cBas - 8 || y < cHaut - 8) return;
      if (e.deltaY > 0) {
        e.preventDefault();
        glisser(cBas);
      } else if (y > cHaut + 8) {
        e.preventDefault();
        glisser(cHaut);
      }
      // Sinon (on est déjà posé sur `depuis` et on remonte) : libre.
    };

    addEventListener("wheel", surMolette, { passive: false });
    return () => removeEventListener("wheel", surMolette);
  }, [cible, depuis, haut]);

  return null;
}
