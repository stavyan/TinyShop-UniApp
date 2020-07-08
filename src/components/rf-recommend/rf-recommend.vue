<template>
	<view class="rf-floor-index">
		<view class="f-header">
			<view class="line"></view>
			<text class="name">为您推荐</text>
			<view class="line"></view>
		</view>
		<rf-product-list :bottom="bottom" :list="guessYouLikeList"></rf-product-list>
	</view>
</template>
<script>
/**
 *@des 商品推荐
 *@author stav stavyan@qq.com
 *@blog https://stavtop.club
 *@date 2020/01/08 11:28:39
 */
import { guessYouLikeList } from '@/api/product';
import rfProductList from '@/components/rf-product-list';
export default {
	name: 'rfRecommend',
	components: { rfProductList },
	props: {
		list: {
			type: Array,
			default() {
				return [{}, {}];
			}
		},
		bottom: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			guessYouLikeList: []
		};
	},
	filters: {
		filterTotalSales (val) {
			if (val > 10000) {
				val = `${(val / 10000).toFixed(2)}w`;
			}
			return val;
		}
	},
	mounted() {
		this.initData();
	},
	methods: {
		initData() {
			if (this.list.length === 0) {
				this.getGuessYouLikeList();
			} else {
				this.guessYouLikeList = this.list;
			}
		},
		async getGuessYouLikeList() {
			await this.$http.get(`${guessYouLikeList}`).then(r => {
				this.guessYouLikeList = r.data;
			});
		},
		navTo(id) {
			if (!id) return;
			uni.navigateTo({
				url: `/pages/product/product?id=${id} `
			});
		}
	}
};
</script>
<style scoped lang="scss">
.rf-floor-index {
	.rf-product-list {
		margin-top: 0;
	}
	.banner {
		width: 92%;
		margin: 20upx 4% 0;
		image {
			width: 100%;
			height: 25vw;
			border-radius: 20upx;
			box-shadow: 0upx 5upx 25upx rgba(0, 0, 0, 0.05);
		}
	}
	.f-header {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 40upx 20% 20upx;
		.line {
			border-bottom: 1upx solid rgba(0, 0, 0, 0.15); // 边框
			width: 120upx;
		}
		.name {
		}
	}
}
</style>
