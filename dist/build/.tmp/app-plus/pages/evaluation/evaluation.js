(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/evaluation/evaluation"],{"1b4c":function(e,t,n){"use strict";n.r(t);var a=n("c115"),o=n("4607");for(var i in o)"default"!==i&&function(e){n.d(t,e,(function(){return o[e]}))}(i);n("2428");var u=n("2877"),r=Object(u["a"])(o["default"],a["a"],a["b"],!1,null,null,null);t["default"]=r.exports},2428:function(e,t,n){"use strict";var a=n("9ac2"),o=n.n(a);o.a},4607:function(e,t,n){"use strict";n.r(t);var a=n("89e1"),o=n.n(a);for(var i in a)"default"!==i&&function(e){n.d(t,e,(function(){return a[e]}))}(i);t["default"]=o.a},"7b83":function(e,t,n){"use strict";(function(e){n("6cdc"),n("921b");a(n("66fd"));var t=a(n("1b4c"));function a(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("6e42")["createPage"])},"89e1":function(e,t,n){"use strict";(function(e,a){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=u(n("a34a")),i=n("802d");function u(e){return e&&e.__esModule?e:{default:e}}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){s(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t,n,a,o,i,u){try{var r=e[i](u),c=r.value}catch(s){return void n(s)}r.done?t(c):Promise.resolve(c).then(a,o)}function f(e){return function(){var t=this,n=arguments;return new Promise((function(a,o){var i=e.apply(t,n);function u(e){l(i,a,o,u,r,"next",e)}function r(e){l(i,a,o,u,r,"throw",e)}u(void 0)}))}}var d=function(){return n.e("components/uni-rate/uni-rate").then(n.bind(null,"f96a"))},h=function(){return n.e("components/uni-icons/uni-icons").then(n.bind(null,"2ba4"))},p={components:{uniRate:d,uniIcons:h},data:function(){return{productInfo:{},token:null,imageList:[],content:"",anonymousText:"不匿名",evaluationType:null,evaluate:{scores:5,content:"",is_anonymous:"0",covers:"",order_product_id:""}}},computed:{wordLimit:function(){return 140-this.evaluate.content.length}},onLoad:function(t){this.productInfo=JSON.parse(t.data),this.evaluationType=t.type,this.token=e.getStorageSync("accessToken")||void 0;var n="发表评价";"add"===t.type&&(n="追加评价"),e.setNavigationBarTitle({title:n})},methods:{handleContentChange:function(e){this.evaluate.content=e.detail.value},handleScoreChange:function(e){this.evaluate.scores=e.value},handleImageDelete:function(e){this.imageList.splice(e,1)},handleAnonymousChange:function(e){e.detail.value?(this.evaluate.is_anonymous=1,this.anonymousText="匿名"):(this.evaluate.is_anonymous=0,this.anonymousText="不匿名")},uploadImage:function(){var t=this;e.chooseImage({count:6,sizeType:["original","compressed"],sourceType:["album"],success:function(e){t.handleUploadFile(e.tempFilePaths)}})},handleUploadFile:function(t){var n=this;t.forEach((function(t){e.uploadFile({url:i.uploadImage,filePath:t,name:"file",header:{"x-api-key":n.token,"merchant-id":1},formData:{"access-token":n.token,"merchant-id":1},success:function(t){e.hideLoading();var a=JSON.parse(t.data);200===a.code?n.imageList.push(a.data.url):e.showToast({title:a.message,icon:"none"})}})}))},handleEvaluate:function(){var t=f(o.default.mark((function t(){var n,a;return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:this.evaluate.order_product_id=this.productInfo.id,this.evaluate.covers=this.imageList,n={},e.showLoading({title:"评价中..."}),"add"!==this.evaluationType?(a=[],a.push(this.evaluate),n.evaluate=JSON.stringify(a),this.handleEvaluateCreate(n)):(n.again_content=this.evaluate.content,n.again_covers=JSON.stringify(this.imageList),this.handleEvaluateAgain(n));case 5:case"end":return t.stop()}}),t,this)})));function n(){return t.apply(this,arguments)}return n}(),handleEvaluateCreate:function(){var t=f(o.default.mark((function t(n){return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$post("".concat(i.evaluateCreate),c({},n)).then((function(t){200===t.code?e.navigateBack({delta:2}):e.showToast({title:t.message,icon:"none"})})).catch((function(e){console.log(a(e," at pages/evaluation/evaluation.vue:254"))}));case 2:case"end":return t.stop()}}),t,this)})));function n(e){return t.apply(this,arguments)}return n}(),handleEvaluateAgain:function(){var t=f(o.default.mark((function t(n){return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$post("".concat(i.evaluateAgain,"?order_product_id=").concat(this.productInfo.id),c({},n)).then((function(t){200===t.code?e.navigateBack({delta:2}):e.showToast({title:t.message,icon:"none"})})).catch((function(e){console.log(a(e," at pages/evaluation/evaluation.vue:276"))}));case 2:case"end":return t.stop()}}),t,this)})));function n(e){return t.apply(this,arguments)}return n}()}};t.default=p}).call(this,n("6e42")["default"],n("0de9")["default"])},"9ac2":function(e,t,n){},c115:function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement;e._self._c},o=[];n.d(t,"a",(function(){return a})),n.d(t,"b",(function(){return o}))}},[["7b83","common/runtime","common/vendor"]]]);