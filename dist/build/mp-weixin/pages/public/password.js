(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/public/password"],{"00ff":function(e,t,n){},"0c44":function(e,t,n){"use strict";(function(e){n("6cdc"),n("921b");o(n("66fd"));var t=o(n("8ff4"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},"1b44":function(e,t,n){"use strict";n.r(t);var o=n("7fa0"),r=n.n(o);for(var a in o)"default"!==a&&function(e){n.d(t,e,(function(){return o[e]}))}(a);t["default"]=r.a},"21a2":function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement;e._self._c},r=[];n.d(t,"a",(function(){return o})),n.d(t,"b",(function(){return r}))},"3a83":function(e,t,n){"use strict";var o=n("00ff"),r=n.n(o);r.a},"7fa0":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=i(n("a34a")),r=n("2f62"),a=n("7ded");function i(e){return e&&e.__esModule?e:{default:e}}function s(e,t,n,o,r,a,i){try{var s=e[a](i),c=s.value}catch(u){return void n(u)}s.done?t(c):Promise.resolve(c).then(o,r)}function c(e){return function(){var t=this,n=arguments;return new Promise((function(o,r){var a=e.apply(t,n);function i(e){s(a,o,r,i,c,"next",e)}function c(e){s(a,o,r,i,c,"throw",e)}i(void 0)}))}}function u(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?u(Object(n),!0).forEach((function(t){f(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function f(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var d=n("9564"),p={data:function(){return{mobile:"",password:"",code:"",type:null,logining:!1,loginByPass:!0,smsCodeBtnDisabled:!1,codeSeconds:60}},onLoad:function(e){this.type=e.type},methods:l({},(0,r.mapMutations)(["login"]),{inputChange:function(e){var t=e.currentTarget.dataset.key;this[t]=e.detail.value},checkPhoneIsValid:function(t){var n=/^1[0-9]{10,10}$/;return!!n.test(t)||(e.showToast({title:"请输入正确的手机号",icon:"none"}),!1)},blurRePasswordChange:function(t){this.password!==t.detail.value&&e.showToast({title:"两次输入的密码不一致",icon:"none"})},getSmsCode:function(){var t=this;this.checkPhoneIsValid(this.mobile)&&(e.showLoading({title:"获取中..."}),this.$post(a.smsCode,{mobile:this.mobile,usage:"up-pwd"}).then((function(n){if(200===n.code){e.showToast({title:"验证码发送成功, 验证码是".concat(n.data),icon:"none"}),t.smsCodeBtnDisabled=!0;var o=59,r=setInterval((function(){0===o?(clearInterval(r),t.smsCodeBtnDisabled=!1):(t.codeSeconds=o,t.smsCodeBtnDisabled=!0,o--)}),1e3)}else e.showToast({title:n.message,icon:"none"})})).catch((function(e){console.log(e)})))},blurMobileChange:function(e){this.mobile=e.detail.value},showLoginBySmsCode:function(){this.loginByPass=!this.loginByPass},navBack:function(){e.navigateBack()},toLogin:function(){e.navigateTo({url:"/pages/public/login"})},toForgetPass:function(){e.navigateTo({url:"/pages/public/password"})},toHome:function(){e.switchTab({url:"/pages/index/index"})},blurPasswordChange:function(e){this.password=e.detail.value},toUpdatePassword:function(){var t=c(o.default.mark((function t(n){var r,i,s,c;return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(r=n.detail.value,r.password===r.password_repetition){t.next=4;break}return e.showToast({title:"两次输入的密码不一致",icon:"none"}),t.abrupt("return");case 4:if(i=[{name:"mobile",checkType:"phoneno",checkRule:"11,11",errorMsg:"请输入正确的手机号"},{name:"code",checkType:"notnull",checkRule:"",errorMsg:"请输入验证码"},{name:"password",checkType:"string",checkRule:"6,20",errorMsg:"密码长度为6-20位"},{name:"password_repetition",checkType:"notnull",checkRule:"",errorMsg:"请输入确认密码"}],s=d.check(r,i),s){t.next=9;break}return e.showToast({title:d.error,icon:"none"}),t.abrupt("return");case 9:e.showLoading({title:"请稍等..."}),c={},c.group="tinyShopWechatMq",this.$post(a.updatePassword,l({},c,{},r)).then((function(t){200===t.code?(e.showToast({title:"密码重置成功！",icon:"none"}),e.navigateTo({url:"/pages/public/login"})):e.showToast({title:t.message,icon:"none"})})).catch((function(e){console.log(e)}));case 13:case"end":return t.stop()}}),t,this)})));function n(e){return t.apply(this,arguments)}return n}()})};t.default=p}).call(this,n("543d")["default"])},"8ff4":function(e,t,n){"use strict";n.r(t);var o=n("21a2"),r=n("1b44");for(var a in r)"default"!==a&&function(e){n.d(t,e,(function(){return r[e]}))}(a);n("3a83");var i=n("2877"),s=Object(i["a"])(r["default"],o["a"],o["b"],!1,null,"00e0d9ce",null);t["default"]=s.exports}},[["0c44","common/runtime","common/vendor"]]]);