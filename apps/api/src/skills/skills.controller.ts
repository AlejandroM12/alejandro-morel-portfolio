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
import { CreateSkillGroupDto, UpdateSkillGroupDto } from "./dto/skill.dto";
import { SkillsService } from "./skills.service";

@ApiTags("skills")
@Controller("skills")
export class SkillsController {
  constructor(private readonly skills: SkillsService) {}

  @Get()
  @ApiOkResponse({ description: "Skill groups in display order." })
  list() {
    return this.skills.list();
  }

  @Get(":slug")
  @ApiOkResponse()
  get(@Param("slug", ParseSlugPipe) slug: string) {
    return this.skills.get(slug);
  }

  @Post()
  @UseGuards(ApiKeyGuard)
  @ApiSecurity("api-key")
  @ApiCreatedResponse()
  create(@Body() body: CreateSkillGroupDto) {
    return this.skills.create(body);
  }

  @Patch(":slug")
  @UseGuards(ApiKeyGuard)
  @ApiSecurity("api-key")
  @ApiOkResponse()
  update(
    @Param("slug", ParseSlugPipe) slug: string,
    @Body() body: UpdateSkillGroupDto,
  ) {
    return this.skills.update(slug, body);
  }

  @Delete(":slug")
  @UseGuards(ApiKeyGuard)
  @ApiSecurity("api-key")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  remove(@Param("slug", ParseSlugPipe) slug: string) {
    return this.skills.remove(slug);
  }
}
