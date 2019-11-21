<template>
	<view>
		<view>
			<uni-search-bar radius="100" clearButton="auto" @confirm="search" />
		</view>
	</view>
</template>

<script>
	/**
	 * @des 商品搜索
	 *
	 * @author stav stavyan@qq.com
	 * @date 2019-11-21 10:31
	 * @copyright 2019
	 */
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	export default {
		components: {
			uniSearchBar
		},
		data() {
			return {
			}
		},
		onLoad(){
			this.initData()
		},
		methods: {
			/**
			 *@des 初始化数据
			 *@author stav stavyan@qq.com
			 *@blog https://stavtop.club
			 *@date 2019/11/21 10:31:08
			 *@param arguments
			 */
			initData () {
				// this.getAddressList();
			},
			search (e) {
				const keyword = e.value;
				if (!keyword) {
					uni.showToast({ title: '请输入搜索关键词', icon: "none" });
					return;
				}
				uni.navigateTo({
					url: `/pages/product/list?keyword=${keyword}`
				})
			}
		}
	}
</script>

<style lang='scss'>
	page{
		padding-bottom: 120upx;
	}
</style>
