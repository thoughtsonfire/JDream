# openlayers 概览

## 官网

<LinkCard url="https://openlayers.org/" title="OpenLayers官方地址" description="https://openlayers.org/" logo="https://openlayers.org/theme/img/logo-light.svg"/>

<LinkCard url="https://github.com/openlayers/openlayers" title="GitHub 仓库" 
description="https://github.com/openlayers/openlayers" logo="/JDream/imgs/logo/github.png" />

<LinkCard url="https://www.npmjs.com/package/ol" title="NPM 包页面" 
description="https://www.npmjs.com/package/ol" logo="/JDream/imgs/logo/npm.png" />

:::code-group

```bash [pnpm]
pnpm install ol
```

```bash [npm]
npm install ol
```

:::

## OpenLayers 的核心层级结构（由上到下）

### 1. Map（地图）——最顶层容器

代表整个地图实例，负责：

渲染

- 鼠标事件（click / move / drag…）

- 管理 layers（图层）

- 管理 overlays（弹窗、控件）

👉 一个页面可以有多个 Map 实例，但每个 Map 绑定一个 DOM 容器。

### 2. View（视图）——控制地图展示的方式

用于控制地图显示区域、缩放、旋转等。

主要属性：

- center: 地图中心点

- zoom: 缩放级别

- rotation: 旋转角度

- projection: 投影（默认 EPSG:3857）

👉 View 控制你看到什么。

### 3. Layer（图层）——显示不同类型的数据

OpenLayers 中一切可见内容都在 Layer 中。

分为两大类：

1. TileLayer（瓦片图层）

显示地图底图、卫星图、离线瓦片等。

常见 source：

- OSM()

- XYZ()

- TileWMS()

👉 底图通常是 TileLayer。

2. VectorLayer（矢量图层）

显示点、线、面等几何对象（交互最常用）。

source：

- VectorSource()

几何对象由 Feature + Geometry 组成。

👉 点击点显示信息，就是在 VectorLayer 上处理。

### 4. Source（数据源）——图层的数据来源

Layer 不直接存数据，它只渲染 Source 里的数据。

不同 Layer 对应不同 Source：

| Layer 类型  | Source 类型        |
| ----------- | ------------------ |
| TileLayer   | OSM, XYZ, TileWMS… |
| VectorLayer | VectorSource       |
| ImageLayer  | ImageWMS 等        |

### 5. Feature（要素）——矢量数据的载体

Feature 是一个“对象”，比如：

- 一个点（Point）

- 一条线（LineString）

- 一个多边形（Polygon）

Feature 包含：

- geometry（位置形状）

- properties（属性，如 name、id、desc）

👉 你点击点看到的信息，就是 Feature 的 attribute。

### 6. Geometry（几何对象）——具体形状

Feature 的 geometry 决定要素的类型：

- Point

- LineString

- Polygon

- Circle

- MultiPoint

- MultiPolygon

👉 Geometry 负责空间位置，Feature 负责附加属性。

### 7. Style（样式）——图层或要素的外观

用于控制 Feature 的可视化：

- 图标 Icon

- 圆点 Circle

- 线条 Stroke

- 填充 Fill

- 文本 Label

👉 样式可以绑定：

整个 VectorLayer（统一样式）

单个 Feature（个性化样式）

### 8. Overlay（覆盖物）——信息框、弹窗、HTML 内容

Overlay 是 HTML DOM，不是 Canvas 绘制。

通常用于：

- Popup 信息框

- 标签

- 自定义浮动元素

👉 Overlay 是用 HTML + CSS 放到地图上的。

### 总结一张图（非常重要）

```css
Map
 ├── View（控制中心、缩放）
 ├── Layers（图层列表）
 │     ├── TileLayer → Source(OSM/XYZ)
 │     └── VectorLayer → VectorSource → Feature → Geometry
 └── Overlays（DOM 弹窗）
```

## 思考与辨别

| 你看到的对象   | OpenLayers 类型   | 属于 Feature 吗？                |
| -------------- | ----------------- | -------------------------------- |
| 小车（图标）   | Point + IconStyle | ✔ 是 Feature                     |
| 轨迹线         | LineString        | ✔ 是 Feature                     |
| 圆             | Circle            | ✔ 是 Feature                     |
| 多边形         | Polygon           | ✔ 是 Feature                     |
| 折线测距结果   | LineString        | ✔ 是 Feature                     |
| 测量时的提示点 | Point             | ✔ 是 Feature                     |
| 热力图单个点   | Point             | ✔ 是 Feature（然后被热力源处理） |

唯一不是 Feature 的：
❌ Overlay（弹窗、信息框）
Overlay 是 HTML 节点，不是 Feature。

- VectorLayer + VectorSource 管理的是 Feature（要素）

- Feature.geometry 决定位置（Point/LineString/Polygon）

- Feature.style 决定外观（圆、线、面、图片 Icon）

当你设置 Feature 的 Icon 样式时，OpenLayers 会 在 Canvas 上绘制这张图片，显示在对应坐标上。

⚠️ 注意：它不是 `HTML` `<img>` 标签，也不是 `DOM` 元素，而是 `Canvas` 上绘制的像素。
