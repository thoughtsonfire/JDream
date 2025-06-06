# 选择器  

##  一、基础选择器  

| 类型     | 示例          | 说明                     |
| ------ | ----------- | ---------------------- |
| 标签选择器  | `div`, `p`  | 选中所有该标签的元素             |
| 类选择器   | `.box`      | 选中所有 class 为 box 的元素   |
| ID 选择器 | `#header`   | 选中 id 为 header 的元素（唯一） |
| 通配选择器  | `*`         | 选中页面上所有元素              |
| 分组选择器  | `h1, h2, p` | 同时选中多个标签               |


```css
p { color: blue; }
.box { padding: 10px; }
#header { background: gray; }
* { box-sizing: border-box; }
```

## 二、组合选择器（层级选择器）  

| 类型    | 示例        | 含义           |
| ----- | --------- | ------------ |
| 后代选择器 | `div p`   | div 内所有 p 元素 |
| 子选择器  | `ul > li` | 直接子元素 li     |
| 相邻兄弟  | `h1 + p`  | h1 后紧跟的第一个 p |
| 通用兄弟  | `h1 ~ p`  | h1 后所有兄弟 p   |


```css
div p { font-size: 14px; }
ul > li { list-style: none; }
h1 + p { color: red; }
```

## 三、属性选择器  

- 用于选中具有特定属性的元素：

| 示例                   | 含义                  |
| -------------------- | ------------------- |
| `input[type="text"]` | type 是 text 的 input |
| `a[target="_blank"]` | 新窗口打开的链接            |
| `input[disabled]`    | 所有 disabled 的输入框    |
| `a[href^="https"]`   | href 以 https 开头     |
| `a[href$=".pdf"]`    | href 以 .pdf 结尾      |
| `a[href*="docs"]`    | href 中包含 docs       |


## 四、伪类选择器（Pseudo-classes）  

伪类选择器是对元素“状态”的选择。  

✨ **用户交互类**  

| 示例              | 含义     |
| --------------- | ------ |
| `a:hover`       | 鼠标悬停时  |
| `input:focus`   | 输入框聚焦时 |
| `button:active` | 按钮被点击时 |


✨ **结构相关**  

| 示例                    | 含义       |
| --------------------- | -------- |
| `li:first-child`      | 第一个子元素   |
| `li:last-child`       | 最后一个子元素  |
| `li:nth-child(2)`     | 第 2 个子元素 |
| `li:nth-of-type(odd)` | 奇数类型元素   |
| `li:nth-of-type(even)`|偶数类型元素    |


| 伪类                | 含义                   |
| ----------------- | -------------------- |
| `:first-child`    | 第一个子元素（不论标签类型）       |
| `:first-of-type`  | 第一个该类型的子元素（同标签中排第一的） |
| `:last-child`     | 最后一个子元素（不论类型）        |
| `:last-of-type`   | 最后一个该类型的子元素          |
| `:nth-child(n)`   | 第 n 个子元素             |
| `:nth-of-type(n)` | 第 n 个该类型的子元素         |


## 五、伪元素选择器（Pseudo-elements）  

用于选中元素的一部分：  

| 示例                | 含义       |
| ----------------- | -------- |
| `p::first-line`   | 段落的第一行文字 |
| `p::first-letter` | 段落的首字母   |
| `div::before`     | 在元素前插入内容 |
| `div::after`      | 在元素后插入内容 |


```css
p::first-line { font-weight: bold; }
.box::before { content: "🌟"; }
```

## 六、选择器优先级（权重）  

CSS 冲突时，优先级决定谁生效：

- 内联样式：1000

- ID 选择器：100

- 类、伪类、属性选择器：10

- 标签选择器：1

- 通配符、继承：0

```css
#box { color: red; }        /* 100 */
.box { color: blue; }       /* 10 */
div { color: green; }       /* 1 */
```

## 经验  

### `:nth-child()` vs `:nth-of-type()`  

**通用写法**  

```css
/* 选中父元素 .parent 中的第 N 个子元素（不限类型） */
.parent :nth-child(N) {}

/* 选中父元素 .parent 中的第 N 个同类元素（如第 N 个 <li>） */
.parent li:nth-of-type(N) {}
```

- `:nth-child()` 前面是父元素

- `nth-of-type()` 前面是兄弟元素   

| 项目           | `:nth-child()`                      | `:nth-of-type()`                        |
| ------------ | ----------------------------------- | --------------------------------------- |
| 作用范围         | 所有子元素，不管标签类型                        | 仅同类型的兄弟元素（比如所有 `<div>`）                 |
| 应用限制         | 易被混合标签结构干扰                          | 更精确，推荐用于结构整洁或目标明确的场景                    |
| 是否支持公式       | ✅ 支持 `an + b`                       | ✅ 支持 `an + b`                           |
| 选择第10\~20个写法 | `:nth-child(n+10):nth-child(-n+20)` | `:nth-of-type(n+10):nth-of-type(-n+20)` |

<br>

### nth-of-type 

- nth-child 同样支持  只是是从子元素中选

>在 CSS 中，nth-of-type 伪类选择器用于选中某一类型的元素在其兄弟元素中的特定位置。nth-of-type 可以接受一个公式来选择符合条件的元素。

**解释公式**

1. `nth-of-type(-1n + 24)`
   这个公式选择了从第1个到第24个的所有元素。  
   公式的结构是 `an + b`，其中 `a` 是步长，`b` 是起始位置：
   - `-1n + 24` 可以分解为：
     - `-1n` 表示步长为负的递减序列。
     - `+ 24` 表示选择从第24个元素开始递减。
   实际上，-1n + 24 表示一个反向序列，即从第24个元素开始，递减到第1个元素，所以选择的是前24个元素。
2. `nth-of-type(1n + 25)`
   这个公式选择了从第25个开始的所有元素。  
   公式 1n + 25 表示：
   - `1n` 表示步长为正的递增序列。
   - `+ 25` 表示选择从第25个元素开始的所有元素。  

**示例：选择从第10到第20个元素**

```css
/* 选择第10到第20个元素 */
.my-element:nth-of-type(n+10):nth-of-type(-n+20) {
  background-color: yellow;
}
```
- *css 选择器索引是从1开始的*  

- *js 选择元素索引是从0开始的*

<br>