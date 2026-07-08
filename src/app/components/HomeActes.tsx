"use client";

/*
  HomeActes — les actes de la nouvelle page d'accueil (sous le héros).
  Acte 01 : aperçu du résultat (spectre + carte portrait + preuve)
  Acte 02 : 48 nuances (chiffre automatique 16→48)
  Défilé  : les 16 types en emblèmes
  Acte 03 : le monde vert (parcours à deux)
  Acte 04 : l'espace personnel (3 cartes)
  Final   : bandeau vert de conversion
  + le voile d'atmosphère, la dissolution au scroll, et le ressort
  (un cran de molette = un acte, centré à l'écran).
  Le héros et la navbar ne sont PAS touchés par ce composant.
*/

import Link from "next/link";
import { useEffect, useRef } from "react";

const TYPES = ["INFP","ENFP","INFJ","ENFJ","INTP","ENTP","INTJ","ENTJ",
               "ISFP","ESFP","ISFJ","ESFJ","ISTP","ESTP","ISTJ","ESTJ"];

const STYLES = `
.ha{--vert-plein:rgb(82,178,137);--vert-clair:rgba(51,164,116,0.12);--noir:rgba(0,0,0,0.75);--gris:rgba(0,0,0,0.5);--ease:cubic-bezier(.22,.9,.3,1);color:var(--noir);}
.ha .acte{max-width:768px;margin:0 auto;padding:130px 16px 50px;}
@media (min-width:768px){.ha .acte{padding-left:0;padding-right:0;}}
.ha .eyebrow{color:rgba(51,164,116,0.9);font-weight:700;font-size:12px;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:12px;}
.ha h2{font-size:clamp(30px,4.5vw,46px);font-weight:700;letter-spacing:-0.02em;line-height:1.12;}
.ha .sous{font-size:19px;color:var(--gris);line-height:1.6;margin-top:18px;max-width:640px;}
.ha [data-anim]{opacity:0;transition:opacity 1s var(--ease),transform 1s var(--ease);will-change:opacity,transform;}
.ha [data-anim="up"]{transform:translateY(44px);}
.ha [data-anim="left"]{transform:translateX(-64px);}
.ha [data-anim="right"]{transform:translateX(64px);}
.ha [data-anim="pop"]{transform:translateY(26px) scale(.94);}
.ha [data-anim].vu{opacity:1;transform:none;}
.ha .mots .mot{display:inline-block;opacity:0;transform:translateY(0.55em) rotate(1.5deg);transition:opacity .7s var(--ease),transform .7s var(--ease);}
.ha .mots.vu .mot{opacity:1;transform:none;}
/* Voile : dégradé FIXE déplacé par transform (composité GPU, aucun repaint) */
.ha-voile{
  position:fixed;inset:-25%;z-index:-1;pointer-events:none;
  background:radial-gradient(40% 34% at 50% 40%,rgba(51,164,116,0.085),transparent 72%);
  will-change:transform,opacity;
}
.ha .dissout{will-change:opacity,transform;}
.ha .apercu{display:flex;gap:32px;align-items:center;margin-top:54px;flex-wrap:wrap;}
.ha .spectre-ha{flex:1 1 360px;}
.ha .axe{margin-bottom:30px;}
.ha .entete-centree{display:flex;justify-content:center;gap:6px;margin-bottom:7px;font-size:14.5px;font-weight:600;}
.ha .entete-centree .pctv{color:var(--vert-plein);font-variant-numeric:tabular-nums;}
.ha .poles{display:flex;justify-content:space-between;font-size:13.5px;color:rgba(0,0,0,0.35);margin-top:7px;}
.ha .barre-ha{height:10px;border-radius:999px;background:#eef0f2;position:relative;overflow:hidden;}
.ha .rempli{position:absolute;top:0;left:0;bottom:0;border-radius:999px;background:rgba(51,164,116,0.75);width:0;transition:width 1.4s var(--ease);}
.ha .carte-portrait{flex:1 1 330px;background:#fff;border:1px solid rgba(0,0,0,0.06);border-radius:26px;padding:30px 32px;box-shadow:0 12px 40px -12px rgba(0,0,0,0.12);transform-style:preserve-3d;transition:transform .25s ease-out,box-shadow .25s;will-change:transform;}
.ha .carte-portrait:hover{box-shadow:0 18px 50px -14px rgba(0,0,0,0.16);}
.ha .carte-portrait .type-ha{display:flex;align-items:center;gap:16px;margin-bottom:20px;}
.ha .embleme-ha{background:var(--vert-clair);color:var(--vert-plein);font-weight:700;border-radius:14px;width:58px;height:58px;display:flex;align-items:center;justify-content:center;font-size:15px;}
.ha .carte-portrait blockquote{font-size:16.5px;line-height:1.65;}
.ha .carte-portrait blockquote em{color:var(--vert-plein);font-style:normal;font-weight:600;}
.ha .preuve{margin-top:22px;padding-top:18px;border-top:1px solid rgba(51,164,116,0.25);font-size:14px;color:var(--gris);}
.ha .preuve b{color:var(--vert-plein);font-variant-numeric:tabular-nums;}
.ha .lien-suite{display:inline-flex;align-items:center;gap:8px;margin-top:30px;color:var(--vert-plein);font-weight:600;font-size:16px;}
.ha .lien-suite .fl{transition:transform .3s var(--ease);}
.ha .lien-suite:hover .fl{transform:translateX(5px);}
/* Grille : titre sur sa rangée, puis paragraphe et chiffre sur la MÊME rangée,
   tops alignés par le layout (aucun calcul) */
.ha .pin-grid{display:grid;grid-template-columns:minmax(0,1fr) 300px;grid-template-areas:"titre titre" "arg visuel";column-gap:36px;row-gap:26px;align-items:start;}
.ha .pin-grid h2{grid-area:titre;}
.ha .pin-grid .argument{grid-area:arg;}
.ha .pin-grid .visuel{grid-area:visuel;display:flex;flex-direction:column;gap:14px;align-items:center;}
@media (max-width:700px){.ha .pin-grid{grid-template-columns:1fr;grid-template-areas:"titre" "arg" "visuel";}}
/* Acte test : plein écran une fois posé (le héros sort entièrement de l'écran) */
#ha-acte1 .acte{min-height:calc(100svh - 30px);display:flex;flex-direction:column;justify-content:center;padding-top:60px;padding-bottom:40px;}
#ha-acte1 .pin-grid{grid-template-columns:minmax(0,1fr) 360px;}
#ha-acte1 .argument{align-self:center;gap:20px;}
#ha-acte1 .visuel{gap:20px;}
@media (max-width:700px){#ha-acte1 .pin-grid{grid-template-columns:1fr;}}
.ha .grand-chiffre{font-size:clamp(88px,11vw,140px);font-weight:700;letter-spacing:-0.03em;color:var(--vert-plein);line-height:1;font-variant-numeric:tabular-nums;}
.ha .grand-chiffre small{font-size:0.3em;color:var(--gris);font-weight:600;}
.ha .rangee-types{display:flex;gap:10px;}
.ha .case-type{width:48px;height:48px;border-radius:11px;background:rgba(0,0,0,0.05);display:flex;align-items:center;justify-content:center;font-size:11.5px;font-weight:600;color:var(--gris);transition:background .4s,color .4s;}
.ha .case-type.allume{background:var(--vert-clair);color:var(--vert-plein);}
.ha .eclate{display:flex;gap:10px;}
.ha .case-var{width:48px;height:48px;border-radius:11px;background:var(--vert-clair);display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:11px;font-weight:600;color:var(--vert-plein);gap:2px;}
.ha .case-var span{font-size:9.5px;font-weight:500;color:var(--gris);}
.ha .legende-visuel{font-size:14px;color:var(--gris);}
.ha .argument{display:flex;flex-direction:column;gap:14px;}
.ha .argument b{color:var(--vert-plein);font-weight:600;}
.ha .argument .ligne{display:flex;gap:12px;align-items:flex-start;font-size:16px;line-height:1.55;}
.ha .argument .ligne .puce{flex:none;width:22px;height:22px;border-radius:999px;background:var(--vert-clair);color:var(--vert-plein);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;margin-top:2px;}
.ha .defile{overflow:hidden;padding:0;position:relative;margin-top:34px;max-width:768px;
  /* Fondu des bords par MASQUE (pas des voiles blancs) : le carrousel devient
     transparent sur les côtés, quel que soit le fond derrière (dégradé vert fixe). */
  -webkit-mask-image:linear-gradient(90deg,transparent,#000 64px,#000 calc(100% - 64px),transparent);
  mask-image:linear-gradient(90deg,transparent,#000 64px,#000 calc(100% - 64px),transparent);}
.ha .rangee-defile{display:flex;gap:16px;width:max-content;padding:14px 0;align-items:center;will-change:transform;}
.ha .embleme-defile{width:78px;height:78px;border-radius:20px;flex:none;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:16.5px;letter-spacing:0.03em;transition:transform .4s var(--ease);}
.ha .embleme-defile:hover{transform:scale(1.25) rotate(-2deg);}
.ha .embleme-defile.e1{background:var(--vert-clair);color:var(--vert-plein);}
.ha .embleme-defile.e2{background:rgb(102,187,151);color:#fff;}
.ha .embleme-defile.e3{background:#fff;color:var(--vert-plein);border:1.5px solid rgba(51,164,116,0.3);}
.ha .monde{max-width:768px;margin:120px auto 0;border-radius:24px;background:rgb(102,187,151);padding:70px 40px;color:#fff;overflow:hidden;position:relative;}
.ha .monde .eyebrow{color:rgba(255,255,255,0.85);}
.ha .monde h2{color:#fff;}
.ha .duo-bloc{max-width:768px;margin:44px auto 0;display:flex;gap:36px;align-items:stretch;flex-wrap:wrap;}
/* la colonne de droite épouse la hauteur du texte : emblèmes calés en haut,
   bouton calé en bas, mêmes marges haute et basse que le bloc de gauche */
/* La colonne de droite épouse la hauteur du texte : animation en haut
   (alignée sur « Le parcours à deux »), bouton calé sur le bas du paragraphe */
.ha .duo-visuel{flex:1 1 280px;display:flex;flex-direction:column;align-items:center;justify-content:space-between;}
.ha .duo-visuel .cta-blanc{margin-top:0;}
.ha .duo-emblemes{display:flex;align-items:center;gap:22px;}
.ha .duo-visuel .embleme-ha{width:86px;height:86px;font-size:19px;border-radius:20px;background:#fff;color:var(--vert-plein);will-change:transform,opacity;}
/* Le puzzle grossit au survol : le scale vit sur le CONTENEUR (#ha-lottie),
   pour ne pas toucher au transform correctif du player (translateY/scale/rotate) */
.ha #ha-lottie{transition:transform .4s var(--ease);}
.ha #ha-lottie:hover{transform:scale(1.15);}
/* Illustration au trait blanc : se dessine à l'arrivée, puis respire doucement */
.ha .coeur-trace{width:260px;height:166px;color:#fff;animation:ha-bat-doux 3s ease-in-out infinite;}
.ha .coeur-trace svg{width:100%;height:100%;overflow:visible;}
@keyframes ha-bat-doux{0%,100%{transform:scale(1);}10%{transform:scale(1.05);}20%{transform:scale(1);}}
.ha .duo-texte{flex:1 1 360px;}
.ha .duo-texte h3{font-size:26px;font-weight:700;margin-bottom:14px;color:#fff;}
.ha .duo-texte p{font-size:16.5px;color:rgba(255,255,255,0.88);line-height:1.65;}
.ha .exclu{display:inline-block;margin-bottom:16px;background:#fff;color:rgba(51,164,116,0.95);font-size:13px;font-weight:600;padding:6px 14px;border-radius:999px;}
/* Entrée « tampon » : arrive de face, gros puis s'écrase sur la page comme un coup de tampon */
.ha [data-anim="tampon"]{transform:scale(2.6) rotate(-6deg);transition:opacity .22s ease,transform .4s cubic-bezier(.2,1.35,.45,1);}
.ha [data-anim="tampon"].vu{transform:scale(1) rotate(0deg);}
@keyframes ha-pulse{0%{transform:scale(1);}40%{transform:scale(1.45);}100%{transform:scale(1);}}
.ha .coeur.pulse{animation:ha-pulse .6s var(--ease);}
.ha .cta-ha{display:inline-block;background:rgba(51,164,116,0.75);color:#fff;font-weight:600;padding:15px 38px;border-radius:999px;font-size:18px;transition:transform .3s;cursor:pointer;border:none;}
.ha .cta-ha:hover{transform:scale(1.05);}
.ha .cta-blanc{background:#fff;color:rgba(51,164,116,0.95);margin-top:26px;font-size:16px;padding:13px 30px;}
.ha .cta-petit{font-size:16px;padding:13px 30px;}
.ha .espace{display:flex;gap:16px;margin-top:54px;flex-wrap:wrap;perspective:1200px;}
.ha a.carte-espace{display:block;color:inherit;}
/* Colonnes aériennes : plus de boîtes, le contenu posé sur la page */
.ha .carte-espace{flex:1 1 220px;padding:10px 6px;border-radius:18px;transition:transform .3s var(--ease);will-change:transform;}
.ha .carte-espace:hover{transform:translateY(-4px);}
.ha .anneau{width:96px;height:96px;margin-bottom:20px;position:relative;}
.ha .anneau svg{width:100%;height:100%;transform:rotate(-90deg);}
.ha .anneau .fond-a{stroke:var(--vert-clair);}
.ha .anneau .prog{stroke:var(--vert-plein);stroke-linecap:round;transition:stroke-dashoffset 1.6s cubic-bezier(.3,1.15,.4,1);}
.ha .num-anneau{
  position:absolute;inset:0;display:flex;align-items:center;justify-content:center;
  font-weight:700;color:var(--vert-plein);font-size:21px;font-variant-numeric:tabular-nums;
}
.ha .num-anneau small{font-size:12px;font-weight:600;margin-left:1px;}
.ha .carte-espace h4{font-size:18px;font-weight:700;margin-bottom:8px;}
.ha .carte-espace p{font-size:15px;color:var(--gris);line-height:1.6;}
.ha .carte-espace p b{color:inherit;font-weight:600;}
.ha .final-ha{margin:120px 15px 15px;border-radius:24px;background:rgb(102,187,151);text-align:center;padding:110px 24px;color:#fff;overflow:hidden;position:relative;will-change:transform;}
.ha .final-ha h2{color:#fff;max-width:760px;margin:0 auto;}
.ha .final-ha p{color:rgba(255,255,255,0.85);font-size:20px;margin:24px auto 0;max-width:560px;line-height:1.6;}
.ha .final-ha .cta-ha{background:#fff;color:rgba(51,164,116,0.95);margin-top:40px;position:relative;overflow:hidden;}
.ha .final-ha .cta-ha::after{content:"";position:absolute;top:0;left:-80%;width:60%;height:100%;background:linear-gradient(100deg,transparent,rgba(82,178,137,0.18),transparent);transform:skewX(-20deg);animation:ha-brille 3.2s ease-in-out infinite;}
@keyframes ha-brille{0%,55%{left:-80%;}85%,100%{left:130%;}}
.ha .microligne{margin-top:16px;font-size:14px;display:flex;justify-content:center;gap:10px;align-items:center;color:rgba(255,255,255,0.75);}
.ha .microligne b{color:#fff;font-weight:600;}
/* Points de navigation fullpage : un point par acte, sur le bord droit */
.ha-points{position:fixed;right:20px;top:50%;transform:translateY(-50%);z-index:60;display:flex;flex-direction:column;gap:13px;}
.ha-points button{
  width:11px;height:11px;border-radius:999px;padding:0;cursor:pointer;
  background:rgba(255,255,255,0.9);border:1.5px solid rgba(51,164,116,0.55);
  transition:transform .3s var(--ease),background .3s,border-color .3s;
}
.ha-points button:hover{transform:scale(1.45);}
.ha-points button.actif{background:rgb(82,178,137);border-color:rgb(82,178,137);transform:scale(1.4);}
@media (max-width:900px){.ha-points{display:none;}}
.ha-btn-haut{width:46px;height:46px;border-radius:999px;background:rgb(82,178,137);color:#fff;display:flex;align-items:center;justify-content:center;border:none;cursor:pointer;box-shadow:0 10px 26px -8px rgba(51,164,116,0.45);margin:34px auto 10px;transition:transform .3s var(--ease);animation:ha-sautille 1.7s cubic-bezier(.45,0,.3,1) infinite;}
.ha-btn-haut:hover{transform:scale(1.1);animation-play-state:paused;}
.ha-btn-haut svg{width:20px;height:20px;}
@keyframes ha-sautille{
  0%,100%{transform:translateY(0);}
  12%{transform:translateY(-9px);}
  24%{transform:translateY(0);}
  32%{transform:translateY(-4px);}
  40%{transform:translateY(0);}
}
@media (prefers-reduced-motion: reduce){.ha-btn-haut{animation:none;}}
@media (prefers-reduced-motion: reduce){
  .ha [data-anim],.ha .mots .mot{transition:none;opacity:1;transform:none;}
}
`;

export default function HomeActes() {
  const racine = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ha = racine.current;
    if (!ha) return;
    const reduit = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
    const lerp = (a: number, b: number, p: number) => a + (b - a) * p;
    const nettoyeurs: (() => void)[] = [];

    /* Titres mot à mot */
    ha.querySelectorAll<HTMLElement>("[data-mots]").forEach((h) => {
      const mots = (h.textContent || "").trim().split(/\s+/);
      h.innerHTML = mots.map((m, i) => `<span class="mot" style="transition-delay:${i * 70}ms">${m}</span>`).join(" ");
    });

    /* Entrées réversibles */
    const minuteurs = new WeakMap<Element, ReturnType<typeof setTimeout>>();
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      const el = e.target as HTMLElement;
      clearTimeout(minuteurs.get(el));
      if (e.isIntersecting) {
        minuteurs.set(el, setTimeout(() => el.classList.add("vu"), parseInt(el.dataset.delay || "0", 10)));
      } else {
        el.classList.remove("vu");
      }
    }), { threshold: 0.18, rootMargin: "0px 0px -40px 0px" });
    ha.querySelectorAll("[data-anim],[data-mots]").forEach((el) => io.observe(el));
    nettoyeurs.push(() => io.disconnect());

    /* Compteurs + barres (acte 01), réversibles */
    function compter(el: HTMLElement) {
      const cible = parseInt(el.dataset.cible || "0", 10);
      const depart = parseInt(el.textContent || "0", 10) || 0;
      const t0 = performance.now(), duree = 1400;
      const pas = (t: number) => {
        const p = Math.min((t - t0) / duree, 1), e = 1 - Math.pow(1 - p, 3);
        el.textContent = String(Math.round(depart + (cible - depart) * e));
        if (p < 1) requestAnimationFrame(pas);
      };
      requestAnimationFrame(pas);
    }
    const ioNum = new IntersectionObserver((es) => es.forEach((e) => {
      const c = e.target as HTMLElement;
      if (e.isIntersecting) {
        c.querySelectorAll<HTMLElement>(".pct").forEach(compter);
        c.querySelectorAll<HTMLElement>(".rempli").forEach((b) => { b.style.width = (b.dataset.w || "0") + "%"; });
      } else {
        c.querySelectorAll<HTMLElement>(".pct").forEach((el) => { el.textContent = "0"; });
        c.querySelectorAll<HTMLElement>(".rempli").forEach((b) => { b.style.width = "0"; });
      }
    }), { threshold: 0.35 });
    const spectre = ha.querySelector("#ha-spectre");
    const cartePortrait = ha.querySelector<HTMLElement>("#ha-carte-portrait");
    const preuve = ha.querySelector("#ha-preuve");
    if (spectre) ioNum.observe(spectre);
    if (cartePortrait) ioNum.observe(cartePortrait);
    if (preuve) ioNum.observe(preuve);
    nettoyeurs.push(() => ioNum.disconnect());

    /* Tilt 3D léger */
    function tilt(el: HTMLElement, force: number) {
      const move = (ev: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const x = (ev.clientX - r.left) / r.width - 0.5, y = (ev.clientY - r.top) / r.height - 0.5;
        el.style.transform = `rotateY(${x * force}deg) rotateX(${-y * force}deg) translateZ(0)`;
      };
      const leave = () => { el.style.transform = ""; };
      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", leave);
      nettoyeurs.push(() => { el.removeEventListener("mousemove", move); el.removeEventListener("mouseleave", leave); });
    }
    if (!reduit) {
      if (cartePortrait) tilt(cartePortrait, 5);
      ha.querySelectorAll<HTMLElement>(".carte-espace").forEach((c) => tilt(c, 4));
    }

    /* Acte 02 : montée automatique 16 → 48 en 3 s, réversible */
    const grandChiffre = ha.querySelector<HTMLElement>("#ha-grand-chiffre")!;
    const chiffreTitre = ha.querySelector<HTMLElement>("#ha-chiffre-titre")!;
    const casesTypes = [...ha.querySelectorAll<HTMLElement>(".case-type")];
    const acte48 = ha.querySelector<HTMLElement>("#ha-acte48")!;
    let minuteursTypes: ReturnType<typeof setTimeout>[] = [];
    function jouerChiffre() {
      const t0 = performance.now(), D = 3000;
      const pas = (t: number) => {
        const p = clamp((t - t0) / D, 0, 1), e = 1 - Math.pow(1 - p, 3);
        const v = String(Math.round(lerp(16, 48, e)));
        grandChiffre.textContent = v; chiffreTitre.textContent = v;
        if (p < 1 && grandChiffre.dataset.actif === "1") requestAnimationFrame(pas);
      };
      requestAnimationFrame(pas);
      casesTypes.forEach((c, i) => {
        minuteursTypes.push(setTimeout(() => c.classList.add("allume"), 500 + i * 450));
      });
    }
    const ioChiffre = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) {
        grandChiffre.dataset.actif = "1";
        jouerChiffre();
      } else {
        grandChiffre.dataset.actif = "0";
        minuteursTypes.forEach(clearTimeout); minuteursTypes = [];
        grandChiffre.textContent = "16"; chiffreTitre.textContent = "16";
        casesTypes.forEach((c) => c.classList.remove("allume"));
      }
    }), { threshold: 0.35 });
    ioChiffre.observe(acte48);
    nettoyeurs.push(() => ioChiffre.disconnect());

    /* Anneaux, réversibles */
    const C = 2 * Math.PI * 22;
    ha.querySelectorAll<SVGCircleElement>(".prog").forEach((c) => {
      c.style.strokeDasharray = String(C); c.style.strokeDashoffset = String(C);
    });
    /* remplit l'anneau + fait compter le % au centre (comme sur la page profil) */
    function chargerAnneau(carte: Element) {
      const c = carte.querySelector<SVGCircleElement>(".prog");
      const num = carte.querySelector<HTMLElement>(".num");
      if (!c) return;
      setTimeout(() => { c.style.strokeDashoffset = String(C * (1 - parseInt(c.dataset.pct || "0", 10) / 100)); }, 300);
      if (num) { num.dataset.cible = c.dataset.pct; setTimeout(() => compter(num), 300); }
    }
    function viderAnneau(carte: Element) {
      const c = carte.querySelector<SVGCircleElement>(".prog");
      const num = carte.querySelector<HTMLElement>(".num");
      if (c) c.style.strokeDashoffset = String(C);
      if (num) num.textContent = "0";
    }
    const ioAnn = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) chargerAnneau(e.target);
      else viderAnneau(e.target);
    }), { threshold: 0.4 });
    ha.querySelectorAll(".carte-espace").forEach((el) => {
      ioAnn.observe(el);
      /* au survol : l'anneau se recharge, le réflexe de la page profil */
      const rejouer = () => { viderAnneau(el); requestAnimationFrame(() => requestAnimationFrame(() => chargerAnneau(el))); };
      el.addEventListener("mouseenter", rejouer);
      nettoyeurs.push(() => el.removeEventListener("mouseenter", rejouer));
    });
    nettoyeurs.push(() => ioAnn.disconnect());

    /* ---- Défilé des types : avance tout seul ET tourne avec le scroll ---- */
    const rangeeDefile = ha.querySelector<HTMLElement>(".rangee-defile")!;
    const zoneDefile = ha.querySelector<HTMLElement>(".defile")!;
    let posDefile = 0, derniereYDefile = scrollY, pauseDefile = false, idDefile = 0;
    const entreeDefile = () => { pauseDefile = true; };
    const sortieDefile = () => { pauseDefile = false; };
    zoneDefile.addEventListener("mouseenter", entreeDefile);
    zoneDefile.addEventListener("mouseleave", sortieDefile);
    /* Souris au-dessus : la molette fait défiler le carrousel (gauche/droite),
       la page ne bouge pas et le ressort ne se déclenche pas */
    const moletteDefile = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      posDefile += (e.deltaY + e.deltaX) * 0.9;
    };
    zoneDefile.addEventListener("wheel", moletteDefile, { passive: false });
    nettoyeurs.push(() => zoneDefile.removeEventListener("wheel", moletteDefile));
    const boucleDefile = () => {
      if (!reduit) {
        if (!pauseDefile) posDefile += 0.45; /* dérive continue */
        posDefile += (scrollY - derniereYDefile) * 0.55; /* le scroll fait tourner */
        derniereYDefile = scrollY;
        const demi = rangeeDefile.scrollWidth / 2;
        if (demi > 0) posDefile = ((posDefile % demi) + demi) % demi;
        rangeeDefile.style.transform = `translateX(${-posDefile}px)`;
      }
      idDefile = requestAnimationFrame(boucleDefile);
    };
    idDefile = requestAnimationFrame(boucleDefile);
    nettoyeurs.push(() => {
      cancelAnimationFrame(idDefile);
      zoneDefile.removeEventListener("mouseenter", entreeDefile);
      zoneDefile.removeEventListener("mouseleave", sortieDefile);
    });

    /* La flèche du héros : couleur forcée à la VALEUR EXACTE du bouton au-dessus
       (rgba(51,164,116,0.75) posé sur blanc = rgb(102,187,151)), injectée dans le
       shadow DOM du lecteur Lottie — aucun filtre approximatif. */
    const teinterFlecheHero = setInterval(() => {
      const lecteur = document.querySelector<HTMLElement>('a[href="#ha-acte1"] dotlottie-player');
      const sr = lecteur?.shadowRoot;
      if (sr && !sr.querySelector("#teinte-fleche")) {
        const st = document.createElement("style");
        st.id = "teinte-fleche";
        st.textContent = "svg path{fill:rgb(102,187,151)!important;stroke:rgb(102,187,151)!important;}";
        sr.appendChild(st);
      }
      if (sr?.querySelector("#teinte-fleche")) clearInterval(teinterFlecheHero);
    }, 250);
    nettoyeurs.push(() => clearInterval(teinterFlecheHero));

    /* ---- Pilotage au scroll : voile, dissolution, duo, final ---- */
    const voile = ha.querySelector<HTMLElement>(".ha-voile")!;
    const points = [...ha.querySelectorAll<HTMLButtonElement>(".ha-points button")];
    const btnHaut = ha.querySelector<HTMLElement>("#ha-btn-haut")!;
    const finalEl = ha.querySelector<HTMLElement>("#ha-final")!;

    /* Lecteur Lottie (chargé une seule fois, via CDN, aucune installation) */
    if (!document.querySelector("script[data-dotlottie]")) {
      const sc = document.createElement("script");
      sc.type = "module";
      sc.src = "https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs";
      sc.setAttribute("data-dotlottie", "1");
      document.head.appendChild(sc);
    }

    /* L'illustration au trait : chaque tracé se dessine quand la section arrive (réversible) */
    const coeurWrap = ha.querySelector<HTMLElement>("#ha-coeur");
    if (coeurWrap) {
      const traces = [...coeurWrap.querySelectorAll<SVGGeometryElement>("path,circle")];
      traces.forEach((t, i) => {
        const L = t.getTotalLength();
        t.style.strokeDasharray = String(L);
        t.style.strokeDashoffset = String(L);
        t.style.transition = `stroke-dashoffset 1.6s ease ${0.25 + i * 0.45}s`;
      });
      const ioCoeur = new IntersectionObserver((es) => es.forEach((e) => {
        traces.forEach((t) => {
          t.style.strokeDashoffset = e.isIntersecting ? "0" : t.style.strokeDasharray;
        });
      }), { threshold: 0.35 });
      ioCoeur.observe(coeurWrap);
      nettoyeurs.push(() => ioCoeur.disconnect());
    }
    function prog(el: HTMLElement, departVh: number, finVh: number) {
      const r = el.getBoundingClientRect();
      const vh = innerHeight;
      return clamp((vh * departVh - r.top) / (vh * departVh - vh * finVh + (r.height > vh ? r.height - vh : 0)), 0, 1);
    }
    function surScroll() {
      if (reduit || !ha) return;
      const y = scrollY;
      const docH = document.documentElement.scrollHeight - innerHeight;
      const t = clamp(y / docH, 0, 1);
      /* le voile dérive par transform (GPU) : translation + respiration d'échelle */
      voile.style.transform = `translate(${(18 * Math.sin(t * Math.PI * 2.6)).toFixed(2)}%, ${(-12 + 24 * t).toFixed(2)}%) scale(${(1 + 0.15 * Math.sin(t * Math.PI * 3)).toFixed(3)})`;
      voile.style.opacity = String(0.7 + 0.5 * Math.pow(Math.sin(t * Math.PI * 3), 2));

      /* dissolution SANS blur (le flou repeignait des sections entières = saccades) */
      ha.querySelectorAll<HTMLElement>(".dissout").forEach((s) => {
        const r = s.getBoundingClientRect();
        const pd = clamp((innerHeight * 0.42 - r.bottom) / (innerHeight * 0.32), 0, 1);
        s.style.opacity = String(1 - pd * 0.85);
        s.style.transform = `translateY(${-pd * 34}px) scale(${1 - pd * 0.02})`;
      });

      const p6 = prog(finalEl, 1, 0.55);
      finalEl.style.transform = `scale(${lerp(0.94, 1, p6)})`;
      finalEl.style.borderRadius = `${lerp(40, 24, p6)}px`;

      /* Le dégradé fixe du héros (Hero.tsx) ne descend pas sous le bloc vert final :
         sa hauteur est bornée au bas de #ha-final. */
      const fondFixe = document.getElementById("hero-fond-fixe");
      if (fondFixe) {
        fondFixe.style.height = `${clamp(finalEl.getBoundingClientRect().bottom, 0, innerHeight)}px`;
      }

      /* Point actif : l'acte dont le centre est le plus proche du centre de l'écran */
      if (points.length) {
        const milieu = y + innerHeight / 2;
        let meilleur = 0, dist = Infinity;
        points.forEach((pt, i) => {
          const id = pt.dataset.c!;
          const el = id === "haut" ? null : ha!.querySelector<HTMLElement>("#" + id);
          const centre = id === "haut"
            ? innerHeight / 2
            : (el ? el.getBoundingClientRect().top + y + el.offsetHeight / 2 : 0);
          const d = Math.abs(centre - milieu);
          if (d < dist) { dist = d; meilleur = i; }
        });
        points.forEach((pt, i) => pt.classList.toggle("actif", i === meilleur));
      }
    }
    let attente = false;
    const surScrollRaf = () => {
      if (attente) return;
      attente = true;
      requestAnimationFrame(() => { surScroll(); attente = false; });
    };
    addEventListener("scroll", surScrollRaf, { passive: true });
    nettoyeurs.push(() => removeEventListener("scroll", surScrollRaf));
    surScroll();

    /* ---- LE RESSORT : un geste de molette = un acte, centré ---- */
    const ressortActif = !reduit && matchMedia("(pointer:fine)").matches && innerWidth > 900;
    let arrets: number[] = [], animRessort = false;
    function cibleCentree(el: HTMLElement) {
      const top = el.getBoundingClientRect().top + scrollY;
      const docH = document.documentElement.scrollHeight - innerHeight;
      return clamp(top + (el.offsetHeight - innerHeight) / 2, 0, docH);
    }
    function mesurerArrets() {
      const ids = ["ha-acte1", "ha-acte48", "ha-monde", "ha-espace"];
      arrets = [0,
        ...ids.map((i) => cibleCentree(ha!.querySelector<HTMLElement>("#" + i)!)),
        cibleCentree(finalEl),
        // le BAS DE PAGE (footer) est aussi un arrêt : quitter la dernière
        // partie vers les conditions générales garde la même glisse fluide
        document.documentElement.scrollHeight - innerHeight,
      ].sort((a, b) => a - b)
        // arrêts quasi confondus (final déjà en bas de page) : on n'en garde qu'un
        .filter((a, i, t) => i === 0 || a - t[i - 1] > 8);
    }
    function easeGlisse(t: number) { return t * t * t * (t * (t * 6 - 15) + 10); }
    /* clic sur un point : glisse jusqu'à l'acte visé */
    points.forEach((pt) => {
      const surPoint = () => {
        const id = pt.dataset.c!;
        if (id === "haut") { lancerRessort(0); return; }
        const el = ha!.querySelector<HTMLElement>("#" + id);
        if (el) lancerRessort(cibleCentree(el));
      };
      pt.addEventListener("click", surPoint);
      nettoyeurs.push(() => pt.removeEventListener("click", surPoint));
    });
    /* le bouton remonte avec la même glisse que le ressort */
    const surBtnHaut = () => {
      if (reduit) { scrollTo({ top: 0, behavior: "auto" }); return; }
      lancerRessort(0);
    };
    btnHaut.addEventListener("click", surBtnHaut);
    nettoyeurs.push(() => btnHaut.removeEventListener("click", surBtnHaut));
    function lancerRessort(cible: number) {
      animRessort = true;
      const depart = scrollY, delta = cible - depart, t0 = performance.now();
      const D = Math.min(1600, 900 + Math.abs(delta) * 0.35);
      const pas = (t: number) => {
        const p = clamp((t - t0) / D, 0, 1);
        scrollTo(0, depart + delta * easeGlisse(p));
        if (p < 1) requestAnimationFrame(pas);
        else setTimeout(() => { animRessort = false; }, 160);
      };
      requestAnimationFrame(pas);
    }
    if (ressortActif) {
      const ancienComportement = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "auto";
      const surMolette = (e: WheelEvent) => {
        if (animRessort) { e.preventDefault(); return; }
        if (Math.abs(e.deltaY) < 8) return;
        mesurerArrets();
        const y = scrollY, bas = e.deltaY > 0;
        let cible: number | null = null;
        if (bas) { for (const a of arrets) { if (a > y + 6) { cible = a; break; } } }
        else { for (let i = arrets.length - 1; i >= 0; i--) { if (arrets[i] < y - 6) { cible = arrets[i]; break; } } }
        if (cible == null) return;
        e.preventDefault();
        lancerRessort(cible);
      };
      addEventListener("wheel", surMolette, { passive: false });
      addEventListener("resize", mesurerArrets);
      mesurerArrets();
      /* la flèche du héros descend avec la même glisse que le ressort */
      const flecheHero = document.querySelector<HTMLAnchorElement>('a[href="#ha-acte1"]');
      if (flecheHero) {
        const surFleche = (e: Event) => {
          e.preventDefault();
          const acte1 = ha.querySelector<HTMLElement>("#ha-acte1");
          if (acte1) lancerRessort(cibleCentree(acte1));
        };
        flecheHero.addEventListener("click", surFleche);
        nettoyeurs.push(() => flecheHero.removeEventListener("click", surFleche));
      }
      nettoyeurs.push(() => {
        removeEventListener("wheel", surMolette);
        removeEventListener("resize", mesurerArrets);
        document.documentElement.style.scrollBehavior = ancienComportement;
      });
    }

    return () => { nettoyeurs.forEach((n) => n()); };
  }, []);

  return (
    <div className="ha" ref={racine}>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div className="ha-voile" aria-hidden />

      {/* Points de navigation (un par acte) */}
      <div className="ha-points" id="ha-points">
        <button type="button" data-c="haut" aria-label="Aller en haut de la page" />
        <button type="button" data-c="ha-acte1" aria-label="Aller à l'acte Le test" />
        <button type="button" data-c="ha-acte48" aria-label="Aller à l'acte 48 nuances" />
        <button type="button" data-c="ha-monde" aria-label="Aller à l'acte Vous comprendre ensemble" />
        <button type="button" data-c="ha-espace" aria-label="Aller à l'acte Un espace rien qu'à toi" />
        <button type="button" data-c="ha-final" aria-label="Aller au bandeau final" />
      </div>

      {/* ACTE 01 : LE TEST — ses mérites + les preuves de sérieux */}
      <section id="ha-acte1">
        <div className="acte dissout">
          <div className="pin-grid">
            <h2>Et si un test,<br />te ressemblait enfin ?</h2>
            <div className="argument">
              <div className="ligne" data-anim="left" data-delay="150"><div>Dix minutes de sincérité, et tu obtiens un portrait qui te lit : ta façon d&apos;<b>aimer</b>, de <b>travailler</b>, d&apos;<b>évoluer</b>.</div></div>
              <div className="ligne" data-anim="left" data-delay="350"><div>Chaque trait est <b>mesuré</b>, pas déduit : tes réponses dessinent ton spectre exact sur 4 axes, jusqu&apos;à ta variante précise parmi <b>48 profils</b>.</div></div>
              <div className="ligne" data-anim="left" data-delay="550"><div><b>Gratuit</b>, sans inscription : tu réponds, tu te découvres, et tu décides de la suite.</div></div>
            </div>
            <div className="visuel">
              <div className="grand-chiffre" id="ha-preuve"><span className="pct" data-cible="96">0</span><small> %</small></div>
              <div className="legende-visuel" style={{ textAlign: "center", maxWidth: 260 }}>des personnes se reconnaissent mot pour mot dans leur portrait.</div>
              <Link className="cta-ha cta-petit" href="/test">Faire le test</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ACTE 02 : LA PROFONDEUR (16 → 48 automatique) */}
      <section id="ha-acte48">
        <div className="acte" style={{ paddingTop: 90, paddingBottom: 30 }}>
          <div className="pin-grid">
            <h2><span id="ha-chiffre-titre" style={{ color: "rgb(82,178,137)" }}>16</span> nuances.<br />Pas 16 cases.</h2>
            <div className="argument">
              <div className="ligne" data-anim="left" data-delay="150"><div>Les autres tests s&apos;arrêtent à ton type. Nous, on continue : chaque type se décline en <b>3 variantes</b>, mesurées par tes réponses.</div></div>
              <div className="ligne" data-anim="left" data-delay="350"><div>Ta personnalité colore tout : ta façon d&apos;<b>aimer</b> et de t&apos;attacher, ta manière de <b>travailler</b> et de décider, le chemin qui te fait <b>grandir</b>.</div></div>
              <div className="ligne" data-anim="left" data-delay="550"><div>Explore les 48 personnalités, découvre comment chacune aime, travaille et évolue. Et trouve celle qui te ressemble.</div></div>
            </div>
            <div className="visuel">
              <div className="grand-chiffre"><span id="ha-grand-chiffre">16</span><small> profils</small></div>
              <Link className="cta-ha cta-petit" href="/types-de-personnalite" data-anim="up" data-delay="1400">Explorer les 48 profils</Link>
            </div>
          </div>

          {/* Le défilé des 16 types : même écran que « 48 nuances », même largeur que le contenu */}
          <div className="defile" aria-hidden>
            <div className="rangee-defile">
              {[...TYPES, ...TYPES].map((c, i) => (
                <a className={`embleme-defile e${(i % 3) + 1}`} key={i} href={`/types-de-personnalite/${c.toLowerCase()}`}>{c}</a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ACTE 03 : ET NOUS DEUX — LE MONDE VERT */}
      <section className="monde" id="ha-monde">
        <div style={{ maxWidth: 768, margin: "0 auto" }}>
          <div className="exclu" data-anim="tampon" data-delay="250">Exclusivité</div>
          <h2>Vous comprendre,<br />ensemble.</h2>
        </div>
        <div className="duo-bloc" id="ha-duo">
          <div className="duo-texte" data-anim="up" data-delay="150">
            <h3>Le parcours à deux</h3>
            <p>Invite ton ou ta partenaire, ou décris-le en deux minutes. Vos deux profils se croisent,
              et un parcours se construit sur ce que vous êtes vraiment tous les deux : ce qui vous lie,
              ce qui frotte, et comment avancer ensemble.</p>
          </div>
          <div className="duo-visuel">
            <div
              id="ha-lottie"
              aria-hidden
              style={{ width: "100%", flex: "1 1 0", minHeight: 0, filter: "brightness(0) invert(1)" }}
              dangerouslySetInnerHTML={{
                __html: `<dotlottie-player src="https://assets-v2.lottiefiles.com/a/a2d8642e-7d84-11ee-80ad-83c0c7abc845/czY6bDg0Wt.lottie" autoplay loop style="width:100%;height:100%;transform:translateY(-26px) scale(1.9) rotate(-45deg);transform-origin:center"></dotlottie-player>`,
              }}
            />
            <Link className="cta-ha cta-blanc" data-anim="up" data-delay="450" href="/profil?onglet=relations">Découvrir le parcours à deux</Link>
          </div>
        </div>
      </section>

      {/* ACTE 04 : L'ESPACE PERSONNEL */}
      <section id="ha-espace">
        <div className="acte dissout">
          <div>
            <h2>Un espace,<br />rien qu&apos;à <span style={{ color: "rgb(82,178,137)" }}>toi</span>.</h2>
          </div>
          <div className="espace">
            <Link className="carte-espace" data-anim="pop" data-delay="150" href="/profil">
              <div className="anneau"><svg viewBox="0 0 52 52"><circle className="fond-a" cx="26" cy="26" r="22" fill="none" strokeWidth="8" /><circle className="prog" cx="26" cy="26" r="22" fill="none" strokeWidth="8" data-pct="18" /></svg><span className="num-anneau"><span className="num" data-cible="18">0</span><small>%</small></span></div>
              <h4>Mes profils</h4>
              <p>Tes <b>résultats</b>, réunis et conservés pour toujours.</p>
            </Link>
            <Link className="carte-espace" data-anim="pop" data-delay="300" href="/profil?onglet=relations">
              <div className="anneau"><svg viewBox="0 0 52 52"><circle className="fond-a" cx="26" cy="26" r="22" fill="none" strokeWidth="8" /><circle className="prog" cx="26" cy="26" r="22" fill="none" strokeWidth="8" data-pct="34" /></svg><span className="num-anneau"><span className="num" data-cible="34">0</span><small>%</small></span></div>
              <h4>Mes relations</h4>
              <p>Votre <b>quête à deux</b>, construite sur vos deux profils.</p>
            </Link>
            <Link className="carte-espace" data-anim="pop" data-delay="450" href="/profil">
              <div className="anneau"><svg viewBox="0 0 52 52"><circle className="fond-a" cx="26" cy="26" r="22" fill="none" strokeWidth="8" /><circle className="prog" cx="26" cy="26" r="22" fill="none" strokeWidth="8" data-pct="62" /></svg><span className="num-anneau"><span className="num" data-cible="62">0</span><small>%</small></span></div>
              <h4>Mon équilibre</h4>
              <p>Te <b>comprendre</b>, t&apos;<b>apaiser</b>, avancer. Pas à pas.</p>
            </Link>
          </div>
          <div style={{ textAlign: "left", marginTop: 40 }}>
            <Link className="cta-ha cta-petit" href="/profil">Découvrir mon espace</Link>
          </div>
        </div>
      </section>

      {/* FINAL : BANDEAU VERT */}
      <section className="final-ha" id="ha-final">
        <div data-anim="up">
          <h2>Comprendre qui tu es vraiment.</h2>
          <p>Pas une étiquette de plus. Un point de départ.</p>
          <Link className="cta-ha" href="/test">Faire le test</Link>
          <div className="microligne"><b>Gratuit</b> · 10 minutes · 48 profils possibles</div>
        </div>
      </section>

      {/* Bouton remonter, centré sous le bandeau vert */}
      <button className="ha-btn-haut" id="ha-btn-haut" type="button" aria-label="Remonter en haut de la page">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19V5" /><path d="m5 12 7-7 7 7" />
        </svg>
      </button>
    </div>
  );
}
