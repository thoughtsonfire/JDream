# gulp

## 流程控制

- 串行 series

- 并行 parallel

```ts
import { series, parallel } from "gulp";

//打包方式，串行并行

export default series(async () => console.log("打包")); //将里边的代码依次执行
```

执行结果

```ts
> gulp -f build/gulpfile.ts

[22:25:13] Loaded external module: sucrase/register/ts
[22:25:13] Working directory changed to F:\20240426start\jdream-plus\build
[22:25:14] Using gulpfile F:\20240426start\jdream-plus\build\gulpfile.ts
[22:25:14] Starting 'default'...
[22:25:14] Starting '<anonymous>'...
打包
[22:25:14] Finished '<anonymous>' after 1.4 ms
[22:25:14] Finished 'default' after 3.57 ms
```

给任务添加名字

在 Gulp 里，每个任务函数可以带一个可选的 displayName 属性，这样在 CLI 输出的时候，就能看到自定义的名字，而不是 anonymous。

```ts
import { series, parallel } from "gulp";
import type { TaskFunction } from "gulp";
//打包方式，串行并行

const withTaskName = (name: string, fn: TaskFunction) =>
  Object.assign(fn, { displayName: name });
export default series(
  withTaskName("提示", async () => {
    console.log("提示");
  })
); //将里边的代码依次执行

//ts 类型检测series参数 是TaskFunction
//Gulp 里 TaskFunction 的定义大概是：
//type TaskFunction =
//  ((done: TaskFunctionCallback) => void)
//  | (() => void | Promise<void>);
```

结果

```bash
> gulp -f build/gulpfile.ts

[23:04:39] Loaded external module: sucrase/register/ts
[23:04:39] Working directory changed to F:\20240426start\jdream-plus\build
[23:04:39] Using gulpfile F:\20240426start\jdream-plus\build\gulpfile.ts
[23:04:39] Starting 'default'...
[23:04:39] Starting '提示'...
提示
[23:04:39] Finished '提示' after 2.35 ms
[23:04:39] Finished 'default' after 4.9 ms
```

在 Gulp 里，每个任务函数可以带一个可选的 displayName 属性，这样在 CLI 输出的时候，就能看到自定义的名字，而不是 anonymous。
