import type { Metadata } from "next";
import Link from "next/link";
import MeshGradient from "../../components/MeshGradient";

export const metadata: Metadata = {
  title: "Parcours seul",
  description: "Comprends tes schémas relationnels.",
  robots: { index: false },
};

const VERT = "rgba(51,164,116,0.85)";
const INK = "rgba(0,0,0,0.75)";

/*
 * PARCOURS RELATIONNEL SOLO — visuel de la page (liste des modules).
 * Structure réelle (3 actes, modules courts, un seul débloqué à la fois,
 * cf. VISION_RELATIONS_PARCOURS.md) ; les TITRES et le déroulé sont un
 * ÉCHANTILLON pour poser le visuel — les briques réelles (et leur
 * personnalisation par profil) viendront avec le chantier contenu.
 */
const ACTES: {
  numero: number;
  titre: string;
  sousLigne: string;
  modules: { n: number; titre: string; duree: string; etat: "fait" | "en-cours" | "verrouille" }[];
}[] = [
  {
    numero: 1,
    titre: "Te voir clairement",
    sousLigne: "Ton fonctionnement en relation, posé noir sur blanc.",
    modules: [
      { n: 1, titre: "Ce dont tu as besoin dans un lien", duree: "7 min", etat: "en-cours" },
      { n: 2, titre: "Ce qui te fait fuir", duree: "6 min", etat: "verrouille" },
      { n: 3, titre: "Tes réflexes sous stress", duree: "8 min", etat: "verrouille" },
    ],
  },
  {
    numero: 2,
    titre: "Tes schémas",
    sousLigne: "Ce qui se répète, et pourquoi.",
    modules: [
      { n: 4, titre: "Ton style d'attachement", duree: "10 min", etat: "verrouille" },
      { n: 5, titre: "Le rôle que tu prends toujours", duree: "8 min", etat: "verrouille" },
      { n: 6, titre: "Tes déclencheurs", duree: "7 min", etat: "verrouille" },
      { n: 7, titre: "Ce qui se répète", duree: "9 min", etat: "verrouille" },
    ],
  },
  {
    numero: 3,
    titre: "Faire évoluer",
    sousLigne: "Un levier à la fois, dans la vraie vie.",
    modules: [
      { n: 8, titre: "Poser une limite sans culpabiliser", duree: "8 min", etat: "verrouille" },
      { n: 9, titre: "Dire ce dont tu as besoin", duree: "7 min", etat: "verrouille" },
      { n: 10, titre: "Choisir autrement", duree: "8 min", etat: "verrouille" },
      { n: 11, titre: "Tenir dans la durée", duree: "6 min", etat: "verrouille" },
      { n: 12, titre: "Là où tu en es", duree: "5 min", etat: "verrouille" },
    ],
  },
];

function IconeEtat({ etat }: { etat: "fait" | "en-cours" | "verrouille" }) {
  if (etat === "fait") {
    return (
      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full" style={{ background: VERT }}>
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#fff" strokeWidth="2.5">
          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    );
  }
  if (etat === "en-cours") {
    return (
      <span
        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full"
        style={{ border: `2px solid ${VERT}` }}
      >
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: VERT }} />
      </span>
    );
  }
  return (
    <span
      className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full"
      style={{ background: "rgba(0,0,0,0.05)" }}
    >
      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="rgba(0,0,0,0.35)" strokeWidth="2.2">
        <rect x="5" y="11" width="14" height="9" rx="2" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      </svg>
    </span>
  );
}

export default function ParcoursSeulPage() {
  return (
    <div>
      {/* Héros (même squelette que le reste du site) */}
      <section className="relative overflow-hidden text-center px-6 pt-24 md:pt-28 pb-16">
        <MeshGradient />
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] min-h-[1.2em]"
          style={{ color: INK }}
        >
          Comprends tes schémas
        </h1>
        <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto mt-7 leading-relaxed min-h-[3.25em]">
          Un parcours construit sur ton profil. Un module à la fois, à ton
          rythme : le suivant s&apos;ouvre quand tu as fini le précédent.
        </p>
      </section>

      {/* Les 3 actes et leurs modules */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-3xl">
          {ACTES.map((acte) => (
            <div key={acte.numero} className="mb-12">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Acte {acte.numero}
              </p>
              <h2 className="mt-1 text-xl font-bold" style={{ color: INK }}>
                {acte.titre}
              </h2>
              <p className="mt-1 text-sm text-gray-500">{acte.sousLigne}</p>

              <div className="mt-5 flex flex-col gap-3">
                {acte.modules.map((m) => {
                  const contenu = (
                    <>
                      <IconeEtat etat={m.etat} />
                      <span className="flex-1 text-left">
                        <span
                          className="block text-sm font-semibold"
                          style={{ color: m.etat === "verrouille" ? "rgba(0,0,0,0.40)" : INK }}
                        >
                          {m.n}. {m.titre}
                        </span>
                      </span>
                      <span className="text-xs text-gray-400">{m.duree}</span>
                    </>
                  );
                  return m.etat === "en-cours" ? (
                    <Link
                      key={m.n}
                      href="/relations/seul/module-1"
                      className="flex items-center gap-4 rounded-2xl border bg-white p-4 shadow-sm transition-all hover:shadow-md hover:scale-[1.01]"
                      style={{ borderColor: VERT }}
                    >
                      {contenu}
                    </Link>
                  ) : (
                    <div
                      key={m.n}
                      className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white/60 p-4"
                    >
                      {contenu}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
