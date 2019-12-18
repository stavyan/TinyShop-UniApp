<template>
	<view class="collection">
		<view class="uni-list">
			<uni-swipe-action
					@click="bindClick"
					:data="item"
					:options="itemOptions(item.is_evaluate)"
					class="uni-list-cell"
					hover-class="uni-list-cell-hover"
					v-for="(item, index) in orderItemList"
					:key="index">
					<view
						class="uni-media-list">
						<!--@click.stop="goEvaluation(item)"-->
						<image class="uni-media-list-logo"
									 mode="aspectFill"
									 :src="item.product_picture"></image>
						<uni-tag
								class="evaluate-tag"
								:inverted="true"
								:mark="true"
								:text="item | filterProductStatus"
								type="primary"
								size="small" />
								<!--:text="item.is_evaluate | filterIsEvaluate"-->
								<!--:type="item.is_evaluate | filterEvaluateType"-->
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
import {closeOrderRefundApply} from "../../api/userInfo";
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
			options: [],
			orderStatus: null
		};
	},
	filters: {
		time(val) {
			return moment(val * 1000).format('YYYY-MM-DD HH:mm:ss')
		},
		filterIsEvaluate(val) {
			console.log(val)
			const data = ['未评价', '已评价', '已追评'];
			return data[parseInt(val, 10)]
		},
		filterEvaluateType(val) {
			const data = ['primary', 'warning', 'success'];
			return data[parseInt(val, 10)]
		},
		filterProductStatus(item) {
			let status = null;
			if (parseInt(item.refund_status, 10) !== 0) {
				const refundStatusList = [
					{key: 1, value: '退款申请'},
					{key: 2, value: '等待退货'},
					{key: 3, value: '等待确认收货'},
					{key: 4, value: '等待确认退款'},
					{key: 5, value: '同意退款'},
					{key: -1, value: '退款已拒绝'},
					{key: -2, value: '退款已关闭'},
					{key: -3, value: '退款不通过'},
				];
				refundStatusList.forEach(refundItem => {
					if (refundItem.key == item.refund_status) {
						 status = refundItem.value
					}
				})
			} else if (parseInt(item.order_status, 10) === 3) {
				const evaluateStatusList = [
					{key: 0, value: '未评价'},
					{key: 1, value: '已评价'},
					{key: 2, value: '已追评'},
				];
				evaluateStatusList.forEach(evaluateItem => {
					if (evaluateItem.key == item.is_evaluate) {
						 status = evaluateItem.value
					}
				})
			} else {
				const orderStatusList = [
					{key: 0, value: '待付款'},
					{key: 1, value: '待发货'},
					{key: 2, value: '已发货'},
					{key: 3, value: '已收货'},
					{key: 4, value: '已完成'},
					{key: -1, value: '退货申请'},
					{key: -2, value: '退款中'},
					{key: -3, value: '退款完成'},
					{key: -4, value: '已关闭'},
					{key: -5, value: '撤销申请'},
				];
				orderStatusList.forEach(orderItem => {
					if (orderItem.key == item.order_status) {
						 status = orderItem.value
					}
				})
			}
			return status;
		}
	},
	computed: {
		itemOptions() {
			return function (isEvaluate) {
				const options = [];
				const status = this.orderStatus;
				if (parseInt(status, 10) === 1) {
					options.push({ text: '退款'})
					options.push({ text: '取消退款', style: { backgroundColor: 'rgb(254,156,1)' }})
				} else if (parseInt(status, 10) === 2) {
					options.push({ text: '退货'})
					options.push({ text: '取消退货', style: { backgroundColor: 'rgb(254,156,1)' }})
				} else if (parseInt(status, 10) === 3) {
					switch (isEvaluate) {
						case '0':
							options.push({text: '评论', style: {backgroundColor: 'rgb(254,156,1)'}});
							break;
						case '1':
							options.push({text: '追加评论', style: {backgroundColor: 'rgb(255,58,49)'}});
							break;
						case 2:
							break;
						default:
							break;
					}
				}
				return options;
			}
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
			if (e.content.text === '退款') {
				if (parseInt(e.data.refund_status, 10) !== 0) {
					uni.showToast({title: '您已经提交了退款申请', icon: 'none'})
					return;
				}
				this.goRefund(e.data, 1)
			} else if (e.content.text === '退货') {
				if (parseInt(e.data.refund_status, 10) !== 0) {
					uni.showToast({title: '您已经提交了退货申请', icon: 'none'})
					return;
				}
				this.goRefund(e.data, 2)
			} else if (e.content.text === '取消退货' || e.content.text === '取消退款') {
				this.handleCloseOrderRefundApply(e.data.id)
			} else if (e.content.text === '评论') {
				this.goEvaluation(e.data)
			} else if (e.content.text === '追加评论') {
				this.goEvaluation(e.data, 'add')
			}
		},
		/**
		 *@des 产品退款/退货关闭申请
		 *@author stav stavyan@qq.com
		 *@blog https://stavtop.club
		 *@date 2019/12/03 17:48:39
		 *@param arguments
		 */
		async handleCloseOrderRefundApply(id) {
			uni.showLoading({title: '加载中...'});
			await this.$post(`${closeOrderRefundApply}`, {
				id,
			}).then(r => {
				if (r.code === 200) {
					uni.navigateBack({
						delta: 1
					});
				} else {
					uni.showToast({title: r.message, icon: "none"});
				}
			}).catch(err => {
				console.log(err)
			})
		},
		initData (options) {
			this.token = uni.getStorageSync('accessToken') || undefined;
			if (this.token) {
				this.orderItemList = JSON.parse(options.list);
				this.orderStatus = options.orderStatus
				// this.initOptions(options.orderStatus)
			}
		},
		initOptions (status) {
			if (parseInt(status, 10) === 1) {
				this.options.push({ text: '退款'})
				this.options.push({ text: '取消退款', style: { backgroundColor: 'rgb(254,156,1)' }})
			} else if (parseInt(status, 10) === 2) {
				this.options.push({ text: '退货'})
				this.options.push({ text: '取消退货', style: { backgroundColor: 'rgb(254,156,1)' }})
			} else if (parseInt(status, 10) === 3) {
				let option1 = [], option2 = [];
				this.orderItemList.forEach(item => {
					if (parseInt(item.is_evaluate) === 0) {
						option1.push({text: '评论', style: { backgroundColor: 'rgb(254,156,1)' }});
					} else if (parseInt(item.is_evaluate) === 1) {
						option2.push({text: '追加评论', style: { backgroundColor: 'rgb(255,58,49)' }});
					}
				})
				this.options = option1 || option2 || [];
			}
		},
		onImageError (index) {
			this.orderItemList[index].picture = this.errorImg;
		},
		/**
		 *@des 跳转评价页面
		 *@author stav stavyan@qq.com
		 *@blog https://stavtop.club
		 *@date 2019/12/03 17:07:39
		 *@param item 商品item
		 */
		goEvaluation(item, type) {
			uni.navigateTo({
				url: `/pages/evaluation/evaluation?data=${JSON.stringify(item)}&type=${type}`
			})
		},
		/**
		 *@des 跳转退货/退款页面
		 *@author stav stavyan@qq.com
		 *@blog https://stavtop.club
		 *@date 2019/12/03 17:07:39
		 *@param item 商品item
		 */
		goRefund(item, type) {
			uni.navigateTo({
				url: `/pages/refund/refund?data=${JSON.stringify(item)}&refundType=${type}`
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
	font-size: $font-sm - 4upx;
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
