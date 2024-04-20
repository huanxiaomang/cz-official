var y=Object.defineProperty,P=Object.defineProperties;var U=Object.getOwnPropertyDescriptors;var _=Object.getOwnPropertySymbols;var B=Object.prototype.hasOwnProperty,D=Object.prototype.propertyIsEnumerable;var k=(e,n,t)=>n in e?y(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t,C=(e,n)=>{for(var t in n||(n={}))B.call(n,t)&&k(e,t,n[t]);if(_)for(var t of _(n))D.call(n,t)&&k(e,t,n[t]);return e},O=(e,n)=>P(e,U(n));import{a as w}from"./useFormDesignState-AmrDdU5P.js";import{c as $}from"./index-i3oFwkL6.js";import{u as N,_ as V,c as A}from"./entry/index-C2yXXbfE-1713597257644.js";import{E}from"./antd-D-XvgdAE.js";import{d as M,r as S,I as T,a9 as h,Z as l,_ as u,F,aa as G,$ as c,k as i,G as b}from"./vue-bWmcvXqU.js";const{createMessage:p}=N(),j=Object.assign({success:e=>{p.success(e)},error:e=>{p.error(e)},warning:e=>{p.warning(e)},info:e=>{p.info(e)}}),L=j,R=M({name:"FormOptions",components:{Input:E,Icon:V},setup(){var r;const e=S({}),{formConfig:n}=w(),t=((r=n.value.currentItem)==null?void 0:r.component)==="TreeSelect"?"treeData":"options",m=()=>{var s,a,g,I;(a=(s=n.value.currentItem)==null?void 0:s.componentProps)!=null&&a[t]||(n.value.currentItem.componentProps[t]=[]);const o=((I=(g=n.value.currentItem)==null?void 0:g.componentProps)==null?void 0:I[t].length)+1;n.value.currentItem.componentProps[t].push({label:`选项${o}`,value:""+o})},v=o=>{var s,a;$((a=(s=n.value.currentItem)==null?void 0:s.componentProps)==null?void 0:a[t],o)},f=()=>{var o,s;(s=(o=n.value.currentItem)==null?void 0:o.columns)==null||s.push({span:12,children:[]})},d=o=>{if(o===0)return L.warning("请至少保留一个栅格");$(n.value.currentItem.columns,o)};return O(C({},T(e)),{formConfig:n,addOptions:m,deleteOptions:v,key:t,deleteGridOptions:d,addGridOptions:f})}}),Z={key:0},q={class:"options-box"},z=["onClick"],H={key:1},J={class:"options-box"},K=["onClick"];function Q(e,n,t,m,v,f){const d=h("Input"),r=h("Icon");return l(),u("div",null,[["Grid"].includes(e.formConfig.currentItem.component)?(l(),u("div",Z,[(l(!0),u(F,null,G(e.formConfig.currentItem.columns,(o,s)=>(l(),u("div",{key:s},[c("div",q,[i(d,{value:o.span,"onUpdate:value":a=>o.span=a,class:"options-value"},null,8,["value","onUpdate:value"]),c("a",{class:"options-delete",onClick:a=>e.deleteGridOptions(s)},[i(r,{icon:"ant-design:delete-outlined"})],8,z)])]))),128)),c("a",{onClick:n[0]||(n[0]=(...o)=>e.addGridOptions&&e.addGridOptions(...o))},[i(r,{icon:"ant-design:file-add-outlined"}),b(" 添加栅格 ")])])):(l(),u("div",H,[(l(!0),u(F,null,G(e.formConfig.currentItem.componentProps[e.key],(o,s)=>(l(),u("div",{key:s},[c("div",J,[i(d,{value:o.label,"onUpdate:value":a=>o.label=a},null,8,["value","onUpdate:value"]),i(d,{value:o.value,"onUpdate:value":a=>o.value=a,class:"options-value"},null,8,["value","onUpdate:value"]),c("a",{class:"options-delete",onClick:a=>e.deleteOptions(s)},[i(r,{icon:"ant-design:delete-outlined"})],8,K)])]))),128)),c("a",{onClick:n[1]||(n[1]=(...o)=>e.addOptions&&e.addOptions(...o))},[i(r,{icon:"ant-design:file-add-outlined"}),b(" 添加选项 ")])]))])}const oe=A(R,[["render",Q],["__scopeId","data-v-94f80168"]]);export{oe as default};
