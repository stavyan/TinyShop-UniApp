(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-public-login"],{"11c2":function(e,t,n){t=e.exports=n("24fb")(!1),t.push([e.i,'uni-page-body[data-v-50393cba]{background:#fff}.container[data-v-50393cba]{padding-top:115px;position:relative;width:100vw;height:100vh;overflow:hidden;background:#fff}.wrapper[data-v-50393cba]{position:relative;z-index:90;background:#fff;padding-bottom:%?40?%}.back-btn[data-v-50393cba]{position:absolute;left:%?40?%;z-index:9999;padding-top:0;top:%?40?%;font-size:%?40?%;color:#303133}.left-top-sign[data-v-50393cba]{font-size:%?120?%;color:#f8f8f8;position:relative;left:%?-16?%}.right-top-sign[data-v-50393cba]{position:absolute;top:%?80?%;right:%?-30?%;z-index:95}.right-top-sign[data-v-50393cba]:after,.right-top-sign[data-v-50393cba]:before{display:block;content:"";width:%?400?%;height:%?80?%;background:#b4f3e2}.right-top-sign[data-v-50393cba]:before{-webkit-transform:rotate(50deg);transform:rotate(50deg);border-radius:0 50px 0 0}.right-top-sign[data-v-50393cba]:after{position:absolute;right:%?-198?%;top:0;-webkit-transform:rotate(-50deg);transform:rotate(-50deg);border-radius:50px 0 0 0}.left-bottom-sign[data-v-50393cba]{position:absolute;left:%?-270?%;bottom:%?-320?%;border:%?100?% solid #d0d1fd;border-radius:50%;padding:%?180?%}.welcome[data-v-50393cba]{position:relative;left:%?50?%;top:%?-90?%;font-size:%?46?%;color:#555;text-shadow:1px 0 1px rgba(0,0,0,.3)}.input-content[data-v-50393cba]{padding:0 %?60?%}.input-item[data-v-50393cba]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:start;-webkit-align-items:flex-start;align-items:flex-start;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;padding:0 %?30?%;background:#f8f6fc;height:%?120?%;border-radius:4px;margin-bottom:%?50?%}.input-item[data-v-50393cba]:last-child{margin-bottom:0}.input-item .tit[data-v-50393cba]{height:%?50?%;line-height:%?56?%;font-size:%?26?%;color:#606266}.input-item uni-input[data-v-50393cba]{height:%?60?%;font-size:%?30?%;color:#303133;width:100%}.input-item-sms-code[data-v-50393cba]{position:relative}.input-item-sms-code .sms-code-btn[data-v-50393cba]{position:absolute;color:#111;right:%?20?%;bottom:%?20?%;font-size:%?28?%}.input-item-sms-code .sms-code-resend[data-v-50393cba]{color:#999}.input-item-sms-code .sms-code-btn[data-v-50393cba]:after{border:none;background-color:initial}.confirm-btn[data-v-50393cba]{width:%?630?%;height:%?76?%;line-height:%?76?%;border-radius:50px;margin-top:%?70?%;background:#fa436a;color:#fff;font-size:%?32?%}.confirm-btn[data-v-50393cba]:after{border-radius:100px}.forget-section[data-v-50393cba]{font-size:%?26?%;color:#4399fc;text-align:center;margin-top:%?40?%}.register-section[data-v-50393cba]{margin:%?30?% 0 %?50?% 0;width:100%;font-size:%?26?%;color:#606266;text-align:center}.register-section uni-text[data-v-50393cba]{color:#4399fc;margin-left:%?10?%}.register-section uni-text[data-v-50393cba]:first-child{margin-right:%?10?%}body.?%PAGE?%[data-v-50393cba]{background:#fff}',""])},"67fb":function(e,t,n){"use strict";var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view",{staticClass:"container"},[n("v-uni-view",{staticClass:"back-btn yticon icon-zuojiantou-up",on:{click:function(t){t=e.$handleEvent(t),e.navBack(t)}}}),n("v-uni-view",{staticClass:"right-top-sign"}),n("v-uni-view",{staticClass:"wrapper"},[n("v-uni-view",{staticClass:"left-top-sign"},[e._v("LOGIN")]),n("v-uni-view",{staticClass:"welcome"},[e._v("欢迎回来！")]),n("v-uni-view",{staticClass:"input-content"},[n("v-uni-form",{on:{submit:function(t){t=e.$handleEvent(t),e.toLogin(t)}}},[n("v-uni-view",{staticClass:"input-item"},[n("v-uni-text",{staticClass:"tit"},[e._v("手机号码")]),n("v-uni-input",{attrs:{type:"number",name:"mobile",value:e.mobile,placeholder:"请输入手机号码",maxlength:"11"},on:{blur:function(t){t=e.$handleEvent(t),e.blurMobileChange(t)}}})],1),n("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:e.loginByPass,expression:"loginByPass"}],staticClass:"input-item"},[n("v-uni-text",{staticClass:"tit"},[e._v("密码")]),n("v-uni-input",{attrs:{name:"password",type:"password",value:e.password,placeholder:"请输入密码",maxlength:"20"}})],1),n("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:!e.loginByPass,expression:"!loginByPass"}],staticClass:"input-item input-item-sms-code"},[n("v-uni-text",{staticClass:"tit"},[e._v("验证码")]),n("v-uni-input",{attrs:{type:"number",name:"code",value:e.code,placeholder:"请输入验证码",maxlength:"6","data-key":"mobile"}}),n("v-uni-button",{staticClass:"sms-code-btn",attrs:{disabled:e.smsCodeBtnDisabled},on:{click:function(t){t=e.$handleEvent(t),e.getSmsCode()}}},[e.smsCodeBtnDisabled?n("span",{staticClass:"sms-code-resend"},[e._v(e._s("重新发送 ("+e.codeSeconds+")"))]):n("span",{staticClass:"btn"},[e._v("获取验证码")])])],1),n("v-uni-button",{staticClass:"confirm-btn",attrs:{formType:"submit",disabled:e.logining}},[e._v("登录")])],1)],1),n("v-uni-view",{staticClass:"forget-section",on:{click:function(t){t=e.$handleEvent(t),e.showLoginBySmsCode(t)}}},[e._v(e._s(e.loginByPass?"验证码登录":"密码登录"))]),n("v-uni-view",{staticClass:"forget-section",on:{click:function(t){t=e.$handleEvent(t),e.toForgetPass(t)}}},[e._v("忘记密码?")])],1),n("v-uni-view",{staticClass:"register-section"},[e._v("还没有账号?"),n("v-uni-text",{on:{click:function(t){t=e.$handleEvent(t),e.toRegister(t)}}},[e._v("马上注册")]),e._v("或者"),n("v-uni-text",{on:{click:function(t){t=e.$handleEvent(t),e.toHome(t)}}},[e._v("返回主页")])],1)],1)},o=[];n.d(t,"a",(function(){return i})),n.d(t,"b",(function(){return o}))},"8c58":function(e,t,n){var i=n("11c2");"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var o=n("4f06").default;o("0e2435de",i,!0,{sourceMap:!1,shadowMode:!1})},9564:function(e,t,n){"use strict";n("c5f6"),n("28a5"),n("3b2b"),e.exports={error:"",check:function(e,t){for(var n=0;n<t.length;n++){if(!t[n].checkType)return!0;if(!t[n].name)return!0;if(!t[n].errorMsg)return!0;if(!e[t[n].name])return this.error=t[n].errorMsg,!1;switch(t[n].checkType){case"string":var i=new RegExp("^.{"+t[n].checkRule+"}$");if(!i.test(e[t[n].name]))return this.error=t[n].errorMsg,!1;break;case"int":i=new RegExp("^(-[1-9]|[1-9])[0-9]{"+t[n].checkRule+"}$");if(!i.test(e[t[n].name]))return this.error=t[n].errorMsg,!1;break;case"between":if(!this.isNumber(e[t[n].name]))return this.error=t[n].errorMsg,!1;var o=t[n].checkRule.split(",");if(o[0]=Number(o[0]),o[1]=Number(o[1]),e[t[n].name]>o[1]||e[t[n].name]<o[0])return this.error=t[n].errorMsg,!1;break;case"betweenD":i=/^-?[1-9][0-9]?$/;if(!i.test(e[t[n].name]))return this.error=t[n].errorMsg,!1;o=t[n].checkRule.split(",");if(o[0]=Number(o[0]),o[1]=Number(o[1]),e[t[n].name]>o[1]||e[t[n].name]<o[0])return this.error=t[n].errorMsg,!1;break;case"betweenF":i=/^-?[0-9][0-9]?.+[0-9]+$/;if(!i.test(e[t[n].name]))return this.error=t[n].errorMsg,!1;o=t[n].checkRule.split(",");if(o[0]=Number(o[0]),o[1]=Number(o[1]),e[t[n].name]>o[1]||e[t[n].name]<o[0])return this.error=t[n].errorMsg,!1;break;case"same":if(e[t[n].name]!=t[n].checkRule)return this.error=t[n].errorMsg,!1;break;case"notsame":if(e[t[n].name]==t[n].checkRule)return this.error=t[n].errorMsg,!1;break;case"email":i=/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;if(!i.test(e[t[n].name]))return this.error=t[n].errorMsg,!1;break;case"phoneno":i=/^1[0-9]{10,10}$/;if(!i.test(e[t[n].name]))return this.error=t[n].errorMsg,!1;break;case"zipcode":i=/^[0-9]{6}$/;if(!i.test(e[t[n].name]))return this.error=t[n].errorMsg,!1;break;case"reg":i=new RegExp(t[n].checkRule);if(!i.test(e[t[n].name]))return this.error=t[n].errorMsg,!1;break;case"in":if(-1==t[n].checkRule.indexOf(e[t[n].name]))return this.error=t[n].errorMsg,!1;break;case"notnull":if(null==e[t[n].name]||e[t[n].name].length<1)return this.error=t[n].errorMsg,!1;break}}return!0},isNumber:function(e){var t=/^-?[1-9][0-9]?.?[0-9]*$/;return t.test(e)}}},9986:function(e,t,n){"use strict";var i=n("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,n("8e6e"),n("ac6a"),n("456d"),n("96cf");var o=i(n("3b8d")),r=i(n("bd86")),a=n("2f62"),s=n("7ded");function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(n,!0).forEach((function(t){(0,r.default)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var l=n("9564"),d={data:function(){return{mobile:"",password:"",code:"",logining:!1,loginByPass:!0,smsCodeBtnDisabled:!1,codeSeconds:60}},onLoad:function(){uni.clearStorageSync()},methods:u({},(0,a.mapMutations)(["login"]),{inputChange:function(e){var t=e.currentTarget.dataset.key;this[t]=e.detail.value},checkPhoneIsValid:function(e){var t=/^1[0-9]{10,10}$/;return!!t.test(e)||(uni.showToast({title:"请输入正确的手机号",icon:"none"}),!1)},getSmsCode:function(){var e=this;this.checkPhoneIsValid(this.mobile)&&(uni.showLoading({title:"获取中..."}),this.$post(s.smsCode,{mobile:this.mobile,usage:"login"}).then((function(t){if(200===t.code){uni.showToast({title:"验证码发送成功, 验证码是".concat(t.data),icon:"none"}),e.smsCodeBtnDisabled=!0;var n=59,i=setInterval((function(){0===n?(clearInterval(i),e.smsCodeBtnDisabled=!1):(e.codeSeconds=n,e.smsCodeBtnDisabled=!0,n--)}),1e3)}else uni.showToast({title:t.message,icon:"none"})})).catch((function(e){console.log(e)})))},blurMobileChange:function(e){this.mobile=e.detail.value},showLoginBySmsCode:function(){this.loginByPass=!this.loginByPass},navBack:function(){uni.navigateBack()},toRegister:function(){uni.navigateTo({url:"/pages/public/register"})},toForgetPass:function(){uni.navigateTo({url:"/pages/public/password"})},toHome:function(){uni.switchTab({url:"/pages/index/index"})},toLogin:function(){var e=(0,o.default)(regeneratorRuntime.mark((function e(t){var n,i,o,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(n=t.detail.value,i={},i.mobile=n.mobile,o=[{name:"mobile",checkType:"phoneno",checkRule:"11,11",errorMsg:"请输入正确的手机号"}],this.loginByPass?(i.password=n.password,o[1]={name:"password",checkType:"string",checkRule:"6,20",errorMsg:"密码长度为6-20位"}):(i.code=n.code,o[1]={name:"code",checkType:"notnull",checkRule:"",errorMsg:"请输入验证码"}),r=l.check(n,o),r){e.next=9;break}return uni.showToast({title:l.error,icon:"none"}),e.abrupt("return");case 9:uni.showLoading({title:"登录中..."}),i.group="tinyShopH5",this.loginByPass?this.handleLoginByPass(i):this.handleLoginBySmsCode(i);case 12:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),handleLoginByPass:function(e){var t=this;this.$post(s.loginByPass,u({group:"tinyShopH5"},e)).then((function(e){200===e.code?(t.login(e.data),uni.showToast({title:"恭喜您，登录成功！",icon:"none"}),uni.reLaunch({url:"/pages/user/user"})):uni.showToast({title:e.message,icon:"none"})})).catch((function(e){console.log(e)}))},handleLoginBySmsCode:function(e){var t=this;this.$post(s.loginBySmsCode,u({group:"tinyShopH5"},e)).then((function(e){200===e.code?(uni.showToast({title:"恭喜您，登录成功！",icon:"none"}),t.login(e.data),uni.switchTab({url:"/pages/user/user"})):uni.showToast({title:e.message,icon:"none"})})).catch((function(e){console.log(e)}))}})};t.default=d},a2ea:function(e,t,n){"use strict";var i=n("8c58"),o=n.n(i);o.a},dece:function(e,t,n){"use strict";n.r(t);var i=n("9986"),o=n.n(i);for(var r in i)"default"!==r&&function(e){n.d(t,e,(function(){return i[e]}))}(r);t["default"]=o.a},e334:function(e,t,n){"use strict";n.r(t);var i=n("67fb"),o=n("dece");for(var r in o)"default"!==r&&function(e){n.d(t,e,(function(){return o[e]}))}(r);n("a2ea");var a=n("2877"),s=Object(a["a"])(o["default"],i["a"],i["b"],!1,null,"50393cba",null);t["default"]=s.exports}}]);