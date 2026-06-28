import type { Metadata } from "next";
import Link from "next/link";
import SpectrePublic from "../../components/SpectrePublic";
import VariantesPublic from "../../components/VariantesPublic";
import EmblemeCarre from "../../components/EmblemeCarre";
import { getProfil, getDescriptionVariante, getDetailVariante } from "../../data/profils";
import { spectreFromScores, NOMS_VARIANTES } from "../../data/moteur";

const GREEN = "rgba(51,164,116,0.85)";

function parseSlug(slug: string): { code: string; variante: string } {
  const m = slug.match(/^(.+)-(v\d)$/i);
  if (m) return { code: m[1].toUpperCase(), variante: m[2].toUpperCase() };
  return { code: slug.toUpperCase(), variante: "V1" };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { code, variante } = parseSlug(slug);
  const p = getProfil(code, variante);
  return {
    title: `${p.nomType} · ${p.nomVariante} — un profil de personnalité`,
    description: `Découvre ${p.nomType} (${p.code}, ${p.nomVariante}), un des 48 profils. Et toi, qui es-tu vraiment ?`,
    robots: { index: false, follow: false },
    openGraph: {
      title: `${p.nomType} · ${p.nomVariante}`,
      description: "Un des 48 profils de personnalité. Et toi, qui es-tu vraiment ?",
      type: "website",
    },
  };
}

export default async function ProfilPublicPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ s?: string; v?: string }>;
}) {
  const { slug } = await params;
  const { s, v } = await searchParams;
  const { code, variante } = parseSlug(slug);
  const profil = getProfil(code, variante);

  const scores = s ? s.split("-").map(Number) : [];
  const spectre = scores.length === 4 && scores.every((n) => !Number.isNaN(n)) ? spectreFromScores(scores) : null;

  const vScores = v ? v.split("-").map(Number) : [];
  const noms = NOMS_VARIANTES[code] ?? null;
  const variantes =
    vScores.length === 3 && vScores.every((n) => !Number.isNaN(n)) && noms
      ? (() => {
          const total = vScores.reduce((a, b) => a + b, 0) || 1;
          return (["V1", "V2", "V3"] as const).map((cle, i) => {
            const dominant = cle === variante;
            return {
              cle,
              nom: noms[cle],
              pct: Math.round((vScores[i] / total) * 100),
              dominant,
              description: dominant
                ? getDetailVariante(code, cle, noms[cle])
                : getDescriptionVariante(code, cle, noms[cle]),
            };
          });
        })()
      : null;

  const description = getDescriptionVariante(code, variante, profil.nomVariante);

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center py-12 md:py-16">
      <div className="relative z-10 w-full max-w-3xl mx-auto px-5">
        {/* Identité : bloc vert (héros), même DA que la page résultat */}
        <div className="rounded-3xl border border-transparent px-6 py-8 md:px-8 md:py-10 text-left" style={{ background: GREEN }}>
          <p className="text-sm font-semibold tracking-wide text-white/80 mb-2">Ma personnalité :</p>
          <div className="flex items-stretch gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">{profil.nomType}</h1>
              <p className="text-lg md:text-xl font-semibold mt-2 text-white/90">
                {profil.code} · {profil.nomVariante}
              </p>
            </div>
            <EmblemeCarre code={profil.code} />
          </div>
          {description && <p className="text-white/85 leading-relaxed mt-5 text-justify">{description}</p>}
        </div>

        {/* Spectre (la carte est rendue par le composant pour caler les panneaux sur sa hauteur) */}
        {spectre && <SpectrePublic spectre={spectre} />}

        {/* Variantes */}
        {variantes && <VariantesPublic variantes={variantes} />}

        {/* CTA conversion : le visiteur ne voit ici qu'un aperçu, le vrai rapport va plus loin. */}
        <div className="mt-8 rounded-3xl p-8 md:p-10 text-left" style={{ background: "rgba(51,164,116,0.08)" }}>
          <span
            className="inline-block text-[11px] font-bold uppercase tracking-wide px-3 py-1 rounded-full mb-4 text-white"
            style={{ background: GREEN }}
          >
            Gratuit
          </span>
          <p className="text-2xl md:text-3xl font-bold text-[rgba(0,0,0,0.82)] mb-3">
            Et <span style={{ color: GREEN }}>toi</span>, qui es-tu vraiment ?
          </p>
          <p className="text-gray-600 leading-relaxed text-justify mb-7">
            Ce que tu viens de lire n&apos;est qu&apos;un aperçu. En 10 minutes, obtiens ton propre portrait, bien plus
            complet et étonnamment juste, sur qui tu es et pourquoi tu fonctionnes comme ça.
          </p>

          <div className="mb-8">
            <p className="text-sm font-semibold text-[rgba(0,0,0,0.7)] mb-2">Un rapport qui te ressemble.</p>
            <p
              className="text-gray-600 leading-relaxed italic text-justify pl-4"
              style={{ borderLeft: "2px solid rgba(51,164,116,0.85)" }}
            >
              Un portrait de toi complet et approfondi : pourquoi ta manière de penser, ressentir et réagir est unique,
              et comment ta personnalité influence tes relations, en amour comme en amitié. Et au fil de tes tests, ton
              portrait devient toujours plus juste, jusqu&apos;aux clés pour devenir la meilleure version de toi.
            </p>
          </div>

          <Link
            href="/test"
            className="inline-block text-white font-semibold py-4 px-10 rounded-full text-lg hover:opacity-90 transition"
            style={{ background: GREEN }}
          >
            Passe le test
          </Link>
        </div>
      </div>
    </div>
  );
}
