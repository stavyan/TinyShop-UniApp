<template>
	<view class="content">
		<view class="navbar">
			<view
				v-for="(item, index) in navList" :key="index"
				class="nav-item"
				:class="{current: tabCurrentIndex === index}"
				@click="tabClick(index)"
			>
				{{item.text}}
			</view>
		</view>
		<swiper :current="tabCurrentIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item class="tab-content" v-for="(tabItem,tabIndex) in navList" :key="tabIndex">
				<scroll-view
					class="list-scroll-content mask-content"
					scroll-y
					@scrolltolower="loadData"
				>
					<!-- 空白页 -->
					<empty v-if="couponList.length === 0"></empty>
					<!-- 订单列表 -->
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
					<uni-load-more :status="loadingType"></uni-load-more>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import {couponList, couponReceive, myCouponList} from "../../api/userInfo";
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import empty from "@/components/empty";
	import uniCountDown from '@/components/uni-count-down/uni-count-down.vue'
	export default {
		components: {
			uniLoadMore,
			empty,
			uniCountDown
		},
		data() {
			return {
				couponList: [],
				state: 2,
				token: null,
				tabCurrentIndex: 0,
				loadingType: 'more',
				navList: [
					{
						state: 2,
						text: '已使用',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 3,
						text: '已过期',
						loadingType: 'more',
						orderList: []
					}
				],
				page: 1
			}
		},
		filters: {
			time(val) {
				return moment(val * 1000).format('YY/MM/DD HH:mm')
			}
		},
		onLoad(){
			this.initData();
		},
		onPageScroll(e){
			// //兼容iOS端下拉时顶部漂移
			// if(e.scrollTop>=0){
			// 	this.headerPosition = "fixed";
			// }else{
			// 	this.headerPosition = "absolute";
			// }
		},
		//下拉刷新
		onPullDownRefresh(){
			this.page = 1;
			this.couponList = [];
			this.getMyCouponList('refresh');
		},
		//加载更多
		onReachBottom(){
			this.page ++;
			this.getMyCouponList();
		},
		methods: {
			/**
			 *@des 切换tab
			 *@author stav stavyan@qq.com
			 *@blog https://stavtop.club
			 *@date 2019/11/21 16:11:55
			 *@param e
			 */
			changeTab(e){
				this.tabCurrentIndex = e.target.current;
				this.state = this.navList[this.tabCurrentIndex].state;
				this.getMyCouponList();
			},
			/**
			 *@des 顶部tab点击
			 *@author stav stavyan@qq.com
			 *@blog https://stavtop.club
			 *@date 2019/11/21 16:12:40
			 *@param index tab序号
			 */
			tabClick(index){
				this.couponList = [];
				this.tabCurrentIndex = index;
				this.state = this.navList[this.tabCurrentIndex].state;
				this.getMyCouponList();
			},
			/**
			 *@des 初始化数据
			 *@author stav stavyan@qq.com
			 *@blog https://stavtop.club
			 *@date 2019/11/18 09:57:30
			 */
			initData () {
				this.token = uni.getStorageSync('accessToken') || undefined;
				if (this.token) {
					this.getMyCouponList();
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
			 *@des 获取我的收货地址列表
			 *@author stav stavyan@qq.com
			 *@blog https://stavtop.club
			 *@date 2019/11/20 18:16:58
			 */
			async getMyCouponList (type) {
				uni.showLoading({title:'加载中...'});
				await this.$get(`${myCouponList}`, {
					page: this.page,
					state: this.state
				}).then(r=>{
					if (type === 'refresh') {
						uni.stopPullDownRefresh();
					}
					if (r.code === 200) {
						this.loadingType  = r.data.length === 10 ? 'more' : 'nomore';
						this.couponList = [ ...this.couponList, ...r.data ];
					} else {
						uni.showToast({ title: r.message, icon: "none" });
					}
				}).catch(err => {
					if (type === 'refresh') {
						uni.stopPullDownRefresh();
					}
					console.log(err)
				})
			}
		}
	}
</script>
<style lang='scss'>
	page, .content{
		background: $page-color-base;
		height: 100%;
	}

	.swiper-box{
		height: calc(100% - 40px);
	}
	.list-scroll-content{
		height: 100%;
	}

	.navbar{
		display: flex;
		height: 40px;
		padding: 0 5px;
		background: #fff;
		box-shadow: 0 1px 5px rgba(0,0,0,.06);
		position: relative;
		z-index: 10;
		.nav-item{
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 15px;
			color: $font-color-dark;
			position: relative;
			&.current{
				color: $base-color;
				&:after{
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 44px;
					height: 0;
					border-bottom: 2px solid $base-color;
				}
			}
		}
	}

	.uni-swiper-item{
		height: auto;
	}
	.order-item{
		display: flex;
		flex-direction: column;
		padding-left: 30upx;
		background: #fff;
		margin-top: 16upx;
		.i-top{
			display: flex;
			align-items: center;
			height: 80upx;
			padding-right:30upx;
			font-size: $font-base;
			color: $font-color-dark;
			position: relative;
			.time{
				flex: 1;
			}
			.state{
				color: $base-color;
			}
			.del-btn{
				padding: 10upx 0 10upx 36upx;
				font-size: $font-lg;
				color: $font-color-light;
				position: relative;
				&:after{
					content: '';
					width: 0;
					height: 30upx;
					border-left: 1px solid $border-color-dark;
					position: absolute;
					left: 20upx;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}
		/* 多条商品 */
		.goods-box{
			height: 160upx;
			padding: 20upx 0;
			white-space: nowrap;
			.goods-item{
				width: 120upx;
				height: 120upx;
				display: inline-block;
				margin-right: 24upx;
			}
			.goods-img{
				display: block;
				width: 100%;
				height: 100%;
			}
		}
		/* 单条商品 */
		.goods-box-single{
			display: flex;
			padding: 20upx 0;
			.goods-img{
				display: block;
				width: 120upx;
				height: 120upx;
			}
			.right{
				flex: 1;
				display: flex;
				flex-direction: column;
				padding: 0 30upx 0 24upx;
				overflow: hidden;
				.title{
					font-size: $font-base + 2upx;
					color: $font-color-dark;
					line-height: 1;
				}
				.attr-box{
					font-size: $font-sm + 2upx;
					color: $font-color-light;
					padding: 10upx 12upx;
				}
				.price{
					font-size: $font-base + 2upx;
					color: $font-color-dark;
					&:before{
						content: '￥';
						font-size: $font-sm;
						margin: 0 2upx 0 8upx;
					}
				}
			}
		}

		.price-box{
			display: flex;
			justify-content: flex-end;
			align-items: baseline;
			padding: 20upx 30upx;
			font-size: $font-sm + 2upx;
			color: $font-color-light;
			.num{
				margin: 0 8upx;
				color: $font-color-dark;
			}
			.price{
				font-size: $font-lg;
				color: $font-color-dark;
				&:before{
					content: '￥';
					font-size: $font-sm;
					margin: 0 2upx 0 8upx;
				}
			}
		}
		.action-box{
			display: flex;
			justify-content: flex-end;
			align-items: center;
			height: 100upx;
			position: relative;
			padding-right: 30upx;
		}
		.action-btn{
			width: 160upx;
			height: 60upx;
			margin: 0;
			margin-left: 24upx;
			padding: 0;
			text-align: center;
			line-height: 60upx;
			font-size: $font-sm + 2upx;
			color: $font-color-dark;
			background: #fff;
			border-radius: 100px;
			&:after{
				border-radius: 100px;
			}
			&.recom{
				background: #fff9f9;
				color: $base-color;
				&:after{
					border-color: #f7bcc8;
				}
			}
		}
	}


	/* load-more */
	.uni-load-more {
		display: flex;
		flex-direction: row;
		height: 80upx;
		align-items: center;
		justify-content: center
	}

	.uni-load-more__text {
		font-size: 28upx;
		color: #999
	}

	.uni-load-more__img {
		height: 24px;
		width: 24px;
		margin-right: 10px
	}

	.uni-load-more__img>view {
		position: absolute
	}

	.uni-load-more__img>view view {
		width: 6px;
		height: 2px;
		border-top-left-radius: 1px;
		border-bottom-left-radius: 1px;
		background: #999;
		position: absolute;
		opacity: .2;
		transform-origin: 50%;
		animation: load 1.56s ease infinite
	}

	.uni-load-more__img>view view:nth-child(1) {
		transform: rotate(90deg);
		top: 2px;
		left: 9px
	}

	.uni-load-more__img>view view:nth-child(2) {
		transform: rotate(180deg);
		top: 11px;
		right: 0
	}

	.uni-load-more__img>view view:nth-child(3) {
		transform: rotate(270deg);
		bottom: 2px;
		left: 9px
	}

	.uni-load-more__img>view view:nth-child(4) {
		top: 11px;
		left: 0
	}

	.load1,
	.load2,
	.load3 {
		height: 24px;
		width: 24px
	}

	.load2 {
		transform: rotate(30deg)
	}

	.load3 {
		transform: rotate(60deg)
	}

	.load1 view:nth-child(1) {
		animation-delay: 0s
	}

	.load2 view:nth-child(1) {
		animation-delay: .13s
	}

	.load3 view:nth-child(1) {
		animation-delay: .26s
	}

	.load1 view:nth-child(2) {
		animation-delay: .39s
	}

	.load2 view:nth-child(2) {
		animation-delay: .52s
	}

	.load3 view:nth-child(2) {
		animation-delay: .65s
	}

	.load1 view:nth-child(3) {
		animation-delay: .78s
	}

	.load2 view:nth-child(3) {
		animation-delay: .91s
	}

	.load3 view:nth-child(3) {
		animation-delay: 1.04s
	}

	.load1 view:nth-child(4) {
		animation-delay: 1.17s
	}

	.load2 view:nth-child(4) {
		animation-delay: 1.3s
	}

	.load3 view:nth-child(4) {
		animation-delay: 1.43s
	}

	@-webkit-keyframes load {
		0% {
			opacity: 1
		}

		100% {
			opacity: .2
		}
	}
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
</style>
