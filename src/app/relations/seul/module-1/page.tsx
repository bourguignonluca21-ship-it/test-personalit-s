import type { Metadata } from "next";
import Link from "next/link";
import MeshGradient from "../../../components/MeshGradient";

export const metadata: Metadata = {
  title: "Module 1 — Ce dont tu as besoin dans un lien",
  description: "Parcours relationnel, module 1.",
  robots: { index: false },
};

const VERT = "rgba(51,164,116,0.85)";
const INK = "rgba(0,0,0,0.75)";

/*
 * ÉCRAN D'UN MODULE (visuel) — les 3 temps validés :
 * 1. la LECTURE personnalisée, 2. l'EXERCICE d'introspection (réponse
 * écrite), 3. la MICRO-ACTION à tenter dans la vraie vie.
 * Le TEXTE est un ÉCHANTILLON (ton INFP, façon rapport) pour juger le
 * rendu — les briques réelles et l'enregistrement des réponses viendront.
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
            Ce dont tu as besoin dans un lien
          </h1>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-2xl">
          {/* 1. La lecture (personnalisée par le profil) */}
          <div className="prose-sm leading-relaxed text-gray-600">
            <p>
              Tout le monde n&apos;attend pas la même chose d&apos;une
              relation. Toi, tu ne cherches pas de la compagnie : tu cherches
              de la profondeur. Un lien qui reste en surface te laisse plus
              seul que la solitude elle-même, et c&apos;est pour ça que tu
              peux être entouré et te sentir vide, ou avec une seule personne
              et te sentir comblé.
            </p>
            <p className="mt-4">
              Ce besoin a une force : quand quelqu&apos;un entre vraiment dans
              ton monde, tu offres une qualité de présence rare. Et il a un
              revers : tu peux attendre de chaque lien qu&apos;il soit total,
              et t&apos;épuiser à chercher chez une personne ce qu&apos;aucune
              ne peut donner seule. Le voir, c&apos;est déjà commencer à
              choisir tes liens autrement.
            </p>
          </div>

          {/* 2. L'exercice d'introspection */}
          <div className="mt-10 rounded-2xl p-7" style={{ background: "rgba(51,164,116,0.06)" }}>
            <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: VERT }}>
              Ton exercice
            </p>
            <p className="mt-2 text-lg font-bold" style={{ color: INK }}>
              Pense aux deux relations qui t&apos;ont fait le plus de bien.
              Qu&apos;avaient-elles en commun ?
            </p>
            <textarea
              rows={5}
              placeholder="Écris librement, c'est pour toi…"
              className="mt-4 w-full rounded-2xl border bg-white p-4 text-sm leading-relaxed outline-none"
              style={{ borderColor: "rgba(0,0,0,0.12)", color: INK, resize: "vertical" }}
            />
          </div>

          {/* 3. La micro-action */}
          <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-7 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              Ta micro-action, avant le prochain module
            </p>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              Cette semaine, repère UN moment où un échange reste en surface
              alors que tu voudrais plus. Ne change rien, note juste ce que ça
              te fait. C&apos;est tout.
            </p>
          </div>

          {/* Valider le module (visuel seul pour l'instant) */}
          <button
            type="button"
            className="mt-10 w-full rounded-full px-6 py-3.5 text-base font-semibold text-white transition-transform hover:scale-[1.02] cursor-pointer"
            style={{ background: VERT }}
          >
            J&apos;ai terminé ce module
          </button>
          <p className="mt-3 text-center text-xs text-gray-400">
            Le module 2 s&apos;ouvrira juste après.
          </p>
        </div>
      </section>
    </div>
  );
}
