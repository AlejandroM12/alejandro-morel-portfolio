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
  Query,
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
import {
  CreateProjectDto,
  ListProjectsQueryDto,
  UpdateProjectDto,
} from "./dto/project.dto";
import { ProjectsService } from "./projects.service";

@ApiTags("projects")
@Controller("projects")
export class ProjectsController {
  constructor(private readonly projects: ProjectsService) {}

  @Get()
  @ApiOkResponse({ description: "Projects ordered for the catalog." })
  list(@Query() query: ListProjectsQueryDto) {
    return this.projects.list({
      category: query.category,
      featured:
        query.featured === undefined ? undefined : query.featured === "true",
    });
  }

  @Get(":slug")
  @ApiOkResponse({ description: "One project." })
  get(@Param("slug", ParseSlugPipe) slug: string) {
    return this.projects.get(slug);
  }

  @Post()
  @UseGuards(ApiKeyGuard)
  @ApiSecurity("api-key")
  @ApiCreatedResponse({ description: "Project created." })
  create(@Body() body: CreateProjectDto) {
    return this.projects.create(body);
  }

  @Patch(":slug")
  @UseGuards(ApiKeyGuard)
  @ApiSecurity("api-key")
  @ApiOkResponse({ description: "Project updated." })
  update(
    @Param("slug", ParseSlugPipe) slug: string,
    @Body() body: UpdateProjectDto,
  ) {
    return this.projects.update(slug, body);
  }

  @Delete(":slug")
  @UseGuards(ApiKeyGuard)
  @ApiSecurity("api-key")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  remove(@Param("slug", ParseSlugPipe) slug: string) {
    return this.projects.remove(slug);
  }
}
