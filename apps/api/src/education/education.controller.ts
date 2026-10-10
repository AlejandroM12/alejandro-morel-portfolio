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
import { CreateEducationDto, UpdateEducationDto } from "./dto/education.dto";
import { EducationService } from "./education.service";

@ApiTags("education")
@Controller("education")
export class EducationController {
  constructor(private readonly education: EducationService) {}

  @Get()
  @ApiOkResponse({ description: "Education ordered for the page." })
  list() {
    return this.education.list();
  }

  @Get(":slug")
  @ApiOkResponse()
  get(@Param("slug", ParseSlugPipe) slug: string) {
    return this.education.get(slug);
  }

  @Post()
  @UseGuards(ApiKeyGuard)
  @ApiSecurity("api-key")
  @ApiCreatedResponse()
  create(@Body() body: CreateEducationDto) {
    return this.education.create(body);
  }

  @Patch(":slug")
  @UseGuards(ApiKeyGuard)
  @ApiSecurity("api-key")
  @ApiOkResponse()
  update(
    @Param("slug", ParseSlugPipe) slug: string,
    @Body() body: UpdateEducationDto,
  ) {
    return this.education.update(slug, body);
  }

  @Delete(":slug")
  @UseGuards(ApiKeyGuard)
  @ApiSecurity("api-key")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  remove(@Param("slug", ParseSlugPipe) slug: string) {
    return this.education.remove(slug);
  }
}
