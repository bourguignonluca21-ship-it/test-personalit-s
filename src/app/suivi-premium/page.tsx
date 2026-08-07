import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import MeshGradient from "../components/MeshGradient";
import ScrollHaut from "../components/ScrollHaut";
import { STYLES_PORTRAIT, typo } from "../types-de-personnalite/[code]/RenduPageType";

/*
 * /suivi-premium — LA PAGE DE CONVERSION GÉNÉRALE, celle de la navbar.
 *
 * Même rôle que le « Career Suite » de 16Personalities : une entrée de premier
 * niveau, dédiée à la vente du pack. Elle ne dépend d'aucun type ; la version
 * par type vit dans types-de-personnalite/[code]/suivi-premium.
 *
 * Elle réutilise la feuille de style du portrait pour rester dans la même DA
 * (colonne 768, actes, texte justifié, vert réservé aux titres), mais sans la
 * coquille du portrait : ni sommaire, ni aparté, ni commentaires.
 *
 * ⚠️ CONTENU PROVISOIRE : prix, promesses, réponses et témoignages sont des
 * emplacements. Les témoignages DOIVENT être remplacés par de vrais avis avant
 * toute mise en ligne : publier de faux avis est une pratique commerciale
 * trompeuse.
 */

export const metadata: Metadata = {
  title: "Suivi premium — un accompagnement construit sur ta personnalité",
  description:
    "Le portrait s'arrête à ce que tu es. Le suivi commence à ce que tu en fais : un accompagnement bâti sur ton type, tes forces et tes points d'usure.",
};

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
    q: "Faut-il avoir fait le test avant ?",
    r: "Oui, et il est gratuit. Le suivi se construit sur tes réponses : sans elles, il ne serait qu'un texte de plus sur les seize types.",
  },
  {
    q: "En quoi ça diffère du portrait gratuit ?",
    r: "Le portrait gratuit décrit ton type. Le suivi part de là et travaille sur toi : il reprend tes réponses, ton spectre exact, et déroule les situations où ce fonctionnement t'aide et celles où il te coûte.",
  },
  {
    q: "Est-ce que ça va me donner un métier ?",
    r: "Non, et personne ne peut le faire honnêtement. Un type de personnalité ne détermine pas un métier. Ce que le suivi t'apporte, c'est de quoi reconnaître les environnements où tu tiens dans la durée, et ceux qui t'usent.",
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

export default function PageSuiviPremium() {
  // Pas de type ici : la page prend le vert de marque du site.
  const accent = {
    "--accent": "rgba(51,164,116,0.85)",
    "--soft": "#eef8f3",
  } as CSSProperties;

  const offre = (
    <div className="prem-carte">
      <h2>Un suivi bâti sur ta personnalité, pas sur la moyenne des gens.</h2>
      <p>
        Tout ce que le portrait public ne peut pas dire, parce qu&apos;il
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
        <h1 className="titre">Suivi premium</h1>
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
        <Link href="/types-de-personnalite" className="lien-precedent">
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
          <span className="suite-titre">Voir les 48 personnalités</span>
        </Link>
      </div>
    </div>
  );
}
