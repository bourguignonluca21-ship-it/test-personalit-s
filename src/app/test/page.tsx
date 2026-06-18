import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const placeholderQuestions = [
  "Vous vous faites fréquemment de nouveaux amis.",
  "Les idées complexes et novatrices vous enthousiasment plus que les idées simples et directes.",
  "Vous vous laissez en général plus facilement convaincre par des émotions qui vous touchent que par des arguments factuels.",
  "Vos espaces de vie et de travail sont propres et organisés.",
  "Vous restez généralement calme, même sous une forte pression.",
  "Vous trouvez l'idée de réseauter ou de vous promouvoir auprès d'étrangers très intimidante.",
  "Vous préférez avoir un plan précis plutôt qu'improviser au jour le jour.",
];

const steps = [
  {
    step: "ÉTAPE 1",
    title: "Compléter le test",
    description: "Soyez vous-même et répondez en toute sincérité pour découvrir votre type de personnalité.",
  },
  {
    step: "ÉTAPE 2",
    title: "Afficher les résultats détaillés",
    description: "Découvrez comment votre type de personnalité influence de nombreux aspects de votre vie.",
  },
  {
    step: "ÉTAPE 3",
    title: "Libérez votre potentiel",
    description: "Devenez la personne que vous voulez être à l'aide de nos ressources premium.",
  },
];

export default function TestPage() {
  return (
    <>
      <Navbar />

      {/* Header */}
      <section className="text-center py-12 px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Test de personnalité gratuit
        </h1>
        <p className="text-gray-500">Découvrez votre type en 10 minutes</p>
      </section>

      {/* 3 étapes */}
      <section className="max-w-4xl mx-auto px-6 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s) => (
            <div key={s.step} className="border border-gray-200 rounded-lg p-6 text-center">
              <span className="inline-block text-xs font-semibold text-white bg-[#4298b4] px-3 py-1 rounded-full mb-3">
                {s.step}
              </span>
              <h3 className="font-semibold text-gray-800 mb-2">{s.title}</h3>
              <p className="text-sm text-gray-500">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Questions */}
      <section className="max-w-3xl mx-auto px-6 mb-12">
        {placeholderQuestions.map((q, i) => (
          <div key={i} className="py-6 border-t border-gray-200">
            <p className="font-medium text-gray-800 mb-4">{q}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#4298b4] font-medium">D&apos;accord</span>
              <div className="flex gap-3">
                {[1, 2, 3, 4, 5, 6, 7].map((v) => (
                  <button
                    key={v}
                    className="w-9 h-9 rounded-full border-2 border-gray-300 hover:border-[#4298b4] transition-colors"
                  />
                ))}
              </div>
              <span className="text-sm text-gray-400">En désaccord</span>
            </div>
          </div>
        ))}
      </section>

      {/* Bouton suivant */}
      <section className="max-w-3xl mx-auto px-6 mb-16">
        <button className="bg-[#4298b4] text-white font-semibold py-3 px-8 rounded-full hover:bg-[#367f9a] transition-colors">
          Suivant →
        </button>
      </section>

      <Footer />
    </>
  );
}
