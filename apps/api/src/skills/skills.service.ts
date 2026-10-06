import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { UniqueConflictError } from "../common/unique-conflict.error";
import type { CreateSkillGroupDto, UpdateSkillGroupDto } from "./dto/skill.dto";
import { SkillsRepository, type SkillGroupRecord } from "./skills.repository";

@Injectable()
export class SkillsService {
  constructor(private readonly skills: SkillsRepository) {}

  list(): Promise<SkillGroupRecord[]> {
    return this.skills.list();
  }

  async get(slug: string): Promise<SkillGroupRecord> {
    const group = await this.skills.findBySlug(slug);
    if (!group) {
      throw new NotFoundException("Skill group not found");
    }
    return group;
  }

  async create(input: CreateSkillGroupDto): Promise<SkillGroupRecord> {
    try {
      return await this.skills.create(input);
    } catch (error) {
      if (error instanceof UniqueConflictError) {
        throw new ConflictException(error.message);
      }
      throw error;
    }
  }

  async update(
    slug: string,
    input: UpdateSkillGroupDto,
  ): Promise<SkillGroupRecord> {
    const group = await this.skills.update(slug, input);
    if (!group) {
      throw new NotFoundException("Skill group not found");
    }
    return group;
  }

  async remove(slug: string): Promise<void> {
    const deleted = await this.skills.delete(slug);
    if (!deleted) {
      throw new NotFoundException("Skill group not found");
    }
  }
}
