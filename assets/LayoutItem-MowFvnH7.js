var w=Object.defineProperty,L=Object.defineProperties;var O=Object.getOwnPropertyDescriptors;var y=Object.getOwnPropertySymbols;var R=Object.prototype.hasOwnProperty,V=Object.prototype.propertyIsEnumerable;var C=(e,o,t)=>o in e?w(e,o,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[o]=t,v=(e,o)=>{for(var t in o||(o={}))R.call(o,t)&&C(e,t,o[t]);if(y)for(var t of y(o))V.call(o,t)&&C(e,t,o[t]);return e},k=(e,o)=>L(e,O(o));import{d as A}from"./vuedraggable.umd-Hoi0udy1.js";import B from"./FormNode-BQOXHlyq.js";import D from"./FormNodeOperate-CMnU2KYS.js";import{a as H}from"./useFormDesignState-AmrDdU5P.js";import{d as j,r as z,c as p,I as q,a9 as n,Z as m,a7 as u,a8 as s,_ as $,a1 as M,B as U,k as l,ac as I,F as E,aa as G,aj as T,ak as Z}from"./vue-bWmcvXqU.js";import{al as J,ak as K}from"./antd-D-XvgdAE.js";import{c as Q}from"./entry/index-C2yXXbfE-1713597257644.js";import"./index-CfAfm_vp.js";import"./formItemConfig-Bii87mDn.js";import"./componentMap-Cj-lLNJH.js";import"./useFormItem-CdGm24qm.js";import"./RadioButtonGroup.vue_vue_type_script_setup_true_lang-BedSGtka.js";import"./index-BYrC6i03.js";import"./useWindowSizeFn-rAoW7C_Y.js";import"./uuid-D0SLUWHI.js";import"./useSortable-BlxcSOdV.js";import"./download-Ch55mUgf.js";import"./base64Conver-bBv-IO2K.js";import"./index-usPsqJ6A.js";import"./IconPicker.vue_vue_type_script_setup_true_lang-BVLlAX3L.js";import"./copyTextToClipboard-BXKLw-Hi.js";import"./index-BT-ASklH.js";import"./index-dO_cmMaH.js";import"./index-i3oFwkL6.js";const W=j({name:"LayoutItem",components:{FormNode:B,FormNodeOperate:D,draggable:A,Row:J,Col:K},props:{schema:{type:Object,required:!0},currentItem:{type:Object,required:!0}},emits:["dragStart","handleColAdd","handle-copy","handle-delete"],setup(e){const{formDesignMethods:{handleSetSelectItem:o},formConfig:t}=H(),c=z({}),g=p(()=>{const{colProps:i={}}=e.schema;return i}),h=p(()=>e.schema.columns),d=p(()=>t.value.layout==="horizontal"?"Col":"div");return k(v({},q(c)),{colPropsComputed:g,handleSetSelectItem:o,layoutTag:d,list1:h})}});function X(e,o,t,c,g,h){const d=n("LayoutItem",!0),i=n("draggable"),f=n("Col"),b=n("Row"),F=n("FormNodeOperate"),S=n("FormNode");return m(),u(f,T(Z(e.colPropsComputed)),{default:s(()=>[["Grid"].includes(e.schema.component)?(m(),$("div",{key:0,class:M(["grid-box",{active:e.schema.key===e.currentItem.key}]),onClick:o[2]||(o[2]=U(r=>e.handleSetSelectItem(e.schema),["stop"]))},[l(b,I({class:"grid-row"},e.schema.componentProps),{default:s(()=>[(m(!0),$(E,null,G(e.schema.columns,(r,N)=>(m(),u(f,{class:"grid-col",key:N,span:r.span},{default:s(()=>[l(i,I({class:"list-main draggable-box","component-data":{name:"list",tag:"div",type:"transition-group"}},{group:"form-draggable",ghostClass:"moving",animation:180,handle:".drag-move"},{"item-key":"key",modelValue:r.children,"onUpdate:modelValue":a=>r.children=a,onStart:a=>e.$emit("dragStart",a,r.children),onAdd:a=>e.$emit("handleColAdd",a,r.children)}),{item:s(({element:a})=>[l(d,{class:"drag-move",schema:a,"current-item":e.currentItem,onHandleCopy:o[0]||(o[0]=P=>e.$emit("handle-copy")),onHandleDelete:o[1]||(o[1]=P=>e.$emit("handle-delete"))},null,8,["schema","current-item"])]),_:2},1040,["modelValue","onUpdate:modelValue","onStart","onAdd"])]),_:2},1032,["span"]))),128))]),_:1},16),l(F,{schema:e.schema,currentItem:e.currentItem},null,8,["schema","currentItem"])],2)):(m(),u(S,{key:e.schema.key,schema:e.schema,"current-item":e.currentItem,onHandleCopy:o[3]||(o[3]=r=>e.$emit("handle-copy")),onHandleDelete:o[4]||(o[4]=r=>e.$emit("handle-delete"))},null,8,["schema","current-item"]))]),_:1},16)}const Ie=Q(W,[["render",X]]);export{Ie as default};
