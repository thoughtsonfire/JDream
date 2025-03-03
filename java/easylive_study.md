# **easylive_study**

### 登录

#### 验证码

- 使用`captcha`包

- 使用session
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
