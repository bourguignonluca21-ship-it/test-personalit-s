import Link from "next/link";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import { ROLE_ORDER, ROLES, typesByRole } from "./data/types";

const STEPS = [
  {
    step: "Étape 1",
    title: "Réponds au test",
    description: "Sois toi-même et réponds en toute sincérité pour découvrir ton type de personnalité.",
    color: "#4298b4",
  },
  {
    step: "Étape 2",
    title: "Découvre ton profil",
    description: "Un type identifiable + un spectre détaillé en pourcentage, analysé et présenté par IA.",
    color: "#33a474",
  },
  {
    step: "Étape 3",
    title: "Va plus loin",
    description: "Prolonge par une conversation avec une IA qui connaît ton profil, ou explore d'autres tests.",
    color: "#88619a",
  },
];

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />

      {/* Aperçu des types par rôle */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Découvre les 16 types</h2>
          <p className="text-gray-500 mb-12 max-w-2xl mx-auto">
            Quatre grands rôles, seize personnalités. Explore-les librement, avant ou après le test.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ROLE_ORDER.map((key) => {
              const role = ROLES[key];
              return (
                <div
                  key={key}
                  className="rounded-2xl p-6 text-left border border-gray-100"
                  style={{ background: role.soft }}
                >
                  <h3 className="text-xl font-bold mb-2" style={{ color: role.color }}>
                    {role.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">{role.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {typesByRole(key).map((t) => (
                      <Link
                        key={t.slug}
                        href={`/types-de-personnalite/${t.slug}`}
                        className="text-white text-xs font-semibold px-3 py-1.5 rounded-md hover:opacity-80 transition-opacity"
                        style={{ background: role.color }}
                      >
                        {t.name}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Comment ça marche</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STEPS.map((s) => (
              <div key={s.step} className="rounded-xl border border-gray-100 p-6">
                <span
                  className="inline-block text-[11px] font-bold text-white px-2.5 py-1 rounded mb-3 uppercase tracking-wider"
                  style={{ background: s.color }}
                >
                  {s.step}
                </span>
                <h3 className="font-bold text-gray-800 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-16 px-6 bg-gray-50 border-t border-gray-100">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
            Prêt à mieux te connaître ?
          </h2>
          <p className="text-gray-500 mb-8">10 minutes. Gratuit. Étonnamment précis.</p>
          <Link
            href="/test"
            className="inline-block bg-[#4298b4] text-white font-semibold py-3 px-8 rounded-full text-lg hover:bg-[#367f9a] transition-colors"
          >
            Faire le test →
          </Link>
        </div>
      </section>
    </>
  );
}
