(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/feedback/list"],{"348c":function(t,e,n){"use strict";n.r(e);var r=n("9e2d"),o=n.n(r);for(var a in r)"default"!==a&&function(t){n.d(e,t,(function(){return r[t]}))}(a);e["default"]=o.a},"4ead":function(t,e,n){},6181:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=(t._self._c,t.__map(t.feedbackList,(function(e,n){var r=t._f("feedbackFilter")(e.type);return{$orig:t.__get_orig(e),f0:r}})));t.$mp.data=Object.assign({},{$root:{l0:n}})},o=[];n.d(e,"a",(function(){return r})),n.d(e,"b",(function(){return o}))},7005:function(t,e,n){"use strict";n.r(e);var r=n("6181"),o=n("348c");for(var a in o)"default"!==a&&function(t){n.d(e,t,(function(){return o[t]}))}(a);n("df63");var i=n("2877"),c=Object(i["a"])(o["default"],r["a"],r["b"],!1,null,null,null);e["default"]=c.exports},8660:function(t,e,n){"use strict";(function(t){n("6cdc"),n("921b");r(n("66fd"));var e=r(n("7005"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("a821")["createPage"])},"9e2d":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=a(n("a34a")),o=n("802d");function a(t){return t&&t.__esModule?t:{default:t}}function i(t){return f(t)||u(t)||c()}function c(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function u(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function f(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}function s(t,e,n,r,o,a,i){try{var c=t[a](i),u=c.value}catch(f){return void n(f)}c.done?e(u):Promise.resolve(u).then(r,o)}function d(t){return function(){var e=this,n=arguments;return new Promise((function(r,o){var a=t.apply(e,n);function i(t){s(a,r,o,i,c,"next",t)}function c(t){s(a,r,o,i,c,"throw",t)}i(void 0)}))}}var l=function(){return n.e("components/empty").then(n.bind(null,"d138"))},h=function(){return n.e("components/rf-load-more/rf-load-more").then(n.bind(null,"f97d"))},p={components:{empty:l,rfLoadMore:h},data:function(){return{page:1,timeOutEvent:0,source:0,feedbackList:[],loadingType:"more"}},filters:{feedbackFilter:function(t){var e=["","功能建议","BUG反馈","业务咨询"];return e[parseInt(t,10)]}},onLoad:function(t){this.source=t.source},onPullDownRefresh:function(){this.page=1,this.feedbackList.length=0,this.getFeedbackList("refresh")},onReachBottom:function(){this.page++,this.getFeedbackList()},onShow:function(){this.initData()},methods:{initData:function(){this.page=1,this.getFeedbackList()},getFeedbackList:function(){var e=d(r.default.mark((function e(n){var a=this;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.showLoading({title:"加载中..."}),e.next=3,this.$get("".concat(o.opinionList),{page:this.page}).then((function(e){"refresh"===n&&t.stopPullDownRefresh(),a.loadingType=10===e.data.length?"more":"nomore",a.feedbackList=[].concat(i(a.feedbackList),i(e.data))})).catch((function(t){console.log(t)}));case 3:case"end":return e.stop()}}),e,this)})));function n(t){return e.apply(this,arguments)}return n}(),addFeedback:function(){t.navigateTo({url:"/pages/feedback/feedback"})},navToDetail:function(e){t.navigateTo({url:"/pages/feedback/detail?id=".concat(e)})},refreshList:function(t,e){this.feedbackList.unshift(t),console.log(t,e)}}};e.default=p}).call(this,n("a821")["default"])},df63:function(t,e,n){"use strict";var r=n("4ead"),o=n.n(r);o.a}},[["8660","common/runtime","common/vendor"]]]);