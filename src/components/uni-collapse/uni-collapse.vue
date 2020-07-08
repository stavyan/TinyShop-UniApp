<template>
	<view class="uni-collapse">
		<slot />
	</view>
</template>
<script>
export default {
	name: 'UniCollapse',
	props: {
		accordion: {
			// 是否开启手风琴效果
			type: [Boolean, String],
			default: false
		}
	},
	data() {
		return {};
	},
	provide() {
		return {
			collapse: this
		};
	},
	created() {
		this.childrens = [];
	},
	methods: {
		onChange() {
			let activeItem = [];
			this.childrens.forEach((vm, index) => {
				if (vm.isOpen) {
					activeItem.push(vm.nameSync);
				}
			});
			this.$emit('change', activeItem);
		}
	}
};
</script>
<style lang="scss" scoped>
.uni-collapse {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	/* #ifdef APP-NVUE */
	flex: 1;
	/* #endif */
	width: calc(100vw - 60upx);
	margin: 0 30upx 20upx;
	flex-direction: column;
	background-color: $color-white;
}
</style>
