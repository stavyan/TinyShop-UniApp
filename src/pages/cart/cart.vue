<template>
	<view class="cart">
		<view v-if="showHeader" class="status" :style="{position:headerPosition,top:statusTop}"></view>
		<view v-if="showHeader" class="header" :style="{position:headerPosition,top:headerTop}">
			<view class="title">购物车</view>
		</view>
		<!-- 占位 -->
		<view v-if="showHeader" class="place"></view>
		<!-- 购物车为空 -->
		<view v-if="cartList.length === 0" class="empty">
			<image src="/static/emptyCart.jpg" mode="aspectFit"></image>
			<view v-if="token" class="empty-tips">
				空空如也
				<navigator class="navigator" v-if="token" url="../category/category" open-type="switchTab">随便逛逛></navigator>
			</view>
			<view v-else class="empty-tips">
				空空如也
				<view class="navigator" @tap="navToLogin">去登陆></view>
			</view>
		</view>
		<!-- 购物车列表 -->
		<view class="goods-list" v-else>
       <view class="row" v-for="(row,index) in cartList" :key="index" >
				<!-- 删除按钮 -->
				<view class="menu" @tap.stop="deleteCartItem(row.sku_id, 'one')">
					<view class="icon shanchu"></view>
				</view>
				<!-- 商品 -->
				<view class="carrier" :class="[theIndex==index?'open':oldIndex==index?'close':'']" @touchstart="touchStart(index,$event)" @touchmove="touchMove(index,$event)" @touchend="touchEnd(index,$event)">
					<!-- checkbox -->
					<view class="checkbox-box" @tap="selected(index)">
						<view class="checkbox">
							<view :class="[row.selected?'on':'']"></view>
						</view>
					</view>
					<!-- 商品信息 -->
					<view class="goods-info" @tap="navToDetailPage(row.product.id)">
						<view class="img">
							<image :src="row.product_img"></image>
						</view>
						<view class="info">
							<view class="title">{{row.product_name}}</view>
							<view class="spec">{{row.sku_name || '基础版'}}</view>
							<view class="price-number">
								<view class="price">￥{{row.price}}</view>
								<view class="number">
									<view class="sub" @tap.stop="sub(row, index)">
										<view class="icon jian"></view>
									</view>
									<view class="input" @tap.stop="discard">
										<input type="number" v-model="row.number" @input.stop="numberChange(row, $event,index)" />
									</view>
									<view class="add" @tap.stop="add(row, index)">
										<view class="icon jia"></view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
        </view>
		<!-- 脚部菜单 -->
		<view class="footer" :style="{bottom: '150upx'}" v-if="cartList.length !== 0">
			<view class="checkbox-box" @tap="allSelect">
				<view class="checkbox">
					<view :class="[isAllselected?'on':'']"></view>
				</view>
				<view class="text">全选</view>
			</view>
			<view class="delBtn del" @tap="deleteCartItem" v-if="selectedList.length>0">删除</view>
			<view class="delBtn" @tap="clearCart" v-if="selectedList.length>0">清空</view>
			<view class="settlement">
				<view class="sum">合计:<view class="money">￥{{sumPrice}}</view></view>
				<view class="btn" @tap="createOrder">结算({{selectedList.length}})</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {cartItemClear, cartItemDel, cartItemList, cartItemUpdateNum} from "../../api/product";
	export default {
		data() {
			return {
				sumPrice:'0.00',
				headerPosition:"fixed",
				headerTop:null,
				statusTop:null,
				showHeader:true,
				selectedList:[],
				isAllselected:false,
				//控制滑动效果
				theIndex:null,
				oldIndex:null,
				isStop:false,
				cartList: [],
				token: null,
				oldDiscount: 0,
				footerbottom: 0
			}
		},
		onPageScroll(e){
			//兼容iOS端下拉时顶部漂移
			this.headerPosition = e.scrollTop>=0?"fixed":"absolute";
			this.headerTop = e.scrollTop>=0?null:0;
			this.statusTop = e.scrollTop>=0?null:-this.statusHeight+'px';
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
			this.selectedList.length = 0;
			this.isAllselected = false;
			this.sumPrice = 0;
			this.getCartItemList('refresh');
		},
		onShow() {
			//兼容H5下结算条位置
			// #ifdef H5
				this.footerbottom = document.getElementsByTagName('uni-tabbar')[0].offsetHeight+'px';
			// #endif
			// #ifdef APP-PLUS
			this.showHeader = false;
			this.statusHeight = plus.navigator.getStatusbarHeight();
			// #endif
			this.initData();
		},
		methods: {
			// 删除选中购物车商品
			async deleteCartItem(id, type){
				const sku_ids = []
				if (type) {
					sku_ids.push(parseInt(id, 10))
				} else {
					for(let i=0;i<this.cartList.length;i++){
						if(this.cartList[i].selected) {
							sku_ids.push(parseInt(this.cartList[i].sku_id, 10));
						}
					}
				}
				uni.showLoading({title:'正在将商品从购物车移除...'});
				await this.$post(`${cartItemDel}`, {
					sku_ids: JSON.stringify(sku_ids)
				}).then(r=>{
					if (r.code === 200) {
						this.selectedList.length = 0;
						this.isAllselected = false;
						this.sumPrice = 0;
						this.getCartItemList();
						this.oldIndex = null;
						this.theIndex = null;
					} else {
						uni.showToast({ title: r.message, icon: "none" });
					}
				}).catch(err => {
					console.log(err)
				})
			},
			// 数据初始化
			initData() {
				this.token = uni.getStorageSync('accessToken') || undefined
				if (this.token) {
					this.selectedList.length = 0;
					this.isAllselected = false;
					this.sumPrice = 0;
					this.getCartItemList();
				}
			},
			// 跳转至登录页
			navToLogin(){
				uni.navigateTo({
					url: '/pages/public/login'
				})
			},
			// 获取购物车列表
			async getCartItemList (type) {
				uni.showLoading({title:'加载中...'});
				await this.$get(`${cartItemList}`, {}, {}, this).then(r=>{
					if (type === 'refresh') {
						uni.stopPullDownRefresh();
					}
					if (r.code === 200) {
						this.cartList = r.data
						uni.setStorageSync('cartNum', r.data.length)
						uni.setTabBarBadge({
							index: 2,
							text: r.data.length.toString()
						});
					} else {
						uni.showToast({ title: r.message, icon: "none" });
					}
				}).catch(err => {
					console.log(err)
				})
			},
			// 清空购物车
			clearCart(){
				uni.showModal({
					content: '清空购物车？',
					success: async (e) => {
						if (e.confirm) {
							uni.showLoading({title: '正在清空购物车...'});
							await this.$post(`${cartItemClear}`).then(r => {
								if (r.code === 200) {
									this.selectedList.length = 0;
									this.isAllselected = false;
									this.sumPrice = 0;
									this.getCartItemList();
								} else {
									uni.showToast({title: r.message, icon: "none"});
								}
							}).catch(err => {
								console.log(err)
							})
						}
					}
				})
			},
			// 控制左滑删除效果
			touchStart(index,event){
				//多点触控不触发
				if(event.touches.length>1){
					this.isStop = true;
					return ;
				}
				this.oldIndex = this.theIndex;
				this.theIndex = null;
				//初始坐标
				this.initXY = [event.touches[0].pageX,event.touches[0].pageY];
			},
			touchMove(index,event){
				//多点触控不触发
				if(event.touches.length>1){
					this.isStop = true;
					return ;
				}
				let moveX = event.touches[0].pageX - this.initXY[0];
				let moveY = event.touches[0].pageY - this.initXY[1];

				if(this.isStop||Math.abs(moveX)<5){
					return ;
				}
				if (Math.abs(moveY) > Math.abs(moveX)){
					// 竖向滑动-不触发左滑效果
					this.isStop = true;
					return;
				}

				if(moveX<0){
					this.theIndex = index;
					this.isStop = true;
				}else if(moveX>0){
					if(this.theIndex!=null&&this.oldIndex==this.theIndex){
						this.oldIndex = index;
						this.theIndex = null;
						this.isStop = true;
						setTimeout(()=>{
							this.oldIndex = null;
						},150)
					}
				}
			},
			touchEnd(index,$event){
				//结束禁止触发效果
				this.isStop = false;
			},
			// 跳转至详情页
			navToDetailPage(id) {
				uni.navigateTo({
					url: `/pages/product/product?id=${id}`
				})
			},
			// 选中商品
			selected(index){
				this.cartList[index].selected = this.cartList[index].selected?false:true;
				let i = this.selectedList.indexOf(this.cartList[index].id);
				i>-1?this.selectedList.splice(i, 1):this.selectedList.push(this.cartList[index].id);
				this.isAllselected = this.selectedList.length == this.cartList.length;
				this.sum();
			},
			// 全选商品
			allSelect(){
				let len = this.cartList.length;
				let arr = [];
				for(let i=0;i<len;i++){
					this.cartList[i].selected = this.isAllselected? false : true;
					arr.push(this.cartList[i].id);
				}
				this.selectedList = this.isAllselected?[]:arr;
				this.isAllselected = this.isAllselected||this.cartList.length==0?false : true;
				this.sum();
			},
			// 减少数量(执行接口)
			sub(item, index){
				if(this.cartList[index].number<=1){
					return;
				}
				this.cartList[index].number--;
				this.numberChange(item);
			},
			// 增加数量(执行接口)
			add(item, index){
				this.cartList[index].number++;
				this.numberChange(item, undefined, index, 'add');
			},
			// 控制可输入购物车商品数量
			discard() {},
			// 监听购物车商品数量改变
			async numberChange(item, data, index, type) {
				if (data) {
					this.cartList[index].number = data.detail.value;
				}
				uni.showLoading({title: '加载中...'});
				await this.$post(`${cartItemUpdateNum}`, {
					sku_id: item.sku_id,
					num: item.number
				}).then(r => {
					if (r.code === 200) {
						this.sum();
					} else {
						if (type === 'add'){
							this.cartList[index].number--;
						}
						uni.showToast({title: r.message, icon: "none"});
					}
				}).catch(err => {
					if (type === 'add'){
						this.cartList[index].number--;
					}
					console.log(err)
				})
			},
			// 创建订单
			async createOrder() {
				if (this.selectedList.length === 0) return;
				const data = {};
				const ids = [];
				let len = this.cartList.length;
				for(let i=0;i<len;i++){
					if(this.cartList[i].selected) {
						ids.push(parseInt(this.cartList[i].id, 10));
					}
				}
				data.type = 'cart';
				data.data = ids.join(',');
                this.selectedList.length = 0;
                this.isAllselected = false;
                this.sumPrice = 0;
                uni.navigateTo({
                    url: `/pages/order/createOrder?data=${JSON.stringify(data)}`
                });
			},
			// 合计
			sum(){
				this.sumPrice=0;
				let len = this.cartList.length;
				const arr = []
				for(let i=0;i<len;i++){
					if(this.cartList[i].selected) {
						arr.push(this.cartList[i]);
						this.sumPrice = this.arrSort(arr);
					}
				}
				this.sumPrice = this.sumPrice.toFixed(2);
		},
			// 向下舍去小数点后两位
			floor(val) {
				return Math.floor(val * 100) / 100;
			},
			// 计算相同商品不同规格价格
			arrSort (arr) {
				const map = {},
    		dest = [];
				for(let i = 0; i < arr.length; i++){
					const ai = arr[i];
					if(!map[ai.product.id]){
						dest.push({
							id: ai.product.id,
							num: 0,
							price: 0,
							data: [ai]
						});
						map[ai.product.id] = ai;
					}else{
						for(let j = 0; j < dest.length; j++){
							const dj = dest[j];
							if(dj.data[0].product.id === ai.product.id){
									dj.data.push(ai);
									break;
							}
						}
					}
				}
				const discountArr = []
				dest.forEach(item => {
					item.data.forEach(item2 => {
						item.num += parseInt(item2.number, 10)
						item.price += parseInt(item2.number, 10) * item2.price;
					})
					const ladderPreferential = item.data[0].ladderPreferential;
					for (let i = 0; i < ladderPreferential.length; i++) {
						if (item.num >= parseInt(ladderPreferential[i].quantity, 10)) {
							ladderPreferential[i].num = item.num
							ladderPreferential[i].itemPrice = item.data[0].price
							ladderPreferential[i].totalPrice = item.price
							discountArr.push(ladderPreferential[i])
							break;
						}
					}
				});
				let amount = 0;
				let discount = 0;
				discountArr.forEach(item2 => {
					if (parseInt(item2.type, 10) === 1) {
						discount += item2.price * item2.num
					} else {
						discount += (item2.totalPrice - this.floor(item2.itemPrice * item2.price / 100) * item2.num)
					}
				});
				dest.forEach(item => {
					amount += item.price;
				});
				return amount - discount;
			}
		}
	}
</script>
<style lang="scss">
	page{position: relative;background-color: #fff;}
	.checkbox-box{
		display: flex;
		align-items: center;
		.checkbox{
			width: 35upx;
			height: 35upx;
			border-radius: 100%;
			border: solid 2upx $base-color;
			display: flex;
			justify-content: center;
			align-items: center;
			.on{
				width: 25upx;
				height: 25upx;
				border-radius: 100%;
				background-color: $base-color;
			}
		}
		.text{
			font-size: 28upx;
			margin-left: 10upx;
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
		height: var(--status-bar-height);//覆盖样式
		/*  #endif  */
	}
	.header{
		width: 92%;
		padding: 0 4%;
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
		.title{
			font-size: 36upx;
		}

	}
	.place{
		background-color: #ffffff;
		height: 100upx;
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
	}
	.goods-list{
		width: 100%;
		padding: 20upx 0 100upx 0;
		.tis{
			width: 100%;
			height: 60upx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 32upx;
		}
		.row{
			width: calc(92%);
			height: calc(22vw + 40upx);
			margin: 20upx auto;
			border-radius: 15upx;
			box-shadow: 0upx 5upx 20upx rgba(0,0,0,0.1);
			display: flex;
			align-items: center;
			position: relative;
			overflow: hidden;
			z-index: 4;
			border: 0;
			.menu{
				.icon{
					color: #fff;
					// font-size: 25upx;
				}
				position: absolute;
				width: 30%;
				height: 100%;
				right: 0;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: red;
				color: #fff;
				z-index: 2;
			}
			.carrier{
				@keyframes showMenu {
					0% {transform: translateX(0);}100% {transform: translateX(-30%);}
				}
				@keyframes closeMenu {
					0% {transform: translateX(-30%);}100% {transform: translateX(0);}
				}
				&.open{
					animation: showMenu 0.25s linear both;
				}
				&.close{
					animation: closeMenu 0.15s linear both;
				}
				background-color: #fff;
				.checkbox-box{
					padding-left: 20upx;
					flex-shrink: 0;
					height: 22vw;
					margin-right: 20upx;
				}
				position: absolute;
				width: 100%;
				padding: 0 0;
				height: 100%;
				z-index: 3;
				display: flex;
				align-items: center;
				.goods-info{
					width: 100%;
					display: flex;
					padding-right: 20upx;
					.img{
						width: 22vw;
						height: 22vw;
						border-radius: 10upx;
						overflow: hidden;
						flex-shrink: 0;
						margin-right: 10upx;
						image{
							width: 22vw;
							height: 22vw;
						}
					}
					.info{
						width: 100%;
						height: 22vw;
						overflow: hidden;
						display: flex;
						flex-wrap: wrap;
						position: relative;
						.title{
							width: 100%;
							font-size: 28upx;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							// text-align: justify;
							overflow: hidden;
						}
						.spec{
							font-size: 20upx;
							background-color: #f3f3f3;
							color: #a7a7a7;
							height: 30upx;
							display: flex;
							align-items: center;
							padding: 0 10upx;
							border-radius: 15upx;
							margin-bottom: 20vw;
						}
						.price-number{
							position: absolute;
							width: 100%;
							bottom: 0upx;
							display: flex;
							justify-content: space-between;
							align-items: flex-end;
							font-size: 28upx;
							height: 60upx;
							.price{
							}
							.number{
								display: flex;
								justify-content: center;
								align-items: flex-end;
								.input{
									width: 60upx;
									height: 60upx;
									margin: 0 10upx;
									background-color: #f3f3f3;
									input{
										width: 60upx;
										height: 60upx;
										display: flex;
										justify-content: center;
										align-items: center;
										text-align: center;
										font-size: 26upx;
										color: $base-color;
									}
								}
								.sub ,.add{
									width: 45upx;
									height: 45upx;
									background-color: #f3f3f3;
									border-radius: 5upx;
									.icon{
										font-size: 22upx;
										width: 45upx;
										height: 45upx;
										display: flex;
										justify-content: center;
										align-items: center;
									}
								}
							}
						}
					}
				}
			}
		}
	}
	.empty{
			position:fixed;
			left: 0;
			top:0;
			width: 100%;
			height: 100vh;
			padding-bottom:100upx;
			display:flex;
			justify-content: center;
			flex-direction: column;
			align-items:center;
			background: #fff;
			image{
				width: 240upx;
				height: 160upx;
				margin-bottom:30upx;
			}
			.empty-tips{
				display:flex;
				font-size: $font-sm+2upx;
				color: $font-color-disabled;
				.navigator{
					color: $uni-color-primary;
					margin-left: 16upx;
				}
			}
	}
	.footer{
		width: 100%;
		padding: 0 2%;
		background-color: #fbfbfb;
		height: 100upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 28upx;
		position: fixed;
		bottom: 0upx;
		z-index: 5;
		.delBtn{
			border: solid 1upx $base-color;
			color: $base-color;
			padding: 0 24upx;
			height: 42upx;
			border-radius: 24upx;
			font-size: $font-sm;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.settlement{
			width: 52%;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			.sum{
				font-size: $font-base;
				margin-right: 8upx;
				display: flex;
				justify-content: flex-end;
				.money{
					font-weight: 600;
				}
			}
			.btn{
				padding: 0 26upx;
				height: 50upx;
				background-color: $base-color;
				color: #fff;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 30upx;
			}
		}
	}
</style>
