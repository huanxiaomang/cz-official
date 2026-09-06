import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { IsConfirm } from '@/common/rules/is-confirm.rule';
import { IsNotExistsRule } from '@/common/rules/is-not-exists.rule';

export default class RegisterDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsNotExistsRule('user', { message: '用户已经注册' })
  username: string;
  @IsNotEmpty({ message: '邮箱不能为空' })
  @IsNotExistsRule('user', { message: '邮箱已被使用' })
  email: string;
  @IsNotEmpty({ message: '密码不能为空' })
  @IsConfirm({ message: '两次密码不一致' })
  password: string;
  @IsNotEmpty({ message: '确认密码不能为空' })
  password_confirm: string;
  @IsNotEmpty({ message: '邀请码不能为空' })
  invitationCode: string;
  @IsNotEmpty({ message: '主修专业不能为空' })
  major: string;
  @IsOptional()
  @IsInt({ message: '旧年级格式不正确' })
  grade?: number;
  @IsNotEmpty({ message: '入学年份不能为空' })
  @IsInt({ message: '入学年份格式不正确' })
  admissionYear: number;
}
