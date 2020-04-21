## 更新记录

#### v1.1.0.1

updated 2020.04.20

- 修复: 商品列表ios 刘海屏/非刘海屏 android部分机型页面正常显示 
- 修复: 商品列表 综合排序字体过大 内容溢出问题
- [ ] 商品详细页面图片过大不能自适应
- [ ] 阻止按钮在短时间内多次点击

#### v1.1.0

updated 2020.04.20

- 新增: 会话过期返回原先登录页面(utils/helper.js)
- 新增: 路由导航
    - 封装页面跳转方法(utils/router.js)
- 新增: 封装支付方法(utils/payment)
    - 公众号支付(微信H5支付)
    - 微信小程序支付
    - H5支付宝支付
- 新增: 抽取常量参数
    - 图片 (config/assets.config.js)
    - 常量 (config/constData.config.js)
    - 表单验证 (config/formRule.config.js)
    - 基本配置 (config/index.config.js)
    - websocket方法 (config/websocket.config.js)
- 优化: vuex状态管理
- 新增: 分包优化
- 新增: 404/500 页面
- 优化：request.js 优化token无痛刷新
- 优化：服务协议和隐私协议窗口
- 优化：订单下单-完成的流程
- 新增：购物车 收藏 我的足迹失效状态的显示
- 优化：购物车角标显示
- 新增：订单搜索功能/搜索订单结果页面
- 优化：统一所有list样式
- 新增：图片懒加载(除h5)

#### v1.1.0

updated 2020.03.12

- 初始化1.0 基础
