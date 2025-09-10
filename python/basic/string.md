# Python 字符串  

## 字符串字面量  

python 中的字符串字面量由单引号或双引号括起。  

`'hello'` 等同于 `"hello"`。  

您可以使用 `print()` 函数显示字符串字面量：  

```py
print("Hello")
print('Hello')

# Hello
# Hello
```

## 用字符串向变量赋值  

通过使用变量名称后跟等号和字符串，可以把字符串赋值给变量：  

**实例**  

```py
a = "Hello"
print(a)

# Hello
```

## 多行字符串  

您可以使用三个引号将多行字符串赋值给变量：  

**实例**  

您可以使用三个双引号：  

```py
a = """Python is a widely used general-purpose, high level programming language. 
It was initially designed by Guido van Rossum in 1991 
and developed by Python Software Foundation. 
It was mainly developed for emphasis on code readability, 
and its syntax allows programmers to express concepts in fewer lines of code."""
print(a)

# Python is a widely used general-purpose, high level programming language. 
# It was initially designed by Guido van Rossum in 1991 
# and developed by Python Software Foundation. 
# It was mainly developed for emphasis on code readability, 
# and its syntax allows programmers to express concepts in fewer lines of code.
```

或三个单引号：  

```py
a = '''Python is a widely used general-purpose, high level programming language. 
It was initially designed by Guido van Rossum in 1991 
and developed by Python Software Foundation. 
It was mainly developed for emphasis on code readability, 
and its syntax allows programmers to express concepts in fewer lines of code.'''
print(a)

# Python is a widely used general-purpose, high level programming language. 
# It was initially designed by Guido van Rossum in 1991 
# and developed by Python Software Foundation. 
# It was mainly developed for emphasis on code readability, 
# and its syntax allows programmers to express concepts in fewer lines of code.
```

> 注释：在结果中，换行符插入与代码中相同的位置。  


## 字符串是数组  

像许多其他流行的编程语言一样，Python 中的字符串是表示 unicode 字符的字节数组。  

但是，Python 没有字符数据类型，单个字符就是长度为 1 的字符串。  

方括号可用于访问字符串的元素。  

**实例**  

获取位置 1 处的字符（请记住第一个字符的位置为 0）： 

```py
a = "Hello, World!"
print(a[1])

# e
```

**裁切**  

您可以使用裁切语法返回一定范围的字符。  

指定开始索引和结束索引，以冒号分隔，以返回字符串的一部分。  

**实例**  

获取从位置 2 到位置 5（不包括）的字符：  

```py
b = "Hello, World!"
print(b[2:5])

# llo
```

**负的索引**  

使用负索引从字符串末尾开始切片：  

**实例**  

获取从位置 5 到位置 1 的字符，从字符串末尾开始计数：

```py
b = "Hello, World!"
print(b[-5:-2])

# orl
```

**字符串长度**  

如需获取字符串的长度，请使用 len() 函数。

**实例**  

len() 函数返回字符串的长度：  

```py
a = "Hello, World!"
print(len(a))

# 13
```

## 检查字符串  

如需检查字符串中是否存在特定短语或字符，我们可以使用 `in` 或 `not in` 关键字。  

**实例**  

检查以下文本中是否存在短语 "ina"：  

```py
txt = "China is a great country"
x = "ina" in txt
print(x)

# True
```

```py
txt = "China is a great country"
x = "ain" not in txt
print(x) 

# True
```

## 字符串方法  

Python 有一组可以在字符串上使用的内建方法。

>注释：所有字符串方法都返回新值。它们不会更改原始字符串。  

方法|	描述
:-:|:-:
capitalize()|	把首字符转换为大写。
casefold()|	把字符串转换为小写。
center()|	返回居中的字符串。
count()|	返回指定值在字符串中出现的次数。
encode()|	返回字符串的编码版本。
endswith()|	如果字符串以指定值结尾，则返回 true。
expandtabs()|	设置字符串的 tab 尺寸。
find()|	在字符串中搜索指定的值并返回它被找到的位置。
format()|	格式化字符串中的指定值。
format_map()|	格式化字符串中的指定值。
index()|	在字符串中搜索指定的值并返回它被找到的位置。
isalnum()|	如果字符串中的所有字符都是字母数字，则返回 True。
isalpha()|	如果字符串中的所有字符都在字母表中，则返回 True。
isdecimal()|	如果字符串中的所有字符都是小数，则返回 True。
isdigit()|	如果字符串中的所有字符都是数字，则返回 True。
isidentifier()|	如果字符串是标识符，则返回 True。
islower()|	如果字符串中的所有字符都是小写，则返回 True。
isnumeric()|	如果字符串中的所有字符都是数，则返回 True。
isprintable()|	如果字符串中的所有字符都是可打印的，则返回 True。
isspace()|	如果字符串中的所有字符都是空白字符，则返回 True。
istitle()|	如果字符串遵循标题规则，则返回 True。
isupper()|	如果字符串中的所有字符都是大写，则返回 True。
join()|	把可迭代对象的元素连接到字符串的末尾。
ljust()|	返回字符串的左对齐版本。
lower()|	把字符串转换为小写。
lstrip()|	返回字符串的左修剪版本。
maketrans()|	返回在转换中使用的转换表。
partition()|	返回元组，其中的字符串被分为三部分。
replace()|	返回字符串，其中指定的值被替换为指定的值。
rfind()|	在字符串中搜索指定的值，并返回它被找到的最后位置。
rindex()|	在字符串中搜索指定的值，并返回它被找到的最后位置。
rjust()	|返回字符串的右对齐版本。
rpartition()|	返回元组，其中字符串分为三部分。
rsplit()|	在指定的分隔符处拆分字符串，并返回列表。
rstrip()|	返回字符串的右边修剪版本。
split()	|在指定的分隔符处拆分字符串，并返回列表。
splitlines()|	在换行符处拆分字符串并返回列表。
startswith()|	如果以指定值开头的字符串，则返回 true。
strip()|	返回字符串的剪裁版本。
swapcase()|	切换大小写，小写成为大写，反之亦然。
title()	|把每个单词的首字符转换为大写。
translate()	|返回被转换的字符串。
upper()	|把字符串转换为大写。
zfill()	|在字符串的开头填充指定数量的 0 值。
  

  

## capitalize()  

capitalize() 方法返回一个字符串，其中第一个字符为大写。  

🔍 **语法**  

`string.capitalize()`  

🔥 **参数**  

无参数。  

🔶 **示例**  

:::: details 例子1、2
::: code-group
```py [例子1]
# 大写这句话的第一个字母：

txt = "hello, and welcome to my world."

x = txt.capitalize()

print (x)

# Hello, and welcome to my world.
```

```py [例子 2]
# 请看第一个字符是数字时会发生什么：

txt = "63 is my age."

x = txt.capitalize()

print (x)

# 63 is my age.
```
:::
::::


## casefold()  

`casefold()` 方法返回一个字符串，其中所有字符均为小写。  

此方法与 `lower()` 方法相似，但是 `casefold()` 方法更强大，更具攻击性，这意味着它将更多字符转换为小写字母，并且在比较两个用 `casefold()` 方法转换的字符串时会找到更多匹配项。    

🔍 **语法**   

`string.casefold()`  

🔥 **参数**  

无参数。  

🔶 **示例**  

:::details 例子
```py
# 将字符串设为小写：

txt = "Hello, And Welcome To My World!"

x = txt.casefold()

print(x)

# hello, and welcome to my world!
```
:::


## center()  

`center()` 方法将使用指定的字符（默认为空格）作为填充字符使字符串居中对齐。  

🔍 **语法**  

`string.center(length, character)`  

🔥 **参数**  


参数|	描述
:-:|:-:
length|	必需。所返回字符串的长度。
character|	可选。填补两侧缺失空间的字符。默认是 " "（空格）。

🔶 **示例**  

::::details 例子1、2
:::code-group

```py [例子 1]
# 打印单词 "banana"，占用 20 个字符，并使 "banana" 居中：

txt = "banana"

x = txt.center(20)

print(x)

#    banana       
```

```py [例子 2]
# 使用字母 "O" 作为填充字符：

txt = "banana"

x = txt.center(20, "O")

print(x)    

# OOOOOOObananaOOOOOOO
```
:::
::::  


## count()  

`count()` 方法返回指定值在字符串中出现的次数。  

🔍 **语法**   

`string.count(value, start, end)`  

🔥 **参数**  

参数|	描述
:-:|:-:
value|	必需。字符串。要检索的字符串。
start|	可选。整数。开始检索的位置。默认是 0。
end|	可选。整数。结束检索的位置。默认是字符串的结尾。

🔶 **示例**  

::::details 例子1、2
:::code-group

```py [例子 1]
# 返回值 "apple" 在字符串中出现的次数：

txt = "I love apples, apple are my favorite fruit"

x = txt.count("apple")

print(x)

# 2
```

```py [例子 2]
# 从位置 10 到 24 进行检索：

txt = "I love apples, apple are my favorite fruit"

x = txt.count("apple", 10, 24)

print(x)

# 1
```

:::
::::  


## encode()  

encode() 方法使用指定的编码对字符串进行编码。如果未指定编码，则将使用 UTF-8。  

🔍 **语法**  

`string.encode(encoding=encoding, errors=errors)`  

🔥 **参数**  

参数|	描述
:-:|:-
encoding|	可选。字符串。规定要使用的编码。默认是 UTF-8。
errors	| 可选。字符串。规定错误方法。合法值是：<br>'backslashreplace' - 使用反斜杠代替无法编码的字符<br>'ignore' - 忽略无法编码的字符<br>'namereplace' - 用解释字符的文本替换字符<br>'strict' - 默认值，失败时引发错误<br>'replace' - 用问号替换字符<br>'xmlcharrefreplace' - 用 xml 字符替换字符

🔶 **示例**  

::::details 例子1、2
:::code-group

```py [例子 1]
# 对字符串进行 UTF-8 编码：

txt = "My name is Ståle"

x = txt.encode()

print(x)   

# b'My name is St\xc3\xa5le'
```

```py [例子 2]
# 这些示例使用 ascii 编码和无法编码的字符，展示带有不同错误的结果：

txt = "My name is Ståle"

print(txt.encode(encoding="ascii",errors="backslashreplace"))
print(txt.encode(encoding="ascii",errors="ignore"))
print(txt.encode(encoding="ascii",errors="namereplace"))
print(txt.encode(encoding="ascii",errors="replace"))
print(txt.encode(encoding="ascii",errors="xmlcharrefreplace"))
print(txt.encode(encoding="ascii",errors="strict"))

# b'My name is St\\xe5le'
# b'My name is Stle'
# b'My name is St\\N{LATIN SMALL LETTER A WITH RING ABOVE}le'
# b'My name is St?le'
# b'My name is St&#229;le'
# Traceback (most recent call last):
#   <module>
#     print(txt.encode(encoding="ascii",errors="strict"))
#           ~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
# UnicodeEncodeError: 'ascii' codec can't encode character '\xe5' in position 13: ordinal not in range(128)
```

:::
::::


## endswith()  

如果字符串以指定值结尾，则 endswith() 方法返回 True，否则返回 False。  

🔍 **语法**  

`string.endswith(value, start, end)`  

🔥 **参数**  

参数|	描述
:-:|:-
value|	必需。检查字符串是否以之结尾的值。
start|	可选。整数。规定从哪个位置开始检索。
end|	可选。整数。规定从哪个位置结束检索。

🔶 **示例**  

::::details 例子1、2、3
:::code-group

```py [例子 1]
# 检查字符串是否以标点符号 (.) 结尾：

txt = "Hello, welcome to my world."

x = txt.endswith(".")

print(x)

# True
```

```py [例子 2]
# 检查字符串是否以短语 "my world." 结尾：

txt = "Hello, welcome to my world."

x = txt.endswith("my world.")

print(x)

# True
```

```py [例子 3]
# 检查位置 5 至 11 是否以短语 "my world." 结尾：

txt = "Hello, welcome to my world."

x = txt.endswith("my world.", 5, 11)

print(x)

# False
```

:::
::::

## expandtabs()  

expandtabs() 方法将制表符的大小设置为指定的空格数。  

🔍 **语法**  

`string.exandtabs(tabsize)`  

🔥 **参数**  

参数|	描述
:-:|:-
tabsize|	可选。规定制表符大小的数字。默认的 tabsize 是 8。

🔶 **示例**  

::::details 例子1、2
:::code-group

```py [例子 1]
# 将制表符大小设置为 2 个空格：

txt = "H\te\tl\tl\to"

x =  txt.expandtabs(2)

print(x)

# H e l l o
```

```py [例子 2]
# 请看看不同制表符大小的结果：

txt = "H\te\tl\tl\to"

print(txt)
print(txt.expandtabs())
print(txt.expandtabs(2))
print(txt.expandtabs(4))
print(txt.expandtabs(10))

# H	e	l	l	o
# H       e       l       l       o
# H e l l o
# H   e   l   l   o
# H         e         l         l         o
```
:::
::::


## find()  

find() 方法查找指定值的首次出现。  

如果找不到该值，则 find() 方法返回 -1。  

find() 方法与 index() 方法几乎相同，唯一的区别是，如果找不到该值，index() 方法将引发异常。（请看下面的例子）  


🔍 **语法**  

`string.find(value, start, end)`  

🔥 **参数**  

参数|	描述
:-:|:-
value|	必需。要检索的值。
start|	可选。开始检索的位置。默认是 0。
end|	可选。结束检索的位置。默认是字符串的结尾。

🔶 **示例**  

::::details 例子1、2、3、4
:::code-group

```py [例子 1]
# 单词 "welcome" 在文本中的什么位置？

txt = "Hello, welcome to my world."

x = txt.find("welcome")

print(x)

# 7
```

```py [例子 2]
# 字母 "e" 在文本总首次出现的位置：

txt = "Hello, welcome to my world."

x = txt.find("e")

print(x)

# 1
```

```py [例子 3]
# 如果只搜索位置 5 到 10 时，字母 "e" 在文本总首次出现的位置：

txt = "Hello, welcome to my world."

x = txt.find("e", 5, 10)

print(x)

# 8
```

```py [例子 4]
# 如果找不到该值，则 find() 方法返回 -1，但是 index() 方法将引发异常：

txt = "Hello, welcome to my world."

print(txt.find("q"))
print(txt.index("q"))

# -1
# Traceback (most recent call last):
#  in <module>
#     print(txt.index("q"))
#           ~~~~~~~~~^^^^^
# ValueError: substring not found
```
:::
::::

## format()  

format() 方法格式化指定的值，并将其插入字符串的占位符内。  

占位符使用大括号 {} 定义。请在下面的“占位符”部分中了解有关占位符的更多信息。  

format() 方法返回格式化的字符串。  

🔍 **语法**  

`string.format(value1, value2...)`  

🔥 **参数**  

参数|	描述
:-:|:-
value1, value2...|必需。一个或多个应该格式化并插入字符串的值。<br>值可以是数字，用于指定要删除的元素的位置。<br>这些值可以是用逗号分隔的值列表、键=值列表，或两者的组合。<br>这些值可以是任何数据类型。  

🔶 **示例**  

:::details 例子
```py
# 将价格插入占位符内，价格应为定点，两位十进制格式：

txt = "For only {price:.2f} dollars!"
print(txt.format(price = 49))

# For only 49.00 dollars!
```
:::

**占位符**  

可以使用命名索引 {price}、编号索引{0}、甚至空的占位符 {} 来标识占位符。  

- 实例

```py
# 使用不同的占位符值：

txt1 = "My name is {fname}, I'am {age}".format(fname = "Bill", age = 64)
txt2 = "My name is {0}, I'am {1}".format("Bill",64)
txt3 = "My name is {}, I'am {}".format("Bill",64)

print(txt1)
print(txt2)
print(txt3)

# My name is Bill, I'am 64
# My name is Bill, I'am 64
# My name is Bill, I'am 64
```

| | |
:-:|:-
:<	|	左对齐结果（在可用空间内）
:>	|	右对齐结果（在可用空间内）
:^	|	居中对齐结果（在可用空间内）
:=	|	将标志放置在最左侧
:+	|	使用加号指示结果是正数还是负数
:-	|	负号仅用于负值
:	|	使用空格在正数之前插入一个多余的空格（在负数之前使用减号）
:,	|	使用逗号作为千位分隔符
:_	|	使用下划线作为千位分隔符
:b	|	二进制格式
:c	|	将值转换为相应的 unicode 字符
:d	|	十进制格式
:e	|	科学格式，带有小写字母 E
:E	|	科学格式，带有大写字母 E
:f	|	定点数字格式
:F	|	定点数字格式，以大写形式显示（将 inf 和 nan 显示为 INF 和 NAN）
:g	|	通用格式
:G	|	通用格式（将大写 E 用作科学计数法）
`:o`	|	八进制格式
:x	|	十六进制格式，小写
:X	|	十六进制格式，大写
:n	|	数字格式
:%	|	百分比格式


## index()  

index() 方法查找指定值的首次出现。  

如果找不到该值，index() 方法将引发异常。  

index() 方法与 find() 方法几乎相同，唯一的区别是，如果找不到该值，则 find() 方法将返回 -1。（请看下面的例子）  

🔍 **语法**  

`string.index(value, start, end)`  

🔥 **参数**  

参数|	描述
:-:|:-
value|	必需。要检索的值。
start|	可选。在哪里开始检索。默认是 0。
end|	可选。在哪里结束检索。默认是字符串的末尾。  

🔶 **示例**  

::::details 例子1、2、3、4
:::code-group

```py [例子 1]
# 文字中 "welcome" 一词在哪里？

txt = "Hello, welcome to my world."

x = txt.index("welcome")

print(x)

# 7
```

```py [例子 2]
# 字母 "e" 在文本中首次出现在哪里？

txt = "Hello, welcome to my world."

x = txt.index("e")

print(x)

# 1
```

```py [例子 3]
# 如果只在位置 5 和 10 之间搜索时，字母 "e"首次首先在哪里？

txt = "Hello, welcome to my world."

x = txt.index("e", 5, 10)

print(x)

# 8
```

```py [例子 4]
# 如果找不到该值，则 find() 方法返回 -1，但是 index() 方法将引发异常：

txt = "Hello, welcome to my world."

print(txt.find("q"))
print(txt.index("q"))

# -1
# Traceback (most recent call last):
#  in <module>
#     print(txt.index("q"))
#           ~~~~~~~~~^^^^^
# ValueError: substring not found
```

:::
::::

## isalnum()

如果所有字符均为字母数字，即字母（a-z）和数字（0-9），则 isalnum() 方法返回 True。  

非字母数字的例子：(space)!#%&? 等等。  

🔍 **语法**  

`string.isalnum()`  

🔥 **参数**  

无参数.  

c

::::details 例子1、2
:::code-group

```py [例子 1]
# 检查文本中的所有字符是否都是字母数字：

txt = "Company12"

x = txt.isalnum()

print(x)

# True
```

```py [例子 2]
# 检查文本中的所有字符是否都是字母数字：

txt = "Company 12"

x = txt.isalnum()

print(x)

# False
```

:::
::::


## isalpha()

如果所有字符都是字母（a-z），则 isalpha() 方法将返回 True。  

非字母的字符例子：(space)!#%&? 等等。  

🔍 **语法**  

`string.isalpha()`  

🔥 **参数**  

无参数。  

🔶 **示例**  

::::details 例子1、2
:::code-group

```py [例子 1]
# 检查文本中的所有字符是否都是字母：

txt = "CompanyX"

x = txt.isalpha()

print(x)

# True
```

```py [例子 2]
# 检查文本中的所有字符是否都是字母：

txt = "Company10"

x = txt.isalpha()

print(x)

# False
```

:::
::::

## isdecimal()

如果所有字符均为小数（0-9），则 isdecimal() 方法将返回 True。  

此方法用于 unicode 对象。  

🔍 **语法**  

`string.isdecimal()`  

🔥 **参数**  

无参数。  

🔶 **示例**  

::::details 例子1、2
:::code-group

```py [例子 1]
# 检查 unicode 对象中的所有字符是否都是小数：

txt = "\u0033" #unicode for 3

x = txt.isdecimal()

print(x)

# True
```

```py [例子 2]
# 检查 unicode 中的所有字符是否都是小数：

a = "\u0030" #unicode for 0
b = "\u0047" #unicode for G

print(a.isdecimal())
print(b.isdecimal())

# True
# False
```

:::
::::

## isdigit()  

如果所有字符都是数字，则 isdigit() 方法将返回 True，否则返回 False。  

指数（例如²）也被视作数字。  

🔍 **语法**  

`string.isdigit()`  

🔥 **参数**  

无参数。  

🔶 **示例**  

::::details 例子1、2
:::code-group

```py [例子 1]
# 检查文本中的所有字符是否都是数字：

txt = "50800"

x = txt.isdigit()

print(x)

# True
```

```py [例子 2]
# 检查文本中的所有字符是否都是字母：

a = "\u0030" #unicode for 0
b = "\u00B2" #unicode for ²

print(a.isdigit())
print(b.isdigit())

# True
# True
```
:::
::::  


##  isidentifier()  

如果字符串是有效标识符，则 isidentifier() 方法返回 True，否则返回 False。  

如果字符串仅包含字母数字字母（a-z）和（0-9）或下划线（_），则该字符串被视为有效标识符。有效的标识符不能以数字开头或包含任何空格。  

🔍 **语法**  

`string.isidentifier()`  

🔥 **参数**  

无参数。  

🔶 **示例**  

::::details 例子1、2
:::code-group

```py [例子 1]
# 检查字符串是否是有效标识符：  

txt = "Demo"

x = txt.isidentifier()

print(x)

# True
```

```py [例子 2]
a = "MyFolder"
b = "Demo002"
c = "2bring"
d = "my demo"

print(a.isidentifier())
print(b.isidentifier())
print(c.isidentifier())
print(d.isidentifier())

# True
# True
# False
# False
```
:::
::::


## islower() 

如果所有字符均为小写，则 islower() 方法返回 True，否则返回 False。  

不检查数字、符号和空格，仅检查字母字符。  

🔍 **语法**  

`string.islower()`  

🔥 **参数**  

无参数.  

🔶 **示例**  

::::details 例子1、2
:::code-group

```py [例子 1]
# 检查文本中所有字符是否都小写：

txt = "hello world!"

x = txt.islower()

print(x)

# True
```

```py [例子 2]
# 检查文本中所有字符是否都小写：

a = "Hello world!"
b = "hello 123"
c = "mynameisPeter"

print(a.islower())
print(b.islower())
print(c.islower())

# False
# True
# False
```

:::
::::


## isnumeric() 

如果所有字符均为数字（0-9），则 isnumeric() 方法返回 True，否则返回 False。  

指数（比如 ² 和 ¾）也被视为数字值。  

🔍 **语法**  

`string.isnumeric()`  

🔥 **参数**  

无参数.  

🔶 **示例**  

::::details 例子1、2
:::code-group

```py [例子 1]
# 检查文本中的所有字符是否都是数字：

txt = "565543"

x = txt.isnumeric()

print(x)

# True
```

```py [例子 2]
# 检查字符是否为数字：

a = "\u0030" #unicode for 0
b = "\u00B2" #unicode for ²
c = "10km2"

print(a.isnumeric())
print(b.isnumeric())
print(c.isnumeric())

# True
# True
# False
```

:::
::::


## isprintable()  

如果所有字符都是可打印的，则 isprintable() 方法返回 True，否则返回 False。  

不可打印的字符可以是回车和换行符。  

🔍 **语法**  

`string.isprintable()`  

🔥 **参数**  

无参数.  

🔶 **示例**  

::::details 例子1、2
:::code-group

```py [例子 1]
# 检查文本中的所有字符是否可打印：
txt = "Hello! Are you #1?"

x = txt.isprintable()

print(x)

# True
```

```py [例子 2]
# 检查文本中的所有字符是否可打印：
txt = "Hello!\nAre you #1?"

x = txt.isprintable()

print(x)

# False
```

:::
::::


## isspace() 

如果字符串中的所有字符都是空格，则 isspace() 方法将返回 True，否则返回 False。  

🔍 **语法**  

`string.isspace()`  

🔥 **参数**  

无参数.  

🔶 **示例**  

::::details 例子1、2
:::code-group

```py [例子 1]
# 检查文本中的所有字符是否都是空格：

txt = "   "

x = txt.isspace()

print(x)

# True
```

```py [例子 2]
# 检查文本中的所有字符是否都是空格：

txt = "   s   "

x = txt.isspace()

print(x)

# False
```

:::
::::
