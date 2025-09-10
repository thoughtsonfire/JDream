# xPath

XPath 本身是一种 XML/HTML 文档路径语言，可以用来在 DOM 树里快速定位节点。  

一般是结合 lxml 或 parsel 这样的库来使用的。  

## 基础准备

安装库：  

```bash
pip install lxml parsel
```

常用：  

- lxml → 支持 xpath() 方法

- parsel（scrapy 内置） → 也支持 xpath()，语法几乎一样  

## 基本用法示例  

```py
from lxml import etree

html = """
<html>
  <body>
    <div class="content">
      <h1>标题</h1>
      <p>段落1</p>
      <p class="highlight">段落2</p>
      <a href="https://example.com">链接</a>
    </div>
  </body>
</html>
"""

tree = etree.HTML(html)

# 选取所有 <p> 标签
p_list = tree.xpath("//p/text()")
print(p_list)  # ['段落1', '段落2']

# 选取 class=highlight 的 p 标签
highlight = tree.xpath("//p[@class='highlight']/text()")
print(highlight)  # ['段落2']

# 选取 a 标签的 href 属性
link = tree.xpath("//a/@href")
print(link)  # ['https://example.com']

# 选取 h1 文本
title = tree.xpath("//h1/text()")[0]
print(title)  # 标题

```

## XPath 语法常用规则

| 表达式                          | 含义          |
| ---------------------------- | ----------- |
| `/`                          | 从根节点选取      |
| `//`                         | 从任意位置选取     |
| `.`                          | 当前节点        |
| `..`                         | 父节点         |
| `@属性名`                       | 获取属性        |
| `text()`                     | 获取文本        |
| `//tag`                      | 获取所有 tag 节点 |
| `//tag[@attr='x']`           | 通过属性筛选      |
| `//tag[contains(@attr,'x')]` | 属性部分匹配      |
| `//tag[position()=1]`        | 第一个子节点      |
| `//tag[last()]`              | 最后一个子节点     |


## 在爬虫里用  

如果用 requests + lxml：  

```py
import requests
from lxml import etree

url = "https://example.com"
resp = requests.get(url)
tree = etree.HTML(resp.text)

titles = tree.xpath("//h2/text()")
print(titles)
```

## XPath 常用语法速查表

### 基础定位  

| 语法      | 示例               | 含义         |
| ------- | ---------------- | ---------- |
| `/tag`  | `/html/body/div` | 从根节点逐级选取   |
| `//tag` | `//div`          | 在任意位置选取节点  |
| `.`     | `./a`            | 当前节点下的相对路径 |
| `..`    | `../div`         | 父节点        |

<br>

### 条件筛选  

| 语法                       | 示例                                  | 含义     |
| ------------------------ | ----------------------------------- | ------ |
| `@attr`                  | `//a/@href`                         | 选取属性值  |
| `[@attr='值']`            | `//div[@id='main']`                 | 属性等于   |
| `[@attr]`                | `//img[@src]`                       | 含有该属性  |
| `contains(@attr,'x')`    | `//div[contains(@class,'content')]` | 属性部分匹配 |
| `starts-with(@attr,'x')` | `//a[starts-with(@href,'http')]`    | 属性前缀匹配 |
| `text()`                 | `//p/text()`                        | 获取节点文本 |
| `contains(text(),'关键字')` | `//p[contains(text(),'Hello')]`     | 文本模糊匹配 |

<br>

### 位置相关  

| 语法               | 示例                   | 含义           |
| ---------------- | -------------------- | ------------ |
| `[1]`            | `//p[1]`             | 第一个 `<p>`    |
| `[last()]`       | `//p[last()]`        | 最后一个 `<p>`   |
| `[position()<3]` | `//li[position()<3]` | 前两个 `<li>`   |
| `[n]`            | `//ul/li[2]`         | 第 2 个 `<li>` |

<br>

### 逻辑运算  

| 语法    | 示例                                 | 含义   |
| ----- | ---------------------------------- | ---- |
| `and` | `//a[@class='btn' and @href]`      | 同时满足 |
| `or`  | `//a[@id='next' or @class='next']` | 满足其一 |

<br>

### 节点关系  

| 语法                    | 示例                          | 含义            |
| --------------------- | --------------------------- | ------------- |
| `/`                   | `//div/p`                   | 子节点           |
| `//`                  | `//div//span`               | 后代节点          |
| `following-sibling::` | `//h1/following-sibling::p` | h1 后的兄弟 `<p>` |
| `preceding-sibling::` | `//p/preceding-sibling::h1` | p 前的兄弟 `<h1>` |
| `parent::`            | `//span/parent::div`        | 父节点           |
| `ancestor::`          | `//span/ancestor::body`     | 所有祖先节点        |

<br>

### 常用技巧  

- 去掉空格文本：

```xpath
normalize-space(//p/text())
```

- 获取所有文本合并：  

```xpath
string(//div[@class="content"])
```

- 多路径匹配：

```xpath
//h1 | //h2
```

