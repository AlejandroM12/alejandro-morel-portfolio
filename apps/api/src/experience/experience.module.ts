import { Module } from "@nestjs/common";
import { ExperienceController } from "./experience.controller";
import { ExperienceRepository } from "./experience.repository";
import { ExperienceService } from "./experience.service";

@Module({
  controllers: [ExperienceController],
  providers: [ExperienceService, ExperienceRepository],
})
export class ExperienceModule {}
