"use client";

import { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import type { LottieRefCurrentProps } from "lottie-react";

/*
 * La couronne animée de l'entrée « Suivi premium ».
 *
 * Le fichier pèse 82 Ko : on ne l'embarque PAS dans le paquet de la navbar,
 * qui est chargée sur toutes les pages du site. Il est demandé une fois au
 * serveur, après l'affichage, et sans bloquer quoi que ce soit. Tant qu'il
 * n'est pas là, on montre la couronne dessinée : aucun trou, aucun décalage.
 *
 * L'animation ne tourne pas en boucle. Elle se joue une fois, au survol, et
 * revient à sa première image quand la souris repart.
 */

const TAILLE_PAR_DEFAUT = 20;

/* La secousse du BLOC entier, tuile comprise. Elle est calée sur les deux
   gonflements de l'animation : celle-ci dure 2,15 s, ses pics tombent aux
   images 65 et 196 sur 258, soit 25 % et 76 % du parcours. */
const SECOUSSE = `
@keyframes couronne-secousse{
  /* La première secousse part à l'instant zéro et tient dans les 0,35 s du
     grossissement : les deux gestes se produisent ENSEMBLE, plus l'un après
     l'autre. La seconde reste calée sur le second gonflement du fichier. */
  0%{transform:rotate(-8deg);}
  5%{transform:rotate(-19deg);}
  10%{transform:rotate(4deg);}
  14%{transform:rotate(-14deg);}
  18%,71%{transform:rotate(-8deg);}
  76%{transform:rotate(-19deg);}
  80%{transform:rotate(4deg);}
  84%{transform:rotate(-14deg);}
  89%,100%{transform:rotate(-8deg);}
}
.couronne-enveloppe{display:block;transform-origin:50% 55%;transition:transform .3s cubic-bezier(.22,.9,.3,1);}
.couronne-enveloppe.grossit{transform:scale(1.5);}
.couronne-bloc{display:block;transform:rotate(-8deg);transform-origin:50% 55%;}
/* En boucle tant que la souris reste : les deux secousses et leurs temps
   morts se répètent, ce qui donne le rythme par à-coups. */
.couronne-bloc.secoue{animation:couronne-secousse 2.15s cubic-bezier(.22,.9,.3,1) infinite;}
@media (prefers-reduced-motion: reduce){.couronne-bloc.secoue{animation:none;}}
`;


/* La couronne est cuite dans des images : sa couleur ne se change pas en CSS.
   On a donc un fichier par famille, recoloré à l'identique (seul le vert de la
   couronne et sa bande claire bougent ; le balayage blanc reste blanc). La
   page publie sa couleur sur la racine du document, on s'y accorde. */
const FICHIERS: Record<string, string> = {
  "rgba(51,164,116,0.85)": "/animations/couronne-premium.json",
  "rgb(62,146,102)": "/animations/couronne-premium-diplomates.json",
  "rgb(48,122,85)": "/animations/couronne-premium-sentinelles.json",
  "rgb(36,96,66)": "/animations/couronne-premium-explorateurs.json",
};
const FICHIER_PAR_DEFAUT = "/animations/couronne-premium.json";

function fichierCourant(): string {
  if (typeof document === "undefined") return FICHIER_PAR_DEFAUT;
  const c = getComputedStyle(document.documentElement)
    .getPropertyValue("--accent-page")
    .replace(/\s+/g, "");
  return FICHIERS[c] || FICHIER_PAR_DEFAUT;
}


function CouronneDessinee({ taille }: { taille: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={taille}
      height={taille}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 8l3.5 3L12 5l5.5 6L21 8l-2 10H5L3 8z" />
    </svg>
  );
}

export default function CouronnePremium({
  anime,
  taille = TAILLE_PAR_DEFAUT,
}: {
  /* Quand l'appelant sait déjà s'il est survolé (la navbar), il le dit.
     Sinon (le sommaire), on écoute nous-mêmes le lien qui nous contient. */
  anime?: boolean;
  taille?: number;
}) {
  const [donnees, setDonnees] = useState<object | null>(null);
  const [fichier, setFichier] = useState(FICHIER_PAR_DEFAUT);
  const lottie = useRef<LottieRefCurrentProps>(null);
  const boite = useRef<HTMLSpanElement>(null);
  const [survolSeul, setSurvolSeul] = useState(false);
  const autonome = anime === undefined;
  const joue = autonome ? survolSeul : anime;

  // La couleur de la page est posée par un effet, qui peut passer après le
  // nôtre : on la relit à chaque changement du style de la racine.
  useEffect(() => {
    const maj = () => setFichier(fichierCourant());
    maj();
    const mo = new MutationObserver(maj);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["style"] });
    return () => mo.disconnect();
  }, []);

  useEffect(() => {
    let vivant = true;
    fetch(fichier)
      .then((r) => r.json())
      .then((d) => {
        if (vivant) setDonnees(d);
      })
      .catch(() => {
        /* pas d'animation : la couronne dessinée reste, personne ne voit rien */
      });
    return () => {
      vivant = false;
    };
  }, [fichier]);

  // Mode autonome : on s'accroche au lien parent, pour que l'animation parte
  // aussi bien depuis le texte que depuis l'icône.
  useEffect(() => {
    if (!autonome) return;
    const cible = boite.current?.closest("a");
    if (!cible) return;
    const entre = () => setSurvolSeul(true);
    const sort = () => setSurvolSeul(false);
    cible.addEventListener("mouseenter", entre);
    cible.addEventListener("mouseleave", sort);
    return () => {
      cible.removeEventListener("mouseenter", entre);
      cible.removeEventListener("mouseleave", sort);
    };
  }, [autonome, donnees]);

  useEffect(() => {
    const l = lottie.current;
    if (!l) return;
    if (joue) l.goToAndPlay(0, true);
    else l.goToAndStop(0, true);
  }, [joue, donnees]);

  if (!donnees)
    return (
      <span ref={boite} style={{ display: "block" }}>
        <CouronneDessinee taille={taille} />
      </span>
    );

  return (
    <span ref={boite} className={joue ? "couronne-enveloppe grossit" : "couronne-enveloppe"}>
      <style dangerouslySetInnerHTML={{ __html: SECOUSSE }} />
      <span className={joue ? "couronne-bloc secoue" : "couronne-bloc"}>
    <Lottie
      lottieRef={lottie}
      animationData={donnees}
      loop={false}
      autoplay={false}
      /* Rendu SVG (le mode par défaut) : il se redessine à n'importe quelle
         échelle, donc net au zoom. Le canvas, lui, fige sa résolution au
         chargement et devient flou dès qu'on agrandit. La barre sombre de fin
         d'animation ne venait pas du mode de rendu mais de deux calques du
         fichier, qui ont été retirés. */
      /* Légèrement de travers, comme tu l'imaginais : la tuile n'est plus un
         bouton d'interface, elle est posée. */
      style={{
        width: taille,
        height: taille,
        display: "block",
      }}
      aria-hidden
    />
      </span>
    </span>
  );
}
