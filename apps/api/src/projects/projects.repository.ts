import { Injectable } from "@nestjs/common";
import { rethrowUnique } from "../common/prisma-errors";
import { toDatabaseCategory, toDatabaseStatus } from "../common/project-status";
import { PrismaService } from "../prisma/prisma.service";
import {
  projectListWhere,
  toDatabaseProject,
  toProject,
  type Project,
  type ProjectListQuery,
  type ProjectWrite,
} from "./project";

@Injectable()
export class ProjectsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async list(query: ProjectListQuery): Promise<Project[]> {
    const rows = await this.prisma.project.findMany({
      where: projectListWhere(query),
      orderBy: [{ order: "asc" }, { name: "asc" }],
    });

    return rows.map((row) => toProject(row));
  }

  async findBySlug(slug: string): Promise<Project | null> {
    const row = await this.prisma.project.findUnique({ where: { slug } });
    return row ? toProject(row) : null;
  }

  async create(project: Project): Promise<Project> {
    try {
      const row = await this.prisma.project.create({
        data: toDatabaseProject(project),
      });
      return toProject(row);
    } catch (error) {
      rethrowUnique(error);
    }
  }

  async update(
    slug: string,
    input: Partial<ProjectWrite>,
  ): Promise<Project | null> {
    const existing = await this.prisma.project.findUnique({ where: { slug } });
    if (!existing) {
      return null;
    }

    const row = await this.prisma.project.update({
      where: { slug },
      data: {
        ...(input.name === undefined ? {} : { name: input.name }),
        ...(input.status === undefined
          ? {}
          : { status: toDatabaseStatus(input.status) }),
        ...(input.featured === undefined ? {} : { featured: input.featured }),
        ...(input.order === undefined ? {} : { order: input.order }),
        ...(input.categories === undefined
          ? {}
          : {
              categories: input.categories.map((category) =>
                toDatabaseCategory(category),
              ),
            }),
        ...(input.technologies === undefined
          ? {}
          : { technologies: input.technologies }),
        ...(input.languages === undefined
          ? {}
          : { languages: input.languages }),
        ...(input.summary === undefined ? {} : { summary: input.summary }),
        ...(input.overview === undefined ? {} : { overview: input.overview }),
        ...(input.problem === undefined ? {} : { problem: input.problem }),
        ...(input.solution === undefined ? {} : { solution: input.solution }),
        ...(input.features === undefined ? {} : { features: input.features }),
        ...(input.architecture === undefined
          ? {}
          : { architecture: input.architecture }),
        ...(input.decisions === undefined
          ? {}
          : { decisions: input.decisions }),
        ...(input.screenshots === undefined
          ? {}
          : { screenshots: input.screenshots }),
        ...(input.demoUrl === undefined ? {} : { demoUrl: input.demoUrl }),
        ...(input.repositoryUrl === undefined
          ? {}
          : { repositoryUrl: input.repositoryUrl }),
      },
    });

    return toProject(row);
  }

  async delete(slug: string): Promise<boolean> {
    const existing = await this.prisma.project.findUnique({ where: { slug } });
    if (!existing) {
      return false;
    }

    await this.prisma.project.delete({ where: { slug } });
    return true;
  }
}
