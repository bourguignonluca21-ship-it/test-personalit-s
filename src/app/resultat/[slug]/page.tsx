// =============================================================================
// PAGE RÉSULTAT — une page par profil.
// 48 pages : 16 types × 3 niveaux du cinquième axe.  /resultat/enfp-r
//
// Le texte est figé (48 pages). Les 4 pourcentages viennent des scores du test,
// passés dans l'URL et BORNÉS à 15-75 : aucun pourcentage aberrant n'est possible.
//
// Le cinquième axe n'est pas encore rédigé : les trois pages d'un même type
// servent pour l'instant le même contenu.
// =============================================================================

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getCompteRendu,
  tousLesSlugs,
  NIVEAUX_AXE5,
  NOMS_AXE5,
  BLOCS_AXE5,
  bornerScore,
  MODULATIONS,
  cleModulation,
} from "../../data/comptesRendus";
import type { BlocCR, NiveauAxe5 } from "../../data/comptesRendus";
import { spectreFromScores } from "../../data/moteur";
import type { SpectreAxe } from "../../data/moteur";
import { getTypeByCode } from "../../data/types";

const VERT = "#33a474";
const VERT_DOUX = "rgba(51,164,116,0.08)";

const NOMS_POLES: Record<string, string> = {
  E: "Extraversion", I: "Introversion",
  N: "Intuition", S: "Observation",
  F: "Sentiment", T: "Logique",
  P: "Perception", J: "Jugement",
};

/** "enfp-r" -> { code: "ENFP", niveau: "r" } ; tolère "enfp" et l'ancien "enfp-v1". */
function lireSlug(slug: string): { code: string; niveau: NiveauAxe5 | null } {
  const [brut, suffixe] = slug.toLowerCase().split("-");
  const niveau = NIVEAUX_AXE5.includes(suffixe as NiveauAxe5)
    ? (suffixe as NiveauAxe5)
    : null;
  return { code: brut.toUpperCase(), niveau };
}

/** Les 48 slugs valides : 16 types × 3 niveaux. */
export const SLUGS_VALIDES = tousLesSlugs();

function Riche({ texte }: { texte: string }) {
  const parts = texte.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith("**") && p.endsWith("**")) return <strong key={i}>{p.slice(2, -2)}</strong>;
        if (p.startsWith("*") && p.endsWith("*") && p.length > 2) return <em key={i}>{p.slice(1, -1)}</em>;
        return <span key={i}>{p}</span>;
      })}
    </>
  );
}

function Bloc({ bloc, spectre }: { bloc: BlocCR; spectre: SpectreAxe[] }) {
  if (bloc.genre === "axe") {
    const s = spectre.find((x) => x.axe === bloc.axe);
    if (!s) return null;
    const texte = MODULATIONS[cleModulation(s.lettre, s.pctDominant)] ?? "";
    return (
      <div style={{ background: VERT_DOUX, borderRadius: 16, padding: "22px 24px", margin: "28px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
          <strong style={{ fontSize: 18 }}>{bloc.libelle}</strong>
          <span style={{ fontSize: 26, fontWeight: 700, color: VERT }}>{s.pctDominant} %</span>
        </div>
        <div style={{ height: 8, borderRadius: 99, background: "rgba(0,0,0,.08)", overflow: "hidden", marginBottom: 6 }}>
          <div style={{ height: "100%", width: `${s.pctDominant}%`, background: VERT, borderRadius: 99 }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, opacity: 0.55, marginBottom: 14 }}>
          <span>{s.poleBas} {s.pctBas} %</span>
          <span>intensité : {s.intensite}</span>
          <span>{s.pctHaut} % {s.poleHaut}</span>
        </div>
        <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.7 }}>{texte}</p>
      </div>
    );
  }

  if (bloc.genre === "classement") {
    const trie = [...spectre].sort((a, b) => b.pctDominant - a.pctDominant);
    return (
      <ol style={{ margin: "22px 0", padding: 0, listStyle: "none" }}>
        {trie.map((s, i) => (
          <li key={s.axe} style={{ display: "flex", alignItems: "center", gap: 12, padding: "7px 0", borderBottom: "1px solid rgba(0,0,0,.06)" }}>
            <span style={{ opacity: 0.35, width: 18 }}>{i + 1}.</span>
            <span style={{ fontWeight: 500, flex: 1 }}>{NOMS_POLES[s.lettre] ?? s.lettre}</span>
            <span style={{ opacity: 0.7 }}>{s.pctDominant} %</span>
            <span style={{ fontSize: 12, opacity: 0.5, width: 62, textAlign: "right" }}>{s.intensite}</span>
          </li>
        ))}
      </ol>
    );
  }

  if (bloc.genre === "tableau") {
    return (
      <div style={{ margin: "28px 0" }}>
        {bloc.titre && <h4 style={{ fontSize: 18, marginBottom: 12 }}><Riche texte={bloc.titre} /></h4>}
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15.5 }}>
          <thead>
            <tr>{bloc.colonnes.map((c, i) => (
              <th key={i} style={{ textAlign: "left", padding: "10px 12px", background: VERT_DOUX, fontWeight: 600 }}>{c}</th>
            ))}</tr>
          </thead>
          <tbody>
            {bloc.lignes.map((l, i) => (
              <tr key={i}>{l.map((c, j) => (
                <td key={j} style={{ padding: "10px 12px", borderTop: "1px solid rgba(0,0,0,.07)", verticalAlign: "top" }}>{c}</td>
              ))}</tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div style={{ margin: "26px 0" }}>
      {bloc.titre && <h4 style={{ fontSize: 19, marginBottom: 12, lineHeight: 1.35 }}><Riche texte={bloc.titre} /></h4>}
      {bloc.paragraphes.map((p, i) => (
        <p key={i} style={{ margin: "0 0 14px", lineHeight: 1.75, fontSize: 17 }}><Riche texte={p} /></p>
      ))}
    </div>
  );
}

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ s?: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { code, niveau } = lireSlug(slug);
  const info = getTypeByCode(code);
  return {
    title: info
      ? `${code}${niveau ? `-${niveau.toUpperCase()}` : ""} · ${info.name}`
      : `Compte rendu ${code}`,
  };
}

export default async function Page({ params, searchParams }: Props) {
  const { slug } = await params;
  const { s } = await searchParams;
  const { code, niveau } = lireSlug(slug);

  const cr = getCompteRendu(code);
  if (!cr) notFound();

  const info = getTypeByCode(code);
  const numAxe5 = cr.chapitres.length + 1;

  // Scores bruts. Bornés à 15-75 : un axe a 15 questions notées 1 à 5,
  // aucun score ne peut sortir de là, donc aucun pourcentage aberrant.
  const scores = (s ?? "45-45-45-45")
    .split("-")
    .map((n) => bornerScore(Number.parseInt(n, 10)));
  const spectre = spectreFromScores(scores);

  return (
    <main style={{ maxWidth: 740, margin: "0 auto", padding: "56px 24px 96px" }}>
      <header style={{ marginBottom: 48 }}>
        <p style={{ textTransform: "uppercase", letterSpacing: 2, fontSize: 12, opacity: 0.5, margin: 0 }}>
          Ton compte rendu
        </p>
        <h1 style={{ fontSize: 56, fontWeight: 700, color: VERT, margin: "8px 0 4px" }}>
          {cr.code}{niveau ? `-${niveau.toUpperCase()}` : ""}
        </h1>
        <p style={{ fontSize: 20, opacity: 0.7, margin: 0 }}>
          {info?.name}
          {niveau ? ` · ${NOMS_AXE5[niveau]}` : ""}
        </p>
      </header>

      <nav style={{ background: VERT_DOUX, borderRadius: 16, padding: 24, marginBottom: 48 }}>
        <p style={{ margin: "0 0 12px", fontSize: 12, textTransform: "uppercase", letterSpacing: 1.5, opacity: 0.6 }}>
          Sommaire
        </p>
        <ol style={{ margin: 0, paddingLeft: 20 }}>
          {cr.chapitres.map((c) => (
            <li key={c.num} style={{ padding: "3px 0" }}>
              <a href={`#ch-${c.num}`} style={{ color: "inherit", textDecoration: "none" }}>{c.titre}</a>
            </li>
          ))}
          <li style={{ padding: "3px 0" }}>
            <a href={`#ch-${numAxe5}`} style={{ color: "inherit", textDecoration: "none" }}>
              Ta réactivité émotionnelle
              {niveau ? ` · ${NOMS_AXE5[niveau]}` : ""}
            </a>
          </li>
        </ol>
      </nav>

      {cr.chapitres.map((c) => (
        <section key={c.num} id={`ch-${c.num}`} style={{ marginBottom: 64, scrollMarginTop: 24 }}>
          <h2 style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: 2, color: VERT, borderBottom: "1px solid rgba(51,164,116,.25)", paddingBottom: 10, marginBottom: 8 }}>
            Chapitre {c.num}
          </h2>
          <h3 style={{ fontSize: 30, fontWeight: 700, margin: "0 0 22px" }}>{c.titre}</h3>
          {c.blocs.map((b, i) => <Bloc key={i} bloc={b} spectre={spectre} />)}
        </section>
      ))}

      <section id={`ch-${numAxe5}`} style={{ marginBottom: 64, scrollMarginTop: 24 }}>
        <h2 style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: 2, color: VERT, borderBottom: "1px solid rgba(51,164,116,.25)", paddingBottom: 10, marginBottom: 8 }}>
          Chapitre {numAxe5}
        </h2>
        <h3 style={{ fontSize: 30, fontWeight: 700, margin: "0 0 22px" }}>
          Ta réactivité émotionnelle
          {niveau ? ` · ${NOMS_AXE5[niveau]}` : ""}
        </h3>
        {niveau ? (
          BLOCS_AXE5[niveau].map((b, i) => <Bloc key={i} bloc={b} spectre={spectre} />)
        ) : (
          <p style={{ opacity: 0.45, fontSize: 15.5 }}>
            Ce chapitre dépend de ton niveau sur le cinquième axe. Ajoute -r, -m ou -c à
            l&apos;adresse pour l&apos;afficher.
          </p>
        )}
      </section>
    </main>
  );
}
