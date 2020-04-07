<template>
	<view>
		<view class="block">
			<view class="title">
				我的账户
			</view>
			<view class="content">
				<view class="my">
					我的账户余额：
					<text class="balance">{{ userInfo.account && userInfo.account.user_money || '0' }}</text> 元
				</view>
			</view>
		</view>
		<view class="block">
			<view class="title">
				充值金额
			</view>
			<view class="content">
				<view class="amount">
					<view class="list">
						<view class="box" v-for="(amount,index) in amountList" :key="index" @tap="select(amount)" :class="{'on':amount.price == inputAmount}">
							<view class="real">{{amount.price}}元</view>
							<text class="give">赠送 {{ amount.give_price }}元</text>
						</view>
					</view>
					<view class="num">
						<view class="text">
							自定义充值金额
						</view>
						<view class="input">
							<input type="number" @input="handleInputAmountChange" v-model="inputAmount" />
						</view>
						<text class="give" v-if="inputAmountGive > 0">赠送 {{ inputAmountGive }}元</text>
					</view>
				</view>
			</view>
		</view>
		<view class="block">
			<view class="title">
				选择支付方式
			</view>
			<view class="content">
				<view class="pay-list">
				  <!--#ifdef MP-ALIPAY-->
					<view class="row" @tap="payType='2'">
						<i class="icon iconfont iconalipay"></i>
							<view class="center">
								支付宝支付
							</view>
							<view class="right">
								<radio :checked="payType=='2'" color="#f06c7a" />
							</view>
					</view>
					<!-- #endif-->
					<view class="row" @tap="payType='1'">
							<i class="icon iconfont iconweixinzhifu"></i>
							<view class="center">
								微信支付
							</view>
							<view class="right">
								<radio :checked="payType=='1'" color="#f06c7a" />
							</view>
					</view>
				</view>
			</view>
		</view>
		<view class="pay">
			<view class="btn" @tap="weixinPay">立即充值</view>
			<view class="tis">
				点击立即充值，即代表您同意<view class="terms" @tap="toTipDetail">
					《充值协议》
				</view>
			</view>
		</view>

		<!--加载动画-->
		<rf-loading v-if="pageLoading"></rf-loading>
	</view>
</template>

<script>
	import {payCreate, wechatConfig} from "@/api/basic";
	// #ifdef H5
	import jweixin from '@/utils/jweixin';
	// #endif
	import {isBindingCheck} from "@/api/login";
  import {rechargeUrl, weixinAppId} from "@/api/params";
  import {memberInfo, rechargeConfigIndex} from "@/api/userInfo";
	export default {
		data() {
			return {
				inputAmount: 0,//金额
				inputAmountGive: 0,//金额
				amountList:[],//预设3个可选快捷金额
				payType: 1,//支付类型
				userInfo: {},
				loading: false,
				providerList: [],
				code: null,
				pageLoading: true,
			};
		},
		onLoad(options) {
			this.initData(options);
		},
		methods:{
			handleInputAmountChange (e) {
				this.inputAmount = parseFloat(e.detail.value);
				if (this.inputAmount < this.amountList[0].price) {
				    this.inputAmountGive = 0;
				    return;
				}
				if (this.inputAmount >= this.amountList[this.amountList.length - 1].price) {
				    this.inputAmountGive = this.amountList[this.amountList.length - 1].give_price;
				    return;
				}
				for (let i = 0; i < this.amountList.length; i++) {
						if (this.inputAmount >= this.amountList[i].price && this.inputAmount < this.amountList[i + 1].price) {
							this.inputAmountGive = this.amountList[i].give_price;
						}
				}
				// this.amountList.forEach(item => {
				// 	if (this.inputAmount > item.price) {
				// 		this.inputAmountGive = item.give_price;
				// 	}
				// })
			},
			async weixinPay() {
		    const _this = this;
		    // #ifdef H5
		    if (!this.isWechat()) {
					this.$api.msg('仅支持微信H5和微信小程序充值~')
				    return;
		    }
		    // #endif
		    // #ifdef MP-QQ
				this.$api.msg('QQ小程序暂不支持充值~')
		    return;
		    // #endif
				 await this.$post(`${isBindingCheck}`, {
					// #ifdef H5
					oauth_client: 'wechat',
				 // #endif
				 // #ifdef MP-QQ
					oauth_client: 'qq',
				 // #endif
				 // #ifdef MP-WEIXIN
					oauth_client: 'wechatMp',
				 // #endif
				}).then(async res => {
						 const params = {};
						 params.money = parseFloat(this.inputAmount);
						 await this.$post(`${payCreate}`, {
							 order_group: 'recharge',
							 pay_type: 1,
							 // #ifdef H5
							 trade_type: 'js',
							 // #endif//
							 // #ifdef MP-WEIXIN
					     trade_type: 'mini_program',
							 // #endif
							 data: JSON.stringify(params),
							 openid: res.data.openid
						 }).then(r => {
			         // #ifdef H5
						   if (!this.isWechat()) {
								 this.$api.msg('请复制当前地址进入微信进行充值~')
							   return;
						   }
						   jweixin.ready(() => {
								 jweixin.chooseWXPay({
									 ...r.data.config,
									 success () {
										 // 支付成功后的回调函数
										 _this.getMemberInfo();
									 },
									 fail (res) {
										 // 支付成功后的回调函数
	                    uni.showModal({
	                        content: "支付失败,原因为: " + res
	                            .errMsg,
	                        showCancel: false
	                    })
									 }
								 });
							 });
				       // #endif
							 // #ifdef MP-WEIXIN
						   uni.requestPayment({
	                ...r.data.config,
								   timeStamp: r.data.config.timestamp,
	                success: () => {
										 _this.getMemberInfo();
	                },
	                fail: (res) => {
	                    uni.showModal({
	                        content: "支付失败,原因为: " + res
	                            .errMsg,
	                        showCancel: false
	                    })
	                },
	                complete: () => {
	                    this.loading = false;
	                }
	             })
							 // #endif
						 }).catch(err => {
							 console.log(err)
						 })
				 }).catch(err => {
					console.log(err)
				});
			 },
			// 充值成功后更新用户信息
      async getMemberInfo() {

         this.$get(memberInfo).then(r => {
          uni.setStorage({
              key: 'userInfo',
              data: r.data
          })
          this.userInfo = r.data || undefined;
        })
      },
			toTipDetail() {
		    uni.navigateTo({url: `/pages/set/about/detail?field=protocol_recharge&title=充值协议`})
			},
			/**
			 *@des 初始化数据
			 *@author stav stavyan@qq.com
			 *@blog https://stavtop.club
			 *@date 2019/12/11 11:01:12
			 */
			async initData(options) {
				this.code = options.code;
				this.userInfo = uni.getStorageSync('userInfo') || undefined;
				await this.$get(`${rechargeConfigIndex}`).then(r => {
			    this.pageLoading = false;
					this.amountList = r.data;
					this.inputAmount =  r.data[0] && r.data[0].price || 0.01;
					this.inputAmountGive =  r.data[0] && r.data[0].give_price || 0;
				}).catch(() => {
			    this.pageLoading = false;
				});
				// #ifdef H5
				if (this.isWechat() && !this.code) {
						const url = window.location.href;
						window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?
						appid=${weixinAppId}&&
						redirect_uri=${url}&
						response_type=code&
						scope=snsapi_userinfo&
						state=STATE#wechat_redirect`;
						return;
					}
				const jsApiList = JSON.stringify(['chooseWXPay']);
				await this.$post(`${wechatConfig}`, {
					url: rechargeUrl,
					jsApiList,
					debug: true,
				}).then(r => {
						jweixin.config({
							...r.data
						})
				}).catch(err => {
					console.log(err)
				});
				// #endif
				// #ifdef APP-PLUS
				uni.getProvider({
					service: "payment",
					success: (e) => {
						console.log("payment success:" + JSON.stringify(e));
						let providerList = [];
						e.provider.map((value) => {
							switch (value) {
								case 'alipay':
									providerList.push({
										name: '支付宝',
										id: value,
										loading: false
									});
									break;
								case 'wxpay':
									providerList.push({
										name: '微信',
										id: value,
										loading: false
									});
									break;
								default:
									break;
							}
						})
						this.providerList = providerList;
					},
					fail: (e) => {
						console.log("获取支付通道失败：", e);
					}
				});
				// #endif
			},
			isWechat(){
					const ua = window.navigator.userAgent.toLowerCase();
					if(ua.match(/micromessenger/i) == 'micromessenger'){
							return true;
					}else{
							return false;
					}
			},
			select(item){
				this.inputAmount = item.price;
				this.inputAmountGive = item.give_price;
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $page-color-white;
	}
	.block{
		width: 100%;
		padding: 20upx;
		.title{
			width: 100%;
			font-size: 34upx;
		}
		.content{
			.my{
				width: 100%;
				height: 120upx;
				display: flex;
				align-items: center;
				font-size: $font-lg;
				border-bottom: solid 1upx #eee;
				.balance {
					margin-right: 6upx;
					color: $base-color;
					font-size: $font-lg + 4upx;
				}
			}
			.amount{
				width: 100%;
				.list{
					display: flex;
					justify-content: space-between;
					padding-top: 20upx;
					flex-wrap: wrap;
					.box{
						width: 31%;
						margin-bottom: 20upx;
						height: 120upx;
						text-align: center;
						border-radius: 10upx;
						box-shadow: 0upx 5upx 20upx rgba(0,0,0,0.05);
						background-color: #f1f1f1;
						color: 333;
						&.on{
							background-color: #f06c7a;
							color: #fff;
							.give {
								color: #fff;
							}
						}
						.real {
							font-size: $font-lg;
							margin-top: 10upx;
						}
						.give {
							display: block;
							font-size: $font-sm;
							color: $base-color;
						}
					}
				}
				.num{
					margin-top: 10upx;
					display: flex;
					justify-content: flex-end;
					align-items: center;
					.text{
						padding-right: 10upx;
						font-size: 30upx;
					}
					.give {
						font-size: $font-sm;
						color: $base-color;
					}
					.input{
						width: 28.2vw;
						border-bottom: solid 2upx #999;
						justify-content: flex-end;
						align-items: center;
						input{
							margin: 0 20upx;
							height: 60upx;
							font-size: 30upx;
							color: #f06c7a;
							justify-content: flex-end;
							align-items: center;
						}
					}
				}
			}
			.pay-list{
				width: 100%;
				border-bottom: solid 1upx #eee;
				.row{
					width: 100%;
					height: 120upx;
					display: flex;
					align-items: center;
					.icon{
						width: 100upx;
						font-size: 52upx;
						margin-left: 15upx;
					}
					.iconerjiye-yucunkuan {
						color: #fe8e2e;
					}
					.iconweixinzhifu {
						color: #36cb59;
					}
					.iconalipay {
						color: #01aaef;
					}
					.center{
						width: 100%;
						font-size: 30upx;
					}
					.right{
						width: 100upx;
						flex-shrink: 0;
						display: flex;
						justify-content: flex-end;
					}
				}
			}
		}
	}
	.pay{
		margin-top: 20upx;
		width: 100%;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		.btn{
			width: 70%;
			height: 80upx;
			border-radius: 80upx;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #fff;
			background-color: #f06c7a;
			box-shadow: 0upx 5upx 10upx rgba(0,0,0,0.2);
		}
		.tis{
			margin-top: 10upx;
			width: 100%;
			font-size: 24upx;
			display: flex;
			justify-content: center;
			align-items: baseline;
			color: #999;
			.terms{
				color: #5a9ef7;
			}
		}
	}
	.rmbLogo {
			font-size: 40upx;
	}

	button {
			background-color: #007aff;
			color: #ffffff;
	}

	.uni-h1.uni-center {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: flex-end;
	}

	.price {
			border-bottom: 1px solid #eee;
			width: 200upx;
			height: 80upx;
			padding-bottom: 4upx;
	}

	.ipaPayBtn {
			margin-top: 30upx;
	}
</style>
