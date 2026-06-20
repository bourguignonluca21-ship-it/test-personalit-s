"use client";

import { useEffect, useState } from "react";

// Titre animé de la page test : « Test de personnalité » tombe du haut avec rebond,
// puis « 2.0 » s'écrit (caret vert, comme l'accueil), puis le bloc « IA » apparaît
// et ses lettres se tapent de la même manière (caret blanc dans le bloc).
const SEQ20 = "2.0";
const SEQIA = "IA";
const TOTAL = SEQ20.length + SEQIA.length;

function caretStyle(bg: string): React.CSSProperties {
  return {
    display: "inline-block",
    width: "3px",
    height: "0.95em",
    background: bg,
    marginLeft: "3px",
    verticalAlign: "-0.08em",
    borderRadius: "2px",
  };
}

export default function TestPageTitle({ accent }: { accent: string }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (i >= TOTAL) return;
    // On laisse « Test de personnalité » tomber d'abord, puis on tape « 2.0 » puis « IA ».
    const delay = i === 0 ? 420 : 110;
    const t = setTimeout(() => setI((x) => x + 1), delay);
    return () => clearTimeout(t);
  }, [i]);

  const typed20 = SEQ20.slice(0, Math.min(i, SEQ20.length));
  const badgeStarted = i >= SEQ20.length;
  const typedIA = badgeStarted ? SEQIA.slice(0, i - SEQ20.length) : "";

  return (
    <h1
      className="text-4xl md:text-5xl font-bold tracking-tight mb-3 inline-flex items-center justify-center gap-2.5 flex-wrap"
      style={{ color: "rgba(0,0,0,0.75)" }}
    >
      <span className="title-drop">Test de personnalité</span>
      <span className="tabular-nums">
        {typed20}
        {!badgeStarted && <span aria-hidden className="typed-caret" style={caretStyle("rgba(51,164,116,0.75)")} />}
      </span>
      {badgeStarted && (
        <span
          className="text-white text-lg font-bold px-3 py-1 rounded-xl inline-flex items-center"
          style={{ background: accent }}
        >
          {typedIA}
          {i < TOTAL && <span aria-hidden className="typed-caret" style={caretStyle("rgba(255,255,255,0.9)")} />}
        </span>
      )}
    </h1>
  );
}
