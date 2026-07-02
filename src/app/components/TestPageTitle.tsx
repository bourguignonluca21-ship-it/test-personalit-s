"use client";

// Titre de la page test : « Test de personnalité » tombe du haut avec rebond.
// Même typo que le titre de l'accueil (Hero) : tailles, graisse, interligne, une seule ligne.
export default function TestPageTitle() {
  return (
    <h1
      className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] whitespace-nowrap mb-3"
      style={{ color: "rgba(0,0,0,0.75)" }}
    >
      <span className="title-drop">Test de personnalité</span>
    </h1>
  );
}
