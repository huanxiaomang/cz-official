<h1 align='center'>
  CZ Official Website
</h1>

<h5 align='center'>
<b>based on vue3 and nestjs.</b>
</h5>

<br>



## 功能

- 🗂️ 创智项目展览
- 💬 工作室新消息
- 👨🏻‍💻 当前工作室成员
- 📖 在线学习文档
- 🎨 蓝桥讨论区/留言板 (已实现)

## 结构

- `/` 前端主网站 (Vue3 + Vite)
- `app/server/` NestJS 后台服务与 Prisma 数据库模型
- `docs/` 开发文档与数据库设计
- `src/pages/comment/` 留言板/讨论区模块

后台管理系统过于繁杂，迁移至[这里](https://github.com/huanxiaomang/cz-admin)

## 开发文档

详细的开发指南和数据库设计，请参考：
- [开发环境与规范指南](./docs/development.md)
- [Prisma 数据库模型文档](./docs/database.md)


## 参与开发

### 1. 安装依赖

首先进入要开发的项目目录，然后：

```bash
pnpm install
```

### 2. 配置 `.env` 文件

在app/sever/下创建.env文件，填写你的本地配置：

```
DATABASE_URL="mysql://用户名:密码@localhost:端口/数据库名"
# TOKEN密钥
TOKEN_SECRET="你的密钥"
# 端口
PORT=3000
URL=localhost
```

### 3. 启动 nest 服务

启动之前，先依次执行:
#### 生成数据库迁移

```bash
npx prisma migrate dev
```

这一步会自动执行`prisma generate`命令，以生成对应的@prisma/client包。如果没有执行成功可以尝试手动执行：
```bash
npx prisma generate
```

#### 重新填充数据库
```bash
npx prisma migrate reset
```


现在启动nest服务：
```bash
pnpm dev:serve
```

确保nest服务启动成功后，可以使用`pnpm dev:web`启动前端服务。



