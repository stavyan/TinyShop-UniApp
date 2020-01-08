<template>
	<view id="category">
		<!-- 状态栏 -->
		<view v-if="showHeader" class="status" :style="{ position: headerPosition,top:statusTop,opacity: afterHeaderOpacity}"></view>
		<!-- 顶部搜索栏 -->
		<view v-if="showHeader" class="header" :style="{ position: headerPosition,top:headerTop,opacity: afterHeaderOpacity }">
			<!-- 跳转分类模块 -->
			<view class="addr" @tap.stop="toCategory">
				<view class="icon yticon icon-xiatubiao--copy" ></view>
				主页
			</view>
			<!-- 搜索框 -->
			<view class="input-box">
				<input
				 @tap="toSearch"
				 disabled
				 :value="hotSearchDefault"
					placeholder-style="color:#ccc;"
				/>
				<view class="icon search"></view>
			</view>
		</view>
		<!-- 占位 -->
		<view v-if="showHeader" class="place"></view>
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
			 右侧子导航
			<scroll-view  scroll-y="true" class="right">
		    <view class="category" v-if="n.child.length > 0" v-for="(n,index) in categoryList" :key="n.id" v-show="index==showCategoryIndex" >
					<view class="banner">
						<image src="https://www.yllook.com/attachment/images/2019/12/09/image_157589717555555751.jpg"></image>
					</view>
			    <view class="box" v-for="(o,i) in n.child" :key="i" @tap="navToList(o.id)">
						<view class="text">{{o.title}}</view>
						<view class="list" v-if="o.child.length > 0">
							<view class="box" v-for="(p,i) in o.child" :key="i" @tap="navToList(p.id)">
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
	import {productCate} from "../../api/product";
  export default {
		data() {
			return {
				showHeader:true,
				hotSearchDefault: '输入关键字搜索',
				fList: [],
				sList: [],
				tList: [],
				showCategoryIndex: 0,
				headerTop:null,
				statusTop:null,
				nVueTitle:null,
				afterHeaderOpacity: 1,//不透明度
				headerPosition:"fixed",
				city:"北京",
				//分类列表
				categoryList: []
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
		onLoad() {
	    this.initData();
		},
		methods: {
			navToList(id){
				uni.navigateTo({
					url: `/pages/product/list?cate_id=${id}`
				})
			},
	    initData () {
				this.getProductCate();
	    },
			async getProductCate () {
				this.fList = [];
				this.sList = [];
				this.tList = [];
				uni.showLoading({title:'加载中...'});
				await this.$get(`${productCate}`).then(r=>{
					if (r.code === 200) {
				    this.categoryList = r.data;
            for (let i = 0; i < r.data.length; i++) {
	              if (r.data[i].child.length > 0) {
			            this.showCategoryIndex = i;
			            break;
			        }
            }
						r.data.forEach(item=>{
							if(item.child.length > 0){
								this.fList.push(item);  //pid为父级id, 没有pid或者pid=0是一级分类
								item.child instanceof Array && item.child.forEach(item2=>{
									if(item2.child.length > 0) {
										this.sList.push(item2); //没有图的是2级分类
										item2.child instanceof Array && item2.child.forEach(item3 => {
											this.tList.push(item3); //没有图的是2级分类
										})
									}
								})
							}
						})
					} else {
						uni.showToast({ title: r.message, icon: "none" });
					}
				}).catch(err => {
					console.log(err)
				})
			},
			//分类切换显示
			showCategory(index){
				this.showCategoryIndex = index;
			},
			toCategory(e){
				uni.setStorageSync('catName',e.name);
				uni.navigateTo({
					url: '../../goods/goods-list/goods-list?cid='+e.id+'&name='+e.name
				});
			},
			//搜索跳转
			toSearch(){
				uni.showToast({title: "建议跳转到新页面做搜索功能"});
			}
		}
	}
</script>
<style scoped lang="scss">
page {
		background-color: #fff;
}
#category {
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
				color:#888;
				font-size: 28upx;
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
