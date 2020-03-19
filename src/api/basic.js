/**
 *@des 公用基础
 *@author stav stavyan@qq.com
 *@blog https://stavtop.club
 *@date 2019/11/19 14:56:57
 *@param registerByPass
 */

// 获取省市区列表
const provinceList = "/tiny-shop/v1/common/provinces/index";
// 收藏商品
const collectCreate = "/tiny-shop/v1/common/collect/create";
// 删除收藏商品
const collectDel = "/tiny-shop/v1/common/collect/delete";

// 分享/转发
const transmitCreate = "/tiny-shop/v1/common/transmit/create";

// 广告
const advList = "/tiny-shop/v1/common/adv/index";

// 配置
const configList = "/tiny-shop/v1/common/config/index";

// 充值
const payCreate = "/tiny-shop/v1/common/pay/create";
// 充值
const wechatConfig = "/tiny-shop/v1/third-party/wechat-js-sdk";

// 公告
// 公告列表
const notifyAnnounceIndex = "/tiny-shop/v1/common/notify-announce/index";
// 公告详情
const notifyAnnounceView = "/tiny-shop/v1/common/notify-announce/view";

export {
    provinceList,
    collectCreate,
    collectDel,
    transmitCreate,
    advList,
    payCreate,
    configList,
    wechatConfig,
    notifyAnnounceIndex,
    notifyAnnounceView
};
