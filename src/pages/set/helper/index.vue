<template>
	<view class="helperList" v-if="!loading">
		<!-- 帮助列表 -->
		<view v-if="helperList.length > 0">
			<uni-collapse v-for="(fItem, fIndex) in helperList" :key="fIndex">
				<uni-collapse-item open :title="fItem.title">
					<view class="helper-child-item" v-for="(sItem, sIndex) in fItem.child" :key="sIndex" @tap="navTo(`/pages/set/helper/detail?id=${sItem.id}`)">
						<text>{{ sItem.title }}</text>
						<text class="iconfont iconyou"></text>
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</view>
		<rf-empty info="暂无站点帮助" v-if="helperList.length === 0 && !loading"></rf-empty>
		<!--加载动画-->
		<rfLoading isFullScreen :active="loading"></rfLoading>
	</view>
</template>

<script>
import { helperIndex } from '@/api/basic';
import uniCollapse from '@/components/uni-collapse/uni-collapse.vue';
import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue';
export default {
	components: { uniCollapse, uniCollapseItem },
	data() {
		return {
			loading: true,
			helperList: [],
			page: 1
		};
	},
	onLoad() {
		this.initData();
	},
	methods: {
		// 数据初始化
		initData() {
			this.loading = true;
			this.getHelperList();
		},
		// 通用跳转
		navTo(route) {
			this.$mRouter.push({ route });
		},
		async getHelperList() {
			await this.$http.get(helperIndex).then(r => {
				this.loading = false;
				this.helperList = r.data;
			});
			this.loading = false;
		}
	}
};
</script>

<style lang="scss" scoped>
page {
	background-color: $page-color-base;
}
.helperList {
	margin-top: $spacing-base;
	.helper-child-item {
		margin: $spacing-base $spacing-lg;
		display: flex;
		justify-content: space-between;
	}
}
</style>
