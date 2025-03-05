# **easylive_study**

### @RestControllerAdvice全局的异常处理器

可以在全局处理时，直接返回 JSON 或者其他响应体内容。

### 登录


#### 验证码

- 使用`captcha`包生成验证码

- 使用session(优点，简单；缺点无法直接设置过期时间)
  - 生成验证码
    ```java
    	@RequestMapping("/checkCode")
    	public ResponseVO checkCode(HttpSession session){
    		ArithmeticCaptcha captcha = new ArithmeticCaptcha(100, 42);
    		String code = captcha.text();
    		session.setAttribute("checkCode", code);
    		String checkCodeBase64 = captcha.toBase64();
    		return getSuccessResponseVO(checkCodeBase64);
    	}
    ```
    响应头会Set-Cookie 将验证码结果存入
  - 验证验证码
    ```java
    	@RequestMapping("/reqister")
    	public ResponseVO reqister(HttpSession session,String checkCode){
    		String myCheckCode = (String) session.getAttribute("checkCode");
    		return getSuccessResponseVO(myCheckCode.equalsIgnoreCase(checkCode));
    	}
    ```
    请求头cookie中传入Set-Cookie存的JSESSIONID
- 使用redis
  ```java(Constants)
  public class Constants {
  
      public static final  Integer REDIS_KEY_EXPIRES_ONE_MINUTE = 60000; //一分钟
  
      public static final String REDIS_KEY_PREFIX = "easylive:"; //redis 中区分，：显示树形结构
  
      public static String REDIS_KEY_CHECK_CODE = REDIS_KEY_PREFIX + "check_code:";
  }
  ```
  
  ```java(RedisComponent)
  @Component
  public class RedisComponent {
  
      @Resource
      private RedisUtils redisUtils;
  
      public String saveCheckCode(String code) {
          String checkCodeKey = UUID.randomUUID().toString();
          redisUtils.setex(Constants.REDIS_KEY_PREFIX+checkCodeKey,code,Constants.REDIS_KEY_EXPIRES_ONE_MINUTE*10);
          return checkCodeKey;
      }
  }
  ```
  - 生成随机key存储验证码结果
    ```java
    	@RequestMapping("/checkCodeUseRedis")
    	public ResponseVO checkCodeUseRedis(){
    		ArithmeticCaptcha captcha = new ArithmeticCaptcha(100, 42);
    		String code = captcha.text();
    		String checkCodeKey = redisComponent.saveCheckCode(code);
    		String checkCodeBase64 = captcha.toBase64();
    		Map<String,String> result = new HashMap<String,String>();
    		result.put("checkCode", checkCodeBase64);
    		result.put("checkCodeKey", checkCodeKey);
    		return getSuccessResponseVO(result);
    	}
    ```
#### 使用`Validated`包进行表单验证

- 在类上加注解`@Validated`
- 方法参数里
  ```java
  public ResponseVO reqisterUseRedis(@NotEmpty @Email @Size(max = 150) String email,
                     @NotEmpty @Size(max = 20) String nickName,
                     @NotEmpty @Pattern(regexp = Constants.REGEX_PASSWORD) String registerPassword,
                     @NotEmpty String checkCodeKey,
                     @NotEmpty String checkCode){
    return null;
  }
  ```
#### `java`中的枚举
- values() 方法：获取所有枚举常量的数组，方便遍历。
- valueOf() 方法：通过字符串值获取对应的枚举常量。
- ordinal() 方法：获取枚举常量的索引值。
```java
public enum UserStatusEnum {

    DISABLE(0,"禁用"),
    ENABLE(1,"启用");

    private Integer status;
    private String desc;

    UserStatusEnum(Integer status, String desc){
        this.status = status;
        this.desc = desc;
    }

    public static UserStatusEnum getByStatus(Integer status){
        for(UserStatusEnum item : UserStatusEnum.values()){
            if(item.getStatus().equals(status)){
                return item;
            }
        }
        return null;
    }

    public Integer getStatus(){
        return status;
    }

    public String getDesc(String desc){
        return desc;
    }

    public void setDesc(String desc){
        this.desc = desc;
    }

}
```

## MyBatis 的 XML 映射

```
 <trim prefix="(" suffix=")" suffixOverrides=",">
  <if test="bean.userId != null">
     user_id,
  </if>
  <if test="bean.nickName != null">
     nick_name,
  </if>
 </trim>
```

- `trim` 删除多余的
   

