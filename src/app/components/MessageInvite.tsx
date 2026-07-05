"use client";

import { useEffect, useState } from "react";

/*
 * PARCOURS À DEUX, côté invité : message affiché PAR-DESSUS la page résultat
 * quand l'invité vient de finir le test (jeton d'invitation vérifié côté
 * serveur). Structure validée par Luca : « {Prénom} notifié » + coche verte
 * animée (cercle + trait qui se dessine) à droite du titre, puis l'invitation
 * à découvrir le résumé et le teaser de l'espace.
 */
const VERT = "rgba(51,164,116,0.85)";

export default function MessageInvite({ prenom }: { prenom: string }) {
  const [ouvert, setOuvert] = useState(true);
  /* La coche se dessine à l'ARRIVÉE du message (double rAF : peinte à zéro
     d'abord, puis l'animation part). */
  const [coche, setCoche] = useState(false);
  useEffect(() => {
    const r = requestAnimationFrame(() => requestAnimationFrame(() => setCoche(true)));
    return () => cancelAnimationFrame(r);
  }, []);
  if (!ouvert) return null;
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 80,
        background: "rgba(255,255,255,0.45)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        display: "grid",
        placeItems: "center",
        padding: 20,
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-xl rounded-3xl bg-white p-8 text-center"
        style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.12)" }}
      >
        {/* Titre + petite coche de validation animée dans un cercle */}
        <div className="flex items-center justify-center gap-3">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color: VERT }}>
            {`${prenom} notifié`}
          </h2>
          <span
            aria-hidden="true"
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: VERT,
              display: "grid",
              placeItems: "center",
              transform: coche ? "scale(1)" : "scale(.5)",
              transition: "transform .45s cubic-bezier(.34,1.5,.5,1)",
            }}
          >
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              {/* Le trait de la coche se DESSINE à l'arrivée */}
              <path
                d="M5 13l4 4L19 7"
                style={{
                  strokeDasharray: 24,
                  strokeDashoffset: coche ? 0 : 24,
                  transition: "stroke-dashoffset .5s ease .2s",
                }}
              />
            </svg>
          </span>
        </div>
        <p className="mt-4 text-base leading-relaxed text-gray-600">
          Prends le temps, si tu le souhaites, de découvrir ton portrait.
        </p>
        <p className="mt-3 text-base leading-relaxed text-gray-600">
          Tu pourras retrouver le profil de ton ou ta partenaire ainsi que le
          parcours à deux, et explorer d&apos;autres fonctionnalités en te
          créant un compte.
        </p>
        <button
          type="button"
          onClick={() => setOuvert(false)}
          className="mt-7 rounded-full px-7 py-3 text-sm font-semibold text-white transition-transform hover:scale-105 cursor-pointer"
          style={{ background: VERT }}
        >
          Découvrir ma personnalité
        </button>
      </div>
    </div>
  );
}
