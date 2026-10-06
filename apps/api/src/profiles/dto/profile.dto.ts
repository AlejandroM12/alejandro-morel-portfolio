import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  ArrayMaxSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from "class-validator";
import { LocalizedDto } from "../../common/dto/localized.dto";

export class UpdateProfileDto {
  @ApiPropertyOptional({ example: "Alejandro Morel" })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(160)
  name?: string;

  @ApiPropertyOptional({ type: LocalizedDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedDto)
  jobTitle?: LocalizedDto;

  @ApiPropertyOptional({ type: LocalizedDto, isArray: true })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(20)
  @ValidateNested({ each: true })
  @Type(() => LocalizedDto)
  technologies?: LocalizedDto[];
}

export class ProfileResponseDto {
  @ApiProperty({ example: "alejandro-morel" })
  slug!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty({ type: LocalizedDto })
  jobTitle!: LocalizedDto;

  @ApiProperty({ type: LocalizedDto, isArray: true })
  technologies!: LocalizedDto[];
}
