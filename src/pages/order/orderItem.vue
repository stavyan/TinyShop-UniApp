<template>
	<view class="collection">
		<view class="uni-list">
			<uni-swipe-action
					@click="bindClick"
					:options="options3"
					class="uni-list-cell"
					hover-class="uni-list-cell-hover"
					v-for="(item, index) in orderItemList"
					:key="index">
					<view
						class="uni-media-list"
						@click.stop="goEvaluation(item)">
						<image class="uni-media-list-logo"
									 mode="aspectFill"
									 :src="item.product_picture"></image>
						<uni-tag
								class="evaluate-tag"
								:inverted="true"
								:mark="true"
								:text="item.is_evaluate | filterIsEvaluate"
								:type="item.is_evaluate | filterEvaluateType"
								size="small" />
						<view class="uni-media-list-body">
							<view class="uni-media-list-text-top">{{ item.product_name }}</view>
							<view class="uni-media-list-text-second">{{ item.sku_name || '基础款' }} * {{ item.num }}</view>
							<view class="uni-media-list-text-bottom">
								<text class="price">{{ item.price * item.num }}</text>
								<text>{{ item.created_at | time }}</text>
							</view>
						</view>
					</view>
			</uni-swipe-action>
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
import uniLoadMore from '@/components/uni-load-more/uni-load-more';
import errorImg from './../../static/errorImage.jpg';
import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue';
import uniTag from '@/components/uni-tag/uni-tag.vue';
export default {
	components: {
		uniSwipeAction,
		uniLoadMore,
		uniTag
	},
	data() {
		return {
			orderItemList: [],
			errorImg: errorImg,
			page: 1,
			loadingType: 'more',
			token: null,
			options3: [
				{ text: '退款'},
				{
					text: '追加评论',
					style: { backgroundColor: 'rgb(254,156,1)' }
				},
				// {
				// text: '追加评论',
				// style: { backgroundColor: 'rgb(255,58,49)' }
				// }
			]
		};
	},
	filters: {
		time(val) {
			return moment(val * 1000).format('YYYY-MM-DD HH:mm:ss')
		},
		filterIsEvaluate(val) {
			const data = ['未评价', '已评价', '已追评'];
			return data[parseInt(val, 10)]
		},
		filterEvaluateType(val) {
			const data = ['primary', 'warning', 'success'];
			return data[parseInt(val, 10)]
		}
	},
	onLoad (options) {
		this.initData(options);
	},
	methods:{
		bindClick(e) {
			uni.showToast({
				title: `点击了${e.content.text}按钮`,
				icon: 'none'
			})
		},
		initData (options) {
			this.token = uni.getStorageSync('accessToken') || undefined;
			if (this.token) {
				this.orderItemList = JSON.parse(options.list);
				console.log(this.orderItemList)
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
.uni-media-list {
	position: relative;
}
.evaluate-tag {
	position: absolute;
	top: 20upx;
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
