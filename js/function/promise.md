# Promise（异步编程）   

## 什么是 Promise？  

>[!NOTE]Promise 是 ES6 引入的一种异步编程解决方案。
>
>用一句话总结：  
>👉 Promise 就是一个“表示未来某个异步操作完成或失败”的容器对象。 



## Promise 的 3 种状态  

| 状态          | 描述                 |
| ----------- | ------------------ |
| `pending`   | 等待中（初始状态）          |
| `fulfilled` | 已完成（调用了 `resolve`） |
| `rejected`  | 已拒绝（调用了 `reject`）  |



## 语法结构  

```js
const promise = new Promise((resolve, reject) => {
  // 异步操作
  if (成功) {
    resolve(结果);   // 表示成功
  } else {
    reject(错误);     // 表示失败
  }
});
```

:::details **模拟一个加载数据的异步操作**  
```js
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = Math.random() > 0.5; // 模拟成功/失败

    if (success) {
      resolve("数据加载成功！");
    } else {
      reject("加载失败！");
    }
  }, 1000);
});

promise
  .then(result => {
    console.log("成功：", result);
  })
  .catch(error => {
    console.log("失败：", error);
  });
```
:::



## 使用 `then` 和 `catch` 处理结果  

```js
promise
  .then(result => {
    console.log("成功:", result);
  })
  .catch(error => {
    console.log("失败:", error);
  });
```



## 链式调用（`then` 的返回值）  

```js
new Promise((resolve, reject) => {
  resolve(1);
})
  .then(result => {
    console.log('第一步：', result); // 1
    return result + 1;
  })
  .then(result => {
    console.log('第二步：', result); // 2
    return result + 1;
  })
  .then(result => {
    console.log('第三步：', result); // 3
  });
```

**中间有异步操作**  

- 可以在 then 中返回一个新的 Promise，也会被等待

```js
new Promise(resolve => {
  resolve("开始");
})
  .then(result => {
    console.log(result);
    return new Promise(resolve => {
      setTimeout(() => {
        resolve("异步完成");
      }, 1000);
    });
  })
  .then(result => {
    console.log(result); // "异步完成"
  });
```

**中间有 throw 或 reject 会被 .catch() 捕获**  

```js
Promise.resolve("OK")
  .then(res => {
    console.log(res);
    throw new Error("出错了");
  })
  .then(() => {
    console.log("这里不会执行");
  })
  .catch(err => {
    console.log("捕获错误：", err.message);
  });
```



## Promise.all / Promise.race 用法  

:::details Promise.all：并发执行，全部成功才成功
```js
Promise.all([
  fetch('/api/user'),
  fetch('/api/todo'),
])
.then(responses => console.log('全部成功', responses))
.catch(err => console.log('有一个失败', err));
```
:::

:::details Promise.race：并发执行，最快完成的那个先响应
```js
Promise.race([
  fetch('/api/user'),
  timeout(1000),
]).then(res => console.log(res));
```
:::



## 为何要用 Promise  

- 传统回调写法（callback hell）👇：

```js
fs.readFile('a.txt', (err, data1) => {
  fs.readFile('b.txt', (err, data2) => {
    fs.readFile('c.txt', (err, data3) => {
      // 嵌套地狱
    });
  });
});
```

- Promise 改写后 👇：

```js
readFile('a.txt')
  .then(data1 => readFile('b.txt'))
  .then(data2 => readFile('c.txt'))
  .then(data3 => { /* 最终处理 */ })
  .catch(err => console.error(err));
```



## 和 async/await 搭配使用（ES8）  

```js
async function load() {
  try {
    const res1 = await getData();
    const res2 = await getData();
    console.log(res1, res2);
  } catch (err) {
    console.log("出错了", err);
  }
}
```



## 总结：Promise 的核心价值  

| 优点                   | 描述                        |
| -------------------- | ------------------------- |
| 更清晰的异步流程             | 避免回调地狱                    |
| 支持链式调用               | 可以连续处理多个异步操作              |
| 内置错误处理               | `.catch()` 替代手动 try/catch |
| 可与 async/await 搭配更简洁 | 异步变同步写法                   |




## 手写 Promise  

**目标功能（最简化版）**  

我们要实现的 MyPromise 支持：

1. `new MyPromise((resolve, reject) => {...})` 构造

2. `.then(onFulfilled, onRejected)` 链式调用

3. 状态管理（`pending`、`fulfilled`、`rejected`）

4. 异步调用 `.then`  


**手写代码：简易版 Promise 实现**  

```js
class MyPromise {
  constructor(executor) {
    this.state = 'pending';       // 初始状态
    this.value = undefined;       // 成功值
    this.reason = undefined;      // 失败原因
    this.onFulfilledCallbacks = []; // 成功回调队列
    this.onRejectedCallbacks = [];  // 失败回调队列

    const resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.onFulfilledCallbacks.forEach(fn => fn());
      }
    };

    const reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    };

    try {
      executor(resolve, reject);  // 立即执行传入的函数
    } catch (err) {
      reject(err);                // 捕获同步异常
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      const fulfilledFn = () => {
        setTimeout(() => {
          try {
            const x = onFulfilled ? onFulfilled(this.value) : this.value;
            resolve(x);
          } catch (e) {
            reject(e);
          }
        });
      };

      const rejectedFn = () => {
        setTimeout(() => {
          try {
            const x = onRejected ? onRejected(this.reason) : this.reason;
            reject(x);
          } catch (e) {
            reject(e);
          }
        });
      };

      if (this.state === 'fulfilled') {
        fulfilledFn();
      } else if (this.state === 'rejected') {
        rejectedFn();
      } else if (this.state === 'pending') {
        this.onFulfilledCallbacks.push(fulfilledFn);
        this.onRejectedCallbacks.push(rejectedFn);
      }
    });
  }
}
```

**使用测试：**  

```js
const p = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('成功啦！');
    // 或 reject('失败了！');
  }, 1000);
});

p.then(res => {
  console.log('res:', res);
}).then(() => {
  console.log('链式调用！');
});
```

**简化说明：**

| 功能           | 实现方式                        |
| ------------ | --------------------------- |
| 状态管理         | `this.state` 确保只能改变一次       |
| 多个 `.then`   | 用数组保存回调函数，状态变化后统一执行         |
| 异步调用 `.then` | 用 `setTimeout` 保证异步行为符合规范   |
| 链式调用         | `.then` 返回新的 `MyPromise` 实例 |
