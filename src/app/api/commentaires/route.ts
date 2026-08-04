import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "../../lib/supabase/server";
import { createAdminClient } from "../../lib/supabase/admin";
import { examiner } from "../../lib/moderation";

// =============================================================================
// LES COMMENTAIRES — lecture et écriture.
//
// GET  /api/commentaires?fil=...&page=1   → une page du fil, publics seulement
// POST /api/commentaires                  → écrire, après contrôles
//
// ⚠️ TOUTE écriture passe par ici. Les règles d'accès de Supabase interdisent au
// navigateur d'insérer quoi que ce soit dans `commentaires` : sans cette route,
// on publierait sans passer par la modération.
// =============================================================================

const PAR_PAGE = 5;
/** Trois messages par tranche de dix minutes et par compte. */
const MAX_PAR_10MIN = 3;

type LigneJaime = { count: number };
type Ligne = {
  id: string;
  parent_id?: string | null;
  auteur_pseudo: string;
  auteur_type: string | null;
  texte: string;
  cree_le: string;
  commentaires_jaimes?: LigneJaime[];
};

/** « il y a 2 jours », comme sur le reste du site. */
function depuis(iso: string): string {
  const s = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return "à l'instant";
  const min = Math.floor(s / 60);
  if (min < 60) return `il y a ${min} minute${min > 1 ? "s" : ""}`;
  const h = Math.floor(min / 60);
  if (h < 24) return `il y a ${h} heure${h > 1 ? "s" : ""}`;
  const j = Math.floor(h / 24);
  if (j < 31) return `il y a ${j} jour${j > 1 ? "s" : ""}`;
  const mois = Math.floor(j / 30);
  return `il y a ${mois} mois`;
}

/** `miens` : les messages que le lecteur connecté a déjà aimés. Sans ça, son
 *  cœur redeviendrait vide à chaque rechargement de la page. */
function enClair(l: Ligne, miens?: Set<string>) {
  return {
    id: l.id,
    pseudo: l.auteur_pseudo,
    type: l.auteur_type ?? "",
    date: depuis(l.cree_le),
    texte: l.texte,
    jaime: l.commentaires_jaimes?.[0]?.count ?? 0,
    aime: miens?.has(l.id) ?? false,
  };
}

// -----------------------------------------------------------------------------
export async function GET(requete: Request) {
  const url = new URL(requete.url);
  const fil = url.searchParams.get("fil") ?? "";
  const page = Math.max(1, Number(url.searchParams.get("page") ?? 1));
  if (!fil) return NextResponse.json({ erreur: "fil manquant" }, { status: 400 });

  const supabase = await createClient();
  const debut = (page - 1) * PAR_PAGE;

  // Les commentaires racines de cette page. Le `count` donne le vrai nombre de
  // pages. La règle d'accès ne laisse passer que l'état « publie ».
  const { data: racines, count, error } = await supabase
    .from("commentaires")
    .select("id,auteur_pseudo,auteur_type,texte,cree_le,commentaires_jaimes(count)", {
      count: "exact",
    })
    .eq("fil", fil)
    .is("parent_id", null)
    .order("cree_le", { ascending: false })
    .range(debut, debut + PAR_PAGE - 1);

  if (error) return NextResponse.json({ erreur: error.message }, { status: 500 });

  const ids = (racines ?? []).map((r) => r.id);
  const { data: reponses } = ids.length
    ? await supabase
        .from("commentaires")
        .select("id,parent_id,auteur_pseudo,auteur_type,texte,cree_le,commentaires_jaimes(count)")
        .in("parent_id", ids)
        .order("cree_le", { ascending: true })
    : { data: [] as Ligne[] };

  /* Les j'aime DE CE LECTEUR, en une seule requête pour toute la page. Aimer
     n'exige pas de compte : un lecteur connecté est reconnu par son compte, un
     lecteur de passage par son jeton de visite. Sans l'un ni l'autre, tous les
     cœurs sont vides — c'est le cas d'une première visite. */
  const miens = new Set<string>();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const jeton = user ? null : (await cookies()).get("visiteur")?.value ?? null;

  if (user || jeton) {
    const tous = [...ids, ...((reponses ?? []) as Ligne[]).map((x) => x.id)];
    if (tous.length) {
      const requete = supabase
        .from("commentaires_jaimes")
        .select("commentaire_id")
        .in("commentaire_id", tous);
      const { data: poses } = user
        ? await requete.eq("user_id", user.id)
        : await requete.eq("visiteur", jeton as string);
      for (const p of poses ?? []) miens.add(p.commentaire_id as string);
    }
  }

  const commentaires = (racines ?? []).map((r) => ({
    ...enClair(r as Ligne, miens),
    reponses: ((reponses ?? []) as Ligne[])
      .filter((x) => x.parent_id === r.id)
      .map((x) => enClair(x, miens)),
  }));

  return NextResponse.json({
    commentaires,
    total: count ?? 0,
    pages: Math.max(1, Math.ceil((count ?? 0) / PAR_PAGE)),
  });
}

// -----------------------------------------------------------------------------
export async function POST(requete: Request) {
  const { fil, texte, parentId } = (await requete.json()) as {
    fil?: string;
    texte?: string;
    parentId?: string | null;
  };
  if (!fil || !texte) return NextResponse.json({ erreur: "requête incomplète" }, { status: 400 });

  // 1. Inscrits uniquement.
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json(
      { etat: "refuse", message: "Il faut être connecté pour commenter." },
      { status: 401 }
    );
  }

  const pseudo = (user.user_metadata?.prenom as string | undefined)?.trim();
  if (!pseudo) {
    return NextResponse.json(
      { etat: "refuse", message: "Choisis d'abord un pseudonyme dans ton profil." },
      { status: 400 }
    );
  }

  const admin = createAdminClient();

  // 2. Limite de fréquence : on compte les messages récents du compte.
  const ilYA10Min = new Date(Date.now() - 10 * 60 * 1000).toISOString();
  const { count: recents } = await admin
    .from("commentaires")
    .select("id", { count: "exact", head: true })
    .eq("auteur_id", user.id)
    .gte("cree_le", ilYA10Min);

  if ((recents ?? 0) >= MAX_PAR_10MIN) {
    return NextResponse.json(
      { etat: "refuse", message: "Tu écris trop vite. Réessaie dans quelques minutes." },
      { status: 429 }
    );
  }

  // 3. Une réponse ne peut répondre qu'à un commentaire racine : un seul niveau.
  if (parentId) {
    const { data: parent } = await admin
      .from("commentaires")
      .select("id,parent_id,fil")
      .eq("id", parentId)
      .maybeSingle();
    if (!parent || parent.parent_id !== null || parent.fil !== fil) {
      return NextResponse.json({ erreur: "réponse impossible" }, { status: 400 });
    }
  }

  // 4. Les contrôles.
  const verdict = await examiner(texte);

  // 5. On enregistre TOUJOURS, même refusé : c'est la trace qui permet de
  //    revenir sur une décision, et de retrouver un message mis de côté.
  const { data: ligne, error } = await admin
    .from("commentaires")
    .insert({
      fil,
      auteur_id: user.id,
      auteur_pseudo: pseudo,
      parent_id: parentId ?? null,
      texte: texte.trim(),
      etat: verdict.etat,
      motif_etat: verdict.motif,
    })
    .select("id,auteur_pseudo,auteur_type,texte,cree_le")
    .single();

  if (error) return NextResponse.json({ erreur: error.message }, { status: 500 });

  // 6. Ce qu'on dit à l'auteur. Le DSA impose de l'informer quand son message
  //    est modéré, et de lui dire pourquoi.
  if (verdict.etat === "publie") {
    return NextResponse.json({
      etat: "publie",
      commentaire: { ...enClair(ligne as Ligne), reponses: [] },
    });
  }

  if (verdict.etat === "a_revoir") {
    return NextResponse.json({
      etat: "a_revoir",
      message:
        verdict.motif === "DETRESSE"
          ? "Merci pour ce message. Il sera lu par une personne avant d'apparaître, parce qu'il touche à un sujet sensible."
          : "Ton message a été enregistré. Il apparaîtra après une vérification.",
    });
  }

  return NextResponse.json({
    etat: "bloque",
    message: verdict.motif?.startsWith("AUTORITES")
      ? "Ce message ne peut pas être publié."
      : verdict.motif ?? "Ce message ne peut pas être publié.",
  });
}
