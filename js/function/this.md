
# this  

## 一、各种函数中`this`指向的规则  

### 1、普通函数  

```js
function show() {
  console.log(this);
}
show();
```  
- 非严格模式：`this` 指向全局对象 `window`

- 严格模式下：`this` 为 `undefined`  

### 2、对象的方法调用  

```js
const obj = {
  name: "Alice",
  sayHi: function () {
    console.log(this.name);
  },
};
obj.sayHi(); // this 指向 obj
```
- 谁调用方法，`this` 就指向谁。  

### 3、构造函数  

```js
function Person(name) {
  this.name = name;
}
const p = new Person("Tom");
console.log(p.name); // Tom
```  
- `this` 指向新创建的对象。  

### 4、箭头函数  

```js
const obj = {
  name: "Ava",
  say: () => {
    console.log(this.name);
  },
};
obj.say(); // undefined（不是 obj）
```
- 箭头函数不会绑定自己的 this，它从定义它的上下文中继承 this。  

### 5、setTimeout / 回调函数  

```js
const obj = {
  name: "Jack",
  sayLater: function () {
    // ✅ 这里的 this === obj
    setTimeout(function () {
      console.log(this.name);  
      //这里的this 属于fuction，function被setTimeout调用，setTimeout被window调用
    }, 1000);
  },
};
obj.sayLater(); // undefined（在 setTimeout 中 this 指向 window）
```
```js
function debounce(fn, delay = 300) {
  let timer = null;  // 用于保存定时器ID
  return function (...args) {  // 返回一个新的函数，使用剩余参数收集实参
    if (timer) clearTimeout(timer);  // 如果上次的计时器还没触发，清除它

    timer = setTimeout(() => {
      fn.apply(this, args);  // 延迟执行目标函数 fn
    }, delay);  // 设置新的延时
  };
}
const debounced = debounce(function () {
  console.log(this); // 👉 window
});

debounced();  // 没有绑定，this 默认是 window（非严格模式）  

const obj = {
  name: 'MyObj',
  sayHi: debounce(function () {
    console.log(this.name);
  })
};

obj.sayHi();  // 👉 this 是 obj，不是 window
```

```js
setTimeout(fn,delay)

//fn 为普通函数 里面的this指向undefined或者window
//fn 为箭头函数 里面的this指向setTimeout的外部环境
```


>[!NOTE]setTimeout 本身不改变 this，它调用的函数（普通 or 箭头）中的 this 是由函数自身的定义方式决定的。
>
>也就是说：
>
>   - setTimeout 本身没有“自己的 this”。
>
>   - 如果你传入的是普通函数，它的 this 在浏览器中默认是 window。
>
>   - 如果你传入的是箭头函数，它的 this 是来自定义时的外层作用域（而不是 setTimeout）。

| 函数类型 | `this` 来自哪里？        | 向上找什么？              |
| ---- | ------------------- | ------------------- |
| 普通函数 | 谁调用它，它的 `this` 就是谁  | ❗ **调用栈** 向上找（不是词法） |
| 箭头函数 | 定义时所处的外部作用域的 `this` | ✅ **词法作用域** 向上找     |


### 6、匿名函数  

- 匿名函数的 this 指向，并不因为“匿名”而有什么特别规则，它和具名函数遵循相同的 “调用方式决定 this” 原则。

### 常见问题  

1. 对象方法中的`setTimeout`  

```js
const obj = {
  name: "Jack",
  sayLater: function () {
    setTimeout(function () {
      console.log(this.name);
    }, 1000);
  },
};
obj.sayLater(); // undefined（在 setTimeout 中 this 指向 window）
```  

```js
const obj = {
  name: "Jack",
  sayLater: function () {
    setTimeout(()=> {
      console.log(this.name);
    }, 1000);
  },
};
obj.sayLater(); // Jack
//箭头函数向上找到匿名函数，匿名函数找它的调用者
```   

## 二、改变 this 指向的方法  

### 1、call()  

- 语法：`func.call(thisArg, arg1, arg2, ...)`

- 立即执行函数，并将 `this` 绑定为 `thisArg`

```js
function showInfo(age, city) {
  console.log(`${this.name}, ${age} years old from ${city}`);
}

const person = { name: "Alice" };

showInfo.call(person, 25, "Beijing");
// 输出：Alice, 25 years old from Beijing
```

### 2、apply()  

- 语法：`func.apply(thisArg, [argsArray])`  

- 立即执行函数，并将 `this` 绑定为 `thisArg`  

```js
Math.max(1, 5, 7, 2); // ✅ 正确，返回 7
Math.max([1, 5, 7, 2]); // ❌ 错误，返回 NaN
Math.max.apply(null, [1, 5, 7, 2]);// ✅ 正确，返回 7
```  

### 3、bind()  

- 语法：`func.bind(thisArg, arg1, arg2, ...)`

- 返回一个新函数，`this` 永远绑定为指定对象

- 不会立即执行函数，而是创建一个新函数延迟执行

✅ `bind` 适合用于事件处理、回调中预绑定 `this`  

```js
function showInfo(age, city) {
  console.log(`${this.name}, ${age} years old from ${city}`);
}

const person = { name: "Alice" };

const boundShow = showInfo.bind(person, 28, "Guangzhou");

boundShow(); // 输出：Alice, 28 years old from Guangzhou

```

### 4、箭头函数（自动继承外层 this）  

```js
const person = {
  name: "Leo",
  sayLater() {
    setTimeout(() => {
      console.log(this.name); // 输出 Leo
    }, 1000);
  },
};
person.sayLater();
```

- 箭头函数不会绑定自己的 this

- 自动捕获并使用定义时的外层作用域的 this

- 非常适合用于回调中避免 this 变更的问题  

### 5、在闭包中保存 this：`const that = this`  

```js
function Person(name) {
  this.name = name;
  const that = this;

  setTimeout(function () {
    console.log(that.name); // 正确访问 this.name
  }, 1000);
}
new Person("Lily");
```

- 早期的做法，保存外部 this 到变量

- 在箭头函数普及前经常使用  

### 6、通过事件监听器绑定 this  

```js
const btn = document.querySelector("button");
const obj = {
  name: "Button Handler",
  handleClick: function () {
    console.log(this.name);
  },
};

btn.addEventListener("click", obj.handleClick.bind(obj)); // 正确绑定 this
```


### 7、类方法中通过箭头函数避免 this 丢失  

```js
class Counter {
  constructor() {
    this.count = 0;
  }

  increase = () => {
    this.count++;
    console.log(this.count);
  };
}

const counter = new Counter();
const btn = document.querySelector("#btn");
btn.addEventListener("click", counter.increase); // this 正确指向 Counter 实例
```

### 总结  

| 函数类型 | 默认 `this`                   | 可否修改 `this` | 常用修改方法                    |
| ---- | --------------------------- | ----------- | ------------------------- |
| 普通函数 | 严格模式下 undefined；非严格为 window | ✅ 可修改       | `call` / `apply` / `bind` |
| 对象方法 | 调用该方法的对象                    | ✅ 可修改       | `call` / `bind`           |
| 构造函数 | 新实例对象                       | ❌ 通常不改      | -                         |
| 箭头函数 | 定义时所在的上下文                   | ❌ 不可修改      | -                         |
| 回调函数 | 调用者上下文（常是 window）           | ✅ 可修改       | `bind(this)` 或箭头函数        |



| 方法        | 是否立即执行 | 作用                | 典型用途          |
| --------- | ------ | ----------------- | ------------- |
| `call()`  | ✅ 是    | 修改 `this` 并立即调用   | 普通函数或继承构造函数   |
| `apply()` | ✅ 是    | 修改 `this` 并立即调用   | 参数是数组时，性能优化场景 |
| `bind()`  | ❌ 否    | 返回新函数，永久绑定 `this` | 延迟执行、事件回调绑定等  |
| 箭头函数      | ❌ 否    | 自动继承外部作用域的 `this` | 定时器/回调函数中推荐   |
| 闭包变量      | ❌ 否    | 手动保存外部 `this`     | ES5 或兼容旧浏览器场景 |

