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
  width?: number;
  height?: number;
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
    slug: "signaldesk",
    name: "SignalDesk",
    status: "shipped",
    featured: true,
    order: 1,
    categories: ["web", "backend"],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "NestJS",
      "Prisma",
      "PostgreSQL",
    ],
    languages: [],
    summary: {
      es: "Consola de incidentes para correlacionar eventos de error, investigar los que siguen abiertos y pedir hipótesis de diagnóstico limitadas a esos eventos.",
      en: "An incident console for correlating error events, investigating the ones that stay open, and requesting diagnostic hypotheses limited to those events.",
    },
    overview: {
      es: "Proyecto full stack publicado. La demo pública sirve para revisar incidentes de ejemplo y solicitar un análisis. El análisis de la demo usa reglas deterministas y no llama a un modelo generativo. La ingesta, las ediciones y las métricas internas quedan bloqueadas en el servidor.",
      en: "A published full-stack project. The public demo is for reviewing sample incidents and requesting an analysis. Demo analysis uses deterministic rules and does not call a generative model. Ingest, edits, and internal metrics are blocked on the server.",
    },
    problem: {
      es: "Un timeout puede dispararse muchas veces y dos ediciones pueden pisarse. Si el análisis cita un evento que no pertenece al incidente, no alcanza como diagnóstico.",
      en: "A timeout can fire many times, and two edits can overwrite each other. An analysis that cites an event outside the incident is not a usable diagnosis.",
    },
    solution: {
      es: "SignalDesk valida el evento, rechaza el duplicado y lo suma a un incidente abierto cuando coinciden el servicio, el tipo de error y la ventana de tiempo. La consola deja investigar ese incidente. La API solo persiste un análisis si sus hipótesis citan eventos que realmente vinieron en el contexto.",
      en: "SignalDesk validates the event, rejects the duplicate, and attaches it to an open incident when the service, error type, and time window match. The console is where that incident gets investigated. The API stores an analysis only when its hypotheses cite events that were actually in the context.",
    },
    features: [
      {
        es: "Listado paginado, con filtros por estado, severidad, servicio y equipo, y totales por estado.",
        en: "Paginated list, with filters for status, severity, service, and team, plus totals by status.",
      },
      {
        es: "Detalle con los eventos del incidente y el historial de actividad.",
        en: "Detail view with the incident events and the activity history.",
      },
      {
        es: "Ingesta con validación, correlación de eventos y rechazo de duplicados.",
        en: "Ingest with validation, event correlation, and duplicate rejection.",
      },
      {
        es: "Análisis con clave de idempotencia. Las hipótesis solo pueden citar eventos incluidos en el incidente.",
        en: "Analysis with an idempotency key. Hypotheses can cite only events included in the incident.",
      },
      {
        es: "Demo pública para consultar incidentes y pedir análisis. El resto de las escrituras y las métricas internas no están habilitadas.",
        en: "Public demo for reviewing incidents and requesting analysis. Other writes and internal metrics are not available.",
      },
    ],
    architecture: {
      es: "Monorepo de Next.js y NestJS sobre PostgreSQL. El navegador lee los incidentes en la API. En la demo, el análisis pasa por una ruta de Next.js en el mismo origen y el secreto queda en el servidor. El proveedor de esa demo aplica reglas locales.",
      en: "A Next.js and NestJS monorepo on PostgreSQL. The browser reads incidents from the API. In the demo, analysis goes through a same-origin Next.js route and the secret stays on the server. That demo's provider applies local rules.",
    },
    decisions: [
      {
        es: "Un evento repetido, con la misma fuente y el mismo identificador externo, responde 409 y no se procesa de nuevo.",
        en: "A repeated event with the same source and external id returns 409 and is not processed again.",
      },
      {
        es: "La correlación agrupa solo eventos del mismo servicio y tipo de error que caen en la ventana de tiempo. Si no entran, abren otro incidente.",
        en: "Correlation groups only events with the same service and error type that fall inside the time window. Anything else opens another incident.",
      },
      {
        es: "Una edición exige el updatedAt que el cliente leyó. Si el incidente cambió, la API responde 409 y no escribe.",
        en: "An edit requires the updatedAt the client read. If the incident changed, the API returns 409 and writes nothing.",
      },
    ],
    screenshots: [
      {
        src: "/projects/signaldesk-dashboard.png",
        width: 1024,
        height: 410,
        alt: {
          es: "Dashboard de SignalDesk con incidentes abiertos, totales por estado y filtros.",
          en: "SignalDesk dashboard with open incidents, status totals, and filters.",
        },
      },
    ],
    demoUrl: "https://signaldesk-pearl.vercel.app/",
    repositoryUrl: "https://github.com/AlejandroM12/signaldesk",
  },
  {
    slug: "flowboard",
    name: "Flowboard",
    status: "concept",
    featured: true,
    order: 2,
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
    order: 3,
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
    order: 4,
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
