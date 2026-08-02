"use client";

import { ROLES, ROLE_ORDER } from "../data/types";

/*
  SOMMAIRE DES 4 FAMILLES (sous le chapeau de l'ouverture).
  Raccourci pour qui sait déjà ce qu'il cherche, et annonce du plan de la page
  dès la première seconde. Le hub est un MENU : on doit pouvoir sauter, pas
  seulement descendre.

  La glisse n'est PAS redupliquée : chaque pastille déclenche le clic du point
  correspondant de NavigationHub, qui possède déjà le glissement coordonné
  (arret-ressort + __glissePageEnCours). Une seule animation de page à la fois.
*/

// Le point « analystes » vise le CONTENU de la famille, pas la section.
const CIBLE: Record<string, string> = { analystes: "fam-contenu-analystes" };

const STYLE = `
.hub .sommaire{margin-top:24px;display:flex;flex-wrap:wrap;gap:9px;}
.hub .som-lien{font-size:13.5px;font-weight:600;line-height:1;border-radius:999px;padding:9px 16px;background:#fff;border:1px solid currentColor;cursor:pointer;transition:background .25s ease,transform .25s cubic-bezier(.22,.9,.3,1);}
.hub .som-lien:hover{background:var(--som-soft);transform:translateY(-2px);}
`;

export default function SommaireFamilles() {
  return (
    <div className="sommaire" data-anim="up" data-delay="250">
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />
      {ROLE_ORDER.map((cle) => {
        const role = ROLES[cle];
        return (
          <button
            key={cle}
            type="button"
            className="som-lien"
            style={{ color: role.color, ["--som-soft" as string]: role.soft }}
            onClick={() => {
              const id = CIBLE[cle] ?? `fam-${cle}`;
              const point = document.querySelector<HTMLButtonElement>(
                `.points-hub [data-cible="${id}"]`,
              );
              if (point) point.click();
              else document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" });
            }}
          >
            {role.name}
          </button>
        );
      })}
    </div>
  );
}
