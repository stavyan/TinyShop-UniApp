(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-public-password"],{"1b44":function(e,t,n){"use strict";n.r(t);var r=n("1c7a"),i=n.n(r);for(var o in r)"default"!==o&&function(e){n.d(t,e,(function(){return r[e]}))}(o);t["default"]=i.a},"1c7a":function(e,t,n){"use strict";var r=n("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,n("8e6e"),n("ac6a"),n("456d"),n("96cf");var i=r(n("3b8d")),o=r(n("bd86")),a=n("2f62"),s=n("7ded");function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){(0,o.default)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var d=n("9564"),l={data:function(){return{mobile:"",password:"",code:"",type:null,logining:!1,loginByPass:!0,smsCodeBtnDisabled:!1,codeSeconds:60}},onLoad:function(e){this.type=e.type},methods:u({},(0,a.mapMutations)(["login"]),{inputChange:function(e){var t=e.currentTarget.dataset.key;this[t]=e.detail.value},checkPhoneIsValid:function(e){var t=/^1[0-9]{10,10}$/;return!!t.test(e)||(uni.showToast({title:"请输入正确的手机号",icon:"none"}),!1)},blurRePasswordChange:function(e){this.password!==e.detail.value&&uni.showToast({title:"两次输入的密码不一致",icon:"none"})},getSmsCode:function(){var e=this;this.checkPhoneIsValid(this.mobile)&&(uni.showLoading({title:"获取中..."}),this.$post(s.smsCode,{mobile:this.mobile,usage:"up-pwd"}).then((function(t){if(200===t.code){uni.showToast({title:"验证码发送成功, 验证码是".concat(t.data),icon:"none"}),e.smsCodeBtnDisabled=!0;var n=59,r=setInterval((function(){0===n?(clearInterval(r),e.smsCodeBtnDisabled=!1):(e.codeSeconds=n,e.smsCodeBtnDisabled=!0,n--)}),1e3)}else uni.showToast({title:t.message,icon:"none"})})).catch((function(e){console.log(e)})))},blurMobileChange:function(e){this.mobile=e.detail.value},showLoginBySmsCode:function(){this.loginByPass=!this.loginByPass},navBack:function(){uni.navigateBack()},toLogin:function(){uni.navigateTo({url:"/pages/public/login"})},toForgetPass:function(){uni.navigateTo({url:"/pages/public/password"})},toHome:function(){uni.switchTab({url:"/pages/index/index"})},blurPasswordChange:function(e){this.password=e.detail.value},toUpdatePassword:function(){var e=(0,i.default)(regeneratorRuntime.mark((function e(t){var n,r,i,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(n=t.detail.value,n.password===n.password_repetition){e.next=4;break}return uni.showToast({title:"两次输入的密码不一致",icon:"none"}),e.abrupt("return");case 4:if(r=[{name:"mobile",checkType:"phoneno",checkRule:"11,11",errorMsg:"请输入正确的手机号"},{name:"code",checkType:"notnull",checkRule:"",errorMsg:"请输入验证码"},{name:"password",checkType:"string",checkRule:"6,20",errorMsg:"密码长度为6-20位"},{name:"password_repetition",checkType:"notnull",checkRule:"",errorMsg:"请输入确认密码"}],i=d.check(n,r),i){e.next=9;break}return uni.showToast({title:d.error,icon:"none"}),e.abrupt("return");case 9:uni.showLoading({title:"请稍等..."}),o={},o.group="tinyShopH5",this.$post(s.updatePassword,u({},o,{},n)).then((function(e){200===e.code?(uni.showToast({title:"密码重置成功！",icon:"none"}),uni.navigateTo({url:"/pages/public/login"})):uni.showToast({title:e.message,icon:"none"})})).catch((function(e){console.log(e)}));case 13:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()})};t.default=l},3203:function(e,t,n){var r=n("24fb");t=r(!1),t.push([e.i,'.container[data-v-0bd6d9e8]{padding-top:60px;position:relative;width:100vw;overflow:hidden;background:#fff}.container .wrapper[data-v-0bd6d9e8]{position:relative;width:100vw;z-index:90;background:#fff;padding-bottom:%?40?%}.container .wrapper .welcome[data-v-0bd6d9e8]{position:relative;left:%?50?%;top:%?-90?%;font-size:%?46?%;color:#555;text-shadow:1px 0 1px rgba(0,0,0,.3)}.container .wrapper .input-content[data-v-0bd6d9e8]{padding:0 %?60?%}.container .wrapper .input-item[data-v-0bd6d9e8]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:start;-webkit-align-items:flex-start;align-items:flex-start;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;padding:0 %?30?%;background:#f8f6fc;height:%?120?%;border-radius:4px;margin-bottom:%?50?%}.container .wrapper .input-item[data-v-0bd6d9e8]:last-child{margin-bottom:0}.container .wrapper .input-item .tit[data-v-0bd6d9e8]{height:%?50?%;line-height:%?56?%;font-size:%?26?%;color:#606266}.container .wrapper .input-item uni-input[data-v-0bd6d9e8]{height:%?60?%;font-size:%?30?%;color:#303133;width:100%}.container .wrapper .input-item-sms-code[data-v-0bd6d9e8]{position:relative}.container .wrapper .input-item-sms-code .sms-code-btn[data-v-0bd6d9e8]{position:absolute;right:%?20?%;color:#111;bottom:%?20?%;font-size:%?28?%}.container .wrapper .input-item-sms-code .sms-code-resend[data-v-0bd6d9e8]{color:#999}.container .wrapper .confirm-btn[data-v-0bd6d9e8]{width:%?630?%;height:%?76?%;line-height:%?76?%;border-radius:50px;margin-top:%?70?%;background:#fa436a;color:#fff;font-size:%?32?%}.container .wrapper .confirm-btn[data-v-0bd6d9e8]:after{border-radius:100px}.container .wrapper .forget-section[data-v-0bd6d9e8]{font-size:%?26?%;color:#4399fc;text-align:center;margin-top:%?40?%}.container .back-btn[data-v-0bd6d9e8]{position:absolute;left:%?40?%;z-index:9999;padding-top:0;top:%?40?%;font-size:%?40?%;color:#303133}.container .left-top-sign[data-v-0bd6d9e8]{font-size:%?120?%;color:#f8f8f8;position:relative;left:%?-16?%}.container .right-top-sign[data-v-0bd6d9e8]{position:absolute;top:%?80?%;right:%?-30?%;z-index:95}.container .right-top-sign[data-v-0bd6d9e8]:after,.container .right-top-sign[data-v-0bd6d9e8]:before{display:block;content:"";width:%?400?%;height:%?80?%;background:#b4f3e2}.container .right-top-sign[data-v-0bd6d9e8]:before{-webkit-transform:rotate(50deg);transform:rotate(50deg);border-radius:0 50px 0 0}.container .right-top-sign[data-v-0bd6d9e8]:after{position:absolute;right:%?-198?%;top:0;-webkit-transform:rotate(-50deg);transform:rotate(-50deg);border-radius:50px 0 0 0}.container .register-section[data-v-0bd6d9e8]{margin:%?50?% 0 %?50?% 0;width:100%;font-size:%?26?%;color:#606266;text-align:center}.container .register-section uni-text[data-v-0bd6d9e8]{color:#4399fc;margin-left:%?10?%;margin-right:%?10?%}',""]),e.exports=t},"7d24":function(e,t,n){"use strict";var r=n("f13d"),i=n.n(r);i.a},"8ff4":function(e,t,n){"use strict";n.r(t);var r=n("f26f"),i=n("1b44");for(var o in i)"default"!==o&&function(e){n.d(t,e,(function(){return i[e]}))}(o);n("7d24");var a=n("2877"),s=Object(a["a"])(i["default"],r["a"],r["b"],!1,null,"0bd6d9e8",null);t["default"]=s.exports},9564:function(e,t,n){"use strict";n("c5f6"),n("28a5"),n("3b2b"),e.exports={error:"",check:function(e,t){for(var n=0;n<t.length;n++){if(!t[n].checkType)return!0;if(!t[n].name)return!0;if(!t[n].errorMsg)return!0;if(!e[t[n].name])return this.error=t[n].errorMsg,!1;switch(t[n].checkType){case"string":var r=new RegExp("^.{"+t[n].checkRule+"}$");if(!r.test(e[t[n].name]))return this.error=t[n].errorMsg,!1;break;case"int":r=new RegExp("^(-[1-9]|[1-9])[0-9]{"+t[n].checkRule+"}$");if(!r.test(e[t[n].name]))return this.error=t[n].errorMsg,!1;break;case"between":if(!this.isNumber(e[t[n].name]))return this.error=t[n].errorMsg,!1;var i=t[n].checkRule.split(",");if(i[0]=Number(i[0]),i[1]=Number(i[1]),e[t[n].name]>i[1]||e[t[n].name]<i[0])return this.error=t[n].errorMsg,!1;break;case"betweenD":r=/^-?[1-9][0-9]?$/;if(!r.test(e[t[n].name]))return this.error=t[n].errorMsg,!1;i=t[n].checkRule.split(",");if(i[0]=Number(i[0]),i[1]=Number(i[1]),e[t[n].name]>i[1]||e[t[n].name]<i[0])return this.error=t[n].errorMsg,!1;break;case"betweenF":r=/^-?[0-9][0-9]?.+[0-9]+$/;if(!r.test(e[t[n].name]))return this.error=t[n].errorMsg,!1;i=t[n].checkRule.split(",");if(i[0]=Number(i[0]),i[1]=Number(i[1]),e[t[n].name]>i[1]||e[t[n].name]<i[0])return this.error=t[n].errorMsg,!1;break;case"same":if(e[t[n].name]!=t[n].checkRule)return this.error=t[n].errorMsg,!1;break;case"notsame":if(e[t[n].name]==t[n].checkRule)return this.error=t[n].errorMsg,!1;break;case"email":r=/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;if(!r.test(e[t[n].name]))return this.error=t[n].errorMsg,!1;break;case"phoneno":r=/^1[0-9]{10,10}$/;if(!r.test(e[t[n].name]))return this.error=t[n].errorMsg,!1;break;case"zipcode":r=/^[0-9]{6}$/;if(!r.test(e[t[n].name]))return this.error=t[n].errorMsg,!1;break;case"reg":r=new RegExp(t[n].checkRule);if(!r.test(e[t[n].name]))return this.error=t[n].errorMsg,!1;break;case"in":if(-1==t[n].checkRule.indexOf(e[t[n].name]))return this.error=t[n].errorMsg,!1;break;case"notnull":if(null==e[t[n].name]||e[t[n].name].length<1)return this.error=t[n].errorMsg,!1;break}}return!0},isNumber:function(e){var t=/^-?[1-9][0-9]?.?[0-9]*$/;return t.test(e)}}},f13d:function(e,t,n){var r=n("3203");"string"===typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);var i=n("4f06").default;i("3d9afdc4",r,!0,{sourceMap:!1,shadowMode:!1})},f26f:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view",{staticClass:"container"},[n("v-uni-view",{staticClass:"back-btn yticon icon-zuojiantou-up",on:{click:function(t){t=e.$handleEvent(t),e.navBack(t)}}}),n("v-uni-view",{staticClass:"right-top-sign"}),n("v-uni-view",{staticClass:"wrapper"},[n("v-uni-view",{staticClass:"left-top-sign"},[e._v(e._s(1==e.type?"UPDATE":"GET BACK"))]),n("v-uni-view",{staticClass:"welcome"},[e._v(e._s(1==e.type?"修改密码":"找回密码")+"！")]),n("v-uni-view",{staticClass:"input-content"},[n("v-uni-form",{on:{submit:function(t){t=e.$handleEvent(t),e.toUpdatePassword(t)}}},[n("v-uni-view",{staticClass:"input-item"},[n("v-uni-text",{staticClass:"tit"},[e._v("手机号码")]),n("v-uni-input",{attrs:{type:"number",name:"mobile",value:e.mobile,placeholder:"请输入手机号码",maxlength:"11"},on:{blur:function(t){t=e.$handleEvent(t),e.blurMobileChange(t)}}})],1),n("v-uni-view",{staticClass:"input-item input-item-sms-code"},[n("v-uni-text",{staticClass:"tit"},[e._v("验证码")]),n("v-uni-input",{attrs:{type:"number",name:"code",placeholder:"请输入验证码",maxlength:"6","data-key":"mobile"}}),n("v-uni-button",{staticClass:"sms-code-btn",attrs:{disabled:e.smsCodeBtnDisabled},on:{click:function(t){t=e.$handleEvent(t),e.getSmsCode(t)}}},[e.smsCodeBtnDisabled?n("span",{staticClass:"sms-code-resend"},[e._v(e._s("重新发送 ("+e.codeSeconds+")"))]):n("span",[e._v("获取验证码")])])],1),n("v-uni-view",{staticClass:"input-item"},[n("v-uni-text",{staticClass:"tit"},[e._v("密码")]),n("v-uni-input",{attrs:{name:"password",type:"password",value:e.password,placeholder:"请输入密码",maxlength:"20"},on:{blur:function(t){t=e.$handleEvent(t),e.blurPasswordChange(t)}}})],1),n("v-uni-view",{staticClass:"input-item"},[n("v-uni-text",{staticClass:"tit"},[e._v("确认密码")]),n("v-uni-input",{attrs:{type:"password",name:"password_repetition",placeholder:"请输入确认密码",maxlength:"20"},on:{blur:function(t){t=e.$handleEvent(t),e.blurRePasswordChange(t)}}})],1),n("v-uni-button",{staticClass:"confirm-btn",attrs:{formType:"submit"}},[e._v(e._s(1==e.type?"修改密码":"找回密码"))])],1)],1)],1),1!=e.type?n("v-uni-view",{staticClass:"register-section"},[e._v("又想起密码了?"),n("v-uni-text",{on:{click:function(t){t=e.$handleEvent(t),e.toLogin(t)}}},[e._v("马上登录")]),e._v("或者"),n("v-uni-text",{on:{click:function(t){t=e.$handleEvent(t),e.toHome(t)}}},[e._v("返回主页")])],1):n("v-uni-view",{staticClass:"register-section"},[e._v("不想修改了密码？"),n("v-uni-text",{on:{click:function(t){t=e.$handleEvent(t),e.toHome(t)}}},[e._v("返回主页")])],1)],1)},i=[];n.d(t,"a",(function(){return r})),n.d(t,"b",(function(){return i}))}}]);