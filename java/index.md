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
  user:15466
  code:55444544
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
@Components
public class Eamil{
  public String user;

  public String code;
}
```
