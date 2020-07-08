<template>
	<view class="my-account">
		<!--账户信息面板-->
		<view class="header" :class="'bg-' + themeColor.name">
			<view class="account">
				<view class="assets">
					<view>总资产(元)</view>
					<view class="money">
						{{
							(userInfo && userInfo.account && userInfo.account.user_money) ||
								'0.00'
						}}
					</view>
				</view>
				<text v-if="isOpenRecharge" @tap="navTo('/pages/user/account/recharge')" class="recharge" :class="'text-' + themeColor.name"
					>充值</text
				>
			</view>
			<view class="cumulative">
				<view class="item">
					<view>累计充值(元)</view>
					<view class="money">
						{{
							(userInfo &&
								userInfo.account &&
								userInfo.account.accumulate_money) ||
								'0.00'
						}}
					</view>
				</view>
				<view class="item">
					<view>累计消费(元)</view>
					<view class="money">
						{{
							-(
								userInfo &&
								userInfo.account &&
								userInfo.account.consume_money
							) || '0.00'
						}}
					</view>
				</view>
			</view>
		</view>
		<!--余额/积分导航-->
		<view class="nav">
			<view
				class="item"
				v-for="item in navList"
				:key="item.title"
				@tap="navTo(item.url)"
			>
				<text class="iconfont" :class="[item.icon, 'text-' + themeColor.name]"></text>
				<text>{{ item.title }}</text>
			</view>
		</view>
		<!--广告-->
		<view class="advert">
			<view class="item on" @tap="navTo('/pages/user/coupon/list')">
				<view class="text" :class="'text-' + themeColor.name">
					<view class="name">领取优惠券</view>
					<text class="desc">满减享优惠</text>
				</view>
				<text class="iconfont iconwodeyouhuiquan" :class="'text-' + themeColor.name"></text>
			</view>
		</view>
		<!--加载动画-->
		<rfLoading isFullScreen :active="loading"></rfLoading>
	</view>
</template>
<script>
/**
 * @des 用户账户中心
 *
 * @author stav stavyan@qq.com
 * @date 2020-01-10 15:17
 * @copyright 2019
 */
import { memberInfo } from '@/api/userInfo';

export default {
	data() {
		return {
			userInfo: {},
			loading: true,
			isOpenRecharge: this.$mSettingConfig.isOpenRecharge,
			navList: [
				{
					title: '账单记录',
					icon: 'icondaifukuan',
					url: '/pages/user/account/bill'
				},
				{
					title: '充值记录',
					icon: 'iconchongzhijilu',
					url: '/pages/user/account/bill?state=2'
				},
				{
					title: '消费记录',
					icon: 'iconzuheduozhongxiaofeifangshizuhexiaofei',
					url: '/pages/user/account/bill?state=3'
				},
				{
					title: '积分中心',
					icon: 'iconjifenqia',
					url: '/pages/user/account/integral'
				}
			]
		};
	},
	onShow() {
		this.initData();
	},
	methods: {
		// 初始化数据
		initData() {
			this.getMemberInfo();
		},
		// 获取用户信息
		async getMemberInfo() {
			await this.$http
				.get(memberInfo)
				.then(async r => {
					this.loading = false;
					this.userInfo = r.data;
				})
				.catch(() => {
					this.loading = false;
				});
		},
		navTo(route) {
			this.$mRouter.push({ route });
		}
	}
};
</script>
<style scoped lang="scss">
page {
	background-color: $color-white;
}
.my-account {
	background-color: $color-white;
	/*  #ifndef H5  */
	height: 100vh;
	/*  #endif  */
	padding: 32upx 20upx;
	width: 100%;
	.header {
		padding: 30upx;
		height: 320upx;
		opacity: 0.9;
		border-radius: 20upx;
		color: rgba(255, 255, 255, 0.6);
		font-size: $font-sm;
		position: relative;
		.account {
			width: calc(100% - 60upx);
			display: flex;
			position: absolute;
			z-index: 2;
			justify-content: space-between;
			.assets {
				.money {
					color: #fff;
					font-size: $font-lg + 10upx;
					margin: 0;
				}
			}
			.recharge {
				font-size: $font-base;
				width: 150upx;
				height: 54upx;
				line-height: 54upx;
				border-radius: $font-base;
				background-color: #fff9f8;
				text-align: center;
				margin-top: 10upx;
			}
		}
		.cumulative {
			width: calc(100% - 240upx);
			position: absolute;
			bottom: 20upx;
			display: flex;
			justify-content: space-between;
			.money {
				color: #fff;
				font-size: $font-lg + 4upx;
				margin: 0;
			}
		}
		.header-bg {
			position: absolute;
			width: 100%;
			height: 320upx;
			z-index: 1;
			top: 0;
			image {
				width: 100%;
				height: 320upx;
			}
		}
	}
	.nav {
		border-bottom: 1px solid #f5f5f5;
		display: flex;
		.item {
			flex: 1;
			margin: 20upx;
			font-size: $font-base - 4upx;
			display: inline-block;
			text-align: center;
			color: #999;
			.iconfont {
				display: block;
				margin: 0 auto;
				font-size: $font-lg + 20upx;
			}
		}
	}
	.advert {
		display: flex;
		.item {
			flex: 1;
			border-radius: 24upx;
			padding: 10upx 0;
			margin: 20upx 10upx;
			display: flex;
			justify-content: space-between;
			.iconfont {
				font-size: $font-lg + 20upx;
				margin-right: 20upx;
			}
			.text {
				margin-left: 20upx;
				.name {
					font-size: $font-base;
					font-weight: bold;
					height: 40upx;
				}
				.desc {
					font-size: $font-sm - 2upx;
				}
			}
		}
		.on {
			background-color: #fff3f3;
		}
	}
}
</style>
