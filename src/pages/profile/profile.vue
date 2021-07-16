<template>
	<view class="user">
		<!--头部-->
		<view class="user-section" :class="'bg-' + themeColor.name">
			<image class="bg" :src="userBg"></image>
			<!--用户信息-->
			<view class="user-info-box">
				<view
					class="portrait-box"
					@tap="navTo(userInfo ? '/pages/user/userinfo/userinfo' : 'login')"
				>
					<image
						class="portrait"
						:src="userInfo.head_portrait || headImg"
					></image>
					<text class="username">
						{{
							userInfo.nickname ||
							userInfo.realname ||
								'登录/注册'
						}}
					</text>
				</view>
			</view>
			<!--vip信息-->
			<view class="vip-card-box">
				<view class="b-btn" @tap="navTo('/pages/user/account/level')">
					{{ userInfo.memberLevel | filterMemberLevel }}
				</view>
				<view class="tit">
					<i class="iconfont iconzuanshi" />
					{{appName}}尊享会员
				</view>
				<text class="e-m">{{appName}} 版权所有</text>
			</view>
		</view>
		<!-- 个人中心 内容区-->
		<view
			class="cover-container"
			:style="[
				{
					transform: coverTransform,
					transition: coverTransition
				}
			]"
			@touchstart="coverTouchstart"
			@touchmove="coverTouchmove"
			@touchend="coverTouchend"
		>
			<image class="arc" :src="arc"></image>
			<!--余额 优惠券 积分信息-->
			<view class="promotion-center">
				<list-cell
					icon="iconqianbao"
					:iconColor="themeColor.color"
					@eventClick="navTo('/pages/user/account/account')"
					:title="_i18n.t('profile.myAccount')"
				></list-cell>
				<view class="tj-sction">
					<view
						class="tj-item"
						v-for="item in amountList"
						:key="item.title"
						@tap="navTo(item.url)"
					>
						<text class="num" :class="item.value > 0 ? 'text-'+themeColor.name : ''">
							{{ item.value }}
						</text>
						<text>{{ item.title }}</text>
					</view>
				</view>
			</view>
			<!-- 我的订单 -->
			<view class="promotion-center">
				<list-cell
					icon="iconicon1"
					:iconColor="themeColor.color"
					@eventClick="
						navTo(`/pages/order/order?state=-1`)
					"
					title="全部订单"
				></list-cell>
				<view class="order-section">
					<view
						class="order-item"
						v-for="item in orderSectionList"
						:key="item.title"
						@tap="navTo(item.url)"
						hover-class="common-hover"
						:hover-stay-time="50"
					>
						<i class="iconfont" :class="[item.icon, 'text-'+themeColor.name]" />
						<text>{{ item.title }}</text>
						<rf-badge
							v-if="item.num > 0"
							type="error"
							size="small"
							class="badge"
							:text="item.num"
						></rf-badge>
					</view>
				</view>
			</view>
			<!-- 浏览历史 -->
			<view class="history-section">
				<list-cell
					icon="iconzuji"
					:iconColor="themeColor.color"
					@eventClick="navTo('/pages/user/footprint/footprint')"
					title="我的足迹"
				></list-cell>
				<view v-if="hasLogin">
					<scroll-view scroll-x class="h-list-history" v-if="footPrintList.length > 0">
						<view class="h-item-history" v-for="item in footPrintList" :key="item.id" @tap.stop="navToProduct(item.marketing_type, item.product.id)">
							<image
								:src="item.product.picture"
								class="h-item-img"
								:preview="false"
								mode="aspectFill"
							></image>
							<image
								v-if="item.marketing_type"
								class="tag"
								:src="item.marketing_type | marketingTypeTag"
								mode="aspectFill"
							></image>
							<view class="h-item-text">
								<text class="in2line">{{ item.product.name }}</text>
							</view>
						</view>
					</scroll-view>
					<view
						class="no-foot-print"
						v-else-if="footPrintList.length === 0"
						@tap="navTo('/pages/product/list')"
					>
						<i class="iconfont iconshare no-foot-print-icon" :class="'text-'+themeColor.name" />
						先去浏览一些吧~
					</view>
				</view>
				<view
					class="no-foot-print"
					v-else
					@tap="navTo('/pages/user/footprint/footprint')"
				>
					<i class="iconfont iconmima no-foot-print-icon" :class="'text-'+themeColor.name" />
					登录后查看
				</view>
			</view>
			<!--我的服务-->
			<view class="promotion-center">
				<list-cell
					icon="iconfuwu"
					:iconColor="themeColor.color"
					@eventClick="navTo('/pages/set/set')"
					:title="_i18n.t('profile.myService')"
				></list-cell>
				<view class="tj-sction">
					<!-- 分类列表 -->
					<view class="category-list">
						<view
							class="category"
							v-for="(item, index) in settingList"
							:key="index"
							:style="{display: settingItemShowFilter(item.title)}"
							@tap.stop="navTo(item.url)"
						>
							<view v-if="item.title !== '分享'">
								<view class="img">
									<text
										class="iconfont"
										:class="[item.icon, 'text-'+themeColor.name]"
									></text>
								</view>
								<view class="text">{{ item.title }}</view>
							</view>
							<button
								class="share-btn"
								open-type="share"
								@tap="share"
								v-else
							>
								<view class="img">
									<text
										class="iconfont"
										:class="[item.icon, 'text-'+themeColor.name]"
									></text>
								</view>
								<view class="text">{{ item.title }}</view>
							</button>
						</view>
<!--						不需要国际化的 注释下面 view 就行-->
						<view class="category" @tap="switchLanguage">
							<view class="img">
								<text
									class="iconfont iconyuyanqiehuan"
									:class="['text-'+themeColor.name]"
								></text>
							</view>
							<view class="text">{{ currentLanguage }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!--页面加载动画-->
		<rfLoading isFullScreen :active="loading"></rfLoading>
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
import { footPrintList, memberInfo, notifyUnRreadCount } from '@/api/userInfo';
import listCell from '@/components/rf-list-cell';
import { mapMutations } from 'vuex';
import rfBadge from '@/components/rf-badge/rf-badge';
import $mAssetsPath from '@/config/assets.config';
let startY = 0, moveY = 0, pageAtTop = true;
export default {
	components: {
		listCell,
		rfBadge
	},
	data() {
		return {
			orderSectionList: this.$mConstDataConfig.orderSectionList,
			amountList: this.$mConstDataConfig.amountList,
			isOpenLiveStreaming: this.$mSettingConfig.isOpenLiveStreaming,
			headImg: this.$mAssetsPath.headImg,
			vipCardBg: this.$mAssetsPath.vipCardBg,
			arc: this.$mAssetsPath.arc,
			userBg: this.$mAssetsPath.userBg,
			coverTransform: 'translateY(0px)',
			coverTransition: '0s',
			moving: false,
			userInfo: {
				// 用户信息
				promoter: null // 分销商信息
			},
			footPrintList: [], // 足迹列表
			loading: true,
			appName: this.$mSettingConfig.appName,
			hasLogin: false,
			currentLanguage: this._i18n.locale === 'zh' ? 'English' : '中文'
		};
	},
	filters: {
		filterMemberLevel(val) {
      if (!val) return '普通用户';
			return val.name;
		},
		marketingTypeTag(marketingType) {
			let tag;
			switch (marketingType) {
				case 'discount':
					tag = $mAssetsPath.discountTag;
					break;
				case 'bargain':
					tag = $mAssetsPath.bargainTag;
					break;
				case 'group_buy':
					tag = $mAssetsPath.groupTag;
					break;
				case 'wholesale':
					tag = $mAssetsPath.wholesaleTag;
					break;
			}
			return tag;
		}
	},
  computed: {
    // 判断推广中心是否显示 当有分销商信息的时候显示
    settingItemShowFilter() {
      return function (val) {
        let type = 'block';
        if (val === '推广中心' && this.userInfo.promoter) {
          type = 'none';
        } else if (val === '直播' && !this.isOpenLiveStreaming) {
          type = 'none';
        }
        return type;
      };
    },
		settingList() {
			return [
				{ icon: 'icongonggao', url: '/pages/index/notice/notice', title: this._i18n.t('profile.notice'), color: '#ff6b81' },
				{ icon: 'iconyouhuiquan-copy', url: '/pages/user/coupon/list', title: this._i18n.t('profile.couponCenter'), color: '#ff6b81' },
				{ icon: 'icondizhi1', url: '/pages/user/address/address', title: this._i18n.t('profile.addressManage'), color: '#ff6b81' },
				{ icon: 'iconshoucang3', url: '/pages/user/collection/collection', title: this._i18n.t('profile.myCollection'), color: '#ff6b81' },
				{ icon: 'iconfenxiang', url: '', title: this._i18n.t('profile.share'), color: '#ff6b81' },
				{ icon: 'iconzhibo', url: '/pages/marketing/live/list', title: this._i18n.t('profile.live'), color: '#ff6b81' },
				{ icon: 'iconshezhi3', url: '/pages/set/set', title: this._i18n.t('profile.setting'), color: '#ff6b81' }
			];
		}
  },
	// 小程序分享
	onShareAppMessage() {
		return {
			title: `欢迎来到${this.appName}`,
			path: '/pages/index/index'
		};
	},
	async onShow() {
		// 初始化数据
		await this.initData();
	},
	// #ifndef MP
	onNavigationBarButtonTap(e) {
		const index = e.index;
		if (index === 0) {
			this.navTo('/pages/set/set');
		} else if (index === 1) {
			// #ifdef APP-PLUS
			// eslint-disable-next-line
			const pages = getCurrentPages();
			const page = pages[pages.length - 1];
			const currentWebview = page.$getAppWebview();
			currentWebview.hideTitleNViewButtonRedDot({
				index
			});
			// #endif
			this.$mRouter.switchTab({ route: '/pages/notify/notify' });
		}
	},
	// #endif
	methods: {
		// 切换语言
		switchLanguage() {
			if (this._i18n.locale === 'zh') {
				this._i18n.locale = 'en';
				this.currentLanguage = '中文';
			} else if (this._i18n.locale === 'en') {
				this._i18n.locale = 'zh';
				this.currentLanguage = 'English';
			}
			this.initData();
			this.$mStore.commit('setLocale', this._i18n.locale);
			uni.setNavigationBarTitle({ title: this._i18n.t('menu.my') });
			uni.setTabBarItem({ index: 0, text: this._i18n.t('menu.index') });
			uni.setTabBarItem({ index: 1, text: this._i18n.t('menu.category') });
			uni.setTabBarItem({ index: 2, text: this._i18n.t('menu.notify') });
			uni.setTabBarItem({ index: 3, text: this._i18n.t('menu.cart') });
			uni.setTabBarItem({ index: 4, text: this._i18n.t('menu.my') });
		},
		...mapMutations(['setNotifyNum', 'setCartNum']),
		// 分享
    share() {
			const url = `${this.$mConfig.hostUrl}/pages/index/index`;
      // #ifdef H5
			this.$mHelper.h5Copy(url);
			// #endif
      // #ifdef APP-PLUS
			const shareImg = `${this.$mSettingConfig.appLogo}`;
			this.$mHelper.handleAppShare(url, this.appName, `欢迎来到${this.appName}`, shareImg);
			// #endif
		},
		...mapMutations(['login']),
		// 数据初始化
		async initData() {
			this.hasLogin = this.$mStore.getters.hasLogin;
			uni.setTabBarStyle({
				selectedColor: this.themeColor.color,
				borderStyle: 'white'
			});
			this.themeColor.tabList && this.themeColor.tabList.forEach((selectedIconPath, index) => {
				uni.setTabBarItem({
					index,
					selectedIconPath
				});
			});
			if (this.hasLogin) {
				await this.getMemberInfo();
			} else {
				this.loading = false;
				this.resetSectionData();
			}
		},
		// 获取用户信息
		async getMemberInfo() {
			await this.$http
				.get(memberInfo)
				.then(async r => {
					this.loading = false;
					this.userInfo = r.data;
					await this.setCartNum(r.data.cart_num);
					await this.initNotifyNum();
					// 获取足迹列表
					await this.getFootPrintList();
					await this.setSectionData(r.data);
				})
				.catch(() => {
					this.hasLogin = false;
					this.userInfo = {};
					this.resetSectionData();
					this.loading = false;
				});
		},
		// 设置未读消息个数
		async initNotifyNum () {
      await this.$http.get(notifyUnRreadCount).then(r => {
        this.setNotifyNum(r.data.count);
      });
    },
		// 清空个人中心的各模块状态
		resetSectionData() {
			this.userInfo = {};
			uni.removeTabBarBadge({ index: this.$mConstDataConfig.cartIndex });
			uni.removeTabBarBadge({ index: this.$mConstDataConfig.notifyIndex });
			this.amountList[0].value = 0;
			this.amountList[1].value = 0;
			this.amountList[2].value = 0;
			this.orderSectionList[0].num = 0;
			this.orderSectionList[1].num = 0;
			this.orderSectionList[2].num = 0;
			this.orderSectionList[3].num = 0;
			this.orderSectionList[4].num = 0;
		},
		// 给个人中心的各模块赋值
		setSectionData(data) {
			const orderSynthesizeNumArr = [];
			for (let item in data.order_synthesize_num) {
				orderSynthesizeNumArr.push(data.order_synthesize_num[item]);
			}
			for (let i = 0; i < this.orderSectionList.length; i++) {
				this.orderSectionList[i].num = orderSynthesizeNumArr[i].toString();
			}
			this.amountList[0].value = data.account.user_money || 0;
			this.amountList[1].value = data.coupon_num || 0;
			this.amountList[2].value = data.account.user_integral || 0;
			// 更新userInfo缓存
			uni.setStorageSync('userInfo', data);
		},
		// 获取足迹列表
		async getFootPrintList() {
			await this.$http.get(`${footPrintList}`).then(r => {
				this.footPrintList = r.data;
			});
		},
		// 统一跳转接口,拦截未登录路由
		navTo(route) {
			if (!route) return;
			if (route === '/pages/index/notice/notice') {
				this.$mRouter.push({ route });
			} else if (!this.hasLogin) {
				uni.removeStorageSync('backToPage');
				this.$mRouter.push({ route: '/pages/public/logintype' });
			} else {
				this.$mRouter.push({ route });
			}
		},
		/**
		 *  会员卡下拉和回弹
		 *  1.关闭bounce避免ios端下拉冲突
		 *  2.由于touchmove事件的缺陷（以前做小程序就遇到，比如20跳到40，h5反而好很多），下拉的时候会有掉帧的感觉
		 *    transition设置0.1秒延迟，让css来过渡这段空窗期
		 *  3.回弹效果可修改曲线值来调整效果，推荐一个好用的bezier生成工具 http://cubic-bezier.com/
		 */
		coverTouchstart(e) {
			if (pageAtTop === false) {
				return;
			}
			this.coverTransition = 'transform .1s linear';
			startY = e.touches[0].clientY;
		},
		coverTouchmove(e) {
			moveY = e.touches[0].clientY;
			let moveDistance = moveY - startY;
			if (moveDistance < 0) {
				this.moving = false;
				return;
			}
			this.moving = true;
			if (moveDistance >= 80 && moveDistance < 100) {
				moveDistance = 80;
			}
			if (moveDistance > 0 && moveDistance <= 80) {
				this.coverTransform = `translateY(${moveDistance}px)`;
			}
		},
		coverTouchend() {
			if (this.moving === false) {
				return;
			}
			this.moving = false;
			this.coverTransition = 'transform 0.3s cubic-bezier(.21,1.93,.53,.64)';
			this.coverTransform = 'translateY(0px)';
		},
		// 跳转至商品详情
		navToProduct(type, id) {
			let route = `/pages/product/product?id=${id}`;
			switch (type) {
				case 'discount':
					route = `/pages/marketing/discount/product?id=${id}`;
					break;
				case 'bargain':
					route = `/pages/marketing/bargain/product?id=${id}`;
					break;
				case 'group_buy':
					route = `/pages/marketing/group/product?id=${id}`;
					break;
				case 'wholesale':
					route = `/pages/marketing/wholesale/product?id=${id}`;
					break;
			}
			this.$mRouter.push({ route });
		}
	}
};
</script>
<style lang="scss" scoped>
page {
	background-color: $page-color-base;
}
.user {
	.user-section {
		height: 520upx;
		padding: 100upx 30upx 0;
		position: relative;

		.bg {
			position: absolute;
			left: 0;
			top: 0;
			width: 100vw;
			height: 60vw;
			opacity: 0.84;
		}
		.user-info-box {
			height: 180upx;
			display: flex;
			align-items: center;
			position: relative;
			z-index: 1;
			justify-content: space-between;

			.portrait-box {
				display: flex;
				align-items: center;

				.portrait {
					width: 130upx;
					height: 130upx;
					border: 5upx solid #fff;
					border-radius: 50%;
				}

				.username {
					font-size: $font-lg + 6upx;
					color: $color-white;
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

		.vip-card-box {
			display: flex;
			flex-direction: column;
			color: #f7d680;
			height: 240upx;
			background: url('/static/vip-card.png');
			background-size: 100% 100%;
			border-radius: 16upx 16upx 0 0;
			overflow: hidden;
			position: relative;
			padding: 20upx 24upx;
			.b-btn{
				position: absolute;
				right: 24upx;
				top: 24upx;
				width: 132upx;
				height: 40upx;
				text-align: center;
				line-height: 40upx;
				font-size: 22upx;
				color: #36343c;
				border-radius: 20px;
				background: linear-gradient(to left, #f9e6af, #ffd465);
				z-index: 1;
			}
			.tit {
				font-size: $font-base + 2upx;
				color: #f7d680;
				margin-bottom: 28upx;
				.iconfont {
					color: #f6e5a3;
					display: inline-block;
					margin-right: 16upx;
				}
			}
		}
	}

	.cover-container {
		margin-top: -150upx;
		padding: 0 30upx 20upx;
		position: relative;
		background-color: $page-color-base;

		.arc {
			position: absolute;
			left: 0;
			top: -34upx;
			width: 100%;
			height: 36upx;
		}

		.promotion-center {
			background: #fff;
			margin-bottom: 20upx;
			/*分类列表*/
			.category-list {
				width: 100%;
				padding: 0 0 30upx 0;
				border-bottom: solid 2upx #f6f6f6;
				display: flex;
				flex-wrap: wrap;
				.category {
					width: 33.3%;
					margin-top: 50upx;
					display: flex;
					justify-content: center;
					flex-wrap: wrap;
					.img {
						width: 100%;
						display: flex;
						justify-content: center;

						.iconfont {
							font-size: $font-lg + 24upx;
						}
					}

					.text {
						width: 100%;
						display: flex;
						justify-content: center;
						font-size: 24upx;
						color: #3c3c3c;
					}
					.share-btn {
						height: 142upx;
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

		.tj-sction {
			@extend %section;
			display: flex;

			.tj-item {
				@extend %flex-center;
				flex: 1;
				flex-direction: column;
				margin: 30upx 0;
				font-size: $font-sm;
				color: #75787d;
				/*border-right: 2upx solid rgba(0, 0, 0, 0.2);*/
			}

			/*.tj-item:last-child {*/
			/*border-right: none;*/
			/*}*/
			.num {
				font-size: $font-base;
			}

			.red {
				color: $base-color;
			}
		}

		.order-section {
			@extend %section;
			padding: 28upx 0;

			.order-item {
				@extend %flex-center;
				width: 120upx;
				height: 120upx;
				border-radius: 10upx;
				font-size: $font-sm;
				color: $font-color-dark;
				position: relative;
			}

			.badge {
				position: absolute;
				top: 0;
				right: 4upx;
			}

			.iconfont {
				font-size: 48upx;
			}

			.icon-shouhoutuikuan {
				font-size: 44upx;
			}
		}

		.history-section {
			background: #fff;
			margin-bottom: $spacing-sm;
			.h-list-history {
				margin: 0;
				border-radius: 10upx;
				white-space: nowrap;
				background-color: $page-color-base;
				.h-item-history {
					background-color: $color-white;
					display: inline-block;
					font-size: $font-sm;
					color: $font-color-base;
					width: 180upx;
					margin: $spacing-sm $spacing-sm 0 0;
					border-radius: 10upx;
					position: relative;
					top: 0;
					overflow: hidden;
					.h-item-img {
						width: 180%;
						height: 200upx;
						border-top-left-radius: 12upx;
						border-top-right-radius: 12upx;
						border-bottom: 1upx solid rgba(0, 0, 0, 0.01);
					}
					.tag {
						position: absolute;
						border-top-left-radius: 12upx;
						left: 0;
						right: 0;
						width: 60upx;
						height: 60upx;
					}
					.h-item-text {
						font-size: $font-sm;
						margin: $spacing-sm 4upx;
					}
				}
			}
			.no-foot-print {
				text-align: center;
				padding: 48upx 0;

				.no-foot-print-icon {
					font-size: $font-lg + 2upx;
					margin-right: 10upx;
				}
			}
			.share-btn {
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
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
%section {
	justify-content: space-around;
	display: flex;
	align-content: center;
	background: #fff;
	border-radius: 10upx;
}
</style>
