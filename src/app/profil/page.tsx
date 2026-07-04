import type { Metadata } from "next";
import Link from "next/link";
import MeshGradient from "../components/MeshGradient";
import ProfilOnglets, { CercleProgression } from "./ProfilOnglets";
import PartageInline from "../components/PartageInline";
import FlecheRemonter from "./FlecheRemonter";
import { createClient } from "../lib/supabase/server";
import { getTypeByCode } from "../data/types";
import { NOMS_VARIANTES } from "../data/moteur";

export const metadata: Metadata = {
  title: "Mon profil",
  description: "Ton espace personnel.",
  robots: { index: false },
};

const VERT = "rgba(51,164,116,0.85)";
const INK = "rgba(0,0,0,0.75)";

/* Rareté du profil — PLACEHOLDER (décision Luca : chiffres factices dans un
   premier temps, comme le « 96 % de précision » de l'accueil). Dérivée du
   slug pour être STABLE (un même profil affiche toujours le même %, entre
   2 et 8). À remplacer plus tard par le vrai calcul sur la table `resultats`. */
function rareteFactice(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) % 997;
  return 2 + (h % 7); // 2 à 8 %
}

/*
 * Page « Mon profil », version 1 : la galerie « Mes profils ».
 * Décision de cadrage (cf. ANALYSE_PARCOURS_16P.md) : contrairement à 16P
 * (un seul test → un seul profil), notre Aperçu est une GALERIE : une carte
 * par test (passé ou à passer). Les sections Relations / Développement
 * perso / IA / Paramètres viendront ensuite.
 * Serveur : lit la session (cookies) + la table `resultats` (RLS : chacun ne
 * lit que les siens) + `achats` pour le badge « rapport débloqué ».
 */
export default async function ProfilPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Pas connecté → invitation (la fenêtre de connexion vit dans la navbar).
  if (!user) {
    return (
      <div>
        <section className="relative overflow-hidden text-center px-6 pt-24 md:pt-28 pb-16 min-h-[420px]">
          <MeshGradient />
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]"
            style={{ color: INK }}
          >
            Mon profil
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto mt-7 leading-relaxed">
            Connecte-toi pour retrouver tes profils, où que tu sois.
            Clique sur « Se connecter » en haut à droite.
          </p>
        </section>
      </div>
    );
  }

  const prenom = (user.user_metadata?.prenom as string | undefined) ?? "";

  // Dernier résultat du test de personnalité (l'historique viendra plus tard).
  const { data: resultat } = await supabase
    .from("resultats")
    .select("slug, scores_s, scores_v, created_at")
    .eq("user_id", user.id)
    .eq("test", "personnalite")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  // Dark personnalité : le test n'existe pas encore, mais la carte s'allumera
  // toute seule le jour où un résultat `test = "dark"` sera enregistré.
  const { data: resultatDark } = await supabase
    .from("resultats")
    .select("slug, created_at")
    .eq("user_id", user.id)
    .eq("test", "dark")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  // Rapport complet acheté pour ce profil ?
  let rapportAchete = false;
  if (resultat) {
    const { data: achat } = await supabase
      .from("achats")
      .select("id")
      .eq("user_id", user.id)
      .eq("profil", resultat.slug)
      .eq("statut", "paye")
      .limit(1);
    rapportAchete = !!achat?.length;
  }

  // Infos d'affichage du profil (nom du type + nom de variante).
  let carte: {
    href: string;
    nomType: string;
    sousTitre: string;
    date: string;
    code: string;
    nomVariante: string;
  } | null = null;
  if (resultat) {
    const [codeBrut, varianteBrute] = resultat.slug.split("-");
    const code = codeBrut?.toUpperCase() ?? "";
    const variante = varianteBrute?.toUpperCase() ?? "";
    const type = getTypeByCode(code);
    const nomVariante = NOMS_VARIANTES[code]?.[variante];
    carte = {
      href: `/resultat/${resultat.slug}?s=${resultat.scores_s}&v=${resultat.scores_v}`,
      nomType: type?.name ?? code,
      sousTitre: `${code} · ${nomVariante ?? variante}`,
      date: new Date(resultat.created_at).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      code,
      nomVariante: nomVariante ?? variante,
    };
  }

  // Progression de chaque partie (les cercles sous les blocs) — calculée
  // depuis les vraies données du compte.
  // Règle du % « Mes profils » (décision Luca) : chaque test vaut 50 points
  // au maximum — test fait ET rapport payé = 50, test fait mais rapport pas
  // payé = 7, test pas fait = 0. Le rapport acheté est ce qui compte.
  const pointsPersonnalite = resultat ? (rapportAchete ? 50 : 7) : 0;
  const pointsDark = resultatDark ? 7 : 0; // passera à 50 quand son rapport sera acheté (même logique)
  // Progression PAR TEST (anneaux des cartes + cercles au survol), barème
  // validé par Luca : rapport complet acheté = 100 %, test fait sans
  // rapport = 5 %, test pas fait = 0 %.
  const pctPersonnalite = resultat ? (rapportAchete ? 100 : 5) : 0;
  const pctDark = resultatDark ? 5 : 0; // passera à 100 quand son rapport sera acheté
  const progression = {
    profils: pointsPersonnalite + pointsDark,
    relations: 0, // partenaire + amis ajoutés (données à venir avec la partie Relations)
    developpement: 0, // avancement du parcours (données à venir avec la partie Développement)
    ia: 0, // conversations engagées (données à venir avec la partie IA)
    parametres: prenom ? 100 : 50, // compte configuré (prénom) ; email toujours présent
  };
  // Le % global du profil : moyenne des 5 parties.
  const progressionGlobale = Math.round(
    (progression.profils +
      progression.relations +
      progression.developpement +
      progression.ia +
      progression.parametres) / 5,
  );

  return (
    <div>
      {/* Héros (même squelette que le reste du site) */}
      <section className="relative overflow-hidden text-center px-6 pt-24 md:pt-28 pb-16">
        <MeshGradient />
        {/* min-h-[1.2em] (titre) et min-h-[3.25em] (sous-titre, = 2 lignes) :
            hauteurs réservées pour que le bandeau fasse EXACTEMENT les 450 px
            de l'accueil même avec un texte plus court (mesuré au navigateur). */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] min-h-[1.2em]"
          style={{ color: INK }}
        >
          Bonjour{prenom ? (
            <>
              {" "}
              <span style={{ color: VERT }}>{prenom}</span>
            </>
          ) : ""}
        </h1>
        <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto mt-7 leading-relaxed min-h-[3.25em]">
          Tes tests, tes profils, ton évolution : tout vit ici.
        </p>
        {/* Le % global du profil : centré dans l'espace entre le sous-titre
            et le bloc des parties (mt-5 + mb-5 = les 40 px de l'ancien mt-10,
            le bandeau garde EXACTEMENT ses 450 px). */}
        {/* marginTop négatif : le cercle mord légèrement sur la boîte du
            sous-titre (demande Luca) ; mb-14 compense pour garder 450 px. */}
        <div className="mb-14 flex items-center justify-center" style={{ height: 56, marginTop: -16 }}>
          <CercleProgression pct={progressionGlobale} taille={56} />
        </div>
      </section>

      {/* Les onglets du profil : 5 boutons, cliquer change le contenu
          affiché en dessous (composant client ProfilOnglets). La galerie
          « Mes profils », construite ici côté serveur avec les données,
          lui est passée en enfant. */}
      {/* -mt-[68px] : les cartes mordent sur le bandeau, exactement comme les
          cartes « Étape » de la page test (positions vérifiées au navigateur). */}
      <section className="relative z-10 px-6 pb-20 -mt-[68px]">
        <div className="mx-auto max-w-3xl">
          <ProfilOnglets
            progression={progression}
            profil={carte ? { sousTitre: carte.sousTitre } : null}
            partage={
              carte && resultat
                ? {
                    code: carte.code,
                    nomVariante: carte.nomVariante,
                    slug: resultat.slug,
                    s: resultat.scores_s,
                    v: resultat.scores_v,
                  }
                : null
            }
          >
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {/* Carte Personnalité (cercle de progression à sa GAUCHE au survol) */}
            {carte ? (
              <Link
                href={carte.href}
                className="group flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 text-left shadow-sm transition-shadow hover:shadow-md"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Test de personnalité
                </p>
                <div className="mt-2 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-2xl font-bold" style={{ color: INK }}>
                      {carte.nomType}
                    </p>
                    <p className="mt-1 text-sm font-semibold" style={{ color: VERT }}>
                      {carte.sousTitre}
                    </p>
                  </div>
                  {/* Emblème carré du code (comme sur le rapport), adapté au
                      fond blanc : pastille vert pâle, monogramme vert. */}
                  <div
                    className="flex h-[64px] w-[64px] flex-shrink-0 items-center justify-center rounded-2xl"
                    style={{ background: "rgba(51,164,116,0.10)" }}
                  >
                    <span className="text-sm font-bold tracking-wide" style={{ color: VERT }}>
                      {carte.sousTitre.split(" ")[0]}
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-xs text-gray-400">Test passé le {carte.date}</p>
                <p className="mt-1 text-xs text-gray-400">
                  Seuls{" "}
                  <span className="font-semibold" style={{ color: VERT }}>
                    {rareteFactice(resultat!.slug)} %
                  </span>{" "}
                  des profils partagent ton type
                </p>
                <div className="mt-auto flex items-center justify-between pt-5">
                  <span
                    className="inline-block rounded-full px-4 py-2 text-sm font-semibold text-white transition-transform group-hover:scale-105"
                    style={{ background: VERT }}
                  >
                    Voir mon profil
                  </span>
                  {/* Progression du test (remplace l'ancienne coche/cadenas,
                      demande Luca) : même barème que le cercle au survol
                      (payé = 100 %, fait sans achat = 14 %). */}
                  <CercleProgression pct={pctPersonnalite} taille={32} />
                </div>
              </Link>            ) : (
              /* État vide qui vend (leçon 16P). Test pas fait → TOUTE la
                 carte est cliquable et mène au test. */
              <Link
                href="/test"
                className="group flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 text-left shadow-sm transition-shadow hover:shadow-md"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Test de personnalité
                </p>
                <p className="mt-2 text-2xl font-bold" style={{ color: INK }}>
                  Qui es-tu vraiment ?
                </p>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                  Passe le test et découvre lequel des 48 profils te ressemble.
                </p>
                <div className="mt-auto pt-5">
                  <span
                    className="inline-block rounded-full px-4 py-2 text-sm font-semibold text-white transition-transform group-hover:scale-105"
                    style={{ background: VERT }}
                  >
                    Faire le test
                  </span>
                </div>
              </Link>            )}

            {/* Carte Dark personnalité (cercle de progression à sa DROITE au
                survol) : statut « à faire » tant qu'aucun résultat `dark`
                n'existe. Test pas fait → TOUTE la carte est cliquable et mène
                au test ; test fait → carte allumée. */}
            {resultatDark ? (
              <div className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 text-left shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Dark personnalité
                </p>
                <p className="mt-2 text-2xl font-bold" style={{ color: INK }}>
                  Ton ombre
                </p>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                  Il y a une part de nous qu&apos;on ne montre jamais, et qui
                  pourtant compte dans ce que nous sommes. Ose la mesurer,
                  apprends à l&apos;apprivoiser.
                </p>
                {/* mt-auto : la pastille est calée en bas, à la même hauteur
                    que « Voir mon profil » (cartes de même hauteur).
                    + anneau de progression du test (même barème). */}
                <div className="mt-auto flex items-center justify-between pt-5">
                  <span
                    className="inline-block rounded-full px-4 py-2 text-sm font-semibold text-white"
                    style={{ background: VERT }}
                  >
                    Test effectué
                  </span>
                  <CercleProgression pct={pctDark} taille={32} />
                </div>
              </div>
            ) : (
              <Link
                href="/dark-personnalite"
                className="group flex h-full flex-col rounded-2xl border border-dashed border-gray-200 bg-white/60 p-6 text-left transition-all hover:border-solid hover:border-gray-100 hover:bg-white hover:shadow-md"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Dark personnalité
                </p>
                <p className="mt-2 text-2xl font-bold" style={{ color: INK }}>
                  Ton ombre
                </p>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                  Il y a une part de nous qu&apos;on ne montre jamais, et qui
                  pourtant compte dans ce que nous sommes. Ose la mesurer,
                  apprends à l&apos;apprivoiser.
                </p>
                {/* + anneau de progression du test (0 % tant que pas fait) */}
                <div className="mt-auto flex items-center justify-between pt-5">
                  <span
                    className="inline-block rounded-full px-4 py-2 text-sm font-semibold text-white transition-transform group-hover:scale-105"
                    style={{ background: VERT }}
                  >
                    Faire le test
                  </span>
                  <CercleProgression pct={pctDark} taille={32} />
                </div>
              </Link>
            )}
          </div>

          {/* Le bloc de partage (le même qu'en fin de rapport), sous les
              cartes de test — le lien /p est construit depuis le résultat
              du compte (props slug + scores). */}
          {carte && resultat && (
            <div
              className="mt-10 rounded-2xl p-7 md:p-10 transition-shadow hover:shadow-sm"
              style={{ background: "rgba(51,164,116,0.08)" }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-[rgba(0,0,0,0.8)] mb-4">
                Et tes proches, qui sont-ils vraiment ?
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Partage les grandes lignes de ton profil. Tes proches
                n&apos;en verront que l&apos;essentiel, jamais ton analyse
                intime, et ça leur donnera sûrement envie de découvrir le leur.
              </p>
              <PartageInline
                code={carte.code}
                nomVariante={carte.nomVariante}
                slug={resultat.slug}
                s={resultat.scores_s}
                v={resultat.scores_v}
              />
            </div>
          )}

          {/* Flèche « remonter » : apparaît quand le footer entre à l'écran */}
          <FlecheRemonter />
          </ProfilOnglets>
        </div>
      </section>
    </div>
  );
}
