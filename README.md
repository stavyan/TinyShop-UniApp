# rf-mall

## 使用说明
1. 安装相关依赖
```
yarn install || npm i
```

2. 运行到指定平台

```
npm run dev:PLATFORM
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
npm run build:PLATFORM // 平台信息同上
```

4. 发布uni-app(打包为原生App云端)

配合HBuilderX使用
