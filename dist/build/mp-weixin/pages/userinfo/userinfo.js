(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/userinfo/userinfo"],{"14ed":function(e,t,n){},"3ed6":function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement;e._self._c},r=[];n.d(t,"a",(function(){return a})),n.d(t,"b",(function(){return r}))},"790d":function(e,t,n){"use strict";var a=n("14ed"),r=n.n(a);r.a},b3af:function(e,t,n){"use strict";n.r(t);var a=n("c3fa"),r=n.n(a);for(var o in a)"default"!==o&&function(e){n.d(t,e,(function(){return a[e]}))}(o);t["default"]=r.a},c3fa:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=o(n("a34a")),r=n("802d");function o(e){return e&&e.__esModule?e:{default:e}}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){u(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function f(e,t,n,a,r,o,i){try{var c=e[o](i),u=c.value}catch(f){return void n(f)}c.done?t(u):Promise.resolve(u).then(a,r)}function s(e){return function(){var t=this,n=arguments;return new Promise((function(a,r){var o=e.apply(t,n);function i(e){f(o,a,r,i,c,"next",e)}function c(e){f(o,a,r,i,c,"throw",e)}i(void 0)}))}}var l=n("9564"),d=function(){return n.e("components/rf-avatar/rf-avatar").then(n.bind(null,"db78"))},p={components:{avatar:d},data:function(){var e=this.getDate({format:!0});return{profileInfo:{},avatar:null,genders:[{value:"0",name:"未知"},{value:"1",name:"男"},{value:"2",name:"女"}],date:e,token:null}},computed:{},onLoad:function(){this.initData()},methods:{myUpload:function(e){this.profileInfo.head_portrait=e.path},uploadImage:function(){var t=this;e.chooseImage({count:1,sizeType:["original","compressed"],sourceType:["album"],success:function(e){t.handleUploadFile(e.tempFilePaths)}})},handleUploadFile:function(t){console.log(t);var n=this;e.uploadFile({url:r.uploadImage,filePath:t.path,name:"file",header:{"x-api-key":n.token,"merchant-id":1},formData:{"access-token":n.token,"merchant-id":1},success:function(t){e.hideLoading();var a=JSON.parse(t.data);200===a.code?(n.profileInfo.head_portrait=a.data.url,n.handleUpdateInfo(n.profileInfo)):e.showToast({title:a.message,icon:"none"})}})},bindDateChange:function(e){this.date=e.target.value},getDate:function(e){var t=new Date,n=t.getFullYear(),a=t.getMonth()+1,r=t.getDate();return"start"===e?n-=60:"end"===e&&(n+=2),a=a>9?a:"0"+a,r=r>9?r:"0"+r,"".concat(n,"-").concat(a,"-").concat(r)},initData:function(){this.token=e.getStorageSync("accessToken")||void 0,this.token?this.getMemberInfo():e.reLaunch({url:"/pages/public/login"})},getMemberInfo:function(){var t=s(a.default.mark((function t(){var n=this;return a.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$get(r.memberInfo).then((function(t){200===t.code?(n.profileInfo=t.data,n.date=n.profileInfo.birthday):e.showToast({title:t.message,icon:"none"})}));case 2:case"end":return t.stop()}}),t,this)})));function n(){return t.apply(this,arguments)}return n}(),toUpdateInfo:function(){var t=s(a.default.mark((function t(n){var r,o,i;return a.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(r=n.detail.value,o=[{name:"mobile",checkType:"phoneno",checkRule:"11,11",errorMsg:"请输入正确的手机号"}],i=l.check(r,o),i){t.next=6;break}return e.showToast({title:l.error,icon:"none"}),t.abrupt("return");case 6:this.handleUpdateInfo(r,"avatar");case 7:case"end":return t.stop()}}),t,this)})));function n(e){return t.apply(this,arguments)}return n}(),handleUpdateInfo:function(){var t=s(a.default.mark((function t(n,o){return a.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.showLoading({title:"资料修改中..."}),t.next=3,this.$put("".concat(r.memberUpdate,"?id=").concat(this.profileInfo.id),c({},n,{birthday:this.date})).then((function(t){200===t.code?e.showToast({title:"恭喜您, 资料修改成功！",icon:"none"}):e.showToast({title:t.message,icon:"none"})})).catch((function(e){console.log(e)}));case 3:case"end":return t.stop()}}),t,this)})));function n(e,n){return t.apply(this,arguments)}return n}()}};t.default=p}).call(this,n("543d")["default"])},cce1:function(e,t,n){"use strict";(function(e){n("6cdc"),n("921b");a(n("66fd"));var t=a(n("d9a9"));function a(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},d9a9:function(e,t,n){"use strict";n.r(t);var a=n("3ed6"),r=n("b3af");for(var o in r)"default"!==o&&function(e){n.d(t,e,(function(){return r[e]}))}(o);n("790d");var i=n("2877"),c=Object(i["a"])(r["default"],a["a"],a["b"],!1,null,null,null);t["default"]=c.exports}},[["cce1","common/runtime","common/vendor"]]]);