<script>
	import Vue from 'vue'
  import {websocketUrl} from "@/api/params";
	export default {
		onLaunch () {
			uni.getSystemInfo({
				success (e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif
					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.top - e.statusBarHeight;
					// #endif
					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			});
      if (!uni.getStorageSync('accessToken')) {
        uni.removeTabBarBadge({
          index: 2
        });
      } else {
          if(uni.getStorageSync('cartNum') == 0) {
            uni.removeTabBarBadge({
              index: 2
            });
          } else {
             uni.setTabBarBadge({
              index: 2,
              text: uni.getStorageSync('cartNum').toString()
            });
          }
      }
		},
		onHide () {
		},
    methods: {
    }
	}
</script>

<style lang='scss'>
  /*@import "@/common/css/reset";*/
  /*@import "@/common/css/uni";*/

</style>
