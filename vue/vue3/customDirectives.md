# 自定指令 Custom Directives

## 指令钩子  

一个指令的定义对象可以提供几种钩子函数 (都是可选的)：  

```js
const myDirective = {
  // 在绑定元素的 attribute 前
  // 或事件监听器应用前调用
  created(el, binding, vnode) {
    // 下面会介绍各个参数的细节
  },
  // 在元素被插入到 DOM 前调用
  beforeMount(el, binding, vnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el, binding, vnode) {},
  // 绑定元素的父组件更新前调用
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载前调用
  beforeUnmount(el, binding, vnode) {},
  // 绑定元素的父组件卸载后调用
  unmounted(el, binding, vnode) {}
}
```

## 钩子参数

指令的钩子会传递以下几种参数：  

- el：指令绑定到的元素。这可以用于直接操作 DOM。

- binding：一个对象，包含以下属性。

  - value：传递给指令的值。例如在 v-my-directive="1 + 1" 中，值是 2。
  - oldValue：之前的值，仅在 beforeUpdate 和 updated 中可用。无论值是否更改，它都可用。
  - arg：传递给指令的参数 (如果有的话)。例如在 v-my-directive:foo 中，参数是 "foo"。
  - modifiers：一个包含修饰符的对象 (如果有的话)。例如在 v-my-directive.foo.bar 中，修饰符对象是 { foo: true, bar: true }。
  - instance：使用该指令的组件实例。
  - dir：指令的定义对象。

- vnode：代表绑定元素的底层 VNode。

- prevVnode：代表之前的渲染中指令所绑定元素的 VNode。仅在 beforeUpdate 和 updated 钩子中可用。

举例来说，像下面这样使用指令：  

```vue
<div v-example:foo.bar="baz"/>
```

`binding` 参数会是一个这样的对象：  

```js
{
  arg: 'foo',
  modifiers: { bar: true },
  value: /* `baz` 的值 */,
  oldValue: /* 上一次更新时 `baz` 的值 */
}
```

和内置指令类似，自定义指令的参数也可以是动态的。举例来说：  

```vue
<div v-example:[arg]="value"></div>
```

这里指令的参数会基于组件的 `arg` 数据属性响应式地更新。  

> [!NOTE]
>除了 el 外，其他参数都是只读的，不要更改它们。  
>若你需要在不同的钩子间共享信息，推荐通过元素的 dataset attribute 实现。  

## 简化形式  

对于自定义指令来说，一个很常见的情况是仅仅需要在 mounted 和 updated 上实现相同的行为，除此之外并不需要其他钩子。这种情况下我们可以直接用一个函数来定义指令，如下所示：  

```vue
<div v-color="color"></div>
```

```js
app.directive('color', (el, binding) => {
  // 这会在 `mounted` 和 `updated` 时都调用
  el.style.color = binding.value
})
```

## 注册指令  

在 `<script setup>` 中，任何以 `v` 开头的驼峰式命名的变量都可以当作自定义指令使用。  

```vue
<script setup>
// 在模板中启用 v-highlight
const vHighlight = {
  mounted: (el) => {
    el.classList.add('is-highlight')
  }
}
</script>

<template>
  <p v-highlight>This sentence is important!</p>
</template>
```

在不使用 `<script setup>` 的情况下，自定义指令需要通过 `directives` 选项注册：  

```js
export default {
  setup() {
    /*...*/
  },
  directives: {
    // 在模板中启用 v-highlight
    highlight: {
      /* ... */
    }
  }
}
```

将一个自定义指令全局注册到应用层级也是一种常见的做法：  

```js
const app = createApp({})

// 使 v-highlight 在所有组件中都可用
app.directive('highlight', {
  /* ... */
})
```

## 在组件上使用

>[!WARNING]不推荐
>不推荐在组件上使用自定义指令。当组件具有多个根节点时可能会出现预期外的行为。

当在组件上使用自定义指令时，它会始终应用于组件的根节点，和透传 `attributes` 类似。  

```vue
<MyComponent v-demo="test" />
```

```vue
<!-- MyComponent 的模板 -->

<div> <!-- v-demo 指令会被应用在此处 -->
  <span>My component content</span>
</div>
```

需要注意的是组件可能含有多个根节点。当应用到一个多根组件时，指令将会被忽略且抛出一个警告。和 `attribute` 不同，指令不能通过 `v-bind="$attrs"` 来传递给一个不同的元素。

## 实用自定义指令

<br>

### 监听元素是否可见  

- 监听元素在视口（viewport）中是否可见   

- 用途：懒加载，防止初屏卡顿

```vue
<template>
  <div v-observe-visibility="onVisibilityChange" style="margin-top:800px;height:200px;background:lightblue;">
    我被观察啦！进入/离开视口会触发回调
  </div>
</template>

<script setup lang="ts">
import type { Directive } from 'vue'

// 定义回调类型
type VisibilityCallback = (isVisible: boolean, entry: IntersectionObserverEntry) => void

// 自定义指令
const vObserveVisibility: Directive<HTMLElement, VisibilityCallback> = {
  mounted(el, binding) {
    const callback = binding.value
    if (typeof callback !== 'function') return

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        callback(entry.isIntersecting, entry)
      })
    }, { threshold: 0.1 })

    observer.observe(el)
    ;(el as any).__observer__ = observer
  },
  unmounted(el) {
    (el as any).__observer__?.disconnect()
    delete (el as any).__observer__
  }
}

// 监听回调
function onVisibilityChange(isVisible: boolean, entry: IntersectionObserverEntry) {
  console.log('是否可见:', isVisible, entry)
}
</script>

```

<br>

### 水印

- 作用:页面加水印

```vue
<template>
  <div v-watermark="'机密文件 请勿外传'" style="width:100%;height:300px;background:#f9f9f9;">
    这里是内容，背景有水印 👇
  </div>
</template>

<script setup lang="ts">
import type { Directive } from 'vue'

// 生成水印背景（canvas 转 base64）
function createWatermarkBase64(text: string): string {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')!
  const width = 200
  const height = 150
  canvas.width = width
  canvas.height = height

  ctx.clearRect(0, 0, width, height)

  // 样式
  ctx.fillStyle = 'rgba(0, 0, 0, 0.15)' // 半透明黑
  ctx.font = '16px sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.translate(width / 2, height / 2)
  ctx.rotate(-20 * Math.PI / 180) // 旋转角度
  ctx.fillText(text, 0, 0)

  return canvas.toDataURL('image/png')
}

// 自定义指令
const watermark: Directive<HTMLElement, string> = {
  mounted(el, binding) {
    const text = binding.value || '默认水印'
    const base64Url = createWatermarkBase64(text)

    el.style.position = 'relative'
    el.style.backgroundImage = `url(${base64Url})`
    el.style.backgroundRepeat = 'repeat'
  },
  updated(el, binding) {
    if (binding.value !== binding.oldValue) {
      const base64Url = createWatermarkBase64(binding.value!)
      el.style.backgroundImage = `url(${base64Url})`
    }
  }
}

</script>
```