import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from "class-validator";
import { LocalizedDto } from "../../common/dto/localized.dto";

export class CreateExperienceDto {
  @ApiProperty({ example: "itti" })
  @IsString()
  @MaxLength(80)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  slug!: string;

  @ApiProperty({ example: "itti" })
  @IsString()
  @IsNotEmpty()
  @MaxLength(160)
  organization!: string;

  @ApiPropertyOptional({ type: LocalizedDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedDto)
  role?: LocalizedDto;

  @ApiPropertyOptional({ example: "" })
  @IsOptional()
  @IsString()
  @MaxLength(80)
  period?: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(0)
  @Max(10_000)
  order!: number;
}

export class UpdateExperienceDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(160)
  organization?: string;

  @ApiPropertyOptional({ type: LocalizedDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedDto)
  role?: LocalizedDto;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(80)
  period?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(10_000)
  order?: number;
}
