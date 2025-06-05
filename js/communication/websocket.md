# WebSocket  

## 一、说明  

>`WebSocket` 是一种 网络通信协议，提供了 客户端与服务器之间全双工（双向）通信的能力，特别适用于需要 实时数据传输的场景（如聊天、实时通知、在线游戏、股票行情等）。


## 二、WebSocket 原理  

### 1. 建立连接（握手过程）  

WebSocket 的连接从一个 HTTP 请求开始：

```http
GET /socket HTTP/1.1
Host: example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZQ==
Sec-WebSocket-Version: 13
```

服务器返回：  

```http
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
```

### 2. 特点

- **全双工通信**：客户端和服务器可以 同时发送数据。

- **持久连接**：一次握手后，连接保持开启，无需频繁创建/关闭连接。

- **低开销**：相比 HTTP，头部更小，节省带宽和延迟。

- **可穿透防火墙和代理**（使用 80/443 端口）。  


### 3. 数据传输机制

- `WebSocket` 使用 帧（`frame`） 进行数据传输（文本或二进制）。

- 支持心跳机制（如 `ping`/`pong` 帧）确保连接不中断。

- 客户端与服务器均可主动发送消息，不再是“请求-响应”。

>[!NOTE] 帧（frame）
>这个“frame（帧）”是 WebSocket 协议的一个核心概念，指的是：WebSocket 协议把发送的消息分成一个或多个数据帧（data frame）发送给对方，每个帧都有特定的结构和控制信息。  
>你可以把“帧（frame）”理解成：   
>WebSocket 消息的 最小传输单元，就像视频是由一帧帧画面组成一样，WebSocket 数据传输也是由帧组成的。

**WebSocket 帧的结构（简略版）**

每个 WebSocket 帧大致包含以下信息：  

| 字段                 | 说明                           |
| ------------------ | ---------------------------- |
| **FIN**（1 bit）     | 是否是消息的最后一帧                   |
| **Opcode**（4 bit）  | 表示数据类型，如文本、二进制、ping、pong、关闭等 |
| **Mask**（1 bit）    | 客户端必须对数据进行掩码处理（加密），服务端不需要    |
| **Payload length** | 数据长度                         |
| **Payload data**   | 真正要发送的内容（字符串或二进制）            |


**📦 文本帧 vs 二进制帧**

| 类型   | 描述              | Opcode 值 |
| ---- | --------------- | -------- |
| 文本帧  | 发送 UTF-8 编码的字符串 | `0x1`    |
| 二进制帧 | 发送图片、音频等二进制数据   | `0x2`    |


## 三、`WebSocket` vs `HTTP`  

| 特性   | WebSocket   | HTTP        |
| ---- | ----------- | ----------- |
| 通信方式 | 全双工（双向）     | 单向（请求-响应）   |
| 连接模式 | 长连接         | 短连接（每次请求新建） |
| 实时性  | 高           | 低（需轮询/长轮询）  |
| 资源开销 | 小（低频头部）     | 大（每次请求头部重复） |
| 使用场景 | 聊天、游戏、实时数据等 | 普通网页、表单提交等  |



## 四、常见应用场景  

- 实时聊天系统

- 在线协同编辑（如文档/白板）

- 股票/币价行情推送

- 在线游戏

- 实时通知系统（如订单状态、提醒）



## 五、实例

**公告聊天频道**  

- server.js需要node环境和安装`ws`

```bash [npm]
npm install ws
```

- 运行

```bash 
node server.js
```

:::code-group
```html [index.html]
<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <title>公告聊天频道</title>
  <style>
    body { font-family: sans-serif; }
    #chat { height: 300px; overflow-y: auto; border: 1px solid #ccc; padding: 5px; margin-bottom: 10px; }
    .system { color: gray; font-style: italic; }
    .me { color: blue; }
  </style>
</head>
<body>
  <h2>公告聊天频道</h2>
  <div id="chat"></div>
  <input id="msg" placeholder="输入消息..." />
  <button onclick="send()">发送</button>

  <script>
    const id = '用户' + Math.floor(Math.random() * 10000);
    const ws = new WebSocket('ws://localhost:8080');
    const chat = document.getElementById('chat');
    const input = document.getElementById('msg');

    ws.onmessage = async(event) => {
      const text = await event.data.text();      // ⬅️ 等待异步读取文本内容
      const msg = JSON.parse(text);              // ⬅️ 然后再解析 JSON
      const el = document.createElement('div');

      if (msg.system) {
        el.textContent = `[系统] ${msg.text}`;
        el.className = 'system';
      } else {
        el.innerHTML = `<strong class="${msg.id === id ? 'me' : ''}">${msg.id}</strong>：${msg.text}`;
      }

      chat.appendChild(el);
      chat.scrollTop = chat.scrollHeight;
    };

    function send() {
      const text = input.value.trim();
      if (text) {
        ws.send(JSON.stringify({ id, text }));
        input.value = '';
      }
    }

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') send();
    });
  </script>
</body>
</html>

```

```js [server.js]
// server.js
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    // 广播消息
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data); // 原样转发
      }
    });
  });

  const msg = JSON.stringify({ system: true, text: '你已连接公告频道' });
  const buffer = Buffer.from(msg, 'utf-8');
  ws.send(buffer);
});

console.log('WebSocket 服务已启动：ws://localhost:8080');
```
:::


## 六、进阶

### 1、心跳保活（Heartbeat / Ping-Pong）  

>[!NOTE]📌 为什么需要？  
>
>`WebSocket` 是基于 `TCP` 的长连接，但：
>
>- 网络中间设备（如代理、防火墙）如果长时间没有数据传输，可能会关闭连接。
>
>- 某些异常断开（如浏览器休眠）不会自动触发 `onclose`。
>
>所以需要定期发送“心跳包”来保持连接活跃。


💡 常见实现方式：  

客户端定时发送 `Ping` 消息：

```js
let heartbeatInterval = null;

function startHeartbeat() {
  heartbeatInterval = setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: 'ping' }));
    }
  }, 30000); // 每 30 秒一次
}

function stopHeartbeat() {
  clearInterval(heartbeatInterval);
}
```

服务端接收到 ping 后可以：

- 返回一个 pong 消息

- 或直接忽略，只要有通信行为即可保活


### 2、断线重连策略（`Reconnect`）  

>[!NOTE]📌 为什么需要？  
>
>- 用户网络断开
>
>- 服务端重启
>
>- 浏览器标签页被系统挂起  

💡 实现示意（客户端 JS）：  


```js
let ws
let reconnectTimer
let manuallyClosed = false;

function connect() {
  ws = new WebSocket('wss://your-server');

  ws.onopen = () => {
    console.log('连接成功');
  };

  ws.onmessage = (event) => {
    // 处理接收到的消息
  };

  ws.onclose = () => {
    console.warn('连接关闭');
    stopHeartbeat();

    // ❗️只有不是手动关闭才自动重连
    if (!manuallyClosed) {
      console.log('准备重连...');
      reconnect();
    }
  };

  ws.onerror = (err) => {
    console.error('WebSocket 错误:', err);
    ws.close(); // 自动触发 onclose
  };
}

function reconnect() {
  if (reconnectTimer) return;
  reconnectTimer = setTimeout(() => {
    reconnectTimer = null;
    connect();
  }, 3000);
}

// ✅ 主动关闭连接
function closeConnection() {
  manuallyClosed = true;
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.close();
  }
}

connect();
```


### 3、WebSocket 安全性（`wss://`）  

>[!NOTE]📌 为什么使用 wss://？  
>
>`ws://` 是明文传输，数据容易被中间人监听或篡改
>
>`wss://` 是加密传输（基于 `TLS`），类似 `HTTPS`，更安全
>
>在 `HTTPS` 页面中强制只能使用 `wss://`


**🛠 如何启用** `wss://`  

1. 本地开发可用自签名证书（如用 `Node.js` + `ws`）：

```md
my-server/
├── index.js
├── cert/
│   ├── cert.pem
│   └── key.pem
```

📌 如果你还没生成这两个文件，以下是生成方式（用 OpenSSL）：

```sh
openssl genrsa -out key.pem 2048
openssl req -new -x509 -key key.pem -out cert.pem -days 365
```

- `key.pem` 是私钥

- `cert.pem` 是用私钥签发的自签名证书

生成过程中会提示你填写组织名、域名（`Common` `Name`）等信息。

```js
const fs = require('fs');
const https = require('https');
const WebSocket = require('ws');

const server = https.createServer({
    cert: fs.readFileSync('./cert/cert.pem'),
    key: fs.readFileSync('./cert/key.pem'),
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('客户端已连接');
  ws.on('message', (msg) => {
    console.log('收到消息:', msg);
  });
});

server.listen(443, () => {
  console.log('WSS 服务器运行在 https://localhost:443');
});
```

客户端连接示例：

```js
const ws = new WebSocket('wss://localhost');
```

2. 线上部署使用正规证书（Let's Encrypt、阿里云、腾讯云等）

### 🔐 小结

| 功能            | 说明                        | 是否必须 |
| ------------- | ------------------------- | ---- |
| 心跳保活          | 避免连接被闲置中断                 | ✅ 推荐 |
| 断线重连          | 应对网络波动或服务端异常              | ✅ 必须 |
| `wss://` 安全通道 | 加密数据，防止中间人攻击；HTTPS 页面强制使用 | ✅ 必须 |

