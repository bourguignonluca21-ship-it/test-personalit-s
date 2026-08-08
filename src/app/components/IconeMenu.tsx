"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import type { LottieRefCurrentProps } from "lottie-react";

/*
 * L'icône « menu » du coin droit de la navbar : trois traits noirs qui se
 * tracent. Même principe que les autres animations du site — le fichier est
 * demandé au serveur après l'affichage, jamais embarqué dans le paquet de la
 * navbar, qui est chargée sur toutes les pages.
 *
 * Le fichier va plus loin que ce qu'on lui demande : il trace les traits
 * (images 0 à 50), les tient (50 à 80), puis les efface (80 à 118). Ici les
 * traits ne doivent jamais disparaître : on se repose sur l'image 65, traits
 * entiers, et le survol rejoue le tracé depuis le début.
 */

const FICHIER = "/animations/menu-oikos.json";
const TAILLE_PAR_DEFAUT = 40;

const REPOS = 65;
const TRACE: [number, number] = [0, 65];

/* Le dessin de secours, le temps que le fichier arrive : mêmes trois traits,
   pour qu'aucun trou ni aucun décalage n'apparaisse. */
function TroisTraits({ taille }: { taille: number }) {
  return (
    <svg width={taille} height={taille} viewBox="0 0 40 40" aria-hidden>
      {[14, 20, 26].map((y) => (
        <rect key={y} x="5" y={y - 1.4} width="30" height="2.8" rx="1.4" fill="#000" />
      ))}
    </svg>
  );
}

export default function IconeMenu({
  anime,
  taille = TAILLE_PAR_DEFAUT,
}: {
  anime: boolean;
  taille?: number;
}) {
  const [donnees, setDonnees] = useState<object | null>(null);
  const lottie = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    let vivant = true;
    fetch(FICHIER)
      .then((r) => r.json())
      .then((d) => {
        if (vivant) setDonnees(d);
      })
      .catch(() => {
        /* pas d'animation : les trois traits dessinés restent */
      });
    return () => {
      vivant = false;
    };
  }, []);

  const appliquer = useCallback(() => {
    const l = lottie.current;
    if (!l) return;
    if (anime) l.playSegments(TRACE, true);
    else l.goToAndStop(REPOS, true);
  }, [anime]);

  useEffect(appliquer, [appliquer, donnees]);

  if (!donnees) return <TroisTraits taille={taille} />;

  return (
    <Lottie
      lottieRef={lottie}
      animationData={donnees}
      loop={false}
      autoplay={false}
      onDOMLoaded={appliquer}
      style={{ width: taille, height: taille, display: "block" }}
      aria-hidden
    />
  );
}
