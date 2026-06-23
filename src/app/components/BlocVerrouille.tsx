import Link from "next/link";
import type { ReactNode } from "react";

const GREEN = "rgba(51,164,116,0.85)";

// Verrou « teaser flouté » pour un bloc premium.
// IMPORTANT : si non payé, le VRAI contenu (children) n'est pas rendu du tout, donc jamais
// envoyé au navigateur. On n'affiche qu'un LEURRE générique flouté + un CTA. Le flou n'est
// qu'un effet visuel ; la vraie protection, c'est de ne pas sérialiser children côté serveur.
// unlockHref : lien de déblocage (en prototype, "?...&paid=1" ; plus tard, le checkout Stripe).
export default function BlocVerrouille({
  isPaid,
  unlockHref,
  children,
}: {
  isPaid: boolean;
  unlockHref: string;
  children: ReactNode;
}) {
  if (isPaid) return <>{children}</>;

  return (
    <div className="relative mt-8">
      {/* Le VRAI bloc COMPLET, rendu tel quel mais flouté et non interactif : la zone verrouillée
          a donc exactement la structure du format payant (colonnes, blocs rouge/vert, paradoxe…).
          (Prototype : le texte est présent dans la page, seulement flouté. La protection serveur
          réelle viendra en Phase 3.) */}
      <div aria-hidden="true" className="select-none blur-[5px]">
        {children}
      </div>

      {/* CTA posé par-dessus, centré. L'overlay laisse passer le survol (pour les panneaux
          des blocs en dessous) ; seul le bouton reste cliquable. */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="pointer-events-auto bg-white/95 backdrop-blur-sm rounded-2xl shadow-[0_12px_45px_-12px_rgba(0,0,0,0.3)] px-8 py-7 text-center max-w-sm mx-4">
          <p className="text-lg font-bold text-[rgba(0,0,0,0.8)] mb-2 leading-snug">
            Le plus intéressant sur toi commence ici.
          </p>
          <p className="text-sm text-gray-500 mb-5 leading-relaxed">
            Tes forces cachées, tes angles morts et comment t&apos;en servir t&apos;attendent dans ton rapport complet.
          </p>
          <Link
            href={unlockHref}
            className="inline-block text-white font-semibold py-3.5 px-9 rounded-full text-base hover:opacity-90 transition"
            style={{ background: GREEN }}
          >
            Je débloque mon rapport
          </Link>
          <p className="text-xs text-gray-400 mt-3">Paiement unique, accès immédiat à vie.</p>
        </div>
      </div>
    </div>
  );
}
