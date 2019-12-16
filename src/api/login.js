/**
 *@des 登录注册相关接口
 *@author stav stavyan@qq.com
 *@blog https://stavtop.club
 *@date 2019/11/15 15:14:47
 *@param login.js
 */

// 密码注册
const registerByPass = "/tiny-shop/v1/site/register";

// 密码登录
const loginByPass = "/tiny-shop/v1/site/login";

// 手机号登录
const loginBySmsCode = "/tiny-shop/v1/site/mobile-login";

// 获取手机验证码
const smsCode = "/tiny-shop/v1/site/sms-code";

// 退出登录
const logout = "/tiny-shop/v1/site/logout";

// 退出登录
const refreshToken = "https://www.yllook.com/api/tiny-shop/v1/site/refresh";

export {
    registerByPass,
    loginByPass,
    smsCode,
    loginBySmsCode,
    logout,
    refreshToken
};
