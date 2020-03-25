<template>
	<view class="coupon-detail" :style="{backgroundColor: couponList.length === 0 ? '#fff' : '' }">
		<view class="list">
			<!-- 优惠券列表 -->
			<view class="sub-list valid" :style="{marginTop: state === 3 ? '40upx' : 0}">
				<view class="row" v-for="(row,index) in couponList" :key="index" >
					<!-- content -->
					<view class="carrier">
						<view class="left">
							<view class="in1line title">
								<text class="cell-icon">{{ parseInt(row.range_type, 10) === 2 ? '限' : '全' }}</text>
								{{row.title}}
							</view>
							<view class="term" v-if="state !== 2">
								{{ row.start_time | time }} ~ {{ row.end_time | time }}
							</view>
							<view class="term" v-else>
								使用时间：{{ row.use_time | timeFull }}
							</view>
							<view class="icon shixiao" v-show="state === 3" />
							<view class="used" v-show="state === 2">已使用</view>
							<view class="usage">
								{{parseInt(row.max_fetch, 10) === 0 ? '不限' : `每人限领 ${row.max_fetch}` }}
								总领取 {{ row.get_count }}
								<text v-show="row.percentage">剩余{{ row.percentage }}%</text>
							</view>
						</view>
						<view class="right" :class="{ invalid: state !== 1 }">
							<view class="ticket">
								<view class="num">
									{{ row.money ? '￥' + row.money : row.discount + '折' }}
								</view>
							</view>
							<view class="criteria">
								满{{row.at_least}}使用
							</view>
							<view class="btn-group">
								<view class="use view" @tap="show(row)" v-show="parseInt(row.range_type, 10) === 2">
									商品
								</view>
								<view class="use" @tap="getCoupon(row)">
									领取
								</view>
<!--							<view class="use" v-show="parseInt(row.range_type, 10) === 2" @tap="show(row)">-->
<!--								去查看-->
<!--							</view>-->
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<uni-drawer class="drawer" :visible="showRight" mode="right" @close="closeDrawer()">
				<uni-list v-for="item in currentCoupon.usableProduct" :key="item.id">
					<uni-list-item class="in1line" :title="item.name.split('】')[0]" :note="item.name.split('】')[1]" @tap="navTo(`/pages/product/product?id=${item.id}`)"/>
				</uni-list>
				<view class="close">
					<button class="btn" plain="true" size="small" type="primary" @tap="hide">关闭</button>
				</view>
		</uni-drawer>
		
		<empty :info="'暂无优惠券'" v-if="couponList.length === 0 && !loading"></empty>
		<!--加载动画-->
		<rf-loading v-if="loading"></rf-loading>
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
import { couponDetail, couponReceive} from "@/api/userInfo";
import rfLoadMore from '@/components/rf-load-more/rf-load-more';
import empty from "@/components/empty";
import moment from '@/utils/moment';
import uniDrawer from '@/components/uni-drawer/uni-drawer'
import uniList from '@/components/uni-list/uni-list.vue'
import uniListItem from '@/components/uni-list-item/uni-list-item';
export default {
	components: {
		rfLoadMore,
		empty,
		uniDrawer,
		uniList,
		uniListItem
	},
	data() {
		return {
			headerTop:0,
			//控制滑动效果
			typeClass:'valid',
			theIndex: null,
			oldIndex: null,
			state: 1,
			isStop:false,
			couponList: [],
			loadingType: 'more',
			token: null,
			page: 1,
			showRight: false,
			currentCoupon: {},
			loading: true
		}
	},
	filters: {
		time(val) {
			return moment(val * 1000).format('YYYY-MM-DD')
		},
		timeFull(val) {
			return moment(val * 1000).format('YYYY-MM-DD HH:mm:ss')
		}
	},
	onLoad(options) {
		this.initData(options);
	},
	methods: {
		show(item) {
			if (item.usableProduct.length === 0) return;
			this.currentCoupon = item;
			this.showRight = true
		},
		hide() {
			this.showRight = false
		},
		closeDrawer() {
			this.showRight = false
		},
		// 初始化数据
		initData (options) {
			this.token = uni.getStorageSync('accessToken') || undefined;
			if (this.token) {
			}
			this.getMyCouponDetail(options.id);
		},
		/**
		 *@des 获取优惠券
		 *@author stav stavyan@qq.com
		 *@blog https://stavtop.club
		 *@date 2019/11/25 13:41:19
		 */
		async getCoupon(item) {
			if (!this.token) {
				this.$api.msg('请您先登录！');
				return;
			}
			if (item.is_get == 0) {
				this.$api.msg('该优惠券暂不可领取！');
				return;
			}
			await this.$post(`${couponReceive}`, {
				id: item.id
			}).then(r => {
        this.$api.msg('领取成功');
				setTimeout(() => {
					this.couponList = [];
					this.getMyCouponDetail(id);
				}, 1.5 * 1000)
			}).catch(err => {
				console.log(err)
			})
		},
		// 统一跳转接口
		navTo(url, type){
			if (type) {
				uni.switchTab({url});
				return;
			}
			if (url === 'login') {
				 return
			} else {
				uni.navigateTo({
					url
				})
			}
		},
		// 获取我的收货地址列表
		async getMyCouponDetail (id) {
			await this.$get(`${couponDetail}`, {
				id,
			}).then(r=>{
		    this.loading = false;
				this.couponList.push(r.data);
			}).catch(() => {
		    this.loading = false;
			})
		},
	}
}
</script>
<style lang="scss">
	.list{
		display: flex;
		width: 100%;
		position: relative;
	}
	.sub-list{
		width: 100%;
		padding-top: 10upx;
		.tis{
			width: 100%;
			height: 60upx;
			justify-content: center;
			align-items: center;
			font-size: 32upx;
		}
		.row{
			width: 92%;
			height: 24vw;
			margin: 10upx auto;
			border-radius: 8upx;
			// box-shadow: 0upx 0 10upx rgba(0,0,0,0.1);
			align-items: center;
			position: relative;
			overflow: hidden;
			z-index: 4;
			border: 0;
			.menu{
				.icon{
					color: #fff;
					font-size:50upx;
				}
				position: absolute;
				width: 28%;
				height: 100%;
				right: 0;
				justify-content: center;
				align-items: center;
				background-color: $base-color;
				color: #fff;
				z-index: 2;
			}
			.carrier{
				background-color: #fff;
				position: absolute;
				width: 100%;
				padding: 0 0;
				height: 100%;
				z-index: 3;
				display: flex;
				.left{
					flex: 1;
					.title{
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
					.term{
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
					.gap-top,.gap-bottom{
						position: absolute;
						width: 20upx;
						height: 20upx;
						right: -10upx;
						border-radius: 100%;
						background-color: #f5f5f5;
					}
					.gap-top{
						top: -10upx;
					}
					.gap-bottom{
						bottom: -10upx;
					}
					.used {
						position: absolute;
						right: 10upx;
						bottom: 5upx;
						font-size: $font-sm;
						color: $base-color;
					}
					.shixiao{
						position: absolute;
						right: 0;
						top: -20upx;
						font-size: 150upx;
						z-index: 6;
						color: rgba(153,153,153,0.2)
					}
				}
				.right{
					width: 28%;
					color: #fff;
					text-align: center;
					background:linear-gradient(to right, rgba(250,67,106, 0.72), rgba(250,67,106, 0.64));
					.ticket,.criteria{width: 100%;}
					.ticket{
						padding-top: 20upx;
						.num{
							font-size: $font-lg + 12upx;
							font-weight: 600;
							line-height: 1.2;
						}
						.unit{
							font-size: 24upx;
						}
					}
					.criteria{
						font-size: $font-base;
					}
					.btn-group {
						display: flex;
						justify-content: space-between;
						align-items: center;
						.use{
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
			.btn{
	      width: 320upx;
	      height: 76upx;
	      line-height: 76upx;
	      border-radius: 50px;
	      margin-top: 70upx;
	      background: $uni-color-primary;
	      color: #fff;
	      font-size: $font-lg;
	      border: none;
	      &:after{
	        border-radius: 100px;
	      }
	    }
		}
	}
</style>
