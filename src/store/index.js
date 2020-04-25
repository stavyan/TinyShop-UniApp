import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const ACCESSTOKEN = uni.getStorageSync('accessToken') || '';
const REFERRER = uni.getStorageSync('referrer') || '';
const USER = uni.getStorageSync('user') || {};
const REFRESHTOKEN = uni.getStorageSync('refreshToken') || '';

const store = new Vuex.Store({
    state: {
        //用户token
        accessToken: ACCESSTOKEN,
        //用户信息
        userInfo: USER.member,
        //推荐人
        referrer: REFERRER,
        //小程序openid
        openId: '',
        //网络状态，用于下载提醒
        networkState: 'unknown',
        refreshToken: REFRESHTOKEN
    },
    getters: {
		// 获取网络状态
		networkStatus: state => {
			return state.networkState;
		},
        // 判断用户是否登录
        hasLogin: state => {
            if (state.accessToken) {
                return true;
            } else {
                return false
            }
        }
    },
    mutations: {
        login(state, provider) {
			state.accessToken=provider.access_token;
			state.refreshToken=provider.refresh_token;
			state.userInfo = provider.member;
			state.user = provider;
            uni.setStorageSync('user', provider);
			uni.setStorageSync('accessToken', provider.access_token);
			uni.setStorageSync('refreshToken', provider.refresh_token);
			uni.setStorageSync('userInfo', provider.member);
        },
        logout(state) {
            state.accessToken = '';
            state.refreshToken = '';
            state.userInfo = {};
            uni.removeStorageSync('accessToken');
            uni.removeStorageSync('refreshToken');
            uni.removeStorageSync('userInfo');
        },
        setReferrer(state, referrer) {
            state.referrer = referrer;
            uni.setStorageSync('referrer', referrer);
        },
        setOpenId(state, openId) {
            state.openId = openId;
            uni.setStorageSync('openId', openId);
        },
        setNetworkState(state, provider) {
            state.networkState = provider;
        }
    },
    actions: {
        networkStateChange({commit}, info) {
            commit('setNetworkState', info);
        },
        logout({commit}) {
            commit('logout');
        }
    }
})

export default store
