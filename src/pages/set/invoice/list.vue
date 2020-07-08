<template>
	<view class="invoice-history">
		<view class="rf-list" v-if="invoiceList.length > 0">
			<view
				class="rf-list-item"
				v-for="(item, index) in invoiceList"
				:key="index"
				@tap="navTo(item.order_id)"
			>
				<view class="wrapper">
					<view class="address-box">
						<view class="order-fl">
							订单编号: <text class="order-sn">{{ item.order_sn }}</text>
						</view>
						<view class="order-wrapper">
							<text class="address"
								>{{ item.title
								}}<text v-if="item.content">{{
									` - ${item.content}`
								}}</text></text
							>
							<text class="address">开票金额:<text :class="'text-' + themeColor.name">{{ item.tax_money }}</text></text>
						</view>
					</view>
					<view class="u-box">
						<view class="in1line">
							<text class="name"
								>[{{ parseInt(item.type, 10) === 1 ? '公司' : '个人' }}]</text
							>
							<text class="mobile">{{
								item.duty_paragraph || '个人发票无税号'
							}}</text>
						</view>
						<text class="time">{{ item.created_at | time }}</text>
					</view>
				</view>
			</view>
			<rf-load-more v-if="invoiceList.length > 0" :status="loadingType" />
		</view>
		<rf-empty
			info="您还未购买任何商品"
			v-if="invoiceList.length === 0 && !loading"
		></rf-empty>
		<!--加载动画-->
		<rfLoading isFullScreen :active="loading"></rfLoading>
	</view>
</template>

<script>
import { orderInvoiceList } from '@/api/userInfo';
import moment from '@/common/moment';
import rfLoadMore from '@/components/rf-load-more/rf-load-more';
export default {
	components: {
		rfLoadMore
	},
	data() {
		return {
			page: 1,
			loadingType: 'more',
			invoiceList: [],
			loading: true
		};
	},
	filters: {
		time(val) {
			return moment(val * 1000).format('YYYY-MM-DD HH:mm');
		}
	},
	onLoad() {
		this.initData();
	},
	// 下拉刷新
	onPullDownRefresh() {
		this.loading = true;
		this.page = 1;
		this.invoiceList = [];
		this.getInvoiceList('refresh');
	},
	// 加载更多
	onReachBottom() {
  if (this.loadingType === 'nomore') return;
		this.page++;
		this.getInvoiceList();
	},
	methods: {
		// 数据初始化
		initData() {
			this.getInvoiceList();
		},
		// 获取发票历史
		async getInvoiceList(type) {
			await this.$http
				.get(`${orderInvoiceList}`, {
					page: this.page
				})
				.then(r => {
					this.loading = false;
					if (type === 'refresh') {
						uni.stopPullDownRefresh();
					}
					this.loadingType = r.data.length === 10 ? 'more' : 'nomore';
					this.invoiceList = [...this.invoiceList, ...r.data];
				})
				.catch(() => {
					this.loading = false;
					if (type === 'refresh') {
						uni.stopPullDownRefresh();
					}
				});
		},
		navTo(id) {
			this.$mRouter.push({ route: `/pages/order/detail?id=${id}` });
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: $page-color-base;
}
.invoice-list {
	position: relative;
	.t-box {
		display: flex;
		align-items: center;
		font-size: 30upx;
		color: $font-color-dark;
		.tag {
			font-size: 24upx;
			color: $base-color;
			margin-right: 10upx;
			background: #fffafb;
			border: 1px solid #ffb4c7;
			border-radius: 4upx;
			padding: 4upx 10upx;
			line-height: 1;
		}
	}
	.u-box {
		font-size: 28upx;
		color: $font-color-light;
		margin-top: 16upx;
		.name {
			margin-right: 30upx;
		}
	}
}
.wrapper {
	display: flex;
	flex-direction: column;
	flex: 1;
}
.address-box {
	.order-fl {
		font-size: $font-sm;
		color: $font-color-light;
		margin-bottom: 10upx;
		.order-sn {
			margin-left: 14upx;
		}
	}
	.order-wrapper {
		display: flex;
		justify-content: space-between;
		.tag {
			font-size: 24upx;
			color: $base-color;
			margin-right: 10upx;
			background: #fffafb;
			border: 1px solid #ffb4c7;
			border-radius: 4upx;
			padding: 4upx 10upx;
			line-height: 1;
		}
		.address {
			font-size: $font-base + 2upx;
			color: $font-color-dark;
		}
	}
}
.u-box {
	font-size: 28upx;
	color: $font-color-light;
	margin-top: 16upx;
	display: flex;
	justify-content: space-between;
	.name {
	}
	.time {
		font-size: $font-sm + 2upx;
	}
}
</style>
