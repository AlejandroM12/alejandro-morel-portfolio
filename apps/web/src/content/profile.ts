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

const react = { es: "React", en: "React" } satisfies Localized;
const nextjs = { es: "Next.js", en: "Next.js" } satisfies Localized;
const typescript = { es: "TypeScript", en: "TypeScript" } satisfies Localized;
const nestjs = { es: "NestJS", en: "NestJS" } satisfies Localized;
const reactNative = {
  es: "React Native",
  en: "React Native",
} satisfies Localized;

export const heroStack = [
  {
    id: "core",
    label: { es: "Núcleo", en: "Core" },
    items: [react, nextjs, typescript, nestjs],
  },
  {
    id: "current",
    label: { es: "También trabajo con", en: "Currently working with" },
    items: [reactNative],
  },
  {
    id: "expanding",
    label: { es: "En expansión", en: "Currently expanding" },
    items: [{ es: "IA aplicada", en: "Applied AI" }],
  },
] as const;

export const knowsAbout: Localized[] = [
  react,
  nextjs,
  typescript,
  nestjs,
  reactNative,
  { es: "Testing", en: "Testing" },
  { es: "Arquitectura", en: "Architecture" },
  { es: "Performance", en: "Performance" },
  { es: "Observabilidad", en: "Observability" },
  { es: "IA aplicada", en: "Applied AI" },
  { es: "LLMs", en: "LLMs" },
  { es: "RAG", en: "RAG" },
  { es: "Agentes de IA", en: "AI Agents" },
  { es: "Automatización", en: "Automation" },
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
    id: "web",
    label: { es: "Web", en: "Web" },
    items: [react, nextjs, typescript],
  },
  {
    id: "backend",
    label: { es: "Backend", en: "Backend" },
    items: [nestjs, { es: "BFF", en: "BFF" }, { es: "APIs", en: "APIs" }],
  },
  {
    id: "mobile",
    label: { es: "Mobile", en: "Mobile" },
    items: [reactNative],
  },
  {
    id: "engineering",
    label: { es: "Ingeniería", en: "Engineering" },
    items: [
      { es: "Testing", en: "Testing" },
      { es: "Arquitectura", en: "Architecture" },
      { es: "Performance", en: "Performance" },
      { es: "Observabilidad", en: "Observability" },
    ],
  },
  {
    id: "expanding",
    label: { es: "En expansión", en: "Currently expanding" },
    items: [
      { es: "IA aplicada", en: "Applied AI" },
      { es: "LLMs", en: "LLMs" },
      { es: "RAG", en: "RAG" },
      { es: "Agentes de IA", en: "AI Agents" },
      { es: "Automatización", en: "Automation" },
    ],
  },
] as const;
