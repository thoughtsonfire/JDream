# 实用属性

## 光标插入

`selectionStart` 和 `selectionEnd` 是 原生 `DOM` 属性，主要用来表示在 `<textarea>` 或 `<input type="text">` 里的光标位置或选中文本的范围。

1. `selectionStart`

- 代表选区的起始位置（基于字符下标，从 `0` 开始计数）。

- 如果没有选中文本，而是单纯光标在某个位置，它就等于光标的位置。

例子：  
假设文本是

```nginx
Hello world
```

光标放在 `H` 后面（`H|ello world`）  
则：

```js
textarea.selectionStart; // 1
```

2. `selectionEnd`

- 代表选区的结束位置（同样基于字符下标，从 `0` 开始计数）。

- 如果没有选区而只是单点光标，它的值等于 `selectionStart`。

例子：  
还是 "`Hello world`"，如果选中 "`ello`"：

```css
H[ello] world
```

则：

```js
textarea.selectionStart; // 1   (H 后面的 e)
textarea.selectionEnd; // 5   (o 后面的位置)
```

> 注意：结束位置是最后一个字符的下一个位置，也就是选区的右边界。

3. 小结

| 情况           | selectionStart | selectionEnd | 含义                   |
| -------------- | -------------- | ------------ | ---------------------- |
| 光标在某个位置 | n              | n            | 光标位置               |
| 选中文本       | startIndex     | endIndex     | 选区的起止字符下标     |
| 全选 `"abc"`   | 0              | 3            | 从第 0 个到第 3 个字符 |

**参考示例**

```js
   //获取光标位置
    handleBlur() {
        this.cursorStart = this.$refs.textarea.selectionStart;
        this.cursorEnd = this.$refs.textarea.selectionEnd;
    },
    //插入表情符号
    insertEmoji(emoji) {
        const textarea = this.$refs.textarea;

        this.content = this.content.substring(0, this.cursorStart) + emoji.name + this.content.substring(this.cursorEnd);
        this.$nextTick(() => {
            textarea.selectionStart = this.cursorStart + emoji.name.length;
            textarea.selectionEnd = textarea.selectionStart;
            this.cursorStart = textarea.selectionStart;
            this.cursorEnd = textarea.selectionEnd;
            textarea.focus();
        });
    },
    //通过表情符号转换成对应图片
```

## 渐变

| 渐变              | 记忆法             |
| ----------------- | ------------------ |
| `linear-gradient` | **沿一条线变**     |
| `radial-gradient` | **从一个点往外扩** |
| `conic-gradient`  | **围着一个点转**   |

### linear-gradient

linear-gradient —— 直线渐变（最常用）

🔷 **核心语法**

```css
linear-gradient(
  <direction | angle>,
  color-stop...
)
```

**常见写法**

```css
/* 从上到下 */
linear-gradient(red, blue);

/* 角度 */
linear-gradient(90deg, red, blue);

/* 精确控制 */
linear-gradient(
  to right,
  red 0%,
  yellow 50%,
  blue 100%
);
```

**典型用途**

✅ 页面背景
✅ 按钮高光
✅ 卡片层次感
✅ 遮罩渐隐（mask）

### radial-gradient

`radial-gradient` —— 径向渐变（从中心扩散）

**核心语法**

```css
radial-gradient(
  <shape> <size> at <position>,
  color-stop...
)
```

- `<shape>`：形状

- `<size>`：渐变扩散方式 / 半径规则

- `at <position>`：中心点

👉 `<shape>` 和 `<size>` 都可以省略
👉 省略时：`ellipse farthest-corner at center`

`<shape>` —— 形状有哪些？

只有两个值（记住就完事）

```css
circle   /* 正圆 */
ellipse  /* 椭圆（默认） */
```

- `<size>` —— 扩散规则（重点）

关键字 `size`（最常用）

| size 值           | 含义               |
| ----------------- | ------------------ |
| `closest-side`    | 到最近的边         |
| `farthest-side`   | 到最远的边         |
| `closest-corner`  | 到最近的角         |
| `farthest-corner` | 到最远的角（默认） |

**示例**

```css
/* 小范围高亮 */
radial-gradient(circle closest-side, #fff, transparent);

/* 覆盖整个容器 */
radial-gradient(circle farthest-corner, #fff, transparent);
```

- `at <position>` —— 围绕哪个点转

1️⃣ 关键字写法

```css
at center
at left top
at right bottom
```

2️⃣ 百分比（最常用）

```css
at 50% 50%   /* 正中心 */
at 50% 0%    /* 上中 */
at 100% 50%  /* 右中 */
```

3️⃣ 像素 / 混合

```css
at 100px 100px
at 50% 100px
```

### conic-gradient

`conic-gradient` —— 锥形渐变（围绕旋转）

**核心语法**

```css
conic-gradient(
  from <angle> at <position>,
  color-stop...
)
```

**常见写法**

```css
/* 色环 */
conic-gradient(red, yellow, green, cyan, blue, red);

/* 饼图 */
conic-gradient(
  #67c23a 0 40%,
  #e6a23c 40% 70%,
  #f56c6c 70% 100%
);

/* 进度环 */
conic-gradient(
  from -90deg,
  #409eff 0 75%,
  #eee 75% 100%
);

```

```css
background: conic-gradient(
  from -90deg at 50% 50%,
  #67c23a 0 75%,
  #ebeef5 75% 100%
);
```

✅ 默认（其实等于什么都不写）

```css
conic-gradient(red, blue);
```

等价于：

```css
conic-gradient(
  from 0deg at 50% 50%,
  red,
  blue
);
```

## @property

一、@property 是干嘛的？一句话

👉 让 CSS 自定义变量“有类型”，
从而 可以被浏览器正确插值、参与动画和过渡。

不然的话：

```css
--p: 0%;
--p: 80%;
```

浏览器只当成字符串，不会平滑动画 ❌

二、最基础写法（必须会）

```css
@property --p {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 0%;
}
```

三个字段分别是：

| 字段            | 必须 | 作用     |
| --------------- | ---- | -------- |
| `syntax`        | ✅   | 变量类型 |
| `inherits`      | ✅   | 是否继承 |
| `initial-value` | ✅   | 初始值   |

🔹 当你做 @property + CSS 变量动画时，一般推荐 `inherits: false`

原因：

- 动画是针对单个元素的

- 如果继承了父元素的值，子元素可能会意外叠加动画，或者动画起点不对

- 对进度环 / 呼吸光 / 转盘动画，这样更可控

三、常见 syntax 类型（超实用）

1️⃣ 数字

```css
syntax: "<number>";
```

2️⃣ 百分比（进度条最常用）

```css
syntax: "<percentage>";
```

3️⃣ 角度（和 conic-gradient 天生一对）

```css
syntax: "<angle>";
```

4️⃣ 长度

```css
syntax: "<length>";
```

5️⃣ 颜色

```css
syntax: "<color>";
```

## filter

filter 是 CSS 属性，可以对元素应用各种图像处理效果，比如模糊、亮度、对比度、色相旋转、灰度、投影等。

### 常用 filter 属性（重点记忆）

| filter 函数     | 参数                                          | 说明                        | 示例                            |
| --------------- | --------------------------------------------- | --------------------------- | ------------------------------- |
| `blur()`        | `<length>`                                    | 模糊，值越大越模糊          | `blur(5px)`                     |
| `brightness()`  | `<%>` 或 `<number>`                           | 亮度，100% 原始，>100% 变亮 | `brightness(150%)`              |
| `contrast()`    | `<%>` 或 `<number>`                           | 对比度                      | `contrast(200%)`                |
| `grayscale()`   | `<%>`                                         | 灰度，100% 全灰             | `grayscale(100%)`               |
| `sepia()`       | `<%>`                                         | 怀旧色 / 棕褐色             | `sepia(80%)`                    |
| `saturate()`    | `<%>`                                         | 饱和度                      | `saturate(200%)`                |
| `hue-rotate()`  | `<deg>`                                       | 色相旋转                    | `hue-rotate(90deg)`             |
| `invert()`      | `<%>`                                         | 反色                        | `invert(100%)`                  |
| `opacity()`     | `<%>`                                         | 透明度                      | `opacity(50%)`                  |
| `drop-shadow()` | `<offset-x> <offset-y> <blur-radius> <color>` | 投影（类似 box-shadow）     | `drop-shadow(5px 5px 5px #000)` |

三、使用示例

1️⃣ 基础滤镜

```css
img {
  filter: grayscale(100%) brightness(120%);
}
```

效果：图片灰白 + 亮一点

2️⃣ hover 动态效果

```css
.card img {
  filter: grayscale(100%);
  transition: filter 0.5s ease;
}

.card img:hover {
  filter: grayscale(0%) brightness(110%);
}
```

效果：鼠标悬停图片恢复彩色并略亮

3️⃣ 大屏装饰 / 背景效果

```css
.bg {
  filter: blur(30px) brightness(80%) saturate(120%);
}
```

效果：背景模糊 + 调整亮度和饱和度 → 大屏氛围感

4️⃣ 动画结合

```css
@keyframes pulse {
  0% {
    filter: brightness(100%);
  }
  50% {
    filter: brightness(130%);
  }
  100% {
    filter: brightness(100%);
  }
}

.glow {
  animation: pulse 2s infinite;
}
```

效果：发光 / 呼吸效果

四、几点 ⚠️ 注意

性能

- filter 会触发 GPU 渲染，过多或大面积使用会卡顿

- 大屏背景 + blur、drop-shadow 要适度

叠加顺序

- 先 blur 再 brightness ≠ 先 brightness 再 blur，最终视觉不同

兼容性

- 主流浏览器都支持

- IE 支持有限（IE 不支持 blur, drop-shadow 等）

## 阴影 box-shadow

一、基本语法

```css
box-shadow: offset-x offset-y blur-radius spread-radius color inset;
```

👉 不是所有参数都必写，最少写前两个也能生效。

二、每个参数详细解释

1️⃣ offset-x（水平偏移，必写）

```css
box-shadow: 10px 0;
```

- 正值：阴影向右

- 负值：阴影向左

2️⃣ offset-y（垂直偏移，必写）

```css
box-shadow: 0 10px;
```

- 正值：阴影向下

- 负值：阴影向上

📌 实战里最常见：y > x，更符合自然光（从上往下）

3️⃣ blur-radius（模糊半径，可选）

```css
box-shadow: 0 8px 16px;
```

- 值越大 → 阴影越柔

- 不能是负数

📌 UI 设计里最重要的一个参数

4️⃣ spread-radius（扩展半径，可选）

```
box-shadow: 0 0 0 4px rgba(0,0,0,.1);
```

- 正值：阴影变大

- 负值：阴影收缩

📌 常用于：

边框替代

- hover 高亮

- focus 状态

5️⃣ color（颜色，可选）

```css
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
```

- 支持 rgba / hsla / hex

- 强烈建议用 rgba，别用纯黑

❌ 不推荐：

```css
box-shadow: 0 4px 12px #000;
```

✅ 推荐：

```css
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
```

6️⃣ inset（内阴影，可选，关键字）

```css
box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
```

- inset → 内阴影

- 不写 → 默认外阴影

📌 常见用途：

- 输入框凹陷

- 按钮按下态

- 卡片内层层次

三、多重阴影（非常重要🔥）

box-shadow 支持多个阴影，用逗号分隔：

box-shadow:
0 1px 2px rgba(0,0,0,.05),
0 6px 20px rgba(0,0,0,.1);

📌 现代 UI 基本都用多层阴影

四、常见实战示例

✅ 1. 卡片阴影（最常用）

```css
.card {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}
```

✅ 2. 高级感卡片（推荐）

```css
.card {
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.04),
    0 8px 24px rgba(0, 0, 0, 0.08);
}
```

✅ 3. hover 悬浮效果

```css
.card {
  transition: box-shadow 0.3s ease;
}

.card:hover {
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.16);
}
```

✅ 4. focus 高亮（替代 outline）

```css
input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(64, 158, 255, 0.3);
}
```

✅ 5. 内阴影（凹陷效果）

```css
.input {
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15);
}
```

五、box-shadow vs 相关属性

| 属性                    | 作用             |
| ----------------------- | ---------------- |
| `box-shadow`            | 元素盒子阴影     |
| `text-shadow`           | 文字阴影         |
| `filter: drop-shadow()` | 图片透明区域阴影 |
| `outline`               | 不占布局的外边框 |

📌 图片 / svg 阴影优先用：

```css
filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
```

## 过渡 transition

一、`transition` 基础

`transition` 是 `CSS` 动画过渡属性，用于在属性值变化时产生平滑动画，而不需要使用 `keyframes`。

语法

```css
transition: <property> <duration> <timing-function> <delay>;
```

各个参数：

| 参数              | 说明                        | 可选性 | 默认值 |
| ----------------- | --------------------------- | ------ | ------ |
| `property`        | 哪个 CSS 属性变化时执行动画 | 可选   | `all`  |
| `duration`        | 动画持续时间                | 必须   | `0s`   |
| `timing-function` | 动画节奏                    | 可选   | `ease` |
| `delay`           | 动画延迟多久开始            | 可选   | `0s`   |

示例 1：最简单

```css
.box {
  width: 100px;
  transition: width 0.5s;
}

.box:hover {
  width: 200px;
}
```

- 效果：鼠标 hover 时，宽度平滑从 100px → 200px

- 解释：只对 width 变化生效，0.5 秒完成，默认节奏 ease，无延迟

示例 2：全部属性过渡

```css
.box {
  transition: all 0.3s ease-in-out;
}
```

- 效果：任何 CSS 属性变化都会过渡动画

- 注意：all 虽方便，但性能可能略差

timing-function 常用值

| 值                             | 描述               |          |
| ------------------------------ | ------------------ | -------- |
| `linear`                       | 匀速               |          |
| `ease`                         | 默认，先慢后快再慢 |          |
| `ease-in`                      | 由慢到快           |          |
| `ease-out`                     | 由快到慢           |          |
| `ease-in-out`                  | 先慢快再慢         |          |
| `steps(n, start                | end)`              | 分步动画 |
| `cubic-bezier(x1, y1, x2, y2)` | 自定义曲线         |          |

二、`transition-delay`

`transition-delay` 控制动画开始前的等待时间。

基本语法

```css
transition-delay: <time>;
```

- 单个值 → 所有过渡属性延迟相同时间

- 多个值 → 按顺序对应 transition 的属性

示例 1：单个延迟

```css
.box {
  transition:
    width 0.5s,
    height 0.5s;
  transition-delay: 1s; /* 两个属性都延迟 1s */
}
```

示例 2：多属性延迟

```css
.box {
transition: width 0.5s, height 0.5s;
transition-delay: 0s, 0.3s; /_ width 0s, height 0.3s _/
}
```

- 规则：顺序对应

- 如果 transition-delay 数量少于属性数量 → 循环使用

- 如果数量多 → 多余的忽略

示例 3：结合 hover

```css
.box {
  width: 100px;
  height: 100px;
  transition:
    width 0.5s,
    height 0.5s;
  transition-delay: 0s, 0.3s;
}

.box:hover {
  width: 200px;
  height: 200px;
}
```

效果：

- 宽度立即开始动画

- 高度延迟 0.3s 再开始动画

- 用于制造分步动画效果

三、完整语法示例

```css
.box {
  transition:
    width 0.5s ease-in-out 0.2s,
    height 0.7s linear 0.5s,
    box-shadow 0.3s ease 0s;
}
```

- width → 0.5 秒动画，ease-in-out，延迟 0.2 秒

- height → 0.7 秒动画，linear，延迟 0.5 秒

- box-shadow → 0.3 秒动画，ease，延迟 0 秒

## 文字渐变色

一、渲染顺序（WebKit 浏览器）

文字显示在浏览器里，大致层级是这样的：

1. 文字填充层（text-fill-color）

2. 文字描边层（text-stroke-color）

3. 背景层（background）

- color 属性其实只是 文字颜色的一个普通 CSS 属性，影响默认填充，但 在 WebKit 渲染 background-clip: text 时不会作为裁剪层

- -webkit-text-fill-color 才是 WebKit 渲染文字填充的“真实层”，background-clip: text 就是对这个层做裁剪

1️⃣ 用 color: transparent

```css
h1 {
  font-size: 80px;
  background: linear-gradient(90deg, red, blue);
  -webkit-background-clip: text;
  color: transparent; /* ❌ */
}
```

实际情况：

- color: transparent 把文字颜色置透明

- 但是 background-clip 只裁剪 text-fill-color 层

- 文字填充层默认还是 black → WebKit 不把背景显示出来 → 渐变文字失效

2️⃣ 用 -webkit-text-fill-color: transparent

```css
h1 {
  font-size: 80px;
  background: linear-gradient(90deg, red, blue);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; /* ✅ */
}
```

- text-fill-color 透明 → 文字填充层透明

- background-clip: text 裁剪背景到文字形状

- 渐变背景显示在文字形状 → 完美效果

## 浏览器自动填入账号密码

> 浏览器自动填充（autocomplete）不是普通的输入行为，它会被浏览器“强行接管样式”

## ttf字体的使用

假设你有个字体文件：

```
/assets/fonts/MyFont.ttf
```

```css [fonts.css]
@font-face {
  font-family: "MyFont";
  src: url("@/assets/fonts/MyFont.ttf") format("truetype");
}
```

```ts
// main.ts
import "@/assets/styles/fonts.css";
```

## 点击事件层级

点击事件的层级和z-index没有关系，重合是先子后父，兄弟是点击到后边的兄弟

## `clamp()` 函数式取值工具

`clamp()` 是 `CSS` 里一个非常实用的函数式取值工具，用于在「最小值 / 理想值 / 最大值」之间做自适应限制，常见于响应式布局、字体大小、间距、宽高等场景。

**基本语法**

```css
clamp(MIN, IDEAL, MAX)
```

含义：

- MIN → 最小值（不会小于它）

- IDEAL → 理想值（通常用 vw / % / calc 等）

- MAX → 最大值（不会超过它）

可以理解为：

```text
在 MIN 和 MAX 之间，尽量取 IDEAL
```

业通用可直接用的值（按 1920 设计稿）👇

| 场景        | 推荐 clamp                 |
| ----------- | -------------------------- |
| 超大标题    | `clamp(32px, 3vw, 64px)`   |
| 页面主标题  | `clamp(24px, 2.2vw, 48px)` |
| 模块标题    | `clamp(18px, 1.6vw, 32px)` |
| 卡片标题    | `clamp(16px, 1.2vw, 24px)` |
| 正文 / 表格 | `clamp(14px, 0.9vw, 18px)` |
| 辅助文字    | `clamp(12px, 0.7vw, 16px)` |

| 场景            | clamp 推荐                 |
| --------------- | -------------------------- |
| 页面外边距      | `clamp(16px, 2vw, 48px)`   |
| 模块间距        | `clamp(12px, 1.5vw, 32px)` |
| 卡片 padding    | `clamp(12px, 1.2vw, 24px)` |
| 大模块 padding  | `clamp(16px, 1.8vw, 40px)` |
| grid / flex gap | `clamp(8px, 1vw, 24px)`    |
| 按钮 padding    | `clamp(6px, 0.8vw, 16px)`  |

## `aspect-ratio` 只给宽（或高），另一个按比例自动算

**语法说明**

```css
aspect-ratio: 宽 / 高;
```

常见比例：

| 比例     | 写法     |
| -------- | -------- |
| 正方形   | `1 / 1`  |
| 视频     | `16 / 9` |
| 竖屏视频 | `9 / 16` |
| 海报     | `3 / 4`  |
| 卡片     | `4 / 3`  |

```css
.video {
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #000;
}
```

## `cqw`

- cqw = container query width

- 1cqw = 父容器宽度 1%

```css
.card {
  container-type: inline-size;
}

.title {
  font-size: 10cqw;
}
```

> ❌ 不能“自动用任意祖先”
> ✅ 只能用“被声明为 container 的祖先”
> 👉 默认取“最近的那个 container 祖先”

```
元素自己
↑
最近的 container 祖先
↑
再往上找 container
↑
直到 root
```

## 图片地址设置成css变量

```html
<div
  :style="{
        '--bg': `url(${props.bg})`,
        '--bg2': `url(${props.bg2})`,
        '--bgcolor': props.bgcolor,
        '--bgcolor2': props.bgcolor2,
        '--bgcolor3': props.bgcolor3,
        '--color': props.color,
        '--color2': props.color2,
        '--color3': props.color3,
    }"
></div>
```

```css
background-image: var(--bg);
background-size: cover; /* 关键：铺满 */
background-position: center; /* 居中 */
background-repeat: no-repeat; /* 不重复 */
```

- 将地址先用url处理，再传给变量

- 注意，这种不能传svg图片，识别不出来,网址里边是svg图片，可以

## svg代码转图片地址使用

```ts
const svg1 = `<svg t="1770600034843" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7586" width="200" height="200"><path d="M932.730435 662.750609V361.249391c25.889391-14.246957 46.614261-42.674087 46.614261-76.8 0-48.350609-33.680696-85.348174-77.690435-85.348174-18.120348 0-36.262957 8.548174-49.196522 19.923479l-266.729739-153.6C577.958957 28.449391 546.882783 0 510.664348 0c-38.845217 0-72.503652 31.298783-77.690435 73.950609L176.595478 224.701217c-12.955826-17.051826-33.680696-25.6-54.383304-25.6-44.032 0-77.690435 36.997565-77.690435 85.348174 0 39.824696 25.889391 73.950609 59.547826 82.476522v290.148174C70.41113 665.6 44.521739 699.725913 44.521739 739.550609c0 48.350609 33.658435 85.348174 77.690435 85.348174 20.702609 0 41.427478-8.548174 54.383304-25.6l256.356174 150.750608c5.186783 42.651826 36.240696 73.950609 77.690435 73.950609 36.240696 0 67.31687-28.449391 75.085913-65.424696l264.125217-153.6c12.955826 11.375304 31.076174 19.923478 49.196522 19.923479 44.032 0 77.690435-36.997565 77.690435-85.348174 0-34.125913-18.120348-62.553043-44.009739-76.8z m-88.041739 14.246956l-121.722435-65.446956v-199.101218l121.722435-65.446956c10.351304 11.397565 20.702609 17.096348 33.658434 19.923478v290.148174c-12.955826 2.82713-23.30713 11.353043-33.658434 19.901217z m-23.307131-381.172869l-126.886956 68.274087-157.963131-99.57287V164.975304c18.120348-8.525913 33.658435-22.750609 41.427479-39.824695l243.422608 142.246956v28.427131z m-302.970435 409.6l-155.380869-96.723479v-193.402434l155.380869-96.723479 155.38087 96.723479v193.402434l-155.38087 96.723479zM484.730435 164.953043v105.249392l-152.776348 96.701217L199.902609 295.846957v-19.923479l245.982608-145.051826c7.791304 17.051826 23.30713 28.449391 38.845218 34.125913zM176.595478 347.046957l134.656 73.950608v184.898783l-134.678261 73.950609c-5.164522-5.698783-12.933565-11.375304-20.702608-17.074087V361.249391c7.769043-2.849391 12.955826-8.548174 20.702608-14.246956zM199.902609 728.153043l132.051478-73.950608 152.776348 96.701217v105.249391c-15.538087 5.698783-31.076174 17.074087-38.822957 34.125914L199.902609 748.098783v-19.901218z m336.628869 130.849392v-99.550609l160.545392-99.572869 126.886956 68.274086v11.375305c0 5.698783 0 11.375304 2.582261 17.074087l-243.400348 142.224695c-12.955826-19.923478-28.493913-34.148174-46.614261-39.846956z" fill="#41B9D4" p-id="7587"></path></svg>`;
const img1 = "data:image/svg+xml;utf8," + encodeURIComponent(svg1);
```
