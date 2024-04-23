import { IsNotEmpty } from 'class-validator';
import { IsExistsRule } from '@/common/rules/is-exists.rule';

export default class LoginDto {
  @IsNotEmpty({ message: '邮箱不能为空' })
  @IsExistsRule('user', { message: '邮箱未被注册' })
  email: string;
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}
