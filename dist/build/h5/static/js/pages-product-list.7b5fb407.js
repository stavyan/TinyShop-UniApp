(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-product-list"],{"14a0":function(t,e,a){"use strict";var i=a("e17e"),n=a.n(i);n.a},"171c":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"content"},[a("v-uni-view",{staticClass:"navbar",style:{position:t.headerPosition,top:t.headerTop}},[a("v-uni-view",{staticClass:"nav-item",class:{current:0===t.filterIndex},on:{click:function(e){e=t.$handleEvent(e),t.tabClick(0)}}},[t._v("综合排序")]),a("v-uni-view",{staticClass:"nav-item",class:{current:1===t.filterIndex},on:{click:function(e){e=t.$handleEvent(e),t.tabClick(1)}}},[a("v-uni-text",[t._v("销量")]),a("v-uni-view",{staticClass:"p-box"},[a("v-uni-text",{staticClass:"yticon icon-shang",class:{active:1===t.salesOrder&&1===t.filterIndex}}),a("v-uni-text",{staticClass:"yticon icon-shang xia",class:{active:2===t.salesOrder&&1===t.filterIndex}})],1)],1),a("v-uni-view",{staticClass:"nav-item",class:{current:2===t.filterIndex},on:{click:function(e){e=t.$handleEvent(e),t.tabClick(2)}}},[t._v("浏览量")]),a("v-uni-view",{staticClass:"nav-item",class:{current:3===t.filterIndex},on:{click:function(e){e=t.$handleEvent(e),t.tabClick(3)}}},[t._v("收藏")]),a("v-uni-view",{staticClass:"nav-item",class:{current:4===t.filterIndex},on:{click:function(e){e=t.$handleEvent(e),t.tabClick(4)}}},[a("v-uni-text",[t._v("价格")]),a("v-uni-view",{staticClass:"p-box"},[a("v-uni-text",{staticClass:"yticon icon-shang",class:{active:1===t.priceOrder&&4===t.filterIndex}}),a("v-uni-text",{staticClass:"yticon icon-shang xia",class:{active:2===t.priceOrder&&4===t.filterIndex}})],1)],1),a("v-uni-text",{staticClass:"cate-item yticon icon-fenlei1",on:{click:function(e){e=t.$handleEvent(e),t.toggleCateMask("show")}}})],1),a("v-uni-view",{staticClass:"goods-list"},t._l(t.goodsList,(function(e,i){return a("v-uni-view",{key:i,staticClass:"goods-item",on:{click:function(a){a=t.$handleEvent(a),t.navToDetailPage(e)}}},[a("v-uni-view",{staticClass:"image-wrapper"},[a("v-uni-image",{attrs:{src:e.picture,mode:"aspectFill"}})],1),a("v-uni-text",{staticClass:"title clamp"},[t._v(t._s(e.name))]),a("v-uni-view",{staticClass:"price-box"},[a("v-uni-text",{staticClass:"price"},[t._v(t._s(e.minPriceSku.price)),e.minPriceSku.market_price>e.minPriceSku.price?a("v-uni-text",{staticClass:"m-price"},[t._v("¥ "+t._s(e.minPriceSku.market_price))]):t._e()],1),a("v-uni-text",[t._v("已售"+t._s(e.sales))])],1)],1)})),1),a("uni-load-more",{attrs:{status:t.loadingType}}),0===t.goodsList.length?a("empty",{attrs:{info:"赶紧通知老板进货"}}):t._e(),a("v-uni-view",{staticClass:"cate-mask",class:0===t.cateMaskState?"none":1===t.cateMaskState?"show":"",on:{click:function(e){e=t.$handleEvent(e),t.toggleCateMask(e)}}},[a("v-uni-view",{staticClass:"cate-content",on:{click:function(e){e.stopPropagation(),e.preventDefault(),e=t.$handleEvent(e),t.stopPrevent(e)},touchmove:function(e){e.stopPropagation(),e.preventDefault(),e=t.$handleEvent(e),t.stopPrevent(e)}}},[a("v-uni-scroll-view",{staticClass:"cate-list",attrs:{"scroll-y":""}},t._l(t.cateList,(function(e){return a("v-uni-view",{key:e.id},[a("v-uni-view",{staticClass:"cate-item one",on:{click:function(a){a.stopPropagation(),a=t.$handleEvent(a),t.changeCate(e.id)}}},[t._v(t._s(e.title))]),t._l(e.child,(function(e){return a("v-uni-view",{key:e.id,staticClass:"cate-item two",class:{active:e.id==t.cateId},on:{click:function(a){a.stopPropagation(),a=t.$handleEvent(a),t.changeCate(e.id)}}},[t._v(t._s(e.title)),t._l(e.child,(function(e){return a("v-uni-view",{key:e.id,staticClass:"cate-item three",class:{active:e.id==t.cateId},on:{click:function(a){a.stopPropagation(),a=t.$handleEvent(a),t.changeCate(e.id)}}},[t._v(t._s(e.title))])}))],2)}))],2)})),1)],1)],1)],1)},n=[];a.d(e,"a",(function(){return i})),a.d(e,"b",(function(){return n}))},2301:function(t,e,a){e=t.exports=a("24fb")(!1),e.push([t.i,'.content[data-v-fbad4fca],uni-page-body[data-v-fbad4fca]{background:#f8f8f8}.content[data-v-fbad4fca]{padding-top:%?96?%}.navbar[data-v-fbad4fca]{position:fixed;left:0;top:var(--window-top);display:-webkit-box;display:-webkit-flex;display:flex;width:100%;height:%?80?%;background:#fff;box-shadow:0 %?2?% %?10?% rgba(0,0,0,.06);z-index:10}.navbar .nav-item[data-v-fbad4fca]{-webkit-box-flex:1;-webkit-flex:1;flex:1;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;height:100%;font-size:%?30?%;color:#303133;position:relative}.navbar .nav-item.current[data-v-fbad4fca]{color:#fa436a}.navbar .nav-item.current[data-v-fbad4fca]:after{content:"";position:absolute;left:50%;bottom:0;-webkit-transform:translateX(-50%);transform:translateX(-50%);width:%?120?%;height:0;border-bottom:%?4?% solid #fa436a}.navbar .p-box[data-v-fbad4fca]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column}.navbar .p-box .yticon[data-v-fbad4fca]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;width:%?30?%;height:%?14?%;line-height:1;margin-left:%?4?%;font-size:%?26?%;color:#888}.navbar .p-box .yticon.active[data-v-fbad4fca]{color:#fa436a}.navbar .p-box .xia[data-v-fbad4fca]{-webkit-transform:scaleY(-1);transform:scaleY(-1)}.navbar .cate-item[data-v-fbad4fca]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;height:100%;width:%?80?%;position:relative;font-size:%?44?%}.navbar .cate-item[data-v-fbad4fca]:after{content:"";position:absolute;left:0;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);border-left:1px solid #ddd;width:0;height:%?36?%}.cate-mask[data-v-fbad4fca]{position:fixed;left:0;top:40px;bottom:0;width:100%;background:transparent;z-index:95;-webkit-transition:.3s;transition:.3s}.cate-mask .cate-content[data-v-fbad4fca]{width:%?630?%;height:100%;background:#fff;float:right;-webkit-transform:translateX(100%);transform:translateX(100%);-webkit-transition:.3s;transition:.3s}.cate-mask.none[data-v-fbad4fca]{display:none}.cate-mask.show[data-v-fbad4fca]{background:rgba(0,0,0,.4)}.cate-mask.show .cate-content[data-v-fbad4fca]{-webkit-transform:translateX(0);transform:translateX(0)}.cate-list[data-v-fbad4fca]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;height:100%}.cate-list .cate-item[data-v-fbad4fca]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;height:%?90?%;padding-left:%?30?%;font-size:%?34?%;position:relative;color:#303133}.cate-list .one[data-v-fbad4fca]{background:#eee}.cate-list .two[data-v-fbad4fca]{background:#f8f8f8;color:#606266;height:%?64?%;font-size:%?31?%;padding-left:%?50?%}.cate-list .three[data-v-fbad4fca]{font-size:%?28?%;color:#606266}.cate-list .active[data-v-fbad4fca]{color:#fa436a}.goods-list[data-v-fbad4fca]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap;padding:0 %?30?%;background:#fff}.goods-list .goods-item[data-v-fbad4fca]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;width:48%;padding-bottom:%?40?%}.goods-list .goods-item[data-v-fbad4fca]:nth-child(odd){margin-right:4%}.goods-list .image-wrapper[data-v-fbad4fca]{width:100%;height:%?330?%;border-radius:3px;margin-top:%?15?%;overflow:hidden}.goods-list .image-wrapper uni-image[data-v-fbad4fca]{width:100%;height:100%;opacity:1}.goods-list .title[data-v-fbad4fca]{font-size:%?32?%;color:#303133;line-height:%?80?%}.goods-list .price-box[data-v-fbad4fca]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;padding-right:%?10?%;font-size:%?24?%;color:#909399}.goods-list .price[data-v-fbad4fca]{font-size:%?28?%;color:#fa436a;line-height:1}.goods-list .price[data-v-fbad4fca]:before{content:"￥";font-size:%?26?%}.goods-list .price .m-price[data-v-fbad4fca]{margin-left:%?8?%;color:#909399;font-size:%?24?%;text-decoration:line-through}body.?%PAGE?%[data-v-fbad4fca]{background:#f8f8f8}',""])},"35bd":function(t,e,a){"use strict";a.r(e);var i=a("7208"),n=a.n(i);for(var o in i)"default"!==o&&function(t){a.d(e,t,(function(){return i[t]}))}(o);e["default"]=n.a},7208:function(t,e,a){"use strict";var i=a("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,a("8e6e"),a("ac6a"),a("456d"),a("55dd");var n=i(a("75fc")),o=i(a("bd86"));a("96cf");var r=i(a("3b8d")),s=i(a("09c2")),c=i(a("d138")),d=a("c4c8");function l(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,i)}return a}function f(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?l(a,!0).forEach((function(e){(0,o.default)(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):l(a).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var u={components:{uniLoadMore:s.default,empty:c.default},data:function(){return{cateMaskState:0,headerPosition:"fixed",headerTop:"0px",loadingType:"more",filterIndex:0,cateId:0,priceOrder:0,salesOrder:0,cateList:[],goodsList:[],keyword:null,page:1,filterParams:{}}},onLoad:function(t){this.initData(t)},onPageScroll:function(t){t.scrollTop>=0?this.headerPosition="fixed":this.headerPosition="absolute"},onPullDownRefresh:function(){this.filterParams={},this.page=1,this.goodsList=[],this.getProductList("refresh")},onReachBottom:function(){this.page++,this.getProductList()},methods:{initData:function(t){navigator&&(this.headerTop=document.getElementsByTagName("uni-page-head")[0].offsetHeight+"px"),this.cateId=t.cate_id,this.keyword=t.keyword,this.getProductCate(),this.getProductList()},getProductList:function(){var t=(0,r.default)(regeneratorRuntime.mark((function t(e){var a,i=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a={},this.keyword?a.keyword=this.keyword:this.cateId&&(a.cate_id=this.cateId),a.page=this.page,uni.showLoading({title:"加载中..."}),t.next=6,this.$get("".concat(d.productList),f({},a,{},this.filterParams)).then((function(t){"refresh"===e&&uni.stopPullDownRefresh(),200===t.code?(i.loadingType=10===t.data.length?"more":"nomore",i.goodsList=[].concat((0,n.default)(i.goodsList),(0,n.default)(t.data))):uni.showToast({title:t.message,icon:"none"})})).catch((function(t){console.log(t)}));case 6:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}(),getProductCate:function(){var t=(0,r.default)(regeneratorRuntime.mark((function t(){var e=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return uni.showLoading({title:"加载中..."}),t.next=3,this.$get("".concat(d.productCate)).then((function(t){200===t.code?e.cateList=t.data:uni.showToast({title:t.message,icon:"none"})})).catch((function(t){console.log(t)}));case 3:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),loadData:function(){var t=(0,r.default)(regeneratorRuntime.mark((function t(){var e,a,i,n=this,o=arguments;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e=o.length>0&&void 0!==o[0]?o[0]:"add",a=o.length>1?o[1]:void 0,"add"!==e){t.next=8;break}if("nomore"!==this.loadingType){t.next=5;break}return t.abrupt("return");case 5:this.loadingType="loading",t.next=9;break;case 8:this.loadingType="more";case 9:return t.next=11,this.$api.json("goodsList");case 11:i=t.sent,"refresh"===e&&(this.goodsList=[]),1===this.filterIndex&&i.sort((function(t,e){return e.sales-t.sales})),2===this.filterIndex&&i.sort((function(t,e){return 1==n.priceOrder?t.price-e.price:e.price-t.price})),this.goodsList=this.goodsList.concat(i),this.loadingType=this.goodsList.length>20?"nomore":"more","refresh"===e&&(1==a?uni.hideLoading():uni.stopPullDownRefresh());case 18:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),tabClick:function(t){this.filterParams={},this.filterIndex===t&&4!==t&&1!==t||(this.filterIndex=t,0===t?this.filterParams={}:1===t?1===this.salesOrder?(this.filterParams.sales="desc",this.salesOrder=2):(this.filterParams.sales="asc",this.salesOrder=1):2===t?this.filterParams.view="desc":3===t?this.filterParams.collect="desc":4===t&&(1===this.priceOrder?(this.filterParams.price="desc",this.priceOrder=2):(this.filterParams.price="asc",this.priceOrder=1)),uni.pageScrollTo({duration:300,scrollTop:0}),this.page=1,this.goodsList=[],this.getProductList())},toggleCateMask:function(t){var e=this,a="show"===t?10:300,i="show"===t?1:0;this.cateMaskState=2,setTimeout((function(){e.cateMaskState=i}),a)},changeCate:function(t){this.cateId=t,this.keyword=void 0,this.toggleCateMask(),uni.pageScrollTo({duration:300,scrollTop:0}),this.page=1,this.goodsList=[],this.filterParams={},this.getProductList("refresh")},navToDetailPage:function(t){uni.navigateTo({url:"/pages/product/product?id=".concat(t.id)})},stopPrevent:function(){}}};e.default=u},"9ae3":function(t,e,a){"use strict";a.r(e);var i=a("171c"),n=a("35bd");for(var o in n)"default"!==o&&function(t){a.d(e,t,(function(){return n[t]}))}(o);a("14a0");var r=a("2877"),s=Object(r["a"])(n["default"],i["a"],i["b"],!1,null,"fbad4fca",null);e["default"]=s.exports},c4c8:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.orderPay=e.orderClose=e.orderCreate=e.cartItemUpdateNum=e.cartItemClear=e.cartItemDel=e.cartItemList=e.cartItemCreate=e.productDetail=e.productList=e.productCate=void 0;var i="/addons/rf-tiny-shop/v1/product/cate/index";e.productCate=i;var n="/addons/rf-tiny-shop/v1/product/product/index";e.productList=n;var o="/addons/rf-tiny-shop/v1/product/product/view";e.productDetail=o;var r="/addons/rf-tiny-shop/v1/member/cart-item/create";e.cartItemCreate=r;var s="/addons/rf-tiny-shop/v1/member/cart-item/index";e.cartItemList=s;var c="/addons/rf-tiny-shop/v1/member/cart-item/delete-ids";e.cartItemDel=c;var d="/addons/rf-tiny-shop/v1/member/cart-item/clear";e.cartItemClear=d;var l="/addons/rf-tiny-shop/v1/member/cart-item/update-num";e.cartItemUpdateNum=l;var f="/addons/rf-tiny-shop/v1/order/order/create";e.orderCreate=f;var u="/addons/rf-tiny-shop/v1/member/order/close";e.orderClose=u;var p="/addons/rf-tiny-shop/v1/common/pay/create";e.orderPay=p},e17e:function(t,e,a){var i=a("2301");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var n=a("4f06").default;n("119a3271",i,!0,{sourceMap:!1,shadowMode:!1})}}]);