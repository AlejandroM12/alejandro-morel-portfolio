import type { Locale } from "@/i18n/routing";

export type Localized = Record<Locale, string>;

export function text(value: Localized, locale: string): string {
  if (locale === "en") {
    return value.en || value.es;
  }

  return value.es || value.en;
}

export const profileLinks = {
  email: "",
  linkedin: "",
  cvHref: "",
};

export const heroTechnologies: Localized[] = [
  { es: "React", en: "React" },
  { es: "Next.js", en: "Next.js" },
  { es: "TypeScript", en: "TypeScript" },
  { es: "NestJS", en: "NestJS" },
  { es: "IA aplicada", en: "Applied AI" },
];

export const experience = [
  {
    id: "itti",
    organization: "itti",
    role: { es: "", en: "" },
    period: "",
  },
  {
    id: "banza",
    organization: "Banza",
    role: { es: "", en: "" },
    period: "",
  },
  {
    id: "freelance",
    organization: "Freelance",
    role: { es: "", en: "" },
    period: "",
  },
] as const;

export const skillGroups = [
  {
    id: "frontend",
    label: { es: "Frontend", en: "Frontend" },
    items: [
      { es: "React", en: "React" },
      { es: "Next.js", en: "Next.js" },
      { es: "TypeScript", en: "TypeScript" },
    ],
  },
  {
    id: "backend",
    label: { es: "Backend", en: "Backend" },
    items: [
      { es: "NestJS", en: "NestJS" },
      { es: "TypeScript", en: "TypeScript" },
    ],
  },
  {
    id: "ai",
    label: { es: "IA y automatización", en: "AI & Automation" },
    items: [{ es: "IA aplicada", en: "Applied AI" }],
  },
  {
    id: "infrastructure",
    label: { es: "Infraestructura", en: "Infrastructure" },
    items: [] as Localized[],
  },
] as const;
