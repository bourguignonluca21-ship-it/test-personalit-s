import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";
import CarrouselCelebres from "./CarrouselCelebres";
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

const LETTRES: Record<string, string> = {
  I: "Introverti",
  E: "Extraverti",
  N: "Intuitif",
  S: "Observateur",
  T: "Rationnel",
  F: "Sensible",
  J: "Organisé",
  P: "Prospectif",
};

const STYLES = `
.pt{--vert-plein:rgb(82,178,137);--noir:rgba(0,0,0,0.75);--gris:rgba(0,0,0,0.5);--ease:cubic-bezier(.22,.9,.3,1);--nav:68px;color:var(--noir);}
.pt a{color:inherit;}

/* ————— L'ouverture : le patron de « Notre approche », colonne 768 ————— */
.pt .ouverture{max-width:768px;margin:0 auto;padding:48px 16px 0;box-sizing:border-box;}
@media (min-width:768px){.pt .ouverture{padding-left:0;padding-right:0;padding-top:60px;}}
/* Titre + visuel, comme la pin-grid de la home (titre à gauche, visuel à droite) */
.pt .tete{display:grid;grid-template-columns:minmax(0,1fr) 250px;column-gap:36px;align-items:center;}
@media (max-width:760px){.pt .tete{grid-template-columns:1fr;row-gap:30px;}}
.pt .titre{font-size:clamp(32px,4.4vw,50px);font-weight:700;letter-spacing:-0.02em;line-height:1.12;margin:0;}
.pt .titre b{color:var(--accent);font-weight:700;}
.pt .titre-section{font-size:clamp(30px,4.5vw,46px);font-weight:700;letter-spacing:-0.02em;line-height:1.12;margin:0;}
/* La ligne d'identité sous le titre : « Personnalité INFJ » */
.pt .sous-titre{margin:6px 0 0;font-size:clamp(20px,2.4vw,26px);font-weight:700;letter-spacing:-0.01em;line-height:1.2;color:rgba(0,0,0,0.55);}
.pt .sous-titre b{color:var(--accent);font-weight:700;}
.pt a.sous-titre{display:inline-block;transition:opacity .25s;}
.pt a.sous-titre:hover{opacity:0.75;}
.pt .chapeau{margin-top:16px;font-size:18.5px;color:var(--gris);line-height:1.65;}
/* Le signe : l'emplacement du grand chiffre vert de la home. */
.pt .visuel{display:flex;flex-direction:column;align-items:center;gap:14px;}
.pt .signe{font-size:clamp(96px,12vw,150px);line-height:1;color:var(--accent);font-weight:400;}
.pt .legende-visuel{font-size:14px;color:var(--gris);text-align:center;max-width:250px;line-height:1.5;}
.pt .trait{border:none;border-top:1px solid rgba(51,164,116,0.3);margin:44px 0 0;width:100%;}

/* ————— Le sommaire : le .som de « Notre approche ».
   Sous 1280 px il vit dans le flux, sous l'en-tête, en deux colonnes.
   Au-dessus, il passe dans la GOUTTIÈRE de gauche (bord aligné sur le logo
   de la navbar) et suit la descente jusqu'à la fin du contenu, comme 16P. */
.pt .corps{position:relative;}
.pt .som{max-width:768px;margin:38px auto 0;box-sizing:border-box;text-align:left;padding:0 16px;}
@media (min-width:768px){.pt .som{padding-left:0;padding-right:0;}}
.pt .som-entete{font-size:12px;letter-spacing:1.4px;text-transform:uppercase;color:var(--gris);font-weight:600;margin-bottom:10px;display:flex;align-items:center;gap:10px;}
.pt .som-entete b{color:var(--accent);}
.pt .som-grille{display:grid;grid-template-columns:1fr 1fr;gap:2px 22px;list-style:none;margin:0;padding:0;}
@media (max-width:640px){.pt .som-grille{grid-template-columns:1fr;}}
.pt .som-item{display:flex;align-items:center;gap:13px;padding:10px 12px;border-radius:12px;color:var(--noir);transition:background .25s,color .25s,transform .25s;text-align:left;width:100%;}
.pt .som-item:hover{background:rgba(51,164,116,0.08);transform:translateX(3px);}
.pt .som-item .lbl{flex:1;font-size:15px;font-weight:600;}
.pt .som-item .fl{margin-left:auto;color:var(--accent);opacity:0;transition:opacity .25s,transform .25s;}
.pt .som-item:hover .fl{opacity:1;transform:translateX(2px);}
.pt .som-grille li.actif .som-item{background:rgba(51,164,116,0.08);color:var(--accent);}
.pt .som-grille li.actif .fl{opacity:1;}

/* ————— L'aparté de droite : composition typographique, texte seul.
   CONTENU PROVISOIRE : le design est arrêté, les mots seront remplacés. ————— */
.pt .aparte{max-width:768px;margin:40px auto 0;padding:0 16px;box-sizing:border-box;}
@media (min-width:768px){.pt .aparte{padding-left:0;padding-right:0;}}
.pt .ap-eyebrow{font-size:11px;font-weight:700;letter-spacing:1.7px;text-transform:uppercase;color:var(--accent);margin-bottom:16px;}
.pt .ap-titre{font-size:clamp(25px,2.1vw,31px);font-weight:700;letter-spacing:-0.025em;line-height:1.06;}
.pt .ap-titre span{display:block;}
.pt .ap-titre .p1{color:var(--noir);}
.pt .ap-titre .p2{color:var(--gris);font-size:0.6em;font-weight:600;letter-spacing:-0.01em;margin-top:5px;}
.pt .ap-titre .p3{color:var(--accent);font-size:1.22em;margin-top:1px;}
.pt .ap-trait{width:38px;height:2px;background:rgba(51,164,116,0.35);margin:22px 0;}
.pt .ap-texte{font-size:14.5px;line-height:1.72;color:var(--gris);}
.pt .ap-texte b{color:var(--noir);font-weight:700;}

/* ————— Les deux gouttières, au-dessus de 1280 px ————— */
@media (min-width:1280px){
  /* Les colonnes démarrent au niveau du premier titre de section (86 px sous
     le haut du corps, la valeur de .acte.premier) et suivent la descente. */
  .pt .som,.pt .aparte{position:absolute;top:86px;bottom:0;width:min(292px,calc(50% - 384px - 32px - 40px));margin:0;padding:0;z-index:2;}
  .pt .som{left:32px;}
  .pt .aparte{right:32px;}
  .pt .som-dedans,.pt .ap-dedans{position:sticky;top:calc(var(--nav) + 30px);}
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
.pt .titre,.pt .titre-section,.pt .sous-titre,.pt .acte h2,.pt .ap-titre{text-wrap:balance;}
.pt .ligne{font-size:16px;line-height:1.6;}
.pt .ligne.doux{color:var(--noir);}
/* DANS LE CONTENU, RIEN N'EST VERT. Le vert est réservé aux TITRES.
   Toute mise en évidence est en noir, plus gras. */
.pt .ligne .titre-item,.pt .ligne b,.pt .accent{color:var(--noir);font-weight:700;}
/* Hors titre, une mise en évidence est en NOIR PLUS GRAS, jamais en vert :
   le vert du contenu est réservé aux titres. */
.pt .exergue{font-size:clamp(19px,2.3vw,24px);line-height:1.45;font-weight:700;letter-spacing:-0.015em;color:var(--noir);}
/* Le paragraphe de fond de « Notre approche » : sert au « revers » d'une force. */
.pt .fond{margin-top:2px;font-size:14px;color:var(--noir);line-height:1.65;}
.pt .fond b{color:var(--noir);font-weight:700;}
/* Le tableau : des filets verts, pas d'encadré. */
.pt .tableau{width:100%;border-collapse:collapse;}
.pt .tableau th{text-align:left;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--noir);padding:0 20px 12px 0;border-bottom:1px solid rgba(51,164,116,0.3);}
.pt .tableau th + th{color:var(--noir);}
.pt .tableau td{padding:14px 20px 14px 0;font-size:15.5px;line-height:1.6;font-style:italic;vertical-align:top;border-bottom:1px solid rgba(51,164,116,0.18);}
.pt .tableau td + td{padding-right:0;}
@media (max-width:560px){.pt .tableau th,.pt .tableau td{font-size:14px;padding-right:12px;}}

/* ————— La suite du portrait : deux blocs côte à côte, séparés par un
   filet vert vertical. Filet horizontal au-dessus pour clore le contenu. ————— */
.pt .suite{max-width:768px;margin:0 auto;padding:0 16px;box-sizing:border-box;}
@media (min-width:768px){.pt .suite{padding-left:0;padding-right:0;}}
.pt .suite-grille{display:grid;grid-template-columns:1fr 1fr;margin-top:96px;border-top:1px solid rgba(51,164,116,0.3);}
.pt .lien-suite{display:block;padding:28px 26px 30px 0;transition:background .3s var(--ease);}
.pt .lien-suite.suiv{padding:28px 0 30px 26px;text-align:right;border-left:1px solid rgba(51,164,116,0.3);}
.pt .lien-suite:hover{background:rgba(51,164,116,0.05);}
.pt .suite-eyebrow{display:block;font-size:11px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;color:var(--gris);margin-bottom:9px;}
.pt .suite-titre{display:block;font-size:19px;font-weight:700;line-height:1.25;letter-spacing:-0.01em;color:var(--noir);}
.pt .lien-suite .fl{display:inline-block;color:var(--accent);transition:transform .3s var(--ease);}
.pt .lien-suite.suiv:hover .fl{transform:translateX(5px);}
.pt .lien-suite.prec:hover .fl{transform:translateX(-5px);}
@media (max-width:640px){
  .pt .suite-grille{grid-template-columns:1fr;}
  .pt .lien-suite,.pt .lien-suite.suiv{padding:24px 0;text-align:left;border-left:none;}
  .pt .lien-suite.suiv{border-top:1px solid rgba(51,164,116,0.3);}
}

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
.pt .partage .pi-scroll{-webkit-mask-image:linear-gradient(90deg,transparent,#000 64px,#000 calc(100% - 64px),transparent);mask-image:linear-gradient(90deg,transparent,#000 64px,#000 calc(100% - 64px),transparent);}
@media (max-width:700px){.pt .partage{padding-bottom:96px;}}

/* ————— Le final : le bandeau du hub, à l'identique ————— */
.pt .final{max-width:768px;margin:0 auto;padding:120px 16px 0;box-sizing:border-box;}
@media (min-width:768px){.pt .final{padding-left:0;padding-right:0;}}
.pt .final-carte{width:100%;border-radius:24px;background:rgb(102,187,151);text-align:center;padding:clamp(56px,10vh,96px) 24px;color:#fff;overflow:hidden;position:relative;}
.pt .final-carte h2{color:#fff;font-size:clamp(30px,4.5vw,46px);font-weight:700;letter-spacing:-0.02em;line-height:1.12;max-width:640px;margin:0 auto;}
.pt .final-carte p{color:rgba(255,255,255,0.85);font-size:19px;margin:22px auto 0;max-width:520px;line-height:1.6;}
.pt .cta-pt{display:inline-block;background:#fff;color:rgba(51,164,116,0.95);font-weight:600;padding:15px 38px;border-radius:999px;font-size:17px;transition:transform .3s;margin-top:38px;position:relative;overflow:hidden;}
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
function entreesPortrait(code: string) {
  const contenu = getContenuType(code);
  if (!contenu) return null;
  return [
    { slug: "", titre: "Introduction" },
    ...contenu.pages.map((p) => ({ slug: p.slug, titre: p.titre })),
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
                <span className="lbl">{typo(e.titre)}</span>
                <span className="fl" aria-hidden>
                  →
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
 * L'aparté de la gouttière droite. Le DESSIN est ce qui compte ici : les mots
 * sont provisoires et seront remplacés par le contenu philosophique définitif,
 * en gardant exactement cette composition (accroche en trois temps, filet,
 * paragraphe).
 */
function AparteDroite() {
  return (
    <aside className="aparte" aria-label="Se connaître">
      <div className="ap-dedans">
        <div className="ap-eyebrow">
          Se connaître
        </div>
        <p className="ap-titre">
          <span className="p1">Se connaître,</span>
          <span className="p2">ce n&apos;est pas</span>
          <span className="p3">se juger.</span>
        </p>
        <div className="ap-trait" aria-hidden />
        <p className="ap-texte">
          C&apos;est comprendre pourquoi on répète les mêmes gestes, et
          retrouver le choix là où on croyait n&apos;en avoir aucun. Un portrait
          ne dit pas qui tu dois devenir&nbsp;: il te rend <b>lisible à toi-même</b>,
          et c&apos;est de là que part tout le reste.
        </p>
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
      <div className="legende-visuel">
        {type.code
          .split("")
          .map((l) => LETTRES[l])
          .join(" · ")}
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
  return (
    <div className="suite">
      <div className="suite-grille">
        <Link
          href={prec ? (prec.slug ? `${base}/${prec.slug}` : base) : "/types-de-personnalite"}
          className="lien-suite prec"
        >
          <span className="suite-eyebrow">Précédent</span>
          <span className="suite-titre">
            <span className="fl" aria-hidden>
              ←
            </span>{" "}
            {prec ? typo(prec.titre) : "Les 48 personnalités"}
          </span>
        </Link>
        {suiv && (
          <Link
            href={`${base}/${suiv.slug}`}
            className="lien-suite suiv"
          >
            <span className="suite-eyebrow">Page suivante</span>
            <span className="suite-titre">
              {typo(suiv.titre)}{" "}
              <span className="fl" aria-hidden>
                →
              </span>
            </span>
          </Link>
        )}
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
          <hr className="trait" />
      </header>

      {/* Le corps : les deux gouttières (sommaire à gauche, aparté à droite)
          démarrent ici, au niveau du premier titre de section, et suivent. */}
      <div className="corps">
        <SommairePortrait type={type} actif={actif} />
        <AparteDroite />
        {children}
        <SuitePortrait type={type} actif={actif} />
        {/* Le carrousel passe AVANT le bandeau « Faire le test ». */}
        <CarrouselCelebres code={type.code} />
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

export { typo };

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
