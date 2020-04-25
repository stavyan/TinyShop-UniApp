<template>
	<view class="product">
		<view class="detail" v-if="productDetail.name">
			<!--顶部商品轮播图-->
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
			<!--商品信息-->
			<view class="introduce-section">
				<view class="title">
					{{ productDetail.name || (' 暂无商品详情' + (!!errorInfo ? '[' + errorInfo + ']' : '')) }}
					<uni-tag
							v-if="productDetail.sales"
							class="tag"
							:inverted="true"
							type="base"
							:text="`${productDetail.sales}件已售`"
							size="small" />
					<uni-tag
							v-if="productDetail.is_virtual == 1"
							class="tag"
							:inverted="true"
							type="base"
							text="虚拟物品"
							size="small" />
				</view>
				<text class="sketch">{{ productDetail.sketch }}</text>
				<view class="price-box point-box" v-if="productDetail.point_exchange_type == 4">
					该商品仅需 <text class="price">{{ productDetail.point_exchange }} 积分</text>
				</view>
				<view class="price-box" v-else>
					<text class="price" v-if="productDetail.price">¥ {{ currentSkuPrice || productDetail.price }}</text>
					<text class="m-price" v-if="parseFloat(productDetail.market_price) > parseFloat(productDetail.price)">{{ productDetail.market_price }}</text>
					<text class="coupon-tip" v-if="parseFloat(productDetail.market_price) > parseFloat(productDetail.price)">{{ (currentSkuPrice || productDetail.price) / productDetail.market_price | discountFilter }}折</text>
				</view>
				<view class="data" v-if="productDetail">
					<view class="item"><text class="iconfont icontuandui"></text>推荐 {{ productDetail.collect_num || 0 }}</view>
					<view class="item"><text class="iconfont iconkechakan"></text>浏览 {{ productDetail.view || 0 }}</view>
				</view>
			</view>
			<!--  分享 -->
			<view class="share-section" v-if="productDetail.name">
				<view class="share-icon">
					<text class="iconfont iconxingxing"></text>
					 返
				</view>
				<text open-type="contact" class="tit">分享该商品给你的朋友们</text>
				<!--#ifndef H5-->
				<button :disabled="!!productDetail" class="share-btn" open-type="share">
					立即分享
					<i class="iconfont iconyou"></i>
				</button>
				<!--#endif-->
			</view>
			<!--商品参数-->
			<view class="c-list">
				<!--商品库存-->
				<rf-item-popup title="商品库存" v-if="parseInt(productDetail.is_stock_visible, 10) == 1" :isEmpty="parseInt(currentStock || productDetail.stock, 10) === 0" empty="库存不足">
					<view slot="content">{{ currentStock || productDetail.stock || 0 }} 个</view>
				</rf-item-popup>
				<!--发货地址-->
				<rf-item-popup title="发货地址" :isEmpty="!productDetail.address_name" empty="发货地址未填写">
					<view slot="content">{{ productDetail.address_name }}</view>
				</rf-item-popup>
				<!--购买类型-->
				<rf-item-popup title="购买类型" @hide="hideService" :specClass="specClass" @show="toggleSpec" :isEmpty="specSelected.length === 0" :empty="`基础款 * ${cartCount}`">
					<view slot="content">
						<text class="selected-text" v-for="(sItem, sIndex) in specSelected" :key="sIndex">
							{{sItem.title}}
						</text>
					  <text> * {{ cartCount }}</text>
					</view>
					<view slot="right"><text class="iconfont iconyou"></text></view>
					<view slot="popup" class="attr-content">
						<view class="a-t">
							<image :src="showTypeImage || productDetail.picture"></image>
							<view class="right">
								<text class="title">{{ productDetail.name }}</text>
								<text class="price">¥{{ currentSkuPrice || productDetail.minSkuPrice }}</text>
								<text class="stock">库存：{{ currentStock || productDetail.stock }}件</text>
								<view class="selected" v-if="specSelected.length > 0">
									已选：
									<text class="selected-text" v-for="(sItem, sIndex) in specSelected" :key="sIndex">
										{{sItem.title}}
									</text>
									<text v-if="specSelected.length > 0">
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
									@tap="selectSpec(childIndex, childItem.base_spec_id, item.show_type)"
								>
									<text v-if="parseInt(item.show_type) === 1">
										{{childItem.title }}
									</text>
									<text v-if="parseInt(item.show_type) === 2">
										{{childItem.title }}
									</text>
									<view v-if="parseInt(item.show_type) === 3">
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
							<rf-number-box
								class="step"
								:min="1"
								:max="parseInt(currentStock || productDetail.stock, 10)"
								:value="cartCount"
								@eventChange="numberChange"
							></rf-number-box>
						</view>
						<button class="btn" @tap="toggleSpec">完成</button>
					</view>
				</rf-item-popup>
				<!--优惠券-->
				<rf-item-popup title="优惠券" @hide="hideService" :specClass="couponClass" @show="showPopupService('couponClass', 1)">
					<view slot="content">
						<text class="con t-r red">领取优惠券</text>
					</view>
					<view slot="right"><text class="iconfont iconyou"></text></view>
					<view slot="popup" class="service">
			      <!-- 优惠券列表 -->
			      <view class="sub-list valid">
			        <view class="row" v-for="(item,index) in productDetail.canReceiveCoupon" :key="index" @tap.stop="getCoupon(item)">
			          <view class="carrier">
			            <view class="title">
				            <view>
				              <text class="cell-icon">{{ parseInt(item.range_type, 10) === 2 ? '限' : '全' }}</text>
				              <text class="cell-title">{{item.title}}</text>
				            </view>
				            <view>
											<text class="price" v-if="item.money">{{item.money }}</text>
											<text class="price-discount" v-else>{{ `${item.discount}折` }}</text>
				            </view>
			            </view>
			            <view class="term">
			              <text>{{ item.start_time | time }} ~ {{ item.end_time | time }}</text>
										<text class="at_least">满{{ item.at_least }}可用</text>
			            </view>
			            <view class="usage">
											<text>
												{{ parseInt(item.range_type, 10) === 2 ? '部分产品使用' : '全场产品使用' }}
											</text>
			              <view>
			                {{parseInt(item.max_fetch, 10) === 0 ? '不限' : `每人限领${item.max_fetch}` }}
			                已领{{ item.get_count }}
			                <text class="last" v-if="item.percentage">剩余{{ item.percentage }}%</text>
			              </view>
			            </view>
			          </view>
			        </view>
			      </view>
					</view>
				</rf-item-popup>
				<!--限购说明-->
				<rf-item-popup title="限购说明">
					<view slot="content">
						<text>{{ parseInt(productDetail.max_buy, 10) === 0 ? '不限购' : `${productDetail.max_buy} 件` }}</text>
					</view>
				</rf-item-popup>
				<!--积分活动-->
				<rf-item-popup title="积分活动">
					<view slot="content" class="con-list">
						<text v-if="productDetail.point_exchange_type">兑换类型: {{ productDetail.point_exchange_type | pointExchangeTypeFilter }} </text>
						<text v-if="parseInt(productDetail.give_point, 10) > 0">赠送类型: {{ productDetail.integral_give_type | integralGiveTypeFilter }} </text>
						<text v-if="parseInt(productDetail.give_point, 10) > 0">下单可获得: {{ productDetail | givePointFilter }}</text>
						<text v-if="productDetail.point_exchange != 0">兑换所需积分: {{ productDetail.point_exchange }} </text>
						<text v-if="productDetail.max_use_point != 0">可使用抵扣积分: {{ productDetail.max_use_point }}</text>
						<text class="buy-now" @tap="addCart('buy', true)" v-if="productDetail.point_exchange_type == 3">积分兑换 >>  </text>
					</view>
				</rf-item-popup>
				<!--服务-->
        <rf-item-popup title="服务" @hide="hideService" @show="showPopupService('serviceClass', productDetail.tags)" :specClass="serviceClass" :isEmpty="productDetail.tags.length === 0" empty="暂无相关服务">
					<view slot="content">
						<text>{{ productDetail.tags[0] }}</text>
					</view>
					<view slot="right" v-if="productDetail.tags.length > 0"><text class="iconfont iconyou"></text></view>
					<view slot="popup" class="service">
						<view class="content">
							<view class="row" v-for="(item,index) in productDetail.tags" :key="index">
								<view class="title">{{item}}</view>
								<view class="description">此商品承诺{{item}}</view>
							</view>
						</view>
						<button class="btn" @tap="hideService">完成</button>
					</view>
				</rf-item-popup>
				<!--阶梯优惠-->
				<rf-item-popup title="阶梯优惠" @hide="hideService" @show="showPopupService('ladderPreferentialClass', productDetail.ladderPreferential)" :specClass="ladderPreferentialClass" :isEmpty="productDetail.ladderPreferential.length === 0" empty="暂无阶梯优惠">
					<view slot="content" class="con-list">
						<text>
							满{{ productDetail.ladderPreferential && productDetail.ladderPreferential[0] && productDetail.ladderPreferential[0].quantity }}件
								<text v-if="parseInt(productDetail.ladderPreferential && productDetail.ladderPreferential[0] && productDetail.ladderPreferential[0].type, 10) === 1">
									每件减{{ productDetail.ladderPreferential && productDetail.ladderPreferential[0] && productDetail.ladderPreferential[0].price }}元</text>
								<text v-if="parseInt(productDetail.ladderPreferential && productDetail.ladderPreferential[0] && productDetail.ladderPreferential[0].type, 10) === 2">
									每件{{ parseInt(productDetail.ladderPreferential && productDetail.ladderPreferential[0] && productDetail.ladderPreferential[0].price, 10) }}折</text>
						</text>
					</view>
					<view slot="right" v-if="productDetail.ladderPreferential.length > 0"><text class="iconfont iconyou"></text></view>
					<view slot="popup" class="service">
						<view class="content">
							<view class="row" v-for="(item,index) in productDetail.ladderPreferential" :key="index">
								<view class="title">满{{ item.quantity }}件 <text v-if="parseInt(item.type, 10) === 1">每件减{{ item.price }}元</text>
									<text v-if="parseInt(item.type, 10) === 2">每件{{ parseInt(item.price, 10) }}折</text>
								</view>
							</view>
						</view>
						<button class="btn" @tap="hideService">完成</button>
					</view>
				</rf-item-popup>
				<!--商品参数-->
				<rf-item-popup title="商品参数" @hide="hideService" @show="showPopupService('attributeValueClass', productDetail.attributeValue)" :specClass="attributeValueClass" :isEmpty="productDetail.attributeValue.length === 0" empty="暂无商品参数">
					<view slot="content">
						<text>
							{{ `${productDetail.attributeValue && productDetail.attributeValue[0] && productDetail.attributeValue[0].title}: ${productDetail.attributeValue && productDetail.attributeValue[0] && productDetail.attributeValue[0].value}` }}</text>
					</view>
					<view slot="right" v-if="productDetail.attributeValue.length > 0"><text class="iconfont iconyou"></text></view>
					<view slot="popup" class="service">
						<view class="content">
							<view class="row" v-for="(item,index) in productDetail.attributeValue" :key="index">
								<view class="title">
									{{ `${item.title}: ${item.value}` }}
								</view>
							</view>
						</view>
						<button class="btn" @tap="hideService">完成</button>
					</view>
				</rf-item-popup>
			</view>
			<!-- 评价 -->
			<view class="eva-section" @tap="toEvaluateList">
				<view class="e-header">
					<text class="tit">评价</text>
					<text>({{ productDetail.comment_num || 0 }})</text>
					<text class="tip" v-if="productDetail.match_ratio">好评率 {{ productDetail.match_ratio }}%</text>
					<text class="tip" v-else>暂无评价信息</text>
					<i class="iconfont iconyou"></i>
				</view>
				<view class="eva-box" v-if="productDetail.evaluate && productDetail.evaluate.length > 0">
					<image class="portrait"
								 :src="productDetail.evaluate && productDetail.evaluate[0] && productDetail.evaluate[0].member_head_portrait || headImg" mode="aspectFill"></image>
					<view class="right">
						<view class="name">
							<text>
								{{ productDetail.evaluate && productDetail.evaluate[0] && productDetail.evaluate[0].member_nickname || '匿名用户' }}
							</text>
							<rf-rate
								v-if="evaluateList.length > 0"
								size="16"
							  disabled="true"
								:value="evaluateList[0].scores"
								active-color="#fa436a" />
						</view>
						<text class="con in2line">{{ productDetail.evaluate && productDetail.evaluate[0] && productDetail.evaluate[0].content || '这个人很懒，什么都没留下~' }}</text>
						<view class="bot">
							<text class="attr">购买类型：{{ productDetail.evaluate && productDetail.evaluate[0] && productDetail.evaluate[0].sku_name || '基础版' }}</text>
							<text class="time">{{ productDetail.evaluate && productDetail.evaluate[0] && productDetail.evaluate[0].created_at | time }}</text>
						</view>
					</view>
				</view>
			</view>
			<!--底部商品详情-->
			<view class="detail-desc">
				<view class="d-header">
					<text>商品详情</text>
				</view>
				<rich-text :nodes="productDetail.intro | formatRichText"></rich-text>
			</view>
			<!-- 底部操作菜单 -->
			<view class="page-bottom">
				<navigator url="/pages/index/index" open-type="switchTab" class="p-b-btn">
					<i class="iconfont iconxiatubiao--copy"></i>
					<text>首页</text>
				</navigator>
				<navigator url="/pages/cart/cart" open-type="switchTab" class="p-b-btn cart">
					<i class="iconfont icongouwuche"></i>
					<text>购物车</text>
					<rf-badge v-if="hasLogin && cartNum && cartNum > 0" type="error" size="small" class="badge" :text="cartNum"></rf-badge>
				</navigator>
				<view class="p-b-btn" :class="{active: favorite}" @tap="toFavorite">
					<i class="iconfont iconshoucang"></i>
					<text>收藏</text>
				</view>
				<!--<view @tap="navTo(`/pages/product/service/index`)" class="p-b-btn">-->
					<!--<i class="iconfont icondanseshixintubiao-"></i>-->
					<!--<text>客服</text>-->
				<!--</view>-->
				<view class="action-btn-group" v-if="parseInt((this.currentStock || this.productDetail.stock), 10) > 0">
					<button type="primary"
					        class="action-btn no-border buy-now-btn"
					        :disabled="buyBtnDisabled"
					        @tap="addCart('buy')">立即购买</button>
					<button type="primary"
									:disabled="addCartBtnDisabled"
									class=" action-btn no-border add-cart-btn"
									@tap="addCart('cart')">加入购物车</button>
				</view>
				<view class="action-btn-group" v-else>
					<button type="primary"
					        class="action-btn no-border buy-now-btn"
					        :disabled="buyBtnDisabled"
					        @tap="addCart('buy')">立即购买</button>
					<button type="primary"
					        class="action-btn "
					        :disabled="buyBtnDisabled"
					        @tap="addCart('buy')">库存不足</button>
				</view>
			</view>
		</view>
		<!-- 404页面 -->
		<view v-if="!productDetail.name && !loading">
			<rf-no-data :custom="true">
				<view class="no-data-title">
					{{ errorInfo || '暂无数据' }}
				</view>
				<view @tap="getProductDetail(productDetail.id)" slot="refresh" class="spec-color">重新加载</view>
			</rf-no-data>
		</view>
		<!--页面加载动画-->
    <rf-loading v-if="loading"></rf-loading>
	</view>
</template>

<script>
	/**
	 * @des 商品详情
	 *
	 * @author stav stavyan@qq.com
	 * @date 2020-03-23 15:04
	 * @copyright 2019
	 */
	import {cartItemCount, cartItemCreate, productDetail} from '@/api/product';
	import rfNumberBox from '@/components/rf-number-box';
  import {collectCreate, collectDel, transmitCreate} from '@/api/basic';
  import moment from '@/common/moment';
	import {couponReceive} from '@/api/userInfo';
	import rfRate from '@/components/rf-rate/rf-rate';
	import rfBadge from '@/components/rf-badge/rf-badge'
	import uniTag from '@/components/uni-tag/uni-tag'
	import rfNoData from '@/components/rf-no-data'
	import rfItemPopup from '@/components/rf-item-popup'
	export default{
		components: {
			rfItemPopup,
			rfBadge,
			rfRate,
			rfNumberBox,
			uniTag,
			rfNoData
		},
		filters: {
		    /**
			 * 处理富文本里的图片宽度自适应
			 * 1.去掉img标签里的style、width、height属性
			 * 2.img标签添加style属性：max-width:100%;height:auto
			 * 3.修改所有style里的width属性为max-width:100%
			 * 4.去掉<br/>标签
			 * @param html
			 * @returns {void|string|*}
			 */
			formatRichText (html) { //控制小程序中图片大小
        if (html) {
            let newContent = html.replace(/<img[^>]*>/gi, function(match, capture) {
						if(match.search(/style=/gi) == -1){
							match = match.replace(/\<img/gi,'<img style=""');
						}
						return match;
					});
					newContent = newContent.replace(/style="/gi, '$& max-width:100% !important; ');
					newContent = newContent.replace(/<br[^>]*\/>/gi, '');
					return newContent;
        } else {
            return '暂无商品详情'
        }
			},
			time(val) {
				return moment(val * 1000).format('YYYY-MM-DD HH:mm')
			},
			discountFilter (val) {
		    return (val * 10).toFixed(1);
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
						Math.round(parseInt(val.give_point, 10) / 100 * parseInt(val.minSkuPrice, 10)) :
						parseInt(val.give_point, 10);
			}
		},
		data() {
			return {
				serviceClass: 'none',//服务弹窗css类，控制开关动画
				ladderPreferentialClass: 'none',//服务弹窗css类，控制开关动画
				attributeValueClass: 'none',//scss类，控制开关动画
				specClass: 'none',
				couponClass: 'none',
				cartType: null,
				maskState: 0, //优惠券面板显示状态
				couponList: [],
				productDetail: {},
				styleObject: {},
				showTypeImage: null,
				specSelected:[],
				favorite: false,
				shareList: [],
				currentStock: null,
				currentSkuPrice: null,
				specList: [],
				specChildList: [],
				cartCount: 1,
				product_id: null,
				evaluateList: [],
				hasLogin: null,
				cartNum: null,
				loading: true,
        errorInfo: '',
				headImg: this.$mAssetsPath.headImg,
				isPointExchange: false
			};
		},
		computed: {
			buyBtnDisabled () {
			    return parseInt(this.currentStock || this.productDetail.stock, 10) === 0;
			},
			addCartBtnDisabled () {
		    return this.productDetail.point_exchange_type == 2 ||
			    this.productDetail.point_exchange_type == 4 ||
			    (this.currentStock || this.productDetail.stock) == 0 ||
			    this.productDetail.is_virtual == 1;
			}
		},
		async onLoad(options){
			this.initData(options.id);
			//规格 默认选中第一条
			this.specList.forEach(item=>{
				for(let cItem of this.specChildList){
					if(cItem.pid === item.id){
						this.$set(cItem, 'selected', true);
						this.specSelected.push(cItem);
						break; //forEach不能使用break
					}
				}
			});
			this.product_id = options.id;
		},
		onShareAppMessage() {
		  // #ifdef MP-WEIXIN
      this.$http.post(`${transmitCreate}`, {
        topic_type: 'product',
        topic_id: this.product_id
      }).then(()=>{
        return {
          title: this.productDetail.name,
          path: '/pages/product/product?id=' + this.product_id
        }
      })
		  // #endif
		  // #ifdef MP-QQ
      return {
        title: this.productDetail.name,
        path: '/pages/product/product?id=' + this.product_id
      }
		  // #endif
		},
		methods:{
			navTo (route) {
				if (!this.hasLogin) {
					this.$mHelper.backToLogin();
				} else {
					this.$mRouter.push({route});
				}
			},
			// 弹窗
			showPopupService(type, list) {
				if(list.length === 0) return;
				this[type] = 'show';
			},
			shareToH5() {
				this.$mHelper.toast('请复制连接进行分享');
			},
			//关闭服务弹窗
			hideService() {
				this.specClass = 'none';
				this.couponClass = 'none';
				this.serviceClass = 'none';
				this.ladderPreferentialClass = 'none';
				this.attributeValueClass = 'none';
			},
			// 获取优惠券
			async getCoupon(item) {
				if (!this.hasLogin) {
					this.maskState = 0;
					this.$mHelper.backToLogin();
					return;
				}
				await this.$http.post(`${couponReceive}`, {
					id: item.id
				}).then(() => {
			    this.$mHelper.toast('领取成功');
					this.maskState = 0;
				}).catch(() => {
					this.maskState = 0;
				})
			},
			// 跳转至评价列表
			toEvaluateList () {
				if (!this.productDetail.evaluateStat || parseInt(this.productDetail.comment_num, 10) === 0) return;
				this.$mRouter.push({route: `/pages/order/evaluation/list?comment_num=${this.productDetail.comment_num}&evaluateStat=${JSON.stringify(this.productDetail.evaluateStat)}`});
			},
			numberChange(data){
				this.cartCount = data.number;
			},
			// 数据初始化
			async initData(id) {
				this.hasLogin = this.$mStore.getters.hasLogin;
				this.cartNum = uni.getStorageSync('cartNum');
				this.productDetail.id = id;
				await this.getProductDetail(id);
			},
			// 获取产品详情
			async getProductDetail (id) {
				await this.$http.get(`${productDetail}`, {
					id
				}).then(async r => {
					this.loading = false;
          this.productDetail = r.data;
          this.evaluateList = await r.data.evaluate;
          this.favorite = this.productDetail.myCollect ? true : false;
          this.specList = this.productDetail.base_attribute_format
          this.specList.forEach(item => {
              this.specChildList = [...this.specChildList, ...item.value]
          });
          /**
           * 修复选择规格存储错误
           * 将这几行代码替换即可
           * 选择的规格存放在specSelected中
           */
          this.specSelected = [];
          r.data.base_attribute_format.forEach(item => {
              item.value[0].selected = true
              this.specSelected.push(item.value[0]);
          });
          let skuStr = [];
          this.specSelected.forEach(item => {
              skuStr.push(item.base_spec_value_id)
          })
          this.productDetail.sku.forEach(item => {
              if (item.data === skuStr.join('-')) {
                  this.currentStock = item.stock;
                  this.currentSkuPrice = item.price;
                  return;
              }
          })
        }).catch(err => {
					this.loading = false;
					this.errorInfo = err;
				})
			},
			//规格弹窗开关
			toggleSpec() {
				if (!this.productDetail.id) return;
				if(this.specClass === 'show'){
					if (!this.hasLogin) {
						this.specClass = 'none';
						this.$mHelper.backToLogin();
						return;
					}
          if (this.specSelected.length < this.productDetail.base_attribute_format.length){
				    this.$mHelper.toast('请先选择规格');
            return;
          }
          const skuStr = [];
          let sku_id = '';
          this.specSelected.forEach(item => {
              skuStr.push(item.base_spec_value_id)
          })
          this.productDetail.sku.forEach(item => {
            if (item.data === skuStr.join('-')) {
              sku_id = item.id;
              this.currentStock = item.stock;
              this.currentSkuPrice = item.price;
            }
          });
					if (parseInt(this.currentStock, 10) === 0) {
				    this.$mHelper.toast('库存不足');
				    return;
					}
					if (this.cartType === 'cart') {
						this.handleCartItemCreate(sku_id);
					} else if (this.cartType === 'buy') {
						this.buy(sku_id);
					}
					this.cartType = null;
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
			// 添加商品至购物车
			async handleCartItemCreate (sku_id) {
				await this.$http.post(`${cartItemCreate}`, {
					sku_id,
					num: this.cartCount
				}).then(async () => {
					await this.$http.get(`${cartItemCount}`).then(async r => {
						uni.setStorageSync('cartNum', r.data);
						this.cartNum = r.data;
						await uni.setTabBarBadge({
							index: this.$mConstDataConfig.cartIndex,
							text: r.data
						});
					});
					this.$mHelper.toast('添加成功，在购物车等');
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
						color: list[index].data
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
              this.currentSkuPrice = item.price;
							return;
						}
					});
			},
			// 收藏
			async toFavorite() {
				if (!this.productDetail.id) return;
				if (!this.$mStore.getters.hasLogin) {
					this.specClass = 'none';
					this.$mHelper.backToLogin();
				} else {
          this.favorite ? this.handleCollectDel() : this.handleCollectCreate();
        }
			},
			// 收藏商品
			async handleCollectCreate() {
				await this.$http.post(`${collectCreate}`, {
					topic_id: this.product_id,
					topic_type: 'product'
				}).then(() => {
					this.favorite = !this.favorite;
					this.$mHelper.toast('收藏成功');
				})
			},
			// 取消收藏商品
			async handleCollectDel() {
				await this.$http.delete(`${collectDel}?id=${this.productDetail.myCollect.id}`).then(() => {
					this.favorite = !this.favorite;
					this.$mHelper.toast('取消收藏成功');
				})
			},
			async buy(sku_id) {
				const list = {};
				const data = {};
				data.sku_id = sku_id;
				data.num = this.cartCount;
				if (this.productDetail.point_exchange_type == 2 || this.productDetail.point_exchange_type == 4 || (this.productDetail.point_exchange_type == 3 && this.isPointExchange)) {
					list.type = 'point_exchange';
				} else {
					list.type = 'buy_now';
				}
				list.data = JSON.stringify(data);
				this.$mRouter.push({route: `/pages/order/create/order?data=${JSON.stringify(list)}`});
			},
			addCart(type, isPointExchange){
				if (!this.productDetail.id) return;
				this.specClass = 'show';
				this.cartType = type;
				this.isPointExchange = isPointExchange;
			},
			stopPrevent(){
			}
		}
	}
</script>

<style scoped lang='scss'>
	page{
		background: $page-color-base;
	}
	.detail {
		padding-bottom: 160upx;
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
			font-size: $font-lg;
			color: $font-color-dark;
			.tag {
				margin-left: 20upx;
			}
		}
		.data {
			display: flex;
			justify-content: space-between;
			margin: 5upx 15% 0;
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
		.sketch {
			margin-top: 10upx;
			display: block;
			color: $font-color-light;
			font-size: $font-base;
		}
		.price-box{
			display:flex;
			align-items:baseline;
			height: 64upx;
			padding: 10upx 0;
			font-size: 26upx;
			color:$base-color;
		}
		.point-box {
			color: $font-color-base;
			.price {
				color:$base-color;
				margin-left: 10upx;
			}
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
	}
	/* 分享 */
	.share-section{
		display:flex;
		align-items:center;
		color: $font-color-base;
		background: linear-gradient(to left, #fdf5f6, #fbebf6);
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
		.iconxingxing{
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
		.iconyou{
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
			.buy-now {
				color: $uni-color-primary;
			}
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
			.con {
				padding: 0;
			}
			.tip{
				flex: 1;
				text-align: right;
			}
			.iconyou{
				margin-left: 10upx;
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
				}
				.bot{
					display: flex;
					justify-content: space-between;
					font-size: $font-sm;
					color:$font-color-light;
				}
				.name {
					align-items: center;
					display: flex;
					justify-content: space-between;
				}
			}
		}
	}
	/*  详情 */
	.detail-desc{
		background: #fff;
		margin-top: 16upx;
		padding: 0 10upx;
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
			padding-top: 15upx;
			padding-left: 10upx;
		}
		.item-list{
			padding: 10upx 0 0;
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
		.cart {
			position: relative;
			.badge {
				position: absolute;
				top: -8upx;
				right: 0upx;
			}
		}
		.p-b-btn{
			display:flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: $font-sm;
			color: $font-color-base;
			width: 96upx;
			height: 80upx;
			.iconfont{
				font-size: 36upx;
				line-height: 48upx;
				color: $font-color-light;
			}
			&.active, &.active .iconfont{
				color: $uni-color-primary;
			}
			.icon-fenxiang2 {
				font-size: 42upx;
				transform: translateY(-2upx);
			}
			.iconshoucang {
				font-size: 40upx;
			}
			.icondanseshixintubiao- {
				font-size: 46upx;
			}
			.red {
				color: $base-color;
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
	.layer {
		position: fixed;
		z-index: 99;
		bottom: 0;
		width: 100%;
		border-radius: 10upx 10upx 0 0;
		background-color: #fff;
		.content {
			width: 100%;
			padding: 20upx 0;
		}
		.btn{
			height: 66upx;
			line-height: 66upx;
			border-radius: 100upx;
			background: $uni-color-primary;
			font-size: $font-base + 2upx;
			color: #fff;
			margin: 30upx 30upx 20upx;
		}
	}
	.service {
		padding: $spacing-base $spacing-lg 0;
		.row {
			margin-bottom: $spacing-base;
			.title {
				font-size: $font-lg;
			}
			.description {
				font-size: $font-base;
			}
		}
	}
	.selected-text {
		margin-right: 4upx;
	}
	.sub-list {
		margin: 40upx 0 80upx;
		.row {
			width: 100%;
			margin-bottom: $spacing-lg;
		}
	}
</style>
