<template>
  <!--&lt;!&ndash; #ifdef APP-PLUS &ndash;&gt;-->
  <!--<image class="rf-image" :lazy-load="true" @tap.stop="previewImage(src)" :src="src"></image>-->
  <!--&lt;!&ndash; #endif &ndash;&gt;-->
  <!--&lt;!&ndash; #ifdef H5 &ndash;&gt;-->
  <!--<img class="rf-image" mode="mode" @tap.stop="previewImage(src)" v-lazy="src">-->
  <!--&lt;!&ndash; #endif &ndash;&gt;-->
  <image
    class="rf-image"
    mode="mode"
    lazy-load="true"
    @tap.stop="previewImage(src)"
    @error="onImageError"
    :src="src || $mAssetsPath.errorImage"></image>
</template>

<script>/**
 * @des 图片标签的建议封装
 *
 * @author stav stavyan@qq.com
 * @date 2020-03-10 15:33
 * @copyright 2020
 */
import $mAssetsPath from '@/config/assets.config';

export default {
		name: 'rfImage',
		props: {
			src: {
				type: String,
				default: $mAssetsPath.errorImage
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
    // data() {
		// 	return {
    //     errorImage: this.
    //   };
    // },
		methods: {
			// 图片异常处理
			onImageError() {
				this.src = $mAssetsPath.errorImage;
			},
			// 图片预览
			previewImage(urls) {
				if (!this.isPreviewImage) return;
				if (!urls) return;
				uni.previewImage({
					urls: urls.split('#$#')
				});
			}
		}
	}
</script>

<style scoped lang="scss">
  .rf-image {
    width: 100%;
    height: 100%;
  }
</style>
