var b=Object.defineProperty,y=Object.defineProperties;var k=Object.getOwnPropertyDescriptors;var f=Object.getOwnPropertySymbols;var v=Object.prototype.hasOwnProperty,w=Object.prototype.propertyIsEnumerable;var d=(i,e,t)=>e in i?b(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t,u=(i,e)=>{for(var t in e||(e={}))v.call(e,t)&&d(i,t,e[t]);if(f)for(var t of f(e))w.call(e,t)&&d(i,t,e[t]);return i},h=(i,e)=>y(i,k(e));var _=(i,e,t)=>new Promise((s,n)=>{var m=r=>{try{a(t.next(r))}catch(l){n(l)}},o=r=>{try{a(t.throw(r))}catch(l){n(l)}},a=r=>r.done?s(r.value):Promise.resolve(r.value).then(m,o);a((t=t.apply(i,e)).next())});import{_ as C}from"./componentMap-Cj-lLNJH.js";import"./entry/index-C2yXXbfE-1713597257644.js";import"./helper-C-421fQw.js";import"./BasicForm.vue_vue_type_style_index_0_lang-CNnsnwdM.js";import"./antd-D-XvgdAE.js";import"./index-BYrC6i03.js";import"./TableImg.vue_vue_type_style_index_0_lang-I5-izhQm.js";import"./uuid-D0SLUWHI.js";import"./sortable.esm-CoO8jRpa.js";import{b as S}from"./system-DxPFfkCG.js";import{P as A}from"./index-DmvVZzf-.js";import{_ as B}from"./DeptTree.vue_vue_type_script_setup_true_lang-D1LZA590.js";import{d as P}from"./account.data-CaQTfeIW.js";import{V as R}from"./index-BnEbYUfw.js";import{d as T,f as g,r as V,Z as I,a7 as N,a8 as x,k as c,$,u as p,ac as q}from"./vue-bWmcvXqU.js";import"./useFormItem-CdGm24qm.js";import"./RadioButtonGroup.vue_vue_type_script_setup_true_lang-BedSGtka.js";import"./useSortable-BlxcSOdV.js";import"./download-Ch55mUgf.js";import"./base64Conver-bBv-IO2K.js";import"./index-usPsqJ6A.js";import"./IconPicker.vue_vue_type_script_setup_true_lang-BVLlAX3L.js";import"./copyTextToClipboard-BXKLw-Hi.js";import"./index-BT-ASklH.js";import"./index-dO_cmMaH.js";import"./useWindowSizeFn-rAoW7C_Y.js";import"./onMountedOrActivated-C5rGMWQz.js";import"./useContentViewHeight-ByP0kkZI.js";import"./index-C5kENV3p.js";import"./useContextMenu-Dhg5zWUj.js";const z=[{title:"用户名",field:"account",width:120},{title:"昵称",field:"nickname",width:120},{title:"邮箱",field:"email",width:120},{title:"创建时间",field:"createTime",width:180},{title:"角色",field:"role",width:200},{title:"所属部门",field:"dept",slots:{default:({row:i})=>P[i.dept]}},{title:"备注",field:"remark"},{width:160,title:"操作",align:"center",slots:{default:"action"},fixed:"right"}],F=[{field:"account",title:"用户名",itemRender:{name:"AInput"},span:6},{field:"nickname",title:"昵称",itemRender:{name:"AInput"},span:6},{span:12,align:"right",className:"!pr-0",itemRender:{name:"AButtonGroup",children:[{props:{type:"primary",content:"查询",htmlType:"submit"},attrs:{class:"mr-2"}},{props:{type:"default",htmlType:"reset",content:"重置"}}]}}],H={class:"m-4 vxebasic-form-container"},_e=T({__name:"index",setup(i){const e=g(),t=g(),s=V({id:"VxeTable",keepSource:!0,columns:z,formConfig:{enabled:!0,items:F},height:"auto",proxyConfig:{ajax:{query:r=>_(this,[r],function*({page:o,form:a}){return S(h(u({page:o.currentPage,pageSize:o.pageSize},a),{searchInfo:t.value}))})}}}),n=(o="")=>{t.value=o,e.value&&e.value.commitProxy("query")},m=o=>[{label:"详情",onClick:()=>{}},{label:"编辑",onClick:()=>{}},{label:"删除",color:"error",popConfirm:{title:"是否确认删除",confirm:()=>{var r;(r=e.value)==null||r.remove(o)}}}];return(o,a)=>(I(),N(p(A),{dense:"",contentFullHeight:"",fixedHeight:"",contentClass:"flex"},{default:x(()=>[c(B,{class:"w-1/4 xl:w-1/5",onSelect:n}),$("div",H,[c(p(R),q({ref_key:"tableRef",ref:e},s),{action:x(({row:r})=>[c(p(C),{outside:"",actions:m(r)},null,8,["actions"])]),_:1},16)])]),_:1}))}});export{_e as default};
