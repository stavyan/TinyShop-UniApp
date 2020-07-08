<template>
	<view
		class="rf-order-search"
	>
		<!--header-->
		<view class="rf-header-box">
			<view class="rf-header" :style="{width:width+'px',height:height+'px'}">
				<view class="rf-back" :style="{marginTop:arrowTop+'px'}" @tap="back">
					<text class="iconfont iconzuo"></text>
				</view>
				<view class="input-box" :style="{marginTop:inputTop+'px'}">
					<input
						v-model="keyword"
						@confirm="handleOrderSearch"
						placeholder="请输入关键字"
						placeholder-style="font-size: 24upx; color:#ccc;"
						type="text" />
					<text class="icon iconfont iconsousuo2" @tap.stop="handleOrderSearch"></text>
				</view>
			</view>
		</view>
		<!--订单列表-->
		<scroll-view class="list-scroll-content" scroll-y :style="{top:height+'px'}">
			<!-- 订单列表 -->
			<view
				v-for="(item, index) in orderList"
				:key="index"
				class="rf-order-item"
			>
				<view class="i-top b-b">
					<text class="time">订单号：{{ item.order_sn }}</text>
					<!--<text class="time">{{item.created_at | time}}</text>-->
					<text class="state" v-if="parseInt(item.order_status, 10) !== 0">{{
						item.order_status | orderStatusFilter
					}}</text>
					<view class="example-body" v-else>
						<rf-count-down
							:show-day="false"
							:second="second(item.created_at)"
							@timeup="timeUp(item)"
							color="#FFFFFF"
							:background-color="themeColor.color"
							:border-color="themeColor.color"
						/>
					</view>
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
						<text class="price" :class="'text-' + themeColor.name">{{ moneySymbol }}{{ goodsItem.price }} * {{ goodsItem.num }}</text>
					</view>
				</view>

				<view class="price-box">
					共
					<text class="num">{{ item.product_count }}</text>
					件商品 实付款
					<text class="price">{{ item.pay_money }}</text>
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
			info="暂无相关订单"
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
import rfLoadMore from '@/components/rf-load-more/rf-load-more';
import moment from '@/common/moment';
import { orderList } from '@/api/userInfo';
import rfCountDown from '@/components/rf-count-down';
import { orderClose } from '@/api/product';
import mConstData from '@/config/constData.config';
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
			keyword: null,
			height: 64,
			moneySymbol: this.moneySymbol,
			inputTop: 0, // 搜索框距离顶部距离
			arrowTop: 0, // 箭头距离顶部距离
			singleSkuText: this.singleSkuText
		};
	},
	computed: {
		// 计算倒计时时间
		second() {
			return function(val) {
				return Math.floor(15 * 60 - (new Date() / 1000 - val));
			};
		}
	},
	filters: {
		// 时间格式化
		time(val) {
			return moment(val * 1000).format('YYYY-MM-DD HH:mm:ss');
		},
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
	onLoad(options) {
		let obj = {};
		// #ifdef MP-WEIXIN
		// eslint-disable-next-line
		obj = wx.getMenuButtonBoundingClientRect();
		// #endif
		// #ifdef MP-BAIDU
		// eslint-disable-next-line
		obj = swan.getMenuButtonBoundingClientRect();
		// #endif
		uni.getSystemInfo({
			success: (res) => {
				this.width = obj.left || res.windowWidth;
				this.height = obj.top ? (obj.top + obj.height + 8) : (res.statusBarHeight + 44);
				this.inputTop = obj.top ? (obj.top + (obj.height - 30) / 2) : (res.statusBarHeight + 7);
				this.arrowTop = obj.top ? (obj.top + (obj.height - 32) / 2) : (res.statusBarHeight + 6);
			}
		});
		this.initData(options);
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
		back() {
			this.$mRouter.back();
		},
		// 跳转页面
		navTo(route) {
			this.$mRouter.push({ route });
		},
		// 倒计时关闭订单
		timeUp(item) {
			this.handleOrderClose(item.id);
		},
		// 关闭订单
		async handleOrderClose(id) {
			await this.$http
				.get(`${orderClose}`, {
					id
				})
				.then(() => {
					this.$mHelper.toast('订单取消成功');
					setTimeout(() => {
						this.page = 1;
						this.orderList.length = 0;
						this.getOrderList();
					}, 500);
				});
		},
		// 数据初始化
		initData(options) {
			this.keyword = options.keyword;
			this.orderList.length = 0;
			this.page = 1;
			this.getOrderList();
		},
		// 数据初始化
		handleOrderSearch() {
			this.orderList.length = 0;
			this.page = 1;
			this.getOrderList();
		},
		// 获取订单列表
		async getOrderList(type) {
			const params = {};
			params.keyword = this.keyword;
			params.page = this.page;
			await this.$http
				.get(`${orderList}`, {
					...params
				})
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
.rf-order-search {
	.rf-header-box {
		width: 100%;
		background: $color-white;
		position: fixed;
		z-index: 100;
		left: 0;
		top: 0;
		.rf-header {
			display: flex;
			align-items: flex-start;
			.rf-back {
				margin-left: 8rpx;
				height: 32px !important;
				width: 32px !important;
				display: flex;
				justify-content: center;
				align-items: center;
				.iconzuo {
					font-size: $font-lg + 4upx;
					font-weight: 500;
					color: $font-color-dark;
				}
			}
		}
		.input-box {
			width: 100%;
			font-size: $font-sm;
			box-sizing: border-box;
			color: #999;
			display: flex;
			align-items: center;
			overflow: hidden;
			height: 60upx;
			background-color: $page-color-base;
			border-radius: 30upx;
			position: relative;
			margin: 0 20upx 0 10upx;
			.iconsousuo2 {
				z-index: 100;
				display: flex;
				align-items: center;
				position: absolute;
				top: 0;
				right: 0;
				width: 60upx;
				height: 60upx;
				font-size: $font-lg + 4upx;
				color: $font-color-dark;
			}
			input {
				width: 100%;
				padding-left: 28upx;
				height: 28upx;
				color: $font-color-base;
				font-size: 28upx;
			}
		}
	}
	.list-scroll-content {
		position: relative;
	}
}
</style>
