(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-address-addressManage"],{"04dd":function(e,t,a){var i=a("24fb");t=i(!1),t.push([e.i,"uni-page-body[data-v-e4aee33e]{background:#f8f8f8;padding-top:%?16?%}.row[data-v-e4aee33e]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;position:relative;padding:0 %?30?%;height:%?110?%;background:#fff}.row .tit[data-v-e4aee33e]{-webkit-flex-shrink:0;flex-shrink:0;width:%?140?%;font-size:%?30?%;color:#303133}.row .input[data-v-e4aee33e]{-webkit-box-flex:1;-webkit-flex:1;flex:1;font-size:%?30?%;color:#303133}.row .icon-shouhuodizhi[data-v-e4aee33e]{font-size:%?36?%;color:#909399}.default-row[data-v-e4aee33e]{margin-top:%?16?%}.default-row .tit[data-v-e4aee33e]{-webkit-box-flex:1;-webkit-flex:1;flex:1}.default-row uni-switch[data-v-e4aee33e]{-webkit-transform:translateX(%?16?%) scale(.9);transform:translateX(%?16?%) scale(.9)}.add-btn[data-v-e4aee33e]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;width:%?690?%;height:%?80?%;margin:%?60?% auto;font-size:%?32?%;color:#fff;background-color:#fa436a;border-radius:%?10?%;box-shadow:1px 2px 5px rgba(219,63,96,.4)}body.?%PAGE?%[data-v-e4aee33e]{background:#f8f8f8}",""]),e.exports=t},"076f":function(e,t,a){var i=a("04dd");"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var n=a("4f06").default;n("df101af4",i,!0,{sourceMap:!1,shadowMode:!1})},"2b74":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.wechatConfig=t.configList=t.payCreate=t.advList=t.uploadFile=t.transmitCreate=t.collectDel=t.collectCreate=t.provinceList=void 0;var i="/tiny-shop/v1/common/provinces/index";t.provinceList=i;var n="/tiny-shop/v1/common/collect/create";t.collectCreate=n;var r="/tiny-shop/v1/common/collect/delete";t.collectDel=r;var s="/tiny-shop/v1/common/transmit/create";t.transmitCreate=s;var o="/v1/file/images";t.uploadFile=o;var d="/tiny-shop/v1/common/adv/index";t.advList=d;var l="/tiny-shop/v1/common/config/index";t.configList=l;var c="/tiny-shop/v1/common/pay/create";t.payCreate=c;var u="/tiny-shop/v1/third-party/wechat-js-sdk";t.wechatConfig=u},"3b02":function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",{staticClass:"content"},[a("v-uni-view",{staticClass:"row b-b"},[a("v-uni-text",{staticClass:"tit"},[e._v("联系人")]),a("v-uni-input",{staticClass:"input",attrs:{type:"text",placeholder:"收货人姓名","placeholder-class":"placeholder"},on:{blur:function(t){t=e.$handleEvent(t),e.handleRealNameChange(t)}},model:{value:e.addressData.realname,callback:function(t){e.$set(e.addressData,"realname",t)},expression:"addressData.realname"}})],1),a("v-uni-view",{staticClass:"row b-b"},[a("v-uni-text",{staticClass:"tit"},[e._v("手机号")]),a("v-uni-input",{staticClass:"input",attrs:{type:"number",placeholder:"收货人手机号码","placeholder-class":"placeholder"},on:{blur:function(t){t=e.$handleEvent(t),e.handleMobileChange(t)}},model:{value:e.addressData.mobile,callback:function(t){e.$set(e.addressData,"mobile",t)},expression:"addressData.mobile"}})],1),a("v-uni-view",{staticClass:"row b-b"},[a("v-uni-text",{staticClass:"tit"},[e._v("选择地址")]),a("v-uni-view",[a("v-uni-picker",{attrs:{mode:"multiSelector",value:e.multiIndex,"range-key":"title",range:e.multiArray},on:{columnchange:function(t){t=e.$handleEvent(t),e.bindMultiPickerColumnChange(t)}}},[a("v-uni-view",{staticClass:"input"},[e._v(e._s(e.addressData.address_name))])],1)],1)],1),a("v-uni-view",{staticClass:"row b-b"},[a("v-uni-text",{staticClass:"tit"},[e._v("详细地址")]),a("v-uni-input",{staticClass:"input",attrs:{type:"text",placeholder:"请输入详细地址","placeholder-class":"placeholder"},on:{blur:function(t){t=e.$handleEvent(t),e.bindAddressDetailsChange(t)}},model:{value:e.addressData.address_details,callback:function(t){e.$set(e.addressData,"address_details",t)},expression:"addressData.address_details"}})],1),a("v-uni-view",{staticClass:"row default-row"},[a("v-uni-text",{staticClass:"tit"},[e._v("设为默认")]),a("v-uni-switch",{attrs:{checked:!!e.addressData.is_default,color:"#fa436a"},on:{change:function(t){t=e.$handleEvent(t),e.switchChange(t)}}})],1),a("v-uni-button",{staticClass:"add-btn",on:{click:function(t){t=e.$handleEvent(t),e.confirm(t)}}},[e._v("提交")])],1)},n=[];a.d(t,"a",(function(){return i})),a.d(t,"b",(function(){return n}))},"56d71":function(e,t,a){"use strict";a.r(t);var i=a("ea7e"),n=a.n(i);for(var r in i)"default"!==r&&function(e){a.d(t,e,(function(){return i[e]}))}(r);t["default"]=n.a},"802d":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.thirdPartyAuthDelete=t.thirdPartyAuthList=t.opinionDetail=t.opinionCreate=t.opinionList=t.uploadBase64Image=t.uploadImage=t.orderInvoiceList=t.invoiceDel=t.invoiceDefault=t.invoiceDetail=t.invoiceUpdate=t.invoiceCreate=t.invoiceList=t.evaluateAgain=t.evaluateCreate=t.creditsLogList=t.collectList=t.footPrintDel=t.footPrintList=t.couponReceive=t.orderTakeDelivery=t.orderDelete=t.orderDetail=t.closeOrderRefundApply=t.orderRefundApply=t.orderList=t.couponDetail=t.couponClear=t.myCouponList=t.couponList=t.addressDelete=t.addressUpdate=t.addressDetail=t.addressDefault=t.addressCreate=t.addressList=t.memberUpdate=t.memberInfo=void 0;var i="/tiny-shop/v1/member/member/index";t.memberInfo=i;var n="/tiny-shop/v1/member/member/update";t.memberUpdate=n;var r="/tiny-shop/v1/member/address/index";t.addressList=r;var s="/tiny-shop/v1/member/address/default";t.addressDefault=s;var o="/tiny-shop/v1/member/address/view";t.addressDetail=o;var d="/tiny-shop/v1/member/address/create";t.addressCreate=d;var l="/tiny-shop/v1/member/address/update";t.addressUpdate=l;var c="/tiny-shop/v1/member/address/delete";t.addressDelete=c;var u="/tiny-shop/v1/marketing/coupon-type/index";t.couponList=u;var v="/tiny-shop/v1/member/coupon/index";t.myCouponList=v;var m="/tiny-shop/v1/marketing/coupon-type/view";t.couponDetail=m;var p="/tiny-shop/v1/marketing/coupon-type/create";t.couponReceive=p;var h="/tiny-shop/v1/member/coupon/clear";t.couponClear=h;var f="/tiny-shop/v1/member/order/index";t.orderList=f;var b="/tiny-shop/v1/member/order/take-delivery";t.orderTakeDelivery=b;var y="/tiny-shop/v1/member/order-product/refund-apply";t.orderRefundApply=y;var g="/tiny-shop/v1/member/order-product/refund-close";t.closeOrderRefundApply=g;var x="/tiny-shop/v1/member/order/view";t.orderDetail=x;var w="/tiny-shop/v1/member/order/delete";t.orderDelete=w;var k="/tiny-shop/v1/member/footprint/index";t.footPrintList=k;var D="/tiny-shop/v1/member/footprint/delete";t.footPrintDel=D;var _="/tiny-shop/v1/member/collect/index";t.collectList=_;var A="/tiny-shop/v1/member/credits-log/index";t.creditsLogList=A;var C="/tiny-shop/v1/member/evaluate/create";t.evaluateCreate=C;var L="/tiny-shop/v1/member/evaluate/again";t.evaluateAgain=L;var I="/tiny-shop/v1/member/invoice/index";t.invoiceList=I;var R="/tiny-shop/v1/member/invoice/create";t.invoiceCreate=R;var $="/tiny-shop/v1/member/invoice/update";t.invoiceUpdate=$;var P="/tiny-shop/v1/member/invoice/view";t.invoiceDetail=P;var T="/tiny-shop/v1/member/invoice/default";t.invoiceDefault=T;var E="/tiny-shop/v1/member/invoice/delete";t.invoiceDel=E;var M="/tiny-shop/v1/member/order-invoice/index";t.orderInvoiceList=M;var U="/tiny-shop/v1/member/opinion/index";t.opinionList=U;var j="/tiny-shop/v1/member/opinion/create";t.opinionCreate=j;var O="/tiny-shop/v1/member/opinion/view";t.opinionDetail=O;var z="/tiny-shop/v1/member/auth/index";t.thirdPartyAuthList=z;var B="/tiny-shop/v1/member/auth/delete";t.thirdPartyAuthDelete=B;var N="https://www.yllook.com/api/tiny-shop/v1/common/file/images";t.uploadImage=N;var F="https://www.yllook.com/api/tiny-shop/v1/common/file/base64";t.uploadBase64Image=F},c317:function(e,t,a){"use strict";a.r(t);var i=a("3b02"),n=a("56d71");for(var r in n)"default"!==r&&function(e){a.d(t,e,(function(){return n[e]}))}(r);a("e31e");var s=a("2877"),o=Object(s["a"])(n["default"],i["a"],i["b"],!1,null,"e4aee33e",null);t["default"]=o.exports},e31e:function(e,t,a){"use strict";var i=a("076f"),n=a.n(i);n.a},ea7e:function(e,t,a){"use strict";var i=a("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("ac6a"),a("96cf");var n=i(a("3b8d")),r=a("802d"),s=a("2b74"),o={data:function(){return{addressData:{realname:"",mobile:"",address_details:"",address_name:"请选择地址",address:"",is_default:!1,province_id:"",city_id:"",area_id:""},multiArray:[[],[],[]],multiIndex:[0,0,0]}},onLoad:function(e){this.initData(e)},methods:{initData:function(){var e=(0,n.default)(regeneratorRuntime.mark((function e(t){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(a="新增收货地址","edit"!==t.type){e.next=5;break}return a="编辑收货地址",e.next=5,this.getAddressDetail(t.id);case 5:return this.manageType=t.type,uni.setNavigationBarTitle({title:a}),e.next=9,this.getProvinceList();case 9:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),getAddressDetail:function(){var e=(0,n.default)(regeneratorRuntime.mark((function e(t){var a=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return uni.showLoading({title:"加载中..."}),e.next=3,this.$get("".concat(r.addressDetail),{id:t}).then(function(){var e=(0,n.default)(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:200===t.code?a.addressData=t.data:uni.showToast({title:t.message,icon:"none"});case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){console.log(e)}));case 3:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),getProvinceList:function(){var e=(0,n.default)(regeneratorRuntime.mark((function e(){var t,a,i,r,o,d,l,c,u,v=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=0,a=0,i=0,r=null,o=null,d=null,l=null,c=null,u=null,e.next=11,this.$get("".concat(s.provinceList)).then(function(){var e=(0,n.default)(regeneratorRuntime.mark((function e(m){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(200!==m.code){e.next=7;break}return v.multiArray[0]=m.data,v.addressData.province_id?m.data.forEach((function(e,a){parseInt(e.id,10)==parseInt(v.addressData.province_id,10)&&(t=a,r=e.id,l=e.title)})):(r=v.multiArray[0][0].id,l=v.multiArray[0][0].title),e.next=5,v.$get("".concat(s.provinceList),{pid:r}).then(function(){var e=(0,n.default)(regeneratorRuntime.mark((function e(n){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(200!==n.code){e.next=7;break}return v.multiArray[1]=n.data,v.addressData.city_id?n.data.forEach((function(e,t){parseInt(e.id,10)==parseInt(v.addressData.city_id,10)&&(a=t,o=e.id,c=e.title)})):(o=v.multiArray[1][0].id,c=v.multiArray[1][0].title),e.next=5,v.$get("".concat(s.provinceList),{pid:o}).then((function(e){200===e.code?(v.multiArray[2]=e.data,v.addressData.area_id?e.data.forEach((function(e,t){parseInt(e.id,10)==parseInt(v.addressData.area_id,10)&&(i=t,d=e.id,u=e.title)})):(d=v.multiArray[2][0].id,u=v.multiArray[2][0].title),v.multiIndex=[t,a,i],v.addressData.province_id=r,v.addressData.city_id=o,v.addressData.area_id=d,v.addressData.address_name="".concat(l,", ").concat(c,", ").concat(u)):uni.showToast({title:e.message,icon:"none"})})).catch((function(e){console.log(e)}));case 5:e.next=8;break;case 7:uni.showToast({title:n.message,icon:"none"});case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){console.log(e)}));case 5:e.next=8;break;case 7:uni.showToast({title:m.message,icon:"none"});case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){console.log(e)}));case 11:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),bindMultiPickerColumnChange:function(){var e=(0,n.default)(regeneratorRuntime.mark((function e(t){var a,i,r,o,d,l,c,u,v,m=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:this.multiIndex[t.detail.column]=t.detail.value,a=0,i=0,r=0,o=null,d=null,l=null,c=null,u=null,v=null,e.t0=t.detail.column,e.next=0===e.t0?13:1===e.t0?23:2===e.t0?40:61;break;case 13:e.t1=this.multiIndex[0],e.next=e.t1===this.multiIndex[0]?16:22;break;case 16:return o=this.multiArray[0][t.detail.value].id,c=this.multiArray[0][t.detail.value].title,uni.showLoading({title:"加载中..."}),e.next=21,this.$get("".concat(s.provinceList),{pid:this.multiArray[0][t.detail.value].id}).then(function(){var e=(0,n.default)(regeneratorRuntime.mark((function e(i){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(200!==i.code){e.next=11;break}return m.multiArray[1]=i.data,d=m.multiArray[1][0].id,u=m.multiArray[1][0].title,a=t.detail.value,m.multiIndex=[a,0,0],uni.showLoading({title:"加载中..."}),e.next=9,m.$get("".concat(s.provinceList),{pid:m.multiArray[1][t.detail.column].id}).then((function(e){200===e.code?(m.multiArray[2]=e.data,l=m.multiArray[2][0].id,v=m.multiArray[2][0].title):uni.showToast({title:e.message,icon:"none"})})).catch((function(e){console.log(e)}));case 9:e.next=12;break;case 11:uni.showToast({title:i.message,icon:"none"});case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){console.log(e)}));case 21:return e.abrupt("break",22);case 22:return e.abrupt("break",61);case 23:e.t2=this.multiIndex[0],e.next=e.t2===this.multiIndex[0]?26:39;break;case 26:e.t3=this.multiIndex[1],e.next=e.t3===this.multiIndex[1]?29:38;break;case 29:return o=this.multiArray[0][this.multiIndex[0]].id,c=this.multiArray[0][this.multiIndex[0]].title,d=this.multiArray[1][t.detail.value].id,u=this.multiArray[1][t.detail.value].title,i=t.detail.value,this.multiIndex=[this.multiIndex[0],i,0],e.next=37,this.$get("".concat(s.provinceList),{pid:this.multiArray[1][t.detail.value].id}).then((function(e){200===e.code?m.multiArray[2]=e.data:uni.showToast({title:e.message,icon:"none"})})).catch((function(e){console.log(e)}));case 37:return e.abrupt("break",38);case 38:return e.abrupt("break",39);case 39:return e.abrupt("break",61);case 40:e.t4=this.multiIndex[0],e.next=e.t4===this.multiIndex[0]?43:60;break;case 43:e.t5=this.multiIndex[1],e.next=e.t5===this.multiIndex[1]?46:59;break;case 46:e.t6=this.multiIndex[2],e.next=e.t6===this.multiIndex[2]?49:58;break;case 49:return o=this.multiArray[0][this.multiIndex[0]].id,c=this.multiArray[0][this.multiIndex[0]].title,d=this.multiArray[1][this.multiIndex[1]].id,u=this.multiArray[1][this.multiIndex[1]].title,l=this.multiArray[2][t.detail.value].id,v=this.multiArray[2][t.detail.value].title,r=t.detail.value,this.multiIndex=[this.multiIndex[0],this.multiIndex[1],r],e.abrupt("break",58);case 58:return e.abrupt("break",59);case 59:return e.abrupt("break",60);case 60:return e.abrupt("break",61);case 61:this.addressData.address_name="".concat(c,", ").concat(u,", ").concat(v),this.addressData.province_id=o,this.addressData.city_id=d,this.addressData.area_id=l,this.$forceUpdate();case 66:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),handleRealNameChange:function(e){this.addressData.realname=e.detail.value},bindAddressDetailsChange:function(e){this.addressData.address_details=e.detail.value},handleMobileChange:function(e){this.addressData.mobile=e.detail.value},switchChange:function(e){this.addressData.is_default=e.detail.value},chooseLocation:function(){var e=this;uni.chooseLocation({success:function(t){e.addressData.addressName=t.name,e.addressData.address=t.name}})},confirm:function(){var e=this.addressData;e.realname?/(^1[3|4|5|7|8][0-9]{9}$)/.test(e.mobile)?"edit"===this.manageType?this.handleAddressUpdate(e):this.handleAddressCreate(e):this.$api.msg("请输入正确的手机号码"):this.$api.msg("请填写收货人姓名")},handleAddressUpdate:function(){var e=(0,n.default)(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return uni.showLoading({title:"收货地址修改中..."}),e.next=3,this.$put("".concat(r.addressUpdate,"?id=").concat(t.id),{realname:t.realname,mobile:t.mobile,address_details:t.address_details,is_default:t.is_default?1:0,province_id:t.province_id,city_id:t.city_id,area_id:t.area_id}).then((function(e){200===e.code?(uni.showToast({title:"恭喜您, 收货地址修改成功！",icon:"none"}),uni.navigateBack()):uni.showToast({title:e.message,icon:"none"})})).catch((function(e){console.log(e)}));case 3:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),handleAddressCreate:function(){var e=(0,n.default)(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return uni.showLoading({title:"创建中..."}),e.next=3,this.$post("".concat(r.addressCreate),{realname:t.realname,mobile:t.mobile,address_details:t.address_details,is_default:t.is_default?1:0,province_id:t.province_id,city_id:t.city_id,area_id:t.area_id}).then((function(e){200===e.code?(uni.showToast({title:"恭喜您, 收货地址创建成功！",icon:"none"}),uni.navigateBack()):uni.showToast({title:e.message,icon:"none"})})).catch((function(e){console.log(e)}));case 3:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()}};t.default=o}}]);