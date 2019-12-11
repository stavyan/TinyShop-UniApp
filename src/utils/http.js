import axios from './uni-axios'
import {refreshToken} from "../api/login";

// 创建自定义接口服务实例
const http = axios.create({
    baseURL: 'https://www.yllook.com/api',
    timeout: 60 * 1000,  // 不可超过 manifest.json 中配置 networkTimeout的超时时间
    // #ifdef H5
    withCredentials: true,
    // #endif
    headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Type': 'application/json'
        //'X-Requested-With': 'XMLHttpRequest',
    },
})

// 拦截器 在请求之前拦截
http.interceptors.request.use(config => {
    const token = uni.getStorageSync('accessToken');
    if (!token) {
        return config
    }
    const userInfo = uni.getStorageSync('userInfo');
    const user = uni.getStorageSync('user');
    const loginTime = uni.getStorageSync('loginTime');
    const currentTime = new Date().getTime() / 1000
    console.log(currentTime - loginTime)
    return;
    if (currentTime - loginTime > user.expiration_time) {
        post(refreshToken, {
            refresh_token: user.refresh_token,
            group: 'tinyShopMiniProgram'
        }).then(r=>{
            if (r.code === 200) {
                uni.setStorage({
                    key: 'accessToken',
                    data: r.data.access_token
                })
                uni.setStorage({
                    key: 'loginTime',
                    data: new Date().getTime() / 1000
                });
                uni.setStorage({
                    key: 'refreshToken',
                    data: r.data.refresh_token
                })
            } else {
                uni.showToast({ title: r.message, icon: "none" });
                uni.clearStorageSync();
                uni.showToast({
                    title: "会话已过期， 请重新登录！",
                    icon: 'none'
                });
                setTimeout(() => {
                    uni.reLaunch({
                        url: '/pages/public/login'
                    });
                }, 1.5 * 1000);
            }
        }).catch(err => {
            console.log(err)
            uni.clearStorageSync();
            uni.showToast({
                title: "会话已过期， 请重新登录！",
                icon: 'none'
            });
            setTimeout(() => {
                uni.reLaunch({
                    url: '/pages/public/login'
                });
            }, 1.5 * 1000);
        })
    }
    let paramsCommon = {}
    let headerCommon = {}
    if (token && userInfo) {
        headerCommon = {
            "x-api-key": token,
            "merchant-id": userInfo.merchant_id
        };
        paramsCommon = {
            "access_token": token,
            "merchant_id": userInfo.merchant_id
        }
    }
    config.headers = { ...config.headers, ...headerCommon }
    // code...
    // 获取本地存储的Cookie
    // const cookie = uni.getStorageSync('cookie')
    // 设置Cookie
    // config.headers.Cookie = cookie
    // console.log(config)
    // _reqlog(config)
    return config
})

// 拦截器 在请求之后拦截
http.interceptors.response.use(response => {
    uni.hideLoading();
    switch (response.data.code) {
        case 200:
            return response.data;
            break
        case 401:
            uni.clearStorageSync();
            uni.removeStorage({
                key: 'accessToken'
            })
            uni.removeStorage({
                key: 'refreshToken'
            })
            uni.showToast({
                title: "会话已过期， 请重新登录！",
                icon: 'none'
            });
            setTimeout(() => {
                uni.reLaunch({
                    url: '/pages/public/login'
                });
            }, 1.5 * 1000);
            break;
        case 400:
            // uni.clearStorageSync();
            uni.showToast({title: "错误的请求", icon: 'none'});
            break;
        case 405:
            // uni.clearStorageSync();
            uni.showToast({title: "当前操作不被允许", icon: 'none'});
            break;
        case 404:
            uni.showToast({title: "你似乎到了未知领取~", icon: 'none'});
            break;
        case 429:
            uni.showToast({title: "请求过多，先休息一下吧~", icon: 'none'});
            break;
        case 500:
            uni.showToast({title: "服务器打瞌睡了~", icon: 'none'});
            break;
        default:
            uni.showToast({
                title: r.message,
                icon: 'none'
            });
            return Promise.reject();
            break
    }
}, error => {
    uni.hideLoading();
    return Promise.reject(error.message)
})

export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    http
      .get(url,{
          params,
      })
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);
      });
  });
}
export function post(url, params = {}) {
  return new Promise((resolve, reject) => {
    http
      .post(url, params)
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);
      });
  });
}
export function put(url, params = {}) {
  return new Promise((resolve, reject) => {
    http
      .post(url, { ...paramsCommon, ...params })
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);
      });
  });
}
export function del(url, params = {}) {
  return new Promise((resolve, reject) => {
    http
      .post(url, { ...paramsCommon, ...params })
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);
      });
  });
}

