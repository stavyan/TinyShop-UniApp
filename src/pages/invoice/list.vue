<template>
	<view class="content b-t">
		<view  v-if="invoiceList.length > 0">
			<view class="list b-b" v-for="(item, index) in invoiceList" :key="index" @click="navTo(item.order_id)">
				<view class="wrapper">
					<view class="address-box">
						<view class="order-fl">
							订单编号: <text class="order-sn">{{item.order_sn}}</text>
						</view>
						<view class="order-wrapper">
							<text class="address">{{item.title}}</text>
							<text class="address">开票金额: {{item.tax_money}}</text>
						</view>
					</view>
					<view class="u-box">
						<view>
							<text class="name">{{ parseInt(item.type, 10) === 1 ? '公司' : '个人' }}</text>
							<text class="mobile">{{ item.duty_paragraph || '个人发票无税号' }}</text>
						</view>
						<text class="time">{{item.created_at | time}}</text>
					</view>

				</view>
			</view>
			<uni-load-more :status="loadingType" />
		</view>
		<empty :info="'您还未购买任何商品~'" v-else></empty>
	</view>
</template>

<script>
	import {orderInvoiceList} from "../../api/userInfo";
	import moment from 'moment';
	import uniLoadMore from '@/components/uni-load-more/uni-load-more';
	import empty from "@/components/empty";
	export default {
		components: {
			uniLoadMore,
			empty
		},
		data() {
			return {
				timeOutEvent: 0,
				source: 0,
				page: 1,
				loadingType: 'more',
				invoiceList: []
			}
		},
		filters: {
			time(val) {
				return moment(val * 1000).format('YYYY-MM-DD HH:mm:ss')
			}
		},
		onLoad(option){
			this.source = option.source;
			this.initData()
		},
		//下拉刷新
		onPullDownRefresh(){
			this.page = 1;
			this.invoiceList = [];
			this.getInvoiceList('refresh');
		},
		//加载更多
		onReachBottom(){
			this.page ++;
			this.getInvoiceList();
		},
		methods: {
			/**
			 *@des 初始化数据
			 *@author stav stavyan@qq.com
			 *@blog https://stavtop.club
			 *@date 2019/11/18 09:57:30
			 */
			initData () {
				this.getInvoiceList();
			},
			/**
			 *@des 获取收货地址列表
			 *@author stav stavyan@qq.com
			 *@blog https://stavtop.club
			 *@date 2019/11/18 09:58:15
			 */
			async getInvoiceList (type) {
				uni.showLoading({title:'加载中...'});
				await this.$get(`${orderInvoiceList}`,{
					page: this.page
				}).then(r=>{
					if (type === 'refresh') {
						uni.stopPullDownRefresh();
					}
					if (r.code === 200) {
						this.loadingType = r.data.length === 10 ? 'more' : 'nomore';
						this.invoiceList = [...this.invoiceList, ...r.data];
					}else {
						uni.showToast({ title: r.message, icon: "none" });
					}
				}).catch(err => {
					console.log(err)
				})
			},
			navTo(id){
				uni.navigateTo({
					url: `/pages/order/detail?id=${id}`
				})
			}
		}
	}
</script>

<style lang='scss'>
	page{
		padding-bottom: 20upx;
	}
	.content{
		position: relative;
	}
	.list{
		display: flex;
		align-items: center;
		padding: 20upx 30upx;;
		background: #fff;
		position: relative;
	}
	.wrapper{
		display: flex;
		flex-direction: column;
		flex: 1;
	}
	.address-box{
		.order-fl {
			font-size: $font-sm;
			margin-bottom: 10upx;
			.order-sn {
				margin-left: 14upx;
				color: $base-color;
			}
		}
		.order-wrapper {
			display: flex;
			justify-content: space-between;
		}
		.tag{
			font-size: 24upx;
			color: $base-color;
			margin-right: 10upx;
			background: #fffafb;
			border: 1px solid #ffb4c7;
			border-radius: 4upx;
			padding: 4upx 10upx;
			line-height: 1;
		}
		.address{
			font-size: $font-base;
			color: $font-color-dark;
		}
	}
	.u-box{
		font-size: 28upx;
		color: $font-color-light;
		margin-top: 16upx;
		display: flex;
		justify-content: space-between;
		.name{
			margin-right: 30upx;
		}
		.time {
			font-size: $font-sm + 2upx;
		}
	}
	.icon-bianji{
		display: flex;
		align-items: center;
		height: 80upx;
		font-size: 40upx;
		color: $font-color-light;
		padding-left: 30upx;
	}

	.add-btn{
		position: fixed;
		left: 30upx;
		right: 30upx;
		bottom: 16upx;
		z-index: 95;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		font-size: 32upx;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}
	.tips {
		display:block;
		padding: 16upx 30upx 10upx;
		color: #fa436a;
		font-size: 24upx;
	}
</style>
