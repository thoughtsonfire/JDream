# 哈希表（Hash Table）

## 一、什么是哈希表（Hash Table）

哈希表 = 用“键（key）快速找到值（value）”的数据结构

核心目标：

```md
查找速度尽可能快（接近 O(1)）
```

## 二、哈希表的核心组成

哈希表 = 3 个核心部分：

### 1. key（键）

👉 用来查找的东西

比如：

```js
"name" → "jack"
```

### 2. 哈希函数（Hash Function）

👉 把 key 转成一个数字（索引）

```js
hash("name") → 3
```

### 3. 存储结构（数组）

```js
index:   0   1   2   3   4
value:  []  []  []  jack []
```

## 三、完整流程

✅ 插入

```js
set("name", "jack");
```

步骤：

1. hash("name") → 3
2. 存到数组 index = 3

✅ 查找

```js
get("name");
```

步骤：

1. hash("name") → 3
2. 直接取数组[3]

👉 时间复杂度：O(1)

## 四、核心问题：哈希冲突（重点）

👉 不同 key 可能算出同一个 index

```js
hash("name") → 3
hash("age")  → 3
```

👉 这就叫：冲突（collision）

## 五、解决冲突的两种主流方式

### 1. 链地址法（最常见）

👉 每个位置存一个“链表”

```js
index 3:
[name → jack] → [age → 20]
```

✔ 查找流程：

1. 找到 index = 3
2. 在链表里遍历

### 2. 开放寻址法

👉 冲突就找下一个空位

```js
index 3 被占 → 放到 index 4
```

常见策略：

1. 线性探测（+1）
2. 二次探测
3. 双重哈希

## 六、时间复杂度

| 操作 | 平均 | 最坏 |
| ---- | ---- | ---- |
| 插入 | O(1) | O(n) |
| 查找 | O(1) | O(n) |
| 删除 | O(1) | O(n) |

## 手写简单哈希表

### 链地址法

```js
class HashTable {
  constructor(size = 8) {
    // 初始化桶数组（长度建议用 2 的幂，方便扩容）
    this.table = new Array(size);

    // 当前存储的 key-value 数量
    this.count = 0;

    // 装载因子阈值（超过就扩容）
    this.loadFactor = 0.75;
  }

  // ========================
  // 哈希函数（字符串版）
  // ========================
  hash(key) {
    let hash = 0;

    // 把 key 转成字符串（支持更多类型）
    const strKey = String(key);

    for (let i = 0; i < strKey.length; i++) {
      // 使用一个稍微好一点的 hash 算法（类似 Java）
      hash = hash * 31 + strKey.charCodeAt(i);
      //  💡 为什么是 31？
      //👉 经验值（很多语言都用，比如 Java）
      //优点：
      //质数 → 分布更均匀//
      //计算快（31 = 32 - 1，可以优化）
    }

    // 保证 index 在数组范围内
    return hash & (this.table.length - 1);
  }

  // ========================
  // 添加 / 更新数据
  // ========================
  set(key, value) {
    const index = this.hash(key);

    // 如果这个位置还没有桶，就创建一个
    if (!this.table[index]) {
      this.table[index] = [];
    }

    const bucket = this.table[index];

    // 👉 先检查 key 是否已存在（实现“覆盖”）
    for (let item of bucket) {
      if (item[0] === key) {
        item[1] = value; // 覆盖旧值
        return;
      }
    }

    // 👉 不存在就新增
    bucket.push([key, value]);
    this.count++;

    // 👉 判断是否需要扩容
    if (this.count / this.table.length > this.loadFactor) {
      this.resize();
    }
  }

  // ========================
  // 获取数据
  // ========================
  get(key) {
    const index = this.hash(key);
    const bucket = this.table[index];

    // 没有桶，直接返回
    if (!bucket) return undefined;

    // 遍历桶查找 key
    for (let [k, v] of bucket) {
      if (k === key) return v;
    }

    return undefined;
  }

  // ========================
  // 删除数据
  // ========================
  delete(key) {
    const index = this.hash(key);
    const bucket = this.table[index];

    if (!bucket) return false;

    // 找到 key 并删除
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1); // 删除
        this.count--;
        return true;
      }
    }

    return false;
  }

  // ========================
  // 扩容（核心难点）
  // ========================
  resize() {
    // 保存旧数据
    const oldTable = this.table;

    // 扩容为原来的 2 倍
    this.table = new Array(oldTable.length * 2);

    // 重置 count（重新计算）
    this.count = 0;

    // 👉 重新 hash 所有数据（非常关键！）
    for (let bucket of oldTable) {
      if (!bucket) continue;

      for (let [key, value] of bucket) {
        this.set(key, value);
      }
    }
  }

  // ========================
  // 获取当前大小
  // ========================
  size() {
    return this.count;
  }
}
```

### 开放寻址法

```js
class HashTable {
  constructor(size = 8) {
    // 存储 key-value
    this.table = new Array(size);

    // 标记删除（避免断链）
    this.DELETED = Symbol("deleted");

    this.count = 0;
    this.loadFactor = 0.7;
  }

  // ========================
  // 哈希函数（同之前）
  // ========================
  hash(key) {
    let hash = 0;
    const strKey = String(key);

    for (let i = 0; i < strKey.length; i++) {
      hash = hash * 31 + strKey.charCodeAt(i);
    }

    return hash & (this.table.length - 1);
  }

  // ========================
  // set：插入 / 覆盖
  // ========================
  set(key, value) {
    let index = this.hash(key);

    // 线性探测（冲突就往后找）
    while (
      this.table[index] !== undefined &&
      this.table[index] !== this.DELETED
    ) {
      // 如果 key 已存在 → 覆盖
      if (this.table[index][0] === key) {
        this.table[index][1] = value;
        return;
      }

      // 往后找（+1）
      index = (index + 1) % this.table.length;
    }

    // 找到空位，插入
    this.table[index] = [key, value];
    this.count++;

    // 判断是否扩容
    if (this.count / this.table.length > this.loadFactor) {
      this.resize();
    }
  }

  // ========================
  // get：查找
  // ========================
  get(key) {
    let index = this.hash(key);

    // 一直找，直到遇到空位（说明不存在）
    while (this.table[index] !== undefined) {
      const item = this.table[index];

      // 跳过被删除的
      if (item !== this.DELETED && item[0] === key) {
        return item[1];
      }

      // 继续往后找
      index = (index + 1) % this.table.length;
    }

    return undefined;
  }

  // ========================
  // delete：删除
  // ========================
  delete(key) {
    let index = this.hash(key);

    while (this.table[index] !== undefined) {
      const item = this.table[index];

      if (item !== this.DELETED && item[0] === key) {
        // ❗ 不能直接设为 undefined（会断查找链）
        this.table[index] = this.DELETED;
        this.count--;
        return true;
      }

      index = (index + 1) % this.table.length;
    }

    return false;
  }

  // ========================
  // 扩容（rehash）
  // ========================
  resize() {
    const oldTable = this.table;

    this.table = new Array(oldTable.length * 2);
    this.count = 0;

    for (let item of oldTable) {
      if (item && item !== this.DELETED) {
        this.set(item[0], item[1]);
      }
    }
  }

  size() {
    return this.count;
  }
}
```

> 开放寻址法，
> 这里用while，不用for是因为，
> 这里while 时间复杂度O(1)
> for 时间复杂度O(n)

## 位运算（& / |） 运算

> & 是 按位与运算符（bitwise AND）

📌 规则：

```md
两个数转成二进制，每一位做“与运算”
```

与运算规则（必须记住）

| 位1 | 位2 | 结果 |
| --- | --- | ---- |
| 1   | 1   | 1    |
| 1   | 0   | 0    |
| 0   | 1   | 0    |
| 0   | 0   | 0    |

### 例子

```js
5 & 3;
```

- 第一步：转二进制

```js
5 = 101
3 = 011
```

- 第二步：逐位计算

```js
  101
& 011
-----
  001
```

- 第三步：转回十进制

```js
001 = 1
```

- 👉 所以：

```js
5 & (3 === 1);
```

## 总结

总结（核心记忆）

👉 哈希表 =

```md
key → hash函数 → 数组下标 → value
```

最重要 4 点：

- 本质是 数组 + 哈希函数
- 平均查找 O(1)
- 最大问题是 哈希冲突
- 解决方式：链表 / 开放寻址

## 算法

### 1. 两数之和

给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target 的那 两个 整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案，并且你不能使用两次相同的元素。

```ts
function twoSum(nums: number[], target: number): number[] {
  let map = new Map();
  for (let i = 0; i < nums.length; i++) {
    let x = nums[i];
    let y = target - x;
    if (map.has(y)) {
      return [map.get(y), i];
    }
    map.set(x, i);
  }
}
```
