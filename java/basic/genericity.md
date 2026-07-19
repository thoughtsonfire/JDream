# 泛型

泛型是指在类定义时不指定类中信息的具体数据类型，而是用一个标识符来替代，当外部实例化对象的时候再来指定具体的数据类。

多态的思想

```java
public class Time<T> {
    private T value;

    public T getValue() {
        return value;
    }

    public void setValue(T value) {
        this.value = value;
    }

    public Time(T value) {
        this.value = value;
    }
}
```

```java
public class TimeTest {
    public static void main(String[] args) {
        Time<Integer> time = new Time<Integer>(10);
        System.out.println(time.getValue());
        Time<String> time1 = new Time<String>("十点");
        System.out.println(time1.getValue());
    }
}
```

- 多个泛型参数

```java
public class Time1<H,M,S> {
    private H h;
    private M m;
    private S s;

    public H getH() {
        return h;
    }

    public void setH(H h) {
        this.h = h;
    }

    public M getM() {
        return m;
    }

    public void setM(M m) {
        this.m = m;
    }

    public S getS() {
        return s;
    }

    public void setS(S s) {
        this.s = s;
    }

    public Time1(H h, M m, S s) {
        this.h = h;
        this.m = m;
        this.s = s;
    }

    @Override
    public String toString() {
        return "Time1{" +
                "h=" + h +
                ", m=" + m +
                ", s=" + s +
                '}';
    }
}
```

```java
public class Time1Test {
    public static void main(String[] args) {
        Time1<String,Integer,Float> time = new Time1<String, Integer, Float>("10",20,30f);
        System.out.println(time);
    }
}
```
