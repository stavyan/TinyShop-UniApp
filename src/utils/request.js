// function request(url, data, method, header) {
//     const baseApiUrl = "https://www.yllook.com/api";
//     uni.request({
//         url: baseApiUrl + url,
//         method,
//         data,
//         header,
//     }).then(res => {
//         return res[1].data
//     }).catch(parmas => {
//         switch (parmas.code) {
// 　　　　　　　　case 401:
// 　　　　　　　　　　uni.clearStorageSync()
// 　　　　　　　　　　break
// 　　　　　　　　default:
// 　　　　　　　　　　uni.showToast({
// 　　　　　　　　　　　　title: parmas.message,
// 　　　　　　　　　　　　icon: 'none'
// 　　　　　　　　　　})
// 　　　　　　　　　　return Promise.reject()
// 　　　　　　　　　　break
// 　　　　　　}
//     })
// }
//
// export function get(url, params = {}) {
//     const header = {};
//     const method = "GET";
//     return request(url, params, method, header)
// }
//
// export function post(url, params = {}) {
//     const header = {'Content-Type': 'application/x-www-form-urlencoded'};
//     const method = "POST";
//     return request(url, params, method, header)
// }
//


// const baseApiUrl = "";
import {mapState} from "vuex";

const baseApiUrl = "https://www.yllook.com/api";
// const baseApiUrl = "";

export function get(url, params = {}, header = {}) {
    const token = uni.getStorageSync('access_token')
    if (token) {
        header = {
            "x-api-key": token
        }
        params = {
            ...params,
            "access_token": token
        }
    }
    return uni.request({
        url: baseApiUrl + url,
        method: 'GET',
        data: params,
        header: { ...header }
    }).then(res => {
        uni.hideLoading();
        return res[1].data
    }).catch(r => {
        uni.hideLoading();
        switch (r.code) {
            case 400:
                uni.clearStorageSync()
                break
            case 500:
                uni.showToast({
                    title: "服务器打瞌睡了~",
                    icon: 'none'
                })
                break
            default:
                uni.showToast({
                    title: r.message,
                    icon: 'none'
                })
                return Promise.reject()
                break
        }
    })
}

export function post(url, params = {}, header = {}) {
    const token = uni.getStorageSync('access_token')
    if (token) {
        header = {
            "x-api-key": token
        }
    }
    return uni.request({
        url: baseApiUrl + url,
        method: 'POST',
        data: params,
        header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            ...header
        }
    }).then(res => {
        uni.hideLoading();
        return res[1].data
        // console.log(res)
        // if (res[1].data.status && res[1].data.code == 200) {
        // } else {
        //     throw res[1].data
        // }
    }).catch(r => {
        uni.hideLoading();
        switch (r.code) {
            case 400:
                uni.clearStorageSync()
                break
            case 500:
                uni.showToast({
                    title: "服务器打瞌睡了~",
                    icon: 'none'
                })
                break
            default:
                uni.showToast({
                    title: r.message,
                    icon: 'none'
                })
                return Promise.reject()
                break
        }
    })
}

export function put(url, params = {}, header = {}) {
    const token = uni.getStorageSync('access_token')
    if (token) {
        header = {
            "x-api-key": token
        }
    }
    return uni.request({
        url: baseApiUrl + url,
        method: 'PUT',
        data: params,
        header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            ...header
        }
    }).then(res => {
        uni.hideLoading();
        return res[1].data
        // console.log(res)
        // if (res[1].data.status && res[1].data.code == 200) {
        // } else {
        //     throw res[1].data
        // }
    }).catch(r => {
        uni.hideLoading();
        switch (r.code) {
            case 400:
                uni.clearStorageSync()
                break
            case 500:
                uni.showToast({
                    title: "服务器打瞌睡了~",
                    icon: 'none'
                })
                break
            default:
                uni.showToast({
                    title: r.message,
                    icon: 'none'
                })
                return Promise.reject()
                break
        }
    })
}
