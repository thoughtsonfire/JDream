# 注意事项

## 配置.npmrc

```[.npmrc]
shamefully-hoist = true
link-workspace-packages=true
```

## pnpm-workspace.yaml

- 在项目根目录下建立 pnpm-workspace.yaml 配置文件

```yaml
packages:
  - "packages/**" # 存放编写组件的
  - docs # 存放文档的
  - play # 测试组件的
```

pnpm-workspace.yaml 中配置的子项目，可以根据子项目 package.json 中的 name 引入该项，也是根据 package.json 自动判断入口的

```bash
pnpm i @jdream-plus/components -w
pnpm i @jdream-plus/utils -w
pnpm i @jdream-plus/theme-chalk -w
```

> [!NOTE] 报错
> 可能-w 的时候去 npm 线上找了
> 那就再`.npmrc` 文件里加上 `link-workspace-packages=true`
> 以前项目没报这个错误，还有详细版本号，
> 这次报错了，修改后 "@jdream-plus/components": "workspace:^",这里还没有详细版本号了，不过是本地依赖，软链到本地，不影响，新版本是这样的

> 这里安装到根目录下，是方便引入子项目中的内容，这三个是引入内容，和引入子项目是不同的，这三个并没有配置入口文件，也不需要

## 入口 package.json

```
jdream-plus/
 └─ docs/
 └─ node_modules/
 └─ packages/
    └─ jdream-plus/
        └─ package.json
```

```json [package.json] {7-12}
{
  "name": "jdream-plus",
  "version": "1.0.0",
  "description": "",
  "main": "lib/index.js",
  "module": "es/index.js",
  "exports": {
    ".": {
      "import": "./index.ts",
      "require": "./index.ts"
    }
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "packageManager": "pnpm@10.12.4"
}
```

> exports 配置 是开发用的，打包后的`package.json` 应该删除这个

> 开发环境引入也是直接 `import JdreamPlus from 'jdream-plus'`
