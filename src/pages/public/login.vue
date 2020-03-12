<template>
	<view class="container">
		<!--顶部返回按钮-->
		<i class="back-btn iconfont iconzuojiantou-up" @tap="navBack"></i>
		<!--插画-->
		<view class="right-top-sign"></view>
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<view class="left-top-sign">LOGIN</view>
			<view class="welcome">
				欢迎回来！
			</view>
			<view class="input-content">
				<form @submit="toLogin">
					<view class="input-item">
						<text class="tit">手机号码</text>
						<input
							type="number"
							name="mobile"
							:value="mobile"
							placeholder="请输入手机号码"
							maxlength="11"
							@blur="blurMobileChange"
						/>
					</view>
					<view class="input-item" v-show="loginByPass">
						<text class="tit">密码</text>
						<input
							name="password"
							type="password"
							:value="password"
							placeholder="请输入密码"
							maxlength="20"
						/>
					</view>
					<view class="input-item input-item-sms-code" v-show="!loginByPass">
						<text class="tit">验证码</text>
						<input
							type="number"
							name="code"
							:value="code"
							placeholder="请输入验证码"
							maxlength="6"
							data-key="mobile"
						/>
						<button class="sms-code-btn" :disabled="smsCodeBtnDisabled" @tap="getSmsCode()">
							<span class="btn" v-if="!smsCodeBtnDisabled">获取验证码</span>
							<span v-else class="sms-code-resend">{{ `重新发送 (${codeSeconds})` }}</span>
						</button>
					</view>
					<button class="confirm-btn" formType="submit" :disabled="logining">登录</button>
				</form>
			</view>
			<view @tap="showLoginBySmsCode" class="forget-section">
				{{ loginByPass ?  "验证码登录" : "密码登录" }}
			</view>
			<view class="forget-section" @tap="navTo('/pages/public/password')" >
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
	import {mapMutations} from 'vuex';
	import {authLogin, loginByPass, loginBySmsCode, smsCode} from "@/api/login";
	const graceChecker = require("@/common/graceChecker.js");
	export default{
		data(){
			return {
				mobile: '',
				password: '',
				code: '',
				logining: false,
				loginByPass: true,
				smsCodeBtnDisabled: false,
				codeSeconds: 60,
				userInfo: null
			}
		},
		onLoad(options){
			this.userInfo = options.userInfo;
      // uni.clearStorageSync();
		},
		methods: {
			...mapMutations(['login']),
			// 验证手机号是否有效
			checkPhoneIsValid (mobile) {
				const reg = /^1[0-9]{10,10}$/;
				if (!reg.test(mobile)) {
					this.$api.msg('请输入正确的手机号');
					return false;
				} else {
					return true;
				}
			},
			// 发送验证码并进入倒计时
			getSmsCode () {
				if (!this.checkPhoneIsValid(this.mobile)) return;
				uni.showLoading({title:'获取中...'});
				this.$post(smsCode, {
					mobile: this.mobile,
					usage: 'login'
				}).then(r=>{
				  this.$api.msg(`验证码发送成功, 验证码是${r.data}`, 3 * 1000);
					this.smsCodeBtnDisabled = true;
					let time = 59;
					let timer = setInterval(() => {
						if(time === 0) {
							clearInterval(timer);
							this.smsCodeBtnDisabled = false;
						} else {
							this.codeSeconds = time;
							this.smsCodeBtnDisabled = true;
							time--
						 }
					},1000);
				})
			},
			// 失去焦点的手机号
			blurMobileChange(e) {
				this.mobile = e.detail.value
			},
			// 切换登录方式
			showLoginBySmsCode () {
				this.loginByPass = !this.loginByPass;
			},
			// 返回上一页
			navBack(){
				uni.navigateBack();
			},
			// 统一跳转路由
			navTo (url) {
				uni.navigateTo({
					url
				})
			},
			// 返回主页
			toHome(){
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			// 登录事件
			async toLogin(e){
				const formData = e.detail.value;
				const params = {};
				params.mobile = formData.mobile;
				let rule = [
					{name:"mobile", checkType : "phoneno", checkRule:"11,11",  errorMsg:"请输入正确的手机号"}
				];
				if (this.loginByPass) {
					params.password = formData.password;
          rule[1] = {name:"password", checkType : "string", checkRule:"6,20",  errorMsg:"密码长度为6-20位"};
				} else {
					params.code = formData.code;
          rule[1] = {name:"code", checkType : "notnull", checkRule:"",  errorMsg:"请输入验证码"};
				}
				const checkRes = graceChecker.check(formData, rule);
				if(!checkRes){
					this.$api.msg(graceChecker.error);
					return;
				}
				uni.showLoading({title:'登录中...'});
				/*  #ifdef  APP-PLUS  */
				params.group = 'tinyShopApp'
				/*  #endif  */
				/*  #ifdef H5  */
				params.group = 'tinyShopH5'
				/*  #endif  */
				/*  #ifdef  MP-WEIXIN  */
				params.group = 'tinyShopWechatMq'
				/*  #endif  */
				/*  #ifdef  MP-QQ  */
				params.group = 'tinyShopQqMq'
				/*  #endif  */
				if (this.loginByPass) {
					this.handleLoginByPass(params)
				} else {
					this.handleLoginBySmsCode(params)
				}
			},
			// 密码登录
			handleLoginByPass (params) {
				/*  #ifdef  APP-PLUS  */
				params.group = 'tinyShopApp'
				/*  #endif  */
				/*  #ifdef H5  */
				params.group = 'tinyShopH5'
				/*  #endif  */
				/*  #ifdef  MP-WEIXIN  */
				params.group = 'tinyShopWechatMq'
				/*  #endif  */
				/*  #ifdef  MP-QQ  */
				params.group = 'tinyShopQqMq'
				/*  #endif  */
				this.$post(loginByPass, {
					...params
				}).then(r=>{
					this.$api.msg('恭喜您，登录成功！');
					this.login(r.data);
					if (this.userInfo) {
						const oauthClientParams = {}
						/*  #ifdef MP-WEIXIN */
						oauthClientParams.oauth_client = 'wechatMp';
						/*  #endif  */
						/*  #ifndef MP-WEIXIN */
						oauthClientParams.oauth_client = 'wechat';
						/*  #endif  */
						const userInfo = JSON.parse(this.userInfo);
						this.$post(authLogin, {
							...userInfo,
							...oauthClientParams,
							gender: userInfo.sex || userInfo.gender,
							oauth_client_user_id: userInfo.openid || userInfo.openId,
							head_portrait: userInfo.headimgurl || userInfo.avatarUrl,
						});
					}
					uni.reLaunch({
						url: '/pages/user/user'
					});
				});
			},
			// 验证码登录
			handleLoginBySmsCode (params) {
				/*  #ifdef  APP-PLUS  */
				params.group = 'tinyShopApp'
				/*  #endif  */
				/*  #ifdef H5  */
				params.group = 'tinyShopH5'
				/*  #endif  */
				/*  #ifdef  MP-WEIXIN  */
				params.group = 'tinyShopWechatMq'
				/*  #endif  */
				/*  #ifdef  MP-QQ  */
				params.group = 'tinyShopQqMq'
				/*  #endif  */
				this.$post(loginBySmsCode, {
					...params
				}).then(r=>{
			    this.$api.msg('恭喜您，登录成功！')
					this.login(r.data);
					uni.switchTab({
						url: '/pages/user/user'
					})
				})
			}
		}
	}
</script>

<style lang='scss'>
	page{
		background: #fff;
	}
	.container{
		padding-top: 115px;
		position:relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: #fff;
	}
	.wrapper{
		position:relative;
		z-index: 90;
		background: #fff;
		padding-bottom: 40upx;
	}
	.back-btn{
		position:absolute;
		left: 40upx;
		z-index: 9999;
		padding-top: var(--status-bar-height);
		top: 40upx;
		font-size: 40upx;
		color: $font-color-dark;
	}
	.left-top-sign{
		font-size: 120upx;
		color: $page-color-base;
		position:relative;
		left: -16upx;
	}
	.right-top-sign{
		position:absolute;
		top: 80upx;
		right: -30upx;
		z-index: 95;
		&:before, &:after{
			display:block;
			content:"";
			width: 400upx;
			height: 80upx;
			background: #b4f3e2;
		}
		&:before{
			transform: rotate(50deg);
			border-radius: 0 50px 0 0;
		}
		&:after{
			position: absolute;
			right: -198upx;
			top: 0;
			transform: rotate(-50deg);
			border-radius: 50px 0 0 0;
			/* background: pink; */
		}
	}
	.left-bottom-sign{
		position:absolute;
		left: -270upx;
		bottom: -320upx;
		border: 100upx solid #d0d1fd;
		border-radius: 50%;
		padding: 180upx;
	}
	.welcome{
		position:relative;
		left: 50upx;
		top: -90upx;
		font-size: 46upx;
		color: #555;
		text-shadow: 1px 0px 1px rgba(0,0,0,.3);
	}
	.input-content{
		padding: 0 60upx;
	}
	.input-item{
		display:flex;
		flex-direction: column;
		align-items:flex-start;
		justify-content: center;
		padding: 0 30upx;
		background:$page-color-light;
		height: 120upx;
		border-radius: 4px;
		margin-bottom: 50upx;
		&:last-child{
			margin-bottom: 0;
		}
		.tit{
			height: 50upx;
			line-height: 56upx;
			font-size: $font-sm+2upx;
			color: $font-color-base;
		}
		input{
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

	.confirm-btn{
		width: 630upx;
		height: 76upx;
		line-height: 76upx;
		border-radius: 50px;
		margin-top: 70upx;
		background: $uni-color-primary;
		color: #fff;
		font-size: $font-lg;
		&:after{
			border-radius: 100px;
		}
	}
	.forget-section{
		font-size: $font-sm+2upx;
		color: $font-color-spec;
		text-align: center;
		margin-top: 40upx;
	}
	.register-section{
    margin: 30upx 0 50upx 0;
		width: 100%;
		font-size: $font-sm+2upx;
		color: $font-color-base;
		text-align: center;
		text{
			color: $font-color-spec;
			margin-left: 10upx;
		}
		text:first-child {
			margin-right: 10upx;
		}
	}
</style>
