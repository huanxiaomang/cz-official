<template>
    <Transition name="cover">
        <div class="cover w-[100vw] h-[100vh] bg-black/50 fixed top-0 left-0 z-5000" @click="handleCoverClick"
            v-show="state.isShowingUserModal"></div>
    </Transition>
    <Transition>
        <div class=" container w-80vw h-60vh sm:w-3xl sm:h-4xl bg-white rounded-lg absolute flex flex-col items-center z-9999 m-auto inset-0"
            v-show="state.isShowingUserModal">
            <img :src="showBg" alt="用户背景图" class="h-[10rem] w-[100%] sm:h-[15rem] rounded-t-lg object-cover ">
            <img :src="showAvatar" alt="用户头像"
                class="w-[5rem] h-[5rem] sm:w-[8rem] sm:h-[8rem] rounded-full flex items-center justify-center object-cover mt-[-2.5rem] sm:mt-[-4rem] border-2 border-solid border-gray-300 brightness-105">
            <div class="text-2xl text-center mt-[20px]" :class="getUsernameClassByRole(state.showUserInfo.role)">
                {{ state.showUserInfo.username }}
            </div>
            <div class="p-5 text-[14px] text-center mt-[10px] max-w-[40rem] line-height-snug">
                {{ state.showUserInfo.description || '用户很懒，没有个人签名~'}}
            </div>
            <div class="text-[14px] text-center mt-[10px]">{{ state.showUserInfo.email }}</div>

            <div class="mt-auto mb-3">
                <GithubFilled class="mr-2 text-2xl" />

            </div>

        </div>
    </Transition>
</template>

<script setup lang='ts'>
import { useShowingUserModal } from '~/store/userModal';
import DefaultAvatar from '~/assets/icon/default-avatar.png';
import DefaultBg from '~/assets/images/default-bg.jpg';
import {  ref, watchEffect } from 'vue';
import { getUsernameClassByRole } from "~/utils/getUsernameClass";
import { GithubFilled } from "@ant-design/icons-vue";
import { loadImage } from '~/utils/loadImage';

const {state} = useShowingUserModal();



let showAvatar = ref(DefaultAvatar);
let showBg = ref(DefaultBg);

function handleCoverClick() {
    state.isShowingUserModal = false;
    setTimeout(() => {
        showAvatar.value = DefaultAvatar;
        showBg.value = DefaultBg;
    },100)

}


watchEffect(async () => {
    // 同时监测showUserInfo和isShowingUserModal两个属性的变动
  state.isShowingUserModal;
  loadImage(state.showUserInfo.avatar, (u) => showAvatar.value = u);
  loadImage(state.showUserInfo.background, (u) => showBg.value = u);

})

</script>

<style lang="scss" scoped>


.v-enter-active,
.v-leave-active {
    transform-origin: 50% 50%;
    transition: all 0.5s ease;
    transform: translate(0,0);
}

.v-enter-from,
.v-leave-to {
    transform: scale(0.5);
    opacity: 0;
}
.cover-enter-active,
.cover-leave-active {
    transition: all 0.5s ease;
}

.cover-enter-from,
.cover-leave-to {

    opacity: 0;
}


</style>
