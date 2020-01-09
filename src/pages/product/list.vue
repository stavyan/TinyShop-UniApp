<template>
	<view class="container">
		<!-- 状态栏 -->
		<view v-if="showHeader" class="status" :style="{ position: headerPosition1,top:statusTop,opacity: afterHeaderOpacity}"></view>
		<!-- 顶部导航栏 -->
		<view v-if="showHeader" class="header" :style="{ position: headerPosition1,top:headerTop1,opacity: afterHeaderOpacity }">
			<!-- 定位城市 -->
			<view class="addr" @tap.stop="toHome">
				<view class="icon yticon icon-xiatubiao--copy" ></view>
				主页
			</view>
			<!-- 搜索框 -->
			<view class="input-box">
				<input
					@confirm="handleSearchProduct"
					@blur="handleSearchProductBlur"
					:value="keyword || hotSearchDefault"
				  style="color:#888;"
				 	placeholder-style="color:#ccc;"
				/>
				<view class="icon search" @tap.prevent="handleSearchProductList"></view>
			</view>
		</view>
		<view v-show="isShowNavBar" class="navbar">
			<view class="nav-item" :class="{current: filterIndex === 0}" @tap="tabClick(0)">
				综合排序
			</view>
			<view class="nav-item" :class="{current: filterIndex === 1}" @tap="tabClick(1)">
				<text>销量</text>
				<view class="p-box">
					<text :class="{active: salesOrder === 1 && filterIndex === 1}" class="yticon icon-shang"></text>
					<text :class="{active: salesOrder === 2 && filterIndex === 1}" class="yticon icon-shang xia"></text>
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
					<text :class="{active: priceOrder === 1 && filterIndex === 4}" class="yticon icon-shang"></text>
					<text :class="{active: priceOrder === 2 && filterIndex === 4}" class="yticon icon-shang xia"></text>
				</view>
			</view>
			<text class="cate-item yticon icon-fenlei1" @tap="toggleCateMask('show')"></text>
		</view>
		<view class="goods-list">
			<view
				v-for="(item, index) in goodsList" :key="index"
				class="goods-item"
				@tap="navToDetailPage(item)"
			>
				<view class="image-wrapper">
					<image :src="item.picture" mode="aspectFill"></image>
				</view>
				<text class="title clamp in2line">{{item.name}}</text>
				<view class="price-box">
					<text class="price">{{item.price}}
						<text class="m-price" v-if="item.market_price > item.price">¥ {{ item.market_price }}</text>
					</text>
					<text>{{item.sales}}人付款</text>
				</view>
			</view>
		</view>
		<uni-load-more :status="loadingType"></uni-load-more>
		<empty :info="'赶紧通知老板进货'" v-if="goodsList.length === 0"></empty>
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
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import empty from "@/components/empty";
	import uniIcons from '@/components/uni-icons/uni-icons.vue';
	import {guessYouLikeList, productCate, productList} from "../../api/product";

	export default {
		components: {
			uniLoadMore,
			empty,
			uniIcons
		},
		data() {
			return {
				showHeader:true,
				afterHeaderOpacity: 1,//不透明度
				headerPosition1:"fixed",
				headerTop1:"0px",
				statusTop:null,
				nVueTitle:null,
				cateMaskState: 0, //分类面板展开状态
				headerPosition:"fixed",
				headerTop:"0px",
				contentTop: "96upx",
				loadingType: 'more', //加载更多状态
				filterIndex: 0,
				cateId: 0, //已选三级分类id
				priceOrder: 0, //1 价格从低到高 2价格从高到低
				salesOrder: 0, //1 价格从低到高 2价格从高到低
				cateList: [],
				goodsList: [],
				keyword: null,
				cateParams: null,
				page: 1,
				filterParams: {},
				isShowNavBar: true,
				hotSearchDefault: '请输入关键词'
			};
		},
		onLoad(options){
			this.initData(options);
		},
		onShow (){
			if (navigator) {
				this.headerTop = document.getElementsByTagName('uni-page-head')[0] && document.getElementsByTagName('uni-page-head')[0].offsetHeight+'px';
			}
		},
		onPageScroll(e){
			//兼容iOS端下拉时顶部漂移
			if(e.scrollTop>=0){
				this.headerPosition = "fixed";
			}else{
				this.headerPosition = "absolute";
			}
		},
		//下拉刷新
		onPullDownRefresh(){
			this.filterParams = {}
			this.page = 1;
			this.goodsList = [];
			this.getProductList('refresh');
		},
		//加载更多
		onReachBottom(){
			this.page ++;
			this.getProductList();
		},
		methods: {
			/**
			 *@des 初始化数据
			 *@author stav stavyan@qq.com
			 *@blog https://stavtop.club
			 *@date 2019/11/18 15:34:23
			 *@param arguments
			 */
			initData (options) {
				if (navigator) {
					this.headerTop = document.getElementsByTagName('uni-page-head')[0] && document.getElementsByTagName('uni-page-head')[0].offsetHeight+'px';
				}
				this.cateId = options.cate_id;
				if (options.params) {
					this.cateParams = JSON.parse(options.params);
					if (this.cateParams.guessYouLike === 1) {
						this.isShowNavBar = false;
						this.contentTop = '20upx';
						this.getGuessYouLikeList();
						return;
					}
				}
				this.keyword = options.keyword;
				if (!this.keyword) {
					this.hotSearchDefault = uni.getStorageSync('hotSearchDefault')
				}
				this.getProductCate()
				this.getProductList();
			},
			handleSearchProduct (e) {
				this.keyword = e.detail.value;
				this.handleSearchProductList();
			},
			handleSearchProductBlur (e) {
				this.keyword = e.detail.value;
			},
			handleSearchProductList () {
				this.page = 1;
				this.goodsList = [];
				this.filterParams = {}
				this.getProductList();
			},
			toHome () {
				uni.reLaunch({
					url: `/pages/index/index`
				})
			},
			/**
			 *@des 获取商品列表
			 *@author stav stavyan@qq.com
			 *@blog https://stavtop.club
			 *@date 2019/11/21 14:26:16
			 *@param type [refresh -> 刷新]
			 */
			async getProductList (type) {
				let params = {}
				if (this.keyword) {
					params.keyword = this.keyword
				} else if (this.cateId) {
					params.cate_id = this.cateId
				} else if (this.cateParams) {
					params = { ...this.cateParams}
				}
				params.page = this.page;
				uni.showLoading({title:'加载中...'});
				await this.$get(`${productList}`, {
					...params,
					...this.filterParams
				}).then(r=>{
					if (type === 'refresh') {
						uni.stopPullDownRefresh();
					}
					if (r.code === 200) {
						this.loadingType  = r.data.length === 10 ? 'more' : 'nomore';
						this.goodsList = [ ...this.goodsList, ...r.data ];
					} else {
						uni.showToast({ title: r.message, icon: "none" });
					}
				}).catch(err => {
					console.log(err)
				})
			},
			async getGuessYouLikeList (type) {
				uni.showLoading({title:'加载中...'});
				await this.$get(`${guessYouLikeList}`, {
				}).then(r=>{
					if (type === 'refresh') {
						uni.stopPullDownRefresh();
					}
					if (r.code === 200) {
						this.loadingType  = r.data.length === 10 ? 'more' : 'nomore';
						this.goodsList = [ ...this.goodsList, ...r.data ];
					} else {
						uni.showToast({ title: r.message, icon: "none" });
					}
				}).catch(err => {
					console.log(err)
				})
			},
			/**
			 *@des 获取商品分类
			 *@author stav stavyan@qq.com
			 *@blog https://stavtop.club
			 *@date 2019/11/21 14:26:07
			 */
			async getProductCate () {
				uni.showLoading({title:'加载中...'});
				await this.$get(`${productCate}`).then(r=>{
					if (r.code === 200) {
						this.cateList = r.data
						this.cateList.unshift({
							title: '全部商品',
							id: ''
						})
					} else {
						uni.showToast({ title: r.message, icon: "none" });
					}
				}).catch(err => {
					console.log(err)
				})
			},
			//筛选点击
			tabClick(index){
				this.filterParams = {}
				if(this.filterIndex === index && index !== 4 && index !== 1){
					return;
				}
				this.filterIndex = index;
				if (index === 0) {
					this.filterParams = {}
				} else if (index === 1) {
					if(this.salesOrder === 1) {
						this.filterParams.sales = 'desc'
						this.salesOrder = 2;
					} else {
						this.filterParams.sales = 'asc'
						this.salesOrder = 1;
					}
				}  else if (index === 2) {
					this.filterParams.view = 'desc';
				}  else if (index === 3) {
					this.filterParams.collect = 'desc';
				} else if(index === 4) {
					if(this.priceOrder === 1) {
						this.filterParams.price = 'desc'
						this.priceOrder = 2;
					} else {
						this.filterParams.price = 'asc'
						this.priceOrder = 1;
					}
				}
				uni.pageScrollTo({
					duration: 300,
					scrollTop: 0
				})
				this.page = 1;
				this.goodsList = [];
				this.getProductList();
			},
			//显示分类面板
			toggleCateMask(type){
				let timer = type === 'show' ? 10 : 300;
				let	state = type === 'show' ? 1 : 0;
				this.cateMaskState = 2;
				setTimeout(()=>{
					this.cateMaskState = state;
				}, timer)
			},
			//分类点击
			changeCate(id){
				if(!id) {
					this.cateParams = null;
					this.cateId = null;
					this.keywords = null;
				}
				this.cateId = id;
				this.keyword = undefined;
				this.toggleCateMask();
				uni.pageScrollTo({
					duration: 300,
					scrollTop: 0
				})
				this.page = 1;
				this.goodsList = [];
				this.filterParams = {}
				this.getProductList('refresh');
			},
			//详情
			navToDetailPage(item){
				uni.navigateTo({
					url: `/pages/product/product?id=${item.id}`
				})
			},
			stopPrevent(){}
		},
	}
</script>

<style lang="scss">
	page,{
		background: $page-color-base;
	}
	.navbar{
		position: fixed;
		left: 0;
		top: 88upx;
		/*top: var(--window-top);*/
		display: flex;
		width: 100%;
		height: 80upx;
		background: #fff;
		box-shadow: 0 2upx 10upx rgba(0,0,0,.06);
		z-index: 10;
		.nav-item{
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 30upx;
			color: $font-color-dark;
			position: relative;
			&.current{
				color: $base-color;
				&:after{
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
		.p-box{
			display: flex;
			flex-direction: column;
			.yticon{
				display: flex;
				align-items: center;
				justify-content: center;
				width: 30upx;
				height: 14upx;
				line-height: 1;
				margin-left: 4upx;
				font-size: 26upx;
				color: #888;
				&.active{
					color: $base-color;
				}
			}
			.xia{
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
			&:after{
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
	/* 分类 */
	.cate-mask{
		position: fixed;
		left: 0;
		top: 40px;
		bottom: 0;
		width: 100%;
		background: rgba(0,0,0,0);
		z-index: 95;
		transition: .3s;

		.cate-content{
			width: 630upx;
			height: 100%;
			background: #fff;
			float:right;
			transform: translateX(100%);
			transition: .3s;
		}
		&.none{
			display: none;
		}
		&.show{
			background: rgba(0,0,0,.4);

			.cate-content{
				transform: translateX(0);
			}
		}
	}
	.cate-list{
		display: flex;
		flex-direction: column;
		height: 100%;
		.cate-item{
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
		.two{
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
		.active{
			color: $base-color;
		}
	}
	/* 商品列表 */
	.goods-list{
		/* #ifdef H5 */
		margin-top: 176upx;
    /* #endif */
		/* #ifdef MP */
		margin-top: 176upx;
    /* #endif */
		display:flex;
		flex-wrap:wrap;
		padding: 0 30upx;
		background: #fff;
		.goods-item{
			display:flex;
			flex-direction: column;
			width: 48%;
			padding-bottom: 40upx;
			&:nth-child(2n+1){
				margin-right: 4%;
			}
		}
		.image-wrapper{
			width: 100%;
			height: 330upx;
			border-radius: 3px;
			margin-top: 15upx;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}
		.title{
			font-size: $font-base;
			color: $font-color-dark;
			line-height: 40upx;
		}
		.price-box{
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-right: 10upx;
			font-size: 24upx;
			color: $font-color-light;
		}
		.price{
			font-size: $font-base;
			color: $uni-color-primary;
			line-height: 1;
			&:before{
				content: '￥';
				font-size: 26upx;
			}
			.m-price{
				margin-left: 8upx;
				color: $font-color-light;
				font-size: $font-base - 4upx;
				text-decoration: line-through;
			}
		}
	}
	.status {
		width: 100%;
		height: 0;
		position: fixed;
		z-index: 10;
		background-color: #fff;
		top: 0;
		/*  #ifdef  APP-PLUS  */
		height: var(--status-bar-height); //覆盖样式
		/*  #endif  */
	}
	.header {
		width: 100%;
		height: 100upx;
		display: flex;
		align-items: center;
		position: fixed;
		top: 0;
		z-index: 10;
		background-color: #fff;
		/*  #ifdef  APP-PLUS  */
		top: var(--status-bar-height);
		/*  #endif  */
		.addr {
		width: 120upx;
		height: 60upx;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		font-size: 28upx;
		.icon {
			height: 60upx;
			margin-right: 5upx;
			margin-left: 15upx;
			display: flex;
			align-items: center;
			font-size: 36upx;
			color: $base-color;
		}
	}
		.input-box {
			width: 100%;
			height: 60upx;
			margin: 0 15upx;
			background-color: #f5f5f5;
			border-radius: 30upx;
			position: relative;
			display: flex;
			align-items: center;
			.icon {
				display: flex;
				align-items: center;
				position: absolute;
				top: 0;
				right: 0;
				width: 60upx;
				height: 60upx;
				font-size: 34upx;
				color: #c0c0c0;
			}
			input {
				width: 100%;
				padding-left: 28upx;
				height: 28upx;
				font-size: 28upx;
			}
		}
		.icon-btn {
			width: 120upx;
			height: 60upx;
			flex-shrink: 0;
			display: flex;
			.icon {
				width: 60upx;
				height: 60upx;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				font-size: 42upx;
			}
		}
	}
</style>
