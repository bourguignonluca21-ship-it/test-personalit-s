// Visuel du mail envoyé après le test : léger, façon Apple, avec le type + la variante
// et un bouton vers la page publique partageable /p/{slug} (le « résumé de partage »).

export function sujetRapportPartage(code: string, nomVariante: string): string {
  return `Ton profil : ${code} · ${nomVariante}`;
}

// nomType : ex. « Médiateur ». code : ex. « INFP ». nomVariante : ex. « le Poète ». url : lien /p complet.
export function htmlRapportPartage(params: {
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
        <h1 style="margin:0 0 12px;text-align:center;font-size:23px;line-height:1.3;font-weight:700;color:rgba(0,0,0,0.85)">Ton portrait est prêt.</h1>
        <p style="margin:0 0 28px;text-align:center;font-size:15px;line-height:1.65;color:rgba(0,0,0,0.55)">Voici ton profil, à découvrir et à partager avec tes proches.</p>
        <div style="background:rgba(51,164,116,0.06);border-radius:16px;padding:26px 22px;text-align:center;margin:0 0 28px">
          <p style="margin:0 0 6px;font-size:22px;font-weight:800;color:rgba(0,0,0,0.85)">${nomType}</p>
          <p style="margin:0;font-size:15px;font-weight:600;letter-spacing:0.02em;color:${green}">${code} · ${nomVariante}</p>
        </div>
        <div style="text-align:center;margin:0 0 30px">
          <a href="${url}" style="display:inline-block;background:${green};color:#ffffff;text-decoration:none;font-size:15px;font-weight:600;padding:14px 28px;border-radius:999px">Voir &amp; partager mon profil</a>
        </div>
        <div style="height:1px;background:rgba(0,0,0,0.08);margin:0 0 24px"></div>
        <p style="margin:0 0 4px;text-align:center;font-size:12px;color:rgba(0,0,0,0.40)">Tu reçois cet email parce que tu as fait le test de personnalité.</p>
        <p style="margin:0;text-align:center;font-size:12px;color:rgba(0,0,0,0.30)">Test de personnalité</p>
      </div>
    </div>`;
}
