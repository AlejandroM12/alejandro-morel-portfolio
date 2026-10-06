import { Injectable } from "@nestjs/common";
import { asJson, readLocalized, readLocalizedList } from "../common/localized";
import { rethrowUnique } from "../common/prisma-errors";
import { PrismaService } from "../prisma/prisma.service";
import type { CreateSkillGroupDto, UpdateSkillGroupDto } from "./dto/skill.dto";

export type SkillGroupRecord = {
  slug: string;
  label: { es: string; en: string };
  items: { es: string; en: string }[];
  order: number;
};

@Injectable()
export class SkillsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async list(): Promise<SkillGroupRecord[]> {
    const rows = await this.prisma.skillGroup.findMany({
      orderBy: [{ order: "asc" }, { slug: "asc" }],
    });
    return rows.map((row) => toSkillGroup(row));
  }

  async findBySlug(slug: string): Promise<SkillGroupRecord | null> {
    const row = await this.prisma.skillGroup.findUnique({ where: { slug } });
    return row ? toSkillGroup(row) : null;
  }

  async create(input: CreateSkillGroupDto): Promise<SkillGroupRecord> {
    try {
      const row = await this.prisma.skillGroup.create({
        data: {
          slug: input.slug,
          label: asJson(input.label),
          items: asJson(input.items ?? []),
          order: input.order,
        },
      });
      return toSkillGroup(row);
    } catch (error) {
      rethrowUnique(error);
    }
  }

  async update(
    slug: string,
    input: UpdateSkillGroupDto,
  ): Promise<SkillGroupRecord | null> {
    const existing = await this.prisma.skillGroup.findUnique({
      where: { slug },
    });
    if (!existing) {
      return null;
    }

    const row = await this.prisma.skillGroup.update({
      where: { slug },
      data: {
        ...(input.label === undefined ? {} : { label: asJson(input.label) }),
        ...(input.items === undefined ? {} : { items: asJson(input.items) }),
        ...(input.order === undefined ? {} : { order: input.order }),
      },
    });
    return toSkillGroup(row);
  }

  async delete(slug: string): Promise<boolean> {
    const existing = await this.prisma.skillGroup.findUnique({
      where: { slug },
    });
    if (!existing) {
      return false;
    }
    await this.prisma.skillGroup.delete({ where: { slug } });
    return true;
  }
}

function toSkillGroup(row: {
  slug: string;
  label: unknown;
  items: unknown;
  order: number;
}): SkillGroupRecord {
  return {
    slug: row.slug,
    label: readLocalized(row.label),
    items: readLocalizedList(row.items),
    order: row.order,
  };
}
