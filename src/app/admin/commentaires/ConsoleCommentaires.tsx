"use client";

import { useCallback, useEffect, useState } from "react";

// =============================================================================
// L'ÉCRAN DE MODÉRATION. Volontairement sobre : c'est un outil de travail, pas
// une page du site. Une liste, un motif par message, deux boutons.
//
// LE MOTIF EST LA COLONNE LA PLUS IMPORTANTE : il dit dans quel état d'esprit
// lire. Une CRITIQUE se lit tranquillement. Une DÉTRESSE, c'est quelqu'un qui va
// peut-être mal : elle est remontée en tête de liste et signalée en rouge.
// =============================================================================

type Ligne = {
  id: string;
  fil: string;
  auteur_pseudo: string;
  texte: string;
  etat: string;
  motif_etat: string | null;
  parent_id: string | null;
  cree_le: string;
};

const MOTIFS: Record<string, { libelle: string; couleur: string; aide: string }> = {
  DETRESSE: {
    libelle: "Détresse",
    couleur: "#c0392b",
    aide: "La personne va peut-être mal. À regarder aujourd'hui.",
  },
  "AUTORITES:sexual/minors": {
    libelle: "Signalement autorités",
    couleur: "#c0392b",
    aide: "Contenu impliquant un mineur. Ne pas supprimer en silence : à signaler.",
  },
  DOUTE: { libelle: "Doute", couleur: "#b8860b", aide: "Le classificateur hésite." },
  DENIGREMENT: { libelle: "Dénigrement", couleur: "#8a6d3b", aide: "Moquerie ou attaque gratuite." },
  CRITIQUE: { libelle: "Critique", couleur: "#555", aide: "Jugement négatif sur le site ou le contenu." },
  HORS_SUJET: { libelle: "Hors sujet", couleur: "#555", aide: "Publicité, drague, sans rapport." },
  CONTROLE_INDISPONIBLE: {
    libelle: "Contrôle indisponible",
    couleur: "#b8860b",
    aide: "OpenAI n'a pas répondu : le message n'a été vu par personne.",
  },
  REFUSE_A_LA_MAIN: { libelle: "Refusé par toi", couleur: "#555", aide: "" },
};

const CSS = `
.mod{max-width:900px;margin:0 auto;padding:48px 20px 120px;color:rgba(0,0,0,0.8);}
.mod h1{font-size:30px;font-weight:700;letter-spacing:-0.02em;margin:0 0 6px;}
.mod .sous{font-size:14.5px;color:rgba(0,0,0,0.5);margin:0 0 28px;}
.mod .onglets{display:flex;gap:8px;margin-bottom:24px;}
.mod .onglet{border:1px solid rgba(0,0,0,0.14);background:none;border-radius:999px;padding:7px 16px;font:inherit;font-size:14px;color:rgba(0,0,0,0.6);cursor:pointer;}
.mod .onglet.actif{background:rgba(51,164,116,0.85);border-color:transparent;color:#fff;font-weight:600;}
.mod .vide{font-size:15px;color:rgba(0,0,0,0.5);padding:40px 0;}
.mod .ligne{border-top:1px solid rgba(0,0,0,0.1);padding:22px 0;}
.mod .entete{display:flex;align-items:center;gap:12px;flex-wrap:wrap;font-size:12.5px;color:rgba(0,0,0,0.5);}
.mod .motif{font-weight:700;letter-spacing:0.4px;text-transform:uppercase;font-size:11.5px;}
.mod .pseudo{font-weight:700;color:rgba(0,0,0,0.8);font-size:14px;}
.mod .fil{margin-left:auto;}
.mod .fil a{color:rgba(0,0,0,0.5);text-decoration:underline;}
.mod .aide{margin-top:6px;font-size:12.5px;color:rgba(0,0,0,0.5);font-style:italic;}
.mod .texte{margin-top:10px;font-size:15.5px;line-height:1.6;color:rgba(0,0,0,0.85);white-space:pre-wrap;}
.mod .boutons{display:flex;gap:10px;margin-top:14px;}
.mod button.act{border:none;border-radius:999px;padding:8px 20px;font:inherit;font-size:14px;font-weight:600;cursor:pointer;}
.mod .publier{background:rgba(51,164,116,0.85);color:#fff;}
.mod .refuser{background:none;border:1px solid rgba(0,0,0,0.16);color:rgba(0,0,0,0.6);}
.mod button:disabled{opacity:0.4;cursor:default;}
.mod .reponse{font-size:12px;color:rgba(0,0,0,0.5);}
`;

type Signalement = {
  id: string;
  motif: string;
  detail: string | null;
  verdict: string | null;
  analyse: string | null;
  cree_le: string;
  commentaires: Ligne | null;
};

const MOTIFS_SIGNALEMENT: Record<string, string> = {
  haine: "Haine ou harcèlement",
  sexuel: "Contenu sexuel",
  danger: "Cette personne semble en danger",
  spam: "Spam ou hors sujet",
  autre: "Autre raison",
};

const VERDICTS: Record<string, { libelle: string; couleur: string }> = {
  confirme: { libelle: "Examen : confirmé", couleur: "#c0392b" },
  doute: { libelle: "Examen : doute", couleur: "#b8860b" },
  infonde: { libelle: "Examen : infondé", couleur: "#555" },
};

const ONGLETS: [string, string][] = [
  ["a_revoir", "À revoir"],
  ["signales", "Signalés"],
  ["bloque", "Refusés"],
  ["publie", "Publiés"],
];

export default function ConsoleCommentaires() {
  const [etat, setEtat] = useState("a_revoir");
  const [lignes, setLignes] = useState<Ligne[]>([]);
  const [signalements, setSignalements] = useState<Signalement[]>([]);
  const [chargement, setChargement] = useState(true);
  const [enCours, setEnCours] = useState<string | null>(null);

  const charger = useCallback(async (e: string) => {
    setChargement(true);
    try {
      const r = await fetch(`/api/admin/commentaires?etat=${e}`);
      const j = await r.json();
      setLignes(j.commentaires ?? []);
      setSignalements(j.signalements ?? []);
    } finally {
      setChargement(false);
    }
  }, []);

  useEffect(() => {
    charger(etat);
  }, [etat, charger]);

  const decider = async (
    id: string,
    action: "publier" | "refuser" | "classer",
    idSignalement?: string
  ) => {
    setEnCours(idSignalement ?? id);
    try {
      await fetch("/api/admin/commentaires", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action }),
      });
      setLignes((l) => l.filter((x) => x.id !== id));
      setSignalements((s) =>
        s.filter((x) => (idSignalement ? x.id !== idSignalement : x.commentaires?.id !== id))
      );
    } finally {
      setEnCours(null);
    }
  };

  return (
    <div className="mod">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <h1>Modération des commentaires</h1>
      <p className="sous">
        Les messages arrivés ici n&apos;ont pas été publiés. Rien n&apos;est
        visible sur le site tant que tu n&apos;as pas tranché.
      </p>

      <div className="onglets">
        {ONGLETS.map(([cle, libelle]) => (
          <button
            key={cle}
            type="button"
            className={etat === cle ? "onglet actif" : "onglet"}
            onClick={() => setEtat(cle)}
          >
            {libelle}
          </button>
        ))}
      </div>

      {chargement && <p className="vide">Chargement…</p>}
      {!chargement && etat !== "signales" && lignes.length === 0 && (
        <p className="vide">Rien ici. C&apos;est une bonne nouvelle.</p>
      )}
      {!chargement && etat === "signales" && signalements.length === 0 && (
        <p className="vide">Aucun signalement en attente.</p>
      )}

      {etat === "signales" &&
        signalements.map((s) => {
          const c = s.commentaires;
          const v = VERDICTS[s.verdict ?? ""] ?? { libelle: "Examen en cours", couleur: "#555" };
          return (
            <div className="ligne" key={s.id}>
              <div className="entete">
                <span className="motif" style={{ color: v.couleur }}>
                  {v.libelle}
                </span>
                <span>{MOTIFS_SIGNALEMENT[s.motif] ?? s.motif}</span>
                <span>{new Date(s.cree_le).toLocaleString("fr-FR")}</span>
                {c && (
                  <span className="fil">
                    <a href={c.fil} target="_blank" rel="noopener noreferrer">
                      {c.fil}
                    </a>
                  </span>
                )}
              </div>
              {s.analyse && <div className="aide">{s.analyse}</div>}
              {s.detail && <div className="aide">Précision : « {s.detail} »</div>}
              <p className="texte">
                {c ? c.texte : "Le commentaire a été supprimé."}
              </p>
              {c && (
                <div className="entete" style={{ marginTop: 8 }}>
                  <span className="pseudo">{c.auteur_pseudo}</span>
                  <span>
                    {c.etat === "publie" ? "toujours en ligne" : "retiré du site"}
                  </span>
                </div>
              )}
              <div className="boutons">
                {c && c.etat !== "bloque" && (
                  <button
                    type="button"
                    className="act refuser"
                    disabled={enCours === s.id}
                    onClick={() => decider(c.id, "refuser", s.id)}
                  >
                    Retirer le commentaire
                  </button>
                )}
                {c && c.etat !== "publie" && (
                  <button
                    type="button"
                    className="act publier"
                    disabled={enCours === s.id}
                    onClick={() => decider(c.id, "publier", s.id)}
                  >
                    Remettre en ligne
                  </button>
                )}
                <button
                  type="button"
                  className="act refuser"
                  disabled={enCours === s.id}
                  onClick={() => decider(s.id, "classer", s.id)}
                >
                  Classer sans suite
                </button>
              </div>
            </div>
          );
        })}

      {etat !== "signales" && lignes.map((l) => {
        const m = MOTIFS[l.motif_etat ?? ""] ?? {
          libelle: l.motif_etat ?? "—",
          couleur: "#555",
          aide: "",
        };
        return (
          <div className="ligne" key={l.id}>
            <div className="entete">
              <span className="motif" style={{ color: m.couleur }}>
                {m.libelle}
              </span>
              <span className="pseudo">{l.auteur_pseudo}</span>
              <span>{new Date(l.cree_le).toLocaleString("fr-FR")}</span>
              {l.parent_id && <span className="reponse">réponse</span>}
              <span className="fil">
                <a href={l.fil} target="_blank" rel="noopener noreferrer">
                  {l.fil}
                </a>
              </span>
            </div>
            {m.aide && <div className="aide">{m.aide}</div>}
            <p className="texte">{l.texte}</p>
            <div className="boutons">
              {l.etat !== "publie" && (
                <button
                  type="button"
                  className="act publier"
                  disabled={enCours === l.id}
                  onClick={() => decider(l.id, "publier")}
                >
                  Publier
                </button>
              )}
              {l.etat !== "bloque" && (
                <button
                  type="button"
                  className="act refuser"
                  disabled={enCours === l.id}
                  onClick={() => decider(l.id, "refuser")}
                >
                  Refuser
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
