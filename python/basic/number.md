# python 数字  


## Python 数字  

Python 中有三种数字类型：  

- int
- float
- complex

为变量赋值时，将创建数值类型的变量：  


如需验证 Python 中任何对象的类型，请使用 type() 函数：  

**实例**  

```py
x = 10   # int
y = 6.3  # float
z = 2j   # complex

print(type(x))
print(type(y))
print(type(z))

# <class 'int'>
# <class 'float'>
# <class 'complex'>
```


## Int  

Int 或整数是完整的数字，正数或负数，没有小数，长度不限。  

**实例**  

整数：  

```py
x = 10
y = 37216654545182186317
z = -465167846

print(type(x))
print(type(y))
print(type(z))

# <class 'int'>
# <class 'int'>
# <class 'int'>
```


## Float  

浮动或“浮点数”是包含小数的正数或负数。  

**实例**  

浮点：  

```py
x = 3.50
y = 2.0
z = -63.78

print(type(x))
print(type(y))
print(type(z))

# <class 'float'>
# <class 'float'>
# <class 'float'>
```

浮点数也可以是带有“e”的科学数字，表示 10 的幂。  

在 Python 中，`e` 和 `E` 只是书写风格上的区别，没有语义差别。  

**实例**  

浮点：  

```py
x = 27e4
y = 15E2
z = -49.8e100

print(type(x))
print(type(y))
print(type(z))

# <class 'float'>
# <class 'float'>
# <class 'float'>
```

## 复数(complex)  

复数用 "j" 作为虚部编写：

**实例**  

复数：  

```py
x = 2+3j
y = 7j
z = -7j

print(type(x))
print(type(y))
print(type(z))

# <class 'complex'>
# <class 'complex'>
# <class 'complex'>
```

## 类型转换  

您可以使用 `int()`、`float()` 和 `complex()` 方法从一种类型转换为另一种类型：  

**实例**  

从一种类型转换为另一种类型：  

```py
x = 10 # int
y = 6.3 # float
z = 1j # complex

# 把整数转换为浮点数

a = float(x)

# 把浮点数转换为整数

b = int(y)

# 把整数转换为复数：

c = complex(x)

print(a)
print(b)
print(c)

print(type(a))
print(type(b))
print(type(c))


# 10.0
# 6
# (10+0j)
# <class 'float'>
# <class 'int'>
# <class 'complex'>
```

> 注释：您无法将复数转换为其他数字类型。  


## 随机数  

Python 没有 random() 函数来创建随机数，但 Python 有一个名为 random 的内置模块，可用于生成随机数：  

**实例**  

导入 random 模块，并显示 1 到 9 之间的随机数：

```py
import random

print(random.randrange(1,10))

# 3
```

