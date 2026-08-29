import { IsString, IsNotEmpty, IsOptional, IsInt, IsIn, IsArray, ArrayUnique } from 'class-validator';

export const WINNER_CATEGORIES = ['COMPETITION', 'SCHOLARSHIP', 'HONOR'] as const;

export class CreateWinnerDto {
  @IsString()
  @IsNotEmpty({ message: '成就名称不能为空' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: '获奖等级不能为空' })
  award: string;

  @IsString()
  @IsIn(WINNER_CATEGORIES, { message: '成就类型不合法' })
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  avatar?: string;

  @IsArray({ message: '关联成员不合法' })
  @ArrayUnique({ message: '关联成员不能重复' })
  @IsInt({ each: true, message: '关联成员不合法' })
  @IsOptional()
  memberIds?: number[];
}
