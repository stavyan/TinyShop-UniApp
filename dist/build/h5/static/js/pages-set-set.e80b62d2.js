(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-set-set"],{2018:function(t,e,i){"use strict";var n=i("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,i("8e6e"),i("ac6a"),i("456d");var a=n(i("bd86")),l=i("2f62"),s=i("7ded");function c(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,n)}return i}function o(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?c(i,!0).forEach((function(e){(0,a.default)(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):c(i).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}var r={data:function(){return{}},computed:o({},(0,l.mapState)(["userInfo"])),methods:o({},(0,l.mapMutations)(["logout"]),{navTo:function(t){var e=this;"清除缓存"===t&&uni.showModal({content:"确定要清除缓存,退出登陆吗",success:function(t){t.confirm&&e.$post("".concat(s.logout)).then((function(t){if(200===t.code)return uni.clearStorageSync(),void uni.showToast({title:"清除缓存成功",icon:"none"});uni.showToast({title:t.message,icon:"none"})}))}}),uni.navigateTo({url:t})},toLogout:function(){var t=this;uni.showModal({content:"确定要退出登录么",success:function(e){e.confirm&&t.$post("".concat(s.logout)).then((function(e){200===e.code?(t.logout(),uni.reLaunch({url:"/pages/user/user"})):uni.showToast({title:e.message,icon:"none"})}))}})},switchChange:function(t){var e=t.detail.value?"打开":"关闭";this.$api.msg("".concat(e,"消息推送"))}})};e.default=r},"3c19":function(t,e,i){"use strict";var n=i("f67d"),a=i.n(n);a.a},7891:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"container"},[i("v-uni-view",{staticClass:"list-cell b-b m-t",attrs:{"hover-class":"cell-hover","hover-stay-time":50},on:{click:function(e){e=t.$handleEvent(e),t.navTo("/pages/userinfo/userinfo")}}},[i("v-uni-text",{staticClass:"cell-tit"},[t._v("个人资料")]),i("v-uni-text",{staticClass:"cell-more yticon icon-you"})],1),i("v-uni-view",{staticClass:"list-cell b-b",attrs:{"hover-class":"cell-hover","hover-stay-time":50},on:{click:function(e){e=t.$handleEvent(e),t.navTo("/pages/address/address")}}},[i("v-uni-text",{staticClass:"cell-tit"},[t._v("收货地址")]),i("v-uni-text",{staticClass:"cell-more yticon icon-you"})],1),i("v-uni-view",{staticClass:"list-cell b-b",attrs:{"hover-class":"cell-hover","hover-stay-time":50},on:{click:function(e){e=t.$handleEvent(e),t.navTo("/pages/invoice/invoice")}}},[i("v-uni-text",{staticClass:"cell-tit"},[t._v("发票管理")]),i("v-uni-text",{staticClass:"cell-more yticon icon-you"})],1),i("v-uni-view",{staticClass:"list-cell m-t"},[i("v-uni-text",{staticClass:"cell-tit"},[t._v("消息推送")]),i("v-uni-switch",{attrs:{checked:"",color:"#fa436a"},on:{change:function(e){e=t.$handleEvent(e),t.switchChange(e)}}})],1),i("v-uni-view",{staticClass:"list-cell m-t b-b",attrs:{"hover-class":"cell-hover","hover-stay-time":50},on:{click:function(e){e=t.$handleEvent(e),t.navTo("清除缓存")}}},[i("v-uni-text",{staticClass:"cell-tit"},[t._v("清除缓存")]),i("v-uni-text",{staticClass:"cell-more yticon icon-you"})],1),i("v-uni-view",{staticClass:"list-cell b-b",attrs:{"hover-class":"cell-hover","hover-stay-time":50},on:{click:function(e){e=t.$handleEvent(e),t.navTo("/pages/about/about")}}},[i("v-uni-text",{staticClass:"cell-tit"},[t._v("关于RF商城")]),i("v-uni-text",{staticClass:"cell-more yticon icon-you"})],1),i("v-uni-view",{staticClass:"list-cell"},[i("v-uni-text",{staticClass:"cell-tit"},[t._v("当前版本")]),i("v-uni-text",{staticClass:"cell-tip"},[t._v("当前版本 beta 1.0")]),i("v-uni-text",{staticClass:"cell-more yticon icon-you"})],1),i("v-uni-view",{staticClass:"list-cell log-out-btn",on:{click:function(e){e=t.$handleEvent(e),t.toLogout(e)}}},[i("v-uni-text",{staticClass:"cell-tit"},[t._v("退出登录")])],1)],1)},a=[];i.d(e,"a",(function(){return n})),i.d(e,"b",(function(){return a}))},9165:function(t,e,i){e=t.exports=i("24fb")(!1),e.push([t.i,"uni-page-body[data-v-139a03fb]{background:#f8f8f8}.list-cell[data-v-139a03fb]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:baseline;-webkit-align-items:baseline;align-items:baseline;padding:%?20?% %?30?%;line-height:%?60?%;position:relative;background:#fff;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.list-cell.log-out-btn[data-v-139a03fb]{margin-top:%?40?%}.list-cell.log-out-btn .cell-tit[data-v-139a03fb]{color:#fa436a;text-align:center;margin-right:0}.list-cell.cell-hover[data-v-139a03fb]{background:#fafafa}.list-cell.b-b[data-v-139a03fb]:after{left:%?30?%}.list-cell.m-t[data-v-139a03fb]{margin-top:%?16?%}.list-cell .cell-more[data-v-139a03fb]{-webkit-align-self:baseline;align-self:baseline;font-size:%?32?%;color:#909399;margin-left:%?10?%}.list-cell .cell-tit[data-v-139a03fb]{-webkit-box-flex:1;-webkit-flex:1;flex:1;font-size:%?30?%;color:#303133;margin-right:%?10?%}.list-cell .cell-tip[data-v-139a03fb]{font-size:%?28?%;color:#909399}.list-cell uni-switch[data-v-139a03fb]{-webkit-transform:translateX(%?16?%) scale(.84);transform:translateX(%?16?%) scale(.84)}body.?%PAGE?%[data-v-139a03fb]{background:#f8f8f8}",""])},bc09:function(t,e,i){"use strict";i.r(e);var n=i("7891"),a=i("eb44");for(var l in a)"default"!==l&&function(t){i.d(e,t,(function(){return a[t]}))}(l);i("3c19");var s=i("2877"),c=Object(s["a"])(a["default"],n["a"],n["b"],!1,null,"139a03fb",null);e["default"]=c.exports},eb44:function(t,e,i){"use strict";i.r(e);var n=i("2018"),a=i.n(n);for(var l in n)"default"!==l&&function(t){i.d(e,t,(function(){return n[t]}))}(l);e["default"]=a.a},f67d:function(t,e,i){var n=i("9165");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("732c4d6a",n,!0,{sourceMap:!1,shadowMode:!1})}}]);