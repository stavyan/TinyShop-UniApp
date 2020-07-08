<template>
	<view class="login">
		<block v-if="styleLoginType === 'one'">
			<view class="container">
				<!--顶部返回按钮-->
				<text class="back-btn iconfont iconzuo" @tap="navBack"></text>
				<!--插画-->
				<view class="right-top-sign"></view>
				<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
				<view class="wrapper">
					<view class="left-top-sign">LOGIN</view>
					<view class="welcome">
						欢迎回来！
					</view>
					<view class="input-content">
						<!--<view class="btn-group">-->
						<!--<button type="primary" @tap="loginTest('15083980039', '123456')">小明-父</button>-->
						<!--</view>-->
						<view class="input-item">
							<text class="tit">手机号码</text>
							<input
								type="number"
								name="mobile"
								v-model="loginParams.mobile"
								placeholder="请输入手机号码"
								maxlength="11"
								@blur="blurMobileChange"
							/>
						</view>
						<view class="input-item" v-if="loginByPass">
							<text class="tit">密码</text>
							<input
								name="password"
								type="password"
								v-model="loginParams.password"
								placeholder="请输入密码"
								maxlength="20"
							/>
						</view>

						<view class="input-item input-item-sms-code" v-if="!loginByPass">
							<view class="input-wrapper">
								<view class="rf-input-wrapper">
									<view class="tit">验证码</view>
									<input
										type="number"
										v-model="loginParams.code"
										placeholder="请输入验证码"
										maxlength="4"
										data-key="mobile"
									/>
								</view>
								<button
									class="sms-code-btn"
									:disabled="smsCodeBtnDisabled"
									@tap.stop="getSmsCode"
								>
									<text v-if="!smsCodeBtnDisabled">获取验证码</text>
									<text v-else class="sms-code-resend">{{
										`重新发送 (${codeSeconds})`
										}}</text>
								</button>
							</view>
						</view>
						<button
							class="confirm-btn"
							:class="'bg-' + themeColor.name"
							:disabled="btnLoading"
							:loading="btnLoading"
							@tap="toLogin"
						>
							登录
						</button>
					</view>
					<view @tap="showLoginBySmsCode" class="forget-section">
						{{ loginByPass ? '验证码登录' : '密码登录' }}
					</view>
					<view class="forget-section" @tap="navTo('/pages/public/password')">
						忘记密码?
					</view>
				</view>
				<view class="register-section">
					还没有账号?
					<text @tap="navTo('/pages/public/register')">马上注册</text>
					或者
					<text @tap="toHome">返回主页</text>
				</view>
			</view>
		</block>
		<view class="login-type-2" v-if="styleLoginType === 'two'">
			<!--顶部返回按钮-->
			<text class="back-btn iconfont iconzuo" @tap="navBack"></text>
			<view class="login-top" :class="'bg-' + themeColor.name">
				<view class="desc">
					<view class="title">Hi~</view>
					<text>{{ appName }}欢迎您</text>
				</view>
				<image class="login-pic" :src="loginPic"></image>
			</view>
			<view class="login-type-content">
				<image class="login-bg" :src="loginBg" :style="{height: tabCurrentIndex === 1 ? '150vw' : '94vw'}"></image>
				<view class="main">
					<view class="nav-bar">
						<view
							class="nav-bar-item"
							v-for="(item, index) in typeList"
							:key="index"
							:class="tabCurrentIndex === index ? `text-${themeColor.name} nav-bar-item-active` : ''"
							@tap="tabClick(index)"
						>
							{{ item.text }}
						</view>
					</view>
					<block v-if="tabCurrentIndex === 0">
						<view class="login-type-form">
							<view class="input-item">
								<text class="iconfont iconzhanghuffffffpx" :class="'text-' + themeColor.name"></text>
								<input
									class="login-type-input"
									type="number"
									name="mobile"
									v-model="loginParams.mobile"
									placeholder="请输入手机号码"
									maxlength="11"
									@blur="blurMobileChange"
								/>
							</view>
							<view class="input-item" v-if="loginByPass">
								<text class="iconfont iconmimaffffffpx" :class="'text-' + themeColor.name"></text>
								<input
									class="login-type-input"
									type="password"
									v-model="loginParams.password"
									placeholder="请输入密码"
									maxlength="20"
								/>
							</view>
							<view class="input-item input-item-sms-code" v-if="!loginByPass">
								<text class="iconfont iconyanzhengma" :class="'text-' + themeColor.name"></text>
								<view class="input-wrapper">
									<view class="rf-input-wrapper">
										<input
											type="number"
											class="login-type-input"
											v-model="loginParams.code"
											placeholder="请输入验证码"
											maxlength="4"
										/>
									</view>
									<button
										class="sms-code-btn"
										:disabled="smsCodeBtnDisabled"
										@tap.stop="getSmsCode('login')"
									>
										<text v-if="!smsCodeBtnDisabled">获取验证码</text>
										<text v-else class="sms-code-resend">{{
											`重新发送 (${codeSeconds})`
											}}</text>
									</button>
								</view>
							</view>
						</view>
						<view class="login-type-tips">
							<view @tap="showLoginBySmsCode" class="forget-section">
								{{ loginByPass ? '验证码登录' : '密码登录' }}
							</view>
							<text @tap="navTo('/pages/public/password')">忘记密码？</text>
						</view>
						<button
							class="confirm-btn"
							:class="'bg-' + themeColor.name"
							:disabled="btnLoading"
							:loading="btnLoading"
							@tap="toLogin"
						>
							登录
						</button>
					</block>
					<block v-if="tabCurrentIndex === 1">
						<view class="login-type-form">
							<view class="input-item">
								<text class="iconfont icondianhua" :class="'text-' + themeColor.name"></text>
								<input
									class="login-type-input"
									type="number"
									name="mobile"
									v-model="registerParams.mobile"
									placeholder="请输入手机号码"
									maxlength="11"
								/>
							</view>
							<view class="input-item input-item-sms-code">
								<text class="iconfont iconyanzhengma" :class="'text-' + themeColor.name"></text>
								<view class="input-wrapper">
									<view class="rf-input-wrapper">
										<input
											type="number"
											class="login-type-input"
											v-model="registerParams.code"
											placeholder="请输入验证码"
											maxlength="4"
										/>
									</view>
									<button
										class="sms-code-btn"
										:disabled="smsCodeBtnDisabled"
										@tap.stop="getSmsCode('register', registerParams.mobile)"
									>
										<text v-if="!smsCodeBtnDisabled">获取验证码</text>
										<text v-else class="sms-code-resend">{{
											`重新发送 (${codeSeconds})`
											}}</text>
									</button>
								</view>
							</view>
							<view class="input-item">
								<text class="iconfont iconmimaffffffpx" :class="'text-' + themeColor.name"></text>
								<input
									class="login-type-input"
									type="password"
									v-model="registerParams.password"
									placeholder="请输入密码"
									maxlength="20"
								/>
							</view>
							<view class="input-item">
								<text class="iconfont iconmimaffffffpx" :class="'text-' + themeColor.name"></text>
								<input
									class="login-type-input"
									type="password"
									v-model="registerParams.password_repetition"
									placeholder="请输入确认密码"
									maxlength="20"
								/>
							</view>
							<view class="input-item">
								<text class="iconfont iconwode" :class="'text-' + themeColor.name"></text>
								<input
									class="login-type-input"
									type="text"
									v-model="registerParams.nickname"
									placeholder="请输入昵称"
									maxlength="20"
								/>
							</view>
							<view class="input-item" v-if="!closeRegisterPromoCode">
								<text class="iconfont iconyanzhengma1" :class="'text-' + themeColor.name"></text>
								<input
									class="login-type-input"
									type="text"
									v-model="registerParams.promoCode"
									placeholder="请输入邀请码"
									maxlength="20"
								/>
							</view>
						</view>
						<button
							class="confirm-btn"
							:class="'bg-' + themeColor.name"
							:disabled="btnLoading"
							:loading="btnLoading"
							@tap="toRegister"
						>
							注册
						</button>
					</block>
				</view>
			</view>
			<view class="login-type-bottom" :class="'text-' + themeColor.name">
				{{ appName }} 版权所有
			</view>
		</view>
	</view>
</template>
<script>
import { loginByPass, loginBySmsCode, smsCode, authLogin, registerByPass } from '@/api/login';
import moment from '@/common/moment';
export default {
	data() {
		return {
			loginParams: {
				mobile: '',
				code: '',
				password: ''
			},
			registerParams: {
				mobile: '',
				password: '',
				password_repetition: '',
				promoCode: '',
				nickname: '',
				code: ''
			},
			btnLoading: false,
			reqBody: {},
			codeSeconds: 0, // 验证码发送时间间隔
			loginByPass: true,
			smsCodeBtnDisabled: true,
			userInfo: null,
			loginBg: this.$mAssetsPath.loginBg,
			loginPic: this.$mAssetsPath.loginPic,
			appName: this.$mSettingConfig.appName,
			styleLoginType: this.$mSettingConfig.styleLoginType,
			closeRegisterPromoCode: this.$mSettingConfig.closeRegisterPromoCode,
			tabCurrentIndex: 0,
			typeList: [
				{
					text: '登录'
				},
				{
					text: '注册'
				}
			]
		};
	},
	onShow() {
		if (this.$mStore.getters.hasLogin) {
			this.$mRouter.reLaunch({ route: '/pages/index/index' });
		}
	},
	onLoad(options) {
		this.tabCurrentIndex = parseInt(options.type || 0, 10);
		const time =
			moment().valueOf() / 1000 - uni.getStorageSync('loginSmsCodeTime');
		if (time < 60) {
			this.codeSeconds =
				this.$mConstDataConfig.sendCodeTime - parseInt(time, 10);
			this.handleSmsCodeTime(this.codeSeconds);
		} else {
			this.codeSeconds = this.$mConstDataConfig.sendCodeTime;
			this.smsCodeBtnDisabled = false;
			uni.removeStorageSync('loginSmsCodeTime');
		}
		this.registerParams.promoCode = options.promo_code;
		this.loginParams.mobile = uni.getStorageSync('loginMobile') || '';
		this.loginParams.password = uni.getStorageSync('loginPassword') || '';
		this.userInfo = uni.getStorageSync('wechatUserInfo');
	},
	methods: {
		loginTest(mobile, password) {
			this.loginParams.mobile = mobile;
			this.loginParams.password = password;
		},
		// 发送验证码并进入倒计时
		async getSmsCode(usage = 'login') {
			this.reqBody['mobile'] = this.tabCurrentIndex === 0 ? this.loginParams['mobile'] : this.registerParams['mobile'];
			let checkSendCode = this.$mGraceChecker.check(
				this.reqBody,
				this.$mFormRule.sendCodeRule
			);
			if (!checkSendCode) {
				this.$mHelper.toast(this.$mGraceChecker.error);
				return;
			}
			await this.$http
				.post(smsCode, {
					mobile: this.reqBody['mobile'],
					usage
				})
				.then(r => {
					if (r.data) {
						this.$mHelper.toast(`验证码发送成功, 验证码是${r.data}`);
					} else {
						this.$mHelper.toast('验证码已发送.');
					}
					this.smsCodeBtnDisabled = true;
					uni.setStorageSync('loginSmsCodeTime', moment().valueOf() / 1000);
					this.handleSmsCodeTime(59);
				});
		},
		handleSmsCodeTime(time) {
			let timer = setInterval(() => {
				if (time === 0) {
					clearInterval(timer);
					this.smsCodeBtnDisabled = false;
				} else {
					this.codeSeconds = time;
					this.smsCodeBtnDisabled = true;
					time--;
				}
			}, 1000);
		},
		// 失去焦点的手机号
		blurMobileChange(e) {
			this.mobile = e.detail.value;
		},
		// 切换登录方式
		showLoginBySmsCode() {
			this.loginByPass = !this.loginByPass;
		},
		// 返回上一页
		navBack() {
			this.$mRouter.back();
		},
		// 统一跳转路由
		navTo(route) {
			this.$mRouter.push({ route });
		},
		// 返回主页
		toHome() {
			this.$mRouter.reLaunch({ route: '/pages/index/index' });
		},
		// 提交表单
		async toLogin() {
			if (this.$mSettingConfig.closeLogin) {
				this.$mHelper.toast('暂未开放登录，敬请期待～');
				return;
			}
			uni.removeStorageSync('loginMobile');
			uni.removeStorageSync('loginPassword');
			this.reqBody['mobile'] = this.loginParams['mobile'];
			let cheRes, loginApi;
			if (this.loginByPass) {
				loginApi = loginByPass;
				this.reqBody['password'] = this.loginParams['password'];
				cheRes = this.$mGraceChecker.check(
					this.reqBody,
					this.$mFormRule.loginByPassRule
				);
			} else {
				this.reqBody['code'] = this.loginParams['code'];
				loginApi = loginBySmsCode;
				cheRes = this.$mGraceChecker.check(
					this.reqBody,
					this.$mFormRule.loginByCodeRule
				);
			}
			if (!cheRes) {
				this.$mHelper.toast(this.$mGraceChecker.error);
				return;
			}
			this.reqBody.group = this.$mHelper.platformGroupFilter();
			const backUrl = uni.getStorageSync('backToPage');
			if (backUrl.indexOf('promo_code') !== -1) {
				this.reqBody.promo_code = JSON.parse(backUrl)['query']['promo_code'];
			}
			this.handleLogin(this.reqBody, loginApi);
		},
		// 登录
		async handleLogin(params, loginApi) {
			this.btnLoading = true;
			await this.$http
				.post(loginApi, params)
				.then(r => {
					this.$mHelper.toast('恭喜您，登录成功！');
					this.$mStore.commit('login', r.data);
					if (this.userInfo) {
						this.btnLoading = false;
						const oauthClientParams = {};
						/*  #ifdef MP-WEIXIN */
						oauthClientParams.oauth_client = 'wechatMp';
						/*  #endif  */
						/*  #ifndef MP-WEIXIN */
						oauthClientParams.oauth_client = 'wechat';
						/*  #endif  */
						const userInfo = JSON.parse(this.userInfo);
						this.$http.post(authLogin, {
							...userInfo,
							...oauthClientParams,
							gender: userInfo.sex || userInfo.gender,
							oauth_client_user_id: userInfo.openid || userInfo.openId,
							head_portrait: userInfo.headimgurl || userInfo.avatarUrl
						});
					}
					uni.removeStorageSync('wechatUserInfo');
					const backToPage = uni.getStorageSync('backToPage');
					uni.removeStorageSync('backToPage');
					if (backToPage) {
						if (
							backToPage.indexOf('/pages/profile/profile') !== -1 ||
							backToPage.indexOf('/pages/cart/cart') !== -1 ||
							backToPage.indexOf('/pages/index/index') !== -1 ||
							backToPage.indexOf('/pages/notify/notify') !== -1 ||
							backToPage.indexOf('/pages/category/category') !== -1
						) {
							this.$mRouter.reLaunch(JSON.parse(backToPage));
						} else {
							this.$mRouter.redirectTo(JSON.parse(backToPage));
						}
					} else {
						this.$mRouter.reLaunch({ route: '/pages/profile/profile' });
					}
				})
				.catch(() => {
					this.btnLoading = false;
				});
		},
		// 切换登录/注册
		tabClick(index) {
			this.tabCurrentIndex = index;
		},
		// 注册账号
		async toRegister() {
			if (this.$mSettingConfig.closeRegister) {
				this.$mHelper.toast('暂未开放注册，敬请期待～');
				return;
			}
			this.reqBody['mobile'] = this.registerParams['mobile'];
			this.reqBody['password'] = this.registerParams['password'];
			this.reqBody['code'] = this.registerParams['code'];
			this.reqBody['nickname'] = this.registerParams['nickname'];
			const cheRes = this.$mGraceChecker.check(
				this.reqBody,
				this.$mFormRule.registerRule
			);
			if (!cheRes) {
				this.$mHelper.toast(this.$mGraceChecker.error);
				return;
			}
			if (
				this.registerParams['password'] !==
				this.registerParams['password_repetition']
			) {
				this.$mHelper.toast('两次输入的密码不一致');
				return;
			}
			this.reqBody['password_repetition'] = this.registerParams[
				'password_repetition'
				];
			this.reqBody['promo_code'] = this.registerParams['promoCode'];
			this.btnLoading = true;
			this.reqBody.group = this.$mHelper.platformGroupFilter();
			await this.$http
				.post(registerByPass, this.reqBody)
				.then(() => {
					this.btnLoading = false;
					this.$mHelper.toast('恭喜您注册成功');
					uni.setStorageSync('loginMobile', this.reqBody['mobile']);
					uni.setStorageSync('loginPassword', this.reqBody['password']);
					this.$mRouter.push({ route: '/pages/public/login' });
				})
				.catch(() => {
					this.btnLoading = false;
				});
		}
	}
};
</script>
<style lang="scss">
page {
	background: $color-white;
}
.container {
	padding-top: 115px;
	position: relative;
	width: 100vw;
	overflow: hidden;
	background: #fff;
	.wrapper {
		position: relative;
		z-index: 90;
		background: #fff;
		padding-bottom: 40upx;
	}
	.back-btn {
		position: absolute;
		left: 40upx;
		z-index: 9999;
		padding-top: var(--status-bar-height);
		top: 40upx;
		font-size: 40upx;
		color: $font-color-dark;
	}
	.left-top-sign {
		font-size: 120upx;
		color: $page-color-base;
		position: relative;
		left: -16upx;
	}
	.right-top-sign {
		position: absolute;
		top: 80upx;
		right: -30upx;
		z-index: 95;

		&:before,
		&:after {
			display: block;
			content: '';
			width: 400upx;
			height: 80upx;
			background: #b4f3e2;
		}

		&:before {
			transform: rotate(50deg);
			border-radius: 0 50px 0 0;
		}

		&:after {
			position: absolute;
			right: -198upx;
			top: 0;
			transform: rotate(-50deg);
			border-radius: 50px 0 0 0;
			/* background: pink; */
		}
	}
	.left-bottom-sign {
		position: absolute;
		left: -270upx;
		bottom: -320upx;
		border: 100upx solid #d0d1fd;
		border-radius: 50%;
		padding: 180upx;
	}
	.welcome {
		position: relative;
		left: 50upx;
		top: -90upx;
		font-size: 46upx;
		color: #555;
		text-shadow: 1px 0px 1px rgba(0, 0, 0, 0.3);
	}
	.input-content {
		padding: 0 60upx;
	}
	.input-item {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		padding: 0 30upx;
		background: $page-color-light;
		height: 120upx;
		border-radius: 4px;
		margin-bottom: 50upx;

		&:last-child {
			margin-bottom: 0;
		}

		.tit {
			height: 50upx;
			line-height: 56upx;
			font-size: $font-sm + 2upx;
			color: $font-color-base;
		}

		input {
			height: 60upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			width: 100%;
		}
	}
	.input-item-sms-code {
		position: relative;
		width: 100%;
		.sms-code-btn {
			position: absolute;
			color: #111;
			right: 20upx;
			bottom: 20upx;
			font-size: 28upx;
		}

		.sms-code-resend {
			color: #999;
		}

		.sms-code-btn:after {
			border: none;
			background-color: transparent;
		}
	}
	.forget-section {
		font-size: $font-sm + 2upx;
		color: $font-color-spec;
		text-align: center;
		margin-top: 40upx;
	}
	.register-section {
		margin: 30upx 0 50upx 0;
		width: 100%;
		font-size: $font-sm + 2upx;
		color: $font-color-base;
		text-align: center;

		text {
			color: $font-color-spec;
			margin-left: 10upx;
		}

		text:first-child {
			margin-right: 10upx;
		}
	}
	.btn-group {
		display: flex;
		margin-bottom: 20upx;
	}
}
.login-type-2 {
	width: 100%;
	position: relative;
	.back-btn {
		position: absolute;
		left: 40upx;
		z-index: 9999;
		padding-top: var(--status-bar-height);
		top: 40upx;
		font-size: 48upx;
		color: $color-white;
	}
	.login-top {
		height: 460upx;
		position: relative;
		.desc {
			position: absolute;
			top: 200upx;
			left: 40upx;
			font-size: 48upx;
			.title {
				font-size: 48upx;
			}
		}
		.login-pic {
			position: absolute;
			width: 220upx;
			height: 270upx;
			right: 30upx;
			top: 100upx;
		}
	}
	.login-type-content {
		position: relative;
		top: -72upx;
		.login-bg {
			width: 94vw;
			height: 94vw;
			margin: 0 3vw;
		}
		.main {
			width: 94vw;
			position: absolute;
			top: 0;
			left: 3vw;
			.nav-bar {
				display: flex;
				height: 100upx;
				justify-content: center;
				align-items: center;
				position: relative;
				z-index: 10;
				.nav-bar-item {
					flex: 1;
					display: flex;
					height: 100%;
					line-height: 96upx;
					font-size: $font-lg;
					display: flex;
					margin: 0 120upx;
					justify-content: center;
				}
				.nav-bar-item-active {
					border-bottom: 5upx solid;
				}
			}
			.login-type-form {
				width: 80%;
				margin: 50upx auto;
				.input-item {
					position: relative;
					height: 90upx;
					line-height: 90upx;
					margin-bottom: $spacing-lg;
					.iconfont {
						font-size: 50upx;
						position: absolute;
						left: 0;
					}
					.login-type-input {
						height: 90upx;
						padding-left: 80upx;
						border-bottom: 1upx solid rgba(0, 0, 0, .1);
					}
					.sms-code-btn, sms-code-resend {
						width: 240upx;
						font-size: $font-base - 2upx;
					}
				}
			}
			.login-type-tips {
				padding: 0 50upx;
				display: flex;
				justify-content: space-between;
			}
			.confirm-btn {
				height: 80upx;
				line-height: 80upx;
			}
		}
	}
	.login-type-bottom {
		width: 100%;
		padding-bottom: 30upx;
		text-align: center;
		font-size: $font-lg;
	}
}
</style>
