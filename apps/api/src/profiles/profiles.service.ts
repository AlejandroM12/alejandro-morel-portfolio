import { Injectable, NotFoundException } from "@nestjs/common";
import type { UpdateProfileDto } from "./dto/profile.dto";
import { ProfilesRepository, type ProfileRecord } from "./profiles.repository";

@Injectable()
export class ProfilesService {
  constructor(private readonly profiles: ProfilesRepository) {}

  list(): Promise<ProfileRecord[]> {
    return this.profiles.list();
  }

  async get(slug: string): Promise<ProfileRecord> {
    const profile = await this.profiles.findBySlug(slug);
    if (!profile) {
      throw new NotFoundException("Profile not found");
    }
    return profile;
  }

  async update(slug: string, input: UpdateProfileDto): Promise<ProfileRecord> {
    const profile = await this.profiles.update(slug, input);
    if (!profile) {
      throw new NotFoundException("Profile not found");
    }
    return profile;
  }
}
