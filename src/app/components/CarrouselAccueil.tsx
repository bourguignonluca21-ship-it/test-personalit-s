"use client";

import { useRef, useState } from "react";
import Link from "next/link";

/*
 * Carrousel du bloc vert de l'accueil : 2 slides qui défilent (la 2e vient de
 * la droite), avec des petits points de page en dessous (façon carrousel des
 * parcours). Slide 1 = l'IA (existant). Slide 2 = la profondeur du produit
 * (parcours à deux, développement perso, autres tests).
 * ⚠️ Textes de la slide 2 = placeholders, à ajuster.
 */

const VERT = "rgba(51,164,116,0.75)";

export default function CarrouselAccueil() {
  const railRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);

  function majIdx() {
    const el = railRef.current;
    if (!el) return;
    setIdx(Math.round(el.scrollLeft / el.clientWidth));
  }
  function aller(i: number) {
    const el = railRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  }

  return (
    <div className="mx-[10px] md:mx-[15px]">
      <style>{`.acc-scroll::-webkit-scrollbar{display:none}`}</style>
      <div
        ref={railRef}
        onScroll={majIdx}
        className="acc-scroll flex snap-x snap-mandatory overflow-x-auto rounded-3xl"
        style={{ scrollbarWidth: "none" }}
      >
        {/* Slide 1 — l'IA (contenu existant) */}
        <section
          className="w-full flex-shrink-0 snap-center text-white px-6 py-28 md:py-36 text-center"
          style={{ background: VERT }}
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl mx-auto leading-[1.1]">
            Une lecture de toi d&apos;une finesse inédite.
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mt-7 leading-relaxed">
            Là où les autres donnent une étiquette, l&apos;IA dessine toute ta nuance.
          </p>
          <div className="mt-10">
            <Link
              href="/test"
              className="inline-block bg-white font-semibold py-4 px-10 rounded-full text-lg transition-transform duration-300 hover:scale-105"
              style={{ color: "rgba(51,164,116,0.95)" }}
            >
              Faire le test
            </Link>
          </div>
        </section>

        {/* Slide 2 — la profondeur : parcours à deux, développement, autres tests */}
        <section
          className="w-full flex-shrink-0 snap-center text-white px-6 py-28 md:py-36 text-center"
          style={{ background: VERT }}
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl mx-auto leading-[1.1]">
            Et ce n&apos;est que le début.
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mt-7 leading-relaxed">
            Ton espace grandit avec toi : un parcours à deux construit sur vos deux
            profils, un parcours de développement personnel, et d&apos;autres tests
            pour te découvrir sous tous les angles.
          </p>
          <div className="mt-10">
            <Link
              href="/profil"
              className="inline-block bg-white font-semibold py-4 px-10 rounded-full text-lg transition-transform duration-300 hover:scale-105"
              style={{ color: "rgba(51,164,116,0.95)" }}
            >
              Découvrir mon espace
            </Link>
          </div>
        </section>
      </div>

      {/* Points de page (façon carrousel des parcours) */}
      <div className="mt-6 flex justify-center gap-2">
        {[0, 1].map((i) => (
          <button
            key={i}
            type="button"
            aria-label={i === 0 ? "Voir la première slide" : "Voir la deuxième slide"}
            onClick={() => aller(i)}
            className="h-2 w-2 rounded-full transition-colors"
            style={{ background: idx === i ? VERT : "rgba(0,0,0,0.15)" }}
          />
        ))}
      </div>
    </div>
  );
}
