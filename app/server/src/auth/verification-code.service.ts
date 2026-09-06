import { Injectable, BadRequestException } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';
import { MailService } from '../mail/mail.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VerificationCodeService {
  constructor(
    private redis: RedisService,
    private mail: MailService,
    private prisma: PrismaService,
  ) {}

  // 生成并发送验证码（通用方法）
  async sendVerificationCode(email: string, type: string) {
    // 1. 验证邮箱是否存在
    const user = await this.prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      throw new BadRequestException('该邮箱未注册');
    }

    // 2. 检查发送频率限制
    const rateLimitKey = `rate_limit:${type}:${email}`;
    const lastSent = await this.redis.get(rateLimitKey);
    if (lastSent) {
      throw new BadRequestException('验证码发送过于频繁，请稍后再试');
    }

    // 3. 生成6位随机验证码
    const code = Math.random().toString().slice(2, 8);

    // 🔧 临时调试：在控制台显示验证码
    console.log(`\n🔐 验证码已生成 - ${type}`);
    console.log(`📧 邮箱: ${email}`);
    console.log(`🔢 验证码: ${code}`);
    console.log(`⏰ 有效期: 5分钟\n`);

    // 4. 存储到 Redis（5分钟过期）
    const codeKey = `verification_code:${type}:${email}`;
    await this.redis.set(codeKey, code, 300); // 5分钟过期

    // 5. 设置频率限制（60秒内不能重复发送）
    await this.redis.set(rateLimitKey, Date.now().toString(), 60);

    // 6. 发送邮件（测试环境下跳过）
    try {
      await this.sendEmail(email, code, type, user.username);
    } catch (error) {
      console.log(`⚠️ 邮件发送失败（测试环境忽略）: ${error.message}`);
      // 在测试环境下不抛出错误，只记录日志
    }
  }

  // 验证验证码（通用方法）
  async verifyCode(email: string, code: string, type: string): Promise<boolean> {
    const codeKey = `verification_code:${type}:${email}`;
    const storedCode = await this.redis.get(codeKey);

    if (!storedCode || storedCode !== code) {
      throw new BadRequestException('验证码错误或已过期');
    }

    // 验证成功后清除验证码（防止重复使用）
    await this.redis.del(codeKey);
    return true;
  }

  // 发送邮件的私有方法
  private async sendEmail(email: string, code: string, type: string, username: string) {
    // 检查邮件配置是否存在
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
      throw new Error('邮件配置缺失，跳过邮件发送');
    }

    const emailTemplates = {
      'password_reset': {
        subject: '创智工作室密码找回验证码',
        template: 'verification-code'
      },
      'email_verify': {
        subject: '创智工作室邮箱验证码',
        template: 'verification-code'
      },
      'login': {
        subject: '创智工作室登录验证码',
        template: 'verification-code'
      }
    };

    const emailConfig = emailTemplates[type] || emailTemplates['password_reset'];

    await this.mail.send({
      to: email,
      subject: emailConfig.subject,
      template: emailConfig.template,
      context: { username: username || '用户', code, type }
    });
  }
}
