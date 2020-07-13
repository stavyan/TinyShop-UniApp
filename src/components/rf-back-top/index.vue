<template>
	<view
		v-if="scrollTop > 400"
		class="backTop"
		:class="{ 'mescroll-fade-in': isShowToTop }"
		@click="toTopClick"
	>
		<text class="iconfont icondingbu"></text>
	</view>
</template>
<script>
import $mAssetsPath from '@/config/assets.config';
export default {
	name: 'backTop',
	props: {
		src: {
			type: String,
			default: $mAssetsPath.backTop
		},
		id: {
			type: String,
			default: ''
		},
		scrollTop: {
			type: Number,
			default: 0
		},
		tab: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			isShowToTop: true
		};
	},
	methods: {
		toTopClick() {
			this.isShowToTop = false; // 回到顶部按钮需要先隐藏,再执行回到顶部,避免闪动
			if (this.tab) {
				this.$emit('setScrollTop');
			} else {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
			}
		}
	}
};
</script>
<style lang="scss">
.mescroll-lazy-in,
.mescroll-fade-in {
	-webkit-animation: mescrollFadeIn 0.3s linear forwards;
	animation: mescrollFadeIn 0.3s linear forwards;
}

.backTop {
	z-index: 10;
	position: fixed;
	right: 40upx;
	bottom: 130upx;
	/* #ifdef H5 */
	bottom: 140upx;
	/* #endif */
	width: 72upx;
	height: 72upx;
	border-radius: 50%;
	transform: translateZ(0);
	-webkit-transform: translateZ(0);
	background-color: rgba(0,0,0,.5);
	display: flex;
	justify-content: center;
	align-items: center;
	.iconfont {
		font-size: 54upx;
		color: $color-white;
		font-weight: 600;
		z-index: 100;
	}
}
</style>
