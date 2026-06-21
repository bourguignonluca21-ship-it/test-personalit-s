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

// ===== SQUELETTE FIGÉ — labels fixes communs à TOUS les profils =====
// Ces libellés ne vivent qu'ici : on les change une fois, ils changent partout.
// Le contenu propre à chaque profil (dans profils.ts) ne porte que le texte variable.
const AGES = ["Enfance", "Jeunesse", "Adulte", "Ancien"] as const;
const LABELS_BLOCS: Record<string, { negatif: string; positif: string }> = {
  relations: { negatif: "Ce qui est toxique pour toi", positif: "Ce qui te réussit" },
  carriere: { negatif: "Ce qui t'éteint", positif: "Ce qui te booste" },
};
const LABELS_COMPAT: Record<
  string,
  { negatif: string; positif: string; panelNegatif: string; panelPositif: string }
> = {
  relations: {
    negatif: "Les –",
    positif: "Les +",
    panelNegatif: "Les profils les – compatible",
    panelPositif: "Les profils les + compatible",
  },
  carriere: {
    negatif: "Les environnements à éviter",
    positif: "Les métiers faits pour toi",
    panelNegatif: "Là où tu risques de t'éteindre",
    panelPositif: "Des pistes qui te ressemblent",
  },
};

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
        const couleur = positif ? GREEN : "rgba(214,69,69,0.7)";
        const fond = positif ? "rgba(51,164,116,0.08)" : "rgba(214,69,69,0.035)";
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
                  <span style={{ color: positif ? GREEN : "rgba(214,69,69,0.7)" }}>
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

// « Tes leviers forts » : une colonne de forces à activer, formulées 100 % positif
// (la faiblesse n'est jamais nommée). Cartes vertes, pas de paire ni de rouge.
function LeviersBlock({ items }: { items: { titre: string; texte: string }[] }) {
  return (
    <div className="mt-12">
      <h3 className="inline-block text-base font-bold mb-4 rounded-full px-6 py-2 text-white" style={{ background: GREEN }}>
        Tes leviers forts
      </h3>
      <p className="text-gray-600 leading-relaxed mb-8">
        Apprendre à se connaître est le chemin d&apos;une vie. Voici des clés qui sont déjà en toi, des forces à activer
        pour devenir, jour après jour, la plus belle version de toi.
      </p>
      <div className="grid md:grid-cols-2 gap-4">
        {items.map((l) => (
          <div
            key={l.titre}
            className="rounded-2xl border border-gray-100 p-5 md:p-6"
            style={{ background: "rgba(51,164,116,0.08)" }}
          >
            <p className="font-semibold text-[rgba(0,0,0,0.8)] mb-1">{l.titre}</p>
            <p className="text-sm text-gray-600 leading-relaxed">{l.texte}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Bloc C — « Les questions à te poser » : un plan d'action volontaire sous forme de
// questions introspectives, branchées sur les schémas qui font souffrir ce profil.
function QuestionsBlock({ items }: { items: { situation: string; question: string }[] }) {
  return (
    <div className="mt-12">
      <h3 className="inline-block text-base font-bold mb-4 rounded-full px-6 py-2 text-white" style={{ background: GREEN }}>
        Les questions à te poser
      </h3>
      <p className="text-gray-600 leading-relaxed mb-2">
        Ton accomplissement n&apos;est pas une liste de consignes, c&apos;est un jeu de questions à te poser quand un
        schéma te fait souffrir. Y répondre honnêtement, c&apos;est déjà commencer à le désamorcer.
      </p>
      <div className="divide-y divide-gray-100">
        {items.map((q) => (
          <div key={q.question} className="py-9 text-center max-w-2xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[rgba(0,0,0,0.8)] mb-3">
              {q.situation}
            </p>
            <p className="text-xl md:text-2xl font-medium leading-snug text-[rgba(0,0,0,0.8)]">
              <span className="text-3xl leading-none mr-0.5 align-middle" style={{ color: "rgba(0,0,0,0.8)" }}>
                “
              </span>
              {q.question}
              <span className="text-3xl leading-none ml-0.5 align-middle" style={{ color: "rgba(0,0,0,0.8)" }}>
                ”
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Détail d'une grande section façon 16P : traits influents (verrouillé) +
// forts/faibles (gratuit) + encarts premium (super-pouvoirs, risques…).
function SectionDetailBlock({ detail, section }: { detail: SectionDetail; section: string }) {
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
              {detail.etapes.map((texte, i) => (
                <div
                  key={AGES[i] ?? i}
                  className="rounded-2xl border border-gray-100 p-5"
                  style={{ background: "rgba(51,164,116,0.08)" }}
                >
                  <h4
                    className="inline-block text-sm font-bold mb-3 rounded-full px-4 py-1.5 text-white"
                    style={{ background: GREEN }}
                  >
                    {AGES[i]}
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{texte}</p>
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

      {/* Paires de blocs (toxique / te réussit) — titres injectés depuis le squelette */}
      {detail.blocs && (
        <div className="mt-12">
          <BlocsPaires
            blocs={detail.blocs.map((b) => ({ ...b, titre: b.titre ?? LABELS_BLOCS[section]?.[b.ton] ?? "" }))}
          />
        </div>
      )}

      {/* Compatibilités (Les + / Les –) — titres + panneau injectés depuis le squelette */}
      {detail.compatibilites && (
        <div className="mt-5">
          <CompatibiliteBlocs
            blocs={detail.compatibilites.map((c) => ({
              ...c,
              titre: c.titre ?? LABELS_COMPAT[section]?.[c.ton] ?? "",
              panelTitre:
                c.panelTitre ??
                (c.ton === "positif" ? LABELS_COMPAT[section]?.panelPositif : LABELS_COMPAT[section]?.panelNegatif),
            }))}
          />
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

      {/* Tes leviers forts — colonne positive */}
      {detail.leviersForts && <LeviersBlock items={detail.leviersForts} />}

      {/* Bloc C — Les questions à te poser */}
      {detail.questions && <QuestionsBlock items={detail.questions} />}

      {/* Encart « Ton paradoxe » — tout en bas */}
      {detail.paradoxe && (
        <div className="mt-12">
          <ParadoxeBlock paradoxe={detail.paradoxe} />
        </div>
      )}

      {/* Le « mot pour la route » a été remplacé par la carte premium de fin (voir CarteFinPremium). */}
    </div>
  );
}

// Carte premium de fin (inspirée de la fin de parcours 16P, réécrite à notre voix).
// Bloc générique du template : s'affichera à l'identique sur tous les profils.
function CarteFinPremium() {
  const strong = "font-semibold text-[rgba(0,0,0,0.8)]";
  return (
    <div className="my-14 rounded-2xl p-7 md:p-10" style={{ background: "rgba(51,164,116,0.08)" }}>
      <span
        className="inline-block text-xs font-bold uppercase tracking-wide rounded-full px-4 py-1.5 text-white mb-5"
        style={{ background: GREEN }}
      >
        Accéder maintenant
      </span>
      <h2 className="text-2xl md:text-3xl font-bold text-[rgba(0,0,0,0.8)] mb-5">
        Va au bout de toi-même
      </h2>
      <p className="text-gray-600 leading-relaxed mb-6">
        Ton résumé n&apos;effleure que la surface. Le rapport complet plonge dans le détail : ton{" "}
        <strong className={strong}>spectre exact</strong> sur les 4 axes, ta{" "}
        <strong className={strong}>variante analysée en profondeur</strong> (1 profil sur 48), tes{" "}
        <strong className={strong}>forces et tes zones d&apos;ombre</strong>, tes paradoxes, ta façon d&apos;aimer, de te
        lier et tes <strong className={strong}>compatibilités</strong>, comment tu évolues à chaque âge de ta vie, et ton{" "}
        <strong className={strong}>chemin de croissance</strong> avec tes <strong className={strong}>leviers forts</strong>{" "}
        et les bonnes questions à te poser.
      </p>
      <div className="mb-8 pl-4 border-l-2" style={{ borderColor: GREEN }}>
        <p className="text-[rgba(0,0,0,0.7)] leading-relaxed italic">
          Et ce n&apos;est que ta <strong className="font-bold">lumière</strong>. Tu pourras ensuite révéler ta part
          d&apos;<strong className="font-bold">ombre</strong>, puis débloquer un parcours personnalisé qui confronte ton{" "}
          <strong className="font-bold">meilleur</strong> et ton{" "}
          <strong className="font-bold">pire</strong>{" "}
          pour t&apos;apprendre à vraiment te comprendre.
        </p>
      </div>
      <p className="text-4xl font-bold text-[rgba(0,0,0,0.8)] mb-6">6 €</p>
      <Link
        href="/pack-carriere-premium"
        className="inline-block text-white font-semibold py-4 px-10 rounded-full text-lg hover:opacity-90 transition"
        style={{ background: GREEN }}
      >
        Débloquer mon rapport complet →
      </Link>
      <p className="text-sm text-gray-400 mt-4">
        Ton test de personnalité s&apos;enregistre sur ton compte et pourra être confronté à ta dark personnalité, pour
        bâtir ton parcours sur mesure Ombre et Lumière.
      </p>
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
                <SectionDetailBlock detail={getSectionDetail(code, variante, sec.id)!} section={sec.id} />
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

        {/* CARTE PREMIUM DE FIN — remplace le « mot pour la route » et l'ancien CTA bas */}
        <CarteFinPremium />
        </div>
      </div>
    </div>
  );
}
