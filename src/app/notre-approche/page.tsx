import type { Metadata } from "next";
import { existsSync } from "fs";
import { join } from "path";
import Link from "next/link";
import MeshGradient from "../components/MeshGradient";
import ScrollHaut from "../components/ScrollHaut";
import RessortDefilement from "../components/RessortDefilement";
import NavigationApproche from "./NavigationApproche";

export const metadata: Metadata = {
  title: "Notre approche — Que peut-on vraiment apprendre de soi ?",
  description:
    "Ce qu'on mesure, comment, et pourquoi tu peux t'y fier : un siècle de recherche sur la personnalité, le débat types contre traits, une mécanique transparente et ses limites, dites franchement.",
};

/*
 * « Notre approche » : la page de fond de la rubrique « La personnalité,
 * expliquée », construite dans le MÊME langage visuel que la home (pin-grid
 * titre + arguments + grand chiffre, bandeau vert, cartes aériennes, CTA).
 * Un écran = une idée. Ton sérieux, cadre légal respecté : jamais
 * « scientifiquement validé », jamais de vocabulaire clinique.
 */

const STYLES = `
.na{--vert-plein:rgb(82,178,137);--vert-clair:rgba(51,164,116,0.12);--noir:rgba(0,0,0,0.75);--gris:rgba(0,0,0,0.5);--ease:cubic-bezier(.22,.9,.3,1);color:var(--noir);}
.na .acte{max-width:768px;margin:0 auto;padding:80px 16px 50px;min-height:100svh;display:flex;flex-direction:column;justify-content:center;box-sizing:border-box;}
@media (min-width:768px){.na .acte{padding-left:0;padding-right:0;}}
.na .eyebrow{color:rgba(51,164,116,0.9);font-weight:700;font-size:12px;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:12px;}
.na h2{font-size:clamp(30px,4.5vw,46px);font-weight:700;letter-spacing:-0.02em;line-height:1.12;}
.na .pin-grid{display:grid;grid-template-columns:minmax(0,1fr) 300px;grid-template-areas:"titre titre" "arg visuel";column-gap:36px;row-gap:26px;align-items:start;margin-top:34px;}
.na .pin-grid h2,.na .pin-grid .titre{grid-area:titre;}
.na .pin-grid .argument{grid-area:arg;align-self:center;}
.na .pin-grid .visuel{grid-area:visuel;display:flex;flex-direction:column;gap:14px;align-items:center;}
@media (max-width:700px){.na .pin-grid{grid-template-columns:1fr;grid-template-areas:"titre" "arg" "visuel";}}
.na .argument{display:flex;flex-direction:column;gap:18px;}
.na .argument b{color:var(--vert-plein);font-weight:600;}
.na .argument .ligne{font-size:16px;line-height:1.6;}
.na .grand-chiffre{font-size:clamp(88px,11vw,140px);font-weight:700;letter-spacing:-0.03em;color:var(--vert-plein);line-height:1;font-variant-numeric:tabular-nums;}
.na .grand-chiffre small{font-size:0.3em;color:var(--gris);font-weight:600;}
.na .legende-visuel{font-size:14px;color:var(--gris);text-align:center;max-width:260px;}
.na .eclate{display:flex;gap:10px;}
.na .case-var{width:48px;height:48px;border-radius:11px;background:var(--vert-clair);display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:11px;font-weight:600;color:var(--vert-plein);gap:2px;}
.na .case-var span{font-size:9.5px;font-weight:500;color:var(--gris);}
/* Le spectre de démonstration (écran méthode) */
.na .axe{width:100%;}
.na .entete-centree{display:flex;justify-content:center;gap:6px;margin-bottom:7px;font-size:14.5px;font-weight:600;}
.na .entete-centree .pctv{color:var(--vert-plein);font-variant-numeric:tabular-nums;}
.na .poles{display:flex;justify-content:space-between;font-size:13.5px;color:rgba(0,0,0,0.35);margin-top:7px;}
.na .barre-na{height:10px;border-radius:999px;background:#eef0f2;position:relative;overflow:hidden;}
.na .rempli-na{position:absolute;top:0;left:0;bottom:0;border-radius:999px;background:rgba(51,164,116,0.75);}
/* Bandeau vert (écran IA), même famille que le « monde » de la home */
.na .monde{max-width:768px;margin:0 auto;border-radius:24px;background:rgb(102,187,151);padding:clamp(34px,6.5vh,70px) 40px;color:#fff;overflow:hidden;position:relative;}
/* L'écran IA se centre VRAIMENT : coussins symétriques, et le bandeau se
   compresse sur les écrans bas pour tenir entier dans la vue. */
.na #na-ia .acte{padding-top:48px;padding-bottom:48px;}
.na .monde .eyebrow{color:rgba(255,255,255,0.85);}
.na .monde h2{color:#fff;}
.na .monde .sous-blanc{color:rgba(255,255,255,0.88);font-size:16.5px;line-height:1.6;margin-top:14px;}
.na .duo-cartes{display:flex;gap:16px;margin-top:clamp(20px,3.5vh,38px);flex-wrap:wrap;}
.na .carte-blanche{flex:1 1 240px;background:#fff;border-radius:18px;padding:clamp(18px,2.8vh,24px) 24px;color:var(--noir);}
.na .carte-blanche h4{font-size:17px;font-weight:700;color:var(--vert-plein);margin-bottom:8px;}
.na .carte-blanche p{font-size:14.5px;color:var(--gris);line-height:1.6;}
/* Carte portrait (écran limites) */
.na .carte-portrait{background:#fff;border:1px solid rgba(0,0,0,0.06);border-radius:26px;padding:30px 32px;box-shadow:0 12px 40px -12px rgba(0,0,0,0.12);}
.na .carte-portrait blockquote{font-size:16.5px;line-height:1.65;}
.na .carte-portrait blockquote em{color:var(--vert-plein);font-style:normal;font-weight:600;}
.na .carte-portrait .signature{margin-top:10px;font-size:13px;color:var(--gris);text-align:right;}
/* Écran limites : la carte citation occupe EXACTEMENT la hauteur du bloc de
   texte à sa gauche (même marge haute et basse), contenu centré dedans. */
.na #na-limites .pin-grid .visuel{align-self:stretch;}
.na #na-limites .carte-portrait{height:100%;box-sizing:border-box;display:flex;flex-direction:column;justify-content:center;padding:22px 26px;}
.na #na-limites .preuve{margin-top:14px;padding-top:12px;}
.na #na-limites .signature{margin-top:6px;}
.na .preuve{margin-top:22px;padding-top:18px;border-top:1px solid rgba(51,164,116,0.25);font-size:14px;color:var(--gris);}
.na .preuve b{color:var(--vert-plein);}
/* Principes : colonnes aériennes (comme les cartes de l'espace, home) */
.na .principes{display:flex;gap:16px;margin-top:54px;flex-wrap:wrap;}
.na .principe{flex:1 1 220px;padding:10px 6px;border-radius:18px;transition:transform .3s var(--ease);}
.na .principe:hover{transform:translateY(-4px);}
.na .principe .pastille{width:44px;height:44px;border-radius:12px;background:var(--vert-clair);color:var(--vert-plein);display:flex;align-items:center;justify-content:center;margin-bottom:16px;}
.na .principe h4{font-size:18px;font-weight:700;margin-bottom:8px;}
.na .principe p{font-size:15px;color:var(--gris);line-height:1.6;}
.na .principe p b{color:inherit;font-weight:600;}
/* Le paragraphe de FOND : la profondeur sous les arguments, discrète mais là */
.na .fond{margin-top:24px;font-size:14px;color:var(--gris);line-height:1.65;border-left:2px solid rgba(51,164,116,0.35);padding-left:16px;}
.na .fond b{color:var(--vert-plein);font-weight:600;}
.na .monde .fond-blanc{margin-top:clamp(16px,2.6vh,26px);font-size:13.5px;color:rgba(255,255,255,0.78);line-height:1.6;border-left:2px solid rgba(255,255,255,0.4);padding-left:16px;}
/* Final : bandeau vert plein, CTA blanc qui brille (mêmes valeurs que la home) */
.na .final-na{max-width:768px;margin:0 auto;border-radius:24px;background:rgb(102,187,151);text-align:center;padding:96px 24px;color:#fff;overflow:hidden;position:relative;}
.na .final-na h2{color:#fff;max-width:640px;margin:0 auto;}
.na .final-na p{color:rgba(255,255,255,0.85);font-size:19px;margin:22px auto 0;max-width:520px;line-height:1.6;}
.na .cta-na{display:inline-block;background:#fff;color:rgba(51,164,116,0.95);font-weight:600;padding:15px 38px;border-radius:999px;font-size:17px;transition:transform .3s;margin-top:38px;position:relative;overflow:hidden;}
.na .cta-na:hover{transform:scale(1.05);}
.na .cta-na::after{content:"";position:absolute;top:0;left:-80%;width:60%;height:100%;background:linear-gradient(100deg,transparent,rgba(82,178,137,0.18),transparent);transform:skewX(-20deg);animation:na-brille 3.2s ease-in-out infinite;}
@keyframes na-brille{0%,55%{left:-80%;}85%,100%{left:130%;}}
.na .microligne{margin-top:16px;font-size:14px;display:flex;justify-content:center;gap:10px;align-items:center;color:rgba(255,255,255,0.75);}
.na .microligne b{color:#fff;font-weight:600;}
.na .lien-suite{position:relative;display:inline-flex;align-items:center;gap:8px;margin-top:22px;color:#fff;font-weight:600;font-size:15px;opacity:0.9;}
/* Au survol : le trait se DESSINE de gauche à droite (scaleX depuis l'origine
   gauche), au lieu d'apparaître d'un bloc. C'est ce mouvement qui dit « clique ».
   Épaisseur 1 px = celle de la hampe de la flèche →, mesurée au sous-pixel
   (1,02 px pour cette police en 15 px / 600). Le trait et la flèche pèsent pareil. */
.na .lien-suite::after{content:"";position:absolute;left:0;right:0;bottom:-4px;height:1px;background:currentColor;transform:scaleX(0);transform-origin:left center;transition:transform .45s cubic-bezier(.22,.9,.3,1);}
.na .lien-suite:hover::after{transform:scaleX(1);}
@media (prefers-reduced-motion: reduce){.na .lien-suite::after{transition:none;}}
@media (prefers-reduced-motion: reduce){.na .cta-na::after{animation:none;}}
/* ————— L'ouverture éditoriale (format presse : la page commence en haut) ————— */
.na .ouverture{max-width:768px;margin:0 auto;padding:48px 16px 0;min-height:calc(100svh - 271px);display:flex;flex-direction:column;box-sizing:border-box;}
@media (min-width:768px){.na .ouverture{padding-left:0;padding-right:0;padding-top:60px;}}
/* Le titre-question est VERT, sauf sa première moitié qui reste noire :
   la question de fond en noir, la promesse du site en vert. */
.na .titre-question{font-size:clamp(31px,4.4vw,50px);font-weight:700;letter-spacing:-0.02em;line-height:1.16;color:rgba(51,164,116,0.85);}
.na .titre-question .noir{color:var(--noir);}
/* Titres de chapitre : c'est la CHUTE (2e temps) qui passe au vert, parce que
   c'est elle qui porte l'idée. Seule exception : « Un siècle de recherche. »,
   le seul titre sur une ligne, sans renversement. */
.na .vert{color:rgba(51,164,116,0.85);}
/* Sur les bandeaux verts, le vert serait invisible : c'est l'AMORCE qui
   s'atténue et la chute qui garde le blanc plein. Même hiérarchie. */
.na .monde h2 .attenue{color:rgba(255,255,255,0.7);}
.na .chapeau{margin-top:16px;font-size:18.5px;color:var(--gris);line-height:1.65;}
/* Le trait : centré dans l'espace flexible entre le chapeau et le chapitre 1
   (marges auto), décalé visuellement de 44 px pour compenser le coussin de
   80 px du chapitre → égale distance chapeau/titre sur TOUTE taille d'écran. */
.na .trait{border:none;border-top:1px solid rgba(51,164,116,0.3);margin:auto 0;transform:translateY(50px);width:100%;flex:none;}
/* La première section commence JUSTE sous l'ouverture : son titre dépasse
   sous le pli, on voit qu'il y a de la matière (l'intrigue). */
/* Chapitre 1 : commence juste sous l'ouverture (son titre dépasse sous le
   pli), mais reste un ÉCRAN PLEIN : le premier coup de molette le pose
   proprement, titre à 90 px sous le haut, comme un arrêt des autres pages. */
.na #na-histoire .acte{justify-content:flex-start;padding-top:80px;min-height:100svh;padding-bottom:50px;}
.na #na-histoire .pin-grid{margin-top:20px;}
/* Le haut des chiffres « 1921 » aligné sur la première ligne du texte
   (« Dès l'Antiquité… ») : -28 px mesurés au navigateur. */
.na #na-histoire .grand-chiffre{margin-top:-28px;}
/* ————— Le sommaire du héros ————— */
.na .som{margin-top:30px;width:100%;max-width:640px;text-align:left;background:rgba(255,255,255,0.72);backdrop-filter:blur(6px);border:1px solid rgba(51,164,116,0.16);border-radius:20px;padding:20px 22px 16px;box-shadow:0 16px 44px -22px rgba(51,164,116,0.35);}
.na .som-entete{font-size:12px;letter-spacing:1.4px;text-transform:uppercase;color:var(--gris);font-weight:600;margin-bottom:10px;display:flex;align-items:center;gap:10px;}
.na .som-entete b{color:var(--vert-plein);}
.na .som-grille{display:grid;grid-template-columns:1fr 1fr;gap:6px 22px;text-align:left;}
.na .som-item{display:flex;align-items:center;gap:13px;padding:11px 14px;border-radius:12px;background:none;border:none;cursor:pointer;font:inherit;color:var(--noir);transition:background .25s,transform .25s;text-align:left;width:100%;}
.na .som-item:hover{background:rgba(51,164,116,0.08);transform:translateX(3px);}
.na .som-item .num{font-size:11px;font-weight:700;color:var(--vert-plein);font-variant-numeric:tabular-nums;flex:none;width:20px;}
.na .som-item .lbl{flex:1;}
.na .som-item .lbl{font-size:15px;font-weight:600;}
.na .som-item .fl{margin-left:auto;color:var(--vert-plein);opacity:0;transition:opacity .25s,transform .25s;}
.na .som-item:hover .fl{opacity:1;transform:translateX(2px);}
@media (max-width:640px){.na .som-grille{grid-template-columns:1fr;}}
/* ————— Photos historiques (noir et blanc, cartes d'archive) ————— */
.na .photos-hist{position:relative;width:260px;height:320px;}
.na .photo-carte{position:absolute;background:#fff;padding:10px 10px 12px;border-radius:6px;box-shadow:0 14px 34px -12px rgba(0,0,0,0.28);}
.na .photo-carte img{display:block;width:100%;height:auto;filter:grayscale(1) contrast(1.05);border-radius:2px;}
.na .photo-carte figcaption{margin-top:8px;font-size:11.5px;color:var(--gris);text-align:center;line-height:1.4;}
`;

export default function NotreApprochePage() {
  /* Les photos d'archives (à déposer dans public/histoire/) : tant qu'elles
     n'y sont pas, l'écran histoire garde son grand chiffre 1921, JAMAIS
     d'icône d'image cassée. Dès que les fichiers existent, les cartes photos
     prennent leur place, sans rien changer d'autre. */
  const photosPretes =
    existsSync(join(process.cwd(), "public", "histoire", "jung.jpg")) &&
    existsSync(join(process.cwd(), "public", "histoire", "hippocrate.jpg"));
  return (
    <div className="na">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <ScrollHaut />
      {/* Le dégradé vert suit l'écran sur toute la descente (technique home) */}
      <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[100svh]">
        <MeshGradient />
      </div>
      {/* Points de navigation (bord droit) + glisse au clic sur le sommaire */}
      <NavigationApproche />
      {/* Le ressort : un geste = un écran, centré */}
      <RessortDefilement
        arrets={[
          /* marge -4 : le titre atterrit à 80-4 = 76 px sous le haut (validé) */
          { selecteur: "#na-histoire", alignement: "haut", marge: -4 },
          { selecteur: "#na-debat" },
          { selecteur: "#na-methode" },
          { selecteur: "#na-ia" },
          { selecteur: "#na-limites" },
          { selecteur: "#na-principes" },
          { selecteur: "#na-final" },
        ]}
      />

      {/* ————— OUVERTURE ÉDITORIALE ————— */}
      <header className="ouverture">
        <h1 className="titre-question" data-anim="up">
          <span className="noir">Que peut-on vraiment apprendre de soi, et</span>{" "}
          comment un simple test peut-il y parvenir&nbsp;?
        </h1>
        <p className="chapeau" data-anim="up" data-delay="180">
          Une mécanique transparente, une IA au rôle borné et des limites
          assumées : cette page déplie, étape par étape, comment ton portrait
          se construit, et pourquoi tu peux t&apos;y fier.
        </p>
        {/* Le trait : sépare l'ouverture du premier chapitre, sur leur axe */}
        <hr className="trait" data-anim="up" data-delay="320" />
      </header>

      {/* ————— ÉCRAN 1 : UN SIÈCLE DE RECHERCHE ————— */}
      <section id="na-histoire">
        <div className="acte">
          <div className="pin-grid">
            <h2 data-anim="up"><span className="vert">Un siècle</span> de recherche.</h2>
            <div className="argument">
              <div className="ligne" data-anim="left" data-delay="150" data-tot=""><div>Dès l&apos;Antiquité, Hippocrate classe les tempéraments : derrière la variété des individus, des <b>régularités qu&apos;on peut nommer</b>.</div></div>
              <div className="ligne" data-anim="left" data-delay="350"><div>En 1921, <b>Jung</b> pose les grandes oppositions : extraversion et introversion, sensation et intuition, pensée et sentiment. Myers et Briggs en feront les <b>types</b> connus du grand public.</div></div>
              <div className="ligne" data-anim="left" data-delay="550"><div>Puis la psychologie des traits, d&apos;Allport au <b>Big Five</b>, impose l&apos;autre idée forte : un caractère se mesure en <b>degrés</b>, jamais en tout ou rien.</div></div>
            </div>
            <div className="visuel">
              {photosPretes ? (
                <div className="photos-hist">
                  <figure className="photo-carte" data-anim="right" data-delay="550" data-tot="" style={{ top: 0, right: 0, width: 150, transform: "rotate(3.5deg)" }}>
                    <img src="/histoire/hippocrate.jpg" alt="Hippocrate" width={130} height={160} />
                    <figcaption>Hippocrate, les quatre tempéraments</figcaption>
                  </figure>
                  <figure className="photo-carte" data-anim="right" data-delay="750" style={{ top: 74, left: 0, width: 190, transform: "rotate(-2.5deg)" }}>
                    <img src="/histoire/jung.jpg" alt="Carl Gustav Jung" width={170} height={210} />
                    <figcaption>Carl Gustav Jung, <i>Les types psychologiques</i>, 1921</figcaption>
                  </figure>
                </div>
              ) : (
                <>
                  <div className="grand-chiffre" data-anim="pop" data-delay="450" data-tot="">1921</div>
                  <div className="legende-visuel" data-anim="up" data-delay="650">l&apos;année où Jung publie <i>Les types psychologiques</i>, point de départ des tests modernes.</div>
                </>
              )}
            </div>
          </div>
          <p className="fond" data-anim="up" data-delay="750">
            Dans le détail : Hippocrate puis Galien classaient les tempéraments en quatre humeurs.
            En 1921, Jung publie <i>Les types psychologiques</i> ; dans les années 1940, Katharine
            Briggs et Isabel Myers en tirent le questionnaire qui popularise les « types », en
            ajoutant l&apos;axe de l&apos;organisation. Côté traits, Gordon Allport recense les mots du
            caractère, Raymond Cattell les condense en seize facteurs, Hans Eysenck en trois grandes
            dimensions, et ces travaux convergent dans les années 1980 vers le modèle en cinq
            facteurs, le <b>Big Five</b>, cadre le plus solide de la recherche actuelle.
          </p>
        </div>
      </section>

      {/* ————— ÉCRAN 2 : TYPES OU TRAITS ————— */}
      <section id="na-debat">
        <div className="acte">
          <div className="pin-grid">
            <h2 data-anim="up">Types ou traits&nbsp;?<br /><span className="vert">Les deux.</span></h2>
            <div className="argument">
              <div className="ligne" data-anim="left" data-delay="150"><div>Les <b>types</b> parlent : « je suis INFP » raconte quelque chose. Mais la coupure est binaire, à 51 % tu reçois la même étiquette qu&apos;à 95 %.</div></div>
              <div className="ligne" data-anim="left" data-delay="350"><div>Les <b>traits</b> mesurent juste, tout en degrés, mais « 62 % d&apos;agréabilité » ne fait pas une identité.</div></div>
              <div className="ligne" data-anim="left" data-delay="550"><div>Notre choix : un <b>type lisible</b>, adossé à un <b>spectre en pourcentages</b>. Le spectre donne ta variante, une parmi trois par type : <b>48 profils</b>, pas 16 cases.</div></div>
            </div>
            <div className="visuel">
              <div className="grand-chiffre">48<small> profils</small></div>
              <div className="eclate" data-anim="pop" data-delay="800">
                <div className="case-var">INFP<span>V1</span></div>
                <div className="case-var">INFP<span>V2</span></div>
                <div className="case-var">INFP<span>V3</span></div>
              </div>
              <div className="legende-visuel">un même type, trois lectures distinctes, mesurées par tes réponses.</div>
            </div>
          </div>
          <p className="fond" data-anim="up" data-delay="750">
            Le fond du débat : la coupure binaire des typologies est leur faiblesse documentée,
            deux personnes à 49 et 51 % reçoivent deux étiquettes opposées alors qu&apos;elles se
            ressemblent presque trait pour trait. Les modèles de traits corrigent ce défaut mais
            perdent l&apos;identité : peu de gens se racontent avec des pourcentages. Adosser un
            <b> spectre continu</b> à un <b>type lisible</b> conserve les deux, l&apos;identité qui se
            partage, et la nuance qui ne s&apos;écrase pas.
          </p>
        </div>
      </section>

      {/* ————— ÉCRAN 3 : LA MÉCANIQUE ————— */}
      <section id="na-methode">
        <div className="acte">
          <div className="pin-grid">
            <h2 data-anim="up">Une mécanique<br /><span className="vert">sans boîte noire.</span></h2>
            <div className="argument">
              <div className="ligne" data-anim="left" data-delay="150"><div>Une soixantaine de questions, réparties également sur <b>4 axes</b> : ton énergie, ta perception, tes décisions, ton organisation.</div></div>
              <div className="ligne" data-anim="left" data-delay="350"><div>Chaque réponse ajoute un poids défini à son axe. Le calcul est <b>déterministe</b> : mêmes réponses, même résultat, à chaque fois.</div></div>
              <div className="ligne" data-anim="left" data-delay="550"><div>La position donne ta lettre, la distance au centre donne ton <b>intensité</b> : léger, modéré ou fort. Les lettres font ton type, la forme du spectre fait ta <b>variante</b>.</div></div>
            </div>
            <div className="visuel" style={{ justifyContent: "center", minHeight: 200 }}>
              <div className="axe" data-anim="right" data-delay="700">
                <div className="entete-centree"><span>Énergie</span><span className="pctv">68 %</span></div>
                <div className="barre-na"><div className="rempli-na" style={{ width: "68%" }} /></div>
                <div className="poles"><span>Introversion</span><span>Extraversion</span></div>
              </div>
              <div className="legende-visuel" style={{ marginTop: 10 }}>pas une case : une position exacte, sur chaque axe.</div>
            </div>
          </div>
          <p className="fond" data-anim="up" data-delay="750">
            Les chiffres exacts : la bascule d&apos;un axe se joue à <b>50 %</b>, d&apos;un côté tu prends
            une lettre, de l&apos;autre sa voisine. En dessous de <b>60 %</b> de dominance, ton trait
            est léger, presque à l&apos;équilibre ; jusqu&apos;à <b>75 %</b>, il est modéré ; au-delà,
            il est fort. Et tout est vérifiable : repasse le test avec les mêmes réponses, tu
            retrouveras exactement le même portrait.
          </p>
        </div>
      </section>

      {/* ————— ÉCRAN 4 : L'IA (bandeau vert) ————— */}
      <section id="na-ia">
        <div className="acte">
          <div className="monde">
            <div className="eyebrow">Transparence</div>
            <h2 data-anim="up" data-delay="120"><span className="attenue">L&apos;IA écrit.</span><br />Elle ne décide pas.</h2>
            <p className="sous-blanc">
              Ton résultat sort du calcul, pas d&apos;un modèle qui improvise.
              L&apos;IA intervient après, pour mettre en mots, à partir de textes
              que nous avons écrits et validés.
            </p>
            <div className="duo-cartes">
              <div className="carte-blanche" data-anim="up" data-delay="250">
                <h4>Le calcul décide</h4>
                <p>Type, spectre, intensités, variante : tout est fixé par tes réponses, de façon reproductible et vérifiable.</p>
              </div>
              <div className="carte-blanche" data-anim="up" data-delay="450">
                <h4>L&apos;IA met en mots</h4>
                <p>Elle compose ton portrait, fluide et personnel, sans jamais inventer le fond. Elle habille, elle ne juge pas.</p>
              </div>
            </div>
            <p className="fond-blanc" data-anim="up" data-delay="650">
              Concrètement : le calcul produit ton type, ton spectre, tes intensités et ta
              variante ; l&apos;IA reçoit ce résultat fermé, accompagné de textes que nous avons
              écrits et validés, et compose la mise en mots. Le fond est contrôlé, la forme est
              vivante, et son usage est affiché à chaque endroit où elle intervient.
            </p>
          </div>
        </div>
      </section>

      {/* ————— ÉCRAN 5 : LES LIMITES ————— */}
      <section id="na-limites">
        <div className="acte">
          <div className="pin-grid" style={{ gridTemplateColumns: "minmax(0,1fr) 330px" }}>
            <h2 data-anim="up">Un portrait.<br /><span className="vert">Pas un verdict.</span></h2>
            <div className="argument">
              <div className="ligne" data-anim="left" data-delay="150"><div>Ce test est un <b>portrait introspectif</b>, un outil de découverte de soi. Ni un instrument clinique, ni une évaluation médicale.</div></div>
              <div className="ligne" data-anim="left" data-delay="350"><div>Il repose sur ce que tu déclares : personne ne te connaît mieux que toi, mais l&apos;auto-perception a ses biais. Sa justesse dépend de ta <b>sincérité</b>.</div></div>
              <div className="ligne" data-anim="left" data-delay="550"><div>Et aucun questionnaire n&apos;épuise une personne : un profil <b>éclaire</b> des tendances, il ne t&apos;enferme nulle part.</div></div>
            </div>
            <div className="visuel">
              <div className="carte-portrait" data-anim="right" data-delay="600">
                <blockquote>
                  « Il n&apos;est description pareille en difficulté à la
                  <em> description de soi-même</em>. »
                </blockquote>
                <div className="signature">Montaigne, <i>Essais</i></div>
                <div className="preuve">La plus difficile des descriptions est aussi la plus utile : <b>réponds tel que tu es, pas tel que tu voudrais être.</b></div>
              </div>
            </div>
          </div>
          <p className="fond" data-anim="up" data-delay="750">
            Pour être complet : l&apos;auto-perception a des biais connus, l&apos;humeur du jour,
            l&apos;image qu&apos;on aimerait donner, la fatigue. C&apos;est précisément pour ça
            qu&apos;aucun questionnaire auto-déclaré, le nôtre compris, ne remplace un
            professionnel ni n&apos;épuise une personne : un profil <b>éclaire des tendances</b>,
            il ne t&apos;enferme nulle part.
          </p>
        </div>
      </section>

      {/* ————— ÉCRAN 6 : LES PRINCIPES ————— */}
      <section id="na-principes">
        <div className="acte">
          <h2 data-anim="up">Trois principes.<br /><span className="vert">Aucune exception.</span></h2>
          <div className="principes">
            <div className="principe" data-anim="pop" data-delay="150">
              <div className="pastille">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" /></svg>
              </div>
              <h4>Transparence</h4>
              <p>La mécanique du test est <b>expliquée ici même</b>, et le rôle de l&apos;IA est affiché partout où elle intervient.</p>
            </div>
            <div className="principe" data-anim="pop" data-delay="300">
              <div className="pastille">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="10" width="16" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>
              </div>
              <h4>Confidentialité</h4>
              <p>Tes réponses et tes résultats <b>t&apos;appartiennent</b> : jamais vendus, supprimables quand tu veux.</p>
            </div>
            <div className="principe" data-anim="pop" data-delay="450">
              <div className="pastille">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
              </div>
              <h4>Honnêteté</h4>
              <p>Un vocabulaire choisi : portrait, profil, analyse. <b>Jamais de promesse médicale</b>, jamais d&apos;omniscience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ————— FINAL : BANDEAU VERT ————— */}
      <section id="na-final">
        <div className="acte">
          <div className="final-na" data-anim="up">
            <h2>Et maintenant,<br />si on te lisait, toi&nbsp;?</h2>
            <p>Le test est gratuit, ton type et ton résumé aussi. Le reste ne dépend que de ta curiosité.</p>
            <Link className="cta-na" href="/test">Faire le test</Link>
            <div className="microligne"><b>10 minutes</b> · gratuit · sans inscription</div>
            <div>
              <Link className="lien-suite" href="/types-de-personnalite">Ou explore d&apos;abord les 48 personnalités →</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
