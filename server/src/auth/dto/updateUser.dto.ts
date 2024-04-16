import { IsNotEmpty } from 'class-validator';
import { IsNotExistsRule } from '@/common/rules/is-not-exists.rule';
import { IsExistsRule } from '@/common/rules/is-exists.rule';

export default class UpdateUserDto {
  @IsNotEmpty({ message: 'id不能为空' })
  @IsExistsRule('user', { message: '帐号不存在' })
  id: string;
  @IsNotEmpty({ message: '邮箱不能为空' })
  @IsNotExistsRule('user', { message: '邮箱已被使用' })
  email: string;
  @IsNotEmpty({ message: '用户名不能为空' })
  name: string;
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
  avatar: string;
  github: string;
  background: string;
  description: string;
}
