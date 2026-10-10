import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { UniqueConflictError } from "../common/unique-conflict.error";
import type {
  CreateEducationDto,
  UpdateEducationDto,
} from "./dto/education.dto";
import {
  EducationRepository,
  type EducationRecord,
} from "./education.repository";

@Injectable()
export class EducationService {
  constructor(private readonly education: EducationRepository) {}

  list(): Promise<EducationRecord[]> {
    return this.education.list();
  }

  async get(slug: string): Promise<EducationRecord> {
    const record = await this.education.findBySlug(slug);
    if (!record) {
      throw new NotFoundException("Education not found");
    }
    return record;
  }

  async create(input: CreateEducationDto): Promise<EducationRecord> {
    try {
      return await this.education.create(input);
    } catch (error) {
      if (error instanceof UniqueConflictError) {
        throw new ConflictException(error.message);
      }
      throw error;
    }
  }

  async update(
    slug: string,
    input: UpdateEducationDto,
  ): Promise<EducationRecord> {
    const record = await this.education.update(slug, input);
    if (!record) {
      throw new NotFoundException("Education not found");
    }
    return record;
  }

  async remove(slug: string): Promise<void> {
    const deleted = await this.education.delete(slug);
    if (!deleted) {
      throw new NotFoundException("Education not found");
    }
  }
}
