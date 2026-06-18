import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description: "Offres à venir pour les équipes et les professionnels.",
};

export default function EquipesPage() {
  return (
    <div className="bg-white">
      <section className="bg-[#33a474] text-white text-center py-16 px-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Services & équipes</h1>
        <p className="max-w-2xl mx-auto text-white/90">
          Des offres pensées pour les groupes et les professionnels — bientôt disponibles.
        </p>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-14 text-center">
        <p className="text-gray-600 leading-relaxed mb-6">
          Le périmètre B2B reste à confirmer dans le document fondateur. Cette page est un
          emplacement réservé : tu y décriras tes offres équipes, ateliers ou rapports
          professionnels quand le moment sera venu.
        </p>
        <span className="inline-block bg-[#eef8f3] text-[#33a474] text-sm font-semibold px-4 py-2 rounded-full">
          🔧 Contenu à définir
        </span>
      </section>
    </div>
  );
}
