# html

#### picture

<br>
##### media 属性

media 属性允许你提供一个用于给用户代理作为选择 <source> 元素的依据的媒体条件 (media condition)（类似于媒体查询）。如果这个媒体条件匹配结果为 false，那么这个 <source> 元素会被跳过。

```html
<picture>
  <source srcset="mdn-logo-wide.png" media="(min-width: 600px)" />
  <img src="mdn-logo-narrow.png" alt="MDN" />
</picture>
```

##### type 属性

type 属性允许你为 <source> 元素的 srcset 属性指向的资源指定一个 MIME 类型。如果用户代理不支持指定的类型，那么这个 <source> 元素会被跳过。

```html
<picture>
  <source srcset="mdn-logo.svg" type="image/svg+xml" />
  <img src="mdn-logo.png" alt="MDN" />
</picture>
```

#### source

<source> 元素为 <picture>、<audio> 和 <video> 元素指定一个或多个媒体资源。它是一个空元素，这意味着它没有内容，也不需要关闭标签。鉴于浏览器对图像文件格式和媒体文件格式的支持不同，该元素通常用于以多种文件格式提供相同的媒体内容，以便与多种浏览器兼容。

```html
<video controls width="250" height="200" muted>
  <source src="/media/cc0-videos/flower.webm" type="video/webm" />
  <source src="/media/cc0-videos/flower.mp4" type="video/mp4" />
  Download the
  <a href="/media/cc0-videos/flower.webm">WEBM</a>
  or
  <a href="/media/cc0-videos/flower.mp4">MP4</a>
  video.
</video>
```
