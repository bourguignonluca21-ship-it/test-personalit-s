import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nous contacter",
  description: "Une question ? Contacte-nous ou consulte la FAQ.",
};

const FAQ = [
  {
    q: "Le test est-il vraiment gratuit ?",
    a: "Oui. Le test, ton type et un résumé court sont gratuits. Seul le rapport complet est payant.",
  },
  {
    q: "Est-ce un diagnostic ?",
    a: "Non. C'est un outil de découverte de soi ludique, pas une évaluation clinique ou médicale.",
  },
  {
    q: "Mes données sont-elles protégées ?",
    a: "Oui, conformément au RGPD : collecte minimale, consentement, et droit à la suppression.",
  },
];

export default function ContactPage() {
  return (
    <div className="bg-white">
      <section className="text-center pt-12 pb-8 px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Nous contacter</h1>
        <p className="text-gray-500">On te répond avec plaisir.</p>
      </section>

      <section className="max-w-xl mx-auto px-6 pb-12">
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Ton nom"
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#4298b4]"
          />
          <input
            type="email"
            placeholder="Ton email"
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#4298b4]"
          />
          <textarea
            placeholder="Ton message"
            rows={5}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#4298b4]"
          />
          <button
            type="button"
            className="bg-[#4298b4] text-white font-semibold py-3 px-8 rounded-full text-sm hover:bg-[#367f9a] transition-colors"
          >
            Envoyer
          </button>
          <p className="text-xs text-gray-400">Formulaire de démonstration (non connecté).</p>
        </form>
      </section>

      <section id="faq" className="max-w-2xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Questions fréquentes</h2>
        <div className="space-y-4">
          {FAQ.map((item) => (
            <div key={item.q} className="border border-gray-100 rounded-lg p-5">
              <h3 className="font-semibold text-gray-800 mb-1">{item.q}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
