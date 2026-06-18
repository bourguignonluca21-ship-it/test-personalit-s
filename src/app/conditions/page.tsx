import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions générales",
  description: "Conditions générales d'utilisation.",
};

export default function ConditionsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-14">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Conditions générales</h1>
      <p className="text-sm text-gray-400 mb-8">Dernière mise à jour : à compléter.</p>
      <div className="prose prose-sm text-gray-600 space-y-4 leading-relaxed">
        <p>
          Emplacement réservé aux conditions générales d&apos;utilisation. À rédiger avec un cadre
          juridique (service de divertissement / découverte de soi, jamais présenté comme une
          évaluation clinique).
        </p>
        <p>
          Points à couvrir : objet du service, compte utilisateur, achats et crédits, propriété
          intellectuelle, limitation de responsabilité, droit applicable.
        </p>
      </div>
    </div>
  );
}
