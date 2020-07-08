<template>
	<view class="my-coupon">
		<view>
			<!--顶部导航栏-->
			<view class="tabr" :style="{ top: headerTop }">
				<view :class="typeClass == 'valid' ? `text-${themeColor.name} on` : ''" @tap="switchType('valid', 1)"
					>可用
					<text v-if="state === 1">({{ couponList.length }})</text>
				</view>
				<view :class="typeClass == 'used' ? `text-${themeColor.name} on` : ''" @tap="switchType('used', 2)"
					>已使用
					<text v-if="state === 2">({{ couponList.length }})</text>
				</view>
				<view
					:class="typeClass == 'invalid' ? `text-${themeColor.name} on` : ''"
					@tap="switchType('invalid', 3)"
					>已失效
					<text v-if="state === 3">({{ couponList.length }})</text>
				</view>
				<view class="border" :class="[typeClass, 'bg-' + themeColor.name]"></view>
			</view>
			<!--占位符-->
			<view class="place"></view>
			<!--优惠券列表-->
			<view class="coupon-list">
				<view
					v-if="state === 3 && couponList.length > 0 && !loading"
					class="empty-invalid"
					:class="'text-' + themeColor.name"
					@tap.stop="emptyInvalidCoupon"
				>
					清空失效优惠券
				</view>
				<!-- 优惠券列表 -->
				<view
					class="sub-list valid"
					:style="{ marginTop: state === 3 ? '50upx' : 0 }"
				>
					<view class="row" v-for="(row, index) in couponList" :key="index">
						<!-- content -->
						<view class="carrier">
							<view class="left">
								<view class="in1line title">
									<text class="cell-icon" :class="'bg-' + themeColor.name">{{
										parseInt(row.couponType.range_type, 10) === 2 ? '限' : '全'
									}}</text>
									{{ row.title }}
								</view>
								<view class="term" v-if="state !== 2">
									{{ row.start_time | time }} ~ {{ row.end_time | time }}
								</view>
								<view class="term" v-else>
									使用时间：{{ row.use_time | timeFull }}
								</view>
								<view class="overdue" v-if="state === 3">
									<text class="iconfont iconyiguoqi2" :class="'text-' + themeColor.name"></text>
								</view>
								<view class="overdue" v-if="state === 2">
									<text class="iconfont iconyishiyong"></text>
								</view>
								<view class="usage">
									{{
										parseInt(row.couponType.max_fetch, 10) === 0
											? '不限'
											: `每人限领${row.couponType.max_fetch}`
									}}
									已领{{ row.couponType.get_count }}
									<text v-if="row.couponType.percentage"
										>剩余{{ row.couponType.percentage }}%</text
									>
								</view>
							</view>
							<view class="right" :class="state !== 1 ? 'invalid' : 'bg-' + themeColor.name">
								<view class="ticket">
									<view class="num">
										{{ row.type === '1' ? moneySymbol + row.money : (row.discount / 10) + '折' }}
									</view>
								</view>
								<view class="criteria"> 满{{ row.at_least }}使用 </view>
								<view
									class="use view"
									:class="'text-' + themeColor.name"
									@tap="show(row)"
									v-if="parseInt(row.couponType.range_type, 10) === 2"
								>
									商品
								</view>
								<view
									class="use"
									:class="'text-' + themeColor.name"
									v-if="state == 1"
									@tap="navTo('/pages/product/list')"
								>
									去使用
								</view>
								<view
									class="use"
									:class="'text-' + themeColor.name"
									v-if="state == 2"
									@tap="navTo(`/pages/order/detail?id=${row.use_order_id}`)"
								>
									去查看
								</view>
							</view>
						</view>
					</view>
				</view>
				<rf-load-more
					:status="loadingType"
					v-if="couponList.length > 0"
				></rf-load-more>
			</view>
		</view>
		<rf-empty
			class="empty"
			info="暂无优惠券"
			v-if="couponList.length === 0 && !loading"
		></rf-empty>
		<!--显示部分商品的抽屉-->
		<uni-drawer
			class="rf-drawer"
			:visible="showRight"
			mode="right"
			@close="closeDrawer()"
		>
			<view class="rf-drawer-title" :class="'text-' + themeColor.name">可用商品列表</view>
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
						<view class="desc in2line">{{ item.name.split('】')[1] }}</view>
					</view>
					<text class="iconfont iconyou"></text>
				</view>
			</view>
			<view class="close">
				<view
					class="btn"
          :class="'bg-' + themeColor.name"
					plain="true"
					size="small"
					type="primary"
					@tap="hide"
				>
					关闭
				</view>
			</view>
		</uni-drawer>
		<rfLoading isFullScreen :active="loading"></rfLoading>
	</view>
</template>
<script>
/**
 * @des 优惠券管理
 *
 * @author stav stavyan@qq.com
 * @date 2019-12-09 10:13
 * @copyright 2019
 */
import { couponClear, myCouponList } from '@/api/userInfo';
import rfLoadMore from '@/components/rf-load-more/rf-load-more';
import moment from '@/common/moment';
import uniDrawer from '@/components/uni-drawer/uni-drawer';
export default {
	components: {
		rfLoadMore,
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
			moneySymbol: this.moneySymbol,
			currentCoupon: {},
			loading: true
		};
	},
	filters: {
		// 格式化时间
		time(val) {
			return moment(val * 1000).format('YYYY-MM-DD');
		},
		// 格式化时间
		timeFull(val) {
			return moment(val * 1000).format('YYYY-MM-DD HH:mm:ss');
		}
	},
	// 下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
	onPullDownRefresh() {
		this.page = 1;
		this.couponList = [];
		this.getMyCouponList('refresh');
	},
	// 加载更多
	onReachBottom() {
  if (this.loadingType === 'nomore') return;
		this.page++;
		this.getMyCouponList();
	},
	onLoad() {
		// 数据初始化
		this.initData();
		// 兼容H5下排序栏位置
		// #ifdef H5
		// 定时器方式循环获取高度为止，这么写的原因是onLoad中head未必已经渲染出来。
		let Timer = setInterval(() => {
			let uniHead = document.getElementsByTagName('uni-page-head');
			if (uniHead.length > 0) {
				this.headerTop = uniHead[0].offsetHeight + 'px';
				clearInterval(Timer); // 清除定时器
			}
		}, 1);
		// #endif
	},
	methods: {
		// 显示抽屉(可使用商品)
		show(item) {
			if (item.usableProduct.length === 0) return;
			this.currentCoupon = item;
			this.showRight = true;
		},
		// 隐藏抽屉
		hide() {
			this.showRight = false;
		},
		// 关闭抽屉
		closeDrawer() {
			this.showRight = false;
		},
		// 切换顶部优惠券类型
		switchType(type, state) {
			if (this.typeClass === type) {
				return;
			}
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 0
			});
			this.typeClass = type;
			this.state = state;
			this.page = 1;
			this.couponList = [];
			this.loading = true;
			this.getMyCouponList();
		},
		// 清空失效优惠券
		async emptyInvalidCoupon() {
			await this.$http.get(`${couponClear}`).then(() => {
				this.getMyCouponList();
			});
		},
		// 占位方法
		discard() {
			// 丢弃
		},
		// 初始化数据
		initData() {
			this.page = 1;
			this.couponList = [];
			this.getMyCouponList();
		},
		// 统一跳转接口
		navTo(route, type) {
			if (type) {
				this.$mRouter.switchTab({ route });
			} else {
				this.$mRouter.push({ route });
			}
		},
		// 获取我的优惠券列表
		async getMyCouponList(type) {
			await this.$http
				.get(`${myCouponList}`, {
					page: this.page,
					state: this.state
				})
				.then(r => {
					this.loading = false;
					if (type === 'refresh') {
						uni.stopPullDownRefresh();
					}
					this.loadingType = r.data.length === 10 ? 'more' : 'nomore';
					this.couponList = [...this.couponList, ...r.data];
				})
				.catch(() => {
					this.loading = false;
					if (type === 'refresh') {
						uni.stopPullDownRefresh();
					}
				});
		}
	}
};
</script>
<style lang="scss">
view {
	display: flex;
	flex-wrap: wrap;
}
page {
	position: relative;
	background-color: $page-color-base;
}

.my-coupon {
	.place {
		width: 100%;
		height: 95upx;
	}
	.tabr {
		background-color: #fff;
		width: 100%;
		height: 95upx;
		padding: 0 3%;
		border-bottom: solid 1upx #dedede;
		position: fixed;
		top: 0;
		z-index: 10;
		view {
			width: 33.3%;
			height: 90upx;
			justify-content: center;
			align-items: center;
			font-size: 32upx;
		}
		.border {
			height: 4upx;
			&.used {
				transform: translate3d(100%, 0, 0);
			}
			&.invalid {
				transform: translate3d(200%, 0, 0);
			}
		}
	}
}

.coupon-list {
	width: 100%;
	display: block;
	position: relative;
	.empty-invalid {
		position: absolute;
		right: 20upx;
		top: 10upx;
		font-size: $font-base;
	}
}
@keyframes showValid {
	0% {
		transform: translateX(-100%);
	}
	100% {
		transform: translateX(0);
	}
}
@keyframes showInvalid {
	0% {
		transform: translateX(0);
	}
	100% {
		transform: translateX(-100%);
	}
}
.sub-list {
	width: 100%;
	&.invalid {
		position: absolute;
		top: 0;
		left: 100%;
		display: none;
	}

	&.showvalid {
		display: flex;
		animation: showValid 0.2s linear both;
	}

	&.showinvalid {
		display: flex;
		animation: showInvalid 0.2s linear both;
	}

	.tis {
		width: 100%;
		height: 60upx;
		justify-content: center;
		align-items: center;
		font-size: 32upx;
	}

	.row {
		width: 92%;
		height: 24vw;
		margin: 20upx auto 10upx auto;
		border-radius: 8upx;
		// box-shadow: 0upx 0 10upx rgba(0,0,0,0.1);
		align-items: center;
		position: relative;
		overflow: hidden;
		z-index: 4;
		border: 0;
		.carrier {
			@keyframes showMenu {
				0% {
					transform: translateX(0);
				}
				100% {
					transform: translateX(-28%);
				}
			}
			@keyframes closeMenu {
				0% {
					transform: translateX(-28%);
				}
				100% {
					transform: translateX(0);
				}
			}

			&.open {
				animation: showMenu 0.25s linear both;
			}

			&.close {
				animation: closeMenu 0.15s linear both;
			}

			background-color: #fff;
			position: absolute;
			width: 100%;
			padding: 0 0;
			height: 100%;
			z-index: 3;
			flex-wrap: nowrap;

			.left {
				width: 100%;
				position: relative;

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

				.overdue {
					position: absolute;
					right: 10upx;
					top: 0;

					.iconyiguoqi2 {
						font-size: $font-lg + 40upx;
					}

					.iconyishiyong {
						font-size: $font-lg + 40upx;
						color: $font-color-base;
					}
				}
			}

			.right {
				flex-shrink: 0;
				width: 28%;
				color: #fff;
				&.invalid {
					background: linear-gradient(to right, #aaa, #999);
					.use {
						color: #aaa;
					}
				}

				justify-content: center;

				.ticket,
				.criteria {
					width: 100%;
				}

				.ticket {
					padding-top: 1vw;
					justify-content: center;
					align-items: baseline;
					height: 6vw;

					.num {
						font-size: 42upx;
						font-weight: 600;
					}

					.unit {
						font-size: 24upx;
					}
				}

				.criteria {
					justify-content: center;

					font-size: 28upx;
				}

				.use {
					width: 45%;
					margin: 0 2.5%;
					height: 40upx;
					justify-content: center;
					align-items: center;
					font-size: 24upx;
					background-color: #fff;
					border-radius: 40upx;
					padding: 0 4upx;
				}
			}
		}
	}
}
.empty {
	width: 100vw;
	display: block;
}
</style>
