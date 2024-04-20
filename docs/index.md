---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "CZ-docs"
  text: "创智学习资源库"
  tagline: 快速掌握前端核心内容 直通蓝桥杯国赛
  image:
    src: /dynamic.gif
    alt: 转圈圈~
  actions:
    - theme: brand
      text: 进入学习
      link: /guide/前端速通指南
    - theme: alt
      text: 项目实战
      link: /jx/0-目标

features:
  - icon: 🪴
    details: 熟悉git操作、分支创建、处理冲突、合并等，多人协作开发。
  - icon: 👨‍👩‍👧‍👦
    details: 使用vue3+ts完成项目开发，掌握vue3常用语法、与typescript的简单结合、学会组件化开发的思想。
  - icon: 🛠️
    details: 使用vue3生态：vue-router、pinia等，学会使用elementUIplus组件库构建各种常用页面布局。
  - icon: 💻
    details: 掌握node常用的库，理解前端工程化。使用node完成JWT，做中间层，对前端请求做拦截。
  - icon: 🌐
    details: 掌握优秀的开发思想、编程习惯，理解模块化、DRY原则与KISS原则等。
  - icon: 🌍
    details: 冲大厂！╰（￣▽￣）╭ 
---


<script setup>
if (!window.created && document.body.clientWidth >= 750) {
    createImage();
}
window.created = true;


function createImage() {
    const img = document.createElement('img');
    img.src = '/dls.jpg';
// const el = document.querySelector('.content-body');
// const { width, right } = el ? el.getBoundingClientRect() : { width: 0, right: 50 };
// const pos = right - width;

    
    Object.assign(img.style, {
        position: 'fixed',
        bottom: '0px',
        right: '20px',
        width: '100px',  
        height: 'auto',   
        zIndex: '10000',
        transform: 'rotateY(180deg)'
    });
    document.body.appendChild(img);
}


const authorMap = {
    'course': 'Huanxiaomang',
    'jx': 'Huanxiaomang hakurei77',

}


const default_author = 'Huanxiaomang';

const _historyWrap = function (type) {
    const orig = history[type];
    const e = new Event(type);
    return function () {
        const rv = orig.apply(this, arguments);
        e.arguments = arguments;
        window.dispatchEvent(e);
        return rv;
    };
};
history.pushState = _historyWrap('pushState');
history.replaceState = _historyWrap('replaceState');

window.addEventListener('pushState', function (e) {
    handleRouteChange();

});

window.addEventListener('replaceState', function (e) {
    handleRouteChange();

});

window.addEventListener('popstate', function (event) {
    // 处理路由变化
    handleRouteChange();
});


// 初始化页面时的路由处理
handleRouteChange();

// 处理路由变化的函数
function handleRouteChange() {
    // 获取当前路由
    let currentRoute = window.location.href;
    for (const key in authorMap) {
        if (currentRoute.includes(key)) {
            setAuthorText(authorMap[key]);
        } else {
            setAuthorText(default_author);
        }
    }


}

function setAuthorText(text) {
    const btn = document.querySelector('.edit-link-button');

    if (btn) {
        btn.innerText = `作者：${text}`;
    }
}


</script>
