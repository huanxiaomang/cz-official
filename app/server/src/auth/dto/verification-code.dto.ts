import { IsEmail, IsNotEmpty } from 'class-validator';
import { IsExistsRule } from '@/common/rules/is-exists.rule';

export class SendVerificationCodeDto {
  @IsEmail({}, { message: '请输入有效的邮箱地址' })
  @IsNotEmpty({ message: '邮箱不能为空' })
  @IsExistsRule('user', { message: '邮箱未被注册' })
  email: string;

  @IsNotEmpty({ message: '验证码类型不能为空' })
  type: string; // 'password_reset' | 'email_verify' | 'login' 等
}

export class VerifyCodeDto {
  @IsEmail({}, { message: '请输入有效的邮箱地址' })
  @IsNotEmpty({ message: '邮箱不能为空' })
  email: string;

  @IsNotEmpty({ message: '验证码不能为空' })
  code: string;

  @IsNotEmpty({ message: '验证码类型不能为空' })
  type: string;
}
