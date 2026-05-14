# 数据类型

Java 有两大类数据类型

- 基本数据类型（不是对象，可以通过包装类将它改造成对象）
- 引用数据类型 （对象，JDK 类库，开发者自定义类）

Java 开发中使用的对象共有三种来源

- JDK类库String Date Integer
- 第三方库 框架 Application SpringBootApplication DispatcherServlet
- 自定义类

基本数据类和引用数据类型的区别

- 基本数据类型直接将变量值存储在栈内存里

- 引用数据类型，栈内存里存的是`变量的值`在堆内存中的地址，堆内存里放的是变量的值

## 基本数据类型（Primitive Types）

数值类型： byte、short、int、long、float、double

非数值类型：char、boolean

| 类型      | 名称         | 占用空间            | 默认值   | 说明                       |
| --------- | ------------ | ------------------- | -------- | -------------------------- |
| `byte`    | 字节型       | 1字节（8位）        | 0        | 范围：-128 到 127          |
| `short`   | 短整型       | 2字节               | 0        | 范围：-32,768 到 32,767    |
| `int`     | 整型         | 4字节               | 0        | 常用整数类型               |
| `long`    | 长整型       | 8字节               | 0L       | 需加 `L` 后缀，例如 `100L` |
| `float`   | 单精度浮点型 | 4字节               | 0.0f     | 小数，需加 `f` 后缀        |
| `double`  | 双精度浮点型 | 8字节               | 0.0      | 默认小数类型               |
| `char`    | 字符型       | 2字节               | `\u0000` | 存储单个字符，支持 Unicode |
| `boolean` | 布尔型       | 1字节（虚拟机决定） | `false`  | 只有 `true` 和 `false`     |

## 引用数据类型（Reference Types）

| 类型               | 说明                               | 示例                                     |
| ------------------ | ---------------------------------- | ---------------------------------------- |
| 类（Class）        | 自定义类或 Java 内置类             | `String`, `Scanner`, `Random` 等         |
| 接口（Interface）  | 比如 `Runnable`, `List`            | `List<String> list = new ArrayList<>();` |
| 数组（Array）      | 一种容器类，存储多个相同类型的数据 | `int[] arr = new int[5];`                |
| 枚举（Enum）       | Java 5 引入的常量类型              | `enum Color { RED, GREEN, BLUE }`        |
| 注解（Annotation） | 元编程结构                         | `@Override`, `@Deprecated`               |

## 数据类型转换

- `String` 虽然常用，但是引用类型，不是基本类型。
- 基本类型对应的包装类（Wrapper Classes）：

| 基本类型  | 包装类      |
| --------- | ----------- |
| `int`     | `Integer`   |
| `boolean` | `Boolean`   |
| `char`    | `Character` |
| `byte`    | `Byte`      |
| `short`   | `Short`     |
| `long`    | `Long`      |
| `float`   | `Float`     |
| `double`  | `Double`    |

1. 基本数据类型的转换
   - 自动类型转换
   - 强制类型转换

     数据类型可以从小往大自动转换
     从大往小，会丢精度
     尽量不使用强制类型转换

   ```java
   double num = 10.5;
   int i = (int)num;
   ```

2. 引用数据类型转换
   - 自动类型转换
   - 强制类型转换

   > 两种转换必须有继承关系，没有继承关系的是不能转的

   > 自动类型转换，只能子类转父类
   > 子类转父类，子类的属性不是丢了，只是限制了访问  
   > 再转回子类，属性就能正常访问

   ```java
   public class Student extends Person {
   }

   public class Test {
    public static void main(String[] args) {
        Person p = new Person();
        Student s = new Student();
        p = s;//自动转换
        s = (Student) p;//强制转换
    }
   }

   ```

   > 接口和实现类也能进行自动类型转换，本质上也有继承关系
   > 接口不能强制类型转换，因为接口无法实例化

## 接口和抽象类的区别

- 关键字不同
- 抽象类可以包含非抽象方法，接口中全部是抽象方法
- 具体化方式不同，接口通过实现类，抽象类通过继承
- 抽象类单继承，接口多实现

抽象方法就是只定义了方法名，没定义具体实现

抽象类是半成品类，里边可以有抽象方法和非抽象方法
