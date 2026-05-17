import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';
import { readFile } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private transporter: nodemailer.Transporter;

  constructor() {
    // 从环境变量读取 SMTP 配置（需在 .env 文件中配置）
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT, 10),
      secure: process.env.SMTP_SECURE === 'true', // 是否使用 SSL
      auth: {
        user: process.env.SMTP_USER, // 发件人邮箱
        pass: process.env.SMTP_PASS, // 邮箱授权码
      },
    });
  }

  // 渲染邮件模板（类似 Java 版 Thymeleaf）
  private async renderTemplate(templateName: string, context: Record<string, any>): Promise<string> {
    // 使用相对于项目根目录的路径，支持开发和生产环境
    let templatePath: string;

    if (process.env.NODE_ENV === 'production') {
      // 生产环境：从dist目录查找
      templatePath = join(process.cwd(), 'dist', 'src', 'mail', 'templates', `${templateName}.html`);
    } else {
      // 开发环境：从src目录查找
      templatePath = join(process.cwd(), 'src', 'mail', 'templates', `${templateName}.html`);
    }

    const templateContent = await readFile(templatePath, 'utf-8');
    const template = handlebars.compile(templateContent);
    return template(context);
  }

  // 发送邮件（替换原 HTTP 调用逻辑）
  async send({ to, subject, template, context }: {
    to: string;
    subject: string;
    template: string; // 模板名称（如 "verification-code"）
    context: Record<string, any>;
  }) {
    try {
      // 渲染 HTML 模板
      const html = await this.renderTemplate(template, context);

      // 发送邮件 - 确保发件人与认证用户一致
      await this.transporter.sendMail({
        from: `"创智工作室" <${process.env.SMTP_USER}>`, // 使用SMTP_USER作为发件人
        to,
        subject,
        html,
        text: `您的验证码是：${context.code}`, // 纯文本回退
      });
      this.logger.log(`邮件发送成功，目标邮箱：${to}`);
    } catch (error) {
      this.logger.error(`邮件发送失败，目标邮箱：${to}，错误：${error.message}`);
      throw new Error('邮件发送失败，请稍后重试');
    }
  }
}
