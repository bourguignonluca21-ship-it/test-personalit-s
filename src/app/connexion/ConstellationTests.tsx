/*
 * Le décor « chemin en 4 étapes » autour de la carte de connexion.
 * Quatre blocs flottants numérotés (blanc translucide, DA du site),
 * deux à gauche, deux à droite. Visible seulement à partir de xl.
 * Animations autonomes au composant (<style> local), rien dans
 * globals.css (piège OneDrive connu). Décoratif pur (aria-hidden).
 *
 * Repère : le parent est un conteneur relative de max-w-5xl (1024 px) qui
 * contient la carte de connexion centrée (max-w-md ≈ 448 px, donc ses bords
 * sont vers x=288 et x=736). Les coordonnées ci-dessous en découlent.
 */

const VERT = "rgba(51,164,116,0.85)";
const INK = "rgba(0,0,0,0.75)";
const INK50 = "rgba(0,0,0,0.50)";

/* Les 4 étapes en colonne à droite de la carte (léger décalage alterné). */
const ETAPES = [
  { n: 1, titre: "Passe tes tests", sousLigne: "Personnalité, ton ombre, et plus", pos: { left: 775, top: 20 }, flot: "cx-flot-a" },
  { n: 2, titre: "Conserve tes résultats", sousLigne: "Retrouve-les où que tu sois", pos: { left: 790, top: 135 }, flot: "cx-flot-b" },
  { n: 3, titre: "Croise tes rapports", sousLigne: "Des liens apparaissent entre eux", pos: { left: 775, top: 250 }, flot: "cx-flot-c" },
  { n: 4, titre: "Débloque ton parcours", sousLigne: "Sur mesure, construit sur toi", pos: { left: 790, top: 365 }, flot: "cx-flot-d" },
];

export default function ConstellationTests() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden xl:block">
      <style>{`
        @keyframes cxflot { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-9px) } }
        .cx-flot-a { animation: cxflot 5.2s ease-in-out infinite }
        .cx-flot-b { animation: cxflot 6.1s ease-in-out .8s infinite }
        .cx-flot-c { animation: cxflot 6.8s ease-in-out 1.6s infinite }
        .cx-flot-d { animation: cxflot 5.7s ease-in-out 2.2s infinite }
      `}</style>

      {ETAPES.map((e) => (
        <div
          key={e.n}
          className={e.flot}
          style={{
            position: "absolute",
            ...e.pos,
            width: 230,
            background: "rgba(255,255,255,0.72)",
            backdropFilter: "blur(6px)",
            border: "1px solid rgba(0,0,0,0.06)",
            borderRadius: 18,
            padding: "14px 16px",
            boxShadow: "0 18px 44px -24px rgba(0,0,0,0.25)",
            display: "flex",
            alignItems: "flex-start",
            gap: 12,
            textAlign: "left",
          }}
        >
          <span
            style={{
              flexShrink: 0,
              width: 26,
              height: 26,
              borderRadius: "50%",
              background: VERT,
              color: "#fff",
              fontSize: 13,
              fontWeight: 700,
              display: "grid",
              placeItems: "center",
            }}
          >
            {e.n}
          </span>
          <span>
            <span style={{ display: "block", fontSize: 14.5, fontWeight: 700, color: INK }}>
              {e.titre}
            </span>
            <span style={{ display: "block", marginTop: 2, fontSize: 11.5, color: INK50 }}>
              {e.sousLigne}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}
