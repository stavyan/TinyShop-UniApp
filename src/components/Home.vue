<template>
  <view class="home">
    <view class="homeCon" :class="!homeActive ? 'on' : ''">
      <text class="btn">主页</text>
      <text class="btn">购物车</text>
      <text class="btn">个人中心</text>
    </view>
    <view class="picture" @click.stop="open">
      <image
          :src="
          homeActive
            ? require('../static/close.gif')
            : require('../static/open.gif')
        "
          class="image"
      />
    </view>
  </view>
</template>
<script>
// import { mapGetters } from "vuex";
export default {
    name: "Home",
    props: {},
    data: function () {
        return {
            homeActive: true
        };
    },
    methods: {
        open() {
            this.homeActive = !this.homeActive;
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
    height: 180upx;
    padding: 20upx 0;
    width: 80upx;
    margin-bottom: 10upx;
    font-size: $font-sm;
    color: #000;
    .btn {
      display: block;
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
