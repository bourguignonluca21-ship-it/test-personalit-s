import Link from "next/link";
import type { Metadata } from "next";
import ResultatNav from "../../components/ResultatNav";
import SpectreInteractif from "../../components/SpectreInteractif";
import VarianteInteractif from "../../components/VarianteInteractif";
import CompatibiliteBlocs from "../../components/CompatibiliteBlocs";
import PrecisionRating from "../../components/PrecisionRating";
import BlocVerrouille from "../../components/BlocVerrouille";
import ProgressionMenu from "../../components/ProgressionMenu";
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

// Bloc enrichi de la variante : points forts / points faibles (gratuits) + paradoxe (verrouillé).
function VarianteDetailBlock({
  detail,
  isPaid,
  unlockHref,
}: {
  detail: VarianteDetail;
  isPaid: boolean;
  unlockHref: string;
}) {
  return (
    <div className="mt-12 space-y-10">
      <div data-prog="var-points" aria-hidden="true" />
      <GroupePoints titre="Tes points faibles" items={detail.ombres} />
      <GroupePoints titre="Tes points forts" items={detail.forces} />
      <BlocVerrouille isPaid={isPaid} unlockHref={unlockHref}>
        <div data-prog="var-paradoxe" aria-hidden="true" />
        <ParadoxeBlock paradoxe={detail.paradoxe} />
      </BlocVerrouille>
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
function SectionDetailBlock({
  detail,
  section,
  isPaid,
  unlockHref,
}: {
  detail: SectionDetail;
  section: string;
  isPaid: boolean;
  unlockHref: string;
}) {
  return (
    <div className="mt-10">
      {/* « Comment tu évolues » — verrouillé */}
      {detail.evolution && (
        <BlocVerrouille isPaid={isPaid} unlockHref={unlockHref}>
        <div data-prog={`${section}-evolution`} aria-hidden="true" />
        <div className="mb-12">
          <h3
            className="inline-block text-base font-bold mb-5 rounded-full px-6 py-2 text-white"
            style={{ background: GREEN }}
          >
            Comment tu évolues
          </h3>
          <p className="text-gray-600 leading-relaxed whitespace-pre-line">{detail.evolution}</p>

          {detail.etapes && (
            <>
              <div data-prog={`${section}-ages`} aria-hidden="true" />
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
            </>
          )}
        </div>
        </BlocVerrouille>
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
          <div data-prog={`${section}-points`} aria-hidden="true" />
          {detail.ombres && <GroupePoints titre="Tes points faibles" items={detail.ombres} />}
          {detail.forces && <GroupePoints titre="Tes points forts" items={detail.forces} />}
        </div>
      )}

      {/* À PARTIR D'ICI : contenu verrouillé (les points forts/faibles au-dessus restent gratuits) */}
      {(detail.blocs || detail.compatibilites || detail.premiums || detail.leviersForts || detail.questions || detail.paradoxe) && (
      <BlocVerrouille isPaid={isPaid} unlockHref={unlockHref}>
      {/* Paires de blocs (toxique / te réussit) — titres injectés depuis le squelette */}
      {detail.blocs && (
        <div className="mt-12">
          <div data-prog={`${section}-blocs`} aria-hidden="true" />
          <BlocsPaires
            blocs={detail.blocs.map((b) => ({ ...b, titre: b.titre ?? LABELS_BLOCS[section]?.[b.ton] ?? "" }))}
          />
        </div>
      )}

      {/* Compatibilités (Les + / Les –) — titres + panneau injectés depuis le squelette */}
      {detail.compatibilites && (
        <div className="mt-5">
          <div data-prog={`${section}-compat`} aria-hidden="true" />
          <CompatibiliteBlocs
            locked={!isPaid}
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
      {detail.leviersForts && (
        <>
          <div data-prog={`${section}-leviers`} aria-hidden="true" />
          <LeviersBlock items={detail.leviersForts} />
        </>
      )}

      {/* Bloc C — Les questions à te poser */}
      {detail.questions && (
        <>
          <div data-prog={`${section}-questions`} aria-hidden="true" />
          <QuestionsBlock items={detail.questions} />
        </>
      )}

      {/* Encart « Ton paradoxe » — tout en bas */}
      {detail.paradoxe && (
        <div className="mt-12">
          <div data-prog={`${section}-paradoxe`} aria-hidden="true" />
          <ParadoxeBlock paradoxe={detail.paradoxe} />
        </div>
      )}
      </BlocVerrouille>
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
      <p className="text-4xl font-bold text-[rgba(0,0,0,0.8)] mb-6">7,90 €</p>
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

// Brouille le texte : remplace chaque lettre par une lettre aléatoire, en gardant EXACTEMENT
// la structure (longueur, espaces, ponctuation, chiffres). Sert à afficher le contenu verrouillé
// sans jamais envoyer le vrai texte au navigateur d'un non-payeur (sécurité réelle du paywall).
function scrambleStr(s: string): string {
  const a = "abcdefghijklmnopqrstuvwxyz";
  return s.replace(/\p{L}/gu, () => a[Math.floor(Math.random() * 26)]);
}
function scrambleDeep<T>(v: T): T {
  if (typeof v === "string") return scrambleStr(v) as unknown as T;
  if (Array.isArray(v)) return v.map((x) => scrambleDeep(x)) as unknown as T;
  if (v && typeof v === "object") {
    const o: Record<string, unknown> = {};
    const obj = v as Record<string, unknown>;
    // On préserve les champs STRUCTURELS (pas du contenu) pour ne pas casser couleurs/libellés.
    const garder = new Set(["ton"]);
    for (const k in obj) o[k] = garder.has(k) ? obj[k] : scrambleDeep(obj[k]);
    return o as T;
  }
  return v;
}
// Champs verrouillés (floutés) à brouiller quand non payé. On garde forces/ombres (gratuits) réels.
const CHAMPS_VERROUILLES = ["evolution", "etapes", "blocs", "compatibilites", "premiums", "leviersForts", "questions", "paradoxe"];
function brouillerSection(d: SectionDetail, isPaid: boolean): SectionDetail {
  if (isPaid) return d;
  const out = { ...d } as Record<string, unknown>;
  for (const k of CHAMPS_VERROUILLES) {
    if (out[k] !== undefined) out[k] = scrambleDeep(out[k]);
  }
  return out as SectionDetail;
}
function brouillerVariante(d: VarianteDetail, isPaid: boolean): VarianteDetail {
  if (isPaid) return d;
  return { ...d, paradoxe: scrambleDeep(d.paradoxe) };
}

export default async function ResultatPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ s?: string; v?: string; paid?: string }>;
}) {
  const { slug } = await params;
  const { s, v, paid } = await searchParams;
  const { code, variante } = parseSlug(slug);
  const profil = getProfil(code, variante);

  // PROTOTYPE paywall (Phase 1) : flag factice via ?paid=1. À remplacer par la vérif
  // d'achat réelle (session Supabase + table achats) une fois le backend en place.
  const isPaid = paid === "1";
  // Lien de déblocage qui conserve les scores s/v (plus tard : checkout Stripe).
  const unlockHref = `?${new URLSearchParams({ ...(s ? { s } : {}), ...(v ? { v } : {}), paid: "1" }).toString()}`;

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
      {/* HÉROS — colonne centrée au milieu de l'écran (le menu flotte à gauche, hors de ce bloc) */}
      <div className="max-w-3xl mx-auto px-4 md:px-0 mt-4">
        <section className="relative isolate overflow-hidden rounded-3xl px-6 md:px-8 pt-16 pb-14" style={{ background: GREEN }}>
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
            {/* Bloc texte : de « Voici ta personnalité » jusqu'à l'accroche */}
            <div className="flex-1 text-center md:text-left order-2 md:order-1">
              <p className="text-sm font-semibold tracking-wide mb-2 text-white/90">
                Voici ta personnalité :
              </p>
              <h1
                className="text-5xl md:text-6xl font-bold tracking-tight text-white"
                style={{ textShadow: "0 6px 18px rgba(0,0,0,0.18)" }}
              >
                {profil.nomType}
              </h1>
              <p className="text-xl md:text-2xl font-semibold mt-2 text-white">
                {profil.code} · {profil.nomVariante}
              </p>
              <p className="text-lg text-white/90 mt-5 leading-relaxed">
                {profil.accroche}
              </p>
            </div>
            {/* Emblème : haut aligné sur « Voici... », bas sur l'accroche (s'étire sur la hauteur du bloc texte) */}
            <div
              className="order-1 md:order-2 shrink-0 mx-auto md:mx-0 w-28 h-28 md:w-32 md:h-32 flex items-center justify-center rounded-3xl text-2xl font-semibold tracking-wide text-white"
              style={{ background: "rgba(255,255,255,0.16)", border: "1.5px solid rgba(255,255,255,0.5)" }}
            >
              {profil.code}
            </div>
          </div>
          {/* Boutons sous le bloc héros */}
          <div className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-3">
            <button
              type="button"
              className="bg-white font-semibold py-3.5 px-9 rounded-full text-base hover:opacity-90 transition"
              style={{ color: GREEN }}
            >
              Partager mon profil
            </button>
          </div>
        </section>
      </div>

      {/* CONTENU centré au milieu de l'écran ; le menu flotte à gauche (xl) ou barre en haut (mobile/tablette) */}
      <div className="relative max-w-3xl mx-auto px-4 md:px-0">
        {/* RAIL MENU : flux normal (barre) sous le héros en mobile/tablette ; colonne flottante à gauche de la colonne centrée en xl */}
        <div className="xl:absolute xl:top-0 xl:right-full xl:mr-8 xl:h-full">
          <ResultatNav sections={PROFIL_SECTIONS} />
        </div>
        {/* RAIL DROIT : progression qui se révèle au scroll (xl uniquement) */}
        <div className="hidden xl:block xl:absolute xl:top-0 xl:left-full xl:ml-8 xl:h-full">
          <ProgressionMenu />
        </div>
        <div className="py-10">
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

              {sec.id === "traits" && spectre && (
                <>
                  <div data-prog="spectrum" aria-hidden="true" />
                  <SpectreInteractif axes={spectre} isPaid={isPaid} />
                </>
              )}

              {isVariantes && variantes && (
                <>
                  <div data-prog="var-bars" aria-hidden="true" />
                  <VarianteInteractif variantes={variantes} isPaid={isPaid} />
                  {getTexteVariante(code, variante) && (
                    <>
                      <div data-prog="var-text" aria-hidden="true" />
                      <p className="text-gray-600 leading-relaxed whitespace-pre-line mt-6">
                        {getTexteVariante(code, variante)}
                      </p>
                    </>
                  )}
                  {getVarianteDetail(code, variante) && (
                    <VarianteDetailBlock
                      detail={brouillerVariante(getVarianteDetail(code, variante)!, isPaid)}
                      isPaid={isPaid}
                      unlockHref={unlockHref}
                    />
                  )}
                </>
              )}

              {content && (
                <>
                  <div data-prog={`apercu-${sec.id}`} aria-hidden="true" />
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">{content.apercu}</p>
                </>
              )}

              {getSectionDetail(code, variante, sec.id) && (
                <SectionDetailBlock
                  detail={brouillerSection(getSectionDetail(code, variante, sec.id)!, isPaid)}
                  section={sec.id}
                  isPaid={isPaid}
                  unlockHref={unlockHref}
                />
              )}
            </section>
          );
        })}

        </div>
        {/* CARTE PREMIUM DE FIN — DANS la zone des menus, pour qu'ils s'arrêtent en bas de cet encart */}
        {!isPaid && <CarteFinPremium />}
      </div>

      {/* RETOUR DE PRÉCISION — hors de la zone des menus collants */}
      <div className="max-w-3xl mx-auto px-4 md:px-0">
        <PrecisionRating />
      </div>
    </div>
  );
}
