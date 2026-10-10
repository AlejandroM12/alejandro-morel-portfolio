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
  {
    slug: "itti",
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
    order: 1,
  },
  {
    slug: "banza",
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
    order: 2,
  },
  {
    slug: "freelance",
    organization: "Freelance",
    role: {
      es: "Desarrollador web freelance",
      en: "Freelance Web Developer",
    },
    period: { es: "enero 2023 – junio 2025", en: "January 2023 – June 2025" },
    summary: empty,
    order: 3,
  },
  {
    slug: "ache1",
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
    order: 4,
  },
  {
    slug: "orbit",
    organization: "Orbit",
    role: { es: "Desarrollador frontend", en: "Frontend Developer" },
    period: {
      es: "marzo 2022 – diciembre 2022",
      en: "March 2022 – December 2022",
    },
    summary: empty,
    order: 5,
  },
];

const education: Prisma.EducationCreateInput[] = [
  {
    slug: "fermosa",
    institution: "Instituto Superior Fermosa",
    credential: {
      es: "Técnico superior en desarrollo de software",
      en: "Higher technician degree in software development",
    },
    period: {
      es: "febrero 2019 – diciembre 2021",
      en: "February 2019 – December 2021",
    },
    order: 1,
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

const profileJobTitle = {
  es: "Ingeniero de software full stack",
  en: "Full Stack Software Engineer",
};

const profileTechnologies = [
  { es: "React", en: "React" },
  { es: "Next.js", en: "Next.js" },
  { es: "TypeScript", en: "TypeScript" },
  { es: "NestJS", en: "NestJS" },
  { es: "React Native", en: "React Native" },
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

async function main(): Promise<void> {
  await prisma.profile.upsert({
    where: { slug: "alejandro-morel" },
    update: {
      jobTitle: profileJobTitle,
      technologies: profileTechnologies,
    },
    create: {
      slug: "alejandro-morel",
      name: "Alejandro Morel",
      jobTitle: profileJobTitle,
      technologies: profileTechnologies,
    },
  });

  await prisma.contact.upsert({
    where: { id: "default" },
    update: {
      email: "alejandro.morel1905@gmail.com",
      linkedin: "https://www.linkedin.com/in/morelalejandro/",
      github: "https://github.com/AlejandroM12/alejandro-morel-portfolio",
    },
    create: {
      id: "default",
      email: "alejandro.morel1905@gmail.com",
      linkedin: "https://www.linkedin.com/in/morelalejandro/",
      github: "https://github.com/AlejandroM12/alejandro-morel-portfolio",
      cvUrl: "",
    },
  });

  for (const experience of experiences) {
    await prisma.experience.upsert({
      where: { slug: experience.slug },
      update: {
        organization: experience.organization,
        role: experience.role,
        period: experience.period,
        summary: experience.summary,
        order: experience.order,
      },
      create: experience,
    });
  }

  for (const item of education) {
    await prisma.education.upsert({
      where: { slug: item.slug },
      update: {
        institution: item.institution,
        credential: item.credential,
        period: item.period,
        order: item.order,
      },
      create: item,
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
