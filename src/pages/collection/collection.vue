<template>
	<view class="collection">
		<view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item, index) in collectionList" :key="index" @click="goProduct(item.product && item.product.id)">
				<view class="uni-media-list">
					<image class="uni-media-list-logo"
								 mode="aspectFill"
								 @error="onImageError(index)"
								 :src="item.product && item.product.picture"></image>
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">{{ item.product && item.product.name }}</view>
						<view class="uni-media-list-text-bottom">
							<text class="price">{{ item.product && item.product.minPriceSku.price }}</text>
							<text>{{ item.created_at | time }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<uni-load-more :status="loadingType" />
	</view>
</template>

<script>
/**
 * @des 我的收藏
 *
 * @author stav stavyan@qq.com
 * @date 2019-11-22 10:47
 * @copyright 2019
 */
import {collectList} from "../../api/userInfo";
import uniLoadMore from '@/components/uni-load-more/uni-load-more';
import errorImg from './../../static/errorImage.jpg'
export default {
	components: {
		uniLoadMore
	},
	data() {
		return {
			collectionList: [],
			errorImg: errorImg,
			page: 1,
			loadingType: 'more',
			token: null
		};
	},
	filters: {
		time(val) {
			return moment(val * 1000).format('YYYY-MM-DD HH:mm:ss')
		}
	},
	onLoad () {
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
		this.collectionList = [];
		this.getCollectionList('refresh');
	},
	//加载更多
	onReachBottom(){
		this.page ++;
		this.getCollectionList();
	},
	methods:{
		initData () {
			this.token = uni.getStorageSync('accessToken') || undefined;
			if (this.token) {
				this.getCollectionList();
			} else {

			}
		},
		async getCollectionList(type) {
			uni.showLoading({title: '加载中...'});
			await this.$get(`${collectList}`, {
				page: this.page
			}).then(r => {
				if (type === 'refresh') {
					uni.stopPullDownRefresh();
				}
				if (r.code === 200) {
					this.loadingType  = r.data.length === 10 ? 'more' : 'nomore';
					this.collectionList = [ ...this.collectionList, ...r.data ];
				} else {
					uni.showToast({title: r.message, icon: "none"});
				}
			}).catch(err => {
				console.log(err)
			})
		},
		onImageError (index) {
			this.collectionList[index].product.picture = this.errorImg;
		},
		goProduct(id) {
			let url = `/pages/product/product?id=${id}`;
			if (!this.token) {
				url = '/pages/public/login';
			}
			uni.navigateTo({
				url
			})
		},
	}
}
</script>

<style lang='scss'>
.uni-media-list-logo {
	width: 240upx;
	height: 180upx;
}

.uni-media-list-body {
	height: auto;
	justify-content: space-around;
}

.uni-media-list-text-top {
	height: 74upx;
	font-size: 28upx;
	overflow: hidden;
}

.uni-media-list-text-bottom {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}

.price{
	font-size: $font-base;
	color: $font-color-dark;
	&:before{
		content: '￥';
		font-size: $font-sm;
		margin: 0 2upx 0 8upx;
	}
}
</style>
