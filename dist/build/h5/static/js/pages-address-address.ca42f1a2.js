(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-address-address"],{"1a02":function(e,t,i){"use strict";var a=i("8f04"),n=i.n(a);n.a},"22e6":function(e,t,i){"use strict";i.r(t);var a=i("42fb"),n=i("2ce5");for(var o in n)"default"!==o&&function(e){i.d(t,e,(function(){return n[e]}))}(o);i("1a02");var r=i("2877"),s=Object(r["a"])(n["default"],a["a"],a["b"],!1,null,"7aa32ac2",null);t["default"]=s.exports},"2ce5":function(e,t,i){"use strict";i.r(t);var a=i("aad8"),n=i.n(a);for(var o in a)"default"!==o&&function(e){i.d(t,e,(function(){return a[e]}))}(o);t["default"]=n.a},"42fb":function(e,t,i){"use strict";var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",{staticClass:"content b-t"},[e._l(e.addressList,(function(t,a){return i("v-uni-view",{key:a,staticClass:"list b-b",on:{click:function(i){i=e.$handleEvent(i),e.checkAddress(t)}}},[i("v-uni-view",{staticClass:"wrapper",on:{touchstart:function(i){i=e.$handleEvent(i),e.goTouchStart(t.id)},touchmove:function(t){t=e.$handleEvent(t),e.goTouchMove(t)},touchend:function(t){t=e.$handleEvent(t),e.goTouchEnd(t)}}},[i("v-uni-view",{staticClass:"address-box"},[1===parseInt(t.is_default,10)?i("v-uni-text",{staticClass:"tag"},[e._v("默认")]):e._e(),i("v-uni-text",{staticClass:"address"},[e._v(e._s(t.address_name)+" "+e._s(t.address_details))])],1),i("v-uni-view",{staticClass:"u-box"},[i("v-uni-text",{staticClass:"name"},[e._v(e._s(t.realname))]),i("v-uni-text",{staticClass:"mobile"},[e._v(e._s(t.mobile))])],1)],1),i("i",{staticClass:"iconfont iconbianji",on:{click:function(i){i.stopPropagation(),i=e.$handleEvent(i),e.addAddress("edit",t)}}})],1)})),e.addressList.length>0?i("v-uni-text",{staticStyle:{display:"block",padding:"16upx 30upx 10upx","lihe-height":"1.6",color:"#fa436a","font-size":"24upx"}},[e._v("提示：长按可删除当前收货地址。最多只能存在一个默认地址。")]):i("empty",{attrs:{info:"暂无收货地址，请添加地址"}}),i("v-uni-button",{staticClass:"add-btn",on:{click:function(t){t=e.$handleEvent(t),e.addAddress("add")}}},[e._v("新增地址")])],2)},n=[];i.d(t,"a",(function(){return a})),i.d(t,"b",(function(){return n}))},"802d":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.rechargeConfigIndex=t.thirdPartyAuthDelete=t.thirdPartyAuthList=t.opinionDetail=t.opinionCreate=t.opinionList=t.uploadBase64Image=t.uploadImage=t.orderInvoiceList=t.invoiceDel=t.invoiceDefault=t.invoiceDetail=t.invoiceUpdate=t.invoiceCreate=t.invoiceList=t.evaluateAgain=t.evaluateCreate=t.creditsLogList=t.collectList=t.footPrintDel=t.footPrintList=t.couponReceive=t.orderTakeDelivery=t.orderDelete=t.orderDetail=t.closeOrderRefundApply=t.orderRefundApply=t.orderList=t.couponDetail=t.couponClear=t.myCouponList=t.couponList=t.addressDelete=t.addressUpdate=t.addressDetail=t.addressDefault=t.addressCreate=t.addressList=t.memberUpdate=t.memberInfo=void 0;var a="/tiny-shop/v1/member/member/index";t.memberInfo=a;var n="/tiny-shop/v1/member/member/update";t.memberUpdate=n;var o="/tiny-shop/v1/member/address/index";t.addressList=o;var r="/tiny-shop/v1/member/address/default";t.addressDefault=r;var s="/tiny-shop/v1/member/address/view";t.addressDetail=s;var d="/tiny-shop/v1/member/address/create";t.addressCreate=d;var c="/tiny-shop/v1/member/address/update";t.addressUpdate=c;var l="/tiny-shop/v1/member/address/delete";t.addressDelete=l;var v="/tiny-shop/v1/marketing/coupon-type/index";t.couponList=v;var u="/tiny-shop/v1/member/coupon/index";t.myCouponList=u;var p="/tiny-shop/v1/marketing/coupon-type/view";t.couponDetail=p;var m="/tiny-shop/v1/marketing/coupon-type/create";t.couponReceive=m;var f="/tiny-shop/v1/member/coupon/clear";t.couponClear=f;var h="/tiny-shop/v1/member/order/index";t.orderList=h;var b="/tiny-shop/v1/member/order/take-delivery";t.orderTakeDelivery=b;var y="/tiny-shop/v1/member/order-product/refund-apply";t.orderRefundApply=y;var g="/tiny-shop/v1/member/order-product/refund-close";t.closeOrderRefundApply=g;var x="/tiny-shop/v1/member/order/view";t.orderDetail=x;var w="/tiny-shop/v1/member/order/delete";t.orderDelete=w;var k="/tiny-shop/v1/member/footprint/index";t.footPrintList=k;var L="/tiny-shop/v1/member/footprint/delete";t.footPrintDel=L;var D="/tiny-shop/v1/member/collect/index";t.collectList=D;var C="/tiny-shop/v1/member/credits-log/index";t.creditsLogList=C;var _="/tiny-shop/v1/member/evaluate/create";t.evaluateCreate=_;var A="/tiny-shop/v1/member/evaluate/again";t.evaluateAgain=A;var E="/tiny-shop/v1/member/invoice/index";t.invoiceList=E;var P="/tiny-shop/v1/member/invoice/create";t.invoiceCreate=P;var O="/tiny-shop/v1/member/invoice/update";t.invoiceUpdate=O;var T="/tiny-shop/v1/member/invoice/view";t.invoiceDetail=T;var I="/tiny-shop/v1/member/invoice/default";t.invoiceDefault=I;var R="/tiny-shop/v1/member/invoice/delete";t.invoiceDel=R;var $="/tiny-shop/v1/member/order-invoice/index";t.orderInvoiceList=$;var M="/tiny-shop/v1/member/opinion/index";t.opinionList=M;var z="/tiny-shop/v1/member/opinion/create";t.opinionCreate=z;var j="/tiny-shop/v1/member/opinion/view";t.opinionDetail=j;var U="/tiny-shop/v1/member/auth/index";t.thirdPartyAuthList=U;var B="/tiny-shop/v1/member/auth/delete";t.thirdPartyAuthDelete=B;var S="/tiny-shop/v1/member/recharge-config/index";t.rechargeConfigIndex=S;var J="https://www.yllook.com/api/tiny-shop/v1/common/file/images";t.uploadImage=J;var q="https://www.yllook.com/api/tiny-shop/v1/common/file/base64";t.uploadBase64Image=q},"8f04":function(e,t,i){var a=i("cc9c");"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var n=i("4f06").default;n("228c0ca6",a,!0,{sourceMap:!1,shadowMode:!1})},aad8:function(e,t,i){"use strict";var a=i("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,i("96cf");var n=a(i("3b8d")),o=i("802d"),r=a(i("d138")),s={components:{empty:r.default},data:function(){return{timeOutEvent:0,source:0,page:1,addressList:[]}},onPullDownRefresh:function(){this.page=1,this.addressList=[],this.getAddressList("refresh")},onReachBottom:function(){this.page++,this.getAddressList()},onLoad:function(e){this.source=e.source},onShow:function(){this.initData()},methods:{goTouchStart:function(e){var t=this;clearTimeout(this.timeOutEvent),this.timeOutEvent=0,this.timeOutEvent=setTimeout((function(){uni.showModal({content:"确定要删除该收货地址吗",success:function(i){i.confirm&&t.$del("".concat(o.addressDelete,"?id=").concat(e)).then((function(){t.getAddressList()}))}})}),500)},goTouchEnd:function(){clearTimeout(this.timeOutEvent),this.timeOutEvent},goTouchMove:function(){clearTimeout(this.timeOutEvent),this.timeOutEvent=0},initData:function(){this.getAddressList()},getAddressList:function(){var e=(0,n.default)(regeneratorRuntime.mark((function e(t){var i=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return uni.showLoading({title:"加载中..."}),e.next=3,this.$get("".concat(o.addressList),{page:this.page}).then((function(e){"refresh"===t&&uni.stopPullDownRefresh(),i.addressList=e.data}));case 3:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),checkAddress:function(e){1==this.source&&(this.$api.prePage().addressData=e,uni.navigateBack())},addAddress:function(e,t){uni.navigateTo({url:"/pages/address/addressManage?type=".concat(e,"&id=").concat(t&&t.id||void 0)})}}};t.default=s},cc9c:function(e,t,i){var a=i("24fb");t=a(!1),t.push([e.i,"uni-page-body[data-v-7aa32ac2]{padding-bottom:%?120?%}.content[data-v-7aa32ac2]{position:relative}.list[data-v-7aa32ac2]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding:%?20?% %?30?%;background:#fff;position:relative}.wrapper[data-v-7aa32ac2]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-flex:1;-webkit-flex:1;flex:1}.address-box[data-v-7aa32ac2]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.address-box .tag[data-v-7aa32ac2]{font-size:%?24?%;color:#fa436a;margin-right:%?10?%;background:#fffafb;border:1px solid #ffb4c7;border-radius:%?4?%;padding:%?4?% %?10?%;line-height:1}.address-box .address[data-v-7aa32ac2]{font-size:%?30?%;color:#303133}.u-box[data-v-7aa32ac2]{font-size:%?28?%;color:#909399;margin-top:%?16?%}.u-box .name[data-v-7aa32ac2]{margin-right:%?30?%}.iconfont[data-v-7aa32ac2]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;height:%?80?%;font-size:%?40?%;color:#909399;padding-left:%?30?%}.add-btn[data-v-7aa32ac2]{position:fixed;left:%?30?%;right:%?30?%;bottom:%?16?%;z-index:95;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;width:%?690?%;height:%?80?%;font-size:%?32?%;color:#fff;background-color:#fa436a;border-radius:%?10?%;box-shadow:1px 2px 5px rgba(219,63,96,.4)}",""]),e.exports=t}}]);