import{d as v,f as h,Y as k,c as x,u as t,a9 as r,Z as C,a7 as b,a8 as u,G as a,a0 as y,k as p,$ as e}from"./vue-bWmcvXqU.js";import{P as B}from"./index-DmvVZzf-.js";import"./entry/index-C2yXXbfE-1713597257644.js";import"./antd-D-XvgdAE.js";import"./useContentViewHeight-ByP0kkZI.js";import"./useWindowSizeFn-rAoW7C_Y.js";import"./onMountedOrActivated-C5rGMWQz.js";const N=e("br",null,null,-1),P=e("br",null,null,-1),V=e("ul",null,[e("li",null,"可刷新页面测试路由参数情况是否正常。"),e("li",null,"可于左侧菜单中展开子菜单，点击测试参数是否携带正常。")],-1),W=v({__name:"index",setup(g){const o=h(""),{currentRoute:n,replace:c}=k(),i=x(()=>t(n).params),m=()=>{const{name:l}=t(n);c({name:l,params:{id:t(o)}})};return(l,s)=>{const _=r("a-input"),d=r("a-button");return C(),b(t(B),{title:"带参数菜单（路由）",content:"支持多级参数"},{default:u(()=>[a(" 当前参数："+y(i.value)+" ",1),N,a(" 输入参数切换路由： "),p(_,{value:o.value,"onUpdate:value":s[0]||(s[0]=f=>o.value=f),placeholder:"建议为url标准字符，输入后点击切换"},null,8,["value"]),p(d,{type:"primary",class:"my-2",onClick:m},{default:u(()=>[a("切换路由")]),_:1}),P,a(" 切换路由后 "),V]),_:1})}}});export{W as default};
