<template>
	<view class="index">
		<!--搜索导航栏-->
		<rf-search-bar
			@link="toCategory"
			@search="toSearch"
			:title="'分类'"
			:icon="'iconfenlei'"
			:headerShow="headerShow"
			:placeholder="hotSearchDefault" />
		<!-- 轮播图 -->
		<view class="swiper">
			<view class="swiper-box">
				<rf-swipe-dot :info="carouselList.index_top" mode="nav" :current="current" field="title">
					<swiper class="swiper-box" @change="handleDotChange" autoplay="true">
						<swiper-item
							v-for="(item, index) in carouselList.index_top"
	            @tap="indexTopToDetailPage(item.jump_type, item.jump_link)"
	            :key="index">
							<view class="swiper-item">
								<image :src="item.cover" mode="aspectFill" />
							</view>
						</swiper-item>
					</swiper>
				</rf-swipe-dot>
			</view>
		</view>
		<!-- 分类列表 -->
		<view class="category-list">
			<view
				class="category"
				v-for="(item, index) in productCateList"
				:key="index"
				@tap.stop="navToList(item.id)"
			>
				<view class="img"><image :src="item.cover" mode="aspectFit"></image></view>
				<view class="text">{{ item.title }}</view>
			</view>
		</view>
		<!--新品上市-->
		<rf-floor-index
				:list="newProductList"
				@toBanner="indexTopToDetailPage"
				@toList="toProductList({is_new: 1})"
				:header="{title: '新品上市', desc: 'New Products Listed'}"
				@detail="navToDetailPage"
				:banner="carouselList.index_new && carouselList.index_new[0]"/>
		<!--推荐商品-->
		<rf-floor-index
				:list="recommendProductList"
				:header="{title: '推荐商品', desc: 'Recommend Product'}"
				@toBanner="indexTopToDetailPage"
				@toList="toProductList({is_recommend: 1})"
				@detail="navToDetailPage"
				:banner="carouselList.index_recommend && carouselList.index_recommend[0]"/>
		<!--热门商品-->
		<rf-floor-index
				:list="hotProductList"
				:header="{title: '热门商品', desc: 'Hot Product'}"
				@toBanner="indexTopToDetailPage"
				@toList="toProductList({is_hot: 1})"
				@detail="navToDetailPage"
				:banner="carouselList.index_hot && carouselList.index_hot[0]"/>
		<!--猜你喜欢-->
		<rf-floor-index
				:list="guessYouLikeProductList"
				:header="{title: '猜你喜欢', desc: 'Guess You Like It'}"
				@toList="toProductList({guessYouLike: 1})"
				@detail="navToDetailPage"
				:bannerShow="false"/>
		<!--网站备案号-->
		<!--#ifdef H5-->
		<view class="copyright" v-show="config.web_site_icp">
			{{ config.copyright_desc }} <a href='http://www.beian.miit.gov.cn'>{{ config.web_site_icp }}</a>
		</view>

		<view class="uni-title uni-common-pl">商户切换</view>
		<view class="uni-list">
      <view class="uni-list-cell">
        <view class="uni-list-cell-left">
            当前选择
        </view>
        <view class="uni-list-cell-db">
            <picker @change="bindPickerChange" range-key="title" :value="index" :range="merchantList">
                <view class="uni-input">{{merchantList[index] && merchantList[index].title}}</view>
            </picker>
        </view>
    </view>
		</view>
		<!--#endif-->
	</view>
</template>

<script>
	/**
	 * @des 微商城首页
	 *
	 * @author stav stavyan@qq.com
	 * @date 2020-01-08 14:14
	 * @copyright 2019
	 */
	import {indexList} from "@/api/product";
  import {merchantIndex} from "@/api/merchant";
	import uniGrid from "@/components/uni-grid/uni-grid.vue";
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue";
	import uniIcons from '@/components/uni-icons/uni-icons.vue';
	import rfSwipeDot from '@/components/rf-swipe-dot/rf-swipe-dot';
	import rfFloorIndex from '@/components/rf-floor-index/rf-floor-index';
	import rfSearchBar from '@/components/rf-search-bar/rf-search-bar';
	export default {
		components: {
			uniGrid, uniIcons, uniGridItem, rfFloorIndex, rfSwipeDot, rfSearchBar
		},
		data() {
			return {
				current: 0,
				headerShow:true,
				carouselList: {},
				search: {},
				hotSearchDefault: '输入关键字搜索',
				hotProductList: [],
				recommendProductList: [],
				guessYouLikeProductList: [],
				newProductList: [],
				productCateList: [],
				brandList: [],
				config: {},
				index: 0,
				merchantList: [],
			};
		},
		onLoad() {
			this.initData();
		},
		onShareAppMessage() {
      return {
        title: '欢迎来到RageFrame商城',
        path: `/pages/index/index`
      }
		},
		//下拉刷新
		onPullDownRefresh(){
			this.getIndexList('refresh');
		},
		methods: {
	    // 监听切换商户
      bindPickerChange (e) {
        uni.setStorageSync('merchantId', this.merchantList[e.target.value].id);
        uni.setStorageSync('merchantIndex', e.target.value);
        this.index = e.target.value;
				uni.removeStorage({
	                key: 'userInfo'
	            })
				uni.removeStorage({
	                key: 'accessToken'
	            })
				this.getIndexList();
      },
	    // 监听轮播图切换
			handleDotChange(e) {
				this.current = e.detail.current
			},
			// 数据初始化
			initData () {
		    uni.removeStorageSync('cateTop');
				this.getIndexList();
			},
			// 跳转至商品分类列表(分类id)
			navToList(id){
				uni.navigateTo({
					url: `/pages/product/list?cate_id=${id}`
				})
			},
			// 跳至广告图指定页面
			indexTopToDetailPage(data, link){
				let url;
				let type;
				let id;
		    if (!link) {
			    type = data.type;
			    id = data.id;
		    } else {
	        id = link;
	        type = data;
		    }
				switch (type) {
					case 'product_view':
						url = `/pages/product/product?id=${id}`;
						break;
					case 'article_view':
						this.$api.msg('article_view');
						break;
					case 'coupon_view':
						url = `/pages/coupon/detail?id=${id}`;
						break;
					case 'helper_view':
						this.$api.msg('helper_view');
						break;
					case 'product_list_for_cate':
						url = `/pages/product/list?cate_id=${id}`;
						break;
					default:
						break;
				}
				if (url) {
					uni.navigateTo({
						url,
					})
				}
			},
			// 跳转至商品分类列表(参数)
			toProductList(params){
				uni.navigateTo({
					url: `/pages/product/list?params=${JSON.stringify(params)}`
				})
			},
			// 获取主页数据
			async getIndexList(type) {
				uni.showLoading({title: '加载中...'});
				await this.$get(`${indexList}`, {}).then(async r => {
            await this.$get(`${merchantIndex}`, {}).then(r => {
                this.merchantList = r.data
		            this.index = uni.getStorageSync('merchantIndex') || r.data.length - 1;
            })
            if (type === 'refresh') {
                uni.stopPullDownRefresh();
            }
            this.productCateList = r.data.cate;
            this.carouselList = r.data.adv;
            this.search = r.data.search;
            uni.setStorageSync('search', this.search)
            this.hotSearchDefault = `请输入关键字 如: ${r.data.search.hot_search_default}`;
            uni.setStorage({
                key: 'hotSearchDefault',
                data: r.data.search.hot_search_default
            });
            this.hotProductList = r.data.product_hot;
            this.recommendProductList = r.data.product_recommend;
            this.guessYouLikeProductList = r.data.guess_you_like;
            this.newProductList = r.data.product_new;
            this.config = r.data.config;
        })
			},
			// 跳转至商品详情页
			navToDetailPage(data) {
		    const { id } = data;
				if (!id) return;
				uni.navigateTo({
					url: `/pages/product/product?id=${id}`
				})
			},
			// 跳转至搜索详情页
			toSearch () {
				uni.navigateTo({
					url: `/pages/search/search?search=${JSON.stringify(this.search)}`
				})
			},
			// 跳转至分类页
			toCategory () {
				uni.reLaunch({
					url: `/pages/category/category`
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
.index {
	/*轮播图*/
	.swiper {
		width: 100%;
		margin-top: 10upx;
		display: flex;
		justify-content: center;
		.swiper-box {
			width: 92%;
			height: 40vw;
			overflow: hidden;
			border-radius: 15upx;
			box-shadow: 0upx 8upx 25upx rgba(0, 0, 0, 0.2);
			//兼容ios，微信小程序
			position: relative;
			z-index: 1;
			swiper {
				width: 100%;
				height: 40vw;
				swiper-item {
					image {
						width: 100%;
						height: 40vw;
					}
				}
			}
		}
	}
	/*分类列表*/
	.category-list {
		width: 100%;
		padding: 0 0 30upx 0;
		border-bottom: solid 2upx #f6f6f6;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.category {
			width: 20%;
			margin-top: 50upx;
			display: flex;
			flex-wrap: wrap;
			.img {
				width: 100%;
				display: flex;
				justify-content: center;
				image {
					width: 9vw;
					height: 9vw;
				}
			}
			.text {
				margin-top: 16upx;
				width: 100%;
				display: flex;
				justify-content: center;
				font-size: 24upx;
				color: #3c3c3c;
			}
		}
	}
	/*版权显示*/
	.copyright {
		margin: 10upx 0;
		width: 100%;
		text-align: center;
		color: #666;
		a {
			display: block;
			color: #666;
			text-decoration: none;
		}
	}
	/*商户切换*/
	.uni-list {
		padding: 20upx 0;
		.uni-list-cell {
			.uni-input {
				padding: 0;
			}
		}
	}
}
</style>
