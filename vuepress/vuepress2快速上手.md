# 快速上手

## 参考网站
参考网站：[VuePress官网](https://vuepress.vuejs.org/)

## 创建

### 自动创建

```sh {number-lines}
pnpm create vuepress vuepress-starter
```

### 手动创建

- 创建文件夹并进入
```sh {number-lines}
mkdir vuepress-starter
cd vuepress-starter
```

- 初始化项目
```sh
git init
pnpm init
```
#### 安装注意事项
<span style="color:red">* `@vuepress/theme-default` 版本高于 `@vuepress/bundler-vite` 时可能报错,安装时需选则合适版本</span>
- 安装 VuePress

```sh
# 安装 vuepress 和 vue
pnpm add -D vuepress@next vue
# 安装打包工具和主题
pnpm add -D @vuepress/bundler-vite@next @vuepress/theme-default@next
```

- 创建 `docs` 目录和 `docs/.vuepress` 目录

```sh
mkdir docs
mkdir docs/.vuepress
```

#### 创建 VuePress 配置文件 `docs/.vuepress/config.js` 设置`base`为仓库名

```sh
import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  bundler: viteBundler(),
  theme: defaultTheme(),
  base:'/yourrepository/'
})
```
- 创建第一篇文档

```sh
echo '# Hello VuePress' > docs/README.md
```

### 目录结构
创建完成后，你项目的目录结构应该是这样的：
```text
├─ docs
│  ├─ .vuepress
│  │  └─ config.js
│  └─ README.md
└─ package.json
```

## 使用

### 配置 `package.json`
```json
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```
- 启动开发服务器,看是否正常运行

```sh
pnpm docs:build
```

- 打包项目，看是否正常打包

```sh
pnpm docs:build
```
## 部署
 
### 创建 `.github/workflows/docs.yml` 文件来配置工作流。

```yml
name: docs

on:
  # 每当 push 到 main 分支时触发部署
  push:
    branches: [master]
  # 手动触发部署
  workflow_dispatch:

jobs:
  docs:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
        with:
          # “最近更新时间” 等 git 日志相关信息，需要拉取全部提交记录
          fetch-depth: 0

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          # 选择要使用的 pnpm 版本
          version: 8
          # 使用 pnpm 安装依赖
          run_install: true

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          # 选择要使用的 node 版本
          node-version: 20
          # 缓存 pnpm 依赖
          cache: pnpm

      # 运行构建脚本
      - name: Build VuePress site
        run: pnpm docs:build

      # 查看 workflow 的文档来获取更多信息
      # @see https://github.com/crazy-max/ghaction-github-pages
      - name: Deploy to GitHub Pages
        uses: crazy-max/ghaction-github-pages@v4
        with:
          # 部署到 gh-pages 分支
          target_branch: gh-pages
          # 部署目录为 VuePress 的默认输出目录
          build_dir: docs/.vuepress/dist
        env:
          # @see https://docs.github.com/cn/actions/reference/authentication-in-a-workflow#about-the-github_token-secret
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
### 创建[github](https://github.com)仓库
   ![代替图片](/public/imgs/vuepress/github1.png)

   - `config.js`里面配置的`base`，名称为github仓库名称

   1. 初始化git仓库  

   ```sh
   git init
   ```
  2. 添加到 .gitignore 文件

  ```text
  # VuePress 默认临时文件目录
  .vuepress/.temp
  # VuePress 默认缓存目录
  .vuepress/.cache
  # VuePress 默认构建生成的静态文件目录
  .vuepress/dist
  ```
 3. 添加本地所有文件到git仓库
 
 ```sh
 git add .
 ```
 4. 创建第一次提交
 
 ```sh
 git commit -m "first commit"
 ```
 5. 添加远程仓库地址到本地

 ```sh
 git remote add origin https://github.com/yourgithub/yourrepository.git
 ```
 6. 推送项目到github

 ```sh
 git push -u origin master
 ```
 ### github settings actions 设置
 - 赋予读写权限
 ![代替图片](/public/imgs/vuepress/github3.png)
 - 运行 docs.yml
 ![代替图片](/public/imgs/vuepress/github4.png)
 - 配置项目运行地址
 ![代替图片](/public/imgs/vuepress/github2.png)
 - 如果未出现gh-pages分支 则表示docs.yml 还没运行完成 ，或者出现了错误，出现错误则具体错误具体解决
 - 未出现错误就重新运行
 ![代替图片](/public/imgs/vuepress/github4.png)
 ### 查看项目网址
 ![代替图片](/public/imgs/vuepress/github5.png)
    



