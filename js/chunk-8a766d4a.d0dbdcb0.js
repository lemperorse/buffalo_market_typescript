(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8a766d4a"],{"0921":function(e,t,n){"use strict";n("b5d3")},"129f":function(e,t){e.exports=Object.is||function(e,t){return e===t?0!==e||1/e===1/t:e!=e&&t!=t}},"130f":function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"fixed w-full h-28 bgnav1",staticStyle:{"z-index":"100"}},[n("div",{staticClass:" p-2 md:pl-20 md:pr-20 "},[e.response?n("div",{staticClass:"flex  overflow-y-hidden\toverflow-x-auto\t "},[n("v-btn",{attrs:{small:"",text:"",dark:""},on:{click:function(t){return e.goPageTab(1)}}},[e._v(e._s(e.$txt.web_nav.product))]),n("v-btn",{attrs:{small:"",text:"",dark:""},on:{click:function(t){return e.goPageTab(2)}}},[e._v(" "+e._s(e.$txt.web_nav.map))]),n("v-spacer"),n("v-btn",{attrs:{small:"",text:"",dark:""},on:{click:function(t){return e.gotoHelp()}}},[e._v(" "+e._s(e.$txt.web_nav.help))]),n("v-btn",{attrs:{small:"",text:"",dark:""},on:{click:function(t){e.dialogLang=!0}}},[e._v(e._s(e.$txt.web_nav.language))]),e.logined?n("v-menu",{attrs:{"offset-y":""},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on,a=t.attrs;return[n("v-btn",e._g(e._b({attrs:{text:"",small:"",dark:""}},"v-btn",a,!1),r),[n("v-icon",[e._v("mdi-account-circle")]),e._v(e._s(e.user.first_name)+" ")],1)]}}],null,!1,2737595249)},[n("v-list",[n("v-btn",{staticClass:"w-full",attrs:{text:""},on:{click:function(t){return e.$router.push("/user/profileuser")}}},[e._v(e._s(e._lang("โปรไฟล์","Profile","个人资料")))]),n("v-btn",{staticClass:"w-full",attrs:{text:""},on:{click:function(t){return e.$router.push("/user/post/")}}},[e._v(e._s(e._lang("จัดการประกาศ","Announcements","管理公告")))]),n("v-btn",{staticClass:"w-full",attrs:{text:""},on:{click:function(t){return e.logout()}}},[e._v(e._s(e._lang("ออกจากระบบ","Logout","登出")))])],1)],1):e._e(),e.logined?e._e():n("v-btn",{attrs:{small:"",text:"",dark:""},on:{click:function(t){return e.$router.push("/register")}}},[e._v(" "+e._s(e.$txt.web_nav.register))]),e.logined?e._e():n("v-btn",{attrs:{small:"",text:"",dark:""},on:{click:function(t){return e.$router.push("/login")}}},[e._v(" "+e._s(e.$txt.web_nav.login))]),n("v-btn",{staticClass:"invisible  md:visible",attrs:{small:"",outlined:"",dark:""},on:{click:function(t){return e.$router.push("/register")}}},[e._v(" "+e._s(e.$txt.web_nav.download))])],1):e._e(),n("div",{staticClass:"flex pt-2"},[n("h2",{staticClass:"text-base md:text-xl logo-font pon",staticStyle:{cursor:"pointer"},on:{click:function(t){return e.$router.push("/")}}},[e._v(" "+e._s(e.$txt.name)+" ")]),n("form",{staticClass:"w-2/3 flex pl-4",on:{submit:function(t){return t.preventDefault(),e.goSearch()}}},[n("div",{staticClass:"bg-white flex rounded-full shadow-lg "},[e._m(0),n("input",{directives:[{name:"model",rawName:"v-model",value:e.search,expression:"search"}],staticClass:"w-full ",attrs:{type:"text",placeholder:e.$txt.web_nav.searchTxt},domProps:{value:e.search},on:{input:function(t){t.target.composing||(e.search=t.target.value)}}}),n("v-btn",{staticClass:"bgs ",attrs:{type:"submit",fab:"",dark:""}},[e._v(e._s(e.$txt.web_nav.search))])],1)])])]),n("v-dialog",{attrs:{scrollable:"",overlay:!1,"max-width":"500px",transition:"dialog-transition"},model:{value:e.dialogLang,callback:function(t){e.dialogLang=t},expression:"dialogLang"}},[n("v-card",{staticClass:"rounded-lg"},[n("v-card-title",{attrs:{"primary-title":""}},[e._v(" "+e._s(e.$txt.language_choose)+" "),n("v-spacer"),n("v-btn",{staticClass:"elevation-0",attrs:{dark:"",fab:"",small:"",color:"red"},on:{click:function(t){e.dialogLang=!1}}},[n("v-icon",[e._v("mdi-close")])],1)],1),n("v-card-text",[n("div",{staticClass:"flex flex-col mt-2"},[n("v-btn",{staticClass:"transition duration-500 ease-in-out transform hover:-translate-x-1 hover:scale-90",attrs:{depressed:"",rounded:"",color:"success"},on:{click:function(t){return e.changeLanguage("th")}}},[e._v(" ภาษาไทย")]),e._v(" "),n("br"),n("v-btn",{staticClass:"transition duration-500 ease-in-out transform hover:-translate-x-1 hover:scale-90",attrs:{depressed:"",rounded:"",color:"error"},on:{click:function(t){return e.changeLanguage("ch")}}},[e._v(" 中文")]),n("br"),n("v-btn",{staticClass:"transition duration-500 ease-in-out transform hover:-translate-x-1 hover:scale-90",attrs:{depressed:"",rounded:"",color:"primary"},on:{click:function(t){return e.changeLanguage("en")}}},[e._v(" English")]),n("br")],1)])],1)],1)],1)},a=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("span",{staticClass:"w-auto flex justify-end items-center text-gray-500 p-3"},[n("i",{staticClass:"fas fa-search text-xl"})])}],i=(n("ac1f"),n("841c"),n("96cf"),n("1da1")),s=n("d4ec"),o=n("bee2"),c=n("262e"),l=n("2caf"),u=n("9ab4"),d=n("3951"),h=n("60a3"),v=function(e){Object(c["a"])(n,e);var t=Object(l["a"])(n);function n(){var e;return Object(s["a"])(this,n),e=t.apply(this,arguments),e.dialogLang=!1,e.user=null,e.search="",e.response=!1,e}return Object(o["a"])(n,[{key:"created",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,d["a"].checkToken();case 2:if(!d["a"].logined){e.next=6;break}return e.next=5,d["a"].getUser();case 5:this.user=e.sent;case 6:this.response=!0;case 7:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"changeLanguage",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.dialogLang=!1,e.next=3,localStorage.setItem("language",t);case 3:return e.next=5,location.reload();case 5:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"goSearch",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.$router.push("/?search=".concat(this.search));case 2:return e.next=4,location.reload();case 4:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"goPageTab",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.$router.push("/?tab=".concat(t));case 2:return e.next=4,location.reload();case 4:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"logout",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,d["a"].logout();case 2:return e.next=4,this.$router.push("/");case 4:return e.next=6,location.reload();case 6:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"gotoHelp",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,window.open("https://docs.google.com/document/d/1JzhXn1UksQ9rgVzus0VwBAHBoieGpSKdV1jypj5B7XE/edit?usp=sharing","_blank");case 2:case"end":return e.stop()}}),e)})));function t(){return e.apply(this,arguments)}return t}()},{key:"logined",get:function(){return d["a"].logined}}]),n}(h["b"]);v=Object(u["a"])([Object(h["a"])({components:{},computed:{}})],v);var f=v,p=f,g=(n("ff87"),n("2877")),m=n("6544"),b=n.n(m),x=n("8336"),y=n("b0af"),w=n("99d9"),k=n("169a"),_=n("132d"),C=n("8860"),O=n("e449"),$=n("2fa4"),E=Object(g["a"])(p,r,a,!1,null,null,null);t["a"]=E.exports;b()(E,{VBtn:x["a"],VCard:y["a"],VCardText:w["b"],VCardTitle:w["c"],VDialog:k["a"],VIcon:_["a"],VList:C["a"],VMenu:O["a"],VSpacer:$["a"]})},"14c3":function(e,t,n){var r=n("c6b6"),a=n("9263");e.exports=function(e,t){var n=e.exec;if("function"===typeof n){var i=n.call(e,t);if("object"!==typeof i)throw TypeError("RegExp exec method returned something other than an Object or null");return i}if("RegExp"!==r(e))throw TypeError("RegExp#exec called on incompatible receiver");return a.call(e,t)}},"169a":function(e,t,n){"use strict";n("368e");var r=n("480e"),a=n("4ad4"),i=n("b848"),s=n("75eb"),o=(n("3c93"),n("a9ad")),c=n("7560"),l=n("f2e7"),u=n("58df"),d=Object(u["a"])(o["a"],c["a"],l["a"]).extend({name:"v-overlay",props:{absolute:Boolean,color:{type:String,default:"#212121"},dark:{type:Boolean,default:!0},opacity:{type:[Number,String],default:.46},value:{default:!0},zIndex:{type:[Number,String],default:5}},computed:{__scrim(){const e=this.setBackgroundColor(this.color,{staticClass:"v-overlay__scrim",style:{opacity:this.computedOpacity}});return this.$createElement("div",e)},classes(){return{"v-overlay--absolute":this.absolute,"v-overlay--active":this.isActive,...this.themeClasses}},computedOpacity(){return Number(this.isActive?this.opacity:0)},styles(){return{zIndex:this.zIndex}}},methods:{genContent(){return this.$createElement("div",{staticClass:"v-overlay__content"},this.$slots.default)}},render(e){const t=[this.__scrim];return this.isActive&&t.push(this.genContent()),e("div",{staticClass:"v-overlay",class:this.classes,style:this.styles},t)}}),h=d,v=n("80d2"),f=n("2b0e"),p=f["default"].extend().extend({name:"overlayable",props:{hideOverlay:Boolean,overlayColor:String,overlayOpacity:[Number,String]},data(){return{animationFrame:0,overlay:null}},watch:{hideOverlay(e){this.isActive&&(e?this.removeOverlay():this.genOverlay())}},beforeDestroy(){this.removeOverlay()},methods:{createOverlay(){const e=new h({propsData:{absolute:this.absolute,value:!1,color:this.overlayColor,opacity:this.overlayOpacity}});e.$mount();const t=this.absolute?this.$el.parentNode:document.querySelector("[data-app]");t&&t.insertBefore(e.$el,t.firstChild),this.overlay=e},genOverlay(){if(this.hideScroll(),!this.hideOverlay)return this.overlay||this.createOverlay(),this.animationFrame=requestAnimationFrame(()=>{this.overlay&&(void 0!==this.activeZIndex?this.overlay.zIndex=String(this.activeZIndex-1):this.$el&&(this.overlay.zIndex=Object(v["p"])(this.$el)),this.overlay.value=!0)}),!0},removeOverlay(e=!0){this.overlay&&(Object(v["a"])(this.overlay.$el,"transitionend",()=>{this.overlay&&this.overlay.$el&&this.overlay.$el.parentNode&&!this.overlay.value&&(this.overlay.$el.parentNode.removeChild(this.overlay.$el),this.overlay.$destroy(),this.overlay=null)}),cancelAnimationFrame(this.animationFrame),this.overlay.value=!1),e&&this.showScroll()},scrollListener(e){if("keydown"===e.type){if(["INPUT","TEXTAREA","SELECT"].includes(e.target.tagName)||e.target.isContentEditable)return;const t=[v["r"].up,v["r"].pageup],n=[v["r"].down,v["r"].pagedown];if(t.includes(e.keyCode))e.deltaY=-1;else{if(!n.includes(e.keyCode))return;e.deltaY=1}}(e.target===this.overlay||"keydown"!==e.type&&e.target===document.body||this.checkPath(e))&&e.preventDefault()},hasScrollbar(e){if(!e||e.nodeType!==Node.ELEMENT_NODE)return!1;const t=window.getComputedStyle(e);return["auto","scroll"].includes(t.overflowY)&&e.scrollHeight>e.clientHeight},shouldScroll(e,t){return 0===e.scrollTop&&t<0||e.scrollTop+e.clientHeight===e.scrollHeight&&t>0},isInside(e,t){return e===t||null!==e&&e!==document.body&&this.isInside(e.parentNode,t)},checkPath(e){const t=e.path||this.composedPath(e),n=e.deltaY;if("keydown"===e.type&&t[0]===document.body){const e=this.$refs.dialog,t=window.getSelection().anchorNode;return!(e&&this.hasScrollbar(e)&&this.isInside(t,e))||this.shouldScroll(e,n)}for(let r=0;r<t.length;r++){const e=t[r];if(e===document)return!0;if(e===document.documentElement)return!0;if(e===this.$refs.content)return!0;if(this.hasScrollbar(e))return this.shouldScroll(e,n)}return!0},composedPath(e){if(e.composedPath)return e.composedPath();const t=[];let n=e.target;while(n){if(t.push(n),"HTML"===n.tagName)return t.push(document),t.push(window),t;n=n.parentElement}return t},hideScroll(){this.$vuetify.breakpoint.smAndDown?document.documentElement.classList.add("overflow-y-hidden"):(Object(v["b"])(window,"wheel",this.scrollListener,{passive:!1}),window.addEventListener("keydown",this.scrollListener))},showScroll(){document.documentElement.classList.remove("overflow-y-hidden"),window.removeEventListener("wheel",this.scrollListener),window.removeEventListener("keydown",this.scrollListener)}}}),g=n("e4d3"),m=n("21be"),b=n("a293"),x=n("d9bd");const y=Object(u["a"])(a["a"],i["a"],s["a"],p,g["a"],m["a"],l["a"]);t["a"]=y.extend({name:"v-dialog",directives:{ClickOutside:b["a"]},props:{dark:Boolean,disabled:Boolean,fullscreen:Boolean,light:Boolean,maxWidth:{type:[String,Number],default:"none"},noClickAnimation:Boolean,origin:{type:String,default:"center center"},persistent:Boolean,retainFocus:{type:Boolean,default:!0},scrollable:Boolean,transition:{type:[String,Boolean],default:"dialog-transition"},width:{type:[String,Number],default:"auto"}},data(){return{activatedBy:null,animate:!1,animateTimeout:-1,isActive:!!this.value,stackMinZIndex:200,previousActiveElement:null}},computed:{classes(){return{[("v-dialog "+this.contentClass).trim()]:!0,"v-dialog--active":this.isActive,"v-dialog--persistent":this.persistent,"v-dialog--fullscreen":this.fullscreen,"v-dialog--scrollable":this.scrollable,"v-dialog--animated":this.animate}},contentClasses(){return{"v-dialog__content":!0,"v-dialog__content--active":this.isActive}},hasActivator(){return Boolean(!!this.$slots.activator||!!this.$scopedSlots.activator)}},watch:{isActive(e){var t;e?(this.show(),this.hideScroll()):(this.removeOverlay(),this.unbind(),null==(t=this.previousActiveElement)||t.focus())},fullscreen(e){this.isActive&&(e?(this.hideScroll(),this.removeOverlay(!1)):(this.showScroll(),this.genOverlay()))}},created(){this.$attrs.hasOwnProperty("full-width")&&Object(x["e"])("full-width",this)},beforeMount(){this.$nextTick(()=>{this.isBooted=this.isActive,this.isActive&&this.show()})},beforeDestroy(){"undefined"!==typeof window&&this.unbind()},methods:{animateClick(){this.animate=!1,this.$nextTick(()=>{this.animate=!0,window.clearTimeout(this.animateTimeout),this.animateTimeout=window.setTimeout(()=>this.animate=!1,150)})},closeConditional(e){const t=e.target;return!(this._isDestroyed||!this.isActive||this.$refs.content.contains(t)||this.overlay&&t&&!this.overlay.$el.contains(t))&&this.activeZIndex>=this.getMaxZIndex()},hideScroll(){this.fullscreen?document.documentElement.classList.add("overflow-y-hidden"):p.options.methods.hideScroll.call(this)},show(){!this.fullscreen&&!this.hideOverlay&&this.genOverlay(),this.$nextTick(()=>{this.$nextTick(()=>{this.previousActiveElement=document.activeElement,this.$refs.content.focus(),this.bind()})})},bind(){window.addEventListener("focusin",this.onFocusin)},unbind(){window.removeEventListener("focusin",this.onFocusin)},onClickOutside(e){this.$emit("click:outside",e),this.persistent?this.noClickAnimation||this.animateClick():this.isActive=!1},onKeydown(e){if(e.keyCode===v["r"].esc&&!this.getOpenDependents().length)if(this.persistent)this.noClickAnimation||this.animateClick();else{this.isActive=!1;const e=this.getActivator();this.$nextTick(()=>e&&e.focus())}this.$emit("keydown",e)},onFocusin(e){if(!e||!this.retainFocus)return;const t=e.target;if(t&&![document,this.$refs.content].includes(t)&&!this.$refs.content.contains(t)&&this.activeZIndex>=this.getMaxZIndex()&&!this.getOpenDependentElements().some(e=>e.contains(t))){const e=this.$refs.content.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'),t=[...e].find(e=>!e.hasAttribute("disabled"));t&&t.focus()}},genContent(){return this.showLazyContent(()=>[this.$createElement(r["a"],{props:{root:!0,light:this.light,dark:this.dark}},[this.$createElement("div",{class:this.contentClasses,attrs:{role:"document",tabindex:this.isActive?0:void 0,...this.getScopeIdAttrs()},on:{keydown:this.onKeydown},style:{zIndex:this.activeZIndex},ref:"content"},[this.genTransition()])])])},genTransition(){const e=this.genInnerContent();return this.transition?this.$createElement("transition",{props:{name:this.transition,origin:this.origin,appear:!0}},[e]):e},genInnerContent(){const e={class:this.classes,ref:"dialog",directives:[{name:"click-outside",value:{handler:this.onClickOutside,closeConditional:this.closeConditional,include:this.getOpenDependentElements}},{name:"show",value:this.isActive}],style:{transformOrigin:this.origin}};return this.fullscreen||(e.style={...e.style,maxWidth:"none"===this.maxWidth?void 0:Object(v["f"])(this.maxWidth),width:"auto"===this.width?void 0:Object(v["f"])(this.width)}),this.$createElement("div",e,this.getContentSlot())}},render(e){return e("div",{staticClass:"v-dialog__container",class:{"v-dialog__container--attached":""===this.attach||!0===this.attach||"attach"===this.attach},attrs:{role:"dialog"}},[this.genActivator(),this.genContent()])}})},"20f6":function(e,t,n){},"2fa4":function(e,t,n){"use strict";n("20f6");var r=n("80d2");t["a"]=Object(r["g"])("spacer","div","v-spacer")},"368e":function(e,t,n){},3951:function(e,t,n){"use strict";n.d(t,"a",(function(){return f}));n("96cf");var r=n("1da1"),a=n("d4ec"),i=n("bee2"),s=n("262e"),o=n("2caf"),c=n("9ab4"),l=n("8d27"),u=n("dcc8"),d=n("f175"),h=n("0613"),v=function(e){Object(s["a"])(n,e);var t=Object(o["a"])(n);function n(){var e;return Object(a["a"])(this,n),e=t.apply(this,arguments),e.Hi=null,e.token=localStorage.getItem("token"),e.logined=!1,e}return Object(i["a"])(n,[{key:"setUser",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"register",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t,n){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,u["a"].postHttp("/api/register",t);case 2:if(r=e.sent,!r.id){e.next=9;break}return n.user=null===r||void 0===r?void 0:r.id,e.next=7,this.autoCreateProfile(n);case 7:return e.next=9,this.autoCreateFarm(null===r||void 0===r?void 0:r.first_name,null===r||void 0===r?void 0:r.id);case 9:return e.abrupt("return",r);case 10:case"end":return e.stop()}}),e,this)})));function t(t,n){return e.apply(this,arguments)}return t}()},{key:"autoCreateProfile",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",u["a"].postHttp("/api/profile/create/",t));case 1:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"autoCreateFarm",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t,n){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",u["a"].postHttp("/api/buffalo/farm/create/",{user_id:n,name:t}));case 1:case"end":return e.stop()}}),e)})));function t(t,n){return e.apply(this,arguments)}return t}()},{key:"registerAdmin",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,u["a"].postHttp("/api/register",t);case 2:if(n=e.sent,!n.id){e.next=6;break}return e.next=6,this.autoAddAdmin(null===n||void 0===n?void 0:n.id);case 6:return e.abrupt("return",n);case 7:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"autoAddAdmin",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",u["a"].postHttp("/api/changeAdmin/",{user:t}));case 1:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"getUser",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,u["a"].getHttp("/api/auth/user/");case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));function t(){return e.apply(this,arguments)}return t}()},{key:"reToken",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:d["a"].defaults.headers.common["Authorization"]="";case 1:case"end":return e.stop()}}),e)})));function t(){return e.apply(this,arguments)}return t}()},{key:"storeToken",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:d["a"].defaults.headers.common["Authorization"]=null!=t?"Token ".concat(t):"";case 1:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"storeTokenToStorage",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:localStorage.setItem("token",t);case 1:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"checkToken",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(null==this.token){e.next=6;break}return e.next=3,this.storeToken(this.token);case 3:this.logined=!0,e.next=7;break;case 6:this.logined=!1;case 7:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"logout",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return localStorage.clear(),e.next=3,u["a"].postHttp("/api/auth/logout/",{});case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));function t(){return e.apply(this,arguments)}return t}()}]),n}(l["b"]);v=Object(c["a"])([Object(l["a"])({generateMutationSetters:!0})],v);var f=new v({store:h["a"],name:"Auth"})},"3c93":function(e,t,n){},5319:function(e,t,n){"use strict";var r=n("d784"),a=n("825a"),i=n("7b0b"),s=n("50c4"),o=n("a691"),c=n("1d80"),l=n("8aa5"),u=n("14c3"),d=Math.max,h=Math.min,v=Math.floor,f=/\$([$&'`]|\d\d?|<[^>]*>)/g,p=/\$([$&'`]|\d\d?)/g,g=function(e){return void 0===e?e:String(e)};r("replace",2,(function(e,t,n,r){var m=r.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,b=r.REPLACE_KEEPS_$0,x=m?"$":"$0";return[function(n,r){var a=c(this),i=void 0==n?void 0:n[e];return void 0!==i?i.call(n,a,r):t.call(String(a),n,r)},function(e,r){if(!m&&b||"string"===typeof r&&-1===r.indexOf(x)){var i=n(t,e,this,r);if(i.done)return i.value}var c=a(e),v=String(this),f="function"===typeof r;f||(r=String(r));var p=c.global;if(p){var w=c.unicode;c.lastIndex=0}var k=[];while(1){var _=u(c,v);if(null===_)break;if(k.push(_),!p)break;var C=String(_[0]);""===C&&(c.lastIndex=l(v,s(c.lastIndex),w))}for(var O="",$=0,E=0;E<k.length;E++){_=k[E];for(var S=String(_[0]),R=d(h(o(_.index),v.length),0),j=[],T=1;T<_.length;T++)j.push(g(_[T]));var A=_.groups;if(f){var I=[S].concat(j,R,v);void 0!==A&&I.push(A);var L=String(r.apply(void 0,I))}else L=y(S,v,R,j,A,r);R>=$&&(O+=v.slice($,R)+L,$=R+S.length)}return O+v.slice($)}];function y(e,n,r,a,s,o){var c=r+e.length,l=a.length,u=p;return void 0!==s&&(s=i(s),u=f),t.call(o,u,(function(t,i){var o;switch(i.charAt(0)){case"$":return"$";case"&":return e;case"`":return n.slice(0,r);case"'":return n.slice(c);case"<":o=s[i.slice(1,-1)];break;default:var u=+i;if(0===u)return t;if(u>l){var d=v(u/10);return 0===d?t:d<=l?void 0===a[d-1]?i.charAt(1):a[d-1]+i.charAt(1):t}o=a[u-1]}return void 0===o?"":o}))}}))},"841c":function(e,t,n){"use strict";var r=n("d784"),a=n("825a"),i=n("1d80"),s=n("129f"),o=n("14c3");r("search",1,(function(e,t,n){return[function(t){var n=i(this),r=void 0==t?void 0:t[e];return void 0!==r?r.call(t,n):new RegExp(t)[e](String(n))},function(e){var r=n(t,e,this);if(r.done)return r.value;var i=a(e),c=String(this),l=i.lastIndex;s(l,0)||(i.lastIndex=0);var u=o(i,c);return s(i.lastIndex,l)||(i.lastIndex=l),null===u?-1:u.index}]}))},"8aa5":function(e,t,n){"use strict";var r=n("6547").charAt;e.exports=function(e,t,n){return t+(n?r(e,t).length:1)}},"8da2":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"h-full w-full flex flex-col justify-center items-center pt-10 pb-10 md:pb-0 md:pt-0"},[n("v-card",{staticClass:"m-8 md:w-96 rounded-lg"},[n("v-card-title",{staticClass:"bg1"},[n("h2",{staticClass:"text-sm text-white"},[e._v(e._s(e._lang("ยินดีต้อนรับเข้าสู่ตลาดควาย","Welcome to the Buffalo Market","歡迎來到布法羅市場")))]),n("h2",{staticClass:"font-semibold  text-left text-white"},[e._v(" "+e._s(e._lang(" กรุณาเข้าสู่ระบบ","Please login","請登錄")))]),n("br")]),n("v-divider"),n("v-card-text",[n("form",{staticClass:"flex flex-col p-3",on:{submit:function(t){return t.preventDefault(),e.login()}}},[n("div",{staticClass:"w-full mb-3"},[n("v-text-field",{attrs:{required:"",type:"text",label:e._lang("กรุณาใส่ชื่อผู้ใช้","Please enter username","請輸入用戶名"),filled:"",rounded:"","prepend-inner-icon":"mdi-account-circle-outline"},model:{value:e.form.username,callback:function(t){e.$set(e.form,"username",t)},expression:"form.username"}})],1),n("div",{staticClass:"w-full mb-3"},[n("v-text-field",{attrs:{required:"",type:"password",label:e._lang("กรุณาใส่รหัสผ่าน","Please enter password","請輸入密碼"),filled:"",rounded:"","prepend-inner-icon":"mdi-form-textbox-password"},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}})],1),n("v-btn",{staticClass:"w-full bg1",attrs:{rounded:"",large:"",dark:"",type:"submit"}},[e._v(e._s(e._lang("เข้าสู่ระบบ","Login","登录")))])],1)]),n("v-card-actions",[n("div",{staticClass:"flex flex-col md:flex-row "},[n("v-btn",{attrs:{text:"",color:"orange"},on:{click:function(t){return e.$router.push("/forgot")}}},[e._v(e._s(e._lang("ลืมรหัสผ่าน","forgot password","忘记密码")))]),n("v-spacer"),n("v-btn",{attrs:{text:"",color:"primary"},on:{click:function(t){return e.$router.push("/register")}}},[n("span",{domProps:{innerHTML:e._s(e._lang("สมาชิกใหม่? <b>ลงทะเบียน</b> ที่นี่","New member? <b> Register </b> here","新成员？ <b>在</ b>注册"))}})])],1)])],1)],1)},a=[],i=(n("ac1f"),n("5319"),n("96cf"),n("1da1")),s=n("d4ec"),o=n("bee2"),c=n("262e"),l=n("2caf"),u=n("9ab4"),d=n("60a3"),h=n("130f"),v=n("dcc8"),f=n("3951"),p=function(e){Object(c["a"])(n,e);var t=Object(l["a"])(n);function n(){var e;return Object(s["a"])(this,n),e=t.apply(this,arguments),e.form={},e}return Object(o["a"])(n,[{key:"created",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,f["a"].checkToken();case 2:if(!f["a"].logined){e.next=5;break}return e.next=5,this.$router.replace("/");case 5:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"login",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,f["a"].reToken();case 2:return e.next=4,v["a"].postHttp("/api/auth/login/",this.form);case 4:if(t=e.sent,!t.key){e.next=14;break}return e.next=8,f["a"].storeToken(t.key);case 8:return e.next=10,f["a"].storeTokenToStorage(t.key);case 10:return e.next=12,this.$router.push("/");case 12:return e.next=14,location.reload();case 14:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()}]),n}(d["b"]);p=Object(u["a"])([Object(d["a"])({components:{WebNav:h["a"]},computed:{}})],p);var g=p,m=g,b=(n("0921"),n("2877")),x=n("6544"),y=n.n(x),w=n("8336"),k=n("b0af"),_=n("99d9"),C=n("ce7e"),O=n("2fa4"),$=n("8654"),E=Object(b["a"])(m,r,a,!1,null,"7c2a1a32",null);t["default"]=E.exports;y()(E,{VBtn:w["a"],VCard:k["a"],VCardActions:_["a"],VCardText:_["b"],VCardTitle:_["c"],VDivider:C["a"],VSpacer:O["a"],VTextField:$["a"]})},9263:function(e,t,n){"use strict";var r=n("ad6d"),a=n("9f7f"),i=RegExp.prototype.exec,s=String.prototype.replace,o=i,c=function(){var e=/a/,t=/b*/g;return i.call(e,"a"),i.call(t,"a"),0!==e.lastIndex||0!==t.lastIndex}(),l=a.UNSUPPORTED_Y||a.BROKEN_CARET,u=void 0!==/()??/.exec("")[1],d=c||u||l;d&&(o=function(e){var t,n,a,o,d=this,h=l&&d.sticky,v=r.call(d),f=d.source,p=0,g=e;return h&&(v=v.replace("y",""),-1===v.indexOf("g")&&(v+="g"),g=String(e).slice(d.lastIndex),d.lastIndex>0&&(!d.multiline||d.multiline&&"\n"!==e[d.lastIndex-1])&&(f="(?: "+f+")",g=" "+g,p++),n=new RegExp("^(?:"+f+")",v)),u&&(n=new RegExp("^"+f+"$(?!\\s)",v)),c&&(t=d.lastIndex),a=i.call(h?n:d,g),h?a?(a.input=a.input.slice(p),a[0]=a[0].slice(p),a.index=d.lastIndex,d.lastIndex+=a[0].length):d.lastIndex=0:c&&a&&(d.lastIndex=d.global?a.index+a[0].length:t),u&&a&&a.length>1&&s.call(a[0],n,(function(){for(o=1;o<arguments.length-2;o++)void 0===arguments[o]&&(a[o]=void 0)})),a}),e.exports=o},"99d9":function(e,t,n){"use strict";n.d(t,"a",(function(){return i})),n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return c}));var r=n("b0af"),a=n("80d2");const i=Object(a["g"])("v-card__actions"),s=Object(a["g"])("v-card__subtitle"),o=Object(a["g"])("v-card__text"),c=Object(a["g"])("v-card__title");r["a"]},"9f7f":function(e,t,n){"use strict";var r=n("d039");function a(e,t){return RegExp(e,t)}t.UNSUPPORTED_Y=r((function(){var e=a("a","y");return e.lastIndex=2,null!=e.exec("abcd")})),t.BROKEN_CARET=r((function(){var e=a("^r","gy");return e.lastIndex=2,null!=e.exec("str")}))},ac1f:function(e,t,n){"use strict";var r=n("23e7"),a=n("9263");r({target:"RegExp",proto:!0,forced:/./.exec!==a},{exec:a})},aedb:function(e,t,n){},b5d3:function(e,t,n){},d784:function(e,t,n){"use strict";n("ac1f");var r=n("6eeb"),a=n("d039"),i=n("b622"),s=n("9263"),o=n("9112"),c=i("species"),l=!a((function(){var e=/./;return e.exec=function(){var e=[];return e.groups={a:"7"},e},"7"!=="".replace(e,"$<a>")})),u=function(){return"$0"==="a".replace(/./,"$0")}(),d=i("replace"),h=function(){return!!/./[d]&&""===/./[d]("a","$0")}(),v=!a((function(){var e=/(?:)/,t=e.exec;e.exec=function(){return t.apply(this,arguments)};var n="ab".split(e);return 2!==n.length||"a"!==n[0]||"b"!==n[1]}));e.exports=function(e,t,n,d){var f=i(e),p=!a((function(){var t={};return t[f]=function(){return 7},7!=""[e](t)})),g=p&&!a((function(){var t=!1,n=/a/;return"split"===e&&(n={},n.constructor={},n.constructor[c]=function(){return n},n.flags="",n[f]=/./[f]),n.exec=function(){return t=!0,null},n[f](""),!t}));if(!p||!g||"replace"===e&&(!l||!u||h)||"split"===e&&!v){var m=/./[f],b=n(f,""[e],(function(e,t,n,r,a){return t.exec===s?p&&!a?{done:!0,value:m.call(t,n,r)}:{done:!0,value:e.call(n,t,r)}:{done:!1}}),{REPLACE_KEEPS_$0:u,REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE:h}),x=b[0],y=b[1];r(String.prototype,e,x),r(RegExp.prototype,f,2==t?function(e,t){return y.call(e,this,t)}:function(e){return y.call(e,this)})}d&&o(RegExp.prototype[f],"sham",!0)}},ff87:function(e,t,n){"use strict";n("aedb")}}]);
//# sourceMappingURL=chunk-8a766d4a.d0dbdcb0.js.map