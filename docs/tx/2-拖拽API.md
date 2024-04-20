# JS 中的拖拽

[1.组课神器 - 蓝桥云课 (lanqiao.cn)](https://www.lanqiao.cn/problems/5143/learning/?page=1&first_category_id=2&second_category_id=11&sort=difficulty&asc=0)

## 元素向目标区域拖拽

### 核心代码

```js
function handleDragOver(e) {
  e.preventDefault();
}

function handleDragEnter(e) {
  e.preventDefault();
}

function handleDragStart(e) {
  const tar = e.target;
  tar.style.opacity = ".6";
}

function handleDragEnd(e) {
  const tar = e.target;
  tar.style.opacity = "1";
  emit("handleDragEnd", tar);
}
```

### 核心思路

1. 要拖拽的元素添加`draggable`属性
2. 目标区域元素：事件`dragover`和`dragenter`阻止默认事件
3. 被拖拽元素：事件`dragstart`和`dragend`设置透明度开始变 0.6 结束变 0 或 1
4. `dragenter`判断目标区域元素，`e.target`为进入了哪个元素
5. `dragend`处理被拖拽元素，`e.target`为被拖拽元素
6. 在`dragend`中创建副本(`cloneNode()`)插入(`insertAdjacentElement()`)目标元素，移除(`remove()`)自己。

## 区域内元素拖拽改变位置

1. vue3 新 api 组件化方式

   ```vue
   <script setup lang="ts">
   import { Ref } from "vue";
   const props = defineProps<{ listData: string[] }>();

   const targetItem = ref<HTMLDivElement>();
   let targetIndex: number;
   const dragContainer = ref<HTMLDivElement>();
   // const itemCount: number = 7;
   const listData = ref(props.listData) as Ref<string[]>;
   // useStorage('list-data',listData);

   const colorList = [
     "bg-yellow-300",
     "bg-blue-300",
     "bg-green-300",
     "bg-red-300",
     "bg-orange-300",
     "bg-pink-300",
     "bg-purple-300",
     "bg-gray-300"
   ];
   const map: Map<string, number> = new Map();
   listData.value.map((val, i) => {
     map.set(val, i % colorList.length);
   });

   function getClass(data: string) {
     return colorList[map.get(data)!];
   }

   function handleDragEnter(e: DragEvent) {
     const target = e.target as any;

     if (target && target.parentElement.className === "container") {
       const { key } = target.dataset;
       targetItem.value = target;

       targetIndex = parseInt(key);
     }
   }

   function handleDragEnd(e: DragEvent, dragIndex: number) {
     const dragTarget = e.target;
     console.log(dragIndex, targetIndex);
     if (dragTarget) {
       insert(dragIndex);
     }
   }

   function insert(dragIndex: number) {
     if (dragIndex > targetIndex) {
       listData.value.splice(targetIndex, 0, listData.value[dragIndex]);
       listData.value = listData.value.filter((_, i) => i !== dragIndex + 1);
     } else if (dragIndex < targetIndex) {
       listData.value.splice(targetIndex + 1, 0, listData.value[dragIndex]);
       listData.value = listData.value.filter((_, i) => i !== dragIndex);
     }
   }

   watchEffect(() => {});
   </script>

   <template>
     <div
       ref="dragContainer"
       class="container"
       @dragover.prevent
       @dragenter="handleDragEnter($event)"
     >
       <TheItem
         v-for="(data, i) in listData"
         :key="data"
         draggable="true"
         :item-class="getClass(data)"
         :data-key="i"
         @dragend="handleDragEnd($event, i)"
       >
         {{ data }}
       </TheItem>
     </div>
   </template>

   <style lang="less" scoped></style>
   ```

### 核心思路

1. 创建响应式数据`listData`存储列表数据
2. 要拖拽的元素添加`draggable`属性
3. 目标区域元素：事件`dragover`和`dragenter`阻止默认事件
4. 被拖拽元素：事件`dragstart`和`dragend`设置透明度开始变 0.6 结束变 0 或 1
5. `dragenter`判断目标区域元素，`e.target`为进入了哪个元素，保存这个位置索引，即`targetIndex`
6. `dragend`处理被拖拽元素，`e.target`为被拖拽元素，保存他的位置索引，即`dragIndex`
7. 比对`targetIndex`与`dragIndex`，分上移下移两种情况处理，改变`listData.value`

**其实就是过程式的操作 dom 变成了维护一个响应式列表数据**

## draggable 新事件与旧方法的区别

## 补充知识

### 冒泡

把事件向上传递给对应的处理程序

例子父元素绑定子元素触发

### 自定义指令用来做功能的插入
