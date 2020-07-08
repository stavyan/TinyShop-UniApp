<template>
  <view class="home">
    <view class="homeCon" :class="!homeActive ? 'on' : ''">
      <text class="yticon icon-xiatubiao--copy" @tap="navTo('/pages/index/index')"></text>
      <text class="yticon icon-gouwuche" @tap="navTo('/pages/cart/cart')"></text>
      <text class="yticon icon-shoucang" @tap="navTo('/pages/profile/profile')"></text>
    </view>
    <view class="picture" @tap.stop="open">
      <image
          :src="
          homeActive
            ? require('@/static/close.gif')
            : require('@/static/open.gif')
        "
          class="image"
      />
    </view>
  </view>
</template>
<script>
export default {
  name: 'Home',
  data () {
    return {
      homeActive: true
    };
  },
  methods: {
    open() {
      this.homeActive = !this.homeActive;
    },
    navTo (url) {
      uni.reLaunch({ url });
    }
  }
};
</script>
<style scoped lang="scss">
  .home {
    position: fixed;
    top: 50%;
    color: white;
    text-align: center;
    z-index: 33;
    right: 10upx;
  }

  .home .homeCon {
    overflow: hidden;
    width: 0.86rem;
    border-radius: 0.5rem;
    transition: all 0.3s ease-in-out 0s;
    opacity: 0;
    transform: scale(0);
    height: 0;
    color: #e93323;
  }

  .home .on {
    opacity: 1;
    transform: scale(1);
    height: 210upx;
    width: 80upx;
    background: #f23f23;
    margin-bottom: 20upx;
    color: #fff;
    .yticon {
      display: block;
      height: 70upx;
      line-height: 70upx;
      font-size: $font-lg;
      text-align: center;
    }
  }

  .home .picture {
    width: 72upx;
    height: 72upx;
    border-radius: 50%;
    .image {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
</style>
