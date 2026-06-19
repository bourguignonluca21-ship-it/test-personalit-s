"use client";

import { useEffect, useState } from "react";

const BLACK = "rgba(0,0,0,0.75)";
const GREEN = "rgba(51,164,116,0.75)";
const FAINT = "rgba(0,0,0,0.05)"; // guillemets très discrets

// Phrases découpées en segments colorés.
const PHRASES = [
  [
    { t: "“", c: FAINT },
    { t: "C’est moi.", c: GREEN },
    { t: " Mot pour mot.", c: BLACK },
    { t: "”", c: FAINT },
  ],
  [
    { t: "“", c: FAINT },
    { t: "Impressionnant.", c: BLACK },
    { t: "”", c: FAINT },
  ],
];

// Aplati : un tableau de { ch, c } par phrase.
const FLAT = PHRASES.map((p) =>
  p.flatMap((seg) => Array.from(seg.t).map((ch) => ({ ch, c: seg.c }))),
);

export default function TypedTitle() {
  const [pi, setPi] = useState(0);
  const [n, setN] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = FLAT[pi];
    let delay: number;
    if (!deleting) {
      if (n < full.length) {
        delay = 85;
      } else {
        delay = 1800; // pause sur la phrase complète
      }
    } else {
      delay = n > 0 ? 45 : 450; // pause avant la phrase suivante
    }

    const id = setTimeout(() => {
      if (!deleting && n < full.length) {
        setN((v) => v + 1);
      } else if (!deleting && n >= full.length) {
        setDeleting(true);
      } else if (deleting && n > 0) {
        setN((v) => v - 1);
      } else {
        setDeleting(false);
        setPi((v) => (v + 1) % FLAT.length);
      }
    }, delay);

    return () => clearTimeout(id);
  }, [pi, n, deleting]);

  const shown = FLAT[pi].slice(0, n);

  return (
    <span aria-label="C’est moi. Mot pour mot.">
      {shown.map((c, i) => (
        <span key={i} style={{ color: c.c }}>
          {c.ch}
        </span>
      ))}
      <span
        aria-hidden
        className="typed-caret"
        style={{
          display: "inline-block",
          width: "3px",
          height: "0.95em",
          background: GREEN,
          marginLeft: "4px",
          verticalAlign: "-0.08em",
          borderRadius: "2px",
        }}
      />
    </span>
  );
}
