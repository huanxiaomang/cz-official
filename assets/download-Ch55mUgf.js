import{H as r}from"./entry/index-C2yXXbfE-1713597257644.js";import{u as c,d as l}from"./base64Conver-bBv-IO2K.js";function m(e,t,a,n){c(e).then(d=>{f(d,t,a,n)})}function f(e,t,a,n){const d=l(e);u(d,t,a,n)}function u(e,t,a,n){const d=typeof n!="undefined"?[n,e]:[e],i=new Blob(d,{type:a||"application/octet-stream"}),s=window.URL.createObjectURL(i),o=document.createElement("a");o.style.display="none",o.href=s,o.setAttribute("download",t),typeof o.download=="undefined"&&o.setAttribute("target","_blank"),document.body.appendChild(o),o.click(),document.body.removeChild(o),window.URL.revokeObjectURL(s)}function p({url:e,target:t="_blank",fileName:a}){const n=window.navigator.userAgent.toLowerCase().indexOf("chrome")>-1,d=window.navigator.userAgent.toLowerCase().indexOf("safari")>-1;if(/(iP)/g.test(window.navigator.userAgent))return!1;if(n||d){const i=document.createElement("a");if(i.href=e,i.target=t,i.download!==void 0&&(i.download=a||e.substring(e.lastIndexOf("/")+1,e.length)),document.createEvent){const s=document.createEvent("MouseEvents");return s.initEvent("click",!0,!0),i.dispatchEvent(s),!0}}return e.indexOf("?")===-1&&(e+="?download"),r(e,{target:t}),!0}export{u as a,f as b,m as c,p as d};
