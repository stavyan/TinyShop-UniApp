<template>
	<view>
		<navigator url="/pages/address/address?source=1" class="address-section">
			<view class="order-content">
				<text class="yticon icon-shouhuodizhi"></text>
				<view v-if="addressData" class="cen">
					<view class="top">
						<text class="name">{{addressData.realname}}</text>
						<text class="mobile">{{addressData.mobile}}</text>
					</view>
					<text class="address">{{ addressData.address_name }} {{addressData.address_details}}</text>
				</view>
				<view class="no-default-address" v-else>
					请选择收货地址
				</view>
				<text class="yticon icon-you"></text>
			</view>
			<image class="a-bg" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAAFCAYAAAAaAWmiAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Rjk3RjkzMjM2NzMxMTFFOUI4RkU4OEZGMDcxQzgzOEYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Rjk3RjkzMjQ2NzMxMTFFOUI4RkU4OEZGMDcxQzgzOEYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGOTdGOTMyMTY3MzExMUU5QjhGRTg4RkYwNzFDODM4RiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGOTdGOTMyMjY3MzExMUU5QjhGRTg4RkYwNzFDODM4RiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrEOZlQAAAiuSURBVHjazJp7bFvV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"></image>
		</navigator>

		<view class="goods-section">
			<view class="g-header b-b">
				<!--<image class="logo" src="http://duoduo.qibukj.cn/./Upload/Images/20190321/201903211727515.png"></image>-->
				<text class="name">商品列表</text>
			</view>
			<!-- 商品列表 -->
			<view class="g-item" v-for="item in orderDetail.products">
				<image :src="item.product_picture" mode="aspectFill"></image>
				<view class="right">
					<text class="title clamp">{{ item.product_name }}</text>
					<text class="spec">{{ item.sku_name || '基础款' }}</text>
					<view class="price-box">
						<text class="price">￥ {{item.price}}</text>
						<text class="number"> * {{ item.num }}</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 优惠明细 -->
		<view class="yt-list">
			<view class="yt-list-cell b-b" @click="toggleMask('show')">
				<view class="cell-icon">
					券
				</view>
				<text class="cell-tit clamp">优惠券</text>
				<text class="cell-tip active">
					{{ couponItem.title || '选择优惠券' }}
				</text>
				<text class="cell-more wanjia wanjia-gengduo-d"></text>
			</view>
			<view class="yt-list-cell b-b" @click="showSinglePicker" v-show="parseInt(orderDetail.is_logistics, 10) === 1">
				<view class="cell-icon">
					寄
				</view>
				<text class="cell-tit clamp">配送方式</text>
				<text class="cell-tip active">
					{{ currentShippingType.label || '选择配送方式' }}
				</text>
				<text class="cell-more wanjia wanjia-gengduo-d"></text>
			</view>
			<view class="yt-list-cell b-b" @click="showCompanylePicker" v-show="parseInt(currentShippingType.value, 10) === 1">
				<view class="cell-icon">
					司
				</view>
				<text class="cell-tit clamp">快递公司</text>
				<text class="cell-tip active">
					{{ currentCompany.label || '选择快递公司' }}
				</text>
				<text class="cell-more wanjia wanjia-gengduo-d"></text>
			</view>
			<!--<view class="yt-list-cell b-b">-->
				<!--<view class="cell-icon hb">-->
					<!--减-->
				<!--</view>-->
				<!--<text class="cell-tit clamp">商家促销</text>-->
				<!--<text class="cell-tip disabled">暂无可用优惠</text>-->
			<!--</view>-->
			<view class="yt-list-cell b-b">
				<view class="cell-icon hb">
					减
				</view>
				<text class="cell-tit clamp">可用{{ maxUsePoint }}积分抵用{{ maxUsePointFee }}元</text>
				<text class="cell-tip disabled"></text>
				<text class="cell-tip disabled" v-if="!orderDetail && pointConfig.is_open">暂无可用</text>
				<view class="cell-tip red" v-else>
						<label class="radio">
							<radio siza="mini" color="#fa436a" @click="handleIsUsePoint" :disabled="isUsePointDisabled" :checked="isUsePoint" />
						</label>
				</view>
			</view>
		</view>
		<!-- 金额明细 -->
		<view class="yt-list">
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">商品金额</text>
				<text class="cell-tip red">￥{{ amountGoods }}</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">优惠金额</text>
				<text class="cell-tip red">-￥ {{ discountAmount }}</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">运费</text>
				<text class="cell-tip red">
					<text>￥ {{ shippingMoney }}</text>
				</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">发票税费</text>
				<text class="cell-tip red">
					<text>￥ {{ invoiceAmount }}</text>
				</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">赠送积分</text>
				<text class="cell-tip">
					<text>{{ orderDetail.preview && orderDetail.preview.give_point }} 积分</text>
				</text>
			</view>
			<navigator url="/pages/invoice/invoice?source=1">
				<view class="yt-list-cell b-b">
					<text class="cell-tit clamp">开具发票</text>
					<text class="cell-tip">
						<text v-if="invoiceItem.type">{{ `电子发票 - ${parseInt(invoiceItem.type, 10) === 1 ? '公司' : '个人'} - ${invoiceItem.title}` }}</text>
						<text v-else>本次不开具发票</text>
					</text>
				</view>
			</navigator>
			<view class="yt-list-cell desc-cell">
				<text class="cell-tit clamp">备注</text>
				<input class="desc" type="text" v-model="desc" placeholder="请填写备注信息" placeholder-class="placeholder" />
			</view>
		</view>

		<!-- 底部 -->
		<view class="footer">
			<view class="price-content">
				<text>实付款</text>
				<text class="price-tip">￥</text>
				<text class="price">{{ realAmount }}</text>
			</view>
			<text class="submit" @click="submit">提交订单</text>
		</view>

		<!-- 优惠券面板 -->
		<view class="mask" :class="maskState===0 ? 'none' : maskState===1 ? 'show' : ''" @click="toggleMask">
			<view class="mask-content" @click.stop.prevent="stopPrevent">
				<!-- 优惠券页面，仿mt -->
				<view class="coupon-item" v-for="(item,index) in orderDetail.coupons" :key="index">
					<view class="con">
						<view class="left" @click="selectCoupon(item)">
							<text class="title">{{item.title}}</text>
							<text class="time">有效期 {{ item.start_time | time }} - {{ item.end_time | time }}</text>
						</view>
						<view class="right">
							<text class="price" v-if="parseInt(item.couponType.type, 10) === 1">{{item.money}}</text>
							<text class="price-discount" v-else>{{item.discount / 10}}折</text>
							<text>满{{ item.at_least }}可用</text>
						</view>

						<view class="circle l"></view>
						<view class="circle r"></view>
					</view>
					<view class="tips">
							<text v-show="item.range_type && item.max_fetch">
								{{ parseInt(item.range_type, 10) === 0 ? '部分产品使用' : '全场产品使用' }}  领取上限{{item.max_fetch}}
							</text>
						 	<text>
								{{ parseInt(item.term_of_validity_type, 10) === 0 ? '固定时间' : '领取之日起' }}生效
							</text>
					</view>
				</view>
				<text class="no-coupon" v-if="orderDetail.coupons && orderDetail.coupons.length === 0">暂无优惠券</text>
			</view>
		</view>
		<mpvue-picker
				themeColor="#fa436a"
				ref="shippingTypePicker"
				mode="selector"
				:deepLength="1"
				@onConfirm="onConfirm"
				:pickerValueArray="pickerShippingType" />
		<mpvue-picker
			themeColor="#fa436a"
			ref="companyTypePicker"
			mode="selector"
			:deepLength="1"
			@onConfirm="onCompanyConfirm"
			:pickerValueArray="orderDetail.company" />
	</view>
</template>

<script>
	import {orderCreate, orderFreightFee, orderPreview} from "../../api/product";
	import empty from "@/components/empty";
	import mpvuePicker from '@/components/mpvue-picker/mpvuePicker';
	import moment from 'moment';
	export default {
		components: {
			mpvuePicker,
			empty
		},
		data() {
			return {
				maskState: 0, //优惠券面板显示状态
				desc: '', //备注
				payType: 1, //1微信 2支付宝
				orderDetail: {},
				loadingType: 'more', //加载更多状态
				pickerShippingType: [
					{ label: '物流配送', value: 1 },
					{ label: '买家自提', value: 2 }
				],
				currentShippingType: {},
				currentCompany: {},
				cartIds: null,
				invoiceItem: {},
				addressData: {},
				couponItem: {},
				pointConfig: {},
				product: null,
				shippingMoney: 0,
				isUsePoint: false,
				isUsePointDisabled: true,
				data: {}
			}
		},
		computed: {
			amountGoods(){
				let amount = 0;
				this.orderDetail.products && this.orderDetail.products.forEach(item => {
					amount += parseInt(item.num, 10) * parseFloat(item.price)
				});
				return amount;
			},
			discountAmount() {
				return parseInt(this.couponItem.type, 10) === 2 ? ((100 - this.couponItem.discount) / 100 * this.amountGoods).toFixed(2) : this.couponItem.money || 0;
			},
			realAmount(){
				const realAmount = this.amountGoods - this.discountAmount + this.shippingMoney - (this.isUsePoint ? this.maxUsePointFee : 0)
				return (parseFloat(this.invoiceAmount) + realAmount).toFixed(2) || 0;
			},
		  invoiceAmount () {
				  const realAmount = this.amountGoods - this.discountAmount - (this.isUsePoint ? this.maxUsePointFee : 0);
				  return this.invoiceItem.type ? (this.orderDetail.invoice.order_invoice_tax / 100 * realAmount).toFixed(2) : 0;
		  },
			maxUsePoint() {
				return this.orderDetail.max_use_point > uni.getStorageSync('userInfo').account.user_integral
						? uni.getStorageSync('userInfo').account.user_integral : this.orderDetail.max_use_point;
			},
			maxUsePointFee() {
				return this.maxUsePoint * this.pointConfig.convert_rate;
			}
		},
		filters: {
			time(val) {
				return moment(val * 1000).format('YY/MM/DD HH:mm')
			}
		},
		onShow() {
			// this.getOrderFreightFee();
		},
		onLoad(options){
			this.initData(options);
		},
		methods: {
			handleIsUsePoint () {
				const pointExchangeType = [];
				this.orderDetail.products.forEach(item => {
					pointExchangeType.push(item.point_exchange_type)
				});
				if (pointExchangeType.join(',').indexOf('1') !== -1) {
					uni.showToast({title: '本单不支持积分抵扣', icon: "none"});
					return;
				} else {
					this.isUsePointDisabled = false;
					this.isUsePoint = !this.isUsePoint;
				}
			},
			/**
			 *@des 单列物流
			 *@author stav stavyan@qq.com
			 *@blog https://stavtop.club
			 *@date 2019/11/26 16:14:05
			 */
			showSinglePicker() {
				this.$refs.shippingTypePicker.show()
			},
			/**
			 *@des 选择快递公司
			 *@author stav stavyan@qq.com
			 *@blog https://stavtop.club
			 *@date 2019/11/29 17:28:22
			 */
			showCompanylePicker() {
				this.$refs.companyTypePicker.show()
			},
			onConfirm(e) {
				this.currentShippingType = e;
			},
			async onCompanyConfirm(e) {
				e.value = e.value[0]
        this.currentCompany = e;
				this.getOrderFreightFee();
      },
			/**
			 *@des 计算运费
			 *@author stav stavyan@qq.com
			 *@blog https://stavtop.club
			 *@date 2019/12/02 10:43:11
			 */
			async getOrderFreightFee() {
				uni.showLoading({title: '加载中...'});
				const params = {};
				if (this.addressData) {
					params.address_id = this.addressData.id;
				}
				if (this.currentCompany) {
					params.company_id = this.currentCompany.value;
				}
				await this.$get(`${orderFreightFee}`, {
					...params,
					...this.data
				}).then(r => {
					if (r.code === 200) {
						this.shippingMoney = r.data.shipping_money;
					} else {
						uni.showToast({title: r.message, icon: "none"});
					}
				}).catch(err => {
					console.log(err)
				})
			},
			/**
			 *@des 初始化数据
			 *@author stav stavyan@qq.com
			 *@blog https://stavtop.club
			 *@date 2019/11/19 13:44:25
			 */
			async initData(options) {
				this.data = await JSON.parse(options.data)
				await this.getOrderDetail(this.data);
				// this.getOrderFreightFee();
			},
			async getOrderDetail(data) {
				await this.$get(`${orderPreview}`, {
					...data
				}).then(r => {
					if (r.code === 200) {
						this.orderDetail = r.data;
						this.pointConfig = this.orderDetail.point_config
						this.addressData = this.orderDetail.address;
						this.currentShippingType = this.pickerShippingType[0]
						this.orderDetail.company.forEach(item => {
							item.label = item.title;
							item.value = item.id;
						});
						this.currentCompany = this.orderDetail.company[0];
					} else {
						uni.showToast({title: r.message, icon: "none"});
					}
				}).catch(err => {
					console.log(err)
				});
			},
			/**
			 *@des 优惠券面板 切换
			 *@author stav stavyan@qq.com
			 *@blog https://stavtop.club
			 *@date 2019/11/26 15:23:08
			 */
			toggleMask(type){
				let timer = type === 'show' ? 10 : 300;
				let	state = type === 'show' ? 1 : 0;
				this.maskState = 2;
				setTimeout(()=>{
					this.maskState = state;
				}, timer)
			},
			numberChange(data) {
				this.number = data.number;
			},
			changePayType(type){
				this.payType = type;
			},
			async submit() {
				uni.showLoading({title: '加载中...'});
				const params = {};
				if (this.addressData && this.addressData.id) {
				params.address_id = this.addressData.id;
				}
				if (this.couponItem && this.couponItem.id) {
					params.coupon_id = this.couponItem.id;
				}
				if (this.invoiceItem && this.invoiceItem.id) {
					params.invoice_id = this.invoiceItem.id;
				}
				if (this.currentCompany.value) {
					params.company_id = this.currentCompany.value;
				}
				if (this.currentShippingType.value) {
					params.shipping_type = this.currentShippingType.value;
				}
				await this.$post(`${orderCreate}`, {
					...params,
					...this.data
				}).then(r => {
					if (r.code === 200) {
						const data = {}
						data.order_id = parseInt(r.data.id, 10);
						if (parseInt(r.data.pay_status, 10) === 1) {
              uni.redirectTo({
                url: '/pages/money/paySuccess'
              });
            } else {
              uni.redirectTo({
                url: `/pages/money/pay?data=${JSON.stringify(data)}&money=${this.realAmount}`
              })
            }
					} else {
						uni.showToast({title: r.message, icon: "none"});
					}
				}).catch(err => {
					console.log(err)
				})
			},
			stopPrevent(){
			},
			selectCoupon(item){
				if (this.amountGoods < item.at_least) {
					uni.showToast({ title: '不满足优惠券使用条件~', icon: "none" });
					return;
				}
				this.maskState = 0;
				this.couponItem = item;
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: $page-color-base;
		padding-bottom: 100upx;
	}

	.address-section {
		padding: 30upx 0;
		background: #fff;
		position: relative;

		.order-content {
			display: flex;
			align-items: center;
		}

		.no-default-address {
			color: #333;
			font-size: 32upx;
		}

		.icon-shouhuodizhi {
			flex-shrink: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 90upx;
			color: #888;
			font-size: 44upx;
		}

		.cen {
			display: flex;
			flex-direction: column;
			flex: 1;
			font-size: 28upx;
			color: $font-color-dark;
		}

		.name {
			font-size: 34upx;
			margin-right: 24upx;
		}

		.address {
			margin-top: 16upx;
			margin-right: 20upx;
			color: $font-color-light;
		}

		.icon-you {
			font-size: 32upx;
			color: $font-color-light;
			margin-right: 30upx;
		}

		.a-bg {
			position: absolute;
			left: 0;
			bottom: 0;
			display: block;
			width: 100%;
			height: 5upx;
		}
	}

	.goods-section {
		margin-top: 16upx;
		background: #fff;
		padding-bottom: 1px;

		.g-header {
			display: flex;
			align-items: center;
			height: 84upx;
			padding: 0 30upx;
			position: relative;
		}

		.logo {
			display: block;
			width: 50upx;
			height: 50upx;
			border-radius: 100px;
		}

		.name {
			font-size: 30upx;
			color: $font-color-base;
			margin-left: 24upx;
		}

		.g-item {
			display: flex;
			margin: 20upx 30upx;
			image {
				flex-shrink: 0;
				display: block;
				width: 180upx;
				height: 150upx;
				border-radius: 4upx;
			}

			.right {
				flex: 1;
				padding-left: 24upx;
				overflow: hidden;
			}

			.title {
				font-size: 30upx;
				color: $font-color-dark;
			}

			.spec {
				font-size: 26upx;
				color: $font-color-light;
			}

			.price-box {
				display: flex;
				align-items: center;
				font-size: 32upx;
				color: $font-color-dark;
				padding-top: 10upx;

				.price {
					margin-bottom: 4upx;
				}
				.number{
					font-size: 26upx;
					color: $font-color-base;
					margin-left: 20upx;
				}
			}

			.step-box {
				position: relative;
			}
		}
	}
	.yt-list {
		margin-top: 16upx;
		background: #fff;
	}

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
			color: #fff;
			text-align: center;
			line-height: 32upx;
			background: #f85e52;
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
			color: $font-color-dark;

			&.disabled {
				color: $font-color-light;
			}

			&.active {
				color: $base-color;
			}
			&.red{
				color: $base-color;
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
	}

	/* 支付列表 */
	.pay-list{
		padding-left: 40upx;
		margin-top: 16upx;
		background: #fff;
		.pay-item{
			display: flex;
			align-items: center;
			padding-right: 20upx;
			line-height: 1;
			height: 110upx;
			position: relative;
		}
		.icon-weixinzhifu{
			width: 80upx;
			font-size: 40upx;
			color: #6BCC03;
		}
		.icon-alipay{
			width: 80upx;
			font-size: 40upx;
			color: #06B4FD;
		}
		.icon-xuanzhong2{
			display: flex;
			align-items: center;
			justify-content: center;
			width: 60upx;
			height: 60upx;
			font-size: 40upx;
			color: $base-color;
		}
		.tit{
			font-size: 32upx;
			color: $font-color-dark;
			flex: 1;
		}
	}

	.footer{
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 995;
		display: flex;
		align-items: center;
		width: 100%;
		height: 90upx;
		justify-content: space-between;
		font-size: 30upx;
		background-color: #fff;
		z-index: 998;
		color: $font-color-base;
		box-shadow: 0 -1px 5px rgba(0,0,0,.1);
		.price-content{
			padding-left: 30upx;
		}
		.price-tip{
			color: $base-color;
			margin-left: 8upx;
		}
		.price{
			font-size: 36upx;
			color: $base-color;
		}
		.submit{
			display:flex;
			align-items:center;
			justify-content: center;
			width: 280upx;
			height: 100%;
			color: #fff;
			font-size: 32upx;
			background-color: $base-color;
		}
	}

	/* 优惠券面板 */
	.mask{
		display: flex;
		align-items: flex-end;
		position: fixed;
		left: 0;
		top: var(--window-top);
		bottom: 0;
		width: 100%;
		background: rgba(0,0,0,0);
		z-index: 9995;
		transition: .3s;

		.mask-content{
			width: 100%;
			max-height: 70vh;
			min-height: 16vh;
			background: #f3f3f3;
			transform: translateY(100%);
			transition: .3s;
			overflow-y:scroll;
      .no-coupon {
        display: flex;
 	      justify-content: center;	/* 水平居中 */
        line-height: 16vh;
      }
		}
		&.none{
			display: none;
		}
		&.show{
			background: rgba(0,0,0,.4);

			.mask-content{
				transform: translateY(0);
			}
		}
	}

	/* 优惠券列表 */
	.coupon-item{
		display: flex;
		flex-direction: column;
		margin: 20upx 24upx;
		background: #fff;
		.con{
			display: flex;
			align-items: center;
			position: relative;
			height: 120upx;
			padding: 0 30upx;
			&:after{
				position: absolute;
				left: 0;
				bottom: 0;
				content: '';
				width: 100%;
				height: 0;
				border-bottom: 1px dashed #f3f3f3;
				transform: scaleY(50%);
			}
		}
		.left{
			display: flex;
			flex-direction: column;
			justify-content: center;
			flex: 1;
			overflow: hidden;
			height: 100upx;
		}
		.title{
			font-size: 32upx;
			color: $font-color-dark;
			margin-bottom: 10upx;
		}
		.time{
			font-size: 24upx;
			color: $font-color-light;
		}
		.right{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 26upx;
			color: $font-color-base;
			height: 100upx;
		}
		.price{
			font-size: 40upx;
			color: $base-color;
			&:before{
				content: '￥';
				font-size: 34upx;
			}
		}
		.price-discount {
			font-size: 36upx;
			color: $base-color;
		}
		.tips{
			font-size: 24upx;
			color: $font-color-light;
			line-height: 60upx;
			padding-left: 30upx;
		}
		.circle{
			position: absolute;
			left: -6upx;
			bottom: -10upx;
			z-index: 10;
			width: 20upx;
			height: 20upx;
			background: #f3f3f3;
			border-radius: 100px;
			&.r{
				left: auto;
				right: -6upx;
			}
		}
	}

</style>
