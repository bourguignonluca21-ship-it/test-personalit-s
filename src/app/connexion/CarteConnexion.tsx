"use client";

import { useState, type CSSProperties } from "react";

/*
 * Élément 3 : la carte connexion / création de compte.
 * VISUEL UNIQUEMENT pour l'instant : aucun appel Supabase, les boutons
 * ne font rien. On branchera la vraie logique quand le design sera validé.
 * DA reprise de FenetrePaiement (pilules, vert de marque, contours doux).
 */

const VERT = "rgba(51,164,116,0.85)";
const INK = "rgba(0,0,0,0.75)";
const INK50 = "rgba(0,0,0,0.50)";
const LINE = "rgba(0,0,0,0.12)";

const inputPill: CSSProperties = {
  width: "100%",
  border: `1px solid ${LINE}`,
  borderRadius: 999,
  padding: "12px 18px",
  fontSize: 14,
  font: "inherit",
  color: INK,
  outline: "none",
  background: "#fff",
  boxSizing: "border-box",
};

function ChampMotDePasse({ placeholder }: { placeholder: string }) {
  const [visible, setVisible] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <input
        type={visible ? "text" : "password"}
        placeholder={placeholder}
        style={{ ...inputPill, paddingRight: 46 }}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Masquer le mot de passe" : "Afficher le mot de passe"}
        style={{
          position: "absolute",
          right: 14,
          top: "50%",
          transform: "translateY(-50%)",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: INK50,
          display: "grid",
          placeItems: "center",
        }}
      >
        {visible ? (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12z" />
            <circle cx="12" cy="12" r="2.6" />
            <path d="M4 4l16 16" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12z" />
            <circle cx="12" cy="12" r="2.6" />
          </svg>
        )}
      </button>
    </div>
  );
}

const boutonGoogle = (
  <button
    type="button"
    className="cx-pill"
    style={{
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      border: `1px solid ${LINE}`,
      background: "#fff",
      color: INK,
      borderRadius: 999,
      padding: "12px 18px",
      cursor: "pointer",
      font: "inherit",
      fontSize: 14.5,
      fontWeight: 600,
      boxShadow: "0 6px 18px -10px rgba(0,0,0,0.18)",
    }}
  >
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.81.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18z" />
      <path fill="#FBBC05" d="M3.97 10.72a5.4 5.4 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0 8.1l3.01-2.33z" />
      <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.9 11.43 0 9 0A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z" />
    </svg>
    Continuer avec Google
  </button>
);

const separateurOu = (
  <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "2px 0" }}>
    <span style={{ flex: 1, height: 1, background: LINE }} />
    <span style={{ fontSize: 11.5, color: INK50 }}>ou</span>
    <span style={{ flex: 1, height: 1, background: LINE }} />
  </div>
);

export default function CarteConnexion() {
  const [mode, setMode] = useState<"connexion" | "inscription">("connexion");

  return (
    <div className="relative mx-auto w-full max-w-md text-left">
      <style>{".cx-pill{transition:transform .2s ease}.cx-pill:hover{transform:scale(1.04)}.cx-link{color:rgba(0,0,0,0.50);transition:color .2s ease;text-decoration:underline;text-underline-offset:3px}.cx-link:hover{color:rgba(0,0,0,0.78)}"}</style>

      <div
        style={{
          background: "#fff",
          borderRadius: 24,
          border: `1px solid ${LINE}`,
          boxShadow: "0 24px 60px -30px rgba(0,0,0,0.25)",
          padding: "26px 26px 24px",
        }}
      >
        {/* Bascule Se connecter / Créer un compte */}
        <div
          style={{
            display: "flex",
            gap: 4,
            background: "rgba(0,0,0,0.05)",
            borderRadius: 999,
            padding: 4,
            marginBottom: 22,
          }}
        >
          {(["connexion", "inscription"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              style={{
                flex: 1,
                border: "none",
                borderRadius: 999,
                padding: "10px 12px",
                font: "inherit",
                fontSize: 13.5,
                fontWeight: 600,
                cursor: "pointer",
                background: mode === m ? "#fff" : "transparent",
                color: mode === m ? INK : INK50,
                boxShadow: mode === m ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
                transition: "background .25s ease, color .25s ease, box-shadow .25s ease",
              }}
            >
              {m === "connexion" ? "Se connecter" : "Créer un compte"}
            </button>
          ))}
        </div>

        {mode === "connexion" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <input type="email" placeholder="Adresse email" style={inputPill} />
            <ChampMotDePasse placeholder="Mot de passe" />
            <button
              type="button"
              className="cx-pill"
              style={{
                width: "100%",
                border: "none",
                borderRadius: 999,
                padding: "13px 18px",
                background: VERT,
                color: "#fff",
                font: "inherit",
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Se connecter
            </button>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <button type="button" className="cx-link" style={{ background: "none", border: "none", cursor: "pointer", font: "inherit", fontSize: 12.5, padding: 0 }}>
                J&apos;ai oublié mon mot de passe
              </button>
              <button type="button" className="cx-link" style={{ background: "none", border: "none", cursor: "pointer", font: "inherit", fontSize: 12.5, padding: 0 }}>
                Recevoir un code par email
              </button>
            </div>
            {separateurOu}
            {boutonGoogle}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <input type="text" placeholder="Ton prénom ou pseudonyme" style={inputPill} />
            <input type="email" placeholder="Adresse email" style={inputPill} />
            <ChampMotDePasse placeholder="Mot de passe" />
            <ChampMotDePasse placeholder="Confirme ton mot de passe" />
            <button
              type="button"
              className="cx-pill"
              style={{
                width: "100%",
                border: "none",
                borderRadius: 999,
                padding: "13px 18px",
                background: VERT,
                color: "#fff",
                font: "inherit",
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Je crée mon compte
            </button>
            <p style={{ margin: 0, fontSize: 12, color: INK50, textAlign: "center", lineHeight: 1.5 }}>
              Tes données restent privées. En créant un compte, tu acceptes les{" "}
              <a href="/cgu" className="cx-link">CGU</a> et la{" "}
              <a href="/confidentialite" className="cx-link">politique de confidentialité</a>.
            </p>
            {separateurOu}
            {boutonGoogle}
          </div>
        )}
      </div>
    </div>
  );
}
