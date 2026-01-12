# vite

## 自动引入 scss

```ts[vite.config.ts]
css: {
    preprocessorOptions: {
        scss: {
        additionalData: `
            @use "@/styles/colors.scss" as *;
        `
        }
    }
}
```

## 路径别名

```ts[vite.config.ts]
  resolve: {
    extensions: [".vue", ".ts", ".json", ".js"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "~": path.resolve(__dirname, "./src/assets"),
      "jdream-plus": path.resolve(__dirname, "./jdream-plus")
    }
  },
```
