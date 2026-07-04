"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import CheminParcours, { progressionModules, infosModule } from "../relations/seul/CheminParcours";
import ContenuModule1 from "../relations/seul/module-1/ContenuModule1";
import { CercleProgression } from "./CercleProgression";

/*
 * FENÊTRE DU PARCOURS (ouverte par « Commencer mon parcours » dans l'onglet
 * Relations du profil) : un grand panneau s'ouvre PAR-DESSUS la page profil
 * (fond flouté, comme la fenêtre de paiement), avec le chemin de progression
 * dedans. Croix / clic sur le fond / Échap pour fermer : on reste sur /profil.
 * ⚠️ PIÈGE connu : rendu via createPortal(document.body), sinon le
 * backdrop-filter de la navbar fait caler le position:fixed sur elle.
 */

const VERT = "rgba(51,164,116,0.85)";
const INK = "rgba(0,0,0,0.75)";

export default function FenetreParcours({
  children,
  ouvert,
  onFermer,
}: {
  /* Mode bouton : children = le libellé de la pastille qui ouvre. */
  children?: ReactNode;
  /* Mode PILOTÉ (depuis le carrousel Relations : étapes 1/2/3 + bouton
     partagent LA MÊME fenêtre et la même progression) : `ouvert` +
     `onFermer` remplacent le bouton interne. */
  ouvert?: boolean;
  onFermer?: () => void;
}) {
  const pilote = ouvert !== undefined;
  const [openInterne, setOpenInterne] = useState(false);
  const open = pilote ? ouvert : openInterne;
  /* Les deux vues de la fenêtre : le chemin du parcours, ou un module
     ouvert SUR PLACE (décision Luca : on ne quitte jamais la fenêtre). */
  const [vue, setVue] = useState<"chemin" | "module">("chemin");
  const [monte, setMonte] = useState(false); // portail seulement côté navigateur
  useEffect(() => setMonte(true), []);

  function ouvrir() {
    setOpenInterne(true);
  }
  function fermer() {
    if (pilote) onFermer?.();
    else setOpenInterne(false);
  }
  // À chaque OUVERTURE (bouton interne ou pilotage externe) : la fenêtre
  // repart sur le chemin.
  useEffect(() => {
    if (open) setVue("chemin");
  }, [open]);

  /* Progression du parcours (EN MÉMOIRE pour l'instant : se remet à zéro au
     rechargement ; le vrai stockage viendra avec la table
     parcours_progression). `faits` = nombre de modules terminés,
     `moduleOuvert` = le module affiché dans la vue module. */
  const [faits, setFaits] = useState(0);
  const [moduleOuvert, setModuleOuvert] = useState(1);

  /* « J'ai terminé ce module » : la coche verte se dessine par-dessus la
     fenêtre, la progression avance (le module devient fait, le suivant se
     débloque, la ligne verte descend), puis retour en douceur sur le chemin. */
  const [valide, setValide] = useState(false);
  function terminerModule() {
    setValide(true);
    window.setTimeout(() => {
      setFaits((f) => Math.max(f, moduleOuvert)); // revisiter un module fait ne recule pas
      setVue("chemin");
      window.setTimeout(() => setValide(false), 100); // le fondu de sortie part une fois le chemin affiché
    }, 1200);
  }

  // Fermeture à Échap. On ne bloque pas le scroll du fond (comme le paiement).
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") fermer();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const fenetre = (
    <>
      {/* BACKDROP : floute légèrement la page profil restée derrière */}
      <div
        onClick={fermer}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 60,
          background: "rgba(20,22,21,0.16)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          opacity: open ? 1 : 0,
          visibility: open ? "visible" : "hidden",
          transition: "opacity .35s ease, visibility .35s",
        }}
      />

      {/* LA FENÊTRE */}
      <div
        role="dialog"
        aria-modal="true"
        style={{
          position: "fixed",
          zIndex: 70,
          left: "50%",
          top: "50%",
          width: "min(920px, 96vw)",
          background: "#fff",
          borderRadius: 24,
          boxShadow: "0 24px 80px rgba(0,0,0,0.22)",
          overflow: "hidden",
          /* Hauteur FIXE (pas au contenu) : la fenêtre garde exactement la
             même taille sur la vue chemin et sur la vue module.
             +12 px vers le BAS uniquement (le bord haut ne bouge pas :
             le centre est descendu de 6 px pour compenser). */
          height: "calc(92vh + 12px)",
          marginTop: 6,
          display: "flex",
          flexDirection: "column",
          transform: open ? "translate(-50%,-50%) scale(1)" : "translate(-50%,-50%) scale(.92)",
          opacity: open ? 1 : 0,
          visibility: open ? "visible" : "hidden",
          transition: "transform .35s cubic-bezier(.34,1.3,.5,1), opacity .3s ease, visibility .35s",
        }}
      >
        <style>{`.frp-noscroll{scrollbar-width:none}.frp-noscroll::-webkit-scrollbar{display:none}`}</style>

        {/* Fermer */}
        <button
          type="button"
          onClick={fermer}
          aria-label="Fermer"
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            zIndex: 3,
            width: 32,
            height: 32,
            border: "none",
            cursor: "pointer",
            background: "rgba(0,0,0,0.05)",
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",
            color: "rgba(0,0,0,0.5)",
          }}
        >
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {/* En-tête de la fenêtre (selon la vue). La COLONNE intérieure garde
            sa largeur (692 px) : la fenêtre est plus large, pas le contenu. */}
        {vue === "chemin" ? (
          <div style={{ padding: "30px 34px 18px", maxWidth: 692 + 68, margin: "0 auto", width: "100%" }}>
            <div className="flex items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color: INK }}>
                  Comprends tes schémas
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                  Un module à la fois, à ton rythme : le suivant s&apos;ouvre
                  quand tu as fini le précédent.
                </p>
              </div>
              {/* Cercle de réalisation des modules (fait = 1, en cours = 0,5) */}
              <div className="flex-shrink-0">
                <CercleProgression pct={progressionModules(faits)} taille={56} />
              </div>
            </div>
          </div>
        ) : (
          /* Titre du module sur le même axe que le chemin (la colonne de
             56 px vit désormais dans la marge, tout est aligné à 34 px). */
          <div
            style={{
              padding: "52px 34px 18px",
              maxWidth: 692 + 68,
              margin: "0 auto",
              width: "100%",
            }}
          >
            <h2
              className="text-2xl md:text-3xl font-bold tracking-tight leading-tight text-left"
              style={{ color: INK }}
            >
              {infosModule(moduleOuvert)?.titre}
            </h2>
          </div>
        )}

        {/* Retour vers le chemin (vue module) : flèche ronde dans la marge
            blanche de gauche, centrée au milieu de sa hauteur et de sa
            largeur (marge = (920 − 760) / 2 = 80 px → centre à 40 px). */}
        {vue === "module" && (
          <button
            type="button"
            onClick={() => setVue("chemin")}
            aria-label="Revenir au parcours"
            style={{
              position: "absolute",
              left: 40,
              top: "50%",
              transform: "translate(-50%,-50%)",
              zIndex: 3,
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: VERT,
              border: "none",
              boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
            }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>
        )}

        {/* Le contenu de la vue, défilable en interne. key={vue} : le scroll
            repart en haut quand on change de vue. */}
        <div
          key={vue}
          className="frp-noscroll"
          style={{
            padding: "6px 34px 30px",
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
          }}
        >
          <div style={{ maxWidth: 692, margin: "0 auto", width: "100%" }}>
            {vue === "chemin" ? (
              <CheminParcours
                faits={faits}
                onOuvrirModule={(n) => {
                  setModuleOuvert(n);
                  setVue("module");
                }}
              />
            ) : (
              /* Le CONTENU affiché est encore l'échantillon du module 1 pour
                 tous les modules (les briques réelles viendront) ; seul le
                 titre suit le module ouvert. */
              <ContenuModule1 onTerminer={terminerModule} />
            )}
          </div>
        </div>

        {/* VALIDATION DU MODULE : voile blanc + coche verte qui se dessine,
            par-dessus toute la fenêtre, puis retour au chemin. */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 5,
            background: "#fff",
            display: "grid",
            placeItems: "center",
            opacity: valide ? 1 : 0,
            visibility: valide ? "visible" : "hidden",
            transition: "opacity .3s ease, visibility .3s",
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              width: 76,
              height: 76,
              borderRadius: "50%",
              background: VERT,
              display: "grid",
              placeItems: "center",
              transform: valide ? "scale(1)" : "scale(.5)",
              transition: "transform .45s cubic-bezier(.34,1.5,.5,1)",
            }}
          >
            <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              {/* La coche se DESSINE (trait qui avance) quand le voile apparaît */}
              <path
                d="M5 13l4 4L19 7"
                style={{
                  strokeDasharray: 24,
                  strokeDashoffset: valide ? 0 : 24,
                  transition: "stroke-dashoffset .5s ease .2s",
                }}
              />
            </svg>
          </span>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Le bouton interne n'existe qu'en mode NON piloté */}
      {!pilote && (
        <button
          type="button"
          onClick={ouvrir}
          className="inline-block rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105 cursor-pointer"
          style={{ background: VERT }}
        >
          {children}
        </button>
      )}
      {monte && createPortal(fenetre, document.body)}
    </>
  );
}
