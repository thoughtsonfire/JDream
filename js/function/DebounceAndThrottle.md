# 防抖、节流  

| 特性   | 防抖（Debounce）      | 节流（Throttle）       |
| ---- | ----------------- | ------------------ |
| 触发频率 | 最后一次触发后 N ms 执行   | 每 N ms 执行一次        |
| 应用场景 | 搜索输入、自动保存、表单验证    | 滚动加载、窗口调整、按钮频点     |
| 原理   | `setTimeout` + 清除 | 时间戳 或 `setTimeout` |


## 防抖（Debounce）  
::: code-group
```js [base]
function debounce(fn, delay = 300) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

```

```js [debounceInput]
const input = (value)=>{           
    console.log(value)             
}                                  
debounceInput = debounce(input)   
```
:::  


## 节流（Throttle）

::: code-group

```js [时间戳版（立即执行）]
function throttle(fn, delay = 300) {
  let lastTime = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastTime >= delay) {
      fn.apply(this, args);
      lastTime = now;
    }
  };
}
```

```js [定时器版（延迟执行]
function throttle(fn, delay = 300) {
  let timer = null;
  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args);
        timer = null;
      }, delay);
    }
  };
}
```
:::  

**滚动加载**  

```js 
  // 简单节流函数
  function throttle(fn, delay = 300) {
    let lastTime = 0;
    return function (...args) {
      const now = Date.now();
      if (now - lastTime >= delay) {
        lastTime = now;
        fn.apply(this, args);
      }
    };
  }
  function loadMore() {
    console.log('加载更多数据...');
  }
  const scrollBox = document.getElementById('scrollBox');
  scrollBox.addEventListener('scroll', throttle(function () {
    // 判断是否滚动到底部
    const { scrollTop, scrollHeight, clientHeight } = scrollBox;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      loadMore();
    }
  }, 300));
```