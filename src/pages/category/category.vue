<template>
	<view id="category">
		<!--顶部搜索导航栏-->
		<rf-search-bar
			@link="toIndex"
			@search="toSearch"
			:icon="'icon-xiatubiao--copy'"
			:title="'主页'"
			:headerShow="headerShow"
			:placeholder="hotSearchDefault" />
		<view class="category-list">
			<!-- 左侧分类导航 -->
			<scroll-view  scroll-y="true" class="left" >
        <view class="row" v-if="m.child.length > 0" v-for="(m, index) in categoryList" :key="m.id" :class="[index==showCategoryIndex?'on':'']" @tap="showCategory(index)">
					<view class="text">
						<view class="block"></view>
						{{m.title}}
					</view>
				</view>
      </scroll-view>
			<!--右侧子导航-->
			<scroll-view  scroll-y="true" class="right">
		    <view class="category" v-if="n.child.length > 0" v-for="(n,index) in categoryList" :key="n.id" v-show="index==showCategoryIndex" >
					<view class="banner" @tap="indexTopToDetailPage(cateTop.jump_type, cateTop.jump_link)">
						<image :src="cateTop.cover" mode="aspectFill" />
					</view>
			    <view class="box" v-for="(o,i) in n.child" :key="i" @tap="navToList(o.id)">
						<view class="text">{{o.title}}</view>
						<view class="list" v-if="o.child.length > 0">
							<view class="box" v-for="(p,i) in o.child" :key="i" @tap.stop="navToList(p.id)">
								<image :src="p.cover"></image>
								<view class="text">{{p.title}}</view>
							</view>
						</view>
				    <view v-else class="no-data">
					    该栏目暂无分类~
				    </view>
					</view>
		    </view>
			</scroll-view>
		</view>
	</view>
</template>
<script>
	import {productCate} from "@/api/product";
	import rfSearchBar from '@/components/rf-search-bar/rf-search-bar';
  import {advList} from "../../api/basic";
  export default {
		components: {
			rfSearchBar
		},
		data() {
			return {
				headerShow:true,
				hotSearchDefault: '输入关键字搜索',
				fList: [],
				sList: [],
				tList: [],
				showCategoryIndex: 0,
				//分类列表
				categoryList: [],
				search: '',
				cateTop: null
			}
		},
		onLoad() {
	    this.initData();
		},
		methods: {
	    // 跳转至商品列表
			navToList(id){
				uni.navigateTo({
					url: `/pages/product/list?cate_id=${id}`
				})
			},
			// 数据初始化
	    initData () {
				this.search = uni.getStorageSync('search')
				this.hotSearchDefault = `请输入关键字 如: ${this.search.hot_search_default}`;
				this.getProductCate();
	    },
			// 获取商品分类列表
			async getProductCate () {
				this.fList = [];
				this.sList = [];
				this.tList = [];
				uni.showLoading({title:'加载中...'});
				await this.$get(`${productCate}`).then(r=>{
			    this.cateTop = uni.getStorageSync('cateTop');
			    if (!this.cateTop) {
		        this.getAdvList();
			    }
			    this.categoryList = r.data;
			    // 查询第一个拥有二级菜单的子菜单
          for (let i = 0; i < r.data.length; i++) {
              if (r.data[i].child.length > 0) {
		            this.showCategoryIndex = i;
		            break;
		        }
          }
				});
			},
			// 获取广告列表
			async getAdvList() {
				uni.showLoading({title:'加载中...'});
        await this.$get(`${advList}`, {
            location: 'cate_top'
        }).then(r => {
          this.cateTop = r.data.cate_top[0];
          uni.setStorageSync('cateTop', r.data.cate_top[0]);
        });
      },
			//分类切换显示
			showCategory(index){
				this.showCategoryIndex = index;
			},
			// 跳转至搜索详情页
			toSearch () {
				uni.navigateTo({
					url: `/pages/search/search?search=${JSON.stringify(this.search)}`
				})
			},
			// 跳转至分类页
			toIndex () {
				uni.reLaunch({
					url: `/pages/index/index`
				})
			},
			// 跳至广告图指定页面
			indexTopToDetailPage(type, url){
				switch (type) {
					case 'product_view':
						url = `/pages/product/product?id=${url}`;
						break;
					case 'article_view':
						this.$api.msg('article_view');
						break;
					case 'coupon_view':
						url = `/pages/coupon/detail?id=${url}`;
						break;
					case 'helper_view':
						this.$api.msg('helper_view');
						break;
					case 'product_list_for_cate':
						url = `/pages/product/list?cate_id=${url}`;
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
		}
	}
</script>
<style scoped lang="scss">
	page {
		background-color: #fff;
	}
	#category {
		.category-list{
			width: 100%;
			background-color: #fff;
			display: flex;
			.left,.right{
				position: absolute;
				top: 100upx;
				/*  #ifdef  APP-PLUS  */
				top: calc(100upx + var(--status-bar-height));
				/*  #endif  */
				bottom: 0upx;
			}
			.left{
				width: 24%;
				left: 0upx;
				background-color: #f2f2f2;
				.row{
					width: 100%;
					height: 90upx;
					display: flex;
					align-items: center;
					.text{
						width: 100%;
						position: relative;
						font-size: 28upx;
						display: flex;
						justify-content: center;
						color: #3c3c3c;
						.block{
							position: absolute;
							width: 0upx;
							left: 0;
						}
					}
					&.on{
						height: 100upx;
						background-color: #fff;
						.text{
							font-size: 30upx;
							font-weight: 600;
							color: #2d2d2d;
							.block{
								width: 10upx;
								height: 80%;
								top: 10%;
								background-color: #f06c7a;
							}
						}
					}
				}
			}
			.right{
			   width: 76%;
					left: 24%;
				.category{
					width: calc(100%);
					padding: 20upx 15upx;
					.banner{
						width: 96%;
						margin: 0 auto 20upx;
						height: 24.262vw;
						border-radius: 10upx;
						overflow: hidden;
						box-shadow: 0upx 5upx 20upx rgba(0,0,0,0.3);
						image{
							width: 100%;
							height: 24.262vw;
						}
					}
					.list{
						margin-top: 40upx;
						width: 100%;
						display: flex;
						flex-wrap: wrap;
						.box{
							width: calc(71.44vw / 3);
							margin-bottom: 30upx;
							display: flex;
							justify-content: center;
							align-items: center;
							flex-wrap: wrap;
							image{
								width: 64%;
								height: calc(71.44vw / 3 * 0.64);
							}
							.text{
								margin-top: 8upx;
								width: 100%;
								display: flex;
								justify-content: center;
								font-size: 26upx;
							}
						}
					}
					.no-data {
						text-align: center;
						margin: 30upx 0;
						color: $font-color-light;
					}
				}
			}
		}
	}
</style>
