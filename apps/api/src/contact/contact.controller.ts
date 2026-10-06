import { Body, Controller, Get, Patch, UseGuards } from "@nestjs/common";
import { ApiOkResponse, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { ApiKeyGuard } from "../common/guards/api-key.guard";
import { ContactService } from "./contact.service";
import { ContactResponseDto, UpdateContactDto } from "./dto/contact.dto";

@ApiTags("contact")
@Controller("contact")
export class ContactController {
  constructor(private readonly contact: ContactService) {}

  @Get()
  @ApiOkResponse({ type: ContactResponseDto })
  get() {
    return this.contact.get();
  }

  @Patch()
  @UseGuards(ApiKeyGuard)
  @ApiSecurity("api-key")
  @ApiOkResponse({ type: ContactResponseDto })
  update(@Body() body: UpdateContactDto) {
    return this.contact.update(body);
  }
}
