(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-search-search"],{"061e":function(A,e,t){"use strict";var i=function(){var A=this,e=A.$createElement,t=A._self._c||e;return t("v-uni-view",{staticClass:"content"},[t("v-uni-view",{staticClass:"search-box"},[t("mSearch",{staticClass:"mSearch-input-box",attrs:{mode:2,button:"inside",placeholder:A.defaultKeyword},on:{search:function(e){e=A.$handleEvent(e),A.doSearch(!1)},confirm:function(e){e=A.$handleEvent(e),A.doSearch(!1)}},model:{value:A.keyword,callback:function(e){A.keyword=e},expression:"keyword"}})],1),t("v-uni-view",{staticClass:"search-keyword",on:{touchstart:function(e){e=A.$handleEvent(e),A.blur(e)}}},[t("v-uni-scroll-view",{directives:[{name:"show",rawName:"v-show",value:A.isShowKeywordList,expression:"isShowKeywordList"}],staticClass:"keyword-list-box",attrs:{"scroll-y":""}},A._l(A.keywordList,(function(e){return t("v-uni-view",{key:e.keyword,staticClass:"keyword-entry",attrs:{"hover-class":"keyword-entry-tap"}},[t("v-uni-view",{staticClass:"keyword-text",on:{click:function(t){t=A.$handleEvent(t),A.doSearch(e.keyword)}}},[t("v-uni-rich-text",{attrs:{nodes:e.htmlStr}})],1),t("v-uni-view",{staticClass:"keyword-img",on:{click:function(t){t=A.$handleEvent(t),A.setkeyword(e)}}},[t("v-uni-image",{attrs:{src:"/static/HM-search/back.png"}})],1)],1)})),1),t("v-uni-scroll-view",{directives:[{name:"show",rawName:"v-show",value:!A.isShowKeywordList,expression:"!isShowKeywordList"}],staticClass:"keyword-box",attrs:{"scroll-y":""}},[A.oldKeywordList.length>0?t("v-uni-view",{staticClass:"keyword-block"},[t("v-uni-view",{staticClass:"keyword-list-header"},[t("v-uni-view",[A._v("历史搜索")]),t("v-uni-view",[t("v-uni-image",{attrs:{src:"/static/HM-search/delete.png"},on:{click:function(e){e=A.$handleEvent(e),A.oldDelete(e)}}})],1)],1),t("v-uni-view",{staticClass:"keyword"},A._l(A.oldKeywordList,(function(e,i){return t("v-uni-view",{key:i,on:{click:function(t){t=A.$handleEvent(t),A.doSearch(e)}}},[A._v(A._s(e))])})),1)],1):A._e(),t("v-uni-view",{staticClass:"keyword-block"},[t("v-uni-view",{staticClass:"keyword-list-header"},[t("v-uni-view",[A._v("热门搜索")]),t("v-uni-view",[t("v-uni-image",{attrs:{src:"/static/HM-search/attention"+A.forbid+".png"},on:{click:function(e){e=A.$handleEvent(e),A.hotToggle(e)}}})],1)],1),""==A.forbid?t("v-uni-view",{staticClass:"keyword"},A._l(A.hotKeywordList,(function(e,i){return t("v-uni-view",{key:i,on:{click:function(t){t=A.$handleEvent(t),A.doSearch(e)}}},[A._v(A._s(e))])})),1):t("v-uni-view",{staticClass:"hide-hot-tis"},[t("v-uni-view",[A._v("当前搜热门搜索已隐藏")])],1)],1)],1)],1)],1)},n=[];t.d(e,"a",(function(){return i})),t.d(e,"b",(function(){return n}))},"0ad2":function(A,e,t){"use strict";var i=function(){var A=this,e=A.$createElement,t=A._self._c||e;return t("v-uni-view",{staticClass:"serach"},[t("v-uni-view",{staticClass:"content",style:{"border-radius":A.radius+"px"}},[t("v-uni-view",{staticClass:"content-box",class:{center:2===A.mode},on:{click:function(e){e=A.$handleEvent(e),A.getFocus(e)}}},[t("v-uni-view",{staticClass:"yticon icon-sousuo"}),t("v-uni-input",{staticClass:"input",class:{center:!A.active&&2===A.mode},attrs:{placeholder:A.placeholder,"confirm-type":"search",focus:A.isFocus},on:{input:function(e){e=A.$handleEvent(e),A.inputChange(e)},confirm:function(e){e=A.$handleEvent(e),A.triggerConfirm(e)},focus:function(e){e=A.$handleEvent(e),A.focus(e)},blur:function(e){e=A.$handleEvent(e),A.blur(e)}},model:{value:A.inputVal,callback:function(e){A.inputVal=e},expression:"inputVal"}}),A.isDelShow?t("v-uni-text",{staticClass:"icon icon-del",on:{click:function(e){e.stopPropagation(),e=A.$handleEvent(e),A.clear(e)}}}):A._e()],1),t("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:A.active&&A.show&&"inside"===A.button||A.isDelShow&&"inside"===A.button,expression:"(active&&show&&button === 'inside')||(isDelShow && button === 'inside')"}],staticClass:"serachBtn",on:{click:function(e){e=A.$handleEvent(e),A.search(e)}}},[A._v("搜索")])],1),"outside"===A.button?t("v-uni-view",{staticClass:"button",class:{active:A.show||A.active},on:{click:function(e){e=A.$handleEvent(e),A.search(e)}}},[t("v-uni-view",{staticClass:"button-item"},[A._v(A._s(A.show?"搜索":A.searchName))])],1):A._e()],1)},n=[];t.d(e,"a",(function(){return i})),t.d(e,"b",(function(){return n}))},"20ab":function(A,e,t){var i=t("34cd");"string"===typeof i&&(i=[[A.i,i,""]]),i.locals&&(A.exports=i.locals);var n=t("4f06").default;n("63257542",i,!0,{sourceMap:!1,shadowMode:!1})},"219a":function(A,e,t){"use strict";t.r(e);var i=t("0ad2"),n=t("b5d0");for(var a in n)"default"!==a&&function(A){t.d(e,A,(function(){return n[A]}))}(a);t("29b7");var o=t("2877"),s=Object(o["a"])(n["default"],i["a"],i["b"],!1,null,"4b9a3250",null);e["default"]=s.exports},"29b7":function(A,e,t){"use strict";var i=t("20ab"),n=t.n(i);n.a},"34cd":function(A,e,t){e=A.exports=t("24fb")(!1),e.push([A.i,'.serach[data-v-4b9a3250]{display:-webkit-box;display:-webkit-flex;display:flex;width:100%;box-sizing:border-box;font-size:%?28?%}.serach .content[data-v-4b9a3250]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;width:100%;height:%?60?%;background:#fff;overflow:hidden;-webkit-transition:all .2s linear;transition:all .2s linear;border-radius:30px}.serach .content .content-box[data-v-4b9a3250]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.serach .content .content-box .yticon[data-v-4b9a3250]{color:grey;margin:0 %?6?% 0 %?12?%}.serach .content .content-box.center[data-v-4b9a3250]{-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.serach .content .content-box .input[data-v-4b9a3250]{width:100%;max-width:100%;line-height:%?60?%;height:%?60?%;-webkit-transition:all .2s linear;transition:all .2s linear}.serach .content .content-box .input.center[data-v-4b9a3250]{width:%?200?%}.serach .content .content-box .input.sub[data-v-4b9a3250]{width:auto;color:grey}.serach .content .serachBtn[data-v-4b9a3250]{height:100%;-webkit-flex-shrink:0;flex-shrink:0;padding:0 %?30?%;background:-webkit-linear-gradient(left,rgba(250,67,106,.7),rgba(250,67,106,.9));background:linear-gradient(90deg,rgba(250,67,106,.7),rgba(250,67,106,.9));line-height:%?60?%;color:#fff;-webkit-transition:all .3s;transition:all .3s}.serach .button[data-v-4b9a3250]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;position:relative;-webkit-flex-shrink:0;flex-shrink:0;width:0;-webkit-transition:all .2s linear;transition:all .2s linear;white-space:nowrap;overflow:hidden}.serach .button.active[data-v-4b9a3250]{padding-left:%?15?%;width:%?100?%}@font-face{font-family:iconfont;src:url("data:application/x-font-woff;charset=utf-8;base64,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")}.icon[data-v-4b9a3250]{font-family:iconfont;font-size:%?32?%;font-style:normal;color:#999}',""])},"59f2":function(A,e,t){"use strict";var i=t("defb"),n=t.n(i);n.a},6008:function(A,e,t){"use strict";var i=t("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,t("a481"),t("386d");var n=i(t("219a")),a={data:function(){return{defaultKeyword:"",keyword:"",oldKeywordList:[],hotKeywordList:[],keywordList:[],forbid:"",isShowKeywordList:!1}},onLoad:function(A){this.init(A)},components:{mSearch:n.default},methods:{init:function(A){var e=JSON.parse(A.search);this.defaultKeyword=e.hot_search_default,this.hotKeywordList=e.hot_search_list,this.loadOldKeyword()},blur:function(){uni.hideKeyboard()},loadOldKeyword:function(){var A=this;uni.getStorage({key:"OldKeys",success:function(e){var t=JSON.parse(e.data);A.oldKeywordList=t}})},drawCorrelativeKeyword:function(A,e){for(var t=A.length,i=[],n=0;n<t;n++){var a=A[n],o=a[0].replace(e,"<span style='color: #9f9f9f;'>"+e+"</span>");o="<div>"+o+"</div>";var s={keyword:a[0],htmlStr:o};i.push(s)}return i},inputChange:function(A){},setkeyword:function(A){this.keyword=A.keyword},oldDelete:function(){var A=this;uni.showModal({content:"确定清除历史搜索记录？",success:function(e){e.confirm?(A.oldKeywordList=[],uni.removeStorage({key:"OldKeys"})):e.cancel}})},hotToggle:function(){this.forbid=this.forbid?"":"_forbid"},doSearch:function(A){A=A||(this.keyword?this.keyword:this.defaultKeyword),this.keyword=A,this.saveKeyword(A),uni.showToast({title:A,icon:"none",duration:2e3}),uni.navigateTo({url:"/pages/product/list?keyword=".concat(A)})},saveKeyword:function(A){var e=this;uni.getStorage({key:"OldKeys",success:function(t){var i=JSON.parse(t.data),n=i.indexOf(A);-1==n?i.unshift(A):(i.splice(n,1),i.unshift(A)),i.length>10&&i.pop(),uni.setStorage({key:"OldKeys",data:JSON.stringify(i)}),e.oldKeywordList=i},fail:function(t){var i=[A];uni.setStorage({key:"OldKeys",data:JSON.stringify(i)}),e.oldKeywordList=i}})}}};e.default=a},"650b":function(A,e,t){"use strict";t.r(e);var i=t("061e"),n=t("e143f");for(var a in n)"default"!==a&&function(A){t.d(e,A,(function(){return n[A]}))}(a);t("59f2");var o=t("2877"),s=Object(o["a"])(n["default"],i["a"],i["b"],!1,null,"0c31c6a2",null);e["default"]=s.exports},"76d9":function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,t("c5f6");var i={props:{mode:{value:Number,default:1},placeholder:{value:String,default:"请输入搜索内容"},value:{type:String,default:!1},button:{value:String,default:"outside"},show:{value:Boolean,default:!0},radius:{value:String,default:60}},data:function(){return{active:!1,inputVal:"",searchName:"取消",isDelShow:!1,isFocus:!1}},methods:{triggerConfirm:function(){this.$emit("confirm",!1)},inputChange:function(A){var e=A.detail.value;this.$emit("input",e),this.inputVal&&(this.isDelShow=!0)},focus:function(){this.active=!0,this.inputVal&&(this.isDelShow=!0)},blur:function(){this.isFocus=!1,this.inputVal||(this.active=!1)},clear:function(){uni.hideKeyboard(),this.isFocus=!1,this.inputVal="",this.active=!1,this.$emit("input","")},getFocus:function(){this.isFocus=!0},search:function(){if(!this.inputVal&&!this.show&&"取消"==this.searchName)return uni.hideKeyboard(),this.isFocus=!1,void(this.active=!1);console.log(this.inputVal),this.$emit("search",this.inputVal?this.inputVal:this.placeholder)}},watch:{inputVal:function(A){A?this.searchName="搜索":(this.searchName="取消",this.isDelShow=!1)},value:function(A){this.inputVal=A}}};e.default=i},"7f58":function(A,e,t){e=A.exports=t("24fb")(!1),e.push([A.i,"uni-view[data-v-0c31c6a2]{display:block}.search-box[data-v-0c31c6a2]{width:100%;background-color:#f2f2f2;padding:%?15?% 2.5%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.search-box .mSearch-input-box[data-v-0c31c6a2]{width:100%}.search-box .input-box[data-v-0c31c6a2]{width:85%;-webkit-flex-shrink:1;flex-shrink:1;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.search-box .search-btn[data-v-0c31c6a2]{width:15%;margin:0 0 0 2%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-flex-shrink:0;flex-shrink:0;font-size:%?28?%;color:#fff;background:-webkit-linear-gradient(left,#ff9801,#ff570a);background:linear-gradient(90deg,#ff9801,#ff570a);border-radius:%?60?%}.search-box .input-box>uni-input[data-v-0c31c6a2]{width:100%;height:%?60?%;font-size:%?32?%;border:0;border-radius:%?60?%;-webkit-appearance:none;-moz-appearance:none;appearance:none;padding:0 3%;margin:0;background-color:#fff}.placeholder-class[data-v-0c31c6a2]{color:#9e9e9e}.search-keyword[data-v-0c31c6a2]{width:100%;background-color:#f2f2f2}.keyword-list-box[data-v-0c31c6a2]{height:calc(100vh - %?110?%);padding-top:%?10?%;border-radius:%?20?% %?20?% 0 0;background-color:#fff}.keyword-entry-tap[data-v-0c31c6a2]{background-color:#eee}.keyword-entry[data-v-0c31c6a2]{width:94%;height:%?80?%;margin:0 3%;font-size:%?30?%;color:#333;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center;border-bottom:solid %?1?% #e7e7e7}.keyword-entry uni-image[data-v-0c31c6a2]{width:%?60?%;height:%?60?%}.keyword-entry .keyword-img[data-v-0c31c6a2],.keyword-entry .keyword-text[data-v-0c31c6a2]{height:%?80?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.keyword-entry .keyword-text[data-v-0c31c6a2]{width:90%}.keyword-entry .keyword-img[data-v-0c31c6a2]{width:10%;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.keyword-box[data-v-0c31c6a2]{border-radius:%?20?% %?20?% 0 0;background-color:#fff}.keyword-box .keyword-block[data-v-0c31c6a2]{padding:%?10?% 0}.keyword-box .keyword-block .keyword-list-header[data-v-0c31c6a2]{width:100vw;padding:%?10?% 3%;font-size:%?27?%;color:#333;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.keyword-box .keyword-block .keyword-list-header uni-image[data-v-0c31c6a2]{width:%?40?%;height:%?40?%}.keyword-box .keyword-block .keyword[data-v-0c31c6a2]{width:100vw;padding:3px 3%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-flex-flow:wrap;flex-flow:wrap;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start}.keyword-box .keyword-block .hide-hot-tis[data-v-0c31c6a2]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;font-size:%?28?%;color:#6b6b6b}.keyword-box .keyword-block .keyword>uni-view[data-v-0c31c6a2]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;border-radius:%?60?%;padding:0 %?20?%;margin:%?10?% %?20?% %?10?% 0;height:%?60?%;font-size:%?28?%;background-color:#f2f2f2;color:#6b6b6b}",""])},b5d0:function(A,e,t){"use strict";t.r(e);var i=t("76d9"),n=t.n(i);for(var a in i)"default"!==a&&function(A){t.d(e,A,(function(){return i[A]}))}(a);e["default"]=n.a},defb:function(A,e,t){var i=t("7f58");"string"===typeof i&&(i=[[A.i,i,""]]),i.locals&&(A.exports=i.locals);var n=t("4f06").default;n("7d454498",i,!0,{sourceMap:!1,shadowMode:!1})},e143f:function(A,e,t){"use strict";t.r(e);var i=t("6008"),n=t.n(i);for(var a in i)"default"!==a&&function(A){t.d(e,A,(function(){return i[A]}))}(a);e["default"]=n.a}}]);