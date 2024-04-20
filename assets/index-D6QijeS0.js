var z=Object.defineProperty;var C=Object.getOwnPropertySymbols;var R=Object.prototype.hasOwnProperty,V=Object.prototype.propertyIsEnumerable;var A=(e,t,o)=>t in e?z(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o,k=(e,t)=>{for(var o in t||(t={}))R.call(t,o)&&A(e,o,t[o]);if(C)for(var o of C(t))V.call(t,o)&&A(e,o,t[o]);return e};var g=(e,t,o)=>new Promise((i,x)=>{var c=u=>{try{f(o.next(u))}catch(a){x(a)}},m=u=>{try{f(o.throw(u))}catch(a){x(a)}},f=u=>u.done?i(u.value):Promise.resolve(u.value).then(c,m);f((o=o.apply(e,t)).next())});import{d as j,f as _,c as q,o as G,r as L,Z as y,a7 as B,a8 as d,$ as p,k as r,G as W,u as l,m as I,A as S,_ as Y,aa as Z,a0 as T,F as H,O as Q,a2 as X,a3 as J}from"./vue-bWmcvXqU.js";import{P as K}from"./index-DmvVZzf-.js";import{b as M,_ as w,u as ee,c as te}from"./entry/index-C2yXXbfE-1713597257644.js";import{s as ae}from"./sortByUpdate-CK_V0ObA.js";import{B as se,Q as oe,P as ne,W as le,X as E,E as re,Y as ie,M as ue}from"./antd-D-XvgdAE.js";import"./useContentViewHeight-ByP0kkZI.js";import"./useWindowSizeFn-rAoW7C_Y.js";import"./onMountedOrActivated-C5rGMWQz.js";function h(e="modal"){return M.get({url:"/message"},{errorMessageMode:e})}function de(e){return M.post({url:"/message/create",data:k({},e)},{errorMessageMode:"none"})}function ce(e,t){return M.post({url:`/message/update/${e}`,data:k({},t)},{errorMessageMode:"none"})}function me(e){return M.delete({url:`/message/remove/${e}`},{errorMessageMode:"none"})}const F=e=>(X("data-v-9e356335"),e=e(),J(),e),fe=F(()=>p("div",{class:"mb-7"}," (•ิ_•ิ)👇 可以在这里发布、编辑、删除通知。 ",-1)),pe=F(()=>p("p",null,"暂无通知",-1)),ve=[pe],ge={class:"text-sm text-gray-600 pt-5"},_e={class:"mr-auto w-fit flex gap-2 pt-3"},xe=j({__name:"index",setup(e){const{notification:t,createErrorModal:o}=ee();let i=_([]),x=q(()=>ae(i.value));G(()=>g(this,null,function*(){i.value=(yield h()).data}));const c=_(!1),m=_(!1),f=_(),u=_(),a=L({title:"",content:""}),$=()=>{c.value=!0};let b=!0;const N=()=>g(this,null,function*(){u.value.validate().then(()=>{v()}).catch(n=>{const s=n.errorFields[0];t.error({message:"验证错误！",description:`${s.name[0]}: ${s.errors[0]}`,duration:3})});function v(){return g(this,null,function*(){b?(m.value=!0,setTimeout(()=>{c.value=!1,m.value=!1,t.success({message:"已完成(●• ̀ω•́ )✧",description:`修改成功: 通知${a.title}`,duration:3})},200),f.value&&(yield ce(f.value,a)),i.value=(yield h()).data):(m.value=!0,setTimeout(()=>{c.value=!1,m.value=!1,t.success({message:"已完成(●• ̀ω•́ )✧",description:`添加成功: 通知${a.title}`,duration:3})},200),yield de(a),i.value=(yield h()).data)})}});function O(v){const n=i.value.find(s=>s.id===v);a.content=n.content,a.title=n.title,f.value=n.id,b=!0,$()}function D(v){return g(this,null,function*(){const n=(yield me(v)).data;i.value=(yield h()).data,t.success({message:"已删除 (,,•́ . •̀,,) ",description:`${n.title} 再也没有了`,duration:3})})}function P(){b=!1,a.content="",a.title="",$()}return(v,n)=>(y(),B(l(K),{title:"通知管理"},{headerContent:d(()=>[p("div",null,[fe,r(l(se),{type:"primary",onClick:P,class:"flex items-center"},{default:d(()=>[r(w,{icon:"material-symbols:add",size:"20",color:"#fff",class:"mx-[-.4rem]"}),W(" 添加通知 ")]),_:1})])]),default:d(()=>[I(p("div",null,ve,512),[[S,Object.keys(l(i)).length===0]]),r(Q,{name:"list",tag:"ul"},{default:d(()=>[(y(!0),Y(H,null,Z(l(x),s=>I((y(),B(l(oe),{key:s.id,title:s.title,class:"mb-6"},{default:d(()=>[p("p",null,T(s.content),1),p("div",ge,T(s.updatedAt.replace("T"," ").replace("Z"," ")),1),p("div",_e,[r(w,{icon:"uil:edit",size:"22",class:"ml-auto !block cursor-pointer text-blue-700/80 hover:text-blue-700/100 transition-all ease-in-out",onClick:U=>O(s.id)},null,8,["onClick"]),r(l(ne),{title:"确定删除此通知吗?‭(ノ_<。) ‬","ok-text":"Yes","cancel-text":"No",onConfirm:U=>D(s.id)},{default:d(()=>[r(w,{icon:"material-symbols:delete",size:"24",class:"ml-auto !block cursor-pointer text-blue-700/80 hover:text-blue-700/100 transition-all ease-in-out"})]),_:2},1032,["onConfirm"])])]),_:2},1032,["title"])),[[S,Object.keys(l(i)).length>0]])),128))]),_:1}),r(l(ue),{open:c.value,"onUpdate:open":n[2]||(n[2]=s=>c.value=s),title:"编辑通知信息","confirm-loading":m.value,onOk:N},{default:d(()=>[r(l(le),{model:a,layout:"vertical",name:"form_in_modal",autocomplete:"off",class:"p-6 mb-5",ref_key:"formRef",ref:u},{default:d(()=>[r(l(E),{label:"标题",name:"title",rules:[{required:!0,message:"请填写标题!"}]},{default:d(()=>[r(l(re),{value:a.title,"onUpdate:value":n[0]||(n[0]=s=>a.title=s)},null,8,["value"])]),_:1}),r(l(E),{label:"内容",name:"content",rules:[{required:!0,message:"请填写内容"}]},{default:d(()=>[r(l(ie),{value:a.content,"onUpdate:value":n[1]||(n[1]=s=>a.content=s),class:"textarea"},null,8,["value"])]),_:1})]),_:1},8,["model"])]),_:1},8,["open","confirm-loading"])]),_:1}))}}),Be=te(xe,[["__scopeId","data-v-9e356335"]]);export{Be as default};
