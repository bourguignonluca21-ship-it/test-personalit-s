import type { Metadata } from "next";
import TestPersonnalite from "../components/TestPersonnalite";
import { decoderInvitation } from "../lib/duo";
import { createAdminClient } from "../lib/supabase/admin";

export const metadata: Metadata = {
  title: "Test de personnalité gratuit",
  description: "60 questions, ~10 minutes. Découvre ton type parmi 16.",
};

/*
 * PARCOURS À DEUX, côté INVITÉ : si l'URL porte `?invite={jeton signé}`
 * (lib/duo.ts), on vérifie le jeton CÔTÉ SERVEUR, on récupère le prénom de
 * l'inviteur (client admin, la donnée ne sort jamais brute), et on passe
 * l'invitation au test : bloc d'accueil « {Prénom} t'invite… » + le jeton
 * est reporté sur l'URL du résultat en fin de test (pour rattacher le
 * résultat de l'invité à l'inviteur, table `liens`).
 * Un jeton absent / bidon = page du test normale, rien ne change.
 */
export default async function TestPage({
  searchParams,
}: {
  searchParams: Promise<{ invite?: string }>;
}) {
  const { invite } = await searchParams; // Next 16 : searchParams s'attend
  let invitation: { jeton: string; prenom: string } | null = null;
  const inviteurId = decoderInvitation(invite);
  if (invite && inviteurId) {
    try {
      const admin = createAdminClient();
      const { data } = await admin.auth.admin.getUserById(inviteurId);
      const prenom = (data?.user?.user_metadata?.prenom as string | undefined) ?? "";
      invitation = { jeton: invite, prenom: prenom || "Quelqu'un" };
    } catch {
      invitation = null; // problème serveur = test normal, jamais de page cassée
    }
  }
  return <TestPersonnalite invitation={invitation} />;
}
