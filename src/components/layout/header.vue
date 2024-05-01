<template>
  <div v-if="deviceType !== 'mobile'">
    <Transition name="slide">
      <div class="header w-full h-18 flex" flex="items-center row" fixed z-100 v-show="!isHeaderHidden">
        <img src="./../../assets/icon/cz_ba-style.png" alt="logo" h-15 ml-10>
        <div flex gap-20 flex-1 items-center justify-center ml-20>
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
    </transition>
  </div>
  <div v-if="deviceType === 'mobile'" :class="{ 'mb-20': route.path !== '/' }">
    <div class="header w-full h-13 flex top-0 bg-white" flex="items-center row" fixed z-100 border-b>
      <div mr-auto ml-8 h-full items-center flex gap-2>
        <a i-carbon-logo-github rel="noreferrer" href="https://github.com/huanxiaomang/cz-official" target="_blank"
          title="GitHub" text-black text-5 />

      </div>
      <div m-auto font-bold class="title">
        <router-link to="/">创智工作室</router-link>
      </div>
      <a i-eva:menu-fill rel="noreferrer" target="_blank" @click="toggleMenu" title="GitHub" text-black text-5 ml-auto
        mr-8 />
    </div>
    <Transition name="fade">
      <div v-if="isMenuOpen" class="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50" @click="closeMenu"></div>
    </Transition>
    <Transition name="slide2">
      <div v-show="isMenuOpen" class=" top-13 fixed z-100 w-full flex flex-col bg-white">
        <router-link to="/" class="phone-link" :class="{ 'active': route.path === '/' }" cursor-pointer h-12 flex
          items-center pl-8 @click="closeMenu" border-b>主页</router-link>
        <router-link to="/project" class="phone-link" :class="{ 'active': route.path === '/project' }" cursor-pointer
          h-12 flex items-center pl-8 @click="closeMenu" border-b>项目</router-link>
        <router-link to="/notify" class="phone-link" :class="{ 'active': route.path === '/notify' }" cursor-pointer h-12
          flex items-center pl-8 @click="closeMenu" border-b>通知</router-link>
        <router-link to="/member" class="phone-link" :class="{ 'active': route.path === '/member' }" cursor-pointer h-12
          flex items-center pl-8 @click="closeMenu">成员</router-link>
      </div>
    </Transition>
  </div>

</template>

<script setup lang='ts'>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useDeviceType } from '~/hooks/useDeviceType';

const route = useRoute();
const isHeaderHidden = ref(false);
let lastScrollPosition = 0;

window.addEventListener('scroll', () => {
  const currentScrollPosition = window.pageYOffset;

  if (currentScrollPosition > lastScrollPosition && !isHeaderHidden.value) {
    isHeaderHidden.value = true;
  } else if (currentScrollPosition < lastScrollPosition && isHeaderHidden.value) {
    isHeaderHidden.value = false;
  }

  lastScrollPosition = currentScrollPosition;
});

const deviceType = useDeviceType();


const isMenuOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  if (isMenuOpen.value) {
    // 打开菜单时禁止滚动
    document.body.style.overflow = 'hidden';
  } else {
    // 关闭菜单时恢复滚动
    document.body.style.overflow = '';
  }
};
const closeMenu = () => {
  isMenuOpen.value = false;
  document.body.style.overflow = '';

};

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

.title {
  color: transparent;
  background-clip: text !important;
  background: -webkit-linear-gradient(to right,#6991c7 0%,#a3bded 100%);
  background: linear-gradient(to right, #6991c7 0%,#a3bded 100%);
}

.phone-link.active {
  color: #3370ff;
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-100%);
}

.slide-enter-to,
.slide-leave-from {
  transform: translateY(0);
}



.slide2-enter-active,
.slide2-leave-active {
  transition: transform 0.3s ease;
}

.slide2-enter-from,
.slide2-leave-to {
  transform: translateY(-180%);
}

.slide2-enter-to,
.slide2-leave-from {
  transform: translateY(0);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 0.5;
}</style>
