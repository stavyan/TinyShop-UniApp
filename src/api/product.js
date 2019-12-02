/**
 *@des 产品营销
 *@author stav stavyan@qq.com
 *@blog https://stavtop.club
 *@date 2019/11/18 13:57:54
 */
// 产品分类列表
const productCate = "/addons/rf-tiny-shop/v1/product/cate/index";
// 首页推荐分类
const productCateList = "/addons/rf-tiny-shop/v1/product/cate/list";
// 产品列表
const productList = "/addons/rf-tiny-shop/v1/product/product/index";
// 产品列表
const productDetail = "/addons/rf-tiny-shop/v1/product/product/view";
// 产品列表
const cartItemCreate = "/addons/rf-tiny-shop/v1/member/cart-item/create";
// 产品列表
const cartItemList = "/addons/rf-tiny-shop/v1/member/cart-item/index";
// 删除购物车商品
const cartItemDel = "/addons/rf-tiny-shop/v1/member/cart-item/delete-ids";
// 清空购物车
const cartItemClear = "/addons/rf-tiny-shop/v1/member/cart-item/clear";
// 修改购物车商品数量
const cartItemUpdateNum = "/addons/rf-tiny-shop/v1/member/cart-item/update-num";

// 订单创建
const orderCreate = "/addons/rf-tiny-shop/v1/order/order/create";
// 订单预览
const orderPreview = "/addons/rf-tiny-shop/v1/order/order/preview";

// 取消未支付订单
const orderClose = "/addons/rf-tiny-shop/v1/member/order/close";
// 订单支付
const orderPay= "/addons/rf-tiny-shop/v1/common/pay/create";
// 选择快递运费计算
const orderFreightFee = "/addons/rf-tiny-shop/v1/order/order/freight-fee";

// 商品评论列表
const evaluateList = "/addons/rf-tiny-shop/v1/product/evaluate/index";

export {
    productCate,
    productCateList,
    productList,
    productDetail,
    cartItemCreate,
    cartItemList,
    cartItemDel,
    cartItemClear,
    cartItemUpdateNum,
    orderCreate,
    orderClose,
    orderPay,
    orderFreightFee,
    evaluateList,
    orderPreview
};
