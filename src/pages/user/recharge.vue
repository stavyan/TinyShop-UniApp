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
						<view class="box" v-for="(amount,index) in amountList" :key="index" @tap="select(amount)" :class="{'on':amount == inputAmount}">
							{{amount}}元
						</view>
					</view>
					<view class="num">
						<view class="text">
							自定义充值金额
						</view>
						<view class="input">
							<input type="number" v-model="inputAmount" />
						</view>
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
					<view class="row" @tap="payType='2'">
						<text class="icon yticon icon-alipay"></text>
							<view class="center">
								支付宝支付
							</view>
							<view class="right">
								<radio :checked="payType=='2'" color="#f06c7a" />
							</view>
					</view>
					<view class="row" @tap="payType='1'">
							<text class="icon yticon icon-weixinzhifu"></text>
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
			<view class="btn" @tap="doDeposit">立即充值</view>
			<view class="tis">
				点击立即充值，即代表您同意<view class="terms" @click="toTipDetail">
					《条款协议》
				</view>
			</view>
		</view>

			<view class="uni-padding-wrap">
					<view style="background:#FFF; padding:50upx 0;">
							<view class="uni-hello-text uni-center">支付金额</text></view>
							<view class="uni-h1 uni-center uni-common-mt">
									<text class="rmbLogo">￥</text>
									<input class="price" type="digit" :value="price" maxlength="4" @input="priceChange" />
							</view>
					</view>
			</view>
		 <view class="uni-btn-v uni-common-mt">
				<button type="primary" @click="weixinPay" :loading="loading">微信支付</button>
				<!-- #ifdef APP-PLUS -->
				<template v-if="providerList.length > 0">
						<button v-for="(item,index) in providerList" :key="index" @click="requestPayment(item,index)"
								:loading="item.loading">{{item.name}}支付</button>
				</template>
				<!-- #endif -->
		</view>
	</view>
</template>

<script>
	import {orderPay} from "../../api/product";
	import {payCreate, wechatConfig} from "../../api/basic";
	import jweixin from 'jweixin-module';

	export default {
		data() {
			return {
				inputAmount:'',//金额
				amountList:[10,50,100],//预设3个可选快捷金额
				payType: 1,//支付类型
				userInfo: {},
				loading: false,
				price: 1,
				providerList: [],
				code: null
			};
		},
		onLoad(options) {
			this.initData(options);
		},
		methods:{
			 async weixinPay() {
				 // console.log("发起支付");
				 // uni.login({
					//  success: async (e) => {
					// 	 uni.showToast({title: e, icon: "none"});
					//  }
				 // });
				 // var jweixin = require('jweixin-module');
				 // jweixin.ready(async function () {
				 // 	console.log(11)
					//  jweixin.login({
					// 	success (res) {
					// 		console.log(res.code)
					// 		if (res.code) {
					// 		} else {
					// 			console.log('登录失败！' + res.errMsg)
					// 		}
					// 	}
					// })
				 // })
				 // return;
				 // uni.login({
					//  success: async (e) => {
					// 	 uni.showToast({title: e, icon: "none"});
					//  }
				 // });
				 const params = {};
				 params.money = this.price;
				 // params.code = this.code;
				 await this.$post(`${payCreate}`, {
					 orderGroup: 'recharge',
					 payType: 1,
					 tradeType: 'js',
					 data: JSON.stringify(params)
				 }).then(r => {
					 if (r.code === 200) {
						 jweixin.ready(()=>{
							 jweixin.chooseWXPay({
								 timestamp: r.data.config.mch_id, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
								 nonceStr: r.data.config.nonce_str, // 支付签名随机串，不长于 32 位
								 package: `prepay_id=${r.data.config.prepay_id}`, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
								 signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
								 paySign: r.data.config.sign, // 支付签名
								 success: function (res) {
									 // 支付成功后的回调函数
								 }
							 });
						 })
					 } else {
						 uni.showToast({title: r.message, icon: "none"});
					 }
				 }).catch(err => {
					 console.log(err)
				 })
				 return;
				 jweixin.ready(async function () {
					 uni.showToast({title: '111', icon: "none"});
					 const params = {};
					 params.money = this.price;
					 await this.$post(`${payCreate}`, {
						 orderGroup: 'recharge',
						 payType: 1,
						 tradeType: 'js',
						 data: JSON.stringify(params)
					 }).then(r => {
						 if (r.code === 200) {
							 console.log(r.data)
						 } else {
							 uni.showToast({title: r.message, icon: "none"});
						 }
					 }).catch(err => {
						 console.log(err)
					 })
					 // TODO
					 wx.chooseWXPay({
						 timestamp: 0, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
						 nonceStr: '', // 支付签名随机串，不长于 32 位
						 package: '', // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
						 signType: '', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
						 paySign: '', // 支付签名
						 success: function (res) {
							 // 支付成功后的回调函数
						 }
					 });
				 });
				 return;
				 this.loading = true;
				 uni.login({
					 success: async (e) => {
						 console.log("login success", e);
						 const params = {};
						 params.money = this.price;
						 params.code = e.code;
						 await this.$post(`${payCreate}`, {
							 orderGroup: 'recharge',
							 payType: 1,
							 tradeType: 'js',
							 data: JSON.stringify(params)
						 }).then(r => {
							 if (r.code === 200) {
								 console.log(r.data)
							 } else {
								 uni.showToast({title: r.message, icon: "none"});
							 }
						 }).catch(err => {
							 console.log(err)
						 })
						 // uni.request({
						 // 	url: `https://unidemo.dcloud.net.cn/payment/wx/mp?code=${e.code}&amount=${this.price}`,
						 // 	success: (res) => {
						 // 		console.log("pay request success", res);
						 // 		if (res.statusCode !== 200) {
						 // 			uni.showModal({
						 // 				content: "支付失败，请重试！",
						 // 				showCancel: false
						 // 			});
						 // 			return;
						 // 		}
						 // 		if (res.data.ret === 0) {
						 // 			console.log("得到接口prepay_id", res.data.payment);
						 // 			let paymentData = res.data.payment;
						 // 			uni.requestPayment({
						 // 				timeStamp: paymentData.timeStamp,
						 // 				nonceStr: paymentData.nonceStr,
						 // 				package: paymentData.package,
						 // 				signType: 'MD5',
						 // 				paySign: paymentData.paySign,
						 // 				success: (res) => {
						 // 					uni.showToast({
						 // 						title: "感谢您的赞助!"
						 // 					})
						 // 				},
						 // 				fail: (res) => {
						 // 					uni.showModal({
						 // 						content: "支付失败,原因为: " + res
						 // 								.errMsg,
						 // 						showCancel: false
						 // 					})
						 // 				},
						 // 				complete: () => {
						 // 					this.loading = false;
						 // 				}
						 // 			})
						 // 		} else {
						 // 			uni.showModal({
						 // 				content: res.data.desc,
						 // 				showCancel: false
						 // 			})
						 // 		}
						 // 	},
						 // 	fail: (e) => {
						 // 		console.log("fail", e);
						 // 		this.loading = false;
						 // 		uni.showModal({
						 // 			content: "支付失败,原因为: " + e.errMsg,
						 // 			showCancel: false
						 // 		})
						 // 	}
						 // })
					 },
					 fail: (e) => {
						 console.log("fail", e);
						 this.loading = false;
						 uni.showModal({
							 content: "支付失败,原因为: " + e.errMsg,
							 showCancel: false
						 })
					 }
				 })
			 },
			 async requestPayment(e, index) {
                this.providerList[index].loading = true;
                let orderInfo = await this.getOrderInfo(e.id);
                console.log("得到订单信息", orderInfo);
                if (orderInfo.statusCode !== 200) {
                    console.log("获得订单信息失败", orderInfo);
                    uni.showModal({
                        content: "获得订单信息失败",
                        showCancel: false
                    })
                    return;
                }
                uni.requestPayment({
                    provider: e.id,
                    orderInfo: orderInfo.data,
                    success: (e) => {
                        console.log("success", e);
                        uni.showToast({
                            title: "感谢您的赞助!"
                        })
                    },
                    fail: (e) => {
                        console.log("fail", e);
                        uni.showModal({
                            content: "支付失败,原因为: " + e.errMsg,
                            showCancel: false
                        })
                    },
                    complete: () => {
                        this.providerList[index].loading = false;
                    }
                })
            },
			getOrderInfo(e) {
					let appid = "";
					// #ifdef APP-PLUS
					appid = plus.runtime.appid;
					// #endif
					let url = 'https://demo.dcloud.net.cn/payment/?payid=' + e + '&appid=' + appid + '&total=' + this.price;
					return new Promise((res) => {
							uni.request({
									url: url,
									success: (result) => {
											res(result);
									},
									fail: (e) => {
											res(e);
									}
							})
					})
			},
			priceChange(e) {
					console.log(e.detail.value)
					this.price = e.detail.value;
			},
			toTipDetail() {
				uni.showToast({title: '我就是条款协议', icon: 'none'});
			},
			/**
			 *@des 初始化数据
			 *@author stav stavyan@qq.com
			 *@blog https://stavtop.club
			 *@date 2019/12/11 11:01:12
			 */ async initData(options) {
				this.code = options.code;
				if (this.isWechat() && !this.code) {
					const url = window.location.href;
					window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?
					appid=wx869d264c83ad71cc&
					redirect_uri=${url}&
					response_type=code&
					scope=snsapi_userinfo&
					state=STATE#wechat_redirect`;
				}
				const jsApiList = JSON.stringify(['chooseWXPay']);
				this.userInfo = uni.getStorageSync('userInfo') || undefined;
				await this.$post(`${wechatConfig}`, {
					url: window.location.href,
					jsApiList,
					debug: true,
				}).then(r => {
					if (r.code === 200) {
						jweixin.config({
							...r.data
						})
					} else {
						uni.showToast({title: r.message, icon: "none"});
					}
				}).catch(err => {
					console.log(err)
				})
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
			select(amount){
				this.inputAmount = amount;
			},
			async doDeposit() {
				if (parseFloat(this.inputAmount).toString() == "NaN") {
					uni.showToast({title: '请输入正确金额', icon: 'none'});
					return;
				}
				if (this.inputAmount <= 0) {
					uni.showToast({title: '请输入大于0的金额', icon: 'none'});
					return;
				}
				if (parseFloat(this.inputAmount).toFixed(2) != parseFloat(this.inputAmount)) {
					uni.showToast({title: '最多只能输入两位小数哦~', icon: 'none'});
					return;
				}
				const data = {};
				data.money = this.inputAmount;
				//模板模拟支付，实际应用请调起微信/支付宝
				uni.showLoading({title: '支付中...'});
				await this.$post(`${orderPay}`, {
					data: JSON.stringify(data),
					orderGroup: 'recharge',
					tradeType: 'default',
					payType: this.payType
				}).then(async r => {
					if (r.code === 200) {
						uni.showToast({title: '支付成功', icon: "none"});
						uni.redirectTo({
							url: '/pages/money/paySuccess'
						});
					} else {
						uni.showToast({title: r.message, icon: "none"});
					}
				}).catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="scss">
	.block{
		width: 94%;
		padding: 20upx 3%;
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
					padding: 20upx 0;
					.box{
						width: 30%;
						height: 120upx;
						display: flex;
						justify-content: center;
						align-items: center;
						border-radius: 10upx;
						box-shadow: 0upx 5upx 20upx rgba(0,0,0,0.05);
						font-size: 36upx;
						background-color: #f1f1f1;
						color: 333;
						&.on{
							background-color: #f06c7a;
							color: #fff;
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
					.icon-erjiye-yucunkuan {
						color: #fe8e2e;
					}
					.icon-weixinzhifu {
						color: #36cb59;
					}
					.icon-alipay {
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
