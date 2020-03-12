<template>
	<view class="rf-floor-index">
		<!--广告图-->
		<view class="banner" v-show="bannerShow"
		      @tap="toBanner(banner.jump_type, banner.jump_link)"
		      >
		      <!--@tap="indexTopToDetailPage(banner.jump_type, banner.jump_link)"-->
			<image :src="banner.cover" mode="aspectFill" />
		</view>
		<!--列表-->
		<view class="f-header" @tap="toList">
			<i class="iconfont icontuijian" />
			<view class="tit-box">
				<text class="tit">{{ header.title }}</text>
				<text class="tit2">{{ header.desc }}</text>
			</view>
			<text class="yticon icon-you"></text>
		</view>
		<view class="guess-section">
			<view
				v-for="(item, index) in list" :key="index"
				class="guess-item"
				@tap="detail(item.id)"
			>
				<view class="image-wrapper">
					<image :src="item.picture" mode="aspectFill"></image>
					 <text class="sketch">{{ item.sketch }}</text>
				</view>
				<text class="title clamp in2line">{{item.name}}</text>
				<view class="last-line">
					<text class="price in1line">{{item.price}}
						<text class="m-price" v-if="item.market_price > item.price">¥ {{ item.market_price }}</text>
					</text>
					<text class="sales in1line"><text class="red">{{ item.sales }}</text>付款</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
/**
 *@des 首页楼层组件
 *@author stav stavyan@qq.com
 *@blog https://stavtop.club
 *@date 2020/01/08 11:28:39
 */
export default {
	name: 'rfFloorIndex',
	props: {
		list: {
			type: Array,
			default () {
				return []
			}
		},
		banner: {
			type: Object,
			default () {
				return {}
			}
		},
		header: {
			type: Object,
			default () {
				return {}
			}
		},
		bannerShow: {
			type: Boolean,
			default: true
		},
	},
	data() {
		return {
		}
	},
	methods: {
    detail (id) {
      this.$emit('detail',{
        id
      });
    },
    toBanner (type, id) {
      this.$emit('toBanner',{
        type,
        id
      });
    },
    toList () {
      this.$emit('toList');
    }
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
		height: 140upx;
		padding: 6upx 30upx 8upx;
		background: #fff;
		.iconfont {
			color: $base-color;
			font-size: $font-lg + 30upx;
			margin-right: 20upx;
		}
		.tit-box{
			flex: 1;
			display: flex;
			flex-direction: column;
		}
		.tit{
			font-size: $font-lg +2upx;
			color: #font-color-dark;
			line-height: 1.3;
		}
		.tit2{
			font-size: $font-sm;
			color: $font-color-light;
		}
		.icon-you{
			font-size: $font-lg +2upx;
			color: $font-color-light;
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
	.guess-section{
		display:flex;
		flex-wrap:wrap;
		padding: 0 30upx;
		background: #fff;
		.guess-item{
			display:flex;
			flex-direction: column;
			width: 48%;
			padding-bottom: 40upx;
			&:nth-child(2n+1){
				margin-right: 4%;
			}
		}
		.image-wrapper{
			width: 100%;
			height: 330upx;
			border-radius: 3px;
			overflow: hidden;
			position: relative;
			image{
				width: 100%;
				height: 100%;
				opacity: 1;
			}
			.sketch {
				background-color: rgba(0, 0, 0, 0.4);
				position: absolute;
				bottom: 4upx;
				padding: 0 8upx;
				right: 0;
				color: #fff;
				font-size: $font-sm;
			}
		}
		.title{
			font-size: $font-base;
			color: $font-color-dark;
			line-height: 40upx;
			height: 80upx;
		}
		.last-line {
			display: flex;
			justify-content: space-between;
	    align-items: center; 		/* 垂直居中 */
			.red {
				color: $base-color;
				font-size: $font-sm + 2upx;
				margin-right: 2upx;
			}
			.sales {
				font-size: $font-sm + 2upx;
			}
		}
		.price{
			font-size: $font-base;
			color: $uni-color-primary;
			line-height: 1;
			&:before{
				content: '￥';
				font-size: 26upx;
			}
			.m-price{
				margin-left: 4upx;
				color: $font-color-light;
				font-size: $font-sm;
				text-decoration: line-through;
			}
		}
	}
}
</style>
