<template>
	<view class="login-type">
		<view class="logo">
			<rf-image :preview="false" :src="logo"></rf-image>
		</view>
		<view>
			<button
				class="confirm-btn"
				open-type="getUserInfo"
				v-if="isAuthLoginShow"
				formType="submit"
				@tap="toAuthLogin"
			>
				授权登录
			</button>
			<button
				class="confirm-btn plain"
				plain
				@tap="navTo('/pages/public/login')"
			>
				已有账号登录
			</button>
			<button
				class="confirm-btn plain"
				plain
				@tap="navTo(`/pages/public/register`)"
			>
				立即注册
			</button>
		</view>
		<!--协议popup-->
		<rf-protocol-popup
			ref="mapState"
			@popupState="popupState"
			protocolPath="/pages/set/about/detail?field=protocol_register&title=注册协议"
			policyPath="/pages/set/about/detail?field=protocol_privacy&title=隐私协议"
			v-if="isRfProtocolPopupShow"
		></rf-protocol-popup>
		<!-- 底部协议 -->
		<view class="footer-protocol footer">
			<text
				@tap="handleRfProtocolPopupShow"
				class="cuIcon"
				:class="appAgreementDefaultSelect?'cuIcon-radiobox base-color' : 'cuIcon-round'"
			></text>
			<text class="content">登录表示同意</text>
			<!-- 协议地址 -->
			<text class="url" @tap="handleRfProtocolPopupShow">《{{appName}} 协议》</text>
		</view>
	</view>
</template>
<script>
/**
 * @des 登录类型
 *
 * @author stav stavyan@qq.com
 * @date 2020-01-13 12:02
 * @copyright 2019
 */
import { mpWechatLogin, wechatH5Login } from '@/api/login';
import rfProtocolPopup from '@/components/rf-protocol-popup';
export default {
	components: { rfProtocolPopup },
	data() {
		return {
			isRfProtocolPopupShow: false, // 控制协议popup显示
			appAgreementDefaultSelect: uni.getStorageSync('globalConfigChange') ? (uni.getStorageSync('globalConfig').app_agreement_default_select === '1') : (this.$mSettingConfig.appAgreementDefaultSelect === '1'), // 是否允许点击登录按钮
			isAuthLoginShow: false,
			logo: this.$mSettingConfig.appLogo,
			appName: this.$mSettingConfig.appName
		};
	},
	onShow() {
		if (uni.getStorageSync('accessToken')) {
			this.$mRouter.reLaunch({ route: '/pages/index/index' });
		}
	},
	onLoad(options) {
		this.$mStore.commit('logout');
		/*  #ifdef H5  */
		if (this.$mPayment.isWechat()) {
			this.isAuthLoginShow = true;
		}
		/*  #endif  */
		/*  #ifdef MP-WEIXIN */
		this.isAuthLoginShow = true;
		/*  #endif  */
		// 用户多次点击授权登录会生成多个code 去最后一个code
		this.code = options.code && options.code.split(',')[options.code.split(',').length - 1];
		// 如果不是第一次进来 就不需要强制阅读协议
		if (!uni.getStorageSync('notFirstTimeLogin')) {
			if (!this.appAgreementDefaultSelect) {
				this.appAgreementDefaultSelect = false;
			}
		} else {
			this.appAgreementDefaultSelect = true;
		}
		const _this = this;
		if (this.code) {
			this.$http
				.get(wechatH5Login, {
					code: this.code
				})
				.then(async r => {
					if (!r.data.login) {
						this.user_info = r.data.user_info.original;
						uni.showModal({
							content: '你尚未绑定账号，是否跳转登录页面？',
							success: confirmRes => {
								if (confirmRes.confirm) {
									uni.setStorageSync(
										'wechatUserInfo',
										JSON.stringify(_this.user_info)
									);
									_this.$mRouter.push({ route: '/pages/public/login' });
								}
							}
						});
					} else {
						await this.$mStore.commit('login', r.data.user_info);
						const backToPage = uni.getStorageSync('backToPage');
						if (backToPage) {
							if (
								backToPage.indexOf('/pages/user/user') !== -1 ||
								backToPage.indexOf('/pages/cart/cart') !== -1 ||
								backToPage.indexOf('/pages/index/index') !== -1 ||
								backToPage.indexOf('/pages/notify/notify') !== -1 ||
								backToPage.indexOf('/pages/category/category') !== -1
							) {
								this.$mRouter.reLaunch(JSON.parse(backToPage));
							} else {
								this.$mRouter.redirectTo(JSON.parse(backToPage));
							}
							uni.removeStorageSync('backToPage');
							uni.removeStorageSync('wechatUserInfo');
						} else {
							this.$mRouter.reLaunch({ route: '/pages/user/user' });
						}
					}
				});
		}
	},
	methods: {
		// 通用跳转
		navTo(route) {
			if (!this.appAgreementDefaultSelect) {
				this.$mHelper.toast('请勾选并阅读协议，才能进行下一步哦', 1.5 * 1000);
				return;
			}
			this.$mRouter.redirectTo({ route });
		},
		// 显示协议popup
		handleRfProtocolPopupShow() {
			this.isRfProtocolPopupShow = true;
		},
		// 监听是否同意协议
		popupState(e) {
			if (e) {
				this.appAgreementDefaultSelect = true;
				uni.setStorageSync('notFirstTimeLogin', true);
				this.isRfProtocolPopupShow = false;
			} else {
				this.appAgreementDefaultSelect = false;
				this.isRfProtocolPopupShow = false;
			}
		},
		// 授权登录
		toAuthLogin() {
			if (!this.appAgreementDefaultSelect) {
				this.$mHelper.toast('请阅读并同意协议', 1.5 * 1000);
				return;
			}
			const _this = this;
			/*  #ifdef H5  */
			if (this.$mPayment.isWechat()) {
				uni.showModal({
					content: '是否授权登录?',
					success: confirmRes => {
						if (confirmRes.confirm) {
							const href = window.location.href;
							window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?
																	appid=${this.$mConfig.weixinAppId}&
																	redirect_uri=${href}&
																	response_type=code&
																	scope=snsapi_userinfo&
																	state=STATE#wechat_redirect`;
						}
					}
				});
			} else {
				this.$mHelper.toast('当前平台不支持授权登录');
			}
			/*  #endif  */
			/*  #ifdef MP-WEIXIN */
			uni.showModal({
				content: '是否授权登录?',
				success: confirmRes => {
					if (confirmRes.confirm) {
						uni.login({
							provider: 'weixin',
							success: function(loginRes) {
								uni.getUserInfo({
									provider: 'weixin',
									success: function(infoRes) {
										_this.$http
											.post(mpWechatLogin, {
												signature: infoRes.signature,
												encryptedData: infoRes.encryptedData,
												rawData: infoRes.rawData,
												iv: infoRes.iv,
												code: loginRes.code
											})
											.then(async r => {
												if (!r.data.login) {
													_this.user_info = r.data.user_info;
													uni.showModal({
														content: '你尚未绑定账号，是否跳转登录页面？',
														success: confirmRes => {
															if (confirmRes.confirm) {
																uni.setStorageSync(
																	'wechatUserInfo',
																	JSON.stringify(_this.user_info)
																);
																_this.$mRouter.push({
																	route: '/pages/public/login'
																});
															}
														}
													});
												} else {
													await _this.$mStore.commit('login', r.data.user_info);
													_this.$mHelper.toast('已为您授权登录');
													const backToPage = uni.getStorageSync('backToPage');
													if (backToPage) {
														if (
															backToPage.indexOf('/pages/user/user') !== -1 ||
															backToPage.indexOf('/pages/cart/cart') !== -1 ||
															backToPage.indexOf('/pages/notify/notify') !== -1 ||
															backToPage.indexOf('/pages/index/index') !== -1 ||
															backToPage.indexOf('/pages/category/category') !== -1
														) {
															_this.$mRouter.reLaunch(JSON.parse(backToPage));
														} else {
															_this.$mRouter.redirectTo(JSON.parse(backToPage));
														}
														uni.removeStorageSync('backToPage');
														uni.removeStorageSync('wechatUserInfo');
													} else {
														_this.$mRouter.reLaunch({
															route: '/pages/user/user'
														});
													}
												}
											});
									},
									fail: function() {
									}
								});
							}
						});
					}
				}
			});
			/*  #endif  */
			/*  #ifdef MP-QQ */
			this.$mHelper.toast('当前平台不支持授权登录');
			/*  #endif  */
		}
	}
};
</script>
<style lang="scss">
page {
	background: #fff;
	height: calc(100% - 88upx);
}

.login-type {
	padding-top: 80upx;

	.logo {
		text-align: center;
		margin-bottom: 80upx;

		image {
			width: 180upx;
			height: 180upx;
			border-radius: 28upx;
		}
	}

	.confirm-btn {
		width: 84%;
		margin: 0 7% 50upx;
		height: 84upx;
		line-height: 84upx;
		border-radius: 12upx;
		background-color: $base-color;
		color: #fff;
		font-size: $font-lg;
	}

	.plain {
		background: none;
		color: $base-color;
		border: 1upx solid $base-color;
	}

	.footer {
		width: 100%;
		text-align: center;
		position: fixed;
		bottom: 40upx;
		font-size: $font-sm + 2upx;

		.protocol {
			color: $base-color;
			margin: 0 10upx;
		}
	}
}
</style>
