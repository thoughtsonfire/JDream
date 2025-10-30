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

查询有效的代理，换上

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

身份认证

```py
import requests
from requests.auth import HTTPBasicAuth

r = requests.get('https://static3.scrape.cuiqingcai.com/',auth=HTTPBasicAuth('admin','admin'))
print(r.status_code)
```

## 积累

### 解决防盗链(400/403)

Referer 是 HTTP 协议里的一种 请求头，用来告诉服务器：

👉 这个请求是从哪个页面点过来的。

```py
headers = {
"Referer": "https://m.douban.com/",
'user-agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36'
}
```

在请求头中加上`Referer`

### pprint.pprint(response.json())

使用 pprint 打印 json 数据，结构更清晰

```py
import pprint

...

pprint.pprint(response.json())
```
