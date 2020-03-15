<script>
	/**
	 * vuex管理登陆状态，具体可以参考官方登陆模板示例
	 */
	import {
		mapMutations
	} from 'vuex';
	export default {
		methods: {
			...mapMutations(['login'])
		},
		onLaunch () {
      if (!uni.getStorageSync('accessToken')) {
        uni.removeTabBarBadge({
          index: 2
        });
      } else {
         uni.setTabBarBadge({
          index: 2,
          text: uni.getStorageSync('cartNum').toString()
        });
      }
		},
		onHide () {
		},
	}
</script>

<style lang='scss'>
  /*@import "@/common/css/reset";*/
  /*@import "@/common/css/uni";*/
</style>
