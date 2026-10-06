import { Body, Controller, Get, Param, Patch, UseGuards } from "@nestjs/common";
import { ApiOkResponse, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { ApiKeyGuard } from "../common/guards/api-key.guard";
import { ParseSlugPipe } from "../common/pipes/parse-slug.pipe";
import { ProfileResponseDto, UpdateProfileDto } from "./dto/profile.dto";
import { ProfilesService } from "./profiles.service";

@ApiTags("profiles")
@Controller("profiles")
export class ProfilesController {
  constructor(private readonly profiles: ProfilesService) {}

  @Get()
  @ApiOkResponse({ type: ProfileResponseDto, isArray: true })
  list() {
    return this.profiles.list();
  }

  @Get(":slug")
  @ApiOkResponse({ type: ProfileResponseDto })
  get(@Param("slug", ParseSlugPipe) slug: string) {
    return this.profiles.get(slug);
  }

  @Patch(":slug")
  @UseGuards(ApiKeyGuard)
  @ApiSecurity("api-key")
  @ApiOkResponse({ type: ProfileResponseDto })
  update(
    @Param("slug", ParseSlugPipe) slug: string,
    @Body() body: UpdateProfileDto,
  ) {
    return this.profiles.update(slug, body);
  }
}
