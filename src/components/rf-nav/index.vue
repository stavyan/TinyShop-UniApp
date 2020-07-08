<template>
	<view class="rf-kefu">
		<view class="wrapper" @tap="show">
			<text class="iconfont icongengduo"></text>
		</view>
		<!--顶部下拉菜单-->
		<rf-nav-detail
			:popupShow="popupShow"
			@hide="hideNavDetail"
		>
		</rf-nav-detail>
		<!---顶部下拉菜单-->
	</view>
</template>
<script>
import rfNavDetail from '@/components/rf-nav-detail';
export default {
	name: 'rfNav',
	components: { rfNavDetail },
	data() {
		return {
			popupShow: false
		};
	},
	methods: {
		stopPrevent() {},
		show() {
			this.popupShow = true;
		},
		// 隐藏顶部导航
		hideNavDetail() {
			this.popupShow = false;
		}
	}
};
</script>
<style scoped lang="scss">
.rf-kefu {
	width: 100%;
	.wrapper {
		height: 72upx;
		width: 72upx;
		background-color: #000;
		opacity: 0.5;
		border-radius: 50%;
		position: fixed;
		display: flex;
		justify-content: center;
		align-items: center;
		right: 20upx;
		top: 160upx;
		z-index: 98;
	}
	.iconfont {
		font-size: 48upx;
		opacity: 1;
		color: $color-white;
		z-index: 100;
	}
}
</style>
