import { text, type Localized } from "@/content/profile";

export const projectCategories = [
  "web",
  "backend",
  "mobile",
  "applied-ai",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export const projectStatuses = ["concept", "in-progress", "shipped"] as const;

export type ProjectStatus = (typeof projectStatuses)[number];

export type ProjectScreenshot = {
  src: string;
  alt: Localized;
};

export type Project = {
  slug: string;
  name: string;
  status: ProjectStatus;
  featured: boolean;
  order: number;
  categories: readonly ProjectCategory[];
  technologies: readonly string[];
  languages: readonly string[];
  summary: Localized;
  overview: Localized;
  problem: Localized;
  solution: Localized;
  features: readonly Localized[];
  architecture: Localized;
  decisions: readonly Localized[];
  screenshots: readonly ProjectScreenshot[];
  demoUrl: string;
  repositoryUrl: string;
};

const empty = { es: "", en: "" } satisfies Localized;

export const projects: readonly Project[] = [
  {
    slug: "flowboard",
    name: "Flowboard",
    status: "concept",
    featured: true,
    order: 1,
    categories: ["web"],
    technologies: [],
    languages: [],
    summary: {
      es: "SaaS de gestión y analítica.",
      en: "A SaaS for management and analytics.",
    },
    overview: {
      es: "SaaS de gestión y analítica.",
      en: "A SaaS for management and analytics.",
    },
    problem: empty,
    solution: empty,
    features: [],
    architecture: empty,
    decisions: [],
    screenshots: [],
    demoUrl: "",
    repositoryUrl: "",
  },
  {
    slug: "documind-ai",
    name: "DocuMind AI",
    status: "concept",
    featured: true,
    order: 2,
    categories: ["applied-ai"],
    technologies: [],
    languages: [],
    summary: {
      es: "Asistente inteligente para consultar documentos utilizando RAG.",
      en: "An intelligent assistant for querying documents with RAG.",
    },
    overview: {
      es: "Asistente inteligente para consultar documentos utilizando RAG.",
      en: "An intelligent assistant for querying documents with RAG.",
    },
    problem: empty,
    solution: empty,
    features: [],
    architecture: empty,
    decisions: [],
    screenshots: [],
    demoUrl: "",
    repositoryUrl: "",
  },
  {
    slug: "automate",
    name: "Automate",
    status: "concept",
    featured: true,
    order: 3,
    categories: ["applied-ai"],
    technologies: [],
    languages: [],
    summary: {
      es: "Plataforma de automatización de workflows e integraciones.",
      en: "A platform for workflow automation and integrations.",
    },
    overview: {
      es: "Plataforma de automatización de workflows e integraciones.",
      en: "A platform for workflow automation and integrations.",
    },
    problem: empty,
    solution: empty,
    features: [],
    architecture: empty,
    decisions: [],
    screenshots: [],
    demoUrl: "",
    repositoryUrl: "",
  },
];

export function listProjects(): Project[] {
  return [...projects].sort(
    (a, b) => a.order - b.order || a.name.localeCompare(b.name),
  );
}

export function featuredProjects(): Project[] {
  return listProjects().filter((project) => project.featured);
}

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function isProjectCategory(value: string): value is ProjectCategory {
  return projectCategories.some((category) => category === value);
}

export function filterProjects(category: ProjectCategory | "all"): Project[] {
  const ordered = listProjects();

  if (category === "all") {
    return ordered;
  }

  return ordered.filter((project) => project.categories.includes(category));
}

export function projectCover(project: Project): string | null {
  return project.screenshots[0]?.src ?? null;
}

export function hasCopy(value: Localized, locale: string): boolean {
  return text(value, locale).trim().length > 0;
}

export function hasCaseStudy(project: Project, locale: string): boolean {
  return (
    hasCopy(project.problem, locale) ||
    hasCopy(project.solution, locale) ||
    project.features.some((feature) => hasCopy(feature, locale)) ||
    hasCopy(project.architecture, locale) ||
    project.decisions.some((decision) => hasCopy(decision, locale)) ||
    project.technologies.length > 0 ||
    project.screenshots.length > 0 ||
    project.demoUrl.length > 0 ||
    project.repositoryUrl.length > 0
  );
}
