# 闭包  


## 一、什么是闭包？

> 闭包是指函数可以“记住”并访问它定义时所在的作用域，即使这个函数在当前作用域之外被调用。

## 二、闭包的典型例子  

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

## 三、闭包的两个关键特性

1. 可以访问外部函数作用域中的变量

2. 即使外部函数已经执行完毕，闭包仍能“记住”那个作用域

## 四、闭包的经典用途

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

## 五、闭包的注意事项

✅ 优点
- 封装变量，保护数据

- 可以创建函数工厂

- 在异步中保存数据

⚠️ 缺点
- 容易造成 内存泄漏（闭包引用的变量无法被回收）

- 使用不当会导致 调试困难  

## 六、闭包 vs 普通作用域

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




