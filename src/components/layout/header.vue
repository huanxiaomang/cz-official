<template>
  <div class="header w-full h-18 flex" flex="items-center row" fixed z-10>
    <img src="./../../assets/icon/cz_ba-style.png" alt="logo" h-15 ml-10>
    <div flex gap-20 flex-1 items-center justify-center ml-20>
      <!--TODO: 适配手机-->
      <router-link to="/" class="item" :class="{ 'active': route.path === '/' }" cursor-pointer>主页</router-link>
      <router-link to="/project" class="item" :class="{ 'active': route.path === '/project' }"
        cursor-pointer>项目</router-link>
      <router-link to="/notify" class="item" :class="{ 'active': route.path === '/notify' }"
        cursor-pointer>通知</router-link>
      <router-link to="/member" class="item" :class="{ 'active': route.path === '/member' }"
        cursor-pointer>成员</router-link>
    </div>
    <a i-carbon-logo-github icon-btn hover:text-blue-500 rel="noreferrer"
      href="https://github.com/huanxiaomang/cz-official" target="_blank" title="GitHub" text-black text-5 ml-auto
      mr-8 />
  </div>
</template>

<script setup lang='ts'>
import { watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

watch(route, (newValue, oldValue) => {
  console.log(newValue.path);
},
  { immediate: true }
);

</script>

<style lang="scss" scoped>
div.header {
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  color: #7b7e81;

  font-family: Gilroy-regular, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';

  .item {
    color: #646a73;
    font-size: 15px;
    font-weight: 600;

    &:hover {
      color: #3370ff;
    }

    &.active {
      color: #3370ff;
    }

    &.active::after {
      content: '';
      display: block;
      height: 3px;
      position: absolute;
      width: 2em;
      top: calc(50% + 1em);
      background-color: #3370ff;
    }
  }
}
</style>
