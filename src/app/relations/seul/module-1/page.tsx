import type { Metadata } from "next";
import Link from "next/link";
import MeshGradient from "../../../components/MeshGradient";
import ContenuModule1 from "./ContenuModule1";

export const metadata: Metadata = {
  title: "Module 1 · Ce que tu cherches vraiment dans un lien",
  description: "Parcours relationnel, module 1.",
  robots: { index: false },
};

const VERT = "rgba(51,164,116,0.85)";
const INK = "rgba(0,0,0,0.75)";

/*
 * ÉCRAN D'UN MODULE — la page (accès direct par l'URL).
 * Le contenu vit dans ContenuModule1.tsx (partagé avec la fenêtre du
 * parcours ouverte depuis l'onglet Relations du profil).
 */
export default function Module1Page() {
  return (
    <div>
      <section className="relative overflow-hidden px-6 pt-16 pb-14">
        <MeshGradient />
        <div className="mx-auto max-w-2xl">
          {/* Fil d'ariane / retour */}
          <Link
            href="/relations/seul"
            className="inline-flex items-center gap-1.5 text-sm font-semibold"
            style={{ color: VERT }}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Ton parcours
          </Link>

          <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-gray-400">
            Acte 1 · Module 1 · 7 min
          </p>
          <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight leading-tight" style={{ color: INK }}>
            Ce que tu cherches vraiment dans un lien
          </h1>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-2xl">
          <ContenuModule1 />
        </div>
      </section>
    </div>
  );
}
