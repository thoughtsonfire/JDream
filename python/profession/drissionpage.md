<!-- # DrissionPage

## 安装

```bash
pip install drissionpage
```

## 与 Selenium/Playwright 比较

| 特点                          | DrissionPage         | Selenium   | Playwright            |
| ----------------------------- | -------------------- | ---------- | --------------------- |
| 浏览器自动化                  | ✔︎                   | ✔︎         | ✔︎                    |
| API 易用性                    | ⭐⭐⭐⭐⭐（最简单） | ⭐⭐       | ⭐⭐⭐                |
| Requests 模式                 | ✔︎（强项）           | ✘          | ✔︎（但不共享 cookie） |
| 浏览器与 requests 共享 cookie | ✔︎（核心卖点）       | ✘          | ✘                     |
| 防反爬能力                    | ⭐⭐⭐⭐             | ⭐⭐       | ⭐⭐⭐⭐              |
| Windows 无脑部署              | ✔︎                   | 有驱动麻烦 | ✔︎ 但依赖重           |
| 抓接口                        | ⭐⭐⭐⭐⭐           | ⭐         | ⭐⭐                  |

## 基本概念

1. 默认：自动查找浏览器（不建议，自己设置比较好）
2. 如果没找到浏览器怎么办？（自动下载 Chromium）
3. 默认：自动创建一个临时的数据目录存储用户数据（永久的不会自动删除，在 c 盘）

| 模式                        | 是否持久化 | 说明                            |
| --------------------------- | ---------- | ------------------------------- |
| ❌ 自动模式（你啥都不设置） | ✔ 持久化   | DrissionPage 自动生成目录并保留 |
| ✔ 自己指定 user_data_path   | ✔ 持久化   | 完全可控，可以账号分离          |
| ✔ 设置 user_data_path=None  | ✘ 不持久   | 退出后即消失（真正的临时）      |

**手动配置浏览器路径和用户数据路径，保证一切在掌控中**

```py
from DrissionPage import WebPage
from DrissionPage import ChromiumOptions

co = ChromiumOptions()
co.set_browser_path(r"D:\Chrome\chrome.exe")
co.set_user_data_path(r"D:\Chrome\User Data")

page = WebPage(chromium_options=co)
page.get("https://www.baidu.com")
```

## DrissionPage 的三大页面类型

| 页面类型        | 功能                          | 使用场景                           |
| --------------- | ----------------------------- | ---------------------------------- |
| **WebPage**     | 浏览器自动化（Selenium 替代） | 点击按钮、输入、截图、抓渲染内容   |
| **SessionPage** | 纯 HTTP 请求（Requests 替代） | 简单接口访问、无 JS 的网站         |
| **MixPage**     | 浏览器 + Requests 混合        | 登录后抓接口、模拟真实用户发送请求 |

## WebPage（浏览器自动化）

1. 打开浏览器 + 访问网页

```py
from DrissionPage import WebPage

page = WebPage()
page.get("https://www.baidu.com")
print(page.title)
```

2. 查找元素（超级强大简单）

- 按 CSS

```py
page.ele('#kw')
```

- 按文本

```py
page.ele('文本:新闻')
```

- 按 XPath

```py
page.ele('x://input[@id="kw"]')
```

- 多个元素

```py
items = page.eles('.result')
```

3. 输入 + 点击

```py
page.ele('#kw').input('DrissionPage 文档')
page.ele('#su').click()
```

4. 截图

```py
page.save_screenshot('page.png')
```

5. 获取渲染后的 HTML / 文本

```py
html = page.html
text = page.ele('.result').text
```

6. 自动下载文件（简单到哭）

```py
page.download(url='https://xxx.com/file.zip', save_path='./files')
```

## SessionPage（Requests + 无限增强）

最简单的 GET：

```py
from DrissionPage import SessionPage

sp = SessionPage()
res = sp.get("https://httpbin.org/get")
print(res.json)
```

携带数据 POST：

```py
sp.post("https://httpbin.org/post", data={'a':1})
```

## MixPage（重点！登录后抓接口神器）

1. 浏览器登录 → 接口自动带 Cookie

```py
from DrissionPage import MixPage

page = MixPage()
page.get("https://example.com/login")

page.ele('#username').input('admin')
page.ele('#password').input('123456')
page.ele('文本:登录').click()

# 登录成功后执行接口请求
res = page.s_get("/api/user/info")
print(res.json)
```

✔ 浏览器 Cookie 自动同步到 Session
✔ CSRF 自动处理
✔ 超适合抓登录后的接口

## 网络请求监听（抓包神器）

DrissionPage 内置浏览器监听网络包：

```py
for req in page.listen.start():
    print(req.url, req.response.status)
```

可以匹配接口：

```py
mp = MixPage()
mp.listen.start(pattern='api/user')
```

## 等待元素（比 Selenium 稳定）

```py
page.wait.ele_display('#login-btn')
```

或自动等待：

```py
page.ele('#login-btn', timeout=10).click()
```

## 执行 JS

```py
page.run_js("alert('Hello!')")
```

获取返回值：

```py
height = page.run_js("return document.body.scrollHeight")
```

## 多标签页操作

打开新标签：

```py
page.new_tab('https://www.bing.com')
```

切换标签：

```py
page.switch.to(1)
```

关闭：

```py
page.close_tab()
```

## 代理、UA、防反爬配置

```py
page.set.user_agent("Mozilla/5.0 ...")
page.set.proxy("http://127.0.0.1:7890")
``` -->
