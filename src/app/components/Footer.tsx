import Link from "next/link";

const columns = [
  {
    title: "Produits",
    links: [
      { label: "Test de personnalité", href: "/test" },
      { label: "Rapport complet", href: "/pack-carriere-premium" },
      { label: "Conversation IA", href: "/pack-carriere-premium" },
      { label: "Offre équipes", href: "/equipes" },
    ],
  },
  {
    title: "Ressources",
    links: [
      { label: "Types de personnalité", href: "/types-de-personnalite" },
      { label: "Articles", href: "/articles" },
      { label: "Notre méthode", href: "/articles" },
    ],
  },
  {
    title: "Aide",
    links: [
      { label: "Nous contacter", href: "/contact" },
      { label: "FAQ", href: "/contact" },
      { label: "Vos commandes", href: "/connexion" },
    ],
  },
  {
    title: "Légal",
    links: [
      { label: "Conditions générales", href: "/conditions" },
      { label: "Confidentialité", href: "/confidentialite" },
      { label: "Accessibilité", href: "/accessibilite" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12 px-6 md:px-8">
      {/* Colonnes alignées sur la largeur des liens de la navbar (max-w-3xl,
          réparties bord à bord comme « du T au s »), même principe que la
          barre de progression du test. */}
      <div className="max-w-3xl mx-auto grid grid-cols-2 gap-8 md:flex md:justify-between mb-10">
        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="font-semibold text-gray-800 mb-3 text-sm">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-[rgba(51,164,116,0.75)] hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="max-w-3xl mx-auto text-center text-xs text-gray-400 border-t border-gray-200 pt-6">
        © 2026 — Projet Tests (nom provisoire). Découverte de soi ludique, pas une évaluation
        clinique.
      </div>
    </footer>
  );
}
