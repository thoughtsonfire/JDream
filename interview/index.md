# 前端面试题  


## **vue**  


#### **vue插槽**

作用：在组件中嵌套内容，使得组件可以在保持封装的同时，灵活地插入不同的内容;  

总结：
- **默认插槽**：插入没有指定名字的内容。
- **具名插槽**：指定多个不同位置的插槽，可以根据需要插入不同的内容。
- **用域插槽**：让父组件能够访问子组件的数据，并使用这些数据动态地渲染插槽内容。
  
插槽提供了更强大的灵活性和重用性，可以帮助你构建更加通用和可维护的组件。

1. **默认插槽（Default Slot）**

  默认插槽是最基本的插槽，允许你向组件传递一个内容块，且该内容块会被插入到插槽的位置。
  ::: code-group

  ```vue  
  <!-- ParentComponent.vue -->
  <template>
    <ChildComponent>
      <p>这是默认插槽的内容</p>
    </ChildComponent>
  </template>
  
  <!-- ChildComponent.vue -->
  <template>
    <div>
      <slot></slot>  <!-- 这里是默认插槽的位置 -->
    </div>
  </template>

  ```
  ::: 
  
2. **具名插槽（Named Slots）**
   
  具名插槽允许你为插槽指定名字，从而在多个插槽之间插入不同的内容。
  
  ::: code-group

  ```vue
    <!-- ParentComponent.vue -->
    <template>
      <ChildComponent>
        <template v-slot:header>
          <h1>这是头部内容</h1>
        </template>
    
        <template v-slot:footer>
          <p>这是底部内容</p>
        </template>
      </ChildComponent>
    </template>
    
    <!-- ChildComponent.vue -->
    <template>
      <div>
        <header><slot name="header"></slot></header> <!-- 具名插槽位置 -->
        <main><slot></slot></main>  <!-- 默认插槽位置 -->
        <footer><slot name="footer"></slot></footer> <!-- 具名插槽位置 -->
      </div>
    </template>
  ```
  :::  

3. **作用域插槽（Scoped Slots）**

 作用域插槽是具名插槽的扩展，它允许父组件访问子组件的数据。通过作用域插槽，父组件可以接收到子组件传递的数据，并将其作为插槽内容的一部分。

 ::: code-group

 ```vue
 <!-- ParentComponent.vue -->
  <template>
    <ChildComponent>
      <template v-slot:default="slotProps">
        <p>收到子组件的数据：{{ slotProps.message }}</p>
      </template>
    </ChildComponent>
  </template>
  
  <!-- ChildComponent.vue -->
  <template>
    <div>
      <slot :message="message"></slot>  <!-- 传递数据给父组件 -->
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        message: 'Hello from ChildComponent!'
      };
    }
  }
  </script>
 ```
 :::  

#### **vue中的常用指令**

##### **v-cloak**  

- **原理：** 在vue程序编译完成之前，将绑定的DOM元素添加一个`display:none`,避免未解析的模板直接显示在用户面前，通常和css配合使用
- **作用：** 主要用来防止闪烁， `v-cloak` 是一个专门用于解决 Vue 编译延迟的指令。它通常与 CSS 一起使用，以确保在 Vue 完全编译并处理完模板之前，页面不会显示 Vue 特有的占位符标记（如 {{ message }}）。

::: code-group

```html
<style>
[v-cloak] { display: none; }
</style>

<div v-cloak>
  {{ message }}
</div>

```
:::

##### **v-pre**  

- **原理：** v-pre指令告诉VUE 忽略这个节点及其所以子节点的编译过程。
- **作用：** 减少了不必要的计算量，提升了性能，避免干扰。

::: code-group

```html
<div v-pre>
  {{ rawMustache }}  <!-- 这里的内容将会直接输出为 {{ rawMustache }} 而不是进行数据绑定 -->
</div>

```
:::

#### **Vue Router 中如何获取路由传递过来的参数**   

在Vue Router 中有两种常见的获取参数的方式
1. 动态路由匹配（param）例如`/users/:id` `users/123`
2. 参数查询（query，可以在url中不显示，在request body 中）例如：`/search?q=apple&type=fruit`，这里的 `q` 和 `type` 是查询参数。

### **Vue中的过滤器**  

**回答重点**  

过滤器在Vue中主要用于文本格式化。通常用在模板表达式中，将数据进行转换，格式化。  
1. 日期格式化：将后端返回的时间戳转化成常见的日期格式。
2. 文本格式化：将文字转换为大小写或者截取一定长度等。
3. 数值格式化：对货币、百分比等数值进行格式化显示。

在Vue3中过滤器已经被移除，官放推荐用方法（methods）或者计算属性（computed）来代替。

- 使用过滤器（Vue2）

  :::code-group
  
  ```vue2
  Vue.filter('capitalize', function (value) {
    if (!value) return '';
    value = value.toString();
    return value.charAt(0).toUpperCase() + value.slice(1);
  });
  ```
  :::

- 在模板中使用

  :::code-group
  ```vue2
  <p>{{ message | capitalize }}</p>
  ```
  :::

- 替代方法（Vue3）

  :::code-group
  ```vue3
  export default {
    methods: {
      capitalize(value) {
        if (!value) return '';
        value = value.toString();
        return value.charAt(0).toUpperCase() + value.slice(1);
      }
    }
  }
  ```
  :::

- 在模板中使用

  :::code-group
  ```vue3
  <p>{{ capitalize(message) }}</p>
  ```
  :::


### **Vue Router 中配置404页面**  

**回答重点**  

配置一个路径`/404` 指向404页面，再用通配符`*`配置路径，重定向到`/404`,保证url路径和页面路径一致。  

:::code-group

```vue
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/components/Home.vue';
import NotFound from '@/components/NotFound.vue'; // 这是你的 404 页面组件

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/404',
    component: NotFound
  },
  {
    path: '*', // 通配符，一定要放在最后
    redirect: "/404"
  }
];

const router = new VueRouter({
  mode: 'history', // 使用 HTML5 History 模式
  routes
});

export default router;

```
:::


### **Vue的template标签有什么用**  

**回答重点**  

template 主要是作为一个占位符去使用，在Vue2和Vue3中template的表现有一些区别：   

Vue2：作为一个占位符或插槽内容，无论什么情况，template在compiler后会被去除。   

Vue3：用法同Vue2，但如果不使用v-if、v-else-if、v-else、v-solt、v-for的时候，Vue不会处理，会直接渲染成一个HTML原生的template标签。

