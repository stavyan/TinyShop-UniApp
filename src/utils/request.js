function request(url, params, header, method) {
    const baseApiUrl = "https://www.yllook.com/api";
    // const baseApiUrl = "";
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
        method: method,
        data: params,
        header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            ...header
        }
    }).then(res => {
        uni.hideLoading();
        return res[1].data
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

export function get(url, params = {}, header = {}) {
    const method = "GET";
    return request(url, params, header, method);
}


export function post(url, params = {}, header = {}) {
    const method = "POST";
    return request(url, params, header, method);
}
export function put(url, params = {}, header = {}) {
    const method = "PUT";
    return request(url, params, header, method);
}
export function del(url, params = {}, header = {}) {
    const method = "DELETE";
    return request(url, params, header, method);
}
