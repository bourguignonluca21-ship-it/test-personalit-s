// Dégradé vert très léger, du bas vers le haut, derrière le hero.
// Couche de fond uniquement — n'affecte pas le contenu.
// Pour le retirer : supprimer <MeshGradient /> dans Hero.tsx.
export default function MeshGradient() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-[10px] right-[10px] md:left-[15px] md:right-[15px] -z-10 rounded-3xl"
      style={{
        background:
          "linear-gradient(to top, rgba(51,164,116,0.12) 0%, rgba(51,164,116,0.05) 35%, transparent 65%)",
      }}
    />
  );
}
