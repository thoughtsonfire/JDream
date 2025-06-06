# flex

## 常用属性  

### flex-shrink

> 在 `Flexbox` 布局中，`flex-shrink` 属性决定了每个 `flex` 项目在 `flex` 容器空间不足时相对于其他项目应该收缩多少。它接受一个无单位的数字作为其属性值，表示项目的收缩比例。

**使用方法**

- 默认情况下，`flex-shrink` 的初始值为 1，意味着每个项目在需要时都会收缩。如果所有项目都设置为 `flex-shrink`: `1`;，它们将等比例地收缩，以适应容器的剩余空间。
- 如果希望某些项目在容器空间不足时不收缩（即固定大小），可以将它们的 `flex-shrink` 设置为 `0`。这样这些项目不会在空间不足时自动缩小，而是保持其原始大小。
- 如果希望某些项目相对于其他项目更多地收缩，可以将它们的 `flex-shrink` 设置为一个大于 1 的值。这样它们会比其他项目更快地缩小，以填充剩余空间。

<br>

### flex-direction

> `flex-direction` 是 CSS 中 flex 布局的一个属性，用于设置主轴方向

**属性**

1. `row`：主轴水平，从左到右。
2. `row-reverse`：主轴水平，从右到左。
3. `column`：主轴垂直，从上到下。
4. `column-reverse`：主轴垂直，从下到上。


<br>

### align-self

> `align-self` 是 CSS `Flexbox` 和 `Grid` 布局中的一个属性，用于设置单个项目在其容器内的对齐方式。它允许你覆盖父容器中定义的对齐方式，为该项目提供单独的对齐选项。

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
