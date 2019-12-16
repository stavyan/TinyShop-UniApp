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

// 上传文件/图片
const uploadFile = "/v1/file/images";

// 广告
const advList = "/tiny-shop/v1/common/adv/index";

// 配置
const configList = "/tiny-shop/v1/common/config/index";

export {
    provinceList,
    collectCreate,
    collectDel,
    transmitCreate,
    uploadFile,
    advList,
    configList
};
