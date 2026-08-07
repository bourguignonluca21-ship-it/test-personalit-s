import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import MeshGradient from "../../../components/MeshGradient";
import ScrollHaut from "../../../components/ScrollHaut";
import { getType, TYPES } from "../../../data/types";
import { getContenuType } from "../../../data/contenuPagesTypes";
import { STYLES_PORTRAIT, typo } from "../RenduPageType";

/*
 * « SUIVI PREMIUM » — LA PAGE DE CONVERSION.
 *
 * Elle SORT du portrait, comme chez 16Personalities : cliquer dessus dans le
 * sommaire quitte les pages de description. Donc pas de PagePortrait ici —
 * ni sommaire, ni aparté, ni carrousel, ni partage, ni commentaires. Une page
 * seule, qui n'a qu'un but. Elle réutilise la feuille de style du portrait
 * pour rester dans la même DA (colonne 768, actes, texte justifié).
 *
 * Squelette relevé sur leur page premium : bandeau de prix en tête, quatre
 * arguments, FAQ, témoignages, rappel du prix avec la garantie.
 *
 * ⚠️ TOUT LE CONTENU EST PROVISOIRE : prix, promesses, réponses et témoignages
 * sont des emplacements, écrits pour juger du dessin. Les témoignages DOIVENT
 * être remplacés par de vrais avis avant toute mise en ligne : publier de faux
 * avis clients est une pratique commerciale trompeuse.
 */

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
  if (!type) return { title: "Page introuvable" };
  return {
    title: `Suivi premium ${type.code} (${type.name})`,
    description: `Le suivi premium pour les ${type.code} : un accompagnement construit sur ton portrait, tes forces et tes points d'usure.`,
  };
}

const PRIX = "29 €";

const ARGUMENTS = [
  {
    titre: "Comprendre",
    chute: "ce que les conseils généraux ne voient pas",
    texte:
      "Un portrait long, écrit pour ton type, qui explique ce qui te met en mouvement et ce qui te vide. Pas une liste de qualités : le mécanisme qui produit les deux, et ce que ça change dans une journée ordinaire.",
  },
  {
    titre: "Avancer",
    chute: "sans te renier en chemin",
    texte:
      "Des repères pour tenir une position, poser une limite, dire non à temps. Le suivi part de ta manière de fonctionner, pas d'un modèle unique qu'il faudrait imiter.",
  },
  {
    titre: "Mieux lire",
    chute: "les gens autour de toi",
    texte:
      "Ce qui motive chaque type, ce qui le braque, ce qu'il entend quand tu crois avoir été clair. De quoi désamorcer des malentendus qui se répètent depuis des années.",
  },
  {
    titre: "Mesurer",
    chute: "plutôt que deviner",
    texte:
      "Ton spectre exact sur les quatre axes, revu dans le temps. On te montre ce qui bouge et ce qui ne bouge pas, sans te promettre un métier ni un avenir.",
  },
];

const FAQ = [
  {
    q: "En quoi ça diffère du portrait gratuit ?",
    r: "Le portrait gratuit décrit ton type. Le suivi part de là et travaille sur toi : il reprend tes réponses, ton spectre exact, et déroule les situations où ce fonctionnement t'aide et celles où il te coûte.",
  },
  {
    q: "Est-ce que ça va me donner un métier ?",
    r: "Non, et personne ne peut le faire honnêtement. Un type de personnalité ne détermine pas un métier. Ce que le suivi t'apporte, c'est de quoi reconnaître les environnements où tu tiens dans la durée, et ceux qui t'usent.",
  },
  {
    q: "Combien de temps faut-il y consacrer ?",
    r: "Tu avances à ton rythme. Tout reste accessible, tu peux y revenir des mois plus tard, et le contenu s'enrichit sans que tu aies à repayer.",
  },
  {
    q: "Mes réponses sont-elles utilisées ailleurs ?",
    r: "Non. Tes réponses et tes résultats t'appartiennent : ils ne sont jamais vendus, et tu peux les supprimer quand tu veux.",
  },
  {
    q: "Et si ça ne me correspond pas ?",
    r: "Tu es remboursé sur simple demande dans les trente jours, sans avoir à te justifier.",
  },
];

const AVIS = [
  {
    texte:
      "Je m'attendais à une liste de qualités. J'ai eu une explication de pourquoi je m'épuise toujours au même endroit, et ça, personne ne me l'avait jamais dit aussi clairement.",
    qui: "Camille",
  },
  {
    texte:
      "Ce qui m'a le plus servi, ce n'est pas ce que ça disait de moi, c'est ce que ça disait des autres. J'ai arrêté de prendre pour de la froideur ce qui n'en était pas.",
    qui: "Nordine",
  },
  {
    texte:
      "Honnête sur ses limites, ce qui m'a mis en confiance. On ne m'a rien promis, on m'a montré comment je fonctionne et laissé décider de la suite.",
    qui: "Élise",
  },
];

export default async function PagePremium({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const type = getType(code);
  if (!type) notFound();
  if (!getContenuType(type.code)) notFound();

  // La page de conversion garde TOUJOURS le vert de marque : elle vend le
  // même pack, quel que soit le type d'où l'on vient.
  const accent = { "--accent": "rgba(51,164,116,0.85)", "--soft": "#eef8f3" } as CSSProperties;
  const base = `/types-de-personnalite/${type.slug}`;

  const offre = (
    <div className="prem-carte">
      <h2>Le suivi premium des {type.code}, construit sur ton portrait.</h2>
      <p>
        Tout ce que le portrait public ne pouvait pas dire, parce qu&apos;il
        s&apos;adresse à tout le monde et pas à toi.
      </p>
      <span className="prem-prix">{PRIX}</span>
      <Link href="/pack-carriere-premium" className="prem-cta">
        Continuer
      </Link>
      <div className="prem-garantie">Remboursé trente jours, sans motif</div>
    </div>
  );

  return (
    <div className="pt" style={accent}>
      <style dangerouslySetInnerHTML={{ __html: STYLES_PORTRAIT }} />
      <ScrollHaut />
      <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[100svh]">
        <MeshGradient />
      </div>

      <header className="ouverture">
        <h1 className="titre-section">Suivi premium</h1>
        <Link href={base} className="sous-titre">
          {type.name}, personnalité <b>{type.code}</b>
        </Link>
        <p className="chapeau">
          {typo(
            "Le portrait s'arrête à ce que tu es. Le suivi commence à ce que tu en fais.",
          )}
        </p>
      </header>

      <div className="prem-offre">{offre}</div>

      {ARGUMENTS.map((a) => (
        <section className="acte" key={a.titre}>
          <h2>
            {a.titre} <span className="vert">{typo(a.chute)}</span>
          </h2>
          <div className="argument">
            <div className="ligne">{typo(a.texte)}</div>
          </div>
        </section>
      ))}

      <section className="acte">
        <h2>
          Les questions <span className="vert">qu&apos;on nous pose</span>
        </h2>
        <div className="faq">
          {FAQ.map((f) => (
            <details key={f.q}>
              <summary>
                {typo(f.q)}
                <span className="signe-plus" aria-hidden>
                  +
                </span>
              </summary>
              <p className="reponse">{typo(f.r)}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="acte">
        <h2>
          Ce qu&apos;en disent{" "}
          <span className="vert">celles et ceux qui l&apos;ont suivi</span>
        </h2>
        <div className="avis">
          {AVIS.map((a) => (
            <figure key={a.qui}>
              <blockquote>{typo(a.texte)}</blockquote>
              <figcaption>{a.qui}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <div className="prem-offre prem-bas">{offre}</div>

      <div className="prem-retour">
        <Link href={base} className="lien-precedent">
          <span className="pastille">
            <svg
              viewBox="0 0 24 24"
              width="19"
              height="19"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </span>
          <span className="suite-titre">Revenir au portrait {type.code}</span>
        </Link>
      </div>
    </div>
  );
}
