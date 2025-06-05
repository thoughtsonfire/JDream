# BroadcastChannel

## 介绍  

`BroadcastChannel` 是浏览器提供的 `API`，允许在同源的多个标签页、`iframe`、`Web Worker` 之间进行简单的广播通信，无需服务器。


>[!NOTE] 注意事项
>`const channel = new BroadcastChannel('my-channel');// 创建一个频道（频道名可自定义）`  
>- 相同频道名之间才能通信  
>- 自己页面发送的消息，自己页面不会收到  
>- 不能跨域，也不能跨浏览器  


## 基本语法

```js
// 创建一个频道（频道名可自定义）
const channel = new BroadcastChannel('my-channel');

// 发送消息
channel.postMessage({ type: 'LOGIN', user: 'Alice' });

// 接收消息
channel.onmessage = (event) => {
  console.log('收到消息:', event.data);
};

// 关闭频道（一般在组件销毁时执行）
channel.close();
```

## 示例  

- 打开两个页面，用来测试

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>BroadcastChannel Demo</title>
</head>
<body>
  <h2>BroadcastChannel 示例</h2>
  <input type="text" id="messageInput" placeholder="输入消息..." />
  <button onclick="sendMessage()">发送到其他标签页</button>
  <p><strong>接收到的消息：</strong></p>
  <ul id="messageList"></ul>

  <script>
    // 创建频道
    const channel = new BroadcastChannel('demo-channel');

    // 接收消息
    channel.onmessage = (event) => {
      const li = document.createElement('li');
      li.textContent = `接收到消息: ${event.data}`;
      document.getElementById('messageList').appendChild(li);
    };

    // 发送消息
    function sendMessage() {
      const input = document.getElementById('messageInput');
      const message = input.value;
      if (message) {
        channel.postMessage(message);
        input.value = '';
      }
    }

    // 页面关闭前关闭频道（可选）
    window.addEventListener('beforeunload', () => {
      channel.close();
    });
  </script>
</body>
</html>
```


## 总结  

**✅ BroadcastChannel 特性总结**  

| 特性              | 说明                                                     |
| --------------- | ------------------------------------------------------ |
| 📡 **多标签页通信**   | 支持**同源的多个标签页**之间直接通信（不需服务器）                            |
| 🧠 **按频道隔离通信**  | 通过频道名隔离，**只有相同频道名的页面能互相收消息**                           |
| 🔁 **消息广播机制**   | 一次 `postMessage()` 会通知所有其它标签页（包括 iframe、Web Worker）    |
| ❌ **不回传给发送者自己** | 自己 `postMessage()` 发出的消息**自己不会收到**（需手动处理本地更新）          |
| 🔒 **仅同源有效**    | 协议、域名、端口**完全一致**才可通信（`http://a.com` ≠ `https://a.com`） |
| ❌ **不能跨浏览器实例**  | 在不同浏览器中（如 Chrome 与 Edge，或 Chrome 的两个无痕窗口）**不能通信**      |
| 💥 **无消息缓存机制**  | 页面未打开时，消息不会被记录，**打开页面后也不会收到历史消息**                      |
| 🧹 **频道可关闭**    | 可以调用 `.close()` 主动关闭频道释放资源                             |


**✅ 适用场景**  

| 场景                  | 说明                     |
| ------------------- | ---------------------- |
| ✅ 多标签页同步状态          | 登录状态同步、主题切换、通知广播等      |
| ✅ iframe 与父页面通信（同源） | 替代 `postMessage`，语法更简单 |
| ✅ Web Worker 与主线程通信 | 用于模块解耦、通信广播            |
| ✅ 调试工具 / 前端插件开发     | 多组件间无耦合通信              |


**❌ 不适合的场景**  

| 场景               | 替代方案                                             |
| ---------------- | ------------------------------------------------ |
| ❌ 跨浏览器通信         | 使用服务器中转（如 WebSocket）或 IndexedDB + Service Worker |
| ❌ 通信需持久          | 使用 localStorage + `storage` 事件或 IndexedDB        |
| ❌ 通信需身份/认证/多用户隔离 | 使用 WebSocket + Token 鉴权                          |
| ❌ 实时系统级通知        | 使用 WebSocket、Server-Sent Events (SSE)、Push API 等 |
