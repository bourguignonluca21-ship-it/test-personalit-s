import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { utilisateurAdmin } from "../../lib/admin";
import ConsoleCommentaires from "./ConsoleCommentaires";

// =============================================================================
// LA PAGE D'ADMINISTRATION DES COMMENTAIRES.
//
// Adresse : /admin/commentaires — aucun lien n'y mène, nulle part sur le site.
// Mais ce n'est PAS ce qui la protège : le contrôle ci-dessous est fait par le
// serveur avant d'afficher quoi que ce soit, et il est refait à chaque action
// dans /api/admin/commentaires. Qui n'est pas dans ADMIN_EMAILS reçoit un 404,
// comme si la page n'existait pas.
// =============================================================================

export const metadata: Metadata = {
  title: "Modération",
  robots: { index: false, follow: false }, // jamais dans les moteurs de recherche
};

export default async function PageAdminCommentaires() {
  const admin = await utilisateurAdmin();
  if (!admin) notFound();

  return <ConsoleCommentaires />;
}
