<template>
	<view clas="notice">
		<view class="notice-item" v-for="item in announceList" :key="item.id">
			<text class="time">{{ item.created_at | time }}</text>
			<view
				class="content"
				@tap="navTo(`/pages/index/notice/detail?id=${item.id}`)"
			>
				<text class="title">{{ item.title }}</text>
				<view class="img-wrapper" v-if="item.cover">
					<rf-image
						class="pic"
						:preview="false"
						:mode="'aspectFit'"
						:src="item.cover"
					></rf-image>
				</view>
				<text class="introduce" v-if="item.synopsis">
					{{ item.synopsis }}
				</text>
				<view class="bot b-t">
					<text>查看详情</text>
					<i class="more-icon iconfont iconyou"></i>
				</view>
			</view>
		</view>

		<rf-load-more
			class="load-more"
			:status="loadingType"
			v-if="announceList.length > 0"
		></rf-load-more>
		<rf-empty
			info="暂无商城公告"
			v-if="announceList.length === 0 && !loading"
		></rf-empty>

		<!--加载动画-->
		<rfLoading isFullScreen :active="loading"></rfLoading>
	</view>
</template>

<script>
import { notifyAnnounceIndex } from '@/api/basic';
import rfLoadMore from '@/components/rf-load-more/rf-load-more.vue';
import moment from '@/common/moment';
export default {
	components: { rfLoadMore },
	data() {
		return {
			announceList: [], // 公告列表
			loadingType: 'more',
			loading: true,
			page: 1
		};
	},
	filters: {
		// 时间格式化
		time(val) {
			return moment(val * 1000).format('YYYY-MM-DD HH:mm');
		}
	},
	// 下拉刷新
	onPullDownRefresh() {
		this.page = 1;
		this.announceList.length = 0;
		this.getNotifyAnnounceIndex('refresh');
	},
	// 加载更多
	onReachBottom() {
  if (this.loadingType === 'nomore') return;
		this.page++;
		this.getNotifyAnnounceIndex();
	},
	onLoad() {
		this.initData();
	},
	methods: {
		// 数据初始化
		initData() {
			this.getNotifyAnnounceIndex();
		},
		// 获取通知列表
		async getNotifyAnnounceIndex(type) {
			await this.$http
				.get(`${notifyAnnounceIndex}`, { page: this.page })
				.then(r => {
					this.loading = false;
					if (type === 'refresh') {
						uni.stopPullDownRefresh();
					}
					this.loadingType = r.data.length === 10 ? 'more' : 'nomore';
					this.announceList = [...this.announceList, ...r.data];
				})
				.catch(() => {
					if (type === 'refresh') {
						uni.stopPullDownRefresh();
					}
					this.loading = false;
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
	padding-bottom: 30upx;
}

.notice-item {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.time {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 80upx;
	padding-top: 10upx;
	font-size: 26upx;
	color: #7d7d7d;
}

.content {
	width: 710upx;
	padding: 0 24upx;
	background-color: #fff;
	border-radius: 4upx;
}

.title {
	display: flex;
	align-items: center;
	height: 90upx;
	font-size: 32upx;
	color: #303133;
}

.img-wrapper {
	width: 100%;
	height: 260upx;
	position: relative;
}

.pic {
	display: block;
	width: 100%;
	height: 100%;
	border-radius: 6upx;
}

.cover {
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	font-size: 36upx;
	color: #fff;
}

.introduce {
	display: inline-block;
	padding: 16upx 0;
	font-size: 28upx;
	color: #606266;
	line-height: 38upx;
}

.bot {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 80upx;
	font-size: 24upx;
	color: #707070;
	position: relative;
}

.more-icon {
	font-size: 32upx;
}
</style>
