/**
 *@des ajax请求封装
 *@author stav stavyan@qq.com
 *@blog https://stavtop.club
 *@date 2019/11/25 09:53:22
 *@param url 请求接口地址
 *@param params 请求参数 可选
 *@param header 请求头 可选
 *@param method 请求方式 GET POST PUT DELETE
 */
function request(url, params, header, method) {
    const baseApiUrl = "https://www.yllook.com/api";
    const token = uni.getStorageSync('accessToken');
    const userInfo = uni.getStorageSync('userInfo');
    if (token && userInfo) {
        header = {
            "x-api-key": token,
            "merchant-id": userInfo.merchant_id
        };
        params = {
            ...params,
            "access_token": token,
            "merchant_id": userInfo.merchant_id
        }
    }
    return uni.request({
        url: baseApiUrl + url,
        method: method,
        data: params,
        header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            ...header
        }
    }).then(res => {
        uni.hideLoading();
        if (res[1].data.code === 200) {
            return res[1].data;
        } else {
            throw res[1].data;
        }
    }).catch(r => {
        switch (r.code) {
            case 401:
                uni.showToast({
                    title: "会话已过期， 请重新登录！",
                    icon: 'none'
                });
                uni.removeStorage({
                    key: 'userInfo'
                });
                uni.removeStorage({
                    key: 'access_token'
                });
                setTimeout(() => {
                    uni.reLaunch({
                        url: '/pages/public/login'
                    });
                }, 1.5 * 1000);
                break;
            case 400:
                uni.clearStorageSync();
                break;
            case 500:
                uni.showToast({
                    title: "服务器打瞌睡了~",
                    icon: 'none'
                });
                break;
            default:
                uni.showToast({
                    title: r.message,
                    icon: 'none'
                });
                return Promise.reject();
                break
        }
    })
}

// GET 请求封装
export function get(url, params = {}, header = {}) {
    const method = "GET";
    return request(url, params, header, method);
}
// POST 请求封装
export function post(url, params = {}, header = {}) {
    const method = "POST";
    return request(url, params, header, method);
}
// PUT 请求封装
export function put(url, params = {}, header = {}) {
    const method = "PUT";
    return request(url, params, header, method);
}
// DELETE 请求封装
export function del(url, params = {}, header = {}) {
    const method = "DELETE";
    return request(url, params, header, method);
}
