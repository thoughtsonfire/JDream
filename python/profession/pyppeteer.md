# pyppeteer

## 安装

```bash
pip install pyppeteer
```

> 第一次运行时会自动下载 Chromium 浏览器（几百 MB）。  
> 一般下载不下来，可以自己手动下一个  
> 然后指定地址

## 基本介绍

| 项目     | 说明                                                     |
| -------- | -------------------------------------------------------- |
| 名称     | **Pyppeteer**                                            |
| 来源     | 从 Node.js 的 Puppeteer 移植到 Python                    |
| 控制对象 | Chromium / Chrome 浏览器                                 |
| 内核     | 使用 DevTools 协议（Chrome Remote Debugging Protocol）   |
| 主要功能 | 网页爬取、模拟点击、输入、截图、PDF 导出、爬取动态网站等 |

## 基本使用

这是一个最小示例：

```py
import asyncio
from pyppeteer import launch

async def main():
    # 启动浏览器
    browser = await launch(headless=True)  # headless=False 可以看到界面
    page = await browser.newPage()

    # 打开网页
    await page.goto('https://example.com')

    # 获取标题
    title = await page.title()
    print("标题：", title)

    # 截图
    await page.screenshot({'path': 'example.png'})

    # 关闭浏览器
    await browser.close()

# 运行异步任务
asyncio.run(main())
```

## 常见操作汇总

### 1. 打开网页并等待加载完成

```py
await page.goto('https://example.com', {'waitUntil': 'networkidle2'})
```

waitUntil 参数常用选项：

- 'load'：等待 load 事件触发

- 'domcontentloaded'：等待 DOM 加载完成

- 'networkidle2'：网络请求空闲（常用于 SPA 页面）

### 2. 模拟点击和输入

```py
await page.click('#login-button')
await page.type('#username', 'my_user')
await page.type('#password', 'my_pass')
```

如果元素需要等待出现，可以用：

```py
await page.waitForSelector('#login-button')
```

### 3. 执行网页中的 JavaScript

```py
result = await page.evaluate('document.title')
print(result)
```

执行自定义函数：

```py
result = await page.evaluate('''() => {
    return document.querySelector("h1").innerText;
}''')
```

### 4. 获取 HTML 内容

```py
content = await page.content()
print(content)
```

### 5. 截图 & PDF

```py
await page.screenshot({'path': 'page.png', 'fullPage': True})
await page.pdf({'path': 'page.pdf', 'format': 'A4'})
```

### 6. 关闭浏览器

```py
await browser.close()
```

## 常用设置

### 禁用自动化提示（避免被检测）

```py
browser = await launch({
    'headless': False,
    'args': ['--disable-infobars'],
})
page = await browser.newPage()
await page.evaluateOnNewDocument('Object.defineProperty(navigator, "webdriver", {get: () => undefined})')
```

```py
import asyncio
import random
from pyquery import PyQuery as pq
from pyppeteer import launch

BROWSER_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"  # 修改为你的 chrome/chromium 路径

async def create_stealth_browser():
    browser = await launch(
        executablePath=BROWSER_PATH,
        headless=False,              # 可视模式更不容易被判定为 headless
        args=[
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--start-maximized",
            "--disable-infobars",            # 尝试隐藏 infobar（可能被忽略）
            "--disable-blink-features=AutomationControlled",  # 常见配合项
            # "--window-size=1366,768",      # 如需固定窗口大小可开启
        ],
        defaultViewport=None,        # 让窗口尺寸跟 args 中的窗口尺寸一致
        ignoreDefaultArgs=["--enable-automation"]
    )
    return browser

async def prepare_page(page):
    # 1) 常见 UA
    ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
    await page.setUserAgent(ua)

    # 2) Accept-Language 头，常被检查
    await page.setExtraHTTPHeaders({"Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7"})

    # 3) 在新文档最早注入脚本，覆盖 navigator.webdriver / plugins / languages / window.chrome 等
    await page.evaluateOnNewDocument("""
        // navigator.webdriver -> undefined
        Object.defineProperty(navigator, 'webdriver', { get: () => undefined });

        // languages
        Object.defineProperty(navigator, 'languages', { get: () => ['zh-CN', 'zh'] });

        // plugins (简单模拟)
        Object.defineProperty(navigator, 'plugins', { get: () => [1, 2, 3, 4] });

        // window.chrome 标志
        window.chrome = window.chrome || { runtime: {} };

        // 删除一些可能泄露自动化的信息（尽量早）
        try {
            delete navigator.__proto__.webdriver;
        } catch (e) {}
    """)

    # 4) 视口可选设置（匹配 UA）
    await page.setViewport({"width": 1366, "height": 768})

async def example_usage():
    browser = await create_stealth_browser()
    page = await browser.newPage()
    await prepare_page(page)

    await page.goto("https://www.maoyan.com/films?showType=1", timeout=60000)
    # 等待关键元素出现，保证 JS 渲染完成
    await page.waitForSelector('.channel-detail.movie-item-title>a', {"timeout": 30000})

    content = await page.content()
    print("页面长度：", len(content))

    await browser.close()

if __name__ == "__main__":
    asyncio.run(example_usage())
```
