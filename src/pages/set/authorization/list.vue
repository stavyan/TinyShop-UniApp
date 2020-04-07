<template>
	<view class="content b-t">
		<view>
			<view class="list b-b" v-for="(item, index) in thirdPartyAuthList" :key="index">
				<view class="wrapper">
					<view class="address-box">
						<text class="address">{{item.oauth_client | oauthClientFilter}}</text>
					</view>
					<view class="u-box">
						<text class="name">授权时间: {{item.updated_at | time}}</text>
					</view>
				</view>
				<text class="unbind" @tap.stop="unBind(item.id)">解除绑定</text>
			</view>
			<rf-load-more :status="loadingType" v-if="thirdPartyAuthList.length > 0" />
		</view>
		<rf-empty :info="'您暂未授权第三方平台~'" v-if="thirdPartyAuthList.length === 0 && !loading"></rf-empty>
		<!--加载动画-->
		<rf-loading v-if="loading"></rf-loading>
	</view>
</template>

<script>
	import {thirdPartyAuthDelete, thirdPartyAuthList} from "@/api/userInfo";
	import moment from '@/utils/moment';
	import rfLoadMore from '@/components/rf-load-more/rf-load-more';

	export default {
		components: {
			rfLoadMore
		},
		data() {
			return {
				timeOutEvent: 0,
				source: 0,
				page: 1,
				loadingType: 'more',
				thirdPartyAuthList: [],
				loading: true
			}
		},
		filters: {
			time(val) {
				return moment(val * 1000).format('YYYY-MM-DD HH:mm:ss')
			},
			oauthClientFilter(val) {
				switch (val) {
					case 'wechat':
						return '微信';
						break;
					case 'wechatMp':
						return '微信小程序';
						break;
					case 'qq':
						return 'QQ小程序';
						break;
					case 'sina':
						return '新浪';
						break;
					default:
						break;
				}
			}
		},
		//下拉刷新
		onPullDownRefresh(){
			this.page = 1;
			this.thirdPartyAuthList = [];
			this.loading = true;
			this.getThirdPartyAuthList('refresh');
		},
		//加载更多
		onReachBottom(){
			this.page ++;
			this.getThirdPartyAuthList();
		},
		onLoad(option){
			this.source = option.source;
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
				this.getThirdPartyAuthList();
			},
			/**
			 *@des 获取收货地址列表
			 *@author stav stavyan@qq.com
			 *@blog https://stavtop.club
			 *@date 2019/11/18 09:58:15
			 */
			async getThirdPartyAuthList (type) {
				await this.$get(`${thirdPartyAuthList}`).then(r=>{
					this.loading = false;
					if (type === 'refresh') {
						uni.stopPullDownRefresh();
					}
					this.loadingType  = r.data.length === 10 ? 'more' : 'nomore';
					this.thirdPartyAuthList = [ ...this.thirdPartyAuthList, ...r.data ];
				}).catch(() => {
					this.loading = false;
					if (type === 'refresh') {
						uni.stopPullDownRefresh();
					}
				})
			},
			/**
			 *@des 解绑第三方授权登录
			 *@author stav stavyan@qq.com
			 *@blog https://stavtop.club
			 *@date 2019/12/31 16:47:33
			 */
			async unBind (id) {

				await this.$del(`${thirdPartyAuthDelete}?id=${id}`).then(r=>{
						this.page = 1;
						this.thirdPartyAuthList = [];
						this.getThirdPartyAuthList();
				}).catch(err => {
					console.log(err)
				})
			},
		}
	}
</script>

<style lang='scss'>
	page{
		background-color: $page-color-white;
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
	.unbind {
		color: $base-color;
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
