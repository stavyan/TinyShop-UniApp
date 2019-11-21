<template>
	<view class="content b-t">
		<view class="mask-content">
				<!-- 优惠券页面，仿mt -->
				<view class="coupon-item" v-for="(item,index) in couponList" :key="index">
					<view class="con">
						<view class="left" @click="getCoupon(item.id)">
							<text class="title">{{item.title}}</text>
							<text class="time">有效期 {{ item.start_time | time }} - {{ item.end_time | time }}</text>
						</view>
						<view class="right">
							<text class="price">{{item.money}}</text>
							<text>满{{ item.at_least }}可用</text>
						</view>

						<view class="circle l"></view>
						<view class="circle r"></view>
					</view>
					<view class="tips">
							<text v-show="item.range_type && item.max_fetch">
								{{ parseInt(item.range_type, 10) === 0 ? '部分产品使用' : '全场产品使用' }}  领取上限{{item.max_fetch}}
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
		<view class="coupon-bottom-nav" v-show="parseInt(type, 10) === 1">
			<text class="coupon-bottom-btn" @click="navTo('/pages/user/history-coupon')">优惠券历史记录<text class="yticon icon-you right" size="20"/></text>
			<text class="coupon-bottom-btn" @click="navTo('/pages/user/coupon')">去领券中心<text class="yticon icon-you right" size="20"/></text>
		</view>
	</view>
</template>

<script>
	import {couponList, couponReceive, myCouponList} from "../../api/userInfo";
	export default {
		data() {
			return {
				couponList: [],
				type: null,
				token: null
			}
		},
		filters: {
			time(val) {
				return moment(val * 1000).format('YY/MM/DD HH:mm')
			}
		},
		onLoad(options){
			this.initData(options.type);
		},
		methods: {
			/**
			 *@des 初始化数据
			 *@author stav stavyan@qq.com
			 *@blog https://stavtop.club
			 *@date 2019/11/18 09:57:30
			 */
			initData (type) {
			this.type = type;
			uni.setNavigationBarTitle({
				title: parseInt(this.type, 10) === 1 ? '我的优惠券' : '领券中心'
			})
				this.token = uni.getStorageSync('accessToken') || undefined;
				if (this.token) {
					if (type) {
						this.getMyCouponList();
					} else {
						this.getCouponList();
					}
				}
			},
			/**
			 *@des 统一跳转接口
			 *@author stav stavyan@qq.com
			 *@blog https://stavtop.club
			 *@date 2019/11/21 15:41:30
			 *@param url 跳转地址
			 */
			navTo(url){
				if(!this.token){
					url = '/pages/public/login';
				}
				if (url === 'login') {
					 return
				} else {
					uni.navigateTo({
						url
					})
				}
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
			},
			/**
			 *@des 获取我的收货地址列表
			 *@author stav stavyan@qq.com
			 *@blog https://stavtop.club
			 *@date 2019/11/20 18:16:58
			 */
			async getMyCouponList () {
				uni.showLoading({title:'加载中...'});
				await this.$get(`${myCouponList}`).then(r=>{
					if (r.code === 200) {
						this.couponList = r.data
					} else {
						uni.showToast({ title: r.message, icon: "none" });
					}
				}).catch(err => {
					console.log(err)
				})
			},
			async getCoupon(id) {
				if (this.type) return;
				uni.showLoading({title: '正在领取优惠券...'});
				await this.$post(`${couponReceive}`, {
					id
				}).then(r => {
					if (r.code === 200) {
						this.getCouponList();
						uni.showToast({title: '领取成功', icon: "none"});
					} else {
						uni.showToast({title: r.message, icon: "none"});
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
	.coupon-bottom-nav {
		background: #fff;
		height: 100upx;
		line-height: 60upx;
		position: fixed;
		overflow: hidden;
		bottom: 0;
		padding: 30upx 0 10upx;
		display: flex;
		width: 100%;
		.coupon-bottom-btn {
			text-align: center;
			color: $font-color-dark;
			font-size: $font-lg - 2upx;
			flex: 1;
			.right {
				font-size: $font-color-light;
				margin-left: 8upx;
			}
		}
		.coupon-bottom-btn:first-child {
			border-right: 1px solid rgba(0, 0, 0, 0.12); // 边框
		}
	}
</style>
