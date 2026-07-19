# 反射

通过一个实例化对象映射到类，在程序运行期间就可以获取到类的信息，进行相关操作。

## Class 类

Class类 是反射的基础

用一个对象来表示某个类的信息，通过Class类来创建

Class是专门用来描述其他类的类，每一个Class对象都是对某个类的具体描述

创建Class对象：

1. 调用forName方法

2. 通过目标类的类字面量获取

3. 通过目标类的实例化对象获取

```java
public class ClassTest {
    public static void main(String[] args) throws Exception {

        //forName
        Class class1 = Class.forName("_Reflection.User");// 包下的要带包名，全限定类名
        System.out.println(class1);

        //类字面量
        Class<User> class2 = User.class;
        System.out.println(class2);

        //实例化对象
        User user = new User(1,"张三");
        Class class3 = user.getClass();
        System.out.println(class3);

        System.out.println(class1 == class2);
        System.out.println(class1 == class3);
    }
}
```

上述3种方式获取的Class 对象都是同一个，因为每个类在内存中只有一份，对应的对象也就只有一份，不是指由它创建出来的实例化对象，而是描述类的内部结构的对象。

| 方法                                                      | 描述                                                     |
| :-------------------------------------------------------- | :------------------------------------------------------- |
| public boolean isInterface()                              | 判断类是否为接口                                         |
| public boolean isArray()                                  | 判断类是否为数组                                         |
| public boolean isAnnotation()                             | 判断类是否为注解                                         |
| public String getName()                                   | 获取类名                                                 |
| public ClassLoader getClassLoader()                       | 获取类加载器                                             |
| public Class getSuperclass()                              | 获取类的父类                                             |
| public Package getPackage()                               | 获取类所在的包                                           |
| public String getPackage().getName()                      | 获取类所在的包名                                         |
| public Class[] getInterfaces()                            | 获取类的接口                                             |
| public int getModifiers()                                 | 获取类的访问权限修饰符                                   |
| public Field[] getFields()                                | 获取类的全部公有成员变量，包括继承父类和自定义的         |
| public Field[] getDeclaredFields()                        | 获取类的自定义成员变量                                   |
| public Field getField(String name)                        | 通过名称获取类的成员变量，包括继承父类和自定义的         |
| public Field getDeclaredField(String name)                | 通过名称获取类的自定义成员变量                           |
| public Field getField(String name)                        | 通过名称获取类的成员变量，包括继承父类和自定义的         |
| public Field getDeclaredField(String name)                | 通过名称获取类的自定义成员变量                           |
| public Method[] getMethods()                              | 获取类的全部共有方法，包括继承父类和自定义的             |
| public Method[] getDeclaredMethods()                      | 获取类的自定义方法                                       |
| public Method getMethod(String name,Class... pars)        | 通过名称和参数信息获取类的共有方法，包括继承的和自定义的 |
| public Method getDeclareMethod(String name,Class... pars) | 通过名称和参数获取类的自定义方法                         |
| public Constructor[] getConstructors()                    | 获取类的全部公有构造器                                   |
| public Constructor[] getDeclaredConstructors()            | 获取类的全部构造器                                       |
| public Constructor getConstructor(Class... pars)          | 通过参数信息获取类的公有构造器                           |
| public Constructor getDeclaredConstructor(Class... pars)  | 通过参数信息获取类的构造器                               |

:::code-group

```java [User]
import java.io.Serializable;

public class User implements Serializable, Comparable,Cloneable {
    private Integer id;
    private String name;

    public User(Integer id, String name) {
        this.id = id;
        this.name = name;
    }

    @Override
    public int compareTo(Object o) {
        return 0;
    }
}
```

```java [Animal]
public interface Animal {
    public void eat();
}
```

```java [Zoolgy]
public class Zoolgy {
    private Integer id;
    private String name;
    public String character;
}
```

```java [Cat]
import java.util.Date;

public class Cat extends Zoolgy implements Animal{

    public Integer age;
    public String color;
    private Date birthday;

    @Override
    public void eat() {

    }
    public void eat(String food) {

    }

    private int drink(){
        return 0;
    }

    private int drink(int num){
        return num;
    }

    public String play(){
        return "玩";
    }

    public Cat(Integer age, String color, Date birthday) {
        this.age = age;
        this.color = color;
        this.birthday = birthday;
    }

    private Cat(Integer age){
        this.age = age;
    }
}
```

:::

```java
public class ClassTest1 {
    public static void main(String[] args) throws Exception {
        Class class1 = Class.forName("_Reflection.User");
        Class class2 = Class.forName("_Reflection.Animal");

        boolean anInterface1 = class1.isInterface();
        boolean anInterface2 = class2.isInterface();
        System.out.println(anInterface1);
        System.out.println(anInterface2);
        System.out.println("************************************");

        boolean annotation1 = class1.isAnnotation();
        boolean annotation2 = class2.isAnnotation();
        Class<Override> overrideClass = Override.class;
        boolean annotation3 = overrideClass.isAnnotation();
        System.out.println(annotation1);
        System.out.println(annotation2);
        System.out.println(annotation3);
        System.out.println("************************************");

        String name1 = class1.getName();
        String name2 = class2.getName();
        System.out.println(name1);
        System.out.println(name2);
        System.out.println("************************************");

        ClassLoader classLoader1 = class1.getClassLoader();
        ClassLoader classLoader2 = class2.getClassLoader();
        System.out.println(classLoader1);
        System.out.println(classLoader2);
        System.out.println("************************************");

        Class superclass1 = class1.getSuperclass();
        Class superclass2 = class2.getSuperclass();
        System.out.println(superclass1);
        System.out.println(superclass2);
        System.out.println("************************************");

        Package aPackage1 = class1.getPackage();
        Package aPackage2 = class2.getPackage();
        System.out.println(aPackage1);
        System.out.println(aPackage2);
        System.out.println("************************************");

        String packageName1 = class1.getPackage().getName();
        String packageName2 = class2.getPackage().getName();
        System.out.println(packageName1);
        System.out.println(packageName2);
        System.out.println("************************************");

        Class[] interfaces1 = class1.getInterfaces();
        Class[] interfaces2 = class2.getInterfaces();
        for (Class aClass : interfaces1) {
            System.out.println(aClass);
        }
        for (Class aClass : interfaces2) {
            System.out.println(aClass);
        }
        System.out.println("************************************");

        int modifiers1 = class1.getModifiers();
        int modifiers2 = class2.getModifiers();
        System.out.println(modifiers1);
        System.out.println(modifiers2);
        System.out.println("************************************");

    }
}
```

```java
import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.Date;

public class ClassTest2 {
    public static void main(String[] args) throws Exception {
        Class<?> aClass = Class.forName("_Reflection.Cat");

        System.out.println("********************获取所有公有属性*************************");
        Field[] fields = aClass.getFields();
        for (Field field : fields) {
            System.out.println(field.getName());
        }

        System.out.println("*********************获取所有自定义属性**************************************");
        Field[] declaredFields = aClass.getDeclaredFields();
        for (Field field : declaredFields) {
            System.out.println(field.getName());
        }

        System.out.println("*************************根据名字获取公有属性**************************************");
        System.out.println(aClass.getField("character"));

        System.out.println("*************************根据名字获取自定义的属性**************************************");
        System.out.println(aClass.getDeclaredField("birthday"));

        System.out.println("*************************获取全部公有方法**************************************");
        Method[] methods = aClass.getMethods();
        for (Method method : methods) {
            System.out.println(method);
        }

        System.out.println("*************************获取自定义所有方法**************************************");
        Method[] declaredMethods = aClass.getDeclaredMethods();
        for (Method method : declaredMethods) {
            System.out.println(method);
        }

        System.out.println("*************************通过方法名获取公有方法**************************************");
        System.out.println(aClass.getMethod("toString"));
        System.out.println(aClass.getMethod("eat"));
        System.out.println(aClass.getMethod("eat", String.class));

        System.out.println("*************************通过方法名获取自定义方法**************************************");
        System.out.println(aClass.getDeclaredMethod("drink"));
        System.out.println(aClass.getDeclaredMethod("drink", int.class));

        System.out.println("*************************获取公有构造器**************************************");
        Constructor<?>[] constructors = aClass.getConstructors();
        for (Constructor<?> constructor : constructors) {
            System.out.println(constructor);
        }

        System.out.println("*************************获取全部自定义构造器**************************************");
        Constructor<?>[] declaredConstructors = aClass.getDeclaredConstructors();
        for (Constructor<?> constructor : declaredConstructors) {
            System.out.println(constructor);
        }

        System.out.println("*************************根据参数获取公有构造器**************************************");
        Constructor<?> constructor = aClass.getConstructor(Integer.class, String.class, Date.class);
        System.out.println(constructor);

        System.out.println("*************************根据参数获取构造器**************************************");
        Constructor<?> declaredConstructor = aClass.getDeclaredConstructor(Integer.class);
        System.out.println(declaredConstructor);

    }
}
```

## 反射的应用

### 通过反射来调用方法

```java
import java.lang.reflect.Method;

public class ReflectionTest {
    public static void main(String[] args) throws Exception {
        Student student = new Student();
        student.setId(1);
        student.setName("张三");

        //常规调用
        student.show();

        //反射调用
        Class<Student> studentClass = Student.class;
        Method show = studentClass.getMethod("show");
        show.invoke(student,null);// 第一个参数是实例化对象，null可以不传，是方法的参数
    }
}
//这里只是演示，这种写法没什么意义，反射不是为了替代普通的方法调用，而是为了解决运行时才知道类、方法、字段是什么的问题。
```

### 反射访问成员变量
