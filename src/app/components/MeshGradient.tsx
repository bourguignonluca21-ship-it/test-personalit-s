// Dégradé vert très léger, du bas vers le haut, derrière le hero.
// Couche de fond uniquement — n'affecte pas le contenu.
// Pour le retirer : supprimer <MeshGradient /> dans Hero.tsx.
// insetX (optionnel) : marge gauche/droite personnalisée (ex. "3cm"). Sinon défaut 10/15px.
export default function MeshGradient({ insetX }: { insetX?: string }) {
  const base = "pointer-events-none absolute inset-y-0 -z-10 rounded-3xl";
  return (
    <div
      aria-hidden
      className={
        insetX ? base : `${base} left-[10px] right-[10px] md:left-[15px] md:right-[15px]`
      }
      style={{
        ...(insetX ? { left: insetX, right: insetX } : {}),
        background:
          "linear-gradient(to top, rgba(51,164,116,0.12) 0%, rgba(51,164,116,0.05) 35%, transparent 65%)",
      }}
    />
  );
}
