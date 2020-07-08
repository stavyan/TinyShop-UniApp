<template>
	<view class="refund">
		<!-- 商品 -->
		<view class="row">
			<view
				class="carrier"
				@tap="navTo(`/pages/product/product?id=${productInfo.product_id}`)"
			>
				<view class="left" >
					<image
						class="image"
						:src="productInfo.product_picture"
					></image>
				</view>
				<view class="mid">
					<view class="title in2line">{{
						productInfo.product_name
					}}</view>
					<view class="data">
						{{ productInfo.skuName  || singleSkuText }}
					</view>
					<view class="bottom">
						<text class="price" :class="'text-' + themeColor.name">{{ moneySymbol }}{{ productInfo.product_money }} * {{ productInfo.num }}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="product-textarea">
			<form @submit="handleOrderRefundApply">
				<radio-group
					v-if="parseInt(refundType, 10) != 1"
					name="refund_type"
					class="refund-type"
					@change="handleRefundTypeChange"
				>
					<label
						class="gender-item"
						v-for="(item, index) in refundTypeArr"
						:key="index"
					>
						<radio
							class="gender-item-radio"
							:value="item.value"
							:color="themeColor.color"
							:checked="refund_type == item.value"
						/>
						<text class="gender-item-text">{{ item.name }}</text>
					</label>
				</radio-group>
				<list-cell
					@eventClick="chooseRefundReasonType"
					title="退款原因"
					:tips="refund_reason || '请选择'"
				></list-cell>
				<textarea
					class="textarea"
					v-model="refund_explain"
					placeholder-style="color:#ccc; font-size: 26upx"
					placeholder="宝贝不满足您的期待吗？请填写一下您的退货/退款理由吧"
				/>
				<view class="feedback-title">
					<text>退款金额</text>
					<text :class="'text-' + themeColor.name">{{ moneySymbol }}{{ productInfo.product_money }}</text>
				</view>
				<view class="feedback-content">
					<text>成功退款后，该订单的金额会退回至原支付账户</text>
				</view>
				<view class="feedback-title">
					<text>上传凭证(选填,提供至多9张截图,总大小10M以下)</text>
				</view>
				<view class="feedback-body feedback-uploader rf-uploader">
					<view class="uni-uploader">
						<view class="uni-uploader-head">
							<view class="uni-uploader-title">点击预览图片</view>
							<view class="uni-uploader-info">{{ imageList.length }}/9</view>
						</view>
						<view class="uni-uploader-body">
							<view class="uni-uploader__files">
								<block v-for="(image, index) in imageList" :key="index">
									<view class="uni-uploader__file" style="position: relative;">
										<rf-image class="uni-uploader__img" :src="image"></rf-image>
										<view class="close-view" @tap="close(index)" :class="'bg-' + themeColor.name">x</view>
									</view>
								</block>
								<view class="uni-uploader__input-box" v-if="imageList.length < 9">
									<view class="uni-uploader__input" @tap="uploadImage"></view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<button class="confirm-btn" formType="submit" :class="'bg-' + themeColor.name">
					{{ parseInt(refund_type, 10) === 1 ? '仅退款' : '退货退款' }}
				</button>
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
import { orderRefundApply, orderCustomerRefundApply, uploadImage } from '@/api/userInfo';
import listCell from '@/components/rf-list-cell';
export default {
	data() {
		return {
			productInfo: {},
			refundType: 1,
			refund_type: 1,
			refund_reason: '',
			refund_explain: '',
			imageList: [],
			moneySymbol: this.moneySymbol,
			refundTypeArr: [
				{
					value: '1',
					name: '仅退款'
				},
				{
					value: '2',
					name: '退货退款'
				}
			],
			singleSkuText: this.singleSkuText,
			msgContents: [
				'商品信息描述不符',
				'退运费',
				'质量问题',
				'少件含缺少配件',
				'包装/商品损坏/污渍',
				'未按约定时间发货',
				'发票问题',
				'卖家发错货',
				'其他'
			]
		};
	},
	components: {
		listCell
	},
	computed: {
		wordLimit() {
			return 140 - this.refund_reason.length;
		}
	},
	onLoad(options) {
		this.initData(options);
	},
	methods: {
		// 数据初始化
		initData(options) {
			this.productInfo = JSON.parse(options.data);
			this.refundType = options.refundType;
			let title = '仅退款';
			if (parseInt(this.refundType, 10) === 1) {
				title = '仅退款';
			} else {
				title = '仅退款/退货退款';
			}
			uni.setNavigationBarTitle({
				title
			});
		},
		// 快速输入
		chooseRefundReasonType() {
			uni.showActionSheet({
				itemList: this.msgContents,
				success: res => {
					this.refund_reason = this.msgContents[res.tapIndex];
				}
			});
		},
		// 打开相册选图
		uploadImage() {
			const _this = this;
			uni.chooseImage({
				count: 9, // 最多一次可以选择的图片张数
				sizeType: ['compressed'],
				sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机
				success: function(res) {
					if (_this.imageList.length + res.tempFiles.length > 9) {
						_this.$mHelper.toast('不要贪心哦，最多只可上传9张照片');
						return;
					}
					_this.handleUploadFile(res.tempFilePaths);
				}
			});
		},
		// 依次上传图片
		handleUploadFile(data) {
			const _this = this;
			data.forEach(item => {
				_this.$http
					.upload(uploadImage, { filePath: item, name: 'file' })
					.then(r => {
						_this.imageList.push(r.data.url);
					});
			});
		},
		// 删除已选中图片
		close(e) {
			this.imageList.splice(e, 1);
		},
		handleRefundTypeChange(e) {
			this.refund_type = e.detail.value;
		},
		// 跳转页面
		navTo(route) {
			this.$mRouter.push({ route });
		},
		// 退货/退款
		async handleOrderRefundApply(e) {
			const formData = e.detail.value;
			if (parseInt(this.refundType, 10) === 1) {
				formData.refund_type = this.refundType;
			}
			formData['refund_evidence'] = JSON.stringify(this.imageList);
			formData['refund_explain'] = this.refund_explain;
			formData['refund_reason'] = this.refund_reason;
			if (this.refundType.toString() === '3') {
				await this.handleOrderCustomerRefundApply(this.productInfo.id, formData);
			} else {
				await this.handleOrderRefundApplyOperation(this.productInfo.id, formData);
			}
		},
		async handleOrderRefundApplyOperation(id, formData) {
			await this.$http
				.post(`${orderRefundApply}`, {
					id,
					...formData
				})
				.then(() => {
					this.$mHelper.toast('申请成功');
					this.$mRouter.back();
				});
		},
		async handleOrderCustomerRefundApply(id, formData) {
			await this.$http
				.post(`${orderCustomerRefundApply}`, {
					id,
					...formData
				})
				.then(() => {
					this.$mHelper.toast('申请成功');
					this.$mRouter.back();
				});
		}
	}
};
</script>
<style lang="scss">
page {
	background: $color-white;
}
.refund {
	background-color: $color-white;
	/*  #ifndef H5  */
	height: 100vh;
	/*  #endif  */
	.row {
		margin: 0 auto $spacing-lg;
		width: calc(94%);
		height: calc(22vw + 40upx);
		border-radius: 15upx;
		box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.1);
		display: flex;
		align-items: center;
		position: relative;
		overflow: hidden;
		z-index: 4;
		border: 0;
		.carrier {
			@keyframes showMenu {
				0% {
					transform: translateX(0);
				}
				100% {
					transform: translateX(-30%);
				}
			}
			@keyframes closeMenu {
				0% {
					transform: translateX(-30%);
				}
				100% {
					transform: translateX(0);
				}
			}
			&.open {
				animation: showMenu 0.25s linear both;
			}
			&.close {
				animation: closeMenu 0.15s linear both;
			}
			background-color: #fff;
			position: absolute;
			width: 100%;
			padding: 0 0;
			height: 100%;
			z-index: 3;
			display: flex;
			align-items: center;
			.left {
				width: 22vw;
				height: 22vw;
				margin-left: 20upx;
				margin-right: 10upx;
				.image {
					border-radius: 10upx;
					width: 22vw;
					height: 22vw;
				}
			}
			.mid {
				text-align: left;
				width: 100%;
				margin: 10upx 10upx 0;
				.title {
					color: $font-color-dark;
					height: 60upx;
					line-height: 1.2;
					font-size: $font-base;
				}
				.data {
					width: 100%;
					display: flex;
					align-items: center;
					margin: 10upx 0 5upx;
					font-size: $font-base;
					color: $font-color-base;
					.item {
						flex: 1;
					}
					.iconfont {
						color: $font-color-light;
						margin-right: 10upx;
					}
					.status {
						padding: 6upx 20upx;
						background-color: $base-color;
						opacity: 0.8;
						color: $color-white;
						font-size: $font-sm;
						border-radius: 6upx;
					}
				}
				.bottom {
					line-height: 1.2;
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: $font-sm;
					color: $font-color-light;
					.price {
						font-size: $font-lg;
					}
				}
			}
			.data {
				color: $font-color-light;
			}
		}
	}
	.product-textarea {
		margin: $spacing-base 0 0;
		.gender-item {
			.gender-item-radio {
				transform: scale(0.9);
			}
			.gender-item-text {
				margin: 0 $spacing-base 0 $spacing-sm;
			}
		}
		.refund-type {
			margin: $spacing-base $spacing-lg;
		}
		.textarea {
			width: 100%;
			height: 150upx;
			padding: 0 $spacing-lg;
		}
	}
	.confirm-btn {
		width: 630upx;
		height: 76upx;
		line-height: 76upx;
		border-radius: 50px;
		margin-top: 50upx;
		font-size: $font-lg;
		&:after {
			border-radius: 100px;
		}
	}
	/*问题反馈*/
	.feedback-title {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: $spacing-base $spacing-lg;
		font-size: $font-base;
		border-bottom: 1upx solid rgba(0, 0, 0, 0.05);
	}
	.feedback-content {
		padding: $spacing-base $spacing-lg;
		color: $font-color-light;
	}
	.feedback-body {
		background: $color-white;
		padding: $spacing-base $spacing-lg;
		.gender-item {
			margin-right: 20upx;

			.gender-item-text {
				padding-left: 10upx;
			}

			radio .wx-radio-input.wx-radio-input-checked {
				background: $uni-color-primary;
				border-color: $uni-color-primary;
			}
		}
	}
}
</style>
