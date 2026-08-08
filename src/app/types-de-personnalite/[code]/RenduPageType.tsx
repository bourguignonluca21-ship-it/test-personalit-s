import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";
import CarrouselCelebres from "./CarrouselCelebres";
import CouronnePremium from "../../components/CouronnePremium";
import ColonnesCentrees from "./ColonnesCentrees";
import SectionPartage from "./SectionPartage";
import Commentaires from "./Commentaires";
import FenetreProche from "./FenetreProche";
import MeshGradient from "../../components/MeshGradient";
import ScrollHaut from "../../components/ScrollHaut";
import { getType, ROLES, type PersonalityType, type Role } from "../../data/types";
import {
  getContenuType,
  getPageDeType,
  typesAvecPage,
  type BlocPage,
} from "../../data/contenuPagesTypes";

// =============================================================================
// LES PAGES DE TYPE — mise en page uniquement.
// Le contenu vit dans data/contenuPagesTypes.ts et n'est pas touché ici.
//
// Langage visuel : celui de la home (.ha) et de « Notre approche » (.na).
//   • fond blanc, aucune bande teintée, aucune carte encadrée ;
//   • un écran = un titre + des lignes d'argument, accents verts ;
//   • le visuel fort à droite du titre, comme le grand chiffre de la home ;
//   • colonne de texte 768 centrée, sur l'axe de la navbar.
// Le sommaire des 12 pages est DANS LE FLUX, juste sous l'en-tête : c'est le
// composant .som de « Notre approche », repris valeur pour valeur.
// =============================================================================

// Le signe de chaque type, en attendant la direction artistique des personnages.
const SIGNES: Record<string, string> = {
  INFP: "∞",
  INFJ: "★",
  INTJ: "◆",
  INTP: "◇",
  ENTJ: "▲",
  ENTP: "△",
  ENFJ: "●",
  ENFP: "☆",
  ISTJ: "■",
  ISFJ: "□",
  ESTJ: "▼",
  ESFJ: "▽",
  ISTP: "◐",
  ISFP: "○",
  ESTP: "✕",
  ESFP: "✚",
};


const STYLES = `
.pt{--vert-plein:rgb(82,178,137);--noir:rgba(0,0,0,0.75);--gris:rgba(0,0,0,0.5);--ease:cubic-bezier(.22,.9,.3,1);--nav:84px;color:var(--noir);}
.pt a{color:inherit;}

/* ————— L'ouverture : le patron de « Notre approche », colonne 768 ————— */
.pt .ouverture{max-width:768px;margin:0 auto;padding:48px 16px 0;box-sizing:border-box;}
@media (min-width:768px){.pt .ouverture{padding-left:0;padding-right:0;padding-top:60px;}}
/* Titre + visuel, comme la pin-grid de la home (titre à gauche, visuel à droite) */
.pt .tete{display:grid;grid-template-columns:minmax(0,1fr) 300px;column-gap:36px;align-items:center;}
@media (max-width:760px){.pt .tete{grid-template-columns:1fr;row-gap:30px;}}
.pt .titre{font-size:clamp(38px,5.2vw,64px);font-weight:700;letter-spacing:-0.02em;line-height:1.12;margin:0;color:var(--accent);}
.pt .titre b{color:var(--accent);font-weight:700;}
.pt .titre-section{font-size:clamp(30px,4.5vw,46px);font-weight:700;letter-spacing:-0.02em;line-height:1.12;margin:0;}
/* La ligne d'identité sous le titre : « Personnalité INFJ » */
.pt .sous-titre{margin:8px 0 0;font-size:clamp(23px,2.9vw,32px);font-weight:700;letter-spacing:-0.01em;line-height:1.2;color:var(--noir);}
.pt .sous-titre b{color:var(--accent);font-weight:700;}
.pt a.sous-titre{display:inline-block;transition:opacity .25s;}
.pt a.sous-titre:hover{opacity:0.75;}
.pt .chapeau{margin-top:20px;font-size:21px;color:var(--gris);line-height:1.65;}
/* Le signe : l'emplacement du grand chiffre vert de la home. */
.pt .visuel{display:flex;flex-direction:column;align-items:center;gap:14px;}
.pt .signe{font-size:clamp(126px,16vw,208px);line-height:1;color:var(--accent);font-weight:400;}

/* ————— Le sommaire : le .som de « Notre approche ».
   Sous 1280 px il vit dans le flux, sous l'en-tête, en deux colonnes.
   Au-dessus, il passe dans la GOUTTIÈRE de gauche (bord aligné sur le logo
   de la navbar) et suit la descente jusqu'à la fin du contenu, comme 16P. */
.pt .corps{position:relative;}
.pt .som{max-width:768px;margin:38px auto 0;box-sizing:border-box;text-align:left;padding:0 16px;}
@media (min-width:768px){.pt .som{padding-left:0;padding-right:0;}}
.pt .som-entete{font-size:12px;letter-spacing:1.4px;text-transform:uppercase;color:var(--noir);font-weight:600;margin-bottom:10px;display:flex;align-items:center;gap:10px;}
.pt .som-entete b{color:var(--accent);}
.pt .som-grille{display:grid;grid-template-columns:1fr 1fr;gap:2px 22px;list-style:none;margin:0;padding:0;}
@media (max-width:640px){.pt .som-grille{grid-template-columns:1fr;}}
.pt .som-item{display:flex;align-items:center;gap:13px;padding:10px 12px;border-radius:12px;color:var(--noir);transition:color .25s;text-align:left;width:100%;}
/* Au survol : rien ne se colore en bloc, c'est le TEXTE qui grossit et
   passe au vert. Le grossissement est un scale, pas un changement de
   taille : la ligne ne pousse pas ses voisines. */
.pt .som-item:hover{color:var(--accent);}
.pt .som-item .lbl{transform-origin:left center;transition:transform .25s var(--ease);}
.pt .som-item:hover .lbl{transform:scale(1.08);}
.pt .som-item .lbl{flex:1;font-size:15px;font-weight:600;}
/* La couronne du suivi premium : elle prend la place de la puce, donc on
   retire le retrait de gauche de cette entrée pour que le texte reste
   aligné sur celui des dix autres. */
/* La couronne sort dans la marge (marge négative) : le libellé « Suivi
   premium » retombe ainsi sur la même verticale que les dix autres. */
.pt .som-couronne{display:flex;flex:none;align-items:center;margin-left:-27px;margin-right:-7px;color:var(--accent);}
.pt .som-item .fl{margin-left:auto;display:flex;align-items:center;color:var(--accent);opacity:0;transition:opacity .25s,transform .25s;}
.pt .som-item:hover .fl{opacity:1;transform:translateX(2px);}
/* Page courante : le texte seul est vert, aucun fond. */
.pt .som-grille li.actif .som-item{color:var(--accent);}
.pt .som-grille li.actif .fl{opacity:1;}

/* ————— L'aparté de droite : composition typographique, texte seul.
   CONTENU PROVISOIRE : le design est arrêté, les mots seront remplacés. ————— */
.pt .aparte{max-width:768px;margin:40px auto 0;padding:0 16px;box-sizing:border-box;}
@media (min-width:768px){.pt .aparte{padding-left:0;padding-right:0;}}
.pt .ap-titre{font-size:clamp(24px,2.05vw,30px);font-weight:700;letter-spacing:-0.025em;line-height:1.08;}
.pt .ap-titre span{display:block;white-space:nowrap;}
.pt .ap-titre .p1{color:var(--gris);font-size:0.58em;font-weight:600;letter-spacing:-0.01em;}
.pt .ap-titre .p2{color:var(--noir);font-size:0.86em;margin-top:6px;}
.pt .ap-titre .p3{color:var(--accent);font-size:1.3em;margin-top:4px;}
.pt .ap-texte{margin-top:22px;font-size:14.5px;line-height:1.72;color:var(--gris);font-style:italic;}
.pt .ap-texte b{color:var(--noir);font-weight:700;}
.pt .ap-ref{margin-top:14px;text-align:left;font-style:normal;font-size:13px;font-variant-caps:small-caps;letter-spacing:0.07em;color:var(--noir);}

/* ————— Les deux gouttières, au-dessus de 1280 px ————— */
@media (min-width:1280px){
  /* Les colonnes démarrent au niveau du premier titre de section (86 px sous
     le haut du corps, la valeur de .acte.premier) et suivent la descente. */
  .pt .som,.pt .aparte{position:absolute;top:86px;bottom:0;width:min(292px,calc(50% - 384px - 32px - 40px));margin:0;padding:0;z-index:2;}
  .pt .som{left:32px;}
  .pt .enveloppe-aparte{position:relative;}
  .pt .aparte{right:32px;}
  .pt .som-dedans{position:sticky;top:max(calc(var(--nav) + 20px),calc((100svh + var(--nav) - var(--som-h,420px)) / 2));}
  .pt .ap-dedans{position:sticky;top:max(calc(var(--nav) + 20px),calc((100svh + var(--nav) - var(--ap-h,300px)) / 2));}
  .pt .som-entete{padding:0 12px;margin-bottom:10px;}
  .pt .som-grille{grid-template-columns:1fr;gap:0;}
  .pt .som-item .lbl{font-size:14.5px;}
}

/* ————— Les actes : fond blanc, un titre et ses lignes d'argument ————— */
.pt .acte{max-width:768px;margin:0 auto;padding:110px 16px 0;box-sizing:border-box;}
@media (min-width:768px){.pt .acte{padding-left:0;padding-right:0;}}
.pt .acte.premier{padding-top:86px;}
@media (max-width:700px){.pt .acte{padding-top:78px;}.pt .acte.premier{padding-top:58px;}}
.pt .acte h2{font-size:clamp(30px,4.5vw,46px);font-weight:700;letter-spacing:-0.02em;line-height:1.12;margin:0;}
/* Un titre est en DEUX TEMPS : la chute passe au vert, comme sur la home et
   « Notre approche » (.na .vert). C'est elle qui porte l'idée. */
.pt .vert{color:var(--accent);}
.pt .argument{display:flex;flex-direction:column;gap:18px;margin-top:34px;}
.pt .argument.seul{margin-top:0;}
/* Aucun filet vert à gauche des paragraphes : Luca les a fait retirer le 04/08. */
/* Le contenu est JUSTIFIÉ : chaque ligne touche la marge de gauche ET celle
   de droite. La césure automatique (l'attribut lang="fr" du document) évite
   les trous entre les mots. La dernière ligne d'un paragraphe reste libre. */
.pt .ligne,.pt .fond{text-align:justify;-webkit-hyphens:auto;hyphens:auto;}
.pt .chapeau,.pt .ap-texte,.pt .tableau td{text-wrap:pretty;}
.pt .titre,.pt .titre-section,.pt .sous-titre,.pt .acte h2{text-wrap:balance;}
.pt .ligne{font-size:16px;line-height:1.6;}
.pt .ligne.doux{color:var(--noir);}
/* DANS LE CONTENU, RIEN N'EST VERT. Le vert est réservé aux TITRES.
   Toute mise en évidence est en noir, plus gras. */
.pt .ligne .titre-item,.pt .ligne b,.pt .accent{color:var(--noir);font-weight:700;}
/* Hors titre, une mise en évidence est en NOIR PLUS GRAS, jamais en vert :
   le vert du contenu est réservé aux titres. */
.pt .exergue{font-size:clamp(19px,2.3vw,24px);line-height:1.45;font-weight:700;letter-spacing:-0.015em;color:var(--noir);}
/* Chaque phrase de l'exergue occupe sa propre ligne, et une seule :
   si une phrase future dépasse, elle débordera visiblement plutôt que
   de se replier en silence. */
.pt .exergue span{display:block;white-space:nowrap;}
/* Le paragraphe de fond de « Notre approche » : sert au « revers » d'une force. */
.pt .fond{margin-top:2px;font-size:14px;color:var(--noir);line-height:1.65;}
.pt .fond b{color:var(--noir);font-weight:700;}
/* Le tableau : des filets verts, pas d'encadré. */
.pt .tableau{width:100%;border-collapse:collapse;}
.pt .tableau th{text-align:left;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--noir);padding:0 20px 12px 0;border-bottom:1px solid color-mix(in srgb, var(--accent) 30%, transparent);}
.pt .tableau th + th{color:var(--noir);}
.pt .tableau td{padding:14px 20px 14px 0;font-size:15.5px;line-height:1.6;font-style:italic;vertical-align:top;border-bottom:1px solid color-mix(in srgb, var(--accent) 18%, transparent);}
.pt .tableau td + td{padding-right:0;}
@media (max-width:560px){.pt .tableau th,.pt .tableau td{font-size:14px;padding-right:12px;}}

/* ————— La suite du portrait : une seule rangée. À gauche la pastille de
   retour suivie du titre de la page précédente, à droite le titre de la page
   à venir suivi de sa pastille. Tout est centré dans la rangée, donc sur la
   même ligne. Le titre de gauche est plus petit : revenir en arrière est
   l'action secondaire. ————— */
.pt .suite{max-width:768px;margin:0 auto;padding:0 16px;box-sizing:border-box;}
@media (min-width:768px){.pt .suite{padding-left:0;padding-right:0;}}
.pt .suite-dedans{margin-top:110px;}
.pt .suite-barre{display:flex;justify-content:space-between;align-items:center;gap:24px;}
.pt .pastille{display:flex;align-items:center;justify-content:center;flex:none;width:44px;height:44px;border-radius:999px;background:#fff;border:1px solid rgba(0,0,0,0.12);color:var(--gris);transition:transform .3s var(--ease),color .25s,border-color .25s;}
.pt .lien-precedent,.pt .lien-suivant{display:inline-flex;align-items:center;gap:18px;min-width:0;}
.pt .suite-titre{font-weight:700;letter-spacing:-0.02em;line-height:1.2;color:rgba(0,0,0,0.12);transition:color .3s;}
.pt .lien-suivant .suite-titre{font-size:clamp(20px,2.6vw,27px);text-align:right;}
.pt .lien-precedent .suite-titre{font-size:clamp(15px,1.9vw,20px);text-align:left;}
.pt .lien-precedent:hover .suite-titre,.pt .lien-suivant:hover .suite-titre{color:var(--accent);}
.pt .lien-precedent:hover .pastille{transform:translateX(-4px);border-color:var(--accent);color:var(--accent);}
.pt .lien-suivant:hover .pastille{transform:translateX(4px);border-color:var(--accent);color:var(--accent);}

/* ————— La page « Suivi premium ». Elle SORT du portrait : pas de gouttières,
   donc pas de sommaire ni d'aparté. Elle réutilise la colonne et les actes. ————— */
.pt .prem-bas{margin-top:20px;}
.pt .prem-retour{max-width:768px;margin:56px auto 0;padding:0 16px 120px;box-sizing:border-box;}
@media (min-width:768px){.pt .prem-retour{padding-left:0;padding-right:0;}}
.pt .prem-retour .suite-titre{font-size:clamp(15px,1.9vw,20px);}
.pt .prem-offre{max-width:768px;margin:60px auto 0;padding:0 16px;box-sizing:border-box;}
@media (min-width:768px){.pt .prem-offre{padding-left:0;padding-right:0;}}
.pt .prem-carte{width:100%;border-radius:24px;background:var(--accent);text-align:center;padding:clamp(44px,7vh,72px) 24px;color:#fff;}
.pt .prem-carte h2{color:#fff;font-size:clamp(26px,3.6vw,38px);font-weight:700;letter-spacing:-0.02em;line-height:1.14;max-width:560px;margin:0 auto;}
.pt .prem-carte p{color:rgba(255,255,255,0.85);font-size:18px;margin:18px auto 0;max-width:480px;line-height:1.6;}
.pt .prem-prix{display:block;margin-top:26px;font-size:clamp(38px,5vw,54px);font-weight:700;letter-spacing:-0.03em;line-height:1;font-variant-numeric:tabular-nums;}
.pt .prem-cta{display:inline-block;background:#fff;color:var(--accent);font-weight:600;padding:15px 38px;border-radius:999px;font-size:17px;transition:transform .3s;margin-top:26px;}
.pt .prem-cta:hover{transform:scale(1.05);}
.pt .prem-garantie{margin-top:16px;font-size:14px;color:rgba(255,255,255,0.75);}
/* FAQ : un dépliant natif, sans script. Filets verts, comme les tableaux. */
.pt .faq{border-top:1px solid color-mix(in srgb, var(--accent) 25%, transparent);margin-top:34px;}
.pt .faq details{border-bottom:1px solid color-mix(in srgb, var(--accent) 25%, transparent);}
.pt .faq summary{list-style:none;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:18px;padding:20px 0;font-size:17px;font-weight:700;line-height:1.35;transition:color .25s;}
.pt .faq summary::-webkit-details-marker{display:none;}
.pt .faq summary:hover{color:var(--accent);}
.pt .faq .signe-plus{flex:none;color:var(--accent);font-size:22px;font-weight:400;line-height:1;transition:transform .3s var(--ease);}
.pt .faq details[open] .signe-plus{transform:rotate(45deg);}
.pt .faq .reponse{padding:0 0 22px;font-size:16px;line-height:1.6;text-align:justify;-webkit-hyphens:auto;hyphens:auto;}
/* Témoignages : des paroles posées, séparées par un filet. Pas de cartes. */
.pt .avis{margin-top:34px;}
.pt .avis figure{margin:0;padding:26px 0;border-bottom:1px solid color-mix(in srgb, var(--accent) 25%, transparent);}
.pt .avis figure:first-child{border-top:1px solid color-mix(in srgb, var(--accent) 25%, transparent);}
.pt .avis blockquote{margin:0;font-size:16.5px;line-height:1.65;text-align:justify;-webkit-hyphens:auto;hyphens:auto;}
.pt .avis figcaption{margin-top:12px;font-size:12px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;color:var(--gris);}

/* ————— Le partage : la colonne 768 des actes, sous le carrousel. La rangée
   d'icônes est celle du site (components/PartageInline), posée telle quelle
   sur le fond blanc : ni bande teintée, ni carte encadrée. ————— */
.pt .partage{max-width:768px;margin:0 auto;padding:120px 16px 0;box-sizing:border-box;}
@media (min-width:768px){.pt .partage{padding-left:0;padding-right:0;}}
.pt .partage h2{font-size:clamp(30px,4.5vw,46px);font-weight:700;letter-spacing:-0.02em;line-height:1.12;margin:0;}
.pt .partage .rangee{margin-top:30px;}
/* Fondu des extrémités de la rangée des réseaux, par MASQUE : la valeur du
   carrousel de la home (.ha .defile), reprise telle quelle. Le masque est posé
   sur le conteneur qui défile, donc uniquement ici : les autres pages qui
   utilisent PartageInline ne bougent pas. */
/* Même fondu que le carrousel des célébrités : 14 px de chaque côté.
   Les deux rails se suivent dans la page et font la même largeur ;
   un fondu différent se verrait immédiatement. */
.pt .partage .pi-scroll{-webkit-mask-image:linear-gradient(90deg,transparent,#000 6px,#000 calc(100% - 6px),transparent);mask-image:linear-gradient(90deg,transparent,#000 6px,#000 calc(100% - 6px),transparent);}
@media (max-width:700px){.pt .partage{padding-bottom:96px;}}

/* ————— Le final : le bandeau du hub, à l'identique ————— */
.pt .final{max-width:768px;margin:0 auto;padding:120px 16px 0;box-sizing:border-box;}
@media (min-width:768px){.pt .final{padding-left:0;padding-right:0;}}
.pt .final-carte{width:100%;border-radius:24px;background:var(--accent);text-align:center;padding:clamp(56px,10vh,96px) 24px;color:#fff;overflow:hidden;position:relative;}
.pt .final-carte h2{color:#fff;font-size:clamp(30px,4.5vw,46px);font-weight:700;letter-spacing:-0.02em;line-height:1.12;max-width:640px;margin:0 auto;}
.pt .final-carte p{color:rgba(255,255,255,0.85);font-size:19px;margin:22px auto 0;max-width:520px;line-height:1.6;}
.pt .cta-pt{display:inline-block;background:#fff;color:var(--accent);font-weight:600;padding:15px 38px;border-radius:999px;font-size:17px;transition:transform .3s;margin-top:38px;position:relative;overflow:hidden;}
.pt .cta-pt:hover{transform:scale(1.05);}
/* Le reflet du bouton s'anime en TRANSFORM, jamais en « left » : animer « left »
   en boucle infinie recalcule la mise en page à chaque image, et c'est ce qui
   faisait saccader toute la page quand ce bandeau arrivait à l'écran. Un
   transform est traité par le compositeur : aucun recalcul, aucune saccade. */
.pt .cta-pt::after{content:"";position:absolute;top:0;left:0;width:60%;height:100%;background:linear-gradient(100deg,transparent,rgba(82,178,137,0.18),transparent);transform:translateX(-133.333%) skewX(-20deg);will-change:transform;animation:pt-brille 3.2s ease-in-out infinite;}
@keyframes pt-brille{0%,55%{transform:translateX(-133.333%) skewX(-20deg);}85%,100%{transform:translateX(216.667%) skewX(-20deg);}}
.pt .microligne{margin-top:16px;font-size:14px;display:flex;justify-content:center;gap:10px;align-items:center;color:rgba(255,255,255,0.75);}
.pt .microligne b{color:#fff;font-weight:600;}
@media (prefers-reduced-motion: reduce){.pt .cta-pt::after{animation:none;}}
`;


// -----------------------------------------------------------------------------
// TYPOGRAPHIE. Ne change aucun mot : remplace seulement certaines espaces.
//   • espace insécable avant ; : ! ? et à l'intérieur des guillemets français,
//     pour qu'une ponctuation ne se retrouve jamais seule en début de ligne ;
//   • fin de paragraphe : les derniers mots courts sont soudés entre eux, pour
//     qu'aucun bout de phrase (« y a ») ne tombe seul sur la dernière ligne.
// -----------------------------------------------------------------------------
const INSEC = "\u00A0";

function typo(texte: string): string {
  // Uniquement la ponctuation française : une espace insécable avant ; : ! ?
  // et à l'intérieur des guillemets. Rien d'autre : tout mécanisme qui soude
  // des mots en fin de paragraphe raccourcit les lignes et creuse la colonne.
  //
  // ⚠️ À PASSER SUR TOUT TEXTE AFFICHÉ, titres compris. Sans elle, une espace
  // ordinaire subsiste devant les deux-points et la ligne peut se couper là :
  // le « : » se retrouve seul en début de ligne, ce qui est une faute.
  return texte.replace(/ ([;:!?»])/g, INSEC + "$1").replace(/« /g, "«" + INSEC);
}

// -----------------------------------------------------------------------------
/** La couronne du suivi premium, identique à celle de la navbar. */
function Couronne({ taille = 15 }: { taille?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={taille}
      height={taille}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 8l3.5 3L12 5l5.5 6L21 8l-2 10H5L3 8z" />
    </svg>
  );
}

/** Le chevron du site : SVG au trait, viewBox 24, épaisseur 2, bouts arrondis. */
function Chevron({ taille = 15, sens = "droite" }: { taille?: number; sens?: "droite" | "gauche" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={taille}
      height={taille}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={sens === "gauche" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
    </svg>
  );
}

function entreesPortrait(code: string) {
  const contenu = getContenuType(code);
  if (!contenu) return null;
  return [
    { slug: "", titre: "Introduction" },
    ...contenu.pages.map((p) => ({ slug: p.slug, titre: p.titre })),
    // La page de conversion ferme le portrait. Elle n'est pas dans
    // contenuPagesTypes : elle a son propre dossier de route.
    { slug: "suivi-premium", titre: "Suivi premium" },
  ];
}

/** Le sommaire des 12 pages, dans le flux, sous l'en-tête. */
function SommairePortrait({ type, actif }: { type: PersonalityType; actif: string }) {
  const entrees = entreesPortrait(type.code);
  if (!entrees) return null;
  const base = `/types-de-personnalite/${type.slug}`;
  return (
    // Pas de data-anim sur le sommaire : le translateY(44px) de l'apparition
    // décalerait la colonne et casserait son alignement sur le premier titre.
    <nav className="som" aria-label="Les pages du portrait">
      <div className="som-dedans">
        <div className="som-entete">Explorer cette personnalité</div>
        <ol className="som-grille">
        {entrees.map((e) => {
          const estActif = e.slug === actif;
          return (
            <li key={e.slug || "intro"} className={estActif ? "actif" : undefined}>
              <Link
                href={e.slug ? `${base}/${e.slug}` : base}
                className="som-item"
                aria-current={estActif ? "page" : undefined}
              >
                {e.slug === "suivi-premium" && (
                  <span className="som-couronne">
                    <CouronnePremium taille={20} />
                  </span>
                )}
                <span className="lbl">{typo(e.titre)}</span>
                <span className="fl" aria-hidden>
                  <Chevron />
                </span>
              </Link>
            </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}

/**
 * L'aparté de la gouttière droite. Composition figée : accroche en trois temps,
 * filet, paragraphe. Le texte est une citation authentifiée de C. G. Jung,
 * lettre du 22 octobre 1916 publiée dans sa correspondance. Calibrage des trois
 * temps : 11 / 13 / 10 caractères, contre 13 / 12 / 9 pour le texte provisoire
 * qu'elle remplace, donc la composition est conservée à l'identique.
 */
function AparteDroite() {
  const script = `
(function(){
  function ajuster(){
    var c=document.querySelector('.final-carte');
    var a=document.querySelector('.aparte');
    var w=document.querySelector('.enveloppe-aparte');
    if(!c||!a||!w||window.innerWidth<1280){if(a)a.style.bottom='';return;}
    var wTop=w.getBoundingClientRect().top+window.scrollY;
    var cR=c.getBoundingClientRect();
    var centreCarte=cR.top+window.scrollY+cR.height/2-wTop;
    var ad=a.querySelector('.ap-dedans');
    var ah=ad?ad.offsetHeight:300;
    var b=w.offsetHeight-centreCarte-ah/2;
    a.style.bottom=(b>0?b:0)+'px';
  }
  var n=0;
  function essayer(){
    if(document.querySelector('.final-carte')&&document.querySelector('.aparte')){
      ajuster();
      window.addEventListener('resize',ajuster);
      new ResizeObserver(ajuster).observe(document.querySelector('.enveloppe-aparte'));
    }else if(n++<100){requestAnimationFrame(essayer);}
  }
  requestAnimationFrame(essayer);
})()`;
  return (
    <aside className="aparte" aria-label="Citation de Carl Gustav Jung">
      <script dangerouslySetInnerHTML={{ __html: script }} />
      <div className="ap-dedans">
        <p className="ap-titre">
          <span className="p1">Qui regarde</span>
          <span className="p2">à l&apos;intérieur</span>
          <span className="p3">s&apos;éveille.</span>
        </p>
        <p className="ap-texte">
          Ta vision ne deviendra claire que lorsque tu pourras regarder dans
          ton propre cœur. Celui qui regarde à l&apos;extérieur <b>rêve</b>&nbsp;;
          celui qui regarde à l&apos;intérieur <b>s&apos;éveille</b>.
        </p>
        <p className="ap-ref">Carl Gustav Jung</p>
      </div>
    </aside>
  );
}

/** Le signe du type, à la place du grand chiffre vert de la home. */
function SigneType({ type }: { type: PersonalityType }) {
  return (
    <div className="visuel">
      <div className="signe" aria-hidden>
        {SIGNES[type.code] ?? "◆"}
      </div>
    </div>
  );
}

/** Page précédente / page suivante. */
function SuitePortrait({ type, actif }: { type: PersonalityType; actif: string }) {
  const entrees = entreesPortrait(type.code);
  if (!entrees) return null;
  const base = `/types-de-personnalite/${type.slug}`;
  const i = entrees.findIndex((e) => e.slug === actif);
  const prec = i > 0 ? entrees[i - 1] : null;
  const suiv = i >= 0 && i < entrees.length - 1 ? entrees[i + 1] : null;
  const lienPrec = prec ? (prec.slug ? `${base}/${prec.slug}` : base) : "/types-de-personnalite";
  const titrePrec = prec ? prec.titre : "Les 48 personnalités";
  return (
    <div className="suite">
      <div className="suite-dedans">
        <div className="suite-barre">
          <Link href={lienPrec} className="lien-precedent">
            <span className="pastille">
              <Chevron sens="gauche" taille={19} />
            </span>
            <span className="suite-titre">{typo(titrePrec)}</span>
          </Link>
          {suiv && (
            <Link href={`${base}/${suiv.slug}`} className="lien-suivant">
              <span className="suite-titre">{typo(suiv.titre)}</span>
              <span className="pastille">
                <Chevron taille={19} />
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

/** Le bandeau final, repris du hub. */
function FinalPortrait() {
  return (
    <section className="final">
      {/* AUCUNE animation d'apparition ici. Le composant Apparitions retire la
          classe « vu » quand l'élément quitte l'écran : le bandeau rejouait donc
          son entrée à chaque passage du seuil, en clignotant. Luca l'a fait
          retirer le 04/08. Ne pas remettre data-anim sur ce bloc. */}
      <div className="final-carte">
        <h2>
          Quarante-huit profils.
          <br />
          Un seul est le tien.
        </h2>
        <p>
          Le test est gratuit, ton type et ton résumé aussi. Dix minutes de
          sincérité, et tu sauras lequel te ressemble.
        </p>
        <Link className="cta-pt" href="/test">
          Faire le test
        </Link>
        <div className="microligne">
          <b>10 minutes</b> · gratuit · sans inscription
        </div>
      </div>
    </section>
  );
}

/** La coquille : fond ambiant, en-tête, sommaire, contenu, suite, final. */
export function PagePortrait({
  type,
  role,
  actif,
  titre,
  sousTitre,
  chapeau,
  children,
}: {
  type: PersonalityType;
  role: Role;
  actif: string;
  titre: ReactNode;
  sousTitre?: ReactNode;
  chapeau?: ReactNode;
  children?: ReactNode;
}) {
  const accent = { "--accent": role.color, "--soft": role.soft } as CSSProperties;
  const estIntro = actif === "";
  // Le chemin exact de CETTE page : c'est lui qu'on partage, pas une page générique.
  const chemin = `/types-de-personnalite/${type.slug}${actif ? `/${actif}` : ""}`;
  return (
    <div className="pt" style={accent}>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <ScrollHaut />
      <ColonnesCentrees />
      <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[100svh]">
        <MeshGradient />
      </div>

      <header className="ouverture">
          <div className="tete">
            <div>
              <h1 className={estIntro ? "titre" : "titre-section"}>
                {titre}
              </h1>
              {sousTitre}
              {chapeau && (
                <p className="chapeau">
                  {chapeau}
                </p>
              )}
            </div>
            <SigneType type={type} />
          </div>
      </header>

      {/* Le corps : les deux gouttières (sommaire à gauche, aparté à droite)
          démarrent ici, au niveau du premier titre de section, et suivent. */}
      <div className="enveloppe-aparte">
        <AparteDroite />
        <div className="corps">
          <SommairePortrait type={type} actif={actif} />
          {children}
          <SuitePortrait type={type} actif={actif} />
          {/* Le carrousel passe AVANT le bandeau « Faire le test ». */}
          <CarrouselCelebres code={type.code} />
        </div>
        <FinalPortrait />
      </div>
      <SectionPartage chemin={chemin} code={type.code} />
      {/* Un fil par page : la clé du fil est le chemin exact. */}
      <Commentaires code={type.code} fil={chemin} />
      {/* Ne s'ouvre que pour un visiteur arrivé par un lien partagé. */}
      <FenetreProche code={type.code} />
    </div>
  );
}

// =============================================================================
// LE CONTENU : les blocs regroupés en actes (un titre ouvre un acte).
// =============================================================================

/**
 * Le titre en deux temps, règle de la home et de « Notre approche » : le
 * premier temps reste noir, la CHUTE passe au vert. Quand le titre n'a pas de
 * césure (pas de virgule ni de deux-points), c'est l'amorce qui passe au vert,
 * comme « Un siècle de recherche ». Aucun mot n'est modifié, seulement coloré.
 */
function TitreDeuxTemps({ texte }: { texte: string }) {
  /* LE MOT VERT EST CHOISI DANS LE CONTENU, pas deviné ici.
     Dans contenuPagesTypes.ts, la partie à mettre en vert est encadrée
     d'astérisques : « Les forces, et ce qu'elles *coûtent* ». C'est la chute qui
     porte l'idée, et elle ne se déduit pas d'une règle mécanique : une césure
     sur la virgule mettait « et ce qu'elles coûtent » en vert au lieu de
     « coûtent », et un titre sans virgule voyait ses deux premiers mots colorés
     au hasard. Les astérisques ne s'affichent jamais.
     Sans astérisques, on retombe sur l'ancienne règle. */
  const marque = texte.match(/^(.*?)\*(.+?)\*(.*)$/);
  if (marque) {
    return (
      <>
        {typo(marque[1])}
        <span className="vert">{typo(marque[2])}</span>
        {typo(marque[3])}
      </>
    );
  }
  // Pas d'astérisques : le titre reste ENTIÈREMENT NOIR. Aucune règle
  // mécanique ne devine plus la chute à colorer.
  return <>{typo(texte)}</>;
}

function grouperEnActes(blocs: BlocPage[]) {
  const actes: { titre?: string; blocs: BlocPage[] }[] = [];
  blocs.forEach((b) => {
    if (b.titre || actes.length === 0) actes.push({ titre: b.titre, blocs: [b] });
    else actes[actes.length - 1].blocs.push(b);
  });
  return actes;
}

function ContenuBloc({ bloc }: { bloc: BlocPage }) {
  if (bloc.genre === "texte") {
    return (
      <>
        {bloc.paragraphes.map((p, j) => (
          <div key={j} className="ligne">
            {typo(p)}
          </div>
        ))}
      </>
    );
  }

  if (bloc.genre === "liste") {
    return (
      <>
        {bloc.intro && (
          <div className="ligne doux">
            {typo(bloc.intro)}
          </div>
        )}
        {bloc.items.map((item, j) => (
          <div key={j}>
            <div className="ligne">
              <b className="titre-item">{typo(item.titre)}</b> {typo(item.texte)}
            </div>
            {item.revers && (
              <div className="fond">
                <b>Le revers&nbsp;:</b> {typo(item.revers)}
              </div>
            )}
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      {bloc.intro && (
        <div className="ligne doux">
          {typo(bloc.intro)}
        </div>
      )}
      <table className="tableau">
        <thead>
          <tr>
            {bloc.colonnes.map((c, j) => (
              <th key={j}>{typo(c)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bloc.lignes.map(([gauche, droite], j) => (
            <tr key={j}>
              <td>{typo(`« ${gauche} »`)}</td>
              <td>{typo(`« ${droite} »`)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {bloc.sortie?.map((p, j) => (
        <div key={j} className="ligne">
          {typo(p)}
        </div>
      ))}
    </>
  );
}

export function ActesRendu({ blocs, tete }: { blocs: BlocPage[]; tete?: ReactNode }) {
  const actes = grouperEnActes(blocs);
  return (
    <>
      {actes.map((acte, i) => (
        <section key={i} className={i === 0 ? "acte premier" : "acte"}>
          {acte.titre && (
            <h2>
              <TitreDeuxTemps texte={acte.titre} />
            </h2>
          )}
          <div className={acte.titre ? "argument" : "argument seul"}>
            {i === 0 && tete}
            {acte.blocs.map((b, j) => (
              <ContenuBloc key={j} bloc={b} />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}

// =============================================================================
// Fabrique des sous-pages.
// =============================================================================

export { typo, STYLES as STYLES_PORTRAIT };

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

    return (
      <PagePortrait
        type={type}
        role={role}
        actif={slug}
        titre={typo(page.titre)}
        sousTitre={
          <Link
            href={`/types-de-personnalite/${type.slug}`}
            className="sous-titre"
          >
            {type.name}, personnalité <b>{type.code}</b>
          </Link>
        }
        chapeau={typo(page.description)}
      >
        <ActesRendu blocs={page.blocs} />
      </PagePortrait>
    );
  }

  return { generateMetadata, generateStaticParams, Page };
}
