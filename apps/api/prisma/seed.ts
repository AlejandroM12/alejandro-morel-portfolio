import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, type Prisma } from "@prisma/client";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL is required to seed");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: databaseUrl }),
});

const empty = { es: "", en: "" };

const projects: Prisma.ProjectCreateInput[] = [
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
    categories: ["applied_ai"],
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
    categories: ["applied_ai"],
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

const experiences: Prisma.ExperienceCreateInput[] = [
  { slug: "itti", organization: "itti", role: empty, period: "", order: 1 },
  { slug: "banza", organization: "Banza", role: empty, period: "", order: 2 },
  {
    slug: "freelance",
    organization: "Freelance",
    role: empty,
    period: "",
    order: 3,
  },
];

const skillGroups: Prisma.SkillGroupCreateInput[] = [
  {
    slug: "web",
    label: { es: "Web", en: "Web" },
    items: [
      { es: "React", en: "React" },
      { es: "Next.js", en: "Next.js" },
      { es: "TypeScript", en: "TypeScript" },
    ],
    order: 1,
  },
  {
    slug: "backend",
    label: { es: "Backend", en: "Backend" },
    items: [
      { es: "NestJS", en: "NestJS" },
      { es: "BFF", en: "BFF" },
      { es: "APIs", en: "APIs" },
    ],
    order: 2,
  },
  {
    slug: "mobile",
    label: { es: "Mobile", en: "Mobile" },
    items: [{ es: "React Native", en: "React Native" }],
    order: 3,
  },
  {
    slug: "engineering",
    label: { es: "Ingeniería", en: "Engineering" },
    items: [
      { es: "Testing", en: "Testing" },
      { es: "Arquitectura", en: "Architecture" },
      { es: "Performance", en: "Performance" },
      { es: "Observabilidad", en: "Observability" },
    ],
    order: 4,
  },
  {
    slug: "expanding",
    label: { es: "En expansión", en: "Currently expanding" },
    items: [
      { es: "IA aplicada", en: "Applied AI" },
      { es: "LLMs", en: "LLMs" },
      { es: "RAG", en: "RAG" },
      { es: "Agentes de IA", en: "AI Agents" },
      { es: "Automatización", en: "Automation" },
    ],
    order: 5,
  },
];

async function main(): Promise<void> {
  await prisma.profile.upsert({
    where: { slug: "alejandro-morel" },
    update: {},
    create: {
      slug: "alejandro-morel",
      name: "Alejandro Morel",
      jobTitle: {
        es: "Ingeniero de software full stack",
        en: "Full Stack Software Engineer",
      },
      technologies: [
        { es: "React", en: "React" },
        { es: "Next.js", en: "Next.js" },
        { es: "TypeScript", en: "TypeScript" },
        { es: "NestJS", en: "NestJS" },
        { es: "React Native", en: "React Native" },
        { es: "Testing", en: "Testing" },
        { es: "Arquitectura", en: "Architecture" },
        { es: "Performance", en: "Performance" },
        { es: "Observabilidad", en: "Observability" },
        { es: "IA aplicada", en: "Applied AI" },
        { es: "LLMs", en: "LLMs" },
        { es: "RAG", en: "RAG" },
        { es: "Agentes de IA", en: "AI Agents" },
        { es: "Automatización", en: "Automation" },
      ],
    },
  });

  await prisma.contact.upsert({
    where: { id: "default" },
    update: {},
    create: { id: "default", email: "", linkedin: "", cvUrl: "" },
  });

  for (const experience of experiences) {
    await prisma.experience.upsert({
      where: { slug: experience.slug },
      update: {},
      create: experience,
    });
  }

  for (const group of skillGroups) {
    await prisma.skillGroup.upsert({
      where: { slug: group.slug },
      update: {},
      create: group,
    });
  }

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {},
      create: project,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error: unknown) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
