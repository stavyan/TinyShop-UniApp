<template>
	<view
		class="coupon-detail"
		:style="{ backgroundColor: couponList.length === 0 ? '#fff' : '' }"
	>
		<!-- 优惠券详情 -->
		<view
			class="sub-list valid"
			:style="{ marginTop: state === 3 ? '40upx' : 0 }"
		>
			<view class="row" v-for="(row, index) in couponList" :key="index">
				<!-- content -->
				<view class="carrier">
					<view class="left">
						<view class="in1line title">
							<text class="cell-icon">{{
								parseInt(row.range_type, 10) === 2 ? '限' : '全'
							}}</text>
							{{ row.title }}
						</view>
						<view class="term" v-if="state !== 2">
							{{ row.start_time | time }} ~ {{ row.end_time | time }}
						</view>
						<view class="term" v-else>
							使用时间：{{ row.use_time | timeFull }}
						</view>
						<view class="icon shixiao" v-if="state === 3" />
						<view class="used" v-if="state === 2">已使用</view>
						<view class="usage">
							{{
								parseInt(row.max_fetch, 10) === 0
									? '不限'
									: `每人限领 ${row.max_fetch}`
							}}
							总领取 {{ row.get_count }}
							<text v-if="row.percentage">剩余{{ row.percentage }}%</text>
						</view>
					</view>
					<view class="right" :class="{ invalid: state !== 1 }">
						<view class="ticket">
							<view class="num">
								{{ row.money ? moneySymbol + row.money : row.discount + '折' }}
							</view>
						</view>
						<view class="criteria"> 满{{ row.at_least }}使用 </view>
						<view class="btn-group">
							<view
								class="use view"
								@tap="show(row)"
								v-if="parseInt(row.range_type, 10) === 2"
							>
								商品
							</view>
							<view class="use" @tap="getCoupon(row)">
								领取
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<uni-drawer
			class="rf-drawer"
			:visible="showRight"
			mode="right"
			@close="closeDrawer()"
		>
			<view class="rf-drawer-title">可用商品列表</view>
			<view class="rf-drawer-list">
				<view
					class="rf-drawer-item"
					@tap="navTo(`/pages/product/product?id=${item.id}`)"
					v-for="item in currentCoupon.usableProduct"
					:key="item.id"
				>
					<view class="left">
						<view class="title">{{
							item.name
								.split('】')[0]
								.split('【')
								.join('')
						}}</view>
						<text class="desc in2line">{{ item.name.split('】')[1] }}</text>
					</view>
					<text class="iconfont iconyou"></text>
				</view>
			</view>
			<view class="close">
				<button
					class="btn"
					plain="true"
					size="small"
					type="primary"
					@tap="hide"
				>
					关闭
				</button>
			</view>
		</uni-drawer>

		<rf-empty
			:info="'暂无优惠券'"
			v-if="couponList.length === 0 && !loading"
		></rf-empty>
		<!--加载动画-->
		<rfLoading isFullScreen :active="loading"></rfLoading>
	</view>
</template>

<script>
/**
 * @des 优惠券详情
 *
 * @author stav stavyan@qq.com
 * @date 2019-12-09 10:13
 * @copyright 2019
 */
import { couponDetail, couponReceive } from '@/api/userInfo';
import moment from '@/common/moment';
import uniDrawer from '@/components/uni-drawer/uni-drawer';
export default {
	components: {
		uniDrawer
	},
	data() {
		return {
			headerTop: 0,
			// 控制滑动效果
			typeClass: 'valid',
			theIndex: null,
			oldIndex: null,
			state: 1,
			isStop: false,
			couponList: [],
			loadingType: 'more',
			token: null,
			page: 1,
			showRight: false,
			currentCoupon: {},
			moneySymbol: this.moneySymbol,
			loading: true
		};
	},
	filters: {
		time(val) {
			return moment(val * 1000).format('YYYY-MM-DD');
		},
		timeFull(val) {
			return moment(val * 1000).format('YYYY-MM-DD HH:mm:ss');
		}
	},
	onLoad(options) {
		this.initData(options);
	},
	methods: {
		show(item) {
			if (item.usableProduct.length === 0) return;
			this.currentCoupon = item;
			this.showRight = true;
		},
		hide() {
			this.showRight = false;
		},
		closeDrawer() {
			this.showRight = false;
		},
		// 初始化数据
		initData(options) {
			this.getMyCouponDetail(options.id);
		},
		// 获取优惠券
		async getCoupon(item) {
			if (!this.$mStore.getters.hasLogin) {
				this.$mHelper.toast('请您先登录！');
				return;
			}
			if (parseInt(item.is_get, 10) === 0) {
				this.$mHelper.toast('该优惠券暂不可领取！');
				return;
			}
			await this.$http
				.post(`${couponReceive}`, {
					id: item.id
				})
				.then(() => {
					this.$mHelper.toast('领取成功');
					setTimeout(() => {
						this.couponList = [];
						this.getMyCouponDetail(item.id);
					}, 1.5 * 1000);
				});
		},
		// 统一跳转接口
		navTo(route) {
			this.$mRouter.push({ route });
		},
		// 获取我的收货地址列表
		async getMyCouponDetail(id) {
			await this.$http
				.get(`${couponDetail}`, {
					id
				})
				.then(r => {
					this.loading = false;
					this.couponList.push(r.data);
				})
				.catch(() => {
					this.loading = false;
				});
		}
	}
};
</script>
<style lang="scss">
.list {
	display: flex;
	width: 100%;
	position: relative;
}
.sub-list {
	width: 100%;
	padding-top: 10upx;
	.row {
		width: 92%;
		height: 24vw;
		margin: 10upx auto;
		border-radius: 8upx;
		align-items: center;
		position: relative;
		overflow: hidden;
		z-index: 4;
		border: 0;
		.carrier {
			background-color: #fff;
			position: absolute;
			width: 100%;
			padding: 0 0;
			height: 100%;
			z-index: 3;
			display: flex;
			.left {
				flex: 1;
				.title {
					padding-top: 3vw;
					width: 90%;
					margin: 0 5%;
					font-size: 36upx;
					.cell-icon {
						display: inline-block;
						height: 32upx;
						margin-top: 15upx;
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
				}
				.term {
					width: 90%;
					margin: 0 5%;
					font-size: 26upx;
					color: #999;
				}
				.usage {
					width: 90%;
					margin: 0 5%;
					font-size: 26upx;
					color: $font-color-light;
				}
				position: relative;
				.gap-top,
				.gap-bottom {
					position: absolute;
					width: 20upx;
					height: 20upx;
					right: -10upx;
					border-radius: 100%;
					background-color: #f5f5f5;
				}
				.gap-top {
					top: -10upx;
				}
				.gap-bottom {
					bottom: -10upx;
				}
				.used {
					position: absolute;
					right: 10upx;
					bottom: 5upx;
					font-size: $font-sm;
					color: $base-color;
				}
				.shixiao {
					position: absolute;
					right: 0;
					top: -20upx;
					font-size: 150upx;
					z-index: 6;
					color: rgba(153, 153, 153, 0.2);
				}
			}
			.right {
				width: 28%;
				color: #fff;
				text-align: center;
				background: linear-gradient(
					to right,
					rgba(250, 67, 106, 0.72),
					rgba(250, 67, 106, 0.64)
				);
				.ticket,
				.criteria {
					width: 100%;
				}
				.ticket {
					padding-top: 20upx;
					.num {
						font-size: $font-lg + 12upx;
						font-weight: 600;
						line-height: 1.2;
					}
					.unit {
						font-size: 24upx;
					}
				}
				.criteria {
					font-size: $font-base;
				}
				.btn-group {
					display: flex;
					justify-content: space-between;
					align-items: center;
					.use {
						flex: 1;
						margin: 0 6upx;
						height: 40upx;
						justify-content: center;
						align-items: center;
						font-size: 24upx;
						background-color: #fff;
						color: $base-color;
						border-radius: 40upx;
						padding: 0 4upx;
					}
				}
			}
		}
	}
}
.drawer {
	.close {
		.btn {
			width: 320upx;
			height: 76upx;
			line-height: 76upx;
			border-radius: 50px;
			margin-top: 70upx;
			background: $uni-color-primary;
			color: #fff;
			font-size: $font-lg;
			border: none;
			&:after {
				border-radius: 100px;
			}
		}
	}
}
</style>
