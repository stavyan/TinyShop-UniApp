/**
 *@des 登录注册相关接口
 *@author stav stavyan@qq.com
 *@blog https://stavtop.club
 *@date 2019/11/15 15:14:47
 *@param login.js
 */

// 密码注册
const registerByPass = "/addons/rf-tiny-shop/v1/site/register";

// 密码登录
const loginByPass = "/addons/rf-tiny-shop/v1/site/login";

// 手机号登录
const loginBySmsCode = "/addons/rf-tiny-shop/v1/site/mobile-login";

// 获取手机验证码
const smsCode = "/addons/rf-tiny-shop/v1/site/sms-code";

// 退出登录
const logout = "/addons/rf-tiny-shop/v1/site/logout";

export {
    registerByPass,
    loginByPass,
    smsCode,
    loginBySmsCode,
    logout
};
