# java

## 注解

#### @springBootApplication

- 标识当前java类是boot程序的入口，是一个启动类

```java
@SpringBootApplication
public class Demo0Application {

    public static void main(String[] args) {
        SpringApplication.run(Demo0Application.class, args);
    }

}
```
