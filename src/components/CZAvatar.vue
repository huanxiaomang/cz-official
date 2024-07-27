<template>
  <Avatar :src="showAvatar" @click="handleClick"
    class="ml-1 cursor-pointer border-1 border-solid border-gray-300 w-[2rem] h-[2rem] hover:scale-110 transition-all animate-ease-in-out">
  </Avatar>
</template>
<script lang="ts" setup>
import { PropType, onMounted } from 'vue';
import { getUserInfoById } from '~/api/user'
import { ref } from 'vue';
import { Avatar } from 'ant-design-vue';
import showUserModal from './UserModal';
import DefaultAvatar from '~/assets/icon/default-avatar.png';
import { loadImage } from '~/utils/loadImage';
import { UserInfo } from '#/data';

defineOptions({ name: "CZAvatar" });

const props = defineProps({
  userId: {
    type: String,
    required: true,
  },
  clickFn: {
    type: Function as PropType<() => void>,
    default: null
  }
});

let userInfo = ref<UserInfo>({
  createdAt: '',
  email: '',
  grade: 0,
  major: '',
  role: '',
  score: '',
  userId: '0',
  username: '',
});

let showAvatar = ref(DefaultAvatar);

function handleClick() {
  if (props.clickFn !== null) {
    props.clickFn();
  } else {
    showUserModal(userInfo.value as any);

  }
}

onMounted(async () => {
  userInfo.value = await getUserInfoById(props.userId);
  const img = document.createElement('img');
  loadImage(userInfo.value.avatar, (u) => showAvatar.value = u);

})


</script>
<style lang="less"></style>
