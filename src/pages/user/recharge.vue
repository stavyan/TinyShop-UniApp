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
			<view class="btn" @click="weixinPay">立即充值</view>
			<view class="tis">
				点击立即充值，即代表您同意<view class="terms" @click="toTipDetail">
					《条款协议》
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {orderPay} from "../../api/product";
	import {payCreate} from "../../api/basic";
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
				 const params = {};
				 params.money = this.inputAmount;
				 await this.$post(`${payCreate}`, {
					 orderGroup: 'recharge',
					 payType: 1,
					 tradeType: 'js',
					 data: JSON.stringify(params)
				 }).then(r => {
					 if (r.code === 200) {
						 console.log(r.data)
						 jweixin.config({
								debug: true,
							 ...r.data.config
						 })
					 } else {
						 uni.showToast({title: r.message, icon: "none"});
					 }
				 }).catch(err => {
					 console.log(err)
				 })
			 },
			toTipDetail() {
				uni.showToast({title: '我就是条款协议', icon: 'none'});
			},
			/**
			 *@des 初始化数据
			 *@author stav stavyan@qq.com
			 *@blog https://stavtop.club
			 *@date 2019/12/11 11:01:12
			 */
			initData (options) {
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
				this.userInfo = uni.getStorageSync('userInfo') || undefined;
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
