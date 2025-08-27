# puppeteer


## 网站  

<LinkCard url="https://pptr.dev/" title="Puppeteer 官网" 
description="https://pptr.dev/" />  

<LinkCard url="https://puppeteer.bootcss.com/" title="Puppeteer 中文文档" 
description="https://puppeteer.bootcss.com/" />  

<LinkCard url="https://github.com/puppeteer/puppeteer" title="GitHub 仓库" 
description="https://github.com/puppeteer/puppeteer" logo="/JDream/imgs/logo/github.png" />

<LinkCard url="https://www.npmjs.com/package/puppeteer" title="NPM 包页面" 
description="https://www.npmjs.com/package/puppeteer" logo="/JDream/imgs/logo/npm.png" />


## 基础

### 为什么异步

>方便控制流程，`Puppeteer` 的大多数 `API` 都是 异步的

```js
(async () => {
  // 异步操作
})();

```

`Puppeteer` 的大多数 `API` 都是 异步的，比如：

- `puppeteer.launch()` → 返回 `Promise`

- `page.goto(url)` → 返回 `Promise`

- `page.click()` / `page.type()` → 返回 `Promise`

在 `Node.js` 中，异步函数只能用 `await` 等待 `Promise` 完成，而 `await` 必须在 `async` 函数 内使用。


### 导入、使用

```js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false }); // 1. 打开浏览器
  const page = await browser.newPage();                        // 2. 新建一个标签页
  await page.goto('https://example.com');                      // 3. 打开网址
  await browser.close();                                       // 4. 关闭浏览器
})();

```

## API 

### Puppeteer.launch()

```js
puppeteer.launch({
  executablePath: "...",    // 浏览器可执行文件路径
  headless: false,          // 是否隐藏界面（默认 true）
  defaultViewport: null,    // 默认视口 (null 表示跟随浏览器窗口)
  args: [                   // 额外的命令行参数
    "--no-sandbox",
    "--disable-setuid-sandbox",     //禁用沙箱
    "--window-size=1280,800"   //设置窗口大小
  ],
  userDataDir: "C:/profile",// 自定义用户数据目录 (保存cookie/会话)
  slowMo: 50,               // 每个操作延时(ms) - 便于调试
  ignoreDefaultArgs: [ ... ], // 忽略 Puppeteer 内置的默认参数
  devtools: false,          // 是否自动打开 DevTools
  dumpio: false,            // 是否把浏览器进程的输出打印到控制台
  env: { ... },             // 自定义环境变量
  pipe: false,              // 用管道替代 WebSocket 连接 (极少用)
  product: "chrome",        // 选择浏览器类型 ("chrome" 或 "firefox")
  protocolTimeout: 180000   // DevTools 协议调用超时 (ms)
})

```


### page

```md

page（Puppeteer 页面对象）
├─ 导航
│   ├─ goto(url, options)
│   ├─ reload(options)
│   ├─ waitForNavigation(options)
│   └─ waitForSelector(selector, options)
├─ DOM 元素查找
│   ├─ 单个元素
│   │   └─ $() → ElementHandle
│   ├─ 多个元素
│   │   └─ $$() → [ElementHandle]
│   ├─ XPath
│   │   └─ $x() → [ElementHandle]
├─ 元素操作
│   ├─ click()          ← ElementHandle 或 page.click(selector)
│   ├─ hover()          ← 鼠标移入，触发悬浮显示
│   ├─ type(text, options)
│   ├─ select(value)
│   ├─ scrollIntoView() ← 确保元素可视
│   └─ evaluate(fn)     ← 自定义 DOM 操作
├─ 快捷操作
│   ├─ page.click(selector)      ← 内部查找 + click
│   ├─ page.$eval(selector, fn)  ← 内部查找 + evaluate
│   └─ page.$$eval(selector, fn) ← 内部查找所有 + evaluate
├─ 输出
│   ├─ screenshot(options)
│   └─ pdf(options)
├─ 页面信息
│   ├─ url()
│   ├─ title()
│   └─ content()
├─ 等待 / 事件
│   ├─ waitForTimeout(ms)
│   ├─ on('console' / 'dialog' / 'request' / 'response' / ...)
│   └─ waitForSelector(selector, { visible: true })
└─ 其他
    ├─ setViewport(viewport)
    ├─ setUserAgent(userAgent)
    ├─ cookies() / setCookie()
    └─ exposeFunction(name, fn)

```

- `page.click(selector)` → 只接受 `CSS selector`
- `$x()` / `$()` → 返回 `ElementHandle`，要点击必须调用 `el.click()`
- 所以 `$x()` 不能直接传给 `page.click()`，要先解构取元素，再调用 `.click()`

#### **选中元素**  

一、通过选择器获取元素句柄（Handle）  

1. 单个元素

```js
const el = await page.$('css选择器');
```

2. 多个元素  

```js
const els = await page.$$('css选择器');
//返回所有匹配元素的句柄数组。
```

3. 通过 `XPath`

```js
const [el] = await page.$x('//div[@class="title"]');
// '//'表示相对路径  `//div` 匹配文档中所有 div 元素（不管它在 DOM 树的哪一层）
```

4. 框架内元素

```js
const frame = page.frames().find(f => f.name() === 'myframe');
const el = await frame.$('css选择器');

```

二、在页面上下文直接操作元素  

>不获取句柄，直接取值或执行函数，适合抓取数据或直接修改 DOM

1. 单个元素直接处理

```js
const text = await page.$eval('.title', el => el.innerText);
//$eval：找到第一个匹配元素，把它传给函数执行，返回结果。
```

2. 多个元素遍历处理  

```js
const texts = await page.$$eval('.item', els => els.map(e => e.textContent));
//$$eval：找到所有匹配元素，把数组传给函数执行。
```

3. 直接执行任意 DOM 操作  

```js
await page.evaluate(() => {
  document.querySelector('#submit').click();
});
//evaluate：不依赖选择器返回值，直接在浏览器环境运行函数。
```

三、组合选择（先找父节点，再找子节点）

1. 父句柄找子元素

```js
const parent = await page.$('.container');
const child = await parent.$('.item');
const text = await page.evaluate(el => el.textContent, child);
```

2. 多元素循环处理  

```js
const items = await page.$$('.item');
for (const item of items) {
  const title = await item.$eval('.title', el => el.innerText);
  console.log(title);
}

```

四、特殊场景  

1. 通过属性值过滤

```js
const el = await page.$('[data-id="123"]');

```

2. 通过文本匹配（需 evaluate）

```js
const el = await page.evaluateHandle(() => {
  return Array.from(document.querySelectorAll('button'))
    .find(b => b.innerText.includes('提交'));
});

```


#### 输入内容

```js
  await page.type('#searchInput', '搜索内容'); 
```

- 标准用法：

```js
page.type(selector, text, options)

```

**参数详解**

`selector (string)`

- 必填

- CSS 选择器，表示要输入内容的元素，比如：

```js
'#searchInput' 
'.search-box input'
'input[name="q"]'
```


`text (string)`

- 必填

- 你想输入的字符串，比如 '智能'。

`options` (可选对象)

`delay` (number)：

- 每个字符输入的间隔（毫秒）。

- 默认是 0（瞬间输入）。

- 如果想模拟真实用户，可以写：

`await page.type('#searchInput', '智能', { delay: 100 });`


表示每个字符间隔 `100ms` 输入。

`timeout` (number)：

-等待找到选择器的最大时间，单位毫秒（默认 30 秒）。

超时会抛错。

`await page.type('#searchInput', '智能', { timeout: 5000 });`


