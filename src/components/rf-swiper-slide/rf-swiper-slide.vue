<template>
	<view class="rf-swiper-slide" v-if="list.length > 0">
		<slot name="header"></slot>
		<!--<view class="pictrue"><img width="52" src="./img/news.png" /></view>-->
		<swiper class="rf-swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" vertical="true">
        <swiper-item
		        class="rf-swiper-item"
		        @tap.stop="navTo(`/pages/notice/notice`)"
						v-for="(item, index) in list"
						:key="index">
          <view class="text in1line">
						<text class="newsTitle">{{ item.title || `${item.member_nickname} 拼团成功` }}</text>
					</view>
			    <uni-icons class="right" size="18" type="forward"></uni-icons>
        </swiper-item>
    </swiper>
	</view>
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue';
  export default {
    name: 'rf-swiper-slide',
		  components: {
    	uniIcons
		},
	  data () {
      return {
        indicatorDots: false,
        autoplay: true,
        interval: 2000,
        duration: 500
      }
	  },
    props: {
		  list: {
	      type: Array,
	      default () {
	        return []
	      }
	    }
    },
	  methods: {
    	navTo(url) {
    		uni.navigateTo({
			    url
		    })
	    },
	  },
  }
</script>

<style scoped lang="scss">
.rf-swiper-slide {
	background-color: #fff;
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 80upx;
	padding: 0 30upx;
	border-bottom: solid 2upx #f6f6f6;
	.rf-swiper {
		height: 100%;
		flex: 1;
		margin-left: 30upx;
		.rf-swiper-item {
			display: flex;
			justify-content: space-between;
			.text, .right {
				height: 80upx;
				line-height: 80upx;
			}
		}
	}
}
</style>
