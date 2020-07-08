<template>
	<view class="footprint">
		<!--日历控件-->
		<rf-calendar
			class="date"
			:insert="true"
			:lunar="true"
			:start-date="'2019-3-2'"
			:end-date="'2019-5-20'"
			@change="handleDateChange"
		/>
		<!--足迹列表-->
		<view class="row" v-for="(item, index) in footPrintList" :key="index">
			<!-- 删除按钮 -->
			<view class="menu" :class="'bg-' + themeColor.name" @tap.stop="handleDeleteFootPrint(item.id)">
				<text class="iconfont icon iconiconfontshanchu1"></text>
			</view>
			<!-- 商品 -->
			<view
				class="carrier"
				:class="[
					theIndex === index ? 'open' : oldIndex === index ? 'close' : ''
				]"
				@tap.stop="navTo(item.marketing_type, item.product.id)"
				@touchstart="touchStart(index, $event)"
				@touchmove="touchMove(index, $event)"
				@touchend="touchEnd(index, $event)"
			>
				<view class="left">
					<image
						class="image"
						:src="item.product && item.product.picture"
					></image>
					<image
						v-if="item.marketing_type"
						class="tag"
						:src="item.marketing_type | marketingTypeTag"
						mode="aspectFill"
					></image>
				</view>
				<view class="mid">
					<view class="title in2line">{{
						item.product && item.product.name
					}}</view>
					<view class="data">
						<view class="item"
							><text class="iconfont icontuandui"></text>推荐
							{{ (item.product && item.product.collect_num) || 0 }}</view
						>
						<view class="item"
							><text class="iconfont iconkechakan"></text>浏览
							{{ (item.product && item.product.view) || 0 }}</view
						>
						<view
							class="item "
							v-if="parseInt(item.product && item.product.product_status) === 0"
						>
							<text class="status">失效</text>
						</view>
					</view>
					<view class="bottom">
						<text class="price" :class="'text-' + themeColor.name">{{ moneySymbol }}{{
							item.product && item.product.minPriceSku.price
						}}</text>
						<text>{{ item.created_at | time }}</text>
					</view>
				</view>
			</view>
		</view>
		<rf-load-more :status="loadingType" v-if="footPrintList.length > 0" />
		<!--足迹列表为0-->
		<rf-empty info="暂无足迹列表" v-if="footPrintList.length === 0"></rf-empty>
		<!--加载动画-->
		<rfLoading isFullScreen :active="loading"></rfLoading>
	</view>
</template>

<script>
/**
 * @des 我的足迹
 *
 * @author stav stavyan@qq.com
 * @date 2019-11-22 10:47
 * @copyright 2019
 */
import { footPrintDel, footPrintList } from '@/api/userInfo';
import rfLoadMore from '@/components/rf-load-more/rf-load-more';
import rfCalendar from '@/components/rf-calendar/rf-calendar';
import moment from '@/common/moment';
import $mAssetsPath from '@/config/assets.config';
export default {
	components: {
		rfLoadMore,
		rfCalendar
	},
	data() {
		return {
			footPrintList: [],
			page: 1,
			loadingType: 'more',
			token: null,
			startTime: moment()
				.startOf('day')
				.format('X'),
			endTime: moment()
				.endOf('day')
				.format('X'),
			options: [{ text: '删除', style: { backgroundColor: '#fa436a' } }],
			loading: true,
			moneySymbol: this.moneySymbol,
			// 控制滑动效果
			theIndex: null,
			oldIndex: null
		};
	},
	filters: {
		// 时间格式化
		time(val) {
			return moment(val * 1000).format('YYYY-MM-DD HH:mm:ss');
		},
		marketingTypeTag(marketingType) {
			let tag;
			switch (marketingType) {
				case 'discount':
					tag = $mAssetsPath.discountTag;
					break;
				case 'bargain':
					tag = $mAssetsPath.bargainTag;
					break;
				case 'group_buy':
					tag = $mAssetsPath.groupTag;
					break;
				case 'wholesale':
					tag = $mAssetsPath.wholesaleTag;
					break;
			}
			return tag;
		}
	},
	// 加载更多
	onReachBottom() {
  if (this.loadingType === 'nomore') return;
		this.page++;
		this.getFootPrintList();
	},
	onLoad() {
		this.initData();
	},
	methods: {
		// 监听日期变化
		async handleDateChange(e) {
			this.page = 1;
			this.footPrintList = [];
			if (parseInt(e.type) !== 0) {
				this.startTime =
					(await moment(
						`${e.year}-${e.month}-${e.date} 00:00:00`,
						'YYYY-MM-DD HH:mm:ss'
					).valueOf()) / 1000;
				this.endTime =
					(await moment(
						`${e.year}-${e.month}-${e.date + 1} 00:00:00`,
						'YYYY-MM-DD HH:mm:ss'
					).valueOf()) / 1000;
			} else {
				this.startTime = undefined;
				this.startTime = undefined;
			}
			this.loading = true;
			this.getFootPrintList();
		},
		// 删除足迹
		async handleDeleteFootPrint(id) {
			await this.$http
				.delete(`${footPrintDel}?id=${id}`, {
					page: this.page
				})
				.then(() => {
					this.$mHelper.toast('删除足迹成功');
					this.page = 1;
					this.footPrintList.length = 0;
					this.getFootPrintList();
					this.oldIndex = null;
					this.theIndex = null;
				});
		},
		// 数据初始化
		initData() {
			this.getFootPrintList();
		},
		// 获取我的足迹列表
		async getFootPrintList() {
			const params = {};
			params.page = this.page;
			// 起始时间和结束时间
			if (this.startTime && this.endTime) {
				params.start_time = this.startTime;
				params.end_time = this.endTime;
			}
			await this.$http
				.get(`${footPrintList}`, {
					...params
				})
				.then(r => {
					this.loading = false;
					this.loadingType = r.data.length === 10 ? 'more' : 'nomore';
					this.footPrintList = [...this.footPrintList, ...r.data];
				})
				.catch(() => {
					this.loading = false;
				});
		},
		// 控制左滑删除效果
		touchStart(index, event) {
			// 多点触控不触发
			if (event.touches.length > 1) {
				this.isStop = true;
				return;
			}
			this.oldIndex = this.theIndex;
			this.theIndex = null;
			// 初始坐标
			this.initXY = [event.touches[0].pageX, event.touches[0].pageY];
		},
		touchMove(index, event) {
			// 多点触控不触发
			if (event.touches.length > 1) {
				this.isStop = true;
				return;
			}
			let moveX = event.touches[0].pageX - this.initXY[0];
			let moveY = event.touches[0].pageY - this.initXY[1];

			if (this.isStop || Math.abs(moveX) < 5) {
				return;
			}
			if (Math.abs(moveY) > Math.abs(moveX)) {
				// 竖向滑动-不触发左滑效果
				this.isStop = true;
				return;
			}

			if (moveX < 0) {
				this.theIndex = index;
				this.isStop = true;
			} else if (moveX > 0) {
				if (this.theIndex != null && this.oldIndex === this.theIndex) {
					this.oldIndex = index;
					this.theIndex = null;
					this.isStop = true;
					setTimeout(() => {
						this.oldIndex = null;
					}, 150);
				}
			}
		},
		touchEnd(index, $event) {
			// 结束禁止触发效果
			this.isStop = false;
		},
		// 跳转至商品详情
		navTo(type, id) {
			let route = `/pages/product/product?id=${id}`;
			switch (type) {
				case 'discount':
					route = `/pages/marketing/discount/product?id=${id}`;
					break;
				case 'bargain':
					route = `/pages/marketing/bargain/product?id=${id}`;
					break;
				case 'group_buy':
					route = `/pages/marketing/group/product?id=${id}`;
					break;
				case 'wholesale':
					route = `/pages/marketing/wholesale/product?id=${id}`;
					break;
			}
			this.$mRouter.push({ route });
		}
	}
};
</script>

<style lang="scss" scoped>
page {
	background: $page-color-base;
}
.footprint {
	.row {
		width: calc(94%);
		height: calc(22vw + 40upx);
		margin: 20upx auto;
		border-radius: 15upx;
		box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.1);
		display: flex;
		align-items: center;
		position: relative;
		overflow: hidden;
		z-index: 4;
		border: 0;
		.menu {
			.icon {
				color: #fff;
				font-size: 60upx;
			}
			position: absolute;
			width: 29%;
			height: 100%;
			right: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			z-index: 2;
		}
		.carrier {
			@keyframes showMenu {
				0% {
					transform: translateX(0);
				}
				100% {
					transform: translateX(-30%);
				}
			}
			@keyframes closeMenu {
				0% {
					transform: translateX(-30%);
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
			display: flex;
			align-items: center;
			.left {
				width: 22vw;
				height: 22vw;
				margin-left: 20upx;
				margin-right: 10upx;
				position: relative;
				.image {
					border-radius: 10upx;
					width: 22vw;
					height: 22vw;
				}
				.tag {
					position: absolute;
					left: 0;
					top: 0;
					width: 60upx;
					height: 60upx;
				}
			}
			.mid {
				width: 100%;
				margin: 10upx 10upx 0;
				.title {
					height: 60upx;
					line-height: 1.2;
					font-size: $font-base;
				}
				.data {
					width: 100%;
					display: flex;
					align-items: center;
					margin: 10upx 0 5upx;
					font-size: $font-base;
					color: $font-color-base;
					.item {
						flex: 1;
					}
					.iconfont {
						color: $font-color-light;
						margin-right: 10upx;
					}
					.status {
						padding: 6upx 20upx;
						background-color: $base-color;
						opacity: 0.8;
						color: $color-white;
						font-size: $font-sm;
						border-radius: 6upx;
					}
				}
				.bottom {
					line-height: 1.2;
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: $font-sm;
					color: $font-color-light;
					.price {
						font-size: $font-lg;
					}
				}
			}
		}
	}
}
</style>
