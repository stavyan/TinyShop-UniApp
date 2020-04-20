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
					<radio value="" color="#fa436a" :checked='payType == 1'/>
				</label>
			</view>
			<view class="type-item b-b" @tap="changePayType(2)" v-if="parseInt(payTypeList.order_ali_pay, 10) === 1">
				<i class="iconfont icon iconalipay"></i>
				<view class="con">
					<text class="tit">支付宝支付</text>
					<text>推荐使用支付宝支付</text>
				</view>
				<label class="radio">
					<radio value="" color="#fa436a" :checked='payType == 2'/>
				</label>
			</view>
			<view class="type-item" @tap="changePayType(5)" v-if="parseInt(payTypeList.order_balance_pay, 10) === 1">
				<i class="iconfont icon iconerjiye-yucunkuan"></i>
				<view class="con">
					<text class="tit">预存款支付</text>
					<text>可用余额 {{ userInfo && userInfo.account && userInfo.account.user_money }}</text>
				</view>
				<label class="radio">
					<radio value="" color="#fa436a" :checked='payType === 5'/>
				</label>
			</view>
		</view>
		<text class="mix-btn" @tap="confirm">确认支付</text>
	</view>
</template>

<script>
    import {orderPay} from "@/api/product";
    import {orderDetail} from "@/api/userInfo";
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
        computed: {},
        onLoad(options) {
            this.initData(options);
        },
        methods: {
            // 数据初始化
            async initData(options) {
                this.orderInfo.order_id = parseInt(options.id, 10);
                this.getPayTypeList();
                this.getOrderDetail(options.id);
                this.userInfo = uni.getStorageSync('userInfo') || undefined;
                // #ifdef H5
		            if (uni.getSystemInfoSync().platform === 'android') await this.$mPayment.wxConfigH5();
				        // #endif
            },
            //选择支付方式
            changePayType(type) {
                this.payType = type;
            },
            // 获取订单费用
            async getOrderDetail(id) {
                await this.$http.get(`${orderDetail}`, {
                    id, // 订单id
                    simplify: 1 // 获取简化订单详情
                }).then(r => {
                    this.money = r.data.pay_money
                }).catch(err => {
                    console.log(err)
                });
            },
            // 获取支付类型列表
            async getPayTypeList() {
                await this.$http.get(`${configList}`, {
                    field: 'order_balance_pay,order_wechat_pay,order_ali_pay'
                }).then(r => {
                    this.payTypeList = r.data
                });
            },
            //确认支付
            async confirm() {
                switch (parseInt(this.payType)) {
                  case 1:
                    this.$mPayment.weixinPay('order', JSON.stringify(this.orderInfo));
                    break;
                  case 2:
                    this.$mPayment.aliPay('order', JSON.stringify(this.orderInfo));
                    break;
                  case 5:
                    this.$mPayment.balancePay(JSON.stringify(this.orderInfo));
                    break;
                }
            },
            async balancePay() {
            	const payType = parseInt(this.payType, 10);
                if (payType === 1) {
                    // #ifdef H5
                    if (isWechat()) {
                        params.trade_type = 'js';
                    } else {
                        params.trade_type = 'wap';
                    }
                    // #endif
                    // #ifdef MP
                    params.trade_type = 'mini_program';
                    // #endif
                } else if (payType === 5) {
                    params.trade_type = 'default';
                }
                await this.$http.post(`${orderPay}`, {
                    data: JSON.stringify(this.orderInfo),
                    order_group: 'order',
                    trade_type: 'js',
                    pay_type: this.payType
                }).then(async () => {
                    this.$mHelper.toast('支付成功~');
                    this.$mRouter.push({route: '/pages/user/money/success'});
                });
            }
        }
    }
</script>

<style lang='scss'>
	page {
		background-color: $color-white;
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

		.price {
			font-size: 50upx;
			color: #303133;
			margin-top: 12upx;

			&:before {
				content: '￥';
				font-size: 40upx;
			}
		}
	}

	.pay-type-list {
		margin-top: 20upx;
		background-color: #fff;
		padding-left: 60upx;

		.type-item {
			height: 120upx;
			padding: 20upx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-right: 60upx;
			font-size: 30upx;
			position: relative;
		}

		.icon {
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

		.tit {
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 4upx;
		}

		.con {
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
