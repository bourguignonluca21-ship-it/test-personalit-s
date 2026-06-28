const GREEN = "rgba(51,164,116,0.85)";

export interface VarianteItem {
  cle: string; // V1 | V2 | V3
  nom: string;
  pct: number;
  dominant: boolean;
  description: string;
}

export default function VariantesPublic({ variantes }: { variantes: VarianteItem[] }) {
  const dom = variantes.find((v) => v.dominant) ?? variantes[0];

  return (
    <div id="ses-variantes" className="mt-5 px-1 md:px-2 py-6">
      <h2 className="text-lg font-bold mb-4 text-[rgba(0,0,0,0.75)]">
        <span className="mr-1" style={{ color: GREEN }}>2.</span>Ses variantes
      </h2>
      <p className="text-gray-600 leading-relaxed mb-2">
        La variante, c&apos;est la nuance qui distingue deux personnes pourtant du même type. Chez cette personne,
        c&apos;est <span className="font-semibold text-[rgba(0,0,0,0.8)]">{dom.nom}</span> qui ressort.
      </p>

      {/* Chaque variante : sa barre, puis sa description juste en dessous, en pleine largeur.
          Sa variante (dominante) = bloc vert clair mis en avant ; les autres = bloc texte. */}
      <div className="mt-6 space-y-7">
        {variantes.map((v) => (
          <div key={v.cle}>
            <div className="flex items-baseline gap-2 mb-1.5">
              <span
                className={v.dominant ? "text-sm font-bold text-[rgba(0,0,0,0.8)]" : "text-sm font-medium text-gray-500"}
              >
                {v.nom}
              </span>
              <span className="ml-auto text-sm" style={{ color: v.dominant ? GREEN : "rgba(0,0,0,0.4)" }}>
                {v.pct}%
              </span>
            </div>
            <div className="flex h-2.5 rounded-full overflow-hidden bg-gray-100">
              <div style={{ width: `${v.pct}%`, background: GREEN }} />
            </div>

            {v.dominant ? (
              <div
                className="mt-3 rounded-2xl p-5 border"
                style={{ background: "rgba(51,164,116,0.08)", borderColor: "rgba(51,164,116,0.25)" }}
              >
                <p className="text-[11px] font-bold uppercase tracking-wide mb-1" style={{ color: GREEN }}>
                  Sa variante
                </p>
                <p className="text-sm text-gray-600 leading-relaxed text-justify">{v.description}</p>
              </div>
            ) : (
              <p className="mt-2.5 text-sm text-gray-600 leading-relaxed">{v.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
