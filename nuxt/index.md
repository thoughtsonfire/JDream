# nuxt

<LinkCard url="https://nuxt.com/" title="nuxt官网" description="https://nuxt.com/" logo="https://nuxt.com/icon.png"/>

## 创建项目

:::code-group

```bash [npm]
npx nuxi init my-app
```

```bash [pnpm]
pnpm dlx nuxi init my-app
```

```bash [yarn]
yarn create nuxt my-app
```

:::

## 安装使用组件库

### 安装

```bash
pnpm exec nuxi module add ant-design-vue
```

### 配置

```ts [nuxt.config.ts]
// https://nuxt.com/docs/api/configuration/nuxt-config

/**
 * Nuxt + Ant Design Vue 4 相关配置说明
 * ---------------------------------------------------------------------------
 * 曾遇到的问题与对应手段（便于后续维护）：
 *
 * 1) dev 时报 Failed to resolve import "#app-manifest"
 *    - 原因：Nuxt 的 app manifest 会用到虚拟模块 `#app-manifest`；在「先 build/generate 再 dev」、
 *      或 Vite 预构建缓存异常时，Vite 的 import-analysis 可能解析失败（已知问题，非业务代码错误）。
 *    - 参考：https://github.com/nuxt/nuxt/issues/30461
 *    - 处理：将 experimental.appManifest 设为 false；若将来需要该实验特性，可改为 true 并先删除
 *      node_modules/.cache/vite 后执行 pnpm exec nuxi prepare 再 dev。
 *
 * 2) 仅用手写 unplugin-vue-components + AntDesignVueResolver 时，出现 IPC connection closed
 *    - 原因：Resolver 默认会按需引入 `.../style/css`，而 Ant Design Vue 4 已无该路径，SSR 转换失败。
 *    - 处理：改用官方模块 @ant-design-vue/nuxt 做按需与 SSR 样式策略（见下方 antd.extractStyle）。
 *
 * 3) v4 主题色用 Less 的 modifyVars 不生效
 *    - 原因：组件样式为 CSS-in-JS，Vite 里 less.modifyVars 只作用于你自己 import 的 .less 文件。
 *    - 处理：在根组件用 ConfigProvider 的 theme.token（如 colorPrimary），见 app/app.vue。
 *
 * 4) 刷新瞬间样式闪烁（FOUC）
 *    - 原因：CSS-in-JS 在客户端注入，首屏 HTML 若未带齐样式会闪一下。
 *    - 处理：开启 antd.extractStyle，根模板最外层使用 <a-extract-style>（模块会注册该组件并抽 SSR 样式）。
 */
export default defineNuxtConfig({
  /** Nitro 行为兼容基准，避免升级后静默改行为。 */
  compatibilityDate: "2026-04-11",

  devtools: { enabled: true },

  /**
   * 关闭实验性 App Manifest，避免开发时 #app-manifest 解析失败。
   * 若项目明确依赖该特性，再评估改为 true 并配合清缓存 / 升级 Nuxt。
   */
  experimental: {
    appManifest: false,
  },

  /** 官方集成：按需组件、图标与 message 等；勿与手写 AntDesignVueResolver 重复配置。 */
  modules: ["@ant-design-vue/nuxt"],

  /** 全局 reset，与组件 CSS-in-JS 互补（排版、盒模型等基础）。 */
  css: ["ant-design-vue/dist/reset.css"],

  /**
   * @ant-design-vue/nuxt 选项（configKey 为 antd）
   * extractStyle: 在 SSR 时抽取样式并注入首屏，减轻刷新时样式闪烁。
   * 文档：https://nuxt.com/modules/ant-design-vue
   */
  antd: {
    extractStyle: true,
  },
});
```

### 使用

```vue [app.vue]
<script setup lang="ts">
/**
 * 根组件：Ant Design Vue 4 主题与 SSR 样式抽取
 *
 * - 主题：v4 使用 Design Token（theme.token），勿再用 Less 的 @primary-color / modifyVars 改组件主题。
 * - 模板里绑定名用 providerTheme，避免与 ant-design-vue 导出的 `theme` 命名混淆。
 */
import { computed } from "vue";
import type { ThemeConfig } from "ant-design-vue/es/config-provider/context";

const providerTheme = computed<ThemeConfig>(() => ({
  token: {
    colorPrimary: "#ea6f5a",
  },
}));
</script>

<template>
  <!--
    最外层必须是 a-extract-style（与 nuxt.config 里 antd.extractStyle: true 配合）。
    模块提供的 AExtractStyle 内部已包含带 cache 的 StyleProvider，并在 SSR 渲染结束时
    把 CSS-in-JS 抽进 head，避免首屏「先无样式、后注入」的闪烁。
    不要再额外包一层手动 import 的 StyleProvider，以免重复且避免错误解析 es/style-provider 路径。
  -->
  <a-extract-style>
    <!-- 向下传递主题 token，子树内 ant 组件生效 -->
    <a-config-provider :theme="providerTheme">
      <div>
        <a-button type="primary">Primary Button</a-button>
        <a-button type="primary" danger ghost>Danger</a-button>
      </div>
    </a-config-provider>
  </a-extract-style>
</template>
```

## 页面和组件

Nuxt 的页面和组件不需要注册和引入，在pages 和 components目录下直接创建就行

Nuxt 本来就支持在 pages 和 components 下面再分子目录，只是含义不一样。

**pages 下的子目录**

- 可以。子目录会参与 路由路径。
- 例如：- pages/about.vue → /about - pages/user/profile.vue → /user/profile - pages/blog/index.vue → /blog - pages/blog/[id].vue → /blog/:id - 用文件夹组织「版块 / 模块」很常见，没有问题。
  （若你用的是 Nuxt 4 的 app/ 目录结构，一般是 app/pages，规则相同。）

**components 下的子目录**

- 可以。用来按功能、基础组件等分类。
- 自动导入时，子目录一般会反映到 组件名 上，例如：
  - components/base/Button.vue → 常为 BaseButton
  - components/blog/ArticleCard.vue → 常为 BlogArticleCard
- 具体拼接规则可在项目里看 Nuxt 生成的类型或文档：[Components · Nuxt](https://nuxt.com/docs/4.x/directory-structure/app/components)。

**小结**

| 目录                            | 子目录 | 作用                           |
| :------------------------------ | :----- | :----------------------------- |
| pages（或 app/pages）           | ✅     | 形成嵌套路由 \/ 路径           |
| components（或 app/components） | ✅     | 仅组织文件；名称通常带目录前缀 |

所以：可以放在子目录下，按路由需求摆 pages，按模块摆 components 即可。

## app.vue

在 Nuxt 里，根布局（app.vue）里应优先用 `<NuxtPage>`，一般不要用裸的 `<RouterView>`。

**简要对比**

|                | `<RouterView/>`                                      | `<NuxtPage/>`                    |
| :------------- | :--------------------------------------------------- | :------------------------------- |
| 来源           | Vue Router 自带                                      | Nuxt 封装                        |
| 作用           | 只渲染「当前路由匹配的组件」                         | 在同样基础上接上 Nuxt 的页面体系 |
| 和 Nuxt 的关系 | 底层路由仍由 Nuxt 配好，但少了一层 Nuxt 对页面的处理 | 官方推荐的页面出口               |

## Nuxt路由

### 动态路由

如`group-[test].vue` `[id].vue`,[]中是路由参数
父路由页面里边也要放`<NuxtPage/>`,类似 `<RouterView/>`

### 路由跳转

- 链接式导航`<NuxtLink to="/user"><NuxtLink/>`

- 编程式导航

```ts
const router = useRouter();
const toUser = () => {
  router.push({
    path: "/user",
  });
};
```

## 路由中间件

相当于`vue3` 中的路由守卫

```ts
export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie("token");

  if (!token.value) {
    return navigateTo("/login");
  }
});
```

### 命名路由中间件

在/app下创建middleware目录，里边放路由中间件 如 `test.ts`

```ts [/app/middleware/auth.ts]
export default defineNuxtRouteMiddleware((to, from) => {
  console.log(to, from);
});
```

```vue [/app/pages/about]
<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
</script>

<template>
  <div>about</div>
</template>
```

### 全局路由中间件

在/app下创建middleware目录，带`.global` 后缀 如 `run.global.ts`

```ts [/app/middleware/run.global.ts/]
export default defineNuxtRouteMiddleware((to, from) => {
  console.log("全局中间件");
});
```

### 匿名（或内联） 路由中间件

直接写在页面里边,middleware可以是数组，里边放多个中间件

```vue
<script setup lang="ts">
definePageMeta({
  middleware: (to, from) => {
    console.log("2222");
  },
});
</script>

<template>
  <div>about</div>
  <a-button type="primary">Primary Button</a-button>
</template>
```

### 路由中间件总结

全局最先执行，具名和匿名取决于写的顺序

## 插件 plugins

插件的/app/plugins 或者server/plugins/目录下，
只有plugins/目录顶层文件和子目录的index.ts 文件，才会被自动注册

```ts [/app/plugins/myPlugin.ts]
export default defineNuxtPlugin(() => {
  return {
    provide: {
      myPlugin: (msg: string) => `hello ${msg}`,
    },
  };
});
```

- 直接用，无需注册引入

```vue
<template>
  <div>about</div>
  <a-button type="primary">{{ $myPlugin("world") }}</a-button>
</template>
```

## 安装使用pinia

### 安装pinia

```bash
pnpm exec nuxi module add pinia
```

### 使用

目录/app/stores/

```ts [/app/stores/myStore.ts]
export const useMyStore = defineStore("myStore", () => {
  const count = ref(0);
  const increment = () => {
    count.value++;
  };
  return {
    count,
    increment,
  };
});
```

```vue
<script setup lang="ts">
const myStore = useMyStore();
</script>

<template>
  <a-button type="primary" @click="myStore.increment">{{
    myStore.count
  }}</a-button>
</template>
```

### 持久化插件

- 安装

```bash
pnpm add pinia-plugin-persistedstate
```

- 配置

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: [
    "@pinia/nuxt", // required
    "pinia-plugin-persistedstate/nuxt",
  ],
});
```

- 使用

```ts
export const useMyStore = defineStore(
  "myStore",
  () => {
    const count = ref(0);
    const increment = () => {
      count.value++;
    };
    return {
      count,
      increment,
    };
  },
  {
    persist: {
      storage: piniaPluginPersistedstate.localStorage(),
      // pick: ["count"],
    },
  },
);
```

## useState

> 在vue3中，通常用pinia或者vuex来实现状态管理，nuxt中有更方便的更简洁的useState，
> useState用法与vue3的ref类似，而且它是ssr友好，并且useState存储的状态能在服务端和客户端共享

- 页面内

```vue
<script setup lang="ts">
const count = useState("count", () => 0);
const increment = () => {
  count.value++;
};
</script>

<template>
  <div>{{ count }}</div>
  <button @click="increment">Increment</button>
</template>

<style scoped lang="scss"></style>
```

- 共享useState

```ts [/app/composables/state.ts]
export const useCount = () => {
  const count = useState("count", () => 0);
  const increment = () => {
    count.value++;
  };
  return {
    count,
    increment,
  };
};
```

```vue [/app/pages/index.vue]
<script setup lang="ts">
const { count, increment } = useCount();
</script>

<template>
  <div>{{ count }}</div>
  <button @click="increment">Increment</button>
  <NuxtLink to="/about">About</NuxtLink>
</template>

<style scoped lang="scss"></style>
```

```vue [/app/pages/about.vue]
<script setup lang="ts">
const { count, increment } = useCount();
</script>

<template>
  <div>{{ count }}</div>
  <button @click="increment">Increment</button>
  <NuxtLink to="/">Home</NuxtLink>
</template>
```

1. 多标签 / 新窗口 / 单独打开链接（最常见）
   useState 是当前这一次前端运行实例里的内存状态，不会在：

- 另一个标签页
- 「右键 → 在新标签页打开」打开的 B
- 另一个浏览器窗口
  之间同步。每个标签页都是一套独立的 JS，各自一份 count。

2. 整页刷新（F5）或地址栏回车
   一刷新，应用重新跑一遍，没有持久化的话 count 会回到初始值 0。这和 Pinia 不用持久化插件时一样。

3. 怎么验证「真的是同一份状态」
   在 同一个标签 里：

- 打开 A，点几次 Increment
- 用 `<NuxtLink>` 或 `navigateTo` 跳到 `B`（不要新开标签、不要 `F5`）
  这时 B 上的数字应该和 A 一致。若这样仍不一致，再查是否有多处写了不同的 key、或中间调用了 clearNuxtState 等。

## useCookie

> useCookie是基于开源包cookie包（https://github.com/jshttp/cookie）封装的，参数基本一致,
> 客户端和服务端都能访问的情况下使用useCookie保存和读取数据，
> 用useCookie可以设置、获取、删除Cookie，以及检测Cookie是否存在
> nuxt4是自动转码

应用场景:

- 存储用户信息，下次自动登录
- 存储用户偏好，如下次登录将网站设置成相同的偏好
- 存储用户购物车信息

使用：

```vue
<script setup lang="ts">
type UserInfo = { name: string; age: number };
const userInfoCookie = useCookie<UserInfo>("userInfo", { maxAge: 60 * 3 });
userInfoCookie.value = { name: "John Doe", age: 30 };
const userName = userInfoCookie.value?.name;
</script>

<template>
  <div>index</div>
  <div>{{ userName }}</div>
</template>

<style scoped lang="scss"></style>
```

## composables目录

composables 是什么意思？

- Composable 在 Vue 里一般指：用组合式 API（ref、computed、useRoute、useState 等）写出来的可复用函数。
- Nuxt 约定把这类文件放在 composables/（或你项目里的 app/composables/）里，并且会 自动导入，页面、组件里不用手写 import。

和 app/stores 的区别

- useState + composable：轻量、SSR 友好、按 key 全局共享，适合简单共享数据。
- defineStore（你现在的 app/stores/myStore.ts）：更适合复杂逻辑、持久化、插件等。
  两者可以并存：简单共享用 composable 包一层 useState；复杂状态继续用 Pinia。
