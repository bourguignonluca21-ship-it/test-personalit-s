import Link from "next/link";
import type { Metadata } from "next";
import { ROLE_ORDER, ROLES, typesByRole } from "../data/types";

export const metadata: Metadata = {
  title: "Types de personnalité",
  description:
    "Les 16 types de personnalité regroupés en 4 rôles. Explore chaque type : forces, relations, carrière et plus.",
};

export default function TypesPage() {
  return (
    <div className="bg-white">
      {/* En-tête */}
      <section className="text-center pt-12 pb-8 px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Types de personnalité</h1>
        <p className="text-gray-500 max-w-2xl mx-auto mb-6">
          Quatre rôles, seize personnalités. Clique sur un type pour explorer son univers complet.
        </p>
        <Link
          href="/test"
          className="inline-block bg-[#4298b4] text-white text-sm font-semibold py-2.5 px-6 rounded-full hover:bg-[#367f9a] transition-colors"
        >
          Faire le test →
        </Link>
      </section>

      {/* Groupes de rôles */}
      {ROLE_ORDER.map((key) => {
        const role = ROLES[key];
        return (
          <section key={key} className="py-14 px-6" style={{ background: role.soft }}>
            <div className="max-w-4xl mx-auto">
              <h2
                className="text-4xl md:text-5xl font-bold text-center mb-10 italic opacity-80"
                style={{ color: role.color }}
              >
                {role.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {typesByRole(key).map((type) => (
                  <Link
                    key={type.slug}
                    href={`/types-de-personnalite/${type.slug}`}
                    className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow block border-t-4"
                    style={{ borderTopColor: role.color }}
                  >
                    <div
                      className="w-28 h-28 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl font-bold border-4 bg-white"
                      style={{ color: role.color, borderColor: role.color }}
                    >
                      {type.code}
                    </div>
                    <h3 className="font-bold text-gray-800 text-lg mb-1">{type.name}</h3>
                    <p className="text-xs font-semibold mb-3 italic" style={{ color: role.color }}>
                      {type.variants}
                    </p>
                    <p className="text-sm text-gray-500 leading-relaxed">{type.tagline}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
