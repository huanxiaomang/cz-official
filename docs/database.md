# Prisma 数据库模型文档

本项目使用 [Prisma](https://www.prisma.io/) 作为 ORM 进行数据库操作。所有的模型定义均位于 `app/server/prisma/schema.prisma` 文件中。

## 核心数据模型

### User（用户表）

| 字段名 | 类型 | 描述 |
| --- | --- | --- |
| `userId` | Int (PK) | 用户唯一标识，自增 |
| `username` | String (Unique) | 用户名 |
| `password` | String | 密码（哈希存储） |
| `role` | String? | 角色权限 |
| `email` | String (Unique) | 邮箱地址 |
| `avatar` | String? | 头像 URL |
| `github` | String? | Github 主页链接 |
| `score` | Int | 积分/活跃度 |
| `badge` | String? | 佩戴的徽章 |
| `major` | String | 专业 |
| `grade` | Int | 年级 |

### Comment（讨论区/留言表）

支持多级嵌套回复、富文本内容、以及引用回复。

| 字段名 | 类型 | 描述 |
| --- | --- | --- |
| `id` | Int (PK) | 留言唯一标识，自增 |
| `title` | String? | 帖子标题（针对主贴） |
| `category` | String? | 分类（如：技术交流、生活闲谈） |
| `tags` | String? | 标签，逗号分隔 |
| `content` | String | 留言内容（支持富文本/Markdown） |
| `userId` | Int (FK) | 关联至 User 表，留言作者 |
| `parentId` | Int? (FK) | 关联至本表，父级留言 ID，用于嵌套回复 |
| `quoteId` | Int? (FK) | 关联至本表，引用的目标留言 ID |
| `isPinned` | Boolean | 是否置顶，默认 false |
| `isFeatured`| Boolean | 是否加精，默认 false |
| `createdAt` | DateTime | 创建时间 |

**关联关系：**
- `user`: 该留言对应的作者
- `parent` & `replies`: 树状嵌套回复结构
- `quote` & `quotedBy`: 引用和被引用的结构
- `likes`: 该留言的所有点赞记录

### CommentLike（留言点赞表）

| 字段名 | 类型 | 描述 |
| --- | --- | --- |
| `id` | Int (PK) | 自增主键 |
| `commentId` | Int (FK) | 关联至 Comment 表 |
| `userId` | Int (FK) | 关联至 User 表，点赞用户 |

*注：`commentId` 与 `userId` 设置了联合唯一索引，确保一个用户对一条留言只能点赞一次。*

### Project（项目展览表）

| 字段名 | 类型 | 描述 |
| --- | --- | --- |
| `id` | Int (PK) | 项目唯一标识 |
| `title` | String | 项目名称 |
| `content` | String | 项目详细描述 |
| `stack` | String | 技术栈 |
| `members` | String | 参与成员 |

### Message（站内消息表）

| 字段名 | 类型 | 描述 |
| --- | --- | --- |
| `id` | Int (PK) | 消息唯一标识 |
| `title` | String | 消息标题 |
| `content` | String | 消息内容 |

### Winner & activity（成就与活动）

- `Winner`: 记录在各大比赛中获奖的成员信息（包含奖项、比赛名称等）。
- `activity`: 记录工作室历年举办或参与的各种活动信息（包含活动起止时间、状态等）。

## 数据库维护指南

每次修改 `schema.prisma` 之后，需要执行以下命令同步数据库并更新 Prisma Client：

```bash
cd app/server

# 开发环境创建并应用新的迁移
npx prisma migrate dev --name <migration_name>

# 重新生成 Prisma Client 类型文件
npx prisma generate
```
