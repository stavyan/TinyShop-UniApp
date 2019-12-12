/**
 *@des 个人中心相关接口
 *@author stav stavyan@qq.com
 *@blog https://stavtop.club
 *@date 2019/11/16 11:04:16
 */

// 个人信息
const memberInfo = "/rf-tiny-shop/v1/member/member/index";
// 个人信息修改
const memberUpdate = "/rf-tiny-shop/v1/member/member/update";

// 收货地址列表
const addressList = "/rf-tiny-shop/v1/member/address/index";
// 默认收货地址
const addressDefault = "/rf-tiny-shop/v1/member/address/default";
// 默认收货地址
const addressDetail = "/rf-tiny-shop/v1/member/address/view";
// 创建收货地址
const addressCreate = "/rf-tiny-shop/v1/member/address/create";
// 修改收货地址
const addressUpdate = "/rf-tiny-shop/v1/member/address/update";
// 修改收货地址
const addressDelete = "/rf-tiny-shop/v1/member/address/delete";

// 获取优惠券列表
const couponList = "/rf-tiny-shop/v1/marketing/coupon-type/index";
// 获取我的优惠券列表
const myCouponList = "/rf-tiny-shop/v1/member/coupon/index";
// 领取优惠券
const couponReceive = "/rf-tiny-shop/v1/marketing/coupon-type/create";
const couponClear = "/rf-tiny-shop/v1/member/coupon/clear";

// 获取我的订单
const orderList = "/rf-tiny-shop/v1/member/order/index";
// 订单确认收货
const orderTakeDelivery = "/rf-tiny-shop/v1/member/order/take-delivery";
// 退货/退款申请
const orderRefundApply = "/rf-tiny-shop/v1/member/order-product/refund-apply";
// 关闭退货/退款申请
const closeOrderRefundApply = "/rf-tiny-shop/v1/member/order-product/refund-close";
// 获取订单详情
const orderDetail = "/rf-tiny-shop/v1/member/order/view";
// 删除已关闭订单
const orderDelete = "/rf-tiny-shop/v1/member/order/delete";

// 获取我的足迹
const footPrintList = "/rf-tiny-shop/v1/member/footprint/index";
// 删除我的足迹
const footPrintDel = "/rf-tiny-shop/v1/member/footprint/delete";

// 收藏列表
const collectList = "/rf-tiny-shop/v1/member/collect/index";

// 积分余额日志
const creditsLogList = "/rf-tiny-shop/v1/member/credits-log/index";

// 创建订单评价
const evaluateCreate = "/rf-tiny-shop/v1/member/evaluate/create";

// 发票列表
const invoiceList = "/rf-tiny-shop/v1/member/invoice/index";
// 发票列表
const invoiceCreate = "/rf-tiny-shop/v1/member/invoice/create";
// 发票编辑
const invoiceUpdate = "/rf-tiny-shop/v1/member/invoice/update";
// 发票详情
const invoiceDetail = "/rf-tiny-shop/v1/member/invoice/view";
// 默认发票
const invoiceDefault = "/rf-tiny-shop/v1/member/invoice/default";
// 删除发票
const invoiceDel = "/rf-tiny-shop/v1/member/invoice/delete";

export {
    memberInfo,
    memberUpdate,
    addressList,
    addressCreate,
    addressDefault,
    addressDetail,
    addressUpdate,
    addressDelete,
    couponList,
    myCouponList,
    couponClear,
    orderList,
    orderRefundApply,
    closeOrderRefundApply,
    orderDetail,
    orderDelete,
    orderTakeDelivery,
    couponReceive,
    footPrintList,
    footPrintDel,
    collectList,
    creditsLogList,
    evaluateCreate,
    invoiceList,
    invoiceCreate,
    invoiceUpdate,
    invoiceDetail,
    invoiceDefault,
    invoiceDel
};
