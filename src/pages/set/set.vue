<template>
	<view class="container">
		<view class="list-cell b-b m-t" @click="navTo('/pages/userinfo/userinfo')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">个人资料</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b" @click="navTo('/pages/public/password?type=1')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">修改密码</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b" @click="navTo('/pages/third-party/list')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">授权管理</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
<!--		<view class="list-cell b-b" @click="navTo('/pages/address/address')" hover-class="cell-hover" :hover-stay-time="50">-->
<!--			<text class="cell-tit">收货地址</text>-->
<!--			<text class="cell-more yticon icon-you"></text>-->
<!--		</view>-->
		<view class="list-cell b-b m-t" @click="navTo('/pages/invoice/invoice')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">发票管理</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b" @click="navTo('/pages/invoice/list')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">开票历史</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<!--<view class="list-cell" @click="navTo('实名认证')" hover-class="cell-hover" :hover-stay-time="50">-->
			<!--<text class="cell-tit">实名认证</text>-->
			<!--<text class="cell-more yticon icon-you"></text>-->
		<!--</view>-->

		<view class="list-cell m-t">
			<text class="cell-tit">消息推送</text>
			<switch checked color="#fa436a" @change="switchChange" />
		</view>
		<view class="list-cell m-t b-b" @click="navTo('清除缓存')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">清除缓存</text>
			<text class="cell-tip">{{ currentStorageSize }} kb</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b" @click="navTo('/pages/about/about')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">关于RF商城</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b">
			<text class="cell-tit">当前版本</text>
			<text class="cell-tip">当前版本 beta 1.0</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell m-t" @click="navTo('/pages/feedback/list')">
			<text class="cell-tit">意见反馈</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell log-out-btn" @click="toLogout">
			<text class="cell-tit">退出登录</text>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations, mapState
	} from 'vuex';
	import {logout} from "../../api/login";
	export default {
		data() {
			return {
				currentStorageSize: 0
			};
		},
		onLoad () {
			this.initData();
		},
		computed: {
			...mapState(['userInfo'])
		},
		methods:{
			initData () {
				const _this = this;
				uni.getStorageInfo({
					success (res) {
						_this.currentStorageSize = res.currentSize;
					}
				})
			},
			...mapMutations(['logout']),
			navTo(url){
				if (url === '清除缓存') {
					uni.showModal({
				    content: '确定要清除缓存吗',
				    success: (e)=>{
				    	if(e.confirm){
				    		this.currentStorageSize = 0;
				    	}
				    }
					});
				} else if (!url) {
					uni.showToast({ title: '我还没写', icon: "none" });
				} else {
					uni.navigateTo({
						url,
					})
				}
			},
			//退出登录
			toLogout(){
				uni.showModal({
				    content: '确定要退出登录么',
				    success: (e)=>{
				    	if(e.confirm){
				    		this.$post(`${logout}`).then(r => {
									if (r.code === 200) {
										this.logout();
										uni.reLaunch({
											url: '/pages/user/user'
										})
									} else {
										uni.showToast({ title: r.message, icon: "none" });
									}
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
	.list-cell{
		display:flex;
		align-items:baseline;
		padding: 20upx $page-row-spacing;
		line-height:60upx;
		position:relative;
		background: #fff;
		justify-content: center;
		&.log-out-btn{
			margin-top: 40upx;
			.cell-tit{
				color: $uni-color-primary;
				text-align: center;
				margin-right: 0;
			}
		}
		&.cell-hover{
			background:#fafafa;
		}
		&.b-b:after{
			left: 30upx;
		}
		&.m-t{
			margin-top: 16upx;
		}
		.cell-more{
			align-self: baseline;
			font-size:$font-lg;
			color:$font-color-light;
			margin-left:10upx;
		}
		.cell-tit{
			flex: 1;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			margin-right:10upx;
		}
		.cell-tip{
			font-size: $font-base;
			color: $font-color-light;
		}
		switch{
			transform: translateX(16upx) scale(.84);
		}
	}
</style>
