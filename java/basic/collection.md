# 集合框架

什么是集合？

多个对象，个数未知，类型未知

集合可以简单理解为一个长度可以改变，可以保存任意数据类型的动态数组。

在Java中，集合不是由一个类来完成的，而是由一组接口和类共同构成的一个框架体系。

大致可以分为3层：

最上层是一组接口，

继而是接口的实现类，

接下来是对集合各种操作的工具类。

| 接口         | 描述                                                                                 |
| :----------- | :----------------------------------------------------------------------------------- |
| Collection   | 集合框架最基础的接口，一个Collection存储一组无序，不唯一的对象，一般不直接使用该接口 |
| List         | Collection的子接口，存储一组有序、不唯一的对象，开发中常用的接口之一                 |
| Map          | 独立于Collection的另外一个接口，存储一组键值对象，提供键到值的映射                   |
| Iterator     | 专用来输出集合元素的接口，一般适用于无需集合，从前向后单向输出元素                   |
| ListIterator | Iterator的子接口，可以双向输出集合中的元素                                           |
| Enumeration  | 传统的输出接口，已经被Iterator所取代                                                 |
| SortedSet    | Set的子接口，可以对集合中的元素进行排序                                              |
| SortedMap    | Map的子接口，可以对集合中的键值元素进行排序                                          |
| Queue        | 队列接口，此接口的实现类可以实现队列操作                                             |
| Map.Entry    | Map的内部接口，描述Map中的一个键值对元素                                             |

## Collection 接口

Collection 是集合框架中最基础的父接口，可以存储一组无序、不唯一的对象。

继承Iterable接口，Iterable 专门用来迭代，把集合中的元素全都取出来

Collection 中的所有元素可以通过Iterator 进行迭代（List、Set）

| 方法                                | 描述                                 |
| :---------------------------------- | :----------------------------------- |
| `int size()`                        | 获取集合长度                         |
| `boolean isEmpty()`                 | 判断集合是否为空                     |
| `boolean contains(Object o)`        | 判断集合中是否包含某个元素           |
| `Iterator<E> iterator()`            | 实例化Iterator 接口，遍历集合        |
| `Object[] toArray()`                | 将集合转化为一个Object类型的对象数组 |
| `boolean add(E e)`                  | 向集合中添加元素                     |
| `boolean remove(Object o)`          | 从集合中移除元素                     |
| `boolean containsAll(Collection c)` | 判断集合中是否存在某个集合的所有元素 |
| `boolean addAll(Collection c)`      | 向集合中添加某个集合的所有元素       |
| `boolean removeAll(Collection c)`   | 从集合中移除满足条件的另一个集合     |
| `void clear()`                      | 清空集合                             |
| `boolean equals(Object o)`          | 比较两个集合是否相等                 |
| `int hashCode()`                    | 获取集合对象的散列值                 |

## Collection 的子接口

使用其子接口

- `List`: 存放有序、不唯一的元素
- `Set`: 存放无序、唯一的元素
- `Queue`: 队列接口

## List 接口

List 接口在继承Collection 接口的基础上进行了扩展，常用的扩展方法

| 方法                          | 描述                             |
| :---------------------------- | :------------------------------- |
| E get(int index)              | 通过下标获取集合中指定位置的元素 |
| E set(int index,E element)    | 替换集合指定位置的元素           |
| void add(int index,E element) | 向集合中指定位置添加元素         |
| E remove(int index)           | 通过下标删除集合中指定位置的元素 |

## List 接口的实现类

### ArrayList

ArrayList 实现了长度可变的数组

优点：查找快，因为元素都是连续的，可以快速求出下标从而取出元素

缺点：增删慢，因为元素都是连续的，添加一个元素，就必须先将后续的元素依次后移一位，再把新元素加入，删除同理

```java
public String toString() {
    Iterator<E> it = iterator();
    if (! it.hasNext())
        return "[]";

    StringBuilder sb = new StringBuilder();
    sb.append('[');
    for (;;) {
        E e = it.next();
        sb.append(e == this ? "(this Collection)" : e);
        if (! it.hasNext())
            return sb.append(']').toString();
        sb.append(',').append(' ');
    }
}
```

ArrayList 常用方法

```java
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class ArrayListTest {
    public static void main(String[] args) {
        ArrayList list = new ArrayList();
        list.add("Hello");
        list.add("World");
        list.add("JavaSE");
        list.add("JavaME");
        list.add("JavaEE");
        System.out.println(list.toString());
        System.out.println(list.size());
        System.out.println(list.contains("Java"));
        Iterator it = list.iterator();
        while (it.hasNext()) {
            Object o = it.next();
            System.out.println(o);
        }
        System.out.println("********************");
        for (int i = 0; i < list.size(); i++) {
            System.out.println(list.get(i));
        }
        list.remove(0);
        System.out.println(list);
        list.remove("JavaSE");
        System.out.println(list);
        list.add("Java");
        System.out.println(list);
        list.add(1, "Java");
        System.out.println(list);
        list.set(1, "Ja");
        System.out.println(list);
        System.out.println(list.indexOf("Java")); //拿到第一个“Java” 的下标
        List list1 = list.subList(1, 3);
        System.out.println(list1);
    }
}
```

### LinkedList

LinkedList 采用链表的形式来存储数据，和ArrayList恰好相反

优点：增删快
缺点：查询慢

```java
import java.util.LinkedList;

public class LinkedListTest {
    public static void main(String[] args) {
        LinkedList<String> list = new LinkedList<String>();
        list.add("Hello");
        list.add("World");
        list.add("Java");
        System.out.println(list);
        list.offer("JavaSE");
        System.out.println(list);
        list.offerFirst("Java");
        System.out.println(list);
        list.push("JavaEE");
        System.out.println(list);
        list.addFirst("JavaME");
        System.out.println(list);
        System.out.println(list.peekFirst());
        System.out.println(list);
        System.out.println(list.peekLast());
        System.out.println(list);
        System.out.println(list.pollFirst());
        System.out.println(list);
        System.out.println(list.pollLast());
        System.out.println(list);
    }
}
```

## Set 接口

Set 接口是Collection的子接口，Set 接口以散列的形式存储数据。所以元素是无序的，可以存储一组无序且唯一的对象

## Set 接口的实现类

### HashSet

HashSet 存储一组无序且唯一的元素，这里的无序是指元素的存储顺序和遍历顺序不一致。

```java
import java.util.HashSet;
import java.util.Iterator;

public class HashSetTest {
    public static void main(String[] args) {
        HashSet set = new HashSet();
        set.add("Hello");
        set.add("World");
        set.add("Java");
        set.add("Hello");
        System.out.println(set.size());
        Iterator it = set.iterator();
        while (it.hasNext()) {
            System.out.println(it.next());
        }
        set.remove("Hello");
        Iterator it2 = set.iterator();
        while (it2.hasNext()) {
            System.out.println(it2.next());
        }
    }
}
```

### LinkedHashSet

LinkedHashSet 是 Set 的另外一个子接口，可以存储一组有序且唯一的元素，这里的有序是指元素的存储顺序和遍历顺序是一致的。

LinkedHashSet 判断对象是否唯一，是根据对象的equals方法的，可以重写equals方法

```java
package _collection;

import java.util.Iterator;
import java.util.LinkedHashSet;
import java.util.Objects;

public class LinkedHashSetTest {
    public static void main(String[] args) {
        LinkedHashSet set = new LinkedHashSet();
        set.add("Hello");
        set.add("World");
        set.add("Java");
        set.add("Hello");
        System.out.println(set.size());
        Iterator it = set.iterator();
        while (it.hasNext()) {
            System.out.println(it.next());
        }
        set.remove("Hello");
        Iterator it2 = set.iterator();
        while (it2.hasNext()) {
            System.out.println(it2.next());
        }
        System.out.println(set);
        set.add(new A("jack"));
        set.add(new A("jack"));
        Iterator it3 = set.iterator();
        while (it3.hasNext()) {
            System.out.println(it3.next());
        }
    }
}

class A {
    private String name;

    public A(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        A a = (A) o;
        return Objects.equals(name, a.name);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(name);
    }

    @Override
    public String toString() {
        return "A{" +
                "name='" + name + '\'' +
                '}';
    }
}

```

### TreeSet

TreeSet 存储一组有序、唯一的元素，TreeSet的有序和LinkedHashSet的有序不一样。

LinkedHashSet 的有序是指元素的存储顺序和遍历顺序一致，TreeSet 的有序是指集合内部会自动给所有的元素按升序进行排序。

TreeSet 可以根据对象的compareTo方法调整升降

```java
import java.util.Iterator;
import java.util.Objects;
import java.util.TreeSet;

public class TreeSetTest {
    public static void main(String[] args) {
        TreeSet set = new TreeSet();
        set.add(1);
        set.add(2);
        set.add(6);
        set.add(5);
        set.add(1);
        set.add(3);
        set.add(4);
        System.out.println(set);
        Iterator it = set.iterator();
        while (it.hasNext()) {
            System.out.println(it.next());
        }
        set.remove(3);
        System.out.println(set);

        TreeSet set2 = new TreeSet();
        set2.add(new B(1));
        set2.add(new B(2));
        set2.add(new B(5));
        set2.add(new B(3));
        set2.add(new B(4));
        set2.add(new B(1));
        System.out.println(set2);
    }
}

class B implements Comparable<B> {
    private Integer num;

    public B(Integer num) {
        this.num = num;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        B a = (B) o;
        return Objects.equals(num, a.num);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(num);
    }

    @Override
    public String toString() {
        return "A{" +
                "num=" + num +
                '}';
    }

    /**
     * a.compareTo(b)
     * 1表示A大于b
     * 0表示相等
     * -1表示a小于b
     * @param o the object to be compared.
     * @return
     */
    @Override
    public int compareTo(B o) {
        B a = (B) o;
        if(this.num>a.num){
            return 1;
        }
        else if(this.num<a.num){
            return -1;
        }
        return 0;
    }
}
```

## Map 接口

Map接口是与Collection 接口完全独立的另一个体系。

区别在于Set、List、Collection 只能操作单个元素，Map 可以操作一对元素，Map 中的元素都是以key-value 的形式进行存储的。

| 方法                                | 描述                           |
| :---------------------------------- | :----------------------------- |
| int size()                          | 获取集合长度                   |
| boolean isEmpty()                   | 判断集合是否为空               |
| boolean containsKey(Object key)     | 判断集合中是否存在key          |
| boolean containsValue(Object value) | 判断集合中是否存在value        |
| V get(Object key)                   | 通过key取出对应的value         |
| V put(Object key,Object value)      | 向集合中添加一组key-value      |
| V remove(Object key)                | 通过key删除集合元素            |
| void clear()                        | 清空集合                       |
| Set keySet()                        | 取出所有key，返回Set           |
| Collection values()                 | 取出所有的value,返回Collection |
| Set entrySet()                      | 将Map转换成Set对象             |
| int hashCode()                      | 获取集合的散列码               |
| boolean equals(Object o)            | 比较两个集合是否相等           |
