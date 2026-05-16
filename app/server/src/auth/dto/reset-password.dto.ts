import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { IsExistsRule } from '@/common/rules/is-exists.rule';

export default class ResetPasswordDto {
  @IsEmail({}, { message: '请输入有效的邮箱地址' })
  @IsNotEmpty({ message: '邮箱不能为空' })
  @IsExistsRule('user', { message: '邮箱未被注册' })
  email: string;

  @IsNotEmpty({ message: '验证码不能为空' })
  code: string;

  @IsNotEmpty({ message: '新密码不能为空' })
  @MinLength(6, { message: '密码长度至少6位' })
  newPassword: string;
}
