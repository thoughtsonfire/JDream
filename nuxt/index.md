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

## Nuxt中的接口请求数据获取

> 类似vue3中的axios封装

> Nuxt 提供了useFetch、useLazyFetch、useAsyncData和useLazyAsyncData 四个组合式API以及一个全局辅助函数$fetch来处理应用程序中的数据获取。

> useFetch可以实现其它三个API的全部功能,实际开发中，我们只需要使用useFetch 一个API.

### 简单使用

```ts
const { data, status, error, refresh, clear } = await useFetch<{
  title: string;
}>("https://api.nuxt.com/modules", {
  pick: ["title"],
  server: false,
});

const param1 = ref("value1");
const {
  data: data2,
  status: status2,
  error: error2,
  refresh: refresh2,
} = await useFetch("https://api.nuxt.com/modules", {
  query: { param1, param2: "value2" },
  server: false,
});
```

### 基础封装

```ts
import type { FetchContext, FetchOptions, FetchResponse } from "ofetch";

/** 与 method、body、query 拆开，由 data / 各方法自行组装 */
type HttpConfig = Omit<FetchOptions, "method" | "body" | "query">;

type ResponseCtx = FetchContext & {
  response: FetchResponse<unknown>;
};

type RequestErrorCtx = FetchContext & { error: Error };

/**
 * 统一调用形态：(url, data?, config?)
 * - GET / DELETE：data → query（查询参数）
 * - POST / PUT / PATCH：data → body
 *
 * baseURL：runtimeConfig.public.apiBase，环境变量 NUXT_PUBLIC_API_BASE
 *
 * 拦截器（ofetch 钩子，执行顺序见下方数组顺序）：
 * - onRequest：发请求前
 * - onResponse：成功且已解析 body 到 response._data 后
 * - onResponseError：HTTP 4xx/5xx
 * - onRequestError：网络失败、被 abort 等（未拿到响应）
 */
export function useHttpFetch() {
  const { public: pub } = useRuntimeConfig();
  const baseURL = (pub.apiBase as string) || "";

  /** 无 JSON 类型时对普通对象 body 补 Content-Type */
  function applyJsonContentType({ options }: FetchContext) {
    const headers = new Headers(options.headers as HeadersInit | undefined);
    if (
      options.body !== undefined &&
      typeof options.body === "object" &&
      !(options.body instanceof FormData) &&
      !(options.body instanceof Blob) &&
      !(options.body instanceof ArrayBuffer)
    ) {
      if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
      }
    }
    options.headers = headers;
  }

  /** 请求拦截：鉴权、公共头、traceId 等 */
  function interceptRequest(_ctx: FetchContext) {
    // 示例：useCookie / useAuthState 仅在此 composable 内使用
    // const token = useCookie<string | null>("token");
    // if (token.value) {
    //   const h = new Headers(_ctx.options.headers as HeadersInit | undefined);
    //   h.set("Authorization", `Bearer ${token.value}`);
    //   _ctx.options.headers = h;
    // }
  }

  /** 响应拦截：可改写 response._data（如后端 { code, data } 统一解包） */
  function interceptResponse(_ctx: ResponseCtx) {
    // const raw = _ctx.response._data;
    // if (isBizEnvelope(raw)) _ctx.response._data = raw.data;
  }

  /** HTTP 错误拦截：4xx/5xx（执行后仍会按 ofetch 规则抛出 FetchError） */
  function interceptResponseError(_ctx: ResponseCtx) {
    // if (_ctx.response.status === 401) navigateTo("/login");
  }

  /** 请求阶段失败：无 response（网络、超时、abort 等） */
  function interceptRequestError(_ctx: RequestErrorCtx) {
    // console.error("[http]", _ctx.error);
  }

  const client = $fetch.create({
    baseURL,
    retry: 0,
    onRequest: [applyJsonContentType, interceptRequest],
    onResponse: [interceptResponse],
    onResponseError: [interceptResponseError],
    onRequestError: [interceptRequestError],
  });

  function fetchQuery<T>(
    method: "GET" | "DELETE",
    url: string,
    data?: FetchOptions["query"],
    config?: HttpConfig,
  ) {
    return client<T>(url, {
      ...config,
      method,
      query: data,
    });
  }

  type RequestBody = NonNullable<FetchOptions["body"]>;

  function fetchBody<T>(
    method: "POST" | "PUT" | "PATCH",
    url: string,
    data?: RequestBody,
    config?: HttpConfig,
  ) {
    return client<T>(url, {
      ...config,
      method,
      body: data,
    });
  }

  return {
    get: <T = unknown>(
      url: string,
      data?: FetchOptions["query"],
      config?: HttpConfig,
    ) => fetchQuery<T>("GET", url, data, config),

    delete: <T = unknown>(
      url: string,
      data?: FetchOptions["query"],
      config?: HttpConfig,
    ) => fetchQuery<T>("DELETE", url, data, config),

    post: <T = unknown>(url: string, data?: RequestBody, config?: HttpConfig) =>
      fetchBody<T>("POST", url, data, config),

    put: <T = unknown>(url: string, data?: RequestBody, config?: HttpConfig) =>
      fetchBody<T>("PUT", url, data, config),

    patch: <T = unknown>(
      url: string,
      data?: RequestBody,
      config?: HttpConfig,
    ) => fetchBody<T>("PATCH", url, data, config),
  };
}
```

- 使用：

```vue
<script setup lang="ts">
const { get } = useHttpFetch();
onMounted(async () => {
  const info = await get("/info", { param1: "value1", param2: "value2" });
  console.log(info);
});
</script>

<template>
  <div>index</div>
</template>
```

## 服务端server

在根目录下创建 server目录，这里边放服务端的内容

## 接口

在server目录下创建api文件夹，里边的文件就是接口

接口类型由文件名决定,默认get

```ts [/server/api/user.post.ts]
//接口路径 /api/user
export default defineEventHandler((event) => {
  return {
    message: "Hello World",
  };
});
```

在server目录下，创建routes目录，里边也可以放接口，不会带routes前缀

```ts [/server/routes/user.ts]
//接口路径 /user
export default defineEventHandler((event) => {
  return {
    message: "Hello World",
  };
});
```

## 服务端中间件

/server/middleware 目录下

## 数据库

### 安装插件

```bash
pnpm install mysql2
```

### 创建连接池，并导出

```ts [/server/db/index.ts]
import mysql from "mysql2/promise";
import type { Pool, PoolOptions } from "mysql2/promise";

/**
 * Nitro 服务端 MySQL 连接池（Nuxt 会加载项目根目录 `.env`）。
 *
 * 环境变量：MYSQL_HOST、MYSQL_PORT（可选，默认 3306）、MYSQL_USER、MYSQL_PASSWORD、MYSQL_DATABASE
 *
 * - `getMysqlPool()` / 默认导出：取同一惰性单例
 * - `pool`：代理到该单例，供 repository / service 直接 `pool.execute(...)`
 */
let poolInstance: Pool | null = null;

function resolvePoolOptions(): PoolOptions {
  const host = process.env.MYSQL_HOST;
  const user = process.env.MYSQL_USER;
  const database = process.env.MYSQL_DATABASE;

  if (!host || !user || !database) {
    throw new Error(
      "MySQL: 请在 .env 中配置 MYSQL_HOST、MYSQL_USER、MYSQL_DATABASE",
    );
  }

  return {
    host,
    port: Number(process.env.MYSQL_PORT || 3306),
    user,
    password: process.env.MYSQL_PASSWORD ?? "",
    database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  };
}

/** 唯一创建点：首次调用时 `mysql.createPool` */
export function getMysqlPool(): Pool {
  if (!poolInstance) {
    poolInstance = mysql.createPool(resolvePoolOptions());
  }
  return poolInstance;
}

/**
 * 与 `getMysqlPool()` 同一实例，惰性创建。
 * 不要对 `pool` 重新赋值；仅通过属性访问转发到真实 Pool。
 */
export const pool: Pool = new Proxy({} as Pool, {
  get(_target, prop) {
    const p = getMysqlPool();
    const v = Reflect.get(p, prop, p);
    return typeof v === "function"
      ? (v as (...a: unknown[]) => unknown).bind(p)
      : v;
  },
});

/** 手动探测（如启动插件、健康检查）；不会在 import 时自动执行 */
export async function testMysqlConnection(): Promise<boolean> {
  try {
    const [rows] = await getMysqlPool().execute("SELECT 1 + 1 AS result");
    const first = (rows as Array<{ result: number }>)[0];
    console.log("[mysql] 连接成功", first?.result);
    return true;
  } catch (err) {
    console.error("[mysql] 连接失败", (err as Error).message);
    return false;
  }
}

export default pool;
```

### 封装crud

```ts [/server/db/crud.ts]
import type { ResultSetHeader } from "mysql2";
import pool from "./index";

/** 连接池在 ./index 创建；此处只引用 `pool` */
type QuerySuccess<T> = { success: true; data: T[] };
type QueryFail = { success: false; msg: string };
type QueryResult<T> = QuerySuccess<T> | QueryFail;

export const query = async <T = Record<string, unknown>>(
  sql: string,
  params: unknown[],
): Promise<QueryResult<T>> => {
  try {
    const [rows] = await pool.execute(sql, params as never[]);
    return { success: true, data: rows as T[] };
  } catch (err) {
    const error = err as Error;
    console.error("查询异常", error);
    return { success: false, msg: error.message };
  }
};

export const add = async (
  table: string,
  data: Record<string, unknown>,
): Promise<{ success: true; insertId: number } | QueryFail> => {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const placeholders = keys.map(() => "?").join(",");
  const sql = `insert into ${table} (${keys.join(",")}) values (${placeholders})`;

  try {
    const [result] = await pool.execute(sql, values as never[]);
    const header = result as ResultSetHeader;
    return { success: true, insertId: header.insertId };
  } catch (err) {
    const error = err as Error;
    console.error("新增异常", error);
    return { success: false, msg: error.message };
  }
};

export const update = async (
  table: string,
  data: Record<string, unknown>,
  where: Record<string, unknown>,
): Promise<{ success: true; affectedRows: number } | QueryFail> => {
  const setStr = Object.keys(data)
    .map((key) => `${key}=?`)
    .join(",");
  const whereStr = Object.keys(where)
    .map((key) => `${key}=?`)
    .join(",");
  const params = [...Object.values(data), ...Object.values(where)];
  const sql = `update ${table} set ${setStr} where ${whereStr}`;

  try {
    const [result] = await pool.execute(sql, params as never[]);
    const header = result as ResultSetHeader;
    return { success: true, affectedRows: header.affectedRows };
  } catch (err) {
    const error = err as Error;
    console.error("更新异常", error);
    return { success: false, msg: error.message };
  }
};

export const del = async (
  table: string,
  where: Record<string, unknown>,
): Promise<{ success: true; affectedRows: number } | QueryFail> => {
  const whereStr = Object.keys(where)
    .map((key) => `${key}=?`)
    .join(",");
  const params = [...Object.values(where)];
  const sql = `delete from ${table} where ${whereStr}`;

  try {
    const [result] = await pool.execute(sql, params as never[]);
    const header = result as ResultSetHeader;
    return { success: true, affectedRows: header.affectedRows };
  } catch (err) {
    const error = err as Error;
    console.error("删除异常", error);
    return { success: false, msg: error.message };
  }
};
```

## 校验数据 joi库

```bash
pnpm install joi
```

```js
const schema = joi.object({
  nickname: joi.string().required(),
  phone: joi
    .string()
    .pattern(/^1[3-9]\d{9}$/)
    .required(),
  password: joi.string().required(),
});

try {
  const value = await schema.validateAsync({
    body,
  });
} catch (err) {
  return {
    code: 400,
    message: "参数错误",
    data: {},
  };
}
```

## md5加密

```bash
pnpm install md5
```

## 图标

- 按需加载图标插件

```bash
pnpm install unplugin-icons
```

```bash
pnpm install unplugin-vue-components
```

- 图标库

```bash
pnpm install @iconify/json
```

- 配置

```ts [nuxt.config.ts]
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import Components from "unplugin-vue-components/vite";

export default defineNuxtConfig({
  vite: {
    plugins: [
      Components({
        resolvers: [
          IconsResolver({
            prefix: "icon",
            enabledCollections: ["mdi", "ep", "ant-design"],
          }),
        ],
      }),
      Icons({
        autoInstall: true,
      }),
    ],
  },
});
```

## nuxt页面级组件

```ts
export default defineNuxtConfig({
  pages: {
    pattern: ["**/*.vue", "!**/components/**"],
  },
  components: [
    { path: "~/components" },
    { path: "~/pages", pattern: "**/components/**/*.vue", pathPrefix: true }, //带路径前缀
  ],
});
```
