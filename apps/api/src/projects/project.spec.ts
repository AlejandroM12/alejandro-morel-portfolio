import { projectListWhere, toProject } from "./project";

const localized = { es: "Hola", en: "Hello" };

describe("projectListWhere", () => {
  it("omits filters that were not requested", () => {
    expect(projectListWhere({})).toEqual({});
  });

  it("filters by category and featured", () => {
    expect(
      projectListWhere({ category: "applied-ai", featured: false }),
    ).toEqual({
      categories: { has: "applied_ai" },
      featured: false,
    });
  });
});

describe("toProject", () => {
  it("exposes the status used by the site", () => {
    const project = toProject({
      slug: "flowboard",
      name: "Flowboard",
      status: "in_progress",
      featured: true,
      order: 1,
      categories: ["web"],
      technologies: [],
      languages: [],
      summary: localized,
      overview: localized,
      problem: localized,
      solution: localized,
      features: [],
      architecture: localized,
      decisions: [],
      screenshots: [],
      demoUrl: "",
      repositoryUrl: "",
    });

    expect(project.status).toBe("in-progress");
    expect(project.categories).toEqual(["web"]);
  });

  it("exposes applied-ai for the stored applied_ai category", () => {
    const project = toProject({
      slug: "documind-ai",
      name: "DocuMind AI",
      status: "concept",
      featured: true,
      order: 2,
      categories: ["applied_ai"],
      technologies: [],
      languages: [],
      summary: localized,
      overview: localized,
      problem: localized,
      solution: localized,
      features: [],
      architecture: localized,
      decisions: [],
      screenshots: [],
      demoUrl: "",
      repositoryUrl: "",
    });

    expect(project.categories).toEqual(["applied-ai"]);
  });
});
