# declare 的常见用法

## declare global

> declare global —— 给整个全局作用域增加类型

**用法**

```ts
// global.d.ts
export {}; // 确保文件是模块

declare global {
  type ID = string | number;

  interface User {
    id: ID;
    name: string;
  }

  interface Window {
    __APP_VERSION__: string;
  }
}
```

**作用**

- 声明全局类型 / 接口 / 常量

- 不需要 import 就可以直接用

- 可以扩展原生对象（如 Window、Array 等）

**使用示例**

```ts
const user: User = { id: 1, name: "Jack" };

window.__APP_VERSION__ = "1.0.0";
```

## declare module

> declare module —— 给模块/包增加类型或扩展

**用法**

1. 给第三方模块添加类型

```ts
// vue-shim.d.ts
declare module "vue" {
  interface ComponentCustomProperties {
    $myGlobalFunc(): void;
  }
}
```

- 这里的 vue 指模块名

- 增加 Vue 组件实例的 $myGlobalFunc

- 任何组件里都能用 $myGlobalFunc()，不用 import

2. 声明没有类型的模块

```ts
declare module "*.png";
declare module "*.svg" {
  const value: string;
  export default value;
}
```

- 告诉 TS，这类文件可以 import

- 返回 any 或自己定义的类型

**作用**

- 扩展现有模块的类型

- 或者声明没有类型的模块

- 只对特定模块生效，不是全局

## declare

> declare 单独用 —— 声明某个值或类型存在

**用法**

```ts
declare const APP_ENV: "dev" | "prod";
declare function fetchData(url: string): Promise<any>;
declare class Person {
  name: string;
  constructor(name: string);
}
```

**作用**

- 告诉 TypeScript “这个变量/函数/类在运行时一定存在，我只声明它的类型”

- TS 不会生成 JS 代码（只是类型检查）

- 局部有效（在当前文件作用域或者 import 的模块作用域）

**例子**

```ts
// global.d.ts
declare const APP_VERSION: string;

console.log(APP_VERSION); // ✅ TS 知道它是 string
```

- 这里不用 global，TS 会默认认为它是 全局变量（因为在 .d.ts 文件里顶层声明）

- 如果在普通 .ts 文件里，declare const 只在当前文件有效

## 总结

| 用法                                    | 作用                    | 作用域                                 | 生成 JS      |
| --------------------------------------- | ----------------------- | -------------------------------------- | ------------ |
| `declare const/let/function/class/type` | 声明存在的变量或类型    | 当前文件（或 `.d.ts` 文件顶层 = 全局） | ❌ 不生成 JS |
| `declare global { ... }`                | 扩展全局类型/接口       | 全局                                   | ❌           |
| `declare module 'x' { ... }`            | 扩展模块类型 / 声明模块 | 指定模块                               | ❌           |

| 写法                                                              | TS 能否赋值         | 优缺点                            |
| ----------------------------------------------------------------- | ------------------- | --------------------------------- |
| `declare const __APP_VERSION__`                                   | ❌ 不能赋值，只能读 | 安全，适合从 HTML/script 注入常量 |
| `declare global { interface Window { __APP_VERSION__: string } }` | ✅ 可以赋值         | 官方推荐，安全可控                |
| `declare global { var __APP_VERSION__: string }`                  | ✅ 可以赋值         | 可直接用，但污染全局，不推荐      |

## `.d.ts`

- `.d.ts` 文件的本质

- `.d.ts` 文件是 类型声明文件

- TS 默认把它当作 全局类型信息 来解析

- 顶层写的接口 / 类型 通常自动是全局的

**小结**

- interface / type / enum（类型层面） → .d.ts 顶层写，不用 declare 也全局可用

- TS 会自动把它当作全局类型

| 类型 / 变量             | 不加 declare        | declare / declare global     |
| ----------------------- | ------------------- | ---------------------------- |
| interface / type / enum | ✅ 全局可用         | 可加也可以                   |
| const / let / var       | ❌ 无法使用         | ✅ declare 或 declare global |
| function / class        | ❌ 一般需要 declare | ✅ declare 或放模块中        |

**总结**

- 类型声明（interface / type） → .d.ts 顶层写即可全局

- 运行时变量（const/let/var） → 必须 declare 或挂 window

- 不要随便用顶层 var 声明全局变量，推荐挂 window 安全
