import PartageInline from "../../components/PartageInline";
import { PARAM_PARTAGE, VALEUR_PARTAGE } from "./paramPartage";

// =============================================================================
// LE BLOC DE PARTAGE des pages de type, sous le carrousel des célébrités.
//
// La rangée d'icônes est celle du site (components/PartageInline), reprise
// telle quelle : rien n'est réécrit ici. On lui passe seulement le lien de LA
// page courante, avec le paramètre de reconnaissance qui ouvre la fenêtre
// d'accueil chez celui qui reçoit le lien (voir FenetreProche).
//
// Mise en page : la colonne 768 des actes, titre en deux temps, fond blanc,
// aucune bande teintée ni carte encadrée.
// =============================================================================

export default function SectionPartage({
  chemin,
  code,
}: {
  /* Chemin exact de la page (ex. /types-de-personnalite/enfp/amities) */
  chemin: string;
  code: string;
}) {
  const lien = `${chemin}?${PARAM_PARTAGE}=${VALEUR_PARTAGE}`;
  return (
    <section className="partage" aria-label="Partager cette page">
      <h2>
        Et tes proches,
        <br />
        <span className="vert">qui sont-ils vraiment&nbsp;?</span>
      </h2>
      <div className="argument">
        <div className="ligne">
          Si quelqu&apos;un t&apos;est venu en tête pendant ta lecture,
          envoie-lui cette page. Le lien ouvre exactement ce que tu viens de
          lire.
        </div>
      </div>
      <div className="rangee">
        <PartageInline
          code={code}
          nomVariante=""
          lien={lien}
          message={`Je suis tombé sur cette description de la personnalité ${code}, elle m'a fait penser à toi :`}
          texteQR="Scanne ce code avec ton téléphone pour ouvrir le partage et envoyer cette page à tes proches."
          fleches="aucune"
          defileAuto
        />
      </div>
    </section>
  );
}
