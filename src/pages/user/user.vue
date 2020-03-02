<template>
	<view class="user">
		<!--头部-->
		<view class="user-section">
			<image class="bg" src="/static/user-bg2.jpg"></image>
			<!--用户信息-->
			<view
          class="user-info-box"
          @tap="navTo(userInfo ? '/pages/userinfo/userinfo' : 'login')">
				<view class="portrait-box">
					<image class="portrait" :src="(userInfo && userInfo.head_portrait	) || user_info.headimgurl || '/static/missing-face.png'"></image>
					<text class="username">
						{{ userInfo && (userInfo.nickname || userInfo.realname) || user_info.nickname || user_info.username ||'请先登录'}}
					</text>
				</view>
			</view>
			<!--vip信息-->
			<view class="vip-card-box">
				<image class="card-bg" src="/static/vip-card-bg.png" mode=""></image>
				<!--<view class="b-btn">-->
					<!--立即开通-->
				<!--</view>-->
				<view class="tit">
					<text class="yticon icon-iLinkapp-"></text>
					欢迎来到RageFrame微商城
				</view>
				<text class="e-m">RageFrame 版权所有</text>
				<!--<text class="e-b">正在开发中...</text>-->
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
			<!--余额 优惠券 积分信息-->
			<view class="tj-sction">
				<view class="tj-item" v-for="item in amountList" :key="item.title" @tap="navTo(item.url)">
					<text class="num" :class="item.value > 0 ? 'red' : ''">
						{{ item.value }}
					</text>
					<text>{{ item.title }}</text>
				</view>
			</view>
			<!-- 订单类型 -->
			<view class="order-section">
				<view
					class="order-item"
					v-for="item in orderSectionList"
					:key="item.title"
					@tap="navTo(item.url)"
					hover-class="common-hover"
					:hover-stay-time="50">
					<text :class="item.icon"></text>
					<text>{{ item.title }}</text>
				</view>
			</view>
			<!-- 浏览历史 -->
			<view class="history-section icon">
				<view class="sec-header" @tap="navTo('/pages/footprint/footprint')">
					<text class="yticon icon-lishijilu"></text>
					<text>我的足迹</text>
				</view>
				<view v-if="token">
					<scroll-view scroll-x class="h-list" v-if="footList.length > 0">
						<view class="h-item" v-for="item in footList" :key="item.id">
							<image class="h-item-img" @tap.stop="navTo(`/pages/product/product?id=${item.product.id}`)"
										 :src="item.product.picture"
										 mode="aspectFill">
							</image>
							<text class="h-item-text">{{ item.product.name }}</text>
						</view>
					</scroll-view>
					<view class="no-foot-print" v-else-if="footList.length === 0" @tap="navTo('/pages/product/list')">
						<uni-icons class="no-foot-print-icon" color="#fa436a" size="28" type="undo" />
						先去浏览一些吧~
					</view>
				</view>
				<view class="no-foot-print" v-else @tap="navTo('/pages/footprint/footprint')">
					<uni-icons class="no-foot-print-icon" color="#fa436a" size="28"
										 type="locked" />
					登陆后查看
				</view>
				<list-cell icon="icon-iconfontweixin" iconColor="#e07472" @eventClick="directTo('/pages/user/coupon-center')" title="去领券中心" tips="速来领取大额优惠券"></list-cell>
				<list-cell icon="icon-dizhi" iconColor="#5fcda2" title="地址管理" @eventClick="navTo('/pages/address/address')" tips="管理你的收货地址"></list-cell>
				<list-cell icon="icon-shoucang_xuanzhongzhuangtai" iconColor="#54b4ef" @eventClick="navTo('/pages/collection/collection')" title="我的收藏" tips="查看已收藏的宝贝"></list-cell>
				<button class="share-btn" open-type="share">
					<list-cell icon="icon-share" iconColor="#9789f7" title="分享" tips="将RageFrame分享分享给你的好友">
					</list-cell>
				</button>
				<!--<list-cell icon="icon-pinglun-copy" iconColor="#ee883b" @eventClick="navTo()" title="晒单" tips="晒单抢红包"></list-cell>-->
				<list-cell icon="icon-shezhi1" iconColor="#e07472" title="设置" border="" @eventClick="navTo('/pages/set/set')"></list-cell>
			</view>
		</view>
	</view>
</template>
<script>
	/**
	 * @des 个人中心
	 *
	 * @author stav stavyan@qq.com
	 * @date 2020-01-10 11:41
	 * @copyright 2019
	 */
	import listCell from '@/components/mix-list-cell';
  import {footPrintList, memberInfo} from '@/api/userInfo';
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import {wechatH5Login} from '@/api/login';
	import {mapMutations} from 'vuex';
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
				user_info: {},
				orderSectionList: [
					{ title: '待付款', icon: 'yticon icon-daifukuan', url: '/pages/order/order?state=0' },
					{ title: '待发货', icon: 'yticon icon-shouye', url: '/pages/order/order?state=1' },
					{ title: '待收货', icon: 'yticon icon-yishouhuo', url: '/pages/order/order?state=2' },
					{ title: '评价', icon: 'yticon icon-pingjia', url: '/pages/order/order?state=3' },
					{ title: '退款/售后', icon: 'yticon icon-shouhoutuikuan', url: '/pages/order/refund' },
				],
				amountList: [
					{ title: '余额', value: 0, url: '/pages/user/account' },
					{ title: '优惠券', value: 0, url: '/pages/user/coupon?type=1' },
					{ title: '积分', value: 0, url: '/pages/user/integral' }
				]
			}
		},
		onShareAppMessage() {
      return {
        title: '欢迎来到RageFrame商城',
        path: `/pages/index/index`
      }
		},
    onShow() {
			if (!uni.getStorageSync('accessToken')) {
		    uni.removeTabBarBadge({ index: 2 })
			}
			this.initData();
    },
		async onLoad(){
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
			// 数据初始化
			async initData() {
				this.userInfo = uni.getStorageSync('userInfo') || {};
				this.token = uni.getStorageSync('accessToken') || undefined;
				if (this.token) {
					await this.getMemberInfo();
				} else {
          this.amountList[0].value = 0;
          this.amountList[1].value = 0;
          this.amountList[2].value = 0;
				}
			},
			// 获取用户信息
      async getMemberInfo() {
				 uni.showLoading({title: '加载中...'});
         this.$get(memberInfo).then(r => {
          this.amountList[0].value = r.data.account.user_money || 0;
          this.amountList[1].value = r.data.coupon_num || 0;
          this.amountList[2].value = r.data.account.user_integral || 0;
					this.getFootPrintList();
          uni.setStorage({
              key: 'userInfo',
              data: r.data
          })
          this.userInfo = r.data || undefined;
        })
      },
			// 获取足迹列表
			async getFootPrintList() {
				uni.showLoading({title: '加载中...'});
				await this.$get(`${footPrintList}`).then(r => {
					this.footList = r.data
				});
			},
			// 统一跳转接口,拦截未登录路由
			navTo(url){
				if (!url) {
					uni.showToast({title: '我还没写', icon: "none"});
					return;
				}
				if(!this.token){
					url = '/pages/public/logintype';
					uni.showModal({
            content: '你暂未登陆，是否跳转登录页面？',
            success: (confirmRes)=> {
              if (confirmRes.confirm) {
			          uni.navigateTo({
			            url
			          });
              }
            }
          });
				} else {
          uni.navigateTo({
            url
          })
        }
			},
			directTo (url){
        uni.navigateTo({
          url
        })
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
	page {
		background-color: $page-color-base;
	}
	.user {
		.user-section{
			background-color: $page-color-base;
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
		}
		.cover-container{
			margin-top: -150upx;
			padding: 0 30upx 20upx;
			position:relative;
			background-color: $page-color-base;
			.arc{
				position:absolute;
				left: 0;
				top: -34upx;
				width: 100%;
				height: 36upx;
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
				}
				.red {
					color: $base-color;
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
					padding: 48upx 0;
					.no-foot-print-icon {
						font-size: $font-lg;
						margin-right: 10upx;
					}
				}
				.share-btn{
					height: 102upx;
					text-align: left;
					background: none;
					padding: 0;
					margin: 0;
				}
		    .share-btn:after {
		      border: none;
			    border-radius: none;
		    }
			}
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

</style>
