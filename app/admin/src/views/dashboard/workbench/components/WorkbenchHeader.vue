<template>
  <div class="lg:flex">
    <Avatar :src="userinfo.avatar || headerImg" :size="72" class="!mx-auto !block" />
    <div class="md:ml-6 flex flex-col justify-center md:mt-0 mt-2">
      <h1 class="md:text-lg text-md">
        早安, {{ userinfo.username }}, 开始您一天的工作吧！
      </h1>
      <span class="text-secondary"> 今日晴，20℃ - 32℃！ </span>
    </div>
    <div class="flex flex-1 justify-end md:mt-0 mt-4">
      <div class="flex flex-col justify-center text-right">
        <span class="text-secondary"> 项目 </span>
        <span class="text-2xl">xx</span>
      </div>

      <div class="flex flex-col justify-center text-right md:mx-16 mx-12">
        <span class="text-secondary"> 前端组 </span>
        <span class="text-2xl">xx</span>
      </div>
      <div class="flex flex-col justify-center text-right md:mr-10 mr-4">
        <span class="text-secondary"> 后端组 </span>
        <span class="text-2xl">xx</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { Avatar } from "ant-design-vue";
import { useUserStore } from "@/store/modules/user";
import headerImg from "@/assets/images/header.jpg";

const userStore = useUserStore();
const userinfo = computed(() => userStore.getUserInfo);
</script>
