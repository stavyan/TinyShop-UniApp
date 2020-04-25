<template>
  <view class="container">
    <!--顶部返回按钮-->
    <text class="back-btn iconfont iconzuojiantou-up" @tap="navBack"></text>
    <!--插画-->
    <view class="right-top-sign"></view>
    <!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
    <view class="wrapper">
      <view class="left-top-sign">LOGIN</view>
      <view class="welcome">
        欢迎回来！
      </view>
      <view class="input-content">
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
            <button class="sms-code-btn" :loading="btnLoading" :disabled="smsCodeBtnDisabled" @tap.stop="getSmsCode">
              <text v-if="!smsCodeBtnDisabled">获取验证码</text>
              <text v-else class="sms-code-resend">{{ `重新发送 (${codeSeconds})` }}</text>
            </button>

          </view>
        </view>
        <button class="confirm-btn" :disabled="btnLoading" :loading="btnLoading" @tap="toLogin">登录</button>
      </view>
      <view @tap="showLoginBySmsCode" class="forget-section">
        {{ loginByPass ? "验证码登录" : "密码登录" }}
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
</template>

<script>
	import {authLogin, loginByPass, loginBySmsCode, smsCode} from '@/api/login';
	import moment from '@/common/moment';
	export default {
		data() {
			return {
        loginParams: {
          mobile: '',
				  code: '',
          password: ''
        },
        btnLoading: false,
				reqBody: {},
				codeSeconds: 0, // 验证码发送时间间隔
				loginByPass: true,
				smsCodeBtnDisabled: true,
				userInfo: null
			}
		},
		onLoad() {
			const time = moment().valueOf() / 1000 - uni.getStorageSync('loginSmsCodeTime');
			if (time < 60) {
				this.codeSeconds = this.$mConstDataConfig.sendCodeTime - parseInt(time, 10);
				this.handleSmsCodeTime(this.codeSeconds);
			} else {
				this.codeSeconds = this.$mConstDataConfig.sendCodeTime;
				this.smsCodeBtnDisabled = false;
				uni.removeStorageSync('loginSmsCodeTime')
			}
			this.userInfo = uni.getStorageSync('wechatUserInfo');
		},
		methods: {
			loginTest(mobile, password) {
				this.loginParams.mobile = mobile;
				this.loginParams.password = password;
			},
			// 发送验证码并进入倒计时
			async getSmsCode() {
				this.reqBody['mobile'] = this.loginParams['mobile'];
        let checkSendCode = this.$mGraceChecker.check(this.reqBody, this.$mFormRule.sendCodeRule);
				if (!checkSendCode) {
					this.$mHelper.toast(this.$mGraceChecker.error);
					return;
				}
				await this.$http.post(smsCode, {
					mobile: this.loginParams.mobile,
					usage: 'login'
				}).then(r => {
					this.$mHelper.toast(`验证码发送成功, 验证码是${r.data}`);
					this.smsCodeBtnDisabled = true;
					uni.setStorageSync('loginSmsCodeTime', moment().valueOf() / 1000);
					this.handleSmsCodeTime(59);
				});
			},
			handleSmsCodeTime (time) {
					let timer = setInterval(() => {
						if (time === 0) {
							clearInterval(timer);
							this.smsCodeBtnDisabled = false;
						} else {
							this.codeSeconds = time;
							this.smsCodeBtnDisabled = true;
							time--
						}
					}, 1000);
			},
			// 失去焦点的手机号
			blurMobileChange(e) {
				this.mobile = e.detail.value
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
        this.$mRouter.push({route});
			},
			// 返回主页
			toHome() {
				this.$mRouter.reLaunch({route: '/pages/index/index'});
			},
			// 提交表单
			async toLogin() {
				this.reqBody['mobile'] = this.loginParams['mobile'];
				let cheRes, loginApi;
        if (this.loginByPass) {
        	loginApi = loginByPass;
				  this.reqBody['password'] = this.loginParams['password'];
				  cheRes = this.$mGraceChecker.check(this.reqBody, this.$mFormRule.loginByPassRule);
        } else {
				  this.reqBody['code'] = this.loginParams['code'];
        	loginApi = loginBySmsCode;
				  cheRes = this.$mGraceChecker.check(this.reqBody, this.$mFormRule.loginByCodeRule);
        }
				if (!cheRes) {
					this.$mHelper.toast(this.$mGraceChecker.error);
					return;
				}
				/*  #ifdef  APP-PLUS  */
				this.reqBody.group = 'tinyShopApp'
				/*  #endif  */
				/*  #ifdef H5  */
				this.reqBody.group = 'tinyShopH5'
				/*  #endif  */
				/*  #ifdef  MP-WEIXIN  */
				this.reqBody.group = 'tinyShopWechatMq'
				/*  #endif  */
				/*  #ifdef  MP-QQ  */
				this.reqBody.group = 'tinyShopQqMq'
				/*  #endif  */
        this.handleLogin(this.reqBody, loginApi)
			},
			// 登录
			async handleLogin(params, loginApi) {
				this.btnLoading = true;
				await this.$http.post(loginApi, params).then(r => {
					this.$mHelper.toast('恭喜您，登录成功！');
					this.$mStore.commit('login', r.data);
					if (this.userInfo) {
						this.btnLoading = false;
						const oauthClientParams = {}
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
					// #ifdef H5
          this.$mPayment.wxConfigH5();
          // #endif
					const backToPage = uni.getStorageSync('backToPage');
					if (backToPage) {
            if (backToPage.indexOf('/pages/user/user') !== -1
              || backToPage.indexOf('/pages/cart/cart') !== -1
              || backToPage.indexOf('/pages/index/index') !== -1
              || backToPage.indexOf('/pages/category/category') !== -1) {
              this.$mRouter.reLaunch(JSON.parse(backToPage));
            } else {
						  this.$mRouter.redirectTo(JSON.parse(backToPage));
            }
						uni.removeStorageSync('backToPage');
						uni.removeStorageSync('wechatUserInfo');
						return;
					} else {
						this.$mRouter.reLaunch({route: '/pages/user/user'});
					}
				}).catch(() => {
					this.btnLoading = false;
				});
			}
		}
	}
</script>

<style lang='scss'>
  page {
    background: #fff;
  }

  .container {
    padding-top: 115px;
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: #fff;
  }

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

    &:before, &:after {
      display: block;
      content: "";
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
    text-shadow: 1px 0px 1px rgba(0, 0, 0, .3);
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
      font-size: $font-sm+2upx;
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
    font-size: $font-sm+2upx;
    color: $font-color-spec;
    text-align: center;
    margin-top: 40upx;
  }

  .register-section {
    margin: 30upx 0 50upx 0;
    width: 100%;
    font-size: $font-sm+2upx;
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
</style>
