import Navbar from "../components/Navbar";

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
    color: "bg-[#4298b4]",
    bgCard: "bg-[#eef7fa]",
  },
  {
    step: "ÉTAPE 2",
    title: "Afficher les résultats détaillés",
    description: "Découvrez comment votre type de personnalité influence de nombreux aspects de votre vie.",
    color: "bg-[#33a474]",
    bgCard: "bg-[#eef8f3]",
  },
  {
    step: "ÉTAPE 3",
    title: "Libérez votre potentiel",
    description: "Devenez la personne que vous voulez être à l'aide de nos ressources premium.",
    color: "bg-[#88619a]",
    bgCard: "bg-[#f5eff8]",
  },
];

const footerColumns = [
  {
    title: "Products",
    links: ["Premium Career Suite", "Team Assessments", "Reports for Professionals", "Testimonials"],
  },
  {
    title: "Resources",
    links: ["Personality Test", "Personality Types", "Articles", "Our Framework", "Country Profiles"],
  },
  {
    title: "Help",
    links: ["Contact Us", "FAQ", "Report an Issue", "Your Orders", "Change Language"],
  },
  {
    title: "Our Other Creations",
    links: ["NPQE®", "MindTrackers®", "Leadership by 16Personalities", "Grow with 16Personalities"],
  },
];

export default function TestPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Header */}
      <section className="text-center pt-10 pb-6 px-6">
        <div className="text-[#4298b4] text-4xl mb-4">✦</div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-1">
          Test de personnalité gratuit
        </h1>
        <p className="text-gray-400 text-sm italic">NERIS Type Explorer®</p>
      </section>

      {/* 3 étapes */}
      <section className="max-w-3xl mx-auto px-6 mb-10">
        <div className="grid grid-cols-3 gap-4">
          {steps.map((s) => (
            <div key={s.step} className={`${s.bgCard} rounded-xl p-5 flex flex-col`}>
              <span className={`inline-block self-start text-[10px] font-bold text-white ${s.color} px-2.5 py-1 rounded mb-3 uppercase tracking-wider`}>
                {s.step}
              </span>
              <h3 className="font-bold text-gray-800 text-sm mb-2 leading-snug">{s.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Questions */}
      <section className="max-w-3xl mx-auto px-6 mb-8 w-full">
        {placeholderQuestions.map((q, i) => (
          <div key={i} className={`py-7 ${i > 0 ? "border-t border-gray-100" : ""}`}>
            <p className={`text-[15px] mb-5 leading-relaxed ${i === 0 ? "font-semibold text-gray-800" : "text-gray-400"}`}>
              {q}
            </p>
            <div className="flex items-center gap-0">
              <span className={`text-xs font-medium mr-4 min-w-[55px] ${i === 0 ? "text-[#4298b4]" : "text-gray-300"}`}>
                D&apos;accord
              </span>
              <div className="flex gap-2.5 flex-1 justify-center">
                {[1, 2, 3, 4, 5, 6, 7].map((v) => {
                  const size = v === 1 || v === 7
                    ? "w-10 h-10"
                    : v === 2 || v === 6
                      ? "w-9 h-9"
                      : v === 3 || v === 5
                        ? "w-8 h-8"
                        : "w-7 h-7";
                  return (
                    <button
                      key={v}
                      className={`${size} rounded-full border-2 ${i === 0 ? "border-gray-300 hover:border-[#4298b4]" : "border-gray-200"} transition-colors flex-shrink-0`}
                    />
                  );
                })}
              </div>
              <span className={`text-xs ml-4 min-w-[75px] text-right ${i === 0 ? "text-gray-400" : "text-gray-300"}`}>
                En désaccord
              </span>
            </div>
          </div>
        ))}
      </section>

      {/* Bouton suivant */}
      <section className="max-w-3xl mx-auto px-6 mb-16">
        <button className="bg-[#4298b4] text-white font-semibold py-3 px-7 rounded-full text-sm hover:bg-[#367f9a] transition-colors">
          Suivant →
        </button>
      </section>

      {/* Section sociale */}
      <section className="bg-gradient-to-b from-gray-50 to-gray-100 py-10 text-center">
        <p className="text-2xl font-bold text-gray-700 mb-4">5M</p>
        <div className="flex justify-center gap-3">
          {["●", "✕", "●", "✉", "⊞"].map((icon, i) => (
            <div key={i} className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 text-sm bg-white">
              {icon}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="font-semibold text-gray-800 text-sm mb-3">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-xs text-[#4298b4] hover:underline">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-5xl mx-auto border-t border-gray-100 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-xs text-gray-400 mb-3 md:mb-0">
            <p>©2011-2026 NERIS Analytics Limited</p>
            <div className="flex gap-4 mt-1">
              <a href="#" className="text-[#4298b4] hover:underline">Terms &amp; Conditions</a>
              <a href="#" className="text-[#4298b4] hover:underline">Privacy Policy</a>
              <a href="#" className="text-[#4298b4] hover:underline">Accessibility</a>
            </div>
          </div>
          <div className="flex gap-3">
            {["≡", "●", "◎", "✕", "⊞"].map((icon, i) => (
              <div key={i} className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 text-xs">
                {icon}
              </div>
            ))}
          </div>
        </div>
        <p className="max-w-5xl mx-auto text-[10px] text-gray-300 mt-4">
          Our content is available in multiple languages through both human and AI-assisted translation. While we strive for accuracy, the English version remains the official text.
        </p>
      </footer>
    </div>
  );
}
