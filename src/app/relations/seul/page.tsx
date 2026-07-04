import type { Metadata } from "next";
import MeshGradient from "../../components/MeshGradient";
import CheminParcours from "./CheminParcours";

export const metadata: Metadata = {
  title: "Parcours seul",
  description: "Comprends tes schémas relationnels.",
  robots: { index: false },
};

const INK = "rgba(0,0,0,0.75)";

/*
 * PARCOURS RELATIONNEL SOLO — la page (accès direct par l'URL).
 * Le chemin de progression vit dans CheminParcours.tsx (partagé avec la
 * fenêtre ouverte depuis l'onglet Relations du profil).
 */
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
          Construit sur ton profil, module après module : tu vois comment tu
          aimes, tu comprends ce qui se répète, tu fais évoluer ce qui compte.
        </p>
      </section>

      {/* Le chemin de progression */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-2xl">
          <CheminParcours />
        </div>
      </section>
    </div>
  );
}
