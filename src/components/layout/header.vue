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
          <a class="item" href="http://1.92.82.236:5173/" target="_blank" flex items-center>文档<div inline-block
              i-ri:share-box-fill text-4 ml-1>
            </div></a>
        </div>
            <button icon-btn @click="toggleDark()">
      <div i-carbon-sun dark:i-carbon-moon w-8 mr-3 />
    </button>
        <div mr-4 v-if="!isLogin">
          <router-link to="/register" class="hover:text-blue-5" cursor-pointer>注册 </router-link>|
          <router-link to="/login" class="hover:text-blue-5" cursor-pointer>登录</router-link>
        </div>
        <div v-else class="group" mr-8 flex items-center cursor-pointer max-w-md relative>
          <CZAvatar :user-id="userStore.userInfo?.userId!" :click-fn="()=>void 0"></CZAvatar>
          <div absolute bg-white text-gray-7 text-sm top-12 right-0 ring-1 ring-gray-8 ring-opacity-5 rounded-md w-40
            px-2 py-2 scale-0 group-hover:scale-100 duration-300 origin-top-right shadow-lg>
            <router-link to="/updateInfo" block px-5 py-2 hover:bg-gray-100 text-left rounded-md>修改信息</router-link>
            <div @click="handleLogout" px-5 py-2 hover:bg-gray-100 text-left rounded-md>退出登录</div>
          </div>
        </div>
        <a i-carbon-logo-github icon-btn v-if="!isLogin" hover:text-blue-500 rel="noreferrer"
          href="" target="_blank" title="GitHub" text-black text-5 ml-auto
          mr-8 />
      </div>
    </transition>
  </div>
  <div v-if="deviceType === 'mobile'" :class="{ 'mb-20': route.path !== '/' }">
    <div class="header w-full h-13 flex top-0 bg-white" flex="items-center row" fixed z-100 border-b>
      <div mr-auto ml-8 h-full items-center flex gap-2>
        <a i-carbon-logo-github v-if="!isLogin" rel="noreferrer" href=""
          target="_blank" title="GitHub" text-black text-5 />
        <CZAvatar v-else :user-id="userStore.userInfo?.userId!" :click-fn="() => void 0"></CZAvatar>


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
        <router-link to="/member" class="phone-link" border-b :class="{ 'active': route.path === '/member' }"
          cursor-pointer h-12 flex items-center pl-8 @click="closeMenu">成员</router-link>
        <a class="item" href="http://1.92.82.236:5173/" target="_blank" border-b flex items-center cursor-pointer h-12
          pl-8>文档
          <div inline-block i-ri:share-box-fill text-4 ml-1 text-gray-7>
          </div>
        </a>
        <div v-if="!isLogin">
          <router-link to="/login" class="phone-link" border-b cursor-pointer h-12 flex items-center pl-8
            @click="closeMenu">登录</router-link>
          <router-link to="/register" class="phone-link" border-b cursor-pointer h-12 flex items-center pl-8
            @click="closeMenu">注册</router-link>
        </div>
        <div v-else>
          <router-link to="/updateInfo" class="phone-link" border-b cursor-pointer h-12 flex items-center pl-8
            @click="closeMenu">修改信息</router-link>
        </div>
        <div v-if="isLogin" @click="handleLogout" px-5 py-2 hover:bg-gray-100 text-left rounded-md pl-8>退出登录</div>

      </div>
    </Transition>
  </div>

</template>

<script setup lang='ts'>
import { inject, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useDeviceType } from '~/hooks/useDeviceType';
import { useUserStore } from '~/store/user';
import CZAvatar from '../CZAvatar.vue';
import { toggleDark } from '~/composables/dark';

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

const userStore = useUserStore();
const isLogin = !!userStore.userInfo;
const router = useRouter();

const handleLogout = () => {
  userStore.logout();
  router.go(0);
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
