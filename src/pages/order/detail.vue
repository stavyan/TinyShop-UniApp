<template>
	<view class="rf-order-detail">
		<view class="order-detail" v-if="orderDetail.product">
			<view class="rf-address-section">
				<view class="order-content">
					<text class="iconfont iconshouhuodizhi"></text>
					<view class="cen">
						<view class="top">
								<uni-tag class="pickup-tag" v-if="orderDetail.pickup.contact" type="error" text="自提点" size="small" />
								<text class="name">{{ orderDetail.receiver_name || orderDetail.pickup.contact }}</text>
								<text class="mobile">{{ orderDetail.receiver_mobile || orderDetail.pickup.mobile }}</text>
						</view>
						<text class="address">{{ orderDetail.receiver_region_name || orderDetail.pickup.name }} {{ orderDetail.receiver_address || orderDetail.pickup.address }}</text>
					</view>
					<!--<i class="iconfont iconyou"></i>-->
				</view>
				<image
					class="a-bg"
					src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAAFCAYAAAAaAWmiAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Rjk3RjkzMjM2NzMxMTFFOUI4RkU4OEZGMDcxQzgzOEYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Rjk3RjkzMjQ2NzMxMTFFOUI4RkU4OEZGMDcxQzgzOEYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGOTdGOTMyMTY3MzExMUU5QjhGRTg4RkYwNzFDODM4RiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGOTdGOTMyMjY3MzExMUU5QjhGRTg4RkYwNzFDODM4RiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrEOZlQAAAiuSURBVHjazJp7bFvV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"
				></image>
			</view>
			<view class="rf-goods-section">
				<view class="g-header b-b">
					<view class="title">
						<image class="cover" :src="orderDetail.merchant && orderDetail.merchant.cover || logo"></image>
						{{ orderDetail.merchant && orderDetail.merchant.title || appName }}</view>
					<text class="name" :class="'text-' + themeColor.name">{{
						orderDetail.order_status | orderStatusFilter
					}}</text>
				</view>
				<!-- 商品列表 -->
				<view
					class="g-item"
					v-for="(item, index) in orderDetail.product"
					:key="index"
					@tap="navTo(`/pages/product/product?id=${item.product_id}`)"
				>
					<rf-image :preview="false" :src="item.product_picture"></rf-image>
					<view class="right">
						<text class="title clamp in2line">
							<uni-tag class="pickup-tag"  v-if="item.gift_flag === '1'" type="error" text="赠品" size="small" />
							{{ item.product_name }}
						</text>
						<text class="spec"
							>{{ item.sku_name || singleSkuText }} * {{ item.num }}</text
						>
						<view class="price-box">
							<text class="price-wrapper">
								<text v-if="item.point_exchange_type == 2">
									实付<text :class="'text-' + themeColor.name">{{ moneySymbol }}{{ item.product_money }}</text><text class="original-price" v-if="item.product_original_money > item.product_money">{{ moneySymbol }}{{ item.product_original_money }}</text>
									<text class="point"> + {{ orderDetail.point }}积分 </text>
								</text>
								<text :class="'text-' + themeColor.name" v-else-if="item.point_exchange_type == 4">
									<text class="point">{{ orderDetail.point }}积分 </text>
								</text>
								<text v-else>
									<text :class="'text-' + themeColor.name">{{ moneySymbol }}{{ item.product_money }}</text><text class="original-price">{{ moneySymbol }}{{ item.product_original_money }}</text>
									<text v-if="item.gift_flag === 0"> + {{ orderDetail.point + '积分' || '' }}</text>
								</text>
							</text>
							<!--<text class="status" @tap.stop="navTo(`/pages/order/shipping/shipping?id=${item.order_id}`)" v-if="item.shipping_status == 1">查看物流</text>-->
							<text class="status spec-color" @tap.stop="">{{
								item | filterProductStatus
							}}</text>
						</view>
						<view class="btn-box" v-if="item.gift_flag !== '1'">
							<button
								class="action-btn"
								v-if="
									(item.order_status == 3 || item.order_status == 4) &&
										item.is_evaluate == 0 &&
										(item.refund_status == 0 ||
											item.refund_status == -2 ||
											item.refund_status == -3)
								"
								@tap.stop="navToEvaluation(item)"
							>
								我要评价
							</button>
							<button
								class="action-btn"
								v-if="
									(item.order_status == 3 || item.order_status == 4) &&
										item.is_evaluate == 1 &&
										(item.refund_status == 0 ||
											item.refund_status == -2 ||
											item.refund_status == -3)
								"
								@tap.stop="navToEvaluation(item, 'add')"
							>
								追加评价
							</button>
							<button
								class="action-btn"
								v-if="
									item.order_status == 1 &&
										item.shipping_status != 1 &&
										(item.refund_status == 0 || item.refund_status == -3)
								"
								@tap.stop="navToRefund(item, 1)"
							>
								申请退款
							</button>
							<button
								class="action-btn"
								v-if="
									(item.order_status == 3 || item.order_status == 2) &&
										item.shipping_status == 1 &&
										(item.refund_status == 0 || item.refund_status == -3)
								"
								@tap.stop="navToRefund(item, 2)"
							>
								申请退换
							</button>
							<button
								class="action-btn"
								v-if="
									item.order_status == 4 &&
										(item.refund_status == 0 || item.refund_status == -3) && item.is_virtual !== '1'
								"
								@tap.stop="navToRefund(item, 3)"
							>
								申请退换
							</button>
							<button
								class="action-btn"
								v-if="
									(item.order_status == 2 ||
										item.order_status == 3 ||
										item.order_status == 4) &&
										item.refund_status == 2
								"
								@tap.stop="navToShippingReturn(item)"
							>
								填写退货信息
							</button>
							<button
								class="action-btn"
								v-if="
									item.refund_status == 1 ||
										item.refund_status == 2 ||
										item.refund_status == 3 ||
										item.refund_status == 4 ||
										item.refund_status == -1
								"
								@tap.stop="
									handleCloseOrderRefundApply(item.order_status, item.id)
								"
							>
								取消退款
							</button>
						</view>
					</view>
				</view>
			</view>
			<!-- 订单号 -->
			<view class="yt-list">
				<view class="yt-list-cell b-b">
					<text class="cell-tit clamp">订单号</text>
					<text class="cell-tip">
						{{ orderDetail.order_sn }}
					</text>
					<text class="cell-tip copy" :class="'text-' + themeColor.name" @tap.stop="copy(orderDetail.order_sn)">复制</text>
				</view>
			</view>
			<!-- 优惠明细 -->
			<view class="yt-list">
				<view class="yt-list-cell b-b">
					<view class="cell-icon" :class="'bg-' + themeColor.name">
						券
					</view>
					<text class="cell-tit clamp">优惠券</text>
					<text class="cell-tip " :class="'text-' + themeColor.name">
						{{
							(orderDetail.coupon && orderDetail.coupon.title) || '未使用优惠券'
						}}
					</text>
					<text class="cell-more wanjia wanjia-gengduo-d"></text>
				</view>
				<view class="yt-list-cell b-b">
					<view class="cell-icon" :class="'bg-' + themeColor.name">
						寄
					</view>
					<text class="cell-tit clamp">配送方式</text>
					<text class="cell-tip" :class="'text-' + themeColor.name">
						{{ orderDetail.shipping_type | filterShippingType }}
					</text>
					<text class="cell-more wanjia wanjia-gengduo-d"></text>
				</view>
				<view class="yt-list-cell b-b" v-if="orderDetail.company_name">
					<view class="cell-icon" :class="'bg-' + themeColor.name">
						司
					</view>
					<text class="cell-tit clamp">快递公司</text>
					<text class="cell-tip active">
						{{ orderDetail.company_name }}
					</text>
					<text class="cell-more wanjia wanjia-gengduo-d"></text>
				</view>
				<view
					class="yt-list-cell b-b"
					v-if="orderDetail.payment_explain != '积分兑换' && orderDetail.point_money > 0"
				>
					<view class="cell-icon hb" :class="'bg-' + themeColor.name">
						减
					</view>
					<text class="cell-tit clamp">积分抵扣</text>
					<text class="cell-tip disabled"></text>
					<text class="cell-tip disabled"
						>已用{{ orderDetail.point || 0 }}积分抵用{{
							orderDetail.point_money || 0
						}}元</text
					>
				</view>
				<view class="yt-list-cell b-b" v-if="orderDetail.point > 0 && orderDetail.payment_explain === '积分兑换'">
					<view class="cell-icon" :class="'bg-' + themeColor.name">
						减
					</view>
					<text class="cell-tit clamp">积分下单</text>
					<text class="cell-tip disabled"></text>
					<text class="cell-tip disabled"
						>消耗了{{ orderDetail.point || 0 }}积分</text
					>
				</view>
			</view>
			<!-- 金额明细 -->
			<view class="yt-list">
				<view class="yt-list-cell b-b">
					<text class="cell-tit clamp">商品总价</text>
					<text class="cell-tip" :class="'text-' + themeColor.name">{{ moneySymbol }}{{ (orderDetail.product_original_money || orderDetail.product_money) | keepTwoDecimal }}</text>
				</view>
<!--				<view class="yt-list-cell b-b" v-if="orderDetail.coupon_money > 0">-->
<!--					<text class="cell-tit clamp">优惠金额</text>-->
<!--					<text class="cell-tip red">-￥ {{ orderDetail.coupon_money }}</text>-->
<!--				</view>-->
				<!--营销金额优惠-->
				<view v-for="(item, index) in orderDetail.marketingDetail" :key="index">
					<view v-if="item.discount_money > 0 || item.give_point > 0" class="yt-list-cell b-b">
						<text class="cell-tit clamp">{{ item.marketing_name }}</text>
						<text class="cell-tip">
							<text v-if="item.marketing_type === 'give_point'">{{ item.discount_money }} 积分</text>
							<text v-else :class="'text-' + themeColor.name">-{{ moneySymbol }}{{item.discount_money }}</text>
						</text>
					</view>
				</view>
				<view class="yt-list-cell b-b">
					<text class="cell-tit clamp">运费</text>
					<text class="cell-tip" :class="'text-' + themeColor.name">
						<text>{{ moneySymbol }}{{ orderDetail.shipping_money }}</text>
					</text>
				</view>
				<view class="yt-list-cell b-b" v-if="orderDetail.invoice">
					<text class="cell-tit clamp">开具发票</text>
					<text class="cell-tip in1line" :class="'text-' + themeColor.name">
						<text>
							{{
								`电子发票 -${
									parseInt(
										orderDetail.invoice && orderDetail.invoice.type,
										10
									) === 1
										? '公司'
										: '个人'
								}-${orderDetail.invoice &&
									orderDetail.invoice.title} [ ${orderDetail.invoice &&
									orderDetail.invoice.content} ]`
							}}
						</text>
					</text>
				</view>
				<view class="yt-list-cell b-b" v-if="orderDetail.tax_money > 0">
					<text class="cell-tit clamp">发票税费</text>
					<text class="cell-tip" :class="'text-' + themeColor.name">
						<text>{{ moneySymbol }}{{ orderDetail.tax_money }}</text>
					</text>
				</view>
				<view class="yt-list-cell b-b">
					<text class="cell-tit clamp">实付金额</text>
					<text class="cell-tip" :class="'text-' + themeColor.name">{{ moneySymbol }}{{ orderDetail.pay_money }}</text>
				</view>
			</view>
			<view class="yt-list" v-if="orderDetail.buyer_message">
				<view class="yt-list-cell b-b">
					<text class="cell-tit clamp">备注</text>
					<text class="cell-tip">{{ orderDetail.buyer_message }}</text>
				</view>
			</view>
			<view class="uni-timeline">
				<view
					class="uni-timeline-item"
					:class="[
						index === 0 ? `text-${themeColor.name} uni-timeline-first-item` : '',
						index === orderTimeLine.length - 1 ? 'uni-timeline-last-item' : ''
					]"
					v-for="(item, index) in orderTimeLine"
					:key="index"
				>
					<view class="uni-timeline-item-divider"></view>
					<view class="uni-timeline-item-content">
						<view>
							{{ item.value }}
						</view>
						<view class="datetime">
							{{ item.time | time }}
						</view>
					</view>
				</view>
			</view>
			<!-- 底部 -->
			<view class="footer">
				<button
					class="action-btn"
					:class="'bg-' + themeColor.name"
					v-if="orderDetail.order_status == -4"
					@tap="handleOrderOperation(orderDetail, 'delete')"
				>
					删除订单
				</button>
				<button
					class="action-btn"
					:class="'text-' + themeColor.name"
					v-if="orderDetail.order_status == 0"
					@tap="handleOrderOperation(orderDetail, 'close')"
				>
					取消订单
				</button>
				<button
					class="action-btn"
					:class="'bg-' + themeColor.name"
					v-if="orderDetail.order_status == 0"
					@tap="navTo(`/pages/user/money/pay?id=${orderDetail.id}`)"
				>
					立即支付
				</button>
				<button
					class="action-btn"
					:class="'text-' + themeColor.name"
					v-if="
						(orderDetail.order_status == 4 ||
							orderDetail.order_status == 3 ||
							orderDetail.order_status == 2) &&
							orderDetail.is_virtual != 1
					"
					@tap="handleOrderOperation(orderDetail, 'shipping')"
				>
					查看物流
				</button>
				<navigator url="/pages/set/invoice/invoice?source=1">
					<button
						v-if="orderDetail.pay_money > 0 && !orderDetail.invoice"
						class="action-btn"
						:class="'bg-' + themeColor.name"
					>
						申请开票
					</button>
				</navigator>
				<button
					class="action-btn"
					:class="'bg-' + themeColor.name"
					v-if="
						(orderDetail.order_status == 3 || orderDetail.order_status == 4) &&
							orderDetail.is_evaluate == 0
					"
					@tap="handleOrderOperation(orderDetail, 'evaluation')"
				>
					批量评价
				</button>
				<button
					class="action-btn"
					:class="'bg-' + themeColor.name"
					v-if="orderDetail.order_status == 2"
					@tap="handleOrderOperation(orderDetail, 'delivery')"
				>
					确认收货
				</button>
			</view>
		</view>
		<!-- 404页面 -->
		<view v-if="!orderDetail.product && !loading">
			<rf-no-data class="rf-no-data" :custom="true">
				<view class="title" @tap="getOrderDetail">
					{{ errInfo || '订单不存在' }}
				</view>
				<view @tap="getOrderDetail" slot="refresh" class="spec-color"
					>重新加载</view
				>
			</rf-no-data>
		</view>
		<!--页面加载动画-->
		<rfLoading isFullScreen :active="loading"></rfLoading>
		<!-- 发票类型面板 -->
		<view
			class="mask"
			:class="maskState === 1 ? 'show' : 'none'"
			@tap="toggleMask"
		>
			<view class="mask-content" @tap.stop.prevent="stopPrevent">
				<!-- 发票类型 -->
				<view class="sub-list">
					<view class="radio-wrapper">
						<text class="title">发票类型: </text>
						<radio-group
							class="invoice-content"
							@change="handleInvoiceContentChange"
						>
							<label
								class="invoice-content-item"
								v-for="(item, index) in invoiceItem.invoiceContentArr"
								:key="index"
							>
								<radio
									class="invoice-content-item-radio"
									:value="item"
									:color="themeColor.color"
									:checked="orderInvoiceContent == item"
								/>
								<text class="gender-item-text">{{ item }}</text>
							</label>
						</radio-group>
					</view>
				</view>
				<button @tap.stop="handleOrderInvoiceCreate" class="confirm-btn" :class="'bg-' + themeColor.name">确定</button>
			</view>
		</view>
		<rf-kefu></rf-kefu>
	</view>
</template>
<script>
import moment from '@/common/moment';
import mConstData from '@/config/constData.config';
import rfNoData from '@/components/rf-no-data';
import { orderClose } from '@/api/product';
import uniTag from '@/components/uni-tag/uni-tag';
import rfKefu from '@/components/rf-kefu';
import {
	orderDetail,
	closeOrderRefundApply,
	orderCustomerRefundClose,
	orderDelete,
	orderTakeDelivery,
	orderInvoiceCreate
} from '@/api/userInfo';
import { configList } from '@/api/basic';
export default {
	components: {
		uniTag,
		rfKefu,
		rfNoData
	},
	data() {
		return {
			maskState: 0, // 优惠券面板显示状态
			orderDetail: {
        pickup: {}
			},
			logo: this.$mSettingConfig.appLogo,
			appName: this.$mSettingConfig.appName,
			invoiceItem: {},
			loading: true,
			errInfo: null,
			order_id: null,
			moneySymbol: this.moneySymbol,
			orderInvoiceContent: '',
			singleSkuText: this.singleSkuText
		};
	},
	computed: {
		orderTimeLine() {
			const timeLine = [];
			if (this.orderDetail.created_at !== '0') {
				timeLine.push({ time: this.orderDetail.created_at, value: '订单创建' });
			}
			if (
				this.orderDetail.close_time <
				(new Date().getTime() / 1000 && this.orderDetail.pay_time !== '0')
			) {
				timeLine.push({
					time: this.orderDetail.close_time,
					value: '未付款订单关闭时间'
				});
			}
			if (this.orderDetail.pay_time !== '0') {
				timeLine.push({ time: this.orderDetail.pay_time, value: '订单支付' });
			}
			if (this.orderDetail.shipping_time !== '0') {
				timeLine.push({
					time: this.orderDetail.shipping_time,
					value: '买家要求发货'
				});
			}
			if (this.orderDetail.consign_time !== '0') {
				timeLine.push({
					time: this.orderDetail.consign_time,
					value: '卖家发货'
				});
			}
			if (this.orderDetail.sign_time !== '0') {
				timeLine.push({
					time: this.orderDetail.sign_time,
					value: '买家确认收货'
				});
			}
			if (this.orderDetail.finish_time !== '0') {
				timeLine.push({
					time: this.orderDetail.finish_time,
					value: '订单完成'
				});
			}
			return timeLine.reverse();
		}
	},
	filters: {
		time(val) {
			return moment(val * 1000).format('YYYY-MM-DD HH:mm:ss');
		},
		orderStatusFilter(orderStatus) {
			let state = null;
			mConstData.orderStatus.forEach(orderItem => {
				if (orderItem.key === parseInt(orderStatus, 10)) {
					state = orderItem.value;
				}
			});
			return state;
		},
		filterProductStatus(item) {
			let status = null;
			if (
				parseInt(item.refund_status, 10) !== 0 &&
				parseInt(item.refund_status, 10) !== -1 &&
				parseInt(item.refund_status, 10) !== -2
			) {
				mConstData.refundStatus.forEach(refundItem => {
					if (refundItem.key === parseInt(item.refund_status, 10)) {
						status = refundItem.value;
					}
				});
			} else if (parseInt(item.order_status, 10) === 4) {
				mConstData.evaluateStatus.forEach(evaluateItem => {
					if (evaluateItem.key === parseInt(item.is_evaluate, 10)) {
						status = evaluateItem.value;
					}
				});
			} else {
				mConstData.orderStatus.forEach(orderItem => {
					if (orderItem.key === parseInt(item.order_status, 10)) {
						status = orderItem.value;
					}
				});
				// 有物流信息则说明已发货
				if (item.order_status === '1' && item.shipping_status === '1') {
					status = '已发货';
				}
			}
			return status;
		},
		filterShippingType(value) {
			const data = ['', '物流配送', '买家自提', '本地配送'];
			return data[parseInt(value, 10)];
		}
	},
	onLoad(options) {
		this.order_id = options.id;
	},
	onShow() {
		this.initData();
	},
	methods: {
		// 监听发票内容发生改变
		handleInvoiceContentChange(e) {
			this.orderInvoiceContent = e.detail.value;
		},
		// 显示优惠券面板
		toggleMask(type) {
			let timer = type === 'show' ? 10 : 300;
			let state = type === 'show' ? 1 : 0;
			this.maskState = 2;
			setTimeout(() => {
				this.maskState = state;
			}, timer);
		},
    stopPrevent() {
    },
		// 订单号复制
		copy(content) {
			/* #ifdef H5 */
			this.$mHelper.h5Copy(content);
			/* #endif */
			/* #ifndef H5 */
			uni.setClipboardData({
				data: content,
				success: function() {
					this.$mHelper.toast('复制成功');
				}
			});
			/* #endif */
		},
		navTo(route) {
			this.$mRouter.push({ route });
		},
		navToEvaluation(item, type) {
			this.$mRouter.push({
				route: `/pages/order/evaluation/evaluation?data=${JSON.stringify(
					item
				)}&type=${type}`
			});
		},
		navToRefund(item, type) {
			this.$mRouter.push({
				route: `/pages/order/refund/refund?data=${JSON.stringify(
					item
				)}&refundType=${type}`
			});
		},
		navToShippingReturn(item) {
			this.$mRouter.push({
				route: `/pages/order/shipping/return?data=${JSON.stringify(item)}`
			});
		},
		// 订单操作
		handleOrderOperation(item, type) {
			switch (type) {
				case 'detail': // 订单详情
					this.navTo(`/pages/order/detail?id=${item.id}`);
					break;
				case 'evaluation': // 我要评价
					this.navTo(`/pages/order/evaluation/evaluation?order_id=${item.id}`);
					break;
				case 'close': // 取消订单
					this.handleOrderClose(item.id);
					break;
				case 'delete': // 删除订单
					this.handleOrderDelete(item.id);
					break;
				case 'shipping': // 查看物流
					this.navTo(`/pages/order/shipping/shipping?id=${item.id}`);
					break;
				case 'delivery': // 确认收货
					this.handleOrderTakeDelivery(item.id);
					break;
			}
		},
		// 初始化数据
		initData() {
			this.getOrderDetail();
		},
		// 获取订单详情
		async getOrderDetail() {
			await this.$http
				.get(`${orderDetail}`, {
					id: this.order_id
				})
				.then(r => {
					this.loading = false;
					this.orderDetail = r.data;
					if (this.invoiceItem.id && !this.orderDetail.invoice) {
            this.$http.get(configList, { field: 'order_invoice_content' }).then(r => {
              if (r.data.order_invoice_content) {
                this.invoiceItem.invoiceContentArr = r.data.order_invoice_content.split(',');
                this.orderInvoiceContent = this.invoiceItem.invoiceContentArr[0];
                this.toggleMask('show');
              } else {
                this.invoiceItem.invoiceContentArr = [];
                this.$mHelper.toast('请联系管理员配置发票类型');
              }
            });
					}
				})
				.catch(err => {
					this.loading = false;
					this.errInfo = err;
				});
		},
		async handleOrderInvoiceCreate() {
			await this.$http.post(orderInvoiceCreate, {
				order_id: this.orderDetail.id,
				invoice_id: this.invoiceItem.id,
				invoice_content: this.orderInvoiceContent
			}).then(() => {
				this.toggleMask();
				this.getOrderDetail();
			});
		},
		// 取消订单
		async handleOrderClose(id) {
			await this.$http
				.get(`${orderClose}`, {
					id
				})
				.then(() => {
					this.$mHelper.toast('订单取消成功');
					this.getOrderDetail();
				});
		},
		// 删除已关闭订单
		async handleOrderDelete(id) {
			await this.$http.delete(`${orderDelete}?id=${id}`, {}).then(() => {
				this.$mHelper.toast('订单删除成功');
				this.$mRouter.back();
			});
		},
		// 确认收货
		async handleOrderTakeDelivery(id) {
			await this.$http
				.get(`${orderTakeDelivery}`, {
					id
				})
				.then(() => {
					this.$mHelper.toast('确认收货成功');
					this.getOrderDetail();
				});
		},
		// 产品退款/退货关闭申请
		async handleCloseOrderRefundApply(status, id) {
      uni.showModal({
				content: '取消退款后将无法再次提交申请，是否继续取消退款?',
				success: async e => {
					if (e.confirm) {
            let closeOrderApi = closeOrderRefundApply;
						if (parseInt(status, 10) === 4) {
							closeOrderApi = orderCustomerRefundClose;
						}
						await this.$http
							.post(`${closeOrderApi}`, {
								id
							})
							.then(r => {
								this.$mHelper.toast('取消成功');
								this.getOrderDetail();
							});
					}
				}
			});
		}
	}
};
</script>
<style lang="scss" scoped>
page {
	background: $page-color-base;
}
.order-detail {
	padding-bottom: 100upx;
}
.rf-goods-section {
	.g-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		.title {
			display: flex;
			align-items: center;
			justify-content: space-between;
			.cover {
				width: 48upx;
				height: 48upx;
				border-radius: 50%;
				margin-right: 10upx;
			}
		}
	}
	.g-item {
		border-bottom: 1upx solid rgba(0, 0, 0, 0.1);
	}
	.g-item:last-child {
		border-bottom: none;
	}
	.right {
		.price-box {
			display: flex;
			align-items: center;
			justify-content: space-between;
			color: $font-color-dark;
			border-bottom: 1upx solid rgba(0, 0, 0, 0.05);

			.price-wrapper {
				margin-bottom: 10upx;
				flex: 1;

				.price {
					font-size: $font-sm;
					margin-bottom: 4upx;
				}

				.number {
					font-size: $font-sm;
					color: $font-color-base;
					margin-left: $font-sm;
				}
				.original-price {
					font-size: $font-sm;
					color: $font-color-light;
					margin-left: $spacing-sm;
					text-decoration: line-through;
				}
			}

			.status {
				font-size: 24upx;
				margin-left: $spacing-sm;
			}

			.spec-color {
				color: $font-color-spec;
			}
		}
		.btn-box {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			margin: $spacing-sm 0;
			.action-btn {
				font-size: $font-sm;
				margin: 0 0 0 15upx;
				padding: 0 28upx;
				color: $font-color-base;
				text-align: center;
				height: 50upx;
				border-radius: 32upx;
				line-height: 50upx;
				border: 1upx solid rgba(0, 0, 0, 0.15);
			}
		}
	}
}
.yt-list {
	margin-top: 16upx;
	background: #fff;

	.yt-list-cell {
		display: flex;
		align-items: center;
		padding: 10upx 30upx 10upx 40upx;
		line-height: 70upx;
		position: relative;

		&.cell-hover {
			background: #fafafa;
		}

		&.b-b:after {
			left: 30upx;
		}

		.cell-icon {
			height: 32upx;
			width: 32upx;
			font-size: 22upx;
			text-align: center;
			line-height: 32upx;
			border-radius: 4upx;
			margin-right: 12upx;

			&.hb {
				background: #ffaa0e;
			}

			&.lpk {
				background: #3ab54a;
			}
		}

		.cell-more {
			align-self: center;
			font-size: 24upx;
			color: $font-color-light;
			margin-left: 8upx;
			margin-right: -10upx;
		}

		.cell-tit {
			flex: 1;
			font-size: 26upx;
			color: $font-color-light;
			margin-right: 10upx;
		}

		.cell-tip {
			font-size: 26upx;
			&.disabled {
				color: $font-color-light;
			}
		}

		&.desc-cell {
			.cell-tit {
				max-width: 90upx;
			}
		}

		.desc {
			flex: 1;
			font-size: $font-base;
			color: $font-color-dark;
		}

		.copy {
			margin-left: $spacing-sm;
		}
	}
}
.uni-timeline {
	padding: $spacing-lg;
	background-color: $color-white;
}
.footer {
	position: fixed;
	left: 0;
	bottom: 0;
	z-index: 98;
	width: 100%;
	background-color: $color-white;
	color: $font-color-base;
	box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.1);
	display: flex;
	justify-content: flex-end;
	align-items: center;
	padding: 15upx $spacing-base;
	.action-btn {
		font-size: $font-sm;
		margin: 0 0 0 15upx;
		padding: 0 $spacing-lg;
		text-align: center;
		height: 60upx;
		line-height: 60upx;
	}
}
.rf-no-data {
	height: calc(100vh - 90upx);
}
.pickup-tag {
	margin-right: $spacing-sm;
}
/* 优惠券面板 */
.mask {
	display: flex;
	align-items: flex-end;
	position: fixed;
	left: 0;
	top: var(--window-top);
	bottom: 0;
	width: 100%;
	background: rgba(0, 0, 0, 0);
	z-index: 99;
	transition: 0.3s;
	.mask-content {
		width: 100%;
		max-height: 70vh;
		min-height: 16vh;
		background: #f3f3f3;
		transform: translateY(100%);
		transition: 0.3s;
		overflow-y: scroll;
		.sub-list {
			padding: $spacing-lg;
			.radio-wrapper {
				display: flex;
				justify-content: space-between;
			}
			.title {
				width: 300upx;
			}
			.invoice-content {
				.invoice-content-item-radio {
					margin: 0 $spacing-sm $spacing-sm $spacing-base;
				}
			}
		}
		.confirm-btn {
			margin: $spacing-base auto $spacing-lg;
		}
	}
	&.none {
		display: none;
	}
	&.show {
		background: rgba(0, 0, 0, 0.4);

		.mask-content {
			transform: translateY(0);
		}
	}
}
</style>
