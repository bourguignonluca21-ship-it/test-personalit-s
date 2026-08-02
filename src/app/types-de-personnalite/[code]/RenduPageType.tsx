import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getType, ROLES, type PersonalityType, type Role } from "../../data/types";
import {
  getContenuType,
  getPageDeType,
  typesAvecPage,
  type BlocPage,
} from "../../data/contenuPagesTypes";

// =============================================================================
// Rendu partagé des pages de type rédigées (page principale + sous-pages).
// =============================================================================

export function BlocsRendu({ blocs, role }: { blocs: BlocPage[]; role: Role }) {
  return (
    <>
      {blocs.map((bloc, i) => {
        if (bloc.genre === "texte") {
          return (
            <div key={i}>
              {bloc.titre && (
                <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-3">{bloc.titre}</h2>
              )}
              {bloc.paragraphes.map((p, j) => (
                <p key={j} className="text-gray-600 leading-relaxed mb-4">
                  {p}
                </p>
              ))}
            </div>
          );
        }
        if (bloc.genre === "liste") {
          return (
            <div key={i}>
              {bloc.titre && (
                <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-3">{bloc.titre}</h2>
              )}
              {bloc.intro && <p className="text-gray-600 leading-relaxed mb-5">{bloc.intro}</p>}
              {bloc.items.map((item, j) => (
                <div key={j} className="mb-5">
                  <p className="text-gray-600 leading-relaxed">
                    <strong className="text-gray-800">{item.titre}</strong> {item.texte}
                  </p>
                  {item.revers && (
                    <p className="text-gray-500 leading-relaxed mt-1 pl-4 border-l-2 border-gray-200">
                      <em>Le revers :</em> {item.revers}
                    </p>
                  )}
                </div>
              ))}
            </div>
          );
        }
        // tableau
        return (
          <div key={i}>
            {bloc.titre && (
              <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-3">{bloc.titre}</h2>
            )}
            {bloc.intro && <p className="text-gray-600 leading-relaxed mb-4">{bloc.intro}</p>}
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border border-gray-200">
                <thead>
                  <tr style={{ background: role.soft }}>
                    {bloc.colonnes.map((c, j) => (
                      <th key={j} className="text-left font-semibold text-gray-800 px-4 py-2.5">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bloc.lignes.map(([gauche, droite], j) => (
                    <tr key={j} className="border-t border-gray-100">
                      <td className="px-4 py-2.5 text-gray-600 italic">« {gauche} »</td>
                      <td className="px-4 py-2.5 text-gray-600 italic">« {droite} »</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {bloc.sortie?.map((p, j) => (
              <p key={j} className="text-gray-600 leading-relaxed mb-4">
                {p}
              </p>
            ))}
          </div>
        );
      })}
    </>
  );
}

/** Barre de navigation entre les pages du portrait. actif = "" pour l'introduction. */
export function NavPagesType({
  type,
  role,
  actif,
}: {
  type: PersonalityType;
  role: Role;
  actif: string;
}) {
  const contenu = getContenuType(type.code);
  if (!contenu) return null;
  const base = `/types-de-personnalite/${type.slug}`;
  const onglets = [
    { slug: "", label: "Introduction" },
    ...contenu.pages.map((p) => ({ slug: p.slug, label: p.titre })),
  ];
  return (
    <nav
      className="sticky top-[57px] z-40 bg-white border-b border-gray-100"
      aria-label="Pages du portrait"
    >
      <div className="max-w-5xl mx-auto px-6 flex gap-1 overflow-x-auto">
        {onglets.map((o) => (
          <Link
            key={o.slug}
            href={o.slug ? `${base}/${o.slug}` : base}
            className="whitespace-nowrap py-3.5 px-3 text-sm font-semibold border-b-[3px] transition-colors"
            style={
              o.slug === actif
                ? { color: role.color, borderColor: role.color }
                : { color: "#6b7280", borderColor: "transparent" }
            }
          >
            {o.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

// =============================================================================
// Fabrique des sous-pages : chaque dossier de section appelle creerSection(slug).
// =============================================================================

export function creerSection(slug: string) {
  async function generateMetadata({
    params,
  }: {
    params: Promise<{ code: string }>;
  }): Promise<Metadata> {
    const { code } = await params;
    const type = getType(code);
    const page = type && getPageDeType(type.code, slug);
    if (!type || !page) return { title: "Page introuvable" };
    return { title: page.titreSeo, description: page.description };
  }

  function generateStaticParams() {
    return typesAvecPage(slug);
  }

  async function Page({ params }: { params: Promise<{ code: string }> }) {
    const { code } = await params;
    const type = getType(code);
    if (!type) notFound();
    const page = getPageDeType(type.code, slug);
    if (!page) notFound();

    const role = ROLES[type.role];
    const contenu = getContenuType(type.code)!;
    const index = contenu.pages.findIndex((p) => p.slug === slug);
    const precedente = index > 0 ? contenu.pages[index - 1] : null;
    const suivante = index < contenu.pages.length - 1 ? contenu.pages[index + 1] : null;
    const base = `/types-de-personnalite/${type.slug}`;

    return (
      <article>
        {/* En-tête */}
        <section
          className="border-b border-gray-100"
          style={{ background: `linear-gradient(180deg, ${role.soft} 0%, #fff 100%)` }}
        >
          <div className="max-w-3xl mx-auto px-6 py-10">
            <Link
              href={base}
              className="text-xs font-bold uppercase tracking-wider hover:underline"
              style={{ color: role.color }}
            >
              {type.name} · {type.code}
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">{page.titre}</h1>
          </div>
        </section>

        <NavPagesType type={type} role={role} actif={slug} />

        {/* Corps */}
        <div className="max-w-3xl mx-auto px-6 py-10">
          <BlocsRendu blocs={page.blocs} role={role} />

          {/* Page précédente / suivante */}
          <div className="flex justify-between gap-4 mt-12 pt-8 border-t border-gray-100 text-sm font-semibold">
            {precedente ? (
              <Link href={`${base}/${precedente.slug}`} style={{ color: role.color }}>
                ← {precedente.titre}
              </Link>
            ) : (
              <Link href={base} style={{ color: role.color }}>
                ← Introduction
              </Link>
            )}
            {suivante && (
              <Link href={`${base}/${suivante.slug}`} style={{ color: role.color }}>
                {suivante.titre} →
              </Link>
            )}
          </div>
        </div>
      </article>
    );
  }

  return { generateMetadata, generateStaticParams, Page };
}
