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