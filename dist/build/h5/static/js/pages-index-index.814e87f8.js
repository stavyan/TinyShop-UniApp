(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-index"],{1443:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"container"},[t.showHeader?i("v-uni-view",{staticClass:"status",style:{position:t.headerPosition,top:t.statusTop,opacity:t.afterHeaderOpacity}}):t._e(),t.showHeader?i("v-uni-view",{staticClass:"header",style:{position:t.headerPosition,top:t.headerTop,opacity:t.afterHeaderOpacity}},[i("v-uni-view",{staticClass:"addr",on:{click:function(e){e.stopPropagation(),e=t.$handleEvent(e),t.toCategory(e)}}},[i("v-uni-view",{staticClass:"icon yticon icon-fenlei1"}),t._v("分类")],1),i("v-uni-view",{staticClass:"input-box"},[i("v-uni-input",{staticStyle:{color:"#888"},attrs:{disabled:"",value:t.hotSearchDefault,"placeholder-style":"color:#ccc;"},on:{click:function(e){e=t.$handleEvent(e),t.toSearch(e)}}}),i("v-uni-view",{staticClass:"icon search"})],1)],1):t._e(),t.showHeader?i("v-uni-view",{staticClass:"place"}):t._e(),i("v-uni-view",{staticClass:"swiper"},[i("v-uni-view",{staticClass:"swiper-box"},[i("v-uni-swiper",{attrs:{circular:"true",autoplay:"true"},on:{change:function(e){e=t.$handleEvent(e),t.swiperChange(e)}}},t._l(t.carouselList.index_top,(function(e,a){return i("v-uni-swiper-item",{key:a,on:{click:function(i){i=t.$handleEvent(i),t.indexTopToDetailPage(e.jump_type,e.jump_link)}}},[i("v-uni-image",{attrs:{src:e.cover,mode:"aspectFill"}})],1)})),1),i("v-uni-view",{staticClass:"indicator"},t._l(t.carouselList.index_top,(function(e,a){return i("v-uni-view",{key:e.id,staticClass:"dots",class:[t.swiperCurrent>=a?"on":""]})})),1)],1)],1),i("v-uni-view",{staticClass:"category-list"},t._l(t.productCateList,(function(e,a){return i("v-uni-view",{key:a,staticClass:"category",on:{click:function(i){i.stopPropagation(),i=t.$handleEvent(i),t.navToList(e.id)}}},[i("v-uni-view",{staticClass:"img"},[i("v-uni-image",{attrs:{src:e.cover,mode:"aspectFit"}})],1),i("v-uni-view",{staticClass:"text"},[t._v(t._s(e.title))])],1)})),1),i("v-uni-view",{staticClass:"banner",on:{click:function(e){e=t.$handleEvent(e),t.indexTopToDetailPage(t.carouselList.index_new[0].jump_type,t.carouselList.index_new[0].jump_link)}}},[i("v-uni-image",{attrs:{src:t.carouselList.index_new&&t.carouselList.index_new[0].cover,mode:"scaleToFill"}})],1),i("v-uni-view",{staticClass:"f-header",on:{click:function(e){e=t.$handleEvent(e),t.toProductList({is_new:1})}}},[i("v-uni-image",{attrs:{src:"/static/h1.png"}}),i("v-uni-view",{staticClass:"tit-box"},[i("v-uni-text",{staticClass:"tit"},[t._v("新品上市")]),i("v-uni-text",{staticClass:"tit2"},[t._v("New Products Listed")])],1),i("v-uni-text",{staticClass:"yticon icon-you"})],1),i("v-uni-view",{staticClass:"guess-section"},t._l(t.newProductList,(function(e,a){return i("v-uni-view",{key:a,staticClass:"guess-item",on:{click:function(i){i=t.$handleEvent(i),t.navToDetailPage(e.id)}}},[i("v-uni-view",{staticClass:"image-wrapper"},[i("v-uni-image",{attrs:{src:e.picture,mode:"aspectFill"}}),i("v-uni-text",{staticClass:"sketch"},[t._v(t._s(e.sketch))])],1),i("v-uni-text",{staticClass:"title clamp in2line"},[t._v(t._s(e.name))]),i("v-uni-view",{staticClass:"last-line"},[i("v-uni-text",{staticClass:"price"},[t._v(t._s(e.price)),e.market_price>e.price?i("v-uni-text",{staticClass:"m-price"},[t._v("¥ "+t._s(e.market_price))]):t._e()],1),i("v-uni-text",{staticClass:"sales"},[i("v-uni-text",{staticClass:"red"},[t._v(t._s(e.sales))]),t._v("付款")],1)],1)],1)})),1),i("v-uni-view",{staticClass:"banner",on:{click:function(e){e=t.$handleEvent(e),t.indexTopToDetailPage(t.carouselList.index_recommend[0].jump_type,t.carouselList.index_recommend[0].jump_link)}}},[i("v-uni-image",{attrs:{src:t.carouselList.index_recommend&&t.carouselList.index_recommend[0].cover,mode:"scaleToFill"}})],1),i("v-uni-view",{staticClass:"f-header",on:{click:function(e){e=t.$handleEvent(e),t.toProductList({is_recommend:1})}}},[i("v-uni-image",{attrs:{src:"/static/h1.png"}}),i("v-uni-view",{staticClass:"tit-box"},[i("v-uni-text",{staticClass:"tit"},[t._v("推荐商品")]),i("v-uni-text",{staticClass:"tit2"},[t._v("Recommend Product")])],1),i("v-uni-text",{staticClass:"yticon icon-you"})],1),i("v-uni-view",{staticClass:"guess-section"},t._l(t.recommendProductList,(function(e,a){return i("v-uni-view",{key:a,staticClass:"guess-item",on:{click:function(i){i=t.$handleEvent(i),t.navToDetailPage(e.id)}}},[i("v-uni-view",{staticClass:"image-wrapper"},[i("v-uni-image",{attrs:{src:e.picture,mode:"aspectFill"}}),i("v-uni-text",{staticClass:"sketch"},[t._v(t._s(e.sketch))])],1),i("v-uni-text",{staticClass:"title clamp in2line"},[t._v(t._s(e.name))]),i("v-uni-view",{staticClass:"last-line"},[i("v-uni-text",{staticClass:"price"},[t._v(t._s(e.price)),e.market_price>e.price?i("v-uni-text",{staticClass:"m-price"},[t._v("¥ "+t._s(e.market_price))]):t._e()],1),i("v-uni-text",{staticClass:"sales"},[i("v-uni-text",{staticClass:"red"},[t._v(t._s(e.sales))]),t._v("付款")],1)],1)],1)})),1),i("v-uni-view",{staticClass:"banner",on:{click:function(e){e=t.$handleEvent(e),t.indexTopToDetailPage(t.carouselList.index_hot[0].jump_type,t.carouselList.index_hot[0].jump_link)}}},[i("v-uni-image",{attrs:{src:t.carouselList.index_hot&&t.carouselList.index_hot[0].cover,mode:"scaleToFill"}})],1),i("v-uni-view",{staticClass:"f-header",on:{click:function(e){e=t.$handleEvent(e),t.toProductList({is_hot:1})}}},[i("v-uni-image",{attrs:{src:"/static/h1.png"}}),i("v-uni-view",{staticClass:"tit-box"},[i("v-uni-text",{staticClass:"tit"},[t._v("热门商品")]),i("v-uni-text",{staticClass:"tit2"},[t._v("Hot Product")])],1),i("v-uni-text",{staticClass:"yticon icon-you"})],1),i("v-uni-view",{staticClass:"guess-section"},t._l(t.hotProductList,(function(e,a){return i("v-uni-view",{key:a,staticClass:"guess-item",on:{click:function(i){i=t.$handleEvent(i),t.navToDetailPage(e.id)}}},[i("v-uni-view",{staticClass:"image-wrapper"},[i("v-uni-image",{attrs:{src:e.picture,mode:"aspectFill"}}),i("v-uni-text",{staticClass:"sketch"},[t._v(t._s(e.sketch))])],1),i("v-uni-text",{staticClass:"title clamp in2line"},[t._v(t._s(e.name))]),i("v-uni-view",{staticClass:"last-line"},[i("v-uni-text",{staticClass:"price"},[t._v(t._s(e.price)),e.market_price>e.price?i("v-uni-text",{staticClass:"m-price"},[t._v("¥ "+t._s(e.market_price))]):t._e()],1),i("v-uni-text",{staticClass:"sales"},[i("v-uni-text",{staticClass:"red"},[t._v(t._s(e.sales))]),t._v("付款")],1)],1)],1)})),1),i("v-uni-view",{staticClass:"f-header m-t",on:{click:function(e){e=t.$handleEvent(e),t.toProductList({guessYouLike:1})}}},[i("v-uni-image",{attrs:{src:"/static/h1.png"}}),i("v-uni-view",{staticClass:"tit-box"},[i("v-uni-text",{staticClass:"tit"},[t._v("猜你喜欢")]),i("v-uni-text",{staticClass:"tit2"},[t._v("Guess You Like It")])],1),i("v-uni-text",{staticClass:"yticon icon-you"})],1),i("v-uni-view",{staticClass:"guess-section"},t._l(t.guessYouLikeProductList,(function(e,a){return i("v-uni-view",{key:a,staticClass:"guess-item",on:{click:function(i){i=t.$handleEvent(i),t.navToDetailPage(e.id)}}},[i("v-uni-view",{staticClass:"image-wrapper"},[i("v-uni-image",{attrs:{src:e.picture,mode:"aspectFill"}}),i("v-uni-text",{staticClass:"sketch"},[t._v(t._s(e.sketch))])],1),i("v-uni-text",{staticClass:"title in2line"},[t._v(t._s(e.name))]),i("v-uni-view",{staticClass:"last-line"},[i("v-uni-text",{staticClass:"price"},[t._v(t._s(e.price)),e.market_price>e.price?i("v-uni-text",{staticClass:"m-price"},[t._v("¥ "+t._s(e.market_price))]):t._e()],1),i("v-uni-text",{staticClass:"sales"},[i("v-uni-text",{staticClass:"red"},[t._v(t._s(e.sales))]),t._v("付款")],1)],1)],1)})),1),i("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:t.config.web_site_icp,expression:"config.web_site_icp"}],staticClass:"copyright"},[t._v(t._s(t.config.copyright_desc)),i("a",{attrs:{href:"http://www.beian.miit.gov.cn"}},[t._v(t._s(t.config.web_site_icp))])])],1)},n=[];i.d(e,"a",(function(){return a})),i.d(e,"b",(function(){return n}))},"3f39":function(t,e,i){"use strict";var a=i("f7de"),n=i.n(a);n.a},4516:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"uni-grid-wrap"},[i("v-uni-view",{ref:"uni-grid",staticClass:"uni-grid",class:{"uni-grid--border":t.showBorder},style:{"border-left-style":"solid","border-left-color":t.borderColor,"border-left-width":t.showBorder?"1px":0},attrs:{id:t.elId}},[t._t("default")],2)],1)},n=[];i.d(e,"a",(function(){return a})),i.d(e,"b",(function(){return n}))},"46aa":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,i("ac6a"),i("6b54"),i("c5f6");var a={name:"UniGrid",props:{column:{type:Number,default:3},showBorder:{type:Boolean,default:!0},borderColor:{type:String,default:"#e5e5e5"},square:{type:Boolean,default:!0},highlight:{type:Boolean,default:!0}},provide:function(){return{grid:this}},data:function(){var t="Uni_".concat(Math.ceil(1e6*Math.random()).toString(36));return{elId:t,width:0}},created:function(){this.children=[]},mounted:function(){this.init()},methods:{init:function(){var t=this;setTimeout((function(){t._getSize((function(e){t.children.forEach((function(t,i){t.width=e}))}))}),50)},change:function(t){this.$emit("change",t)},_getSize:function(t){var e=this;uni.createSelectorQuery().in(this).select("#".concat(this.elId)).boundingClientRect().exec((function(i){e.width=parseInt((i[0].width-1)/e.column)+"px",t(e.width)}))}}};e.default=a},6279:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,i("ac6a"),i("c5f6");var a={name:"UniGridItem",inject:["grid"],props:{index:{type:Number,default:0}},data:function(){return{column:0,showBorder:!0,square:!0,highlight:!0,left:0,top:0,openNum:2,width:0,borderColor:"#e5e5e5"}},created:function(){this.column=this.grid.column,this.showBorder=this.grid.showBorder,this.square=this.grid.square,this.highlight=this.grid.highlight,this.top=0===this.hor?this.grid.hor:this.hor,this.left=0===this.ver?this.grid.ver:this.ver,this.borderColor=this.grid.borderColor,this.grid.children.push(this),this.width=this.grid.width},beforeDestroy:function(){var t=this;this.grid.children.forEach((function(e,i){e===t&&t.grid.children.splice(i,1)}))},methods:{_onClick:function(){this.grid.change({detail:{index:this.index}})}}};e.default=a},"6aef":function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,'uni-page-body[data-v-012963c4]{position:relative;background-color:#fff}.status[data-v-012963c4]{width:100%;height:0;position:fixed;z-index:10;background-color:#fff;top:0}.header[data-v-012963c4]{width:96%;height:%?100?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;position:fixed;top:0;z-index:10;background-color:#fff}.header .addr[data-v-012963c4]{width:%?120?%;height:%?60?%;-webkit-flex-shrink:0;flex-shrink:0;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;font-size:%?28?%}.header .addr .icon[data-v-012963c4]{height:%?60?%;margin-right:%?5?%;margin-left:%?15?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;font-size:%?38?%;color:#fa436a}.header .input-box[data-v-012963c4]{width:100%;height:%?60?%;background-color:#f5f5f5;border-radius:%?30?%;position:relative;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.header .input-box .icon[data-v-012963c4]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;position:absolute;top:0;right:0;width:%?60?%;height:%?60?%;font-size:%?34?%;color:silver}.header .input-box uni-input[data-v-012963c4]{width:100%;padding-left:%?28?%;height:%?28?%;font-size:%?28?%}.header .icon-btn[data-v-012963c4]{width:%?120?%;height:%?60?%;-webkit-flex-shrink:0;flex-shrink:0;display:-webkit-box;display:-webkit-flex;display:flex}.header .icon-btn .icon[data-v-012963c4]{width:%?60?%;height:%?60?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:end;-webkit-justify-content:flex-end;justify-content:flex-end;-webkit-box-align:center;-webkit-align-items:center;align-items:center;font-size:%?42?%}.place[data-v-012963c4]{background-color:#fff;height:%?100?%}.swiper[data-v-012963c4]{width:100%;margin-top:%?10?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.swiper .swiper-box[data-v-012963c4]{width:92%;height:40vw;overflow:hidden;border-radius:%?15?%;box-shadow:%?0?% %?8?% %?25?% rgba(0,0,0,.2);position:relative;z-index:1}.swiper .swiper-box uni-swiper[data-v-012963c4]{width:100%;height:40vw}.swiper .swiper-box uni-swiper uni-swiper-item uni-image[data-v-012963c4]{width:100%;height:40vw}.swiper .swiper-box .indicator[data-v-012963c4]{position:absolute;bottom:%?20?%;left:%?20?%;background-color:hsla(0,0%,100%,.4);width:%?150?%;height:%?5?%;border-radius:%?3?%;overflow:hidden;display:-webkit-box;display:-webkit-flex;display:flex}.swiper .swiper-box .indicator .dots[data-v-012963c4]{width:%?0?%;background-color:#fff;-webkit-transition:all .3s ease-out;transition:all .3s ease-out}.swiper .swiper-box .indicator .dots.on[data-v-012963c4]{width:50%}.category-list[data-v-012963c4]{width:100%;padding:0 0 %?30?% 0;border-bottom:solid %?2?% #f6f6f6;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-flex-wrap:wrap;flex-wrap:wrap}.category-list .category[data-v-012963c4]{width:20%;margin-top:%?50?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap}.category-list .category .img[data-v-012963c4]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.category-list .category .img uni-image[data-v-012963c4]{width:9vw;height:9vw}.category-list .category .text[data-v-012963c4]{margin-top:%?16?%;width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;font-size:%?24?%;color:#3c3c3c}.banner[data-v-012963c4]{width:92%;margin:%?20?% 4% 0}.banner uni-image[data-v-012963c4]{width:100%;height:22vw;border-radius:11vw;box-shadow:%?0?% %?5?% %?25?% rgba(0,0,0,.3)}.m-t[data-v-012963c4]{margin-top:%?16?%}.carousel-section[data-v-012963c4]{position:relative}.carousel-section .titleNview-placing[data-v-012963c4]{height:0;padding-top:44px;box-sizing:initial}.carousel-section .titleNview-background[data-v-012963c4]{position:absolute;top:0;left:0;width:100%;height:%?426?%;-webkit-transition:.4s;transition:.4s}.carousel[data-v-012963c4]{width:100%;height:%?350?%}.carousel .carousel-item[data-v-012963c4]{width:100%;height:100%;overflow:hidden}.carousel uni-image[data-v-012963c4]{width:92%;margin:0 4%;height:100%;border-radius:%?10?%}.swiper-dots[data-v-012963c4]{display:-webkit-box;display:-webkit-flex;display:flex;position:absolute;left:%?60?%;bottom:%?15?%;width:%?72?%;height:%?36?%;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABkCAYAAADDhn8LAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTk4MzlBNjE0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTk4MzlBNjA0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0E3RUNERkE0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0E3RUNERkI0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4Gh5BPAAACTUlEQVR42uzcQW7jQAwFUdN306l1uWwNww5kqdsmm6/2MwtVCp8CosQtP9vg/2+/gY+DRAMBgqnjIp2PaCxCLLldpPARRIiFj1yBbMV+cHZh9PURRLQNhY8kgWyL/WDtwujjI8hoE8rKLqb5CDJaRMJHokC6yKgSCR9JAukmokIknCQJpLOIrJFwMsBJELFcKHwM9BFkLBMKFxNcBCHlQ+FhoocgpVwwnv0Xn30QBJGMC0QcaBVJiAMiec/dcwKuL4j1QMsVCXFAJE4s4NQA3K/8Y6DzO4g40P7UcmIBJxbEesCKWBDg8wWxHrAiFgT4fEGsB/CwIhYE+AeBAAdPLOcV8HRmWRDAiQVcO7GcV8CLM8uCAE4sQCDAlHcQ7x+ABQEEAggEEAggEEAggEAAgQACASAQQCCAQACBAAIBBAIIBBAIIBBAIABe4e9iAe/xd7EAJxYgEGDeO4j3EODp/cOCAE4sYMyJ5cwCHs4rCwI4sYBxJ5YzC84rCwKcXxArAuthQYDzC2JF0H49LAhwYUGsCFqvx5EF2T07dMaJBetx4cRyaqFtHJ8EIhK0i8OJBQxcECuCVutxJhCRoE0cZwMRyRcFefa/ffZBVPogePihhyCnbBhcfMFFEFM+DD4m+ghSlgmDkwlOgpAl4+BkkJMgZdk4+EgaSCcpVX7bmY9kgXQQU+1TgE0c+QJZUUz1b2T4SBbIKmJW+3iMj2SBVBWz+leVfCQLpIqYbp8b85EskIxyfIOfK5Sf+wiCRJEsllQ+oqEkQfBxmD8BBgA5hVjXyrBNUQAAAABJRU5ErkJggg==);background-size:100% 100%}.swiper-dots .num[data-v-012963c4]{width:%?36?%;height:%?36?%;border-radius:50px;font-size:%?24?%;color:#fff;text-align:center;line-height:%?36?%}.swiper-dots .sign[data-v-012963c4]{position:absolute;top:0;left:50%;line-height:%?36?%;font-size:%?12?%;color:#fff;-webkit-transform:translateX(-50%);transform:translateX(-50%)}.grid[data-v-012963c4]{background-color:#fff;margin:%?10?% 0}.grid .grid-title[data-v-012963c4]{width:100%;font-size:%?34?%;color:#303133;margin:0 %?10?% %?10?%}.grid .grid-item[data-v-012963c4]{text-align:center}.grid .grid-item .grid-item-image[data-v-012963c4]{margin:%?4?% auto;width:%?90?%;height:%?90?%;border-radius:50%;opacity:.7;box-shadow:%?4?% %?4?% %?20?% rgba(250,67,106,.3)}.ad-1[data-v-012963c4]{width:100%;height:%?200?%;padding:%?10?% 0;background:#fff;margin:%?10?% 0}.ad-1 uni-image[data-v-012963c4]{border-radius:%?100?%;width:100%;height:100%}.f-header[data-v-012963c4]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;height:%?140?%;padding:%?6?% %?30?% %?8?%;background:#fff}.f-header uni-image[data-v-012963c4]{-webkit-flex-shrink:0;flex-shrink:0;width:%?80?%;height:%?80?%;margin-right:%?20?%}.f-header .tit-box[data-v-012963c4]{-webkit-box-flex:1;-webkit-flex:1;flex:1;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column}.f-header .tit[data-v-012963c4]{font-size:%?34?%;color:#font-color-dark;line-height:1.3}.f-header .tit2[data-v-012963c4]{font-size:%?24?%;color:#909399}.f-header .icon-you[data-v-012963c4]{font-size:%?34?%;color:#909399}.hot-floor[data-v-012963c4]{width:100%;overflow:hidden;margin-bottom:%?20?%}.hot-floor .floor-img-box[data-v-012963c4]{width:100%;height:%?320?%;position:relative}.hot-floor .floor-img-box[data-v-012963c4]:after{content:"";position:absolute;left:0;top:0;width:100%;height:100%;background:-webkit-linear-gradient(hsla(0,0%,100%,.06) 30%,#f8f8f8);background:linear-gradient(hsla(0,0%,100%,.06) 30%,#f8f8f8)}.hot-floor .floor-img[data-v-012963c4]{width:100%;height:100%}.hot-floor .floor-list[data-v-012963c4]{white-space:nowrap;padding:%?20?%;padding-right:%?50?%;border-radius:%?6?%;margin-top:%?-140?%;margin-left:%?30?%;background:#fff;box-shadow:1px 1px 5px rgba(0,0,0,.2);position:relative;z-index:1}.hot-floor .scoll-wrapper[data-v-012963c4]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:start;-webkit-align-items:flex-start;align-items:flex-start}.hot-floor .floor-item[data-v-012963c4]{width:%?180?%;margin-right:%?20?%;font-size:%?26?%;color:#303133;line-height:1.8}.hot-floor .floor-item uni-image[data-v-012963c4]{width:%?180?%;height:%?180?%;border-radius:%?6?%}.hot-floor .floor-item .price[data-v-012963c4]{color:#fa436a}.hot-floor .more[data-v-012963c4]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-flex-shrink:0;flex-shrink:0;width:%?180?%;height:%?180?%;border-radius:%?6?%;background:#f3f3f3;font-size:%?28?%;color:#909399}.hot-floor .more uni-text[data-v-012963c4]:first-child{margin-bottom:%?4?%}.guess-section[data-v-012963c4]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap;padding:0 %?30?%;background:#fff}.guess-section .guess-item[data-v-012963c4]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;width:48%;padding-bottom:%?40?%}.guess-section .guess-item[data-v-012963c4]:nth-child(odd){margin-right:4%}.guess-section .image-wrapper[data-v-012963c4]{width:100%;height:%?330?%;border-radius:3px;overflow:hidden;position:relative}.guess-section .image-wrapper uni-image[data-v-012963c4]{width:100%;height:100%;opacity:1}.guess-section .image-wrapper .sketch[data-v-012963c4]{background-color:rgba(0,0,0,.4);position:absolute;bottom:%?4?%;padding:0 %?8?%;right:0;color:#fff;font-size:%?24?%}.guess-section .title[data-v-012963c4]{font-size:%?28?%;color:#303133;line-height:%?40?%}.guess-section .last-line[data-v-012963c4]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.guess-section .last-line .red[data-v-012963c4]{color:#fa436a;font-size:%?26?%;margin-right:%?4?%}.guess-section .price[data-v-012963c4]{font-size:%?32?%;color:#fa436a;line-height:1}.guess-section .price[data-v-012963c4]:before{content:"￥";font-size:%?26?%}.guess-section .price .m-price[data-v-012963c4]{margin-left:%?8?%;color:#909399;font-size:%?24?%;text-decoration:line-through}.copyright[data-v-012963c4]{margin:%?10?% 0;width:100%;text-align:center;color:#666}.copyright a[data-v-012963c4]{display:block;color:#666;text-decoration:none}body.?%PAGE?%[data-v-012963c4]{background-color:#fff}',""]),t.exports=e},"6fbc":function(t,e,i){"use strict";var a=i("a1be"),n=i.n(a);n.a},8069:function(t,e,i){"use strict";i.r(e);var a=i("c973"),n=i.n(a);for(var r in a)"default"!==r&&function(t){i.d(e,t,(function(){return a[t]}))}(r);e["default"]=n.a},a0f7:function(t,e,i){"use strict";i.r(e);var a=i("46aa"),n=i.n(a);for(var r in a)"default"!==r&&function(t){i.d(e,t,(function(){return a[t]}))}(r);e["default"]=n.a},a1be:function(t,e,i){var a=i("ea48");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("9cf3be08",a,!0,{sourceMap:!1,shadowMode:!1})},aa3e:function(t,e,i){var a=i("6aef");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("6dba2227",a,!0,{sourceMap:!1,shadowMode:!1})},bbc1:function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,".uni-grid-wrap[data-v-9de5e218]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-flex:1;-webkit-flex:1;flex:1;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;width:100%}.uni-grid[data-v-9de5e218]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-flex-wrap:wrap;flex-wrap:wrap}.uni-grid--border[data-v-9de5e218]{border-left-color:#c8c7cc;border-left-style:solid;border-left-width:1px}",""]),t.exports=e},c4c8:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.brandList=e.orderPreview=e.evaluateList=e.orderFreightFee=e.orderPay=e.orderClose=e.orderCreate=e.cartItemUpdateNum=e.cartItemClear=e.cartItemDel=e.cartItemList=e.cartItemCreate=e.productDetail=e.guessYouLikeList=e.productList=e.productCateList=e.productCate=e.indexList=void 0;var a="/tiny-shop/v1/index/index";e.indexList=a;var n="/tiny-shop/v1/product/cate/index";e.productCate=n;var r="/tiny-shop/v1/product/cate/list";e.productCateList=r;var o="/tiny-shop/v1/product/product/index";e.productList=o;var s="/tiny-shop/v1/product/product/view";e.productDetail=s;var c="/tiny-shop/v1/product/product/guess-you-like";e.guessYouLikeList=c;var d="/tiny-shop/v1/member/cart-item/create";e.cartItemCreate=d;var l="/tiny-shop/v1/member/cart-item/index";e.cartItemList=l;var u="/tiny-shop/v1/member/cart-item/delete-ids";e.cartItemDel=u;var h="/tiny-shop/v1/member/cart-item/clear";e.cartItemClear=h;var p="/tiny-shop/v1/member/cart-item/update-num";e.cartItemUpdateNum=p;var f="/tiny-shop/v1/order/order/create";e.orderCreate=f;var g="/tiny-shop/v1/order/order/preview";e.orderPreview=g;var v="/tiny-shop/v1/member/order/close";e.orderClose=v;var w="/tiny-shop/v1/common/pay/create";e.orderPay=w;var b="/tiny-shop/v1/order/order/freight-fee";e.orderFreightFee=b;var m="/tiny-shop/v1/product/evaluate/index";e.evaluateList=m;var x="/tiny-shop/v1/product/brand/index";e.brandList=x},c973:function(t,e,i){"use strict";var a=i("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,i("386d"),i("96cf");var n=a(i("3b8d"));i("4917");var r=i("c4c8"),o=a(i("cff3")),s=a(i("e395")),c=a(i("2ba4")),d={components:{uniGrid:o.default,uniIcons:c.default,uniGridItem:s.default},data:function(){return{showHeader:!0,afterHeaderOpacity:1,headerPosition:"fixed",headerTop:null,statusTop:null,nVueTitle:null,city:"北京",currentSwiper:0,swiperList:[{id:1,src:"url1",img:"/static/img/1.jpg"},{id:2,src:"url2",img:"/static/img/2.jpg"},{id:3,src:"url3",img:"/static/img/3.jpg"}],categoryList:[{id:1,name:"办公",img:"/static/img/category/1.png"},{id:2,name:"家电",img:"/static/img/category/2.png"},{id:3,name:"服饰",img:"/static/img/category/3.png"},{id:4,name:"日用",img:"/static/img/category/4.png"},{id:5,name:"蔬果",img:"/static/img/category/5.png"},{id:6,name:"运动",img:"/static/img/category/6.png"},{id:7,name:"书籍",img:"/static/img/category/7.png"},{id:8,name:"文具",img:"/static/img/category/8.png"}],titleNViewBackground:"",swiperCurrent:0,swiperLength:0,carouselList:{},search:{},hotSearchDefault:"输入关键字搜索",hotProductList:[],recommendProductList:[],guessYouLikeProductList:[],newProductList:[],productCateList:[],brandList:[],config:{}}},onLoad:function(t){this.initData(t)},onPullDownRefresh:function(){this.getIndexList("refresh")},methods:{initData:function(t){if(this.code=t.code,this.isWechat()&&!this.code){var e=window.location.href;window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?\n\t\t\t\tappid=wx869d264c83ad71cc&\n\t\t\t\tredirect_uri=".concat(e,"&\n\t\t\t\tresponse_type=code&\n\t\t\t\tscope=snsapi_userinfo&\n\t\t\t\tstate=STATE#wechat_redirect")}this.getIndexList()},isWechat:function(){var t=window.navigator.userAgent.toLowerCase();return"micromessenger"==t.match(/micromessenger/i)},navToList:function(t){uni.navigateTo({url:"/pages/product/list?cate_id=".concat(t)})},indexTopToDetailPage:function(t,e){var i;switch(t){case"product_view":i="/pages/product/product?id=".concat(e);break;case"article_view":uni.showToast({title:"article_view",icon:"none"});break;case"coupon_view":i="/pages/coupon/detail?id=".concat(e);break;case"helper_view":uni.showToast({title:"helper_view",icon:"none"});break;case"product_list_for_cate":i="/pages/product/list?cate_id=".concat(e);break;default:break}i&&uni.navigateTo({url:i})},toProductList:function(t){uni.navigateTo({url:"/pages/product/list?params=".concat(JSON.stringify(t))})},getBrandList:function(){var t=(0,n.default)(regeneratorRuntime.mark((function t(){var e=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return uni.showLoading({title:"加载中..."}),t.next=3,this.$get("".concat(r.brandList),{}).then((function(t){200===t.code?e.brandList=t.data:uni.showToast({title:t.message,icon:"none"})})).catch((function(t){console.log(t)}));case 3:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),getIndexList:function(){var t=(0,n.default)(regeneratorRuntime.mark((function t(e){var i=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return uni.showLoading({title:"加载中..."}),t.next=3,this.$get("".concat(r.indexList),{}).then((function(t){"refresh"===e&&uni.stopPullDownRefresh(),200===t.code?(i.getBrandList(),i.productCateList=t.data.cate,i.carouselList=t.data.adv,i.search=t.data.search,i.hotSearchDefault="请输入关键字 如: ".concat(t.data.search.hot_search_default),uni.setStorage({key:"hotSearchDefault",data:t.data.search.hot_search_default}),i.hotProductList=t.data.product_hot,i.recommendProductList=t.data.product_recommend,i.guessYouLikeProductList=t.data.guess_you_like,i.newProductList=t.data.product_new,i.config=t.data.config):uni.showToast({title:t.message,icon:"none"})})).catch((function(t){console.log(t)}));case 3:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}(),swiperChange:function(t){var e=t.detail.current;this.swiperCurrent=e},navToDetailPage:function(t){t&&uni.navigateTo({url:"/pages/product/product?id=".concat(t)})},toSearch:function(){uni.navigateTo({url:"/pages/search/search?search=".concat(JSON.stringify(this.search))})},toCategory:function(){uni.reLaunch({url:"/pages/category/category"})}},onNavigationBarSearchInputClicked:function(){var t=(0,n.default)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:uni.navigateTo({url:"/pages/search/search?search=".concat(JSON.stringify(this.search))});case 1:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),onNavigationBarButtonTap:function(t){var e=t.index;0===e?this.$api.msg("点击了扫描"):1===e&&uni.navigateTo({url:"/pages/notice/notice"})}};e.default=d},cff3:function(t,e,i){"use strict";i.r(e);var a=i("4516"),n=i("a0f7");for(var r in n)"default"!==r&&function(t){i.d(e,t,(function(){return n[t]}))}(r);i("3f39");var o=i("2877"),s=Object(o["a"])(n["default"],a["a"],a["b"],!1,null,"9de5e218",null);e["default"]=s.exports},d259:function(t,e,i){"use strict";i.r(e);var a=i("6279"),n=i.n(a);for(var r in a)"default"!==r&&function(t){i.d(e,t,(function(){return a[t]}))}(r);e["default"]=n.a},d635:function(t,e,i){"use strict";var a=i("aa3e"),n=i.n(a);n.a},e395:function(t,e,i){"use strict";i.r(e);var a=i("f184"),n=i("d259");for(var r in n)"default"!==r&&function(t){i.d(e,t,(function(){return n[t]}))}(r);i("6fbc");var o=i("2877"),s=Object(o["a"])(n["default"],a["a"],a["b"],!1,null,"cadcde9e",null);e["default"]=s.exports},ea48:function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,".uni-grid-item[data-v-cadcde9e]{height:100%;display:-webkit-box;display:-webkit-flex;display:flex}.uni-grid-item__box[data-v-cadcde9e]{display:-webkit-box;display:-webkit-flex;display:flex;width:100%;position:relative;-webkit-box-flex:1;-webkit-flex:1;flex:1;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column}.uni-grid-item--border[data-v-cadcde9e]{position:relative;border-bottom-color:#c8c7cc;border-bottom-style:solid;border-bottom-width:1px;border-right-color:#c8c7cc;border-right-style:solid;border-right-width:1px}.uni-grid-item--border-top[data-v-cadcde9e]{border-top-color:#c8c7cc;border-top-style:solid;border-top-width:1px;height:100%;box-sizing:border-box}.uni-highlight[data-v-cadcde9e]:active{background-color:#f1f1f1}",""]),t.exports=e},f184:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.width?i("v-uni-view",{staticClass:"uni-grid-item",style:"width:"+t.width+";"+(t.square?"height:"+t.width:"")},[i("v-uni-view",{staticClass:"uni-grid-item__box",class:{"uni-grid-item--border":t.showBorder,"uni-grid-item--border-top":t.showBorder&&t.index<t.column,"uni-highlight":t.highlight},style:{"border-right-color":t.borderColor,"border-bottom-color":t.borderColor,"border-top-color":t.borderColor},on:{click:function(e){e=t.$handleEvent(e),t._onClick(e)}}},[t._t("default")],2)],1):t._e()},n=[];i.d(e,"a",(function(){return a})),i.d(e,"b",(function(){return n}))},f75a:function(t,e,i){"use strict";i.r(e);var a=i("1443"),n=i("8069");for(var r in n)"default"!==r&&function(t){i.d(e,t,(function(){return n[t]}))}(r);i("d635");var o=i("2877"),s=Object(o["a"])(n["default"],a["a"],a["b"],!1,null,"012963c4",null);e["default"]=s.exports},f7de:function(t,e,i){var a=i("bbc1");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("d87c593a",a,!0,{sourceMap:!1,shadowMode:!1})}}]);