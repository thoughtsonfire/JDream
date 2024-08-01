# java

## 配置文件

参考网址`https://springdoc.cn/spring-boot/application-properties.html#appendix.application-properties.server`

#### properties

- application.properties

- 修改端口号

```java
server.port=9090
```

- 修改虚拟目录

```java
server.servlet.context-path=/start
```
#### yml

- application.yml/application.yaml

```yml
server:
  port: 9091
  servlet:
    context-path: /start
```
* 注意`:`后面有个空格
  
##### 配置数据库

- pom.xml 文件中
  ```xml
  <dependency>
      <groupId>com.mysql</groupId>
      <artifactId>mysql-connector-j</artifactId>
      <scope>runtime</scope>
  </dependency>
  <dependency>
      <groupId>org.mybatis.spring.boot</groupId>
      <artifactId>mybatis-spring-boot-starter</artifactId>
      <version>3.0.0</version>
  </dependency>
  ```
  
- application.yml文件中
  ```yml
  spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/spring_test
    username: root
    password: 123456
  ```
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

#### @Controller

-Controller 的主要作用是接收用户的请求，处理请求中的业务逻辑，并返回响应。它负责从视图（View）接收用户的输入，对输入进行处理（调用服务、管理数据等），并将处理结果返回给视图或者直接返回给客户端。
-在 Spring MVC 框架中，Controller 是一个带有 @Controller 注解的 Spring Bean。它处理来自客户端的 HTTP 请求，并根据请求的 URL 映射到相应的处理方法（通常使用 @RequestMapping 或其派生注解进行映射）。
-Controller 方法可以接收来自 HTTP 请求的参数。Spring MVC 支持多种方式将请求参数绑定到方法的参数中，如 @RequestParam、@PathVariable、@RequestBody 等注解。

#### @RestController

`@RestController` 是 Spring Framework 提供的一个特殊注解，它结合了 @Controller 和 @ResponseBody 的功能。

1. 作用：
   - `@RestController` 主要用于创建 RESTful Web 服务。它的作用是将 Spring MVC Controller 类标记为 REST 控制器，表示这个类的所有方法返回的数据直接写入 HTTP 响应体中，而不是返回一个视图。因此，它适用于返回 JSON、XML 等格式数据的场景。
2. 特性：
   - 当使用 `@RestController` 注解标记一个类时，Spring 框架会自动将该类的所有方法的返回值绑定到 HTTP 响应体中。这意味着方法不会直接返回视图名称（比如 JSP、HTML 页面），而是直接返回数据，通常是 JSON 或 XML 格式的数据。
3. 与@Controller 的区别：
   - `@RestController` 注解相比于 `@Controller` 注解，省略了在每个处理方法上添加 `@ResponseBody` 的步骤。`@ResponseBody` 用于指示方法的返回值直接作为 HTTP 响应体，而 `@RestController` 已经内置了这个功能，因此更为简洁。

```java
@RestController
public class HelloController {
    @RequestMapping("/hello")
    public String hello() {
        return "Hello World!";
    }
}
```

#### @RequestMapping

- 当 @RequestMapping 注解应用在方法级别时，它用于定义特定方法处理的 URL 映射规则。可以使用不同的 HTTP 方法（如 GET、POST、PUT、DELETE 等）以及 URL 路径来指定方法的映射关系。
- 
```java
@Controller
@RequestMapping("/products")
public class ProductController {

    @GetMapping("/show")
    public String showProduct() {
        // Method implementation
    }

    @PostMapping("/create")
    public String createProduct() {
        // Method implementation
    }

    @PutMapping("/update")
    public String updateProduct() {
        // Method implementation
    }

    @DeleteMapping("/delete")
    public String deleteProduct() {
        // Method implementation
    }
}
```

- 除了 URL 路径外，@RequestMapping 还可以处理请求参数、请求头、请求方法等。可以使用 params、headers 等属性来限制请求的条件。

```java
@Controller
@RequestMapping("/api")
public class ApiController {

    @GetMapping(value = "/user", params = "id")
    public String getUserById(@RequestParam Long id) {
        // Method implementation
    }

    @PostMapping(value = "/user", headers = "Content-Type=application/json")
    public String addUser(@RequestBody User user) {
        // Method implementation
    }
}
```

#### @Value

- @Value("${键名}") 获取配置文件的值

```yml
email
  user: 15466
  code: 55444544
```

```java
@component
public class Email{
  @Value("${email.user}")
  public String user;

  @value("${emial.code}")
  public String code;
}
```

#### @ConfigurationProperties

- @ConfigurationProperties(prefix="前缀")
- 简化@Value注解 类里边的属性值必须和配置文件里的属性值一致

```java
@ConfigurationProperties(prefix="email")
@Component
public class Eamil{
  public String user;

  public String code;
}
```
#### @Component

- 组件类
- `@Component` 注解通常与其它特定用途的注解一起使用，如 `@Service`、`@Repository`、`@Controller` 等，这些注解是 `@Component` 的派生注解，用于标注特定类型的 `Spring` 组件。

#### @Autowired

- @Autowired 可以根据类型自动装配 Bean。Spring 会在上下文中寻找匹配类型的 Bean，并将其注入到被标记的字段、方法参数或构造方法参数中。
- 除了 @Autowired，Spring 还提供了 `@Inject` 注解，它是 Java 的标准注解之一，功能类似于 @Autowired，但更加通用，可以用于任何 DI 框架。

#### @Service

在 Spring Framework 中，@Service 注解是一个专用的 @Component 派生注解，用于标识一个类是业务逻辑层（Service 层）的组件。与 @Component 注解类似，使用 @Service 注解可以告诉 Spring 框架该类需要被注册为 Spring 应用程序上下文中的一个服务类。

1. 标识业务逻辑类：
   - 将 @Service 注解放在一个类的声明上，指示该类是服务层组件，负责处理业务逻辑，通常用于与数据访问层（如 @Repository 标记的类）交互。

     ```java
       @Service
      public class MyService {
          // Class implementation
      }
     ```
2. 自动扫描与组件扫描：
   - 与 @Component 注解类似，Spring 需要通过组件扫描来发现被 @Service 标注的类。可以通过 @ComponentScan 注解或 XML 配置文件中的组件扫描配置来启用自动发现和注册服务类。
     ```java
     @Configuration
     @ComponentScan("com.example.package")
     public class AppConfig {
        // Configuration details
     }
     ```
3. 依赖注入和事务管理：
   - 通常，@Service 注解的类用于定义业务逻辑，可以依赖注入其他组件（如数据访问层的 @Repository 注解的类），并且通常与事务管理（@Transactional 注解）结合使用，确保业务方法在事务控制下运行。
     ```java
      @Service
      @Transactional
      public class MyService {
          @Autowired
          private MyRepository repository;
      
          public void performBusinessLogic() {
              // Use repository to perform business operations
          }
      }
     ```
4. 异常处理和业务逻辑：
   - @Service 注解的类通常包含应用程序的核心业务逻辑，包括数据处理、算法实现等。它们可以通过 AOP（面向切面编程）和异常处理机制来增强应用程序的可靠性和安全性。

#### @Mapper

- 在 Spring 中，@Mapper 注解通常用于标识一个接口或者类是 MyBatis 的 Mapper 接口或者 XML 映射文件的代理类。这个注解告诉 Spring 框架扫描并创建这些接口的实例，使它们可以被注入到其他 Bean 中，从而在应用程序中使用 MyBatis 进行持久化操作。

#### @ComponentScan

@ComponentScan 是 Spring 框架中用来指示 Spring 在特定的包路径下扫描组件的注解。它告诉 Spring 在指定的包及其子包中查找被 @Component 及其派生注解（如 @Repository、@Service、@Controller 等）标记的类，并将它们注册为 Spring 应用程序上下文中的 Bean。

1. 基本用法
- 使用 @ComponentScan 注解可以在任何标记了 @Configuration 注解的类上。通常情况下，它会与主配置类（如 Spring Boot 应用程序中的主类）结合使用，以确保 Spring 框架能够找到所有标记了 @Component 及其派生注解的类。
  ```java
  @Configuration
  @ComponentScan("com.example.components")
  public class AppConfig {
      // Configuration details
  }
  ```
  在上面的例子中，@ComponentScan("com.example.components") 告诉 Spring 框架在 com.example.components 包及其子包中扫描组件。
2. 指定多个包路径：
  ```java
  @ComponentScan({"com.example.controllers", "com.example.services", "com.example.repositories"})
  ```
3. 过滤条件
   - @ComponentScan 注解还支持使用 includeFilters 和 excludeFilters 属性来定义包扫描时的过滤条件。这允许开发者更精细地控制哪些类应该被 Spring 扫描并注册为 Bean。
     ```java
     @ComponentScan(basePackages = "com.example",
               includeFilters = @ComponentScan.Filter(type = FilterType.ANNOTATION, classes = {Controller.class, Service.class}),
               excludeFilters = @ComponentScan.Filter(type = FilterType.REGEX, pattern = ".*Test.*"))
     ```
     在上面的例子中，includeFilters 指定了只包括带有 @Controller 和 @Service 注解的类，而 excludeFilters 指定了排除所有包含 "Test" 字符串的类。
