<template>
	<view class="content b-t">
		<view class="mask-content">
				<!-- 优惠券页面，仿mt -->
				<view class="coupon-item" v-for="(item,index) in couponList" :key="index">
					<view class="con">
						<view class="left">
							<text class="title">{{item.title}}</text>
							<text class="time">有效期{{ item.start_time }} - {{ item.end_time }}</text>
						</view>
						<view class="right">
							<text class="price">{{item.money}}</text>
							<text>满{{ item.at_least }}可用</text>
						</view>

						<view class="circle l"></view>
						<view class="circle r"></view>
					</view>
					<view class="tips">
							<text>
								{{ parseInt(item.range_type, 10) === 0 ? '部分产品使用' : '全场产品使用' }}
							</text>
						 	<text>
								{{ parseInt(item.term_of_validity_type, 10) === 0 ? '固定时间' : '领取之日起' }}生效
							</text>
					</view>
				</view>
				<!--<view class="coupon-none" v-show="couponList.length === 0">-->
					<!--暂无优惠券-->
				<!--</view>-->
			</view>
	</view>
</template>

<script>
	import {couponList} from "../../api/userInfo";
	export default {
		data() {
			return {
				couponList: []
			}
		},
		onLoad(){
			this.initData()
		},
		methods: {
			/**
			 *@des 初始化数据
			 *@author stav stavyan@qq.com
			 *@blog https://stavtop.club
			 *@date 2019/11/18 09:57:30
			 */
			initData () {
				this.getCouponList();
			},
			/**
			 *@des 获取收货地址列表
			 *@author stav stavyan@qq.com
			 *@blog https://stavtop.club
			 *@date 2019/11/18 09:58:15
			 */
			async getCouponList () {
				uni.showLoading({title:'加载中...'});
				await this.$get(`${couponList}`).then(r=>{
					if (r.code === 200) {
						this.couponList = r.data
					} else {
						uni.showToast({ title: r.message, icon: "none" });
					}
				}).catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style lang='scss'>
	page{
		padding-bottom: 120upx;
		background: #f3f3f3;
	}
	.mask-content{
			width: 100%;
			transition: .3s;
			overflow-y:scroll;
			.coupon-item{
		display: flex;
		flex-direction: column;
		margin: 20upx 24upx;
		background: #fff;
		.con{
			display: flex;
			align-items: center;
			position: relative;
			height: 120upx;
			padding: 0 30upx;
			&:after{
				position: absolute;
				left: 0;
				bottom: 0;
				content: '';
				width: 100%;
				height: 0;
				border-bottom: 1px dashed #f3f3f3;
				transform: scaleY(50%);
			}
		}
		.left{
			display: flex;
			flex-direction: column;
			justify-content: center;
			flex: 1;
			overflow: hidden;
			height: 100upx;
		}
		.title{
			font-size: 32upx;
			color: $font-color-dark;
			margin-bottom: 10upx;
		}
		.time{
			font-size: 24upx;
			color: $font-color-light;
		}
		.right{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 26upx;
			color: $font-color-base;
			height: 100upx;
		}
		.price{
			font-size: 44upx;
			color: $base-color;
			&:before{
				content: '￥';
				font-size: 34upx;
			}
		}
		.tips{
			font-size: 24upx;
			color: $font-color-light;
			line-height: 60upx;
			padding-left: 30upx;
			overflow: hidden;
			display:inline-flex;
			justify-content: space-between;
			margin-right: 30upx;
		}
		.circle{
			position: absolute;
			left: -6upx;
			bottom: -10upx;
			z-index: 10;
			width: 20upx;
			height: 20upx;
			background: #f3f3f3;
			border-radius: 100px;
			&.r{
				left: auto;
				right: -6upx;
			}
		}
	}
		}
	.coupon-none {
		text-align: center;
		font-size: $font-color-base;
		margin: 40upx 0;
	}
</style>
