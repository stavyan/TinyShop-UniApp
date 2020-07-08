<template>
	<view
		class="refund"
		:style="{ backgroundColor: orderList.length === 0 ? '#fff' : '' }"
	>
		<!--订单列表-->
		<scroll-view class="list-scroll-content" scroll-y>
			<!-- 订单列表 -->
			<view
				v-for="(item, index) in orderList"
				:key="index"
				class="rf-order-item"
			>
				<view class="i-top b-b">
					<text class="time">订单号：{{ item.order_sn }}</text>
					<text class="state">{{ item.order_status | orderStatusFilter }}</text>
				</view>
				<view
					class="goods-box-single"
					@tap="navTo(`/pages/product/product?id=${goodsItem.product_id}`)"
					v-for="(goodsItem, goodsIndex) in item.product"
					:key="goodsIndex"
				>
					<image
						class="goods-img"
						:src="goodsItem.product_picture"
						mode="aspectFill"
					></image>
					<view class="right">
						<text class="title in2line">{{ goodsItem.product_name }}</text>
						<text class="attr-box">{{ goodsItem.sku_name || singleSkuText }}</text>
						<text class="price" :class="'text-' + themeColor.name">{{ moneySymbol }}{{ goodsItem.product_money }} * {{ goodsItem.num }}</text>
					</view>
				</view>
				<view class="price-box">
					共
					<text class="num">{{ item.product_count }}</text>
					件商品 实付款
					<text class="price" :class="'text-' + themeColor.name">{{ moneySymbol }}{{ item.pay_money }}</text>
				</view>
				<view class="action-box b-t">
					<button
						class="action-btn"
						:class="'bg-' + themeColor.name"
						@tap="navTo(`/pages/order/detail?id=${item.id}`)"
					>
						订单详情
					</button>
				</view>
			</view>
			<rf-load-more
				:status="loadingType"
				v-if="orderList.length > 0"
			></rf-load-more>
		</scroll-view>

		<rf-empty
			:info="'快去商城逛逛吧'"
			v-if="orderList.length === 0 && !loading"
		></rf-empty>
		<!--加载动画-->
		<rfLoading isFullScreen :active="loading"></rfLoading>
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
import { orderList } from '@/api/userInfo';
import mConstData from '@/config/constData.config';
export default {
	components: {
		rfLoadMore
	},
	data() {
		return {
			loadingType: 'more',
			orderList: [],
			page: 1,
			moneySymbol: this.moneySymbol,
			loading: true,
			singleSkuText: this.singleSkuText
		};
	},
	filters: {
		// 状态显示格式化
		orderStatusFilter(orderStatus) {
			let state;
			mConstData.orderStatus.forEach(orderItem => {
				if (orderItem.key === parseInt(orderStatus, 10)) {
					state = orderItem.value;
				}
			});
			return state;
		}
	},
	onShow() {
		this.initData();
	},
	// 下拉刷新
	onPullDownRefresh() {
		this.page = 1;
		this.orderList.length = 0;
		this.getOrderList('refresh');
	},
	// 加载更多
	onReachBottom() {
  if (this.loadingType === 'nomore') return;
		this.page++;
		this.getOrderList();
	},
	methods: {
		// 跳转页面
		navTo(route) {
			this.$mRouter.push({ route });
		},
		// 数据初始化
		initData() {
			this.orderList.length = 0;
			this.page = 1;
			this.getOrderList();
		},
		// 获取订单列表
		async getOrderList(type) {
			const params = {};
			params.page = this.page;
			params.synthesize_status = -1;
			await this.$http
				.get(`${orderList}`, params)
				.then(r => {
					this.loading = false;
					if (type === 'refresh') {
						uni.stopPullDownRefresh();
					}
					this.loadingType = r.data.length === 10 ? 'more' : 'nomore';
					this.orderList = [...this.orderList, ...r.data];
				})
				.catch(() => {
					this.loading = false;
					if (type === 'refresh') {
						uni.stopPullDownRefresh();
					}
				});
		}
	}
};
</script>

<style lang="scss">
.list-scroll-content {
	height: 100%;
}
.uni-swiper-item {
	height: auto;
}
</style>
