<template>
	<view class="set">
		<view class="list-cell b-b" :class="{'m-t': item.class === 'mT'}" v-for="item in setList" :key="item.title" @tap="navTo(item.url)" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">{{item.title}}</text>
			<text class="cell-tip">{{item.content}}</text>
			<text class="cell-more iconfont iconyou"></text>
		</view>
		<view class="list-cell m-t">
			<text class="cell-tit">消息推送</text>
			<switch checked color="#fa436a" @change="switchChange" />
		</view>
		<view class="list-cell log-out-btn" @tap="toLogout">
			<text class="cell-tit">退出登录</text>
		</view>
    <!--进度条加载-->
		<rf-load-progress :height="CustomBar" :progress="loadProgress"></rf-load-progress>
	</view>
</template>

<script>
	import {logout} from '@/api/login';
	export default {
		data() {
			return {
				loadProgress: 0,
				CustomBar: this.CustomBar,
				user: {},
				setList: [
					{title: '个人资料', url: '/pages/user/userinfo/userinfo', content: ''},
					{title: '修改密码', url: '/pages/public/password?type=1', content: ''},
					{title: '授权管理', url: '/pages/set/authorization/list', content: ''},
					{title: '发票管理', url: '/pages/set/invoice/invoice', content: '', class: 'mT'},
					{title: '开票历史', url: '/pages/set/invoice/list', content: ''},
					{title: '清除缓存', url: 'clearCache', content: ''},
					{title: '关于商城', url: '/pages/set/about/about', content: '', class: 'mT'},
					{title: '当前版本', url: '', content: '当前版本 1.0.0'},
					{title: '意见反馈', url: '/pages/set/feedback/list', content: ''}
				]
			};
		},
		onLoad () {
			this.initData();
		},
		methods:{
			// 初始化数据
			initData () {
        this.user = uni.getStorageSync('user');
        // 缓存大小
				this.setList[5].content = `${uni.getStorageInfoSync().currentSize} kb`;
			},
			// 通用跳转
			navTo(route){
				if (!route) return;
				if (route === 'clearCache') {
					uni.showModal({
				    content: '确定要清除缓存吗',
				    success: (e)=>{
				    	if(e.confirm){
				    		this.setList[5].content = '0 kb';
				    		uni.clearStorageSync();
				    		this.handleLoadProgress();
				    	}
				    }
					});
					return;
				}
				this.$mRouter.push({route});
			},
			// 加载进度条
			handleLoadProgress() {
				this.loadProgress = this.loadProgress + 6;
				if (this.loadProgress < 100) {
					setTimeout(() => {
						this.handleLoadProgress();
					}, 100)
				} else {
					this.loadProgress = 0;
					this.$mStore.commit('login', this.user);
          this.$mHelper.toast('清除缓存成功')
				}
			},
			//退出登录
			toLogout(){
				uni.showModal({
				    content: '确定要退出登录么',
				    success: (e)=>{
				    	if(e.confirm){
				    		this.$http.post(`${logout}`).then(() => {
									this.$mStore.commit('logout');
									uni.reLaunch({
										url: '/pages/user/user'
									})
								})
				    	}
				    }
				});
			},
			// 监听消息推送是否打开
			switchChange(e){
				let statusTip = e.detail.value ? '打开': '关闭';
				this.$mHelper.toast(`${statusTip}消息推送`);
			}

		}
	}
</script>

<style lang='scss'>
	page{
		background: $page-color-base;
	}
	.set {
		padding-top: $spacing-base;
	}
</style>
