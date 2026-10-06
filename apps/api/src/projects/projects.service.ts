import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { emptyLocalized } from "../common/localized";
import { UniqueConflictError } from "../common/unique-conflict.error";
import type { CreateProjectDto, UpdateProjectDto } from "./dto/project.dto";
import type { Project } from "./project";
import { ProjectsRepository } from "./projects.repository";

@Injectable()
export class ProjectsService {
  constructor(private readonly projects: ProjectsRepository) {}

  list(query: {
    category?: Project["categories"][number];
    featured?: boolean;
  }) {
    return this.projects.list(query);
  }

  async get(slug: string): Promise<Project> {
    const project = await this.projects.findBySlug(slug);
    if (!project) {
      throw new NotFoundException("Project not found");
    }
    return project;
  }

  async create(input: CreateProjectDto): Promise<Project> {
    try {
      return await this.projects.create({
        slug: input.slug,
        name: input.name,
        status: input.status,
        featured: input.featured,
        order: input.order,
        categories: input.categories,
        technologies: input.technologies ?? [],
        languages: input.languages ?? [],
        summary: input.summary,
        overview: input.overview,
        problem: input.problem ?? emptyLocalized,
        solution: input.solution ?? emptyLocalized,
        features: input.features ?? [],
        architecture: input.architecture ?? emptyLocalized,
        decisions: input.decisions ?? [],
        screenshots: input.screenshots ?? [],
        demoUrl: input.demoUrl ?? "",
        repositoryUrl: input.repositoryUrl ?? "",
      });
    } catch (error) {
      if (error instanceof UniqueConflictError) {
        throw new ConflictException(error.message);
      }
      throw error;
    }
  }

  async update(slug: string, input: UpdateProjectDto): Promise<Project> {
    const project = await this.projects.update(slug, input);
    if (!project) {
      throw new NotFoundException("Project not found");
    }
    return project;
  }

  async remove(slug: string): Promise<void> {
    const deleted = await this.projects.delete(slug);
    if (!deleted) {
      throw new NotFoundException("Project not found");
    }
  }
}
