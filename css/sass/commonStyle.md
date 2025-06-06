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
      &.#{#app}{
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


