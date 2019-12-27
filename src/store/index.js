import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		userInfo: {},
	},
	mutations: {
		login(state, provider) {
			uni.clearStorageSync();
			state.hasLogin = true;
			state.userInfo = provider.member;
			uni.setStorageSync({//缓存用户登陆状态
			    key: 'user',
			    data: provider
			});
			uni.setStorageSync({//缓存用户登陆状态
			    key: 'loginTime',
			    data: new Date().getTime() / 1000
			});
			uni.setStorageSync({//缓存用户登陆状态
			    key: 'userInfo',
			    data: provider.member
			})
			uni.setStorageSync({//缓存用户登陆状态
			    key: 'accessToken',
			    data: provider.access_token
			})
			uni.setStorageSync({//缓存用户登陆状态
			    key: 'refreshToken',
			    data: provider.refresh_token
			})
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorage({
                key: 'userInfo'
            })
			uni.removeStorage({
                key: 'accessToken'
            })
		}
	},
	actions: {
	}
})

export default store
