import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  ArrayMaxSize,
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  Max,
  MaxLength,
  Min,
  ValidateIf,
  ValidateNested,
} from "class-validator";
import { LocalizedDto, ScreenshotDto } from "../../common/dto/localized.dto";
import {
  projectCategories,
  projectStatuses,
} from "../../common/project-status";

export class CreateProjectDto {
  @ApiProperty({ example: "flowboard" })
  @IsString()
  @MaxLength(80)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  slug!: string;

  @ApiProperty({ example: "Flowboard" })
  @IsString()
  @IsNotEmpty()
  @MaxLength(160)
  name!: string;

  @ApiProperty({ enum: projectStatuses, example: "concept" })
  @IsIn(projectStatuses)
  status!: (typeof projectStatuses)[number];

  @ApiProperty({ example: true })
  @IsBoolean()
  featured!: boolean;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(0)
  @Max(10_000)
  order!: number;

  @ApiProperty({ enum: projectCategories, isArray: true })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMaxSize(5)
  @IsIn(projectCategories, { each: true })
  categories!: (typeof projectCategories)[number][];

  @ApiPropertyOptional({ type: String, isArray: true })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(40)
  @IsString({ each: true })
  @MaxLength(80, { each: true })
  technologies?: string[];

  @ApiPropertyOptional({ type: String, isArray: true })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(20)
  @IsString({ each: true })
  @MaxLength(40, { each: true })
  languages?: string[];

  @ApiProperty({ type: LocalizedDto })
  @ValidateNested()
  @Type(() => LocalizedDto)
  summary!: LocalizedDto;

  @ApiProperty({ type: LocalizedDto })
  @ValidateNested()
  @Type(() => LocalizedDto)
  overview!: LocalizedDto;

  @ApiPropertyOptional({ type: LocalizedDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedDto)
  problem?: LocalizedDto;

  @ApiPropertyOptional({ type: LocalizedDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedDto)
  solution?: LocalizedDto;

  @ApiPropertyOptional({ type: LocalizedDto, isArray: true })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(40)
  @ValidateNested({ each: true })
  @Type(() => LocalizedDto)
  features?: LocalizedDto[];

  @ApiPropertyOptional({ type: LocalizedDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedDto)
  architecture?: LocalizedDto;

  @ApiPropertyOptional({ type: LocalizedDto, isArray: true })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(40)
  @ValidateNested({ each: true })
  @Type(() => LocalizedDto)
  decisions?: LocalizedDto[];

  @ApiPropertyOptional({ type: ScreenshotDto, isArray: true })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(20)
  @ValidateNested({ each: true })
  @Type(() => ScreenshotDto)
  screenshots?: ScreenshotDto[];

  @ApiPropertyOptional({ example: "" })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  @ValidateIf((_, value: unknown) => value !== "")
  @IsUrl({ protocols: ["http", "https"], require_protocol: true })
  demoUrl?: string;

  @ApiPropertyOptional({ example: "" })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  @ValidateIf((_, value: unknown) => value !== "")
  @IsUrl({ protocols: ["http", "https"], require_protocol: true })
  repositoryUrl?: string;
}

export class UpdateProjectDto {
  @ApiPropertyOptional({ example: "Flowboard" })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(160)
  name?: string;

  @ApiPropertyOptional({ enum: projectStatuses })
  @IsOptional()
  @IsIn(projectStatuses)
  status?: (typeof projectStatuses)[number];

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(10_000)
  order?: number;

  @ApiPropertyOptional({ enum: projectCategories, isArray: true })
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMaxSize(5)
  @IsIn(projectCategories, { each: true })
  categories?: (typeof projectCategories)[number][];

  @ApiPropertyOptional({ type: String, isArray: true })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(40)
  @IsString({ each: true })
  @MaxLength(80, { each: true })
  technologies?: string[];

  @ApiPropertyOptional({ type: String, isArray: true })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(20)
  @IsString({ each: true })
  @MaxLength(40, { each: true })
  languages?: string[];

  @ApiPropertyOptional({ type: LocalizedDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedDto)
  summary?: LocalizedDto;

  @ApiPropertyOptional({ type: LocalizedDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedDto)
  overview?: LocalizedDto;

  @ApiPropertyOptional({ type: LocalizedDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedDto)
  problem?: LocalizedDto;

  @ApiPropertyOptional({ type: LocalizedDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedDto)
  solution?: LocalizedDto;

  @ApiPropertyOptional({ type: LocalizedDto, isArray: true })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(40)
  @ValidateNested({ each: true })
  @Type(() => LocalizedDto)
  features?: LocalizedDto[];

  @ApiPropertyOptional({ type: LocalizedDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedDto)
  architecture?: LocalizedDto;

  @ApiPropertyOptional({ type: LocalizedDto, isArray: true })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(40)
  @ValidateNested({ each: true })
  @Type(() => LocalizedDto)
  decisions?: LocalizedDto[];

  @ApiPropertyOptional({ type: ScreenshotDto, isArray: true })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(20)
  @ValidateNested({ each: true })
  @Type(() => ScreenshotDto)
  screenshots?: ScreenshotDto[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  @ValidateIf((_, value: unknown) => value !== "")
  @IsUrl({ protocols: ["http", "https"], require_protocol: true })
  demoUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  @ValidateIf((_, value: unknown) => value !== "")
  @IsUrl({ protocols: ["http", "https"], require_protocol: true })
  repositoryUrl?: string;
}

export class ListProjectsQueryDto {
  @ApiPropertyOptional({ enum: projectCategories })
  @IsOptional()
  @IsIn(projectCategories)
  category?: (typeof projectCategories)[number];

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @Type(() => String)
  @IsIn(["true", "false"])
  featured?: "true" | "false";
}
