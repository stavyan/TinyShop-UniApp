<template>
  <!--加载动画-->
  <view class="cu-load load-modal">
    <image :src="src" mode="aspectFit"></image>
    <view class="gray-text">{{ content }}</view>
  </view>
</template>

<script>
  /**
   * @des 页面加载
   *
   * @author stav stavyan@qq.com
   * @date 2020-03-23 11:43
   * @copyright 2019
   */
  import $mAssetsPath from '@/config/assets.config.js'
	export default {
		name: 'rf-loading',
    props: {
      src: {
      	type: String,
        default: $mAssetsPath.logo
      },
      content: {
      	type: String,
        default: '加载中...'
      }
    }
	}
</script>

<style scoped>

</style>
