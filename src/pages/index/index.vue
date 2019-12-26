<template>
	<view class="container">
		<!-- 小程序头部兼容 -->
		<!-- #ifdef MP -->
		<!-- #endif -->
		<!--<view class="mp-search-box" @click="toSearch">-->
			<!--<uni-icons :color="'#666'" class="icon-search" type="search" size="19" />-->
			<!--<input ref="search" disabled class="ser-input" type="text" :value="hotSearchDefault" />-->
		<!--</view>-->
		<!--&lt;!&ndash; 头部轮播 &ndash;&gt;-->
		<!--<view class="carousel-section">-->
			<!--&lt;!&ndash; 标题栏和状态栏占位符 &ndash;&gt;-->
			<!--<view class="titleNview-placing"></view>-->
			<!--&lt;!&ndash; 背景色区域 &ndash;&gt;-->
			<!--<view class="titleNview-background" :style="{backgroundColor: '#fa436a'}"></view>-->
			<!--&lt;!&ndash;<swiper class="carousel" circular @change="swiperChange">&ndash;&gt;-->
			<!--<swiper class="carousel" circular @change="swiperChange">-->
				<!--<swiper-item v-for="(item, index) in carouselList.index_top" :key="index" class="carousel-item" @click="indexTopToDetailPage(item.jump_type, item.jump_link)">-->
					<!--<image :src="item.cover" mode = “aspectFill” />-->
				<!--</swiper-item>-->
			<!--</swiper>-->
			<!--&lt;!&ndash; 自定义swiper指示器 &ndash;&gt;-->
			<!--<view class="swiper-dots">-->
				<!--<text class="num">{{swiperCurrent+1}}</text>-->
				<!--<text class="sign">/</text>-->
				<!--<text class="num">{{carouselList.index_top && carouselList.index_top.length}}</text>-->
			<!--</view>-->
		<!--</view>-->

		<!-- 状态栏 -->
		<view v-if="showHeader" class="status" :style="{ position: headerPosition,top:statusTop,opacity: afterHeaderOpacity}"></view>
		<!-- 顶部导航栏 -->
		<view v-if="showHeader" class="header" :style="{ position: headerPosition,top:headerTop,opacity: afterHeaderOpacity }">
			<!-- 定位城市 -->
			<view class="addr" @click.stop="toCategory">
				<view class="icon yticon icon-fenlei1" ></view>
				分类
			</view>
			<!-- 搜索框 -->
			<view class="input-box">
				<input
				 @click="toSearch"
				 disabled
				 style="color:#888;"
				 :value="hotSearchDefault"
					placeholder-style="color:#ccc;"
				/>
				<view class="icon search"></view>
			</view>
		</view>
		<!-- 占位 -->
		<view v-if="showHeader" class="place"></view>
		<!-- 轮播图 -->
		<view class="swiper">
			<view class="swiper-box">
				<swiper circular="true" autoplay="true" @change="swiperChange">
					<swiper-item v-for="(item, index) in carouselList.index_top" :key="index" @click="indexTopToDetailPage(item.jump_type, item.jump_link)">
						<image :src="item.cover" mode = "aspectFill" />
					</swiper-item>
				</swiper>
				<view class="indicator">
					<view
						class="dots"
						v-for="(item, index) in carouselList.index_top"
						:class="[swiperCurrent >= index ? 'on' : '']"
						:key="item.id"
					></view>
				</view>
			</view>
		</view>
		<!-- 分类列表 -->
		<view class="category-list">
			<view
				class="category"
				v-for="(item, index) in productCateList"
				:key="index"
				@click.stop="navToList(item.id)"
			>
				<view class="img"><image :src="item.cover" mode="aspectFit"></image></view>
				<view class="text">{{ item.title }}</view>
			</view>
		</view>
		<!--&lt;!&ndash; 分类 &ndash;&gt;-->
		<!--<uni-grid :column="4" class="grid" :showBorder="false">-->
				<!--<view class="grid-title">分类专区</view>-->
				<!--<uni-grid-item class="grid-item" v-for="(item, index) in productCateList" :key="index">-->
					<!--<image class="grid-item-image" :src="item.cover" @click.stop="navToList(item.id)"></image>-->
					<!--<text class="grid-item-text" @click.stop="navToList(item.id)">{{ item.title }}</text>-->
				<!--</uni-grid-item>-->
		<!--</uni-grid>-->
		<!--品牌专区-->
		<!--<uni-grid :column="4" class="grid" :showBorder="false">-->
				<!--<view class="grid-title">品牌专区</view>-->
				<!--<uni-grid-item class="grid-item" v-for="(item, index) in brandList" :key="index">-->
					<!--<image class="grid-item-image" :src="item.cover" @click.stop="toProductList({brand_id: item.id})"></image>-->
					<!--<text class="grid-item-text" @click.stop="toProductList({brand_id: item.id})">{{ item.title }}</text>-->
				<!--</uni-grid-item>-->
		<!--</uni-grid>-->
		<!--<view class="cate-section">-->
			<!--<view class="cate-item" v-for="(item, index) in productCateList" :key="index" @click="navToList(item.id)">-->
				<!--<image :src="item.cover"></image>-->
				<!--<text>{{ item.title }}</text>-->
			<!--</view>-->
		<!--</view>-->
		<!--&lt;!&ndash; 品牌 &ndash;&gt;-->
		<!--<view class="cate-section" style="margin: 10upx 0">-->
			<!--<view class="cate-item" v-for="(item, index) in brandList" :key="index" @click="navToList(item.id)">-->
				<!--<image :src="item.cover"></image>-->
				<!--<text>{{ item.title }}</text>-->
			<!--</view>-->
		<!--</view>-->
		<!--&lt;!&ndash; 秒杀楼层 &ndash;&gt;-->
		<!--<view class="seckill-section m-t">-->
			<!--<view class="s-header">-->
				<!--<image class="s-img" src="/static/temp/secskill-img.jpg" mode="widthFix"></image>-->
				<!--<text class="tip">8点场</text>-->
				<!--<text class="hour timer">07</text>-->
				<!--<text class="minute timer">13</text>-->
				<!--<text class="second timer">55</text>-->
				<!--<text class="yticon icon-you"></text>-->
			<!--</view>-->
			<!--<scroll-view class="floor-list" scroll-x>-->
				<!--<view class="scoll-wrapper">-->
					<!--<view-->
						<!--v-for="(item, index) in goodsList" :key="index"-->
						<!--class="floor-item"-->
						<!--@click="navToDetailPage(item)"-->
					<!--&gt;-->
						<!--<image :src="item.image" mode="aspectFill"></image>-->
						<!--<text class="title clamp">{{item.title}}</text>-->
						<!--<text class="price">￥{{item.price}}</text>-->
					<!--</view>-->
				<!--</view>-->
			<!--</scroll-view>-->
		<!--</view>-->

		<!--&lt;!&ndash; 团购楼层 &ndash;&gt;-->
		<!--<view class="f-header m-t">-->
			<!--<image src="/static/temp/h1.png"></image>-->
			<!--<view class="tit-box">-->
				<!--<text class="tit">精品团购</text>-->
				<!--<text class="tit2">Boutique Group Buying</text>-->
			<!--</view>-->
			<!--<text class="yticon icon-you"></text>-->
		<!--</view>-->
		<!--<view class="group-section">-->
			<!--<swiper class="g-swiper" :duration="500">-->
				<!--<swiper-item-->
					<!--class="g-swiper-item"-->
					<!--v-for="(item, index) in goodsList" :key="index"-->
					<!--v-if="index%2 === 0"-->
					<!--@click="navToDetailPage(item)"-->
				<!--&gt;-->
					<!--<view class="g-item left">-->
						<!--<image :src="item.image" mode="aspectFill"></image>-->
						<!--<view class="t-box">-->
							<!--<text class="title clamp">{{item.title}}</text>-->
							<!--<view class="price-box">-->
								<!--<text class="price">￥{{item.price}}</text>-->
								<!--<text class="m-price">￥188</text>-->
							<!--</view>-->

							<!--<view class="pro-box">-->
							  	<!--<view class="progress-box">-->
							  		<!--<progress percent="72" activeColor="#fa436a" active stroke-width="6" />-->
							  	<!--</view>-->
								<!--<text>6人成团</text>-->
							<!--</view>-->
						<!--</view>-->

					<!--</view>-->
					<!--<view class="g-item right">-->
						<!--<image :src="goodsList[index+1].image" mode="aspectFill"></image>-->
						<!--<view class="t-box">-->
							<!--<text class="title clamp">{{goodsList[index+1].title}}</text>-->
							<!--<view class="price-box">-->
								<!--<text class="price">￥{{goodsList[index+1].price}}</text>-->
								<!--<text class="m-price">￥188</text>-->
							<!--</view>-->
							<!--<view class="pro-box">-->
							  	<!--<view class="progress-box">-->
							  		<!--<progress percent="72" activeColor="#fa436a" active stroke-width="6" />-->
							  	<!--</view>-->
								<!--<text>10人成团</text>-->
							<!--</view>-->
						<!--</view>-->
					<!--</view>-->
				<!--</swiper-item>-->

			<!--</swiper>-->
		<!--</view>-->

		<!--&lt;!&ndash; 分类推荐楼层 &ndash;&gt;-->
		<!--<view class="f-header m-t">-->
			<!--<image src="/static/temp/h1.png"></image>-->
			<!--<view class="tit-box">-->
				<!--<text class="tit">分类精选</text>-->
				<!--<text class="tit2">Competitive Products For You</text>-->
			<!--</view>-->
			<!--<text class="yticon icon-you"></text>-->
		<!--</view>-->
		<!--<view class="hot-floor">-->
			<!--<view class="floor-img-box">-->
				<!--<image class="floor-img" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553409398864&di=4a12763adccf229133fb85193b7cc08f&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201703%2F19%2F20170319150032_MNwmn.jpeg" mode="scaleToFill"></image>-->
			<!--</view>-->
			<!--<scroll-view class="floor-list" scroll-x>-->
				<!--<view class="scoll-wrapper">-->
					<!--<view-->
						<!--v-for="(item, index) in goodsList" :key="index"-->
						<!--class="floor-item"-->
						<!--@click="navToDetailPage(item)"-->
					<!--&gt;-->
						<!--<image :src="item.image" mode="aspectFill"></image>-->
						<!--<text class="title clamp">{{item.title}}</text>-->
						<!--<text class="price">￥{{item.price}}</text>-->
					<!--</view>-->
					<!--<view class="more">-->
						<!--<text>查看全部</text>-->
						<!--<text>More+</text>-->
					<!--</view>-->
				<!--</view>-->
			<!--</scroll-view>-->
		<!--</view>-->
		<!--<view class="hot-floor">-->
			<!--<view class="floor-img-box">-->
				<!--<image class="floor-img" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553409984228&di=dee176242038c2d545b7690b303d65ea&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F5ef4da9f17faaf4612f0d5046f4161e556e9bbcfdb5b-rHjf00_fw658" mode="scaleToFill"></image>-->
			<!--</view>-->
			<!--<scroll-view class="floor-list" scroll-x>-->
				<!--<view class="scoll-wrapper">-->
					<!--<view-->
						<!--v-for="(item, index) in goodsList" :key="index"-->
						<!--class="floor-item"-->
						<!--@click="navToDetailPage(item)"-->
					<!--&gt;-->
						<!--<image :src="item.image3" mode="aspectFill"></image>-->
						<!--<text class="title clamp">{{item.title}}</text>-->
						<!--<text class="price">￥{{item.price}}</text>-->
					<!--</view>-->
					<!--<view class="more">-->
						<!--<text>查看全部</text>-->
						<!--<text>More+</text>-->
					<!--</view>-->
				<!--</view>-->
			<!--</scroll-view>-->
		<!--</view>-->
		<!--<view class="hot-floor">-->
			<!--<view class="floor-img-box">-->
				<!--<image class="floor-img" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553409794730&di=12b840ec4f5748ef06880b85ff63e34e&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01dc03589ed568a8012060c82ac03c.jpg%40900w_1l_2o_100sh.jpg" mode="scaleToFill"></image>-->
			<!--</view>-->
			<!--<scroll-view class="floor-list" scroll-x>-->
				<!--<view class="scoll-wrapper">-->
					<!--<view-->
						<!--v-for="(item, index) in goodsList" :key="index"-->
						<!--class="floor-item"-->
						<!--@click="navToDetailPage(item)"-->
					<!--&gt;-->
						<!--<image :src="item.image2" mode="aspectFill"></image>-->
						<!--<text class="title clamp">{{item.title}}</text>-->
						<!--<text class="price">￥{{item.price}}</text>-->
					<!--</view>-->
					<!--<view class="more">-->
						<!--<text>查看全部</text>-->
						<!--<text>More+</text>-->
					<!--</view>-->
				<!--</view>-->
			<!--</scroll-view>-->
		<!--</view>-->
		<!-- 新品 -->
		<!--<view class="ad-1" @click="indexTopToDetailPage(carouselList.index_new[0].jump_type, carouselList.index_new[0].jump_link)">-->
			<!--<image :src="carouselList.index_new && carouselList.index_new[0].cover" mode="scaleToFill"></image>-->
		<!--</view>-->
		<!--&lt;!&ndash; 广告图 &ndash;&gt;-->
		<view class="banner" @click="indexTopToDetailPage(carouselList.index_new[0].jump_type, carouselList.index_new[0].jump_link)">
			<image :src="carouselList.index_new && carouselList.index_new[0].cover" mode="scaleToFill" />
		</view>
		<view class="f-header" @click="toProductList({is_new: 1})">
			<image src="/static/h1.png"></image>
			<view class="tit-box">
				<text class="tit">新品上市</text>
				<text class="tit2">New Products Listed</text>
			</view>
			<text class="yticon icon-you"></text>
		</view>
		<view class="guess-section">
			<view
				v-for="(item, index) in newProductList" :key="index"
				class="guess-item"
				@click="navToDetailPage(item.id)"
			>
				<view class="image-wrapper">
					<image :src="item.picture" mode="aspectFill"></image>
					 <text class="sketch">{{ item.sketch }}</text>
				</view>
				<text class="title clamp in2line">{{item.name}}</text>
				<view class="last-line">
					<text class="price">{{item.price}}
						<text class="m-price" v-if="item.market_price > item.price">¥ {{ item.market_price }}</text>
					</text>
					<text class="sales"><text class="red">{{ item.sales }}</text>付款</text>
				</view>
			</view>
		</view>

		<!-- 推荐 -->
		<!--<view class="ad-1" @click="indexTopToDetailPage(carouselList.index_recommend[0].jump_type, carouselList.index_recommend[0].jump_link)">-->
			<!--<image :src="carouselList.index_hot && carouselList.index_recommend[0].cover" mode="scaleToFill"></image>-->
		<!--</view>-->
		<view class="banner" @click="indexTopToDetailPage(carouselList.index_recommend[0].jump_type, carouselList.index_recommend[0].jump_link)">
			<image :src="carouselList.index_recommend && carouselList.index_recommend[0].cover" mode="scaleToFill" />
		</view>
		<view class="f-header" @click="toProductList({is_recommend: 1})">
			<image src="/static/h1.png"></image>
			<view class="tit-box">
				<text class="tit">推荐商品</text>
				<text class="tit2">Recommend Product</text>
			</view>
			<text class="yticon icon-you"></text>
		</view>
		<view class="guess-section">
			<view
				v-for="(item, index) in recommendProductList" :key="index"
				class="guess-item"
				@click="navToDetailPage(item.id)"
			>
				<view class="image-wrapper">
					<image :src="item.picture" mode="aspectFill"></image>
					 <text class="sketch">{{ item.sketch }}</text>
				</view>
				<text class="title clamp in2line">{{item.name}}</text>
				<view class="last-line">
					<text class="price">{{item.price}}
						<text class="m-price" v-if="item.market_price > item.price">¥ {{ item.market_price }}</text>
					</text>
					<text class="sales"><text class="red">{{ item.sales }}</text>付款</text>
				</view>
			</view>
		</view>

		<!-- 热门 -->
		<!--<view class="ad-1" @click="indexTopToDetailPage(carouselList.index_hot[0].jump_type, carouselList.index_hot[0].jump_link)">-->
			<!--<image :src="carouselList.index_hot && carouselList.index_hot[0].cover" mode="scaleToFill"></image>-->
		<!--</view>-->
		<view class="banner" @click="indexTopToDetailPage(carouselList.index_hot[0].jump_type, carouselList.index_hot[0].jump_link)">
			<image :src="carouselList.index_hot && carouselList.index_hot[0].cover" mode="scaleToFill" />
		</view>
		<view class="f-header" @click="toProductList({is_hot: 1})">
			<image src="/static/h1.png"></image>
			<view class="tit-box">
				<text class="tit">热门商品</text>
				<text class="tit2">Hot Product</text>
			</view>
			<text class="yticon icon-you"></text>
		</view>
		<view class="guess-section">
			<view
				v-for="(item, index) in hotProductList" :key="index"
				class="guess-item"
				@click="navToDetailPage(item.id)"
			>
				<view class="image-wrapper">
					<image :src="item.picture" mode="aspectFill"></image>
					 <text class="sketch">{{ item.sketch }}</text>
				</view>
				<text class="title clamp in2line">{{item.name}}</text>
				<view class="last-line">
					<text class="price">{{item.price}}
						<text class="m-price" v-if="item.market_price > item.price">¥ {{ item.market_price }}</text>
					</text>
					<text class="sales"><text class="red">{{ item.sales }}</text>付款</text>
				</view>
			</view>
		</view>

		<!-- 猜你喜欢 -->
		<view class="f-header m-t" @click="toProductList({'guessYouLike': 1})">
			<image src="/static/h1.png"></image>
			<view class="tit-box">
				<text class="tit">猜你喜欢</text>
				<text class="tit2">Guess You Like It</text>
			</view>
			<text class="yticon icon-you"></text>
		</view>
		<view class="guess-section">
			<view
				v-for="(item, index) in guessYouLikeProductList" :key="index"
				class="guess-item"
				@click="navToDetailPage(item.id)"
			>
				<view class="image-wrapper">
					<image :src="item.picture" mode="aspectFill"></image>
					<text class="sketch">{{ item.sketch }}</text>
				</view>
				<text class="title in2line">{{item.name}}</text>
				<view class="last-line">
					<text class="price">{{item.price}}
						<text class="m-price" v-if="item.market_price > item.price">¥ {{ item.market_price }}</text>
					</text>
					<text class="sales"><text class="red">{{ item.sales }}</text>付款</text>
				</view>
			</view>
		</view>

		<!--#ifdef H5-->
		<view class="copyright" v-show="config.web_site_icp">
			{{ config.copyright_desc }} <a href='http://www.beian.miit.gov.cn'>{{ config.web_site_icp }}</a>
		</view>
		<!--#endif-->
	</view>
</template>

<script>
	import {brandList, indexList} from "../../api/product";
	import uniGrid from "@/components/uni-grid/uni-grid.vue";
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue";
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	export default {
		components: {
			uniGrid,
			uniIcons,
			uniGridItem
		},
		data() {
			return {
				code: null,
				showHeader:true,
				afterHeaderOpacity: 1,//不透明度
				headerPosition: 'fixed',
				headerTop:null,
				statusTop:null,
				nVueTitle:null,
				city: '北京',
				currentSwiper: 0,
				// 轮播图片
				swiperList: [
					{ id: 1, src: 'url1', img: '/static/img/1.jpg' },
					{ id: 2, src: 'url2', img: '/static/img/2.jpg' },
					{ id: 3, src: 'url3', img: '/static/img/3.jpg' }
				],
				// 分类菜单
				categoryList: [
					{ id: 1, name: '办公', img: '/static/img/category/1.png' },
					{ id: 2, name: '家电', img: '/static/img/category/2.png' },
					{ id: 3, name: '服饰', img: '/static/img/category/3.png' },
					{ id: 4, name: '日用', img: '/static/img/category/4.png' },
					{ id: 5, name: '蔬果', img: '/static/img/category/5.png' },
					{ id: 6, name: '运动', img: '/static/img/category/6.png' },
					{ id: 7, name: '书籍', img: '/static/img/category/7.png' },
					{ id: 8, name: '文具', img: '/static/img/category/8.png' }
				],
				titleNViewBackground: '',
				swiperCurrent: 0,
				swiperLength: 0,
				carouselList: {},
				search: {},
				hotSearchDefault: '输入关键字搜索',
				hotProductList: [],
				recommendProductList: [],
				guessYouLikeProductList: [],
				newProductList: [],
				productCateList: [],
				brandList: [],
				config: {}
			};
		},
		onLoad(options) {
			this.code = options.code;
			this.initData();
		},
		//下拉刷新
		onPullDownRefresh(){
			this.getIndexList('refresh');
		},
		methods: {
			/**
			 *@des 初始化数据
			 *@author stav stavyan@qq.com
			 *@blog https://stavtop.club
			 *@date 2019/12/02 16:14:02
			 */
			initData () {
				if (this.isWechat() && !this.code) {
					const url = window.location.href;
					window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?
					appid=wx869d264c83ad71cc&
					redirect_uri=${url}&
					response_type=code&
					scope=snsapi_userinfo&
					state=STATE#wechat_redirect`;
				}
				this.getIndexList();
			},
			isWechat(){
					const ua = window.navigator.userAgent.toLowerCase();
					if(ua.match(/micromessenger/i) == 'micromessenger'){
							return true;
					}else{
							return false;
					}
			},
			navToList(id){
				uni.navigateTo({
					url: `/pages/product/list?cate_id=${id}`
				})
			},
			indexTopToDetailPage(type, id){
				let url;
				switch (type) {
					case 'product_view':
						url = `/pages/product/product?id=${id}`;
						break;
					case 'article_view':
						uni.showToast({title: 'article_view', icon: "none"});
						break;
					case 'coupon_view':
						url = `/pages/coupon/detail?id=${id}`;
						break;
					case 'helper_view':
						uni.showToast({title: 'helper_view', icon: "none"});
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
			toProductList(params){
				uni.navigateTo({
					url: `/pages/product/list?params=${JSON.stringify(params)}`
				})
			},
			/**
			 *@des 获取平台列表
			 *@author stav stavyan@qq.com
			 *@blog https://stavtop.club
			 *@date 2019/12/16 15:20:21
			 */
			async getBrandList() {
				uni.showLoading({title: '加载中...'});
				await this.$get(`${brandList}`, {}).then(r => {
					if (r.code === 200) {
						this.brandList = r.data;
					} else {
						uni.showToast({title: r.message, icon: "none"});
					}
				}).catch(err => {
					console.log(err)
				})
			},
			async getIndexList(type) {
				uni.showLoading({title: '加载中...'});
				await this.$get(`${indexList}`, {}).then(r => {
					if (type === 'refresh') {
						uni.stopPullDownRefresh();
					}
					if (r.code === 200) {
						this.getBrandList();
						this.productCateList = r.data.cate;
						this.carouselList = r.data.adv;
						this.search = r.data.search;
						this.hotSearchDefault = `请输入关键字 如: ${r.data.search.hot_search_default}`;
						uni.setStorage({
								key: 'hotSearchDefault',
								data: r.data.search.hot_search_default
						})
						this.hotProductList = r.data.product_hot;
						this.recommendProductList = r.data.product_recommend;
						this.guessYouLikeProductList = r.data.guess_you_like;
						this.newProductList = r.data.product_new;
						this.config = r.data.config;
					} else {
						uni.showToast({title: r.message, icon: "none"});
					}
				}).catch(err => {
					console.log(err)
				})
			},
			//轮播图切换修改背景色
			swiperChange(e) {
				const index = e.detail.current;
				this.swiperCurrent = index;
			},
			//详情页
			navToDetailPage(id) {
				if (!id) return;
				uni.navigateTo({
					url: `/pages/product/product?id=${id}`
				})
			},
			toSearch () {
				uni.navigateTo({
					url: `/pages/search/search?search=${JSON.stringify(this.search)}`
				})
			},
			toCategory () {
				uni.reLaunch({
					url: `/pages/category/category`
				})
			}
		},
		// #ifndef MP
		// 标题栏input搜索框点击
		async onNavigationBarSearchInputClicked () {
			uni.navigateTo({
				url: `/pages/search/search?search=${JSON.stringify(this.search)}`
			})
		},
		//点击导航栏 buttons 时触发
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				this.$api.msg('点击了扫描');
			} else if (index === 1) {
				// #ifdef APP-PLUS
				const pages = getCurrentPages();
				const page = pages[pages.length - 1];
				const currentWebview = page.$getAppWebview();
				currentWebview.hideTitleNViewButtonRedDot({
					index
				});
				// #endif
				uni.navigateTo({
					url: '/pages/notice/notice'
				})
			}
		}
		// #endif
	}
</script>

<style lang="scss">
	/* #ifdef MP */
	page{
		.cate-section{
			position:relative;
			z-index:5;
			border-radius:16upx 16upx 0 0;
			margin-top:-20upx;
		}
		.carousel-section{
			padding-top: 90upx;
			background: #dd524d;
			.titleNview-placing {
				padding-top: 0;
				height: 0;
			}
			.carousel{
				.carousel-item{
					padding: 0;
				}
			}
			.swiper-dots{
				left:45upx;
				bottom:40upx;
			}
		}
	}
	/* #endif */

page {
		position: relative;
		background-color: #fff;
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
	width: 96%;
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
			font-size: 38upx;
			color: $base-color;
		}
	}
	.input-box {
		width: 100%;
		height: 60upx;
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
.place {
	background-color: #ffffff;
	height: 100upx;
	/*  #ifdef  APP-PLUS  */
	margin-top: var(--status-bar-height);
	/*  #endif  */
}
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
		.indicator {
			position: absolute;
			bottom: 20upx;
			left: 20upx;
			background-color: rgba(255, 255, 255, 0.4);
			width: 150upx;
			height: 5upx;
			border-radius: 3upx;
			overflow: hidden;
			display: flex;
			.dots {
				width: 0upx;
				background-color: rgba(255, 255, 255, 1);
				transition: all 0.3s ease-out;
				&.on {
					width: (100%/2);
				}
			}
		}
	}
}
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
.banner {
	width: 92%;
	margin: 20upx 4% 0;
	image {
		width: 100%;
		height: 22vw;
		border-radius: 11vw;
		box-shadow: 0upx 5upx 25upx rgba(0, 0, 0, 0.3);
	}
}
	.m-t{
		margin-top: 16upx;
	}
	/* 头部 轮播图 */
	.carousel-section {
		position: relative;
		.titleNview-placing {
			height: var(--status-bar-height);
			padding-top: 44px;
			box-sizing: content-box;
		}

		.titleNview-background {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 426upx;
			transition: .4s;
		}
	}
	.carousel {
		width: 100%;
		height: 350upx;
		.carousel-item {
			width: 100%;
			height: 100%;
			overflow: hidden;
		}

		image {
			width: 92%;
			margin: 0 4%;
			height: 100%;
			border-radius: 10upx;
		}
	}
	.swiper-dots {
		display: flex;
		position: absolute;
		left: 60upx;
		bottom: 15upx;
		width: 72upx;
		height: 36upx;
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABkCAYAAADDhn8LAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTk4MzlBNjE0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTk4MzlBNjA0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0E3RUNERkE0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0E3RUNERkI0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4Gh5BPAAACTUlEQVR42uzcQW7jQAwFUdN306l1uWwNww5kqdsmm6/2MwtVCp8CosQtP9vg/2+/gY+DRAMBgqnjIp2PaCxCLLldpPARRIiFj1yBbMV+cHZh9PURRLQNhY8kgWyL/WDtwujjI8hoE8rKLqb5CDJaRMJHokC6yKgSCR9JAukmokIknCQJpLOIrJFwMsBJELFcKHwM9BFkLBMKFxNcBCHlQ+FhoocgpVwwnv0Xn30QBJGMC0QcaBVJiAMiec/dcwKuL4j1QMsVCXFAJE4s4NQA3K/8Y6DzO4g40P7UcmIBJxbEesCKWBDg8wWxHrAiFgT4fEGsB/CwIhYE+AeBAAdPLOcV8HRmWRDAiQVcO7GcV8CLM8uCAE4sQCDAlHcQ7x+ABQEEAggEEAggEEAggEAAgQACASAQQCCAQACBAAIBBAIIBBAIIBBAIABe4e9iAe/xd7EAJxYgEGDeO4j3EODp/cOCAE4sYMyJ5cwCHs4rCwI4sYBxJ5YzC84rCwKcXxArAuthQYDzC2JF0H49LAhwYUGsCFqvx5EF2T07dMaJBetx4cRyaqFtHJ8EIhK0i8OJBQxcECuCVutxJhCRoE0cZwMRyRcFefa/ffZBVPogePihhyCnbBhcfMFFEFM+DD4m+ghSlgmDkwlOgpAl4+BkkJMgZdk4+EgaSCcpVX7bmY9kgXQQU+1TgE0c+QJZUUz1b2T4SBbIKmJW+3iMj2SBVBWz+leVfCQLpIqYbp8b85EskIxyfIOfK5Sf+wiCRJEsllQ+oqEkQfBxmD8BBgA5hVjXyrBNUQAAAABJRU5ErkJggg==);
		background-size: 100% 100%;

		.num {
			width: 36upx;
			height: 36upx;
			border-radius: 50px;
			font-size: 24upx;
			color: #fff;
			text-align: center;
			line-height: 36upx;
		}

		.sign {
			position: absolute;
			top: 0;
			left: 50%;
			line-height: 36upx;
			font-size: 12upx;
			color: #fff;
			transform: translateX(-50%);
		}
	}
	/* 分类 */
	.grid {
		background-color: #fff;
		margin: 10upx 0;
		.grid-title {
			width: 100%;
			font-size: $font-lg + 2upx;
			color: $font-color-dark;
			margin: 0 10upx 10upx;
			/*height: 36upx;*/
			/*line-height: 36upx;*/
			/*padding-left: 10upx;*/
			/*margin: 10upx 0 15upx 10upx;*/
		}
		.grid-item {
			text-align: center;
			.grid-item-image {
				margin: 4upx auto;
				width: 90upx;
				height: 90upx;
				border-radius: 50%;
				opacity: .7;
				box-shadow: 4upx 4upx 20upx rgba(250, 67, 106, 0.3);
			}
		}
	}
	.ad-1{
		width: 100%;
		height: 200upx;
		padding: 10upx 0;
		background: #fff;
		margin: 10upx 0;
		image{
			border-radius: 100upx;
			width:100%;
			height: 100%;
		}
	}
	.f-header{
		display:flex;
		align-items:center;
		height: 140upx;
		padding: 6upx 30upx 8upx;
		background: #fff;
		image{
			flex-shrink: 0;
			width: 80upx;
			height: 80upx;
			margin-right: 20upx;
		}
		.tit-box{
			flex: 1;
			display: flex;
			flex-direction: column;
		}
		.tit{
			font-size: $font-lg +2upx;
			color: #font-color-dark;
			line-height: 1.3;
		}
		.tit2{
			font-size: $font-sm;
			color: $font-color-light;
		}
		.icon-you{
			font-size: $font-lg +2upx;
			color: $font-color-light;
		}
	}
	/* 分类推荐楼层 */
	.hot-floor{
		width: 100%;
		overflow: hidden;
		margin-bottom: 20upx;
		.floor-img-box{
			width: 100%;
			height:320upx;
			position:relative;
			&:after{
				content: '';
				position:absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				background: linear-gradient(rgba(255,255,255,.06) 30%, #f8f8f8);
			}
		}
		.floor-img{
			width: 100%;
			height: 100%;
		}
		.floor-list{
			white-space: nowrap;
			padding: 20upx;
			padding-right: 50upx;
			border-radius: 6upx;
			margin-top:-140upx;
			margin-left: 30upx;
			background: #fff;
			box-shadow: 1px 1px 5px rgba(0,0,0,.2);
			position: relative;
			z-index: 1;
		}
		.scoll-wrapper{
			display:flex;
			align-items: flex-start;
		}
		.floor-item{
			width: 180upx;
			margin-right: 20upx;
			font-size: $font-sm+2upx;
			color: $font-color-dark;
			line-height: 1.8;
			image{
				width: 180upx;
				height: 180upx;
				border-radius: 6upx;
			}
			.price{
				color: $uni-color-primary;
			}
		}
		.more{
			display:flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			flex-shrink: 0;
			width: 180upx;
			height: 180upx;
			border-radius: 6upx;
			background: #f3f3f3;
			font-size: $font-base;
			color: $font-color-light;
			text:first-child{
				margin-bottom: 4upx;
			}
		}
	}
	/* 猜你喜欢 */
	.guess-section{
		display:flex;
		flex-wrap:wrap;
		padding: 0 30upx;
		background: #fff;
		.guess-item{
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
			overflow: hidden;
			position: relative;
			image{
				width: 100%;
				height: 100%;
				opacity: 1;
			}
			.sketch {
				background-color: rgba(0, 0, 0, 0.4);
				position: absolute;
				bottom: 4upx;
				padding: 0 8upx;
				right: 0;
				color: #fff;
				font-size: $font-sm;
			}
		}
		.title{
			font-size: $font-base;
			color: $font-color-dark;
			line-height: 40upx;
		}
		.last-line {
			display: flex;
			justify-content: space-between;
 			align-items: center; 		/* 垂直居中 */
			.red {
				color: $base-color;
				font-size: $font-sm + 2upx;
				margin-right: 4upx;
			}
		}
		.price{
			font-size: $font-lg;
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
</style>
