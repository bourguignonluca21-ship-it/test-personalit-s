import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-[#4298b4] text-white text-center py-20 px-6">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 max-w-3xl mx-auto leading-tight">
        « C&apos;est incroyable d&apos;être enfin compris. »
      </h1>
      <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed text-white/90">
        Obtenez, en 10 minutes seulement, une description « incroyablement exacte » de qui vous êtes
        et pourquoi vous agissez comme vous le faites.
      </p>
      <Link
        href="/test"
        className="inline-block bg-white text-[#4298b4] font-semibold py-3 px-8 rounded-full text-lg hover:bg-white/90 transition-colors"
      >
        Faire le test →
      </Link>
      <p className="mt-5 text-xs text-white/70">
        Gratuit · sans inscription · analyse présentée par IA
      </p>
    </section>
  );
}
