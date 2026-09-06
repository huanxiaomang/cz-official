import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
  MaxLength,
  Min,
  ValidateIf,
} from 'class-validator';

export class CreateCommentDto {
  @ValidateIf((dto: CreateCommentDto) => !dto.parentId)
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  title?: string;

  @ValidateIf((dto: CreateCommentDto) => !dto.parentId)
  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  category?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MaxLength(20, { each: true })
  tags?: string[];

  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  content: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  parentId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  quoteId?: number;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isPinned?: boolean;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isFeatured?: boolean;
}
