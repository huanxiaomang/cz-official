1. 使用less变量
2. 组件设计、层级划分



1. 页面放到pages/
2. 组件的设计的问题：props应该放什么 东西应该归谁管
3. tips应该在组件内核中，不应由调用者关心
4. 起名问题：placeholder（直白，并且和原生一样）Icon iconName可以简化
5. 灵活使用插槽



Props：

currentState：default | hasValue | error

v-model：父子组件之间拿值

require

父：通过v-model拿到值，每次变化都做校验，再把新的currentState传回去改变样式



default.失败 =>@input事件（校验） => hasValue

点按钮 => 校验 => 错了error对了跳转 