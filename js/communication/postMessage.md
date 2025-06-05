# postMessage  

## 简介

>[!NOTE]postMessage 是什么？
>
>postMessage 是 JavaScript 中用于实现跨文档通信（Cross-document messaging）的方法。  
>它允许在不同窗口或 iframe 之间安全地传递数据。  
>通常情况下，这些窗口或 iframe 可能来自同一域或不同域。 


>[!CAUTION] 注意
>调试过程中请关闭浏览器`React Developer Tools` 插件  
>或者通过代码忽略该插件发送的消息  
>不然影响正常消息查看

## 基本语法

**发送消息**
```js
otherWindow.postMessage(message, targetOrigin, [transfer]);
```

参数说明
- message：要发送的数据。可以是字符串、对象、数组等可序列化的值。

- targetOrigin：字符串，指定接收消息的窗口的源（origin）。为安全考虑应精确指定，例如 `https://example.com`，而不是 ` * `。

- transfer（可选）：可转移对象的数组，如 ArrayBuffer，用于高性能传输。

**接收消息**
```js
window.addEventListener('message', function(event) {
  // 安全检查
  if (event.origin !== 'https://expected-origin.com') return;

  console.log('Received message:', event.data);
});
```

**简化**

```js
// 发送消息
window.postMessage('Hello, other window!', 'https://example.com');
```

```js
window.addEventListener('message', (event) => {
  // event.origin 包含消息发送窗口的源
  // event.data 包含发送的数据
  console.log('Received message:', event.data);
});
```


## 示例 


### 打开新窗口通信 

>[!CAUTION]注意
>只能和代码打开的这个窗口通信，相同地址的其他窗口是不行的


>[!NOTE]🔍 **原因解释**  
>
>✅ 能通信的前提：  
>
>要使用 postMessage 进行窗口间通信，需要以下条件：
>
>- 你拥有对目标窗口的引用（即 window.open() 的返回值，如 childWindow）。
>
>- 两边都设置了 postMessage 和 message 监听器。
>
>- origin 要匹配（协议 + 域名 + 端口）。
>
>```js
>const childWindow = window.open('http://example.com/child.html');
>childWindow.postMessage('hi', 'http://example.com');
>```
>但是如果你在地址栏中手动打开 `http://example.com/child.html`，就无法获取这个窗口的引用，所以就不能用 `postMessage()` 发送消息给它。

**示例代码** 

:::code-group
```html [主页面]
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>主页面</title>
</head>
<body>
  <h2>主页面</h2>
  <input id="input" placeholder="发消息给聊天窗口" />
  <button onclick="sendMessage()">发送</button>

  <div id="log"></div>

  <script>
    let chatWindow = null;

    // 打开另一个窗口作为聊天对象
    chatWindow = window.open('http://127.0.0.1:5501/', 'childWindow', 'width=400,height=300');

    function sendMessage() {
      const text = document.getElementById('input').value;
      if (chatWindow) {
        chatWindow.postMessage({ from: '主页面', text }, '*');
      }
    }

    window.addEventListener('message', (event) => {
      document.getElementById('log').innerHTML += `<p><b>${event.data.from}：</b>${event.data.text}</p>`;
    });
  </script>
</body>
</html>
```

```html [聊天窗口]
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>聊天窗口</title>
</head>
<body>
  <h2>聊天窗口</h2>
  <input id="input" placeholder="发消息给主页面" />
  <button onclick="sendMessage()">发送</button>

  <div id="log"></div>

  <script>
    function sendMessage() {
      const text = document.getElementById('input').value;
      // 向 opener（打开当前窗口的页面）发消息
      if (window.opener) {
        window.opener.postMessage({ from: '聊天窗口', text }, '*');
      }
    }

    window.addEventListener('message', (event) => {
      document.getElementById('log').innerHTML += `<p><b>${event.data.from}：</b>${event.data.text}</p>`;
    });
  </script>
</body>
</html>
```
:::

- 不同端口打开两个文件使用 [LiveServer](/shortcut/vscode/#插件-live-server)



### 与iframe 中通信

>[!CAUTION]注意
>只能和代码中的iframe通信，其他窗口打开iframe地址是不行的

>[!NOTE] 原因详解（关键点）：
>✅ `<iframe>` 是父页面的嵌套窗口对象，你可以通过 DOM 拿到它的引用：
>```js
>const iframe = document.getElementById('myIframe');
>iframe.contentWindow.postMessage(...); // 👈 直接发消息给嵌入的 iframe 页面
>```  
>
>❌ 但如果你在另一个标签页手动打开 iframe 页面 URL，这个页面： 
>没有被任何页面嵌套
>
>它的 window.parent === null
>
>父页面也根本没有它的引用
>
>所以双方根本不可能通信。


**示例代码**   

:::code-group
```html [Parent Page]
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Parent Page</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; }
    input, button { padding: 8px 12px; margin: 8px 0; }
    iframe { border: 1px solid #ccc; border-radius: 8px; }
    .box { padding: 12px; border: 1px solid #ddd; border-radius: 6px; margin-top: 10px; }
  </style>
</head>
<body>
  <h2>👨 Parent Page</h2>

  <label>Message to iframe:</label><br>
  <input id="messageInput" type="text" placeholder="Type something..." style="width: 300px;">
  <button onclick="sendMessage()">Send to Iframe</button>

  <div class="box" id="received">📨 Waiting for message from iframe...</div>

  <iframe id="myIframe" src="http://127.0.0.1:5504" width="100%" height="250"></iframe>

  <script>
    const iframe = document.getElementById('myIframe');

    function sendMessage() {
      const message = document.getElementById('messageInput').value;
      iframe.contentWindow.postMessage(message, 'http://127.0.0.1:5504');
    }

    window.addEventListener('message', (event) => {
      if (event.origin === 'http://127.0.0.1:5504') {
        document.getElementById('received').textContent = '📥 Received from iframe: ' + event.data;
      }
    });
  </script>
</body>
</html>
```

```html [Iframe Page]
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Iframe Page</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; background: #f9f9f9; }
    input, button { padding: 8px 12px; margin: 8px 0; }
    .box { padding: 12px; border: 1px solid #ddd; border-radius: 6px; background: white; }
  </style>
</head>
<body>
  <h3>🧒 Iframe Page</h3>

  <div class="box" id="received">📨 Waiting for message from parent...</div>

  <label>Message to parent:</label><br>
  <input id="childInput" type="text" placeholder="Type to parent..." style="width: 300px;">
  <button onclick="sendToParent()">Send to Parent</button>

  <script>
    window.addEventListener('message', (event) => {
      if (event.origin === 'http://127.0.0.1:5503') {
        document.getElementById('received').textContent = '📥 Received from parent: ' + event.data;
      }
    });

    function sendToParent() {
      const message = document.getElementById('childInput').value;
      window.parent.postMessage(message, 'http://127.0.0.1:5503');
    }
  </script>
</body>
</html>
```
:::