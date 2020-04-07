import axios from './uni-axios'
import {refreshToken} from "@/api/login";
import {baseUrl} from "@/api/params";

// 创建自定义接口服务实例
const http = axios.create({
	baseURL: baseUrl, // baseUrl 公共前缀
	timeout: 60 * 1000,  // 不可超过 manifest.json 中配置 networkTimeout的超时时间
	// #ifdef H5
	withCredentials: true,
	// #endif
	headers: {
		'Content-Type': 'application/json'
	},
});

// 拦截器 在请求之前拦截
http.interceptors.request.use(async config => {
	const token = uni.getStorageSync('accessToken')
	const user = uni.getStorageSync('user') || {};
	const userInfo = uni.getStorageSync('userInfo');
	const merchantId = uni.getStorageSync('merchantId') || 1;
	let commonHeader = {};
	const res = uni.getSystemInfoSync();
	const headers11 = {
		'device-name': res.brand, // 设备名称
		'width': res.screenWidth, // 屏幕宽度
		'height': res.screenHeight, // 屏幕高度
		'os': res.platform, // 客户端平台
		'os-version': res.system // 操作系统版本
	};
	if (token && userInfo) {
		commonHeader = {
			"x-api-key": token,
			// "merchant-id": userInfo.merchant_id
			"merchant-id": merchantId
		};
	}
	config.headers = {...config.headers, ...commonHeader,};
	const loginTime = uni.getStorageSync('loginTime');
	const currentTime = new Date().getTime() / 1000;
	const config1 = config;
	if (!token || (currentTime + 50 - loginTime < user.expiration_time)) {
		commonHeader = {
			"x-api-key": token,
			"merchant-id": merchantId,
		};
		config1.headers = await {'Content-Type': 'application/json', ...commonHeader, ...headers11};
		return config1;
	} else { //刷新token
		let params = {}
		/*  #ifdef APP-PLUS  */
		params.group = 'tinyShopApp'
		/*  #endif  */
		/*  #ifdef H5  */
		params.group = 'tinyShopH5'
		/*  #endif  */
		/*  #ifdef  MP-WEIXIN  */
		params.group = 'tinyShopWechatMq'
		/*  #endif  */
		/*  #ifdef  MP-QQ  */
		params.group = 'tinyShopQqMq'
		/*  #endif  */
		params.refresh_token = user.refresh_token;
		await axios.post(refreshToken, {
			...params,
		}).then(async r => {
			const data = r.data;
			if (data.code === 200) {
				uni.setStorageSync('accessToken', data.data.access_token);
				uni.setStorageSync('user', data.data);
				uni.setStorageSync('userInfo', data.data.member)
				uni.setStorageSync('loginTime', new Date().getTime() / 1000);
				uni.setStorageSync('refreshToken', data.data.refresh_token);
				const header = {
					"x-api-key": data.data.access_token,
					"merchant-id": merchantId,
				};
				config.headers = {'Content-Type': 'application/json', ...header};
				return config;
			} else {
				uni.clearStorageSync();
				uni.showModal({
					content: '会话已过期，是否跳转登录页面？',
					success: (confirmRes) => {
						if (confirmRes.confirm) {
							uni.reLaunch({
								url: '/pages/public/logintype'
							});
						}
					}
				});
			}
		}).catch(() => {
			uni.clearStorage();
			uni.showModal({
				content: '会话已过期，是否跳转登录页面？',
				success: (confirmRes) => {
					if (confirmRes.confirm) {
						uni.reLaunch({
							url: '/pages/public/logintype'
						});
					}
				}
			});
		});
		return config1;
	}
}, (error) => {
	// 对请求错误做些什么
	return Promise.reject(error);
});

// 拦截器 在请求之后拦截
http.interceptors.response.use(response => {
	// uni.hideLoading();
	switch (response.data.code) {
		case 200:
			return response.data;
			break;
		case 401:
			uni.removeTabBarBadge({index: 2});
			uni.clearStorageSync();
			uni.showModal({
				content: '会话已过期，是否跳转登录页面？',
				success: (confirmRes) => {
					if (confirmRes.confirm) {
						uni.reLaunch({
							url: '/pages/public/logintype'
						});
					}
				}
			});
			throw response.data.message;
			break;
		case 400:
			uni.showToast({title: "错误的请求", icon: 'none'});
			throw response.data.message;
			break;
		case 405:
			uni.showToast({title: "当前操作不被允许", icon: 'none'});
			throw response.data.message;
			break;
		case 404:
			uni.showToast({title: response.data.message, icon: 'none'});
			throw response.data.message;
			break;
		case 429:
			uni.showToast({title: "请求过多，先休息一下吧~", icon: 'none'});
			throw response.data.message;
			break;
		case 500:
			uni.showToast({title: "服务器打瞌睡了~", icon: 'none'});
			throw response.data.message;
			break;
		default:
			uni.showToast({title: response.data.message, icon: "none"});
			throw response.data.message;
			break;
	}
}, error => {
	// uni.hideLoading();
	return Promise.reject(error.message)
});

export default http;

export function get(url, params = {}) {
	return new Promise((resolve, reject) => {
		http
			.get(url, {
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
