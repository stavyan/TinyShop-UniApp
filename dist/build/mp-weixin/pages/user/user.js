(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/user"],{"07e5":function(e,t,n){"use strict";(function(e){n("6cdc"),n("921b");o(n("66fd"));var t=o(n("33a9"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},"15e3":function(e,t,n){"use strict";n.r(t);var o=n("18de"),r=n.n(o);for(var i in o)"default"!==i&&function(e){n.d(t,e,(function(){return o[e]}))}(i);t["default"]=r.a},"18de":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=c(n("a34a")),r=n("802d"),i=n("7ded"),a=n("2f62");function c(e){return e&&e.__esModule?e:{default:e}}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){f(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function f(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t,n,o,r,i,a){try{var c=e[i](a),s=c.value}catch(u){return void n(u)}c.done?t(s):Promise.resolve(s).then(o,r)}function d(e){return function(){var t=this,n=arguments;return new Promise((function(o,r){var i=e.apply(t,n);function a(e){l(i,o,r,a,c,"next",e)}function c(e){l(i,o,r,a,c,"throw",e)}a(void 0)}))}}var h=function(){return n.e("components/mix-list-cell").then(n.bind(null,"1f22"))},v=function(){return n.e("components/uni-icons/uni-icons").then(n.bind(null,"2ba4"))},p=0,g=0,m=!0,b={components:{listCell:h,uniIcons:v},data:function(){return{coverTransform:"translateY(0px)",coverTransition:"0s",moving:!1,userInfo:{},token:null,footList:[],code:null,user_info:{}}},onLoad:function(){var t=d(o.default.mark((function t(n){var r=this;return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:this.code=n.code,this.code&&this.$get(i.wechatH5Login,{code:this.code}).then(function(){var t=d(o.default.mark((function t(n){return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(200!==n.code){t.next=10;break}if(n.data.login){t.next=6;break}r.user_info=n.data.user_info.original,e.showModal({content:"你尚未绑定账号，是否跳转登录页面？",success:function(t){if(t.confirm){var n="/pages/public/login?userInfo=".concat(JSON.stringify(r.user_info));e.navigateTo({url:n})}}}),t.next=10;break;case 6:return r.userInfo=n.data.user_info.member||void 0,r.token=n.data.user_info.access_token||void 0,t.next=10,r.login(n.data.user_info);case 10:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),this.initData();case 3:case"end":return t.stop()}}),t,this)})));function n(e){return t.apply(this,arguments)}return n}(),methods:u({},(0,a.mapMutations)(["login"]),{share:function(){this.$refs.share.toggleMask()},wxGetUserInfo:function(){},initData:function(){var t=d(o.default.mark((function t(){return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(this.userInfo=e.getStorageSync("userInfo")||void 0,this.token=e.getStorageSync("accessToken")||void 0,!this.token){t.next=5;break}return t.next=5,this.getMemberInfo();case 5:case"end":return t.stop()}}),t,this)})));function n(){return t.apply(this,arguments)}return n}(),getMemberInfo:function(){var t=d(o.default.mark((function t(){var n=this;return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:this.$get(r.memberInfo).then((function(t){200===t.code?(n.getFootPrintList(),e.setStorage({key:"userInfo",data:t.data}),n.userInfo=t.data||void 0):e.showToast({title:t.message,icon:"none"})}));case 1:case"end":return t.stop()}}),t,this)})));function n(){return t.apply(this,arguments)}return n}(),getFootPrintList:function(){var t=d(o.default.mark((function t(){var n=this;return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$get("".concat(r.footPrintList)).then((function(t){200===t.code?n.footList=t.data:e.showToast({title:t.message,icon:"none"})})).catch((function(e){console.log(e)}));case 2:case"end":return t.stop()}}),t,this)})));function n(){return t.apply(this,arguments)}return n}(),navTo:function(t){var n=this;t?this.token?e.navigateTo({url:t}):(t="/pages/public/login",e.showModal({content:"你暂未登陆，是否跳转登录页面？",success:function(t){t.confirm&&e.login({provider:"weixin",success:function(t){e.getUserInfo({provider:"weixin",success:function(r){console.log(r),n.$post(i.mpWechatLogin,{signature:r.signature,encryptedData:r.encryptedData,rawData:r.rawData,iv:r.iv,code:t.code}).then(function(){var t=d(o.default.mark((function t(r){return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(200!==r.code){t.next=14;break}if(r.data.login){t.next=6;break}n.user_info=r.data.user_info,e.showModal({content:"你尚未绑定账号，是否跳转登录页面？",success:function(t){if(t.confirm){var o="/pages/public/login?userInfo=".concat(JSON.stringify(n.user_info));e.navigateTo({url:o})}}}),t.next=12;break;case 6:return n.userInfo=r.data.user_info.member||void 0,n.token=r.data.user_info.access_token||void 0,t.next=10,n.login(r.data.user_info);case 10:n.initData(),e.showToast({title:"已为您授权登录",icon:"none"});case 12:t.next=15;break;case 14:e.showToast({title:r.message,icon:"none"});case 15:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())},fail:function(e){console.log(e)}})}})}})):e.showToast({title:"我还没写",icon:"none"})},isWechat:function(){var e=window.navigator.userAgent.toLowerCase();return"micromessenger"==e.match(/micromessenger/i)},coverTouchstart:function(e){!1!==m&&(this.coverTransition="transform .1s linear",p=e.touches[0].clientY)},coverTouchmove:function(e){g=e.touches[0].clientY;var t=g-p;t<0?this.moving=!1:(this.moving=!0,t>=80&&t<100&&(t=80),t>0&&t<=80&&(this.coverTransform="translateY(".concat(t,"px)")))},coverTouchend:function(){!1!==this.moving&&(this.moving=!1,this.coverTransition="transform 0.3s cubic-bezier(.21,1.93,.53,.64)",this.coverTransform="translateY(0px)")}})};t.default=b}).call(this,n("543d")["default"])},2299:function(e,t,n){"use strict";var o=n("3aaf"),r=n.n(o);r.a},"33a9":function(e,t,n){"use strict";n.r(t);var o=n("b7b0"),r=n("15e3");for(var i in r)"default"!==i&&function(e){n.d(t,e,(function(){return r[e]}))}(i);n("2299");var a=n("2877"),c=Object(a["a"])(r["default"],o["a"],o["b"],!1,null,"45e64a5c",null);t["default"]=c.exports},"3aaf":function(e,t,n){},b7b0:function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement;e._self._c},r=[];n.d(t,"a",(function(){return o})),n.d(t,"b",(function(){return r}))}},[["07e5","common/runtime","common/vendor"]]]);