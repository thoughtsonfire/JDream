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

#### axios封装

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


#### 获取元素
- document.querySelector()  返回第一个元素或者null
- document.querySelectorAll()  返回所有匹配项
- document.getElementsByClassName  返回所有匹配项


## 动画过渡滚动相关
<br>

#### document.documentElement.scrollTop不适配

`document.documentElement` 代表文档的根元素，在大多数现代浏览器中，它对应于 `<html>` 元素。通常，`document.documentElement.scrollTop` 被用来获取页面的垂直滚动位置。然而，在某些情况下，它可能无法按预期工作，主要原因包括：

1. 浏览器兼容性

不同浏览器可能会有不同的实现细节。虽然大多数现代浏览器都支持 `document.documentElement.scrollTop`，但一些旧版本或非主流浏览器可能对其支持不完全或存在差异。例如，某些浏览器可能不完全实现 `document.documentElement.scrollTop`，而是使用 `document.body.scrollTop`。

2. CSS 和文档结构

   在某些情况下，CSS 样式可能影响滚动行为。例如，如果页面的根元素（<html>）上设置了 overflow: hidden 或 overflow: auto，这可能会影响 scrollTop 的值。此外，如果 html 元素的高度不为 100% 或 overflow 属性被更改，也可能导致 scrollTop 行为异常。

3. 滚动容器

   `document.documentElement.scrollTop` 通常适用于根文档，但如果你的页面有特定的滚动容器（例如一个 div 元素），这个容器的滚动位置应该用容器自身的 scrollTop 属性来访问。如果你想获取整个页面的滚动位置，而不仅仅是某个容器的，可能需要调整你的代码来处理具体的容器。

4. 移动设备和视口

   在移动设备上，视口的滚动行为与桌面浏览器可能有所不同。移动设备上的滚动处理有时可能会涉及视口和布局的不同处理方式。例如，一些移动浏览器可能会将 `document.documentElement.scrollTop` 和 `document.body.scrollTop` 进行不同的计算或处理。

5. 标准和非标准行为

   一些浏览器可能在滚动计算时有非标准的行为。例如，在早期的 IE 浏览器中，scrollTop 的计算可能与标准有所不同。这些浏览器可能更倾向于使用 document.body.scrollTop。

**解决方案**

- 使用 window.scrollY 或 window.pageYOffset:
  
  ```js
  const scrollPosition = window.scrollY || window.pageYOffset;
  ```

  #### requestAnimationFrame

  requestAnimationFrame 是一个浏览器 API，用于在下一个重绘之前执行指定的回调函数。这个机制可以帮助你创建平滑的动画效果，因为它允许你在浏览器的重绘周期中运行动画代码，从而避免了直接使用 setTimeout 或 setInterval 的潜在问题，比如不一致的帧率和性能问题。

  **如何使用**

  1. 定义回调函数：
     
     回调函数会在下一次浏览器重绘之前执行，通常用于更新动画状态或重新绘制图形。

  2. 请求下一帧：

     使用 `requestAnimationFrame` 向浏览器请求下一帧的绘制。浏览器会在适当的时候调用你的回调函数。

  **代码实例**

  ```ts
  let ticking = false;
  const handleScroll = () => {
   if (!ticking) {
     window.requestAnimationFrame(() => {
       if (window.scrollY >= 64) {
         isFixHeaderBar.value = true;
       } else {
         isFixHeaderBar.value = false;
       }
       ticking = false;
     });
     ticking = true;
   }
  };
  ```
  
  ```js
   function animate() {
       // 更新动画状态或绘制内容
       console.log('Animating...');
   
       // 请求下一帧
       requestAnimationFrame(animate);
   }
   
   // 启动动画
   requestAnimationFrame(animate);
   
  ```

**主要特点**

1. 帧率优化：

 `requestAnimationFrame` 会根据浏览器的刷新率（通常是每秒 60 帧）来调节动画的帧率，使得动画更平滑。大多数现代浏览器的刷新率是 60 Hz，这意味着每秒 60 帧。

2. 节能：

 如果动画所在的页面被隐藏或不可见，`requestAnimationFrame` 会暂停动画的执行，帮助节省计算资源。这对移动设备和桌面浏览器都能提高性能和节能。

3. 与浏览器重绘同步：

 使用 requestAnimationFrame 的回调函数会在浏览器下一次重绘之前执行，这样可以减少渲染过程中产生的视觉抖动或不连贯的效果。

4. 动画链：

 `requestAnimationFrame` 可以用来创建动画链。当动画完成一帧后，它会自动请求下一帧，这样你就可以创建连续的动画效果，而无需手动管理计时器。
 
 **性能比较**
 
 与 `setTimeout` 或 `setInterval` 相比，`requestAnimationFrame` 更适合处理动画，因为它与浏览器的渲染周期同步，从而避免了不必要的计算和过度的 CPU 使用。`setTimeout` 或 `setInterval` 的时间间隔可能不与浏览器的刷新率对齐，导致动画的卡顿或不平滑。

**注意事项**

1. 回调函数：

 `requestAnimationFrame` 的回调函数通常会接收一个时间戳参数（timestamp），表示当前时间，这对于实现动画效果和时间控制非常有用。
 
 ```js
 javascript
 function animate(timestamp) {
     // 使用 timestamp 进行动画计算
     console.log('Animating at time:', timestamp);
 
     // 请求下一帧
     requestAnimationFrame(animate);
 }
 ```
2. 停止动画：
   
   要停止动画，可以使用 `cancelAnimationFrame` 方法。你需要在调用 `requestAnimationFrame` 时保存返回的 ID，然后用它来取消动画。

   ```js
   let animationId;

   function animate() {
       // 更新动画状态或绘制内容
       console.log('Animating...');
   
       // 请求下一帧
       animationId = requestAnimationFrame(animate);
   }
   
   // 启动动画
   animationId = requestAnimationFrame(animate);
   
   // 停止动画
   cancelAnimationFrame(animationId);
   ```

**总结**

`requestAnimationFrame` 是一种用于创建平滑动画的现代 API，它通过与浏览器的重绘周期同步来优化性能，并能有效节省计算资源。它适用于需要高性能动画的场景，如游戏、图形绘制和界面动画。
