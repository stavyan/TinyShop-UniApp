<template>
	<view class="rf-search-bar">
		<!-- 状态栏 -->
		<view
			v-if="headerShow"
			class="status"
			:style="{
				position: headerPosition,
				top: statusTop,
				opacity: afterHeaderOpacity
			}"
		></view>
		<!-- 顶部搜索栏 -->
		<view
			v-if="headerShow"
			class="header"
			:style="{
				position: headerPosition,
				top: headerTop,
				opacity: afterHeaderOpacity
			}"
		>
			<!-- 跳转分类模块 -->
			<view class="addr">
				<text class="iconfont" v-if="isOpenScan" @tap.stop="link" :class="[icon, 'text-' + themeColor.name]"></text>
				<image class="logo" :src="appLogo" v-else></image>
<!--				{{ title }}-->
			</view>
			<!-- 搜索框 -->
			<view class="input-box" @tap.stop="discard" v-if="inputDisabled">
				<input
					@confirm="toSearch"
					:value="placeholder"
					@input="handleSearchValueChange"
					:placeholder="placeholder ? '' : '请输入关键字'"
					style="color:#888;"
					placeholder-style="color:#ccc;"
				/>
				<view class="iconfont iconsousuo2" @tap.stop="toSearch"></view>
			</view>
			<view class="input-box" v-else>
				<input
					@tap="toSearch"
					disabled
					:value="placeholder"
					placeholder-style="color:#ccc;"
				/>
				<view class="icon iconfont iconsousuo2"></view>
			</view>
		</view>
		<!-- 占位 -->
		<view v-if="headerShow" class="place"></view>
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
			afterHeaderOpacity: 1, // 不透明度
			headerPosition: 'fixed',
			headerTop: null,
			statusTop: null,
			nVueTitle: null,
			searchValue: this.placeholder,
			appLogo: this.$mSettingConfig.appLogo,
			isOpenScan: this.$mSettingConfig.isOpenScan
		};
	},
	methods: {
		handleSearchValueChange(e) {
			this.searchValue = e.detail.value;
		},
		discard() {},
		// 扫一扫
		link() {
			const _this = this;
			/*  #ifndef H5  */
			uni.scanCode({
        success: function (res) {
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

<style scoped lang="scss">
.rf-search-bar {
	background-color: #fff;
	.status {
		width: 100%;
		height: 0;
		position: fixed;
		z-index: 10;
		background-color: #fff;
		top: 0;
		/*  #ifdef  APP-PLUS  */
		height: var(--status-bar-height); //覆盖样式
		/*  #endif  */
	}

	.header {
		width: 100%;
		height: 100upx;
		display: flex;
		align-items: center;
		position: fixed;
		top: 0;
		z-index: 10;
		background-color: #fff;
		/*  #ifdef  APP-PLUS  */
		top: var(--status-bar-height);
		/*  #endif  */
		.addr {
			height: 60upx;
			flex-shrink: 0;
			display: flex;
			align-items: center;
			.iconfont {
				margin-left: $spacing-lg;
				margin-right: $spacing-sm;
				font-weight: 500;
				display: flex;
				align-items: center;
				font-size: 48upx;
			}
			.logo {
				width: 45upx;
				height: 45upx;
				border-radius: 8upx;
				margin-left: 10upx;
			}
		}

		.input-box {
			width: 100%;
			height: 60upx;
			background-color: #f5f5f5;
			border-radius: 30upx;
			position: relative;
			display: flex;
			align-items: center;
			margin: 0 20upx 0 10upx;

			.iconsousuo2 {
				z-index: 999;
				display: flex;
				align-items: center;
				position: absolute;
				top: 0;
				right: 0;
				width: 60upx;
				height: 60upx;
				font-size: 34upx;
				color: #c0c0c0;
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
	.place {
		background-color: #ffffff;
		height: 100upx;
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
	}
}
</style>
