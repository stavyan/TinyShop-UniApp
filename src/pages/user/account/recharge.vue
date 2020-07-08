<template>
	<view class="recharge">
		<view class="block">
			<view class="title">
				我的账户
			</view>
			<view class="content">
				<view class="my">
					我的账户余额：
					<text class="balance" :class="'text-' + themeColor.name">{{
						(userInfo.account && userInfo.account.user_money) || '0'
					}}</text>
					元
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
						<view
							class="box"
							v-for="(amount, index) in amountList"
							:key="index"
							@tap="select(amount)"
							:class="amount.price == inputAmount ? 'bg-' + themeColor.name : 'on'"
						>
							<view class="real">{{ amount.price }}元</view>
							<text class="give">赠送 {{ amount.give_price }}元</text>
						</view>
					</view>
					<view class="num">
						<view class="text">
							自定义充值金额
						</view>
						<view class="input">
							<input
								type="number"
								:class="'text-' + themeColor.name"
								@input="handleInputAmountChange"
								v-model="inputAmount"
							/>
						</view>
						<text class="give" :class="'text-' + themeColor.name" v-if="inputAmountGive > 0"
							>赠送 {{ inputAmountGive }}元</text
						>
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
					<!-- #ifndef MP-WEIXIN -->
					<view class="row" @tap="payType = '2'" v-if="parseInt(payTypeList.order_ali_pay, 10) === 1 && !isWechat">
						<text class="icon iconfont iconalipay"></text>
						<view class="center">
							支付宝支付
						</view>
						<view class="right">
							<radio :checked="payType == '2'" :color="themeColor.color" />
						</view>
					</view>
					<!--#endif-->
					<view class="row" @tap="payType = '1'" v-if="parseInt(payTypeList.order_wechat_pay, 10) === 1">
						<i class="icon iconfont iconweixinzhifu"></i>
						<view class="center">
							微信支付
						</view>
						<view class="right">
							<radio :checked="payType == '1'" :color="themeColor.color" />
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="pay">
			<view class="btn" :class="'bg-' + themeColor.name" @tap="pay">立即充值</view>
			<view class="tis">
				点击立即充值，即代表您同意
				<view class="terms" @tap="toTipDetail">
					《充值协议》
				</view>
			</view>
		</view>
		<!--加载动画-->
		<rfLoading isFullScreen :active="pageLoading"></rfLoading>
	</view>
</template>

<script>
import { memberInfo, rechargeConfigIndex } from '@/api/userInfo';
import { configList } from '@/api/basic';
export default {
	data() {
		return {
			inputAmount: 0, // 金额
			inputAmountGive: 0, // 金额
			amountList: [], // 预设3个可选快捷金额
			payType: 1, // 支付类型
			userInfo: {},
			loading: false,
			providerList: [],
			payTypeList: {},
			isWechat: this.$mPayment.isWechat(),
			pageLoading: true,
			code: ''
		};
	},
	onLoad(options) {
		this.initData(options);
			/*  #ifdef H5  */
			this.code = options.code && options.code.split(',')[options.code.split(',').length - 1];
			if (this.$mPayment.isWechat()) {
				if (!this.code) {
						const href = window.location.href;
						window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?
																appid=${this.$mConfig.weixinAppId}&
																redirect_uri=${href}&
																response_type=code&
																scope=snsapi_userinfo&
																state=STATE#wechat_redirect`;
				}
			}
			/*  #endif  */
	},
	methods: {
		// 计算充值送的钱 后台配置
		handleInputAmountChange(e) {
			this.inputAmount = parseFloat(e.detail.value);
			if (this.inputAmount < this.amountList[0].price) {
				this.inputAmountGive = 0;
				return;
			}
			if (
				this.inputAmount >= this.amountList[this.amountList.length - 1].price
			) {
				this.inputAmountGive = this.amountList[
					this.amountList.length - 1
				].give_price;
				return;
			}
			for (let i = 0; i < this.amountList.length; i++) {
				if (
					this.inputAmount >= this.amountList[i].price &&
					this.inputAmount < this.amountList[i + 1].price
				) {
					this.inputAmountGive = this.amountList[i].give_price;
				}
			}
		},
		async pay() {
			if (this.payTypeList.order_ali_pay === '0' && this.payTypeList.order_wechat_pay === '0') return;
			const params = {};
			params.money = parseFloat(this.inputAmount);
			switch (parseInt(this.payType, 10)) {
				case 1: // 微信支付
					await this.$mPayment.weixinPay('recharge', JSON.stringify(params), '/pages/user/account/account', this.code);
					break;
				case 2: // 支付宝支付
					await this.$mPayment.aliPay('recharge', JSON.stringify(params), '/pages/user/account/account');
					break;
				default:
					break;
			}
		},
		// 充值成功后更新用户信息
		async getMemberInfo() {
			this.$http.get(memberInfo).then(r => {
				uni.setStorage({
					key: 'userInfo',
					data: r.data
				});
				this.userInfo = r.data || undefined;
			});
		},
		toTipDetail() {
			this.$mRouter.push({
				route: '/pages/set/about/detail?field=protocol_recharge&title=充值协议'
			});
		},
		// 初始化数据
		async initData(options) {
			this.code = options.code;
			this.userInfo = uni.getStorageSync('userInfo') || undefined;
			await this.$http
				.get(`${rechargeConfigIndex}`)
				.then(r => {
					this.pageLoading = false;
					this.amountList = r.data;
					this.inputAmount = (r.data[0] && r.data[0].price) || 0.01;
					this.inputAmountGive = (r.data[0] && r.data[0].give_price) || 0;
					this.getPayTypeList();
				})
				.catch(() => {
					this.pageLoading = false;
				});
			// #ifdef H5
			if (uni.getSystemInfoSync().platform === 'android') {
				await this.$mPayment.wxConfigH5(window.location.href);
			}
			// #endif
			// #ifdef APP-PLUS
			uni.getProvider({
				service: 'payment',
				success: e => {
					let providerList = [];
					e.provider.map(value => {
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
					});
					this.providerList = providerList;
				},
				fail: e => {}
			});
			// #endif
		},
		// 获取支付类型列表
		async getPayTypeList() {
			await this.$http
				.get(`${configList}`, {
					field: 'order_balance_pay,order_wechat_pay,order_ali_pay'
				})
				.then(r => {
					this.payTypeList = r.data;
				});
		},
		select(item) {
			this.inputAmount = item.price;
			this.inputAmountGive = item.give_price;
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: $color-white;
}

.block {
	width: 100%;
	padding: 20upx;

	.title {
		width: 100%;
		font-size: 34upx;
	}

	.content {
		.my {
			width: 100%;
			height: 120upx;
			display: flex;
			align-items: center;
			font-size: $font-lg;
			border-bottom: solid 1upx #eee;

			.balance {
				margin-right: 6upx;
				font-size: $font-lg + 4upx;
			}
		}

		.amount {
			width: 100%;

			.list {
				display: flex;
				justify-content: space-between;
				padding-top: 20upx;
				flex-wrap: wrap;

				.box {
					width: 31%;
					margin-bottom: 20upx;
					height: 120upx;
					text-align: center;
					border-radius: 10upx;
					box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.05);
					&.on {
						background-color: #f1f1f1;
						color: #333;
					}

					.real {
						font-size: $font-lg;
						margin-top: 10upx;
					}

					.give {
						display: block;
						font-size: $font-sm;
					}
				}
			}

			.num {
				margin-top: 10upx;
				display: flex;
				justify-content: flex-end;
				align-items: center;

				.text {
					padding-right: 10upx;
					font-size: 30upx;
				}

				.give {
					font-size: $font-sm;
				}

				.input {
					width: 28.2vw;
					border-bottom: solid 2upx;
					justify-content: flex-end;
					align-items: center;

					input {
						margin: 0 20upx;
						height: 60upx;
						font-size: 30upx;
						justify-content: flex-end;
						align-items: center;
					}
				}
			}
		}

		.pay-list {
			width: 100%;
			border-bottom: solid 1upx #eee;

			.row {
				width: 100%;
				height: 120upx;
				display: flex;
				align-items: center;

				.icon {
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

				.center {
					width: 100%;
					font-size: 30upx;
				}

				.right {
					width: 100upx;
					flex-shrink: 0;
					display: flex;
					justify-content: flex-end;
				}
			}
		}
	}
}

.pay {
	margin-top: 20upx;
	width: 100%;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;

	.btn {
		width: 70%;
		height: 80upx;
		border-radius: 80upx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
		box-shadow: 0upx 5upx 10upx rgba(0, 0, 0, 0.2);
	}

	.tis {
		margin-top: 10upx;
		width: 100%;
		font-size: 24upx;
		display: flex;
		justify-content: center;
		align-items: baseline;
		color: #999;

		.terms {
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
