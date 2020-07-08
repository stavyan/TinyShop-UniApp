<template>
	<view class="helper-detail" v-if="!loading">
		<view v-if="helperDetail.title" class="detail">
			<view class="title">{{ helperDetail.title }}</view>
			<rf-parser lazy-load :html="helperDetail.content || ''"></rf-parser>
		</view>
		<rf-empty :info="`暂无帮助内容`" v-if="!helperDetail.title && !loading"></rf-empty>
		<!--加载动画-->
		<rfLoading isFullScreen :active="loading"></rfLoading>
	</view>
</template>

<script>
import { helperView } from '@/api/basic';
export default {
	data() {
		return {
			loading: true,
			helperDetail: {},
			helperId: ''
		};
	},
	onLoad(option) {
		this.helperId = option.id;
		this.initData();
	},
	methods: {
		// 数据初始化
		initData() {
			this.getHelperDetail();
		},
		async getHelperDetail() {
			await this.$http.get(helperView, {
				id: this.helperId
			}).then(r => {
				this.loading = false;
				this.helperDetail = r.data;
				uni.setNavigationBarTitle({ title: r.data.title });
			}).catch(() => {
				this.loading = false;
			});
		}
	}
};
</script>

<style lang="scss" scoped>
page {
	background-color: $page-color-base;
}
.helper-detail {
	.detail {
		text-align: center;
		padding: $spacing-base $spacing-base;
		.title {
			font-size: $font-lg;
			color: $font-color-dark;
			padding: $spacing-base 0;
		}
	}
}
</style>
