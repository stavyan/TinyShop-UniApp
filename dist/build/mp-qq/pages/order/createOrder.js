(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/order/createOrder"],{"1d91":function(t,e,n){"use strict";n.r(e);var i=n("4784"),r=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=r.a},"45d6":function(t,e,n){},4784:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=a(n("a34a")),r=n("c4c8"),o=a(n("c1df"));function a(t){return t&&t.__esModule?t:{default:t}}function s(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}function c(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?s(Object(n),!0).forEach((function(e){u(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function u(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function p(t,e,n,i,r,o,a){try{var s=t[o](a),c=s.value}catch(u){return void n(u)}s.done?e(c):Promise.resolve(c).then(i,r)}function h(t){return function(){var e=this,n=arguments;return new Promise((function(i,r){var o=t.apply(e,n);function a(t){p(o,i,r,a,s,"next",t)}function s(t){p(o,i,r,a,s,"throw",t)}a(void 0)}))}}var d=function(){return n.e("components/empty").then(n.bind(null,"d138"))},l=function(){return n.e("components/mpvue-picker/mpvuePicker").then(n.bind(null,"13f1"))},f={components:{mpvuePicker:l,empty:d},data:function(){return{maskState:0,desc:"",payType:1,orderDetail:{},pointExchangeType:[],loadingType:"more",pickerShippingType:[{label:"物流配送",value:1},{label:"买家自提",value:2}],currentShippingType:{},currentCompany:{},currentPickupPoint:{},cartIds:null,invoiceItem:{},addressData:{},couponItem:{},pointConfig:{},product:null,shippingMoney:0,isUsePoint:!1,isUsePointDisabled:!1,data:{},userInfo:{}}},computed:{amountGoods:function(){var t=0;return this.orderDetail.products&&this.orderDetail.products.forEach((function(e){t+=parseInt(e.num,10)*parseFloat(e.price)})),this.floor(t)},discountAmount:function(){var t=this.floor((100-this.couponItem.discount)/100*this.amountGoods);return 2===parseInt(this.couponItem.type,10)?t:this.couponItem.money||0},realAmount:function(){var t=this.amountGoods-this.discountAmount+this.shippingMoney-(this.isUsePoint?this.maxUsePointFee:0);return(this.floor(parseFloat(this.invoiceAmount)+t)||0).toFixed(2)},invoiceAmount:function(){var t=this.amountGoods-this.discountAmount-(this.isUsePoint?this.maxUsePointFee:0);return this.invoiceItem.type?this.floor(this.orderDetail.invoice.order_invoice_tax/100*t):0},maxUsePoint:function(){return this.orderDetail.max_use_point>t.getStorageSync("userInfo").account.user_integral?t.getStorageSync("userInfo").account.user_integral:this.orderDetail.max_use_point},maxUsePointFee:function(){return this.maxUsePoint*this.pointConfig.convert_rate}},filters:{time:function(t){return(0,o.default)(1e3*t).format("YY/MM/DD HH:mm")}},onShow:function(){this.addressData&&this.addressData.realname&&this.getOrderFreightFee()},onLoad:function(t){this.initData(t)},methods:{closeInvoice:function(){this.invoiceItem={}},floor:function(t){return Math.floor(100*t)/100},handleIsUsePoint:function(){this.isUsePoint=!this.isUsePoint},showSinglePicker:function(){this.$refs.shippingTypePicker.show()},showCompanyPicker:function(){this.$refs.companyTypePicker.show()},showPickupPointPicker:function(){this.$refs.pickupPointPicker.show()},onConfirm:function(t){t.value=t.value[0],this.currentShippingType=t,2==this.currentShippingType.value?parseFloat(this.realAmount)>parseFloat(this.orderDetail.pickup_point_config.pickup_point_freight)?this.shippingMoney=0:this.shippingMoney=parseFloat(this.orderDetail.pickup_point_config.pickup_point_fee):(this.currentCompany=this.orderDetail.company[0],this.getOrderFreightFee())},onCompanyConfirm:function(){var t=h(i.default.mark((function t(e){return i.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.value=e.value[0],this.currentCompany=e,this.getOrderFreightFee();case 3:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}(),onPickupPointConfirm:function(){var t=h(i.default.mark((function t(e){return i.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.value=e.value[0],this.currentPickupPoint=e;case 2:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}(),getOrderFreightFee:function(){var e=h(i.default.mark((function e(){var n,o=this;return i.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!this.currentPickupPoint){e.next=3;break}return this.shippingMoney=parseFloat(this.orderDetail.pickup_point_config.pickup_point_fee),e.abrupt("return");case 3:return t.showLoading({title:"加载中..."}),n={},this.addressData&&(n.address_id=this.addressData.id),this.currentCompany&&(n.company_id=this.currentCompany.value),e.next=9,this.$get("".concat(r.orderFreightFee),c({},n,{},this.data)).then((function(e){200===e.code?o.shippingMoney=e.data.shipping_money:t.showToast({title:e.message,icon:"none"})})).catch((function(t){console.log(t)}));case 9:case"end":return e.stop()}}),e,this)})));function n(){return e.apply(this,arguments)}return n}(),initData:function(){var e=h(i.default.mark((function e(n){return i.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,JSON.parse(n.data);case 2:return this.data=e.sent,this.userInfo=t.getStorageSync("userInfo"),e.next=6,this.getOrderDetail(this.data);case 6:case"end":return e.stop()}}),e,this)})));function n(t){return e.apply(this,arguments)}return n}(),getOrderDetail:function(){var e=h(i.default.mark((function e(n){var o=this;return i.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.$get("".concat(r.orderPreview),c({},n)).then((function(e){200===e.code?(o.orderDetail=e.data,o.pointConfig=o.orderDetail.point_config,o.addressData=o.orderDetail.address,o.currentShippingType=o.pickerShippingType[0],o.orderDetail.company.forEach((function(t){t.label=t.title,t.value=t.id})),o.currentCompany=o.orderDetail.company[0],o.pointExchangeType=[],o.orderDetail.products.forEach((function(t){o.pointExchangeType.push(t.point_exchange_type)})),1===parseInt(o.orderDetail.pickup_point_config.buyer_self_lifting,10)?(o.orderDetail.pickup_point_config.list.forEach((function(t){t.label="".concat(t.contact||"无名"," - ").concat(t.name||"未知"," - ").concat(t.address||"未知"),t.value=t.id})),o.currentPickupPoint=o.orderDetail.pickup_point_config.list[0],1!==parseInt(o.orderDetail.pickup_point_config.pickup_point_is_open,10)&&(o.shippingMoney=0)):o.orderDetail.pickup_point_config.list=[]):t.showToast({title:e.message,icon:"none"})})).catch((function(t){console.log(t)}));case 2:case"end":return e.stop()}}),e,this)})));function n(t){return e.apply(this,arguments)}return n}(),toggleMask:function(t){var e=this,n="show"===t?10:300,i="show"===t?1:0;this.maskState=2,setTimeout((function(){e.maskState=i}),n)},numberChange:function(t){this.number=t.number},changePayType:function(t){this.payType=t},submit:function(){var e=h(i.default.mark((function e(){var n;return i.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.showLoading({title:"加载中..."}),n={},!this.addressData||!this.addressData.id){e.next=6;break}n.address_id=this.addressData.id,e.next=8;break;case 6:return t.showToast({title:"请选择收货地址",icon:"none"}),e.abrupt("return");case 8:return this.couponItem&&this.couponItem.id&&(n.coupon_id=this.couponItem.id),this.invoiceItem&&this.invoiceItem.id&&(n.invoice_id=this.invoiceItem.id),this.currentCompany.value&&(n.company_id=this.currentCompany.value),this.currentPickupPoint.value&&(n.pickup_id=this.currentPickupPoint.value),this.currentShippingType.value&&(n.shipping_type=this.currentShippingType.value),e.next=15,this.$post("".concat(r.orderCreate),c({},n,{},this.data)).then((function(e){if(200===e.code){var n={};n.order_id=parseInt(e.data.id,10),1===parseInt(e.data.pay_status,10)?t.redirectTo({url:"/pages/money/paySuccess"}):t.redirectTo({url:"/pages/money/pay?id=".concat(e.data.id)})}else t.showToast({title:e.message,icon:"none"})})).catch((function(t){console.log(t)}));case 15:case"end":return e.stop()}}),e,this)})));function n(){return e.apply(this,arguments)}return n}(),stopPrevent:function(){},selectCoupon:function(e){this.amountGoods<e.at_least?t.showToast({title:"不满足优惠券使用条件~",icon:"none"}):(this.maskState=0,this.couponItem=e)}}};e.default=f}).call(this,n("a821")["default"])},6153:function(t,e,n){"use strict";(function(t){n("6cdc"),n("921b");i(n("66fd"));var e=i(n("d180"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("a821")["createPage"])},"8b4b":function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=(t._self._c,parseInt(t.orderDetail.is_logistics,10)),i=parseInt(t.currentShippingType.value,10),r=parseInt(t.currentShippingType.value,10),o=parseInt(t.pointConfig.is_open),a=parseInt(t.invoiceItem.type,10),s=t.__map(t.orderDetail.coupons,(function(e,n){var i=t._f("time")(e.start_time),r=t._f("time")(e.end_time),o=parseInt(e.couponType.type,10),a=parseInt(e.range_type,10),s=parseInt(e.term_of_validity_type,10);return{$orig:t.__get_orig(e),f0:i,f1:r,m5:o,m6:a,m7:s}}));t.$mp.data=Object.assign({},{$root:{m0:n,m1:i,m2:r,m3:o,m4:a,l0:s}})},r=[];n.d(e,"a",(function(){return i})),n.d(e,"b",(function(){return r}))},b618:function(t,e,n){"use strict";var i=n("45d6"),r=n.n(i);r.a},d180:function(t,e,n){"use strict";n.r(e);var i=n("8b4b"),r=n("1d91");for(var o in r)"default"!==o&&function(t){n.d(e,t,(function(){return r[t]}))}(o);n("b618");var a=n("2877"),s=Object(a["a"])(r["default"],i["a"],i["b"],!1,null,null,null);e["default"]=s.exports}},[["6153","common/runtime","common/vendor"]]]);