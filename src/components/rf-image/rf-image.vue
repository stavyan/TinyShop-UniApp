<template>
	<image
		class="rf-image"
		mode="mode"
		@tap.stop="previewImage(src)"
		@error="onImageError"
		:src="src || '/static/errorImage.jpg'"></image>
</template>

<script>
	/**
	 * @des 图片标签的建议封装
	 *
	 * @author stav stavyan@qq.com
	 * @date 2020-03-10 15:33
	 * @copyright 2020
	 */
  export default {
    name: 'rfImage',
		props: {
			src: {
				type: String,
				default: '/static/errorImage.jpg'
			},
			// 显示模式
			mode: {
				type: String,
				default: 'aspectFill'
			},
			// 是否预览
			isPreviewImage: {
				type: Boolean,
				default: true
			}
		},
		methods: {
			// 图片异常处理
			onImageError () {
				this.src = '/static/errorImage.jpg';
			},
			// 图片预览
			previewImage(urls){
		    if (!this.isPreviewImage) return;
		    if (!urls) return;
				uni.previewImage({
					urls: urls.split('#$#'),
				});
			}
		},
  }
</script>

<style scoped lang="scss">
.rf-image {
	width: 100%;
	height: 100%;
}

</style>
