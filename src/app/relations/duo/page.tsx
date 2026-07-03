import type { Metadata } from "next";
import MeshGradient from "../../components/MeshGradient";

export const metadata: Metadata = {
  title: "Parcours à deux",
  description: "Avancez ensemble, à partir de vos deux profils.",
  robots: { index: false },
};

/*
 * Parcours relationnel À DEUX — page d'atterrissage depuis la partie
 * Relations du profil. Version minimale, à construire
 * (cf. VISION_RELATIONS_PARCOURS.md : briques par écart d'axe, table liens).
 */
export default function ParcoursDuoPage() {
  return (
    <div>
      <section className="relative overflow-hidden text-center px-6 pt-24 md:pt-28 pb-16 min-h-[420px]">
        <MeshGradient />
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]"
          style={{ color: "rgba(0,0,0,0.75)" }}
        >
          Avancez ensemble
        </h1>
      </section>
    </div>
  );
}
