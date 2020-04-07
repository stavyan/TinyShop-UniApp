<template>
	<view class="coupon-center b-t" :style="{backgroundColor: errorInfo ? '#fff' : ''}">
		<view class="mask-content">
			<!-- 优惠券页面，仿mt -->
			<view class="coupon-item" v-for="(item,index) in couponList" :key="index" @tap="getCoupon(item)">
				<view class="con">
					<view class="left">
						<text class="title">{{item.title}}</text>
						<text class="time" v-if="parseInt(item.term_of_validity_type, 10) === 0">{{ item.start_time |
							time }} ~ {{
							item.end_time | time }}
						</text>
						<text class="time" v-else>自领取之日 {{ item.fixed_term }}天内有效</text>
					</view>
					<view class="right">
						<text class="price" v-if="item.money">{{item.money }}</text>
						<text class="price-discount" v-else>{{ `${item.discount}折` }}</text>
						<text>满{{ item.at_least }}可用</text>
					</view>
					<view class="circle l"></view>
					<view class="circle r"></view>
				</view>
				<view class="tips" v-if="item.range_type">
					<text v-if="item.range_type">
						{{ parseInt(item.range_type, 10) === 2 ? '部分产品使用' : '全场产品使用' }}
					</text>
					<text v-if="type">
						<text style="margin-right: 15upx;"
						      v-if="parseInt(item.range_type || item.couponType.range_type, 10) === 0">
							可使用商品
						</text>
						<text class="btn"
						      v-if="parseInt(item.range_type || item.couponType.range_type, 10) === 2"
						      @tap="show(item)">查看商品
						</text>
						<text class="btn" @tap="navTo('/pages/category/category', 'tab')">去使用</text>
					</text>
					<text v-if="item.myGet && !type">
						{{parseInt(item.max_fetch, 10) === 0 ? '不限' : `每人限领${item.max_fetch}` }} 已领{{ item.myGet.count
						||
						item.couponType.count }}
						<text v-if="item.percentage">剩余{{ item.percentage }}%</text>
					</text>
					<text v-else>
						{{parseInt(item.max_fetch, 10) === 0 ? '不限' : `限领${item.max_fetch}` }}
					</text>
				</view>
			</view>
			<rf-empty :info="errorInfo || '暂无优惠券'" v-if="couponList.length === 0 && !loading"></rf-empty>
			<rf-load-more :status="loadingType" v-else></rf-load-more>
			<!--页面加载动画-->
			<rf-loading v-if="loading"></rf-loading>
		</view>
	</view>
</template>

<script>
    /**
     * @des 领取中心
     *
     * @author stav stavyan@qq.com
     * @date 2020-01-13 11:28
     * @copyright 2019
     */
    import {couponList, couponReceive} from "@/api/userInfo";
    import rfLoadMore from '@/components/rf-load-more/rf-load-more';

    import moment from '@/utils/moment';

    export default {
        components: {
            rfLoadMore
        },
        data() {
            return {
                couponList: [],
                type: null,
                loadingType: 'more',
                token: null,
                page: 1,
                loading: true,
                errorInfo: '',
            }
        },
        filters: {
            time(val) {
                return moment(val * 1000).format('YYYY-MM-DD HH:mm')
            }
        },
        onLoad(options) {
            this.type = options.type;
            this.initData();
        },
        //下拉刷新
        onPullDownRefresh() {
            this.page = 1;
            this.couponList.length = 0;
            this.getCouponList('refresh');
        },
        //加载更多
        onReachBottom() {
            this.page++;
            this.getCouponList();
        },
        methods: {
            // 数据初始化
            initData() {
                this.getCouponList();
            },
            // 统一跳转接口
            navTo(url, type) {
                if (!this.token) {
                    url = '/pages/public/logintype';
                }
                if (type) {
                    uni.switchTab({url});
                }
                if (url === 'login') {
                    return
                } else {
                    uni.navigateTo({
                        url
                    })
                }
            },
            /**
             *@des 获取收货地址列表
             *@author stav stavyan@qq.com
             *@blog https://stavtop.club
             *@date 2019/11/18 09:58:15
             */
            async getCouponList(type) {
                await this.$get(`${couponList}`, {
                    page: this.page
                }).then(r => {
                    this.loading = false;
                    if (type === 'refresh') {
                        uni.stopPullDownRefresh();
                    }
                    this.loadingType = r.data.length === 10 ? 'more' : 'nomore';
                    this.couponList = [...this.couponList, ...r.data];
                }).catch(err => {
                    console.log(11)
                    this.couponList.length = 0;
                    this.errorInfo = err;
                    this.loading = false;
                    if (type === 'refresh') {
                        uni.stopPullDownRefresh();
                    }
                })
            },
            /**
             *@des 获取优惠券
             *@author stav stavyan@qq.com
             *@blog https://stavtop.club
             *@date 2019/11/25 13:41:19
             */
            async getCoupon(item) {
                if (this.type) return;
                if (parseInt(item.is_get, 10) === 0) {
                    this.$api.msg('该优惠券不可领取');
                    return;
                }
                await this.$post(`${couponReceive}`, {
                    id: item.id
                }).then(r => {
                    this.page = 1;
                    this.couponList = [];
                    this.getCouponList();
                    this.$api.msg('领取成功');
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    }
</script>
<style lang='scss'>

	.close {
		.btn {
			width: 240upx;
			margin: 20upx auto;
		}
	}

	.mask-content {
		width: 100%;
		transition: .3s;
		overflow-y: scroll;

		.coupon-item {
			display: flex;
			flex-direction: column;
			margin: 20upx 24upx;
			border-radius: 12upx;
			background: #fff;

			.con {
				display: flex;
				align-items: center;
				position: relative;
				height: 120upx;
				padding: 0 30upx;

				&:after {
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

			.left {
				display: flex;
				flex-direction: column;
				justify-content: center;
				flex: 1;
				overflow: hidden;
				height: 100upx;
			}

			.title {
				font-size: 32upx;
				color: $font-color-dark;
				margin-bottom: 10upx;
			}

			.time {
				font-size: 24upx;
				color: $font-color-light;
			}

			.right {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				font-size: 26upx;
				color: $font-color-base;
				height: 100upx;
			}

			.price {
				font-size: 44upx;
				color: $base-color;

				&:before {
					content: '￥';
					font-size: 34upx;
				}
			}

			.price-discount {
				font-size: 44upx;
				color: $base-color;
			}

			.tips {
				font-size: 24upx;
				color: $font-color-light;
				line-height: 60upx;
				padding-left: 30upx;
				overflow: hidden;
				display: inline-flex;
				justify-content: space-between;
				margin-right: 30upx;

				.btn {
					margin-left: 20upx;
					color: $font-color-base;
					font-size: $font-base;
				}
			}

			.circle {
				position: absolute;
				left: -6upx;
				bottom: -10upx;
				z-index: 10;
				width: 20upx;
				height: 20upx;
				background: #f3f3f3;
				border-radius: 100px;

				&.r {
					left: auto;
					right: -6upx;
				}
			}
		}
	}

	.coupon-none {
		text-align: center;
		font-size: $font-color-base;
		margin: 40upx 0;
	}

	.coupon-bottom-nav {
		background: #fff;
		height: 100upx;
		line-height: 60upx;
		position: fixed;
		overflow: hidden;
		bottom: 0;
		padding: 30upx 0 10upx;
		display: flex;
		width: 100%;

		.coupon-bottom-btn {
			text-align: center;
			color: $font-color-dark;
			font-size: $font-lg - 2upx;
			flex: 1;

			.right {
				font-size: $font-color-light;
				margin-left: 8upx;
			}
		}

		.coupon-bottom-btn:first-child {
			border-right: 1px solid rgba(0, 0, 0, 0.12); // 边框
		}
	}
</style>
