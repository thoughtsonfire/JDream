# pyquery

> [!NOTE]pyquery 是 Python 的第三方库
> 根据 css 选择器获取元素  
> [api 文档地址](https://pyquery.readthedocs.io/en/latest/api.html)

## 安装与导入

```bash
pip3 install pyquery
```

```bash
from pyquery import PyQuery as pq
```

## 初始化文档

```py
# 从 HTML 字符串
html = '<div id="main"><a href="https://a.com">A</a></div>'
doc = pq(html)

# 从 URL
doc = pq(url="https://example.com")

# 从本地文件
doc = pq(filename="index.html")

# 从已有的 lxml 对象
from lxml import etree
root = etree.HTML("<p>Hello</p>")
doc = pq(root)
```

## 选择器语法（与 jQuery 一样）

```py
doc('#main')        # ID 选择器
doc('.title')       # 类选择器
doc('div a')        # 后代选择器
doc('a:first')      # 伪类选择器
doc('a[href^="http"]')  # 属性选择器
```

## 获取元素内容

```py
a = doc('a')

a.text()         # 文本内容：'A'
a.html()         # 内部HTML：'A'
a.attr('href')   # 属性值：'https://a.com'

# 多个节点
for i in doc('a').items():
    print(i.text(), i.attr('href'))
a = doc('a')

a.text()         # 文本内容：'A'
a.html()         # 内部HTML：'A'
a.attr('href')   # 属性值：'https://a.com'

# 多个节点
for i in doc('a').items():
    print(i.text(), i.attr('href'))
```

## 节点操作

```py
# 添加/修改属性
a.attr('target', '_blank')

# 添加 class
a.add_class('active')

# 移除 class
a.remove_class('old')

# 删除节点
doc('span').remove()

# 替换内容
a.html('新的内容')
a.text('新的文本')
```

## 遍历节点

```py
doc('div').children()         # 子节点
doc('div').children('a')      # 指定类型子节点
doc('div').parent()           # 父节点
doc('a').siblings()           # 兄弟节点
doc('a').next()               # 下一个兄弟节点
doc('a').prev()               # 上一个兄弟节点
```

## 过滤筛选

```py
doc('a').eq(0)        # 选第一个
doc('a').filter('.btn')  # 筛选指定class
doc('a').not_('.disabled') # 过滤不包含
doc('a').is_('.active')   # 判断是否匹配
```

## 查找与提取

```py
doc.find('a')             # 查找所有 a
doc('div').find('p')      # 在指定元素下查找
doc('div').children('p')  # 只查直接子节点
```

## 修改 DOM 结构

```py
doc('div').append('<p>追加</p>')
doc('div').prepend('<h1>前置</h1>')
doc('div').after('<hr>')     # 在后面插入
doc('div').before('<hr>')    # 在前面插入
```

## 属性与数据操作

```py
el = doc('a')
el.attr('href')          # 获取属性
el.attr('href', '/new')  # 修改属性
el.remove_attr('href')   # 删除属性

# data-* 属性
el.data('id')            # 获取 data-id
```

## 实用技巧

```py
# 提取纯文本（去掉标签）
doc.text()

# 判断某个元素是否存在
bool(doc('a'))

# 获取 HTML 片段
str(doc('div'))
```
