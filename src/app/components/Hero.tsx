import Link from "next/link";
import TypedTitle from "./TypedTitle";
import MeshGradient from "./MeshGradient";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 text-center min-h-[calc(100svh-56px)] flex flex-col items-center justify-center pb-16">
      {/* Entrée au chargement : chaque élément monte en fondu, en cascade */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes hero-entre{from{opacity:0;transform:translateY(26px);}to{opacity:1;transform:none;}}
            @keyframes hero-entre-x{from{opacity:0;transform:translate(-50%,26px);}to{opacity:1;transform:translate(-50%,0);}}
            .hero-e{animation:hero-entre .9s cubic-bezier(.22,.9,.3,1) both;}
            .hero-e2{animation-delay:.25s;}
            .hero-e3{animation-delay:.5s;}
            .hero-e4{animation-name:hero-entre-x;animation-delay:1.1s;}
            @media (prefers-reduced-motion: reduce){.hero-e{animation:none;}}
          `,
        }}
      />
      {/* Essai : le dégradé est FIXÉ au viewport (il suit l'écran sur toute la
          descente de la home, sans bouger), derrière le voile d'atmosphère (z -1).
          Sa hauteur est bornée au bas du bloc vert final par HomeActes (surScroll) :
          il ne descend jamais en dessous. */}
      <div aria-hidden id="hero-fond-fixe" className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[100svh]">
        <MeshGradient />
      </div>
      <h1 className="hero-e text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] whitespace-nowrap min-h-[1.2em]">
        <TypedTitle />
      </h1>
      <p className="hero-e hero-e2 text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto mt-8 leading-relaxed">
        Quelques minutes suffisent pour révéler, avec une précision déroutante, ce qui fait de toi… <span className="font-semibold" style={{ color: "rgba(51,164,116,0.75)" }}>Toi</span>.
      </p>
      <div className="hero-e hero-e3 mt-11 flex items-center justify-center">
        <Link
          href="/test"
          className="inline-block bg-[rgba(51,164,116,0.75)] text-white font-semibold py-3.5 px-9 rounded-full text-lg transition-transform duration-300 hover:scale-105"
        >
          Découvrir ma personnalité
        </Link>
      </div>

      {/* Invitation à descendre : animation Lottie scroll-down */}
      <a
        href="#ha-acte1"
        aria-label="Descendre vers la suite"
        className="hero-e hero-e4 absolute bottom-4 left-1/2"
        dangerouslySetInnerHTML={{
          __html: `<dotlottie-player src="https://assets-v2.lottiefiles.com/a/f2a50142-1164-11ee-9f06-0f774aafc4a7/SkmRpW8Gfa.lottie" autoplay loop style="width:88px;height:88px"></dotlottie-player>`,
        }}
      />
    </section>
  );
}
