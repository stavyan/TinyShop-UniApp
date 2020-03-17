/**
 *@des 登录注册相关接口
 *@author stav stavyan@qq.com
 *@blog https://stavtop.club
 *@date 2019/11/15 15:14:47
 *@param login.js
 */

import {baseUrl} from "./params";

// 密码注册
const registerByPass = "/tiny-shop/v1/site/register";

// 密码登录
const loginByPass = "/tiny-shop/v1/site/login";

// 微信授权登录
const wechatH5Login = "/tiny-shop/v1/third-party/wechat";

// 微信小程序授权登录
const mpWechatLogin = "/tiny-shop/v1/third-party/wechat-mp";

// 密码重置
const updatePassword = "/tiny-shop/v1/site/up-pwd";

// 第三方绑定
const authLogin = "/tiny-shop/v1/member/auth/create";

// 查询绑定状态
const isBindingCheck = "/tiny-shop/v1/member/auth/is-binding";

// 手机号登录
const loginBySmsCode = "/tiny-shop/v1/site/mobile-login";

// 获取手机验证码
const smsCode = "/tiny-shop/v1/site/sms-code";

// 退出登录
const logout = "/tiny-shop/v1/site/logout";

// 退出登录
const refreshToken = `${baseUrl}/tiny-shop/v1/site/refresh`;

export {
    registerByPass,
    loginByPass,
    isBindingCheck,
    wechatH5Login,
    mpWechatLogin,
    authLogin,
    updatePassword,
    smsCode,
    loginBySmsCode,
    logout,
    refreshToken
};
