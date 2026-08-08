"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CouronnePremium from "./CouronnePremium";
import IconeMenu from "./IconeMenu";
import FenetreConnexion from "./FenetreConnexion";
import { createClient } from "../lib/supabase/client";

/* Les 4 tests, regroupés sous l'entrée « Tests » (menu déroulant) pour que la
   navbar ne grossisse pas quand on en ajoute. Libellés repris de la galerie
   /profil. Logique et Bonheur ont une page de présentation (le test lui-même
   viendra plus tard). */
const TESTS = [
  { href: "/test", label: "Personnalitées", navLabel: "Test de personnalité", menuLabel: "Test de personnalité" },
  { href: "/dark-personnalite", label: "Dark", navLabel: "Dark personnalité", menuLabel: "Test ton côté sombre" },
  { href: "/logique", label: "Logique", navLabel: "Test de logique", menuLabel: "Test de raisonnement" },
  { href: "/bonheur", label: "Bonheur", navLabel: "Test de bonheur", menuLabel: "Test du bonheur" },
];

/* Le menu « Comprendre le fonctionnement » : le pôle savoir/marque. */
const COMPRENDRE = [
  { href: "/types-de-personnalite", label: "Les 48 personnalités", desc: "Les différents profils et leurs descriptions." },
  { href: "/personnalite-et-amour", label: "Personnalitées et vie amoureuse", desc: "Comment ta personnalité influence tes relations." },
  { href: "/developpement-personnel", label: "Développement personnel", desc: "Utiliser ta personnalité à ton avantage." },
  { href: "/notre-approche", label: "Notre approche", desc: "Notre vision de la personnalité, et ce qui la rend sérieuse." },
];

/* Le menu « Mon espace personnel » : raccourcis vers les onglets de /profil
   (le paramètre ?onglet= est lu par la page profil). */
const ESPACE: { href: string; label: string }[] = [];

function Pousse() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="15"
      height="15"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 20v-6" />
      <path d="M12 14c0-3.3 2.7-6 6-6 0 3.3-2.7 6-6 6z" />
      <path d="M12 14c0-2.5-2-4.5-4.5-4.5 0 2.5 2 4.5 4.5 4.5z" />
    </svg>
  );
}

/* Couronne à l'essai, à comparer avec la pousse. Réduite au strict : trois
   pointes et une base, sans joyaux — à 15 px, tout ornement devient une bavure.
   Pour revenir à la pousse : remplacer <Couronne /> par <Pousse /> plus bas. */
function Couronne() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="15"
      height="15"
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

type MenuId = "tests" | "decouvrir" | "espace";

export default function Navbar() {
  // Quel menu est ouvert (au survol), ou null.
  const [menu, setMenu] = useState<MenuId | null>(null);
  // Le menu AFFICHÉ dans l'extension : suit `menu`, mais reste affiché pendant
  // l'animation de fermeture (sinon le contenu disparaîtrait d'un coup).
  const [menuAffiche, setMenuAffiche] = useState<MenuId | null>(null);
  const [mobile, setMobile] = useState(false);
  const [connexionOuverte, setConnexionOuverte] = useState(false);
  const [survolPremium, setSurvolPremium] = useState(false);
  const [connecte, setConnecte] = useState(false);
  const pathname = usePathname();

  const testCourant = TESTS.find((t) => t.href === pathname) ?? TESTS[0];
  const defautComprendre = COMPRENDRE.find((c) => c.href === "/types-de-personnalite")!;
  const comprendreCourant = COMPRENDRE.find((c) => c.href === pathname) ?? defautComprendre;

  const sectionActive: MenuId | "premium" | null =
    TESTS.some((t) => t.href === pathname) ? "tests"
    : COMPRENDRE.some((c) => c.href === pathname) || pathname.startsWith("/types-de-personnalite/") ? "decouvrir"
    : pathname.startsWith("/profil") ? "espace"
    : pathname === "/suivi-premium" ? "premium"
    : null;

  // Le contenu affiché reste le temps de la fermeture (300 ms).
  useEffect(() => {
    if (menu) {
      setMenuAffiche(menu);
      return;
    }
    const t = window.setTimeout(() => setMenuAffiche(null), 300);
    return () => window.clearTimeout(t);
  }, [menu]);

  // Aligne le texte du menu sur le texte (centré) de sa colonne : on mesure la
  // position gauche du libellé du déclencheur (offsetLeft, insensible au zoom).
  const testTriggerRef = useRef<HTMLSpanElement>(null);
  const espaceTriggerRef = useRef<HTMLSpanElement>(null);
  const testCellRef = useRef<HTMLDivElement>(null);
  const menuCellRef = useRef<HTMLDivElement>(null);
  const menuBoutonRef = useRef<HTMLButtonElement>(null);
  const espaceCellRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLSpanElement>(null);
  const [padTests, setPadTests] = useState(16);
  // L'extension s'aligne désormais sur le bord DROIT du bouton de menu :
  // c'est de là qu'elle tombe. On mesure donc la distance au bord droit.
  const [padDroite, setPadDroite] = useState(24);
  const [padEspace, setPadEspace] = useState(16);
  useEffect(() => {
    // Position gauche EXACTE du texte du déclencheur dans la barre = position
    // de la colonne (offsetLeft de la cellule / nav) + décalage du texte dans
    // la colonne. Tout au layout (offsetLeft), insensible au zoom et à la vw.
    function mesurer() {
      // Position gauche à l'écran du texte du déclencheur (la nav démarre à x=0,
      // donc la coordonnée page = le padding gauche voulu pour l'extension).
      if (testTriggerRef.current) setPadTests(testTriggerRef.current.getBoundingClientRect().left);
      if (menuBoutonRef.current) {
        setPadDroite(window.innerWidth - menuBoutonRef.current.getBoundingClientRect().right);
      }
      if (espaceTriggerRef.current) setPadEspace(espaceTriggerRef.current.getBoundingClientRect().left);
    }
    mesurer();
    window.addEventListener("resize", mesurer);
    return () => window.removeEventListener("resize", mesurer);
  }, [testCourant, comprendreCourant]);

  // Transparence sur le héros de la home : la barre devient blanche au scroll.
  const [scrolle, setScrolle] = useState(false);
  useEffect(() => {
    const surScroll = () => setScrolle(window.scrollY > 24);
    surScroll();
    window.addEventListener("scroll", surScroll, { passive: true });
    return () => window.removeEventListener("scroll", surScroll);
  }, []);
  const transparente = pathname === "/" && !scrolle && !menu && !mobile;

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setConnecte(!!data.user));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setConnecte(!!session?.user);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const deconnexion = async () => {
    await createClient().auth.signOut();
    window.location.href = "/";
  };

  const reloadIfSame = (href: string) => (e: React.MouseEvent) => {
    if (pathname === href) {
      e.preventDefault();
      window.location.reload();
    }
  };

  // Le contenu du menu affiché : ses entrées, sa colonne (0-based) et l'offset
  // du texte dans la colonne. La marge gauche = colonne (20vw chacune) + offset.
  const contenu: { items: { href: string; label: string }[]; pad: number } | null =
    menuAffiche === "tests"
      ? {
          items: TESTS.map((t) => ({ href: t.href, label: t.menuLabel })),
          pad: padTests,
        }
      : menuAffiche === "espace"
        ? { items: ESPACE.map((e) => ({ href: e.href, label: e.label })), pad: padEspace }
        : menuAffiche === "decouvrir"
          ? {
              items: COMPRENDRE.map((c) => ({ href: c.href, label: c.label })),
              pad: 0,
            }
          : null;

  return (
    <>
      {/* Voile flou du site quand un menu est ouvert (barre + menu restent nets). */}
      <div
        className="fixed inset-x-0 bottom-0 top-[84px] z-40 transition-opacity duration-500 ease-in-out"
        style={{
          background: "rgba(255,255,255,0.45)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          opacity: menu ? 1 : 0,
          pointerEvents: "none",
        }}
      />
      <nav
        className={`sticky top-0 z-50 transition-colors duration-500 ${
          transparente
            ? "border-b border-transparent bg-transparent"
            : `border-b border-black/[0.03] ${menu ? "bg-white" : "bg-white/70 backdrop-blur-xl backdrop-saturate-150"}`
        }`}
      >
        {/* Desktop : la barre + son extension (le menu) partagent le fond de la
            barre. Survol géré sur tout le bloc pour pouvoir descendre dans le
            menu ; on quitte → tout se referme. */}
        <div className="hidden md:block" onMouseLeave={() => setMenu(null)}>
          {/* Rangée du haut : 4 colonnes égales (pleine largeur, donc logo et
              « Mon espace personnel » symétriques). Le drapeau flotte en absolu
              au coin droit sans décaler les colonnes. */}
          <div className="relative flex h-[84px] items-center text-[13px] text-gray-500">
            {/* 1. Logo (à gauche) */}
            <div className="flex h-full items-center pr-6" style={{ paddingLeft: 120 }} onMouseEnter={() => setMenu(null)}>
              <Link
                href="/"
                onClick={reloadIfSame("/")}
                className="group flex h-full items-center"
              >
                <span ref={logoRef} className="font-semibold text-[36px] tracking-tight text-black transition-transform duration-200 group-hover:scale-105">
                  Oikos
                </span>
              </Link>
            </div>

            {/* Les 3 menus : alignés sur la colonne de contenu du site (max-w-3xl),
                le premier au bord gauche, le dernier au bord droit. */}
            {/* Cette rangée est posée en absolu sur TOUTE la largeur : sans
                  pointer-events-none elle recouvrirait le logo et lui volerait
                  ses clics. Seuls ses enfants restent cliquables. */}
              <div className="pointer-events-none absolute inset-y-0 inset-x-0 flex items-stretch justify-end gap-6" style={{ paddingLeft: 340, paddingRight: 140 }}>
              {/* 3. Le bouton du test, puis le menu, collés l'un à l'autre
                  et calés sur le bord droit de la colonne. Le menu ferme la
                  marche ; « Faire le test » est juste à sa gauche. */}
              <div className="pointer-events-auto relative flex h-full items-center gap-6">
                <Link
                  href="/test"
                  onClick={reloadIfSame("/test")}
                  onMouseEnter={() => setMenu(null)}
                  className="whitespace-nowrap rounded-full px-6 py-2.5 text-[17px] font-semibold text-white transition-transform duration-200 hover:scale-105"
                  style={{ background: "var(--accent-page, rgba(51,164,116,0.85))" }}
                >
                  Faire le test
                </Link>
                <div
                  ref={menuCellRef}
                  className="flex h-full items-center"
                  onMouseEnter={() => setMenu("decouvrir")}
                >
                  <button
                    ref={menuBoutonRef}
                    type="button"
                    aria-label="Menu"
                    aria-expanded={menu === "decouvrir"}
                    onClick={() => setMenu(menu === "decouvrir" ? null : "decouvrir")}
                    className="flex items-center justify-center cursor-pointer"
                  >
                    <IconeMenu anime={menu === "decouvrir"} />
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Extension : toute la barre s'agrandit vers le bas (façon Apple).
              Hauteur animée via grid-template-rows 0fr ↔ 1fr. Le fond vient de
              la barre (nav), donc c'est bien la barre qui descend. */}
          <div
            className="grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out"
            style={{ gridTemplateRows: menu ? "1fr" : "0fr" }}
          >
            <div className="overflow-hidden">
              {contenu && (
                <div
                  className="space-y-0.5 text-right"
                  style={{
                    paddingLeft: 12,
                    paddingRight: menuAffiche === "decouvrir" ? padDroite : contenu.pad,
                    paddingTop: 6,
                    paddingBottom: 16,
                  }}
                >
                  {contenu.items.map((it) => {
                    const actif = menuAffiche === sectionActive && (it.href === pathname || (it.href !== "/" && pathname.startsWith(it.href + "/")));
                    return (
                      <Link
                        key={it.href}
                        href={it.href}
                        onClick={reloadIfSame(it.href)}
                        className="group block py-1.5"
                      >
                        <span className="inline-block origin-right text-[16px] font-semibold tracking-tight transition-transform duration-200 group-hover:scale-[1.04]" style={{ color: actif ? "rgba(51,164,116,0.85)" : "rgba(0,0,0,0.8)" }}>
                          {it.label}
                        </span>
                      </Link>
                    );
                  })}
                  {/* « Suivi premium » a quitté la barre : il vit ici, avec
                      sa couronne. */}
                  {menuAffiche === "decouvrir" && (
                    <Link
                      href="/suivi-premium"
                      onClick={reloadIfSame("/suivi-premium")}
                      onMouseEnter={() => setSurvolPremium(true)}
                      onMouseLeave={() => setSurvolPremium(false)}
                      className="group block py-1.5"
                    >
                      <span
                        className="inline-flex origin-right items-center gap-2 text-[16px] font-semibold tracking-tight transition-transform duration-200 group-hover:scale-[1.04]"
                        style={{ color: sectionActive === "premium" ? "rgba(51,164,116,0.85)" : "rgba(0,0,0,0.8)" }}
                      >
                        <span style={{ color: "var(--accent-page, rgba(51,164,116,0.9))" }}>
                          <CouronnePremium anime={survolPremium} />
                        </span>
                        Suivi premium
                      </span>
                    </Link>
                  )}
                  {/* La connexion n'a plus d'icône à elle : elle vit ici. */}
                  {menuAffiche === "decouvrir" && (
                    <button
                      type="button"
                      onClick={() => {
                        if (connecte) deconnexion();
                        else setConnexionOuverte(true);
                      }}
                      className="group block w-full py-1.5 text-right cursor-pointer"
                    >
                      <span className="inline-block origin-right text-[16px] font-semibold tracking-tight transition-transform duration-200 group-hover:scale-[1.04]" style={{ color: "rgba(0,0,0,0.8)" }}>
                        {connecte ? "Se déconnecter" : "Se connecter"}
                      </span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile : logo + burger */}
        <div className="flex md:hidden items-center justify-between px-6 py-3.5">
          <Link
            href="/"
            onClick={reloadIfSame("/")}
            className="font-semibold text-[17px] tracking-tight"
          >
            <span className="text-black">Oikos</span>
          </Link>
          <button
            className="p-2"
            aria-label="Menu"
            aria-expanded={mobile}
            onClick={() => setMobile((v) => !v)}
          >
            <span className="block w-5 h-0.5 bg-gray-800 mb-1" />
            <span className="block w-5 h-0.5 bg-gray-800 mb-1" />
            <span className="block w-5 h-0.5 bg-gray-800" />
          </button>
        </div>

        {/* Menu mobile : mêmes pôles, à plat. */}
        {mobile && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 px-6 py-4 flex flex-col gap-3 text-sm text-gray-700 md:hidden">
            <Link
              href="/test"
              onClick={(e) => {
                setMobile(false);
                reloadIfSame("/test")(e);
              }}
              className="rounded-full px-4 py-2 text-center text-sm font-semibold text-white"
              style={{ background: "var(--accent-page, rgba(51,164,116,0.85))" }}
            >
              Faire le test
            </Link>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Explore-toi</p>
            {TESTS.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                onClick={(e) => {
                  setMobile(false);
                  reloadIfSame(t.href)(e);
                }}
                className="py-1 pl-3"
              >
                {t.label}
              </Link>
            ))}
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Mon espace</p>
            {ESPACE.map((e) => (
              <Link
                key={e.href}
                href={e.href}
                onClick={(ev) => {
                  setMobile(false);
                  reloadIfSame(e.href)(ev);
                }}
                className="py-1 pl-3"
              >
                {e.label}
              </Link>
            ))}
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">La personnalité, expliquée</p>
            {COMPRENDRE.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                onClick={(e) => {
                  setMobile(false);
                  reloadIfSame(c.href)(e);
                }}
                className="py-1 pl-3"
              >
                {c.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobile(false);
                if (connecte) deconnexion();
                else setConnexionOuverte(true);
              }}
              className="py-1 font-semibold text-left"
            >
              {connecte ? "Se déconnecter" : "Se connecter / Crée un compte"}
            </button>
          </div>
        )}

        <FenetreConnexion open={connexionOuverte} onClose={() => setConnexionOuverte(false)} />
      </nav>

      {/* Drapeau langue — fixé en bas à droite */}
      <span
        className="fixed z-50 w-8 h-8 rounded-full border border-gray-200 cursor-pointer"
        aria-label="Français"
        title="Français"
        style={{ bottom: 24, right: 24, background: "linear-gradient(90deg,#0055A4 33%,#fff 33% 66%,#EF4135 66%)" }}
      />
    </>
  );
}
