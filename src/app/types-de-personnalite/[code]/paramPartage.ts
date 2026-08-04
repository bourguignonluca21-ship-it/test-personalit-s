// Le paramètre de reconnaissance d'un lien partagé.
//
// ⚠️ Il vit dans un module NEUTRE (ni serveur, ni "use client") parce qu'il est
// lu des deux côtés : par SectionPartage (serveur, qui fabrique le lien) et par
// FenetreProche (client, qui décide d'ouvrir la fenêtre). Une constante exportée
// depuis un module "use client" et importée côté serveur est remplacée par un
// proxy de fonction : le lien produit contenait alors du charabia.
export const PARAM_PARTAGE = "de";
export const VALEUR_PARTAGE = "proche";
