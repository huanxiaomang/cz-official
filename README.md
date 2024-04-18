<h1 align='center'>
  CZ Official Website
</h1>

<h5 align='center'>
<b>based on Vitesse and nestjs.</b>
</h5>

<br>



## 功能

- 🗂 创智项目展览

- 📦 工作室新消息

- 😃 在线学习文档

- 🎨 留言板


## 结构

- web/ 主网站

- sever/ nest后台

- admin/ 后台管理系统

- message-board/ 留言版（待开发）

- docs/ 学习文档（待移植）

## 参与开发

### 1. 安装依赖

首先进入要开发的项目目录，然后：

```bash
pnpm install
```

### 2. 配置 `.env` 文件

在sever/下创建.env文件，填写你的本地配置：

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
如果卡住不动，可直接使用项目根目录的@prisma覆盖server/node_modules/@prisma目录。

#### 重新填充数据库
```bash
npx prisma migrate reset
``

每次修改prisma都要执行上述指令。

现在启动nest服务：
```bash
pnpm dev
```

确保nest服务启动成功后，可以使用`pnpm dev`启动其他项目(本项目不打算使用mock，mock/只是模板自带)。


## 后续开发点

先写在这里，让工作室其他人看着做一做

1. nest配置swagger生成接口文档
2. 美化admin布局（现在只是差不多实现了功能，页面的设计完全没怎么考虑！）
3. TS: 一些功能没有写类型，里面都是ts报错！(´ｰ∀ｰ`)
4. 项目中随处可见的`TODO:`

Tips: admin/是套用的模板，项目结构繁杂，请只关心所见页面部分代码，不要迷路了~
