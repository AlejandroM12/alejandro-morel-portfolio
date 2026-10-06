export class UniqueConflictError extends Error {
  constructor(message = "Slug already exists") {
    super(message);
    this.name = "UniqueConflictError";
  }
}
