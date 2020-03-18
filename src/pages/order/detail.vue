<template>
	<view>
		<view class="address-section">
			<view class="order-content">
				<i class="iconfont iconshouhuodizhi"></i>
				<view class="cen">
					<view class="top">
						<text class="name">{{orderDetail.receiver_name}}</text>
						<text class="mobile">{{orderDetail.receiver_mobile}}</text>
					</view>
					<text class="address">{{ orderDetail.receiver_region_name }} {{orderDetail.receiver_address}}</text>
				</view>
				<!--<i class="iconfont iconyou"></i>-->
			</view>
			<image class="a-bg" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAAFCAYAAAAaAWmiAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Rjk3RjkzMjM2NzMxMTFFOUI4RkU4OEZGMDcxQzgzOEYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Rjk3RjkzMjQ2NzMxMTFFOUI4RkU4OEZGMDcxQzgzOEYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGOTdGOTMyMTY3MzExMUU5QjhGRTg4RkYwNzFDODM4RiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGOTdGOTMyMjY3MzExMUU5QjhGRTg4RkYwNzFDODM4RiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrEOZlQAAAiuSURBVHjazJp7bFvV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"></image>
		</view>

		<view class="goods-section">
			<view class="g-header b-b">
				<text class="name">商品列表</text>
				<text class="name red">{{ orderDetail.order_status | orderStatusFilter  }}</text>
			</view>
			<!-- 商品列表 -->
			<view class="g-item" v-for="item in orderDetail.product"  @tap="navTo(`/pages/product/product?id=${item.product_id}`)">
				<rf-image :src="item.product_picture"></rf-image>
				<view class="right">
					<text class="title clamp in2line">{{ item.product_name }}</text>
					<text class="spec">{{ item.sku_name || '基础款' }}</text>
					<view class="price-box">
						<text class="price-wrapper">
							<text class="price">￥ {{item.price}}</text>
							<text class="number"> * {{ item.num }}</text>
						</text>
						<text class="status" @tap.stop="navTo(`/pages/order/shipping?id=${item.order_id}`)" v-if="item.shipping_status == '1'">查看物流</text>
						<text class="status"> {{ item | filterProductStatus }}</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 优惠明细 -->
		<view class="yt-list">
			<view class="yt-list-cell b-b">
				<view class="cell-icon">
					券
				</view>
				<text class="cell-tit clamp">优惠券</text>
				<text class="cell-tip active">
					{{ orderDetail.coupon && orderDetail.coupon.title  || '未使用优惠券' }}
				</text>
				<text class="cell-more wanjia wanjia-gengduo-d"></text>
			</view>
			<view class="yt-list-cell b-b">
				<view class="cell-icon">
					寄
				</view>
				<text class="cell-tit clamp">配送方式</text>
				<text class="cell-tip active">
					{{ orderDetail.shipping_type | filterShippingType }}
				</text>
				<text class="cell-more wanjia wanjia-gengduo-d"></text>
			</view>
			<view class="yt-list-cell b-b" v-show="orderDetail.company_name">
				<view class="cell-icon">
					司
				</view>
				<text class="cell-tit clamp">快递公司</text>
				<text class="cell-tip active">
					{{ orderDetail.company_name }}
				</text>
				<text class="cell-more wanjia wanjia-gengduo-d"></text>
			</view>
			<view class="yt-list-cell b-b" v-if="orderDetail.payment_explain != '积分兑换'">
				<view class="cell-icon hb">
					减
				</view>
				<text class="cell-tit clamp">积分抵扣</text>
				<text class="cell-tip disabled"></text>
				<text class="cell-tip disabled">已用{{ orderDetail.point || 0 }}积分抵用{{ orderDetail.point_money || 0 }}元</text>
			</view>
			<view class="yt-list-cell b-b" v-else>
				<view class="cell-icon hb">
					减
				</view>
				<text class="cell-tit clamp">积分下单</text>
				<text class="cell-tip disabled"></text>
				<text class="cell-tip disabled">消耗了{{ orderDetail.point || 0 }}积分</text>
			</view>
		</view>
		<!-- 金额明细 -->
		<view class="yt-list">
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">商品金额</text>
				<text class="cell-tip red">￥{{ orderDetail.product_money }}</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">优惠金额</text>
				<text class="cell-tip red">-￥ {{ orderDetail.coupon_money }}</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">运费</text>
				<text class="cell-tip red">
					<text>￥ {{ orderDetail.shipping_money }}</text>
				</text>
			</view>
			<view class="yt-list-cell b-b" v-show="orderDetail.invoice">
				<text class="cell-tit clamp">开具发票</text>
				<text class="cell-tip red in1line">
					<text>
						{{ `电子发票 -${parseInt(orderDetail.invoice && orderDetail.invoice.type, 10) === 1 ? '公司' : '个人'}-${orderDetail.invoice && orderDetail.invoice.title} [ ${orderDetail.invoice && orderDetail.invoice.content} ]` }}</text>
				</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">发票税费</text>
				<text class="cell-tip red">
					<text>￥ {{ orderDetail.tax_money }}</text>
				</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">赠送积分</text>
				<text class="cell-tip">
					<text>{{ orderDetail.give_point }} 积分</text>
				</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">实付金额</text>
				<text class="cell-tip red">￥ {{ orderDetail.pay_money }}</text>
			</view>
		</view>
		<view class="uni-timeline" style="padding: 30upx 40upx; background-color: #fff;">
			 <!--uni-timeline-first-item-->
			<view
					class="uni-timeline-item"
					:class="{'uni-timeline-first-item': index === 0, 'uni-timeline-last-item': index === orderTimeLine.length - 1, }"
					v-for="(item, index) in orderTimeLine"
					:key="index">
				<view class="uni-timeline-item-divider"></view>
				<view class="uni-timeline-item-content">
					<view>
						{{ item.value }}
					</view>
					<view class="datetime">
						{{ item.time | time }}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import empty from "@/components/empty";
	import mpvuePicker from '@/components/mpvue-picker/mpvuePicker';
	import rfImage from '@/components/rf-image/rf-image';
	import moment from '@/utils/moment';
	import {orderDetail} from "@/api/userInfo";
	export default {
		components: {
			mpvuePicker,
			rfImage,
			empty
		},
		data() {
			return {
				orderDetail: {}
			}
		},
		computed: {
			orderTimeLine () {
				const timeLine = []
				if (this.orderDetail.created_at != 0) {
					timeLine.push({ time: this.orderDetail.created_at, value: '订单创建' });
				}
				if (this.orderDetail.close_time < (new Date().getTime() / 1000 && this.orderDetail.pay_time != 0)) {
					timeLine.push({ time: this.orderDetail.close_time, value: '未付款订单关闭时间' });
				}
				if (this.orderDetail.pay_time != 0) {
					timeLine.push({ time: this.orderDetail.pay_time, value: '订单支付' });
				}
				if (this.orderDetail.shipping_time != 0) {
					timeLine.push({ time: this.orderDetail.shipping_time, value: '买家要求发货' });
				}
				if (this.orderDetail.consign_time != 0) {
					timeLine.push({ time: this.orderDetail.consign_time, value: '卖家发货' });
				}
				if (this.orderDetail.sign_time != 0) {
					timeLine.push({ time: this.orderDetail.sign_time, value: '买家确认收货' });
				}
				if (this.orderDetail.finish_time != 0) {
					timeLine.push({ time: this.orderDetail.finish_time, value: '订单完成' });
				}
				return timeLine;
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
			filterShippingType (value) {
				const data = ['', '物流配送', '买家自提', '本地配送'];
				return data[parseInt(value, 10)]
			}
		},
		onLoad(options){
			this.initData(options);
		},
		methods: {
	    navTo(url) {
        uni.navigateTo({ url });
	    },
			/**
			 *@des 计算运费
			 *@author stav stavyan@qq.com
			 *@blog https://stavtop.club
			 *@date 2019/12/02 10:43:11
			 */
			async getOrderFreightFee() {
				uni.showLoading({title: '加载中...'});
				const params = {};
				if (this.cartIds) {
					params.type = 'cart';
					params.data = this.cartIds;
				} else {
					params.data = this.product;
					params.type = 'buy_now';
				}
				params.address_id = this.addressData.id;
				params.company_id = this.currentCompany.value;
				await this.$get(`${orderFreightFee}`, {
					...params
				}).then(r => {
						this.shippingMoney = r.data.shipping_money;
				}).catch(err => {
					console.log(err)
				})
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
			/**
			 *@des 获取工单详情
			 *@author stav stavyan@qq.com
			 *@blog https://stavtop.club
			 *@date 2019/12/04 10:41:51
			 */
			async getOrderDetail(id) {
				uni.showLoading({title: '加载中...'});
				await this.$get(`${orderDetail}`, {
					id
				}).then(r => {
					this.orderDetail = r.data;
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
		padding-bottom: 100upx;
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

		.iconshouhuodizhi {
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

		.iconyou {
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
				.price-wrapper {
					width: 50%;
					.price {
						margin-bottom: 4upx;
					}
					.number{
						font-size: 26upx;
						color: $font-color-base;
						margin-left: 20upx;
					}
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
