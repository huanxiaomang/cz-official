# 蓝桥杯获奖者管理API文档

## 基础信息

- 基础URL: `http://localhost:3000/api`
- 认证方式: Bearer Token (管理员操作需要)
- 数据格式: JSON

## 数据模型

### Winner (获奖者)
```typescript
interface Winner {
  id: number           // 获奖者ID
  name: string         // 姓名
  competition: string  // 比赛名称
  award: string        // 获奖等级
  avatar: string       // 头像
  createdAt: string    // 创建时间
}
```

### CreateWinnerDto (创建获奖者)
```typescript
interface CreateWinnerDto {
  name: string         // 姓名 (必填)
  competition: string  // 比赛名称 (必填)
  award: string        // 获奖等级 (必填)
  avatar?: string      // 头像 (可选)
}
```

### UpdateWinnerDto (更新获奖者)
```typescript
interface UpdateWinnerDto {
  name?: string        // 姓名 (可选)
  competition?: string // 比赛名称 (可选)
  award?: string       // 获奖等级 (可选)
  avatar?: string      // 头像 (可选)
}
```

## API接口

### 1. 获取所有获奖者

**请求信息**
- 路径: `GET /winners`
- 描述: 获取所有获奖者列表

**响应示例**
```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "id": 1,
      "name": "张三",
      "competition": "蓝桥杯全国软件和信息技术专业人才大赛",
      "award": "国一",
      "avatar": "avatar1.jpg",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### 2. 分页获取获奖者

**请求信息**
- 路径: `GET /winners/page`
- 描述: 分页获取获奖者，支持条件筛选

**请求参数**
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| page | number | 否 | 1 | 页码 |
| pageSize | number | 否 | 10 | 每页数量 |
| name | string | 否 | - | 姓名筛选 |
| competition | string | 否 | - | 比赛名称筛选 |
| award | string | 否 | - | 获奖等级筛选 |

**响应示例**
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "winners": [...],
    "total": 100,
    "page": 1,
    "pageSize": 10,
    "totalPages": 10
  }
}
```

### 3. 根据ID获取获奖者详情

**请求信息**
- 路径: `GET /winners/:id`
- 描述: 根据ID获取单个获奖者详情

**路径参数**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| id | number | 是 | 获奖者ID |

**响应示例**
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": 1,
    "name": "张三",
    "competition": "蓝桥杯全国软件和信息技术专业人才大赛",
    "award": "国一",
    "avatar": "avatar1.jpg",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 4. 创建获奖者

**请求信息**
- 路径: `POST /winners`
- 描述: 创建新的获奖者记录
- 权限: 需要管理员权限

**请求体**
```json
{
  "name": "张三",
  "competition": "蓝桥杯全国软件和信息技术专业人才大赛",
  "award": "国一",
  "avatar": "avatar1.jpg"
}
```

**响应示例**
```json
{
  "code": 201,
  "message": "获奖者创建成功",
  "data": {
    "id": 1,
    "name": "张三",
    "competition": "蓝桥杯全国软件和信息技术专业人才大赛",
    "award": "国一",
    "avatar": "avatar1.jpg",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 5. 批量创建获奖者

**请求信息**
- 路径: `POST /winners/batch`
- 描述: 批量创建获奖者记录
- 权限: 需要管理员权限

**请求体**
```json
[
  {
    "name": "张三",
    "competition": "蓝桥杯全国软件和信息技术专业人才大赛",
    "award": "国一",
    "avatar": "avatar1.jpg"
  },
  {
    "name": "李四",
    "competition": "蓝桥杯全国软件和信息技术专业人才大赛",
    "award": "国二",
    "avatar": "avatar2.jpg"
  }
]
```

**响应示例**
```json
{
  "code": 201,
  "message": "成功创建 2 条获奖者记录",
  "data": {
    "count": 2,
    "message": "成功创建 2 条获奖者记录"
  }
}
```

### 6. 更新获奖者信息

**请求信息**
- 路径: `PUT /winners/:id`
- 描述: 更新获奖者信息
- 权限: 需要管理员权限

**路径参数**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| id | number | 是 | 获奖者ID |

**请求体**
```json
{
  "name": "张三",
  "competition": "蓝桥杯全国软件和信息技术专业人才大赛",
  "award": "国一",
  "avatar": "new-avatar.jpg"
}
```

**响应示例**
```json
{
  "code": 200,
  "message": "获奖者信息更新成功",
  "data": {
    "id": 1,
    "name": "张三",
    "competition": "蓝桥杯全国软件和信息技术专业人才大赛",
    "award": "国一",
    "avatar": "new-avatar.jpg",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 7. 删除获奖者

**请求信息**
- 路径: `DELETE /winners/:id`
- 描述: 删除获奖者记录
- 权限: 需要管理员权限

**路径参数**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| id | number | 是 | 获奖者ID |

**响应示例**
```json
{
  "code": 200,
  "message": "获奖者删除成功",
  "data": null
}
```

### 8. 批量删除获奖者

**请求信息**
- 路径: `DELETE /winners/batch`
- 描述: 批量删除获奖者记录
- 权限: 需要管理员权限

**请求体**
```json
{
  "ids": [1, 2, 3]
}
```

**响应示例**
```json
{
  "code": 200,
  "message": "成功删除 3 条获奖者记录",
  "data": {
    "count": 3,
    "message": "成功删除 3 条获奖者记录"
  }
}
```

### 9. 按获奖等级筛选

**请求信息**
- 路径: `GET /winners/filter/award`
- 描述: 按获奖等级筛选获奖者

**查询参数**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| award | string | 是 | 获奖等级 |

**响应示例**
```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "id": 1,
      "name": "张三",
      "competition": "蓝桥杯全国软件和信息技术专业人才大赛",
      "award": "国一",
      "avatar": "avatar1.jpg",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### 10. 按比赛名称筛选

**请求信息**
- 路径: `GET /winners/filter/competition`
- 描述: 按比赛名称筛选获奖者

**查询参数**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| competition | string | 是 | 比赛名称 |

**响应示例**
```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "id": 1,
      "name": "张三",
      "competition": "蓝桥杯全国软件和信息技术专业人才大赛",
      "award": "国一",
      "avatar": "avatar1.jpg",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### 11. 获取统计数据

**请求信息**
- 路径: `GET /winners/stats`
- 描述: 获取获奖者统计数据

**响应示例**
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "totalWinners": 100,
    "awardStats": [
      {
        "award": "国一",
        "_count": {
          "award": 20
        }
      },
      {
        "award": "国二",
        "_count": {
          "award": 30
        }
      }
    ],
    "competitionStats": [
      {
        "competition": "蓝桥杯全国软件和信息技术专业人才大赛",
        "_count": {
          "competition": 100
        }
      }
    ]
  }
}
```

## 错误响应

所有接口在发生错误时都会返回以下格式：

```json
{
  "code": 400,
  "message": "错误描述",
  "error": "详细错误信息"
}
```

常见错误码：
- 400: 请求参数错误
- 401: 未授权
- 403: 权限不足
- 404: 资源不存在
- 500: 服务器内部错误

## 使用示例

### JavaScript/TypeScript
```javascript
// 获取所有获奖者
const response = await fetch('/api/winners');
const data = await response.json();

// 创建获奖者
const createResponse = await fetch('/api/winners', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your-token'
  },
  body: JSON.stringify({
    name: '张三',
    competition: '蓝桥杯全国软件和信息技术专业人才大赛',
    award: '国一',
    avatar: 'avatar1.jpg'
  })
});

// 分页查询
const pageResponse = await fetch('/api/winners/page?page=1&pageSize=10&award=国一');
const pageData = await pageResponse.json();
```

### Axios
```javascript
import axios from 'axios';

// 获取所有获奖者
const winners = await axios.get('/api/winners');

// 创建获奖者
const newWinner = await axios.post('/api/winners', {
  name: '张三',
  competition: '蓝桥杯全国软件和信息技术专业人才大赛',
  award: '国一',
  avatar: 'avatar1.jpg'
}, {
  headers: {
    Authorization: 'Bearer your-token'
  }
});

// 批量删除
const deleteResult = await axios.delete('/api/winners/batch', {
  data: { ids: [1, 2, 3] },
  headers: {
    Authorization: 'Bearer your-token'
  }
});
```

## 注意事项

1. 所有管理员操作都需要在请求头中包含有效的Bearer Token
2. 分页查询的页码从1开始
3. 筛选功能支持模糊匹配
4. 批量操作建议控制单次操作的数据量，避免超时
5. 头像字段支持文件名或完整URL
6. 时间字段为ISO 8601格式 