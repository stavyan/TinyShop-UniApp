<template>
	<view class="rf-floor-index">
		<!--广告图-->
		<view
			class="banner"
			v-if="bannerShow"
			@tap="toBanner(banner)"
		>
			<image :src="banner.cover" mode="aspectFill" />
		</view>
		<!--列表-->
		<view class="f-header" @tap="toList">
			<text class="iconfont" :class="[icon, 'text-'+themeColor.name]" />
			<view class="tit-box">
				<text class="tit">{{ header.title }}</text>
				<text class="tit2">{{ header.desc }}</text>
			</view>
			<text v-if="isLink" class="iconfont iconyou"></text>
		</view>
		<rf-product-list :bottom="bottom" :list="list.length > 0 ? list : [0, 0]"></rf-product-list>
	</view>
</template>
<script>/**
 *@des 首页楼层组件
 *@author stav stavyan@qq.com
 *@blog https://stavtop.club
 *@date 2020/01/08 11:28:39
 */
import $mAssetsPath from '@/config/assets.config';
import rfProductList from '@/components/rf-product-list';
export default {
	name: 'rfFloorIndex',
	components: { rfProductList },
	props: {
		// 列表
		list: {
			type: Array,
			default() {
				return [];
			}
		},
		// 广告图
		banner: {
			type: Object,
			default() {
				return {};
			}
		},
		// 标题 例: 新品上市
		header: {
			type: Object,
			default() {
				return {};
			}
		},
		// 是否显示banner图
		bannerShow: {
			type: Boolean,
			default: true
		},
		// 是否可点击
		isLink: {
			type: Boolean,
			default: true
		},
		// icon
		icon: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
		};
	},
	computed: {
		bottom () {
			let bottom = 0;
			/*  #ifdef H5  */
      bottom = 90;
			/*  #endif */
			return bottom;
		}
	},
	filters: {
		filterTotalSales (val) {
			if (val > 10000) {
				val = `${(val / 10000).toFixed(2)}w`;
			}
			return val;
		},
		filterTagName (val) {
			if (val.commissionRate) { // 分销商品
				return $mAssetsPath.distribution;
			} else if (val.is_virtual === '1') { // 虚拟产品
				return $mAssetsPath.virtual;
			} else if (val.shopping_type === '1') { // 包邮产品
				return $mAssetsPath.pinkage;
			}
		}
	},
	methods: {
		// 跳转详情页
		detail(id) {
			if (!id) return;
			this.$emit('detail', {
				id
			});
		},
		// banner 跳转页
		toBanner(item) {
			this.$emit('toBanner', item);
		},
		// 列表 跳转页
		toList() {
			this.$emit('toList');
		}
	}
};
</script>
<style scoped lang="scss">
.rf-floor-index {
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
		height: 120upx;
		padding: 6upx 20upx;
		margin: 0 0 20upx;
		background: #fff;
		border-bottom: 1upx solid rgba(0, 0, 0, 0.05);

		.iconfont {
			font-size: $font-lg + 24upx;
			margin-right: 20upx;
		}

		.tit-box {
			flex: 1;
			display: flex;
			flex-direction: column;
		}

		.tit {
			font-size: $font-lg + 2upx;
			color: #font-color-dark;
			line-height: 1.3;
		}

		.tit2 {
			font-size: $font-sm;
			color: $font-color-light;
		}

		.iconyou {
			font-size: $font-lg + 4upx;
			color: $font-color-light;
		}
	}
}
</style>
