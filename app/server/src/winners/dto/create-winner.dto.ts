import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateWinnerDto {
  @IsString()
  @IsNotEmpty({ message: '姓名不能为空' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: '比赛名称不能为空' })
  competition: string;

  @IsString()
  @IsNotEmpty({ message: '获奖等级不能为空' })
  award: string;

  @IsString()
  @IsOptional()
  avatar?: string;
} 