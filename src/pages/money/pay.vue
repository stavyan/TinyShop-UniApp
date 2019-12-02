<template>
	<view class="app">
		<view class="price-box">
			<text>支付金额</text>
			<text class="price">{{ money }}</text>
		</view>

		<view class="pay-type-list">

			<view class="type-item b-b" @click="changePayType(1)">
				<text class="icon yticon icon-weixinzhifu"></text>
				<view class="con">
					<text class="tit">微信支付</text>
					<text>推荐使用微信支付</text>
				</view>
				<label class="radio">
					<radio value="" color="#fa436a" :checked='payType == 1' />
				</label>
			</view>
			<view class="type-item b-b" @click="changePayType(2)">
				<text class="icon yticon icon-alipay"></text>
				<view class="con">
					<text class="tit">支付宝支付</text>
				</view>
				<label class="radio">
					<radio value="" color="#fa436a" :checked='payType == 2' />
				</label>
			</view>
			<view class="type-item" @click="changePayType(5)">
				<text class="icon yticon icon-erjiye-yucunkuan"></text>
				<view class="con">
					<text class="tit">预存款支付</text>
					<text>可用余额 {{ userInfo && userInfo.account && userInfo.account.user_money }}</text>
				</view>
				<label class="radio">
					<radio value="" color="#fa436a" :checked='payType === 5' />
				</label>
			</view>
		</view>

		<text class="mix-btn" @click="confirm">确认支付</text>
	</view>
</template>

<script>
	import {orderPay} from "../../api/product";
	import {memberInfo} from "../../api/userInfo";

	export default {
		data() {
			return {
				payType: 1,
				money: 0,
				orderInfo: {},
				userInfo: {}
			};
		},
		computed: {

		},
		onLoad(options) {
			this.orderInfo = options.data;
			this.money = options.money;
			this.userInfo = uni.getStorageSync('userInfo') || undefined;
		},
		methods: {
			//选择支付方式
			changePayType(type) {
				this.payType = type;
			},
			//确认支付
			async confirm () {
				if (this.payType === 5) {
					uni.showLoading({title: '正在支付...'});
					await this.$post(`${orderPay}`, {
						data: this.orderInfo,
						orderGroup: 'order',
						tradeType: 'default',
						payType: this.payType
					}).then(async r => {
						if (r.code === 200) {
							uni.showToast({title: '支付成功', icon: "none"});
							await this.$get(memberInfo).then(r => {
								if (r.code === 200) {
									uni.removeStorage({
										key: 'userInfo'
									})
									uni.setStorage({
											key: 'userInfo',
											data: r.data
									})
									uni.redirectTo({
										url: '/pages/money/paySuccess'
									})
								} else {
									uni.showToast({title: r.message, icon: "none"});
								}
							})
						} else {
							uni.showToast({title: r.message, icon: "none"});
						}
					}).catch(err => {
						console.log(err)
					})
				} else {
					uni.showToast({title: '支付成功', icon: "none"});
					uni.redirectTo({
						url: '/pages/money/paySuccess'
					})
				}
			},
		}
	}
</script>

<style lang='scss'>
	.app {
		width: 100%;
	}

	.price-box {
		background-color: #fff;
		height: 265upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 28upx;
		color: #909399;

		.price{
			font-size: 50upx;
			color: #303133;
			margin-top: 12upx;
			&:before{
				content: '￥';
				font-size: 40upx;
			}
		}
	}

	.pay-type-list {
		margin-top: 20upx;
		background-color: #fff;
		padding-left: 60upx;

		.type-item{
			height: 120upx;
			padding: 20upx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-right: 60upx;
			font-size: 30upx;
			position:relative;
		}

		.icon{
			width: 100upx;
			font-size: 52upx;
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
		.tit{
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 4upx;
		}
		.con{
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: $font-sm;
			color: $font-color-light;
		}
	}
	.mix-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 630upx;
		height: 80upx;
		margin: 80upx auto 30upx;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}

</style>
