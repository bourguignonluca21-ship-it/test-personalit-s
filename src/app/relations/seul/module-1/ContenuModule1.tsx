"use client";

/*
 * CONTENU DU MODULE 1 (composant partagé) : les 3 temps validés —
 * 1. la LECTURE personnalisée, 2. l'EXERCICE d'introspection (réponse
 * écrite), 3. la MICRO-ACTION à tenter dans la vraie vie.
 * Utilisé par la page /relations/seul/module-1 ET par la fenêtre du
 * parcours (profil/FenetreParcours.tsx), où le module s'ouvre sans
 * quitter la page.
 * Le TEXTE est un ÉCHANTILLON (ton INFP, façon rapport) pour juger le
 * rendu — les briques réelles et l'enregistrement des réponses viendront.
 */

const VERT = "rgba(51,164,116,0.85)";
const INK = "rgba(0,0,0,0.75)";

export default function ContenuModule1({
  onTerminer,
}: {
  /* Fourni par la fenêtre du parcours : déclenche l'animation de validation
     (coche verte) puis le retour au chemin. Absent sur la page directe :
     le bouton reste visuel. */
  onTerminer?: () => void;
} = {}) {
  return (
    <div>
      {/* 1. La lecture (personnalisée par le profil). Texte JUSTIFIÉ :
          collé aux marges gauche ET droite, les mêmes que le bloc exercice
          en dessous (demande Luca). */}
      <div className="prose-sm leading-relaxed text-gray-600 text-justify">
        <p>
          Tout le monde n&apos;attend pas la même chose d&apos;une relation.
          Toi, tu ne cherches pas de la compagnie : tu cherches de la
          profondeur. Un lien qui reste en surface te laisse plus seul que la
          solitude elle-même, et c&apos;est pour ça que tu peux être entouré
          et te sentir vide, ou avec une seule personne et te sentir comblé.
        </p>
        <p className="mt-4">
          Ce besoin a une force : quand quelqu&apos;un entre vraiment dans ton
          monde, tu offres une qualité de présence rare. Et il a un revers :
          tu peux attendre de chaque lien qu&apos;il soit total, et
          t&apos;épuiser à chercher chez une personne ce qu&apos;aucune ne
          peut donner seule. Le voir, c&apos;est déjà commencer à choisir tes
          liens autrement.
        </p>
      </div>

      {/* 2. L'exercice d'introspection */}
      <div className="mt-10 rounded-2xl p-7" style={{ background: "rgba(51,164,116,0.06)" }}>
        <p className="text-lg font-bold" style={{ color: INK }}>
          Pense aux deux relations qui t&apos;ont fait le plus de bien.
          <br />
          Qu&apos;avaient-elles en commun ?
        </p>
        {/* Placeholder en italique (le texte tapé par le client reste droit) */}
        <style>{`.cm1-zone::placeholder{font-style:italic}`}</style>
        <textarea
          rows={5}
          placeholder="Écris librement, c'est pour toi…"
          className="cm1-zone mt-4 w-full rounded-2xl border bg-white p-4 text-sm leading-relaxed outline-none"
          style={{ borderColor: "rgba(0,0,0,0.12)", color: INK, resize: "vertical" }}
        />
      </div>

      {/* 3. La micro-action */}
      <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-7 shadow-sm">
        <p className="text-sm font-semibold" style={{ color: VERT }}>
          Si tu le souhaites, avant le prochain module :
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">
          Cette semaine, repère UN moment où un échange reste en surface alors
          que tu voudrais plus. Ne change rien, note juste ce que ça te fait.
          C&apos;est tout.
        </p>
      </div>

      {/* Valider le module (visuel seul pour l'instant). Bouton à la taille
          du texte, centré. */}
      <div className="mt-10 text-center">
        <button
          type="button"
          onClick={onTerminer}
          className="rounded-full px-7 py-3.5 text-base font-semibold text-white transition-transform hover:scale-105 cursor-pointer"
          style={{ background: VERT }}
        >
          J&apos;ai terminé ce module
        </button>
      </div>
    </div>
  );
}
