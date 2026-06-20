import Link from "next/link";
import type { Metadata } from "next";
import MeshGradient from "../../components/MeshGradient";
import ResultatNav from "../../components/ResultatNav";
import SpectreInteractif from "../../components/SpectreInteractif";
import VarianteInteractif from "../../components/VarianteInteractif";
import CompatibiliteBlocs from "../../components/CompatibiliteBlocs";
import {
  getProfil,
  PROFIL_SECTIONS,
  getDescriptionVariante,
  getTexteVariante,
  getVarianteDetail,
  getSectionDetail,
} from "../../data/profils";
import type { SectionDetail, VarianteDetail } from "../../data/profils";
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
    title: `${p.code} · ${p.nomVariante} — ton résultat`,
    description: `Ton profil ${p.code} (${p.nomType}), variante ${p.nomVariante}.`,
  };
}

// Met en vert le mot-clé (accent) dans un titre, s'il est présent.
function titreAccentue(texte: string, accent?: string) {
  if (!accent || !texte.includes(accent)) return texte;
  const [avant, apres] = texte.split(accent);
  return (
    <>
      {avant}
      <span style={{ color: GREEN }}>{accent}</span>
      {apres}
    </>
  );
}

// Groupe « points forts / faibles » : pastille verte + items sur 2 colonnes + mots-clés verts.
function GroupePoints({
  titre,
  items,
}: {
  titre: string;
  items: { titre: string; texte: string; accent?: string }[];
}) {
  return (
    <div>
      <h3
        className="inline-block text-base font-bold mb-6 rounded-full px-6 py-2 text-white"
        style={{ background: GREEN }}
      >
        {titre}
      </h3>
      <ul className="grid md:grid-cols-2 gap-x-10 gap-y-5">
        {items.map((it) => (
          <li key={it.titre}>
            <p className="font-semibold text-[rgba(0,0,0,0.8)]">{titreAccentue(it.titre, it.accent)}</p>
            <p className="text-sm text-gray-600 leading-relaxed mt-0.5">{it.texte}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Encart « Ton paradoxe » : tension → deux faces (lumière / ombre) → bascule.
function ParadoxeBlock({
  paradoxe,
  titre = "Ton paradoxe",
}: {
  paradoxe: { tension: string; lumiere: string; ombre: string; bascule: string };
  titre?: string;
}) {
  return (
    <div className="rounded-2xl p-6 md:p-8" style={{ background: "rgba(51,164,116,0.08)" }}>
      <h3
        className="inline-block text-base font-bold mb-5 rounded-full px-6 py-2 text-white"
        style={{ background: GREEN }}
      >
        {titre}
      </h3>
      <p className="text-lg font-semibold text-[rgba(0,0,0,0.8)] leading-relaxed mb-6 whitespace-pre-line">
        {paradoxe.tension}
      </p>

      <div className="grid md:grid-cols-2 gap-5">
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <p className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: GREEN }}>
            Ta lumière
          </p>
          <p className="text-sm text-[rgba(0,0,0,0.7)] leading-relaxed">{paradoxe.lumiere}</p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <p className="text-xs font-bold uppercase tracking-wide mb-2 text-[rgba(0,0,0,0.45)]">
            Ton ombre
          </p>
          <p className="text-sm text-[rgba(0,0,0,0.7)] leading-relaxed">{paradoxe.ombre}</p>
        </div>
      </div>

      <div className="mt-6 pl-4 border-l-2" style={{ borderColor: GREEN }}>
        <p className="text-[rgba(0,0,0,0.75)] leading-relaxed italic">{paradoxe.bascule}</p>
      </div>
    </div>
  );
}

// Paire de blocs côte à côte (ex. « toxique » / « te réussit », « Les + » / « Les - »).
function BlocsPaires({ blocs }: { blocs: { titre: string; ton: "positif" | "negatif"; items: string[] }[] }) {
  return (
    <div className="grid sm:grid-cols-2 gap-5">
      {blocs.map((b) => {
        const positif = b.ton === "positif";
        const couleur = positif ? GREEN : "rgba(214,69,69,0.9)";
        const fond = positif ? "rgba(51,164,116,0.08)" : "rgba(214,69,69,0.08)";
        return (
          <div key={b.titre} className="rounded-2xl border border-gray-100 p-5" style={{ background: fond }}>
            <h4
              className="inline-block text-sm font-bold mb-3 rounded-full px-4 py-1.5 text-white"
              style={{ background: couleur }}
            >
              {b.titre}
            </h4>
            <ul className="space-y-2">
              {b.items.map((it) => (
                <li key={it} className="text-sm text-[rgba(0,0,0,0.7)] leading-relaxed flex gap-2">
                  <span style={{ color: positif ? GREEN : "rgba(214,69,69,0.9)" }}>
                    {positif ? "+" : "–"}
                  </span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

// Bloc enrichi de la variante : points forts / points faibles + paradoxe central.
function VarianteDetailBlock({ detail }: { detail: VarianteDetail }) {
  return (
    <div className="mt-12 space-y-10">
      <GroupePoints titre="Tes points faibles" items={detail.ombres} />
      <GroupePoints titre="Tes points forts" items={detail.forces} />
      <ParadoxeBlock paradoxe={detail.paradoxe} />
    </div>
  );
}

// Détail d'une grande section façon 16P : traits influents (verrouillé) +
// forts/faibles (gratuit) + encarts premium (super-pouvoirs, risques…).
function SectionDetailBlock({ detail }: { detail: SectionDetail }) {
  return (
    <div className="mt-10">
      {/* « Comment tu évolues » — gratuit */}
      {detail.evolution && (
        <div className="mb-12">
          <h3
            className="inline-block text-base font-bold mb-5 rounded-full px-6 py-2 text-white"
            style={{ background: GREEN }}
          >
            Comment tu évolues
          </h3>
          <p className="text-gray-600 leading-relaxed whitespace-pre-line">{detail.evolution}</p>

          {detail.etapes && (
            <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
              {detail.etapes.map((e, i) => (
                <div
                  key={e.label}
                  className="rounded-2xl border border-gray-100 p-5"
                  style={{ background: "rgba(51,164,116,0.08)" }}
                >
                  <h4
                    className="inline-block text-sm font-bold mb-3 rounded-full px-4 py-1.5 text-white"
                    style={{ background: GREEN }}
                  >
                    {i + 1}. {e.label}
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{e.texte}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Encart « Traits influents » — teaser verrouillé (noms + descriptions, scores cachés) */}
      {detail.traitsInfluents && (
        <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-6 mb-12">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h3 className="text-sm font-bold uppercase tracking-wide text-[rgba(0,0,0,0.75)]">
              Traits influents
            </h3>
            <span className="text-xs text-gray-400">🔒 scores dans le rapport complet</span>
          </div>
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
            {detail.traitsInfluents.map((t) => (
              <li key={t.nom}>
                <p className="font-semibold text-[rgba(0,0,0,0.8)]">{t.nom}</p>
                <p className="text-sm text-gray-500 leading-relaxed mt-0.5">{t.texte}</p>
              </li>
            ))}
          </ul>
          <Link
            href="/pack-carriere-premium"
            className="inline-block mt-5 text-sm font-semibold hover:underline"
            style={{ color: GREEN }}
          >
            Débloquer tes scores →
          </Link>
        </div>
      )}

      {/* Forts / faibles — gratuit (même rendu que la variante) */}
      {(detail.forces || detail.ombres) && (
        <div className="space-y-10">
          {detail.ombres && <GroupePoints titre="Tes points faibles" items={detail.ombres} />}
          {detail.forces && <GroupePoints titre="Tes points forts" items={detail.forces} />}
        </div>
      )}

      {/* Paires de blocs (toxique / te réussit) */}
      {detail.blocs && (
        <div className="mt-12">
          <BlocsPaires blocs={detail.blocs} />
        </div>
      )}

      {/* Compatibilités (Les + / Les –) — survol → panneau de profils concrets */}
      {detail.compatibilites && (
        <div className="mt-5">
          <CompatibiliteBlocs blocs={detail.compatibilites} />
        </div>
      )}

      {/* Encarts premium verrouillés (super-pouvoirs, risques…) */}
      {detail.premiums && (
        <div className="mt-12 grid sm:grid-cols-2 gap-5">
          {detail.premiums.map((p) => (
            <div key={p.titre} className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-5">
              <p className="font-semibold text-[rgba(0,0,0,0.8)] mb-1">🔒 {p.titre}</p>
              <p className="text-sm text-gray-500 leading-relaxed mb-3">{p.sousTitre}</p>
              <Link
                href="/pack-carriere-premium"
                className="text-sm font-semibold hover:underline"
                style={{ color: GREEN }}
              >
                Débloquer →
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* « Tes pièges à éviter » — bloc visible avec descriptions (gratuit) */}
      {detail.pieges && (
        <div className="mt-12">
          <GroupePoints titre="Tes pièges à éviter" items={detail.pieges} />
        </div>
      )}

      {/* « Tes leviers de développement » — bloc visible avec descriptions */}
      {detail.leviers && (
        <div className="mt-12">
          <GroupePoints titre="Tes leviers de développement" items={detail.leviers} />
        </div>
      )}

      {/* Encart « Ton paradoxe » — tout en bas */}
      {detail.paradoxe && (
        <div className="mt-12">
          <ParadoxeBlock paradoxe={detail.paradoxe} />
        </div>
      )}

      {/* « Un mot pour la route » — clôture gratuite */}
      {detail.motRoute && (
        <div
          className="mt-12 rounded-2xl p-6 md:p-8 text-center"
          style={{ background: "rgba(51,164,116,0.08)" }}
        >
          <h3 className="text-base font-bold mb-3" style={{ color: GREEN }}>
            Un mot pour la route
          </h3>
          <p className="text-[rgba(0,0,0,0.75)] leading-relaxed max-w-2xl mx-auto">{detail.motRoute}</p>
        </div>
      )}
    </div>
  );
}

export default async function ResultatPage({
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

  // Les 3 variantes (V1/V2/V3) : part relative de chacune, la dominante en vert plein.
  const vScores = v ? v.split("-").map(Number) : [];
  const noms = NOMS_VARIANTES[code] ?? null;
  const variantes =
    vScores.length === 3 && vScores.every((n) => !Number.isNaN(n)) && noms
      ? (() => {
          const total = vScores.reduce((a, b) => a + b, 0) || 1;
          return (["V1", "V2", "V3"] as const).map((cle, i) => ({
            cle,
            nom: noms[cle],
            pct: Math.round((vScores[i] / total) * 100),
            dominant: cle === variante,
            description: getDescriptionVariante(code, cle, noms[cle]),
          }));
        })()
      : null;

  return (
    <div className="bg-white">
      {/* HÉROS — bandeau dégradé (comme l'accueil), texte à gauche, avatar à droite */}
      <section className="relative isolate overflow-hidden px-6 pt-16 pb-14 border-b border-gray-100">
        <MeshGradient />
        <div className="relative max-w-3xl mx-auto flex flex-col-reverse md:flex-row md:items-center gap-8 md:gap-10">
          <div className="flex-1 text-center md:text-left">
            <p className="text-sm font-semibold tracking-wide mb-2" style={{ color: "rgba(0,0,0,0.75)" }}>
              Voici ta personnalité :
            </p>
            <h1
              className="text-5xl md:text-6xl font-bold tracking-tight text-[rgba(0,0,0,0.75)]"
              style={{ textShadow: "0 6px 18px rgba(0,0,0,0.18)" }}
            >
              {profil.nomType}
            </h1>
            <p className="text-xl md:text-2xl font-semibold mt-2" style={{ color: GREEN }}>
              {profil.code} · {profil.nomVariante}
            </p>
            <p className="text-lg md:text-xl text-gray-600 max-w-xl mx-auto md:mx-0 mt-5 leading-relaxed">
              {profil.accroche}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-3">
              <button
                type="button"
                className="text-white font-semibold py-3.5 px-9 rounded-full text-base hover:opacity-90 transition"
                style={{ background: GREEN }}
              >
                Partager mon profil
              </button>
              <Link
                href="/test"
                className="text-[rgba(0,0,0,0.75)] font-semibold py-3.5 px-7 rounded-full text-base bg-transparent hover:bg-[rgba(0,0,0,0.04)] transition-colors"
              >
                ↺ Refaire le test
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SOMMAIRE COLLANT (gauche) + LES 4 SECTIONS NUMÉROTÉES (droite) */}
      <div className="max-w-6xl mx-auto md:flex md:gap-12 md:px-6">
        <ResultatNav sections={PROFIL_SECTIONS} />
        <div className="flex-1 min-w-0 md:max-w-3xl md:mx-auto px-6 md:px-0 py-10">
        <p className="text-gray-600 leading-relaxed whitespace-pre-line mb-2">{profil.introduction}</p>
        {PROFIL_SECTIONS.map((sec) => {
          const isVariantes = sec.id === "variantes";
          const content = isVariantes
            ? null
            : profil.sections[sec.id as "traits" | "carriere" | "developpement" | "relations"];
          return (
            <section key={sec.id} id={sec.id} className="py-12 border-b border-gray-100 scroll-mt-32">
              <h2 className="text-2xl md:text-3xl font-bold text-[rgba(0,0,0,0.75)] mb-7">
                <span className="mr-1" style={{ color: GREEN }}>{sec.num}.</span>
                {sec.label}
              </h2>

              {sec.id === "traits" && spectre && <SpectreInteractif axes={spectre} />}

              {isVariantes && variantes && (
                <>
                  <VarianteInteractif variantes={variantes} />
                  {getTexteVariante(code, variante) && (
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line mt-6">
                      {getTexteVariante(code, variante)}
                    </p>
                  )}
                  {getVarianteDetail(code, variante) && (
                    <VarianteDetailBlock detail={getVarianteDetail(code, variante)!} />
                  )}
                </>
              )}

              {content && (
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{content.apercu}</p>
              )}

              {getSectionDetail(code, variante, sec.id) && (
                <SectionDetailBlock detail={getSectionDetail(code, variante, sec.id)!} />
              )}

              {content?.premium && (
                <div className="mt-5 rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-5">
                  <p className="text-sm text-gray-500 mb-3">🔒 {content.premium}</p>
                  <Link
                    href="/pack-carriere-premium"
                    className="text-sm font-semibold hover:underline"
                    style={{ color: GREEN }}
                  >
                    Débloquer la suite →
                  </Link>
                </div>
              )}
            </section>
          );
        })}

        {/* CTA BAS */}
        <div className="text-center py-12">
          <p className="text-gray-500 mb-5">Tu n&apos;as vu qu&apos;un aperçu de ton portrait.</p>
          <Link
            href="/pack-carriere-premium"
            className="inline-block text-white font-semibold py-4 px-10 rounded-full text-lg hover:opacity-90 transition"
            style={{ background: GREEN }}
          >
            Débloquer le rapport complet →
          </Link>
        </div>
        </div>
      </div>
    </div>
  );
}
