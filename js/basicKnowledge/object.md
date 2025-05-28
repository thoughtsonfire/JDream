# 对象方法  


## Object  

`Object` 含有所有JavaScript对象的特性的超类   

🔧 **构造函数**    

`new Object(  )` 

`new Object(value)`  

🔥 **参数**  

`value`  

可选的参数，声明了要转换成`Number`对象、`Boolean`对象或`String`对象的<span style="color:red">原始值</span>(即数字、布尔值或字符串)。`JavaScript 1.1`之前的版本和`ECMAScript Vl`不支持该对象。

🔚 **返回值**  

如果没有给构造函数传递`value`参数，那么它将返回一个新创建的`Object`实例。如果指定了原始的`value`参数，构造函数将创建并返回<span style="color:red">原始值</span>的包装对象，即`Number`对象、`Boolean`对象或`String`对象。当不使用`new`运算符，将`Object()`构造函数作为函数调用时，它的行为与使用`new`运算符时一样。  

🔶 **示例**  

```js
let a = Object(1)       //a={1}   1为对象a的原始值
a.first = 'q'
a                       //a={1,first:'q'}

let b = a.valueOf()     //b=1
```

🔷 **属性**  

`constructor`  

对一个`JavaScript`函数的引用，该函数是对象的构造函数。

🔢 **方法**  

`hasOwnProperty( )`  

检查对象是否有局部定义的(非继承的)、具有特定名字的属性。

`isPrototypeOf( )`  

检查对象是否是指定对象的原型。

`propertyIsEnumerable( )`  

检查指定的属性是否存在，以及是否能用`for/in`循环枚举。

`toLocaleString( )`  

返回对象地方化的字符串表示。该方法的默认实现只调用`toString()`方法，但子类可以覆盖它，提供本地化。

`toString( )`  

返回对象的字符串表示。`Object`类提供的该方法的实现相当普通，并且没有提供更多有用的信息。`Object`的子类通过定义自己的`toString()`方法覆盖了这一方法(`toString()`方法能够生成更有用的结果)。

`valueOf( )`  

返回对象的原始值(如果存在)。对于类型为`Object`的对象，该方法只返回对象自身。`Object`的子类(如`Number`和`Boolean`)覆盖了该方法，返回的是与对象相关的原始数值。

**描述**  

`Object`类是`JavaScript`语言的内部数据类型。它是其他`JavaScript`对象的超类，因此其他对象都继承了`Object`类的方法和行为。

除了用上面所示的`Object()`构造函数，还可以用`Object`直接量语法创建并初始化对象。


## constructor
 
`Object.constructor` 对象的构造函数 


🔍 **语法**  

`object.constructor`  

📋 **描述**  

对象的`constructor`属性引用了该对象的构造函数。例如，如果用`Array()`构造函 数创建一个数组，那么`a.constructor`引用的就是`Array`：  

```js
a = new Array(1,2,3);   // 创建一个对象

a.constructor == Array  //计算结果为true
``` 

`onstructor`属性常用于判断未知对象的类型。给定了一个未知的值，就可以使用`typeof`运算符来判断它是原始的值还是对象。如果它是对象，就可以使用`constructor`属性来判断对象的类型。例如，下面的函数用来判断一个给定的值是否是数组：

```js
function isArray(x) {

    return ((typeof x == "object") && (x.constructor == Array));

} 
```

但是要注意，虽然这种方法适用于`JavaScript`核心语言的内部对象，但对于“主对象”，如`Window`这样的客户端`JavaScript`对象，这种方法就不一定适用了。`Object.toString()`方法的默认实现提供了另一种判断未知对象类型的方法。


## hasOwnProperty

`Object.hasOwnProperty( )` 检查属性是否被继承 

🔍 **语法**  

`object.hasOwnProperty(propname)`  

🔥 **参数**  

`propname`  

一个字符串，包含`object`的属性名。

🔚 **返回值**  

如果`object`有`propname`指定的非继承属性，则返回`true`。如果`object`没有名为 `propname`指定的属性，或者它从原型对象继承了这一属性，则返回`false`。

📋 **描述**  

`JavaScript`对象既可以有自己的属性，又可以从原型对象继承属性。 `hasOwnProperty()`方法提供了区分继承属性和非继承的局部属性的方法。

🔶 **示例**


```js
var o = new Object(  );          // 创建对象

o.x = 3.14;                      // 定义非继承的局部属性y

o.hasOwnProperty("x");           // 返回 true: x 是O的局部属性

o.hasOwnProperty("y");           // 返回 false: o 没有属性y

o.hasOwnProperty("toString");    // 返回 false: toString属性是继承的
```
 
##  isPrototypeOf  

`Object.isPrototypeOf( )` 是否在原型链上


🔍 **语法**  

`object.isPrototypeOf(o)`  

🔥 **参数**  

`o`  

任意对象。

🔚 **返回值**  

如果`object`是`O`的原型，则返回`true`。如果`o`不是对象，或者`object`不是`o`的原型，则返回`false`。

📋 **描述**  

`A.isPrototypeOf(B)`  

判断：A 是否存在于 B 的原型链上

🔶 **示例**  

```js
var o = new Object(  );                          // 创建一个对象

Object.prototype.isPrototypeOf(o)                // true: o 是一个对象

Function.prototype.isPrototypeOf(o.toString);    // true: toString 是一个函数

Array.prototype.isPrototypeOf([1,2,3]);          // true: [1,2,3] 是一个数组


//下面是执行同样测试的另一种方法

(o.constructor == Object);  // true: o was created with Object(  ) constructor

(o.toString.constructor == Function);  // true: o.toString is a function



//原型则对象本身于原型对象。下面的调用返回true

//说明函数继 Function.prototype和Object.prototyp属性.

Object.prototype.isPrototypeOf(Function.prototype);
 
```


##  propertyIsEnumerable  

`Object.propertyIsEnumerable( )` 是否可以通过for/in循环看到属性   

🔍 **语法**  

`object.propertyIsEnumerable(propname)`  

🔥 **参数**  

`propname`  

一个字符串，包含`object`原型的名字。

🔚 **返回值**  

如果`object`具有名为`propname`的非继承属性，而且该属性是可枚举的(即用`for/in`循环可以枚举出它)，则返回`true`。 

📋 **描述**  

用`for/in`语句可以遍历一个对象“可枚举”的属性。但并非—个对象的所有属性都是可枚举的，通过`JavaScript`代码添加到对象的属性是可枚举的，而内部对象的预定义属性(如方法)通常是不可枚举的。`propertylsEnumerable()`方法提供了区分可枚举属性和不可枚举属性的方法。但要注意，`ECMAScript`标准规定，`propertyIsEnumerable()`方法不检测原型链，这意味着它只适用于对象的局部属性，不能检测继承属性的可枚举性。

示例  

```js
var o = new Object(  );                // 创建一个对象

o.x = 3.14;                            // 定义—个属性

o.propertyIsEnumerable("x");           // true属性x是局部的、可枚举的

o.propertyIsEnumerable("y");           //false：o没有属性y

o.propertyIsEnumerable("toString");    //false：toStrlng属性是继承的

Object.prototype.propertyIsEnumerable("toString");  // false: 枚举的
```

**Bug**  

当标准限制`propertylsEnumerable()`方法只能检测非继承属性时，明显是错的。 `Internet Explorer 5.5`按标准实现了该方法。`Nestacpe 6.0`实现的`propertyIsEnumerable()`方法考虑了原型链。虽然这种方法可取，但它与标准冲突，所以`Netscape 6.1`修改了它，以便与`IE 5.5`匹配。由于标准中有这个错误，因此该方法不是那么有用。

 
## toLocaleString
 
`Object.toLocaleString( )` 返回对象的本地字符串表示   

🔍 **语法**  

`object.toString( )`  

🔚 **返回值**  

表示对象的字符串。

📋 **描述**  

该方法用于返回对象的字符串表示，本地化为适合本地的形式。`Object`类提供的默认的`toLocaleString()`方法只调用`toString()`方法，返回非本地化的字符串。但其他类(包括`Array`、`Date和Number`)定义了自己的`toLocaleString()`版本，指定本地化字符串的转换。在定义自己的类时，也可以覆盖该方法。

🔶 **示例**  

```js
a={x:1,y:2}
a.toLocaleString()     // a.toLocaleString()为 '[object Object]'
'[object Object]'
```  

## toString  

`Object.toString( )` 定义一个对象的字符串表示  

🔍 **语法**  

`object.toString( )`  

🔚 **返回值**  

表示对象的字符串。 

📋 **描述**  

:::details 这里的方法`toString()`并不是在`JavaScript`程序中经常显示调用的那个`toString()`方法。它是在对象中定义的一个方法，当系统需要把对象转换成字符串时就会调用它。



当在字符串环境中使用对象时，`JavaScript`系统就会调用`toString()`方法把那个对象转换成字符串。例如，假定—个函数期望得到的参数是字符串，那么把对象传递给它时，系统就会将这个对象转换成字符串：

`alert(my_object);`  

同样，在用运算符“+”连接字符串时，对象也会被转换成字符串：  

`var msg = 'My object is: ' + my_object;`  

调用方法`toStrlng()`时不给它传递任何参数，它返回的应该是一个字符串。要使这个字符串有用，它的值就必须以调用`toString()`方法的对象的值为基础。

当用`JavaScript`自定义一个类时，为这个类定义一个`toString()`方法很有用。如果没有给它定义`toString()`方法，那么这个对象将继承`Object`类的默认`toString()`方法。这个方法返回的字符串形式如下：

`[object class] `  

这里，`class`是一个对象类，其值可以是“Object”、“String”、“Number”、“Function”、 “Window”、“Document”，等等。这种行为有时对确定未知对象的类型或类有用。但由于大多数对象都有自定义的`tostring()`版本，所以必须明确地对对象o调用 `Object.toString()`，代码如下所示：

`Object.prototype.toString.apply(o);`  

注意，这种识别未知对象的方法只适用于内部对象。如果你定义了自己的对象类，那么它的类是“Object”。在这种情况下，可以用`Obiect.constructor`属性获取更多有关对象的信息。

在调试`JavaScript`程序时，`toString()`方法非常有用，使用它可以输出对象，查看它们的值。因此，为你创建的每个对象类都定义`toString()`方法很有用。

虽然`tostring()`方法通常由系统自动调用，但你也可以自己调用它。例如，在`JavaScript`不能自动把对象转换成字符串的环境中，可以明确地调用`toString()`方法来实现这一点：

```js
y = Math.sqrt(x);       // 计算一个数

ystr = y.toString(  );  // 转换为—个字符串

```  

注意，在这个例子中，数字具有内部的`toStrlng()`方法，可以用该方法进行强制性的转换。

在其他的环境中，即使`JavaScript`可以自动地进行转换，你也可以调用`toString()`方法，因为对`toString()`的明确调用可以使代码更加清晰： 

`alert(my_obj.toString(  )); `  

:::

🔶 **示例**  

```js
a={x:1,y:2}
a.toString()     // a.toString()为 '[object Object]'
'[object Object]'
```   

## valueOf  
 
Object.valueOf( ) 指定对象的原始值  

🔍 **语法**  

`object.valueOf( )`  

🔚 **返回值**  

与对象object相关的原始值(如果存在)。如果没有值与object相关，则返回对象自身。

📋 **描述**  

:::details 对象的`valueOf()`方法返回的是与那个对象相关的原始值(如果这样的值存在)。对于类型为`Object`的对象来说，由于它们没有原始值，因此该方法返回的是这些对象自身。

对于类型为`Number`的对象，`valueOf()`返回该对象表示的原始数值。同样，对于`Boolean`对象来说，该方法返回与对象相关的布尔值。对于`String`对象来说，返回与 对象相关的字符串。

其实，几乎没有必要自己调用`valueOf()`方法。在期望使用原始值的地方，`JavaScript`会自动地执行转换。事实上，由于方法`valueOf()`是被自动调用的，因此要分辨究 竟是原始值还是与之相应的对象非常困难。虽然使用`typeof`运算符可以显示字符串和`String`对象之间的区别，但在实际应用中，它们在`JavaScript`代码中的作用是一样的。 

`Number`对象、`Boolean`对象和`String`对象的`valueOf()`方法可以将这些包装对象转 换成它们表示的原始值。在调用构造函数`Obioct()`时，如果把数字、布尔值或字符 串作为参数传递给它，它将执行相反的操作，即将原始值打包成相应的对象。几乎在所有的环境中，JavaScript都可以自动地实现原始值和对象之间的转换，所以一般说 来没有必要用这种方法调用构造函数`Object()`。

在某些环境中，你可以为自己的对象定制一个valueOf()方法。例如，你可以定义 一个JavaScript对象来表示复数(即一个实数加一个虚数)。作为这个对象的一部分， 要给它定义执行复数的加法、乘法等其他运算的方法。不过，还有一种功能是你想要的，即像处理常规实数一样处理复数，舍弃它的虚数部分。可以使用下面的代码实现 这一点：

`Complex.prototype.valueOf = new Function("return this.real"); `
有了这个为`Complex`对象定义的`valueOf()`方法，就可以把复数对象传递给方法 `Math.sqrt()`，它将计算复数的实数部分的平方根
:::


🔶 **示例**

```js
a={x:1,y:2}
a.valueOf()
{x: 1, y: 2}
```  

```js
a=new Object()
a.x=1
a.y=2
a.valueOf()
{x: 1, y: 2}
```  

```js
a=new Object(1)
a.x=2
a.y=3
a.valueOf()
1
```

## Object静态方法

| 方法                                           | 描述                          | 示例                                   |
| -------------------------------------------- | --------------------------- | ------------------------------------ |
| `Object.keys(obj)`                           | 返回**自身可枚举属性名**数组            | `['a', 'b']`                         |
| `Object.values(obj)`                         | 返回**自身可枚举属性值**数组            | `[1, 2]`                             |
| `Object.entries(obj)`                        | 返回\*\*\[key, value]\*\*二维数组 | `[['a', 1], ['b', 2]]`               |
| `Object.getOwnPropertyNames(obj)`            | 返回所有自身属性名（包括不可枚举）           | `['a', 'b']`                         |
| `Object.getOwnPropertySymbols(obj)`          | 返回 Symbol 类型的属性名数组          | `[Symbol(foo)]`                      |
| `Object.getOwnPropertyDescriptor(obj, prop)` | 返回某个属性的描述符（如是否可写、可枚举）       | `{ value: 42, writable: true, ... }` |


## Object.defineProperty(obj, prop, descriptor)   

`Object.defineProperty()` 是 `JavaScript` 中非常强大的底层 `API`，用于精确控制对象属性的行为。它允许你定义或修改对象上的属性，并指定该属性是否可枚举、可写、可配置等。


🔍 **语法** 

```js
Object.defineProperty(obj, prop, descriptor)
```
- obj：要定义属性的目标对象。

- prop：要定义或修改的属性名（字符串或 Symbol）。

- descriptor：属性描述符对象，定义该属性的行为。  

🔶 **示例**  
:::details 示例一：定义一个不可更改的属性
```js
const obj = {};
Object.defineProperty(obj, 'name', {
  value: 'Alice',
  writable: false,
  enumerable: true,
  configurable: false
});

console.log(obj.name); // 'Alice'
obj.name = 'Bob';
console.log(obj.name); // 仍是 'Alice'，不可写

```  
:::   

:::details 示例二：隐藏属性（不可枚举）
```js
const person = {};
Object.defineProperty(person, 'secret', {
  value: 'classified',
  enumerable: false
});

console.log(Object.keys(person)); // []
console.log(person.secret);       // 'classified'

```
:::

:::details 示例三：对比普通赋值
```js
const obj = {};
obj.name = 'Tom'; // 默认所有标志：writable, enumerable, configurable 都是 true

Object.defineProperty(obj, 'age', {
  value: 20,
  writable: false,
  enumerable: false,
  configurable: false
});

```
:::

**描述符类型说明**  

1. 数据描述符（默认）    

| 属性             | 默认值         | 说明                                     |
| -------------- | ----------- | -------------------------------------- |
| `value`        | `undefined` | 属性的值                                   |
| `writable`     | `false`     | 是否可更改                                  |
| `enumerable`   | `false`     | 是否可枚举（`for...in`、`Object.keys` 等是否能遍历） |
| `configurable` | `false`     | 是否可删除或重新配置                             |

```js
Object.defineProperty(obj, 'key', {
  value: 123,
  writable: true,
  enumerable: true,
  configurable: true
});

```  
2. 访问器描述符（使用 getter/setter）  

| 属性             | 说明         |
| -------------- | ---------- |
| `get`          | 读取属性时执行的函数 |
| `set`          | 写入属性时执行的函数 |
| `enumerable`   | 是否可枚举      |
| `configurable` | 是否可重新配置    |

```js
const user = {};
let _age = 20;

Object.defineProperty(user, 'age', {
  get() {
    return _age;
  },
  set(val) {
    if (val >= 0) _age = val;
  },
  enumerable: true,
  configurable: true
});

console.log(user.age);  // 20
user.age = 25;
console.log(user.age);  // 25

```


## Object.getOwnPropertyNames(obj)  

`Object.getOwnPropertyNames(obj)` 是 `JavaScript` 中的一个方法，用于获取对象自身的所有“字符串”属性名，包括 不可枚举 的属性（但不包括 `Symbol` 类型的属性）。  

🔍 **语法**  

`Object.getOwnPropertyNames(obj)`  

- 参数：要获取属性名的对象 obj

- 返回值：包含所有自身字符串属性名的数组（包括不可枚举的）  

🔶 **示例**  

:::details ✅获取包括不可枚举的属性名
```js
const obj = {
  visible: 1
};

// 添加一个不可枚举属性
Object.defineProperty(obj, 'hidden', {
  value: 42,
  enumerable: false
});

console.log(Object.getOwnPropertyNames(obj));
// 输出：['visible', 'hidden']

```
:::  

:::details ❌ 不包含 Symbol 属性
```js
const sym = Symbol('secret');
const obj = {
  normal: 123,
  [sym]: 'top secret'
};

console.log(Object.getOwnPropertyNames(obj)); // ['normal']
console.log(Object.getOwnPropertySymbols(obj)); // [Symbol(secret)]

```
:::  

**对比常见属性读取方法**  

| 方法                                  | 包括不可枚举？ | 包括 Symbol？ | 返回内容              |
| ----------------------------------- | ------- | ---------- | ----------------- |
| `Object.keys(obj)`                  | ❌ 否     | ❌ 否        | 可枚举的字符串键名         |
| `Object.getOwnPropertyNames(obj)`   | ✅ 是     | ❌ 否        | 所有字符串键名           |
| `Object.getOwnPropertySymbols(obj)` | ✅ 是     | ✅ 是        | 所有 Symbol 键名      |
| `Reflect.ownKeys(obj)`              | ✅ 是     | ✅ 是        | 所有字符串 + Symbol 键名 |


🔶 **用途示例**  

:::details 1. 列出对象所有属性（包括隐藏的）
```js
const allKeys = Object.getOwnPropertyNames(obj);
for (const key of allKeys) {
  console.log(`${key}: ${obj[key]}`);
}

```
:::  

:::details 2. 获取属性描述符
```js
for (const key of Object.getOwnPropertyNames(obj)) {
  const descriptor = Object.getOwnPropertyDescriptor(obj, key);
  console.log(`${key}:`, descriptor);
}

```
:::  

💡 **小结**  

| 特性        | 是否包含 |
| --------- | ---- |
| 自身属性      | ✅ 是  |
| 不可枚举属性    | ✅ 是  |
| 继承的属性     | ❌ 否  |
| Symbol 属性 | ❌ 否  |



## Object.getOwnPropertySymbols(obj)  

`Object.getOwnPropertySymbols(obj)` 是 `JavaScript` 提供的一个方法，用于获取对象自身所有的 `Symbol` 属性名（即键是 `Symbol` 的属性），返回一个 `Symbol[]` 数组。

🔍 **语法**  

`Object.getOwnPropertySymbols(obj)`  

- 参数：一个对象

- 返回值：该对象自身所有 Symbol 属性名的数组（包括不可枚举的）  

🔶 **示例**  

```js
const sym1 = Symbol('id');
const sym2 = Symbol('secret');

const obj = {
  name: 'Alice',
  [sym1]: 123,
  [sym2]: 'hidden'
};

console.log(Object.getOwnPropertySymbols(obj));
// [Symbol(id), Symbol(secret)]

```

**用途场景**  

- 获取使用 Symbol 定义的私有属性或“隐藏”字段

- 与元编程、底层库、框架（如 Vue、MobX、Redux Toolkit 等）配合使用

- 调试或分析对象内部结构  

⚠️ **注意事项**  

`Symbol` 属性不会被 `for...in`、`Object.keys()`、`JSON.stringify()` 遍历

但是你可以通过 Object.getOwnPropertySymbols() + 访问器读取它们  

## Object.getOwnPropertyDescriptor(obj, prop)  

`Object.getOwnPropertyDescriptor(obj, prop)` 是一个非常强大的原生方法，用于精确获取某个属性的描述信息，包括：

- `value`

- `writable`

- `enumerable`

- `configurable`

- 或 `get` / `set`（如果是访问器属性）  

🔍 **语法**  

`Object.getOwnPropertyDescriptor(obj, prop)`  

- obj：要查询的对象

- prop：属性名（字符串或 Symbol）

- 返回：属性描述符对象，或 undefined（如果没有这个自有属性） 

🔶 **示例**  

:::details 示例 1：数据属性
```js
const obj = {
  name: 'Alice'
};

const desc = Object.getOwnPropertyDescriptor(obj, 'name');
console.log(desc);

// 输出：
/*
{
  value: 'Alice',
  writable: true,
  enumerable: true,
  configurable: true
}
*/

```
:::  

:::details 示例 2：不可枚举属性
```js
const obj = {};
Object.defineProperty(obj, 'secret', {
  value: 42,
  enumerable: false
});

console.log(Object.getOwnPropertyDescriptor(obj, 'secret'));
// 输出：
/*
{
  value: 42,
  writable: false,
  enumerable: false,
  configurable: false
}
*/

```
:::

:::details 示例 3：访问器属性（getter/setter）
```js
const obj = {
  get age() {
    return 18;
  },
  set age(val) {
    console.log('Setting age', val);
  }
};

console.log(Object.getOwnPropertyDescriptor(obj, 'age'));
// 输出：
/*
{
  get: [Function: get age],
  set: [Function: set age],
  enumerable: true,
  configurable: true
}
*/

```
:::  

**常见用途**  

| 用途                   | 示例                            |
| -------------------- | ----------------------------- |
| 判断属性是否可写             | `desc.writable === true`      |
| 判断是否为 getter/setter  | `'get' in desc`               |
| 精准复制属性（比如 deepClone） | 用于 `Object.defineProperty` 拷贝 |
| 判断是否不可枚举             | `desc.enumerable === false`   |
| 判断是否可删除              | `desc.configurable === true`  |


⚠️ **注意事项**  

- 只返回自有属性（不包括原型链）

- 如果属性不存在，返回 undefined  

:::details **与 `Object.defineProperty()` 配合使用**  

```js
const source = {};
Object.defineProperty(source, 'a', {
  value: 1,
  writable: false,
  enumerable: false,
  configurable: false
});

const clone = {};
const desc = Object.getOwnPropertyDescriptor(source, 'a');
Object.defineProperty(clone, 'a', desc);

console.log(clone.a); // 1

```  
:::

💡 **小结**  

| 描述符字段          | 类型                    | 说明                  |
| -------------- | --------------------- | ------------------- |
| `value`        | any                   | 普通值属性               |
| `writable`     | boolean               | 能否被修改               |
| `enumerable`   | boolean               | 能否被枚举（如 `for...in`） |
| `configurable` | boolean               | 能否被删除或修改属性描述        |
| `get`          | function \| undefined | getter 函数           |
| `set`          | function \| undefined | setter 函数           |



## Reflect.ownKeys(obj)  

`Reflect.ownKeys(obj)` 是 `JavaScript` 中 `Reflect API` 提供的一个方法，用来获取对象的 “所有自身属性键”，包括：

- ✅ 所有 字符串属性名

- ✅ 所有 Symbol 属性

- ✅ 包括 可枚举 和 不可枚举  

🔍 **语法**  

`Reflect.ownKeys(obj)`  

- 参数：任意对象

- 返回值：数组，包含该对象自身的所有属性键（字符串 + Symbol）  

🔶 **示例**  

```js
const sym = Symbol('secret');
const obj = {
  visible: 123,
  [sym]: 'hidden'
};

// 添加一个不可枚举的属性
Object.defineProperty(obj, 'invisible', {
  value: 456,
  enumerable: false
});

console.log(Reflect.ownKeys(obj));
// ['visible', 'invisible', Symbol(secret)]

```  

✅ **实用场景** 

- 获取对象所有属性（包括隐藏的）

- 框架/库源码中对数据结构完整性检查

- 深拷贝、序列化、自定义对象合并等工具函数开发

- 代替多个方法组合，如：

```js
// 相当于：
[
  ...Object.getOwnPropertyNames(obj),
  ...Object.getOwnPropertySymbols(obj)
]

```  

💡 **小结**  

| 特点 | 描述                   |
| -- | -------------------- |
| 全面 | 包含字符串 & Symbol 属性    |
| 精准 | 仅返回**对象自身属性**（不包括原型） |
| 灵活 | 包括不可枚举的属性            |



## Object.keys(obj)  

🔍 **语法**  

`Object.keys(obj)`

🔧 **作用**  

返回一个对象自身的可枚举属性名数组（即键名数组）

🔶 **示例**  

```js
const person = {
  name: 'Alice',
  age: 25,
  city: 'Beijing'
};

const keys = Object.keys(person);
console.log(keys); // ['name', 'age', 'city']

```

⚠️ **注意事项**
- 只返回对象自身的属性，不包含原型链上的属性。

- 返回的键名顺序与 for...in 遍历顺序一致，但更安全（不会包含继承属性）。


## Object.values(obj)   

🔍 **语法**  

`Object.values(obj)`

🔧 **作用**  

返回对象自身可枚举属性的值组成的数组。

🔶 **示例**  

```js
const person = {
  name: 'Alice',
  age: 25,
  city: 'Beijing'
};

const values = Object.values(person);
console.log(values); // ['Alice', 25, 'Beijing']

```  

⚠️ **注意事项**  

- 不包含继承属性（只包含自身属性）。

- 不包含符号（Symbol）键的属性。

- 返回的值顺序与对象属性定义顺序一致。


## Object.entries(obj)   

🔍 **语法**   

`Object.entries(obj)`  

🔧 **作用**  

将对象转换为一个二维数组，每一项都是该对象的 [key, value] 键值对。  

🔶 **示例**  

```js
const user = {
  name: 'Alice',
  age: 25,
  city: 'Beijing'
};

console.log(Object.entries(user));
// [
//   ['name', 'Alice'],
//   ['age', 25],
//   ['city', 'Beijing']
// ]
```

✅ **搭配 for...of 遍历对象：**  

```javascript
for (const [key, value] of Object.entries(user)) {
  console.log(`${key}: ${value}`);
}
```  

输出：  

```js
name: Alice
age: 25
city: Beijing
```  



## 笔记  

### for...in  

🔧 **作用**

用来遍历对象的可枚举属性   

🔶 **示例**  

```js
const obj = {
  name: "Alice",
  age: 25,
  city: "Beijing"
};

for (let key in obj) {
  console.log(key, obj[key]);
}
```  
⚠️ **注意事项**  

1. 遍历的是对象的键（属性名），而不是值。  

2. 会遍历 原型链上的可枚举属性，所以一般要配合 hasOwnProperty() 使用。  

3. for...in 来遍历数组，技术上是可以的，但不推荐。

```js
const arr = ['a', 'b', 'c'];

for (let index in arr) {
  console.log(index, arr[index]);
}
```  

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


### object.valueOf() 与 array.valueOf()

- object.valueOf() 在object有原始值时，为原始值，没有原始值时，是object自身

- array.valueOf() 是array自身