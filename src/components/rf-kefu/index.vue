<template>
  <view class="rf-kefu" v-if="appServiceType !== '0'">
		<view class="wrapper" @tap="show">
			<text class="iconfont iconshouhoukefu"></text>
		</view>
		<view
			class="popup spec show"
			v-if="kefuClass"
			@touchmove.stop.prevent="stopPrevent"
			@tap="hide"
		>
			<!-- 遮罩层 -->
			<view class="mask" @tap="hide"></view>
			<view class="share-bg">
				<image :src="appServiceQr"></image>
			</view>
		</view>
  </view>
</template>
<script>
/*  eslint-disable  */
export default {
  name: 'Home',
	props: {
    bottom: {
      type: Number,
      default: 150
    }
	},
  data () {
    return {
      kefuClass: false,
      appServiceQr: this.$mSettingConfig.appServiceQr,
      appServiceType: this.$mSettingConfig.appServiceType
    };
  },
  methods: {
    stopPrevent() {},
    hide() {
      this.kefuClass = false;
    },
    show() {
      if (this.appServiceType === '1') {
        this.kefuClass = true;
      } else if (this.appServiceType === '2') {
      	if (!this.$mStore.getters.hasLogin) {
      		this.$mHelper.backToLogin();
      		return;
	      }
        this.$mRouter.push({ route: '/pages/product/service/index' });
      }
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
			right: 40upx;
			bottom: 130upx;
			/* #ifdef H5 */
			bottom: 140upx;
			margin-bottom: env(safe-area-inset-bottom);
			/* #endif */
			z-index: 98;
		}
		.iconfont {
			font-size: 48upx;
			opacity: 1;
			color: $color-white;
			z-index: 92;
		}
		.share-bg {
			height: 100vh;
			display: flex;
			justify-content: center;
			align-items: center;
			z-index: 98;
			image {
				margin-top: -10vw;
				width: 60vw;
				height: 60vw;
				border-radius: 12upx;
				z-index: 98;
			}
		}
	}
</style>
