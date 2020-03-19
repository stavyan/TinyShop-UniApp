<template>
	<view>
		<view class="banner">
			<rf-image class="banner-img" :src="announceDetail.cover"></rf-image>
			<view class="banner-title in2line">{{announceDetail.title}}</view>
		</view>
		<view class="article-meta">
			<text class="article-author">{{announceDetail.author_name}}</text>
			<text class="article-text">发布于</text>
			<text class="article-time">{{announceDetail.created_at | time}}</text>
		</view>
		<view class="article-content">
			<rich-text :nodes="announceDetail.content"></rich-text>
		</view>
		<!-- #ifdef MP-WEIXIN || MP-QQ -->
		<ad v-if="htmlNodes.length > 0" unit-id="adunit-01b7a010bf53d74e"></ad>
		<!-- #endif -->
	</view>
</template>

<script>
	import {notifyAnnounceView} from "../../api/basic";
	import moment from 'moment'

	export default {
		data() {
			return {
				announceDetail: {},
				id: undefined,
			}
		},
		filters: {
			// 时间格式化
			time(val) {
				return moment(val * 1000).format('YYYY-MM-DD HH:mm')
			},
		},
		onLoad(event) {
			this.id = event.id;
			this.getNotifyAnnounceView(event.id);
		},
		onShareAppMessage() {
			return {
				title: this.banner.title,
				path: `/pages/notice/detail?id=${this.id}`
			}
		},
		methods: {
			// 获取通知列表
			async getNotifyAnnounceView(id) {
				await this.$get(`${notifyAnnounceView}`, { id }).then(r => {
					this.announceDetail = r.data;
					uni.setNavigationBarTitle({
						title: r.data.title
					});
				})
			},
		}
	}
</script>

<style>
	.banner {
		height: 360upx;
		overflow: hidden;
		position: relative;
		background-color: #ccc;
	}

	.banner-img {
		width: 100%;
	}

	.banner-title {
		max-height: 84upx;
		overflow: hidden;
		position: absolute;
		bottom: 0;
		width: 100%;
		font-size: 32upx;
		font-weight: 400;
		line-height: 42upx;
		color: white;
		z-index: 11;
		background-color: rgba(0, 0, 0, 0.25);
		padding: 4upx 20upx;
	}

	.article-meta {
		padding: 20upx 40upx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		color: gray;
	}

	.article-text {
		font-size: 26upx;
		line-height: 50upx;
		margin: 0 20upx;
	}

	.article-author,
	.article-time {
		font-size: 30upx;
	}

	.article-content {
		padding: 0 30upx;
		overflow: hidden;
		font-size: 30upx;
		margin-bottom: 30upx;
	}
</style>
