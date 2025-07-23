# axios 封装


```md
.
|——request
     |_ axiosInstance.ts
     |_ http.ts
     |_ api.ts

```


## 创建axios实例


```ts 
/* axiosInstance.ts */
import axios from 'axios';
import type { AxiosInstance,InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { ElMessage } from 'element-plus';
import { userInfoStore } from '@/stores/userInfo';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:7070',
  timeout: 10000,
  withCredentials: true,//跨域请求携带cookie
})

// 添加请求拦截器
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if(config.url?.startsWith("/file")){
       config.headers['Content-Type'] = "multipart/form-data"
    }
    // config.headers['Content-Type'] = "application/json"
    // config.headers['Content-Type'] = "application/x-www-form-urlencoded"
    // 在发送请求之前做些什么
    const token = sessionStorage.getItem("adminToken")  
    
    if(token){
      config.headers['adminToken'] = token;
    }
    return config;
  },
  (error: any) => {
    
    // 处理请求错误
    // console.log(error,'requestErr')
    return Promise.reject(error);
  },
)
// 添加响应拦截器
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 对响应数据做点什么
    if (response.data.code == 200||response.config.url?.startsWith("/file")) {
      // 如果是正常响应，直接返回数据
      return response;
    } else {
      // 如果 code 不为 200，处理错误
      // 比如抛出错误信息、弹出提示等
      ElMessage({
        type:"error",
        message:response.data.info
      })
      return Promise.reject(new Error(response.data.info || '未知错误'));
    }
  },
  (error: any) => {
    // 处理响应错误
    if(error.status==901){
      sessionStorage.removeItem("token")
      sessionStorage.removeItem("userInfo")

      const userStore=userInfoStore()
      userStore.setIsloading(false)
      userStore.setUserInfo(null)
    }
    return Promise.reject(error);
  },
)
export default axiosInstance;

```

## 封装模块

```ts
/** http.ts */
import axiosInstance from "./axiosInstance"
import type { AxiosRequestConfig } from 'axios';
const http = {
    async get<T>(url: string, params?: any): Promise<T> {
        const response = await axiosInstance.get<T>(url, { params });
        return response.data;
    },

    async post<T>(url: string, data?:any, config?: AxiosRequestConfig): Promise<T> {
        const response = await axiosInstance.post<T>(url, data,{ ...config });
        return response.data;
    },

    async  put<T>(url: string, data?: any): Promise<T> {
        const response = await axiosInstance.put<T>(url, data);
        return response.data;
    },

    async  del<T>(url: string, params?: any): Promise<T> {
        const response = await axiosInstance.delete<T>(url, { params });
        return response.data;
    },
}
export default http

```

## 添加接口

```ts
/** api.ts */
import http from "./http"

const api = {
    checkCode:(data?:any)=>http.post("/account/checkCodeUseRedis",data),        //获取图片验证码
    loadVideoPost:(data?:any)=>http.post("/ucenter/loadVideoPost",data,{headers: {'Content-Type': 'multipart/form-data'}}),  //提交视频信息
    getResoure:(data?: any)=>http.post("/file/getResoure",data,{ responseType: 'blob' }),    //读取
}
export default api
```



