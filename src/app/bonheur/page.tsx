import type { Metadata } from "next";
import MeshGradient from "../components/MeshGradient";

const VERT = "rgba(51,164,116,0.85)";
const INK = "rgba(0,0,0,0.75)";

export const metadata: Metadata = {
  title: "Test de bonheur",
  description: "Où en es-tu, vraiment ?",
};

/*
 * Page de présentation du Test de bonheur.
 * Le test lui-même n'est pas encore construit : le bouton « Faire le test »
 * est visuel pour l'instant (à brancher quand le test existera).
 * Libellés repris de la carte « Test de bonheur » de la galerie /profil.
 */
export default function BonheurPage() {
  return (
    <div>
      <section className="relative overflow-hidden text-center px-6 pt-24 md:pt-28 pb-16 min-h-[420px]">
        <MeshGradient />
        <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: VERT }}>
          Test de bonheur
        </p>
        <h1
          className="mt-3 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]"
          style={{ color: INK }}
        >
          Où en es-tu, vraiment ?
        </h1>
        <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto mt-7 leading-relaxed">
          Fais le point sur ce qui te nourrit, ce qui te pèse, et ce qui te
          manque pour te sentir bien.
        </p>
        <div className="mt-9">
          <span
            className="inline-block rounded-full px-7 py-3 text-base font-semibold text-white"
            style={{ background: VERT }}
          >
            Faire le test
          </span>
        </div>
      </section>
    </div>
  );
}
