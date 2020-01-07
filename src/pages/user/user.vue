<template>
	<view class="container">
			<view class="user-section">
				<image class="bg" src="/static/user-bg2.jpg"></image>
				<view
            open-type="getUserInfo"
            class="user-info-box"
            @click="navTo(userInfo ? '/pages/userinfo/userinfo' : 'login')">
					<view class="portrait-box">
						<image class="portrait" :src="(userInfo && userInfo.head_portrait	) || user_info.headimgurl || '/static/missing-face.png'"></image>
						<!--#ifdef MP-WEIXIN-->
						<text class="username" v-if="token">
							{{ userInfo && (userInfo.nickname || userInfo.realname) || user_info.nickname ||'请先登录'}}
						</text>
						<button v-if="!token" class='username' type='primary' open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="wxGetUserInfo">
								授权登录
						</button>
						<!--#endif -->
						<!--#ifndef MP-WEIXIN-->
						<text class="username">
							{{ userInfo && (userInfo.nickname || userInfo.realname) || user_info.nickname ||'请先登录'}}
						</text>
						<!--#endif -->
					</view>
					<!--<view class="info-box">-->
					<!--</view>-->
					<!--<view class="recharge" v-if="token">-->
						<!--<view class="img" @click.stop="navTo('/pages/user/recharge')">-->
							<!--<view class="icon chongzhi"></view>-->
							<!--<view class="text">充值</view>-->
						<!--</view>-->
					<!--</view>-->
				</view>
				<view class="vip-card-box">
					<image class="card-bg" src="/static/vip-card-bg.png" mode=""></image>
					<!--<view class="b-btn">-->
						<!--立即开通-->
					<!--</view>-->
					<view class="tit">
						<text class="yticon icon-iLinkapp-"></text>
						欢迎来到RageFrame商城
					</view>
					<text class="e-m">RageFrame</text>
					<text class="e-b">正在开发中...</text>
				</view>
			</view>
			<view
				class="cover-container"
				:style="[{
					transform: coverTransform,
					transition: coverTransition
				}]"
				@touchstart="coverTouchstart"
				@touchmove="coverTouchmove"
				@touchend="coverTouchend"
			>
				<image class="arc" src="/static/arc.png"></image>
				<view class="tj-sction">
					<view class="tj-item" @click="navTo('/pages/user/account')">
						<text class="num">
							{{ userInfo && userInfo.account && userInfo.account.user_money || '0' }}
						</text>
						<text>余额</text>
					</view>
					<view class="tj-item" @click="navTo('/pages/user/coupon?type=1')">
						<text class="num">{{ userInfo && userInfo.coupon_num || '0' }}</text>
						<text>优惠券</text>
					</view>
					<view class="tj-item" @click="navTo('/pages/user/integral')">
						<text class="num">
							{{ userInfo && userInfo.account && userInfo.account.user_integral || '0' }}
						</text>
						<text>积分</text>
					</view>
				</view>
				<!-- 订单 -->
				<view class="order-section">
					<view class="order-item" @click="navTo('/pages/order/order?state=0')" hover-class="common-hover"  :hover-stay-time="50">
						<text class="yticon icon-daifukuan"></text>
						<text>待付款</text>
					</view>
					<view class="order-item" @click="navTo('/pages/order/order?state=1')"  hover-class="common-hover" :hover-stay-time="50">
						<text class="yticon icon-shouye "></text>
						<text>待发货</text>
					</view>
					<view class="order-item" @click="navTo('/pages/order/order?state=2')" hover-class="common-hover"  :hover-stay-time="50">
						<text class="yticon icon-yishouhuo"></text>
						<text>待收货</text>
					</view>
					<view class="order-item" @click="navTo('/pages/order/order?state=3')" hover-class="common-hover"  :hover-stay-time="50">
						<text class="yticon icon-pingjia"></text>
						<text>评价</text>
					</view>
					<view class="order-item" @click="navTo()" hover-class="common-hover"  :hover-stay-time="50">
						<text class="yticon icon-shouhoutuikuan"></text>
						<text>退款/售后</text>
					</view>
				</view>
				<!-- 浏览历史 -->
				<view class="history-section icon">
					<view class="sec-header" @click="navTo('/pages/footprint/footprint')">
						<text class="yticon icon-lishijilu"></text>
						<text>我的足迹</text>
					</view>
					<scroll-view scroll-x class="h-list" v-if="token">
						<view class="h-item" v-for="item in footList" :key="item.id">
							<image class="h-item-img" @click.stop="navTo(`/pages/product/product?id=${item.product.id}`)"
										 :src="item.product.picture"
										 mode="aspectFill">
							</image>
							<text class="h-item-text">{{ item.product.name }}</text>
						</view>
					</scroll-view>
					<view class="no-foot-print" v-else>
						<uni-icons class="no-foot-print-icon" color="#fa436a" size="28"
											 type="locked" />
						登陆后查看
					</view>
					<list-cell icon="icon-iconfontweixin" iconColor="#e07472" @eventClick="navTo('/pages/user/coupon-center')" title="去领券中心" tips="速来领取大额优惠券"></list-cell>
					<list-cell icon="icon-dizhi" iconColor="#5fcda2" title="地址管理" @eventClick="navTo('/pages/address/address')"></list-cell>
					<list-cell icon="icon-shoucang_xuanzhongzhuangtai" iconColor="#54b4ef" @eventClick="navTo('/pages/collection/collection')" title="我的收藏"></list-cell>
					<list-cell icon="icon-share" iconColor="#9789f7" title="分享" @eventClick="navTo()" tips="邀请好友赢10万大礼"></list-cell>
					<list-cell icon="icon-pinglun-copy" iconColor="#ee883b" @eventClick="navTo()" title="晒单" tips="晒单抢红包"></list-cell>
					<list-cell icon="icon-shezhi1" iconColor="#e07472" title="设置" border="" @eventClick="navTo('/pages/set/set')"></list-cell>
				</view>
			</view>
		</view>
</template>
<script>
	import listCell from '@/components/mix-list-cell';
  import {footPrintList, memberInfo} from "../../api/userInfo";
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import {mpWechatLogin, wechatH5Login} from "../../api/login";
	import {mapMutations} from "vuex";
	let startY = 0, moveY = 0, pageAtTop = true;
    export default {
		components: {
			listCell,
			uniIcons
		},
		data(){
			return {
				coverTransform: 'translateY(0px)',
				coverTransition: '0s',
				moving: false,
				userInfo: {},
				token: null,
				footList: [],
				code: null,
				user_info: {}
			}
		},
		async onLoad(options){
			this.code = options.code;
			if (this.code) {
         this.$get(wechatH5Login, {
         	code: this.code
				 }).then(async r => {
					 if (r.code === 200) {
						 if (!r.data.login) {
							 this.user_info = r.data.user_info.original;
							 uni.showModal({
								 content: '你尚未绑定账号，是否跳转登录页面？',
								 success: (confirmRes) => {
									 if (confirmRes.confirm) {
										 const url = `/pages/public/login?userInfo=${JSON.stringify(this.user_info)}`;
										 uni.navigateTo({
											 url
										 })
									 }
								 }
							 });
						 } else {
							 this.userInfo = r.data.user_info.member || undefined;
							 this.token = r.data.user_info.access_token || undefined;
							 await this.login(r.data.user_info);
						 }
					 }
				 })
			}
			this.initData();
		},
		// #ifndef MP
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				this.navTo('/pages/set/set');
			}else if(index === 1){
				// #ifdef APP-PLUS
				const pages = getCurrentPages();
				const page = pages[pages.length - 1];
				const currentWebview = page.$getAppWebview();
				currentWebview.hideTitleNViewButtonRedDot({
					index
				});
				// #endif
				uni.navigateTo({
					url: '/pages/notice/notice'
				})
			}
		},
		// #endif
		methods: {
			...mapMutations(['login']),
			/**
			 *@des 分享
			 *@author stav stavyan@qq.com
			 *@blog https://stavtop.club
			 *@date 2019/11/25 15:53:35
			 */
			share(){
				this.$refs.share.toggleMask();
			},
			wxGetUserInfo() {
			},
			/**
			 *@des 初始化数据
			 *@author stav stavyan@qq.com
			 *@blog https://stavtop.club
			 *@date 2019/11/21 09:34:58
			 */
			async initData() {
				this.userInfo = uni.getStorageSync('userInfo') || undefined;
				this.token = uni.getStorageSync('accessToken') || undefined;
				if (this.token) {
					await this.getMemberInfo();
				}
			},
      async getMemberInfo() {
         this.$get(memberInfo).then(r => {
            if (r.code === 200) {
								this.getFootPrintList();
                uni.setStorage({
                    key: 'userInfo',
                    data: r.data
                })
                this.userInfo = r.data || undefined;
            } else {
                uni.showToast({title: r.message, icon: "none"});
            }
        })
      },
			/**
			 *@des 获取足迹列表
			 *@author stav stavyan@qq.com
			 *@blog https://stavtop.club
			 *@date 2019/11/21 09:39:37
			 */
			async getFootPrintList() {
				await this.$get(`${footPrintList}`).then(r => {
					if (r.code === 200) {
						this.footList = r.data
					} else {
						uni.showToast({title: r.message, icon: "none"});
					}
				}).catch(err => {
					console.log(err)
				})
			},
			/**
			 * 统一跳转接口,拦截未登录路由
			 * navigator标签现在默认没有转场动画，所以用navToview
			 */
			navTo(url){
				const _this = this;
				if (!url) {
					uni.showToast({title: '我还没写', icon: "none"});
					return;
				}
				if(!this.token){
					url = '/pages/public/login';
					/*  #ifdef H5  */
					if (this.isWechat()) {
          	uni.showModal({
            content: '是否授权登录?',
            success: (confirmRes)=> {
              if (confirmRes.confirm) {
								const href = window.location.href;
								window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?
								appid=wxc052ebc5038f31c0&
								redirect_uri=${href}&
								response_type=code&
								scope=snsapi_userinfo&
								state=STATE#wechat_redirect`;
              }
							if (confirmRes.cancel) {
							 uni.navigateTo({
								 url
							 })
						 }
            }
          });
					} else {
          	uni.showModal({
              content: '你暂未登陆，是否跳转登录页面？',
              success: (confirmRes)=> {
                if (confirmRes.confirm) {
                  uni.navigateTo({
                    url
                  })
                }
              }
            });
					}
					/*  #endif  */
          /*  #ifdef MP-WEIXIN */
          uni.showModal({
            content: '你暂未登陆，是否跳转登录页面？',
            success: (confirmRes)=> {
              if (confirmRes.confirm) {
                uni.login({
                  provider: 'weixin',
                  success: function (loginRes) {
                    uni.getUserInfo({
                      provider: 'weixin',
                      success: function (infoRes) {
                    		console.log(infoRes)
                        _this.$post(mpWechatLogin, {
													signature: infoRes.signature,
													encryptedData: infoRes.encryptedData,
													rawData: infoRes.rawData,
													iv: infoRes.iv,
													code: loginRes.code
												 }).then(async r => {
													 if (r.code === 200) {
														 if (!r.data.login) {
															 _this.user_info = r.data.user_info;
															 uni.showModal({
																 content: '你尚未绑定账号，是否跳转登录页面？',
																 success: (confirmRes) => {
																	 if (confirmRes.confirm) {
																		 const url = `/pages/public/login?userInfo=${JSON.stringify(_this.user_info)}`;
																		 uni.navigateTo({
																			 url
																		 })
																	 }
																 }
															 });
														 } else {
															 _this.userInfo = r.data.user_info.member || undefined;
															 _this.token = r.data.user_info.access_token || undefined;
															 await _this.login(r.data.user_info);
															 _this.initData();
															uni.showToast({title: '已为您授权登录', icon: "none"});
														 }
													 } else {
														uni.showToast({title: r.message, icon: "none"});
													 }
												 })
                      },
                      fail: function (err) {
                        console.log(err);
                      },
                    });
                  }
                });
              }
            }
          });
          /*  #endif  */
				} else {
          uni.navigateTo({
            url
          })
        }
			},
			isWechat(){
					const ua = window.navigator.userAgent.toLowerCase();
					if(ua.match(/micromessenger/i) == 'micromessenger'){
							return true;
					}else{
							return false;
					}
			},
			/**
			 *  会员卡下拉和回弹
			 *  1.关闭bounce避免ios端下拉冲突
			 *  2.由于touchmove事件的缺陷（以前做小程序就遇到，比如20跳到40，h5反而好很多），下拉的时候会有掉帧的感觉
			 *    transition设置0.1秒延迟，让css来过渡这段空窗期
			 *  3.回弹效果可修改曲线值来调整效果，推荐一个好用的bezier生成工具 http://cubic-bezier.com/
			 */
			coverTouchstart(e){
				if(pageAtTop === false){
					return;
				}
				this.coverTransition = 'transform .1s linear';
				startY = e.touches[0].clientY;
			},
			coverTouchmove(e){
				moveY = e.touches[0].clientY;
				let moveDistance = moveY - startY;
				if(moveDistance < 0){
					this.moving = false;
					return;
				}
				this.moving = true;
				if(moveDistance >= 80 && moveDistance < 100){
					moveDistance = 80;
				}
				if(moveDistance > 0 && moveDistance <= 80){
					this.coverTransform = `translateY(${moveDistance}px)`;
				}
			},
			coverTouchend(){
				if(this.moving === false){
					return;
				}
				this.moving = false;
				this.coverTransition = 'transform 0.3s cubic-bezier(.21,1.93,.53,.64)';
				this.coverTransform = 'translateY(0px)';
				}
			}
	}
</script>
<style lang='scss' scoped>
	/* 分享 */
	.share-section{
		display:flex;
		align-items:center;
		color: $font-color-base;
		background: linear-gradient(left, #fdf5f6, #fbebf6);
		padding: 12upx 30upx;
		.share-icon{
			display:flex;
			align-items:center;
			width: 70upx;
			height: 30upx;
			line-height: 1;
			border: 1px solid $uni-color-primary;
			border-radius: 4upx;
			position:relative;
			overflow: hidden;
			font-size: 22upx;
			color: $uni-color-primary;
			&:after{
				content: '';
				width: 50upx;
				height: 50upx;
				border-radius: 50%;
				left: -20upx;
				top: -12upx;
				position:absolute;
				background: $uni-color-primary;
			}
		}
		.icon-xingxing{
			position:relative;
			z-index: 1;
			font-size: 24upx;
			margin-left: 2upx;
			margin-right: 10upx;
			color: #fff;
			line-height: 1;
		}
		.tit{
			font-size: $font-base;
			margin-left:10upx;
		}
		.icon-bangzhu1{
			padding: 10upx;
			font-size: 30upx;
			line-height: 1;
		}
		.share-btn{
			flex: 1;
			text-align:right;
			font-size: $font-sm;
			color: $uni-color-primary;
		}
		.icon-you{
			font-size: $font-sm;
			margin-left: 4upx;
			color: $uni-color-primary;
		}
	}
	%flex-center {
	 display:flex;
	 flex-direction: column;
	 justify-content: center;
	 align-items: center;
	}
	%section {
	  display:flex;
	  justify-content: space-around;
	  align-content: center;
	  background: #fff;
	  border-radius: 10upx;
	}

	.user-section{
		height: 520upx;
		padding: 100upx 30upx 0;
		position:relative;
		.bg{
			position:absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			filter: blur(1px);
			opacity: .7;
		}
	}
	.user-info-box{
		height: 180upx;
		display:flex;
		align-items:center;
		position:relative;
		z-index: 1;
		justify-content: space-between;
		.portrait-box {
			display: flex;
			align-items: center;
			.portrait{
				width: 130upx;
				height: 130upx;
				border:5upx solid #fff;
				border-radius: 50%;
			}
			.username {
				font-size: $font-lg + 6upx;
				color: $font-color-dark;
				margin-left: 20upx;
			}
			button {
				background-color: transparent;
				font-size: $font-lg + 6upx;
				color: $font-color-dark;
				border: none;
			}
			button::after {
				border: none;
			}
		}
		.recharge {
			margin-right: 10upx;
			text-align: center;
			.icon {
				color: $base-color;
				font-size: $font-lg + 16upx;
				line-height: 1.2;
				margin: 5upx 0;
			}
			.text {
				color: $font-color-base;
				font-size: $font-sm;
			}
		}
	}

	.vip-card-box{
		display:flex;
		flex-direction: column;
		color: #f7d680;
		height: 240upx;
		background: linear-gradient(left, rgba(0,0,0,.7), rgba(0,0,0,.8));
		border-radius: 16upx 16upx 0 0;
		overflow: hidden;
		position: relative;
		padding: 20upx 24upx;
		.card-bg{
			position:absolute;
			top: 20upx;
			right: 0;
			width: 380upx;
			height: 260upx;
		}
		.b-btn{
			position: absolute;
			right: 20upx;
			top: 16upx;
			width: 132upx;
			height: 40upx;
			text-align: center;
			line-height: 40upx;
			font-size: 22upx;
			color: #36343c;
			border-radius: 20px;
			background: linear-gradient(left, #f9e6af, #ffd465);
			z-index: 1;
		}
		.tit{
			font-size: $font-base+2upx;
			color: #f7d680;
			margin-bottom: 28upx;
			.yticon{
				color: #f6e5a3;
				margin-right: 16upx;
			}
		}
		.e-b{
			font-size: $font-sm;
			color: #d8cba9;
			margin-top: 10upx;
		}
	}
	.cover-container{
		background: $page-color-base;
		margin-top: -150upx;
		padding: 0 30upx;
		position:relative;
		background: #f5f5f5;
		padding-bottom: 20upx;
		.arc{
			position:absolute;
			left: 0;
			top: -34upx;
			width: 100%;
			height: 36upx;
		}
	}
	.tj-sction{
		@extend %section;
		.tj-item{
			@extend %flex-center;
			flex-direction: column;
			height: 140upx;
			font-size: $font-sm;
			color: #75787d;
		}
		.num{
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 8upx;
		}
	}
	.order-section{
		@extend %section;
		padding: 28upx 0;
		margin-top: 20upx;
		.order-item{
			@extend %flex-center;
			width: 120upx;
			height: 120upx;
			border-radius: 10upx;
			font-size: $font-sm;
			color: $font-color-dark;
		}
		.yticon{
			font-size: 48upx;
			margin-bottom: 18upx;
			color: #fa436a;
		}
		.icon-shouhoutuikuan{
			font-size:44upx;
		}
	}
	.history-section{
		padding: 30upx 0 0;
		margin-top: 20upx;
		background: #fff;
		border-radius:10upx;
		.sec-header{
			display:flex;
			align-items: center;
			font-size: $font-base;
			color: $font-color-dark;
			line-height: 40upx;
			margin-left: 30upx;
			.yticon{
				font-size: 44upx;
				color: #5eba8f;
				margin-right: 16upx;
				line-height: 40upx;
			}
		}
		.h-list{
			white-space: nowrap;
			padding: 30upx 30upx 0;
			.h-item {
				display:inline-block;
				font-size: $font-sm;
				color: $font-color-base;
				width: 160upx;
				height: 160upx;
				margin-right: 20upx;
				border-radius: 10upx;
				text-align: center;
				.h-item-img {
					width: 100%;
					height: 100%;
				}
				.h-item-text {
					display: -webkit-box !important;
					overflow: hidden;
					text-overflow: ellipsis;
					word-break: break-all;
					-webkit-box-orient: vertical !important;
					-webkit-line-clamp: 1;
				}
			}
			image{
			}
		}
		.no-foot-print {
			text-align: center;
			padding: 30upx 0;
			.no-foot-print-icon {
				margin-right: 10upx;
			}
		}
	}

</style>
