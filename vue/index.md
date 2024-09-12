# vue

## 创建项目

<br>

### vue create project

不推荐

### pnpm create vite@latest

更干净，自己添加依赖包

### pnpm create vue@latest

最方便

## 根据内容生成二维码

使用vue-qr包 可以在中间添加图片

- 安装
  
```sh
pnpm i vue-qr
```
- vue2中引入
  
```vue
import VueQr from 'vue-qr'
```
```vue
  components: {
    VueQr
  },
```
- 使用

```vue
<VueQr :text="text"></VueQr>
```

- 参数

|Parameter|Explanation|
|:-:|:-:|
|text|Contents to encode. 欲编码的内容|
|bgSrc|Background url to embed in the QR code. 欲嵌入的背景图地址|
|size|Width as well as the height of the output QR code, includes margin. 尺寸, 长宽一致, 包含外边距|

## vue3 

<br>

#### ts vscode爆红

<br>

- 禁用vuter volar 插件
  
- 使用Vue - Official插件

#### ref和reactive

在 `Vue 3` 中，`ref` 和 `reactive` 都用于创建响应式数据，但它们在处理深层次嵌套对象和数组时的行为有所不同。特别是在处理复杂嵌套结构时，`ref` 可能会出现一些响应式的“陷阱”，而 `reactive` 则能更好地处理这些情况。以下是具体的例子和说明。

**ref 的陷阱**

`ref` 主要用于处理单个基本值、对象、或数组的响应式，但其处理嵌套结构时的行为需要小心。`ref` 会为单一值（包括对象和数组）创建响应式引用，但如果对对象或数组进行深层次的操作，可能会遇到意外的行为。

- 示例
假设我们使用 ref 创建一个对象，并尝试修改其深层属性：

```ts
import { ref } from 'vue';

const state = ref({
  user: {
    name: 'Alice',
    address: {
      city: 'Wonderland',
      zip: '12345'
    }
  }
});

// 修改深层次属性
state.value.user.address.city = 'New Wonderland';

// 这个修改不会触发视图更新，因为 Vue 不会追踪深层次的变化
```

在上述示例中，虽然我们修改了 state.value.user.address.city 的值，但是由于 ref 主要关注对 .value 的修改，并不会深入追踪其内部对象的变化，因此视图不会更新。

**reactive 的优势**

`reactive` 对象在处理深层次嵌套时能够自动跟踪所有嵌套的属性，并确保所有级别的属性都能触发视图更新。

- 示例
  同样的结构使用 reactive 处理如下：
  
  ```ts
  import { reactive } from 'vue';
  
  const state = reactive({
    user: {
      name: 'Alice',
      address: {
        city: 'Wonderland',
        zip: '12345'
      }
    }
  });
  
  // 修改深层次属性
  state.user.address.city = 'New Wonderland';
  
  // 这个修改会自动触发视图更新，因为 reactive 会递归追踪所有嵌套的属性
  ```
  在上述示例中，由于 `reactive` 能够深入追踪所有嵌套属性的变化，因此修改 `state.user.address.city` 会正确地触发视图更新。

**总结**

  -  `ref` 主要关注对 `.value` 的修改，并不会深入追踪其内部对象的变化，因此视图不会更新。`reactive` 能够深入追踪所有嵌套属性的变化，因此修改会正确地触发视图更新。
  -  当对象很深或包含多个嵌套层级时，使用 ref 可能会显得复杂。你必须记住要在访问嵌套属性时始终使用 `.value`，这可能会导致代码变得繁琐。
  -  确保不会修改内部属性的引用数据类型用`ref`更方便，需要修改内部属性的一定要用`reactive`

**注意**
  - 当你向使用 `reactive` 创建的对象添加新属性时，这些新属性默认情况下 <font style="color:red">会</font> 自动成为响应式的。
  - `reactive`对象直接重新赋值会失去响应性，应该改变`reacitive`对象的属性，可以使用object.assign(),或者根据具体需求，自己写方法。
    ```js(参考方法，具体得看实际需求)
          // 深层更新函数，包括对数组和动态添加属性的处理
      function deepAssign(target, source) {
        for (const key of Object.keys(source)) {
          if (Array.isArray(source[key]) && Array.isArray(target[key])) {
            // 处理数组
            target[key] = [...source[key]]; // 替换整个数组
          } else if (source[key] instanceof Object && target[key] instanceof Object) {
            // 处理嵌套对象
            deepAssign(target[key], source[key]);
          } else {
            // 处理新属性和基本类型
            target[key] = source[key];
          }
        }
      }
    ```
  - 数组和对象的处理：对于 Vue 3 中的数组或对象，直接修改数组或对象的内容（比如使用 push、splice 或添加对象属性）都会被 Vue 的响应式系统自动追踪。
  - vue2中需要用set,来保证响应
    Vue.set 方法接受三个参数：
    1. 对象：需要添加新属性的目标对象。
    2. 属性名：新属性的键名。
    3. 属性值：新属性的值。
       
  ```js
     data() {
      return {
          items: ['a', 'b', 'c']
        };
    },
    methods: {
      updateItem() {
        // 使用 Vue.set 更新数组中的项
        Vue.set(this.items, 1, 'z');
      }
    }
  ```

  ```js
   data() {
      return {
        user: {
          name: 'Alice',
          address: {
            street: 'Main St'
          }
        }
      };
    },
    methods: {
      updateAddress() {
        // 使用 Vue.set 更新嵌套对象中的属性
        Vue.set(this.user.address, 'city', 'Wonderland');
      }
    }
  ```

#### vue3 引入

- 引入地址

```ts
const videoUrl = ref<string>(new URL('@/assets/video/flower.webm', import.meta.url).href)
```

- 引入json数据
  
```ts
import dmJson from '@/assets/json/dm.json'
const dmList = reactive(dmJson)  
```
- vue3 文件引入，被引入的文件只有隐式any类型，提示找不到引入文件的类型声明文件
  - 创建 在src文件下shims-vue.d.ts 文件
  - TypeScript 的编译器在解析项目文件时会自动处理 tsconfig.json 中配置的 include 和 exclude 选项。
  - 定义了一个基础的类型声明，让 TypeScript 知道如何处理 .vue 文件的导入。在实际的 .vue 文件中，script 部分定义的具体类型会提供更详细的信息。
    ```ts
    // shims-vue.d.ts
    declare module '*.vue' {
      import { DefineComponent } from 'vue';
      const component: DefineComponent<{}, {}, any>;
      export default component;
    }
    ```
    - declare module '*.vue':
      这段代码告诉 TypeScript，任何以 .vue 结尾的文件都是一个模块。这样，TypeScript 可以识别和处理 .vue 文件。
    - const component: DefineComponent<{}, {}, any>:
      这里定义了一个名为 component 的常量，其类型是 DefineComponent<{}, {}, any>。DefineComponent 是 Vue 3 提供的一个类型，代表 Vue 组件的类型。
    - {}: 组件的 Props 类型，这里用空对象表示组件没有定义 Props。
    - {}: 组件的 Emits 类型，这里用空对象表示组件没有自定义事件。
    - any: 组件的 Slots 类型，any 表示任何类型的插槽。
    - export default component:
      将 component 常量作为模块的默认导出。这意味着在导入 .vue 文件时，你会得到一个 Vue 组件实例。
