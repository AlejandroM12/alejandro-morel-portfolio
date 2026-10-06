import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import type { Request, Response } from "express";

type ErrorBody = {
  statusCode: number;
  error: string;
  message: string | string[];
  path: string;
  timestamp: string;
};

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const body = toErrorBody(exception, request.url ?? request.path);

    if (body.statusCode >= 500) {
      this.logger.error(body.message, exception);
    }

    response.status(body.statusCode).json(body);
  }
}

export function toErrorBody(exception: unknown, path: string): ErrorBody {
  const timestamp = new Date().toISOString();

  if (exception instanceof HttpException) {
    const statusCode = exception.getStatus();
    return {
      statusCode,
      error: errorLabel(statusCode),
      message: readHttpMessage(exception),
      path,
      timestamp,
    };
  }

  if (exception instanceof Prisma.PrismaClientKnownRequestError) {
    if (exception.code === "P2025") {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        error: "Not Found",
        message: "Record not found",
        path,
        timestamp,
      };
    }

    if (exception.code === "P2002") {
      return {
        statusCode: HttpStatus.CONFLICT,
        error: "Conflict",
        message: "Slug already exists",
        path,
        timestamp,
      };
    }
  }

  return {
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    error: "Internal Server Error",
    message: "Internal server error",
    path,
    timestamp,
  };
}

function readHttpMessage(exception: HttpException): string | string[] {
  const payload = exception.getResponse();

  if (typeof payload === "string") {
    return payload;
  }

  if (typeof payload === "object" && payload !== null && "message" in payload) {
    const message = payload.message;
    if (typeof message === "string" || Array.isArray(message)) {
      return message;
    }
  }

  return exception.message;
}

function errorLabel(status: number): string {
  const key = HttpStatus[status];
  if (typeof key !== "string") {
    return "Error";
  }

  return key
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
