# 开发环境与规范指南

欢迎参与创智（CZ）官网的开发！本项目采用了前后端分离的架构，前端使用 Vue 3 + Vite，后端使用 NestJS + Prisma。

## 项目目录结构

```text
cz-official/
├── app/
│   └── server/             # NestJS 后端项目
│       ├── prisma/         # 数据库迁移和模型定义
│       ├── src/            # 后端源码
│       ├── .env            # 后端环境变量 (需手动创建)
│       └── package.json
├── docs/                   # 项目文档
├── src/                    # Vue 3 前端项目源码
│   ├── api/                # API 接口封装
│   ├── assets/             # 静态资源 (图片、SVG、CSS)
│   ├── components/         # 全局复用组件
│   ├── composables/        # Vue 组合式函数 (Hooks)
│   ├── pages/              # 路由视图页面 (使用 unplugin-vue-router 自动生成路由)
│   ├── router/             # 路由配置
│   ├── store/              # Pinia 状态管理
│   ├── types/              # TypeScript 类型定义
│   └── utils/              # 工具函数与 HTTP 封装
├── .env.development        # 前端开发环境变量
├── package.json
└── vite.config.ts          # Vite 配置文件
```

## 开发环境准备

### 前置依赖
- **Node.js**: v18+ 
- **pnpm**: 推荐使用 pnpm 作为包管理器 (`npm i -g pnpm`)
- **MySQL**: 数据库服务 (建议 8.0+)
- **Redis**: 缓存服务 (主要用于后端验证码等功能)

### 快速启动

1. **安装全局依赖**
   ```bash
   pnpm install
   ```

2. **配置环境变量**
   在 `app/server/` 目录下创建 `.env` 文件：
   ```env
   DATABASE_URL="mysql://root:password@localhost:3306/cz_official"
   TOKEN_SECRET="your_jwt_secret"
   PORT=3000
   URL=localhost
   ```

3. **数据库初始化**
   ```bash
   cd app/server
   npx prisma migrate dev
   npx prisma db seed # 可选：填充初始测试数据
   ```

4. **启动服务**
   项目根目录下提供了便捷的启动脚本：
   - 启动后端服务：`pnpm dev:serve` (默认运行在 3000 端口)
   - 启动前端服务：`pnpm dev:web` (默认运行在 5173/8000 端口)

## 代码规范与约定

### 1. 代码风格
- **TypeScript**: 优先使用 TS，为组件和接口定义完善的 interface 或 type。
- **ESLint & Prettier**: 项目已配置相关的代码格式化工具，提交代码前请确保没有 Lint 错误。
- **Unocss**: 前端优先使用 Unocss 提供的原子化 CSS 类名进行布局与样式编写。

### 2. 状态管理
- 涉及跨组件共享的数据（如用户信息、主题状态）请放在 `src/store/` 下的 Pinia store 中。
- 模块内的局部状态尽量使用组合式函数 (`composables`) 封装。

### 3. API 请求
- 所有的后端请求应当封装在 `src/api/` 目录中。
- 使用 `src/utils/http/` 中提供的 Axios 实例进行请求，它已内置了 Token 携带与统一的错误拦截处理。

## 部署建议

详细的生产环境部署可以参考 `ENV_CONFIG.md`，核心流程如下：
1. 后端使用 `pnpm build` 编译，配合 PM2 等工具运行 `dist/main.js`。
2. 前端使用 `pnpm build` 构建静态文件，将 `dist` 目录部署到 Nginx 中，并配置反向代理以解决跨域问题。
