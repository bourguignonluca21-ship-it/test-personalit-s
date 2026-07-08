import Link from "next/link";

/*
 * Bloc « bento » de l'accueil : une grille de cartes qui montre TOUS les
 * piliers d'un coup (rien de caché). Grande carte verte = le test + l'IA
 * (pilier phare), petites cartes = parcours à deux, développement perso,
 * autres tests.
 * ⚠️ Textes des petites cartes = placeholders, à ajuster.
 */

const VERT = "rgba(51,164,116,0.75)";
const VERT_CLAIR = "rgba(51,164,116,0.12)";
const INK = "rgba(0,0,0,0.8)";
const VERT_TEXTE = "rgba(51,164,116,0.95)";

function Fleche() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="transition-transform group-hover:translate-x-0.5"
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

function Carte({
  href,
  titre,
  desc,
  className = "",
}: {
  href: string;
  titre: string;
  desc: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group flex h-full flex-col justify-between rounded-3xl p-7 md:p-8 text-left transition-shadow hover:shadow-sm ${className}`}
      style={{ background: VERT_CLAIR }}
    >
      <div>
        <h3 className="text-2xl font-bold" style={{ color: INK }}>
          {titre}
        </h3>
        <p className="mt-2 text-[15px] leading-relaxed text-gray-600">{desc}</p>
      </div>
      <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold" style={{ color: VERT_TEXTE }}>
        Découvrir
        <Fleche />
      </span>
    </Link>
  );
}

export default function BentoAccueil() {
  return (
    <section className="mx-[10px] md:mx-[15px]">
      <div className="grid gap-4 md:grid-cols-3">
        {/* Grande carte : le test + l'IA (pilier phare) */}
        <div
          className="flex flex-col items-center justify-center rounded-3xl text-white px-8 py-16 md:px-10 text-center md:col-span-2 md:row-span-2"
          style={{ background: VERT }}
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.1] max-w-xl">
            Une lecture de toi d&apos;une finesse inédite.
          </h2>
          <p className="mt-6 text-lg text-white/80 max-w-md leading-relaxed">
            Là où les autres donnent une étiquette, l&apos;IA dessine toute ta nuance.
          </p>
          <div className="mt-9">
            <Link
              href="/test"
              className="inline-block bg-white font-semibold py-3.5 px-9 rounded-full text-lg transition-transform duration-300 hover:scale-105"
              style={{ color: VERT_TEXTE }}
            >
              Faire le test
            </Link>
          </div>
        </div>

        {/* Parcours à deux */}
        <Carte
          href="/profil?onglet=relations"
          titre="Parcours à deux"
          desc="Comprenez ce qui se joue entre vous, à partir de vos deux profils."
        />

        {/* Développement personnel */}
        <Carte
          href="/profil?onglet=developpement"
          titre="Développement personnel"
          desc="Avance sur ce qui compte vraiment, à ton rythme."
        />

        {/* Les autres tests (pleine largeur en bas) */}
        <Carte
          href="/profil?onglet=profils"
          titre="Les autres tests"
          desc="Ton côté sombre, ta logique, ton bonheur : découvre-toi sous tous les angles."
          className="md:col-span-3"
        />
      </div>
    </section>
  );
}
