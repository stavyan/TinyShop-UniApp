## RF 微商城

### 前言

基于 [RageFrame2](https://github.com/jianyan74/rageframe2) 的一款免费开源的基础商城销售功能的开源微商城，前端基于 uni-app，一端发布多端通用，目前已经适配 H5、微信小程序、QQ小程序、Ios App、Android App。目前开源的版本功能为 V1 版，更多增强功能(V2、V3)敬请期待。

### 后端项目

开源地址: https://github.com/jianyan74/TinyShop

### Demo

H5 预览: http://h5.tinyshop.rageframe.com  

微信小程序和QQ小程序正处于审核阶段

后台预览: http://demo2.rageframe.com/backend

账号: demo   
密码: 123456 

![image](docs/images/h5-qrcode.png) 

### 思维导图

![image](docs/images/tinyshop.png)

### 安装说明

1、安装相关依赖, 默认已拥有node环境

```
yarn install || npm i
```

2、运行到指定平台

```
npm run dev:PLATFORM
# 例 微信小程序的存放路径
/dist/dev/mp-weixin
```

值 | 平台
---|---
h5 | H5
mp-weixin | 微信小程序
mp-alipay | 支付宝小程序
mp-baidu | 百度小程序
mp-toutiao | 头条小程序
mp-qq | qq 小程序


3、打包至线上部署

```
npm run build:PLATFORM // 平台信息同上
# 例 微信小程序的存放路径
/dist/build/mp-weixin
```

使用对应的小程序客户端进行发布。

4、发布uni-app(打包为原生App云端)

配合HBuilderX使用

### 配置文件

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

字体图标库来源于 https://iconfont.cn 需要的可自行注册该网站账号，然后加群索要：655084090。

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

### 官网

http://www.rageframe.com

### 问题反馈

在使用中有任何问题，欢迎反馈给我，可以用以下联系方式跟我们交流

QQ群：[655084090](https://jq.qq.com/?_wv=1027&k=4BeVA2r)

### 特别鸣谢

感谢以下的项目，排名不分先后

Vuejs： https://github.com/vuejs/vue

uni-app： https://uniapp.dcloud.io/

mix-mall: https://ext.dcloud.net.cn/plugin?id=200#detail

...

### 版权信息

RageFrame 遵循 Apache2 开源协议发布，并提供免费使用。

本项目包含的第三方源码和二进制文件之版权信息另行标注。

版权所有Copyright © 2016-2020 by RageFrame [www.rageframe.com](http://www.rageframe.com)

All rights reserved。
