/**
 *@des 公用基础
 *@author stav stavyan@qq.com
 *@blog https://stavtop.club
 *@date 2019/11/19 14:56:57
 *@param registerByPass
 */

// 获取省市区列表
const provinceList = "/rf-tiny-shop/v1/common/provinces/index";
// 收藏商品
const collectCreate = "/rf-tiny-shop/v1/common/collect/create";
// 删除收藏商品
const collectDel = "/rf-tiny-shop/v1/common/collect/delete";

// 分享/转发
const transmitCreate = "/rf-tiny-shop/v1/common/transmit/create";

// 分享/转发
const uploadFile = "/v1/file/images";

// 广告
const advList = "/addons/rf-article/adv/index";

export {
    provinceList,
    collectCreate,
    collectDel,
    transmitCreate,
    uploadFile,
    advList
};
