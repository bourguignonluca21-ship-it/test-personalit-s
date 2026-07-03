import type { Metadata } from "next";
import MeshGradient from "../components/MeshGradient";
import CarteConnexion from "./CarteConnexion";
import ConstellationTests from "./ConstellationTests";

export const metadata: Metadata = {
  title: "Se connecter",
  description: "Accède à ton profil et retrouve tes résultats.",
};

/*
 * Page connexion / création de compte.
 * Héros IDENTIQUE à l'accueil : section à part (mêmes paddings), MeshGradient
 * derrière titre + sous-titre — le bloc au dégradé vert s'arrête donc sous le
 * sous-titre, comme en haut de la page d'accueil.
 * En dessous, sur blanc : la carte de connexion centrée, entourée sur grand
 * écran (xl) des 4 étapes flottantes du chemin (décor).
 */
export default function ConnexionPage() {
  return (
    /* PAS de bg-white ici : le MeshGradient est en -z-10, un fond sur ce
       conteneur passerait devant lui et le masquerait (piège rencontré). */
    <div>
      {/* Héros : même structure que Hero.tsx (accueil) */}
      <section className="relative overflow-hidden text-center px-6 pt-24 md:pt-28 pb-16">
        <MeshGradient />
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]"
          style={{ color: "rgba(0,0,0,0.75)" }}
        >
          Commence ton évolution
        </h1>
        <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto mt-7 leading-relaxed">
          Chaque test que tu passes enrichit ton profil. Des liens se dessinent
          entre eux, et t&apos;ouvrent un parcours qui te ressemble.
        </p>
        {/* Cale invisible : reproduit le bloc CTA de l'accueil (mt-10 + bouton)
            pour que le bandeau au dégradé fasse EXACTEMENT la même hauteur. */}
        <div aria-hidden className="invisible mt-10 flex items-center justify-center">
          <span className="inline-block py-3.5 px-9 text-lg font-semibold">
            Découvrir ma personnalité
          </span>
        </div>
      </section>

      {/* La carte centrée + les 4 étapes flottantes autour (xl et plus) */}
      <section className="px-6 pt-6 pb-20">
        <div className="relative mx-auto max-w-5xl">
          <ConstellationTests />
          <CarteConnexion />
        </div>
      </section>
    </div>
  );
}
