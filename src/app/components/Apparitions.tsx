"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/*
  Apparitions au défilement, pour tout le site (même réglage que la home).
  Usage dans n'importe quelle page : poser data-anim="up" | "left" | "right" | "pop"
  sur un élément (+ data-delay="150" optionnel, en ms), ou data-mots sur un titre
  pour une apparition mot à mot. C'est tout : ce composant, monté dans le layout,
  observe la page et ajoute la classe "vu" quand l'élément entre dans l'écran
  (réversible : elle se retire quand il ressort, comme sur la home).
  La home garde son propre système : tout ce qui est dans .ha est ignoré ici.
*/

const STYLE = `
[data-anim]{opacity:0;transition:opacity 1s cubic-bezier(.22,.9,.3,1),transform 1s cubic-bezier(.22,.9,.3,1);will-change:opacity,transform;}
[data-anim="up"]{transform:translateY(44px);}
[data-anim="left"]{transform:translateX(-64px);}
[data-anim="right"]{transform:translateX(64px);}
[data-anim="pop"]{transform:translateY(26px) scale(.94);}
[data-anim].vu{opacity:1;transform:none;}
[data-mots] .mot{display:inline-block;opacity:0;transform:translateY(0.55em) rotate(1.5deg);transition:opacity .7s cubic-bezier(.22,.9,.3,1),transform .7s cubic-bezier(.22,.9,.3,1);}
[data-mots].vu .mot{opacity:1;transform:none;}
@media (prefers-reduced-motion: reduce){
  [data-anim],[data-mots] .mot{transition:none;opacity:1;transform:none;}
}
`;

export default function Apparitions() {
  const pathname = usePathname();

  useEffect(() => {
    const horsHome = (el: Element) => !el.closest(".ha");

    /* Titres mot à mot (une seule fois par élément) */
    const decouperMots = (racine: ParentNode) => {
      racine.querySelectorAll<HTMLElement>("[data-mots]").forEach((h) => {
        if (!horsHome(h) || h.querySelector(".mot")) return;
        const mots = (h.textContent || "").trim().split(/\s+/);
        h.innerHTML = mots
          .map((m, i) => `<span class="mot" style="transition-delay:${i * 70}ms">${m}</span>`)
          .join(" ");
      });
    };

    /* Entrées réversibles, mêmes réglages que la home */
    const minuteurs = new WeakMap<Element, ReturnType<typeof setTimeout>>();
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          const el = e.target as HTMLElement;
          clearTimeout(minuteurs.get(el));
          if (e.isIntersecting) {
            minuteurs.set(
              el,
              setTimeout(() => el.classList.add("vu"), parseInt(el.dataset.delay || "0", 10))
            );
          } else {
            el.classList.remove("vu");
          }
        }),
      { threshold: 0.18, rootMargin: "0px 0px -40px 0px" }
    );

    const observerTout = (racine: ParentNode) => {
      decouperMots(racine);
      racine.querySelectorAll("[data-anim],[data-mots]").forEach((el) => {
        if (horsHome(el)) io.observe(el);
      });
    };
    observerTout(document.body);

    /* Contenu ajouté après coup (chargements progressifs, changement
       d'onglet, etc.) : le balayage est REGROUPÉ en un seul passage par
       frame (sinon, pendant les re-rendus au scroll, on rebalayait la page
       à chaque petite mutation → saccades). Ré-observer un élément déjà
       observé est sans effet, le passage global est donc sans risque. */
    let balayagePrevu = false;
    const mo = new MutationObserver(() => {
      if (balayagePrevu) return;
      balayagePrevu = true;
      requestAnimationFrame(() => {
        balayagePrevu = false;
        observerTout(document.body);
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return <style dangerouslySetInnerHTML={{ __html: STYLE }} />;
}
