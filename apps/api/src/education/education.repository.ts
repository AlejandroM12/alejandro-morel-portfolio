import { Injectable } from "@nestjs/common";
import { asJson, emptyLocalized, readLocalized } from "../common/localized";
import { rethrowUnique } from "../common/prisma-errors";
import { PrismaService } from "../prisma/prisma.service";
import type {
  CreateEducationDto,
  UpdateEducationDto,
} from "./dto/education.dto";

export type EducationRecord = {
  slug: string;
  institution: string;
  credential: { es: string; en: string };
  period: { es: string; en: string };
  order: number;
};

@Injectable()
export class EducationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async list(): Promise<EducationRecord[]> {
    const rows = await this.prisma.education.findMany({
      orderBy: [{ order: "asc" }, { institution: "asc" }],
    });
    return rows.map((row) => toEducation(row));
  }

  async findBySlug(slug: string): Promise<EducationRecord | null> {
    const row = await this.prisma.education.findUnique({ where: { slug } });
    return row ? toEducation(row) : null;
  }

  async create(input: CreateEducationDto): Promise<EducationRecord> {
    try {
      const row = await this.prisma.education.create({
        data: {
          slug: input.slug,
          institution: input.institution,
          credential: asJson(input.credential ?? emptyLocalized),
          period: asJson(input.period ?? emptyLocalized),
          order: input.order,
        },
      });
      return toEducation(row);
    } catch (error) {
      rethrowUnique(error);
    }
  }

  async update(
    slug: string,
    input: UpdateEducationDto,
  ): Promise<EducationRecord | null> {
    const existing = await this.prisma.education.findUnique({
      where: { slug },
    });
    if (!existing) {
      return null;
    }

    const row = await this.prisma.education.update({
      where: { slug },
      data: {
        ...(input.institution === undefined
          ? {}
          : { institution: input.institution }),
        ...(input.credential === undefined
          ? {}
          : { credential: asJson(input.credential) }),
        ...(input.period === undefined ? {} : { period: asJson(input.period) }),
        ...(input.order === undefined ? {} : { order: input.order }),
      },
    });
    return toEducation(row);
  }

  async delete(slug: string): Promise<boolean> {
    const existing = await this.prisma.education.findUnique({
      where: { slug },
    });
    if (!existing) {
      return false;
    }
    await this.prisma.education.delete({ where: { slug } });
    return true;
  }
}

function toEducation(row: {
  slug: string;
  institution: string;
  credential: unknown;
  period: unknown;
  order: number;
}): EducationRecord {
  return {
    slug: row.slug,
    institution: row.institution,
    credential: readLocalized(row.credential),
    period: readLocalized(row.period),
    order: row.order,
  };
}
