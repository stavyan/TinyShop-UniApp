(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/user"],{"07e5":function(t,e,n){"use strict";(function(t){n("6cdc"),n("921b");r(n("66fd"));var e=r(n("33a9"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},"0f96":function(t,e,n){"use strict";var r=n("2091"),o=n.n(r);o.a},"15e3":function(t,e,n){"use strict";n.r(e);var r=n("18de"),o=n.n(r);for(var i in r)"default"!==i&&function(t){n.d(e,t,(function(){return r[t]}))}(i);e["default"]=o.a},"18de":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=a(n("a34a")),o=n("802d"),i=(n("7ded"),n("2f62"));function a(t){return t&&t.__esModule?t:{default:t}}function u(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function c(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?u(Object(n),!0).forEach((function(e){s(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function s(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function f(t,e,n,r,o,i,a){try{var u=t[i](a),c=u.value}catch(s){return void n(s)}u.done?e(c):Promise.resolve(c).then(r,o)}function l(t){return function(){var e=this,n=arguments;return new Promise((function(r,o){var i=t.apply(e,n);function a(t){f(i,r,o,a,u,"next",t)}function u(t){f(i,r,o,a,u,"throw",t)}a(void 0)}))}}var d=function(){return n.e("components/mix-list-cell").then(n.bind(null,"1f22"))},p=function(){return n.e("components/uni-icons/uni-icons").then(n.bind(null,"2ba4"))},h=0,v=0,g=!0,m={components:{listCell:d,uniIcons:p},data:function(){return{coverTransform:"translateY(0px)",coverTransition:"0s",moving:!1,userInfo:{},token:null,footList:[],user_info:{},orderSectionList:[{title:"待付款",icon:"yticon icon-daifukuan",url:"/pages/order/order?state=0"},{title:"待发货",icon:"yticon icon-shouye",url:"/pages/order/order?state=1"},{title:"待收货",icon:"yticon icon-yishouhuo",url:"/pages/order/order?state=2"},{title:"评价",icon:"yticon icon-pingjia",url:"/pages/order/order?state=3"},{title:"退款/售后",icon:"yticon icon-shouhoutuikuan",url:""}],amountList:[{title:"余额",value:0,url:"/pages/user/account"},{title:"优惠券",value:0,url:"/pages/user/coupon?type=1"},{title:"积分",value:0,url:"/pages/user/integral"}]}},onShow:function(){t.getStorageSync("accessToken")||t.removeTabBarBadge({index:2}),this.initData()},onLoad:function(){var t=l(r.default.mark((function t(){return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:case"end":return t.stop()}}),t)})));function e(){return t.apply(this,arguments)}return e}(),onNavigationBarButtonTap:function(e){var n=e.index;if(0===n)this.navTo("/pages/set/set");else if(1===n){var r=getCurrentPages(),o=r[r.length-1],i=o.$getAppWebview();i.hideTitleNViewButtonRedDot({index:n}),t.navigateTo({url:"/pages/notice/notice"})}},methods:c({},(0,i.mapMutations)(["login"]),{share:function(){this.$refs.share.toggleMask()},initData:function(){var e=l(r.default.mark((function e(){return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(this.userInfo=t.getStorageSync("userInfo")||void 0,this.token=t.getStorageSync("accessToken")||void 0,!this.token){e.next=5;break}return e.next=5,this.getMemberInfo();case 5:case"end":return e.stop()}}),e,this)})));function n(){return e.apply(this,arguments)}return n}(),getMemberInfo:function(){var e=l(r.default.mark((function e(){var n=this;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.showLoading({title:"加载中..."}),this.$get(o.memberInfo).then((function(e){n.amountList[0].value=e.data.account.user_money||0,n.amountList[1].value=e.data.coupon_num||0,n.amountList[2].value=e.data.account.user_integral||0,n.getFootPrintList(),t.setStorage({key:"userInfo",data:e.data}),n.userInfo=e.data||void 0}));case 2:case"end":return e.stop()}}),e,this)})));function n(){return e.apply(this,arguments)}return n}(),getFootPrintList:function(){var e=l(r.default.mark((function e(){var n=this;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.showLoading({title:"加载中..."}),e.next=3,this.$get("".concat(o.footPrintList)).then((function(t){n.footList=t.data}));case 3:case"end":return e.stop()}}),e,this)})));function n(){return e.apply(this,arguments)}return n}(),navTo:function(e){e?this.token?t.navigateTo({url:e}):(e="/pages/public/logintype",t.showModal({content:"你暂未登陆，是否跳转登录页面？",success:function(n){n.confirm&&t.navigateTo({url:e})}})):t.showToast({title:"我还没写",icon:"none"})},coverTouchstart:function(t){!1!==g&&(this.coverTransition="transform .1s linear",h=t.touches[0].clientY)},coverTouchmove:function(t){v=t.touches[0].clientY;var e=v-h;e<0?this.moving=!1:(this.moving=!0,e>=80&&e<100&&(e=80),e>0&&e<=80&&(this.coverTransform="translateY(".concat(e,"px)")))},coverTouchend:function(){!1!==this.moving&&(this.moving=!1,this.coverTransition="transform 0.3s cubic-bezier(.21,1.93,.53,.64)",this.coverTransform="translateY(0px)")}})};e.default=m}).call(this,n("6e42")["default"])},2091:function(t,e,n){},"33a9":function(t,e,n){"use strict";n.r(e);var r=n("98e3"),o=n("15e3");for(var i in o)"default"!==i&&function(t){n.d(e,t,(function(){return o[t]}))}(i);n("0f96");var a=n("2877"),u=Object(a["a"])(o["default"],r["a"],r["b"],!1,null,"988c1f6a",null);e["default"]=u.exports},"98e3":function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement;t._self._c},o=[];n.d(e,"a",(function(){return r})),n.d(e,"b",(function(){return o}))}},[["07e5","common/runtime","common/vendor"]]]);