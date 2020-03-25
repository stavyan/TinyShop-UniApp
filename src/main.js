import Vue from 'vue';
import store from './store';
import App from './App';
import http, {get} from '@/utils/http';

// 导入colorUI
import "@/common/colorui/main.css";
import "@/common/colorui/icon.css";
import "@/common/colorui/animation.css";

// 导入阿里巴巴矢量图标库
import '@/common/css/iconfont/iconfont.css';
import '@/common/css/reset.scss';
import '@/common/css/uni.scss';

// 全局组件
import rfImage from '@/components/rf-image/rf-image';
import rfLoading from '@/components/rf-loading/rf-loading';
import rfLoadProgress from '@/components/rf-load-progress/rf-load-progress';

// 封装msg方法
const msg = (title, duration = 1500, mask = false, icon = 'none') => {
	//统一提示方便全局修改
	if (Boolean(title) === false) {
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
};

const prePage = () => {
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
};

Vue.config.productionTip = false;
Vue.prototype.$store = store;
Vue.prototype.$api = {msg, prePage};

Vue.prototype.$get = get;
Vue.prototype.$post = http.post;
Vue.prototype.$put = http.put;
Vue.prototype.$del = http.delete;

Vue.component('rfImage', rfImage);
Vue.component('rfLoading', rfLoading);
Vue.component('rfLoadProgress', rfLoadProgress);

App.mpType = 'app';

const app = new Vue({
	...App
});
app.$mount();
