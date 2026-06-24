"use client";

import { useEffect, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

const INK = "rgba(0,0,0,0.85)";
const INK50 = "rgba(0,0,0,0.50)";
const INK35 = "rgba(0,0,0,0.35)";

// Réseaux de partage. L'action réelle (lien du profil) sera branchée plus tard ;
// pour l'instant chaque bouton ouvre juste un emplacement prêt à recevoir le lien.
type Reseau = { nom: string; couleur: string; encreIcone: string; icone: ReactNode };

const RESEAUX: Reseau[] = [
  {
    nom: "Instagram",
    couleur: "#E1306C",
    encreIcone: "#fff",
    icone: (
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163C8.741 0 8.332.014 7.052.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    ),
  },
  {
    nom: "Facebook",
    couleur: "#1877F2",
    encreIcone: "#fff",
    icone: (
      <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
    ),
  },
  {
    nom: "Messenger",
    couleur: "#0084FF",
    encreIcone: "#fff",
    icone: (
      <path d="M.001 12C.001 5.373 5.243 0 12 0s11.999 5.373 11.999 12c0 6.628-5.242 12-11.999 12-1.224 0-2.395-.18-3.49-.51a.96.96 0 0 0-.642.046l-2.394 1.057a.96.96 0 0 1-1.348-.849l-.065-2.143a.96.96 0 0 0-.322-.68A11.926 11.926 0 0 1 .001 12zm8.318-2.174l-3.525 5.594c-.338.537.299 1.142.805.765l3.786-2.873a.72.72 0 0 1 .867-.002l2.8 2.099a1.8 1.8 0 0 0 2.601-.481l3.525-5.593c.337-.537-.3-1.143-.806-.765l-3.786 2.872a.72.72 0 0 1-.867.003l-2.8-2.1a1.8 1.8 0 0 0-2.601.481z" />
    ),
  },
  {
    nom: "Snapchat",
    couleur: "#FFFC00",
    encreIcone: "#111",
    icone: (
      <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.057c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.225-.061.524.12.868l.015.015c.06.135 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .074-.015.149-.045.225-.24.569-1.273.988-3.146 1.282-.059.091-.12.375-.165.57-.045.18-.09.36-.149.554-.061.224-.196.314-.42.314h-.045c-.149 0-.345-.044-.585-.09-.434-.09-.99-.18-1.696-.18-.42 0-.853.029-1.305.105-.876.149-1.633.689-2.504 1.305-1.224.884-2.61 1.886-4.708 1.886-.09 0-.18-.004-.27-.009-.014.005-.029.009-.044.009-2.099 0-3.484-1.002-4.708-1.886-.871-.616-1.628-1.156-2.504-1.305-.452-.076-.885-.105-1.305-.105-.706 0-1.262.104-1.696.18-.24.046-.435.09-.585.09-.255 0-.39-.119-.465-.314-.06-.193-.105-.374-.149-.554-.046-.195-.106-.479-.166-.569-1.873-.299-2.906-.718-3.146-1.287-.03-.075-.045-.15-.045-.225-.015-.239.165-.465.42-.509 3.265-.539 4.731-3.879 4.791-4.014l.015-.015c.181-.345.21-.644.12-.869-.194-.45-.883-.674-1.333-.809-.135-.044-.255-.09-.344-.119-.823-.329-1.228-.719-1.213-1.168 0-.359.284-.689.734-.838.149-.061.327-.09.509-.09.12 0 .299.016.464.104.374.181.733.301 1.033.301.198 0 .326-.045.401-.09a31.94 31.94 0 0 1-.03-.51l-.003-.057c-.105-1.628-.231-3.654.298-4.847C7.66 1.069 11.016.793 12.006.793h.2z" />
    ),
  },
  {
    nom: "WhatsApp",
    couleur: "#25D366",
    encreIcone: "#fff",
    icone: (
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
    ),
  },
  {
    nom: "X",
    couleur: "#000000",
    encreIcone: "#fff",
    icone: (
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    ),
  },
  {
    nom: "TikTok",
    couleur: "#111111",
    encreIcone: "#fff",
    icone: (
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    ),
  },
  {
    nom: "Copier le lien",
    couleur: "#EEEEEA",
    encreIcone: "#555",
    icone: (
      <path d="M3.9 12a3.1 3.1 0 0 1 3.1-3.1h4V7h-4a5 5 0 1 0 0 10h4v-1.9h-4A3.1 3.1 0 0 1 3.9 12zm4.1 1h8v-2H8v2zm5-6v1.9h4a3.1 3.1 0 0 1 0 6.2h-4V17h4a5 5 0 0 0 0-10h-4z" />
    ),
  },
];

// Fenêtre « Partager mon profil » : s'ouvre par-dessus la page (comme la fenêtre de
// déblocage), fond légèrement flouté, grille des réseaux. Le lien réel sera branché plus tard.
export default function FenetrePartage({
  ancreRetour,
  triggerClassName,
  triggerStyle,
  children,
}: {
  ancreRetour?: string;
  triggerClassName?: string;
  triggerStyle?: CSSProperties;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  function openModal() {
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

  // Fermeture à Échap. On NE bloque PAS le scroll du fond (cohérent avec la fenêtre de paiement).
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeModal();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <button type="button" className={triggerClassName} style={triggerStyle} onClick={openModal}>
        {children}
      </button>

      {/* BACKDROP flouté */}
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

      {/* FENÊTRE */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Partager mon profil"
        style={{
          position: "fixed",
          zIndex: 70,
          left: "50%",
          top: "50%",
          width: "min(440px, 92vw)",
          background: "#fff",
          borderRadius: 22,
          boxShadow: "0 30px 80px -24px rgba(0,0,0,0.40)",
          overflow: "hidden",
          transformOrigin: "50% 115%",
          transform: open ? "translate(-50%,-50%) scale(1)" : "translate(-50%,-50%) scale(.18)",
          opacity: open ? 1 : 0,
          visibility: open ? "visible" : "hidden",
          transition: "transform .42s cubic-bezier(.34,1.4,.5,1), opacity .3s ease, visibility .42s",
        }}
      >
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

        <div style={{ padding: "34px 30px 30px" }}>
          <h3 style={{ fontSize: 21, fontWeight: 800, margin: "6px 0 6px", color: INK }}>Partage ton profil</h3>
          <p style={{ fontSize: 14, color: INK50, margin: "0 0 24px", lineHeight: 1.5 }}>
            Fais découvrir ton type à tes proches, et propose leur de passer le test.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
            {RESEAUX.map((r) => (
              <button
                key={r.nom}
                type="button"
                aria-label={r.nom}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px 0",
                }}
              >
                <span
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    background: r.couleur,
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <svg viewBox="0 0 24 24" width="24" height="24" fill={r.encreIcone}>
                    {r.icone}
                  </svg>
                </span>
                <span style={{ fontSize: 11.5, color: "rgba(0,0,0,0.65)", textAlign: "center", lineHeight: 1.2 }}>
                  {r.nom}
                </span>
              </button>
            ))}
          </div>

          <p style={{ fontSize: 11.5, color: INK35, textAlign: "center", margin: "22px 0 0", lineHeight: 1.5 }}>
            Le lien de partage de ton profil sera bientôt actif.
          </p>
        </div>
      </div>
    </>
  );
}
