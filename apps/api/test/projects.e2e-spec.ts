import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { AppModule } from "../src/app.module";
import { configureApp } from "../src/app.setup";
import { UniqueConflictError } from "../src/common/unique-conflict.error";
import { PrismaService } from "../src/prisma/prisma.service";
import type { Project, ProjectListQuery } from "../src/projects/project";
import { ProjectsRepository } from "../src/projects/projects.repository";

class MemoryProjects {
  private readonly rows = new Map<string, Project>();

  async list(query: ProjectListQuery): Promise<Project[]> {
    return [...this.rows.values()]
      .filter((project) => {
        if (query.category && !project.categories.includes(query.category)) {
          return false;
        }
        if (
          query.featured !== undefined &&
          project.featured !== query.featured
        ) {
          return false;
        }
        return true;
      })
      .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
  }

  async findBySlug(slug: string): Promise<Project | null> {
    return this.rows.get(slug) ?? null;
  }

  async create(project: Project): Promise<Project> {
    if (this.rows.has(project.slug)) {
      throw new UniqueConflictError();
    }
    this.rows.set(project.slug, project);
    return project;
  }

  async update(
    slug: string,
    input: Partial<Omit<Project, "slug">>,
  ): Promise<Project | null> {
    const current = this.rows.get(slug);
    if (!current) {
      return null;
    }
    const next = { ...current, ...input };
    this.rows.set(slug, next);
    return next;
  }

  async delete(slug: string): Promise<boolean> {
    return this.rows.delete(slug);
  }
}

describe("Projects API", () => {
  let app: INestApplication;
  const repository = new MemoryProjects();

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue({
        $queryRaw: async () => [{ ok: 1 }],
        $connect: async () => undefined,
        $disconnect: async () => undefined,
      })
      .overrideProvider(ProjectsRepository)
      .useValue(repository)
      .compile();

    app = moduleRef.createNestApplication();
    configureApp(app);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  const body = {
    slug: "flowboard",
    name: "Flowboard",
    status: "concept",
    featured: true,
    order: 1,
    categories: ["fullstack"],
    summary: {
      es: "SaaS de gestión y analítica.",
      en: "A SaaS for management and analytics.",
    },
    overview: {
      es: "SaaS de gestión y analítica.",
      en: "A SaaS for management and analytics.",
    },
  };

  it("reports the process and the database", async () => {
    await request(app.getHttpServer())
      .get("/api/health")
      .expect(200)
      .expect({ status: "ok", database: "up" });
  });

  it("serves the OpenAPI document", async () => {
    await request(app.getHttpServer()).get("/docs").expect(200);
  });

  it("rejects writes without the API key and invalid bodies", async () => {
    await request(app.getHttpServer())
      .post("/api/projects")
      .send(body)
      .expect(401);

    await request(app.getHttpServer())
      .post("/api/projects")
      .set("x-api-key", "test-api-key-value")
      .send({ slug: "flowboard" })
      .expect(400);
  });

  it("creates, filters, updates, and deletes a project", async () => {
    const server = app.getHttpServer();
    const key = { "x-api-key": "test-api-key-value" };

    await request(server)
      .post("/api/projects")
      .set(key)
      .send(body)
      .expect(201)
      .expect((response) => {
        expect(response.body).toMatchObject({
          slug: "flowboard",
          status: "concept",
          demoUrl: "",
          technologies: [],
        });
      });

    await request(server).post("/api/projects").set(key).send(body).expect(409);

    await request(server)
      .get("/api/projects?category=fullstack&featured=true")
      .expect(200)
      .expect((response) => {
        expect(response.body).toHaveLength(1);
      });

    await request(server)
      .get("/api/projects?category=backend")
      .expect(200)
      .expect([]);

    await request(server)
      .patch("/api/projects/flowboard")
      .set(key)
      .send({ status: "in-progress" })
      .expect(200)
      .expect((response) => {
        expect(response.body.status).toBe("in-progress");
      });

    await request(server).get("/api/projects/missing").expect(404);

    await request(server)
      .delete("/api/projects/flowboard")
      .set(key)
      .expect(204);
  });
});
