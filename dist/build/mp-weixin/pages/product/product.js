(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/product/product"],{"26dd":function(t,e,n){"use strict";var i=n("d93b"),a=n.n(i);a.a},2718:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=u(n("a34a")),a=n("c4c8"),c=n("2b74"),r=u(n("c1df")),s=u(n("c7c7")),o=n("802d");function u(t){return t&&t.__esModule?t:{default:t}}function l(t){return h(t)||d(t)||p()}function p(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function d(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function h(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}function f(t,e,n,i,a,c,r){try{var s=t[c](r),o=s.value}catch(u){return void n(u)}s.done?e(o):Promise.resolve(o).then(i,a)}function g(t){return function(){var e=this,n=arguments;return new Promise((function(i,a){var c=t.apply(e,n);function r(t){f(c,i,a,r,s,"next",t)}function s(t){f(c,i,a,r,s,"throw",t)}r(void 0)}))}}var _=function(){return n.e("components/share").then(n.bind(null,"ca19"))},m=function(){return n.e("components/uni-number-box").then(n.bind(null,"7ce1"))},v=function(){return n.e("components/empty").then(n.bind(null,"d138"))},b={components:{share:_,uniNumberBox:m,empty:v},filters:{formatRichText:function(t){if(t){var e=t.replace(/<img[^>]*>/gi,(function(t,e){return t=t.replace(/style="[^"]+"/gi,"").replace(/style='[^']+'/gi,""),t=t.replace(/width="[^"]+"/gi,"").replace(/width='[^']+'/gi,""),t=t.replace(/height="[^"]+"/gi,"").replace(/height='[^']+'/gi,""),t}));return e=e.replace(/style="[^"]+"/gi,(function(t,e){return t=t.replace(/width:[^;]+;/gi,"max-width:100%;").replace(/width:[^;]+;/gi,"max-width:100%;"),t})),e=e.replace(/<br[^>]*\/>/gi,""),e=e.replace(/\<img/gi,'<img style="max-width:100%;height:auto;display:inline-block;margin:10rpx auto;"'),e}return"暂无商品详情"},time:function(t){return(0,r.default)(1e3*t).format("YYYY-MM-DD HH:mm")},maxBuyFilter:function(t){return 0===parseInt(t,10)?"不限购":"限购：".concat(t)},pointExchangeTypeFilter:function(t){var e=["","非积分兑换","积分加现金","积分兑换或直接购买","只支持积分兑换"];return e[parseInt(t,10)]},integralGiveTypeFilter:function(t){var e=["固定积分","百分比"];return e[parseInt(t,10)]},givePointFilter:function(t){return 1===parseInt(t.integral_give_type,10)?"".concat(Math.round(parseInt(t.give_point,10)/100*parseInt(t.minSkuPrice,10))," 积分"):parseInt(t.integral_give_type,10)}},data:function(){return{errorImg:s.default,serviceClass:"none",ladderPreferentialClass:"none",attributeValueClass:"none",cartType:null,maskState:0,couponList:[],productDetail:{},styleObject:{},showTypeImage:null,specClass:"none",specSelected:[],favorite:!1,shareList:[],currentStock:null,imgList:[{src:"https://gd3.alicdn.com/imgextra/i3/0/O1CN01IiyFQI1UGShoFKt1O_!!0-item_pic.jpg_400x400.jpg"},{src:"https://gd3.alicdn.com/imgextra/i3/TB1RPFPPFXXXXcNXpXXXXXXXXXX_!!0-item_pic.jpg_400x400.jpg"},{src:"https://gd2.alicdn.com/imgextra/i2/38832490/O1CN01IYq7gu1UGShvbEFnd_!!38832490.jpg_400x400.jpg"}],desc:'\n\t\t\t\t\t<div style="width:100%">\n\t\t\t\t\t\t<img style="width:100%;display:block;" src="https://gd3.alicdn.com/imgextra/i4/479184430/O1CN01nCpuLc1iaz4bcSN17_!!479184430.jpg_400x400.jpg" />\n\t\t\t\t\t\t<img style="width:100%;display:block;" src="https://gd2.alicdn.com/imgextra/i2/479184430/O1CN01gwbN931iaz4TzqzmG_!!479184430.jpg_400x400.jpg" />\n\t\t\t\t\t\t<img style="width:100%;display:block;" src="https://gd3.alicdn.com/imgextra/i3/479184430/O1CN018wVjQh1iaz4aupv1A_!!479184430.jpg_400x400.jpg" />\n\t\t\t\t\t\t<img style="width:100%;display:block;" src="https://gd4.alicdn.com/imgextra/i4/479184430/O1CN01tWg4Us1iaz4auqelt_!!479184430.jpg_400x400.jpg" />\n\t\t\t\t\t\t<img style="width:100%;display:block;" src="https://gd1.alicdn.com/imgextra/i1/479184430/O1CN01Tnm1rU1iaz4aVKcwP_!!479184430.jpg_400x400.jpg" />\n\t\t\t\t\t</div>\n\t\t\t\t',specList:[],specChildList:[],cartCount:1,product_id:null,isShowProduct:!0}},onLoad:function(){var t=g(i.default.mark((function t(e){var n=this;return i.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:this.initData(e.id),this.specList.forEach((function(t){var e=!0,i=!1,a=void 0;try{for(var c,r=n.specChildList[Symbol.iterator]();!(e=(c=r.next()).done);e=!0){var s=c.value;if(s.pid===t.id){n.$set(s,"selected",!0),n.specSelected.push(s);break}}}catch(o){i=!0,a=o}finally{try{e||null==r.return||r.return()}finally{if(i)throw a}}})),this.product_id=e.id;case 3:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}(),onShareAppMessage:function(e){var n=this;this.$post("".concat(c.transmitCreate),{topic_type:"product",topic_id:this.productDetail.id}).then((function(e){if(200===e.code)return{title:n.productDetail.name,path:"/pages/product/product?id=".concat(n.productDetail.id)};t.showToast({title:e.message,icon:"none"})})).catch((function(t){console.log(t)}))},methods:{showService:function(){0!==this.productDetail.tags.length&&(this.serviceClass="show")},showLadderPreferential:function(){0!==this.productDetail.ladderPreferential.length&&(this.ladderPreferentialClass="show")},showAttributeValue:function(){0!==this.productDetail.attributeValue.length&&(this.attributeValueClass="show")},hideService:function(){var t=this;this.serviceClass="hide",this.ladderPreferentialClass="hide",this.attributeValueClass="hide",setTimeout((function(){t.serviceClass="none",t.ladderPreferentialClass="none",t.attributeValueClass="none"}),200)},getCoupon:function(){var e=g(i.default.mark((function e(n){var a=this;return i.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.showLoading({title:"领取中..."}),e.next=3,this.$post("".concat(o.couponReceive),{id:n.id}).then((function(e){200===e.code?(a.maskState=0,t.showToast({title:"领取成功",icon:"none"})):(a.maskState=0,t.showToast({title:e.message,icon:"none"}))})).catch((function(t){console.log(t)}));case 3:case"end":return e.stop()}}),e,this)})));function n(t){return e.apply(this,arguments)}return n}(),toEvaluateList:function(){t.navigateTo({url:"/pages/evaluation/list?comment_num=".concat(this.productDetail.comment_num,"&evaluateStat=").concat(JSON.stringify(this.productDetail.evaluateStat))})},numberChange:function(t){this.cartCount=t.number},toggleMask:function(t){var e=this,n="show"===t?10:300,i="show"===t?1:0;this.maskState=2,setTimeout((function(){e.maskState=i}),n)},initData:function(){var t=g(i.default.mark((function t(e){return i.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.getProductDetail(e);case 2:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}(),getProductDetail:function(){var e=g(i.default.mark((function e(n){var c=this;return i.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.showLoading({title:"加载中..."}),e.next=3,this.$get("".concat(a.productDetail),{id:n}).then((function(e){if(200===e.code){c.isShowProduct=!0,c.productDetail=e.data,c.favorite=!!c.productDetail.myCollect,c.specList=c.productDetail.base_attribute_format,c.specList.forEach((function(t){c.specChildList=[].concat(l(c.specChildList),l(t.value))})),c.specSelected=[],e.data.base_attribute_format.forEach((function(t){t.value[0].selected=!0,c.specSelected.push(t.value[0])}));var n=[];c.specSelected.forEach((function(t){n.push(t.base_spec_value_id)})),c.productDetail.sku.forEach((function(t){t.data!==n.join("-")||(c.currentStock=t.stock)}))}else t.showToast({title:e.message,icon:"none"})})).catch((function(t){c.isShowProduct=!1,console.log(t)}));case 3:case"end":return e.stop()}}),e,this)})));function n(t){return e.apply(this,arguments)}return n}(),toggleSpec:function(){var e=this;if("show"===this.specClass){if(this.specSelected.length<this.productDetail.base_attribute_format.length)return void t.showToast({title:"请先选择规格",icon:"none"});"cart"===this.cartType?(this.cartType=null,this.handleCartItemCreate()):"buy"===this.cartType&&(this.cartType=null,this.buy()),this.specClass="hide",setTimeout((function(){e.specClass="none"}),250)}else"none"===this.specClass&&(this.specClass="show")},hideSpec:function(){var t=this;this.specClass="hide",setTimeout((function(){t.specClass="none"}),250)},handleCartItemCreate:function(){var e=g(i.default.mark((function e(){var n,c;return i.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(c=null,1!==this.productDetail.sku.length){e.next=5;break}n=this.productDetail.sku[0].id,e.next=31;break;case 5:if(1!==this.productDetail.base_attribute_format.length){e.next=14;break}if(!(this.specSelected.length<1)){e.next=11;break}return t.showToast({title:"请先选择规格",icon:"none"}),e.abrupt("return");case 11:c="".concat(this.specSelected[0].base_spec_value_id);case 12:e.next=30;break;case 14:if(2!==this.productDetail.base_attribute_format.length){e.next=23;break}if(!(this.specSelected.length<2)){e.next=20;break}return t.showToast({title:"请先选择规格",icon:"none"}),e.abrupt("return");case 20:c="".concat(this.specSelected[0].base_spec_value_id,"-").concat(this.specSelected[2].base_spec_value_id);case 21:e.next=30;break;case 23:if(3!==this.productDetail.base_attribute_format.length){e.next=30;break}if(!(this.specSelected.length<3)){e.next=29;break}return t.showToast({title:"请先选择规格",icon:"none"}),e.abrupt("return");case 29:c="".concat(this.specSelected[0].base_spec_value_id,"-").concat(this.specSelected[1].base_spec_value_id,"-").concat(this.specSelected[2].base_spec_value_id);case 30:this.productDetail&&this.productDetail.sku.forEach((function(t){t.data!==c||(n=t.id)}));case 31:return t.showLoading({title:"正在将商品添加至购物车..."}),e.next=34,this.$post("".concat(a.cartItemCreate),{sku_id:n,num:this.cartCount}).then((function(e){200===e.code?t.showToast({title:"添加成功，在购物车等亲",icon:"none"}):t.showToast({title:e.message,icon:"none"})})).catch((function(t){console.log(t)}));case 34:case"end":return e.stop()}}),e,this)})));function n(){return e.apply(this,arguments)}return n}(),selectSpec:function(t,e,n){var i=this,a=this.specChildList;a.forEach((function(t){t.base_spec_id===e&&i.$set(t,"selected",!1)})),3===parseInt(n,10)&&(this.showTypeImage=a[t].data),2===parseInt(n,10)&&(this.styleObject={color:a[t].data}),this.$set(a[t],"selected",!0),this.specSelected=[],a.forEach((function(t){!0===t.selected&&i.specSelected.push(t)}));var c=[];this.specSelected.forEach((function(t){c.push(t.base_spec_value_id)})),this.productDetail.sku.forEach((function(t){t.data!==c.join("-")||(i.currentStock=t.stock)}))},share:function(t){return"button"===t.from&&console.log(t.target),{title:"自定义分享标题",path:"/pages/test/test?id=123"}},toFavorite:function(){var t=g(i.default.mark((function t(){return i.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:this.favorite?this.handleCollectDel():this.handleCollectCreate();case 1:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),handleCollectCreate:function(){var e=g(i.default.mark((function e(){var n=this;return i.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.showLoading({title:"正在收藏..."}),e.next=3,this.$post("".concat(c.collectCreate),{topic_id:this.product_id,topic_type:"product"}).then((function(e){200===e.code?(n.favorite=!n.favorite,t.showToast({title:"收藏成功",icon:"none"})):t.showToast({title:e.message,icon:"none"})})).catch((function(t){console.log(t)}));case 3:case"end":return e.stop()}}),e,this)})));function n(){return e.apply(this,arguments)}return n}(),handleCollectDel:function(){var e=g(i.default.mark((function e(){var n=this;return i.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.showLoading({title:"加载中"}),e.next=3,this.$del("".concat(c.collectDel,"?id=").concat(this.productDetail.myCollect.id)).then((function(e){200===e.code?(n.favorite=!n.favorite,t.showToast({title:"取消收藏成功",icon:"none"})):t.showToast({title:e.message,icon:"none"})})).catch((function(t){console.log(t)}));case 3:case"end":return e.stop()}}),e,this)})));function n(){return e.apply(this,arguments)}return n}(),buy:function(){var e=g(i.default.mark((function e(){var n,a,c,r;return i.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(1!==this.productDetail.sku.length){e.next=4;break}n=this.productDetail.sku[0].id,e.next=33;break;case 4:if(1!==this.productDetail.base_attribute_format.length){e.next=14;break}if(!(this.specSelected.length<1)){e.next=10;break}return t.showToast({title:"请先选择规格",icon:"none"}),e.abrupt("return");case 10:a="".concat(this.specSelected[0].base_spec_value_id),"".concat(this.specSelected[0].title);case 12:e.next=32;break;case 14:if(2!==this.productDetail.base_attribute_format.length){e.next=24;break}if(!(this.specSelected.length<2)){e.next=20;break}return t.showToast({title:"请先选择规格",icon:"none"}),e.abrupt("return");case 20:a="".concat(this.specSelected[0].base_spec_value_id,"-").concat(this.specSelected[2].base_spec_value_id),"".concat(this.specSelected[0].title," ").concat(this.specSelected[2].title);case 22:e.next=32;break;case 24:if(3!==this.productDetail.base_attribute_format.length){e.next=32;break}if(!(this.specSelected.length<3)){e.next=30;break}return t.showToast({title:"请先选择规格",icon:"none"}),e.abrupt("return");case 30:a="".concat(this.specSelected[0].base_spec_value_id,"-").concat(this.specSelected[1].base_spec_value_id,"-").concat(this.specSelected[2].base_spec_value_id),"".concat(this.specSelected[0].title," ").concat(this.specSelected[1].title," ").concat(this.specSelected[2].title);case 32:this.productDetail&&this.productDetail.sku.forEach((function(t){t.data!==a||(n=t.id)}));case 33:c={},r={},r.sku_id=n,r.num=this.cartCount,2==this.productDetail.point_exchange_type||4==this.productDetail.point_exchange_type?c.type="point_exchange":c.type="buy_now",c.data=JSON.stringify(r),t.navigateTo({url:"/pages/order/createOrder?data=".concat(JSON.stringify(c))});case 40:case"end":return e.stop()}}),e,this)})));function n(){return e.apply(this,arguments)}return n}(),addCart:function(t){this.specClass="show",this.cartType=t},stopPrevent:function(){}}};e.default=b}).call(this,n("543d")["default"])},c2aa:function(t,e,n){"use strict";(function(t){n("6cdc"),n("921b");i(n("66fd"));var e=i(n("ee53"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},d93b:function(t,e,n){},dfd6:function(t,e,n){"use strict";n.r(e);var i=n("2718"),a=n.n(i);for(var c in i)"default"!==c&&function(t){n.d(e,t,(function(){return i[t]}))}(c);e["default"]=a.a},ee53:function(t,e,n){"use strict";n.r(e);var i=n("fbf8"),a=n("dfd6");for(var c in a)"default"!==c&&function(t){n.d(e,t,(function(){return a[t]}))}(c);n("26dd");var r=n("2877"),s=Object(r["a"])(a["default"],i["a"],i["b"],!1,null,null,null);e["default"]=s.exports},fbf8:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=(t._self._c,t._f("maxBuyFilter")(t.productDetail.max_buy)),i=t._f("pointExchangeTypeFilter")(t.productDetail.point_exchange_type),a=t._f("integralGiveTypeFilter")(t.productDetail.integral_give_type),c=t._f("givePointFilter")(t.productDetail),r=t.__map(t.productDetail.ladderPreferential,(function(e,n){var i=parseInt(e.type,10),a=parseInt(e.type,10),c=parseInt(e.price,10);return{$orig:t.__get_orig(e),m0:i,m1:a,m2:c}})),s=t._f("time")(t.productDetail.evaluate&&t.productDetail.evaluate[0]&&t.productDetail.evaluate[0].created_at),o=t._f("formatRichText")(t.productDetail.intro),u=t.__map(t.productDetail.ladderPreferential,(function(e,n){var i=parseInt(e.type,10),a=parseInt(e.type,10),c=parseInt(e.price,10);return{$orig:t.__get_orig(e),m3:i,m4:a,m5:c}})),l=t.__map(t.specList,(function(e,n){var i=parseInt(e.show_type),a=parseInt(e.show_type),c=parseInt(e.show_type),r=parseInt(e.show_type);return{$orig:t.__get_orig(e),m6:i,m7:a,m8:c,m9:r}})),p=parseInt(t.currentStock||t.productDetail.stock,10),d=t.__map(t.productDetail.canReceiveCoupon,(function(e,n){var i=parseInt(e.term_of_validity_type,10),a=t._f("time")(e.start_time),c=t._f("time")(e.end_time),r=parseInt(e.range_type,10);return{$orig:t.__get_orig(e),m11:i,f6:a,f7:c,m12:r}}));t.$mp.data=Object.assign({},{$root:{f0:n,f1:i,f2:a,f3:c,l0:r,f4:s,f5:o,l1:u,l2:l,m10:p,l3:d}})},a=[];n.d(e,"a",(function(){return i})),n.d(e,"b",(function(){return a}))}},[["c2aa","common/runtime","common/vendor"]]]);