var z=Object.defineProperty,G=Object.defineProperties;var U=Object.getOwnPropertyDescriptors;var T=Object.getOwnPropertySymbols;var j=Object.prototype.hasOwnProperty,E=Object.prototype.propertyIsEnumerable;var S=(a,e,o)=>e in a?z(a,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):a[e]=o,C=(a,e)=>{for(var o in e||(e={}))j.call(e,o)&&S(a,o,e[o]);if(T)for(var o of T(e))E.call(e,o)&&S(a,o,e[o]);return a},I=(a,e)=>G(a,U(e));var w=(a,e,o)=>new Promise((m,u)=>{var y=s=>{try{d(o.next(s))}catch(_){u(_)}},c=s=>{try{d(o.throw(s))}catch(_){u(_)}},d=s=>s.done?m(s.value):Promise.resolve(s.value).then(y,c);d((o=o.apply(a,e)).next())});import{u as h}from"./index-BYrC6i03.js";import{_ as N}from"./Modal1.vue_vue_type_script_setup_true_lang-C_PT8Hf8.js";import{_ as O}from"./Modal2.vue_vue_type_script_setup_true_lang-DkxKmDBP.js";import{_ as V}from"./Modal3.vue_vue_type_script_setup_true_lang-DWP8F3Y5.js";import{_ as B}from"./Modal4.vue_vue_type_script_setup_true_lang-B2zk6BXk.js";import{_ as H}from"./Modal5.vue_vue_type_script_setup_true_lang-Bwd5cIur.js";import{P as L}from"./index-DmvVZzf-.js";import{d as $,f as b,Z as x,a7 as R,a8 as r,$ as Z,k as t,u as n,r as J,x as Q,l as X,s as Y,a9 as ee,G as p,ai as oe,ab as te,y as ae}from"./vue-bWmcvXqU.js";import{_ as ne}from"./BasicForm.vue_vue_type_script_setup_true_lang-BNQd6an3.js";import"./BasicForm.vue_vue_type_style_index_0_lang-CNnsnwdM.js";import"./componentMap-Cj-lLNJH.js";import{u as re}from"./useForm-Cjv2vJne.js";import{M as se,az as f,aT as D,j as le}from"./antd-D-XvgdAE.js";import"./entry/index-C2yXXbfE-1713597257644.js";import"./useWindowSizeFn-rAoW7C_Y.js";import"./BasicTable.vue_vue_type_script_setup_true_lang-DsxJkXnp.js";import"./TableImg.vue_vue_type_style_index_0_lang-I5-izhQm.js";import"./helper-C-421fQw.js";import"./RadioButtonGroup.vue_vue_type_script_setup_true_lang-BedSGtka.js";import"./useFormItem-CdGm24qm.js";import"./onMountedOrActivated-C5rGMWQz.js";import"./uuid-D0SLUWHI.js";import"./sortable.esm-CoO8jRpa.js";import"./useTable-DU8dtV_j.js";import"./tableData-DqUiFFf4.js";import"./select-XO-wSz2N.js";import"./table-BWWNUA9-.js";import"./useContentViewHeight-ByP0kkZI.js";import"./FormItem.vue_vue_type_script_lang-vprfBRCQ.js";import"./useSortable-BlxcSOdV.js";import"./download-Ch55mUgf.js";import"./base64Conver-bBv-IO2K.js";import"./index-usPsqJ6A.js";import"./IconPicker.vue_vue_type_script_setup_true_lang-BVLlAX3L.js";import"./copyTextToClipboard-BXKLw-Hi.js";import"./index-BT-ASklH.js";import"./index-dO_cmMaH.js";const ie={InputTextArea:{colProps:{span:23},componentProps:{placeholder:"请输入内容",autoSize:{minRows:2,maxRows:6},maxlength:255,showCount:!0}},InputNumber:{colProps:{span:20,offset:2},componentProps:{placeholder:"请输入数字",min:0}},Input:{colProps:{span:20,offset:2},componentProps:{placeholder:"请输入内容",min:0}}};function pe({label:a="备注信息",required:e=!0,inputType:o="InputTextArea",defaultValue:m=""}){return[C({field:"txt",component:o,label:a,defaultValue:m,required:!!e},ie[o])]}const me={class:"pt-5 pr-3px"},ue=$({__name:"dialog",props:{title:{},addFormSchemas:{},onOK:{},width:{},labelWidth:{},layout:{}},setup(a){const e=a,o=b(!0),[m,{validate:u}]=re({schemas:e.addFormSchemas,showActionButtonGroup:!1,labelWidth:e.labelWidth||80,layout:e.layout||"horizontal"});function y(){return w(this,null,function*(){const c=yield u();e.onOK&&(yield e.onOK(c.txt)),o.value=!1})}return(c,d)=>(x(),R(n(se),{open:o.value,"onUpdate:open":d[0]||(d[0]=s=>o.value=s),title:c.title,onOk:y,destroyOnClose:!0,width:c.width||"500px",okText:"确定",cancelText:"取消"},{default:r(()=>[Z("div",me,[t(n(ne),{onRegister:n(m)},null,8,["onRegister"])])]),_:1},8,["open","title","width"]))}});function ce(a){let e=null;const o=J(I(C({},a),{addFormSchemas:pe({label:a.label,required:a.required,inputType:a.inputType,defaultValue:a.defaultValue})})),m=$({render(){return X(ue,C({},o))}});e=t(m),Q(e,document.createElement("div"));function u(){e!=null&&e.el&&e.el.parentNode&&e.el.parentNode.removeChild(e.el)}return{vm:e,close:u,get $el(){return e==null?void 0:e.el}}}const Qe=$({__name:"index",setup(a){const e=Y(null),[o,{openModal:m}]=h(),[u,{openModal:y}]=h(),[c,{openModal:d}]=h(),[s,{openModal:_}]=h(),[F,{openModal:W}]=h(),M=b(!1),P=b(null);function q(){_(!0,{data:"content",info:"Info"})}function A(){m(!0)}function k(v){switch(v){case 1:e.value=N;break;case 2:e.value=O;break;case 3:e.value=V;break;default:e.value=B;break}ae(()=>{P.value={data:Math.random(),info:"Info222"},M.value=!0})}function K(){ce({title:"请输入邮箱",required:!0,label:"邮箱",defaultValue:"默认邮箱",onOK:v=>w(this,null,function*(){le.success("填写的邮箱地址为"+v)}),inputType:"Input"})}return(v,l)=>{const i=ee("a-button");return x(),R(n(L),{title:"modal组件使用示例"},{default:r(()=>[t(n(f),{message:`使用 useModal 进行弹窗操作，默认可以拖动，可以通过 draggable
    参数进行控制是否可以拖动/全屏，并演示了在Modal内动态加载内容并自动调整高度`,"show-icon":""}),t(i,{type:"primary",class:"my-4",onClick:A},{default:r(()=>[p(" 打开弹窗,加载动态数据并自动调整高度(默认可以拖动/全屏) ")]),_:1}),t(n(f),{message:"内外同时同时显示隐藏","show-icon":""}),t(i,{type:"primary",class:"my-4",onClick:n(y)},{default:r(()=>[p(" 打开弹窗 ")]),_:1},8,["onClick"]),t(n(f),{message:"自适应高度","show-icon":""}),t(n(D),null,{default:r(()=>[t(i,{type:"primary",class:"my-4",onClick:n(d)},{default:r(()=>[p(" 打开弹窗 ")]),_:1},8,["onClick"]),t(i,{type:"primary",class:"my-4",onClick:n(W)},{default:r(()=>[p(" 打开弹窗（BasicTable） ")]),_:1},8,["onClick"])]),_:1}),t(n(f),{message:"内外数据交互","show-icon":""}),t(i,{type:"primary",class:"my-4",onClick:q},{default:r(()=>[p(" 打开弹窗并传递数据 ")]),_:1}),t(n(f),{message:"使用动态组件的方式在页面内使用多个弹窗","show-icon":""}),t(n(D),null,{default:r(()=>[t(i,{type:"primary",class:"my-4",onClick:l[0]||(l[0]=g=>k(1))},{default:r(()=>[p(" 打开弹窗1 ")]),_:1}),t(i,{type:"primary",class:"my-4",onClick:l[1]||(l[1]=g=>k(2))},{default:r(()=>[p(" 打开弹窗2 ")]),_:1}),t(i,{type:"primary",class:"my-4",onClick:l[2]||(l[2]=g=>k(3))},{default:r(()=>[p(" 打开弹窗3 ")]),_:1}),t(i,{type:"primary",class:"my-4",onClick:l[3]||(l[3]=g=>k(4))},{default:r(()=>[p(" 打开弹窗4 ")]),_:1})]),_:1}),t(n(f),{message:"使用函数方式创建Prompt，适合较为简单的表单内容，如果需要弹出较为复杂的内容，请使用 Modal.","show-icon":""}),t(i,{type:"primary",class:"my-4",onClick:K},{default:r(()=>[p(" Prompt ")]),_:1}),e.value?(x(),R(oe(e.value),{key:0,open:M.value,"onUpdate:open":l[4]||(l[4]=g=>M.value=g),userData:P.value},null,40,["open","userData"])):te("",!0),t(N,{onRegister:n(o),minHeight:100},null,8,["onRegister"]),t(O,{onRegister:n(u)},null,8,["onRegister"]),t(V,{onRegister:n(c)},null,8,["onRegister"]),t(B,{onRegister:n(s)},null,8,["onRegister"]),t(H,{onRegister:n(F)},null,8,["onRegister"])]),_:1})}}});export{Qe as default};
