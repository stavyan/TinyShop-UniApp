(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/order/detail"],{"03d4":function(e,t,r){},"2ccb":function(e,t,r){"use strict";var n=r("03d4"),i=r.n(n);i.a},"467e":function(e,t,r){"use strict";r.r(t);var n=r("9aa9"),i=r("ced0");for(var a in i)"default"!==a&&function(e){r.d(t,e,(function(){return i[e]}))}(a);r("2ccb");var u=r("2877"),o=Object(u["a"])(i["default"],n["a"],n["b"],!1,null,null,null);t["default"]=o.exports},7754:function(e,t,r){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=u(r("a34a")),i=u(r("c1df")),a=r("802d");function u(e){return e&&e.__esModule?e:{default:e}}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){f(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t,r,n,i,a,u){try{var o=e[a](u),c=o.value}catch(l){return void r(l)}o.done?t(c):Promise.resolve(c).then(n,i)}function s(e){return function(){var t=this,r=arguments;return new Promise((function(n,i){var a=e.apply(t,r);function u(e){l(a,n,i,u,o,"next",e)}function o(e){l(a,n,i,u,o,"throw",e)}u(void 0)}))}}function f(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var d=function(){return r.e("components/empty").then(r.bind(null,"d138"))},v=function(){return r.e("components/mpvue-picker/mpvuePicker").then(r.bind(null,"13f1"))},p=function(){return r.e("components/rf-image/rf-image").then(r.bind(null,"b19a"))},h={components:{mpvuePicker:v,rfImage:p,empty:d},data:function(){return{orderDetail:{}}},computed:{orderTimeLine:function(){var e=[];return 0!=this.orderDetail.created_at&&e.push({time:this.orderDetail.created_at,value:"订单创建"}),this.orderDetail.close_time<((new Date).getTime()/1e3&&0!=this.orderDetail.pay_time)&&e.push({time:this.orderDetail.close_time,value:"未付款订单关闭时间"}),0!=this.orderDetail.pay_time&&e.push({time:this.orderDetail.pay_time,value:"订单支付"}),0!=this.orderDetail.shipping_time&&e.push({time:this.orderDetail.shipping_time,value:"买家要求发货"}),0!=this.orderDetail.consign_time&&e.push({time:this.orderDetail.consign_time,value:"卖家发货"}),0!=this.orderDetail.sign_time&&e.push({time:this.orderDetail.sign_time,value:"买家确认收货"}),0!=this.orderDetail.finish_time&&e.push({time:this.orderDetail.finish_time,value:"订单完成"}),e}},filters:f({time:function(e){return 0==e?"暂未操作":(0,i.default)(1e3*e).format("YYYY-MM-DD HH:mm:ss")},orderStatusFilter:function(e){var t=null,r=[{key:0,value:"待付款"},{key:1,value:"待发货"},{key:2,value:"已发货"},{key:3,value:"已收货"},{key:4,value:"已完成"},{key:-1,value:"退货申请"},{key:-2,value:"退款中"},{key:-3,value:"退款完成"},{key:-4,value:"已关闭"},{key:-5,value:"撤销申请"}];return r.forEach((function(r){r.key==e&&(t=r.value)})),t},filterProductStatus:function(e){var t=null;if(0!==parseInt(e.refund_status,10)){var r=[{key:1,value:"退款申请"},{key:2,value:"等待退货"},{key:3,value:"等待确认收货"},{key:4,value:"等待确认退款"},{key:5,value:"同意退款"},{key:-1,value:"退款已拒绝"},{key:-2,value:"退款已关闭"},{key:-3,value:"退款不通过"}];r.forEach((function(r){r.key==e.refund_status&&(t=r.value)}))}else if(4===parseInt(e.order_status,10)){var n=[{key:0,value:"未评价"},{key:1,value:"已评价"},{key:2,value:"已追评"}];n.forEach((function(r){r.key==e.is_evaluate&&(t=r.value)}))}else{var i=[{key:0,value:"待付款"},{key:1,value:"待发货"},{key:2,value:"已发货"},{key:3,value:"已收货"},{key:4,value:"已完成"},{key:-1,value:"退货申请"},{key:-2,value:"退款中"},{key:-3,value:"退款完成"},{key:-4,value:"已关闭"},{key:-5,value:"撤销申请"}];i.forEach((function(r){r.key==e.order_status&&(t=r.value)}))}return t},filterShippingType:function(e){var t=["","物流配送","买家自提","本地配送"];return t[parseInt(e,10)]}},"filterShippingType",(function(e){var t=["","物流配送","买家自提","本地配送"];return t[parseInt(e,10)]})),onLoad:function(e){this.initData(e)},methods:{navTo:function(t){e.navigateTo({url:t})},getOrderFreightFee:function(){var t=s(n.default.mark((function t(){var r,i=this;return n.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.showLoading({title:"加载中..."}),r={},this.cartIds?(r.type="cart",r.data=this.cartIds):(r.data=this.product,r.type="buy_now"),r.address_id=this.addressData.id,r.company_id=this.currentCompany.value,t.next=7,this.$get("".concat(orderFreightFee),c({},r)).then((function(e){i.shippingMoney=e.data.shipping_money})).catch((function(e){console.log(e)}));case 7:case"end":return t.stop()}}),t,this)})));function r(){return t.apply(this,arguments)}return r}(),initData:function(e){this.getOrderDetail(e.id)},getOrderDetail:function(){var t=s(n.default.mark((function t(r){var i=this;return n.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.showLoading({title:"加载中..."}),t.next=3,this.$get("".concat(a.orderDetail),{id:r}).then((function(e){i.orderDetail=e.data})).catch((function(e){console.log(e)}));case 3:case"end":return t.stop()}}),t,this)})));function r(e){return t.apply(this,arguments)}return r}()}};t.default=h}).call(this,r("a821")["default"])},"9aa9":function(e,t,r){"use strict";var n=function(){var e=this,t=e.$createElement,r=(e._self._c,e._f("orderStatusFilter")(e.orderDetail.order_status)),n=e.__map(e.orderDetail.product,(function(t,r){var n=e._f("filterProductStatus")(t);return{$orig:e.__get_orig(t),f1:n}})),i=e._f("filterShippingType")(e.orderDetail.shipping_type),a=parseInt(e.orderDetail.invoice&&e.orderDetail.invoice.type,10),u=e.__map(e.orderTimeLine,(function(t,r){var n=e._f("time")(t.time);return{$orig:e.__get_orig(t),f3:n}}));e.$mp.data=Object.assign({},{$root:{f0:r,l0:n,f2:i,m0:a,l1:u}})},i=[];r.d(t,"a",(function(){return n})),r.d(t,"b",(function(){return i}))},ced0:function(e,t,r){"use strict";r.r(t);var n=r("7754"),i=r.n(n);for(var a in n)"default"!==a&&function(e){r.d(t,e,(function(){return n[e]}))}(a);t["default"]=i.a},ec8a:function(e,t,r){"use strict";(function(e){r("6cdc"),r("921b");n(r("66fd"));var t=n(r("467e"));function n(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,r("a821")["createPage"])}},[["ec8a","common/runtime","common/vendor"]]]);