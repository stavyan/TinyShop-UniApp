## 配置文件

1、公共样式 `/src/uni.scss`

```
   /* 页面左右间距 */
   $page-row-spacing: 30upx;
   $page-color-base: #f8f8f8;
   $page-color-light: #f8f6fc;
   $base-color: #fa436a;

   /* 文字尺寸 */
   $font-sm: 24upx;
   $font-base: 28upx;
   $font-lg: 32upx;
   /*文字颜色*/
   $font-color-dark: #303133;
   $font-color-base: #606266;
   $font-color-light: #909399;
   $font-color-disabled: #C0C4CC;
   $font-color-spec: #4399fc;
   /* 边框颜色 */
   $border-color-dark: #DCDFE6;
   $border-color-base: #E4E7ED;
   $border-color-light: #EBEEF5;
   /* 图片加载中颜色 */
   $image-bg-color: #eee;
   /* 行为相关颜色 */
   $uni-color-primary:#fa436a;
   $uni-color-success: #4cd964;
   $uni-color-warning: #f0ad4e;
   $uni-color-error: #dd524d;

```

2、字体图标

字体图标库来源于 http://iconfont.cn 需要的可自行注册该网站账号

- 下载字体图标库
- 拷贝至项目存放静态资源处
- main.js 或者 App.vue 引入

3、axios api请求封装 `/src/utils/http.js`

采用的第三方插件 uni-axios。


```
import axios from './uni-axios'

// 创建自定义接口服务实例
const http = axios.create({
    baseURL: baseUrl, // baseUrl 公共前缀
    timeout: 60 * 1000,  // 不可超过 manifest.json 中配置 networkTimeout的超时时间
    // #ifdef H5
    withCredentials: true,
    // #endif
    headers: {
        'Content-Type': 'application/json'
    },
});

// 拦截器 在请求之前拦截
http.interceptors.request.use(async config => {}, (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 拦截器 在请求之后拦截
http.interceptors.response.use(response => {}, error => {
    uni.hideLoading();
    return Promise.reject(error.message)
});

export default http;

<!-- 使用说明见main.js封装。 -->

```

4、公共参数 `/src/api/params.js`



```
// 主机地址
const hostUrl = "http://h5.tinyshop.rageframe.com";
// 后台接口请求地址
const baseUrl = "http://demo.rageframe.com/api";
```
