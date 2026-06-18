import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pack carrière premium",
  description: "Le rapport complet : spectre détaillé, intensités, analyse fine et conversation IA.",
};

const FEATURES = [
  "Spectre détaillé en pourcentage sur chaque axe",
  "Niveaux d'intensité qui nuancent ton portrait",
  "Analyse approfondie présentée par IA",
  "Conversation avec une IA qui connaît ton profil",
  "Pistes carrière, relations et développement personnel",
];

export default function PremiumPage() {
  return (
    <div className="bg-white">
      <section className="bg-[#88619a] text-white text-center py-16 px-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Va au bout de ton profil</h1>
        <p className="max-w-2xl mx-auto text-white/90">
          Le test et le type sont gratuits. Le rapport complet, lui, dévoile toute la finesse de qui
          tu es.
        </p>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-14">
        <div className="rounded-2xl border border-gray-100 shadow-sm p-8">
          <p className="text-sm font-semibold text-[#88619a] uppercase tracking-wider mb-2">
            Rapport complet
          </p>
          <p className="text-4xl font-bold text-gray-800 mb-1">
            Quelques € <span className="text-base font-normal text-gray-400">/ à l&apos;unité</span>
          </p>
          <p className="text-gray-500 text-sm mb-6">
            Paiement à l&apos;unité ou via crédits — pas d&apos;abonnement imposé.
          </p>
          <ul className="space-y-3 mb-8">
            {FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2 text-gray-700">
                <span className="text-[#33a474] font-bold mt-0.5">✓</span>
                <span className="text-sm">{f}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/test"
            className="block text-center bg-[#88619a] text-white font-semibold py-3 rounded-full hover:opacity-90 transition-opacity"
          >
            Commencer par le test gratuit →
          </Link>
          <p className="text-xs text-gray-400 text-center mt-3">
            Prix exacts et tunnel de paiement : à définir (placeholder).
          </p>
        </div>
      </section>
    </div>
  );
}
