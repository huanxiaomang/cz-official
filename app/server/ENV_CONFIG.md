# 环境变量配置说明

## 📋 必需的环境变量

请在 `app/server` 目录下创建 `.env` 文件，包含以下配置：

```bash
# 数据库配置
DATABASE_URL="mysql://username:password@localhost:3306/database_name"

# TOKEN密钥 - 请使用强随机字符串
TOKEN_SECRET="your-super-secret-jwt-token-key-here"

# 端口配置
PORT=3000
URL=localhost  # 生产环境若需绕过 DNS，可设置为服务器 IP（例如 1.92.82.236）

# Redis 配置
REDIS_URL=redis://localhost:6379

# SMTP 邮件服务配置
SMTP_HOST=smtp.qq.com                    # 邮件服务商SMTP主机
SMTP_PORT=465                           # SMTP 端口
SMTP_SECURE=true                        # 是否启用 SSL
SMTP_USER=your-email@qq.com             # 发件人邮箱
SMTP_PASS=your-smtp-authorization-code  # 邮箱授权码（非登录密码）
FROM_EMAIL=your-email@qq.com            # 显示的发件人邮箱
```

## 🔧 配置说明

### 数据库配置
- 替换 `username`、`password`、`database_name` 为实际的数据库信息

### JWT Token 密钥
- 使用强随机字符串，建议 64 位以上
- 可以使用在线工具生成：`openssl rand -hex 32`

### SMTP 邮件配置
- **SMTP_USER**: 发件人邮箱地址
- **SMTP_PASS**: 邮箱授权码（不是登录密码！）
  - QQ邮箱：设置 → 账户 → 开启SMTP服务 → 获取授权码
  - 163邮箱：设置 → POP3/SMTP/IMAP → 开启SMTP → 获取授权码
- **FROM_EMAIL**: 显示的发件人邮箱，通常与 SMTP_USER 相同

### Redis 配置
- 如果没有 Redis 服务，系统会自动使用内存缓存作为备选

## ⚠️ 安全提醒

1. **绝对不要**将 `.env` 文件提交到 Git 仓库
2. **绝对不要**在代码中硬编码敏感信息
3. 生产环境请使用更强的密钥和密码
4. 定期更换 TOKEN_SECRET 和邮箱授权码

## 🚀 快速开始

1. 复制上述配置到 `app/server/.env` 文件
2. 替换所有示例值为实际配置
3. 运行 `pnpm dev` 启动开发服务器
