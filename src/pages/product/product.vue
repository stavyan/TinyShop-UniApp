<template>
	<view class="container">
		<view class="carousel">
			<swiper indicator-dots circular=true duration="400">
				<swiper-item class="swiper-item" v-for="(item,index) in productDetail.covers" :key="index">
					<view class="image-wrapper">
						<image
							:src="item"
							class="loaded"
							mode="aspectFill"
						></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="introduce-section">
			<text class="title">{{ productDetail.name }}</text>
			<view class="price-box">
				<text class="price-tip">¥</text>
				<text class="price">{{ productDetail.minSkuPrice }}</text>
				<text class="m-price" v-show="productDetail.price < productDetail.minSkuPrice">{{ productDetail.price }}</text>
				<!--<text class="coupon-tip">7折</text>-->
			</view>
			<view class="bot-row">
				<text>销量: {{ productDetail.sales }}</text>
				<text>收藏量: {{ productDetail.collect_num }}</text>
				<text>浏览量: {{ productDetail.view }}</text>
			</view>
			<view class="bot-row">
				<text>评分: {{ productDetail.match_point || 0 }}</text>
				<text>评论量: {{ productDetail.comment_num }}</text>
				<text>分享量: {{ productDetail.transmit_num }}</text>
			</view>
		</view>
		<!--  分享 -->
		<view class="share-section">
			<view class="share-icon">
				<text class="yticon icon-xingxing"></text>
				 返
			</view>
			<text open-type="contact" class="tit">分享该商品给你的朋友们</text>
			<text class="yticon icon-bangzhu1"></text>
			<button class="share-btn" open-type="share">
				立即分享
				<text class="yticon icon-you"></text>
			</button>
		</view>

		<!--购买类型-->
		<view class="c-list">
			<view class="c-row b-b" @click="toggleSpec">
				<text class="tit">购买类型</text>
				<view class="con">
					<text class="selected-text" v-for="(sItem, sIndex) in specSelected" :key="sIndex">
						{{sItem.title}}
					</text>
          <text v-show="specSelected.length > 0"> * {{ cartCount }}</text>
          <text class="selected-text" v-show="productDetail.base_attribute_format && productDetail.base_attribute_format.length === 0">
            <!--{{ productDetail.name }} * 1-->
            基本款 * {{ cartCount }}
          </text>
				</view>
				<text class="yticon icon-you"></text>
			</view>
			<view class="c-row b-b">
				<text class="tit">优惠券</text>
				<text class="con t-r red" @click="toggleMask('show')">领取优惠券</text>
				<text class="yticon icon-you"></text>
			</view>
			<view class="c-row b-b">
				<text class="tit">限购说明</text>
				<view class="con-list">
					<text v-show="productDetail.point_exchange_type">{{ productDetail.max_buy | maxBuyFilter }}</text>
				</view>
			</view>
			<view class="c-row b-b">
				<text class="tit">积分活动</text>
				<view class="con-list">
					<text v-show="productDetail.point_exchange_type">积分兑换类型: {{ productDetail.point_exchange_type | pointExchangeTypeFilter }} </text>
					<text>积分赠送类型: {{ productDetail.integral_give_type | integralGiveTypeFilter }} </text>
					<text>最少可获得: {{ productDetail | givePointFilter }} </text>
					<text v-show="productDetail.point_exchange != 0">兑换所需积分: {{ productDetail.point_exchange }} </text>
					<text v-show="productDetail.max_use_point != 0">最大可使用积分: {{ productDetail.max_use_point }} </text>
				</view>
			</view>
			<view class="c-row b-b">
				<text class="tit">服务</text>
				<view class="bz-list con" v-if="productDetail.tags && productDetail.tags.length > 0">
					<text v-for="item in productDetail.tags">{{ item }} </text>
				</view>
				<view class="bz-list con" v-else>
					暂无服务
				</view>
			</view>
			<view class="c-row b-b">
				<text class="tit">阶梯优惠</text>
				<view class="con-list" v-if="productDetail.ladderPreferential && productDetail.ladderPreferential.length > 0">
					<text v-for="item in productDetail.ladderPreferential">
						满{{ item.quantity }}件 <text v-if="parseInt(item.type, 10) === 1">每件减{{ item.price }}元</text>
																		<text v-if="parseInt(item.type, 10) === 2">总价{{ parseInt(item.price, 10) }}折</text>
					</text>
				</view>
				<view class="bz-list con" v-else>
					暂无服务
				</view>
			</view>
		</view>

		<!-- 评价 -->
		<view class="eva-section" @click="toEvaluateList">
			<view class="e-header">
				<text class="tit">评价</text>
				<text>({{ productDetail.comment_num }})</text>
				<text class="tip" v-if="productDetail.match_ratio">好评率 {{ productDetail.match_ratio }}%</text>
				<text class="tip" v-else>暂无评价信息</text>
				<text class="yticon icon-you"></text>
			</view>
			<!--again_addtime: "0"-->
			<!--again_content: ""-->
			<!--again_covers: []-->
			<!--again_explain: ""-->
			<!--content: "我的觉得ok！"-->
			<!--covers: ["blob:http://192.168.20.45:9527/b4abfa1c-7387-436c-883d-5d0fabb650ff",…]-->
			<!--created_at: "1574912184"-->
			<!--explain_first: ""-->
			<!--explain_type: "2"-->
			<!--is_anonymous: "0"-->
			<!--member_head_portrait: null-->
			<!--member_id: "2"-->
			<!--member_nickname: "stavyan"-->
			<!--product_id: "43"-->
			<!--scores: "3"-->
			<view class="eva-box" v-show="productDetail.evaluate && productDetail.evaluate.length > 0">
				<image class="portrait"
               :src="productDetail.evaluate && productDetail.evaluate[0] && productDetail.evaluate[0].member_head_portrait || '/static/missing-face.png'" mode="aspectFill"></image>
				<view class="right">
					<text class="name">{{ productDetail.evaluate && productDetail.evaluate[0] && productDetail.evaluate[0].member_nickname }}</text>
					<text class="con in2line">{{ productDetail.evaluate && productDetail.evaluate[0] && productDetail.evaluate[0].content || '这个人很懒，什么都没留下~' }}</text>
					<view class="bot">
						<text class="attr">购买类型：{{ productDetail.evaluate && productDetail.evaluate[0] && productDetail.evaluate[0].sku_name }}</text>
						<text class="time">{{ productDetail.evaluate && productDetail.evaluate[0] && productDetail.evaluate[0].created_at | time }}</text>
					</view>
				</view>
			</view>
		</view>

		<!--<view class="detail-desc">-->
			<!--<view class="d-header">-->
				<!--<text>图文详情</text>-->
			<!--</view>-->
			<!--<rich-text :nodes="desc"></rich-text>-->
		<!--</view>-->

		<!-- 底部操作菜单 -->
		<view class="page-bottom">
			<navigator url="/pages/index/index" open-type="switchTab" class="p-b-btn">
				<text class="yticon icon-xiatubiao--copy"></text>
				<text>首页</text>
			</navigator>
			<navigator url="/pages/cart/cart" open-type="switchTab" class="p-b-btn">
				<text class="yticon icon-gouwuche"></text>
				<text>购物车</text>
			</navigator>
			<view class="p-b-btn" :class="{active: favorite}" @click="toFavorite">
				<text class="yticon icon-shoucang"></text>
				<text>收藏</text>
			</view>

			<view class="action-btn-group">
				<button type="primary" class=" action-btn no-border buy-now-btn" @click="addCart('buy')">立即购买</button>
				<button type="primary"
								:disabled="productDetail.point_exchange_type == 2 || productDetail.point_exchange_type == 4"
								class=" action-btn no-border add-cart-btn"
								@click="addCart('cart')">加入购物车</button>
			</view>
		</view>

		<!-- 规格-模态层弹窗 -->
		<view
			class="popup spec"
			:class="specClass"
			@touchmove.stop.prevent="stopPrevent"
			@click="toggleSpec"
		>
			<!-- 遮罩层 -->
			<view class="mask" @click="hideSpec"></view>
			<view class="layer attr-content" @click.stop="stopPrevent">
				<view class="a-t">
					<image :src="showTypeImage || productDetail.picture"></image>
					<view class="right">
						<text class="title">{{ productDetail.name }}</text>
						<text class="price">¥{{ productDetail.minSkuPrice }}</text>
						<text class="stock">库存：{{ currentStock || productDetail.stock }}件</text>
						<view class="selected" v-if="specSelected.length > 0">
							已选：
							<text class="selected-text" v-for="(sItem, sIndex) in specSelected" :key="sIndex">
								{{sItem.title}}
							</text>
              <text v-show="specSelected.length > 0">
                 * {{ cartCount }}
              </text>
						</view>
					</view>
				</view>
				<view v-for="(item,index) in specList" :key="index" class="attr-list">
					<text>{{item.title}}</text>
					<view class="item-list">
						<view class="tit"
							v-for="(childItem, childIndex) in specChildList"
							v-if="childItem.base_spec_id === item.base_spec_id"
							:key="childIndex"
							:class="{selected: childItem.selected}"
							:style="childItem.selected && parseInt(item.show_type) === 2 ? styleObject: ''"
							@click="selectSpec(childIndex, childItem.base_spec_id, item.show_type)"
						>
							<text v-show="parseInt(item.show_type) === 1">
								{{childItem.title }}
							</text>
							<text v-show="parseInt(item.show_type) === 2">
								{{childItem.title }}
							</text>
							<view v-show="parseInt(item.show_type) === 3">
								<image
									class="img"
									:src="childItem.data || productDetail.picture"
									mode="aspectFill"
								></image>
								{{childItem.title }}
							</view>
						</view>
					</view>
				</view>
				<view class="select-count">
					<text>购买数量</text>
					<uni-number-box
						class="step"
						:min="1"
						:value="cartCount"
						@eventChange="numberChange"
					></uni-number-box>
				</view>
				<button class="btn" @click="toggleSpec">完成</button>
			</view>
		</view>
		<!-- 分享 -->
		<share
			ref="share"
			:contentHeight="580"
			:shareList="shareList"
		></share>
		<!-- 优惠券面板 -->
		<view class="mask" :class="maskState===0 ? 'none' : maskState===1 ? 'show' : ''" @click="toggleMask">
			<view class="mask-content" @click.stop.prevent="stopPrevent">
				<!-- 优惠券页面，仿mt -->
				<view class="coupon-item" v-for="(item,index) in productDetail.canReceiveCoupon" :key="index" @click="getCoupon(item)">
					<view class="con">
						<view class="left">
							<text class="title">{{item.title}}</text>
							<text class="time" v-if="parseInt(item.term_of_validity_type, 10) === 0">{{ item.start_time | time }} ~ {{ item.end_time | time }}</text>
							<text class="time" v-else>自领取之日 {{ item.fixed_term }}天内有效</text>
						</view>
						<view class="right">
							<text class="price" v-if="item.money">{{item.money }}</text>
							<text class="price-discount" v-else>{{ `${item.discount}折` }}</text>
							<text>满{{ item.at_least }}可用</text>
						</view>
						<view class="circle l"></view>
						<view class="circle r"></view>
					</view>
					<view class="tips">
							<text v-show="item.range_type">
								{{ parseInt(item.range_type, 10) === 2 ? '部分产品使用' : '全场产品使用' }}
							</text>
							<text v-show="type">
								<text style="margin-right: 15upx;" v-show="parseInt(item.range_type || item.couponType.range_type, 10) === 0">可使用商品</text>
								<text class="btn" v-show="parseInt(item.range_type || item.couponType.range_type, 10) === 2" @click="show(item)">查看商品</text>
								<text class="btn" @click="navTo('/pages/category/category', 'tab')">去使用</text>
							</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import share from '@/components/share';
	import {cartItemCreate, orderPreview, productDetail} from "../../api/product";
	import uniNumberBox from '@/components/uni-number-box.vue';
  import {collectCreate, collectDel, transmitCreate} from "../../api/basic";
  import moment from 'moment';
	import errorImg from './../../static/errorImage.jpg';
	import {couponReceive} from "../../api/userInfo";
	export default{
		components: {
			share,
			uniNumberBox
		},
		filters: {
			time(val) {
				return moment(val * 1000).format('YYYY-MM-DD HH:mm')
			},
			maxBuyFilter(val) {
				return parseInt(val, 10) === 0 ? '不限购' : `限购：${val}`;
			},
			pointExchangeTypeFilter(val) {
				const type = ['', '非积分兑换', '积分加现金', '积分兑换或直接购买', '只支持积分兑换'];
				return type[parseInt(val, 10)];
			},
			integralGiveTypeFilter(val) {
				const type = ['固定积分', '百分比'];
				return type[parseInt(val, 10)];
			},
			givePointFilter(val) {
				return parseInt(val.integral_give_type, 10) === 1 ?
						`${Math.round(parseInt(val.give_point, 10) / 100 * parseInt(val.minSkuPrice, 10))} 积分` :
						parseInt(val.integral_give_type, 10);
			}
		},
		data() {
			return {
				errorImg: errorImg,
				cartType: null,
				maskState: 0, //优惠券面板显示状态
				couponList: [],
				productDetail: {},
				styleObject: {},
				showTypeImage: null,
				specClass: 'none',
				specSelected:[],
				favorite: false,
				shareList: [],
				currentStock: null,
				imgList: [
					{
						src: 'https://gd3.alicdn.com/imgextra/i3/0/O1CN01IiyFQI1UGShoFKt1O_!!0-item_pic.jpg_400x400.jpg'
					},
					{
						src: 'https://gd3.alicdn.com/imgextra/i3/TB1RPFPPFXXXXcNXpXXXXXXXXXX_!!0-item_pic.jpg_400x400.jpg'
					},
					{
						src: 'https://gd2.alicdn.com/imgextra/i2/38832490/O1CN01IYq7gu1UGShvbEFnd_!!38832490.jpg_400x400.jpg'
					}
				],
				desc: `
					<div style="width:100%">
						<img style="width:100%;display:block;" src="https://gd3.alicdn.com/imgextra/i4/479184430/O1CN01nCpuLc1iaz4bcSN17_!!479184430.jpg_400x400.jpg" />
						<img style="width:100%;display:block;" src="https://gd2.alicdn.com/imgextra/i2/479184430/O1CN01gwbN931iaz4TzqzmG_!!479184430.jpg_400x400.jpg" />
						<img style="width:100%;display:block;" src="https://gd3.alicdn.com/imgextra/i3/479184430/O1CN018wVjQh1iaz4aupv1A_!!479184430.jpg_400x400.jpg" />
						<img style="width:100%;display:block;" src="https://gd4.alicdn.com/imgextra/i4/479184430/O1CN01tWg4Us1iaz4auqelt_!!479184430.jpg_400x400.jpg" />
						<img style="width:100%;display:block;" src="https://gd1.alicdn.com/imgextra/i1/479184430/O1CN01Tnm1rU1iaz4aVKcwP_!!479184430.jpg_400x400.jpg" />
					</div>
				`,
				specList: [],
				specChildList: [],
				cartCount: 1,
				product_id: null
			};
		},
		async onLoad(options){
			this.initData(options.id);
			//接收传值,id里面放的是标题，因为测试数据并没写id
			// let id = options.id;
			//规格 默认选中第一条
			this.specList.forEach(item=>{
				for(let cItem of this.specChildList){
					if(cItem.pid === item.id){
						this.$set(cItem, 'selected', true);
						this.specSelected.push(cItem);
						break; //forEach不能使用break
					}
				}
			})
			this.product_id = options.id;
			this.shareList = await this.$api.json('shareList');
		},
		onShareAppMessage(res) {
      this.$post(`${transmitCreate}`, {
        topic_type: 'product',
        topic_id: this.productDetail.id,
      }).then(r=>{
        if (r.code === 200) {
          return {
            title: this.productDetail.name,
            path: `/pages/product/product?id=${this.productDetail.id}`
          }
        } else {
          uni.showToast({ title: r.message, icon: "none" });
        }
      }).catch(err => {
        console.log(err)
      })
		},
		methods:{
			/**
			 *@des 获取优惠券
			 *@author stav stavyan@qq.com
			 *@blog https://stavtop.club
			 *@date 2019/12/12 15:17:34
			 *@param arguments
			 */
			async getCoupon(item) {
				if (this.type) return;
				if (parseInt(item.is_get, 10) === 0) {
						uni.showToast({title: '该优惠券不可领取', icon: "none"});
						return;
				}
				uni.showLoading({title: '领取中...'});
				await this.$post(`${couponReceive}`, {
					id: item.id
				}).then(r => {
					if (r.code === 200) {
						this.maskState = 0
						uni.showToast({title: '领取成功', icon: "none"});
					} else {
						uni.showToast({title: r.message, icon: "none"});
					}
				}).catch(err => {
					console.log(err)
				})
			},
			/**
			 *@des 跳转至评论列表
			 *@author stav stavyan@qq.com
			 *@blog https://stavtop.club
			 *@date 2019/11/28 15:32:26
			 *@param arguments
			 */
			toEvaluateList () {
				uni.navigateTo({
					url: `/pages/evaluation/list?product_id=${this.productDetail.id}`
				})
			},
			numberChange(data){
				this.cartCount = data.number;
			},
			//显示优惠券面板
			toggleMask(type){
				let timer = type === 'show' ? 10 : 300;
				let	state = type === 'show' ? 1 : 0;
				this.maskState = 2;
				setTimeout(()=>{
					this.maskState = state;
				}, timer)
			},
			/**
			 *@des 初始化数据
			 *@author stav stavyan@qq.com
			 *@blog https://stavtop.club
			 *@date 2019/11/18 15:48:21
			 */
			async initData(id) {
				await this.getProductDetail(id);
			},
			/**
			 *@des 获取产品详情
			 *@author stav stavyan@qq.com
			 *@blog https://stavtop.club
			 *@date 2019/11/18 15:48:34
			 */
			async getProductDetail (id) {
				uni.showLoading({title:'加载中...'});
				await this.$get(`${productDetail}`, {
					id,
				}).then(r=>{
					if (r.code === 200) {
						this.productDetail = r.data;
						this.favorite = this.productDetail.myCollect ? true : false;
						this.specList = this.productDetail.base_attribute_format
						this.specList.forEach(item => {
							this.specChildList = [ ...this.specChildList, ...item.value ]
						});
            /**
             * 修复选择规格存储错误
             * 将这几行代码替换即可
             * 选择的规格存放在specSelected中
             */
            this.specSelected = [];
            r.data.base_attribute_format.forEach(item=>{
							item.value[0].selected = true
              this.specSelected.push(item.value[0]);
            })
						let skuStr = []
						this.specSelected.forEach(item => {
							skuStr.push(item.base_spec_value_id)
						})
						this.productDetail.sku.forEach(item => {
								if (item.data === skuStr.join('-')) {
									this.currentStock = item.stock;
									return;
								}
							})
					} else {
						uni.showToast({ title: r.message, icon: "none" });
					}
				}).catch(err => {
					console.log(err)
				})
			},
			//规格弹窗开关
			toggleSpec() {
				if(this.specClass === 'show'){
          if (this.specSelected.length < this.productDetail.base_attribute_format.length){
            uni.showToast({ title: "请先选择规格", icon: "none" });
            return;
          }
					if (this.cartType === 'cart') {
						this.cartType = null;
						this.handleCartItemCreate();
					} else if (this.cartType === 'buy') {
						this.cartType = null;
						this.buy();
					}
					this.specClass = 'hide';
					setTimeout(() => {
						this.specClass = 'none';
					}, 250);
				} else if(this.specClass === 'none'){
					this.specClass = 'show';
				}
			},
			hideSpec() {
				this.specClass = 'hide';
				setTimeout(() => {
					this.specClass = 'none';
				}, 250);
			},
			/**
			 *@des 添加商品至购物车
			 *@author stav stavyan@qq.com
			 *@blog https://stavtop.club
			 *@date 2019/11/18 17:45:54
			 */
			async handleCartItemCreate () {
				// const type = parseInt(this.productDetail.point_exchange_type , 10)
				// if ( type === 2 || type === 4) {
				// 	uni.showToast({ title: "该商品不支持添加至购物车，请直接下单购买", icon: "none" });
				// 	return;
				// }
				let sku_id;
				let skuStr = null;
				if (this.productDetail.sku.length === 1) {
					sku_id = this.productDetail.sku[0].id
				} else {
					if (this.productDetail.base_attribute_format.length === 1) {
						if (this.specSelected.length < 1) {
							uni.showToast({ title: "请先选择规格", icon: "none" });
							return;
						} else {
							skuStr = `${this.specSelected[0].base_spec_value_id}`
						}
					} else if (this.productDetail.base_attribute_format.length === 2) {
						if (this.specSelected.length < 2) {
							uni.showToast({ title: "请先选择规格", icon: "none" });
							return;
						} else {
							skuStr = `${this.specSelected[0].base_spec_value_id}-${this.specSelected[2].base_spec_value_id}`
						}
					} else if (this.productDetail.base_attribute_format.length === 3) {
						if (this.specSelected.length < 3) {
							uni.showToast({ title: "请先选择规格", icon: "none" });
							return;
						} else {
							skuStr = `${this.specSelected[0].base_spec_value_id}-${this.specSelected[1].base_spec_value_id}-${this.specSelected[2].base_spec_value_id}`
						}
					}
					this.productDetail && this.productDetail.sku.forEach(item => {
						if (item.data === skuStr) {
							sku_id = item.id;
							return;
						}
					})
				}
				uni.showLoading({title:'正在将商品添加至购物车...'});
				await this.$post(`${cartItemCreate}`, {
					sku_id,
					num: this.cartCount
				}).then(r=>{
					if (r.code === 200) {
						// uni.switchTab({
						// 	url: '/pages/cart/cart'
						// })
						uni.showToast({ title: '添加成功，在购物车等亲', icon: "none" });
					} else {
						uni.showToast({ title: r.message, icon: "none" });
					}
				}).catch(err => {
					console.log(err)
				})
			},
			//选择规格
			selectSpec(index, pid, type){
				let list = this.specChildList;
				list.forEach(item=>{
					if(item.base_spec_id === pid){
						this.$set(item, 'selected', false);
					}
				})
				if (parseInt(type, 10) === 3) {
					this.showTypeImage = list[index].data;
				}
				if (parseInt(type, 10) === 2) {
					this.styleObject = {
						color: list[index].data,
						// border: `1px solid ${list[index].data}`,
					};
				}
				this.$set(list[index], 'selected', true);
				//存储已选择
				/**
				 * 修复选择规格存储错误
				 * 将这几行代码替换即可
				 * 选择的规格存放在specSelected中
				 */
				this.specSelected = [];
				list.forEach(item=>{
					if(item.selected === true){
						this.specSelected.push(item);
					}
				})
				let skuStr = []
				this.specSelected.forEach(item => {
					skuStr.push(item.base_spec_value_id)
				})
				this.productDetail.sku.forEach(item => {
						if (item.data === skuStr.join('-')) {
							this.currentStock = item.stock;
							return;
						}
					})
			},
			//分享
			share(res){
				// this.$refs.share.toggleMask();
					if (res.from === 'button') {// 来自页面内分享按钮
						console.log(res.target)
					}
					return {
						title: '自定义分享标题',
						path: '/pages/test/test?id=123'
					}
			},
			/**
			 *@des 收藏
			 *@author stav stavyan@qq.com
			 *@blog https://stavtop.club
			 *@date 2019/11/21 17:00:45
			 */
			async toFavorite() {
				if (this.favorite) {
					this.handleCollectDel()
				} else {
					this.handleCollectCreate()
				}

			},
			/**
			 *@des 收藏商品
			 *@author stav stavyan@qq.com
			 *@blog https://stavtop.club
			 *@date 2019/11/21 17:09:02
			 */
			async handleCollectCreate() {
				uni.showLoading({title: '正在收藏...'});
				await this.$post(`${collectCreate}`, {
					topic_id: this.product_id,
					topic_type: 'product'
				}).then(r => {
					if (r.code === 200) {
						this.favorite = !this.favorite;
						uni.showToast({title: '收藏成功', icon: "none"});
					} else {
						uni.showToast({title: r.message, icon: "none"});
					}
				}).catch(err => {
					console.log(err)
				})
			},
			/**
			 *@des 取消收藏商品
			 *@author stav stavyan@qq.com
			 *@blog https://stavtop.club
			 *@date 2019/11/21 17:09:32
			 */
			async handleCollectDel() {
				uni.showLoading({title: '加载中'});
				await this.$del(`${collectDel}?id=${this.productDetail.myCollect.id}`).then(r => {
					if (r.code === 200) {
						this.favorite = !this.favorite;
						uni.showToast({title: '取消收藏成功', icon: "none"});
					} else {
						uni.showToast({title: r.message, icon: "none"});
					}
				}).catch(err => {
					console.log(err)
				})
			},
			async buy() {
				let sku_id;
				let skuStr;
				let sku_str;
				if (this.productDetail.sku.length === 1) {
					sku_id = this.productDetail.sku[0].id;
				} else {
					if (this.productDetail.base_attribute_format.length === 1) {
						if (this.specSelected.length < 1) {
							uni.showToast({title: "请先选择规格", icon: "none"});
							return;
						} else {
							skuStr = `${this.specSelected[0].base_spec_value_id}`;
							sku_str = `${this.specSelected[0].title}`;
						}
					} else if (this.productDetail.base_attribute_format.length === 2) {
						if (this.specSelected.length < 2) {
							uni.showToast({title: "请先选择规格", icon: "none"});
							return;
						} else {
							skuStr = `${this.specSelected[0].base_spec_value_id}-${this.specSelected[2].base_spec_value_id}`
							sku_str = `${this.specSelected[0].title} ${this.specSelected[2].title}`
						}
					} else if (this.productDetail.base_attribute_format.length === 3) {
						if (this.specSelected.length < 3) {
							uni.showToast({title: "请先选择规格", icon: "none"});
							return;
						} else {
							skuStr = `${this.specSelected[0].base_spec_value_id}-${this.specSelected[1].base_spec_value_id}-${this.specSelected[2].base_spec_value_id}`
							sku_str = `${this.specSelected[0].title} ${this.specSelected[1].title} ${this.specSelected[2].title}`
						}
					}
					this.productDetail && this.productDetail.sku.forEach(item => {
						if (item.data === skuStr) {
							sku_id = item.id;
							return;
						}
					})
				}
				const list = {};
				const data = {};
				data.sku_id = sku_id;
				data.num = this.cartCount;
				list.type = 'buy_now';
				list.data = JSON.stringify(data);
				uni.navigateTo({
					url: `/pages/order/createOrder?data=${JSON.stringify(list)}`
				});
			},
			addCart(type){
				this.specClass = 'show';
				this.cartType = type
			},
			stopPrevent(){
			}
		},

	}
</script>

<style lang='scss'>
	page{
		background: $page-color-base;
		padding-bottom: 160upx;
	}
	.icon-you{
		font-size: $font-base + 2upx;
		color: #888;
	}
	.carousel {
		height: 722upx;
		position:relative;
		swiper{
			height: 100%;
		}
		.image-wrapper{
			width: 100%;
			height: 100%;
		}
		.swiper-item {
			display: flex;
			justify-content: center;
			align-content: center;
			height: 750upx;
			overflow: hidden;
			image {
				width: 100%;
				height: 100%;
			}
		}

	}

	/* 标题简介 */
	.introduce-section{
		background: #fff;
		padding: 20upx 30upx;

		.title{
			font-size: 32upx;
			color: $font-color-dark;
			height: 50upx;
			line-height: 50upx;
		}
		.price-box{
			display:flex;
			align-items:baseline;
			height: 64upx;
			padding: 10upx 0;
			font-size: 26upx;
			color:$uni-color-primary;
		}
		.price{
			font-size: $font-lg + 2upx;
		}
		.m-price{
			margin:0 12upx;
			color: $font-color-light;
			text-decoration: line-through;
		}
		.coupon-tip{
			align-items: center;
			padding: 4upx 10upx;
			background: $uni-color-primary;
			font-size: $font-sm;
			color: #fff;
			border-radius: 6upx;
			line-height: 1;
			transform: translateY(-4upx);
		}
		.bot-row{
			display:flex;
			align-items:center;
			height: 50upx;
			font-size: $font-sm;
			color: $font-color-light;
			text{
				flex: 1;
			}
		}
	}
	/* 分享 */
	.share-section{
		display:flex;
		align-items:center;
		color: $font-color-base;
		background: linear-gradient(left, #fdf5f6, #fbebf6);
		padding: 12upx 30upx;
		.share-icon{
			display:flex;
			align-items:center;
			width: 70upx;
			height: 30upx;
			line-height: 1;
			border: 1px solid $uni-color-primary;
			border-radius: 4upx;
			position:relative;
			overflow: hidden;
			font-size: 22upx;
			color: $uni-color-primary;
			&:after{
				content: '';
				width: 50upx;
				height: 50upx;
				border-radius: 50%;
				left: -20upx;
				top: -12upx;
				position:absolute;
				background: $uni-color-primary;
			}
		}
		.icon-xingxing{
			position:relative;
			z-index: 1;
			font-size: 24upx;
			margin-left: 2upx;
			margin-right: 10upx;
			color: #fff;
			line-height: 1;
		}
		.tit{
			font-size: $font-base;
			margin-left:10upx;
		}
		.icon-bangzhu1{
			padding: 10upx;
			font-size: 30upx;
			line-height: 1;
		}
		.share-btn{
			flex: 1;
			text-align:right;
			font-size: $font-sm;
			color: $uni-color-primary;
			background: none;
		}
    .share-btn:after {
      border: none;
    }
		.icon-you{
			font-size: $font-sm;
			margin-left: 4upx;
			color: $uni-color-primary;
		}
	}

	.c-list{
		font-size: $font-sm + 2upx;
		color: $font-color-base;
		background: #fff;
		.c-row{
			display:flex;
			align-items:center;
			padding: 20upx 30upx;
			position:relative;
		}
		.tit{
			width: 140upx;
		}
		.con{
			flex: 1;
			color: $font-color-dark;
			.selected-text{
				margin-right: 10upx;
			}
		}
		.bz-list{
			height: 40upx;
			font-size: $font-sm+2upx;
			color: $font-color-dark;
			text{
				display: inline-block;
				margin-right: 30upx;
			}
		}
		.con-list{
			flex: 1;
			display:flex;
			flex-direction: column;
			color: $font-color-dark;
			line-height: 40upx;
		}
		.red{
			color: $uni-color-primary;
		}
	}

	/* 评价 */
	.eva-section{
		display: flex;
		flex-direction: column;
		padding: 20upx 30upx;
		background: #fff;
		margin-top: 16upx;
		.e-header{
			display: flex;
			align-items: center;
			height: 70upx;
			font-size: $font-sm + 2upx;
			color: $font-color-light;
			.tit{
				font-size: $font-base + 2upx;
				color: $font-color-dark;
				margin-right: 4upx;
			}
			.tip{
				flex: 1;
				text-align: right;
			}
			.icon-you{
				margin-left: 10upx;
			}
		}
	}
	.eva-box{
		display: flex;
		padding: 20upx 0;
		.portrait{
			flex-shrink: 0;
			width: 80upx;
			height: 80upx;
			border-radius: 100px;
		}
		.right{
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: $font-base;
			color: $font-color-base;
			padding-left: 26upx;
			.con{
				font-size: $font-base;
				color: $font-color-dark;
				padding: 20upx 0;
			}
			.bot{
				display: flex;
				justify-content: space-between;
				font-size: $font-sm;
				color:$font-color-light;
			}
		}
	}
	/*  详情 */
	.detail-desc{
		background: #fff;
		margin-top: 16upx;
		.d-header{
			display: flex;
			justify-content: center;
			align-items: center;
			height: 80upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			position: relative;

			text{
				padding: 0 20upx;
				background: #fff;
				position: relative;
				z-index: 1;
			}
			&:after{
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translateX(-50%);
				width: 300upx;
				height: 0;
				content: '';
				border-bottom: 1px solid #ccc;
			}
		}
	}

	/* 规格选择弹窗 */
	.attr-content{
		padding: 10upx 30upx;
		.select-count {
			padding: 30upx 0 10upx;
			margin: 20upx 0;
			border-top: 1px solid #ccc;
			display: flex;
			justify-content:space-between;
			overflow: hidden;
			position: relative;
			font-size: $font-base + 6upx;
			color: $font-color-base;
			line-height: 60upx;
			.step {
				position: absolute;
				left: 60vw;
				bottom: 10upx;
			}
		}
		.a-t{
			display: flex;
			image{
				width: 170upx;
				height: 170upx;
				flex-shrink: 0;
				margin-top: -40upx;
				border-radius: 8upx;;
			}
			.right{
				display: flex;
				flex-direction: column;
				padding-left: 24upx;
				font-size: $font-sm + 2upx;
				color: $font-color-base;
				line-height: 42upx;
				.price{
					font-size: $font-lg;
					color: $uni-color-primary;
					margin-bottom: 10upx;
				}
				.selected-text{
					margin-right: 10upx;
				}
			}
		}
		.attr-list{
			display: flex;
			flex-direction: column;
			font-size: $font-base + 2upx;
			color: $font-color-base;
			padding-top: 30upx;
			padding-left: 10upx;
		}
		.item-list{
			padding: 20upx 0 0;
			display: flex;
			flex-wrap: wrap;
			.tit{
				display: flex;
				align-items: center;
				justify-content: center;
				background: #eee;
				margin-right: 20upx;
				margin-bottom: 20upx;
				border-radius: 100upx;
				min-width: 60upx;
				height: 60upx;
				padding: 0 20upx;
				font-size: $font-base;
				color: $font-color-dark;
				.img {
					width: 36upx;
					height: 24upx;
					margin: 0 4upx;
				}
			}
			.selected{
				background: #fbebee;
				color: $uni-color-primary;
			}
		}
	}

	/*  弹出层 */
	.popup {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 99;

		&.show {
			display: block;
			.mask{
				animation: showPopup 0.2s linear both;
			}
			.layer {
				animation: showLayer 0.2s linear both;
			}
		}
		&.hide {
			.mask{
				animation: hidePopup 0.2s linear both;
			}
			.layer {
				animation: hideLayer 0.2s linear both;
			}
		}
		&.none {
			display: none;
		}
		.mask{
			position: fixed;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 1;
			background-color: rgba(0, 0, 0, 0.4);
		}
		.layer {
			position: fixed;
			z-index: 99;
			bottom: 0;
			width: 100%;
			border-radius: 10upx 10upx 0 0;
			background-color: #fff;
			.btn{
				height: 66upx;
				line-height: 66upx;
				border-radius: 100upx;
				background: $uni-color-primary;
				font-size: $font-base + 2upx;
				color: #fff;
				margin: 30upx auto 20upx;
			}
		}
		@keyframes showPopup {
			0% {
				opacity: 0;
			}
			100% {
				opacity: 1;
			}
		}
		@keyframes hidePopup {
			0% {
				opacity: 1;
			}
			100% {
				opacity: 0;
			}
		}
		@keyframes showLayer {
			0% {
				transform: translateY(120%);
			}
			100% {
				transform: translateY(0%);
			}
		}
		@keyframes hideLayer {
			0% {
				transform: translateY(0);
			}
			100% {
				transform: translateY(120%);
			}
		}
	}

	/* 底部操作菜单 */
	.page-bottom{
		position:fixed;
		left: 30upx;
		bottom:30upx;
		z-index: 95;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 690upx;
		height: 100upx;
		background: rgba(255,255,255,.9);
		box-shadow: 0 0 20upx 0 rgba(0,0,0,.5);
		border-radius: 16upx;

		.p-b-btn{
			display:flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: $font-sm;
			color: $font-color-base;
			width: 96upx;
			height: 80upx;
			.yticon{
				font-size: 40upx;
				line-height: 48upx;
				color: $font-color-light;
			}
			&.active, &.active .yticon{
				color: $uni-color-primary;
			}
			.icon-fenxiang2{
				font-size: 42upx;
				transform: translateY(-2upx);
			}
			.icon-shoucang{
				font-size: 46upx;
			}
		}
		.action-btn-group{
			display: flex;
			height: 76upx;
			border-radius: 100px;
			overflow: hidden;
			box-shadow: 0 20upx 40upx -16upx #fa436a;
			box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
			background: linear-gradient(to right, #ffac30,#fa436a,#F56C6C);
			margin: 0 20upx;
			position:relative;
			&:after{
				content: '';
				position:absolute;
				top: 50%;
				right: 50%;
				transform: translateY(-50%);
				height: 28upx;
				width: 0;
				border-right: 1px solid rgba(255,255,255,.5);
			}
			.action-btn{
				display:flex;
				align-items: center;
				justify-content: center;
				width: 180upx;
				height: 100%;
				font-size: $font-base ;
				padding: 0;
				border-radius: 0;
				background: transparent;
			}
		}
	}

	/* 优惠券面板 */
	.mask{
		display: flex;
		align-items: flex-end;
		position: fixed;
		left: 0;
		top: var(--window-top);
		bottom: 0;
		width: 100%;
		background: rgba(0,0,0,0);
		z-index: 9995;
		transition: .3s;

		.mask-content{
			width: 100%;
			min-height: 30vh;
			max-height: 70vh;
			background: #f3f3f3;
			transform: translateY(100%);
			transition: .3s;
			overflow-y:scroll;
		}
		&.none{
			display: none;
		}
		&.show{
			background: rgba(0,0,0,.4);

			.mask-content{
				transform: translateY(0);
			}
		}
	}

	/* 优惠券列表 */
	.coupon-item{
		display: flex;
		flex-direction: column;
		margin: 20upx 24upx;
		background: #fff;
		.con{
			display: flex;
			align-items: center;
			position: relative;
			height: 120upx;
			padding: 0 30upx;
			&:after{
				position: absolute;
				left: 0;
				bottom: 0;
				content: '';
				width: 100%;
				height: 0;
				border-bottom: 1px dashed #f3f3f3;
				transform: scaleY(50%);
			}
		}
		.left{
			display: flex;
			flex-direction: column;
			justify-content: center;
			flex: 1;
			overflow: hidden;
			height: 100upx;
		}
		.title{
			font-size: 32upx;
			color: $font-color-dark;
			margin-bottom: 10upx;
		}
		.time{
			font-size: 24upx;
			color: $font-color-light;
		}
		.right{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 26upx;
			color: $font-color-base;
			height: 100upx;
		}
		.price{
			font-size: 44upx;
			color: $base-color;
			&:before{
				content: '￥';
				font-size: 34upx;
			}
		}
		.price-discount {
			font-size: 44upx;
			color: $base-color;
		}
		.tips{
			font-size: 24upx;
			color: $font-color-light;
			line-height: 60upx;
			padding-left: 30upx;
		}
		.circle{
			position: absolute;
			left: -6upx;
			bottom: -10upx;
			z-index: 10;
			width: 20upx;
			height: 20upx;
			background: #f3f3f3;
			border-radius: 100px;
			&.r{
				left: auto;
				right: -6upx;
			}
		}
	}
</style>
