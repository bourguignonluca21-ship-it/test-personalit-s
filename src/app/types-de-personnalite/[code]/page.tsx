import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getType, ROLES, TYPES, TYPE_SECTIONS } from "../../data/types";

// Prérendu des 16 pages au build.
export function generateStaticParams() {
  return TYPES.map((t) => ({ code: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>;
}): Promise<Metadata> {
  const { code } = await params;
  const type = getType(code);
  if (!type) return { title: "Type introuvable" };
  return {
    title: `${type.name} (${type.code})`,
    description: `${type.name} (${type.code}) : ${type.tagline}`,
  };
}

// Décomposition des 4 lettres du code en libellés.
const LETTER_LABELS: Record<string, string> = {
  I: "Introverti",
  E: "Extraverti",
  N: "Intuitif",
  S: "Observateur",
  T: "Rationnel",
  F: "Sensible",
  J: "Organisé",
  P: "Prospectif",
};

export default async function TypePage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const type = getType(code);
  if (!type) notFound();

  const role = ROLES[type.role];
  const letters = type.code.split("");

  return (
    <article>
      {/* Héros */}
      <section
        className="border-b border-gray-100"
        style={{ background: `linear-gradient(180deg, ${role.soft} 0%, #fff 100%)` }}
      >
        <div className="max-w-5xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: role.color }}>
              {type.name} · {role.name.replace("Les ", "")}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mt-2 mb-3">
              La personnalité {type.code}
            </h1>
            <p className="text-lg text-gray-600 mb-6">{type.tagline}</p>
            <div className="flex flex-wrap gap-3">
              {letters.map((l, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl px-4 py-2 min-w-[110px]">
                  <span className="text-xl font-bold" style={{ color: role.color }}>
                    {l}
                  </span>
                  <span className="block text-xs text-gray-500">{LETTER_LABELS[l]}</span>
                </div>
              ))}
            </div>
          </div>
          <div
            className="aspect-[4/3] rounded-xl border border-gray-200 bg-white grid place-items-center text-3xl font-bold"
            style={{ color: role.color }}
          >
            {type.code}
          </div>
        </div>
      </section>

      {/* Onglets (ancres) */}
      <nav
        className="sticky top-[57px] z-40 bg-white border-b border-gray-100"
        aria-label="Sections du type"
      >
        <div className="max-w-3xl mx-auto px-6 flex gap-1 overflow-x-auto">
          {TYPE_SECTIONS.map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="whitespace-nowrap py-3.5 px-3 text-sm font-semibold border-b-[3px] transition-colors"
              style={i === 0 ? { color: role.color, borderColor: role.color } : { color: "#6b7280", borderColor: "transparent" }}
            >
              {s.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Corps */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <section id="introduction" className="py-6 border-b border-gray-100 scroll-mt-32">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Introduction</h2>
          <blockquote
            className="border-l-4 pl-4 italic text-gray-600 mb-6"
            style={{ borderColor: role.color }}
          >
            « Une citation inspirante ira ici. »
            <span className="block not-italic font-semibold text-gray-800 mt-1">— Auteur</span>
          </blockquote>
          <div className="bg-[#fdf6e8] border border-dashed border-[#e4ae3a] rounded-lg p-4 text-sm text-[#8a6d1f] mb-5">
            🔧 Emplacement du texte d&apos;introduction de ton profil <strong>{type.name}</strong>. À
            rédiger avec tes propres mots (le contenu de 16Personalities est protégé).
          </div>
          <p className="text-gray-600 leading-relaxed">
            Présentation générale du type {type.code} : tempérament, valeurs, rapport au monde.
            (Texte de démonstration.)
          </p>
        </section>

        {TYPE_SECTIONS.slice(1).map((s) => (
          <section key={s.id} id={s.id} className="py-6 border-b border-gray-100 scroll-mt-32">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">{s.label}</h2>
            <p className="text-gray-600 leading-relaxed">
              Section « {s.label} » du type {type.name} — texte de démonstration à remplacer.
            </p>
          </section>
        ))}

        {/* CTA premium */}
        <div className="text-center py-10">
          <p className="text-gray-500 mb-4">Tu n&apos;as vu qu&apos;un aperçu de ton profil.</p>
          <Link
            href="/pack-carriere-premium"
            className="inline-block text-white font-semibold py-3 px-8 rounded-full transition-opacity hover:opacity-90"
            style={{ background: role.color }}
          >
            Débloquer le profil complet →
          </Link>
        </div>
      </div>
    </article>
  );
}
