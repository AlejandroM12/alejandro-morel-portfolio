import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  ValidateNested,
} from "class-validator";

export class LocalizedDto {
  @ApiProperty({ example: "" })
  @IsString()
  @MaxLength(4000)
  es!: string;

  @ApiProperty({ example: "" })
  @IsString()
  @MaxLength(4000)
  en!: string;
}

export class ScreenshotDto {
  @ApiProperty({ example: "/images/flowboard.png" })
  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  src!: string;

  @ApiProperty({ type: LocalizedDto })
  @ValidateNested()
  @Type(() => LocalizedDto)
  alt!: LocalizedDto;
}
