import { htmlMotDePasseChange, SUJET_MOT_DE_PASSE_CHANGE } from "../lib/emails/motDePasseChange";
import { htmlCodeConnexion, SUJET_CODE_CONNEXION } from "../lib/emails/codeConnexion";

// PAGE TEMPORAIRE d'aperçu des mails (à supprimer une fois les visuels validés).
// Affiche exactement le HTML envoyé, dans un cadre qui imite une boîte mail.
export const metadata = { title: "Aperçu mails (temporaire)" };

function Apercu({ sujet, html }: { sujet: string; html: string }) {
  return (
    <div style={{ maxWidth: 600, margin: "0 auto 48px" }}>
      <p style={{ fontSize: 12, color: "#6b7280", margin: "0 0 6px" }}>Objet :</p>
      <p style={{ fontSize: 15, fontWeight: 700, color: "#111827", margin: "0 0 18px" }}>{sujet}</p>
      <div style={{ background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
}

export default function ApercuMailPage() {
  return (
    <div style={{ background: "#f3f4f6", minHeight: "100vh", padding: "40px 16px" }}>
      <Apercu sujet={SUJET_CODE_CONNEXION} html={htmlCodeConnexion("123456")} />
      <Apercu sujet={SUJET_MOT_DE_PASSE_CHANGE} html={htmlMotDePasseChange()} />
    </div>
  );
}
