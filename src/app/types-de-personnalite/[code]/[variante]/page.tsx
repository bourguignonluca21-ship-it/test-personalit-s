import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MeshGradient from "../../../components/MeshGradient";
import ScrollHaut from "../../../components/ScrollHaut";
import { ROLES } from "../../../data/types";
import { getVariante, toutesLesVariantes, variantesDuType } from "../../../data/variantes";
import { DESCRIPTIONS_VARIANTES_COURTES } from "../../../data/descriptionsVariantesCourtes";

/*
 * ⚠️ PREMIÈRE VERSION, VOLONTAIREMENT MINIMALE.
 * Cette route existe pour que les puces du hub mènent quelque part de réel
 * (48 adresses, cœur du SEO avec les 16 pages de type). Le contenu affiché ici
 * est UNIQUEMENT de la donnée qui existe déjà (nom de la variante, type
 * parent, description courte). Le vrai GABARIT des pages de variante reste à
 * concevoir avec Luca : c'est le chantier suivant, à faire en même temps que
 * celui des 16 pages de type.
 */

// Prérendu des 48 pages au build.
export function generateStaticParams() {
  return toutesLesVariantes().map((v) => ({ code: v.type.slug, variante: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string; variante: string }>;
}): Promise<Metadata> {
  const { code, variante } = await params;
  const v = getVariante(code, variante);
  if (!v) return { title: "Variante introuvable" };
  const desc = DESCRIPTIONS_VARIANTES_COURTES[`${v.type.code}-${v.cle}`];
  return {
    title: `${v.nom} : la variante ${v.cle} du type ${v.type.name} (${v.type.code})`,
    description: desc ?? `${v.nom}, l'une des 3 façons d'être ${v.type.name} (${v.type.code}).`,
  };
}

const STYLES = `
.varpage{--noir:rgba(0,0,0,0.75);--gris:rgba(0,0,0,0.5);--ease:cubic-bezier(.22,.9,.3,1);color:var(--noir);}
.varpage .colonne{max-width:768px;margin:0 auto;padding:48px 16px 96px;box-sizing:border-box;}
@media (min-width:768px){.varpage .colonne{padding-left:0;padding-right:0;padding-top:60px;}}
.varpage .fil{font-size:13px;color:var(--gris);display:flex;gap:8px;flex-wrap:wrap;align-items:center;}
.varpage .fil a:hover{text-decoration:underline;}
.varpage .surtitre{margin-top:34px;font-size:13px;font-weight:600;letter-spacing:0.04em;}
.varpage h1{margin-top:8px;font-size:clamp(32px,4.4vw,50px);font-weight:700;letter-spacing:-0.02em;line-height:1.12;}
.varpage .chapeau{margin-top:18px;font-size:18.5px;color:var(--gris);line-height:1.6;}
.varpage .trait{border:none;border-top:1px solid rgba(51,164,116,0.3);margin:44px 0;}
.varpage h2{font-size:22px;font-weight:700;letter-spacing:-0.01em;}
.varpage .soeurs{margin-top:16px;display:grid;gap:10px;}
.varpage .soeur{display:block;border:1px solid rgba(0,0,0,0.07);border-radius:16px;padding:16px 18px;background:#fff;transition:transform .3s var(--ease),box-shadow .3s;box-shadow:0 10px 30px -20px rgba(0,0,0,0.18);}
.varpage .soeur:hover{transform:translateY(-3px);box-shadow:0 18px 40px -20px rgba(0,0,0,0.22);}
.varpage .soeur-nom{display:block;font-size:16px;font-weight:700;}
.varpage .soeur-txt{display:block;margin-top:5px;font-size:13.5px;color:var(--gris);line-height:1.5;}
.varpage .final{margin-top:48px;border-radius:24px;background:rgb(102,187,151);text-align:center;padding:56px 24px;color:#fff;}
.varpage .final h2{color:#fff;font-size:clamp(26px,3.4vw,34px);line-height:1.15;}
.varpage .final p{color:rgba(255,255,255,0.85);font-size:17px;margin:16px auto 0;max-width:460px;line-height:1.6;}
.varpage .cta{display:inline-block;margin-top:28px;background:#fff;color:rgba(51,164,116,0.95);font-weight:600;padding:14px 34px;border-radius:999px;font-size:16px;transition:transform .3s;}
.varpage .cta:hover{transform:scale(1.05);}
`;

export default async function VariantePage({
  params,
}: {
  params: Promise<{ code: string; variante: string }>;
}) {
  const { code, variante } = await params;
  const v = getVariante(code, variante);
  if (!v) notFound();

  const role = ROLES[v.type.role];
  const description = DESCRIPTIONS_VARIANTES_COURTES[`${v.type.code}-${v.cle}`];
  const soeurs = variantesDuType(v.type).filter((s) => s.cle !== v.cle);

  return (
    <div className="varpage">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <ScrollHaut />
      <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[100svh]">
        <MeshGradient />
      </div>

      <div className="colonne">
        <nav className="fil" aria-label="Fil d'Ariane">
          <Link href="/types-de-personnalite">Les 48 personnalités</Link>
          <span aria-hidden>›</span>
          <Link href={`/types-de-personnalite/${v.type.slug}`}>
            {v.type.name} ({v.type.code})
          </Link>
        </nav>

        <p className="surtitre" style={{ color: role.color }}>
          L&apos;une des 3 façons d&apos;être {v.type.name}
        </p>
        <h1 data-anim="up">{v.nom}</h1>
        {description && (
          <p className="chapeau" data-anim="up" data-delay="150">
            {description}
          </p>
        )}

        <hr className="trait" />

        <h2>Les deux autres façons d&apos;être {v.type.name}</h2>
        <div className="soeurs">
          {soeurs.map((s) => (
            <Link key={s.cle} href={s.href} className="soeur">
              <span className="soeur-nom" style={{ color: role.color }}>
                {s.nom}
              </span>
              <span className="soeur-txt">
                {DESCRIPTIONS_VARIANTES_COURTES[`${s.type.code}-${s.cle}`] ?? ""}
              </span>
            </Link>
          ))}
        </div>

        <div className="final">
          <h2>Quarante-huit profils. Un seul est le tien.</h2>
          <p>
            Tu te reconnais dans {v.nom} ? Le test te le dira, et te donnera les
            nuances qui vont avec.
          </p>
          <Link className="cta" href="/test">
            Faire le test
          </Link>
        </div>
      </div>
    </div>
  );
}
