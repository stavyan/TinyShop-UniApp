<template>
	<view class="refund">
		<view class="product-info">
			<image class="product-image"
						 mode="aspectFill"
						 :src="productInfo.product_picture"></image>
			<view class="product-content">
				<text class="product-name in2line">{{ productInfo.product_name }}</text>
				<text class="product-sku-name">{{ productInfo.skuName || '基础款' }}</text>
				<text class="product-price">{{ productInfo.product_money }} * {{ productInfo.num }}</text>
			</view>
		</view>
		<view class="product-textarea">
       <textarea class="textarea" maxlength="140"
								 @input="handleContentChange"
								 :value="refund_reason"
								 placeholder-style="color:#ccc; font-size: 24upx"
								 placeholder="宝贝不满足你的期待吗？请填写一下你的退货理由吧"/>
			<view class="tips">
				<text v-show="refund_reason.length > 0 && refund_reason.length < 40">
					您已输入<text class="f"> {{ refund_reason.length }} </text>字
				</text>
				<text v-show="refund_reason.length >= 40">
						还可输入 <text class="s"> {{ wordLimit }} </text> 字
				</text>
			</view>
		</view>

		<button class="confirm-btn" @click="handleOrderRefundApply(productInfo.id, refundType)">
			{{ parseInt(refundType, 10) === 1 ? '退款': '退货' }}
		</button>
	</view>
</template>

<script>
	/**
	 * @des 发布评价
	 *
	 * @author stav stavyan@qq.com
	 * @date 2019-11-27 14:32
	 * @copyright 2019
	 */
	import uniRate from "@/components/uni-rate/uni-rate.vue"
	import {orderRefundApply} from "../../api/userInfo";
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	export default{
		components: { uniRate, uniIcons },
		data(){
			return {
				productInfo: {},
				refundType: 1,
				refund_reason: '',
			}
		},
		computed: {
			wordLimit () {
				return 140 - this.refund_reason.length;
			}
		},
		onLoad(options){
			this.productInfo = JSON.parse(options.data);
			this.refundType = options.refundType
			this.token = uni.getStorageSync('accessToken') || undefined;
		},
		methods: {
			/**
			 *@des 评价内容监听事件
			 *@author stav stavyan@qq.com
			 *@blog https://stavtop.club
			 *@date 2019/11/27 15:51:21
			 *@param arguments
			 */
			handleContentChange (e) {
				this.refund_reason = e.detail.value;
			},
			/**
			 *@des 退货/退款
			 *@author stav stavyan@qq.com
			 *@blog https://stavtop.club
			 *@date 2019/12/03 15:43:18
			 */
			async handleOrderRefundApply(id, refund_type) {
				uni.showLoading({title: '加载中...'});
				await this.$post(`${orderRefundApply}`, {
					id,
					refund_type,
					refund_reason: this.refund_reason
				}).then(r => {
					if (r.code === 200) {
						uni.showToast({title: '退款成功', icon: "none"});
						uni.navigateBack({
							delta: 2
						});
					} else {
						uni.showToast({title: r.message, icon: "none"});
					}
				}).catch(err => {
					console.log(err)
				})
			},
		}
	}
</script>

<style lang='scss'>
	.refund {
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
					font-size: $font-lg;
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
		.product-textarea {
			margin-top: 20upx;
			height: 300upx;
			border-bottom: 1px solid rgba(0, 0, 0, 0.1);
			position: relative;
			.textarea {
				width: 100%;
			}
			.tips {
				position: absolute;
				bottom: 10upx;
				right: 0;
				font-size: $font-sm;
				color: $font-color-light;
				.f {
					color: $uni-color-success;
				}
				.s {
					color: $uni-color-primary;
				}
			}
			.anonymous {
				color: $font-color-light;
				font-size: $font-sm;
				position: absolute;
				bottom: 0;
				left: 0;
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
