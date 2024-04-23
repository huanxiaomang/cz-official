import { IsNotEmpty } from 'class-validator';
import { IsNotExistsRule } from '@/common/rules/is-not-exists.rule';
import { IsExistsRule } from '@/common/rules/is-exists.rule';

export default class UpdateUserDto {
  @IsNotExistsRule('user', { message: '用户名已经被使用' })
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
  avatar: string;
  github: string;
  background: string;
    description: string;
    @IsNotEmpty({ message: '专业不能为空' })
    major: string;
    @IsNotEmpty({ message: '年级不能为空' })
    grade: number;
    badge: string;
}
