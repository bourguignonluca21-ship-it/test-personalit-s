import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Se connecter",
  description: "Accède à tes résultats et à ton historique.",
};

export default function ConnexionPage() {
  return (
    <div className="bg-white min-h-[70vh] grid place-items-center px-6 py-16">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">Se connecter</h1>
        <p className="text-sm text-gray-500 text-center mb-8">
          Retrouve tes résultats sauvegardés.
        </p>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[rgba(66,152,180,0.75)]"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[rgba(66,152,180,0.75)]"
          />
          <button
            type="button"
            className="w-full bg-[rgba(66,152,180,0.75)] text-white font-semibold py-3 rounded-full text-sm hover:bg-[#367f9a] transition-colors"
          >
            Connexion
          </button>
        </form>
        <p className="text-xs text-gray-400 text-center mt-4">
          Placeholder — l&apos;authentification sera gérée via Supabase.
        </p>
        <p className="text-sm text-center mt-6 text-gray-500">
          Pas encore de résultat ?{" "}
          <Link href="/test" className="text-[rgba(66,152,180,0.75)] font-semibold hover:underline">
            Faire le test
          </Link>
        </p>
      </div>
    </div>
  );
}
