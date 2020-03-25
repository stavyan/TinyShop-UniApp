<template>
	<view class="rf-floor-index">
		<view class="f-header">
      <view class="line"></view>
      <text class="name">为你推荐</text>
      <view class="line"></view>
    </view>
		<view class="rf-product-list">
			<view
				v-for="(item, index) in (guessYouLikeList.length > 0 ? guessYouLikeList : [0, 0, 0, 0, 0, 0])" :key="index"
				class="product-item"
				@tap="navTo(item === 0 ? '' : item.id)"
			>
				<view class="image-wrapper">
					<image :src="item.picture" mode="aspectFill"></image>
					 <text class="sketch">{{ item.sketch }}</text>
				</view>
				<text class="title clamp in2line" v-if="item.name">{{item.name}}</text>
				<view class="last-line" v-if="item.name">
					<text class="price in1line">{{item.price}}
						<text class="m-price" v-if="item.market_price > item.price">¥ {{ item.market_price }}</text>
					</text>
					<text class="sales in1line"><text class="red">{{ item.sales }}</text>付款</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>/**
 *@des 首页楼层组件
 *@author stav stavyan@qq.com
 *@blog https://stavtop.club
 *@date 2020/01/08 11:28:39
 */
import {guessYouLikeList} from "@/api/product";
export default {
	name: 'rfRecommend',
	props: {
	  list: {
      type: Array,
      default () {
        return [{}, {}]
      }
    }
	},
	data() {
		return {
		  guessYouLikeList: []
		}
	},
  mounted () {
	  this.initData();
  },
	methods: {
	  initData() {
	    if (this.list.length === 0) {
	      this.getGuessYouLikeList();
      } else {
        this.guessYouLikeList = this.list;
      }
    },
    async getGuessYouLikeList() {
      await this.$get(`${guessYouLikeList}`, {
        page: this.page
      }).then(r => {
        this.guessYouLikeList = r.data
      }).catch(err => {
        console.log(err);
      });
    },
    navTo (id) {
	  	if (!id) return;
	  	uni.navigateTo({
			  url: `/pages/product/product?id=${id} `
		  })
    },
	}
}
</script>
<style scoped lang="scss">
.rf-floor-index {
	.banner {
		width: 92%;
		margin: 20upx 4% 0;
		image {
			width: 100%;
			height: 25vw;
			border-radius: 20upx;
			box-shadow: 0upx 5upx 25upx rgba(0, 0, 0, 0.05);
		}
	}
	.f-header{
		display:flex;
		align-items:center;
    justify-content: center;
    padding: 40upx 20% 20upx;
    .line {
      border-bottom: 1upx solid rgba(0, 0, 0, 0.15); // 边框
      width: 120upx;
    }
    .name {
      margin: 0 20upx;
    }
	}
	.hot-floor{
		width: 100%;
		overflow: hidden;
		margin-bottom: 20upx;
		.floor-img-box{
			width: 100%;
			height:320upx;
			position:relative;
			&:after{
				content: '';
				position:absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				background: linear-gradient(rgba(255,255,255,.06) 30%, #f8f8f8);
			}
		}
		.floor-img{
			width: 100%;
			height: 100%;
		}
		.floor-list{
			white-space: nowrap;
			padding: 20upx;
			padding-right: 50upx;
			border-radius: 6upx;
			margin-top:-140upx;
			margin-left: 30upx;
			background: #fff;
			box-shadow: 1px 1px 5px rgba(0,0,0,.2);
			position: relative;
			z-index: 1;
		}
		.scoll-wrapper{
			display:flex;
			align-items: flex-start;
		}
		.floor-item{
			width: 180upx;
			margin-right: 20upx;
			font-size: $font-sm+2upx;
			color: $font-color-dark;
			line-height: 1.8;
			image{
				width: 180upx;
				height: 180upx;
				border-radius: 6upx;
			}
			.price{
				color: $uni-color-primary;
			}
		}
		.more{
			display:flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			flex-shrink: 0;
			width: 180upx;
			height: 180upx;
			border-radius: 6upx;
			background: #f3f3f3;
			font-size: $font-base;
			color: $font-color-light;
			text:first-child{
				margin-bottom: 4upx;
			}
		}
	}
}
</style>
