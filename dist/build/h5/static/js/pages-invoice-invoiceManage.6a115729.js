(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-invoice-invoiceManage"],{"2b74":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.merchantIndex=t.wechatConfig=t.configList=t.payCreate=t.advList=t.uploadFile=t.transmitCreate=t.collectDel=t.collectCreate=t.provinceList=void 0;var a="/tiny-shop/v1/common/provinces/index";t.provinceList=a;var n="/tiny-shop/v1/common/collect/create";t.collectCreate=n;var r="/tiny-shop/v1/common/collect/delete";t.collectDel=r;var o="/tiny-shop/v1/common/transmit/create";t.transmitCreate=o;var s="/v1/file/images";t.uploadFile=s;var c="/tiny-shop/v1/common/adv/index";t.advList=c;var l="/tiny-shop/v1/common/config/index";t.configList=l;var d="/tiny-shop/v1/common/pay/create";t.payCreate=d;var v="/tiny-shop/v1/third-party/wechat-js-sdk";t.wechatConfig=v;var u="/merchants/v1/merchant/index";t.merchantIndex=u},"3e12":function(e,t,i){"use strict";var a=i("74d9"),n=i.n(a);n.a},"74d9":function(e,t,i){var a=i("ff8e");"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var n=i("4f06").default;n("6e2279e6",a,!0,{sourceMap:!1,shadowMode:!1})},"802d":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.thirdPartyAuthDelete=t.thirdPartyAuthList=t.opinionDetail=t.opinionCreate=t.opinionList=t.uploadBase64Image=t.uploadImage=t.orderInvoiceList=t.invoiceDel=t.invoiceDefault=t.invoiceDetail=t.invoiceUpdate=t.invoiceCreate=t.invoiceList=t.evaluateAgain=t.evaluateCreate=t.creditsLogList=t.collectList=t.footPrintDel=t.footPrintList=t.couponReceive=t.orderTakeDelivery=t.orderDelete=t.orderDetail=t.closeOrderRefundApply=t.orderRefundApply=t.orderList=t.couponDetail=t.couponClear=t.myCouponList=t.couponList=t.addressDelete=t.addressUpdate=t.addressDetail=t.addressDefault=t.addressCreate=t.addressList=t.memberUpdate=t.memberInfo=void 0;var a="/tiny-shop/v1/member/member/index";t.memberInfo=a;var n="/tiny-shop/v1/member/member/update";t.memberUpdate=n;var r="/tiny-shop/v1/member/address/index";t.addressList=r;var o="/tiny-shop/v1/member/address/default";t.addressDefault=o;var s="/tiny-shop/v1/member/address/view";t.addressDetail=s;var c="/tiny-shop/v1/member/address/create";t.addressCreate=c;var l="/tiny-shop/v1/member/address/update";t.addressUpdate=l;var d="/tiny-shop/v1/member/address/delete";t.addressDelete=d;var v="/tiny-shop/v1/marketing/coupon-type/index";t.couponList=v;var u="/tiny-shop/v1/member/coupon/index";t.myCouponList=u;var p="/tiny-shop/v1/marketing/coupon-type/view";t.couponDetail=p;var f="/tiny-shop/v1/marketing/coupon-type/create";t.couponReceive=f;var h="/tiny-shop/v1/member/coupon/clear";t.couponClear=h;var m="/tiny-shop/v1/member/order/index";t.orderList=m;var y="/tiny-shop/v1/member/order/take-delivery";t.orderTakeDelivery=y;var b="/tiny-shop/v1/member/order-product/refund-apply";t.orderRefundApply=b;var g="/tiny-shop/v1/member/order-product/refund-close";t.closeOrderRefundApply=g;var w="/tiny-shop/v1/member/order/view";t.orderDetail=w;var x="/tiny-shop/v1/member/order/delete";t.orderDelete=x;var D="/tiny-shop/v1/member/footprint/index";t.footPrintList=D;var k="/tiny-shop/v1/member/footprint/delete";t.footPrintDel=k;var C="/tiny-shop/v1/member/collect/index";t.collectList=C;var L="/tiny-shop/v1/member/credits-log/index";t.creditsLogList=L;var _="/tiny-shop/v1/member/evaluate/create";t.evaluateCreate=_;var O="/tiny-shop/v1/member/evaluate/again";t.evaluateAgain=O;var P="/tiny-shop/v1/member/invoice/index";t.invoiceList=P;var I="/tiny-shop/v1/member/invoice/create";t.invoiceCreate=I;var j="/tiny-shop/v1/member/invoice/update";t.invoiceUpdate=j;var T="/tiny-shop/v1/member/invoice/view";t.invoiceDetail=T;var R="/tiny-shop/v1/member/invoice/default";t.invoiceDefault=R;var A="/tiny-shop/v1/member/invoice/delete";t.invoiceDel=A;var $="/tiny-shop/v1/member/order-invoice/index";t.orderInvoiceList=$;var E="/tiny-shop/v1/member/opinion/index";t.opinionList=E;var U="/tiny-shop/v1/member/opinion/create";t.opinionCreate=U;var M="/tiny-shop/v1/member/opinion/view";t.opinionDetail=M;var z="/tiny-shop/v1/member/auth/index";t.thirdPartyAuthList=z;var B="/tiny-shop/v1/member/auth/delete";t.thirdPartyAuthDelete=B;var F="https://www.yllook.com/api/tiny-shop/v1/common/file/images";t.uploadImage=F;var J="https://www.yllook.com/api/tiny-shop/v1/common/file/base64";t.uploadBase64Image=J},a023:function(e,t,i){"use strict";var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",{staticClass:"content"},[i("v-uni-view",{staticClass:"row b-b"},[i("v-uni-text",{staticClass:"tit"},[e._v("发票类型")]),i("v-uni-radio-group",{staticClass:"invoice-type",on:{change:function(t){t=e.$handleEvent(t),e.handleInvoiceTypeChange(t)}}},e._l(e.invoiceType,(function(t,a){return i("v-uni-label",{key:a,staticClass:"invoice-type-item"},[i("v-uni-radio",{staticClass:"gender-item-radio",attrs:{color:"#fa436a",value:""+t.value,checked:t.value===e.invoiceData.type}}),i("v-uni-text",{staticClass:"gender-item-text"},[e._v(e._s(t.name))])],1)})),1)],1),i("v-uni-view",{staticClass:"row b-b"},[i("v-uni-text",{staticClass:"tit"},[e._v("发票抬头")]),i("v-uni-input",{staticClass:"input",attrs:{type:"text",placeholder:"请输入发票抬头","placeholder-class":"placeholder"},on:{blur:function(t){t=e.$handleEvent(t),e.handleTitleChange(t)}},model:{value:e.invoiceData.title,callback:function(t){e.$set(e.invoiceData,"title",t)},expression:"invoiceData.title"}})],1),i("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:1===parseInt(e.invoiceData.type,10),expression:"parseInt(invoiceData.type, 10) === 1"}],staticClass:"row b-b"},[i("v-uni-text",{staticClass:"tit"},[e._v("发票税号")]),i("v-uni-input",{staticClass:"input",attrs:{type:"text",placeholder:"请输入发票税号","placeholder-class":"placeholder"},on:{blur:function(t){t=e.$handleEvent(t),e.handleDutyParagraphChange(t)}},model:{value:e.invoiceData.duty_paragraph,callback:function(t){e.$set(e.invoiceData,"duty_paragraph",t)},expression:"invoiceData.duty_paragraph"}})],1),i("v-uni-view",{staticClass:"row default-row"},[i("v-uni-text",{staticClass:"tit"},[e._v("设为默认")]),i("v-uni-switch",{attrs:{checked:!!e.invoiceData.is_default,color:"#fa436a"},on:{change:function(t){t=e.$handleEvent(t),e.switchChange(t)}}})],1),i("v-uni-button",{staticClass:"add-btn",on:{click:function(t){t=e.$handleEvent(t),e.confirm(t)}}},[e._v("提交")])],1)},n=[];i.d(t,"a",(function(){return a})),i.d(t,"b",(function(){return n}))},b6e7:function(e,t,i){"use strict";i.r(t);var a=i("a023"),n=i("f932");for(var r in n)"default"!==r&&function(e){i.d(t,e,(function(){return n[e]}))}(r);i("3e12");var o=i("2877"),s=Object(o["a"])(n["default"],a["a"],a["b"],!1,null,"1f83fda4",null);t["default"]=s.exports},da83:function(e,t,i){"use strict";var a=i("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,i("8e6e"),i("ac6a"),i("456d");var n=a(i("bd86"));i("96cf");var r=a(i("3b8d")),o=i("802d");i("2b74");function s(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,a)}return i}function c(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?s(Object(i),!0).forEach((function(t){(0,n.default)(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):s(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}var l={data:function(){return{invoiceData:{type:2,title:"",duty_paragraph:"",is_default:""},invoiceType:[{name:"公司",value:1},{name:"个人",value:2}]}},onLoad:function(e){this.initData(e)},methods:{initData:function(){var e=(0,r.default)(regeneratorRuntime.mark((function e(t){var i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(i="新增发票","edit"!==t.type){e.next=5;break}return i="编辑发票",e.next=5,this.getInvoiceDetail(t.id);case 5:this.manageType=t.type,uni.setNavigationBarTitle({title:i});case 7:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),getInvoiceDetail:function(){var e=(0,r.default)(regeneratorRuntime.mark((function e(t){var i=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return uni.showLoading({title:"加载中..."}),e.next=3,this.$get("".concat(o.invoiceDetail),{id:t}).then(function(){var e=(0,r.default)(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:200===t.code?i.invoiceData=t.data:uni.showToast({title:t.message,icon:"none"});case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){console.log(e)}));case 3:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),handleTitleChange:function(e){this.invoiceData.title=e.detail.value},handleInvoiceTypeChange:function(e){this.invoiceData.type=e.detail.value},handleDutyParagraphChange:function(e){console.log(e.detail),this.invoiceData.duty_paragraph=e.detail.value},switchChange:function(e){this.invoiceData.is_default=e.detail.value?"1":"0"},confirm:function(){var e=this.invoiceData;e.title?1!==e.type||e.duty_paragraph?"edit"===this.manageType?this.handleInvoiceUpdate(e):this.handleInvoiceCreate(e):uni.showToast({title:"请填写发票税号",icon:"none"}):uni.showToast({title:"请填写发票抬头",icon:"none"})},handleInvoiceUpdate:function(){var e=(0,r.default)(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return uni.showLoading({title:"发票修改中..."}),console.log(t),e.next=4,this.$put("".concat(o.invoiceUpdate,"?id=").concat(t.id),{type:t.type,title:t.title,duty_paragraph:t.duty_paragraph,is_default:t.is_default}).then((function(e){200===e.code?(uni.showToast({title:"恭喜您, 发票修改成功！",icon:"none"}),uni.navigateBack({url:"/pages/invoice/invoice"})):uni.showToast({title:e.message,icon:"none"})})).catch((function(e){console.log(e)}));case 4:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),handleInvoiceCreate:function(){var e=(0,r.default)(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return uni.showLoading({title:"创建中..."}),e.next=3,this.$post("".concat(o.invoiceCreate),c({},t)).then((function(e){200===e.code?(uni.showToast({title:"恭喜您, 发票添加成功！",icon:"none"}),uni.navigateBack({url:"/pages/invoice/invoice"})):uni.showToast({title:e.message,icon:"none"})})).catch((function(e){console.log(e)}));case 3:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()}};t.default=l},f932:function(e,t,i){"use strict";i.r(t);var a=i("da83"),n=i.n(a);for(var r in a)"default"!==r&&function(e){i.d(t,e,(function(){return a[e]}))}(r);t["default"]=n.a},ff8e:function(e,t,i){var a=i("24fb");t=a(!1),t.push([e.i,"uni-page-body[data-v-1f83fda4]{background:#f8f8f8;padding-top:%?16?%}.row[data-v-1f83fda4]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;position:relative;padding:0 %?30?%;height:%?110?%;background:#fff}.row .tit[data-v-1f83fda4]{-webkit-flex-shrink:0;flex-shrink:0;width:%?140?%;font-size:%?30?%;color:#303133}.row .input[data-v-1f83fda4]{-webkit-box-flex:1;-webkit-flex:1;flex:1;font-size:%?30?%;color:#303133}.row .icon-shouhuodizhi[data-v-1f83fda4]{font-size:%?36?%;color:#909399}.default-row[data-v-1f83fda4]{margin-top:%?16?%}.default-row .tit[data-v-1f83fda4]{-webkit-box-flex:1;-webkit-flex:1;flex:1}.default-row uni-switch[data-v-1f83fda4]{-webkit-transform:translateX(%?16?%) scale(.9);transform:translateX(%?16?%) scale(.9)}.add-btn[data-v-1f83fda4]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;width:%?690?%;height:%?80?%;margin:%?60?% auto;font-size:%?32?%;color:#fff;background-color:#fa436a;border-radius:%?10?%;box-shadow:1px 2px 5px rgba(219,63,96,.4)}.invoice-type-item[data-v-1f83fda4]{margin-right:%?20?%}body.?%PAGE?%[data-v-1f83fda4]{background:#f8f8f8}",""]),e.exports=t}}]);