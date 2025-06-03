# ES6 最常用和最重要的特性概览


## 1. 变量声明  

`let` 和 `const`（替代 `var`）  

- `let`：块级作用域，避免变量提升和重复声明。

- `const`：声明常量，不能被重新赋值。  

```js
let a = 10;
const b = 20;
// var 是函数作用域，而 let/const 是块作用域
```


##  2. 箭头函数（Arrow Functions）  

- 简洁写法，自动绑定外部 `this`，不再需要 `.bind(this)`。
- **词法作用域** 向上找 `this`  
- 不能改变`this`指向  

```js
const add = (a, b) => a + b;

const obj = {
  name: 'Tom',
  sayHi() {
    setTimeout(() => {
      console.log(this.name); // 箭头函数的 this 是 obj
    }, 1000);
  }
};
```  


##  3. 模板字符串（Template Literals）  

- 使用反引号 `，支持变量插值和多行字符串。  

```js
const name = "Alice";
console.log(`Hello, ${name}!`);
```


## 4. 解构赋值（Destructuring）  

- 快速从数组或对象中提取数据。

```js
const [x, y] = [1, 2];
const { name, age } = { name: "Tom", age: 30 };
```


## 5. 默认参数（Default Parameters）  

```js
function greet(name = "Guest") {
  console.log("Hello", name);
}
```


##  6. 剩余参数 & 扩展运算符  

:::details 剩余参数（Rest）：收集多余参数为数组
```js
function sum(...args) {
  return args.reduce((a, b) => a + b);
}
```
:::

:::details 扩展运算符（Spread）：展开数组/对象
```js
const arr = [1, 2, 3];
const newArr = [...arr, 4]; // => [1,2,3,4]

const obj1 = { a: 1 };
const obj2 = { ...obj1, b: 2 }; // => { a:1, b:2 }
```
:::


## 7. 对象简写（Object Enhancements） 

```js
const name = "Tom";
const user = {
  name,             // 等价于 name: name
  sayHi() {         // 简写方法
    console.log("Hi");
  }
};
```


## 8. 模块化（Modules）  

- 用 `export` / `import` 来导出和引入模块。  

```js
// a.js
export const PI = 3.14;

// b.js
import { PI } from './a.js';
```


##  9. Promise（异步编程）  

```js
new Promise((resolve, reject) => {
  setTimeout(() => resolve("done"), 1000);
}).then(res => console.log(res));
```


## 10. 类（Class）  

- 语法糖，本质仍是原型链继承。  

```js
class Person {
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    console.log(`Hi, I'm ${this.name}`);
  }
}
```


## 11. Map / Set / Symbol

```js
const set = new Set([1, 2, 3, 3]); // 自动去重
const map = new Map();
map.set("a", 100);

const sym = Symbol("id"); // 创建唯一的标识符
```

- `Map` 和 `Set` 都是 可枚举的（可被迭代），但它们不属于“可枚举属性”（如 `for...in`）那种类型。  

| 类型     | for...in | for...of | 可解构 | Symbol.iterator |
| ------ | -------- | -------- | --- | --------------- |
| Object | ✅        | ❌（需手动实现） | ❌   | ❌               |
| Array  | ✅（下标）    | ✅        | ✅   | ✅               |
| Map    | ❌        | ✅        | ✅   | ✅               |
| Set    | ❌        | ✅        | ✅   | ✅               |

