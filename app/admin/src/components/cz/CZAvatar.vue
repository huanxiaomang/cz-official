<template>
  <Avatar size="medium" :src="userInfo.avatar" @click="handleClick" class="ml-1 cursor-pointer">
  </Avatar>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue';
import { getUserInfoById } from '@/api/sys/user'
import { ref } from 'vue';
import {Avatar } from 'ant-design-vue';

defineOptions({ name: "CZAvatar" });

const props = defineProps<{ userId: string }>();

let userInfo = ref({
  avatar:''
});

function handleClick() {
  //TODO: 展示个人信息
  console.log("点击了头像!");
}

onMounted(async() => {
  userInfo.value = await getUserInfoById(props.userId);
  console.log(userInfo);

})


</script>
<style lang="less"></style>
