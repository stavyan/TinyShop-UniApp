<template>
	<view>
		<!-- 优惠明细 -->
		<view v-for="(item, index) in shippingDetail.data" :key="index">
			<!-- 商品信息 -->
			<view class="goods-section">
				<view class="g-header b-b">
					<text class="name">商品信息</text>
				</view>
				<!-- 商品信息 @tap="navTo(`/pages/product/product?id=${item.order_product.id}`)" -->
				<view class="g-item">
					<image
						:src="item.order_product.product_picture"
						mode="aspectFill"
					></image>
					<view class="right">
						<text class="title clamp">{{
							item.order_product.product_name
						}}</text>
					</view>
				</view>
			</view>
			<view class="yt-list">
				<view class="yt-list-cell b-b" v-if="item.buyer_name">
					<view class="cell-icon" :class="'bg-' + themeColor.name">
						收
					</view>
					<text class="cell-tit clamp">收货人</text>
					<text class="cell-tip" :class="'text-' + themeColor.name">
						{{ item.buyer_name }}
					</text>
					<text class="cell-more wanjia wanjia-gengduo-d"></text>
				</view>
				<view class="yt-list-cell b-b" v-if="item.express_no">
					<view class="cell-icon" :class="'bg-' + themeColor.name">
						单
					</view>
					<text class="cell-tit clamp">快递单号</text>
					<text class="cell-tip">
						{{ item.express_no }}
					</text>
					<text class="cell-tip copy" :class="'text-' + themeColor.name" @tap.stop="copy(item.express_no)">复制</text>
				</view>
				<view class="yt-list-cell b-b" v-if="item.express_company">
					<view class="cell-icon" :class="'bg-' + themeColor.name">
						司
					</view>
					<text class="cell-tit clamp">快递公司</text>
					<text class="cell-tip" :class="'text-' + themeColor.name">
						{{ item.express_company }}
					</text>
				</view>
			</view>
			<view
				v-if="item.shipping_type.toString() === '1'"
				class="uni-timeline"
			>
				<view
					class="uni-timeline-item"
					:class="[
						index === 0 ? `text-${themeColor.name} uni-timeline-first-item` : '',
						index === item.trace.length - 1 ? 'uni-timeline-last-item' : ''
					]"
					v-for="(row, index) in item.trace"
					:key="index"
				>
					<view class="uni-timeline-item-divider"></view>
					<view class="uni-timeline-item-content">
						<view>
							{{ row.value }}
						</view>
						<view class="datetime">
							{{ row.time }}
						</view>
					</view>
				</view>
				<view v-if="item.trace.length === 0">暂无物流信息</view>
			</view>
			<view
				class="uni-timeline"
				v-if="item.shipping_type.toString() === '0'">
				该订单无需物流
			</view>
		</view>

		<rf-empty
			:info="'暂无物流信息'"
			v-if="shippingDetail.count === 0"
		></rf-empty>
	</view>
</template>
<script>
import moment from '@/common/moment';
import { orderProductExpressDetails } from '@/api/product';
export default {
	data() {
		return {
			shippingDetail: {},
			shippingTimeLine: []
		};
	},
	filters: {
		time(val) {
			return parseInt(val, 10) === 0
				? '暂未操作'
				: moment(val * 1000).format('YYYY-MM-DD HH:mm:ss');
		},
		orderStatusFilter(orderStatus) {
			let status = null;
			const orderStatusList = [
				{ key: 0, value: '待付款' },
				{ key: 1, value: '待发货' },
				{ key: 2, value: '已发货' },
				{ key: 3, value: '已收货' },
				{ key: 4, value: '已完成' },
				{ key: -1, value: '退货申请' },
				{ key: -2, value: '退款中' },
				{ key: -3, value: '退款完成' },
				{ key: -4, value: '已关闭' },
				{ key: -5, value: '撤销申请' }
			];
			orderStatusList.forEach(orderItem => {
				if (orderItem.key === parseInt(orderStatus, 10)) {
					status = orderItem.value;
				}
			});
			return status;
		},
		filterProductStatus(item) {
			let status = null;
			if (parseInt(item.refund_status, 10) !== 0) {
				const refundStatusList = [
					{ key: 1, value: '退款申请' },
					{ key: 2, value: '等待退货' },
					{ key: 3, value: '等待确认收货' },
					{ key: 4, value: '等待确认退款' },
					{ key: 5, value: '同意退款' },
					{ key: -1, value: '退款已拒绝' },
					{ key: -2, value: '退款已关闭' },
					{ key: -3, value: '退款不通过' }
				];
				refundStatusList.forEach(refundItem => {
					if (refundItem.key === parseInt(item.refund_status, 10)) {
						status = refundItem.value;
					}
				});
			} else if (parseInt(item.order_status, 10) === 4) {
				const evaluateStatusList = [
					{ key: 0, value: '未评价' },
					{ key: 1, value: '已评价' },
					{ key: 2, value: '已追评' }
				];
				evaluateStatusList.forEach(evaluateItem => {
					if (evaluateItem.key === parseInt(item.is_evaluate, 10)) {
						status = evaluateItem.value;
					}
				});
			} else {
				const orderStatusList = [
					{ key: 0, value: '待付款' },
					{ key: 1, value: '待发货' },
					{ key: 2, value: '已发货' },
					{ key: 3, value: '已收货' },
					{ key: 4, value: '已完成' },
					{ key: -1, value: '退货申请' },
					{ key: -2, value: '退款中' },
					{ key: -3, value: '退款完成' },
					{ key: -4, value: '已关闭' },
					{ key: -5, value: '撤销申请' }
				];
				orderStatusList.forEach(orderItem => {
					if (orderItem.key === parseInt(item.order_status, 10)) {
						status = orderItem.value;
					}
				});
			}
			return status;
		},
		filterShippingType(value) {
			const data = ['', '物流配送', '买家自提', '本地配送'];
			return data[parseInt(value, 10)];
		}
	},
	onLoad(options) {
		this.initData(options);
	},
	methods: {
		// 订单号复制
		copy(content) {
			/* #ifdef H5 */
			this.$mHelper.h5Copy(content);
			/* #endif */
			/* #ifndef H5 */
			uni.setClipboardData({
				data: content,
				success: function() {
					this.$mHelper.toast('复制成功');
				}
			});
			/* #endif */
		},
		navTo(route) {
			this.$mRouter.push({ route });
		},
		// 初始化数据
		initData(options) {
			this.getOrderDetail(options.id);
		},
		// 获取物流信息
		async getOrderDetail(id) {
			await this.$http
				.get(`${orderProductExpressDetails}`, {
					order_id: id
				})
				.then(r => {
					r.data.data.forEach(row => {
						const traceArr = [];
						row.trace.forEach(item => {
							traceArr.push({ time: item.datetime, value: item.remark });
						});
						row.trace = traceArr;
					});
					this.shippingDetail = r.data;
				});
		}
	}
};
</script>
<style lang="scss">
page {
	background: $page-color-base;
}

.goods-section {
	margin-top: 16upx;
	background: #fff;
	padding-bottom: 1px;

	.g-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 84upx;
		padding: 0 30upx;
		position: relative;
	}

	.logo {
		display: block;
		width: 50upx;
		height: 50upx;
		border-radius: 100px;
	}

	.name {
		font-size: 30upx;
		color: $font-color-base;
		margin-left: 24upx;
	}

	.g-item {
		display: flex;
		margin: 20upx 30upx;
		image {
			flex-shrink: 0;
			display: block;
			width: 220upx;
			height: 170upx;
			border-radius: 4upx;
		}

		.right {
			flex: 1;
			padding-left: 16upx;
			overflow: hidden;
		}

		.title {
			font-size: $font-base;
			line-height: 32upx;
		}

		.spec {
			font-size: 22upx;
			color: $font-color-light;
		}

		.price-box {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 28upx;
			color: $font-color-dark;
			.price {
				margin-bottom: 4upx;
			}
			.number {
				font-size: 26upx;
				color: $font-color-base;
				margin-left: 20upx;
			}
			.status {
				font-size: 24upx;
				color: $font-color-spec;
			}
		}

		.step-box {
			position: relative;
		}
	}
}
.yt-list {
	margin-top: 16upx;
	background: #fff;
}
.yt-list-cell {
	display: flex;
	align-items: center;
	padding: 10upx 30upx 10upx 40upx;
	line-height: 70upx;
	position: relative;

	&.cell-hover {
		background: #fafafa;
	}

	&.b-b:after {
		left: 30upx;
	}

	.cell-icon {
		height: 32upx;
		width: 32upx;
		font-size: 22upx;
		text-align: center;
		line-height: 32upx;
		border-radius: 4upx;
		margin-right: 12upx;

		&.hb {
			background: #ffaa0e;
		}

		&.lpk {
			background: #3ab54a;
		}
	}

	.cell-more {
		align-self: center;
		font-size: 24upx;
		color: $font-color-light;
		margin-left: 8upx;
		margin-right: -10upx;
	}

	.cell-tit {
		flex: 1;
		font-size: 26upx;
		color: $font-color-light;
		margin-right: 10upx;
	}

	.cell-tip {
		font-size: 26upx;
		&.disabled {
			color: $font-color-light;
		}
	}

	&.desc-cell {
		.cell-tit {
			max-width: 90upx;
		}
	}

	.desc {
		flex: 1;
		font-size: $font-base;
		color: $font-color-dark;
	}
	.copy {
		margin-left: $spacing-sm;
	}
}
.uni-timeline {
	padding: 30upx 40upx;
	background-color: #fff;
}

</style>
