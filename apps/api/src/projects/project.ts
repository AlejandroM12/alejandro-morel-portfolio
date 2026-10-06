import type { Localized, Screenshot } from "../common/localized";
import {
  fromDatabaseStatus,
  isProjectCategory,
  toDatabaseStatus,
  type DatabaseProjectStatus,
  type ProjectCategory,
  type ProjectStatus,
} from "../common/project-status";
import {
  readLocalized,
  readLocalizedList,
  readScreenshots,
} from "../common/localized";

export type Project = {
  slug: string;
  name: string;
  status: ProjectStatus;
  featured: boolean;
  order: number;
  categories: ProjectCategory[];
  technologies: string[];
  languages: string[];
  summary: Localized;
  overview: Localized;
  problem: Localized;
  solution: Localized;
  features: Localized[];
  architecture: Localized;
  decisions: Localized[];
  screenshots: Screenshot[];
  demoUrl: string;
  repositoryUrl: string;
};

export type ProjectWrite = Omit<Project, "slug">;

export type ProjectListQuery = {
  category?: ProjectCategory;
  featured?: boolean;
};

export type ProjectRow = {
  slug: string;
  name: string;
  status: DatabaseProjectStatus;
  featured: boolean;
  order: number;
  categories: string[];
  technologies: string[];
  languages: string[];
  summary: unknown;
  overview: unknown;
  problem: unknown;
  solution: unknown;
  features: unknown;
  architecture: unknown;
  decisions: unknown;
  screenshots: unknown;
  demoUrl: string;
  repositoryUrl: string;
};

export function projectListWhere(query: ProjectListQuery): {
  categories?: { has: ProjectCategory };
  featured?: boolean;
} {
  return {
    ...(query.category ? { categories: { has: query.category } } : {}),
    ...(query.featured === undefined ? {} : { featured: query.featured }),
  };
}

export function toProject(row: ProjectRow): Project {
  return {
    slug: row.slug,
    name: row.name,
    status: fromDatabaseStatus(row.status),
    featured: row.featured,
    order: row.order,
    categories: row.categories.map((category) => {
      if (!isProjectCategory(category)) {
        throw new Error("Stored project category is invalid");
      }
      return category;
    }),
    technologies: row.technologies,
    languages: row.languages,
    summary: readLocalized(row.summary),
    overview: readLocalized(row.overview),
    problem: readLocalized(row.problem),
    solution: readLocalized(row.solution),
    features: readLocalizedList(row.features),
    architecture: readLocalized(row.architecture),
    decisions: readLocalizedList(row.decisions),
    screenshots: readScreenshots(row.screenshots),
    demoUrl: row.demoUrl,
    repositoryUrl: row.repositoryUrl,
  };
}

export function toDatabaseProject(project: Project) {
  return {
    slug: project.slug,
    name: project.name,
    status: toDatabaseStatus(project.status),
    featured: project.featured,
    order: project.order,
    categories: project.categories,
    technologies: project.technologies,
    languages: project.languages,
    summary: project.summary,
    overview: project.overview,
    problem: project.problem,
    solution: project.solution,
    features: project.features,
    architecture: project.architecture,
    decisions: project.decisions,
    screenshots: project.screenshots,
    demoUrl: project.demoUrl,
    repositoryUrl: project.repositoryUrl,
  };
}
