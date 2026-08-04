import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getType, ROLES, TYPES } from "../../data/types";
import { getContenuType } from "../../data/contenuPagesTypes";
import { ActesRendu, PagePortrait, typo } from "./RenduPageType";

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
  const contenu = getContenuType(type.code);
  if (contenu) {
    return { title: contenu.intro.titreSeo, description: contenu.intro.description };
  }
  return {
    title: `${type.name} (${type.code})`,
    description: `${type.name} (${type.code}) : ${type.tagline}`,
  };
}

export default async function TypePage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const type = getType(code);
  if (!type) notFound();

  const role = ROLES[type.role];
  const contenu = getContenuType(type.code);

  return (
    <PagePortrait
      type={type}
      role={role}
      actif=""
      titre={type.name}
      sousTitre={
        <p className="sous-titre">
          Personnalité <b>{type.code}</b>
        </p>
      }
      chapeau={typo(type.tagline)}
    >
      {contenu && (
        <ActesRendu
          blocs={contenu.intro.blocs}
          tete={
            contenu.intro.exergue ? (
              <p className="exergue">
                {typo(contenu.intro.exergue)}
              </p>
            ) : undefined
          }
        />
      )}
    </PagePortrait>
  );
}
