# 字符串方法  

## String  

`String` 对字符串的内部支持 

📌 **从…继承/覆盖**  

继承于 Object 

🔍 **构造函数**  

`new String(s) // 构造函数`  

`String(s) // 构造函数`  

🔥 **参数**  

`s`  

要存储在`String`对象中或转换成原始字符串的值。  

🔚 **返回值**  

当`String()`与`new`运算符一起作为构造函数使用时，返回一个新创建的`String`对象，存放的是`字符串s`。当不用`new`运算符调用`String()`时，它只把`s`转换成`原始的字符串`，并返回转换后的值。

ℹ️ **属性**  

`length `  

字符串中的字符数。  

📋 **方法**  

`charAt( )`  

抽取字符串中指定位置处的字符。

`charCodeAt( )`  

返回字符串中指定位置处的字符编码。

`concat( )`  

把一个或多个值连接到字符串上。

`indexOf( )`  

在字符串中检索一个字符或一个子串。

`lastIndexOf( )`  

在字符串中向后检索一个字符或一个子串。

`match( )`  

用正则表达式执行模式匹配。

`replace( )`  

用正则表达式执行查找、替换操作。

`search( )`  

检索字符串中与正则表达式匹配的子串。

`slice( )`  

返回字符串的一个片段或一个子串。

`split( )`  

把字符串分割成一个字符串数组，在指定的分界字符处或正则表 达式处执行分割。

`substring( )`  

从字符串中抽取一个子串。

`substr( )`  

从字符串中抽取一个子串。该方法是substring()的一个变体。

`toLowerCase( )`  

将字符串中的所有字符都转换成小写的，然后返回一个副本。

`toString( )`  

返回原始的字符串值。

`toUpperCase( )`  

将字符串中的所有字符都转换成大写的，然后返回一个副本。

`valueOf( )`  

返回原始字符串值。

📋 **静态方法**  

`String.fromCharCode( )`  

用作为参数而传递的字符代码创建一个新的字符串。


📋 **描述**  

字符串是`JavaScript`的一种基本数据类型。`String`类提供了操作原始字符串值的方法。 `String`对象的`length`属性声明了该字符串中的字符数。类`String`定义了大量操作字符串的方法， 例如从字符串中提取字符或子串，或者检索字符或子串。注意，`JavaScript`的字符串是不可变(`immutable`)的，`String`类定义的方法都不能改变字符串的内容。像`String.toUpperCase()`这样的方法，返回的是全新的字符串，而不是修改原始字符串。

在`JavaScript 1.2`及其后版本的`Netscape`实现中，字符串的行为就像只读的字符数组。 例如，从字符串`s`中提取第三个字符，可以用`s[2]`代替更加标准的`s.charAt(2)`。 此外，对字符串应用`for/in`循环时，它将枚举字符串中每个字符的数组下标(但要注意，`ECMAScript`标准规定，不能枚举`length`属性)。因为`Netscape`实现中的字符 串的数组行为不标准，所以应该避免使用它。


## charAt  

🔍 **语法**  

`string.charAt(n)`  

🔥 **参数**  

`n `  

应该返回的字符在`string`中的下标。  

🔚 **返回值**  

字符串`string`的第`n`个字符。  

📋 **描述**  

方法`String.charAt()`返回字符串`string`中的第n个字符。字符串中第一个字符的下标值是`0`。如果参数`n`不在`0`和`string.length-1`之间，该方法将返回一个空字符串。注意，`JavaScript`并没有一种有异于字符串类型的字符数据类型，所以返回的字符是长度为`1`的字符串。


## charCodeAt  

🔍 **语法**  

`string.charCodeAt(n)`  

🔥 **参数**  

`n `  

返回编码的字符的下标。
 

🔚 **返回值**  

`string`中的第`n`个字符的`Unicode`编码。这个返回值是`0～65535`之间的`16`位整数。 

📋 **描述**  

方法`charCodeAt()`与`charAt()`执行的操作相似，只不过前者返回的是位于指定位置的字符的编码，而后者返回的则是含有字符本身的子串。如果`n`是负数，或者大于等于字符串的长度，则`charCodeAt()`返回`NaN`。


## concat  

🔍 **语法**  

`string.concat(value, ...) `  

🔥 **参数**  

`value, ... `  

要连接到`string`上的一个或多个值。
 

🔚 **返回值**  

把每个参数都连接到字符串`string`上得到的新字符串。

📋 **描述**  

方法`concat()`将把它的所有参数都转换成字符串(如果必要)，然后按顺序连接到字符串`string`的尾部，返回连接后的字符串。注意，`string`自身并没有被修改。 

`String.concat()`与`Array.concat()`很相似。注意，使用“+”运算符来进行字符串的连接运算通常更简便一些。 


## fromCharCode  

🔍 **语法**  

`String.fromCharCode(c1, c2, ...) `  

🔥 **参数**  

`c1, c2, ...  `  

零个或多个整数，声明了要创建的字符串中的字符的`Unicode`编码。
 

🔚 **返回值**  

含有指定编码的字符的新字符串。


📋 **描述**  

这个静态方法提供了一种创建字符串的方式，即字符串中的每个字符都由单独的数字 `Unicode`编码指定。注意，作为—种静态方法，`fromcharCode()`是构造函数 `String()`的属性，而不是字符串或`String`对象的方法。

`String.charCodeAt()`是与`String.fromCharCode()`配套使用的实例方法，它提 供了获取字符串中单个宁符的编码的方法。  


🔶 **示例**  

```js
// 创建字符串"hello"

var s = String.fromCharCode(104, 101, 108, 108, 111);
```



## indexOf  

🔍 **语法**  

`string.indexOf(substring)`   

`string.indexOf(substring,start)`  


🔥 **参数**  

`substring`  

要在字符串`string`中检索的子串。

`start`  

一个可选的整数参数，声明了在字符串`String`中开始检索的位置。它的合法取值是`0`(字符串中的第一个字符的位置)到`string.length-1`(字符串中的最后一个字符的位置)。如果省略了这个参数，将从字符串的第一个字符开始检索。

 

🔚 **返回值**  

如果在`string`中的`start`位置之后存在`substring`返回出现的第一个`substring` 的位置。如果没有找到子串`substring`返回`-1`。


📋 **描述**  

方法`string.indexOf()`将从头到尾的检索字符串`string`，看它是否含有子串 `substring`。开始检索的位置在字符串`string`的`start`处或`string`的开头(没有 指定`start`参数时)。如果找到了一个`substring`那么`String.indexOf()`将返回 `substring`的第一个字符在`string`中的位置。`string`中的字符位置是从`0`开始的。 

如果在`string`中没有找到`substring`，那么`String.indexOf()`方法将返回`-1`。


## lastIndexOf  

🔍 **语法**  

`string.lastIndexOf(substring)` 

`string.lastIndexOf(substring, start)`  


🔥 **参数**  

`substring`  

要在字符串`string`中检索的子串。

`start`  

一个可选的整数参数，声明了在字符串`string`中开始检索的位置。它的合法取值是0(字符串中的第一个字符的位置)到`string.1ength-1`(字符串中的最后一个字符的位置)。如果省略了这个参数，将从字符串的最后一个字符处开始检索。



🔚 **返回值**  

如果在`string`中的`start`位置之前存在`substring`那么返回的就是出现的最后一个`substring`的位置。如果没有找到子串`substring`那么返回的是`-1`。


📋 **描述**  

方法`String.1astIndexOf()`将从尾到头的检索字符串`string`看它是否含有子串 `substring`。开始检索的位置在字符串`string`的`start`处或`string`的结尾(没有 指定`start`参数时)。如果找到了一个`substring`，那么`String.lastIndexOf()`将返回`substring`的第一个字符在`string`中的位置。由于是从尾到头的检索一个字符串，所以找到的第一个`substrlng`其实是`strlng`中出现在位置`start`之前的最后一个`substring`。 

如果在`string`中没有找到`substring`，那么该方法将返回`-1`。

注意，虽然`String.1astIndexOf()`是从尾到头的检索字符串`string`，但是它返回的字符位置仍然是从头开始计算的。字符串中第一个字符的位置是`0`，最后—个字符的位置是`string.1ength-1`。


## length  


🔍 **语法**  

`string.length`  

📋 **描述**  

属性`String.1ength`是一个只读整数，它声明了指定字符串`string`中的字符数。对于任何一个字符串s，它最后一个字符的下标都是`s.1ength-1`。用`for/in`循环不能枚举出字符串的`length`属性，用`delete`运算符也不能删除它。



## localeCompare  


📋 **描述**  

`string.localeCompare(target)` 是 `JavaScript` 中用于比较两个字符串的方法，考虑了语言环境（`locale`）的规则。  



🔍 **语法**  

`str1.localeCompare(str2, [locales], [options])`   


🔥 **参数**  

`str1`  

要比较的字符串。

`str2`  

与 `str1` 进行比较的目标字符串。

`locales`（可选）  

一个或多个表示语言环境的字符串，如 "en", "zh-Hant-TW" 等。

`options`（可选）  

对象，用于指定比较行为，比如是否区分大小写、重音符等。



🔚 **返回值**  

- -1：如果 str1 小于 str2

- 0：如果 str1 等于 str2

- 1：如果 str1 大于 str2

注意：某些浏览器可能返回`负数`或`正数`，不一定是精确的 `-1` 和 `1`，所以通常写成：

```js
if (str1.localeCompare(str2) < 0) { ... }
```


## match  


📋 **描述**  

`string.match(regexp)` 是 `JavaScript` 中用于根据正则表达式 匹配字符串 的方法。  


🔍 **语法**  

`string.match(regexp)`   


🔥 **参数**  

`string`  

要匹配的目标字符串。

`regexp`  

可以是一个 正则表达式对象，或是一个 字符串（但推荐使用正则对象）。


🔚 **返回值**  

1. 如果匹配成功：  

- 如果 `regexp` 没有设置全局标志（`/g`），返回第一个匹配的信息数组（包含索引、输入等）。

- 如果 `regexp` 设置了全局标志（`/g`），返回所有匹配结果组成的数组（仅匹配项，不含索引等）。

2. 如果匹配失败：返回 `null`  


🔶 **示例**  

1. 匹配单个（无 /g）：  

```js
const str = 'I have 2 apples';
const result = str.match(/\d+/);
console.log(result);
// 输出：["2", index: 7, input: "I have 2 apples", groups: undefined]
```

2. 匹配多个（有 /g）：

```js
const str = 'I have 2 apples and 3 bananas';
const result = str.match(/\d+/g);
console.log(result);
// 输出：["2", "3"]

```

3. 没有匹配：  

```js
const result = 'abc'.match(/\d+/);
console.log(result); // null
```

🔧 **用途**  

- 从文本中提取数字、邮箱、URL 等信息

- 配合正则分词或做语法检查

- 统计匹配次数或位置



## replace  

`string.replace(regexp, replacement)` 是 JavaScript 中用于替换字符串中匹配项的方法。它可以使用字符串或正则表达式匹配内容，并替换为指定的字符串或通过函数动态生成的内容。


🔍 **语法**  

`string.replace(regexp | substring, replacement)`   


🔥 **参数**  

`regexp | substring`  

可以是字符串或正则表达式（通常使用正则）  

`replacement`  

可以是字符串，也可以是函数

🔚 **返回值**  

返回 替换后的新字符串（不会修改原始字符串）  

🔶 **示例**  

::: details 示例详情

1. 使用字符串替换  

```js
'hello world'.replace('world', 'Jack')
// => "hello Jack"
```

2. 使用正则表达式替换  

- 只替换第一个匹配项

```js
'apple, banana, apple'.replace(/apple/, 'orange')
// => "orange, banana, apple"
```

- 替换全部匹配项，使用 /g  

```js
'apple, banana, apple'.replace(/apple/g, 'orange')
// => "orange, banana, orange"
```

3. 使用捕获组 `$1`, `$2` 等  

- 🔹 什么是捕获组？  

捕获组是 正则表达式中使用圆括号 `()` 包起来的部分，它能将匹配的子字符串“捕获”下来，供后续使用（如 `.replace()`、`.match()`、`.exec()`等方法中）。


```js
'2025-08-08'.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3/$2/$1')
// => "08/08/2025"
```

 4. 使用函数作为 `replacement`  

- 可以动态处理每次匹配：

```js
'apple banana'.replace(/\b\w+\b/g, (match) => match.toUpperCase())
// => "APPLE BANANA"
```

🎯 特殊的 `$` 替换符：  

| 替换符     | 含义             |
| ------- | -------------- |
| `$&`    | 匹配的子串本身        |
| \`$\`\` | 匹配子串前的内容       |
| `$'`    | 匹配子串后的内容       |
| `$n`    | 捕获组（\$1, \$2…） |
| `$$`    | 字面上的 `$` 符号    |

- 示例

```js
'hello world'.replace(/world/, '[$&]')
// => "hello [world]"
```

:::

🔧 **用途**  

替换敏感词、空格、标点等

格式化日期、金额

动态构造字符串内容（如模版引擎简化版）

HTML 内容过滤


## search  

`string.search(regexp)` 是 JavaScript 用于 查找正则表达式在字符串中首次匹配位置 的方法。  

🔍 **语法**   

`string.search(regexp)`  

🔥 **参数**  

`regexp`  

一个正则表达式对象，或可被转换为正则的字符串（推荐直接用正则）。  

🔚 **返回值**  

匹配到的位置（索引号，从 `0` 开始），如果没匹配到，返回 `-1`。  

🔶 **示例**  

:::details 详情

示例 1：简单查找  

- "world" 在索引 6 开始出现。

```js
'hello world'.search(/world/)
// => 6

```

示例 2：大小写不匹配（不匹配，返回 -1）  

```js
'hello world'.search(/World/)
// => -1

```

示例 3：忽略大小写

```js
'hello world'.search(/World/i)
// => 6

```

:::  


⚠️ **和 `.indexOf()` 的区别**  

| 特点    | `.search()`    | `.indexOf()` |
| ----- | -------------- | ------------ |
| 接收正则  | ✅ 支持           | ❌ 只支持字符串     |
| 忽略大小写 | ✅ 正则可设置 `i` 标志 | ❌ 不能         |
| 查找子串  | ✅              | ✅            |


**🚫 注意：**  

`.search()` 不会返回匹配的内容，只返回索引。  

想获取匹配内容请用：`.match()` 或 `.matchAll()`



## slice  

`string.slice()` 是 JavaScript 用来截取字符串的方法，它不会改变原字符串，而是返回一个新的字符串。  

🔍 **语法**   

`string.slice(beginIndex, endIndex)`  

🔥 **参数**  

`beginIndex`（必填）  

- 开始截取的位置（从 `0` 开始）。

- 如果是负数，表示从字符串末尾开始计算（`-1` 是最后一个字符）。  

`endIndex`（可选）  

- 截取到的位置（不包含该位置的字符）。

- 如果省略，则一直截到字符串末尾。

- 如果是负数，同样表示从末尾计算。  

:::details 🔶 **示例**  

```js
const str = "Hello World";

// 从索引 0 到索引 5（不包括 5）
console.log(str.slice(0, 5)); // "Hello"

// 从索引 6 到末尾
console.log(str.slice(6)); // "World"

// 从倒数第 5 个字符到末尾
console.log(str.slice(-5)); // "World"

// 从倒数第 5 个字符到倒数第 2 个字符（不含倒数第 2 个）
console.log(str.slice(-5, -2)); // "Wor"
```

:::


## split  

`string.split()` 是 JavaScript 用来按指定分隔符把字符串切成数组的方法。  

🔍 **语法**   

`string.split(separator, limit)`  

🔥 **参数**  

`separator`（必填）  

- 分隔符，可以是字符串或正则表达式。

- 如果传空字符串 ""，会把字符串按单个字符拆分。

- 如果省略 `separator`，返回的数组只有原字符串一个元素。

`limit`（可选）  

- 限制返回的数组元素个数。  

:::details 🔶 **示例**  

```js
const str = "apple,banana,orange";

// 按逗号分割
console.log(str.split(",")); 
//分隔符会被“吃掉”，不会出现在返回数组中（除非用捕获组正则保留） 
// ["apple", "banana", "orange"]

// 按逗号分割，并限制最多返回 2 个元素
console.log(str.split(",", 2));  
// ["apple", "banana"]

// 按空字符串分割（拆成单个字符）
console.log(str.split(""));  
// ["a", "p", "p", "l", "e", ",", "b", "a", "n", "a", "n", "a", ",", "o", "r", "a", "n", "g", "e"]

// 按正则分割（匹配一个或多个逗号/空格）
console.log("a, b,,c".split(/[, ]+/));  
// ["a", "b", "c"]

// 不传分隔符
console.log(str.split());  
// ["apple,banana,orange"]

```
:::


## substr  

`string.substr()` 是 JavaScript 用来从指定位置开始截取指定长度的字符串的方法，不过它已经被废弃（`deprecated`），建议用 `slice()` 或 `substring()` 代替。  

🔍 **语法**   

`string.substr(start, length)`  

🔥 **参数**  

`start`（必填）  

- 截取的起始位置（从 `0` 开始）

- 如果是负数，则从字符串末尾开始计算。

`length`（可选）  

- 要截取的字符数。

- 如果省略，就截取到末尾。  

:::details 🔶 **示例**  

```js
const str = "Hello World";

// 从索引 0 开始，截取 5 个字符
console.log(str.substr(0, 5)); // "Hello"

// 从索引 6 开始，截取到末尾
console.log(str.substr(6));    // "World"

// 从倒数第 5 个字符开始，截取 3 个字符
console.log(str.substr(-5, 3)); // "Wor"

```
:::

**🚫 注意：**  

和 `slice()` / `substring()` 的区别  

| 方法          | 第二个参数的含义  | 支持负数索引 | 是否废弃 |
| ----------- | --------- | ------ | ---- |
| `substr`    | 长度        | ✅ 支持   | ⚠ 废弃 |
| `slice`     | 结束索引（不包含） | ✅ 支持   | 否    |
| `substring` | 结束索引（不包含） | ❌ 不支持  | 否    |



## substring  

`string.substring()` 是 JavaScript 用来截取两个索引之间的字符串的方法。它和 `slice()` 类似，但有几个细节区别。  

🔍 **语法**   

`string.substring(indexStart, indexEnd)`  

🔥 **参数**  

`indexStart`（必填）  

- 开始位置（从 `0` 开始）。

`indexEnd`（可选）  

- 结束位置（不包含该位置的字符）。

- 如果省略，截取到末尾。  

**主要特性**  

1. 不支持负数索引  

- 如果传负数，会当作 0。

2. 参数顺序无关紧要  

- 如果 `indexStart` > `indexEnd`，会自动交换两个值。  


:::details 🔶 **示例**  

```js
const str = "Hello World";

// 从索引 0 到索引 5（不包括 5）
console.log(str.substring(0, 5)); // "Hello"

// 从索引 6 到末尾
console.log(str.substring(6)); // "World"

// 参数反过来也可以
console.log(str.substring(5, 0)); // "Hello"

// 负数会当作 0
console.log(str.substring(-3, 5)); // "Hello"

```
:::  


**和 `slice()` 的区别**  

| 方法          | 支持负数索引 | 参数交换  | 第二个参数含义   |
| ----------- | ------ | ----- | --------- |
| `slice`     | ✅ 支持   | ❌ 不交换 | 结束索引（不包含） |
| `substring` | ❌ 不支持  | ✅ 会交换 | 结束索引（不包含） |


**💡 简单记**  

- 要用负数索引 → 用 `slice()`

- 要不在意参数顺序 → 用 `substring()`  


## toLocaleLowerCase  

`string.toLocaleLowerCase()` 是 JavaScript 用来根据本地语言环境规则，将字符串里的字母转成小写的方法。

它和 `toLowerCase()` 类似，但会考虑区域化（`locale`）差异，在某些语言中表现会不一样，比如土耳其语的 `I` 转换规则。

🔍 **语法**   

`string.toLocaleLowerCase([locale])`  

🔥 **参数**  

`locale`（可选）  

- 指定地区语言代码（如 `"en-US"`, `"tr"`, `"zh-CN"` 等），也可以是数组。

- 如果省略，就用运行环境的默认区域。  


:::details 🔶 **示例**  

```js
const str = "HELLO WORLD";

// 默认区域（通常是英语环境）
console.log(str.toLocaleLowerCase()); 
// "hello world"

// 指定土耳其语（I 转换为不同的小写）
console.log("I".toLocaleLowerCase("tr")); 
// "ı"（注意不是普通的 i）

// 支持数组形式
console.log("I".toLocaleLowerCase(["en-US", "tr"])); 
// "i"（会按数组顺序匹配支持的语言）

```
:::  


**和 `toLowerCase()` 的区别**  

| 方法                    | 是否考虑本地化 | 是否支持传入 locale 参数 |
| --------------------- | ------- | ---------------- |
| `toLowerCase()`       | ❌ 否     | ❌ 否              |
| `toLocaleLowerCase()` | ✅ 是     | ✅ 是              |



💡 **简单记**  

- 一般情况下，用 `toLowerCase()` 就够了。  

- 需要兼容特殊语言（如土耳其语、立陶宛语）时，用 `toLocaleLowerCase()`。  


## toLocaleUpperCase  

`string.toLocaleUpperCase()` 是 JavaScript 用来根据本地语言环境规则，将字符串里的字母转成大写的方法。

它和 `toUpperCase()` 类似，但会考虑区域化（`locale`）差异，在某些语言中表现会不同，比如土耳其语的小写 `i` 转换规则。  

🔍 **语法**   

`string.toLocaleUpperCase([locale])`  

🔥 **参数**  

`locale`（可选）  

- 指定地区语言代码（如 `"en-US"`, `"tr"`, `"zh-CN"` 等），也可以是数组。

- 如果省略，就使用运行环境的默认区域。  

:::details 🔶 **示例**  

```js
const str = "hello world";

// 默认区域（通常是英语环境）
console.log(str.toLocaleUpperCase());
// "HELLO WORLD"

// 指定土耳其语（i 转换为不同的大写）
console.log("i".toLocaleUpperCase("tr"));
// "İ"（注意是带点的大写 I）

// 支持数组形式
console.log("i".toLocaleUpperCase(["en-US", "tr"]));
// "I"（会按数组顺序匹配支持的语言）

```
:::   


**和 `toUpperCase()` 的区别**  

| 方法                    | 是否考虑本地化 | 是否支持传入 locale 参数 |
| --------------------- | ------- | ---------------- |
| `toUpperCase()`       | ❌ 否     | ❌ 否              |
| `toLocaleUpperCase()` | ✅ 是     | ✅ 是              |

💡 **简单记**    

- 平时用 `toUpperCase()` 就够了。

- 需要兼容特殊语言（如土耳其语、立陶宛语）时，用 `toLocaleUpperCase()`。


## toLowerCase  

`string.toLowerCase()` 是 JavaScript 用来将字符串里的字母全部转成小写的方法，不会修改原字符串，而是返回一个新的字符串。

它不考虑本地化规则（`locale`），只是按 `Unicode` 基本大小写映射来转换。  

🔍 **语法**   

`string.toLowerCase()`  

🔥 **参数**  

- 没有参数，也不支持传入 `locale`。

- 如果需要考虑语言环境（比如土耳其语 `I` 的大小写规则），应该用 `toLocaleLowerCase()`。  

:::details 🔶 **示例**  

```js
const str = "HELLO WORLD";

// 转小写
console.log(str.toLowerCase());
// "hello world"

// 原字符串不变
console.log(str); 
// "HELLO WORLD"

// 对非英文字母也生效（按 Unicode 映射）
console.log("ÄÖÜ".toLowerCase());
// "äöü"

```
:::


**和 `toLocaleLowerCase()` 的区别**  

| 方法                    | 是否考虑本地化 | 支持传入 locale |
| --------------------- | ------- | ----------- |
| `toLowerCase()`       | ❌ 否     | ❌ 否         |
| `toLocaleLowerCase()` | ✅ 是     | ✅ 是         |


## toString  

`toString()` 是 JavaScript 用来把值转换成字符串的方法，大多数对象和基本类型都有这个方法。

它的行为取决于你在哪个数据类型上调用它。  

🔍 **语法**   

`value.toString([radix])`  

🔥 **参数**  

`radix`（只对数字有效）  

- 指定转换为字符串时使用的进制（`2~36` 之间的整数）。

- 省略时，默认是 `10` 进制。  


::::details 🔶 **示例**  

:::code-group

```js [数字]
let num = 255;

console.log(num.toString());     // "255"（默认 10 进制）
console.log(num.toString(2));    // "11111111"（二进制）
console.log(num.toString(16));   // "ff"（十六进制）

```

```js [字符串]
let str = "Hello";
console.log(str.toString()); // "Hello"（本来就是字符串）
```

```js [数组]
let arr = [1, 2, 3];
console.log(arr.toString()); // "1,2,3"（数组元素用逗号连接）
```

```js [对象]
let obj = {a: 1};
console.log(obj.toString()); // "[object Object]"（默认格式）

// 如果对象自定义了 toString()，会返回自定义的内容：

let person = {
  name: "Jack",
  toString() {
    return `Person: ${this.name}`;
  }
};
console.log(person.toString()); // "Person: Jack"

```

```js [布尔值]
console.log(true.toString());  // "true"
console.log(false.toString()); // "false"
```

```js [日期]
let date = new Date();
console.log(date.toString()); // 类似 "Mon Aug 11 2025 13:45:00 GMT+0800 (China Standard Time)"
```

:::

::::  

**🚫 注意：** 

1. `null` 和 `undefined` 没有 `toString()` 方法，直接调用会报错：  

```js
null.toString();      // ❌ TypeError
undefined.toString(); // ❌ TypeError

// 如果想安全转换，可以用 String(value)：

String(null);      // "null"
String(undefined); // "undefined"

```

2. 对象的 `toString()` 可被重写，用来自定义输出。  


## toUpperCase  

`string.toUpperCase()` 是 JavaScript 用来将字符串里的字母全部转成大写的方法。
它不会修改原字符串，而是返回一个新的字符串。

它不考虑本地化规则（`locale`），只是按 `Unicode` 基本大小写映射来转换。  

🔍 **语法**   

`string.toUpperCase()`  

🔥 **参数**  

- 没有参数，也不支持传入 `locale`。

- 如果需要考虑语言环境（例如土耳其语的 `i` 大写规则），要用 `toLocaleUpperCase()`。  


:::details 🔶 **示例**  

```js
const str = "hello world";

// 转大写
console.log(str.toUpperCase());
// "HELLO WORLD"

// 原字符串不变
console.log(str);
// "hello world"

// 对非英文字母同样有效（按 Unicode 映射）
console.log("äöü".toUpperCase());
// "ÄÖÜ"

```

:::


**和 `toLocaleUpperCase()` 的区别**  

| 方法                    | 是否考虑本地化 | 支持传入 locale |
| --------------------- | ------- | ----------- |
| `toUpperCase()`       | ❌ 否     | ❌ 否         |
| `toLocaleUpperCase()` | ✅ 是     | ✅ 是         |


## valueOf  

`string.valueOf()` 是 JavaScript 用来**返回字符串的原始值（primitive value）**的方法。

它几乎和直接用字符串本身一样，因为字符串是原始类型，所以 `valueOf()` 通常只是一个形式上的方法。

🔍 **语法**  

`string.valueOf()`

🔥 **参数**  

- 没有参数。

- 返回的就是该字符串本身（原始值，而不是 `String` 对象）。  

:::details 🔶 **示例**  

```js
// 基本字符串
let str = "Hello";
console.log(str.valueOf()); // "Hello"

// String 对象
let strObj = new String("Hello");
console.log(strObj.valueOf()); // "Hello"（返回原始值）
console.log(typeof strObj);    // "object"
console.log(typeof strObj.valueOf()); // "string"

// 和直接使用字符串一样
console.log(strObj.valueOf() === "Hello"); // true

```

:::
