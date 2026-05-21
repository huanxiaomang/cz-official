# 活动日历 API 文档

## 概述

活动日历API提供了创智工作室活动管理的完整功能，包括活动的创建、查询、更新和删除操作。所有接口都基于RESTful设计原则。

## 基础信息

- **基础URL**: `https://api.czstudio.tech/api/v1`
- **内容类型**: `application/json`
- **字符编码**: `UTF-8`
- **认证方式**: Bearer Token
- **API版本**: v1

## 数据模型

### Activity (活动)

```typescript
interface Activity {
  id: number;           // 活动ID，自动生成
  intro: string;        // 活动简介，显示在日历上
  detail: string;       // 活动详细描述
  sdate: string;        // 开始日期 (YYYY-MM-DD)
  edate: string;        // 结束日期 (YYYY-MM-DD)
  joiners: string;      // 参与人员，逗号分隔
  status: number;       // 活动状态 (0=未开始, 1=进行中, 2=已结束)
  createdAt: string;    // 创建时间 (ISO 8601)
  updatedAt: string;    // 更新时间 (ISO 8601)
}
```

### 活动状态说明

| 状态值 | 状态名称 | 描述 |
|--------|----------|------|
| 0 | 未开始 | 活动尚未开始 |
| 1 | 进行中 | 活动正在进行 |
| 2 | 已结束 | 活动已经结束 |

## API 接口

### 1. 获取所有活动

获取系统中的所有活动列表，按创建时间倒序排列。

**接口信息**
- **URL**: `/activity`
- **方法**: `GET`
- **描述**: 获取所有活动数据

**请求参数**
无

**响应示例**
```json
{
  "success": true,
  "code": 200,
  "message": "获取活动列表成功",
  "data": [
    {
      "id": 1,
      "intro": "前端技术分享会",
      "detail": "分享Vue3、TypeScript等前端技术的最新发展和实践经验...",
      "sdate": "2024-12-15",
      "edate": "2024-12-15",
      "joiners": "张三,李四,王五,赵六",
      "status": 0,
      "createdAt": "2024-12-01T10:00:00.000Z",
      "updatedAt": "2024-12-01T10:00:00.000Z"
    }
  ],
  "timestamp": "2024-12-01T10:00:00.000Z",
  "requestId": "req_123456789"
}
```

**状态码**
- `200`: 成功获取活动列表
- `500`: 服务器内部错误

---

### 2. 创建新活动

创建一个新的活动。

**接口信息**
- **URL**: `/activity`
- **方法**: `POST`
- **描述**: 创建新的活动

**请求头**
```
Content-Type: application/json
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**请求体**
```json
{
  "intro": "string",      // 必填，活动简介
  "detail": "string",     // 必填，活动详细描述
  "sdate": "string",      // 必填，开始日期 (YYYY-MM-DD)
  "edate": "string",      // 必填，结束日期 (YYYY-MM-DD)
  "joiners": "string",    // 必填，参与人员
  "status": "number"      // 必填，活动状态 (0/1/2)
}
```

**请求示例**
```json
{
  "intro": "前端技术分享会",
  "detail": "分享Vue3、TypeScript等前端技术的最新发展和实践经验，包括组件设计、状态管理、性能优化等内容。",
  "sdate": "2024-12-15",
  "edate": "2024-12-15",
  "joiners": "张三,李四,王五,赵六",
  "status": 0
}
```

**响应示例**
```json
{
  "success": true,
  "code": 201,
  "message": "活动创建成功",
  "data": {
    "id": 1,
    "intro": "前端技术分享会",
    "detail": "分享Vue3、TypeScript等前端技术的最新发展和实践经验...",
    "sdate": "2024-12-15",
    "edate": "2024-12-15",
    "joiners": "张三,李四,王五,赵六",
    "status": 0,
    "createdAt": "2024-12-01T10:00:00.000Z",
    "updatedAt": "2024-12-01T10:00:00.000Z"
  },
  "timestamp": "2024-12-01T10:00:00.000Z",
  "requestId": "req_123456789"
}
```

**状态码**
- `201`: 活动创建成功
- `400`: 请求参数错误
- `500`: 服务器内部错误

**验证规则**
- `intro`: 必填，字符串类型
- `detail`: 必填，字符串类型
- `sdate`: 必填，字符串类型，日期格式
- `edate`: 必填，字符串类型，日期格式
- `joiners`: 必填，字符串类型
- `status`: 必填，数字类型 (0, 1, 2)

---

### 3. 获取单个活动

根据活动ID获取特定活动的详细信息。

**接口信息**
- **URL**: `/activity/{id}`
- **方法**: `GET`
- **描述**: 获取指定ID的活动详情

**路径参数**
- `id`: 活动ID (number)

**请求示例**
```
GET /activity/1
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**响应示例**
```json
{
  "success": true,
  "code": 200,
  "message": "获取活动详情成功",
  "data": {
    "id": 1,
    "intro": "前端技术分享会",
    "detail": "分享Vue3、TypeScript等前端技术的最新发展和实践经验...",
    "sdate": "2024-12-15",
    "edate": "2024-12-15",
    "joiners": "张三,李四,王五,赵六",
    "status": 0,
    "createdAt": "2024-12-01T10:00:00.000Z",
    "updatedAt": "2024-12-01T10:00:00.000Z"
  },
  "timestamp": "2024-12-01T10:00:00.000Z",
  "requestId": "req_123456789"
}
```

**状态码**
- `200`: 成功获取活动详情
- `404`: 活动不存在
- `500`: 服务器内部错误

---

### 4. 更新活动

更新指定活动的信息。

**接口信息**
- **URL**: `/activity/{id}`
- **方法**: `PATCH`
- **描述**: 更新指定ID的活动信息

**路径参数**
- `id`: 活动ID (number)

**请求头**
```
Content-Type: application/json
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**请求体**
```json
{
  "intro": "string",      // 可选，活动简介
  "detail": "string",     // 可选，活动详细描述
  "sdate": "string",      // 可选，开始日期
  "edate": "string",      // 可选，结束日期
  "joiners": "string",    // 可选，参与人员
  "status": "number"      // 可选，活动状态
}
```

**请求示例**
```json
{
  "status": 1,
  "joiners": "张三,李四,王五,赵六,钱七"
}
```

**响应示例**
```json
{
  "success": true,
  "code": 200,
  "message": "活动更新成功",
  "data": {
    "id": 1,
    "intro": "前端技术分享会",
    "detail": "分享Vue3、TypeScript等前端技术的最新发展和实践经验...",
    "sdate": "2024-12-15",
    "edate": "2024-12-15",
    "joiners": "张三,李四,王五,赵六,钱七",
    "status": 1,
    "createdAt": "2024-12-01T10:00:00.000Z",
    "updatedAt": "2024-12-01T11:30:00.000Z"
  },
  "timestamp": "2024-12-01T10:00:00.000Z",
  "requestId": "req_123456789"
}
```

**状态码**
- `200`: 活动更新成功
- `400`: 请求参数错误
- `404`: 活动不存在
- `500`: 服务器内部错误

---

### 5. 删除活动

删除指定的活动。

**接口信息**
- **URL**: `/activity/{id}`
- **方法**: `DELETE`
- **描述**: 删除指定ID的活动

**路径参数**
- `id`: 活动ID (number)

**请求示例**
```
DELETE /activity/1
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**响应示例**
```json
{
  "success": true,
  "code": 200,
  "message": "活动删除成功",
  "data": {
    "id": 1,
    "intro": "前端技术分享会",
    "detail": "分享Vue3、TypeScript等前端技术的最新发展和实践经验...",
    "sdate": "2024-12-15",
    "edate": "2024-12-15",
    "joiners": "张三,李四,王五,赵六",
    "status": 0,
    "createdAt": "2024-12-01T10:00:00.000Z",
    "updatedAt": "2024-12-01T10:00:00.000Z"
  },
  "timestamp": "2024-12-01T10:00:00.000Z",
  "requestId": "req_123456789"
}
```

**状态码**
- `200`: 活动删除成功
- `404`: 活动不存在
- `500`: 服务器内部错误

## 错误处理

### 错误响应格式
```json
{
  "success": false,
  "code": 400,
  "message": "请求参数错误",
  "error": {
    "type": "VALIDATION_ERROR",
    "details": [
      {
        "field": "intro",
        "message": "活动简介不能为空"
      }
    ]
  },
  "timestamp": "2024-12-01T10:00:00.000Z",
  "requestId": "req_123456789"
}
```

### 常见错误码
- `400`: 请求参数错误
- `401`: 未授权访问
- `403`: 禁止访问
- `404`: 资源不存在
- `429`: 请求频率限制
- `500`: 服务器内部错误
- `503`: 服务暂时不可用

## 使用示例

### Postman 测试示例

#### 1. 创建活动
```bash
POST https://api.czstudio.tech/api/v1/activity
Content-Type: application/json
Authorization: Bearer YOUR_ACCESS_TOKEN

{
  "intro": "团队建设活动",
  "detail": "组织团队户外拓展活动，增强团队凝聚力，促进成员间的沟通和交流。",
  "sdate": "2024-12-25",
  "edate": "2024-12-25",
  "joiners": "全体成员",
  "status": 0
}
```

#### 2. 获取所有活动
```bash
GET https://api.czstudio.tech/api/v1/activity
Authorization: Bearer YOUR_ACCESS_TOKEN
```

#### 3. 更新活动状态
```bash
PATCH https://api.czstudio.tech/api/v1/activity/1
Content-Type: application/json
Authorization: Bearer YOUR_ACCESS_TOKEN

{
  "status": 1
}
```

#### 4. 删除活动
```bash
DELETE https://api.czstudio.tech/api/v1/activity/1
Authorization: Bearer YOUR_ACCESS_TOKEN
```

## 前端集成

### 获取活动数据 (Vue 3)
```typescript
import { getActivitiesApi } from '~/api/activity';

const fetchActivities = async () => {
  try {
    const response = await getActivitiesApi();
    console.log('活动数据:', response.data);
  } catch (error) {
    console.error('获取活动数据失败:', error);
  }
};
```

### 创建活动 (示例)
```typescript
const createActivity = async (activityData) => {
  try {
    const response = await fetch('https://api.czstudio.tech/api/v1/activity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
      },
      body: JSON.stringify(activityData),
    });
    const result = await response.json();
    if (result.success) {
      return result.data;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error('创建活动失败:', error);
  }
};
```

### JavaScript/Node.js 示例
```javascript
const axios = require('axios');

const API_BASE_URL = 'https://api.czstudio.tech/api/v1';
const ACCESS_TOKEN = 'YOUR_ACCESS_TOKEN';

// 获取所有活动
const getActivities = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/activity`, {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`
      }
    });
    return response.data.data;
  } catch (error) {
    console.error('获取活动失败:', error.response?.data?.message || error.message);
  }
};

// 创建活动
const createActivity = async (activityData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/activity`, activityData, {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data.data;
  } catch (error) {
    console.error('创建活动失败:', error.response?.data?.message || error.message);
  }
};
```

## 认证与授权

### 获取访问令牌
在使用API之前，您需要获取访问令牌：

```bash
POST https://api.czstudio.tech/api/v1/auth/login
Content-Type: application/json

{
  "username": "your_username",
  "password": "your_password"
}
```

响应示例：
```json
{
  "success": true,
  "code": 200,
  "message": "登录成功",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600
  }
}
```

### 令牌使用
- 将获取到的令牌添加到请求头：`Authorization: Bearer YOUR_TOKEN`
- 令牌有效期为1小时
- 令牌过期后需要重新登录获取

## 速率限制

- **免费用户**: 1000次请求/小时
- **付费用户**: 10000次请求/小时
- **企业用户**: 无限制

超出限制时返回429状态码。

## 注意事项

1. **日期格式**: 所有日期字段使用 `YYYY-MM-DD` 格式
2. **参与人员**: 多个人员用逗号分隔，如 `"张三,李四,王五"`
3. **状态值**: 只能是 0、1、2 三个值
4. **字符编码**: 支持中文，使用 UTF-8 编码
5. **数据验证**: 所有必填字段都会进行验证
6. **HTTPS**: 所有API请求必须使用HTTPS协议
7. **时区**: 所有时间戳使用UTC时区

## 数据库表结构

```sql
CREATE TABLE `activities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `intro` VARCHAR(191) NOT NULL,
    `detail` TEXT NOT NULL,
    `sdate` VARCHAR(191) NOT NULL,
    `edate` VARCHAR(191) NOT NULL,
    `joiners` VARCHAR(191) NOT NULL,
    `status` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

---

**文档版本**: 2.0
**最后更新**: 2024-12-01
**维护者**: 创智工作室开发团队
**API版本**: v1
**状态**: 生产环境可用
