(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"04a2":function(t,e,n){"use strict";(function(t,a){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=o(n("a34a")),r=n("c4c8");function o(t){return t&&t.__esModule?t:{default:t}}function c(t,e,n,a,i,r,o){try{var c=t[r](o),u=c.value}catch(s){return void n(s)}c.done?e(u):Promise.resolve(u).then(a,i)}function u(t){return function(){var e=this,n=arguments;return new Promise((function(a,i){var r=t.apply(e,n);function o(t){c(r,a,i,o,u,"next",t)}function u(t){c(r,a,i,o,u,"throw",t)}o(void 0)}))}}var s=function(){return n.e("components/uni-grid/uni-grid").then(n.bind(null,"cff3"))},d=function(){return n.e("components/uni-grid-item/uni-grid-item").then(n.bind(null,"e395"))},l=function(){return n.e("components/uni-icons/uni-icons").then(n.bind(null,"2ba4"))},f={components:{uniGrid:s,uniIcons:l,uniGridItem:d},data:function(){return{titleNViewBackground:"",swiperCurrent:0,swiperLength:0,carouselList:{},search:{},hotSearchDefault:"输入关键字搜索",hotProductList:[],recommendProductList:[],guessYouLikeProductList:[],newProductList:[],productCateList:[],brandList:[]}},onLoad:function(){this.initData(),console.log(t(this.$refs.search," at pages/index/index.vue:370"))},methods:{initData:function(){this.getIndexList()},navToList:function(t){a.navigateTo({url:"/pages/product/list?cate_id=".concat(t)})},indexTopToDetailPage:function(t,e){var n;switch(t){case"product_view":n="/pages/product/product?id=".concat(e);break;case"article_view":a.showToast({title:"article_view",icon:"none"});break;case"coupon_view":n="/pages/coupon/detail?id=".concat(e);break;case"helper_view":a.showToast({title:"helper_view",icon:"none"});break;case"product_list_for_cate":n="/pages/product/list?cate_id=".concat(e);break;default:break}n&&a.navigateTo({url:n})},toProductList:function(t){a.navigateTo({url:"/pages/product/list?params=".concat(JSON.stringify(t))})},getBrandList:function(){var e=u(i.default.mark((function e(){var n=this;return i.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a.showLoading({title:"加载中..."}),e.next=3,this.$get("".concat(r.brandList),{}).then((function(t){200===t.code?n.brandList=t.data:a.showToast({title:t.message,icon:"none"})})).catch((function(e){console.log(t(e," at pages/index/index.vue:434"))}));case 3:case"end":return e.stop()}}),e,this)})));function n(){return e.apply(this,arguments)}return n}(),getIndexList:function(){var e=u(i.default.mark((function e(){var n=this;return i.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a.showLoading({title:"加载中..."}),e.next=3,this.$get("".concat(r.indexList),{}).then((function(t){200===t.code?(n.getBrandList(),n.productCateList=t.data.cate,n.carouselList=t.data.adv,n.search=t.data.search,n.hotSearchDefault="请输入关键字 如: ".concat(t.data.search.hot_search_default),n.hotProductList=t.data.product_hot,n.recommendProductList=t.data.product_recommend,n.guessYouLikeProductList=t.data.guess_you_like,n.newProductList=t.data.product_new):a.showToast({title:t.message,icon:"none"})})).catch((function(e){console.log(t(e," at pages/index/index.vue:454"))}));case 3:case"end":return e.stop()}}),e,this)})));function n(){return e.apply(this,arguments)}return n}(),swiperChange:function(t){var e=t.detail.current;this.swiperCurrent=e},navToDetailPage:function(t){t&&a.navigateTo({url:"/pages/product/product?id=".concat(t)})},toSearch:function(){a.navigateTo({url:"/pages/search/search?search=".concat(JSON.stringify(this.search))})}},onNavigationBarSearchInputClicked:function(){var t=u(i.default.mark((function t(){return i.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:a.navigateTo({url:"/pages/search/search?search=".concat(JSON.stringify(this.search))});case 1:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),onNavigationBarButtonTap:function(t){var e=t.index;if(0===e)this.$api.msg("点击了扫描");else if(1===e){var n=getCurrentPages(),i=n[n.length-1],r=i.$getAppWebview();r.hideTitleNViewButtonRedDot({index:e}),a.navigateTo({url:"/pages/notice/notice"})}}};e.default=f}).call(this,n("0de9")["default"],n("6e42")["default"])},"7c9b":function(t,e,n){},8069:function(t,e,n){"use strict";n.r(e);var a=n("04a2"),i=n.n(a);for(var r in a)"default"!==r&&function(t){n.d(e,t,(function(){return a[t]}))}(r);e["default"]=i.a},8833:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"a",(function(){return a})),n.d(e,"b",(function(){return i}))},b297:function(t,e,n){"use strict";var a=n("7c9b"),i=n.n(a);i.a},d537:function(t,e,n){"use strict";(function(t){n("6cdc"),n("921b");a(n("66fd"));var e=a(n("f75a"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},f75a:function(t,e,n){"use strict";n.r(e);var a=n("8833"),i=n("8069");for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);n("b297");var o=n("2877"),c=Object(o["a"])(i["default"],a["a"],a["b"],!1,null,null,null);e["default"]=c.exports}},[["d537","common/runtime","common/vendor"]]]);