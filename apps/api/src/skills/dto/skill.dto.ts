import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  ArrayMaxSize,
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from "class-validator";
import { LocalizedDto } from "../../common/dto/localized.dto";

export class CreateSkillGroupDto {
  @ApiProperty({ example: "web" })
  @IsString()
  @MaxLength(80)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  slug!: string;

  @ApiProperty({ type: LocalizedDto })
  @ValidateNested()
  @Type(() => LocalizedDto)
  label!: LocalizedDto;

  @ApiPropertyOptional({ type: LocalizedDto, isArray: true })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(40)
  @ValidateNested({ each: true })
  @Type(() => LocalizedDto)
  items?: LocalizedDto[];

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(0)
  @Max(10_000)
  order!: number;
}

export class UpdateSkillGroupDto {
  @ApiPropertyOptional({ type: LocalizedDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedDto)
  label?: LocalizedDto;

  @ApiPropertyOptional({ type: LocalizedDto, isArray: true })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(40)
  @ValidateNested({ each: true })
  @Type(() => LocalizedDto)
  items?: LocalizedDto[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(10_000)
  order?: number;
}
