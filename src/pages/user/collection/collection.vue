<template>
  <view class="collection">
    <rf-swipe-action class="rf-list">
      <rf-swipe-action-item
          :options="options"
          :info="item"
          @action="bindClick"
          :key="index"
          class="rf-swipe-item"
          v-for="(item, index) in collectionList">
          <view class="rf-list-item" @tap="navTo(`/pages/product/product?id=${item.product.id}`)">
          <view class="left">
            <image class="image"  :src="item.product && item.product.picture"></image>
          </view>
          <view class="mid">
            <view class="title in2line">{{ item.product && item.product.name }}</view>
            <view class="data">
              <view class="item"><text class="iconfont icontuandui"></text>推荐 {{item.product && item.product.collect_num || 0 }}</view>
              <view class="item"><text class="iconfont iconkechakan"></text>浏览 {{item.product && item.product.view || 0 }}</view>
            </view>
            <view class="state-wrapper">
              <text class="state" v-if="parseInt(item.product && item.product.product_status) === 0">
                失效
              </text>
            </view>
            <view class="bottom">
              <text class="price">{{ item.product && item.product.minPriceSku.price }}</text>
              <text>{{ item.created_at | time }}</text>
            </view>
          </view>
        </view>
      </rf-swipe-action-item>
      <rf-load-more :status="loadingType" v-if="collectionList.length > 0"/>
    </rf-swipe-action>
    <rf-empty :info="'快去收藏一些商品吧~'" v-if="collectionList.length === 0 && !loading"></rf-empty>
    <!--加载动画-->
    <rf-loading v-if="loading"></rf-loading>
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
	import {collectList} from "@/api/userInfo";
	import rfLoadMore from '@/components/rf-load-more/rf-load-more';
	import {collectDel} from "@/api/basic";
	import moment from '@/common/moment';
	import rfSwipeAction from '@/components/rf-swipe-action/rf-swipe-action';
	import rfSwipeActionItem from '@/components/rf-swipe-action-item/rf-swipe-action-item';
	export default {
		components: {
			rfLoadMore,
			rfSwipeAction,
			rfSwipeActionItem
		},
		data() {
			return {
				collectionList: [],
				page: 1,
				loadingType: 'more',
				options: [
					{text: '取消收藏', style: {backgroundColor: '#fa436a'}}
				],
				loading: true
			};
		},
		filters: {
			time(val) {
				return moment(val * 1000).format('YYYY-MM-DD HH:mm')
			}
		},
		onShow() {
			this.initData();
		},
		//下拉刷新
		onPullDownRefresh() {
			this.page = 1;
			this.collectionList = [];
			this.loading = true;
			this.getCollectionList('refresh');
		},
		//加载更多
		onReachBottom() {
			this.page++;
			this.getCollectionList();
		},
		methods: {
			async bindClick(e) {
				if (e.content.text === '取消收藏') {
          this.handleDeleteCollection(e.data.id);
				}
			},
      async handleDeleteCollection(id) {
        await this.$http.delete(`${collectDel}?id=${id}`, {
          page: this.page
        }).then(() => {
          this.$mHelper.toast('取消收藏成功');
          this.page = 1;
          this.collectionList.length = 0;
          this.getCollectionList();
        })
      },
			// 数据初始化
			initData() {
				this.page = 1;
				this.collectionList.length = 0;
        this.getCollectionList();
			},
			// 获取收藏列表
			async getCollectionList(type) {
				await this.$http.get(`${collectList}`, {
					page: this.page
				}).then(r => {
					this.loading = false;
					if (type === 'refresh') {
						uni.stopPullDownRefresh();
					}
					this.loadingType = r.data.length === 10 ? 'more' : 'nomore';
					this.collectionList = [...this.collectionList, ...r.data];
				}).catch(() => {
					this.loading = false;
					if (type === 'refresh') {
						uni.stopPullDownRefresh();
					}
				});
			},
			navTo(route) {
				this.$mRouter.push({route})
			}
		}
	}
</script>

<style lang='scss'>
	page{
    background-color: $page-color-base;
	}
  .collection {
    .rf-swipe-item {
      margin: 0 $spacing-sm $spacing-base;
    }
    .rf-list-item {
      padding: 0;
      margin: 0;
    }
    .left {
      padding: 20upx 20upx 10upx;
      .image {
        width: 260upx;
        height: 240upx;
      }
    }
    .mid {
      width: calc(100vw - 350upx);
      margin: 0 10upx;
      .title {
        height: 88upx;
        font-size: $font-base + 2upx;
        color: $font-color-dark;
      }
      .data {
        display: flex;
        justify-content: space-between;
        margin: 10upx 0 5upx;
        font-size: $font-base;
        color: $font-color-base;
        .item {
          height: 50upx;
          line-height: 50upx;
        }
        .iconfont {
          color: $font-color-light;
          margin-right: 10upx;
        }
      }
      .state-wrapper {
        height: 48upx;
        .state {
          margin: 5upx 0;
          background-color: $base-color;
          opacity: 0.8;
          color: $color-white;
          font-size: $font-sm;
          padding: 4upx 10upx;
          border-radius: 6upx;
        }
      }
      .bottom {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: $font-sm;
        color: $font-color-light;
        .price{
          color: $base-color;
          font-size: $font-lg;
          &:before{
            content: '￥';
            font-size: $font-sm;
          }
        }
      }
    }
  }
</style>
