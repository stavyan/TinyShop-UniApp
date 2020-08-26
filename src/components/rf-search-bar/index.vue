<template>
	<view class="rf-search-bar" :class="'bg-' + themeColor.name">
		<!-- 顶部搜索栏 -->
		<view class="merchant" v-if="merchantShow" @tap="getCity" :style="{marginTop:inputTop+'px'}">
			<text class="iconfont iconshouhuodizhi"></text>
			<text class="title">{{ merchantData.title || '选择商户' }}</text>
			<text class="iconfont iconxiajiantou1"></text>
		</view>
		<view
			class="header"
			:style="{width:merchantShow ? '100vw' : width+'px', marginTop: merchantShow ? 0 : inputTop+'px'}"
		>
			<!-- 搜索框 -->
			<view class="input-box" @tap="toSearch">
				<input
					disabled
				/>
				<view class="wrapper">
					<text class="iconfont iconsousuo2"></text>
					<text class="keyword">{{ placeholder }}</text>
				</view>
			</view>
			<!-- 扫一扫 -->
			<view class="addr">
				<text class="iconfont" v-if="isOpenScan" @tap.stop="link" :class="[icon]"></text>
				<image class="logo" :src="appLogo" v-else></image>
			</view>
		</view>
		<scroll-view
			scroll-x
			class="index-cate"
			v-if="isOpenIndexCate && categoryList.length > 0">
			<view
				v-for="(item, index) in categoryList"
				:key="index"
				class="index-cate-item"
				:class="tabCurrentIndex === index ? `text-${themeColor.name} active` : ''"
				@tap.stop="tabClick(index, item.id)"
			>
				{{ item.title }}
			</view>
		</scroll-view>
	</view>
</template>

<script>
	// #ifdef H5
	import jweixin from '@/common/jweixin';
	// #endif
	import { productVirtualVerificationVerify } from '@/api/userInfo';

	export default {
		props: {
			headerShow: {
				type: Boolean,
				default: true
			},
			merchantData: {
				type: Object,
				default() {
					return {};
				}
			},
			merchantShow: {
				type: Boolean,
				default: false
			},
			categoryList: {
				type: Array,
				default() {
					return [];
				}
			},
			inputDisabled: {
				type: Boolean,
				default: false
			},
			placeholder: {
				type: String,
				default: '请输入关键字'
			},
			icon: {
				type: String,
				default: null
			},
			title: {
				type: String,
				default: null
			}
		},
		data() {
			return {
				CustomBar: this.CustomBar,
				searchValue: this.placeholder,
				appLogo: this.$mSettingConfig.appLogo,
				isOpenScan: this.$mSettingConfig.isOpenScan,
				isOpenIndexCate: this.$mSettingConfig.isOpenIndexCate,
				height: 0,
				width: 0,
				inputTop: 0,
				tabCurrentIndex: 0
			};
		},
		created() {
			let obj = {};
			// #ifdef MP-WEIXIN
			// eslint-disable-next-line
			obj = wx.getMenuButtonBoundingClientRect();
			// #endif
			uni.getSystemInfo({
				success: (res) => {
					this.width = obj.left || res.windowWidth;
					this.height = obj.top ? (obj.top + obj.height + 8) : (res.statusBarHeight + 44);
					this.inputTop = obj.top ? (obj.top + (obj.height - 30) / 2) : (res.statusBarHeight + 7);
				}
			});
		},
		methods: {
			tabClick(index, id) {
				this.tabCurrentIndex = index;
				this.$emit('tab', {
					id
				});
			},
			// 获取定位信息
			getCity() {
				this.$mRouter.push({ route: '/pages/index/location/merchant' });
			},
			discard() {
			},
			// 扫一扫
			link() {
				const _this = this;
				/*  #ifndef H5  */
				uni.scanCode({
					success: function(res) {
						_this.$http.post(productVirtualVerificationVerify, { code: res.result }).then(() => {
							_this.$mHelper.toast('核销成功');
						}).catch(err => {
							_this.$mHelper.toast(err);
						});
					},
					fail(res) {
						// 支付成功后的回调函数
						_this.$mHelper.toast('扫描失败：' + res.errMsg);
					}
				});
				/*  #endif  */
				/*  #ifdef H5  */
				if (this.$mPayment.isWechat()) {
					jweixin.ready(() => {
						jweixin.scanQRCode({
							needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
							success(res) {
								_this.$http.post(productVirtualVerificationVerify, { code: res.resultStr }).then(() => {
									_this.$mHelper.toast('核销成功');
								});
							},
							fail(res) {
								// 支付成功后的回调函数
								_this.$mHelper.toast('扫描失败：' + res.errMsg);
							}
						});
					});
				} else {
					this.$mHelper.toast('请在微信H5进行相关操作');
				}
				/*  #endif  */
			},
			async toSearch() {
				await this.$emit('search', {
					searchValue: this.searchValue
				});
			}
		}
	};
</script>

<style lang="scss">
	.rf-search-bar {
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		z-index: 10;
		color: $font-color-base;
		.merchant {
			line-height: 1;
			width: 100%;
			display: flex;
			align-items: center;
			z-index: 12;
			font-weight: 500;
			font-size: $font-lg;
			padding: $spacing-sm $spacing-lg 14upx;
			.iconshouhuodizhi {
				font-size: 40upx;
				font-weight: 600;
				margin-right: $spacing-sm;
			}
			.iconxiajiantou1 {
				margin-left: 4upx;
				font-size: $font-base;
			}
		}
		.header {
			display: flex;
			align-items: center;
			justify-content: center;
			z-index: 12;
			padding-bottom: 10upx;
			.addr {
				margin: 0 $spacing-base;
				height: 60upx;
				line-height: 60upx;
				.iconfont {
					font-weight: 500;
					font-size: 56upx;
				}
				.logo {
					width: 45upx;
					height: 45upx;
					border-radius: 8upx;
					margin-left: 10upx;
				}
			}
			.input-box {
				flex: 1;
				height: 60upx;
				line-height: 60upx;
				background-color: $color-white;
				border-radius: 30upx;
				position: relative;
				display: flex;
				align-items: center;
				margin: 6upx 0 0 $spacing-base;
				.wrapper {
					display: flex;
					align-items: center;
					position: absolute;
					top: 50%;
					left: 50%;
					font-size: $font-sm + 2upx;
					color: $font-color-light;
					transform: translate(-50%, -50%);
					.iconsousuo2 {
						font-size: 34upx;
						margin-right: $spacing-base;
					}
				}
				input {
					width: 100%;
					padding-left: 28upx;
					height: 28upx;
					color: #888;
					font-size: 28upx;
				}
			}
		}
		.index-cate {
			white-space: nowrap;
			z-index: 10;
			background-color: $color-white;
			/*#ifndef MP*/
			position: fixed;
			/*#endif*/
			margin-bottom: $spacing-sm;
			.index-cate-item {
				display: inline-block;
				height: 75upx;
				line-height: 75upx;
				margin: 0 15upx;
				text-align: center;
				width: 120upx;
				font-size: $font-base;
			}
			.active {
				font-weight: 500;
				border-bottom: 2px solid;
			}
		}
	}
</style>
