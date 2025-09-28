# 实用js  

## 获取网站logo

```js 
//在控制台输入
document.querySelector('link[rel*="icon"]')?.href
```


## 开启页面编辑  

- 用处不大，直接元素也能改

```js
//在控制台输入
document.designMode = "on"
```

```js
//也能实现Iframe嵌套页面的编辑
iframeNode.contentDocument.designMode = "on"
```

## 页面不让复制

```js
//在控制台输入
// 移除所有元素上的监听器（暴力版）
document.querySelectorAll('*').forEach(el => {
  el.oncopy = null;
  el.onpaste = null;
  el.oncontextmenu = null;
  el.onselectstart = null;
});
```

```js
//在控制台输入
//控制台提取文字
const paragraphs = Array.from(document.querySelectorAll('div, p, span')).filter(el => el.innerText?.trim());
const text = paragraphs.map(el => el.innerText.trim()).join('\n');
console.log(text);
```

```js
//在控制台输入
//如果内容在 iframe，需要切进去
const frame = document.querySelector('iframe');
const doc = frame.contentDocument || frame.contentWindow.document;
const text = Array.from(doc.querySelectorAll('div')).map(el => el.innerText).join('\n');
console.log(text);
```

- 图片，则在网络中找到，太多可以筛选，预览中以数据url复制


## 前端获取文件夹内的文件名  

| 功能   | Vite (`import.meta.glob`)      | Webpack (`require.context`) |
| ---- | ------------------------------ | --------------------------- |
| 静态分析 | ✅ 构建时扫描                        | ✅ 构建时扫描                     |
| 懒加载  | 默认懒加载，`{ eager: true }` 变成立即导入 | 默认立即导入                      |
| 语法   | `import.meta.glob("...")`      | `require.context("...")`    |
| 输出结果 | 返回对象（路径 → 模块）                  | 返回上下文函数，可调用 `.keys()`       |


使用示例（Vue3 + Vite）

```ts
// 会得到一个对象： key 是文件路径，value 是文件模块
const svgs = import.meta.glob('@/assets/svg/mon/*.svg', { eager: true })

// 文件路径数组
const files = Object.keys(svgs)

// 文件内容（取决于 vite-svg-loader 等插件怎么处理）
console.log(files, svgs)
```

在 webpack 里  

```js
// 参数：目录, 是否递归, 匹配正则
const svgs = require.context('@/assets/svg/mon', false, /\.svg$/)

// 所有文件路径（相对路径）
const files = svgs.keys()

// 获取某个文件内容
files.forEach((key) => {
  const mod = svgs(key)
  console.log(key, mod)
})
```

⚠️ **注意**  

- webpack 里 require.context 是 运行时可调用的函数，用 .keys() 得到所有匹配路径，再传入函数得到模块。

- vite 的 import.meta.glob 则直接返回一个对象，更直观。
