## Date 入参解析失败

描述：入参的`dto` 里的`date` 是字符串形式的解析失败,接口返回400 Bad Request，接口进不去。

原因：

```yml [application.yml]
spring:
  jackson:
    date-format: yyyy-MM-dd HH:mm:ss
    time-zone: GMT+8
```

这个配置影响了 Jackson 的日期反序列化。

它期待：

```json
{
  "birthday": "2022-11-24 00:00:00"
}
```

我传的：

```json
{
  "birthday": "2022-11-24"
}
```

解决方法：

给该字段加上注解,指明格式

```java
@JsonFormat(
    pattern = "yyyy-MM-dd",
    timezone = "GMT+8"
)
private Date birthday;
```

## sql正常查出来了，list里一些字段是null

原因：没有开启驼峰转换

```yml
mybatis:
  configuration:
    map-underscore-to-camel-case: true
```

## java 下的xml无法被扫描到

开启扫描

```xml
<build>
        <resources>

            <!-- 默认资源目录 -->
            <resource>
                <directory>src/main/resources</directory>
            </resource>
            <!--扫描>src/main/java下的xml文件-->
            <resource>
                <directory>src/main/java</directory>
                <includes>
                    <include>**/*.xml</include>
                </includes>
            </resource>
        </resources>
</build>
```

单mybatis项目

刷新 Maven 资源

```
右侧 Maven
    ↓
Lifecycle
    ↓
clean
    ↓
compile
```

springboot需要指定文件

```yml
mybatis:
  mapper-locations: classpath*:com/test/start/mapper/**/*.xml
```

原生的是手写的时候告诉它了，springboot自动装配的所以也要告诉他mapper.xml的位置
