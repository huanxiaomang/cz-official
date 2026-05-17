import { IsArray, IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateCommentDto {
  id?: number;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  category?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MaxLength(20, { each: true })
  tags?: string[];

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  content?: string;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isPinned?: boolean;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isFeatured?: boolean;
}
