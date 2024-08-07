# javascript

<br>

#### HTTP 常用协议请求

<br>

##### GET

- **用途：** 从服务器获取资源，通常用于获取信息。
- **幂等性：** 是幂等的，多次相同的 GET 请求会产生相同的结果，不会改变服务器状态。
- **安全性：** 是安全的，因为它不会修改资源的状态。
- **示例：** 获取网页、图片、文本文件等，以及查询信息。

##### POST

- **用途：** 向服务器提交数据，用于创建资源或处理数据，通常在请求后会导致服务器状态变化。
- **幂等性：** 不是幂等的，多次相同的 POST 请求可能会创建多个资源。
- **安全性：** 不是安全的，因为它可能会修改服务器状态。
- **示例：** 提交表单数据、上传文件、执行命令等。

##### PUT

- **用途：** 向指定资源位置上传更新资源，客户端提供完整的资源数据，用于更新或创建资源。
- **幂等性：** 是幂等的，多次相同的 PUT 请求会产生相同的结果，因为它指定了完整的资源状态。
- **安全性：** 不是安全的，因为它可能会修改资源。
- **示例：** 更新用户信息、上传某个资源文件等。

##### DELETE

- **用途：** 删除指定的资源。
- **幂等性：** 是幂等的，多次相同的 DELETE 请求会产生相同的结果，即资源会被删除。
- **安全性：** 不是安全的，因为它会删除资源。
- **示例：** 删除用户、删除文件等。

##### PATCH

- **用途：** 对资源进行部分修改，客户端提供需要修改的资源数据。
- **幂等性：** 不一定是幂等的，具体取决于服务器的实现。
- **安全性：** 不是安全的，因为它会修改资源。
- **示例：** 更新资源的部分信息，如更新用户信息中的某些字段。

##### OPTIONS

- **用途：** 获取目标资源所支持的通信选项，常用于跨域请求。
- **幂等性：** 是幂等的，多次相同的 OPTIONS 请求会产生相同的结果。
- **安全性：** 是安全的，因为它不会修改资源。
- **示例：** 查看服务器支持的请求方法、检查资源是否存在等。

## axios封装

1. 创建一个 axios 实例

```ts
import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios';
​
const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://api.example.com/',
  timeout: 5000,
});
​
// 添加请求拦截器
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 在发送请求之前做些什么
    return config;
  },
  (error: any) => {
    // 处理请求错误
    return Promise.reject(error);
  },
);
​
// 添加响应拦截器
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 对响应数据做点什么
    return response;
  },
  (error: any) => {
    // 处理响应错误
    return Promise.reject(error);
  },
);
​
export default axiosInstance;
​```

2. 创建一个封装模块

```ts
import axiosInstance from './axios-instance';
​
export interface ApiResult<T> {
  code: number;
  message: string;
  data: T;
}
​
export async function get<T>(url: string, params?: any): Promise<ApiResult<T>> {
  const response = await axiosInstance.get<ApiResult<T>>(url, { params });
  return response.data;
}
​
export async function post<T>(url: string, data?: any): Promise<ApiResult<T>> {
  const response = await axiosInstance.post<ApiResult<T>>(url, data);
  return response.data;
}
​
export async function put<T>(url: string, data?: any): Promise<ApiResult<T>> {
  const response = await axiosInstance.put<ApiResult<T>>(url, data);
  return response.data;
}
​
export async function del<T>(url: string, params?: any): Promise<ApiResult<T>> {
  const response = await axiosInstance.delete<ApiResult<T>>(url, { params });
  return response.data;
}
```
***仅供参考，须要详细配置和封装***
