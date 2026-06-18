export default function Hero() {
  return (
    <section className="bg-[#4298b4] text-white text-center py-20 px-6">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">
        « C&apos;est incroyable d&apos;être enfin compris. »
      </h1>
      <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
        Obtenez, en 10 minutes seulement, une description « incroyablement
        exacte » de qui vous êtes et pourquoi vous agissez comme vous le faites.
      </p>
      <a
        href="/test"
        className="inline-block bg-white/20 border-2 border-white text-white font-semibold py-3 px-8 rounded-full text-lg hover:bg-white hover:text-[#4298b4] transition-colors"
      >
        Passer le test →
      </a>
    </section>
  );
}
