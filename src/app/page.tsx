import Link from "next/link";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Reveal from "./components/Reveal";

export default function Home() {
  return (
    <div className="home-apple">
      <Hero />

      <Reveal>
        <Stats />
      </Reveal>

      {/* Section verte — le côté IA */}
      <section
        className="text-white px-6 py-28 md:py-36 text-center mx-[10px] md:mx-[15px] rounded-3xl"
        style={{ background: "rgba(51,164,116,0.75)" }}
      >
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl mx-auto leading-[1.1]">
            Une lecture de toi d&apos;une finesse inédite.
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mt-7 leading-relaxed">
            Là où les autres donnent une étiquette, l&apos;IA dessine toute ta nuance.
          </p>
          <div className="mt-10">
            <Link
              href="/test"
              className="inline-block bg-white font-semibold py-4 px-10 rounded-full text-lg hover:opacity-90 transition"
              style={{ color: "rgba(51,164,116,0.95)" }}
            >
              Faire le test
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
