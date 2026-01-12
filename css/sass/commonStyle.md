# 公共样式

## 1. **应用图标**

```sass
$app-list:'qq','wechat','weibo','baidu';

.app-icon{
   width: 16px;
   height: 16px;
   display: inline-block;
   background-size: 100% 100%;
   @each $app in $app-list{
      &.#{$app}{
         background-image: url("~@/assets/imgs/app-icons/#{$app}.png")
      }
   }
}
```

```
<span class="app-icon qq"></span>
```

## 2. 超出字符省略显示

```sass
@mixin text-ellipsis($line: 1){
   overflow: hidden;
   text-overflow: ellipsis;
   @if $line == 1{
      white-space: nowrap;
   } @else{
      word-wrap: break-word;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: $line;
      display: -webkit-box;
   }
}
```

## 3.颜色管理

```scss
$colors: (
  primary: #1677ff,
  success: #52c41a,
  warning: #faad14,
  danger: #ff4d4f,

  text: #333,
  text-secondary: #666,
  border: #e5e6eb,
  bg: #f5f7fa,
);

@function color($key) {
  @return map-get($colors, $key);
}
```

**使用**

```scss
.card {
  background: color(bg);
  border: 1px solid color(border);
  color: color(text);
}

.btn-primary {
  background: color(primary);
}
```
