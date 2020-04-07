<template>
	<view class="app">
		<view class="price-box">
			<text>支付金额</text>
			<text class="price">{{ money }}</text>
		</view>

		<view class="pay-type-list">

			<view class="type-item b-b" @tap="changePayType(1)" v-if="parseInt(payTypeList.order_wechat_pay, 10) === 1">
				<i class="iconfont icon iconweixinzhifu"></i>
				<view class="con">
					<text class="tit">微信支付</text>
					<text>推荐使用微信支付</text>
				</view>
				<label class="radio">
					<radio value="" color="#fa436a" :checked='payType == 1' />
				</label>
			</view>
			<view class="type-item b-b" @tap="changePayType(2)"  v-if="parseInt(payTypeList.order_ali_pay, 10) === 1">
				<i class="iconfont icon iconalipay"></i>
				<view class="con">
					<text class="tit">支付宝支付</text>
				</view>
				<label class="radio">
					<radio value="" color="#fa436a" :checked='payType == 2' />
				</label>
			</view>
			<view class="type-item" @tap="changePayType(5)" v-show="parseInt(payTypeList.order_balance_pay, 10) === 1">
				<i class="iconfont icon iconerjiye-yucunkuan"></i>
				<view class="con">
					<text class="tit">预存款支付</text>
					<text>可用余额 {{ userInfo && userInfo.account && userInfo.account.user_money }}</text>
				</view>
				<label class="radio">
					<radio value="" color="#fa436a" :checked='payType === 5' />
				</label>
			</view>
		</view>

		<text class="mix-btn" @tap="confirm">确认支付</text>
	</view>
</template>

<script>
	import {orderPay} from "@/api/product";
	import {memberInfo, orderDetail} from "@/api/userInfo";
	import {configList} from "@/api/basic";

	export default {
		data() {
			return {
				payType: 5,
				payTypeList: {},
				money: 0,
				userInfo: {},
				orderDetail: {},
				orderInfo: {}
			};
		},
		computed: {

		},
		onLoad(options) {
			this.initData(options);
		},
		methods: {
			/**
			 *@des 数据初始化
			 *@author stav stavyan@qq.com
			 *@blog https://stavtop.club
			 *@date 2019/12/10 11:45:36
			 *@param arguments
			 */
			initData(options) {
				this.orderInfo.order_id = parseInt(options.id, 10);
				this.getPayTypeList();
				this.getOrderDetail(options.id);
				this.userInfo = uni.getStorageSync('userInfo') || undefined;
			},
			//选择支付方式
			changePayType(type) {
				this.payType = type;
			},
			/**
			 *@des 获取订单费用
			 *@author stav stavyan@qq.com
			 *@blog https://stavtop.club
			 *@date 2019/12/10 11:47:30
			 *@param id 订单id
			 */
			async getOrderDetail(id) {
				await this.$get(`${orderDetail}`, {
					id,
					simplify: 1
				}).then(r => {
					this.money = r.data.pay_money
				}).catch(err => {
					console.log(err)
				});
			},
			/**
			 *@des 获取支付类型列表
			 *@author stav stavyan@qq.com
			 *@blog https://stavtop.club
			 *@date 2019/12/12 17:40:00
			 */
			async getPayTypeList() {
				await this.$get(`${configList}`, {
					field: 'order_balance_pay,order_wechat_pay,order_ali_pay'
				}).then(r => {
					this.payTypeList = r.data
				}).catch(err => {
					console.log(err)
				});
			},
			//确认支付
			async confirm () {
				if (this.payType !== 5) {
			    this.$api.msg('暂时只提供余额支付~');
					return
				}
				const params = {};
				params.data = JSON.stringify(this.orderInfo);
				params.order_group = 'order';
				params.pay_type = this.payType;
				if (this.payType == 1) {
					// #ifdef H5
					if (this.isWechat) {
						params.trade_type = 'js';
					} else {
						params.trade_type = 'wap';
					}
					// #endif
					// #ifdef MP
					params.trade_type = 'mini_program';
					// #endif
				} else if (this.payType == 5) {
						params.trade_type = 'default';
				}
				await this.$post(`${orderPay}`, {
					data: JSON.stringify(this.orderInfo),
					order_group: 'order',
					trade_type: 'js',
					pay_type: this.payType
				}).then(async r => {
				  this.$api.msg('支付成功~');
					uni.redirectTo({
						url: '/pages/user/money/success'
					});
				}).catch(err => {
					console.log(err)
				})
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
	page {
		background-color: $page-color-white;
	}
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
		.iconerjiye-yucunkuan {
			color: #fe8e2e;
		}
		.iconweixinzhifu {
			color: #36cb59;
		}
		.iconalipay {
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
