import Link from "next/link";
import TypedTitle from "./TypedTitle";
import MeshGradient from "./MeshGradient";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pt-24 md:pt-28 pb-16 text-center">
      <MeshGradient />
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] whitespace-nowrap min-h-[1.2em]">
        <TypedTitle />
      </h1>
      <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto mt-7 leading-relaxed">
        Quelques minutes suffisent pour révéler, avec une précision déroutante, ce qui fait de toi… <span className="font-semibold" style={{ color: "rgba(51,164,116,0.75)" }}>Toi</span>.
      </p>
      <div className="mt-10 flex items-center justify-center">
        <Link
          href="/test"
          className="inline-block bg-[rgba(51,164,116,0.75)] text-white font-semibold py-3.5 px-9 rounded-full text-lg transition-transform duration-300 hover:scale-105"
        >
          Découvrir ma personnalité
        </Link>
      </div>
    </section>
  );
}
