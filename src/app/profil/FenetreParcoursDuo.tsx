"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { ROLES, ROLE_ORDER, typesByRole } from "../data/types";
import { NOMS_VARIANTES } from "../data/moteur";

/*
 * FENÊTRE « DÉCRIRE MON OU MA PARTENAIRE » (parcours à deux, branche
 * « répondre pour lui / elle ») : s'ouvre PAR-DESSUS la page profil, même
 * patron que la fenêtre du parcours solo (fond flouté, croix, Échap).
 * ÉCRAN V1 (inspiré du parcours 16P décortiqué, cf. ANALYSE_PARCOURS_16P.md
 * écran 6) : « Connais-tu déjà son profil ? » → Oui (choisir parmi les 48)
 * ou Non (mini-quiz de devinette). Les deux branches sont VISUELLES pour
 * l'instant, elles seront construites ensuite.
 * Le déclencheur est fourni par le parent (la carte entière est cliquable).
 * ⚠️ PIÈGE connu : rendu via createPortal(document.body), sinon le
 * backdrop-filter de la navbar fait caler le position:fixed sur elle.
 */

const VERT = "rgba(51,164,116,0.85)";
const INK = "rgba(0,0,0,0.75)";

export default function FenetreParcoursDuo({
  children,
  triggerClassName,
}: {
  /* Le contenu du déclencheur (la carte « Répondre pour lui ou elle »). */
  children: ReactNode;
  /* Les classes du déclencheur (la carte garde son style de carte). */
  triggerClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const [monte, setMonte] = useState(false); // portail seulement côté navigateur
  useEffect(() => setMonte(true), []);

  /* « Choisir son profil » : la pastille se transforme en MENU DÉROULANT des
     48 profils, groupés par famille (Analystes, Diplomates, Sentinelles,
     Explorateurs). Le choix est retenu à l'écran (le branchement du parcours
     sur ce profil viendra ensuite). */
  const [choixOuvert, setChoixOuvert] = useState(false);
  const [profilChoisi, setProfilChoisi] = useState<string | null>(null);

  // Fermeture à Échap. On ne bloque pas le scroll du fond.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const fenetre = (
    <>
      {/* BACKDROP : floute légèrement la page profil restée derrière */}
      <div
        onClick={() => setOpen(false)}
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

      {/* LA FENÊTRE : mêmes dimensions que le parcours solo */}
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
          /* Même taille que la fenêtre du parcours (demande Luca). */
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
        <style>{`.fpd-noscroll{scrollbar-width:none}.fpd-noscroll::-webkit-scrollbar{display:none}`}</style>

        {/* Fermer */}
        <button
          type="button"
          onClick={() => setOpen(false)}
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

        {/* En-tête (descendu de 34 px pour une ouverture plus aérée) */}
        {/* Même hauteur de titre que la fenêtre du parcours (30 px) */}
        <div style={{ padding: "30px 34px 0", maxWidth: 760, margin: "0 auto", width: "100%" }}>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color: INK }}>
            Décris ton ou ta partenaire
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-500">
            Pas besoin qu&apos;il ou elle passe le test tout de suite : on
            pose son profil ensemble, et vous pourrez l&apos;affiner plus tard.
          </p>
        </div>

        {/* Contenu (défilable) — V1 : connais-tu déjà son profil ? */}
        <div
          className="fpd-noscroll"
          style={{ padding: "0 34px 30px", flex: 1, minHeight: 0, overflowY: "auto" }}
        >
          <div
            style={{
              maxWidth: 692,
              margin: "0 auto",
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <p className="mt-2 text-base font-bold" style={{ color: INK }}>
              Connais-tu déjà son type de personnalité ?
            </p>
            {/* Les 2 choix : cartes BLANCHES, même DA que « L'inviter » /
                « Répondre pour lui ou elle » (validé par Luca).
                Menu ouvert → la rangée prend TOUTE la hauteur restante :
                « Oui, je le connais » s'agrandit jusqu'en bas du bloc (la
                marge du bas = celle du haut). */}
            <div
              className="mt-4 flex min-h-0 flex-col gap-5 sm:flex-row"
              /* flex-grow ANIMÉ : l'agrandissement de « Oui, je le connais »
                 se fait en douceur (0 → toute la hauteur restante). */
              style={{
                flexGrow: choixOuvert ? 1 : 0,
                /* Même douceur à l'ouverture qu'à la fermeture */
                transition: "flex-grow .75s cubic-bezier(.45,0,.25,1)",
              }}
            >
              {/* Carte en <div> (un menu vit dedans, pas de bouton imbriqué) */}
              <div className="flex flex-1 min-w-0 flex-col items-start rounded-2xl border border-gray-100 bg-white p-6 text-left shadow-sm transition-shadow hover:shadow-md">
                <p className="text-base font-bold" style={{ color: INK }}>
                  Oui, je le connais
                </p>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                  Choisis son profil parmi les 48, et on construit votre
                  parcours tout de suite.
                </p>
                {/* La pastille déclenche le menu ; la carte s'agrandit
                    jusqu'en bas (le menu occupe la hauteur restante). */}
                <button
                  type="button"
                  onClick={() => setChoixOuvert((o) => !o)}
                  className="mt-5 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105 cursor-pointer"
                  style={{ background: VERT }}
                >
                  {profilChoisi ?? "Choisir son profil"}
                  <svg
                    viewBox="0 0 24 24"
                    width="14"
                    height="14"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      transform: choixOuvert ? "rotate(180deg)" : "none",
                      transition: "transform .25s ease",
                    }}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                {/* Le menu : les 48 profils par famille, défilable, il
                    remplit la hauteur restante de la carte agrandie */}
                {choixOuvert && (
                  <div className="fpd-noscroll mt-3 w-full flex-1 min-h-0 overflow-y-auto rounded-2xl border border-gray-100 bg-white shadow-sm">
                    {ROLE_ORDER.map((role) => (
                      <div key={role}>
                        <p className="px-4 pt-4 pb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
                          {ROLES[role].name}
                        </p>
                        {typesByRole(role).map((t) =>
                          (["V1", "V2", "V3"] as const).map((v) => {
                            const nom = NOMS_VARIANTES[t.code]?.[v] ?? v;
                            return (
                              <button
                                key={t.code + v}
                                type="button"
                                onClick={() => {
                                  setProfilChoisi(`${t.code} · ${nom}`);
                                  setChoixOuvert(false);
                                }}
                                className="flex w-full items-center justify-between gap-3 px-4 py-2 text-left text-sm cursor-pointer transition-colors hover:bg-[rgba(51,164,116,0.08)]"
                              >
                                <span className="font-semibold" style={{ color: INK }}>
                                  {nom}
                                </span>
                                <span className="flex-shrink-0 text-xs font-semibold" style={{ color: VERT }}>
                                  {t.code} · {v}
                                </span>
                              </button>
                            );
                          }),
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* sm:self-start PERMANENT : « Non, devinons-le » garde toujours
                  sa taille naturelle (sinon il « se referme » visuellement
                  pendant l'animation de fermeture du menu). */}
              <button
                type="button"
                className="flex flex-1 min-w-0 flex-col items-start rounded-2xl border border-gray-100 bg-white p-6 text-left shadow-sm transition-all hover:shadow-md hover:scale-[1.01] cursor-pointer sm:self-start"
              >
                <p className="text-base font-bold" style={{ color: INK }}>
                  Non, devinons-le
                </p>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                  Quelques questions sur sa façon d&apos;être, et on devine
                  son profil ensemble.
                </p>
                <span
                  className="mt-5 inline-block rounded-full px-5 py-2.5 text-sm font-semibold text-white"
                  style={{ background: VERT }}
                >
                  Commencer à deviner
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={triggerClassName}>
        {children}
      </button>
      {monte && createPortal(fenetre, document.body)}
    </>
  );
}
