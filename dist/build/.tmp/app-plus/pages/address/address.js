(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/address/address"],{1625:function(t,e,n){"use strict";(function(t,s){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=o(n("a34a")),a=n("802d");function o(t){return t&&t.__esModule?t:{default:t}}function u(t,e,n,s,i,a,o){try{var u=t[a](o),c=u.value}catch(r){return void n(r)}u.done?e(c):Promise.resolve(c).then(s,i)}function c(t){return function(){var e=this,n=arguments;return new Promise((function(s,i){var a=t.apply(e,n);function o(t){u(a,s,i,o,c,"next",t)}function c(t){u(a,s,i,o,c,"throw",t)}o(void 0)}))}}var r={data:function(){return{timeOutEvent:0,source:0,addressList:[]}},onLoad:function(t){this.source=t.source},onShow:function(){this.initData()},methods:{goTouchStart:function(e){var n=this;clearTimeout(this.timeOutEvent),this.timeOutEvent=0,this.timeOutEvent=setTimeout((function(){t.showModal({content:"确定要删除该收货地址吗",success:function(s){s.confirm&&n.$del("".concat(a.addressDelete,"?id=").concat(e)).then((function(e){200===e.code?n.getAddressList():t.showToast({title:e.message,icon:"none"})}))}})}),500)},goTouchEnd:function(){clearTimeout(this.timeOutEvent),this.timeOutEvent},goTouchMove:function(){clearTimeout(this.timeOutEvent),this.timeOutEvent=0},initData:function(){this.getAddressList()},getAddressList:function(){var e=c(i.default.mark((function e(){var n=this;return i.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.showLoading({title:"加载中..."}),e.next=3,this.$get("".concat(a.addressList)).then((function(e){200===e.code?n.addressList=e.data:t.showToast({title:e.message,icon:"none"})})).catch((function(t){console.log(s(t," at pages/address/address.vue:97"))}));case 3:case"end":return e.stop()}}),e,this)})));function n(){return e.apply(this,arguments)}return n}(),checkAddress:function(e){1==this.source&&(this.$api.prePage().addressData=e,t.navigateBack())},addAddress:function(e,n){t.navigateTo({url:"/pages/address/addressManage?type=".concat(e,"&id=").concat(n&&n.id||void 0)})},refreshList:function(t,e){this.addressList.unshift(t),console.log(s(t,e," at pages/address/address.vue:118"))}}};e.default=r}).call(this,n("6e42")["default"],n("0de9")["default"])},"22e6":function(t,e,n){"use strict";n.r(e);var s=n("c19f"),i=n("2ce5");for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);n("d8a7");var o=n("2877"),u=Object(o["a"])(i["default"],s["a"],s["b"],!1,null,null,null);e["default"]=u.exports},"2ce5":function(t,e,n){"use strict";n.r(e);var s=n("1625"),i=n.n(s);for(var a in s)"default"!==a&&function(t){n.d(e,t,(function(){return s[t]}))}(a);e["default"]=i.a},"7ec8":function(t,e,n){},c19f:function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement,n=(t._self._c,t.__map(t.addressList,(function(e,n){var s=parseInt(e.is_default,10);return{$orig:t.__get_orig(e),m0:s}})));t.$mp.data=Object.assign({},{$root:{l0:n}})},i=[];n.d(e,"a",(function(){return s})),n.d(e,"b",(function(){return i}))},d8a7:function(t,e,n){"use strict";var s=n("7ec8"),i=n.n(s);i.a},f29c:function(t,e,n){"use strict";(function(t){n("6cdc"),n("921b");s(n("66fd"));var e=s(n("22e6"));function s(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])}},[["f29c","common/runtime","common/vendor"]]]);