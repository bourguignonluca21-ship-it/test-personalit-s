import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Comment tes données sont collectées et protégées (RGPD).",
};

export default function ConfidentialitePage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-14">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Politique de confidentialité</h1>
      <p className="text-sm text-gray-400 mb-8">Conforme RGPD — à compléter.</p>
      <div className="text-gray-600 space-y-4 leading-relaxed text-sm">
        <p>
          Emplacement réservé. À couvrir : données collectées (minimales), finalités, base légale,
          consentement, durée de conservation, partage, et droits (accès, rectification, suppression).
        </p>
        <p>
          Transparence IA (AI Act) : l&apos;usage de l&apos;IA pour présenter les résultats est
          affiché clairement dès le point d&apos;interaction.
        </p>
      </div>
    </div>
  );
}
