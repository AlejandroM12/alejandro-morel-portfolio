import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { validateEnv } from "./config/env";
import { ContactModule } from "./contact/contact.module";
import { EducationModule } from "./education/education.module";
import { ExperienceModule } from "./experience/experience.module";
import { HealthModule } from "./health/health.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ProfilesModule } from "./profiles/profiles.module";
import { ProjectsModule } from "./projects/projects.module";
import { SkillsModule } from "./skills/skills.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
    }),
    PrismaModule,
    HealthModule,
    ProfilesModule,
    ExperienceModule,
    EducationModule,
    SkillsModule,
    ProjectsModule,
    ContactModule,
  ],
})
export class AppModule {}
