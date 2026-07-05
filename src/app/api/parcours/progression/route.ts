import { NextResponse } from "next/server";
import { createClient } from "../../../lib/supabase/server";
import { createAdminClient } from "../../../lib/supabase/admin";

/*
 * PROGRESSION DES PARCOURS (table `parcours_progression`, cf.
 * VISION_RELATIONS_PARCOURS.md) : la fenêtre du parcours solo lit et
 * enregistre ici les modules terminés, rattachés au COMPTE (le client
 * retrouve sa progression 2 heures ou 2 semaines plus tard, sur
 * n'importe quel appareil).
 * - GET  ?parcours=relations-seul  → { faits } (0 si non connecté)
 * - POST { parcours, module }      → enregistre le module comme FAIT
 * Lecture via la session (RLS : chacun ne lit que ses lignes) ; écriture
 * via service_role (pas de policy d'écriture publique), après avoir
 * vérifié la session — même patron que la table `resultats`.
 */

export async function GET(req: Request) {
  try {
    const parcours = new URL(req.url).searchParams.get("parcours") ?? "relations-seul";
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ faits: 0 });

    const { data } = await supabase
      .from("parcours_progression")
      .select("module")
      .eq("user_id", user.id)
      .eq("parcours", parcours)
      .eq("etat", "fait");

    /* Les modules se débloquent dans l'ordre : « faits » = le plus grand
       numéro de module terminé. */
    const faits = (data ?? []).reduce((max, l) => Math.max(max, l.module), 0);
    return NextResponse.json({ faits });
  } catch {
    return NextResponse.json({ faits: 0 });
  }
}

export async function POST(req: Request) {
  try {
    const corps = await req.json().catch(() => ({}));
    const module_ = Number(corps?.module);
    const parcours = typeof corps?.parcours === "string" ? corps.parcours : "relations-seul";
    if (!Number.isInteger(module_) || module_ < 1 || module_ > 200) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    // Qui est connecté ? (session via cookies ; anonyme = rien à enregistrer)
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ ok: false }, { status: 401 });

    // Écriture via service_role (la table n'a pas de policy d'écriture).
    const admin = createAdminClient();
    await admin.from("parcours_progression").upsert(
      { user_id: user.id, parcours, module: module_, etat: "fait" },
      { onConflict: "user_id,parcours,module" },
    );
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
