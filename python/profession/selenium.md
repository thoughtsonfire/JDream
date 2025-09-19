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

| 方法                     | 说明         | 示例                                                        |
| ---------------------- | ---------- | --------------------------------------------------------- |
| `By.ID`                | 根据 id 查找   | `driver.find_element(By.ID, "username")`                  |
| `By.NAME`              | 根据 name    | `driver.find_element(By.NAME, "password")`                |
| `By.CLASS_NAME`        | 根据 class   | `driver.find_element(By.CLASS_NAME, "btn")`               |
| `By.TAG_NAME`          | 根据标签名      | `driver.find_element(By.TAG_NAME, "a")`                   |
| `By.LINK_TEXT`         | 根据链接文本     | `driver.find_element(By.LINK_TEXT, "点击这里")`               |
| `By.PARTIAL_LINK_TEXT` | 根据部分链接文本   | `driver.find_element(By.PARTIAL_LINK_TEXT, "点击")`         |
| `By.CSS_SELECTOR`      | 根据 CSS 选择器 | `driver.find_element(By.CSS_SELECTOR, "div.content > a")` |
| `By.XPATH`             | 根据 XPath   | `driver.find_element(By.XPATH, "//div[@id='main']/a[1]")` |

>Selenium 4.x 推荐使用 driver.find_element(By.XXX, "value")，不要再用旧方法 find_element_by_xxx。

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

| 属性 / 方法                        | 说明                          |
| ------------------------------ | --------------------------- |
| `element.text`                 | 获取元素的文本内容                   |
| `element.get_attribute("属性名")` | 获取 HTML 属性，如 href、src、value |
| `element.is_displayed()`       | 判断元素是否可见                    |
| `element.is_enabled()`         | 判断元素是否可操作                   |
| `element.is_selected()`        | 判断元素是否被选中（checkbox、radio）   |


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
```

常用 Expected Conditions  

| 条件                                                    | 说明                     | 示例                                                                  |
| ----------------------------------------------------- | ---------------------- | ------------------------------------------------------------------- |
| `presence_of_element_located(locator)`                | 元素在 DOM 中存在即可，不要求可见    | `EC.presence_of_element_located((By.ID, "username"))`               |
| `visibility_of_element_located(locator)`              | 元素存在且可见（宽高 > 0）        | `EC.visibility_of_element_located((By.CSS_SELECTOR, ".btn"))`       |
| `visibility_of(element)`                              | 已有元素对象，判断可见性           | `EC.visibility_of(elem)`                                            |
| `element_to_be_clickable(locator)`                    | 元素存在且可点击（可见 + enabled） | `EC.element_to_be_clickable((By.XPATH, "//button"))`                |
| `text_to_be_present_in_element(locator, text_)`       | 元素包含指定文本               | `EC.text_to_be_present_in_element((By.ID, "msg"), "成功")`            |
| `text_to_be_present_in_element_value(locator, text_)` | 元素的 value 属性包含指定文本     | `EC.text_to_be_present_in_element_value((By.NAME, "input"), "abc")` |
| `frame_to_be_available_and_switch_to_it(locator)`     | iframe 可用时切换到 iframe   | `EC.frame_to_be_available_and_switch_to_it((By.ID, "frame1"))`      |
| `invisibility_of_element_located(locator)`            | 元素不可见或不在 DOM 中         | `EC.invisibility_of_element_located((By.CSS_SELECTOR, ".loading"))` |
| `element_located_to_be_selected(locator)`             | 元素被选中（checkbox/radio）  | `EC.element_located_to_be_selected((By.ID, "checkbox1"))`           |
| `element_selection_state_to_be(element, bool)`        | 已有元素对象，判断选中状态          | `EC.element_selection_state_to_be(elem, True)`                      |
| `alert_is_present()`                                  | 弹窗 alert 出现            | `EC.alert_is_present()`                                             |


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


## 高级技巧  

1. 模拟键盘操作  

```py
from selenium.webdriver.common.keys import Keys
element.send_keys(Keys.TAB, Keys.ARROW_DOWN)
```  

2. 截图  

```py
driver.save_screenshot("screenshot.png")
```

3. 获取页面源码  

```py
html = driver.page_source
```

4. 处理 Cookies  

```py
driver.get_cookies()
driver.add_cookie({"name": "token", "value": "123456"})
```

5. 执行 JavaScript  

```py
driver.execute_script("alert('Hello Selenium');")
```

