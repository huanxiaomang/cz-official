import{i as s}from"./mock-api-BDUNxN5J.js";import{P as p}from"./index-DmvVZzf-.js";import{a$ as t,G as d,aT as i,E as f,Q as F}from"./antd-D-XvgdAE.js";import{d as r,k as u,f as m,G as e}from"./vue-bWmcvXqU.js";import{u as E}from"./index-OU5-Hpez.js";import"./entry/index-C2yXXbfE-1713597257644.js";import"./useContentViewHeight-ByP0kkZI.js";import"./useWindowSizeFn-rAoW7C_Y.js";import"./onMountedOrActivated-C5rGMWQz.js";const c=r({setup(){const a=m(""),{data:l,loading:n}=E(s,{throttleWait:1e3,refreshDeps:[a]});return()=>u(F,{title:"节流"},{default:()=>[u(t,null,{default:()=>[u(t.Paragraph,null,{default:()=>[e("通过设置"),u(t.Text,{type:"danger"},{default:()=>[" ",e("options.throttleWait")," "]}),e("，进入节流模式，此时如果频繁触发"),u(t.Text,{code:!0},{default:()=>[e(" run ")]}),e("或者"),u(t.Text,{code:!0},{default:()=>[e(" runAsync ")]}),e(", 则会以节流策略进行请求。")]}),u(t.Paragraph,null,{default:()=>[u(t.Text,{code:!0},{default:()=>["const { data, run } = useRequest(imitateApi, { throttleWait: 300, manual: true });"]})]}),u(t.Paragraph,null,{default:()=>[e("如上示例代码，频繁触发"),u(t.Text,{code:!0},{default:()=>[e(" run ")]}),e(", 300ms 执行一次。")]}),u(t.Paragraph,null,{default:()=>[e("你可以在下面 input 框中快速输入文本，体验效果")]})]}),u(d,{spinning:n.value},{default:()=>[u(i,{direction:"vertical"},{default:()=>[u(f,{value:a.value,"onUpdate:value":o=>a.value=o,placeholder:"Please enter username"},null),u("div",null,[e("Username: "),l.value])]})]})]})}}),P=r({setup(){return()=>u(p,null,{default:()=>[u(c,null,null)]})}});export{P as default};
