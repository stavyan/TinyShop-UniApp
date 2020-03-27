## RF 微商城

### 前言

基于 [RageFrame2](https://github.com/jianyan74/rageframe2) 的一款免费开源的基础商城销售功能的开源微商城，前端基于 uni-app，一端发布多端通用，目前已经适配 H5、微信小程序、QQ小程序、Ios App、Android App。目前开源的版本功能为 V1 版，更多增强功能(V2、V3)敬请期待。

### 项目地址

[前端开源地址](https://github.com/stavyan/TinyShop-UniApp): https://github.com/stavyan/TinyShop-UniApp

[后端开源地址](https://github.com/jianyan74/TinyShop): https://github.com/jianyan74/TinyShop

### 更新记录

### 2020-03-27

1. 修复商品详情页图片不显示问题 ( 来自 @sun-上海 )
2. 修复新增地址一直加载问题 ( 来自 @sun-上海 )
3. 修复部分情况不加载数据问题

### 2020-03-25

1. 添加页面加载动画
2. 添加部分操作的加载进度条
3. 修复已知问题

### 2020-03-24

1. 部分页面支持骨架屏
2. 减少吐司加载 替换成动画加载
3. 优化部分商品无法下单
4. 修复实付款显示
5. 修复切换sku价格不变
6. 优化订单多商品显示问题

#### 2020-03-23

1. 部分页面支持骨架屏
2. 减少吐司加载 替换成动画加载
3. 优化部分商品无法下单
4. 修复实付款显示
5. 修复切换sku价格不变
6. 优化订单多商品显示问题

#### 2020-03-20

1. 代码优化 
2. 添加部分加载动画 
3. 商品详情页添加数字角标 
4. 优化empty页面

#### 2020-03-19 (来自 @Ivy-珠海  16:05:53)

- [x] 1、商品页：底下这个浮动栏没到底和两边，而且太透明，体验难受。-> 布局样式可以自己二开改
- [x] 2、选规格界面间距太大，已选规格看不到选了哪些，只显示选了颜色，风格、尺寸没显示出来。
- [x] 3、没登录点购买显示会话过期，应该是直接跳登录页才对吧。 -> 微信H5和微信小程序在授权登录能快捷登录
- [ ] 4、新建收货地址默认有地址了？
- [x] 5、创建订单实付款 +null积分。
- [ ] 6、我的订单下拉会出现个奇怪的白色小圆圈。
- [ ] 7、后台输入发货及物流号后，客户端未出现确定收货按钮。
- [x] 8、我的订单页面，由全部左滑动，重复出来一个页面。 -> 获取数据需要时间 
- [x] 9、我的收藏里点商品页找不到页面。
- [ ] 10、我的界面待付款显示0,0,0.
- [x] 12、编辑地址，已经加载了还有闪几下。
- [x] 13、空购物车有点难看。 -> 布局样式可以自己二开改
- [x] 14、运费不知道怎么来的？ -> 运费通过接口获取 后台可设置
- [ ] 15、点评价，用不了。
- [ ] 16、订单删除后应该显示已取消，不是已关闭。
- [x] 17、已收货订单应该也可以删除。 -> 订单记录不可删除
- [x] 18、修改完资料后不返回。
- [x] 19、分享不能用。
- [ ] 20、领券不能用。
- [ ] 21、筛选现在完全就是分类，应该设置一些规格、价格属性等等。 发现这些，

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
// 安装yarn命令
npm i -g yarn
// 安装依赖
yarn 
```

2. 运行到指定平台

```
// 运行到H5
yarn serve
// 运行至对应的小程序平台 
yarn dev:PLATFORM
```

值 | 平台
---|---
h5 | H5
mp-weixin | 微信小程序
mp-alipay | 支付宝小程序
mp-baidu | 百度小程序
mp-toutiao | 头条小程序
mp-qq | qq 小程序


3. 打包至线上部署
```
// H5打包
yarn build
yarn build:PLATFORM // 平台信息同上
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

### 官网

http://www.rageframe.com

### 问题反馈

在使用中有任何问题，欢迎反馈给我，可以用以下联系方式跟我们交流

QQ群：[655084090](https://jq.qq.com/?_wv=1027&k=4BeVA2r)

### 特别鸣谢

感谢以下的项目，排名不分先后

Vuejs： https://github.com/vuejs/vue

uni-app： https://uniapp.dcloud.io/

mix-mall: https://ext.dcloud.net.cn/plugin?id=200

...

### 版权信息

RageFrame 遵循 Apache2 开源协议发布，并提供免费使用。

本项目包含的第三方源码和二进制文件之版权信息另行标注。

版权所有Copyright © 2016-2020 by RageFrame [www.rageframe.com](http://www.rageframe.com)

All rights reserved。
