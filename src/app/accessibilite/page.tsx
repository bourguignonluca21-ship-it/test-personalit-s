import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accessibilité",
  description: "Notre engagement en matière d'accessibilité.",
};

export default function AccessibilitePage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-14">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Accessibilité</h1>
      <div className="text-gray-600 space-y-4 leading-relaxed text-sm">
        <p>
          Emplacement réservé. À couvrir : niveau de conformité visé (ex. RGAA / WCAG), points
          d&apos;attention (contrastes, navigation clavier, lecteurs d&apos;écran), et moyen de
          signaler un problème d&apos;accessibilité.
        </p>
      </div>
    </div>
  );
}
