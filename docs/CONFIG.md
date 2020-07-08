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
