<template>
	<view class="product-list">
		<!--顶部搜索导航栏-->
		<rf-search-bar
			@link="navToIndex"
			@search="handleSearchProductList"
			icon="iconxiatubiao--copy"
			title="主页"
			:inputDisabled="true"
			:placeholder="hotSearchDefault"/>
		<!--分类栏目-->
		<view v-if="isShowNavBar" class="navbar" :style="{top: navBarTop}">
			<view class="nav-item" :class="{current: filterIndex === 0}" @tap="tabClick(0)">
				综合排序
			</view>
			<view class="nav-item" :class="{current: filterIndex === 1}" @tap="tabClick(1)">
				<text>销量</text>
				<view class="p-box">
					<i :class="{active: salesOrder === 1 && filterIndex === 1}" class="iconfont iconshang"></i>
					<i :class="{active: salesOrder === 2 && filterIndex === 1}" class="iconfont iconshang xia"></i>
				</view>
			</view>
			<view class="nav-item" :class="{current: filterIndex === 2}" @tap="tabClick(2)">
				浏览量
			</view>
			<view class="nav-item" :class="{current: filterIndex === 3}" @tap="tabClick(3)">
				收藏
			</view>
			<view class="nav-item" :class="{current: filterIndex === 4}" @tap="tabClick(4)">
				<text>价格</text>
				<view class="p-box">
					<i :class="{active: priceOrder === 1 && filterIndex === 4}" class="iconfont iconshang"></i>
					<i :class="{active: priceOrder === 2 && filterIndex === 4}" class="iconfont iconshang xia"></i>
				</view>
			</view>
			<i class="cate-item iconfont iconfenlei1" @tap="toggleCateMask('show')"></i>
		</view>
		<view v-else class="navbar" :style="{top: navBarTop}">
			猜你喜欢
		</view>
		<!--商品列表-->
		<view class="rf-product-list" :style="{marginTop: contentTop}" v-if="goodsList.length > 0">
			<view
				v-for="(item, index) in goodsList" :key="index"
				class="product-item"
				@tap="navTo(`/pages/product/product?id=${item.id}`)"
			>
				<view class="image-wrapper">
					<image :src="item.picture" mode="aspectFill"></image>
				</view>
				<text class="title clamp in2line" v-if="item.name">{{item.name}}</text>
				<view class="last-line" v-if="item.name">
					<text class="price in1line">{{item.price}}
						<text class="m-price" v-if="item.market_price > item.price">¥ {{ item.market_price }}</text>
					</text>
					<text class="sales in1line">
						<text class="red">{{ item.sales }}</text>
						付款
					</text>
				</view>
			</view>
			<rf-load-more :status="loadingType" v-if="goodsList.length > 0"></rf-load-more>
		</view>
		<rf-empty :info="errorInfo || '该分类暂无商品'" v-if="goodsList.length === 0 && !loading"></rf-empty>
		<!--分类遮盖层-->
		<view class="cate-mask"
		      :class="cateMaskState===0 ? 'none' : cateMaskState===1 ? 'show' : ''"
		      @tap="toggleCateMask">
			<view class="cate-content" @tap.stop.prevent="stopPrevent" @touchmove.stop.prevent="stopPrevent">
				<scroll-view scroll-y class="cate-list">
					<view v-for="item in cateList" :key="item.id">
						<view class="cate-item one" @tap.stop="changeCate(item.id)">{{item.title}}</view>
						<view
							v-for="sItem in item.child" :key="sItem.id"
							class="cate-item two"
							:class="{active: sItem.id==cateId}"
							@tap.stop="changeCate(sItem.id)">
							{{sItem.title}}
							<view
								v-for="tItem in sItem.child" :key="tItem.id"
								class="cate-item three"
								:class="{active: tItem.id==cateId}"
								@tap.stop="changeCate(tItem.id)">
								{{tItem.title}}
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<!--页面加载动画-->
		<rf-loading v-if="loading"></rf-loading>
	</view>
</template>
<script>
	import { guessYouLikeList, productCate, productList } from '@/api/product';
	import rfLoadMore from '@/components/rf-load-more/rf-load-more';
	import rfSearchBar from '@/components/rf-search-bar';
	export default {
		components: {
			rfLoadMore,
			rfSearchBar
		},
		data() {
			return {
				loading: true,  // 加载动画
				navBarTop: '0',
				cateMaskState: 0, //分类面板展开状态
				loadingType: 'more', //加载更多状态
				filterIndex: 0,
				cateId: 0, //已选三级分类id
				priceOrder: 0, //1 价格从低到高 2价格从高到低
				salesOrder: 0, //1 价格从低到高 2价格从高到低
				cateList: [],
				goodsList: [],  // 商品列表
				keyword: null,  // 搜索关键字
				cateParams: null,
				page: 1,
				filterParams: {},
				isShowNavBar: true,
				hotSearchDefault: '请输入关键字',
				contentTop: '88upx',
				errorInfo: undefined // 接口请求出错信息
			};
		},
		onLoad(options) {
			this.initData(options);
		},
		//下拉刷新
		onPullDownRefresh() {
			this.filterParams = {};
			this.page = 1;
			this.goodsList.length = 0;
			this.getProductList('refresh');
		},
		//加载更多
		onReachBottom() {
			this.page++;
			this.getProductList();
		},
		methods: {
			// 初始化数据
			initData(options) {
				/*  #ifdef APP-PLUS  */
				switch (uni.getSystemInfoSync().platform) {
					case 'android':
						this.navBarTop = '128upx';
						break;
					case 'ios':
						// 刘海屏返回true，否则返回false
						if (plus.navigator.hasNotchInScreen()) {
							this.navBarTop = '168upx';
						} else {
							this.navBarTop = '128upx';
						}
						break;
				}
				/*  #endif  */
				/*  #ifndef APP-PLUS  */
				this.navBarTop = '94upx';
				/*  #endif  */
				/*  #ifdef MP  */
				this.contentTop = '98upx';
				/*  #endif  */
				this.cateId = options.cate_id;
				if (options.params) {
					this.cateParams = JSON.parse(options.params);
					if (this.cateParams.guessYouLike === 1) {
						this.isShowNavBar = false;
						this.getGuessYouLikeList();
						return;
					}
				}
				this.keyword = options.keyword;
				this.hotSearchDefault = options.keyword || '';
				this.getProductList();
				this.getProductCate();
			},
			// 搜索商品列表
			handleSearchProductList(e) {
				this.keyword = e.searchValue;
				this.page = 1;
				this.goodsList.length = 0;
				this.filterParams = {};
				this.getProductList();
			},
			// 跳转至主页
			navToIndex() {
				this.$mRouter.reLaunch({ route: '/pages/index/index' });
			},
			// 获取商品列表
			async getProductList(type) {
				let params = {};
				if (this.keyword) {
					params.keyword = this.keyword;
				} else if (this.cateId) {
					params.cate_id = this.cateId;
				} else if (this.cateParams) {
					params = { ...this.cateParams };
				}
				params.page = this.page;
				await this.$http.get(`${productList}`, {
					...params,
					...this.filterParams
				}).then(async r => {
					this.loading = false;
					if (type === 'refresh') {
						uni.stopPullDownRefresh();
					}
					this.loadingType = r.data.length === 10 ? 'more' : 'nomore';
					this.goodsList = [...this.goodsList, ...r.data];
				}).catch(err => {
					this.errorInfo = err;
					this.goodsList.length = 0;
					this.loading = false;
					if (type === 'refresh') {
						uni.stopPullDownRefresh();
					}
				});
			},
			async getGuessYouLikeList() {
				await this.$http.get(`${guessYouLikeList}`, {}).then(r => {
					this.loading = false;
					this.loadingType = r.data.length === 10 ? 'more' : 'nomore';
					this.goodsList = [...this.goodsList, ...r.data];
				}).catch(() => {
					this.loading = false;
				});
			},
			// 获取商品分类
			async getProductCate() {
				await this.$http.get(`${productCate}`).then(r => {
					this.cateList = r.data;
					this.cateList.unshift({
						title: '全部商品',
						id: ''
					});
				});
			},
			//筛选点击
			tabClick(index) {
				this.filterParams = {};
				if (this.filterIndex === index && index !== 4 && index !== 1) {
					return;
				}
				this.filterIndex = index;
				if (index === 0) {
					this.filterParams = {};
				} else if (index === 1) {
					if (this.salesOrder === 1) {
						this.filterParams.sales = 'desc';
						this.salesOrder = 2;
					} else {
						this.filterParams.sales = 'asc';
						this.salesOrder = 1;
					}
				} else if (index === 2) {
					this.filterParams.view = 'desc';
				} else if (index === 3) {
					this.filterParams.collect = 'desc';
				} else if (index === 4) {
					if (this.priceOrder === 1) {
						this.filterParams.price = 'desc';
						this.priceOrder = 2;
					} else {
						this.filterParams.price = 'asc';
						this.priceOrder = 1;
					}
				}
				uni.pageScrollTo({
					duration: 300,
					scrollTop: 0
				});
				this.page = 1;
				this.goodsList.length = 0;
				this.loading = true;
				this.getProductList();
			},
			//显示分类面板
			toggleCateMask(type) {
				let timer = type === 'show' ? 10 : 300;
				let state = type === 'show' ? 1 : 0;
				this.cateMaskState = 2;
				setTimeout(() => {
					this.cateMaskState = state;
				}, timer);
			},
			//分类点击
			changeCate(id) {
				if (!id) {
					this.cateParams = null;
					this.cateId = null;
					this.keyword = null;
				}
				this.cateId = id;
				this.keyword = undefined;
				this.toggleCateMask();
				uni.pageScrollTo({
					duration: 300,
					scrollTop: 0
				});
				this.page = 1;
				this.goodsList.length = 0;
				this.filterParams = {};
				this.loading = true;
				this.getProductList('refresh');
			},
			//跳转详情
			navTo(route) {
				this.$mRouter.push({ route });
			},
			stopPrevent() {
			}
		}
	};
</script>

<style lang="scss">
	page {
		background: $color-white;
	}

	.product-list {
		.navbar {
			position: fixed;
			left: 0;
			/*top: var(--window-top);*/
			display: flex;
			width: 100%;
			height: 80upx;
			background: #fff;
			box-shadow: 0 2upx 10upx rgba(0, 0, 0, .06);
			z-index: 10;

			.nav-item {
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				height: 100%;
				font-size: $font-base;
				color: $font-color-dark;
				position: relative;

				&.current {
					color: $base-color;

					&:after {
						content: '';
						position: absolute;
						left: 50%;
						bottom: 0;
						transform: translateX(-50%);
						width: 120upx;
						height: 0;
						border-bottom: 4upx solid $base-color;
					}
				}
			}

			.p-box {
				display: flex;
				flex-direction: column;

				.iconfont {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 30upx;
					height: 14upx;
					line-height: 1;
					margin-left: 4upx;
					font-size: 26upx;
					color: #888;

					&.active {
						color: $base-color;
					}
				}

				.xia {
					transform: scaleY(-1);
				}
			}

			.cate-item {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 100%;
				width: 80upx;
				position: relative;
				font-size: 44upx;

				&:after {
					content: '';
					position: absolute;
					left: 0;
					top: 50%;
					transform: translateY(-50%);
					border-left: 1px solid #ddd;
					width: 0;
					height: 36upx;
				}
			}
		}

		// 商品列表
		.rf-product-list {
			margin-top: 98upx;
		}

		/* 分类 */
		.cate-mask {
			position: fixed;
			left: 0;
			top: 40px;
			bottom: 0;
			width: 100%;
			background: rgba(0, 0, 0, 0);
			z-index: 95;
			transition: .3s;

			.cate-content {
				width: 630upx;
				height: 100%;
				background: #fff;
				float: right;
				transform: translateX(100%);
				transition: .3s;
			}

			&.none {
				display: none;
			}

			&.show {
				background: rgba(0, 0, 0, .4);

				.cate-content {
					transform: translateX(0);
				}
			}

			.cate-list {
				display: flex;
				flex-direction: column;
				height: 100%;

				.cate-item {
					display: flex;
					align-items: center;
					height: 70upx;
					padding-left: 30upx;
					font-size: 30upx;
					position: relative;
					color: $font-color-dark;
				}

				.one {
					background: #eee;
				}

				.two {
					background: #f8f8f8;
					color: $font-color-base;
					height: 60upx;
					font-size: 28upx;
					padding-left: 50upx;
				}

				.three {
					font-size: 26upx;
					color: $font-color-base;
				}

				.active {
					color: $base-color;
				}
			}
		}
	}
</style>
