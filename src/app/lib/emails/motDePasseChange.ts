// Source unique du mail de sécurité « mot de passe changé ».
// Utilisé à la fois par la route d'envoi (Resend) et par la page d'aperçu /apercu-mail.
// On garde des styles INLINE (obligatoire pour les emails) et un HTML simple.

export const SUJET_MOT_DE_PASSE_CHANGE = "Ton mot de passe a été changé";

export function htmlMotDePasseChange(): string {
  const green = "rgba(51,164,116,0.85)";
  // Lien du bouton « Sécuriser mon compte » : à remplacer par le vrai domaine à la mise en ligne.
  const lien = "https://ton-site.fr";
  return `
    <div style="background:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:rgba(0,0,0,0.80);padding:8px">
      <div style="max-width:480px;margin:0 auto;padding:8px 12px">
        <div style="text-align:center;padding:18px 0 30px">
          <span style="display:inline-block;font-size:11px;letter-spacing:0.18em;color:rgba(0,0,0,0.30);font-weight:600;text-transform:uppercase">Ton logo</span>
        </div>
        <h1 style="margin:0 0 16px;text-align:center;font-size:23px;line-height:1.3;font-weight:700;color:rgba(0,0,0,0.85)">Ton mot de passe a été changé</h1>
        <p style="margin:0 0 30px;text-align:center;font-size:15px;line-height:1.65;color:rgba(0,0,0,0.55)">On te confirme que le mot de passe de ton compte vient d'être modifié. Si c'est bien toi, tout est en ordre, tu n'as rien à faire.</p>
        <div style="height:1px;background:rgba(0,0,0,0.08);margin:0 0 30px"></div>
        <div style="background:rgba(51,164,116,0.06);border-radius:14px;padding:24px 22px;text-align:center">
          <p style="margin:0 0 6px;font-size:15px;font-weight:700;color:rgba(0,0,0,0.80)">Ce n'était pas toi ?</p>
          <p style="margin:0 0 18px;font-size:13.5px;line-height:1.6;color:rgba(0,0,0,0.55)">Sécurise ton compte en réinitialisant à nouveau ton mot de passe.</p>
          <a href="${lien}" style="display:inline-block;background:${green};color:#ffffff;text-decoration:none;font-size:14.5px;font-weight:700;padding:13px 28px;border-radius:999px">Sécuriser mon compte</a>
        </div>
        <div style="text-align:center;padding:32px 0 8px">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${green}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;margin:0 auto 10px">
            <path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5l8-3z"></path>
            <path d="M9 12l2 2 4-4"></path>
          </svg>
          <p style="margin:0 0 4px;font-size:12px;color:rgba(0,0,0,0.40)">Cet email automatique t'a été envoyé pour la sécurité de ton compte.</p>
          <p style="margin:0;font-size:12px;color:rgba(0,0,0,0.30)">Test de personnalité</p>
        </div>
      </div>
    </div>`;
}
