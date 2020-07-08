<template>
	<view class="authorization-list">
		<view class="rf-list" v-if="thirdPartyAuthList.length > 0">
			<view
				class="rf-list-item"
				v-for="(item, index) in thirdPartyAuthList"
				:key="index"
			>
				<view class="left">
					<image class="head_portrait" :src="item.head_portrait"></image>
				</view>
				<view class="mid">
					<view class="title">
						<text class="iconfont icon iconweixinzhifu"></text>
						<text class="address">{{
							item.oauth_client | oauthClientFilter
						}}</text>
					</view>
					<view class="time">
						<text>授权时间: {{ item.updated_at | time }}</text>
					</view>
				</view>
				<view class="right">
					<text class="rf-button" :class="'bg-' + themeColor.name" @tap.stop="unBind(item.id)">解除绑定</text>
				</view>
			</view>
			<rf-load-more
				:status="loadingType"
				v-if="thirdPartyAuthList.length > 0"
			/>
		</view>
		<rf-empty
			:info="'您暂未授权第三方平台~'"
			v-if="thirdPartyAuthList.length === 0 && !loading"
		></rf-empty>
		<!--加载动画-->
		<rfLoading isFullScreen :active="loading"></rfLoading>
	</view>
</template>

<script>
import { thirdPartyAuthDelete, thirdPartyAuthList } from '@/api/userInfo';
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
			thirdPartyAuthList: [],
			loading: true
		};
	},
	filters: {
		time(val) {
			return moment(val * 1000).format('YYYY-MM-DD HH:mm:ss');
		},
		oauthClientFilter(val) {
			switch (val) {
				case 'wechat':
					return '微信';
				case 'wechatMp':
					return '微信小程序';
				case 'qq':
					return 'QQ小程序';
				case 'sina':
					return '新浪';
				case 'wechatOP':
					return '微信开放平台';
			}
		}
	},
	// 下拉刷新
	onPullDownRefresh() {
		this.page = 1;
		this.thirdPartyAuthList.length = 0;
		this.loading = true;
		this.getThirdPartyAuthList('refresh');
	},
	// 加载更多
	onReachBottom() {
  if (this.loadingType === 'nomore') return;
  if (this.loadingType === 'nomore') return;
		this.page++;
		this.getThirdPartyAuthList();
	},
	onLoad() {
		this.initData();
	},
	methods: {
		// 数据初始化
		initData() {
			this.page = 1;
			this.thirdPartyAuthList.length = 0;
			this.getThirdPartyAuthList();
		},
		// 获取收货地址列表
		async getThirdPartyAuthList(type) {
			await this.$http
				.get(`${thirdPartyAuthList}`)
				.then(r => {
					this.loading = false;
					if (type === 'refresh') {
						uni.stopPullDownRefresh();
					}
					this.loadingType = r.data.length === 10 ? 'more' : 'nomore';
					this.thirdPartyAuthList = [...this.thirdPartyAuthList, ...r.data];
				})
				.catch(() => {
					this.loading = false;
					if (type === 'refresh') {
						uni.stopPullDownRefresh();
					}
				});
		},
		// 解绑第三方授权登录
		async unBind(id) {
			await this.$http.delete(`${thirdPartyAuthDelete}?id=${id}`).then(r => {
				this.page = 1;
				this.thirdPartyAuthList = [];
				this.getThirdPartyAuthList();
			});
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: $page-color-base;
}
.authorization-list {
	.rf-list {
		.left {
			.head_portrait {
				width: 80upx;
				height: 80upx;
				margin: $spacing-lg $spacing-lg $spacing-lg 0;
				border-radius: 50%;
			}
		}
		.mid {
			flex: 1;
			.title {
				font-size: $font-lg;
				.iconweixinzhifu {
					margin-right: 10upx;
					color: #36cb59;
				}
			}
			.time {
				font-size: $font-sm;
				color: $font-color-light;
			}
		}
		.right {
			.rf-button {
				font-size: $font-sm;
				padding: 10upx 20upx;
			}
		}
	}
}
</style>
