<template>
  <div shadow-md rounded-2xl flex w-110 flex-col items-center m-5 pb-3 bg-white class="card">
    <img :src="bg" alt="用户背景图"  w-full rounded-t-2xl h-30 object-cover>
    <img :src="avatar" alt="用户头像" w-30 h-30 object-cover rounded-full class="mt-[-3.75rem]">

    <div  mt-2 text-5.5 :class="userInfo.role === 'ADMIN' ? 'text-yellow-500':'text-blue-500'">{{ userInfo.username }}</div>
    <div mt-1 text-3.5>{{ userInfo.major }} - 大{{ gradeToCN(userInfo.grade) }}</div>
    <div gap-2 mt-2 flex v-if="userInfo.badge">
      <Badge v-for="b of userInfo.badge.split(',') " :key="b">{{ b }}</Badge>
    </div>
    <div px-10 mt-2 text-3.5 text-center class="color-[#646a73] w-[70%]">{{ userInfo.description }}</div>
    <div mt-10 flex items-center v-if="userInfo.github">
      <a i-carbon-logo-github icon-btn hover:text-blue-500 rel="noreferrer" :href="userInfo.github" target="_blank"
        title="GitHub" text-black text-5 ml-auto mr-4 />
      <a i-eva:email-fill icon-btn hover:text-blue-500 rel="noreferrer" @click="copyToClipboard(userInfo.email)"
        target="_blank" title="Email" text-black text-5.5 />
    </div>
  </div>
</template>

<script setup lang='ts'>
import { UserInfo } from '#/data';
import { onMounted, ref } from 'vue';
import DefaultAvatar from '~/assets/icon/default-avatar.png'
import DefaultBg from '~/assets/images/default-bg.jpg'
import { loadImage } from '~/utils/loadImage';
import { copyToClipboard } from '~/utils/copyToClipboard';

const avatar = ref(DefaultAvatar);
const bg = ref(DefaultBg);

const gradeToCN = (n: string) => ({
  1: '一',
  2: '二',
  3: '三',
  4: '四',
})[n];
const props = defineProps<{ userInfo: UserInfo }>();

onMounted(() => {
  loadImage(props.userInfo.avatar, (u) => avatar.value = u);
  loadImage(props.userInfo.background, (u) => bg.value = u);
})
</script>

<style lang="scss" scoped>
div.card {
  font-family: Gilroy-regular, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';

}
</style>
