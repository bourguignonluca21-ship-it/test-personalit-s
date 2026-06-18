import Navbar from "../components/Navbar";

const groups = [
  {
    name: "Les analystes",
    bg: "bg-[#f3eef6]",
    titleColor: "text-[#88619a]",
    tagColor: "bg-[#88619a]",
    types: [
      { name: "Architecte", code: "INTJ-A / INTJ-T", desc: "Esprits imaginatifs et stratégiques, avec un plan pour tout." },
      { name: "Logicien", code: "INTP-A / INTP-T", desc: "Inventeurs innovants avec une soif de connaissances insatiable." },
      { name: "Commandant", code: "ENTJ-A / ENTJ-T", desc: "Des dirigeants audacieux, imaginatifs et dotés de volonté, qui trouvent toujours un moyen… ou le créent." },
      { name: "Innovateur", code: "ENTP-A / ENTP-T", desc: "Esprits astucieux et curieux, incapables de résister à un défi intellectuel." },
    ],
  },
  {
    name: "Les diplomates",
    bg: "bg-[#eef8f3]",
    titleColor: "text-[#33a474]",
    tagColor: "bg-[#33a474]",
    types: [
      { name: "Avocat", code: "INFJ-A / INFJ-T", desc: "Discrets et mystiques, ils sont pourtant source d'inspiration et d'infatigables idéalistes." },
      { name: "Médiateur", code: "INFP-A / INFP-T", desc: "Personnes poétiques, bienveillantes et altruistes, toujours prêtes à aider une bonne cause." },
      { name: "Protagoniste", code: "ENFJ-A / ENFJ-T", desc: "Des leaders charismatiques et inspirants, capables de captiver leur public." },
      { name: "Inspirateur", code: "ENFP-A / ENFP-T", desc: "Esprits libres enthousiastes, créatifs et sociables, qui trouvent toujours une raison de sourire." },
    ],
  },
  {
    name: "Les sentinelles",
    bg: "bg-[#eef7fa]",
    titleColor: "text-[#4298b4]",
    tagColor: "bg-[#4298b4]",
    types: [
      { name: "Logisticien", code: "ISTJ-A / ISTJ-T", desc: "Personnes pragmatiques et attentives aux faits, sur lesquelles on peut s'appuyer en toute confiance." },
      { name: "Défenseur", code: "ISFJ-A / ISFJ-T", desc: "Protecteurs dévoués et chaleureux, toujours prêts à défendre leurs proches." },
      { name: "Directeur", code: "ESTJ-A / ESTJ-T", desc: "Excellents administrateurs, d'une efficacité inégalée quand il s'agit de gérer les situations… ou les gens." },
      { name: "Consul", code: "ESFJ-A / ESFJ-T", desc: "Personnes extraordinairement attentionnées, sociables et populaires, toujours prêtes à aider les autres." },
    ],
  },
  {
    name: "Les explorateurs",
    bg: "bg-[#fdf6e8]",
    titleColor: "text-[#e4ae3a]",
    tagColor: "bg-[#e4ae3a]",
    types: [
      { name: "Virtuose", code: "ISTP-A / ISTP-T", desc: "Expérimentateurs hardis et pragmatiques, maîtres de toute sorte d'outils." },
      { name: "Aventurier", code: "ISFP-A / ISFP-T", desc: "Artistes flexibles et charmants, toujours prêts à explorer et à vivre de nouvelles expériences." },
      { name: "Entrepreneur", code: "ESTP-A / ESTP-T", desc: "Personnes intelligentes, dynamiques et très perspicaces, qui aiment vivre sans se soucier du fil du rasoir." },
      { name: "Amuseur", code: "ESFP-A / ESFP-T", desc: "Personnes spontanées, dynamiques et enthousiastes… on ne s'ennuie jamais avec elles." },
    ],
  },
];

export default function TypesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Header */}
      <section className="text-center pt-10 pb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Types de personnalité</h1>
        <a href="/test" className="inline-block bg-[#4298b4] text-white text-sm font-semibold py-2.5 px-6 rounded-full hover:bg-[#367f9a] transition-colors">
          Passer le test →
        </a>
      </section>

      {/* Groupes */}
      {groups.map((group, gi) => (
        <section key={group.name} className={`${group.bg} py-14 px-6`}>
          <div className="max-w-4xl mx-auto">
            {/* Titre du groupe */}
            <h2 className={`text-4xl md:text-5xl font-bold ${group.titleColor} text-center mb-12 opacity-80 italic`}>
              {group.name}
            </h2>

            {/* Grille 2x2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {group.types.map((type) => (
                <a key={type.name} href="#" className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow block">
                  {/* Placeholder illustration */}
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-3xl text-gray-300">?</span>
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg mb-1">{type.name}</h3>
                  <p className={`text-xs font-semibold ${group.titleColor} mb-3 italic`}>{type.code}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{type.desc}</p>
                </a>
              ))}
            </div>

            {/* Bouton entre les groupes (sauf le dernier) */}
            {gi < groups.length - 1 && (
              <div className="text-center">
                <a href="/test" className={`inline-block ${group.tagColor} text-white text-sm font-semibold py-2.5 px-6 rounded-full hover:opacity-80 transition-opacity`}>
                  Passer le test →
                </a>
              </div>
            )}
          </div>
        </section>
      ))}

      {/* Bouton final */}
      <section className={`${groups[groups.length - 1].bg} pb-14 px-6`}>
        <div className="text-center">
          <a href="/test" className={`inline-block ${groups[groups.length - 1].tagColor} text-white text-sm font-semibold py-2.5 px-6 rounded-full hover:opacity-80 transition-opacity`}>
            Passer le test →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {[
            { title: "Products", links: ["Premium Career Suite", "Team Assessments", "Reports for Professionals", "Testimonials"] },
            { title: "Resources", links: ["Personality Test", "Personality Types", "Articles", "Our Framework", "Country Profiles"] },
            { title: "Help", links: ["Contact Us", "FAQ", "Report an Issue", "Your Orders", "Change Language"] },
            { title: "Our Other Creations", links: ["NPQE®", "MindTrackers®", "Leadership by 16Personalities", "Grow with 16Personalities"] },
          ].map((col) => (
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
          <div className="text-xs text-gray-400">
            <p>©2011-2026 NERIS Analytics Limited</p>
            <div className="flex gap-4 mt-1">
              <a href="#" className="text-[#4298b4] hover:underline">Terms &amp; Conditions</a>
              <a href="#" className="text-[#4298b4] hover:underline">Privacy Policy</a>
              <a href="#" className="text-[#4298b4] hover:underline">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
