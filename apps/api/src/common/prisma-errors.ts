import { Prisma } from "@prisma/client";
import { UniqueConflictError } from "./unique-conflict.error";

export function rethrowUnique(error: unknown): never {
  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2002"
  ) {
    throw new UniqueConflictError();
  }

  throw error;
}
