var Wt=Object.defineProperty,qt=Object.defineProperties;var Vt=Object.getOwnPropertyDescriptors;var tt=Object.getOwnPropertySymbols;var Yt=Object.prototype.hasOwnProperty,Jt=Object.prototype.propertyIsEnumerable;var nt=(n,a,t)=>a in n?Wt(n,a,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[a]=t,I=(n,a)=>{for(var t in a||(a={}))Yt.call(a,t)&&nt(n,t,a[t]);if(tt)for(var t of tt(a))Jt.call(a,t)&&nt(n,t,a[t]);return n},le=(n,a)=>qt(n,Vt(a));var ee=(n,a,t)=>new Promise((c,o)=>{var i=r=>{try{u(t.next(r))}catch(l){o(l)}},f=r=>{try{u(t.throw(r))}catch(l){o(l)}},u=r=>r.done?c(r.value):Promise.resolve(r.value).then(i,f);u((t=t.apply(n,a)).next())});import{d as ne,Z as A,_ as ie,ae as ve,G as se,a0 as U,k,u as e,c as R,f as L,w as Se,l as Be,J as pe,r as ht,h as Ve,o as Ye,y as Ie,al as Xt,K as mt,a9 as pt,a7 as G,a8 as _,$ as ce,ab as X,a1 as we,aa as We,F as Zt,m as Ct,A as vt,ah as Qt,e as en,ad as at,aj as Ne,ak as ze,ac as ot}from"./vue-bWmcvXqU.js";import{_ as tn}from"./BasicForm.vue_vue_type_script_setup_true_lang-BNQd6an3.js";import"./BasicForm.vue_vue_type_style_index_0_lang-CNnsnwdM.js";import{P as Je,a as nn,D as an,I as ke,A as Ue,R as ge,F as on,u as Fe,c as ln}from"./componentMap-Cj-lLNJH.js";import{u as sn}from"./useForm-Cjv2vJne.js";import{az as lt,k as Ke,f as _e,aA as Me,aB as cn,aC as rn,t as un,B as fn,aD as dn,S as gn,_ as st,aE as wt,V as hn,aF as mn,c as pn,aw as Ge,an as Cn,at as vn,aG as wn}from"./entry/index-C2yXXbfE-1713597257644.js";import{ar as Sn,a3 as he,as as yn,at as bn,f as me,e as Z,l as Xe,a as _n,au as xn,av as Rn,aq as ct,o as Ze,am as Oe,aw as Tn,T as Te,af as St,ax as In,a4 as kn,d as it,x as Le,ay as Fn,D as Kn,ae as An,a9 as Dn,aa as Pn,az as $n,aA as yt}from"./antd-D-XvgdAE.js";import{_ as En,p as te,a as qe,u as bt,b as On,c as Bn}from"./TableImg.vue_vue_type_style_index_0_lang-I5-izhQm.js";import{b as rt}from"./uuid-D0SLUWHI.js";import Hn from"./sortable.esm-CoO8jRpa.js";const Nn={class:"edit-header-cell"},ut=ne({name:"EditTableHeaderIcon",__name:"EditTableHeaderIcon",props:{title:{type:String,default:""}},setup(n){return(a,t)=>(A(),ie("span",Nn,[ve(a.$slots,"default"),se(" "+U(n.title)+" ",1),k(e(Sn))]))}}),zn=ne({name:"TableHeaderCell",components:{EditTableHeaderCell:ut,BasicHelp:lt},props:{column:{type:Object,default:()=>({})}},setup(n){const{prefixCls:a}=Ke("basic-table-header-cell"),t=R(()=>{var i;return!!((i=n.column)!=null&&i.edit)}),c=R(()=>{var f;const i=n.column;return typeof i.customHeaderRender=="function"?i.customHeaderRender(i):(i==null?void 0:i.customTitle)||((f=n.column)==null?void 0:f.title)}),o=R(()=>{var i;return(i=n.column)==null?void 0:i.helpMessage});return()=>k("div",null,[t.value?k(ut,null,{default:()=>[c.value]}):k("span",{class:"default-header-cell"},[c.value]),o.value&&k(lt,{text:o.value,class:`${a}__help`},null)])}});function Ln({page:n,type:a,originalElement:t}){return a==="prev"?n===0?null:Be(yn):a==="next"?n===1?null:Be(bn):t}function Mn(n){const{t:a}=_e(),t=L({}),c=L(!0);Se(()=>e(n).pagination,l=>{!he(l)&&l&&(t.value=I(I({},e(t)),l!=null?l:{}))});const o=R(()=>{const{pagination:l}=e(n);return!e(c)||he(l)&&!l?!1:I(I({current:1,size:"small",defaultPageSize:Je,showTotal:S=>a("component.table.total",{total:S}),showSizeChanger:!0,pageSizeOptions:nn,itemRender:Ln,showQuickJumper:!0},he(l)?{}:l),e(t))});function i(l){const S=e(o);t.value=I(I({},he(S)?{}:S),l)}function f(){return e(o)}function u(){return e(c)}function r(l){return ee(this,null,function*(){c.value=l})}return{getPagination:f,getPaginationInfo:o,setShowPagination:r,getShowPagination:u,setPagination:i}}function Un(n){return({text:a,record:t,index:c})=>(pe(t).onValid=()=>ee(this,null,function*(){if(Me(t==null?void 0:t.validCbs)){const o=((t==null?void 0:t.validCbs)||[]).map(f=>f());return(yield Promise.all(o)).every(f=>!!f)}else return!1}),pe(t).onEdit=(o,i=!1)=>ee(this,null,function*(){var f,u;return i||(t.editable=o),!o&&i?(yield t.onValid())&&(yield(f=t.onSubmitEdit)==null?void 0:f.call(t))?(t.editable=!1,!0):!1:(!o&&!i&&((u=t.onCancelEdit)==null||u.call(t)),!0)}),Be(En,{value:a,record:t,column:n,index:c}))}function _t(n,a){const{key:t,dataIndex:c,children:o}=n;n.align=n.align||an,a&&(t||(n.key=typeof c=="object"?c.join("-"):c),he(n.ellipsis)||Object.assign(n,{ellipsis:a})),o&&o.length&&xt(o,!!a)}function xt(n,a){n&&n.forEach(t=>{const{children:c}=t;_t(t,a),xt(c,a)})}function jn(n,a,t){const{t:c}=_e(),{showIndexColumn:o,indexColumnProps:i,isTreeTable:f}=e(n);let u=!1;if(e(f)||(t.forEach(()=>{const l=t.findIndex(S=>S.flag===ke);o?u=l===-1:!o&&l!==-1&&t.splice(l,1)}),!u))return;const r=t.some(l=>l.fixed==="left");t.unshift(I(I({flag:ke,width:60,title:c("component.table.index"),align:"center",customRender:({index:l})=>{const S=e(a);if(he(S))return`${l+1}`;const{current:F=1,pageSize:D=Je}=S;return((F<1?1:F)-1)*D+l+1}},r?{fixed:"left"}:{}),i))}function Gn(n,a){const{actionColumn:t}=e(n);if(!t)return;const c=a.findIndex(o=>o.flag===Ue);c===-1&&a.push(le(I(le(I({},a[c]),{fixed:"right"}),t),{flag:Ue}))}function Wn(n,a){const t=L(e(n).columns);let c=e(n).columns;const o=R(()=>{const v=me(e(t));if(jn(n,a,v),Gn(n,v),!v)return[];const{ellipsis:s}=e(n);return v.forEach(h=>{const{customRender:g,slots:C}=h;_t(h,Reflect.has(h,"ellipsis")?!!h.ellipsis:!!s&&!g&&!C)}),v});function i(v){const s=v.ifShow;let h=!0;return he(s)&&(h=s),Z(s)&&(h=s(v)),h}const{hasPermission:f}=cn(),u=R(()=>{const v=ft(e(o)),s=g=>{const{slots:C,customRender:w,format:x,edit:O,editRow:B,flag:$}=g;(!C||!(C!=null&&C.title))&&(g.customTitle=g.title);const W=[ke,Ue].includes($);return!w&&x&&!O&&!W&&(g.customRender=({text:V,record:p,index:b})=>qn(V,x,p,b)),(O||B)&&!W&&(g.customRender=Un(g)),ht(g)};return me(v).filter(g=>f(g.auth)&&i(g)).map(g=>{var C;return(C=g.children)!=null&&C.length&&(g.children=g.children.map(s)),s(g)})});Se(()=>e(n).columns,v=>{var s;t.value=v,c=(s=v==null?void 0:v.filter(h=>!h.flag))!=null?s:[]});function r(v,s){!v||!s||c.forEach(h=>{if(h.dataIndex===v){Object.assign(h,s);return}})}function l(v){const s=me(v);if(!Me(s))return;if(s.length<=0){t.value=[];return}const h=s[0],g=c.map(C=>C.dataIndex);if(!Xe(h)&&!Me(h))t.value=s;else{const C=s.map(x=>x.toString()),w=[];c.forEach(x=>{var O;w.push(le(I({},x),{defaultHidden:!C.includes(((O=x.dataIndex)==null?void 0:O.toString())||x.key)}))}),_n(g,s)||w.sort((x,O)=>{var B,$;return C.indexOf((B=x.dataIndex)==null?void 0:B.toString())-C.indexOf(($=O.dataIndex)==null?void 0:$.toString())}),t.value=w}}function S(v){const{ignoreIndex:s,ignoreAction:h,sort:g}=v||{};let C=pe(e(o));return s&&(C=C.filter(w=>w.flag!==ke)),h&&(C=C.filter(w=>w.flag!==Ue)),g&&(C=ft(C)),C}function F(){return c}function D(v){Me(v)&&(c=v.filter(s=>!s.flag))}function M(v,s){s.width=v}return{getColumnsRef:o,getCacheColumns:F,getColumns:S,setColumns:l,setColumnWidth:M,getViewColumns:u,setCacheColumnsByField:r,setCacheColumns:D}}function ft(n){const a=[],t=[],c=[];for(const u of n){if(u.fixed==="left"){a.push(u);continue}if(u.fixed==="right"){t.push(u);continue}c.push(u)}const o=u=>!u.defaultHidden,i=[...a,...c,...t].filter(o),f=[...i];for(;f.length;){const u=f[0];Array.isArray(u.children)?(u.children=u.children.filter(o),f.shift(),f.unshift(...u.children)):f.shift()}return i}function qn(n,a,t,c){if(!a)return n;if(Z(a))return a(n,t,c);try{const o="date|";if(Xe(a)&&a.startsWith(o)&&n){const i=a.replace(o,"");return i?rn(n,i):n}if(xn(a))return a.get(n)}catch(o){return n}}function Vn(n,{getPaginationInfo:a,setPagination:t,setLoading:c,getFieldsValue:o,clearSelectedRowKeys:i,tableData:f},u){const r=ht({sortInfo:{},filterInfo:{}}),l=L([]),S=L({});Ve(()=>{f.value=e(l)}),Se(()=>e(n).dataSource,()=>{const{dataSource:p,api:b}=e(n);!b&&p&&(l.value=p)},{immediate:!0});function F(p,b,P){const{clearSelectOnPageChange:E,sortFn:H,filterFn:Y}=e(n);E&&i(),t(p);const N={};if(P&&Z(H)){const j=H(P);r.sortInfo=j,N.sortInfo=j}if(b&&Z(Y)){const j=Y(b);r.filterInfo=j,N.filterInfo=j}O(N)}function D(p){!p||!Array.isArray(p)||p.forEach(b=>{b[ge]||(b[ge]=rt()),b.children&&b.children.length&&D(b.children)})}const M=R(()=>e(n).autoCreateKey&&!e(n).rowKey),v=R(()=>{const{rowKey:p}=e(n);return e(M)?ge:p}),s=R(()=>{const p=e(l);if(!p||p.length===0)return e(l);if(e(M)){const b=p[0],P=p[p.length-1];if(b&&P&&(!b[ge]||!P[ge])){const E=me(e(l));E.forEach(H=>{H[ge]||(H[ge]=rt()),H.children&&H.children.length&&D(H.children)}),l.value=E}}return e(l)});function h(p,b,P){return ee(this,null,function*(){return l.value[p]&&(l.value[p][b]=P),l.value[p]})}function g(p,b){const P=x(p);if(P){for(const E in P)Reflect.has(b,E)&&(P[E]=b[E]);return P}}function C(p){var E;if(!l.value||l.value.length==0)return;const b=Array.isArray(p)?p:[p];function P(H,Y){const N=j(H,Y);if(N===null||N.index===-1)return;N.data.splice(N.index,1);function j(J,re){var ue;if(J==null)return null;for(let ae=0;ae<J.length;ae++){const oe=J[ae];if(te(e(v),oe)===re)return{index:ae,data:J};if(((ue=oe.children)==null?void 0:ue.length)>0){const fe=j(oe.children,re);if(fe!=null)return fe}}return null}}for(const H of b)P(l.value,H),P(e(n).dataSource,H);t({total:(E=e(n).dataSource)==null?void 0:E.length})}function w(p,b){var E;b=b!=null?b:(E=l.value)==null?void 0:E.length;const P=fn(p)?[p]:p;return e(l).splice(b,0,...P),e(l)}function x(p){if(!l.value||l.value.length===0)return;const{childrenColumnName:b="children"}=e(n);return(E=>{let H;return E.some(function Y(N){return te(e(v),N)===p?(H=N,!0):N[b]&&N[b].some(Y)}),H})(l.value)}function O(p){return ee(this,null,function*(){var re,ue,ae;const{api:b,searchInfo:P,defSort:E,fetchSetting:H,beforeFetch:Y,afterFetch:N,useSearchForm:j,pagination:J}=e(n);if(!(!b||!Z(b)))try{c(!0);const{pageField:oe,sizeField:fe,listField:xe,totalField:Re}=Object.assign({},on,H);let de={};const{current:ye=1,pageSize:Ae=Je}=e(a);he(J)&&!J||he(a)?de={}:(de[oe]=p&&p.page||ye,de[fe]=Ae);const{sortInfo:De={},filterInfo:Pe}=r;let d=Rn(de,j?o():{},P,(re=p==null?void 0:p.searchInfo)!=null?re:{},E,De,Pe,(ue=p==null?void 0:p.sortInfo)!=null?ue:{},(ae=p==null?void 0:p.filterInfo)!=null?ae:{});Y&&Z(Y)&&(d=(yield Y(d))||d);const y=yield b(d);S.value=y;const T=Array.isArray(y);let m=T?y:ct(y,xe);const K=T?y.length:ct(y,Re);if(Number(K)){const Ce=Math.ceil(K/Ae);if(ye>Ce)return t({current:Ce}),yield O(p)}return N&&Z(N)&&(m=(yield N(m))||m),l.value=m,t({total:K||0}),p&&p.page&&t({current:p.page||1}),u("fetch-success",{items:e(m),total:K}),m}catch(oe){u("fetch-error",oe),l.value=[],t({total:0})}finally{c(!1)}})}function B(p){l.value=p}function $(){return s.value}function W(){return S.value}function V(p){return ee(this,null,function*(){return yield O(p)})}return Ye(()=>{un(()=>{e(n).immediate&&O()},16)}),{getDataSourceRef:s,getDataSource:$,getRawDataSource:W,getRowKey:v,setTableData:B,getAutoCreateKey:M,fetch:O,reload:V,updateTableData:h,updateTableDataRecord:g,deleteTableDataRecord:C,insertTableDataRecord:w,findTableDataRecord:x,handleTableChange:F}}function Yn(n){const a=L(e(n).loading);Se(()=>e(n).loading,o=>{a.value=o});const t=R(()=>e(a));function c(o){a.value=o}return{getLoading:t,setLoading:c}}function Jn(n,a,t){const c=L([]),o=L([]),i=R(()=>{const{rowSelection:s}=e(n);return s?I({selectedRowKeys:e(c),onChange:(h,g,C)=>{var w,x;if(C)(w=s.onChange)==null||w.call(s,h,g);else{const O=a.value.map(B=>te(e(u),B));for(const B of c.value.filter($=>O.includes($)))if(h.findIndex($=>$===B)<0){const $=c.value.findIndex(W=>W===B);$>-1&&(c.value.splice($,1),o.value.splice($,1))}for(const B of h)if(c.value.findIndex(W=>W===B)<0){c.value.push(B);const W=g.find(V=>te(e(u),V)===B);W&&o.value.push(W)}r(c.value),(x=s.onChange)==null||x.call(s,c.value,o.value)}}},Ze(s,["onChange"])):null});Se(()=>{var s;return(s=e(n).rowSelection)==null?void 0:s.selectedRowKeys},s=>{r(s)}),Se(()=>e(c),()=>{Ie(()=>{const{rowSelection:s}=e(n);if(s){const{onChange:h}=s;h&&Z(h)&&h(D(),M(),!0)}t("selection-change",{keys:D(),rows:M()})})},{deep:!0});const f=R(()=>e(n).autoCreateKey&&!e(n).rowKey),u=R(()=>{const{rowKey:s}=e(n);return e(f)?ge:s});function r(s){var w;c.value=s||[];const h=pe(e(a)).concat(pe(e(o))),g=dn(h,x=>s==null?void 0:s.includes(te(e(u),x)),{children:(w=n.value.childrenColumnName)!=null?w:"children"}),C=[];s==null||s.forEach(x=>{const O=g.find(B=>te(e(u),B)===x);O?C.push(O):h[0]&&C.push({[qe(e(u),h[0])]:x})}),o.value=C}function l(s){o.value=s,c.value=o.value.map(h=>te(e(u),h))}function S(){o.value=[],c.value=[]}function F(s){const g=e(c).findIndex(C=>C===s);g!==-1&&e(c).splice(g,1)}function D(){return e(c)}function M(){return e(o)}function v(){return e(i)}return{getRowSelection:v,getRowSelectionRef:i,getSelectRows:M,getSelectRowKeys:D,setSelectedRowKeys:r,clearSelectedRowKeys:S,deleteSelectRowByKey:F,setSelectedRows:l}}function Xn(n,a){let t;function c(i){return ee(this,null,function*(){var r;const{id:f}=i,u=t==null?void 0:t.querySelector(`[data-row-key="${f}"]`);yield Ie(),t==null||t.scrollTo({top:(r=u==null?void 0:u.offsetTop)!=null?r:0,behavior:"smooth"})})}function o(i){const f=e(n);if(!f)return;const u=f.$el;if(!u||!t&&(t=u.querySelector(".ant-table-body"),!t))return;const r=e(a);if(r)if(i==="top")c(r[0]);else if(i==="bottom")c(r[r.length-1]);else{const l=r.find(S=>S.id===i);l&&c(l)}}return{scrollTo:o}}function Zn(n,{setSelectedRowKeys:a,getSelectRowKeys:t,getAutoCreateKey:c,clearSelectedRowKeys:o,emit:i}){return{customRow:(u,r)=>({onClick:l=>{l==null||l.stopPropagation();function S(){var C;const{rowSelection:F,rowKey:D,clickToRowSelect:M}=e(n);if(!F||!M)return;const v=t()||[],s=te(D,u,e(c));if(!s)return;if(F.type==="checkbox"){const w=(C=l.composedPath)==null?void 0:C.call(l).find(B=>B.tagName==="TR");if(!w)return;const x=w.querySelector("input[type=checkbox]");if(!x||x.hasAttribute("disabled"))return;if(!v.includes(s)){v.push(s),a(v);return}const O=v.findIndex(B=>B===s);v.splice(O,1),a(v);return}if(F.type==="radio"){if(!v.includes(s)){v.length&&o(),a([s]);return}o()}}S(),i("row-click",u,r,l)},onDblclick:l=>{i("row-dbClick",u,r,l)},onContextmenu:l=>{i("row-contextmenu",u,r,l)},onMouseenter:l=>{i("row-mouseenter",u,r,l)},onMouseleave:l=>{i("row-mouseleave",u,r,l)}})}}function Qn(n,a){function t(c,o){const{striped:i,rowClassName:f}=e(n),u=[];return i&&u.push((o||0)%2===1?`${a}-row__striped`:""),f&&Z(f)&&u.push(f(c,o)),u.filter(r=>!!r).join(" ")}return{getRowClassName:t}}const ea=["data-no"],ta=ne({name:"ColumnSetting",__name:"ColumnSetting",props:{cache:{type:Boolean,default:()=>!1}},emits:["columns-change"],setup(n,{emit:a}){const t=bt(),c=a,o=Xt(),{t:i}=_e(),{prefixCls:f}=Ke("basic-column-setting"),u=mt(),r=Fe(),l=n,S=()=>Z(u.getPopupContainer)?u.getPopupContainer():wt();let F=!1,D=!1,M,v=[],s=!1,h=!1;const g=L([]),C=L(null),w=L([]);Se(w,()=>{s&&(g.value.filter(d=>w.value.includes(d.value)).forEach(d=>{d.column.defaultHidden=!1}),g.value.filter(d=>!w.value.includes(d.value)).forEach(d=>{d.column.defaultHidden=!0,d.fixed=void 0}),fe(),J(),l.cache&&b())});const x=L(!1),O=()=>{w.value.length<g.value.length?w.value=g.value.map(d=>d.value):w.value=[]},B=R(()=>w.value.length>0&&w.value.length<g.value.length),$=L(!1),W=d=>{xe(d.target.checked),l.cache&&typeof o.name=="string"&&t.setShowIndexColumn(o.name,d.target.checked)},V=L(!1),p=d=>{Re(d.target.checked),l.cache&&typeof o.name=="string"&&t.setShowRowSelection(o.name,d.target.checked)},b=()=>{typeof o.name=="string"&&t.setColumns(o.name,g.value)},P=()=>{$.value=F,W({target:{checked:F}}),V.value=D,p({target:{checked:D}}),g.value=me(v),de()},E=(d,y)=>{y==="left"?!d.fixed||d.fixed==="right"?d.fixed="left":d.fixed=void 0:y==="right"&&(!d.fixed||d.fixed==="left"?d.fixed="right":d.fixed=void 0),J(),l.cache&&b()},H=()=>ee(this,null,function*(){if(C.value){const d=C.value.$el;Array.from(d.children).forEach(y=>d.removeChild(y))}yield Ie()}),Y=d=>{if(d){if("ifShow"in d){if(typeof d.ifShow=="boolean")return d.ifShow;if(d.ifShow)return d.ifShow(d)}return!0}return!1},N=()=>r.getColumns({ignoreIndex:!0,ignoreAction:!0}).filter(d=>Y(d)),j=d=>{h=!0,r==null||r.setColumns(d);const y=d.map(T=>({dataIndex:T.dataIndex?T.dataIndex.toString():"",fixed:T.fixed,visible:!T.defaultHidden}));c("columns-change",y)},J=()=>{var m;const d=me(r.getColumns());let y=d.filter(K=>K.flag!==ke&&(K.fixed==="left"||K.fixed===!0)).length;$.value&&y++;for(const K of g.value){const Ce=d.findIndex(be=>be.dataIndex===K.value);if(Ce>-1){const be=d[Ce];be.defaultHidden=(m=K.column)==null?void 0:m.defaultHidden,be.fixed=K.fixed,d.splice(Ce,1),d.splice(y++,0,be)}}const T=d.findIndex(K=>K.dataIndex==="action");if(T>-1){const K=d.splice(T,1);d.push(K[0])}j(d)},re=()=>ee(this,null,function*(){if(yield Ie(),C.value){const d=C.value.$el;Hn.create(e(d),{animation:500,delay:400,delayOnTouchOnly:!0,handle:".table-column-drag-icon ",dataIdAttr:"data-no",onEnd:y=>{const{oldIndex:T,newIndex:m}=y;if(it(T)||it(m)||T===m)return;const K=me(g.value);T>m?(K.splice(m,0,K[T]),K.splice(T+1,1)):(K.splice(m+1,0,K[T]),K.splice(T,1)),g.value=K,J(),l.cache&&b()}})}}),ue=()=>{if(typeof o.name=="string"){let d=t.getColumns(o.name);if(d&&JSON.stringify(g.value.map(y=>({value:y.value,label:y.label})))!==JSON.stringify(d.map(y=>({value:y.value,label:y.label})))){const y=g.value.reduce((T,m)=>(T[m.value]=m.label,T),{});if(Array.isArray(d)){d=d.filter(m=>y[m.value]),d.forEach(m=>{m.label=y[m.value]});const T=d.map(m=>m.value);d=d.concat(g.value.filter(m=>!T.includes(m.value))),t.setColumns(o.name,d)}}}},ae=()=>{if(typeof o.name=="string"){const d=t.getShowIndexColumn(o.name);typeof d=="boolean"&&($.value=F&&d);const y=t.getShowRowSelection(o.name);typeof y=="boolean"&&(V.value=D&&y)}if(W({target:{checked:$.value}}),p({target:{checked:V.value}}),typeof o.name=="string"){const d=t.getColumns(o.name);Array.isArray(d)&&(g.value=d)}},oe=()=>{w.value=g.value.filter(d=>{var y;return!((y=d.column)!=null&&y.defaultHidden)}).map(d=>d.value)},fe=()=>{x.value=g.value.length===w.value.length},xe=d=>{h=!0,r.setProps({showIndexColumn:d})},Re=d=>{h=!0,r.setProps({rowSelection:d?le(I({},Ze(M,["selectedRowKeys"])),{fixed:!0}):void 0})},de=()=>{oe(),fe(),xe($.value),Re(V.value),J()},ye=()=>ee(this,null,function*(){var d;if(!s){const y=N();(d=r.setCacheColumns)==null||d.call(r,y);const T=[];for(const m of y)T.push({label:typeof m.title=="string"?m.title:m.customTitle==="string"?m.customTitle:"",value:typeof m.dataIndex=="string"?m.dataIndex:m.title==="string"?m.title:"",column:{defaultHidden:m.defaultHidden},fixed:m.fixed});F=r.getBindValues.value.showIndexColumn||!1,M=r.getRowSelection(),D=!!M,v=T,$.value=F,V.value=D,g.value=me(T),l.cache&&ue(),l.cache&&ae(),de(),s=!0}});ee(this,null,function*(){yield H(),ye()});const De=R(()=>r==null?void 0:r.getColumns()),Pe=R(()=>r==null?void 0:r.getBindValues);return Ye(()=>{Se([De,Pe],()=>{h?h=!1:(s=!1,ye())})}),(d,y)=>{const T=pt("a-button");return A(),G(e(Te),{placement:"top"},{title:_(()=>[ce("span",null,U(e(i)("component.table.settingColumn")),1)]),default:_(()=>[k(e(kn),{placement:"bottomLeft",trigger:"click",onOpenChange:re,overlayClassName:`${e(f)}__column-list`,getPopupContainer:S},{title:_(()=>[ce("div",{class:we(`${e(f)}__popover-title`)},[k(e(Oe),{indeterminate:B.value,checked:x.value,"onUpdate:checked":y[0]||(y[0]=m=>x.value=m),onChange:O},{default:_(()=>[se(U(e(i)("component.table.settingColumnShow")),1)]),_:1},8,["indeterminate","checked"]),k(e(Oe),{checked:$.value,"onUpdate:checked":y[1]||(y[1]=m=>$.value=m),onChange:W},{default:_(()=>[se(U(e(i)("component.table.settingIndexColumnShow")),1)]),_:1},8,["checked"]),e(D)?(A(),G(e(Oe),{key:0,checked:V.value,"onUpdate:checked":y[2]||(y[2]=m=>V.value=m),onChange:p},{default:_(()=>[se(U(e(i)("component.table.settingSelectColumnShow")),1)]),_:1},8,["checked"])):X("",!0),k(T,{size:"small",type:"link",onClick:P},{default:_(()=>[se(U(e(i)("common.resetText")),1)]),_:1})],2)]),content:_(()=>[k(e(gn),null,{default:_(()=>[k(e(Oe).Group,{value:w.value,"onUpdate:value":y[3]||(y[3]=m=>w.value=m),ref_key:"columnOptionsRef",ref:C},{default:_(()=>[(A(!0),ie(Zt,null,We(g.value,m=>(A(),ie("div",{key:m.value,class:we(`${e(f)}__check-item`),"data-no":m.value},[k(e(Tn),{class:"table-column-drag-icon"}),k(e(Oe),{value:m.value},{default:_(()=>[se(U(m.label),1)]),_:2},1032,["value"]),k(e(Te),{placement:"bottomLeft",mouseLeaveDelay:.4,getPopupContainer:S},{title:_(()=>[se(U(e(i)("component.table.settingFixedLeft")),1)]),default:_(()=>[k(st,{icon:"line-md:arrow-align-left",class:we([`${e(f)}__fixed-left`,{active:m.fixed==="left",disabled:m.value?!w.value.includes(m.value):!0}]),onClick:K=>E(m,"left")},null,8,["class","onClick"])]),_:2},1024),k(e(St),{type:"vertical"}),k(e(Te),{placement:"bottomLeft",mouseLeaveDelay:.4,getPopupContainer:S},{title:_(()=>[se(U(e(i)("component.table.settingFixedRight")),1)]),default:_(()=>[k(st,{icon:"line-md:arrow-align-left",class:we([`${e(f)}__fixed-right`,{active:m.fixed==="right",disabled:m.value?!w.value.includes(m.value):!0}]),onClick:K=>E(m,"right")},null,8,["class","onClick"])]),_:2},1024)],10,ea))),128))]),_:1},8,["value"])]),_:1})]),default:_(()=>[k(e(In))]),_:1},8,["overlayClassName"])]),_:1})}}}),na=ne({name:"SizeSetting",__name:"SizeSetting",setup(n){const a=bt(),t=Fe(),{t:c}=_e(),o=L([t.getSize()]),i=({key:f})=>{o.value=[f],a.setTableSize(f),t.setProps({size:f})};return Ye(()=>{o.value=[a.getTableSize],t.setProps({size:o.value[0]})}),(f,u)=>(A(),G(e(Te),{placement:"top"},{title:_(()=>[ce("span",null,U(e(c)("component.table.settingDens")),1)]),default:_(()=>[k(e(Kn),{placement:"bottom",trigger:["click"],getPopupContainer:e(wt)},{overlay:_(()=>[k(e(Le),{onClick:i,selectable:"",selectedKeys:o.value,"onUpdate:selectedKeys":u[0]||(u[0]=r=>o.value=r)},{default:_(()=>[k(e(Le).Item,{key:"default"},{default:_(()=>[ce("span",null,U(e(c)("component.table.settingDensDefault")),1)]),_:1}),k(e(Le).Item,{key:"middle"},{default:_(()=>[ce("span",null,U(e(c)("component.table.settingDensMiddle")),1)]),_:1}),k(e(Le).Item,{key:"small"},{default:_(()=>[ce("span",null,U(e(c)("component.table.settingDensSmall")),1)]),_:1})]),_:1},8,["selectedKeys"])]),default:_(()=>[k(e(Fn))]),_:1},8,["getPopupContainer"])]),_:1}))}}),aa=ne({name:"RedoSetting",__name:"RedoSetting",setup(n){const a=Fe(),{t}=_e();function c(){a.reload()}return(o,i)=>(A(),G(e(Te),{placement:"top"},{title:_(()=>[ce("span",null,U(e(t)("common.redo")),1)]),default:_(()=>[k(e(An),{onClick:c})]),_:1}))}}),oa=ne({name:"FullScreenSetting",__name:"FullScreenSetting",setup(n){const a=Fe(),{t}=_e(),{toggle:c,isFullscreen:o}=hn(a.wrapRef);return(i,f)=>(A(),G(e(Te),{placement:"top"},{title:_(()=>[ce("span",null,U(e(t)("component.table.settingFullScreen")),1)]),default:_(()=>[e(o)?(A(),G(e(Pn),{key:1,onClick:e(c)},null,8,["onClick"])):(A(),G(e(Dn),{key:0,onClick:e(c)},null,8,["onClick"]))]),_:1}))}}),la={class:"table-settings"},sa=ne({name:"TableSetting",__name:"index",props:{setting:{type:Object,default:()=>({})}},emits:["columns-change"],setup(n,{emit:a}){const t=n,c=a,o=Fe(),i=R(()=>I({redo:!0,size:!0,setting:!0,settingCache:!1,fullScreen:!1},t.setting));function f(r){c("columns-change",r)}function u(){return o?e(o.wrapRef):document.body}return(r,l)=>(A(),ie("div",la,[i.value.redo?(A(),G(aa,{key:0,getPopupContainer:u})):X("",!0),i.value.size?(A(),G(na,{key:1,getPopupContainer:u})):X("",!0),i.value.setting?(A(),G(ta,{key:2,onColumnsChange:f,getPopupContainer:u,cache:i.value.settingCache},null,8,["cache"])):X("",!0),i.value.fullScreen?(A(),G(oa,{key:3,getPopupContainer:u})):X("",!0)]))}}),ca=ne({name:"BasicTableTitle",__name:"TableTitle",props:{title:{type:[Function,String]},getSelectRows:{type:Function},helpMessage:{type:[String,Array]}},setup(n){const a=n,{prefixCls:t}=Ke("basic-table-title"),c=R(()=>{const{title:o,getSelectRows:i=()=>{}}=a;let f=o;return Z(o)&&(f=o({selectRows:i()})),f});return(o,i)=>c.value?(A(),G(e(mn),{key:0,class:we(e(t)),helpMessage:n.helpMessage},{default:_(()=>[se(U(c.value),1)]),_:1},8,["class","helpMessage"])):X("",!0)}}),ia={key:0},ra={key:1},ua=ne({name:"TableSelectBar",__name:"TableSelectionBar",props:{count:{default:()=>0},clearSelectedRowKeys:{}},setup(n){const{t:a}=_e(),{prefixCls:t}=Ke("table-select-bar"),c=n;return(o,i)=>{const f=pt("a-button");return A(),G(e($n),{type:"info",showIcon:"",class:we([e(t)])},{message:_(()=>[c.count>0?(A(),ie("span",ia,U(e(a)("component.table.selectionBarTips",{count:c.count})),1)):(A(),ie("span",ra,U(e(a)("component.table.selectionBarEmpty")),1)),Ct(k(f,{type:"link",onClick:o.clearSelectedRowKeys,size:"small"},{default:_(()=>[se(U(e(a)("component.table.selectionBarClear")),1)]),_:1},8,["onClick"]),[[vt,c.count>0]])]),_:1},8,["class"])}}}),fa=pn(ua,[["__scopeId","data-v-6220691a"]]),da={style:{width:"100%"}},ga={key:0,style:{margin:"5px"}},ha={key:1,style:{margin:"5px"}},ma={class:"flex items-center"},pa=ne({name:"BasicTableHeader",__name:"TableHeader",props:{title:{type:[Function,String]},tableSetting:{type:Object},showTableSetting:{type:Boolean},titleHelpMessage:{type:[String,Array],default:""},clearSelectedRowKeys:{type:Function},count:{type:Number,default:0},showSelectionBar:{type:Boolean,default:!1}},emits:["columns-change"],setup(n,{emit:a}){const t=n,c=a,{prefixCls:o}=Ke("basic-table-header");function i(f){c("columns-change",f)}return(f,u)=>(A(),ie("div",da,[f.$slots.headerTop?(A(),ie("div",ga,[ve(f.$slots,"headerTop")])):X("",!0),n.showSelectionBar?(A(),ie("div",ha,[k(fa,{clearSelectedRowKeys:t.clearSelectedRowKeys,count:t.count},null,8,["clearSelectedRowKeys","count"])])):X("",!0),ce("div",ma,[f.$slots.tableTitle?ve(f.$slots,"tableTitle",{key:0}):X("",!0),!f.$slots.tableTitle&&n.title?(A(),G(ca,{key:1,helpMessage:n.titleHelpMessage,title:n.title},null,8,["helpMessage","title"])):X("",!0),ce("div",{class:we(`${e(o)}__toolbar`)},[ve(f.$slots,"toolbar"),f.$slots.toolbar&&n.showTableSetting?(A(),G(e(St),{key:0,type:"vertical"})):X("",!0),n.showTableSetting?(A(),G(sa,{key:1,setting:n.tableSetting,onColumnsChange:i},null,8,["setting"])):X("",!0)],2)])]))}});function Ca(n,a,t,c){return{getHeaderProps:R(()=>{const{title:i,showTableSetting:f,titleHelpMessage:u,tableSetting:r,showSelectionBar:l}=e(n),S=!a.tableTitle&&!i&&!a.toolbar&&!f;return S&&!Xe(i)?{}:{title:S?null:()=>Be(pa,{title:i,titleHelpMessage:u,showTableSetting:f,tableSetting:r,onColumnsChange:t.onColumnsChange,clearSelectedRowKeys:c.clearSelectedRowKeys,count:c.getSelectRowKeys().length,showSelectionBar:l},I(I(I({},a.toolbar?{toolbar:()=>Ge(a,"toolbar")}:{}),a.tableTitle?{tableTitle:()=>Ge(a,"tableTitle")}:{}),a.headerTop?{headerTop:()=>Ge(a,"headerTop")}:{}))}})}}function va(n,a,t){const c=L([]),o=R(()=>e(n).autoCreateKey&&!e(n).rowKey),i=R(()=>{const{rowKey:s}=e(n);return e(o)?ge:s}),f=R(()=>{const{isTreeTable:s,expandRowByClick:h}=e(n);return!s&&!h?{}:{expandedRowKeys:e(c),onExpandedRowsChange:g=>{c.value=g,t("expanded-rows-change",g)}}});function u(){const s=F();c.value=s}function r(){c.value=[]}function l(s){const{isTreeTable:h,expandRowByClick:g}=e(n);!h&&!g||(c.value=[...c.value,...s])}function S(s){const{isTreeTable:h,expandRowByClick:g}=e(n);!h&&!g||(c.value=e(c).filter(C=>!s.includes(C)))}function F(s){const h=[],{childrenColumnName:g}=e(n);return pe(s||e(a)).forEach(C=>{h.push(te(e(i),C));const w=C[g||"children"];w!=null&&w.length&&h.push(...F(w))}),h}function D(s,h,g,C){if(s.findIndex(w=>te(e(i),w)===g)>-1)return C.push(g),!0;for(const w of s){const x=w[h];if(Array.isArray(x)&&D(x,h,g,C))return C.push(te(e(i),w)),!0}return!1}function M(s){const{childrenColumnName:h}=e(n),g=[];D(a.value,h||"children",s,g),c.value=g}function v(s,h){n.value.accordion&&(n.value.isTreeTable||n.value.expandRowByClick)&&s&&Ie(()=>{M(te(e(i),h))})}return{getExpandOption:f,expandAll:u,collapseAll:r,expandRows:l,collapseRows:S,expandRowAccordion:M,handleTableExpand:v}}const dt="_row",gt="_index",wa=ne({name:"BasicTableFooter",__name:"TableFooter",props:{summaryFunc:{default:null},summaryData:{default:null},scroll:{},rowKey:{default:""}},setup(n){const a=n,t=Fe(),c=R(()=>{var f;if((f=a.summaryData)!=null&&f.length)return a.summaryData.forEach((u,r)=>{u[qe(a.rowKey,u)]=`${r}`}),a.summaryData;if(!Z(a.summaryFunc))return[];let i=pe(e(t.getDataSource()));return i=a.summaryFunc(i),i.forEach((u,r)=>{u[qe(a.rowKey,u)]=`${r}`}),i}),o=R(()=>{const i=e(c),f=me(t.getColumns()),u=f.findIndex(S=>S.flag===ke),r=i.some(S=>Reflect.has(S,dt)),l=i.some(S=>Reflect.has(S,gt));if(u!==-1&&(l?(f[u].customRender=({record:S})=>S[gt],f[u].ellipsis=!1):Reflect.deleteProperty(f[u],"customRender")),t.getRowSelection()&&r){const S=f.some(F=>F.fixed==="left");f.unshift(le(I({width:60,title:"selection",key:"selectionKey",align:"center"},S?{fixed:"left"}:{}),{customRender:({record:F})=>F[dt]}))}return f});return(i,f)=>a.summaryFunc||a.summaryData?(A(),G(e(yt),{key:0,showHeader:!1,bordered:!1,pagination:!1,dataSource:c.value,rowKey:a.rowKey,columns:o.value,tableLayout:"fixed",scroll:a.scroll},null,8,["dataSource","rowKey","columns","scroll"])):X("",!0)}});function Sa(n,a,t,c){const o=R(()=>(e(c)||[]).length===0),i=R(()=>{const{summaryFunc:u,showSummary:r,summaryData:l}=e(n);return r&&!e(o)?()=>Be(wa,{summaryFunc:u,summaryData:l,scroll:e(a)}):void 0});Ve(()=>{f()});function f(){const{showSummary:u}=e(n);!u||e(o)||Ie(()=>{const r=e(t);if(!r)return;const l=r.$el.querySelector(" .ant-table-content,  .ant-table-body");Cn({el:l,name:"scroll",listener:()=>{const S=r.$el.querySelector('.ant-table-footer .ant-table-container  [class^="ant-table-"]');!S||!l||(S.scrollLeft=l.scrollLeft)},wait:0,options:!0})})}return{getFooterProps:i}}function ya(n,a,t,c){const o=R(()=>{const{formConfig:r}=e(n),{submitButtonOptions:l}=r||{};return le(I({showAdvancedButton:!0},r),{submitButtonOptions:I({loading:e(c)},l),compact:!0})}),i=R(()=>Object.keys(a).map(l=>l.startsWith("form-")?l:null).filter(l=>!!l));function f(r){var l,S;return r&&(S=(l=r==null?void 0:r.replace)==null?void 0:l.call(r,/form-/,""))!=null?S:""}function u(r){const{handleSearchInfoFn:l}=e(n);l&&Z(l)&&(r=l(r)||r),t({searchInfo:r,page:1})}return{getFormProps:o,replaceFormSlotKey:f,getFormSlotKeys:i,handleSearchInfoChange:u}}const Pa=ne({name:"BasicTable",__name:"BasicTable",props:On,emits:["fetch-success","fetch-error","selection-change","register","row-click","row-dbClick","row-contextmenu","row-mouseenter","row-mouseleave","edit-end","edit-cancel","edit-row-end","edit-change","expanded-rows-change","change","columns-change"],setup(n,{expose:a,emit:t}){const c=n,o=t,i=mt(),f=Qt(),u=L(null),r=L([]),l=L(null),S=L(null),F=L(),{prefixCls:D}=Ke("basic-table"),[M,v]=sn(),s=R(()=>I(I({},c),e(F))),h=en(vn,!1);Ve(()=>{e(h)&&c.canResize&&wn()});const{getLoading:g,setLoading:C}=Yn(s),{getPaginationInfo:w,getPagination:x,setPagination:O,setShowPagination:B,getShowPagination:$}=Mn(s),{getRowSelection:W,getRowSelectionRef:V,getSelectRows:p,setSelectedRows:b,clearSelectedRowKeys:P,getSelectRowKeys:E,deleteSelectRowByKey:H,setSelectedRowKeys:Y}=Jn(s,r,o),{handleTableChange:N,getDataSourceRef:j,getDataSource:J,getRawDataSource:re,setTableData:ue,updateTableDataRecord:ae,deleteTableDataRecord:oe,insertTableDataRecord:fe,findTableDataRecord:xe,fetch:Re,getRowKey:de,reload:ye,getAutoCreateKey:Ae,updateTableData:De}=Vn(s,{tableData:r,getPaginationInfo:w,setLoading:C,setPagination:O,getFieldsValue:v.getFieldsValue,clearSelectedRowKeys:P},o);function Pe(z,Q,q,Ee){N(z,Q,q),o("change",z,Q,q);const{onChange:je}=e(s);je&&Z(je)&&je(z,Q,q,Ee)}const{getViewColumns:d,getColumns:y,setCacheColumnsByField:T,setCacheColumns:m,setColumnWidth:K,setColumns:Ce,getColumnsRef:be,getCacheColumns:Rt}=Wn(s,w),{getScrollRef:Qe,redoHeight:et}=Bn(s,u,be,V,j,l,S),{scrollTo:Tt}=Xn(u,j),{customRow:It}=Zn(s,{setSelectedRowKeys:Y,getSelectRowKeys:E,clearSelectedRowKeys:P,getAutoCreateKey:Ae,emit:o}),{getRowClassName:kt}=Qn(s,D),{getExpandOption:Ft,expandAll:Kt,expandRows:At,collapseRows:Dt,collapseAll:Pt,handleTableExpand:$t}=va(s,r,o),Et={onColumnsChange:z=>{var Q,q;o("columns-change",z),(q=(Q=e(s)).onColumnsChange)==null||q.call(Q,z)}},Ot={clearSelectedRowKeys:P,getSelectRowKeys:E},{getHeaderProps:Bt}=Ca(s,f,Et,Ot),{getFooterProps:Ht}=Sa(s,Qe,u,j),{getFormProps:Nt,replaceFormSlotKey:zt,getFormSlotKeys:Lt,handleSearchInfoChange:Mt}=ya(s,f,Re,g),$e=R(()=>{const z=e(j);let Q=I(le(I(I(le(I({},i),{customRow:It}),e(s)),e(Bt)),{scroll:e(Qe),loading:e(g),tableLayout:"fixed",rowSelection:e(V),rowKey:e(de),columns:pe(e(d)),pagination:pe(e(w)),dataSource:z,footer:e(Ht)}),e(Ft));return Q=Ze(Q,["class","onChange"]),Q}),Ut=R(()=>{const z=e($e);return[D,i.class,{[`${D}-form-container`]:z.useSearchForm,[`${D}--inset`]:z.inset}]}),jt=R(()=>{const{emptyDataIsShowTable:z,useSearchForm:Q}=e(s);return z||!Q?!0:!!e(j).length});function Gt(z){F.value=I(I({},e(F)),z)}const He={reload:ye,getSelectRows:p,setSelectedRows:b,clearSelectedRowKeys:P,getSelectRowKeys:E,deleteSelectRowByKey:H,setPagination:O,setTableData:ue,updateTableDataRecord:ae,deleteTableDataRecord:oe,insertTableDataRecord:fe,findTableDataRecord:xe,redoHeight:et,setSelectedRowKeys:Y,setColumns:Ce,setLoading:C,getDataSource:J,getRawDataSource:re,setProps:Gt,getRowSelection:W,getPaginationRef:x,getColumns:y,getCacheColumns:Rt,emit:o,updateTableData:De,setShowPagination:B,getShowPagination:$,setCacheColumnsByField:T,expandAll:Kt,collapseAll:Pt,expandRows:At,collapseRows:Dt,scrollTo:Tt,getSize:()=>e($e).size,setCacheColumns:m};return ln(le(I({},He),{wrapRef:l,getBindValues:$e})),o("register",He,v),a(I({tableElRef:u},He)),(z,Q)=>(A(),ie("div",{ref_key:"wrapRef",ref:l,class:we(Ut.value)},[$e.value.useSearchForm?(A(),G(e(tn),ot({key:0,ref_key:"formRef",ref:S,submitOnReset:""},e(Nt),{tableAction:He,onRegister:e(M),onSubmit:e(Mt),onAdvancedChange:e(et)}),at({_:2},[We(e(Lt),q=>({name:e(zt)(q),fn:_(Ee=>[ve(z.$slots,q,Ne(ze(Ee||{})))])}))]),1040,["onRegister","onSubmit","onAdvancedChange"])):X("",!0),Ct(k(e(yt),ot({ref_key:"tableElRef",ref:u},$e.value,{rowClassName:e(kt),onChange:Pe,onResizeColumn:e(K),onExpand:e($t)}),at({headerCell:_(({column:q})=>[ve(z.$slots,"headerCell",Ne(ze({column:q})),()=>[k(zn,{column:q},null,8,["column"])])]),bodyCell:_(q=>[ve(z.$slots,"bodyCell",Ne(ze(q||{})))]),_:2},[We(Object.keys(z.$slots),q=>({name:q,fn:_(Ee=>[ve(z.$slots,q,Ne(ze(Ee||{})))])}))]),1040,["rowClassName","onResizeColumn","onExpand"]),[[vt,jt.value]])],2))}});export{Pa as _,zn as a};
