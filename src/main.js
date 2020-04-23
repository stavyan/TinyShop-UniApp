import Vue from 'vue';
import App from './App';

//引入全局存储
import store from '@/store';

// 引入全局配置
import $mAssetsPath from '@/config/assets.config.js';
import $mConfig from '@/config/index.config.js';
import $mRoutesConfig from '@/config/routes.config.js';
import $mFormRule from '@/config/formRule.config.js';
import $mConstDataConfig from '@/config/constData.config.js';
import $mWebsocketConfig from '@/config/websocket.config.js';

// 引入全局方法
import { http } from '@/utils/request';
import $mGraceChecker from '@/utils/graceChecker';
import $mHelper from '@/utils/helper';
import $mRouter from '@/utils/router';
import $mPayment from '@/utils/payment';

// 全局组件
import rfImage from '@/components/rf-image/rf-image';
import rfEmpty from '@/components/rf-empty';
import rfLoading from '@/components/rf-loading/rf-loading';
import rfLoadProgress from '@/components/rf-load-progress/rf-load-progress';

// 网络状态监听
uni.getNetworkType({
	success: function(res) {
		store.dispatch('networkStateChange', res.networkType);
	}
});

uni.onNetworkStatusChange(function(res) {
	store.dispatch('networkStateChange', res.networkType);
});

//挂载全局自定义方法
Vue.prototype.$mStore = store;

Vue.prototype.$http = http;
Vue.prototype.$mConfig = $mConfig;
Vue.prototype.$mAssetsPath = $mAssetsPath;
Vue.prototype.$mFormRule = $mFormRule;
Vue.prototype.$mRoutesConfig = $mRoutesConfig;
Vue.prototype.$mConstDataConfig = $mConstDataConfig;
Vue.prototype.$mWebsocketConfig = $mWebsocketConfig;

Vue.prototype.$mGraceChecker = $mGraceChecker;
Vue.prototype.$mHelper = $mHelper;
Vue.prototype.$mRouter = $mRouter;
Vue.prototype.$mPayment = $mPayment;

Vue.component('rfImage', rfImage);
Vue.component('rfEmpty', rfEmpty);
Vue.component('rfLoading', rfLoading);
Vue.component('rfLoadProgress', rfLoadProgress);

if (process.env.NODE_ENV === 'production') {
	Vue.config.productionTip = false;
}

// 路由导航
$mRouter.beforeEach((navType, to) => {
	if (to.route === undefined)
		throw '路由钩子函数中没有找到to对象，路由信息:' + JSON.stringify(to);
	if (to.route === $mRoutesConfig.login.path && store.getters.hasLogin) {
		uni.reLaunch({
			url: $mHelper.objParseUrlAndParam($mRoutesConfig.main.path)
		});
		return;
	}
	// 过滤需要权限的页面
	if (to.route.requiresAuth) {
		if (store.getters.hasLogin) {
			// 已经登录
			uni[navType]({
				url: $mHelper.objParseUrlAndParam(to.route.path, to.query)
			});
		} else {
			// 登录成功后的重定向地址和参数
			let query = {
				redirectUrl: to.route.path,
				...to.query
			};
			// 没有登录 是否强制登录?
			if (store.state.forcedLogin) {
				uni.redirectTo({
					url: $mHelper.objParseUrlAndParam($mRoutesConfig.login.path, query)
				});
			} else {
				uni.navigateTo({
					url: $mHelper.objParseUrlAndParam($mRoutesConfig.login.path, query)
				});
			}
		}
	} else {
		uni[navType]({
			url: $mHelper.objParseUrlAndParam(to.route, to.query)
		});
	}
});

App.mpType = 'app';

const app = new Vue({
	...App
});
app.$mount();
