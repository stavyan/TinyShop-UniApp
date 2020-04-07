<template>
  <view class="content b-t">
    <view class="list b-b" v-for="(item, index) in addressList" :key="index" @tap="checkAddress(item)">
      <view class="wrapper" @touchstart="goTouchStart(item.id)" @touchmove="goTouchMove" @touchend="goTouchEnd">
        <view class="address-box">
          <text v-if="parseInt(item.is_default, 10) === 1" class="tag">默认</text>
          <text class="address in1line">{{item.address_name}} {{item.address_details}}</text>
        </view>
        <view class="u-box">
          <text class="name">{{item.realname}}</text>
          <text class="mobile">{{item.mobile}}</text>
        </view>
      </view>
      <i class="iconfont iconbianji" @tap.stop="addAddress('edit', item)"></i>
    </view>
    <text v-if="addressList.length > 0"
          style="display:block;padding: 16upx 30upx 10upx;lihe-height: 1.6;color: #fa436a;font-size: 24upx;">
      提示：长按可删除当前收货地址。最多只能存在一个默认地址。
    </text>
    <rf-load-more v-if="addressList.length > 0" :status="loadingType"/>
    <button class="add-btn" @tap="addAddress('add')">新增地址</button>
    <rf-empty :info="`暂无收货地址，请添加地址`" v-if="addressList.length === 0 && !loading"></rf-empty>
    <!--加载动画-->
    <rf-loading v-if="loading"></rf-loading>
  </view>
</template>

<script>
	/**
	 * @des 收货地址列表
	 *
	 * @author stav stavyan@qq.com
	 * @date 2020-03-10 18:00
	 * @copyright 2019
	 */
	import {addressDelete, addressList} from "@/api/userInfo";

	import rfLoadMore from '@/components/rf-load-more/rf-load-more';

	export default {
		components: {
			rfLoadMore
		},
		data() {
			return {
				timeOutEvent: 0,
				source: 0,
				page: 1,
				addressList: [],
				loadingType: 'more',
				loading: true
			}
		},
		//下拉刷新
		onPullDownRefresh() {
			this.page = 1;
			this.addressList = [];
			this.getAddressList('refresh');
		},
		//加载更多
		onReachBottom() {
			this.page++;
			this.getAddressList();
		},
		onLoad(option) {
			this.source = option.source;
		},
		onShow() {
			this.initData()
		},
		methods: {
			statechange(e) {
				console.log('live-player code:', e.detail.code)
			},
			error(e) {
				console.error('live-player error:', e.detail.errMsg)
			},
			goTouchStart(id) {
				clearTimeout(this.timeOutEvent);//清除定时器
				this.timeOutEvent = 0;
				this.timeOutEvent = setTimeout(() => {
					uni.showModal({
						content: '确定要删除该收货地址吗',
						success: (e) => {
							if (e.confirm) {
								this.$del(`${addressDelete}?id=${id}`).then(() => {
									this.page = 1;
									this.addressList.length = 0;
									this.getAddressList();
								})
							}
						}
					});
				}, 0.5 * 1000);//这里设置定时
			},
			//手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
			goTouchEnd() {
				clearTimeout(this.timeOutEvent);
				if (this.timeOutEvent != 0) {
				}
			},
			//如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
			goTouchMove() {
				clearTimeout(this.timeOutEvent);//清除定时器
				this.timeOutEvent = 0;
			},
			// 数据初始化
			initData() {
				this.page = 1;
				this.addressList.length = 0;
				this.getAddressList();
			},
			// 获取收货地址列表
			async getAddressList(type) {
				await this.$get(`${addressList}`, {
					page: this.page
				}).then(r => {
					this.loading = false;
					if (type === 'refresh') {
						uni.stopPullDownRefresh();
					}
					this.loadingType = r.data.length === 10 ? 'more' : 'nomore';
					this.addressList = [...this.addressList, ...r.data];
				}).catch(() => {
					this.loading = false;
					if (type === 'refresh') {
						uni.stopPullDownRefresh();
					}
				});
			},
			// 选择地址
			checkAddress(item) {
				if (this.source == 1) {
					//this.$api.prePage()获取上一页实例，在App.vue定义
					this.$api.prePage().addressData = item;
					uni.navigateBack()
				}
			},
			// 跳转添加地址页面
			addAddress(type, item) {
				uni.navigateTo({
					url: `/pages/user/address/manage?type=${type}&id=${item && item.id || undefined}`
				})
			},
		}
	}
</script>

<style lang='scss'>
  page {
    padding-bottom: 120upx;
  }

  .content {
    position: relative;
  }

  .list {
    display: flex;
    align-items: center;
    padding: 20upx 30upx;;
    background: #fff;
    position: relative;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .address-box {
    display: flex;
    align-items: center;

    .tag {
      font-size: 20upx;
      color: $base-color;
      background: #fffafb;
      border: 1px solid #ffb4c7;
      border-radius: 4upx;
      padding: 4upx 6upx;
      line-height: 1;
    }

    .address {
      font-size: 30upx;
      color: $font-color-dark;
    }
  }

  .u-box {
    font-size: 28upx;
    color: $font-color-light;
    margin-top: 16upx;

    .name {
      margin-right: 30upx;
    }
  }

  .iconfont {
    display: flex;
    align-items: center;
    height: 80upx;
    font-size: 40upx;
    color: $font-color-light;
    padding-left: 30upx;
  }

  .add-btn {
    position: fixed;
    left: 30upx;
    right: 30upx;
    bottom: 16upx;
    z-index: 95;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 690upx;
    height: 80upx;
    font-size: 32upx;
    color: #fff;
    background-color: $base-color;
    border-radius: 10upx;
    box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
  }
</style>
