<template>
	<view class="feedback-list">
		<view class="rf-list" v-if="feedbackList.length > 0">
			<view
				class="rf-list-item"
				v-for="(item, index) in feedbackList"
				:key="index"
				@tap="navTo(`/pages/set/feedback/detail?id=${item.id}`)"
			>
				<view class="wrapper">
					<view class="address-box">
						<text class="tag" :class="'text-' + themeColor.name">{{ item.type | feedbackFilter }}</text>
						<text class="address in1line">{{ item.content }}</text>
					</view>
					<view class="u-box">
						<text class="name">{{ item.reply || '管理员未回复' }}</text>
						<text class="mobile"
							>联系方式：{{ item.contact_way || '暂无' }}</text
						>
					</view>
				</view>
			</view>
			<rf-load-more
				v-if="feedbackList.length > 0 && !loading"
				:status="loadingType"
			/>
		</view>
		<view class="add-btn-wrapper">
			<button class="add-btn" :class="'bg-' + themeColor.name" @tap="navTo(`/pages/set/feedback/feedback`)">
				意见反馈
			</button>
		</view>
		<rf-empty
			:info="'您还没有反馈意见'"
			v-if="feedbackList.length === 0 && !loading"
		></rf-empty>
		<rfLoading isFullScreen :active="loading"></rfLoading>
	</view>
</template>

<script>
import { opinionList } from '@/api/userInfo';

import rfLoadMore from '@/components/rf-load-more/rf-load-more';

export default {
	components: {
		rfLoadMore
	},
	data() {
		return {
			page: 1,
			feedbackList: [],
			loadingType: 'more',
			loading: true
		};
	},
	filters: {
		feedbackFilter(type) {
			const feedbackType = ['', '功能建议', 'BUG反馈', '业务咨询'];
			return feedbackType[parseInt(type, 10)];
		}
	},
	// 下拉刷新
	onPullDownRefresh() {
		this.page = 1;
		this.feedbackList.length = 0;
		this.getFeedbackList('refresh');
	},
	// 加载更多
	onReachBottom() {
  if (this.loadingType === 'nomore') return;
		this.page++;
		this.getFeedbackList();
	},
	onShow() {
		this.initData();
	},
	methods: {
		// 数据初始化
		initData() {
			this.page = 1;
			this.feedbackList.length = 0;
			this.getFeedbackList();
		},
		// 获取意见反馈列表
		async getFeedbackList(type) {
			await this.$http
				.get(`${opinionList}`, { page: this.page })
				.then(r => {
					this.loading = false;
					if (type === 'refresh') {
						uni.stopPullDownRefresh();
					}
					this.loadingType = r.data.length === 10 ? 'more' : 'nomore';
					this.feedbackList = [...this.feedbackList, ...r.data];
				})
				.catch(() => {
					this.loading = false;
					if (type === 'refresh') {
						uni.stopPullDownRefresh();
					}
				});
		},
		navTo(route) {
			this.$mRouter.push({ route });
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: $page-color-base;
}

.feedback-list {
	position: relative;
	.wrapper {
		display: flex;
		flex-direction: column;
		flex: 1;
	}
	.address-box {
		display: flex;
		align-items: center;
		.tag {
			font-size: 24upx;
			margin-right: 10upx;
			border: 1px solid;
			border-radius: 4upx;
			padding: 4upx 10upx;
			line-height: 1;
		}

		.address {
			font-size: 30upx;
			color: $font-color-dark;
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
