<template>
	<view class="content b-t">
		<view class="list b-b" v-for="(item, index) in feedbackList" :key="index" @tap="navToDetail(item.id)">
			<view class="wrapper">
				<view class="address-box">
					<text class="tag">{{ item.type | feedbackFilter }}</text>
					<text class="address in1line">{{item.content}}</text>
				</view>
				<view class="u-box">
					<text class="name">{{item.reply || '管理员未回复'}}</text>
					<text class="mobile">联系方式：{{item.contact_way || '暂无'}}</text>
				</view>
			</view>
		</view>
		<rf-empty :info="'您还没有反馈意见'" v-if="feedbackList.length === 0"></rf-empty>
		<rf-load-more v-if="feedbackList.length > 0 && !loading" :status="loadingType" />
		<button class="add-btn" @tap="addFeedback()">意见反馈</button>
		<rf-loading v-if="loading"></rf-loading>
	</view>
</template>

<script>
  import {feedbackList, opinionList} from "@/api/userInfo";

	import rfLoadMore from '@/components/rf-load-more/rf-load-more';
	export default {
		components: {
			rfLoadMore
		},
		data() {
			return {
		    page: 1,
				timeOutEvent: 0,
				source: 0,
				feedbackList: [],
				loadingType: 'more',
				loading: true
			}
		},
		filters: {
			feedbackFilter(type) {
				const feedbackType = ['', '功能建议', 'BUG反馈', '业务咨询']
				return feedbackType[parseInt(type, 10)]
			}
		},
		onLoad(option){
			this.source = option.source;
		},
		//下拉刷新
		onPullDownRefresh(){
			this.page = 1;
			this.feedbackList.length = 0;
			this.getFeedbackList('refresh');
		},
		//加载更多
		onReachBottom(){
			this.page ++;
			this.getFeedbackList();
		},
		onShow() {
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
				this.page = 1;
				this.getFeedbackList();
			},
			/**
			 *@des 获取收货地址列表
			 *@author stav stavyan@qq.com
			 *@blog https://stavtop.club
			 *@date 2019/11/18 09:58:15
			 */
			async getFeedbackList (type) {
		    this.loading = true;
				await this.$get(`${opinionList}`, {page: this.page}).then(r=>{
			    this.loading = false;
					if (type === 'refresh') {
						uni.stopPullDownRefresh();
					}
					this.loadingType  = r.data.length === 10 ? 'more' : 'nomore';
					this.feedbackList = [ ...this.feedbackList, ...r.data ];
				}).catch(() => {
			    this.loading = false;
					if (type === 'refresh') {
						uni.stopPullDownRefresh();
					}
				})
			},
			addFeedback(){
				uni.navigateTo({
					url: `/pages/set/feedback/feedback`
				})
			},
			navToDetail(id){
				uni.navigateTo({
					url: `/pages/set/feedback/detail?id=${id}`
				})
			},
			//添加或修改成功之后回调
			refreshList(data, type){
				//添加或修改后事件，这里直接在最前面添加了一条数据，实际应用中直接刷新地址列表即可
				this.feedbackList.unshift(data);

				console.log(data, type);
			}
		}
	}
</script>

<style lang='scss'>
	page{
		padding-bottom: 120upx;
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
		display: flex;
		align-items: center;
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
			font-size: 30upx;
			color: $font-color-dark;
		}
	}
	.u-box{
		font-size: 28upx;
		color: $font-color-light;
		margin-top: 16upx;
		.name{
			margin-right: 30upx;
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
</style>
