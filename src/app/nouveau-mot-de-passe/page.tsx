"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "../lib/supabase/client";

const GREEN = "rgba(51,164,116,0.85)";

// Page d'atterrissage du lien « mot de passe oublié ». Le lien du mail établit une
// session de récupération (Supabase) ; on propose alors de choisir un nouveau mot de passe.
export default function NouveauMotDePassePage() {
  const [supabase] = useState(() => createClient());
  const [status, setStatus] = useState<"checking" | "ready" | "invalid">("checking");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  // Le lien du mail ouvre une session de récupération. On l'attend (l'échange du jeton
  // se fait automatiquement au chargement), puis on affiche le formulaire.
  useEffect(() => {
    let actif = true;
    supabase.auth.getSession().then(({ data }) => {
      if (actif && data.session) setStatus("ready");
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (!actif) return;
      if (event === "PASSWORD_RECOVERY" || session) setStatus("ready");
    });
    // Si rien ne s'établit, le lien est invalide ou expiré.
    const t = setTimeout(() => {
      if (actif) setStatus((s) => (s === "checking" ? "invalid" : s));
    }, 3500);
    return () => {
      actif = false;
      clearTimeout(t);
      sub.subscription.unsubscribe();
    };
  }, [supabase]);

  async function valider() {
    setError(null);
    if (password.length < 6) {
      setError("Choisis un mot de passe d'au moins 6 caractères.");
      return;
    }
    if (password !== password2) {
      setError("Les deux mots de passe ne correspondent pas.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    setDone(true);
  }

  const inputBase =
    "w-full border border-gray-200 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-[rgba(51,164,116,0.6)] box-border";

  return (
    <div className="bg-white min-h-[70vh] grid place-items-center px-6 py-16">
      <div className="w-full max-w-sm text-center">
        {status === "checking" && (
          <p className="text-sm text-gray-500">Validation du lien…</p>
        )}

        {status === "invalid" && (
          <>
            <h1 className="text-2xl font-bold text-[rgba(0,0,0,0.8)] mb-2">Lien invalide ou expiré</h1>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              Ce lien n&apos;est plus valable. Refais une demande depuis « J&apos;ai oublié mon mot de passe ».
            </p>
            <Link
              href="/"
              className="inline-block text-white font-semibold py-3 px-8 rounded-full text-sm hover:opacity-90 transition"
              style={{ background: GREEN }}
            >
              Retour à l&apos;accueil
            </Link>
          </>
        )}

        {status === "ready" && !done && (
          <>
            <h1 className="text-2xl font-bold text-[rgba(0,0,0,0.8)] mb-2">Choisis ton nouveau mot de passe</h1>
            <p className="text-sm text-gray-500 mb-8">Il remplacera l&apos;ancien tout de suite.</p>
            <div className="space-y-4 text-left">
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nouveau mot de passe"
                  autoComplete="new-password"
                  className={inputBase}
                  style={{ paddingRight: 46 }}
                />
                <button
                  type="button"
                  onClick={() => setShow((v) => !v)}
                  aria-label={show ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                  className="absolute top-1/2 right-2 -translate-y-1/2 w-8 h-8 grid place-items-center text-[rgba(0,0,0,0.5)]"
                >
                  {show ? (
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
              <input
                type={show ? "text" : "password"}
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                placeholder="Confirme le mot de passe"
                autoComplete="new-password"
                className={inputBase}
              />
              {error && <p className="text-xs text-[#c0392b] text-center leading-relaxed">{error}</p>}
              <button
                type="button"
                disabled={loading}
                onClick={valider}
                className="w-full text-white font-semibold py-3.5 rounded-full text-sm hover:opacity-90 transition"
                style={{ background: GREEN, opacity: loading ? 0.7 : 1 }}
              >
                {loading ? "Un instant…" : "Valider mon nouveau mot de passe"}
              </button>
            </div>
          </>
        )}

        {done && (
          <>
            <h1 className="text-2xl font-bold text-[rgba(0,0,0,0.8)] mb-2">C&apos;est fait !</h1>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              Ton mot de passe est à jour. Tu peux maintenant te connecter avec.
            </p>
            <Link
              href="/"
              className="inline-block text-white font-semibold py-3 px-8 rounded-full text-sm hover:opacity-90 transition"
              style={{ background: GREEN }}
            >
              Retour à l&apos;accueil
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
