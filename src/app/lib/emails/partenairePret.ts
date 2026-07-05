// Visuel du mail envoyé à l'INVITEUR quand son ou sa partenaire (invité par
// le lien du parcours à deux) a terminé son test. Même gabarit léger façon
// Apple que rapportPartage.ts. Le bouton mène DIRECTEMENT à la partie
// Relations du profil (/profil?onglet=relations).

export function sujetPartenairePret(): string {
  return "Ton ou ta partenaire a fait son test";
}

// nomType : ex. « Médiateur ». code : ex. « INFP ». nomVariante : ex. « le Poète ».
// url : lien complet vers /profil?onglet=relations.
export function htmlPartenairePret(params: {
  nomType: string;
  code: string;
  nomVariante: string;
  url: string;
}): string {
  const { nomType, code, nomVariante, url } = params;
  const green = "rgba(51,164,116,0.85)";
  return `
    <div style="background:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:rgba(0,0,0,0.80);padding:8px">
      <div style="max-width:480px;margin:0 auto;padding:8px 12px">
        <div style="text-align:center;padding:18px 0 30px">
          <span style="display:inline-block;font-size:11px;letter-spacing:0.18em;color:rgba(0,0,0,0.30);font-weight:600;text-transform:uppercase">Ton logo</span>
        </div>
        <h1 style="margin:0 0 12px;text-align:center;font-size:23px;line-height:1.3;font-weight:700;color:rgba(0,0,0,0.85)">Son portrait est prêt.</h1>
        <p style="margin:0 0 28px;text-align:center;font-size:15px;line-height:1.65;color:rgba(0,0,0,0.55)">Ton ou ta partenaire a terminé son test. Son profil t'attend dans ta partie Relations : votre parcours à deux peut commencer.</p>
        <div style="background:rgba(51,164,116,0.06);border-radius:16px;padding:26px 22px;text-align:center;margin:0 0 28px">
          <p style="margin:0 0 6px;font-size:22px;font-weight:800;color:rgba(0,0,0,0.85)">${nomType}</p>
          <p style="margin:0;font-size:15px;font-weight:600;letter-spacing:0.02em;color:${green}">${code} · ${nomVariante}</p>
        </div>
        <div style="text-align:center;margin:0 0 30px">
          <a href="${url}" style="display:inline-block;background:${green};color:#ffffff;text-decoration:none;font-size:15px;font-weight:600;padding:14px 28px;border-radius:999px">Voir sa personnalit&eacute;</a>
        </div>
        <div style="height:1px;background:rgba(0,0,0,0.08);margin:0 0 24px"></div>
        <p style="margin:0 0 4px;text-align:center;font-size:12px;color:rgba(0,0,0,0.40)">Tu re&ccedil;ois cet email parce que tu as invit&eacute; ton ou ta partenaire &agrave; faire le test.</p>
        <p style="margin:0;text-align:center;font-size:12px;color:rgba(0,0,0,0.30)">Test de personnalit&eacute;</p>
      </div>
    </div>`;
}
