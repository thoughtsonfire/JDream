# function

## this  

### 一、各种函数中`this`指向的规则  

#### 1、普通函数  

```js
function show() {
  console.log(this);
}
show();
```  
- 非严格模式：`this` 指向全局对象 `window`

- 严格模式下：`this` 为 `undefined`  

#### 2、对象的方法调用  

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

#### 3、构造函数  

```js
function Person(name) {
  this.name = name;
}
const p = new Person("Tom");
console.log(p.name); // Tom
```  
- `this` 指向新创建的对象。  

#### 4、箭头函数  

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

#### 5、setTimeout / 回调函数  

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
- 普通函数内的回调 this 不自动绑定外部对象,指向 window。  

#### 6、匿名函数  

- 匿名函数的 this 指向，并不因为“匿名”而有什么特别规则，它和具名函数遵循相同的 “调用方式决定 this” 原则。

#### 常见问题  

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

### 二、改变 this 指向的方法  

#### 1、call()  

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

#### 2、apply()  

- 语法：`func.apply(thisArg, [argsArray])`  

- 立即执行函数，并将 `this` 绑定为 `thisArg`  

```js
Math.max(1, 5, 7, 2); // ✅ 正确，返回 7
Math.max([1, 5, 7, 2]); // ❌ 错误，返回 NaN
Math.max.apply(null, [1, 5, 7, 2]);// ✅ 正确，返回 7
```  

#### 3、bind()  

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

#### 4、箭头函数（自动继承外层 this）  

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

#### 5、在闭包中保存 this：`const that = this`  

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

#### 6、通过事件监听器绑定 this  

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


#### 7、类方法中通过箭头函数避免 this 丢失  

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

#### 总结  

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


## 闭包  


### 一、什么是闭包？

> 闭包是指函数可以“记住”并访问它定义时所在的作用域，即使这个函数在当前作用域之外被调用。

### 二、闭包的典型例子  

```js
function outer() {
  const name = "Alice";

  function inner() {
    console.log(name); // ✅ 闭包访问了外部函数的变量
  }

  return inner;
}

const fn = outer(); // outer() 执行后返回 inner 函数
fn(); // 输出：Alice
```

### 三、闭包的两个关键特性

1. 可以访问外部函数作用域中的变量

2. 即使外部函数已经执行完毕，闭包仍能“记住”那个作用域

### 四、闭包的经典用途

1. 封装私有变量  

```js
function createCounter() {
  let count = 0;

  return {
    increase() {
      count++;
      console.log(count);
    },
    decrease() {
      count--;
      console.log(count);
    },
  };
}

const counter = createCounter();
counter.increase(); // 1
counter.increase(); // 2
counter.decrease(); // 1
```
👉 count 不能在外部访问，只能通过闭包控制。这是一种“私有属性”的实现方式。

2. 生成函数工厂  

```js
function makeAdder(x) {
  return function(y) {
    return x + y;
  };
}

const add5 = makeAdder(5);
console.log(add5(3)); // 8
console.log(add5(10)); // 15
```
👉 `x` 是固定值，通过闭包记住了它。  

3. 解决循环中的作用域问题  

```js
// ❌ 错误的方式
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// 输出：3, 3, 3

// ✅ 用闭包保存每次的 i
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(() => console.log(j), 100);
  })(i);
}
// 输出：0, 1, 2
```

### 五、闭包的注意事项

✅ 优点
- 封装变量，保护数据

- 可以创建函数工厂

- 在异步中保存数据

⚠️ 缺点
- 容易造成 内存泄漏（闭包引用的变量无法被回收）

- 使用不当会导致 调试困难  

### 六、闭包 vs 普通作用域

```js
function outer() {
  let secret = "123";

  return function inner() {
    console.log(secret);
  };
}
```
- 普通作用域：变量在函数执行完后就被销毁。

- 闭包：由于内部函数仍然引用这个变量，所以不会销毁。




