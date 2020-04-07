<template>
	<view class="container">
		<view class="list-cell b-b m-t" @tap="navTo('/pages/user/userinfo/userinfo')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">个人资料</text>
			<text class="cell-more iconfont iconyou"></text>
		</view>
		<view class="list-cell b-b" @tap="navTo('/pages/public/password?type=1')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">修改密码</text>
			<text class="cell-more iconfont iconyou"></text>
		</view>
		<view class="list-cell b-b" @tap="navTo('/pages/set/authorization/list')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">授权管理</text>
			<text class="cell-more iconfont iconyou"></text>
		</view>
		<view class="list-cell b-b m-t" @tap="navTo('/pages/set/invoice/invoice')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">发票管理</text>
			<text class="cell-more iconfont iconyou"></text>
		</view>
		<view class="list-cell b-b" @tap="navTo('/pages/set/invoice/list')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">开票历史</text>
			<text class="cell-more iconfont iconyou"></text>
		</view>
		<view class="list-cell m-t">
			<text class="cell-tit">消息推送</text>
			<switch checked color="#fa436a" @change="switchChange" />
		</view>
		<view class="list-cell m-t b-b" @tap="navTo('清除缓存')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">清除缓存</text>
			<text class="cell-tip">{{ currentStorageSize }} kb</text>
			<text class="cell-more iconfont iconyou"></text>
		</view>
		<view class="list-cell b-b" @tap="navTo('/pages/set/about/about')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">关于RF商城</text>
			<text class="cell-more iconfont iconyou"></text>
		</view>
		<view class="list-cell b-b">
			<text class="cell-tit">当前版本</text>
			<text class="cell-tip">当前版本 1.0.0</text>
			<text class="cell-more iconfont iconyou"></text>
		</view>
		<view class="list-cell m-t" @tap="navTo('/pages/set/feedback/list')">
			<text class="cell-tit">意见反馈</text>
			<text class="cell-more iconfont iconyou"></text>
		</view>
		<view class="list-cell log-out-btn" @tap="toLogout">
			<text class="cell-tit">退出登录</text>
		</view>
    <!--进度条加载-->
		<rf-load-progress :height="CustomBar" :progress="loadProgress"></rf-load-progress>
	</view>
</template>

<script>
	import {
		mapMutations, mapState
	} from 'vuex';
	import {logout} from "@/api/login";
	export default {
		data() {
			return {
				loadProgress: 0,
				CustomBar: this.CustomBar,
				currentStorageSize: 0,
				user: {},
			};
		},
		onLoad () {
			this.initData();
		},
		computed: {
			...mapState(['userInfo']),
		},
		methods:{
			...mapMutations(['login', 'logout']),
			initData () {
				console.log(this.CustomBar);
        this.user = uni.getStorageSync('user');
				const _this = this;
				uni.getStorageInfo({
					success (res) {
						_this.currentStorageSize = res.currentSize;
					}
				})
			},
			navTo(url){
				if (url === '清除缓存') {
					uni.showModal({
				    content: '确定要清除缓存吗',
				    success: (e)=>{
				    	if(e.confirm){
				    		this.currentStorageSize = 0;
				    		uni.clearStorageSync();
				    		this.LoadProgress();
				    	}
				    }
					});
				} else if (!url) {
					this.$api.msg('我还没写');
				} else {
					uni.navigateTo({
						url,
					})
				}
			},
			LoadProgress() {
				this.loadProgress = this.loadProgress + 6;
				if (this.loadProgress < 100) {
					setTimeout(() => {
						this.LoadProgress();
					}, 100)
				} else {
					this.loadProgress = 0;
          this.login(this.user);
          this.$api.msg('清除缓存成功')
				}
			},
			//退出登录
			toLogout(){
				uni.showModal({
				    content: '确定要退出登录么',
				    success: (e)=>{
				    	if(e.confirm){
				    		this.$post(`${logout}`).then(r => {
									this.logout();
									uni.reLaunch({
										url: '/pages/user/user'
									})
								})
				    	}
				    }
				});
			},
			//switch
			switchChange(e){
				let statusTip = e.detail.value ? '打开': '关闭';
				this.$api.msg(`${statusTip}消息推送`);
			},

		}
	}
</script>

<style lang='scss'>
	page{
		background: $page-color-base;
	}
</style>
