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
			<form @submit="handleOrderRefundApply">
				<radio-group v-if="parseInt(refundType, 10) != 1" name="refund_type" class="refund-type" @change="handleRefundTypeChange">
					<label class="gender-item" v-for="(item, index) in refundTypeArr" :key="index">
						<radio class="gender-item-radio" :value="item.value" color="#fa436a" :checked="refund_type == item.value" />
						<text class="gender-item-text">{{ item.name }}</text>
					</label>
				</radio-group>
				 <textarea name="refund_reason" class="textarea" maxlength="140"
					 @input="handleContentChange"
					 :value="refund_reason"
					 placeholder-style="color:#ccc; font-size: 24upx"
					 placeholder="宝贝不满足你的期待吗？请填写一下你的退货/退款理由吧"/>
				<view class="tips">
					<text v-if="refund_reason.length > 0 && refund_reason.length < 40">
						您已输入<text class="f"> {{ refund_reason.length }} </text>字
					</text>
					<text v-if="refund_reason.length >= 40">
							还可输入 <text class="s"> {{ wordLimit }} </text> 字
					</text>
				</view>
				<button class="confirm-btn" formType="submit">{{ parseInt(refund_type, 10) === 1 ? '仅退款': '退货退款' }}</button>
			</form>
		</view>
	</view>
</template>

<script>
	/**
	 * @des 发表评价
	 *
	 * @author stav stavyan@qq.com
	 * @date 2019-11-27 14:32
	 * @copyright 2019
	 */
	import uniRate from '@/components/rf-rate/rf-rate.vue'
	import {orderRefundApply} from '@/api/userInfo';
	import {orderCustomerRefundApply} from '@/api/userInfo';
	const graceChecker = require('@/common/graceChecker.js');
	export default{
		components: { uniRate },
		data(){
			return {
				productInfo: {},
				refundType: 1,
				refund_type: 1,
				refund_reason: '',
				refundTypeArr: [
					{
						value: '1',
						name: '仅退款'
					},
					{
						value: '2',
						name: '退货退款'
					}]
			}
		},
		computed: {
			wordLimit () {
				return 140 - this.refund_reason.length;
			}
		},
		onLoad(options){
			this.initData(options);
		},
		methods: {
			/**
			 *@des 数据初始化
			 *@author stav stavyan@qq.com
			 *@blog https://stavtop.club
			 *@date 2020/01/03 16:02:40
			 */
			initData(options) {
				this.token = uni.getStorageSync('accessToken') || undefined;
				this.productInfo = JSON.parse(options.data);
				this.refundType = options.refundType;
				let title = '仅退款';
				if(parseInt(this.refundType, 10) === 1){
					title = '仅退款'
				} else {
					title = '仅退款/退货退款'
				}
				uni.setNavigationBarTitle({
					title
				});
			},
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
			handleRefundTypeChange (e) {
				this.refund_type = e.detail.value;
			},
			/**
			 *@des 退货/退款
			 *@author stav stavyan@qq.com
			 *@blog https://stavtop.club
			 *@date 2019/12/03 15:43:18
			 */
			async handleOrderRefundApply(e) {
				const formData = e.detail.value;
				// formData.refund_type = this.refundType;
				if (parseInt(this.refundType, 10) === 1) {
					formData.refund_type = this.refundType;
				}
				let rule = [
					{name:'refund_reason', checkType : 'notnull', checkRule:'',  errorMsg:'请输入退款/退货理由'}
				];
				const checkRes = graceChecker.check(formData, rule);
				if(!checkRes){
					this.$mHelper.toast(graceChecker.error);
					return;
				}
				if (this.refundType == 3) {
					this.handleOrderCustomerRefundApply(this.productInfo.id, formData);
				} else {
					this.handleOrderRefundApplyOperation(this.productInfo.id, formData);
				}
			},
			async handleOrderRefundApplyOperation(id, formData) {
				await this.$http.post(`${orderRefundApply}`, {
					id,
					...formData
				}).then(() => {
					this.$mHelper.toast('申请成功');
					this.$mRouter.back();
				});
			},
			async handleOrderCustomerRefundApply(id, formData) {
				await this.$http.post(`${orderCustomerRefundApply}`, {
					id,
					...formData
				}).then(() => {
					this.$mHelper.toast('申请成功');
					this.$mRouter.back();
				});
			}
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
			.refund-type {
				margin: 20upx 0;
			}
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
