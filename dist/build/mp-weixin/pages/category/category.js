(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/category/category"],{"2e2d":function(t,e,n){"use strict";var a=n("c84a"),r=n.n(a);r.a},"461a":function(t,e,n){"use strict";n.r(e);var a=n("61b3"),r=n("475c");for(var c in r)"default"!==c&&function(t){n.d(e,t,(function(){return r[t]}))}(c);n("2e2d");var o=n("2877"),i=Object(o["a"])(r["default"],a["a"],a["b"],!1,null,"374623a4",null);e["default"]=i.exports},"475c":function(t,e,n){"use strict";n.r(e);var a=n("d397"),r=n.n(a);for(var c in a)"default"!==c&&function(t){n.d(e,t,(function(){return a[t]}))}(c);e["default"]=r.a},"61b3":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c},r=[];n.d(e,"a",(function(){return a})),n.d(e,"b",(function(){return r}))},c84a:function(t,e,n){},d397:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=c(n("a34a")),r=n("c4c8");function c(t){return t&&t.__esModule?t:{default:t}}function o(t,e,n,a,r,c,o){try{var i=t[c](o),u=i.value}catch(s){return void n(s)}i.done?e(u):Promise.resolve(u).then(a,r)}function i(t){return function(){var e=this,n=arguments;return new Promise((function(a,r){var c=t.apply(e,n);function i(t){o(c,a,r,i,u,"next",t)}function u(t){o(c,a,r,i,u,"throw",t)}i(void 0)}))}}var u=function(){return n.e("components/rf-search-bar/rf-search-bar").then(n.bind(null,"9f3a"))},s={components:{rfSearchBar:u},data:function(){return{headerShow:!0,hotSearchDefault:"输入关键字搜索",fList:[],sList:[],tList:[],showCategoryIndex:0,categoryList:[],search:""}},onLoad:function(){this.initData()},methods:{navToList:function(e){t.navigateTo({url:"/pages/product/list?cate_id=".concat(e)})},initData:function(){this.search=t.getStorageSync("search"),this.hotSearchDefault="请输入关键字 如: ".concat(this.search.hot_search_default),this.getProductCate()},getProductCate:function(){var e=i(a.default.mark((function e(){var n=this;return a.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.fList=[],this.sList=[],this.tList=[],t.showLoading({title:"加载中..."}),e.next=6,this.$get("".concat(r.productCate)).then((function(e){if(200===e.code){n.categoryList=e.data;for(var a=0;a<e.data.length;a++)if(e.data[a].child.length>0){n.showCategoryIndex=a;break}}else t.showToast({title:e.message,icon:"none"})})).catch((function(t){console.log(t)}));case 6:case"end":return e.stop()}}),e,this)})));function n(){return e.apply(this,arguments)}return n}(),showCategory:function(t){this.showCategoryIndex=t},toSearch:function(){t.navigateTo({url:"/pages/search/search?search=".concat(JSON.stringify(this.search))})},toIndex:function(){t.reLaunch({url:"/pages/index/index"})}}};e.default=s}).call(this,n("543d")["default"])},d7ed:function(t,e,n){"use strict";(function(t){n("6cdc"),n("921b");a(n("66fd"));var e=a(n("461a"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])}},[["d7ed","common/runtime","common/vendor"]]]);