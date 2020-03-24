(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/rf-badge/rf-badge"],{"89c5":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u={name:"UniBadge",props:{type:{type:String,default:"default"},inverted:{type:Boolean,default:!1},text:{type:[String,Number],default:""},size:{type:String,default:"normal"}},data:function(){return{badgeStyle:""}},watch:{text:function(){this.setStyle()}},mounted:function(){this.setStyle()},methods:{setStyle:function(){this.badgeStyle="width: ".concat(8*String(this.text).length+12,"px")},onClick:function(){this.$emit("click")}}};e.default=u},bb1a:function(t,e,n){"use strict";var u=n("cd2c"),a=n.n(u);a.a},bf8c:function(t,e,n){"use strict";n.r(e);var u=n("ef37"),a=n("d9e4");for(var i in a)"default"!==i&&function(t){n.d(e,t,(function(){return a[t]}))}(i);n("bb1a");var c=n("2877"),r=Object(c["a"])(a["default"],u["a"],u["b"],!1,null,"7b607b59",null);e["default"]=r.exports},cd2c:function(t,e,n){},d9e4:function(t,e,n){"use strict";n.r(e);var u=n("89c5"),a=n.n(u);for(var i in u)"default"!==i&&function(t){n.d(e,t,(function(){return u[t]}))}(i);e["default"]=a.a},ef37:function(t,e,n){"use strict";var u=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"a",(function(){return u})),n.d(e,"b",(function(){return a}))}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/rf-badge/rf-badge-create-component',
    {
        'components/rf-badge/rf-badge-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("bf8c"))
        })
    },
    [['components/rf-badge/rf-badge-create-component']]
]);                
