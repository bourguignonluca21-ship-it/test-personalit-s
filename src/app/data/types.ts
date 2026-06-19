// =============================================================================
// SOURCE DE VÉRITÉ — les 16 types de personnalité + les 4 rôles.
// Utilisé par la navbar, le hub /types-de-personnalite et les pages [code].
// =============================================================================

export type RoleKey = "analystes" | "diplomates" | "sentinelles" | "explorateurs";

export interface Role {
  key: RoleKey;
  name: string;
  letters: string;
  description: string;
  color: string;
  soft: string;
}

export interface PersonalityType {
  code: string;
  slug: string;
  name: string;
  role: RoleKey;
  variants: string;
  tagline: string;
}

export const ROLES: Record<RoleKey, Role> = {
  analystes: {
    key: "analystes",
    name: "Les analystes",
    letters: "_NT_",
    description:
      "Types Intuitif (N) et Rationnel (T), reconnus pour leur rationalité, leur impartialité et leur excellence intellectuelle.",
    color: "rgba(136,97,154,0.75)",
    soft: "#f3eef6",
  },
  diplomates: {
    key: "diplomates",
    name: "Les diplomates",
    letters: "_NF_",
    description:
      "Types Intuitif (N) et Sensible (F), connus pour leur empathie, leurs compétences diplomatiques et leur idéalisme passionné.",
    color: "rgba(51,164,116,0.75)",
    soft: "#eef8f3",
  },
  sentinelles: {
    key: "sentinelles",
    name: "Les sentinelles",
    letters: "_S_J",
    description:
      "Types Observateur (S) et Organisé (J), connus pour leur sens pratique et leur attachement à l'ordre, à la sécurité et à la stabilité.",
    color: "rgba(66,152,180,0.75)",
    soft: "#eef7fa",
  },
  explorateurs: {
    key: "explorateurs",
    name: "Les explorateurs",
    letters: "_S_P",
    description:
      "Types Observateur (S) et Prospectif (P), connus pour leur spontanéité, leur ingéniosité et leur flexibilité.",
    color: "rgba(228,174,58,0.75)",
    soft: "#fdf6e8",
  },
};

export const TYPES: PersonalityType[] = [
  { code: "INTJ", slug: "intj", name: "Architecte", role: "analystes", variants: "INTJ-A / INTJ-T", tagline: "Esprits imaginatifs et stratèges, avec un plan pour tout." },
  { code: "INTP", slug: "intp", name: "Logicien", role: "analystes", variants: "INTP-A / INTP-T", tagline: "Inventeurs innovants avec une soif de connaissance insatiable." },
  { code: "ENTJ", slug: "entj", name: "Commandant", role: "analystes", variants: "ENTJ-A / ENTJ-T", tagline: "Dirigeants audacieux et pleins de volonté, qui trouvent toujours un moyen — ou le créent." },
  { code: "ENTP", slug: "entp", name: "Innovateur", role: "analystes", variants: "ENTP-A / ENTP-T", tagline: "Esprits astucieux et curieux, incapables de résister à un défi intellectuel." },
  { code: "INFJ", slug: "infj", name: "Avocat", role: "diplomates", variants: "INFJ-A / INFJ-T", tagline: "Discrets et mystiques, source d'inspiration et idéalistes infatigables." },
  { code: "INFP", slug: "infp", name: "Médiateur", role: "diplomates", variants: "INFP-A / INFP-T", tagline: "Personnes poétiques, bienveillantes et altruistes, prêtes à aider une bonne cause." },
  { code: "ENFJ", slug: "enfj", name: "Protagoniste", role: "diplomates", variants: "ENFJ-A / ENFJ-T", tagline: "Leaders charismatiques et inspirants, capables de captiver leur public." },
  { code: "ENFP", slug: "enfp", name: "Inspirateur", role: "diplomates", variants: "ENFP-A / ENFP-T", tagline: "Esprits libres enthousiastes, créatifs et sociables, qui trouvent une raison de sourire." },
  { code: "ISTJ", slug: "istj", name: "Logisticien", role: "sentinelles", variants: "ISTJ-A / ISTJ-T", tagline: "Personnes pragmatiques et attentives aux faits, fiables en toute confiance." },
  { code: "ISFJ", slug: "isfj", name: "Défenseur", role: "sentinelles", variants: "ISFJ-A / ISFJ-T", tagline: "Protecteurs dévoués et chaleureux, toujours prêts à défendre leurs proches." },
  { code: "ESTJ", slug: "estj", name: "Directeur", role: "sentinelles", variants: "ESTJ-A / ESTJ-T", tagline: "Excellents gestionnaires, d'une efficacité inégalée pour gérer situations et gens." },
  { code: "ESFJ", slug: "esfj", name: "Consul", role: "sentinelles", variants: "ESFJ-A / ESFJ-T", tagline: "Personnes attentionnées, sociables et populaires, toujours prêtes à aider." },
  { code: "ISTP", slug: "istp", name: "Virtuose", role: "explorateurs", variants: "ISTP-A / ISTP-T", tagline: "Expérimentateurs hardis et pragmatiques, maîtres de toutes sortes d'outils." },
  { code: "ISFP", slug: "isfp", name: "Aventurier", role: "explorateurs", variants: "ISFP-A / ISFP-T", tagline: "Artistes flexibles et charmants, prêts à explorer et vivre de nouvelles expériences." },
  { code: "ESTP", slug: "estp", name: "Entrepreneur", role: "explorateurs", variants: "ESTP-A / ESTP-T", tagline: "Personnes intelligentes et perspicaces, qui aiment vivre sur le fil du rasoir." },
  { code: "ESFP", slug: "esfp", name: "Amuseur", role: "explorateurs", variants: "ESFP-A / ESFP-T", tagline: "Personnes spontanées et enthousiastes : on ne s'ennuie jamais avec elles." },
];

export const ROLE_ORDER: RoleKey[] = ["analystes", "diplomates", "sentinelles", "explorateurs"];

export function typesByRole(role: RoleKey): PersonalityType[] {
  return TYPES.filter((t) => t.role === role);
}

export function getType(slug: string): PersonalityType | undefined {
  return TYPES.find((t) => t.slug === slug.toLowerCase());
}

export function getTypeByCode(code: string): PersonalityType | undefined {
  return TYPES.find((t) => t.code === code.toUpperCase());
}

export const TYPE_SECTIONS = [
  { id: "introduction", label: "Introduction" },
  { id: "forces-faiblesses", label: "Forces & faiblesses" },
  { id: "relations-amoureuses", label: "Relations amoureuses" },
  { id: "amities", label: "Amitiés" },
  { id: "carriere", label: "Parcours de carrière" },
  { id: "habitudes-travail", label: "Habitudes au travail" },
  { id: "conclusion", label: "Conclusion" },
] as const;
