import { Injectable } from "@nestjs/common";
import { asJson, emptyLocalized, readLocalized } from "../common/localized";
import { rethrowUnique } from "../common/prisma-errors";
import { PrismaService } from "../prisma/prisma.service";
import type {
  CreateExperienceDto,
  UpdateExperienceDto,
} from "./dto/experience.dto";

export type ExperienceRecord = {
  slug: string;
  organization: string;
  role: { es: string; en: string };
  period: string;
  order: number;
};

@Injectable()
export class ExperienceRepository {
  constructor(private readonly prisma: PrismaService) {}

  async list(): Promise<ExperienceRecord[]> {
    const rows = await this.prisma.experience.findMany({
      orderBy: [{ order: "asc" }, { organization: "asc" }],
    });
    return rows.map((row) => toExperience(row));
  }

  async findBySlug(slug: string): Promise<ExperienceRecord | null> {
    const row = await this.prisma.experience.findUnique({ where: { slug } });
    return row ? toExperience(row) : null;
  }

  async create(input: CreateExperienceDto): Promise<ExperienceRecord> {
    try {
      const row = await this.prisma.experience.create({
        data: {
          slug: input.slug,
          organization: input.organization,
          role: asJson(input.role ?? emptyLocalized),
          period: input.period ?? "",
          order: input.order,
        },
      });
      return toExperience(row);
    } catch (error) {
      rethrowUnique(error);
    }
  }

  async update(
    slug: string,
    input: UpdateExperienceDto,
  ): Promise<ExperienceRecord | null> {
    const existing = await this.prisma.experience.findUnique({
      where: { slug },
    });
    if (!existing) {
      return null;
    }

    const row = await this.prisma.experience.update({
      where: { slug },
      data: {
        ...(input.organization === undefined
          ? {}
          : { organization: input.organization }),
        ...(input.role === undefined ? {} : { role: asJson(input.role) }),
        ...(input.period === undefined ? {} : { period: input.period }),
        ...(input.order === undefined ? {} : { order: input.order }),
      },
    });
    return toExperience(row);
  }

  async delete(slug: string): Promise<boolean> {
    const existing = await this.prisma.experience.findUnique({
      where: { slug },
    });
    if (!existing) {
      return false;
    }
    await this.prisma.experience.delete({ where: { slug } });
    return true;
  }
}

function toExperience(row: {
  slug: string;
  organization: string;
  role: unknown;
  period: string;
  order: number;
}): ExperienceRecord {
  return {
    slug: row.slug,
    organization: row.organization,
    role: readLocalized(row.role),
    period: row.period,
    order: row.order,
  };
}
