(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-about-detail"],{"0135":function(t,e,i){"use strict";var n=i("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,i("96cf");var a=n(i("3b8d")),r=i("2b74"),o=i("8492"),c=n(i("d138")),s=n(i("b19a")),u={components:{empty:c.default,rfImage:s.default},data:function(){return{detail:{},title:null}},onLoad:function(t){this.initData(t)},methods:{initData:function(t){this.title=t.title,uni.setNavigationBarTitle({title:t.title}),this.getConfigList(t.field)},getConfigList:function(){var t=(0,a.default)(regeneratorRuntime.mark((function t(e){var i,n=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(-1===e.indexOf("protocol")){t.next=6;break}return uni.showLoading({title:"加载中..."}),t.next=4,this.$get("".concat(r.configList),{field:e}).then((function(t){n.detail=t.data})).catch((function(t){console.log(t)}));case 4:t.next=12;break;case 6:if(i=uni.getStorageSync("userInfo"),i){t.next=9;break}return t.abrupt("return");case 9:return uni.showLoading({title:"加载中..."}),t.next=12,this.$get("".concat(o.merchantView),{id:i.merchant_id,field:e}).then((function(t){n.detail=t.data})).catch((function(t){console.log(t)}));case 12:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}()}};e.default=u},"054e":function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,".rf-image[data-v-4e1b211b]{width:100%;height:100%}",""]),t.exports=e},"2b74":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.wechatConfig=e.configList=e.payCreate=e.advList=e.transmitCreate=e.collectDel=e.collectCreate=e.provinceList=void 0;var n="/tiny-shop/v1/common/provinces/index";e.provinceList=n;var a="/tiny-shop/v1/common/collect/create";e.collectCreate=a;var r="/tiny-shop/v1/common/collect/delete";e.collectDel=r;var o="/tiny-shop/v1/common/transmit/create";e.transmitCreate=o;var c="/tiny-shop/v1/common/adv/index";e.advList=c;var s="/tiny-shop/v1/common/config/index";e.configList=s;var u="/tiny-shop/v1/common/pay/create";e.payCreate=u;var l="/tiny-shop/v1/third-party/wechat-js-sdk";e.wechatConfig=l},"4a8f":function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,"uni-page-body[data-v-130e98fc]{position:relative;background-color:#f5f5f5}uni-page-body .about .shop-info[data-v-130e98fc]{margin:%?100?% 0;text-align:center}uni-page-body .about .shop-info uni-image[data-v-130e98fc]{width:%?240?%;height:%?240?%;border-radius:50%}body.?%PAGE?%[data-v-130e98fc]{background-color:#f5f5f5}",""]),t.exports=e},6269:function(t,e,i){"use strict";i.r(e);var n=i("0135"),a=i.n(n);for(var r in n)"default"!==r&&function(t){i.d(e,t,(function(){return n[t]}))}(r);e["default"]=a.a},7790:function(t,e,i){"use strict";var n=i("b3da"),a=i.n(n);a.a},8492:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.merchantIndex=e.merchantView=void 0;var n="/merchants/v1/merchant/view";e.merchantView=n;var a="/merchants/v1/merchant/index";e.merchantIndex=a},"8e97":function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"about"},["商城介绍"===t.title?i("v-uni-view",{staticClass:"shop-info"},[i("rf-image",{attrs:{src:t.detail.cover||t.detail.web_logo}}),t.detail.title?i("v-uni-view",[i("v-uni-text",[t._v("商城名称:")]),i("v-uni-text",[t._v(t._s(t.detail.title))])],1):t._e(),t.detail.address_name?i("v-uni-view",[i("v-uni-text",[t._v("联系地址:")]),i("v-uni-text",[t._v(t._s(t.detail.address_name))])],1):t._e(),t.detail.address_details?i("v-uni-view",[i("v-uni-text",[t._v("详细地址:")]),i("v-uni-text",[t._v(t._s(t.detail.address_details))])],1):t._e(),t.detail.mobile?i("v-uni-view",[i("v-uni-text",[t._v("手机号码:")]),i("v-uni-text",[t._v(t._s(t.detail.mobile))])],1):t._e(),t.detail.qq?i("v-uni-view",[i("v-uni-text",[t._v("QQ:")]),i("v-uni-text",[t._v(t._s(t.detail.qq))])],1):t._e()],1):t._e(),"注册协议"===t.title?i("v-uni-view",{staticClass:"shop-info"},[t.detail.protocol_register?i("v-uni-view",[i("v-uni-text",{domProps:{innerHTML:t._s(t.detail.protocol_register)}})],1):t._e(),t.detail.protocol_register?t._e():i("empty",{attrs:{info:"暂无"+t.title}})],1):t._e(),"隐私协议"===t.title?i("v-uni-view",{staticClass:"shop-info"},[t.detail.protocol_privacy?i("v-uni-view",[i("v-uni-text",{domProps:{innerHTML:t._s(t.detail.protocol_privacy)}})],1):t._e(),t.detail.protocol_privacy?t._e():i("empty",{attrs:{info:"暂无"+t.title}})],1):t._e(),"充值协议"===t.title?i("v-uni-view",{staticClass:"shop-info"},[t.detail.protocol_recharge?i("v-uni-view",[i("v-uni-text",{domProps:{innerHTML:t._s(t.detail.protocol_recharge)}})],1):t._e(),t.detail.protocol_recharge?t._e():i("empty",{attrs:{info:"暂无"+t.title}})],1):t._e(),0===t.detail.length?i("empty",{attrs:{info:"暂无"+t.title}}):t._e()],1)},a=[];i.d(e,"a",(function(){return n})),i.d(e,"b",(function(){return a}))},"95cc":function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-image",{staticClass:"rf-image",attrs:{mode:"mode",src:t.src||"/static/errorImage.jpg"},on:{error:function(e){e=t.$handleEvent(e),t.onImageError(e)},click:function(e){e.stopPropagation(),e=t.$handleEvent(e),t.previewImage(t.src)}}})},a=[];i.d(e,"a",(function(){return n})),i.d(e,"b",(function(){return a}))},af80:function(t,e,i){"use strict";i.r(e);var n=i("8e97"),a=i("6269");for(var r in a)"default"!==r&&function(t){i.d(e,t,(function(){return a[t]}))}(r);i("cd2b");var o=i("2877"),c=Object(o["a"])(a["default"],n["a"],n["b"],!1,null,"130e98fc",null);e["default"]=c.exports},b19a:function(t,e,i){"use strict";i.r(e);var n=i("95cc"),a=i("ee7e");for(var r in a)"default"!==r&&function(t){i.d(e,t,(function(){return a[t]}))}(r);i("7790");var o=i("2877"),c=Object(o["a"])(a["default"],n["a"],n["b"],!1,null,"4e1b211b",null);e["default"]=c.exports},b3da:function(t,e,i){var n=i("054e");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("83d84bc2",n,!0,{sourceMap:!1,shadowMode:!1})},be23:function(t,e,i){var n=i("4a8f");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("c5f5fe96",n,!0,{sourceMap:!1,shadowMode:!1})},cd2b:function(t,e,i){"use strict";var n=i("be23"),a=i.n(n);a.a},ee7e:function(t,e,i){"use strict";i.r(e);var n=i("f5c7"),a=i.n(n);for(var r in n)"default"!==r&&function(t){i.d(e,t,(function(){return n[t]}))}(r);e["default"]=a.a},f5c7:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={name:"rfImage",props:{src:{type:String,default:"/static/errorImage.jpg"},mode:{type:String,default:"aspectFill"},isPreviewImage:{type:Boolean,default:!0}},methods:{onImageError:function(){this.src="/static/errorImage.jpg"},previewImage:function(t){this.isPreviewImage&&this.urls&&uni.previewImage({urls:t})}}};e.default=n}}]);