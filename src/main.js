import Vue from 'vue';
import store from './store';
import App from './App';
import  http, { get } from '@/utils/http';
import '@/common/css/iconfont/iconfont.css';
import '@/common/css/iconfont/iconfont.css';
import '@/common/css/reset.scss';
import '@/common/css/uni.scss';
import rfImage from '@/components/rf-image/rf-image';

// 封装msg方法
const msg = (title, duration=1500, mask=false, icon='none')=>{
	//统一提示方便全局修改
	if(Boolean(title) === false){
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
};

const prePage = ()=>{
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
};

Vue.config.productionTip = false;
Vue.prototype.$fire = new Vue();
Vue.prototype.$store = store;
Vue.prototype.$api = {msg, prePage};

Vue.prototype.$get = get;
Vue.prototype.$post = http.post;
Vue.prototype.$put = http.put;
Vue.prototype.$del = http.delete;

Vue.component('rfImage', rfImage)

App.mpType = 'app';

const app = new Vue({
    ...App
});
app.$mount();
