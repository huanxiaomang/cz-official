var y=Object.defineProperty,I=Object.defineProperties;var M=Object.getOwnPropertyDescriptors;var h=Object.getOwnPropertySymbols;var E=Object.prototype.hasOwnProperty,S=Object.prototype.propertyIsEnumerable;var C=(o,e,a)=>e in o?y(o,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):o[e]=a,d=(o,e)=>{for(var a in e||(e={}))E.call(e,a)&&C(o,a,e[a]);if(h)for(var a of h(e))S.call(e,a)&&C(o,a,e[a]);return o},i=(o,e)=>I(o,M(e));import{a as U}from"./useFormDesignState-AmrDdU5P.js";import{a as j,g as k}from"./index-i3oFwkL6.js";import{C as D,M as F}from"./index-BfDnIeIp.js";import{u as J,c as g}from"./entry/index-C2yXXbfE-1713597257644.js";import{aS as w,M as O}from"./antd-D-XvgdAE.js";import{d as B,r as N,I as $,a9 as r,Z as x,a7 as T,a8 as n,k as l,G as u,$ as b,a2 as V,a3 as A}from"./vue-bWmcvXqU.js";import"./useWindowSizeFn-rAoW7C_Y.js";const K=B({name:"ImportJsonModal",components:{CodeEditor:D,Upload:w,Modal:O},setup(){const{createMessage:o}=J(),e=N({visible:!1,json:`{
  "schemas": [
    {
      "component": "input",
      "label": "输入框",
      "field": "input_2",
      "span": 24,
      "props": {
        "type": "text"
      }
    }
  ],
  "layout": "horizontal",
  "labelLayout": "flex",
  "labelWidth": 100,
  "labelCol": {},
  "wrapperCol": {}
}`,jsonData:{schemas:{},config:{}},handleSetSelectItem:null}),{formDesignMethods:a}=U(),c=()=>{e.visible=!1},m=()=>{e.visible=!0},p=()=>{try{const s=JSON.parse(e.json);s.schemas&&j(s.schemas,t=>{k(t)}),a.setFormConfig(i(d({},s),{activeKey:1,currentItem:{component:""}})),c(),o.success("导入成功")}catch(s){o.error("导入失败，数据格式不对")}};return i(d({handleImportJson:p,beforeUpload:s=>{const t=new FileReader;return t.readAsText(s),t.onload=function(){e.json=this.result,p()},!1},handleCancel:c,showModal:m},$(e)),{MODE:F})}}),L=o=>(V("data-v-cc64bace"),o=o(),A(),o),R=L(()=>b("p",{class:"hint-box"},"导入格式如下:",-1)),z={class:"v-json-box"};function G(o,e,a,c,m,p){const f=r("CodeEditor"),s=r("a-button"),t=r("Upload"),_=r("Modal");return x(),T(_,{title:"JSON数据",open:o.visible,onOk:o.handleImportJson,onCancel:o.handleCancel,cancelText:"关闭",destroyOnClose:!0,wrapClassName:"v-code-modal",style:{top:"20px"},width:850},{footer:n(()=>[l(s,{onClick:o.handleCancel},{default:n(()=>[u("取消")]),_:1},8,["onClick"]),l(t,{class:"upload-button",beforeUpload:o.beforeUpload,showUploadList:!1,accept:"application/json"},{default:n(()=>[l(s,{type:"primary"},{default:n(()=>[u("导入json文件")]),_:1})]),_:1},8,["beforeUpload"]),l(s,{type:"primary",onClick:o.handleImportJson},{default:n(()=>[u("确定")]),_:1},8,["onClick"])]),default:n(()=>[R,b("div",z,[l(f,{value:o.json,"onUpdate:value":e[0]||(e[0]=v=>o.json=v),ref:"myEditor",mode:o.MODE.JSON},null,8,["value","mode"])])]),_:1},8,["open","onOk","onCancel"])}const oo=g(K,[["render",G],["__scopeId","data-v-cc64bace"]]);export{oo as default};
