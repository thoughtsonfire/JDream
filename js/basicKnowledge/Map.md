# Map

Map 是 ES6 提供的一种“键值对数据结构”

## 1. Map 初始化

### 1.1 初始化空 Map（再 set）

```js
const map = new Map();
map.set("a", 1);
map.set("b", 2);
```

### 1.2 从数组生成 Map

```js
const arr = [
  ["a", 1],
  ["b", 2],
];

const map = new Map(arr);
```

### 1.3 从 Object 转 Map

```js
const obj = {
  a: 1,
  b: 2,
};

const map = new Map(Object.entries(obj));
```

### 1.4 链式写法

```js
const map = new Map().set("a", 1).set("b", 2);
```

👉 因为 set() 返回的是 Map 本身

## 2. Map和Object 的对比

### 2.1 key的类型

#### 2.1.1 `Object`的`key`

只能是string/Symbol 类型的,其他类型的会自动转成字符串类型,如布尔类型、数字类型、对象类型、数组类型

- 对象作为 key（重点坑）

```js
const obj = {};
const key = { a: 1 };

obj[key] = "value";
```

👉 实际变成：

```js
{
  "[object Object]": "value"
}
```

- Symbol（唯一例外，不会转成字符串）

```js
const s = Symbol("id");

const obj = {
  [s]: 123,
};
```

👉 Symbol：

- 不会转字符串
- 是唯一的 key
- 这里`[]`是计算属性名（Computed Property Name）

```js
{
  [表达式]: 值
}
```

#### 2.1.2 `Map` key的类型

key 可以是任意类型,包括Array、Map、Set等

```
map.set(1, "数字");
map.set("1", "字符串");
map.set(true, "布尔");
map.set({}, "对象");
```

### 2.2 在数据结构里的定位

> [!TIP] Object
>
> - 本质：哈希表（Hash Table）
> - 存储方式：
>   - key → value 对应
>   - key 最终被转换成 字符串 或 Symbol
> - 查找时间复杂度：
>   - 平均 O(1)
>   - 最坏 O(n)（极端 hash 冲突，但 JS 引擎优化很快）
> - 特点：
>   - key 类型受限（string / symbol）
>   - 有原型链（可能有继承的属性）
>   - 适合存储少量或中等规模的数据
> - 总结：Object 在数据结构里就是 最简单的哈希表，类似 Python 的 dict。

> [!TIP] Map
>
> - 本质：哈希表 + 链表（保持插入顺序）
> - 存储方式：
>   - key → value 对应
>   - key 可以是任意类型（数字、对象、函数、Symbol 等）-内部维护一个 顺序链表 / 双向链表 来保证插入顺序
> - 查找时间复杂度：
>   - 平均 O(1)
>   - 最坏 O(n)（同样极端 hash 冲突）
> - 特点：
>   - 高性能、可动态增删
>   - 可以用对象、函数、Symbol 等做 key
>   - size 属性直接记录元素个数
>   - 遍历时顺序稳定
> - 总结：Map 就是 功能更全、更安全的哈希表，相比 Object 更接近数据结构课里讲的 纯 HashMap。

> [!NOTE] Object 是哈希表
>
> 1.  存储结构
>
> - JS 的 Object 本质上是字符串 key → value 的映射
> - 现代 JS 引擎（V8、SpiderMonkey）会把 Object 优化成哈希表（hash table）
> - 查找、插入和删除操作在平均情况下 O(1)
>
> 2.  特点
>
> - key 会被强制转换为 字符串（Symbol 除外）
> - 没有原生顺序保证（虽然 ES6 以后有枚举顺序规则，但不保证插入顺序）
> - 冲突解决对开发者透明，内部可能使用开放寻址或其他方式
>
> 3.  例子
>
> ```
> const obj = { a: 1, b: 2 };
> obj['c'] = 3;  // 插入
> console.log(obj['b']); // 查找 O(1) 平均
> ```
>
> 👉 所以 Object 是一个简单的哈希表。

> [!NOTE] Map 是“哈希表 + 链表”
>
> 1.  存储结构
>
> - Map 也是哈希表，但为了保持插入顺序，内部还维护了一个双向链表（或链表）
> - 每个元素在哈希表里定位 + 在链表里记录前后元素
>
> 2.  特点
>
> - key 可以是任意类型（对象、数组、函数、甚至 NaN）
> - 保证 迭代顺序 = 插入顺序
> - 查找和插入的平均复杂度仍然是 O(1)
> - 内部链表解决了遍历时顺序问题
>
> 3.  例子
>
> ```js
> const map = new Map();
> map.set("a", 1);
> map.set("b", 2);
> map.set("c", 3);
>
> for (let [k, v] of map) {
>   console.log(k, v);
> }
> // 输出 a 1, b 2, c 3 —— 保持插入顺序
> ```

> [!IMPORTANT] 为什么说 Map = 哈希表 + 链表
>
> 哈希表部分 → 快速定位 key（O(1) 查找/插入/删除）
> 链表部分 → 记录插入顺序，支持有序迭代
>
> 可以把它想象成：
>
> ```md
> 哈希表索引（快速定位）
> ↓
> [Node(key,value)] → 链表记录顺序 → Node(key,value) → ...
> ```

### 2.3 空间占用情况

| 特性         | Object                   | Map                                                    |
| ------------ | ------------------------ | ------------------------------------------------------ |
| 内存占用     | 少                       | 稍多                                                   |
| 为什么       | 结构简单，只存 key/value | 除了 key/value，还维护内部链表（保证顺序）和 hash 结构 |
| 当数据量大时 | 性能可能下降，尤其遍历   | 更稳定，插入/删除性能好                                |
| 最适合场景   | 小型配置、JSON 数据      | 大型缓存、动态增删、任意类型 key                       |

## 3. Map 常用 API

### 3.1 set(key, value)

👉 添加或更新

```js
map.set("name", "jack");
map.set("age", 20);
```

✔ 如果 key 已存在 → 覆盖

### 3.2 get(key)

👉 取值

```js
map.get("name"); // "jack"
```

👉 不存在返回：

undefined

### 3.3 has(key)

👉 判断是否存在

```
map.has("name"); // true
```

### 3.4 delete(key)

👉 删除某个 key

```js
map.delete("name");
```

### 3.5 clear()

👉 清空

```
map.clear();
```

### 3.6 size

👉 元素个数

```
map.size; // 2
```

## 4. 遍历 Map（非常重要）

### 4.1 `for...of`

```js
for (const [key, value] of map) {
  console.log(key, value);
}
```

### 4.2 `keys()`

```js
for (const key of map.keys()) {
  console.log(key);
}
```

### 4.3 `values()`

```js
for (const value of map.values()) {
  console.log(value);
}
```

### 4.4 `entries()`

```js
for (const [k, v] of map.entries()) {
  console.log(k, v);
}
```

### 4.5 `forEach`

```js
map.forEach((value, key) => {
  console.log(key, value);
});
```

## 5. 常见坑

### 5.1 对象 key 是“引用比较”

```js
map.set({}, 1);
map.get({}); // ❌ undefined
```

### 5.2 undefined vs 不存在

```js
map.get("x"); // undefined
```

👉 不一定代表存在

✔ 正确判断：

```js
map.has("x");
```

## 6. 常见用法

### 6.1 用 Map 做计数器

```js
const map = new Map();

for (const num of [1, 2, 2, 3]) {
  map.set(num, (map.get(num) || 0) + 1);
}
```

### 6.2 用 Map 做缓存

```js
const cache = new Map();

function getData(key) {
  if (cache.has(key)) return cache.get(key);

  const data = fetchData(key);
  cache.set(key, data);
  return data;
}
```

### 6.3 转换为数组

```js
Array.from(map);
```
