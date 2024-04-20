```bash
npm i -g pnpm   安装pnpm
pnpm i -g vite  安装vite，或者cnpm
pnpm config set registry https://registry.npmmirror.com/  pnpm设置镜像
 
创建vue项目
pnpm create vite
选ts

vsc打开文件夹
pnpm i
```



##### 基础架构

介绍 

1. assets下面创建icon/ image style/
2. 引入less，放进style/里
3. 关闭noUnusedLocals  noUnusedParameters





##### 组件传参

```js
<Login msg="Vite + Vue" />

const props = defineProps(['msg']);

console.log(props);
```



##### ref的响应式

ts里和template里语法不一样



##### 简单的设计思想

使用枚举类型避免使用字符串来做type

```ts
<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps(['msg']);
console.log(props);

const count = ref(0);
console.log(count);


function addCount(num: number) {
    count.value += num;
}

function countHandler(num: number, type: string) {
    if (type === 'add') {
        count.value += num;
    } else if (type === 'reduce') {
        count.value -= num;
    } else if (type === 'multiply') {
        count.value *= num;
    } else if (type === 'divide') {
        count.value /= num;
    }
}

enum countHandlerType {
    ADD,
    REDUCE,
    MULTIPLY,
    DIVIDE
}

function countHandler2(num: number, type: countHandlerType) {
    if (type === countHandlerType.ADD) {
        count.value += num;
    } else if (type === countHandlerType.REDUCE) {
        count.value -= num;
    } else if (type === countHandlerType.MULTIPLY) {
        count.value *= num;
    } else if (type === countHandlerType.DIVIDE) {
        count.value /= num;
    }
}

function getCount() {
    return count.value;
}

function setCount(fn: any) {
    count.value = fn(count.value);
}

</script>

<template>
    <h1>{{ props.msg }}</h1>
    <h2>{{ count }}</h2>
    <button @click="addCount(1)">+1</button>
    <button @click="countHandler(1, 'reduce')">-1</button>
    <button @click="countHandler2(2, countHandlerType.MULTIPLY)">*2</button>
    <button @click="setCount((val: number) => val / 2)">/2</button>
</template>

<style scoped>
.read-the-docs {
    color: #888;
}

button {
    margin: 10px;
}
</style>

```

template基本语法



##### html与css

style使用scoped和less

定义全局的style

组件顶级元素为container



##### 组件拆分

header footer form formHeader button 主题button



##### 任务1：[一个视频学会 Vue3 前端开发_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1fe41157nG/?spm_id_from=..top_right_bar_window_history.content.click&vd_source=474df4e06771c2d47c2daa4a0a249bc3)



##### 任务2：对登录页的页面进行拆分





























————————————————————————————————————

# Vue3一晚速成

## 0.小前置

```vue
<script lang="ts" setup name="App">
<style scoped>
```

define开头的函数是可以不用引入的哦

## 第一阶段：ref （值，对象响应化）, reactive（对象响应化）

### 1.ref处理响应式数据			ref	（单值）

​	目标1：实现一个加法


```vue
<template>
    <p>这是一个数字{{ number }}</p>
    <button @click="Add">我是加法</button>	//绑函数
</template>

<script setup lang="ts">
import { ref } from "vue"	//引入响应包
let number = ref(0);		//数据响应化
function Add(){
    number.value++;			//必须改数据的值
}
</script>
```

### 2.reactive处理响应式数据		reactive	（只能对象，数组）

​	目标1：实现一个对象修改


```vue
<template>
    <p>我是{{ number.name }} ， 我值{{ number.price }}元</p>
    <button @click="Add">我是加法</button>
</template>

<script setup lang="ts">
import { reactive } from "vue"		//引入响应包
let number = reactive({name:"苹果",price:100});	//数据响应化	
function Add(){
    number.price = number.price + 10;
}
</script>
```

### 3.ref处理响应式数据		ref	(对象，数组)

​	目标1：实现一个对象修改

```vue
<template>
    <p>我是{{ number.name }} ， 我值{{ number.price }}元</p>
    <button @click="Add">我是加法</button>
</template>

<script setup lang="ts">
import { ref } from "vue"
let number = ref({name:"苹果",price:100});
function Add(){
    number.value.price = number.value.price + 10;
}
</script>
```

### 4.上述小知识总结

​	ref > reactive		-------	ref._value == reactive

​	宏观角度看：

​		1.ref 用来定义：-->	基本类型数据 ， 对象类型数据

​		2.reactive用来定义：-->	对象类型数据

​	区别：

​		1.ref创建的变量必须使用.value

​		2.reactive重新分配一个新对象，会失去响应式

​	使用原则：

​		1.若需要一个基本类型的响应式数据，必须使用ref

​		2.若需要一个响应式对象，层级不深，ref，reactive都可以

​		3.若需要一个响应式对象，且层级较深，推荐使用reactive

### 5.（1，2，3重难点）（数据的再赋值）ref，reactive


​	ref

```vue
<template>
    <p>我是{{ number.name }} ， 我值{{ number.price }}元</p>
    <button @click="Add">我是加法</button>
    <button @click="Switch">我是切换</button>
</template>

<script setup lang="ts">
import { ref } from "vue"
let number = ref({name:"苹果",price:100});

function Add(){
    number.value.price = number.value.price + 10;
}
function Switch(){
    number.value = {name:"梨" , price: 200}
}

</script>
```

​	reactive

```vue
<template>
    <p>我是{{ number.name }} ， 我值{{ number.price }}元</p>
    <button @click="Add">我是加法</button>
    <button @click="Switch">我是切换</button>
</template>

<script setup lang="ts">
import { reactive } from "vue"
let number = reactive({name:"苹果",price:100});

function Add(){
    number.price = number.price + 10;
}
function Switch(){
    //number = {name:"梨" , price: 200}	//错误写法
    //number = reactive({name:"梨" , price: 200})	//错误写法
    Object.assign(number,{name:"梨" , price: 200})
}

</script>
```

——————————————————————————————————————

恭喜你，学到这你已经学完了Vue3的第一阶段了

——————————————————————————————————————

## 第二阶段：toRefs , toRef	（内值响应化）

### 前置

​	toRefs与reactive的比对 ， ref好像不需要

```vue
Proxy(Object) {name: '苹果', price: 100}	//reactive的内值并没有响应化
```

```vue
{name: ObjectRefImpl, price: ObjectRefImpl} //toRefs会使内值响应化
```

​	所以，我们现在有一个要解决的问题

```vue
<template>
    <p>我是{{ number.name }} ， 我值{{ number.price }}元</p>
    <button @click="Add">我是加法</button>
</template>

<script setup lang="ts">
import { reactive } from "vue"
let number = reactive({
    name:"苹果",
    price:100
});

let {price} = number;

function Add(){
    price += 1	//为什么数据没有发生变化
}

</script>
```

​	图例


### 1.toRefs数据内全值响应化

​	目标1：使内数据响应化

```vue
<template>
    <p>我是{{ number.name }} ， 我值{{ number.price }}元</p>
    <button @click="Add">我是加法</button>
</template>

<script setup lang="ts">
import { reactive , toRefs } from "vue"
let number = reactive({
    name:"苹果",
    price:100
});

let {price} = toRefs(number);	//内数据ref化 ，注：此处为地址引用，
												//修改的为实际number
function Add(){
    price.value += 1	//所以这里要加value
}

</script>
```

### 2.toRef数据内单值响应化

​	目标1：使内数据某一个值响应化

```vue
<template>
    <p>我是{{ number.name }} ， 我值{{ number.price }}元</p>
    <button @click="Add">我是加法</button>
</template>

<script setup lang="ts">
import { reactive , toRef } from "vue"
let number = reactive({
    name:"苹果",
    price:100
});

let price = toRef(number , "price")

function Add(){
    price.value += 1
}

</script>
```

——————————————————————————————————————

恭喜你，学到这你已经学完了Vue3的第二阶段了

——————————————————————————————————————

## 第三阶段：computed ， v-model

### 彩蛋插入 v-model

​	打断一下，这里教大家一下数据的双向绑定v-model

```vue
<template>
    姓：<input type="text" v-model="firstName"><br>
    名：<input type="text" v-model="lastName"><br>
    姓名：{{ firstName + lastName }}
</template>

<script setup lang="ts">
import { ref } from "vue"

let firstName = ref("博丽")
let lastName = ref("七七")
</script>
```

​	当数据更改时 input.value赋值给firstName导致姓名发生变化，lastName同理

### 1.computed处理多次执行函数（有缓存）

​	目标1：不想让全名等于firstName+lastName

```vue
<template>
    姓：<input type="text" v-model="firstName"><br>
    名：<input type="text" v-model="lastName"><br>
    姓名：{{ fullName }}
</template>

<script setup lang="ts">
import { ref , computed } from "vue"

let firstName = ref("博丽")
let lastName = ref("七七")
let fullName = computed(()=>{
    return firstName.value + lastName.value;
})
</script>
```

​	但是，我们又出现了新的问题，computed绑定的fullName是可读的，我们修改不了它的值，fullName.value = ”1“ 这会报错的，那我们应该怎么优化呢？

```vue
<template>
    姓：<input type="text" v-model="firstName"><br>
    名：<input type="text" v-model="lastName"><br>
    姓名：{{ fullName }}
</template>

<script setup lang="ts">
import { ref , computed} from "vue"

let firstName = ref("博丽")
let lastName = ref("七七")
let fullName = computed({
    get(){
        return firstName.value + lastName.value
    },
    set(val){	val就是传入的fullName.value
        console.log(val)
        firstName.value = val
        ....		//这里我们就可以进行后续操作啦
    }
})
```

——————————————————————————————————————

恭喜你，学到这你已经学完了Vue3的第三阶段了

——————————————————————————————————————

## 第四阶段：watch（手动监视器） ， watchEffect（自动监视器）

### 前置

​	作用：监视数据的变化

​	特点：Vue3中的watch只能监视以下四种数据

​		1.ref定义的数据

​		2.reactive定义的数据

​		3.函数返回一个值

​		4.一个包含上述内容的数组

注：watch里ref不写value哦

### 1.watch监视情况1 ref


​	目标1：加到10后停止输出

```vue
<template>
    我是数字{{ number }}
    <button @click="Add">我是加法</button>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"

let number = ref(0);
function Add() {
    number.value++;
}
const stopWatch = watch(number, (newValue, oldValue) => {
    console.log(newValue , oldValue);
    if(newValue > 10){
        stopWatch()	//大于10就结束监视
    }
})
</script>
```

### 2.watch深度监视  ref

​	若修改的是ref定义的对象中的属性，newValue和oldValue都是新值，因为它们是同一个对象

​	若修改整个ref定义的对象，newValue是新值，oldValue是旧值，因为不是同一个对象了


​	目标1：深度监视

```vue
<template>
    我是名字:{{ number.name }}<br>
    我是价格:{{ number.price }}<br>
    <button @click="Add">我是加法</button>
    <button @click="Switch">我是切换</button>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"

let number = ref({name:"博丽七七" , price:100});
function Add() {
    number.value.price++;
}
function Switch(){
    number.value = {name:"李四" , price:300}
}
watch(number, (newValue, oldValue) => {
    console.log(newValue , oldValue);
} , {deep:true})//深度监视可选
</script>
```

​	此时，有个注意点深度监视开启时，如果价格改变，新旧值则是相同的

```
Proxy(Object) {name: '博丽七七', price: 101}
Proxy(Object) {name: '博丽七七', price: 101}
```

​	如果改变对象，新旧值则是

```
Proxy(Object) {name: '李四', price: 300} 
Proxy(Object) {name: '博丽七七', price: 102}
```

​	一般我们不管旧值

### 3.watch深度监视  reactive

​	监视reactive定义的对象类型数据，默认开启了深度监视，且无法关闭

​	同上

```vue
<template>
    我是名字:{{ number.name }}<br>
    我是价格:{{ number.price }}<br>
    <button @click="Add">我是加法</button>
    <button @click="Switch">我是切换</button>
</template>

<script setup lang="ts">
import { reactive, watch } from "vue"

let number = reactive({name:"博丽七七" , price:100});
function Add() {
    number.price++;
}
function Switch(){
    Object.assign(number,{name:"李四" , price:300})
}
watch(number, (newValue, oldValue) => {
    console.log(newValue , oldValue);
})
</script>
```

### 4.watch监听特定属性

​	若该属性值不是对象类型，需要写成函数形式

​	若该属性值依然是对象类型，可直接写，也可写成函数，建议直接写成函数

​	同上

```vue
<template>
    我是名字:{{ number.name }}<br>
    我是价格:{{ number.price }}<br>
    <button @click="Add">我是加法</button>
    <button @click="Switch">我是切换</button>
</template>

<script setup lang="ts">
import { reactive, watch } from "vue"

let number = reactive({
    name: "博丽七七",
    price: 100,
    other: {
        a: 1,
        b: 2,
    }
});
function Add() {
    number.price++;
    number.other.a++;
}
function Switch() {
    Object.assign(number, { name: "李四", price: 300 })
}
watch(() => number.price, (newValue, oldValue) => {
    console.log(newValue, oldValue);
})
   //这里只展示推荐写法
watch(() => number.other, (newValue, oldValue) => {
    console.log(newValue, oldValue);
}, { deep: true })
</script>
```

### 5.watch监视多个数据

​	同上

```vue
watch([() => number.other , number.price , ......], (newValue, oldValue) => {
    console.log(newValue, oldValue);
}, { deep: true })
```

### 其他

```vue
watch([temp , heigth], (Value) => {
    let [newTemp , newHeigt] = value
	传入不同变化，是会赋给两个哦
})
```

### 6.watchEffect实现自动监视

​	watch与watchEffect对比

​		1.都能监听响应式数据的变化，不同的是监听数据变化的方式不同

​		2.watch：要明确指出监视的数据

​		3.watchEffect：不用明确指出监视的数据

​	目标1：实现一个水位控制器


```vue
<template>
    需求：当水温达到60度，或水位达到80cm<br>
    当前水温：{{ temp }}<br>
    当前水位：{{ height }}<br>
    <button @click="tempAdd">增加水温</button><br>
    <button @click="heightAdd">增加水位</button><br>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue"

let temp = ref(10);
let height = ref(0);

function tempAdd() {
    temp.value += 10;
}
function heightAdd() {
    height.value += 10;
}
watchEffect(()=>{
    if(temp.value >=60 || height.value >=80){
        console.log("发出警告")
    }
})
</script>

<style></style>
```

​		与之相对的watch写法

```vue
watch([temp , height],(value)=>{
    let [newTemp , newHeight] = value
    if(newTemp >= 60 || newHeight >= 80){
        console.log("发出警告")
    }
})
```

——————————————————————————————————————

恭喜你，学到这你已经学完了Vue3的第四阶段了

——————————————————————————————————————

## 第五阶段（休息区）：标签内ref ， defineExpose（暴露值）

​	这里是轻松愉快小课堂

父组件

```vue
<template>
    <Test ref="abc"></Test>		//ref命名
    <button @click="add">点我</button>
</template>

<script setup lang="ts">
import Test from "./components/test.vue"
import { ref } from "vue";
let abc = ref()		//ref获取
function add() {
    console.log(abc.value.a)	//获取子组件的值
}
</script>
```

子组件

```vue
<template></template>
<script setup lang="ts">
import { ref, defineExpose } from "vue";
let a = ref("你好");
let b = ref(1);
defineExpose({ a, b })	//注意：必须要暴露出去父组件才可以拿的到哦
</script>
```

——————————————————————————————————————

恭喜你，学到这你已经学完了Vue3的第五阶段了

——————————————————————————————————————

## 第六阶段：这里是TS区（想看就看，不看也行）

​	How  to write an interface document about typescript

​	my typescript file

```tsx
export interface PersonInter {
    id:string,
    name:string,
    age:number
    price?:number	//这是可选的
}	//这是给对象用的
export type Persons = Array<PersonInter , ... , ...>//这是给数组用的
export type Persons = PersonInter[]//这么写也写
```

​	use file

```vue
<script ... ... >
import {type PersonInter , type Persons} from "ts路径"//记得要写type哦
let personList:Persons = [{},{},{}]
let personList = reactive<Persons>([{},{},{}])//优雅写法
```

——————————————————————————————————————

恭喜你，学到这你已经学完了Vue3的第六阶段了...呃，应该叫ts第一阶段

——————————————————————————————————————

## 第七阶段：终于到props啦 ，withDefaults

​	这节涉及到组件通信，非常重要哦，一定要好好听

入门

父组件

```vue
<子组件 a = "abc"></子组件>	//父组件往子组件传了个值
```

子组件

```vue
<template>
	{{ a }}
</template>
<script ... ... >
import { defineProps } from "vue"
defineProps(["a"])	//获得父组件传入的值	
//注意，defineProps是有返回值的，返回值为对象
const jkl = defineProps(["a"])//打印的话是一个对象哦 
</script>
```

基础props	（限制类型）

```vue
defineProps<{list:Persons}>()	//同ts ， （）里面没东西
```

进阶props	（限制类型+限制必要性+指定默认值）

```vue
import { withDefaults } from "vue"
withDefaults(defineProps<{list?:Persons}>(),{
	list:()=> [{id:... , name:... , ......}]  
})
```

——————————————————————————————————————

这么难的props居然都被你学会了，继续加油吧，第七阶段, complete!

——————————————————————————————————————

## 第八阶段：生命周期函数！！！

这个不难，直接按流程走一遍就行

```vue
import { ref , onBeforeMount , onMounted , 
			   onBeforeUpdate , onUpdated , 
			   onBeforeUnmount , onUnmounted} from "vue"
let sum = ref(0)	//数据
function add(){}	//方法
console.log()		//创建
onBeforeMount(()=>{})	//挂载前
onMounted(()=>{})	    //挂载完毕		出生
onBeforeUpdate(()=>{})	//数据更新前
onUpdated(()=>{})		//数据更新完毕	常用
onBeforeUnmount(()=>{})	//卸载前	例如v-if不满足的时候
onUnmounted(()=>{})		//卸载完毕		常用
```

子优先于父

——————————————————————————————————————

第八阶段结束了，进入第九阶段Ciallo～(∠・ω< )⌒★

——————————————————————————————————————

## 第九阶段：进网络啦，这阶段我写的比较杂

​	简单axios ， 记得下载axios

```ts
import { ref , reactive } from "vue"
import axios from "axios"
export default function (){
	let doglist = reactive([...])
	async function getDog(){
		try{
			let result = await axios.get()
			dogList.push(result.data.message)
		} catch(error){
			alert(error)
		}
	}
	//向外部提供东西
	return {dogList , getDog}
}
```

​	什么是hook

​		进入src目录，创建hool文件，里面就放常调用的函数

​		使用

```vue
import useDog from "@/hook/useDog"
const {dogList,getDog} = useDog()
```

——————————————————————————————————————

恭喜你，学到这你已经学完了Vue3的第九阶段了

——————————————————————————————————————

## 第十阶段：路由

​	安装vue-router	src文件夹里创建router文件夹

​	创建一个ts文件

```ts
import { createRouter, createWebHistory } from "vue-router"
//引入一个一个可能要呈现的组件
import abc from "@/components/test.vue"

//创建路由
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path:"/home",
            component:abc
        }
    ]
})

export default router
```

​		main.ts里引入router ， 使用router

### RouterView路由插槽占位

父组件

```vue
<RouterLink to="路由path" active-class="激活时的类名"></RouterLink>	
//略等于a标签 ， active-class路由自带的
to的第二种写法-->	:to="{path:"/about"}"

<RouterView></RouterView>	//路由展示区
<script......>
    import { RouterView , RouterLink } from "vue-router"
</script>
```

​		src创建pages或views放路由页

​		换路由会被视作生命周期（卸载）

### 命名路由

​	定义

```ts
routes: [
        {
            name:"abc"
            path:"/home",
            component:abc
        }
    ]
```

​	使用

```vue
<RouterLink :to="{name:'abc'}" active-class="激活时的类名"></RouterLink>
```

### 子集路由

​	定义

```vue
routes: [
        {
            name:"abc"
            path:"/home",
            component:abc,
			children:[
				{
					path:"detail"	//子集就不用写/了
					component:...
				}
			]
        }
    ]
```

​	使用	， 别忘了路由插槽

```vue
<RouterLink to="/news/detail"></RouterLink>
```

### query参数	（query版路由传参）

​	太简单了，直接上代码

​	父组件

```vue
<RouterLink 
	:to="{
         path:"/fff/fff",
         query:{
              id:news.id,...
              title:news.title...
         }
    }"></RouterLink>
//等同于....?fff=...&kkk=...
```

​	路由页获取

```vue
{{ query.id }}
<script>
import { toRefs } from "vue"
import { useRoute } from "vue-router"
let route = useRoute()
let { query } = toRefs(route)
</script>
```

### params参数	（params版路由传参）

​	太简单了，直接上代码

​	路由规则 ， 记得占位

```vue
routes: [
        {
            name:"abc"
            path:"/home",
            component:abc,
			children:[
				{	
					name:"//"
					path:"detail/:id/:title?"	//子集就不用写/了
									//?为可选
					component:...
				}
			]
        }
    ]
```

​		父组件

​		RouterLink 不能用path换路由了

```vue
<RouterLink 
	:to="{
         name:"avcs",
         params:{
              id:news.id,...
              title:news.title...
         }
    }"></RouterLink>
//等同于/.../.../...
```

​		子组件用params就行

### props配置	（是路由参数获取变得更简单）

​	第一种写法	(将路由收到的params参数作为props传给路由组件)

```
children:[
				{	
					name:"//"
					path:"detail/:id/:title?"	//子集就不用写/了
									//?为可选
					component:...
					props:true
				}
			]
```

​	使用

```vue
{{ id }}
defineProps(["id"])
```

​	第二种写法	（query传）

```
children:[
				{	
					name:"//"
					path:"detail/:id/:title?"	//子集就不用写/了
									//?为可选
					component:...
					props(route){
						return route.query
					}
				}
			]
```

​	用法同上

​	第三种写法	（随便传）

```vue
children:[
				{	
					name:"//"
					path:"detail/:id/:title?"	//子集就不用写/了
									//?为可选
					component:...
					props:{
						a:100,
						b:200
					}
				}
			]
```

### repalce属性	（禁止返回上一步）

```vue
<RouterLink replace :to="{name:'abc'}"></RouterLink>
```

编程式路由导航（脱离RouterLink进行路由跳转）

​	例：

```vue
import { useRouter } from "vue-router"
const router = useRouter()
router.push("路由地址")
```

​	正确写法

```vue
const router = useRouter()

interface NewsInter {
	id:string,
	number:number
}

function ...(news:NewInter){
	router.push({	//push换replace的话就不能返回上一步了 ， 看需求
		name:"/"
		query:{
			id:news.id
			number:news.number
		}
})
}
```

### 重定向

```vue
path:"原路径"
redirect:"新路由路径"	->  会执行这个地址
```

——————————————————————————————————————

最长的路由你也都学会了吗，太棒啦，继续加油吧

——————————————————————————————————————

## 第十一阶段：组件通信

### 1.props	（父传子 ， 子传父）

​	父传子

```vue
<template>
    父组件
    <Test :car="car"></Test>
</template>

<script setup lang="ts">
import { ref } from "vue"
import Test from "./components/test.vue"
let car = ref("奔驰");
</script>
////////////////////////////////
<template>
    子拿到的{{ car }}
</template>

<script setup lang="ts">
defineProps(["car"])
</script>
```

​	子传父

```vue
<template>
    父组件<br>
    父拿到的{{ toy }}
    <Test :sendToy="getToy"></Test>
</template>

<script setup lang="ts">
import { ref } from "vue"
import Test from "./components/test.vue"
let toy = ref("")

function getToy(value:string){
    toy.value = value
}
</script>
////////////////////////////////////
<template>
    子给的{{ toy }}
    <button @click="sendToy(toy)">子给父的</button>
</template>

<script setup lang="ts">
import { ref } from "vue"
let toy = ref("玩具车");
defineProps(["sendToy"])
</script>
```

### 2.自定义事件传参	emit

​	子传父

```vue
<template>
    父组件<br>
    父拿到的{{ toy }}
    <Test @sendToy="getToy"></Test>
</template>

<script setup lang="ts">
import { ref } from "vue"
import Test from "./components/test.vue"

let toy = ref("")

function getToy(value:string){
    toy.value = value
}

</script>
///////////////////////////////////////
<template>
    子给的{{ toy }}
    <button @click="emit('sendToy' , toy)">子给父的</button>
</template>

<script setup lang="ts">
import { ref } from "vue"
let toy = ref("玩具车");
const emit = defineEmits(["sendToy"])
</script>
```

### 3.mitt实现任意组件通信（第三方）

​	记得下载 pnpm i mitt

​	首先，src的目录里新建utils文件夹里面新建一个emitter.ts的文件

```ts
//引入mitt
import mitt from "mitt"
const emitter = mitt()
export default emitter
```

​	使用

```vue
<template>
    父组件<br>
    父有的{{ toy }}
    <Test></Test>
    <button @click="emitter.emit('send-toy' , toy)">父给子</button>
</template>

<script setup lang="ts">
import { ref } from "vue"
import Test from "./components/test.vue"
import emitter from './utils/emitter';

let toy = ref("玩具车")

</script>
/////////////////////////////////
<template>
    父给子的{{ toy }}
</template>

<script setup lang="ts">
import { ref, onUnmounted } from "vue"
import emitter from "../utils/emitter";
let toy = ref("");
emitter.on("send-toy", (value: string) => {
    toy.value = value
})
onUnmounted(() => {
    emitter.off("send-toy")
})
</script>
```

### 4.v-model以后再说

### 5.剩下的不写了，写多了记不住

——————————————————————————————————————

恭喜你，学到这你已经学完了Vue3的第十一阶段了

——————————————————————————————————————

## 第十二阶段：插槽

```vue
<slot></slot>
```

### 具名插槽

```vue
插得元素
<template v-slot:插槽名>
被插的
<slot name="插槽名"></slot>
```

### 作用域插槽

​	插槽子传父

​	插得元素

```vue
<template v-slot="params">
        <ul>
            <v-for="item in params.youxi" :key="item.id"></v-for>
        </ul>
    </template>
```

​	被插的

```vue
<slot :youxi="game"></slot>
<script>
	let games = reactive([
        {},{},{}
    ])
</script>
```

​	插的起名这么起

```vue
<template v-slot:插槽名="params">
```



















