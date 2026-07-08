"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { createClient } from "../lib/supabase/client";

/*
 * LA fenêtre de connexion du site (parcours principal, validé avec Luca) :
 * email → code à 6 chiffres → coche de succès → redirection.
 * - Compte créé automatiquement si l'adresse est nouvelle (signInWithOtp
 *   avec shouldCreateUser), aucun mot de passe dans le parcours.
 * - Après le code : pas encore de pseudo (metadata `prenom`) → /configurer-profil
 *   (nouveau compte à configurer), sinon → /profil.
 * Ouverte par « Se connecter / Crée un compte » de la navbar (composant
 * contrôlé : props open / onClose). DA reprise de FenetrePaiement.
 * NOTE : les codes partent par le SMTP Gmail de TEST (quota limité), à
 * remplacer par Resend SMTP + domaine à la mise en ligne.
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
const pillPrimary: CSSProperties = {
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
};
const linkSmall: CSSProperties = {
  background: "none",
  border: "none",
  cursor: "pointer",
  font: "inherit",
  fontSize: 12.5,
  padding: 0,
  textAlign: "center",
};

export default function FenetreConnexion({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [codeEnvoye, setCodeEnvoye] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);
  const [succes, setSucces] = useState(false);
  // Écran « Configure ton profil » DANS la fenêtre (après la coche, pour un
  // compte tout neuf) : champ prénom + case légale + Continuer.
  const [config, setConfig] = useState(false);
  const [prenom, setPrenom] = useState("");
  const [accepte, setAccepte] = useState(false);
  // Portail : la fenêtre est rendue dans <body>, PAS dans la navbar. Le
  // backdrop-filter de la navbar ferait sinon caler le position:fixed sur
  // elle (fenêtre collée en haut) au lieu de l'écran. Monté = côté client.
  const [monte, setMonte] = useState(false);
  useEffect(() => setMonte(true), []);

  // Fermeture à Échap.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  async function envoyerCode() {
    setErreur(null);
    setLoading(true);
    // Crée le compte si l'adresse est nouvelle : inscription invisible.
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: true },
    });
    setLoading(false);
    if (error) {
      setErreur(error.message);
      return;
    }
    setCode("");
    setCodeEnvoye(true);
  }

  // Connexion « Continuer avec Google » (reprend le mécanisme de la fenêtre
  // de paiement). Google impose un aller-retour : au retour, /auth/callback
  // pose la session puis renvoie sur /profil (paramètre next).
  async function connexionGoogle() {
    setErreur(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent("/profil")}`,
      },
    });
    if (error) setErreur("La connexion Google n'a pas pu démarrer.");
  }

  async function verifierCode() {
    setErreur(null);
    setLoading(true);
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: code.trim(),
      type: "email",
    });
    setLoading(false);
    if (error) {
      setErreur("Code incorrect ou expiré.");
      return;
    }
    // Coche de succès. Ensuite :
    // - compte déjà configuré (pseudo présent) → /profil, la fenêtre s'efface
    //   en fondu doux et on remet l'état à zéro ;
    // - compte tout neuf → l'écran « Configure ton profil » s'affiche DANS la
    //   fenêtre, dans la continuité de l'animation.
    setSucces(true);
    const dejaConfigure = Boolean(data.user?.user_metadata?.prenom);
    if (dejaConfigure) {
      window.setTimeout(() => router.push("/profil"), 900);
      window.setTimeout(() => onClose(), 1250);
      window.setTimeout(() => reinitialiser(), 1800);
    } else {
      window.setTimeout(() => {
        setSucces(false);
        setConfig(true);
      }, 1100);
    }
  }

  // Enregistre prénom + date d'acceptation des CGU (précieuse en cas de
  // litige), puis coche de succès → /profil → fondu de fermeture.
  async function terminerConfiguration() {
    if (!(prenom.trim() && accepte) || loading) return;
    setErreur(null);
    setLoading(true);
    const { error } = await supabase.auth.updateUser({
      data: {
        prenom: prenom.trim(),
        cgu_acceptees_le: new Date().toISOString(),
      },
    });
    setLoading(false);
    if (error) {
      setErreur("Impossible d'enregistrer, réessaie.");
      return;
    }
    setSucces(true);
    window.setTimeout(() => router.push("/profil"), 900);
    window.setTimeout(() => onClose(), 1250);
    window.setTimeout(() => reinitialiser(), 1800);
  }

  function reinitialiser() {
    setSucces(false);
    setCodeEnvoye(false);
    setConfig(false);
    setCode("");
    setEmail("");
    setPrenom("");
    setAccepte(false);
    setErreur(null);
  }

  if (!monte) return null;

  return createPortal(
    <>
      {/* Fond : floute légèrement la page derrière */}
      <div
        onClick={onClose}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 60,
          background: "rgba(255,255,255,0.45)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          opacity: open ? 1 : 0,
          visibility: open ? "visible" : "hidden",
          transition: "opacity .35s ease, visibility .35s",
        }}
      />

      {/* La fenêtre */}
      <div
        role="dialog"
        aria-modal="true"
        style={{
          position: "fixed",
          zIndex: 70,
          left: "50%",
          top: "50%",
          width: "min(408px, 92vw)",
          background: "#fff",
          borderRadius: 24,
          boxShadow: "0 30px 90px -20px rgba(0,0,0,0.35)",
          overflow: "hidden",
          transformOrigin: "50% 0%",
          // Après un succès, la fermeture est un PUR fondu (pas de rétrécissement).
          transform:
            open || succes
              ? "translate(-50%,-50%) scale(1)"
              : "translate(-50%,-50%) scale(.18)",
          opacity: open ? 1 : 0,
          visibility: open ? "visible" : "hidden",
          transition:
            "transform .42s cubic-bezier(.34,1.4,.5,1), opacity .3s ease, visibility .42s",
        }}
      >
        <style>{".fc-link{color:rgba(0,0,0,0.50);transition:color .2s ease}.fc-link:hover{color:rgba(0,0,0,0.78)}.fc-pill{transition:transform .2s ease}.fc-pill:hover{transform:scale(1.03)}"}</style>

        {/* Fermer */}
        <button
          type="button"
          onClick={onClose}
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
            color: INK50,
          }}
        >
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <div style={{ padding: "40px 32px 32px", display: "flex", flexDirection: "column", gap: 16 }}>
          <p style={{ margin: 0, fontSize: 26, fontWeight: 700, color: INK, textAlign: "center" }}>
            {config ? "Configure ton profil" : codeEnvoye ? "Ton code est parti" : "Connecte-toi"}
          </p>

          {config ? (
            <>
              <p style={{ margin: "0 0 6px", fontSize: 15, color: INK50, textAlign: "center", lineHeight: 1.6 }}>
                Encore une petite étape et ton espace est prêt.
              </p>
              <div style={{ textAlign: "left" }}>
                <label
                  htmlFor="fc-prenom"
                  style={{ display: "block", fontSize: 13.5, fontWeight: 600, color: INK, marginBottom: 8 }}
                >
                  Ton prénom ou pseudonyme
                </label>
                <input
                  id="fc-prenom"
                  type="text"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") terminerConfiguration(); }}
                  placeholder="Ton prénom"
                  autoComplete="given-name"
                  style={inputPill}
                />
              </div>
              {/* Case légale : DÉCOCHÉE par défaut (RGPD) */}
              <label
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  marginTop: 4,
                  cursor: "pointer",
                  fontSize: 12.5,
                  color: INK50,
                  lineHeight: 1.55,
                  textAlign: "left",
                }}
              >
                {/* Case custom : carré qui se remplit de vert, coche blanche
                    qui apparaît en fondu et reste */}
                <span style={{ position: "relative", display: "inline-flex", marginTop: 2, flexShrink: 0 }}>
                  <input
                    type="checkbox"
                    checked={accepte}
                    onChange={(e) => setAccepte(e.target.checked)}
                    style={{
                      appearance: "none",
                      WebkitAppearance: "none",
                      width: 17,
                      height: 17,
                      border: `1.5px solid ${accepte ? VERT : "rgba(0,0,0,0.25)"}`,
                      borderRadius: 5,
                      background: accepte ? VERT : "#fff",
                      cursor: "pointer",
                      transition: "background .25s ease, border-color .25s ease",
                    }}
                  />
                  <svg
                    viewBox="0 0 24 24"
                    width="11"
                    height="11"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="3.5"
                    aria-hidden
                    style={{
                      position: "absolute",
                      inset: 0,
                      margin: "auto",
                      pointerEvents: "none",
                      opacity: accepte ? 1 : 0,
                      transition: "opacity .3s ease",
                    }}
                  >
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span>
                  J&apos;ai au moins 16 ans et j&apos;accepte les{" "}
                  <a href="/conditions" target="_blank" rel="noopener noreferrer" className="fc-link" style={{ textDecoration: "underline", textUnderlineOffset: 3 }}>
                    Conditions d&apos;utilisation
                  </a>{" "}
                  et la{" "}
                  <a href="/confidentialite" target="_blank" rel="noopener noreferrer" className="fc-link" style={{ textDecoration: "underline", textUnderlineOffset: 3 }}>
                    Politique de confidentialité
                  </a>
                  .
                </span>
              </label>
              {erreur && (
                <p style={{ fontSize: 12, color: "#c0392b", textAlign: "center", margin: 0, lineHeight: 1.4 }}>
                  {erreur}
                </p>
              )}
              {/* Continuer : se remplit de vert par paliers — pâle au départ,
                  plus vert dès la 1re lettre du prénom (ou la case), plein
                  quand les deux sont bons. Efface les lettres → redevient pâle. */}
              <button
                type="button"
                className="fc-pill"
                disabled={!(prenom.trim() && accepte) || loading}
                onClick={terminerConfiguration}
                style={{
                  ...pillPrimary,
                  background:
                    prenom.trim() && accepte
                      ? VERT
                      : prenom.trim() || accepte
                        ? "rgba(51,164,116,0.55)"
                        : "rgba(51,164,116,0.35)",
                  cursor: prenom.trim() && accepte && !loading ? "pointer" : "default",
                  transition: "background .45s ease, transform .2s ease",
                }}
              >
                {loading ? "Un instant…" : "Continuer"}
              </button>
            </>
          ) : !codeEnvoye ? (
            <>
              <p style={{ margin: "0 0 6px", fontSize: 15, color: INK50, textAlign: "center", lineHeight: 1.6 }}>
                Entre ton adresse email, on t&apos;envoie un code de connexion.
              </p>
              {/* Champ email avec l'icône enveloppe (à la 16P) */}
              <div style={{ position: "relative" }}>
                <svg
                  viewBox="0 0 24 24"
                  width="17"
                  height="17"
                  fill="none"
                  stroke="rgba(0,0,0,0.35)"
                  strokeWidth="1.8"
                  aria-hidden
                  style={{ position: "absolute", left: 18, top: "50%", transform: "translateY(-50%)" }}
                >
                  <rect x="3" y="5" width="18" height="14" rx="2.5" />
                  <path d="M3.5 6.5L12 13l8.5-6.5" />
                </svg>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && email.includes("@")) envoyerCode(); }}
                  placeholder="Adresse email"
                  autoComplete="email"
                  style={{ ...inputPill, paddingLeft: 46 }}
                />
              </div>
              {erreur && (
                <p style={{ fontSize: 12, color: "#c0392b", textAlign: "center", margin: 0, lineHeight: 1.4 }}>
                  {erreur}
                </p>
              )}
              {/* Le bouton se « remplit » de vert en douceur dès que l'adresse
                  est valide, et redevient pâle si on l'efface. */}
              <button
                type="button"
                className="fc-pill"
                disabled={loading || !email.includes("@")}
                onClick={envoyerCode}
                style={{
                  ...pillPrimary,
                  background: email.includes("@") ? VERT : "rgba(51,164,116,0.35)",
                  cursor: loading || !email.includes("@") ? "default" : "pointer",
                  transition: "background .45s ease, transform .2s ease",
                }}
              >
                {loading ? "Un instant…" : "Recevoir mon code"}
              </button>
              {/* Connexion Google, juste sous « Recevoir mon code » (reprend
                  le bouton de la fenêtre de paiement). */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "2px 0" }}>
                <span style={{ flex: 1, height: 1, background: LINE }} />
                <span style={{ fontSize: 12, color: INK50 }}>ou</span>
                <span style={{ flex: 1, height: 1, background: LINE }} />
              </div>
              <button
                type="button"
                className="fc-pill"
                onClick={connexionGoogle}
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
            </>
          ) : (
            <>
              <p style={{ margin: "0 0 6px", fontSize: 13, color: INK50, textAlign: "center", lineHeight: 1.6 }}>
                Colle ici le code à 6 chiffres envoyé à {email}.
              </p>
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                onKeyDown={(e) => { if (e.key === "Enter" && code.length === 6) verifierCode(); }}
                placeholder="Code reçu par email"
                autoComplete="one-time-code"
                style={{ ...inputPill, textAlign: "center", letterSpacing: "0.3em", fontSize: 16 }}
              />
              {erreur && (
                <p style={{ fontSize: 12, color: "#c0392b", textAlign: "center", margin: 0, lineHeight: 1.4 }}>
                  {erreur}
                </p>
              )}
              {/* Même remplissage progressif : vert plein quand les 6 chiffres y sont. */}
              <button
                type="button"
                className="fc-pill"
                disabled={loading || code.length < 6}
                onClick={verifierCode}
                style={{
                  ...pillPrimary,
                  background: code.length === 6 ? VERT : "rgba(51,164,116,0.35)",
                  cursor: loading || code.length < 6 ? "default" : "pointer",
                  transition: "background .45s ease, transform .2s ease",
                }}
              >
                {loading ? "Un instant…" : "Se connecter"}
              </button>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 18 }}>
                <button type="button" className="fc-link" onClick={envoyerCode} style={linkSmall}>
                  Renvoyer le code
                </button>
                <button
                  type="button"
                  className="fc-link"
                  onClick={() => { setCodeEnvoye(false); setCode(""); setErreur(null); }}
                  style={linkSmall}
                >
                  Changer d&apos;email
                </button>
              </div>
            </>
          )}

          {/* Réassurance : cadenas + phrase, discret, sous les deux écrans */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              marginTop: 6,
              color: "rgba(0,0,0,0.40)",
            }}
          >
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <rect x="5" y="11" width="14" height="9" rx="2" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
            <span style={{ fontSize: 12 }}>
              {config ? "Tes données restent privées." : "Connexion sécurisée. Tes données restent privées."}
            </span>
          </div>
        </div>

        {/* Coche verte de succès (par-dessus la fenêtre) */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: "#fff",
            display: "grid",
            placeItems: "center",
            opacity: succes ? 1 : 0,
            visibility: succes ? "visible" : "hidden",
            transition: "opacity .35s ease, visibility .35s",
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: VERT,
              display: "grid",
              placeItems: "center",
              transform: succes ? "scale(1)" : "scale(.5)",
              transition: "transform .4s cubic-bezier(.34,1.4,.5,1)",
            }}
          >
            <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="#fff" strokeWidth="2.5">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}
