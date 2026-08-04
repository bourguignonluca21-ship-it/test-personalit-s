"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import FenetreConnexion from "../../components/FenetreConnexion";
import FenetreSignalement, { type MotifSignalement } from "./FenetreSignalement";

// =============================================================================
// L'ESPACE COMMENTAIRES des pages de type, sous le bloc de partage.
//
// Règles arrêtées, appliquées ici telles quelles :
//   • inscrits uniquement : le pseudo et l'avatar viendront du profil ;
//   • UN FIL PAR PAGE (les amitiés se commentent sous Amitiés), comme 16P ;
//   • le tri se fait AVANT la publication, par plusieurs contrôles automatiques
//     enchaînés (classificateur OpenAI), et le message paraît ensuite ;
//   • un signalement reste possible, mais réduit à une ICÔNE, sans le mot : le
//     DSA impose une voie de signalement aux hébergeurs de contenus ;
//   • réponses sur UN SEUL niveau, et un « j'aime ».
//
// Les commentaires viennent de Supabase, par /api/commentaires. Le navigateur
// ne peut RIEN écrire directement : les règles d'accès le lui interdisent, et
// toute écriture passe par la route serveur, qui exécute les contrôles.
//
// Habillage : celui de la page. Fond blanc, aucune carte, aucune bande teintée,
// le vert réservé aux titres, filets HORIZONTAUX seulement (une réponse est
// décalée, sans barre à sa gauche : les filets verticaux ont été retirés du site).
// =============================================================================

type Reponse = {
  id: string;
  pseudo: string;
  type: string;
  date: string;
  texte: string;
  /** Le nombre de cœurs, tel que la base le compte. */
  jaime: number;
  /** Est-ce que CE lecteur l'a déjà aimé ? */
  aime: boolean;
};
type Commentaire = Reponse & { reponses: Reponse[] };

const STYLE = `
.pt .commentaires{max-width:768px;margin:0 auto;padding:120px 16px 140px;box-sizing:border-box;}
@media (min-width:768px){.pt .commentaires{padding-left:0;padding-right:0;}}
.pt .commentaires h2{font-size:clamp(30px,4.5vw,46px);font-weight:700;letter-spacing:-0.02em;line-height:1.12;margin:0;}
/* Le titre à gauche, le bouton pour écrire à droite, sur la même ligne. */
.pt .com-tete-section{display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap;}

/* ————— Écrire ————— */
/* Au repos, un seul bouton. La zone de saisie ne se déplie qu'au clic : l'encart
   toujours ouvert prenait trop de place pour ce qu'il disait. */
.pt .com-ouvrir{display:inline-flex;align-items:center;gap:11px;flex:none;background:rgba(51,164,116,0.85);color:#fff;border:none;border-radius:999px;padding:12px 26px 12px 30px;font:inherit;font-size:15px;font-weight:600;cursor:pointer;transition:transform .25s var(--ease);}
.pt .com-ouvrir:hover{transform:scale(1.04);}
/* La flèche pointe vers le bas pour ouvrir, vers le haut pour refermer. */
.pt .com-ouvrir .fl{display:inline-flex;transition:transform .35s var(--ease);}
.pt .com-ouvrir.ouvert .fl{transform:rotate(180deg);}
.pt .com-ecrire{display:grid;grid-template-columns:40px minmax(0,1fr);gap:16px;margin-top:34px;}
/* L'ÉTOILE TIENT LA PLACE DE L'ILLUSTRATION, exactement comme dans le carrousel
   des célébrités : pas de rondelle teintée, pas d'initiales — le signe seul, en
   vert, dans l'emplacement que le dessin occupera plus tard. */
.pt .com-avatar{width:40px;height:40px;display:flex;align-items:center;justify-content:center;color:var(--accent);font-size:26px;line-height:1;}
.pt .com-zone{width:100%;box-sizing:border-box;min-height:96px;resize:vertical;border:1px solid rgba(0,0,0,0.14);border-radius:14px;padding:14px 16px;font:inherit;font-size:15.5px;line-height:1.6;color:var(--noir);background:#fff;transition:border-color .25s;}
.pt .com-zone::placeholder{color:rgba(0,0,0,0.35);}
.pt .com-zone:focus{outline:none;border-color:var(--accent);}
.pt .com-pied{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-top:12px;}
.pt .com-compte{font-size:12.5px;color:var(--gris);}
.pt .com-compte.trop{color:var(--noir);font-weight:700;}
.pt .com-publier{background:rgba(51,164,116,0.85);color:#fff;border:none;border-radius:999px;padding:10px 26px;font-size:15px;font-weight:600;cursor:pointer;transition:transform .25s var(--ease),opacity .25s;}
.pt .com-publier:hover{transform:scale(1.04);}
.pt .com-publier:disabled{opacity:0.4;cursor:default;transform:none;}
.pt .com-note{grid-column:2;margin-top:10px;font-size:12.5px;line-height:1.55;color:var(--gris);}
.pt .com-reponse-a{margin:0 0 10px;font-size:13px;color:var(--gris);display:flex;align-items:center;gap:12px;}
.pt .com-reponse-a b{color:var(--noir);font-weight:700;}
/* La réponse du serveur : publié, mis de côté, ou refusé. Pas de bandeau
   coloré, on reste sur du texte, comme le reste de la page. */
.pt .com-retour{margin-top:20px;font-size:14.5px;line-height:1.6;color:var(--noir);font-weight:700;}
.pt .com-retour.ok{color:var(--accent);}
.pt .com-vide{margin-top:26px;font-size:15px;color:var(--gris);}

/* ————— Le fil ————— */
.pt .com-barre{margin-top:52px;padding-bottom:14px;border-bottom:1px solid rgba(51,164,116,0.3);font-size:13px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;color:var(--gris);}
.pt .com{display:grid;grid-template-columns:40px minmax(0,1fr);gap:16px;padding:26px 0;border-bottom:1px solid rgba(51,164,116,0.18);}
/* Une réponse est simplement DÉCALÉE : aucun filet à sa gauche. */
.pt .com.reponse{margin-left:56px;}
.pt .com-tete{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap;}
.pt .com-pseudo{font-size:15.5px;font-weight:700;color:var(--noir);}
.pt .com-type{font-size:12.5px;color:var(--gris);}
.pt .com-date{margin-left:auto;font-size:12.5px;color:var(--gris);}
.pt .com-texte{margin-top:8px;font-size:15.5px;line-height:1.65;color:var(--noir);text-wrap:pretty;}
.pt .com-actions{display:flex;align-items:center;gap:20px;margin-top:12px;}
.pt .com-action{display:flex;align-items:center;gap:7px;background:none;border:none;padding:0;font:inherit;font-size:13px;color:var(--gris);cursor:pointer;transition:color .2s;}
.pt .com-action:hover{color:var(--noir);}
/* LE J'AIME EST UN CŒUR : contour tant qu'on n'a pas cliqué, plein ensuite.
   Il bat une fois au clic, comme le cœur de la home. */
.pt .com-coeur svg{transition:transform .3s var(--ease);}
/* Aimé : le cœur passe au VERT (demande de Luca), avec son compteur. */
.pt .com-action.aime{color:var(--accent);font-weight:700;}
/* Il ne bat QU'AU CLIC : sans la classe "bat", un cœur déjà posé se rallumerait
   en battant à chaque chargement de page, ce que le site ne fait nulle part. */
.pt .com-action.aime.bat svg{animation:com-bat .45s var(--ease);}
@keyframes com-bat{0%,100%{transform:scale(1);}40%{transform:scale(1.28);}}
.pt .com-action:hover svg{transform:scale(1.12);}
/* SIGNALER : une icône seule, sans le mot, poussée au bout de la rangée. Elle
   passe au rouge au survol — le rouge des messages d'erreur du site (#c0392b),
   pas un rouge inventé. Le libellé reste lisible par les lecteurs d'écran. */
.pt .com-signaler{margin-left:auto;display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;padding:0;background:none;border:none;color:rgba(0,0,0,0.32);cursor:pointer;transition:color .2s,transform .2s var(--ease);}
.pt .com-signaler:hover{color:#c0392b;transform:scale(1.12);}
/* Une fois envoyé : le drapeau reste plein et rouge, et ne se reclique pas. */
.pt .com-signaler.fait{color:#c0392b;cursor:default;}
.pt .com-signaler.fait:hover{transform:none;}
/* Les réponses sont repliées derrière leur nombre, et se baissent au clic. */
.pt .com-replier{display:flex;align-items:center;gap:8px;margin:0 0 0 56px;padding:14px 0;background:none;border:none;font:inherit;font-size:13.5px;font-weight:700;color:var(--noir);cursor:pointer;}
.pt .com-replier .fl{display:inline-flex;transition:transform .3s var(--ease);color:var(--gris);}
.pt .com-replier.ouvert .fl{transform:rotate(180deg);}
.pt .com-replier:hover{opacity:0.65;}
/* ————— Les pages ————— */
.pt .com-pages{display:flex;align-items:center;justify-content:center;gap:18px;margin-top:34px;}
.pt .com-page{font-size:13.5px;color:var(--gris);}
/* Les numéros de page en VERT : exception demandée par Luca, la seule avec
   l'étoile hors des titres. */
.pt .com-page b{color:var(--accent);font-weight:700;}
.pt .com-fleche{width:34px;height:34px;border-radius:999px;border:1px solid rgba(0,0,0,0.14);background:none;color:var(--noir);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:border-color .2s,opacity .2s,transform .2s var(--ease);}
.pt .com-fleche:hover:not(:disabled){border-color:rgba(0,0,0,0.3);transform:scale(1.06);}
.pt .com-fleche:disabled{opacity:0.3;cursor:default;}
.pt .com-annuler{background:none;border:none;padding:0;font:inherit;font-size:13.5px;color:var(--gris);cursor:pointer;}
.pt .com-annuler:hover{color:var(--noir);}
@media (max-width:560px){
  .pt .com.reponse,.pt .com-replier{margin-left:24px;}
  .pt .com-ecrire,.pt .com{grid-template-columns:32px minmax(0,1fr);gap:12px;}
  .pt .com-avatar{width:32px;height:32px;font-size:21px;}
}
`;

const MAXI = 1500;
/** Commentaires par page. Le découpage se fera côté Supabase (range). */
const PAR_PAGE = 5;

/* L'étoile marque l'emplacement de la future illustration, comme dans le
   carrousel des célébrités. Le pseudo reste en paramètre : le jour où chaque
   personne aura son dessin, c'est ici qu'il se branchera, sans toucher au reste. */
function Avatar({ pseudo }: { pseudo: string }) {
  void pseudo;
  return (
    <span className="com-avatar" aria-hidden>
      ★
    </span>
  );
}

/** Le cœur du « j'aime » : contour, puis plein une fois cliqué. */
function Coeur({ plein }: { plein: boolean }) {
  return (
    <svg
      className="com-coeur-svg"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill={plein ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 20.7l-1.45-1.32C5.4 14.76 2 11.67 2 7.9 2 5.1 4.2 3 7 3c1.74 0 3.41.81 4.5 2.09h1C13.59 3.81 15.26 3 17 3c2.8 0 5 2.1 5 4.9 0 3.77-3.4 6.86-8.55 11.49L12 20.7z" />
    </svg>
  );
}

/** Le drapeau du signalement : icône seule, sans le mot. Plein une fois envoyé. */
function Drapeau({ plein = false }: { plein?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill={plein ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 21V4" />
      <path d="M5 4.5h11.5l-2 3.5 2 3.5H5" />
    </svg>
  );
}

/** Le chevron du site, celui des carrousels. */
function Chevron({ sens }: { sens: "bas" | "gauche" | "droite" }) {
  const d =
    sens === "bas" ? "M6 9l6 6 6-6" : sens === "gauche" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6";
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={d} />
    </svg>
  );
}

function Message({
  message,
  reponse = false,
  onRepondre,
  onSignaler,
  signale,
  onConnexion,
}: {
  message: Reponse;
  reponse?: boolean;
  onRepondre?: () => void;
  onSignaler: () => void;
  signale: boolean;
  onConnexion: () => void;
}) {
  const [aime, setAime] = useState(message.aime);
  const [nombre, setNombre] = useState(message.jaime);
  const [bat, setBat] = useState(false);
  const [enVol, setEnVol] = useState(false);

  /* Le cœur change TOUT DE SUITE, sans attendre le serveur : c'est un geste, il
     doit répondre à l'instant. Si l'envoi échoue, on remet exactement l'état
     d'avant — jamais un compteur inventé. */
  const basculer = async () => {
    if (enVol) return;
    const avantAime = aime;
    const avantNombre = nombre;
    setAime(!avantAime);
    setNombre(avantNombre + (avantAime ? -1 : 1));
    setBat(true);
    setEnVol(true);
    try {
      const r = await fetch("/api/commentaires/jaime", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commentaireId: message.id }),
      });
      // Pas de compte : on remet le cœur comme il était et on propose d'entrer.
      if (r.status === 401) {
        setAime(avantAime);
        setNombre(avantNombre);
        onConnexion();
        return;
      }
      const j = (await r.json()) as { aime?: boolean; total?: number };
      if (typeof j.total === "number") {
        setAime(!!j.aime);
        setNombre(j.total);
      } else {
        setAime(avantAime);
        setNombre(avantNombre);
      }
    } catch {
      setAime(avantAime);
      setNombre(avantNombre);
    } finally {
      setEnVol(false);
    }
  };

  return (
    <article className={reponse ? "com reponse" : "com"}>
      <Avatar pseudo={message.pseudo} />
      <div>
        <div className="com-tete">
          <span className="com-pseudo">{message.pseudo}</span>
          <span className="com-type">{message.type}</span>
          <span className="com-date">{message.date}</span>
        </div>
        <p className="com-texte">{message.texte}</p>
        <div className="com-actions">
          <button
            type="button"
            className={
              (aime ? "com-action com-coeur aime" : "com-action com-coeur") +
              (bat ? " bat" : "")
            }
            aria-pressed={aime}
            aria-label={aime ? "Je n'aime plus" : "J'aime"}
            onClick={basculer}
          >
            <Coeur plein={aime} />
            {nombre}
          </button>
          {onRepondre && (
            <button type="button" className="com-action" onClick={onRepondre}>
              Répondre
            </button>
          )}
          <button
            type="button"
            className={signale ? "com-signaler fait" : "com-signaler"}
            aria-label={signale ? "Déjà signalé" : "Signaler ce commentaire"}
            title={signale ? "Déjà signalé" : "Signaler ce commentaire"}
            disabled={signale}
            onClick={onSignaler}
          >
            <Drapeau plein={signale} />
          </button>
        </div>
      </div>
    </article>
  );
}

/**
 * Un commentaire et ses réponses. Les réponses sont REPLIÉES derrière leur
 * nombre, et se baissent au clic, comme partout ailleurs : on ne voit pas dix
 * réponses avant d'avoir demandé à les voir.
 */
function Fil({
  commentaire,
  onRepondre,
  onSignaler,
  signales,
  onConnexion,
}: {
  commentaire: Commentaire;
  onRepondre: () => void;
  onSignaler: (id: string) => void;
  signales: Set<string>;
  onConnexion: () => void;
}) {
  const [ouvert, setOuvert] = useState(false);
  const n = commentaire.reponses.length;
  return (
    <div>
      <Message
        message={commentaire}
        onRepondre={onRepondre}
        onSignaler={() => onSignaler(commentaire.id)}
        signale={signales.has(commentaire.id)}
        onConnexion={onConnexion}
      />
      {n > 0 && (
        <>
          <button
            type="button"
            className={ouvert ? "com-replier ouvert" : "com-replier"}
            aria-expanded={ouvert}
            onClick={() => setOuvert((v) => !v)}
          >
            <span className="fl">
              <Chevron sens="bas" />
            </span>
            {ouvert ? "Masquer les réponses" : n === 1 ? "1 réponse" : `${n} réponses`}
          </button>
          {ouvert &&
            commentaire.reponses.map((r) => (
              <Message
                key={r.id}
                message={r}
                reponse
                onSignaler={() => onSignaler(r.id)}
                signale={signales.has(r.id)}
                onConnexion={onConnexion}
              />
            ))}
        </>
      )}
    </div>
  );
}

export default function Commentaires({ code, fil }: { code: string; fil: string }) {
  const [commentaires, setCommentaires] = useState<Commentaire[]>([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [chargement, setChargement] = useState(true);

  const [texte, setTexte] = useState("");
  const [ecritureOuverte, setEcritureOuverte] = useState(false);
  const [envoi, setEnvoi] = useState(false);
  const [repondreA, setRepondreA] = useState<{ id: string; pseudo: string } | null>(null);
  const [retour, setRetour] = useState<{ etat: string; message: string } | null>(null);

  const [connexionOuverte, setConnexionOuverte] = useState(false);
  /* Le signalement n'a pas besoin de compte : on garde seulement, le temps de
     la visite, les messages déjà signalés, pour ne pas les signaler deux fois. */
  const [aSignaler, setASignaler] = useState<string | null>(null);
  const [signales, setSignales] = useState<Set<string>>(new Set());

  const liste = useRef<HTMLDivElement>(null);
  const zone = useRef<HTMLTextAreaElement>(null);
  const trop = texte.length > MAXI;

  // ---- Lecture -------------------------------------------------------------
  const charger = useCallback(
    async (p: number) => {
      setChargement(true);
      try {
        const r = await fetch(
          `/api/commentaires?fil=${encodeURIComponent(fil)}&page=${p}`
        );
        const j = await r.json();
        setCommentaires(j.commentaires ?? []);
        setTotal(j.total ?? 0);
        setPages(j.pages ?? 1);
      } catch {
        setCommentaires([]);
      } finally {
        setChargement(false);
      }
    },
    [fil]
  );

  useEffect(() => {
    charger(page);
  }, [page, charger]);

  // Changer de page ramène en haut du fil, sinon on reste devant du vide.
  const allerA = (p: number) => {
    setPage(Math.min(pages, Math.max(1, p)));
    liste.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // ---- Écriture ------------------------------------------------------------
  const ouvrirReponse = (id: string, pseudo: string) => {
    setRepondreA({ id, pseudo });
    setEcritureOuverte(true);
    setRetour(null);
    requestAnimationFrame(() => zone.current?.focus());
  };

  const publier = async () => {
    if (envoi || texte.trim().length < 2 || trop) return;
    setEnvoi(true);
    setRetour(null);
    try {
      const r = await fetch("/api/commentaires", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fil, texte, parentId: repondreA?.id ?? null }),
      });
      // Inscrits uniquement : pas de compte, on ouvre la fenêtre de connexion.
      if (r.status === 401) {
        setConnexionOuverte(true);
        return;
      }
      const j = await r.json();
      if (j.etat === "publie") {
        setTexte("");
        setRepondreA(null);
        setEcritureOuverte(false);
        setRetour({ etat: "publie", message: "Ton commentaire est en ligne." });
        setPage(1);
        await charger(1);
        return;
      }
      if (j.etat === "a_revoir") setTexte("");
      setRetour({ etat: j.etat ?? "refuse", message: j.message ?? "Envoi impossible." });
    } catch {
      setRetour({ etat: "refuse", message: "Envoi impossible, réessaie." });
    } finally {
      setEnvoi(false);
    }
  };

  return (
    <section className="commentaires" aria-label="Commentaires">
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />
      {/* Titre descriptif : il reste noir, comme tous les titres sans chute. */}
      <div className="com-tete-section">
        <h2>Commentaires&nbsp;:</h2>
        <button
          type="button"
          className={ecritureOuverte ? "com-ouvrir ouvert" : "com-ouvrir"}
          aria-expanded={ecritureOuverte}
          onClick={() => setEcritureOuverte((v) => !v)}
        >
          Écrire un commentaire
          <span className="fl">
            <Chevron sens="bas" />
          </span>
        </button>
      </div>

      {ecritureOuverte && (
        <div className="com-ecrire">
          <Avatar pseudo="?" />
          <div>
            {repondreA && (
              <p className="com-reponse-a">
                En réponse à <b>{repondreA.pseudo}</b>
                <button type="button" className="com-annuler" onClick={() => setRepondreA(null)}>
                  annuler
                </button>
              </p>
            )}
            <textarea
              ref={zone}
              className="com-zone"
              autoFocus
              placeholder={
                repondreA
                  ? `Ta réponse à ${repondreA.pseudo}…`
                  : `Ce que la description ${code} t'inspire…`
              }
              value={texte}
              onChange={(e) => setTexte(e.target.value)}
            />
            <div className="com-pied">
              <span className={trop ? "com-compte trop" : "com-compte"}>
                {texte.length} / {MAXI}
              </span>
              <button
                type="button"
                className="com-publier"
                onClick={publier}
                disabled={envoi || texte.trim().length < 2 || trop}
              >
                {envoi ? "Envoi…" : "Publier"}
              </button>
            </div>
          </div>
          <p className="com-note">
            Chaque message passe par plusieurs contrôles automatiques avant
            d&apos;être publié.
          </p>
        </div>
      )}

      {retour && (
        <p className={retour.etat === "publie" ? "com-retour ok" : "com-retour"}>
          {retour.message}
        </p>
      )}

      <div className="com-barre" ref={liste}>
        {total} commentaire{total > 1 ? "s" : ""}
      </div>

      {chargement && <p className="com-vide">Chargement…</p>}

      {!chargement && commentaires.length === 0 && (
        <p className="com-vide">
          Personne n&apos;a encore écrit ici. À toi de commencer.
        </p>
      )}

      {commentaires.map((c) => (
        <Fil
          key={c.id}
          commentaire={c}
          onRepondre={() => ouvrirReponse(c.id, c.pseudo)}
          onSignaler={setASignaler}
          signales={signales}
          onConnexion={() => setConnexionOuverte(true)}
        />
      ))}

      <nav className="com-pages" aria-label="Pages de commentaires">
        <button
          type="button"
          className="com-fleche"
          aria-label="Page précédente"
          disabled={page <= 1}
          onClick={() => allerA(page - 1)}
        >
          <Chevron sens="gauche" />
        </button>
        <span className="com-page">
          Page <b>{page}</b> sur <b>{pages}</b>
        </span>
        <button
          type="button"
          className="com-fleche"
          aria-label="Page suivante"
          disabled={page >= pages}
          onClick={() => allerA(page + 1)}
        >
          <Chevron sens="droite" />
        </button>
      </nav>

      <FenetreConnexion open={connexionOuverte} onClose={() => setConnexionOuverte(false)} />

      <FenetreSignalement
        ouvert={aSignaler !== null}
        onFermer={() => setASignaler(null)}
        onEnvoyer={(motif: MotifSignalement, precision: string) => {
          /* Le signalement part au serveur, qui l'enregistre et lance le second
             examen. On ne montre AUCUN résultat à celui qui signale : savoir si
             son signalement « a marché » lui apprendrait à contourner l'examen.
             Le drapeau se remplit, c'est tout. */
          const id = aSignaler;
          if (!id) return;
          setSignales((s) => new Set(s).add(id));
          void fetch("/api/commentaires/signalement", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ commentaireId: id, motif, detail: precision }),
          }).catch(() => {});
        }}
      />
    </section>
  );
}
