# Promise 并发(≈ python 中的多线程)  

在 Node.js 用 async/await + Promise 并发 时，像 Python 多线程里限制线程数那样，控制“同时进行的连接/任务数”。这是可以做到的，不过 async/await + Promise 并不自带并发限制，需要自己实现“并发池”或使用第三方库。  

## 自己实现“并发池”控制并发数

思路：

- 有一个任务队列（数组）

- 维护最多 N 个同时运行的 Promise

- 一个任务完成后，启动队列中的下一个任务

示例：限制同时最多 5 个请求  

```js
const axios = require('axios');

const urls = [
  'https://example.com/1',
  'https://example.com/2',
  'https://example.com/3',
  // ...更多 URL
];

async function fetchUrl(url) {
  const res = await axios.get(url);
  console.log(`完成: ${url}, 状态: ${res.status}`);
  return res.data;
}

// 并发控制函数
async function asyncPool(poolLimit, tasks) {
  const results = [];
  const executing = new Set();

  for (const task of tasks) {
    const p = task().then(result => {
      executing.delete(p); // 完成后移除
      return result;
    });
    results.push(p);
    executing.add(p);

    if (executing.size >= poolLimit) {
      // 等待最先完成的 Promise
      await Promise.race(executing);
    }
  }

  return Promise.all(results);
}

// 创建任务函数数组
const taskFns = urls.map(url => () => fetchUrl(url));

// 限制并发 5 个
asyncPool(5, taskFns).then(results => {
  console.log('全部完成');
});

```

✅ 优点：  

- 不需要额外库，自己就能控制“同时发起的连接数”。

- 灵活，任务完成后会自动启动下一个任务。  


## 使用第三方库（更简洁）  

p-limit  

```bash
npm install p-limit
```

```js
const pLimit = require('p-limit');
const axios = require('axios');

const urls = ['https://example.com/1', 'https://example.com/2', /*...*/];
const limit = pLimit(5); // 最大同时 5 个任务

const tasks = urls.map(url => limit(() => axios.get(url).then(r => {
  console.log(url, r.status);
  return r.data;
})));

Promise.all(tasks).then(() => {
  console.log('全部完成');
});
```  

- p-limit 会自动维护一个并发池，确保同时最多 5 个任务在执行。

- 代码简洁，易读，推荐在实际项目中使用。


## 对比 Python 多线程  

| 特性        | Python ThreadPoolExecutor | Node.js asyncPool / p-limit |
| --------- | ------------------------- | --------------------------- |
| 并发控制      | max\_workers=N            | poolLimit=N                 |
| CPU 密集型任务 | 多线程对 CPU 不友好，GIL 限制       | 不可用于 CPU 密集型，依然单线程          |
| IO 密集型任务  | 多线程有效                     | 异步 IO + 并发池效率高              |
