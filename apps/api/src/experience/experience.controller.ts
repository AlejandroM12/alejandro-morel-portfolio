import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiSecurity,
  ApiTags,
} from "@nestjs/swagger";
import { ApiKeyGuard } from "../common/guards/api-key.guard";
import { ParseSlugPipe } from "../common/pipes/parse-slug.pipe";
import { CreateExperienceDto, UpdateExperienceDto } from "./dto/experience.dto";
import { ExperienceService } from "./experience.service";

@ApiTags("experience")
@Controller("experience")
export class ExperienceController {
  constructor(private readonly experience: ExperienceService) {}

  @Get()
  @ApiOkResponse({ description: "Experience ordered for the page." })
  list() {
    return this.experience.list();
  }

  @Get(":slug")
  @ApiOkResponse()
  get(@Param("slug", ParseSlugPipe) slug: string) {
    return this.experience.get(slug);
  }

  @Post()
  @UseGuards(ApiKeyGuard)
  @ApiSecurity("api-key")
  @ApiCreatedResponse()
  create(@Body() body: CreateExperienceDto) {
    return this.experience.create(body);
  }

  @Patch(":slug")
  @UseGuards(ApiKeyGuard)
  @ApiSecurity("api-key")
  @ApiOkResponse()
  update(
    @Param("slug", ParseSlugPipe) slug: string,
    @Body() body: UpdateExperienceDto,
  ) {
    return this.experience.update(slug, body);
  }

  @Delete(":slug")
  @UseGuards(ApiKeyGuard)
  @ApiSecurity("api-key")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  remove(@Param("slug", ParseSlugPipe) slug: string) {
    return this.experience.remove(slug);
  }
}
