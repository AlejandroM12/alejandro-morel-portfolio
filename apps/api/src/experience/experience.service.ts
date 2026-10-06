import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { UniqueConflictError } from "../common/unique-conflict.error";
import type {
  CreateExperienceDto,
  UpdateExperienceDto,
} from "./dto/experience.dto";
import {
  ExperienceRepository,
  type ExperienceRecord,
} from "./experience.repository";

@Injectable()
export class ExperienceService {
  constructor(private readonly experience: ExperienceRepository) {}

  list(): Promise<ExperienceRecord[]> {
    return this.experience.list();
  }

  async get(slug: string): Promise<ExperienceRecord> {
    const record = await this.experience.findBySlug(slug);
    if (!record) {
      throw new NotFoundException("Experience not found");
    }
    return record;
  }

  async create(input: CreateExperienceDto): Promise<ExperienceRecord> {
    try {
      return await this.experience.create(input);
    } catch (error) {
      if (error instanceof UniqueConflictError) {
        throw new ConflictException(error.message);
      }
      throw error;
    }
  }

  async update(
    slug: string,
    input: UpdateExperienceDto,
  ): Promise<ExperienceRecord> {
    const record = await this.experience.update(slug, input);
    if (!record) {
      throw new NotFoundException("Experience not found");
    }
    return record;
  }

  async remove(slug: string): Promise<void> {
    const deleted = await this.experience.delete(slug);
    if (!deleted) {
      throw new NotFoundException("Experience not found");
    }
  }
}
