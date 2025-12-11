# aiohttp

aiohttp 是 Python 异步编程生态里非常核心、非常常用的库之一。

它可以让你在 异步（asyncio）事件循环中发 HTTP 请求 或 构建异步 Web 服务器。

## 一句话简介

> aiohttp 是一个基于 asyncio 的异步 HTTP 框架，  
> 既能当 HTTP 客户端（爬虫、API 请求），也能当 HTTP 服务器（Web 服务端）。

## 安装

```bash
pip install aiohttp
```

## aiohttp 的两个角色

> [!TIP] with as  
> 在 Python 中，with as 语句用于声明一个**上下文管理器**，能够帮我们自动分配和释放资源  
> 在异步方法中，with as 前面加上 async 代表声明一个支持异步的上下文管理器

### 客户端（最常用）

异步地请求网页或接口。

```py
import aiohttp
import asyncio

async def fetch(session, url):
    async with session.get(url) as response:
        return await response.text()

async def main():
    urls = [
        'https://www.baidu.com',
        'https://www.bing.com',
        'https://www.google.com'
    ]
    async with aiohttp.ClientSession() as session:
        tasks = [asyncio.create_task(fetch(session, url)) for url in urls]
        results = await asyncio.gather(*tasks)
        for content in results:
            print(len(content))

asyncio.run(main())
```

这里 三个请求是并发执行的（异步 IO），不会等待前一个结束才发下一个。

### 服务端（可以写 Web 应用）

```py
from aiohttp import web

async def handle(request):
    return web.Response(text="Hello, aiohttp!")

app = web.Application()
app.router.add_get('/', handle)

web.run_app(app, port=8080)
```

访问 `http://localhost:8080`

→ 浏览器会显示：

```
Hello, aiohttp!
```

这相当于一个最小的异步 Web 服务器。

## 为什么 aiohttp 比 requests 快？

| 对比项   | requests         | aiohttp                          |
| -------- | ---------------- | -------------------------------- |
| 类型     | 同步阻塞         | 异步非阻塞                       |
| 实现     | 每个请求等待响应 | 多个请求同时发出                 |
| 性能     | 串行执行         | 并发执行                         |
| 底层机制 | socket 阻塞 IO   | asyncio 事件循环（epoll/select） |

例如爬 100 个网页：

- requests → 每次 get() 都会等；

- aiohttp → 一次性发 100 个请求，谁先返回就先处理谁。

## 常见用法（客户端篇）

### 1. GET 请求

```py
async with session.get(url, params={'q': 'python'}) as resp:
    print(await resp.text())
```

### 2. POST 请求

```py
async with session.post(url, data={'key': 'value'}) as resp:
    print(await resp.json())
```

### 3. 添加请求头

```py
headers = {'User-Agent': 'Mozilla/5.0'}
async with session.get(url, headers=headers) as resp:
    ...
```

### 4. 设置超时

```py
timeout = aiohttp.ClientTimeout(total=10)
async with aiohttp.ClientSession(timeout=timeout) as session:
    ...
```

### 5. 使用代理

```py
async with session.get(url, proxy="http://127.0.0.1:7890") as resp:
    ...
```

## 限制并发数量

### 使用 Semaphore 限制并发数量（最常见做法）

```py
import asyncio
import aiohttp

semaphore = asyncio.Semaphore(5)  # 最多允许 5 个协程同时运行

async def fetch(session, url):
    async with semaphore:  # 🔒 进入信号量上下文，超出数量的会等待
        async with session.get(url) as resp:
            return await resp.text()

async def main():
    urls = [f'https://example.com/{i}' for i in range(20)]
    async with aiohttp.ClientSession() as session:
        tasks = [asyncio.create_task(fetch(session, url)) for url in urls]
        results = await asyncio.gather(*tasks)
        print('Done:', len(results))

asyncio.run(main())
```

### 使用 aiohttp 自带的连接池限制（更底层）

`aiohttp` 的 `TCPConnector` 也可以限制连接数量（推荐与 `Semaphore` 一起使用）：

```py
connector = aiohttp.TCPConnector(limit=10)  # 最多10个TCP连接

async with aiohttp.ClientSession(connector=connector) as session:
    ...
```

### 两者结合（最稳妥方案）

```py
import asyncio
import aiohttp

semaphore = asyncio.Semaphore(5)

async def fetch(session, url):
    async with semaphore:
        async with session.get(url) as resp:
            text = await resp.text()
            print('OK:', url)
            return text

async def main():
    connector = aiohttp.TCPConnector(limit=10)  # 限制连接池大小
    async with aiohttp.ClientSession(connector=connector) as session:
        urls = [f'https://example.com/{i}' for i in range(20)]
        tasks = [asyncio.create_task(fetch(session, url)) for url in urls]
        await asyncio.gather(*tasks)

asyncio.run(main())
```

### 如果要限制速率（例如每秒 5 次）

你可以结合 asyncio.sleep() 或 aiolimiter 库：

```py
from aiolimiter import AsyncLimiter

limiter = AsyncLimiter(5, 1)  # 每秒最多 5 次

async def fetch(session, url):
    async with limiter:
        async with session.get(url) as resp:
            return await resp.text()
```

aiolimiter 比 sleep 更优雅，会自动控制速率。

### 总结

| 限制方式                      | 用法                 | 适用场景         |
| ----------------------------- | -------------------- | ---------------- |
| `asyncio.Semaphore`           | 限制并发协程数       | 最通用（推荐）   |
| `aiohttp.TCPConnector(limit)` | 限制 TCP 连接数      | 网络层优化       |
| `aiolimiter`                  | 限制速率（每秒几次） | 防封、爬虫更友好 |
| `asyncio.sleep()`             | 人为延时             | 简单速率控制     |

## 注意事项

1.  一定要复用 ClientSession

- 不要每次请求都 aiohttp.ClientSession()；

- 它内部有连接池，会自动复用 TCP 连接。

- 所以推荐：

```py
async with aiohttp.ClientSession() as session:
    ...
```

2. 必须 await 结果

- 如 `await response.text()`、`await response.json()`；

- 否则你拿到的是 coroutine 对象而非内容。

3. 必须在 async 环境中运行

- 顶层用 asyncio.run(main())；

- 不能在普通函数里直接 await。

4. aiohttp 是 IO 密集型任务利器

- 不适合 CPU 密集计算（那该用多进程）。

## 总结

| 特性     | aiohttp（客户端）    | aiohttp（服务端）       |
| -------- | -------------------- | ----------------------- |
| 基于     | asyncio 事件循环     | asyncio 事件循环        |
| 模型     | 异步非阻塞           | 异步 Web 框架           |
| 常用场景 | 高并发爬虫、API 请求 | 异步 HTTP 服务          |
| 主要优点 | 快、节省线程、低开销 | 可与 async 数据库等协同 |
| 替代方案 | requests（同步）     | fastapi（现代异步框架） |
