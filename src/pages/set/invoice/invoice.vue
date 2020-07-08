<template>
	<view class="invoice-list">
		<view class="rf-list" v-if="invoiceList.length > 0">
			<view
				class="rf-list-item"
				v-for="(item, index) in invoiceList"
				@tap="checkInvoice(item)"
				:key="index"
				@longtap="deleteInvoice(item.id)"
			>
				<view class="mid">
					<view class="t-box">
						<text v-if="parseInt(item.is_default, 10) === 1" class="tag" :class="['text-' + themeColor.name]"
							>默认</text
						>
						<text>发票抬头: {{ item.title }}</text>
					</view>
					<view class="u-box">
						[{{ parseInt(item.type, 10) === 1 ? '公司' : '个人' }}] —
						{{ item.duty_paragraph || '个人发票无税号' }}
					</view>
				</view>
				<view class="right">
					<text
						class="iconfont iconbianji"
						@tap.stop="addInvoice('edit', item.id)"
					></text>
				</view>
			</view>
			<text class="tips" :class="'text-' + themeColor.name" v-if="invoiceList.length > 0">
				提示：长按可删除当前发票。最多只能存在一个默认发票。
			</text>
			<rf-load-more v-if="invoiceList.length > 0" :status="loadingType" />
		</view>
		<view class="add-btn-wrapper">
			<button class="add-btn" :class="'bg-' + themeColor.name" @tap="addInvoice('add')">新增发票</button>
		</view>
		<rf-empty
			info="暂无发票"
			v-if="invoiceList.length === 0 && !loading"
		></rf-empty>
		<!--加载动画-->
		<rfLoading isFullScreen :active="loading"></rfLoading>
	</view>
</template>

<script>
import { invoiceList, invoiceDel } from '@/api/userInfo';
import rfLoadMore from '@/components/rf-load-more/rf-load-more';
export default {
	components: {
		rfLoadMore
	},
	data() {
		return {
			timeOutEvent: 0,
			source: 0,
			invoiceList: [],
			page: 1,
			loadingType: 'more',
			loading: true
		};
	},
	onShow() {
		this.initData();
	},
	onLoad(option) {
		this.source = option.source;
	},
	// 下拉刷新
	onPullDownRefresh() {
		this.page = 1;
		this.invoiceList.length = 0;
		this.getInvoiceList('refresh');
	},
	// 加载更多
	onReachBottom() {
  if (this.loadingType === 'nomore') return;
		this.page++;
		this.getInvoiceList();
	},
	methods: {
		deleteInvoice(id) {
			uni.showModal({
				content: '确定要删除该发票吗',
				success: e => {
					if (e.confirm) {
						this.handleInvoiceDel(id);
					}
				}
			});
		},
		async handleInvoiceDel(id) {
			await this.$http.delete(`${invoiceDel}?id=${id}`).then(() => {
				this.page = 1;
				this.invoiceList.length = 0;
				this.getInvoiceList();
			});
		},
		// 手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
		goTouchEnd() {
			clearTimeout(this.timeOutEvent);
		},
		// 如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
		goTouchMove() {
			clearTimeout(this.timeOutEvent); // 清除定时器
			this.timeOutEvent = 0;
		},
		// 初始化数据
		initData() {
			this.page = 1;
			this.invoiceList.length = 0;
			this.getInvoiceList();
		},
		// 获取发票列表
		async getInvoiceList(type) {
			await this.$http
				.get(`${invoiceList}`, { page: this.page })
				.then(r => {
					this.loading = false;
					if (type === 'refresh') {
						uni.stopPullDownRefresh();
					}
					this.loadingType = r.data.length === 10 ? 'more' : 'nomore';
					this.invoiceList = [...this.invoiceList, ...r.data];
				})
				.catch(() => {
					if (type === 'refresh') {
						uni.stopPullDownRefresh();
					}
					this.loading = false;
				});
		},
		// 选择发票
		checkInvoice(item) {
			if (parseInt(this.source, 10) === 1) {
				// this.$mHelper.prePage()获取上一页实例，在App.vue定义
				this.$mHelper.prePage().invoiceItem = item;
				this.$mRouter.back();
			}
		},
		// 跳转至新增/编辑发票
		addInvoice(type, id) {
			this.$mRouter.push({
				route: `/pages/set/invoice/manage?type=${type}&id=${id}`
			});
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
			margin-right: 10upx;
			border: 1px solid;
			border-radius: 4upx;
			padding: 0 12upx;
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
</style>
