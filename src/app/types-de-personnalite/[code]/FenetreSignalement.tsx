"use client";

import { useEffect, useState } from "react";

// =============================================================================
// LA FENÊTRE DE SIGNALEMENT.
//
// Règles arrêtées par Luca le 04/08/2026 :
//   • le clic sur le drapeau ouvre cette fenêtre et demande un MOTIF ;
//   • le commentaire signalé RESTE VISIBLE : le signalement ne fait pas voter la
//     foule, il déclenche un second examen automatique, plus sévère (seuils
//     abaissés, motif joint, lecture en contexte). Trois comptes ne peuvent donc
//     pas faire taire quelqu'un ;
//   • TOUT LE MONDE peut signaler, même sans compte : le DSA demande que toute
//     personne puisse notifier un contenu. Les abus se limitent par adresse, pas
//     par compte.
//
// ⚠️ Le motif « cette personne semble en danger » n'est PAS une infraction : il
// ne doit jamais être traité comme les autres. Il ne vise pas à faire retirer le
// message, il sert à le faire remonter vite. Le message de confirmation le dit.
//
// Le dessin est celui des fenêtres du site (fond blanc flouté, carte blanche
// arrondie, bouton vert en pilule), comme FenetreProche.
// =============================================================================

export type MotifSignalement =
  | "haine"
  | "sexuel"
  | "danger"
  | "spam"
  | "autre";

const MOTIFS: { cle: MotifSignalement; libelle: string }[] = [
  { cle: "haine", libelle: "Haine, insultes ou harcèlement" },
  { cle: "sexuel", libelle: "Contenu sexuel" },
  { cle: "danger", libelle: "Cette personne semble en danger" },
  { cle: "spam", libelle: "Spam ou hors sujet" },
  { cle: "autre", libelle: "Autre raison" },
];

const VERT = "rgba(51,164,116,0.85)";
const NOIR = "rgba(0,0,0,0.8)";
const GRIS = "rgba(0,0,0,0.55)";

export default function FenetreSignalement({
  ouvert,
  onFermer,
  onEnvoyer,
}: {
  ouvert: boolean;
  onFermer: () => void;
  onEnvoyer: (motif: MotifSignalement, precision: string) => void;
}) {
  const [motif, setMotif] = useState<MotifSignalement | null>(null);
  const [precision, setPrecision] = useState("");
  const [envoye, setEnvoye] = useState(false);

  useEffect(() => {
    if (ouvert) {
      setMotif(null);
      setPrecision("");
      setEnvoye(false);
    }
  }, [ouvert]);

  useEffect(() => {
    if (!ouvert) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onFermer();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [ouvert, onFermer]);

  /* « Autre raison » sans explication n'apprend rien : on demande deux mots.
     C'est aussi ce que le DSA attend d'un signalement, une explication. */
  const complet = motif !== null && (motif !== "autre" || precision.trim().length >= 3);

  const envoyer = () => {
    if (!complet || !motif) return;
    onEnvoyer(motif, precision.trim());
    setEnvoye(true);
  };

  return (
    <>
      <div
        onClick={onFermer}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 60,
          background: "rgba(255,255,255,0.45)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          opacity: ouvert ? 1 : 0,
          visibility: ouvert ? "visible" : "hidden",
          transition: "opacity .35s ease, visibility .35s",
        }}
      />

      {/* La zone de texte ne change PAS d'aspect au clic : ni contour noir du
          navigateur, ni bordure recolorée. Elle garde son gris clair. */}
      <style>{`.fs-zone:focus{outline:none;border-color:rgba(0,0,0,0.14);}`}</style>

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Signaler ce commentaire"
        style={{
          position: "fixed",
          zIndex: 70,
          left: "50%",
          top: "50%",
          width: "min(430px, 92vw)",
          background: "#fff",
          borderRadius: 22,
          boxShadow: "0 30px 80px -24px rgba(0,0,0,0.40)",
          padding: "32px 30px 28px",
          boxSizing: "border-box",
          transformOrigin: "50% 115%",
          transform: ouvert
            ? "translate(-50%,-50%) scale(1)"
            : "translate(-50%,-50%) scale(.18)",
          opacity: ouvert ? 1 : 0,
          visibility: ouvert ? "visible" : "hidden",
          transition:
            "transform .42s cubic-bezier(.34,1.4,.5,1), opacity .3s ease, visibility .42s",
        }}
      >
        {!envoye ? (
          <>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: NOIR, margin: "0 0 8px" }}>
              Signaler ce commentaire
            </h3>
            <p style={{ fontSize: 14, color: GRIS, lineHeight: 1.55, margin: "0 0 20px" }}>
              Dites-nous ce qui pose problème. Le message sera réexaminé.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {MOTIFS.map((m) => {
                const choisi = motif === m.cle;
                return (
                  <button
                    key={m.cle}
                    type="button"
                    onClick={() => setMotif(m.cle)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      width: "100%",
                      textAlign: "left",
                      background: choisi ? "rgba(51,164,116,0.08)" : "none",
                      border: "none",
                      borderRadius: 12,
                      padding: "11px 12px",
                      font: "inherit",
                      fontSize: 14.5,
                      color: choisi ? NOIR : "rgba(0,0,0,0.7)",
                      fontWeight: choisi ? 700 : 400,
                      cursor: "pointer",
                      transition: "background .2s",
                    }}
                  >
                    <span
                      aria-hidden
                      style={{
                        flex: "none",
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        border: choisi ? `5px solid ${VERT}` : "1.5px solid rgba(0,0,0,0.25)",
                        boxSizing: "border-box",
                        transition: "border .2s",
                      }}
                    />
                    {m.libelle}
                  </button>
                );
              })}
            </div>

            {motif === "autre" && (
              <textarea
                className="fs-zone"
                autoFocus
                value={precision}
                maxLength={300}
                onChange={(e) => setPrecision(e.target.value)}
                placeholder="En quelques mots, qu'est-ce qui pose problème ?"
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  minHeight: 76,
                  resize: "vertical",
                  marginTop: 12,
                  border: "1px solid rgba(0,0,0,0.14)",
                  borderRadius: 12,
                  padding: "11px 13px",
                  font: "inherit",
                  fontSize: 14.5,
                  lineHeight: 1.55,
                  color: NOIR,
                  background: "#fff",
                }}
              />
            )}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: 18,
                marginTop: 22,
              }}
            >
              <button
                type="button"
                onClick={onFermer}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  font: "inherit",
                  fontSize: 14,
                  color: GRIS,
                  cursor: "pointer",
                }}
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={envoyer}
                disabled={!complet}
                style={{
                  background: VERT,
                  color: "#fff",
                  border: "none",
                  borderRadius: 999,
                  padding: "10px 26px",
                  font: "inherit",
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: complet ? "pointer" : "default",
                  opacity: complet ? 1 : 0.4,
                  transition: "opacity .2s",
                }}
              >
                Envoyer
              </button>
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center" }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: NOIR, margin: "0 0 10px" }}>
              C&apos;est envoyé, merci
            </h3>
            <p style={{ fontSize: 14.5, color: GRIS, lineHeight: 1.6, margin: 0 }}>
              Merci d&apos;avoir prévenu. Ce message va être examiné rapidement.
              Le commentaire reste en ligne en attendant.
            </p>
            <button
              type="button"
              onClick={onFermer}
              style={{
                marginTop: 22,
                background: VERT,
                color: "#fff",
                border: "none",
                borderRadius: 999,
                padding: "10px 30px",
                font: "inherit",
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Fermer
            </button>
          </div>
        )}
      </div>
    </>
  );
}
