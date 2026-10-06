import { ConflictException, NotFoundException } from "@nestjs/common";
import { UniqueConflictError } from "../common/unique-conflict.error";
import type { Project } from "./project";
import { ProjectsService } from "./projects.service";

const project: Project = {
  slug: "flowboard",
  name: "Flowboard",
  status: "concept",
  featured: true,
  order: 1,
  categories: ["fullstack"],
  technologies: [],
  languages: [],
  summary: { es: "SaaS", en: "SaaS" },
  overview: { es: "SaaS", en: "SaaS" },
  problem: { es: "", en: "" },
  solution: { es: "", en: "" },
  features: [],
  architecture: { es: "", en: "" },
  decisions: [],
  screenshots: [],
  demoUrl: "",
  repositoryUrl: "",
};

describe("ProjectsService", () => {
  const repository = {
    list: jest.fn(),
    findBySlug: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
  const service = new ProjectsService(
    repository as unknown as ConstructorParameters<typeof ProjectsService>[0],
  );

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("returns a project by slug", async () => {
    repository.findBySlug.mockResolvedValue(project);
    await expect(service.get("flowboard")).resolves.toEqual(project);
  });

  it("rejects a missing project", async () => {
    repository.findBySlug.mockResolvedValue(null);
    await expect(service.get("missing")).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it("maps a duplicate slug to a conflict", async () => {
    repository.create.mockRejectedValue(new UniqueConflictError());
    await expect(
      service.create({
        slug: project.slug,
        name: project.name,
        status: project.status,
        featured: project.featured,
        order: project.order,
        categories: project.categories,
        summary: project.summary,
        overview: project.overview,
      }),
    ).rejects.toBeInstanceOf(ConflictException);
  });
});
