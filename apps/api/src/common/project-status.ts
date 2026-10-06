export const projectCategories = [
  "fullstack",
  "ai",
  "backend",
  "frontend",
  "automation",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export const projectStatuses = ["concept", "in-progress", "shipped"] as const;

export type ProjectStatus = (typeof projectStatuses)[number];

const toDatabase = {
  concept: "concept",
  "in-progress": "in_progress",
  shipped: "shipped",
} as const;

const fromDatabase = {
  concept: "concept",
  in_progress: "in-progress",
  shipped: "shipped",
} as const;

export type DatabaseProjectStatus = keyof typeof fromDatabase;

export function toDatabaseStatus(status: ProjectStatus): DatabaseProjectStatus {
  return toDatabase[status];
}

export function fromDatabaseStatus(
  status: DatabaseProjectStatus,
): ProjectStatus {
  return fromDatabase[status];
}

export function isProjectCategory(value: string): value is ProjectCategory {
  return projectCategories.some((category) => category === value);
}
