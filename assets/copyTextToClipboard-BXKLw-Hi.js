import{j as o}from"./antd-D-XvgdAE.js";function s(c,t="已成功复制到剪切板!"){return navigator.clipboard?navigator.clipboard.writeText(c).then(()=>{t&&o.success(t)}).catch(r=>(o.error("复制失败!"+r.message),r)):Reflect.has(document,"execCommand")?new Promise((r,a)=>{try{const e=document.createElement("textarea");e.value=c,e.style.width="0",e.style.position="fixed",e.style.left="-999px",e.style.top="10px",e.setAttribute("readonly","readonly"),document.body.appendChild(e),e.select(),document.execCommand("copy"),document.body.removeChild(e),t&&o.success(t),r()}catch(e){o.error("复制失败!"+e.message),a(e)}}):Promise.reject('"navigator.clipboard" 或 "document.execCommand" 中存在API错误, 拷贝失败!')}export{s as c};
