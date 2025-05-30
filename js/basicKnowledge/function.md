# function  

## call  

🔍 **语法**  

```js
func.call(thisArg, arg1, arg2, ...);
```

- `thisArg`：要绑定的 `this` 对象

- arg1, arg2...：传给函数的参数（逐个传）  

🔶 **示例**  

```js
function greet(msg) {
  console.log(`${msg}, my name is ${this.name}`);
}

const person = { name: "Alice" };
greet.call(person, "Hello"); // Hello, my name is Alice
```

🔧 **用途**  

- 临时调用函数并改变 `this` 指向

- 函数借用，如数组方法应用到类数组对象  

```js
Array.prototype.slice.call(arguments); // arguments 转数组
```

| 部分代码                    | 含义                                           |
| ----------------------- | -------------------------------------------- |
| `Array.prototype.slice` | 取出数组的 `slice` 方法（可复制一段数组）                    |
| `.call(arguments)`      | 用 `call` 把 `slice` 方法的 `this` 指向 `arguments` |
| 最终效果                    | 把 `arguments` 当数组一样切片，得到真正数组                 |  


## apply    

🔍 **语法**  

```js
func.apply(thisArg, [arg1, arg2, ...]);
```
- 与 `call()` 相同，但参数是数组或类数组对象

🔶 **示例**  

```js
function greet(msg) {
  console.log(`${msg}, my name is ${this.name}`);
}

const person = { name: "Alice" };
greet.apply(person, ["Hi"]); // Hi, my name is Alice
```

🔧 **用途**  

- 动态传参，例如参数数量不固定时

- 老式方式（现代推荐用扩展运算符 `...`）  

```js
const arr = [1, 2, 3];
Math.max.apply(null, arr); // ✅ 早期写法
Math.max(...arr);          // ✅ 现代写法（推荐）
```

## bind  

🔍 **语法**  

```js
const newFunc = func.bind(thisArg, arg1, arg2, ...);
```
- 返回一个新函数，永久绑定了 this 和部分参数（可选）  

🔶 **示例**  

```js
function multiply(a, b) {
  return a * b;
}
const double = multiply.bind(null, 2); // 绑定 a=2
console.log(double(5)); // 10
```  

🔧 **用途**   

- 延迟调用但保留 this

- 事件回调中保留上下文  

```js
const button = document.querySelector("button");
const obj = {
  name: "Alice",
  handleClick: function () {
    console.log(this.name);
  },
};

button.addEventListener("click", obj.handleClick.bind(obj)); // ✅ 保证 this 指向 obj
```

## toString  

🔍 **语法**  

```js
func.toString();
```

- 返回函数体的源码字符串  

🔶 **示例**  

```js
function add(a, b) {
  return a + b;
}

console.log(add.toString());
// 输出字符串：function add(a, b) { return a + b; }
```

🔧 **用途**   

- 调试、查看函数源代码

- 某些场景用于源码分析（如工具库、代码格式化器）  


## length  

🔍 **语法**  

```js
func.length;
```

- 表示函数预期接收的形参个数（不包括 rest 参数 和默认值）  

🔶 **示例**  

```js
function f(a, b, c = 3, ...rest) {}
console.log(f.length); // 2 —— 只算 a 和 b，忽略有默认值或 rest
```

🔧 **用途**   

- 反射型编程，分析函数签名

- 框架中判断回调函数参数数量


## name  

🔍 **语法**  

```js
func.name;
```

- 返回函数的名称字符串

- 匿名函数时返回 ''

- 箭头函数、匿名函数赋值时有推断  

🔶 **示例**  

```js
function foo() {}
console.log(foo.name); // "foo"

const bar = function () {};
console.log(bar.name); // "bar"（已推断）

const baz = () => {};
console.log(baz.name); // "baz"
```

🔧 **用途**   

- 调试错误栈时识别函数名

- 元编程（如 Vue 组件、React Hooks 等）


## 总结对照表  

| 方法/属性        | 类型 | 是否执行 | 作用                  | 参数形式                    | 用途示例         |
| ------------ | -- | ---- | ------------------- | ----------------------- | ------------ |
| `call()`     | 方法 | ✅    | 改变 `this` 并执行       | `call(this, arg1, ...)` | 立即调用，借用函数    |
| `apply()`    | 方法 | ✅    | 改变 `this` 并执行       | `apply(this, [args])`   | 动态传参（老写法）    |
| `bind()`     | 方法 | ❌    | 改变 `this`，返回新函数     | `bind(this, arg1, ...)` | 延迟调用、事件回调    |
| `toString()` | 方法 | ❌    | 返回函数源码字符串           | 无                       | 调试、代码显示      |
| `length`     | 属性 | ❌    | 返回形参个数（忽略默认值和 rest） | 无                       | 函数分析、框架调用控制  |
| `name`       | 属性 | ❌    | 返回函数名               | 无                       | 调试、自动命名组件或函数 |







