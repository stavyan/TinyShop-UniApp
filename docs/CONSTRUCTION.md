## 项目结构

### SRC 目录结构
```shell
./src
├── App.vue // 入口文件
├── Json.js
├── api // api文档
│   ├── basic.js    // 公共基础
│   ├── distribution.js // 微分销
│   ├── login.js    // 登录注册
│   ├── merchant.js // 商家相关
│   ├── params.js   // 公共参数
│   ├── product.js  // 产品音效
│   ├── userInfo.js // 个人中心
│   └── websocket.js    // im相关
├── common // 公共文件
│   ├── colorui // colorUI 样式
│   │   ├── animation.css 
│   │   ├── icon.css
│   │   └── main.css
│   ├── css // 公共样式
│   │   ├── iconfont // 字体图标
│   │   │   ├── iconfont.css
│   │   │   └── iconfont.ttf
│   │   ├── reset.scss // 样式重置
│   │   └── uni.scss // uniapp 官方公共样式
│   └── graceChecker.js // 表单校验文件
├── components // 组件
├── main.js // 配置文件
├── manifest.json   // 参数文件
├── pages // 页面
├── static  // 静态资源
│   ├── emoji   // 表情包
│   └── yticon.ttf  // 用作pages.json的字体图标文件
├── store   // 状态管理
│   └── index.js
├── uni.scss    // 公共样式
└── utils   // 工具类
    ├── emoji.js
    ├── http.js // api请求
    ├── jweixin.js  // 微信授权
    ├── moment.js // 时间类
    ├── rf-h5-copy.js // H5拷贝库
    └── uni-axios   // axios 库
```

### pages 页面结构(``)

```shell
./src/pages
├── cart // 购物车
│   └── cart.vue // 购物车
├── category // 分类
│   └── category.vue // 分类
├── distribution // 分销
│   ├── agent
│   │   └── agent.vue   // 我的团队（上级 下级下下级）
│   ├── cash    // 提现
│   │   └── cash.vue    // 提现申请
│   │   └── list.vue    // 提现记录
│   ├── brokerage   // 佣金
│   │   └── brokerage.vue   // 我的佣金
│   │   └── detail.vue   // 佣金明细
│   ├── spread  // 信息
│   │   └── promote.vue // 推广二维码
│   │   └── spread.vue  // 分销商信息
│   ├── withdraw    // 提现账号
│   │   └── withdraw.vue    // 提现账号列表
│   │   └── manage.vue    // 提现账号管理
│   ├── order   // 订单
│   │   └── order.vue   // 自推/团队订单
│   ├── regional    // 区域代理
│   │   └── apply.vue   // 区域代理申请
│   └── index.vue   // 控制中心入口
│   └── apply.vue   // 分销商申请
├── index   // 主页
│   ├── index.vue   // 主页
│   ├── notice   // 公告
│   │   ├── detail.vue   // 公告详情
│   │   └── notice.vue   // 公告列表
│   └── search  // 搜索
│       └── search.vue  // 搜索
├── order   // 订单
│   ├── create  // 创建订单
│   │   ├── order.vue  // 创建普通订单
│   │   └── wholesale.vue  // 创建拼团订单
│   ├── detail.vue  // 订单详情
│   ├── evaluation  // 评价
│   │   ├── evaluation.vue  // 评价/追评
│   │   └── list.vue   // 评价列表
│   ├── item.vue    // 订单的商品列表
│   ├── order.vue   // 订单列表
│   ├── refund  // 退款申请
│   │   └── refund.vue  // 退款申请
│   ├── refund.vue  // 售后列表
│   └── shipping    // 物流信息
│       ├── return.vue  // 提交退货信息
│       └── shipping.vue    // 物流信息
├── product // 商品
│   ├── list.vue    // 商品列表
│   ├── product.vue // 商品详情
│   ├── service // 客服
│   │   ├── detail.vue  // 客服问题详情页
│   │   ├── index.vue   // 客服入口
│   │   └── service.vue // 客服
│   └── wholesale   // 拼团
│       ├── detail.vue  // 拼团详情
│       └── group.vue   // 拼团入口
├── public  // 公共
│   ├── login.vue   // 登录
│   ├── logintype.vue   // 登录类型
│   ├── password.vue    // 修改密码
│   └── register.vue    // 注册
├── set // 设置
│   ├── about   // 关于
│   │   ├── about.vue   // 关于入口
│   │   └── detail.vue  // 关于详情
│   ├── authorization   // 第三方授权
│   │   └── list.vue    // 授权猎表
│   ├── feedback    // 用户反馈
│   │   ├── detail.vue  // 反馈详情
│   │   ├── feedback.vue    // 反馈管理
│   │   └── list.vue    // 反馈列表
│   ├── invoice     // 发票
│   │   ├── invoice.vue // 发票管理
│   │   ├── list.vue    // 开票管理
│   │   └── manage.vue  // 发票管理
│   ├── set.vue // 设置入口也
│   └── withdraw    // 提现账号
│       ├── manage.vue  // 提现账号管理
│       └── withdraw.vue    // 提现账号列表
├── user // 我的
│   ├── account // 账户中心
│   │   ├── account.vue // 账号中心入口
│   │   ├── bill.vue    // 账单明细
│   │   ├── integral.vue    // 积分明细
│   │   └── recharge.vue    // 充值页面
│   ├── address // 收货地址
│   │   ├── address.vue // 收货地址列表
│   │   └── manage.vue  // 收货地址管理
│   ├── collection  // 收藏
│   │   └── collection.vue  // 收藏列表
│   ├── coupon  // 优惠券
│   │   ├── coupon.vue  // 领券中心
│   │   ├── detail.vue  // 优惠券详情
│   │   └── list.vue    // 我的优惠券
│   ├── footprint // 足迹
│   │   └── footprint.vue   // 足迹列表
│   ├── money   // 支付
│   │   ├── pay.vue // 支付页面
│   │   └── success.vue // 支付成功
│   ├── user.vue    // 我的
│   └── userinfo    // 个人信息
│       └── userinfo.vue    // 个人信息修改/查看
└── wholesale

```

### components 组件结构

```shell
./src/components
├── count-down
│   └── count-down.vue
├── empty.vue
├── mix-list-cell.vue
├── mpvue-picker
│   └── mpvuePicker.vue
├── rf-avatar
│   └── rf-avatar.vue
├── rf-back-home
│   └── rf-back-home.vue
├── rf-badge
│   └── rf-badge.vue
├── rf-calendar
│   ├── calendar.js
│   ├── rf-calendar-item.vue
│   ├── rf-calendar.vue
│   └── util.js
├── rf-count-down
│   └── rf-count-down.vue
├── rf-emoji
│   └── rf-emoji.vue
├── rf-empty
│   └── index.vue
├── rf-floor-index
│   └── rf-floor-index.vue
├── rf-image
│   └── rf-image.vue
├── rf-load-more
│   └── rf-load-more.vue
├── rf-load-progress
│   └── rf-load-progress.vue
├── rf-loading
│   └── rf-loading.vue
├── rf-rate
│   └── rf-rate.vue
├── rf-recommend
│   └── rf-recommend.vue
├── rf-search
│   └── rf-search.vue
├── rf-search-bar
│   └── rf-search-bar.vue
├── rf-swipe-action
│   └── rf-swipe-action.vue
├── rf-swipe-action-item
│   ├── bindingx.js
│   ├── index.wxs
│   ├── mpalipay.js
│   ├── mpother.js
│   ├── mpwxs.js
│   └── rf-swipe-action-item.vue
├── rf-swipe-dot
│   └── rf-swipe-dot.vue
├── rf-swiper-slide
│   └── rf-swiper-slide.vue
├── rf-table
│   └── index.vue
├── share.vue
├── uni-drawer
│   └── uni-drawer.vue
├── uni-grid
│   └── uni-grid.vue
├── uni-grid-item
│   └── uni-grid-item.vue
├── uni-icons
│   ├── icons.js
│   ├── uni-icons-rate.vue
│   └── uni-icons.vue
├── uni-list
│   └── uni-list.vue
├── uni-list-item
│   └── uni-list-item.vue
├── uni-nav-bar
│   └── uni-nav-bar.vue
├── uni-number-box.vue
├── uni-tag
│   └── uni-tag.vue
└── upload-images.vue

```
