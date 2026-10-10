import type { Locale } from "@/i18n/routing";

export type Localized = Record<Locale, string>;

export function text(value: Localized, locale: string): string {
  if (locale === "en") {
    return value.en || value.es;
  }

  return value.es || value.en;
}

export const profileLinks = {
  email: "alejandro.morel1905@gmail.com",
  linkedin: "https://www.linkedin.com/in/morelalejandro/",
  github: "https://github.com/AlejandroM12/alejandro-morel-portfolio",
  cvHref: "",
};

export const portfolioLenses = ["fullstack", "ai", "freelance"] as const;

export type PortfolioLens = (typeof portfolioLenses)[number];

export const lensEmphasis: Record<PortfolioLens, readonly string[]> = {
  fullstack: ["experience", "engineering", "skills", "work", "expanding"],
  ai: ["expanding", "work", "engineering", "experience", "skills"],
  freelance: ["experience", "engineering", "skills", "work", "expanding"],
};

export const experienceOrder: Record<PortfolioLens, readonly string[]> = {
  fullstack: ["itti", "banza", "freelance", "ache1", "orbit"],
  ai: ["itti", "banza", "freelance", "ache1", "orbit"],
  freelance: ["freelance", "itti", "banza", "ache1", "orbit"],
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
    items: [
      reactNative,
      { es: "BFF", en: "BFF" },
      { es: "APIs", en: "APIs" },
      { es: "Testing", en: "Testing" },
    ],
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
  { es: "BFF", en: "BFF" },
  { es: "APIs", en: "APIs" },
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

const empty = { es: "", en: "" } satisfies Localized;

export const experience = [
  {
    id: "itti",
    organization: "itti",
    role: {
      es: "Ingeniero de software / Desarrollador full stack",
      en: "Software Engineer / Full Stack Developer",
    },
    period: { es: "junio 2025 – actualidad", en: "June 2025 – Present" },
    summary: {
      es: "En itti desarrollo y mantengo funcionalidades web y mobile utilizando React, Next.js, TypeScript y React Native. También desarrollo el BFF con NestJS y TypeScript, integrando servicios y adaptando la información para las aplicaciones. Participo en refinamientos y decisiones técnicas, colaboro con Producto y Diseño, y contribuyo a iniciativas de frontend que involucran a distintos equipos.",
      en: "At itti, I build and maintain web and mobile features using React, Next.js, TypeScript, and React Native. I also develop the BFF with NestJS and TypeScript, integrating services and adapting data for the applications. I take part in refinement and technical decisions, collaborate with Product and Design, and contribute to frontend initiatives involving multiple teams.",
    },
  },
  {
    id: "banza",
    organization: "Adcap Grupo Financiero - Banza",
    role: {
      es: "Desarrollador frontend web y mobile",
      en: "Frontend Web & Mobile Developer",
    },
    period: {
      es: "septiembre 2023 – junio 2025",
      en: "September 2023 – June 2025",
    },
    summary: {
      es: "En un entorno fintech, desarrollé y mantuve funcionalidades en distintas aplicaciones web, incluyendo el backoffice de Producto, herramientas de Atención al Cliente, plataformas para partners y la billetera virtual. En mobile, trabajé con React Native en la aplicación existente de la billetera y en una nueva versión, desarrollando y manteniendo funcionalidades junto con otros desarrolladores.",
      en: "In a fintech setting, I built and maintained features across several web applications, including the Product back office, Customer Support tools, partner platforms, and the virtual wallet. On mobile, I worked in React Native on the existing wallet app and on a new version, building and maintaining features alongside other developers.",
    },
  },
  {
    id: "freelance",
    organization: "Freelance",
    role: {
      es: "Desarrollador web freelance",
      en: "Freelance Web Developer",
    },
    period: { es: "enero 2023 – junio 2025", en: "January 2023 – June 2025" },
    summary: empty,
  },
  {
    id: "ache1",
    organization: "Ache1 Design & Development",
    role: {
      es: "Desarrollador web frontend",
      en: "Frontend Web Developer",
    },
    period: {
      es: "abril 2022 – diciembre 2022",
      en: "April 2022 – December 2022",
    },
    summary: empty,
  },
  {
    id: "orbit",
    organization: "Orbit",
    role: { es: "Desarrollador frontend", en: "Frontend Developer" },
    period: {
      es: "marzo 2022 – diciembre 2022",
      en: "March 2022 – December 2022",
    },
    summary: empty,
  },
] as const;

export const education = [
  {
    id: "fermosa",
    institution: "Instituto Superior Fermosa",
    credential: {
      es: "Técnico superior en desarrollo de software",
      en: "Higher technician degree in software development",
    },
    period: {
      es: "febrero 2019 – diciembre 2021",
      en: "February 2019 – December 2021",
    },
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
