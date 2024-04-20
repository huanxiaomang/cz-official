<template>
    <Avatar :src="showAvatar" @click="handleClick"
        class="ml-1 cursor-pointer border-1 border-solid border-gray-300 w-[2rem] h-[2rem] hover:scale-110 transition-all animate-ease-in-out">
    </Avatar>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue';
import { getUserInfoById } from '@/api/sys/user'
import { ref } from 'vue';
import {Avatar } from 'ant-design-vue';
import showUserModal from './UserModal';
import DefaultAvatar from '@/assets/icons/default-avatar.png';

defineOptions({ name: "CZAvatar" });

const props = defineProps<{ userId: string|number }>();

let userInfo = ref({
  avatar:''
});

let showAvatar = ref(DefaultAvatar);

function handleClick() {
    showUserModal(userInfo.value);
}

onMounted(async() => {
  userInfo.value = await getUserInfoById(props.userId);
    const img = document.createElement('img');
    img.src = userInfo.value.avatar;
    img.onload = function () {
        showAvatar.value = userInfo.value.avatar;
    }
})


</script>
<style lang="less"></style>
