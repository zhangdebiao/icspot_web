webpackJsonp([18],{"7xIN":function(t,e){},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("7+uW"),o={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var i=n("VU/8")(null,o,!1,function(t){n("na8K")},null,null).exports,l=n("/ocq");a.default.use(l.a);var c=new l.a({mode:"history",base:"v1",routes:[{path:"/",redirect:"/dashboard"},{path:"/",component:t=>n.e(3).then(function(){var e=[n("MpTN")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{title:"自述文件"},children:[{path:"/dashboard",component:t=>n.e(6).then(function(){var e=[n("a52u")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{title:"系统首页"}},{path:"/hoststatus",component:t=>n.e(15).then(function(){var e=[n("833j")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{title:"主机状态"}},{path:"/attacklist",component:t=>n.e(10).then(function(){var e=[n("Y0/D")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{title:"攻击列表"}},{path:"/filterlist",component:t=>n.e(12).then(function(){var e=[n("AO/x")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{title:"过滤列表"}},{path:"/whiteiplist",component:t=>n.e(14).then(function(){var e=[n("rhuz")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{title:"白名单ip"}},{path:"/tabs",component:t=>n.e(13).then(function(){var e=[n("kgBe")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{title:"tab选项卡"}},{path:"/mailconf",component:t=>n.e(16).then(function(){var e=[n("zs81")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{title:"邮件配置"}},{path:"/editor",component:t=>n.e(0).then(function(){var e=[n("ENMl")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{title:"富文本编辑器"}},{path:"/markdown",component:t=>n.e(4).then(function(){var e=[n("Uhiw")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{title:"markdown编辑器"}},{path:"/upload",component:t=>n.e(1).then(function(){var e=[n("9fPc")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{title:"文件上传"}},{path:"/charts",component:t=>n.e(5).then(function(){var e=[n("Z1dZ")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{title:"schart图表"}},{path:"/drag",component:t=>n.e(2).then(function(){var e=[n("2KuU")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{title:"拖拽列表"}},{path:"/permission",component:t=>n.e(8).then(function(){var e=[n("5jj7")];t.apply(null,e)}.bind(this)).catch(n.oe),meta:{title:"权限测试",permission:!0}}]},{path:"/login",component:t=>n.e(9).then(function(){var e=[n("GF4k")];t.apply(null,e)}.bind(this)).catch(n.oe)},{path:"/404",component:t=>n.e(7).then(function(){var e=[n("3bH0")];t.apply(null,e)}.bind(this)).catch(n.oe)},{path:"/403",component:t=>n.e(11).then(function(){var e=[n("KfZE")];t.apply(null,e)}.bind(this)).catch(n.oe)},{path:"*",redirect:"/404"}]}),p=n("mtWM"),r=n.n(p),h=n("zL8q"),u=n.n(h),s=(n("tvR6"),n("7xIN"),n("j1ja"),n("Bb5x")),d=this;a.default.use(u.a,{size:"small"}),a.default.prototype.$axios=r.a,c.beforeEach((t,e,n)=>{d.JWT_TOKEN=localStorage.getItem("token"),r.a.interceptors.request.use(t=>(d.JWT_TOKEN&&(t.headers.Authorization=`opencanary ${d.JWT_TOKEN}`),t),t=>Promise.reject(t)),r.a.interceptors.response.use(t=>t,t=>{if(t.response)switch(t.response.status){case 401:window.localStorage.clear(),n("/login"),c.replace({path:"/login",query:{redirect:c.currentRoute.fullPath}})}return Promise.reject(t.response.data)}),d.JWT_TOKEN||"/login"===t.path?d.JWT_TOKEN&&"/login"==t.path?(window.localStorage.clear(),n()):navigator.userAgent.indexOf("MSIE")>-1&&"/editor"===t.path?a.default.prototype.$alert("vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看","浏览器不兼容通知",{confirmButtonText:"确定"}):n():n("/login")}),new a.default({router:c,render:t=>t(i)}).$mount("#app"),a.default.use(s.a)},na8K:function(t,e){},tvR6:function(t,e){}},["NHnr"]);