"use client";

import { useEffect } from "react";

// Au chargement de la page (y compris au rafraîchissement), on remonte en haut du rapport.
// On désactive la restauration de scroll du navigateur le temps de la page, puis on la rétablit.
export default function ScrollHaut() {
  useEffect(() => {
    const prev = "scrollRestoration" in history ? history.scrollRestoration : "auto";
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    return () => {
      if ("scrollRestoration" in history) history.scrollRestoration = prev;
    };
  }, []);
  return null;
}
