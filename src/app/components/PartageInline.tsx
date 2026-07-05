"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { QRCodeSVG } from "qrcode.react";

// Chemins SVG (viewBox 24x24) des logos de marque.
const IC = {
  whatsapp:
    "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413",
  messenger:
    "M.001 12C.001 5.373 5.243 0 12 0s11.999 5.373 11.999 12c0 6.628-5.242 12-11.999 12-1.224 0-2.395-.18-3.49-.51a.96.96 0 0 0-.642.046l-2.394 1.057a.96.96 0 0 1-1.348-.849l-.065-2.143a.96.96 0 0 0-.322-.68A11.926 11.926 0 0 1 .001 12zm8.318-2.174l-3.525 5.594c-.338.537.299 1.142.805.765l3.786-2.873a.72.72 0 0 1 .867-.002l2.8 2.099a1.8 1.8 0 0 0 2.601-.481l3.525-5.593c.337-.537-.3-1.143-.806-.765l-3.786 2.872a.72.72 0 0 1-.867.003l-2.8-2.1a1.8 1.8 0 0 0-2.601.481z",
  instagram:
    "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163C8.741 0 8.332.014 7.052.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  snapchat: "M5 10A7 7 0 0 1 19 10V18Q16.7 19.6 14.3 18 12 19.6 9.7 18 7.3 19.6 5 18Z",
  x: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  tiktok:
    "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
  telegram:
    "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.061 3.345-.479.329-.913.489-1.302.481-.428-.009-1.252-.242-1.865-.44-.751-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z",
  reddit:
    "M24 11.779c0-1.459-1.192-2.645-2.657-2.645-.715 0-1.363.286-1.84.746-1.81-1.191-4.259-1.949-6.971-2.046l1.483-4.669 4.016.941-.006.058c0 1.193.975 2.163 2.174 2.163 1.198 0 2.172-.97 2.172-2.163s-.975-2.164-2.172-2.164c-.92 0-1.704.574-2.021 1.379l-4.329-1.015c-.189-.046-.381.063-.44.249l-1.654 5.207c-2.759.076-5.25.834-7.087 2.034-.477-.464-1.13-.753-1.849-.753-1.465 0-2.657 1.186-2.657 2.645 0 1.061.629 1.962 1.534 2.382-.04.213-.06.43-.06.65 0 3.281 3.824 5.952 8.527 5.952s8.527-2.671 8.527-5.952c0-.219-.02-.435-.059-.647.917-.416 1.555-1.323 1.555-2.387zm-17.222 1.968c0-.96.776-1.74 1.728-1.74.951 0 1.727.78 1.727 1.74 0 .96-.776 1.741-1.727 1.741-.952.001-1.728-.781-1.728-1.741zm9.974 4.953c-.838.835-2.066 1.241-3.753 1.241l-.011-.002-.011.002c-1.685 0-2.913-.406-3.752-1.241-.149-.149-.149-.39 0-.539.149-.149.39-.149.539 0 .686.685 1.762 1.017 3.214 1.017l.011.002.011-.002c1.451 0 2.528-.332 3.214-1.017.149-.149.39-.149.539 0 .148.149.148.39-.001.539zm-.31-3.212c-.951 0-1.727-.78-1.727-1.741 0-.96.776-1.74 1.727-1.74.952 0 1.728.78 1.728 1.74 0 .96-.776 1.741-1.728 1.741z",
  pinterest:
    "M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z",
  linkedin:
    "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  sms: "M12 4C7 4 3 7.13 3 11c0 1.74.83 3.33 2.2 4.55-.1 1.2-.6 2.27-1.36 3.08-.22.23-.05.62.27.59 1.7-.16 3.1-.74 4.04-1.45.86.21 1.78.33 2.85.33 5 0 9-3.13 9-7s-4-7-9-7z",
  facebook:
    "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z",
  email: "M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z",
  lien: "M3.9 12a3.1 3.1 0 0 1 3.1-3.1h4V7h-4a5 5 0 1 0 0 10h4v-1.9h-4A3.1 3.1 0 0 1 3.9 12zm4.1 1h8v-2H8v2zm5-6v1.9h4a3.1 3.1 0 0 1 0 6.2h-4V17h4a5 5 0 0 0 0-10h-4z",
  check: "M5 12l4.5 4.5L19 7",
};

// Logo Gmail multicolore (viewBox 48x48).
const GMAIL_NODE: ReactNode = (
  <svg viewBox="0 0 48 48" width="26" height="26">
    <path fill="#4caf50" d="M45 16.2l-5 2.75-5 4.75L35 40h7c1.657 0 3-1.343 3-3V16.2z" />
    <path fill="#1e88e5" d="M3 16.2l3.614 1.71L13 23.7V40H6c-1.657 0-3-1.343-3-3V16.2z" />
    <polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17" />
    <path fill="#c62828" d="M3 12.298V16.2l10 7.5V11.2L9.876 8.859C9.132 8.301 8.228 8 7.298 8 4.924 8 3 9.924 3 12.298z" />
    <path fill="#fbc02d" d="M45 12.298V16.2l-10 7.5V11.2l3.124-2.341C38.868 8.301 39.772 8 40.702 8 43.076 8 45 9.924 45 12.298z" />
  </svg>
);

// Icône QR (blanche, posée sur une tuile verte). Ouvre la fenêtre de partage par QR.
const QR_NODE: ReactNode = (
  <svg viewBox="0 0 24 24" width="27" height="27" fill="#fff">
    <path d="M3 3h7v7H3V3zm2 2v3h3V5H5z" />
    <path d="M14 3h7v7h-7V3zm2 2v3h3V5h-3z" />
    <path d="M3 14h7v7H3v-7zm2 2v3h3v-3H5z" />
    <rect x="13.8" y="13.8" width="2.4" height="2.4" />
    <rect x="18.6" y="13.8" width="2.4" height="2.4" />
    <rect x="16.2" y="16.2" width="2.4" height="2.4" />
    <rect x="13.8" y="18.6" width="2.4" height="2.4" />
    <rect x="18.6" y="18.6" width="2.4" height="2.4" />
  </svg>
);

const IG_GRADIENT =
  "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)";
const MSGR_GRADIENT = "radial-gradient(circle at 50% 120%, #00b2ff 0%, #006aff 35%, #a033ff 62%, #ff5280 82%, #ff7061 100%)";

function Rond({
  label,
  couleur,
  encre,
  d,
  node,
  img,
  onClick,
  href,
  border,
  iconSize = 31,
  outline,
  outlineWidth = 0.5,
  viewBox = "0 0 24 24",
  imgFit = "cover",
}: {
  label: string;
  couleur?: string;
  encre?: string;
  d?: string;
  node?: ReactNode;
  img?: string;
  imgFit?: "cover" | "contain";
  onClick?: () => void;
  href?: string;
  border?: boolean;
  iconSize?: number;
  outline?: string;
  outlineWidth?: number;
  viewBox?: string;
}) {
  const cercle = (
    <>
      {img ? (
        couleur ? (
          <img
            src={img}
            alt={label}
            style={{
              width: 54,
              height: 54,
              borderRadius: 14,
              display: "block",
              objectFit: imgFit,
              background: couleur,
              padding: imgFit === "contain" ? 6 : 0,
              boxSizing: "border-box",
            }}
          />
        ) : (
          <span style={{ width: 54, height: 54, display: "grid", placeItems: "center" }}>
            <img
              src={img}
              alt={label}
              style={{ width: 34, height: 34, objectFit: "contain", display: "block" }}
            />
          </span>
        )
      ) : (
        <span
          style={{
            width: 54,
            height: 54,
            borderRadius: 14,
            background: couleur,
            border: border ? "1px solid rgba(0,0,0,0.08)" : "none",
            display: "grid",
            placeItems: "center",
          }}
        >
          {node ?? (
          <svg
            viewBox={viewBox}
            width={iconSize}
            height={iconSize}
            fill={d === IC.check ? "none" : encre}
            stroke={d === IC.check ? encre : outline}
            strokeWidth={d === IC.check ? 2.5 : outline ? outlineWidth : undefined}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d={d} />
          </svg>
          )}
        </span>
      )}
      <span style={{ fontSize: 12, color: "rgba(0,0,0,0.6)", textAlign: "center", lineHeight: 1.2 }}>{label}</span>
    </>
  );
  const style = {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: 7,
    textDecoration: "none",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "4px 0",
    width: 72,
    flex: "0 0 auto",
  };
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} style={style}>
        {cercle}
      </a>
    );
  }
  return (
    <button type="button" aria-label={label} onClick={onClick} style={style}>
      {cercle}
    </button>
  );
}

// Flèche ronde de défilement (gauche / droite). Grisée et inactive quand on est au bout.
function Fleche({
  cote,
  actif,
  onClick,
  ecart = 0,
}: {
  cote: "g" | "d";
  actif: boolean;
  onClick: () => void;
  /* Décalage vers l'extérieur (px) : rapproche la flèche du bord du bloc. */
  ecart?: number;
}) {
  const gauche = cote === "g";
  return (
    <button
      type="button"
      aria-label={gauche ? "Réseaux précédents" : "Réseaux suivants"}
      onClick={onClick}
      disabled={!actif}
      style={{
        position: "absolute",
        top: 31,
        transform: "translateY(-50%)",
        left: gauche ? -ecart : undefined,
        right: gauche ? undefined : -ecart,
        width: 34,
        height: 34,
        borderRadius: "50%",
        background: "rgba(51,164,116,0.85)",
        border: "none",
        boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
        display: "grid",
        placeItems: "center",
        cursor: actif ? "pointer" : "default",
        opacity: actif ? 1 : 0,
        pointerEvents: actif ? "auto" : "none",
        transition: "opacity 0.2s ease",
        zIndex: 2,
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d={gauche ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} />
      </svg>
    </button>
  );
}

export default function PartageInline({
  code,
  nomVariante,
  montrerQR = true,
  slug: slugProp,
  s: sProp,
  v: vProp,
  lien,
  message,
  defileAuto = false,
  ecartFleches = 0,
}: {
  code: string;
  nomVariante: string;
  montrerQR?: boolean;
  /* Hors de la page rapport (ex. /profil), l'URL ne porte ni slug ni scores :
     on peut les passer directement en props, qui priment sur l'URL. */
  slug?: string;
  s?: string;
  v?: string;
  /* SURCHARGES (ex. invitation du parcours à deux) : même bloc visuel,
     mais un lien et un message dédiés à la place du /p du profil. */
  lien?: string; // chemin relatif (ex. "/test"), l'origin est ajouté
  message?: string;
  /* DÉFILEMENT AUTOMATIQUE (ex. bloc « L'inviter » du parcours à deux) :
     boucle infinie lente de droite à gauche, en pause au survol ; les
     flèches et le scroll manuel continuent de marcher. */
  defileAuto?: boolean;
  /* Écarte les flèches vers l'extérieur (px), vers le bord du bloc.
     0 par défaut : les blocs alignés au pixel (fin de rapport) ne bougent pas. */
  ecartFleches?: number;
}) {
  const [url, setUrl] = useState("");
  const [urlPartage, setUrlPartage] = useState("");
  const [copie, setCopie] = useState(false);
  const [qrOuvert, setQrOuvert] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [peutG, setPeutG] = useState(false);
  const [peutD, setPeutD] = useState(false);

  /* Défilement automatique : avance lente au rAF, pause au survol / au
     doigt (pauseRef). La rangée étant rendue DEUX fois, on recale le scroll
     d'une période (largeur d'une copie + un écart) quand on la dépasse :
     le contenu étant identique, le saut est invisible → boucle infinie. */
  const pauseRef = useRef(false);
  const posRef = useRef(0); // position en FLOTTANT (piège : scrollLeft est arrondi
  // à l'entier par le navigateur → += 0.4 directement n'avancerait jamais)
  useEffect(() => {
    if (!defileAuto) return;
    let id: number;
    const GAP = 4; // l'écart flex entre les icônes (style gap: 4)
    const pas = () => {
      const el = scrollRef.current;
      if (el) {
        const periode = (el.scrollWidth + GAP) / 2;
        /* Si l'utilisateur a bougé le scroll lui-même (flèches, molette,
           doigt), on se recale sur sa position. */
        if (Math.abs(el.scrollLeft - posRef.current) > 2) posRef.current = el.scrollLeft;
        if (!pauseRef.current) posRef.current += 0.4;
        if (posRef.current >= periode) posRef.current -= periode;
        else if (posRef.current < 1) posRef.current += periode;
        el.scrollLeft = posRef.current;
      }
      id = requestAnimationFrame(pas);
    };
    id = requestAnimationFrame(pas);
    return () => cancelAnimationFrame(id);
  }, [defileAuto]);

  // Met à jour l'état des flèches selon la position de scroll.
  function majFleches() {
    const el = scrollRef.current;
    if (!el) return;
    setPeutG(el.scrollLeft > 1);
    setPeutD(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  }

  // À monter + au redimensionnement : recalculer les flèches.
  // ResizeObserver : recalcule aussi quand le CONTENEUR change de taille
  // sans que la fenêtre navigateur bouge (ex. bloc dans une modale qui
  // s'ouvre, carte qui se recompose). Sinon les flèches restent figées.
  useEffect(() => {
    majFleches();
    window.addEventListener("resize", majFleches);
    const el = scrollRef.current;
    const ro = el ? new ResizeObserver(majFleches) : null;
    if (el && ro) ro.observe(el);
    return () => {
      window.removeEventListener("resize", majFleches);
      ro?.disconnect();
    };
  }, []);

  // Défilement petit à petit (environ 2 icônes par clic).
  function defiler(sens: 1 | -1) {
    scrollRef.current?.scrollBy({ left: sens * 150, behavior: "smooth" });
  }

  // Construit le lien public /p : depuis les props si fournies (ex. /profil),
  // sinon à partir de l'URL du rapport (slug + scores s & v).
  // Si `lien` est fourni (surcharge), c'est LUI qui est partagé.
  useEffect(() => {
    if (lien) {
      const complet = lien.startsWith("http") ? lien : `${window.location.origin}${lien}`;
      setUrl(complet);
      setUrlPartage(complet);
      return;
    }
    const seg = window.location.pathname.split("/").filter(Boolean);
    const slug = slugProp ?? seg[seg.length - 1] ?? "";
    const params = new URLSearchParams(window.location.search);
    const propres = new URLSearchParams();
    const s = sProp ?? params.get("s");
    const v = vProp ?? params.get("v");
    if (s) propres.set("s", s);
    if (v) propres.set("v", v);
    const q = propres.toString();
    setUrl(`${window.location.origin}/p/${slug}${q ? `?${q}` : ""}`);
    setUrlPartage(`${window.location.origin}/partager/${slug}${q ? `?${q}` : ""}`);
  }, [slugProp, sProp, vProp, lien]);

  const enc = encodeURIComponent;
  const msg =
    message ??
    `Hey, j'ai fait ce test de personnalité, je suis ${code} : ${nomVariante}. Regarde mon profil :`;

  async function copier() {
    try {
      await navigator.clipboard.writeText(url);
      setCopie(true);
      setTimeout(() => setCopie(false), 2000);
    } catch {
      /* ignore */
    }
  }

  // Instagram, Snapchat, Messenger : pas de partage de lien web → feuille de partage native
  // (qui les contient) si dispo, sinon on copie le lien.
  async function viaApp() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ text: msg, url });
      } catch {
        /* annulé */
      }
    } else {
      copier();
    }
  }

  const l = url || undefined;

  /* La rangée d'icônes, extraite pour pouvoir la rendre DEUX fois quand le
     défilement automatique est actif (boucle infinie). */
  const ronds = (
    <>
      <Rond label="WhatsApp" couleur="#25D366" encre="#fff" d={IC.whatsapp} href={l && `https://wa.me/?text=${enc(`${msg} ${url}`)}`} />
      <Rond label="Messenger" couleur={MSGR_GRADIENT} encre="#fff" d={IC.messenger} onClick={viaApp} />
      <Rond label="Facebook" couleur="#1877F2" encre="#fff" d={IC.facebook} href={l && `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`} />
      <Rond label="Instagram" couleur={IG_GRADIENT} encre="#fff" d={IC.instagram} onClick={viaApp} />
      <Rond label="Snapchat" couleur="#FFFC00" img="/Snapchat%20logo.png" imgFit="cover" onClick={viaApp} />
      <Rond label="TikTok" couleur="#000000" encre="#fff" d={IC.tiktok} onClick={viaApp} />
      <Rond label="SMS" couleur="#34C759" encre="#fff" d={IC.sms} iconSize={31} href={l && `sms:?&body=${enc(`${msg} ${url}`)}`} />
      <Rond label="X" couleur="#000000" encre="#fff" d={IC.x} href={l && `https://twitter.com/intent/tweet?text=${enc(msg)}&url=${enc(url)}`} />
      <Rond label="Telegram" couleur="#229ED9" encre="#fff" d={IC.telegram} href={l && `https://t.me/share/url?url=${enc(url)}&text=${enc(msg)}`} />
      <Rond label="Reddit" couleur="#FF4500" encre="#fff" d={IC.reddit} href={l && `https://www.reddit.com/submit?url=${enc(url)}&title=${enc(msg)}`} />
      <Rond label="Pinterest" couleur="#E60023" encre="#fff" d={IC.pinterest} href={l && `https://www.pinterest.com/pin/create/button/?url=${enc(url)}&description=${enc(msg)}`} />
      <Rond label="LinkedIn" couleur="#0A66C2" encre="#fff" d={IC.linkedin} href={l && `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`} />
      <Rond label="Gmail" couleur="#fff" encre="#555" node={GMAIL_NODE} border href={l && `https://mail.google.com/mail/?view=cm&fs=1&su=${enc("Et toi, qui es-tu vraiment ?")}&body=${enc(`${msg}\n\n${url}`)}`} />
      <Rond label="Email" couleur="#7A8290" encre="#fff" d={IC.email} href={l && `mailto:?subject=${enc("Et toi, qui es-tu vraiment ?")}&body=${enc(`${msg}\n\n${url}`)}`} />
      <Rond
        label={copie ? "Lien copié !" : "Copier le lien"}
        couleur={copie ? "rgba(51,164,116,0.85)" : "#ECECE8"}
        encre={copie ? "#fff" : "#555"}
        d={copie ? IC.check : IC.lien}
        onClick={copier}
      />
      {montrerQR && (
        <Rond label="QR code" couleur="rgba(51,164,116,0.85)" node={QR_NODE} onClick={() => setQrOuvert(true)} />
      )}
    </>
  );

  return (
    <div style={{ position: "relative", marginTop: 4 }}>
      <style>{`.pi-scroll::-webkit-scrollbar{display:none}`}</style>
      <Fleche cote="g" actif={defileAuto || peutG} onClick={() => defiler(-1)} ecart={ecartFleches} />
      <Fleche cote="d" actif={defileAuto || peutD} onClick={() => defiler(1)} ecart={ecartFleches} />
      <div
        ref={scrollRef}
        onScroll={majFleches}
        className="pi-scroll"
        /* Pause du défilement auto quand la souris (ou le doigt) est dessus */
        onMouseEnter={defileAuto ? () => (pauseRef.current = true) : undefined}
        onMouseLeave={defileAuto ? () => (pauseRef.current = false) : undefined}
        onTouchStart={defileAuto ? () => (pauseRef.current = true) : undefined}
        onTouchEnd={defileAuto ? () => (pauseRef.current = false) : undefined}
        style={{
          display: "flex",
          gap: 4,
          overflowX: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          padding: 0,
          marginLeft: -9,
          /* ⚠️ scroll-behavior:smooth ferait ANIMER chaque petit pas du
             défilement auto (mouvement erratique) → coupé dans ce mode.
             Les flèches gardent leur douceur (scrollBy smooth explicite). */
          scrollBehavior: defileAuto ? "auto" : "smooth",
        }}
      >
        {ronds}
        {/* Seconde copie : la boucle infinie se recale dessus, invisible */}
        {defileAuto && ronds}
      </div>

      {qrOuvert && (
        <div
          onClick={() => setQrOuvert(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(255,255,255,0.45)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
            padding: 20,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: "28px 26px",
              maxWidth: 340,
              textAlign: "center",
              boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
            }}
          >
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "rgba(0,0,0,0.8)", margin: "0 0 6px" }}>
              Partager depuis ton téléphone
            </h3>
            <p style={{ fontSize: 14, color: "rgba(0,0,0,0.6)", margin: "0 0 18px", lineHeight: 1.5 }}>
              Scanne ce code avec ton téléphone pour ouvrir le partage et envoyer ton profil à tes amis.
            </p>
            <div
              style={{
                display: "inline-block",
                padding: 14,
                borderRadius: 16,
                background: "#fff",
                border: "1px solid rgba(0,0,0,0.08)",
              }}
            >
              {urlPartage && <QRCodeSVG value={urlPartage} size={200} />}
            </div>
            <div>
              <button
                type="button"
                onClick={() => setQrOuvert(false)}
                style={{
                  marginTop: 18,
                  background: "rgba(51,164,116,0.85)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 999,
                  padding: "10px 26px",
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
