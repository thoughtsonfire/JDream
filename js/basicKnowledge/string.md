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





