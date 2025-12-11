# Plotly

**两个比较好用的中文网站**

<LinkCard url="https://www.cnblogs.com/traditional/p/12505154.html" title="可视化神器plotly(1)：基础图表与画布、坐标轴 作者：@古明地盆" description="https://www.cnblogs.com/traditional/p/12505154.html" />

<LinkCard url="https://daobook.github.io/plotly-book/tutorial/index.html" title="plotly.py api中文文档 作者：@上善若水" description="https://daobook.github.io/plotly-book/tutorial/index.html" logo='https://daobook.github.io/plotly-book/_static/page-logo.jfif'/>

## Plotly 是什么？

Plotly 是一个 交互式可视化库：

- 图表默认为可缩放、悬浮显示、导出图片

- 支持网页展示

- 支持上百种图表（折线、柱状、地图、3D、动画）

核心模块是 plotly.express（简单） 和 plotly.graph_objects（高级）。

## 安装

```bash
pip install plotly
```

超时用国内镜像

```bash
pip install plotly -i https://pypi.tuna.tsinghua.edu.cn/simple
```

## 快速上手：最常用图表

### 折线图 Line Chart

```py
import plotly.express as px
import pandas as pd

df = pd.DataFrame({
    "day": ["Mon","Tue","Wed","Thu","Fri"],
    "value": [10, 15, 13, 17, 22]
})

fig = px.line(df, x="day", y="value", title="折线图示例")
fig.update_layout(
    title="自定义标题",
    xaxis_title="横轴",
    yaxis_title="纵轴",
    template="plotly_white",
    legend_title="图例标题",
)

# 设置线条属性
fig.update_traces(
    line=dict(
        width=4,          # 粗细
        color="red"       # 颜色，也可 "#ff0000"
    )
)
fig.show()
```

### 柱状图 Bar Chart

```py
import plotly.express as px
import pandas as pd

df = pd.DataFrame({
    "city": ["Tokyo", "Osaka", "Nagoya"],
    "population": [37, 19, 9]
})

fig = px.bar(df, x="city", y="population", title="柱状图")
fig.show()
```
