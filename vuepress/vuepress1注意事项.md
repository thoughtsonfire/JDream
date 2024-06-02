# vuepress1注意事项

## 需要自行安装`vue-template-compiler`

```sh
pnpm i vue-template-compiler
```

## node版本17及以上打包失败
>(undefined) assets/js/styles.f419522a.js from Terser
>Error: error:0308010C:digital envelope routines::unsupported

- 本地修改打包代码

```sh
"docs:build": "set NODE_OPTIONS=--openssl-legacy-provider & vuepress build docs"
```

- github上部署则可以设置node版本为16
