(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/address/address"],{1625:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=s(n("a34a")),o=n("802d");function s(t){return t&&t.__esModule?t:{default:t}}function a(t,e,n,i,o,s,a){try{var c=t[s](a),u=c.value}catch(r){return void n(r)}c.done?e(u):Promise.resolve(u).then(i,o)}function c(t){return function(){var e=this,n=arguments;return new Promise((function(i,o){var s=t.apply(e,n);function c(t){a(s,i,o,c,u,"next",t)}function u(t){a(s,i,o,c,u,"throw",t)}c(void 0)}))}}var u={data:function(){return{timeOutEvent:0,source:0,addressList:[]}},onLoad:function(t){this.source=t.source},onShow:function(){this.initData()},methods:{goTouchStart:function(e){var n=this;clearTimeout(this.timeOutEvent),this.timeOutEvent=0,this.timeOutEvent=setTimeout((function(){t.showModal({content:"确定要删除该收货地址吗",success:function(i){i.confirm&&n.$del("".concat(o.addressDelete,"?id=").concat(e)).then((function(e){200===e.code?n.getAddressList():t.showToast({title:e.message,icon:"none"})}))}})}),500)},goTouchEnd:function(){clearTimeout(this.timeOutEvent),this.timeOutEvent},goTouchMove:function(){clearTimeout(this.timeOutEvent),this.timeOutEvent=0},initData:function(){this.getAddressList()},getAddressList:function(){var e=c(i.default.mark((function e(){var n=this;return i.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.showLoading({title:"加载中..."}),e.next=3,this.$get("".concat(o.addressList)).then((function(e){200===e.code?n.addressList=e.data:t.showToast({title:e.message,icon:"none"})})).catch((function(t){console.log(t)}));case 3:case"end":return e.stop()}}),e,this)})));function n(){return e.apply(this,arguments)}return n}(),checkAddress:function(e){1==this.source&&(this.$api.prePage().addressData=e,t.navigateBack())},addAddress:function(e,n){t.navigateTo({url:"/pages/address/addressManage?type=".concat(e,"&id=").concat(n&&n.id||void 0)})},refreshList:function(t,e){this.addressList.unshift(t),console.log(t,e)}}};e.default=u}).call(this,n("543d")["default"])},"22e6":function(t,e,n){"use strict";n.r(e);var i=n("c19f"),o=n("2ce5");for(var s in o)"default"!==s&&function(t){n.d(e,t,(function(){return o[t]}))}(s);n("d8a7");var a=n("2877"),c=Object(a["a"])(o["default"],i["a"],i["b"],!1,null,null,null);e["default"]=c.exports},"2ce5":function(t,e,n){"use strict";n.r(e);var i=n("1625"),o=n.n(i);for(var s in i)"default"!==s&&function(t){n.d(e,t,(function(){return i[t]}))}(s);e["default"]=o.a},"7ec8":function(t,e,n){},c19f:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=(t._self._c,t.__map(t.addressList,(function(e,n){var i=parseInt(e.is_default,10);return{$orig:t.__get_orig(e),m0:i}})));t.$mp.data=Object.assign({},{$root:{l0:n}})},o=[];n.d(e,"a",(function(){return i})),n.d(e,"b",(function(){return o}))},d8a7:function(t,e,n){"use strict";var i=n("7ec8"),o=n.n(i);o.a},f29c:function(t,e,n){"use strict";(function(t){n("6cdc"),n("921b");i(n("66fd"));var e=i(n("22e6"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])}},[["f29c","common/runtime","common/vendor"]]]);