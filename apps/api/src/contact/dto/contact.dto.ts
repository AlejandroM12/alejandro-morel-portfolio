import { ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  ValidateIf,
} from "class-validator";

export class UpdateContactDto {
  @ApiPropertyOptional({ example: "" })
  @IsOptional()
  @IsString()
  @MaxLength(320)
  @ValidateIf((_, value: unknown) => value !== "")
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: "" })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  @ValidateIf((_, value: unknown) => value !== "")
  @IsUrl({ protocols: ["http", "https"], require_protocol: true })
  linkedin?: string;

  @ApiPropertyOptional({ example: "" })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  @ValidateIf((_, value: unknown) => value !== "")
  @IsUrl({ protocols: ["http", "https"], require_protocol: true })
  cvUrl?: string;
}

export class ContactResponseDto {
  @ApiPropertyOptional()
  email!: string;

  @ApiPropertyOptional()
  linkedin!: string;

  @ApiPropertyOptional()
  cvUrl!: string;
}
