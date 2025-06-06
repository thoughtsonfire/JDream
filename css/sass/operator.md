# 运算符

## 1. `@for`
   - sass 代码
   ```sass
   @for $i from 1 through 3 {
     .item-#{$i} {
       width: 20px * $i;
     }
   }
   ```
   - 对应css代码
   ```css
   .item-1 {
     width: 20px;
   }
   
   .item-2 {
     width: 40px;
   }
   
   .item-3 {
     width: 60px;
   }
   ```
## 2. `@each`
   - sass 代码
   ```sass
   $colors: red, green, blue;

   @each $color in $colors {
     .text-#{$color} {
       color: $color;
     }
   }
   ```
   - 对于css代码
   ```
   .text-red {
     color: red;
   }
   
   .text-green {
     color: green;
   }
   
   .text-blue {
     color: blue;
   }
   ```

## 3. `@while`
   - sass 代码
   ```
   $i: 1;

   @while $i <= 3 {
     .item-#{$i} {
       width: 20px * $i;
     }
     $i: $i + 1;
   }
   ```
   - 对应css代码
   ```
   .item-1 {
     width: 20px;
   }
   
   .item-2 {
     width: 40px;
   }
   
   .item-3 {
     width: 60px;
   }
   ```

## 4. `@else if`
   - sass 代码
   ```
   @mixin example($value) {
     @if $value == 1 {
       color: blue;
     } @else if $value == 2 {
       color: green;
     } @else {
       color: red;
     }
   }
   
   .test-1 {
     @include example(1);
   }
   
   .test-2 {
     @include example(2);
   }
   
   .test-3 {
     @include example(3);
   }
   ```
   - 对应css代码
   ```
   .test-1 {
     color: blue;
   }
   
   .test-2 {
     color: green;
   }
   
   .test-3 {
     color: red;
   }

   ```

## 5. 逻辑运算符
   - sass
   ```
   @mixin example($value) {
     @if $value == 1 or $value == 2 {
       color: blue;
     } @else {
       color: red;
     }
   }
   
   .test-1 {
     @include example(1);
   }
   
   .test-2 {
     @include example(2);
   }
   
   .test-3 {
     @include example(3);
   }
   ```
   - 对应css
   ```
   .test-1 {
     color: blue;
   }
   
   .test-2 {
     color: blue;
   }
   
   .test-3 {
     color: red;
   }
   ```
