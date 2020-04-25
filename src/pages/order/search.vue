<template>
	<view class="refund" :style="{backgroundColor: orderList.length === 0 ? '#fff' : '' }">
		<!--订单列表-->
		<scroll-view
			class="list-scroll-content"
			scroll-y
		>
			<!-- 订单列表 -->
			<view
				v-for="(item,index) in orderList" :key="index"
				class="rf-order-item"
			>
				<view class="i-top b-b">
					<text class="time">订单号：{{item.order_sn}}</text>
					<!--<text class="time">{{item.created_at | time}}</text>-->
					<text class="state" v-if="parseInt(item.order_status, 10) !== 0">{{item.order_status | orderStatusFilter }}</text>
					<view class="example-body" v-else>
						<rf-count-down :show-day="false" :second="second(item.created_at)" @timeup="timeUp(item)" color="#FFFFFF" background-color="#fa436a" border-color="#fa436a" />
					</view>
				</view>

				<view
					class="goods-box-single"
					@tap="navTo(`/pages/product/product?id=${goodsItem.product_id}`)"
					v-for="(goodsItem, goodsIndex) in item.product"
					:key="goodsIndex"
				>
					<image class="goods-img" :src="goodsItem.product_picture" mode="aspectFill"></image>
					<view class="right">
						<text class="title in2line">{{goodsItem.product_name}}</text>
						<text class="attr-box">{{goodsItem.sku_name || '基础版'}} * {{goodsItem.num}}</text>
						<text class="price base-color">￥ {{goodsItem.price}}</text>
					</view>
				</view>

				<view class="price-box">
					共
					<text class="num">{{ item.product_count }}</text>
					件商品 实付款
					<text class="price">{{ item.pay_money }}</text>
				</view>
				<view class="action-box b-t">
          <button class="action-btn" @tap="navTo(`/pages/order/detail?id=${item.id}`)">订单详情</button>
        </view>
			</view>
			<rf-load-more :status="loadingType" v-if="orderList.length > 0"></rf-load-more>
		</scroll-view>

		<rf-empty info="暂无相关订单" v-if="orderList.length === 0 && !loading"></rf-empty>
		<!--加载动画-->
		<rf-loading v-if="loading"></rf-loading>
	</view>
</template>

<script>
	/**
	 * @des 售后订单管理
	 *
	 * @author stav stavyan@qq.com
	 * @date 2020-01-15 11:54
	 * @copyright 2019
	 */
	import rfLoadMore from '@/components/rf-load-more/rf-load-more.vue';
	import moment from '@/common/moment';
  import {orderDelete, orderList, orderTakeDelivery} from '@/api/userInfo';
	import rfCountDown from '@/components/rf-count-down'
	import {orderClose} from '@/api/product';
  import mConstData from '@/config/constData.config'
	export default {
		components: {
			rfLoadMore,
			rfCountDown
		},
		data() {
			return {
				loadingType: 'more',
				orderList: [],
				page: 1,
				loading: true,
				keyword: null
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
		    let state;
				mConstData.orderStatus.forEach(orderItem => {
					if (orderItem.key === parseInt(orderStatus, 10)) {
						state = orderItem.value
					}
				})
	      return state;
      }
		},
		onLoad(options){
			this.initData(options);
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
			// 跳转页面
      navTo (route) {
	      this.$mRouter.push({route});
      },
			// 倒计时关闭订单
			timeUp(item) {
				this.handleOrderClose(item.id);
			},
			// 关闭订单
			async handleOrderClose(id) {
				await this.$http.get(`${orderClose}`, {
					id
				}).then(() => {
			    this.$mHelper.toast('订单取消成功');
					setTimeout(() => {
						this.page = 1;
						this.orderList.length = 0;
						this.getOrderList();
					}, 500)
				})
			},
			// 数据初始化
			initData (options) {
				this.keyword = options.keyword;
				this.orderList.length = 0;
				this.page = 1;
				this.getOrderList();
			},
			// 获取订单列表
			async getOrderList(type) {
		    const params = {};
				params.order_sn = this.keyword;
				await this.$http.get(`${orderList}`, {
					...params
				}).then(r => {
			    this.loading = false;
					if (type === 'refresh') {
						uni.stopPullDownRefresh();
					}
					this.loadingType  = r.data.length === 10 ? 'more' : 'nomore';
					this.orderList = [ ...this.orderList, ...r.data ]
				}).catch(() => {
			    this.loading = false;
					if (type === 'refresh') {
						uni.stopPullDownRefresh();
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.list-scroll-content{
		height: 100%;
	}
	.uni-swiper-item{
		height: auto;
	}
</style>
