<template>
	<view class="collection">
		<view class="uni-list">
			<rf-swipe-action>
		    <rf-swipe-action-item
					:options="itemOptions(item.is_evaluate, item.refund_status)"
			    :info="item"
			    @action="bindClick"
			    class="uni-list-cell"
			    :key="index"
			    v-for="(item, index) in orderItemList">
					<view
						class="uni-media-list">
						<!--@tap.stop="goEvaluation(item)"-->
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
		    </rf-swipe-action-item>
			</rf-swipe-action>
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
import rfLoadMore from '@/components/rf-load-more/rf-load-more';
import errorImg from './../../static/errorImage.jpg';
import uniTag from '@/components/uni-tag/uni-tag.vue';
import {closeOrderRefundApply, orderCustomerRefundClose, orderDetail} from "@/api/userInfo";
import rfSwipeAction from '@/components/rf-swipe-action/rf-swipe-action';
import rfSwipeActionItem from '@/components/rf-swipe-action-item/rf-swipe-action-item.vue';
import moment from '@/utils/moment';
export default {
	components: {
		rfSwipeAction,
		rfSwipeActionItem,
		rfLoadMore,
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
			const data = ['未评价', '已评价', '已追评'];
			return data[parseInt(val, 10)]
		},
		filterProductStatus(item) {
			let status = null;
			if (parseInt(item.refund_status, 10) !== 0) {
				const refundStatusList = [
					{key: 1, value: '退款/退货申请'},
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
			} else if (parseInt(item.order_status, 10) === 4) {
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
			return function (isEvaluate, refundStatus) {
				const options = [];
				const status = this.orderStatus;
				if (parseInt(status, 10) === 1) {
					switch (refundStatus) {
						case '0':
							options.push({ text: '仅退款'})
							break;
						case '1':
							options.push({ text: '取消', style: { backgroundColor: 'rgb(254,156,1)' }})
							break;
						default:
							break;
					}
				} else if (parseInt(status, 10) === 2) {
					switch (refundStatus) {
						case '0':
							options.push({ text: '退款/退货'})
							break;
						case '1':
							options.push({ text: '取消', style: { backgroundColor: 'rgb(254,156,1)' }});
							break;
						case '2':
							options.push({ text: '填写退货信息', style: { backgroundColor: 'rgb(254,156,1)' }});
							break;
						default:
							break;
					}
				} else if (parseInt(status, 10) === 4) {
					switch (isEvaluate) {
						case '0':
							options.push({text: '评价', style: {backgroundColor: 'rgb(254,156,1)'}});
							break;
						case '1':
							options.push({text: '追加评价', style: {backgroundColor: 'rgb(255,58,49)'}});
							break;
						case 2:
							break;
						default:
							break;
					}
					switch (refundStatus) {
						case '0':
							options.push({ text: '退款/退货'})
							break;
						case '-3':
							options.push({ text: '退款/退货'})
							break;
						case '1':
							options.push({ text: '取消', style: { backgroundColor: 'rgb(254,156,1)' }});
							break;
						case '2':
							options.push({ text: '填写退货信息', style: { backgroundColor: 'rgb(254,156,1)' }});
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
			if (e.content.text === '仅退款') {
				if (parseInt(e.data.refund_status, 10) !== 0) {
					this.$api.msg('您已经提交了退款申请');
					return;
				}
				this.goRefund(e.data, 1)
			} else if (e.content.text === '退款/退货') {
				if (parseInt(e.data.refund_status, 10) !== 0) {
					this.$api.msg('您已经提交了退货申请');
					return;
				}
				if (e.data.order_status == 2) {
					this.goRefund(e.data, 2);
				} else if (e.data.order_status == 4) {
					this.goRefund(e.data, 3);
				}
			} else if (e.content.text === '取消') {
				this.handleCloseOrderRefundApply(e.data.id)
				// if (parseInt(e.data.refund_status, 10) !== 0) {
				// 	this.$api.msg('您已经提交了退货申请');
				// 	return;
				// }
				if (e.data.order_status == 2) {
					this.goRefund(e.data, 2)
				} else if (e.data.order_status == 4) {
					this.goRefund(e.data, 3)
				}
			} else if (e.content.text === '取消' || e.content.text === '取消') {
				this.handleCloseOrderRefundApply(e.data.order_status, e.data.id)
			} else if (e.content.text === '评价') {
				this.goEvaluation(e.data)
			} else if (e.content.text === '追加评价') {
				this.goEvaluation(e.data, 'add')
			} else if (e.content.text === '填写退货信息') {
				this.navTo(`/pages/order/shipping/return?data=${JSON.stringify(e.data)}`);
			}
		},
		/**
		 *@des 产品退款/退货关闭申请
		 *@author stav stavyan@qq.com
		 *@blog https://stavtop.club
		 *@date 2019/12/03 17:48:39
		 *@param arguments
		 */
		async handleCloseOrderRefundApply(status, id) {

			let closeOrderApi = closeOrderRefundApply;
			if (status == 4) {
				closeOrderApi = orderCustomerRefundClose;
			}
			await this.$post(`${closeOrderApi}`, {
				id,
			}).then(r => {
				uni.navigateBack({
					delta: 1
				});
			}).catch(err => {
				console.log(err)
			})
		},
		async initData(options) {
			this.token = uni.getStorageSync('accessToken') || undefined;

			await this.$get(`${orderDetail}`, {
				id: options.id
			}).then(r => {
				this.orderItemList = r.data.product;
				this.orderStatus =  r.data.order_status;
			}).catch(err => {
				console.log(err)
			});
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
				url: `/pages/order/evaluation/evaluation?data=${JSON.stringify(item)}&type=${type}`
			})
		},
		navTo(url) {
			uni.navigateTo({
				url
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
				url: `/pages/order/refund/refund?data=${JSON.stringify(item)}&refundType=${type}`
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
