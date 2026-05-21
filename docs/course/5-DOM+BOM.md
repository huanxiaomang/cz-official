## DOM

html内容被浏览器解析为DOM树，进行渲染

document的全局变量可以用来获取dom元素

querySelector/All  推荐使用，而getElementByClassName。。。不要使用！



dom事件

onclick -- addEventListener

event使用

click：event.target

mouse: x,y



正则表达式

无敌的教程：https://www.bilibili.com/video/BV1da4y1p7iZ/



BOM

setTimeout/setInterval





## 定时器







nodelist是伪数组

转数组：[...nodelist]  Array.from(nodelist)



### dataset

[`HTMLElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement) 接口的只读属性 **`dataset`** 提供了对元素上[自定义数据属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/data-*)（`data-*`）读/写访问。它暴露了一个字符串映射（[`DOMStringMap`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMStringMap)），其中包含每个 `data-*` 属性条目。



获取

```
<div id="user" data-id="1234567890" data-user="johndoe" data-date-of-birth>
  John Doe
</div>
```

```
const el = document.querySelector("#user");

el.dataset.user

```

- [`Element.getAttribute()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getAttribute) 和 [`Element.setAttribute()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/setAttribute)也可以