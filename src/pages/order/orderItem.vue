<template>
	<view class="collection">
		<view class="uni-list">
			<view class="uni-list-cell"
						hover-class="uni-list-cell-hover"
						v-for="(item, index) in orderItemList"
						:key="index"
						@click="goEvaluation(item)">
				<view class="uni-media-list">
					 <!--@error="onImageError(index)"-->
					<image class="uni-media-list-logo"
								 mode="aspectFill"
								 :src="item.product_picture"></image>
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">{{ item.product_name }}</view>
						<view class="uni-media-list-text-second">{{ item.sku_name || '基本款' }} * {{ item.num }}</view>
						<view class="uni-media-list-text-bottom">
							<text class="price">{{ item.price * item.num }}</text>
							<text>{{ item.created_at | time }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
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
			orderItemList: [],
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
	onLoad (options) {
		this.initData(options);
	},
	methods:{
		initData (options) {
			this.token = uni.getStorageSync('accessToken') || undefined;
			if (this.token) {
				this.orderItemList = JSON.parse(options.list);
			}
		},
		onImageError (index) {
			this.orderItemList[index].picture = this.errorImg;
		},
		goEvaluation(item) {
			uni.navigateTo({
				url: `/pages/evaluation/evaluation?data=${JSON.stringify(item)}`
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
	font-size: 28upx;
	overflow: hidden;
}
.uni-media-list-text-second {
	height: 50upx;
	font-size: 28upx - 4upx;
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
