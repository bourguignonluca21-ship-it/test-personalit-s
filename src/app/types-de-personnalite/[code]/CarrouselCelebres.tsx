"use client";

import { useRef } from "react";
import { useRailDefilant } from "../../lib/useRailDefilant";

/*
 * Carrousel des personnalités connues du type.
 *
 * Le COMPORTEMENT du rail (boucle infinie, dérive lente, glisse à la souris,
 * pause au survol, fiche du milieu marquée) n'est pas écrit ici : il vient du
 * modèle partagé `lib/useRailDefilant`, le même que celui de la rangée des
 * réseaux. Ici, uniquement l'habillage.
 *
 * ⚠️ CONTENU PROVISOIRE. Attribuer un type de personnalité à une personne
 * réelle sans source vérifiable serait une affirmation qu'on ne peut pas
 * soutenir : les noms ci-dessous sont des emplacements, le dessin est arrêté.
 */

const FICHES = [
  { nom: "Prénom Nom", role: "Autrice" },
  { nom: "Prénom Nom", role: "Musicien" },
  { nom: "Prénom Nom", role: "Réalisatrice" },
  { nom: "Prénom Nom", role: "Scientifique" },
  { nom: "Prénom Nom", role: "Comédien" },
  { nom: "Prénom Nom", role: "Sportive" },
  { nom: "Prénom Nom", role: "Philosophe" },
  { nom: "Prénom Nom", role: "Entrepreneuse" },
  { nom: "Prénom Nom", role: "Peintre" },
  { nom: "Prénom Nom", role: "Journaliste" },
];

const STYLE = `
/* Le carrousel vient AVANT le bandeau « Faire le test », qui apporte lui-même
   ses 120 px au-dessus : rien en dessous ici, sinon l'écart doublerait. */
.pt .celebres{padding:110px 0 0;}
.pt .cel-entete{max-width:768px;margin:0 auto;padding:0 16px;box-sizing:border-box;}
.pt .cel-entete h2{font-size:clamp(30px,4.5vw,46px);font-weight:700;letter-spacing:-0.02em;line-height:1.12;margin:0;}
@media (min-width:768px){.pt .cel-entete{padding-left:0;padding-right:0;}}
/* Le texte d'introduction, dans la colonne : c'est la ligne de contenu du site. */
.pt .cel-intro{margin-top:34px;}
/* LE RAIL FAIT 768 COMME LE RESTE DE LA PAGE, sur le même axe. */
.pt .cel-rail-zone{position:relative;margin-top:26px;max-width:768px;margin-left:auto;margin-right:auto;padding:0 16px;box-sizing:border-box;}
@media (min-width:768px){.pt .cel-rail-zone{padding-left:0;padding-right:0;}}
/* AUCUN RETRAIT : les cinq célébrités entières occupent toute la largeur du
   rail, la première touche le bord gauche, la cinquième le bord droit.
   Le fondu des extrémités (masque, comme .ha .defile de la home) est DISCRET :
   14 px. Assez pour adoucir l'arrivée d'une fiche, trop peu pour entamer un nom.
   Le rail ne défile QUE de gauche à droite : sans overflow-y:hidden, poser
   overflow-x:auto rend AUSSI l'axe vertical défilable. Le retrait vertical de
   10 px laisse la place aux fiches qui grossissent, sans qu'elles soient
   rognées par la coupe. */
.pt .cel-rail{display:flex;gap:24px;overflow-x:auto;overflow-y:hidden;overscroll-behavior-x:contain;padding:10px 0;scrollbar-width:none;-ms-overflow-style:none;scroll-behavior:auto;
  -webkit-mask-image:linear-gradient(90deg,transparent,#000 14px,#000 calc(100% - 14px),transparent);
  mask-image:linear-gradient(90deg,transparent,#000 14px,#000 calc(100% - 14px),transparent);}
.pt .cel-rail::-webkit-scrollbar{display:none;}
/* CINQ FICHES : la cinquième part du rail, les quatre écarts déduits.
   AUCUNE CARTE : l'étoile, et dessous qui c'est. Pas de fond blanc, pas de
   cadre, pas d'ombre : le visuel porte, le nom suit, centré. */
.pt .cel-fiche{flex:0 0 calc((100% - 96px) / 5);text-align:center;transition:transform .45s var(--ease);}
/* Celle du milieu grossit un peu. Très léger : le transform ne touche pas au
   flux, donc rien ne bouge autour. */
.pt .cel-fiche.centre{transform:scale(1.08);}
@media (max-width:760px){.pt .cel-fiche{flex-basis:calc((100% - 48px) / 3);}}
@media (max-width:520px){.pt .cel-fiche{flex-basis:calc((100% - 24px) / 2);}}
/* L'ÉTOILE tient la place de l'illustration à venir. Partout où elle est posée
   sur le site, une image viendra : c'est le repère visuel. Elle occupe donc la
   hauteur qu'occupera le dessin.
   AU SURVOL elle grossit, exactement comme les tuiles de la rangée des réseaux
   et les emblèmes du défilé de la home : mêmes valeurs, même courbe. */
.pt .cel-etoile{display:flex;align-items:center;justify-content:center;height:96px;color:var(--accent);font-size:52px;line-height:1;transition:transform .4s var(--ease);}
.pt .cel-fiche:hover .cel-etoile{transform:scale(1.25) rotate(-2deg);}
.pt .cel-nom{display:block;margin-top:12px;font-size:15px;font-weight:700;line-height:1.25;color:var(--noir);}
.pt .cel-role{display:block;margin-top:3px;font-size:12.5px;color:var(--gris);}
@media (prefers-reduced-motion: reduce){
  .pt .cel-fiche,.pt .cel-etoile{transition:none;}
  .pt .cel-fiche.centre{transform:none;}
  .pt .cel-fiche:hover .cel-etoile{transform:none;}
}
`;

export default function CarrouselCelebres({ code }: { code: string }) {
  const rail = useRef<HTMLDivElement>(null);
  useRailDefilant(rail, { classeCentre: "centre" });

  const fiches = [...FICHES, ...FICHES, ...FICHES];

  return (
    <section className="celebres">
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />
      <div className="cel-entete">
        <h2>
          Eux aussi, <span className="vert">ils sont {code}&nbsp;:</span>
        </h2>
        <p className="ligne cel-intro">
          Depuis que les tests de personnalité existent, les personnalités
          célèbres ne sont pas restées à l&apos;écart de la quête de se
          connaître. Voici celles à qui l&apos;on associe le type {code}.
        </p>
      </div>
      <div className="cel-rail-zone">
        <div className="cel-rail" ref={rail}>
          {fiches.map((f, i) => (
            <article className="cel-fiche" key={i} aria-hidden={i >= FICHES.length}>
              <span className="cel-etoile" aria-hidden>
                ★
              </span>
              <span className="cel-nom">{f.nom}</span>
              <span className="cel-role">{f.role}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
