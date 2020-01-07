<template>
	<view class="content b-t">
		<view class="total">
			您现在拥有<text class="total-num">{{ integralList[0].new_num }}</text> {{ type ? '元' : '积分' }}
		</view>
		<view class="list b-b" v-for="(item, index) in integralList" :key="index" @click="checkAddress(item)">
			<view class="wrapper">
				<view class="address-box">
					{{item.remark }}
				</view>
				<view class="u-box">
					{{item.created_at | time}}
				</view>
			</view>
			<text class="change-num" :class="parseFloat(item.num) >= 0 ? 'change-num-add' : 'change-num-reduce'">{{item.num | numFilter }}</text>
		</view>
		<uni-load-more :status="loadingType"></uni-load-more>
		<empty :info="'暂无积分记录'" v-if="integralList.length === 0"></empty>
		<!--<button class="add-btn" @click="addAddress('add')">新增地址</button>-->
	</view>
</template>

<script>
	import {creditsLogList} from "../../api/userInfo";
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import empty from "@/components/empty";
	import moment from 'moment';
	export default {
		components: {
			uniLoadMore,
			empty
		},
		data() {
			return {
				integralList: [],
				loadingType: 'more',
				page: 0,
				type: null
			}
		},
		onLoad(options){
			this.type = options.type;
			this.initData();
		},
		filters: {
			time(val) {
				return moment(val * 1000).format('YYYY-MM-DD HH:mm:ss')
			},
			numFilter(val) {
				return val >= 0 ? `+${val.toString()}` : val;
			}
		},
		//下拉刷新
		onPullDownRefresh(){
			this.page = 1;
			this.integralList = [];
			this.getIntegralListList('refresh');
		},
		//加载更多
		onReachBottom(){
			this.page ++;
			this.getIntegralListList();
		},
		methods: {
			initData () {
				let title = '积分记录';
				if(parseInt(this.type, 10) === 1){
					title = '余额记录'
				}
				uni.setNavigationBarTitle({
					title
				})
				this.getIntegralListList();
			},
			async getIntegralListList (type) {
				uni.showLoading({title:'加载中...'});
				const params = {};
				if (this.type) {
					params.credit_type = 1
				}
				params.page = this.page;
				await this.$get(`${creditsLogList}`, {
					...params
				}).then(r=>{
					if (type === 'refresh') {
						uni.stopPullDownRefresh();
					}
					if (r.code === 200) {
						this.loadingType  = r.data.length === 10 ? 'more' : 'nomore';
						this.integralList = [ ...this.integralList, ...r.data ]
					} else {
						uni.showToast({ title: r.message, icon: "none" });
					}
				}).catch(err => {
					console.log(err)
				})
			},
			//选择地址
			checkAddress(item){
				if(this.source == 1){
					//this.$api.prePage()获取上一页实例，在App.vue定义
					this.$api.prePage().addressData = item;
					uni.navigateBack()
				}
			},
			addAddress(type, item){
				uni.navigateTo({
					url: `/pages/address/addressManage?type=${type}&id=${item && item.id || undefined}`
				})
			},
		}
	}
</script>

<style lang='scss'>
	page{
	}
	.total {
		margin-left: 32upx;
		.total-num {
			margin: 0 12upx;
			font-size: $font-lg + 12upx;
			color: $base-color;
		}
	}
	.list{
		display: flex;
		align-items: center;
		padding: 20upx 30upx;;
		background: #fff;
		position: relative;
		.wrapper{
			display: flex;
			flex-direction: column;
			flex: 1;
			.address-box{
				display: flex;
				align-items: center;
				font-size: 30upx + 2upx;
				color: $font-color-dark;
			}
			.u-box{
				color: $font-color-light;
				font-size: 24upx;
				margin-top: 16upx;
				margin-right: 30upx;
			}
		}
		.change-num {
			font-size: $font-lg + 10upx;
			color: $font-color-base;
		}
		.change-num-add {
			color: $base-color;
		}
		.change-num-reduce {
			color: $font-color-base;
		}
	}
</style>
