# HTML5  

HTML5（简称 H5）带来了许多新特性，覆盖结构、语义、表单、媒体、图形、离线存储、通信等方面


##  一、语义化标签（结构更清晰）

HTML5 引入了很多语义化标签，提升可读性和可维护性：  

| 标签          | 说明             |
| ----------- | -------------- |
| `<header>`  | 页眉             |
| `<footer>`  | 页脚             |
| `<nav>`     | 导航             |
| `<article>` | 独立内容块          |
| `<section>` | 内容区域           |
| `<aside>`   | 侧边栏或补充内容       |
| `<main>`    | 页面主要内容（只能出现一次） |



##  二、音视频标签（无需 Flash）  

| 标签        | 说明   |
| --------- | ---- |
| `<audio>` | 音频播放 |
| `<video>` | 视频播放 |


示例：
```js
<video controls>
  <source src="movie.mp4" type="video/mp4">
</video>
```



## 三、表单增强（类型更丰富）

| 类型              | 示例     |
| --------------- | ------ |
| `type="date"`   | 日期选择   |
| `type="email"`  | 邮箱输入   |
| `type="url"`    | URL 输入 |
| `type="range"`  | 滑动条    |
| `type="number"` | 数字输入   |
| `type="color"`  | 颜色选择器  |


还有：

- `placeholder`（输入提示）

- `required`（必填）

- `autofocus`（自动聚焦）

- `pattern`（正则验证）  



## 四、Canvas & SVG（图形绘制）  

- `<canvas>`：使用 `JavaScript` 动态绘图

- `<svg>`：矢量图形（`XML`）  

```js
<canvas id="myCanvas" width="200" height="100"></canvas>
```

```js
const ctx = document.getElementById("myCanvas").getContext("2d");
ctx.fillStyle = "red";
ctx.fillRect(10, 10, 100, 50);
```



## 五、本地存储（取代 Cookie）  

| 接口               | 说明             |
| ---------------- | -------------- |
| `localStorage`   | 永久存储（直到手动清除）   |
| `sessionStorage` | 会话存储（浏览器关闭即清除） |


示例：  

```js
localStorage.setItem('key', 'value');
const val = localStorage.getItem('key');
```

## 六、Web Worker（开启子线程处理任务）

用于处理大量计算，防止页面卡死。  

Web Worker 是 HTML5 引入的一项 API，允许你在浏览器中开辟一个独立的线程来运行 JavaScript 脚本。

它解决的问题是：避免长时间执行任务阻塞 UI 主线程（也就是不会“卡页面”）。

```js
const worker = new Worker('worker.js');
worker.postMessage('start');
worker.onmessage = function(e) {
  console.log(e.data);
};
```



## 七、WebSocket（持久连接，适合实时通信）

比 Ajax 更高效，适合聊天、游戏等。  

```js
const socket = new WebSocket("wss://example.com/socket");
socket.onmessage = (e) => console.log(e.data);
socket.send("hello");
```


## 八、离线缓存（AppCache/Service Worker）  

- 旧方法：`manifest.appcache`（已废弃）

- 新方法：使用 `Service Worker` 实现离线体验（`PWA` 核心）



##  九、Geolocation（地理位置）


```js
navigator.geolocation.getCurrentPosition(pos => {
  console.log(pos.coords.latitude, pos.coords.longitude);
});
```



## 十、拖放 API（Drag & Drop）

```js
<div draggable="true">拖我</div>
```

