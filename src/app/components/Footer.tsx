const columns = [
  {
    title: "Produits",
    links: ["Test de personnalité", "Rapport complet", "Conversation IA"],
  },
  {
    title: "Ressources",
    links: ["Types de personnalité", "Articles", "Notre méthode"],
  },
  {
    title: "Aide",
    links: ["Nous contacter", "FAQ", "Vos commandes"],
  },
  {
    title: "Légal",
    links: ["CGU", "Politique de confidentialité", "Mentions légales"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12 px-8">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="font-semibold text-gray-800 mb-3">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-[#4298b4] hover:underline">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="max-w-5xl mx-auto text-center text-xs text-gray-400 border-t border-gray-200 pt-6">
        © 2026 — Projet Tests. Tous droits réservés.
      </div>
    </footer>
  );
}
