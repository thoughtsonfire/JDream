# IO 流

input 输入。output 输出

## File 类

| 方法                               | 描述                         |
| :--------------------------------- | :--------------------------- |
| public File(String path)           | 根据路径创建文件对象         |
| public String getName()            | 获取文件名                   |
| public String getParent()          | 获取文件所在的目录           |
| public File getParentFile()        | 获取文件所在的目录对应的对象 |
| public String getPath()            | 获取文件路径                 |
| public boolean exists()            | 判断对象是否存在             |
| public boolean isDirectory()       | 判断对象是否为目录           |
| public boolean isFile()            | 判断对象是否为文件           |
| public long lenght()               | 获取文件大小                 |
| public boolean createNewFile()     | 根据当前对象创建文件         |
| public boolean delete()            | 删除对象                     |
| public boolean mkdir()             | 创建文件夹                   |
| public boolean renameTo(File file) | 为已存在的文件重命名         |

```java
import jdk.nashorn.internal.ir.CallNode;

import java.io.File;
import java.io.IOException;

public class FileTest {
    public static void main(String[] args){
        File file = new File("C:\\Users\\23658\\Desktop\\mongo.txt");
        System.out.println(file); //输出的是路径 C:\Users\23658\Desktop\mongo.txt，不存在也会输出，所以要判断
        if (file.exists()) {
            System.out.println(file+"存在");
            System.out.println(file.getName());
            System.out.println(file.getPath());
            System.out.println(file.getParent());
            System.out.println(file.isFile());

            File file1 = new File(file.getParent());
            System.out.println(file1.isDirectory());

            System.out.println(file.length());//字节为单位

            File file2 = new File("C:\\Users\\23658\\Desktop\\test.txt");
            if(file2.exists()){
                boolean delete = file2.delete();
                if(delete){
                    System.out.println("删除成功");
                }else{
                    System.out.println("删除失败");
                }
            }
        }else {
            System.out.println(file+"不存在，创建文件");
            try {
                file.createNewFile();
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }

    }
}
```

## 字节流

- 按照方向分，输入流和输出流

- 按照单位分，字节流和字符流，字节流指每次处理的数据以字节为单位，字符流指每次处理数据以字符为单位

输入字节流和输出字节流

输入字节流InputStream

| 方法                                          | 描述                                       |
| :-------------------------------------------- | :----------------------------------------- |
| public int read()                             | 以字节为单位读取数据                       |
| public int read(byte[] bytes)                 | 将数据存入byte数组，返回数据长度           |
| public int read(byte[] bytes,int off,int len) | 将数据存入byte数组的指定区间，返回数据长度 |
| public int available()                        | 返回当前数据流中未读取的数据个数           |
| public void close()                           | 关闭数据流                                 |

```java
import java.io.*;

public class StreamTest {
    public static void main(String[] args) throws Exception {
        String path = "C:\\Users\\23658\\Desktop\\test.txt";
        InputStream inputStream = new FileInputStream(path);
        int read = inputStream.read();
        System.out.println(read);
        int read1 = inputStream.read();
        System.out.println(read1); //读取是一个字节一个字节的读的
        inputStream.close();
        System.out.println("-------------------");
        //用循环读取
        File file = new File(path);
        InputStream inputStream1 = new FileInputStream(file);
        long length = file.length();
        for (long i = 0; i < length; i++) {
            int read2 = inputStream1.read();
            System.out.println(read2);
        }
        System.out.println("-------------");
        inputStream1 = new FileInputStream(file);
        while(inputStream1.available()>0){
            int read2 = inputStream1.read();
            System.out.println(read2);
        }

        System.out.println("-----------------------");

        inputStream1 = new FileInputStream(file);
        byte[] bytes = new byte[10];
        int length1 = inputStream1.read(bytes); //返回的是有数据的长度
        System.out.println(length1);
        for (byte aByte : bytes) {
            System.out.println(aByte);
        }

        System.out.println("-----------------------");

        inputStream1 = new FileInputStream(file);
        byte[] bytes2 = new byte[10];
        int length2 = inputStream1.read(bytes2,2,6); //返回的是有数据的长度
        System.out.println(length2);
        for (byte aByte : bytes2) {
            System.out.println(aByte);
        }
        inputStream1.close();
    }
}
```

输出字节流OutputStream

| 方法                                      | 描述                           |
| :---------------------------------------- | :----------------------------- |
| public void write(int b)                  | 以字节为单位写数据             |
| public void write(byte[] b)               | 将byte数组中的数据写出         |
| public void write(byte[],int off,int len) | 将byte数组中指定区间的数据写出 |
| public void close                         | 关闭数据流                     |

```java
import java.io.FileOutputStream;
import java.io.OutputStream;

public class OutputStreamTest {
    public static void main(String[] args) throws Exception {
        String path = "C:\\Users\\23658\\Desktop\\test.txt";
        OutputStream outputStream = new FileOutputStream(path);//没有这个文件的话会创建
        outputStream.write(97); //先清空再写
        byte[] bytes = {97, 98, 99, 100, 101, 012};//接着写
        outputStream.write(bytes);
        outputStream.write(bytes, 2, 4);
        outputStream.close();
    }
}
```

## 文件的复制

```java
import java.io.*;

public class CopyTest {
    public static void main(String[] args) throws Exception {
        String fromPath = "C:\\Users\\23658\\Desktop\\test.txt";
        String toPath = "C:\\Users\\23658\\Desktop\\copy.txt";
        InputStream inputStream = new FileInputStream(fromPath);
        OutputStream outputStream = new FileOutputStream(toPath);

//        while (inputStream.available() > 0) {
//            outputStream.write(inputStream.read());
//        } 效率低

        File file = new File(fromPath);
        float length = file.length();
        byte[] bytes = new byte[(int) length];
        inputStream.read(bytes);
        outputStream.write(bytes);
        inputStream.close();
        outputStream.close();
    }
}
```

- 图片复制

```java
import java.io.*;

public class CopyTest1 {
    public static void main(String[] args) throws Exception {
        String fromPath = "C:\\Users\\23658\\Desktop\\a.jpg";
        String toPath = "C:\\Users\\23658\\Desktop\\b.jpg";
        String toPathc = "C:\\Users\\23658\\Desktop\\c.jpg";
        InputStream inputStream = new FileInputStream(fromPath);
        OutputStream outputStream = new FileOutputStream(toPath);
        int temp;
        while ((temp = inputStream.read()) != -1) {
            outputStream.write(temp);
        }
        inputStream.close();
        outputStream.close(); //字节流可以复制各种类型//字节流复制的是原始二进制数据，每个字节都原封不动

        Reader reader = new FileReader(fromPath);
        Writer writer = new FileWriter(toPathc);
        int temp1;
        while ((temp1 = reader.read())!= -1){
            writer.write(temp1);
        }
        reader.close();
        writer.close();//字符流复制图片，图片打不开，破化了内部结构 //字符流会对数据进行"编码/解码"，而图片本身不是字符，因此数据会被改变。

    }
}
```

```[字节流]
磁盘
  │
  ▼
InputStream
  │
  ▼
 byte[]
  │
  ▼
OutputStream
  │
  ▼
磁盘
```

```[字符流]
磁盘(字节)
    │
    ▼
InputStream
    │
    ▼
解码(UTF-8)
    │
    ▼
char
    │
    ▼
编码(UTF-8)
    │
    ▼
OutputStream
```

## 字符流

字节流以字节为单位进行数据的输入和输出

字符流以字符为单位进行数据的输入和输出

输入字符流 Reader

| 方法                                          | 描述                                       |
| :-------------------------------------------- | :----------------------------------------- |
| public int read()                             | 以字符为单位读取数据                       |
| public int read(char[] chars)                 | 将数据读入char数组，并返回数据长度         |
| public int read(char[] chars,int off,int len) | 将数据读入char数组指定区间，并返回数据长度 |
| public void close()                           | 关闭数据流                                 |

当被读取的内容是英文或者数字、符号时，字节流和字符流输出结果一致

英文一个字符就算一个字节

汉字一个字符是3个字节

```java
import java.io.FileInputStream;
import java.io.FileReader;
import java.io.InputStream;
import java.io.Reader;

public class ReaderTest {
    public static void main(String[] args) throws Exception {
        String path = "C:\\Users\\23658\\Desktop\\test.txt";
        Reader reader = new FileReader(path);
        int ch;
        while ((ch = reader.read()) != -1) {
//            System.out.println((char) ch);
            System.out.println(ch);
        }
        reader.close();
        System.out.println("*************************");
        InputStream inputStream = new FileInputStream(path);
        while (inputStream.available() > 0) {
            System.out.println((char) inputStream.read());
            System.out.println(inputStream.read());
        }
    }
}
```

```java
import java.io.FileReader;
import java.io.Reader;

public class ReaderTest1 {
    public static void main(String[] args) throws Exception {
        String path = "C:\\Users\\23658\\Desktop\\test.txt";
        Reader reader = new FileReader(path);
        char[] chars = new char[1024];
        int length = reader.read(chars);
        System.out.println(length);//字符长度
        for (int i = 0; i < length; i++) {
            System.out.println(chars[i]);
        }
        reader.close();
    }
}
```

输出字符流 Writer

| 方法                                            | 描述                            |
| :---------------------------------------------- | :------------------------------ |
| public void write(int c)                        | 以字符为单位写数据              |
| public void write(char[] chars)                 | 将char数组中的数据写出          |
| public void write(char[] chars,int off,int len) | 将char数组指定区间的数据写出    |
| public void write(String str)                   | 将String 类型的数据写出         |
| public void write(String str,int off,int len)   | 将String 类型指定区间的数据写出 |
| public void close()                             | 关闭数据流                      |

```java
import java.io.FileWriter;
import java.io.Writer;

public class WriterTest {
    public static void main(String[] args) throws Exception {
        String path = "C:\\Users\\23658\\Desktop\\test.txt";
        Writer writer = new FileWriter(path);
        writer.write(97);
        writer.write(20320);
        char[] chars = {'好','世','界'};
        writer.write(chars);
        writer.write(chars,1,1);
        String str = "你好啊";
        writer.write(str);
        writer.write(str,0,2);
        writer.close();
    }
}
```

## 序列化和反序列化

> 序列化就是：把内存中杂乱的对象，变成一串连续的字节序列。
>
> 反序列化就是：根据这串字节，再重新创建对象。

> 对象在内存中是，对应的地址，整个对象其实是一张关系网。

```
user
 │
 ▼
0x1000
 ┌──────────────┐
 │ name ─────┐  │
 │ age =18   │  │
 └──────────────┘
        │
        ▼
      0x3500
 ┌──────────────┐
 │ "张三"       │
 └──────────────┘
```

> 把内存中的地址存到文件里是无意义的，下次它就变了

序列化做了什么？

Java 会递归遍历整个对象。

例如：

```
User
 ├── name="张三"
 └── age=18
```

把它变成

```
User开始
字段1：name
类型：String
值：张三

字段2：age
类型：int
值：18

User结束
```

再进一步编码成字节：

```
AC ED 00 05 ...
```

为什么叫"序列"？

因为对象原来不是连续的。

- 如果把一个Java对象存入文件中，则需要对该队进行序列化处理

```java
import java.io.Serializable;

public class User implements Serializable {
    private Integer id;
    private String name;

    public User(Integer id, String name) {
        this.id = id;
        this.name = name;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}

```

- 从文件中读取对象就是反序列化

```java
import java.io.*;

public class SerializeTest {
    public static void main(String[] args) throws Exception {
        User user = new User(1, "张三");
        String toPath = "C:\\Users\\23658\\Desktop\\test.txt";
        OutputStream outputStream = new FileOutputStream(toPath);
        ObjectOutputStream objectOutputStream = new ObjectOutputStream(outputStream);
        objectOutputStream.writeObject(user);
        objectOutputStream.close();
        outputStream.close();

        InputStream inputStream = new FileInputStream(toPath);
        ObjectInputStream objectInputStream = new ObjectInputStream(inputStream);
        user = (User) objectInputStream.readObject();
        objectInputStream.close();
        inputStream.close();
        System.out.println(user);
        //如果文件里写了多个对象，也可以一个一个往出读的
    }
}
```
