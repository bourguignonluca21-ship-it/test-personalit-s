"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

/*
 * Petite fenêtre « Fais d'abord le test » : ouverte quand un visiteur qui n'a
 * PAS encore fait le test clique sur un élément réservé (réseaux du profil,
 * « Commencer mon parcours »). Elle explique, puis propose un bouton « Faire
 * le test » (au lieu d'une redirection sèche). Composant contrôlé (open /
 * onClose), rendu dans <body> via portail, voile blanc translucide comme les
 * autres fenêtres du site.
 * ⚠️ TEXTES PROVISOIRES, à valider avec Luca.
 */

const VERT = "rgba(51,164,116,0.85)";
const INK = "rgba(0,0,0,0.75)";
const INK50 = "rgba(0,0,0,0.50)";

export default function FenetreFaireTest({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [monte, setMonte] = useState(false);
  useEffect(() => setMonte(true), []);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!monte || !open) return null;

  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(255,255,255,0.45)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 60,
        padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: 22,
          padding: "30px 28px",
          maxWidth: 380,
          textAlign: "center",
          boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
        }}
      >
        {/* ⚠️ TEXTES PROVISOIRES */}
        <h3 style={{ fontSize: 20, fontWeight: 700, color: INK, margin: "0 0 10px" }}>
          Commence par te découvrir
        </h3>
        <p style={{ fontSize: 14, color: INK50, lineHeight: 1.6, margin: "0 0 22px" }}>
          Cet espace se construit à partir de ton profil. Fais le test, et ton
          profil, tes parcours et tes partages prendront vie ici.
        </p>
        <a
          href="/test"
          style={{
            display: "inline-block",
            background: VERT,
            color: "#fff",
            borderRadius: 999,
            padding: "12px 28px",
            fontSize: 15,
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Faire le test
        </a>
      </div>
    </div>,
    document.body,
  );
}
