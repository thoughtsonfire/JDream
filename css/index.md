# css

- font-size:1.2 不带单位，默认单位是em
- pc端浏览器大都默认font-size:16px
- -webkit-text-size-adjust: 100%;  /* 不允许浏览器自动调整文本大小 */
- -ms-text-size-adjust: 100%;   /* 不允许IE浏览器自动调整文本大小 */
- -ms-overflow-style: scrollbar;   /* 在IE浏览器中显示滚动条 */
- -webkit-tap-highlight-color: rgba(0, 0, 255, 0.5);  /*在移动设备上，当用户点击或触摸页面上的链接或其他可点击元素时，浏览器会默认显示一个高亮效果，以提示用户已经成功点击了这个元素。 设置高亮颜色为半透明的蓝色 */
- left: unset;在 CSS 中，left: unset; 是用来重置元素的左侧位置属性的设置。它的作用是取消任何通过 CSS 显式设置的 left 属性，使元素恢复到其默认的布局行为或从父元素继承的值。

## 基础属性

<br>

#### object-fit

<br>

`object-fit` 是一个 CSS 属性，用于控制元素的内容如何适应其容器。这个属性常用于 `<img>` 和 `<video>` 元素，但也可以应用于任何替换元素（例如背景图像或内嵌视频）。

**属性**

1. `fill`：默认值。内容将被拉伸以填满容器，这可能会导致内容的宽高比失真。
2. `contain`：内容将按比例缩放，以便完全适应容器，同时保持内容的宽高比。容器的某些部分可能会空白。
3. `cover`：内容将按比例缩放，以填满整个容器，同时保持内容的宽高比。内容可能会被裁剪以适应容器。
4. `none`：内容不会被缩放，保持原始尺寸。内容可能会超出容器。
5. `scale-down`：内容会根据需要缩放，选择 contain 或 none 中较小的那个。

<br>

#### vertical-align

<br>

`vertical-align` 是一个 CSS 属性，用于设置内联元素或表格单元格内容的垂直对齐方式。它控制了元素在其包含块内的垂直位置。该属性主要用于内联元素（如 `<span>`、`<img>`）和表格单元格（如 `<td>`、`<th>`）。

**属性**
1. `baseline`: 默认值。元素的基线（通常是文本的基线）对齐。
2. `top`: 元素的顶部与其包含块的顶部对齐。
3. `middle`: 元素的中部与其包含块的中部对齐。
4. `bottom`: 元素的底部与其包含块的底部对齐.
5. `sub`: 元素显示为下标。
6. `super`: 元素显示为上标。
7. `text-top`: 元素的顶部与包含块的文本顶部对齐。
8. `text-bottom`: 元素的底部与包含块的文本底部对齐。

<br>

#### nth-of-type

<br>

在 CSS 中，nth-of-type 伪类选择器用于选中某一类型的元素在其兄弟元素中的特定位置。nth-of-type 可以接受一个公式来选择符合条件的元素。

**解释公式**

1. nth-of-type(-1n + 24)
   这个公式选择了从第1个到第24个的所有元素。公式的结构是 `an + b`，其中 `a` 是步长，`b` 是起始位置：
   - `-1n + 24` 可以分解为：
     - `-1n` 表示步长为负的递减序列。
     - `+ 24` 表示选择从第24个元素开始递减。
   实际上，-1n + 24 表示一个反向序列，即从第24个元素开始，递减到第1个元素，所以选择的是前24个元素。
2. nth-of-type(1n + 25)
   这个公式选择了从第25个开始的所有元素。公式 1n + 25 表示：
   - `1n` 表示步长为正的递增序列。
   - `+ 25` 表示选择从第25个元素开始的所有元素。
**示例：选择从第10到第20个元素**

```css
/* 选择第10到第20个元素 */
.my-element:nth-of-type(n+10):nth-of-type(-n+20) {
  background-color: yellow;
}
```
*css 选择器索引是从1开始的*
*js 选择元素索引是从0开始的*

<br>

#### writing-mode

<br>

`writing-mode` 是 CSS 的一个属性，用于定义文本的书写方向和排版模式。这使得我们可以轻松地将文本方向从横向改为竖向，以适应不同的语言和排版需求。这个属性特别有用在需要支持多种书写系统或需要在特定布局中显示竖向文本的情况下。

**属性**

1. `horizontal-tb` (默认值)
   - 定义: 从左到右书写，行从上到下。
   - 用途: 适用于大多数语言，如英语、法语等。
2. `vertical-rl`
   - 定义: 从上到下书写，行从右到左。
   - 用途: 常见于日语、中文、韩文的竖排文本。
3. `vertical-lr`
   - 定义: 从上到下书写，行从左到右。
   - 用途: 主要用于少数语言，或特殊排版需求。
4. `sideways-rl`
   - 定义: 从左到右书写，但文本倾斜90度。
   - 用途: 用于在竖向排版中将横向文本呈现为侧向文本。
5. `sideways-lr`
   - 定义: 从右到左书写，但文本倾斜90度。
   - 用途: 用于在竖向排版中将横向文本呈现为侧向文本。

<br>

#### padding 和margin百分比

<br>

- `padding` 的百分比是相对于<span style="color:red">包含块的宽度</span>计算的，这对保持元素的纵横比非常有用。
- `margin` 的百分比在水平和垂直方向上计算方式不同：
  - 水平 margin: 相对于包含块的宽度。
  - 垂直 margin: 相对于元素自身的宽度。

  <br>

  #### 平滑滚动

  <br>

  ##### 滚动到列表顶部

- 给滚动元素设置scrollTop为0
  
  ```js
  element.scrollTop=0
  ```
- 给滚动元素设置 scroll-behavior

  ```css
  element{
   scroll-behavior:smooth;
  }
  ```

<br>

##### 跳转到指定元素

<br>

```js
element.scrollIntoView({behavior:'smooth'})
```

<br>

## flex

<br>

#### flex-shrink

**作用**

- 在 Flexbox 布局中，flex-shrink 属性决定了每个 flex 项目在 flex 容器空间不足时相对于其他项目应该收缩多少。它接受一个无单位的数字作为其属性值，表示项目的收缩比例。

**使用方法**

- 默认情况下，flex-shrink 的初始值为 1，意味着每个项目在需要时都会收缩。如果所有项目都设置为 flex-shrink: 1;，它们将等比例地收缩，以适应容器的剩余空间。
- 如果希望某些项目在容器空间不足时不收缩（即固定大小），可以将它们的 flex-shrink 设置为 0。这样这些项目不会在空间不足时自动缩小，而是保持其原始大小。
- 如果希望某些项目相对于其他项目更多地收缩，可以将它们的 flex-shrink 设置为一个大于 1 的值。这样它们会比其他项目更快地缩小，以填充剩余空间。

#### flex-direction

**作用**

- flex-direction 是 CSS 中 flex 布局的一个属性，用于设置主轴方向

**属性**

1. `row`：主轴水平，从左到右。
2. `row-reverse`：主轴水平，从右到左。
3. `column`：主轴垂直，从上到下。
4. `column-reverse`：主轴垂直，从下到上。

#### align-self

**作用**

- `align-self` 是 CSS `Flexbox` 和 `Grid` 布局中的一个属性，用于设置单个项目在其容器内的对齐方式。它允许你覆盖父容器中定义的对齐方式，为该项目提供单独的对齐选项。

**语法**

`align-self: auto | flex-start | flex-end | center | baseline | stretch;`

**属性值**

- `auto`：使用父容器的 `align-items` 属性的值。默认值。
- `flex-start`：将项目对齐到容器的起始边缘（在弹性盒子布局中是容器的起始边缘）。
- `flex-end`：将项目对齐到容器的结束边缘（在弹性盒子布局中是容器的结束边缘）。
- `center`：将项目对齐到容器的中心。
- `baseline`：将项目对齐到父容器的基线。
- `stretch`：使项目填充整个容器的交叉轴。默认值，适用于 `Flexbox` 和 `Grid` 布局。

<br>

## grid

<br>

####  grid-template-columns

`grid-template-columns` 是 CSS Grid 布局中的一个属性，用于定义网格容器的列结构。这一属性设定了列的数量和每列的宽度。它的基本用法和功能包括：

**基本语法**

```css
.container {
  display: grid;
  grid-template-columns: <track-size> ...;
}
```

- `<track-size>` 可以是绝对单位（如 `px`、`em`）、相对单位（如 `%`），也可以是 `fr` 单位或者其他特殊的函数（如 `auto`、`minmax()`）。

**示例**

1. 定义固定宽度的列
   
   ```css
   .container {
     display: grid;
     grid-template-columns: 100px 200px 300px;
   }
   ```
   这段代码创建了一个网格容器，包含三列，列宽分别为 100px、200px 和 300px。
   
2. 使用相对单位（fr）

   ```css
   .container {
     display: grid;
     grid-template-columns: 1fr 2fr 1fr;
   }
   ```
   这里定义了三个列，第一列和第三列各占容器宽度的 1fr，第二列占 2fr。第二列宽度是第一列和第三列的两倍。

3. 使用 auto 自动调整宽度

   ```css
   .container {
     display: grid;
     grid-template-columns: auto auto;
   }
   ```
   这里创建了两个列，它们的宽度会自动调整以适应其内容。

4. 使用 `repeat()` 简化代码

   ```css
   .container {
     display: grid;
     grid-template-columns: repeat(3, 1fr);
   }
   ```
   repeat(3, 1fr) 表示创建三个列，每列宽度相等，占据容器宽度的三分之一。

5. 使用 minmax() 设定范围

   ```css
   .container {
     display: grid;
     grid-template-columns: repeat(3, minmax(100px, 1fr));
   }
   ```
   每列的最小宽度为 100px，最大宽度为 1fr，即每列会根据可用空间进行调整，但不会小于 100px。

6. 组合与嵌套

   ```css
   .container {
     display: grid;
     grid-template-columns: 200px repeat(3, 1fr) 100px;
   }
   ```
   这段代码创建了一个包含五列的网格布局，其中第一列宽度固定为 200px，接下来的三列各占据剩余空间的 1fr，最后一列宽度固定为 100px。

#### grid-template-rows

`grid-template-rows` 是用于定义 CSS Grid 布局中行的高度的属性。它与 `grid-template-columns` 类似，但专注于行的布局。基本语法如下：

**基本语法**

```css
.container {
  display: grid;
  grid-template-rows: <track-size> ...;
}
```
- `<track-size>` 可以是绝对单位（如 `px`、`em`）、相对单位（如 `%`），也可以是 `fr` 单位或特殊函数（如 `auto`、`minmax()`）。

**示例**

1. 定义固定高度的行

   ```css
   .container {
     display: grid;
     grid-template-rows: 100px 200px 300px;
   }
   ```
   这将创建一个网格容器，包含三行，高度分别为 100px、200px 和 300px。

2. 使用相对单位（fr）

   ```css
   .container {
     display: grid;
     grid-template-rows: 1fr 2fr 1fr;
   }
   ```
   这段代码定义了三行，高度比例为 1:2:1。第二行的高度是第一行和第三行的两倍。

3. 使用 `auto` 自动调整高度

   ```css
   .container {
     display: grid;
     grid-template-rows: auto auto;
   }
   ```
   创建了两行，它们的高度会自动调整以适应其内容。

4. 使用 repeat() 简化代码

   ```css
   .container {
     display: grid;
     grid-template-rows: repeat(3, 1fr);
   }
   ```
   `repeat(3, 1fr)` 表示创建三行，每行高度相等，占据容器高度的三分之一。

5. 使用 minmax() 设定范围

   ```css
   .container {
     display: grid;
     grid-template-rows: repeat(3, minmax(100px, 1fr));
   }
   ```
   每行的最小高度为 100px，最大高度为 1fr，即每行会根据可用空间调整，但不会小于 100px。

6. 组合与嵌套

   ```css
   .container {
     display: grid;
     grid-template-rows: 100px repeat(2, 1fr) 150px;
   }
   ```
   这段代码创建了一个包含四行的网格布局，其中第一行和最后一行高度分别为 100px 和 150px，中间的两行各占剩余空间的 1fr。

#### grid-column

`grid-column` 是 CSS Grid 布局中的一个属性，用于指定一个元素在网格中跨越的列。它通常用于设置元素在网格中的起始列和结束列。基本语法如下：

**基本语法**

```css
.item {
  grid-column: <start-line> / <end-line>;
}
```
- `<start-line>` 指定起始列线的位置。
- `<end-line>` 指定结束列线的位置。

**示例**

1. 跨越指定列

   ```css
   .item {
     grid-column: 2 / 4;
   }
   ```
   这将使 .item 元素从第 2 列线开始，到第 4 列线结束。

2. 使用 span 关键字

   ```css
   .item {
     grid-column: 2 / span 3;
   }
   ```
   这表示 .item 从第 2 列线开始，跨越 3 列。

3. 自动布局

   ```css
   .item {
     grid-column: 1 / auto;
   }
   ```
   这使 .item 从第 1 列线开始，到自动适应的列结束。

**注意事项**

- `grid-column` 实际上是 `grid-column-start` 和 `grid-column-end` 的简写形式。
- 列线的位置可以是整数（指定列线）、负值（从右侧开始计数），或者是命名线（如果使用了命名网格线）。
- 确保你的网格布局定义了足够的列，以适应 grid-column 属性指定的范围。

#### gap

使用 gap 属性可以同时设置行和列的间距。例如：

```css
.container {
  display: grid;
  gap: 10px 15px;
}
```
这将使每行之间的垂直间距为 10px，每列之间的水平间距为 15px。

##### grid-row-gap/ row-gap

是 CSS Grid 布局中的一个属性，用于设置网格行之间的间距。它指定了行之间的垂直距离。

```css
.container {
  display: grid;
  grid-row-gap: 10px;
}
```
这段代码将使 .container 网格中每一行之间的垂直间距为 10px。

##### grid-column-gap/column-gap

使用 `grid-column-gap` 或 `column-gap` 属性设置网格列之间的水平间距。

```css
.container {
  display: grid;
  column-gap: 15px;
}
```
这将使每一列之间的水平间距为 15px。

## sass 

<br>

### sass 中的逻辑运算符

1. `@for`
   - sass 代码
   ```sass
   @for $i from 1 through 3 {
     .item-#{$i} {
       width: 20px * $i;
     }
   }
   ```
   - 对应css代码
   ```css
   .item-1 {
     width: 20px;
   }
   
   .item-2 {
     width: 40px;
   }
   
   .item-3 {
     width: 60px;
   }
   ```




