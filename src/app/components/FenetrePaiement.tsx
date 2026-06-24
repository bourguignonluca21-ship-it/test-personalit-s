"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { CSSProperties, ReactNode } from "react";
import { createClient } from "../lib/supabase/client";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

const GREEN = "rgba(51,164,116,0.85)";
const GREEN_SOLID = "#2f9568";
const INK = "rgba(0,0,0,0.85)";
const INK75 = "rgba(0,0,0,0.75)";
const INK50 = "rgba(0,0,0,0.50)";
const INK35 = "rgba(0,0,0,0.35)";
const LINE = "rgba(0,0,0,0.10)";
const SHADOW = "0 18px 55px -20px rgba(0,0,0,0.32)";

// Stripe.js chargé une seule fois (clé publiable).
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// Formulaire de paiement Stripe (doit vivre à l'intérieur de <Elements>).
function PaiementInner({
  prix,
  unlockHref,
  onSuccess,
}: {
  prix: string;
  unlockHref: string;
  onSuccess: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function pay() {
    if (!stripe || !elements) return;
    setLoading(true);
    setErr(null);
    // Adresse de retour après les moyens qui redirigent (Klarna, etc.). La carte, elle,
    // ne redirige pas et revient ici directement.
    const returnUrl = `${window.location.origin}${window.location.pathname}${unlockHref}`;
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: returnUrl },
      redirect: "if_required",
    });
    if (error) {
      setErr(error.message ?? "Le paiement n'a pas pu aboutir.");
      setLoading(false);
      return;
    }
    if (paymentIntent && paymentIntent.status === "succeeded") {
      onSuccess();
      return;
    }
    setLoading(false);
  }

  return (
    <div>
      <PaymentElement options={{ layout: "tabs" }} />
      {err && (
        <p style={{ fontSize: 12, color: "#c0392b", textAlign: "center", margin: "10px 0 0", lineHeight: 1.4 }}>{err}</p>
      )}
      <button
        type="button"
        onClick={pay}
        disabled={!stripe || loading}
        style={{
          width: "100%",
          border: "none",
          cursor: loading ? "default" : "pointer",
          color: "#fff",
          background: GREEN,
          font: "inherit",
          fontSize: 16,
          fontWeight: 700,
          padding: 15,
          borderRadius: 999,
          marginTop: 16,
          opacity: loading ? 0.75 : 1,
        }}
      >
        {loading ? "Paiement en cours…" : `Payer ${prix}`}
      </button>
    </div>
  );
}

// Fenêtre de déblocage : s'ouvre par-dessus la page résultat (pas de changement de page),
// le fond passe en léger flou, écran « choix » (fond vert de marque) qui glisse vers l'écran
// « paiement » (blanc épuré). Au paiement (prototype), on navigue vers unlockHref (?paid=1)
// et le serveur re-rend le rapport déflouté. Le vrai paiement viendra se brancher ici.
export default function FenetrePaiement({
  unlockHref,
  produitNom,
  prix = "7,90 €",
  ancreRetour,
  triggerClassName,
  triggerStyle,
  children,
}: {
  unlockHref: string;
  produitNom: string;
  prix?: string;
  ancreRetour?: string;
  triggerClassName?: string;
  triggerStyle?: CSSProperties;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [view, setView] = useState<"choix" | "connexion" | "inscription">("choix");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [supabase] = useState(() => createClient());
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [thumb, setThumb] = useState({ top: 0, height: 0, show: false });
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const s1Ref = useRef<HTMLDivElement>(null);
  const s2Ref = useRef<HTMLDivElement>(null);
  const [trackH, setTrackH] = useState<number | undefined>(undefined);

  // La fenêtre prend la hauteur de l'écran actif (et l'anime au passage choix -> paiement),
  // pour ne jamais être plus grande que son contenu.
  useEffect(() => {
    if (!open) return;
    const el = step === 1 ? s1Ref.current : s2Ref.current;
    if (!el) return;
    const maj = () => setTrackH(el.offsetHeight);
    maj();
    const ro = new ResizeObserver(maj);
    ro.observe(el);
    return () => ro.disconnect();
  }, [open, step, view]);

  function openModal() {
    setStep(1);
    setView("choix");
    setEmail("");
    setPassword("");
    setAuthError(null);
    setClientSecret(null);
    setOpen(true);
  }
  function closeModal() {
    setOpen(false);
    if (ancreRetour) {
      requestAnimationFrame(() => {
        document.getElementById(ancreRetour)?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    }
  }
  function payer() {
    router.push(unlockHref);
  }
  function retourChoix() {
    setView("choix");
    setEmail("");
    setPassword("");
    setAuthError(null);
  }
  async function handleSignIn() {
    setAuthError(null);
    setAuthLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setAuthLoading(false);
    if (error) {
      setAuthError("Email ou mot de passe incorrect.");
      return;
    }
    setStep(2);
  }
  async function handleSignUp() {
    setAuthError(null);
    setAuthLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setAuthLoading(false);
    if (error) {
      setAuthError(error.message);
      return;
    }
    setStep(2);
  }

  // Fermeture à Échap. On NE bloque PAS le scroll du fond : il reste défilable.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeModal();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  // Sur l'écran paiement, on demande au serveur de créer l'intention de paiement (montant
  // fixé côté serveur) et on récupère le client_secret pour afficher le formulaire Stripe.
  useEffect(() => {
    if (!open || step !== 2 || clientSecret) return;
    let annule = false;
    fetch("/api/paiement/intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profil: produitNom }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (!annule && d?.clientSecret) setClientSecret(d.clientSecret);
      })
      .catch(() => {});
    return () => {
      annule = true;
    };
  }, [open, step, clientSecret, produitNom]);

  // Curseur de scroll vert custom (comme le menu de progression) : taille et position calculées.
  function updateThumb() {
    const el = scrollRef.current;
    if (!el) return;
    const vh = el.clientHeight;
    const sh = el.scrollHeight;
    if (sh <= vh + 1) {
      setThumb((t) => (t.show ? { ...t, show: false } : t));
      return;
    }
    const pad = 8;
    const track = vh - pad * 2;
    const h = Math.max(28, track * (vh / sh));
    const maxScroll = sh - vh;
    const top = pad + (maxScroll ? (el.scrollTop / maxScroll) * (track - h) : 0);
    setThumb({ top, height: h, show: true });
  }

  // Recalcule le curseur quand on est au paiement et que le contenu change (formulaire qui se déplie).
  useEffect(() => {
    if (!open || step !== 2) return;
    const content = contentRef.current;
    if (!content) return;
    updateThumb();
    const ro = new ResizeObserver(() => updateThumb());
    ro.observe(content);
    return () => ro.disconnect();
  }, [open, step, clientSecret]); // eslint-disable-line react-hooks/exhaustive-deps

  const pillPrimary: CSSProperties = {
    width: "100%",
    border: "none",
    background: GREEN,
    color: "#fff",
    borderRadius: 999,
    padding: "15px 22px",
    cursor: "pointer",
    font: "inherit",
    fontSize: 16,
    fontWeight: 700,
    textAlign: "center",
  };
  const pillSmall: CSSProperties = {
    flex: 1,
    border: "none",
    background: "rgba(51,164,116,0.10)",
    color: GREEN_SOLID,
    borderRadius: 999,
    padding: "11px 12px",
    cursor: "pointer",
    font: "inherit",
    fontSize: 13,
    fontWeight: 600,
    textAlign: "center",
  };
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

  return (
    <>
      <button type="button" className={triggerClassName} style={triggerStyle} onClick={openModal}>
        {children}
      </button>

      {/* BACKDROP : floute légèrement la page résultat restée derrière */}
      <div
        onClick={closeModal}
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

      {/* FENÊTRE : grandit depuis le bas (vers le bouton) */}
      <div
        role="dialog"
        aria-modal="true"
        style={{
          position: "fixed",
          zIndex: 70,
          left: "50%",
          top: "50%",
          width: "min(408px, 92vw)",
          background:
            "linear-gradient(to top, rgba(51,164,116,0.12) 0%, rgba(51,164,116,0.05) 35%, transparent 65%), #fff",
          borderRadius: 24,
          boxShadow: SHADOW,
          overflow: "hidden",
          maxHeight: "92vh",
          transformOrigin: "50% 115%",
          transform: open ? "translate(-50%,-50%) scale(1)" : "translate(-50%,-50%) scale(.18)",
          opacity: open ? 1 : 0,
          visibility: open ? "visible" : "hidden",
          transition: "transform .42s cubic-bezier(.34,1.4,.5,1), opacity .3s ease, visibility .42s",
        }}
      >
        <style>{".fp-noscroll{scrollbar-width:none}.fp-noscroll::-webkit-scrollbar{display:none}.fp-thumb{width:4px;background:rgba(51,164,116,0.85);transition:width .25s ease,background .25s ease}.fp-thumbwrap:hover .fp-thumb{width:7px;background:rgba(51,164,116,1)}"}</style>

        {/* Fermer */}
        <button
          type="button"
          onClick={closeModal}
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

        {/* BANDE HAUT : emplacement pour le logo (à remplacer plus tard). Le dégradé vert de
            la home est porté par toute la fenêtre. Commune aux 2 écrans. */}
        <div
          style={{
            position: "relative",
            padding: "28px 26px 20px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 132,
              height: 42,
              margin: "0 auto",
              borderRadius: 10,
              border: "1px dashed rgba(0,0,0,0.16)",
              display: "grid",
              placeItems: "center",
              color: INK35,
              fontSize: 11.5,
              fontWeight: 600,
              letterSpacing: "0.03em",
            }}
          >
            Ton logo
          </div>
        </div>

        {/* Conteneur à hauteur animée : la fenêtre épouse l'écran actif */}
        <div style={{ overflow: "hidden", height: trackH, transition: "height .4s ease" }}>
        {/* Piste qui glisse entre écran 1 (choix) et écran 2 (paiement) */}
        <div
          style={{
            display: "flex",
            width: "200%",
            alignItems: "flex-start",
            transform: step === 2 ? "translateX(-50%)" : "translateX(0)",
            transition: "transform .4s ease",
          }}
        >
          {/* ===== ÉCRAN 1 : choix / connexion (hauteur figée pour ne pas changer de taille) ===== */}
          <div ref={s1Ref} style={{ width: "50%", flex: "none", padding: "6px 26px 28px" }}>
            <div
              style={{
                minHeight: 190,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 10,
              }}
            >
              {view === "choix" ? (
                <>
                  <button type="button" onClick={() => setStep(2)} style={pillPrimary}>
                    Continuer vers le paiement
                  </button>
                  <div style={{ display: "flex", gap: 10 }}>
                    <button type="button" onClick={() => setView("connexion")} style={pillSmall}>
                      Se connecter
                    </button>
                    <button type="button" onClick={() => setView("inscription")} style={pillSmall}>
                      Créer un compte
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Adresse email"
                    autoComplete="email"
                    style={inputPill}
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mot de passe"
                    autoComplete={view === "connexion" ? "current-password" : "new-password"}
                    style={inputPill}
                  />
                  {authError && (
                    <p style={{ fontSize: 12, color: "#c0392b", textAlign: "center", margin: 0, lineHeight: 1.4 }}>
                      {authError}
                    </p>
                  )}
                  <button
                    type="button"
                    disabled={authLoading}
                    onClick={view === "connexion" ? handleSignIn : handleSignUp}
                    style={{ ...pillPrimary, opacity: authLoading ? 0.7 : 1 }}
                  >
                    {authLoading ? "Un instant…" : view === "connexion" ? "Se connecter" : "Créer mon compte"}
                  </button>
                  <button
                    type="button"
                    onClick={retourChoix}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      font: "inherit",
                      fontSize: 13,
                      color: INK50,
                      padding: "2px 0",
                      textAlign: "center",
                    }}
                  >
                    Retour
                  </button>
                </>
              )}
            </div>
          </div>

          {/* ===== ÉCRAN 2 : PAIEMENT (sur le dégradé, accents verts) ===== */}
          <div ref={s2Ref} className="fp-thumbwrap" style={{ width: "50%", flex: "none", position: "relative" }}>
            <div
              ref={scrollRef}
              onScroll={updateThumb}
              className="fp-noscroll"
              style={{
                padding: "6px 28px 28px",
                maxHeight: "calc(92vh - 110px)",
                overflowY: "auto",
                overflowX: "hidden",
              }}
            >
              <div ref={contentRef}>
            <button
              type="button"
              onClick={() => {
                setStep(1);
                setView("choix");
              }}
              aria-label="Retour"
              style={{
                display: "inline-flex",
                alignItems: "center",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: GREEN_SOLID,
                padding: 0,
                marginBottom: 14,
              }}
            >
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <div style={{ marginBottom: 16 }}>
              <span
                style={{
                  display: "inline-block",
                  background: GREEN,
                  color: "#fff",
                  borderRadius: 999,
                  padding: "8px 18px",
                  fontSize: 16,
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                }}
              >
                Finalise ton accès
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 12,
                paddingBottom: 14,
                borderBottom: `1px solid ${LINE}`,
              }}
            >
              <div>
                <p style={{ fontSize: 14.5, fontWeight: 700, margin: "0 0 2px", color: INK }}>Rapport complet</p>
                <p style={{ fontSize: 12.5, color: INK50, margin: 0 }}>{produitNom}, accès à vie</p>
              </div>
              <span style={{ fontSize: 15, fontWeight: 700, whiteSpace: "nowrap", color: INK }}>{prix}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", margin: "14px 0 20px" }}>
              <span style={{ fontSize: 14.5, color: INK75, fontWeight: 600 }}>Total</span>
              <span style={{ fontSize: 26, fontWeight: 800, color: INK }}>
                {prix} <small style={{ fontSize: 12, color: INK35, fontWeight: 500, marginLeft: 5 }}>TVA incl.</small>
              </span>
            </div>

            {clientSecret ? (
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret,
                  appearance: {
                    theme: "stripe",
                    variables: {
                      colorPrimary: GREEN_SOLID,
                      colorText: "rgba(0,0,0,0.85)",
                      colorTextSecondary: "rgba(0,0,0,0.50)",
                      fontFamily:
                        "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                      borderRadius: "12px",
                      spacingUnit: "4px",
                    },
                  },
                }}
              >
                <PaiementInner prix={prix} unlockHref={unlockHref} onSuccess={payer} />
              </Elements>
            ) : (
              <div
                style={{
                  background: "rgba(51,164,116,0.06)",
                  borderRadius: 14,
                  padding: "20px",
                  textAlign: "center",
                  color: GREEN_SOLID,
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                Chargement du paiement sécurisé…
              </div>
            )}

            <p style={{ fontSize: 11.5, color: INK35, textAlign: "center", margin: "12px 0 0", lineHeight: 1.5 }}>
              Paiement unique, sans abonnement. Accès immédiat à ton rapport.
            </p>
              </div>
            </div>
            {thumb.show && (
              <div
                className="fp-thumb"
                style={{
                  position: "absolute",
                  right: 6,
                  top: thumb.top,
                  height: thumb.height,
                  borderRadius: 999,
                  pointerEvents: "none",
                }}
              />
            )}
          </div>
        </div>
        </div>
      </div>
    </>
  );
}
