import type { Metadata } from "next";
import Link from "next/link";
import MeshGradient from "../components/MeshGradient";
import ScrollHaut from "../components/ScrollHaut";
import NavigationHub from "./NavigationHub";
import SommaireFamilles from "./SommaireFamilles";
import { ROLES, ROLE_ORDER, typesByRole } from "../data/types";
import { variantesDuType } from "../data/variantes";

export const metadata: Metadata = {
  title: "Les 48 personnalités — 16 types, 3 variantes chacun",
  description:
    "Explore les 48 personnalités : 16 types répartis en 4 familles (analystes, diplomates, sentinelles, explorateurs), chacun décliné en 3 variantes mesurées. Trouve celle qui te ressemble.",
};

/*
 * LE HUB DES 48 PERSONNALITÉS — le menu visuel de la rubrique (patron 16P :
 * le hub est une galerie qui donne envie de cliquer, la profondeur vit dans
 * les pages de types). Notre différenciateur est affiché À CE NIVEAU : chaque
 * type montre ses 3 variantes nommées → 48 profils, pas 16 cases.
 * Une famille = une section, en scroll libre (c'est un menu) ; les
 * couleurs de familles (données existantes) servent d'accents.
 * Les personnages illustrés viendront se brancher sur les emblèmes le jour
 * où la DA « compagnons » sera tranchée.
 */

const STYLES = `
.hub{--vert-plein:rgb(82,178,137);--vert-clair:rgba(51,164,116,0.12);--noir:rgba(0,0,0,0.75);--gris:rgba(0,0,0,0.5);--ease:cubic-bezier(.22,.9,.3,1);color:var(--noir);}
/* ————— L'ouverture (même patron validé que « Notre approche ») ————— */
.hub .ouverture{max-width:768px;margin:0 auto;padding:48px 16px 0;display:flex;flex-direction:column;box-sizing:border-box;}
@media (min-width:768px){.hub .ouverture{padding-left:0;padding-right:0;padding-top:60px;}}
.hub .titre-hub{font-size:clamp(32px,4.4vw,50px);font-weight:700;letter-spacing:-0.02em;line-height:1.12;}
.hub .titre-hub b{color:var(--vert-plein);font-weight:700;}
.hub .chapeau{margin-top:16px;font-size:18.5px;color:var(--gris);line-height:1.6;}
.hub .trait{border:none;border-top:1px solid rgba(51,164,116,0.3);margin:16px auto;max-width:768px;width:100%;flex:none;padding:0 16px;box-sizing:border-box;}
/* ————— Une famille = une section (SCROLL LIBRE : le hub est un menu, on
   doit pouvoir le balayer d'un coup d'œil, pas le lire écran par écran) —————
   Le CONTENEUR monte à 1040 pour laisser respirer la galerie de cartes ; les
   TEXTES, eux, restent dans la colonne 768 du site, centrée sur le même axe :
   le titre de famille et sa description tombent donc exactement là où ils
   tombent sur toutes les autres pages. */
.hub .famille{max-width:100%;margin:0 auto;padding:24px 16px;display:flex;flex-direction:column;box-sizing:border-box;}
/* La première famille garde l'APERÇU DE CHARGEMENT validé :
   titre + description + haut des cartes visibles sous le pli. */
.hub #fam-analystes .famille{padding-top:10px;}
.hub .fam-entete{display:flex;flex-direction:column;align-items:flex-start;gap:8px;width:100%;max-width:768px;margin-left:auto;margin-right:auto;}
.hub .fam-titre{font-size:clamp(30px,4.2vw,46px);font-weight:700;letter-spacing:-0.02em;line-height:1.1;}
.hub .fam-lettres{font-size:13px;font-weight:700;letter-spacing:2px;color:#fff;border-radius:999px;padding:5px 13px;width:fit-content;margin:0 0 8px;}
.hub .fam-desc{margin-top:10px;font-size:18.5px;color:var(--gris);line-height:1.6;max-width:768px;margin-left:auto;margin-right:auto;}
.hub .grille{display:flex;justify-content:space-evenly;flex-wrap:nowrap;margin-top:clamp(18px,3vh,34px);}
@media (max-width:900px){.hub .grille{grid-template-columns:1fr 1fr;}}
@media (max-width:500px){.hub .grille{grid-template-columns:1fr;}}
/* ————— La carte d'un type ————— */
.hub .carte-type{position:relative;display:flex;flex-direction:column;align-items:center;text-align:center;gap:12px;background:transparent;border:none;border-radius:20px;padding:clamp(16px,2.4vh,22px) 12px;transition:transform .3s var(--ease);color:inherit;flex:1 1 0;min-width:0;}
.hub .carte-type:hover{transform:translateY(-4px);}
/* Lien « étiré » : toute la carte reste cliquable vers la page du type… */
.hub .ct-lien-type{color:inherit;}
.hub .ct-lien-type::after{content:"";position:absolute;inset:0;border-radius:20px;z-index:1;}
.hub .embleme{flex:none;width:200px;height:200px;display:flex;align-items:center;justify-content:center;font-size:200px;line-height:1;transition:transform .35s var(--ease);}
.hub .carte-type:hover .embleme{transform:scale(1.12) rotate(-3deg);}
.hub .ct-nom{font-size:18px;font-weight:700;line-height:1.2;}
.hub .ct-code{font-size:12px;font-weight:600;color:var(--gris);margin-left:8px;letter-spacing:0.06em;}
.hub .carte-type>span{max-width:220px;}
.hub .ct-phrase{margin-top:5px;font-size:13.5px;color:var(--gris);line-height:1.5;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
/* Les 3 puces sont NOTRE différenciateur : sans un mot, on ne sait pas si ce
   sont des sous-types, des traits ou des déclinaisons. On le dit. */
.hub .ct-libelle{margin-top:11px;font-size:11px;font-weight:600;color:var(--gris);letter-spacing:0.02em;display:block;}
.hub .ct-variantes{margin-top:6px;display:flex;gap:6px;flex-wrap:wrap;}
/* …sauf les puces, qui passent AU-DESSUS et mènent chacune à sa variante. */
.hub .puce-v{position:relative;z-index:2;font-size:11px;font-weight:600;border-radius:999px;padding:3px 9px;transition:filter .2s ease,transform .35s var(--ease);}
/* Au survol : mêmes codes que l'emblème du type (scale 1.12 + rotate -3deg). */
.hub .puce-v:hover{filter:brightness(0.94);transform:scale(1.12) rotate(-3deg);}
/* APPEL AU CLIC : au survol de la CARTE, les 3 puces gonflent puis retombent,
   l'une après l'autre. Personne ne lit « c'est cliquable », mais tout le monde
   le comprend en voyant bouger. */
@keyframes hub-puce-appel{0%{transform:scale(1);}45%{transform:scale(1.09);}100%{transform:scale(1);}}
.hub .carte-type:hover .puce-v{animation:hub-puce-appel .55s var(--ease) both;}
.hub .carte-type:hover .puce-v:nth-child(2){animation-delay:.07s;}
.hub .carte-type:hover .puce-v:nth-child(3){animation-delay:.14s;}
/* La puce réellement survolée garde son propre effet, l'appel s'efface. */
.hub .carte-type:hover .puce-v:hover{animation:none;}
@media (prefers-reduced-motion: reduce){.hub .carte-type:hover .puce-v{animation:none;}}
/* ————— Le final (bandeau vert, mêmes codes que la home) ————— */
.hub .final-hub{max-width:768px;margin:0 auto;padding:48px 16px;min-height:100svh;display:flex;align-items:center;box-sizing:border-box;}
.hub .final-carte{width:100%;border-radius:24px;background:rgb(102,187,151);text-align:center;padding:clamp(56px,10vh,96px) 24px;color:#fff;overflow:hidden;position:relative;}
.hub .final-carte h2{color:#fff;font-size:clamp(30px,4.5vw,46px);font-weight:700;letter-spacing:-0.02em;line-height:1.12;max-width:640px;margin:0 auto;}
.hub .final-carte p{color:rgba(255,255,255,0.85);font-size:19px;margin:22px auto 0;max-width:520px;line-height:1.6;}
.hub .cta-hub{display:inline-block;background:#fff;color:rgba(51,164,116,0.95);font-weight:600;padding:15px 38px;border-radius:999px;font-size:17px;transition:transform .3s;margin-top:38px;position:relative;overflow:hidden;}
.hub .cta-hub:hover{transform:scale(1.05);}
.hub .cta-hub::after{content:"";position:absolute;top:0;left:-80%;width:60%;height:100%;background:linear-gradient(100deg,transparent,rgba(82,178,137,0.18),transparent);transform:skewX(-20deg);animation:hub-brille 3.2s ease-in-out infinite;}
@keyframes hub-brille{0%,55%{left:-80%;}85%,100%{left:130%;}}
.hub .microligne{margin-top:16px;font-size:14px;display:flex;justify-content:center;gap:10px;align-items:center;color:rgba(255,255,255,0.75);}
.hub .microligne b{color:#fff;font-weight:600;}
@media (prefers-reduced-motion: reduce){.hub .cta-hub::after{animation:none;}}
`;

export default function TypesPage() {
  return (
    <div className="hub">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <ScrollHaut />
      {/* Le dégradé vert suit l'écran sur toute la descente (technique home) */}
      <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[100svh]">
        <MeshGradient />
      </div>
      {/* Points de navigation (bord droit) */}
      <NavigationHub />
      {/* Pas de ressort ici : un hub est un MENU, on le balaie librement.
          Le ressort reste sur les pages narratives (home, Notre approche). */}

      {/* ————— OUVERTURE ————— */}
      <header className="ouverture">
        <h1 className="titre-hub" data-anim="up">
          Seize types.<br />
          Trois variantes chacun.<br />
          <b>Quarante-huit personnalités.</b>
        </h1>
        <p className="chapeau" data-anim="up" data-delay="180">
          Quatre familles, seize types, et pour chacun trois variantes
          distinctes : quarante-huit façons d&apos;aimer, de travailler,
          d&apos;évoluer. Tu trouveras leurs grandes lignes, celles des seize
          types comme celles des quarante-huit variantes.
        </p>
      </header>
      <hr className="trait" data-anim="up" data-delay="320" />

      {/* ————— LES 4 FAMILLES ————— */}
      {ROLE_ORDER.map((cle, iFam) => {
        const role = ROLES[cle];
        return (
          <section key={cle} id={`fam-${cle}`}>
            {iFam > 0 && <hr className="trait" data-anim="up" />}
            <div className="famille">
              <div id={iFam === 0 ? "fam-contenu-analystes" : undefined}>
              <div className="fam-entete">
                <span className="fam-lettres" data-anim="pop" data-delay="200" style={{ background: role.color }}>
                  {role.letters.replaceAll("_", "·")}
                </span>
                <h2 className="fam-titre" data-anim="up" data-tot={iFam === 0 ? "" : undefined} style={{ color: role.color }}>
                  {role.name}
                </h2>
              </div>
              <p className="fam-desc" data-anim="up" data-delay={iFam === 0 ? undefined : "150"} data-tot={iFam === 0 ? "" : undefined}>{role.description.split("\n").map((l, i) => i === 0 ? <span key={i}>{l}</span> : <span key={i}><br />{l}</span>)}</p>
              <div className="grille">
                {typesByRole(cle).map((t, i) => (
                  /* La carte n'est plus un <Link> : les puces sont elles-mêmes
                     des liens, et un lien dans un lien est invalide. Le lien du
                     TYPE est « étiré » sur toute la carte (::after), les puces
                     passent au-dessus. Clic sur la carte → le type ; clic sur
                     une puce → la variante. */
                  <div
                    key={t.code}
                    className="carte-type"
                    data-anim="up"
                    data-tot={iFam === 0 ? "" : undefined}
                  >
                    <span className="embleme" style={{ color: role.color }}>★</span>
                    <span>
                      <Link href={`/types-de-personnalite/${t.slug}`} className="ct-lien-type">
                        <span className="ct-nom" style={{ color: role.color }}>{t.name}</span>
                        <span className="ct-code">{t.code}</span>
                      </Link>
                      <span className="ct-phrase" style={{ display: "block" }}>{t.tagline}</span>
                    </span>
                  </div>
                ))}
              </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* ————— FINAL ————— */}
      <section id="hub-final">
        <div className="final-hub">
          <div className="final-carte" data-anim="up">
            <h2>Quarante-huit profils.<br />Un seul est le tien.</h2>
            <p>Le test est gratuit, ton type et ton résumé aussi. Dix minutes de sincérité, et tu sauras lequel te ressemble.</p>
            <Link className="cta-hub" href="/test">Faire le test</Link>
            <div className="microligne"><b>10 minutes</b> · gratuit · sans inscription</div>
          </div>
        </div>
      </section>
    </div>
  );
}
