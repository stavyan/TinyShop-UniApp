<template>
	<view class="content">
		<!--订单列表-->
		<scroll-view
			class="list-scroll-content"
			scroll-y
			@scrolltolower="getMoreOrderList"
		>
			<!-- 空白页 -->
			<empty v-if="orderList.length === 0" :info="'快去商城逛逛吧'"></empty>
			<!-- 订单列表 -->
			<view
				v-for="(item,index) in orderList" :key="index"
				class="order-item"
			>
				<view class="i-top b-b">
					<text class="time">订单号：{{item.order_sn}}</text>
					<!--<text class="time">{{item.created_at | time}}</text>-->
					<text class="state" v-if="parseInt(item.order_status, 10) !== 0">{{item.order_status | orderStatusFilter }}</text>
					<view class="example-body" v-else>
						<rf-count-down :show-day="false" :second="second(item.created_at)" @timeup="timeUp(item)" color="#FFFFFF" background-color="#fa436a" border-color="#fa436a" />
					</view>
				</view>

				<scroll-view @tap="toOrderDetail(item.id)" v-if="item && item.product && item.product.length > 1"
										 class="goods-box" scroll-x>
					<view
						v-for="(goodsItem, goodsIndex) in item.product"
						:key="goodsIndex"
						class="goods-item"
					>
						<image class="goods-img" :src="goodsItem.product_picture" mode="aspectFill"></image>
						<text class="goods-title in2line">{{goodsItem.product_name}}</text>
					</view>
				</scroll-view>
				<view
					v-if="item.product && item.product.length === 1"
					class="goods-box-single"
          @tap="toOrderDetail(item.id)"
					v-for="(goodsItem, goodsIndex) in item.product" :key="goodsIndex"
				>
					<image class="goods-img" :src="goodsItem.product_picture" mode="aspectFill"></image>
					<view class="right">
						<text class="title in2line">{{goodsItem.product_name}}</text>
						<text class="attr-box">{{goodsItem.sku_name || '基础版'}}</text>
						<text class="price">{{goodsItem.price}}  x {{goodsItem.num}}</text>
					</view>
				</view>

				<view class="price-box">
					共
					<text class="num">{{ item.product_count }}</text>
					件商品 实付款
					<text class="price">{{ item.pay_money }}</text>
				</view>
				<view class="action-box b-t">
          <button class="action-btn" @tap="handleOrderOperation(item, 'detail')">订单详情</button>
				  <button class="action-btn recom" v-show="item.order_status == 1" @tap="handleOrderOperation(item, 'refund', 1)">申请退款</button>
				  <button class="action-btn" v-show="item.order_status == 4 || item.order_status == 2" @tap="handleOrderOperation(item, 'shipping')">查看物流</button>
          <button class="action-btn recom" v-show="item.order_status == 2" @tap="handleOrderOperation(item, 'refund', 2)">申请退货</button>
				  <button class="action-btn recom" v-show="item.order_status == 4" @tap="handleOrderOperation(item, 'evaluation')">我要评价</button>
        </view>
			</view>
			<rf-load-more :status="loadingType"></rf-load-more>
		</scroll-view>
	</view>
</template>

<script>
	/**
	 * @des 订单管理
	 *
	 * @author stav stavyan@qq.com
	 * @date 2020-01-15 11:54
	 * @copyright 2019
	 */
	import rfLoadMore from '@/components/rf-load-more/rf-load-more.vue';
	import empty from "@/components/empty";
	import moment from '@/utils/moment';
  import {orderDelete, orderList, orderTakeDelivery} from "@/api/userInfo";
	import rfCountDown from '@/components/rf-count-down/rf-count-down.vue'
	import {orderClose} from "@/api/product";
	export default {
		components: {
			rfLoadMore,
			empty,
			rfCountDown
		},
		data() {
			return {
				loadingType: 'more',
				orderList: [],
				page: 1
			};
		},
		computed: {
			// 计算倒计时时间
			second() {
				return function (val) {
					return Math.floor(15 * 60 - (new Date() / 1000 - val))
				}
			}
		},
		filters: {
	    // 时间格式化
			time(val) {
				return moment(val * 1000).format('YYYY-MM-DD HH:mm:ss')
			},
			// 状态显示格式化
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
				})
        return status;
      }
		},
		onShow(){
			this.initData();
		},
		onLoad(options){
			/**
			 * 修复app端点击除全部订单外的按钮进入时不加载数据的问题
			 * 替换onLoad下代码即可
			 */
			this.tabCurrentIndex = +options.state + 1;
			// this.initData()
		},
		//下拉刷新
		onPullDownRefresh(){
			this.page = 1;
			this.orderList.length = 0;
			this.getOrderList('refresh');
		},
		//加载更多
		onReachBottom(){
			this.page ++;
			this.getOrderList();
		},
		methods: {
			// 倒计时关闭订单
			timeUp(item) {
				this.handleOrderClose(item.id);
			},
			// 订单操作
      handleOrderOperation (item, type, refund_type) {
        switch (type) {
          case 'detail': // 订单详情
              this.toOrderDetail(item.id);
            break;
          case 'evaluation': // 我要评价
              this.handleOrderEvaluation(item, 'evaluation');
            break;
          case 'close': // 取消订单
              this.handleOrderClose(item.id);
            break;
          case 'delete': // 删除订单
              this.handleOrderDelete(item.id);
            break;
          case 'shipping': // 查看物流
						this.navTo(`/pages/order/shipping?id=${item.id}`);
            break;
          case 'refund': // 退货/退款
						this.handleOrderEvaluation(item, 'refund', refund_type);
            break;
          case 'delivery': // 确认收货
            this.handleOrderTakeDelivery(item.id);
            break;
        }
      },
			// 跳转页面
      navTo (url) {
        uni.navigateTo({
          url
        })
      },
      handleOrderEvaluation(item, type, refund_type) {
        // if(item.product.length > 1) {
          uni.navigateTo({
            url: `/pages/order/orderItem?id=${item.id}`
          })
        // } else {
        // 	if (type === 'refund') {
				// 		uni.navigateTo({
				// 			url: `/pages/refund/refund?data=${JSON.stringify(item.product[0])}&refundType=${refund_type}`
				// 		})
				// 	} else {
				// 		uni.navigateTo({
				// 			url: `/pages/evaluation/evaluation?data=${JSON.stringify(item.product[0])}`
				// 		})
				// 	}
        // }
      },
			// 跳转至订单详情
      toOrderDetail(id) {
        uni.navigateTo({
          url: `/pages/order/detail?id=${id}`
        })
      },
			// 取消订单
			async handleOrderClose(id) {
				uni.showLoading({title: '加载中...'});
				await this.$get(`${orderClose}`, {
					id,
				}).then(() => {
          this.page = 1;
          this.orderList.length = 0;
					this.getOrderList();
				})
			},
      // 删除已关闭订单
			async handleOrderDelete(id) {
				uni.showLoading({title: '加载中...'});
				await this.$del(`${orderDelete}?id=${id}`, {}).then(() => {
					this.$api.msg('订单删除成功');
					setTimeout(() => {
						this.page = 1;
						this.orderList.length = 0;
						this.getOrderList();
					}, 500)
				})
			},
      // 确认收货
			async handleOrderTakeDelivery(id) {
				uni.showLoading({title: '加载中...'});
				await this.$get(`${orderTakeDelivery}`, {
					id,
				}).then(() => {
          this.page = 1;
          this.orderList.length = 0;
					this.getOrderList();
				})
			},
			// 订单支付
			async handlePayment(item) {
				uni.navigateTo({
					url: `/pages/money/pay?id=${item.id}`
				})
			},
			// 数据初始化
			initData () {
				this.orderList.length = 0;
				this.page = 1;
				this.getOrderList();
			},
			// 获取订单列表
			async getOrderList(type) {
		    const params = {};
				params.page = this.page;
				params.synthesize_status = -1;
				uni.showLoading({title: '加载中...'});
				await this.$get(`${orderList}`, {
					...params
				}).then(r => {
					if (type === 'refresh') {
						uni.stopPullDownRefresh();
					}
					this.loadingType  = r.data.length === 10 ? 'more' : 'nomore';
					this.orderList = [ ...this.orderList, ...r.data ]
				});
			},
			//顶部tab点击
			getMoreOrderList(){
        this.page ++;
        this.getOrderList();
			}
		},
	}
</script>

<style lang="scss">
	page, .content{
		background: $page-color-base;
		height: 100%;
	}

	.swiper-box{
		height: calc(100% - 40px);
	}
	.list-scroll-content{
		height: 100%;
	}

	.navbar{
		display: flex;
		height: 40px;
		padding: 0 5px;
		background: #fff;
		box-shadow: 0 1px 5px rgba(0,0,0,.06);
		position: relative;
		z-index: 10;
		.nav-item{
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 15px;
			color: $font-color-dark;
			position: relative;
			&.current{
				color: $base-color;
				&:after{
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 44px;
					height: 0;
					border-bottom: 2px solid $base-color;
				}
			}
		}
	}

	.uni-swiper-item{
		height: auto;
	}
	.order-item{
		display: flex;
		flex-direction: column;
		padding-left: 30upx;
		background: #fff;
		margin-top: 16upx;
		.i-top{
			display: flex;
			align-items: center;
			height: 80upx;
			padding-right:30upx;
			font-size: $font-base;
			color: $font-color-dark;
			position: relative;
			.time{
				flex: 1;
			}
			.state{
				color: $base-color;
			}
			.del-btn{
				padding: 10upx 0 10upx 36upx;
				font-size: $font-lg;
				color: $font-color-light;
				position: relative;
				&:after{
					content: '';
					width: 0;
					height: 30upx;
					border-left: 1px solid $border-color-dark;
					position: absolute;
					left: 20upx;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}
		/* 多条商品 */
		.goods-box{
			padding-top: 10upx;
			height: 220upx;
			.goods-item{
				overflow: hidden;
				height: 100%;
				width: 160upx;
				margin-right: 16upx;
				display: inline-block;
				.goods-img{
					display: block;
					width: 100%;
					height: 140upx;
				}
				.goods-title {
					font-size: $font-sm - 2upx;
					line-height: 32upx;
				}
			}
		}
		/* 单条商品 */
		.goods-box-single{
			display: flex;
			padding: 10upx 0;
			.goods-img{
				display: block;
				width: 180upx;
				height: 140upx;
			}
			.right{
				flex: 1;
				display: flex;
				flex-direction: column;
				padding: 0 30upx 0 24upx;
				overflow: hidden;
				.title{
					font-size: $font-sm;
					line-height: 32upx;
					color: $font-color-dark;
				}
				.attr-box{
					font-size: $font-sm;
					color: $font-color-light;
				}
				.price{
					font-size: $font-sm + 2upx;
					color: $font-color-dark;
					&:before{
						content: '￥';
						font-size: $font-sm;
					}
				}
			}
		}

		.price-box{
			display: flex;
			justify-content: flex-end;
			align-items: baseline;
			padding: 15upx 30upx;
			font-size: $font-sm + 2upx;
			color: $font-color-light;
			.num{
				margin: 0 8upx;
				color: $font-color-dark;
			}
			.price{
				font-size: $font-lg;
				color: $font-color-dark;
				&:before{
					content: '￥';
					font-size: $font-sm;
					margin: 0 2upx 0 8upx;
				}
			}
		}
		.action-box{
			display: flex;
			justify-content: flex-end;
			align-items: center;
			height: 100upx;
			position: relative;
			padding-right: 30upx;
		}
		.action-btn{
			width: 160upx;
			height: 60upx;
			margin: 0;
			margin-left: 24upx;
			padding: 0;
			text-align: center;
			line-height: 60upx;
			font-size: $font-sm + 2upx;
			color: $font-color-dark;
			background: #fff;
			border-radius: 100px;
			border: 1px solid rgba(0, 0, 0, 0.05);
			&:after{
				border-radius: 100px;
			}
			&.recom{
				background: #fff9f9;
				color: $base-color;
				&:after{
					border-color: #f7bcc8;
				}
			}
		}
	}


	.load1,
	.load2,
	.load3 {
		height: 24px;
		width: 24px
	}

	.load2 {
		transform: rotate(30deg)
	}

	.load3 {
		transform: rotate(60deg)
	}

	.load1 view:nth-child(1) {
		animation-delay: 0s
	}

	.load2 view:nth-child(1) {
		animation-delay: .13s
	}

	.load3 view:nth-child(1) {
		animation-delay: .26s
	}

	.load1 view:nth-child(2) {
		animation-delay: .39s
	}

	.load2 view:nth-child(2) {
		animation-delay: .52s
	}

	.load3 view:nth-child(2) {
		animation-delay: .65s
	}

	.load1 view:nth-child(3) {
		animation-delay: .78s
	}

	.load2 view:nth-child(3) {
		animation-delay: .91s
	}

	.load3 view:nth-child(3) {
		animation-delay: 1.04s
	}

	.load1 view:nth-child(4) {
		animation-delay: 1.17s
	}

	.load2 view:nth-child(4) {
		animation-delay: 1.3s
	}

	.load3 view:nth-child(4) {
		animation-delay: 1.43s
	}

	@-webkit-keyframes load {
		0% {
			opacity: 1
		}

		100% {
			opacity: .2
		}
	}
</style>
