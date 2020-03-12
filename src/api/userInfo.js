/**
 *@des 个人中心相关接口
 *@author stav stavyan@qq.com
 *@blog https://stavtop.club
 *@date 2019/11/16 11:04:16
 */
import hostUrl from './params';

// 个人信息
const memberInfo = "/tiny-shop/v1/member/member/index";
// 个人信息修改
const memberUpdate = "/tiny-shop/v1/member/member/update";

// 收货地址列表
const addressList = "/tiny-shop/v1/member/address/index";
// 默认收货地址
const addressDefault = "/tiny-shop/v1/member/address/default";
// 默认收货地址
const addressDetail = "/tiny-shop/v1/member/address/view";
// 创建收货地址
const addressCreate = "/tiny-shop/v1/member/address/create";
// 修改收货地址
const addressUpdate = "/tiny-shop/v1/member/address/update";
// 修改收货地址
const addressDelete = "/tiny-shop/v1/member/address/delete";

// 获取优惠券列表
const couponList = "/tiny-shop/v1/marketing/coupon-type/index";
// 获取我的优惠券列表
const myCouponList = "/tiny-shop/v1/member/coupon/index";
// 优惠券详情
const couponDetail = "/tiny-shop/v1/marketing/coupon-type/view";
// 领取优惠券
const couponReceive = "/tiny-shop/v1/marketing/coupon-type/create";
const couponClear = "/tiny-shop/v1/member/coupon/clear";

// 获取我的订单
const orderList = "/tiny-shop/v1/member/order/index";
// 订单确认收货
const orderTakeDelivery = "/tiny-shop/v1/member/order/take-delivery";
// 退货/退款申请
const orderRefundApply = "/tiny-shop/v1/member/order-product/refund-apply";
// 关闭退货/退款申请
const closeOrderRefundApply = "/tiny-shop/v1/member/order-product/refund-close";
// 获取订单详情
const orderDetail = "/tiny-shop/v1/member/order/view";
// 删除已关闭订单
const orderDelete = "/tiny-shop/v1/member/order/delete";

// 获取我的足迹
const footPrintList = "/tiny-shop/v1/member/footprint/index";
// 删除我的足迹
const footPrintDel = "/tiny-shop/v1/member/footprint/delete";

// 收藏列表
const collectList = "/tiny-shop/v1/member/collect/index";

// 积分余额日志
const creditsLogList = "/tiny-shop/v1/member/credits-log/index";

// 创建订单评价
const evaluateCreate = "/tiny-shop/v1/member/evaluate/create";
// 追加评价
const evaluateAgain = "/tiny-shop/v1/member/evaluate/again";

// 发票列表
const invoiceList = "/tiny-shop/v1/member/invoice/index";
// 发票列表
const invoiceCreate = "/tiny-shop/v1/member/invoice/create";
// 发票编辑
const invoiceUpdate = "/tiny-shop/v1/member/invoice/update";
// 发票详情
const invoiceDetail = "/tiny-shop/v1/member/invoice/view";
// 默认发票
const invoiceDefault = "/tiny-shop/v1/member/invoice/default";
// 删除发票
const invoiceDel = "/tiny-shop/v1/member/invoice/delete";
// 开票列表
const orderInvoiceList = "/tiny-shop/v1/member/order-invoice/index";

// 意见反馈列表
const opinionList = "/tiny-shop/v1/member/opinion/index";
// 意见反馈创建
const opinionCreate = "/tiny-shop/v1/member/opinion/create";
// 意见反馈详情
const opinionDetail = "/tiny-shop/v1/member/opinion/view";

// 第三方授权列表
const thirdPartyAuthList = "/tiny-shop/v1/member/auth/index";
// 解除第三方授权列表
const thirdPartyAuthDelete = "/tiny-shop/v1/member/auth/delete";

// 充值金额
const rechargeConfigIndex = "/tiny-shop/v1/member/recharge-config/index";

// 订单售后
// 申请退款/退货
const orderCustomerRefundApply = "/tiny-shop/v1/member/order-customer/refund-apply";
// 退货提交物流
const orderCustomerSalesReturn = "/tiny-shop/v1/member/order-customer/sales-return";
// 退款/退货关闭申请
const orderCustomerRefundClose = "/tiny-shop/v1/member/order-customer/refund-close";

// 上传图片
const uploadImage = `${hostUrl}/tiny-shop/v1/common/file/images`;
// 上传图片
const uploadBase64Image = `${hostUrl}/tiny-shop/v1/common/file/base64`;




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
    couponDetail,
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
    evaluateAgain,
    invoiceList,
    invoiceCreate,
    invoiceUpdate,
    invoiceDetail,
    invoiceDefault,
    invoiceDel,
    orderInvoiceList,
    uploadImage,
    uploadBase64Image,
    opinionList,
    opinionCreate,
    opinionDetail,
    thirdPartyAuthList,
    thirdPartyAuthDelete,
    rechargeConfigIndex
};
