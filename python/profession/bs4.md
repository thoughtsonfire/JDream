# BeautifulSoup (bs4)  

BeautifulSoup (bs4) 简介  

- bs4 全名：Beautiful Soup 4

- 功能：解析 HTML/XML 文档，方便提取节点和内容

- 常和 requests 搭配使用


## 安装  

```bash
pip install beautifulsoup4 lxml
```
推荐用 lxml 作为解析器，速度快。  

## 基本用法  

```py
from bs4 import BeautifulSoup

html = """
<html>
  <body>
    <div class="content">
      <h1>标题</h1>
      <p id="p1">段落1</p>
      <p class="highlight">段落2</p>
      <a href="https://example.com">链接</a>
    </div>
  </body>
</html>
"""

soup = BeautifulSoup(html, "lxml")

print(soup.title)         # <title>...</title> 或 None
print(soup.h1.text)       # 标题
print(soup.find("p").text) # 第一个 <p>
```

## 查找节点  

### find 和 find_all  

```py
soup.find("p")                  # 找到第一个 <p>
soup.find_all("p")              # 找到所有 <p>
soup.find("p", id="p1")         # 按 id 匹配
soup.find("p", class_="highlight")  # 按 class 匹配
```

<br>

### select (CSS 选择器)  

```py
soup.select("p")                # 所有 <p>
soup.select(".highlight")       # class="highlight"
soup.select("#p1")              # id="p1"
soup.select("div p")            # div 下的所有 p
soup.select("a[href^='https']") # href 以 https 开头
```

## 获取内容和属性  

```py
tag = soup.find("a")

print(tag.text)        # 节点文本 → "链接"
print(tag["href"])     # 属性值 → "https://example.com"
print(tag.get("href")) # 同上，但更安全
```

## 遍历节点  

```py
div = soup.find("div", class_="content")

print(div.contents)     # 子节点列表
print(div.children)     # 子节点迭代器
print(div.parent)       # 父节点
print(div.find_next("p").text)  # 下一个 <p>
print(div.find_previous("h1").text) # 前一个 <h1>
```

## 修改文档 

```py
tag = soup.find("h1")
tag.string = "新标题"   # 修改文本

new_tag = soup.new_tag("span")
new_tag.string = "追加的内容"
soup.body.append(new_tag)  # 插入节点

print(soup.prettify())  # 格式化输出
```

## 与 requests 搭配  

```py
import requests
from bs4 import BeautifulSoup

url = "https://httpbin.org/html"
resp = requests.get(url)

soup = BeautifulSoup(resp.text, "lxml")
print(soup.h1.text)  # 输出网页里的 <h1> 文本
```

## BeautifulSoup vs XPath 对照表

| 目标                         | bs4 语法                                         | XPath 语法                            |        |
| -------------------------- | ---------------------------------------------- | ----------------------------------- | ------ |
| 获取所有 `<p>`                 | `soup.find_all("p")`                           | `//p`                               |        |
| 获取第一个 `<p>`                | `soup.find("p")`                               | `(//p)[1]`                          |        |
| 获取 `<p id="p1">`           | `soup.find("p", id="p1")`                      | `//p[@id="p1"]`                     |        |
| 获取 `<p class="highlight">` | `soup.find("p", class_="highlight")`           | `//p[@class="highlight"]`           |        |
| 获取任意含 `class` 的 `<p>`      | `soup.find_all("p", class_=True)`              | `//p[@class]`                       |        |
| 获取 `<a>` 的 href 属性         | `soup.find("a")["href"]`                       | `//a/@href`                         |        |
| 获取 `<a>` 文本                | `soup.find("a").text`                          | `//a/text()`                        |        |
| 模糊匹配 class 含 "highlight"   | `soup.select('p[class*="highlight"]')`         | `//p[contains(@class,"highlight")]` |        |
| 获取第一个子 `<p>`               | `soup.find("div").p`                           | `//div/p[1]`                        |        |
| 获取最后一个 `<p>`               | `soup.find_all("p")[-1]`                       | `//p[last()]`                       |        |
| 获取 `<div>` 下所有 `<span>`    | `soup.select("div span")`                      | `//div//span`                       |        |
| 获取兄弟节点（下一个）                | `tag.find_next_sibling("p")`                   | `//h1/following-sibling::p[1]`      |        |
| 获取兄弟节点（上一个）                | `tag.find_previous_sibling("p")`               | `//p/preceding-sibling::h1[1]`      |        |
| 获取父节点                      | `tag.parent`                                   | `//span/parent::div`                |        |
| 获取祖先节点                     | `tag.find_parent("div")`                       | `//span/ancestor::div`              |        |
| 多条件查询                      | `soup.find("a", {"id":"next", "class":"btn"})` | `//a[@id="next" and @class="btn"]`  |        |
| 多路径查询                      | `soup.select("h1,h2")`                         | \`//h1                              | //h2\` |


**总结**

bs4 → 偏向 Pythonic，API 简单，语法接近 CSS 选择器。  

XPath → 功能更强大，支持 复杂逻辑和位置运算，适合需要精确控制的场景。  

一般爬虫开发：

- 简单页面 → bs4 更快写

- 复杂结构（如需要 last()、兄弟节点条件、复杂逻辑） → XPath 更强大