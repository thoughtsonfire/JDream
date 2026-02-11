# 常见情况

## 非空断言操作符（!）and 选项链操作符（?.）

<br>

在 TypeScript 中，document.querySelector 方法可能返回 null，这就是为什么你会遇到“不能将类型 HTMLElement | null 分配给类型 HTMLElement”的错误。要解决这个问题，你需要确保你处理了可能为 null 的情况。

- 如果你确信元素一定存在（例如，在页面加载完成后），你可以使用非空断言操作符`!`来告诉 TypeScript 这个值不会是 null：

```ts
const header = document.querySelector("header")!;
header.style.backgroundColor = "blue";
```

- 使用类型断言告诉 TypeScript 变量是 HTMLElement：

```ts
const element = document.querySelector("header") as HTMLElement;
```

- 如果你知道 querySelector 返回的元素类型，可以使用泛型来确保类型：

```ts
const header = document.querySelector<HTMLElement>("header");

if (header) {
  header.style.backgroundColor = "blue";
}
```

- 要解决 HTMLElement | null 类型不能直接调用 HTMLElement 方法的问题,如果你希望在 element 为 null 时避免错误，可以使用选项链操作符（?.）：

```ts
const element = document.querySelector("header");
element?.style.backgroundColor = "blue"; // 如果 element 为 null，则不会执行
```

<br>

## Element 和 HTMLElement 的区别理解

<br>

- `Element` 类型：
  - 范围：`Element` 是一个更广泛的接口，代表了文档中的任何元素，包括 `HTML` 元素、`SVG` 元素、甚至 `XML` 元素等。
  - 适用性：它可以表示任何类型的 DOM 元素节点，不限于 `HTML`。`Element` 也不特定于节点类型，比如可以包括 `HTML` 和 `SVG` 这样的节点类型。

- `HTMLElement` 类型：
  - 范围：`HTMLElement` 是 `Element` 的一个子接口，专门用于表示 `HTML` 元素。它在 `Element` 的基础上添加了与 `HTML` 相关的属性和方法。
  - 适用性：`HTMLElement` 仅适用于 `HTML` 文档中的元素，而不适用于 SVG 或其他 XML 元素。它代表的是 `HTML` 文档中的节点元素（即 `<div>`, `<span>`, `<a>` 等）。

## 对象类型，key value 都未知，个数也不知道

```ts
export type AnyKey = {
  [key: string]: any;
};
```
