# request 库  

Python 的 requests 库 —— 是爬虫和接口调用中最常用的库之一。  


## 安装  

```bash
pip install requests
```

## 基本请求

```py
import requests

# GET 请求
resp = requests.get("https://httpbin.org/get")
print(resp.status_code)   # 状态码
print(resp.text)          # 文本内容
print(resp.json())        # 如果是 JSON 响应
```

```py
# POST 请求
resp = requests.post("https://httpbin.org/post", data={"user": "jack"})
print(resp.text)
```

## 常用参数  

### 传递 URL 参数

```py
params = {"q": "python", "page": 1}
resp = requests.get("https://httpbin.org/get", params=params)
print(resp.url)  # 自动拼接成 ?q=python&page=1
```
<br>

### 传递表单数据  

```py
data = {"username": "jack", "password": "123"}
resp = requests.post("https://httpbin.org/post", data=data)
print(resp.json())
```
<br>

### 传递 JSON 数据  

```py
resp = requests.post("https://httpbin.org/post", json={"key": "value"})
print(resp.json())
```
<br>

### 自定义请求头

```py
headers = {"User-Agent": "Mozilla/5.0"}
resp = requests.get("https://httpbin.org/headers", headers=headers)
print(resp.json())
```
<br>

### 响应对象常用属性  

```py
resp = requests.get("https://httpbin.org/get")

print(resp.status_code)   # 状态码 (200, 404...)
print(resp.text)          # 字符串
print(resp.content)       # 字节数据 (图片、文件)
print(resp.json())        # 直接转 JSON (前提是返回 JSON)
print(resp.headers)       # 响应头
```
<br>

### Cookie & Session

自动保存 Cookie  

```py
s = requests.Session()

s.get("https://httpbin.org/cookies/set/user/jack")
resp = s.get("https://httpbin.org/cookies")

print(resp.text)  # 会显示 {"cookies":{"user":"jack"}}
```
<br>

### 文件上传 & 下载

上传文件  

```py
files = {"file": open("test.txt", "rb")}
resp = requests.post("https://httpbin.org/post", files=files)
print(resp.text)
```
下载文件  

```py
resp = requests.get("https://httpbin.org/image/png")
with open("img.png", "wb") as f:
    f.write(resp.content)
```
<br>

### 其它常用功能  

超时设置  

```py
resp = requests.get("https://httpbin.org/delay/3", timeout=2)
# 请求超过 2 秒会报错
```

代理  

```py
proxies = {
    "http": "http://127.0.0.1:8888",
    "https": "http://127.0.0.1:8888",
}
resp = requests.get("https://httpbin.org/get", proxies=proxies)
```

SSL 验证  

```py
requests.get("https://example.com", verify=False)  # 忽略证书
```

