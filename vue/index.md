# vue

## 创建项目

<br>

### vue create project

不推荐

### pnpm create vite@latest

更干净，自己添加依赖包

### pnpm create vue@latest

最方便

## 根据内容生成二维码

使用vue-qr包 可以在中间添加图片

- 安装
  
```sh
pnpm i vue-qr
```
- vue2中引入
  
```vue
import VueQr from 'vue-qr'
```
```vue
  components: {
    VueQr
  },
```
- 使用

```vue
<VueQr :text="text"></VueQr>
```

- 参数

|Parameter|Explanation|
|:-:|:-:|
|text|Contents to encode. 欲编码的内容|
|bgSrc|Background url to embed in the QR code. 欲嵌入的背景图地址|
|size|Width as well as the height of the output QR code, includes margin. 尺寸, 长宽一致, 包含外边距|

