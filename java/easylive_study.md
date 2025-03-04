# **easylive_study**

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
