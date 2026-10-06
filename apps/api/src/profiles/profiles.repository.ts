import { Injectable } from "@nestjs/common";
import { asJson, readLocalized, readLocalizedList } from "../common/localized";
import { PrismaService } from "../prisma/prisma.service";
import type { UpdateProfileDto } from "./dto/profile.dto";

export type ProfileRecord = {
  slug: string;
  name: string;
  jobTitle: { es: string; en: string };
  technologies: { es: string; en: string }[];
};

@Injectable()
export class ProfilesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async list(): Promise<ProfileRecord[]> {
    const rows = await this.prisma.profile.findMany({
      orderBy: { name: "asc" },
    });
    return rows.map((row) => toProfile(row));
  }

  async findBySlug(slug: string): Promise<ProfileRecord | null> {
    const row = await this.prisma.profile.findUnique({ where: { slug } });
    return row ? toProfile(row) : null;
  }

  async update(
    slug: string,
    input: UpdateProfileDto,
  ): Promise<ProfileRecord | null> {
    const existing = await this.prisma.profile.findUnique({ where: { slug } });
    if (!existing) {
      return null;
    }

    const row = await this.prisma.profile.update({
      where: { slug },
      data: {
        ...(input.name === undefined ? {} : { name: input.name }),
        ...(input.jobTitle === undefined
          ? {}
          : { jobTitle: asJson(input.jobTitle) }),
        ...(input.technologies === undefined
          ? {}
          : { technologies: asJson(input.technologies) }),
      },
    });

    return toProfile(row);
  }
}

function toProfile(row: {
  slug: string;
  name: string;
  jobTitle: unknown;
  technologies: unknown;
}): ProfileRecord {
  return {
    slug: row.slug,
    name: row.name,
    jobTitle: readLocalized(row.jobTitle),
    technologies: readLocalizedList(row.technologies),
  };
}
