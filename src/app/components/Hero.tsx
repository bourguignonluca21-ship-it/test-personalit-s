import Link from "next/link";
import MeshGradient from "./MeshGradient";

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[calc(100svh-56px)] flex items-center justify-between" style={{ paddingLeft: 120, paddingRight: 80 }}>
      {/* Entrée au chargement : chaque élément monte en fondu, en cascade */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes hero-entre{from{opacity:0;transform:translateY(26px);}to{opacity:1;transform:none;}}
            .hero-e{animation:hero-entre .9s cubic-bezier(.22,.9,.3,1) both;}
            .hero-e2{animation-delay:.25s;}
            .hero-e3{animation-delay:.5s;}
            .hero-e4{animation-delay:.7s;}
            @media (prefers-reduced-motion: reduce){.hero-e{animation:none;}}
          `,
        }}
      />
      <div aria-hidden id="hero-fond-fixe" className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[100svh]">
        <MeshGradient />
      </div>

      {/* Colonne gauche : texte */}
      <div className="flex flex-col items-start pb-16">
        {/* La serif des grands titres — Fraunces, l'équivalent libre de la
            New Spirit de npqe.com. `opsz` au maximum : à cette taille, les
            déliés se creusent et les empattements s'affinent. */}
        <h1
          className="hero-e text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.1]"
          style={{
            fontFamily: "var(--font-titre), Georgia, serif",
            fontWeight: 500,
            fontVariationSettings: "'opsz' 144, 'SOFT' 0, 'WONK' 0",
            letterSpacing: "-0.02em",
          }}
        >
          Me connaître,<br />pour avancer.
        </h1>
        <p className="hero-e hero-e2 text-xl md:text-2xl text-gray-500 max-w-2xl mt-8 leading-relaxed text-left">
          Quelques minutes suffisent pour révéler,<br />avec une précision déroutante, ce qui fait de toi… <span className="font-semibold" style={{ color: "rgba(51,164,116,0.75)" }}>Toi</span>.
        </p>
        <div className="hero-e hero-e3 mt-11 flex items-center">
          <Link
            href="/test"
            className="inline-block bg-[rgba(51,164,116,0.75)] text-white font-semibold py-3.5 px-9 rounded-full text-lg transition-transform duration-300 hover:scale-105"
          >
            Faire le test gratuit &rarr;
          </Link>
        </div>
      </div>

      {/* Colonne droite : demi-lune */}
      <div className="hero-e hero-e4 flex items-center justify-center flex-shrink-0" style={{ position: "relative", zIndex: 1 }}>
        <svg width="350" height="350" viewBox="0 0 350 350" fill="none" aria-hidden>
          <path
            d="M175 0 A175 175 0 0 1 175 350 A110 110 0 0 0 175 0Z"
            fill="rgba(51,164,116,1)"
          />
        </svg>
      </div>

    </section>
  );
}
