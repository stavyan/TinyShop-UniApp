/**
 *@des 个人中心相关接口
 *@author stav stavyan@qq.com
 *@blog https://stavtop.club
 *@date 2019/11/16 11:04:16
 */

// 个人信息
const memberInfo = "/addons/rf-tiny-shop/v1/member/member/index";
// 我的订单
const memberOrder = "/addons/rf-tiny-shop/v1/member/order/index";
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

// 获取优惠券列表
const orderList = "/addons/rf-tiny-shop/v1/member/order/index";

export {
    memberInfo,
    memberOrder,
    memberUpdate,
    addressList,
    addressCreate,
    addressDefault,
    addressDetail,
    addressUpdate,
    addressDelete,
    couponList,
    orderList
};
