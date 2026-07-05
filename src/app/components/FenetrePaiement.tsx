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

// Critères du mot de passe (affichés + bloquants côté UI ; le vrai verrou se règle aussi dans Supabase).
function critsMotDePasse(pw: string) {
  return [
    { ok: pw.length >= 8, label: "8 caractères" },
    { ok: /[A-Z]/.test(pw), label: "une majuscule" },
    { ok: /[a-z]/.test(pw), label: "une minuscule" },
    { ok: /[0-9]/.test(pw), label: "un chiffre" },
  ];
}
function mdpValide(pw: string) {
  return critsMotDePasse(pw).every((c) => c.ok);
}

// Liste des critères qui se cochent en vert au fur et à mesure de la saisie.
function ChecklistMdp({ password }: { password: string }) {
  return (
    <ul style={{ listStyle: "none", margin: "7px 0 0", padding: "0 2px", display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center", gap: 4, boxSizing: "border-box" }}>
      {critsMotDePasse(password).map((c) => (
        <li
          key={c.label}
          style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10.5, color: c.ok ? "rgba(0,0,0,0.72)" : "rgba(0,0,0,0.40)", transition: "color .2s ease", whiteSpace: "nowrap" }}
        >
          <span style={{ display: "grid", placeItems: "center", width: 13, height: 13, borderRadius: "50%", flexShrink: 0, background: c.ok ? GREEN_SOLID : "rgba(0,0,0,0.10)", transition: "background .2s ease" }}>
            <svg viewBox="0 0 24 24" width="8" height="8" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12l5 5L20 6" />
            </svg>
          </span>
          {c.label}
        </li>
      ))}
    </ul>
  );
}

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
      // Échange la preuve de paiement contre le déblocage serveur : la route vérifie le
      // paiement chez Stripe, enregistre l'achat et pose le cookie de preuve d'achat.
      try {
        await fetch("/api/paiement/acces", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentIntentId: paymentIntent.id }),
        });
      } catch {
        // En cas d'échec réseau, le webhook Stripe enregistrera l'achat en filet de sécurité.
      }
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
  profilId,
  prix = "7,90 €",
  ancreRetour,
  triggerClassName,
  triggerStyle,
  children,
}: {
  unlockHref: string;
  produitNom: string;
  profilId: string;
  prix?: string;
  ancreRetour?: string;
  triggerClassName?: string;
  triggerStyle?: CSSProperties;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [view, setView] = useState<"choix" | "connexion" | "inscription" | "reset" | "nouveau" | "code">("choix");
  const [resetSent, setResetSent] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [code, setCode] = useState("");
  const [codeEnvoye, setCodeEnvoye] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const [mdpConfirm, setMdpConfirm] = useState("");
  const [prenom, setPrenom] = useState("");
  const [successAnim, setSuccessAnim] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmOuverte, setConfirmOuverte] = useState(false);
  const [mailEnvoye, setMailEnvoye] = useState(false);
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

  // Retour des moyens de paiement qui REDIRIGENT (ex. Klarna) : Stripe renvoie sur cette
  // page avec ?payment_intent=…&redirect_status=succeeded. On échange ça contre le déblocage
  // (la carte, elle, ne redirige pas et est gérée directement dans pay()).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("redirect_status") !== "succeeded" || !params.get("payment_intent")) return;
    const pi = params.get("payment_intent") as string;
    fetch("/api/paiement/acces", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentIntentId: pi }),
    }).finally(() => {
      // Nettoyer les paramètres Stripe de l'URL, puis rafraîchir pour déflouter.
      params.delete("payment_intent");
      params.delete("payment_intent_client_secret");
      params.delete("redirect_status");
      const clean = window.location.pathname + (params.toString() ? `?${params}` : "");
      window.history.replaceState(null, "", clean);
      router.refresh();
      window.scrollTo({ top: 0 });
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function openModal() {
    setStep(1);
    setView("choix");
    setEmail("");
    setPassword("");
    setMdpConfirm("");
    setPrenom("");
    setNewsletter(false);
    setAuthError(null);
    setClientSecret(null);
    setShowPassword(false);
    setResetSent(false);
    setConfirmOuverte(false);
    setMailEnvoye(false);
    setCode("");
    setCodeEnvoye(false);
    setSuccessAnim(false);
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
    // Le cookie de preuve d'achat vient d'être posé par /api/paiement/acces. On ferme la
    // fenêtre et on rafraîchit : le serveur relit le cookie et re-rend le rapport déflouté.
    setOpen(false);
    router.refresh();
    // On s'assure d'arriver en haut du rapport débloqué (pas là où on était au moment de payer).
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
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
    reussiteConnexion();
  }
  async function handleGoogle() {
    setAuthError(null);
    // Google oblige un aller-retour : on revient sur CETTE page (avec les scores) + un
    // marqueur ?oauth=1 pour rouvrir la fenêtre sur le paiement au retour.
    const retour = new URL(window.location.href);
    retour.searchParams.set("oauth", "1");
    const next = retour.pathname + retour.search;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}` },
    });
    if (error) setAuthError("La connexion Google n'a pas pu démarrer.");
  }
  async function handleSignUp() {
    setAuthError(null);
    setAuthLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { prenom: prenom.trim(), newsletter } },
    });
    setAuthLoading(false);
    if (error) {
      setAuthError(error.message);
      return;
    }
    reussiteConnexion();
  }
  async function handleReset() {
    setAuthError(null);
    setAuthLoading(true);
    // On renvoie le client sur SA page de résultat (avec un marqueur), pour rouvrir la fenêtre
    // sur l'écran "nouveau mot de passe" et enchaîner le paiement sans lui faire perdre son test.
    const retour = new URL(window.location.href);
    retour.searchParams.set("recovery", "1");
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: retour.toString(),
    });
    setAuthLoading(false);
    if (error) {
      setAuthError(error.message);
      return;
    }
    setResetSent(true);
  }
  async function handleSetNewPassword() {
    setAuthError(null);
    if (!mdpValide(password)) {
      setAuthError("Ton mot de passe ne remplit pas encore tous les critères.");
      return;
    }
    if (password !== password2) {
      setAuthError("Les deux mots de passe ne correspondent pas.");
      return;
    }
    setAuthLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setAuthLoading(false);
      setAuthError(error.message);
      return;
    }
    // Email de sécurité (best effort, ne bloque pas le succès). L'adresse est déduite
    // côté serveur à partir du jeton, pas envoyée par le navigateur.
    let mail = false;
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      if (token) {
        const r = await fetch("/api/auth/notif-mot-de-passe", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
        mail = r.ok;
      }
    } catch {
      // tant pis pour le mail, le changement de mot de passe a réussi
    }
    setAuthLoading(false);
    setMailEnvoye(mail);
    setPassword("");
    setPassword2("");
    // On ouvre la petite fenêtre de confirmation ; « Continuer » mènera au paiement.
    setConfirmOuverte(true);
  }
  async function handleSendCode() {
    setAuthError(null);
    setAuthLoading(true);
    // Envoie un code à 6 chiffres par email (crée le compte si besoin = inscription sans mot de passe).
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: true },
    });
    setAuthLoading(false);
    if (error) {
      setAuthError(error.message);
      return;
    }
    setCode("");
    setCodeEnvoye(true);
  }
  async function handleVerifyCode() {
    setAuthError(null);
    setAuthLoading(true);
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: code.trim(),
      type: "email",
    });
    setAuthLoading(false);
    if (error) {
      setAuthError("Code incorrect ou expiré.");
      return;
    }
    reussiteConnexion();
  }
  // Anime un succès de connexion (coche verte) puis bascule en douceur sur le paiement.
  function reussiteConnexion() {
    setSuccessAnim(true);
    window.setTimeout(() => setStep(2), 1000);
    window.setTimeout(() => setSuccessAnim(false), 1200);
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

  // Retour depuis le lien "mot de passe oublié" : le client revient sur SA page de résultat
  // avec ?recovery=1. On rouvre la fenêtre directement sur l'écran "nouveau mot de passe".
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("recovery") !== "1") return;
    setView("nouveau");
    setStep(1);
    setEmail("");
    setPassword("");
    setPassword2("");
    setAuthError(null);
    setShowPassword(false);
    setResetSent(false);
    setConfirmOuverte(false);
    setMailEnvoye(false);
    setCode("");
    setCodeEnvoye(false);
    setSuccessAnim(false);
    setOpen(true);
    // On retire le marqueur pour ne pas re-déclencher au rechargement (sans toucher au reste de l'URL).
    params.delete("recovery");
    const qs = params.toString();
    window.history.replaceState(null, "", window.location.pathname + (qs ? `?${qs}` : ""));
  }, []);

  // Retour de la connexion Google : on revient sur la page avec ?oauth=1. La session est déjà
  // posée par /auth/callback, donc on rouvre la fenêtre directement sur l'écran de paiement.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("oauth") !== "1") return;
    setView("choix");
    setStep(2);
    setOpen(true);
    params.delete("oauth");
    const qs = params.toString();
    window.history.replaceState(null, "", window.location.pathname + (qs ? `?${qs}` : ""));
  }, []);

  // Sur l'écran paiement, on demande au serveur de créer l'intention de paiement (montant
  // fixé côté serveur) et on récupère le client_secret pour afficher le formulaire Stripe.
  useEffect(() => {
    if (!open || step !== 2 || clientSecret) return;
    let annule = false;
    fetch("/api/paiement/intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profil: profilId }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (!annule && d?.clientSecret) setClientSecret(d.clientSecret);
      })
      .catch(() => {});
    return () => {
      annule = true;
    };
  }, [open, step, clientSecret, profilId]);

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
    const padTop = 10;
    const padBottom = 28;
    const track = vh - padTop - padBottom;
    const h = Math.max(28, track * (vh / sh));
    const maxScroll = sh - vh;
    const top = padTop + (maxScroll ? (el.scrollTop / maxScroll) * (track - h) : 0);
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
    border: `1px solid ${LINE}`,
    background: "#fff",
    boxShadow: "0 6px 18px -10px rgba(0,0,0,0.18)",
    color: GREEN,
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
  const linkSmall: CSSProperties = {
    background: "none",
    border: "none",
    cursor: "pointer",
    font: "inherit",
    fontSize: 12.5,
    padding: 0,
    textAlign: "center",
  };
  const boutonGoogle = (
    <button
      type="button"
      onClick={handleGoogle}
      className="fp-pill"
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
      <span style={{ fontSize: 11.5, color: INK35 }}>ou</span>
      <span style={{ flex: 1, height: 1, background: LINE }} />
    </div>
  );

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
          background: "rgba(255,255,255,0.45)",
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
          width: step === 1 && view === "inscription" ? "min(760px, 94vw)" : "min(408px, 92vw)",
          background: "#fff",
          borderRadius: 24,
          boxShadow: SHADOW,
          overflow: "hidden",
          maxHeight: "92vh",
          transformOrigin: "50% 115%",
          transform: open ? "translate(-50%,-50%) scale(1)" : "translate(-50%,-50%) scale(.18)",
          opacity: open ? 1 : 0,
          visibility: open ? "visible" : "hidden",
          transition: "transform .42s cubic-bezier(.34,1.4,.5,1), opacity .3s ease, visibility .42s, background .35s ease, box-shadow .35s ease, backdrop-filter .35s ease, width .4s ease",
        }}
      >
        <style>{".fp-noscroll{scrollbar-width:none}.fp-noscroll::-webkit-scrollbar{display:none}.fp-thumb{width:4px;background:rgba(51,164,116,0.85);transition:width .25s ease,background .25s ease}.fp-thumbwrap:hover .fp-thumb{width:7px;background:rgba(51,164,116,1)}.fp-link{color:rgba(0,0,0,0.50);transition:color .2s ease}.fp-link:hover{color:rgba(0,0,0,0.78)}.fp-pill{transition:transform .2s ease}.fp-pill:hover{transform:scale(1.04)}.fp-signup{display:flex;gap:18px;align-items:stretch}@media(max-width:600px){.fp-signup{flex-direction:column}}"}</style>

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

        {/* SUCCÈS DE CONNEXION : la coche verte apparaît, puis on bascule vers le paiement */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 5,
            background: "#fff",
            display: "grid",
            placeItems: "center",
            opacity: successAnim ? 1 : 0,
            visibility: successAnim ? "visible" : "hidden",
            transition: "opacity .4s ease, visibility .4s",
            pointerEvents: successAnim ? "auto" : "none",
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: GREEN,
              display: "grid",
              placeItems: "center",
              transform: successAnim ? "scale(1)" : "scale(.6)",
              transition: "transform .45s cubic-bezier(.34,1.4,.5,1)",
            }}
          >
            <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12l5 5L20 6" />
            </svg>
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
                  <button type="button" className="fp-pill" onClick={() => setStep(2)} style={pillPrimary}>
                    Continuer vers le paiement
                  </button>
                  <div style={{ display: "flex", gap: 10 }}>
                    <button type="button" className="fp-pill" onClick={() => setView("connexion")} style={pillSmall}>
                      Se connecter
                    </button>
                    <button type="button" className="fp-pill" onClick={() => setView("inscription")} style={pillSmall}>
                      Créer un compte
                    </button>
                  </div>
                  {separateurOu}
                  {boutonGoogle}
                </>
              ) : view === "reset" ? (
                <>
                  {resetSent ? (
                    <>
                      <p style={{ fontSize: 13.5, color: INK75, textAlign: "center", margin: 0, lineHeight: 1.55 }}>
                        Si un compte existe, le lien est parti. Va voir tes mails.
                      </p>
                      <button
                        type="button"
                        onClick={() => { setView("connexion"); setResetSent(false); setAuthError(null); }}
                        style={pillPrimary}
                      >
                        Revenir à la connexion
                      </button>
                    </>
                  ) : (
                    <>
                      <p style={{ fontSize: 13, color: INK50, textAlign: "center", margin: "0 0 2px", lineHeight: 1.5 }}>
                        On t&apos;envoie un lien pour choisir un nouveau mot de passe.
                      </p>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Adresse email"
                        autoComplete="email"
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
                        onClick={handleReset}
                        style={{ ...pillPrimary, opacity: authLoading ? 0.7 : 1 }}
                      >
                        {authLoading ? "Un instant…" : "Envoyer le lien"}
                      </button>
                      <button
                        type="button"
                        className="fp-link"
                        onClick={() => { setView("connexion"); setAuthError(null); }}
                        style={linkSmall}
                      >
                        Retour
                      </button>
                    </>
                  )}
                </>
              ) : view === "nouveau" ? (
                <>
                  <p style={{ fontSize: 12.5, color: INK50, textAlign: "center", margin: "0 0 2px", lineHeight: 1.5, whiteSpace: "nowrap" }}>
                    Crée ton nouveau mot de passe, et on reprend où tu en étais.
                  </p>
                  <div style={{ position: "relative" }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Nouveau mot de passe"
                      autoComplete="new-password"
                      style={{ ...inputPill, paddingRight: 46 }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                      style={{ position: "absolute", top: "50%", right: 6, transform: "translateY(-50%)", width: 32, height: 32, border: "none", background: "none", cursor: "pointer", display: "grid", placeItems: "center", color: INK50, padding: 0 }}
                    >
                      {showPassword ? (
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                          <path d="M1 1l22 22" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {password.length > 0 && <ChecklistMdp password={password} />}
                  <div style={{ position: "relative" }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password2}
                      onChange={(e) => setPassword2(e.target.value)}
                      placeholder="Confirme le mot de passe"
                      autoComplete="new-password"
                      style={{ ...inputPill, paddingRight: 46 }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                      style={{ position: "absolute", top: "50%", right: 6, transform: "translateY(-50%)", width: 32, height: 32, border: "none", background: "none", cursor: "pointer", display: "grid", placeItems: "center", color: INK50, padding: 0 }}
                    >
                      {showPassword ? (
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                          <path d="M1 1l22 22" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {authError && (
                    <p style={{ fontSize: 12, color: "#c0392b", textAlign: "center", margin: 0, lineHeight: 1.4 }}>
                      {authError}
                    </p>
                  )}
                  <button
                    type="button"
                    disabled={authLoading || !mdpValide(password)}
                    onClick={handleSetNewPassword}
                    style={{
                      ...pillPrimary,
                      opacity: authLoading || !mdpValide(password) ? 0.6 : 1,
                      cursor: authLoading || !mdpValide(password) ? "default" : "pointer",
                    }}
                  >
                    {authLoading ? "Un instant…" : "Valider mon nouveau mot de passe"}
                  </button>
                </>
              ) : view === "code" ? (
                <>
                  {!codeEnvoye ? (
                    <>
                      <button
                        type="button"
                        onClick={() => { setView("connexion"); setAuthError(null); }}
                        aria-label="Retour"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          alignSelf: "flex-start",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: GREEN_SOLID,
                          padding: 0,
                        }}
                      >
                        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M15 18l-6-6 6-6" />
                        </svg>
                      </button>
                      <p style={{ fontSize: 13, color: INK50, textAlign: "center", margin: "0 0 2px", lineHeight: 1.5 }}>
                        On t&apos;envoie un code pour te connecter, sans mot de passe.
                      </p>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Adresse email"
                        autoComplete="email"
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
                        onClick={handleSendCode}
                        style={{ ...pillPrimary, opacity: authLoading ? 0.7 : 1 }}
                      >
                        {authLoading ? "Un instant…" : "Recevoir mon code"}
                      </button>
                    </>
                  ) : (
                    <>
                      <p style={{ fontSize: 13, color: INK50, textAlign: "center", margin: "0 0 2px", lineHeight: 1.5 }}>
                        On t&apos;a envoyé un code par email, colle-le ici pour te connecter.
                      </p>
                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        value={code}
                        onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                        placeholder="Code reçu par email"
                        autoComplete="one-time-code"
                        style={{ ...inputPill, textAlign: "center", letterSpacing: "0.3em", fontSize: 16 }}
                      />
                      {authError && (
                        <p style={{ fontSize: 12, color: "#c0392b", textAlign: "center", margin: 0, lineHeight: 1.4 }}>
                          {authError}
                        </p>
                      )}
                      <button
                        type="button"
                        disabled={authLoading || code.length < 6}
                        onClick={handleVerifyCode}
                        style={{
                          ...pillPrimary,
                          opacity: authLoading || code.length < 6 ? 0.6 : 1,
                          cursor: authLoading || code.length < 6 ? "default" : "pointer",
                        }}
                      >
                        {authLoading ? "Un instant…" : "Se connecter"}
                      </button>
                      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 18 }}>
                        <button type="button" className="fp-link" onClick={handleSendCode} style={linkSmall}>
                          Renvoyer le code
                        </button>
                        <button
                          type="button"
                          className="fp-link"
                          onClick={() => { setCodeEnvoye(false); setCode(""); setAuthError(null); }}
                          style={linkSmall}
                        >
                          Changer d&apos;email
                        </button>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className={view === "inscription" ? "fp-signup" : undefined}>
                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 10, flex: 1, minWidth: 0 }}>
                  <button
                    type="button"
                    onClick={retourChoix}
                    aria-label="Retour"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      alignSelf: "flex-start",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: GREEN_SOLID,
                      padding: 0,
                    }}
                  >
                    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <p style={{ margin: "2px 0 8px", fontSize: 19, fontWeight: 700, color: GREEN, textAlign: "left", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                    {view === "inscription" ? "Je crée mon compte" : "Je me connecte"}
                  </p>
                  {boutonGoogle}
                  {separateurOu}
                  {view === "inscription" && (
                    <input
                      type="text"
                      value={prenom}
                      onChange={(e) => setPrenom(e.target.value)}
                      placeholder="Ton prénom ou pseudonyme"
                      autoComplete="given-name"
                      style={inputPill}
                    />
                  )}
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Adresse email"
                    autoComplete="email"
                    style={inputPill}
                  />
                  <div style={{ position: "relative" }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Mot de passe"
                      autoComplete={view === "connexion" ? "current-password" : "new-password"}
                      style={{ ...inputPill, paddingRight: 46 }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                      style={{
                        position: "absolute",
                        top: "50%",
                        right: 6,
                        transform: "translateY(-50%)",
                        width: 32,
                        height: 32,
                        border: "none",
                        background: "none",
                        cursor: "pointer",
                        display: "grid",
                        placeItems: "center",
                        color: INK50,
                        padding: 0,
                      }}
                    >
                      {showPassword ? (
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                          <path d="M1 1l22 22" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {view === "inscription" && password.length > 0 && <ChecklistMdp password={password} />}
                  {view === "inscription" && (
                    <div style={{ position: "relative", opacity: password.length > 0 ? 1 : 0.5, transition: "opacity .3s ease" }}>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={mdpConfirm}
                        onChange={(e) => setMdpConfirm(e.target.value)}
                        placeholder="Confirme ton mot de passe"
                        autoComplete="new-password"
                        style={{ ...inputPill, paddingRight: 46 }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                        style={{ position: "absolute", top: "50%", right: 6, transform: "translateY(-50%)", width: 32, height: 32, border: "none", background: "none", cursor: "pointer", display: "grid", placeItems: "center", color: INK50, padding: 0 }}
                      >
                        {showPassword ? (
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                            <path d="M1 1l22 22" />
                          </svg>
                        ) : (
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        )}
                      </button>
                    </div>
                  )}
                  {view === "inscription" && mdpConfirm.length > 0 && password !== mdpConfirm && (
                    <p style={{ fontSize: 12, color: "#c0392b", textAlign: "center", margin: 0, lineHeight: 1.4 }}>
                      Les mots de passe ne correspondent pas.
                    </p>
                  )}
                  {view === "connexion" ? (
                    <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginTop: 2 }}>
                      <button
                        type="button"
                        className="fp-link"
                        onClick={() => { setView("inscription"); setAuthError(null); }}
                        style={linkSmall}
                      >
                        Je veux me créer un compte !
                      </button>
                      <span
                        aria-hidden="true"
                        style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 1, height: 14, background: "rgba(0,0,0,0.18)", pointerEvents: "none" }}
                      />
                      <button
                        type="button"
                        className="fp-link"
                        onClick={() => { setView("reset"); setAuthError(null); setResetSent(false); }}
                        style={linkSmall}
                      >
                        J&apos;ai oublié mon mot de passe
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
                      <button
                        type="button"
                        className="fp-link"
                        onClick={() => { setView("connexion"); setAuthError(null); }}
                        style={linkSmall}
                      >
                        Déjà un compte ? Se connecter
                      </button>
                    </div>
                  )}
                  {authError && (
                    <p style={{ fontSize: 12, color: "#c0392b", textAlign: "center", margin: 0, lineHeight: 1.4 }}>
                      {authError}
                    </p>
                  )}
                  {view === "inscription" && email.length > 0 && (
                    <label className="newsletter-fade" style={{ display: "flex", alignItems: "flex-start", gap: 8, cursor: "pointer", fontSize: 11.5, color: INK75, lineHeight: 1.4, marginTop: 2 }}>
                      <input
                        type="checkbox"
                        checked={newsletter}
                        onChange={(e) => setNewsletter(e.target.checked)}
                        style={{ marginTop: 1, width: 15, height: 15, flexShrink: 0, accentColor: GREEN_SOLID, cursor: "pointer" }}
                      />
                      <span>Je veux recevoir les nouveautés et conseils par email.</span>
                    </label>
                  )}
                  <button
                    type="button"
                    disabled={authLoading || (view === "inscription" && (!prenom.trim() || !mdpValide(password) || password !== mdpConfirm))}
                    onClick={view === "connexion" ? handleSignIn : handleSignUp}
                    style={{
                      ...pillPrimary,
                      opacity: authLoading || (view === "inscription" && (!prenom.trim() || !mdpValide(password) || password !== mdpConfirm)) ? 0.6 : 1,
                      cursor: authLoading || (view === "inscription" && (!prenom.trim() || !mdpValide(password) || password !== mdpConfirm)) ? "default" : "pointer",
                    }}
                  >
                    {authLoading ? "Un instant…" : view === "connexion" ? "Se connecter" : "Créer mon compte"}
                  </button>
                  {view === "inscription" && (
                    <>
                      <p style={{ fontSize: 11, color: INK50, textAlign: "center", margin: "2px 0 0" }}>
                        Tes données restent privées.
                      </p>
                      <p style={{ fontSize: 10.5, color: INK35, textAlign: "center", margin: 0, lineHeight: 1.45 }}>
                        En créant ton compte, tu acceptes nos{" "}
                        <a href="/cgu" target="_blank" rel="noopener noreferrer" style={{ color: GREEN_SOLID, textDecoration: "underline" }}>Conditions</a>{" "}
                        et notre{" "}
                        <a href="/confidentialite" target="_blank" rel="noopener noreferrer" style={{ color: GREEN_SOLID, textDecoration: "underline" }}>Politique de confidentialité</a>.
                      </p>
                    </>
                  )}
                  {view === "connexion" && (
                    <button
                      type="button"
                      className="fp-link"
                      onClick={() => { setView("code"); setCode(""); setCodeEnvoye(false); setAuthError(null); }}
                      style={linkSmall}
                    >
                      Recevoir un code par email à la place
                    </button>
                  )}
                  </div>
                  {view === "inscription" && (
                    <div
                      className="fp-benef"
                      style={{
                        flex: 1,
                        minWidth: 0,
                        background: "linear-gradient(165deg, #34a474 0%, #277e5c 100%)",
                        borderRadius: 16,
                        padding: "20px 20px 22px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 14,
                        justifyContent: "center",
                      }}
                    >
                      <p style={{ margin: 0, fontSize: 19, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.25 }}>
                        Ce n&apos;est que le début de ton parcours.
                      </p>
                      <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
                        {[
                          { t: "Tous tes tests réunis, gardés à vie.", soon: false },
                          { t: "Leurs croisements révèlent ce qu'un seul test ne montre pas.", soon: true },
                          { t: "Un parcours rien que pour toi, bâti sur l'ensemble de tes résultats.", soon: true },
                        ].map((b, i) => (
                          <p key={i} style={{ margin: 0, fontSize: 14.5, color: "rgba(255,255,255,0.95)", lineHeight: 1.5 }}>
                            {b.t}
                            {b.soon && (
                              <span style={{ marginLeft: 7, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.03em", textTransform: "uppercase", color: "#fff", background: "rgba(255,255,255,0.22)", borderRadius: 999, padding: "2px 8px", whiteSpace: "nowrap" }}>
                                bient&ocirc;t
                              </span>
                            )}
                          </p>
                        ))}
                      </div>
                      <p style={{ margin: "2px 0 0", fontSize: 13, color: "rgba(255,255,255,0.8)" }}>Rien à payer, tout à découvrir.</p>
                    </div>
                  )}
                </div>
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
      {/* CONFIRMATION : mot de passe changé (s'ouvre par dessus la fenêtre) */}
      <div
        aria-hidden={!confirmOuverte}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 80,
          display: "grid",
          placeItems: "center",
          padding: 16,
          background: "rgba(255,255,255,0.45)",
          backdropFilter: "blur(3px)",
          WebkitBackdropFilter: "blur(3px)",
          opacity: confirmOuverte ? 1 : 0,
          visibility: confirmOuverte ? "visible" : "hidden",
          transition: "opacity .3s ease, visibility .3s",
        }}
      >
        <div
          role="dialog"
          aria-modal="true"
          style={{
            width: "min(360px, 92vw)",
            background: "#fff",
            borderRadius: 22,
            boxShadow: SHADOW,
            padding: "30px 26px 26px",
            textAlign: "center",
            transform: confirmOuverte ? "scale(1)" : "scale(.9)",
            transition: "transform .35s cubic-bezier(.34,1.4,.5,1)",
          }}
        >
          <div style={{ width: 56, height: 56, margin: "0 auto 16px", borderRadius: "50%", background: GREEN, display: "grid", placeItems: "center" }}>
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12l5 5L20 6" />
            </svg>
          </div>
          <p style={{ fontSize: 16.5, fontWeight: 700, color: INK, margin: "0 0 8px" }}>Ton mot de passe a bien été changé</p>
          <p style={{ fontSize: 13, color: INK50, margin: "0 0 22px", lineHeight: 1.5 }}>
            {mailEnvoye ? "Un email de sécurité vient de t'être envoyé." : "Tu peux reprendre où tu en étais."}
          </p>
          <button type="button" onClick={() => { setConfirmOuverte(false); setStep(2); }} style={pillPrimary}>
            Continuer
          </button>
        </div>
      </div>
    </>
  );
}
