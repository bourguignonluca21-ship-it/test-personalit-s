import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles",
  description: "Connaissance de soi, psychologie grand public, relations et développement personnel.",
};

const PLACEHOLDER_ARTICLES = Array.from({ length: 6 }).map((_, i) => ({
  id: i + 1,
  title: `Titre d'article ${i + 1}`,
  excerpt: "Court résumé de l'article — à remplacer par ton propre contenu éditorial.",
  category: ["Connaissance de soi", "Relations", "Développement personnel"][i % 3],
}));

export default function ArticlesPage() {
  return (
    <div className="bg-white">
      <section className="text-center pt-12 pb-8 px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Articles</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          De la matière à explorer autour de la connaissance de soi.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLACEHOLDER_ARTICLES.map((a) => (
            <Link
              key={a.id}
              href="/articles"
              className="rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow block"
            >
              <div className="aspect-video bg-gray-100 grid place-items-center text-gray-300 text-sm">
                Image
              </div>
              <div className="p-5">
                <span className="text-xs font-semibold text-[rgba(66,152,180,0.75)]">{a.category}</span>
                <h3 className="font-bold text-gray-800 mt-1 mb-2">{a.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{a.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
