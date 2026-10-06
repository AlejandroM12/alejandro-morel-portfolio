import { HttpStatus, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { toErrorBody } from "./http-exception.filter";

describe("toErrorBody", () => {
  it("keeps validation messages from HTTP exceptions", () => {
    const body = toErrorBody(
      new NotFoundException("Project not found"),
      "/api/projects/missing",
    );

    expect(body).toMatchObject({
      statusCode: HttpStatus.NOT_FOUND,
      error: "Not Found",
      message: "Project not found",
      path: "/api/projects/missing",
    });
  });

  it("maps a missing database row to 404", () => {
    const body = toErrorBody(
      new Prisma.PrismaClientKnownRequestError("not found", {
        code: "P2025",
        clientVersion: "test",
      }),
      "/api/projects/missing",
    );

    expect(body.statusCode).toBe(HttpStatus.NOT_FOUND);
  });

  it("hides unexpected failures", () => {
    const body = toErrorBody(new Error("database password"), "/api/health");
    expect(body).toMatchObject({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: "Internal server error",
    });
  });
});
