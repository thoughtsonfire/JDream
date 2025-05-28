# 数组方法

## Array  


`Array` 对数组的内部支持 

📌 **从…继承/覆盖**  

继承于 Object 

🔍 **构造函数**  

`new Array( )`

`new Array(size)`  

`new Array(element0, element1, ..., elementn)`  

🔥 **参数**  

`size`  

期望的数组元素个数。返回的数组，`1ength`域将被设为`size`的值。

`element0, ... elementn`  

两个或多个值的参数列表。当使用这些参数来调用构造函数`Array()`时，新创建的数组的元素就会被初始化为这些值，它的`length`域也会被设置为参数的个数。

🔚 **返回值**  

新创建并被初始化了的数组。如果调用构造函数`Array()`时没有使用参数，那么返回的数组为空，length域为0。当调用构造函数时只传递给它一个数字参数，该构造函数将返回具有指定个数、元素为undefined的数组。当用其他参数调用`Array()`时， 该构造函数将用参数指定的值初始化数组。当把构造函数作为函数调用，不使用`new`运算符时，它的行为与使用new运算符调用它时的行为完全一样。

⚠️ **抛出**  

`RangeError`  

当只传递给`Array()`构造函数一个整数参数`size`时，如果`size`是负数，或者大于`2^32 -1`，将抛出`RangeError`异常。 

**直接量语法**  

`ECMAScript v3`规定了数组直接量的语法，`JavaScript 1.2`和`JScript 3.0`实现了它。可以把—个用逗号分隔的表达式列表放在方括号中，创建并初始化—个数组。这些表达式的值将成为数组元素。例如：

```js
var a = [1, true, 'abc'];

var b = [a[0], a[0]*2, f(x)];
```   

ℹ️ **属性** 

`length`  

一个可读可写的整数，声明了数组中的元素个数。如果数组中的元素不连续，它就是比数组中的最后—个元素的下标大1的整数。改变这个属性的值将截断或扩展数组。

📋 **方法**  

`concat( )`  

给数组添加元素。

`join( )`  

将数组中所有元素都转换为字符串，然后连接在一起。

`pop( )`  

从数组尾部删除一个项目。

`push( )`  

把一个项目添加到数组的尾部。

`reverse( )`  

在原数组上颠倒数组中元素的顺序。

`shift( )`  

将数组的头部元素移出数组头部。

`slice( )`  

返回一个数组的子数组。

`sort( )`  

在原数组上对数组元素进行排序。

`splice( )`  

插入、删除或替换一个数组元素。

`toLocaleString( )`  

把数组转换为一个局部字符串。

`toString( )`  

把数组转换为字符串。

`unshift( )`  

在数组的头部插入一个元素。

📋 **描述**  

数组是JavaScript的基本语句特性。


## concat  
  
`Array.contat( )`   连接数组

🔍 **语法**  

`array.concat(value, ...)`  

🔥 **参数**  

`value, ...  ` 

要增加到array中的值，可以是任意多个。  

🔚 **返回值**  

一个新数组，是

📋 **描述**  

方法concat()将创建并返回一个新数组，这个数组是将所有参数都添加到array中生成的。它并不修改array。如果要进行concat()操作的参数是一个数组，那么添加的是数组中的元素，而不是数组。

🔶 **示例**  

```js
var a = [1,2,3];

a.concat(4, 5)          //返回 [1,2,3,4,5]

a.concat([4,5]);        //返回 [1,2,3,4,5]

a.concat([4,5],[6,7])   //返回 [1,2,3,4,5,6,7]

a.concat(4, [5,[6,7]])  //返回 [1,2,3,4,5,[6,7]]
```



## join  

`Array.join()` 将数组元素连接起来以构建一个字符串  

🔍 **语法**  

`array.join( )` 

`array.join(separator)`  

🔥 **参数**  

`separator`  

在返回的字符串中用于分隔数组元素的字符或字符串，它是可选的。如果省略了这个参数，用逗号作为分隔符。

🔚 **返回值**  

—个字符串，通过把array的每个元素转换成字符串，然后把这些字符串连接起来，在两个元素之间插入separator字符串而生成。

📋 **描述**  

方法`join()`将把每个数组元素转换成一个字符串，然后把这些字符串连接起来，在两个元素之间插入指定的`separator`字符串。返回生成的字符串。

可以用`String`对象的`split()`方法执行相反的操作，即把一个字符串分割成数组元素。

🔶 **示例**  

```js
a = new Array(1, 2, 3, "testing");

s = a.join("+");  // s 是字符串"1+2+3+testing"
```
  
## pop *  

  
  
>[!CAUTION]会改变原数组

`Array.pop( )` 删除并返回数组的最后一个元素  


🔍 **语法**  

`array.pop( )`  

🔚 **返回值**  

`array`的最后一个元素。  

📋 **描述**  

方法`pop()`将删除`array`的最后一个元素，把数组长度减1，并且返回它删除的元素的值。如果数组已经为空，则`pop()`不改变数组，返回undefined。   

🔶 **示例**  

方法`pop()`和方法`push()`可以提供先进后出`(FILO)`栈的功能。例如：

```js
var stack = [];       // 栈：[]

stack.push(1, 2);     // 栈: [1,2]      返回 2

stack.pop(  );        // 栈: [1]        返回 2

stack.push([4,5]);    // 栈: [1,[4,5]]  返回 2

stack.pop(  )         // 栈: [1]        返回 [4,5]

stack.pop(  );        // 栈: []         返回 1 
```
   
## push *  

>[!CAUTION]会改变原数组  


`Array.push( )` 给数组添加元素 


🔍 **语法**  

`array.push(value, ...)`  

🔥 **参数**  

`value, ...`  

要添加到`array`尾部的值，可以是一个或多个。  

🔚 **返回值**  

把指定的值添加到数组后的`新长度`。  

📋 **描述**  

方法`push()`将把它的参数顺次添加到`array`的尾部。它直接修改`array`,而不是创建——个新的数组。方法`push()`和方法`pop()`用数组提供先进后出栈的功能。参阅 `“Array.pop()”`中的示例。

**Bug**  

在`JavaScript`的`Netscape`实现中，如果把语言版本明确地设置为`1.2`，该函数将返回最后添加的值，而不是返回新数组的长度。 

## reverse *  

>[!CAUTION]会改变原数组  

`Array.reverse( )` 颠倒数组中元素的顺序 


🔍 **语法**  

`array.reverse( )`  

📋 **描述**  

`Array`对象的方法`reverse()`将颠倒数组中元素的顺序。它在原数组上实现这一操作，即重排指定的`array`的元素，但并不创建新数组。如果对`array`有多个引用，那么通过所有引用都可以看到数组元素的新顺序。

🔶 **示例**  

```js
a = new Array(1, 2, 3);    // a[0] == 1, a[2] == 3;

a.reverse(  );             // Now a[0] == 3, a[2] == 1;
```
 
## shift *  

>[!CAUTION]会改变原数组  

Array.shift( ) 将元素移出数组 


🔍 **语法**  

`array.shift( )`  

🔚 **返回值**  

数组原来的第一个元素。

📋 **描述**  

方法`shift()`将把`array`的第—个元素移出数组，返回那个元素的值，并且将余下的所有元素前移一位，以填补数组头部的空缺。如果数组是空的，`shift()`将不进行任何操作，返回`undefined`。注意，该方法不创建新数组，而是直接修改原有的数组。

方法`shift()`和方法`Array.pop()`相似，只不过它在数组头部操作，而不是在尾部操作。该方法常常和`unshift()`一起使用。

🔶 **示例**  

```js
var a = [1, [2,3], 4]

a.shift(  );  // 返回 1; a = [[2,3], 4]

a.shift(  );  // 返回 [2,3]; a = [4]
```  

##  unshift *  

>[!CAUTION]会改变原数组  

`Array.unshift( )` 在数组头部插入一个元素 
  

🔍 **语法**  

`array.unshift(value, ...)`  

🔥 **参数**  

`value, ...`  

要插入数组头部的一个或多个值。

🔚 **返回值**  

数组的新长度

📋 **描述**  

方法`unshift()`将把它的参数插入`array`的头部，并将已经存在的元素顺次地移到较高的下标处，以便留出空间。该方法的第一个参数将成为数组新的元素`0`，如果还有第二个参数，它将成为新的元素`1`，以此类推。注意，`unshift()`不创建新数组，而是直接修改原有的数组。  

🔶 **示例**  

方法`unshift()`通常和方法`shift()`一起使用。例如： 

```js
var a = [];             // a:[]

a.unshift(1);           // a:[1]          返回 1

a.unshift(22);          // a:[22,1]       返回 2

a.shift(  );            // a:[1]          返回 22

a.unshift(33,[4,5]);    // a:[33,[4,5],1] 返回 3 
``` 
 

##  slice

`Array.slice( )` 返回数组的一部分 


🔍 **语法**  

`array.slice(start, end)`  

🔥 **参数**  

`start`  

数组片段开始处的数组下标。如果是负数，它声明从数组尾部开始算起的位置。 也就是说，`-1`指最后一个元素，`-2`指倒数第二个元素，以此类推。

`end`  

数组片段结束处的后一个元素的数组下标。如果没有指定这个参数 包含从start开始到数组结束的所有元素。如果这个参数是负数， 从数组尾部开始算起的元素。

🔚 **返回值**  

一个新数组，包含从`start`到`end`(不包括该元素)指定的`array`元素。  

📋 **描述**  

方法`slice()`将返回数组的一部分，或者说是一个子数组。返回的数组包含从`start` 开始到`end`之间的所有元素，但是不包括`end`所指的元素。如果没有指定`end`，返回的数组包含从`start`开始到原数组结尾的所有元素。

注意：该方法并不修改数组。如果想删除数组中的一段元素，应该使用方法`Array.splice`。

🔶 **示例**  

```js
var a = [1,2,3,4,5];

a.slice(0,3);    // 返回 [1,2,3]

a.slice(3);      // 返回 [4,5]

a.slice(1,-1);   // 返回 [2,3,4]

a.slice(-3,-2);  // 返回 [3]; IE 4存在的Bug: 返回[1,2,3]
```  

**Bug**  

在`Internet Explorer 4`中，参数`start`不能为负数。  


## splice *   

>[!CAUTION]会改变原数组  

 
`Array.splice( )` 插入、删除或替换数组的元素 


🔍 **语法**  

`array.splice(start, deleteCount, value, ...)`


🔥 **参数**  

`start`  

开始插入和(或)删除的数组元素的下标。

`deleteCount`  

从`start`开始，包括`start`所指的元素在内要删除的元素个数。这个参数是可选的，如果没有指定它，`splice()`将删除从`start`开始到原数组结尾的所有元素。

`value, ...`  

要插人数组的零个或多个值，从`start`所指的下标处开始插入。

🔚 **返回值**  

如果从`array`中删除了元素，返回的是含有被删除的元素的数组。但是要注意，由于存在—个`bug`，因此在`JavaScriptl.2`的`Netscape`实现中，返回的并不总是数组。

📋 **描述**  

方法`splice()`将删除从`start`开始(包括`start`所指的元素在内)的零个或多个元素，并且用参数列表中声明的一个或多个值来替换那些被删除的元素。位于插入或删除的元素之后的数组元素都会被移动，以保持它们与数组其他元素的连续性。注意，虽然`splice()`方法与`slice()`方法名字相似，但作用不同，方法`splice()`直接修改数组。

🔶 **示例**  

读了下面的例子，就很容易理解`splice()`的操作了：


```js
var a = [1,2,3,4,5,6,7,8]

a.splice(4);        // 返回 [5,6,7,8]; a is [1,2,3,4]

a.splice(1,2);      // 返回 [2,3]; a is [1,4]

a.splice(1,1);      // Netscape/JavaScript 1.2 返回 4 ，应该返回 [1]

a.splice(1,0,2,3);  // Netscape/JavaScript 1.2 返回 undefined ，应该返回 [1,2,3]
```  

**Bug**  

方法`splice()`假定在各种情况下均返回一个包含已删除元素的数组。但是，在 `Netscape`的`JavaScript 1.2`解释器中，如果删除的是单个元素，那么该方法返回的是元素，而不是包含那个元素的数组。如果没有删除任何元素，它不是返回一个空数组，而是什么都不返回。只要把语言版本明确地设置为`1.2`，`JavaScript`的`Netscape`实现都有这种`bug`行为。 


## sort  *  

>[!CAUTION]会改变原数组   

`Array.sort( )` 对数组元素进行排序 


🔍 **语法**  

`array.sort( )`   

`array.sort(orderfunc)`  

🔥 **参数**  

`orderfunc`  

用来指定按什么顺序进行排序的函数，可选。

🔚 **返回值**  

对数组的引用。注意，数组在原数组上进行排序，不制作副本。

📋 **描述**  

方法`sort()`将在原数组上对数组元素进行排序，即排序时不创建新的数组副本。如果要保留原数组，可先复制一份：`[...arr].sort(...)`。如果调用方法`sort()`时没有使用参数，将按字母顺序(更为精确地说，是按照字符编码的顺序)对数组中的元素进行排序。要实现这一点，首先应把数组的元素都转换成字符串(如果有必要的话)，以便进行比较。

如果想按照别的顺序进行排序，就必须提供比较函数，该函数要比较两个值，然后返回一个用于说明这两个值的相对顺序的数字。比较函数应该具有两个参数`a`和`b`，其返回值如下： 

如果根据你的评判标准，`a`小于`b`，在排序后的数组中`a`应该出现在`b`之前，就返回一个小于0的值。 

如果`a`等于`b`，就返回`0`。 

如果`a`大于`b`，就返回一个大于`0`的值。 

注意，数组中`undefined`的元素都排列在数组末尾。即使你提供了自定义的排序函数也是这样，因为`undefined`值不会被传递给你提供的`orderfunc`。

🔶 **示例**  

下面的代码展示了如何编写按数字顺序，而不是按字母顺序对数组进行排序的比较函数：

```js
// 按照数字顺序排序的排序函数

function numberorder(a, b) { return a - b; }



a = new Array(33, 4, 1111, 222);

a.sort(  );             // 按照字母顺序的排序结果为: 1111, 222, 33, 4

a.sort(numberorder);    // 按照数字顺序的排序结果为: 4, 33, 222, 1111 

a.sort((a,b)=>a-b)      // 按照数字顺序的排序结果为: 4, 33, 222, 1111
```   


##  toLocaleString  

`Array.toLocaleString( )` 把数组转换成局部字符串 


📌 **从…继承/覆盖**  

覆盖 `Object.toLocaleString( )` 

🔍 **语法**  

`array.toLocaleString( )`  

🔚 **返回值**  

数组`array`的局部字符串表示。

⚠️ **抛出**  

`TypeError`  

调用该方法时，如果对象不是`Array`，则抛出异常。

📋 **描述**  

数组的方法`toString()`将返回数组的局部字符串表示。它首先调用每个数组元素的`toLocaleString()`方法，然后用地区特定的分隔符把生成的字符串连接起来，形成一个字符串。  

🔶 **示例**   

```js
a=[1,'a']
a.toLocaleString( )     //  '1,a'
a                       //  [1,'a']

a=[1,2,3]
a.toLocaleString( )     //  '1,2,3'

a=[1,2,3]
a.toLocaleString().split(',')       //['1', '2', '3']

```  

##  toString

`Array.toString( )` 将数组转换成一个字符串 


📌 **从…继承/覆盖**  

`Overrides Object.toString( )` 

🔍 **语法**  

`array.toString( )`  

📋 **返回值**  

`array`的字符串表示。

⚠️ **抛出**  

`TypeError`  

调用该方法时，若对象不是`Array`，则抛出该异常。  

📋 **描述**  

数组的`toString()`方法将把数组转换成一个字符串，并且返回这个字符串。当数组用于字符串环境中时，`JavaScript`会调用这一方法将数组自动转换成一个字符串。但在某些情况下，需要明确地调用这个方法。

`toString()`在把数组转换成字符串时，首先要将数组的每个元素都转换成字符串 (通过调用这些元素的`toString()`方法)。当每个元素都被转换成字符串时，它就以列表的形式输出这些字符串，字符串之间用逗号分隔。返回值与没有参数的`join()` 方法返回的字符串相同。

**Bug**  

在`Netscape`实现中，如果把语言版本明确地设置为`1.2`，`toString()`将会返回用逗号和空格分隔的数组元素列表，这个列表采用数组直接量表示法，用方括号括起元素。例如，在把`<script>`标记的`language`性质明确地设置为`“JavaScript l.2”`时，就会发生这种情况。 



🔶 **示例**   

```js

a=[1,2,3]
a.toString( )     //  '1,2,3'

```    

## every

`Array.every(callback, thisArg)`   测试数组中的每一项是否都满足指定的测试函数。  


🔍 **语法**  

`arr.every(callback(element, index, array), thisArg)`    

🔥 **参数**   
  <table style="width:100%">
      <tr>
        <th style="width:20%">参数名</th>
        <th style="width:20%">类型</th>
        <th style="width:60%">说明</th>
      </tr>
      <tr>
        <td>callback</td>
        <td>函数</td>
        <td>每个元素都会调用这个函数进行判断。返回 true 继续，返回 false 终止并返回 false</td>
      </tr>
      <tr>
        <td>element</td>
        <td>任意类型</td>
        <td>当前正在处理的数组元素</td>
      </tr>
      <tr>
        <td>index</td>
        <td>Number</td>
        <td>当前元素的索引</td>
      </tr>
      <tr>
        <td>array</td>
        <td>Array</td>
        <td>原始数组本身</td>
      </tr>
      <tr>
        <td>thisArg</td>
        <td>任意类型（可选）</td>
        <td>指定回调函数内部的 this 值（可选）</td>
      </tr>
  </table>  

🔶 **示例**  

```js
const arr = [10, 20, 30];

arr.every((element, index, array) => {
  console.log(`检查第 ${index} 项：${element}`);
  return element > 5;
});
// 输出：true
```  

❌ 不使用 thisArg 会出错：  

```js
const checker = {
  threshold: 10,
  check(n) {
    return n > this.threshold;
  }
};

const arr = [15, 20, 25];

// 错误写法：this 为 undefined 或 window
const result = arr.every(function (el) {
  return checker.check(el); // ✅ 这样没问题
  // return this.check(el); // ❌ 这样 this 是 undefined，报错
});
```  
✅ 正确使用 thisArg：
```js
const checker = {
  threshold: 10,
  check(n) {
    return n > this.threshold;
  }
};

const arr = [15, 20, 25];

// thisArg 设置为 checker，this.check() 就能正确访问
const result = arr.every(function (el) {
  return this.check(el);
}, checker);

console.log(result); // true

```  


## some  

`Array.prototype.some()` 是 `JavaScript` 数组的一个方法，用于判断是否存在至少一个满足条件的元素。 

🔍 **语法**  

```js
array.some((value, index, array) => {
  return condition;
});
```
- value：当前元素

- index：索引（可选）

- array：原始数组（可选）

- 返回值：只要有一个元素满足条件，则返回 true；全部不满足返回 false

🔶 **示例**  

```js
const nums = [1, 3, 5, 6];

const hasEven = nums.some(num => num % 2 === 0);
console.log(hasEven); // true

```


## find  

`Array.find(callback, thisArg)`     查找并返回第一个满足条件的元素。  

🔍 **语法**  

`arr.find(callback(element, index, array), thisArg)`  

🔥 **参数**   
  <table style="width:100%">
      <tr>
        <th style="width:20%">参数名</th>
        <th style="width:20%">类型</th>
        <th style="width:60%">说明</th>
      </tr>
      <tr>
        <td>callback</td>
        <td>函数</td>
        <td>每个元素都会调用这个函数判断，返回 true 表示找到，立即返回该元素</td>
      </tr>
      <tr>
        <td>element</td>
        <td>任意类型</td>
        <td>当前正在处理的数组元素</td>
      </tr>
      <tr>
        <td>index</td>
        <td>Number</td>
        <td>当前元素的索引</td>
      </tr>
      <tr>
        <td>array</td>
        <td>Array</td>
        <td>原始数组本身</td>
      </tr>
      <tr>
        <td>thisArg</td>
        <td>任意类型（可选）</td>
        <td>指定回调函数内部的 this 值（可选）</td>
      </tr>
  </table>  


🔶 **示例**  

```js
const arr = [1, 3, 5, 8, 9];

const found = arr.find((element, index, array) => {
  console.log(`检查第 ${index} 项：${element}`);
  return element % 2 === 0;  // 找到第一个偶数
});

console.log(found); // 8
```  

- 补充：`thisArg` 的用法

```js
const checker = {
  threshold: 10,
  check(n) {
    return n > this.threshold;
  }
};

const arr = [5, 15, 25];

const allBig = arr.every(function(el) {
  return this.check(el);
}, checker);

console.log(allBig); // true
```


## findIndex  

`Array.findIndex()`   遍历数组，返回第一个满足条件的元素的索引。如果没有找到，则返回 -1。  

🔍 **语法**  

`array.findIndex(callback(element, index, array), thisArg)`  

🔥 **参数**   
  <table style="width:100%">
      <tr>
        <th style="width:20%">参数名</th>
        <th>说明</th>
      </tr>
      <tr>
        <td>callback</td>
        <td>判断条件的函数</td>
      </tr>
      <tr>
        <td>element</td>
        <td>当前元素</td>
      </tr>
      <tr>
        <td>index</td>
        <td>当前索引（可选）</td>
      </tr>
      <tr>
        <td>array</td>
        <td>原数组（可选）</td>
      </tr>
      <tr>
        <td>thisArg</td>
        <td>可选，绑定 callback 中的 this</td>
      </tr>
  </table>  


🔚 **返回值**  

- 成功：匹配到的第一个元素的索引（如 2）

- 失败：-1  

🔶 **示例**  

```js
const users = [
  { name: "Alice", active: false },
  { name: "Bob", active: false },
  { name: "Carol", active: true }
];

const idx = users.findIndex(user => user.active === true);

console.log(idx); // 2
```  


```js
const checker = {
  min: 5,
  ok(n) {
    return n > this.min;
  }
};

const arr = [1, 4, 6, 8];

const index = arr.findIndex(function (n) {
  return this.ok(n);
}, checker);

console.log(index); // 2（6 是第一个 > 5 的）
```


## indexOf  

`indexOf` 是 `JavaScript` 中用于查找元素在数组或字符串中的第一个索引位置的常用方法。  

🔍 **语法**  

`array.indexOf(searchElement, fromIndex);`  

- searchElement：要查找的值

- fromIndex：从哪个索引开始找（默认是 0）  

🔶 **示例**  

```js
const nums = [10, 20, 30, 20];

nums.indexOf(20);      // 1（第一次出现 20 的位置）
nums.indexOf(20, 2);   // 3（从 index 2 往后找）
nums.indexOf(100);     // -1（找不到返回 -1）
```

⚠️ **注意：只适用于基础类型匹配**  

对于数组中包含对象，indexOf 用的是引用相等（===），所以几乎总是失败：  

```js
const arr = [{ id: 1 }, { id: 2 }];
arr.indexOf({ id: 1 }); // -1 ❌ 因为引用地址不同

```  

🔧 **数组去重示例（用 indexOf）**  

```js
const arr = [1, 2, 2, 3];
const unique = arr.filter((item, index) => arr.indexOf(item) === index);
console.log(unique); // [1, 2, 3]
```  

## lastIndexOf  

`lastIndexOf` 是 `JavaScript` 数组和字符串的一个方法，用于从后往前查找元素，返回其最后一次出现的索引。如果没找到，则返回 `-1`。  

🔍 **语法**  

`array.lastIndexOf(searchElement, fromIndex);`  

- searchElement: 要查找的元素

- fromIndex（可选）: 从哪个索引开始倒着查找（默认是 array.length - 1）

🔶 **示例**  

```js
const arr = [1, 2, 3, 2, 1];

arr.lastIndexOf(2);        // 3
arr.lastIndexOf(2, 2);     // 1
arr.lastIndexOf(4);        // -1
```

⚠️ **注意：**  

- `lastIndexOf` 是 严格相等 (===) 比较

- 不能用于对象内容比较，只适合基础类型值  

```js
[NaN].lastIndexOf(NaN); // -1 ❌（因为 NaN !== NaN）
```  

## includes  

`includes` 是 `JavaScript` 中用来判断一个数组或字符串是否包含某个指定值的方法，返回值是布尔值 `true` 或 `false`。  

🔍 **语法**  

`array.includes(valueToFind, fromIndex);`  

- valueToFind：要查找的元素

- fromIndex（可选）：从哪个索引开始查找（默认为 0）  

🔶 **示例**   

```js
const arr = [1, 2, 3, NaN];

arr.includes(2);      // true
arr.includes(4);      // false
arr.includes(NaN);    // ✅ true，indexOf/lastIndexOf 无法匹配 NaN

arr.includes(2, 2);   // false（从索引2开始查找）
```  

**特点**  

- 使用 严格相等（类似 ===） 比较，但 能识别 NaN

- 不会做类型转换：  

```js
[1, 2, 3].includes('2'); // false ❌
```  

⚠️ **注意：对象数组不能直接用 includes 判断是否存在**  

```js
const objs = [{ id: 1 }, { id: 2 }];
objs.includes({ id: 1 }); // false ❌，因为引用不同
```  

👉 需要改用 `.some()` 或 `.find()`：  

```js
objs.some(obj => obj.id === 1); // ✅ true
```

## map  

`Array.map()`     会遍历数组的每一项，将每一项通过回调函数“映射”为一个新值，并返回一个新数组。原数组不会被修改  

🔍 **语法**  

`array.map(callback(element, index, array), thisArg)`  

🔥 **参数**   
  <table style="width:100%">
      <tr>
        <th style="width:20%">参数名</th>
        <th style="width:20%">类型</th>
        <th style="width:60%">说明</th>
      </tr>
      <tr>
        <td>callback</td>
        <td>函数</td>
        <td>回调函数，处理每一个元素</td>
      </tr>
      <tr>
        <td>element</td>
        <td>任意类型</td>
        <td>当前正在处理的数组元素</td>
      </tr>
      <tr>
        <td>index</td>
        <td>Number</td>
        <td>当前元素的索引</td>
      </tr>
      <tr>
        <td>array</td>
        <td>Array</td>
        <td>原始数组本身</td>
      </tr>
      <tr>
        <td>thisArg</td>
        <td>任意类型（可选）</td>
        <td>指定回调函数内部的 this 值（可选）</td>
      </tr>
  </table>  


🔚 **返回值**  

一个新数组，每一项是 `callback` 返回的结果。

🔶 **示例**  

```js
const users = [
  { name: 'Alice', age: 20 },
  { name: 'Bob', age: 25 }
];

const names = users.map(user => user.name);

console.log(names); // ['Alice', 'Bob']
```

```js
const multiplier = {
  factor: 10,
  multiply(n) {
    return n * this.factor;
  }
};

const arr = [1, 2, 3];
const result = arr.map(function(n) {
  return this.multiply(n);
}, multiplier);

console.log(result); // [10, 20, 30]
```

## forEach  

`Array.forEach()`    遍历数组执行副作用操作

🔍 **语法**  

`array.forEach(callback(currentValue, index, array), thisArg)`   

🔥 **参数**

| 参数             | 说明                   |
| -------------- | -------------------- |
| `callback`     | 每个元素调用的函数            |
| `currentValue` | 当前元素值                |
| `index`        | 当前索引（可选）             |
| `array`        | 原数组（可选）              |
| `thisArg`      | 回调中 `this` 的绑定对象（可选） |  


🔚 **返回值**  

无返回值`（undefined）`，只用于遍历。  

🔶 **示例**  

```js
const arr = [10, 20, 30];

arr.forEach(function(value, index) {
  console.log(`索引 ${index} 的值是 ${value}`);
});
```

✅ 使用 `thisArg`

```js
const context = {
  prefix: '👉',
  log(val) {
    console.log(`${this.prefix} ${val}`);
  }
};

['a', 'b', 'c'].forEach(function(item) {
  this.log(item);
}, context);

// 输出：
// 👉 a
// 👉 b
// 👉 c
```  

## filter  

`Array.prototype.filter()` 是 `JavaScript` 中用于筛选数组中满足条件的元素的常用方法。   

🔍 **语法**  

```js
const newArray = array.filter((value, index, array) => {
  return condition;
});

```  

- value：当前元素的值

- index：当前元素的索引（可选）

- array：原始数组（可选）

- condition：返回 true 的元素会被保留在新数组中  

🔶 **示例**  

:::details 示例：保留偶数
```js
const numbers = [1, 2, 3, 4, 5, 6];

const evens = numbers.filter(num => num % 2 === 0);
console.log(evens); // [2, 4, 6]

```
:::  

:::details 示例：筛选对象数组
```js
const users = [
  { name: 'Alice', active: true },
  { name: 'Bob', active: false },
  { name: 'Carol', active: true }
];

const activeUsers = users.filter(user => user.active);
console.log(activeUsers);
// 输出：[{ name: 'Alice', active: true }, { name: 'Carol', active: true }]

```
:::  

**与其他方法对比**  

| 方法          | 用途            | 返回值               |
| ----------- | ------------- | ----------------- |
| `filter()`  | **筛选**满足条件的元素 | 新数组               |
| `map()`     | 映射每个元素为新值     | 新数组               |
| `forEach()` | 遍历执行操作，无返回值   | `undefined`       |
| `find()`    | 返回第一个满足条件的元素  | 单个元素或 `undefined` |
| `reduce()`  | 聚合为一个值        | 任意类型              |


## reduce  

`Array.prototype.reduce()` 是 `JavaScript` 中非常强大的一个数组方法，用于将数组“归约”成一个值，这个值可以是：数字、对象、数组、字符串、甚至 `Promise` 或函数。  

🔍 **语法**  

```js
array.reduce((accumulator, currentValue, index, array) => {
  return newAccumulator;
}, initialValue);

```  

| 参数             | 说明                  |
| -------------- | ------------------- |
| `accumulator`  | 累加器，保存上一次回调返回的值     |
| `currentValue` | 当前正在处理的元素           |
| `index`        | 当前索引（可选）            |
| `array`        | 原始数组（可选）            |
| `initialValue` | 初始值，必须提供（否则会用第一个元素） |

🔶 **示例**  

:::details 示例一：数组求和
```js
const nums = [1, 2, 3, 4];

const sum = nums.reduce((acc, cur) => acc + cur, 0);
console.log(sum); // 10

```
:::  

:::details 示例二：统计字符串出现次数
```
const letters = ['a', 'b', 'a', 'c', 'b', 'a'];

const count = letters.reduce((acc, char) => {
  acc[char] = (acc[char] || 0) + 1;
  return acc;
}, {});

console.log(count); // { a: 3, b: 2, c: 1 }
```
:::  

:::details 示例三：扁平化二维数组
```
const arr = [[1, 2], [3, 4], [5]];

const flat = arr.reduce((acc, cur) => acc.concat(cur), []);
console.log(flat); // [1, 2, 3, 4, 5]
```
:::

:::details 示例四：实现 map 的效果（仅演示）
```
const nums = [1, 2, 3];

const doubled = nums.reduce((acc, cur) => {
  acc.push(cur * 2);
  return acc;
}, []);

console.log(doubled); // [2, 4, 6]
```
:::


❗ 注意：`initialValue` 很重要！ 

如果不传 `initialValue`，`reduce` 会用数组的第一个元素作为初始值：

```js
[1, 2, 3].reduce((a, b) => a + b); // 6
[].reduce((a, b) => a + b); // ❌ 报错：Reduce of empty array with no initial value
```


## 笔记  

>### join()、toString()、toLocaleString()  
>
>
>**使用建议**  
>
>- 用 `join()` 当你需要自定义连接符或格式。
>
>- 用 `toString()` 当你只是快速查看数组（调试输出）。
>
>- 用 `toLocaleString()` 当数组中包含 Date 或 Number 并希望格式化展示。 

### for...of  

🔧 **作用**  

- `for...of` 遍历的是 值，而不是键名。
- `for...of`是 `ES6` 引入的一种 遍历“可迭代对象”的语法，非常适合用于遍历数组、字符串、Map、Set 等 具备 `[Symbol.iterator]` 接口的结构。  

🔶 **用法**

:::details ✅ **用法示例（遍历数组）**  

```js
const arr = ['a', 'b', 'c'];

for (let value of arr) {
  console.log(value);
}

```
:::

:::details ✅ **用法示例（遍历字符串）**  

```js
const str = 'hello';

for (let char of str) {
  console.log(char);
}

```  
:::

:::details ✅ **用法示例（遍历 Map）**  

```js
const map = new Map([
  ['name', 'Alice'],
  ['age', 25]
]);

for (let [key, value] of map) {
  console.log(key, value);
}

```
:::

:::details ✅ **用法示例（遍历 Set）**  

```js
const set = new Set(['x', 'y', 'z']);

for (let item of set) {
  console.log(item);
}

```
:::


⚠️ **注意**  

- for...of 遍历的是 值，而不是键名。

- 它 不能用来遍历普通对象，因为对象默认不是可迭代的。  

:::details ❌ 错误用法：不能直接用 for...of 遍历普通对象
```js
const obj = { a: 1, b: 2 };

// ❌ 会报错：obj is not iterable
for (let item of obj) {
  console.log(item);
}

```
:::  

:::details ✅ 正确用法：配合 Object.entries()
```js
const obj = { a: 1, b: 2 };

// ❌ 会报错：obj is not iterable
for (let item of obj) {
  console.log(item);
}

```
:::

💡 **总结：for...of 适用于哪些？**  

| 类型     | 是否适用 `for...of`  |
| ------ | ---------------- |
| Array  | ✅ 是              |
| String | ✅ 是              |
| Map    | ✅ 是              |
| Set    | ✅ 是              |
| Object | ❌ 否（需转成 entries） |


### every some find findIndex  

| 方法            | 作用               | 返回值                  | 短路  | 找不到返回       |
| ------------- | ---------------- | -------------------- | --- | ----------- |
| `every()`     | 是否**全部**满足条件     | 布尔值：`true` 或 `false` | ✅ 是 | `false`     |
| `some()`      | 是否**至少一个**满足条件   | 布尔值：`true` 或 `false` | ✅ 是 | `false`     |
| `find()`      | 找到**第一个满足条件的元素** | 元素 或 `undefined`     | ✅ 是 | `undefined` |
| `findIndex()` | 找到**第一个满足条件的索引** | 索引 或 `-1`            | ✅ 是 | `-1`        |  


### every...比较  

✅ **方法对比总览表**  

| 方法            | 返回值类型           | 适用类型        | 判断方式        | 返回内容             | 找不到时返回      | 是否支持回调 |
| ------------- | --------------- | ----------- | ----------- | ---------------- | ----------- | ------ |
| `every`       | `Boolean`       | 任意          | 所有都满足条件？    | `true` / `false` | —           | ✅      |
| `some`        | `Boolean`       | 任意          | 有一个满足条件？    | `true` / `false` | —           | ✅      |
| `find`        | 元素或 `undefined` | 任意          | 查找第一个满足条件的项 | 元素               | `undefined` | ✅      |
| `findIndex`   | 数字              | 任意          | 查找第一个满足条件的项 | 索引               | `-1`        | ✅      |
| `indexOf`     | 数字              | 基础类型        | 值相等（===）    | 第一个出现的索引         | `-1`        | ❌      |
| `lastIndexOf` | 数字              | 基础类型        | 值相等（===）    | 最后一个出现的索引        | `-1`        | ❌      |
| `includes`    | `Boolean`       | 基础类型（含 NaN） | 值相等（===）    | 是否包含某值           | `false`     | ❌      |


✅ **适用场景对比**  

| 场景                    | 推荐方法            | 示例                                     |
| --------------------- | --------------- | -------------------------------------- |
| 是否**所有元素都满足**条件       | `every`         | `[1,2,3].every(n => n > 0)` → `true`   |
| 是否**至少一个元素满足**条件      | `some`          | `[1,2,3].some(n => n > 2)` → `true`    |
| 查找第一个满足条件的元素          | `find`          | `arr.find(item => item.id === 1)`      |
| 查找第一个满足条件的元素的索引       | `findIndex`     | `arr.findIndex(item => item.id === 1)` |
| 查找**基础类型值**的位置（从前往后）  | `indexOf`       | `[1, 2, 3].indexOf(2)` → `1`           |
| 查找**基础类型值**的位置（从后往前）  | `lastIndexOf`   | `[1, 2, 1].lastIndexOf(1)` → `2`       |
| 判断是否包含某基础值（含 `NaN`）   | `includes`      | `[1, 2, NaN].includes(NaN)` → `true`   |
| 查找是否**存在某对象**（需自定义条件） | `some` / `find` | `arr.some(item => item.id === 1)`      |


✅ **注意事项总结**  

| 方法            | 注意事项                   |
| ------------- | ---------------------- |
| `indexOf`     | 无法判断 `NaN`，也无法用于对象比较   |
| `includes`    | 可判断 `NaN`，不能用于对象判断     |
| `find`        | 找的是**元素本身**，而非索引       |
| `some`        | 一旦命中即停止（性能优）           |
| `every`       | 一旦遇到不满足即停止             |
| `findIndex`   | 找不到返回 `-1`             |
| `lastIndexOf` | 只能匹配**值相等**的基础类型，不能用回调 |






 








