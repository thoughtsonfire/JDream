# Pandas

安装 Pandas

```bash
pip install pandas
```

## Pandas 是什么？

Pandas = Python 的“Excel 超级版”。

它让你可以：

- 处理表格数据

- 分析数据

- 清洗数据

- 统计数据

- 做可视化的输入源

它的两大结构是：

| 结构          | 类似于                      |
| ------------- | --------------------------- |
| **Series**    | 一列数据（如 Excel 的一列） |
| **DataFrame** | 一张表（如 Excel 的一页）   |

## 两大核心

### Series

```py
import pandas as pd

s = pd.Series([10, 20, 30])
print(s)
```

输出：

```
0    10
1    20
2    30
dtype: int64
```

### DataFrame

```py
import pandas as pd

df = pd.DataFrame({
    "name": ["A", "B", "C"],
    "price": [10, 20, 30]
    # 数组长度要保持一致
})
print(df)
```

输出：

```
  name  price
0    A     10
1    B     20
2    C     30
```

## 创建 DataFrame 的方式

### 用字典

```py
import pandas as pd

df = pd.DataFrame([
    {"sku": "123", "price": 20,'time':'10:20'},
    {"sku": "456", "price": 18}
])
print(df)
```

输出：

```
   sku  price   time
0  123     20  10:20
1  456     18    NaN
```

### 用列表

```py
import pandas as pd

df = pd.DataFrame([[1,2],[3,4],[5,6]], columns=["A","B"])

print(df)
```

输出：

```
   A  B
0  1  2
1  3  4
2  5  6
```

## 读取外部数据

### 读取 CSV

```py
df = pd.read_csv("data.csv")
```

### 读取 Excel

```py
df = pd.read_excel("data.xlsx")
```

### 读取 JSON

```py
df = pd.read_json("data.json")
```

### 从数据库读

```py
import pymongo
df = pd.DataFrame(list(collection.find()))
```

## demo 数据

```py
import pandas as pd

df = pd.DataFrame({
    "sku": ["A", "A", "A", "B", "B", "C"],
    "price": [10, 12, 11, 20, 19, 30],
    "time": [
        "2024-01-01", "2024-01-02", "2024-01-03",
        "2024-01-01", "2024-01-02",
        "2024-01-01"
    ]
})

df["time"] = pd.to_datetime(df["time"])
```

## 数据选择（重点）

### 取列

```py
# Series
print(df["price"])
# DataFrame
print(df[["sku", "price"]])
```

输出：

```
0    10
1    12
2    11
3    20
4    19
5    30
Name: price, dtype: int64
  sku  price
0   A     10
1   A     12
2   A     11
3   B     20
4   B     19
5   C     30
```

### 选择行（loc / iloc）

```py
import pandas as pd

df = pd.DataFrame({
    "sku": ["A", "A", "A", "B", "B", "C"],
    "price": [10, 12, 11, 20, 19, 30],
    "time": [
        "2024-01-01", "2024-01-02", "2024-01-03",
        "2024-01-01", "2024-01-02",
        "2024-01-01"
    ]
})

df["time"] = pd.to_datetime(df["time"])

p1 = df.loc[0]       # 行标签
p2 = df.iloc[0]      # 行序号
p3 = df.loc[1:4]     # 切片(包含 结束位置)
p4 = df.iloc[1:4]    # 切片(不包含 结束位置)

print(p1)
print('--------------')
print(p2)
print('--------------')
print(p3)
print('--------------')
print(p4)
```

输出：

```
sku                        A
price                     10
time     2024-01-01 00:00:00
Name: 0, dtype: object
--------------
sku                        A
price                     10
time     2024-01-01 00:00:00
Name: 0, dtype: object
--------------
  sku  price       time
1   A     12 2024-01-02
2   A     11 2024-01-03
3   B     20 2024-01-01
4   B     19 2024-01-02
--------------
  sku  price       time
1   A     12 2024-01-02
2   A     11 2024-01-03
3   B     20 2024-01-01
```

- loc → 用“标签”取数据

- iloc → 用“数字位置”取数据

先准备一个 DataFrame

```py
import pandas as pd

df = pd.DataFrame({
    "name": ["A", "B", "C"],
    "score": [80, 90, 85]
}, index=["x", "y", "z"])

print(df)
```

结果：

```
   name  score
x     A     80
y     B     90
z     C     85
```

注意：行标签是 x, y, z，不是 0,1,2！

1️⃣ loc 用的是 标签（label）

```py
df.loc["x"]
```

结果：

```
name     A
score   80
```

2️⃣ iloc 用的是 位置（index number）

```py
df.iloc[0]
```

结果：

```
name     A
score   80
```

### 条件选择（最常用）

```py
p1 = df[df["price"] > 15]
p2 = df[(df["price"] > 10) & (df["sku"] == "A")]

print(p1)
print('-----------------------------------------------')
print(p2)
```

输出：

```
  sku  price       time
3   B     20 2024-01-01
4   B     19 2024-01-02
5   C     30 2024-01-01
-----------------------------------------------
  sku  price       time
1   A     12 2024-01-02
2   A     11 2024-01-03
```

### 取某个 sku 的所有数据

```py
df_sku = df[df["sku"] == "A"]

print(df_sku)
```

输出：

```
  sku  price       time
0   A     10 2024-01-01
1   A     12 2024-01-02
2   A     11 2024-01-03
```

## 数据清洗

### 缺失值处理

```py
import pandas as pd

df = pd.DataFrame([
    {"sku": "123", "price": 20,'time':'10:20'},
    {"sku": "456", "price": 18}
])


p1 = df.dropna()         # 删除缺失
p2 = df.fillna(0)        # 填充缺失

print(p1)
print('---------------------')
print(p2)
```

输出：

```
   sku  price   time
0  123     20  10:20
---------------------
   sku  price   time
0  123     20  10:20
1  456     18      0
```

### 删除重复项

```py
import pandas as pd

df = pd.DataFrame({
    "sku": ["A", "A", "A", "B", "B", "C"],
    "price": [10, 11, 11, 20, 19, 30],
})

p1 = df.drop_duplicates()

print(p1)
```

输出：

```
  sku  price
0   A     10
1   A     11
3   B     20
4   B     19
5   C     30
```

### 修改数据类型

```py
import pandas as pd

df = pd.DataFrame({
    "sku": ["A", "A", "A", "B", "B", "C"],
    "price": [10, 11, 11, 20, 19, 30],
})

df["price"] = df["price"].astype(float)

print(df)
```

输出：

```
  sku  price
0   A   10.0
1   A   11.0
2   A   11.0
3   B   20.0
4   B   19.0
5   C   30.0
```

### 重命名列

| 操作方式                | 是否修改 df 原对象 | 是否返回新 df |
| ----------------------- | ------------------ | ------------- |
| `inplace=True`          | ✔ 是               | ✘ 否          |
| `inplace=False`（默认） | ✘ 否               | ✔ 是          |

```py
import pandas as pd

df = pd.DataFrame({
    "sku": ["A", "A", "A", "B", "B", "C"],
    "price": [10, 11, 11, 20, 19, 30],
})

df.rename(columns={"price": "goods_price"}, inplace=True)

print(df)
```

输出：

```
  sku  goods_price
0   A           10
1   A           11
2   A           11
3   B           20
4   B           19
5   C           30
```

### 替换值

```py
import pandas as pd

df = pd.DataFrame({
    "sku": ["A", "A", "A", "B", "B", "C"],
    "price": [10, 11, 11, 20, 19, 30],
})

new_df = df["sku"].replace({"A": "SKU_A"})

print(new_df)
```

输出：

```
0    SKU_A
1    SKU_A
2    SKU_A
3        B
4        B
5        C
Name: sku, dtype: object
```

## 数据处理（排序、分组、统计）

### 排序

```py
import pandas as pd

df = pd.DataFrame({
    "sku": ["A", "A", "A", "B", "B", "C"],
    "price": [10, 12, 11, 20, 19, 30],
    "time": [
        "2024-01-01", "2024-01-02", "2024-01-03",
        "2024-01-01", "2024-01-02",
        "2024-01-01"
    ]
})

p1 = df.sort_values("price")
p2 = df.sort_values("price", ascending=False)
p3 = df.sort_values(["sku", "price"])

print(p1)
print('------------------------')
print(p2)
print('------------------------')
print(p3)
```

输出：

```
  sku  price        time
0   A     10  2024-01-01
2   A     11  2024-01-03
1   A     12  2024-01-02
4   B     19  2024-01-02
3   B     20  2024-01-01
5   C     30  2024-01-01
------------------------
  sku  price        time
5   C     30  2024-01-01
3   B     20  2024-01-01
4   B     19  2024-01-02
1   A     12  2024-01-02
2   A     11  2024-01-03
0   A     10  2024-01-01
------------------------
  sku  price        time
0   A     10  2024-01-01
2   A     11  2024-01-03
1   A     12  2024-01-02
4   B     19  2024-01-02
3   B     20  2024-01-01
5   C     30  2024-01-01
```

### 统计（avg/ min / max）

```py
import pandas as pd

df = pd.DataFrame({
    "sku": ["A", "A", "A", "B", "B", "C"],
    "price": [10, 12, 11, 20, 19, 30],
    "time": [
        "2024-01-01", "2024-01-02", "2024-01-03",
        "2024-01-01", "2024-01-02",
        "2024-01-01"
    ]
})

p1 = df["price"].mean()
p2 = df["price"].max()
p3 = df["price"].min()

print(p1)
print('-----------------------')
print(p2)
print('-----------------------')
print(p3)
```

输出：

```
17.0
-----------------------
30
-----------------------
10
```

### 分组统计（超级重要）

```py
import pandas as pd

df = pd.DataFrame({
    "sku": ["A", "A", "A", "B", "B", "C"],
    "price": [10, 12, 11, 20, 19, 30],
    "time": [
        "2024-01-01", "2024-01-01", "2024-01-03",
        "2024-01-01", "2024-01-02",
        "2024-01-01"
    ]
})

df["time"] = pd.to_datetime(df["time"])


p1 = df.groupby("sku")["price"].mean()
p2 = df.groupby("sku")["price"].max()
p3 = df.groupby("sku")["price"].count()
p4 = df.groupby(["sku","time"])["price"].count()
p5 = df.groupby("sku")["price"].agg(["min", "max", "mean"])
p6 = df.groupby(df["time"].dt.date)["price"].mean()
p7 = df.sort_values("time").groupby("sku").tail(1)


print(p1)
print('-------------------------')
print(p2)
print('-------------------------')
print(p3)
print('-------------------------')
print(p4)
print('-------------------------')
print(p5)
print('-------------------------')
print(p6)
print('-------------------------')
print(p7)
```

输出：

```
sku
A    11.0
B    19.5
C    30.0
Name: price, dtype: float64
-------------------------
sku
A    12
B    20
C    30
Name: price, dtype: int64
-------------------------
sku
A    3
B    2
C    1
Name: price, dtype: int64
-------------------------
sku  time
A    2024-01-01    2
     2024-01-03    1
B    2024-01-01    1
     2024-01-02    1
C    2024-01-01    1
Name: price, dtype: int64
-------------------------
     min  max  mean
sku
A     10   12  11.0
B     19   20  19.5
C     30   30  30.0
-------------------------
time
2024-01-01    18.0
2024-01-02    19.0
2024-01-03    11.0
Name: price, dtype: float64
-------------------------
  sku  price       time
5   C     30 2024-01-01
4   B     19 2024-01-02
2   A     11 2024-01-03
```

## 合并 / 拼接表

```py
import pandas as pd

df1 = pd.DataFrame({
    "sku": ["A", "B", "C"],
    "name": ["苹果", "香蕉", "橙子"]
})

df2 = pd.DataFrame({
    "sku": ["A", "B", "C", "A", "D"],
    "price": [10, 20, 30, 60, 100]
})
# 横向合并（SQL JOIN）
# 支持： left、right、inner、outer
p1 = df1.merge(df2, on="sku", how="left")
# 纵向拼接（append）
p2 = pd.concat([df1, df2])
# 忽略行号
p3 = pd.concat([df1, df2], ignore_index=True)


print(p1)
print('--------------------------')
print(p2)
print('--------------------------')
print(p3)
```

输出：

```
  sku name  price
0   A   苹果     10
1   A   苹果     60
2   B   香蕉     20
3   C   橙子     30
--------------------------
  sku name  price
0   A   苹果    NaN
1   B   香蕉    NaN
2   C   橙子    NaN
0   A  NaN   10.0
1   B  NaN   20.0
2   C  NaN   30.0
3   A  NaN   60.0
4   D  NaN  100.0
--------------------------
  sku name  price
0   A   苹果    NaN
1   B   香蕉    NaN
2   C   橙子    NaN
3   A  NaN   10.0
4   B  NaN   20.0
5   C  NaN   30.0
6   A  NaN   60.0
7   D  NaN  100.0
```

## 时间序列处理

### resample

resample() 是 时间序列重采样（resampling） 的核心方法，用于：

- 按新的时间频率聚合

- 向上采样 / 向下采样

- 对时间序列进行重建（如按天转按周）

类似于 groupby()，但针对时间序列。

📌 基础语法

```py
df.resample(rule, on=None, axis=0).agg(func)
```

| 参数     | 说明                                                                       |
| -------- | -------------------------------------------------------------------------- |
| **rule** | 时间频率字符串，例如 `"D"`（日）、`"W"`（周）、`"ME"`（月）、`"H"`（小时） |
| **on**   | 指定 DataFrame 中的时间列（如果 index 不是 DatetimeIndex）                 |
| **axis** | 采样维度（一般默认即可）                                                   |

📌 需要记住的一点

✔ `resample()` 必须基于 DatetimeIndex

如果时间不是 index，则要用：

```py
resample("W", on="time")
```

否则必须先设置 index：

```py
df = df.set_index("time")
df.resample("W")
```

### 例子

```py
import pandas as pd

df = pd.DataFrame({
    "time": pd.date_range("2024-01-01", periods=5, freq="D"),
    "price": [10, 11, 13, 12, 14]
})

# 转为 datetime
df["time"] = pd.to_datetime(df["time"])
print(df)
print('-----------------------------')

# 提取日期 / 年/月
df["date"] = df["time"].dt.date
df["year"] = df["time"].dt.year
df["month"] = df["time"].dt.month

print(df)
print('-----------------------------')

# 找每一天价格变化
df["change"] = df["price"].diff()
print(df)
print('-----------------------------')

#按天求平均价
p1 = df.groupby(df["time"].dt.date)["price"].mean()

# 按周统计
p2 = df.resample("W", on="time")["price"].mean()

# 按月统计
p3 = df.resample("ME", on="time")["price"].mean()

print(p1)
print('-----------------------------')
print(p2)
print('-----------------------------')
print(p3)
```

输出：

```
        time  price
0 2024-01-01     10
1 2024-01-02     11
2 2024-01-03     13
3 2024-01-04     12
4 2024-01-05     14
-----------------------------
        time  price        date  year  month
0 2024-01-01     10  2024-01-01  2024      1
1 2024-01-02     11  2024-01-02  2024      1
2 2024-01-03     13  2024-01-03  2024      1
3 2024-01-04     12  2024-01-04  2024      1
4 2024-01-05     14  2024-01-05  2024      1
-----------------------------
        time  price        date  year  month  change
0 2024-01-01     10  2024-01-01  2024      1     NaN
1 2024-01-02     11  2024-01-02  2024      1     1.0
2 2024-01-03     13  2024-01-03  2024      1     2.0
3 2024-01-04     12  2024-01-04  2024      1    -1.0
4 2024-01-05     14  2024-01-05  2024      1     2.0
-----------------------------
time
2024-01-01    10.0
2024-01-02    11.0
2024-01-03    13.0
2024-01-04    12.0
2024-01-05    14.0
Name: price, dtype: float64
-----------------------------
time
2024-01-07    12.0
Freq: W-SUN, Name: price, dtype: float64
-----------------------------
time
2024-01-31    12.0
Freq: ME, Name: price, dtype: float64
```

## 常用技巧

### 查看前 5 行

```py
df.head()
```

### 查看后 5 行

```py
df.tail()
```

### 唯一值

```py
df["sku"].unique()
```

### 行数、列数

```py
df.shape  # (行数, 列数)
```

### 统计总览

```py
df.describe()
```

### 重置索引

```py
df.reset_index(drop=True, inplace=True)
```

### 判断是否存在缺失值

```py
df.isnull().sum()
```
