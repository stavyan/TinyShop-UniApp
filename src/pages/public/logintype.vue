<template>
	<view class="login-type">
		<view class="logo">
			<image src="/static/missing-face.png"></image>
		</view>
		<view>
			<button class="confirm-btn" open-type="getUserInfo" formType="submit" @tap="toAuthLogin">授权登录</button>
			<button class="confirm-btn plain" plain @tap="toLogin">已有RF账号登录</button>
		</view>
		<view class="footer">
			登录表示同意
			<text class="protocol" @tap="toProtocol">RangeFrame使用协议 / 隐私协议</text>
		</view>
	</view>
</template>

<script>/**
 *@des 登录类型
 *@author stav stavyan@qq.com
 *@blog https://stavtop.club
 *@date 2020/01/09 16:29:42
 */
import {mpWechatLogin, wechatH5Login} from "../../api/login";
import {mapMutations} from "vuex";
export default{
	data(){
		return {
		}
	},
	onLoad(options){
		this.code = options.code;
		if (this.code) {
       this.$get(wechatH5Login, {
        code: this.code
			 }).then(async r => {
				 if (r.code === 200) {
					 if (!r.data.login) {
						 this.user_info = r.data.user_info.original;
						 uni.showModal({
							 content: '你尚未绑定账号，是否跳转登录页面？',
							 success: (confirmRes) => {
								 if (confirmRes.confirm) {
									 const url = `/pages/public/login?userInfo=${JSON.stringify(this.user_info)}`;
									 uni.navigateTo({
										 url
									 })
								 }
							 }
						 });
					 } else {
						 await _this.login(r.data.user_info);
						 uni.showToast({title: '已为您授权登录', icon: "none"});
						 const url = `/pages/user/user`;
					   uni.reLaunch({
						    url
					   });
					 }
				 }
			 })
		}
	},
	methods: {
		...mapMutations(['login']),
    toProtocol () {
      this.$api.msg('我就是RangeFrame使用协议 / 隐私协议！', 2000)
    },
		toLogin () {
      uni.navigateTo({
        url: '/pages/public/login'
      });
		},
		toAuthLogin () {
				const _this = this;
				/*  #ifdef H5  */
				if (this.isWechat()) {
          uni.showModal({
	          content: '是否授权登录?',
	          success: (confirmRes)=> {
	            if (confirmRes.confirm) {
								const href = window.location.href;
								window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?
								appid=wxc052ebc5038f31c0&
								redirect_uri=${href}&
								response_type=code&
								scope=snsapi_userinfo&
								state=STATE#wechat_redirect`;
	            }
							if (confirmRes.cancel) {
							 uni.navigateTo({
								 url
							 })
						 }
	          }
	        });
				} else {
          this.$api.msg('当前平台不支持授权登录~')
				}
				/*  #endif  */
        /*  #ifdef MP-WEIXIN */
        uni.showModal({
          content: '是否授权登录?',
          success: (confirmRes)=> {
            if (confirmRes.confirm) {
              uni.login({
                    provider: 'weixin',
                    success: function (loginRes) {
                        uni.getUserInfo({
                            provider: 'weixin',
                            success: function (infoRes) {
                                console.log(infoRes)
                                _this.$post(mpWechatLogin, {
                                    signature: infoRes.signature,
                                    encryptedData: infoRes.encryptedData,
                                    rawData: infoRes.rawData,
                                    iv: infoRes.iv,
                                    code: loginRes.code
                                }).then(async r => {
                                    if (r.code === 200) {
                                        if (!r.data.login) {
                                            _this.user_info = r.data.user_info;
                                            uni.showModal({
                                                content: '你尚未绑定账号，是否跳转登录页面？',
                                                success: (confirmRes) => {
                                                    if (confirmRes.confirm) {
                                                        const url = `/pages/public/login?userInfo=${JSON.stringify(_this.user_info)}`;
                                                        uni.navigateTo({
                                                            url
                                                        })
                                                    }
                                                }
                                            });
                                        } else {
                                            await _this.login(r.data.user_info);
                                            uni.showToast({title: '已为您授权登录', icon: "none"});
                                            const url = `/pages/user/user`;
                                            uni.reLaunch({
                                                url
                                            });
                                        }
                                    } else {
                                        uni.showToast({title: r.message, icon: "none"});
                                    }
                                })
                            },
                            fail: function (err) {
                                console.log(err);
                            },
                        });
                    }
                });
            }
          }
        });
        /*  #endif  */
		},
		isWechat(){
				const ua = window.navigator.userAgent.toLowerCase();
				if(ua.match(/micromessenger/i) == 'micromessenger'){
						return true;
				}else{
						return false;
				}
		},
	}
}
</script>

<style lang='scss'>
	page{
		background: #fff;
		height: calc(100% - 88upx);
	}
	.login-type {
		padding-top: 120upx;
		.logo {
			text-align: center;
			margin-bottom: 60upx;
			image {
				width: 144upx;
				height: 144upx;
			}
		}
    .confirm-btn{
      width: 630upx;
      height: 76upx;
      line-height: 76upx;
      border-radius: 12upx;
      margin-bottom: 40upx;
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
			font-size: $font-sm;
			.protocol {
				color: $base-color;
				margin: 0 10upx;
			}
		}
	}
</style>
