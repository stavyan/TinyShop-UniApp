/**
 *@des 产品营销
 *@author stav stavyan@qq.com
 *@blog https://stavtop.club
 *@date 2019/11/18 13:57:54
 */
// 首页列表
const indexList = '/tiny-shop/v1/index/index';
// 产品分类列表
const productCate = '/tiny-shop/v1/product/cate/index';
// 首页推荐分类
const productCateList = '/tiny-shop/v1/product/cate/list';
// 产品列表
const productList = '/tiny-shop/v1/product/product/index';
// 产品详情
const productDetail = '/tiny-shop/v1/product/product/view';
// 组合套餐详情
const combinationView = '/tiny-shop/v1/marketing/combination/view';
// 猜您喜欢
const guessYouLikeList = '/tiny-shop/v1/product/product/guess-you-like';
// 添加购物车
const cartItemCreate = '/tiny-shop/v1/member/cart-item/create';
// 购物车列表
const cartItemList = '/tiny-shop/v1/member/cart-item/index';
// 购物车列表
const cartItemCount = '/tiny-shop/v1/member/cart-item/count';
// 删除购物车商品
const cartItemDel = '/tiny-shop/v1/member/cart-item/delete-ids';
// 清空购物车
const cartItemClear = '/tiny-shop/v1/member/cart-item/clear';
// 修改购物车商品数量
const cartItemUpdateNum = '/tiny-shop/v1/member/cart-item/update-num';
// 修改购物车商品sku
const cartItemUpdateSku = '/tiny-shop/v1/member/cart-item/update-sku';

// 品牌列表
const brandIndex = '/tiny-shop/v1/product/brand/index';

// 订单创建
const orderCreate = '/tiny-shop/v1/order/order/create';
// 订单预览
const orderPreview = '/tiny-shop/v1/order/order/preview';

// 取消未支付订单
const orderClose = '/tiny-shop/v1/member/order/close';
// 订单支付
const orderPay = '/tiny-shop/v1/common/pay/create';
// 选择快递运费计算
const orderFreightFee = '/tiny-shop/v1/order/order/freight-fee';

// 商品评价列表
const evaluateList = '/tiny-shop/v1/product/evaluate/index';

// 商品评价列表
const orderProductExpressDetails =
	'/tiny-shop/v1/member/order-product-express/details';

// 拼团
// 拼团产品
const wholesaleProductIndex = '/tiny-shop/v1/marketing/wholesale-product/index';
// 开团列表
const wholesaleIndex = '/tiny-shop/v1/marketing/wholesale/index';
// 开团详情
const wholesaleView = '/tiny-shop/v1/marketing/wholesale/view';
// 开团详情
const wholesaleGroupState = '/tiny-shop/v1/marketing/wholesale/group-state';
// 我的开团列表
const myWholesaleIndex = '/tiny-shop/v1/member/wholesale/index';

// 限时折扣
// 限时折扣列表
const discountProductIndex = '/tiny-shop/v1/marketing/discount-product/index';

// 团购
// 团购商品列表
const groupBuyIndex = '/tiny-shop/v1/marketing/group-buy/index';

// 砍价
// 砍价商品列表
const bargainProductIndex = '/tiny-shop/v1/marketing/bargain-product/index';
// 创建砍价
const bargainLaunchCreate = '/tiny-shop/v1/marketing/bargain-launch/create';
// 砍价详情
const bargainLaunchView = '/tiny-shop/v1/marketing/bargain-launch/view';
// 帮好友砍价
const bargainPartakeCreate = '/tiny-shop/v1/marketing/bargain-partake/create';
// 我的砍价列表
const bargainLaunchIndex = '/tiny-shop/v1/marketing/bargain-launch/index';

// 我的砍价列表
const miniProgramLiveIndex = '/tiny-shop/v1/marketing/mini-program-live/index';

// 我的砍价列表
const thirdPartyQrCode = '/tiny-shop/v1/third-party/qr-code';

export {
	indexList,
	productCate,
	productCateList,
	productList,
	guessYouLikeList,
	productDetail,
	combinationView,
	cartItemCreate,
	cartItemList,
	cartItemDel,
	cartItemClear,
	cartItemUpdateNum,
	brandIndex,
	orderCreate,
	orderClose,
	orderPay,
	orderFreightFee,
	evaluateList,
	orderPreview,
	orderProductExpressDetails,
	cartItemUpdateSku,
	cartItemCount,
	wholesaleProductIndex,
	wholesaleIndex,
	wholesaleView,
	wholesaleGroupState,
	myWholesaleIndex,
	discountProductIndex,
	groupBuyIndex,
	bargainProductIndex,
	bargainLaunchCreate,
	bargainLaunchView,
	bargainPartakeCreate,
	bargainLaunchIndex,
	miniProgramLiveIndex,
	thirdPartyQrCode
};
