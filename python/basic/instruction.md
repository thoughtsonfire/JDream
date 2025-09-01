# 基础语法

>[!TIP] 
>和其他语言基础语法差不多  


## print  

- 输出/打印

```py
    print("hello word")
```

## 字符串连接符  

### 字符串拼接  

```py
    print("hello"+" "+"word")

    # hello word
```

### 单双引号转义  

```py
    print('He said "good!"')

    # He said "good!"
```

### 换行  

- `\n` 表示换行  

```py
    print("Hello!\nHi!")
    # Hello!
    # Hi!
```

### 三引号跨行字符串

- 三个连在一起单引号或双引号。 

```py
    print("""
    梦游天姥吟留别
    李白李白〔唐代〕

    海客谈瀛洲，烟涛微茫信难求；
    越人语天姥，云霞明灭或可睹。
    天姥连天向天横，势拔五岳掩赤城。
    天台四万八千丈，对此欲倒东南倾。(四万 一作：一万)

    我欲因之梦吴越，一夜飞度镜湖月。
    湖月照我影，送我至剡溪。
    谢公宿处今尚在，渌水荡漾清猿啼。
    脚著谢公屐，身登青云梯。
    半壁见海日，空中闻天鸡。
    千岩万转路不定，迷花倚石忽已暝。
    熊咆龙吟殷岩泉，栗深林兮惊层巅。
    云青青兮欲雨，水澹澹兮生烟。
    列缺霹雳，丘峦崩摧。
    洞天石扉，訇然中开。
    青冥浩荡不见底，日月照耀金银台。
    霓为衣兮风为马，云之君兮纷纷而来下。
    虎鼓瑟兮鸾回车，仙之人兮列如麻。
    忽魂悸以魄动，恍惊起而长嗟。
    惟觉时之枕席，失向来之烟霞。

    世间行乐亦如此，古来万事东流水。
    别君去兮何时还？且放白鹿青崖间，须行即骑访名山。
    安能摧眉折腰事权贵，使我不得开心颜？
    """)

    # 梦游天姥吟留别
    # 李白李白〔唐代〕

    # 海客谈瀛洲，烟涛微茫信难求；
    # 越人语天姥，云霞明灭或可睹。
    # 天姥连天向天横，势拔五岳掩赤城。
    # 天台四万八千丈，对此欲倒东南倾。(四万 一作：一万)

    # 我欲因之梦吴越，一夜飞度镜湖月。
    # 湖月照我影，送我至剡溪。
    # 谢公宿处今尚在，渌水荡漾清猿啼。
    # 脚著谢公屐，身登青云梯。
    # 半壁见海日，空中闻天鸡。
    # 千岩万转路不定，迷花倚石忽已暝。
    # 熊咆龙吟殷岩泉，栗深林兮惊层巅。
    # 云青青兮欲雨，水澹澹兮生烟。
    # 列缺霹雳，丘峦崩摧。
    # 洞天石扉，訇然中开。
    # 青冥浩荡不见底，日月照耀金银台。
    # 霓为衣兮风为马，云之君兮纷纷而来下。
    # 虎鼓瑟兮鸾回车，仙之人兮列如麻。
    # 忽魂悸以魄动，恍惊起而长嗟。
    # 惟觉时之枕席，失向来之烟霞。

    # 世间行乐亦如此，古来万事东流水。
    # 别君去兮何时还？且放白鹿青崖间，须行即骑访名山。
    # 安能摧眉折腰事权贵，使我不得开心颜？

```

## 变量  

> [!NOTE] 变量
> 变量名称规则：字母、数字、下划线组成；  
> 不能有除了下划线以外的符号；
> 不能有空格；    
> 不能以数字开头；  
> 不能用双引号包括；  
> 变量区分大小写；  
> 不能使用专用关键字。  

>变量命名建议：不要使用拼音，使用英文单词组命名，`Python3.0`版本后支持中文变量，但是不建议使用中文变量，可能存在乱码。

- Python变量命名约定俗成使用下划线命名法。
1. 字母全部小写。

2. 不同单词用下划线分隔。

例如：`user_age`、`user_gender`  

变量赋值操作用单等号，例如 `my_love = 123456789`    

代码是一行一行执行的，故使用变量时，变量必须在此之前定义，否则会出错。  


## 数据类型  

> Python语言在定义变量时，不需要指定变量的数据类型，Python程序会根据变量值，自动确定变量类型。  

### 字符串 str  

-   字符串特点是被双引号或单引号包裹，例如："字符串"  '字符串'

### 整数 int、浮点数 float

```md
6     -32         整数 int

6.0    10.07      浮点数 float
```

### 布尔类型 bool  

```md
真           假

True         False   （区分大小写）
```

### 空值类型 NoneType  

```md
只有一种值：None
```

```md
表示完全没有值

None 不是0，不是空字符串””，也不是False。
```

### input——用户输入指令  

- 执行input指令时，读取用户输入的数据。

```py
user_weight = float(input("请输入体重（单位kg）:"))
user_height = float(input("请输入身高（单位m）:"))
user_BMI = user_weight/user_height*2
print("你的BMI为："+ str(user_BMI))

# 请输入体重（单位kg）:66
# 请输入身高（单位m）:1.8
# 你的BMI为：73.33333333333333

# 字符串连接的类型只能是字符串
```

## 条件判断  

```md
== 比较运算符 等于。

!= 比较运算符 不等于。
```

```py
num = 30

if num>0:
    if num>20:
        print("num>20")
    elif num>10:
        print("num>10")
    else :
        print("num<10")
else:
    print("num<0")
```
>Python 是通过缩进（通常是空格或制表符）来判断代码块的层级结构。  
>Python 不使用传统的花括号 {} 来表示代码块，而是依赖缩进来明确区分不同的代码层级。  
>4个空格。  
>许多 Python 编辑器和 IDE（如 PyCharm、VS Code 等）可以自动转换 Tab 为 4 个空格。

>对于代码压缩或打包，Python 编译器会自动处理这些空格的语法作用，空格本身并不会浪费资源。编译器会根据语法规则判断哪些空格用于层级缩进，哪些是冗余的空格。实际上，空格和缩进的字符在代码执行时并不参与运算，最终编译后的字节码只会保存必要的结构信息。  

## 逻辑运算符  

```md
与（and）  所有条件为True，才会返回True；只要有一个为False，就为False。

或（or）   只要有一个条件为True，就会返回True；所有条件为False，才为False。

非（not）  操作对象为True，则返回Flase；操作对象是Flase，则返回True。
```

> 优先级顺序  not  ——>  and  ——>  or  

## 列表 []  

```py
list = ["张三"]
list.append(15)
print(list)
list.remove("张三")
print(list)

# ['张三', 15]
# [15]
```

## 元组 tuple  

>元组 特点：有序，可重复，不可扩展

- 不可变但又很像列表的数据结构。

- 元组内可放多个元素。

>列表用方括号；元组用圆括号()。

```py
example_tuple = (1,"2",3.5)
print(example_tuple)

# (1, '2', 3.5)
```

## 集合 set  

```py
# 使用 set() 函数创建空集合
my_set = set()

# 使用花括号创建集合
my_set = {1, 2, 3, 4}
```

1. 不重复：集合中的元素是唯一的，重复的元素会被自动去除。
2. 无序：集合中的元素没有固定顺序，因此无法通过索引访问。


## 字典 dict  

```py
# 创建字典
my_dict = {'name': 'Alice', 'age': 25, 'city': 'New York'}

# 创建空字典
empty_dict = {}

# 使用 dict() 函数创建字典
another_dict = dict(name='Bob', age=30)
```

1. 键值对：字典通过键（key）来存取值（value），每个键在字典中是唯一的。
2. 键必须不可变：字典的键必须是不可变的类型（例如字符串、数字、元组），而值可以是任意类型。
3. 无序（从 3.7 开始，插入顺序被保留）：字典中的元素是无序的，直到 Python 3.7 版本，插入顺序才被保证。
4. 高效查找：字典基于哈希表实现，查找、添加、删除操作平均时间复杂度为 O(1)。  

## for循环  

- for 循环广泛用于遍历各种可迭代对象。
- 可以结合 range() 生成数字序列，控制循环次数。
- 遍历字典时可以使用 items(), keys() 或 values() 方法来访问键值对。  

```py
person = {'name': 'Alice', 'age': 25, 'city': 'New York'}

for key, value in person.items():
    print(key, ":", value)

```

- break 终止当前循环，,使程序跳出循环体。

- continue 结束当前循环剩余语句，继续下一轮循环

- pass 在Python中是一个空语句，什么都不做，占位语句，它的主要目的是为了保持程序结构的完整性。当你在编写代码时，可能只想先搭建起程序的整体逻辑结构，而暂时不去实现某些细节。在这种情况下，你可以使用pass语句来占位，这样就可以避免因为语句块为空而导致的语法错误。pass语句不会执行任何操作，它只是一个空白的语句块。


## range整数序列  

`range(5,10)`  

>第一个数字为起始值，第二个数字为结束值，注：结束值不在序列范围内。

```py
for i in range(5,10):
    print(i)

# 5
# 6
# 7
# 8
# 9
```

## while循环

```py
i = 0
range_num = range(1,10)

while i < len(range_num):
    print(range_num[i])
    i += 1

# 1
# 2
# 3
# 4
# 5
# 6
# 7
# 8
# 9

```

## format()格式化字符串

在 Python 中，`format()` 方法用于格式化字符串。它允许你在字符串中插入变量值或其他内容，并以指定的格式进行呈现。

**基本语法**

```python
"template string {}".format(value)
```

`{}` 是占位符，`format()` 方法用提供的值替换它们。你可以在字符串中放置多个占位符，并传递多个参数来填充它们。

示例 1：基础用法

```python
name = "Alice"
age = 25
print("My name is {} and I am {} years old.".format(name, age))
```
**输出：**
```
My name is Alice and I am 25 years old.
```

示例 2：位置参数

你可以通过位置参数来指定格式化字段的顺序：

```python
print("My name is {0} and I am {1} years old. {0} loves coding.".format(name, age))
```
**输出：**
```
My name is Alice and I am 25 years old. Alice loves coding.
```

在这个例子中，`{0}` 和 `{1}` 表示 `format()` 方法传入的参数的索引（从 0 开始），这样可以重复使用参数。

示例 3：关键字参数

你也可以通过关键字参数来格式化字符串，这样可以使代码更加清晰：

```python
print("My name is {name} and I am {age} years old.".format(name="Alice", age=25))
```
**输出：**
```
My name is Alice and I am 25 years old.
```

示例 4：数字格式化

你可以通过 `format()` 来控制数字的格式，比如指定小数点后几位、添加千位分隔符等：

```python
pi = 3.141592653589793
print("Pi to two decimal places: {:.2f}".format(pi))  # 保留两位小数
```
**输出：**
```
Pi to two decimal places: 3.14
```

示例 5：填充和对齐

`format()` 方法还支持文本的填充、对齐等操作。

- `<` 表示左对齐
- `>` 表示右对齐
- `^` 表示居中对齐
- `:` 用于设置宽度和填充字符

```python
# 左对齐
print("{:<10}".format("Hello"))  # 输出: 'Hello     '

# 右对齐
print("{:>10}".format("Hello"))  # 输出: '     Hello'

# 居中对齐
print("{:^10}".format("Hello"))  # 输出: '  Hello   '

# 填充字符
print("{:*^10}".format("Hello"))  # 输出: '**Hello***'
```

示例 6：数字填充和宽度

你可以指定数字的宽度，甚至是填充字符：

```python
number = 42
print("{:05d}".format(number))  # 输出: '00042' （用零填充，确保宽度为5）
```

示例 7：字典与 `format()`

如果你有一个字典，可以通过字典的键来进行格式化：

```python
person = {'name': 'Alice', 'age': 25}
print("Name: {name}, Age: {age}".format(**person))
```
**输出：**
```
Name: Alice, Age: 25
```

通过 `**person`，字典的键值对被解包并传递给 `format()` 方法。

**总结**

- `format()` 方法提供了灵活的字符串格式化功能。
- 支持位置参数、关键字参数以及不同的数据类型格式化。
- 允许对齐、填充、控制数字格式等，使得输出格式更加可定制。

在 Python 3.6 及之后版本中，f-string（格式化字符串字面量）提供了一种更简洁的替代方案，但 `format()` 仍然在许多场景中被广泛使用。  

## 函数 del

- 内置函数  

- 自定义函数 

```py
def fun():
    print("hello world")

fun()
```

## 引入模块  

```md
import 加上模块名      引入模块

需要使用模块的函数或变量的时候格式如下：

模块名.函数名

模块名.变量名
```

```py
import statistics

print(statistics.median([19, -5, 36]))

print(statistics.mean([19, -5, 36]))
```


>from 模块名 import 函数名,变量名         引入模块的某些函数或变量


```py
from statistics import median, mean

print(median([19, -5, 36]))

print(mean([19, -5, 36]))
```

>from 模块名 import *         引入模块的所有内容  

```py
from statistics import *

print(median([19, -5, 36]))

print(mean([19, -5, 36]))
```












