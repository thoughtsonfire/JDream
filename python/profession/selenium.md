# Selenium

## 打开浏览器

- 检测用户系统里安装了哪些浏览器（Chrome / Edge / Firefox ）。

- 根据检测结果，自动选择安装对应的 webdriver-manager。

```bash
pip install selenium webdriver-manager requests
```

```py
import os
from time import sleep

from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.edge.service import Service as EdgeService
from selenium.webdriver.firefox.service import Service as FirefoxService
from webdriver_manager.chrome import ChromeDriverManager
from webdriver_manager.microsoft import EdgeChromiumDriverManager
from webdriver_manager.firefox import GeckoDriverManager

def get_driver():
    base_profile_dir = os.path.abspath("selenium_profiles")
    os.makedirs(base_profile_dir, exist_ok=True)

    # 检测 Chrome
    if os.path.exists(r"C:\Program Files\Google\Chrome\Application\chrome.exe") or \
       os.path.exists(r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"):
        print("检测到 Chrome，使用 ChromeDriver")
        profile_path = os.path.join(base_profile_dir, "chrome")
        options = webdriver.ChromeOptions()
        options.add_argument(f"user-data-dir={profile_path}")
        return webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()), options=options)

    # 检测 Edge
    if os.path.exists(r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"):
        print("检测到 Edge，使用 EdgeDriver")
        profile_path = os.path.join(base_profile_dir, "edge")
        options = webdriver.EdgeOptions()
        options.add_argument(f"user-data-dir={profile_path}")
        return webdriver.Edge(service=EdgeService(EdgeChromiumDriverManager().install()), options=options)

    # 检测 Firefox
    if os.path.exists(r"C:\Program Files\Mozilla Firefox\firefox.exe"):
        print("检测到 Firefox，使用 GeckoDriver")
        profile_path = os.path.join(base_profile_dir, "firefox")
        os.makedirs(profile_path, exist_ok=True)
        options = webdriver.FirefoxOptions()
        options.set_preference("profile", profile_path)
        return webdriver.Firefox(service=FirefoxService(GeckoDriverManager().install()), options=options)

    raise RuntimeError("未检测到可用浏览器，请安装 Chrome / Edge / Firefox")

# 使用
driver = get_driver()
driver.get("https://www.baidu.com/")
sleep(20)


```

## Selenium 获取页面元素

Selenium 中 获取元素可以分为两类：单个元素 和 多个元素。

<br>

### 查找单个元素

```py
element = driver.find_element(By.ID, "element_id")
```

常用查找方式（By）：

| 方法                   | 说明             | 示例                                                      |
| ---------------------- | ---------------- | --------------------------------------------------------- |
| `By.ID`                | 根据 id 查找     | `driver.find_element(By.ID, "username")`                  |
| `By.NAME`              | 根据 name        | `driver.find_element(By.NAME, "password")`                |
| `By.CLASS_NAME`        | 根据 class       | `driver.find_element(By.CLASS_NAME, "btn")`               |
| `By.TAG_NAME`          | 根据标签名       | `driver.find_element(By.TAG_NAME, "a")`                   |
| `By.LINK_TEXT`         | 根据链接文本     | `driver.find_element(By.LINK_TEXT, "点击这里")`           |
| `By.PARTIAL_LINK_TEXT` | 根据部分链接文本 | `driver.find_element(By.PARTIAL_LINK_TEXT, "点击")`       |
| `By.CSS_SELECTOR`      | 根据 CSS 选择器  | `driver.find_element(By.CSS_SELECTOR, "div.content > a")` |
| `By.XPATH`             | 根据 XPath       | `driver.find_element(By.XPATH, "//div[@id='main']/a[1]")` |

> Selenium 4.x 推荐使用 driver.find_element(By.XXX, "value")，不要再用旧方法 find_element_by_xxx。

<br>

### 查找多个元素

```py
elements = driver.find_elements(By.CLASS_NAME, "item")
```

- 返回 列表，即使只有一个元素也会放在列表里

- 遍历列表获取信息

```py
for el in elements:
    print(el.text, el.get_attribute("href"))
```

<br>

### 获取元素信息

| 属性 / 方法                       | 说明                                  |
| --------------------------------- | ------------------------------------- |
| `element.text`                    | 获取元素的文本内容                    |
| `element.get_attribute("属性名")` | 获取 HTML 属性，如 href、src、value   |
| `element.is_displayed()`          | 判断元素是否可见                      |
| `element.is_enabled()`            | 判断元素是否可操作                    |
| `element.is_selected()`           | 判断元素是否被选中（checkbox、radio） |

示例：

```py
link = driver.find_element(By.CSS_SELECTOR, "a.result-link")
print("文本:", link.text)
print("链接:", link.get_attribute("href"))

text = element.text
href = element.get_attribute("href")
is_visible = element.is_displayed()
is_enabled = element.is_enabled()
is_selected = element.is_selected()

```

<br>

### 元素操作

- 点击：

```py
element.click()
```

- 输入文字：

```py
from selenium.webdriver.common.keys import Keys
element.send_keys("Python Selenium")
element.send_keys(Keys.ENTER)  # 回车
```

- 清空输入框：

```py
element.clear()
```

- 下拉框操作（Select）：

```py
from selenium.webdriver.support.ui import Select
select = Select(driver.find_element(By.ID, "dropdown"))
select.select_by_index(1)
select.select_by_value("val")
select.select_by_visible_text("选项文本")
```

<br>

### 等待元素

直接获取可能出现元素未加载的问题，所以建议使用 显式等待：

```py
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

element = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.ID, "username"))
)

# 可以拆开写
wait = WebDriverWait(driver, 10) #创建一个显式等待（最多等 10 秒）；
wait.until(EC.presence_of_element_located((By.ID, "username")))
#直到页面中出现 id="username" 的元素，才继续执行；如果 10 秒内没找到，会抛出超时异常。
```

- `from selenium.webdriver.support.wait import WebDriverWait`
- `from selenium.webdriver.support.ui import WebDriverWait`

看起来不同，但其实 —— 导入的是同一个类 ✅。只是加了个个中转导入

官方文档与示例（包括 Selenium 4.x）统一推荐写法是：

```py
from selenium.webdriver.support.ui import WebDriverWait
```

常用 Expected Conditions

| 条件                                                  | 说明                               | 示例                                                                |
| ----------------------------------------------------- | ---------------------------------- | ------------------------------------------------------------------- |
| `presence_of_element_located(locator)`                | 元素在 DOM 中存在即可，不要求可见  | `EC.presence_of_element_located((By.ID, "username"))`               |
| `visibility_of_element_located(locator)`              | 元素存在且可见（宽高 > 0）         | `EC.visibility_of_element_located((By.CSS_SELECTOR, ".btn"))`       |
| `visibility_of(element)`                              | 已有元素对象，判断可见性           | `EC.visibility_of(elem)`                                            |
| `element_to_be_clickable(locator)`                    | 元素存在且可点击（可见 + enabled） | `EC.element_to_be_clickable((By.XPATH, "//button"))`                |
| `text_to_be_present_in_element(locator, text_)`       | 元素包含指定文本                   | `EC.text_to_be_present_in_element((By.ID, "msg"), "成功")`          |
| `text_to_be_present_in_element_value(locator, text_)` | 元素的 value 属性包含指定文本      | `EC.text_to_be_present_in_element_value((By.NAME, "input"), "abc")` |
| `frame_to_be_available_and_switch_to_it(locator)`     | iframe 可用时切换到 iframe         | `EC.frame_to_be_available_and_switch_to_it((By.ID, "frame1"))`      |
| `invisibility_of_element_located(locator)`            | 元素不可见或不在 DOM 中            | `EC.invisibility_of_element_located((By.CSS_SELECTOR, ".loading"))` |
| `element_located_to_be_selected(locator)`             | 元素被选中（checkbox/radio）       | `EC.element_located_to_be_selected((By.ID, "checkbox1"))`           |
| `element_selection_state_to_be(element, bool)`        | 已有元素对象，判断选中状态         | `EC.element_selection_state_to_be(elem, True)`                      |
| `alert_is_present()`                                  | 弹窗 alert 出现                    | `EC.alert_is_present()`                                             |

<br>

### 弹窗、iframe、滚动

弹窗

```py
alert = driver.switch_to.alert
alert.accept()  # 点击确认
alert.dismiss() # 点击取消
```

iframe

```py
driver.switch_to.frame("iframe_id")
driver.find_element(By.ID, "inner-btn").click()
driver.switch_to.default_content()  # 返回主文档
```

滚动页面

```py
driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
driver.execute_script("arguments[0].scrollIntoView();", element)
```

<br>

### 小技巧

- 尽量用 CSS Selector / XPath，灵活且适应复杂结构。

- 获取多个元素时不要只取第一个，尽量用循环遍历。

- 显式等待比隐式等待更可靠，尤其是动态加载网页。

- 对于动态数据，可结合 driver.execute_script("return ...") 获取 JS 生成内容。

## 浏览器前进、后退

```py
driver.back() # 后退
driver.forward() # 前进
```

## 无头浏览器

> [!NOTE] 无头模式
> 在运行时不再弹出浏览器窗口  
> 减少了干扰，而且减少了一些资源的加载  
> 如图片等资源  
> 在一定程度上节省了资源加载时间和网络带宽

```py 6,7
from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
import os

options = webdriver.ChromeOptions()
options.add_argument('--headless')
service = ChromeService(ChromeDriverManager().install())

browser = webdriver.Chrome(service=service,options=options)

browser.set_window_size(1024, 768)

browser.get('https://www.baidu.com')
imgs_path =os.path.abspath("imgs")
os.makedirs(imgs_path, exist_ok=True)


png_path = os.path.join(imgs_path,"preview.png")

browser.get_screenshot_as_file(png_path)
```

## 高级技巧

### 1. 模拟键盘操作

```py
from selenium.webdriver.common.keys import Keys
element.send_keys(Keys.TAB, Keys.ARROW_DOWN)
```

### 2. 截图

```py
driver.save_screenshot("screenshot.png")
```

### 3. 获取页面源码

```py
html = driver.page_source
```

### 4. 处理 Cookies

```py
driver.get_cookies()
driver.add_cookie({"name": "token", "value": "123456"})
```

### 5. 执行 JavaScript

```py
driver.execute_script("alert('Hello Selenium');")
```

## 反屏蔽

> [!NOTE] 检测基本原理
> 检测当前浏览器窗口下的 window.navigator 对象  
> 是否包含 webdriver 这个属性  
> 因为在正常使用浏览器的情况下  
> 这个属性是`undefined`然而一旦我们使用了 Selenium  
> Selenium 会给 window.navigator 设置 webdriver 属性  
> 很多网站就通过 JavaScript 判断  
> 如果 webdriver 属性存在，那就直接屏蔽

> [!NOTE] 为什么 Selenium 会给 window.navigator 设置 webdriver 属性  
> Selenium（或浏览器驱动）把 window.navigator.webdriver 设为 true，主要是出于「规范/透明」和「可被检测」这两个目的  
> W3C 的 WebDriver 规范要求：当浏览器被自动化控制时，应暴露出某种标志以表明「这是被程序控制的浏览器」。navigator.webdriver 就是用来表示这一点的标准字段，值为 true 表明当前浏览器会被 WebDriver 控制。换言之，浏览器厂商/驱动把它设成 true 是为了遵守协议、透明化自动化环境。
>
> - 网站 可以通过 navigator.webdriver 快速判断访问者是否使用自动化脚本，从而决定是否阻止、要求验证码或做更严格的风控。
> - 测试框架 / 调试工具 也可能用它来区分手工运行与自动化运行的行为（例如在测试环境启用某些专门逻辑）。

> [!NOTE] 将`window.navigator`设置成`undefined`
> 对 Selenium 的使用，和控制浏览器，没有其他影响  
> 只是屏蔽了简单检测  
> 绕过网站防护、规避条款可能违反目标站点的服务条款，甚至法律风险。务必合法合规地使用自动化技术。

使用 JavaScript 直接把 webdriver 属性置空

```js
Object.defineProperty(navigator, "webdriver", { get: () => undefined });
```

在页面加载完毕才执行

网站早在最初网页渲染之前就已经对 webdriver 属性进行了检测

所以这样做达不到效果

> 使用`CDP`(即 Chrome Devtools-Protocol,Chrome 开发者工具协议) 来解决这个问题
> 通过 CDP 我们可以实现在每个页面刚加载的时候执行 JavaScript 代码  
> 通过 CDP 的方法`Page.addScriptToEvaluateOnNewDocument`  
> 然后传入上文 JavaScript 代码即可  
> 这样我们就可以每次页面加载之前将 webdriver 属性置空了

### 常用反屏蔽代码

```py
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

options = webdriver.ChromeOptions()

# ① 禁用“自动化扩展”
options.add_experimental_option("useAutomationExtension", False)
options.add_experimental_option("excludeSwitches", ["enable-automation"])

# ② 禁用 Blink 特性（关键）
options.add_argument("--disable-blink-features=AutomationControlled")

# ③ （可选）伪装 navigator.webdriver
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
driver.execute_cdp_cmd(
    "Page.addScriptToEvaluateOnNewDocument",
    {"source": "Object.defineProperty(navigator, 'webdriver', {get: () => undefined})"}
)
```

```py
import time
import random
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def create_stealth_driver():
    options = webdriver.ChromeOptions()
    options.add_argument("--start-maximized")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--disable-infobars")  # 尝试隐藏 infobar（新版 chrome 可能忽略）
    # 覆盖 user-agent
    ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
    options.add_argument(f"--user-agent={ua}")

    # 去掉 "Chrome is being controlled by automated test software"
    options.add_experimental_option("excludeSwitches", ["enable-automation"])
    options.add_experimental_option("useAutomationExtension", False)
    service = ChromeService(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=options)

    # 通过 CDP 注入页面脚本（在 document 被创建前执行）
    driver.execute_cdp_cmd(
        "Page.addScriptToEvaluateOnNewDocument",
        {"source": """
            Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
            Object.defineProperty(navigator, 'languages', { get: () => ['zh-CN', 'zh'] });
            Object.defineProperty(navigator, 'plugins', { get: () => [1,2,3,4] });
            window.chrome = window.chrome || { runtime: {} };
            try { delete navigator.__proto__.webdriver; } catch(e) {}
        """}
    )
    # 设置 Accept-Language 头（CDP）
    driver.execute_cdp_cmd('Network.setExtraHTTPHeaders', {'headers': {'Accept-Language': 'zh-CN,zh;q=0.9'}})

    return driver

def example_usage():
    driver = create_stealth_driver()
    try:
        driver.get("https://www.maoyan.com/films?showType=1")
        wait = WebDriverWait(driver, 30)
        wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, ".channel-detail.movie-item-title>a")))

        # 模拟一点人类行为：随机小滚动、等待
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight/4);")
        time.sleep(random.uniform(0.3, 1.0))
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight/2);")
        time.sleep(random.uniform(0.3, 1.0))

        elems = driver.find_elements(By.CSS_SELECTOR, ".channel-detail.movie-item-title>a")
        names = [e.text for e in elems]
        print("抓取到名字数量：", len(names))
        print(names[:20])
    finally:
        driver.quit()

if __name__ == "__main__":
    example_usage()

```

> options.add_experimental_option("useAutomationExtension", False)  
> 告诉 ChromeDriver 不要把 --enable-automation 这个启动参数传给 Chrome。  
> 这个 --enable-automation 开关会让浏览器处于自动化模式  
> （并触发浏览器在页面顶部显示 “Chrome is being controlled by automated test software” 的信息条），  
> 同时与自动化相关的一些内部标志会被设置。  
> 去掉它可以去掉信息条，并减少部分显式标志。

> options.add_argument("--disable-blink-features=AutomationControlled")  
> 禁用 ChromeDriver 默认注入的 automation extension（自动化扩展）。  
> 早期 ChromeDriver 会注入一个扩展来协助驱动与浏览器通信，  
> 这个扩展会留下可被检测的指纹（例如 window.chrome、navigator.webdriver 的某些特征）。  
> 把它关掉可以减少被检测到的线索。

> options.add_argument("--disable-blink-features=AutomationControlled")  
> 禁用名为 “AutomationControlled” 的 Blink 特性，从而让浏览器不暴露出「这是自动化控制的」标志。  
> 也就是说，它能在一定程度上隐藏 Selenium 的痕迹，让网页更难检测到你是“机器人”在控制浏览器。

### 注意 ⚠️

不是万能的：

- 有些网站（例如谷歌、微博、淘宝）会做行为级检测，比如鼠标轨迹、页面加载节奏、请求频率，单靠这行无法完全绕过。

可能失效或被废弃：

- 这是个内部特性（experimental feature flag），未来 Chrome 改动时可能会重命名或失效。

不建议用来“欺骗网站”：

- 如果只是为了自动化测试、学习、数据分析是没问题的；

- 但若用于绕过网站安全验证或违反使用条款，则会有法律/道德风险。
