(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"04a2":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=a(e("a34a"));function a(t){return t&&t.__esModule?t:{default:t}}function r(t,n,e,i,a,r,u){try{var o=t[r](u),c=o.value}catch(s){return void e(s)}o.done?n(c):Promise.resolve(c).then(i,a)}function u(t){return function(){var n=this,e=arguments;return new Promise((function(i,a){var u=t.apply(n,e);function o(t){r(u,i,a,o,c,"next",t)}function c(t){r(u,i,a,o,c,"throw",t)}o(void 0)}))}}var o={data:function(){return{titleNViewBackground:"",swiperCurrent:0,swiperLength:0,carouselList:[],goodsList:[]}},onLoad:function(){this.loadData()},methods:{loadData:function(){var t=u(i.default.mark((function t(){var n,e;return i.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$api.json("carouselList");case 2:return n=t.sent,this.titleNViewBackground=n[0].background,this.swiperLength=n.length,this.carouselList=n,t.next=8,this.$api.json("goodsList");case 8:e=t.sent,this.goodsList=e||[];case 10:case"end":return t.stop()}}),t,this)})));function n(){return t.apply(this,arguments)}return n}(),swiperChange:function(t){var n=t.detail.current;this.swiperCurrent=n,this.titleNViewBackground=this.carouselList[n].background},navToDetailPage:function(n){var e=n.title;t.navigateTo({url:"/pages/product/product?id=".concat(e)})}},onNavigationBarSearchInputClicked:function(){var t=u(i.default.mark((function t(n){return i.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:this.$api.msg("点击了搜索框");case 1:case"end":return t.stop()}}),t,this)})));function n(n){return t.apply(this,arguments)}return n}(),onNavigationBarButtonTap:function(n){var e=n.index;if(0===e)this.$api.msg("点击了扫描");else if(1===e){var i=getCurrentPages(),a=i[i.length-1],r=a.$getAppWebview();r.hideTitleNViewButtonRedDot({index:e}),t.navigateTo({url:"/pages/notice/notice"})}}};n.default=o}).call(this,e("6e42")["default"])},"7c9b":function(t,n,e){},8069:function(t,n,e){"use strict";e.r(n);var i=e("04a2"),a=e.n(i);for(var r in i)"default"!==r&&function(t){e.d(n,t,(function(){return i[t]}))}(r);n["default"]=a.a},b297:function(t,n,e){"use strict";var i=e("7c9b"),a=e.n(i);a.a},d537:function(t,n,e){"use strict";(function(t){e("6cdc"),e("921b");i(e("66fd"));var n=i(e("f75a"));function i(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("6e42")["createPage"])},ecf0:function(t,n,e){"use strict";var i=function(){var t=this,n=t.$createElement;t._self._c},a=[];e.d(n,"a",(function(){return i})),e.d(n,"b",(function(){return a}))},f75a:function(t,n,e){"use strict";e.r(n);var i=e("ecf0"),a=e("8069");for(var r in a)"default"!==r&&function(t){e.d(n,t,(function(){return a[t]}))}(r);e("b297");var u=e("2877"),o=Object(u["a"])(a["default"],i["a"],i["b"],!1,null,null,null);n["default"]=o.exports}},[["d537","common/runtime","common/vendor"]]]);