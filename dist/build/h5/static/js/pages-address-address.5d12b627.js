(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-address-address"],{"0e92":function(e,t,i){"use strict";var n=i("84db"),a=i.n(n);a.a},"22e6":function(e,t,i){"use strict";i.r(t);var n=i("601e"),a=i("2ce5");for(var o in a)"default"!==o&&function(e){i.d(t,e,(function(){return a[e]}))}(o);i("0e92");var s=i("2877"),r=Object(s["a"])(a["default"],n["a"],n["b"],!1,null,"5d719b22",null);t["default"]=r.exports},"2ce5":function(e,t,i){"use strict";i.r(t);var n=i("aad8"),a=i.n(n);for(var o in n)"default"!==o&&function(e){i.d(t,e,(function(){return n[e]}))}(o);t["default"]=a.a},"601e":function(e,t,i){"use strict";var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",{staticClass:"content b-t"},[e._l(e.addressList,(function(t,n){return i("v-uni-view",{key:n,staticClass:"list b-b",on:{click:function(i){i=e.$handleEvent(i),e.checkAddress(t)}}},[i("v-uni-view",{staticClass:"wrapper",on:{touchstart:function(i){i=e.$handleEvent(i),e.goTouchStart(t.id)},touchmove:function(t){t=e.$handleEvent(t),e.goTouchMove(t)},touchend:function(t){t=e.$handleEvent(t),e.goTouchEnd(t)}}},[i("v-uni-view",{staticClass:"address-box"},[1===parseInt(t.is_default,10)?i("v-uni-text",{staticClass:"tag"},[e._v("默认")]):e._e(),i("v-uni-text",{staticClass:"address"},[e._v(e._s(t.address_name)+" "+e._s(t.address_details))])],1),i("v-uni-view",{staticClass:"u-box"},[i("v-uni-text",{staticClass:"name"},[e._v(e._s(t.realname))]),i("v-uni-text",{staticClass:"mobile"},[e._v(e._s(t.mobile))])],1)],1),i("v-uni-text",{staticClass:"yticon icon-bianji",on:{click:function(i){i.stopPropagation(),i=e.$handleEvent(i),e.addAddress("edit",t)}}})],1)})),i("v-uni-text",{staticStyle:{display:"block",padding:"16upx 30upx 10upx","lihe-height":"1.6",color:"#fa436a","font-size":"24upx"}},[e._v("提示：长按可删除当前收货地址。最多只能存在一个默认地址。")]),i("v-uni-button",{staticClass:"add-btn",on:{click:function(t){t=e.$handleEvent(t),e.addAddress("add")}}},[e._v("新增地址")])],2)},a=[];i.d(t,"a",(function(){return n})),i.d(t,"b",(function(){return a}))},"802d":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.uploadImage=t.invoiceDel=t.invoiceDefault=t.invoiceDetail=t.invoiceUpdate=t.invoiceCreate=t.invoiceList=t.evaluateAgain=t.evaluateCreate=t.creditsLogList=t.collectList=t.footPrintDel=t.footPrintList=t.couponReceive=t.orderTakeDelivery=t.orderDelete=t.orderDetail=t.closeOrderRefundApply=t.orderRefundApply=t.orderList=t.couponClear=t.myCouponList=t.couponList=t.addressDelete=t.addressUpdate=t.addressDetail=t.addressDefault=t.addressCreate=t.addressList=t.memberUpdate=t.memberInfo=void 0;var n="/tiny-shop/v1/member/member/index";t.memberInfo=n;var a="/tiny-shop/v1/member/member/update";t.memberUpdate=a;var o="/tiny-shop/v1/member/address/index";t.addressList=o;var s="/tiny-shop/v1/member/address/default";t.addressDefault=s;var r="/tiny-shop/v1/member/address/view";t.addressDetail=r;var d="/tiny-shop/v1/member/address/create";t.addressCreate=d;var c="/tiny-shop/v1/member/address/update";t.addressUpdate=c;var l="/tiny-shop/v1/member/address/delete";t.addressDelete=l;var u="/tiny-shop/v1/marketing/coupon-type/index";t.couponList=u;var v="/tiny-shop/v1/member/coupon/index";t.myCouponList=v;var p="/tiny-shop/v1/marketing/coupon-type/create";t.couponReceive=p;var f="/tiny-shop/v1/member/coupon/clear";t.couponClear=f;var b="/tiny-shop/v1/member/order/index";t.orderList=b;var m="/tiny-shop/v1/member/order/take-delivery";t.orderTakeDelivery=m;var h="/tiny-shop/v1/member/order-product/refund-apply";t.orderRefundApply=h;var g="/tiny-shop/v1/member/order-product/refund-close";t.closeOrderRefundApply=g;var y="/tiny-shop/v1/member/order/view";t.orderDetail=y;var x="/tiny-shop/v1/member/order/delete";t.orderDelete=x;var w="/tiny-shop/v1/member/footprint/index";t.footPrintList=w;var k="/tiny-shop/v1/member/footprint/delete";t.footPrintDel=k;var L="/tiny-shop/v1/member/collect/index";t.collectList=L;var D="/tiny-shop/v1/member/credits-log/index";t.creditsLogList=D;var C="/tiny-shop/v1/member/evaluate/create";t.evaluateCreate=C;var _="/tiny-shop/v1/member/evaluate/again";t.evaluateAgain=_;var E="/tiny-shop/v1/member/invoice/index";t.invoiceList=E;var A="/tiny-shop/v1/member/invoice/create";t.invoiceCreate=A;var T="/tiny-shop/v1/member/invoice/update";t.invoiceUpdate=T;var O="/tiny-shop/v1/member/invoice/view";t.invoiceDetail=O;var $="/tiny-shop/v1/member/invoice/default";t.invoiceDefault=$;var M="/tiny-shop/v1/member/invoice/delete";t.invoiceDel=M;var P="https://www.yllook.com/api/v1/file/images";t.uploadImage=P},"84db":function(e,t,i){var n=i("8ff8");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var a=i("4f06").default;a("9d8ccdf6",n,!0,{sourceMap:!1,shadowMode:!1})},"8ff8":function(e,t,i){t=e.exports=i("24fb")(!1),t.push([e.i,"uni-page-body[data-v-5d719b22]{padding-bottom:%?120?%}.content[data-v-5d719b22]{position:relative}.list[data-v-5d719b22]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding:%?20?% %?30?%;background:#fff;position:relative}.wrapper[data-v-5d719b22]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-flex:1;-webkit-flex:1;flex:1}.address-box[data-v-5d719b22]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.address-box .tag[data-v-5d719b22]{font-size:%?24?%;color:#fa436a;margin-right:%?10?%;background:#fffafb;border:1px solid #ffb4c7;border-radius:%?4?%;padding:%?4?% %?10?%;line-height:1}.address-box .address[data-v-5d719b22]{font-size:%?30?%;color:#303133}.u-box[data-v-5d719b22]{font-size:%?28?%;color:#909399;margin-top:%?16?%}.u-box .name[data-v-5d719b22]{margin-right:%?30?%}.icon-bianji[data-v-5d719b22]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;height:%?80?%;font-size:%?40?%;color:#909399;padding-left:%?30?%}.add-btn[data-v-5d719b22]{position:fixed;left:%?30?%;right:%?30?%;bottom:%?16?%;z-index:95;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;width:%?690?%;height:%?80?%;font-size:%?32?%;color:#fff;background-color:#fa436a;border-radius:%?10?%;box-shadow:1px 2px 5px rgba(219,63,96,.4)}",""])},aad8:function(e,t,i){"use strict";var n=i("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,i("96cf");var a=n(i("3b8d")),o=i("802d"),s={data:function(){return{timeOutEvent:0,source:0,addressList:[]}},onLoad:function(e){this.source=e.source,this.initData()},onShow:function(){this.getAddressList()},methods:{goTouchStart:function(e){var t=this;clearTimeout(this.timeOutEvent),this.timeOutEvent=0,this.timeOutEvent=setTimeout((function(){uni.showModal({content:"确定要删除该收货地址吗",success:function(i){i.confirm&&t.$del("".concat(o.addressDelete,"?id=").concat(e)).then((function(e){200===e.code?t.getAddressList():uni.showToast({title:e.message,icon:"none"})}))}})}),500)},goTouchEnd:function(){clearTimeout(this.timeOutEvent),this.timeOutEvent},goTouchMove:function(){clearTimeout(this.timeOutEvent),this.timeOutEvent=0},initData:function(){this.getAddressList()},getAddressList:function(){var e=(0,a.default)(regeneratorRuntime.mark((function e(){var t=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return uni.showLoading({title:"加载中..."}),e.next=3,this.$get("".concat(o.addressList)).then((function(e){200===e.code?t.addressList=e.data:uni.showToast({title:e.message,icon:"none"})})).catch((function(e){console.log(e)}));case 3:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),checkAddress:function(e){1==this.source&&(this.$api.prePage().addressData=e,uni.navigateBack())},addAddress:function(e,t){uni.navigateTo({url:"/pages/address/addressManage?type=".concat(e,"&id=").concat(t&&t.id||void 0)})},refreshList:function(e,t){this.addressList.unshift(e),console.log(e,t)}}};t.default=s}}]);