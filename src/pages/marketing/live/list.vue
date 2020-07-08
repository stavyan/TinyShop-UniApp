<template>
	<view class="rf-live-list">
		<!--顶部账单类型 全部/充值/消费-->
		<view class="navbar">
			<view
				v-for="(item, index) in liveTypeList"
				:key="index"
				class="nav-item"
				:class="tabCurrentIndex === index ? `text-${themeColor.name} current` : ''"
				@tap="tabClick(index, item.state)"
			>
				{{ item.text }}
			</view>
		</view>
		<!--提现记录列表-->
		<view class="rf-list" v-if="liveList.length > 0">
			<view
				class="rf-list-item"
				v-for="(item, index) of liveList"
				@tap="navToLive(item)"
				:key="index"
			>
				<view class="left">
					<image
						:preview="false"
						class="image"
						mode="aspectFill"
						:src="item.cover"
					></image>
				</view>
				<view class="mid">
					<text class="title in2line">{{ item.name }}</text>
					<text class="name in1line">主播：{{ item.anchor_name || '暂未填写'}}</text>
					<text class="time" v-if="item.live_status === '101'">直播开始于 {{ item.start_time | time }}</text>
					<text class="time" v-if="item.live_status === '102'">直播于 {{ item.start_time | time }} 开始</text>
					<text class="time" v-if="item.live_status === '103'">直播: {{ item.start_time | time }} - {{ item.end_time | time  }}</text>
				</view>
				<view class="right">
					<uni-tag
						class="tag"
						:text="state | filterStateText"
						:type="state | filterStateTag"
						size="small"
					/>
				</view>
			</view>
			<rf-load-more
				class="load-more"
				:status="loadingType"
				v-if="liveList.length > 0"
			></rf-load-more>
		</view>
		<rf-empty
			info="暂无直播记录"
			v-if="liveList.length === 0 && !loading"
		></rf-empty>
		<!--加载动画-->
		<rfLoading isFullScreen :active="loading"></rfLoading>
	</view>
</template>
<script>
/**
 * @des 佣金明细
 *
 * @author stav stavyan@qq.com
 * @date 2020-01-13 11:18
 * @copyright 2019
 */
import rfLoadMore from '@/components/rf-load-more/rf-load-more.vue';
import moment from '@/common/moment';
import uniTag from '@/components/uni-tag/uni-tag';
import { miniProgramLiveIndex } from '@/api/product';
export default {
	components: {
		rfLoadMore,
		uniTag
	},
	data() {
		return {
			loading: true,
			typeClass: 'valid',
			state: 1,
			tabCurrentIndex: 0,
			liveTypeList: this.$mConstDataConfig.liveTypeList,
			liveList: [],
			loadingType: 'more',
			page: 1,
			headImg: this.$mAssetsPath.headImg
		};
	},
	filters: {
		time(val) {
			return moment(val * 1000).format('MM/DD HH:mm');
		},
		filterStateText(val) {
			switch (parseInt(val, 10)) {
				case 101:
					return '直播中';
				case 102:
					return '未开始';
				case 103:
					return '已结束';
			}
		},
		filterStateTag(val) {
			switch (parseInt(val, 10)) {
				case 101:
					return 'success';
				case 102:
					return 'warning';
				case 103:
					return 'error';
			}
		}
	},
	// 下拉刷新
	onPullDownRefresh() {
		this.page = 1;
		this.loading = true;
		this.liveList = [];
		this.getLiveList('refresh');
	},
	// 加载更多
	onReachBottom() {
  if (this.loadingType === 'nomore') return;
		this.page++;
		this.getLiveList();
	},
	onLoad(options) {
		this.initData(options);
	},
	methods: {
		// 顶部tab点击
		tabClick(index, state) {
			this.page = 1;
			this.liveList.length = 0;
			this.loading = true;
			this.tabCurrentIndex = index;
			this.state = state;
			this.getLiveList();
		},
		// 数据初始化
		initData(options) {
			this.state = options.state || 101;
			if (this.state.toString() === '2') {
				this.tabCurrentIndex = 1;
			} else if (this.state.toString() === '3') {
				this.tabCurrentIndex = 2;
			}
			this.getLiveList();
		},
		// 获取直播记录
		async getLiveList(type) {
			await this.$http
				.get(`${miniProgramLiveIndex}`, {
					page: this.page,
					live_status: this.state
				})
				.then(r => {
					this.loading = false;
					if (type === 'refresh') {
						uni.stopPullDownRefresh();
					}
					this.loadingType = r.data.length === 10 ? 'more' : 'nomore';
					this.liveList = [
						...this.liveList,
						...r.data
					];
				})
				.catch(() => {
					this.loading = false;
					if (type === 'refresh') {
						uni.stopPullDownRefresh();
					}
				});
		},
    navToLive(item) {
			const roomId = item.room_id;
			if (!roomId || this.state !== 101) return;
			// #ifdef MP-WEIXIN
			this.$mRouter.push({ route: `plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=${[roomId]}` });
			// #endif
			// #ifndef MP-WEIXIN
			this.$mHelper.toast('请从微信小程序进入带货直播间');
			// #endif
    }
	}
};
</script>
<style scoped lang="scss">
page {
	background-color: $page-color-base;
}
.rf-live-list {
	.left {
		text-align: center;
		.image {
			width: 170upx;
			height: 150upx;
			border-radius: 12upx;
		}
	}
	.mid {
		margin: 0 $spacing-base;
		.name {
			font-size: $font-base;
		}
		.title {
			height: 60upx;
			line-height: 30upx;
		}
		.time {
			font-size: $font-sm;
			color: $font-color-light;
		}
	}
}
</style>
