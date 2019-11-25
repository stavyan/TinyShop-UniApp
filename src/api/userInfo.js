/**
 *@des 个人中心相关接口
 *@author stav stavyan@qq.com
 *@blog https://stavtop.club
 *@date 2019/11/16 11:04:16
 */

// 个人信息
const memberInfo = "/addons/rf-tiny-shop/v1/member/member/index";
// 个人信息修改
const memberUpdate = "/addons/rf-tiny-shop/v1/member/member/update";

// 收货地址列表
const addressList = "/addons/rf-tiny-shop/v1/member/address/index";
// 默认收货地址
const addressDefault = "/addons/rf-tiny-shop/v1/member/address/default";
// 默认收货地址
const addressDetail = "/addons/rf-tiny-shop/v1/member/address/view";
// 创建收货地址
const addressCreate = "/addons/rf-tiny-shop/v1/member/address/create";
// 修改收货地址
const addressUpdate = "/addons/rf-tiny-shop/v1/member/address/update";
// 修改收货地址
const addressDelete = "/addons/rf-tiny-shop/v1/member/address/delete";

// 获取优惠券列表
const couponList = "/addons/rf-tiny-shop/v1/marketing/coupon-type/index";
// 获取我的优惠券列表
const myCouponList = "/addons/rf-tiny-shop/v1/member/coupon/index";
// 领取优惠券
const couponReceive = "/addons/rf-tiny-shop/v1/marketing/coupon-type/create";

// 获取我的订单
const orderList = "/addons/rf-tiny-shop/v1/member/order/index";

// 获取我的足迹
const footPrintList = "/addons/rf-tiny-shop/v1/member/footprint/index";
// 删除我的足迹
const footPrintDel = "/addons/rf-tiny-shop/v1/member/footprint/delete";

// 收藏列表
const collectList = "/addons/rf-tiny-shop/v1/member/collect/index";

// 积分余额日志
const creditsLogList = "/addons/rf-tiny-shop/v1/member/credits-log/index";

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
    orderList,
    couponReceive,
    footPrintList,
    footPrintDel,
    collectList,
    creditsLogList
};
