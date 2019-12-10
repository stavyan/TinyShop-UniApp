<template>
	<view class="content">
		<view class="navbar">
			<view
				v-for="(item, index) in navList" :key="index"
				class="nav-item"
				:class="{current: tabCurrentIndex === index}"
				@click="tabClick(index)"
			>
				{{item.text}}
			</view>
		</view>
		<swiper :current="tabCurrentIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item class="tab-content" v-for="(tabItem,tabIndex) in navList" :key="tabIndex">
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
							<text class="time">{{item.created_at | time}}</text>
							<text class="state" v-show="parseInt(item.order_status, 10) !== 0">{{item.order_status | orderStatusFilter }}</text>
							<view class="example-body" v-show="parseInt(item.order_status, 10) ===0">
								<uni-count-down :show-day="false" :second="second(item.created_at)" @timeup="timeUp(item)" color="#FFFFFF" background-color="#fa436a" border-color="#fa436a" />
							</view>
              <!--:style="{color: item.stateTipColor}"-->
							<!--<text-->
								<!--v-show="parseInt(item.order_status, 10) === 0"-->
								<!--class="del-btn yticon icon-iconfontshanchu1"-->
								<!--@click="deleteOrder(index)"-->
							<!--&gt;</text>-->
						</view>

						<scroll-view @click="toOrderDetail(item.id)" v-if="item && item.product && item.product.length > 1"
												 class="goods-box" scroll-x>
							<view
								v-for="(goodsItem, goodsIndex) in item.product"
								:key="goodsIndex"
								class="goods-item"
							>
								<image class="goods-img" :src="goodsItem.product_picture" mode="aspectFill"></image>
								<text class="goods-title">{{goodsItem.product_name}}</text>
							</view>
						</scroll-view>
						<view
							v-if="item.product && item.product.length === 1"
							class="goods-box-single"
              @click="toOrderDetail(item.id)"
							v-for="(goodsItem, goodsIndex) in item.product" :key="goodsIndex"
						>
							<image class="goods-img" :src="goodsItem.product_picture" mode="aspectFill"></image>
							<view class="right">
								<text class="title clamp">{{goodsItem.product_name}}</text>
								<text class="attr-box">{{goodsItem.sku_name}}  x {{goodsItem.num}}</text>
								<text class="price">{{goodsItem.cost_price}}</text>
							</view>
						</view>

						<view class="price-box">
							共
							<text class="num">{{ item.product_count }}</text>
							件商品 实付款
							<text class="price">{{ item.pay_money }}</text>
						</view>
						<view class="action-box b-t">
							<button class="action-btn" v-show="item.order_status == 0" @click="handleOrderOperation(item, 'close')">取消订单</button>
              <button class="action-btn" @click="handleOrderOperation(item, 'detail')">订单详情</button>
							<button class="action-btn recom" v-show="item.order_status == 0" @click="handlePayment(item)">立即支付</button>
						  <button class="action-btn recom" v-show="item.order_status == 1" @click="handleOrderOperation(item, 'refund', 1)">申请退款</button>
						  <button class="action-btn" v-show="item.order_status == 4 || item.order_status == 2" @click="handleOrderOperation(item, 'shipping')">查看物流</button>
              <button class="action-btn recom" v-show="item.order_status == 2" @click="handleOrderOperation(item, 'refund', 2)">申请退货</button>
              <button class="action-btn recom" v-show="item.order_status == 2" @click="handleOrderOperation(item, 'delivery')">确认收货</button>
						  <button class="action-btn recom" v-show="item.order_status == 4" @click="handleOrderOperation(item, 'evaluation')">我要评价</button>
						  <button class="action-btn recom" v-show="item.order_status == -4" @click="handleOrderOperation(item, 'delete')">删除订单</button>
            </view>
					</view>
					<uni-load-more :status="loadingType"></uni-load-more>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import empty from "@/components/empty";
	import Json from '@/Json';
	import moment from 'moment';
  import {orderDelete, orderList, orderTakeDelivery} from "../../api/userInfo";
	import uniCountDown from '@/components/uni-count-down/uni-count-down.vue'
	import {orderClose} from "../../api/product";
	export default {
		components: {
			uniLoadMore,
			empty,
			uniCountDown
		},
		data() {
			return {
				tabCurrentIndex: 0,
				loadingType: 'more',
				navList: [
					{
						state: undefined,
						text: '全部'
					},
					{
						state: 0,
						text: '待付款'
					},
					{
						state: 1,
						text: '待发货'
					},
					{
						state: 2,
						text: '待收货'
					},
					{
						state: 3,
						text: '评价'
					}
				],
				orderList: [],
				page: 1
			};
		},
		computed: {
			second() {
				return function (val) {
					return Math.floor(15 * 60 - (new Date() / 1000 - val))
				}
			}
		},
		filters: {
			time(val) {
				return moment(val * 1000).format('YYYY-MM-DD HH:mm:ss')
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
				})
        return status;
      }
		},
		// onShow(){
		// 	this.page = 1;
		// 	this.orderList = [];
		// 	this.getOrderList();
		// },
		onLoad(options){
			/**
			 * 修复app端点击除全部订单外的按钮进入时不加载数据的问题
			 * 替换onLoad下代码即可
			 */
			this.tabCurrentIndex = +options.state + 1;
			this.initData()
		},
		//下拉刷新
		onPullDownRefresh(){
			this.page = 1;
			this.orderList = [];
			this.getOrderList('refresh');
		},
		//加载更多
		onReachBottom(){
			this.page ++;
			this.getOrderList();
		},
		methods: {
			/**
			 *@des 到时间回调
			 *@author stav stavyan@qq.com
			 *@blog https://stavtop.club
			 *@date 2019/11/20 11:59:19
			 *@param id 订单id
			 */
			timeUp(item) {
				if (parseInt(item.order_status, 10) !== 0) return;
				this.handleOrderClose(item.id);
			},
      /**
       *@des
       *@author stav stavyan@qq.com
       *@blog https://stavtop.club
       *@date 2019/11/27 10:14:47
       *@param arguments
       */
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
						uni.showToast({title: '删除订单', icon: "none"});
              this.handleOrderDelete(item.id);
            break;
          case 'shipping': // 查看物流
						uni.showToast({title: "后台没写", icon: "none"});
            break;
          case 'refund': // 退货/退款
						this.handleOrderEvaluation(item, 'refund', refund_type);
            break;
          case 'delivery': // 确认收货
            this.handleOrderTakeDelivery(item.id);
            break;
        }
      },
      handleOrderEvaluation(item, type, refund_type) {
        // if(item.product.length > 1) {
          uni.navigateTo({
            url: `/pages/order/orderItem?list=${JSON.stringify(item.product)}&orderStatus=${item.order_status}`
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
      toOrderDetail(id) {
        uni.navigateTo({
          url: `/pages/order/detail?id=${id}`
        })
      },
			/**
			 *@des 取消订单
			 *@author stav stavyan@qq.com
			 *@blog https://stavtop.club
			 *@date 2019/11/20 12:00:48
			 */
			async handleOrderClose(id) {
				uni.showLoading({title: '加载中...'});
				await this.$get(`${orderClose}`, {
					id,
				}).then(r => {
					if (r.code === 200) {
            this.page = 1;
            this.orderList = [];
						this.getOrderList();
					} else {
						uni.showToast({title: r.message, icon: "none"});
            this.page = 1;
            this.orderList = [];
						this.getOrderList();
					}
				}).catch(err => {
					console.log(err)
				})
			},
      /**
       *@des 删除已关闭订单
       *@author stav stavyan@qq.com
       *@blog https://stavtop.club
       *@date 2019/12/04 17:20:22
       *@param id 订单id
       */
			async handleOrderDelete(id) {
				uni.showLoading({title: '加载中...'});
				await this.$del(`${orderDelete}`, {
					id,
				}).then(r => {
					if (r.code === 200) {
            this.page = 1;
            this.orderList = [];
						this.getOrderList();
					} else {
						uni.showToast({title: r.message, icon: "none"});
					}
				}).catch(err => {
					console.log(err)
				})
			},
      /**
       *@des 确认收货
       *@author stav stavyan@qq.com
       *@blog https://stavtop.club
       *@date 2019/11/27 17:48:34
       */
			async handleOrderTakeDelivery(id) {
				uni.showLoading({title: '加载中...'});
				await this.$get(`${orderTakeDelivery}`, {
					id,
				}).then(r => {
					if (r.code === 200) {
            this.page = 1;
            this.orderList = [];
						this.getOrderList();
					} else {
						uni.showToast({title: r.message, icon: "none"});
					}
				}).catch(err => {
					console.log(err)
				})
			},
			/**
			 *@des 订单支付
			 *@author stav stavyan@qq.com
			 *@blog https://stavtop.club
			 *@date 2019/11/20 13:49:55
			 *@param id 订单id
			 */
			async handlePayment(item) {
				// const data = {}
				// data.order_id = parseInt(item.id, 10);
				uni.navigateTo({
					// url: `/pages/money/pay?data=${JSON.stringify(data)}&money=${item.product_money}`
					url: `/pages/money/pay?id=${item.id}`
				})
			},
			/**
			 *@des 初始化数据
			 *@author stav stavyan@qq.com
			 *@blog https://stavtop.club
			 *@date 2019/11/19 18:18:54
			 *@param arguments
			 */
			initData () {
				this.getOrderList();
			},
			async getOrderList(type) {
				let index = this.tabCurrentIndex;
				let navItem = this.navList[index];
				const params = {};
				if (navItem.state || navItem.state === 0) {
					params.synthesize_status = navItem.state;
				}
				params.page = this.page;
				uni.showLoading({title: '加载中...'});
				await this.$get(`${orderList}`, {
					...params
				}).then(r => {
					if (type === 'refresh') {
						uni.stopPullDownRefresh();
					}
					if (r.code === 200) {
						this.loadingType  = r.data.length === 10 ? 'more' : 'nomore';
						this.orderList = [ ...this.orderList, ...r.data ]
					} else {
						uni.showToast({title: r.message, icon: "none"});
					}
				}).catch(err => {
					console.log(err)
				})
			},
			//获取订单列表
			loadData(source){
				//这里是将订单挂载到tab列表下
				let index = this.tabCurrentIndex;
				let navItem = this.navList[index];
				let state = navItem.state;
				if(source === 'tabChange' && navItem.loaded === true){
					//tab切换只有第一次需要加载数据
					return;
				}
				if(navItem.loadingType === 'loading'){
					//防止重复加载
					return;
				}
				navItem.loadingType = 'loading';
				setTimeout(()=>{
					let orderList = Json.orderList.filter(item=>{
						//添加不同状态下订单的表现形式
						item = Object.assign(item, this.orderStateExp(item.state));
						//演示数据所以自己进行状态筛选
						if(state === 0){
							//0为全部订单
							return item;
						}
						return item.state === state
					});
					orderList.forEach(item=>{
						navItem.orderList.push(item);
					})
					//loaded新字段用于表示数据加载完毕，如果为空可以显示空白页
					this.$set(navItem, 'loaded', true);

					//判断是否还有数据， 有改为 more， 没有改为noMore
					navItem.loadingType = 'more';
				}, 600);
			},
			//swiper 切换
			changeTab(e){
				this.page = 1;
				this.orderList = [];
				this.tabCurrentIndex = e.target.current;
				this.getOrderList();
			},
			//顶部tab点击
			tabClick(index){
				this.page = 1;
				this.orderList = [];
				this.tabCurrentIndex = index;
			},
			//顶部tab点击
			getMoreOrderList(){
        this.page ++;
        this.getOrderList();
			},
			//删除订单
			deleteOrder(index){
				uni.showLoading({
					title: '请稍后'
				})
				setTimeout(()=>{
					this.navList[this.tabCurrentIndex].orderList.splice(index, 1);
					uni.hideLoading();
				}, 600)
			},
			//订单状态文字和颜色
			orderStateExp(state){
				let stateTip = '',
					stateTipColor = '#fa436a';
				switch(+state){
					case 1:
						stateTip = '待付款'; break;
					case 2:
						stateTip = '待发货'; break;
					case 9:
						stateTip = '订单已关闭';
						stateTipColor = '#909399';
						break;

					//更多自定义
				}
				return {stateTip, stateTipColor};
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
			height: 180upx;
			padding-top: 20upx;
			white-space: nowrap;
			.goods-item{
				width: 120upx;
				height: 120upx;
				display: inline-block;
				margin-right: 24upx;
			}
			.goods-img{
				display: block;
				width: 100%;
				height: 100%;
			}
			.goods-title {
				display: -webkit-box !important;
				overflow: hidden;
				text-overflow: ellipsis;
				word-break: break-all;
				-webkit-box-orient: vertical !important;
				-webkit-line-clamp: 1;
				font-size: $font-sm - 10upx;
			}
		}
		/* 单条商品 */
		.goods-box-single{
			display: flex;
			padding: 20upx 0;
			.goods-img{
				display: block;
				width: 120upx;
				height: 120upx;
			}
			.right{
				flex: 1;
				display: flex;
				flex-direction: column;
				padding: 0 30upx 0 24upx;
				overflow: hidden;
				.title{
					font-size: $font-base + 2upx;
					color: $font-color-dark;
					line-height: 1;
				}
				.attr-box{
					font-size: $font-sm + 2upx;
					color: $font-color-light;
					padding: 10upx 12upx;
				}
				.price{
					font-size: $font-base + 2upx;
					color: $font-color-dark;
					&:before{
						content: '￥';
						font-size: $font-sm;
						margin: 0 2upx 0 8upx;
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


	/* load-more */
	.uni-load-more {
		display: flex;
		flex-direction: row;
		height: 80upx;
		align-items: center;
		justify-content: center
	}

	.uni-load-more__text {
		font-size: 28upx;
		color: #999
	}

	.uni-load-more__img {
		height: 24px;
		width: 24px;
		margin-right: 10px
	}

	.uni-load-more__img>view {
		position: absolute
	}

	.uni-load-more__img>view view {
		width: 6px;
		height: 2px;
		border-top-left-radius: 1px;
		border-bottom-left-radius: 1px;
		background: #999;
		position: absolute;
		opacity: .2;
		transform-origin: 50%;
		animation: load 1.56s ease infinite
	}

	.uni-load-more__img>view view:nth-child(1) {
		transform: rotate(90deg);
		top: 2px;
		left: 9px
	}

	.uni-load-more__img>view view:nth-child(2) {
		transform: rotate(180deg);
		top: 11px;
		right: 0
	}

	.uni-load-more__img>view view:nth-child(3) {
		transform: rotate(270deg);
		bottom: 2px;
		left: 9px
	}

	.uni-load-more__img>view view:nth-child(4) {
		top: 11px;
		left: 0
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
