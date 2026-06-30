import type { Metadata } from "next";
import BoutonPartageNatif from "../../components/BoutonPartageNatif";
import { getProfil } from "../../data/profils";

const GREEN = "rgba(51,164,116,0.85)";

export const metadata: Metadata = {
  title: "Partager ton profil",
  robots: { index: false, follow: false },
};

// Même logique que la page résultat : "entj-v2" -> { code: "ENTJ", variante: "V2" }.
function parseSlug(slug: string): { code: string; variante: string } {
  const m = slug.match(/^(.+)-(v\d)$/i);
  if (m) return { code: m[1].toUpperCase(), variante: m[2].toUpperCase() };
  return { code: slug.toUpperCase(), variante: "V1" };
}

// Page d'atterrissage du QR code, ouverte sur le téléphone après le scan.
// Version minimale : un tap sur le bouton ouvre la feuille de partage native du
// téléphone (la vraie liste d'applis) avec le message prêt. Le lien partagé mène au profil /p.
export default async function PartagerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { code, variante } = parseSlug(slug);
  const profil = getProfil(code, variante);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm text-center">
        <div
          className="mx-auto w-28 h-28 flex items-center justify-center rounded-3xl text-2xl font-semibold tracking-wide text-white mb-7"
          style={{ background: GREEN, border: "1.5px solid rgba(255,255,255,0.5)" }}
        >
          {profil.code}
        </div>

        <h1 className="text-2xl font-bold text-[rgba(0,0,0,0.8)]">{profil.nomType}</h1>
        <p className="text-gray-500 mt-1 mb-9">
          {profil.code} · {profil.nomVariante}
        </p>

        <BoutonPartageNatif code={profil.code} nomVariante={profil.nomVariante} />
      </div>
    </div>
  );
}
