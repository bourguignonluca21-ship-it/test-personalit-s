import { NextResponse } from "next/server";
import { createClient } from "../../../lib/supabase/server";
import { createAdminClient } from "../../../lib/supabase/admin";

/*
 * PARCOURS À DEUX : marque le lien « partenaire » comme VU par l'inviteur
 * (survol de la pastille « Nouveau » sur la carte Partenaire du profil).
 * Session lue via cookies (patron /api/parcours/progression), écriture via
 * service_role : chacun ne peut marquer vu QUE son propre lien.
 */
export async function POST() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ ok: false }, { status: 401 });
  try {
    const admin = createAdminClient();
    await admin
      .from("liens")
      .update({ vu_le: new Date().toISOString() })
      .eq("inviteur_user_id", user.id)
      .eq("type", "partenaire");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
