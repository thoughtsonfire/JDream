# Java 面向对象

面向对象是一种编程思想

面向过程是一种编程思想

## 类和对象

对象是通过类创建的

类-》对象

类是对象的模板，对象是类的实例

编写的代码都是类，静态资源，程序真正运行时，JVM会加载类，运行类中的代码，从而产生对象

对象的存在是一种瞬时状态，程序执行期间对象存在，程序一旦结束，对象就不存在了,而类是一直存在的

类中包含两部分内容，用来描述是对象的特征：

- 静态特征
- 动态特征

静态特征在类中定义为属性

动态特征在类中定义为方法

```java
public class Person {
    //属性的定义包含三部分内容
    //访问权限修饰符、数据类型、属性名
    public int id;
    public String name;

    //方法定义包含五部分内容
    //访问权限修饰符、返回值类型、方法名、参数列表、方法体
    public void test(){
        System.out.println(123);
    }

    public void test2(){
        System.out.println(123);
        return;  //这里return 表示方法结束，不是返回啥
    }

    public int add(int a, int b){
        int c = a + b;
        return c;
    }
}
```

- `return` 是结束方法关键字

> 类是创建对象的，对象通过构造函数来创建，类中必须有至少一个构造函数，每个类都有一个默认的无参构造函数，但一旦在类中声明一个有参构造函数，默认的无参构造函数就会被覆盖而导致无法调用创建对象。

> 构造函数不需要返回值的定义，方法名必须和类名保持一致，可以有参数列表，构造函数访问权限修饰符。

> 输出对象的时候默认会调它的toString 方法，输出的是它的地址转的字符串，一般都会把这个方法重写，输出属性。`alt+insert`代码生成菜单。

> `@Override` 是 `Java` 里一个方法级别的注解，作用很简单但非常重要：  
> 👉 标记这个方法是“重写（override）父类或接口的方法”

## `this` 关键字

this 用来指代当前类的实体化对象，通过this可以调用当前类的属性和方法，比如有参构造中，通过this将外部传来的值赋值给当前实例化对象。

```java
    public Person(int id, String name){
        this.id = id;
        this.name = name;
    }
```

this 除了可以在类中访问属性也可以在类中调用方法，类中的方法分为两种：构造方法和普通方法

用this 调用这两类方法的语法也不同

- 调用构造函数：this(参数列表)
- 调用普通方法：this.方法名(参数列表)

不能再普通方法里使用this来调用构造函数

## 方法重载

方法重载是Java代码复用的一种重要方式，指的是两个方法之间的一种关系

- 在同一个类中
- 方法名相同
- 参数列表不同（个数或者数据类型不同）
- 与返回值和访问权限修饰符无关

```java
package basic;

public class Test5 {
    public static void main(String[] args) {
        Test5 test5 = new Test5();

        test5.method();
        test5.method(1);
    }

    public void method(){
        System.out.println("没有参数");
    }

    public void method(int id){
        System.out.println("id="+id);
    }
}
```

## 成员变量和局部变量

## 封装

保证数据安全

### static 关键字

java 入口的main函数就通过static修饰，static方法可以通过类直接调用，其他的要有对象才能调用，入口是没法有对象的

static 表示静态或者全局，可以用来修饰成员变量和成员方法以及代码块。

成员变量和成员方法，必须通过对象来访问，必须依赖对象

而使用static修饰的成员变量和成员方法独立于该类的任何一个实例对象，访问时不依赖于任何一个对象，可以直接通过类来访问

类-》对象-》方法

类-》方法

被static修饰的变量叫静态变量，被static修饰的方法叫静态方法

多个对象共享，内存中只有一份

```java
public class User {
    public static String name;
    public static void show() {
        System.out.println("不依赖于类的，静态方法");
    }
}

public class Test6 {
    public static void main(String[] args) {
        User.name="张三";
        System.out.println(User.name);
        User.show();
    }
}

//张三
//不依赖于类的，静态方法
```

```java
public class User {
    public static String name;
    public static void show() {
        System.out.println("user name is " + name);
    }
}

public class Test6 {
    public static void main(String[] args) {
       User user1 = new User();
       user1.name = "user1";
       user1.show();

       User user2 = new User();
       user2.name = "user2";
       user2.show();

       user1.show();
    }
}

// user name is user1
// user name is user2
// user name is user2
```

> 使用static修饰符的静态方法中不能使用this关键字，不能直接访问类的实例变量和实例方法，
> 可以访问类的静态变量和静态方法，
> 如果要访问实例变量和实例方法，必须先实例化该类的对象，通过对象访问

> static 还可以修饰代码块，被static修饰的代码块叫静态代码块
> 只执行一次，当类被加载到内存中的时候，会自动执行静态代码块，不需要手动调用。

```java
public class StaticCOdeGroup {
    public static int id;

    static {
        id++;
        System.out.println("执行静态代码块 static COdeGroup ID: " + id);
    }
}

public class Test7 {
    public static void main(String[] args) {
        StaticCOdeGroup staticCOdeGroup0 = new StaticCOdeGroup();
        StaticCOdeGroup staticCOdeGroup1 = new StaticCOdeGroup();
        StaticCOdeGroup staticCOdeGroup2 = new StaticCOdeGroup();

        System.out.println(staticCOdeGroup0.id);
        System.out.println(staticCOdeGroup1.id);
        System.out.println(staticCOdeGroup2.id);
    }
}

// 执行静态代码块 static COdeGroup ID: 1
// 1
// 1
// 1
```

> 静态代码块只执行一次，代码块每次创建对象都会执行，先执行静态代码块，再执行代码块

- 执行顺序

1. 调用父类静态代码块
2. 调用子类静态代码块
3. 执行父类代码块
4. 执行父类构造器
5. 执行子类代码块
6. 执行子类构造函数

- 先加载类，再创建对象，调用构造器之前，先调用代码块

## 继承

继承是Java代码复用的重要特征，子类可以直接继承父类全部非私有信息（属性、方法）

创建子类对象的时候，会默认先创建父类对象

### 子类访问父类

创建子类对象时，无论使用有参还是无参，默认是调父类的无参构造，创建父类对象

```java
public class Animal {

    public Animal() {
        System.out.println("调用Animal 无参构造");
    }

    public Animal(String name) {
        System.out.println("调用Animal 有参构造");
    }
}

public class Cat extends Animal {
    public Cat() {
        System.out.println("调用Cat 无参构造");
    }

    public Cat(String name){
        System.out.println("调用Cat 有参构造");
    }
}

public class Test8 {
    public static void main(String[] args) {
        Cat cat1 = new Cat();
        Cat cat2 = new Cat("cat");
    }
}

// 调用Animal 无参构造
// 调用Cat 无参构造
// 调用Animal 无参构造
// 调用Cat 有参构造

```

- 使用super关键字，先择父类的构造函数,super 必须在写在第一行，同时this 和 super 调用构造器不能同时出现

```java
public class Animal {

    public Animal() {
        System.out.println("调用Animal 无参构造");
    }

    public Animal(String name) {
        System.out.println("调用Animal 有参构造");
    }
}

public class Cat extends Animal {
    public Cat() {
        System.out.println("调用Cat 无参构造");
    }

    public Cat(String name){
        super(name);
        System.out.println("调用Cat 有参构造");
    }
}

public class Test8 {
    public static void main(String[] args) {
        Cat cat1 = new Cat();
        Cat cat2 = new Cat("cat");
    }
}

// 调用Animal 无参构造
// 调用Cat 无参构造
// 调用Animal 有参构造
// 调用Cat 有参构造
```

### 类访问权限

访问权限修饰

> 1.  private（私有）
>
> 只能在“当前类内部”访问。
>
> 常见用途
>
> 最常见：
>
> 属性私有化  
> 配合 getter/setter

> 2.  默认权限（不写）
>
> 也叫：
>
> - package-private
> - 包权限
>   只能：
>
> 当前类  
> 同一个 package 下的类
>
> 访问。
>
> 不同包不能访问。

> 3.  protected（受保护）
>
> 比默认权限更大一点。
>
> 可以：
>
> 同包访问  
> 不同包的子类访问

> 4.  public（公共）
>
> 所有地方都能访问。
> 一般：
>
> - 对外开放的方法
> - 工具类
> - API
> - 启动类
>
> 都会用 public

| 修饰符       | 同一个类 | 同一个包(package) | 不同包子类 | 不同包非子类 |
| ------------ | -------- | ----------------- | ---------- | ------------ |
| `private`    | ✅       | ❌                | ❌         | ❌           |
| 默认（不写） | ✅       | ✅                | ❌         | ❌           |
| `protected`  | ✅       | ✅                | ✅         | ❌           |
| `public`     | ✅       | ✅                | ✅         | ✅           |

### 方法重写

子类继承父类方法的基础上，对父类方法重新定义并覆盖的操作叫做方法重写。

方法重写的规则

- 父子类方法名相同
- 父子类的参数列表相同
- 子类方法的返回值和父类方法的返回值相同或是其子类
  - 子类方法的返回值和父类方法的返回值相同
  - 子类方法的返回值是父类方法的返回值的子类
- 子类方法的访问权限不能小于父类

重写是建立在继承的基础上的，方法重写的前提一定是子类先继承父类方法，才能进行重写，而private 修饰的父类方法子类无法继承，所以更不能进行重写。

### 方法重写和重载的区别

| 对比项         | 重写 Override | 重载 Overload |
| -------------- | ------------- | ------------- |
| 发生位置       | 子类与父类    | 同一个类里    |
| 方法名         | 必须相同      | 必须相同      |
| 参数列表       | 必须相同      | 必须不同      |
| 返回值         | 相同/协变     | 可以不同      |
| 权限修饰符     | 不能更严格    | 无要求        |
| 是否与继承有关 | ✅ 有关       | ❌ 无关       |
| 运行时期       | 运行时多态    | 编译时多态    |

## 多态

面向对象三大基本特征：封装、继承、多态。

Java:定义一个类，该类的实例化对象在不同的业务场景中根据不同的需求呈现出不同的业务逻辑

举例：买书，普通会员，和超级会员

```java
public class Member {
    public void buyBook(){
        System.out.println("父类会员买书");
    }
}

//----------继承、重写---------------------
public class OrdinaryMember extends Member{
    public void buyBook(){
        System.out.println("普通会员买书打九折");
    }
}

public class SuperMember extends Member {
    public void buyBook(){
        System.out.println("超级会员买书打六折");
    }
}

//-------------封装------------------
public class Cashier {

    private Member member;

    public Member getMember() {
        return member;
    }

    public void setMember(Member member) {
        this.member = member;
    }

    public void settlement(){
        System.out.println("开始结算");
        this.member.buyBook();
    }
}

//------------------多态--------------------------------
public class Test9 {
    public static void main(String[] args) {
        OrdinaryMember ordinaryMember = new OrdinaryMember();
        SuperMember superMember = new SuperMember();
        Cashier cashier = new Cashier();
        cashier.setMember(ordinaryMember);
        cashier.settlement();
    }
}

```

- 从效果上看，提高了程序的可扩展性
- 多态是一种编程思想，通过继承来实现

### 多态的使用

1. 定义方法时形参为父类，调用方法时传入的参数为子类对象。
2. 定义方法返回值的数据类为父类，调用方法时返回子类对象。

- 上述两种都是基于子类对象可以直接赋值给父类对象的，自动类型转换

## 抽象

方法必须存在，方法的具体实现没有意义

只定义方法，但是不做具体实现，抽象方法

抽象方法所在的类，必须是抽象类

关键字 `abstract`

```java
public abstract class Member {
    public abstract void buyBook();
}
```

抽象类不能实例化，只能实例化其子类

一旦某个类继承了一个抽象类，要么该类也被定义为抽象类，要么重写从父类中继承的抽象方法，让它有具体实现，不再是抽象方法

## 接口

接口是实际开发中使用频繁，非常重要的一种编程方式。面向接口编程，提高程序的扩展性，降低程序的耦合度，进行解耦

接口是对抽象类的一种升级，实现解耦

```java
public interface Equipment {
    public void work();
}

public class EquipmentA implements Equipment{
    public void work(){
        System.out.println("设备A运行，生产产品A");
    }
}

public class EquipmentB implements Equipment{
    public void work(){
        System.out.println("设备B运行，生产产品B");
    }
}

public class Factory {
    private Equipment equipment;

    public Equipment getEquipment() {
        return equipment;
    }

    public void setEquipment(Equipment equipment) {
        this.equipment = equipment;
    }

    public void work(){
        System.out.println("开始生产...");
        this.equipment.work();
    }
}

public class Test {
    public static void main(String[] args) {
        EquipmentA equipmentA = new EquipmentA();
        EquipmentB equipmentB = new EquipmentB();
        Factory factory = new Factory();
        factory.setEquipment(equipmentB);
        factory.work();
    }
}

```

## 抽象类和接口的区别

1. 抽象类中的方法可以有方法体，就是能实现方法的具体功能，但是接口中的方法不行。
2. 抽象类中的成员变量可以是各种类型的，而接口中的成员变量只能是 public static final 类型的。
3. 接口中不能含有静态代码块以及静态方法(用 static 修饰的方法)，而抽象类是可以有静态代码块和静态方法。
4. 一个类只能继承一个抽象类，而一个类却可以实现多个接口。

## Object 类

Object 是Java中全部类的共同父类，实现代码复用

Object中定义了一些所有类都需要使用到的方法，所有类直接继承使用

在具体业务场景中，子类也可以对从父类继承来的方法进行重写，以匹配当前的业务需求

| 方法                              | 描述                                   |
| :-------------------------------- | :------------------------------------- |
| public String toString()          | 以字符串的形式返回该类的实例化对象信息 |
| public boolean equals(Object obj) | 判断两个对象是否相等                   |
| public native int hashCode()      | 返回对象的散列码                       |

### Object 方法重写

1. toString

以字符串的形式返回该类的实例化对象信息

```java
    public String toString() {
        return getClass().getName() + "@" + Integer.toHexString(hashCode());
    }
```

2. equals

判断两个对象是否相等

```java
    public boolean equals(Object obj) {
        return (this == obj);
    }
```

重写

```java
    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return age == user.age && Objects.equals(name, user.name);
    }

    //getClass() != o.getClass() 运行时判断
    //在编译器眼里 o永远还是：Object 不会自动推断为User,没有那些属性
    //所以必须：User user = (User) o;

    //Objects.equals(name, user.name);这个是后续调用String的equals它自己重写了，比较的值
```

3. hashCode

```java
public native int hashCode();
```

`native` 修饰的本地方法，java无法实现功能，由其他语言（C++）来实现，java只需要负责调用。

hashCode 包含内存地址、对象的属性值、类的信息，混合在一起，映射出来的一个整形数值

hashCode 和equals需要配合使用，都是用来判断两个对象是否相等

hashCode 效率更高，如果两个对象的hashCode不相等，则这两个对象肯定不相等，但是如果两个对象的hashCode相等，不能说明两个对象肯定相等，此时就需要equals进一步验证

重写 equals是判断内容，hashCode 就也判断内容，equals是判断是否是同一个对象，hashCode 就也要判断是否是同一个对象，要保持作用一致。

先用效率高的方法来判断，如果能得到结果，则直接返回，如果无法得到结果，再用效率低的方法进行验证

集合框架中使用

元素唯一

## 包装类

| 基本类型  | 包装类      |
| --------- | ----------- |
| `byte`    | `Byte`      |
| `short`   | `Short`     |
| `int`     | `Integer`   |
| `long`    | `Long`      |
| `float`   | `Float`     |
| `double`  | `Double`    |
| `char`    | `Character` |
| `boolean` | `Boolean`   |

包装类全部存放在javal.lang 包中

一级父类： Object

二级父类： Character、Number、Boolean

Number的子类：Byte、Short、Integer、Long、Float、Double

装箱：将基本数据类转化为包装类

拆箱：将包装类对象转化为基本数据类型

### 包装类和基础类的自动转化

| 场景           | 会不会自动转换 |
| -------------- | -------------- |
| 赋值           | 会             |
| 参数传递       | 会             |
| 返回值         | 会             |
| 运算           | 会             |
| 反射 getMethod | 不会           |
| Class 比较     | 不会           |
| 泛型           | 不会           |
| instanceof     | 不会           |

## 异常

### 什么是异常

Java中的错误可以分为两类：

- 编译时错误，一般指语法错误
- 运行时错误，语法没问题，可以通过编译，但运行时报错

Java专门提供了一组类，来表示各种各样的运行时错误

- ArithmeticException:表示数学异常

```java
System.out.println(10/0);
```

- ClassNotFoundException:类未定义异常

```java
  System.out.println(Class.forName("Test1000"));
```

- IllegalArgumentException:参数格式异常

```java
package exception;

import java.lang.reflect.Method;

public class Test3 {
    public static void main(String[] args) throws Exception {
        Class<?> test = Class.forName("exception.Test3");
        Method method = test.getMethod("test", Integer.class);
        method.invoke( new Test3(), "1");
    }
    public void test(Integer a){
        System.out.println(a);
    }
}
```

- ArrayIndexOutOfBoundsException：数组下标越界异常

```java
    int arr [] = {1,2,3};
    System.out.println(arr[3]);
```

- NullPointerException:空指针异常

```java
    Integer num = null;
    System.out.println(num.equals(1));
```

- NoSuchMethodException:方法未定义异常

```java
package exception;
import java.lang.reflect.Method;

public class Test2 {
    public static void main(String[] args) throws Exception {
        Class<?> test = Class.forName("exception.Test2");
        Method method = test.getMethod("test2", Integer.class);
        System.out.println(method);
    }
}
```

- NumberFormatException:将其他数据类型转化为数值类型的不匹配异常

```java
Integer num = new Integer("abc");
```

### 异常使用

try-catch

try:监听可能会抛出异常的代码，一旦出现错误，JDK会自动创建一个错误对应的异常对象，抛出该异常对象。

catch:用来捕获JDK创建的异常对象，进行后续处理

```java
try{

}catch(Exception e){

}

//e.printStackTrace() 可以查看错误的调用链
```

```java
public class Test7 {
    public static void main(String[] args) {
        Integer num = test();
        System.out.println(num);
    }

    public static Integer test() {
        try {
            System.out.println("try");
            return 10;
        }finally {
            System.out.println("finally");
            return 20;
        }
    }
}
// try
// finally
// 20


//finally 里边的代码一定会执行，即使前面有中断
//这里finally里的return 覆盖率try里边的
```

### throw 和 throws

throw 和 throws 是Java 在处理异常时使用的两个关键字，都是用来抛出异常的，但是使用方式和表示的含义完全不同。

Java中抛出异常的方式有3种：

- try-catch 是一种防范机制，代码可能会出现异常，如果抛出异常则捕获，补抛出异常则成句继续执行

- throw 是开发这主动窗机一个错误对象，并抛出

- throws 是标注方法，用来描述该方法可能会抛出的异常

通过throws声明的方法，在调用的时候必须强制使用try-catch进行代码处理，或者再往上抛

### 自定义异常

定义一个方法，对传入的参数进行++ 操作并返回结果，同时要求参数必须是整数类型的，如果传入的参数不是整数类型，则抛出自定义异常

自定义的类继承Exception,就成为了一个异常类

```java
public class NumberException extends Exception {
    public NumberException(String message) {
        super(message);
    }
}
```

```java
public class Test8 {
    public static void main(String[] args) {
        try{
            int i = test("aaa");
            System.out.println(i);
        }catch(Exception e){
            e.printStackTrace();
        }
    }
    public static Integer test(Object obj) throws NumberException {
        if(!(obj instanceof Integer)){
            throw new NumberException("参数类型不为Integer");
        }
        Integer i = (Integer)obj;
        return ++i;
    }
}

// exception.NumberException: 参数类型不为Integer
// 	at exception.Test8.test(Test8.java:14)
// 	at exception.Test8.main(Test8.java:6)
```
