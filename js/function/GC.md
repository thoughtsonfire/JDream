# 垃圾回收  

>[!TIP]说明
>JavaScript 的垃圾回收（Garbage Collection, GC）是一种自动内存管理机制，旨在回收不再被使用的内存空间，避免内存泄漏，从而提升程序性能和稳定性。  


## 一、基本原理  

🌱 **JavaScript 的内存管理机制：**  

1. 内存分配：当你创建变量、对象或函数时，JS 引擎会为它们分配内存。

2. 内存使用：程序运行时读取和修改这些内存中的数据。

3. 内存释放：当某些数据不再可访问时，垃圾回收器会释放它所占的内存。  


## 二、常见的垃圾回收策略  

### 1. 引用计数（Reference Counting）  

- 原理：一个对象有一个“引用计数”，被引用一次就 +1，引用被删除就 -1，引用数为 0 时被回收。

- 缺点：无法处理 循环引用（两个对象相互引用，导致永远不为 0）。

### 2. 标记-清除（Mark and Sweep）（现代主流）  

- 原理：

    - 从根对象（如全局对象 window）开始，标记所有能从根访问到的对象；

    - 没有被标记的对象被认为是“不可达”，可以清除。

- 优势：可以解决循环引用问题。


## 三、什么对象会被回收？  

以下情况的对象会被 GC 回收：  

| 情况            | 示例             |
| ------------- | -------------- |
| 局部变量函数执行完毕    | 函数内定义的变量       |
| 对象不再被引用       | `obj = null`   |
| 闭包中的变量没有被外部引用 | 内部函数执行完后外部不再引用 |


## 四、内存泄漏常见原因  

> **全局变量**：未用 `let` / `const` 声明的变量会挂载在 `window`，导致一直被引用。

> **闭包**：长期存在的闭包中引用了大量数据。

> **DOM 引用未清理**：事件监听器未解绑，仍持有 `DOM`。如果 DOM 元素已经被从页面中移除（如 element.remove()），但绑定在该元素上的事件监听器还存在引用，它仍然会占用内存，并不会被垃圾回收。

> **缓存过多**：长时间保存数据或使用不当的缓存策略。  

## 五、如何避免内存泄漏？  

### 1、使用 `let` / `const`，避免不必要的全局变量。

>在块级作用域中 `var`可能被提升到全局

| 情况                          | 是否提升             | 提升到哪里      | 是否污染全局                 |
| --------------------------- | ---------------- | ---------- | ---------------------- |
| 在函数内用 `var`                 | ✅ 会提升            | 当前函数作用域顶部  | ❌ 不污染全局                |
| 在全局用 `var`                  | ✅ 会提升            | 全局作用域顶部    | ✅ 会成为全局变量（挂到 `window`） |
| 在块作用域中用 `var`（如 `if`、`for`） | ✅ 会提升            | 当前函数或全局作用域 | ✅/❌ 取决于是否在函数内          |
| 用 `let` / `const`           | ❌ 不提升（或说“暂时性死区”） | 只在块作用域内生效  | ❌ 不污染全局                |


### 2、用完及时 `null` 掉大型对象引用。  

| 情况                        | JS 行为              | 占内存                       | 说明                                       |
| ------------------------- | ------------------ | ------------------------- | ---------------------------------------- |
| `a` 未定义                   | 报错（ReferenceError） | ❌ 不占                      | 变量未声明，JS 引擎没有为它分配空间                      |
| `let a;`                  | 值为 `undefined`     | ✅ 占一点                     | 变量存在，默认值为 `undefined`，占一小块内存保存标识符和值      |
| `let a = undefined;`      | 值为 `undefined`     | ✅ 占一点                     | 和上面一样，手动赋值无区别，变量存在，值是 `undefined`        |
| `let a = null;`           | 值为 `null`          | ✅ 占一点                     | 变量存在，值为 `null`，内存上与 `undefined` 类似，占一点空间 |
| `let a = {}` → `a = null` | 清空对象引用，值为 `null`   | ✅ 占一点（变量）<br>❌ 原对象内存可被 GC | 原对象若无其他引用会被回收，只留下 `a = null`（变量仍占一小点内存）  |



>为什么一般用 `null` 而不用 `undefined`
> `null` 和 `undefined` 都能断开对象引用
> `null` 表示：“我明确地要清空这个值，它曾经有意义，现在无效了”。
> `undefined` 表示：“这个值未定义”，更多用于系统层面（变量未赋值、函数无返回值）。  

```js
user = null       // ✅ 表示“我主动把 user 清空了”
user = undefined  // 😕 看不出是“没赋值”还是“我要清空”
```

| 项                      | 内容                       |
| ---------------------- | ------------------------ |
| `obj = null` 是否立即释放内存？ | ❌ 不是立即，而是“断开引用”，等 GC 再回收 |
| 设置为 `null` 后变量还占内存吗？   | ✅ 占极少内存，仅保存标识符和值         |
| 内存是否真正释放？              | 要看是否还有其他引用指向原对象          |


### 3、小心使用闭包，不要无意中持有过多外部变量。

闭包 可以被GC自动回收，但必须断开闭包的引用

```js
function outer() {
  let bigData = new Array(1000000).fill('x') // 很大
  return function inner() {
    console.log(bigData[0])
  }
}

let fn = outer() // 创建了闭包
```
- outer 执行完毕，本地作用域按理说该释放；

- 但 fn 仍然引用着 bigData（通过闭包）；

- 所以 bigData 不会被 GC 回收；

- 占用的内存仍然存在。

```js
fn = null // ✅ 断开闭包引用
```

- inner 不再被引用；

- bigData 也随之变成“不可达”对象；

- 🔥 垃圾回收器会在稍后回收它们，占用的内存会释放。



### 4、解绑不再需要的事件监听器。

> 如果 DOM 元素已经被从页面中移除（如 element.remove()），但绑定在该元素上的事件监听器还存在引用，它仍然会占用内存，并不会被垃圾回收。

| 场景                | 是否需要解绑                    |
| ----------------- | ------------------------- |
| 页面跳转 / SPA 页面卸载   | ✅ 必须解绑                    |
| 组件销毁（如 Vue、React） | ✅ 必须解绑                    |
| 动态创建的 DOM 元素      | ✅ 必须解绑                    |
| 一次性事件（如点击后只执行一次）  | ✅ 可解绑或使用 `{ once: true }` |


| 方式                                      | 是否需要手动清理                     | 为什么                                                               |
| --------------------------------------- | ---------------------------- | ----------------------------------------------------------------- |
| `element.onclick = fn`（事件属性）            | ❌ 不强制，但 ✅建议                  | 函数作为 DOM 的属性，只要 DOM 被回收，函数也会被回收（除非被其他地方引用）                        |
| `element.addEventListener('click', fn)` | ✅ 推荐手动 `removeEventListener` | 浏览器可能在内部**使用事件监听器表**（引用了你传入的函数），即使 DOM 被移除，**函数仍可能存在于内存中**，造成内存泄漏 |


1. 函数不要匿名，确保可以解绑

```js
function handleClick() {
  console.log('clicked')
}
btn.addEventListener('click', handleClick)
btn.removeEventListener('click', handleClick)
```

❌ 错误示例（无法解绑）：

```js
btn.addEventListener('click', () => {
  console.log('clicked')
})
btn.removeEventListener('click', () => {
  console.log('clicked')
}) // ❌ 不生效，函数引用不同
```
2. Vue/React 等组件中：在组件销毁时解绑

```js [vue]
mounted() {
  window.addEventListener('resize', this.onResize)
},
beforeDestroy() {
  window.removeEventListener('resize', this.onResize)
}
```

```js [react]
useEffect(() => {
  const handleResize = () => { ... }
  window.addEventListener('resize', handleResize)

  return () => {
    window.removeEventListener('resize', handleResize)
  }
}, [])
```

3. 自动解绑方式

- 使用 `{ once: true }` 选项（事件触发一次自动解绑）：

```js
btn.addEventListener('click', handleClick, { once: true })
```

- 使用 `AbortController`（现代浏览器支持，统一解绑）：

```js
const controller = new AbortController()
btn.addEventListener('click', handleClick, { signal: controller.signal })

// 解绑所有相关监听器
controller.abort()
```
📋 **总结**  

| 做法                        | 是否推荐  | 原因     |
| ------------------------- | ----- | ------ |
| 统一管理事件监听器并在适当时机解绑         | ✅ 推荐  | 防止泄漏   |
| 给监听函数命名引用                 | ✅ 推荐  | 便于解绑   |
| 使用 once 或 AbortController | ✅ 推荐  | 自动清理机制 |
| 绑定匿名函数直接传入                | ❌ 不推荐 | 无法解绑   |


### 5、避免在数据结构中缓存无用对象（如 `Map`, `Set`）。

**为什么会造成内存泄漏？**  

`Map` 和 `Set` 是强引用容器，只要你把对象放进去，它就不会被垃圾回收（GC），即使这个对象在其他地方已经不再使用。

**举例说明问题：**  

```js
const cache = new Map()

function processUser(user) {
  // 假设 user 是一个对象
  cache.set(user.id, user)
}
```

- 这个 `user` 对象一旦放入 `Map`，就被强引用。

- 即使前端页面不再使用该用户对象，垃圾回收器也不会释放内存。

- 如果你频繁缓存类似数据，却从不清理，内存会不断增长 —— 这就是 内存泄漏。

**正确做法**  

1. 定期清理不再需要的对象

```js
const cache = new Map()

function processUser(user) {
  // 假设 user 是一个对象
  cache.set(user.id, user)
}

function removeUser(userId) {
  cache.delete(userId)
}
```

2. 控制缓存大小（LRU 策略）

```js
const cache = new Map()

function processUser(user) {
  // 假设 user 是一个对象
  cache.set(user.id, user)
}

function removeUser(userId) {
  cache.delete(userId)
}

if (cache.size > MAX_SIZE) {                        // [!code focus]
  // 删除最早的条目                                 // [!code focus]
  const firstKey = cache.keys().next().value        // [!code focus]
  cache.delete(firstKey)                            // [!code focus]
}                                                   // [!code focus]
```

3. 使用 WeakMap / WeakSet 缓存“弱引用对象”  

如果你不需要手动清除，可以使用弱引用结构：

```js
const weakCache = new WeakMap()

function processUser(user) {
  weakCache.set(user, someValue)
}
```

✅ `WeakMap` 中的键必须是对象，且不会阻止对象被回收，非常适合临时缓存。

✅ 什么时候用 WeakMap / Map？

| 场景                     | 用法            | 推荐结构        |
| ---------------------- | ------------- | ----------- |
| 临时缓存、辅助数据绑定对象（不需要手动清理） | 比如缓存 DOM 元素属性 | `WeakMap` ✅ |
| 数据生命周期由你控制，需要显式删除或管理   | 比如用户缓存、LRU 缓存 | `Map` ✅     |
| 需要对象列表，不重复，但不主动清理      | `Set` 保存对象引用  | 小规模可以，需谨慎   |
| 有大量短生命周期数据             | 强缓存（Map/Set）  | ❌ 容易泄漏      |

### 高风险场景（要特别注意）

| 场景                          | 问题           |
| --------------------------- | ------------ |
| 缓存 DOM 元素引用但不清除             | 页面切换后仍占内存    |
| 保存大型 JSON 数据（API 响应）但不释放    | 数据一直留在内存中    |
| 给 React/Vue 组件绑定数据后，组件销毁未清理 | 数据保留，GC 无法回收 |


## WeakMap

**特点**  

| 特性     | 说明                                       |
| ------ | ---------------------------------------- |
| 键必须是对象 | `{}、DOM元素、函数、类实例等`                       |
| 弱引用键   | 如果键对象没有其他引用，就会被 GC 回收，**键值对自动消失**        |
| 不可遍历   | `不能 size / keys / values / entries`，避免泄漏 |

**用途**  

| 用途                | 说明               | 示例                      |
| ----------------- | ---------------- | ----------------------- |
| 1. 给对象存“私有数据”     | 外部对象不可见，内部逻辑可取   | JS类的私有变量                |
| 2. 给 DOM 元素临时绑定状态 | 比如是否点击过、位置、缓存数据等 | 比 Vue 的 `$el._flag` 更安全 |
| 3. 给对象缓存计算结果      | 避免重复计算，释放时自动清理   | 代码编译结果缓存、格式化数据          |


**为什么要用 WeakMap 来“存”而不是普通 Map？**

| Map                   | WeakMap          |
| --------------------- | ---------------- |
| 强引用：只要你存了对象，它就永远不会被回收 | 弱引用：对象没其他引用，自动释放 |
| 会造成内存泄漏               | 自动释放内存 ✅         |
| 可以遍历                  | 不可遍历（更隐蔽）        |


🔧 **实用场景和怎么用**  

:::details ✅ 场景 1：为对象挂“私有数据”
```js
const _private = new WeakMap()

class User {
  constructor(name) {
    _private.set(this, { name, token: 'abc123' })
  }

  getToken() {
    return _private.get(this).token
  }
}

const user = new User('Tom')
console.log(user.getToken()) // abc123
```
>✅ 外部访问不到 token，安全 ✅    
>❗️当 user 不再使用时，_private 中数据会自动 GC
:::


:::details ✅ 场景 2：DOM 元素临时缓存状态

```js
const elementState = new WeakMap()

function bindClick(el) {
  elementState.set(el, { clicked: false })

  el.addEventListener('click', () => {
    const state = elementState.get(el)
    if (!state.clicked) {
      console.log('第一次点击')
      state.clicked = true
    } else {
      console.log('重复点击')
    }
  })
}

const btn = document.querySelector('#btn')
bindClick(btn)
```
>✅ 不污染 DOM 元素  
>✅ 页面卸载或元素被删除，缓存WeakMap自动清除
:::

:::details ✅ 场景 3：缓存计算结果（如大型解析、格式化）
```js
const resultCache = new WeakMap()

function expensiveParse(obj) {
  if (resultCache.has(obj)) {
    return resultCache.get(obj)
  }

  const result = doHeavyParse(obj) // 假设这是耗时操作
  resultCache.set(obj, result)
  return result
}

const data = { foo: 'bar' }
expensiveParse(data) // 会缓存
```
>✅ 多次使用同一个对象时直接复用  
>✅ 对象不再使用时，缓存自动清除，不会爆内存
:::


✅ **总结记忆口诀**  

“只要你手里还有对象，你就能 `get` 到值；一旦你丢了对象，`WeakMap` 自动清理！”


```js
let map = new Map()
let obj = { name: 'Alice' }
// 假设内存地址为 0x123456

map.set(obj, 'value') // Map 保存了对 0x123456 的引用   obj对应的是地址0x123456

obj = null  //obj对应值 null

// 由于找不到对地址0x123456的引用，map也找不对对应的value了
// 原对象地址还在被引用，Map是强引用
// ❗ 原对象还在内存中，不会被回收 → 可能内存泄漏
```

```js
let weakmap = new WeakMap()
let obj = { name: 'Alice' }
// 假设内存地址为 0x123456

weakmap.set(obj, 'value') // WeakMap 保存了对 0x123456 的引用   obj对应的是地址0x123456

obj = null  //obj对应值 null

// ✅ WeakMap 中的键是“弱引用”
// ✅ 如果没有其他引用，GC 会自动释放 obj2 和对应的值
```


## 整理

✔️ 浏览器不会因为元素被移除就立即回收它，除非它“不可达”
垃圾回收的核心是：“没有任何地方能再访问这个对象（不可达）”。

🔁 addEventListener 是浏览器内部的引用链：
当你这么写：

```js
element.addEventListener('click', handler)
```

其实浏览器内部大致是：

- 把 handler 放进了一个全局的事件注册表；

    - 事件系统保留了：

        - element 的引用；

        - 和 handler 的引用；

❗ 所以：只把 DOM 从页面中删除，还不够

```js
document.body.removeChild(element) // ❌ 并不意味着 element 可回收
```

因为：

- element 还存在于浏览器事件系统的注册表中；

- handler 也可能还在内存里；

- 所以 element 依然“可达”，GC 不会清除。

```text
        ┌─────────────┐
        │  window     │
        └────┬────────┘
             │
      ┌──────▼────────────┐
      │ Event Listener Map│ ←─── (浏览器内部事件注册表)
      └──────┬────────────┘
             │
       ┌─────▼──────┐
       │  element   │ ←──── 你在 JS 中仍有变量或事件系统引用
       └────┬───────┘
            │
      ┌─────▼─────┐
      │ handler() │ ←─── click 监听器
      └───────────┘
```

