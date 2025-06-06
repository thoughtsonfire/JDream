# 元素  

## `nodeType` 常量列表  

| 常量名                           | 值    | 描述                      |
| ----------------------------- | ---- | ----------------------- |
| `ELEMENT_NODE`                | `1`  | 元素节点                    |
| `ATTRIBUTE_NODE`（废弃）          | `2`  | 属性节点（已弃用，请勿使用）          |
| `TEXT_NODE`                   | `3`  | 文本节点                    |
| `CDATA_SECTION_NODE`          | `4`  | CDATA 区段节点（仅限 XML）      |
| `ENTITY_REFERENCE_NODE`       | `5`  | 实体引用节点（已弃用）             |
| `ENTITY_NODE`                 | `6`  | 实体节点（已弃用）               |
| `PROCESSING_INSTRUCTION_NODE` | `7`  | 处理指令节点（如 XML 声明）        |
| `COMMENT_NODE`                | `8`  | 注释节点                    |
| `DOCUMENT_NODE`               | `9`  | 文档根节点（`document`）       |
| `DOCUMENT_TYPE_NODE`          | `10` | DOCTYPE 节点              |
| `DOCUMENT_FRAGMENT_NODE`      | `11` | 文档片段节点                  |
| `NOTATION_NODE`               | `12` | 表示 DTD 中的 notation（已弃用） |
>⚠️ 2、5、6、12 等节点类型基本已废弃或仅用于 XML。

✅ 实际开发你只需要记住这些常用的：

| 类型名                      | nodeType | 用途                      |
| ------------------------ | -------- | ----------------------- |
| `ELEMENT_NODE`           | `1`      | HTML 元素，如 `<div>`       |
| `TEXT_NODE`              | `3`      | 文本，如 `"Hello"`          |
| `COMMENT_NODE`           | `8`      | 注释，如 `<!-- comment -->` |
| `DOCUMENT_NODE`          | `9`      | 整个文档对象 `document`       |
| `DOCUMENT_FRAGMENT_NODE` | `11`     | 用于性能优化的 DOM 片段          |

## 一、获取元素

### 1. querySelector()  

>[!TIP]document.querySelector()  
>
>**作用**：使用 CSS 选择器语法获取第一个匹配的元素。
>
>**示例**：
>
>```js
>const firstItem = document.querySelector('.item');
>```



### 2. getElementById()  

>[!TIP]document.getElementById()  
>
>**作用**：通过元素的 id 获取单个元素。
>
>**返回值**：返回一个 Element，找不到返回 null。
>
>**示例**：
>
>```js
>const el = document.getElementById('myDiv');
>```


### 3. getElementsByClassName()  

>[!IMPORTANT]document.getElementsByClassName()  
>
>作用：通过 class 名获取一组元素。
>
>返回值：HTMLCollection，类数组。
>
>示例：
>
>```js
>const items = document.getElementsByClassName('item');
>```


### 4. getElementsByTagName()

>[!IMPORTANT]document.getElementsByTagName()
>
>作用：通过标签名获取元素集合。
>
>返回值：HTMLCollection
>
>示例：
>
>```js
>const divs = document.getElementsByTagName('div');
>```

### 5. querySelectorAll()

>[!IMPORTANT] document.querySelectorAll()
>
>作用：获取所有匹配的元素。
>
>返回值：NodeList，可以用 forEach 遍历。
>
>示例：
>
>```js
>const allItems = document.querySelectorAll('.item');
>```


## 二、获取父子兄弟元素  

### 1.获取父元素  

| 方法名             | 示例代码               | 说明                |
| --------------- | ------------------ | ----------------- |
| `parentNode`    | `el.parentNode`    | 返回直接父节点（包括文本、注释等） |
| `parentElement` | `el.parentElement` | 返回父元素（排除文本、注释）    |

```js
const el = document.querySelector('.child');
const parent = el.parentElement;
```

### 2. 获取子元素  

| 方法名                 | 示例代码                   | 返回类型             | 说明            |
| ------------------- | ---------------------- | ---------------- | ------------- |
| `children`          | `el.children`          | `HTMLCollection` | 所有子元素（不含文本）   |
| `childNodes`        | `el.childNodes`        | `NodeList`       | 所有子节点（含文本/注释） |
| `firstElementChild` | `el.firstElementChild` | `Element`        | 第一个子元素        |
| `lastElementChild`  | `el.lastElementChild`  | `Element`        | 最后一个子元素       |


```js
const parent = document.querySelector('.box');
const firstChild = parent.firstElementChild;
```


### 3. 获取祖先元素  

| 方法名                 | 示例代码                                | 说明                        |
| ------------------- | ----------------------------------- | ------------------------- |
| `closest(selector)` | `el.closest('.container')`          | 找到最近的祖先元素，**包括自己**（符合选择器） |
| 多次 `parentElement`  | `el.parentElement.parentElement...` | 层层向上查找                    |


```js
const btn = document.querySelector('button');
const section = btn.closest('section');
```


### 4. 获取孙元素（子元素的子元素）  

- 孙元素没有专门方法，一般通过层层查找实现



## 三、生成元素（创建新节点）  

### 1. 创建一个新的 DOM 元素

**作用**：创建一个新的 DOM 元素（标签）。

**示例**：

```js
const newDiv = document.createElement('div');
newDiv.className = 'box';
newDiv.innerText = 'Hello';
```

### 2. 设置属性/内容

- 常用设置方法：

```js
newDiv.id = 'myBox';
newDiv.setAttribute('data-type', 'info');
newDiv.textContent = 'This is content';
```

### 3. 创建文本节点（不常用）

- 可用于精细控制：

```js
const textNode = document.createTextNode('Some text');
newDiv.appendChild(textNode);
```


## 四、插入元素（添加到页面）

### 对比表

**DOM 插入节点 API 对比表（精简版）**

| 方法名              | 作用位置      | 接收参数类型           | 支持多个参数 | 支持字符串 | 返回值     |
| ---------------- | --------- | ---------------- | ------ | ----- | ------- |
| `appendChild()`  | 作为子元素最后插入 | 单个 Node          | ❌      | ❌     | 返回插入节点  |
| `insertBefore()` | 插入到指定子元素前 | 插入 Node, 参照 Node | ❌      | ❌     | 返回插入节点  |
| `replaceChild()` | 替换某个子节点   | 新节点，旧节点          | ❌      | ❌     | 返回被替换节点 |
| `append()`       | 作为子元素最后插入 | Node 或字符串        | ✅      | ✅     | 无       |
| `prepend()`      | 作为子元素最前插入 | Node 或字符串        | ✅      | ✅     | 无       |
| `after()`        | 插入当前元素之后  | Node 或字符串        | ✅      | ✅     | 无       |
| `before()`       | 插入当前元素之前  | Node 或字符串        | ✅      | ✅     | 无       |


🔍 **使用建议（现代浏览器）**

| 场景            | 推荐方法                         |
| ------------- | ---------------------------- |
| 插入一个节点（兼容性优先） | `.appendChild()`             |
| 插入多个节点或文本     | `.append()` / `.prepend()`   |
| 插入兄弟节点        | `.before()` / `.after()`     |
| 精确控制插入位置      | `.insertBefore()`            |
| 替换一个已有节点      | `.replaceChild()`            |
| 插入纯字符串（文本）    | `.append()` / `.prepend()`   |
| 插入 HTML（含标签）  | `.innerHTML = '...'`（不安全，慎用） |


### 1. appendChild()

**作用**：添加为父元素的最后一个子元素。

**注意**：

| 问题                          | 回答                                               |
| --------------------------- | ------------------------------------------------ |
| `.appendChild()` 可以插入文本元素吗？ | ✅ 可以，但必须是通过 `document.createTextNode()` 创建的文本节点。 |
| 可以直接传字符串吗？                  | ❌ 不行，需用 `createTextNode()` 包装成 Node。             |
| 更推荐的方式？                     | ✅ 用 `.append()` 更灵活；用 `.textContent` 设置纯文本更简单。   |


**示例**：

```js
const container = document.getElementById('container');
container.appendChild(newDiv);
```


### 2. prepend()（现代浏览器支持）

**作用**：插入为第一个子元素。 

```js
container.prepend(newDiv);
```


### 3. insertBefore()

**作用**：在某个节点之前插入。

```js
container.insertBefore(newDiv, container.firstChild);
```


### 4. insertAdjacentElement() / insertAdjacentHTML()

**位置**：

- `beforebegin`：元素自身前面

- `afterbegin`：作为第一个子元素

- `beforeend`：作为最后一个子元素

- `afterend`：元素自身后面

**示例**：

```js
el.insertAdjacentHTML('beforeend', '<p>Inserted</p>');
```

### 5. append(...nodesOrStrings)

- 插入到子元素最后

- 可同时插入多个节点或文本字符串

- 不返回值

```js
parent.append('hello', document.createElement('span'));
```

### 6. after(...nodesOrStrings)

- 不是子元素，是“当前元素后面”添加同级兄弟元素

```js
someElement.after('我是兄弟', anotherElement);
```

### 7. before(...nodesOrStrings)

- 插入到当前元素前面作为兄弟元素

```js
someElement.before('我是前面的兄弟');
```


## 五、修改元素（样式、内容、属性）  

1. 修改样式  

```js
el.style.backgroundColor = 'red';
el.style.width = '100px';
```

2. 修改类名

```js
el.classList.add('active');
el.classList.remove('hidden');
el.classList.toggle('dark-mode');
```

3. 修改属性  

```js
el.setAttribute('disabled', true);
el.removeAttribute('data-id');
```

4. 修改内容  

```js
el.innerText = 'New text';
el.innerHTML = '<strong>HTML内容</strong>';
```

## 六、删除元素

1. removeChild()  

```js
parent.removeChild(child);
```

2. element.remove()（现代浏览器）

```js
el.remove();
```


## 七、事件绑定（动态生成后操作）

生成的元素需要通过事件代理或者绑定事件操作：  


1. 事件绑定  

```js
newDiv.addEventListener('click', () => {
  alert('点击了新元素');
});
```

2. 事件代理（推荐用于动态生成的元素）

```js
document.body.addEventListener('click', (e) => {
  if (e.target.classList.contains('item')) {
    console.log('点击了 item');
  }
});
```

## 八、事件移除

**监听页面关闭的原生事件**

| 事件名称               | 说明                            | 可用性              |
| ------------------ | ----------------------------- | ---------------- |
| `beforeunload`     | 页面刷新/关闭/跳转前触发（可阻止离开）          | ✅ 常用             |
| `unload`           | 页面即将被卸载（不能阻止，清理用途）            | ❗大多浏览器限制，仅支持同步代码 |
| `visibilitychange` | 页面隐藏（如切换 tab、最小化）             | ✅ 辅助用            |
| `pagehide`         | 离开页面（支持 bfcache），比 unload 更现代 | ✅ 较新             |

- 关闭页面时浏览器会自动清理事件和 DOM，移除主要用于逻辑清晰  

```js
function handleScroll() {
  console.log('正在滚动...');
}

window.addEventListener('scroll', handleScroll);

window.addEventListener('beforeunload', () => {
  // 页面关闭前移除监听器
  window.removeEventListener('scroll', handleScroll);
  console.log('已移除滚动事件');
});
```

⚠️ **注意事项** 

| 项目                          | 说明                                         |
| --------------------------- | ------------------------------------------ |
| `beforeunload` 支持阻止         | 可通过 `event.preventDefault()` 显示提示用户是否离开    |
| `unload` 支持差                | 某些现代浏览器已限制其使用，不能执行异步代码                     |
| 不要写异步清理代码                   | 事件触发后立即卸载，**异步代码不会生效**（如 setTimeout、fetch） |
| `removeEventListener` 实际可省略 | 关闭页面时浏览器会自动清理事件和 DOM，移除主要用于逻辑清晰            |
