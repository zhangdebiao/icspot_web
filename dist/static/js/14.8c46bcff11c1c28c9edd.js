webpackJsonp([14],{rhuz:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s={data:()=>({url:"/whiteiplist/",porturl:"/whiteport/",ipurl:"/whiteiplist/",whiteips:"",whiteports:"",port:"",form:{name:"",region:"",date1:"",date2:"",delivery:!0,type:["步步高"],resource:"小天才",desc:"",options:[]}}),created(){this.getData(),this.getWhiteport()},methods:{getData(){this.$axios.get(this.url).then(t=>{this.whiteips=t.data})},getWhiteport(){this.$axios.get(this.porturl).then(t=>{this.whiteports=t.data})},PostWhiteport(){this.$axios.post(this.porturl,{port:this.whiteports}).then(t=>(this.$message.success("提交成功！"),this.whiteports))},PostWhiteiplist(){this.$axios.post(this.ipurl,{ip:this.whiteips}).then(t=>(this.$message.success("提交成功！"),this.whiteips))}}},r={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"table"},[i("div",{staticClass:"crumbs"},[i("el-breadcrumb",{attrs:{separator:"/"}},[i("el-breadcrumb-item",[i("i",{staticClass:"el-icon-tickets"}),t._v(" 白名单ip")])],1)],1),t._v(" "),i("div",{staticClass:"container"},[i("el-form",{ref:"form",attrs:{model:t.form,"label-width":"80px"}},[i("el-input",{attrs:{type:"textarea",rows:2,placeholder:"白名单ip"},model:{value:t.whiteips,callback:function(e){t.whiteips=e},expression:"whiteips"}}),t._v(" "),i("p",{staticStyle:{"font-size":"12px","font-family":"'PingFang SC'",color:"grey","margin-top":"7px"}},[t._v("若配置了白名单ip，则攻击来源ip为白名单ip的攻击记录将会进入后台的过滤列表。")]),t._v(" "),i("el-form-item",{staticStyle:{float:"right","margin-top":"-10px"}},[i("el-button",{attrs:{type:"primary"},on:{click:t.PostWhiteiplist}},[t._v("提交配置")])],1),t._v(" "),i("p",{staticStyle:{"font-size":"12px","font-family":"'PingFang SC'",color:"grey","margin-top":"7px"}},[t._v("举例：192.168.1.1,192.168.1.2。端口之间用英文逗号分隔。")])],1)],1),t._v(" "),i("br"),t._v(" "),i("div",{staticClass:"crumbs"},[i("el-breadcrumb",{attrs:{separator:"/"}},[i("el-breadcrumb-item",[i("i",{staticClass:"el-icon-tickets"}),t._v(" 白名单端口")])],1)],1),t._v(" "),i("div",{staticClass:"container"},[i("div",{staticClass:"form-box"},[i("el-form",{ref:"form",attrs:{model:t.form,"label-width":"80px"}},[i("el-input",{attrs:{type:"textarea",rows:2,placeholder:"请输入内容"},model:{value:t.whiteports,callback:function(e){t.whiteports=e},expression:"whiteports"}}),t._v(" "),i("p",{staticStyle:{"font-size":"12px","font-family":"'PingFang SC'",color:"grey","margin-top":"7px"}},[t._v("若配置了白名单端口，则被攻击客户端的目的端口为白名单端口的攻击记录将不会进入后台。")]),t._v(" "),i("el-form-item",{staticStyle:{float:"right","margin-top":"-10px"}},[i("el-button",{attrs:{type:"primary"},on:{click:t.PostWhiteport}},[t._v("提交配置")])],1),t._v(" "),i("p",{staticStyle:{"font-size":"12px","font-family":"'PingFang SC'",color:"grey","margin-top":"7px"}},[t._v("举例：3306,3389。端口之间用英文逗号分隔。")])],1)],1)])])},staticRenderFns:[]},a=i("VU/8")(s,r,!1,null,null,null);e.default=a.exports}});