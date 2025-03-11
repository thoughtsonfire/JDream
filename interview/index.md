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

