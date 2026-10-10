import { Module } from "@nestjs/common";
import { EducationController } from "./education.controller";
import { EducationRepository } from "./education.repository";
import { EducationService } from "./education.service";

@Module({
  controllers: [EducationController],
  providers: [EducationService, EducationRepository],
})
export class EducationModule {}
