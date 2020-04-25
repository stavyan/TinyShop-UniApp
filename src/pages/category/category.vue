<template>
  <view class="rf-category">
    <!--顶部搜索导航栏-->
    <rf-search-bar
        @link="toIndex"
        @search="toSearch"
        icon="iconxiatubiao--copy"
        title="主页"
        :placeholder="hotSearchDefault"/>
    <rf-empty :info="'暂无产品分类~'" v-if="categoryList.length === 0 && !loading"></rf-empty>
    <view class="category-list" v-else>
      <!-- 左侧分类导航 -->
      <scroll-view scroll-y="true" class="left">
        <view class="row" v-for="(fItem, fIndex) in categoryList" :key="fItem.id"
              :class="[fIndex===showCategoryIndex?'on':'']" @tap="showCategory(fIndex)">
          <view class="text">
            <view class="block"></view>
            {{fItem.title}}
          </view>
        </view>
      </scroll-view>
      <!--右侧子导航-->
      <scroll-view scroll-y="true" class="right" :class="animation">
        <view class="category" v-for="(fItem, fIndex) in categoryList" :key="fItem.id"
              v-if="fIndex===showCategoryIndex && fItem.child.length > 0">
          <view class="banner" @tap="indexTopToDetailPage(cateTop.jump_type, cateTop.jump_link)">
            <image :src="cateTop && cateTop.cover" mode="aspectFill"/>
          </view>
          <view class="box" v-for="sItem in fItem.child" :key="sItem.id" @tap="navTo(`/pages/product/list?cate_id=${sItem.id}`)">
            <view class="text">{{sItem.title}}</view>
            <view class="list" v-if="sItem.child && sItem.child.length > 0">
              <view class="box" v-for="tItem in sItem.child" :key="tItem.id" @tap.stop="navTo(`/pages/product/list?cate_id=${tItem.id}`)">
					      <image :src="tItem.cover || errorImage"></image>
                <view class="text">{{tItem.title}}</view>
              </view>
            </view>
            <view v-else class="no-data">
              <i class="iconfont icon404"></i>
              暂无子分类
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
		<!--加载动画-->
    <rf-loading v-if="loading"></rf-loading>
  </view>
</template>
<script>
	/**
	 * @des 分类
	 *
	 * @author stav stavyan@qq.com
	 * @date 2020-03-10 18:19
	 * @copyright 2019
	 */
	import {productCate} from '@/api/product';
	import rfSearchBar from '@/components/rf-search-bar';
	import {advList} from '@/api/basic';
	export default {
		components: {
			rfSearchBar
		},
		data() {
			return {
        hotSearchDefault: '请输入关键字', // 搜索默认关键字
        showCategoryIndex: 0, // 一级菜单高亮显示序号
        categoryList: [], // 分类列表
        search: {},
        cateTop: {}, // 分类通用广告图
        animation: 'animation-slide-right',
        loading: true,
        errorImage: this.$mAssetsPath.errorImage
      }
		},
		// 每次页面显示 执行该方法
		onLoad() {
			this.initData();
		},
		methods: {
			// 跳转至商品列表
			navTo(route) {
			  this.$mRouter.push({route});
			},
			// 数据初始化
			async initData() {
				this.search = uni.getStorageSync('search') || {};
				this.hotSearchDefault = '请输入关键字 ' + (this.search.hot_search_default ? ('如: ' + this.search.hot_search_default) : '');
				this.getProductCate();
        this.initCartItemCount();
			},
      // 设置购物车数量角标
      async initCartItemCount() {
        if (this.$mStore.getters.hasLogin && parseInt(uni.getStorageSync('cartNum'), 10) > 0) {
          await uni.setTabBarBadge({
            index: this.$mConstDataConfig.cartIndex,
            text: uni.getStorageSync('cartNum').toString()
          });
        } else {
          uni.removeStorageSync('cartNum');
          uni.removeTabBarBadge({index: this.$mConstDataConfig.cartIndex});
        }
      },
			// 获取商品分类列表
			async getProductCate() {
				await this.$http.get(`${productCate}`).then(r => {
					this.loading = false;
					// 获取分类广告图 注：广告图不是一级分类图
          this.getAdvList();
          // 过滤掉没有二级菜单的一级菜单
					r.data.forEach(item => {
            if (item.child.length > 0) {
            	this.categoryList.push(item)
            }
          });
				}).catch(() => {
          this.loading = false;
        });
			},
			// 获取广告列表
			async getAdvList() {
				await this.$http.get(`${advList}`, {
					location: 'cate_top'
				}).then(r => {
					this.cateTop = r.data.cate_top[0];
				});
			},
			//分类切换显示
			showCategory(index) {
				this.showCategoryIndex = index;
				this.animation= 'animation-slide-right';
				setTimeout(()=>{
					this.animation= '';
				}, 1000)
			},
			// 跳转至搜索详情页
			toSearch() {
			  this.$mRouter.push({route: `/pages/index/search/search?data=${JSON.stringify(this.search)}`});
			},
			// 跳转至分类页
			toIndex() {
        this.$mRouter.switchTab({route: '/pages/index/index'});
			},
			// 跳至广告图指定页面
			indexTopToDetailPage(type, url) {
				if (!type || !url) return;
				switch (type) {
					case 'product_view':
						url = `/pages/product/product?id=${url}`;
						break;
					case 'article_view':
						this.$mHelper.toast('article_view');
						break;
					case 'coupon_view':
						url = `/pages/user/coupon/detail?id=${url}`;
						break;
					case 'helper_view':
						this.$mHelper.toast('helper_view');
						break;
					case 'product_list_for_cate':
						url = `/pages/product/list?cate_id=${url}`;
						break;
					default:
						break;
				}
			  this.$mRouter.push({route: url});
			}
		}
	}
</script>
<style scoped lang="scss">
  page {
	  background-color: $color-white;
  }
  .rf-category {
    /*模块分类*/
    .category-list {
      width: 100%;
      background-color: #fff;
      display: flex;

      .left, .right {
        position: absolute;
        top: 100upx;
        /*  #ifdef  APP-PLUS  */
        top: calc(100upx + var(--status-bar-height));
        /*  #endif  */
        bottom: 0upx;
      }

      .left {
        width: 24%;
        left: 0upx;
        background-color: #f2f2f2;

        .row {
          width: 100%;
          height: 90upx;
          display: flex;
          align-items: center;

          .text {
            width: 100%;
            position: relative;
            font-size: 28upx;
            display: flex;
            justify-content: center;
            color: #3c3c3c;

            .block {
              position: absolute;
              width: 0upx;
              left: 0;
            }
          }

          &.on {
            height: 100upx;
            background-color: #fff;

            .text {
              font-size: 30upx;
              font-weight: 600;
              color: #2d2d2d;

              .block {
                width: 10upx;
                height: 80%;
                top: 10%;
                background-color: #f06c7a;
              }
            }
          }
        }
      }

      .right {
        width: 76%;
        left: 24%;
        background-color: #fff;
        .category {
          width: calc(100%);
          padding: 20upx 15upx;

          .banner {
            width: 96%;
            margin: 0 auto 20upx;
            height: 24.262vw;
            border-radius: 10upx;
            overflow: hidden;
            box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.3);

            image {
              width: 100%;
              height: 24.262vw;
            }
          }

          .list {
            margin-top: 40upx;
            width: 100%;
            display: flex;
            flex-wrap: wrap;

            .box {
              width: calc(71.44vw / 3);
              margin-bottom: 30upx;
              display: flex;
              justify-content: center;
              align-items: center;
              flex-wrap: wrap;

              image {
                width: 64%;
                height: calc(71.44vw / 3 * 0.64);
              }

              .text {
                margin-top: 8upx;
                width: 100%;
                display: flex;
                justify-content: center;
                font-size: 26upx;
              }
            }
          }

          .no-data {
            margin: 48upx 0;
            color: $font-color-light;
            display: flex;
            justify-content: center;
            align-items: center;

            .iconfont {
              margin-right: 20upx;
              font-size: $font-lg + 16upx;
            }
          }
        }
      }
    }
  }
</style>
