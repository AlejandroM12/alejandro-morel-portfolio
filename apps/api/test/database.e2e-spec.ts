import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { AppModule } from "../src/app.module";
import { configureApp } from "../src/app.setup";
import { PrismaService } from "../src/prisma/prisma.service";

const run = process.env.RUN_DB_TESTS === "1" ? describe : describe.skip;

run("PostgreSQL", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    configureApp(app);
    await app.init();
  });

  afterAll(async () => {
    const prisma = app.get(PrismaService);
    await prisma.project.deleteMany({ where: { slug: "db-test-project" } });
    await app.close();
  });

  it("stores a project and reads it back", async () => {
    const server = app.getHttpServer();
    const key = { "x-api-key": process.env.ADMIN_API_KEY ?? "" };
    const body = {
      slug: "db-test-project",
      name: "DB test",
      status: "concept",
      featured: false,
      order: 99,
      categories: ["backend"],
      summary: { es: "Prueba", en: "Test" },
      overview: { es: "Prueba", en: "Test" },
    };

    await request(server).post("/api/projects").set(key).send(body).expect(201);

    await request(server)
      .get("/api/projects/db-test-project")
      .expect(200)
      .expect((response) => {
        expect(response.body.name).toBe("DB test");
        expect(response.body.categories).toEqual(["backend"]);
      });
  });
});
