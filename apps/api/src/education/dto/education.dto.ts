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

export class CreateEducationDto {
  @ApiProperty({ example: "fermosa" })
  @IsString()
  @MaxLength(80)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  slug!: string;

  @ApiProperty({ example: "Instituto Superior Fermosa" })
  @IsString()
  @IsNotEmpty()
  @MaxLength(160)
  institution!: string;

  @ApiPropertyOptional({ type: LocalizedDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedDto)
  credential?: LocalizedDto;

  @ApiPropertyOptional({ type: LocalizedDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedDto)
  period?: LocalizedDto;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(0)
  @Max(10_000)
  order!: number;
}

export class UpdateEducationDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(160)
  institution?: string;

  @ApiPropertyOptional({ type: LocalizedDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedDto)
  credential?: LocalizedDto;

  @ApiPropertyOptional({ type: LocalizedDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedDto)
  period?: LocalizedDto;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(10_000)
  order?: number;
}
