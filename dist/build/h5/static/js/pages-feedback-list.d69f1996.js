(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-feedback-list"],{1728:function(e,t,i){"use strict";var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",{staticClass:"content b-t"},[e._l(e.feedbackList,(function(t,a){return i("v-uni-view",{key:a,staticClass:"list b-b",on:{click:function(i){i=e.$handleEvent(i),e.navToDetail(t.id)}}},[i("v-uni-view",{staticClass:"wrapper"},[i("v-uni-view",{staticClass:"address-box"},[i("v-uni-text",{staticClass:"tag"},[e._v(e._s(e._f("feedbackFilter")(t.type)))]),i("v-uni-text",{staticClass:"address in1line"},[e._v(e._s(t.content))])],1),i("v-uni-view",{staticClass:"u-box"},[i("v-uni-text",{staticClass:"name"},[e._v(e._s(t.reply||"管理员未回复"))]),i("v-uni-text",{staticClass:"mobile"},[e._v("联系方式："+e._s(t.contact_way||"暂无"))])],1)],1)],1)})),0===e.feedbackList.length?i("empty",{attrs:{info:"您还没有反馈意见"}}):i("rf-load-more",{attrs:{status:e.loadingType}}),i("v-uni-button",{staticClass:"add-btn",on:{click:function(t){t=e.$handleEvent(t),e.addFeedback()}}},[e._v("意见反馈")])],2)},n=[];i.d(t,"a",(function(){return a})),i.d(t,"b",(function(){return n}))},"1af6":function(e,t,i){var a=i("63b6");a(a.S,"Array",{isArray:i("9003")})},"20fd":function(e,t,i){"use strict";var a=i("d9f6"),n=i("aebd");e.exports=function(e,t,i){t in e?a.f(e,t,n(0,i)):e[t]=i}},2676:function(e,t,i){var a=i("beef");"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var n=i("4f06").default;n("6d030e44",a,!0,{sourceMap:!1,shadowMode:!1})},"2e41":function(e,t,i){"use strict";var a=i("efef"),n=i.n(a);n.a},"348c":function(e,t,i){"use strict";i.r(t);var a=i("c531"),n=i.n(a);for(var o in a)"default"!==o&&function(e){i.d(t,e,(function(){return a[e]}))}(o);t["default"]=n.a},5376:function(e,t,i){"use strict";var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",{staticClass:"rf-load-more"},[i("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:"loading"===e.status&&e.showIcon,expression:"status === 'loading' && showIcon"}],staticClass:"rf-load-more__img"},[i("v-uni-view",{staticClass:"load1"},[i("v-uni-view",{style:{background:e.color}}),i("v-uni-view",{style:{background:e.color}}),i("v-uni-view",{style:{background:e.color}}),i("v-uni-view",{style:{background:e.color}})],1),i("v-uni-view",{staticClass:"load2"},[i("v-uni-view",{style:{background:e.color}}),i("v-uni-view",{style:{background:e.color}}),i("v-uni-view",{style:{background:e.color}}),i("v-uni-view",{style:{background:e.color}})],1),i("v-uni-view",{staticClass:"load3"},[i("v-uni-view",{style:{background:e.color}}),i("v-uni-view",{style:{background:e.color}}),i("v-uni-view",{style:{background:e.color}}),i("v-uni-view",{style:{background:e.color}})],1)],1),i("v-uni-text",{staticClass:"rf-load-more__text",style:{color:e.color}},[e._v(e._s("more"===e.status?e.contentText.contentdown:"loading"===e.status?e.contentText.contentrefresh:e.contentText.contentnomore))])],1)},n=[];i.d(t,"a",(function(){return a})),i.d(t,"b",(function(){return n}))},"549b":function(e,t,i){"use strict";var a=i("d864"),n=i("63b6"),o=i("241e"),r=i("b0dc"),d=i("3702"),s=i("b447"),c=i("20fd"),l=i("7cd6");n(n.S+n.F*!i("4ee1")((function(e){Array.from(e)})),"Array",{from:function(e){var t,i,n,u,f=o(e),v="function"==typeof this?this:Array,b=arguments.length,p=b>1?arguments[1]:void 0,m=void 0!==p,h=0,y=l(f);if(m&&(p=a(p,b>2?arguments[2]:void 0,2)),void 0==y||v==Array&&d(y))for(t=s(f.length),i=new v(t);t>h;h++)c(i,h,m?p(f[h],h):f[h]);else for(u=y.call(f),i=new v;!(n=u.next()).done;h++)c(i,h,m?r(u,p,[n.value,h],!0):n.value);return i.length=h,i}})},"54a1":function(e,t,i){i("6c1c"),i("1654"),e.exports=i("95d5")},6872:function(e,t,i){"use strict";i.r(t);var a=i("b9cb"),n=i.n(a);for(var o in a)"default"!==o&&function(e){i.d(t,e,(function(){return a[e]}))}(o);t["default"]=n.a},7005:function(e,t,i){"use strict";i.r(t);var a=i("1728"),n=i("348c");for(var o in n)"default"!==o&&function(e){i.d(t,e,(function(){return n[e]}))}(o);i("2e41");var r=i("2877"),d=Object(r["a"])(n["default"],a["a"],a["b"],!1,null,"ee1cb2b6",null);t["default"]=d.exports},"75fc":function(e,t,i){"use strict";i.r(t);var a=i("a745"),n=i.n(a);function o(e){if(n()(e)){for(var t=0,i=new Array(e.length);t<e.length;t++)i[t]=e[t];return i}}var r=i("774e"),d=i.n(r),s=i("c8bb"),c=i.n(s);function l(e){if(c()(Object(e))||"[object Arguments]"===Object.prototype.toString.call(e))return d()(e)}function u(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function f(e){return o(e)||l(e)||u()}i.d(t,"default",(function(){return f}))},"774e":function(e,t,i){e.exports=i("d2d5")},"7f3d":function(e,t,i){var a=i("24fb");t=a(!1),t.push([e.i,"uni-page-body[data-v-ee1cb2b6]{padding-bottom:%?120?%}.content[data-v-ee1cb2b6]{position:relative}.list[data-v-ee1cb2b6]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding:%?20?% %?30?%;background:#fff;position:relative}.wrapper[data-v-ee1cb2b6]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-flex:1;-webkit-flex:1;flex:1}.address-box[data-v-ee1cb2b6]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.address-box .tag[data-v-ee1cb2b6]{font-size:%?24?%;color:#fa436a;margin-right:%?10?%;background:#fffafb;border:1px solid #ffb4c7;border-radius:%?4?%;padding:%?4?% %?10?%;line-height:1}.address-box .address[data-v-ee1cb2b6]{font-size:%?30?%;color:#303133}.u-box[data-v-ee1cb2b6]{font-size:%?28?%;color:#909399;margin-top:%?16?%}.u-box .name[data-v-ee1cb2b6]{margin-right:%?30?%}.icon-bianji[data-v-ee1cb2b6]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;height:%?80?%;font-size:%?40?%;color:#909399;padding-left:%?30?%}.add-btn[data-v-ee1cb2b6]{position:fixed;left:%?30?%;right:%?30?%;bottom:%?16?%;z-index:95;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;width:%?690?%;height:%?80?%;font-size:%?32?%;color:#fff;background-color:#fa436a;border-radius:%?10?%;box-shadow:1px 2px 5px rgba(219,63,96,.4)}",""]),e.exports=t},"802d":function(e,t,i){"use strict";var a=i("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.rechargeConfigIndex=t.thirdPartyAuthDelete=t.thirdPartyAuthList=t.opinionDetail=t.opinionCreate=t.opinionList=t.uploadBase64Image=t.uploadImage=t.orderInvoiceList=t.invoiceDel=t.invoiceDefault=t.invoiceDetail=t.invoiceUpdate=t.invoiceCreate=t.invoiceList=t.evaluateAgain=t.evaluateCreate=t.creditsLogList=t.collectList=t.footPrintDel=t.footPrintList=t.couponReceive=t.orderTakeDelivery=t.orderDelete=t.orderDetail=t.closeOrderRefundApply=t.orderRefundApply=t.orderList=t.couponDetail=t.couponClear=t.myCouponList=t.couponList=t.addressDelete=t.addressUpdate=t.addressDetail=t.addressDefault=t.addressCreate=t.addressList=t.memberUpdate=t.memberInfo=void 0;var n=a(i("3e3e")),o="/tiny-shop/v1/member/member/index";t.memberInfo=o;var r="/tiny-shop/v1/member/member/update";t.memberUpdate=r;var d="/tiny-shop/v1/member/address/index";t.addressList=d;var s="/tiny-shop/v1/member/address/default";t.addressDefault=s;var c="/tiny-shop/v1/member/address/view";t.addressDetail=c;var l="/tiny-shop/v1/member/address/create";t.addressCreate=l;var u="/tiny-shop/v1/member/address/update";t.addressUpdate=u;var f="/tiny-shop/v1/member/address/delete";t.addressDelete=f;var v="/tiny-shop/v1/marketing/coupon-type/index";t.couponList=v;var b="/tiny-shop/v1/member/coupon/index";t.myCouponList=b;var p="/tiny-shop/v1/marketing/coupon-type/view";t.couponDetail=p;var m="/tiny-shop/v1/marketing/coupon-type/create";t.couponReceive=m;var h="/tiny-shop/v1/member/coupon/clear";t.couponClear=h;var y="/tiny-shop/v1/member/order/index";t.orderList=y;var w="/tiny-shop/v1/member/order/take-delivery";t.orderTakeDelivery=w;var g="/tiny-shop/v1/member/order-product/refund-apply";t.orderRefundApply=g;var x="/tiny-shop/v1/member/order-product/refund-close";t.closeOrderRefundApply=x;var k="/tiny-shop/v1/member/order/view";t.orderDetail=k;var _="/tiny-shop/v1/member/order/delete";t.orderDelete=_;var L="/tiny-shop/v1/member/footprint/index";t.footPrintList=L;var D="/tiny-shop/v1/member/footprint/delete";t.footPrintDel=D;var C="/tiny-shop/v1/member/collect/index";t.collectList=C;var A="/tiny-shop/v1/member/credits-log/index";t.creditsLogList=A;var I="/tiny-shop/v1/member/evaluate/create";t.evaluateCreate=I;var j="/tiny-shop/v1/member/evaluate/again";t.evaluateAgain=j;var P="/tiny-shop/v1/member/invoice/index";t.invoiceList=P;var T="/tiny-shop/v1/member/invoice/create";t.invoiceCreate=T;var O="/tiny-shop/v1/member/invoice/update";t.invoiceUpdate=O;var R="/tiny-shop/v1/member/invoice/view";t.invoiceDetail=R;var F="/tiny-shop/v1/member/invoice/default";t.invoiceDefault=F;var z="/tiny-shop/v1/member/invoice/delete";t.invoiceDel=z;var M="/tiny-shop/v1/member/order-invoice/index";t.orderInvoiceList=M;var U="/tiny-shop/v1/member/opinion/index";t.opinionList=U;var E="/tiny-shop/v1/member/opinion/create";t.opinionCreate=E;var S="/tiny-shop/v1/member/opinion/view";t.opinionDetail=S;var B="/tiny-shop/v1/member/auth/index";t.thirdPartyAuthList=B;var $="/tiny-shop/v1/member/auth/delete";t.thirdPartyAuthDelete=$;var J="/tiny-shop/v1/member/recharge-config/index";t.rechargeConfigIndex=J;var G="".concat(n.default,"/tiny-shop/v1/common/file/images");t.uploadImage=G;var N="".concat(n.default,"/tiny-shop/v1/common/file/base64");t.uploadBase64Image=N},"95d5":function(e,t,i){var a=i("40c3"),n=i("5168")("iterator"),o=i("481b");e.exports=i("584a").isIterable=function(e){var t=Object(e);return void 0!==t[n]||"@@iterator"in t||o.hasOwnProperty(a(t))}},a745:function(e,t,i){e.exports=i("f410")},b499:function(e,t,i){"use strict";var a=i("2676"),n=i.n(a);n.a},b9cb:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={name:"rf-load-more",props:{status:{type:String,default:"more"},showIcon:{type:Boolean,default:!0},color:{type:String,default:"#777777"},contentText:{type:Object,default:function(){return{contentdown:"上拉显示更多",contentrefresh:"正在加载...",contentnomore:"—— 全部都被你看完了 ——"}}}},data:function(){return{}}};t.default=a},beef:function(e,t,i){var a=i("24fb");t=a(!1),t.push([e.i,".rf-load-more[data-v-af6b40c4]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;height:%?80?%;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.rf-load-more__text[data-v-af6b40c4]{font-size:%?28?%;color:#999}.rf-load-more__img[data-v-af6b40c4]{height:24px;width:24px;margin-right:10px}.rf-load-more__img>uni-view[data-v-af6b40c4]{position:absolute}.rf-load-more__img>uni-view uni-view[data-v-af6b40c4]{width:6px;height:2px;border-top-left-radius:1px;border-bottom-left-radius:1px;background:#999;position:absolute;opacity:.2;-webkit-transform-origin:50%;transform-origin:50%;-webkit-animation:load-data-v-af6b40c4 1.56s ease infinite;animation:load-data-v-af6b40c4 1.56s ease infinite}.rf-load-more__img>uni-view uni-view[data-v-af6b40c4]:first-child{-webkit-transform:rotate(90deg);transform:rotate(90deg);top:2px;left:9px}.rf-load-more__img>uni-view uni-view[data-v-af6b40c4]:nth-child(2){-webkit-transform:rotate(180deg);transform:rotate(180deg);top:11px;right:0}.rf-load-more__img>uni-view uni-view[data-v-af6b40c4]:nth-child(3){-webkit-transform:rotate(270deg);transform:rotate(270deg);bottom:2px;left:9px}.rf-load-more__img>uni-view uni-view[data-v-af6b40c4]:nth-child(4){top:11px;left:0}.load1[data-v-af6b40c4],.load2[data-v-af6b40c4],.load3[data-v-af6b40c4]{height:24px;width:24px}.load2[data-v-af6b40c4]{-webkit-transform:rotate(30deg);transform:rotate(30deg)}.load3[data-v-af6b40c4]{-webkit-transform:rotate(60deg);transform:rotate(60deg)}.load1 uni-view[data-v-af6b40c4]:first-child{-webkit-animation-delay:0s;animation-delay:0s}.load2 uni-view[data-v-af6b40c4]:first-child{-webkit-animation-delay:.13s;animation-delay:.13s}.load3 uni-view[data-v-af6b40c4]:first-child{-webkit-animation-delay:.26s;animation-delay:.26s}.load1 uni-view[data-v-af6b40c4]:nth-child(2){-webkit-animation-delay:.39s;animation-delay:.39s}.load2 uni-view[data-v-af6b40c4]:nth-child(2){-webkit-animation-delay:.52s;animation-delay:.52s}.load3 uni-view[data-v-af6b40c4]:nth-child(2){-webkit-animation-delay:.65s;animation-delay:.65s}.load1 uni-view[data-v-af6b40c4]:nth-child(3){-webkit-animation-delay:.78s;animation-delay:.78s}.load2 uni-view[data-v-af6b40c4]:nth-child(3){-webkit-animation-delay:.91s;animation-delay:.91s}.load3 uni-view[data-v-af6b40c4]:nth-child(3){-webkit-animation-delay:1.04s;animation-delay:1.04s}.load1 uni-view[data-v-af6b40c4]:nth-child(4){-webkit-animation-delay:1.17s;animation-delay:1.17s}.load2 uni-view[data-v-af6b40c4]:nth-child(4){-webkit-animation-delay:1.3s;animation-delay:1.3s}.load3 uni-view[data-v-af6b40c4]:nth-child(4){-webkit-animation-delay:1.43s;animation-delay:1.43s}@-webkit-keyframes load-data-v-af6b40c4{0%{opacity:1}to{opacity:.2}}",""]),e.exports=t},c531:function(e,t,i){"use strict";var a=i("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=a(i("75fc"));i("96cf");var o=a(i("3b8d")),r=i("802d"),d=a(i("d138")),s=a(i("f97d")),c={components:{empty:d.default,rfLoadMore:s.default},data:function(){return{page:1,timeOutEvent:0,source:0,feedbackList:[],loadingType:"more"}},filters:{feedbackFilter:function(e){var t=["","功能建议","BUG反馈","业务咨询"];return t[parseInt(e,10)]}},onLoad:function(e){this.source=e.source},onPullDownRefresh:function(){this.page=1,this.feedbackList.length=0,this.getFeedbackList("refresh")},onReachBottom:function(){this.page++,this.getFeedbackList()},onShow:function(){this.initData()},methods:{initData:function(){this.page=1,this.getFeedbackList()},getFeedbackList:function(){var e=(0,o.default)(regeneratorRuntime.mark((function e(t){var i=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return uni.showLoading({title:"加载中..."}),e.next=3,this.$get("".concat(r.opinionList),{page:this.page}).then((function(e){"refresh"===t&&uni.stopPullDownRefresh(),i.loadingType=10===e.data.length?"more":"nomore",i.feedbackList=[].concat((0,n.default)(i.feedbackList),(0,n.default)(e.data))})).catch((function(e){console.log(e)}));case 3:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),addFeedback:function(){uni.navigateTo({url:"/pages/feedback/feedback"})},navToDetail:function(e){uni.navigateTo({url:"/pages/feedback/detail?id=".concat(e)})},refreshList:function(e,t){this.feedbackList.unshift(e),console.log(e,t)}}};t.default=c},c8bb:function(e,t,i){e.exports=i("54a1")},d2d5:function(e,t,i){i("1654"),i("549b"),e.exports=i("584a").Array.from},efef:function(e,t,i){var a=i("7f3d");"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var n=i("4f06").default;n("0aac152c",a,!0,{sourceMap:!1,shadowMode:!1})},f410:function(e,t,i){i("1af6"),e.exports=i("584a").Array.isArray},f97d:function(e,t,i){"use strict";i.r(t);var a=i("5376"),n=i("6872");for(var o in n)"default"!==o&&function(e){i.d(t,e,(function(){return n[e]}))}(o);i("b499");var r=i("2877"),d=Object(r["a"])(n["default"],a["a"],a["b"],!1,null,"af6b40c4",null);t["default"]=d.exports}}]);