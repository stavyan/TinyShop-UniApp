<template>
	<view class="user">
		<!--头部-->
		<view class="user-section">
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
					<text class="username" v-if="hasLogin">
						{{
							userInfo.nickname ||
							userInfo.realname ||
							'暂无昵称'
						}}
					</text>
					<text class="username" v-else>登录/注册</text>
				</view>
			</view>
			<!--vip信息-->
			<view class="vip-card-box">
				<image class="card-bg" :src="vipCardBg"></image>
				<view class="tit">
					<i class="iconfont iconiLinkapp-"/>
					欢迎来到RageFrame微商城
				</view>
				<text class="e-m">RageFrame 版权所有</text>
			</view>
		</view>
		<!-- 个人中心 内容区-->
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
			<image class="arc" :src="arc"></image>

			<!--余额 优惠券 积分信息-->
			<view class="promotion-center">
				<list-cell icon="iconwallett" iconColor="#e07472" @eventClick="navTo('/pages/user/account/account')"
				           title="我的账户"></list-cell>
				<view class="tj-sction">
					<view class="tj-item" v-for="item in amountList" :key="item.title" @tap="navTo(item.url)">
						<text class="num" :class="item.value > 0 ? 'red' : ''">
							{{ item.value }}
						</text>
						<text>{{ item.title }}</text>
					</view>
				</view>
			</view>

			<!-- 我的订单 -->
			<view class="promotion-center">
				<list-cell icon="iconfapiaoguanli" iconColor="#e07472"
				           @eventClick="navTo(`/pages/index/search/search?keyword=搜索我的订单&type=order`)" title="搜索订单"></list-cell>
				<view class="order-section">
					<view
							class="order-item"
							v-for="item in orderSectionList"
							:key="item.title"
							@tap="navTo(item.url)"
							hover-class="common-hover"
							:hover-stay-time="50">
						<i class="iconfont" :class="item.icon"/>
						<text>{{ item.title }}</text>
						<rf-badge type="error" size="small" class="badge" :text="item.num"></rf-badge>
					</view>
				</view>
			</view>

			<!-- 浏览历史 -->
			<view class="history-section">
				<list-cell icon="iconlishijilu" iconColor="#5eba8f" @eventClick="navTo('/pages/user/footprint/footprint')"
				           title="我的足迹"></list-cell>
				<view v-if="hasLogin">
					<scroll-view scroll-x class="h-list" v-if="footPrintList.length > 0">
						<view class="h-item" v-for="item in footPrintList" :key="item.id">
							<image class="h-item-img" @tap.stop="navTo(`/pages/product/product?id=${item.product.id}`)"
							       :src="item.product.picture" mode="aspectFill"></image>
						<view class="h-item-text in2line">{{ item.product.name }}</view>
						</view>
					</scroll-view>
					<view class="no-foot-print" v-else-if="footPrintList.length === 0" @tap="navTo('/pages/product/list')">
						<i class="iconfont iconshare no-foot-print-icon"/>
						先去浏览一些吧~
					</view>
				</view>
				<view class="no-foot-print" v-else @tap="navTo('/pages/user/footprint/footprint')">
					<i class="iconfont iconmima no-foot-print-icon"/>
					登陆后查看
				</view>
			</view>

			<!--设置中心-->
			<view class="promotion-center">
				<list-cell icon="iconshezhi1" iconColor="#e07472" @eventClick="navTo('/pages/set/set')"
				           title="设置中心"></list-cell>
				<view class="tj-sction">

					<!-- 分类列表 -->
					<view class="category-list">
						<view
								class="category"
								v-for="(item, index) in settingList"
								:key="index"
								@tap.stop="navTo(item.url)"
						>
							<view v-if="item.title!=='分享'">
								<view class="img">
									<text class="iconfont" :style="{color: item.color}" :class="item.icon"></text>
								</view>
								<view class="text">{{ item.title }}</view>
							</view>
							<button class="share-btn" open-type="share" @tap.tap="shareToH5" v-else>
								<view class="img">
									<text class="iconfont" :style="{color: item.color}" :class="item.icon"></text>
								</view>
								<view class="text">{{ item.title }}</view>
							</button>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!--页面加载动画-->
		<rf-loading v-if="loading"></rf-loading>
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
    import {footPrintList, memberInfo} from '@/api/userInfo';
    import listCell from '@/components/rf-list-cell';
    import {mapMutations} from 'vuex';
    import rfBadge from '@/components/rf-badge/rf-badge'
    let startY = 0, moveY = 0, pageAtTop = true;
    export default {
        components: {
            listCell,
            rfBadge
        },
        data() {
            return {
                settingList: this.$mConstDataConfig.settingList,
                orderSectionList: this.$mConstDataConfig.orderSectionList,
                amountList: this.$mConstDataConfig.amountList,
                headImg: this.$mAssetsPath.headImg,
                vipCardBg: this.$mAssetsPath.vipCardBg,
                arc: this.$mAssetsPath.arc,
                userBg: this.$mAssetsPath.userBg,
                coverTransform: 'translateY(0px)',
                coverTransition: '0s',
                moving: false,
                userInfo: { // 用户信息
                    promoter: null  // 分销商信息
                },
                footPrintList: [], // 足迹列表
                loading: true,
		            hasLogin: false
            }
        },
        // 小程序分享
        onShareAppMessage() {
            return {
                title: '欢迎来到RageFrame商城',
                path: '/pages/index/index'
            }
        },
        async onShow() {
            // 初始化数据
            this.initData();
        },
        // #ifndef MP
        onNavigationBarButtonTap(e) {
            const index = e.index;
            if (index === 0) {
                this.navTo('/pages/set/set');
            } else if (index === 1) {
                // #ifdef APP-PLUS
                const pages = getCurrentPages();
                const page = pages[pages.length - 1];
                const currentWebview = page.$getAppWebview();
                currentWebview.hideTitleNViewButtonRedDot({
                    index
                });
                // #endif
                this.$mRouter.push({route: '/pages/index/notice/notice'});
            }
        },
        // #endif
        methods: {
            // h5分享
            shareToH5() {
                // #ifdef H5
                this.$mHelper.toast('请复制连接进行分享');
                // #endif
            },
            ...mapMutations(['login']),
            // 数据初始化
            async initData() {
            	this.hasLogin = this.$mStore.getters.hasLogin;
                if (this.hasLogin) {
                    await this.getMemberInfo();
                } else {
                    this.loading = false;
                    this.resetSectionData();
                }
            },
            // 设置购物车数量角标
            async initCartItemCount() {
							if (parseInt(uni.getStorageSync('cartNum'), 10) > 0) {
                await uni.setTabBarBadge({
                  index: this.$mConstDataConfig.cartIndex,
                  text: uni.getStorageSync('cartNum')
                });
							} else {
                uni.removeStorageSync('cartNum');
                uni.removeTabBarBadge({index: this.$mConstDataConfig.cartIndex});
							}
            },
            // 获取用户信息
            async getMemberInfo() {
                await this.$http.get(memberInfo).then(async r => {
                    this.loading = false;
                    this.userInfo = r.data;
                    await uni.setStorageSync('cartNum', r.data.cart_num);
                    // 获取足迹列表
                    await this.getFootPrintList();
                    await this.setSectionData(r.data);
                    await this.initCartItemCount();
                }).catch(() => {
                	  this.hasLogin = false;
                	  this.userInfo = {};
                    this.resetSectionData();
                    this.loading = false;
                });
            },
            // 清空个人中心的各模块状态
            resetSectionData() {
                uni.removeTabBarBadge({index: this.$mConstDataConfig.cartIndex});
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
                    orderSynthesizeNumArr.push(data.order_synthesize_num[item])
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
                    this.footPrintList = r.data
                });
            },
            // 统一跳转接口,拦截未登录路由
            navTo(route) {
                if (!route) {
                    return;
                }
                if (!this.hasLogin) {
                    uni.showModal({
                        content: '你暂未登陆，是否跳转登录页面？',
                        success: (confirmRes) => {
                            if (confirmRes.confirm) {
                                this.$mRouter.push({route: '/pages/public/logintype'});
                            }
                        }
                    });
                } else {
                    this.$mRouter.push({route});
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
            }
        }
    }
</script>
<style lang='scss' scoped>
	page {
		background-color: $page-color-base;
	}

	.user {
		.user-section {
			background-color: $page-color-base;
			height: 520upx;
			padding: 100upx 30upx 0;
			position: relative;

			.bg {
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				filter: blur(1px);
				opacity: .7;
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
				background: linear-gradient(to left, rgba(0, 0, 0, .7), rgba(0, 0, 0, .8));
				border-radius: 16upx 16upx 0 0;
				overflow: hidden;
				position: relative;
				padding: 20upx 24upx;

				.card-bg {
					position: absolute;
					top: 20upx;
					right: 0;
					width: 380upx;
					height: 260upx;
				}

				.tit {
					font-size: $font-base+2upx;
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
				margin: 20upx 0;
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
					color: $font-color-dark;
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
					color: #fa436a;
				}

				.icon-shouhoutuikuan {
					font-size: 44upx;
				}
			}

			.history-section {
				background: #fff;
				border-radius: 10upx;
				.sec-header {
					display: flex;
					align-items: center;
					font-size: $font-base;
					color: $font-color-dark;
					.iconfont {
						color: #5eba8f;
						margin-right: 16upx;
						line-height: 40upx;
					}
					.content {
						flex: 1;
					}
					.iconyou {
						font-size: $font-base + 2upx;
						color: $font-color-base;
						margin-left: $uni-spacing-row-sm;
					}
				}
				.h-list {
					white-space: nowrap;
					padding: 20upx 30upx 0;
					.h-item {
						display: inline-block;
						font-size: $font-sm;
						color: $font-color-base;
						width: 160upx;
						margin-right: 20upx;
						border-radius: 10upx;
						.h-item-img {
							width: 160upx;
							height: 160upx;
						}
						.h-item-text {
							font-size: $font-sm;
						}
					}
				}

				.no-foot-print {
					text-align: center;
					padding: 48upx 0;

					.no-foot-print-icon {
						color: $base-color;
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
