<template>
	<view class="evaluation">
		<!--商品信息-->
		<view class="product-info">
			<image class="product-image"
						 mode="aspectFill"
						 :src="productInfo.product_picture"></image>
			<view class="product-content">
				<text class="product-name in2line">{{ productInfo.product_name }}</text>
				<text class="product-sku-name">{{ productInfo.sku_name || '基础款' }}</text>
				<text class="product-price">{{ productInfo.product_money }} * {{ productInfo.num }}</text>
			</view>
		</view>
		<!--详细描述信息-->

		<view class="input-content">
			<view class="input-item">
						<text class="tit">快递公司</text>
						<input
							type="text"
							@input="handleRefundShippingCompanyChange"
							:value="salesReturn.refund_shipping_company"
							placeholder="请输入快递公司"
						/>
					</view>
			<view class="input-item">
				<text class="tit">快递单号</text>
				<input
					type="text"
					@input="handleRefundShippingCodeChange"
					:value="salesReturn.refund_shipping_code"
					placeholder="请输入快递单号"
				/>
			</view>
		</view>
		<!--提交退货物流-->
		<button class="confirm-btn" @tap="handleSalesReturn">提交退货物流</button>
	</view>
</template>

<script>
	/**
	 * @des 提交退货物流
	 *
	 * @author stav stavyan@qq.com
	 * @date 2020-03-16 11:15
	 * @copyright 2019
	 */
	import {orderProductSalesReturn, orderCustomerSalesReturn} from '@/api/userInfo';
	export default{
		data(){
			return {
				productInfo: {},
				token: null,
				// 评论表单
				salesReturn: {
					'id': undefined,
					'refund_shipping_code' : undefined,
					'refund_shipping_company' : undefined
				}
			}
		},
		onLoad(options){
		    this.initData(options);
		},
		methods: {
	    // 数据初始化
	    initData(options) {
				this.productInfo = JSON.parse(options.data);
				console.log(this.productInfo)
	    },
			handleRefundShippingCompanyChange (e) {
	    	this.salesReturn.refund_shipping_company = e.detail.value;
			},
			handleRefundShippingCodeChange (e) {
	    	this.salesReturn.refund_shipping_code = e.detail.value;
			},
			// 提交评价
			async handleSalesReturn() {
				this.salesReturn.id = this.productInfo.id;
				if (!this.salesReturn.refund_shipping_company) {
					this.$mHelper.toast('请输入物流公司');
					return;
				}
				if (!this.salesReturn.refund_shipping_code === undefined) {
					this.$mHelper.toast('请输入物流单号');
					return;
				}

				let salesReturnApi = orderProductSalesReturn;
				if (this.productInfo.order_status == 4) {
					salesReturnApi = orderCustomerSalesReturn;
				}
				await this.$http.post(`${salesReturnApi}`, {
					...this.salesReturn
				}).then(() => {
					this.$mRouter.back();
				})
			}
		}
	}
</script>

<style lang='scss'>
	.evaluation {
		background: #fff;
		padding: 20upx;
		.product-info {
			display: flex;
			.product-image {
				width: 200upx;
				height: 150upx;
			}
			.product-content {
				flex: 1;
				margin-left: 20upx;
				.product-name {
					font-size: $font-base;
					color: $font-color-dark;
					line-height: 32upx;
					min-height: 60upx;
				}
				.product-sku-name {
					display: block;
					font-size: $font-base;
					color: $font-color-dark;
				}
			}
		}
		.input-content{
			padding: 80upx 0 40upx;
			.input-item{
				display:flex;
				padding: 0 30upx;
				background: $page-color-light;
				height: 80upx;
				line-height: 80upx;
				border-radius: 4px;
				margin-bottom: 40upx;
				&:last-child{
					margin-bottom: 0;
				}
				.tit{
					width: 120upx;
					font-size: $font-sm+2upx;
					color: $font-color-base;
				}
				input {
					height: 80upx;
					line-height: 80upx;
					font-size: $font-base + 2upx;
					color: $font-color-dark;
				}
				.date {
					height: 80upx;
					line-height: 80upx;
					font-size: $font-base + 2upx;
					color: $font-color-dark;
				}
				.gender {
					margin: 10upx 0;
					color: $font-color-dark;
					font-size: $font-base;
					.gender-item {
						margin-right: 10upx;
						.gender-item-text {
							padding: 0 5upx;
						}
						radio .wx-radio-input.wx-radio-input-checked {
							background: $uni-color-primary;
							border-color: $uni-color-primary;
						}
					}
				}
			}
		}
		.confirm-btn{
			width: 630upx;
			height: 76upx;
			line-height: 76upx;
			border-radius: 50px;
			margin-top: 50upx;
			background: $uni-color-primary;
			color: #fff;
			font-size: $font-lg;
			&:after{
				border-radius: 100px;
			}
		}
	}
</style>
