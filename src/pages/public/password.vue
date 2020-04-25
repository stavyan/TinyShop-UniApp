<template>
  <view class="container">
    <!--顶部返回按钮-->
    <text class="back-btn iconfont iconzuojiantou-up" @tap="navBack"></text>
    <view class="right-top-sign"></view>
    <!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
    <view class="wrapper">
      <view class="left-top-sign">{{ type == 1 ? 'UPDATE' : 'GET BACK' }}</view>
      <view class="welcome">
        {{ type == 1 ? '修改密码' : '找回密码' }}！
      </view>
      <view class="input-content">
        <view class="input-item">
          <text class="tit">手机号码</text>
          <input
              type="number"
              v-model="resetPasswordParams.mobile"
              placeholder="请输入手机号码"
              maxlength="11"
          />
        </view>
        <view class="input-item input-item-sms-code">
          <view class="input-wrapper">
            <view class="rf-input-wrapper">
              <view class="tit">验证码</view>
              <input
                  type="number"
                  v-model="resetPasswordParams.code"
                  placeholder="请输入验证码"
                  maxlength="4"
                  data-key="mobile"
              />
            </view>
            <button class="sms-code-btn" :disabled="smsCodeBtnDisabled" @tap.stop="getSmsCode">
              <text v-if="!smsCodeBtnDisabled">获取验证码</text>
              <text v-else class="sms-code-resend">{{ `重新发送 (${codeSeconds})` }}</text>
            </button>

          </view>
        </view>
        <view class="input-item">
          <text class="tit">密码</text>
          <input
              v-model="resetPasswordParams.password"
              type="password"
              placeholder="请输入密码"
              maxlength="18"
          />
        </view>
        <view class="input-item">
          <text class="tit">确认密码</text>
          <input
              type="password"
              v-model="resetPasswordParams.password_repetition"
              placeholder="请输入确认密码"
               />
        </view>
      </view>
	    <button class="confirm-btn" :disabled="btnLoading" :loading="btnLoading" @tap="toUpdatePassword">{{ type == 1 ? '修改密码' : '找回密码' }}</button>
    </view>
    <view class="register-section" v-if="type != 1">
      又想起密码了?
      <text @tap="toLogin">马上登录</text>
      或者
      <text @tap="toHome">返回主页</text>
    </view>
    <view class="register-section" v-else>
      不想修改了密码？
      <text @tap="toHome">返回主页</text>
    </view>
  </view>
</template>

<script>
	import {smsCode, updatePassword} from '@/api/login';
	import moment from '@/common/moment';
	export default {
		data() {
			return {
        resetPasswordParams: {
          mobile: '',
          password: '',
          password_repetition: '',
          code: ''
        },
        btnLoading: false,
				type: null,
				smsCodeBtnDisabled: true,
				reqBody: {},
				codeSeconds: 0 // 验证码发送时间间隔
			}
		},
		onLoad(options) {
			const time = moment().valueOf() / 1000 - uni.getStorageSync('pwdSmsCodeTime');
			if (time < 60) {
				this.codeSeconds = this.$mConstDataConfig.sendCodeTime - parseInt(time, 10);
				this.handleSmsCodeTime(this.codeSeconds);
			} else {
				this.codeSeconds = this.$mConstDataConfig.sendCodeTime;
				this.smsCodeBtnDisabled = false;
				uni.removeStorageSync('pwdSmsCodeTime')
			}
			this.type = options.type
		},
		methods: {
			// 获取手机验证码
			async getSmsCode() {
				this.reqBody['mobile'] = this.resetPasswordParams['mobile'];
        let checkSendCode = this.$mGraceChecker.check(this.reqBody, this.$mFormRule.sendCodeRule);
				if (!checkSendCode) {
					this.$mHelper.toast(this.$mGraceChecker.error);
					return;
				}
				await this.$http.post(smsCode, {
					mobile: this.resetPasswordParams.mobile,
					usage: 'up-pwd'
				}).then(r => {
					this.$mHelper.toast(`验证码发送成功, 验证码是${r.data}`);
					this.smsCodeBtnDisabled = true;
					uni.setStorageSync('pwdSmsCodeTime', moment().valueOf() / 1000);
					this.handleSmsCodeTime(59);
				})
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
			navBack() {
        this.$mRouter.back();
			},
			toLogin() {
        this.$mRouter.push({route: '/pages/public/login'});
			},
			toHome() {
				this.$mRouter.reLaunch({route: '/pages/index/index'});
			},
      // 更新密码
			async toUpdatePassword() {
				this.reqBody['mobile'] = this.resetPasswordParams['mobile'];
        this.reqBody['password'] = this.resetPasswordParams['password'];
        this.reqBody['code'] = this.resetPasswordParams['code'];
        const cheRes = this.$mGraceChecker.check(this.reqBody, this.$mFormRule.resetPasswordRule);
				if (!cheRes) {
					this.$mHelper.toast(this.$mGraceChecker.error);
					return;
				}
				if (this.resetPasswordParams['password'] !== this.resetPasswordParams['password_repetition']) {
					this.$mHelper.toast('两次输入的密码不一致');
					return;
				}
				this.reqBody['password_repetition'] = this.resetPasswordParams['password_repetition'];
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
				this.btnLoading = true;
				await this.$http.post(updatePassword, this.reqBody).then(() => {
					this.btnLoading = false;
          this.$mStore.commit('logout');
					this.$mHelper.toast('密码重置成功');
          this.$mRouter.push({route: '/pages/public/login'});
				}).catch(() => {
					this.btnLoading = false;
				});
			}
		}
	}
</script>

<style lang='scss'>
  page {
    background: $color-white;
  }

  .container {
    padding-top: 60px;
    position: relative;
    width: 100vw;
    overflow: hidden;

    .wrapper {
      position: relative;
      width: 100vw;
      z-index: 90;
      background: #fff;
      padding-bottom: 40upx;

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

        .sms-code-btn {
          position: absolute;
          right: 20upx;
          color: #111;
          bottom: 20upx;
          font-size: 28upx;
        }

        .sms-code-resend {
          color: #999;
        }
      }

      .forget-section {
        font-size: $font-sm+2upx;
        color: $font-color-spec;
        text-align: center;
        margin-top: 40upx;
      }
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

    .register-section {
      margin: 50upx 0 50upx 0;
      width: 100%;
      font-size: $font-sm+2upx;
      color: $font-color-base;
      text-align: center;

      text {
        color: $font-color-spec;
        margin-left: 10upx;
        margin-right: 10upx;
      }
    }
  }
</style>

