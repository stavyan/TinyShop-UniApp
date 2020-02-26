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
			// uni.clearStorageSync();
			uni.removeStorage({
				key: 'userInfo'
			})
			uni.removeStorage({
				key: 'accessToken'
			})
			state.hasLogin = true;
			state.userInfo = provider.member;
			uni.setStorage({//缓存用户登陆状态
			    key: 'user',
			    data: provider
			});
			uni.setStorage({//缓存用户登陆状态
			    key: 'loginTime',
			    data: new Date().getTime() / 1000
			});
			uni.setStorage({//缓存用户登陆状态
			    key: 'userInfo',
			    data: provider.member
			})
			uni.setStorage({//缓存用户登陆状态
			    key: 'accessToken',
			    data: provider.access_token
			})
			uni.setStorage({//缓存用户登陆状态
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
