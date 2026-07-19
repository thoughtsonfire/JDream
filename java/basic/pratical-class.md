# 实用类

## 枚举

Enum 是一种由确定取值区间的数据类型，本质上是一种类，具有简洁、高效、安全、方便等特点

枚举的值被约束到一个特定的范围，只能从该范围中取值

某个类的对象取值范围是确定的，预先创建好一部分对象，使用的时候从这个范围中取值即可，可以使用枚举进行简化

```java
public enum WeekEnum {
    MONDAY,TUESDAY,WEDNESDAY,THURSDAY,FRIDAY,SATURDAY,SUNDAY;
}
```

```java
public class WeekEnumTest {
    public static void main(String[] args) {
        System.out.println(WeekEnum.MONDAY);
    }
}
```

```java
public enum WeekEnum1 {
    MONDAY(0,"周一"),
    TUESDAY(1,"周二"),
    WEDNESDAY(2,"周三"),
    THURSDAY(3,"周四"),
    FRIDAY(4,"周五"),
    SATURDAY(5,"周六"),
    SUNDAY(6,"周天")
    ;
    private Integer code;
    private String desc;

    WeekEnum1(Integer code, String desc) {
        this.code = code;
        this.desc = desc;
    }

    public Integer getCode() {
        return code;
    }

    public String getDesc() {
        return desc;
    }

}
```

## Math

```java
public class MathTest {
    public static void main(String[] args) {
        System.out.println(Math.E);
        System.out.println(Math.PI);
        System.out.println(Math.sqrt(9));//开平方
        System.out.println(Math.cbrt(8));//开立方
        System.out.println(Math.pow(2, 3));//次方
        System.out.println(Math.min(1, 3));
        System.out.println(Math.max(3, 10));
        System.out.println(Math.abs(-10.56));//绝对值
        System.out.println(Math.ceil(10.1));//向上取整
        System.out.println(Math.floor(10.6));//向下取整
        System.out.println(Math.random());//随机数0~1
        System.out.println(Math.round(4.5));//四舍五入
    }
}
```

## Random

Random 是用来产生一个随机数的，可以指定任意区间。

| 方法                         | 描述                       |
| :--------------------------- | :------------------------- |
| public Random()              | 创建一个无参的随机数构造器 |
| public Random(long seed)     | 使用long数据创建一个随机数 |
| public boolean nextBoolean() | 创建一个随机的boolean值    |
| public double nextDouble()   | 创建一个随机的double值     |
| public float nextFloat()     | 创建一个随机的float值      |
| public int nextInt()         | 创建一个随机的int值        |
| public long nextLong()       | 创建一个随机的long值       |

```java
import java.util.Random;

public class RandomTest {
    public static void main(String[] args) {
        Random random = new Random();
        for (int i = 0; i < 3; i++) {
            System.out.println(random.nextInt());
            System.out.println(random.nextBoolean());
            System.out.println(random.nextDouble());
            System.out.println(random.nextFloat());
            System.out.println(random.nextInt(10));
            System.out.println("-------------------------------");
        }
    }
}
```

## StringBuffer

String 的底层是用数组来存值的，数组长度不可变

StringBuffer 和String 类似，底层也是一个数组，但是是一个可扩容的动态数组

StringBuffer 默认的数组长度为16

| 方法                                          | 描述                      |
| :-------------------------------------------- | :------------------------ |
| public StringBuffer()                         | 创建一个空的StringBuffer  |
| public StringBuffer(String str)               | 创建一个str的StringBuffer |
| public int length()                           | 获取长度                  |
| public StringBuffer append(String str)        | 追加字符串                |
| public StringBuffer delete(int start,int end) | 删除指定区间内的字符串    |

```java
public class StringBufferTest {
    public static void main(String[] args) {
        StringBuffer sb = new StringBuffer("Hello World");
        StringBuffer java = sb.append(" Java");
        System.out.println(java);
        StringBuffer delete = sb.delete(3, 6);
        System.out.println(delete);
        StringBuffer reverse = sb.reverse();
        System.out.println(reverse);
        StringBuffer insert = sb.insert(5, " ");
        System.out.println(insert);
    }
}
//修改了原字符串
```

## 日期类

### Data

| 标记 | 描述                                    |
| :--- | :-------------------------------------- |
| y    | 年，yyyy表示4位数的年份信息             |
| M    | 月，MM表示2位数的月份信息               |
| d    | 天，表示2位数的天信息                   |
| H    | 小时，HH表示2位数的24小时制下的小时信息 |
| h    | 小时，hh表示2位数的12小时制下的小时信息 |
| m    | 分钟，mm表示2位数的分钟信息             |
| s    | 秒，ss表示2位数的秒信息                 |

```java
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateTest {
    public static void main(String[] args) {
        Date date = new Date();
        System.out.println(date);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String format = sdf.format(date);
        System.out.println(format);
    }
}
```

### Calendar

| 常量                                  | 描述               |
| :------------------------------------ | :----------------- |
| public static final int YEAR          | 年                 |
| public static final MONTH             | 月                 |
| public static final int DAY_OF_MONTH  | 天，以月为单位     |
| public static final int DAY_OF_YEAR   | 天，以年为单位     |
| public static final int WEEK_OF_MONTH | 第几周，以月为单位 |
| public static final int WEEK_OF_YEAR  | 第几周，以年为单位 |
| public static final int HOUR_OF_DAY   | 小时               |
| public static final int MINUTE        | 分钟               |
| public static final int SECOND        | 秒                 |
| public static final int MILLISECOND   | 毫秒               |

| 方法                                 | 描述                             |
| :----------------------------------- | :------------------------------- |
| public static Calendar getInstance() | 获取系统对应的Calendar实例化对象 |
| public void set(int field,int value) | 给静态常量赋值                   |
| public int get(int field)            | 取出静态常量                     |
| public final Date getTime()          | 获取Calendar 对应的Date对象      |

```java
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class CalendarTest {
    public static void main(String[] args) {
        //当天所在的周是今年的第几周
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.YEAR,2026);
        //月份从0开始算的，所以要减一
        calendar.set(Calendar.MONTH,5);
        calendar.set(Calendar.DAY_OF_MONTH,26);
        int i = calendar.get(Calendar.WEEK_OF_YEAR);
        System.out.println(i);

        //今天之后的三百天的日期
        //不set就是当前时刻的时间
        Calendar calendar1 = Calendar.getInstance();
        int day = calendar1.get(Calendar.DAY_OF_YEAR);
        calendar1.set(Calendar.DAY_OF_YEAR, day+300);
        Date time = calendar1.getTime();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        System.out.println(sdf.format(time));
    }
}
```
