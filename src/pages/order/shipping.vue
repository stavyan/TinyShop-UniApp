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
					<image :src="item.order_product.product_picture" mode="aspectFill"></image>
					<view class="right">
						<text class="title clamp">{{ item.order_product.product_name }}</text>
					</view>
				</view>
			</view>
			<view class="yt-list">
				<view class="yt-list-cell b-b" v-if="item.member_username">
					<view class="cell-icon">
						名
					</view>
					<text class="cell-tit clamp">收件人</text>
					<text class="cell-tip active">
						{{ item.member_username }}
					</text>
					<text class="cell-more wanjia wanjia-gengduo-d"></text>
				</view>
				<view class="yt-list-cell b-b" v-if="item.express_no">
					<view class="cell-icon">
						单
					</view>
					<text class="cell-tit clamp">快递单号</text>
					<text class="cell-tip active">
						{{ item.express_no }}
					</text>
					<text class="cell-more wanjia wanjia-gengduo-d"></text>
				</view>
				<view class="yt-list-cell b-b" v-if="item.express_company">
					<view class="cell-icon">
						司
					</view>
					<text class="cell-tit clamp">快递公司</text>
					<text class="cell-tip active">
						{{ item.express_company }}
					</text>
					<text class="cell-more wanjia wanjia-gengduo-d"></text>
				</view>
			</view>
			<view class="uni-timeline" style="padding: 30upx 40upx; background-color: #fff;">
				 <!--uni-timeline-first-item-->
				<view
						class="uni-timeline-item"
						:class="{'uni-timeline-first-item': index === 0, 'uni-timeline-last-item': index === item.trace.length - 1, }"
						v-for="(row, index) in item.trace"
						:key="index">
					<view class="uni-timeline-item-divider"></view>
					<view class="uni-timeline-item-content">
						<view>
							{{ row.value }}
						</view>
						<view v-if="row.trace.length === 0" class="datetime">
							{{ row.time }}
						</view>
					</view>
				</view>
				<view>暂无物流信息</view>
			</view>
		</view>

		<empty :info="'暂无物流信息'" v-if="shippingDetail.count === 0"></empty>
	</view>
</template>

<script>
	import empty from "@/components/empty";
	import mpvuePicker from '@/components/mpvue-picker/mpvuePicker';
	import moment from '@/utils/moment';
	import {orderProductExpressDetails} from "@/api/product";
	export default {
		components: {
			mpvuePicker,
			empty
		},
		data() {
			return {
				shippingDetail: {},
				shippingTimeLine: []
			}
		},
		filters: {
			time(val) {
				return val == 0 ? '暂未操作' : moment(val * 1000).format('YYYY-MM-DD HH:mm:ss')
			},
      orderStatusFilter (orderStatus) {
			  let status = null;
				const orderStatusList = [
					{key: 0, value: '待付款'},
					{key: 1, value: '待发货'},
					{key: 2, value: '已发货'},
					{key: 3, value: '已收货'},
					{key: 4, value: '已完成'},
					{key: -1, value: '退货申请'},
					{key: -2, value: '退款中'},
					{key: -3, value: '退款完成'},
					{key: -4, value: '已关闭'},
					{key: -5, value: '撤销申请'},
				];
				orderStatusList.forEach(orderItem => {
					if (orderItem.key == orderStatus) {
						 status = orderItem.value
					}
				});
        return status;
      },
			filterProductStatus(item) {
				let status = null;
				if (parseInt(item.refund_status, 10) !== 0) {
					const refundStatusList = [
						{key: 1, value: '退款申请'},
						{key: 2, value: '等待退货'},
						{key: 3, value: '等待确认收货'},
						{key: 4, value: '等待确认退款'},
						{key: 5, value: '同意退款'},
						{key: -1, value: '退款已拒绝'},
						{key: -2, value: '退款已关闭'},
						{key: -3, value: '退款不通过'},
					];
					refundStatusList.forEach(refundItem => {
						if (refundItem.key == item.refund_status) {
							 status = refundItem.value
						}
					})
				} else if (parseInt(item.order_status, 10) === 4) {
					const evaluateStatusList = [
						{key: 0, value: '未评价'},
						{key: 1, value: '已评价'},
						{key: 2, value: '已追评'},
					];
					evaluateStatusList.forEach(evaluateItem => {
						if (evaluateItem.key == item.is_evaluate) {
							 status = evaluateItem.value
						}
					})
				} else {
					const orderStatusList = [
						{key: 0, value: '待付款'},
						{key: 1, value: '待发货'},
						{key: 2, value: '已发货'},
						{key: 3, value: '已收货'},
						{key: 4, value: '已完成'},
						{key: -1, value: '退货申请'},
						{key: -2, value: '退款中'},
						{key: -3, value: '退款完成'},
						{key: -4, value: '已关闭'},
						{key: -5, value: '撤销申请'},
					];
					orderStatusList.forEach(orderItem => {
						if (orderItem.key == item.order_status) {
							 status = orderItem.value
						}
					})
				}
				return status;
			},
			filterShippingType (value) {
				const data = ['', '物流配送', '买家自提', '本地配送'];
				return data[parseInt(value, 10)]
			},
		},
		onLoad(options){
			this.initData(options);
		},
		methods: {
	    navTo(url) {
        uni.navigateTo({ url });
	    },
			/**
			 *@des 初始化数据
			 *@author stav stavyan@qq.com
			 *@blog https://stavtop.club
			 *@date 2019/11/19 13:44:25
			 */
			initData(options) {
				this.getOrderDetail(options.id)
			},
			// 获取物流信息
			async getOrderDetail(order_id) {
				
				await this.$get(`${orderProductExpressDetails}`, {
					order_id
				}).then(r => {
					r.data.data.forEach(row => {
				    const traceArr = [];
						row.trace.forEach(item => {
						    traceArr.push({ time: item.datetime, value: item.remark })
						});
						row.trace = traceArr;
					});
					this.shippingDetail = r.data;
				}).catch(err => {
					console.log(err)
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: $page-color-base;
	}

	.address-section {
		padding: 30upx 0;
		background: #fff;
		position: relative;

		.order-content {
			display: flex;
			align-items: center;
		}

		.no-default-address {
			color: #333;
			font-size: 32upx;
		}

		.icon-shouhuodizhi {
			flex-shrink: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 90upx;
			color: #888;
			font-size: 44upx;
		}

		.cen {
			display: flex;
			flex-direction: column;
			flex: 1;
			font-size: 28upx;
			color: $font-color-dark;
		}

		.name {
			font-size: 34upx;
			margin-right: 24upx;
		}

		.address {
			margin-top: 16upx;
			margin-right: 20upx;
			color: $font-color-light;
		}

		.icon-you {
			font-size: 32upx;
			color: $font-color-light;
			margin-right: 30upx;
		}

		.a-bg {
			position: absolute;
			left: 0;
			bottom: 0;
			display: block;
			width: 100%;
			height: 5upx;
		}
	}

	.goods-section {
		margin-top: 16upx;
		background: #fff;
		padding-bottom: 1px;

		.g-header {
			display: flex;
			align-items: center;
			justify-content:space-between;
			height: 84upx;
			padding: 0 30upx;
			position: relative;
			.red {
				color: $base-color;
			}
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
				color: $font-color-dark;
				line-height: 40upx;
			}

			.spec {
				font-size: 22upx;
				color: $font-color-light;
			}

			.price-box {
				display: flex;
				align-items: center;
				justify-content:space-between;
				font-size: 28upx;
				color: $font-color-dark;
				.price {
					margin-bottom: 4upx;
				}
				.number{
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
			color: #fff;
			text-align: center;
			line-height: 32upx;
			background: #f85e52;
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
			color: $font-color-dark;

			&.disabled {
				color: $font-color-light;
			}

			&.active {
				color: $base-color;
			}
			&.red{
				color: $base-color;
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
	}

	/* 支付列表 */
	.pay-list{
		padding-left: 40upx;
		margin-top: 16upx;
		background: #fff;
		.pay-item{
			display: flex;
			align-items: center;
			padding-right: 20upx;
			line-height: 1;
			height: 110upx;
			position: relative;
		}
		.icon-weixinzhifu{
			width: 80upx;
			font-size: 40upx;
			color: #6BCC03;
		}
		.icon-alipay{
			width: 80upx;
			font-size: 40upx;
			color: #06B4FD;
		}
		.icon-xuanzhong2{
			display: flex;
			align-items: center;
			justify-content: center;
			width: 60upx;
			height: 60upx;
			font-size: 40upx;
			color: $base-color;
		}
		.tit{
			font-size: 32upx;
			color: $font-color-dark;
			flex: 1;
		}
	}

	.footer{
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 995;
		display: flex;
		align-items: center;
		width: 100%;
		height: 90upx;
		justify-content: space-between;
		font-size: 30upx;
		background-color: #fff;
		z-index: 998;
		color: $font-color-base;
		box-shadow: 0 -1px 5px rgba(0,0,0,.1);
		.price-content{
			padding-left: 30upx;
		}
		.price-tip{
			color: $base-color;
			margin-left: 8upx;
		}
		.price{
			font-size: 36upx;
			color: $base-color;
		}
		.submit{
			display:flex;
			align-items:center;
			justify-content: center;
			width: 280upx;
			height: 100%;
			color: #fff;
			font-size: 32upx;
			background-color: $base-color;
		}
	}

	/* 优惠券面板 */
	.mask{
		display: flex;
		align-items: flex-end;
		position: fixed;
		left: 0;
		top: var(--window-top);
		bottom: 0;
		width: 100%;
		background: rgba(0,0,0,0);
		z-index: 9995;
		transition: .3s;

		.mask-content{
			width: 100%;
			max-height: 70vh;
			min-height: 16vh;
			background: #f3f3f3;
			transform: translateY(100%);
			transition: .3s;
			overflow-y:scroll;
      .no-coupon {
        display: flex;
 	      justify-content: center;	/* 水平居中 */
        line-height: 16vh;
      }
		}
		&.none{
			display: none;
		}
		&.show{
			background: rgba(0,0,0,.4);

			.mask-content{
				transform: translateY(0);
			}
		}
	}

	/* 优惠券列表 */
	.coupon-item{
		display: flex;
		flex-direction: column;
		margin: 20upx 24upx;
		background: #fff;
		.con{
			display: flex;
			align-items: center;
			position: relative;
			height: 120upx;
			padding: 0 30upx;
			&:after{
				position: absolute;
				left: 0;
				bottom: 0;
				content: '';
				width: 100%;
				height: 0;
				border-bottom: 1px dashed #f3f3f3;
				transform: scaleY(50%);
			}
		}
		.left{
			display: flex;
			flex-direction: column;
			justify-content: center;
			flex: 1;
			overflow: hidden;
			height: 100upx;
		}
		.title{
			font-size: 32upx;
			color: $font-color-dark;
			margin-bottom: 10upx;
		}
		.time{
			font-size: 24upx;
			color: $font-color-light;
		}
		.right{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 26upx;
			color: $font-color-base;
			height: 100upx;
		}
		.price{
			font-size: 44upx;
			color: $base-color;
			&:before{
				content: '￥';
				font-size: 34upx;
			}
		}
		.tips{
			font-size: 24upx;
			color: $font-color-light;
			line-height: 60upx;
			padding-left: 30upx;
		}
		.circle{
			position: absolute;
			left: -6upx;
			bottom: -10upx;
			z-index: 10;
			width: 20upx;
			height: 20upx;
			background: #f3f3f3;
			border-radius: 100px;
			&.r{
				left: auto;
				right: -6upx;
			}
		}
	}

</style>
