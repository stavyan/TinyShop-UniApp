(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-userinfo-userinfo"],{"51c4":function(e,t,r){var i=r("7e40");"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var n=r("4f06").default;n("b878361a",i,!0,{sourceMap:!1,shadowMode:!1})},"6e05":function(e,t,r){"use strict";var i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-uni-view",[r("v-uni-view",{staticClass:"user-section"},[r("v-uni-image",{staticClass:"bg",attrs:{src:"/static/user-bg.jpg"}}),r("v-uni-text",{staticClass:"bg-upload-btn yticon icon-paizhao"}),r("v-uni-view",{staticClass:"portrait-box"},[r("v-uni-image",{staticClass:"portrait",attrs:{src:e.profileInfo.head_portrait||"/static/missing-face.png"}})],1)],1),r("v-uni-view",{staticClass:"input-content"},[r("v-uni-form",{on:{submit:function(t){t=e.$handleEvent(t),e.toUpdateInfo(t)}}},[r("v-uni-view",{staticClass:"input-item"},[r("v-uni-text",{staticClass:"tit"},[e._v("手机号码")]),r("v-uni-input",{attrs:{type:"number",name:"mobile",value:e.profileInfo.mobile,disabled:"",placeholder:"请输入手机号码"}})],1),r("v-uni-view",{staticClass:"input-item"},[r("v-uni-text",{staticClass:"tit"},[e._v("用户昵称")]),r("v-uni-input",{attrs:{type:"text",value:e.profileInfo.nickname,name:"nickname",placeholder:"请输入您的昵称"}})],1),r("v-uni-view",{staticClass:"input-item"},[r("v-uni-text",{staticClass:"tit"},[e._v("真实姓名")]),r("v-uni-input",{attrs:{type:"text",value:e.profileInfo.realname,name:"realname",placeholder:"请输入您的姓名"}})],1),r("v-uni-view",{staticClass:"input-item"},[r("v-uni-text",{staticClass:"tit"},[e._v("性别")]),r("v-uni-view",{staticClass:"uni-list"},[r("v-uni-radio-group",{staticClass:"gender",attrs:{name:"gender"}},e._l(e.genders,(function(t,i){return r("v-uni-label",{key:i,staticClass:"gender-item"},[r("v-uni-radio",{staticClass:"gender-item-radio",attrs:{value:t.value,checked:t.value===e.profileInfo.gender}}),r("v-uni-text",{staticClass:"gender-item-text"},[e._v(e._s(t.name))])],1)})),1)],1)],1),r("v-uni-view",{staticClass:"input-item"},[r("v-uni-text",{staticClass:"tit"},[e._v("生日")]),r("v-uni-picker",{attrs:{mode:"date",value:e.date},on:{change:function(t){t=e.$handleEvent(t),e.bindDateChange(t)}}},[r("v-uni-view",{staticClass:"uni-input"},[e._v(e._s(e.date))])],1)],1),r("v-uni-view",{staticClass:"input-item"},[r("v-uni-text",{staticClass:"tit"},[e._v("QQ")]),r("v-uni-input",{attrs:{type:"number",value:e.profileInfo.qq,name:"qq",placeholder:"请输入您的QQ"}})],1),r("v-uni-view",{staticClass:"input-item"},[r("v-uni-text",{staticClass:"tit"},[e._v("邮箱")]),r("v-uni-input",{attrs:{type:"number",value:e.profileInfo.email,name:"email",placeholder:"请输入您的邮箱"}})],1),r("v-uni-button",{staticClass:"confirm-btn",attrs:{formType:"submit"}},[e._v("修改资料")])],1)],1)],1)},n=[];r.d(t,"a",(function(){return i})),r.d(t,"b",(function(){return n}))},"7e40":function(e,t,r){t=e.exports=r("24fb")(!1),t.push([e.i,".user-section[data-v-0f0c7b41]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;height:%?460?%;padding:%?40?% %?30?% 0;position:relative}.user-section .bg[data-v-0f0c7b41]{position:absolute;left:0;top:0;width:100%;height:100%;-webkit-filter:blur(1px);filter:blur(1px);opacity:.7}.user-section .portrait-box[data-v-0f0c7b41]{width:%?200?%;height:%?200?%;border:%?6?% solid #fff;border-radius:50%;position:relative;z-index:2}.user-section .portrait[data-v-0f0c7b41]{position:relative;width:100%;height:100%;border-radius:50%}.user-section .yticon[data-v-0f0c7b41]{position:absolute;line-height:1;z-index:5;font-size:%?48?%;color:#fff;padding:%?4?% %?6?%;border-radius:%?6?%;background:rgba(0,0,0,.4)}.user-section .pt-upload-btn[data-v-0f0c7b41]{right:0;bottom:%?10?%}.user-section .bg-upload-btn[data-v-0f0c7b41]{right:%?20?%;bottom:%?16?%}.input-content[data-v-0f0c7b41]{padding:%?40?% %?60?%}.input-content .input-item[data-v-0f0c7b41]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:start;-webkit-align-items:flex-start;align-items:flex-start;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;padding:0 %?30?%;background:#f8f6fc;height:%?120?%;border-radius:4px;margin-bottom:%?50?%}.input-content .input-item .uni-input[data-v-0f0c7b41]{font-size:%?32?%;color:#303133}.input-content .input-item[data-v-0f0c7b41]:last-child{margin-bottom:0}.input-content .input-item .tit[data-v-0f0c7b41]{height:%?50?%;line-height:%?56?%;font-size:%?26?%;color:#606266}.input-content .input-item uni-input[data-v-0f0c7b41]{height:%?60?%;font-size:%?30?%;color:#303133;width:100%}.input-content .input-item .gender[data-v-0f0c7b41]{margin:%?10?% 0;color:#303133;font-size:%?28?%}.input-content .input-item .gender .gender-item[data-v-0f0c7b41]{margin-right:%?20?%}.input-content .input-item .gender .gender-item .gender-item-text[data-v-0f0c7b41]{padding:0 %?10?%}.input-content .input-item .gender .gender-item uni-radio .wx-radio-input.wx-radio-input-checked[data-v-0f0c7b41]{background:#fa436a;border-color:#fa436a}.input-content .confirm-btn[data-v-0f0c7b41]{width:%?630?%;height:%?76?%;line-height:%?76?%;border-radius:50px;margin-top:%?70?%;background:#fa436a;color:#fff;font-size:%?32?%}.input-content .confirm-btn[data-v-0f0c7b41]:after{border-radius:100px}",""])},"802d":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.uploadImage=t.invoiceDel=t.invoiceDefault=t.invoiceDetail=t.invoiceUpdate=t.invoiceCreate=t.invoiceList=t.evaluateUpdate=t.evaluateCreate=t.creditsLogList=t.collectList=t.footPrintDel=t.footPrintList=t.couponReceive=t.orderTakeDelivery=t.orderDelete=t.orderDetail=t.closeOrderRefundApply=t.orderRefundApply=t.orderList=t.couponClear=t.myCouponList=t.couponList=t.addressDelete=t.addressUpdate=t.addressDetail=t.addressDefault=t.addressCreate=t.addressList=t.memberUpdate=t.memberInfo=void 0;var i="/tiny-shop/v1/member/member/index";t.memberInfo=i;var n="/tiny-shop/v1/member/member/update";t.memberUpdate=n;var a="/tiny-shop/v1/member/address/index";t.addressList=a;var o="/tiny-shop/v1/member/address/default";t.addressDefault=o;var s="/tiny-shop/v1/member/address/view";t.addressDetail=s;var c="/tiny-shop/v1/member/address/create";t.addressCreate=c;var u="/tiny-shop/v1/member/address/update";t.addressUpdate=u;var d="/tiny-shop/v1/member/address/delete";t.addressDelete=d;var l="/tiny-shop/v1/marketing/coupon-type/index";t.couponList=l;var p="/tiny-shop/v1/member/coupon/index";t.myCouponList=p;var v="/tiny-shop/v1/marketing/coupon-type/create";t.couponReceive=v;var f="/tiny-shop/v1/member/coupon/clear";t.couponClear=f;var m="/tiny-shop/v1/member/order/index";t.orderList=m;var b="/tiny-shop/v1/member/order/take-delivery";t.orderTakeDelivery=b;var h="/tiny-shop/v1/member/order-product/refund-apply";t.orderRefundApply=h;var g="/tiny-shop/v1/member/order-product/refund-close";t.closeOrderRefundApply=g;var y="/tiny-shop/v1/member/order/view";t.orderDetail=y;var w="/tiny-shop/v1/member/order/delete";t.orderDelete=w;var k="/tiny-shop/v1/member/footprint/index";t.footPrintList=k;var x="/tiny-shop/v1/member/footprint/delete";t.footPrintDel=x;var C="/tiny-shop/v1/member/collect/index";t.collectList=C;var D="/tiny-shop/v1/member/credits-log/index";t.creditsLogList=D;var M="/tiny-shop/v1/member/evaluate/create";t.evaluateCreate=M;var R="/tiny-shop/v1/member/evaluate/update";t.evaluateUpdate=R;var I="/tiny-shop/v1/member/invoice/index";t.invoiceList=I;var L="/tiny-shop/v1/member/invoice/create";t.invoiceCreate=L;var O="/tiny-shop/v1/member/invoice/update";t.invoiceUpdate=O;var _="/tiny-shop/v1/member/invoice/view";t.invoiceDetail=_;var j="/tiny-shop/v1/member/invoice/default";t.invoiceDefault=j;var P="/tiny-shop/v1/member/invoice/delete";t.invoiceDel=P;var U="https://www.yllook.com/api/v1/file/images";t.uploadImage=U},9564:function(e,t,r){"use strict";r("c5f6"),r("28a5"),r("3b2b"),e.exports={error:"",check:function(e,t){for(var r=0;r<t.length;r++){if(!t[r].checkType)return!0;if(!t[r].name)return!0;if(!t[r].errorMsg)return!0;if(!e[t[r].name])return this.error=t[r].errorMsg,!1;switch(t[r].checkType){case"string":var i=new RegExp("^.{"+t[r].checkRule+"}$");if(!i.test(e[t[r].name]))return this.error=t[r].errorMsg,!1;break;case"int":i=new RegExp("^(-[1-9]|[1-9])[0-9]{"+t[r].checkRule+"}$");if(!i.test(e[t[r].name]))return this.error=t[r].errorMsg,!1;break;case"between":if(!this.isNumber(e[t[r].name]))return this.error=t[r].errorMsg,!1;var n=t[r].checkRule.split(",");if(n[0]=Number(n[0]),n[1]=Number(n[1]),e[t[r].name]>n[1]||e[t[r].name]<n[0])return this.error=t[r].errorMsg,!1;break;case"betweenD":i=/^-?[1-9][0-9]?$/;if(!i.test(e[t[r].name]))return this.error=t[r].errorMsg,!1;n=t[r].checkRule.split(",");if(n[0]=Number(n[0]),n[1]=Number(n[1]),e[t[r].name]>n[1]||e[t[r].name]<n[0])return this.error=t[r].errorMsg,!1;break;case"betweenF":i=/^-?[0-9][0-9]?.+[0-9]+$/;if(!i.test(e[t[r].name]))return this.error=t[r].errorMsg,!1;n=t[r].checkRule.split(",");if(n[0]=Number(n[0]),n[1]=Number(n[1]),e[t[r].name]>n[1]||e[t[r].name]<n[0])return this.error=t[r].errorMsg,!1;break;case"same":if(e[t[r].name]!=t[r].checkRule)return this.error=t[r].errorMsg,!1;break;case"notsame":if(e[t[r].name]==t[r].checkRule)return this.error=t[r].errorMsg,!1;break;case"email":i=/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;if(!i.test(e[t[r].name]))return this.error=t[r].errorMsg,!1;break;case"phoneno":i=/^1[0-9]{10,10}$/;if(!i.test(e[t[r].name]))return this.error=t[r].errorMsg,!1;break;case"zipcode":i=/^[0-9]{6}$/;if(!i.test(e[t[r].name]))return this.error=t[r].errorMsg,!1;break;case"reg":i=new RegExp(t[r].checkRule);if(!i.test(e[t[r].name]))return this.error=t[r].errorMsg,!1;break;case"in":if(-1==t[r].checkRule.indexOf(e[t[r].name]))return this.error=t[r].errorMsg,!1;break;case"notnull":if(null==e[t[r].name]||e[t[r].name].length<1)return this.error=t[r].errorMsg,!1;break}}return!0},isNumber:function(e){var t=/^-?[1-9][0-9]?.?[0-9]*$/;return t.test(e)}}},"9f2c":function(e,t,r){"use strict";var i=r("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,r("8e6e"),r("ac6a"),r("456d");var n=i(r("bd86"));r("96cf");var a=i(r("3b8d")),o=r("802d");function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,i)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(r,!0).forEach((function(t){(0,n.default)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var u=r("9564"),d={data:function(){var e=this.getDate({format:!0});return{profileInfo:{},genders:[{value:"0",name:"未知"},{value:"1",name:"男"},{value:"2",name:"女"}],date:e,token:null}},computed:{},onLoad:function(){this.initData()},methods:{bindDateChange:function(e){this.date=e.target.value},getDate:function(e){var t=new Date,r=t.getFullYear(),i=t.getMonth()+1,n=t.getDate();return"start"===e?r-=60:"end"===e&&(r+=2),i=i>9?i:"0"+i,n=n>9?n:"0"+n,"".concat(r,"-").concat(i,"-").concat(n)},initData:function(){this.token=uni.getStorageSync("accessToken")||void 0,this.token?this.getMemberInfo():uni.reLaunch({url:"/pages/public/login"})},getMemberInfo:function(){var e=(0,a.default)(regeneratorRuntime.mark((function e(){var t=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.$get(o.memberInfo).then((function(e){200===e.code?(t.profileInfo=e.data,t.date=t.profileInfo.birthday):uni.showToast({title:e.message,icon:"none"})}));case 2:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),toUpdateInfo:function(){var e=(0,a.default)(regeneratorRuntime.mark((function e(t){var r,i,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(r=t.detail.value,i=[{name:"mobile",checkType:"phoneno",checkRule:"11,11",errorMsg:"请输入正确的手机号"}],n=u.check(r,i),n){e.next=6;break}return uni.showToast({title:u.error,icon:"none"}),e.abrupt("return");case 6:this.handleUpdateInfo(r);case 7:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),handleUpdateInfo:function(){var e=(0,a.default)(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return uni.showLoading({title:"资料修改中..."}),e.next=3,this.$put("".concat(o.memberUpdate,"?id=").concat(this.profileInfo.id),c({},t,{birthday:this.date})).then((function(e){200===e.code?uni.showToast({title:"恭喜您, 资料修改成功！",icon:"none"}):uni.showToast({title:e.message,icon:"none"})})).catch((function(e){console.log(e)}));case 3:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()}};t.default=d},b3af:function(e,t,r){"use strict";r.r(t);var i=r("9f2c"),n=r.n(i);for(var a in i)"default"!==a&&function(e){r.d(t,e,(function(){return i[e]}))}(a);t["default"]=n.a},d0c6:function(e,t,r){"use strict";var i=r("51c4"),n=r.n(i);n.a},d9a9:function(e,t,r){"use strict";r.r(t);var i=r("6e05"),n=r("b3af");for(var a in n)"default"!==a&&function(e){r.d(t,e,(function(){return n[e]}))}(a);r("d0c6");var o=r("2877"),s=Object(o["a"])(n["default"],i["a"],i["b"],!1,null,"0f0c7b41",null);t["default"]=s.exports}}]);