<template>
  <view class="rf-live" v-show="liveShow">
		<view class="wrapper">
			<text class="iconfont" :class="icon"></text>
			<view class="content">直播中</view>
			<view class="btn" @tap="navToLive">去围观</view>
		</view>
  </view>
</template>
<script>
import { miniProgramLiveIndex } from '@/api/product';

export default {
  name: 'rfLive',
	props: {
	},
  data () {
    return {
      icon: 'iconzhibo11',
      index: 1,
      liveShow: false,
      roomId: '',
      timer: ''
    };
  },
	async created() {
		await this.getLiveList();
	},
	// 销毁定时器
	beforeDestroy () {
    clearInterval(this.timer);
	},
  methods: {
		// 获取直播记录
		async getLiveList() {
			await this.$http
				.get(`${miniProgramLiveIndex}`, {
					live_status: 101
				})
				.then(r => {
					if (r.data.length === 0) return;
					this.liveShow = true;
					this.roomId = r.data[0].room_id;
					this.timer = setInterval(() => {
						if (this.index > 3) this.index = 1;
						this.icon = `iconzhibo${this.index}1`;
						this.index += 1;
					}, 0.15 * 1000);
				});
		},
    navToLive() {
			// #ifdef MP-WEIXIN
			if (!this.roomId) return;
			this.$mRouter.push({ route: `plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=${[this.roomId]}` });
			// #endif
			// #ifndef MP-WEIXIN
			this.$mHelper.toast('请从微信小程序进入带货直播间');
			// #endif
    }
  }
};
</script>
<style scoped lang="scss">
	.rf-live {
		width: 100%;
		.wrapper {
			padding: $spacing-base $spacing-sm $spacing-sm;
			background-color: rgba(0 ,0, 0, 0.6);
			border-radius: 12upx;
			position: fixed;
			text-align: center;
			right: 40upx;
			top: 40%;
			z-index: 98;
			color: $color-white;
			.iconfont {
				font-size: $font-lg;
				opacity: 1;
				z-index: 92;
			}
			.content {
				font-size: $font-sm;
				margin: $spacing-sm 0;
			}
			.btn {
				margin-top: $spacing-lg;
				font-size: $font-sm;
				background-color: $base-color;
				opacity: 1;
				width: 100upx;
				height: 42upx;
				line-height: 42upx;
				border-radius: 18upx;
			}
		}
	}
</style>
