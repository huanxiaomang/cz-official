import { IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';

export default class UpdateUserDto {
  // @IsNotExistsRule('user', { message: '用户名已经被使用' })
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString({ message: '用户名格式不正确' })
  username: string;

  @IsOptional()
  @IsString({ message: '头像地址格式不正确' })
  avatar: string;

  @IsOptional()
  @IsString({ message: 'GitHub 地址格式不正确' })
  github: string;

  @IsOptional()
  @IsString({ message: '背景图地址格式不正确' })
  background: string;

  @IsOptional()
  @IsString({ message: '个人描述格式不正确' })
  description: string;

  @IsNotEmpty({ message: '专业不能为空' })
  @IsString({ message: '专业格式不正确' })
  major: string;

  @IsOptional()
  @IsInt({ message: '旧年级格式不正确' })
  grade?: number;

  @IsNotEmpty({ message: '入学年份不能为空' })
  @IsInt({ message: '入学年份格式不正确' })
  admissionYear: number;

  @IsOptional()
  @IsString({ message: '徽章格式不正确' })
  badge: string;
}
