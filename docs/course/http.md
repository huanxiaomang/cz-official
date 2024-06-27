# HTTP 响应状态码

HTTP 协议标准是由万维网协会（World Wide Web Consortium，W3C）和互联网工程任务组（Internet Engineering Task Force，IETF）制定的，其中最著名的是`RFC-2616`，定义了 HTTP 协议中现今广泛使用的一个版本—HTTP 1.1。

HTTP 响应状态码用来表明特定  [HTTP](https://developer.mozilla.org/zh-CN/docs/Web/HTTP)  请求是否成功完成。 响应被归为以下五大类：

1.  [信息响应](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status#%E4%BF%A1%E6%81%AF%E5%93%8D%E5%BA%94) (`100`–`199`)
2.  [成功响应](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status#%E6%88%90%E5%8A%9F%E5%93%8D%E5%BA%94) (`200`–`299`)
3.  [重定向消息](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status#%E9%87%8D%E5%AE%9A%E5%90%91%E6%B6%88%E6%81%AF) (`300`–`399`)
4.  [客户端错误响应](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status#%E5%AE%A2%E6%88%B7%E7%AB%AF%E9%94%99%E8%AF%AF%E5%93%8D%E5%BA%94) (`400`–`499`)
5.  [服务端错误响应](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status#%E6%9C%8D%E5%8A%A1%E7%AB%AF%E9%94%99%E8%AF%AF%E5%93%8D%E5%BA%94) (`500`–`599`)

_为了方便归类对比，顺序略有调整。_

## 1XX 信息响应

#### 100 Continue

- **含义**：这个临时响应表明，迄今为止的所有内容都是可行的，客户端应该继续请求，如果已经完成，则忽略它。
- **使用场景**：客户端在发送 POST 数据给服务器前，征询服务器情况，看服务器是否处理 POST 的数据，如果不处理，客户端则不上传 POST 数据，如果处理，则 POST 上传数据。常用于 POST 大数据传输

#### 101 Switching Protocols

- **含义**：服务器理解并愿意遵循客户端的请求，将使用新的协议进行通讯。
- **使用场景**：当客户端请求切换协议（如从 HTTP/1.1 切换到 WebSocket）时，服务器同意切换协议，从 HTTP 升级到 WebSocket，并返回 101 状态码。

## 2XX 成功响应

#### 200 OK

- **含义**：请求已成功，服务器已返回所请求的数据。
- **使用场景**：GET、POST、PUT、DELETE 等请求成功时都会返回此状态码。

#### 201 Created

- **含义**：请求已成功，并且在服务器上创建了一个新的资源。
- **使用场景**：通常在 POST 请求成功创建资源时返回此状态码。

#### 202 Accepted

- **含义**：请求已被接受用于处理，但尚未完成。请求可能会在稍后完成，服务器不保证请求的处理结果。

- **使用场景**：用于异步处理的请求，例如，提交一个任务，服务器接收到任务但需要时间处理。

#### 203 Non-Authoritative Information

- **含义**：请求成功，但返回的元信息不是原始服务器的权威信息，而是来自本地或第三方源。
- **使用场景**：代理服务器修改了原始服务器的响应内容后返回给客户端。

#### 205 Reset Content

- **含义**：请求成功，服务器要求客户端重置文档视图。
- **使用场景**：常用于告诉客户端清除表单输入或重置文档视图。服务器成功处理了请求，并指示客户端重置当前页面或表单。

#### 204 No Content

- **含义**：请求已成功，但服务器**没有返回任何内容**。
- **使用场景**：常用于 DELETE 请求成功，或 PUT 请求服务器只需要告知操作成功，不需要返回任何内容时。

#### 206 Partial Content

- **含义**：服务器成功处理了部分 GET 请求，**返回了部分内容**。
- **使用场景**：一般用来做断点续传，或者是视频文件等大文件的加载。

## 3XX 重定向消息

#### 304 Not Modified

- **含义**：请求的资源自上次请求以来未被修改，客户端可以使用缓存的版本。
- **使用场景**：用于缓存控制，减少数据传输。

#### 301 Moved Permanently

- **含义**：请求的资源已被永久移动到新的 URL。
- **使用场景**：当资源的 URL 发生永久性改变时使用，搜索引擎会更新链接。

#### 302 Found

- **含义**：请求的资源临时被移动到新的 URL。
- **使用场景**：临时重定向，与 301 类似，但资源的 URL 只是暂时变化。

#### 308 Permanent Redirect

- **含义**：请求的资源已被永久移动到新的 URL。
- **使用场景**：与 301 类似，但确保 POST 方法不会变成 GET 方法。

#### 307 Temporary Redirect

- **含义**：请求的资源临时移动到新的 URL。
- **使用场景**：与 302 类似，但确保 POST 方法不会变成 GET 方法。

#### 303 See Other

- **含义**：请求的资源可以在另一个 URL 上找到，应该使用 GET 方法获取。
- **使用场景**：在 POST 请求后重定向到一个新的页面。

### 区别

- **301 vs 308**：

  - **301**：永久重定向，但 POST 方法会变成 GET 方法。
  - **308**：永久重定向，保持原有的 HTTP 方法。

- **302 vs 307**：

  - **302**：临时重定向，但 POST 方法可能会变成 GET 方法。
  - **307**：临时重定向，保持原有的 HTTP 方法。

### 重定向中的方法变更

当服务器返回 301（Moved Permanently）或 302（Found）状态码进行重定向时，客户端（如浏览器）在默认情况下会将原本的`POST`请求方法改为`GET`请求。这意味着在重定向之后，`POST`请求体中的数据将不会再发送。

假设客户端发送一个`POST`请求：

- **初始请求**：

      POST /submit-data HTTP/1.1
      Host: example.com
      Content-Type: application/x-www-form-urlencoded

      field1=value1&field2=value2

服务器返回一个 302 重定向响应：

- **重定向响应**：

      HTTP/1.1 302 Found
      Location: http://www.example.com/new-location

根据 HTTP 规范，浏览器会将重定向后的请求方法改为`GET`，并且不会携带原始`POST`请求的请求体：

- **重定向后的请求**：

      GET /new-location HTTP/1.1
      Host: example.com

### 解决方法变更的问题

为了避免`POST`方法变成`GET`，可以使用以下状态码：

**303 See Other**：明确指示客户端应使用 GET 方法请求新的 URL。

**307 Temporary Redirect**：指示客户端应该**使用原来的请求方法**（如 POST）重新请求新的 URL。

**308 Permanent Redirect**：指示客户端应该**使用原来的请求方法**（如 POST）永久性地请求新的 URL。

## 4XX 客户端错误响应

#### 400 Bad Request

- **含义**：服务器无法理解请求，因为**请求格式有误**。
- **使用场景**：请求的格式不正确、缺少必要参数等情况。

#### 422 Unprocessable Entity

- **含义**：服务器理解请求实体，但**包含语义错误或验证失败**，无法处理。
- **使用场景**：数据验证失败、业务规则验证失败等。

#### 401 Unauthorized

- **含义**：请求未授权，**需要提供身份验证信息**。
- **使用场景**：通常在需要登录或提供令牌的接口上返回。

### 407 Proxy Authentication Required

- **含义**：客户端必须**首先使用代理进行身份验证**。
- **使用场景**：当客户端通过代理服务器访问目标服务器时，代理服务器要求进行身份验证。

#### 403 Forbidden

- **含义**：服务器理解请求，但拒绝执行。
- **使用场景**：请求被理解，但权限不够，例如访问受限资源时。如在外网环境下，访问只有内网 IP 才能访问的时候则返回

#### 404 Not Found

- **含义**：请求的资源不存在，或者服务器拒绝请求又不想说明理由时。
- **使用场景**：URL 错误或资源已删除时返回。通过此代码，网站设计人员可设置"您所请求的资源无法找到"的个性页面。

#### 405 Method Not Allowed

- **含义**：请求方法不被允许。
- **使用场景**：如在只能用 GET 的接口上使用 POST 方法时返回。

### 408 Request Timeout

- **含义**：客户端在服务器预备等待的时间内未能发送请求。
- **使用场景**：当**客户端发送请求的时间过长**导致超时。

#### 413 Payload Too Large

- **含义**：请求实体过大，服务器无法处理。
- **使用场景**：如上传文件大小超过服务器限制时返回。

#### 429 Too Many Requests

- **含义**：客户端在规定时间内发送了太多请求。
- **使用场景**：用于速率限制，防止滥用。

## 5XX 服务端错误响应

#### 500 Internal Server Error

- **含义**：服务器内部发生错误，无法完成请求。
- **使用场景**：服务器端代码异常或配置错误时返回。

#### 501 Not Implemented

- **含义**：服务器不支持请求的方法。
- **使用场景**：客户端请求了服务器未实现的功能。

#### 503 Service Unavailable

- **含义**：服务器当前无法处理请求，可能因为过载或维护。
- **使用场景**：服务器暂时无法处理请求时返回，如服务器停机维护时，主动用 503 响应请求或 nginx 设置限速，超过限速，会返回 503。

#### 502 Bad Gateway

- **含义**：服务器作为网关或代理，**从上游服务器收到无效响应**。
- **使用场景**：服务器代理其他服务时，其他服务出错。

#### 504 Gateway Timeout

- **含义**：服务器作为网关或代理，**未能及时从上游服务器接收响应**。
- **使用场景**：服务器代理其他服务时，上游服务器超时。

以上就是常见 http 状态码，对比归类地记会快很多，喜欢就点个收藏吧\~

<img src="./../public/images/4FD03F701EFC71FF86C3BF0F7293FC4C.gif" alt="" width="30%" />

参考：

[读 HTTP 协议 RFC-2616 | Harttle Land](https://harttle.land/2014/10/01/http.html)

[HTTP 响应状态码 - HTTP | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status)

[面试官：说说 HTTP 常见的状态码有哪些，适用场景？ · Issue #144 · febobo/web-interview (github.com)](https://github.com/febobo/web-interview/issues/144)
