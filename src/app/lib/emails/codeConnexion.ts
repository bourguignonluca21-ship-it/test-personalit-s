// Visuel du mail « code de connexion » (OTP). Utilisé par la page d'aperçu /apercu-mail.
// Dans Supabase, on colle le même HTML mais avec {{ .Token }} à la place du code.

export const SUJET_CODE_CONNEXION = "Ton code de connexion";

// `code` : le code affiché (un vrai code pour l'aperçu, ou "{{ .Token }}" pour Supabase).
export function htmlCodeConnexion(code: string): string {
  const green = "rgba(51,164,116,0.85)";
  return `
    <div style="background:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:rgba(0,0,0,0.80);padding:8px">
      <div style="max-width:480px;margin:0 auto;padding:8px 12px">
        <div style="text-align:center;padding:18px 0 30px">
          <span style="display:inline-block;font-size:11px;letter-spacing:0.18em;color:rgba(0,0,0,0.30);font-weight:600;text-transform:uppercase">Ton logo</span>
        </div>
        <h1 style="margin:0 0 16px;text-align:center;font-size:23px;line-height:1.3;font-weight:700;color:rgba(0,0,0,0.85)">Ton code de connexion</h1>
        <p style="margin:0 0 30px;text-align:center;font-size:15px;line-height:1.65;color:rgba(0,0,0,0.55)">Saisis ce code pour vérifier ton identité.</p>
        <div style="height:1px;background:rgba(0,0,0,0.08);margin:0 0 30px"></div>
        <div style="background:rgba(51,164,116,0.06);border-radius:14px;padding:24px 22px;text-align:center">
          <p style="margin:0 0 8px;font-size:13.5px;line-height:1.6;color:rgba(0,0,0,0.55)">Copie le code</p>
          <p style="margin:0 0 8px;font-size:34px;font-weight:800;letter-spacing:8px;color:rgba(0,0,0,0.85)">${code}</p>
          <p style="margin:0;font-size:13.5px;line-height:1.6;color:rgba(0,0,0,0.55)">Ce code expire dans 10 minutes.</p>
        </div>
        <div style="text-align:center;padding:32px 0 8px">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${green}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;margin:0 auto 10px">
            <path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5l8-3z"></path>
            <path d="M9 12l2 2 4-4"></path>
          </svg>
          <p style="margin:0 0 4px;font-size:12px;color:rgba(0,0,0,0.40)">Si tu n'as rien demandé, ignore cet email.</p>
          <p style="margin:0;font-size:12px;color:rgba(0,0,0,0.30)">Test de personnalité</p>
        </div>
      </div>
    </div>`;
}
