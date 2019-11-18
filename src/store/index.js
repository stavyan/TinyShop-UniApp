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
			state.hasLogin = true;
			state.userInfo = provider;
			uni.setStorage({//缓存用户登陆状态
			    key: 'userInfo',
			    data: provider
			})
			uni.setStorage({//缓存用户登陆状态
			    key: 'access_token',
			    data: provider.access_token
			})
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorage({
                key: 'userInfo'
            })
			uni.removeStorage({
                key: 'access_token'
            })
		}
	},
	actions: {

	}
})

export default store
